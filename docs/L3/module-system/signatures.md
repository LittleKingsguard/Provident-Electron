# L3 — `module-system`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `module-system` · **Unit:** `modularity` · **Rev:** 4 — **REV 4 ADDS THE DOOR'S STUBS AND MOVES NO OTHER DECLARATION**: `docs/L2/module-system/interface.md` rev 3 declares `invoke(toolName, args)` the executor's FIFTH member (§11, `ASM-MS-4`), so §1's `ModuleExecutor` gains `invoke(toolName: string, args: unknown): unknown` and its docblock now names that member `L2` §11's FIFTH, the door; `RefusalName` gains the door's two names, `InvocationRefusal` states them as the door's TWO answer shapes (each a VALUE naming its subject — `tool-unknown` for a name that does not stand, `handler-threw` for a body that threw), and `ModuleHost`'s docblock says *four members and NO fifth*, which is the rejection `ASM-MS-4` files; §2's `ActiveRecord` gains the `handlers` map the door reads, which is exactly why the PUBLIC `Activation` never carries a tool handler (§4); and §4 gains the door's invariant, which NAMES the two `src/` docblocks that still read *"no fifth"* as L4's edit and writes no `src/**` byte here. **REV 3 MOVED NO STUB**, its §4 saying which half was the defect (a battery helper's arity, and no declaration below); rev 2 aligned the stubs with the examiner's findings and re-decided nothing beyond them: `toolName` separated from the declaration mint (F4), every refusal carrying its `subject` (F1), `Registrations` the shape the activation feeds (F8), and the invariant section stating ONE inverse and the REGISTERED passthrough (F2, F13). Derived from `docs/L3/module-system/design.md` rev 4 under `docs/L2/module-system/interface.md` rev 3 (`D-1`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§8, `L2` §1–§14, `L1` §3 `S-5`, §4 `C-3`/`C-10`/`C-11`/`C-12`/`C-15`/`C-16`, `D-312`, and the three measured type homes — `src/shared/types.ts` (`ModuleCapabilities`, `ModuleDependency`), `node_modules/provident-storeroom/index.d.ts` (`StoreInstance`, fifteen members; `unlisten`'s withdrawal clause; `removeListener`'s throw) and `src/main/modules/admission.ts` (`Registrations`, whose `handlers` the door reads at the turn). **A stub is a DECLARATION and never a body**: every `declare` below is L4's to fill (`D-3`). Read order: §1 the contract → §2 the executor's internals → §3 the realm half → §4 the invariants a reader must not lose

## 1. `src/shared/module-contract.ts` — the contract's declared surface

```ts
import type { ModuleCapabilities, ModuleDependency } from './types.js'        // IMPORTED, never re-spelled
import type { Address, CommitCarrier, Constraint, ConstraintIdentity, ConstraintPair, DeleteRecord,
               Handle, Listener, RollbackRecord, Tier, TierSet, TieredNode, WriteRecord } from 'provident-storeroom'
export interface ModuleRequires { readonly modules?: readonly ModuleDependency[]; readonly app?: string }  // BOTH optional: L2 §12 carries one or the other
export interface ModuleCoeffects {                    // CARRIED; judged by nobody until L1 §3 S-22
  readonly modules?: readonly ModuleDependency[]; readonly addresses?: readonly (readonly (string | number)[])[]
  readonly panes?: readonly string[]; readonly groups?: readonly string[]; readonly placeholders?: readonly string[]
}
export interface ModuleManifest {                     // the ONE manifest AFTER `ipc-contract`'s retirement; at this head `types.ts` still declares its own (design §1, `OWED-6`)
  readonly name: string; readonly version: string     // `name` carries no '.' and no ':'
  readonly requires?: ModuleRequires
  readonly capabilities: ModuleCapabilities            // types.ts's, with listeners[] (ipc-contract, L2 §4)
  readonly entry?: string                             // MAIN half: a function-STRING; '' or absent = no half
  readonly client?: string                            // CLIENT half: a function-STRING, transport-safe DATA
  readonly coeffects?: ModuleCoeffects
}
export interface StoreSurface {                       // C-16: the instance's fifteen own members, both hosts
  read(address: Address, tier?: TierSet): unknown; readLiteral(address: Address, tier?: TierSet): unknown
  readTiered(address: Address, tier?: TierSet): TieredNode; rollback(opId: string): RollbackRecord
  write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord
  delete(address: Address, tier?: Tier): DeleteRecord; constraints(): ConstraintPair[]
  listen(handle: Handle, addresses: readonly Address[]): Handle; unlisten(handle: Handle): void
  addConstraint(pair: ConstraintPair, constraint: Constraint): ConstraintIdentity
  constraintOn(pair: ConstraintPair, constraint: Constraint): void; constraintOff(pair: ConstraintPair, constraint: Constraint): void
  removeConstraint(pair: ConstraintPair): void; register(handle: Handle, listener: Listener): void
  removeListener(handle: Handle): void                // THROWS on every arm that is not a real removal
}
export type DeclarationHandle = string; export type DeliveryHandle = string; export type ContributionHandle = string
export type ToolHandle = string                       // the FULL published name, `module:<name>.<tool>`
export interface Refusal { readonly status: 'refused'; readonly reason: RefusalName; readonly subject: string; readonly message: string }
export type RefusalName =
  | 'host-api-token' | 'declaration-overstated' | 'foundation-tool' | 'declaration-undeclared'    // L2 §5's admission refusals
  | 'tool-unknown' | 'handler-threw'                  // THE DOOR's two: a name that does not stand, a body that threw (L2 §11)
  | 'dependency-cycle' | 'dependency-unsatisfied' | 'application-version-unsatisfied' | 'reentrant-call'    // L2 §7, §8, §10
  | 'entry-malformed' | 'entry-threw' | 'no-store-host'    // L3 ADDS these three, because L2 names no value for their arms: design §2
export type InvocationRefusal = Refusal & { readonly reason: 'tool-unknown' | 'handler-threw' }   // the door's TWO answers, each naming its subject (`L2` §11)
export interface ListenerDeclaration { readonly address: readonly string[]; readonly main?: string; readonly client?: string }
export type CapabilityDeclaration = { readonly kind: 'listener'; readonly address: readonly string[]; readonly main?: string; readonly client?: string }
export interface MainHalfCtx {                        // EXACTLY four keys
  readonly store: StoreSurface                        // every verb answers Refusal 'reentrant-call'
  declare(declaration: CapabilityDeclaration): DeclarationHandle
  tool(tool: string, handler: (args: unknown) => unknown): ToolHandle
  log(line: string, detail?: unknown): void
}
export interface ClientHalfCtx {                      // EXACTLY five keys
  readonly store: StoreSurface                        // a verb is an e2e REQUEST the channel executes (D-311)
  onDelivery(listener: string, fn: (data: unknown, address: string[]) => void): DeliveryHandle
  action(name: string, fn: (ctx: never, ...args: unknown[]) => unknown): void
  graph(contribution: GraphContribution): ContributionHandle
  log(line: string, detail?: unknown): void
}
export interface GraphContribution { readonly parent: string; readonly nodes: readonly Readonly<Record<string, unknown>>[] }
export type ModuleDelivery = { readonly kind: 'source'; readonly source: string }    // ONE loader's two arms, closed (L2 §2)
  | { readonly kind: 'table'; readonly entries: readonly { readonly name: string; readonly source: string }[] }
export interface ModuleSource { readonly manifest: ModuleManifest; readonly origin: 'source' | 'table' }
export interface ModuleVerdict { readonly status: 'installed' | 'updated' | 'no-op' | 'rejected'; readonly name: string; readonly version: string; readonly reason?: string }
export interface DeactivationVerdict { readonly status: 'deactivated' | 'no-op' | 'rejected'; readonly name: string; readonly reason?: string }
export interface RegistrationFrame { readonly module: string; readonly client: string }
export interface ListenerBinding { readonly address: readonly string[]; readonly handle: string; readonly main?: (address: readonly string[]) => unknown }   // `handle` is the declaration's ONE identity: client-keyed when it names a client half, else address-keyed (§4)
export interface Activation { readonly name: string; readonly version: string; readonly tools: readonly string[]; readonly listeners: readonly ListenerBinding[] }
export interface ModuleHost {                        // FOUR members and NO FIFTH (`L2` §11, `ASM-MS-4`): the door is the executor's
  readonly store: StoreSurface
  readonly appVersion: () => string                   // the ONE number the resolver judges (C-11)
  readonly sendRegistration: (frame: RegistrationFrame) => void; readonly log: (line: string, detail?: unknown) => void
}
export interface ModuleExecutor {                     // what `createModuleExecutor` (below) answers: `install`, `deactivate`, `activations`, and `invoke` — `L2` §11's FIFTH member, THE DOOR
  install(delivery: ModuleDelivery): readonly ModuleVerdict[]
  deactivate(name: string): DeactivationVerdict
  activations(): readonly Activation[]               // the published names and the declarations: NO TOOL HANDLER leaves this answer (§4)
  invoke(toolName: string, args: unknown): unknown    // THE DOOR: the handler's own value VERBATIM, or an `InvocationRefusal`
}
export declare function moduleHandle(module: string, key: string): string    // `module:<n>#<key>`: the DECLARATION
export declare function toolName(module: string, tool: string): string      // `module:<n>.<t>`: the PUBLISHED tool
export declare function appVersion(): string                                 // the build's number
export declare function createModuleExecutor(host: ModuleHost): ModuleExecutor
```

## 2. `src/main/modules/` — the internals `index.ts` composes, and nothing else imports

```ts
// loader.ts — both arms to ONE shape; `text` is what a crossing quotes, never a re-serialisation
export interface LoadedModule extends ModuleSource { readonly text: string }
export declare function loadDelivery(delivery: ModuleDelivery): readonly LoadedModule[]
// handles.ts — `addressKey`/`listenerHandle` compose `moduleHandle`; `toolName` composes the PUBLISHED name, never the mint (L2 §4 vs §11)
export declare function addressKey(address: readonly string[]): string
export declare function listenerHandle(module: string, declaration: { readonly address: readonly string[]; readonly client?: string }): string   // client-keyed when named, else address-keyed — ONE handle per declaration (`C-3`)
// admission.ts — the three refusals as VALUES with their SUBJECTS, and the two-direction comparison
export type Admission = { readonly ok: true } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export interface Registrations {                     // what the entry did at activation, for `compare`
  readonly tools: ReadonlySet<string>                // the FULL `module:<n>.<t>` names; `compare` strips the prefix
  readonly mains: ReadonlyMap<string, ((address: readonly string[]) => unknown) | null>   // addressKey -> main
  readonly handlers: ReadonlyMap<string, (args: unknown) => unknown>      // the map the DOOR reads at the turn (§1)
  readonly refusal: Refusal | null
}
export declare function admitSource(module: LoadedModule): Admission                                    // host-api-token
export declare function admitDeclaration(module: LoadedModule, foundationTools: ReadonlySet<string>): Admission  // foundation-tool
export declare function compare(capabilities: ModuleCapabilities, registered: Registrations): Refusal | null      // BOTH directions
// activation.ts — compile, run, register, frame; the inverse lives here too
export interface ActiveRecord { readonly name: string; readonly version: string; readonly manifest: ModuleManifest; readonly tools: readonly string[]; readonly listeners: readonly ListenerBinding[]; readonly handlers: ReadonlyMap<string, (args: unknown) => unknown> }   // the record `activate` answers: `handlers` is the DOOR's, and `Activation` never carries it (§4)
export type ActivationOutcome = { readonly ok: true; readonly record: ActiveRecord } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export declare function activate(module: LoadedModule, host: ModuleHost): ActivationOutcome   // `host` because §4's body reads `host.store`/`host.log`
export declare function withdraw(record: ActiveRecord, store: StoreSurface): readonly string[]        // the failures, contained
// resolver.ts — ranges, the cycle, the application floor, and the ORDER
export interface Candidate { readonly name: string; readonly version: string; readonly requires?: ModuleRequires }
export type Resolution = { readonly ok: true; readonly order: readonly string[] } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export declare function resolve(candidates: readonly Candidate[], appVersion: string): Resolution
export declare function satisfies(version: string, range: string): boolean       // an unparsable range = FALSE: named and refused, never silently satisfied (`L2` §7 read at a range)
```

## 3. `src/renderer/extensions.ts` — the realm half (`S-2b`), replacing `ModuleCtx` whole

```ts
export interface ClientHalfDeps {                    // absent `store` → the named refusal 'no-store-host'
  readonly store?: StoreSurface; readonly log?: (line: string, detail?: unknown) => void
}
export interface ClientListenerRecord { readonly module: string; readonly listener: string; readonly handle: DeliveryHandle }
export interface ActionRecord { readonly module: string; readonly name: string }
export interface ContributionRecord { readonly module: string; readonly contribution: GraphContribution }
export type DeliveryOutcome = { readonly status: 'delivered' | 'refused'; readonly handle: DeliveryHandle; readonly reason?: string }
export declare class CapabilityRouter {
  constructor(deps?: ClientHalfDeps)                  // zero-arg stays lawful: L2 §12's I-2 constructs it so
  registerModule(module: string, entry: string | ((ctx: ClientHalfCtx) => void)): void    // STRING = the crossing
  modules(): readonly string[]
  listeners(): readonly ClientListenerRecord[]
  actions(): readonly ActionRecord[]
  contributions(): readonly ContributionRecord[]
  fire(handle: DeliveryHandle, entry: ChannelEntry): DeliveryOutcome   // contained per handle; `ChannelEntry` is `src/shared/module-channels.ts`'s (`ASM-MC-6`)
  withdraw(module: string): boolean                  // the realm's inverse of one registration frame
}
```

## 4. The invariants a stub reader must not lose

- **`declare` is the runtime registration of a listener's MAIN half; a tool declares itself by `tool()`** — `compare` reads `tools` and `mains` against `capabilities` in both directions, and a manifest declaration with no `main` is the PASSTHROUGH arm: lawful, and still ONE REGISTERED store entry under its handle (`L2` §4, `C-12`, `D-307`).
- **One declaration is ONE handle and ONE store entry, and the inverse runs BOTH of that entry's own verbs** — `removeListener` (the body, the addon's THROWING arm) then `unlisten` (the watch, a declared no-op success outside the domain), in reverse of registration and each inside its own `catch`; a teardown that runs twice is `no-op` before any store call, and one the store refuses is `rejected` naming the handle, with the record STANDING so the inverse stays retryable (`L2` §6, `D-105`).
- **THE DOOR'S STUB IS `invoke`, AND ITS TWO ANSWER SHAPES ARE VALUES THAT NAME THEIR SUBJECT** — `InvocationRefusal` narrows `reason` to `tool-unknown` and `handler-threw`, its `subject` the requested `module:<name>.<tool>` name and, on the second arm, its `message` the throw's own sentence; the handler's OWN answer crosses VERBATIM, so no wrapper, no envelope and no schema rides beside `args`, and a name no STANDING record publishes is REFUSED rather than answered `undefined` (`L2` §11, `D-105`, ASM-MS-3). **AND THE TWO `src/` DOCBLOCKS THAT STILL SAY OTHERWISE ARE L4'S EDIT AND NO WRITE OF THIS PAGE'S**: `src/shared/module-contract.ts`'s `ModuleExecutor` docblock reads *"`L2` §11's four doors, and NO fifth (`ASM-MS-4`)"* and `src/main/modules/index.ts`'s header reads *"this file adds NO fifth host member and NO `invoke` (`L2` §11)"* — this page declares the five-member stub, that pass makes the files answer it, and no `src/**` byte is declared here (`D-3`, `L2` §11).
- **A STUB HERE IS A DECLARATION, AND THE BATTERY IS NEVER A CONTRACT AGAINST IT** — a row's own local helpers (`manifestOf`, `fromSource`, `install`, …) belong to `tests/unit/module-system/executor.test.ts` and to nothing on this page: an argument list there that does not match that helper is the ROW's defect, corrected in the row with its subject, its assertions and its line count unmoved; only a stub whose MEMBER, name, arity or type the design fixes wrongly makes the *stub* the defect, and then the stub is re-grained here and the row left alone (rev 3, `D-306`).

```boundary-declared
{"unit":"modularity","layer":"L3","module":"module-system","writes":[{"path":"docs/L3/module-system/signatures.md","why":"this page, rev 4 — the DOOR'S STUBS ADDED and no other declaration moved: `ModuleExecutor` gains its fifth member `invoke(toolName: string, args: unknown): unknown` with `activations()`'s comment now stating that NO TOOL HANDLER leaves that answer, `ModuleHost`'s docblock saying FOUR members and NO FIFTH (the shape `ASM-MS-4` rejects), `RefusalName` gaining the door's two names, `InvocationRefusal` stating the two answer shapes as VALUES that name their subject, `Registrations.handlers` and `ActiveRecord.handlers` naming the map the door reads at the turn, and §4's door invariant naming the two `src/` docblocks that still read \"no fifth\" — `src/shared/module-contract.ts`'s `ModuleExecutor` docblock and `src/main/modules/index.ts`'s header — as L4's edit. NO `src/**` byte and NO test file is this pass's: the unit battery's door row (`MS-9`, `design.md` §8) is the test writer's, and `docs/L3/module-system/design.md` rev 4 is declared by THAT page's own block and never here, because one path is declared by the page that WRITES it and a path two pages declare reds `P-7` for both (`D-146`, `D-3`).","d":"D-105"}]}
```
