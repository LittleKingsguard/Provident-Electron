// tests/integration/store-view-record/composed-domains.test.ts — `M-7`, the row `S-7` files: the pane and zone families
// are total over the COMPOSED set at two instants (`AN-31`'s fix (a); `docs/L2/view-record/composed-domains.md` §1–§2).
// UNMARKED and GATING (D-40): four real `it()`s, none skipped, none softened. The subject is the REAL `createViewRecord`
// over the REAL profile store, in ONE process — no boot, no display, no double of the family.
//
// WHAT THE ORDER FORCED (`AN-31`): the store is created before the declaration registry, so the creation repair writes the
// FOUNDATION's records only; `standMissingFamilies()` is the additive second pass once the composed set is known. The rows
// below are both instants: the creation's three panes/four zones, the second pass's addition, a stated member surviving it,
// and the two admission seats agreeing on the module id only after the thunks grow.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'
import { createProfileStore } from '../../../src/main/storeroom'

import {
  createViewDelivery,
  createViewRecord,
  viewConstraintDeclarations,
  type ViewConstraintDeclaration,
  type ViewDelivery,
  type ViewRecordStore,
} from '../../../src/main/view-record'
import { DECLARED_PANE_IDS, DECLARED_ZONE_IDS, DEFAULT_PANE_ID, DEFAULT_PANE_SIZE } from '../../../src/shared/view-shape'

const dirs: string[] = []
const scratch = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'provident-composed-domains-'))
  dirs.push(dir)
  return join(dir, 'provident-profile.json')
}
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

/** **THE COMPOSED SET, AS THE REGISTRY WOULD ANSWER IT AFTER THE CENSUS — and MUTABLE here on purpose**: the rows grow it
 *  between the two instants, which is what the boot's `main.ts` does when it hands the registry's queries as thunks. */
interface Domain {
  panes: string[]
  zones: string[]
}
interface Boot {
  readonly record: ReturnType<typeof createViewRecord>
  readonly store: ViewRecordStore
  readonly domain: Domain
  readonly delivery: ViewDelivery
}

function boot(path: string): Boot {
  const domain: Domain = { panes: [...DECLARED_PANE_IDS], zones: [...DECLARED_ZONE_IDS] }
  const paneIds = (): readonly string[] => domain.panes
  const zoneIds = (): readonly string[] => domain.zones
  const bound: { current: ViewRecordStore | null } = { current: null }
  const delivery = createViewDelivery(() => undefined)
  const declarations: readonly ViewConstraintDeclaration[] = viewConstraintDeclarations(() => bound.current, paneIds, zoneIds)
  const store = createProfileStore({
    filePath: path,
    constraints: declarations.map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
    listeners: [...delivery.entries],
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current as ViewRecordStore, delivery, paneIds, zoneIds })
  return { record, store: bound.current as ViewRecordStore, domain, delivery }
}

describe('view-record · the composed pane and zone domains at two instants (`S-7`, `AN-31` fix (a))', () => {
  it('M-7(a) · THE CREATION WRITES THE FOUNDATION\'S RECORDS AND NOTHING ELSE — the registry does not exist at that instant', () => {
    const { record } = boot(scratch())
    expect(record.read().panes.map((pane) => pane.id).sort(), 'the three declared panes stand at creation').toEqual([...DECLARED_PANE_IDS].sort())
    expect(record.read().zones.map((zone) => zone.id).sort(), 'and the four declared zones').toEqual([...DECLARED_ZONE_IDS].sort())
  })

  it('M-7(b) · AFTER THE SET GROWS, THE SECOND PASS MINTS THE MODULE PANE AT THE FAMILY\'S DEFAULT GEOMETRY AND CARRIES A STATED MEMBER', () => {
    const { record, domain } = boot(scratch())
    // THE OPERATOR'S OWN FIGURE, stated before the pass: it must survive the pass (`C-9`).
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 180 }).status, 'the stage pane states its adjustable member').toBe('committed')
    domain.panes.push('pane-module')
    domain.zones.push('rail')
    const answer = record.standMissingFamilies()
    expect(answer.panes, 'the pass names what it MINTED, not what already stood').toEqual({ status: 'committed', added: ['pane-module'] })
    // **`OW-1`'s CONSEQUENCE, READ HERE**: the zone domain composes the id, and a zone whose declarer states no figure has
    // no record the family can admit — `zoneFamilyStatesSizes` is NOT loosened, so the pass mints nothing for it and the
    // id stays absent (a guess would be refused by the very constraint the pass must satisfy).
    expect(answer.zones, 'a zone with no stated figure is not minted — `OW-1`').toEqual({ status: 'committed', added: [] })
    const panes = record.read().panes
    expect(panes.find((pane) => pane.id === 'pane-module'), 'the module pane is minted by the SAME branch: both axes, a zone, no bounds').toEqual({
      id: 'pane-module',
      width: DEFAULT_PANE_SIZE,
      height: DEFAULT_PANE_SIZE,
      zone: 'top',
    })
    expect(panes.find((pane) => pane.id === DEFAULT_PANE_ID)?.height, 'and the stated figure is CARRIED, never rewritten').toBe(180)
    expect(record.read().zones.map((zone) => zone.id), 'and the memberless module zone stays absent rather than standing as a guess').not.toContain('rail')
  })

  it('M-7(c) · THE TWO ADMISSION SEATS AGREE: the module pane is refused BEFORE the set grows and admitted after, at the route AND at the family judge', () => {
    const { record, store, domain } = boot(scratch())
    expect(record.commitPane('pane-module', { height: 100 }).status, 'the route refuses an id the composed set does not name').toBe('refused')
    // THE FAMILY JUDGE, the closure's second seat: an outside write at the module pane's own leaf is refused too.
    let refusedAtTheJudge = false
    try {
      store.write(['panes', 'pane-module'], 'file', { width: 100, height: 100, zone: 'top' })
    } catch {
      refusedAtTheJudge = true
    }
    expect(refusedAtTheJudge, 'the constraint reads the same thunk, so the two seats cannot disagree').toBe(true)
    domain.panes.push('pane-module')
    // THE RECORD MUST STAND BEFORE A LEAF WRITE: the pass mints it (`D-151`'s leaf-write precondition), and only then does
    // the route's member land at its own name.
    expect(record.standMissingFamilies().panes.added, 'the record is minted once the set names it').toEqual(['pane-module'])
    expect(record.commitPane('pane-module', { width: 90 }).status, 'now the route admits it — `width`, the axis its `top` zone frees').toBe('committed')
    let admitted = ''
    try {
      store.write(['panes', 'pane-module'], 'file', { width: 90, height: 100, zone: 'top' })
      admitted = 'landed'
    } catch {
      admitted = 'refused'
    }
    expect(admitted, 'and so does the judge — one answer, two seats').toBe('landed')
  })

  it('M-7(d) · A FAMILY THAT ALREADY NAMES EVERY COMPOSED ID IS NOT WRITTEN AT ALL — the pass adds nothing and rewrites nothing', () => {
    const path = scratch()
    const { record } = boot(path)
    const before = readFileSync(path, 'utf8')
    expect(record.standMissingFamilies(), 'nothing is missing, so nothing is minted').toEqual({
      panes: { status: 'committed', added: [] },
      zones: { status: 'committed', added: [] },
    })
    expect(readFileSync(path, 'utf8'), 'and the profile\'s bytes are unmoved by a pass that added nothing').toBe(before)
  })
})
