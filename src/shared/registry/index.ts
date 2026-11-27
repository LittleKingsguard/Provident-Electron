/** **`declaration-registry` — THE FIVE ID DOMAINS AS DATA, COMPOSED ONCE PER REALM, READ BY QUERIES**
 *  (`docs/L3/declaration-registry/design.md` §1–§3; `docs/L2/declaration-registry/interface.md` §3–§4).
 *
 *  THE CONTRACT. One pure `createRegistry(foundation, declarations)` answers `{registry, refused}`: the foundation's
 *  entries first, in its literals' own order, then each declaration's entries in the order it is handed. A duplicate id
 *  is a VALUE naming its subject (`D-105`), never a throw and never an override (`ASM-DR-3`), and a refusal never halves
 *  the set. Every query is its accessor's projection over one derivation, so no consumer re-derives or re-sorts
 *  (`D-129`).
 *
 *  WHAT IT IS NOT. It carries no type of a consumer's — no geometry, no figure, no label (`C-9`) — and it is constructed
 *  once per realm over facts that realm can read, never over a composition another realm delivered (`ASM-DR-4`). It
 *  paints nothing, repairs nothing and answers.
 *
 *  THE PROJECTION. `declarationsOf(carrier)` is the ONE way a realm turns a carrier into declarations, so the two realms
 *  cannot spell one declaration two ways: main's carrier is the activated manifest, the renderer's is the
 *  `ModuleListEntry` row, and both expose the same `capabilities` member (`src/shared/types.ts`).
 *
 *  **THE FOUR OWED DOMAIN MEMBERS ARE READ STRUCTURALLY AND NOT TYPED HERE** (`S-8`/`U5`'s edit, `docs/L3/
 *  declaration-registry/signatures.md` §2): `panes`, `zones`, `placeholders` and `groups` are declared on
 *  `ModuleCapabilities` by their own steps; until each lands, this file reads the member the shape the contract states
 *  without minting the edit — the bridge `AN-21` named, kept explicit rather than hidden behind `any`.
 */

import type { ModuleCapabilities, ModuleGroupDeclaration } from '../types.js'

/** THE FIVE DOMAINS, CLOSED (`C-4`): a sixth is a corpus change, not a data change. */
export type DeclarationDomain = 'pane' | 'zone' | 'group' | 'tool' | 'placeholder'

/** ONE ID, ONE ENTRY (`S-6`): who declared it, and — where a module did — which module. A domain's MEANING is its
 *  consumer's and never rides here (`C-9`). */
export interface DeclarationEntry {
  readonly id: string
  readonly source: 'foundation' | 'module'
  /** The declaring module's name, present exactly where `source` is `'module'`. */
  readonly origin?: string
}

/** A DECLARATION a module makes, as activation hands it over: one domain and its ids, in the module's own order. */
export interface Declaration {
  readonly module: string
  readonly domain: DeclarationDomain
  readonly ids: readonly string[]
}

/** A DUPLICATE IS A VALUE NAMING ITS ID, never a throw and never an override (`ASM-DR-3`, `D-105`). */
export interface DeclarationRefusal {
  readonly status: 'refused'
  readonly reason: 'declaration-duplicate'
  readonly subject: string
}

/** THE FOUNDATION'S FIVE LITERALS, READ AND NEVER DERIVED (`ASM-DR-2`, `C-4`): the registry is handed them at boot so a
 *  gating row can still say FOUNDATION rather than total. */
export interface FoundationDeclarations {
  readonly pane: readonly string[]
  readonly zone: readonly string[]
  readonly group: readonly string[]
  readonly tool: readonly string[]
  readonly placeholder: readonly string[]
}

/** THE FIVE QUERIES AND THEIR ACCESSORS, one pairing per domain (`C-9`'s table, `docs/L2/declaration-registry/
 *  interface.md` §4). Every member is total: a domain with no entry answers `[]`, never `undefined`. */
export interface DeclarationRegistry {
  entries(domain: DeclarationDomain): readonly DeclarationEntry[]

  declaredPaneIds(): readonly string[]
  paneEntries(): readonly DeclarationEntry[]

  declaredZoneIds(): readonly string[]
  zoneEntries(): readonly DeclarationEntry[]

  declaredGroups(): readonly string[]
  groupEntries(): readonly DeclarationEntry[]

  declaredTools(): readonly string[]
  toolEntries(): readonly DeclarationEntry[]

  declaredPlaceholders(): readonly string[]
  placeholderEntries(): readonly DeclarationEntry[]
}

/** What the composition answers: the registry, and the refusals the boot must name. */
export interface RegistryComposition {
  readonly registry: DeclarationRegistry
  readonly refused: readonly DeclarationRefusal[]
}

const DOMAINS: readonly DeclarationDomain[] = ['pane', 'zone', 'group', 'tool', 'placeholder']

const EMPTY_ENTRIES: readonly DeclarationEntry[] = Object.freeze([])

/** THE COMPOSITION (`S-6`): the foundation's entries in the literal's order, then each declaration's in the order it is
 *  handed (`C-11`); a duplicate ID is refused BY NAME and the set keeps what it admitted. */
export function createRegistry(
  foundation: FoundationDeclarations,
  declarations: readonly Declaration[],
): RegistryComposition {
  const composed = new Map<DeclarationDomain, DeclarationEntry[]>()
  const held = new Map<DeclarationDomain, Set<string>>()
  for (const domain of DOMAINS) {
    composed.set(domain, [])
    held.set(domain, new Set<string>())
  }
  const refused: DeclarationRefusal[] = []

  const admit = (domain: DeclarationDomain, entry: DeclarationEntry): boolean => {
    const ids = held.get(domain)
    const list = composed.get(domain)
    if (ids === undefined || list === undefined) return false
    if (ids.has(entry.id)) {
      refused.push({ status: 'refused', reason: 'declaration-duplicate', subject: entry.id })
      return false
    }
    ids.add(entry.id)
    list.push(entry)
    return true
  }

  // THE FOUNDATION FIRST, IN ITS OWN LITERAL'S ORDER — and never a module's entry before it (`ASM-DR-2`).
  const literals: Record<DeclarationDomain, readonly string[]> = {
    pane: foundation.pane,
    zone: foundation.zone,
    group: foundation.group,
    tool: foundation.tool,
    placeholder: foundation.placeholder,
  }
  for (const domain of DOMAINS) {
    for (const id of literals[domain]) {
      if (typeof id !== 'string' || id === '') continue
      admit(domain, { id, source: 'foundation' })
    }
  }

  // THE MODULES, IN THE ORDER THE RESOLVER FIXED — the declaration array is read in sequence and never re-sorted.
  for (const declaration of declarations) {
    if (declaration === null || typeof declaration !== 'object') continue
    if (!DOMAINS.includes(declaration.domain)) continue
    const origin = typeof declaration.module === 'string' ? declaration.module : ''
    for (const id of declaration.ids) {
      if (typeof id !== 'string' || id === '') continue
      admit(declaration.domain, { id, source: 'module', origin })
    }
  }

  // ONE DERIVATION, TWO READINGS (`design.md` §3): the ids are a projection of the entries and are computed once.
  const idLists = new Map<DeclarationDomain, readonly string[]>()
  for (const domain of DOMAINS) {
    const list = composed.get(domain) ?? []
    idLists.set(domain, Object.freeze(list.map((entry) => entry.id)))
  }
  const entriesOf = (domain: DeclarationDomain): readonly DeclarationEntry[] => {
    const list = composed.get(domain)
    return list === undefined ? EMPTY_ENTRIES : Object.freeze([...list])
  }
  const idsOf = (domain: DeclarationDomain): readonly string[] => idLists.get(domain) ?? []

  const registry: DeclarationRegistry = {
    entries: entriesOf,
    declaredPaneIds: () => idsOf('pane'),
    paneEntries: () => entriesOf('pane'),
    declaredZoneIds: () => idsOf('zone'),
    zoneEntries: () => entriesOf('zone'),
    declaredGroups: () => idsOf('group'),
    groupEntries: () => entriesOf('group'),
    declaredTools: () => idsOf('tool'),
    toolEntries: () => entriesOf('tool'),
    declaredPlaceholders: () => idsOf('placeholder'),
    placeholderEntries: () => entriesOf('placeholder'),
  }

  return { registry, refused: Object.freeze(refused) }
}

/** A CARRIER'S DECLARATION SURFACE, AS BOTH REALMS HOLD IT (`ASM-DR-4`, `design.md` §2): main's is the activated manifest,
 *  the renderer's is the `ModuleListEntry` row — the SAME member of the SAME shared type, which is why the two realms
 *  need no second route (`D-18`). */
export interface DeclarationCarrier {
  readonly name: string
  readonly capabilities: ModuleCapabilities
}

/** THE FOUR DOMAIN MEMBERS THIS FILE DOES NOT TYPE YET (`S-8`/`U5`), read structurally so the projection exists before the
 *  interface does. `groups` is typed already (`S-8`'s member), so only the three others are widened here. */
interface DomainCapabilities extends ModuleCapabilities {
  readonly panes?: readonly unknown[]
  readonly zones?: readonly unknown[]
  readonly placeholders?: readonly unknown[]
}

const stringIds = (raw: readonly unknown[]): string[] =>
  raw.filter((value): value is string => typeof value === 'string' && value !== '')

const groupIds = (raw: readonly unknown[]): string[] => {
  const out: string[] = []
  for (const value of raw) {
    if (value === null || typeof value !== 'object') continue
    const id = (value as ModuleGroupDeclaration).id
    if (typeof id === 'string' && id !== '' && !out.includes(id)) out.push(id)
  }
  return out
}

/** ONE PROJECTION, so the two realms cannot spell one declaration two ways (`D-129`): each PRESENT domain becomes one
 *  `Declaration`, ids only, in the carrier's own order. **A domain the carrier OMITS yields NO declaration — never an
 *  empty one — so a consumer cannot read "declared nothing" as "declared an empty set"**; a member present as an empty
 *  array yields the declaration with no ids, which is the second reading kept distinct (`C-9`). A group's LABEL is the
 *  declaration's and never an entry's, so only its `id` crosses here. */
export function declarationsOf(carrier: DeclarationCarrier): readonly Declaration[] {
  const capabilities = carrier.capabilities as DomainCapabilities | null | undefined
  if (capabilities === null || capabilities === undefined || typeof capabilities !== 'object') return []
  const moduleName = typeof carrier.name === 'string' ? carrier.name : ''
  const out: Declaration[] = []

  const read = (domain: DeclarationDomain, raw: unknown, toIds: (list: readonly unknown[]) => string[]): void => {
    if (!Array.isArray(raw)) return
    out.push({ module: moduleName, domain, ids: toIds(raw as readonly unknown[]) })
  }

  read('pane', capabilities.panes, stringIds)
  read('zone', capabilities.zones, stringIds)
  read('group', capabilities.groups, groupIds)
  read('tool', capabilities.tools, stringIds)
  read('placeholder', capabilities.placeholders, stringIds)
  return out
}
