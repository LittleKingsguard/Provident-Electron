// tests/integration/central-data/declared-root.test.ts — **THE TIER IS THE CALLER'S, AND A DECLARED ROOT'S TIER
// IS NOT** (`D-101`). AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES
// (D-40, `AGENTS.md`).
//
// WHAT THIS BATTERY EXISTS FOR, IN ONE SENTENCE: two defects were measured against `data.*` and each one was a
// consequence of the surface not being able to name a tier, so the rows below drive the tier member, the
// declared-root guard that the member makes possible, and the two defects' own arms — the one that now refuses
// and the one that still stands.
//
//   A. `const FILE_TIER: DataTier = 'file'` was a constant of the module and never a property of the address, so
//      ONE `data.write({ path: ['zones'], value })` created a `file` version of a root `view-record` declares at
//      `mem`. From that instant `store.read(['zones'], 'mem')` threw `TierNotFound`, `viewRecord.read()` answered
//      `source.zones: 'default'` forever, a restart did not heal it and `data.delete(['zones'])` answered
//      `removed:false` over a row that stood. The defect was measured at the view record's OTHER `mem` root too, and
//      `D-142` deleted that family WHOLE — address, declaration, declared-root entry and route — so this battery's
//      `mem` arms are RE-GRAINED onto the sibling that SURVIVES, the same guard over the same tier and the same
//      family class (`D-9`, `D-101`, `D-142`).
//   B. `panes-must-stand` accepts any plain record, so `data.write({ path: ['panes'], value: { junk: true } })`
//      durably erased the pane geometry while `source.panes` still said `'record'`.
//
// **WHAT THIS PASS CLOSED, AND WHAT A LATER ONE HAS SINCE CLOSED — BOTH CLAUSES ARE KEPT RATHER THAN OVERWRITTEN**
// (`D-46`): `A` is closed at BOTH arms — the refusal and the lawful write — because the fault was the tier and the
// tier is the address's. `B` was closed at its TIER arm ONLY by `D-101`: the same write at `mem` or `temp` was
// refused, while the write at the family's OWN tier still landed and still erased the geometry, because the pair
// enforced EXISTENCE and not shape (`D-87`) and narrowing it was a new constraint — a design act and not this
// surface's. `D-5` below pinned that residual half as the state the product had, so it was named rather than left to
// be discovered, AND ITS OWN TEXT SAID IT WOULD RED THE DAY SOMEBODY CLOSED IT: `D-105` gave six families' pairs a VALUE
// ARM, `D-5` was INVERTED in place with every control kept, and the corruption path this file exists to police is now
// refused at every tier.
//
// **THE RESTART HERE IS A SECOND CONSTRUCTION, NOT A SECOND PROCESS** (`behaviour.md` §3, `D-98`'s own arm): a
// store is the file plus its register, so a fresh `createProfileStore` over the same `filePath`, with the same
// batch, is what a new process meets. The `mem` tier's real process boundary is the `crossings` leg's, and no row
// here claims it (`brief.md` §6).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import { createDataSurface, type DataSurface } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { createTabsDelivery, tabsConstraintDeclarations, tabsDeclaredRoots } from '../../../src/main/tabs-record'
import {
  createViewDelivery,
  createViewRecord,
  viewConstraintDeclarations,
  viewDeclaredRoots,
  type ViewRecord,
  type ViewRecordStore,
} from '../../../src/main/view-record'
import { DEFAULT_ZONE_SIZES } from '../../../src/shared/view-shape'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

/** The address the app's one construction writes, spelled here because a row asserts over its BYTES (`D-13`). */
const at = (dir: string, name: string = PROFILE_FILE): string => join(dir, name)

/** **THE TWO CROSSINGS' BATCH, MAPPED THE WAY `src/main/main.ts` MAPS IT** — both modules' declarations in one
 *  construction, because a surface stood over a store carrying only half the batch would be measuring a store the
 *  app does not have (`D-65`, `D-87`, `D-91`, `D-97`). The holder is bound after the call answers, exactly as the
 *  boot binds it, which is why the two unwrapped pairs act at the registration instant and the rest abstain. */
function boot(dir: string, listeners: readonly unknown[] = []): ViewRecordStore {
  const holder: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: at(dir),
    constraints: [
      ...tabsConstraintDeclarations(() => holder.current),
      ...viewConstraintDeclarations(() => holder.current),
    ].map((declaration) => ({ address: declaration.address, id: declaration.id, constraint: declaration.constraint })) as never,
    // **AND THE SAME CONSTRUCTION ADOPTS THE CROSSINGS' `cfg.listeners` ENTRIES** (`D-219`, `docs/L3/app-shell/delivery.md`
    // §5 `A-3`): the app's one call carries five of them, so a fixture that modelled the batch alone would measure a store
    // the app does not have — the argument this docblock already makes for the batch, one list over. A caller asking for
    // the ordinary no-listener store passes nothing and gets the empty array the package documents (`guide §6`, `:561`).
    listeners: listeners as never,
  }) as unknown as ViewRecordStore
  holder.current = store
  return store
}

interface Standing {
  readonly dir: string
  readonly store: ViewRecordStore
  readonly surface: DataSurface
  readonly view: ViewRecord
  /** A SECOND construction over the same bytes — what the next process meets (`behaviour.md` §3). */
  restart(): Standing
}

const standing: string[] = []

function stand(dir = mkdtempSync(join(tmpdir(), 'declared-root-'))): Standing {
  if (!standing.includes(dir)) standing.push(dir)
  // **THE DELIVERIES ARE BUILT BEFORE THE STORE, BECAUSE ITS `listeners` ARRAY IS READ INSIDE THE CALL THAT CREATES IT**
  // (`D-219`, `docs/L3/view-record/delivery.md` §1, `docs/L3/store-tabs-record/delivery.md` §2). This fixture delivers
  // NOWHERE — it subscribes to nothing — so its sink is the recorder the design names for a battery, and what the two
  // entries buy here is a store carrying every list the app's construction carries, not a push this file reads.
  const sink: (readonly string[])[] = []
  const tabsDelivery = createTabsDelivery((address) => sink.push([...address]))
  const viewDelivery = createViewDelivery((address) => sink.push([...address]))
  const store = boot(dir, [...tabsDelivery.entries, ...viewDelivery.entries])
  return {
    dir,
    store,
    surface: createDataSurface({ profileDir: dir, store: store as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }),
    view: createViewRecord({ store, delivery: viewDelivery }),
    restart: () => stand(dir),
  }
}

afterEach(() => {
  for (const dir of standing.splice(0)) rmSync(dir, { recursive: true, force: true })
})

/** A source read with comment lines and block comments ELIDED — the only form an absence may be asserted on, and
 *  the form any presence assertion uses where prose could carry the spelling (`D-81`'s hollow-green class). */
function commentElided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

const sourceOf = (path: string): string => readFileSync(new URL(path, REPO), 'utf8')

const rootOf = (address: readonly string[]): string => String(address[0])


/** **THE ZONE ID THIS FILE ADDRESSES — ONE OF THE FOUR THE RECORD DECLARES** (`D-181`, `D-151`; `D-192` retired
 *  `DEFAULT_ZONE_ID`, whose `zone-1` names nothing once the set widened). */
const ZONE = 'top'
/** **THE PLACEHOLDER THE CREATION REPAIR MINTS, READ FROM `DEFAULT_ZONE_SIZES` AND NEVER SPELLED HERE** (`D-233`): since
 *  `D-233` each declared zone's record STATES its declared default `size` — a memberless record was the node a leaf write
 *  could land under and not a zone the paint could present — so this fixture reads the table the repair itself reads. A
 *  figure hard-coded beside it would be the count-slip class this corpus keeps re-taking. */
const ZONE_DEFAULTS = [...DEFAULT_ZONE_SIZES].slice().sort((left, right) => left.id.localeCompare(right.id))
/** The same placeholder as a VALUE — the family the repair lands, member for member. */
const ZONE_PLACEHOLDER: Record<string, { size: number }> = Object.fromEntries(
  ZONE_DEFAULTS.map((entry) => [entry.id, { size: entry.size }]),
)
/** The same placeholder as a READING, in sorted-id order — the store answers its own key order, which no row here claims. */
const ZONE_MEMBERLESS = ZONE_DEFAULTS.map((entry) => ({ id: entry.id, size: entry.size }))

describe('the tier is the caller’s, and a declared root’s tier is not (D-101)', () => {
  it('D-1 · the guarded set IS the two crossings’ own publications — the declaration batches PLUS the one root declared with no pair — and src/main/data/surface.ts spells neither a root nor a tier', () => {
    // THE SET, BOTH DIRECTIONS. The surface imports its roots from the modules that own them (`D-53`'s rule: a
    // second spelling is the drift this corpus keeps catching), so what is guarded HERE cannot disagree with what
    // the modules PUBLISH — and the day one list gains an entry the other has not, this row reddens.
    const batchRoots = new Map<string, string>()
    for (const declaration of [...tabsConstraintDeclarations(() => null), ...viewConstraintDeclarations(() => null)]) {
      const root = rootOf(declaration.address)
      // Six of the tab record's declarations stand at ONE root: a family is one whole value, so a root declared
      // twice is one entry and not two (`D-87`).
      if (!batchRoots.has(root)) batchRoots.set(root, declaration.id)
    }
    // **THIS IS THE ROOT DECLARED AND UNPAIRED, AND IT IS NAMED HERE SO THAT A SECOND ONE REDS** (`D-101`;
    // `pane-drag-temp` `R-1`, L1 §1): `['drag']` at `temp` carries an address, a tier constant and a
    // `viewDeclaredRoots()` entry, and NO `viewConstraintDeclarations` row — no invariant holds the family, and a
    // repair whose subject is *"no drag has started"* would mint a placeholder for data whose ABSENCE IS THE
    // PRODUCT. **THAT IS LAWFUL AND IT IS NOT A GAP TO BE CLOSED BY MINTING A PAIR**: the guard keys on the roots it
    // is HANDED and not on the batch (`declaredTierLedger`), so the entry ALONE buys the `temp` family the one
    // judgement it has — a `file` or `mem` write at it is refused `declared-tier`, which is the arm `D-3` drives at
    // this root. The equality below is the batch PLUS this literal, so an entry that arrives without a declaration
    // reds here rather than being absorbed, and a pair minted at `['drag']` reds here too, because the literal would
    // then stand beside a declaration that already names the root.
    const unpaired = ['drag']
    const published = [...tabsDeclaredRoots(), ...viewDeclaredRoots()]
    const publishedRoots = published.map((root) => rootOf(root.address)).sort()
    expect(publishedRoots, 'the published roots are the declared roots plus the one declared without a pair, root for root').toEqual([...batchRoots.keys(), ...unpaired].sort())
    // **THE CONTROL THAT MAKES THE SET A MEASUREMENT — AND THE ONE PLACE THE COUNT LIVES** (`D-43`, `D-101`): the
    // publication is the set, root for root, and no other document or battery restates how many roots there are.
    expect([...batchRoots.keys()].sort(), 'the roots a constraint DECLARES are four — the drag root is published and declares nothing, so it is not one of them').toEqual(['panes', 'tabs', 'theme', 'zones'])
    expect(publishedRoots.filter((root) => !batchRoots.has(root)), 'and exactly ONE published root carries no declaration, so the unpaired arm above cannot absorb a second').toEqual(['drag'])
    expect(published.length, 'and the publication is FIVE roots — the four declared and the one declared without a pair — one pair per root, not one per declaration').toBe(5)
    // THE TIERS, READ OFF THE TWO MODULES' OWN CONSTANTS AND NOT OFF THIS FILE: the one `mem` root is the family
    // that can never come from a file (`D-84`), `temp` is the one root whose tier persists nowhere, and everything
    // else is durable — `D-142` took the other `mem` root with the family it belonged to, and the publication lost
    // the pair with the declaration.
    expect(Object.fromEntries(published.map((root) => [rootOf(root.address), root.tier])), 'each root at the tier its own module writes it at, the temp one included').toEqual({
      tabs: 'file', panes: 'file', zones: 'mem', theme: 'file', drag: 'temp',
    })

    // **AND THE SURFACE ITSELF SPELLS NONE OF THEM.** The guard is a READ of the published pairs, so the code that
    // refuses a crossing must name no root and no tier of its own — with the control that the RAW bytes do, which
    // is what proves the elision is doing the work rather than the file being silent anyway.
    const code = commentElided(sourceOf('src/main/data/surface.ts'))
    const raw = sourceOf('src/main/data/surface.ts')
    for (const spelling of ['panes', 'zones', 'tabs']) {
      expect(code.includes(`'${spelling}'`), `the surface's CODE names no root: '${spelling}'`).toBe(false)
      expect(raw.includes(spelling), `the control: the same name DOES stand in its prose, so the elision above is what removed it: '${spelling}'`).toBe(true)
    }
    // **THE APPEARANCE ROOT'S TOKEN IS ABSENT FROM BOTH READINGS, AND THAT IS ANOTHER UNIT'S CENSUS RATHER THAN A
    // HOLE HERE**: `tests/theme.test.ts`'s `X-5` asserts that the appearance vocabulary appears in `src/**/*.ts`
    // outside its own exempt paths in ZERO files, so this module's prose does not spell it — the row is RE-WORDED
    // around it rather than the census widened, which is what `D-97` did with three rows of its own. The guard covers
    // it all the same, because the set above is the modules' and not this file's: `['theme']` at `file` is driven in
    // `D-3`. **AND THE DRAG ROOT'S TOKEN IS ABSENT FROM BOTH READINGS FOR THE SAME REASON** — the surface's bytes name
    // it nowhere at all (prose included, measured), so it cannot be a spelling CONTROL and is covered the same way:
    // `['drag']` at `file` and at `mem` is driven in `D-3`.
    expect(raw.includes('theme'), 'the control for the elision is taken on the three roots the file\'s prose names').toBe(false)
    for (const tier of ["'file'", "'mem'", "'temp'"]) {
      expect(code.includes(tier), `and no tier literal of its own: ${tier} — the domain and the two defaults are args.ts's, the type is types.ts's`).toBe(false)
    }
    expect(code.includes('options.declaredRoots'), 'and the one member it DOES read for the set is the option its caller hands it').toBe(true)
  })

  it('D-2 · defect A, first arm: a write at [\'zones\'] asking for `file` is REFUSED, and the family’s `mem` register is untouched behind it', () => {
    const one = stand()
    const stood = readFileSync(at(one.dir))
    const before = one.store.read(['zones'], 'mem')
    expect(before, 'the family stands at `mem` before the attempt, so the reading after it is not a reading of nothing — every DECLARED zone id with an empty record (`D-151`)').toEqual(ZONE_PLACEHOLDER)
    expect(one.view.read().source.zones, 'and the record reads its family as a RECORD — the state the defect destroyed').toBe('record')

    const refused = one.surface.write({ path: ['zones'], tier: 'file', value: { [ZONE]: { size: 10 } } })
    expect(refused.status, 'A CROSSING\'S ROOT IS WRITTEN ONLY AT ITS FAMILY\'S TIER').toBe('refused')
    expect(refused.status === 'refused' ? refused.reason : '', 'and the reason word is the twelfth, minted by this pass').toBe('declared-tier')
    const message = refused.status === 'refused' ? refused.message : ''
    expect(message.includes("'zones' is declared at 'mem'"), 'the sentence names the ROOT and the tier the family declares').toBe(true)
    expect(message.includes("this write asks for 'file'"), 'and the tier this call asked for, so a caller corrects it without reading a document').toBe(true)

    // NOTHING MOVED, ON ALL FOUR READINGS THE DEFECT MOVED:
    expect(one.store.read(['zones'], 'mem'), 'the store still answers at the family\'s own tier — no `TierNotFound`, which was the defect\'s first symptom').toEqual(ZONE_PLACEHOLDER)
    expect(one.view.read().source.zones, 'the record still reads a RECORD and never the default the defect left behind').toBe('record')
    expect(one.view.read().zones, 'and its value is the declared zone, memberless, not the caller\'s zones').toEqual(ZONE_MEMBERLESS)
    expect(readFileSync(at(one.dir)).equals(stood), 'the profile is byte-identical: a refusal lands no byte').toBe(true)
    expect(one.surface.journal({}), 'and mints no cursor and adds no journal entry (D-12)').toEqual({ status: 'read', from: 0, through: 0, floor: 0, entries: [], count: 0 })

    // THE RESTART HEALS NOTHING BECAUSE NOTHING WAS BROKEN — the arm the defect made permanent.
    const next = one.restart()
    expect(next.view.read().source.zones, 'and a restart has nothing to heal, because no `file` version was ever created').toBe('record')
    expect(next.store.read(['zones'], 'mem'), 'the family is re-minted at its placeholder, as it is at every boot — the declared zone with an empty record').toEqual(ZONE_PLACEHOLDER)
  })

  it('D-3 · defect A’s silent default: the two calls the defect was MADE of — a `write` and a `delete` that name no tier — are refused the same way', () => {
    const one = stand()
    // THE TWO CALLS, VERBATIM FROM THE DEFECT: `data.write({ path: ['zones'], value })` and `data.delete(['zones'])`.
    // Both are driven by an agent that never heard of a tier, which is exactly the caller the module constant was
    // invisible to. A default that quietly resolved to `file` is how the defect happened, so the guard runs on the
    // RESOLVED tier and refuses both — `delete`'s second half included, where the defect answered `removed:false`
    // over a row that stood.
    for (const [label, answer] of [
      ['write', one.surface.write({ path: ['zones'], value: {} })],
      ['delete', one.surface.delete({ path: ['zones'] })],
    ] as const) {
      expect(answer.status, `${label} at ['zones'] with no tier is refused`).toBe('refused')
      expect(answer.status === 'refused' ? answer.reason : '', `${label}: and the reason is the declared root's`).toBe('declared-tier')
      expect(answer.status === 'refused' ? answer.message.endsWith(`this ${label} asks for 'file'`) : '', `${label}: the default is named in the sentence, so an omitted member is not silent`).toBe(true)
    }
    // AND THE SAME GUARD AT EVERY DECLARED ROOT, EACH AT BOTH WRONG TIERS: this is the set, driven rather than read.
    // **THE FAMILY `D-142` DELETED IS NOT IN IT**, because the set is the crossings' and no crossing declares that
    // address any more — and an UNDECLARED root is ADMITTED, which is the arm driven by this row's own control below
    // and by the e2e row that measures the deleted address directly (`D-101`, `D-142`).
    // **AND `['drag']` IS IN IT, WHICH IS THE ARM ITS UNPAIRED ENTRY BUYS** (`D-1`, `pane-drag-temp` `R-1`): a root
    // declared with NO constraint row is still a declared root to this guard, because `declaredTierLedger` keys on the
    // roots the surface is HANDED and not on the batch — so a `file` or `mem` shadow of the `temp` family is refused
    // exactly as the three paired roots' shadows are. **ITS OWN TIER IS NOT A WRONG TIER AND IS NOT LISTED**: `temp`
    // is the tier the entry DECLARES, and the control below drives a write there to prove the refusals above are the
    // TIER's and not a refusal of the address.
    const wrong = { tabs: ['mem', 'temp'], panes: ['mem', 'temp'], theme: ['mem', 'temp'], zones: ['file', 'temp'], drag: ['file', 'mem'] } as const
    for (const [root, tiers] of Object.entries(wrong)) {
      for (const tier of tiers) {
        const answer = one.surface.write({ path: [root], tier, value: { a: 1 } })
        expect({ root, tier, status: answer.status, reason: answer.status === 'refused' ? answer.reason : null }, `['${root}'] at '${tier}' is refused`).toEqual({ root, tier, status: 'refused', reason: 'declared-tier' })
      }
    }
    // THE OTHER ARM AT THE UNPAIRED ROOT: the tier the entry declares is ADMITTED, so the two refusals above are the
    // declared tier's boundary and no blanket over `['drag']` — and nothing judges the value, because no pair stands
    // at this root (`D-105`, `D-132`).
    expect(one.surface.write({ path: ['drag'], tier: 'temp', value: { 'pane-a': { height: 120 } } }).status, 'the unpaired root\'s OWN tier is admitted, so the guard refuses a crossing and never the family').toBe('committed')
    // AND THE GUARD IS BELOW THE ROOT TOO: a family is ONE value at its root, so every address under it is that
    // root's tier — a descendant write at another tier is the same lie one segment down.
    expect(one.surface.write({ path: ['panes', 'pane-a', 'height'], value: 1, tier: 'mem' }).status, 'a descendant of a declared root is guarded by its ROOT').toBe('refused')
    // THE POSITIVE CONTROL: an address that no crossing declares is untouched by the guard at all three tiers.
    for (const tier of ['file', 'mem', 'temp'] as const) {
      expect(one.surface.write({ path: ['alpha'], value: tier, tier }).status, `an undeclared root still writes at '${tier}', so the refusals above are not a blanket`).toBe('committed')
    }
  })

  it('D-4 · defect A, second arm: the SAME write at `mem` commits, the family’s own read() sees it, and a restart takes it away — a `mem` write is this process’s and persists nowhere', () => {
    const one = stand()
    const stood = readFileSync(at(one.dir))
    const family = { [ZONE]: { size: 10 } }

    const landed = one.surface.write({ path: ['zones'], tier: 'mem', value: family })
    // **AND THE ANSWER NAMES THE PASS THAT JUDGED IT** (`D-103`) — WHICH IS NOW THE REPAIR'S, NOT THE CLEAN ARM'S
    // (`D-233`'s item (4), `D-9` one row down): a root write naming ONE zone is a family whose other three DECLARED ids
    // state no `size`, so the pair's `size` arm repairs it INSIDE THE CALLER'S OWN COMMIT and the receipt says
    // `repaired:true` with the `repair-run` in its log. **THE ROW'S SUBJECT IS UNMOVED AND ITS ARM IS THE OPPOSITE ONE**:
    // what it must still prove is that a lawful write at the family's own tier COMMITS AND IS SERVED BY THE FAMILY'S OWN
    // READ, and that a restart takes it away — so the receipt is re-grained to the receipt this head answers rather than
    // the assertion being dropped. **WHAT IT NOW CATCHES**: a `mem` write that stopped being admitted at its own tier, a
    // receipt that stopped naming the pass that judged it, and — one line down — a completion that dropped the caller's own
    // figure or invented figures for a zone the caller named.
    expect(landed, 'a write at the family\'s own tier is admitted, completed by the pair, and the answer names both').toEqual({
      status: 'committed', path: ['zones'], cursor: 1, repaired: true,
      log: [
        { kind: 'constraint-check', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'repair-run', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'constraint-check', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null },
      ],
    })
    // THE FAMILY'S OWN READ IS THE OBSERVABLE, and it is the one the defect broke: `viewRecord.read()` serves what
    // the surface wrote because the two now address the same tier — **THE CALLER'S `10` CARRIED AND THE OTHER THREE DECLARED
    // IDS STATED AT THEIR DECLARED DEFAULTS**, which is the completion `D-233` added: the write is no longer replaced whole
    // by a placeholder, and it is no longer left three-zones-short either.
    expect(one.view.read().zones, 'the record reads the caller\'s figure, carried, beside the three declared defaults the repair supplied').toEqual([
      ...ZONE_MEMBERLESS.filter((zone) => zone.id !== ZONE),
      { id: ZONE, size: 10 },
    ])
    expect(one.view.read().source.zones, 'and still reports the family as a RECORD').toBe('record')
    // **THE ARM IS `branch` AND NOT `row`, WHICH IS A MEASUREMENT AND NOT A PREFERENCE** (D-11's `ASM-L2-2`): a `row`
    // is a LITERAL at an exact address and the family is a container, so `readLiteral` answers `ReadTargetIsBranch`
    // and the surface serves the assembled branch — exactly what `['tabs']` answers for the same reason.
    // **AND THE ANSWER'S `value` IS §2a'S NODE** (`D-134`): the family is an OBJECT node with its members INLINE, each
    // member a node of its own and the leaf's `size` carrying its literal under `value` — so the container's shape and the
    // readout are ONE claim here, and neither can be asserted apart from the other. **THE NODE IS THE COMPLETED FAMILY**
    // (`D-233`): four declared ids, the caller's `10` on `top` and each sibling at its declared default, every `size` a
    // node of its own — the shape a read that dropped a member, or that handed back the caller's value alone, would red.
    const familyNode = {
      _tier: 'mem',
      ...Object.fromEntries(ZONE_MEMBERLESS.map((zone) => [
        zone.id,
        { _tier: 'mem', size: { _tier: 'mem', value: zone.id === ZONE ? 10 : zone.size } },
      ])),
    }
    expect(one.surface.read({ path: ['zones'], tier: 'mem' }), 'the surface reads it back at its own tier, as the container the family is').toEqual({ status: 'read', kind: 'branch', path: ['zones'], value: familyNode })
    expect(one.surface.read({ path: ['zones'] }), 'and an unqualified read serves it too — the store\'s own lowest-persistence-present, which is `mem` where only `mem` stands').toEqual({ status: 'read', kind: 'branch', path: ['zones'], value: familyNode })
    // **AND NO BYTE OF IT IS IN THE PROFILE**: a `mem` write is the instance's register, which `D-84` measured and
    // this row re-measures at this address — the family whose boot data can never come from a file.
    expect(readFileSync(at(one.dir)).equals(stood), 'the profile is byte-identical across a `mem` write').toBe(true)
    expect(Object.keys(JSON.parse(readFileSync(at(one.dir), 'utf8')) as Record<string, unknown>), 'and carries no `zones` root at all').not.toContain('zones')

    // THE RESTART: a second construction over the same bytes. The `mem` register is the INSTANCE's, so the caller's
    // family is GONE and the family's pair re-mints the placeholder at the registration instant (`D-84`, `D-91`) — the
    // placeholder being every DECLARED zone id at its declared default `size` (`D-151`, `D-233`).
    const next = one.restart()
    expect(next.store.read(['zones'], 'mem'), 'the next process\'s family register is the placeholder again, not the caller\'s family').toEqual(ZONE_PLACEHOLDER)
    expect(next.view.read().zones, 'so the record answers every declared zone at its declared default figure — the caller\'s 10 is gone, and so is every trace of the completion that carried it').toEqual(ZONE_MEMBERLESS)
    expect(next.view.read().source.zones, 'and reads its family as a RECORD, because a repair is its lawful source').toBe('record')
    expect(next.surface.read({ path: ['zones'] }), 'and the surface answers the placeholder, never the value it committed before the restart — each zone a `{_tier}` node with its `size` under `value`').toEqual({
      status: 'read',
      kind: 'branch',
      path: ['zones'],
      value: {
        _tier: 'mem',
        ...Object.fromEntries(ZONE_MEMBERLESS.map((zone) => [zone.id, { _tier: 'mem', size: { _tier: 'mem', value: zone.size } }])),
      },
    })
    expect(readFileSync(at(one.dir)).equals(stood), 'with the profile byte-identical across BOTH constructions').toBe(true)
  })

  it('D-5 · defect B, both arms: [\'panes\'] at a mismatched tier is refused BY THE ROOT GUARD, and the plain junk at its OWN tier is refused BY THE PAIR — the residual half this row was written to measure DIES at `D-105`, and its own text said its death would be this refusal', () => {
    const one = stand()
    const geometry = one.view.read().panes
    // **THE THIRD DECLARED PANE JOINS THIS READING, AND THE READING IS THE FAMILY'S WHOLE** (`DECLARED_PANE_IDS` is
    // three ids now): `pane-a` is the STAGE pane — `zone` absent, its own clamp — and `pane-menus`/`pane-inspector` are
    // the TWO zone-resident panes, each at both axis members at the one measured default, `zone: 'top'` and NO `bounds`
    // (`C-9`, `D-186`). The order is the STORE's key order (alphabetical) and not the declaration's, which no row here
    // claims; a repair that stopped writing any declared id, or wrote it with a member the read drops, reds here.
    expect(geometry, 'the pane family stands with the measured default before any attempt — the three DECLARED panes').toEqual([
      { id: 'pane-a', width: 100, height: 100, bounds: { min: 0, max: 200 } },
      { id: 'pane-inspector', width: 100, height: 100, zone: 'top' },
      { id: 'pane-menus', width: 100, height: 100, zone: 'top' },
    ])

    for (const tier of ['mem', 'temp'] as const) {
      const refused = one.surface.write({ path: ['panes'], tier, value: { junk: true } })
      expect({ tier, status: refused.status, reason: refused.status === 'refused' ? refused.reason : null }, `['panes'] at '${tier}' is refused: this family's tier is file, and the sentence names it`).toEqual({ tier, status: 'refused', reason: 'declared-tier' })
    }
    expect(one.view.read().panes, 'and the geometry is untouched by both refusals').toEqual(geometry)

    // **THE RESIDUAL HALF IS CLOSED, AND THIS ROW IS RE-DERIVED RATHER THAN DELETED** (`D-105`). The guard is the
    // TIER's and stays exactly where it stood; the VALUE is `panes-must-stand`'s, and `D-105` gave that pair a VALUE ARM
    // — a refusal with no repair, so the store's own rollback leaves the standing record untouched. The residual half
    // this row was written to measure (`D-101`'s defect B at its OWN tier) no longer lands, so the assertions below are
    // inverted in place with every control kept.
    const stood = readFileSync(at(one.dir))
    const landed = one.surface.write({ path: ['panes'], tier: 'file', value: { junk: true } })
    expect(landed.status, 'the plain junk at the family\'s own tier is now REFUSED — the value arm, not the root guard').toBe('refused')
    expect(landed.status === 'refused' ? landed.reason : '', 'and its reason is the store status the pass answered, carried verbatim under the escape arm — no word is minted by the surface').toBe('store-refused')
    expect(landed.status === 'refused' ? landed.storeStatus : '', 'the store\'s own status: a CONSTRAINT refused the pass, and the package rolled the write back').toBe('ConstraintPassRefused')
    expect(landed.status === 'refused' ? landed.message : '', 'and the sentence is the pair\'s own, naming the fault').toContain('the pane geometry carries a member that is no geometry')
    expect(one.view.read().panes, 'so the geometry SURVIVES — the defect\'s own symptom is no longer reachable at any tier').toEqual(geometry)
    expect(one.view.read().source.panes, 'and the family is still the record the app wrote').toBe('record')
    expect(readFileSync(at(one.dir)).equals(stood), 'and the junk is NOT durable: the profile is byte-identical across the refusal').toBe(true)
    // THE CONTROL THAT KEEPS THIS ROW FROM BEING A SURRENDER: a LEGAL write at the same tier still lands, so the refusal
    // above is the VALUE's and not a blanket on the address.
    const legal = one.surface.write({ path: ['panes'], tier: 'file', value: { 'pane-a': { width: 60, height: 60, bounds: { min: 0, max: 120 } } } })
    expect(legal.status, 'a legal family at the family\'s own tier still commits').toBe('committed')
    expect(one.view.read().panes, 'and it is what the family reads').toEqual([{ id: 'pane-a', width: 60, height: 60, bounds: { min: 0, max: 120 } }])
    const other = stand()
    expect(other.surface.write({ path: ['panes'], tier: 'mem', value: { junk: true } }).status, 'a second profile: `mem` is still refused by the guard').toBe('refused')
    expect(other.view.read().panes, 'and that profile keeps its geometry').toEqual(geometry)
  })

  it('D-6 · the tier domain is the store’s three tokens and nothing else, refused in the register of the other argument arms', () => {
    const one = stand()
    const stood = readFileSync(at(one.dir))
    // THE STORE'S OWN OUT-OF-DOMAIN SET AND TWO OF ITS OWN TRAPS: `null` and `undefined` are not tier-shaped values
    // at all (`guide §5.2`), a capitalised token is outside the domain, and the empty string is too.
    for (const tier of ['secure', 'FILE', 'session', 'disk', '', 0, true, null, undefined]) {
      for (const [label, answer] of [
        ['write', one.surface.write({ path: ['alpha'], value: 'x', tier })],
        ['read', one.surface.read({ path: ['alpha'], tier })],
        ['delete', one.surface.delete({ path: ['alpha'], tier })],
      ] as const) {
        expect({ label, tier, status: answer.status, reason: answer.status === 'refused' ? answer.reason : null }, `${label} with tier ${JSON.stringify(tier)} is malformed arguments`).toEqual({ label, tier, status: 'refused', reason: 'malformed-arguments' })
        expect(answer.status === 'refused' ? answer.message : '', `${label}: the sentence NAMES the member and the domain`).toContain("carries a 'tier' outside the domain ('file', 'mem', 'temp')")
      }
    }
    expect(readFileSync(at(one.dir)).equals(stood), 'and no bad tier moves a byte').toBe(true)

    // THE MEMBER SET, IN THE OTHER DIRECTION: `list` and `journal` declare NO tier — the store publishes no
    // tier-narrowed enumeration, so a tier there would be this surface minting a semantics the package does not
    // — and an own key outside a tool's declared set is refused BY NAME rather than ignored (`interface.md` §1).
    for (const [label, answer] of [
      ['list', one.surface.list({ tier: 'mem' })],
      ['journal', one.surface.journal({ tier: 'mem' })],
    ] as const) {
      expect({ label, status: answer.status, reason: answer.status === 'refused' ? answer.reason : null }, `${label} takes no tier at all`).toEqual({ label, status: 'refused', reason: 'malformed-arguments' })
      expect(answer.status === 'refused' ? answer.message : '', `${label}: and says which member it is`).toContain("carries no 'tier' member")
    }
    // THE CONTROL: the omitted member is not the same call as a bad one — `list` and `journal` answer normally with
    // no `tier` at all, so the refusals above are about MEMBERSHIP and not about the verb.
    expect(one.surface.list({}).status, 'an omitted tier on list is the ordinary call').toBe('read')
    expect(one.surface.journal({}).status, 'and on journal').toBe('read')
  })

  it('D-7 · an ordinary path lands at all three tiers, each reads back at its own WITH ITS NODE NAMING THAT TIER — ONE address, THREE `_tier`s — and only the `file` one survives a restart', () => {
    const one = stand()
    // THE THREE WRITES, EACH AT ITS OWN TIER AND EACH READ BACK AT THAT TIER — the same address `['alpha']`, three
    // versions in three tiers, which is what a tier being the caller's means at a path no crossing owns.
    expect(one.surface.write({ path: ['alpha'], value: 'durable', tier: 'file' }), 'the `file` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 1, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    expect(one.surface.write({ path: ['alpha'], value: 'session', tier: 'mem' }), 'the `mem` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 2, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    expect(one.surface.write({ path: ['alpha'], value: 'transient', tier: 'temp' }), 'the `temp` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 3, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    // A WRITE AT A LOWER TIER DOES NOT DESTROY THE HIGHER ONE (`guide §5.1`: the more persistent version is SHADOWED,
    // not replaced) — so each tier is still readable at its own address, and this is the reading the surface's
    // `tier` member exists to make possible.
    // **AND EACH ANSWER'S LEAF NODE NAMES THE TIER THAT VERSION STANDS AT** (`D-134`): three versions at one address, one
    // read each, and three different `_tier`s — which is the reading a per-call echo of the argument could never give, and
    // why `D-133`'s echo is superseded BY POINTER (D-46) before it was built.
    expect(one.surface.read({ path: ['alpha'], tier: 'file' }), 'the `file` version stands at `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'durable' } })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'the `mem` version stands at `mem`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'mem', value: 'session' } })
    expect(one.surface.read({ path: ['alpha'], tier: 'temp' }), 'the `temp` version stands at `temp`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'temp', value: 'transient' } })
    // **AN UNQUALIFIED READ ANSWERS THE LOWEST PERSISTENCE PRESENT, WHICH IS THE STORE'S OWN DECLARED RULE AND NOT THE
    // MOST DURABLE ONE** (`guide §5.2`'s `read` row: *"legal — the lowest persistence present"*, against the tier
    // order `file > mem > temp`). So it is the `temp` version that answers here, and that is what makes the
    // member's absence a READING and not a default: a caller that wants the durable row names it.
    expect(one.surface.read({ path: ['alpha'] }), 'an unqualified read answers the lowest persistence present, and the node says WHICH tier that was').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'temp', value: 'transient' } })

    // THE RESTART, PER TIER, AND IT IS THE WHOLE POINT OF THE MEMBER: `file` is durable, `mem` and `temp` are not.
    const next = one.restart()
    expect(next.surface.read({ path: ['alpha'], tier: 'file' }), '`file` survives the restart, and its node still names `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'durable' } })
    expect(next.surface.read({ path: ['alpha'], tier: 'mem' }), '`mem` does not: it was this process\'s register').toEqual({ status: 'absent', path: ['alpha'] })
    expect(next.surface.read({ path: ['alpha'], tier: 'temp' }), '`temp` does not either — it is the transient tier, shadowed by `mem` and never durable').toEqual({ status: 'absent', path: ['alpha'] })
    expect(next.surface.read({ path: ['alpha'] }), 'and the unqualified read is the durable one, alone — its node names `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'durable' } })
    expect(readFileSync(at(one.dir), 'utf8').includes('"durable"'), 'the profile carries the durable value').toBe(true)
    for (const gone of ['"session"', '"transient"']) {
      expect(readFileSync(at(one.dir), 'utf8').includes(gone), `and no byte of ${gone}, at any point`).toBe(false)
    }

    // THE DELETE AT A TIER, WHICH IS THE ARM THAT USED TO LIE: `delete` at `mem` removes THAT tier's version and
    // leaves every other tier's standing (`guide §5.3`), so the answer names the tier it removed and the file's row
    // is still served afterwards — where a delete with no tier at all is refused at a declared root (`D-3`) and
    // answers `removed:false` only where no row stands at the tier it named.
    expect(one.surface.delete({ path: ['alpha'], tier: 'mem' }), 'a delete at `mem` of a row that stands commits, and its answer carries the pass that removed it').toEqual({ status: 'committed', path: ['alpha'], removed: true, tiers: ['mem'], cursor: 4, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    expect(next.surface.delete({ path: ['alpha'], tier: 'temp' }), 'a delete at `temp` of a row the restart took away is the empty receipt, not a refusal — and its `log` is EMPTY because no store act was reached, which is not the clean arm\'s shape (`D-103`)').toEqual({ status: 'committed', path: ['alpha'], removed: false, tiers: [], cursor: null, repaired: false, log: [] })
    expect(next.surface.read({ path: ['alpha'], tier: 'file' }), 'and the `file` row is untouched by both — its node still reads `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'durable' } })
  })

  it('D-9 · a value the family’s pair REFUSES is repaired inside the caller’s own commit, and the answer NAMES the repair — `V4`’s receipt member landed at `D-103`, so this row is its evidence no longer a case for it', () => {
    const one = stand()
    // THE ARM `D-5` DOES NOT REACH: there the pair passed a record it admits, so nothing repaired anything.
    // Here the value is not a plain record at all, so the family's EXISTENCE arm names the fault and its repair writes
    // the placeholder — inside the very commit the caller named. **AND THE ANSWER SAYS SO** (`D-103`): `repaired:true`
    // beside a `log` whose second entry is the `repair-run` naming `zones-must-stand` is `D-82`'s `V2` and `V4` paid at
    // this surface, which is the member `D-79` proposed and `D-102` blocked. **THE ROW IS RE-DERIVED AND ITS OLD CLAIM
    // WAS TRUE OF ITS OWN DATE**: it asserted that no member of the receipt named the repair, and that assertion
    // INVERTED here rather than being deleted.
    const landed = one.surface.write({ path: ['zones'], tier: 'mem', value: 'not-a-record' })
    expect(landed, 'the caller is told a change LANDED, what stood is the family’s own value, and the pass that replaced it is named').toEqual({
      status: 'committed', path: ['zones'], cursor: 1, repaired: true,
      log: [
        { kind: 'constraint-check', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'repair-run', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'constraint-check', id: 'zones-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null },
      ],
    })
    expect(one.store.read(['zones'], 'mem'), 'what actually stands is the pair’s PLACEHOLDER — every declared zone at its declared default size (`D-151`, `D-233`) — and the caller’s value is nowhere').toEqual(ZONE_PLACEHOLDER)
    expect(one.view.read().zones, 'the record answers the four declared zones at their declared defaults, never the value that was written').toEqual(ZONE_MEMBERLESS)
    expect(JSON.stringify(landed).includes('"repaired":true'), 'and the verdict SURVIVES JSON, which the store\'s own member does not — so the member a tool answer carries is the one that says it').toBe(true)
    // THE CONTROL: the same write with a value the family ADMITS leaves the caller's own figure standing, so the reading above
    // is the repair and not the tier. **AND THE ADMISSION IS NOW THE `size` ARM'S TOO** (`D-233`): the value names ONE zone,
    // so the other three are completed at their declared defaults — which is why the control's expectation names the
    // caller's `4` BESIDE them rather than alone. **THE TWO ARMS ARE STILL TOLD APART, WHICH IS THIS ROW'S WHOLE CLAIM**: the
    // corrupt value's `repaired:true` replaced it with the placeholder, while this one's `4` SURVIVES the completion. A
    // repair that replaced a lawful value whole would red on the `4`; a completion that dropped the caller's member would
    // red on its absence.
    const admitted = one.surface.write({ path: ['zones'], tier: 'mem', value: { [ZONE]: { size: 4 } } })
    expect(admitted.status, 'a value the family admits commits too').toBe('committed')
    expect(one.view.read().zones, 'and THAT one the record serves the caller\'s figure for, beside the three declared defaults the completion supplied').toEqual([
      ...ZONE_MEMBERLESS.filter((zone) => zone.id !== ZONE),
      { id: ZONE, size: 4 },
    ])
  })

  it('D-8 · a `mem` write is visible to THIS instance and to no other: a second store over the same bytes never serves it', () => {
    const one = stand()
    one.surface.write({ path: ['alpha'], value: 'this-process', tier: 'mem' })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'the writing instance serves its own register, and the node names `mem`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'mem', value: 'this-process' } })
    // A SECOND INSTANCE IN THE SAME PROCESS IS ALREADY A SECOND REGISTER — the `mem` tier is the INSTANCE's, not the
    // process's, and `D-79` measured two instances over one file discarding each other's writes. The row states it
    // at the surface: a surface stood over the second instance answers absence, and the first instance is unmoved.
    const second = createProfileStore({ filePath: at(one.dir) }) as unknown as ViewRecordStore
    const beside = createDataSurface({ profileDir: one.dir, store: second as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
    expect(beside.read({ path: ['alpha'], tier: 'mem' }), 'so "this process only" is stated more narrowly still: the INSTANCE is the unit').toEqual({ status: 'absent', path: ['alpha'] })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'and the writing instance still holds it, its node naming `mem`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'mem', value: 'this-process' } })
    expect(readFileSync(at(one.dir), 'utf8').includes('this-process'), 'with no byte of it in the profile at any point').toBe(false)
  })
})
