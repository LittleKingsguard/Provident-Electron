# L3 — `producing-runtime`: the ordered pre-build contribution and the mode-aware post-bootstrap compile

- **Layer:** L3 · **Module:** `producing-runtime` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW**: `docs/L2/producing-runtime/interface.md` rev 2 fixes the module's two cells and no page stated the structure, signatures or guardrails under them (brief §3, `D-1`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** a source cite names its site and never an offset (D-41)
- **Inputs:** `docs/L2/producing-runtime/interface.md` rev 2 §2–§5; `docs/L1/modularity.md` rev 15 §3 `S-14`/`S-15`/`S-16`, §4 `C-6`/`C-7`, §6 `M-14`/`M-15`/`M-16`; `docs/L3/module-system/design.md` §4/§6; `src/renderer/runtime.ts` by site (`RuntimeOptions`, `bootstrap`, `applyCommand`, `focusedSlice`, the constructor's register loop); `node_modules/provident-ssr/dist/core/supervisor.d.ts` (`CompileMode`, `SupervisorOptions.compileMode`, `getCompileMode`/`setCompileMode` — the first not re-exported by the barrel) and `dist/core/supervisor.js` (the pass-2 switch, register-if-new `attach`); `D-124`, `D-252`, `D-310`, `D-314`
- **Write scope:** `docs/L3/producing-runtime/` (brief §3); `src/**` is read-only at this layer (D-3)
- **Status:** DESIGN — the pre-build point and the mode branch are OWED to `src/renderer/runtime.ts`; the module's existing tests stand and are not replaced

## 1. The file, and the two cells

- **ONE FILE, TWO ADDITIONS, NO NEW MODULE**: `src/renderer/runtime.ts` gains (i) an ordered contribution option read at `bootstrap()`, and (ii) a mode-aware compile in `applyCommand`'s dirty loop. **NO new MCP surface, no bridge member, no transport** (`D-18`; `applyCommand` is in-process).
- **The contribution's shape is `module-system`'s, imported and not re-spelled**: `GraphContribution = {parent: string; nodes: readonly Readonly<Record<string, unknown>>[]}` (`src/shared/module-contract.ts`; `L2` §2). The runtime consumes the reader's answer and sorts nothing.

## 2. The pre-build point — `bootstrap()`, after the register and before the first compile

- **`RuntimeOptions` gains `contributions?: () => readonly GraphContribution[]`** (`L2` §2, `ASM-PR-1`). The constructor keeps the envelope's translate + `registerNode` loop; **`bootstrap()` invokes the reader ONCE, composes the contributions, and only then calls `render()`** — the first compile sees the module's nodes (`S-14`).
- **EACH CONTRIBUTION IS TRANSLATED BY THE SAME `translateLegacy` THE ENVELOPE USES**, as a document whose nodes are the contribution's; its translated nodes are registered the way the constructor registers the envelope's, and each contribution ROOT is `attach`ed under `parent` — resolved by the runtime's own `resolveTarget` (the id index, then `getNode`) — **before the first compile** (`C-6`; the graph is the only source of UI).
- **THE ORDER IS THE READER'S, AND THE RUNTIME SORTS NOTHING** (`S-15`): the foundation's nodes are already in the graph, so a module's addition follows them by construction; a later contribution may name an earlier one's parent.
- **A THROWING CONTRIBUTION IS CAUGHT, NAMED AND SKIPPED, and the boot continues** (`ASM-PR-2`, `D-124`): the name goes through the runtime's existing warnings channel (the one `load`/`validate`/`op` surface), never a throw and never the fatal arm. **A contribution whose `parent` does not resolve is the same class**, named rather than silently dropped — an addition with no parent would be an orphan, not a composition (`C-6`).
- **NO SECOND COMPOSITION AUTHORITY**: after `bootstrap()` the reader is not called again; an addition after the first compile is a graph command (`applyCommand`) and never a second pre-build (`ASM-PR-1`, `D-129`).

## 3. The mode-aware compile — `applyCommand`'s dirty loop

- **THE MODE IS READ PER COMMAND, FROM THE SUPERVISOR'S OWN ANSWER**: `const mode = this.supervisor.getCompileMode()` (`'path' | 'family'`; the `CompileMode` type is imported from `provident-ssr/dist/core/supervisor.js`, **not the barrel** — `L1` §7 `OWED-13`'s note, `D-314`).
- **`'path'` COMPILES EACH MEMBER OF THE DIRTY NODE'S FOCUSED SLICE WITH `compilePath()`**, collecting the actionable states exactly as the bootstrap's path-enumeration pass does; **`'family'` KEEPS `node.compile(this.focusedSlice(node), {focusNodeId: node.id})` BYTE-FOR-BYTE** (`S-16`, `C-7`). **THE RENDER IS NEVER DELEGATED TO THE SUPERVISOR'S PASS-2**: the command's synchronous answer is what `provident.op` composes its rendered read from (`C-7`).
- **`attach` ON A FRESHLY TRANSLATED NODE STILL NEEDS A `detach` FIRST** — the node carries its own `child` owner-token anchor, so a bare `attach` answers `rejected single-parent` (`C-7`, `H-1`'s surviving (i)); **at `0.6.0` `attach` registers-if-new**, so the `registerNode`-before-`attach` workaround is not owed.
- **`M-16` IS THE ADOPTION'S ROW** (`S-16`): it enters the path domain first (a placement-bearing `provident.load` or the supervisor's declared `setCompileMode('path')`), then applies its `attach` through `provident.op` and asserts the appended child INSIDE its parent with a rendered read, five ids.

## 4. Guardrail notes

- **No hand-written DOM and no post-compile string transform**: a contribution is graph DATA (`C-6`; the `transform` class `D-231` is retired).
- **No sort, no second reader call, no late contribution** (`S-15`, `ASM-PR-1`).
- **No fatal arm and no throw from a contribution** (`D-124`, `ASM-PR-2`).
- **No mode-blind compile**: the `node.compile` call alone is the defect `D-314` re-grades; the branch is the adoption (`S-16`).
- **No source text in graph data and no dispatch-time resolver**: the action table is `renderer-wiring`'s (`C-10`, `D-313`), not this page's.

## 5. The battery

- **`tests/integration/producing-runtime/` is the new path** (the map row owes it): `M-14` — a contribution's nodes composed before the first compile (a rendered read finds the child inside its parent), and a throwing contribution NAMED in the warnings while the boot continues; `M-15` — the order, a later contribution attaching under an earlier one's node.
- **`M-16`** — the mode adoption, reserved in `tests/e2e/modularity/`; `M-14`/`M-15`'s e2e twins stay L1's. The module's existing flat runtime tests stand (`tests/runtime*.test.ts` and the engine-pin family).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "producing-runtime", "writes": [{"path": "docs/L3/producing-runtime/design.md", "d": "D-314", "why": "this page, rev 1 NEW: the ordered pre-build contribution and the mode-aware post-bootstrap compile, with their guardrails and battery — no `src/**` byte"}]}
```
