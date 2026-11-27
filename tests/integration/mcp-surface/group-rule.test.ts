// tests/integration/mcp-surface/group-rule.test.ts — `S-8`'s in-process battery for `composedGroupRule`: the membership the
// gate asks, the two refusals, and the namespace default. UNMARKED and GATING (D-40): four real `it()`s, none skipped.
//
// WHAT IT IS NOT: `M-8`'s seeded-profile boot is the e2e row (`tests/e2e/modularity/`, still owed); this file proves the
// RULE the boot hands the gate, in one process, over the registry's own carrier type — no process boundary, no display.
import { describe, expect, it } from 'vitest'

import { composedGroupRule, foundationGroupRule, moduleToolAllowed, registrationAllowed, toolAllowed } from '../../../src/main/security.js'
import { TOOL_GROUP_IDS } from '../../../src/shared/types.js'
import type { DeclarationCarrier } from '../../../src/shared/registry/index.js'

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
