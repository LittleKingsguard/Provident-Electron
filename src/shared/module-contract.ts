// src/shared/module-contract.ts — THE CONTRACT BOTH HALVES AND BOTH HOSTS ARE WRITTEN AGAINST
// (`docs/L3/module-system/design.md` §1–§2, `docs/L3/module-system/signatures.md` §1).
//
// It carries the shapes, the two compositions (`moduleHandle` for a DECLARATION and `toolName` for the
// PUBLISHED tool, never one name doing both) and the build's ONE version accessor — and no other
// behaviour. NOTHING here reaches `window`, IPC, `ipcRenderer`, `webContents` or a bridge route: the
// passthrough is a module's only way out and its door is admission's (`C-1`, `D-304` (i)).
//
// `ModuleCapabilities`/`ModuleDependency` are `src/shared/types.ts`'s and are IMPORTED, never re-spelled
// (`ipc-contract` owns that file); the store's fifteen members are `provident-storeroom`'s and are
// reached by `import type`, so nothing of the package is bundled and no second store is constructed
// (`C-16`, `D-312`).
import type { ModuleCapabilities, ModuleDependency } from './types.js'
import type {
  Address,
  CommitCarrier,
  Constraint,
  ConstraintIdentity,
  ConstraintPair,
  DeleteRecord,
  Handle,
  Listener,
  RollbackRecord,
  Tier,
  TierSet,
  TieredNode,
  WriteRecord,
} from 'provident-storeroom'
/** THE BUILD'S OWN NUMBER — read off the manifest, never re-spelled beside it (`C-11`, `D-44`). */
import build from '../../package.json'

/** Both members optional: `L2` §12's own manifests carry one or the other. */
export interface ModuleRequires {
  readonly modules?: readonly ModuleDependency[]
  readonly app?: string
}

/** CARRIED and judged by nobody until `L1` §3 `S-22`: manifest data, never a ctx member. */
export interface ModuleCoeffects {
  readonly modules?: readonly ModuleDependency[]
  readonly addresses?: readonly (readonly (string | number)[])[]
  readonly panes?: readonly string[]
  readonly groups?: readonly string[]
  readonly placeholders?: readonly string[]
}

/** THE ONE manifest; `src/shared/types.ts` keeps the name by re-export (`OWED-6`). */
export interface ModuleManifest {
  /** No '.' and no ':' — the `module:<name>.<tool>` namespace is injective only under that rule. */
  readonly name: string
  readonly version: string
  readonly requires?: ModuleRequires
  readonly capabilities: ModuleCapabilities
  /** MAIN half: a function-STRING; absent or '' is NO half. */
  readonly entry?: string
  /** CLIENT half: a function-STRING, transport-safe DATA (`C-15`, `D-308`). */
  readonly client?: string
  /** Manifest data only; nothing reads it before `S-22`. */
  readonly coeffects?: ModuleCoeffects
}

/** `C-16`: the instance's fifteen own members, satisfied by both hosts (`D-312`). */
export interface StoreSurface {
  read(address: Address, tier?: TierSet): unknown
  readLiteral(address: Address, tier?: TierSet): unknown
  readTiered(address: Address, tier?: TierSet): TieredNode
  rollback(opId: string): RollbackRecord
  write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord
  delete(address: Address, tier?: Tier): DeleteRecord
  constraints(): ConstraintPair[]
  listen(handle: Handle, addresses: readonly Address[]): Handle
  unlisten(handle: Handle): void
  addConstraint(pair: ConstraintPair, constraint: Constraint): ConstraintIdentity
  constraintOn(pair: ConstraintPair, constraint: Constraint): void
  constraintOff(pair: ConstraintPair, constraint: Constraint): void
  removeConstraint(pair: ConstraintPair): void
  register(handle: Handle, listener: Listener): void
  /** THROWS on every arm that is not a real removal — the inverse's containment exists for THIS verb. */
  removeListener(handle: Handle): void
}

export type DeclarationHandle = string
export type DeliveryHandle = string
export type ContributionHandle = string
/** The FULL published name, `module:<name>.<tool>` — never the declaration mint. */
export type ToolHandle = string

/** Every refusal is a VALUE carrying its SUBJECT; no numeric code stands beside it (`D-105`, `ASM-MS-3`). */
export interface Refusal {
  readonly status: 'refused'
  readonly reason: RefusalName
  readonly subject: string
  readonly message: string
}

export type RefusalName =
  | 'host-api-token'
  | 'declaration-overstated'
  | 'foundation-tool'
  | 'declaration-undeclared'
  | 'entry-malformed'
  | 'entry-threw'
  | 'dependency-cycle'
  | 'dependency-unsatisfied'
  | 'application-version-unsatisfied'
  | 'reentrant-call'
  | 'no-store-host'

export interface ListenerDeclaration {
  readonly address: readonly string[]
  readonly main?: string
  readonly client?: string
}

/** What `declare` takes at RUNTIME — the listener arm of a `capabilities` element. */
export type CapabilityDeclaration = {
  readonly kind: 'listener'
  readonly address: readonly string[]
  readonly main?: string
  readonly client?: string
}

/** EXACTLY four keys (`L2` §3, `ASM-MS-1`): a member present-but-inert is unspellable. */
export interface MainHalfCtx {
  /** Every verb answers a `Refusal` whose reason is `reentrant-call` (`L2` §10, `D-311`). */
  readonly store: StoreSurface
  declare(declaration: CapabilityDeclaration): DeclarationHandle
  tool(tool: string, handler: (args: unknown) => unknown): ToolHandle
  log(line: string, detail?: unknown): void
}

/** EXACTLY five keys (`L2` §3, `ASM-MS-1`). */
export interface ClientHalfCtx {
  /** A verb is an e2e REQUEST the channel executes, so the channel owns the write turn (`D-311`). */
  readonly store: StoreSurface
  onDelivery(listener: string, fn: (data: unknown, address: readonly string[]) => void): DeliveryHandle
  action(name: string, fn: (ctx: never, ...args: unknown[]) => unknown): void
  graph(contribution: GraphContribution): ContributionHandle
  log(line: string, detail?: unknown): void
}

export interface GraphContribution {
  readonly parent: string
  readonly nodes: readonly Readonly<Record<string, unknown>>[]
}

/** ONE loader's two arms, closed (`L2` §2). */
export type ModuleDelivery =
  | { readonly kind: 'source'; readonly source: string }
  | { readonly kind: 'table'; readonly entries: readonly { readonly name: string; readonly source: string }[] }

export interface ModuleSource {
  readonly manifest: ModuleManifest
  readonly origin: 'source' | 'table'
}

export interface ModuleVerdict {
  readonly status: 'installed' | 'updated' | 'no-op' | 'rejected'
  readonly name: string
  readonly version: string
  readonly reason?: string
}

export interface DeactivationVerdict {
  readonly status: 'deactivated' | 'no-op' | 'rejected'
  readonly name: string
  readonly reason?: string
}

/** `{module, client}` — the payload is the manifest's own STRING (`C-15`, `D-308`). */
export interface RegistrationFrame {
  readonly module: string
  readonly client: string
}

export interface ListenerBinding {
  readonly address: readonly string[]
  readonly handle: string
  readonly main?: (address: readonly string[]) => unknown
}

export interface Activation {
  readonly name: string
  readonly version: string
  readonly tools: readonly string[]
  readonly listeners: readonly ListenerBinding[]
}

export interface ModuleHost {
  readonly store: StoreSurface
  /** The ONE number the resolver judges (`C-11`). */
  readonly appVersion: () => string
  readonly sendRegistration: (frame: RegistrationFrame) => void
  readonly log: (line: string, detail?: unknown) => void
}

/** `L2` §11's four doors, and NO fifth (`ASM-MS-4`). */
export interface ModuleExecutor {
  install(delivery: ModuleDelivery): readonly ModuleVerdict[]
  deactivate(name: string): DeactivationVerdict
  activations(): readonly Activation[]
}

/** The DECLARATION's handle, `module:<name>#<key>`, disjoint from constraint ids (`C-3`, `D-310`). */
export function moduleHandle(module: string, key: string): string {
  return `module:${module}#${key}`
}

/** The PUBLISHED tool name, `module:<name>.<tool>` (`L2` §11, `C-3`). */
export function toolName(module: string, tool: string): string {
  return `module:${module}.${tool}`
}

/** The number the BUILD carries, read off its own manifest and never re-spelled (`C-11`, `D-44`). */
export function appVersion(): string {
  return String(build.version ?? '')
}
