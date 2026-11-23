# L3 — `mcp-surface`: the signature stubs L4 implements against — the composition, the injected port, the re-registration call, the captured-handles accessor, the door reader, the arm's schema, the version seam and the registration predicate

- **Layer:** L3 · **Module:** `mcp-surface` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 3 · **Date:** 2026-11-23 · **Design:** `docs/L3/mcp-surface/design.md` rev 3 — this page transcribes it and adds no claim it does not make · **Ceiling:** 150 lines (class max), replaced never appended (D-1, D-2) · **Write scope:** `docs/L3/mcp-surface/` (brief §3); `src/**` read-only here (D-3)
- **What this page IS**: the signatures `S-5` writes, with no body of its own anywhere — a signature document that carries a body is a design its implementer cannot own (D-1 §4, `brief.md` §4); every stub cites the `design.md` section that fixes it, so a disagreement is resolved there and never here (D-41). The arrow and the statement sequences §5 shows are CALL SITES at the design page's pseudocode grain, never a declaration's body. **What it is NOT, and the debt is named rather than hidden**: the WHOLE export set of the two files — §7's row compares one direction, so completeness is owed to the landing pass (`D-45`; `design.md` §11).
- **REV 3 RE-POINTS THE ROUTE AND MOVES NO OTHER CLAIM**: `ActivationSource` and the `activations` option are replaced by `ModulePort` and `McpServerOptions.modulePort?` — ONE object answering the names (`activations()`) and the call (`invoke`), so the published set and the callable set are one object's two answers — and §4's three members and §5's call sites are re-grained to it: `liveDoor`, `invokeModuleTool(liveDoor(), liveGate(), tool, args)`, the one delivery to `install`, and the dynamic arm's schema beside its call (§2, §4, §5, §6; `design.md` §2, §3, §5, §10 `ASM-1`). **The pair-check and the arm's declared schema survive both moves**, the schema moving from `{}` to a memberless passthrough (§5; `design.md` §9 `G-12`).

## 1. `src/main/security.ts` — the registration predicate, factored and not re-decided

- **One export is added and nothing else moves**: `registeredToolNames` keeps its signature and delegates to it, so the construction arm's rule has ONE spelling (L2 §10; D-41's site rule). **Its scope is the REGISTRATION sites only** — the re-gate's toggle keeps the landed pair and the invocation keeps `moduleToolAllowed`, and `design.md` §4 says why the asymmetry is the contract's.

```ts
export type ToolGroup = 'read' | 'dispatch' | 'graph' | 'code' | 'module' | 'data'
/** THE REGISTRATION SITES' PREDICATE (`design.md` §4; L2 §10's construction clause): the LANDED rule and nothing new — `module.install`/`module.update` need `module` AND `code`, every other name (a dynamic `module:<n>.<t>` included) registers by its GROUP alone, and an unknown name or a bare `module:` is denied because `groupForTool` answers `null`. TOTAL over `enabled` by THIS design's own rule (`design.md` §10 `ASM-4`): `null`, `undefined` and a non-iterable answer `false` and NEVER throw — `moduleToolAllowed`'s landed fail-closed posture, not `toolAllowed`'s `new Set(...)`. */
export function registrationAllowed(
  name: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
): boolean
```

- **Carried unmoved and named so a reader does not look for a second spelling**: `groupForTool` (an exact `TOOL_GROUPS` row first, then `module:` → `module`, `null` for a bare `module:`), `toolAllowed`, `moduleToolAllowed` (the invocation pair, `executable` defaulting TRUE) and `SecurityGate`'s members (L2 §10; `design.md` §7).

## 2. `src/main/mcp-server.ts` — the port the dynamic half arrives through

- **The port is module-system's executor read at the members this surface uses**, and the two the route re-grains are the names and the call: `activations()`'s entries are already full `module:<name>.<tool>` names, `invoke` is the ONE route to a handler, and `install` is the DELIVERY the two install tools hand their source to (L2 §10; `docs/L2/module-system/interface.md` §11; `design.md` §2). A structural type suffices, so a member that page adds later cannot break this composition.

```ts
/** ONE ELEMENT of the registry's answer. This surface reads `tools` and NO other member (`design.md` §2). */
export interface ActivationLike {
  readonly tools: readonly string[]
}
/** THE DYNAMIC HALF'S TWO ANSWERS, ON ONE OBJECT (`design.md` §2, §3, §10 `ASM-1`; L2 §10): `activations()` is the ACTIVATED TOOL NAMES in the resolver's order with NO group term — the GROUP axis is this surface's `admits`, which is what lets a withdrawal read it unfiltered (`ASM-5`); `invoke` is the door, its answer a handler's own value or the door's own refusal VALUE, `args` travelling by identity; `install` is the ACTIVATION the two install tools hand their source to and answers their answer — one fact per store, never this one's census (`design.md` §5). NO fourth member, and NO default that reads anything else: with no port injected the dynamic half is EMPTY (`design.md` §3's last two bullets). */
export interface ModulePort {
  install(delivery: { readonly kind: 'source'; readonly source: string }): readonly unknown[]
  activations(): readonly ActivationLike[]
  invoke(toolName: string, args: unknown): unknown
}
```

## 3. The composition function — pure, total, and the only place the set is ordered

```ts
/** THE COMPOSITION RULE (`design.md` §3; L2 §10; D-305). It takes the static half ALREADY group-filtered (`registeredToolNames`'s answer, in `ALL_TOOLS`' own order), the registry's half as `ActivationLike[]`, and the GROUP predicate, and answers the published names: the static half first, the dynamic half after it in the registry's order, first occurrence winning, every name once. NOTHING is sorted — a sort re-seats a foundation name whenever a module is activated (D-41) — and no name is re-seated or dropped twice. The dynamic half IS the executor's `module:<n>.<t>` namespace (`docs/L2/module-system/interface.md` §1), so a name outside it is never composed even where `admits` would admit it. TOTAL: an empty static half, an empty activation list or a non-array answer yields a set, never a throw. */
export function composePublishedSet(
  staticNames: readonly string[],
  activations: readonly ActivationLike[],
  admits: (name: string) => boolean,
): string[]
```

- **The predicate passed in is `(name) => gate.toolAllowed(name)`**: `groupForTool` is the ONE reader of the GROUP rule, so a name its group does not admit is ABSENT from the set — never composed and then refused (L2 §10; `design.md` §3).

## 4. `ProvidentMcpServer`'s members this delta adds or widens

- **Transcribed, not exported, and compared by nothing** (`design.md` §11): a `declare class` block carries no `export` line, so `SD-1`'s reader cannot see these three; they are kept to the tree by the landing's review and not by a row (D-45). Each reads the PORT at its own instant and no router (`design.md` §2, §5).

```ts
declare class ProvidentMcpServer {
  /** THE PUBLISHED SET at THIS instant — `composePublishedSet(..., this._modulePort === null ? [] : this._modulePort.activations(), ...)` (§3), whose dynamic half is the port's `activations()` and EMPTY where no port stands. It keeps its landed NAME, because `docs/L2/mcp-surface/interface.md` §10 cites this site and a rename would strand that citation (D-41). */
  allowedToolNames(): string[]

  /** THE RE-REGISTRATION ACT (`design.md` §5; L2 §12). One pass over the delta: the names the map LACKS are registered and captured, and every captured `module:`-prefixed name the port's `activations()` no longer holds is REMOVED from the SDK registry and from the map. `added` is what the MAP GAINED — read before and after the pass, never the candidate list, so a name no registration arm can answer is not reported as added; `withdrawn` is what the port no longer holds, read UNFILTERED by group (`ASM-5`). A group-off name is NEVER withdrawn here — it stays captured and the re-gate toggles it, the landed mechanism (`G-4`). */
  syncPublishedTools(): { readonly added: readonly string[]; readonly withdrawn: readonly string[] }

  /** THE CAPTURED HANDLES' keys — the map's own reading, and `registeredEnabled`'s `false` beside it is what makes a withdrawn name distinguishable from a group-disabled one (`design.md` §9 `MS-2`). It is NOT called `registeredToolNames`, the landed FREE function's spelling — one name for two facts is the drift D-41 refuses. */
  capturedToolNames(): string[]
}
```

## 5. The two option members, the two new `registerTools` parameters, and the call sites

```ts
export interface McpServerOptions {
  // …the landed members unmoved (`backend`, `transport`, `port`, `gate`, `moduleStore`, `dataSurface`)
  /** THE REALM ROUTER THE ROUTE FED — RETAINED here and read by NOTHING in this file from this pass on (`design.md` §2's RETIRE
   *  row): the composition and the door reach the PORT. It retires TOGETHER with `main.ts`'s construction literal and that
   *  file's two `syncModuleRouter` calls, in app-shell's pass — so this module's move reds no other module's typecheck (D-3). */
  router?: CapabilityRouter
  /** THE DYNAMIC HALF'S ONLY SOURCE (`design.md` §2, §3, §10 `ASM-1`): one port answering BOTH the names and the call — NOT a
   *  `CapabilityRouter`, which declares no tool table and mints no `module:` tool name (L2 §10). `install` is the ACTIVATION
   *  the two install tools hand their source to, its verdicts their answer. NO DEFAULT THAT READS ANYTHING ELSE: absent, the
   *  dynamic half is EMPTY. */
  readonly modulePort?: ModulePort
  /** THE ONE AUTHORITY'S READER — the injection seam (`design.md` §6, §10 `ASM-3`; L2 §11; L1 §4 `C-11`). DEFAULT: the imported
   *  `appVersion()` from `src/shared/module-contract.ts` (`docs/L2/module-system/interface.md` §8), held as the private field
   *  `versionReader` so the option's spelling and the accessor's never read alike at a call site. This file spells no number. */
  readonly appVersion?: () => string
}
```

```ts
// THE CALL SITES, AND NOT ONE DECLARATION'S BODY (design.md §5, §6). THE TWO READERS the registration loop closes over, bound ONCE
// at the construction — the landed `liveGate: () => SecurityGate` shape, so no handler holds a frozen server.
const rePublish = (): void => { this.syncPublishedTools() }
const liveDoor = (): ModulePort | null => this._modulePort
// (1) CONSTRUCTION — the landed call, `router` dropped and two arguments wider: the callback the install/update arm calls, and the DOOR reader.
ProvidentMcpServer.registerTools(server, this.backend, this.allowedToolNames(), this.registered,
  this.moduleStore, this.dataSurface, liveGate, rePublish, liveDoor)
// (2) THE DELIVERY AXIS — TWO FACTS ON TWO STORES, in this order (design.md §5; L2 §10): the PERSISTED registry row FIRST through
// the landed helper, which is the census `module.list` and `status().loaded` read, and a `rejected`/`no-op` answer ENDS the arm;
// THEN, where a port stands, the SAME source goes to `install`, which IS the activation, and its verdicts are the answer; then the
// re-publish, in the same act. The executor's registry is its own activation table (`activations()`/`invoke`) and NEVER this census
// — `ModuleHost.store` is the profile store, not it (src/shared/module-contract.ts) — so a delivery is written once to each and
// neither is renamed the other. The retired line here was `syncModuleRouter(router, moduleStore)`, whose target is a tool table the
// realm half does not declare (L2 §10); that function retires whole in app-shell's pass (design.md §2's RETIRE row).
const landed = handleModuleTool(this.moduleStore, name, args) as { status?: string }   // the SAME narrowing the landed arm takes here
if (landed.status === 'rejected' || landed.status === 'no-op') return text(landed)        // nothing moved: the arm ENDS, nothing is activated
const answered = this._modulePort ? this._modulePort.install({kind: 'source', source}) : landed
rePublish(); return text(answered)
// (3) THE GROUP AXIS — the re-gate's widen arm becomes the SAME act for TOOLS, so the two axes cannot describe two sets;
// its RESOURCE half stays where it is, because `ALL_RESOURCES` and the resource widen are not this composition's (§5).
this.syncPublishedTools()
// (4) THE VERSION — one site, both transports, one private field, no second spelling of the number.
new McpServer({ name: 'provident-electron', version: this.versionReader() })
// (5) THE PREDICATE — the construction arm's one spelling; `registeredToolNames` delegates to it, while the re-gate's
// TOGGLE and the INVOCATION's pair are NOT routed through it (design.md §4, G-8).
registeredToolNames(gate, ProvidentMcpServer.ALL_TOOLS)   // → registrationAllowed(name, gate.enabled)
// (6) THE DYNAMIC ARM — its DECLARATION and its CALL move in ONE act (design.md §5, G-12): the schema declares NO member
// and STRIPS nothing (the SDK parses every call against it and hands the handler `parseResult.data`, so `{}` would carry
// an empty object to the door), and the call is the door's, behind this side's pair-check.
server.registerTool(tool, {
  title: tool,
  description: `A dynamic module tool (${tool}) — requires module AND code groups (invocation two-gate).`,
  inputSchema: z.preprocess((carried) => carried ?? {}, z.object({}).passthrough()),
}, guarded(async (args: unknown) => text(invokeModuleTool(liveDoor(), liveGate(), tool, args))))
/** THE INVOCATION'S ONE GATE-THEN-DOOR FUNCTION, its first parameter WIDENED from the router to the door (`design.md` §5, §7; L2 §13
 *  named this null arm for re-grain): a name that is not `module:`-prefixed THROWS; the pair's refusal THROWS the error naming
 *  `module AND code` (the SDK's tool-error ARM, made BEFORE entry); a null door THROWS the null arm's words, RE-GRAINED from `no module router configured` to name the EXECUTOR; otherwise the door's answer — a value OR the door's own refusal — is VERBATIM.
 *  The class's own `invokeTool` accessor carries the SAME two arms over `this._modulePort` and no second spelling (`design.md` §5). */
export function invokeModuleTool(door: ModulePort | null, gate: SecurityGate, toolName: string, args: unknown): unknown
```

## 6. What L4 must NOT type, said here rather than found in review

- **`ToolGroup` is not widened and `TOOL_GROUPS` gains no row**: a composed `module:<n>.<t>` name resolves by PREFIX and needs none, and the group domain becoming registered data is `S-8`'s (L2 §10; L1 §3 `S-8`; `design.md` §4).
- **No `any`, no `unknown` cast and no duck-typed second source**: the port, the predicate and the accessor are the three seams, and a `typeof x.activations === 'function'` probe would be a second spelling of the first — while §5(2)'s `as { status?: string }` is the LANDED arm's own narrowing of `handleModuleTool`'s `unknown` return, carried and not minted (D-43's rule applied to a signature; `design.md` §10 `ASM-1`).
- **The dynamic arm's `inputSchema` is never a NON-passthrough object schema** — not `{}`, and not a membered shape that closes: those strip the caller's own keys before the handler runs, while a `.passthrough()` preserves every key it does not declare, which is why the memberless passthrough (§5) is the declaration and why it is never separated from the call site it serves (the tree's `provident.focus` registration is the membered precedent, `design.md` §5, §9 `G-12`).
- **No body on this page and no literal in it**: the number lives behind the accessor, the names live behind `ALL_TOOLS` and the port, and the ids the batteries cite are file-scoped (`design.md` §9, §11; D-41).

## 7. What stands beside this page: the `D-45` comparison, and its one direction

```ts
// tests/unit/mcp-surface/signatures.test.ts — ONE row, `SD-1`, and the contract it holds: every `export const`/`export function`/
// `export interface`/`export type` name declared in THIS document's fenced blocks must be EXPORTED by the file its section names (`security.ts` for §1, `mcp-server.ts` for §2-§5) — a subset check, one direction, red on arrival: `S-5`'s names are not in `src/**` yet.
// WHY ONE DIRECTION, AND WHAT THE ARM CANNOT SEE: a DELTA block claiming equality would red on the module's hundred OTHER exports; and §4's `declare class` fence begins with no `export`, so its three members are compared by nothing — a residue named here and in design.md §11 too (D-45).
```

```boundary-declared
{"unit":"modularity","layer":"L3","module":"mcp-surface","writes":[{"path":"docs/L3/mcp-surface/signatures.md","why":"this page, rev 3 — the route re-grained at the signature grain on L2 rev 8 §13's list: `ActivationSource` and the `activations` option are replaced by `ModulePort` (the executor's members this surface reads, `install`/`activations`/`invoke`) and `McpServerOptions.modulePort?`, with `router?` retained and read by nothing here so no other module's typecheck reds on this move; §4's three transcribed members read the port at their own instant, no router, and are NAMED as outside the `D-45` row's reader; §5's call sites are re-pointed — `liveDoor`, `invokeModuleTool(door, gate, tool, args)` declared with the door as its first parameter and its null arm re-grained off the router's words, the DELIVERY written as two facts on two stores (the persisted census row through the landed helper first, the activation through `install` second, its verdicts the answer, the re-publish in the same act), the widen arm keeping its resource half, and the dynamic arm's registration carrying the memberless passthrough schema beside the door's call so the declaration and the call site move in ONE act (G-12). No claim is moved that `design.md` rev 3 does not make.","d":"D-105"}]}
```
