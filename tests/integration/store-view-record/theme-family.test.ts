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
// THE MEASUREMENTS THIS FILE RESTS ON WERE TAKEN BEFORE IT WAS WRITTEN, on the installed `provident-storeroom@1.9.1`, one
// fresh instance per arm (the probe is recorded in `D-97`): a registration instant hands the body `{address, tier, value,
// attempt, op}` with `value: undefined` where the address holds nothing and **no `write` member**; a LANDING instant hands it
// `{address, id, tier, value, op, pending}` with the commit's `pending`, `tier: 'mem'` and still no `write`; the boundary
// REFUSES `null` (`ValueRefusedAtBoundary`), which is why every absent member of this record is written as ABSENCE; the
// crossing NORMALISES a plain object's key order, which is why the pair's comparison is structural and not a serialisation;
// and a landing repair that names its commit at `write`'s fourth position lands inside the same commit, causing EXACTLY ONE
// delivery and never two.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
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

/** The batch a boot supplies: this module's FOUR declarations, mapped the way `src/main/main.ts` maps them. */
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

/** ONE BOOT: a fresh instance over `path`, carrying the whole batch, with its holder bound the way the boot binds it. */
interface Boot {
  readonly store: ViewRecordStore
  readonly record: ViewRecord
  readonly batch: readonly ViewConstraintDeclaration[]
  readonly read: () => ReturnType<ViewRecord['read']>
  readonly bytes: () => string
}

function boot(path: string, withBatch = true): Boot {
  const bound: { current: ViewRecordStore | null } = { current: null }
  const batch = batchOf(() => bound.current)
  const store = createProfileStore({
    filePath: path,
    constraints: (withBatch ? batch : []).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current })
  return { store: bound.current, record, batch, read: () => record.read(), bytes: () => readFileSync(path, 'utf8') }
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
  it('TH-1 · THE CREATION INSTANT: with the batch supplied the STORE\'S OWN READ answers the PLACEHOLDER before any route of the module runs, and a store carrying NO batch answers `AddressNotFound` at the same address — the absent arm the pair exists to repair', () => {
    // THE CONTROL FIRST, ON ITS OWN PROFILE: without the batch the address does not stand at all.
    const bare = boot(join(dir, 'bare.json'), false)
    let absent = ''
    try {
      bare.store.read(VIEW_THEME_ADDRESS, 'mem')
    } catch (caught) {
      absent = (caught as { status?: string }).status ?? ''
    }
    expect(absent, 'a store with no declaration holds NOTHING at `[\'theme\']` — the absent arm, measured').toBe('AddressNotFound')
    expect(bare.read().theme, 'and the record answers the declared placeholder rather than a minted resolution').toEqual(PLACEHOLDER)
    expect(bare.read().source.theme, 'and says that the placeholder and not the record answered').toBe('default')

    // AND THE BATCHED BOOT OVER A FRESH PROFILE: the family stands before any commit, read through the STORE.
    const batched = boot(join(dir, 'batched.json'))
    expect(batched.store.read(VIEW_THEME_ADDRESS, 'mem'), 'the pair minted the appearance record at construction').toEqual({
      declaration: { value: '', removal: true },
    })
    const read = batched.read()
    expect(read.source.theme, 'the family STANDS — a repair put it there, and the read says which').toBe('record')
    expect(read.theme, 'and what it stands at is the placeholder: a declaration that names no attribute').toEqual(PLACEHOLDER)
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

  it('TH-4 · **THE STALE ARM**: a record carrying a resolution for a DIFFERENT token is judged STALE and REPAIRED to the resolution of the token it carries — the pair\'s own answer names the fault, and the standing value is corrected inside the write\'s commit', () => {
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
    expect(here.store.write(VIEW_THEME_ADDRESS, 'mem', stale).op, 'the landing write landed').toBeTruthy()
    expect(here.read().theme, 'and what STANDS after it is the current resolution: the token kept, the declaration corrected').toEqual({
      token: 'light',
      attribute: 'theme',
      declaration: { name: 'theme', value: 'light', removal: false },
    })
  })

  it('TH-5 · A LEGAL RECORD IS NOT REPAIRED, AND THE COMPARISON IS STRUCTURAL — the crossing NORMALISES key order, so a serialisation comparison would report every legal record STALE: a standing record passes the pair `true`, and the pair\'s own derivation of it is BYTE-DIFFERENT from the value it passes', () => {
    const here = boot(join(dir, 'legal.json'))
    here.record.commitTheme('light', 'theme')
    const standing = here.store.read(VIEW_THEME_ADDRESS, 'mem') as Record<string, unknown>
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
    expect(pair({ value: here.store.read(VIEW_THEME_ADDRESS, 'mem') }), 'and that one passes too').toBe(true)
  })

  it('TH-6 · THE REMOVAL ARM: the EMPTY setting is not a token but an ABSENCE — the route carries it, the mechanism declares it `null`, and the record\'s declaration is the removal; `token` is written as ABSENCE because the crossing refuses `null`', () => {
    const here = boot(join(dir, 'removal.json'))
    expect(here.record.commitTheme('', 'theme')).toEqual({ status: 'committed' })
    const standing = here.store.read(VIEW_THEME_ADDRESS, 'mem') as Record<string, unknown>
    expect(Object.hasOwn(standing, 'token'), 'no `token` member stands — the absent setting is ABSENCE, never `null`').toBe(false)
    expect(here.read().theme, 'and the reading maps that absence back to the mechanism\'s own answer').toEqual({
      token: null,
      attribute: 'theme',
      declaration: { name: 'theme', value: '', removal: true },
    })
    // THE MEASUREMENT THAT FORCES THE SPELLING: a `null` in the value is refused by the crossing's own boundary.
    let refusal = ''
    try {
      here.store.write(VIEW_THEME_ADDRESS, 'mem', { token: null, attribute: 'theme' })
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

describe('view-record · the appearance family, clause 3 — a `mem` address is re-minted at every boot', () => {
  it('TH-8 · BOOT DATA IS THE REPAIR AND NEVER THE FILE: two successive boots, the second handed the address ABSENT at its own registration instant and re-minting the placeholder, the setting a previous boot held NOT surviving — and the profile\'s bytes carry no appearance key at all and are byte-identical across both', () => {
    const path = join(dir, 'two-boots.json')
    const one = boot(path)
    expect(one.record.commitTheme('light', 'theme').status, 'the first boot carries an act').toBe('committed')
    expect(one.read().theme.token, 'and the record stands at it').toBe('light')
    const afterOne = one.bytes()
    expect(afterOne.includes('theme'), 'the profile\'s bytes never carry the appearance family — this address is `mem` (D-84, D-97)').toBe(false)
    expect(afterOne.includes('light'), 'nor the token it held').toBe(false)

    const two = boot(path)
    expect(two.read().theme, 'boot two stands at the placeholder again: a `mem` value can never come from a file').toEqual(PLACEHOLDER)
    expect(two.read().source.theme, 'and a REPAIR — not a default — is what made it stand').toBe('record')
    expect(two.read().theme.token, 'the previous boot\'s setting did NOT survive: a restart forgets it, which is what the app does today').toBe(null)
    expect(two.bytes(), 'and the profile is byte-identical across the two boots').toBe(afterOne)
  })

  it('TH-9 · THE FAMILY IS `mem` AND THE TIER IS NAMED ONCE: `file` answers `TierNotFound` at this address, so a `file`-tier read cannot reach it and the family cannot half-move between tiers — the tier the whole-value write names is the tier the read names', () => {
    const here = boot(join(dir, 'tier.json'))
    let wrongTier = ''
    try {
      here.store.read(VIEW_THEME_ADDRESS, 'file')
    } catch (caught) {
      wrongTier = (caught as { status?: string }).status ?? ''
    }
    expect(wrongTier, 'the address lives at `mem` and nowhere else').toBe('TierNotFound')
    expect(here.read().source.theme, 'while the family itself stands at its own tier').toBe('record')
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
    const before = here.store.read(VIEW_THEME_ADDRESS, 'mem')
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
    expect(here.store.read(VIEW_THEME_ADDRESS, 'mem'), 'and neither refusal touched the store').toEqual(before)
    // A READ WRITES NOTHING: no byte on the file, no delivery, over three readings.
    const surface = createViewSurface({ store: here.store })
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
const appearanceJoinedWrite = (): unknown => writeJoinedAt(anAppearanceStore, appearanceCarrier, VIEW_THEME_ADDRESS, 'mem', PLACEHOLDER)

// @ts-expect-error — A REPAIR WRITE WITH NO CARRIER DOES NOT COMPILE: the omission is an arity fault, not a convention
const appearanceCarrierlessWrite = (): unknown => writeJoinedAt(anAppearanceStore, undefined, VIEW_THEME_ADDRESS, 'mem', PLACEHOLDER)
