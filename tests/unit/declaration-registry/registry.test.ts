// tests/unit/declaration-registry/registry.test.ts — the UNIT battery for `declaration-registry` / `modularity`: the
// composition's order, a duplicate refused BY NAME with its id as subject and the set NOT halved, the foundation's
// answer equal to its own literal, a domain with no entries answering `[]`, every query equal to its accessor's
// projection, and the one projection both realms use (`declarationsOf`). UNMARKED and GATING (D-40): each row is a
// real `it()`; none is skipped and none is softened. The subject is `src/shared/registry/index.ts`'s five functions and
// nothing else — no store, no paint, no boot.
import { describe, expect, it } from 'vitest'
import {
  createRegistry,
  declarationsOf,
  type Declaration,
  type DeclarationCarrier,
  type FoundationDeclarations,
} from '../../../src/shared/registry/index.js'
import { DECLARED_PANE_IDS, DECLARED_ZONE_IDS } from '../../../src/shared/view-shape.js'
import { TOOL_GROUP_IDS, type ModuleCapabilities } from '../../../src/shared/types.js'

/** THE FOUNDATION'S FIVE LITERALS AS MAIN HANDS THEM (`docs/L3/declaration-registry/design.md` §2), with the tool and
 *  placeholder halves a FIXTURE here: `ALL_TOOLS` is `mcp-server.ts`'s and importing the server into a unit row would
 *  measure the transport, not the registry (`D-41`'s site rule; the integration battery reads the real one). */
const FOUNDATION: FoundationDeclarations = {
  pane: DECLARED_PANE_IDS,
  zone: DECLARED_ZONE_IDS,
  group: TOOL_GROUP_IDS,
  tool: ['provident.dispatch', 'provident.op'],
  placeholder: [],
}

const declaration = (module: string, domain: Declaration['domain'], ids: readonly string[]): Declaration => ({ module, domain, ids })

/** THE FOUR OWED DOMAIN MEMBERS, SPELLED IN THE TEST AND NOT ON THE INTERFACE (`S-8`/`U5`'s edit): `panes`, `zones` and
 *  `placeholders` are declared on `ModuleCapabilities` by their own steps, so a row that needs one states its shape here
 *  and hands it to a `DeclarationCarrier` — the same bridge the registry file carries, in the one place a test may take
 *  it without minting the interface's edit. */
type OwedDomains = {
  readonly panes?: readonly string[]
  readonly zones?: readonly string[]
  readonly placeholders?: readonly string[]
}
const carrier = (name: string, capabilities: ModuleCapabilities & OwedDomains): DeclarationCarrier => ({ name, capabilities })

describe('declaration-registry · the composition, its refusals and its queries', () => {
  it('R-1 · THE ORDER IS THE FOUNDATION FIRST IN ITS LITERAL\'S ORDER, THEN THE DECLARATIONS IN THE ORDER THEY ARE HANDED — and nothing re-sorts', () => {
    const { registry, refused } = createRegistry(FOUNDATION, [
      declaration('matrix-b', 'pane', ['pane-b', 'pane-a2']),
      declaration('matrix-a', 'pane', ['pane-a3']),
    ])
    expect(refused, 'no lawful declaration is refused').toEqual([])
    expect(registry.paneEntries().map((entry) => entry.id), '`D-41` — a foundation seat is never re-seated and no module is sorted').toEqual([
      ...DECLARED_PANE_IDS,
      'pane-b',
      'pane-a2',
      'pane-a3',
    ])
    expect(registry.paneEntries().map((entry) => entry.source), 'the first entries are the foundation\'s').toEqual([
      ...DECLARED_PANE_IDS.map(() => 'foundation'),
      'module',
      'module',
      'module',
    ])
    expect(registry.paneEntries().slice(DECLARED_PANE_IDS.length).map((entry) => entry.origin), 'a module\'s entry names WHO declared it').toEqual([
      'matrix-b',
      'matrix-b',
      'matrix-a',
    ])
  })

  it('R-2 · A DUPLICATE IS A VALUE NAMING ITS ID, THE SET IS NOT HALVED, AND A MODULE CLAIMING A FOUNDATION ID IS THE SAME REFUSAL', () => {
    const foundationId = DECLARED_PANE_IDS[0] as string
    const { registry, refused } = createRegistry(FOUNDATION, [
      declaration('matrix-a', 'pane', ['pane-shared', foundationId]),
      declaration('matrix-b', 'pane', ['pane-shared', 'pane-b']),
    ])
    expect(refused.map((refusal) => [refusal.reason, refusal.subject]), '`ASM-DR-3` — refusal is by name and by subject, never a throw and never an override').toEqual([
      ['declaration-duplicate', foundationId],
      ['declaration-duplicate', 'pane-shared'],
    ])
    expect(registry.declaredPaneIds(), 'a refusal never halves the set: the first claimant holds, the rest stand').toEqual([
      ...DECLARED_PANE_IDS,
      'pane-shared',
      'pane-b',
    ])
    expect(registry.paneEntries().find((entry) => entry.id === 'pane-shared')?.origin, 'the FIRST claimant is the one that holds it').toBe('matrix-a')
  })

  it('R-3 · THE FOUNDATION\'S ANSWER IS ITS LITERAL\'S ANSWER, element for element, with nothing declaring', () => {
    const { registry, refused } = createRegistry(FOUNDATION, [])
    expect(refused).toEqual([])
    expect(registry.declaredPaneIds()).toEqual(DECLARED_PANE_IDS)
    expect(registry.declaredZoneIds()).toEqual(DECLARED_ZONE_IDS)
    expect(registry.declaredGroups()).toEqual(TOOL_GROUP_IDS)
    expect(registry.declaredTools()).toEqual(FOUNDATION.tool)
    expect(registry.declaredPlaceholders()).toEqual([])
    expect(registry.paneEntries().every((entry) => entry.source === 'foundation'), 'a foundation entry carries `source` and NO origin (`C-9`)').toBe(true)
    expect(registry.paneEntries().every((entry) => entry.origin === undefined)).toBe(true)
  })

  it('R-4 · EVERY QUERY IS ITS ACCESSOR\'S PROJECTION, A DOMAIN WITH NO ENTRY ANSWERS `[]`, AND AN UNKNOWN DOMAIN ANSWERS `[]` RATHER THAN THROWING', () => {
    const { registry } = createRegistry(FOUNDATION, [declaration('matrix-a', 'group', ['reporting'])])
    expect(registry.declaredPaneIds()).toEqual(registry.paneEntries().map((entry) => entry.id))
    expect(registry.declaredZoneIds()).toEqual(registry.zoneEntries().map((entry) => entry.id))
    expect(registry.declaredGroups()).toEqual(registry.groupEntries().map((entry) => entry.id))
    expect(registry.declaredTools()).toEqual(registry.toolEntries().map((entry) => entry.id))
    expect(registry.declaredPlaceholders()).toEqual(registry.placeholderEntries().map((entry) => entry.id))
    const empty = createRegistry({ pane: [], zone: [], group: [], tool: [], placeholder: [] }, [])
    for (const domain of ['pane', 'zone', 'group', 'tool', 'placeholder'] as const) {
      expect(empty.registry.entries(domain), `a domain with no entry answers an empty list (\`C-9\`): ${domain}`).toEqual([])
    }
    expect(empty.registry.entries('no-such-domain' as never), '`D-105` — a hostile domain is a VALUE (`[]`), never a throw').toEqual([])
  })

  it('R-5 · `declarationsOf` IS ONE PROJECTION: A PRESENT DOMAIN BECOMES ONE DECLARATION IN THE CARRIER\'S ORDER, AN OMITTED ONE YIELDS NONE, AND A GROUP CONTRIBUTES ITS ID AND NEVER ITS LABEL', () => {
    const both = declarationsOf(carrier('matrix-a', {
      panes: ['pane-a2', 'pane-b2'],
      groups: [{ id: 'reporting', label: 'reporting (the matrix)' }],
      tools: ['answer'],
    }))
    expect(both.map((entry) => entry.domain), 'the domains the carrier states, in the projection\'s fixed order').toEqual(['pane', 'group', 'tool'])
    expect(both[0]?.ids, 'the carrier\'s own order, un-sorted').toEqual(['pane-a2', 'pane-b2'])
    expect(both[1]?.ids, '`C-9` — the id crosses and the label does not').toEqual(['reporting'])
    expect(JSON.stringify(both[1]), 'no label, no geometry, no figure rides a declaration').not.toContain('the matrix')

    const omitted = declarationsOf(carrier('matrix-b', {}))
    expect(omitted, 'an omitted domain yields NO declaration, so "declared nothing" is never read as an empty set').toEqual([])

    const presentEmpty = declarationsOf(carrier('matrix-c', { panes: [] }))
    expect(presentEmpty, 'a member PRESENT as an empty array yields the declaration with no ids — the second reading kept distinct').toEqual([
      { module: 'matrix-c', domain: 'pane', ids: [] },
    ])
    expect(declarationsOf({ name: 'matrix-d', capabilities: null as never }), 'a hostile carrier answers no declaration rather than throwing').toEqual([])
  })

  it('R-6 · THE TWO CONSTRUCTIONS AGREE ON THE SAME FACTS: a foundation input and a carrier set compose the SAME entries in each realm, whatever the realm is called', () => {
    const carriers = [
      carrier('matrix-a', { panes: ['pane-a2'], groups: [{ id: 'reporting', label: 'reporting' }] }),
      carrier('matrix-b', { panes: ['pane-b2'] }),
    ]
    const main = createRegistry(FOUNDATION, carriers.flatMap((carrier) => declarationsOf(carrier)))
    const renderer = createRegistry(FOUNDATION, carriers.flatMap((carrier) => declarationsOf(carrier)))
    expect(renderer.registry.declaredPaneIds(), '`ASM-DR-4` — one fact, two constructions: the SET is the same').toEqual(main.registry.declaredPaneIds())
    expect(renderer.registry.declaredGroups()).toEqual(main.registry.declaredGroups())
    expect(renderer.refused, 'and neither construction refuses what the other admits').toEqual(main.refused)
  })
})
