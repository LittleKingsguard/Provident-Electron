# L3 — `producing-runtime`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `producing-runtime` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW**: `docs/L3/producing-runtime/design.md` rev 1 and `docs/L2/producing-runtime/interface.md` rev 2 fix the structure and the cells; this page fixes the declarations under them (`D-1`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§5; `L2` §1–§5; `docs/L3/module-system/design.md` §4/§6; `src/renderer/runtime.ts` (`RuntimeOptions`, `Runtime`, `bootstrap`, `applyCommand`, `focusedSlice`); `src/shared/module-contract.ts` (`GraphContribution`); `node_modules/provident-ssr/dist/core/supervisor.d.ts` (`CompileMode`, `getCompileMode`); `D-124`, `D-252`, `D-310`, `D-314` · **A stub is a DECLARATION and never a body**: every `declare` is L4's to fill (D-3)
- **Read order:** §1 the option → §2 the mode branch → §3 the invariants

## 1. `src/renderer/runtime.ts` — the option and the pre-build

```ts
import type { GraphContribution } from '../shared/module-contract.js'

export interface RuntimeOptions {
  mount: HTMLElement
  envelope: LegacyInitialData
  maxJournalLength?: number
  /** THE ORDERED PRE-BUILD READER (`S-14`, `S-15`): the module-system resolver's answer, consumed ONCE at `bootstrap()`
   *  after the envelope's nodes register and before the first compile. The runtime sorts nothing (`ASM-PR-1`). */
  contributions?: () => readonly GraphContribution[]
}

export class Runtime {
  // … existing members unchanged …
  /** Translate each contribution by the SAME `translateLegacy`, register its nodes, `attach` each root under its
   *  `parent` (resolved by `resolveTarget`), name a throwing or parentless contribution in the warnings, and continue.
   *  Called by `bootstrap()` ONCE, before `render()`. */
  private prebuild(): void
  bootstrap(): void   // unchanged signature: `prebuild()` then `render()`
}
```

## 2. `applyCommand`'s mode branch

```ts
import type { CompileMode } from 'provident-ssr/dist/core/supervisor.js'   // the barrel does not re-export it (D-314)

/** ONE dirty node's focused slice, compiled in the supervisor's OWN mode (`S-16`, `C-7`):
 *  `'path'` → `compilePath()` per member, collecting the actionable states exactly as the bootstrap's path pass does;
 *  `'family'` → `node.compile(slice, { focusNodeId: node.id })`, byte-for-byte.
 *  NEVER the supervisor's pass-2, whose states arrive in a microtask after the command's answer (`C-7`). */
private compileDirtyInMode(node: Node): CompiledState[]
```

- **`applyCommand(cmd)` keeps its signature and its refusal arms** (rev 1's `node`/`target`/`source`/`move` guards, the mutation-shape predicate); **only the dirty loop's compile call moves** from `node.compile(...)` alone to `compileDirtyInMode(node)`.
- **`bootstrap()` keeps its signature**; the addition is the one `prebuild()` call before `render()`.

## 3. The invariants a stub reader must not lose

- **The reader is invoked ONCE, at `bootstrap()`, in list order; the runtime sorts nothing** (`S-15`, `ASM-PR-1`). A second call, a sort, or a post-compile composition is the defect.
- **A contribution is GRAPH DATA, translated by the same `translateLegacy`; its root `attach`es under `parent`** (`C-6`). No hand-written DOM, no post-compile string transform (the `transform` class is retired, `D-231`).
- **A throwing or parentless contribution is NAMED in the warnings and skipped; the boot continues** (`ASM-PR-2`, `D-124`). Never a throw out of `bootstrap()` and never the store's fatal arm.
- **The compile mode is read per command from `getCompileMode()`**, and the pass-2 is never the route: `compilePath` per member in `'path'`, `node.compile` byte-for-byte in `'family'` (`S-16`, `C-7`, `D-314`).
- **A freshly translated node still needs `detach` before `attach`** (its owner-token `child` anchor); at `0.6.0` `attach` registers-if-new (`C-7`, `H-1`'s surviving (i)).
- **The action/named-handler table is `renderer-wiring`'s** (`C-10`, `D-313`); this module installs no handler closure and reads no source text.
- **No `src/**` byte is declared here**: the runtime edits are L4's (D-3).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "producing-runtime", "writes": [{"path": "docs/L3/producing-runtime/signatures.md", "d": "D-314", "why": "this page, rev 1 NEW: the contribution option, the mode-branch stub and the invariants — no `src/**` byte"}]}
```
