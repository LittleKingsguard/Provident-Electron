// src/main/modules/admission.ts — `L2` §5's refusals as VALUES, each carrying its SUBJECT, and the
// two-direction comparison `capabilities` is held to (`C-12`, `D-105`, `ASM-MS-3`).
//
// THREE DOORS AND ONE COMPARISON: `admitSource` reads the delivered TEXT for a host-API token, so a
// module cannot reach `window`, IPC or a bridge route to escape the passthrough (`C-1`, findings 19);
// `admitDeclaration` refuses a declared tool that squats the foundation's own namespace; and `compare`
// reads `capabilities` against what the entry ACTUALLY registered, in BOTH directions — a declaration
// with no registration is `declaration-overstated`, a registration with no declaration is
// `declaration-undeclared`, and a listener declaration with NO `main` half is the passthrough arm:
// lawful, and still ONE registered store entry (`D-307`).
import type { ListenerDeclaration, Refusal, RefusalName } from '../../shared/module-contract.js'
import type { ModuleCapabilities } from '../../shared/types.js'
import { addressKey } from './handles.js'
import type { LoadedModule } from './loader.js'

export type Admission = { readonly ok: true } | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }

/** What the entry did at activation, for `compare`. */
export interface Registrations {
  /** The FULL `module:<name>.<tool>` names; `compare` strips the prefix to judge BARE names. */
  readonly tools: ReadonlySet<string>
  /** addressKey -> the entry's compiled main half, or null where it declared none. */
  readonly mains: ReadonlyMap<string, ((address: readonly string[]) => unknown) | null>
  readonly handlers: ReadonlyMap<string, (args: unknown) => unknown>
  /** The one refusal a registration door itself raised, held until the comparison has had its say. */
  readonly refusal: Refusal | null
}

/** THE FOUNDATION'S OWN NAMESPACE (`L1` §2's `mcp-surface` row): every foundation tool is composed
 *  under this prefix, so the closed `module:` namespace is refused a squatting declaration by NAME.
 *  The set beside it carries any further foundation name a host publishes (`admitDeclaration`'s own
 *  position) — the executor mints none of its own. */
export const FOUNDATION_TOOL_PREFIX = 'provident.'
export const FOUNDATION: ReadonlySet<string> = new Set<string>()

/** The host-API tokens a module's source may not name (`L2` §5's `host-api-token`). Longest first, so
 *  the SUBJECT reported is the token actually found and never its prefix. */
const HOST_API_TOKENS: readonly string[] = ['window.provident', 'ipcRenderer', 'contextBridge', 'ipcMain', 'webContents', 'window']

const MODULE_TOOL_PREFIX = /^module:[^.]*\./

/** A `module:<name>.<tool>` spelling to its BARE tool name, so a manifest's `tools` and the entry's
 *  `tool()` calls are ONE vocabulary (`C-3`, `L2` §4/§11). */
export function bareToolName(name: string): string {
  return MODULE_TOOL_PREFIX.test(name) ? name.replace(MODULE_TOOL_PREFIX, '') : name
}

/** The foundation's own closed namespace: an `ALL_TOOLS` entry, or any `provident.`-prefixed name. */
export function isFoundationTool(name: string, foundationTools: ReadonlySet<string> = FOUNDATION): boolean {
  const bare = bareToolName(name)
  return foundationTools.has(bare) || bare.startsWith(FOUNDATION_TOOL_PREFIX)
}

/** `capabilities.listeners[]` is `ipc-contract`'s member on `ModuleCapabilities` (`L2` §4, `OWED-6`);
 *  the DECLARATION SET is this contract's either way, so the member is read structurally here. */
export function declaredListeners(capabilities: ModuleCapabilities): readonly ListenerDeclaration[] {
  const holder = capabilities as ModuleCapabilities & { readonly listeners?: readonly ListenerDeclaration[] }
  return holder.listeners ?? []
}

/** The declared tool names, BARE. */
export function declaredTools(capabilities: ModuleCapabilities): readonly string[] {
  return (capabilities.tools ?? []).map(bareToolName)
}

/** `host-api-token`: the delivered source names a token that would leave the passthrough. */
export function admitSource(module: LoadedModule): Admission {
  for (const token of HOST_API_TOKENS) {
    if (module.text.includes(token)) return { ok: false, reason: 'host-api-token', subject: token }
  }
  return { ok: true }
}

/** `foundation-tool`: a DECLARATION names a tool the foundation owns. */
export function admitDeclaration(module: LoadedModule, foundationTools: ReadonlySet<string>): Admission {
  for (const tool of declaredTools(module.manifest.capabilities ?? {})) {
    if (isFoundationTool(tool, foundationTools)) return { ok: false, reason: 'foundation-tool', subject: tool }
  }
  return { ok: true }
}

/** `C-12` in BOTH directions, on BARE names, with the refused thing as the SUBJECT. */
export function compare(capabilities: ModuleCapabilities, registered: Registrations): Refusal | null {
  const declared = declaredTools(capabilities ?? {})
  const declaredSet = new Set(declared)
  const registeredSet = new Set([...registered.tools].map(bareToolName))

  for (const tool of declared) {
    if (!registeredSet.has(tool)) return refusal('declaration-overstated', tool)
  }
  for (const tool of registeredSet) {
    if (!declaredSet.has(tool)) return refusal('declaration-undeclared', tool)
  }

  const declaredMains = new Set(
    declaredListeners(capabilities ?? {})
      .filter((declaration) => typeof declaration.main === 'string' && declaration.main !== '')
      .map((declaration) => addressKey(declaration.address)),
  )
  for (const key of declaredMains) {
    if (!registered.mains.get(key)) return refusal('declaration-overstated', key)
  }
  for (const key of registered.mains.keys()) {
    if (!declaredMains.has(key)) return refusal('declaration-undeclared', key)
  }
  return null
}

function refusal(reason: RefusalName, subject: string): Refusal {
  return { status: 'refused', reason, subject, message: `${reason}: ${subject}` }
}
