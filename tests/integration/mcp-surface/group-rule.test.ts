// tests/integration/mcp-surface/group-rule.test.ts — `S-8`'s in-process battery for `composedGroupRule`: the membership the
// gate asks, the two refusals, and the namespace default. UNMARKED and GATING (D-40): four real `it()`s, none skipped.
//
// WHAT IT IS NOT: `M-8`'s seeded-profile boot is the e2e row (`tests/e2e/modularity/`, still owed); this file proves the
// RULE the boot hands the gate, in one process, over the registry's own carrier type — no process boundary, no display.
import { describe, expect, it } from 'vitest'

import { SecurityGate, composedGroupRule, foundationGroupRule, moduleToolAllowed, registrationAllowed, toolAllowed } from '../../../src/main/security.js'
import { ProvidentMcpServer, composePublishedSet, registeredToolNames } from '../../../src/main/mcp-server.js'
import { TOOL_GROUP_IDS } from '../../../src/shared/types.js'
import { createRegistry, declarationsOf, type DeclarationCarrier } from '../../../src/shared/registry/index.js'

const carrier = (name: string, capabilities: DeclarationCarrier['capabilities']): DeclarationCarrier => ({ name, capabilities })

/** A composed rule over one declaring module and the foundation's own set plus `reporting`. */
const composed = (carriers: readonly DeclarationCarrier[]) =>
  composedGroupRule(foundationGroupRule, [...TOOL_GROUP_IDS, 'reporting'], carriers)

describe('mcp-surface · `composedGroupRule` — the membership the gate asks (`S-8`)', () => {
  it('a declared membership resolves the TOOL\'S OWN GROUP, and its set is the one handed in', () => {
    const { rule, refused } = composed([
      carrier('matrix-a', { tools: ['module:matrix.answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['module:matrix.answer'] }] }),
    ])
    expect(refused, 'a lawful declaration is admitted whole').toEqual([])
    expect(rule.groupOf('module:matrix.answer'), 'the declared group wins over the namespace default').toBe('reporting')
    expect(rule.groups(), 'the set is the registry\'s, unchanged and never derived here').toEqual([...TOOL_GROUP_IDS, 'reporting'])
    expect(rule.groupOf('provident.op'), 'the foundation\'s exact rows still resolve').toBe('graph')
    expect(rule.groupOf('module:other.thing'), 'and a tool with no declared group stays in `module`').toBe('module')
  })

  it('the invocation pair, the registration and the patch all read the RULE — a declared group opens its tool', () => {
    const { rule } = composed([
      carrier('matrix-a', { tools: ['module:matrix.answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['module:matrix.answer'] }] }),
    ])
    expect(toolAllowed('module:matrix.answer', ['reporting'], rule), 'its own group stands').toBe(true)
    expect(toolAllowed('module:matrix.answer', ['module'], rule), 'and `module` alone no longer opens a tool declared elsewhere').toBe(false)
    expect(moduleToolAllowed('module:matrix.answer', ['reporting', 'code'], { executable: true, rule }), 'the `code` half stands for an executable tool').toBe(true)
    expect(moduleToolAllowed('module:matrix.answer', ['reporting'], { executable: true, rule }), 'and an executable tool without `code` is refused').toBe(false)
    expect(registrationAllowed('module:matrix.answer', ['reporting'], rule), 'the registration sites read the same answer').toBe(true)
  })

  it('AN OVERSTATEMENT IS REFUSED BY NAME and does not join the membership — the tool stays in `module`', () => {
    const { rule, refused } = composed([
      carrier('matrix-a', { tools: ['module:matrix.answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['module:matrix.answer', 'module:matrix.ghost'] }] }),
    ])
    expect(refused.map((entry) => [entry.reason, entry.subject])).toEqual([['declaration-overstated', 'module:matrix.ghost']])
    expect(rule.groupOf('module:matrix.ghost'), 'the refused member is not admitted, and the accepted one is').toBe('module')
    expect(rule.groupOf('module:matrix.answer')).toBe('reporting')
  })

  it('A MANIFEST NAMES ITS TOOLS BARE and the membership key is the PUBLISHED name — the normalisation the gate depends on', () => {
    const { rule, refused } = composed([
      // the manifest's own spelling: `answer`, not `module:matrix-a.answer` — and the group entry speaks the same way
      carrier('matrix-a', { tools: ['answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['answer'] }] }),
    ])
    expect(refused, 'bare names on both sides are ONE declaration, not an overstatement').toEqual([])
    expect(rule.groupOf('module:matrix-a.answer'), 'so the name the gate asks is the one the membership holds').toBe('reporting')
    expect(rule.groupOf('module:matrix-b.answer'), 'and another module\'s same bare name is NOT in it').toBe('module')
  })

  it('ONE TOOL IN TWO GROUPS IS A DUPLICATE with the TOOL as subject, the first claimant holds it, and a foundation id is SKIPPED here because the registry refuses it', () => {
    const { rule, refused } = composed([
      carrier('matrix-a', { tools: ['module:matrix.answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['module:matrix.answer'] }] }),
      carrier('matrix-b', { tools: ['module:matrix.answer'], groups: [{ id: 'auditing', label: 'auditing', tools: ['module:matrix.answer'] }] }),
      carrier('matrix-c', { tools: [], groups: [{ id: 'read', label: 'claims a foundation id' }] }),
    ])
    expect(refused.map((entry) => [entry.reason, entry.subject])).toEqual([['declaration-duplicate', 'module:matrix.answer']])
    expect(rule.groupOf('module:matrix.answer'), 'the first claimant holds it — a last-wins would move a tool out of its author\'s group').toBe('reporting')
  })
})

describe('`M-8` — the three seeded-profile arms, read in one process (`S-8`; `docs/L3/declaration-registry/design.md` §6 — the registry\u2019s boundary is a function call, so no e2e row)', () => {
  /** The declaration a profile's census would carry: one module declaring a group and the tool in it, both in the
   *  manifest's own BARE spelling. The registry and the rule are the boot's own two constructions, in the boot's order. */
  const carriers = [carrier('matrix-report', { tools: ['answer'], groups: [{ id: 'reporting', label: 'reporting', tools: ['answer'] }] })]
  const registry = createRegistryFor(carriers)
  const composedRule = composedGroupRule(foundationGroupRule, registry.declaredGroups(), carriers)
  const activation = [{ tools: ['module:matrix-report.answer'] }]
  const published = (enabled: readonly string[]): string[] => {
    const gate = new SecurityGate({ token: null, enabled: [...enabled], groups: composedRule.rule })
    return composePublishedSet(registeredToolNames(gate, ProvidentMcpServer.ALL_TOOLS), activation, (name: string) => gate.toolAllowed(name))
  }
  const TOOL = 'module:matrix-report.answer'

  it('ARM (i) — seeded WITHOUT the declared group, the tool is ABSENT from the published set: "defaults OFF" is a reading', () => {
    expect(published(['read', 'dispatch', 'module', 'code']), 'the group is not granted, so the composed name is never published').not.toContain(TOOL)
    expect(published(['read', 'dispatch', 'module', 'code']), 'and the foundation set is unmoved by the module: a `read` tool the same seed grants still stands').toContain('provident.get_rendered_html')
  })

  it('ARM (ii) — seeded WITH it, the name is published and its invocation passes the pair', () => {
    const names = published(['read', 'dispatch', 'module', 'code', 'reporting'])
    expect(names, 'the declared group stands, so the composed name is published').toContain(TOOL)
    const gate = new SecurityGate({ token: null, enabled: ['reporting', 'code'], groups: composedRule.rule })
    expect(moduleToolAllowed(TOOL, gate.enabled, { executable: true, rule: gate.groupRule }), 'and the invocation reads the rule\u2019s own answer').toBe(true)
  })

  it('ARM (iii) — seeded WITH the declared group and WITHOUT `module`: the tool still publishes — the arm a rule that never moved would fail', () => {
    expect(published(['read', 'dispatch', 'reporting', 'code']), 'its group is its own; `module` no longer opens or closes it').toContain(TOOL)
    expect(published(['read', 'dispatch', 'reporting']), 'and without `code` the name still publishes, the executable check being the invocation\u2019s').toContain(TOOL)
  })
})

/** The registry the two constructions above read — `createRegistry` over the foundation's literals and the carriers, the
 *  same call `main.ts` makes (`S-6`). Named locally because this file's subject is the rule, not the registry's queries. */
function createRegistryFor(carriers: readonly DeclarationCarrier[]) {
  return createRegistry(
    { pane: [], zone: [], group: TOOL_GROUP_IDS, tool: [], placeholder: [] },
    carriers.flatMap((entry) => declarationsOf(entry)),
  ).registry
}
