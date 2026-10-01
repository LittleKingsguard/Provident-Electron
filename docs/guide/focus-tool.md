# `provident.focus` — the MCP tool that asks the renderer's own focus state for one entry

This page is for two readers: a developer **consuming this repo as a prebuild
baseline**, who has to know what the `provident.focus` tool does to the running app
and what it returns, and a **fork author**, who has to know which half of the route is
theirs to implement. The unit is **`U-FOCUS-TOOL`** (wave `F`, ledger row `F3`); its
landed record is `docs/next-steps.md`'s `## DONE — U-FOCUS-TOOL` section. In one line:
it is a **thin adapter** — validate `{ target?, newTab? }`, make one renderer call,
return the renderer's answer verbatim — and the live focus state belongs to the
renderer's wiring, never to the tool and never to the graph.

## What it is

`provident.focus` is a **route with no state of its own**. Its whole responsibility is
three steps: check the argument shape, make **one** call over the existing renderer
invoke seam, and hand the renderer's answer back untouched. Its contract fixes that
closed set of steps, and fixes the negative list beside it (no state, no map, no id
policy, no sort, no re-derivation of the focus model's activation rule, no notify, no
store) at `docs/specs/focus-tool.md` §1 item 3, §2.1 item 7 and §2.3.

**The live authority for `{ entries, activeId }` is the renderer's own state, held in
the renderer wiring outside the consumed module** — not a graph slice, and not the tool
(`docs/specs/focus-tool.md` §2.1 item 6). That is why `provident.list_targets`,
`provident.get_rendered_html`, `provident.get_markdown` and `provident.get_node_state`
never observe a focus call (§2.5 item 5), and why the tool may re-derive none of the
consumed model's rules — those live in `src/shared/focus-model.ts` and are documented by
`docs/specs/focus-model.md` §2.3.

**Routing is decided by the `RpcMethod` type wall plus the renderer's method switch.**
The mutating set (`MUTATING_METHODS`) decides only whether the post-reply notification
push fires, and `'focus'` is deliberately absent from it
(`docs/specs/focus-tool.md` §2.1 item 3, §2.4 row 1; `src/renderer/renderer.ts:15`,
`:232`). Reading “not in the mutating set” as “does not cross the invoke path” is the
one wrong reading this unit names explicitly (§2.1 item 3).

**It is one name in the existing surface, not a new one.** `provident.focus` is the
**22nd** member of `ProvidentMcpServer.ALL_TOOLS` — the list beside it is
`provident.dispatch`, `provident.focus`, the four read tools
(`provident.get_rendered_html`, `provident.get_markdown`, `provident.list_targets`,
`provident.get_node_state`), the seven `provident.code.*` names, the six graph names
(`provident.load`, `provident.op`, `provident.export`, `provident.validate`,
`provident.teardown`, `provident.journal`) and the three `module.*` names — and it joins
the **existing** `dispatch` group, which is **ON by default** (`src/main/mcp-server.ts:364-387`;
`src/main/security.ts:16`, `:85-87`). The group set stays at five; the tool mints no
sixth group, no resource and no `MUTATING_METHODS` entry (§1 item 2, §2.2 `X-2`,
§3.3 `I-7`).

**It authors no UI.** The rendered focus strip and the entries surface are the
**consumer's**, and this unit is not a source of either: it authors no text, element,
class or slot content, and reads no `activeElement`, walks no focusable set and installs
no listener (§1 items 4/5, §2.2 `P-FT-2`, §3.4 `R-9`). That is also why nothing on this
page shows you a rendered control: there is no control here to show.

## Where it lives

| File | Names it publishes (and the ones this unit adds) |
| --- | --- |
| `src/main/mcp-server.ts` | `ProvidentMcpServer` (`ALL_TOOLS` carries `provident.focus`; `registerTools` registers it; `allowedToolNames`, `ensureServerRegistered`), `McpBackend`, `McpServerOptions`, `RendererBackend`. The tool's handler `focusHandler` and its argument guard (`plainArguments`, `rejectedFormOf`, `DECLARED_ARGUMENTS`, `keyAllowed`) are **module-private** — the tool has no exported factory, no options object and no module of its own (§2.1's closing note) |
| `src/shared/types.ts` | `RpcMethod` (the `'focus'` member at `:281`), `RpcRequest`, `RpcReply`, `IPC_INVOKE`, `IPC_REPLY` |
| `src/renderer/renderer.ts` | `handleRequest` — its `case 'focus'` answers the route. The wiring holder and the functions that drive it (`focusRoute`, `carriedEntryIds`, `answerForHolder`, `resolveForHolder`, `standingAnswer`) are **module-private**, as is `MUTATING_METHODS`, which does not carry `'focus'` |
| `src/main/security.ts` | `groupForTool`, `SecurityGate`, `ToolGroup`, `defaultSecurityConfig`; the module-private `TOOL_GROUPS` carries the `'provident.focus': 'dispatch'` row |
| `src/shared/focus-model.ts` | the **consumed** half of the pair: `focusTransition`, `focusOrder`, `persist`, and the types `FocusEntry`, `FocusState`, `FocusVerb`, `FocusRefusalCode`. This unit imports and amends **none** of it (§2.5 item 2) |
| `tests/focus-tool.test.ts` | the unit's own rows (`90/90` in the landed record), driven with a recorder backend |
| `tests/focus-tool-register.ts` | the register module the suite executes — a non-test module, so it is never collected as a suite |

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/focus-tool.md` | §1 | the scope and the not-this-unit items |
| `docs/specs/focus-tool.md` | §2.1 items 1–10 | the tool name, the group, the route (pinned as its own cell), the args, the return, the live authority, the owned-negative list, the throw patterns, the refusal path, and the preload bridge effect |
| `docs/specs/focus-tool.md` | §2.2 (A)/(B)/(C)/(D) | the prohibition rows `P-FT-1`…`P-FT-6` with a named test each, the collision table **by token**, the answered argument states `S-1`…`S-7`, and the `id`/`newTab` rows |
| `docs/specs/focus-tool.md` | §2.3, §2.4, §2.5 | the value/identity rules; the five negative claims with their falsifiers; the composition boundary with the derived allow/deny set and the entry-point answer |
| `docs/specs/focus-tool.md` | §3.1, §3.2, §3.3 | the valid states `M-1`…`M-6`, the fail-states `F-1`…`F-6`, the invariants `I-1`…`I-13` |
| `docs/specs/focus-tool.md` | §5.U | the layer matrix: which rows are fully instrumented and which two are labelled structurally-not-observable |
| `docs/specs/focus-tool.md` | §7, §7a.1 | the honest limits, and the three working defaults an architect can reverse |
| `docs/specs/mcp-endpoint.md` | §3.8 item 2, §6.2 | the endpoint-side shape and UI-only asymmetry; the group model |
| `docs/specs/focus-model.md` | §2.3 | the consumed model's own activation and duplicate rules (not this unit's) |
| `docs/next-steps.md` | `## DONE — U-FOCUS-TOOL` | the landed record: the red set, the greens, the executed register, the legs |

## Use cases

**UC-1 — move the agent's focus to an entry by the name it knows.** An agent driving a
tabbed or multi-pane UI must be able to say “open an entry for this target, then make it
the active one” and read back what the focus model now holds, without the tool becoming
an authority over ids or over the activation rule.

**UC-2 — the target you named is not one the consumer knows.** A target that the
consumer will not resolve must come back as a **returned refusal record**, not as an
exception you have to catch — the call stays a value, and the focus state stays where it
was.

**UC-3 — prove a focus call left the graph alone.** Before a debugging or agentic read
of the app, you want to know that calling `provident.focus` did not dirty nodes, did not
emit a notification and did not invalidate the app resource, so your before/after reads
mean something.

**UC-4 — you are forking and must supply the renderer half of the route.** The tool
crosses two seams that belong to the host and to the fork: the `McpBackend` call, and
the renderer's own handler for the `'focus'` method. Both are yours to keep or replace,
and one of them is a compile-time wall.

## Code, runnable

One transport fact applies to every example below: a tool call resolves to **one MCP
text content block** whose `text` is `JSON.stringify(value, null, 2)` of the tool's
value (`src/main/mcp-server.ts:289-291`), so a client parses the string to get the
object — which is exactly what the tree's own harness does
(`tests/focus-tool-register.ts`, `callTool`).

### UC-1 — open an entry, then switch to it

```ts
// UC-1 — the call an agent makes, and what the tool forwards.
import type { McpBackend } from '../src/main/mcp-server.js'

// The one seam the tool crosses: `focusHandler` calls
// `backend.invoke('focus', passed)` and the answer is echoed verbatim
// (src/main/mcp-server.ts:77-89). This host records what it was handed.
const forwarded: Array<{ method: string; payload: unknown }> = []
const backend: McpBackend = {
  async invoke(method, payload) {
    forwarded.push({ method, payload })
    return { activeId: 'alpha', entries: ['alpha'], opened: true }
  },
}

// MCP client → tools/call: { "name": "provident.focus",
//                            "arguments": { "target": "alpha", "newTab": true } }
// what the tool resolves to (content[0].text, parsed):
//   { "activeId": "alpha", "entries": ["alpha"], "opened": true }
// what your backend was handed:
//   { method: 'focus', payload: { target: 'alpha', newTab: true } }
//
// A second call, same target, no `newTab` — "activate the entry for this target":
//   tools/call { "name": "provident.focus", "arguments": { "target": "alpha" } }
//   → { "activeId": "alpha", "entries": ["alpha"], "opened": false }
```

The three returned members are the renderer's own values, passed through by identity —
the tool adds none of them (`docs/specs/focus-tool.md` §2.1 item 5, §2.3 item 3). With
the **landed** wiring, the first call opens (`opened: true`) because `newTab: true` is
read as the `open` verb, and the second activates the entry it seated with nothing
appended (`src/renderer/renderer.ts:299-345`, `src/shared/focus-model.ts:353-384`); those
particular values are a reading of the wiring, not a value pinned by a test in this tree,
because the suite drives a recorder backend rather than the live holder.

### UC-2 — the consumer refuses the target, and nothing throws

```ts
// UC-2 — a target the consumer will not resolve is a RECORD, not an exception.
// tools/call { "name": "provident.focus", "arguments": { "target": "beta" } }
// → { "activeId": "alpha", "entries": ["alpha"], "opened": false,
//     "refused": { "reason": "unknown-id" } }
//
// The four members are the declared set plus `refused`, and `refused` carries exactly
// one key — `reason` — which the tool forwards verbatim from the consumer
// (docs/specs/focus-tool.md §0A note 4, §3.3 I-6).
```

A refusal never throws (`§3.2` `F-3`), so `try/catch` is not the way to handle it; the
returned record is. On the landed wiring an unowned target is refused by the model with
its own refusal code — `'unknown-id'` here, one of the five members of
`FocusRefusalCode` (`src/shared/focus-model.ts:70-72`) — carried into `reason`
(`src/renderer/renderer.ts:315-328`); the contract calls `reason` the consumer's own
string, so a fork is free to send its own text.

### UC-3 — confirm the graph was not touched

```ts
// UC-3 — before/after reads on the graph-facing tools.
import { ProvidentMcpServer, type McpBackend } from '../src/main/mcp-server.js'
import { SecurityGate } from '../src/main/security.js'

const backend: McpBackend = { async invoke(_method, _payload) { return { activeId: null, entries: [], opened: false } } }
// ^ a stand-in for your own host backend: this example is about the gate and the
//   before/after reads, not about the focus answer
const server = new ProvidentMcpServer({ backend, transport: 'stdio', gate: new SecurityGate({ token: null, enabled: ['read', 'dispatch'] }) })

server.allowedToolNames()
// the default gate (read + dispatch ON) registers 8 names, `provident.focus` among them
// (asserted by name in tests/focus-tool.test.ts, EXPECTED_DEFAULT_GATE_TOOLS)
// `provident.get_rendered_html` → { renderedHtml, ssrHtml, census } — call it BEFORE the focus call...
// ...call `provident.focus`...
// ...and call it AGAIN: the contract fixes that these reads never observe a focus call's
// effect (docs/specs/focus-tool.md §2.5 item 5), and the post-reply notification push is
// keyed on `MUTATING_METHODS`, which does not carry `'focus'`
// (src/renderer/renderer.ts:232; §2.4 rows 2/4).
```

Two limits belong with this use case, and the contract states both: the node-level
evidence reaches “no notification was invoked and the name sets are unchanged”, and the
stronger claim — that a real window did not re-render — is **not** claimable on this
unit's instruments (§2.4 row 4's fence, §5.U rows 3/4, marked there as the labelled
structurally-not-observable half).

### UC-4 — supply the renderer half of the route (the fork's job)

```ts
// UC-4 — what your renderer must answer, and the type wall it must pass.
import type { RpcMethod, RpcRequest, RpcReply } from '../src/shared/types.js'

const method: RpcMethod = 'focus'                                        // src/shared/types.ts:281
const req: RpcRequest = { id: 1, method, payload: { target: 'alpha', newTab: true } }

// your renderer's answer for that request — the declared shape, exactly
const reply: RpcReply = {
  id: req.id,
  ok: true,
  value: { activeId: 'alpha', entries: ['alpha'], opened: true },
}

// the main side hands the same call to your backend:
//   backend.invoke('focus', { target: 'alpha', newTab: true })
```

Leaving `'focus'` out of the `RpcMethod` union is a **typecheck failure**, not a runtime
one, and leaving the `case` out of the switch throws
`unknown method: focus` inside `handleRequest`, which main turns into a rejected call
(`src/renderer/renderer.ts:214-218`, `src/main/mcp-server.ts:1159-1166`). The census
obligations that keep the two in step are enumerated at
`docs/specs/focus-tool.md` §5.2 item 4.

## What it refuses / does not do

- **It holds nothing between calls** — no state, map, counter, registry, memo or
  module-level mutable binding; a second identical call is a second renderer call, never
  a cache hit (`docs/specs/focus-tool.md` §1 item 3, §2.3 item 5, §3.3 `I-1`).
- **It mints no id.** The caller's own string is the legal entry id; the tool keeps no
  counter, no UUID site, no registry and no string-to-entry map (§2.3 items 1/2,
  §2.2 (D) `Y-1`/`Y-2`).
- **It is not a second authority over activation.** The activation rule, the duplicate
  rules and the ordering stay the consumed module's (§2.3 item 4, §2.5 item 2).
- **It authors no UI**: no text, element, class, slot content, attribute, style or
  geometry; the rendered focus strip and the entries surface are the consumer's
  (§1 items 4/8, §2.2 `P-FT-2`, §2.5 item 3).
- **It reads no DOM and walks no focusables** — no `activeElement`, no focusable-set
  walk, no `matchMedia`, no listener. The method *name* and the switch *case* are
  legitimate; the ban is on the walk (§1 item 5, §2.2 `X-1`, §3.4 `R-9`).
- **It mutates no graph node, envelope or state slice, and emits no notification.** It
  cannot force a re-render, and the reads named in UC-3 never observe it (§2.4 rows 2/4,
  §2.5 item 5).
- **It persists nothing** — no storage read, no file write, no imported storage module
  (§2.4 row 3, §2.2 `P-FT-4`).
- **It does not validate the answer.** A malformed renderer answer is passed through
  untouched: the declared types are a contract, not a boundary this tool enforces
  (§0A note 5, §3.2 `F-5` — a fence, not an oversight; the row that catches it is the
  consumer's).
- **It does not return `refused` for a malformed *call*.** An own enumerable key outside
  `{ target, newTab }` is refused by a `TypeError`-class throw that names the rejected
  key, before any renderer call; `refused` is the *consumer's* vocabulary and is reserved
  for the consumer's answer (§0A note 3(d), §3.2 `F-1`). An `id`-valued argument is
  refused by the same rule (§3.2 `F-6`).
- **It never emits a fifth member, and never `refused: undefined` as an own key**
  (§0A note 4, §3.3 `I-6`).
- **It adds no new group, no resource, no channel, no second IPC method and no
  `MUTATING_METHODS` entry** (§1 item 2, §2.2 `X-2`, §3.3 `I-7`), and it changes the
  preload bridge **not at all** (§2.1 item 10).

## What a fork must supply

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `McpBackend.invoke` — the call the handler makes as `invoke('focus', passed)` (`src/main/mcp-server.ts:284-286`, `:88`) | REQUIRED | the host (`RendererBackend` in this tree) | no backend means no server at all (`McpServerOptions.backend`, `src/main/mcp-server.ts:311-315`); and while the renderer has not signalled ready, the call **rejects with the backend's readiness error** and the focus state is untouched (`docs/specs/focus-tool.md` §2.1 item 8(b), §3.2 `F-2`) | **unverified** — the contract declares no arm for a non-callable `invoke`; its declared throw set is closed and two-membered (§2.3 item 6, §3.3 `I-13`) | the same closed set stands: the readiness rejection and the tool's own validation error. A **consumer refusal is never a throw** (§2.3 item 6, §3.2 `F-3`) |
| the renderer's answer for the `'focus'` method (`src/renderer/renderer.ts:214-216`) | REQUIRED | the fork's renderer wiring (the in-tree holder) | omitting the `'focus'` member from the `RpcMethod` union is a **typecheck failure** (the type wall, `docs/specs/focus-tool.md` §2.1 item 3, §5.2 item 4); keeping the member but dropping the `case` throws `unknown method: focus` (`src/renderer/renderer.ts:217-218`) | not applicable — the seam is a method-switch case, not a callable | a throwing case body is caught by `handleRequest` and returned as `{ id, ok: false, error }`, which main rejects the call with (`src/renderer/renderer.ts:221-227`, `src/main/mcp-server.ts:1159-1166`); the tool's own contract declares no third throw class (`§2.3` item 6) |
| the group gate — `TOOL_GROUPS` maps `provident.focus` to `dispatch`, whose ON/OFF is the host's persisted config (`src/main/security.ts:16`, `:85-87`) | OPTIONAL | the host's security settings (a human grant/denial; `dispatch` is ON by default) | with the tool's group off it is not registered and not listed — the endpoint's existing group semantics, not a new case (`docs/specs/focus-tool.md` §3.2 `F-4`; `docs/specs/mcp-endpoint.md` §6.2) | a non-callable gate predicate is outside this unit's declared arms — **unverified**; the tool only reads membership in the enabled set | likewise **unverified** for a throwing gate; `SecurityGate` is the in-tree supplier (`src/main/security.ts`) |

**The seam that is *not* yours.** `MUTATING_METHODS` is where the notification push is
keyed, and `'focus'` must stay out of it: the endpoint contract makes a later edit adding
`'focus'` to that set a **contract violation** (`docs/specs/mcp-endpoint.md` §3.8 item 4;
`docs/specs/focus-tool.md` §2.4 row 1). A fork that wants focus calls to push a
notification is changing this contract, not configuring it.

## Gotchas measured in this repo

- **The answer arrives as a JSON *string* inside a text block**, not as an object: the
  tool's value goes through the server's `text(value)` helper
  (`src/main/mcp-server.ts:289-291`), and a client must parse `content[0].text`
  (`tests/focus-tool-register.ts`, `callTool`).
- **`entries` is a list of ids, not of entry objects.** The landed wiring builds the
  echo by mapping the seated entries through the model's `focusOrder` and reading each
  entry's `id` (`src/renderer/renderer.ts:287-289`).
- **`refused.reason` carries a refusal *code* on the landed wiring** —
  `result.refusals[0].code` (`src/renderer/renderer.ts:320`), one of `'unknown-verb'`,
  `'duplicate-id'`, `'unknown-id'`, `'no-next'`, `'no-previous'`
  (`src/shared/focus-model.ts:70-72`) — while the contract calls `reason` the consumer's
  own string (`docs/specs/focus-tool.md` §0A note 4). A consumer that wants its own
  vocabulary supplies its own holder.
- **Naming a target you never opened is refused, not opened.** The landed wiring picks
  `activate` unless `newTab === true` (`src/renderer/renderer.ts:305`), and `activate` on
  an id the state does not own is refused `unknown-id`
  (`src/shared/focus-model.ts:377-380`). So on a fresh holder, `{ "target": "alpha" }`
  returns `refused`, and you reach the open path with `newTab: true`. (Read from those
  two files; the tool's own suite drives a recorder backend, so this pairing is a reading
  of the wiring rather than a value a test pins.)
- **Absence from `MUTATING_METHODS` does not mean the call skips the IPC invoke path.**
  The route is the `RpcMethod` type wall plus the renderer's switch; the mutating set
  decides only the notify push (`docs/specs/focus-tool.md` §2.1 item 3;
  `src/renderer/renderer.ts:232`).
- **The registered argument schema deliberately does not strip unknown keys.** It is
  `z.preprocess((carried) => carried ?? {}, z.object({ target, newTab }).passthrough())`
  (`src/main/mcp-server.ts:829-835`), so the handler's own throw can *name* the rejected
  key — a schema that stripped would swallow the malformed call before validation
  (`docs/specs/focus-tool.md` §0A note 3(a)/(d)).
- **`provident.focus` is registered by default and needs no grant**, because
  `groupForTool('provident.focus') === 'dispatch'` and `dispatch` is ON in the default
  config (`src/main/security.ts:16`, `:85-87`; measured by `tests/focus-tool.test.ts`,
  `M-6`). Turning `dispatch` off removes it with the rest of the group.
- **Two identical calls are two renderer calls.** Nothing is memoised, so an agent that
  repeats a call pays for it twice (`docs/specs/focus-tool.md` §2.3 item 5; measured by
  `tests/focus-tool.test.ts`, `M-5`).
- **The unit's own numbers, for whoever is comparing builds:** the red run was 70 rows,
  45 failed / 25 passed against a tool that did not exist, and the landed file is 90/90
  green (`docs/next-steps.md`, `## DONE — U-FOCUS-TOOL`).
- **`docs/specs/mcp-endpoint.md` §3.8 is stale relative to the code.** Its heading still
  reads `OWED — lands with U-FOCUS-TOOL; the tool DOES NOT EXIST YET`, and its §3 tool
  table and §6.2 group table do not yet carry the focus row, while
  `src/main/mcp-server.ts:366` carries `provident.focus` in `ALL_TOOLS` and
  `src/main/security.ts:16` maps it to `dispatch`. This page follows the code and the
  unit's own contract `docs/specs/focus-tool.md` §2.1; the endpoint section's obligation
  list (§3.8 items 1–6) is where the endpoint-side text is still owed.
- **unverified** — whether a *foreign* backend whose `invoke` is non-callable, or one
  that throws an error outside the two declared classes, degrades gracefully. The
  contract declares no arm for it (§2.3 item 6, §3.3 `I-13` is explicit that the wider
  class-stability reading was withdrawn); it would be settled by a row that drives a
  hostile backend through `focusHandler`.

## See also

- `docs/guide/README.md` — the index, the two readers and the reading order.
- `docs/guide/00-base-surface.md` — the tool table, the dispatch path and the group
  model this tool rides on.
- `docs/guide/TEMPLATE.md` — the binding section order and the three rules (the third: a module header is not a clause).
- `docs/specs/focus-tool.md` — this unit's contract (the authority; this page cites it
  and never replaces it).
- `docs/specs/focus-model.md` — the consumed model half: the activation, ordering and
  duplicate rules this tool re-derives none of.
- `docs/specs/mcp-endpoint.md` — §3.8 (the endpoint-side tool contract, status stale as
  noted above) and §6.2 (the group model).
