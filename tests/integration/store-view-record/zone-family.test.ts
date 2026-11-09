// tests/integration/store-view-record/zone-family.test.ts — THE THIRD FAMILY'S ACCEPTANCE BAR: the zone address, its one
// declaration, its route and its client read, driven per clause over the real `provident-storeroom` instance (D-91).
//
// **THE FILENAME CARRIES `zone-family` AND NOT `zones` FOR A MEASURED REASON**: `tests/zones.test.ts` is the token-arithmetic
// unit's own red set, and its `R-8` asserts that NO OTHER `zones*` path stands in `src/**` or `tests/**` — a claim about
// OWNERSHIP that a second `zones` basename reds. The family's battery therefore names itself after the family in this
// module's own vocabulary, and the other unit's row is left exactly as it stands.
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
/**
 * ============================================================================
 * WHY THIS FAMILY EXISTS AT ALL, AND WHY THIS FILE IS ITS BAR.
 *
 * `D-90` enumerated what the frozen store still serves and measured that FOUR of its five families had a lawful home and
 * the ZONE family had none: `candidatesFor` reads `mem.layout.zone.<id>.slot` / `.distance` and the composition's render
 * turn reads `.size` / `.display`, and no crossing address, declaration, client member or shared vocabulary carried a
 * zone. The user's ruling was to give it one, and this battery drives the four clauses of `D-82`'s convention at that
 * address the way `crossing.test.ts` drives them at the panes family. (`D-142` has since retired the `['focus']` family
 * whole, so this is one of the TWO families the crossing's own battery and this one cover between them; that battery's
 * `Z-5` citation in the re-grain is this file's creation-instant/re-mint pair — `Z-1` and `Z-5`.)
 *
 * THE SUBJECT IS THE FAMILY, NOT THE MACHINERY: every row below is a measurement of what the store and the record
 * ACTUALLY answer — a construction, a read, a committed write, a delivery count, a file's bytes — and the two rows that
 * read source at all read COMMENT-ELIDED code with a positive control, because an absence asserted over raw bytes passes
 * on a comment (`D-81`'s hollow-green class, which this tree has already paid for once).
 *
 * THE RENDERER IS NOT WIRED TO THIS FAMILY AND THAT IS THIS PASS'S EXPLICIT LIMIT (D-91): the drag composition's zone
 * reads still stand on the frozen store, and the pass that wires them is the deletion pass. So no row here asserts a
 * renderer call site, and none could.
 * ============================================================================
 */

import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
  createViewRecord,
  UNDECLARED_ZONE_REASON,
  VIEW_ZONES_ADDRESS,
  VIEW_ZONES_MUST_STAND_ID,
  viewConstraintDeclarations,
  ZONE_MEMBER_REASON,
  ZONE_SHAPE_REASON,
  zoneIn,
} from '../../../src/main/view-record'
import type { ViewConstraintDeclaration, ViewRecordStore, ViewZone } from '../../../src/main/view-record'
import { createViewSurface } from '../../../src/main/view-surface'
import { IPC_VIEW_CHANGED, IPC_VIEW_ZONES_COMMIT } from '../../../src/shared/view-channels'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)
const ZONE = 'zone-1'

/** **A SOURCE READ WITH THE COMMENT LINES AND BLOCK COMMENTS ELIDED — THE ONLY FORM AN ABSENCE MAY BE ASSERTED ON**
 *  (`D-81`): a naive byte read passes on a comment, and the positive control each absence row carries is that the RAW
 *  bytes DO carry the spelling. */
function commentElided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

const sourceOf = (path: string): string => readFileSync(new URL(path, REPO), 'utf8')

/** The batch a boot supplies, mapped the way `src/main/main.ts` maps it. */
const batchOf = (getStore: () => ViewRecordStore | null) =>
  viewConstraintDeclarations(getStore).map((declaration) => ({
    address: declaration.address,
    id: declaration.id,
    constraint: declaration.constraint,
  }))

/** **ONE BOOT**: a fresh instance over `path`, carrying the whole batch, with its holder bound the way the boot binds it
 *  — bound only after the construction answers, which is why the pairs judge `context.value`. */
interface Boot {
  readonly store: ViewRecordStore
  readonly read: () => ReturnType<ReturnType<typeof createViewRecord>['read']>
  readonly bytes: () => string
  readonly close: () => void
}

function boot(path: string, declarations?: readonly ViewConstraintDeclaration[]): Boot {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: path,
    constraints: (declarations === undefined ? batchOf(() => bound.current) : declarations.map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    }))) as never,
  })
  bound.current = store as unknown as ViewRecordStore
  const here = createViewRecord({ store: bound.current })
  return { store: bound.current, read: () => here.read(), bytes: () => readFileSync(path, 'utf8'), close: () => { bound.current = null } }
}

let dir = ''
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'view-zones-'))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

// ═══════════════ CLAUSE 1 — EXISTENCE + PLACEHOLDER AT THE CREATION INSTANT ═══════════════

describe('view-record · the zone family, clause 1 — the address stands before any route runs', () => {
  it('Z-1 · THE CREATION INSTANT: with the batch supplied the STORE\'S OWN READ answers the placeholder before any route of the module runs, and a store carrying NO batch answers `AddressNotFound` at the same address — the absent arm the pair exists to repair', () => {
    // THE CONTROL FIRST, ON ITS OWN PROFILE: no batch, no address.
    const bare = createProfileStore({ filePath: join(dir, 'bare.json') })
    let absent = ''
    try {
      bare.read(VIEW_ZONES_ADDRESS as never, 'mem')
    } catch (caught) {
      absent = (caught as { status?: string }).status ?? ''
    }
    expect(absent, 'a store with no declaration holds NOTHING at the zone root').toBe('AddressNotFound')

    // AND THE BATCHED BOOT: the address stands, at the ONE whole legal value `D-151`'s repair writes — EVERY DECLARED ZONE
    // ID WITH AN EMPTY RECORD (`viewZonesPlaceholder`, `{'zone-1': {}}`) — read off the store's own verb, before
    // `createViewRecord` exists and before any route of this module has been called. **AND IT NAMES A ZONE NOW, WHICH IS
    // THE RE-GRAIN** (`D-151`): `D-91`'s placeholder was *"the family that names no zone"*, and an EMPTY family cannot
    // satisfy the leaf write's precondition — `['zones', id]` must STAND and the store creates no parent (measured at this
    // node), so the repair CREATES each declared id's record and `{}` IS a zone this module admits.
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
    bound.current = store as unknown as ViewRecordStore
    const standing = store.read(VIEW_ZONES_ADDRESS as never, 'mem') as unknown
    expect(standing, 'the family STANDS when the constructor returns, and it names every DECLARED zone id with an EMPTY record').toEqual({ 'zone-1': {} })
    // **AND THE PLACEHOLDER IS THE READ'S OWN ANSWER, NOT A SECOND AUTHORITY**: the declared zone is a ZONE WITH NO MEMBER
    // and no geometry is minted for it, which is what the frozen store answered for a MISS too — so the read names ONE
    // zone where it answered NONE, and `zoneIn`'s `null` is left meaning *"an id this record does not declare"*
    // (`D-151` (b), H9).
    const record = createViewRecord({ store: bound.current })
    const read = record.read()
    expect(read.zones, 'so the record reads the ONE declared zone, memberless').toEqual([{ id: ZONE }])
    expect(read.source.zones, 'because a REPAIR put it there, and the read says which').toBe('record')
    expect(zoneIn(read.zones, ZONE), 'and that zone carries no member at all — no geometry is invented for it').toEqual({ id: ZONE })
    expect(zoneIn(read.zones, 'zone-undeclared'), 'while an id the family does not name still answers null — which is now the DOMAIN\'s word and not absence\'s').toBeNull()
  })

  it('Z-2 · AND A SEEDED FAMILY STANDS BYTE-IDENTICAL: the pair passes what is legal, so the placeholder is a repair of ABSENCE and never a rewrite of a record — measured through a second construction over the first boot\'s own profile', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    expect(one.read().source.zones, 'boot one minted it').toBe('record')
    one.close()
    // A family the FIRST boot's instance never had (mem is re-minted, so the seed is the caller's act in the same boot).
    const seeded = readFileSync(path, 'utf8')
    const two = boot(path)
    expect(two.read().zones, 'boot two is handed ABSENT and its repair mints the declared record again — one memberless zone').toEqual([{ id: ZONE }])
    expect(readFileSync(path, 'utf8'), 'and the profile is byte-identical: a `mem` family never reaches it').toBe(seeded)
    two.close()
  })
})

// ═══════════════ CLAUSE 2 — THE LISTENER CARRIES THE CHANGE ═══════════════

describe('view-record · the zone family, clause 2 — one delivery per committed change, and zero for a write that touches nothing', () => {
  it('Z-3 · ONE DELIVERY PER COMMITTED CHANGE OF THE FAMILY — AND ONE ROUTE CALL IS ONE CHANGE PER SUPPLIED MEMBER, because each member is ONE LEAF WRITE (`D-151`): `{size, display}` delivers twice — and ZERO for a write at another address — with the SAME subscription then delivering, so the zero is not a dead registration', () => {
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
    bound.current = store as unknown as ViewRecordStore
    const record = createViewRecord({ store: bound.current })
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    expect(record.commitZones(ZONE, { size: 160, display: 'normal' }).status).toBe('committed')
    expect(
      delivered,
      'ONE ROUTE CALL, TWO SUPPLIED MEMBERS, TWO DELIVERIES: `commitZones` writes one leaf per member — `size`, then `display` — so the act lands as two states and each is a change the pair admits (D-151)',
    ).toBe(2)
    expect(record.commitZones(ZONE, { slot: 'doc-nav' }).status).toBe('committed')
    expect(delivered, 'a second act, supplying one member and so writing one leaf, and the count is a count rather than a flag').toBe(3)
    // THE CONTROL: a write that touches NOTHING this module binds. A listener the store never wired would also answer 0
    // here, which is why the row does not end on the zero.
    ;(store as unknown as { write: (a: unknown, t: string, v: unknown) => unknown }).write(['elsewhere'], 'mem', { x: 1 })
    expect(delivered, 'a write at another address delivers nothing').toBe(3)
    expect(record.commitZones(ZONE, { size: 200 }).status).toBe('committed')
    expect(delivered, 'and the same subscription still delivers — the zero above was about the address').toBe(4)
    off()
    expect(record.commitZones(ZONE, { size: 210 }).status, 'the withdrawal leaves the route working').toBe('committed')
    expect(delivered, 'and nothing more is delivered to a withdrawn subscription').toBe(4)
  })

  it('Z-4 · AND THE SHAPE REFILLS ON THE DELIVERY: the surface\'s ONE subscription becomes the push the main process broadcasts, and the client\'s re-read REPLACES the family whole — so the renderer reads a zone it never asked the store for', async () => {
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
    bound.current = store as unknown as ViewRecordStore
    let pushes = 0
    const surface = createViewSurface({ store: bound.current, onChanged: () => { pushes += 1 } })
    surface.attach()
    // THE BRIDGE, AS THE PRELOAD DECLARES IT: the member's surviving routes, each answering what the surface answers.
    // **`commitFocus` IS NOT HERE AND THAT IS THE RE-GRAIN** (`D-142`): the route leaves both sides in the same edit, so a
    // literal still carrying it would model a wire this module no longer declares.
    const handlers: Array<() => void> = []
    const bridge = {
      read: async (): Promise<unknown> => surface.read(),
      commitPane: async (id: string, geometry: unknown): Promise<unknown> => surface.commitPane(id, geometry),
      commitZones: async (id: string, zone: unknown): Promise<unknown> => surface.commitZones(id, zone),
      onChanged: (handler: () => void): (() => void) => {
        handlers.push(handler)
        return (): void => {
          const at = handlers.indexOf(handler)
          if (at >= 0) handlers.splice(at, 1)
        }
      },
    }
    const { createViewClient } = await import('../../../src/renderer/view-client')
    const client = createViewClient({ bridge: bridge as never })
    const delivery = (): void => {
      for (const handler of [...handlers]) handler()
    }
    // THE ONE STATED BOOT READ, then every later fill is a delivery's.
    const first = await client.fill()
    expect(first.status).toBe('committed')
    expect(client.zoneOf(ZONE), 'the boot read answers the declared zone, carrying no member').toEqual({ id: ZONE })
    let refills = 0
    const subscription = client.subscribe(() => {
      refills += 1
    })
    expect(subscription.subscribed, 'one registration over the member\'s one push').toBe(true)
    expect(handlers.length, 'and exactly one').toBe(1)
    // THE WRITE LANDS AT THE ROUTE, the surface broadcasts, and the delivery re-reads.
    expect(surface.commitZones(ZONE, { size: 240, display: 'normal', slot: 'doc-nav' }).status).toBe('committed')
    expect(
      pushes,
      'the surface turns ONE subscription into ONE push per landed change — and this act supplies THREE members, so three leaf writes and three pushes (`D-151`)',
    ).toBe(3)
    delivery()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(refills, 'one delivery, one re-read through the caller\'s handler').toBe(1)
    expect(client.zoneOf(ZONE), 'and the shape is REPLACED WHOLE by what that read answered').toEqual({
      id: ZONE,
      slot: 'doc-nav',
      size: 240,
      display: 'normal',
    })
    surface.detach()
  })
})

// ═══════════════ CLAUSE 3 — BOOT DATA ═══════════════

describe('view-record · the zone family, clause 3 — a `mem` family is re-minted at every boot and the profile carries no byte of it', () => {
  it('Z-5 · TWO SUCCESSIVE BOOTS: boot two is handed the address ABSENT, its repair mints the declared zone with an empty record again, and NOT ONE BYTE of the family reaches the profile — measured at the pair\'s own context and in the file\'s own text', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    expect(one.read().source.zones).toBe('record')
    // A CALLER'S FACT, WRITTEN IN BOOT ONE — the thing a `file` family would carry forward and this one provably cannot.
    const recordOne = createViewRecord({ store: one.store })
    expect(recordOne.commitZones(ZONE, { size: 160, display: 'normal' }).status).toBe('committed')
    const bytesAfterOne = one.bytes()
    one.close()

    // **THE INSTRUMENT IS THE PAIR WRAPPED, NOT A PROBE BESIDE IT** (`D-84`'s shape): every context the engine hands
    // `zones-must-stand` is recorded, so the ABSENCE at the creation instant and the RE-RUN over the repaired value are
    // both read at the site they happen.
    const seen: unknown[] = []
    const bound: { current: ViewRecordStore | null } = { current: null }
    const wrapped = viewConstraintDeclarations(() => bound.current).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: (context: unknown) => {
        if (declaration.id === VIEW_ZONES_MUST_STAND_ID) seen.push((context as { value?: unknown }).value)
        return declaration.constraint(context)
      },
    }))
    const two = createProfileStore({ filePath: path, constraints: wrapped as never })
    bound.current = two as unknown as ViewRecordStore
    expect(seen.length, 'the engine ASKS the zone pair at the creation instant — a pair the batch does not carry is asked nowhere, and this row reds on that revert').toBeGreaterThan(0)
    expect(seen[0], 'boot two is handed NOTHING at the zone root: a `mem` value never came from a file').toBeUndefined()
    expect(seen[seen.length - 1], 'and the registration\'s own RE-RUN reads the family the repair landed — every DECLARED id with an empty record (`D-151`)').toEqual({ 'zone-1': {} })
    const readTwo = createViewRecord({ store: bound.current }).read()
    expect(readTwo.zones, 'so boot two answers the DECLARED zone, memberless — boot one\'s `zone-1` members did not survive, and cannot').toEqual([{ id: ZONE }])
    expect(readTwo.source.zones, 'because a repair put it there, at this boot as at the last').toBe('record')
    const bytesAfterTwo = readFileSync(path, 'utf8')
    expect(bytesAfterTwo.includes('zones'), 'not one byte of the family reached the profile: not the root\'s name').toBe(false)
    expect(bytesAfterTwo.includes('zone-1'), 'and not a zone id either').toBe(false)
    expect(bytesAfterTwo, 'and the profile never moved across the two boots').toBe(bytesAfterOne)
  })
})

// ═══════════════ CLAUSE 4 — WRITES ARE AN IPC ROUTE OR A REPAIR, AND NO FIFTH ═══════════════

describe('view-record · the zone family, clause 4 — the write census, and no timer, poll or write-on-read', () => {
  it('Z-6 · THE ENUMERATION: the zone family\'s ONLY writers are `commitZones` (an IPC route) and the one creation repair — no timer, no poll, no interval, and no `setTimeout` anywhere in the module or its surface, over COMMENT-ELIDED code with a synthetic positive control', () => {
    const module = commentElided(sourceOf('src/main/view-record/index.ts'))
    const surface = commentElided(sourceOf('src/main/view-surface/index.ts'))
    const main = commentElided(sourceOf('src/main/main.ts'))
    for (const forbidden of ['setTimeout', 'setInterval', 'setImmediate', 'requestAnimationFrame', 'queueMicrotask']) {
      expect(new RegExp(`\\b${forbidden}\\s*\\(`).test(module + surface), `no ${forbidden} stands in the module or its surface`).toBe(false)
    }
    // THE POSITIVE CONTROL — the instrument fires on a synthetic timer, so the absence above is about this code and not
    // about a scan that could never have matched anything.
    expect(/\bsetTimeout\s*\(/.test('const t = setTimeout(fn, 0)'), 'the instrument fires on a synthetic timer').toBe(true)
    // THE WRITERS, ENUMERATED: THREE caller routes write a whole family at its ROOT — the panes, the appearance act and the
    // drag move — while the ZONE route writes ONE LEAF PER SUPPLIED MEMBER, at `[VIEW_ZONES_ADDRESS[0], id, member]`, and
    // the ONE repair path writes through `writeJoinedAt`, so a fourth root write (or a repair that reached the store
    // directly) reds the census below.
    // **THE CENSUS IS THE MODULE'S AND NOT THE ZONE FAMILY'S** — which is exactly what it is for — and its history is the
    // measurement: it read `three` when the focus route left with its family (`D-142`, `D-9`), then FOUR when the drag
    // family's own route arrived writing a whole value at `['drag']` at `temp` (`D-132`, L2 §8's hunks 1–3), and reads
    // THREE again at this head because the ZONE route's whole-family write goes with `composeZones` (`D-151`, `D-139`).
    // **THE CLEAR IS NOT COUNTED HERE AND THAT IS THE MEASUREMENT**: it is a `delete` at the family's own tier, so it is a
    // WRITE PATH and not a whole-family `write` — asserting the count alone would let the clear land as an empty-family
    // write, which is the placeholder `D-132`'s ruling refuses.
    expect(
      (module.match(/\.write\(VIEW_/g) ?? []).length,
      'exactly THREE routes write a whole family at its root — the panes, the appearance act and the drag move — and the zone route is not one of them',
    ).toBe(3)
    expect(/\.delete\(VIEW_DRAG_ADDRESS, DRAG_TIER/.test(module), 'and the drag family\'s fifth path ENDS the reading rather than writing a placeholder').toBe(true)
    expect((module.match(/writeJoinedAt\(/g) ?? []).length, 'and the ONE repair path names its commit at exactly one call site').toBe(1)
    // **AND THE ZONE FAMILY'S TWO WRITERS ARE ITS LEAVES AND ITS ONE REPAIR** (`D-151`, `D-82` clause 4): NO whole-family
    // write at the zone root remains in the module — `composeZones` left, so a root write here would be the composer
    // rebuilt under this route's name — and the route's leaf is the one `[VIEW_ZONES_ADDRESS[0], id, member]` form, which
    // is what a caller's member lands at, while the repair keeps writing the whole family through `writeJoinedAt`.
    expect(/\.write\(VIEW_ZONES_ADDRESS, ZONES_TIER/.test(module), 'no whole-family write at the zone root remains in the module').toBe(false)
    expect(/\[VIEW_ZONES_ADDRESS\[0\] as string, id, member\]/.test(module), 'and the zone route writes ONE LEAF PER SUPPLIED MEMBER at that form').toBe(true)
    // AND THE ROUTE HAS A HANDLER AT THE BRIDGE'S OWN SITE, which is what makes it an IPC route rather than a member
    // nothing calls — the defect L2's central-data §2 records against such a member.
    expect(main.includes('ipcMain.handle(IPC_VIEW_ZONES_COMMIT'), 'the zone route is registered at the boot').toBe(true)
    expect(IPC_VIEW_ZONES_COMMIT, 'and it is one of the module\'s single-sourced channel names').toBe('provident:view:zones-commit')
    expect(IPC_VIEW_CHANGED, 'and the push is the same one the other surviving families deliver on').toBe('provident:view:changed')
  })

  it('Z-7 · NO WRITE ON READ, MEASURED BOTH WAYS: three reads land no byte over a standing family, and a read over a store whose batch NEVER RAN answers the empty family WITHOUT minting it', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    const record = createViewRecord({ store: one.store })
    expect(record.commitZones(ZONE, { size: 175 }).status).toBe('committed')
    // A `mem` family cannot show bytes, so the instrument is the JOURNAL's own ordinal: a read that wrote would move it.
    const before = (one.store as unknown as { write: (a: unknown, t: string, v: unknown) => { op?: { seq?: number } } }).write(['elsewhere'], 'mem', { x: 1 }).op?.seq
    for (let n = 0; n < 3; n += 1) expect(record.read().zones, 'the family the caller wrote is what a read answers').toEqual([{ id: ZONE, size: 175 }])
    const after = (one.store as unknown as { write: (a: unknown, t: string, v: unknown) => { op?: { seq?: number } } }).write(['elsewhere'], 'mem', { x: 2 }).op?.seq
    expect(typeof before === 'number' && typeof after === 'number' ? after - before : null, 'three reads landed NO op: the journal moved by exactly the one write between the two probes').toBe(1)
    one.close()

    // HALF TWO — A STORE WHOSE BATCH NEVER RAN: the only place the family can be absent while a record reads it.
    const barePath = join(dir, 'bare.json')
    const bare = createProfileStore({ filePath: barePath })
    const overBare = createViewRecord({ store: bare as unknown as ViewRecordStore }).read()
    expect(overBare.zones, 'no declaration ran, so the family answers the empty arm, never a minted record').toEqual([])
    expect(overBare.source.zones).toBe('default')
    let absent = ''
    try {
      bare.read(VIEW_ZONES_ADDRESS as never, 'mem')
    } catch (caught) {
      absent = (caught as { status?: string }).status ?? ''
    }
    expect(absent, 'and the read did NOT mint the address: no write runs on a read').toBe('AddressNotFound')
    expect(readFileSync(barePath, 'utf8'), 'while the profile stays the empty image its construction made').toBe('')
  })
})

// ═══════════════ THE ROUTE'S ARMS, THE PER-MEMBER LEAF WRITES AND THE PURE DERIVATION ═══════════════

describe('view-record · the zone route', () => {
  it('Z-8 · THE SHAPE ARMS ANSWER BEFORE ANY STORE VERB: no id, a non-record, and each of the four members supplied unusably are refused under this module\'s own tokens — and the family did not move', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    const record = createViewRecord({ store: one.store })
    const before = record.read()
    // THE PROFILE'S OWN IMAGE IS NOT EMPTY AND MUST NOT BE: the `panes` pair is a `file` value whose creation repair the
    // landing arm saves (D-86), so the instrument is that the bytes DO NOT MOVE and that they carry no zone.
    const profileBefore = one.bytes()
    expect(profileBefore.includes('zones'), 'the boot wrote the pane family and no zone root').toBe(false)
    expect(record.commitZones('', { size: 1 }), 'no zone id').toMatchObject({ status: 'refused', reason: ZONE_SHAPE_REASON })
    expect(record.commitZones(ZONE, null), 'no plain zone record').toMatchObject({ status: 'refused', reason: ZONE_SHAPE_REASON })
    expect(record.commitZones(ZONE, [1, 2]), 'a list is not a zone').toMatchObject({ status: 'refused', reason: ZONE_SHAPE_REASON })
    expect(record.commitZones(ZONE, { size: Number.NaN }), 'a size that is not a finite number').toMatchObject({ status: 'refused', reason: ZONE_MEMBER_REASON })
    expect(record.commitZones(ZONE, { size: -1 }), 'a negative size — no zone is narrower than nothing').toMatchObject({ status: 'refused', reason: ZONE_MEMBER_REASON })
    expect(record.commitZones(ZONE, { distance: 'far' }), 'a distance that is not a number').toMatchObject({ status: 'refused', reason: ZONE_MEMBER_REASON })
    expect(record.commitZones(ZONE, { display: 7 }), 'a display that is not the string its consumers compare').toMatchObject({ status: 'refused', reason: ZONE_MEMBER_REASON })
    expect(record.commitZones(ZONE, { slot: null }), 'and a slot the crossing\'s boundary would refuse').toMatchObject({ status: 'refused', reason: ZONE_MEMBER_REASON })
    expect(record.read(), 'no refused act moved the family').toEqual(before)
    expect(one.bytes(), 'and none of them moved the profile by a byte').toBe(profileBefore)
    one.close()
  })

  it('Z-9 · ONE MEMBER IS FILLED, NOT ERASED: a commit naming a size alone keeps the zone\'s standing slot and display, because each supplied member is its OWN LEAF WRITE (D-151) — and an id this record does not declare is REFUSED, which is the arm that replaced this row\'s sibling-zone half', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    const record = createViewRecord({ store: one.store })
    expect(record.commitZones(ZONE, { size: 160, display: 'normal', slot: 'doc-nav' }).status).toBe('committed')
    expect(record.commitZones(ZONE, { size: 240 }).status, 'the size alone').toBe('committed')
    expect(record.read().zones, 'the members the family stood at survive the narrower act').toEqual([
      { id: ZONE, slot: 'doc-nav', size: 240, display: 'normal' },
    ])
    // ── THE RETIRED HALF, RECORDED WITH ITS REASON (this corpus's habit, `D-142`'s style, `D-9`) ──
    // 'AND A SIBLING ZONE SURVIVES' drove `commitZones('zone-2', { slot: 'main', distance: 40 })` and read the TWO zones
    // back: the composer carried every SIBLING zone along, because one whole-family write at the root replaces the family
    // and nothing else would have preserved it. **THAT HALF HAS NO SUBJECT AT THIS HEAD** (2026-11-08, `D-151`): the zone
    // ID DOMAIN IS CLOSED to `DECLARED_ZONE_IDS`, which is ONE id (`DEFAULT_ZONE_ID`, `ASM-10`), so with one declared id
    // there IS no sibling zone to preserve — and a caller naming `zone-2` is refused at the route's own domain arm,
    // before any store verb, rather than silently creating a zone (`ASM-7`). The composer's sibling-zone loop was
    // therefore work no reachable state needed, which is `D-151`'s removal arrived at by a second road (`D-139` judged it
    // removable once the ancestry was enforced). **So the arm below asserts the REFUSAL — the new contract — and the
    // sibling half retires here with its reason rather than being re-pointed at a state that cannot be represented.**
    expect(
      record.commitZones('zone-2', { slot: 'main', distance: 40 }),
      'a well-formed id this record does not declare is REFUSED before any store verb: the closure at the route\'s seat',
    ).toMatchObject({ status: 'refused', reason: UNDECLARED_ZONE_REASON, address: ['zones', 'zone-2'] })
    expect(record.read().zones, 'and nothing the refused act named reached the family: its one declared zone stands exactly as it stood').toEqual([
      { id: ZONE, slot: 'doc-nav', size: 240, display: 'normal' },
    ])
    // THE MINIMISE MARKER IS A LEGAL SIZE, because it is the composition's own word for a minimized zone.
    expect(record.commitZones(ZONE, { size: 0 }).status, 'the caller\'s minimize marker is stored').toBe('committed')
    expect(record.read().zones.find((zone) => zone.id === ZONE)?.size, 'and read back at zero').toBe(0)
    one.close()
  })

  it('Z-10 · THE LANDING INSTANT IS REACHABLE AND ITS REPAIR NAMES THE COMMIT AT `write`\'s FOURTH POSITION: a `delete` of the zone root is re-minted inside the SAME commit, answering one credited arm and delivering ONE notification — not two', () => {
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
    bound.current = store as unknown as ViewRecordStore
    const record = createViewRecord({ store: bound.current })
    expect(record.commitZones(ZONE, { size: 160 }).status).toBe('committed')
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    const receipt = (bound.current as unknown as { delete: (a: unknown) => { triggered?: readonly { handle: string }[] } }).delete(VIEW_ZONES_ADDRESS as never)
    expect(delivered, 'the delete is ONE committed change, its repair\'s joined write being no second delivery').toBe(1)
    expect((receipt.triggered ?? []).map((entry) => entry.handle)).toContain(VIEW_ZONES_MUST_STAND_ID)
    expect(record.read().zones, 'and the family stands again, at the placeholder that names every DECLARED zone with an empty record').toEqual([{ id: ZONE }])
    expect(record.read().source.zones).toBe('record')
    off()
  })

  it('Z-11 · THE PURE DERIVATION, OUT OF A READING AND WITH NO STORE VERB: `zoneIn` answers the zone the family names with exactly the members it carries, `null` for one it does not, and a FRESH record each call', () => {
    const family: readonly ViewZone[] = [
      { id: ZONE, slot: 'doc-nav', size: 160, display: 'normal' },
      { id: 'zone-bare' },
    ]
    expect(zoneIn(family, ZONE)).toEqual({ id: ZONE, slot: 'doc-nav', size: 160, display: 'normal' })
    expect(zoneIn(family, 'zone-nothing'), 'a zone the family does not name answers its ABSENCE').toBeNull()
    expect(zoneIn(family, 'zone-bare'), 'and a zone carrying no member is still a zone the family names').toEqual({ id: 'zone-bare' })
    const first = zoneIn(family, ZONE) as ViewZone
    const second = zoneIn(family, ZONE) as ViewZone
    expect(first).not.toBe(second)
    expect(first).toEqual(second)
  })
})
