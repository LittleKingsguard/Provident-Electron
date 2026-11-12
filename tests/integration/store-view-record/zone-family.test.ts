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
  createViewDelivery,
  createViewRecord,
  UNDECLARED_ZONE_REASON,
  VIEW_ZONES_ADDRESS,
  VIEW_ZONES_MUST_STAND_ID,
  viewConstraintDeclarations,
  ZONE_MEMBER_REASON,
  ZONE_SHAPE_REASON,
  zoneIn,
} from '../../../src/main/view-record'
import type { ViewConstraintDeclaration, ViewDelivery, ViewRecordStore, ViewZone } from '../../../src/main/view-record'
import { createViewSurface } from '../../../src/main/view-surface'
import { DEFAULT_ZONE_SIZES } from '../../../src/shared/view-shape'
import { IPC_VIEW_CHANGED, IPC_VIEW_ZONES_COMMIT } from '../../../src/shared/view-channels'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)
/** **THE ZONE FAMILY'S ADDRESSED ID, AND IT IS ONE OF THE FOUR THE RECORD NOW DECLARES** (`D-181`, `D-151`): this fixture
 *  asked about `'zone-1'` while the domain held ONE id, and `zone-1` names nothing since the set widened to
 *  `top`/`bottom`/`left`/`right` (`D-192` retired `DEFAULT_ZONE_ID` with its premise). The subject below is unchanged — a
 *  declared id, its members, its leaves — and the literal is the one a caller may now name. */
const ZONE = 'top'
/** **THE DECLARED DOMAIN, SPELLED HERE SO A WIDENING OR A NARROWING REDS THESE ROWS**: `DECLARED_ZONE_IDS` is the record's
 *  constant and this list is the battery's own statement of it — the same relationship `ZONE` has with the domain, one
 *  level up, so the fixture cannot fall silently behind the set it measures. */
const DECLARED = ['top', 'bottom', 'left', 'right'] as const
/** **THE FOUR FIGURES A FRESH REPAIR LEAVES, READ FROM `DEFAULT_ZONE_SIZES` AND NEVER SPELLED HERE** (`D-233`'s item
 *  (4)). Since `D-233` the creation repair no longer mints a MEMBERLESS record: it writes each declared id WITH its
 *  declared default `size`, so the state this file's clause-1 and clause-3 rows assert is the table's own — and a figure
 *  hard-coded beside it would be the count-slip class this corpus keeps re-taking (a table whose numbers move would leave
 *  these rows green against a stale number). **THE ORDER IS THE SORT'S AND NOT THE STORE'S**: the store answers the family
 *  in its own key order (measured: `bottom`, `left`, `right`, `top`), which is no claim of any row's, so the comparison is
 *  over MEMBERSHIP AND FIGURE; `toEqual` on an array still refuses a missing or an extra zone, which is what the rows are
 *  about. */
const DECLARED_DEFAULTS = [...DEFAULT_ZONE_SIZES].slice().sort((left, right) => left.id.localeCompare(right.id))
/** The four standing zones as the RECORD's read answers them — `{id, size}` per declared id. */
const FOUR_STANDING: readonly { readonly id: string; readonly size: number }[] = DECLARED_DEFAULTS.map((entry) => ({
  id: entry.id,
  size: entry.size,
}))
/** The whole placeholder VALUE the repair lands, member for member — the same table one level down. */
const FOUR_EMPTY: Record<string, { size: number }> = Object.fromEntries(
  DECLARED_DEFAULTS.map((entry) => [entry.id, { size: entry.size }]),
)

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

/** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE BECAUSE ITS `listeners` ARRAY IS READ INSIDE THE CALL THAT CREATES
 *  IT** (`D-219`; `docs/L3/view-record/delivery.md` §1–§3). `entries` is what the construction adopts — one per declared
 *  root, this row's subject among them — and `subscribe` is the fan-out. The SINK records the delivered addresses, which is
 *  the reading the design names for a battery and the only destination a node fixture has (`docs/L3/app-shell/delivery.md`
 *  §3). */
interface Deliveries {
  readonly delivery: ViewDelivery
  readonly sunk: (readonly string[])[]
}

const deliveryFor = (): Deliveries => {
  const sunk: (readonly string[])[] = []
  return { delivery: createViewDelivery((address) => sunk.push([...address])), sunk }
}

/** **ONE BOOT**: a fresh instance over `path`, carrying the whole batch AND the crossing's adopted entries, with its holder
 *  bound the way the boot binds it — bound only after the construction answers, which is why the pairs judge
 *  `context.value`. */
interface Boot {
  readonly store: ViewRecordStore
  readonly delivery: ViewDelivery
  readonly sunk: (readonly string[])[]
  readonly read: () => ReturnType<ReturnType<typeof createViewRecord>['read']>
  readonly bytes: () => string
  readonly close: () => void
}

function boot(path: string, declarations?: readonly ViewConstraintDeclaration[]): Boot {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const { delivery, sunk } = deliveryFor()
  const store = createProfileStore({
    filePath: path,
    constraints: (declarations === undefined ? batchOf(() => bound.current) : declarations.map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    }))) as never,
    listeners: [...delivery.entries],
  })
  bound.current = store as unknown as ViewRecordStore
  const here = createViewRecord({ store: bound.current, delivery })
  return { store: bound.current, delivery, sunk, read: () => here.read(), bytes: () => readFileSync(path, 'utf8'), close: () => { bound.current = null } }
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
    // ID WITH ITS DECLARED DEFAULT `size` (`viewZonesPlaceholder` reading `DEFAULT_ZONE_SIZES`) — read off the store's own
    // verb, before `createViewRecord` exists and before any route of this module has been called. **AND IT NAMES A ZONE,
    // WHICH IS `D-151`'s RE-GRAIN**: `D-91`'s placeholder was *"the family that names no zone"*, and an EMPTY family cannot
    // satisfy the leaf write's precondition — `['zones', id]` must STAND and the store creates no parent (measured at this
    // node), so the repair CREATES each declared id's record. **AND SINCE `D-233` EACH OF THOSE RECORDS STATES A `size`**:
    // naming an id is not the same thing as the zone presenting on the surface, and the figure comes from the table this
    // row imports, so a repair that dropped it — or wrote one figure for four ids — reds here.
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    // **AND THE SAME CONSTRUCTION ADOPTS THE CROSSING'S FOUR ENTRIES** (`D-219`, §1–§2): the zone root's among them, which
    // is what makes this row's family a REPAIR's and the creation's own delivery its first reader.
    const { delivery, sunk } = deliveryFor()
    const store = createProfileStore({
      filePath: path,
      constraints: batchOf(() => bound.current) as never,
      listeners: [...delivery.entries],
    })
    bound.current = store as unknown as ViewRecordStore
    const standing = store.read(VIEW_ZONES_ADDRESS as never, 'mem') as unknown
    expect(standing, 'the family STANDS when the constructor returns, and it names every DECLARED zone id at its declared default size').toEqual(FOUR_EMPTY)
    // **AND THE CREATION DELIVERED AT THIS VERY INSTANT, WHICH IS THE EVENT `D-218` MEASURED AS ABSENT**: the repair's write
    // fired the adopted entry after it landed, so the sink already carries the zone root before any route exists.
    expect(sunk.map((address) => address[0]), 'the construction delivered to the adopted listener before `createViewRecord` ran').toContain('zones')
    // **AND THE PLACEHOLDER IS THE READ'S OWN ANSWER, NOT A SECOND AUTHORITY**: `zoneIn` hands back exactly the members the
    // family carries, and after the repair that is the ONE member the paint reads — no `display`, no `slot`, no `distance` —
    // so the read names each declared zone where it once answered none, and `zoneIn`'s `null` is left meaning *"an id this
    // record does not declare"* (`D-151` (b), H9). **THE `size` IS A MEMBER THE REPAIR'S OWN TABLE DECLARES AND THE OTHER
    // THREE ARE NOTHING'S** (`D-233`): a vocabulary that grew a member here, or a placeholder that stopped stating the
    // figure, reds on the very next line.
    const record = createViewRecord({ store: bound.current, delivery })
    const read = record.read()
    expect(read.zones, 'so the record reads the FOUR declared zones, each stating its declared default size and nothing else').toEqual(FOUR_STANDING)
    expect(read.source.zones, 'because a REPAIR put it there, and the read says which').toBe('record')
    expect(zoneIn(read.zones, ZONE), 'and that zone carries exactly ONE member — the figure the paint needs — and no geometry is invented beyond it').toEqual({
      id: ZONE,
      size: DECLARED_DEFAULTS.find((entry) => entry.id === ZONE)?.size,
    })
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
    expect(two.read().zones, 'boot two is handed ABSENT and its repair mints the declared records again — FOUR zones, each at its declared default size').toEqual(FOUR_STANDING)
    expect(readFileSync(path, 'utf8'), 'and the profile is byte-identical: a `mem` family never reaches it').toBe(seeded)
    two.close()
  })
})

// ═══════════════ CLAUSE 2 — THE LISTENER CARRIES THE CHANGE ═══════════════

describe('view-record · the zone family, clause 2 — one delivery per committed change, and zero for a write that touches nothing', () => {
  it('Z-3 · ONE DELIVERY PER COMMITTED CHANGE OF THE FAMILY — AND ONE ROUTE CALL IS ONE CHANGE PER SUPPLIED MEMBER, because each member is ONE LEAF WRITE (`D-151`): `{size, display}` delivers twice — and ZERO for a write at another address — with the SAME subscription then delivering, so the zero is not a dead registration. **RE-GRAINED FOR `D-219`: THE LISTENER IS THE CONSTRUCTION\'S `cfg.listeners` ENTRY AND THE WITHDRAWAL IS LOCAL**', () => {
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    // **THE SETUP GAINS THE DELIVERY AND ITS `entries`** (`docs/L3/view-record/delivery.md` §7): the one registration this
    // crossing is allowed is taken by the construction, so a fixture that kept registering by hand would be measuring the
    // copy `D-129` forbids — and would also fire twice on every write.
    const { delivery, sunk } = deliveryFor()
    const store = createProfileStore({
      filePath: path,
      constraints: batchOf(() => bound.current) as never,
      listeners: [...delivery.entries],
    })
    bound.current = store as unknown as ViewRecordStore
    const record = createViewRecord({ store: bound.current, delivery })
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    // **THE SINK AND THE SUBSCRIBER ARE TWO READINGS OF ONE EVENT** (§3): the queue `src/main/main.ts` keeps is the sink's,
    // so a store that fired the entry without fanning out — or fanned out without the sink — would red one of the two
    // figures below rather than passing both.
    let queued = sunk.length
    expect(record.commitZones(ZONE, { size: 160, display: 'normal' }).status).toBe('committed')
    expect(
      delivered,
      'ONE ROUTE CALL, TWO SUPPLIED MEMBERS, TWO DELIVERIES: `commitZones` writes one leaf per member — `size`, then `display` — so the act lands as two states and each is a change the pair admits (D-151)',
    ).toBe(2)
    expect(sunk.length - queued, 'and the sink was handed exactly the same two addresses, never one per family').toBe(2)
    expect(record.commitZones(ZONE, { slot: 'doc-nav' }).status).toBe('committed')
    expect(delivered, 'a second act, supplying one member and so writing one leaf, and the count is a count rather than a flag').toBe(3)
    // THE CONTROL: a write that touches NOTHING this module binds. A listener the store never wired would also answer 0
    // here, which is why the row does not end on the zero.
    ;(store as unknown as { write: (a: unknown, t: string, v: unknown) => unknown }).write(['elsewhere'], 'mem', { x: 1 })
    expect(delivered, 'a write at another address delivers nothing').toBe(3)
    queued = sunk.length
    expect(record.commitZones(ZONE, { size: 200 }).status).toBe('committed')
    expect(delivered, 'and the same subscription still delivers — the zero above was about the address').toBe(4)
    expect(sunk.length - queued, 'the sink agrees, so neither reading can be the only one alive').toBe(1)
    off()
    queued = sunk.length
    expect(record.commitZones(ZONE, { size: 210 }).status, 'the withdrawal leaves the route working').toBe('committed')
    expect(delivered, 'and nothing more is delivered to a withdrawn subscription').toBe(4)
    // **AND THE WITHDRAWAL IS LOCAL, WHICH IS THE HALF `D-219` MOVED** (§3): it drops that one handler and runs no store verb,
    // so the construction's adopted entry still delivers to the sink — the arm that reds if the local removal were rewired
    // onto `unlisten`.
    expect(sunk.length - queued, 'the construction\'s registration stands after a local release: the sink is still told').toBe(1)
  })

  it('Z-4 · AND THE SHAPE REFILLS ON THE DELIVERY: **the construction-adopted entry is the ONE registration and the surface takes none** (`D-219`), so the crossing\'s sink is what the main process broadcasts, and the client\'s re-read REPLACES the family whole — the renderer reads a zone it never asked the store for', async () => {
    const path = join(dir, PROFILE_FILE)
    const bound: { current: ViewRecordStore | null } = { current: null }
    // **THE SETUP GAINS THE DELIVERY AND ITS `entries`, AND LOSES `surface.attach()`** (`docs/L3/view-record/delivery.md`
    // §4, §7): the two surface members are gone with their subject — *"take the one subscription so the window's teardown
    // can withdraw exactly what it took"* — and what they measured (one committed change, one push) is the SINK's reading
    // now, because that is where `src/main/main.ts`'s fan-out loop stands.
    let pushes = 0
    const viewDelivery = createViewDelivery(() => {
      pushes += 1
    })
    const store = createProfileStore({
      filePath: path,
      constraints: batchOf(() => bound.current) as never,
      listeners: [...viewDelivery.entries],
    })
    bound.current = store as unknown as ViewRecordStore
    const surface = createViewSurface({ store: bound.current, delivery: viewDelivery })
    expect(Object.keys(surface).sort(), 'the surface exposes its SIX routes and no subscription member').toEqual([
      'clearDrag',
      'commitDrag',
      'commitPane',
      'commitTheme',
      'commitZones',
      'read',
    ])
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
    expect(client.zoneOf(ZONE), 'the boot read answers the declared zone at its ONE declared default figure (`D-233`) — a client that read a memberless zone here would paint a strip of no extent').toEqual({
      id: ZONE,
      size: DECLARED_DEFAULTS.find((entry) => entry.id === ZONE)?.size,
    })
    let refills = 0
    const subscription = client.subscribe(() => {
      refills += 1
    })
    expect(subscription.subscribed, 'one registration over the member\'s one push').toBe(true)
    expect(handlers.length, 'and exactly one').toBe(1)
    // THE WRITE LANDS AT THE ROUTE, the construction's delivery reaches the sink, and the delivery re-reads.
    // **THE FIGURE IS A DELTA AND NOT AN ABSOLUTE**: the construction has already delivered once per family its repairs
    // wrote (`D-219`), so a row reading the sink's total would be counting the BOOT's deliveries as this act's.
    const queued = pushes
    expect(surface.commitZones(ZONE, { size: 240, display: 'normal', slot: 'doc-nav' }).status).toBe('committed')
    expect(
      pushes - queued,
      'the crossing\'s one registration becomes ONE push per landed change — and this act supplies THREE members, so three leaf writes and three pushes (`D-151`)',
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
    // ── THE WITHDRAWAL HALF RETIRES BY NAME (`D-152`'s shape, `D-9`) ──
    // 'AND `detach()` WITHDRAWS EXACTLY WHAT `attach()` TOOK' drove `surface.detach()` and then a commit that pushed
    // nothing. **BOTH MEMBERS ARE DELETED WITH THEIR SUBJECT** (`docs/L3/view-record/delivery.md` §4, `D-219`): nothing
    // under `src/` calls `detach`, the construction's entry is the instance's for its life, and a `detach` that remained
    // would be a name whose only act is the no-op `D-70` refuses. **What the half measured that STILL EXISTS — a
    // subscriber's own removal silences that subscriber and nothing else — is `Z-3`'s last arm**, which asserts it against
    // the sink, so the claim keeps an owner and this row does not end on a member the tree no longer has.
  })
})

// ═══════════════ CLAUSE 3 — BOOT DATA ═══════════════

describe('view-record · the zone family, clause 3 — a `mem` family is re-minted at every boot and the profile carries no byte of it', () => {
  it('Z-5 · TWO SUCCESSIVE BOOTS: boot two is handed the address ABSENT, its repair mints every declared zone at its declared default size again, and NOT ONE BYTE of the family reaches the profile — measured at the pair\'s own context and in the file\'s own text', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    expect(one.read().source.zones).toBe('record')
    // A CALLER'S FACT, WRITTEN IN BOOT ONE — the thing a `file` family would carry forward and this one provably cannot.
    const recordOne = createViewRecord({ store: one.store, delivery: one.delivery })
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
    // **BOOT TWO ADOPTS ITS OWN DELIVERY'S ENTRIES BECAUSE THE BOOT HAS ONE** (`D-219`): the row's subject is the pair, and
    // the listener is the shape the construction carries rather than a destination this row reads.
    const bootTwoDelivery = deliveryFor().delivery
    const two = createProfileStore({
      filePath: path,
      constraints: wrapped as never,
      listeners: [...bootTwoDelivery.entries],
    })
    bound.current = two as unknown as ViewRecordStore
    expect(seen.length, 'the engine ASKS the zone pair at the creation instant — a pair the batch does not carry is asked nowhere, and this row reds on that revert').toBeGreaterThan(0)
    expect(seen[0], 'boot two is handed NOTHING at the zone root: a `mem` value never came from a file').toBeUndefined()
    expect(seen[seen.length - 1], 'and the registration\'s own RE-RUN reads the family the repair landed — every DECLARED id at its declared default size (`D-151`, `D-233`)').toEqual(FOUR_EMPTY)
    const readTwo = createViewRecord({ store: bound.current, delivery: bootTwoDelivery }).read()
    expect(readTwo.zones, 'so boot two answers the FOUR declared zones at their declared default sizes — boot one\'s `top` 160 did not survive, and cannot').toEqual(FOUR_STANDING)
    expect(readTwo.source.zones, 'because a repair put it there, at this boot as at the last').toBe('record')
    const bytesAfterTwo = readFileSync(path, 'utf8')
    expect(bytesAfterTwo.includes('zones'), 'not one byte of the family reached the profile: not the root\'s name').toBe(false)
    // **AND NOT A ZONE ID EITHER — READ AS A KEY, WHICH IS WHAT MOVED THIS CLAUSE AND WHY** (`D-181`, `D-192`): this row
    // asked `includes('zone-1')` while the ids were words no other family spelled, and `top` is now ALSO the value of
    // `pane-menus`'s own `zone` member — a byte the `panes` family legitimately carries in this profile. So the instrument
    // is the one that still measures what the clause claims: no declared id stands as a KEY anywhere in the file.
    const keys: string[] = []
    const collectKeys = (node: unknown): void => {
      if (node === null || typeof node !== 'object') return
      if (Array.isArray(node)) {
        for (const entry of node) collectKeys(entry)
        return
      }
      for (const [key, value] of Object.entries(node)) {
        keys.push(key)
        collectKeys(value)
      }
    }
    collectKeys(JSON.parse(bytesAfterTwo) as unknown)
    for (const id of DECLARED) {
      expect(keys.includes(id), `no declared zone id stands as a key in the profile: '${id}' reached no zone address`).toBe(false)
    }
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
    // THE WRITERS, ENUMERATED: TWO caller routes write a whole family at its ROOT — the appearance act and the drag move
    // — while the ZONE route writes ONE LEAF PER SUPPLIED MEMBER, at `[VIEW_ZONES_ADDRESS[0], id, member]`, and the ONE
    // repair path writes through `writeJoinedAt`, so a third root write (or a repair that reached the store directly)
    // reds the census below.
    // **THE CENSUS IS THE MODULE'S AND NOT THE ZONE FAMILY'S** — which is exactly what it is for — and its history is the
    // measurement: it read `three` when the focus route left with its family (`D-142`, `D-9`), then FOUR when the drag
    // family's own route arrived writing a whole value at `['drag']` at `temp` (`D-132`, L2 §8's hunks 1–3), read THREE
    // at `D-152` because the ZONE route's whole-family write went with `composeZones` (`D-151`, `D-139`), and reads TWO at
    // this head because the PANE route's whole-family write goes with `composePanes` — the same removal, one family over
    // (`D-138`, `D-151`). **THE SENTENCE THAT STOOD HERE — *"exactly THREE routes write a whole family"* — WAS TRUE OF A
    // TREE IN WHICH THE PANES ROUTE WAS ONE OF THEM, AND IT IS FALSE AT THIS HEAD**: the count and the sentence move
    // together, because a figure re-grained alone would leave this row describing a module that no longer exists.
    // **THE CLEAR IS NOT COUNTED HERE AND THAT IS THE MEASUREMENT**: it is a `delete` at the family's own tier, so it is a
    // WRITE PATH and not a whole-family `write` — asserting the count alone would let the clear land as an empty-family
    // write, which is the placeholder `D-132`'s ruling refuses.
    expect(
      (module.match(/\.write\(VIEW_/g) ?? []).length,
      'exactly TWO routes write a whole family at its root — the appearance act and the drag move — and NEITHER paired geometry family is one of them, the zone route writing LEAVES and the pane route writing LEAVES',
    ).toBe(2)
    expect(/\.delete\(VIEW_DRAG_ADDRESS, DRAG_TIER/.test(module), 'and the drag family\'s fifth path ENDS the reading rather than writing a placeholder').toBe(true)
    expect((module.match(/writeJoinedAt\(/g) ?? []).length, 'and the ONE repair path names its commit at exactly one call site').toBe(1)
    // **AND THE ZONE FAMILY'S TWO WRITERS ARE ITS LEAVES AND ITS ONE REPAIR** (`D-151`, `D-82` clause 4): NO whole-family
    // write at the zone root remains in the module — `composeZones` left, so a root write here would be the composer
    // rebuilt under this route's name — and the route's leaf is the one `[VIEW_ZONES_ADDRESS[0], id, member]` form, which
    // is what a caller's member lands at, while the repair keeps writing the whole family through `writeJoinedAt`.
    expect(/\.write\(VIEW_ZONES_ADDRESS, ZONES_TIER/.test(module), 'no whole-family write at the zone root remains in the module').toBe(false)
    expect(/\[VIEW_ZONES_ADDRESS\[0\] as string, id, member\]/.test(module), 'and the zone route writes ONE LEAF PER SUPPLIED MEMBER at that form').toBe(true)
    // **AND THE PANE FAMILY'S, THE SAME PAIR OF ASSERTIONS ONE FAMILY OVER** (`D-138`, `ASM-13`): the census above states
    // how many ROOT writes stand and which routes are not among them; this pair states WHICH FORM took the pane route's
    // root write's place, so a `commitPane` that went back to composing the family — or one that stopped writing at all —
    // reds here rather than passing a count that only says "not a root write". The form is the module's own:
    // `[VIEW_PANES_ADDRESS[0], id, member]`, one leaf per supplied member, `size` then `bounds`.
    expect(/\.write\(VIEW_PANES_ADDRESS, PANES_TIER/.test(module), 'no whole-family write at the pane root remains in the module either: `composePanes` is DELETED WHOLE').toBe(false)
    expect(/\[VIEW_PANES_ADDRESS\[0\] as string, id, member\]/.test(module), 'and the pane route writes ONE LEAF PER SUPPLIED MEMBER at that form, the zone route\'s form one family over').toBe(true)
    // AND THE ROUTE HAS A HANDLER AT THE BRIDGE'S OWN SITE, which is what makes it an IPC route rather than a member
    // nothing calls — the defect L2's central-data §2 records against such a member.
    expect(main.includes('ipcMain.handle(IPC_VIEW_ZONES_COMMIT'), 'the zone route is registered at the boot').toBe(true)
    expect(IPC_VIEW_ZONES_COMMIT, 'and it is one of the module\'s single-sourced channel names').toBe('provident:view:zones-commit')
    expect(IPC_VIEW_CHANGED, 'and the push is the same one the other surviving families deliver on').toBe('provident:view:changed')
  })

  it('Z-7 · NO WRITE ON READ, MEASURED BOTH WAYS: three reads land no byte over a standing family, and a read over a store whose batch NEVER RAN answers the empty family WITHOUT minting it', () => {
    const path = join(dir, PROFILE_FILE)
    const one = boot(path)
    const record = createViewRecord({ store: one.store, delivery: one.delivery })
    expect(record.commitZones(ZONE, { size: 175 }).status).toBe('committed')
    // A `mem` family cannot show bytes, so the instrument is the JOURNAL's own ordinal: a read that wrote would move it.
    const before = (one.store as unknown as { write: (a: unknown, t: string, v: unknown) => { op?: { seq?: number } } }).write(['elsewhere'], 'mem', { x: 1 }).op?.seq
    // **THE SIBLINGS ARE AT THEIR DECLARED DEFAULTS AND THE CALLER'S ZONE IS AT THE CALLER'S FIGURE** (`D-233`): the route
    // writes ONE LEAF at `['zones', top, 'size']`, so the three ids it never named keep the record the creation repair
    // wrote — the declared default each — and none of them is dropped, re-minted or re-figured by the act or by the reads.
    const written = [
      ...DECLARED_DEFAULTS.filter((entry) => entry.id !== ZONE).map((entry) => ({ id: entry.id, size: entry.size })),
      { id: ZONE, size: 175 },
    ]
    for (let n = 0; n < 3; n += 1) expect(record.read().zones, 'the family the caller wrote is what a read answers, and its three siblings stand at their declared default sizes beside it').toEqual(written)
    const after = (one.store as unknown as { write: (a: unknown, t: string, v: unknown) => { op?: { seq?: number } } }).write(['elsewhere'], 'mem', { x: 2 }).op?.seq
    expect(typeof before === 'number' && typeof after === 'number' ? after - before : null, 'three reads landed NO op: the journal moved by exactly the one write between the two probes').toBe(1)
    one.close()

    // HALF TWO — A STORE WHOSE BATCH NEVER RAN: the only place the family can be absent while a record reads it.
    const barePath = join(dir, 'bare.json')
    const bare = createProfileStore({ filePath: barePath })
    const overBare = createViewRecord({ store: bare as unknown as ViewRecordStore, delivery: deliveryFor().delivery }).read()
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
    const record = createViewRecord({ store: one.store, delivery: one.delivery })
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
    const record = createViewRecord({ store: one.store, delivery: one.delivery })
    expect(record.commitZones(ZONE, { size: 160, display: 'normal', slot: 'doc-nav' }).status).toBe('committed')
    expect(record.commitZones(ZONE, { size: 240 }).status, 'the size alone').toBe('committed')
    expect(record.read().zones, 'the members the family stood at survive the narrower act — and with FOUR declared ids the sibling half has a subject again: the three zones this act did not name stand at their declared default sizes beside it').toEqual([
      ...DECLARED_DEFAULTS.filter((entry) => entry.id !== ZONE).map((entry) => ({ id: entry.id, size: entry.size })),
      { id: ZONE, slot: 'doc-nav', size: 240, display: 'normal' },
    ])
    // ── THE RETIRED HALF, RECORDED WITH ITS REASON (this corpus's habit, `D-142`'s style, `D-9`) ──
    // 'AND A SIBLING ZONE SURVIVES' drove `commitZones('zone-2', { slot: 'main', distance: 40 })` and read the TWO zones
    // back: the composer carried every SIBLING zone along, because one whole-family write at the root replaces the family
    // and nothing else would have preserved it. **THE HALF HAD NO SUBJECT WHILE THE DOMAIN HELD ONE ID** (`D-151`: the
    // closure was `DECLARED_ZONE_IDS` = `DEFAULT_ZONE_ID` alone), **AND IT HAS ONE AGAIN AT FOUR** (`D-181`, `D-192`): the
    // expectation above now reads the three zones this act never named standing beside the one it did, which is the
    // sibling-preservation claim measured at the four-id domain — and it is a LEAF WRITE's guarantee rather than the
    // composer's, because `commitZones` writes one leaf per supplied member and no copy of the family is taken at all.
    // The composer's sibling loop stays DELETED (`D-139`, `D-151`): work a leaf cannot need. **So the arm below still
    // asserts the REFUSAL — a well-formed id outside the four is refused at the route's domain seat, before any store
    // verb — and the sibling half is no longer a separate act because every row here now carries it.**
    expect(
      record.commitZones('zone-2', { slot: 'main', distance: 40 }),
      'a well-formed id this record does not declare is REFUSED before any store verb: the closure at the route\'s seat',
    ).toMatchObject({ status: 'refused', reason: UNDECLARED_ZONE_REASON, address: ['zones', 'zone-2'] })
    expect(record.read().zones, 'and nothing the refused act named reached the family: the declared zone stands exactly as it stood, and its three siblings stand at their declared defaults beside it').toEqual([
      ...DECLARED_DEFAULTS.filter((entry) => entry.id !== ZONE).map((entry) => ({ id: entry.id, size: entry.size })),
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
    const { delivery, sunk } = deliveryFor()
    const store = createProfileStore({
      filePath: path,
      constraints: batchOf(() => bound.current) as never,
      listeners: [...delivery.entries],
    })
    bound.current = store as unknown as ViewRecordStore
    const record = createViewRecord({ store: bound.current, delivery })
    expect(record.commitZones(ZONE, { size: 160 }).status).toBe('committed')
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    const queued = sunk.length
    const receipt = (bound.current as unknown as { delete: (a: unknown) => { triggered?: readonly { handle: string }[] } }).delete(VIEW_ZONES_ADDRESS as never)
    expect(delivered, 'the delete is ONE committed change, its repair\'s joined write being no second delivery').toBe(1)
    // **AND THE SINK WAS TOLD EXACTLY ONCE, WHICH IS THE SAME EVENT READ AT THE CROSSING'S DELIVERY** (`D-219`): the pair is
    // asked and the adopted listener delivered INSIDE ONE commit, so `main()`'s queue holds ONE address and the arm emits
    // ONE push. A repair that opened a second commit — or a fixture that took a second registration — would red this figure
    // while the subscriber's counter stayed at 1.
    expect(sunk.length - queued, 'the delete delivered ONE address to the sink: its repair\'s joined write is no second delivery').toBe(1)
    expect((receipt.triggered ?? []).map((entry) => entry.handle)).toContain(VIEW_ZONES_MUST_STAND_ID)
    expect(record.read().zones, 'and the family stands again, at the placeholder that names every DECLARED zone at its declared default size — the caller\'s 160 does not survive a DELETE of the root, which is what makes this the LANDING arm and not a merge').toEqual(FOUR_STANDING)
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
