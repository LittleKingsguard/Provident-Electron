# L3 — `renderer-wiring`: the module shape's signature stubs

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW, BESIDE `signatures.md`**: the app-layout signatures stand in their own file; the modularity cells' stubs are here (`D-1`, `D-2`)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `module-shape.md` rev 1; `docs/L2/renderer-wiring/module-shape.md` rev 1; `docs/L3/module-system/design.md` §6 and `signatures.md` (`ActionRecord`); `docs/L3/producing-runtime/design.md` §2–§4; `src/renderer/renderer.ts`, `extensions.ts`, `runtime.ts`; `D-313`, `D-129`, `D-307` · **A stub is a DECLARATION and never a body** (D-3)
- **Read order:** §1 the install → §2 the pane map → §3 the invariants

## 1. `src/renderer/renderer.ts` — the one install

```ts
import type { CapabilityRouter } from './extensions.js'
import type { Runtime } from './runtime.js'

/** The install's answer, for the log and the rows: the modules it composed, the node ids it added and the handlers it
 *  installed (`S-18`/`S-20`). Idempotent per module: a second frame at the same name adds nothing. */
export interface ModuleShapeInstall {
  readonly modules: readonly string[]
  readonly added: readonly string[]
  readonly actions: number
}

/** Read `router.contributions()` and `router.actions()` and perform the three installs: the runtime graph composition
 *  through the sanctioned `applyCommand` paths (`layer-apply`/`attach` under the named parent), the pane map's
 *  totality over the composed set, and the action closures into the node handler entries keyed by name.
 *  Called from the channel client's `evaluate`, AFTER `router.registerModule`. */
export function startModuleShape(runtime: Runtime, router: CapabilityRouter): ModuleShapeInstall

/** The graph half alone: `layer-apply` for a layer or `attach` for one subtree, in the router's activation order; an
 *  unresolvable parent is named and skipped, never invented (`C-6`, `C-7`). */
export function composeModuleGraph(runtime: Runtime, router: CapabilityRouter): { readonly added: readonly string[]; readonly skipped: readonly string[] }

/** The action half alone: the closure from `ActionRecord.fn` into the node's handler entry whose key is its
 *  `name`/`event`, by `state-slice` `targetProp:'handlers'` or `layer-apply` `data.handlers` (`C-10`, `D-313`). */
export function installModuleActions(runtime: Runtime, router: CapabilityRouter): number
```

## 2. `src/renderer/extensions.ts` and `src/renderer/renderer.ts` — the map and the record

```ts
/** THE COMPOSED PANE MAP (`S-18`): the five sites for every DECLARED pane id — the foundation's literal plus every
 *  module's declaration — so a module pane has a node, a head, a body, a collapse control and a grip by construction
 *  (`C-9`, `M-18`). No authored literal is the set. */
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

- **A runtime contribution composes through `applyCommand`'s sanctioned paths**, never a second constructor reader or a post-compile transform (`ASM-RW-M1`, `C-6`, `C-7`).
- **The action closure is installed by NAME into the node's handler entry**; no dispatch-time resolver, no `handlers[].ref`, no source text in graph data (`C-10`, `D-313`).
- **The pane map is total over the composed set**; a declared pane with no entry is a red, and an undeclared id the map invents is the same class (`S-18`, `M-18`).
- **The stage paint is the app-layout turn's**; this page supplies graph data and adds no second paint, subscriber or route (`D-129`).
- **No `src/**` byte is declared here**; the install is L4's (D-3).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "renderer-wiring", "writes": [{"path": "docs/L3/renderer-wiring/module-shape-signatures.md", "d": "D-306", "why": "this page, rev 1 NEW: the install, the composed pane map and the action record's closure — no `src/**` byte"}]}
```
