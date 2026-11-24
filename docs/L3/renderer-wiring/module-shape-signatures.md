# L3 — `renderer-wiring`: the module shape's signature stubs

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **THE COMPOSITION STUB IS `runtime.contribute` AND THE RE-DRIVEN PAINTS ARE STATED, BESIDE `signatures.md`**: the app-layout signatures stand in their own file; the modularity cells' stubs are here (`D-1`, `D-2`)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `module-shape.md` rev 1; `docs/L2/renderer-wiring/module-shape.md` rev 1; `docs/L3/module-system/design.md` §6 and `signatures.md` (`ActionRecord`); `docs/L3/producing-runtime/design.md` §2/§4 and `docs/L2/producing-runtime/interface.md` rev 3 §4; `src/renderer/renderer.ts`, `extensions.ts`, `runtime.ts`; `D-313`, `D-129`, `D-307` · **A stub is a DECLARATION and never a body** (D-3)
- **Read order:** §1 the install → §2 the pane map → §3 the invariants

## 1. `src/renderer/renderer.ts` — the one install

```ts
import type { CapabilityRouter } from './extensions.js'
import type { ContributionResult, Runtime } from './runtime.js'

/** The install's answer, for the log and the rows: the modules it composed, the node ids it added, the contributions
 *  the runtime skipped BY NAME, and the handler entries it filled (`S-18`/`S-20`). Idempotent: a contribution whose
 *  authored ids already stand in the live graph is not composed twice, so a repeated frame adds nothing. */
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
/** **NO SIXTH MAP IS WRITTEN HERE, AND THAT IS `S-18`'S OWN SHAPE IN THIS TREE** (`S-18`, `C-9`): the five sites already
 *  stand in `src/renderer/renderer.ts` as declared literal tables — `PANE_NODE_IDS`, `PANE_HEAD_IDS`, `PANE_BODY_IDS`,
 *  `PANE_COLLAPSE_IDS` and `PANE_MOVE_GRIP_IDS` — each TOTAL over `DECLARED_PANE_IDS`, and `PM-1`/`PM-2` read them by
 *  name (`tests/unit/renderer-wiring/pane-node-map.test.ts`). **THE COMPOSED SET IS `U2`'S** (`S-17`): the declaration
 *  registry is not built, so the five tables are total over the foundation's set today and a module pane becomes a full
 *  pane the moment `U2` widens the declared set. A function composing a set that does not exist would be the second
 *  authority this page refuses (`D-129`). */

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
- **The five pane tables are total over the declared set, and this page writes no sixth**; a declared pane with no entry is a red BY NAME (`PM-1`), and an undeclared id a table invents is the same class (`S-18`). The COMPOSED set is `U2`'s, so `M-18` waits on that registry rather than being green over the foundation alone.
- **The stage paint is the app-layout turn's**; this page supplies graph data and adds no second paint, subscriber or route (`D-129`).
- **No `src/**` byte is declared here**; the install is L4's (D-3).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "renderer-wiring", "writes": [{"path": "docs/L3/renderer-wiring/module-shape-signatures.md", "d": "D-306", "why": "this page, rev 2 \u2014 the install, the action record's closure and the five pane tables; no sixth map"}]}
```
