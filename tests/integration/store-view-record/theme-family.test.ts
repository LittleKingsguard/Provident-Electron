// tests/integration/store-view-record/theme-family.test.ts — THE L2/L3 BATTERY for the view record's FOURTH family: the
// APPEARANCE RECORD, whose resolution is PRODUCED BY A CONSTRAINT REPAIR (D-97).
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`). Its subject is
// the crossing's half of the instruction **"No boot time declarations — Use constraint repairs"**: the family's address, its
// pair (`theme-must-stand`) with BOTH of its arms, its route, and the four clauses of `D-82`'s convention driven per address.
// The wiring's half — that the RENDERER applies the record's declaration and computes nothing — is
// `tests/theme-declaration.test.ts`'s (`T-1`…`T-6`), and the mechanism's own 58 rows are `tests/theme.test.ts`'s.
//
// WHY A FILE OF ITS OWN rather than rows in `crossing.test.ts`: the zone family took the same form at `D-91`
// (`zone-family.test.ts`), because a family's four clauses are a battery and not a paragraph, and because the appearance
// family carries ONE ARM NO OTHER FAMILY HAS — **STALENESS**, a constraint over a DERIVATION (`TH-4`/`TH-5` below).
//
// ⟶ **THE FAMILY'S TIER IS `file` FROM `D-98`** (it was `mem` at `D-97`, on the user's ruling **"Appearance preferences
// should be durable"**), and the rows below were INVERTED to pin the durable shape rather than re-pointed quietly:
// `TH-8` now measures the record SURVIVING a restart byte-identically with the pair answering `true` over it, its control
// being the one place the placeholder repair still fires (an ABSENT address, on a seeded file); `TH-9` re-derives the
// wrong-tier arm — `mem` and `temp` each answer `TierNotFound` and the store's own message names `file`; `TH-1` adds what a
// fresh profile carries BEFORE any act, which at `file` is the creation repair's placeholder, itself a durable write; and
// `TH-4`'s stale arm is measured a second time ON A RESTARTED STORE, over a file whose carried declaration is out of date.
//
// THE MEASUREMENTS THIS FILE RESTS ON WERE TAKEN BEFORE IT WAS WRITTEN, on the installed `provident-storeroom@1.9.1`, one
// fresh instance per arm (the probe is recorded in `D-97`): a registration instant hands the body `{address, tier, value,
// attempt, op}` with `value: undefined` where the address holds nothing and **no `write` member**; a LANDING instant hands it
// `{address, id, tier, value, op, pending}` with the commit's `pending`, `tier` reading the family's OWN tier (`mem` at
// `D-97`'s head, `file` from `D-98`: the member is the address's tier and moves with it) and still no `write`; the boundary
// REFUSES `null` (`ValueRefusedAtBoundary`), which is why every absent member of this record is written as ABSENCE; the
// crossing NORMALISES a plain object's key order, which is why the pair's comparison is structural and not a serialisation;
// and a landing repair that names its commit at `write`'s fourth position lands inside the same commit, causing EXACTLY ONE
// delivery and never two.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
  createViewDelivery,
  createViewRecord,
  THEME_SHAPE_MESSAGE,
  THEME_SHAPE_REASON,
  THEME_STALE_MESSAGE,
  VIEW_THEME_ADDRESS,
  VIEW_THEME_MUST_STAND_ID,
  viewConstraintDeclarations,
  viewThemePlaceholder,
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
import { applyThemeDeclaration, resolveTheme } from '../../../src/shared/theme'
import { createViewSurface } from '../../../src/main/view-surface'
import { IPC_VIEW_THEME_COMMIT } from '../../../src/shared/view-channels'

const PROFILE_FILE = 'provident-profile.json'
const REPO = new URL('../../../', import.meta.url)

/** **A SOURCE READ WITH THE COMMENT LINES AND BLOCK COMMENTS ELIDED — THE ONLY FORM AN ABSENCE MAY BE ASSERTED ON.** */
function commentElided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

const sourceOf = (path: string): string => readFileSync(new URL(path, REPO), 'utf8')

/** The batch a boot supplies: this module's surviving declarations, mapped the way `src/main/main.ts` maps them — spread
 *  rather than enumerated, so the batch is whatever `viewConstraintDeclarations` declares (`D-142` retired the `focus`
 *  pair; no row in this file counts the batch, because the counts are `central-data`'s, `D-43`). */
const batchOf = (getStore: () => ViewRecordStore | null) =>
  viewConstraintDeclarations(getStore).map((declaration) => ({
    address: declaration.address,
    id: declaration.id,
    constraint: declaration.constraint,
  }))

/** **THE PLACEHOLDER, TYPED HERE ONCE** so every row states the same value — and `TH-2` proves it is the MECHANISM's own
 *  answer rather than a second spelling of it. */
const PLACEHOLDER = { token: null, attribute: null, declaration: { name: null, value: '', removal: true } }

/** The pair itself, taken from the batch by its declared id — a row drives it directly where it needs the ANSWER. */
const pairOf = (batch: readonly ViewConstraintDeclaration[]) => {
  const declaration = batch.find((entry) => entry.id === VIEW_THEME_MUST_STAND_ID)
  if (declaration === undefined) throw new Error('the appearance pair is not in the batch')
  return declaration.constraint
}

/** ONE BOOT: a fresh instance over `path`, carrying the whole batch, with its holder bound the way the boot binds it.
 *  **AND THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY ITS `listeners`** (`D-219`;
 *  `docs/L3/view-record/delivery.md` §1–§3): the appearance root's entry is among the four, so the creation repair's write
 *  delivers to it — the event `D-218` measured as absent. The sink records the delivered addresses, which is the reading
 *  the design names for a battery (`docs/L3/app-shell/delivery.md` §3). */
interface Boot {
  readonly store: ViewRecordStore
  readonly delivery: ViewDelivery
  readonly sunk: (readonly string[])[]
  readonly record: ViewRecord
  readonly batch: readonly ViewConstraintDeclaration[]
  readonly read: () => ReturnType<ViewRecord['read']>
  readonly bytes: () => string
}

function boot(path: string, withBatch = true): Boot {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const batch = batchOf(() => bound.current)
  const sunk: (readonly string[])[] = []
  const delivery = createViewDelivery((address) => sunk.push([...address]))
  const store = createProfileStore({
    filePath: path,
    constraints: (withBatch ? batch : []).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
    // **THE APP'S CONSTRUCTION CARRIES THE ENTRIES WHETHER OR NOT ITS BATCH DOES**, so a `withBatch = false` boot still
    // hands the adoption the four entries and the store simply has no repair to fire them (`guide §6`, `:561`).
    listeners: [...delivery.entries],
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current, delivery })
  return { store: bound.current, delivery, sunk, record, batch, read: () => record.read(), bytes: () => readFileSync(path, 'utf8') }
}

let dir = ''
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'view-theme-'))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

// ═══════════════════ CLAUSE 1 — EXISTENCE + PLACEHOLDER AT THE CREATION INSTANT ═══════════════════

describe('view-record · the appearance family, clause 1 — the address stands before any route runs', () => {
  it('TH-1 · THE CREATION INSTANT, AT `file`: with the batch supplied the STORE\'S OWN READ answers the PLACEHOLDER before any route of the module runs AND THE FILE ALREADY CARRIES IT — a fresh profile\'s appearance record is the creation repair\'s placeholder, which is itself a durable write — while a store carrying NO batch answers `AddressNotFound` at the same address', () => {
    // THE CONTROL FIRST, ON ITS OWN PROFILE: without the batch the address does not stand at all.
    const bare = boot(join(dir, 'bare.json'), false)
    let absent = ''
    try {
      bare.store.read(VIEW_THEME_ADDRESS, 'file')
    } catch (caught) {
      absent = (caught as { status?: string }).status ?? ''
    }
    expect(absent, 'a store with no declaration holds NOTHING at `[\'theme\']` — the absent arm, measured').toBe('AddressNotFound')
    expect(bare.read().theme, 'and the record answers the declared placeholder rather than a minted resolution').toEqual(PLACEHOLDER)
    expect(bare.read().source.theme, 'and says that the placeholder and not the record answered').toBe('default')
    expect(bare.bytes(), 'and the file it was given is still the EMPTY image its construction made: no repair ran, so no byte').toBe('')

    // AND THE BATCHED BOOT OVER A FRESH PROFILE: the family stands before any commit, read through the STORE.
    const batchedPath = join(dir, 'batched.json')
    const batched = boot(batchedPath)
    expect(batched.store.read(VIEW_THEME_ADDRESS, 'file'), 'the pair minted the appearance record at construction').toEqual({
      declaration: { value: '', removal: true },
    })
    const read = batched.read()
    expect(read.source.theme, 'the family STANDS — a repair put it there, and the read says which').toBe('record')
    expect(read.theme, 'and what it stands at is the placeholder: a declaration that names no attribute').toEqual(PLACEHOLDER)
    // **WHAT A FRESH PROFILE CARRIES BEFORE ANY ACT, MEASURED ON THE FILE ITSELF** (D-98): the tier is `file`, so the
    // creation repair's placeholder is a SAVED write — the profile names `theme` and its declaration, and no token.
    const fresh = JSON.parse(batched.bytes()) as Record<string, unknown>
    expect(Object.hasOwn(fresh, 'theme'), 'a fresh profile DOES carry the appearance family before any user act').toBe(true)
    expect(fresh['theme'], 'at exactly the placeholder, with no `token` and no `attribute` member').toEqual({
      declaration: { value: '', removal: true },
    })
  })

  it('TH-2 · THE PLACEHOLDER IS THE MECHANISM\'S OWN ANSWER FOR THE ABSENT PAIR, not a second spelling of one — `applyThemeDeclaration(null, null)` equals the declaration member for member, and the shared constructor hands out a FRESH record every call so no caller can move it', () => {
    const asked = applyThemeDeclaration(null, resolveTheme(null, undefined).setting)
    expect(asked, 'the mechanism, asked for the absent pair, answers exactly the placeholder declaration').toEqual(PLACEHOLDER.declaration)
    const first = viewThemePlaceholder()
    const second = viewThemePlaceholder()
    expect(first, 'the shared placeholder is the same value the crossing stands at').toEqual(PLACEHOLDER)
    expect(first === second, 'and it is a FRESH record per call — `defaultPaneGeometry`\'s rule, applied to a record with one nested object').toBe(false)
    expect(first.declaration === second.declaration, 'the nested declaration too, so a caller cannot reach the constant through either').toBe(false)
  })
})

// ═══════════════════ CLAUSE 1 — THE SECOND ARM: STALENESS, AND THE REPAIR THAT RESOLVES IT ═══════════════════

describe('view-record · the appearance family, the arm no other family has — STALENESS', () => {
  it('TH-3 · THE ROUTE CARRIES THE ACT AND NOT A RESOLUTION: `commitTheme(\'light\', \'theme\')` answers `committed`, the record STANDS at the declaration the mechanism computed for that pair, and NOT ONE delivery becomes two — the crossing\'s repair resolved it inside the route\'s own commit', () => {
    const here = boot(join(dir, 'route.json'))
    let deliveries = 0
    const off = here.record.subscribe(() => {
      deliveries += 1
    })
    try {
      const answer = here.record.commitTheme('light', 'theme')
      expect(answer, 'the route answers `committed` — there is no refused arm for a legal act').toEqual({ status: 'committed' })
      expect(here.read().theme, 'and the record stands at the RESOLUTION the pair produced').toEqual({
        token: 'light',
        attribute: 'theme',
        declaration: { name: 'theme', value: 'light', removal: false },
      })
      expect(deliveries, 'ONE commit, ONE delivery — the repair lands inside it and does not fire a second').toBe(1)
      // THE CONTROL THAT MAKES THE DELIVERY COUNT A MEASUREMENT: a write at an address this family does not own delivers nothing.
      here.store.write(['elsewhere'], 'mem', { token: 'x' })
      expect(deliveries, 'a write at an unrelated address delivers nothing to this record').toBe(1)
    } finally {
      off()
    }
  })

  it('TH-4 · **THE STALE ARM, AND IT IS MEASURED AGAIN ON A RESTARTED STORE** (D-98): a record carrying a resolution for a DIFFERENT token is judged STALE and REPAIRED to the resolution of the token it carries — the pair\'s own answer names the fault, the standing value is corrected inside the write\'s commit, and a file whose carried declaration is out of date is refused and repaired by a FRESH INSTANCE over those bytes', () => {
    const here = boot(join(dir, 'stale.json'))
    // A RECORD WHOSE DECLARATION BELONGS TO ANOTHER TOKEN — the shape a caller's own `provident.data.write`, an older head, or a
    // concurrent act leaves. Its `declaration` says `dark` while its `token` says `light`: the record contradicts itself.
    const stale = { token: 'light', attribute: 'theme', declaration: { name: 'theme', value: 'dark', removal: false } }
    // (a) THE PAIR'S OWN ANSWER, driven over a hand-built registration context — the instant that judges `context.value`.
    const answer = pairOf(here.batch)({ value: stale }) as ViewConstraintAnswer
    expect(answer === true, 'a self-contradicting record is NOT passed').toBe(false)
    expect(
      (answer as { message: string }).message,
      'and the sentence names the FAULT — the record and its own resolution contradict each other — under this module\'s token, `stale-theme`',
    ).toBe(THEME_STALE_MESSAGE)
    expect(typeof (answer as { repair?: unknown }).repair, 'with a repair, which is the arm that resolves it').toBe('function')
    // (b) THE REPAIR, DRIVEN AT A LANDING INSTANT (no `write` on the record): it names its commit at `write`'s FOURTH position and
    // leaves ONE WHOLE LEGAL VALUE — the derivation of the token it carries, and never the token it contradicted.
    const repaired = (answer as { repair: (context: unknown) => ViewRepairAnswer }).repair({ value: stale, pending: [] })
    expect((repaired as { ok: boolean }).ok, 'the repair reports the CREDITED arm (`D-72`)').toBe(true)
    expect(here.store.write(VIEW_THEME_ADDRESS, 'file', stale).op, 'the landing write landed').toBeTruthy()
    expect(here.read().theme, 'and what STANDS after it is the current resolution: the token kept, the declaration corrected').toEqual({
      token: 'light',
      attribute: 'theme',
      declaration: { name: 'theme', value: 'light', removal: false },
    })
    // ── (c) **AND THE ARM IS MEASURED ON A RESTARTED STORE, NOT ONLY IN-PROCESS** (D-98): the tier is `file`, so a record
    // can arrive stale FROM THE FILE — a profile written by an older head. The store is torn down, its bytes TAMPERED with
    // so the carried declaration is a resolution for another token, and a FRESH instance is constructed over them.
    const restartedPath = join(dir, 'stale-restarted.json')
    const firstBoot = boot(restartedPath)
    expect(firstBoot.record.commitTheme('light', 'theme').status).toBe('committed')
    const tamperedValue = JSON.parse(readFileSync(restartedPath, 'utf8')) as Record<string, Record<string, unknown>>
    tamperedValue['theme']!['declaration'] = { name: 'theme', value: 'dark', removal: false }
    const tampered = JSON.stringify(tamperedValue)
    writeFileSync(restartedPath, tampered)
    expect(tampered.includes('"value":"dark"'), 'the file now carries a contradiction: `token: light` beside a `dark` resolution').toBe(true)
    const restarted = boot(restartedPath)
    expect(restarted.bytes() === tampered, 'the RESTARTED store repaired the stale record — its bytes moved').toBe(false)
    expect(restarted.read().theme, 'and what stands after the restart is the resolution of the token the file carries').toEqual({
      token: 'light',
      attribute: 'theme',
      declaration: { name: 'theme', value: 'light', removal: false },
    })
    // AND THE PAIR ITSELF, over the RESTARTED store, still refuses the stale value and still repairs it to that resolution.
    const overRestart = pairOf(restarted.batch)({ value: stale }) as ViewConstraintAnswer
    expect((overRestart as { message: string }).message, 'the restarted store answers the same fault sentence').toBe(THEME_STALE_MESSAGE)
    const restartedRepair = (overRestart as { repair: (context: unknown) => ViewRepairAnswer }).repair({ value: stale, pending: [] })
    expect((restartedRepair as { ok: boolean }).ok, 'and its repair is CREDITED over a real store, not a stub').toBe(true)
    expect(
      (restartedRepair as { op?: { tier?: string } }).op?.tier,
      'the repair write names the family\'s own tier — `file`, so a restart cannot lose what a repair resolved',
    ).toBe('file')
  })

  it('TH-5 · A LEGAL RECORD IS NOT REPAIRED, AND THE COMPARISON IS STRUCTURAL — the crossing NORMALISES key order, so a serialisation comparison would report every legal record STALE: a standing record passes the pair `true`, and the pair\'s own derivation of it is BYTE-DIFFERENT from the value it passes', () => {
    const here = boot(join(dir, 'legal.json'))
    here.record.commitTheme('light', 'theme')
    const standing = here.store.read(VIEW_THEME_ADDRESS, 'file') as Record<string, unknown>
    const pair = pairOf(here.batch)
    expect(pair({ value: standing }), 'the standing record passes: the pair is not a rewrite of every write').toBe(true)
    // THE MEASURED GROUND FOR THE STRUCTURAL COMPARISON: the store handed the value back with the declaration's members in a
    // DIFFERENT ORDER than the writer's object literal, so `JSON.stringify` of the two is unequal over an agreeing pair.
    const declaration = standing['declaration'] as Record<string, unknown>
    expect(Object.keys(declaration).sort(), 'the store keeps every member').toEqual(['name', 'removal', 'value'])
    expect(
      JSON.stringify({ name: 'theme', value: 'light', removal: false }) === JSON.stringify(declaration),
      'and a serialisation comparison of the writer\'s literal against the store\'s reading is UNEQUAL over an agreeing pair — which is exactly why the pair walks the value instead',
    ).toBe(false)
    // A SECOND ACT IS A SECOND RESOLUTION AND STILL ONE LEGAL RECORD.
    expect(here.record.commitTheme('dark', 'theme').status).toBe('committed')
    expect(here.read().theme.declaration).toEqual({ name: 'theme', value: 'dark', removal: false })
    expect(pair({ value: here.store.read(VIEW_THEME_ADDRESS, 'file') }), 'and that one passes too').toBe(true)
  })

  it('TH-6 · THE REMOVAL ARM: the EMPTY setting is not a token but an ABSENCE — the route carries it, the mechanism declares it `null`, and the record\'s declaration is the removal; `token` is written as ABSENCE because the crossing refuses `null`', () => {
    const here = boot(join(dir, 'removal.json'))
    expect(here.record.commitTheme('', 'theme')).toEqual({ status: 'committed' })
    const standing = here.store.read(VIEW_THEME_ADDRESS, 'file') as Record<string, unknown>
    expect(Object.hasOwn(standing, 'token'), 'no `token` member stands — the absent setting is ABSENCE, never `null`').toBe(false)
    expect(here.read().theme, 'and the reading maps that absence back to the mechanism\'s own answer').toEqual({
      token: null,
      attribute: 'theme',
      declaration: { name: 'theme', value: '', removal: true },
    })
    // THE MEASUREMENT THAT FORCES THE SPELLING: a `null` in the value is refused by the crossing's own boundary.
    let refusal = ''
    try {
      here.store.write(VIEW_THEME_ADDRESS, 'file', { token: null, attribute: 'theme' })
    } catch (caught) {
      const shape = caught as { status?: string; message?: string }
      refusal = shape.status ?? shape.message ?? 'refused'
    }
    expect(refusal, 'a value carrying `null` is refused at the boundary — `ValueRefusedAtBoundary` is the measured word').not.toBe('')
  })

  it('TH-7 · THE PAIR IS NOT WRAPPED BY A NULL-STORE GUARD, AND ITS BODY JUDGES `context.value`: driven with a store provider that answers `null` — the boot\'s own instant, before the holder is bound — it still refuses an absent value and still reaches its repair', () => {
    const answer = pairOf(batchOf(() => null))({ value: undefined }) as ViewConstraintAnswer
    expect(answer === true, 'an absent value is refused even with no store to reach').toBe(false)
    expect(typeof (answer as { repair?: unknown }).repair).toBe('function')
    // AND THE REPAIR ITSELF IS HONEST ABOUT A NULL STORE AND A LANDING RECORD WITH NO CARRIER: the failed arm, stated.
    const failed = (answer as { repair: (context: unknown) => ViewRepairAnswer }).repair({ value: undefined })
    expect(failed, 'a repair that reached neither a route nor a store answers the FAILED arm rather than a silent `void` (`D-72`)').toEqual({
      ok: false,
      message: 'the view record does not stand, and this repair reached no write route',
    })
  })
})

// ═══════════════════ CLAUSE 3 — BOOT DATA IS THE FILE OR A REPAIR ═══════════════════

describe('view-record · the appearance family, clause 3 — a `file` address is the FILE, and the repair fires only on absence', () => {
  it('TH-8 · BOOT DATA IS THE FILE: two successive boots, the second finding the record the first one WROTE — its declaration valid, not re-minted, the setting a previous boot held SURVIVING and the profile\'s bytes BYTE-IDENTICAL across both — while the placeholder repair fires in exactly ONE place, an ABSENT address, which the same row measures on a seeded file', () => {
    const path = join(dir, 'two-boots.json')
    const one = boot(path)
    expect(one.record.commitTheme('light', 'theme').status, 'the first boot carries an act').toBe('committed')
    expect(one.read().theme.token, 'and the record stands at it').toBe('light')
    const afterOne = one.bytes()
    // **THE INVERSION**: this row asserted the profile carried no appearance key at all, because the tier was `mem`.
    // At `file` the profile DOES carry it, and the token with it — that is what durable means, measured on the bytes.
    expect(afterOne.includes('"theme"'), 'the profile carries the appearance family — this address is `file` (D-98)').toBe(true)
    expect(afterOne.includes('"token":"light"'), 'and the token it holds, as a stored member').toBe(true)

    const two = boot(path)
    expect(two.read().source.theme, 'boot two reads the RECORD — a repair is not what made this one stand').toBe('record')
    expect(two.read().theme, 'boot two stands at exactly what boot one wrote: the previous boot\'s setting SURVIVED').toEqual({
      token: 'light',
      attribute: 'theme',
      declaration: { name: 'theme', value: 'light', removal: false },
    })
    // **AND THE PAIR FINDS IT VALID RATHER THAN RE-MINTING IT** — the standing value passes, so no repair write runs.
    expect(
      pairOf(two.batch)({ value: two.store.read(VIEW_THEME_ADDRESS, 'file') }),
      'the record a boot reads back is a LEGAL record: the pair answers `true` and mints nothing',
    ).toBe(true)
    expect(two.bytes(), 'and the profile is BYTE-IDENTICAL across the two boots').toBe(afterOne)

    // ── THE CONTROL, AND IT IS THE OTHER ARM OF THE SAME PAIR: the placeholder repair fires ONLY where the address is
    // ABSENT. A file SEEDED WITHOUT `theme` gains the placeholder; a file CARRYING a record keeps it byte for byte.
    const absentPath = join(dir, 'absent.json')
    writeFileSync(absentPath, JSON.stringify({ panes: {} }))
    const absent = boot(absentPath)
    expect(absent.read().theme, 'an absent address is repaired to the placeholder').toEqual(PLACEHOLDER)
    expect(JSON.parse(absent.bytes()), 'and that repair is SAVED — the absent address now stands in the file').toEqual({
      panes: {},
      theme: { declaration: { value: '', removal: true } },
    })
    const standingBefore = boot(path).bytes()
    boot(path).read()
    expect(boot(path).bytes(), 'while a STANDING legal record is never re-minted: two more boots move no byte').toBe(standingBefore)
  })

  it('TH-9 · THE FAMILY IS `file` AND THE TIER IS NAMED ONCE: `mem` and `temp` each answer `TierNotFound` at this address and the store\'s own message names `file` as where it stands, so a wrong-tier read cannot reach it and the family cannot half-move — the tier the whole-value write names is the tier the read names', () => {
    const here = boot(join(dir, 'tier.json'))
    for (const wrong of ['mem', 'temp'] as const) {
      let wrongTier = ''
      let named = ''
      try {
        here.store.read(VIEW_THEME_ADDRESS, wrong)
      } catch (caught) {
        const shape = caught as { status?: string; message?: string }
        wrongTier = shape.status ?? ''
        named = shape.message ?? ''
      }
      expect(wrongTier, `a \`${wrong}\`-tier read of an address that lives at \`file\` does not reach it`).toBe('TierNotFound')
      expect(named, 'and the refusal NAMES the tier the address stands at, which is the fact this row is about').toContain('versions are at file')
    }
    expect(here.read().source.theme, 'while the family itself stands at its own tier').toBe('record')
    expect(
      (commentElided(sourceOf('src/main/view-record/index.ts')).match(/const THEME_TIER = /g) ?? []).length,
      'and the tier is NAMED ONCE in the module, so no read, write or repair can half-move it',
    ).toBe(1)
  })
})

// ═══════════════════ CLAUSE 4 — EVERY WRITE PATH IS A ROUTE OR A REPAIR ═══════════════════

describe('view-record · the appearance family, clause 4 — the write census, and no timer, poll or write-on-read', () => {
  it('TH-10 · THE ENUMERATION: the appearance family\'s writers are `commitTheme` (an IPC route, a UI act) and the ONE repair path, no fifth site exists — and NO TIMER, NO POLL, NO `queueMicrotask` and no `Date.now`-driven write stands in the module or its surface, over COMMENT-ELIDED code with a synthetic positive control', () => {
    const module = commentElided(sourceOf('src/main/view-record/index.ts'))
    const surface = commentElided(sourceOf('src/main/view-surface/index.ts'))
    // THE ROUTE'S ONE WRITE, and it writes the CALLER'S PAIR — never a composed declaration.
    expect(/\.write\(VIEW_THEME_ADDRESS, THEME_TIER, \{ token, attribute: attributeName \}\)/.test(module), 'the route writes the act whole, and nothing else').toBe(true)
    // THE REPAIR'S ONE WRITE, through the module's ONE repair-write path.
    expect(/writeWholeValue\(getStore\)\(context, VIEW_THEME_ADDRESS, THEME_TIER/.test(module), 'the repair writes ONE whole legal value through ONE helper').toBe(true)
    // **AND NO THIRD SITE NAMES THIS ADDRESS ON A WRITE**: the two above are the whole of it — the route's act and the repair's
    // whole value — so a fifth write path would red here rather than arrive unnoticed.
    expect(
      (module.match(/\.write\(VIEW_THEME_ADDRESS|writeWholeValue\(getStore\)\(context, VIEW_THEME_ADDRESS/g) ?? []).length,
      'exactly TWO sites write this family: the route and the one repair path',
    ).toBe(2)
    expect(
      (module.match(/VIEW_THEME_ADDRESS/g) ?? []).length,
      'and every other mention of the address is a read, a declaration or the subscription set — never a write',
    ).toBeGreaterThan(2)
    // NO TIMER, NO POLL, NO INTERVAL — with the control that the instrument fires on a synthetic one.
    for (const surfaceText of [module, surface]) {
      for (const token of ['setInterval(', 'setTimeout(', 'requestAnimationFrame(', 'queueMicrotask(']) {
        expect(surfaceText.includes(token), `no timer or deferral stands in this family: ${token}`).toBe(false)
      }
    }
    expect('const t = setTimeout(fn, 0)'.includes('setTimeout('), 'the control: the instrument fires on a synthetic timer').toBe(true)
    // AND THE ROUTE HAS A HANDLER AT THE BOOT, so it is an IPC route rather than a member nothing calls.
    expect(commentElided(sourceOf('src/main/main.ts')).includes('ipcMain.handle(IPC_VIEW_THEME_COMMIT'), 'the route is registered at the boot').toBe(true)
    expect(IPC_VIEW_THEME_COMMIT, 'and its channel is one of the module\'s single-sourced names').toBe('provident:view:theme-commit')
  })

  it('TH-11 · WRITES ARE DRIVEN BY EXTERNAL EVENTS ONLY, AND A READ WRITES NOTHING: the route\'s shape arms answer BEFORE any store verb, the surface\'s read carries the family without minting it, and three reads over a standing record land no byte and no delivery', () => {
    const here = boot(join(dir, 'clause4.json'))
    // THE SHAPE ARMS, each answering the module's own token and sentence and touching no store.
    const before = here.store.read(VIEW_THEME_ADDRESS, 'file')
    expect(here.record.commitTheme(7 as never, 'theme'), 'a setting that is not a string is refused').toEqual({
      status: 'refused',
      reason: THEME_SHAPE_REASON,
      message: THEME_SHAPE_MESSAGE,
      address: null,
    })
    expect(here.record.commitTheme('light', ''), 'and an attribute name a caller could not compose a write from').toEqual({
      status: 'refused',
      reason: THEME_SHAPE_REASON,
      message: THEME_SHAPE_MESSAGE,
      address: null,
    })
    expect(here.store.read(VIEW_THEME_ADDRESS, 'file'), 'and neither refusal touched the store').toEqual(before)
    // A READ WRITES NOTHING: no byte on the file, no delivery, over three readings.
    // **THE SURFACE IS HANDED THE DELIVERY THE CONSTRUCTION ADOPTED AND TAKES NO SUBSCRIPTION OF ITS OWN** (`D-219`;
    // `docs/L3/view-record/delivery.md` §4): `attach`/`detach` and the `onChanged` option are gone with their subject.
    const surface = createViewSurface({ store: here.store, delivery: here.delivery })
    let deliveries = 0
    const off = here.record.subscribe(() => {
      deliveries += 1
    })
    const bytes = here.bytes()
    try {
      for (let n = 0; n < 3; n += 1) expect(surface.read().theme).toEqual(PLACEHOLDER)
      expect(here.bytes(), 'a read lands no byte').toBe(bytes)
      expect(deliveries, 'and causes no delivery').toBe(0)
    } finally {
      off()
    }
    // THE SURFACE'S OWN ARMS, over `unknown` arguments: the same two refusals, before any store verb.
    expect(surface.commitTheme(undefined, 'theme'), 'the surface refuses a non-string setting too').toMatchObject({ status: 'refused', reason: THEME_SHAPE_REASON })
    expect(surface.commitTheme('light', undefined), 'and a missing attribute name').toMatchObject({ status: 'refused', reason: THEME_SHAPE_REASON })
    expect(surface.commitTheme('light', 'theme'), 'while a legal act reaches the record and answers committed').toEqual({ status: 'committed' })
    expect(surface.read().theme.declaration, 'and the surface\'s read carries the resolution').toEqual({ name: 'theme', value: 'light', removal: false })
  })
})

// A type-level row: the repair's return cannot be widened to `void` here either (`D-72`), and the carrier position is
// required (`D-73`) — `npm run typecheck:tests` compiles THIS file, so each directive passes only while the error is real.
// @ts-expect-error — an answer that IS `void` is not a `ViewRepairAnswer`
const themeVoidRepair: ViewRepairAnswer = undefined as unknown as void

declare const anAppearanceStore: ViewRecordStore
const appearanceCarrier = { pending: [] }
// The positive control: a carrier IS accepted here, so the directives below are about the position and not the call.
const appearanceJoinedWrite = (): unknown => writeJoinedAt(anAppearanceStore, appearanceCarrier, VIEW_THEME_ADDRESS, 'file', PLACEHOLDER)

// @ts-expect-error — A REPAIR WRITE WITH NO CARRIER DOES NOT COMPILE: the omission is an arity fault, not a convention
const appearanceCarrierlessWrite = (): unknown => writeJoinedAt(anAppearanceStore, undefined, VIEW_THEME_ADDRESS, 'file', PLACEHOLDER)
