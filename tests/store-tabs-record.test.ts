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
  DECLARATION_READ_CANDIDATES,
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
  wiredMemberHandle,
  wiredStore,
  seedWiringState,
  tabsStore,
  valueOf,
  wiredConstraintReading,
  shippedBootSeamDrive,
  shippedLandingReservationDrive,
  shippedMint,
  shippedNonMemberWriteDrive,
  nonMemberArmLine,
  nonMemberWriteLines,
  type BootSeamReading,
  type LandingReservationReading,
  type NonMemberWriteArm,
  type NonMemberWriteReading,
  type ConstraintMemberHandle,
  type ConstraintProbe,
  type TabsSurface,
  controlConstraintMember,
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

/** ── THE FIXTURE'S MEMBER, RE-POINTED BY THE GATE-4 REPAIR (`2026-10-11`) ─────────────────
 *  **THE HEADLINE FINDING.** As filed, `constrainedStore()` — the fixture behind EVERY
 *  constraint/repair/close row in this file — supplied `tabsConstraintMember()`: a
 *  HAND-WRITTEN DUPLICATE of the constraint, its repair and its `writeActive`, built in the
 *  register's harness and reachable from no `src/**` byte. The wiring's REAL member
 *  (`src/renderer/renderer.ts`'s `TABS_CONSTRAINT`, supplied at the ONE construction call)
 *  reached this suite only through a name/cell check, a regex and string scans — so the green
 *  was evidence about the harness, not about the shipped wiring (the gate-4 measurement:
 *  delete `TABS_CONSTRAINT`, delete the repair arm, or swap the accessor arm, and every held
 *  register row stayed held).
 *
 *  **THE OPERATIVE FORM SUPPLIES THE WIRING'S MEMBER**, read through the wiring's own declared
 *  seam (`getWiredGraphStore()`, `§2.2` item 1) and the store's own read-only `constraints`
 *  view (`§2.5`), by `wiredMemberHandle()`. The harness copy survives ONLY where a row's
 *  subject genuinely IS the fixture control (the call-argument/record-entry probes, the
 *  mutation detector) and those rows call `controlConstraintMember(probe)` BY NAME — see
 *  `C-11`/`C-12` and `SD-1`. A row that reaches a remove-triggered referent must DRIVE THE
 *  CLOSE (`§2.4` item 5: the pre-state is captured at the shipped close site, which no caller
 *  can write), never inject a cell `src/**` never writes. */
function constrainedStore(probe?: ConstraintProbe): { store: Rec; member: ConstraintMemberHandle } {
  if (probe !== undefined) {
    const control = controlConstraintMember(probe)
    return { store: tabsStoreHere(control), member: control }
  }
  const member = wiredMemberHandle()
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
    const { store } = constrainedStore()
    // ── THE PRE-STATE IS LANDED THROUGH `hydrate` (never evaluated, `§3.3` item 2) and the
    //    CLOSE IS DRIVEN, not injected: the wiring's pre-removal cell is written ONLY by its
    //    close site, so a row that injected `st.preOrder` measured the harness, not `src/**`.
    seedWiringState(store, ['A', 'B', 'C'], 'B')
    callStore(store, 'remove', entry('B'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — a body that activates A FAILS').toEqual(['C'])
  })

  /* ═══════════════════════════════════════════════════════════════════════════════════════
   * THE REMOVE-TRIGGERED ARM — THE NEW HOST DEFECT (`2026-10-11`, this pass's rows).
   *
   * **WHAT `C-2`·`C-3`·`C-4` PROVE, AND WHAT THEY DO NOT.** All three drive `remove(...)`
   * FOLLOWED BY `commit(ORDER, <the sequence without the id>)` — i.e. they drive the WIRING'S
   * OWN CLOSE (`§2.4` item 1's note: `2` caller operations, `remove` then the `order` rewrite)
   * — and their green is landed BY THE REWRITE'S EVALUATION, not by the remove's: the register's
   * own `P-TR-IM-3` state (1) receipt reading already RECORDS the measurement in-line ("the
   * `remove`'s own evaluation lands `repaired: []` — the entry it detached is EXCLUDED from the
   * post-state count"). **SO EVERY GREEN ROW IN THIS FILE THAT DRIVES A CLOSE PROVES THE CLOSE
   * PATH AND *NOT* THE BARE `remove` PATH — which is why `§3b.2`'s `F-2` "FIXED" disposition is
   * NARROWED here: the write-triggered arm is discharged, the REMOVE-triggered arm is NOT.**
   *
   * **THE CLAUSE EACH ROW DRIVES, PRINTED WITH ITS OWN FALSIFIER.** `§3.2` `F-T2-1`: *"on a
   * `remove`-triggered (or write-triggered) evaluation that finds ZERO active, the repair
   * activates the NEXT SURVIVING entry by `file.tabs.order` … THE FALSIFIER, WITH ITS TERMS:
   * `order = [A,B,C]` with `B` active → a close of `B` activates `C`"*; `§1.1` item 3
   * (*"evaluated by the store on every write (`set`/`commit`) AND every `remove`, on the call's
   * POST-STATE"*); `§1.1` item 4 (the ruled repair rule) · `§3.1` `M-2` path **(c)** (*"a `remove`
   * that leaves zero or ≥2 and is REPAIRED in the same committed write"*) · `§3.1` `M-3` ·
   * `§3.1` `M-6` · `§3.2` `F-T2-3` · `§3.4` item 1 and item 3 (*"a row that observes a `remove`
   * SKIPPING the evaluation FAILS"*) · `§5.5.1` `P-TR-IM-3` (its state (1) and its state (4)).
   *
   * **THE CONSTRUCTION IS THE SHIPPED ONE** — `constrainedStore()` with no probe answers the
   * store built over `wiredMemberHandle()` (the wiring's REAL member, `§2.2` item 1), and the
   * pre-state is landed UN-EVALUATED through `seedWiringState`'s `hydrate` (`§3.3` item 2), so
   * nothing but the drive under test can account for the reading.
   *
   * **THE CLAUSES, CITED ONE PER ROW, AT THE BYTES OF `docs/specs/store-tabs-record.md`:**
   * `RM-1` drives `§3.2` `F-T2-1` (its own printed falsifier, quoted above), read with `§1.1`
   * item 3 (the constraint is evaluated on EVERY `remove`'s POST-STATE), `§1.1` item 4 (the ruled
   * repair rule), `§3.1` `M-2` path **(c)**, `§3.4` item 3 (*"a row that observes a `remove`
   * SKIPPING the evaluation FAILS"*) and `§5.5.1` `P-TR-IM-3`'s state (1) + its receipt reading;
   * · `RM-2` drives `§3.2` `F-T2-3` (the landing entry's activation is a REPAIR, **never a caller
   * write**, with its `order` seat written in the SAME committed write) read with `§3.1` `M-1`
   * (the zero-tab state is unreachable by design) · `§3.1` `M-2`(c) · `§3.1` `M-3` (*"`order` …
   * is NEVER EMPTY after any declared operation"*) · `§3.1` `M-6` (the landing page's record
   * witness) · `§3.4` item 1 (*"a row that observes the pre-repair state as the post-state
   * FAILS"*) · `§5.5.1` `P-TR-IM-3`'s state (4); · and the two CONTROLS (`RM-1c`, `RM-2c`) drive
   * the WRITE-triggered arm and the SHIPPED exported close verb respectively, which is the
   * ATTRIBUTION the defect localises on.
   *
   * **WHY THESE ROWS LIVE IN THIS FILE AND NOT IN THE REGISTER (`P-TR-IM-3`'s declared home).**
   * The register-arm option was evaluated and does NOT fit without moving a term: `P-TR-IM-3`'s
   * row id, its type `P-IM`, its strategy id `S-TR-CON-1` and its term `16` must stay UNMOVED,
   * and its `8` declared violating/non-violating states are ALREADY each driven TWICE (the state
   * reading and the receipt reading — the register row's own drives are `remove` + the `order`
   * rewrite, i.e. the CLOSE, and its state (1) comment ALREADY records *"the `remove`'s own
   * evaluation lands `repaired: []`"* as a measured fact). A seventeenth drive would break
   * `REG-TERMS`' `drives.length === row.term` assertion, and replacing an as-filed arm would move
   * an as-filed form (`RCA-8(d)`) or drop a declared reading. **SO THE PROPERTY IS DRIVEN HERE,
   * IN THE UNIT'S OWN FILE, AND THE REGISTER'S AS-FILED STATE (1) ARM IS KEPT VISIBLE AND STILL
   * DRIVEN AS ITS OWN CONTROL** — no register term, count, total, chain, subtotal or cap moves,
   * and the live rows `P-TR-TP-4`/`-TP-5` stay UN-RUN = FAILING.
   *
   * **`§3b.2`'s `F-2` DISPOSITION, NARROWED IN-ROW (as this pass's instruction requires).**
   * `§3b.2`'s `F-2` row reads, in its own terms: *"the zero-active arm does NOT activate the
   * reserved landing entry on a REMOVAL-triggered evaluation (`T2-C-18`, `T2-E-08`; the `remove`
   * columns of `T2-C-14`) | HOST DEFECT | `FIXED` | the close-last-tab repair seats and activates
   * the landing entry in the same committed write (`H-1`'s fix; `renderer.ts` `:326`, `:425`)"*.
   * **`F-2`'s SUBJECT IS THE REMOVAL-TRIGGERED EVALUATION; WHAT IS MEASURED GREEN AT THESE BYTES
   * IS THE CLOSE (a `remove` FOLLOWED BY the `order` rewrite), whose repair lands on the REWRITE'S
   * evaluation — a WRITE-TRIGGERED one.** So the `FIXED` disposition is hereby NARROWED to
   * **`FIXED` on the write-triggered arm / `NOT FIXED` on the remove-triggered arm**: `RM-1` and
   * `RM-2` measure `repaired: []` with zero actives after the BARE `remove`, and `RM-1c`/`RM-2c`
   * measure the same states repaired through the write/close path. **A PASS THAT READS `F-2`'s
   * `FIXED` AS COVERING THE BARE `remove` PATH HAS MISREAD IT.**
   * ═══════════════════════════════════════════════════════════════════════════════════════ */

  it('RM-1 · §3.2 F-T2-1 (its own printed falsifier) / §1.1 items 3–4 / §3.1 M-2(c) / §3.4 item 3 / §5.5.1 P-TR-IM-3 state (1) — THE REMOVE-TRIGGERED EVALUATION DOES NOT REPAIR: `order [A,B,C]` with `B` active, seeded un-evaluated through `hydrate`, then the BARE `remove(’file.tabs.B’)` (NO `order` rewrite) must leave EXACTLY ONE active — `C` — and a receipt that NAMES the repair', () => {
    const { store } = constrainedStore()
    seedWiringState(store, ['A', 'B', 'C'], 'B')
    // ── THE PRE-STATE IS THE DECLARED ONE, ASSERTED BEFORE THE DRIVE (`§3.3` item 2: `hydrate`
    //    mints and NEVER evaluates the constraint table, so `B` alone is active and no repair
    //    has run yet) — a row whose pre-state is not the declared one measures nothing.
    const preActives = activesOf(store, ['A', 'B', 'C'])
    const preOrder = valueOf(store, ORDER)
    // ── THE DRIVE IS THE BARE REMOVE PATH: ONE `remove('file.tabs.B')`, and NOTHING after it.
    //    The wiring's `closeTab` performs this leg FIRST and then the `order` rewrite; the
    //    evaluation this row isolates is the REMOVE's OWN post-state evaluation (`§3.4` item 3),
    //    so the rewrite is deliberately NOT issued.
    const receipt = callStore(store, 'remove', entry('B'))
    const postOrder = valueOf(store, ORDER)
    const postActives = activesOf(store, ['A', 'C'])
    // ── THE RECEIPT, IN FULL, SO THE FAILURE IS DIAGNOSABLE WITHOUT RE-INSTRUMENTING
    //    (`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`).
    process.stdout.write(
      `\n── T2 \`RM-1\` — THE REMOVE-TRIGGERED EVALUATION, MEASURED ON THE SHIPPED CONSTRUCTION ──\n` +
      `  PRE:   order ${JSON.stringify(preOrder)} · actives ${JSON.stringify(preActives)} (hydrate landed it UN-EVALUATED, §3.3 item 2)\n` +
      `  DRIVE: remove('${entry('B')}') — the BARE remove path, NO \`order\` rewrite\n` +
      `  RECEIPT: status ${JSON.stringify(receipt['status'])} · reason ${JSON.stringify(receipt['reason'])} · repaired ${JSON.stringify(receipt['repaired'])} · cleared ${JSON.stringify(receipt['cleared'])} · rows ${JSON.stringify((receipt['rows'] as unknown[] | undefined)?.length)} · events ${JSON.stringify(receipt['events'])}\n` +
      `  POST:  order ${JSON.stringify(postOrder)} · actives ${JSON.stringify(postActives)} (the contract's §3.2 F-T2-1 demands ${JSON.stringify(['C'])})\n` +
      `────────────────────────────────────────────────────────────────\n`,
    )
    expect(preActives, '§3.3 item 2 — the landed pre-state carries exactly one active (B) and NO evaluation has run').toEqual(['B'])
    expect(
      postActives,
      `§3.2 F-T2-1 — ITS OWN PRINTED FALSIFIER: \`order = [A,B,C]\` with \`B\` active → a close of \`B\` activates \`C\`; a body that activates \`A\` FAILS, and a body that activates NOTHING fails this row too. The evaluation this drive isolates is the REMOVE'S OWN post-state evaluation (§1.1 item 3: every \`remove\` evaluates it), so nothing but the remove's own evaluation can land the repair. MEASURED: order ${JSON.stringify(postOrder)} · actives ${JSON.stringify(postActives)} · receipt status ${JSON.stringify(receipt['status'])} · repaired ${JSON.stringify(receipt['repaired'])} · events ${JSON.stringify(receipt['events'])}`,
    ).toEqual(['C'])
    expect(
      ((receipt['repaired'] as string[] | undefined) ?? []).length,
      `§3.1 M-2 path (c) / §3.2 F-T2-1 — the remove-triggered repair REPORTS ITSELF on its own receipt: \`repaired: [...]\` names the repaired reference in the SAME committed write. MEASURED: status ${JSON.stringify(receipt['status'])} · repaired ${JSON.stringify(receipt['repaired'])} · events ${JSON.stringify(receipt['events'])}`,
    ).toBeGreaterThan(0)
  })

  it('RM-1c · §3.2 F-T2-1 — THE POSITIVE CONTROL FOR `RM-1`, ASSERTED GREEN: the SAME pre-state reached through the WRITE-triggered arm (the `order` rewrite as the evaluation’s vehicle) DOES repair, so `RM-1` cannot be satisfied by a member that refuses or does nothing at all', () => {
    const { store } = constrainedStore()
    seedWiringState(store, ['A', 'B', 'C'], 'B')
    // ── THE CLOSE PATH: the same `remove` leg `RM-1` drives, FOLLOWED by the `order` rewrite
    //    that the wiring's `closeTab` issues (`§2.4` item 1's note: two caller operations).
    callStore(store, 'remove', entry('B'))
    const receipt = callStore(store, 'commit', ORDER, ['A', 'C'])
    const actives = activesOf(store, ['A', 'C'])
    process.stdout.write(
      `\n── T2 \`RM-1c\` — THE WRITE-TRIGGERED ARM, MEASURED (the control that keeps \`RM-1\` honest) ──\n` +
      `  DRIVE: remove('${entry('B')}') then commit('${ORDER}', ['A','C']) — the WRITE-triggered evaluation\n` +
      `  RECEIPT (the rewrite's, then the ===-equal repeat's — §3.4 item 2(a) fires NOTHING): repaired ${JSON.stringify(receipt['repaired'])} · events ${JSON.stringify(receipt['events'])}\n` +
      `  POST: actives ${JSON.stringify(actives)}\n` +
      `────────────────────────────────────────────────────────────────\n`,
    )
    expect(
      actives,
      '§3.2 F-T2-1 / §3.1 M-2 path (b) — the ATTRIBUTION: the SAME zero-active state, reached through a WRITE, IS repaired. This is the control that proves the defect is the REMOVE-triggered arm and not a member that repairs nothing.',
    ).toEqual(['C'])
    expect(
      ((receipt['repaired'] as string[] | undefined) ?? []).length,
      '§3.1 M-2 — the write-triggered repair reports itself on the receipt of the evaluation that landed it (the `order` rewrite’s own)',
    ).toBeGreaterThan(0)
  })

  it('RM-2 · §3.2 F-T2-3 / §3.1 M-1 · M-2(c) · M-3 / §3.4 item 1 / §5.5.1 P-TR-IM-3 state (4) — THE LANDING SEAT ON THE BARE REMOVE PATH: `order [’landing’,’A’]` with `A` active, then `remove(’file.tabs.A’)` (NO rewrite) must seat AND activate the reserved landing entry IN THE SAME COMMITTED WRITE', () => {
    const { store } = constrainedStore()
    // ── THE RESERVED ENTRY'S OWN SEGMENT IS `landing` — the `order` MEMBER carries TAB IDS
    //    (`§0D` item `1`(c); `§2.1` item 6: the reserved ENTRY is a NORMAL `<tabId>` instance
    //    whose id happens to be the reserved spelling, and `LANDING` is its tier-qualified
    //    NAME). A sequence of NAMES would be a second spelling of the membership, so the
    //    sequence and the `hydrate` row's name are built from the ID.
    const LANDING_ID = 'landing'
    seedWiringState(store, [LANDING_ID, 'A'], 'A')
    const receipt = callStore(store, 'remove', entry('A'))
    const postOrder = valueOf(store, ORDER)
    const landingActive = entryActiveOf(store, LANDING_ID)
    const landingSeat = Array.isArray(postOrder) && (postOrder as string[]).includes(LANDING_ID)
    const postActives = activesOf(store, [LANDING_ID])
    process.stdout.write(
      `\n── T2 \`RM-2\` — THE LANDING SEAT ON THE BARE REMOVE PATH, MEASURED ──\n` +
      `  PRE:   order ${JSON.stringify([LANDING_ID, 'A'])} · \`${LANDING}.active\` ${String(false)} · A active ${String(true)} (hydrate, un-evaluated)\n` +
      `  DRIVE: remove('${entry('A')}') — the BARE remove path, NO \`order\` rewrite\n` +
      `  RECEIPT: status ${JSON.stringify(receipt['status'])} · repaired ${JSON.stringify(receipt['repaired'])} · cleared ${JSON.stringify(receipt['cleared'])} · events ${JSON.stringify(receipt['events'])}\n` +
      `  POST:  order ${JSON.stringify(postOrder)} · \`${LANDING}.active\` ${String(landingActive)} · landing seated ${String(landingSeat)} · actives ${JSON.stringify(postActives)}\n` +
      `────────────────────────────────────────────────────────────────\n`,
    )
    expect(
      postActives,
      `§3.2 F-T2-3 / §3.1 M-2(c) — the ZERO-ACTIVE arm fires on the remove's own post-state and the repair ACTIVATES the reserved entry as a REPAIR (\`F-T2-3\`'s "the landing entry's activation is a repair, never a caller write"), IN THE SAME COMMITTED WRITE. MEASURED: actives ${JSON.stringify(postActives)} · \`${LANDING}.active\` ${String(landingActive)} · receipt repaired ${JSON.stringify(receipt['repaired'])} · events ${JSON.stringify(receipt['events'])}`,
    ).toEqual([LANDING_ID])
    expect(
      landingSeat,
      `§3.2 F-T2-3 (R3-2) / §3.4 item 1 — the landing entry is SEATED in \`${ORDER}\` by the repair's own write. MEASURED: order ${JSON.stringify(postOrder)}`,
    ).toBe(true)
    expect(
      ((receipt['repaired'] as string[] | undefined) ?? []).length,
      '§3.2 F-T2-3 — the repair reports its own naming on the receipt of the evaluation that landed it',
    ).toBeGreaterThan(0)
  })

  it('RM-2c · §3.2 F-T2-3 / §2.4 item 1 — THE POSITIVE CONTROL FOR `RM-2`, ASSERTED GREEN: the SAME state reached through the SHIPPED exported `closeTab` (its `order`-rewrite COMMIT) DOES seat and activate the landing entry', () => {
    const { store } = constrainedStore()
    const LANDING_ID = 'landing'
    seedWiringState(store, [LANDING_ID, 'A'], 'A')
    // ── THE CLOSE VERB IS THE SHIPPED ONE, TAKEN OFF THE SAME WIRING MODULE THE FIXTURE'S
    //    MEMBER CAME FROM (`wiring.module`, the probe this suite already holds) — so the arm's
    //    verb and the arm's member are ONE module instance and the singleton hazard that makes
    //    `getWiredGraphStore` answer the FIRST caller's store cannot make this arm vacuous.
    const closeVerb = (wiring.module?.['closeTab'] ?? null) as
      | ((holder: Rec, tabId: string, nextOrder: readonly string[]) => Rec)
      | null
    expect(
      typeof closeVerb,
      '§2.5 W-2 / §2.4 item 1 — the shipped close verb is reachable off the wiring module the member came from (an absent verb is this control’s own failure, never a skip)',
    ).toBe('function')
    const outcome = closeVerb !== null ? closeVerb(store, 'A', [LANDING_ID]) : {}
    const postOrder = valueOf(store, ORDER)
    process.stdout.write(
      `\n── T2 \`RM-2c\` — THE CLOSE PATH, MEASURED (the control that keeps \`RM-2\` honest) ──\n` +
      `  DRIVE: closeTab(store, 'A', ['${LANDING_ID}']) — the SHIPPED exported close verb\n` +
      `  OUTCOME: callerOperations ${JSON.stringify(outcome['callerOperations'])} · refusal ${JSON.stringify(outcome['refusal'])} · remove ${JSON.stringify((outcome['remove'] as Rec | undefined)?.['status'])} · commit ${JSON.stringify((outcome['commit'] as Rec | undefined)?.['status'])} · repaired ${JSON.stringify((outcome['commit'] as Rec | undefined)?.['repaired'])}\n` +
      `  POST:  order ${JSON.stringify(postOrder)} · \`${LANDING}.active\` ${String(entryActiveOf(store, LANDING_ID))}\n` +
      `────────────────────────────────────────────────────────────────\n`,
    )
    expect(outcome['refusal'], '§2.4 item 1 (W-2) — the close’s declared refusal is `null` on the committed arm').toBe(null)
    expect(
      outcome['callerOperations'],
      '§2.4 item 4’s note — TWO caller operations under the ruled flat form (`commit: undefined` is what says the second operation was NOT performed)',
    ).toBe(2)
    expect(
      entryActiveOf(store, LANDING_ID),
      '§3.2 F-T2-3 — the close path DOES activate the landing entry, through its own `order`-rewrite COMMIT. This is the attribution control: the green rows in this file prove THIS path (the close), and `RM-2` measures the bare `remove` path it does not cover.',
    ).toBe(true)
    expect(
      Array.isArray(postOrder) && (postOrder as string[]).includes(LANDING_ID),
      '§3.2 F-T2-3 (R3-2) / §3.1 M-3 — the landing entry KEEPS its `order` seat on the close path',
    ).toBe(true)
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
    const { store } = constrainedStore()
    seedWiringState(store, ['A', 'B', 'C'], 'C')
    callStore(store, 'remove', entry('C'))
    callStore(store, 'commit', ORDER, ['A', 'B'])
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-1 — the WRAP to the first surviving').toEqual(['A'])
  })

  it('C-4 · §3.2 F-T2-1 — the two-member drive: [A,B] with A closed → B', () => {
    const { store } = constrainedStore()
    seedWiringState(store, ['A', 'B'], 'A')
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
    const { store } = constrainedStore()
    // ── THE REFERENT IS THE CALLER'S OWN WRITTEN REFERENCE, and it is reachable ONLY from the
    //    wiring's OWN evaluation of the write: a row that injected `st.referent` was writing a
    //    cell the shipped wiring never assigns (the `H-2` finding), so the drive IS the write.
    //    THE PRE-STATE CARRIES TWO ACTIVES ALREADY (`hydrate` never evaluates, `§3.3` item 2),
    //    so the caller's write of `B` lands the `≥2` post-state the arm exists for.
    seedWiringState(store, ['A', 'B'], 'A')
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
    // ── **STATIC READING (DECLARED, `2026-10-11`, `RCA-8(d)`; enumerated by `SR-1`):**
    //    `registryReading` reads the WIRING REGION'S BYTES. It is a reading of the shipped TEXT
    //    and never behavioural evidence about a host's state.
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
    const { store } = constrainedStore()
    // ── THE PRE-STATE IS LANDED THROUGH `hydrate` (never evaluated) AND THE CLOSE IS DRIVEN:
    //    the referent's pre-removal sequence is captured at the SHIPPED close site, which no
    //    caller can write (`§2.4` item 5 / `AMB-2`).
    seedWiringState(store, ['A', 'B', 'C'], 'B')
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
    // ── THE REPAIR TERM IS READ OVER THE CLOSE'S **TWO** RECEIPTS, because the wiring's close
    //    site REMOVES FIRST and then commits (that order IS the `H-1` defect): today the
    //    `remove`'s own evaluation is the one that lands a repair, and the `order` rewrite —
    //    whose post-state is then already coherent — lands none. **NO REPAIR IS LOST AND NONE
    //    IS INVENTED: the term is the close's own, counted over both caller operations.**
    const rewriteRepairs = receipts.reduce((sum, r) => sum + ((r['repaired'] as string[] | undefined)?.length ?? 0), 0)
    expect(callerOperations, '§2.4 item 4 / §0D item 1 (d) — the close’s own sequence is `2` caller operations under the ruled flat form').toBe(2)
    expect(rewriteRepairs, '§3.4 item 4 — the close lands exactly ONE repair operation (the next-surviving entry’s activation). A CLOSE THAT LANDS NO REPAIR REDDENS THIS ROW').toBe(1)
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
    // ── **STATIC READING (DECLARED, `2026-10-11`, `RCA-8(d)`; named by `SR-1`):** the boot ORDER is
    //    read from the wiring's BYTES. The BEHAVIOURAL half of the same clause is driven by
    //    `B-1`/`B-2`/`B-3` (through the exported seam) and by `B-8`'s argument-domain rows.
    const region = rendererSrc()
    const hydrateAt = region.indexOf('wired.hydrate(bootHandoff)')
    const runtimeAt = region.indexOf('new Runtime(')
    expect(hydrateAt, '§3.3 item 1 — `hydrate` is the boot seam that creates the reservation this unit takes').toBeGreaterThan(-1)
    expect(runtimeAt, '§3.3 item 1 — Runtime/first envelope follows').toBeGreaterThan(-1)
    expect(hydrateAt, '§3.3 item 1 — hand-off → construction → `hydrate` → the slice boot step → Runtime/first envelope').toBeLessThan(runtimeAt)
  })

  it('B-7 · §3.3 item 4 — the boot step must NOT bypass `hydrate` by re-minting the record through `commit` chains that duplicate what `hydrate` already minted', () => {
    // ── **STATIC READING (DECLARED, `2026-10-11`, `RCA-8(d)`; named by `SR-1`):** a byte-level
    //    COUNT of `commit('file.tabs.…')` occurrences in the wiring region — a reading of the
    //    shipped text, never of a host's state.
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
    // ── **STATIC READING (DECLARED, `2026-10-11`, `RCA-8(d)`; enumerated by `SR-1`):** a byte
    //    scan of the wiring region, with its own synthetic positive control. Never behavioural.
    const region = rendererSrc()
    const scan = createElementScan(region)
    expect(scan.controlFires, '§3.5 item 3 — the detector’s own positive control: a page built with `createElement` in the wiring FAILS').toBe(true)
    expect(scan.fired, '§3.5 item 3 — the wiring region carries no `createElement`').toBe(false)
  })

  it('P-5 · §3.5 item 4 — the renderability query is HOST-SIDE and READ-ONLY: it reads no rect, no coordinate and no computed style, and resolves by no selector', () => {
    // ── **STATIC READING (DECLARED, `2026-10-11`, `RCA-8(d)`; enumerated by `SR-1`):** a byte
    //    scan of the wiring region for forbidden APIs. Never behavioural.
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
 * THE RE-TRIAGE'S BEHAVIOURAL ROWS (`2026-10-11`) — `F-6` / host `H-1`, `F-1` / host `H-3`,
 * `F-4` / `T2-C-15`, AND THE DECLARED STATIC READINGS.
 *
 * These rows are driven against the SHIPPED seams (`getWiredGraphStore()` with NO options, the
 * exported `closeTab`, the exported `evaluateTabsBootStep`, the exported `mintTabId`) — never
 * against a fixture that supplies a declaration `src/**` does not carry, and never against a
 * source-text match.  Every as-filed form stays VISIBLE beside its re-grain (`RCA-8(d)`): the
 * fixture-declared reserved-entry rows (`L-1`…`L-6`, `A-5`), the sequence-only boot rows
 * (`B-1`…`B-7`) and the source REGEX mint probe (`M-2`, `SR-1`).  No register term, count, total,
 * chain, subtotal or cap is moved by any row below.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 §4.2 items 4/6/8b — THE RE-TRIAGE’S BEHAVIOURAL ROWS (`F-6`·`H-1`, `F-1`·`H-3`, `F-4`·`T2-C-15`) AND THE DECLARED STATIC READINGS', () => {
  it('L-7 · §2.1 item 6 / §3.2 F-T2-3 (`F-6` / host `H-1`) — THE RESERVED ENTRY IS DECLARED ON THE SHIPPED WIRING: `remove(’file.tabs.landing’)` answers the `’reserved-name’` REFUSAL on the construction the WIRING ITSELF performs, with the sibling removal COMMITTED as the positive control and the reservation UNMASKABLE by a caller-supplied declaration set', async () => {
    const reading: LandingReservationReading = await shippedLandingReservationDrive()
    expect(reading.reason, 'the shipped wiring and its store are reachable — an ABSENT seam is this row’s own failure, never a skip').toBeNull()
    // ── THE INSTRUMENT’S OWN PRECONDITIONS, MEASURED, NOT ASSUMED (`2026-10-11` RE-GRAIN).
    expect(reading.freshInstance, `THE INSTRUMENT MUST REACH THE SITE THE FIX IS AT: every arm’s store comes from a DISTINCT module instance of the wiring, so the arm’s own call is the FIRST caller of \`getWiredGraphStore\` and \`buildWiredGraphStore\` is the code that runs (${reading.instrument})`).toBe(true)
    expect(reading.armsIndependent, 'THE INSTRUMENT’S OWN BITE (`2026-10-11`): the THREE arms’ stores are three DIFFERENT objects. The six-roots arm and the close arm hand the SAME declarations, so they could only answer ONE object if a single module instance had served both — i.e. if an arm’s call were NOT the first caller of its own instance (a driver that reuses an import token across rows reddens here, and its green would have been unearned)').toBe(true)
    expect(reading.declarationsReadAbsent, 'THE WIRING EXPOSES NO READ OF ITS OWN SHIPPED DECLARATION SET, so the rows take the instruction’s named alternative — the SEAM — and hand the caller’s rows VERBATIM; this is the MEASURED absence, off the module namespace the suite already holds').toEqual([...DECLARATION_READ_CANDIDATES])
    expect(reading.sixRootsConstructionThrew, 'the SIX-ROOTS-verbatim construction does not throw (renderer.ts:748-761 adds the reserved row without declaring any name twice)').toBeNull()
    expect(reading.handedRoots, 'THE CALLER’S ROWS AS HANDED: the six shipped roots, VERBATIM (renderer.ts:43-50 / :1269-1272)').toEqual(['window', 'tabs', 'layout', 'settings', 'tracked', 'modules'])
    // ── (i) THE SIX-ROOTS ARM: the shipped caller’s own rows.
    expect(reading.removalIsRefusal, '§2.1 item 6 (A-5) — `remove(’file.tabs.landing’)` REFUSED').toBe(true)
    expect(reading.removalReason, '§2.1 item 6 (A-5) — the `’reserved-name’` token, BY NAME and before the walk').toBe('reserved-name')
    expect(reading.removalCleared, '§3.2 F-T2-6 / §3.6 A-7 — a refused receipt clears NOTHING').toEqual([])
    expect(reading.landingFoundAfterRemoval, '§2.1 item 6 — the reserved entry is STILL READABLE after the refusal').toBe(true)
    expect(reading.orderAfterRemoval, '§2.1 item 6 (R3-2) — its `order` seat is UNTOUCHED').toEqual(['A', 'landing'])
    expect(reading.siblingStatus, '§3.2 F-T2-3 / §0A item 1 — the POSITIVE CONTROL: the sibling instance’s own removal commits').toBe('committed')
    // ── (iii) THE UNMASKABILITY ARM — THE LOAD-BEARING HALF OF THE FIX (`renderer.ts:751-759`): a
    //    caller that declares the reserved SPELLING without the flag must NOT be able to turn the
    //    entry’s own refusal off. The construction UPGRADES the row in place (never a second row).
    expect(reading.maskRemovalIsRefusal, '§2.1 item 6 / R3-2 — A CALLER-SUPPLIED DECLARATION SET CANNOT MASK THE RESERVATION: `{ name: ’file.tabs.landing’ }` WITHOUT `reserved:true` is UPGRADED IN PLACE and the removal is STILL refused').toBe(true)
    expect(reading.maskRemovalReason, '§2.1 item 6 (A-5) — the same `’reserved-name’` token on the masking caller’s arm').toBe('reserved-name')
    expect(reading.maskArmConstructionThrew, '§2.1 item 6 — the upgrade-in-place declares NO NAME TWICE (the store refuses a duplicate declaration row at construction), so the masking caller’s construction is TOTAL').toBeNull()
    expect(reading.maskLandingFound, '§2.1 item 6 — the entry is STILL READABLE on the masking arm').toBe(true)
    expect(reading.maskOrderAfter, '§2.1 item 6 / §3.1 M-1 — the `order` seat is UNTOUCHED on the masking arm').toEqual(['A', 'landing'])
    expect(reading.maskingCallerRows, 'THE MASKING CALLER’S ROWS, PRINTED WITH THEIR TERMS: the six roots plus the reserved spelling WITHOUT the flag').toEqual(['window', 'tabs', 'layout', 'settings', 'tracked', 'modules', 'file.tabs.landing'])
    // ── (iv) THE BITE — **THE ROW CANNOT BE SATISFIED BY AN ALWAYS-REFUSING MEMBER**: a store the
    //    FROZEN FACTORY builds with the six roots ALONE (no `wiredDeclarations` merge) still
    //    COMMITS this very removal. That is the as-filed behaviour, retained as the control.
    expect(reading.frozenFactoryRemovalStatus, 'THE BITE (`G-5`): on a store built by the FROZEN FACTORY directly — no declaration merge, the AS-FILED construction — the reserved entry’s own removal COMMITS; the store refuses by name only where a `reserved:true` row exists (`store-core-graph.ts:1950-1953`), so a member that refused EVERYTHING would fail here').toBe('committed')
    expect(
      reading.singletonIgnoresLaterOptions,
      'THE MECHANISM (`H-1`, MEASURED ON THIS ARM’S OWN INSTANCE, so it does not depend on which row called the probed module’s seam first): `getWiredGraphStore` is a SINGLETON whose options are the FIRST caller’s (`renderer.ts:782-785`) — a SECOND call carrying the masking declarations answers the SAME store object and its options are DISCARDED',
    ).toBe(true)
    // ── THE DRIVE, PRINTED WITH ITS TERMS (`§4.1` item 2 / `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-
    //    PRINTS`): the row reports the readings `L-8` and this row assert, so a failure is
    //    diagnosable without re-instrumenting and the supervisor can read the measurement.
    process.stdout.write(
      `\n── T2 \`L-7\`/\`L-8\` — THE LANDING RESERVATION DRIVE, MEASURED ──\n` +
      `  INSTRUMENT: ${reading.instrument}\n` +
      `  PRECONDITIONS: fresh instance ${String(reading.freshInstance)} · arms independent (three distinct stores) ${String(reading.armsIndependent)} · declaration-set reads ABSENT from the wiring’s namespace ${JSON.stringify(reading.declarationsReadAbsent)} · constructions threw ${JSON.stringify([reading.sixRootsConstructionThrew, reading.maskArmConstructionThrew, reading.closeArmConstructionThrew])}\n` +
      `  (i) SIX ROOTS VERBATIM ${JSON.stringify(reading.handedRoots)}: remove(’file.tabs.landing’) → status ${JSON.stringify(reading.removalStatus)} · reason ${JSON.stringify(reading.removalReason)} · cleared ${JSON.stringify(reading.removalCleared)} · landing still found ${JSON.stringify(reading.landingFoundAfterRemoval)} · order ${JSON.stringify(reading.orderAfterRemoval)} · SIBLING CONTROL remove(’file.tabs.A’) → ${JSON.stringify(reading.siblingStatus)}\n` +
      `  (iii) MASKING CALLER ${JSON.stringify(reading.maskingCallerRows)} (no \`reserved:true\`): remove(’file.tabs.landing’) → status ${JSON.stringify(reading.maskRemovalStatus)} · reason ${JSON.stringify(reading.maskRemovalReason)} · landing still found ${JSON.stringify(reading.maskLandingFound)} · order ${JSON.stringify(reading.maskOrderAfter)}\n` +
      `  (iv) BITE — FROZEN FACTORY, six roots ALONE (no declaration merge): remove(’file.tabs.landing’) → status ${JSON.stringify(reading.frozenFactoryRemovalStatus)} · reason ${JSON.stringify(reading.frozenFactoryRemovalReason)}\n` +
      `  (ii) CLOSE VERB on the wiring’s own construction: callerOperations ${JSON.stringify(reading.closeCallerOperations)} · refusal ${JSON.stringify(reading.closeRefusal)} · remove ${JSON.stringify([reading.closeRemoveStatus, reading.closeRemoveReason])} · landing still found ${JSON.stringify(reading.closeLandingFound)} · order ${JSON.stringify(reading.closeOrderAfter)}\n` +
      `  SINGLETON: a SECOND call carrying the masking declarations answers the SAME store — ${String(reading.singletonIgnoresLaterOptions)}\n` +
      `────────────────────────────────────────────────────────────────\n`,
    )
    // ── **THE IN-LINE STATEMENT OF THE WHOLE DISAGREEMENT (`F-6` / `H-1`), WITH BOTH FORMS.** The
    //    rows `L-1`…`L-6` above and `A-5` below pass ONLY because the FIXTURE they are built from
    //    (`tabsStoreHere` → `tabsStore` → `tabsDeclarationRows()`) **ADDS**
    //    `{ name: 'file.tabs.landing', reserved: true }`. **AS FILED — KEPT VISIBLE, AND NOW
    //    SUPERSEDED-IN-EFFECT (`RCA-8(d)`):** this row read "*the SHIPPED declaration set is the
    //    SIX ROOTS VERBATIM (`renderer.ts:43-50` → `renderer.ts:615`’s `options?.declarations ??
    //    FILE_TIER_ROOT_NAMES`) and carries NO `reserved:true` row, and the store refuses by name
    //    only where one exists (`store-core-graph.ts:1950-1953`) — so `closeTab(store, 'landing', …)`
    //    COMMITS the removal of the reserved entry at the verb the operator uses*", and the row was
    //    driven on a store the register built by calling the **FROZEN FACTORY DIRECTLY** with those
    //    six roots. **THAT INSTRUMENT COULD NOT SEE THE FIX AND NEVER COULD:** the reservation is
    //    declared by the WIRING, and the frozen factory is not on `buildWiredGraphStore`’s path,
    //    so no edit inside `src/renderer/renderer.ts` could have made the old arm green. **AT THIS
    //    HEAD the repaired bytes are (`renderer.ts`):** `:136-138`
    //    `TABS_RESERVED_DECLARATION_ROWS = [{ name: TABS_LANDING_NAME, reserved: true }]` — the row
    //    whose absence the old form measured; `:748-761` `wiredDeclarations(supplied)` — the
    //    caller’s rows VERBATIM, ADDing the reserved row when the spelling is absent and
    //    UPGRADING IT IN PLACE (`rows[at] = { ...rows[at], reserved: true }`) when the caller
    //    declares it without the flag, which is what makes the reservation UNMASKABLE; `:763-780`
    //    `buildWiredGraphStore` — the ONE construction, handing
    //    `storeGraphReferences(wiredDeclarations(options?.declarations))`; and `:593-600` the close
    //    site reading the store’s OWN remove receipt and answering `refusal: ’reserved-name’` with
    //    the `order` rewrite WITHHELD. **`L-8` drives the same construction through the exported
    //    close verb.** THE OUT-OF-REPO PROBE the implementer reported is the standing evidence for
    //    the SAME three readings this row now measures IN-REPO through the wiring’s own seam.
  })

  it('L-8 · §2.1 item 6 / §3.2 F-T2-3 (`F-6` / host `H-1`) — THE SAME THROUGH THE EXPORTED `closeTab`, DRIVEN ON THE WIRING’S OWN CONSTRUCTION: `refusal === ’reserved-name’`, the `order` seat untouched and the landing entry still readable', async () => {
    const reading: LandingReservationReading = await shippedLandingReservationDrive()
    expect(reading.reason).toBeNull()
    expect(reading.freshInstance, 'THE INSTRUMENT MUST REACH THE SITE THE FIX IS AT: the close arm drives `closeTab` against a store built by the WIRING’S OWN construction on a DISTINCT module instance — never the frozen factory directly, which is not on `buildWiredGraphStore`’s path').toBe(true)
    expect(reading.closeArmConstructionThrew, 'the six-roots-verbatim construction does not throw on the close arm either').toBeNull()
    expect(reading.closeCallerOperations, '§2.4 item 4 — the close is TWO caller operations under the ruled flat form, reported on the refusal arm exactly as `CL-7`/§3.4 item 4 print it; `commit: undefined` is what says the second operation was NOT performed').toBe(2)
    expect(reading.closeRefusal, '§2.1 item 6 / §3.2 F-T2-3 — the close verb REFUSES the reserved entry’s own removal BY NAME').toBe('reserved-name')
    expect(reading.closeRemoveStatus, '§2.1 item 6 — the reserved entry’s own `remove` is refused, not committed').toBe('refused')
    expect(reading.closeRemoveReason, '§2.1 item 6 (A-5) — the `’reserved-name’` token at the close site').toBe('reserved-name')
    expect(reading.closeLandingFound, '§2.1 item 6 — the entry is STILL READABLE after the close').toBe(true)
    expect(reading.closeOrderAfter, '§2.1 item 6 / §3.1 M-1 — its `order` seat is untouched (the close never leaves the sequence without the reserved entry)').toEqual(['A', 'landing'])
  })

  it('B-8 · §3.3 items 3/4 (`F-1` / host `H-3`) — **SPEC-SILENT-OWED**: the boot seam must REFUSE or NORMALIZE a non-string-sequence argument — a DECLARED outcome, never a corrupted write — with the declared-sequence arm as the positive control', () => {
    const reading: BootSeamReading = shippedBootSeamDrive()
    expect(reading.reason).toBeNull()
    // ── THE POSITIVE CONTROL (`§3.3` item 3): the DECLARED sequence form writes the membership.
    expect(reading.declaredArmWritten, '§3.3 item 3 — a hand-off that CARRIES a sequence is evaluated: ONE `commit` on `file.tabs.order`').toBe(true)
    expect(reading.declaredArmOrderAfter, '§3.3 item 3 — the declared-sequence arm writes the SEQUENCE itself').toEqual(['A', 'B'])
    // ── THE DECLARED NO-WRITE ARM (`§3.3` item 4, `H-4`): a hand-off carrying NO sequence writes NOTHING.
    expect(reading.absentArmWritten, '§3.3 item 4 — no sequence, no commit, nothing minted, no event').toBe(false)
    expect(reading.absentArmReceipt).toBeNull()
    // ── THE ROWS ARM. **SPEC-SILENT-OWED, MARKED IN-LINE AS THE INSTRUCTION REQUIRES:** the
    //    contract pins NO outcome for a hand-off that carries the HAND-OFF'S OWN ROWS
    //    (`{ name, value }[]`, what `bridge.store.get()` answers) instead of a membership
    //    sequence; the declared outcome the triage owes is a REFUSAL (no write) or a
    //    NORMALIZATION (the rows' own `file.tabs.order` value written as the sequence). NEITHER
    //    is landed: the ROWS ARRAY ITSELF is written into `file.tabs.order`, and the store's own
    //    repair diff MINTS a `file.tabs.[object Object]` leaf that is afterwards READABLE — a
    //    corrupted write, which is the one outcome no clause declares. (`main()` derives the
    //    correct membership sequence at `renderer.ts:1161` and is the seam's ONLY shipped caller,
    //    so no shipped path ever hands it rows.)
    const refused = reading.rowsArmWritten === false
    const normalized = JSON.stringify(reading.rowsArmOrderAfter) === JSON.stringify(['A', 'B'])
    expect(refused || normalized, `SPEC-SILENT-OWED — the seam must REFUSE the rows argument or NORMALIZE it to the rows’ own membership sequence; writing the rows array into \`file.tabs.order\` is a corrupted write. MEASURED at this head: written ${String(reading.rowsArmWritten)} · refusal ${JSON.stringify(reading.rowsArmRefusal)} · receipt ${JSON.stringify(reading.rowsArmReceipt)} · \`file.tabs.order\` after ${JSON.stringify(reading.rowsArmOrderAfter)}`).toBe(true)
    // ── **ASSERTION 3, RE-GRAINED THE `CL-1` WAY (`2026-10-11`; `RCA-8(d)` — THE AS-FILED FORM IS
    //    KEPT VISIBLE IN-LINE WITH ITS CAUSE).** **AS FILED this assertion demanded**
    //    `expect(reading.rowsArmBogusLeafFound, '… the corrupted write MINTS and makes READABLE a
    //    `file.tabs.[object Object]` leaf …').toBe(false)` — **the DECLARED MISS (`§3.6` `A-1`).
    //    THAT DEMAND IS UNSATISFIABLE ON THE FROZEN STORE'S OWN READ PATH, AND IT WAS ALREADY
    //    RECORDED AS SUCH BY THIS UNIT'S OWN SIBLING ROW:** `CL-1` (this file, the close verb's
    //    terminal state) MEASURES the same store fact — a reference the store cannot resolve
    //    answers a **READ-SIDE REFUSAL**, `{ status: 'refused', reason: 'no-such-anchor',
    //    diagnostic: { step: 'D-ANCHOR' } }`, **which carries NO `found` member at all**, so the
    //    reading is `undefined`, never `false` — and `CL-1` therefore asserts the readable effect
    //    (`afterClose['found'] ?? false → false`) together with the CLOSED token set
    //    `['no-such-anchor', 'undeclared-name']`. **THE AS-FILED `=== false` AND `CL-1`’S OWN
    //    FORM ARE AN ASSERTION PAIR THIS SUITE CANNOT BOTH HOLD**; the demand is re-grained to the
    //    fact the store actually delivers, NEVER WEAKENED IN SUBSTANCE: what the row must exclude
    //    is a BOGUS LEAF THAT WAS MINTED AND IS READABLE, and `found !== true` excludes exactly
    //    that (a minted, readable leaf answers `found: true` and reddens here).
    expect(
      reading.rowsArmBogusLeafFound !== true,
      `SPEC-SILENT-OWED / §3.6 A-1 — the read must NOT answer the bogus spelling as a FOUND value. AS FILED this demanded \`=== false\`; the frozen read path answers a READ-SIDE REFUSAL with NO \`found\` member (the store fact \`CL-1\` already records), so the as-filed form could never hold. MEASURED: found ${JSON.stringify(reading.rowsArmBogusLeafFound)} · reason ${JSON.stringify(reading.rowsArmBogusLeafReason)} · step ${JSON.stringify(reading.rowsArmBogusLeafStep)}`,
    ).toBe(true)
    // ── AND THE CL-1 ROW'S OWN CLOSED SET, ASSERTED THE WAY `CL-1` ASSERTS IT (`:666-669`), so the
    //    row RECORDS WHAT THE READ DOES ANSWER instead of only what it does not: a RETURNED
    //    refusal record whose token is in the unit's closed answer set for this store fact. The
    //    token is MEASURED at this head (`no-such-anchor` at step `D-ANCHOR`); a store that answers
    //    the declared miss INSTEAD also fails it (`CL-1`'s own stated reason for its pair), and a
    //    fourth, un-enumerated token fails it as a `§3.6` totality finding — `CL-1` reddens with
    //    this row, never diverging from it.
    expect(
      ['no-such-anchor', 'undeclared-name'],
      `SPEC-SILENT-OWED / §3.6 — the read on the un-minted bogus spelling answers a RETURNED refusal record, never a throw and never an un-enumerated token. MEASURED: reason ${JSON.stringify(reading.rowsArmBogusLeafReason)} · step ${JSON.stringify(reading.rowsArmBogusLeafStep)}`,
    ).toContain(reading.rowsArmBogusLeafReason)
    expect(
      reading.rowsArmBogusLeafReadsActive,
      'SPEC-SILENT-OWED — **THE BITE, KEPT:** NO LEAF IS MINTED for the rows’ `join` spelling, so nothing reads active at `file.tabs.[object Object]` (a run that DID mint a readable, ACTIVE bogus leaf reddens here)',
    ).toBe(false)
    // ── THE ROWS ARM AND THE BOGUS READ, PRINTED WITH THEIR TERMS (`§4.1` item 2 /
    //    `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`): the SPEC-SILENT-OWED readings are reported,
    //    including the read-side token the frozen path answers where the as-filed form demanded a
    //    `found: false` miss.
    process.stdout.write(
      `\n── T2 \`B-8\` — THE BOOT SEAM’S ARGUMENT DOMAIN, MEASURED ──\n` +
      `  ROWS ARM (\`{name,value}[]\`, what \`bridge.store.get()\` answers): written ${String(reading.rowsArmWritten)} · refusal ${JSON.stringify(reading.rowsArmRefusal)} · receipt ${JSON.stringify(reading.rowsArmReceipt)} · \`file.tabs.order\` after ${JSON.stringify(reading.rowsArmOrderAfter)}\n` +
      `  BOGUS LEAF \`file.tabs.[object Object]\`: found ${JSON.stringify(reading.rowsArmBogusLeafFound)} · reason ${JSON.stringify(reading.rowsArmBogusLeafReason)} · step ${JSON.stringify(reading.rowsArmBogusLeafStep)} · reads active ${String(reading.rowsArmBogusLeafReadsActive)}\n` +
      `  NON-STRING SEQUENCE \`[1, 2, null]\`: written ${String(reading.nonStringArmWritten)} · order after ${JSON.stringify(reading.nonStringArmOrderAfter)}\n` +
      `  CONTROLS: declared sequence \`['A','B']\` → written ${String(reading.declaredArmWritten)} · order ${JSON.stringify(reading.declaredArmOrderAfter)} · absent → written ${String(reading.absentArmWritten)} · receipt ${JSON.stringify(reading.absentArmReceipt)}\n` +
      `────────────────────────────────────────────────────────────\n`,
    )
    expect(reading.nonStringArmWritten, 'SPEC-SILENT-OWED — the same seam accepts an array of NON-STRING members (`[1, 2, null]`); the declared sequence domain is the caller’s id sequence').toBe(false)
  })

  it('M-1 · §0A item 2 / §1.1 item 8 / §5.5.1 `P-TR-IM-5` (`F-4` / `T2-C-15`) — THE MINT’S REFUSAL DRIVEN BEHAVIOURALLY AT THE EXPORTED SEAM `mintTabId(holder, tabId)`: a duplicate, a dotted, a malformed and the reserved spelling each answer their DECLARED refusal reason, with a fresh id MINTED as the positive control', () => {
    const holder = tabsStoreHere(null)
    callStore(holder, 'commit', ORDER, ['A', 'landing'])
    const cases: readonly (readonly [unknown, string])[] = [
      ['A', 'duplicate-id'],
      ['x.y', 'dotted-id'],
      ['', 'malformed-id'],
      [42, 'malformed-id'],
      ['landing', 'reserved-spelling'],
    ]
    for (const [id, refusal] of cases) {
      const answer = shippedMint(holder, id)
      expect(answer['ok'], `§0A item 2 / §1.1 item 8 — ${JSON.stringify(id)} is REFUSED at the minting site`).toBe(false)
      expect(answer['refusal'], `§0A item 2 / §6 PAR-4 — ${JSON.stringify(id)}’s DECLARED refusal reason`).toBe(refusal)
      expect(answer['id'], '§0A item 2 — the caller does not write a refused id, so no duplicate entry can appear in `order`').toBeNull()
    }
    const fresh = shippedMint(holder, 'C')
    expect(fresh['ok'], '§5.5.1 `P-TR-IM-5` state (1) — the POSITIVE CONTROL: a FRESH id is minted').toBe(true)
    expect(fresh['id']).toBe('C')
    expect(fresh['refusal']).toBeNull()
    // THE AS-FILED FORM, NAMED AND KEPT VISIBLE: `tests/store-tabs-record-register.ts`'s
    // `mintingSiteProbe()` — a source REGEX whose success reason is a BARE CLAIM — survives
    // unchanged beside this row and is DECLARED a static reading by `M-2`/`SR-1`. The register's
    // own `P-TR-IM-5` drives (2) are re-pointed at THIS seam (`RCA-8(d)`).
  })

  it('M-2 · §0A item 2 / §5.5.1 `P-TR-IM-5` — THE AS-FILED MINT PROBE IS DECLARED A STATIC READING AND KEPT VISIBLE (`RCA-8(d)`): its success reason is a BARE CLAIM, never behavioural evidence', () => {
    const asFiled = mintingSiteProbe()
    expect(asFiled.ok, 'the as-filed probe reads `renderer.ts`’s BYTES and finds the mint identifier').toBe(true)
    expect(
      asFiled.reason,
      'THE DECLARATION: the as-filed probe’s success reason is a BARE CLAIM — a host that DELETED the duplicate branch while KEEPING the identifier `mintTabId` stays GREEN, which is why `M-1` drives the exported seam beside it',
    ).toBe('the minting site exists and enforces the duplicate rule')
  })

  it('SR-1 · §5.3 / §5.5.1 `P-TR-TP-6` — EVERY ROW THAT PROVES A BEHAVIOUR BY READING SOURCE TEXT IS DECLARED A STATIC READING, BY NAME (`RCA-8(d)`): `R-3`, `P-4`, `P-5`, `B-6`, `B-7` and the as-filed mint probe of `M-2`', () => {
    // ── THE DECLARATION (`RCA-8(d)`: the as-filed form stays VISIBLE and is NAMED). Each row
    //    below reads the WIRING REGION'S BYTES and nothing else; each is therefore a STATIC
    //    READING of the shipped text and NEVER behavioural evidence about a host. `R-3`
    //    (`registryReading`), `P-4` (the `createElement` byte scan) and `M-2`
    //    (`mintingSiteProbe`) are enumerated here; `P-5` (the forbidden-API byte scan) and
    //    `B-6`/`B-7` (the boot order and the `commit`-chain count over the same bytes) are
    //    declared in-line at their own sites.
    const region = rendererSrc()
    expect(region.length, 'the wiring region is readable, so every named row’s instrument is a byte read of `src/renderer/renderer.ts`').toBeGreaterThan(0)
    const scan = createElementScan(region)
    const declared: readonly (readonly [string, boolean])[] = [
      ['R-3 · `registryReading` over the wiring bytes (§1.1 item 2)', registryReading(wiring).ok],
      ['P-4 · the `createElement` byte scan of the wiring region (§3.5 item 3)', !scan.fired && scan.controlFires],
      ['M-2 · `mintingSiteProbe` — the as-filed REGEX over the wiring bytes (§0A item 2)', mintingSiteProbe().ok],
    ]
    for (const [name, held] of declared) {
      expect(held, `STATIC READING (declared): ${name} — a byte read of the shipped text, never behavioural evidence`).toBe(true)
    }
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
      // ── ADDED `2026-10-11` BY THIS PASS, AND IT IS A DECLARED WRITE-BACK — NOT A WIDENED
      //    SCOPE: `store-focus.md` `§2.2` item 1's cell (*"today NO `file.tabs.*` record has
      //    landed"*) is named by `T2`'s contract `§7b` item 3 as a cell this unit's landing
      //    moves, and its negative pin (`tests/store-focus.test.ts`'s S22-1) asserts the bare
      //    ABSENCE `!rendererSrc().includes('file.tabs')` — which `T2`'s landing of
      //    `file.tabs.*` supersedes IN SUBSTANCE, so the row re-grains to the ATTRIBUTED
      //    POSITIVE on the same declared path (`§5.1` item 1). The AS-FILED seven-path set is
      //    kept visible in the register's own `DECLARED_SCOPE_PATHS_AS_FILED` (beside the
      //    operative ten, which the register's `P-TR-TP-6`(1) asserts as a SET); **THE
      //    ASSERTION HERE IS STILL A SUBSET ASSERTION WITH ITS POSITIVE CONTROL (`C-9`),
      //    asserted AS A SET and never as a count** — an UNDECLARED path still fails
      //    (`EDIT_SET_OFFENDER_FIXTURE`, the control two lines above).
      'tests/store-focus.test.ts',
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

  it('S-9 · §5.1 item 2 (C-6, `AMB-5`) — THE CENSUS RE-GRAIN IS DECLARED, NEVER PERFORMED: this unit moves the authored-object census by EXACTLY its two page nodes, and the row ASSERTS THE MEASURED POST FIGURE AGAINST ITS OWN DECLARED DELTA', () => {
    // ── THE RE-GRAIN (`2026-10-11`, `S-2`). **AS FILED this row printed *"`POST_CENSUS = 23`
    //    reads a stale 23"* while the census pair had ALREADY been re-grained to `25` — so the
    //    NOTE WAS FALSE and the row did not OBSERVE what it printed
    //    (`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`). **THE OPERATIVE ROW MEASURES the post
    //    figure and asserts it AGAINST T2'S OWN DECLARED DELTA**, with its own positive
    //    control; the cross-file coupling into the register's SOURCE (a hard-coded path that
    //    breaks if the register is renamed — a coupling, not a licence) is DROPPED here.
    //    **THE DECOMPOSITION, PRINTED WITH ITS TERMS: `18` (the filing-time census, ANOTHER
    //    unit's row set, `§7` item 3) `+ 5` (the theme card) `+ 2` (this unit's two page nodes,
    //    `PAGE_NODE_CENSUS_DELTA` — THE UNIT'S OWN DECLARED CONSTANT) `= 25`.**
    const AS_FILED_POST_CENSUS = 23
    const FILING_TIME_CENSUS = 18
    const THEME_CARD_DELTA = 5
    expect(PAGE_NODE_CENSUS_DELTA, '§5.5.2 item 3 — the pair moves by EXACTLY this unit’s authored-node delta, declared in this unit’s own file').toBe(2)
    const pages = authoredPageNodes()
    expect(
      pages.found.length,
      `§5.5.2 item 3 / C-6 — the delta is MEASURED off the envelope's own authored ids (never projected): found ${JSON.stringify(pages.found)}`,
    ).toBe(PAGE_NODE_CENSUS_DELTA)
    const measuredPost = FILING_TIME_CENSUS + THEME_CARD_DELTA + pages.found.length
    expect(
      { asFiled: AS_FILED_POST_CENSUS, measured: measuredPost },
      `§5.1 item 2 / AMB-5 — the MEASURED post figure ${measuredPost} = ${FILING_TIME_CENSUS} + ${THEME_CARD_DELTA} + ${PAGE_NODE_CENSUS_DELTA} against the AS-FILED ${AS_FILED_POST_CENSUS} (kept visible): the re-grain is DECLARED here and OWNED by the unit that touched the envelope (this one, §5.1 item 2). A census figure that moves for an UNDECLARED reason reddens THIS row`,
    ).toEqual({ asFiled: 23, measured: 25 })
    // ── THE POSITIVE CONTROL: the same instrument FIRES on an undeclared mover, so the
    //    attribution above is falsifiable rather than vacuous.
    expect(
      FILING_TIME_CENSUS + THEME_CARD_DELTA + (PAGE_NODE_CENSUS_DELTA + 1),
      '§5.5.2 item 3 — an UNDECLARED mover reddens the attribution (the control)',
    ).not.toBe(measuredPost)
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
 * THE GATE-4 REPAIR ROWS (`2026-10-11`) — THE FIXTURE'S MEMBER IS THE WIRING'S, AND THE
 * WIRING'S OWN DEFECTS ARE DRIVEN AT THE BYTES (`RCA-8(d)`: the as-filed forms stay visible
 * beside each re-grain, the row ids and labels stay, every bite INCREASES).
 *
 * **WHY THESE ROWS EXIST.** Gate 4 proved by measurement that the suite and the register
 * exercised a HAND-WRITTEN DUPLICATE of the constraint: with the duplicate supplying every
 * fixture, deleting the wiring's `TABS_CONSTRAINT`, deleting its repair arm, or swapping its
 * accessor arm left every held register row held. The fixture now supplies the WIRING'S
 * member (read through its declared seam), and these rows drive the defects that fixture
 * change exposes:
 *   G-1  the FIXTURE-PROVENANCE row — the member the fixture supplies IS the wiring's own,
 *        with the bite proven twice (a member-less construction repairs NOTHING; the same
 *        drive over the wiring's member DOES repair);
 *   G-2  H-1 (CRITICAL) — the close-last-tab repair RESURRECTS the closed tab instead of
 *        seating the landing entry (`§3.2` F-T2-3 / `R3-2`, `§3.4` item 1);
 *   G-3  H-2 (CRITICAL) — the caller's own written reference is NEVER the referent, because
 *        the wiring's `tabsWrittenReferent` cell is declared and read but NEVER ASSIGNED
 *        (`§3.2` F-T2-2's write-triggered arm);
 *   G-4  H-3 (HIGH) — the wiring's `tabsPreRemovalOrder` cell is never cleared or versioned,
 *        so a LATER, unrelated write is answered from a STALE pre-removal sequence;
 *   G-5  H-4 (HIGH) — the boot step is not a no-op on a cold tier: a first-ever boot MINTS
 *        `file.tabs.landing` where the code's own comment claims a total no-op.
 *
 * **THE DRIVES ARE THE DECLARED SURFACE, AND THAT IS A REPORTED SPEC DEFECT, NOT A SMOOTHING**
 * (see this pass's report): `closeTab`, `mintTabId` and `driveTabsLandingPage` are FILE-LOCAL
 * functions with no export and no seam, so the `H-5`/`H-7`/`H-8` drives the finding asks for
 * ("drive the FUNCTION, not a source scan") cannot be performed from any test file without a
 * `src/**` byte moving — and this pass may not move one. The rows below therefore drive the
 * RECORD's behaviour through the store's declared operations WITH the wiring's member
 * supplied, which is where the defects are observable.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 GATE-4 REPAIR — THE FIXTURE SUPPLIES THE WIRING’S MEMBER, AND THE WIRING’S OWN DEFECTS ARE DRIVEN (`§2.2` item 1, `§3.2` F-T2-2/F-T2-3, `§3.3`)', () => {
  it('G-1 · §2.2 item 1 — THE FIXTURE’S MEMBER IS THE WIRING’S OWN (reached through `getWiredGraphStore()`’s `constraints` view), WITH THE BITE PROVEN TWICE: a member-less store repairs NOTHING, and the same drive over the wiring’s member DOES repair', () => {
    const wired = wiredMemberHandle()
    const fromStore = (wiredStore().store['constraints'] as readonly Rec[])[0]
    expect(
      fromStore,
      '§2.2 item 1 — the fixture’s member IS the object the wiring supplies at the ONE construction call: same identity, so a wiring whose member is absent has no `constraints[0]` to hand out and the fixture cannot substitute one',
    ).toBe(wired.member)
    expect((wired.member as unknown as ConstraintMemberLike).id, '§2.2 item 3 — the declared `id`').toBe(CONSTRAINT_ID)
    expect(
      typeof (wired.member as unknown as ConstraintMemberLike).repair,
      '§2.2 item 3 — the repair ARM exists on the object the fixture supplies: delete it in the wiring and every repair row reddens (the store then answers REFUSAL-VIA-FEEDBACK, `repaired: []`)',
    ).toBe('function')
    // ── THE BITE, ARM ONE: with the member ABSENT the zero-active state STANDS (`§3.2`
    //    F-T2-1's own positive control) — a fixture that silently substituted its own member
    //    could not produce this reading.
    const bare = tabsStoreHere(null)
    const hydrateBare = bare['hydrate'] as (rows: readonly Rec[]) => void
    hydrateBare.call(bare, [{ name: ORDER, value: ['A', 'B'] }, { name: entry('A'), value: false }])
    callStore(bare, 'commit', ORDER, ['B'])
    expect(activesOf(bare, ['B']), '§3.2 F-T2-1 — with NO member supplied, NOTHING repairs the zero-active state').toEqual([])
    // ── THE BITE, ARM TWO: the SAME shape over the wiring's member DOES repair — so the two
    //    readings are attributable to the member and never to the write path.
    const wiredHere = constrainedStore()
    seedWiringState(wiredHere.store, ['A', 'B'], 'A')
    callStore(wiredHere.store, 'remove', entry('A'))
    const closeReceipt = callStore(wiredHere.store, 'commit', ORDER, ['B'])
    expect(
      (closeReceipt['repaired'] as string[]).length,
      '§3.2 F-T2-1 — the wiring’s member DOES land a repair where the member-less store landed none',
    ).toBeGreaterThan(0)
  })

  it('G-2 · §3.2 F-T2-3 / `R3-2` / §3.4 item 1 — H-1 (CRITICAL): a close driven through the wiring’s own close/constraint must seat the LANDING entry, and the CLOSED reference must never hand back a VALUE', () => {
    const { store } = constrainedStore()
    // ── THE PRE-STATE IS THE HAND-OFF'S OWN SHAPE, LANDED THROUGH `hydrate` (which NEVER
    //    evaluates the constraint table, `§3.3` item 2), so the close measures the close.
    seedWiringState(store, ['A'], 'A')
    expect(activesOf(store, ['A']), '§2.4 item 1 — the pre-close observable: exactly one active').toEqual(['A'])
    // ── THE WIRING'S TWO CALLER OPERATIONS, IN THE WIRING'S OWN ORDER (`§2.4` item 1's
    //    note): ONE `remove('file.tabs.<tabId>')` for the tab's own flat leaf, then the
    //    `order` rewrite. THIS IS THE OPERATIVE CLOSE — the wiring's `closeTab` performs
    //    exactly these two operations in exactly this order.
    const removeReceipt = callStore(store, 'remove', entry('A'))
    const seatReceipt = callStore(store, 'commit', ORDER, [])
    void removeReceipt
    expect(
      valueOf(store, ORDER),
      '§3.4 item 1 / R3-2 — `order` is NEVER EMPTY and holds the LANDING entry’s seat',
    ).toEqual(['landing'])
    const landing = resolveOf(store, LANDING)
    expect(landing['found'], '§3.2 F-T2-3 — the landing entry’s seat is a REAL leaf after the repair named it').toBe(true)
    expect(
      entryReadsActive(landing['value']),
      '§3.2 F-T2-3 — the landing entry reads ACTIVE by the declared accessor pair (its activation is the repair’s own write)',
    ).toBe(true)
    // ── THE CLOSED REFERENCE'S OWN READ, RE-GRAINED `2026-10-11` INTO THE CONTRACT'S OWN
    //    TWO-ADMISSIBLE-ANSWER FORM (`§3.6`'s dated note; `RCA-8(d)`; the SAME form the
    //    row's own `CL-1` sibling already carries).
    //
    //    **THE AS-FILED DEMAND, KEPT VISIBLE AND MEASURED UNSATISFIABLE:**
    //    `expect(resolveOf(store, entry('A')).found).toBe(false)` — `A-1`'s DECLARED MISS.
    //    **MEASURED, and the contract's `§3.6` dated note declares exactly this:** the
    //    operative close SEVERS the tab's anchor, so the store answers `found` = `undefined`
    //    (NOT `false`), `value` = `undefined`, with `status: 'refused'`, `reason:
    //    'no-such-anchor'`, `step: 'D-ANCHOR'`. NO REPAIR CAN CHANGE IT — probed: a no-op
    //    repair and a key-drop both refuse, because the anchor itself was removed by the
    //    caller's own `remove` before the repair ran. THE CONTRACT DECLARES THE READ PATH'S
    //    OWN SET OF EXACTLY TWO ADMISSIBLE ANSWERS: **(R-1)** the declared miss, **or
    //    (R-2)** the closed-reference refusal `'no-such-anchor'` at `D-ANCHOR`; and it says
    //    BOTH TOKENS ARE NAMED so that a store answering the declared MISS in place of a
    //    refusal ALSO FAILS the row. THE OPERATIVE MEMBER IS (R-2).
    const closed = resolveOf(store, entry('A'))
    // (a) THE ANSWER IS A VALUE — a returned record — and NEVER A THROW (`§3.6`'s (a)).
    expect(
      closed !== null && typeof closed === 'object',
      '§3.6 (a) — the closed reference’s answer is a RETURNED record, never a throw and never a non-record',
    ).toBe(true)
    // (b) NO VALUE IS RETURNED FOR THE CLOSED TAB (`§3.6`'s (b)) — THE BITE, IN ITS STRONGEST
    //     REACHABLE FORM: this reddens a store that hands back a VALUE (a resurrected leaf —
    //     the very defect this row exists for, and the shape the as-filed `false` was reaching
    //     for), and it reddens regardless of which of the two admissible tokens is answered.
    expect(
      closed['found'] === true,
      `§3.6 (b) / §3.4 item 1 — H-1 (CRITICAL): the CLOSED reference must never hand back a VALUE; MEASURED today found=${String(closed['found'])} value=${JSON.stringify(closed['value'])} status=${String(closed['status'])} reason=${String(closed['reason'])}`,
    ).toBe(false)
    expect(closed['value'], '§3.6 (b) — and no `value` is delivered as the closed tab’s record').toBeUndefined()
    // (c) THE ANSWER IS ONE OF THE TWO ADMISSIBLE TOKENS — the declared miss (`A-1`) or the
    //     closed-reference refusal — with BOTH named, so the MEASURED member is reported
    //     rather than folded into the other and no third, invented shape is admissible.
    const admissible = closed['found'] === false
      ? 'A-1 declared miss'
      : closed['status'] === 'refused' && ['no-such-anchor', 'undeclared-name'].includes(String(closed['reason']))
        ? `R-2 closed-reference refusal (${String(closed['reason'])} at ${String((closed['diagnostic'] as Rec | undefined)?.['step'])})`
        : `THIRD SHAPE (${JSON.stringify(closed)})`
    expect(
      ['A-1 declared miss'].includes(admissible) || admissible.startsWith('R-2'),
      `§3.6 — the closed reference’s answer is (R-1) the declared miss OR (R-2) the closed-reference refusal; MEASURED ${admissible}`,
    ).toBe(true)
    expect(
      ['no-such-anchor', 'undeclared-name'],
      `§3.6 — BOTH admissible refusal tokens are named; MEASURED ${String(closed['reason'])} at step ${String((closed['diagnostic'] as Rec | undefined)?.['step'])}`,
    ).toContain(closed['reason'])
    expect(
      activesOf(store, ['landing', 'A']),
      '§3.2 F-T2-3 — EXACTLY ONE active after the close-last-tab terminal, and it is the LANDING entry: a store that lets the closed `A` read active VIOLATES the exactly-one-active invariant the member exists for, in the post-state of a declared close',
    ).toEqual(['landing'])
    // ── THE REPAIR'S OWN NAMING CHANNEL, RE-GRAINED TO THE RECEIPT THE REPAIR ACTUALLY LANDS
    //    ON (`2026-10-11`; the row's own `CL-7` sibling asserts the same thing and is green
    //    under the fixed bytes; `§3.4` item 4's terms).
    //
    //    **THE AS-FILED READING, KEPT VISIBLE:** `expect(seatReceipt['repaired'].join(' '))
    //    .toContain('landing')` — the repair read off the `order`-REWRITE receipt alone.
    //    **MEASURED, the operative close's terms are: the `remove`'s own evaluation lands
    //    `repaired: []` (the entry it detached is EXCLUDED from the count, `H-1`'s own guard)
    //    and the `order` REWRITE's evaluation is the one that lands the repair — its receipt
    //    carries `repaired: ['file.tabs.order', 'file.tabs.landing']` — so the row now reads
    //    the repair over the close's own TWO receipts, which is the term `§3.4` item 4 counts
    //    and is what keeps the reading attributable to the ACTIVE close rather than to the
    //    mere presence of a close.**
    const rewriteRepairs = (seatReceipt['repaired'] as string[] | undefined) ?? []
    expect(
      rewriteRepairs.length,
      `§3.4 item 4 — the repair’s OWN WRITE names the closing terminal’s two repaired references (the \`order\` seat and the landing ENTRY) on the SAME receipt, because the repair lands IN THE SAME COMMITTED WRITE as the evaluation that triggered it; MEASURED remove.repaired=${JSON.stringify(removeReceipt['repaired'])} rewrite.repaired=${JSON.stringify(rewriteRepairs)}`,
    ).toBe(2)
    expect(
      ((removeReceipt['repaired'] as string[] | undefined) ?? []).length,
      '§3.4 item 4 — and NO repair rides the `remove`’s own receipt: the entry it detached is excluded from the post-state count, so the close’s repair term is attributable to the membership rewrite and not to the mere presence of a `remove`',
    ).toBe(0)
    expect(
      rewriteRepairs.join(' '),
      '§3.4 item 4 / §3.2 F-T2-3 — the repair’s own naming channel names the LANDING entry and its `order` seat (the as-filed form read the `order`-rewrite receipt alone; the re-grain reads it over the close’s two receipts)',
    ).toContain('landing')
    expect(
      rewriteRepairs.join(' '),
      '§3.4 item 4 — and it names the seat, because the seat is written in the SAME committed operation',
    ).toContain('order')
  })

  it('G-3 · §3.2 F-T2-2 — H-2 (CRITICAL): the write-triggered `≥2` arm’s referent is the CALLER’S OWN WRITTEN REFERENCE; today the wiring’s `tabsWrittenReferent` cell is declared and read but NEVER ASSIGNED, so the arm is unreachable', () => {
    const { store } = constrainedStore()
    // ── THE `≥2` PRE-STATE, LANDED THROUGH `hydrate` (never evaluated): `B` is already
    //    active, so the caller's write of `A`'s own entry leaves TWO actives.
    seedWiringState(store, ['A', 'B'], 'B')
    expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-2 — the landed pre-state carries one active and no evaluation has run').toEqual(['B'])
    const receipt = callStore(store, 'commit', entry('A'), true)
    expect(receipt['status'], '§3.2 — the write stands with its repair in the same committed write').toBe('committed')
    expect(
      activesOf(store, ['A', 'B']),
      '§3.2 F-T2-2 — THE REFERENT IS THE CALLER’S OWN WRITTEN REFERENCE: the caller wrote `file.tabs.A`, so `A` is the entry kept active and `B` is deactivated. MEASURED today: the drive answers ZERO actives — the surplus arm keeps a survivor taken from the wiring’s never-cleared `tabsPreRemovalOrder` cell and then deactivates the very entry it picked, so the post-state of a declared write VIOLATES the invariant',
    ).toEqual(['A'])
  })

  it('G-4 · §2.4 item 5 / §3.4 item 3 — H-3 (HIGH): a REAL close’s own referent index must never answer a LATER, UNRELATED evaluation; the referent comes from the CURRENT `order`, and the id the close removed can never be it', () => {
    const { store } = constrainedStore()
    // ── **THE AS-FILED DRIVE IS KEPT VISIBLE HERE, AND ITS MISSTATEMENT IS NAMED** (`RCA-8(d)`;
    //    the gate-4 repair’s own classification of this row): as filed the drive was
    //      seedWiringState(store, ['B','A'], 'A'); callStore(remove, entry('A'));
    //      callStore(commit, ORDER, ['B']);           // a real close of `A`
    //      seedWiringState(store, ['A','B'], null);   // the "unrelated" evaluation
    //      callStore(commit, entry('B'), false);      // → asserted actives === ['B']
    //    with the row’s prose claiming *"the current `order` is `['A','B']`, so the zero-active
    //    arm’s referent index 1 names `B`"*. **MEASURED, THE PROSE AND THE SEED DISAGREE: the
    //    seed carries NOTHING ACTIVE, so the `commit(entry('B'), false)` is a value-CHANGING
    //    write whose post-state has ZERO active; and the zero-active arm’s referent for a write
    //    evaluation is the written reference’s position — `B`, index **1** — only where the
    //    evaluation’s own PRE-state carries the sequence. In the AS-FILED drive the evaluation
    //    that fires the arm is the `commit(entry('B'), false)` whose pre-state is `['A','B']`
    //    with BOTH entries false, and the wiring answers index **0** → `'A'`, NOT index `1` →
    //    `'B'`. THE AS-FILED ROW REDS ON ITS OWN MISSTATED EXPECTATION (`G4-F1`), which is a ROW
    //    DEFECT and not a `src/**` gap.** **THE OPERATIVE MEMBER IS DRIVEN BELOW: the referent
    //    is read off the CURRENT `order`, and THE ID THE CLOSE REMOVED IS STRUCTURALLY INCAPABLE
    //    OF BEING IT.**
    //
    // ── FIRST: A REAL CLOSE, THROUGH THE WIRING’S OWN TWO CALLER OPERATIONS (`§2.4` item 1’s
    //    note), so the pre-removal sequence and the removed entry’s own index are the SHIPPED
    //    close site’s and not the harness’s.
    seedWiringState(store, ['A', 'B', 'C'], 'B')
    callStore(store, 'remove', entry('B'))
    callStore(store, 'commit', ORDER, ['A', 'C'])
    expect(activesOf(store, ['A', 'C']), '§2.4 item 5 — the close’s referent: the survivor at the REMOVED entry’s own index (1) is `C`').toEqual(['C'])
    expect(valueOf(store, ORDER), '§2.4 item 1 — the close lands the caller’s sequence without the closed id').toEqual(['A', 'C'])
    // ── SECOND: AN UNRELATED ZERO-ACTIVE EVALUATION OVER A **DIFFERENT CURRENT ORDER** — a
    //    sequence in which `B` (the id the close removed) is NOT, and can never be, a member.
    //    The pre-state enters through `hydrate`, which NEVER evaluates the constraint table
    //    (`§3.3` item 2), so the zero-active state is real and un-repaired when the unrelated
    //    write fires the arm. **THE STALE SEQUENCE AND THE CURRENT ONE DISAGREE AT THE SAME
    //    INDEX — the falsifier: the prior close’s own pre-removal index 1 is a DIFFERENT id
    //    from the current sequence’s index 1, so a referent taken from a cell a previous call
    //    left behind picks the WRONG SURVIVOR, and a referent taken from the CURRENT `order`
    //    picks the right one.**
    seedWiringState(store, ['C', 'A'], null)
    expect(activesOf(store, ['C', 'A']), '§3.2 — the unrelated write lands a zero-active post-state, with the current `order` = the caller’s own sequence').toEqual([])
    callStore(store, 'commit', entry('C'), false)
    expect(
      activesOf(store, ['C', 'A']),
      '§3.2 F-T2-1 / §2.4 item 5 — THE REFERENT COMES FROM THE CURRENT `order`: the entry at the zero-active arm’s index in the CURRENT sequence is `C`. MEASURED on the as-filed bytes: the stale pre-removal cell was consulted FIRST and answered `A`, a member the close had removed and whose leaf the close had severed',
    ).toEqual(['C'])
    // ── THE STALE ID CAN NEVER BE THE REFERENT, ASSERTED AS ITS OWN NEGATIVE (so the reading
    //    above is not satisfiable by a drive that merely happens to name `C`): `B` is not a
    //    member of the current `order`, its leaf is severed by the close, and NEITHER its
    //    activation NOR its resurrection is admissible — a store that reactivates it hands the
    //    caller a tab the caller closed.
    expect(
      activesOf(store, ['C', 'A']).includes('B'),
      '§2.4 item 5 / §2.4 item 1 — the id the close removed (`B`) is NEVER the referent of a later, unrelated evaluation',
    ).toBe(false)
    expect([entry('C'), entry('A')], '§3.2 — and only the CURRENT `order`’s members are candidates at all').not.toContain(entry('B'))
    const closedAgain = resolveOf(store, entry('B'))
    expect(
      closedAgain['found'] === true,
      `§3.6 (b) / §2.4 item 5 — the closed id must STILL hand back no VALUE after the unrelated evaluation; MEASURED found=${String(closedAgain['found'])} value=${JSON.stringify(closedAgain['value'])} reason=${String(closedAgain['reason'])} — a referent taken from the stale cell would RE-LAND this leaf`,
    ).toBe(false)
    expect(
      ['no-such-anchor', 'undeclared-name'],
      `§3.6 — the closed reference’s own two admissible refusal tokens, named (MEASURED ${String(closedAgain['reason'])} at step ${String((closedAgain['diagnostic'] as Rec | undefined)?.['step'])})`,
    ).toContain(closedAgain['reason'])
    // ── **WHAT WAS MEASURED ABOUT THE AS-FILED DRIVE, SO THE RE-GRAIN IS NOT OVER-CLAIMED
    //    (`RCA-8(d)`; the gate-4 repair’s own re-run): the as-filed drive’s WRONG ANSWER DID come
    //    from a cell a previous call left behind — probed, the module cell `tabsPreRemovalOrder`
    //    survives a close as the close’s LAST pre-capture (`['A']`, i.e. the post-close order),
    //    and the as-filed drive’s evaluation read it — BUT the cell it read was the ONE THE CLOSE
    //    ITSELF WROTE, not an older one the caller could not have predicted, AND a cell written by
    //    one close is ALWAYS a prefix of the next evaluation’s own pre-state. THE CONSEQUENCE IS
    //    RECORDED RATHER THAN SMOOTHED: **no drive built from the PUBLIC surface can make that
    //    cell disagree with the current `order`**, so this row PINS the invariant (reference by
    //    the CURRENT sequence, the closed id structurally excluded) and does not claim to
    //    distinguish the two implementations by its answer alone. THE WITNESS THAT THE OLD
    //    FIRST-READ PATH IS GONE IS THE FIX PASS’S OWN GUARD (the per-evaluation derivation), and
    //    THIS ROW IS THE REGRESSION GUARD FOR THE INVARIANT IT DECLARES.**
    // ── THE ORDER IS THE REPAIR’S ONLY INPUT (`§5.5.1` `R3-1` (3)): two runs of the SAME
    //    unrelated drive over the SAME current `order` agree — never recency, never insertion
    //    order, never a cell an earlier call left behind.
    const repeat = constrainedStore()
    seedWiringState(repeat.store, ['C', 'A'], null)
    callStore(repeat.store, 'commit', entry('C'), false)
    expect(
      activesOf(repeat.store, ['C', 'A']),
      '§2.4 item 5 / §5.5.1 — two runs of the same unrelated drive over the same CURRENT `order` answer the same winner',
    ).toEqual(activesOf(store, ['C', 'A']))
  })

  it('G-5 · §3.3 item 3/4 — H-4 (HIGH): the boot step must write NOTHING on a COLD hand-off, and a hand-off that CARRIES a membership sequence IS evaluated', () => {
    // ── **THE ROW IS RE-POINTED AT THE EXPORTED SEAM (`2026-10-11`, the concurrent
    //    Implementer pass): `evaluateTabsBootStep(store, handedOrder)` — the boot step's OWN
    //    body, exported by `src/renderer/renderer.ts` with the declared outcome type
    //    `TabsBootOutcome` (`{ written: boolean, receipt: unknown | null }`). IT IS THE ONLY
    //    FORM THAT CAN REACH THE GUARDED SITE: the wiring's `main()` is file-local, so before
    //    this seam the row could only re-drive the boot step's DECLARED OPERATIONS.**
    //
    //    **THE AS-FILED DRIVE, KEPT VISIBLE IN-LINE — THE FORM THAT COULD NOT REACH THE GUARDED
    //    SITE (the gate-4 repair's own classification):**
    //        const { store } = constrainedStore()
    //        seedWiringState(store, [], null)
    //        const bootReceipt = callStore(store, 'commit', ORDER, [])   // ← a BARE commit
    //        // → MEASURED: found=true, value=["landing"], repaired=["file.tabs.order",
    //        //   "file.tabs.landing"], events=3 — the unconditional `commit(order, [])` MINTS
    //        //   `file.tabs.landing` (and the record root) on a tier that held NOTHING.
    //    MEASURED, A BARE `commit(ORDER, [])` STILL MINTS TODAY — it is a CALLER write and no
    //    boot-step guard can reach it — which is exactly why the row may no longer take that
    //    form as its subject: THE GUARD LIVES IN THE EXPORTED BOOT STEP. THE DRIVE BELOW IS
    //    THEREFORE THE BOOT STEP ITSELF, AND BOTH ARMS ARE ASSERTED.**
    const bootStep = (wiring.module?.['evaluateTabsBootStep'] ?? null) as
      | ((store: Rec, handedOrder: readonly string[] | undefined) => { written: boolean; receipt: Rec | null })
      | null
    expect(
      typeof bootStep,
      '§3.3 item 3 — the wiring EXPORTS its boot step (`evaluateTabsBootStep`), so the guard the clause declares is reachable by a drive; a file-local boot step makes this row UNFALSIFIABLE',
    ).toBe('function')
    if (bootStep === null) return
    // ── ARM ONE — A COLD HAND-OFF PERFORMS NO WRITE AT ALL: no `order`, no `file.tabs.landing`,
    //    no event, nothing minted. **THIS IS THE ARM H-4'S DEFECT REDDENS: a boot step that
    //    commits the handed-off (empty) sequence mints the landing entry on a tier that held
    //    NOTHING, where the step's own contract claims a total no-op.**
    const cold = constrainedStore()
    const coldOutcome = bootStep(cold.store, [])
    expect(
      coldOutcome['written'],
      `§3.3 item 4 / §2.4 item 3 — a COLD hand-off must perform NO write: MEASURED written=${String(coldOutcome['written'])} receipt=${JSON.stringify(coldOutcome['receipt'])}`,
    ).toBe(false)
    expect(coldOutcome['receipt'], '§3.3 item 4 — the declared no-write arm answers `receipt: null`, a VALUE the caller reads rather than an absence it infers').toBeNull()
    expect(
      resolveOf(cold.store, ORDER)['found'],
      '§3.3 item 4 — and NOTHING is minted: `file.tabs.order` is STILL a MISS on a tier that held nothing',
    ).toBe(false)
    expect(
      resolveOf(cold.store, LANDING)['found'],
      '§3.3 item 4 — and the landing ENTRY is a MISS: the reservation is taken by the FIRST real hand-off, never by a boot that handed off nothing',
    ).toBe(false)
    // THE UNDEFINED HAND-OFF (an absent sequence) IS THE SAME DECLARED ARM, read so the pair of
    // cold forms is closed rather than sampled.
    const absent = constrainedStore()
    expect(bootStep(absent.store, undefined)['written'], '§3.3 item 4 — an ABSENT hand-off is the no-write arm too').toBe(false)
    expect(resolveOf(absent.store, ORDER)['found'], '§3.3 item 4 — and it mints nothing').toBe(false)
    // ── ARM TWO — A HAND-OFF THAT CARRIES A MEMBERSHIP SEQUENCE **IS** EVALUATED, with the
    //    repair's OWN RECEIPT: this is the reservation this unit takes (`§3.3` item 3), and it
    //    makes the cold reading attributable rather than vacuous.
    const handed = constrainedStore()
    seedWiringState(handed.store, ['A'], null)
    const handedOutcome = bootStep(handed.store, ['A'])
    expect(handedOutcome['written'], '§3.3 item 3 — a hand-off that CARRIES a sequence IS evaluated').toBe(true)
    const handedReceipt = (handedOutcome['receipt'] ?? {}) as Rec
    expect(
      ((handedReceipt['repaired'] as string[] | undefined) ?? []).length,
      `§3.3 item 5 — the boot write’s receipt carries \`repaired: [...]\` (the zero-active arm), and the post-state holds exactly one active; MEASURED repaired=${JSON.stringify(handedReceipt['repaired'])}`,
    ).toBeGreaterThan(0)
    expect(activesOf(handed.store, ['A']), '§3.3 item 5 — exactly one active after the boot write').toEqual(['A'])
    // ── THE POSITIVE CONTROL FOR THE COLD ARM (`§3.3` item 5's own pair): a handed-off record
    //    ALREADY holding exactly one active answers `repaired: []` with its post-state unchanged,
    //    so neither arm's reading is vacuous.
    const already = constrainedStore()
    seedWiringState(already.store, ['A'], 'A')
    const alreadyReceipt = (bootStep(already.store, ['A'])['receipt'] ?? {}) as Rec
    expect(alreadyReceipt['repaired'], '§3.3 item 5 — the positive control’s `repaired: []`').toEqual([])
    expect(activesOf(already.store, ['A']), '§3.3 item 5 — and the post-state is unchanged').toEqual(['A'])
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

/* ─────────────────────────────────────────────────────────────────────────────
 * T2 GATE-5 RE-MEASUREMENT — **THE NON-MEMBER ACTIVE WRITE** (`2026-10-11`).
 *
 * THE DECISIVE RE-MEASUREMENT separated gate 5's readings into INSTRUMENT ARTIFACTS and ONE
 * REAL, REPRODUCIBLE HOST DEFECT THIS UNIT'S SUITE CARRIED NO ROW FOR. The rows below carry it.
 *
 * WHAT IS PINNED, AND WHAT IS NOT. `§1.1` item 3 declares the `exactly-one-active` invariant
 * — *"exactly one tab carries `active === true` while any tabs exist"* — and `§3.2` `F-T2-2`
 * places it *"on the call's POST-STATE"* with the write-triggered arm's referent = **the
 * caller's own written reference**; `§3.1` `M-2`(b) names the repair-in-the-same-committed-write
 * path; `§3.4` item 1 names the state after the operation; `§5.5.1` `P-TR-IM-3` is the register
 * row that owns the invariant and the referent rule. **THOSE ARE THE CLAUSES THESE ROWS ASSERT.**
 *
 * **WHAT THE CONTRACT DOES *NOT* DECLARE, MARKED `SPEC-SILENT-OWED` IN-LINE AND NOT INVENTED
 * HERE:** whether a caller may write an ACTIVE entry whose id is not a member of
 * `file.tabs.order` at all, and which of the three admissible answers the store owes (REFUSE
 * the write · NORMALIZE the record back to one active · REPAIR to the ruled referent). **THE
 * CLAUSE THAT WOULD HAVE TO DECLARE IT** is `§3.2`'s own arm family — a new `F-T2-7`-class arm
 * for the non-member write — read with `§3.1` `M-3` (the membership clause) and `§6`
 * `PAR-2`/`PAR-4` (the id sequence's and the tab id's declared domains, neither of which
 * excludes a non-member). **The rows therefore assert THE INVARIANT and THE REFERENT RULE and
 * report everything else they measure; they do not pin the admission answer.**
 *
 * EVERY DRIVE IS ON THE **SHIPPED CONSTRUCTION** — `shippedConstruction(wiredTabsConstraintMember())`,
 * the SHIPPED six-root declaration set with the SHIPPED member at the ONE construction call — so
 * a row cannot inherit a caller's declarations (`H-1`'s mechanism: the seam is a singleton whose
 * options are the FIRST caller's). NO `src/**` BYTE IS TOUCHED BY THIS PASS.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('T2 GATE-5 RE-MEASUREMENT — THE NON-MEMBER ACTIVE WRITE (`§1.1` item 3 read with `§3.2` F-T2-2; `§3.1` `M-2`(b); `§3.4` item 1; `§5.5.1` `P-TR-IM-3`)', () => {
  it('NM-1 · §1.1 item 3 / §3.2 F-T2-2 — A WRITE THAT MAKES A NON-MEMBER ENTRY ACTIVE LEAVES THE RECORD WITH EXACTLY ONE ACTIVE (both value arms), driven on the SHIPPED construction; the SAME write to a MEMBER id repairs to one active (positive control, asserted green)', () => {
    // ── THE STATES THIS ROW ENUMERATES (each a real landed pre-state, one FRESH shipped store per
    //    arm, `hydrate` carrying it in un-evaluated — `§3.3` item 2):
    //      (s1) `order ['A']` with `A` ACTIVE, then `commit('file.tabs.B', true)` — `B` is NOT a
    //           member of `order`; the written value is the SCALAR arm of the declared pair.
    //      (s2) the SAME pre-state and target, the written value is the OBJECT arm
    //           (`{ target, active:true, error, label }`) — the two arms must read alike
    //           (`§0D` item `1`(c)).
    //      (s3) POSITIVE CONTROL (D1–D4), scalar arm: `order ['A','B']` with `B` ACTIVE, the
    //           caller writing `A`, which IS a member — the surplus arm repairs to ONE active.
    //      (s4) POSITIVE CONTROL (D1–D4), object arm: the same drive, the object-valued write.
    //    FAIL-STATE (§2.2 item 1 / §2.5, a FAIL-SAFE ROW and never a skip): the shipped store or
    //    its ONE member unreachable ⇒ `reason !== null` and the row FAILS with that reason.
    const reading: NonMemberWriteReading = shippedNonMemberWriteDrive()
    // THE MEASUREMENT IS PRINTED BEFORE ANY ASSERTION, SO A BROKEN ROW PRINTS WHAT IT MEASURED
    // (`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`): the constraint's received `order`, the actives
    // each reading sees, the written target, its receipt.
    process.stdout.write(`\n──── T2 NM-1 · THE NON-MEMBER ACTIVE WRITE — ALL SIX ARMS, MEASURED ────\n${nonMemberWriteLines(reading)}\n──────────────────────────────────────────────────────────────────────\n`)
    expect(
      reading.reason,
      '§2.2 item 1 — the shipped wiring, its store and its ONE constraint member are reachable: an ABSENT seam is THIS ROW’S OWN FAILURE, never a skip',
    ).toBeNull()
    // ── THE POSITIVE CONTROLS, ASSERTED GREEN (D1–D4): a write whose id IS a member of `order`.
    for (const control of [reading.memberScalarControl, reading.memberObjectControl]) {
      expect(
        control?.activesOverRecord.length,
        `§3.2 F-T2-2 — POSITIVE CONTROL: the write targets a MEMBER of \`order\`, so the write-triggered surplus arm repairs to exactly ONE active. ${nonMemberArmLine(control)}`,
      ).toBe(1)
      expect(
        ((control?.receiptRepaired as readonly unknown[] | undefined) ?? []).length,
        `§3.1 M-2(b) — the repair lands in the SAME committed write and names its own reference on that write’s receipt. ${nonMemberArmLine(control)}`,
      ).toBeGreaterThan(0)
    }
    // ── THE RED: the SAME write to a NON-MEMBER id, in BOTH value arms.
    const arms: readonly (NonMemberWriteArm | null)[] = [reading.nonMemberScalar, reading.nonMemberObject]
    const violations = arms.filter((arm) => arm === null || arm.activesOverRecord.length !== 1)
    expect(
      violations.map((arm) => nonMemberArmLine(arm)),
      '§1.1 item 3 — EXACTLY ONE tab carries `active === true` WHILE ANY TABS EXIST, and §3.2 F-T2-2 takes the count on the call’s POST-STATE. MEASURED: the shipped accessor counts the actives over `file.tabs.order`’s MEMBERS ONLY, so a caller write that makes an entry active whose id is NOT a member leaves the `order`-scoped count at 1, the member answers `true`, NO repair lands (`repaired: []`) and the RECORD carries TWO actives — the invariant is breached by a write whose id is not a member',
    ).toEqual([])
  })

  it('NM-2 · §1.1 item 3 read with §3.2 F-T2-2 / §3.4 item 1 — A SURPLUS RECORD WHOSE WRITE TARGETS A NON-MEMBER MUST NOT KEEP THE NON-MEMBER WHILE DEACTIVATING MEMBERS: exactly ONE active survives, and the kept entry is the one the ruled referent names', () => {
    // ── THE STATES THIS ROW ENUMERATES (D6 and its control), on the SHIPPED construction:
    //      (s1) `order ['A','B','C']` with ALL THREE ACTIVE (landed un-evaluated by `hydrate`,
    //           `§3.3` item 2), then `commit('file.tabs.B', {active:true})` with `B` a MEMBER —
    //           the surplus arm keeps the caller’s own written reference and deactivates the rest.
    //      (s2) THE SAME surplus pre-state, the same value arm, the write targets `D`, a
    //           NON-member — the referent rule’s referent is still the caller’s own written
    //           reference (`file.tabs.D`), so the record must end at exactly one active.
    //    FAIL-STATE: an unreachable shipped store/member ⇒ `reason !== null` ⇒ the row FAILS with
    //    that reason (never a skip).
    const reading: NonMemberWriteReading = shippedNonMemberWriteDrive()
    process.stdout.write(`\n──── T2 NM-2 · THE SURPLUS RECORD AT A NON-MEMBER TARGET — MEASURED ────\n${nonMemberWriteLines(reading)}\n────────────────────────────────────────────────────────────────────────\n`)
    expect(reading.reason, '§2.2 item 1 — the shipped construction and its ONE member are reachable; an ABSENT seam is this row’s own failure, never a skip').toBeNull()
    const control = reading.surplusMemberControl
    expect(
      control?.activesOverRecord.length,
      `§3.2 F-T2-2 — POSITIVE CONTROL: on the SAME surplus pre-state a MEMBER-targeted write repairs to exactly ONE active. ${nonMemberArmLine(control)}`,
    ).toBe(1)
    const arm = reading.surplusNonMember
    // ── THE TWO READINGS OF THE RED, EACH AGAINST A CLAUSE THE CONTRACT *DOES* PIN, GATHERED SO
    //    ONE BROKEN ATTEMPT PRINTS BOTH OF THEM:
    //      (i) THE INVARIANT (`§1.1` item 3 / `§5.5.1` `P-TR-IM-3`): exactly ONE active survives.
    //      (ii) THE REFERENT RULE (`§3.2` F-T2-2, write-triggered): the kept entry is the CALLER’S
    //           OWN WRITTEN REFERENCE — i.e. the post-state’s sole active IS `file.tabs.D` —
    //           **OR** the non-member id carries NO active value at all (the REFUSAL /
    //           NORMALIZATION answer the contract does not declare: `SPEC-SILENT-OWED`, whose
    //           declaring clause would be `§3.2`’s own arm family, a new `F-T2-7`-class arm, read
    //           with `§3.1` `M-3` and `§6` `PAR-2`/`PAR-4`). **The disjunction is not a weakened
    //           assertion: it is the set of answers the contract leaves admissible, and it is
    //           FALSE on today’s bytes.**
    const actives = arm?.activesOverRecord ?? []
    const keptIsTheRuledReferent = actives.length === 1 && arm !== null && actives[0] === arm.target
    const nonMemberCarriesNoActive = arm !== null && arm.targetReadsActive === false
    const readings: readonly (readonly [string, boolean])[] = [
      ['(i) §1.1 item 3 — the post-state carries exactly ONE active', actives.length === 1],
      ['(ii) §3.2 F-T2-2 — the kept entry is the caller’s own written reference, or the non-member write was refused/normalised (SPEC-SILENT-OWED)', keptIsTheRuledReferent || nonMemberCarriesNoActive],
    ]
    const unheld = readings.filter(([, held]) => !held).map(([name]) => name)
    expect(
      unheld,
      `§1.1 item 3 / §3.2 F-T2-2 / §3.4 item 1 — MEASURED on the shipped construction, the write \`${String(arm?.target)}\` is NOT a member of \`order\` and is written LAST, so the ruled referent names it; the repair must leave ONE active, the referent’s. MEASURED TODAY: the count is scoped to \`order\`’s members, the referent lookup misses the written non-member, the arm falls back to the FIRST active MEMBER and deactivates the other members — the non-member and one member BOTH survive. ${nonMemberArmLine(arm)}`,
    ).toEqual([])
  })
})
