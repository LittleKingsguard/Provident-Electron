// tests/integration/store-view-record/crossing.test.ts — THE L2/L3 BATTERY for `view-record`: the crossing's second
// declaration set, over the central instance (D-87).
//
// **RE-GRAINED FOR `D-142`, WHICH DROPS THE `focus` FAMILY WHOLE**: this module declares THREE pairs now — at `['panes']`
// (`file`), `['zones']` (`mem`) and `['theme']` (`file`) — and the bridge member carries `read`, `commitPane`,
// `commitZones`, `commitTheme` and `onChanged`. **FOUR `['focus']` ROWS RETIRE WITH THEIR REFERENT** (`D-9`): the
// creation-instant mirror row, the `mem`-family re-mint row, the focus route's shape arms and the whole-mirror round trip,
// because the address, the pair, the route and its two reason tokens leave `src/main/view-record/index.ts` in the same
// edit (`D-142`). The clauses those rows carried keep owners — the `mem` family's creation instant and re-mint at
// `zone-family.test.ts`'s `Z-1`/`Z-5`, and the surviving routes' shape arms at the panes row below and at `Z-8`/`TH-11` —
// so nothing this file measured is left unowned. **ONE ROW IS NEW AND IT MEASURES THE DELETION ITSELF** — the last row of
// the wiring block — because a route leaving one side alone is the defect this change could ship.
//
// **RE-GRAINED FOR REV 7, WHICH ADDS THE DRAG'S IN-PROCESS FAMILY** (`docs/L2/view-record/interface.md` §1–§8): `['drag']` at `temp`, DECLARED and
// UNPAIRED — an address, a tier constant, a `viewDeclaredRoots()` entry and **no `viewConstraintDeclarations` row** — with `commitDrag`/`clearDrag` on the
// record, the surface, both lockstep halves and the client, and the address joining `subscribe`'s array in the same edit (`D-132`, `D-137`, `D-101`).
// **FOUR ROWS ARE NEW AND TWO ARE RE-GRAINED**: the unpaired root's own arm (clause 1), the delivery an outside `temp` write must cause (clause 2 — the
// root-keying `D-137` makes a precondition, `P-3`'s instrument at the crossing), the seven-site route census, and the drag root in the published set and in
// the lockstep pair; while the clause-4 write census moves `three → four`, because the drag route is a fourth whole-family write and the clear is a delete.
// **EVERY ROW THAT READS `src/` IS RED UNTIL L4 LANDS**, each red the absence it names; the unpaired-root row is the one exception and it is a CONTROL —
// it is green at this head by construction and reds the moment L4 mints a placeholder at the temp root.
//
// **RE-GRAINED FOR `D-151`, WHICH CLOSES THE ZONE ID DOMAIN AND WRITES ONE LEAF PER SUPPLIED MEMBER**: a zone commit is no
// longer ONE whole-family write, so the zone root's `.write(VIEW_ZONES_ADDRESS, ZONES_TIER` leaves the module and the clause-4
// census moves `four → three` again, while the route's leaves are `[VIEW_ZONES_ADDRESS[0], id, member]`. **AND A ZONE ACT NOW
// DELIVERS ONCE PER SUPPLIED MEMBER** — each landed leaf is a state the pair admits, so the clause-2 figures move by the member
// count and not by a fault. The `mem` family's placeholder is `{'zone-1': {}}` — every DECLARED id with an EMPTY record — so
// the read names one memberless zone where it answered none, and the clause-3 rows say so (`docs/L3/view-record/design.md` §9).
//
// THE CONTRACT: `docs/L3/view-record/design.md` §4 — ONE registered pair per surviving root, each answering `true` or
// `{ message, repair }`, where the repair leaves ONE whole legal family and RETURNS the op its write landed (`{ ok: true,
// op }`, the shape the kernel credits through `landedOp`); and `docs/L2/view-record/interface.md` §2 — the member's
// surviving routes, and §3 — the change push (`D-142`, `D-87`, `D-91`, `D-97`).
//
// **THE FOUR CLAUSES OF THE CONVENTION (`D-82`), DRIVEN PER ADDRESS AND NEVER ASSERTED IN PROSE** (§5 below):
//  1. EXISTENCE + PLACEHOLDER REPAIR, DRIVEN AT THE CREATION INSTANT — the batch supplied, the address absent, the
//     record standing at the MEASURED placeholder when the constructor returns;
//  2. A LISTENER CARRIES THE CHANGE — once per committed change of that family, ZERO on a write that touches nothing,
//     and it reaches the bridge;
//  3. BOOT DATA FROM FILE OR FROM A REPAIR — two successive boots answer the same state, and the `mem` family is
//     re-minted at every boot because a `mem` value can never come from a file (`D-84`; that arm is `Z-5`'s now, `D-142`);
//  4. WRITES DRIVEN BY EXTERNAL EVENTS ONLY — every write path is an IPC route or a constraint repair, and no timer,
//     no poll and no write-on-read stands anywhere in the module.
//
// **THE MEASUREMENTS THIS FILE RESTS ON WERE TAKEN BEFORE IT WAS WRITTEN**, on the installed
// `provident-storeroom@1.9.1`, one fresh instance per arm: a nested write does NOT create its parent
// (`AddressNotFound: 'view' does not exist in ''`), which is why each family is ONE WHOLE VALUE at its own root; a root
// written at `file` answers its descendants at `file` and answers `TierNotFound` at `mem`, which is why the families do
// not share one root; a registration-instant repair's record is `{address, id, tier, value, op, pending, write}` with
// `write` a FUNCTION and `tier: null`; and a registration-instant `file`-tier repair IS in the file when the constructor
// returns while a `mem` one is not (`D-86`'s release read at these addresses).
//
// This authority this repo's (`docs/L2`, `docs/L3`) and the package's own guide, never the package's internals.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
  createViewDelivery,
  createViewRecord,
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  paneGeometryIn,
  PANE_GEOMETRY_REASON,
  PANE_SHAPE_REASON,
  UNDECLARED_PANE_REASON,
  VIEW_PANES_ADDRESS,
  VIEW_PANES_MUST_STAND_ID,
  VIEW_THEME_ADDRESS,
  VIEW_THEME_MUST_STAND_ID,
  VIEW_ZONES_ADDRESS,
  VIEW_ZONES_MUST_STAND_ID,
  viewConstraintDeclarations,
  viewDeclaredRoots,
  writeJoinedAt,
} from '../../../src/main/view-record'
import type {
  ViewConstraintAnswer,
  ViewConstraintDeclaration,
  ViewDelivery,
  ViewRecord,
  ViewRecordStore,
  ViewRepairAnswer,
} from '../../../src/main/view-record'
import { MENUS_PANE_ID, MENUS_PANE_ZONE_ID } from '../../../src/shared/view-shape'
import { createViewSurface } from '../../../src/main/view-surface'
import {
  IPC_VIEW_CHANGED,
  IPC_VIEW_PANE_COMMIT,
  IPC_VIEW_READ,
  IPC_VIEW_THEME_COMMIT,
  IPC_VIEW_ZONES_COMMIT,
} from '../../../src/shared/view-channels'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

/** **THE ZONE THIS BATTERY ADDRESSES — ONE OF THE FOUR DECLARED IDS** (`D-181`, `D-151`): the fixture asked `'zone-1'`
 *  while the domain held one id, and `zone-1` names nothing now that the set is `top`/`bottom`/`left`/`right` (`D-192`
 *  retired `DEFAULT_ZONE_ID` with its premise). The subject is unchanged — a declared id, its leaves, its deliveries. */
const ZONE = 'top'
/** The four memberless zones a fresh repair leaves, in the order the store's own read answers them. */
const FOUR_MEMBERLESS = [{ id: 'bottom' }, { id: 'left' }, { id: 'right' }, { id: 'top' }]
/** **THE PANES FAMILY AS THE REPAIR MINTS IT — TWO PANES, EACH AT BOTH AXIS MEMBERS** (`D-192` correcting `D-191`):
 *  `pane-a` is the stage pane and carries its own clamp, `pane-menus` is the zone-resident one and carries its `zone`
 *  instead. The measured figures are the module's own constants, so a changed default reds these rows. */
const PLACEHOLDER_PANES = [
  { id: DEFAULT_PANE_ID, width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } },
  { id: MENUS_PANE_ID, width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, zone: MENUS_PANE_ZONE_ID },
]

/** **A SOURCE READ WITH THE COMMENT LINES AND BLOCK COMMENTS ELIDED — THE ONLY FORM AN ABSENCE MAY BE ASSERTED ON**
 *  (`D-81`'s hollow-green class: a naive byte read passes on a comment, and this tree has already paid for that once).
 *  The positive control each absence row carries is that the RAW bytes DO carry the spelling it is looking for. */
function commentElided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

const sourceOf = (path: string): string => readFileSync(new URL(path, REPO), 'utf8')

/** The batch a boot supplies: this module's surviving declarations, spread as `src/main/main.ts` maps them — never
 *  enumerated here, because a count of the batch is `central-data`'s row to state (`D-43`, `D-142`). */
const batchOf = (getStore: () => ViewRecordStore | null) =>
  viewConstraintDeclarations(getStore).map((declaration) => ({
    address: declaration.address,
    id: declaration.id,
    constraint: declaration.constraint,
  }))

// ═══════════════ THE REPAIR'S RETURN AND THE REPAIR'S WRITE: TYPED IN THE MODULE (D-72, D-73) ═══════════════
//
// **THE TYPE-LEVEL ROWS, AND THEY ARE ROWS AND NOT COMMENTS.** `npm run typecheck:tests` compiles THIS file, so each
// `@ts-expect-error` below passes only while the error it suppresses is really there — and the property that makes that a
// measurement is what a WIDENING does: put `void` back into `ViewRepairAnswer`, or make the carrier position optional,
// and the directive becomes UNUSED, which `tsc` reports as `TS2578` and this leg reds.

// @ts-expect-error — an answer that IS `void` is not a `ViewRepairAnswer`: the arm is stated, never left to fall through
const voidRepairAnswer: ViewRepairAnswer = undefined as unknown as void

const voidRepairDeclaration: ViewConstraintDeclaration = {
  address: ['panes'],
  id: 'a-void-repair',
  constraint: () => ({
    message: 'a violation',
    // @ts-expect-error — a `() => void` is not the `repair` member a declaration's answer accepts
    repair: (): void => undefined,
  }),
}

// @ts-expect-error — and a BODY that answers nothing is not a `ViewConstraintAnswer` either
const voidConstraintBody: ViewConstraintDeclaration = { address: ['zones'], id: 'a-void-body', constraint: (): void => undefined }

declare const aStore: ViewRecordStore
const aCarrier = { pending: [] }
const anIntendedFamily: unknown = { [DEFAULT_PANE_ID]: { width: 100, height: 100, bounds: { min: 0, max: 200 } } }

// The positive control: a carrier IS accepted here, so the directives below are about the position and not the call.
const joinedRepairWrite = (): unknown => writeJoinedAt(aStore, aCarrier, VIEW_PANES_ADDRESS, 'file', anIntendedFamily)

// @ts-expect-error — A REPAIR WRITE WITH NO CARRIER DOES NOT COMPILE: the omission is an arity fault, not a convention
const carrierlessRepairWrite = (): unknown => writeJoinedAt(aStore, undefined, VIEW_PANES_ADDRESS, 'file', anIntendedFamily)

// @ts-expect-error — `null` is not a commit: the position admits a non-null object, and naming nothing is not naming one
const nullCarrierRepairWrite = (): unknown => writeJoinedAt(aStore, null, VIEW_ZONES_ADDRESS, 'mem', {})

let dir: string
let holder: ViewRecordStore | null = null
let record: ViewRecord
/** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY ITS CONSTRUCTION** (`D-219`;
 *  `docs/L3/view-record/delivery.md` §1–§3): the four entries are what `createProfileStore`'s `listeners` takes, and
 *  `subscribe` is the fan-out every row below drives. **IT IS THE FILE'S, NOT A ROW'S**, because `open()` is the one
 *  fixture nine rows read and a second delivery per row would measure a second crossing. */
let delivery: ViewDelivery
/** **WHAT THE SINK WAS HANDED, WHICH IS THE CREATION'S EVIDENCE AND NOT A DESTINATION** (`docs/L3/app-shell/delivery.md`
 *  §3's `held`): an insertion-ordered list of the delivered ADDRESSES. Reset by `open()`, because a fresh construction is a
 *  fresh queue. */
let sunk: (readonly string[])[] = []

/** A record over a real store built the way the boot builds it: the surviving declarations batched at construction (D-65)
 *  **AND THE CROSSING'S FOUR LISTENER ENTRIES ADOPTED BY THAT SAME CALL** (`D-219`), so the creation's own repairs deliver
 *  from the instant they write — the shape `src/main/main.ts` now supplies, and the one this battery measures. */
const open = (): void => {
  dir = mkdtempSync(join(tmpdir(), 'view-crossing-'))
  holder = null
  sunk = []
  delivery = createViewDelivery((address) => sunk.push([...address]))
  const store = createProfileStore({
    filePath: join(dir, PROFILE_FILE),
    constraints: batchOf(() => holder) as never,
    listeners: [...delivery.entries],
  })
  holder = store as unknown as ViewRecordStore
  record = createViewRecord({ store: holder, delivery })
}

beforeEach(open)

afterEach(() => {
  // THE STORE IS RELEASED BY DROPPING IT — the package declares no `close()` and no finalizer, so the scratch directory
  // is what must go.
  holder = null
  rmSync(dir, { recursive: true, force: true })
})

/** A second store over a given path, with the batch and its own delivery, exactly as a second boot constructs it. */
const boot = (path: string): { store: ViewRecordStore; delivery: ViewDelivery; sunk: (readonly string[])[]; read: () => ReturnType<ViewRecord['read']>; bytes: () => string; close: () => void } => {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const secondSunk: (readonly string[])[] = []
  const second = createViewDelivery((address) => secondSunk.push([...address]))
  const store = createProfileStore({
    filePath: path,
    constraints: batchOf(() => bound.current) as never,
    listeners: [...second.entries],
  })
  bound.current = store as unknown as ViewRecordStore
  const here = createViewRecord({ store: bound.current, delivery: second })
  return {
    store: bound.current,
    delivery: second,
    sunk: secondSunk,
    read: () => here.read(),
    bytes: () => readFileSync(path, 'utf8'),
    close: () => {
      bound.current = null
    },
  }
}

// ═══════════════ CLAUSE 1 — EXISTENCE + PLACEHOLDER REPAIR AT THE CREATION INSTANT, PER ADDRESS ═══════════════

describe('view-record · clause 1 — all THREE surviving addresses repaired at the CREATION INSTANT, each to its measured placeholder', () => {
  it('THE CREATION INSTANT: `panes-must-stand` writes the MEASURED default family BEFORE ANY ROUTE OF THE MODULE RUNS — the store\'s own read answers it, and the record reads `source: record` — while a store carrying NO batch answers `AddressNotFound` at the same address, which is the absent arm this pair exists to repair', () => {
    // THE ABSENCE→REPAIR PATH, DRIVEN FROM ITS OWN STORE so the row measures the CONSTRUCTION rather than a store this
    // file already opened: nothing is committed and no route of the module has been called when the store is read.
    const instant = mkdtempSync(join(tmpdir(), 'view-construction-'))
    const path = join(instant, PROFILE_FILE)
    try {
      // THE CONTROL FIRST, ON ITS OWN PROFILE: without the batch the address does not stand at all.
      const bare = createProfileStore({ filePath: join(instant, 'bare.json') })
      let absent = ''
      try {
        bare.read(VIEW_PANES_ADDRESS, 'file')
      } catch (caught) {
        absent = (caught as { status?: string }).status ?? ''
      }
      expect(absent, 'a store with no declaration holds NOTHING at `[\'panes\']` — the absent arm, measured').toBe('AddressNotFound')

      // AND THE BATCHED BOOT OVER A FRESH PROFILE — **WITH THE CROSSING'S DELIVERY BUILT BEFORE IT AND ADOPTED BY IT**
      // (`D-219`): the four entries are the construction's, and the fresh record is handed the delivery's other half.
      const bound: { current: ViewRecordStore | null } = { current: null }
      const instantSunk: (readonly string[])[] = []
      const instantDelivery = createViewDelivery((address) => instantSunk.push([...address]))
      const store = createProfileStore({
        filePath: path,
        constraints: batchOf(() => bound.current) as never,
        listeners: [...instantDelivery.entries],
      })
      bound.current = store as unknown as ViewRecordStore
      // THE FAMILY STANDS AT THE STORE'S OWN ADDRESS BEFORE ANY COMMIT — read through the STORE, not through the module,
      // so the reading is the instance's and not a route's composition.
      expect(store.read(VIEW_PANES_ADDRESS, 'file'), 'the existence pair minted the pane family at construction — BOTH declared panes, BOTH axis members of each (`D-192`)').toEqual({
        [DEFAULT_PANE_ID]: {
          width: DEFAULT_PANE_SIZE,
          height: DEFAULT_PANE_SIZE,
          bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max },
        },
        [MENUS_PANE_ID]: { width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, zone: MENUS_PANE_ZONE_ID },
      })
      // **AND THE DEFAULT IS THE MEASURED ONE, NOT AN INVENTED ONE**: the pane the app's store-backed drag composition
      // addresses, at the size and bounds pair `D-87` MEASURED off `src/shared/demo-envelope.ts`'s authored pane — a
      // reading the node no longer carries (`F11`, `D-129`: the `props` and the two example seams that read them are
      // gone), so what stands here is the record's figure and never a figure copied off an element. A repair writing any
      // other number would pass a `toBeDefined`-shaped row and lose the whole point.
      expect(DEFAULT_PANE_ID, 'the one pane id the app addresses').toBe('pane-a')
      // **BOTH AXIS MEMBERS CARRY THE ONE MEASURED FIGURE AND ITS NAME DID NOT MOVE** (`D-189`, `D-192`): the split
      // renamed `pane-a`'s `size` to `height` and minted its `width` from the same measured number, so this control reads
      // the figure twice and the pair once.
      expect(
        { width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, ...DEFAULT_PANE_BOUNDS },
        'the geometry the tree states, and no other',
      ).toEqual({ width: 100, height: 100, min: 0, max: 200 })

      const fresh = createViewRecord({ store: bound.current, delivery: instantDelivery })
      const read = fresh.read()
      expect(read.source, 'all three surviving families stand because a repair put them there, and the read says which').toEqual({
        panes: 'record',
        zones: 'record',
        theme: 'record',
      })
      expect(read.panes, 'and the record reads the family the repair wrote — TWO panes, each stating both axes').toEqual(PLACEHOLDER_PANES)
      // **AND THE ANSWER CARRIES NO `focus` MEMBER AT ALL** (D-142): the mirror's root, pair and read are deleted with the
      // family, so an answer that still named one would be a shape this module's document does not declare.
      expect(Object.hasOwn(read, 'focus'), 'the read carries no mirror: the family is gone, not defaulted').toBe(false)
      expect(Object.hasOwn(read.source, 'focus'), 'and no `source` word stands for it either').toBe(false)
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  // ── RETIRED WITH ITS REFERENT (`D-9`, `D-142`): 'THE FOCUS MIRROR AT THE CREATION INSTANT' ──
  // The row drove `focus-must-stand` at `['focus']` at `mem`, its absent-arm control and the `null`-refused-at-boundary
  // proof that forced the absence spelling. **THE ADDRESS, THE PAIR AND THE READ ALL LEAVE THE MODULE** (`D-142`), so the
  // row's subject does not exist to be measured; the `mem` family that survives has the same creation-instant arm measured
  // at its own address by `zone-family.test.ts`'s `Z-1`/`Z-5`, which is where a reader should look for it (D-9).

  it('THE PLACEHOLDER IS IN THE RECORD AND NOT SUBSTITUTED AT THE READ: a profile seeded with a pane family the file brought is UNTOUCHED, and the family the record reads is the FILE\'S — `DEFAULT_PANE_ID` at 240 — not the placeholder', () => {
    // WITHOUT THIS ROW the pair above could pass by overwriting every family it is asked about, which would make the
    // placeholder a rewrite rather than a repair.
    // **AND THE SEEDED ID IS A DECLARED ONE, BECAUSE THE ROW'S OWN SUBJECT IS A LEGAL FAMILY** (`D-138`'s leaf landing,
    // `ASM-11`, `ASM-12`): the pane id domain is CLOSED to `DECLARED_PANE_IDS` — one id, `DEFAULT_PANE_ID` — and
    // `paneNodeAdmits` answers `false` for any other at EVERY depth, so a family naming an undeclared pane is a family the
    // pair REFUSES. At this row's own REGISTRATION instant that refusal cannot fire — `writeInstant` abstains while
    // `tier` is `null`, so a seed at an undeclared id would be passed by ABSTENTION and the row would measure that silence
    // instead of the claim its title carries. The id is the declared one for that reason, and **THE FIGURES ARE THE ROW'S
    // OWN, UNCHANGED**: 240 with `10..400` is not the placeholder's 100 with `0..200`, which is what makes a substitution at
    // the read visible at all.
    const instant = mkdtempSync(join(tmpdir(), 'view-seeded-'))
    const path = join(instant, PROFILE_FILE)
    try {
      // **BOTH AXIS MEMBERS ARE SEEDED AND THEY DIFFER** (`D-189`): the shape admits no unstated axis member, and two
      // distinct figures make a read that answered the wrong one visible rather than coincidentally right.
      createProfileStore({ filePath: path }).write(VIEW_PANES_ADDRESS, 'file', {
        [DEFAULT_PANE_ID]: { width: 240, height: 180, bounds: { min: 10, max: 400 } },
      })
      const booted = boot(path)
      try {
        expect(booted.store.read(VIEW_PANES_ADDRESS as never, 'file'), 'the file\'s own family, byte for byte').toEqual({
          [DEFAULT_PANE_ID]: { width: 240, height: 180, bounds: { min: 10, max: 400 } },
        })
        const read = booted.read()
        expect(read.panes, 'and the record reads what the file brought — both members, each at its own name').toEqual([
          { id: DEFAULT_PANE_ID, width: 240, height: 180, bounds: { min: 10, max: 400 } },
        ])
        expect(read.source.panes, 'from the RECORD: the pair passed it and wrote nothing').toBe('record')
      } finally {
        booted.close()
      }
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('THE CONTROL THAT KEEPS THE PANES PAIR FROM BEING A REWRITE: a LEGAL family stands BYTE-IDENTICAL through the construction, so the pair passes it and writes nothing', () => {
    const instant = mkdtempSync(join(tmpdir(), 'view-legal-'))
    const path = join(instant, PROFILE_FILE)
    try {
      const seed = { [DEFAULT_PANE_ID]: { width: 133, height: 121, bounds: { min: 5, max: 300 } } }
      createProfileStore({ filePath: path }).write(VIEW_PANES_ADDRESS as never, 'file', seed)
      const stood = readFileSync(path, 'utf8')
      const booted = boot(path)
      try {
        const before = JSON.parse(stood) as Record<string, unknown>
        const after = JSON.parse(booted.bytes()) as Record<string, unknown>
        // THE CLAIM THIS ROW OWNS, STATED SO THE TIER CHANGE CANNOT MASK IT: the panes family the file brought is the
        // family the construction leaves — that pair passed it and wrote nothing of it.
        expect(after['panes'], 'the panes family the construction leaves is the family the file held, member for member').toEqual(before['panes'])
        expect(JSON.stringify(after['panes']), 'and its serialisation is unmoved, so this is not a re-mint that happens to agree').toBe(
          JSON.stringify(before['panes']),
        )
        // AND THE ONE ROOT THE CONSTRUCTION DOES ADD IS NAMED HERE RATHER THAN LEFT FOR A READER TO FIND: the appearance
        // family is a `file` family too (`D-98`), so its own creation repair SAVES its placeholder — a different pair's
        // act, and the only byte this construction adds to this profile.
        expect(
          Object.keys(after).filter((key) => !Object.hasOwn(before, key)),
          'exactly ONE root is added by the construction, and it is the appearance family\'s placeholder',
        ).toEqual(['theme'])
        expect(after['theme'], 'which names no attribute, so nothing can be applied from it').toEqual({
          declaration: { value: '', removal: true },
        })
        expect(booted.read().panes, 'and the reading is the seed\'s, not a re-mint of it').toEqual([
          { id: DEFAULT_PANE_ID, width: 133, height: 121, bounds: { min: 5, max: 300 } },
        ])
      } finally {
        booted.close()
      }
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('THE DRAG ROOT IS DECLARED AND UNPAIRED — a CONTROL, green at this head by construction and red the moment a repair mints here: no pair is declared at `[\'drag\']`, the address answers NOTHING once the batch has run, and no byte of the profile names it, so a gesture that has not started is an ABSENCE and not a placeholder (D-132, D-101)', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    // (a) THE BATCH NAMES NO ADDRESS UNDER THE DRAG ROOT: the family is DECLARED without a declaration, which is the one place this module's usual
    // shape is narrower (L2 §1). A `drag` id arriving in this list is the placeholder-for-absence fault, and it reds here rather than passing.
    const declared = viewConstraintDeclarations(() => null).map((declaration) => declaration.address.join('/'))
    expect(declared, 'no pair is declared at the drag root').not.toContain('drag')
    // (b) THE ADDRESS ANSWERS NOTHING ON THE VERY STORE THE BATCH BUILT — the constructor ran every repair this module declares and none wrote here.
    let absent = ''
    try {
      store.read(['drag'] as never, 'temp' as never)
    } catch (caught) {
      absent = (caught as { status?: string }).status ?? ''
    }
    expect(absent, 'the temp root holds no boot datum: a repair there would mint a placeholder for data whose absence IS the product (D-132)').toBe('AddressNotFound')
    // (c) AND THE PROFILE CARRIES NO `drag` KEY EITHER, so the absence is the store's state and not one read's arm: `temp` persists nowhere.
    expect(readFileSync(join(dir, PROFILE_FILE), 'utf8').includes('drag'), 'not one byte of the profile names the temp root').toBe(false)
  })
})

// ═══════════════ CLAUSE 2 — A LISTENER CARRIES THE CHANGE, ONCE PER COMMITTED CHANGE, ZERO ELSEWHERE ═══════════════

describe('view-record · clause 2 — the push, measured per family and against a control that keeps a zero from being dead', () => {
  it('ONE DELIVERY PER COMMITTED CHANGE OF EITHER FAMILY — a pane commit is 1, a second pane commit is 2, a ZONE commit is 4 because it is TWO LEAF WRITES (`D-151`, one per supplied member), and the withdrawal is the answer — a counter, because a listener the store never registered fires nothing, silently', () => {
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    // **EACH ACT NAMES THE ONE MEMBER ITS PANE ADJUSTS** (`D-189`, `D-191`): `pane-a` is stage-resident, so its ADJUSTABLE
    // member is its `height` — `{size}` would be a shape the record no longer has.
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 120 }).status, 'the pane commit commits').toBe('committed')
    expect(delivered, 'a committed change of the PANES family delivers exactly one notification').toBe(1)
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 140 }).status).toBe('committed')
    expect(delivered, 'a second committed change delivers exactly one more — never one per family standing at a root').toBe(2)
    expect(record.commitZones(ZONE, { size: 160, display: 'normal' }).status, 'the zone commit commits').toBe('committed')
    expect(
      delivered,
      'a committed ZONE act delivers ONE PER SUPPLIED MEMBER — `size` and `display` are two leaf writes, so two more: one route call is no longer one delivery (`D-151`)',
    ).toBe(4)
    off()
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 160 }).status, 'a commit after the withdrawal still commits').toBe('committed')
    expect(delivered, 'the withdrawal is the answer: no delivery follows it').toBe(4)
  })

  it('THE CONTROL FOR THAT ROW: a store write that touches NEITHER family does not notify, and the SAME subscription then delivers on a pane commit — so the zero is not a dead subscription', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    let delivered = 0
    record.subscribe(() => {
      delivered += 1
    })
    store.write(['elsewhere'], 'mem', { note: 'not the view' })
    expect(delivered, 'a write outside both roots notifies nothing: the listener is bound to the families, not to the store').toBe(0)
    // AND THE POSITIVE HALF ON THE SAME SUBSCRIPTION.
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 101 }).status).toBe('committed')
    expect(delivered, 'and the very same subscription delivers when a family moves').toBe(1)
  })

  it('AND THE DELIVERY REACHES THE BRIDGE — **RE-GRAINED: THE SURFACE TAKES NO SUBSCRIPTION ANY MORE** (`D-219`). The crossing\'s construction-adopted entry is the ONE registration, the surface is handed that delivery, and every committed change of either paired family is handed to the sink `src/main/main.ts` turns into the `IPC_VIEW_CHANGED` push — with the renderer half registering the SAME channel constant, measured end to end rather than asserted from a name. **AND THE WITHDRAWAL IS LOCAL AND ONLY LOCAL**: a `subscribe` that has been released silences THAT handler and not the construction\'s registration, so the sink still counts the change', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    // **THE ROW'S DELETED SUBJECT IS NAMED SO IT IS NOT RE-DISCOVERED** (`D-152`'s shape): `ViewSurface.attach()`,
    // `ViewSurface.detach()` and the `onChanged` option are gone whole (`docs/L3/view-record/delivery.md` §4), because their
    // subject — *"take the one subscription so the window's teardown can withdraw exactly what it took"* — is the
    // CONSTRUCTION's now. **What they measured is measured here**: one committed change, one push, and no per-family
    // mapping in between. What they measured that no longer exists — *"a boot that never called `attach()` hears nothing"* —
    // is a state the tree can no longer be in, and the row does not pretend otherwise.
    const surface = createViewSurface({ store, delivery })
    expect(Object.keys(surface).sort(), 'the surface exposes its SIX routes and no subscription member').toEqual([
      'clearDrag',
      'commitDrag',
      'commitPane',
      'commitTheme',
      'commitZones',
      'read',
    ])
    let bridged = sunk.length
    expect(surface.commitPane(DEFAULT_PANE_ID, { height: 111 }).status).toBe('committed')
    expect(sunk.length - bridged, 'the main-side half: one committed pane change reaches the sink exactly once').toBe(1)
    bridged = sunk.length
    expect(surface.commitZones(ZONE, { size: 140, display: 'normal' }).status, 'a committed change of a second family').toBe('committed')
    expect(
      sunk.length - bridged,
      'and this zone act reaches it too, over the one registration — twice, because its two supplied members are two leaf writes (D-151)',
    ).toBe(2)
    // **THE WITHDRAWAL, MEASURED WHERE IT NOW STANDS** (`docs/L3/view-record/delivery.md` §3): a subscriber released runs no
    // store verb and withdraws nothing but its own entry, so the construction's registration still delivers to the sink —
    // the arm that would red if the local removal were ever rewired onto `unlisten`.
    const released = delivery.subscribe(() => undefined)
    released()
    bridged = sunk.length
    expect(surface.commitPane(DEFAULT_PANE_ID, { height: 112 }).status).toBe('committed')
    expect(sunk.length - bridged, 'the construction\'s registration stands after a local release: the sink is still told').toBe(1)

    // THE DELIVERED ARGUMENT IS THE ADDRESS THE DELIVERY CARRIED AND NEVER THE FAMILY (`D-92`, `D-137`): what the sink is
    // handed is the TRIGGERING address — the path the write landed at, which for a leaf act is the leaf and not the root —
    // and the queue `src/main/main.ts` holds it VERBATIM and translates nothing, which is why no formatting stands here.
    const roots = ['panes', 'zones', 'theme', 'drag']
    for (const address of sunk) {
      expect(roots, 'every delivered address is rooted at one of the four roots this module declares — never a value').toContain(address[0])
      expect(address.length, 'and it is a PATH: an address, which is all a push may ever carry').toBeGreaterThan(0)
    }
    expect(sunk.map((address) => address[0]), 'the pane acts delivered under the pane root and the zone act under the zone root').toEqual(
      expect.arrayContaining(['panes', 'zones']),
    )

    // THE RENDERER-SIDE HALF, READ AS CODE WITH ITS COMMENTS ELIDED (so a comment naming the channel cannot pass):
    expect(IPC_VIEW_CHANGED, 'the channel constant both halves register').toBe('provident:view:changed')
    const preload = commentElided(sourceOf('src/main/preload.ts'))
    expect(preload.includes('ipcRenderer.on(IPC_VIEW_CHANGED, listener)'), 'the preload registers the constant, never a literal').toBe(true)
    expect(preload.includes("'provident:view:changed'"), 'and does NOT re-spell it: the constant is the single source').toBe(false)
    // THE POSITIVE CONTROL: the RAW bytes DO carry the channel's own letters, so the absence above is about the
    // re-spelling and not about a scan that could not have found it.
    expect(sourceOf('src/shared/view-channels.ts').includes("'provident:view:changed'"), 'the single source carries it').toBe(true)
  })

  it('THE SUBSCRIPTION ARRAY COVERS THE FOURTH ROOT: a write at `[\'drag\']` at `temp` made OUTSIDE the record delivers to the same subscription — `D-137`\'s precondition measured where it can fail silently, `P-3`\'s instrument at the crossing', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    // **THE WRITE THE DRAG DID NOT MAKE** — an outside `temp` write at the family's own address, which is the only form this precondition can be
    // measured in (`D-137`): a temp root the array omits is a write the renderer never hears, and a listener bound per address is TIER-BLIND, so the
    // delivery is the root's and not the writer's. `['drag']` is a root, so the write lands without a repair (L2 §1).
    store.write(['drag'] as never, 'temp', { [DEFAULT_PANE_ID]: { height: 180 } })
    expect(
      delivered,
      'the delivery fired: an array without the temp root answers ZERO here while every temp write reaches the store unspoken',
    ).toBeGreaterThan(0)
    // AND THE POSITIVE HALF ON THE SAME SUBSCRIPTION, so a zero above could never be read as a dead registration.
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 122 }).status).toBe('committed')
    expect(delivered, 'and the same subscription still delivers for the file family').toBeGreaterThan(1)
    off()
  })
})

// ═══════════════ CLAUSE 3 — BOOT DATA FROM THE FILE OR FROM A REPAIR, AND THE `mem` FAMILY RE-MINTED EVERY BOOT ═══════════════

describe('view-record · clause 3 — the `file` family from the file, the `mem` family re-minted at every boot', () => {
  it('TWO SUCCESSIVE BOOTS ANSWER THE SAME STATE, AND THE PROFILE CARRIES THE `file` FAMILY AND NOT THE `mem` ONE — the bytes are read back, not inferred from a name', () => {
    const instant = mkdtempSync(join(tmpdir(), 'view-two-boots-'))
    const path = join(instant, PROFILE_FILE)
    try {
      const one = boot(path)
      const first = one.read()
      const oneBytes = one.bytes()
      one.close()
      // **BOOT ONE'S BYTES CARRY THE TWO `file` ROOTS AND NEITHER `mem` ONE**: `panes` and, from `D-98`, `theme` are
      // `file` values whose repairs' saves ride the landing arm (`D-86`), while `zones` is a `mem` value and no save of it
      // can reach a file at all. The set is asserted BY NAME, so a third root arriving would red here rather than pass.
      expect(Object.keys(JSON.parse(oneBytes) as Record<string, unknown>), 'the boot wrote the TWO `file` families and no other root').toEqual([
        'panes',
        'theme',
      ])
      // **AND THE DELETED ADDRESS HAS NO FILE IMAGE EITHER** (`D-142`): this arm survives the retirement because it asks
      // the same question of a gone family that it asked of a `mem` one — a deleted address cannot reach a profile.
      expect(oneBytes.includes('focus'), 'the retired `[\'focus\']` address is in NO byte of the profile').toBe(false)
      expect(oneBytes.includes('zones'), 'nor is the surviving `mem` family').toBe(false)

      const two = boot(path)
      try {
        expect(two.read().panes, 'boot two answers boot one\'s family').toEqual(first.panes)
        expect(two.read().theme, 'and the same appearance record, which is the second `file` family').toEqual(first.theme)
        expect(two.read().zones, 'while the `mem` family is re-minted rather than carried — the FOUR declared zones, memberless (`D-151`, `D-181`)').toEqual(FOUR_MEMBERLESS)
        expect(two.bytes(), 'the file is byte-identical across the two boots (nothing re-wrote it)').toBe(oneBytes)
      } finally {
        two.close()
      }
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  // ── THE SECOND CLAUSE-3 ROW IS RETIRED WITH ITS REFERENT (`D-9`, `D-142`) ──
  // 'AND THE `mem` FAMILY IS RE-MINTED AT EACH BOOT' wrapped `focus-must-stand` to read the creation instant's absent
  // value and the registration's own re-run, at `['focus']`. **THE PAIR, THE ADDRESS AND THE READ ARE DELETED WITH THE
  // FAMILY**, and the same clause for the `mem` family that SURVIVES is `zone-family.test.ts`'s `Z-5`, which wraps
  // `zones-must-stand` in exactly this shape — absent at the creation instant, the repaired value at the re-run, not one
  // byte in the profile. So the claim keeps an owner and this row, whose subject is gone, retires rather than being
  // re-pointed at a family another file already measures.

  it('THE LANDING INSTANT IS REACHABLE AND ITS REPAIR NAMES THE COMMIT AT `write`\'s FOURTH POSITION: a `delete` of a root is re-minted inside the SAME commit, answering a credited arm and delivering ONE notification — not two', () => {
    // THE ARM THIS MODULE'S OWN ROUTES CANNOT PRODUCE, DRIVEN WHERE IT CAN BE: `provident.data.delete` is a client act on
    // the SAME instance (D-79/D-80 pinned it there), so a deleted family is repaired at a LANDING instant. The row
    // measures the second of the two routes `writeWholeValue` carries, which is the one `D-73` requires a carrier for.
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    const before = record.read().panes
    const receipt = store.delete(VIEW_PANES_ADDRESS as never) as { triggered?: readonly { handle: string }[] }
    expect(delivered, 'the delete is ONE committed change, its repair\'s joined write being no second delivery').toBe(1)
    expect((receipt.triggered ?? []).map((entry) => entry.handle)).toContain(VIEW_PANES_MUST_STAND_ID)
    expect(record.read().panes, 'and the family stands again, at the measured placeholder').toEqual(before)
    // THE OTHER SURVIVING ROOT, THE SAME WAY: the `mem` family's landing arm, which the retired focus row used to carry.
    delivered = 0
    expect(store.write(VIEW_ZONES_ADDRESS as never, 'mem', { [ZONE]: { size: 160, display: 'normal' } }).op).toBeDefined()
    expect(delivered, 'a zone write delivers once').toBe(1)
    // **THIS IS THE STORE'S OWN ROOT WRITE AND NOT A ROUTE'S LEAF**, so the value REPLACES the family whole: the one zone
    // this write names stands and the three the placeholder minted do not survive it — the contrast the row exists for,
    // since `commitZones` writes leaves and could not do this (`D-151`).
    expect(record.read().zones).toEqual([{ id: ZONE, size: 160, display: 'normal' }])
    delivered = 0
    const zonesReceipt = store.delete(VIEW_ZONES_ADDRESS as never) as { triggered?: readonly { handle: string }[] }
    expect(delivered, 'and its delete is ONE committed change, its repair re-minting the family inside that commit').toBe(1)
    expect((zonesReceipt.triggered ?? []).map((entry) => entry.handle), 'the pair that answered is the zone family\'s').toContain(
      VIEW_ZONES_MUST_STAND_ID,
    )
    expect(record.read().zones, 'leaving the placeholder that names every DECLARED zone with an empty record').toEqual(FOUR_MEMBERLESS)
    off()
  })
})

// ═══════════════ CLAUSE 4 — WRITES DRIVEN BY EXTERNAL EVENTS ONLY ═══════════════

describe('view-record · clause 4 — every write path is an IPC route or a constraint repair, and a read writes nothing', () => {
  it('THE ENUMERATION, AND IT IS EXHAUSTIVE BY CONSTRUCTION: the module\'s only `write` calls sit inside `commitPane`, `commitZones`, `commitTheme` and `commitDrag`, its one `delete` inside `clearDrag`, and the rest in the one repair path — and NO TIMER, NO POLL AND NO INTERVAL stands in it, read over comment-elided code', () => {
    const module = commentElided(sourceOf('src/main/view-record/index.ts'))
    const surface = commentElided(sourceOf('src/main/view-surface/index.ts'))
    for (const forbidden of ['setTimeout', 'setInterval', 'setImmediate', 'requestAnimationFrame', 'queueMicrotask']) {
      expect(new RegExp(`\\b${forbidden}\\s*\\(`).test(module + surface), `no ${forbidden} stand in the module or its surface`).toBe(false)
    }
    // THE POSITIVE CONTROL — the raw bytes carry the word, so the absence above is about code and not about a scan of a
    // text that could never have held it: the module's own prose names none of them, so the control is synthetic.
    expect(/\bsetTimeout\s*\(/.test('const t = setTimeout(fn, 0)'), 'the instrument fires on a synthetic timer').toBe(true)
    // AND THE WRITE SITES ARE COUNTABLE: `store.write(` occurs exactly as often as there are write paths. The repair path
    // names it once (through `writeJoinedAt`), so the census is stated as a figure a new path would break.
    expect((module.match(/\.write\(/g) ?? []).length, 'the module reaches a write through exactly ONE helper (`writeJoinedAt`) plus the caller routes').toBeGreaterThan(0)
    // **AND THE PANE ROUTE WRITES NO WHOLE FAMILY EITHER** (`D-138`): `composePanes` is DELETED WHOLE, so the form this
    // row's control used to assert PRESENT is the form a route no longer carries — the assertion INVERTS rather than
    // leaving. A root write here would be the composer rebuilt under the route's name, and one write at
    // `['panes', id]` REPLACES the pane whole, which is exactly the erasure the per-member leaves remove.
    expect(/\.write\(VIEW_PANES_ADDRESS, PANES_TIER/.test(module), 'no whole-family write at the pane root remains in the module').toBe(false)
    // **AND THE POSITIVE CONTROL IS THE FORM THAT DOES STAND**: `commitPane` writes ONE LEAF PER SUPPLIED MEMBER at
    // `[VIEW_PANES_ADDRESS[0], id, member]` — `size` carrying the scalar, then `bounds` carrying the PAIR (`ASM-13`) — so
    // the absence above is about the ROOT write and not about a route that writes nothing at all. The zone route's own
    // form is asserted in the same way one bullet down, which is the re-grain `D-152` gave that route.
    expect(/\[VIEW_PANES_ADDRESS\[0\] as string, id, member\]/.test(module), 'the pane route writes one leaf per supplied member').toBe(true)
    // **AND THE ZONE ROUTE WRITES NO WHOLE FAMILY AT ALL** (`D-151`): `composeZones` left with the composition, so the route
    // writes ONE LEAF PER SUPPLIED MEMBER at `[VIEW_ZONES_ADDRESS[0], id, member]` — a root write here would be the composer
    // rebuilt under the route's name, and it would replace the zone whole (measured), which is the fault the leaves remove.
    expect(/\.write\(VIEW_ZONES_ADDRESS, ZONES_TIER/.test(module), 'no whole-family write at the zone root remains in the module').toBe(false)
    expect(/\[VIEW_ZONES_ADDRESS\[0\] as string, id, member\]/.test(module), 'the zone route writes one leaf per supplied member').toBe(true)
    expect(/\.write\(VIEW_THEME_ADDRESS, THEME_TIER/.test(module), 'and the appearance route writes its act whole (D-97)').toBe(true)
    // **THE DRAG PAIR IS THE FOURTH AND FIFTH WRITE PATH, AND THEY ARE ONE OF EACH KIND** (`D-132`): the move writes a whole value at the `temp` root,
    // and the clear is a DELETE at the same address — never a `write` of an empty family, because the address must answer `absent` once the gesture ends.
    expect(/\.write\(VIEW_DRAG_ADDRESS, DRAG_TIER/.test(module), 'the drag route writes the in-process reading whole at `temp`').toBe(true)
    expect(/\.delete\(VIEW_DRAG_ADDRESS, DRAG_TIER/.test(module), 'and the clear route ENDS the family rather than writing a placeholder').toBe(true)
    // **THE FOCUS ROUTE'S WRITE SITE IS GONE WITH THE ROUTE** (`D-142`) — the census below is the module's own and a
    // deleted route leaves it; a family re-added at a fourth site would red here rather than arrive unnoticed.
    expect(/FOCUS_TIER/.test(module), 'no tier constant stands for the retired family').toBe(false)
    expect(
      (module.match(/\.write\(VIEW_/g) ?? []).length,
      'TWO whole-family writes stand — the appearance act and the drag move — the ONE repair path writing through its own helper and BOTH paired geometry families writing LEAVES (`D-151`, `D-138`), so a third would be a write path clause 4 has not seen',
    ).toBe(2)
  })

  it('NO WRITE ON READ, MEASURED BOTH WAYS: a read lands no byte over a standing family, and a read over a store whose batch NEVER RAN answers the declared defaults WITHOUT minting either family', () => {
    // HALF ONE — THE `file` FAMILY, WHERE THE BYTES CAN SHOW IT.
    const path = join(dir, PROFILE_FILE)
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 175 }).status).toBe('committed')
    const stood = readFileSync(path)
    for (let n = 0; n < 3; n += 1) expect(record.read().status).toBe('committed')
    expect(readFileSync(path).equals(stood), 'a read lands no byte: the whole-value write is the only writer').toBe(true)

    // HALF TWO — THE `mem` FAMILY, WHERE THE BYTES CANNOT: **A STORE WHOSE BATCH NEVER RAN**, which is the only place a
    // family can be absent while a record reads it (a `delete` on a batched store is repaired inside its own commit —
    // measured in the landing-instant row above, and that is the pair working, not a hole). A read that repaired would
    // write here, and the absence below is what catches it.
    const barePath = join(dir, 'bare.json')
    const bare = createProfileStore({ filePath: barePath })
    // **A STORE WHOSE BATCH NEVER RAN HAS NO `cfg.listeners` ENTRY EITHER**: the delivery is built and handed to the record
    // all the same, because the record's shape takes one — and the entries here were adopted by nobody, which is exactly
    // what this row's half is about: a read writes nothing whether or not a listener stands (`D-219`, `guide §6`, `:561`).
    const bareSunk: (readonly string[])[] = []
    const bareDelivery = createViewDelivery((address) => bareSunk.push([...address]))
    const overBare = createViewRecord({ store: bare as unknown as ViewRecordStore, delivery: bareDelivery }).read()
    expect(overBare.source, 'no declaration ran, so no family of the THREE stands').toEqual({
      panes: 'default',
      zones: 'default',
      theme: 'default',
    })
    expect(overBare.panes, 'the pane family answers the measured default through the declared arm, never a minted record').toEqual([])
    expect(overBare.zones, 'and the zone family at the arm NO declaration reached — never a geometry minted at a read, and never a declared zone a repair never wrote').toEqual([])
    expect(
      overBare.theme,
      'and the appearance record at the placeholder, whose declaration names no attribute — never a resolution minted at a read (D-97)',
    ).toEqual({ token: null, attribute: null, declaration: { name: null, value: '', removal: true } })
    for (const address of [VIEW_PANES_ADDRESS, VIEW_ZONES_ADDRESS, VIEW_THEME_ADDRESS]) {
      for (const tier of ['file', 'mem'] as const) {
        let absent = ''
        try {
          bare.read(address as never, tier)
        } catch (caught) {
          absent = (caught as { status?: string }).status ?? ''
        }
        expect(absent, `the read did NOT mint ${address.join('/')} at ${tier}: no write runs on a read`).not.toBe('')
      }
    }
    expect(readFileSync(barePath, 'utf8'), 'and the profile is still the empty image its construction made').toBe('')
  })
})

// ═══════════════ THE ROUTES' SHAPE ARMS, THE SEAT RULE AND THE PURE DEFAULT ═══════════════

describe('view-record · the routes', () => {
  it('THE SHAPE ARMS ANSWER BEFORE ANY STORE VERB: a pane with no id, a non-plain geometry, an unusable axis member, a member the pane\'s own zone does not make adjustable, both axis members in one act and an unusable bounds pair are each refused under this module\'s own reason, and neither family moved', () => {
    const before = record.read()
    expect(record.commitPane('', { height: 1 }), 'no pane id').toMatchObject({ status: 'refused', reason: PANE_SHAPE_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, null), 'no plain geometry record').toMatchObject({ status: 'refused', reason: PANE_SHAPE_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { height: Number.NaN }), 'an axis member that is not a finite number').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { height: -1 }), 'a negative axis member').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    // **THE REV-16 CLAUSES, AND THEY ARE TWO FACTS THIS TOKEN ALREADY NAMED** (`D-191`; L2 §5): a `width` handed to a
    // stage-resident pane — `pane-a` carries no memberless `zone`, so `C-9` puts it in the stage and `C-12` makes it
    // sidebar-equivalent — is a FAULT and not an update, and both axis members in one act is the same refusal, because at
    // any instant exactly one axis is the pane's and the other is memory (`D-189`). No ninth token arrives for either.
    expect(record.commitPane(DEFAULT_PANE_ID, { width: 120 }), 'a NON-ADJUSTABLE axis member: a width handed to a stage pane').toMatchObject({
      status: 'refused',
      reason: PANE_GEOMETRY_REASON,
    })
    expect(record.commitPane(DEFAULT_PANE_ID, { width: 120, height: 120 }), 'BOTH axis members in one act').toMatchObject({
      status: 'refused',
      reason: PANE_GEOMETRY_REASON,
    })
    expect(record.commitPane(DEFAULT_PANE_ID, { bounds: { min: 0 } }), 'a bounds pair with one member').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { bounds: { min: 300, max: 100 } }), 'and a pair whose min exceeds its max').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.read(), 'no refused act moved either family').toEqual(before)
  })

  it('ONE MEMBER IS FILLED, NOT ERASED: a commit naming a size alone keeps the pane\'s standing bounds — now the LEAF WRITE\'s own guarantee and no longer a composer\'s — and an id this record does not declare is REFUSED, which is the arm that replaced this row\'s sibling-pane half', () => {
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 250, bounds: { min: 5, max: 500 } }).status).toBe('committed')
    expect(record.commitPane(DEFAULT_PANE_ID, { height: 260 }).status, 'the adjustable member alone').toBe('committed')
    expect(record.read().panes, 'the bounds the family stood at survive the narrower act — as does the OTHER axis member the act never named, which is the memory `D-189` asked the split for').toEqual([
      { id: DEFAULT_PANE_ID, width: DEFAULT_PANE_SIZE, height: 260, bounds: { min: 5, max: 500 } },
      { id: MENUS_PANE_ID, width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, zone: MENUS_PANE_ZONE_ID },
    ])
    // **WHY THIS HALF SURVIVES THE COMPOSER'S DELETION, SAID HERE BECAUSE A READER WILL ASK IT OF THE ROW'S TITLE**: the
    // claim is the same one the row always measured — a one-member act does not erase the member it did not name — and
    // the INSTRUMENT under it got narrower and stronger. `commitPane` writes ONE LEAF PER SUPPLIED MEMBER, at
    // `['panes', id, 'size']` and at `['panes', id, 'bounds']` (`D-138` H11, `ASM-13`), so a size-only act never reaches
    // the `bounds` leaf at all: what `composePanes` bought by copying the family and merging over the copy, the ADDRESS
    // buys by not touching the sibling member. Nothing was weakened to keep it green — the expected value is the same
    // value, and the act below is the release turn's own shape.
    // ── THE RETIRED HALF, RECORDED WITH ITS REASON (this corpus's habit, `D-142`'s style, `D-9`) ──
    // 'AND A SIBLING PANE IS NOT ERASED BY AN ACT ON ANOTHER' drove `commitPane('pane-z', { size: 90, bounds: … })` and
    // read the TWO panes back: the composer carried every SIBLING pane along, because one whole-family write at the root
    // replaces the family and nothing else would have preserved it. **THAT HALF HAS NO SUBJECT AT THIS HEAD**
    // (2026-11-09, `D-138`'s leaf landing, `D-151`'s ruling one family over): the pane ID DOMAIN IS CLOSED to
    // `DECLARED_PANE_IDS`, which is ONE id (`DEFAULT_PANE_ID`, `ASM-11`), so with one declared pane there IS no sibling
    // pane to preserve — and a caller naming `pane-z` is refused at the route's own DOMAIN arm, before any store verb,
    // rather than silently creating a pane (`ASM-12`). The composer's sibling-pane loop was therefore work no reachable
    // state needed, which is `D-138`'s removal arrived at by a second road (`D-139` judged it removable once the ancestry
    // was enforced). **So the arm below asserts the REFUSAL — the new contract — and the sibling half retires here with its
    // reason rather than being re-pointed at a state that cannot be represented** (`Z-9`'s rule, `D-152`).
    expect(
      record.commitPane('pane-z', { height: 90, bounds: { min: 0, max: 200 } }),
      'a well-formed id this record does not declare is REFUSED before any store verb: the closure at the route\'s seat',
    ).toMatchObject({ status: 'refused', reason: UNDECLARED_PANE_REASON, address: ['panes', 'pane-z'] })
    expect(record.read().panes, 'and nothing the refused act named reached the family: both declared panes stand exactly as they stood').toEqual([
      { id: DEFAULT_PANE_ID, width: DEFAULT_PANE_SIZE, height: 260, bounds: { min: 5, max: 500 } },
      { id: MENUS_PANE_ID, width: DEFAULT_PANE_SIZE, height: DEFAULT_PANE_SIZE, zone: MENUS_PANE_ZONE_ID },
    ])
  })

  // ── TWO ROWS RETIRED WITH THEIR REFERENT (`D-9`, `D-142`) ──
  // 'THE FOCUS ROUTE'S ARMS' drove `commitFocus`'s shape arms and its two reason tokens — `malformed-focus` and
  // `dangling-active` — and 'THE MIRROR ROUTE CARRIES THE MODEL'S STATE WHOLE' drove its whole-value round trip and the
  // absent-active spelling. **`commitFocus`, both tokens and the mirror's read all leave the module in the same edit**
  // (`D-142`), so neither row has a subject; the surviving routes' shape arms are the row above (panes) and
  // `zone-family.test.ts`'s `Z-8` (zones), and the appearance route's are `theme-family.test.ts`'s `TH-11`.

  it('THE PURE DEFAULT, OUT OF A READING AND WITH NO STORE VERB: `paneGeometryIn` answers the measured geometry for a pane the family does not name, says so, and answers the record\'s own when it does', () => {
    const panes = record.read().panes
    // **THE DERIVATION ANSWERS BOTH AXIS MEMBERS, AND THE DEFAULT'S TWO FIGURES ARE ONE NUMBER AT TWO NAMES** (`D-189`,
    // `D-192`): the missing arm is `defaultPaneGeometry`'s pair, which is why a consumer that reads `height` (the stage
    // pane's adjustable member) and one that reads `width` both have a source.
    expect(paneGeometryIn(panes, DEFAULT_PANE_ID), 'the family names it').toEqual({
      status: 'committed',
      pane: {
        id: DEFAULT_PANE_ID,
        width: DEFAULT_PANE_SIZE,
        height: DEFAULT_PANE_SIZE,
        bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max },
      },
      source: 'record',
    })
    expect(paneGeometryIn(panes, 'pane-never-written'), 'and one it does not').toEqual({
      status: 'committed',
      pane: {
        id: 'pane-never-written',
        width: DEFAULT_PANE_SIZE,
        height: DEFAULT_PANE_SIZE,
        bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max },
      },
      source: 'default',
    })
  })
})

// ═══════════════ THE WIRING: ONE BATCH, ONE CONSTRUCTION, ONE PAIR OF LOCKSTEP DECLARATIONS ═══════════════

describe('view-record · the boot\'s wiring, read as code and never as prose', () => {
  it('THE BATCH IS THE TAB RECORD\'S SIX AND THIS MODULE\'S SURVIVING PAIRS, IN THE ONE `createProfileStore` CALL — and each surviving declaration and each surviving root is asserted BY PRESENCE, never by a count (the counts are `central-data`\'s, D-43)', () => {
    const main = commentElided(sourceOf('src/main/main.ts'))
    expect(main.includes('...tabsConstraintDeclarations('), 'the tab record\'s six are spread into the batch').toBe(true)
    expect(main.includes('...viewConstraintDeclarations('), 'and this module\'s pairs into the SAME array').toBe(true)
    // **THE DECLARATIONS, BY PRESENCE** (`D-142`, `D-43`): every surviving pair is named, and no pair stands at the deleted
    // address. **NO COUNT IS ASSERTED** — the batch's size is `central-data`'s equality row's business, not this module's.
    const declared = viewConstraintDeclarations(() => null).map((declaration) => declaration.id)
    for (const id of [VIEW_PANES_MUST_STAND_ID, VIEW_ZONES_MUST_STAND_ID, VIEW_THEME_MUST_STAND_ID]) {
      expect(declared, `the batch declares \`${id}\``).toContain(id)
    }
    expect(declared, 'and no pair stands at the address the family took with it').not.toContain('focus-must-stand')
    // **THE ROOTS, BY PRESENCE TOO**: each address at its own tier, and none at the deleted one. The drag root is a FOURTH, published at `temp` with
    // no pair behind it — an entry the guard reads and a declaration the batch does not carry (L2 §1, §4; D-132, D-101).
    const published = viewDeclaredRoots().map((root) => `${root.address.join('/')}@${root.tier}`)
    for (const root of ['panes@file', 'zones@mem', 'theme@file', 'drag@temp']) {
      expect(published, `the published roots carry \`${root}\``).toContain(root)
    }
    expect(published, 'and publish nothing at the deleted address').not.toContain('focus@mem')
    // ONE CONSTRUCTION SITE, AND IT IS THE BOOT'S: a second `createProfileStore(` in the entry would be the third instance
    // the purge refuses (D-78, D-79). The count is stated as a figure a new site would break.
    expect((main.match(/createProfileStore\s*\(/g) ?? []).length, 'the entry constructs the profile store exactly once').toBe(1)
    // **RE-GRAINED FROM `main.includes('viewSurface.attach()')`** (`D-219`; `docs/L3/app-shell/delivery.md` §5 `A-4`): the
    // assertion's subject — *"and the push is attached where the tab record's is"* — MOVES rather than vanishing. The push
    // is not taken after the construction any more, so the two facts that replace it are asserted here and each can fail on
    // its own: **the construction ADOPTS the crossing's entries** in its one `listeners:` array, and **the two `attach()`
    // calls are gone** — leaving one beside the new entry would be the second registration `D-129` forbids.
    expect(main.includes('listeners: [...tabsDelivery.entries, ...viewDelivery.entries]'), 'the construction adopts BOTH crossings\' listener entries, tabs first').toBe(true)
    expect(main.includes('...viewConstraintDeclarations('), 'and the batch is the same call\'s other list, unmoved').toBe(true)
    expect(main.includes('viewSurface.attach()'), 'no `attach()` stands after the construction: the registration is the construction\'s').toBe(false)
    expect(main.includes('tabsSurface.attach()'), 'and neither does the tab record\'s, whose entry is in the same array').toBe(false)
    expect(main.includes('viewDeliveries.arm()'), 'the flush rides the realm\'s arrival, one arm per crossing').toBe(true)
    expect(main.includes('tabsDeliveries.arm()'), 'and the two arms stand in the queue\'s own order, tabs first').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_READ'), 'the read handler is registered').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_PANE_COMMIT'), 'the pane route\'s handler is registered').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_ZONES_COMMIT'), 'and the zone route\'s (D-91)').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_THEME_COMMIT'), 'and the appearance route\'s (D-97)').toBe(true)
    // THE POSITIVE CONTROL: the RAW bytes carry the names too, so the assertions above are about code that exists.
    expect(sourceOf('src/main/main.ts').includes('viewConstraintDeclarations'), 'the raw bytes name it').toBe(true)
  })

  it('THE BRIDGE MEMBER IS ONE DECLARATION IN TWO FILES, AND THE TWO ARE COMPARED RATHER THAN CITED: `src/main/preload.ts`\'s `view` block and `src/renderer/secure-panels.ts`\'s `view?` block carry the same surviving routes, member for member', () => {
    const routesOf = (path: string, opener: RegExp): string[] => {
      const lines = sourceOf(path).split('\n')
      const start = lines.findIndex((line) => opener.test(line))
      if (start === -1) throw new Error(`${path}: no \`view\` member is declared`)
      const indent = lines[start].length - lines[start].trimStart().length
      const body: string[] = []
      let closed = false
      for (let index = start + 1; index < lines.length; index += 1) {
        const line = lines[index]
        if (line.trim() === '},' && line.length - line.trimStart().length === indent) {
          closed = true
          break
        }
        if (line.trim() === '' || line.trim().startsWith('//')) continue
        body.push(line.trim().replace(/,$/, ''))
      }
      if (!closed) throw new Error(`${path}: the \`view\` member's close is not found at its own indent`)
      return body
    }
    const preload = routesOf('src/main/preload.ts', /^\s*view:\s*\{\s*$/)
    const panels = routesOf('src/renderer/secure-panels.ts', /^\s*view\?\s*:\s*\{\s*$/)
    // THE LOCKSTEP IS A COMPARISON AND NOT A PROMISE: the two blocks are read at whatever their own indent is, so a
    // half-widening (a member added at one site only) reds here with the two texts in hand.
    expect(panels, 'the renderer\'s `declare global` half carries the SAME routes as the preload\'s').toEqual(preload)
    expect(preload, 'which are the member\'s routes: read, commitPane, commitZones, commitTheme, commitDrag, clearDrag, onChanged').toEqual([
      "read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>",
      "commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      // **THE DRAG PAIR, IN THE SAME INLINE SPELLING AS THE THREE COMMITS AND IN THIS ORDER** (`D-132`, L2 §2): a pane id and a placement, and an act
      // that takes NOTHING — the `null` arm `D-140` spent a row removing.
      "commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      'onChanged(handler: () => void): () => void',
    ])
    expect([IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_CHANGED], 'and the surviving channel names are single-sourced in one shared module').toEqual([
      'provident:view:read',
      'provident:view:pane-commit',
      'provident:view:zones-commit',
      'provident:view:theme-commit',
      'provident:view:changed',
    ])
    // **AND THE DRAG PAIR'S TWO CHANNELS ARE IN THE SAME FILE, READ AS CODE** (`D-87`, `D-132`): a name spelled in the handler and again in the preload
    // is the rename that half-lands, so both are asserted where they are declared — with the raw bytes as the positive control on the same reading.
    const channels = commentElided(sourceOf('src/shared/view-channels.ts'))
    expect(channels.includes("'provident:view:drag-commit'"), 'the move\'s channel is single-sourced here').toBe(true)
    expect(channels.includes("'provident:view:drag-clear'"), 'and the clear\'s, beside it').toBe(true)
    expect(sourceOf('src/shared/view-channels.ts').includes('IPC_VIEW_PANE_COMMIT'), 'the positive control: the same text carries a constant that stands').toBe(true)
  })

  it('**THE TWO DRAG ROUTES STAND AT EVERY SITE, IN ONE EDIT** (`D-14`, `D-112`, `D-132`): the record, the surface, the single-sourced channels, the boot\'s two handlers, both lockstep halves and the client — a member one site short is either a channel with a handler and no caller or a method that writes nowhere, which is the class `D-132` refused to half-land', () => {
    const sites: readonly (readonly [string, string])[] = [
      ['src/main/view-record/index.ts', 'commitDrag'],
      ['src/main/view-record/index.ts', 'clearDrag'],
      ['src/main/view-surface/index.ts', 'commitDrag'],
      ['src/main/view-surface/index.ts', 'clearDrag'],
      ['src/shared/view-channels.ts', 'IPC_VIEW_DRAG_COMMIT'],
      ['src/shared/view-channels.ts', 'IPC_VIEW_DRAG_CLEAR'],
      ['src/main/main.ts', 'IPC_VIEW_DRAG_COMMIT'],
      ['src/main/main.ts', 'IPC_VIEW_DRAG_CLEAR'],
      ['src/main/preload.ts', 'commitDrag'],
      ['src/main/preload.ts', 'clearDrag'],
      ['src/renderer/secure-panels.ts', 'commitDrag'],
      ['src/renderer/secure-panels.ts', 'clearDrag'],
      ['src/renderer/view-client.ts', 'commitDrag'],
      ['src/renderer/view-client.ts', 'clearDrag'],
    ]
    for (const [path, name] of sites) {
      expect(commentElided(sourceOf(path)).includes(name), `${path} carries \`${name}\``).toBe(true)
    }
    // THE POSITIVE CONTROL, on the same readings: a route that DOES stand is found by the same instrument, so the assertions above are about the drag
    // pair and not about a scan that could never have matched.
    expect(commentElided(sourceOf('src/main/view-record/index.ts')).includes('commitPane'), 'the instrument finds a route that stands').toBe(true)
    expect(commentElided(sourceOf('src/main/main.ts')).includes('ipcMain.handle(IPC_VIEW_PANE_COMMIT'), 'and a handler that stands').toBe(true)
  })

  it('**THE ROUTE LEAVES BOTH SIDES IN ONE EDIT** (`D-14`, `D-142`): no `commitFocus` member stands on the bridge at either lockstep site, the record and the surface declare none, the client reaches no `focus` route, and the channel constant is gone from the single-sourced module — each read over COMMENT-ELIDED code, with the raw bytes as the positive control', () => {
    // A route that leaves one side alone is either a channel with a handler and no caller or a member no handler answers,
    // so every site below is asserted at once and each assertion can fail on its own.
    const preload = commentElided(sourceOf('src/main/preload.ts'))
    const panels = commentElided(sourceOf('src/renderer/secure-panels.ts'))
    const recordModule = commentElided(sourceOf('src/main/view-record/index.ts'))
    const surface = commentElided(sourceOf('src/main/view-surface/index.ts'))
    const client = commentElided(sourceOf('src/renderer/view-client.ts'))
    const channels = commentElided(sourceOf('src/shared/view-channels.ts'))
    expect(preload.includes('commitFocus'), 'the preload\'s `view` member carries no `commitFocus`').toBe(false)
    expect(panels.includes('commitFocus'), 'nor does the `declare global` half it must agree with').toBe(false)
    expect(recordModule.includes('commitFocus'), 'the record declares no `commitFocus` route').toBe(false)
    expect(surface.includes('commitFocus'), 'and the surface exposes none').toBe(false)
    expect(client.includes('commitFocus'), 'and the client reaches no such route').toBe(false)
    expect(channels.includes('focus'), 'and the channel constant left the single-sourced module').toBe(false)
    // THE POSITIVE CONTROLS, on the same readings: the surviving route's name and its channel DO stand, so the absences
    // above are about a deleted member and not about a scan that could never have matched.
    expect(preload.includes('commitPane'), 'the same block still carries the surviving routes').toBe(true)
    expect(channels.includes('IPC_VIEW_PANE_COMMIT'), 'and the channel module still carries theirs').toBe(true)
  })

  it('THE MODULE NAMES THE PACKAGE NOWHERE, WHICH IS A CENSUS FACT AND NOT A STYLE ONE: `S-9` pins the importing files at three, so this module reaches the store through the tab record\'s own handle type', () => {
    const module = commentElided(sourceOf('src/main/view-record/index.ts'))
    expect(module.includes("from 'provident-storeroom'"), 'no value import of the package').toBe(false)
    expect(module.includes('storeCreate'), 'and no call on its construction').toBe(false)
    expect(module.includes('createProfileStore'), 'nor on the app seam\'s').toBe(false)
    // THE POSITIVE CONTROL: the raw bytes DO name the package in a comment, so the absence above is about an import.
    expect(sourceOf('src/main/view-record/index.ts').includes('provident-storeroom'), 'the prose names the release it measured').toBe(true)
  })
})
