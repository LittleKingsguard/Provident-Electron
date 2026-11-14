# Forking this app — building your own UI on this base

**Who this is for.** A developer who has forked this repository and wants to replace its demo surface with
their own: new panes, their own pane content, their own tabs, their own stage.

**What this is not.** `docs/L1/`, `docs/L2/<module>/` and `docs/L3/<module>/` are **layer design scopes** and only
their own layer writes them (`AGENTS.md` § "Where things are", D-3). This page is user-facing documentation: it
describes what is already built, cites the `D-n` row that decided each behaviour so you can read the reasoning
rather than trust this page, and marks with **you provide this** every fact the corpus deliberately leaves to the
app that forks it.

**One rule up front, because everything else is downstream of it.** Every element outside the Electron shell's own
chrome is **provident data** — envelope nodes, handler bodies, hooks, component bindings — driven through the
producing graph, **never hand-written DOM**. An element rendered outside that graph is invisible to
`provident.dispatch`, `get_rendered_html` and `get_markdown` (`AGENTS.md` § "Non-negotiables", quoting the charter at
`archive/gate-corpus-2026-10-29/AGENTS.md:22-34`). The row that owns this rebuild's reading of it is **D-122**'s first
ruling (the tab bar's authority is settled on the data side) and **D-231**, which exists because a UI-authority
violation *shipped and passed every row* — the page's own scaffolding is not provident data, so **no test can see
it** (`D-231`).

---

## 1. The shape of the app

**The authored envelope.** `src/shared/demo-envelope.ts` exports `demoEnvelope()`, a plain object
`{ template: { root }, content: [], clientConfig: { runInstantiation: true, runRendering: true } }` whose `root` is
one node tree. Every member a node may carry is data:

```ts
{
  type: 'div',                                   // element kind
  css: { id?, classes?: string[], style?: Record<string,string> },   // id, classes, inline declarations
  props: { id?, ...attributes },                 // emitted as BARE attributes (props.status → status="busy")
  content: 'text',                               // a node's own text, rendered AHEAD of its children
  children: [ /* nodes */ ],
  handlers: [{ name, event, body }],             // body is a function STRING, compiled in the renderer's scope
  hooks: ['rows'], hooksKind: { rows: 'placement' },
  component: { reference, value }                // a provider (publishes a value to descendants)
  //  |       { reference, target }               // a consumer (reads the nearest provider into css.classes &c.)
}
```

**Handler bodies are STRINGS and can reach nothing.** An authored `body` compiles in the renderer's global scope, so
it can reach no record and no main-process command; that is why every authored control in this tree carries a
**declared no-op pair** — `const MENUS_ITEM_BODY = "function (ctx) { void ctx; }"` — that the wiring **replaces under
the same `(name, event)`** with a live closure (`D-129`, `D-177`, `D-209`, `D-239`). The engine's
append-with-override rule is what makes the replacement a repair rather than a second listener.

**The producing graph.** The renderer *is* a `provident-ssr` producing process: the graph is authoritative and the
HTML is a view read off the live DOM and re-emitted on demand (`src/renderer/runtime.ts`; `strata/brief.md` §0). A
*paint* is a `state-slice` op through `runtime.applyCommand`, and a *record* read or write goes over the preload data
route (`window.provident.data`) or, from an agent, `provident.data.read` / `provident.data.write`.

**The record families.** Five, and their tiers are the corpus's, not a preference (`strata/brief.md` §2, D-91, D-87,
D-97, D-98, D-145):

| Family | Tier | What it is |
|---|---|---|
| `['panes']` | `file` | one record per declared pane: `width`, `height`, `bounds?`, `zone?`, `index?`, `collapsed?`, `status?`, `updatedAt?` (`src/shared/view-shape.ts`'s `ViewPaneGeometry`) |
| `['zones']` | `mem` | one record per declared zone: `size?`, `display?`, `slot?`, `distance?`, `collapsed?` (`ViewZone`) |
| `['theme']` | `file` | the appearance family: `{ token, attribute, declaration }` (`ViewThemeRecord`) — its resolution is a **constraint repair's** product (D-97, D-98) |
| `['drag']` | `temp` | declared and **UNPAIRED**: no invariant holds a gesture transient (D-145) |
| `['tabs']` | `file` | the tab record: an `order` seat plus one row per tab (`src/main/tabs-record/index.ts`) |

The view record's four families are read by **one** channel (`IPC_VIEW_READ`) and written by one route per act
(`src/shared/view-channels.ts`); the tab record has its own three-and-a-push set (`src/shared/tabs-channels.ts`).

---

## 2. Populating new panes

### 2.1 The authored node shape

A pane is **three authored things and one record**: a pane node, its **head row** (grip + collapse control), its
**body**, and the record that supplies its geometry and state. This is the shape the app authors, and it compiles —
see §10 for how that was checked:

```ts
// ONE PANE, ITS HEAD ROW, ITS BODY. Ids are literals on both sides in this tree (D-41, D-188 debt 2).
{
  type: 'div',
  css: { id: 'pane-notes', style: { height: '100%' } },   // the FILL is a relation; the FIGURE is the record's
  props: { id: 'pane-notes' },
  component: { reference: 'zone-format', target: 'css.classes' },   // inherits its zone's class BY POSITION (D-265)
  children: [
    { // (a) THE HEAD ROW — the pane's FIRST child, holding the two controls along one row (D-269)
      type: 'div', css: { id: 'notes-head', classes: ['pane-head'] }, props: { id: 'notes-head' },
      children: [
        { // the MOVE GRIP: focusable, its name is an attribute the sheet paints, its four drops are its children
          type: 'div',
          css: { id: 'notes-grab', classes: ['pane-grab'], style: { cursor: 'grab', width: '14px', height: '14px' } },
          props: { id: 'notes-grab', tabindex: '0', name: 'Notes' },
          content: '⠿',
          children: ['top', 'bottom', 'left', 'right'].map((zone) => ({
            type: 'div',
            css: { id: `notes-grab-${zone}`, classes: ['pane-drop'], style: { position: 'fixed', cursor: 'pointer', opacity: '0' } },
            props: { id: `notes-grab-${zone}`, pane: 'pane-notes', zone },      // the act's two operands, read OFF THE NODE
            content: zone,
            handlers: [{ name: 'pane-move', event: 'click', body: 'function (ctx) {\n  void ctx;\n}' }],
          })),
        },
        { // the COLLAPSE CONTROL: a NODE and the grip's SIBLING, never its descendant (D-269)
          type: 'div', css: { id: 'notes-collapse', classes: ['pane-collapse'] },
          props: { id: 'notes-collapse', tabindex: '0', pane: 'pane-notes' },
          handlers: [{ name: 'pane-collapse', event: 'click', body: 'function (ctx) {\n  void ctx;\n}' }],
        },
      ],
    },
    { // (b) THE BODY — the ONLY scrolling box in the pane; the head is outside it (D-270)
      type: 'div', css: { id: 'notes-body', classes: ['pane-body'] }, props: { id: 'notes-body' },
      children: [ /* your content nodes */ ],
    },
  ],
}
```

Four properties of that literal are load-bearing and each has a row:

- **the head row exists because a pane is a flex COLUMN** — two siblings are laid out *down* it, so only a box of its
  own can lay the grip and the control *along* the row (D-269, `docs/L3/app-envelope/design-pane-control-bar.md` §1(b));
- **the collapse control is a node and the grip's sibling** — a `pointerdown` on any `.pane-grab` descendant bubbles to
  the grip's drag listener and arms the pane-move session, painting four zone windows from one click; a pseudo-element
  renders no element and receives no click (D-269, D-260);
- **the head must not live inside the scrolling box** — any reservation inside a scroller (sticky, absolute or
  padding) adds to `scrollHeight`, which is a scrollbar on a pane with nothing to scroll (D-270, the user's own
  diagnosis);
- **a node's own `content` renders ahead of its children**, so a body authored as `content` cannot be reached by a
  rule keyed on the pane's state — author the body as a child (D-259, `A-14`).

### 2.2 The record members a pane reads

`src/shared/view-shape.ts` declares them (`ViewPaneGeometry`) and `src/main/view-record/index.ts`'s `paneOf` admits
them member by member:

| Member | Read by | Absence means |
|---|---|---|
| `width`, `height` | the paint: the one of the two the pane's `zone` leaves **adjustable** (D-186, D-189) | nothing is painted on that axis — no default is invented (D-129, D-174) |
| `bounds` | the stage pane's drag clamp; a zone-resident pane inherits the layout's clamp instead (D-186) | lawful; store nothing |
| `zone` | which axis is filled, which is adjusted, which class is inherited, which zone holds the node | **the STAGE** — a pane naming no zone stands in the stage (C-9) |
| `index` | the place among the zone's panes; absent sorts at the pane's **declared** place (D-259, D-262) | the family's own declared order |
| `collapsed` | the pane's own state; the paint composes the **effective** collapse as `own || zone's` | expanded (D-269) |
| `status` | the indicator's word, one of the **closed three** (D-269) | no indicator at all |
| `updatedAt` | the indicator's derived `updated` word, parsed as an instant and never compared as a string (D-242, D-269) | no `updated` |

### 2.3 What the paint writes, and what it never writes

`panePaintOf` (`src/renderer/renderer.ts`) composes **one** style value from the pane's `zone` and record, and both
the delivery and the drag's preview call it — so the two cannot describe two different boxes (D-263):

- **the pane** keeps the **fill** (`height: 100%` or `width: 100%`, a relation against the zone's extent, never a
  figure: `PANE_FILL`) and the record's **figure** on the adjustable axis;
- **the pane's body** keeps the **scroll** (`overflow-x`/`overflow-y: auto`, or `hidden` while collapsed);
- the pane node also receives the `collapsed` **attribute** in the same `state-slice` (`props.collapsed`, `undefined`
  for expanded — the engine's removal, so **absence is the one spelling of expanded**).

**It never writes** the pane's other `props` (so `props.name` on a grip and `props.pane` on a drop survive every
delivery and every relocation: D-265, D-257) and **never writes `css.classes`** — a class write would replace the
class the pane inherits from its zone by position (D-265). A figure the record does not state is **not painted**; the
turn states no fallback, because a fallback is right on one boot and false after the first gesture (D-129, D-174).

### 2.4 A fourth pane: five places to touch, and the census

A pane is a **declared** id, not a name you invent. Declare it and register it, in this order:

1. **`src/shared/view-shape.ts`** — an id constant plus membership in `DECLARED_PANE_IDS`. Until then a leaf write is
   refused by name: `'pane-notes' does not exist in 'panes', panes are 'pane-a', 'pane-inspector', 'pane-menus'`, and
   `commitPane` answers `undeclared-pane` (D-138, D-151, `ASM-12`, `ASM-14`).
2. **The envelope literal** (§2.1), inside the zone or stage you want it in.
3. **`src/renderer/renderer.ts`** — one entry each in `PANE_NODE_IDS`, `PANE_HEAD_IDS` and `PANE_BODY_IDS` (all three
   total over `DECLARED_PANE_IDS`; `PM-1` reds **by name** on a declared pane with no entry), its collapse control id
   in `PANE_COLLAPSE_IDS`, and its grip in the pane-move census.
4. **A name** — `props.name` on the grip. A pane has no name in the record; the header reads `attr(name)` off the grip
   (D-257).
5. **Nothing in the stylesheet.** A zone publishes a class and a pane consumes it *by position*
   (`component: { reference: 'zone-format', … }`), so **a fourth pane needs no CSS edit** — the property `D-264`
   chased with `:has()` and `D-265` made structural.

**The census, stated plainly.** This suite **counts authored nodes**: the figure lives in
`tests/theme-control.test.ts`'s `POST_CENSUS` (`109` at this head) and is split into standing terms by kind *and* by
id, precisely so that a swap cannot hide inside a sum (D-269 §7, D-270, D-271). **A fork's census is its own** — you
will re-take that literal (and every `AL-*`/`PM-*` row that names this app's ids) the first time you change the
envelope, and a red there is your figure moving, not a defect (D-26, D-43).

---

## 3. Dynamic pane content

### 3.1 How content changes at runtime

Three lawful routes, and nothing else:

- **A record write.** One leaf, then the store's push, then the renderer's one delivery subscription, then the paint
  turns re-run. There is no timer, no poll and no retry anywhere in the loop (D-82 clause 4).
- **A graph write on the node itself** — `runtime.applyCommand({ kind: 'state-slice', node, mutation: [{ targetProp:
  'content' | 'props.x' | 'css.style' | 'handlers', mode: 'replace', value }] })`. This is how the app writes a
  rendered value, and how an authored control's live body is installed over the authored no-op (D-209, D-239).
- **A `rows-mint`** for a *family of rows* minted into an authored placement node — the tab chips' mechanism (D-179,
  D-182, D-201).

```ts
// A LIVE pane-content write, with the two failures REPORTED rather than swallowed (D-117's register)
const write = (runtime: Runtime, nodeId: string, text: string): void => {
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'content', mode: 'replace', value: text }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status !== 'applied') console.error(`[fork] ${nodeId} refused its content (status=${status})`)
  } catch (error) {
    console.error(`[fork] ${nodeId} threw on a content write`, error)
  }
}
```

### 3.2 What NOT to do

**Do not hand-write DOM.** No `createElement`, no `document.querySelector` + `innerHTML`, no attribute stamped from
outside the graph. Such an element **cannot be dispatched, read or marked down**: it answers no `list_targets` entry,
`provident.dispatch` cannot address it, and `get_rendered_html`/`get_markdown` do not contain it — the whole reason
this template exists (`AGENTS.md` § "Non-negotiables"). It is also the one defect class **no row can catch**, because
the page's scaffolding is not provident data: D-231 found a `<header>` that had been there since the demo and read
green everywhere.

### 3.3 The cost: a paint replaces `css.style` WHOLE

`paintStyle` hands the engine **one** `css.style` value in `replace` mode, so **every authored declaration on a
painted node is gone the moment a paint touches it**. This is not a quirk; it is the lesson of four rows:

- D-234 — the four zones lost their **authored scroll** the instant the paint wrote their `size`: the node then read
  `height: 140px` and nothing else;
- D-240 — the same collision on the top bar, where a width claim standing as a flex base size had to be *deleted* and
  the reservation moved to the element that owns it;
- D-243 — the pane arm repeated it: `#pane-menus` rendered `style="width: 100px;"` with its authored `height: 100%` and
  `overflow-x: auto` **gone**, so the charter's "fills / adjusts / scrolls" was false in two of three parts. The fix is
  the rule to copy: the arm that composes the style restates **every** part it needs, reading `LAYOUT_ZONE_AXES` rather
  than declaring a second table;
- D-253 / D-265 — the other half: a *state* a stylesheet must key on cannot be a class the paint writes (it would
  replace the inherited zone class), so it is a `props` attribute written **in the same `state-slice`**, and where the
  record states nothing the paint spells a **removal**.

**So for a fork:** put a painted node's *static* layout on **a class, or on a child the paint never touches**. Never
on the painted node's inline `css.style`.

---

## 4. The pane status indicator

The head row carries an indicator that is **read and never pressed**, so it is the sheet's `::after` under the head's
own `[status]` attribute: `.pane-head[status]::after { content: attr(status) }` — no node, no rule and no box when the
attribute is absent (`D-269` §6, `design-pane-control-bar.md` §5).

### 4.1 The vocabulary

- **Three words, closed: `busy`, `waiting`, `done`** (`PANE_STATUS_WORDS` in `src/shared/view-shape.ts`). A fourth word
  is **refused by name** at the store, so no arm of the paint carries a vocabulary of its own (D-189's closure applied
  to a word: D-269).
- **Absence paints nothing.** That is the user's *"optional, based on app's use case"* spelled as the record's silence
  (D-269).
- **`updated` is a fourth painted word and is never stored.** `busy`/`waiting`/`done` describe the pane's own work —
  one fact, in one place. `updated` describes a **relation** between the content's update and the user's last look —
  two facts, and one of them is not in the record at all — so `paneStatusOf` **derives** it (D-269 §6).

### 4.2 The ruling the component makes, and the one it refuses to make

The user's ruling, verbatim: ***"'updated since last view' is a signal the forking app would decide on."***

**So the component supplies the channel and the vocabulary, and the fork supplies the policy.** `paneStatusOf` reads,
in order: the record's word wins → `updated` is shown **only on a collapsed pane** → no stamp, no word → a look at or
after the change clears it → else `updated`. Instants are **parsed**, never compared as strings (D-242).

**`updatedAt` has NO PRODUCER under `src/`.** The record's optional `updatedAt` is what `updated` is derived from, and
no route, act or repair writes it — a repair stamping every pane at boot would make the whole app read `updated`, which
is a lie and the `D-243` no-default class. The state is therefore **expressible and measurably inert until an app
writes it** (D-269 §6).

**You provide this:** a `updatedAt` producer (when *your* pane's content changes), and a "last view" policy. The
realm-side last-look stamp this app uses is a closure map (`lastViewedPanes`) written at exactly one act — the
expansion — and **never stored**, because a durable "last look" would be a `file` write per glance with no invariant to
hold it (D-269 §6, D-145).

### 4.3 Example — writing a status

The bar's three members are **not** `commitPane`'s: that route carries `{width?, height?, bounds?}` only, and a
status-only payload answers `committed` and **writes nothing** (§10, probe A). Write the member at its own leaf instead:

```ts
// THE WRITE THE APP ITSELF USES for a bar member (`paneCollapseAct`, `zoneCollapseAct`): one leaf, its own tier.
const answer = await dataRoute('write', {
  path: ['panes', 'pane-menus', 'status'],   // the pane family, the declared pane id, the member
  tier: 'file',                              // ['panes'] is a `file` family (D-87)
  value: 'busy',                             // one of the closed three; 'idle' is refused BY NAME
})
// answer.status === 'committed' | 'refused' (reason + message) | anything else → report it (D-117)
```

The same act from an agent, or from a fork's own client, is the same leaf:
`provident.data.write { path: ['panes','pane-menus','status'], tier: 'file', value: 'busy' }`.

### 4.4 Example — writing `updatedAt`

```ts
// YOUR CONTENT CHANGED AT THIS INSTANT — the stamp the indicator's `updated` word is derived against.
await dataRoute('write', {
  path: ['panes', 'pane-menus', 'updatedAt'],
  tier: 'file',
  value: new Date().toISOString(),   // any string is admitted; a string that does not PARSE is treated as absent
})
```

**You cannot clear that stamp through the data route, and the corpus does not want you to.** A `undefined` value is
refused at the crossing's boundary (*"`undefined` is not a value the JavaScript crossing admits"*), and a **delete** at
that leaf is refused by the pane's own parse. The `updated` **word** is cleared instead by the comparison
`paneStatusOf` makes: a look at or after the content's stamp clears it (D-269 §6's `T4`). That is the shape the user's
ruling asks for — the component owns the channel and the comparison, **the fork owns what counts as a look**.

**You provide this:** the write above, its trigger, and the look policy that clears the word. Nothing under `src/`
calls the write, and nothing under `src/` clears the stamp.

---

## 5. Populating the stage with tab/app data

### 5.1 The stage is a position, and `pane-a` is the pane that holds it

The four zones are `top`, `bottom`, `left`, `right` (`DECLARED_ZONE_IDS`). **The stage is not one of them**: a pane
whose record names no `zone` stands in the stage (C-9), which is why `pane-a`'s record carries `bounds` — the stage is
derived and has no zone to inherit a clamp from — and no `zone` at all. The stage's own extent is the flex remainder
and is **never stored or written** (`stageStyle`: `flex: 1 1 0; overflow: auto`; D-185, D-187).

Its node in this envelope is the `gutter-pane` node inside the demo's gutter card (**demo furniture — §8**), and
`PANE_NODE_IDS` is the map from the record's key to the node (`pane-a` → `#gutter-pane`), because both re-namings are
refused: the record is addressed by the composition's id, the node by the envelope's (D-194, `design-pane-node-map.md`
§2).

### 5.2 The `tabs` family

`src/main/tabs-record/index.ts`. The record is an **`order` seat plus one leaf per tab**, at `file`:

```ts
{ tabs: {
    order: ['landing', 'tab-2'],           // THE ONE STORED SINGLETON SEAT: an ordered list of tab ids (D-156)
    landing: { id: 'landing', target: 'tabs-landing-page', active: false, label: 'landing', lastActiveAt: '…' },
    'tab-2': { id: 'tab-2', target: 'notes-1',        active: true,  label: 'untitled', lastActiveAt: '…' },
} }
```

A row's members are exactly: `id`, `target` (**the CONTENT the tab holds — a content reference, not an identity**),
`active`, and the optional `error`, `label`, `lastActiveAt` (`rowOf`; `src/shared/types.ts`). **Six declarations** hold
it: `tabs-must-stand`, `order-names-its-tabs` (whose `'seat'` repair appends an unseated id), `exactly-one-active`,
`tab-has-title`, `tab-has-content`, `tab-has-lastActiveAt`.

**The record's creation placeholder has no `viewTabsPlaceholder` name.** The view record's three placeholders are
`viewPanesPlaceholder`, `viewZonesPlaceholder` and `viewThemePlaceholder`, and there is **no fourth** — the tab
record's placeholder is the private `landingRow` its creation repair `tabs-must-stand` mints: the reserved entry
`id: 'landing'` (one spelling, `src/shared/tabs-landing.ts`), `target: 'tabs-landing-page'`, `active: true`,
`label: 'landing'` and a `lastActiveAt` stamped at the mint. A fresh `read()` answers
`{ order: ['landing'], landing: 'landing', rows: [ that row ] }` (§10, probe G's "before").

### 5.3 How a fork shows a tab's data in the stage

**A tab's `target` is resolved to an authored node and its `display` is painted from the record.** Concretely, on
every delivery the layout paint walks the tab rows and writes `display: block` on the active row's target node and
`display: none` on the other rows' — through `drivePageDisplay`, the one author of a page's visibility (D-129, C-4).

So the fork's recipe is three lines of data and one write:

```ts
// (1) AUTHOR THE PAGE. Its node id is the CONTENT REFERENCE a tab will carry.
{ type: 'section', css: { id: 'notes-page', classes: ['page'] }, props: { id: 'notes-page' }, content: 'Notes' }

// (2) COMMIT A ROW WHOSE `target` IS THAT ID — one leaf write, the act the app itself makes (`focusActRoute` S8).
await dataRoute('write', {
  path: ['tabs', 'tab-2'], tier: 'file',
  value: { id: 'tab-2', target: 'notes-page', active: true, lastActiveAt: new Date().toISOString() },
})

// (3) NOTHING ELSE. The delivery resolves the target through `runtime.elementForNodeId` and paints `display`;
//     a target that resolves no authored node is written NOTHING rather than refused (D-127).
```

**Two keys are the app's, and you provide yours.** This app's landing terminal stands where the active row's `target`
is either the authored landing page's id or begins with this realm's no-content marker `untitled-`
(`NEW_TAB_TARGET_PREFIX`, one spelling in `src/renderer/tabs-client.ts`, D-241/D-210). That predicate — and the error
terminal's — is a **policy about which page a tab shows**, so a fork that authors its own pages replaces it. The
record stays the authority for `target`; the witness is what the realm makes of it.

---

## 6. Creating new tabs

### 6.1 The record write that adds one

One leaf at the tab's own id, at `file`. Nothing else is written by the act — **the seat repair appends the id to
`order`, and `exactly-one-active` deactivates the standing active row**, both inside the same commit:

```ts
// THE SHAPE THE APP'S OWN `+` WRITES (`rowForSeat`'s open arm: id, target, active, lastActiveAt — and no label)
await dataRoute('write', {
  path: ['tabs', 'tab-3'],
  tier: 'file',
  value: {
    id: 'tab-3',
    target: 'notes-page',                 // the content reference §5.3 resolves
    active: true,                         // `exactly-one-active` clears the previous one
    lastActiveAt: new Date().toISOString(),  // `tab-has-lastActiveAt` repairs a missing stamp, so supply your own
  },
})
```

What the corpus then does for you — measured in §10's probes G/H/K except where marked *read*:

- `order` becomes `['landing', 'tab-3']` — **the seat repair's append, not the act's promise**;
- the previous active row reads `active: false`, and exactly one row reads `active: true`;
- a **missing `label` is repaired to `'untitled'`** by `tab-has-title` — not to the id, and not to your target. The
  chip's text is the record's `label`; **you provide** a title if you want one;
- a missing `target` is repaired to the authored landing page by `tab-has-content` (*read*: `healRecord`'s two field
  defaults), and a missing `lastActiveAt` is stamped with the repair's clock.

**A tab row has NO `index` member.** The order of tabs is the `order` seat, one stored array; `index` is the *pane*
family's per-record place (D-259). Do not look for it in a row and do not write it.

The renderer's own "add a tab" act is `focusActRoute({ target, newTab: true })` — it derives a distinct target
(`untitled-1`, `untitled-2`, … skipping any string a row already carries, because a repeated target would *seat* the
row the first press opened instead of opening a second one) and then writes exactly the row above (D-239, D-241).

### 6.2 What the tab row paints

The row set is **minted**, not authored: `driveTabsRows` issues one `rows-mint` per `['tabs']` delivery into the
authored row node (`#tab-rows`, whose `hooksKind` is declared `'placement'`), using the authored prototype node
(`#tab-row`). Each datum is:

```ts
{
  label: record.label ?? id,     // FIRST, because the engine renders a minted row's text from its first scalar binding
  ...record,                     // the row WHOLE, so no member is dropped
  handlers: [{ name: 'tab-row-act', event: 'click', body: () => 'focus <target>' }],  // a LIVE function — the agent's arm
  props: { target, active },     // the ONE slot a row's value reaches the rendered node in
}
```

So the row paints its **label** as text and its **`active` flag as the bare attribute** `active="true"` /
`active="false"` — which is the sheet's marker (`.tab-row[active="true"]`). **`keyField` is deliberately not declared**:
every delivery mints every chip fresh, so a value that moves is composed at the mint instead of freezing on a reused
node; the price is DOM churn and a per-delivery re-attach (D-201). A fresh mint is also why the settle write on
`#tab-rows` exists — a minted row's focused state otherwise renders at the mount root (D-241 §2).

### 6.3 The add control

`#tab-add` is authored **beside** the row set and never inside it: a mint replaces the row set, so a control inside
`#tab-rows` would be destroyed by the next delivery (D-239). It authors a static `content: '+'`, `flex: 0 0 auto`, and
in the top bar's `no-drag` region; its authored `('tab-add-act', 'click')` no-op is **replaced** with a live closure
that calls the realm's own act — installed once at boot, because the node is authored and never re-minted
(`installAddTabHandler` / `attachAddTab`, D-209's path).

---

## 7. The rebuild's changed behaviours a fork will hit

### 7.1 Zone collapse

- **Empty collapses by default, and the default is a DERIVATION the record may overturn.** `['zones', <id>,
  'collapsed']` is an optional boolean **written by the acts alone**; where the record states nothing, a zone is
  collapsed **iff no pane names it** (D-271 §1). An expanded *empty* zone therefore writes `false` — a press always
  writes, never toggles `undefined`.
- **The remembered size is never touched.** Collapsing writes no `size`; the figure stays stored and an expansion
  costs zero writes (D-271 §2, D-234).
- **A collapsed extent is `auto`, not a constant.** `auto` on the axis the zone fixes, `hidden` on its arrangement
  axis, and the only figure in the box is the head row's own `14px` — a `DEFAULT_ZONE_COLLAPSED_SIZE` was refused as a
  second authority (D-271 §3).
- **The preview band composes the remembered `size`**, because the presented extent would be a `14px` sliver or
  nothing at all over an empty rail: a drag over a collapsed zone expands it to exactly what the release will produce
  (D-271 §4).
- **The two expand triggers are chained zone-first.** (a) A drop into a collapsed zone writes
  `['zones', zone, 'collapsed'] = false` **first, gated, ahead of the placement's no-op test** — otherwise a drop
  into the zone the pane already names would compute a placement equal to the record and fire nothing (D-262's
  lesson, D-271 §5). (b) A pane's control **inside** a collapsed zone writes **one leaf at the zone's address and
  nothing at the pane's** — the pane's glyph already reads ▸, so the press *is* an open.
- **`zoneOfWire` is the trust boundary**: the renderer's admission drops every wire member it does not name, so a new
  record member is inert until that arm admits it — with every row still green (D-271 §6).
- **Cosmetics, each with its own row**: the sidebar lane reads bottom-to-top (`sideways-lr`) while **nothing pressable
  rotates** (D-272); the head's padding became *logical* so the placement rotates instead of the value (D-273); the
  collapse arrow overlays the zone's foot instead of taking a lane, and a **collapsed zone offers no resize strip**
  (hidden, never deleted, so no box moves) (D-281, D-282).

### 7.2 Pane collapse

- **The head control's act is ONE leaf write** at `['panes', <id>, 'collapsed']` at `file`, with the **negated
  record value**; the record id is read **off the node's `props.pane`**, so the renderer keeps no table of record ids
  (D-269 §4, D-235).
- **The paint takes the adjustable axis to `auto` and the body's scroll to `hidden`, and leaves the fill and the
  figure untouched** — memory, so expanding costs zero writes and the record changes in exactly one member each way
  (D-269 §5).
- **The stage pane is the third arm**: both its members are its own, so both go `auto` and **no scroll is written**.
- **It survives a relocation**: `collapsed → left → right` still reads `collapsed: true` and paints closed (D-269 §5).
- **A pane already smaller than its head gets no record write** — see §7.5.

### 7.3 Rearrangement (order within a zone)

- **A placement is `(zone, place among that zone's panes)`** — the user's own definition (D-259).
- **The order is a per-pane `index`, and absence sorts at the pane's DECLARED place** (`DECLARED_PANE_IDS`' order),
  never the reading's array position: a cold family reads back in the store's normalisation, and a rule keyed on it
  gave the panes a sequence nothing had rendered (D-262).
- **A placement equal to the record's is a NO-OP**: no write, no move, no delivery. The comparison is one composed
  word (order + every pane's zone), not a remembered value (D-259, `X3b`).
- **The write is ONE whole-family write** at `['panes']` at `file`: the moved pane's `zone` plus **every** pane's
  recomputed `index`, figures verbatim, `bounds` dropped from the one that moved — because two leaves would be two
  commits (D-259).
- **The preview re-arranges the REAL panes** through the engine's `move` op; a `move` releases pointer capture and
  focus, so the gesture re-takes both in the same turn (D-259 §"gesture detail").

### 7.4 Relocation (moving a pane between zones)

- **Relocation is a drag, not a pick**: press the grip, drag toward a zone, see the target, release to commit (D-249).
- **The engine has carried a `MoveOp` all along** — `D-252` corrected `D-182`'s "the record relocates and the region
  does not", which had been recorded as an upstream limit. A cold boot whose record already says `zone: left` paints
  the pane in `left` through the same code path, so it is not a gesture special case.
- **The `zone` member is what relocates.** The pane's fill, figure and scroll follow the record's `zone` per delivery
  with **no paint byte moved** (`D-243`'s declaration read per delivery, D-248).
- **The zone's form is inherited BY POSITION** (`D-265`): each zone authors `component: { reference: 'zone-format',
  value: ['pane-in-<zone>'] }` and each pane consumes it into `css.classes`, resolved by the engine's nearest-first
  `fitReference` walk and appended by `applyDerived`. **The stage is a position too**, and its provider is the app root
  (`pane-in-stage`). This deleted an attribute, its channel, its two readers and a sheet guard — and it is why a fourth
  pane needs no CSS edit.
- **Crossing the boundary N times leaves the tree as if it had crossed once** (D-266): the zone a pane *leaves* is on
  nobody's compile chain, so its emitted `childOrder` kept the departed pane and re-entering emitted no append; every
  zone found disagreeing is re-compiled by one same-value `state-slice`.
- **What a relocation cannot carry is the stroke**: the figure a pane paints after it is the record's **declared** one,
  read off `['panes']` per delivery — never the handle's last position (D-251, D-243).

### 7.5 The pane's minimum is its head

A drag cannot make a pane smaller than its head's intrinsic extent — measured live as `min-content` per head
(`84`, `102`, and `14` for the stage pane's height) by **one `min-content` squeeze and a `getBoundingClientRect`**,
because a stretched head's `rect`, `clientWidth` and `scrollWidth` all answer the pane's width (D-280).

**It bounds a gesture and not a record.** `provident.data.write ['panes','pane-menus','width'] = 40` commits and puts
the control outside the pane again; `['zones','top','size'] = 10` leaves heads below their boundary; a narrow window
can clip a pane whole. A pane broken by a record write is repaired **on the next drag**, and the renderer will not
floor the figure itself, because a paint that floored it would be a write the record could falsify (D-280).

### 7.6 The gutter's pill

The four zone strips and the pane handles are `14px` boxes that paint a **short centred pill** on the long axis:
`min(48px, 100%)` on the long axis, `7` thin-axis, a full-round radius, centred by auto margins — so the pill is the
lane in a short gutter and never vanishes (a share or `calc(100% - n)` were both refused, each for a measured
failure) (D-284). And `::before` is a **divider line** down the lane while `::after` is the pill, which now sits
**quieter than the line it sits on** (`1.09:1` against `1.41:1` light, `1.13:1` against `1.89:1` dark) — translucency
was refused because an alpha fill makes the colour a function of what it covers (D-285). The hover target is still the
whole `14px` lane even though the paint shrank (D-284).

---

## 8. What a fork must NOT copy

- **The demo's landing content.** The `h1` and the four content cards inside the authored landing page are demo
  content, not a layout contract; `tabs-landing-page` is a page node the tab record points at, nothing more.
- **The `gutter-card`.** It is **demo furniture and not a destination**: the user's ruling (D-267) is that the card is
  the demo element, which is why a pane dragged out of the stage **stays out** and the card keeps its heading around an
  empty box. A fork authors its own stage content; do not treat `#gutter-card` as a place a pane can go home to.
- **The menus' Electron template.** The eighteen role-carrying items (and the nineteenth lane, which is this app's own
  overlay opener) are **this app's** enumeration of a menu that main's route admits eleven roles for and refuses seven
  by name. It is a template of a template: replace it, and keep the *pattern* — a static enumeration whose roles are
  read off the nodes (D-180, D-181, D-196, D-283).
- **Anything this repo's tests pin about THIS app's census.** `POST_CENSUS = 109` in `tests/theme-control.test.ts`, and
  every `AL-*`/`PM-*`/`PS-*`/`ZC-*` row that names this app's ids, its nineteen menu lanes, its three panes, its four
  zones' figures and its eight drops. Those literals measure this envelope; **a fork's census is its own** and re-taking
  it is part of forking, not a defect (D-26, D-43, D-269 §7).

---

## 9. "You provide this" — the fork's own half

| The component supplies | You supply |
|---|---|
| the `updatedAt` **channel** (an optional string member, admitted at its own leaf) | **the producer**: what your content's change instant is, and when to write it (D-269 §6) |
| the `updated` **word** and its derivation (`paneStatusOf`'s five arms) | **the "last view" policy**: what counts as a look at your pane (D-269 §6) |
| the landing/error **terminal predicates** as this app states them | **your pages**: which node ids your tabs' `target`s name, and which of them your terminals show (§5.3) |
| a closed three for `status`, enforced by name | **which word** your pane's work is in, and when (D-269) |
| `DECLARED_PANE_IDS`, `DECLARED_ZONE_IDS`, the drop operands, the three node maps | **your ids**, declared where the record can see them (§2.4) |
| a census instrument and the shape of its terms | **your census figures** (§2.4) |
| the four families, their tiers and their routes | **your pane names** (`props.name`), your menu, your theme control |

---

## 10. How the examples in this guide were checked

Every code block above was checked against `src/shared/view-shape.ts`'s types and the envelope's actual node shape,
and most of them were also **run**, against this tree, at this head:

| Example | How it was verified |
|---|---|
| §2.1 the pane/head/body node literal | **run**: translated with `translateLegacy` and compiled with `root.compile(nodes)` — the pane is emitted (not dropped as a name-consumed provider), it inherits `pane-in-left` from the zone it stands in, and the head, body, grip (4 drops with `pane`/`zone` operands) and collapse control (`props.pane`) all stand |
| §3.1 the `state-slice` content write | **read**: `paintStyle`/`drivePageDisplay`'s own command shape, and the `Runtime.applyCommand` signature in `src/renderer/runtime.ts` |
| §4.3 the `status` leaf write | **run**: a real storeroom instance + `createViewRecord` — `committed`, and `read()` carries `status: 'busy'`; a fourth word is refused with the pane-geometry message naming `busy/waiting/done`. The `commitPane` trap was run too: `commitPane('pane-menus', { status: 'busy' })` answered `committed` and wrote **nothing** |
| §4.4 the `updatedAt` leaf write | **run**: `committed` and carried; a non-string is refused; a `undefined` value is refused at the crossing, and a delete at that leaf is refused by the pane's parse. The derivation's arms were run too: record word wins, expanded ⇒ no word, no stamp ⇒ no word, older look ⇒ `updated`, look at/after ⇒ no word, unparseable stamp ⇒ no word |
| §5.2 the `tabs` record shape | **run**: `createTabsRecord` over a fresh profile — `order: ['landing']` and the landing row's five members |
| §5.3 the stage page recipe | **read**: `driveLayoutRegions`' (c) arm (resolve the row's `target` through `elementForNodeId`, then `drivePageDisplay`) and `tabs-client.ts`'s witness |
| §6.1 the new-tab leaf write | **run**: both through the module's `commit` and as a **raw leaf write** at `['tabs', id]` — `order` gained the id, the landing row went `active: false`, exactly one row reads active, and a missing `label` was repaired to `'untitled'` |
| §6.2 the minted row datum | **read**: `driveTabsRows`' datum literal and its own measured notes (`label` first, `props` last, no `keyField`) |
| §7.1/§7.2 the two collapse leaf writes | **run**: `['panes', id, 'collapsed'] = true` at `file` and `['zones', id, 'collapsed'] = false` at `mem` are both admitted and carried by `read()`; a non-boolean and an undeclared zone id are both refused. `zoneCollapsedOf`'s arms were run: empty ⇒ collapsed, occupied ⇒ expanded, a stated word wins, an undeclared id answers expanded |
| §7's behaviours | **run** where a predicate answers (zone collapse's arms, the status derivation) and **read** where the behaviour is a gesture or a paint (relocation, the preview band, the pill) — a gesture's felt behaviour is not verifiable from this tree (D-178) |

**What was not verified.** Anything that needs the running app: the drag gestures, the painted geometry, the pill's
pixels, the rotated lane and the hit-scans are the rows' own measurements (D-244, D-249, D-261, D-272, D-284, D-285),
restated here and cited rather than re-derived. No example in this guide claims a measurement it did not take.
