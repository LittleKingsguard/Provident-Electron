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
`provident.dispatch` and `get_markdown`, and (measured, §8.6) `get_rendered_html` carries it only when it was appended
inside the mount, because that endpoint is the mount's own HTML (`AGENTS.md` § "Non-negotiables", quoting the charter at
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
**A family of your own — its address, the two lists it belongs in, the delivery it rides and what each half of that
delivery is handed — is §2.5. A change source that is NOT the record is §3.4**, and both are written from what this
tree already does rather than from a proposed extension.

---

## 2. Populating new panes

### 2.1 The authored node shape

A pane is **three authored things and one record**: a pane node, its **head row** (grip + collapse control), its
**body**, and the record that supplies its geometry and state. This is the shape the app authors, and it compiles —
see §11 for how that was checked:

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

### 2.5 A record family of your own

**The mechanism exists, and since `D-292` it is ONE object rather than four spellings you keep in step by hand.** A family
is an **address**, a **tier**, an **entry** the delivery carries and — where an invariant holds it — a **constraint
declaration** that repairs; `viewFamily(spec)` mints exactly that (`src/main/view-record/index.ts:1349`), `VIEW_FAMILIES`
is the tuple the app's own publications project over (`:1374`), and the three exports you spread are those **projections** —
`viewConstraintDeclarations` (`:1414`), `viewDeclaredRoots` (`:1455`) and `createViewDelivery` (`:1555`) — with the boot the
only place they meet (`D-219`).

**A family is ONE spec, and TWO of the boot's three lists become its projections** (`D-292`). `src/main/view-record/index.ts`
exports `viewFamily(spec)` and `VIEW_FAMILIES` (`:1349`, `:1374`): a spec is `{tag, address, tier}` and, for a family that
holds an invariant, `id` plus a **body factory** — `(getStore) => body`, deferred because `viewDeclaredRoots()` publishes
without a store. The object hands out `root` and `declaration | null`, and `viewConstraintDeclarations` (`:1414`) and
`viewDeclaredRoots` (`:1455`) are **projections** over that tuple — so a declaration cannot be published without its root.

**The THIRD list is not the object's, and it is the one that bites a fork.** Three lists are spread, at **two** calls:
`constraints:` at the store's one construction (`src/main/main.ts:437`) and the `data` surface's `declaredRoots:` at
`createDataSurface`'s options (`:640`) are the projections above, while **`listeners:` is the DELIVERY's** — `[...tabsDelivery.entries, ...viewDelivery.entries]` (`:452`) — and the
view delivery builds its entries from `VIEW_DECLARED_ADDRESSES` (`:1511-1516`), the module-private array that is deliberately
**not** derived from the tuple (`:1507`): if it were, the entries↔roots row below would compare the tuple with itself. **So a
family of your own gets a root and a declaration from its spec, and its ENTRY you supply yourself** — §3.4 is that shape —
and `createViewDelivery(sink)` will not carry your address, because it is closed to this app's four (`:1555`).

**The arms are `tag`-discriminated, and that is what makes the omission a compile error.** A `paired` spec requires `id` and
`body`; an `unpaired` spec declares them as **optional `never`**. Without the tag, a paired family that forgot its `body`
compiles as a lawful unpaired one — measured at this repo's own `tsc`, which is why the tag exists (`D-292`). **The
guarantee is ONE-DIRECTIONAL**: a root with no declaration stays lawful, and `['drag']` is that arm
(`tag: 'unpaired'`, and no declaration is the product — `D-145`, `D-132`). The object **declares and never registers**: it
mints no entry, no handle and no store verb, so per-family routing is still the sink's (§2.5's table, `D-219`, `D-71`).

**And the two relations are measured, one row each — and one row PER CROSSING.** `tests/integration/store-view-record/declared-entries.test.ts`
(`FH-1`) and `tests/integration/store-tabs-record/declared-entries.test.ts` (`FH-2`) both pin **entries ↔ published roots**:
set equality in both directions over the unfiltered publication, the equal count a duplicate cannot satisfy, and a falsifier
that drives one comparator through an omission, a spurious entry, a duplicate and an address-tuple collision (`D-292`).
`tests/integration/central-data/declared-root.test.ts` pins **declaration ↔ root**. Together they are why a fifth family
cannot go missing from one list. **The two crossings' rows differ in strength and each says so**: the view record's
four-address lists let the two directions differ in kind, while the tab record's 1 × 1 list makes the falsifier the
load-bearing arm — a duplicate passes its set arms and reds only its count.

**The tier is a declaration, and one of them is decided before your code runs.** Each family states its own tier in
`viewDeclaredRoots()` — `file` persists, `mem` lives in the register, `temp` persists nowhere — and the guard refuses a
write at your address that names a different tier (`declared-tier`, D-101). **The register's own tier is fixed at
creation**: a store built with no `filePath` can never reach `file`, so a `file` family needs that path supplied at the
one construction (`src/main/storeroom.ts`'s `ProfileStoreOptions.filePath` note, D-91).

**The value admission: refuse the member, never coerce it.** A family's judge is the same parse its read uses
(`paneOf`, `src/main/view-record/index.ts:576`), and it judges a member **only where it is stated, refusing it
otherwise**: `index` refuses `1.5`, `-1`, `'2'` and `null` rather than rounding or coercing; `collapsed` refuses a
non-boolean, because `0`/`''` would make a pane's state a truthiness question the module never states; `status` names one
of the closed three or is refused by name. **An absent member is lawful and means something** — absent `index` is the
family's own order, absent `collapsed` is expanded, absent `status` is no indicator (§2.2). **This is not strictness for
its own sake**: a value that stands and names a member the parse cannot state is refused **with no repair**, because the
read would drop that member and answer the default while `source` still said `'record'` (D-105).

**The two lists, and the different price of each omission.** Both are the **caller's** — `constraints` and `listeners`
are options of `createProfileStore` (`src/main/storeroom.ts:101`, `:119-120`) — and the one construction spreads the two
families' halves into them (`src/main/main.ts:437`, `:452`). **A family of yours belongs in both, and they are not the
same list**: this crossing publishes **four** roots and declares **three**, the fourth being `['drag']`, which no
invariant holds and no repair supplies (D-145, D-101).

- omit the **declaration**, and your family has no repair — nothing mints its creation value, and an absent family stays
  absent. **That omission is lawful only when no invariant holds your family**: `['drag']` is the precedent, and its
  absence is the product rather than a gap (D-145, D-132);
- omit the **root**, and two things stop: `data`'s guard cannot refuse a second version of your address at another tier
  (`src/main/data/types.ts:180-212`, D-101), and — the sentence that matters — *"a root the array omits is a write the
  renderer NEVER HEARS"* (`src/main/view-record/index.ts:1507`, D-137).

The count is asserted rather than promised: `tests/integration/central-data/declared-root.test.ts` pins the union root
for root, so a family in one list and not the other is a red rather than a surprise (D-26, D-43).

**The entry, and the two guarantees its body owes.** An element is `{ address, handle, listener }` with the **third
required**; a two-member element is refused `AddressMalformed` before any filesystem act (D-219). The body **writes
nothing** — a write opens a commit inside the commit that fired it — and **contains its own throw**, because at a
registration instant an uncontained one refuses the construction, which is this app's fatal arm (D-124, D-105).

**The declaration, its id, and what it actually repairs.** Three ids stand in ONE namespace with the tab record's batch
(`src/main/main.ts:435`): `panes-must-stand`, `zones-must-stand` and `theme-must-stand`
(`src/main/view-record/index.ts:119`, `:163`, `:166`). Each has **two arms, and they answer differently**: at the
family's **root**, an absent or unusable family is **repaired with the module's own placeholder**; a value that
**stands** and names a member the parse cannot state is **refused, with no repair** (D-105). The body judges
`context.value` and **never reaches for the instance**, because at the construction the boot's holder is not yet
assigned — the one instant that body is the only actor there is (`D-219`).

**And the placeholder must state what the paint needs.** Each family's default belongs to the module that owns it and is
never invented at the repair: panes repair to `defaultPaneGeometry()`, zones to `DEFAULT_ZONE_SIZES`
(`src/shared/view-shape.ts`), and the appearance family's resolution is its repair's own product (D-97, D-98). **The
measured lesson is D-233's**: a repair and a placeholder that both wrote a *memberless* record left a cold profile with
four zones and no fixed dimension, because the paint writes a zone's axis only from `['zones', id, 'size']` and invents
no fallback.

**What each half of the delivery is handed, measured rather than described.** Four facts a subscription model needs,
taken off the probe in §11:

| Question | The measured answer |
|---|---|
| what the **sink** gets | **the triggering address**, and it is usually a **leaf**: `["panes","pane-a","collapsed"]`, `["zones","top","collapsed"]`, `["panes","pane-a","status"]`. Route on `address[0]` or a prefix — **never** on equality with one of the four root literals (`crossing.test.ts:508-518` asserts by prefix for the same reason) |
| what a **subscriber** gets | **nothing**: a rest-parameter handler and a zero-parameter handler were both called at arity `0`, on every delivery |
| in what **order** | **fan-out first, then the sink**, on every delivery — one event with two readings, never two code paths (`D-92`) |
| a subscriber that **throws** | already contained at the fan-out: the delivery happened and the standing siblings were still served (`D-105`) |

**And the address does not cross the bridge.** The push is arity-zero (`src/main/main.ts:278`), the preload's
`onChanged(handler: () => void)` hands its handler nothing (`src/main/preload.ts:401-407`), and the client hands **a
whole reading** (`src/renderer/view-client.ts:214`, `:674-677`) — the rule as the shared types state it: *"the address
and the value stay on the main side and the renderer's listener answers with its own re-read"* (`src/shared/types.ts:354`).
**So a renderer consumer's unit of work is a re-read and a repaint**, and a family-scoped consumer in the renderer
filters on what it read, never on what it was handed. **The shape is the client's and the next delivery replaces it** —
`reading()`/`fill()` and the `paneGeometryOf`-style accessors serve the shape the client holds, so a consumer that keeps
its own copy of a value is a cache the design forbids (D-92).

**If you want per-family routing, take the sink — that is the expected use.** The sink is the caller's
(`createViewDelivery(sink)` is exported, `:1555`), this app's own sink already routes on the address it is handed
(`src/main/main.ts:308`), and it is the only half of the delivery an address reaches (D-92).

**The pre-window hold — the one delivery a bare `webContents.send` loses.** A delivery fires **at the construction**,
before any `BrowserWindow` exists: measured, the creation's repairs delivered `['panes']`, `['zones']` and `['theme']` with
no window and no subscriber registered. A send there is discarded, so each channel holds and flushes:
`createDeliveryQueue` (`src/main/main.ts:173-197`) and the secure crossing's `createPendingChange` (`:230-251`), armed at
the renderer's `IPC_READY` (`:1002-1016`, D-218, D-219). **A channel added without a hold loses exactly one delivery —
its first** — and the defect is recorded where it was fixed: *"the empty array this line replaces was the whole defect"*
(`:438-443`).

**And the seam constructs no instance.** `store` and `declaredRoots` are required and their fallback was deleted, because
a surface that can build a store is a surface one caller away from a second one (D-80, D-101) — so your family's wiring
lives **beside the boot**, in the one construction, and never inside a surface. **You provide** the family: its address,
its tier, its declaration, its placeholder and its channel.

**Read the two layer pages before you write one.** `docs/L2/view-record/family-object.md` is the object's contract at its
boundary and `docs/L3/view-record/family-object.md` is its structure, signatures and guardrails (`FG-1`…`FG-9`) — and two
facts you need live only there: **your spec joins the app's own exported `VIEW_FAMILIES` tuple**, and **both rows are an
independence census and not an agreement proof**: they red when a constant is dropped from or duplicated in either list, and
they cannot catch one wrong address spelled in both (`D-53`).

**Five checks that say a new family is wired**, from this section alone and before anything else is trusted: (1) a write
at its address commits, and a leaf write under it is **delivered**; (2) a member the parse cannot state is **refused**,
and the sentence names your family's vocabulary rather than another's; (3) its **creation repair delivers** on a scratch
profile with no act at all — §11's probe is that reading for the families that stand; (4) its root is listed in **both**
lists, which `declared-root.test.ts`'s equality row asserts for the crossings; (5) a channel added for it **loses no
delivery across a boot**, which needs the hold above and not a bare `send`.

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

**A source the app does not own is not a fourth route.** Data in your own database, file or peer reaches the screen
through the **same three**: what you add is a change signal and a re-read, and the paint stays the second route above —
§3.4 states the shape this tree already uses for it.

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
outside the graph. Such an element **cannot be dispatched and is not marked down**: it answers no `list_targets` entry
and `provident.dispatch` cannot address it, while `get_markdown` re-emits the graph and does not contain it — the whole
reason this template exists (`AGENTS.md` § "Non-negotiables"). **One measured correction to the flat "invisible
everywhere" reading, because it matters when you test**: `get_rendered_html` is the mount's own `innerHTML`, so an
element appended *under the mount* does appear in that fragment (an element placed outside the mount does not) — the
endpoint that should have caught it is the one that shows it, while nothing can press it or read it as an agent. §8.6
has the three answers quoted. It is also the one defect class **no row can catch**, because the page's scaffolding is
not provident data: D-231 found a `<header>` that had been there since the demo and read green everywhere.

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

### 3.4 When your data is not the record

**§3.1's three routes say how a rendered value changes, and none of them is a place to keep your data.** A pane whose
data lives in a database, a file or an HTTP peer keeps it there; what the app needs from you is **a signal and a
re-read**, in that order:

1. **your source** decides something changed;
2. **your channel** announces it — a push carrying **no value and no address**: nothing about your data crosses the
   bridge, because the push is a signal and the realm's answer is its own read (§2.5, D-92);
3. **your renderer consumer** re-reads your source and **paints through §3.1's second route**, a `state-slice` on the
   node. That step is not optional: a value painted by hand is invisible to `dispatch` and `get_markdown` (§3.2, D-231).

**The two halves are yours to supply.** A source declares the addresses it will announce, mints
`{address, handle, listener}`-shaped entries against them where it binds a record, and **calls its own sink** — the same
two halves `createViewDelivery` has (`src/main/view-record/index.ts:1555-1595`). **There is no construction to adopt
those entries**, which is why the ready/flush moment below is yours to state and not the boot's.

**Copy the pattern this tree already uses rather than inventing one.** Three deliveries for something that is not the
record are already here, and each is the shape to imitate: `IPC_MODULE_CHANGED` with `src/renderer/module-client.ts`'s
shape; `IPC_SECURITY_CHANGED` with `src/renderer/security-client.ts`; and the app-state rows behind the
`onAppStateDelivery` callback (`src/main/settings-surface/index.ts:109-113`, raised at `:186`) — *"called INSIDE the
instance's delivery body and never at a call site, a poll or a boot-order re-read"*. **Every channel is a closed literal**, not a registration: a constant in a
shared channels module (`src/shared/view-channels.ts`, `src/shared/tabs-channels.ts`), a member of the preload's
`ProvidentBridge`, and the renderer's `declare global` half — with the two halves compared **literally** by a gating row,
so a half-edit reds with both texts in hand (`tests/integration/store-view-record/crossing.test.ts:890-903`). **Adding
one touches four places**: the shared constant, the preload member, the renderer's declared half, and your client's
`subscribe` + `fill`.

**The invariants travel with the source, and they are the same four.** The listener body writes nothing and contains its
own throw (D-105, D-124); the push carries a signal and never a value (D-82 clause 2); the consumer's only correct answer
is a re-read; and **no timer, no poll, no retry** (D-82 clause 4).

**The test that keeps it from becoming a second store** is the client's own header: *"The provident-ssr graph is not a
store. It is a rendering engine. Do not refer to it as a store. Do not use it as one. It controls the render and the data
shape is driven by the listener events"* (`src/renderer/view-client.ts:4-5`). Applied to your source: it holds **no
address space, no persistence, no constraint and no journal**. A source that passes that sentence's test is a delivery
source; one that fails it is a store wearing a channel.

**The one instant it cannot promise** is §2.5's pre-window hold: there is no construction to adopt your entries, so
**your source states its own ready/flush moment**, and what a consumer may assume before it. **You provide** the source,
its addresses, that moment, and the re-read.

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
status-only payload answers `committed` and **writes nothing** (§11, probe A; quoted in §8.5). Write the member at its own
leaf instead:

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

**You cannot clear that stamp through a LEAF write or a leaf delete at it, and the corpus does not want you to.** A
`undefined` value is refused at the crossing's boundary (*"`undefined` is not a value the JavaScript crossing admits"*),
and a **delete** at that leaf is refused by the pane's own parse — both quoted in §8.1. The `updated` **word** is cleared
instead by the comparison `paneStatusOf` makes: a look at or after the content's stamp clears it (D-269 §6's `T4`). That
is the shape the user's ruling asks for — the component owns the channel and the comparison, **the fork owns what counts
as a look**. **The stamp itself has exactly two clearing routes, both measured in §8.1**: a whole-record write at
`['panes', <id>]` that omits it (which also replaces every member you do not restate), or deleting `['panes']` and
letting `panes-must-stand` re-mint the placeholder (which resets every figure to `100`). Neither is a route to reach for;
both exist, and saying so is cheaper than a fork discovering them by accident.

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
`{ order: ['landing'], landing: 'landing', rows: [ that row ] }` (§11, probe G's "before"). **So do not import it**: the
name does not exist and your build stops on it, and the three that do exist come from `src/shared/view-shape.ts` — §8.3
quotes both the build error and the floor you read back instead.

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

What the corpus then does for you — measured in §11's probes G/H/K except where marked *read*:

- `order` becomes `['landing', 'tab-3']` — **the seat repair's append, not the act's promise**;
- the previous active row reads `active: false`, and exactly one row reads `active: true`;
- a **missing `label` is repaired to `'untitled'`** by `tab-has-title` — not to the id, and not to your target. The
  chip's text is the record's `label`; **you provide** a title if you want one;
- a missing `target` is repaired to the authored landing page by `tab-has-content` (*read*: `healRecord`'s two field
  defaults), and a missing `lastActiveAt` is stamped with the repair's clock.

**A tab row has NO `index` member.** The order of tabs is the `order` seat, one stored array; `index` is the *pane*
family's per-record place (D-259). Do not look for it in a row and do not write it — **and if you write it anyway, nothing
refuses you**: the leaf route answers `{"status":"committed"}` and the member sits in your profile's bytes while `read()`
never returns it (quoted, §8.2). The seat is the repair's even when you write it by hand.

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

## 8. What refuses you, and what commits but is wrong

Every refusal in this guide is stated in one line where the behaviour lives, and **one line is not enough when you are about
to write the code.** So this section takes each of them the same four ways: **the attempt** a fork reasonably writes,
**what actually happens** (the answer, quoted — a refusal's reason and sentence, a repair's verdict, a parse's message, or
the `undefined` that comes back, never a paraphrase of it), **why** (the mechanism and the row that owns it), and
**instead** (the route that *is* lawful, as a snippet, or a statement that there is none and why the mechanism cannot
have one). Every quoted answer below was **run** at this head against a real storeroom and the real view and tab records
on a scratch profile; §11 carries one probe row per item and marks the two that needed the layout-less DOM shim. In the
quotes below **`…` marks members omitted for width and nothing else** — no word inside a quote is re-spelled.

**Four of these are refusals, three are silent, and the silent ones do the damage.** A fork that reads only the refusals
walks into a write that returns `committed` and leaves the surface in a state nobody stated, so the verdict column is the
one to read first:

| Behaviour you will try | Verdict | What it costs you |
|---|---|---|
| `updatedAt` cleared at its own leaf (`undefined`, then `delete`) | **REFUSED** — `value-not-admitted`, then `ConstraintPassRefused` | two sentences and no way to spell absence at a leaf |
| a tab row's `index` | **COMMITTED-BUT-WRONG** — in the profile's bytes, in no read | order is the `order` seat's (D-156) |
| `viewTabsPlaceholder` | **REFUSED** — no such export; your build stops | the tab placeholder is private (D-286) |
| `commitPane` with a status-only payload | **COMMITTED-BUT-WRONG** — `{"status":"committed"}`, nothing written | the route carries `{width?, height?, bounds?}` only |
| an undeclared pane or zone reference | **REFUSED** — `parent-absent`, `undeclared-pane`, `undeclared-zone` | both id domains are closed (D-138, D-151) |
| hand-written DOM | **REFUSED** at `dispatch`, **SILENT** at `get_markdown`, **LEAKED** into `get_rendered_html` | no graph node — and a silence is worse than a refusal |
| a `css.style` write | **COMMITTED-BUT-WRONG** — the whole declaration block replaced | `replace` mode, one value (D-234) |

### 8.1 Clearing `updatedAt` through the data route

**The attempt.** The two things a fork reaches for, and both are the obvious spelling of "there is no stamp now":

```ts
await dataRoute('write', { path: ['panes', 'pane-menus', 'updatedAt'], tier: 'file', value: undefined })
await dataRoute('delete', { path: ['panes', 'pane-menus', 'updatedAt'], tier: 'file' })
```

**What actually happens.** Two different refusals, and the first one's sentence names the boundary's whole domain:

```json
// (i) the write, refused at the crossing's boundary
{"status":"refused","reason":"value-not-admitted",
 "message":"'undefined' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at the write's value argument is undefined",
 "log":[],"path":["panes","pane-menus","updatedAt"]}

// (ii) the delete, refused by the pane's own parse
{"status":"refused","reason":"store-refused","storeStatus":"ConstraintPassRefused",
 "message":"the pane geometry carries a member that is no geometry — no finite non-negative width or height, or a bounds pair of two finite numbers whose min does not exceed its max, or a zone the pane names that this record does not declare, or an index that is not a non-negative integer, or a collapsed that is not a boolean, or a status outside busy/waiting/done, or an updatedAt that is not a string, or a pane id this record does not declare"}
```

The stamp is still there afterwards — `{"id":"pane-menus","width":100,"height":100,"zone":"top","updatedAt":"2026-11-12T10:00:00.000Z"}`
— and the same delete aimed at the pane itself (`['panes','pane-menus']`) is refused with the same sentence, so there is no
"delete a bigger thing and take the member with it" either.

**Why.** The crossing's boundary carries strings, booleans, finite numbers, plain objects and arrays and **refuses
`undefined` and `null`** (measured, D-87, D-91), so absence is not a value it can be handed; and a delete at that leaf hands
the panes family's parse a member it cannot admit, because `updatedAt` must be a string where it is stated
(`paneNodeAdmits`) — the delete is refused rather than landed (D-269 §6, D-242).

**Instead.** One route does clear it, and its price is every member you do not restate:

```ts
// THE WHOLE RECORD, WITHOUT THE STAMP: committed, and `updatedAt` is gone from the read.
await dataRoute('write', {
  path: ['panes', 'pane-menus'],   // the pane's own address: a whole-record write REPLACES the record
  tier: 'file',
  value: { width: 100, height: 100, zone: 'top' },   // BOTH axis members are required — omit one and the write is refused
})
```

Measured: the answer is `{"status":"committed","repaired":false}` and the pane then reads
`{"id":"pane-menus","width":100,"height":100,"zone":"top"}` — the stamp went, **and so did the `status` word and
`collapsed` if you did not restate them** (§8.8). A record missing `width` is refused with the sentence above. The second
route is the family root: `store.delete(['panes'], 'file')` answers the delete's own record (`"tiers":["file"]`, the `op`)
and `panes-must-stand` re-mints the placeholder — the stamp gone and **every figure back to `100`**.

Neither is the route the corpus wants. **The `updated` word is cleared by the LOOK, not by a write**: `paneStatusOf`
compares the content's stamp against the realm's last look and shows nothing when a look stands at or after it (§4.4,
D-269 §6) — zero writes, and the policy of what counts as a look is the fork's half (§10).

### 8.2 A tab row's `index`

**The attempt.** Order looks like a per-row place, so a fork writes one — the same member that works on a pane (§7.3):

```ts
await dataRoute('write', { path: ['tabs', 'tab-2', 'index'], tier: 'file', value: 3 })
// or in the row it hands the record:
tabs.commit({ id: 'tab-3', target: 'notes-page', active: true, lastActiveAt: stamp, index: 9 })
```

**What actually happens.** Nothing refuses you, and nothing reads it back. Three answers, quoted:

```json
// the raw leaf write: COMMITTED, and the member is in the profile's bytes
{"status":"committed","path":["tabs","tab-2","index"],"repaired":false, …}
// tabs.read() — the rows carry {id, target, active, label, lastActiveAt} and no `index` at all
{"status":"committed","order":["landing","tab-2"],"landing":"tab-2",
 "rows":[{"id":"landing",…},{"id":"tab-2","target":"notes-page","active":true,"label":"untitled","lastActiveAt":"2026-11-12T10:00:00.000Z"}]}
// and the profile file, read off disk after that act:
"tab-2":{"active":true,"id":"tab-2","index":3,"label":"untitled","lastActiveAt":"…","target":"notes-page"}
// the same member through the record's own route is dropped BEFORE the write:
tabs.commit({ id:'tab-9', …, index: 5 })  →  {"status":"committed","repaired":true}, and the stored row has no `index`
```

So: **not refused, silently persisted by the leaf route, and invisible to every reader** — a member sitting in your
profile that no read, paint or minted row will ever see. The route's `{"status":"committed"}` is the whole of the
feedback you get.

**Why.** The tab record's order is a **singleton seat**, one stored array `order`, and insertion is one fact the
`order-names-its-tabs` repair owns (D-156); `index` is the **pane** family's per-record place (D-259, §7.3). A row
carrying one is a second authority, and `rowOf` drops a member it does not name rather than carrying it.

**Instead.** Write the row (§6.1) and let the seat repair place it; to re-order, write the seat — and even *that* is the
repair's answer, not yours:

```ts
// writing the seat by hand over three standing tabs: committed AND repaired
await dataRoute('write', { path: ['tabs', 'order'], tier: 'file', value: ['landing', 'tab-2'] })
// → {"status":"committed","repaired":true}; the read carries order: ["landing","tab-2","tab-3"] — the repair appended it back
```

**The contrast is what makes the silence visible, and it is worth one line of code in your own probe:** on a PANE the same
member is the lawful one — `dataRoute('write', { path: ['panes','pane-menus','index'], tier:'file', value: 1 })` answers
`{"status":"committed"}` and `read()` carries `"index":1`; `1.5` is refused with §8.1's `PANE_UNUSABLE_MESSAGE`. That is
`index` doing its job in the family that owns it.

### 8.3 `viewTabsPlaceholder`

**The attempt.** Three view placeholders exist, so a fourth name reads as an obvious symmetry:

```ts
import { viewTabsPlaceholder } from '../../main/view-record/index.js'
const placeholder = viewTabsPlaceholder()
```

**What actually happens.** There is no such export, and you find out at build time rather than at the call:

```
✘ [ERROR] No matching export in "src/main/view-record/index.ts" for import "viewTabsPlaceholder"
```

and with no bundler in the way, at link time:

```
SyntaxError: The requested module '/tmp/…/view-record.mjs' does not provide an export named 'viewTabsPlaceholder'
```

Read off the modules themselves, the placeholder names that do exist are exactly
`["viewPanesPlaceholder","viewThemePlaceholder","viewZonesPlaceholder"]`; `"viewTabsPlaceholder" in module` is `false` for
both the view-record and the tabs-record module, and the tabs record exports **no** name matching `/[Pp]laceholder|[Ll]anding/`
at all — its placeholder is the module-private `landingRow` its creation repair mints.

**Why.** The three `view…Placeholder` values are the *view* record's creation repairs' values, minted per family (D-91,
D-97, D-233); the tab record's floor is the `tabs-must-stand` repair's own private row (D-286's first refusal).

**Instead.** The three that exist come from the one spelling both realms read, and the tab floor is *read back* rather
than imported:

```ts
import { viewPanesPlaceholder, viewZonesPlaceholder, viewThemePlaceholder } from '../../shared/view-shape.js'

// THE TAB RECORD'S FLOOR — read it, do not import it. Measured on a fresh profile:
const floor = tabs.read()
// {"order":["landing"],"landing":"landing",
//  "rows":[{"id":"landing","target":"tabs-landing-page","active":true,"label":"landing","lastActiveAt":"2026-11-…"}]}

// AND IF YOU NEED THE ID ITSELF, there is one spelling for it:
import { TABS_LANDING_ENTRY_ID } from '../../shared/tabs-landing.js'   // 'landing'
```

A fork that wants a placeholder row of its own **authors it** — that is §6.1's write, and it is the fork's half.

**And a placeholder for a family of your own is `§2.5`'s subject, not this section's.** All three names above belong to
*this* app's view record; a family you add mints its placeholder inside its own creation repair, and `§2.5` states what
that repair must guarantee — including the rule `D-233` measured, that a placeholder stating no figure leaves a cold
profile whose paint has nothing to paint.

### 8.4 An undeclared pane or zone reference

**The attempt.** The pane you added to the envelope, named in the record:

```ts
await dataRoute('write', { path: ['panes', 'pane-notes', 'width'], tier: 'file', value: 100 })
await dataRoute('write', { path: ['zones', 'zone-1', 'size'], tier: 'mem', value: 100 })
view.commitPane('pane-notes', { height: 100 })
```

**What actually happens.** The store's own sentence names the declared set, which is the useful part of the answer:

```json
{"status":"refused","reason":"parent-absent",
 "message":"'pane-notes' does not exist in 'panes', panes are 'pane-a', 'pane-inspector', 'pane-menus'",
 "log":[],"path":["panes","pane-notes","width"]}

{"status":"refused","reason":"parent-absent",
 "message":"'zone-1' does not exist in 'zones', zones are 'bottom', 'left', 'right', 'top'", …}

{"status":"refused","reason":"undeclared-pane",
 "message":"the pane id names no pane this record declares, and the pane family is addressed only by its declared ids",
 "address":["panes","pane-notes"]}

// the zone route's own domain arm, same shape:
{"status":"refused","reason":"undeclared-zone","address":["zones","zone-1"],
 "message":"the zone id names no zone this record declares, and the zone family is addressed only by its declared ids"}
```

A value that *names* an undeclared id answers `"reason":"store-refused","storeStatus":"ConstraintPassRefused"` from the
family's own judge, whose sentence is the family's and not the route's:

```json
// dataRoute('write', { path: ['panes'], value: { 'pane-a': {…}, 'pane-notes': { width: 100, height: 100 } } })
{"status":"refused","reason":"store-refused","storeStatus":"ConstraintPassRefused",
 "message":"the pane geometry carries a member that is no geometry — … , or a pane id this record does not declare"}

// dataRoute('write', { path: ['zones'], value: { top: { size: 140 }, 'zone-1': { size: 10 } } })
{"status":"refused","reason":"store-refused","storeStatus":"ConstraintPassRefused",
 "message":"the zone family holds a member that is no record, or a zone carrying a size that is not finite and non-negative, a distance that is not finite, a display that is not a string, a collapsed that is not a boolean, or a slot the crossing refuses, or a zone id this record does not declare"}
```

So the closure has two seats — the route's domain arm and the family's judge — and a fork meets both.

**Why.** Both id domains are closed at the route **and** at the family's own judge, because a leaf write needs the parent
node to stand and the store creates no parent: an open set could guarantee nothing, and a route-only closure would leave
an outside writer free to mint the id (`DECLARED_PANE_IDS`, `DECLARED_ZONE_IDS`; D-138, D-151, D-183, D-192).

**Instead.** Declare the id where the record can see it — §2.4's five places — or, if the pane is yours, use a declared
one. Nothing else will make `['panes', 'pane-notes', 'width']` land.

### 8.5 `commitPane` with a status-only change

**The attempt.** The route that carries a pane's figures looks like the route that carries its state:

```ts
const answer = await viewRecord.commitPane('pane-menus', { status: 'busy' })
```

**What actually happens.**

```json
{"status":"committed"}
```

and **nothing moves**: `read()` still answers `{"id":"pane-menus","width":100,"height":100,"zone":"top"}` with no `status`
at all. The same act with the retired member is the same act — `commitPane('pane-menus', { size: 40 })` →
`{"status":"committed"}`, nothing written.

**Why.** `commitPane`'s argument is the record's own member set, `{width?, height?, bounds?}` (D-138, D-189, D-191), and a
payload supplying **zero** of them writes nothing and answers `committed`, because the state it names — the declared
pane's node already standing with its geometry — is already true. That is `D-53`'s "a delete that removes nothing is the
store's own success" read at a route, and it is why the answer word is not evidence of a write.

**Instead.** Write the member at its own leaf, which is the act the app itself makes for a bar member (§4.3):
`dataRoute('write', { path: ['panes','pane-menus','status'], tier:'file', value:'busy' })` answers
`{"status":"committed","repaired":false}` and `read()` then carries `"status":"busy"`; a fourth word (`'idle'`) is refused
with §8.1's sentence. A fork that wants the status to ride a *figure* commit is asking for two authorities in one act — the
route carries the geometry and the leaf carries the state, and the paint reads both.

### 8.6 Hand-written DOM

**The attempt.** The one every fork makes, in the first hour, because it is the shortest path from data to pixels:

```ts
const badge = document.createElement('div')      // the ids below are the probe's, so the quotes match it
badge.id = 'hand-written'
badge.textContent = 'THIS IS HAND-WRITTEN DOM'
badge.setAttribute('data-probe', 'hand-written')
mount.appendChild(badge)                          // or document.body.appendChild(badge) — outside the mount
```

**What actually happens — and the three endpoints do not agree, which is why this one is worth reading twice.**

```json
// provident.dispatch at the hand-written id
{"status":"rejected"}

// get_markdown, with the badge present on the page — the graph's own text only
"this one is the graph"

// get_rendered_html — the badge is IN the fragment when it was appended under the mount
"<div … id=\"graph-node\">this one is the graph</div><div data-probe=\"hand-written\" id=\"hand-written\">THIS IS HAND-WRITTEN DOM</div>"
// and after one graph render it is still there: the fragment contains "hand-written"
```

Appended **outside** the mount, the fragment does not carry it at all. Appended **inside**, it does — because
`get_rendered_html` is the mount's own `innerHTML` (`runtime.ts`'s `renderedHtml`), not a re-emission of the graph.

**So: refused at the endpoint that would let anything *press* it, silent at the endpoint that says what the page *is*, and
visible in the one that only says what it *looks like* — and that last case is worse than a refusal.** A refusal would
tell you; this looks finished and correct on the surface, reads as nothing to an agent, and answers `rejected` to every
attempt to touch it. It is D-231's class exactly: a `<header>` that had stood in this demo since the beginning, was read
green by every row, and was not provident data.

**Why.** The graph is the authority and the element is not a node in it, so there is no `data-node-id`, no target for
`dispatch`, and nothing for the markdown adapter's actionable set (charter §"Project-wide constraint (UI rendering)",
`archive/gate-corpus-2026-10-29/AGENTS.md:22-34`; D-122, D-231).

**Instead.** Author the node (§2.1). The same markup as a node literal is data, and everything above sees it: `dispatch`
resolves it, `get_markdown` emits its text, and `get_rendered_html` carries it because the graph drew it.

### 8.7 A `css.style` write

**The attempt.** One figure to change, so one declaration to write:

```ts
runtime.applyCommand({
  kind: 'state-slice',
  node: 'zone-top',
  mutation: [{ targetProp: 'css.style', mode: 'replace', value: 'height: 120px' }],
})
```

**What actually happens.** The engine applies it and **the whole declaration block it replaced is gone**:

```json
{"status":"applied","dirtied":["node-2"]}
```

```html
<!-- before: <div data-wire="node-2" data-node-id="node-2" id="zone-top" style="height: 140px; overflow-x: auto;">top</div> -->
<div data-wire="node-2" data-node-id="node-2" id="zone-top" style="height: 120px">top</div>
```

The authored `overflow-x: auto` went with the height it sat beside — exactly the failure D-243 measured on `#pane-menus`
(`style="width: 100px;"`, its authored `height: 100%` and `overflow-x: auto` gone). **The value is CSS TEXT and not an
object**, and that is a second trap on the same member: an object in that slot answers the same `applied` and renders
`style="{"height":"120px"}"` under this shim, while in a real Electron DOM it writes nothing at all and the attribute is
left empty (D-203, upstream-owned and recorded rather than patched).

**Why.** `replace` mode carries one value for the whole `css.style` member, so a write that does not restate a declaration
removes it (D-234, D-240, D-243, D-225).

**Instead.** Put a painted node's static layout on a **class**, or on a **child the paint never touches**, and where a paint
arm must compose a style it restates **every** part it needs, reading `LAYOUT_ZONE_AXES` rather than declaring a second
table (§3.3, D-243).

### 8.8 The other writes that succeed and are wrong

Each of these answers `committed` (or `applied`) and leaves a state nobody stated. They are listed together because a fork
that only reads the refusals walks straight into them:

| The write | The observed answer | What it leaves |
|---|---|---|
| `['panes', id]` written whole to change a figure | `{"status":"committed","repaired":false}` | the record replaced: `status`, `collapsed`, `updatedAt`, `index` all gone unless restated (§8.1) |
| `commitPane('pane-menus', { width: 40 })` | `{"status":"committed"}` | `"width":40` stored — a pane narrower than its own head; the renderer will not floor it (D-280, §7.5) |
| `['zones','top','size'] = 10` | `{"status":"committed", …}` | `{"id":"top","size":10}` — heads clipped below their boundary (D-280) |
| `['zones','top','display'] = 'none'` | `{"status":"committed", …}` | `{"id":"top","size":140,"display":"none"}` — a whole-zone hide with no affordance (D-244 §5) |
| `['tabs','order'] = [...]` written by hand | `{"status":"committed","repaired":true}` | the seat the repair composed, not the array you wrote (§8.2) |
| `commitPane(id, {width, height})` — both axes | `{"status":"refused","reason":"malformed-geometry"}` | nothing; that one *is* a refusal, and the message names the clause |

**What could not be run, and is therefore not claimed here.** The three MCP endpoints in §8.6/§8.7 were driven through the
renderer's own runtime (`renderedHtmlResult()`, `markdown()`, `applyCommand()`) under the layout-less DOM shim — the same
`renderedHtml()` code path a live renderer serves, but **not** a spawned app, so `provident.dispatch`'s refusal is the
runtime's own `{"status":"rejected"}` and not the MCP tool's envelope. A live renderer's painted geometry, the pill's
pixels and the drag's felt behaviour are §7's rows and their owners' measurements (D-244, D-249, D-261, D-272, D-280,
D-284, D-285), restated and cited rather than re-derived (D-178).

---

## 9. What a fork must NOT copy

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

## 10. "You provide this" — the fork's own half

| The component supplies | You supply |
|---|---|
| the `updatedAt` **channel** (an optional string member, admitted at its own leaf) | **the producer**: what your content's change instant is, and when to write it (D-269 §6) |
| the `updated` **word** and its derivation (`paneStatusOf`'s five arms) | **the "last view" policy**: what counts as a look at your pane (D-269 §6) |
| the landing/error **terminal predicates** as this app states them | **your pages**: which node ids your tabs' `target`s name, and which of them your terminals show (§5.3) |
| a closed three for `status`, enforced by name | **which word** your pane's work is in, and when (D-269) |
| `DECLARED_PANE_IDS`, `DECLARED_ZONE_IDS`, the drop operands, the three node maps | **your ids**, declared where the record can see them (§2.4) |
| a census instrument and the shape of its terms | **your census figures** (§2.4) |
| the four families, their tiers and their routes | **your pane names** (`props.name`), your menu, your theme control |
| a delivery with two halves — entries and a sink — and a construction that adopts the entries (§2.5) | **your family**: its address, its tier, its declaration, its placeholder, and the routing in your own sink |
| the channel pattern, the lockstep rule and the four invariants (§3.4) | **your source**, its addresses, its ready/flush moment, and its re-read |

---

## 11. How the examples in this guide were checked

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
| §8.1 the two `updatedAt` clearing attempts | **run**: a real storeroom + `createViewRecord` + `createDataSurface` — `undefined` at the leaf refused `value-not-admitted` with the boundary's own sentence, the delete at that leaf refused `ConstraintPassRefused` with the pane parse's sentence, the stamp still carried after both; the whole-record write committed and the member gone; `store.delete(['panes'])` answered its delete record and `panes-must-stand` re-minted the placeholder |
| §8.2 a tab row's `index` | **run**: the raw leaf write committed and the profile's bytes carry `"index":3` while `tabs.read()` returns no `index`; `tabs.commit` with an `index` dropped it before the write (the stored row has none); the hand-written `['tabs','order']` answered `repaired:true` with the seat appended back; the PANE's `index` leaf committed and read back, and `1.5` was refused |
| §8.3 `viewTabsPlaceholder` | **run**: esbuild's `No matching export in "src/main/view-record/index.ts" for import "viewTabsPlaceholder"` and node's link `SyntaxError: … does not provide an export named 'viewTabsPlaceholder'`; both modules' export names filtered for `/[Pp]laceholder/` answer only the view record's three |
| §8.4 the undeclared pane and zone | **run**: the four answers quoted, plus a family write and a `zone` member naming an undeclared id (both `ConstraintPassRefused` with the pane/zone sentence) |
| §8.5 the status-only `commitPane` | **run**: `{"status":"committed"}` and `read()` unchanged; `{ size: 40 }` the same; the lawful leaf write beside it committed and was carried |
| §8.6 hand-written DOM | **run under the layout-less DOM shim** through `Runtime.applyCommand`/`renderedHtmlResult()`/`markdown()`: the hand-written id answers `{"status":"rejected"}`, the markdown omits it, the rendered fragment carries it when it was appended under the mount and omits it outside; **not run against a spawned app** |
| §8.7 the `css.style` replace | **run under the same shim**: `{"status":"applied","dirtied":["node-2"]}` and the authored `overflow-x: auto` gone from the fragment; the object spelling's `style="{"height":"120px"}"` measured here, its live-DOM "writes nothing" arm is D-203's |
| §8.8 the writes that commit but are wrong | **run**: each answer in that table is a measured one, from the same scratch profile |
| §2.5 the delivery's contract — sink address, subscriber arity, order, containment | **run**: a real `provident-storeroom` + `createViewDelivery` + `createViewRecord` over a scratch profile — the sink was handed `["panes","pane-a","collapsed"]`, `["zones","top","collapsed"]` and `["panes","pane-a","status"]` (the **leaf**, never the root) while a rest-parameter subscriber and a zero-parameter subscriber were both called at arity `0`; the order was `handler` then `sink` on every delivery; and a subscriber that threw left its siblings served |
| §2.5 the creation's pre-window deliveries | **run**: the same probe — the construction's repairs delivered `['panes']`, `['zones']` and `['theme']` before any window existed and with no subscriber registered |
| §2.5 the value admission, the declaration ids and the placeholders | **read**: `paneOf`'s member-by-member refusals (`src/main/view-record/index.ts:576-600`), `panesMustStand`/`zonesMustStand`'s two arms (`:1014-1110`), the three id constants (`:119`, `:163`, `:166`) and the defaults in `src/shared/view-shape.ts`; the `1.5` refusal itself is §8.2's **run** row |
| §3.4 the source's two halves | **read**: `createViewDelivery`'s entries-and-sink pair (`src/main/view-record/index.ts:1555-1595`) |
| §2.5 the family object and its two rows | **run**: `tests/unit/store-view-record/family-object.test.ts` (`FH-3` — both projections of one spec, the explicit `null`, the deferred body factory, five refused literals carried as `@ts-expect-error`, two admitted controls, and a must-compile narrowing read) and `tests/integration/store-view-record/declared-entries.test.ts` (`FH-1`, the entries↔roots row); the tag-versus-untagged difference is a `tsc` reading recorded in `D-292` |
| §2.5 the two lists and the price of each omission | **read** + the row that owns the count: `src/main/main.ts:437`, `:452`, `src/main/storeroom.ts:101`, `:119-120`, and `tests/integration/central-data/declared-root.test.ts`'s union equality |
| §3.4 the channel pattern and the lockstep rule | **read**: the three clients' headers, `src/main/preload.ts`'s bridge literal, and `crossing.test.ts:890-903`'s lockstep row |
| §7's behaviours | **run** where a predicate answers (zone collapse's arms, the status derivation) and **read** where the behaviour is a gesture or a paint (relocation, the preview band, the pill) — a gesture's felt behaviour is not verifiable from this tree (D-178) |

**What was not verified.** Anything that needs the running app: the drag gestures, the painted geometry, the pill's
pixels, the rotated lane and the hit-scans are the rows' own measurements (D-244, D-249, D-261, D-272, D-284, D-285),
restated here and cited rather than re-derived. **§8's two shim rows are marked shim rows for the same reason**: they drove
the renderer's own runtime in node under `src/shared/dom-shim.ts`, so their answers are the runtime's and not a spawned
app's — the `renderedHtml()` they read is the same `mount.innerHTML` call a live renderer serves, and no row here claims
the MCP tool envelope for it. **§2.5's two run rows are main-process rows and say so**: they drove a real store in node
with no window and no Electron, which is exactly why the pre-window hold's **flush** is not among them — the arming
instant is D-218/D-219's measurement and the boot battery's, cited here rather than re-taken. No example in this guide
claims a measurement it did not take.
