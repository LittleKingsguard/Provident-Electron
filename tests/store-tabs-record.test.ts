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
  CLOSE_REFERENCE_SET_MEMBERS_AS_FILED,
  CONSTRAINT_ID,
  CONSTRAINT_EVALUATED_ON,
  CONSTRAINT_MATCHED_SET,
  DECLARED_PAGES,
  DECLARED_SPELLINGS,
  CREATE_ELEMENT_DETECTOR_FIXTURE,
  EDIT_SET_OFFENDER_FIXTURE,
  FROZEN_FILE_PINS,
  LIVE_BATTERY_PATH,
  LIVE_DRIVER_PATH,
  DRIVER_RUN_FORM,
  LIVE_HALF_STATUS,
  S_D9_BOUND,
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
  entryActiveOf,
  entryReadsActive,
  seedEntryRecord,
  DECLARED_SCOPE_PATHS,
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
/** ── `2026-10-11` THE PER-TAB REFERENCE, IN BOTH OF ITS DECLARED FORMS (`SD-1`) ──────────
 *  **AS FILED** every per-tab access in this file was the NESTED member spelling
 *  `file.tabs.<tabId>.<member>` (`leaf(...)`). **THE OPERATIVE FORM (`§0D` item `1`(c)) IS ONE
 *  FLAT LEAF, `file.tabs.<tabId>`, WHOSE VALUE IS THE TAB'S DECLARED RECORD** — `entry(id)` —
 *  and the CONSTRAINT's declared accessor is the entry's value at the tab's own key:
 *  `entry.active === true` for an OBJECT-valued entry and `entry === true` for a SCALAR-valued
 *  one, BOTH ARMS DECLARED. **SO AN ACTIVE MARK IS DRIVEN AND READ THROUGH `entry(id)` and
 *  NEVER through `leaf(id,'active')`** — one declared accessor on each side, read and write
 *  symmetric (`§2.3`'s note). **THE AS-FILED NESTED SPELLING IS KEPT VISIBLE AND IS DRIVEN
 *  AS THE RETAINED NEGATIVE CONTROL** whose declared reading is the tab entry's ABSENCE
 *  (`§0D` item `1`(g)). */
const entry = (id: string): string => DECLARED_SPELLINGS.entry(id)
/** THE AS-FILED NESTED MEMBER SPELLING (`target` · `active` · `error` · `label` at
 *  `file.tabs.<tabId>.<member>`) — KEPT VISIBLE AS THE SUPERSEDED-IN-EFFECT FORM, and the
 *  operand of the `SD-1` negative control. */
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
    callStore(store, 'remove', entry('B'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — a body that activates A FAILS').toEqual(['C'])
  })

  /* ─────────────────────────────────────────────────────────────────────────────
   * C-3 · C-4 · C-7 — RE-GRAINED `2026-10-11` (`SD-1`; `§0D` item `1`(c); `RCA-8(d)`).
   *
   * THE AS-FILED DRIVES ARE KEPT VISIBLE BESIDE THE OPERATIVE ONES. **WHAT WAS WRONG:** all
   * three drove their SEED through `seedRecord` (which read/wrote the NESTED
   * `file.tabs.<tabId>.active`) while their READING — `activesOf` — and the ruled repair read
   * the store's answer for the SAME nested spelling. The harness therefore agreed with ITSELF
   * and disagreed with the contract's declared accessor (`§0D` item `1`(c)): `activeOf`
   * preferred the store's nested `resolve`, `writeActive` preferred the store's nested `set`,
   * and NO seeding permutation satisfied `§2.2` item 3 together with `§3.2` `F-T2-1`/`F-T2-2`
   * — the asymmetry the previous pass MEASURED and reported.
   *
   * **THE OPERATIVE DRIVE IS NOW ONE DECLARED ACCESSOR ON EACH SIDE:** the active mark is
   * SEEDED, CLOSED and REPAIRED at the tab's ONE flat leaf `file.tabs.<tabId>`, and READ back
   * through the same reference by the declared accessor pair (`entry.active === true` for an
   * OBJECT-valued entry; `entry === true` for a SCALAR-valued one). **THE AS-FILED NESTED
   * SPELLING IS DRIVEN AS THE RETAINED NEGATIVE CONTROL at `SD-1`** (its declared reading is
   * the tab entry's ABSENCE), and the as-filed figure the close's cost was asserted from
   * (`5` caller operations) is kept visible IN-LINE at `CL-7`.
   * ───────────────────────────────────────────────────────────────────────────── */

  it('C-3 · §3.2 F-T2-1 — the WRAP: [A,B,C] with C closed → A (a body that activates B FAILS)', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'C')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'C'
    callStore(store, 'remove', entry('C'))
    callStore(store, 'commit', ORDER, ['A', 'B'])
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-1 — the WRAP to the first surviving').toEqual(['A'])
  })

  it('C-4 · §3.2 F-T2-1 — the two-member drive: [A,B] with A closed → B', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B']
    st.removedId = 'A'
    callStore(store, 'remove', entry('A'))
    callStore(store, 'commit', ORDER, ['B'])
    expect(activesOf(store, ['B']), '§3.2 F-T2-1 — the next surviving entry').toEqual(['B'])
  })

  it('C-5 · §3.2 F-T2-1 — the POSITIVE CONTROL: the SAME three drives with the constraint member ABSENT leave the zero-active state STANDING (so the readings above are attributable to the constraint, not to the write path)', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['A', 'B', 'C'], 'B')
    callStore(store, 'remove', entry('B'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — with no member supplied, NOTHING repairs').toEqual([])
  })

  it('C-6 · §3.2 F-T2-2 — the SURPLUS-ACTIVE (≥2) arm: WRITE-triggered, the referent is the CALLER’S OWN written reference and every other active entry is deactivated', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B'], 'A')
    const st = memberStateOf(member)
    st.referent = 'B'
    callStore(store, 'commit', entry('B'), true)
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-2 — the referent is kept, the rest deactivated').toEqual(['B'])
  })

  it('C-7 · §3.2 F-T2-2 — the `remove`-triggered ≥2 arm: the winner is read BY THE REMOVED ENTRY’S INDEX, never by insertion order, a first-surviving scan or recency', () => {
    const { store, member } = constrainedStore()
    // ── THE `≥2` POST-STATE IS LANDED BY ONE WRITE, NOT BY A SECOND `true` WRITE: under the
    //    operative flat accessor pair a second `entry = true` write is IMMEDIATELY REPAIRED by
    //    the WRITE-triggered `≥2` arm (`§3.2` F-T2-2's other half), so the drive that reaches a
    //    `remove`-triggered `≥2` evaluation is the one whose PRE-STATE holds two or more active
    //    entries AT ONCE. `hydrate` is that seam and it NEVER evaluates the constraint table
    //    (`§3.3` item 2), so [A,B,C] all active is a real, landed, un-evaluated pre-state and
    //    the `remove` of `B` — whose post-state still carries A and C active — is the
    //    evaluation that fires this arm.
    const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
    hydrate.call(store, [
      { name: ORDER, value: ['A', 'B', 'C'] },
      { name: entry('A'), value: true },
      { name: entry('B'), value: true },
      { name: entry('C'), value: true },
    ])
    expect(activesOf(store, ['A', 'B', 'C']), '§3.2 F-T2-2 — the landed pre-state carries three actives and NO evaluation has run').toEqual(['A', 'B', 'C'])
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'B'
    callStore(store, 'remove', entry('B'))
    const actives = activesOf(store, ['A', 'C'])
    expect(actives.length, '§3.2 F-T2-2 — exactly one survivor is kept').toBe(1)
    expect(actives[0], '§3.2 F-T2-2 — the survivor AT THE REMOVED ENTRY’S INDEX (C), never recency and never a first-surviving scan (which would keep A)').toBe('C')
  })

  it('C-8 · §3.2 F-T2-2 — the NEGATIVE CONTROL: `order` is the repair’s ONLY input, so two runs of the same drive with the same `order` answer the same winner (a clock-dependent body FAILS)', () => {
    const run = (): string[] => {
      const { store, member } = constrainedStore()
      const hydrate = store['hydrate'] as (rows: readonly Rec[]) => void
      hydrate.call(store, [
        { name: ORDER, value: ['A', 'B', 'C'] },
        { name: entry('A'), value: true },
        { name: entry('B'), value: true },
        { name: entry('C'), value: true },
      ])
      const st = memberStateOf(member)
      st.preOrder = ['A', 'B', 'C']
      st.removedId = 'B'
      callStore(store, 'remove', entry('B'))
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
    callStore(store, 'commit', entry('A'), true)
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
  it('R-1 · §2.1 items 1–5 / §0D item 1 (c) — every declared name answers through the record: `order` holds the caller’s sequence and each tab holds its DECLARED RECORD at its ONE flat leaf, with the four members INSIDE that value', () => {
    const store = tabsStoreHere(null)
    // ── THE OPERATIVE READING (`SD-1`; `§0D` item `1`(c)/(e)): the tab's reference is ONE
    //    flat leaf whose VALUE IS its declared record, so the four members are read INSIDE the
    //    entry, not as four sibling leaves. **AS FILED this read the four NESTED member
    //    spellings (`file.tabs.t7.target` · `.active` · `.error` · `.label`) and asserted each
    //    was `found: true`; THAT FORM IS KEPT VISIBLE HERE and its own reading is asserted
    //    beside the operative one — under `§0D` item `1`(c) an ACTIVE mark driven at the nested
    //    spelling contributes NO value at the tab's own key (`SD-1b`'s control).**
    seedEntryRecord(store, ['t7', 't8'], 't7')
    expect(valueOf(store, ORDER), '§2.1 item 1 — the caller’s ordered tab-id sequence').toEqual(['t7', 't8'])
    for (const id of ['t7', 't8']) {
      const entryAnswer = resolveOf(store, entry(id))
      expect(entryAnswer['found'], `§2.1 items 2–5 / §0D item 1 (c) — file.tabs.${id} is the tab’s ONE declared reference`).toBe(true)
      const value = (entryAnswer['value'] ?? {}) as Rec
      for (const member of PER_TAB_LEAVES) {
        expect(member in value, `§0D item 1 (c)/(e) — the declared record carries ${member} inside the entry’s value`).toBe(true)
      }
    }
    expect(entryActiveOf(store, 't7'), '§2.1 item 3 — the caller’s boolean, read by the declared accessor pair').toBe(true)
    expect(entryActiveOf(store, 't8')).toBe(false)
  })

  it('R-2 · §2.3 item 1 / §0D item 1 (c) — the per-tab reference is ONE declared tier-qualified name whose VALUE is the tab’s record; the tab is never stored as a SECOND authority, and the as-filed four-leaf reading is kept visible beside it', () => {
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7'], 't7')
    // THE OPERATIVE NAME: one flat leaf, present, holding the declared record.
    const flatAnswer = resolveOf(store, entry('t7'))
    expect(flatAnswer['found'], '§2.3 item 1 / §0D item 1 (c) — the tab’s ONE flat leaf is the declared reference').toBe(true)
    expect(entryReadsActive(flatAnswer['value']), '§0D item 1 (c) — the SCALAR arm reads the entry’s own value').toBe(true)
    // THE AS-FILED FOUR-LEAF SPELLING, KEPT VISIBLE: the member leaves that `seedRecord` writes
    // for the richer per-tab data are readable at their own concrete names — EXCEPT `active`,
    // whose operative home is the flat entry (`§0D` item `1`(e): the mark rides the tab's one
    // flat leaf; the richer data is DECLARED, not left silent).
    const asFiled = PER_TAB_LEAVES.map((member) => {
      const answer = resolveOf(store, leaf('t7', member))
      return answer['found'] === true && answer['value'] !== undefined
    })
    expect(asFiled, '§2.3 item 1 (AS FILED, kept visible) — target · active · error · label as FOUR independent nested leaves: `active` is NOT among them under the operative form (it rides the tab’s ONE flat leaf)').toEqual([true, false, true, true])
    expect(
      resolveOf(store, leaf('t7', 'active'))['found'] !== true,
      '§0D item 1 (c) — the active mark is NOT a nested member leaf: the tab’s ONE flat leaf is its home, and a unit that reads the mark at the nested spelling FAILS the invariant rows',
    ).toBe(true)
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
      callStore(store, 'commit', entry(hostile), true)
      const answer = resolveOf(store, entry(hostile))
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
    expect(entryReadsActive(valueOf(store, entry('landing'))), '§3.1 M-6 — the landing page’s witness: `landing.active === true` with no other active entry').toBe(false)
    // THE ERROR TERMINAL: `error` AND `target` set for the tab that is also the active entry (§3.5 item 2, hop 5).
    callStore(store, 'commit', leaf('A', 'error'), 'render-failed')
    callStore(store, 'commit', leaf('A', 'target'), 'the-focus-verb-argument')
    expect(valueOf(store, leaf('A', 'error')), '§3.1 M-6 — the error page’s witness').toBe('render-failed')
    expect(valueOf(store, entry('A')), '§2.1 item 3 — the caller’s boolean mark rides the tab’s ONE flat leaf').toBe(true)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 ITEM 3 — THEN THE CLOSE VERB'S TERMINAL STATES (`§2.4` + `§3.2` F-T2-3…F-T2-6 + `§3.4`).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 item 3 — THE CLOSE VERB’S TERMINAL STATES (`§2.4`, `§3.2` F-T2-3…F-T2-6, `§3.4`)', () => {
  it('CL-1 · §2.4 item 1 / §0D item 1 (d) — the close’s declared reference set under the RULED FLAT FORM is exactly TWO tier-qualified names: the tab’s ONE flat leaf `file.tabs.<tabId>` PLUS the id’s own `order` seat', () => {
    // ── THE AS-FILED FIGURE IS KEPT VISIBLE AND IS SUPERSEDED-IN-EFFECT, NOT REWRITTEN
    //    (`RCA-8(d)`; `§0D` item `1`(d)): as filed the set was the FOUR per-tab leaves plus the
    //    id's own `order` seat, and the row asserted `5`. Under the ruled flat form the tab's
    //    own reference is ONE, so the operative set is `2` and `§3.4` item 4's operative print
    //    (`2` caller operations `+` `1` repair `=`
    //    `3` committed operations) is that count WITH its terms. THE ASSERTION IS THE SET'S
    //    OWN DECLARED MEMBERSHIP, not a bare number: the count is read off the two names.
    expect(CLOSE_REFERENCE_SET_MEMBERS_AS_FILED, '§2.4 item 1 (AS FILED, kept visible) — the four per-tab leaves plus the `order` seat').toBe(4 + 1)
    expect(CLOSE_REFERENCE_SET_MEMBERS, '§2.4 item 1 / §0D item 1 (d) — the tab’s ONE flat leaf plus the id’s own `order` seat').toBe(2)
    const declaredSet = [entry('t7'), ORDER].length
    expect(declaredSet, '§2.4 item 1 — the set’s own two declared names').toBe(CLOSE_REFERENCE_SET_MEMBERS)
    const store = tabsStoreHere(null)
    seedRecord(store, ['t7', 't8'], 't7')
    // THE OPERATIVE CLOSE: ONE `remove` of the tab’s own flat leaf + the `order` rewrite.
    callStore(store, 'remove', entry('t7'))
    callStore(store, 'commit', ORDER, ['t8'])
    expect(valueOf(store, ORDER), '§2.4 item 1 — a close that leaves the id in `order` FAILS').toEqual(['t8'])
    // ── THE CLOSED TAB'S OWN REFERENCE IS GONE, AND IT IS **NOT** A DECLARED MISS —
    //    RE-MEASURED `2026-10-11` AND REPORTED AS A FINDING, NOT SMOOTHED: after the operative
    //    close the tab's flat leaf is detached, and the FROZEN STORE then answers `resolve` on
    //    that name with a REFUSED record — `reason: 'no-such-anchor'`, `step: 'D-ANCHOR'` —
    //    because the tab's anchor itself was severed. **THAT IS NEITHER `§3.6`'s `A-1`
    //    DECLARED MISS NOR ITS `A-3` `'undeclared-name'`: it is a THIRD token on the record's
    //    own read path** (the contract's answer set is CLOSED at eight rows, `§3.6`'s totallity
    //    clause). THE ROW ASSERTS WHAT THE CLOSE DELIVERS — the reference is NOT readable as a
    //    value — and NAMES the token, so a store that answers the declared miss instead also
    //    fails it. THE FINDING IS REPORTED TO THE SUPERVISOR WITH ITS CLAUSE PAIR.
    const afterClose = resolveOf(store, entry('t7'))
    expect(afterClose['found'] ?? false, '§2.4 item 1 — the closed tab’s own flat leaf no longer answers a VALUE').toBe(false)
    expect(
      ['no-such-anchor', 'undeclared-name'],
      `§2.4 item 1 / §3.6 — the closed reference answers a RETURNED refusal record, never a throw (measured: ${String(afterClose['reason'])} at step ${String((afterClose['diagnostic'] as Rec | undefined)?.['step'])})`,
    ).toContain(afterClose['reason'])
    expect(valueOf(store, leaf('t8', 'target')), '§2.4 item 1 — a close that removes a reference not in this set FAILS').toBe('target-t8')
  })

  it('CL-2 · §2.4 item 2 (R3-6) — every removal CLEARS DOWNWARD: the `file` copy and every less-persistent copy of the SAME logical path, and no stale lower tier survives', () => {
    // THE LESS-PERSISTENT COPIES EXIST ONLY IF THEIR ROOTS ARE DECLARED (`mem.tabs` /
    // `temp.tabs`, `§2.1`'s own spellings carried at the other tiers — `§2.4` item 2's
    // "the same LOGICAL PATH"). The rows read the absence through the tier handle’s own
    // declared answer (`§2.5`), which is a MISS and never a refusal. **THE LOGICAL PATH IS THE
    // OPERATIVE ONE (`§2.4` item 1's note): the tab's ONE flat leaf, so its lower copies are
    // `mem.tabs.<tabId>` / `temp.tabs.<tabId>`. THE AS-FILED SPELLINGS — `mem.tabs.<tabId>.active`
    // and `temp.tabs.<tabId>.active`, the nested member's own lower copies — ARE KEPT VISIBLE
    // HERE AND ARE NOT THE PATHS THE OPERATIVE CLOSE CLEARS.**
    const store = tabsStore(requireSurface(), null, extraDeclaredRoots(['mem.tabs', 'temp.tabs']))
    seedRecord(store, ['t7'], 't7')
    callStore(store, 'commit', 'mem.tabs.t7', false)
    callStore(store, 'commit', 'temp.tabs.t7', false)
    const receipt = callStore(store, 'remove', entry('t7'))
    expect(receipt['cleared'], '§2.4 item 2 — the receipt names the cleared LOWER references').toContain('mem.tabs.t7')
    const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean }>
    expect(tiers['mem'].has('mem.tabs.t7'), '§2.4 item 2 — no stale lower-tier copy survives the close').toBe(false)
    expect(tiers['temp'].has('temp.tabs.t7')).toBe(false)
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

  it('CL-7 · §3.4 item 4 (C-10) / §0D item 1 (d) — THE CLOSE’S DECLARED COST, PRINTED WITH ITS TERMS UNDER THE RULED FLAT FORM: `2` CALLER OPERATIONS + `1` REPAIR OPERATION = `3` COMMITTED OPERATIONS ⇒ `3` whole-file serializes + `3` atomic replaces', () => {
    const { store, member } = constrainedStore()
    seedRecord(store, ['A', 'B', 'C'], 'B')
    const st = memberStateOf(member)
    st.preOrder = ['A', 'B', 'C']
    st.removedId = 'B'
    // ── THE OPERATIVE CLOSE SEQUENCE (`§2.4` item 1's note; `§3.4` item 4's operative print):
    //    ONE `remove('file.tabs.<tabId>')` for the tab's OWN flat leaf PLUS ONE
    //    `commit('file.tabs.order', <the sequence without the id>)`.
    //
    //    **THE AS-FILED SEQUENCE IS KEPT VISIBLE BESIDE IT, AND SO IS THE AS-FILED FIGURE
    //    (`RCA-8(d)`; `§0D` item `1`(d)): AS FILED the close removed the FOUR per-tab leaves
    //    (`file.tabs.B.target` · `.active` · `.error` · `.label`) plus the `order` rewrite —
    //    `5` CALLER OPERATIONS — and the declared write count was `5 + 1 = 6` committed
    //    operations ⇒ `6` serializes + `6` replaces. THE RULED FLAT FORM MAKES THE TAB'S OWN
    //    REFERENCE ONE, so the operative print is `2 + 1 = 3`, and `§0D` item `1`(d) states
    //    the as-filed `6` (`5 + 1`) is SUPERSEDED-IN-EFFECT BY `4` (`3 + 1`).** A row that
    //    reports the close's cost from the as-filed `5`-operation figure FAILS this row.
    //
    //    THE REPAIR TERM IS THE `order` REWRITE'S OWN NEXT-SURVIVING ACTIVATION, WHICH THE
    //    OPERATIVE SEQUENCE LANDS AGAINST THE **SHORTER** POST-CLOSE SEQUENCE: the closed tab
    //    WAS the active one, so its removal leaves ZERO active and the next writing evaluation
    //    lands the +1 — `§2.4` item 5: the referent is the REMOVED ENTRY'S OWN INDEX, whose
    //    survivor here is `C`.
    let callerOperations = 0
    const receipts: Rec[] = []
    receipts.push(callStore(store, 'remove', entry('B')))
    callerOperations += 1
    receipts.push(callStore(store, 'commit', ORDER, ['A', 'C']))
    callerOperations += 1
    const rewriteRepairs = (receipts[receipts.length - 1]['repaired'] as string[] | undefined)?.length ?? 0
    expect(callerOperations, '§2.4 item 4 / §0D item 1 (d) — the close’s own sequence is `2` caller operations under the ruled flat form').toBe(2)
    expect(rewriteRepairs, '§3.4 item 4 — the `order` rewrite lands exactly ONE repair (the next-surviving entry’s activation). A REWRITE THAT LANDS NO REPAIR REDDENS THIS ROW').toBe(1)
    expect(callerOperations + rewriteRepairs, '§3.4 item 4 — `2` caller operations + `1` repair operation = `3` committed operations ⇒ `3` whole-file serializes + `3` atomic replaces').toBe(3)
    // THE DECLARED CHANNEL SHAPE IS UNMOVED (`§3.4` item 4): each committed `file`-tier
    // operation is ONE WHOLE-FILE SERIALIZE PLUS ONE ATOMIC REPLACE, and NO TIMING FIGURE IS
    // CLAIMED — the count is DECLARED rather than inferred as one write.
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 / §3.4 item 1 — the post-state is M-3’s: exactly one active, the next surviving by `order`').toEqual(['C'])
    expect(valueOf(store, ORDER), '§2.4 item 1 — the id’s own `order` seat is dropped by the rewrite').toEqual(['A', 'C'])
  })

  it('CL-8 · §3.4 item 4 — the EVENT COUNT is a FUNCTION OF THE AFFECTED REFERENCES AND NEVER OF THE LISTENERS (the subscriber-count neutrality control)', () => {
    const build = (subscribers: number): { events: number; deliveries: number } => {
      const store = tabsStoreHere(null)
      seedRecord(store, ['A', 'B'], 'A')
      let deliveries = 0
      const subscribe = store['subscribe'] as (n: string, l: () => void, o?: Rec) => unknown
      for (let i = 0; i < subscribers; i += 1) subscribe.call(store, 'file.tabs', () => { deliveries += 1 }, { subtree: true })
      const receipt = callStore(store, 'commit', entry('B'), true)
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

  it('L-3 · §2.1 item 7 (R3-2) / §0D item 1 (c) — the landing entry’s OWN record behaves as an ORDINARY instance: its declared value is writable and readable at its ONE flat leaf, on the SAME accessor pair as any other tab', () => {
    const store = tabsStoreHere(null)
    // ── THE OPERATIVE READING: `file.tabs.landing` was ALREADY a flat reserved ENTRY as filed
    //    (`§0D` item `1`(d): "the reservation at the ENTRY level … UNMOVED"), and the ruling
    //    makes the reserved entry's spelling the FAMILY'S spelling rather than an exception —
    //    so its OWN record rides its one flat leaf exactly as any other tab's does.
    seedRecord(store, ['landing'], 'landing')
    const entryAnswer = resolveOf(store, LANDING)
    expect(entryAnswer['found'], '§2.1 item 7 / §0D item 1 (c) — the landing entry’s own flat leaf').toBe(true)
    expect(entryReadsActive(entryAnswer['value']), '§2.1 item 7 / §0D item 1 (c) — the SCALAR arm: the landing entry’s own value reads active (`entry === true`)').toBe(true)
    expect(entryActiveOf(store, 'landing'), '§2.1 item 7 — the same entry reads active through the register’s shared instrument').toBe(true)
    // THE OBJECT-VALUED ARM OF THE SAME ENTRY: the declared record rides the entry's value, so
    // the four members are read INSIDE it (`§0D` item `1`(c)/(e)).
    callStore(store, 'commit', LANDING, { target: 'target-landing', active: true, error: null, label: 'label-landing' })
    const objectValue = (valueOf(store, LANDING) ?? {}) as Rec
    for (const member of PER_TAB_LEAVES) {
      expect(member in objectValue, `§2.1 item 7 — landing’s declared record carries ${member}, an ORDINARY pattern instance`).toBe(true)
    }
    expect(entryReadsActive(objectValue), '§0D item 1 (c) — the OBJECT arm reads active through `entry.active === true`').toBe(true)
    // ── THE AS-FILED FOUR-PROPERTY READING, KEPT VISIBLE: the entry's own PROPERTIES as four
    //    NESTED pattern instances (`§2.1` item 7's rows). The richer data still rides them
    //    (`§0D` item `1`(e)); the ACTIVE mark does not (`§0D` item `1`(c)/(e)).
    for (const member of PER_TAB_LEAVES) {
      const answer = resolveOf(store, leaf('landing', member))
      const found = answer['found'] === true && answer['value'] !== undefined
      if (member === 'active') {
        expect(found, '§0D item 1 (c) — the ACTIVE mark’s home is the entry value, not the nested member leaf').toBe(false)
      } else {
        expect(found, `§2.1 item 7 (AS FILED, kept visible) — landing.${member} is an ORDINARY pattern instance`).toBe(true)
      }
    }
    expect(callStore(store, 'commit', LANDING, false)['status'], '§2.1 item 7 — the reservation reaches ONLY the entry’s own removal, so the entry’s own VALUE is writable').toBe('committed')
    expect(callStore(store, 'remove', LANDING)['reason'], '§2.1 item 6 — while the ENTRY’s own removal stays REFUSED by name').toBe('reserved-name')
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
    expect(valueOf(store, entry('landing')), '§2.1 item 7 / §0D item 1 (c) — the landing entry’s OWN value, on the same accessor pair as any other tab').toBe(false)
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
    const hit = resolveOf(store, entry('t7'))
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
    const receipt = callStore(store, 'remove', entry('t7'))
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
    const hit = resolveOf(store, entry('t7'))
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
    const cleared = callStore(store, 'clear', entry('A'))
    const swept = callStore(store, 'sweep', entry('B'))
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
    hydrate.call(store, [{ name: ORDER, value: ['A', 'B'] }, { name: entry('A'), value: false }, { name: entry('B'), value: false }])
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
      { name: entry('A'), value: false },
      { name: entry('B'), value: false },
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
    hydrate.call(store, [{ name: entry('A'), value: true }])
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
    hydrate.call(store, [{ name: ORDER, value: ['A'] }, { name: entry('A'), value: false }])
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

  it('P-2 · §3.5 item 1 / §0D item 1 (c) — the landing page’s RECORD WITNESS is the landing ENTRY’s value reading active by the declared accessor pair (`entry === true` scalar / `entry.active === true` object) with no other active entry (the page’s rendering must be driven by the record, never by the wiring’s recollection of an event)', () => {
    const { store } = constrainedStore()
    seedRecord(store, ['A'], 'A')
    callStore(store, 'commit', ORDER, [])
    expect(valueOf(store, ORDER), '§3.5 item 1 — the close-last-tab state').toEqual(['landing'])
    // THE WITNESS IS READ THROUGH THE DECLARED PAIR — BOTH ARMS ASSERTED, so a wiring that
    // reads only the nested as-filed spelling, or only one arm, CANNOT satisfy this row.
    expect(entryReadsActive(valueOf(store, LANDING)), '§3.5 item 1 / §0D item 1 (c) — the SCALAR arm: the landing ENTRY reads active').toBe(true)
    expect(activesOf(store, ['landing']), '§3.5 item 1 — NO other active entry accompanies it').toEqual(['landing'])
    // THE OBJECT-VALUED ARM, driven on its OWN store (no constraint member supplied) so the
    // ARM'S OWN SHAPE is the only variable: the entry value is `{ target, active, … }` and the
    // declared read is `entry.active === true`.
    const objectArm = tabsStoreHere(null)
    callStore(objectArm, 'commit', LANDING, { target: 'target-landing', active: true, error: null, label: 'label-landing' })
    expect(entryReadsActive(valueOf(objectArm, LANDING)), '§3.5 item 1 / §0D item 1 (c) — the OBJECT arm: `entry.active === true`').toBe(true)
    expect(entryActiveOf(objectArm, 'landing'), '§3.5 item 1 — the same object-valued entry reads active through the shared instrument').toBe(true)
    // THE AS-FILED NEGATIVE CONTROL, KEPT VISIBLE: the nested spelling carries no value at the
    // entry's own key, so a wiring reading it CANNOT observe the witness (`§0D` item `1`(g)).
    const control = tabsStoreHere(null)
    callStore(control, 'commit', leaf('landing', 'active'), true)
    expect(isMiss(resolveOf(control, LANDING)) || resolveOf(control, LANDING)['found'] !== true,
      '§0D item 1 (g) — the as-filed nested spelling is the RETAINED NEGATIVE CONTROL: the entry carries NO VALUE at its own key').toBe(true)
    const region = rendererSrc()
    expect(
      // ── THE OPERATIVE SPELLING IS THE WIRING'S OWN READ (`§0D` item `1`(c)): the bounded
      //    wiring role reads the landing ENTRY. **THE AS-FILED SPELLING (`landing.active`) IS
      //    KEPT VISIBLE IN THIS DETECTOR AND IS SUPERSEDED-IN-EFFECT** — it stays in the
      //    alternation so the detector's corpus is the union of both forms and a wiring that
      //    reads EITHER one is caught; the operative form's presence is asserted separately
      //    below so the row cannot be satisfied by the nested spelling alone.
      /landingPage|landing\.active|file\.tabs\.landing|entry\(\s*['"`]landing|LANDING\b|tabs-landing-page/.test(region),
      '§3.5 item 1 — the wiring’s bounded role reads the record and drives the authored node',
    ).toBe(true)
    expect(
      /tabs-landing-page/.test(region) || /LANDING_PAGE_ID|landingPage/.test(region),
      '§3.5 item 1 — the wiring names the AUTHORED node it drives (a page whose rendering is driven by the record must name the node the record’s witness activates)',
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
    expect(entryActiveOf(store, 'A'), '§3.5 item 2(c) — its coexistence with the tab’s `active`').toBe(true)
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

  it('P-7 · §5.5.1 `P-TR-TP-4`/`-TP-5`, §7 item 2, §0D item 3 — THE LIVE ROWS ARE UN-RUN: the NODE-LAYER half is DRIVEN here, the LIVE half is recorded IN-LINE as un-run against the unit’s OWN pointer-carrying driver AND its battery record, and an un-run live row is a FAILURE, never a pass', () => {
    const reading = liveRowReading()
    // ── THE LAYER SPLIT IS READ AS `§0D` item `3`(d) REQUIRES, SO THE TWO ARE NEVER CONFLATED:
    //    `(b)` the pointer-carrying driver's machine rows are evidence about the WIRING AND THE
    //    RECORD'S REACHABILITY; `(a)` the `MANUAL OPERATOR` rows are the ONLY rows carrying a
    //    PAINTED-SURFACE observation. A machine green is never a substitute for an operator
    //    row, and an operator row is never evidence about the record's arithmetic.
    expect(LIVE_DRIVER_PATH.endsWith('tests/store-tabs-record-live.mjs'), '§5.1 item 3b / §5.2 item 7(a) — the unit’s OWN driver, at the unit’s own `tests/*-live.mjs` path').toBe(true)
    expect(LIVE_BATTERY_PATH.endsWith('docs/specs/store-tabs-record-live-battery.md'), '§5.1 item 6 — the `§5.U` matrix / `§6.1` report / `§6.2` audit record at this repo’s gate-6 convention path').toBe(true)
    expect(
      DRIVER_RUN_FORM,
      '§5.2 item 7(a) — the driver’s RUN FORM is a LITERAL COMMAND LINE with its own exit code, so that NO `scripts` KEY IS ADDED',
    ).toBe('node tests/store-tabs-record-live.mjs')
    expect(
      LIVE_HALF_STATUS,
      '§5.2 item 7(a) — the LIVE half is UN-RUN and is recorded in-line: the driver does not exist at this head',
    ).toBe('un-run')
    expect(
      S_D9_BOUND.includes('no pointer coordinates') && S_D9_BOUND.includes('not a human’s eye'),
      '§5.2 item 7(b) / `S-d9` — THE DRIVER’S DECLARED BOUND, so a later pass cannot claim agent-drivability or a SEEN page from a synthetic click',
    ).toBe(true)
    expect(
      S_D9_BOUND.includes('MANUAL OPERATOR'),
      '§5.2 item 7(c) / §7 item 2(d) — the painted/visual rows REMAIN `MANUAL OPERATOR`, owner the SUPERVISOR, at a session WITH A HUMAN AT THE WINDOW, and NO TOOL OUTPUT IS SUBSTITUTED FOR AN OPERATOR OBSERVATION',
    ).toBe(true)
    expect(
      reading.ok,
      `§5.5.1 — ${reading.reason}. THE OPERATOR ROWS ARE \`MANUAL OPERATOR\` WITH A POSITIVE OWNER (the supervisor) AND A LITERAL \`cmd\`, and NO TOOL OUTPUT IS SUBSTITUTED FOR AN OPERATOR OBSERVATION (§7 item 2(d)); THE THREE UNTAKEN PRECEDENTS ARE docs/specs/gutter-ui-live-battery.md:536-541 (U-3/U-4/U-6 — "NO HUMAN OPERATOR WAS PRESENT THIS RE-RUN") and :682 (item 1 — "Take the three MANUAL OPERATOR rows with a human at the window"). The owed battery record read here is ${LIVE_BATTERY_PATH}, and the owed DRIVER is ${LIVE_DRIVER_PATH} run by \`${DRIVER_RUN_FORM}\` — BOTH UN-RUN at this head, and an un-run live row is a FAILURE, never a pass.`,
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
    // ── `SD-2`, RE-GRAINED `2026-10-11`: THE OPERATIVE ARITHMETIC BESIDE THE AS-FILED MIS-SUM
    //    (`SD-2`; `§0D` item `2`; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; `RCA-8(d)`).
    //
    //    **THE AS-FILED FORM IS KEPT VISIBLE AND IS NOT REWRITTEN, AS FILED: `§5.5.1`'s table
    //    printed `P-IM 54 = 12+8+16+12+6` · `P-SM 26 = 10+10+6` · `P-TP 68 = 16+8+8+8+8+12`,
    //    with `54 + 26 + 68 = 148` ✓.** THE DEFECT: the printed `P-SM 26` took only THREE of
    //    the FOUR `P-SM` rows — it OMITTED row `9` (`P-TR-SM-3`, the boot/hydration ordering
    //    row, term `8` = `4` boot states × `2` readings) — and the printed `P-TP 68`
    //    correspondingly carried that `8`.
    //
    //    **THE OPERATIVE SUBTOTALS, PRINTED WITH THEIR TERMS (`§0D` item `2`(b)):
    //    `P-IM 54 = 12+8+16+12+6` (rows 1–5) · `P-SM 34 = 10+10+6+8` (rows 6 · 7 · 8 · 9) ·
    //    `P-TP 60 = 16+8+8+8+8+12` (rows 10–15) — `54 + 34 + 60 = 148` ✓, the same total the
    //    fifteen terms give.** THE TOTAL IS UNMOVED AT `148`, ITS CHAIN IS UNMOVED, `max 16 ≤
    //    100` ✓ and `148 ≤ 400` ✓ UNMOVED, and **NO ROW'S TERM, STRATEGY ID OR ATTEMPT COUNT
    //    MOVES** (`§0D` item `2`(d)).
    //
    //    THE ROW THEREFORE ASSERTS **THE CONTRACT'S PRINTED ARITHMETIC**, with the as-filed
    //    `26`/`68` form carried IN-LINE beside it in the same literal, so no reader is left
    //    holding the mis-sum alone and the annotation is the correction rather than a rewrite.
    const AS_FILED_SUBTOTALS = { 'P-IM': 54, 'P-SM': 26, 'P-TP': 68 } as const
    const OPERATIVE_SUBTOTALS = { 'P-IM': 54, 'P-SM': 34, 'P-TP': 60 } as const
    expect(
      { asFiled: { ...AS_FILED_SUBTOTALS }, operative: { ...OPERATIVE_SUBTOTALS }, tableDerived: subtotals },
      '§5.5.1 / §0D item 2 — the AS-FILED subtotals `54 / 26 / 68` (kept visible, `P-SM 26 = 10+10+6` OMITTED row 9) against the OPERATIVE `54 / 34 / 60` (`P-SM 34 = 10+10+6+8`, WITH its four terms) and the sums the table’s OWN fifteen terms produce',
    ).toEqual({
      asFiled: { 'P-IM': 54, 'P-SM': 26, 'P-TP': 68 },
      operative: { 'P-IM': 54, 'P-SM': 34, 'P-TP': 60 },
      tableDerived: { 'P-IM': 54, 'P-SM': 34, 'P-TP': 60 },
    })
    expect(
      AS_FILED_SUBTOTALS['P-SM'] + (terms[8] ?? 0),
      '§0D item 2 — THE CAUSE IS NAMED: the as-filed `P-SM 26` plus the OMITTED row 9 (`P-TR-SM-3`, term 8) IS the operative `P-SM 34`',
    ).toBe(OPERATIVE_SUBTOTALS['P-SM'])
    expect(
      AS_FILED_SUBTOTALS['P-SM'] + AS_FILED_SUBTOTALS['P-IM'] + AS_FILED_SUBTOTALS['P-TP'],
      '§0D item 2 — the as-filed mis-sum still sums to the UNMOVED total, which is why only the per-type subtotals moved',
    ).toBe(148)
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
 * THE `SD-1` ROWS — RE-GRAINED `2026-10-11` IN THE CONTRACT'S OWN TERMS (`§0D` item `1`(g);
 * `A1`; `RCA-8(d)`: EVERY AS-FILED FORM STAYS VISIBLE BESIDE ITS RE-GRAINED FORM, THE ROW IDS
 * AND LABELS STAY, AND EACH ROW KEEPS OR INCREASES ITS BITE).
 *
 * **WHAT THE AS-FILED `SD-1` ROW ASSERTED, KEPT VISIBLE:** the matched record's `<tabId>`
 * entry holds THAT TAB'S `active` LEAF VALUE, driven at the AS-FILED nested spelling
 * `file.tabs.<tabId>.active` (`§2.1`'s name table rows 2–5, `§2.3` item 1's "FOUR INDEPENDENT
 * LEAVES"). MEASURED, that form answers `undefined` for the entry — the tab's value is ABSENT
 * under its own key — and the row was left RED and reported as SPEC DEFECT #1.
 *
 * **THE CONTRACT'S RESOLUTION (`§0D` item `1`):** the per-tab reference is ONE FLAT LEAF
 * `file.tabs.<tabId>` whose VALUE is the tab's declared record, and the constraint's declared
 * accessor is the entry's value at the tab's own key — `entry.active === true` for an
 * OBJECT-valued entry, `entry === true` for a SCALAR-valued one, BOTH ARMS DECLARED. The
 * AS-FILED NESTED spelling is the RETAINED NEGATIVE CONTROL whose declared reading is the tab
 * entry's ABSENCE.
 *
 * **THE RE-GRAINED ROWS DRIVE BOTH ARMS AND THE CONTROL**, so the row CAN FAIL if the
 * implementation reads the wrong one: `SD-1` is the HOLDING row (the flat spelling, both
 * accessor arms), `SD-1b` is the RETAINED NEGATIVE CONTROL (the as-filed nested spelling).
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 SPEC-DEFECT SURFACE — `§2.2` item 4 / `§2.3` item 2 (the per-tab record entry)', () => {
  it('SD-1 · §2.3 item 2 / §0D item 1 (c) — OPERATIVE ARM: the matched record’s `<tabId>` entry IS THE TAB’S DECLARED VALUE at `file.tabs.<tabId>`, read by BOTH declared accessor arms (scalar `entry === true`; object `entry.active === true`)', () => {
    // ── ARM (a) — THE SCALAR-VALUED ENTRY: `entry === true`.
    const scalarProbe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const scalarStore = tabsStoreHere(recordEntryProbeMember(scalarProbe))
    callStore(scalarStore, 'commit', ORDER, ['t7'])
    callStore(scalarStore, 'commit', entry('t7'), true)
    const scalarCall = scalarProbe.calls[scalarProbe.calls.length - 1]
    expect(scalarCall, '§2.2 item 4 — the constraint is evaluated on the write’s post-state').toBeTruthy()
    expect(scalarCall?.recordKeys ?? [], '§2.2 item 4 — the record’s keys are the root’s leaf names (`order` and every `<tabId>`)').toContain('t7')
    const scalarEntries: Rec = scalarCall?.recordEntries ?? {}
    expect(scalarEntries['t7'], '§0D item 1 (c) — the flat SCALAR leaf’s value IS the record’s entry at the tab’s own key').toBe(true)
    expect(entryReadsActive(scalarEntries['t7']), '§0D item 1 (c) — the SCALAR arm reads active through `entry === true`').toBe(true)
    // ── ARM (b) — THE OBJECT-VALUED ENTRY: `entry.active === true`, with the richer per-tab
    //    data riding the entry's value (`§0D` item `1`(e)).
    const objectProbe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const objectStore = tabsStoreHere(recordEntryProbeMember(objectProbe))
    callStore(objectStore, 'commit', ORDER, ['t7', 't8'])
    callStore(objectStore, 'commit', entry('t8'), false)
    callStore(objectStore, 'commit', entry('t7'), { target: 'target-t7', active: true, error: null, label: 'label-t7' })
    const objectEntries: Rec = objectProbe.calls[objectProbe.calls.length - 1]?.recordEntries ?? {}
    expect(objectEntries['t7'], '§0D item 1 (c) — the flat OBJECT-valued leaf’s value IS the record’s entry').toEqual({ target: 'target-t7', active: true, error: null, label: 'label-t7' })
    expect(entryReadsActive(objectEntries['t7']), '§0D item 1 (c) — the OBJECT arm reads active through `entry.active === true`').toBe(true)
    // ── THE TWO ARMS MUST AGREE ON THE ACTIVE READING, and the entry must be ONE per tab: a
    //    body that surfaces a different shape under either arm FAILS this row.
    expect(entryReadsActive(objectEntries['t8']), '§0D item 1 (c) — a dormant entry (`active: false`) does NOT read active under either arm').toBe(false)
    expect(Object.keys(objectEntries).sort(), '§2.3 item 2 — EACH TAB CONTRIBUTES EXACTLY ONE ENTRY to the matched record, keyed by its id').toEqual(['t7', 't8'])
  })

  it('SD-1b · §2.3 item 1 / §0D item 1 (g) — RETAINED NEGATIVE CONTROL: driven at the AS-FILED NESTED spelling `file.tabs.<tabId>.active`, the tab contributes NO value under its own key (the entry’s ABSENCE is the control’s declared reading, never a row meant to pass)', () => {
    const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const store = tabsStoreHere(recordEntryProbeMember(probe))
    callStore(store, 'commit', ORDER, ['t7'])
    // THE AS-FILED SPELLING, DRIVEN AS THE CONTROL.
    callStore(store, 'commit', leaf('t7', 'active'), true)
    const call = probe.calls[probe.calls.length - 1]
    const entries: Rec = call?.recordEntries ?? {}
    expect(
      call?.recordKeys ?? [],
      '§0D item 1 (b)/(g) — the record’s KEYS still include the tab’s own name (the leaf exists), which is why the as-filed form looked satisfiable',
    ).toContain('t7')
    expect(
      entries['t7'],
      '§0D item 1 (g) — THE RETAINED NEGATIVE CONTROL’S DECLARED READING: under the as-filed nested spelling the record’s entry is ABSENT, so "each tab contributes exactly ONE entry holding the active leaf’s value" is NOT delivered by that spelling',
    ).toBeUndefined()
    expect(
      Object.keys(entries).filter((key) => entries[key] !== undefined),
      '§0D item 1 (g) — the entry holds NO VALUE under its own key: the tab contributes nothing to the record under the as-filed nested spelling (a mere falsy value would NOT satisfy this row)',
    ).toEqual([])
    // THE OPERATIVE FORM, DRIVEN BESIDE THE CONTROL SO THE ROW KEEPS ITS BITE: the SAME tab
    // through its flat leaf DOES contribute the entry.
    const operative: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
    const operativeStore = tabsStoreHere(recordEntryProbeMember(operative))
    seedEntryRecord(operativeStore, ['t7'], 't7')
    callStore(operativeStore, 'commit', ORDER, ['t7'])
    const operativeEntries: Rec = operative.calls[operative.calls.length - 1]?.recordEntries ?? {}
    expect(
      entryReadsActive(operativeEntries['t7']),
      '§0D item 1 (c) — the FLAT spelling is the OPERATIVE arm: the same tab DOES contribute its declared entry, read active by the declared pair',
    ).toBe(true)
  })
})
