// tests/integration/store-view-record/crossing.test.ts — THE L2/L3 BATTERY for `view-record`: the crossing's second
// declaration set, over the central instance (D-87).
//
// THE CONTRACT: `docs/L3/view-record/design.md` §4 — TWO registered pairs, one at each root (`panes-must-stand` at
// `['panes']` and `focus-must-stand` at `['focus']`), each answering `true` or `{ message, repair }`, where the repair
// leaves ONE whole legal family and RETURNS the op its write landed (`{ ok: true, op }`, the shape the kernel credits
// through `landedOp`); and `docs/L2/view-record/interface.md` §2 — four routes, and §3 — the change push.
//
// **THE FOUR CLAUSES OF THE CONVENTION (`D-82`), DRIVEN PER ADDRESS AND NEVER ASSERTED IN PROSE** (§5 below):
//  1. EXISTENCE + PLACEHOLDER REPAIR, DRIVEN AT THE CREATION INSTANT — the batch supplied, the address absent, the
//     record standing at the MEASURED placeholder when the constructor returns;
//  2. A LISTENER CARRIES THE CHANGE — once per committed change of that family, ZERO on a write that touches nothing,
//     and it reaches the bridge;
//  3. BOOT DATA FROM FILE OR FROM A REPAIR — two successive boots answer the same state, and the `mem` family is
//     re-minted at every boot because a `mem` value can never come from a file (`D-84`);
//  4. WRITES DRIVEN BY EXTERNAL EVENTS ONLY — every write path is an IPC route or a constraint repair, and no timer,
//     no poll and no write-on-read stands anywhere in the module.
//
// **THE MEASUREMENTS THIS FILE RESTS ON WERE TAKEN BEFORE IT WAS WRITTEN**, on the installed
// `provident-storeroom@1.9.1`, one fresh instance per arm: a nested write does NOT create its parent
// (`AddressNotFound: 'view' does not exist in ''`), which is why each family is ONE WHOLE VALUE at its own root; a root
// written at `file` answers its descendants at `file` and answers `TierNotFound` at `mem`, which is why the two families
// do not share one root; a registration-instant repair's record is `{address, id, tier, value, op, pending, write}` with
// `write` a FUNCTION and `tier: null`; `null` and `undefined` are REFUSED at the crossing's boundary
// (`ValueRefusedAtBoundary`), which is why the empty active id is written as ABSENCE rather than as `null`; and a
// registration-instant `file`-tier repair IS in the file when the constructor returns while a `mem` one is not
// (`D-86`'s release read at these two addresses).
//
// This authority this repo's (`docs/L2`, `docs/L3`) and the package's own guide, never the package's internals.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
  createViewRecord,
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  DANGLING_ACTIVE_REASON,
  FOCUS_SHAPE_REASON,
  paneGeometryIn,
  PANE_GEOMETRY_REASON,
  PANE_SHAPE_REASON,
  VIEW_FOCUS_ADDRESS,
  VIEW_FOCUS_MUST_STAND_ID,
  VIEW_PANES_ADDRESS,
  VIEW_PANES_MUST_STAND_ID,
  VIEW_THEME_ADDRESS,
  VIEW_THEME_MUST_STAND_ID,
  VIEW_ZONES_ADDRESS,
  VIEW_ZONES_MUST_STAND_ID,
  viewConstraintDeclarations,
  writeJoinedAt,
} from '../../../src/main/view-record'
import type {
  ViewConstraintAnswer,
  ViewConstraintDeclaration,
  ViewFocusMirror,
  ViewRecord,
  ViewRecordStore,
  ViewRepairAnswer,
} from '../../../src/main/view-record'
import { createViewSurface } from '../../../src/main/view-surface'
import {
  IPC_VIEW_CHANGED,
  IPC_VIEW_FOCUS_COMMIT,
  IPC_VIEW_PANE_COMMIT,
  IPC_VIEW_READ,
  IPC_VIEW_THEME_COMMIT,
  IPC_VIEW_ZONES_COMMIT,
} from '../../../src/shared/view-channels'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

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

/** The batch a boot supplies: the two declarations, mapped the way `src/main/main.ts` maps them. */
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
const voidConstraintBody: ViewConstraintDeclaration = { address: ['focus'], id: 'a-void-body', constraint: (): void => undefined }

declare const aStore: ViewRecordStore
const aCarrier = { pending: [] }
const anIntendedFamily: unknown = { [DEFAULT_PANE_ID]: { size: 100, bounds: { min: 0, max: 200 } } }

// The positive control: a carrier IS accepted here, so the directives below are about the position and not the call.
const joinedRepairWrite = (): unknown => writeJoinedAt(aStore, aCarrier, VIEW_PANES_ADDRESS, 'file', anIntendedFamily)

// @ts-expect-error — A REPAIR WRITE WITH NO CARRIER DOES NOT COMPILE: the omission is an arity fault, not a convention
const carrierlessRepairWrite = (): unknown => writeJoinedAt(aStore, undefined, VIEW_PANES_ADDRESS, 'file', anIntendedFamily)

// @ts-expect-error — `null` is not a commit: the position admits a non-null object, and naming nothing is not naming one
const nullCarrierRepairWrite = (): unknown => writeJoinedAt(aStore, null, VIEW_FOCUS_ADDRESS, 'mem', { entries: [] })

let dir: string
let holder: ViewRecordStore | null = null
let record: ViewRecord

/** A record over a real store built the way the boot builds it: the two declarations batched at construction (D-65). */
const open = (): void => {
  dir = mkdtempSync(join(tmpdir(), 'view-crossing-'))
  holder = null
  const store = createProfileStore({ filePath: join(dir, PROFILE_FILE), constraints: batchOf(() => holder) as never })
  holder = store as unknown as ViewRecordStore
  record = createViewRecord({ store: holder })
}

beforeEach(open)

afterEach(() => {
  // THE STORE IS RELEASED BY DROPPING IT — the package declares no `close()` and no finalizer, so the scratch directory
  // is what must go.
  holder = null
  rmSync(dir, { recursive: true, force: true })
})

/** A second store over a given path, with the batch, exactly as a second boot constructs it. */
const boot = (path: string): { store: ViewRecordStore; read: () => ReturnType<ViewRecord['read']>; bytes: () => string; close: () => void } => {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
  bound.current = store as unknown as ViewRecordStore
  const here = createViewRecord({ store: bound.current })
  return { store: bound.current, read: () => here.read(), bytes: () => readFileSync(path, 'utf8'), close: () => { bound.current = null } }
}

// ═══════════════ CLAUSE 1 — EXISTENCE + PLACEHOLDER REPAIR AT THE CREATION INSTANT, PER ADDRESS ═══════════════

describe('view-record · clause 1 — all FOUR addresses repaired at the CREATION INSTANT, each to its measured placeholder', () => {
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

      // AND THE BATCHED BOOT OVER A FRESH PROFILE.
      const bound: { current: ViewRecordStore | null } = { current: null }
      const store = createProfileStore({ filePath: path, constraints: batchOf(() => bound.current) as never })
      bound.current = store as unknown as ViewRecordStore
      // THE FAMILY STANDS AT THE STORE'S OWN ADDRESS BEFORE ANY COMMIT — read through the STORE, not through the module,
      // so the reading is the instance's and not a route's composition.
      expect(store.read(VIEW_PANES_ADDRESS, 'file'), 'the existence pair minted the pane family at construction').toEqual({
        [DEFAULT_PANE_ID]: { size: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } },
      })
      // **AND THE DEFAULT IS THE MEASURED ONE, NOT AN INVENTED ONE**: the pane the app's store-backed drag composition
      // addresses, at the size and bounds pair `src/shared/demo-envelope.ts` authors and `gutterSeamExample` falls back
      // to. A repair writing any other figure would pass a `toBeDefined`-shaped row and lose the whole point.
      expect(DEFAULT_PANE_ID, 'the one pane id the app addresses').toBe('pane-a')
      expect({ size: DEFAULT_PANE_SIZE, ...DEFAULT_PANE_BOUNDS }, 'the geometry the tree states, and no other').toEqual({ size: 100, min: 0, max: 200 })

      const fresh = createViewRecord({ store: bound.current })
      const read = fresh.read()
      expect(read.source, 'all four families stand because a repair put them there, and the read says which').toEqual({
        panes: 'record',
        focus: 'record',
        zones: 'record',
        theme: 'record',
      })
      expect(read.panes, 'and the record reads the family the repair wrote').toEqual([
        { id: DEFAULT_PANE_ID, size: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } },
      ])
      expect(read.focus, 'the mirror stands at the model\'s own declared empty pair').toEqual({ entries: [], activeId: null })
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('THE FOCUS MIRROR AT THE CREATION INSTANT: `focus-must-stand` mints it at the `mem` root — the same absent-arm control as the panes pair, and the same `source: record` once the batch is supplied', () => {
    const instant = mkdtempSync(join(tmpdir(), 'view-focus-construction-'))
    try {
      const bare = createProfileStore({ filePath: join(instant, 'bare.json') })
      let absent = ''
      try {
        bare.read(VIEW_FOCUS_ADDRESS, 'mem')
      } catch (caught) {
        absent = (caught as { status?: string }).status ?? ''
      }
      expect(absent, 'a store with no declaration holds NOTHING at `[\'focus\']`').toBe('AddressNotFound')

      const bound: { current: ViewRecordStore | null } = { current: null }
      const store = createProfileStore({ filePath: join(instant, PROFILE_FILE), constraints: batchOf(() => bound.current) as never })
      bound.current = store as unknown as ViewRecordStore
      expect(store.read(VIEW_FOCUS_ADDRESS, 'mem'), 'the mirror stands, and the absent active is spelled as ABSENCE').toEqual({ entries: [] })
      // **THE SPELLING IS MEASURED AND NOT STYLISTIC**: `null` is refused at the crossing's own boundary, so a mirror
      // carrying one could not be written at all. The proof is the boundary itself, driven here rather than asserted.
      let refused = ''
      try {
        store.write(VIEW_FOCUS_ADDRESS, 'mem', { entries: [], activeId: null })
      } catch (caught) {
        refused = (caught as { status?: string }).status ?? ''
      }
      expect(refused, '`null` is not a value the crossing admits, which is why the empty active is written as absence').toBe('ValueRefusedAtBoundary')
      const read = createViewRecord({ store: bound.current }).read()
      expect(read.focus, 'the read maps the absence back to the model\'s `null` and says the repair is why').toEqual({ entries: [], activeId: null })
      expect(read.source.focus).toBe('record')
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('THE PLACEHOLDER IS IN THE RECORD AND NOT SUBSTITUTED AT THE READ: a profile seeded with a pane family the file brought is UNTOUCHED, and the family the record reads is the FILE\'S — `pane-b` at 240 — not the placeholder', () => {
    // WITHOUT THIS ROW the pair above could pass by overwriting every family it is asked about, which would make the
    // placeholder a rewrite rather than a repair.
    const instant = mkdtempSync(join(tmpdir(), 'view-seeded-'))
    const path = join(instant, PROFILE_FILE)
    try {
      createProfileStore({ filePath: path }).write(VIEW_PANES_ADDRESS, 'file', { 'pane-b': { size: 240, bounds: { min: 10, max: 400 } } })
      const booted = boot(path)
      try {
        expect(booted.store.read(VIEW_PANES_ADDRESS as never, 'file'), 'the file\'s own family, byte for byte').toEqual({
          'pane-b': { size: 240, bounds: { min: 10, max: 400 } },
        })
        const read = booted.read()
        expect(read.panes, 'and the record reads what the file brought').toEqual([{ id: 'pane-b', size: 240, bounds: { min: 10, max: 400 } }])
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
      const seed = { [DEFAULT_PANE_ID]: { size: 133, bounds: { min: 5, max: 300 } } }
      createProfileStore({ filePath: path }).write(VIEW_PANES_ADDRESS as never, 'file', seed)
      const stood = readFileSync(path, 'utf8')
      const booted = boot(path)
      try {
        expect(booted.bytes(), 'the bytes the construction leaves are the bytes the file held').toBe(stood)
        expect(booted.read().panes, 'and the reading is the seed\'s, not a re-mint of it').toEqual([{ id: DEFAULT_PANE_ID, size: 133, bounds: { min: 5, max: 300 } }])
      } finally {
        booted.close()
      }
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })
})

// ═══════════════ CLAUSE 2 — A LISTENER CARRIES THE CHANGE, ONCE PER COMMITTED CHANGE, ZERO ELSEWHERE ═══════════════

describe('view-record · clause 2 — the push, measured per family and against a control that keeps a zero from being dead', () => {
  it('ONE DELIVERY PER COMMITTED CHANGE OF EITHER FAMILY — a pane commit is 1, a second pane commit is 2, a focus commit is 3, and the withdrawal is the answer — a counter, because a listener the store never registered fires nothing, silently', () => {
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 120 }).status, 'the pane commit commits').toBe('committed')
    expect(delivered, 'a committed change of the PANES family delivers exactly one notification').toBe(1)
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 140 }).status).toBe('committed')
    expect(delivered, 'a second committed change delivers exactly one more — never one per family standing at a root').toBe(2)
    expect(record.commitFocus({ entries: [{ id: 'a', target: 'a' }], activeId: 'a' }).status, 'the focus commit commits').toBe('committed')
    expect(delivered, 'a committed change of the FOCUS family delivers exactly one more').toBe(3)
    off()
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 160 }).status, 'a commit after the withdrawal still commits').toBe('committed')
    expect(delivered, 'the withdrawal is the answer: no delivery follows it').toBe(3)
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
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 101 }).status).toBe('committed')
    expect(delivered, 'and the very same subscription delivers when a family moves').toBe(1)
  })

  it('AND THE DELIVERY REACHES THE BRIDGE: the surface\'s `attach` turns ONE subscription into the `onChanged` the main process broadcasts, and the renderer half registers the SAME channel constant — measured end to end rather than asserted from a name', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    let bridged = 0
    const surface = createViewSurface({ store, onChanged: () => { bridged += 1 } })
    surface.attach()
    expect(surface.commitPane(DEFAULT_PANE_ID, { size: 111 }).status).toBe('committed')
    expect(bridged, 'the main-side half: one committed pane change reaches the broadcast').toBe(1)
    expect(surface.commitFocus({ entries: [], activeId: null }).status).toBe('committed')
    expect(bridged, 'and one committed focus change reaches it too, over the one subscription').toBe(2)
    surface.detach()
    expect(surface.commitPane(DEFAULT_PANE_ID, { size: 112 }).status).toBe('committed')
    expect(bridged, '`detach` withdraws exactly what `attach` took').toBe(2)

    // THE RENDERER-SIDE HALF, READ AS CODE WITH ITS COMMENTS ELIDED (so a comment naming the channel cannot pass):
    expect(IPC_VIEW_CHANGED, 'the channel constant both halves register').toBe('provident:view:changed')
    const preload = commentElided(sourceOf('src/main/preload.ts'))
    expect(preload.includes('ipcRenderer.on(IPC_VIEW_CHANGED, listener)'), 'the preload registers the constant, never a literal').toBe(true)
    expect(preload.includes("'provident:view:changed'"), 'and does NOT re-spell it: the constant is the single source').toBe(false)
    // THE POSITIVE CONTROL: the RAW bytes DO carry the channel's own letters, so the absence above is about the
    // re-spelling and not about a scan that could not have found it.
    expect(sourceOf('src/shared/view-channels.ts').includes("'provident:view:changed'"), 'the single source carries it').toBe(true)
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
      // **BOOT ONE'S BYTES CARRY ONE ROOT AND NOT TWO**: `panes` is a `file` value and the repair's save rides the landing
      // arm (`D-86`), while `focus` is a `mem` value and no save of it can reach a file at all.
      expect(Object.keys(JSON.parse(oneBytes) as Record<string, unknown>), 'the boot wrote the pane family and no other root').toEqual(['panes'])
      expect(oneBytes.includes('focus'), 'and the `mem` family is in NO byte of the profile').toBe(false)

      const two = boot(path)
      try {
        expect(two.read().panes, 'boot two answers boot one\'s family').toEqual(first.panes)
        expect(two.read().focus, 'and the same mirror').toEqual(first.focus)
        expect(two.bytes(), 'the file is byte-identical across the two boots (nothing re-wrote it)').toBe(oneBytes)
      } finally {
        two.close()
      }
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('AND THE `mem` FAMILY IS RE-MINTED AT EACH BOOT, MEASURED AT THE PAIR\'S OWN CONTEXT: boot two is handed the address ABSENT and its repair writes it again — which is clause 3 answered for a family a file can never carry', () => {
    const instant = mkdtempSync(join(tmpdir(), 'view-remint-'))
    const path = join(instant, PROFILE_FILE)
    try {
      // A FIRST BOOT, so the profile is the product's own image.
      const one = boot(path)
      expect(one.read().source.focus).toBe('record')
      one.close()
      // **THE INSTRUMENT IS THE PAIR WRAPPED, NOT A PROBE BESIDE IT** — the `D-84` shape: every context the engine hands
      // `focus-must-stand` is recorded, so the ABSENCE at the creation instant and the RE-RUN over the repaired value
      // are both read at the site they happen rather than inferred from the record the boot leaves.
      const seen: unknown[] = []
      const bound: { current: ViewRecordStore | null } = { current: null }
      const second = createProfileStore({
        filePath: path,
        constraints: viewConstraintDeclarations(() => bound.current)
          .map((declaration) => ({
            address: declaration.address,
            id: declaration.id,
            constraint: (context: unknown) => {
              if (declaration.id === VIEW_FOCUS_MUST_STAND_ID) seen.push((context as { value?: unknown }).value)
              return declaration.constraint(context)
            },
          })) as never,
      })
      bound.current = second as unknown as ViewRecordStore
      expect(seen.length, 'the engine ASKS the mirror\'s pair at the creation instant — a pair the batch does not carry is asked nowhere, and this row reds on that revert').toBeGreaterThan(0)
      expect(seen[0], 'boot two is handed NOTHING at `[\'focus\']`: a `mem` value never came from a file').toBeUndefined()
      expect(seen[seen.length - 1], 'and the registration\'s own RE-RUN reads the mirror the repair landed, in the same instant').toEqual({ entries: [] })
      const read = createViewRecord({ store: bound.current }).read()
      expect(read.focus, 'so the mirror stands, at the model\'s declared empty pair').toEqual({ entries: [], activeId: null })
      expect(read.source.focus, 'because a repair put it there, at this boot as at the last').toBe('record')
      expect(readFileSync(path, 'utf8').includes('focus'), 'and not one byte of it reached the profile').toBe(false)
    } finally {
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('THE LANDING INSTANT IS REACHABLE AND ITS REPAIR NAMES THE COMMIT AT `write`\'s FOURTH POSITION: a `delete` of either root is re-minted inside the SAME commit, answering a credited arm and delivering ONE notification — not two', () => {
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
    // THE OTHER ROOT, THE SAME WAY.
    delivered = 0
    expect(store.write(VIEW_FOCUS_ADDRESS as never, 'mem', { entries: [{ id: 'x', target: 'x' }], activeId: 'x' }).op).toBeDefined()
    expect(delivered, 'a focus commit delivers once').toBe(1)
    expect(record.read().focus).toEqual({ entries: [{ id: 'x', target: 'x' }], activeId: 'x' })
    off()
  })
})

// ═══════════════ CLAUSE 4 — WRITES DRIVEN BY EXTERNAL EVENTS ONLY ═══════════════

describe('view-record · clause 4 — every write path is an IPC route or a constraint repair, and a read writes nothing', () => {
  it('THE ENUMERATION, AND IT IS EXHAUSTIVE BY CONSTRUCTION: the module\'s only `write` calls sit inside `commitPane`, `commitFocus` and the one repair path — and NO TIMER, NO POLL AND NO INTERVAL stands in it, read over comment-elided code', () => {
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
    expect((module.match(/\.write\(/g) ?? []).length, 'the module reaches a write through exactly ONE helper (`writeJoinedAt`) plus the two caller routes').toBeGreaterThan(0)
    expect(/\.write\(VIEW_PANES_ADDRESS, PANES_TIER/.test(module), 'the pane route writes the family whole').toBe(true)
    expect(/\.write\(VIEW_FOCUS_ADDRESS, FOCUS_TIER/.test(module), 'the focus route writes the mirror whole').toBe(true)
    expect(/\.write\(VIEW_ZONES_ADDRESS, ZONES_TIER/.test(module), 'and the zone route writes its family whole (D-91)').toBe(true)
    expect(/\.write\(VIEW_THEME_ADDRESS, THEME_TIER/.test(module), 'and the appearance route writes its act whole (D-97)').toBe(true)
    expect(
      (module.match(/\.write\(VIEW_/g) ?? []).length,
      'FOUR routes write, and the ONE repair path writes through ONE helper — a fifth write site would be a write path clause 4 has not seen',
    ).toBe(4)
  })

  it('NO WRITE ON READ, MEASURED BOTH WAYS: a read lands no byte over a standing family, and a read over a store whose batch NEVER RAN answers the declared defaults WITHOUT minting either family', () => {
    // HALF ONE — THE `file` FAMILY, WHERE THE BYTES CAN SHOW IT.
    const path = join(dir, PROFILE_FILE)
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 175 }).status).toBe('committed')
    const stood = readFileSync(path)
    for (let n = 0; n < 3; n += 1) expect(record.read().status).toBe('committed')
    expect(readFileSync(path).equals(stood), 'a read lands no byte: the whole-value write is the only writer').toBe(true)

    // HALF TWO — THE `mem` FAMILY, WHERE THE BYTES CANNOT: **A STORE WHOSE BATCH NEVER RAN**, which is the only place a
    // family can be absent while a record reads it (a `delete` on a batched store is repaired inside its own commit —
    // measured in the landing-instant row above, and that is the pair working, not a hole). A read that repaired would
    // write here, and the absence below is what catches it.
    const barePath = join(dir, 'bare.json')
    const bare = createProfileStore({ filePath: barePath })
    const overBare = createViewRecord({ store: bare as unknown as ViewRecordStore }).read()
    expect(overBare.source, 'no declaration ran, so no family of the FOUR stands').toEqual({
      panes: 'default',
      focus: 'default',
      zones: 'default',
      theme: 'default',
    })
    expect(overBare.panes, 'the pane family answers the measured default through the declared arm, never a minted record').toEqual([])
    expect(overBare.focus, 'and the mirror the declared empty pair').toEqual({ entries: [], activeId: null })
    expect(overBare.zones, 'and the zone family at the arm that names no zone — never a geometry minted at a read').toEqual([])
    expect(
      overBare.theme,
      'and the appearance record at the placeholder, whose declaration names no attribute — never a resolution minted at a read (D-97)',
    ).toEqual({ token: null, attribute: null, declaration: { name: null, value: '', removal: true } })
    for (const address of [VIEW_PANES_ADDRESS, VIEW_FOCUS_ADDRESS, VIEW_ZONES_ADDRESS, VIEW_THEME_ADDRESS]) {
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
  it('THE SHAPE ARMS ANSWER BEFORE ANY STORE VERB: a pane with no id, a non-plain geometry, an unusable size and an unusable bounds pair are each refused under this module\'s own reason, and neither family moved', () => {
    const before = record.read()
    expect(record.commitPane('', { size: 1 }), 'no pane id').toMatchObject({ status: 'refused', reason: PANE_SHAPE_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, null), 'no plain geometry record').toMatchObject({ status: 'refused', reason: PANE_SHAPE_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { size: Number.NaN }), 'a size that is not a finite number').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { size: -1 }), 'a negative size').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { bounds: { min: 0 } }), 'a bounds pair with one member').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.commitPane(DEFAULT_PANE_ID, { bounds: { min: 300, max: 100 } }), 'and a pair whose min exceeds its max').toMatchObject({ status: 'refused', reason: PANE_GEOMETRY_REASON })
    expect(record.read(), 'no refused act moved either family').toEqual(before)
  })

  it('ONE MEMBER IS FILLED, NOT ERASED: a commit naming a size alone keeps the pane\'s standing bounds — the renderer\'s release turn writes a size and nothing else', () => {
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 250, bounds: { min: 5, max: 500 } }).status).toBe('committed')
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 260 }).status, 'the size alone').toBe('committed')
    expect(record.read().panes, 'the bounds the family stood at survive the narrower act').toEqual([
      { id: DEFAULT_PANE_ID, size: 260, bounds: { min: 5, max: 500 } },
    ])
    // AND A SIBLING PANE IS NOT ERASED BY AN ACT ON ANOTHER — the family is composed, not replaced by one member.
    expect(record.commitPane('pane-z', { size: 90, bounds: { min: 0, max: 200 } }).status).toBe('committed')
    expect(record.commitPane(DEFAULT_PANE_ID, { size: 261 }).status).toBe('committed')
    expect(record.read().panes.map((pane) => pane.id).sort(), 'both panes stand').toEqual(['pane-a', 'pane-z'])
  })

  it('THE FOCUS ROUTE\'S ARMS: a non-record, an entry list that is not a list, an entry with no comparable id, an id repeated, and an active id that names no entry — each refused under its own reason, the last one under the token this module mints for it', () => {
    const before = record.read()
    expect(record.commitFocus(null), 'no mirror').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    expect(record.commitFocus({ entries: 7 }), 'an entry list that is not a list').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    expect(record.commitFocus({ entries: [{ target: 'x' }] }), 'an entry with no id').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    expect(record.commitFocus({ entries: [{ id: {}, target: 'x' }] }), 'an id `===` cannot compare by value').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    expect(record.commitFocus({ entries: [{ id: 'a', target: null }] }), 'a target the crossing would refuse').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    expect(record.commitFocus({ entries: [{ id: 'a', target: 'a' }, { id: 'a', target: 'b' }] }), 'one id twice').toMatchObject({ status: 'refused', reason: FOCUS_SHAPE_REASON })
    // **THE DANGLING ARM, UNDER ITS OWN TOKEN** — the `order` seat's fault at the other family (D-83), and the sentence
    // names the mirror's own membership rather than a shape.
    expect(record.commitFocus({ entries: [{ id: 'a', target: 'a' }], activeId: 'b' }), 'an active id the mirror does not hold').toMatchObject({
      status: 'refused',
      reason: DANGLING_ACTIVE_REASON,
    })
    expect(record.read(), 'and the mirror stands exactly as it stood').toEqual(before)
  })

  it('THE MIRROR ROUTE CARRIES THE MODEL\'S STATE WHOLE, WITH THE ABSENT ACTIVE SPELLED AS ABSENCE: a two-entry mirror with one active round-trips, and the same mirror with nothing active writes NO `activeId` member at all', () => {
    const mirror: ViewFocusMirror = {
      entries: [
        { id: 'a', target: 'page://a', label: 'one' },
        { id: 'b', target: 'page://b' },
      ],
      activeId: 'b',
    }
    expect(record.commitFocus(mirror).status, 'the whole mirror lands').toBe('committed')
    expect(record.read().focus, 'and reads back as it was written').toEqual(mirror)
    expect(record.commitFocus({ entries: mirror.entries, activeId: null }).status).toBe('committed')
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    expect(store.read(VIEW_FOCUS_ADDRESS as never, 'mem'), 'nothing active is NO member, because `null` cannot cross the boundary').toEqual({
      entries: [{ id: 'a', target: 'page://a', label: 'one' }, { id: 'b', target: 'page://b' }],
    })
    expect(record.read().focus.activeId, 'and the read answers the model\'s `null` for it').toBeNull()
  })

  it('THE PURE DEFAULT, OUT OF A READING AND WITH NO STORE VERB: `paneGeometryIn` answers the measured geometry for a pane the family does not name, says so, and answers the record\'s own when it does', () => {
    const panes = record.read().panes
    expect(paneGeometryIn(panes, DEFAULT_PANE_ID), 'the family names it').toEqual({
      status: 'committed',
      pane: { id: DEFAULT_PANE_ID, size: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } },
      source: 'record',
    })
    expect(paneGeometryIn(panes, 'pane-never-written'), 'and one it does not').toEqual({
      status: 'committed',
      pane: { id: 'pane-never-written', size: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } },
      source: 'default',
    })
  })
})

// ═══════════════ THE WIRING: ONE BATCH, ONE CONSTRUCTION, ONE PAIR OF LOCKSTEP DECLARATIONS ═══════════════

describe('view-record · the boot\'s wiring, read as code and never as prose', () => {
  it('THE BATCH IS THE TAB RECORD\'S SIX AND THIS MODULE\'S FOUR, IN THE ONE `createProfileStore` CALL — over comment-elided code, with the raw bytes carrying the names as the positive control', () => {
    const main = commentElided(sourceOf('src/main/main.ts'))
    expect(main.includes('...tabsConstraintDeclarations('), 'the tab record\'s six are spread into the batch').toBe(true)
    expect(main.includes('...viewConstraintDeclarations('), 'and this module\'s four into the SAME array').toBe(true)
    // ONE CONSTRUCTION SITE, AND IT IS THE BOOT'S: a second `createProfileStore(` in the entry would be the third instance
    // the purge refuses (D-78, D-79). The count is stated as a figure a new site would break.
    expect((main.match(/createProfileStore\s*\(/g) ?? []).length, 'the entry constructs the profile store exactly once').toBe(1)
    expect(main.includes('viewSurface.attach()'), 'and the push is attached where the tab record\'s is').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_READ'), 'the read handler is registered').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_PANE_COMMIT'), 'the pane route\'s handler is registered').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_FOCUS_COMMIT'), 'the focus route\'s').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_ZONES_COMMIT'), 'and the zone route\'s (D-91)').toBe(true)
    expect(main.includes('ipcMain.handle(IPC_VIEW_THEME_COMMIT'), 'and the appearance route\'s (D-97)').toBe(true)
    // THE POSITIVE CONTROL: the RAW bytes carry the names too, so the four assertions above are about code that exists.
    expect(sourceOf('src/main/main.ts').includes('viewConstraintDeclarations'), 'the raw bytes name it').toBe(true)
  })

  it('THE BRIDGE MEMBER IS ONE DECLARATION IN TWO FILES, AND THE TWO ARE COMPARED RATHER THAN CITED: `src/main/preload.ts`\'s `view` block and `src/renderer/secure-panels.ts`\'s `view?` block are the same FIVE routes, member for member', () => {
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
    expect(panels, 'the renderer\'s `declare global` half carries the SAME six routes as the preload\'s').toEqual(preload)
    expect(preload, 'which are the module\'s six: read, commitPane, commitFocus, commitZones, commitTheme, onChanged').toEqual([
      "read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; focus: ViewFocusMirror; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; focus: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>",
      "commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "commitFocus(mirror: ViewFocusMirror): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      "commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>",
      'onChanged(handler: () => void): () => void',
    ])
    expect([IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_FOCUS_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_CHANGED], 'and the six channel names are single-sourced in one shared module').toEqual([
      'provident:view:read',
      'provident:view:pane-commit',
      'provident:view:focus-commit',
      'provident:view:zones-commit',
      'provident:view:theme-commit',
      'provident:view:changed',
    ])
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
