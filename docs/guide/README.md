# Developer guide — Provident-Electron as a prebuild baseline

## Who reads this

Two readers, and every page is written for both:

1. **A developer consuming this repo as a prebuild baseline** for an Electron app
   running on `provident-ssr`. You are not changing this code yet; you need to know
   what already works, what a tool call costs, and which parts are the shell's own
   chrome versus your app's UI.
2. **A fork author implementing the seam contracts.** You are replacing an injected
   reading, supplying a real host, or adding a surface. You need the contract each
   mechanism obeys, the names it exports, and the **declared degradation** when a
   seam you must supply is absent, non-callable or throwing.

If you are looking for the normative contract, you are in the wrong place: the
contracts are `docs/specs/*.md` and `docs/specs/mcp-endpoint.md`. **This guide cites
them and never restates them** — a restated clause is a second authority that drifts
silently. See `docs/guide/TEMPLATE.md`, which is binding on every page here.

## Reading order

1. **`00-base-surface.md`** — read first, always. The tool set, the resources, the
   dispatch path, the runtime, the renderer wiring, the preload bridge, the group
   model.
2. **`mcp-parity.md`** — read second. What the agent sees versus what the operator
   sees, and what is deliberately invisible to MCP.
3. **`seams.md`** — read third, and read it as a fork author. Every seam in the
   repo's closed wave, in one table, with its declared degradation.
4. **The mechanism pages**, in ledger order (wave E, then wave F) — or jump straight
   to the one mechanism you are changing. Each page is self-contained: it names its
   unit id, its files, its exports and its contract sections.
5. **`TEMPLATE.md`** — read before writing or reviewing a page in this tree.

## The pages

| Page | Unit / surface | Purpose |
| --- | --- | --- |
| `README.md` | this file | the index, the readers, and the reading order |
| `00-base-surface.md` | the base surface | the MCP tool set (arguments + result shape per tool), the resources, the dispatch path, the runtime's methods, the renderer wiring's entry points, the preload bridge, and the gate/group model (the group set is five, the mutating set seven) |
| `theme.md` | **`U-THEME`** (wave E, `E8`) | the pure total appearance resolver (`resolveTheme`) and the declaration-only applier (`applyThemeDeclaration`) — one opaque caller token × one injected environment reading, returning a declaration as data |
| `theme-control.md` | **`U-THEME-CONTROL`** (wave F, `F1`) | the authored provident appearance control in the demo envelope: a closed authored setting-token block × one graph-readable state node, read back through the existing tools |
| `overlay.md` | **`U-OVERLAY`** (wave E, `E9`) | the pure total overlay state machine (`overlayTransition`) and the inert-background declaration (`overlayInertDeclaration`) — with the re-parent half refused |
| `menulib.md` | **`U-MENULIB`** (wave E, `E7`) | the consumer-agnostic menu-template builder: `normalizeCatalog` + `buildMenuTemplate` + `selectCatalogItem`, with one injected picker seam |
| `container.md` | **`U-CONTAINER`** (wave E, `E5`) | the pure selector/normalizer mechanism (`tokensFor`, `orientationFor`, `containerDeclarationFor`) and the returned-as-text `contain` declaration |
| `relocate.md` | **`U-RELOCATE`** (wave E, `E4`) | the node-local relocate/drop session `createRelocateSession` composed on the landed gesture session, plus the exported pure total `withinProximity` |
| `gutter.md` | **`U-GUTTER`** (wave E, `E3`) | the node-local resize controller `createResizeController` composed on the landed session, plus the exported pure `clampToBounds` |
| `gutter-ui.md` | **`U-GUTTER-UI`** (wave E, `E10`) | the provident-authored gutter affordance: `createGutterAffordance` in `src/shared/`, the eleven seams of `gutterSeamExample()`, and the renderer wiring that attaches it |
| `zones.md` | **`U-ZONES`** (wave E, `E1`) | the pure track-token mechanism (`isEmpty`, `trackFor`) that turns a size + an empty-census reading into a track token |
| `focus-model.md` | **`U-FOCUS-MODEL`** (wave F, `F2`) | the pure ordered-entry transition reducer over opaque ids/targets: `focusTransition`, `focusOrder`, `focusIndex`, `persist` — no store, no DOM, no vocabulary |
| `focus-tool.md` | the **`provident.focus`** tool (`U-FOCUS-TOOL`, wave F, `F3`) | the 22nd MCP tool and its method member: a thin adapter that routes the caller's `{ target?, newTab? }` to the renderer's own wiring-held focus state and returns the holder's answer |
| `mcp-parity.md` | MCP parity | the parity surface: which views must agree (`renderedHtml` / `ssrHtml` / markdown), what the agent can and cannot observe, and the notification/push rules |
| `seams.md` | the seam contracts | every seam in the closed wave in one REQUIRED/OPTIONAL table, with its supplier and its declared degradation for absent / non-callable / throwing, each cited |
| `TEMPLATE.md` | the page template | the binding section order and the two rules (**never restate a spec**, **never claim behaviour you have not read**) |

Page filenames are the planned set for the wave just closed (ledger: **`21 DONE /
0 open`** units, `docs/next-steps.md`). Pages 05-12 are named after the unit id in
kebab form; `focus-tool.md` is named after the tool it documents because the unit
`U-FOCUS-TOOL` exists to land that one tool.

## Units that have no page here

The ledger is closed at **21 units** (`docs/next-steps.md`, the `U-FOCUS-TOOL`
close-out row). The waves also closed units whose mechanisms the two readers above
do not consume directly — the engine-pin / engine-drift measurement pair, the
divergence leg, the mount-invariant guard, the census and layout-projection
mechanisms, and the two owned-host families. They are **not** covered by a page in
this set; their contracts are `docs/specs/census.md`, `docs/specs/projection.md`,
`docs/specs/listhost.md`, `docs/specs/slothost.md`,
`docs/specs/mount-invariant-guard.md`, `docs/specs/engine-pin.md`,
`docs/specs/engine-drift.md`, `docs/specs/ci-divergence-leg.md` and
`docs/specs/gsession.md`. If you need one of them before a page exists, read the
spec and cite it — do not infer its behaviour from a sibling page.

## Two rules, one more time

- **Never restate a spec.** Cite `docs/specs/<unit>.md` §n.
- **Never claim behaviour you have not read.** Cite the `src/**` file; cite a test
  where a test measured it; mark everything else **unverified**.

Both rules are stated in full in `TEMPLATE.md`.
