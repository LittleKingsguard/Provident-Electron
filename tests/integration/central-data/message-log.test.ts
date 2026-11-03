// tests/integration/central-data/message-log.test.ts — **THE ANSWER CARRIES THE PASS THAT PRODUCED IT** (`D-103`).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// WHAT THIS BATTERY EXISTS FOR, IN ONE SENTENCE: `provident-storeroom@1.9.2` hands a PASSING act the commit's own
// log, so the surface can now answer `repaired` and `log` instead of a bare `committed` — and the rows below prove
// the two arms are DISTINGUISHABLE, which is the whole point of the member, that a read carries neither, and that
// the member this surface answers is a PLAIN ENUMERABLE ARRAY while the store's own is not.
//
//   `D-79` measured the dishonesty this closes: `write({ path: ['tabs'], value: 42 })` answered `committed`, the
//   five declarations repaired the record inside that same commit, and the answer named nothing — so a caller
//   could not tell a value that landed from a value a repair replaced. `D-82`'s `V2` and `V4` both name that as
//   the smallest change that closes the `data.*` clause-1 deviation, and `D-102` BLOCKED it on the package.
//
// **THE DISCRIMINATOR IS AN ENTRY, NEVER AN EMPTY LIST** — the correction `D-102`'s own text gets wrong and this
// pass supersedes by pointer (`D-46`). Measured on the installed `1.9.2`: a repaired write answers entries whose
// kinds include `repair-run`, a CLEAN write over the same store answers entries with NO `repair-run` among them,
// and a write over a store carrying no pair at all answers ONE entry (`commit`). `[]` is not an answer any of
// those three arms gives, which is why `repaired` is derived from the presence of the entry and not from a length.
//
// **THE RESTART IS NOT DRIVEN HERE**: nothing in these rows reads a second process, and `D-101`'s own battery
// already carries the tier's boundary. Every row stands its own fresh profile and removes it.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import { createDataSurface, type DataDeleteAnswer, type DataSurface, type DataWriteAnswer } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { tabsConstraintDeclarations, tabsDeclaredRoots } from '../../../src/main/tabs-record'
import { viewConstraintDeclarations, viewDeclaredRoots, type ViewRecordStore } from '../../../src/main/view-record'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

/** **THE TWO CROSSINGS' BATCH, MAPPED THE WAY `src/main/main.ts` MAPS IT** — both modules' declarations in one
 *  construction, exactly as `D-101`'s battery stands it, because a surface over a store carrying half the batch
 *  would be measuring a store the app does not have (`D-65`, `D-87`, `D-91`, `D-97`). */
function boot(dir: string): ViewRecordStore {
  const holder: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: join(dir, PROFILE_FILE),
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
}

const standing: string[] = []

function stand(): Standing {
  const dir = mkdtempSync(join(tmpdir(), 'message-log-'))
  standing.push(dir)
  const store = boot(dir)
  return {
    dir,
    store,
    surface: createDataSurface({ profileDir: dir, store: store as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }),
  }
}

afterEach(() => {
  for (const dir of standing.splice(0)) rmSync(dir, { recursive: true, force: true })
})

/** **A TWO-ACTIVE TAB RECORD** — the value `exactly-one-active` refuses, which is the value `D-79` measured the
 *  dishonest `committed` on. Written at `['tabs']`, at the family's own tier, because the surface's declared-root
 *  guard refuses any other (`D-101`). */
const twoActive = {
  order: ['pane-a', 'pane-b'],
  'pane-a': { id: 'pane-a', target: 'content-a', active: true, label: 'A' },
  'pane-b': { id: 'pane-b', target: 'content-b', active: true, label: 'B' },
}

/** The committed arm of a write, narrowed — every row below drives a call the store accepts, so a refusal here is
 *  a failure the row is right to throw on rather than to fold into a comparison. */
function landedWrite(answer: DataWriteAnswer): { readonly repaired: boolean; readonly log: readonly { readonly kind: string; readonly id: string | null }[] } {
  if (answer.status !== 'committed') throw new Error(`the write was refused: ${JSON.stringify(answer)}`)
  return answer
}

function landedDelete(answer: DataDeleteAnswer): {
  readonly removed: boolean
  readonly repaired: boolean
  readonly log: readonly { readonly kind: string; readonly id: string | null }[]
} {
  if (answer.status !== 'committed') throw new Error(`the delete was refused: ${JSON.stringify(answer)}`)
  return answer
}

const kinds = (log: readonly { readonly kind: string }[]): string[] => log.map((entry) => entry.kind)
const repairIds = (log: readonly { readonly kind: string; readonly id: string | null }[]): (string | null)[] =>
  log.filter((entry) => entry.kind === 'repair-run').map((entry) => entry.id)

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

describe('a passing act answers the commit’s log, and the two arms are distinguishable (D-103)', () => {
  it('L-1 · a `data.write` at `[\'tabs\']` that TRIGGERS repairs answers `repaired:true`, and its `log` NAMES THE PAIR — the member and the derivation, both load-bearing', () => {
    const one = stand()
    const answer = landedWrite(one.surface.write({ path: ['tabs'], value: twoActive }))

    // THE VERDICT. The pair rewrote the value inside the caller's own commit, so the answer must say so: this is the
    // exact call `D-79` measured answering a bare `committed`. DROP `repaired` AND THIS LINE REDS.
    expect(answer.repaired, 'the write was repaired, and the answer says so (`D-79`\'s dishonest `committed` dies here)').toBe(true)

    // THE EVIDENCE, WHICH IS WHERE THE `repaired` DERIVATION COMES FROM: an entry of `kind === 'repair-run'`, carrying
    // its pair's own id. DROP the derivation and `repaired` above cannot be produced at all.
    expect(kinds(answer.log), 'the log names the pass: three checks refused nothing, ONE repair ran, the pass re-ran and the commit stood').toEqual([
      'constraint-check', 'constraint-check', 'constraint-check', 'repair-run',
      'constraint-check', 'constraint-check', 'constraint-check', 'constraint-check', 'constraint-check', 'constraint-check',
      'commit',
    ])
    expect(repairIds(answer.log), 'and the `repair-run` entry names the pair by its OWN id, not by a word this surface minted').toEqual(['exactly-one-active'])

    // THE REPAIR REALLY LANDED WHAT THE LOG SAYS IT DID, so the member is evidence and not decoration: the second tab
    // the caller sent ACTIVE stands inactive, and the stamp the caller never sent stands on both rows.
    const record = one.surface.read({ path: ['tabs'] })
    if (record.status !== 'read') throw new Error(`the record was not readable: ${JSON.stringify(record)}`)
    const value = record.value as Record<string, { active?: boolean; lastActiveAt?: string }>
    expect(value['pane-b']?.active, 'the pair the log names deactivated the second active tab — the value that STANDS is not the value the caller sent').toBe(false)
    expect(typeof value['pane-a']?.lastActiveAt, 'and a member the caller never supplied stands, written by the same repair').toBe('string')

    // THE ENTRY SHAPE IS THE PACKAGE'S OWN, FIVE MEMBERS AND NO SIXTH (`the declaration`'s `LogEntry`, its set closed).
    for (const entry of answer.log) {
      expect(Object.keys(entry), 'each entry carries exactly the declaration\'s five members').toEqual(['kind', 'id', 'opId', 'message', 'state'])
    }
  })

  it('L-2 · a CLEAN write answers a log with entries and NO `repair-run`, and `repaired:false` — so the two arms are distinguishable, which is the whole point', () => {
    const one = stand()
    // The pair must be STANDING for this to be the clean arm over a store that carries one: write the repaired record
    // first, then write back exactly what stands. The second write's value is the first write's result, so the pass
    // runs, all six pairs are asked, and every one of them PASSES.
    const repairedArm = landedWrite(one.surface.write({ path: ['tabs'], value: twoActive }))
    const stood = one.surface.read({ path: ['tabs'] })
    if (stood.status !== 'read') throw new Error(`the record was not readable: ${JSON.stringify(stood)}`)
    const clean = landedWrite(one.surface.write({ path: ['tabs'], value: stood.value }))

    expect(clean.repaired, 'nothing was repaired on this arm').toBe(false)
    // **`[]` IS NOT THIS ARM'S ANSWER** — the correction `D-102` gets wrong (`D-46`): the clean write over a store whose
    // six pairs all pass answers SEVEN entries, and the discriminator is the ABSENCE of a `repair-run` among them.
    expect(clean.log.length, 'a clean write answers entries and never an empty list').toBeGreaterThan(1)
    expect(kinds(clean.log).filter((kind) => kind === 'repair-run'), 'and no entry of that kind stands among them').toEqual([])
    expect(kinds(clean.log).slice(-1), 'the list ends at the commit, as the repaired arm\'s does').toEqual(['commit'])
    expect(clean.log.map((entry) => entry.id).filter((id) => id !== null), 'the ids name the six pairs that were ASKED and passed').toEqual([
      'tabs-must-stand', 'order-names-its-tabs', 'exactly-one-active', 'tab-has-title', 'tab-has-content', 'tab-has-lastActiveAt',
    ])

    // **THE DISTINCTION IS THE ROW.** One address, one store, one pair list, two values — and the two answers differ in
    // exactly the members this pass added. Without them both arms answer `committed` and nothing else, which is the
    // state `D-79` recorded and `D-102` could not repair.
    expect(
      { repaired: repairedArm.repaired, runs: repairIds(repairedArm.log).length, entries: repairedArm.log.length },
      'the repaired arm',
    ).toEqual({ repaired: true, runs: 1, entries: 11 })
    expect(
      { repaired: clean.repaired, runs: repairIds(clean.log).length, entries: clean.log.length },
      'the clean arm: the SAME pair list, none of it repairing, and a shorter list because the pass ran once',
    ).toEqual({ repaired: false, runs: 0, entries: 7 })
  })

  it('L-3 · a `delete` that RAN A PASS answers its log, and one that never reached the store says so with an empty one — both arms measured', () => {
    const one = stand()
    // **A LITERAL ADDRESS CARRYING ONE PAIR** is what a delete needs to reach the store at all: the surface probes the
    // address first and answers the empty receipt where the probe finds a BRANCH (it asks for a literal, and every one
    // of the app's five declared roots holds a whole value). So this row states its own fixture — one pair at an
    // ordinary literal address — and says plainly that it is the row's and not the app's.
    const store = one.store as unknown as {
      addConstraint: (declaration: unknown, body: unknown) => void
      write: (...positions: unknown[]) => { op: unknown }
    }
    store.addConstraint({ address: ['ledger'], id: 'ledger-must-stand' }, (context: unknown) => {
      const ctx = context as { attempt: unknown; value: unknown }
      // The registration instant asks the body against the standing state and hands it no commit (`D-84`): pass there.
      if (ctx.attempt === null) return true
      if (ctx.value !== undefined && ctx.value !== null) return true
      return {
        message: 'the ledger must stand',
        repair: (record: unknown) => ({ ok: true, op: store.write(['ledger'], 'file', { minted: true }, record).op }),
      }
    })
    const wrote = landedWrite(one.surface.write({ path: ['ledger'], value: 'kept' }))
    expect(wrote.repaired, 'the write that seated the literal passed its pair').toBe(false)

    const removed = landedDelete(one.surface.delete({ path: ['ledger'], tier: 'file' }))
    expect(removed.removed, 'the row the delete removed DID stand, so the store\'s own delete ran and not the empty receipt').toBe(true)
    expect(removed.repaired, 'and the pair refused the state the delete left and repaired it inside the same commit').toBe(true)
    expect(kinds(removed.log), 'the delete\'s pass is the four-entry shape: check, repair, re-check, commit').toEqual([
      'constraint-check', 'repair-run', 'constraint-check', 'commit',
    ])
    expect(repairIds(removed.log), 'and the repair entry names the pair').toEqual(['ledger-must-stand'])
    expect(one.surface.read({ path: ['ledger'] }), 'the record the repair wrote STANDS where the delete left nothing — which is what `removed:true` beside `repaired:true` tells a caller').toEqual({
      status: 'read', kind: 'branch', path: ['ledger'], value: { minted: true },
    })

    // **THE OTHER ARM, AND IT IS THE ONE THE APP'S OWN DECLARED ROOTS REACH**: a delete at a whole-value root is
    // answered from the surface's own probe and NEVER reaches the store — measured, the answer is the empty receipt
    // with `log: []` and `repaired:false`, because zero acts appended zero entries. This is not the clean arm's
    // shape wearing a different name: no pass was run at all, and the members say which case it is.
    const untouched = landedDelete(one.surface.delete({ path: ['tabs'], tier: 'file' }))
    expect({ removed: untouched.removed, repaired: untouched.repaired, log: untouched.log.length }, 'a delete that reached no store says exactly that').toEqual({ removed: false, repaired: false, log: 0 })
    expect(one.surface.read({ path: ['tabs'] }).status, 'and the record it could not delete still stands').toBe('read')
  })

  it('L-4 · `read`, `list` and `journal` carry NO `log` and NO `repaired` — a read consults no constraint, so there is no pass to report', () => {
    const one = stand()
    landedWrite(one.surface.write({ path: ['tabs'], value: twoActive }))
    // **THE READING OF *"always"* THIS SURFACE TAKES**: *"every act that ran a constraint pass"*. A read consults no
    // constraint (the package's shipped reading, *"★ AND READS CHECK NO CONSTRAINT"*), and `list` and `journal` read
    // the register and this module's own window — so the two verbs that answer a pass are `write` and `delete`, and
    // these three answer neither member. A row asserting the presence of a `log` on a read would be asserting a pass
    // that never ran.
    for (const [label, answer] of [
      ['read', one.surface.read({ path: ['tabs'] })],
      ['list', one.surface.list({})],
      ['journal', one.surface.journal({})],
    ] as const) {
      expect(Object.hasOwn(answer, 'log'), `${label} carries no \`log\` member`).toBe(false)
      expect(Object.hasOwn(answer, 'repaired'), `${label} carries no \`repaired\` member`).toBe(false)
      expect(Object.keys(answer).includes('log'), `${label}: and the absence is a real one, read off the answer's own key set`).toBe(false)
    }
    // THE CONTROL: the same store DOES answer both members on the mutating verb, so the absences above are not a
    // property of this fixture being silent.
    const again = landedWrite(one.surface.write({ path: ['alpha'], value: 'x' }))
    expect([Object.hasOwn(again, 'log'), Object.hasOwn(again, 'repaired')], 'the write on the same store carries both').toEqual([true, true])
  })

  it('L-5 · the answer\'s `log` is a PLAIN ENUMERABLE ARRAY — it survives `JSON.stringify` where the store\'s own member does not', () => {
    const one = stand()
    const answer = landedWrite(one.surface.write({ path: ['tabs'], value: twoActive }))

    // THE SURFACE'S MEMBER IS DATA: enumerable, an array, and every entry a plain object of the five members.
    expect(Array.isArray(answer.log), 'the answer carries an ARRAY').toBe(true)
    expect(Object.keys(answer).includes('log'), 'and it is an ENUMERABLE own member, so it travels with the answer').toBe(true)
    const descriptor = Object.getOwnPropertyDescriptor(answer, 'log')
    expect(descriptor?.enumerable, 'the descriptor says so, rather than the shape merely happening to serialise').toBe(true)
    // IT SURVIVES THE SERIALISATION A TOOL ANSWER GOES THROUGH. **THIS IS THE ROW THAT REDS IF THE ANSWER IS BUILT BY
    // SPREADING THE STORE'S RECORD** — `{...record}` drops the non-enumerable member silently, so an answer that passed
    // it on by reference would answer `committed` with the log MISSING and no error anywhere; measured as `D-103`'s
    // fourth revert, which reds this row and three others.
    const travelled = JSON.parse(JSON.stringify(answer)) as { log?: { kind?: unknown }[]; repaired?: unknown }
    expect(travelled.log?.length, 'the log crosses `JSON.stringify` intact — the member a tool answer actually carries').toBe(answer.log.length)
    expect(kinds((travelled.log ?? []) as { kind: string }[]).includes('repair-run'), 'with its `repair-run` entry still naming the pass').toBe(true)
    expect(travelled.repaired, 'and `repaired` crosses with it').toBe(true)

    // **THE CONTROL, TAKEN ON THE STORE'S OWN BYTES**: the member the package hands over is NON-ENUMERABLE, so a spread,
    // `Object.assign` and `JSON.stringify` each DROP it. Without this arm the row above could pass on a member that was
    // never in danger.
    const raw = (one.store as unknown as { write: (...positions: unknown[]) => unknown }).write(['raw-probe'], 'file', 1)
    const rawDescriptor = Object.getOwnPropertyDescriptor(raw as object, 'log')
    expect(rawDescriptor?.enumerable, 'the store\'s own `log` is NON-enumerable — measured on the installed 1.9.2').toBe(false)
    expect('log' in ({ ...(raw as object) } as object), 'so a spread drops it').toBe(false)
    expect(JSON.stringify({ ...(raw as object) }).includes('"log"'), 'and the serialised spread carries no log member at all').toBe(false)
  })

  it('L-6 · the narrowing is the SEAM\'s alone: `src/main/data/` reads no `.log` member, so no repair\'s joined write can be read through this module', () => {
    // **THE ONE DECLARED READER IS `src/main/storeroom.ts`**, and this row is what keeps it one: the module drives the
    // two verbs that answer a log and asks the seam for it, so a second `.log` read introduced under `src/main/data/`
    // — including one taken off a repair's own joined write, which carries NO member at all — reds here.
    const module = commentElided(sourceOf('src/main/data/surface.ts'))
    expect(module.includes('.log'), 'the surface\'s CODE reads no `.log` member; it calls the seam\'s accessor').toBe(false)
    expect(module.includes('commitLog'), 'and it does call it, so the absence above is not a module that never asks').toBe(true)
    // THE CONTROL: the same elision keeps the seam's read, so the assertion above is about the module and not about the
    // instrument being blind to the member.
    const seam = commentElided(sourceOf('src/main/storeroom.ts'))
    expect(seam.includes('.log'), 'the seam\'s own code DOES read it — which is what makes it the one declared reader').toBe(true)
    // AND THE OTHER FILES OF THE MODULE ARE COVERED BY THE SAME RULE, so a `.log` read cannot move one file sideways into
    // `store.ts`, `mapper.ts`, `args.ts` or `journal.ts` and stay green.
    for (const file of ['store.ts', 'mapper.ts', 'args.ts', 'journal.ts', 'types.ts']) {
      expect(commentElided(sourceOf(`src/main/data/${file}`)).includes('.log'), `src/main/data/${file} reads no \`.log\` member either`).toBe(false)
    }
  })
})
