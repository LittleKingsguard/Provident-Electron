# L2 — `producing-runtime`: the command surface, the ordered pre-build contribution point, and the post-bootstrap compile

- **Layer:** L2 · **Module:** `producing-runtime` (`strata/modules.json`: `src/renderer/runtime.ts` and its seventeen test paths, `endpoints` **17**) · **Unit:** `modularity` (rev 2's two cells) with `app-layout`'s `S-1` cell CARRIED · **Branch:** `main` · **Rev:** 2 — **THE PRE-BUILD CONTRIBUTION (`S-14`/`S-15`) AND THE POST-BOOTSTRAP COMPILE (`S-16`) JOIN THE PAGE, AND THE `string`-`target` CELL OF REV 1 IS CARRIED UNMOVED**: the ordered contribution point is where a module's graph DATA enters before the first compile, and `applyCommand`'s compile now honours the supervisor's tree compile mode (`D-314`, `D-310`); the rev-1 cell — `applyCommand`'s `string`-`target` resolution — is `app-layout`'s and stands exactly as filed (`D-177`, `D-179`, `D-182`)
- **Inputs:** `docs/L1/modularity.md` rev 15 §2's `producing-runtime` row, §3 `S-14`/`S-15`/`S-16`, §4 `C-6`/`C-7`, §6 `M-14`/`M-15`/`M-16`; `docs/L1/app-layout.md` §2/§3 (`S-1`); `docs/L3/module-system/design.md` §4/§6 (the resolver's order and the contributions' shape); `src/renderer/runtime.ts` by site (`RuntimeOptions`, `bootstrap`, `applyCommand`, `load`, `op`); `D-124`, `D-177`, `D-179`, `D-182`, `D-252`, `D-310`, `D-314`
- **Write scope:** `docs/L2/producing-runtime/` and `tests/integration/producing-runtime/` (brief §3); `src/**` is read-only at this layer and neither package is ever modified (D-3, D-5)
- **Ceiling:** 150 lines; at the ceiling it splits by owner and is never appended (D-1, D-2) · **Citations:** a source cite names its **site** and never an offset (`D-41`)
- **Status:** DESIGN — no structure or signature (that is `docs/L3/producing-runtime/`); **THE TWO CELLS LANDED**: `RuntimeOptions.contributions` merges the ordered contributions before `translateLegacy`, and `applyCommand`'s compile honours `getCompileMode()`; `M-14`/`M-15` are written and `M-16` is the e2e row

## 1. The command surface as it stands, and the rev-1 cell carried unmoved

- **`applyCommand(cmd)` is the realm's one managed-channel entry** (`src/renderer/runtime.ts`, its own site): a `string` `node` resolves and an unresolvable string is `{status:'rejected'}` before the engine sees it; an object `node` must be a registered, undestroyed node (the `F5` gate); and a `string` `target` resolves through the SAME resolver as `node`, with an unresolvable one refused by the same word — rev 1's cell, carried (`D-179`, `D-182`).
- **The engine's four operand refusals are the engine's** (`hook-kind-mismatch`, `rows-prototype-unresolved`, `rows-placement-name-missing`, `rows-shape-invalid`), answered verbatim and never thrown; `rejected` is THIS realm's word for a command it could not resolve (`D-182`).
- **The rest of the surface is carried by the module's existing tests and is not re-derived here**: `bootstrap`, `load`, `op`, `journal`, `export`/`validate`, `dispatch`, `renderedHtml`/`markdown`/`listTargets`/`nodeState`, the id index, and the code.* methods. This page states the TWO cells the modularity unit adds and the rev-1 cell it inherits.

## 2. The pre-build contribution point (`S-14`, `S-15`)

- **THE POINT IS THE CONSTRUCTOR, AT THE ENVELOPE COMPOSITION BEFORE `translateLegacy`** (`C-6`, `S-14`): `RuntimeOptions` gains an ordered reader — the module-system resolver's answer, each element `{parent: string; nodes: readonly Readonly<Record<string, unknown>>[]}` (`GraphContribution`, the contract's shape) — and the constructor merges each contribution's nodes into the authored template under its `parent`'s `children`, BEFORE `translateLegacy`, so a module's addition is graph DATA and never a post-compile transform or hand-written DOM (`C-6`, `D-304`).
- **THE ORDER IS THE READER'S AND THE RUNTIME SORTS NOTHING**: the foundation's own nodes exist before any module's, because the list is the resolver's total order (`S-15`, `C-11`); a module that requires another activates after it, and no caller re-sorts (the L1 ordering must-have).
- **A THROWING CONTRIBUTION IS CONTAINED AND NAMED, AND THE BOOT NEVER TAKES THE FATAL ARM** (`S-14`, `D-124`): the runtime catches a contribution's throw, names it in the census/warnings the boot already carries, and continues with the remaining contributions — a module's fault is never the app's (D-80's fatal arm is the store's and never this). **A contribution whose parent id does not stand is the same class**, named rather than silently dropped.
- **NO NEW MCP SURFACE AND NO NEW TRANSPORT** (`D-18`): the point is in-process, read at `bootstrap()`; `provident.load` and the MCP routes are unmoved.

## 3. The post-bootstrap compile (`S-16`)

- **`applyCommand`'s compile HONOURS `getCompileMode()`** (`D-314`, re-graining rev 1's mode-blind arm): after `supervisor.apply`, the dirty node's focused slice is compiled with `compilePath()` per member when the supervisor answers `'path'`, and `node.compile(slice, {focusNodeId})` is kept byte-for-byte when it answers `'family'`. **THE RENDER IS NOT DELEGATED TO THE SUPERVISOR'S PASS-2**: the command's synchronous answer is what `provident.op` composes its rendered read from (`C-7`).
- **`attach` needs no `registerNode` before it at `0.6.0` (register-if-new, idempotent)**, and **STILL needs a `detach` first on a freshly translated node** — that node carries its own `child` owner-token anchor and `attach` would answer `rejected single-parent` (`C-7`, `H-1`'s surviving (i)).
- **THE ROW IS `M-16`**: renders THROUGH the host path (`provident.op` → `applyCommand`) under a placement-routed bootstrap and asserts the appended child INSIDE its parent with a rendered read, five ids; the row ENTERS the mode first (a placement-bearing load or `setCompileMode('path')`), because the app's authored envelope records family states (`S-16`).

## 4. What this page does not own, and what the graph's actions are

- **The ACTION installation is not this page's**: a module's `ctx.action(name, fn)` handlers are installed into live graph nodes by `renderer-wiring` (the S-20 stage paint) via ONE `state-slice` with `targetProp:'handlers'` per node or ONE `layer-apply` with `data.handlers` per subtree; the engine matches the handler's `name`/`event`, no source text enters graph data and no dispatch-time resolver exists (`C-10`, `D-313`). This page owns the PRE-BUILD composition and the compile; the action table is that seat's.
- **The resolver, the manifest and the contributions' production are `module-system`'s** (`docs/L2/module-system/interface.md` §7, §11): this page consumes the reader's answer and re-derives no ordering.
- **The rev-1 scope's rest remains the module's own**: the load/render/read surface, `dispatch`'s domain, the handler-body `apply` path and the engine-operand refusals are the module's existing rows and are not re-spelled here (`D-26`, `D-43`).

## 5. The battery and the assumptions

- **The pre-build rows live in the module's integration battery** (`tests/integration/producing-runtime/`, the path this page adds): `M-14`'s two arms — a contribution's nodes composed before the first compile, and a throwing contribution named while the boot continues — and `M-15`'s order. **`M-16`** is the mode adoption's row, reserved in `tests/e2e/modularity/` (`S-16`). The map row's flat runtime tests stand and are not replaced.
- **`ASM-PR-1` — the contribution reader is an option, not a mutable runtime member.** Alternative rejected: a `contribute()` method a module calls later, which would let an addition arrive after the first compile and put a second composition authority beside `bootstrap()` (`C-6`, `D-129`).
- **`ASM-PR-2` — a throwing contribution is a named warning and the boot continues.** Alternative rejected: the fatal arm, which would make one module's fault the app's (`D-80`, `D-124`).

```boundary-declared
{"unit": "modularity", "layer": "L2", "module": "producing-runtime", "writes": [{"path": "docs/L2/producing-runtime/interface.md", "d": "D-314", "why": "this page, rev 2 — the ordered pre-build contribution (§2) and the post-bootstrap compile honoring getCompileMode (§3) join the carried applyCommand string-target cell; no `src/**` byte"}]}
```
