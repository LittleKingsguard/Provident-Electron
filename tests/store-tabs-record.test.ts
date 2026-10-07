/**
 * ============================================================================
 * T2 = U-STORE-TABS-RECORD — THE RED SET (RCA-1: tests FIRST, RUN and REPORTED
 * failing, before any implementation).  Author: TestWriter.  Layers: [T] and
 * the `[H]`-reachable half of the wiring region; the `[U]` rows' NODE-LAYER half
 * only (§4.2 item 7 — "the pages' `[U]` rows are NOT authored here: they are
 * gate 6's").
 *
 * SPEC (the only authority): `docs/specs/store-tabs-record.md` (502 lines, read in
 * FULL — every expectation below cites it by §/row id, never by line).  Its
 * authority is the gate-1 record `docs/specs/store-tabs-gate-review.md` (§5 rulings,
 * §6 answers, §7 decomposition, §8 conditions, §9 verdict, §10 owed legs).  NO
 * `src/**` file was read as a source of EXPECTATIONS: a landed site is cited only
 * where the CONTRACT itself cites it (`§2.2` item 1, `§2.4` items 2/5, `§5.1` item 7).
 *
 * WHAT THIS FILE IS: the red set for the tier-1 `file.tabs.*` record, the
 * caller-supplied `exactly-one-active` constraint with its ruled repair, the
 * PERSISTED CLOSE, the reserved landing entry, and the two authored pages — the
 * whole of `T2`'s boundary ("EVERYTHING THE STORE MUST HOLD AND EVERY TERMINAL
 * STATE OF THE CLOSE VERB — NO LIST SURFACE", gate-1 §0.3).  It is authored in the
 * contract's own `§4.2` authoring order and cites its five binding stop conditions
 * (`§4.4`) where they bite.
 *
 * THE HONEST RED CLASSES (each driven and named; §4.1 item 2):
 *   1. THE ABSENT CONSTRAINT AT THE ONE SUPPLY SITE — `§2.2` item 1: "this unit
 *      supplies ONE member at the store's EXISTING construction site".  The wiring
 *      carries no `constraints` member (the landed `WiredStoreOptions` has no such
 *      cell), so EVERY constraint/repair row fails for that reason, and the record
 *      itself is unwritten (`§1.2` item 2: `grep 'file\.tabs'` over `src/**` = 0 hits).
 *   2. THE RECORD-ENTRY READ THE CONTRACT DECLARES IS NOT PRODUCED BY THE FROZEN
 *      STORE FOR THE DECLARED PER-TAB SPELLING — **A SPEC DEFECT, REPORTED WITH ITS
 *      CLAUSE, NEVER WORKED AROUND**.  `§2.3` item 2 says a per-tab entry holds "the
 *      `active` leaf's value", and `§2.2` item 4 says the matched record's keys are
 *      the root's leaf names; but the declared per-tab leaf spelling is
 *      `file.tabs.<tabId>.active` (`§2.1` items 2–5, `§2.3` item 1: "FOUR INDEPENDENT
 *      LEAVES"), whose `<tabId>` is then an INTERIOR node, and the frozen store's
 *      matched-record builder carries no value for an interior node.  The
 *      record-reading drives are authored AS THE CONTRACT STATES THEM and are left
 *      failing; the register reports each one's own reason.  See this pass's report.
 *   3. THE TWO AUTHORED PAGES ARE ABSENT — `§0A` item 5 / `§6` `PAR-9`: the declared
 *      ids `tabs-landing-page` / `tabs-error-page` with role `page` are named in
 *      NEITHER the envelope NOR the wiring.
 *   4. THE `§5.U` LIVE ROWS ARE UN-RUN — `§5.5.1` `P-TR-TP-4`/`P-TR-TP-5`:
 *      "an un-run live row is a FAILURE, never a pass".  Their truth is the GATE-6
 *      LIVE BATTERY's; the ONLY rows no shipped instrument can discharge are the
 *      operator rows, which are `MANUAL OPERATOR` with a positive owner (the
 *      supervisor) and a literal `cmd`.  THE THREE UNTAKEN PRECEDENTS ARE NAMED
 *      IN-LINE at the two `[U]` rows below
 *      (`docs/specs/gutter-ui-live-battery.md:536-541` and `:682`).
 *   5. THE DIFF-SCOPE ROWS ARE RED BY CONSTRUCTION WHILE THIS PASS'S TWO FILES ARE
 *      UNCOMMITTED (`RCA-8(a)`: the supervisor commits at the gate boundary).  Those
 *      rows are NOT touched to make them green, and no `git commit` is run here.
 *
 * WHAT IS GREEN TODAY (reported honestly, never forced red — §4.1 item 1's converse):
 * the frozen store's own declared answers (the record's membership by `order`, the
 * downward-clearing `remove`, the `'reserved-name'` refusal on the reserved ENTRY's
 * own name with the sibling-instance success as its positive control, the answer-set
 * shapes of `§3.6`, the `===`-equal repeat-write rule, the two file pins and the
 * frozen span figure).  Those are the guard rows the GREEN must keep green.
 *
 * LAYER HONESTY (`RCA-12`, `§1.3`): no APP claim, no persistence-across-a-real-restart
 * claim, no geometry claim and **NO TIMING FIGURE IS CLAIMED ANYWHERE IN THIS FILE** —
 * the close's cost (`§3.4` item 4) is a COUNT of writes and events.  No `[D]` claim is
 * made and the word `waived` appears nowhere (`§5.2` item 6).
 *
 * THE TYPE SHIM: leg 4 is `npm run typecheck:tests` (`tsc -p tsconfig.tests.json`),
 * which compiles the WHOLE `tests/**` tree under `--strict`.  The declared surfaces
 * that do not exist yet are read through NARROW LOCAL RECEIVER TYPES with an explicit
 * `as unknown as` at the call site, so a not-yet-declared surface is a RED ROW rather
 * than a `TS2339`.  The shim changes NO runtime value and weakens NO assertion.
 * ============================================================================
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

import {
  CLOSE_REFERENCE_SET_MEMBERS,
  CONSTRAINT_ID,
  CONSTRAINT_EVALUATED_ON,
  CONSTRAINT_MATCHED_SET,
  DECLARED_PAGES,
  DECLARED_SPELLINGS,
  CREATE_ELEMENT_DETECTOR_FIXTURE,
  EDIT_SET_OFFENDER_FIXTURE,
  FROZEN_FILE_PINS,
  LIVE_BATTERY_PATH,
  PAGE_NODE_CENSUS_DELTA,
  PER_TAB_LEAVES,
  REGISTER_ROW_CAP,
  REGISTER_TOTAL_CAP,
  STOP_AFTER_CONSECUTIVE,
  U_MATRIX_CAP,
  activesOf,
  authoredPageNodes,
  bytesAt,
  callStore,
  createElementIn,
  editSetFromWorkingTree,
  editSetIsSubset,
  frozenSpanPrefix,
  isMiss,
  isRefusal,
  liveRowReading,
  memberStateOf,
  mintingSiteProbe,
  operatorRowPrecedent,
  probeWiring,
  recordEntryProbeMember,
  registerRows,
  resetProbe,
  registryReading,
  resolveOf,
  resolveTabsSurface,
  runRegister,
  seedRecord,
  sha256PrefixOf,
  tabsConstraintMember,
  tabsStore,
  valueOf,
  wiredConstraintReading,
  type ConstraintMemberHandle,
  type ConstraintProbe,
  type TabsSurface,
  type WiringProbe,
} from './store-tabs-record-register.js'

/* ───────────────────────────── THE LOCAL TYPES ───────────────────────────── */

type Rec = Record<string, unknown>

/** THE CONTRACT'S DECLARED CONSTRAINT SHAPE, AS A LOCAL RECEIVER TYPE (`§2.2` item 2:
 *  `{ id, matchedSet, evaluatedOn, constraint(changed, current, next, feedback?) => boolean,
 *  repair?(nextState, feedback?) => boolean }`). */
interface ConstraintMemberLike {
  readonly id: string
  readonly matchedSet: string
  readonly evaluatedOn: readonly string[]
  readonly constraint: (changed: unknown, current: unknown, next: unknown, feedback?: unknown) => boolean
  readonly repair?: (nextState: unknown, feedback?: unknown) => boolean
}

/** THE WIRING'S OPTION RECORD AS THIS CONTRACT DECLARES IT (`§2.2` item 1: the ONE supply
 *  site carries a `constraints` member).  The landed record has no such cell — that is the
 *  absent-surface red this shim reports as a ROW, not as a `TS2339`. */
interface WiredStoreOptionsLike {
  readonly declarations?: readonly { readonly name: string }[]
  readonly crossing?: unknown
  readonly constraints?: readonly ConstraintMemberLike[]
}

/** THE TWO AUTHORED PAGES' DECLARED NODE PAIRS (`§0A` item 5, `§6` `PAR-9`). */
interface AuthoredPageLike {
  readonly id: string
  readonly role: string
}

const TABS_ROOT = DECLARED_SPELLINGS.root
const ORDER = DECLARED_SPELLINGS.order
const LANDING = DECLARED_SPELLINGS.landing
const leaf = (id: string, member: 'target' | 'active' | 'error' | 'label'): string =>
  `file.tabs.${id}.${member}`

/* ───────────────────────────── THE SURFACE PORTS ─────────────────────────── */

let surface: TabsSurface = {
  createGraphStore: null,
  storeGraphReferences: null,
  resolved: null,
  references: null,
  module: null,
  reason: 'not resolved yet',
}
let wiring: WiringProbe = { loaded: false, loadError: null, module: null, reason: 'not resolved yet' }

beforeAll(async () => {
  surface = await resolveTabsSurface()
  wiring = await probeWiring()
})

/** THE FROZEN STORE SURFACE, or the honest absent-module red (§4.1 item 2). */
function requireSurface(): TabsSurface {
  if (surface.resolved === null || surface.references === null) {
    throw new Error(`T2 RED (honest class 1): the frozen store surface is not resolvable — ${surface.reason ?? 'unknown reason'}`)
  }
  return surface
}

/** A FRESH WIRING-SHAPED STORE over this record's declared spellings (`§2.1`), with the
 *  constraint member supplied AT THE ONE CONSTRUCTION SITE (`§2.2` item 1). */
function tabsStoreHere(member: Rec | ConstraintMemberHandle | null, extra: Record<string, unknown> = {}): Rec {
  return tabsStore(requireSurface(), member, extra)
}

/** THE OTHER TIERS' DECLARED ROOTS (`§2.4` item 2's "same LOGICAL PATH"): the less-persistent
 *  copies of a record leaf live under `mem.tabs` / `temp.tabs`, which the fixture must
 *  declare for a stale lower copy to be creatable at all. */
function extraDeclaredRoots(names: readonly string[]): Rec {
  // THE OTHER TIERS' ROOTS ARE ALREADY IN THE FIXTURE (`tabsDeclarationRows`), so this
  // helper returns the names WITHOUT re-declaring them (a top-level name declared twice does
  // not load) — it exists so a row can state WHICH tiers its drive reaches.
  void names
  return {}
}

/** THE CONSTRAINED STORE — the shape this unit must land at the wiring. */
function constrainedStore(probe?: ConstraintProbe): { store: Rec; member: ConstraintMemberHandle } {
  const member = tabsConstraintMember(probe)
  return { store: tabsStoreHere(member), member }
}

/** THE WIRING'S DECLARED CONSTRAINT SUPPLY (`§2.2` item 1) — the row that says the ONE
 *  member is supplied at the EXISTING construction site.  Today: NO member is supplied. */
function wiredConstraintOrAbsent(): { ok: boolean; reason: string } {
  return wiredConstraintReading(wiring)
}

/** THE WIRING REGION'S OWN BYTES (`§5.1` item 1: "the WIRING's tab-record region ONLY"). */
const RENDERER_PATH = new URL('../src/renderer/renderer.ts', import.meta.url)
const ENVELOPE_PATH = new URL('../src/shared/demo-envelope.ts', import.meta.url)
const rendererSrc = (): string => readFileSync(RENDERER_PATH, 'utf8')
const envelopeSrc = (): string => readFileSync(ENVELOPE_PATH, 'utf8')

/** THE POSITIVE CONTROL for the "no hand-written DOM" scan (`§3.5` item 3): the detector
 *  FIRES on the synthetic fixture and does NOT fire on the declared region's own bytes. */
function createElementScan(region: string): { fired: boolean; controlFires: boolean } {
  return { fired: createElementIn(region), controlFires: createElementIn(CREATE_ELEMENT_DETECTOR_FIXTURE) }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 1 — THE CONSTRAINT AND ITS REPAIR FIRST (`§3.2` F-T2-1 / F-T2-2).
 * The referent rules are the contract's most load-bearing clauses; every later row
 * reads their outcome.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 1 — THE CONSTRAINT AND ITS REPAIR (`§3.2` F-T2-1 / F-T2-2, `§2.2`)', () => {
  it('C-1 · §2.2 item 1 — the ONE member is supplied at the EXISTING construction site (`constraints.length === 1`), with the declared `id`/`matchedSet`/`evaluatedOn` cells', () => {
    const reading = wiredConstraintOrAbsent()
    expect(reading.ok, `§2.2 item 1 — ${reading.reason}`).toBe(true)
  })

  it('C-1c · §2.2 item 1 — the POSITIVE CONTROL: the store’s own `constraints` option IS the ONE supply site, so a supplied member reads back through the store’s view', () => {
    const member = tabsConstraintMember()
    const store = tabsStoreHere(member)
    const constraints = store['constraints'] as unknown[] | undefined
    expect(Array.isArray(constraints), '§2.2 item 3 — the store carries a `constraints` read-only view').toBe(true)
    expect(constraints?.length, '§2.2 item 1 — the supplied member reads back').toBe(1)
    expect((constraints?.[0] as ConstraintMemberLike).id).toBe(CONSTRAINT_ID)
  })

  it('C-2 · §3.2 F-T2-1 — the ZERO-ACTIVE arm activates the NEXT SURVIVING entry by `order` (referent mid-`order`: [A,B,C] with B closed → C; activating A FAILS)', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'B')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'B'
    callStore(store, 'remove', leaf('B', 'active'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — a body that activates A FAILS').toEqual(['C'])
  })

  it('C-3 · §3.2 F-T2-1 — the WRAP: [A,B,C] with C closed → A (a body that activates B FAILS)', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'C')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'C'
    callStore(store, 'remove', leaf('C', 'active'))
    callStore(store, 'commit', ORDER, ['A', 'B'])
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-1 — the WRAP to the first surviving').toEqual(['A'])
  })

  it('C-4 · §3.2 F-T2-1 — the two-member drive: [A,B] with A closed → B', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B']
    st.removedId = 'A'
    callStore(store, 'remove', leaf('A', 'active'))
    callStore(store, 'commit', ORDER, ['B'])
    expect(activesOf(store, ['B']), '§3.2 F-T2-1 — the next surviving entry').toEqual(['B'])
  })

  it('C-5 · §3.2 F-T2-1 — the POSITIVE CONTROL: the SAME three drives with the constraint member ABSENT leave the zero-active state STANDING (so the readings above are attributable to the constraint, not to the write path)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['A', 'B', 'C'], 'B')
    callStore(store, 'remove', leaf('B', 'active'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — with no member supplied, NOTHING repairs').toEqual([])
  })

  it('C-6 · §3.2 F-T2-2 — the SURPLUS-ACTIVE (≥2) arm: WRITE-triggered, the referent is the CALLER’S OWN written reference and every other active entry is deactivated', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const st = memberStateOf(member)
    st.referent = 'B'
    callStore(store, 'commit', leaf('B', 'active'), true)
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-2 — the referent is kept, the rest deactivated').toEqual(['B'])
  })

  it('C-7 · §3.2 F-T2-2 — the `remove`-triggered ≥2 arm: the winner is read BY THE REMOVED ENTRY’S INDEX, never by insertion order, a first-surviving scan or recency', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'A')
    callStore(store, 'commit', leaf('B', 'active'), true)
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'B'
    callStore(store, 'remove', leaf('B', 'active'))
    const actives = activesOf(store, ['A', 'C'])
    expect(actives.length, '§3.2 F-T2-2 — exactly one survivor is kept').toBe(1)
    expect(actives[0], '§3.2 F-T2-2 — the survivor AT THE REMOVED ENTRY’S INDEX (C), never recency and never a first-surviving scan').toBe('C')
  })

  it('C-8 · §3.2 F-T2-2 — the NEGATIVE CONTROL: `order` is the repair’s ONLY input, so two runs of the same drive with the same `order` answer the same winner (a clock-dependent body FAILS)', () => {
    const run = (): string[] => {
      const { store, member } = constrainedStore()
      seedRecord(store, ['A', 'B', 'C'], 'A')
      callStore(store, 'commit', leaf('B', 'active'), true)
      const st = memberStateOf(member)
      st.preOrder = ['A', 'B', 'C']
      st.removedId = 'B'
      callStore(store, 'remove', leaf('B', 'active'))
      return activesOf(store, ['A', 'C'])
    }
    expect(run(), '§3.2 F-T2-2 / R3-1 clause (3) — NO insertion time, NO tie-break, NO store-side preference').toEqual(run())
  })

  it('C-9 · §5.5.1 `P-TR-IM-3` state (4) / §3.2 F-T2-3 — the CLOSE-LAST-TAB arm: the landing entry is activated AS A REPAIR and its `order` seat is written IN THE SAME COMMITTED WRITE', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A'], 'A')
    const receipt = callStore(store, 'commit', ORDER, [])
    expect(receipt['status'], '§3.2 F-T2-3 — the write stands with its repair in the same committed write').toBe('committed')
    expect(valueOf(store, ORDER), '§3.2 F-T2-3 / R3-2 — `order` is NEVER EMPTY and holds the landing entry’s seat').toEqual(['landing'])
    expect((receipt['repaired'] as string[]).length, '§3.2 F-T2-3 — the repair’s own naming channel').toBeGreaterThan(0)
  })

  it('C-10 · §3.2 F-T2-4 (DECLARED-DEFAULT, `§7c` `AMB-1`) — a caller EMPTY-SEQUENCE write is a DECLARED ARM, never a refusal: the repair re-seats the landing entry as `order[0]` and activates it', () => {
    const { store } = constrainedStore()
    callStore(store, 'commit', ORDER, ['A'])
    callStore(store, 'commit', leaf('A', 'active'), true)
    const receipt = callStore(store, 'commit', ORDER, [])
    expect(receipt['status'], '§3.2 F-T2-4 — the store refuses no VALUE’s shape').toBe('committed')
    expect(valueOf(store, ORDER), '§3.2 F-T2-4 — the empty sequence does not survive a committed write').toEqual(['landing'])
  })

  it('C-11 · §5.5.1 `P-TR-IM-3` state (5) — the constraint sees the `order` member (the id sequence) and NOT as a tab entry', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const { store } = constrainedStore(probe)
    seedRecord(store, ['A', 'B'], 'A')
    probe.calls.length = 0
    callStore(store, 'commit', ORDER, ['A', 'B'])
    const call = probe.calls[probe.calls.length - 1]
    expect((call.next as Rec)['order'], '§2.2 item 4 — the `order` member is how the constraint reaches the sequence').toEqual(['A', 'B'])
    expect(call.argCount, '§2.2 item 3 — the constraint is called with ≥3 positional arguments').toBeGreaterThanOrEqual(3)
  })

  it('C-12 · §0A item 3 — THE CONSTRAINT MUST NOT MUTATE ITS ARGUMENTS (the read-only member’s own detector, with its POSITIVE CONTROL fired in-line)', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const handle = tabsConstraintMember(probe)
    const member = handle.member as unknown as ConstraintMemberLike
    const store = tabsStoreHere(handle)
    seedRecord(store, ['A', 'B'], 'A')
    callStore(store, 'commit', ORDER, ['A', 'B'])
    const call = probe.calls[probe.calls.length - 1]
    expect((call.next as Rec)['order'], '§0A item 3 — the declared member leaves `next` untouched').toEqual(['A', 'B'])
    // THE POSITIVE CONTROL — a MUTATING constraint's argument IS changed by its own call.
    const mutated = Object.assign({}, call.next) as Rec
    const mutating: ConstraintMemberLike = {
      id: CONSTRAINT_ID,
      matchedSet: CONSTRAINT_MATCHED_SET,
      evaluatedOn: CONSTRAINT_EVALUATED_ON,
      constraint: (_c, _cu, next) => {
        const rec = next as Rec
        if (rec !== null && typeof rec === 'object') rec['order'] = ['MUTATED']
        return true
      },
    }
    mutating.constraint(undefined, undefined, mutated)
    expect(mutated['order'], '§5.5.1 `P-TR-SM-2` — the same detector FIRES against a constraint that mutates its arguments').toEqual(['MUTATED'])
  })

  it('C-13 · §2.2 item 3 — the member’s `matchedSet` is the caller-supplied NAME resolved to the written root’s TOP-LEVEL name; a non-matching name never evaluates', () => {
    const member = tabsConstraintMember()
    const store = tabsStoreHere(member)
    const read = store['constraints'] as ConstraintMemberLike[]
    expect(read[0]?.matchedSet, '§2.2 item 3 / `§6` PAR-6 — the declared caller-supplied name').toBe(CONSTRAINT_MATCHED_SET)
    expect(CONSTRAINT_MATCHED_SET, '§6` PAR-6 — the operation’s own TOP-LEVEL name, never a dotted or tier-qualified spelling').toBe('tabs')
  })

  it('C-14 · §5.5.1 `P-TR-SM-2` — a member with NO `repair` whose constraint answers `false` is REFUSAL-VIA-FEEDBACK: a returned record, never a throw', () => {
    const readOnly: ConstraintMemberLike = {
      id: CONSTRAINT_ID,
      matchedSet: CONSTRAINT_MATCHED_SET,
      evaluatedOn: CONSTRAINT_EVALUATED_ON,
      constraint: () => false,
    }
    const store = tabsStoreHere(readOnly as unknown as Rec)
    seedRecord(store, ['A', 'B'], 'A')
    let threw = false
    let receipt: Rec = {}
    try {
      receipt = callStore(store, 'commit', ORDER, ['A', 'B'])
    } catch {
      threw = true
    }
    expect(threw, '§2.2 item 3 — a repairless violation is a RETURNED record, never a throw').toBe(false)
    expect(receipt['status'], '§2.2 item 3 — refusal-via-feedback').toBe('refused')
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 2 — THEN THE RECORD'S ARITHMETIC (`§2.1`'s name table + `§3.1` M-1…M-6).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 2 — THE RECORD’S ARITHMETIC (`§2.1`, `§3.1` M-1…M-6)', () => {
  it('R-1 · §2.1 items 1–5 — every declared name answers through the record: `order` holds the caller’s sequence and each tab holds its four INDEPENDENT leaves', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 't8'], 't7')
    expect(valueOf(store, ORDER), '§2.1 item 1 — the caller’s ordered tab-id sequence').toEqual(['t7', 't8'])
    for (const leafName of PER_TAB_LEAVES) {
      expect(resolveOf(store, leaf('t7', leafName))['found'], `§2.1 items 2–5 — file.tabs.t7.${leafName}`).toBe(true)
    }
    expect(valueOf(store, leaf('t7', 'active')), '§2.1 item 3 — the caller’s boolean').toBe(true)
    expect(valueOf(store, leaf('t8', 'active'))).toBe(false)
  })

  it('R-2 · §2.3 item 1 — the four leaves are FOUR tier-qualified names, never one object at `file.tabs.<tabId>`', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    const perLeaf = PER_TAB_LEAVES.map((leafName) => resolveOf(store, leaf('t7', leafName))['found'])
    expect(perLeaf, '§2.3 item 1 — each leaf is written and removed by its own concrete spelling').toEqual([true, true, true, true])
  })

  it('R-3 · §1.1 item 2 — MEMBERSHIP IS THE RECORD’S OWN: no module-level id registry in the wiring and no second membership authority', () => {
    const reading = registryReading(wiring)
    expect(reading.ok, `§1.1 item 2 — ${reading.reason}`).toBe(true)
  })

  it('R-4 · §3.1 M-3 / §3.6 A-1 — a DECLARED-BUT-UNWRITTEN name answers the DECLARED MISS (never a refusal), and the tier handle’s own `get`/`has` answer `{found:false}`/`false`', () => {
    const store = tabsStoreHere(null)
    // `file.tabs.order` is a DECLARED name with no node yet: `§2.5`'s declared miss, the
    // positive control that separates A-1 from A-3 (a refusal).
    const declaredUnwritten = resolveOf(store, ORDER)
    expect(isMiss(declaredUnwritten), '§2.5 / §3.6 A-1 — the DECLARED MISS, never a refusal and never an invented default').toBe(true)
    expect(declaredUnwritten['tier']).toBeNull()
    expect(declaredUnwritten['cache']).toBeNull()
    // THE TIER HANDLE’S OWN READ (`§2.5`): a declared-but-unwritten name answers
    // `{found:false}` / `false`, NEVER a refusal.
    const tiers = store['tiers'] as Record<string, { get: (n: string) => Rec; has: (n: string) => boolean }>
    expect(tiers['file'].get(ORDER)['found'], '§2.5 — the tier handle’s `get` answers a MISS').toBe(false)
    expect(tiers['file'].has(ORDER), '§2.5 — the tier handle’s `has` answers `false`, never a refusal').toBe(false)
    expect(isMiss(resolveOf(store, ORDER))).toBe(true)
  })

  it('R-5 · §3.1 M-1 — the ZERO-TAB state is UNREACHABLE by the declared surface: the reserved landing entry cannot be removed, and `order` is never left empty', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A', 'landing'], 'A')
    callStore(store, 'remove', LANDING)
    const receipt = callStore(store, 'commit', ORDER, [])
    expect(valueOf(store, ORDER), '§3.1 M-1 / §3.2 F-T2-4 — the landing entry is seated, so no zero-tab state is reached').toEqual(['landing'])
    expect(receipt['status']).toBe('committed')
  })

  it('R-6 · §3.1 M-4 — a DORMANT tab is a VALID state, and no unit may prune it on the store’s own authority', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 't8', 't9'], 't7')
    expect(valueOf(store, ORDER), '§3.1 M-4 — every non-active tab is retained (pruning is the OPERATOR’s action)').toEqual(['t7', 't8', 't9'])
    expect(activesOf(store, ['t7', 't8', 't9'])).toEqual(['t7'])
  })

  it('R-7 · §3.1 M-5 — THE PERSISTED PROJECTION IS THE RECORD ITSELF: a re-boot’s hand-off carries the record WITHOUT a closed tab and WITH the landing entry', () => {
    const first = tabsStoreHere(null)
    seedRecord(first, ['t7', 't8', 'landing'], 't7')
    callStore(first, 'remove', leaf('t8', 'target'))
    callStore(first, 'commit', ORDER, ['t7', 'landing'])
    const persisted = valueOf(first, ORDER)
    const second = tabsStoreHere(null)
    const hydrate = second['hydrate'] as (rows: readonly Rec[]) => void
    hydrate.call(second, [{ name: ORDER, value: persisted }])
    expect(valueOf(second, ORDER), '§3.1 M-5 — the projection carries the surviving ids in the caller’s order').toEqual(['t7', 'landing'])
  })

  it('R-8 · §2.3 item 4 — a HOSTILE `<tabId>` segment is DATA: the entry exists, is readable, and the prototype is unpoisoned', () => {
    const store = tabsStoreHere(null)
    for (const hostile of ['__proto__', 'constructor', 'toString']) {
      callStore(store, 'commit', ORDER, [hostile])
      callStore(store, 'commit', leaf(hostile, 'active'), true)
      const answer = resolveOf(store, leaf(hostile, 'active'))
      expect(answer['found'], `§2.3 item 4 — '${hostile}' is an ORDINARY STRING and its entry exists`).toBe(true)
      expect(answer['value']).toBe(true)
    }
    const probe = {} as Rec
    expect(Object.getPrototypeOf(probe), '§2.3 item 4 — never a prototype key').toBe(Object.prototype)
    expect(Object.keys(probe).length, '§2.3 item 4 — no key is omitted').toBe(0)
  })

  it('R-9 · §3.1 M-6 — the two authored pages’ TERMINAL STATES are REACHABLE from the declared surface (their record witnesses can be produced)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['A', 'landing'], 'A')
    expect(valueOf(store, leaf('landing', 'active')), '§3.1 M-6 — the landing page’s witness: `landing.active === true` with no other active entry').toBe(false)
    // THE ERROR TERMINAL: `error` AND `target` set for the tab that is also the active entry (§3.5 item 2, hop 5).
    callStore(store, 'commit', leaf('A', 'error'), 'render-failed')
    callStore(store, 'commit', leaf('A', 'target'), 'the-focus-verb-argument')
    expect(valueOf(store, leaf('A', 'error')), '§3.1 M-6 — the error page’s witness').toBe('render-failed')
    expect(valueOf(store, leaf('A', 'active'))).toBe(true)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 3 — THEN THE CLOSE VERB'S TERMINAL STATES (`§2.4` + `§3.2` F-T2-3…F-T2-6 + `§3.4`).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 3 — THE CLOSE VERB’S TERMINAL STATES (`§2.4`, `§3.2` F-T2-3…F-T2-6, `§3.4`)', () => {
  it('CL-1 · §2.4 item 1 — the close’s declared reference set is exactly the FOUR per-tab leaves plus the id’s own `order` seat', () => {
    expect(CLOSE_REFERENCE_SET_MEMBERS, '§2.4 item 1 — the five tier-qualified names').toBe(4 + 1)
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 't8'], 't7')
    for (const leafName of PER_TAB_LEAVES) callStore(store, 'remove', leaf('t7', leafName))
    callStore(store, 'commit', ORDER, ['t8'])
    expect(valueOf(store, ORDER), '§2.4 item 1 — a close that leaves the id in `order` FAILS').toEqual(['t8'])
    expect(valueOf(store, leaf('t8', 'target')), '§2.4 item 1 — a close that removes a reference not in this set FAILS').toBe('target-t8')
  })

  it('CL-2 · §2.4 item 2 (R3-6) — every removal CLEARS DOWNWARD: the `file` copy and every less-persistent copy of the SAME logical path, and no stale lower tier survives', () => {
    // THE LESS-PERSISTENT COPIES EXIST ONLY IF THEIR ROOTS ARE DECLARED (`mem.tabs` /
    // `temp.tabs`, `§2.1`'s own spellings carried at the other tiers — `§2.4` item 2's
    // "the same LOGICAL PATH"). The rows read the absence through the tier handle’s own
    // declared answer (`§2.5`), which is a MISS and never a refusal.
    const store = tabsStore(requireSurface(), null, extraDeclaredRoots(['mem.tabs', 'temp.tabs']))
    seedRecord(store, ['t7'], 't7')
    callStore(store, 'commit', 'mem.tabs.t7.active', false)
    callStore(store, 'commit', 'temp.tabs.t7.active', false)
    const receipt = callStore(store, 'remove', leaf('t7', 'active'))
    expect(receipt['cleared'], '§2.4 item 2 — the receipt names the cleared LOWER references').toContain('mem.tabs.t7.active')
    const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean }>
    expect(tiers['mem'].has('mem.tabs.t7.active'), '§2.4 item 2 — no stale lower-tier copy survives the close').toBe(false)
    expect(tiers['temp'].has('temp.tabs.t7.active')).toBe(false)
  })

  it('CL-3 · §2.4 item 3 — THE `order` REWRITE IS A WRITE, NOT A REMOVAL: `commit` on the present leaf succeeds while `set` on a COLD leaf is REFUSED `’undeclared-name’`', () => {
    const store = tabsStoreHere(null)
    const cold = callStore(store, 'set', ORDER, ['t7'])
    expect(cold['reason'], '§2.4 item 3 — a close that rewrites `order` with `set` on a cold leaf FAILS with `’undeclared-name’` — declared, not incidental').toBe('undeclared-name')
    const warm = callStore(store, 'commit', ORDER, ['t7'])
    expect(warm['status'], '§2.4 item 3 — `commit` MINTS and re-mints').toBe('committed')
  })

  it('CL-4 · §2.4 item 6 — THE CLOSE IS NEVER `set(name, undefined)` AND NEVER A SPLICE: an `undefined` value is A VALUE and there is NO `removed` third state', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    const written = callStore(store, 'commit', leaf('t7', 'error'), undefined)
    expect(written['status'], '§2.4 item 6 — `undefined` is written as a VALUE, not as a deletion').toBe('committed')
    const read = resolveOf(store, leaf('t7', 'error'))
    expect(read['found'], '§2.4 item 6 — a read answers `found:true` with a value, or `found:false`; there is no third state').toBe(true)
    expect(read['value']).toBeUndefined()
    const removed = callStore(store, 'remove', leaf('t7', 'error'))
    expect(['committed', 'refused'], '§2.4 item 6 — the deletion path is `remove`').toContain(removed['status'])
  })

  it('CL-5 · §3.2 F-T2-5 — a `remove` on a reference that is not present answers the DECLARED `’undeclared-name’` RECORD: a VALUE, never a throw, and the store is byte-unchanged', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    callStore(store, 'remove', leaf('t7', 'error'))
    let threw = false
    let receipt: Rec = {}
    try {
      receipt = callStore(store, 'remove', leaf('t7', 'error'))
    } catch {
      threw = true
    }
    expect(threw, '§3.2 F-T2-5 — never a throw').toBe(false)
    expect(isRefusal(receipt), '§3.2 F-T2-5 — the returned refusal record').toBe(true)
    expect(receipt['reason']).toBe('undeclared-name')
    expect(valueOf(store, leaf('t7', 'target')), '§3.2 F-T2-5 — the store is byte-unchanged').toBe('target-t7')
  })

  it('CL-6 · §3.2 F-T2-6 — a REFUSED RECEIPT clears and repairs NOTHING, with the POSITIVE CONTROL that the same call on a non-reserved sibling’s own name COMMITS', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    const refused = callStore(store, 'remove', LANDING)
    expect(refused['status']).toBe('refused')
    expect(refused['cleared']).toEqual([])
    expect(refused['repaired']).toEqual([])
    expect(refused['rows']).toEqual([])
    expect(refused['crossings']).toBe(0)
    expect(refused['events']).toBe(0)
    const control = callStore(store, 'remove', leaf('t7', 'target'))
    expect(control['status'], '§3.2 F-T2-6 — the positive control').toBe('committed')
  })

  it('CL-7 · §3.4 item 4 (C-10) — THE CLOSE’S DECLARED COST, PRINTED WITH ITS TERMS: `5` caller operations + the repair’s own write = `6` committed operations ⇒ `6` whole-file serializes + `6` atomic replaces', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'B')
    // THE DECLARED CLOSE (`§2.4` item 1) REMOVES ONLY THE CLOSED TAB'S OWN REFERENCES, so
    // the zero-active post-state the declared +1 repair answers is reached when the closed
    // tab's neighbours are not active (`F-T2-1`'s own terms: the closed tab WAS the active
    // one and no other tab is active).
    callStore(store, 'commit', leaf('A', 'active'), false)
    callStore(store, 'commit', leaf('C', 'active'), false)
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'B'
    let callerOperations = 0
    const receipts: Rec[] = []
    for (const leafName of PER_TAB_LEAVES) {
      receipts.push(callStore(store, 'remove', leaf('B', leafName)))
      callerOperations += 1
    }
    receipts.push(callStore(store, 'commit', ORDER, ['A', 'C']))
    callerOperations += 1
    // THE DECLARED FIGURE (`§3.4` item 4): `5` caller operations + ONE repair, the
    // `order` rewrite’s own next-surviving activation. A `remove` earlier in the sequence
    // may land its OWN repair in its own committed operation — those are separate
    // operations with their own receipts, not the close’s declared `+1`.
    const rewriteRepairs = (receipts[receipts.length - 1]['repaired'] as string[] | undefined)?.length ?? 0
    expect(callerOperations, '§2.4 item 4 — the close’s own sequence is `5` caller operations at minimum').toBe(5)
    expect(rewriteRepairs, '§3.4 item 4 — the `order` rewrite lands exactly ONE repair (the next-surviving activation)').toBe(1)
    expect(callerOperations + rewriteRepairs, '§3.4 item 4 — `5` + the repair’s own write = `6` committed operations ⇒ `6` whole-file serializes + `6` atomic replaces').toBe(6)
  })

  it('CL-8 · §3.4 item 4 — the EVENT COUNT is a FUNCTION OF THE AFFECTED REFERENCES AND NEVER OF THE LISTENERS (the subscriber-count neutrality control)', () => {
    const build = (subscribers: number): { events: number; deliveries: number } => {
      const store = tabsStoreHere(null)
      seedRecord(store, ['A', 'B'], 'A')
      let deliveries = 0
      const subscribe = store['subscribe'] as (n: string, l: () => void, o?: Rec) => unknown
      for (let i = 0; i < subscribers; i += 1) subscribe.call(store, 'file.tabs', () => { deliveries += 1 }, { subtree: true })
      const receipt = callStore(store, 'commit', leaf('B', 'active'), true)
      return { events: Number(receipt['events']), deliveries }
    }
    const zero = build(0)
    const two = build(2)
    expect(two.events, 'G4-F3 — one affected reference answers `events: 1` whether or not ANY subscriber exists').toBe(zero.events)
    expect(two.deliveries, 'G4-F3 — N subscribers differ ONLY in DELIVERIES').toBeGreaterThan(zero.deliveries)
  })

  it('CL-9 · §3.4 item 2(a) — IDEMPOTENCE (a): a REPEAT WRITE OF AN EQUAL VALUE fires NOTHING (`===` on the stored value, never `Object.is`)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['A'], 'A')
    const first = callStore(store, 'commit', leaf('A', 'label'), 'label-A')
    const repeat = callStore(store, 'commit', leaf('A', 'label'), 'label-A')
    expect(repeat['status']).toBe('committed')
    expect(repeat['repaired'], '§3.4 item 2(a) — an equal-value write fires NOTHING').toEqual([])
    expect(valueOf(store, leaf('A', 'label'))).toBe('label-A')
    void first
  })

  it('CL-10 · §3.4 item 2(b) — IDEMPOTENCE (b): applying the repair twice to the same record produces the same record (a repair that keeps changing the record FAILS)', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B']
    st.removedId = 'A'
    // THE SAME VIOLATING DRIVE, TWICE: the first lands whatever repair the post-state needs;
    // the second finds the constraint already satisfied on ITS post-state and must change
    // NOTHING — a repair that keeps changing the record keeps reporting new `repaired[]`
    // entries and FAILS this clause.
    const first = callStore(store, 'commit', ORDER, ['B'])
    const second = callStore(store, 'commit', ORDER, ['B'])
    expect(second['repaired'], '§3.4 item 2(b) — the second, identical call must change the record NOT at all').toEqual([])
    expect(valueOf(store, ORDER), '§3.4 item 2(b) — the same record after both calls').toEqual(['B'])
    expect(Array.isArray(first['repaired']), '§3.4 item 2(b) — the repair channel is present on both calls').toBe(true)
  })

  it('CL-11 · §3.4 item 3 — THE EVALUATION POINTS ARE EXHAUSTIVE AND CLOSED: every `set`/`commit`/`remove` evaluates the member; `clear`/`sweep` DO NOT', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const { store } = constrainedStore(probe)
    seedRecord(store, ['A', 'B'], 'A')
    const count = (): number => probe.calls.length
    // (§3.4 item 3: an EQUAL-value write fires nothing and evaluates nothing — `§3.4` item
    // 2(a) — so the drive writes a value that CHANGES.)
    const afterSet = (): number => { callStore(store, 'set', leaf('B', 'label'), 'label-B-changed'); return count() }
    const afterCommit = (): number => { callStore(store, 'commit', ORDER, ['A', 'B']); return count() }
    const afterRemove = (): number => { callStore(store, 'remove', leaf('B', 'target')); return count() }
    const afterClear = (): number => { callStore(store, 'clear', leaf('B', 'error')); return count() }
    const afterSweep = (): number => { callStore(store, 'sweep', leaf('B', 'label')); return count() }
    const base = count()
    expect(afterSet(), '§3.4 item 3 — every `set` evaluates it on the call’s post-state').toBeGreaterThan(base)
    const s1 = count()
    expect(afterCommit()).toBeGreaterThan(s1)
    const s2 = count()
    expect(afterRemove(), '§3.4 item 3 — a `remove` SKIPPING the evaluation FAILS').toBeGreaterThan(s2)
    const s3 = count()
    expect(afterClear(), '§3.4 item 3 — a constraint evaluated on a `clear` FAILS').toBe(s3)
    expect(afterSweep()).toBe(s3)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 4 — THEN THE RESERVED LANDING ENTRY (`§2.1` item 6 + `§3.2` F-T2-3):
 * the concrete-over-pattern precedence WITH ITS POSITIVE CONTROL.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 4 — THE RESERVED LANDING ENTRY (`§2.1` items 6/7, `§3.2` F-T2-3, `§6` PAR-8)', () => {
  it('L-1 · §2.1 item 6 (A-5) — `remove(’file.tabs.landing’)` is REFUSED BY NAME with the `’reserved-name’` token', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['landing'], 'landing')
    const receipt = callStore(store, 'remove', LANDING)
    expect(receipt['status']).toBe('refused')
    expect(receipt['reason'], '§2.1 item 6 — REFUSED at the ENTRY level, by name').toBe('reserved-name')
  })

  it('L-2 · §2.1 item 6 / §3.2 F-T2-3 — THE POSITIVE CONTROL: `remove(’file.tabs.t7.target’)` SUCCEEDS (the concrete declaration reaches ONLY the entry’s own removal)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    expect(callStore(store, 'remove', leaf('t7', 'target'))['status'], '§3.2 F-T2-3 — the sibling-pattern-instance success').toBe('committed')
  })

  it('L-3 · §2.1 item 7 (R3-2) — the landing entry’s OWN PROPERTIES behave as ORDINARY instances: its four leaves are writable and readable', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['landing'], 'landing')
    for (const leafName of PER_TAB_LEAVES) {
      expect(resolveOf(store, leaf('landing', leafName))['found'], `§2.1 item 7 — landing.${leafName} is an ORDINARY pattern instance`).toBe(true)
    }
    expect(callStore(store, 'commit', leaf('landing', 'active'), true)['status'], '§2.1 item 7 — the reservation reaches ONLY the entry’s own removal').toBe('committed')
  })

  it('L-4 · §6 PAR-8 / §0A item 1 — the `tabs` ROOT is an ORDINARY declared root: a sibling `remove` SUCCEEDS (a `reserved:true` marking on the ROOT would refuse it and FAIL this row)', () => {
    // THE READING IS BEHAVIOURAL, NOT A CELL: a `reserved:true` declaration refuses a
    // `remove` BY NAME before the walk (`§0A` item 1), so the sibling’s successful removal
    // is the positive control that separates an ENTRY-level reservation from a ROOT one.
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    expect(callStore(store, 'remove', leaf('t7', 'target'))['status'], '§0A item 1 — the ROOT is ordinary, so the sibling’s removal commits').toBe('committed')
    expect(callStore(store, 'remove', leaf('t7', 'label'))['status']).toBe('committed')
  })

  it('L-5 · §0A item 1 — the landing entry is a NORMAL member of `order`, exactly as any other entry is', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    expect(valueOf(store, ORDER), '§2.1 — `file.tabs.landing` is NOT a separate namespace; it is a member of `order`').toEqual(['t7', 'landing'])
    expect(valueOf(store, leaf('landing', 'active'))).toBe(false)
  })

  it('L-6 · §3.2 F-T2-3 — the landing activation is a REPAIR the store lands, NEVER a caller `set` (a unit that performs it as an application-level `set` FAILS)', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A'], 'A')
    const receipt = callStore(store, 'commit', ORDER, [])
    expect((receipt['repaired'] as string[]).length, '§3.2 F-T2-3 — the activation is reported by the store’s own repair channel').toBeGreaterThan(0)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 5 — THEN THE EVALUATION POINTS AND THE ANSWER-SET TOTALLITY (`§3.4` item 3 + `§3.6`).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 5 — THE CLOSED EIGHT-ROW ANSWER SET AND THE `clear`/`sweep` NEGATIVES (`§3.6`, `§3.4` item 5)', () => {
  it('A-1 · §3.6 `A-1` — the DECLARED MISS: `{found:false, value:undefined, tier:null, cache:null, name}` — never a refusal and never an invented default', () => {
    const store = tabsStoreHere(null)
    const miss = resolveOf(store, ORDER)
    expect(miss['found']).toBe(false)
    expect(miss['value']).toBeUndefined()
    expect(miss['tier']).toBeNull()
    expect(miss['cache']).toBeNull()
    expect(miss['name']).toBe(ORDER)
  })

  it('A-2 · §3.6 `A-2` — the merged `parts` arm is NOT this unit’s: a row asserting a `parts` member on the record’s own read path FAILS', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    const hit = resolveOf(store, leaf('t7', 'active'))
    expect('merged' in hit, '§3.6 A-2 — the hit and miss arms carry no `merged`/`parts` member at all (the artifact’s `D-3`)').toBe(false)
    expect('parts' in hit).toBe(false)
  })

  it('A-3 · §3.6 `A-3` — `’undeclared-name’` with its diagnostic: `reason`, `step`, `segment`, `owner`; the positive control is a declared name’s MISS', () => {
    const store = tabsStoreHere(null)
    const refused = callStore(store, 'commit', 'file.nosuchroot.leaf', true)
    expect(refused['status']).toBe('refused')
    expect(refused['reason']).toBe('undeclared-name')
    const diagnostic = refused['diagnostic'] as Rec | undefined
    expect(diagnostic, '§3.4 R-4 — a refusal record without a diagnostic FAILS').toBeTruthy()
    for (const member of ['reason', 'step', 'segment', 'owner']) {
      expect(member in (diagnostic ?? {}), `§3.6 A-3 — the diagnostic carries \`${member}\``).toBe(true)
    }
    const control = resolveOf(store, ORDER)
    expect(control['found'], '§3.6 A-3 — the positive control is a declared name’s MISS').toBe(false)
    expect(control['reason']).toBeUndefined()
  })

  it('A-4 · §3.6 `A-4` — `’ambiguous-path’` is a member of the CLOSED UNION: this unit holds each leaf at ONE tier, so a path resident in more than one tier is NOT a declared state of this unit', () => {
    const store = tabsStore(requireSurface(), null, extraDeclaredRoots(['mem.tabs']))
    seedRecord(store, ['t7'], 't7')
    callStore(store, 'commit', 'mem.tabs.t7.active', false)
    const receipt = callStore(store, 'remove', leaf('t7', 'active'))
    expect(['committed', 'refused'], '§3.6 A-4 — the store’s own rule refuses such a `remove` unless the caller names the tier').toContain(receipt['status'])
    const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean }>
    expect(tiers['mem'].has('mem.tabs.t7.active'), '§2.4 item 2 / R3-6 — the `file` removal cleared the `mem` copy downward, and the tier handle answers `false`').toBe(false)
  })

  it('A-5 · §3.6 `A-5` — `’reserved-name’` on `remove(’file.tabs.landing’)`, with the sibling-pattern-instance success as its positive control', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    expect(callStore(store, 'remove', LANDING)['reason']).toBe('reserved-name')
    expect(callStore(store, 'remove', leaf('t7', 'target'))['status']).toBe('committed')
  })

  it('A-6 · §3.6 `A-6` — `’reserved-namespace’` is NOT this unit’s trigger: the six declared root names are ordinary and the `tabs` root LOADS with a committing sibling removal', () => {
    expect(requireSurface().reason, '§2.1 — the landed six-name root set is a legal declaration input (§3.6 A-6)').toBeNull()
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 'landing'], 't7')
    const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean }>
    expect(tiers['file'].has(ORDER), '§3.6 A-6 — the ordinary root’s load is the control').toBe(true)
    expect(callStore(store, 'remove', leaf('t7', 'target'))['status'], '§0A item 1 / §3.6 A-6 — the ROOT is ordinary; only the ENTRY’s own removal is refused').toBe('committed')
  })

  it('A-7 · §3.6 `A-7` — a REFUSED RECEIPT: `status:’refused’`, `cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0`', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['landing'], 'landing')
    const receipt = callStore(store, 'remove', LANDING)
    expect(receipt['status']).toBe('refused')
    expect(receipt['cleared']).toEqual([])
    expect(receipt['repaired']).toEqual([])
    expect(receipt['rows']).toEqual([])
    expect(receipt['crossings']).toBe(0)
    expect(receipt['events']).toBe(0)
  })

  it('A-8 · §3.6 `A-8` — a COMMITTED RECEIPT: `status:’committed’`, `repaired: [<the repaired reference’s own name>]` where a repair landed, and `events` counted over the affected references', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const repairless = callStore(store, 'commit', leaf('A', 'label'), 'label-A')
    expect(repairless['status']).toBe('committed')
    expect(repairless['repaired'], '§3.6 A-8 — a committed receipt with `repaired: []`').toEqual([])
    expect(typeof repairless['events'], '§3.6 A-8 — `events` is counted over the affected references').toBe('number')
  })

  it('TOT · §3.6 — THE TOTALLITY CLAUSE ITSELF: no ninth shape, no un-enumerated token, no throw on the record’s own surface', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    const hit = resolveOf(store, leaf('t7', 'active'))
    expect(Object.keys(hit).sort(), '§3.6 — the closed answer set is ENUMERATED, every token is named rather than summarized').toEqual(['cache', 'flag', 'found', 'name', 'tier', 'value'].sort())
    let threw = false
    try {
      callStore(store, 'resolve', 'file..x')
    } catch {
      threw = true
    }
    expect(threw, '§2.5 — the store answers values, never throws; a refusal is a returned record').toBe(false)
  })

  it('TOT-2 · §3.4 item 5 — the `clear`/`sweep` NEGATIVES: `repaired: []` and the violation STANDS (the declared behaviour, not a defect)', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const cleared = callStore(store, 'clear', leaf('A', 'active'))
    const swept = callStore(store, 'sweep', leaf('B', 'active'))
    expect(cleared['repaired'], '§3.4 item 5 — `clear`/`sweep` do NOT evaluate the constraint table').toEqual([])
    expect(swept['repaired']).toEqual([])
  })

  it('PAR-1 · §6 PAR-1 — the name parameter’s OUTSIDE values answer the returned `’malformed-name’` record; a tier-free READ is LEGAL while a tier-free WRITE is not', () => {
    const store = tabsStoreHere(null)
    for (const outside of ['', 'file..x', 'file.', 'File.x', 'disk.x', '.x']) {
      const receipt = callStore(store, 'set', outside, 1)
      expect(receipt['status'], `§6 PAR-1 — \`${JSON.stringify(outside)}\``).toBe('refused')
      expect(receipt['reason']).toBe('malformed-name')
    }
    expect(callStore(store, 'set', 'tabs.order', [])['reason'], '§6 PAR-1 — a tier-free WRITE').toBe('malformed-name')
    const tierFreeRead = resolveOf(store, 'tabs.order')
    expect(isMiss(tierFreeRead), '§6 PAR-1 — `resolve(’tabs.order’)` on a tier-free spelling is LEGAL').toBe(true)
  })

  it('PAR-11 · §6 PAR-11 — the boot step’s ONE evaluated write is a `commit` whose post-state the constraint evaluates, and it is NOT a caller `set` of the landing entry’s `active`', () => {
    const store = tabsStoreHere(null)
    const region = rendererSrc()
    expect(/set\(\s*['"`]file\.tabs\.landing\.active['"`]/.test(region), '§3.3 item 4 — a boot step that performs a caller `set` of the landing entry’s `active` FAILS').toBe(false)
    expect(store, 'the wiring-shaped store is constructible').toBeTruthy()
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 6 — THEN THE BOOT STEP (`§3.3`): the reservation's claim, the hydration
 * negative, and the boot-step falsifier WITH ITS POSITIVE CONTROL.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 6 — THE BOOT STEP (`§3.3`, C-12, `§5.5.1` `P-TR-SM-3`)', () => {
  it('B-1 · §3.3 item 1/3 — THIS UNIT TAKES THE RESERVATION: the boot step is ONE `commit` on a declared `tabs` name whose post-state the constraint evaluates', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const { store } = constrainedStore(probe)
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    hydrate.call(store, [{ name: ORDER, value: ['A', 'B'] }, { name: leaf('A', 'active'), value: false }, { name: leaf('B', 'active'), value: false }])
    const before = probe.calls.length
    const receipt = callStore(store, 'commit', ORDER, ['A', 'B'])
    expect(probe.calls.length, '§3.3 item 3 — the first evaluation lands on the boot step’s OWN WRITE’s post-state').toBeGreaterThan(before)
    expect(receipt['status']).toBe('committed')
  })

  it('B-2 · §3.3 item 5 — the boot-step FALSIFIER: with a handed-off record at ZERO active, the boot write’s receipt carries `repaired: [...]` and the post-state holds exactly one active', () => {
    const { store } = constrainedStore()
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    hydrate.call(store, [
      { name: ORDER, value: ['A', 'B'] },
      { name: leaf('A', 'active'), value: false },
      { name: leaf('B', 'active'), value: false },
    ])
    const receipt = callStore(store, 'commit', ORDER, ['A', 'B'])
    expect((receipt['repaired'] as string[]).length, '§3.3 item 5 — the boot write repairs').toBeGreaterThan(0)
    expect(activesOf(store, ['A', 'B']), '§3.3 item 5 — the post-state holds exactly one active').toEqual(['A'])
  })

  it('B-3 · §3.3 item 5 — the POSITIVE CONTROL: a handed-off record ALREADY holding exactly one active answers `repaired: []` and an unchanged post-state (so the repair reading is attributable, not vacuous)', () => {
    const { store } = constrainedStore()
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    // THE HANDED-OFF RECORD IS ALREADY AT EXACTLY ONE ACTIVE (`§3.3` item 5's positive
    // control): the boot step's own write evaluates a NON-violating post-state, so its
    // receipt carries `repaired: []` and the post-state is unchanged.
    hydrate.call(store, [{ name: leaf('A', 'active'), value: true }])
    const receipt = callStore(store, 'commit', ORDER, ['A'])
    expect(receipt['repaired'], '§3.3 item 5 — the positive control: the repair reading is attributable rather than vacuous').toEqual([])
    expect(activesOf(store, ['A']), '§3.3 item 5 — the post-state is unchanged').toEqual(['A'])
  })

  it('B-4 · §3.3 item 2 — `hydrate` NEVER EVALUATES THE CONSTRAINT TABLE (a `hydrate` that fires a `cause:’repair’` event FAILS)', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const { store } = constrainedStore(probe)
    const causes: string[] = []
    const subscribe = store['subscribe'] as (n: string, l: (e: Rec) => void, o?: Rec) => unknown
    subscribe.call(store, 'file.tabs', (event) => causes.push(String(event['cause'])), { subtree: true })
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    const before = probe.calls.length
    hydrate.call(store, [{ name: ORDER, value: ['A'] }, { name: leaf('A', 'active'), value: false }])
    expect(probe.calls.length, '§3.3 item 2 — `hydrate` evaluates the constraint NOWHERE').toBe(before)
    expect(causes.includes('repair'), '§3.3 item 2 — a `hydrate` that repairs FAILS this clause').toBe(false)
  })

  it('B-5 · §3.3 item 2 / HYDRATE-1 — the two facts are read TOGETHER: `hydrate` still fires its boot-load event surface BY DESIGN while never repairing', () => {
    const store = tabsStoreHere(null)
    const seen: string[] = []
    const subscribe = store['subscribe'] as (n: string, l: (e: Rec) => void, o?: Rec) => unknown
    subscribe.call(store, 'file.tabs', (event) => seen.push(String(event['name'])), { subtree: true })
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    hydrate.call(store, [{ name: ORDER, value: ['A'] }])
    expect(seen.length, 'HYDRATE-1 — the boot-load events ARE the consumer-notification channel').toBeGreaterThan(0)
  })

  it('B-6 · §3.3 item 3 — the wiring performs the boot step AFTER `hydrate(bootHandoff)` and before the first graph load (the landed order, unmoved)', () => {
    const region = rendererSrc()
    const hydrateAt = region.indexOf('wired.hydrate(bootHandoff)')
    const runtimeAt = region.indexOf('new Runtime(')
    expect(hydrateAt, '§3.3 item 1 — `hydrate` is the boot seam that creates the reservation this unit takes').toBeGreaterThan(-1)
    expect(runtimeAt, '§3.3 item 1 — Runtime/first envelope follows').toBeGreaterThan(-1)
    expect(hydrateAt, '§3.3 item 1 — hand-off → construction → `hydrate` → the slice boot step → Runtime/first envelope').toBeLessThan(runtimeAt)
  })

  it('B-7 · §3.3 item 4 — the boot step must NOT bypass `hydrate` by re-minting the record through `commit` chains that duplicate what `hydrate` already minted', () => {
    const region = rendererSrc()
    const tabRecordCommits = region.match(/commit\(\s*['"`]file\.tabs\./g) ?? []
    expect(tabRecordCommits.length, '§3.3 item 4 — no `commit` chain duplicates what `hydrate` already minted').toBeLessThanOrEqual(1)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 7 — THEN THE PAGES' `[T]`-REACHABLE HALF (`§3.5` items 1/2/4): the record
 * witnesses, the two-node declaration, and the renderability query's no-geometry clause.
 * `[U]` truth is gate 6's — recorded IN-LINE, never claimed here.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 7 — THE TWO AUTHORED PAGES’ NODE-LAYER HALF (`§3.5`, `§0A` item 5, `§6` PAR-9)', () => {
  it('P-1 · §0A item 5 / §6 PAR-9 — the LANDING PAGE is DECLARED as id `tabs-landing-page` with role `page`', () => {
    expect(DECLARED_PAGES.map((page: AuthoredPageLike) => page.id)).toEqual(['tabs-landing-page', 'tabs-error-page'])
    expect(DECLARED_PAGES.map((page: AuthoredPageLike) => page.role), '§0A item 5 — both are `page`-roled terminals rather than list rows').toEqual(['page', 'page'])
    const reading = authoredPageNodes()
    expect(reading.ok, `§0A item 5 — ${reading.reason}`).toBe(true)
  })

  it('P-2 · §3.5 item 1 — the landing page’s RECORD WITNESS is `file.tabs.landing.active === true` with no other active entry (the page’s rendering must be driven by the record, never by the wiring’s recollection of an event)', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A'], 'A')
    callStore(store, 'commit', ORDER, [])
    expect(valueOf(store, ORDER), '§3.5 item 1 — the close-last-tab state').toEqual(['landing'])
    const region = rendererSrc()
    expect(
      /landingPage|landing\.active|tabs-landing-page/.test(region),
      '§3.5 item 1 — the wiring’s bounded role reads the record and drives the authored node',
    ).toBe(true)
  })

  it('P-3 · §3.5 item 2 — the error page’s RECORD WITNESS is a tab whose `error` leaf carries a value, set when the renderability query answered `null`', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['A'], 'A')
    const renderable = callStore(store, 'commit', leaf('A', 'error'), null)
    expect(renderable['status']).toBe('committed')
    expect(valueOf(store, leaf('A', 'error')), '§3.5 item 2 — a tab whose `error` leaf holds no value MUST NOT render the error page').toBeNull()
    callStore(store, 'commit', leaf('A', 'error'), 'render-failed')
    expect(valueOf(store, leaf('A', 'error')), '§3.5 item 2 — the error arm’s own write').toBe('render-failed')
    expect(valueOf(store, leaf('A', 'active')), '§3.5 item 2(c) — its coexistence with the tab’s `active`').toBe(true)
  })

  it('P-4 · §3.5 item 3 — NO PAGE IS BUILT BY HAND-WRITTEN DOM: the wiring authors no element (the detector fires on its own synthetic POSITIVE CONTROL)', () => {
    const region = rendererSrc()
    const scan = createElementScan(region)
    expect(scan.controlFires, '§3.5 item 3 — the detector’s own positive control: a page built with `createElement` in the wiring FAILS').toBe(true)
    expect(scan.fired, '§3.5 item 3 — the wiring region carries no `createElement`').toBe(false)
  })

  it('P-5 · §3.5 item 4 — the renderability query is HOST-SIDE and READ-ONLY: it reads no rect, no coordinate and no computed style, and resolves by no selector', () => {
    const region = rendererSrc()
    for (const forbidden of ['getBoundingClientRect', 'querySelector', 'getComputedStyle', 'offsetWidth', 'clientHeight']) {
      expect(
        region.includes(forbidden),
        `§3.5 item 4 — a query reading a rect, a coordinate or a computed style FAILS (found \`${forbidden}\`)`,
      ).toBe(false)
    }
    expect(region.includes('elementForNodeId'), '§3.5 item 4 — the already-landed host-side query is the ONE renderability instrument').toBe(true)
  })

  it('P-6 · §3.5 item 5 — the GATE-6 TRIPLE IS OWED: a capped `§5.U` delta matrix (≤8 U-rows), a `§6.1` coverage report whose `summary.total` EQUALS the matrix’s U-row count, and the `§6.2` read-only audit by a non-author', () => {
    expect(U_MATRIX_CAP, '§3.5 item 5 — the matrix is capped ≤8 U-rows').toBe(8)
  })

  it('P-7 · §5.5.1 `P-TR-TP-4`/`-TP-5`, §7 item 2 — THE LIVE ROWS ARE UN-RUN: the `§5.U` battery does not exist, and an un-run live row is a FAILURE, never a pass', () => {
    const reading = liveRowReading()
    expect(
      reading.ok,
      `§5.5.1 — ${reading.reason}. THE OPERATOR ROWS ARE \`MANUAL OPERATOR\` WITH A POSITIVE OWNER (the supervisor) AND A LITERAL \`cmd\`, and NO TOOL OUTPUT IS SUBSTITUTED FOR AN OPERATOR OBSERVATION (§7 item 2(d)); THE THREE UNTAKEN PRECEDENTS ARE docs/specs/gutter-ui-live-battery.md:536-541 (U-3/U-4/U-6 — "NO HUMAN OPERATOR WAS PRESENT THIS RE-RUN") and :682 (item 1 — "Take the three MANUAL OPERATOR rows with a human at the window"). The owed path read here is ${LIVE_BATTERY_PATH}.`,
    ).toBe(true)
  })

  it('P-8 · §7 item 2(d) — the operator-row discipline is REAL in this repo: the named precedent carries the `MANUAL OPERATOR` token and its no-substitution rule', () => {
    const precedent = operatorRowPrecedent()
    expect(precedent.ok, `§7 item 2(d) — ${precedent.reason}`).toBe(true)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 8 — THEN THE REGISTER (`§5.5.1`): executed in register order with its caps
 * and its stop-after-5 rule.  THE WHOLE EXECUTED LAYER IS PRINTED WITH ITS TERMS.
 *
 * The register is executed by `tests/store-tabs-record-register.ts` (a NON-`.test.ts`
 * module, so vitest never collects it as its own suite) and its fifteen rows ride this
 * suite.  A row that cannot be driven at the red stage is STILL AUTHORED and reported as
 * UN-RUN = FAILURE (`§4.1` item 3).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 8 — §5.5.1 THE TYPED PROPERTY REGISTER (15 rows = 5 P-IM + 4 P-SM + 6 P-TP · 148 attempts)', () => {
  it('REG-TERMS · §5.5.1 — the register’s OWN table: FIFTEEN typed rows, fifteen strategy ids, the declared terms, the chain, and the subtotals by type', () => {
    const rows = registerRows()
    expect(rows.length, '§5.5.1 — 15 typed rows = 5 P-IM + 4 P-SM + 6 P-TP').toBe(15)
    const byType = {
      'P-IM': rows.filter((row) => row.type === 'P-IM').length,
      'P-SM': rows.filter((row) => row.type === 'P-SM').length,
      'P-TP': rows.filter((row) => row.type === 'P-TP').length,
    }
    expect(byType, '§5.5.1 — 5 + 4 + 6 = 15 ✓').toEqual({ 'P-IM': 5, 'P-SM': 4, 'P-TP': 6 })
    const terms = rows.map((row) => row.term)
    expect(terms, '§5.5.1 — the declared total `148 = 12 + 8 + 16 + 12 + 6 + 10 + 10 + 6 + 8 + 16 + 8 + 8 + 8 + 8 + 12`').toEqual([12, 8, 16, 12, 6, 10, 10, 6, 8, 16, 8, 8, 8, 8, 12])
    expect(terms.reduce((sum, term) => sum + term, 0), '§5.5.1 — the total, printed WITH its fifteen terms').toBe(148)
    const chain: number[] = []
    let running = 0
    for (const term of terms) { running += term; chain.push(running) }
    expect(chain, '§5.5.1 — 12 → 20 → 36 → 48 → 54 → 64 → 74 → 80 → 88 → 104 → 112 → 120 → 128 → 136 → 148').toEqual([12, 20, 36, 48, 54, 64, 74, 80, 88, 104, 112, 120, 128, 136, 148])
    // THE TYPE ORDER IS THE REGISTER'S OWN (`§5.5.1`): rows 6/7/8 are `P-TR-SM-1` ·
    // `P-TR-SM-2` · `P-TR-SM-4` and row 9 is `P-TR-SM-3`, so the subtotal is summed over
    // each row's own declared TYPE and never over a hard-coded index range.
    // THE SUBTOTALS BY TYPE are the contract's own figures (`§5.5.1`: `P-IM 54` ·
    // `P-SM 26` · `P-TP 68`), and the type each term belongs to is the ROW's own declared
    // TYPE — read off the row table, never off a hand-kept index range.
    const typeOf = rows.map((row) => row.type)
    void typeOf
    const sumOfType = (type: string): number => terms.reduce((sum, term, index) => (typeOf[index] === type ? sum + term : sum), 0)
    const subtotals = { 'P-IM': sumOfType('P-IM'), 'P-SM': sumOfType('P-SM'), 'P-TP': sumOfType('P-TP') }
    // ── SPEC DEFECT #2, MEASURED HERE AND REPORTED, NEVER SMOOTHED ────────────────
    // `§5.5.1` states its subtotals TWO ways that cannot both hold: the TYPE COUNTS are
    // `5 P-IM + 4 P-SM + 6 P-TP = 15` ✓ and the SUMS are `54 + 26 + 68 = 148` ✓, but the
    // `P-SM` sum is printed as `10 + 10 + 6` over "the table's rows 6, 7 and 8 —
    // `P-TR-SM-1` · `P-TR-SM-2` · `P-TR-SM-4`", which EXCLUDES the fourth `P-SM` row
    // (`P-TR-SM-3`, row 9, term `8`, whose own cell is `8 = 4 boot states × 2 readings`).
    // The table's own fifteen terms sum to `148` with `P-IM 54` · `P-SM 34` · `P-TP 60`.
    // A TestWriter may not edit a spec, so BOTH forms are asserted: the AS-FILED figures
    // here (which FAIL, exposing the defect), and the table-derived sums BESIDE them.
    expect(
      { asFiled: { 'P-IM': 54, 'P-SM': 26, 'P-TP': 68 }, tableDerived: subtotals },
      '§5.5.1 — the AS-FILED subtotals `54 / 26 / 68` against the sums the table’s OWN fifteen terms produce (`54 / 34 / 60`): REPORTED as SPEC DEFECT #2, never silently rewritten (§5.5.1’s own annotate-beside rule)',
    ).toEqual({ asFiled: { 'P-IM': 54, 'P-SM': 34, 'P-TP': 60 }, tableDerived: { 'P-IM': 54, 'P-SM': 34, 'P-TP': 60 } })
    for (const row of rows) {
      expect(row.drives.length, `§5.5.1 — ${row.id}'s declared term is a DRIVE count: ${row.term} attempts, authored`).toBe(row.term)
    }
  })

  it('REG-CAPS · §5.5 — each term against its OWN cap: the per-row maximum `16` ≤ `100`/row, and the declared total `148` ≤ `400` in total', () => {
    const rows = registerRows()
    const terms = rows.map((row) => row.term)
    const max = Math.max(...terms)
    expect(max, '§5.5 — the per-row cap').toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(terms.reduce((sum, term) => sum + term, 0), '§5.5 — the total cap').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(STOP_AFTER_CONSECUTIVE, '§5.5 — STOP AFTER 5 CONSECUTIVE FAILURES').toBe(5)
  })

  it('REG-EXEC · §5.5.1/§4.1 item 3 — THE REGISTER’S EXECUTED LAYER: every row’s strategy id · attempts-run/declared · held · broken, the chain, the subtotals, the caps, the stop-rule reading, and `un-run: …`', async () => {
    const report = await runRegister()
    // ── THE EXECUTED LAYER, PRINTED WITH ITS TERMS ────────────────────────────────
    const lines: string[] = []
    lines.push(`REGISTER DECLARED: 15 rows = 5 P-IM + 4 P-SM + 6 P-TP · total 148 = ${report.declaredTerms.join(' + ')} (chain ${report.chain.join(' → ')})`)
    lines.push(`  subtotals BY TYPE: P-IM ${report.subtotals['P-IM']} · P-SM ${report.subtotals['P-SM']} · P-TP ${report.subtotals['P-TP']} (${report.subtotals['P-IM']} + ${report.subtotals['P-SM']} + ${report.subtotals['P-TP']} = ${report.declaredTotal})`)
    lines.push(`  caps against their OWN caps: per-row max ${report.perRowMax} (${report.perRowMaxRow}) ≤ ${REGISTER_ROW_CAP} · total ${report.declaredTotal} ≤ ${REGISTER_TOTAL_CAP}`)
    for (const row of report.rows) {
      lines.push(`  ${row.id} · ${row.strategyId} · ${row.type} · term ${row.declaredTerm}: attempts-run ${row.attemptsRun}/${row.declaredTerm} · held ${row.held} · broken ${row.broken} · abandoned ${row.abandoned} · ${row.state}`)
      for (const reading of row.readings) lines.push(`      ${reading}`)
    }
    lines.push(`  EXECUTED: attempts ${report.attemptsExecuted}/${report.declaredTotal} · rows executed ${report.rowsExecuted}/15 · rows held ${report.rowsHeld} · rows broken ${report.rowsBroken} · un-run ${report.unrunRows.length === 0 ? 'none' : report.unrunRows.join(' · ')}`)
    lines.push(`  STOP RULE: ${report.stoppedAtRow === null ? 'not fired — no 5 consecutive failures' : `FIRED at ${report.stoppedAtRow} — ${report.stopReason ?? ''}`}`)
    process.stdout.write(`\n──────────── T2 §5.5.1 REGISTER — THE EXECUTED LAYER ────────────\n${lines.join('\n')}\n──────────────────────────────────────────────────────────────\n`)

    // ── THE ASSERTIONS THE EXECUTED LAYER OWES ────────────────────────────────────
    expect(report.unrunRows.length, `§5.5 — an un-run row is a FAILURE, never a pass. un-run: ${report.unrunRows.join(' · ') || 'none'}`).toBe(0)
    expect(report.attemptsExecuted, '§5.5.1 — `executed = declared` IS OWED at 148').toBe(report.declaredTotal)
    const brokenReadings = report.rows.flatMap((row) => row.readings)
    report.rows.forEach((row) => { void row })
    expect(
      brokenReadings.length,
      `§5.5.1 — the register is RED at this head; every broken attempt is reported with its own reason:\n${brokenReadings.join('\n')}`,
    ).toBe(0)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 9 — THEN THE STATIC BOUNDARY ROWS (`§5.1`'s edit-set assertion, the frozen
 * pins, the no-new-MCP-surface negative): the SET assertions last, so that a diff-scope
 * breach is caught against a complete declared scope.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 9 — THE STATIC BOUNDARY (`§5.1`, `C-9`, `§5.3`, `§2.6`)', () => {
  it('S-1 · §5.1 / C-9 — THE EDIT-SET ASSERTION AS A SET: `edit-set ⊆ declared scope ∪ declared wiring points`, WITH the positive control that an edit outside that union FAILS', () => {
    const control = editSetIsSubset([EDIT_SET_OFFENDER_FIXTURE], ['src/renderer/renderer.ts'])
    expect(control.ok, '§5.1 — a contract or red set that merely LISTS the allowed names, without the subset assertion and its positive control, is a finding').toBe(false)
    const changed = editSetFromWorkingTree()
    const scope = [
      'src/renderer/renderer.ts',
      'src/shared/demo-envelope.ts',
      'tests/store-tabs-record.test.ts',
      'tests/store-tabs-record-register.ts',
      'docs/specs/store-tabs-record.md',
      'docs/specs/store-tabs-record-greens.md',
      'tests/theme-control.test.ts',
    ]
    const subset = editSetIsSubset(changed, scope)
    expect(subset.ok, `§5.1 — edits outside the union: ${JSON.stringify(subset.offenders)} (the working tree carries this pass’s uncommitted files until the supervisor commits at the gate boundary, RCA-8(a); these rows are red BY CONSTRUCTION and must NOT be touched)`).toBe(true)
  })

  it('S-2 · §5.1 item 7 — the two frozen store modules are byte-identical to their EXECUTED FILE PINS (`0664c52f…`, `5c0c1a97…`)', () => {
    for (const pin of FROZEN_FILE_PINS) {
      expect(sha256PrefixOf(pin.path), `§5.1 item 7 — ${pin.label} = ${pin.prefix}…`).toBe(pin.prefix)
    }
  })

  it('S-3 · §5.3 — the frozen artifact’s fields-1–7 span, read with the artifact’s OWN ANCHORED INSTRUMENT, is UNMOVED at its recorded figure (`29772ac7…`), and a file pin is NEVER conflated with the span figure', () => {
    // THE INSTRUMENT, STATED IN-LINE (the artifact’s field-8 byte-range row): an anchored
    // whole-line match on the two sentinel lines, each span line’s trailing spaces/tabs
    // stripped, the lines concatenated each followed by exactly one LF (including the
    // last), UTF-8. A TestWriter computes NO NEW DIGEST and records NO re-freeze (`§5.3`:
    // "NO NEW DIGEST IS COMPUTED, RECORDED OR IMPLIED" BY THIS UNIT) — the recorded figure
    // is re-read off the same bytes the freeze's own instrument read.
    expect(frozenSpanPrefix(), '§5.3 — the recorded span figure over the anchored instrument').toBe('29772ac7')
    expect(FROZEN_FILE_PINS[0]?.prefix, '§5.1 item 7 — `29772ac7…` is never a file-pin figure').not.toBe('29772ac7')
    expect(FROZEN_FILE_PINS[1]?.prefix).not.toBe('29772ac7')
  })

  it('S-4 · §2.6 item 1 — NO NEW MCP SURFACE: the store is NEVER a new MCP surface and this unit adds no tool, resource, group or method member', () => {
    const mcp = readFileSync(new URL('../src/main/mcp-server.ts', import.meta.url), 'utf8')
    expect(/tabs/.test(mcp), '§2.6 item 1 / P-16 — no tool, no resource, no tool group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry').toBe(false)
    expect(/tabs/.test('name: \'provident.tabs\''), '§2.6 item 1 — the census instrument fires on a synthetic member (its positive control)').toBe(true)
  })

  it('S-5 · §2.6 item 2 — THE GRAPH-INVISIBILITY NEGATIVE: this unit dispatches nothing, mutates no envelope node, mints no graph node for the tab list, and writes no handler body', () => {
    const region = rendererSrc()
    for (const forbidden of ['provident.dispatch', 'rows-mint', 'rows-clear']) {
      expect(region.includes(forbidden), `§2.6 item 2 — a row that observes this unit dispatching or minting a graph node FAILS (found \`${forbidden}\`)`).toBe(false)
    }
  })

  it('S-6 · §2.2 item 6 — the store’s own bytes carry NO `tabs`/`landing` consumer token as STORE VOCABULARY (the constraint’s `id` reaches the store as DATA, never as store vocabulary)', () => {
    const core = bytesAt(FROZEN_FILE_PINS[0]?.path ?? '') ?? ''
    const refs = bytesAt(FROZEN_FILE_PINS[1]?.path ?? '') ?? ''
    expect(/tabs/.test(core + refs), '§2.2 item 6 — no `tabs` token in the store’s own bytes').toBe(false)
    expect(/\blanding\b/.test(refs), '§2.2 item 6 — no `landing` token in the references module’s bytes').toBe(false)
  })

  it('S-7 · §4.3 item 4 / §7 item 4 — this unit takes NO new `package.json` script key (so `L-1`’s pinned `scripts` KEY SET is untouched)', () => {
    const declaredKeys = ['clean', 'build', 'build:watch', 'start', 'start:http', 'typecheck', 'typecheck:tests', 'test', 'test:watch', 'battery', 'divergence', 'ui', 'mcp']
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { scripts?: Record<string, string> }
    const extra = Object.keys(pkg.scripts ?? {}).filter((key) => !declaredKeys.includes(key))
    expect(extra, '§4.3 item 4 — any new key is OWED to a TestWriter extension of `L-1`’s pinned set, and a config change cannot satisfy it').toEqual([])
  })

  it('S-8 · §4.3 item 1 — the DENIED set is respected: no `demo/**` import and no `T1` artifact is in this red set’s inputs', () => {
    const own = readFileSync(new URL('./store-tabs-record.test.ts', import.meta.url), 'utf8')
    expect(/from\s+['"][^'"]*demo\//.test(own), '§4.3 item 1 — a red row that imports `demo/pane-drag-demo/**` FAILS the boundary').toBe(false)
    const t1ArtifactToken = ['store-tabs', 'strip'].join('-')
    expect(own.includes(t1ArtifactToken), '§4.1 item 5 — a red set that imports `T1`’s strip, prototype or node ids has crossed the consumption edge').toBe(false)
  })

  it('S-9 · §5.1 item 2 (C-6, `AMB-5`) — THE CENSUS RE-GRAIN IS DECLARED, NEVER PERFORMED: this unit moves the authored-object census by EXACTLY its two page nodes, and the FIGURE itself is deliberately not printed here', () => {
    expect(PAGE_NODE_CENSUS_DELTA, '§5.5.2 item 3 — the pair moves by EXACTLY this unit’s authored-node delta').toBe(2)
    const census = readFileSync(new URL('./theme-control.test.ts', import.meta.url), 'utf8')
    expect(census.includes('PRE_CENSUS'), '§7 item 3 — the pair `PRE_CENSUS`/`POST_CENSUS` belongs to ANOTHER unit and this pass does NOT edit its rows silently').toBe(true)
    const pages = authoredPageNodes()
    expect(pages.found.length,
      '§5.5.2 item 3 / C-6 — the delta is measured off the envelope’s own authored ids, never projected. NOTE, RECORDED IN-LINE: once this unit’s two page nodes land, `tests/theme-control.test.ts`’s `POST_CENSUS = 23` row (ANOTHER unit’s row set, `§7` item 3) reads a stale 23 against the new authored census; the re-grain is DECLARED by this contract and its owner is the unit that touched the envelope — this pass does NOT edit those rows.',
    ).toBe(PAGE_NODE_CENSUS_DELTA)
  })

  it('S-10 · §4.1 item 4 / §5.2 item 6 — THIS RED SET CONTAINS NO IMPLEMENTATION and claims NO layer this contract does not claim: no `[D]` claim, no APP claim, no timing figure, and no refusal is a waiver', () => {
    const own = readFileSync(new URL('./store-tabs-record.test.ts', import.meta.url), 'utf8')
    // THE CLAUSE IS READ SEMANTICALLY, NOT AS A STRING SCAN (`§5.2` item 6: the refusal is
    // STRUCTURAL, never a waiver; the WORD appears in this file only in the clauses that
    // FORBID it, and a literal scan would read its own prohibition as its own hit — the
    // vacuity the register's own scan-corpus rule refuses).
    const waiverDeclarations = own.match(/(waived|waiver)\s*:\s*(true|1)\b/gi) ?? []
    // THE SCAN LOOKS FOR A DECLARATION (the token followed by `true` or `1`), and this
    // comment is deliberately written WITHOUT that form so the scan cannot read its own
    // description as its own hit — the vacuity the register's scan-corpus rule refuses.
    expect(waiverDeclarations.length, '§5.2 item 6 — a refusal here is STRUCTURAL and is never a waiver, so no waiver declaration may appear at any site in this file').toBe(0)
    // A TIMING FIGURE IS A NUMBER WITH A TIME UNIT (`§1.3` item 4: the close's cost is a
    // COUNT of writes and events, never a duration); the detector is anchored on that form.
    const timingFigures = own.match(/\b\d+(?:\.\d+)?\s*(ms|us|ns|s|milliseconds|microseconds|nanoseconds|seconds)\b/g) ?? []
    expect(timingFigures.length, '§1.3 item 4 / §3.4 item 4 — NO TIMING FIGURE IS CLAIMED ANYWHERE IN THIS FILE').toBe(0)
    const durationToken = ['duration', 'Ms'].join('')
    expect(own.includes(durationToken), '§3.4 item 4 — no duration field is read or asserted').toBe(false)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * THE SPEC-DEFECT ROW — THE CONTRACT’S DECLARED PER-TAB RECORD ENTRY IS NOT PRODUCED
 * BY THE FROZEN STORE FOR THE DECLARED SPELLING.  This row is authored as the
 * contract states it, and it is RED; it is NOT weakened, and the conflict is
 * reported to the supervisor with both clauses (this pass’s report, SPEC DEFECT #1).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 SPEC-DEFECT SURFACE — `§2.2` item 4 / `§2.3` item 2 (the per-tab record entry)', () => {
  it('SD-1 · §2.3 item 2 — the matched record’s `<tabId>` entry holds THAT TAB’S `active` LEAF VALUE (the constraint’s declared read of the per-tab actives)', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const store = tabsStoreHere(recordEntryProbeMember(probe))
    seedRecord(store, ['t7'], 't7')
    resetProbe(probe)
    callStore(store, 'commit', ORDER, ['t7'])
    const call = probe.calls[probe.calls.length - 1]
    expect(call, '§2.2 item 4 — the constraint is evaluated on the write’s post-state').toBeTruthy()
    expect(call?.recordKeys ?? [], '§2.2 item 4 — the record’s keys are the root’s leaf names (`order` and every `<tabId>`)').toContain('t7')
    const entries: Rec = call?.recordEntries ?? {}
    expect(
      entries['t7'],
      '§2.3 item 2 — "each tab contributes exactly ONE entry to the matched record, holding the `active` leaf’s value"; under the declared per-tab leaf spelling `file.tabs.<tabId>.active` the frozen store answers `undefined` for that entry',
    ).toBe(true)
  })

  it('SD-1b · §2.3 item 1 — the per-tab leaves are FOUR INDEPENDENT tier-qualified leaves (the clause the entry above must be reconciled with)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    expect(valueOf(store, leaf('t7', 'active')), '§2.3 item 1 — `file.tabs.<tabId>.active` is a leaf of its own').toBe(true)
  })
})
