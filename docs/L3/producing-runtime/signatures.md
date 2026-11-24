# L3 — `producing-runtime`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `producing-runtime` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **THE COMPOSITION STUBS JOIN THE PRE-BUILD AND THE MODE BRANCH** (`docs/L2/producing-runtime/interface.md` rev 3 §4, `design.md` rev 2 §4): one merge routine, two instants, and the stored authored document `D-313`'s refusal forces (`D-1`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§6; `docs/L2/producing-runtime/interface.md` rev 3 §1–§6; `docs/L3/module-system/design.md` §4/§6; `src/renderer/runtime.ts` (the constructor, `composeContributions`, `findAuthoredNode`, `loadEnvelope`, `applyCommand`, `focusedSlice`, `envelope`); `src/shared/module-contract.ts` (`GraphContribution`); `node_modules/provident-ssr/dist/core/supervisor.d.ts` (`CompileMode`, `getCompileMode`); `D-124`, `D-252`, `D-310`, `D-313`, `D-314` · **Landed as declared** — `contribute`, the stored `envelope` and `compileDirtyInMode` stand in `src/renderer/runtime.ts` (D-3, `D-317`)
- **Read order:** §1 the option and the composition → §2 the mode branch → §3 the invariants

## 1. `src/renderer/runtime.ts` — the option, the stored document and `contribute`

```ts
import type { GraphContribution } from '../shared/module-contract.js'

export interface RuntimeOptions {
  mount: HTMLElement
  envelope: LegacyInitialData
  maxJournalLength?: number
  /** THE ORDERED BOOT READER (`S-14`, `S-15`): the module-system resolver's answer, consumed ONCE in the constructor,
   *  before `translateLegacy`. The runtime sorts nothing (`ASM-PR-1`). */
  contributions?: () => readonly GraphContribution[]
}

/** What `contribute` answers (`S-20`): the authored ids it composed, the contributions it refused BY NAME, and whether
 *  the document moved. **`changed` is the MERGE's and never `added.length > 0`** — an id-less forest reaches the document
 *  with nothing to report in `added` (`AN-6`). **`skipped`'s three arms, stated once**: an authored `parent` for a
 *  contribution the merge refused (a parent that does not stand, an uncloneable node list), the synthetic
 *  `'contributions'` for a throwing reader, and **every** parent when the stored document is absent (`null`) — the string
 *  is the subject, and the warning that rides beside it carries the reason (`AN-8`). */
export interface ContributionResult {
  readonly added: readonly string[]
  readonly skipped: readonly string[]
  readonly changed: boolean
}

export class Runtime {
  // … existing members unchanged …
  /** THE AUTHORED DOCUMENT (`L2` §4, `ASM-PR-3`): a clone of the COMPOSED envelope the constructor built. It is the
   *  `code.*` CRUD's document from boot, and `contribute`'s merge base. Replaced by the merged clone only when a
   *  contribution actually added a node. */
  private envelope: LegacyInitialData | null = null

  /** ONE MERGE IMPLEMENTATION (`S-14`, `S-15`, `S-20`): each contribution's nodes join the authored template under its
   *  `parent`'s `children` (found by authored `css.id`/`props.id`), in the caller's order. A reader throw, an
   *  uncloneable envelope/node and a missing parent are NAMED in the returned warnings and skipped. PURE: it never
   *  mutates `envelope` and never loads. Called by the constructor and by `contribute`. */
  private composeContributions(
    envelope: LegacyInitialData,
    reader?: () => readonly GraphContribution[],
  ): { envelope: LegacyInitialData; warnings: TranslatedWarning[] }

  /** THE RUNTIME COMPOSITION (`S-20`, `L2` §4): merge through `composeContributions`, then `loadEnvelope` the result —
   *  the construction path, so the authored `handlers` stay. A fully-skipped call leaves the document and the graph
   *  untouched. Never throws (`ASM-PR-2`). The caller re-drives its paints. */
  contribute(contributions: readonly GraphContribution[]): ContributionResult

  bootstrap(): void   // unchanged
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
- **`bootstrap()` keeps its signature**; the pre-build is the constructor's, not the boot's.

## 3. The invariants a stub reader must not lose

- **The boot reader is invoked ONCE, at CONSTRUCTION, before `translateLegacy`, in list order; the runtime sorts nothing** (`S-15`, `ASM-PR-1`). A second call, a sort, or a post-compile composition through that reader is the defect.
- **`contribute` is the ONE sanctioned later instant, and it uses the SAME merge routine**, then the construction path (`L2` §4, `ASM-PR-1`). A second merge implementation, or a serializer round-trip (`exportLegacy` → `loadEnvelope`), is the defect — the latter drops the 30 authored handlers measured at `src/shared/demo-envelope.ts` (`D-313`).
- **The stored `envelope` is the `code.*` document from boot**; `contribute` advances it only on a real addition (`ASM-PR-3`). Two documents beside one document's edits is the defect.
- **A throwing or parentless contribution is NAMED in the warnings and skipped; nothing throws** (`ASM-PR-2`, `D-124`). Never the store's fatal arm.
- **The compile mode is read per command from `getCompileMode()`**, and the pass-2 is never the route: `compilePath` per member in `'path'`, `node.compile` byte-for-byte in `'family'` (`S-16`, `C-7`, `D-314`).
- **A freshly translated node still needs `detach` before `attach`** (its owner-token `child` anchor); at `0.6.0` `attach` registers-if-new (`C-7`, `H-1`'s surviving (i)).
- **The action/named-handler table is `renderer-wiring`'s** (`C-10`, `D-313`); this module installs no handler closure and reads no source text.
- **No `src/**` byte is declared here**: the runtime edits are L4's (D-3).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "producing-runtime", "writes": [{"path": "docs/L3/producing-runtime/signatures.md", "d": "D-317", "why": "this page, rev 3 \u2014 `ContributionResult` carries `changed` and `skipped`'s three arms (`AN-8`)"}]}
```
