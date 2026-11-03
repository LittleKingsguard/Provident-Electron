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
//      ONE `data.write({ path: ['focus'], value })` created a `file` version of a root `view-record` declares at
//      `mem`. From that instant `store.read(['focus'], 'mem')` threw `TierNotFound`, `viewRecord.read()` answered
//      `source.focus: 'default'` forever, a restart did not heal it and `data.delete(['focus'])` answered
//      `removed:false` over a row that stood. Same at `['zones']`.
//   B. `panes-must-stand` accepts any plain record, so `data.write({ path: ['panes'], value: { junk: true } })`
//      durably erased the pane geometry while `source.panes` still said `'record'`.
//
// **WHAT THIS PASS CLOSES AND WHAT IT ONLY MEASURES.** `A` is closed at BOTH arms — the refusal and the lawful
// write — because the fault was the tier and the tier is now the address's. `B` is closed at its TIER arm only:
// the same write at `mem` or `temp` is refused, while the write at the family's OWN tier still lands and still
// erases the geometry, because the pair enforces EXISTENCE and not shape (`D-87`) and narrowing it is a new
// constraint, which is a design act and not this surface's. `D-5` below pins that residual half as the state the
// product has, so it is named rather than left to be discovered — and so it reds the day somebody closes it.
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
import { tabsConstraintDeclarations, tabsDeclaredRoots } from '../../../src/main/tabs-record'
import {
  createViewRecord,
  viewConstraintDeclarations,
  viewDeclaredRoots,
  type ViewRecord,
  type ViewRecordStore,
} from '../../../src/main/view-record'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

/** The address the app's one construction writes, spelled here because a row asserts over its BYTES (`D-13`). */
const at = (dir: string, name: string = PROFILE_FILE): string => join(dir, name)

/** **THE TWO CROSSINGS' BATCH, MAPPED THE WAY `src/main/main.ts` MAPS IT** — both modules' declarations in one
 *  construction, because a surface stood over a store carrying only half the batch would be measuring a store the
 *  app does not have (`D-65`, `D-87`, `D-91`, `D-97`). The holder is bound after the call answers, exactly as the
 *  boot binds it, which is why the two unwrapped pairs act at the registration instant and the rest abstain. */
function boot(dir: string): ViewRecordStore {
  const holder: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: at(dir),
    constraints: [
      ...tabsConstraintDeclarations(() => holder.current),
      ...viewConstraintDeclarations(() => holder.current),
    ].map((declaration) => ({ address: declaration.address, id: declaration.id, constraint: declaration.constraint })) as never,
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
  const store = boot(dir)
  return {
    dir,
    store,
    surface: createDataSurface({ profileDir: dir, store: store as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }),
    view: createViewRecord({ store }),
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

describe('the tier is the caller’s, and a declared root’s tier is not (D-101)', () => {
  it('D-1 · the guarded set IS the two crossings’ own declaration batches, and src/main/data/surface.ts spells neither a root nor a tier', () => {
    // THE SET, BOTH DIRECTIONS. The surface imports its roots from the modules that own them (`D-53`'s rule: a
    // second spelling is the drift this corpus keeps catching), so what is guarded HERE cannot disagree with what
    // the batches DECLARE — and the day one list gains an entry the other has not, this row reddens.
    const batchRoots = new Map<string, string>()
    for (const declaration of [...tabsConstraintDeclarations(() => null), ...viewConstraintDeclarations(() => null)]) {
      const root = rootOf(declaration.address)
      // Six of the tab record's declarations stand at ONE root: a family is one whole value, so a root declared
      // twice is one entry and not two (`D-87`).
      if (!batchRoots.has(root)) batchRoots.set(root, declaration.id)
    }
    const published = [...tabsDeclaredRoots(), ...viewDeclaredRoots()]
    expect(published.map((root) => rootOf(root.address)).sort(), 'the published roots are exactly the declared roots, root for root').toEqual([...batchRoots.keys()].sort())
    // THE CONTROL THAT MAKES THE SET A MEASUREMENT: five roots, and four of them are the view record's.
    expect([...batchRoots.keys()].sort(), 'the declared roots are the five the app declares, and no sixth').toEqual(['focus', 'panes', 'tabs', 'theme', 'zones'])
    expect(published.length, 'and the publication is one pair per root, not one per declaration').toBe(5)
    // THE TIERS, READ OFF THE TWO MODULES' OWN CONSTANTS AND NOT OFF THIS FILE: the two `mem` roots are the two
    // families whose boot data can never come from a file (`D-84`), and everything else is durable.
    expect(Object.fromEntries(published.map((root) => [rootOf(root.address), root.tier])), 'each root at the tier its own module writes it at').toEqual({
      tabs: 'file', panes: 'file', focus: 'mem', zones: 'mem', theme: 'file',
    })

    // **AND THE SURFACE ITSELF SPELLS NONE OF THEM.** The guard is a READ of the published pairs, so the code that
    // refuses a crossing must name no root and no tier of its own — with the control that the RAW bytes do, which
    // is what proves the elision is doing the work rather than the file being silent anyway.
    const code = commentElided(sourceOf('src/main/data/surface.ts'))
    const raw = sourceOf('src/main/data/surface.ts')
    for (const spelling of ['focus', 'panes', 'zones', 'tabs']) {
      expect(code.includes(`'${spelling}'`), `the surface's CODE names no root: '${spelling}'`).toBe(false)
      expect(raw.includes(spelling), `the control: the same name DOES stand in its prose, so the elision above is what removed it: '${spelling}'`).toBe(true)
    }
    // **THE FIFTH ROOT'S TOKEN IS ABSENT FROM BOTH READINGS, AND THAT IS ANOTHER UNIT'S CENSUS RATHER THAN A HOLE
    // HERE**: `tests/theme.test.ts`'s `X-5` asserts that the appearance vocabulary appears in `src/**/*.ts` outside
    // its own exempt paths in ZERO files, so this module's prose does not spell it — the row is RE-WORDED around it
    // rather than the census widened, which is what `D-97` did with three rows of its own. The guard covers it all the
    // same, because the set above is the modules' and not this file's: `['theme']` at `file` is driven in `D-3`.
    expect(raw.includes('theme'), 'the control for the elision is taken on the four roots the file\'s prose names').toBe(false)
    for (const tier of ["'file'", "'mem'", "'temp'"]) {
      expect(code.includes(tier), `and no tier literal of its own: ${tier} — the domain and the two defaults are args.ts's, the type is types.ts's`).toBe(false)
    }
    expect(code.includes('options.declaredRoots'), 'and the one member it DOES read for the set is the option its caller hands it').toBe(true)
  })

  it('D-2 · defect A, first arm: a write at [\'focus\'] asking for `file` is REFUSED, and the family’s `mem` register is untouched behind it', () => {
    const one = stand()
    const stood = readFileSync(at(one.dir))
    const before = one.store.read(['focus'], 'mem')
    expect(before, 'the family stands at `mem` before the attempt, so the reading after it is not a reading of nothing').toEqual({ entries: [] })
    expect(one.view.read().source.focus, 'and the record reads its family as a RECORD — the state the defect destroyed').toBe('record')

    const refused = one.surface.write({ path: ['focus'], tier: 'file', value: { entries: [{ id: 'x', target: 't' }], activeId: 'x' } })
    expect(refused.status, 'A CROSSING\'S ROOT IS WRITTEN ONLY AT ITS FAMILY\'S TIER').toBe('refused')
    expect(refused.status === 'refused' ? refused.reason : '', 'and the reason word is the twelfth, minted by this pass').toBe('declared-tier')
    const message = refused.status === 'refused' ? refused.message : ''
    expect(message.includes("'focus' is declared at 'mem'"), 'the sentence names the ROOT and the tier the family declares').toBe(true)
    expect(message.includes("this write asks for 'file'"), 'and the tier this call asked for, so a caller corrects it without reading a document').toBe(true)

    // NOTHING MOVED, ON ALL FOUR READINGS THE DEFECT MOVED:
    expect(one.store.read(['focus'], 'mem'), 'the store still answers at the family\'s own tier — no `TierNotFound`, which was the defect\'s first symptom').toEqual({ entries: [] })
    expect(one.view.read().source.focus, 'the record still reads a RECORD and never the default the defect left behind').toBe('record')
    expect(one.view.read().focus, 'and its value is the empty pair, not the caller\'s mirror').toEqual({ entries: [], activeId: null })
    expect(readFileSync(at(one.dir)).equals(stood), 'the profile is byte-identical: a refusal lands no byte').toBe(true)
    expect(one.surface.journal({}), 'and mints no cursor and adds no journal entry (D-12)').toEqual({ status: 'read', from: 0, through: 0, floor: 0, entries: [], count: 0 })

    // THE RESTART HEALS NOTHING BECAUSE NOTHING WAS BROKEN — the arm the defect made permanent.
    const next = one.restart()
    expect(next.view.read().source.focus, 'and a restart has nothing to heal, because no `file` version was ever created').toBe('record')
    expect(next.store.read(['focus'], 'mem'), 'the family is re-minted at its placeholder, as it is at every boot').toEqual({ entries: [] })
  })

  it('D-3 · defect A’s silent default: the two calls the defect was MADE of — a `write` and a `delete` that name no tier — are refused the same way', () => {
    const one = stand()
    // THE TWO CALLS, VERBATIM FROM THE DEFECT: `data.write({ path: ['focus'], value })` and `data.delete(['focus'])`.
    // Both are driven by an agent that never heard of a tier, which is exactly the caller the module constant was
    // invisible to. A default that quietly resolved to `file` is how the defect happened, so the guard runs on the
    // RESOLVED tier and refuses both — `delete`'s second half included, where the defect answered `removed:false`
    // over a row that stood.
    for (const [label, answer] of [
      ['write', one.surface.write({ path: ['focus'], value: { entries: [] } })],
      ['delete', one.surface.delete({ path: ['focus'] })],
    ] as const) {
      expect(answer.status, `${label} at ['focus'] with no tier is refused`).toBe('refused')
      expect(answer.status === 'refused' ? answer.reason : '', `${label}: and the reason is the declared root's`).toBe('declared-tier')
      expect(answer.status === 'refused' ? answer.message.endsWith(`this ${label} asks for 'file'`) : '', `${label}: the default is named in the sentence, so an omitted member is not silent`).toBe(true)
    }
    // AND THE SAME GUARD AT EVERY DECLARED ROOT, EACH AT BOTH WRONG TIERS: this is the set, driven rather than read.
    const wrong = { tabs: ['mem', 'temp'], panes: ['mem', 'temp'], theme: ['mem', 'temp'], focus: ['file', 'temp'], zones: ['file', 'temp'] } as const
    for (const [root, tiers] of Object.entries(wrong)) {
      for (const tier of tiers) {
        const answer = one.surface.write({ path: [root], tier, value: { a: 1 } })
        expect({ root, tier, status: answer.status, reason: answer.status === 'refused' ? answer.reason : null }, `['${root}'] at '${tier}' is refused`).toEqual({ root, tier, status: 'refused', reason: 'declared-tier' })
      }
    }
    // AND THE GUARD IS BELOW THE ROOT TOO: a family is ONE value at its root, so every address under it is that
    // root's tier — a descendant write at another tier is the same lie one segment down.
    expect(one.surface.write({ path: ['panes', 'pane-a', 'size'], value: 1, tier: 'mem' }).status, 'a descendant of a declared root is guarded by its ROOT').toBe('refused')
    // THE POSITIVE CONTROL: an address that no crossing declares is untouched by the guard at all three tiers.
    for (const tier of ['file', 'mem', 'temp'] as const) {
      expect(one.surface.write({ path: ['alpha'], value: tier, tier }).status, `an undeclared root still writes at '${tier}', so the refusals above are not a blanket`).toBe('committed')
    }
  })

  it('D-4 · defect A, second arm: the SAME write at `mem` commits, the family’s own read() sees it, and a restart takes it away — a `mem` write is this process’s and persists nowhere', () => {
    const one = stand()
    const stood = readFileSync(at(one.dir))
    const mirror = { entries: [{ id: 'x', target: 't' }], activeId: 'x' }

    const landed = one.surface.write({ path: ['focus'], tier: 'mem', value: mirror })
    // **AND THE ANSWER NAMES THE PASS THAT JUDGED IT** (`D-103`): one pair was asked at `['focus']` and it PASSED, so the
    // log is two entries with no `repair-run` among them and `repaired:false` — which is the arm `D-9` does not reach.
    expect(landed, 'a write at the family\'s own tier is admitted, and the answer names the pass that admitted it').toEqual({
      status: 'committed', path: ['focus'], cursor: 1, repaired: false,
      log: [
        { kind: 'constraint-check', id: 'focus-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null },
      ],
    })
    // THE FAMILY'S OWN READ IS THE OBSERVABLE, and it is the one the defect broke: `viewRecord.read()` serves what
    // the surface wrote because the two now address the same tier.
    expect(one.view.read().focus, 'the record reads the caller\'s mirror, member for member').toEqual(mirror)
    expect(one.view.read().source.focus, 'and still reports the family as a RECORD').toBe('record')
    // **THE ARM IS `branch` AND NOT `row`, WHICH IS A MEASUREMENT AND NOT A PREFERENCE** (D-11's `ASM-L2-2`): a `row`
    // is a LITERAL at an exact address and the mirror is a container, so `readLiteral` answers `ReadTargetIsBranch`
    // and the surface serves the assembled branch — exactly what `['tabs']` answers for the same reason.
    expect(one.surface.read({ path: ['focus'], tier: 'mem' }), 'the surface reads it back at its own tier, as the container the mirror is').toEqual({ status: 'read', kind: 'branch', path: ['focus'], value: mirror })
    expect(one.surface.read({ path: ['focus'] }), 'and an unqualified read serves it too — the store\'s own lowest-persistence-present, which is `mem` where only `mem` stands').toEqual({ status: 'read', kind: 'branch', path: ['focus'], value: mirror })
    // **AND NO BYTE OF IT IS IN THE PROFILE**: a `mem` write is the instance's register, which `D-84` measured and
    // this row re-measures at this address — the family whose boot data can never come from a file.
    expect(readFileSync(at(one.dir)).equals(stood), 'the profile is byte-identical across a `mem` write').toBe(true)
    expect(readFileSync(at(one.dir), 'utf8').includes('"activeId"'), 'and carries no member of the mirror').toBe(false)

    // THE RESTART: a second construction over the same bytes. The `mem` register is the INSTANCE's, so the caller's
    // mirror is GONE and the family's pair re-mints the placeholder at the registration instant (`D-84`, `D-87`).
    const next = one.restart()
    expect(next.store.read(['focus'], 'mem'), 'the next process\'s family register is the placeholder again, not the caller\'s mirror').toEqual({ entries: [] })
    expect(next.view.read().focus, 'so the record answers the empty pair').toEqual({ entries: [], activeId: null })
    expect(next.view.read().source.focus, 'and reads its family as a RECORD, because a repair is its lawful source').toBe('record')
    expect(next.surface.read({ path: ['focus'] }), 'and the surface answers the placeholder, never the value it committed before the restart').toEqual({ status: 'read', kind: 'branch', path: ['focus'], value: { entries: [] } })
    expect(readFileSync(at(one.dir)).equals(stood), 'with the profile byte-identical across BOTH constructions').toBe(true)
  })

  it('D-5 · defect B: [\'panes\'] at a mismatched tier is refused — and the write at its OWN tier still lands, still erases the geometry, and is what the root guard does NOT protect', () => {
    const one = stand()
    const geometry = one.view.read().panes
    expect(geometry, 'the pane family stands with the measured default before any attempt').toEqual([{ id: 'pane-a', size: 100, bounds: { min: 0, max: 200 } }])

    for (const tier of ['mem', 'temp'] as const) {
      const refused = one.surface.write({ path: ['panes'], tier, value: { junk: true } })
      expect({ tier, status: refused.status, reason: refused.status === 'refused' ? refused.reason : null }, `['panes'] at '${tier}' is refused: this family's tier is file, and the sentence names it`).toEqual({ tier, status: 'refused', reason: 'declared-tier' })
    }
    expect(one.view.read().panes, 'and the geometry is untouched by both refusals').toEqual(geometry)

    // **THE RESIDUAL HALF, MEASURED AND NAMED — ITS OWN DEATH IS THE DAY THIS BECOMES A REFUSAL.** The guard is the
    // TIER's; the VALUE is `panes-must-stand`'s, and that pair refuses a value that is not a plain record and
    // nothing more (`D-87`, clause 1: an EXISTENCE pair). So a plain record of junk at the family's own tier lands,
    // the geometry is gone and the family still reports `record`, because the record's source member answers
    // whether a value STANDS and never whether it is the one the app wrote. Narrowing the pair to a shape is a new
    // constraint — a design act, and no layer judges its own design (`D-78`, `D-82`).
    const landed = one.surface.write({ path: ['panes'], tier: 'file', value: { junk: true } })
    expect(landed.status, 'the write at the family\'s own tier is admitted: the root guard protects the TIER and not the value').toBe('committed')
    expect(one.view.read().panes, 'and the geometry is erased — the defect\'s own symptom, still reachable at the one tier the guard admits').toEqual([])
    expect(one.view.read().source.panes, 'while the source still says the family is a record: a value STANDS, and it is not the app\'s').toBe('record')
    expect(readFileSync(at(one.dir), 'utf8').includes('"junk":true'), 'and the junk is DURABLE — it is in the profile\'s bytes').toBe(true)
    // THE CONTROL THAT KEEPS THIS ROW FROM BEING A SURRENDER: the same junk at either other tier is refused, and
    // the geometry still stands where no wrong-tier write has touched it.
    const other = stand()
    expect(other.surface.write({ path: ['panes'], tier: 'mem', value: { junk: true } }).status, 'a second profile: `mem` is still refused').toBe('refused')
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

  it('D-7 · an ordinary path lands at all three tiers, each reads back at its own, and only the `file` one survives a restart', () => {
    const one = stand()
    // THE THREE WRITES, EACH AT ITS OWN TIER AND EACH READ BACK AT THAT TIER — the same address `['alpha']`, three
    // versions in three tiers, which is what a tier being the caller's means at a path no crossing owns.
    expect(one.surface.write({ path: ['alpha'], value: 'durable', tier: 'file' }), 'the `file` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 1, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    expect(one.surface.write({ path: ['alpha'], value: 'session', tier: 'mem' }), 'the `mem` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 2, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    expect(one.surface.write({ path: ['alpha'], value: 'transient', tier: 'temp' }), 'the `temp` write commits').toEqual({ status: 'committed', path: ['alpha'], cursor: 3, repaired: false, log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }] })
    // A WRITE AT A LOWER TIER DOES NOT DESTROY THE HIGHER ONE (`guide §5.1`: the more persistent version is SHADOWED,
    // not replaced) — so each tier is still readable at its own address, and this is the reading the surface's
    // `tier` member exists to make possible.
    expect(one.surface.read({ path: ['alpha'], tier: 'file' }), 'the `file` version stands at `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'durable' })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'the `mem` version stands at `mem`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'session' })
    expect(one.surface.read({ path: ['alpha'], tier: 'temp' }), 'the `temp` version stands at `temp`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'transient' })
    // **AN UNQUALIFIED READ ANSWERS THE LOWEST PERSISTENCE PRESENT, WHICH IS THE STORE'S OWN DECLARED RULE AND NOT THE
    // MOST DURABLE ONE** (`guide §5.2`'s `read` row: *"legal — the lowest persistence present"*, against the tier
    // order `file > mem > temp`). So it is the `temp` version that answers here, and that is what makes the
    // member's absence a READING and not a default: a caller that wants the durable row names it.
    expect(one.surface.read({ path: ['alpha'] }), 'an unqualified read answers the lowest persistence present').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'transient' })

    // THE RESTART, PER TIER, AND IT IS THE WHOLE POINT OF THE MEMBER: `file` is durable, `mem` and `temp` are not.
    const next = one.restart()
    expect(next.surface.read({ path: ['alpha'], tier: 'file' }), '`file` survives the restart').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'durable' })
    expect(next.surface.read({ path: ['alpha'], tier: 'mem' }), '`mem` does not: it was this process\'s register').toEqual({ status: 'absent', path: ['alpha'] })
    expect(next.surface.read({ path: ['alpha'], tier: 'temp' }), '`temp` does not either — it is the transient tier, shadowed by `mem` and never durable').toEqual({ status: 'absent', path: ['alpha'] })
    expect(next.surface.read({ path: ['alpha'] }), 'and the unqualified read is the durable one, alone').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'durable' })
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
    expect(next.surface.read({ path: ['alpha'], tier: 'file' }), 'and the `file` row is untouched by both').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'durable' })
  })

  it('D-9 · a value the family’s pair REFUSES is repaired inside the caller’s own commit, and the answer NAMES the repair — `V4`’s receipt member landed at `D-103`, so this row is its evidence no longer a case for it', () => {
    const one = stand()
    // THE ARM `D-5` DOES NOT REACH: there the pair PASSED a plain record of junk, so nothing repaired anything.
    // Here the value is not a plain record, so the pair REFUSES it and its repair writes the placeholder — inside the very
    // commit the caller named. **AND THE ANSWER NOW SAYS SO** (`D-103`): `repaired:true` beside a `log` whose second entry
    // is the `repair-run` naming `focus-must-stand` is `D-82`'s `V2` and `V4` paid at this surface, which is the member
    // `D-79` proposed and `D-102` blocked. **THE ROW IS RE-DERIVED AND ITS OLD CLAIM WAS TRUE OF ITS OWN DATE**: it
    // asserted that no member of the receipt named the repair, and that assertion INVERTED here rather than being deleted.
    const landed = one.surface.write({ path: ['focus'], tier: 'mem', value: 'not-a-record' })
    expect(landed, 'the caller is told a change LANDED, what stood is the family’s own value, and the pass that replaced it is named').toEqual({
      status: 'committed', path: ['focus'], cursor: 1, repaired: true,
      log: [
        { kind: 'constraint-check', id: 'focus-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'repair-run', id: 'focus-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'constraint-check', id: 'focus-must-stand', opId: expect.any(String), message: expect.any(String), state: null },
        { kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null },
      ],
    })
    expect(one.store.read(['focus'], 'mem'), 'what actually stands is the pair’s PLACEHOLDER, and the caller’s value is nowhere').toEqual({ entries: [] })
    expect(one.view.read().focus, 'the record answers the empty pair, never the value that was written').toEqual({ entries: [], activeId: null })
    expect(JSON.stringify(landed).includes('"repaired":true'), 'and the verdict SURVIVES JSON, which the store\'s own member does not — so the member a tool answer carries is the one that says it').toBe(true)
    // THE CONTROL: the same write with a value the pair ADMITS leaves the caller's own value standing, so the reading above
    // is the repair and not the tier.
    const admitted = one.surface.write({ path: ['focus'], tier: 'mem', value: { entries: [{ id: 'x', target: 't' }] } })
    expect(admitted.status, 'a value the family admits commits too').toBe('committed')
    expect(one.view.read().focus, 'and THAT one the record serves member for member').toEqual({ entries: [{ id: 'x', target: 't' }], activeId: null })
  })

  it('D-8 · a `mem` write is visible to THIS instance and to no other: a second store over the same bytes never serves it', () => {
    const one = stand()
    one.surface.write({ path: ['alpha'], value: 'this-process', tier: 'mem' })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'the writing instance serves its own register').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'this-process' })
    // A SECOND INSTANCE IN THE SAME PROCESS IS ALREADY A SECOND REGISTER — the `mem` tier is the INSTANCE's, not the
    // process's, and `D-79` measured two instances over one file discarding each other's writes. The row states it
    // at the surface: a surface stood over the second instance answers absence, and the first instance is unmoved.
    const second = createProfileStore({ filePath: at(one.dir) }) as unknown as ViewRecordStore
    const beside = createDataSurface({ profileDir: one.dir, store: second as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
    expect(beside.read({ path: ['alpha'], tier: 'mem' }), 'so "this process only" is stated more narrowly still: the INSTANCE is the unit').toEqual({ status: 'absent', path: ['alpha'] })
    expect(one.surface.read({ path: ['alpha'], tier: 'mem' }), 'and the writing instance still holds it').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'this-process' })
    expect(readFileSync(at(one.dir), 'utf8').includes('this-process'), 'with no byte of it in the profile at any point').toBe(false)
  })
})
