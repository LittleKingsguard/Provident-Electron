# L3 — `renderer-wiring`: the module shape's signature stubs

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **THE COMPOSITION STUB IS `runtime.contribute` AND THE RE-DRIVEN PAINTS ARE STATED, BESIDE `signatures.md`**: the app-layout signatures stand in their own file; the modularity cells' stubs are here (`D-1`, `D-2`)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `module-shape.md` rev 1; `docs/L2/renderer-wiring/module-shape.md` rev 1; `docs/L3/module-system/design.md` §6 and `signatures.md` (`ActionRecord`); `docs/L3/producing-runtime/design.md` §2/§4 and `docs/L2/producing-runtime/interface.md` rev 3 §4; `src/renderer/renderer.ts`, `extensions.ts`, `runtime.ts`; `D-313`, `D-129`, `D-307` · **A stub is a DECLARATION and never a body** (D-3)
- **Read order:** §1 the install → §2 the pane map → §3 the invariants

## 1. `src/renderer/renderer.ts` — the one install

```ts
import type { CapabilityRouter } from './extensions.js'
import type { ContributionResult, Runtime } from './runtime.js'

/** The install's answer, for the log and the rows: the modules it composed, the node ids it added, the contributions
 *  the runtime skipped BY NAME, and the handlers it installed (`S-18`/`S-20`). Idempotent per module: a second frame
 *  at the same name adds nothing. */
export interface ModuleShapeInstall {
  readonly modules: readonly string[]
  readonly added: readonly string[]
  readonly skipped: readonly string[]
  readonly actions: number
}

/** Read `router.contributions()` and `router.actions()` and perform the three installs: `runtime.contribute` over the
 *  contributions (the authored-envelope composition: merge into the stored document, re-load, authored handlers kept),
 *  the pane map's totality over the composed set, and the action closures into the node handler entries keyed by name.
 *  Called from the channel client's `evaluate`, AFTER `router.registerModule`; RE-DRIVES the delivery paints once
 *  `contribute` answers, because the re-load re-rendered the authored page (`S-20`). */
export function startModuleShape(runtime: Runtime, router: CapabilityRouter): ModuleShapeInstall

/** The graph half alone: `runtime.contribute(router.contributions())` in the router's activation order, answering the
 *  runtime's `{added, skipped}`; a parentless or throwing contribution is the runtime's named skip, never invented
 *  here (`C-6`, `D-313`). NO serializer round-trip: it drops the 30 authored handlers (`src/shared/demo-envelope.ts`). */
export function composeModuleGraph(runtime: Runtime, router: CapabilityRouter): ContributionResult

/** The action half alone: the closure from `ActionRecord.fn` into the node's handler entry whose key is its
 *  `name`/`event`, by `state-slice` `targetProp:'handlers'` (`C-10`, `D-313`). */
export function installModuleActions(runtime: Runtime, router: CapabilityRouter): number
```

## 2. `src/renderer/extensions.ts` and `src/renderer/renderer.ts` — the map and the record

```ts
/** THE COMPOSED PANE MAP (`S-18`): the five sites for every DECLARED pane id — the foundation's literal plus every
 *  module's declaration — so a module pane has a node, a head, a body, a collapse control and a grip by construction
 *  (`C-9`, `M-18`). No authored literal is the set. **THE COMPOSED SET IS `U2`'S**: the declaration registry is not
 *  built, so until it is this function is total over the foundation's set and `M-18` is red BY NAME (never skipped). */
export function paneNodeIds(declaredPaneIds: readonly string[]): Readonly<Record<string, PaneNodeMap>>
export interface PaneNodeMap {
  readonly node: string
  readonly head: string
  readonly body: string
  readonly collapse: string
  readonly grip: string
}

/** `CapabilityRouter.actions()`'s record gains the CLOSURE it registered (`docs/L3/module-system/signatures.md`'s
 *  `ActionRecord`): the host-side table's readable answer, so this seat installs what the module registered and reads
 *  no private map (`C-10`, `D-313`). */
export interface ActionRecord {
  readonly module: string
  readonly name: string
  readonly fn: (ctx: never, ...args: unknown[]) => unknown
}
```

## 3. The invariants a stub reader must not lose

- **A runtime contribution composes through `runtime.contribute`** — the same merge routine as the boot composition at the second sanctioned instant — never a serializer round-trip, never a raw `LayerApplyOp`, never this seat's own merge (`ASM-RW-M1`, `L2` rev 3 §4).
- **The action closure is installed by NAME into the node's handler entry**; no dispatch-time resolver, no `handlers[].ref`, no source text in graph data (`C-10`, `D-313`).
- **The pane map is total over the composed set once `U2`'s registry exists**; a declared pane with no entry is a red BY NAME, and an undeclared id the map invents is the same class (`S-18`, `M-18`). Until `U2` lands the set is the foundation's and the row stands red on the missing module declaration, never green by omission.
- **The stage paint is the app-layout turn's**; this page supplies graph data and adds no second paint, subscriber or route (`D-129`).
- **No `src/**` byte is declared here**; the install is L4's (D-3).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "renderer-wiring", "writes": [{"path": "docs/L3/renderer-wiring/module-shape-signatures.md", "d": "D-306", "why": "this page, rev 1 NEW: the install, the composed pane map and the action record's closure — no `src/**` byte"}]}
```
