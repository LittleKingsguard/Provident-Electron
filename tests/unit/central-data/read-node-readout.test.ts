// tests/unit/central-data/read-node-readout.test.ts — the read's per-node readout, at the unit grain.
//
// THREE ROWS, AND NOT ONE REPEATS A ROW THAT ALREADY GATES (D-9, D-40). The leaf/array/object node shapes
// (`tests/e2e/tier-readout/` `T-1`), the shadowed `_tier` name (`T-7`), one address answered at three tiers
// (`tests/integration/central-data/declared-root.test.ts` `D-7`), the tier argument's pass-through (`D-7`,
// `bridge-route.test.ts` `BR-1`) and the arms that gain nothing (`T-3`) are all measured at a process
// boundary, so a row here would be a second reading of one claim and no evidence. What NO gating row drives
// is the DERIVATION and the TWO EMPTY-ADDRESS ARMS, and those are this file's:
//
//   R-1 · the OBJECT node whose own member is named `value` — the one shape a key-count discriminator
//         misreads as a leaf, which is why `kind` is compiled from the node's KIND (`interface.md` §2a).
//   R-2 · an OPEN register that holds no row answers the STORE's own register node — `{_tier}` alone, one
//         token and never `{}` — so the node is not a shape this module composed (§1, §2a).
//   R-3 · the COLD arm, the same address under a name that does not stand, answers `absent` at `[]` and
//         mints no tier at all: no store answered, so there is no node to compile a readout from (§2a).
//
// EACH ROW IS RED AT THIS HEAD FOR THE ABSENCE IT NAMES (D-133, D-134), AND EACH ROW CARRIES ITS OWN RED:
// today `read` answers a BARE value with no `_tier` anywhere (R-1), it answers `kind:'branch'` with
// `value:{}` at the occupied empty address (R-2), and it answers the cold empty address as a `read` BRANCH
// carrying `{}` rather than an absence (R-3). No row is skipped, softened or conditionally disabled — they
// are authored after D-30's sweep and carry no marker, so they GATE (D-40) — and no row imports a private
// file: `src/main/data/index.ts` is the subject and the seam's own construction is the instance, never a
// stub (`signatures.md` §1; D-14, D-80).

import { rmSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'

import { makeProfileDir, profileFilePath, removeProfileDir, surfaceAt } from './support/temp-profile'

const created: string[] = []

function newProfileDir(): string {
  const profileDir = makeProfileDir()
  created.push(profileDir)
  return profileDir
}

afterEach(() => {
  for (const profileDir of created.splice(0)) removeProfileDir(profileDir)
})

describe("the read's readout is a total function of node kind", () => {
  it('R-1 · an OBJECT node whose own member is named `value` answers `branch` with that member INLINE, and the leaf beneath it answers `row` — `kind` follows the NODE’s kind and never a key count (`interface.md` §2a; ASM-L3-U4; D-134)', () => {
    const surface = surfaceAt(newProfileDir())
    // A caller's own member named `value` is ORDINARY DATA (D-134): the store admits it and the verb delivers
    // it untouched, one level down from the answer's own two names. So the collision is deliberate here — an
    // object node arrives as `{_tier, value:{_tier, value:'x'}}`, two own keys with `value` among them and
    // `value` a NODE, and only the key's own SHAPE tells it apart from a leaf.
    expect(surface.write({ path: ['value-named'], value: { value: 'x' } })).toMatchObject({
      status: 'committed',
      path: ['value-named'],
    })
    expect(
      surface.read({ path: ['value-named'] }),
      'the object node: its member is INLINE and is a node, so the answer is a branch and `value` is not wrapped',
    ).toEqual({
      status: 'read',
      kind: 'branch',
      path: ['value-named'],
      value: { _tier: 'file', value: { _tier: 'file', value: 'x' } },
    })
  })

  it('R-2 · an open register holding nothing answers the store’s OWN register node — `{_tier}` alone, one of the three tokens and never a set — and not a `{}` this module composed (`interface.md` §1, §2a; D-80, D-134)', () => {
    const surface = surfaceAt(newProfileDir()) // the boot's construction: `occupied` over an EMPTY register (D-80)
    const register = surface.read({ path: [] })
    expect(register, 'an open register that holds no row is a BRANCH and never an absence (§1)').toMatchObject({
      status: 'read',
      kind: 'branch',
      path: [],
    })
    if (register.status !== 'read') {
      throw new Error(`the empty register must answer a reading; it answered ${JSON.stringify(register)}`)
    }
    const node = register.value as { _tier?: unknown }
    expect(Object.keys(node), "the store's OWN empty register node — `_tier` alone, one token and never `{}`").toEqual(['_tier'])
    expect(['file', 'mem', 'temp'], 'and that token is ONE of the three, never a set (§2a; D-134)').toContain(node._tier)
  })

  it('R-3 · the COLD arm answers `absent` at `[]` and mints no tier: the same empty address under a name that does not stand is an absence, not a `read` branch this module spelled (`interface.md` §2a; ASM-L3-U2; D-80)', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    expect(surface.write({ path: ['alpha'], value: 'x' })).toMatchObject({ status: 'committed', path: ['alpha'] })
    // `behaviour.md` §9 / ASM-L2-7 — the name is REMOVED under the live instance, so the reading answers the
    // cold tier before any store is consulted: there is no node to carry a readout, and this module spells no
    // tier of its own to mint one with (§2a; D-80, D-101).
    rmSync(profileFilePath(profileDir))
    expect(
      surface.read({ path: [] }),
      'the cold arm answers absent at [], never a register node this module composed itself (§2a)',
    ).toEqual({ status: 'absent', path: [] })
  })
})
