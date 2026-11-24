# L3 — `producing-runtime`: the pre-build contribution, the mode-aware compile, and the authored-envelope composition

- **Layer:** L3 · **Module:** `producing-runtime` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **THE AUTHORED-ENVELOPE COMPOSITION JOINS THE PAGE** (`docs/L2/producing-runtime/interface.md` rev 3 §4): rev 1's two cells stand, and §4 states the stored document and `contribute`'s structure — the serializer route is refused by measurement, not by taste (`D-313`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** a source cite names its site and never an offset (D-41)
- **Inputs:** `docs/L2/producing-runtime/interface.md` rev 3 §1–§6; `docs/L1/modularity.md` rev 15 §3 `S-14`/`S-15`/`S-16`/`S-20`, §4 `C-6`/`C-7`/`C-10`, §6 `M-14`/`M-15`/`M-16`; `docs/L3/module-system/design.md` §4/§6; `docs/L2/renderer-wiring/module-shape.md` rev 1; `src/renderer/runtime.ts` by site (the constructor, `composeContributions`, `findAuthoredNode`, `loadEnvelope`, `applyCommand`, `focusedSlice`, `envelope`, `codeGet`/`codeSet`); `src/shared/demo-envelope.ts` (the 30 authored handlers); `node_modules/provident-ssr/dist/core/supervisor.d.ts` (`CompileMode`, `getCompileMode`/`setCompileMode` — the first not re-exported by the barrel) and `dist/core/serialize.d.ts` (`serializeNode`); `D-124`, `D-252`, `D-310`, `D-313`, `D-314`
- **Write scope:** `docs/L3/producing-runtime/` (brief §3); `src/**` is read-only at this layer (D-3)
- **Status:** LANDED — rev 1's two cells in `src/renderer/runtime.ts` (the construction-time merge before `translateLegacy`; the `getCompileMode()` branch in `applyCommand`) with `M-14`/`M-15`, and rev 2's stored document + `contribute` with `D-317(a)`/`(b)`/`(c)`

## 1. The file, and the three cells

- **ONE FILE, THREE ADDITIONS, NO NEW MODULE**: `src/renderer/runtime.ts` gains (i) an ordered contribution option read at construction, (ii) a mode-aware compile in `applyCommand`'s dirty loop, and (iii) the stored authored document plus `contribute`. **NO new MCP surface, no bridge member, no transport** (`D-18`; all three are in-process).
- **The contribution's shape is `module-system`'s, imported and not re-spelled**: `GraphContribution = {parent: string; nodes: readonly Readonly<Record<string, unknown>>[]}` (`src/shared/module-contract.ts`; `L2` §2). The runtime consumes the reader's answer and sorts nothing.

## 2. The pre-build point — the constructor, before the first compile

- **`RuntimeOptions` gains `contributions?: () => readonly GraphContribution[]`** (`L2` §2, `ASM-PR-1`). The constructor keeps the envelope's translate + `registerNode` loop; **THE CONSTRUCTOR invokes the reader ONCE and merges the contributions into the authored template BEFORE `translateLegacy`** (`C-6`); `bootstrap()` is unchanged — the first compile sees the module's nodes (`S-14`).
- **EACH CONTRIBUTION'S NODES ARE MERGED INTO THE AUTHORED TEMPLATE UNDER THEIR `parent`'s `children`**, found by the authored id (`css.id`/`props.id`) in the template tree, **before `translateLegacy`** — no synthetic document, no wrapper element and no second translate (`C-6`; the graph is the only source of UI). **The routine is `composeContributions`, and it is the ONE merge implementation** (§4 calls it too).
- **THE ORDER IS THE READER'S, AND THE RUNTIME SORTS NOTHING** (`S-15`): a later contribution may name an earlier one's parent.
- **A THROWING CONTRIBUTION IS CAUGHT, NAMED AND SKIPPED, and the boot continues** (`ASM-PR-2`, `D-124`): the name goes through the runtime's existing warnings channel, never a throw and never the fatal arm. **A contribution whose `parent` does not resolve is the same class**, named rather than silently dropped.

## 3. The mode-aware compile — `applyCommand`'s dirty loop

- **THE MODE IS READ PER COMMAND, FROM THE SUPERVISOR'S OWN ANSWER**: `const mode = this.supervisor.getCompileMode()` (`'path' | 'family'`; the `CompileMode` type is imported from `provident-ssr/dist/core/supervisor.js`, **not the barrel** — `L1` §7 `OWED-13`'s note, `D-314`).
- **`'path'` COMPILES EACH MEMBER OF THE DIRTY NODE'S FOCUSED SLICE WITH `compilePath()`**, collecting the actionable states exactly as the bootstrap's path-enumeration pass does; **`'family'` KEEPS `node.compile(this.focusedSlice(node), {focusNodeId: node.id})` BYTE-FOR-BYTE** (`S-16`, `C-7`). **THE RENDER IS NEVER DELEGATED TO THE SUPERVISOR'S PASS-2**: the command's synchronous answer is what `provident.op` composes its rendered read from (`C-7`).
- **`attach` ON A FRESHLY TRANSLATED NODE STILL NEEDS A `detach` FIRST** — the node carries its own `child` owner-token anchor, so a bare `attach` answers `rejected single-parent` (`C-7`, `H-1`'s surviving (i)); **at `0.6.0` `attach` registers-if-new**, so the `registerNode`-before-`attach` workaround is not owed.
- **`M-16` IS THE ADOPTION'S ROW** (`S-16`): it enters the path domain first, then applies its `attach` through `provident.op` and asserts the appended child INSIDE its parent with a rendered read, five ids.

## 4. The stored authored document and `contribute`

- **THE CONSTRUCTOR STORES THE COMPOSED AUTHORED DOCUMENT** (`L2` §4, `ASM-PR-3`): `this.envelope = structuredClone(composed.envelope)`. Today the field is set only by `loadEnvelope`/`loadDoc`, so a boot-constructed runtime's `code.set`/`code.create`/`code.delete` refuse with *"no envelope loaded"* and `code.get` answers `null`/unresolved; the same field now serves the code CRUD **and** the runtime composition. One document, never two (`D-129`).
- **`contribute(contributions)` CALLS `composeContributions` ON THE STORED DOCUMENT, THEN `loadEnvelope`s THE RESULT** (`S-20`, `C-6`): the merge is the constructor's routine — same parent lookup, same order, same warnings — and the re-load is the construction path (teardown → translate → register → build payloads → render), so a runtime module's nodes are graph DATA in the authored page and never a post-compile patch. **`loadEnvelope` clones; the stored document is replaced by the merged clone ONLY when the contribution produced an addition**, so a fully-skipped call leaves the graph and the document untouched.
- **THE AUTHORED `handlers` SURVIVE BECAUSE THE DOCUMENT IS THE AUTHORED ONE** (`D-313`, the refusal `L2` §4 measures): `src/shared/demo-envelope.ts` authors 30 `handlers:` entries and the engine's `serializeNode` emits none, so the serializer route would disarm zone-collapse, gutter-drag, pane-move/collapse and tabs-add — a measured regression, not a cost.
- **EACH DISTINCT SKIP IS NAMED ONCE** (`AN-9`): the runtime's kept warnings dedupe by `code`/`path`, so N module frames naming the same absence add one entry and not N — the growth is bounded by the distinct skips, never by the frame count. **THE ANSWER IS `{added, skipped, changed}` AND EVERY SKIP IS NAMED IN THE WARNINGS** — `changed` is set by the MERGE and never derived from `added`, because an id-less forest reaches the document with nothing to report in `added` (`AN-6`): a parent that does not stand, a throwing reader, an uncloneable node list. **No throw escapes `contribute`** (`ASM-PR-2`'s class) and **no half-attached subtree is possible**, because the merge is all-or-nothing per contribution on a clone.
- **THE ORDER IS THE CALLER'S**: `renderer-wiring`'s `startModuleShape` passes the router's `contributions()` in the resolver's activation order (`S-15`) and re-drives the paints the re-render retired; this module sorts nothing and renders nothing beyond its own `loadEnvelope`.
- **NO SECOND COMPOSITION AUTHORITY REMAINS**: the option reader is constructor-time and `contribute` is the sanctioned post-compile instant; both are `composeContributions`, and no other code path merges an authored node list (`ASM-PR-1`, `D-129`).

## 5. Guardrail notes

- **No hand-written DOM and no post-compile string transform**: a contribution is graph DATA (`C-6`; the `transform` class `D-231` is retired).
- **No sort, no second reader call inside `contribute`, no second merge implementation** (`S-15`, `ASM-PR-1`).
- **No fatal arm and no throw from a contribution** (`D-124`, `ASM-PR-2`).
- **No mode-blind compile**: the `node.compile` call alone is the defect `D-314` re-grades; the branch is the adoption (`S-16`).
- **No serializer round-trip**: `exportLegacy` → `loadEnvelope` drops the authored handlers (`D-313`, measured at `src/shared/demo-envelope.ts`).
- **No source text in graph data and no dispatch-time resolver**: the action table is `renderer-wiring`'s (`C-10`, `D-313`), not this page's.

## 6. The battery

- **`tests/integration/producing-runtime/prebuild.test.ts` is WRITTEN** (`M-14`, `M-14b`, `M-14c`, `M-15`): the child composed inside its parent, a reader throw named while the boot continues, a missing parent named and not half-attached, and a later contribution under an earlier one's node. **The map row does not yet claim the path** — that filing is L1's.
- **Rev 2's rows are WRITTEN in the same file as `D-317(a)`…`(c)`**: `contribute` adds a child under its parent and a pre-authored handler still dispatches afterwards; a parentless contribution is named and skipped with the graph byte-identical; the code CRUD answers the authored document from boot, with the composed contribution inside it.
- **`M-16`** — the mode adoption, reserved in `tests/e2e/modularity/`; `M-18` is `renderer-wiring`'s pane row. The module's existing flat runtime tests stand (`tests/runtime*.test.ts` and the engine-pin family).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "producing-runtime", "writes": [{"path": "docs/L3/producing-runtime/design.md", "d": "D-320", "why": "this page, rev 4 \u2014 \u00a74's warnings channel states `AN-9`'s dedupe beside the answer's three members"}, {"path": "src/renderer/runtime.ts", "d": "D-320", "why": "`contribute` keeps each distinct skip once (dedupe by code/path), so the kept warnings are bounded by the distinct absences", "by": "L4"}, {"path": "demo/pane-drag-demo/demo.mjs", "d": "D-118", "why": "the demo bundle regenerated against the runtime its @source digests name", "by": "L4"}]}
```
