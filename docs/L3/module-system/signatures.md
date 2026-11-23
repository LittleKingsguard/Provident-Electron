# L3 — `module-system`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `module-system` · **Unit:** `modularity` · **Rev:** 3 — **REV 3 MOVES NO STUB, AND ITS §4 SAYS WHICH HALF WAS THE DEFECT**: the one `typecheck:tests` diagnostic (`TS2554`, expected 3-4 arguments and got 5) sits on the BATTERY's own local helper — `manifestOf(name, version, entry, extra = {})` as that file declares it, called there with five arguments — and on no declaration below: the row now merges its `requires` into that `extra` slot, the arm every other manifest in that file already uses, so **no name, arity or type on this page moves** (§4). **AND THIS REVISION'S DECLARATION AT THE FOOT CARRIES ITS OWN TWO PATHS AND NOT THREE**: the block below declares this page and the battery, `docs/L3/module-system/design.md` declares itself, and the re-partition of that page's block is nevertheless named here, because one path is declared by the page that WRITES it and a path two pages declare reds `P-7` for both (`D-146`). Rev 2 aligned the stubs with the examiner's findings and re-decided nothing beyond them: `toolName` separated from the declaration mint (F4), every refusal carrying its `subject` (F1), `Registrations` the shape the activation feeds (F8), and the invariant section stating ONE inverse and the REGISTERED passthrough (F2, F13). Derived from `docs/L3/module-system/design.md` rev 2 under `docs/L2/module-system/interface.md` rev 1 (`D-1`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§7, `L2` §1–§12, `L1` §4 `C-3`/`C-10`/`C-11`/`C-12`/`C-15`/`C-16`, `D-312`, and the two measured type homes — `src/shared/types.ts` (`ModuleCapabilities`, `ModuleDependency`) and `node_modules/provident-storeroom/index.d.ts` (`StoreInstance`, fifteen members; `unlisten`'s withdrawal clause; `removeListener`'s throw). **A stub is a DECLARATION and never a body**: every `declare` below is L4's to fill (`D-3`). Read order: §1 the contract → §2 the executor's internals → §3 the realm half → §4 the invariants a reader must not lose

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
export interface ModuleManifest {                     // the ONE manifest; types.ts re-exports this name
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
  constraintOn(pair: ConstraintPair, constraint: Constraint): void
  constraintOff(pair: ConstraintPair, constraint: Constraint): void; removeConstraint(pair: ConstraintPair): void
  register(handle: Handle, listener: Listener): void
  removeListener(handle: Handle): void                // THROWS on every arm that is not a real removal
}
export type DeclarationHandle = string; export type DeliveryHandle = string; export type ContributionHandle = string
export type ToolHandle = string                       // the FULL published name, `module:<name>.<tool>`
export interface Refusal { readonly status: 'refused'; readonly reason: RefusalName; readonly subject: string; readonly message: string }
export type RefusalName =
  | 'host-api-token' | 'declaration-overstated' | 'foundation-tool' | 'declaration-undeclared'
  | 'entry-malformed' | 'entry-threw' | 'dependency-cycle' | 'dependency-unsatisfied'
  | 'application-version-unsatisfied' | 'reentrant-call' | 'no-store-host'    // the last three are L3's: design §2
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
export type ModuleDelivery =                         // ONE loader's two arms, closed (L2 §2)
  | { readonly kind: 'source'; readonly source: string }
  | { readonly kind: 'table'; readonly entries: readonly { readonly name: string; readonly source: string }[] }
export interface ModuleSource { readonly manifest: ModuleManifest; readonly origin: 'source' | 'table' }
export interface ModuleVerdict { readonly status: 'installed' | 'updated' | 'no-op' | 'rejected'; readonly name: string; readonly version: string; readonly reason?: string }
export interface DeactivationVerdict { readonly status: 'deactivated' | 'no-op' | 'rejected'; readonly name: string; readonly reason?: string }
export interface RegistrationFrame { readonly module: string; readonly client: string }
export interface ListenerBinding { readonly address: readonly string[]; readonly handle: string; readonly main?: (address: readonly string[]) => unknown }
export interface Activation { readonly name: string; readonly version: string; readonly tools: readonly string[]; readonly listeners: readonly ListenerBinding[] }
export interface ModuleHost {
  readonly store: StoreSurface
  readonly appVersion: () => string                   // the ONE number the resolver judges (C-11)
  readonly sendRegistration: (frame: RegistrationFrame) => void
  readonly log: (line: string, detail?: unknown) => void
}
export interface ModuleExecutor {                     // L2 §11's four doors, and NO fifth
  install(delivery: ModuleDelivery): readonly ModuleVerdict[]
  deactivate(name: string): DeactivationVerdict
  activations(): readonly Activation[]
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
// handles.ts — `addressKey`/`listenerHandle` compose `moduleHandle`; `toolName` composes the PUBLISHED name and
// never the declaration mint (L2 §4 vs §11)
export declare function addressKey(address: readonly string[]): string
export declare function listenerHandle(module: string, address: readonly string[]): string
// admission.ts — the three refusals as VALUES with their SUBJECTS, and the two-direction comparison
export type Admission = { readonly ok: true } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export interface Registrations {                     // what the entry did at activation, for `compare`
  readonly tools: ReadonlySet<string>                // the FULL `module:<n>.<t>` names; `compare` strips the prefix
  readonly mains: ReadonlyMap<string, ((address: readonly string[]) => unknown) | null>   // addressKey -> main
  readonly handlers: ReadonlyMap<string, (args: unknown) => unknown>
  readonly refusal: Refusal | null
}
export declare function admitSource(module: LoadedModule): Admission                                    // host-api-token
export declare function admitDeclaration(module: LoadedModule, foundationTools: ReadonlySet<string>): Admission  // foundation-tool
export declare function compare(capabilities: ModuleCapabilities, registered: Registrations): Refusal | null      // BOTH directions
// activation.ts — compile, run, register, frame; the inverse lives here too
export interface ActiveRecord { readonly name: string; readonly version: string; readonly manifest: ModuleManifest; readonly tools: readonly string[]; readonly listeners: readonly ListenerBinding[] }
export type ActivationOutcome = { readonly ok: true; readonly record: ActiveRecord } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export declare function activate(module: LoadedModule): ActivationOutcome
export declare function withdraw(record: ActiveRecord, store: StoreSurface): readonly string[]        // the failures, contained
// resolver.ts — ranges, the cycle, the application floor, and the ORDER
export interface Candidate { readonly name: string; readonly version: string; readonly requires?: ModuleRequires }
export type Resolution = { readonly ok: true; readonly order: readonly string[] } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }
export declare function resolve(candidates: readonly Candidate[], appVersion: string): Resolution
export declare function satisfies(version: string, range: string): boolean       // an unparsable range = FALSE
```

## 3. `src/renderer/extensions.ts` — the realm half (`S-2b`), replacing `ModuleCtx` whole

```ts
export interface ClientHalfDeps {
  readonly store?: StoreSurface                       // absent → the named refusal 'no-store-host'
  readonly log?: (line: string, detail?: unknown) => void
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
  fire(handle: DeliveryHandle, data: unknown, address: readonly string[]): DeliveryOutcome   // contained per handle
  withdraw(module: string): boolean                  // the realm's inverse of one registration frame
}
```

## 4. The invariants a stub reader must not lose

- **`declare` is the runtime registration of a listener's MAIN half; a tool declares itself by `tool()`** — `compare` reads `tools` and `mains` against `capabilities` in both directions, and a manifest declaration with no `main` is the PASSTHROUGH arm: lawful, and still ONE REGISTERED store entry under its handle (`L2` §4, `C-12`, `D-307`).
- **One declaration is ONE handle and ONE store entry, and the inverse runs BOTH of that entry's own verbs** — `removeListener` (the body, the addon's THROWING arm) then `unlisten` (the watch, a declared no-op success outside the domain), in reverse of registration and each inside its own `catch`; a teardown that runs twice is `no-op` before any store call, and one the store refuses is `rejected` naming the handle, with the record STANDING so the inverse stays retryable (`L2` §6, `D-105`).
- **A STUB HERE IS A DECLARATION, AND THE BATTERY IS NEVER A CONTRACT AGAINST IT** — a row's own local helpers (`manifestOf`, `fromSource`, `install`, …) belong to `tests/unit/module-system/executor.test.ts` and to nothing on this page: an argument list there that does not match that helper is the ROW's defect, corrected in the row with its subject, its assertions and its line count unmoved; only a stub whose MEMBER, name, arity or type the design fixes wrongly makes the *stub* the defect, and then the stub is re-grained here and the row left alone (rev 3, `D-306`).

```boundary-declared
{"unit":"modularity","layer":"L3","module":"module-system","writes":[{"path":"docs/L3/module-system/signatures.md","why":"this page, rev 3 — rev 2's stubs kept whole and NOT re-grained, because the pass's one `typecheck:tests` diagnostic named the battery's own `manifestOf` helper rather than a declaration here; rev 3 adds the invariant that says which half a stub is and which half a row is, so the next such diagnostic is read before a declaration is moved (§4); and this pass's other write — the re-partition of `docs/L3/module-system/design.md`'s `boundary-declared` block — is declared by that PAGE's own block and never here, because one path is declared by the page that writes it and a path two pages declare reds `P-7` for both (`D-146`)","d":"D-306"},{"path":"tests/unit/module-system/executor.test.ts","why":"the arity defect the instrument named, fixed in the row and only in the row: the cycle-building table entry merged its `capabilities` and its `requires` into `manifestOf`'s one `extra` slot instead of passing them as two arguments, so the row's subject (two entries whose manifests require each other, refused by name, neither left active), its eight rows and its 246 lines are unmoved","d":"D-306"}]}
```
