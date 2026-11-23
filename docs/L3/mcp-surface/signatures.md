# L3 — `mcp-surface`: the signature stubs L4 implements against — the composition, the port, the re-registration call, the captured-handles accessor, the router reader, the version seam and the registration predicate

- **Layer:** L3 · **Module:** `mcp-surface` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 · **Date:** 2026-11-23 · **Design:** `docs/L3/mcp-surface/design.md` rev 2 — this page transcribes it and adds no claim it does not make · **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Write scope:** `docs/L3/mcp-surface/` (brief §3); `src/**` read-only here (D-3)
- **What this page IS**: the signatures `S-5` writes, with no body anywhere — a signature document that carries a body is a design its implementer cannot own (D-1 §4, `brief.md` §4); every stub cites the `design.md` section that fixes it, so a disagreement is resolved there and never here (D-41). **What it is NOT, and the debt is named rather than hidden**: the WHOLE export set of the two files — §7's row compares one direction (every name declared here must be exported), so completeness is owed to the landing pass, when a set-equality can be taken both ways without declaring two hundred names (`D-45`; `design.md` §11).
- **REV 2 CLOSES THREE FINDINGS AND MOVES NO CLAIM**: the dynamic arm's router reader is DECLARED (§4, §5, `F-2`); the malformed-`enabled` totality cites the design's own `ASM-4` instead of borrowing a ground (§1, `F-3`); the block is COMPARED to the tree by `tests/unit/mcp-surface/signatures.test.ts` (§7, `F-4`), so `D-45`'s arm (ii) is satisfied for a DELTA block. The one later pass on this rev fits the page to its ceiling and moves no declaration.

## 1. `src/main/security.ts` — the registration predicate, factored and not re-decided

- **One export is added and nothing else moves**: `registeredToolNames` keeps its signature and delegates to it, so the construction arm's rule has ONE spelling (L2 §10; D-41's site rule). **Its scope is the REGISTRATION sites only** — the re-gate's toggle keeps the landed pair and the invocation keeps `moduleToolAllowed`, and `design.md` §4 says why the asymmetry is the contract's (`F-5`).

```ts
export type ToolGroup = 'read' | 'dispatch' | 'graph' | 'code' | 'module' | 'data'
/** THE REGISTRATION SITES' PREDICATE (`design.md` §4; L2 §10's construction clause). It answers the LANDED rule and nothing new: `module.install`/`module.update` need `module` AND `code`, every other name — `module.list` and a dynamic `module:<n>.<t>` included — registers by its GROUP alone, and an unknown name or a bare `module:` is denied because `groupForTool` answers `null`.
 *  TOTAL over `enabled` by THIS design's own rule (`design.md` §10 `ASM-4`): `null`, `undefined` and a non-iterable
 *  answer `false` and NEVER throw — `moduleToolAllowed`'s landed fail-closed posture, not `toolAllowed`'s `new Set(...)`. */
export function registrationAllowed(
  name: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
): boolean
```

- **Carried unmoved and named so a reader does not look for a second spelling**: `groupForTool` (an exact `TOOL_GROUPS` row first, then `module:` → `module`, `null` for a bare `module:`), `toolAllowed`, `moduleToolAllowed` (the invocation pair, `executable` defaulting TRUE) and `SecurityGate`'s members (L2 §10; `design.md` §7).

## 2. `src/main/mcp-server.ts` — the port the dynamic half arrives through

- **The port is module-system's answer, read at ONE member**: `activations()` and each element's `tools`, whose entries are already the full `module:<name>.<tool>` names. A structural type suffices, so a member that page adds later cannot break this composition (L2 §10; `docs/L2/module-system/interface.md` §11; `design.md` §2).

```ts
/** ONE ELEMENT of the registry's answer. This surface reads `tools` and NO other member (`design.md` §2). */
export interface ActivationLike {
  readonly tools: readonly string[]
}
/** THE DYNAMIC HALF'S SOURCE (`design.md` §3, §10 `ASM-1`): the full names of the registry's ACTIVATED module tools,
 *  in the registry's order. It carries NO group term — the GROUP axis is this surface's `admits` — which is what lets
 *  a withdrawal read it unfiltered (`design.md` §10 `ASM-5`). The DEFAULT wraps the router this server already
 *  invokes, so the published set and the invocable set are one set by construction. */
export interface ActivationSource {
  activations(): readonly ActivationLike[]
}
```

## 3. The composition function — pure, total, and the only place the set is ordered

```ts
/** THE COMPOSITION RULE (`design.md` §3; L2 §10; D-305). It takes the static half ALREADY group-filtered (`registeredToolNames`'s answer, in `ALL_TOOLS`' own order), the registry's half, and the GROUP predicate, and answers the published names: the static half first, the dynamic half after it in the registry's order, first occurrence winning, every name once.
 *  NOTHING is sorted — a sort re-seats a foundation name whenever a module is activated (D-41) — and no name is
 *  re-seated or dropped twice. TOTAL: an empty static half, an empty activation list or a non-array answer yields a
 *  set, never a throw. */
export function composePublishedSet(
  staticNames: readonly string[],
  activations: readonly ActivationLike[],
  admits: (name: string) => boolean,
): string[]
```

- **The predicate passed in is `(name) => gate.toolAllowed(name)`**: `groupForTool` is the ONE reader of the prefix rule, so a name its group does not admit is ABSENT from the set — never composed and then refused (L2 §10; `design.md` §3).

## 4. `ProvidentMcpServer`'s members this delta adds or widens

- **Transcribed, not exported**: the class is landed and exported; these three members are the surface's own reading of the set (§4's `capturedToolNames` is symmetric to the landed `registeredResources()`), and the reader below is the shape the landed `liveGate: () => SecurityGate` already establishes (`design.md` §5, `F-2`).

```ts
declare class ProvidentMcpServer {
  /** THE PUBLISHED SET at THIS instant — `composePublishedSet(...)` (§3). It keeps its landed NAME, because
   *  `docs/L2/mcp-surface/interface.md` §10 cites this site and a rename would strand that citation (D-41). */
  allowedToolNames(): string[]

  /** THE RE-REGISTRATION ACT (`design.md` §5; L2 §12). One pass over the delta: the names the map LACKS are registered and captured, and every captured `module:`-prefixed name the registry no longer holds is REMOVED from the SDK registry and from the map.
   *  `added` is what the MAP GAINED — read before and after the pass, never the candidate list, so a name no registration arm can answer is not reported as added (`design.md` §5, `F-1`); `withdrawn` is what the registry no longer holds.
   *  A group-off name is NEVER withdrawn here: it stays captured and is toggled by the re-gate, the landed mechanism (`G-4`). */
  syncPublishedTools(): { readonly added: readonly string[]; readonly withdrawn: readonly string[] }

  /** THE CAPTURED HANDLES' keys — the map's own reading, and `registeredEnabled`'s `false` beside it is what makes
   *  a withdrawn name distinguishable from a group-disabled one (`design.md` §2, §9 `MS-2`). It is NOT called
   *  `registeredToolNames`, because that name is the landed FREE function's (`registeredToolNames(gate, allNames)`)
   *  and one spelling for two facts is the drift D-41 refuses. */
  capturedToolNames(): string[]
}
```

## 5. The two option members, the two new `registerTools` parameters, and the call sites

```ts
export interface McpServerOptions {
  backend: McpBackend
  transport: McpTransportKind
  port?: number
  gate?: SecurityGate
  moduleStore?: ModuleStore
  router?: CapabilityRouter
  dataSurface?: DataSurface
  /** THE DYNAMIC HALF'S SOURCE (`design.md` §3, §10 `ASM-1`). DEFAULT: the router's own names, wrapped as one
   *  unnamed activation — the SAME registry, so no two sets can disagree while the default stands. NOT a
   *  `CapabilityRouter`: the port answers NAMES and the router answers CALLS, and the two stay two members. */
  readonly activations?: ActivationSource
  /** THE ONE AUTHORITY'S READER — the injection seam (`design.md` §6, §10 `ASM-3`; L2 §11; L1 §4 `C-11`).
   *  DEFAULT: the imported `appVersion()` from `src/shared/module-contract.ts` (`docs/L2/module-system/
   *  interface.md` §8), held as the private field `versionReader` so the option's spelling and the accessor's
   *  never read alike at a call site. This file spells no number. */
  readonly appVersion?: () => string
}
```

```ts
// THE CALL SITES, AND NOT ONE BODY (design.md §5, §6). Each line is where a stub above is reached. THE TWO READERS
// the registration loop closes over, bound ONCE at the construction — the landed `liveGate: () => SecurityGate`
// shape, so no handler ever holds a frozen server (design.md §5, §2 `G-6`).
const rePublish = (): void => { this.syncPublishedTools() }
const liveRouter = (): CapabilityRouter | null => this.router
// (1) CONSTRUCTION — the landed call, two arguments wider: the callback an activation calls, and the reader.
ProvidentMcpServer.registerTools(server, this.backend, this.allowedToolNames(), this.registered,
  this.moduleStore, this.router, this.dataSurface, liveGate, rePublish, liveRouter)
// (2) THE REGISTRY AXIS, inside the install/update handler, AFTER the re-sync that already runs there.
if (landed === 'installed' || landed === 'updated') { syncModuleRouter(router, moduleStore); rePublish() }
// (3) THE GROUP AXIS — the re-gate's widen arm becomes the SAME act, so the two axes cannot describe two sets.
this.syncPublishedTools()
// (4) THE VERSION — one site, both transports, one private field, no second spelling of the number.
new McpServer({ name: 'provident-electron', version: this.versionReader() })
// (5) THE PREDICATE — the construction arm's one spelling; `registeredToolNames` delegates to it, and the re-gate's
// TOGGLE and the INVOCATION's pair are NOT routed through it (design.md §4, G-8).
registeredToolNames(gate, ProvidentMcpServer.ALL_TOOLS)   // → registrationAllowed(name, gate.enabled)
// (6) THE DYNAMIC ARM registers the COMPOSED names and not the router's own listing, so a composition with no
// router still PUBLISHES; the free function then refuses a CALL by name rather than the listing by silence —
// the null arm is `invokeTool: no module router configured`, the instance method's landed words (design.md §5).
invokeModuleTool(liveRouter(), liveGate(), tool, args)
```

## 6. What L4 must NOT type, said here rather than found in review

- **`ToolGroup` is not widened and `TOOL_GROUPS` gains no row**: a composed `module:<n>.<t>` name resolves by PREFIX and needs none, and the group domain becoming registered data is `S-8`'s, a later sub-unit (L2 §10; L1 §3 `S-8`; `design.md` §4).
- **No `any`, no `unknown` cast and no duck-typed second source**: the port, the predicate and the accessor are the three seams, and a `typeof x.activations === 'function'` probe would be a second spelling of the first (D-43's rule applied to a signature; `design.md` §10 `ASM-1`).
- **No body on this page and no literal in it**: the number lives behind the accessor, the names live behind `ALL_TOOLS` and the registry, and the ids the batteries cite are file-scoped (`design.md` §9, §11; D-41).

## 7. What stands beside this page: the `D-45` comparison, and its one direction

```ts
// tests/unit/mcp-surface/signatures.test.ts — ONE row, and the contract it holds:
//   every `export const`/`export function`/`export interface`/`export type` name declared in THIS document's
//   fenced blocks must be EXPORTED by the file its section names (`security.ts` for §1, `mcp-server.ts` for
//   §2-§5) — a subset check, one direction, red on arrival because `S-5`'s names are not in `src/**` yet.
// WHY ONE DIRECTION: a DELTA block that claimed equality would red on the module's hundred OTHER exports,
// so the whole-set block stays owed to the landing pass (design.md §11, D-45).
```

```boundary-declared
{"unit":"modularity","layer":"L3","module":"mcp-surface","writes":[{"path":"docs/L3/mcp-surface/signatures.md","why":"this page, rev 2 — rev 1's stubs with three findings closed and no claim moved, now fitted to the 150-line ceiling with every declaration, refusal and citation kept and only prose, comment wrapping and blank lines compressed: the dynamic arm's `liveRouter` reader and the two new `registerTools` parameters (§4, §5), the registration predicate's malformed-`enabled` totality cited to the design's own `ASM-4` (§1), the injected reader distinguished from the authority accessor at the call site (§5), and the `D-45` comparison named beside the block, whose completeness debt stays stated (§7)","d":"D-45"}]}
```
