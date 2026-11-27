// tests/integration/settings-carrier-retirement/valid-groups.test.ts — `M-9`, the row `S-9` files: the instance's group
// domain is the REGISTRY'S READING, asked at the WRITES and never at the read. UNMARKED and GATING (D-40): three real
// `it()`s, none skipped, none softened. The subject is the real `createOperatorSettings` over a real profile directory
// this battery seeds itself — never a double.
//
// WHAT THE ORDER FORCED (`AN-30`'s fix (a), `docs/L3/operator-settings/valid-groups.md` §2): the instance is constructed
// before the declaration registry stands (`main.ts`), so the domain is a THUNK and the construction's own read carries
// the stored list rather than filtering it. The rows below are that split read at both ends: a stored name outside the
// domain SURVIVES the boot, and the two write-side admissions are the ones that answer by the set.
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { createOperatorSettings } from '../../../src/main/operator-settings'

const dirs: string[] = []
const profile = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'provident-valid-groups-'))
  dirs.push(dir)
  return dir
}
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

describe('operator-settings · the group domain is the registry\'s reading (`S-9`)', () => {
  it('M-9(a) · THE READ CARRIES WHAT THE STORE HOLDS, even a name the domain no longer admits — the boot filters nothing', () => {
    const dir = profile()
    // THE FIRST BOOT DECLARES A MODULE GROUP AND THE OPERATOR GRANTS IT — the name the old literal never held.
    const first = createOperatorSettings({ userDataDir: dir, groups: () => ['read', 'dispatch', 'reporting'] })
    first.write({ enabled: ['read', 'reporting'] })
    expect(first.read().enabled, 'the patch admits a name its own domain holds').toEqual(['read', 'reporting'])

    // THE SECOND BOOT HAS NO `reporting` IN ITS DOMAIN — the module is uninstalled — and the READ still carries it:
    // a boot that filtered the list would silently drop the grant `AN-30`'s fix (a) exists to keep.
    const second = createOperatorSettings({ userDataDir: dir, groups: () => ['read', 'dispatch'] })
    expect(second.read().enabled, 'the read reports the store, and the domain is the WRITES\' (`AN-30` fix (a))').toEqual(['read', 'reporting'])
  })

  it('M-9(b) · THE PATCH FILTERS BY THE DOMAIN IT IS HANDED — and the row that proves the literal is gone is a module group the foundation\'s six never held', () => {
    const declaring = createOperatorSettings({ userDataDir: profile(), groups: () => ['read', 'dispatch', 'reporting'] })
    declaring.write({ enabled: ['read', 'reporting', 'no-such-group'] })
    expect(declaring.read().enabled, 'the set decides, not a six-id literal: `reporting` stands and the unknown name does not').toEqual(['read', 'reporting'])

    const foundationOnly = createOperatorSettings({ userDataDir: profile() })
    foundationOnly.write({ enabled: ['read', 'reporting'] })
    expect(foundationOnly.read().enabled, 'an ABSENT thunk answers the foundation\'s own six (`TOOL_GROUP_IDS`), so `reporting` is dropped there').toEqual(['read'])

    const narrow = createOperatorSettings({ userDataDir: profile(), groups: () => ['read'] })
    narrow.write({ enabled: ['read', 'dispatch'] })
    expect(narrow.read().enabled, 'the same patch, a narrower domain: only what the set holds is written').toEqual(['read'])
  })

  it('M-9(c) · A STORED NAME OUTSIDE THE DEFAULT\'S SIX SURVIVES CONSTRUCTION AND ITS OWN RE-READ — the default is a domain, never a boot-time filter', () => {
    const dir = profile()
    createOperatorSettings({ userDataDir: dir, groups: () => ['read', 'reporting'] }).write({ enabled: ['reporting'] })
    const reopened = createOperatorSettings({ userDataDir: dir })
    expect(reopened.read().enabled, 'the construction\'s read and its repair are shape-only (`storedGroups`), so no grant is lost at boot').toEqual(['reporting'])
    reopened.write({ enabled: ['reporting'] })
    expect(reopened.read().enabled, 'and the next write with the default domain filters it out — the two ends of the split, in one row').toEqual([])
  })
})
