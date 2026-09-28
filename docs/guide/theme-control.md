# `U-THEME-CONTROL` — the authored appearance control in the demo envelope (`F1`)

`U-THEME-CONTROL` is wave `F`'s first unit (ledger row `F1`; its landed record is
`docs/next-steps.md`'s `## DONE — U-THEME-CONTROL`, and this page's slot is
`docs/guide/README.md`). Two readers: a developer who wants an appearance control their
agent can *see and drive* through the MCP surface this repo already ships, and a fork
author who wants to know what is theirs to re-author. The one-line answer: it is a card
of **authored data** — a closed two-member setting token block plus one state node —
whose setting is carried by the caller's own dispatch argument into a graph node, and
read back through the existing tools. No new tool, no new group, and no appearance write.

## What it is

An **authored provident control** — four card nodes and a state node, plus two handler
bodies that are function **strings** — living inside this repo's own demo envelope
(`docs/specs/theme-control.md` §2.1 items 1/2; §1 items 1/2). It owns exactly one job:
carry a setting token from a dispatch into one graph node, so that the setting becomes
**MCP-readable** while every control element stays inside the producing graph.

It is **not a mechanism** and it is **not a module**: it adds no new file under `src/`,
no new export a consumer adopts, and no seam (`docs/specs/theme-control.md` §1 item 8,
§5.1; `docs/FORKER.md`'s `U-THEME-CONTROL` row). What it adds is authored data to
`src/shared/demo-envelope.ts` plus one deliberately inert wiring role in
`src/renderer/renderer.ts` (§2.5 item 1).

Its sibling relationship is the fact readers get wrong: **`U-THEME` (`E8`) is the
mechanism** (`src/shared/theme.ts` — `resolveTheme`, `applyThemeDeclaration`) and this
unit is the **authored control**, and the two have **no edge in either direction** — the
control imports nothing from the mechanism and names none of its exports
(`docs/specs/theme-control.md` §2.4 item 3, §3.3 `I-7`; `docs/specs/theme.md` §2.5 item
3). Resolution and appliance stay consumer-side; this repo lands the caller's token in a
graph node and stops there.

The token the setting carries is **the caller's dispatch argument, not the button's own
token**. Both authored buttons declare their own block member and then write the value
they were handed (`src/shared/demo-envelope.ts`, the two `theme-set` bodies, where
`authoredToken` is declared and `void`ed). That is why the observable is a *carry*, and
why an argument-less dispatch writes the empty string — see the gotchas below.

Its observable is a **graph-side reading**: the state node's serialized `content`, taken
with `provident.get_node_state`, plus the dispatch result. Nothing about the app's
appearance is observable on any instrument this repo ships, and the unit refuses that
criterion rather than pretending otherwise (`docs/specs/theme-control.md` §2.4 item 4,
§5.U `U-6`).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/demo-envelope.ts` | `demoEnvelope()` — the function that returns the envelope carrying the `theme-card` block. Its siblings in this file are the gutter family's (`gutterSeamExample`, `GUTTER_STATUS_ID`, `GUTTER_AFFORDANCE_ID`, `GUTTER_TARGET_ID`); the card's initial token is the **unexported** `THEME_INITIAL_TOKEN` (`'dark'`) |
| `src/renderer/renderer.ts` | `themeWiringRole(runtime: Runtime): readonly [string, string]` — the unit's ONE renderer role. The file's other exports (`handleRequest`, `startGutterAffordance`, interface `GutterWriteReading`) belong to other units |
| `src/renderer/runtime.ts` | `Runtime` (class), `RuntimeOptions` — the role calls exactly one route on it, `Runtime.elementForNodeId(id: string): unknown \| null` |
| `tests/theme-control.test.ts` | the unit's own 61 rows: the authored-surface reads, the handler drives against a recording `ctx` double, the role drives, the boundary/static rows and the register's executed layer |
| `scripts/mcp-cli.mjs` | the shipped driver, reached as `npm run mcp` (`npm run build && node scripts/mcp-cli.mjs`): `dispatch <target> <event> [jsonArgs] [requestId]` · `targets` · `html` · `node-state <target>` · `tools` · `run <steps.json\|->` |
| `docs/specs/theme-control.md` (+ `-review.md`, `-greens.md`, `-live-battery.md`) | the contract, the gate-1 record, the blind set and the live battery record |

The four control ids are authored as `css.id` (and, for the state node, **also**
`props.id`) inside `demoEnvelope()`: `theme-card` (the `section`), `theme-dark` and
`theme-light` (the two `button`s) and `theme-setting` (the `div` state node, which
carries BOTH ids — that is what makes it addressable and dispatch-visible)
(`docs/specs/theme-control.md` §2.1 item 1).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/theme-control.md` | §2.1 | the authored surface: the five nodes and their ids, the handler's name/event/shape, the closed token domain, and the caller-held attribute name |
| `docs/specs/theme-control.md` | §2.3 | the carry rules: the three-step journey, the `String()` gate, the initial value, and what a dispatch result may be asserted to be |
| `docs/specs/theme-control.md` | §2.4 | the bounded wiring role, what it may/may not do, and the no-edge negative row |
| `docs/specs/theme-control.md` | §2.5 | the derived ALLOW/DENY sets, the composition boundary and the entry-point answer |
| `docs/specs/theme-control.md` | §3.1 / §3.2 | every valid state (`M-1`…`M-9`) and every documented fail-state (`F-1`…`F-8`) |
| `docs/specs/theme-control.md` | §3.3 / §3.4 | the invariants (`I-1`…`I-10`) and the static rows (`R-1`…`R-9`, including the boundary scan) |
| `docs/specs/theme-control.md` | §5.1 / §5.2 | the diff scope with its DENIED set first, and the declared live battery (the boot, the three MCP commands, the pre/post pair) |
| `docs/specs/theme-control.md` | §5.2.1 | the two battery-text corrections the run forced: the boot line (`npm run start:http`) and the dispatch step's missing token argument |
| `docs/specs/theme-control.md` | §5.U | the eight-row live delta matrix, and the structural `NOT-OBSERVABLE` row `U-6` |
| `docs/specs/theme-control.md` | §0A note 1 | the ids, node shapes, handler name and event this unit pinned as its own choice |
| `docs/specs/theme-control.md` | §7a.1 | the three recorded working defaults (no environment read, the envelope stays pure data, the appearance-authority file out of scope) |
| `docs/specs/mcp-endpoint.md` | §3.1, §3.4, §3.5 | the `provident.dispatch` / `provident.list_targets` / `provident.get_node_state` payloads this control is observed through |
| `docs/next-steps.md` | `## DONE — U-THEME-CONTROL` | the landed record: what was measured, on which layer |

## Use cases

**UC-1 — read the control as data, before trusting any behaviour.** You are adopting this
repo as a baseline and want to know exactly what the appearance card *is*: which ids
exist, which token strings the block carries, how the handler is named, and what the
initial state node holds. Every answer is in the returned envelope object; nothing has to
be rendered (`docs/specs/theme-control.md` §2.1).

**UC-2 — drive the authored handler and see its one write.** You are writing a test or a
tool that must know what a dispatch *does*, without booting the app. The body is a
function string, so you compile it and hand it a `ctx` double that records
`clientAPI.apply` — and you can then assert the single mutation's exact shape
(`docs/specs/theme-control.md` §2.1 item 2, §3.1 `M-4`).

**UC-3 — let an agent set the token on the running app and read it back.** The whole
point of authoring the control in the graph: the operator or an agent dispatches the
authored event, and the setting is read back from the graph through the shipped tools,
with no new tool and no new group (`docs/specs/theme-control.md` §5.2, §3.1 `M-5`,
`§5.U` `U-3`/`U-4`).

**UC-4 — find the graph-side carrier and the caller-held name from your own wiring.** You
are re-authoring the control in your fork and need to know which id the wiring resolves
and what the caller-held attribute-name constant is — without re-spelling either
(`docs/specs/theme-control.md` §2.1 item 4, §2.4 items 1/2).

## Code, runnable

Every example is written the way this repo's own test file is written: as a module that
imports `'../src/shared/demo-envelope.js'` (the extension-ful specifier vitest resolves —
`tests/theme-control.test.ts`).

```ts
// UC-1 — the authored appearance control, read as data (no render, no boot)
import { demoEnvelope } from '../src/shared/demo-envelope.js'

interface Authored {
  type?: string
  css?: { id?: string; classes?: string[] }
  props?: { id?: string }
  content?: unknown
  handlers?: Array<{ name?: string; event?: string; body?: unknown }>
  children?: Authored[]
}

const root = demoEnvelope().template.root as unknown as Authored
const card = (root.children ?? []).find((n) => n.css?.id === 'theme-card')
// card: {
//   type: 'section', css: { id: 'theme-card', classes: ['card'] },
//   children: [
//     { type: 'h2', content: 'Appearance (demo)' },
//     { type: 'button', css: { id: 'theme-dark',  classes: ['btn'] }, content: 'Dark',
//       handlers: [{ name: 'theme-set', event: 'click', body: '<function string>' }] },
//     { type: 'button', css: { id: 'theme-light', classes: ['btn'] }, content: 'Light',
//       handlers: [{ name: 'theme-set', event: 'click', body: '<function string>' }] },
//     { type: 'div', css: { id: 'theme-setting', classes: ['theme-setting'] },
//       props: { id: 'theme-setting' }, content: 'dark' },
//   ],
// }

const stateNode = (card?.children ?? []).find((n) => n.css?.id === 'theme-setting')
stateNode?.props?.id              // 'theme-setting' — BOTH ids, which is what makes it addressable
stateNode?.content                // 'dark'            — the authored initial token (THEME_INITIAL_TOKEN)
(card?.children ?? [])
  .filter((n) => n.type === 'button')
  .map((n) => n.css?.id)
// ['theme-dark', 'theme-light']  — the closed two-member token block, one per button
```

```ts
// UC-2 — drive the authored body against a recording ctx double and read the ONE write
import { demoEnvelope } from '../src/shared/demo-envelope.js'

const root = demoEnvelope().template.root as unknown as {
  children?: Array<{ css?: { id?: string }; children?: Array<{ css?: { id?: string }; handlers?: Array<{ name?: string; body?: string }> }> }>
}
const card = (root.children ?? []).find((n) => n.css?.id === 'theme-card')
const button = (card?.children ?? []).find((n) => n.css?.id === 'theme-light')
const body = button?.handlers?.find((h) => h.name === 'theme-set')?.body ?? ''

// the string body is compiled the way tests/theme-control.test.ts compiles it
const handler = (new Function('return (' + body + ')') as () => (ctx: unknown, value?: unknown) => unknown)()

const calls: Array<{ nodeId: unknown; ops: unknown }> = []
const nodes = [{ id: 'node-23', props: { id: 'theme-setting' }, content: 'dark' }]  // node-23 is the live nodeId
const ctx = {
  tree: { allNodes: (): unknown[] => nodes },
  clientAPI: { apply: (nodeId: unknown, ops: unknown): void => { calls.push({ nodeId, ops }) } },
}

handler(ctx, 'light')

calls
// [{ nodeId: 'node-23',
//    ops: [{ targetProp: 'content', mode: 'replace', value: 'light' }] }]
// exactly ONE call, exactly one op, `content`/`replace` — §3.1 M-4, §3.3 I-9

handler(ctx)   // no argument
calls[1]
// [{ nodeId: 'node-23',
//    ops: [{ targetProp: 'content', mode: 'replace', value: '' }] }]
// an omitted argument is the EMPTY STRING, not the button's own 'light' token — see the gotchas
```

```bash
# UC-3 — the agent/operator loop against the RUNNING app (one boot, no restart)
npm run start:http                     # npm run build && electron . --mcp-transport=http
                                       # boot line from docs/specs/theme-control.md §5.2.1 (DEV-1)

npm run mcp -- --target http --port 3787 node-state theme-setting
# exit 0 →  content: "dark"            (THE PRE READING — the authored initial token)
#            pathKey: root/node-19/node-23

npm run mcp -- --target http --port 3787 dispatch theme-light click '["light"]'
# exit 0 →  { "results": [null], "dirtied": ["node-23", "node-19", "node-1"], ... }

npm run mcp -- --target http --port 3787 node-state theme-setting
# exit 0 →  content: "light"           (THE POST READING — the dispatched token, character for character)

npm run mcp -- --target http --port 3787 targets
# exit 0 →  23 in-tree nodes; theme-card, theme-dark, theme-light and theme-setting are all in the
#            addressable vocabulary (theme-setting reports BOTH cssId and propsId)

npm run mcp -- --target http --port 3787 dispatch no-such-node click
# exit 1 →  the tool's `unresolved target` result; the following node-state reading is UNCHANGED
#           (the CLI driver prints a JSON-parse complaint instead of the failure text — see gotchas)
```
(Readings above are the unit's own live battery at source revision `c65c475` —
`docs/specs/theme-control-live-battery.md` §2.)

```ts
// UC-4 — find the carrier the wiring resolves, and the name it holds
// (imported dynamically because the renderer entry is a page entry point — the same form
//  the unit's own test uses, tests/theme-control.test.ts)
const { themeWiringRole } = await import('../src/renderer/renderer.js')
type Runtime = import('../src/renderer/runtime.js').Runtime

const resolved: string[] = []
const runtime = {
  elementForNodeId: (id: string): unknown => { resolved.push(id); return null },
} as unknown as Runtime

const [attributeName, stateNodeId] = themeWiringRole(runtime)

attributeName   // 'theme'           — the caller-held attribute-name constant (src/renderer/renderer.ts)
stateNodeId     // 'theme-setting'   — resolved from demoEnvelope()'s authored ids, never re-spelled
resolved        // ['theme-setting'] — the ONE route the role calls on the graph it was handed
```

## What it refuses / does not do

- **No new MCP surface.** No tool, no group, no method, no resource, no mutating-method
  entry, no IPC method, no script key, no `package.json` key and no dependency; the
  observation rides tools that already ship (`docs/specs/theme-control.md` §1 item 4,
  §3.3 `I-1`/`I-8`, §3.4 `R-3`, §5.1).
- **No appearance write of any kind.** No attribute, no class, no style, no stylesheet,
  no CSS custom property, and no `--`-shaped or `data-`-shaped literal; it does not edit
  the appearance authority `src/renderer/index.html` (`docs/specs/theme-control.md` §1
  item 5, §2.4 item 4, §3.3 `I-6`, §3.4 `R-6`, §5.1 row 8).
- **No store, no persistence, no cache.** The setting lives in the live graph only and a
  re-boot reconstructs the authored initial value; a store is a new gate, not a smuggled
  addition (`docs/specs/theme-control.md` §1 item 6, §3.3 `I-5`, §3.2 `F-6`).
- **No environment or OS reading, and no policy default.** No `matchMedia`, no
  `prefers-color-scheme`, no `process.env`, no stored preference, no default selection —
  and no third token such as `'system'`/`'auto'` (`docs/specs/theme-control.md` §2.1 item
  3, §3.3 `I-4`, §3.2 `F-1`, §7a.1 item 1).
- **No interpretation of the token.** No trim, no case fold, no parse, no enumeration, no
  comparison, no validation and no default substitution; the caller's own string is
  carried character for character (`docs/specs/theme-control.md` §2.3 item 2, §3.3
  `I-3`).
- **No edge to `U-THEME` or to any sibling.** It imports nothing from `src/shared/theme.ts`
  and names none of its exports; a row asserting an edge in either direction fails
  (`docs/specs/theme-control.md` §2.4 item 3, §2.5 item 3, §3.3 `I-7`).
- **No element authored outside the provident graph, and no UI content from the wiring.**
  A hand-written DOM element, a `document.createElement`, an `innerHTML` write or a
  renderer-side content block is a review finding (`docs/specs/theme-control.md` §1 item
  3, §2.4 item 2, §3.4 `R-1`).
- **No generalisation into a shipped appearance UI.** The demonstration-code boundary is
  an enforceable named denied set plus a static scan with a positive control and a by-name
  exemption list — a token block outside the demo, a stylesheet, a store or a second
  authority reddens it (`docs/specs/theme-control.md` §1 item 7, §3.4 `R-2`, §3.2 `F-8`).
- **No applied-appearance criterion and no divergence claim.** "The app looks different" is
  refused three-part rather than parked (`§5.U` `U-6`), and `[D]` is not claimed — the
  divergence leg is the battery's precondition and nothing else (`docs/specs/theme-control.md`
  §5.3 item 7, §3.4 `R-8`).
- **No page-design layer.** `docs/skills/designing-pages.md` does not exist, so the
  obligation is recorded as a gap, not performed (`docs/specs/theme-control.md` §3.4 `R-9`,
  §7a.1 item 4).

## What a fork must supply

**This unit has no seams.** Established by three readings, not by assumption:

- The authored envelope carries **no import statement of any kind** — verified by reading
  `src/shared/demo-envelope.ts` (zero `import` lines) — and the contract states the
  control imports nothing from any sibling and edges to none in either direction
  (`docs/specs/theme-control.md` §2.4 item 3, §2.5 item 3, §3.3 `I-7`). Its blind set
  measured the census three ways (`0` import statements, `foreign=[]`, no mechanism or
  renderer edges) — `docs/specs/theme-control-greens.md`.
- The one renderer role consumes **no caller-implemented callable**: it takes the
  producing graph as its argument and holds a string constant, and the contract says that
  name *"is READ BY NO CONTRACT ROW OF THIS UNIT — because nothing in this unit writes an
  attribute"* (`docs/specs/theme-control.md` §2.1 item 4, §2.4 items 1/2).
- No `src/**` file calls `themeWiringRole`: `main()` constructs the `Runtime` with
  `demoEnvelope()`, calls `runtime.bootstrap()` and starts the gutter affordance — the
  role's only caller in the tree is the unit's own test (`src/renderer/renderer.ts`).

There is therefore no absent / non-callable / throwing degradation to declare: nothing is
looked for and nothing can be missing. **A pass that adds a `U-THEME-CONTROL` seam table
would be asserting a fabricated seam** (`docs/FORKER.md`'s `U-THEME-CONTROL` row).

What a fork supplies is the whole authored surface, in its own envelope — its own card
node, its own closed token block, its own handler name/event and its own state node —
plus one bounded wiring role of its own whose only permitted jobs are resolving an
authored element from the producing graph and holding a caller-supplied attribute-name
string (`docs/specs/theme-control.md` §2.5 item 1, §2.4 item 2; `docs/FORKER.md`). The
consumer side stays the fork's: what each token means, whether a stylesheet accepts it,
and any persistence across restarts are **not asserted by this contract** — this repo owns
no UI-config store (`docs/specs/theme-control.md` §2.1 item 3, §1 item 6).

## Gotchas measured in this repo

- **The button does not carry its own token — the caller's argument is what lands.** Both
  authored bodies declare their block member and then `void` it, writing the value they
  were handed instead (`src/shared/demo-envelope.ts`, the two `theme-set` bodies, with
  their own comment: *"the value it WRITES is the CALLER's"*). So `theme-dark` and
  `theme-light` are interchangeable as dispatch targets, and `dispatch theme-light click
  '["dark"]'` writes `dark`.
- **A dispatch with no argument writes the empty string.** Measured live: `… dispatch
  theme-dark click` (no `jsonArgs`) left the state node at `content: ""`, because the
  body's `value == null ? '' : String(value)` gate fires and the contract's token block has
  no fallback (`docs/specs/theme-control-live-battery.md` §2 steps 3/4, §3 `FINDING-1`;
  the filed battery step was corrected to carry its argument at `docs/specs/theme-control.md`
  §5.2.1).
- **`npm run mcp` rebuilds first, and defaults to the battery host.** The script key is
  `npm run build && node scripts/mcp-cli.mjs`, and the CLI's default `--target` is
  `battery` (a spawned DOM-shim host over stdio). Without `--target http --port 3787` you
  are talking to the battery host, not the running app (`package.json`; `scripts/mcp-cli.mjs`
  usage block).
- **`npm start` does not pin the HTTP transport.** The transport is the FIRST
  `--mcp-transport=` flag on argv, else `PROVIDENT_MCP_TRANSPORT`, else `http`
  (`src/main/main.ts`, `transportFromArgs`). The unit's own live battery found a `stdio`
  value reaching first — no `http://127.0.0.1:3787/mcp` endpoint at all — and booted with
  the repo's own `npm run start:http` instead (`docs/specs/theme-control.md` §5.2.1
  `DEV-1`; `docs/specs/theme-control-live-battery.md` §1).
- **The wiring role is inert, and the boot path does not call it.** `main()` renders the
  card because the card is authored envelope data; `themeWiringRole` resolves the state
  node's authored id and hands it to `Runtime.elementForNodeId`, and writes nothing — no
  attribute, class, style, markup or created element (`src/renderer/renderer.ts`;
  `docs/specs/theme-control.md` §2.4 items 1/2). The card renders and carries with or
  without it.
- **The state node carries BOTH ids.** `theme-setting` carries `css.id` **and** `props.id`
  with the same value, which the contract names as what makes a node `list_targets`-visible
  and `provident.dispatch`-reachable — the card's other nodes carry only `css.id`, or (the
  `h2`) no id at all (`docs/specs/theme-control.md` §2.1 item 1(5); the live battery's
  `targets` reading reports both ids for `node-23`, and carries all four card ids).
- **An unresolvable dispatch target exits 1 and reads badly.** The semantics hold — the
  tool answers `unresolved target` and the state node is unchanged — but the CLI prints
  `Unexpected token 'u', "unresolved"… is not valid JSON` instead of the failure text,
  because the driver lives under the unit's DENIED `scripts/**`. It is routed out as its
  own owed row and fixed nowhere by this unit (`docs/specs/theme-control.md` §5.2.1
  `FINDING-2`; `docs/specs/theme-control-live-battery.md` §3).
- **Nothing survives a re-boot, measured.** A fresh profile read the authored initial
  token `dark` again after a restart — no store, no cache, no preference record
  (`docs/specs/theme-control-live-battery.md` §2; `docs/specs/theme-control.md` §3.3 `I-5`).
- **The visible effect is the node's own text, and nothing else is observable.** The
  dispatch result carried `renderedHtml …>light<…`, so the token shows up as the state
  node's rendered content — but no shipped instrument reads an applied declaration, a
  computed style, an attribute/class presence or a stylesheet reaction back, which is the
  structural `NOT-OBSERVABLE` row `U-6` (`docs/specs/theme-control.md` §5.U; §3.4 `R-8`).
- **What the wiring role answers when it is handed the REAL `Runtime` is UNVERIFIED
  here** — the unit's own test drives it against a recording double, and no `src/**` boot
  path calls it; it would be settled by calling it once against the booted app.
- **Whether `provident.get_markdown` surfaces the card is UNVERIFIED** — the four tools
  cited above are the ones read from `ProvidentMcpServer.ALL_TOOLS`
  (`src/main/mcp-server.ts`), and the CLI ships no `markdown` command; it would be settled
  by a `run` steps file that calls `provident.get_markdown`.
- **How this page's facts were established.** Every behavioural sentence above is read from
  `src/shared/demo-envelope.ts`, `src/renderer/renderer.ts`, `src/renderer/runtime.ts`,
  `src/main/main.ts`, `scripts/mcp-cli.mjs` or `package.json`, or is cited to
  `docs/specs/theme-control.md` by section/row and to the unit's landed records; nothing
  here is remembered from another project.

## See also

- `docs/specs/theme-control.md` — the contract. Cite it; this page never governs.
- `docs/specs/theme-control-live-battery.md` — the live readings quoted above, with each
  command and its exit code.
- `docs/specs/theme.md` — the separate `U-THEME` mechanism (`resolveTheme`,
  `applyThemeDeclaration`), the unit this control has no edge to.
- `docs/guide/00-base-surface.md` — the tool set, the dispatch path, the runtime and the
  wiring entry points this control is observed through.
- `docs/guide/README.md` · `docs/guide/TEMPLATE.md` — the index and the binding section
  order.
- `docs/FORKER.md` — the `U-THEME-CONTROL` row: what a fork re-authors, and why there is
  no seam.
