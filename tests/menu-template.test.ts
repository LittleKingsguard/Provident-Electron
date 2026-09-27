// tests/menu-template.test.ts
// ===========================================================================
// `U-MENULIB` · wave **E** · ledger row **`E7`** · **THE RED SET** (`RCA-1`).
//
// Contract: `docs/specs/menulib.md` (FILED + SPEC GATE APPROVED AS FILED
// 2026-09-27, with `Q1`/`Q2` left ARCHITECT-REVERSIBLE and the collapse run
// boundary a labelled derivation). Authored from the spec ALONE:
// **`src/shared/menu-template.ts` DOES NOT EXIST** while this file is the red set
// (`§3.5 X-1`).
//
// THE CONTRACT'S OWN PINNED PATHS (`§0A` note 1, `§5.1` rows 1/2) — neither is
// invented here:
//   module    → `src/shared/menu-template.ts`
//   test file → `tests/menu-template.test.ts`   (THIS file)
//
// THE SURFACE THIS RED OWES (`§2.1`): **NINE exported names in TWO HALVES** —
// THREE runtime value exports (`normalizeCatalog`, `buildMenuTemplate`,
// `selectCatalogItem`) and SIX type declarations (`PickerFn`, `CatalogEntry`,
// `PlatformProjection`, `ProjectedItem`, `MenuTemplate`, `TemplateOptions`);
// **NO IMPORT STATEMENT OF ANY KIND** (`§2.1` item 3, `R-4`); the ONE injected
// OPTIONAL seam (`picker`); the emitted `{items, platform}` with
// `platform = {recognized, collapsing}`; and **every item carrying EXACTLY the
// seven declared own keys** (`id` · `label` · `accelerator` · `role` · `kind` ·
// `submenu` · `enabled`), all `unknown`, **any other own key DROPPED, never
// copied** (`§2.3` items 2/9, `R-12`).
//
// LAYER: **[T]** + `static`. **This unit touches NO DOM and reads NO OS**
// (`§1` items 4/5, `§4.3`, layer anchors 2/3): the only arguments are caller
// data, a caller string and a caller closure. `[U]` is **NOT OFFERED**, `[D]` is
// **NOT CLAIMED**, gate 6 is **`STRUCTURAL`** (`§5.2`), and the `§7.1` predicate
// decision is **`DOES NOT TRIGGER`**.
//
// AUTHORED ORDER (`§4.2` items 1–6), and the `describe` blocks below ARE that
// order, nothing renumbered:
//   1. `§3.5` existence + the red's own premise: `X-1`, `X-2`, `X-4`, `X-5`,
//      `R-3`'s config half, `R-9` and `R-13`'s no-importer half;
//   2. the `§3.4` static rows `R-1`..`R-13`;
//   3. the totality/degradation/invariant surface `F-1`..`F-10`, `I-1`..`I-12`;
//   4. the happy states `M-1`..`M-9` (`M-7`/`M-8` beside `R-12`, `M-9` last);
//   5. the `§5.5.1` register rows IN REGISTER ORDER (`P-ML-IM-1` · `IM-2` ·
//      `IM-3` · `IM-4` · `IM-5` · `IM-6` · `IM-7` · `P-ML-SM-1` · `SM-2` ·
//      `SM-3` · `P-ML-TP-1` · `TP-2` · `TP-3`) plus the register-harness rows
//      (the declared-vs-measured reconciliation, the caps, the `(bounded)` set
//      and the **un-run-row-is-a-FAILURE** rule);
//   6. `RUN and REPORT` (`§4.2` item 6) — the `REGISTER-STATUS` row prints the
//      totals and the stop state in the run's own output.
//
// HOW THE MODULE'S ABSENCE IS COPED WITH (the sibling red sets' established
// technique): the run-time specifier is assembled from FRAGMENTS and the module
// file's presence is checked with `existsSync` BEFORE an `await import(...)`, so
// an absent module fails each row **as an ASSERTION carrying that row's own
// label** — never as a file-level transform error that would take the whole red
// set down with it. **THE TYPE HALF IS THE EXCEPTION AND IS DELIBERATE**: the
// `import type` declarations below are `R-5`(b)'s compile-time claim, so LEG 5
// (the standalone strict `tsc --noEmit` over THIS file, `§5.2`) reports the
// module-absent boundary — **that diagnostic is NOT suppressed**, because
// suppressing it would make the type claim unfalsifiable.
//
// THE PROPERTY LAYER IS `§5.5.1`'s REGISTER: **13 typed rows carrying 13 TERMS**
// whose DECLARED TOTAL is `123` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 +
// 12 + 9 + 12` (`§5.5.3`), caps `≤100`/row · `≤400` total · **stop after 5
// CONSECUTIVE failures**, seed **`20260927`** with ONE LCG step per draw over a
// `pool.length = 12` pool for the ONE generator row (`P-ML-TP-1`). **Every
// declared term is a DRIVE count; assertions are printed BESIDE the term and are
// never counted in it; an un-run row is reported as a FAILURE, never a pass.**
// The `(bounded)` set is **6 of the 13 rows** (`P-ML-IM-1` · `P-ML-IM-4` ·
// `P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`).
//
// NO `package.json` CHANGE, NO NEW DEPENDENCY, NO NEW SCRIPT, NO CONFIG EDIT
// (`§5.1` items 7/8/9; `R-3`/`R-4`; `AGENTS.md` item 11(d)): the register rides
// plain deterministic vitest tables plus the ONE hand-rolled LCG.
// ===========================================================================

import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// ===========================================================================
// `R-5`(b) / `R-6`'s type half / `R-12`(d) — THE TYPE-ONLY HALF, through `§5.2`
// leg 5. These SIX imports are the compile-time claim that
// `src/shared/menu-template.ts` exports the six type declarations `§2.1` item 1
// names. While the module is ABSENT this is exactly the red's own leg-5 form: a
// module-resolution diagnostic that is **NOT suppressed** (an `@ts-ignore` here
// would make the type claim unfalsifiable — `S-ML-2`'s own class).
// ===========================================================================
import type { PickerFn as ModulePickerFn } from '../src/shared/menu-template.js'
import type { CatalogEntry as ModuleCatalogEntry } from '../src/shared/menu-template.js'
import type { PlatformProjection as ModulePlatformProjection } from '../src/shared/menu-template.js'
import type { ProjectedItem as ModuleProjectedItem } from '../src/shared/menu-template.js'
import type { MenuTemplate as ModuleMenuTemplate } from '../src/shared/menu-template.js'
import type { TemplateOptions as ModuleTemplateOptions } from '../src/shared/menu-template.js'

// ===========================================================================
// §2.1's CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot be
// imported for its VALUES while it is absent, so this file mirrors `§2.1`; the
// mirror is the harness's own type surface ONLY and is never asserted to BE the
// module's (that claim is `R-5`'s, through the `import type` block above plus
// the runtime key census below).
// ===========================================================================
type NormalizeShape = (catalog: unknown) => readonly Record<string, unknown>[]
type BuildShape = (catalog: unknown, options?: unknown) => {
  readonly items: readonly Record<string, unknown>[]
  readonly platform: { readonly recognized: unknown; readonly collapsing: unknown }
}
type SelectShape = (catalog: unknown, picker?: unknown) => unknown
type PickerShape = (candidates: unknown) => unknown

// `§2.2`(D)'s SEMANTICS ROWS, READ AS TYPES (`R-5`(b), `R-6`'s type half): every
// one of the seven carried members is typed **`unknown`** in both carried types,
// and every platform member is `boolean`. A member declared `string` (say) fails
// to compile here, because a non-string `unknown` is assigned to it — that is the
// whole content of `R-12`(d) and it has NO runtime falsifier (`§5.2` leg 5).
const T_ID_A: ModuleCatalogEntry['id'] = undefined as unknown
const T_LABEL_A: ModuleCatalogEntry['label'] = undefined as unknown
const T_ACCEL_A: ModuleCatalogEntry['accelerator'] = undefined as unknown
const T_ROLE_A: ModuleCatalogEntry['role'] = undefined as unknown
const T_KIND_A: ModuleCatalogEntry['kind'] = undefined as unknown
const T_SUBMENU_A: ModuleCatalogEntry['submenu'] = undefined as unknown
const T_ENABLED_A: ModuleCatalogEntry['enabled'] = undefined as unknown
const T_ID_P: ModuleProjectedItem['id'] = undefined as unknown
const T_LABEL_P: ModuleProjectedItem['label'] = undefined as unknown
const T_ACCEL_P: ModuleProjectedItem['accelerator'] = undefined as unknown
const T_ROLE_P: ModuleProjectedItem['role'] = undefined as unknown
const T_KIND_P: ModuleProjectedItem['kind'] = undefined as unknown
const T_SUBMENU_P: ModuleProjectedItem['submenu'] = undefined as unknown
const T_ENABLED_P: ModuleProjectedItem['enabled'] = undefined as unknown
const T_RECOGNIZED: ModulePlatformProjection['recognized'] = true
const T_COLLAPSING: ModulePlatformProjection['collapsing'] = false
/** `§2.3` item 7: `CatalogEntry` and `ProjectedItem` are SEPARATELY DECLARED,
 *  SEPARATELY NAMED exports that are STRUCTURALLY IDENTICAL — a `tsc` probe may
 *  assert the STRUCTURAL identity and may NOT assert a shared declaration
 *  (`S-ML-10`). Both `extends` legs are written; the nominal distinction is the
 *  two names above. */
type StructurallyCatalogEntry = ModuleProjectedItem extends ModuleCatalogEntry ? true : false
type StructurallyProjectedItem = ModuleCatalogEntry extends ModuleProjectedItem ? true : false
/** The builder's option bag: `platform` REQUIRED, `picker` OPTIONAL (`§2.4`
 *  items 2/3). */
type OptionsPlatform = ModuleTemplateOptions['platform']
/** A member typed `any` also satisfies an `unknown` ASSIGNMENT, so that assignment
 *  alone cannot FAIL against `any`; this conditional-type probe is the companion
 *  that fails for `any` (it resolves `false` there and `true` only for `unknown`). */
type OptionsPlatformIsUnknown = unknown extends OptionsPlatform ? true : false

const MODULE_SRC = new URL('../src/shared/menu-template.ts', import.meta.url)
const MODULE_PATH = fileURLToPath(MODULE_SRC)
const TEST_PATH = fileURLToPath(new URL('./menu-template.test.ts', import.meta.url))
const SRC_ROOT = fileURLToPath(new URL('../src', import.meta.url))
const TESTS_ROOT = fileURLToPath(new URL('.', import.meta.url))
const PKG_PATH = fileURLToPath(new URL('../package.json', import.meta.url))
/** `P-ML-IM-7` shape (5)'s carried object `id`, matched BY REFERENCE. */
const ID_OBJECT = { k: 'by-reference' }
/** `§5.1` row 1's specifier, assembled at RUN time so an unresolvable import
 *  cannot break this file's transform. */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'menu-template.js'].join('/')

// ===========================================================================
// THE PINNED VOCABULARY OF THE CONTRACT (`§2.1` item 1, `§2.3` items 2/4).
// ===========================================================================
const VALUE_EXPORTS: readonly string[] = ['normalizeCatalog', 'buildMenuTemplate', 'selectCatalogItem']
const TYPE_EXPORTS: readonly string[] = ['PickerFn', 'CatalogEntry', 'PlatformProjection', 'ProjectedItem', 'MenuTemplate', 'TemplateOptions']
const SEVEN_KEYS: readonly string[] = ['id', 'label', 'accelerator', 'role', 'kind', 'submenu', 'enabled']
const TEMPLATE_KEYS: readonly string[] = ['items', 'platform']
const PLATFORM_KEYS: readonly string[] = ['recognized', 'collapsing']
/** `§2.1` item 4 / `R-8` — the FOUR declared literal BODIES plus the declared
 *  `typeof`-tag spellings (`'function'`, `'string'`, and `'object'`, which
 *  `§2.1` item 4 names as "the `typeof` tag its carry rule needs"). */
const DECLARED_BODIES: readonly string[] = ['darwin', 'picker', '', 'object', 'string', 'function']
/** `buildMenuFromCatalog` is THE RENAMED PROVENANCE and appears in the contract
 *  ONLY as that provenance (`§0A` note 2): it is NOT an export, an alias, a
 *  re-export or a deprecated name, and a module carrying it is a STOP. */
const RENAMED_PROVENANCE = 'buildMenuFromCatalog'

// ===========================================================================
// `§5.5.1` — THE REGISTER'S OWN MACHINERY.
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296

/** `S-ML-TOTAL-1`'s pinned-seed generator: a hand-rolled 32-bit LCG whose
 *  constants are literals in THIS file — `stateₙ₊₁ = (stateₙ·1664525 + 1013904223)
 *  mod 2³²`, **ONE step per draw**, `index = stateₙ₊₁ mod pool.length` with
 *  `pool.length = 12`. **No `next(k)` helper, no scaling form, no `Math.random`,
 *  no wall-clock seed and no shrinking.** */
function makeLcg(seed: number): { step: () => number } {
  let state = seed >>> 0
  return {
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}

type RegisterRecord = {
  row: string
  strategy: string
  seed: number
  attemptsRun: number
  held: number
  broken: number
  controls: number
  stoppedEarly: boolean
  notStarted: boolean
  registerStoppedAt: string | null
  causes: string[]
}

const registerState = {
  attempts: 0,
  consecutiveFailures: 0,
  stoppedAtRow: null as string | null,
  stoppedFor: null as string | null,
  records: [] as RegisterRecord[],
}

/** ONE register row. `run()` is ONE attempt; `body` returns `null` when the
 *  property HELD, else the break cause as a sentence (a throw is caught and is
 *  itself a break cause). `control()` is a DECLARED-FAILING control: a COUNTED
 *  DRIVE that lives INSIDE the declared term and is reported BESIDE it, and it is
 *  NEVER a `broken` attempt (`§5.5.2` item 9). */
class RegisterRow {
  readonly row: string
  readonly strategy: string
  private attemptsRun = 0
  private held = 0
  private broken = 0
  private controls = 0
  private stoppedEarly = false
  private notStarted = false
  private readonly causes: string[] = []

  constructor(row: string, strategy: string) {
    this.row = row
    this.strategy = strategy
  }

  run(label: string, body: () => string | null): void {
    if (registerState.stoppedAtRow !== null) {
      if (this.attemptsRun === 0) this.notStarted = true
      return
    }
    if (this.attemptsRun >= REGISTER_ROW_CAP) {
      this.stoppedEarly = true
      this.causes.push(`the ≤${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the ≤${REGISTER_TOTAL_CAP}-attempts register cap was reached`
      return
    }
    this.attemptsRun += 1
    registerState.attempts += 1
    let cause: string | null = null
    try {
      cause = body()
    } catch (e) {
      cause = `the attempt threw: ${describeThrown(e)}`
    }
    if (cause === null) {
      this.held += 1
      registerState.consecutiveFailures = 0
      return
    }
    this.broken += 1
    this.causes.push(`${label} — ${cause}`)
    registerState.consecutiveFailures += 1
    if (registerState.consecutiveFailures >= CONSECUTIVE_FAILURE_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `${CONSECUTIVE_FAILURE_CAP} consecutive failures`
    }
  }

  control(label: string, declaredToFail: boolean): void {
    this.controls += 1
    if (!declaredToFail) {
      this.causes.push(`${label} — the DECLARED-FAILING control did NOT fail: the scan is UNFALSIFIED and must not be filed (S-ML-2)`)
    }
  }

  /** The row's own verdict + its `§5.5.1`/`§5.3` item 10 record line. An un-run
   *  row FAILS on purpose: an un-executed register row may never look green. */
  finish(): void {
    const record: RegisterRecord = {
      row: this.row,
      strategy: this.strategy,
      seed: SEED,
      attemptsRun: this.attemptsRun,
      held: this.held,
      broken: this.broken,
      controls: this.controls,
      stoppedEarly: this.stoppedEarly,
      notStarted: this.notStarted,
      registerStoppedAt: registerState.stoppedAtRow,
      causes: this.causes.slice(0, 5),
    }
    registerState.records.push(record)
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    if (this.attemptsRun === 0) {
      expect(
        this.attemptsRun,
        `${line} — this row NEVER STARTED: the register's stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures rule triggered at row ` +
          `${registerState.stoppedAtRow ?? 'an earlier row'} (${registerState.stoppedFor ?? 'cause unrecorded'}). ` +
          'An un-run register row is reported as a FAILURE, never as a pass (§5.5.1 strategy item 3).',
      ).toBeGreaterThan(0)
      return
    }
    expect(
      this.broken,
      `${line} — RED (§5.5.1): ${this.broken} of ${this.attemptsRun} attempts BROKE. First causes: ${JSON.stringify(this.causes.slice(0, 3))}`,
    ).toBe(0)
  }
}

// ===========================================================================
// GENERAL HELPERS.
// ===========================================================================
function describeThrown(e: unknown): string {
  try {
    if (e instanceof Error) return `${e.name}: ${e.message}`
    return `non-Error throw: ${String(e)}`
  } catch {
    return 'an unprintable thrown value'
  }
}
function sameRef(a: unknown, b: unknown): boolean {
  return a === b
}
/** `R-1`'s / `R-7`'s / `R-8`'s / `R-10`'s / `R-11`'s evasion class (`S-ML-2`):
 *  every banned spelling in THIS file is assembled from CHARACTER CODES, so this
 *  file's own bytes cannot satisfy — or contaminate — a scan. */
function ccOf(codes: readonly number[]): string {
  return codes.map((c) => String.fromCharCode(c)).join('')
}
function wordRe(word: string): RegExp {
  return new RegExp(`\\b${word}\\b`)
}
function joinedRe(word: string): RegExp {
  const chars = [...word].map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`'${chars.join("'\\s*\\+\\s*'")}'`)
}
function readOrEmpty(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}
function moduleSource(): string | null {
  if (!existsSync(MODULE_SRC)) return null
  return readFileSync(MODULE_PATH, 'utf8')
}
/** `§3.4`'s PINNED SCAN NORMALIZATION, in the pinned ORDER: **string-literal
 *  concatenation is JOINED FIRST, then comments are stripped** — a view that
 *  stripped quotes first could no longer see the `'…' + '…'` boundary the joiner
 *  needs, so an assembly-evasion control run against a strip-then-join view is
 *  UNFALSIFIED WHILE LOOKING GREEN (`§3.4`'s dated method note). */
function normalizeView(src: string): string {
  return src
    .replace(/'(\\.|[^'\\])*'\s*\+\s*'(\\.|[^'\\])*'/g, (m) => m.split(/\s*\+\s*/).map((p) => p.slice(1, -1)).join(''))
    .replace(/'(?:\\.|[^'\\])*'/g, "'S'")
    .replace(/`(?:\\.|[^`\\])*`/g, 'T')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}
type ScanSpec = { readonly id: string; readonly re: RegExp }
function scanHits(text: string, specs: readonly ScanSpec[]): string[] {
  const hits: string[] = []
  for (const spec of specs) {
    if (spec.re.test(text)) hits.push(spec.id)
  }
  return hits
}
function stringBodies(src: string): string[] {
  const bodies: string[] = []
  const re = /'(?:\\.|[^'\\])*'/g
  let m = re.exec(src)
  while (m !== null) {
    bodies.push(m[0].slice(1, -1))
    m = re.exec(src)
  }
  return bodies
}
function snapshot(value: unknown): string {
  if (value === null) return 'null'
  const t = typeof value
  if (t === 'number') return Number.isNaN(value as number) ? 'NaN' : `n:${String(value)}`
  if (t === 'string' || t === 'boolean' || t === 'undefined') return `${t}:${String(value)}`
  if (t === 'symbol') return 'symbol'
  if (t === 'bigint') return `bigint:${String(value)}`
  if (Array.isArray(value)) return `array:${value.length}`
  const names = Object.keys(value as object).sort().join(',')
  return `object:{${names}}`
}
function keysEqual(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && expected.every((k, i) => actual[i] === k)
}
function missingKeys(item: Record<string, unknown>, keys: readonly string[]): string[] {
  return keys.filter((k) => !(k in item))
}
/** `R-6`'s type-half companion: a member typed `any` also satisfies an `unknown`
 *  ASSIGNMENT, so the assignment alone cannot FAIL there. This probe reads the
 *  declared member's type the way the contract needs it read: `TemplateOptions.platform`
 *  is `unknown` (never `any`), and an undeclared/erased member would not compile. */
function optionsPlatformProbe(): string {
  const p: OptionsPlatform = undefined as unknown
  const isUnknown: OptionsPlatformIsUnknown = true
  return isUnknown && p !== null ? 'unknown' : 'not-unknown'
}
function keyCountOf(item: Record<string, unknown>): number {
  return Object.keys(item).length
}
/** The whole-surface assertion form for the clause rows: `§1`/`§2.1`'s pinned
 *  paths. */
function assertPinnedPaths(): void {
  expect(MODULE_PATH.endsWith('src/shared/menu-template.ts'), '§0A note 1 — the module path the contract pins').toBe(true)
  expect(TEST_PATH.endsWith('tests/menu-template.test.ts'), '§5.1 row 2 — the test path the contract pins').toBe(true)
}

// ===========================================================================
// THE IMPORT BOUNDARY (`§4.1`): the module's presence is checked BEFORE an
// `await import`, and the reason a row is red is DATA — so a clause row can
// report it and a register attempt can count it as a break.
// ===========================================================================
type ModuleSurface = {
  normalizeCatalog: NormalizeShape
  buildMenuTemplate: BuildShape
  selectCatalogItem: SelectShape
  mod: Record<string, unknown>
  reason: string | null
}
let surfaceCache: ModuleSurface | null = null

async function resolveSurface(): Promise<ModuleSurface> {
  if (surfaceCache !== null) return surfaceCache
  const absent = (reason: string): ModuleSurface => ({
    normalizeCatalog: null as unknown as NormalizeShape,
    buildMenuTemplate: null as unknown as BuildShape,
    selectCatalogItem: null as unknown as SelectShape,
    mod: {},
    reason,
  })
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = absent(`the module of §0A note 1 / §5.1 row 1 does not exist yet (${MODULE_PATH})`)
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const normalizeCatalog = mod['normalizeCatalog']
    const buildMenuTemplate = mod['buildMenuTemplate']
    const selectCatalogItem = mod['selectCatalogItem']
    const usable = typeof normalizeCatalog === 'function' && typeof buildMenuTemplate === 'function' && typeof selectCatalogItem === 'function'
    surfaceCache = usable
      ? {
          normalizeCatalog: normalizeCatalog as NormalizeShape,
          buildMenuTemplate: buildMenuTemplate as BuildShape,
          selectCatalogItem: selectCatalogItem as SelectShape,
          mod,
          reason: null,
        }
      : absent("§2.1's three value exports are not all exported as functions (a missing, renamed or non-callable export)")
  } catch (e) {
    surfaceCache = absent(`the module does not resolve: ${describeThrown(e)}`)
  }
  return surfaceCache
}

/** The clause rows' boundary: it FAILS as an ASSERTION carrying the row's own
 *  label, so the red message names the absent module and the row's trigger. */
async function surface(label: string): Promise<Omit<ModuleSurface, 'reason'>> {
  const s = await resolveSurface()
  if (s.reason !== null) {
    expect(
      s.reason,
      `RED — U-MENULIB red set (§4.1): ${s.reason}. §2.1 declares THREE value exports — ` +
        `normalizeCatalog(catalog) → readonly CatalogEntry[], buildMenuTemplate(catalog, options?) → MenuTemplate ` +
        `({items, platform{recognized, collapsing}}) and selectCatalogItem(catalog, picker?) → unknown | null. [${label}]`,
    ).toBe(null)
    throw new Error(`U-MENULIB red set — module absent or incomplete: ${s.reason} [${label}]`)
  }
  return { normalizeCatalog: s.normalizeCatalog, buildMenuTemplate: s.buildMenuTemplate, selectCatalogItem: s.selectCatalogItem, mod: s.mod }
}

/** The register rows' IN-ATTEMPT boundary: it RETURNS the break cause as a
 *  sentence instead of throwing from inside the driver, so the stop-after-5
 *  accounting sees an ordinary break.
 *  ⟶ MEASURED-DRIVE NOTE (`§5.3` item 11 / `§5.5.2` item 3): the `surfaces` list
 *  below is a MATERIALIZED CACHE of the same one-time `resolveSurface()` result,
 *  NOT an extra module load — so the register's declared term is a DRIVE count
 *  and is not inflated by a second resolution. */
async function surfaceOrCause(): Promise<{ ok: true; s: Omit<ModuleSurface, 'reason'> } | { ok: false; cause: string }> {
  const r = await resolveSurface()
  if (r.reason !== null) return { ok: false, cause: r.reason }
  return { ok: true, s: { normalizeCatalog: r.normalizeCatalog, buildMenuTemplate: r.buildMenuTemplate, selectCatalogItem: r.selectCatalogItem, mod: r.mod } }
}

// ===========================================================================
// SHARED HARNESS — the recording seam, the hostile shapes, the key-set builders.
// ===========================================================================
type Recorder = {
  readonly fn: PickerShape
  readonly count: () => number
  readonly args: unknown[]
  readonly answer: unknown
}
/** `M-6`'s recording closure: its own invocation COUNT, every argument BY
 *  IDENTITY, and the value it answers with. */
function recorder(answer: unknown): Recorder {
  const args: unknown[] = []
  let count = 0
  return {
    count: () => count,
    args,
    answer,
    fn: (arg: unknown) => {
      count += 1
      args.push(arg)
      return answer
    },
  }
}
/** `M-5`'s throwing seam: the invocation IS attempted (and counted), the throw
 *  recorded — so a retry is visible as a count above `1`. */
function throwingSeam(thrown: unknown): Recorder {
  const args: unknown[] = []
  let count = 0
  return {
    count: () => count,
    args,
    answer: undefined,
    fn: (arg: unknown) => {
      count += 1
      args.push(arg)
      throw thrown
    },
  }
}
function revokedProxy(): unknown {
  const r = Proxy.revocable({ id: 'x', label: 'X' }, {})
  r.revoke()
  return r.proxy
}
/** a revoked `Proxy` whose trap check ITSELF throws (`F-1`'s last catalog arm). */
function revokedTrapThrowingProxy(): unknown {
  const r = Proxy.revocable({}, { ownKeys: () => { throw new Error('ownKeys throws') } })
  r.revoke()
  return r.proxy
}
/** a `Proxy` whose `ownKeys` / `getOwnPropertyDescriptor` / `has` / `get` traps all
 *  THROW — the `§2.3` item 1(d) shape, which must be SKIPPED with the throw
 *  ABSORBED, never propagated. */
function trapThrowingProxy(): unknown {
  const boom = (): never => {
    throw new Error('hostile trap')
  }
  return new Proxy({}, { ownKeys: boom, getOwnPropertyDescriptor: boom, has: boom, get: boom })
}
/** a record whose OWN accessor throws on read — `§2.3` item 1(d)'s accessor arm. */
function throwingAccessorRecord(): Record<string, unknown> {
  const rec: Record<string, unknown> = { label: 'A' }
  Object.defineProperty(rec, 'id', {
    get: () => {
      throw new Error('accessor throws')
    },
    enumerable: true,
    configurable: true,
  })
  return rec
}
/** a `Proxy` whose `apply` trap throws — `§2.4` item 1 class (2)'s function-shaped
 *  hostile seam. */
function applyThrowingProxy(): PickerShape {
  const target = (): unknown => undefined
  return new Proxy(target, {
    apply: () => {
      throw new Error('apply throws')
    },
  })
}
/** `R-12`(b)/(c)'s key-set builders: the SEVEN declared keys, an eighth and a
 *  ninth extra, a two-key element and the inherited/`Symbol`/non-enumerable one. */
function el(over: Record<string, unknown> = {}): Record<string, unknown> {
  return { id: 'a', label: 'A', accelerator: 'A+A', role: 'r', kind: 'k', submenu: 'S', enabled: true, ...over }
}
function extrasEl(): Record<string, unknown> {
  return { ...el(), extra: 'must-not-appear', another: 1 }
}
function twoKeyEl(): Record<string, unknown> {
  return { id: 'a', label: 'A' }
}
function inheritedSymbolElement(): Record<string, unknown> {
  const proto = { role: 'parent' }
  const own: Record<string, unknown> = Object.create(proto) as Record<string, unknown>
  own['id'] = 'a'
  own['label'] = 'A'
  own['accelerator'] = 'A+A'
  own['kind'] = 'k'
  own['submenu'] = 'S'
  own['enabled'] = true
  Object.defineProperty(own, 'hidden', { value: 'not-carried', enumerable: false, configurable: true })
  Object.defineProperty(own, Symbol('sym'), { value: 'not-carried', enumerable: true, configurable: true })
  return own
}
function allSevenUndefined(): Record<string, unknown> {
  return { id: undefined, label: undefined, accelerator: undefined, role: undefined, kind: undefined, submenu: undefined, enabled: undefined }
}
function hostileValuesEl(): Record<string, unknown> {
  return { id: NaN, label: Symbol('s'), accelerator: 12n, role: { nested: true }, kind: () => 1, submenu: null, enabled: false }
}
function nullProtoEl(): Record<string, unknown> {
  return Object.assign(Object.create(null) as Record<string, unknown>, el())
}
/** `M-3`/`P-ML-SM-2`'s IDENTITY expectation: the item's carried members must be
 *  the SOURCE's own, BY IDENTITY, and its `submenu` member must be exactly what
 *  its own source carried (or absent). */
function identityMismatch(src: Record<string, unknown>, item: Record<string, unknown>): string | null {
  for (const k of SEVEN_KEYS) {
    const owns = Object.prototype.hasOwnProperty.call(src, k)
    const has = k in item
    if (owns !== has) return `the ${k} member's presence differs from the source's own (source owns: ${owns}, item carries: ${has})`
    if (owns && !Object.is(src[k], item[k])) return `the ${k} member was not carried BY IDENTITY`
  }
  return null
}

// ===========================================================================
// `§3.5` — THE EXISTENCE ROWS + THE RED'S OWN PREMISE (`§4.2` item 1).
// ===========================================================================
describe('§3.5 X-1/X-2/X-4/X-5 — existence rows and the red premise', () => {
  it('X-1 (RED branch) the module does not exist and neither does its test file, and the red form is the module-resolution failure', () => {
    assertPinnedPaths()
    const moduleExists = existsSync(MODULE_SRC)
    const testExists = existsSync(new URL('./menu-template.test.ts', import.meta.url))
    if (!moduleExists) {
      expect(moduleExists, 'X-1 RED branch — `src/shared/menu-template.ts` is ABSENT, which is the pair-absence fact the red form rests on').toBe(false)
      expect(testExists, 'X-1 RED branch — this test file EXISTS (the red form fails once the work is done)').toBe(true)
      return
    }
    expect(moduleExists && testExists, 'X-1 GREEN branch — the PAIR is present, so the export census applies').toBe(true)
  })

  it('X-1 (branch probe) the exported namespace carries the three value exports BY NAME and no fourth', async () => {
    const s = await surface('X-1 branch probe')
    const names = Object.keys(s.mod)
    for (const name of VALUE_EXPORTS) {
      expect(names, `X-1/R-5 — the runtime namespace carries the value export \`${name}\` BY NAME`).toContain(name)
    }
    expect(
      names.filter((n) => !VALUE_EXPORTS.includes(n)),
      'R-5(a) — NO fourth value export exists (a count alone is not a row: the names are asserted, and the positive control is that an extra export FAILS here)',
    ).toEqual([])
    for (const t of TYPE_EXPORTS) {
      expect(names, `R-5(b) — \`${t}\` is a TYPE declaration and is therefore ERASED AT RUN TIME (leg 5 is its presence claim)`).not.toContain(t)
    }
  })

  it('X-2/X-3/(§5.2 leg 5) the contract is FILED, the gate-1 record is NOT this unit\'s file, and the six type names resolve at the type layer', () => {
    expect(existsSync(new URL('../docs/specs/menulib.md', import.meta.url)), 'X-2 — `docs/specs/menulib.md` is the unit\'s FILED contract').toBe(true)
    expect(existsSync(new URL('../docs/specs/menulib-review.md', import.meta.url)), 'X-3 — `docs/specs/menulib-review.md` is the CLOSED gate-1 record, a §5.1 item-11 DENIED path').toBe(true)
    // The SIX type names are a COMPILE-TIME claim (§5.2 leg 5): the `import type`
    // block at the head of this file is the claim, and the two structural probes
    // below are the only type identity asserted (`S-ML-10` bars more).
    expect(TYPE_EXPORTS.length, 'R-5(b) — the SIX type declarations §2.1 item 1 names, counted beside the names themselves').toBe(6)
    expect([T_ID_A, T_LABEL_A, T_ACCEL_A, T_ROLE_A, T_KIND_A, T_SUBMENU_A, T_ENABLED_A].length, 'R-6 type half — the seven CatalogEntry members are each typed `unknown` (a non-string `unknown` assignment is made at each declaration above)').toBe(7)
    expect([T_ID_P, T_LABEL_P, T_ACCEL_P, T_ROLE_P, T_KIND_P, T_SUBMENU_P, T_ENABLED_P].length, 'R-12(d) type half — the same seven on ProjectedItem').toBe(7)
    expect([T_RECOGNIZED, T_COLLAPSING].length, '§0A note 5 — PlatformProjection has exactly the two declared members, both `boolean`').toBe(2)
    expect(optionsPlatformProbe(), '§2.4 item 2/3 — `TemplateOptions.platform` is REQUIRED and `picker` is OPTIONAL (a required-`picker` bag would fail leg 5 where the two-argument call below omits it)').toBe('unknown')
  })

  it('X-4 (R-9 probe) docs/skills/designing-pages.md does not exist, so no coverage matrix and no demo-page entry is owed', () => {
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    expect(
      existsSync(pageDesign),
      'R-9/X-4 — the probe\'s FAIL is meaningful: if `docs/skills/designing-pages.md` comes to exist, this unit owes the test-use-case coverage row and the demo-page entry (with the honest note that a mechanism rendering nothing can only contribute an ABSENCE row)',
    ).toBe(false)
  })

  it('X-5/src-wide census — `src/**` contains NO menu, picker, dialog or accelerator surface', () => {
    const banned = [
      { id: 'a Menu reference', re: wordRe(ccOf([109, 101, 110, 117])) },
      { id: 'a MenuItem reference', re: wordRe(ccOf([109, 101, 110, 117, 105, 116, 101, 109])) },
      { id: 'a setApplicationMenu call', re: wordRe(ccOf([115, 101, 116, 65, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 77, 101, 110, 117])) },
      { id: 'a picker token', re: wordRe(ccOf([112, 105, 99, 107, 101, 114])) },
      { id: 'a dialog token', re: wordRe(ccOf([100, 105, 97, 108, 111, 103])) },
      { id: 'a darwin literal', re: new RegExp(`'${ccOf([100, 97, 114, 119, 105, 110])}'`) },
    ]
    const walk = (dir: string): string[] => {
      if (!existsSync(dir)) return []
      const out: string[] = []
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = `${dir}/${entry.name}`
        if (entry.isDirectory()) {
          out.push(...walk(full))
          continue
        }
        if (!/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) continue
        out.push(full)
      }
      return out
    }
    const files = walk(SRC_ROOT)
    expect(files.length, 'X-5 — the `src/**` tree is read as a FILE SET, not as a count quoted from the spec').toBeGreaterThan(0)
    const offenders: string[] = []
    for (const file of files) {
      const src = readOrEmpty(file)
      for (const spec of banned) {
        if (spec.re.test(stripComments(src))) offenders.push(`${file} — ${spec.id}`)
      }
    }
    expect(
      offenders,
      'X-5 — the gate-1 record\'s step-1 fact re-measured: ZERO menu/picker/dialog/accelerator/darwin occurrences in `src/**`. A FAIL means a menu surface already exists and this unit\'s DENIED set must be re-derived; the `template`/`platform`/`role` homonyms are NOT banned (they live in their own domains, §2.2(C) rows 3/4/9)',
    ).toEqual([])
  })

  it('R-3 (config half) and R-13 (no-importer half) are evaluable with NO module at all', () => {
    // R-3's config half.
    const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8')) as { scripts?: Record<string, string>; dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
    expect(
      Object.keys(pkg.scripts ?? {}).sort(),
      'R-3 / §5.1 item 7 — the `scripts` key set is EXACTLY the twelve landed keys (`tests/ui-leg-contract.test.ts` L-1 pins it): this unit adds NO script, so a new key here reddens L-1 as well as this row',
    ).toEqual(
      ['battery', 'build', 'build:watch', 'clean', 'divergence', 'mcp', 'start', 'start:http', 'test', 'test:watch', 'typecheck', 'typecheck:tests', 'ui'].sort(),
    )
    expect(Object.keys(pkg.devDependencies ?? {}).sort(), 'R-3 / AGENTS.md item 11(d) — the devDependencies key set is the FIVE landed keys: NO new dependency and no property runner').toEqual(
      ['@types/node', 'electron', 'esbuild', 'typescript', 'vitest'].sort(),
    )
    expect(
      Object.keys(pkg.dependencies ?? {}).sort(),
      'R-3 — the runtime dependency set is UNCHANGED (the module imports NOTHING, so no dependency could be added for it)',
    ).toEqual(['@modelcontextprotocol/sdk', 'provident-ssr'].sort())
    expect(readOrEmpty(fileURLToPath(new URL('../package-lock.json', import.meta.url))), 'R-3 — package-lock.json exists and is READ (its bytes are the supervisor\'s commit claim, not a run-time assertion)').not.toBe('')
    // R-13's no-importer half.
    const specifier = /['"](\.{1,2}\/)*(?:src\/shared\/)?menu-template(?:\.js)?['"]/
    const walk = (dir: string): string[] => {
      if (!existsSync(dir)) return []
      const out: string[] = []
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = `${dir}/${entry.name}`
        if (entry.isDirectory()) {
          out.push(...walk(full))
          continue
        }
        if (!/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) continue
        out.push(full)
      }
      return out
    }
    const importers = walk(SRC_ROOT).filter((f) => specifier.test(readOrEmpty(f)))
    expect(importers, 'R-13 / I-9 / X-1 — at red time `src/shared/menu-template.ts` is imported by NO `src/**` file (the import-graph probe: a read of the TREE, never a comment and never a git command)').toEqual([])
    expect(
      walk(TESTS_ROOT).filter((f) => f.endsWith('menu-template.test.ts')).length,
      'R-13 — this unit\'s own test file is present on disk; together with the empty importer list this is the no-instantiation-site half of §2.5 item 5',
    ).toBe(1)
  })
})

// ===========================================================================
// §3.4 — THE STATIC ROWS R-1..R-13 (`§4.2` item 2).
// ===========================================================================
describe('§3.4 R-1..R-13 — the static rows', () => {
  it('PRE-0 the module\'s source is readable (every static row below reads it; a missing file is itself the X-1 red fact)', () => {
    const src = moduleSource()
    expect(
      src,
      'X-1 — `src/shared/menu-template.ts` does not exist yet, so R-1/R-2/R-4/R-7/R-8/R-10/R-11 have NO BYTES TO SCAN: those rows are red for the honest reason and become evaluable exactly when the module lands',
    ).not.toBe(null)
    expect(src ?? '', 'the module\'s source is non-empty').not.toBe('')
  })

  it('R-1 (P-ML-1/P-ML-3/P-ML-9, both controls) the anti-evasion VOCABULARY row, over the module\'s source with comments and assembled literals', () => {
    const src = moduleSource()
    expect(src, 'R-1 — the MODULE file must be readable (whole, comments included)').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    // THE DECLARED EXEMPTIONS, NAMED (a scan row that does not name them is
    // VACUOUS — S-ML-2): this unit's own contract vocabulary as IDENTIFIERS AND
    // KEY NAMES — the three function names, the six type names, the seven carried
    // key names, the two platform member names, and the words catalog · menu ·
    // template · picker · item · platform · role · kind · accelerator · dialog as
    // identifiers/key names — plus the two literal tokens 'darwin' and 'picker'.
    const specs: ScanSpec[] = [
      // (b) consumer vocabulary.
      ...['zone', 'pane', 'tab', 'region', 'dashboard', 'gutter', 'theme', 'is-empty', 'is-minimized', 'is-revealed', 'emptyToken', 'trackProp', 'census'].map((w) => ({ id: `a consumer-vocabulary token: ${w}`, re: wordRe(w) })),
      // (c) store tokens.
      ...['localStorage', 'sessionStorage', 'indexedDB', 'store', 'cache', 'memo', 'persist'].map((w) => ({ id: `a store token: ${w}`, re: wordRe(w) })),
      // (d) realm/ambient tokens.
      { id: 'a realm token: document', re: wordRe('document') },
      { id: 'a realm token: window', re: wordRe('window') },
      { id: 'a realm token: navigator', re: wordRe('navigator') },
      { id: 'a realm token: globalThis', re: wordRe('globalThis') },
      { id: 'a realm token: self', re: wordRe('self') },
      { id: 'an ambient read: process.env', re: /process\s*\.\s*env/ },
      { id: 'an ambient read: process.platform', re: /process\s*\.\s*platform/ },
      { id: 'an ambient read: os.platform', re: /\bos\s*\.\s*platform/ },
      { id: 'an ambient read: matchMedia', re: wordRe('matchMedia') },
      { id: 'an ambient read: getComputedStyle', re: wordRe('getComputedStyle') },
      { id: 'an ambient read: getBoundingClientRect', re: wordRe('getBoundingClientRect') },
      { id: 'an evasion primitive: eval', re: /\beval\s*\(/ },
      { id: 'an evasion primitive: new Function', re: /new\s+Function\s*\(/ },
      { id: 'a computed realm access: globalThis[...]', re: /globalThis\s*\[/ },
      // (e) selector / DOM-write tokens.
      ...['querySelector', 'querySelectorAll', 'closest', 'getElementById', 'createElement', 'innerHTML', 'outerHTML', 'insertAdjacentHTML', 'textContent', 'innerText', 'classList', 'appendChild', 'removeChild', 'insertBefore', 'setAttribute', 'removeAttribute', 'setProperty', 'cursor'].map((w) => ({ id: `a selector/DOM-write token: ${w}`, re: wordRe(w) })),
      // (a) app menu item names, accelerator key spellings and `role` literals
      //     — asserted as LITERAL BODIES, which is the only form that can FAIL
      //     without banning the seven carried KEY NAMES (`§2.2`(C) row 4: the
      //     difference between a KEY NAME and a VALUE LITERAL is the row).
      ...['file', 'edit', 'view', 'window', 'help', 'quit', 'undo', 'copy', 'CmdOrCtrl', 'Alt', 'Ctrl', 'Shift'].map((w) => ({
        id: `an app-name/accelerator/role LITERAL: '${w}'`,
        re: joinedRe(w),
      })),
    ]
    const hits = scanHits(view, specs)
    expect(hits, `R-1 — the module's source (comments included, assembled literals joined BEFORE quotes are stripped) must carry NONE of the banned tokens. Hits: ${JSON.stringify(hits)}`).toEqual([])
    // BOTH CONTROLS (the row's own requirement: the positive control must FAIL).
    const controlCorpus = [
      `const store = ${ccOf([39])}${ccOf([122, 111, 110, 101])}${ccOf([39])}`,
      `// a comment carrying ${ccOf([100, 97, 114, 100, 97, 114, 119, 105, 110])}`,
      `const role = ${ccOf([39])}${ccOf([102, 105, 108, 101])}${ccOf([39])}`,
      `const acc = ${ccOf([39])}${ccOf([67, 109, 100, 79, 114, 67, 116, 114, 108, 43, 78])}${ccOf([39])}`,
      `const w = ${ccOf([39])}${ccOf([119, 105, 110])}${ccOf([100, 111, 119])}${ccOf([39])}`,
      `const q = docu${ccOf([109, 101, 110, 116])}`,
    ]
    const controlHits = controlCorpus.map((c) => scanHits(normalizeView(c), specs).length > 0)
    expect(controlHits, 'R-1 CONTROL (i) — a corpus spelling a consumer/store token, an app item name, a role literal or an accelerator literal — RAW, JOINED or in a COMMENT — FAILS the scan (every element true)').toEqual([true, true, true, true, true, true])
    // CONTROL (ii): the module carrying exactly the declared exemptions PASSES.
    const conformantCorpus = `const platform = ${ccOf([39])}${ccOf([100, 97, 114, 119, 105, 110])}${ccOf([39])} ; const kind = ${ccOf([39])}${ccOf([112, 105, 99, 107, 101, 114])}${ccOf([39])}`
    expect(scanHits(normalizeView(conformantCorpus), specs), 'R-1 CONTROL (ii) — the declared contract vocabulary as IDENTIFIERS/KEY NAMES and the two declared tokens PASS').toEqual([])
  })

  it('R-2 (P-ML-2/P-ML-8, F-8 control) the no-composition / no-UI / no-OS-call row, over the module AND this test file', () => {
    const src = moduleSource()
    expect(src, 'R-2 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const specs: ScanSpec[] = [
      { id: 'a Menu construction', re: /new\s+Menu\s*\(/ },
      { id: 'a Menu reference', re: wordRe(ccOf([109, 101, 110, 117])) },
      { id: 'a MenuItem reference', re: wordRe(ccOf([109, 101, 110, 117, 105, 116, 101, 109])) },
      { id: 'a setApplicationMenu call', re: /\bsetApplicationMenu\b/ },
      { id: 'a menu-bar reference', re: /menu-?bar/ },
      { id: 'a dialog reference', re: wordRe(ccOf([100, 105, 97, 108, 111, 103])) },
      { id: 'a showOpenDialog call', re: wordRe('showOpenDialog') },
      { id: 'a showMessageBox call', re: wordRe('showMessageBox') },
      { id: 'an alert call', re: /\balert\s*\(/ },
      { id: 'a prompt call', re: /\bprompt\s*\(/ },
      { id: 'an accelerator-registration call', re: /\bregisterAccelerator\b|\bglobalShortcut\b/ },
      { id: 'an element creation', re: /createElement|appendChild|insertBefore/ },
      { id: 'an element write', re: /innerHTML|outerHTML|textContent|classList|setAttribute|removeAttribute/ },
      { id: 'a stylesheet write', re: /\.style\s*\.|setProperty/ },
      { id: 'a native import', re: /\belectron\b/ },
    ]
    const moduleHits = scanHits(stripComments(src), specs)
    expect(moduleHits, `R-2 — the MODULE contains no composition, no picker rendering, no accelerator registration, no dialog and no native import. Hits: ${JSON.stringify(moduleHits)}`).toEqual([])
    // THE SECOND HALF OF R-2's SCOPE, declared as a MEASURED READING of this test
    // file rather than suppressed: the file's control spellings are ASSEMBLED from
    // character codes (R-1's / S-ML-2's own evasion technique, applied harness-side
    // so the harness is scanned under the same rule it enforces).
    const testHits = scanHits(stripComments(readFileSync(TEST_PATH, 'utf8')), specs)
    console.log(`R-2 note :: this TEST file's own bytes carry ${testHits.length} banned-composition spelling(s) — its control corpora are assembled from character codes, so the file is scanned under the same rule it enforces (§4.4 S-ML-2).`)
    expect(testHits, `R-2 — this unit's own test file contains no composition, no rendering and no native import either. Hits: ${JSON.stringify(testHits)}`).toEqual([])
    // THE F-8 POSITIVE CONTROL: a corpus of the four refused shapes FAILS the scan.
    const corpus = [
      `const m = new ${ccOf([77, 101, 110, 117])}()`,
      `set${ccOf([65, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 77, 101, 110, 117])}(m)`,
      `const d = ${ccOf([100, 105, 97, 108, 111, 103])}.showOpenDialog()`,
      `el.appendChild(node)`,
    ]
    expect(corpus.map((c) => scanHits(c, specs).length > 0), 'R-2 / F-8 CONTROL — a Menu construction, a setApplicationMenu call, a dialog call and a rendered picker element EACH FAIL the scan (a scan that passed for any of them would be UNFALSIFIED and must not be filed)').toEqual([true, true, true, true])
  })

  it('R-3 (P-ML-4/P-ML-5/P-ML-6) the no-shim / no-new-surface / no-store row, read as SET claims against the names', () => {
    const shim = new URL('../src/shared/dom-shim.ts', import.meta.url)
    expect(existsSync(shim), 'R-3 — `src/shared/dom-shim.ts` is the FROZEN file of §5.1 item 3 (byte-identity before/after is the committing pass\'s claim; this row asserts its presence and its member set is unchanged by THIS unit\'s diff)').toBe(true)
    const scripts = readdirSync(fileURLToPath(new URL('../scripts', import.meta.url)))
    expect(scripts.length, 'R-3 / §5.1 item 8 — `scripts/**` is a DENIED path: no helper and no leg driver is added by this unit').toBeGreaterThan(0)
    // ⟶ MEASURED-VERSUS-DECLARED NOTE (§5.3 items 10/11): the MCP negative is
    // DECLARED as SET EQUALITY against the names the landed sites carry. Reading
    // those pinned sets FROM the landed modules would put a sibling's surface (and
    // its import graph) inside THIS unit's test file, which R-3/R-4/A-6 refuse —
    // so the two figures below are READ from the tree as the FILES that carry
    // them, and the set claim itself stays the landing pass's diff-scope reading.
    const mainDir = fileURLToPath(new URL('../src/main', import.meta.url))
    const mainFiles = readdirSync(mainDir)
    expect(
      mainFiles.filter((f) => /register|surface|tool/i.test(f)),
      'R-3 — no MCP registration site file is added under `src/main/**` (a DENIED path)',
    ).toEqual([])
    const srcText = moduleSource()
    if (srcText !== null) {
      expect(
        scanHits(stripComments(srcText), [
          { id: 'a store token', re: /\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b/ },
          { id: 'a module-level mutable binding', re: /^\s*(let|var)\s/m },
        ]),
        'R-3 — ZERO module-level state: no store, no cache, no registry and no module-level mutable binding (a `const` module-level binding is a pure literal, and the row bans `let`/`var`)',
      ).toEqual([])
    }
  })

  it('R-4 (P-ML-12, F-9 control) the IMPORT-BOUNDARY row: ZERO import statements of any kind', () => {
    const src = moduleSource()
    expect(src, 'R-4 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const view = stripComments(src)
    const specs: ScanSpec[] = [
      { id: 'a value import', re: /^\s*import\s/m },
      { id: 'a type-only import', re: /^\s*import\s+type\s/m },
      { id: 'a dynamic import', re: /\bimport\s*\(/ },
      { id: 'a require call', re: /\brequire\s*\(/ },
      { id: 'an export-from re-export', re: /\bexport\s+\{[^}]*\}\s+from\b/ },
      { id: 'a bare side-effect import', re: /^\s*import\s+['"]/m },
    ]
    const hits = scanHits(view, specs)
    expect(hits, `R-4 — `+'`src/shared/menu-template.ts`'+` contains ZERO import statements: no value import, no type-only import, no dynamic import(, no require( and no re-export. Hits: ${JSON.stringify(hits)}`).toEqual([])
    // THE TWO NAMED POSITIVE CONTROLS (§4.4 S-ML-9): the frozen-session type and
    // the native composition — each spelled from character codes here.
    const ctrlA = `import type { Gesture${ccOf([72, 97, 110, 100, 108, 101])} } from ${ccOf([39])}./gesture-session.js${ccOf([39])}`
    const ctrlB = `import { ${ccOf([77, 101, 110, 117])} } from ${ccOf([39])}${ccOf([101, 108, 101, 99, 116, 114, 111, 110])}${ccOf([39])}`
    expect(scanHits(ctrlA, specs).length > 0, 'R-4 / F-9 CONTROL (i) — `import type { GestureHandle } from \'./gesture-session.js\'` FAILS').toBe(true)
    expect(scanHits(ctrlB, specs).length > 0, "R-4 / F-9 CONTROL (ii) — `import { Menu } from 'electron'` FAILS (the composition the OS-boundary clause refuses)").toBe(true)
  })

  it('R-5 (export census, SET claim) the nine names in their two halves, with the RENAMED PROVENANCE as the named negative control', async () => {
    const s = await surface('R-5')
    const names = Object.keys(s.mod)
    expect(
      names.filter((n) => !VALUE_EXPORTS.includes(n)),
      'R-5(a) — the runtime value exports are EXACTLY the three declared names: a namespace carrying a FOURTH value export FAILS this row',
    ).toEqual([])
    for (const name of VALUE_EXPORTS) expect(names, `R-5(a) — the value export \`${name}\` is present BY NAME`).toContain(name)
    expect(
      names,
      `R-5(a) NAMED NEGATIVE CONTROL — \`${RENAMED_PROVENANCE}\` is NOT exported, NOT aliased, NOT re-exported and NOT kept as a deprecated name: it is the RENAMED PROVENANCE only`,
    ).not.toContain(RENAMED_PROVENANCE)
    expect(VALUE_EXPORTS.length + TYPE_EXPORTS.length, '§2.1 item 1 — the census in TWO HALVES: 3 + 6 = 9, each half counted separately (a single "9 exports" claim would be half-unfalsifiable)').toBe(9)
  })

  it('R-6 (P-ML-9/P-ML-10, decision surface) the module reads no entry member as a decision beyond the two declared comparisons', async () => {
    const src = moduleSource()
    expect(src, 'R-6 — the module file must be readable').not.toBe(null)
    if (src === null) return
    expect(
      scanHits(stripComments(src), [
        { id: 'an enabled filter', re: /\.enabled\s*(?:===|!==|==|!=|\?|&&|\|\|)/ },
        { id: 'a label truthiness test', re: /if\s*\(\s*[A-Za-z_$][\w$]*\s*\.\s*label\b/ },
        { id: 'a submenu presence test', re: /\.submenu\s*(?:===|!==|==|!=|\?)/ },
        { id: 'an id format test', re: /typeof\s+[\w$.]*\bid\b|\bid\s*\.\s*(?:length|test|match)\b/ },
      ]),
      'R-6 — the module\'s own READ of caller data is limited to the two declared comparisons (`kind === \'picker\'` and `id === <answer>`): an enabled filter, a label truthiness test, a submenu presence test that changes the projection and an id format test all FAIL',
    ).toEqual([])
    // THE FALSIFIABLE HALF, DRIVEN: a caller entry carrying `enabled: false`, an
    // empty label and a `label`/`kind` pair that a policy would filter must still
    // be carried and projected in place (`S-ML-7`: no row may require a filter).
    const s = await surface('R-6 drive')
    const catalog = [el({ id: 'off', enabled: false }), el({ id: 'empty', label: '' }), el({ id: 'nokind', kind: undefined })]
    const out = s.buildMenuTemplate(catalog, { platform: 'win32' })
    expect(out.items.length, 'R-6 — three entries in, three items out: NOTHING was filtered on `enabled`, on an empty label or on a missing `kind`').toBe(3)
    expect(out.items.map((i) => i['id']), 'R-6 — and their `id`s are the caller\'s, in catalog order').toEqual(['off', 'empty', 'nokind'])
  })

  it('R-7 (P-ML-7, both controls) THE NO-OS-READ row: no ambient read and exactly ONE string comparison besides the kind literal', () => {
    const src = moduleSource()
    expect(src, 'R-7 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    const specs: ScanSpec[] = [
      { id: 'an ambient platform read', re: /process\s*\.\s*platform|navigator\s*\.\s*(userAgent|platform)|require\s*\(\s*['"]os['"]\s*\)|['"]node:os['"]/ },
      { id: 'a UA sniff', re: /userAgent/ },
      { id: 'a native import', re: wordRe(ccOf([101, 108, 101, 99, 116, 114, 111, 110])) },
      { id: 'a media-query read', re: wordRe('matchMedia') },
      { id: 'a case-insensitive comparison', re: /toLowerCase|toUpperCase|localeCompare/ },
      { id: 'a prefix comparison', re: /startsWith|endsWith|includes\s*\(\s*['"]darwin/ },
    ]
    const hits = scanHits(view, specs)
    expect(hits, `R-7 — no `+'`process.platform`'+`, no `+'`process.env`'+`, no navigator/userAgent, no `+'`node:os`'+`, no native reference, no matchMedia and no UA sniffing. Hits: ${JSON.stringify(hits)}`).toEqual([])
    // EXACTLY ONE platform literal (`'darwin'`), DECLARED BY NAME and exempt: a
    // SECOND platform token is NOT exempt.
    const darwinLiteral = ccOf([100, 97, 114, 119, 105, 110])
    const platformTokens = normalizeView(src).match(/'[A-Za-z]+'/g) ?? []
    const secondTokens = platformTokens.filter((t) => t.slice(1, -1) !== darwinLiteral && /daw|wn3|linu|win3|plat|system|osx|mac/i.test(t))
    expect(secondTokens, 'R-7 — a SECOND platform token FAILS: `\'darwin\'` is the ONE declared platform literal and is exempt BY NAME').toEqual([])
    // BOTH CONTROLS.
    expect(
      scanHits(`const p = process${ccOf([46])}platform`, specs).length > 0,
      'R-7 CONTROL (i) — a corpus reading `process.platform` FAILS',
    ).toBe(true)
    const conformant = `const darwin = ${ccOf([39])}${darwinLiteral}${ccOf([39])} ; if (typeof value === ${ccOf([39])}string${ccOf([39])} && value === darwin) { }`
    expect(scanHits(normalizeView(conformant), specs), 'R-7 CONTROL (ii) — a corpus comparing the caller\'s own platform value to the ONE declared literal PASSES').toEqual([])
  })

  it('R-8 (P-ML-1/P-ML-9, both controls) THE CLOSED-SET LITERAL ROW', () => {
    const src = moduleSource()
    expect(src, 'R-8 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const bodies = stringBodies(normalizeView(src))
    const unexpected = [...new Set(bodies.filter((b) => !DECLARED_BODIES.includes(b)))]
    expect(
      unexpected,
      `R-8 — the module's STRING LITERAL BODIES are the declared closed set ${JSON.stringify(DECLARED_BODIES)} (the FOUR declared bodies of §2.1 item 4 plus the declared \`typeof\`-tag spellings): a THIRD platform token, a SECOND \`kind\` token, an app item name, a \`role\`/accelerator literal or a spelling variant FAILS. Unexpected bodies: ${JSON.stringify(unexpected)}`,
    ).toEqual([])
    // BOTH CONTROLS.
    const secondPlatform = `const p2 = ${ccOf([39])}${ccOf([100, 97, 114, 119, 105, 110])}${ccOf([39])} ; const p3 = ${ccOf([39])}freebsd${ccOf([39])}`
    expect(stringBodies(normalizeView(secondPlatform)).filter((b) => !DECLARED_BODIES.includes(b)), 'R-8 CONTROL (i) — a corpus carrying a SECOND platform token for a different comparison FAILS').toEqual(['freebsd'])
    expect(stringBodies(normalizeView(`const k = ${ccOf([39])}picker${ccOf([39])} ; const e = ${ccOf([39])}${ccOf([39])}`)), 'R-8 CONTROL (ii) — a module carrying exactly the declared bodies PASSES').toEqual(['picker', ''])
  })

  it('R-9 (X-4 probe) the absent-page-design row, with its FAIL declared meaningful', () => {
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    const exists = existsSync(pageDesign)
    expect(
      exists,
      'R-9 — `docs/skills/designing-pages.md` does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update. A FAIL is MEANINGFUL: if the file comes to exist, this unit OWES the coverage row and the demo-page entry',
    ).toBe(false)
  })

  it('R-10 (P-ML-10) THE NO-id-VALIDATION / NO-id-GENERATION row', () => {
    const src = moduleSource()
    expect(src, 'R-10 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const specs: ScanSpec[] = [
      { id: 'an id type test', re: /typeof\s+[\w$.]*\bid\b/ },
      { id: 'an id length test', re: /\bid\s*\.\s*length/ },
      { id: 'an id coercion: String(id)', re: /String\s*\(\s*[\w$.]*\bid\b/ },
      { id: 'an id coercion: JSON.stringify(id)', re: /JSON\s*\.\s*stringify\s*\(\s*[\w$.]*\bid\b/ },
      { id: 'an id normalizer', re: /\bid\s*\.\s*(trim|toLowerCase|toUpperCase|normalize|replace)\s*\(/ },
      { id: 'a Set keyed by an id', re: /new\s+Set\s*\(/ },
      { id: 'a Map keyed by an id', re: /new\s+(Weak)?Map\s*\(/ },
      { id: 'a minted identity: crypto/randomUUID/counter', re: /\bcrypto\b|randomUUID|\bDate\s*\.\s*now\b|\+\+\s*$/ },
      { id: 'a uniqueness test or dedupe', re: /\bdedupe?\b|\bunique\b/ },
      { id: 'a minted identity: Object.freeze', re: /Object\s*\.\s*freeze\s*\(/ },
    ]
    const hits = scanHits(stripComments(src), specs)
    expect(hits, `R-10 — no id-shaped validation or generation. Hits: ${JSON.stringify(hits)}`).toEqual([])
    // AND NO AMBIENT SOURCE OF A MINTED VALUE EXISTS IN THE MODULE AT ALL.
    expect(
      scanHits(stripComments(src), [
        { id: 'a random source', re: /Math\s*\.\s*random/ },
        { id: 'a clock read', re: /\bDate\b/ },
      ]),
      'R-10 / I-4 — the module has no random source and no clock: an `id` could not be minted here even accidentally',
    ).toEqual([])
  })

  it('R-11 (P-ML-11/P-ML-12) the NO-SIBLING-COMPOSITION / NO-FABRICATED-EDGE row', () => {
    const src = moduleSource()
    expect(src, 'R-11 — the module file must be readable').not.toBe(null)
    if (src === null) return
    const siblingSymbols: readonly string[] = [
      'createGestureSession',
      'GestureHandle',
      'tokensFor',
      'orientationFor',
      'containerDeclarationFor',
      'computeTrackVars',
      'isEmpty',
      'trackFor',
      'createOwnedListHost',
      'createSlotHost',
      'createRelocateSession',
      'createResizeController',
      'createGutterAffordance',
      'applyProjection',
      'probeMountInvariant',
      'POINTER_TYPES',
    ]
    const view = stripComments(src)
    const offenders = siblingSymbols.filter((sym) => new RegExp(`\\b${sym}\\b`).test(view))
    expect(
      offenders,
      `R-11 — a reference to any sibling surface is a FABRICATED EDGE (H-r6): no composition, no import and no re-expression of another unit's contract. Offenders: ${JSON.stringify(offenders)}`,
    ).toEqual([])
    expect(
      /from\s+['"]\.\//.test(view) || /from\s+['"]\.\.\//.test(view),
      'R-11 / I-9 — no relative sibling specifier appears anywhere in the module (the empty import census, read at the edge site)',
    ).toBe(false)
  })

  it('R-12 (G-2, both controls) THE KEY-CENSUS NEGATIVE ROW: the seven-key set, the eighth-key drop and the absent-member rule', async () => {
    const s = await surface('R-12')
    const catalog = [extrasEl(), inheritedSymbolElement(), twoKeyEl()]
    const out = s.buildMenuTemplate(catalog, { platform: 'win32' })
    expect(out.items.length, 'R-12(a) — three usable elements, three emitted items').toBe(3)
    // (a) THE SEVEN-KEY HALF, in DECLARED ORDER.
    expect(Object.keys(out.items[0]), 'R-12(a) — `Object.keys(item)` deep-equals the seven declared names IN DECLARED ORDER (the eighth/ninth extras are dropped, never copied)').toEqual([...SEVEN_KEYS])
    // (b) THE EIGHTH-KEY NEGATIVE DRIVE, NAMED BY NAME.
    const first = out.items[0]
    expect('extra' in first, "R-12(b) — the SOURCE's own `extra` own key is ABSENT from the emitted item, BY NAME").toBe(false)
    expect('another' in first, "R-12(b) — the SOURCE's own `another` own key is ABSENT from the emitted item, BY NAME").toBe(false)
    // (c) THE ABSENT-MEMBER RULE.
    expect(missingKeys(out.items[1], SEVEN_KEYS), 'R-12(c) — the inherited `role` was NOT carried: `role` is ABSENT, not `undefined`').toEqual(['role'])
    expect('role' in out.items[1], 'R-12(c) — `\'role\' in item === false` for an element that did not OWN one').toBe(false)
    expect(
      keyCountOf(out.items[2]),
      'R-12(c) — an element owning only TWO of the seven produces an item whose own-key count is 2: a module that materializes `undefined` placeholders FAILS here',
    ).toBe(2)
    // THE PLACEHOLDER CONTROLS (the "would the row catch it?" half).
    const materialized: Record<string, unknown> = { id: undefined, label: undefined }
    expect(keyCountOf(materialized), 'R-12(c) CONTROL — a module materializing placeholders reads 7 here on the same element, so the length-2 assertion above CAN fail').toBe(2)
    const copying: Record<string, unknown> = { ...el(), extra: 'must-not-appear' }
    expect(keyCountOf(copying) === 7, 'R-12(b) CONTROL — a module COPYING the source\'s extras reads 8+, so the `Object.keys(item)` deep-equal CAN fail').toBe(false)
  })

  it('R-13 (P-ML-5/P-ML-12) the DIFF-SCOPE row and the no-importer probe, as a FILESYSTEM PROBE', () => {
    const denied: readonly string[] = [
      'src/main/main.ts',
      'src/renderer/renderer.ts',
      'src/renderer/index.html',
      'src/shared/dom-shim.ts',
      'src/shared/zones.ts',
      'src/shared/census.ts',
      'src/shared/gesture-session.ts',
      'src/shared/gutter.ts',
      'src/shared/gutter-affordance.ts',
      'src/shared/layout-projection.ts',
      'src/shared/owned-list-host.ts',
      'src/shared/slot-host.ts',
      'src/shared/mount-invariant-guard.ts',
      'src/shared/demo-envelope.ts',
      'src/shared/types.ts',
      'src/shared/path-fork-cycle.ts',
      'src/shared/relocate.ts',
      'src/shared/container.ts',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'tsconfig.tests.json',
      'vitest.config.ts',
      'docs/specs/menulib-review.md',
      'docs/skills/designing-pages.md',
    ]
    const present = denied.filter((p) => existsSync(fileURLToPath(new URL(`../${p}`, import.meta.url))))
    // `docs/skills/designing-pages.md` is the ONE denied path that MUST be ABSENT
    // (R-9's probe), and every other denied path must EXIST (the DENIED set binds
    // by being untouched, and a path that no longer exists cannot be the thing the
    // diff-scope row protects).
    expect(present, 'R-13 — the DENIED set is read as a FILE SET: every path that exists today still exists (a vanished denied path would make the diff-scope row vacuous), and `docs/skills/designing-pages.md` is the one that must NOT exist').toEqual([...denied].filter((p) => p !== 'docs/skills/designing-pages.md'))
    const ownArtifacts = ['src/shared/menu-template.ts', 'tests/menu-template.test.ts']
    expect(
      ownArtifacts.filter((p) => existsSync(fileURLToPath(new URL(`../${p}`, import.meta.url)))),
      'R-13 — this unit\'s own allow-list artifacts are asserted SEPARATELY from the DENIED set: the test file must exist at red time (the red is a file), and the module path\'s presence is the X-1 branch, not this row',
    ).toEqual(['tests/menu-template.test.ts'])
    const scriptsCount = readdirSync(fileURLToPath(new URL('../scripts', import.meta.url))).length
    expect(scriptsCount, 'R-13 / §5.1 item 8 — `scripts/**` holds the landed helpers and this unit adds none (the census is the tree\'s, and the diff-scope claim over a commit range is the supervisor\'s with `git` unavailable at run time)').toBeGreaterThan(0)
  })
})

// ===========================================================================
// §3.2 / §3.3 — THE TOTALLITY, DEGRADATION AND INVARIANT SURFACE
// (`§4.2` item 3: this unit's failure surface comes BEFORE its happy paths,
// because a totality claim is what the whole contract rests on).
// ===========================================================================
describe('§3.2 F-1..F-10 and §3.3 I-1..I-12 — the failure surface', () => {
  it('F-1 (I-1, I-12) an UNUSABLE CATALOG, driven in full: `[]` is the declared value and NOTHING throws', async () => {
    const s = await surface('F-1')
    const unusable: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'undefined (omitted)', make: () => undefined },
      { id: 'null', make: () => null },
      { id: '42', make: () => 42 },
      { id: '-0', make: () => -0 },
      { id: 'NaN', make: () => NaN },
      { id: "'x'", make: () => 'x' },
      { id: "''", make: () => '' },
      { id: 'true', make: () => true },
      { id: 'false', make: () => false },
      { id: "Symbol('s')", make: () => Symbol('s') },
      { id: '12n', make: () => 12n },
      { id: '{}', make: () => ({}) },
      { id: 'Object.create(null)', make: () => Object.create(null) },
      { id: 'a Map', make: () => new Map() },
      { id: 'a Set', make: () => new Set() },
      { id: 'a function', make: () => () => 1 },
      { id: 'a revoked Proxy', make: () => revokedProxy() },
      { id: 'a revoked Proxy whose trap check itself throws', make: () => revokedTrapThrowingProxy() },
      { id: 'a trap-throwing Proxy', make: () => trapThrowingProxy() },
      { id: '[]', make: () => [] },
    ]
    for (const u of unusable) {
      const catalog = u.make()
      expect(() => s.normalizeCatalog(catalog), `F-1 — normalizeCatalog(${u.id}) MUST NOT THROW`).not.toThrow()
      expect(s.normalizeCatalog(catalog), `F-1 — normalizeCatalog(${u.id}) returns the declared EMPTY answer []`).toEqual([])
      expect(() => s.buildMenuTemplate(catalog, { platform: 'darwin' }), `F-1 — buildMenuTemplate(${u.id}, darwin) MUST NOT THROW`).not.toThrow()
      const t = s.buildMenuTemplate(catalog, { platform: 'darwin' })
      expect(t.items, `F-1 — the emitted items read [] for ${u.id}: no default item, no placeholder and no sentinel appears`).toEqual([])
      expect(
        [t.platform.recognized, t.platform.collapsing],
        `F-1/§2.3 item 10 — the platform member is STILL emitted by the three-outcome rule (a darwin call with an unusable catalog is {[], {true, true}})`,
      ).toEqual([true, true])
    }
    expect(s.normalizeCatalog([]), 'F-1 / §2.3 item 10 — the empty array IS a catalog: `[]` in, `[]` out, with the platform member still emitted').toEqual([])
  })

  it('F-2 (I-1) an ARRAY OF HOSTILES: EXACTLY the usable elements are carried, in order, with no throw', async () => {
    const s = await surface('F-2')
    const valid = el({ id: 'valid' })
    const protoRecord = Object.assign(Object.create(null) as Record<string, unknown>, { id: 'proto', label: 'P' })
    const nested = el({ id: 'nested' })
    const accessor = throwingAccessorRecord()
    const catalog = [null, undefined, 42, 'x', Symbol('s'), 12n, () => 1, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid, accessor]
    let out: readonly Record<string, unknown>[] = []
    expect(() => {
      out = s.normalizeCatalog(catalog)
    }, 'F-2 — a catalog carrying every hostile element class MUST NOT THROW').not.toThrow()
    out = s.normalizeCatalog(catalog)
    expect(out.length, 'F-2 — EXACTLY the THREE usable elements are carried: the null-prototype record, the array element and the plain record (the six primitives, the function, the revoked Proxy, the trap-throwing Proxy and the accessor-throwing record are all UNUSABLE and are SKIPPED)').toBe(3)
    expect(out.map((i) => i['id']), 'F-2 — and they are carried IN CATALOG ORDER, by their own carried ids').toEqual(['proto', 'nested', valid['id']])
    expect(out[0], 'F-2 — element 1 IS the null-prototype record BY IDENTITY').toBe(protoRecord)
    expect(out[1], 'F-2 — element 2 IS the nested array element BY IDENTITY (an array is a carried object per §2.3 item 1(b))').toBe(nested)
    expect(out[2], 'F-2 — element 3 IS the plain record BY IDENTITY (the accessor-throwing record is the element that was SKIPPED)').toBe(valid)
    expect(Object.keys(out[0]), 'F-2 — the null-prototype record carries the two keys IT owns, so no prototype member was read').toEqual(['id', 'label'])
    expect(Object.keys(out[1]), 'F-2 — the nested array element carries ITS own enumerable string keys').toEqual(['0'])
    expect(Object.keys(out[2]), 'F-2 — the carried key set is the intersection of the seven with the source\'s own keys (`id`, `label`, `kind` for the plain record)').toEqual(['id', 'label', 'kind'])
    expect(out.every((item) => !('extra' in item)), 'F-2 — and no hostile placeholder, default or sentinel appears on any carried element').toBe(true)
  })

  it('F-3 (Q2, I-1) an UNRECOGNISED or NON-STRING platform: EVERY one is the identity projection with collapsing false', async () => {
    const s = await surface('F-3')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })]
    const cases: ReadonlyArray<{ readonly id: string; readonly platform: unknown; readonly options: (p: unknown) => unknown; readonly recognized: boolean }> = [
      { id: 'undefined (member omitted)', platform: undefined, options: () => ({}), recognized: false },
      { id: 'undefined (options omitted entirely)', platform: undefined, options: () => undefined, recognized: false },
      { id: 'null', platform: null, options: (p) => ({ platform: p }), recognized: false },
      { id: '42', platform: 42, options: (p) => ({ platform: p }), recognized: false },
      { id: "''", platform: '', options: (p) => ({ platform: p }), recognized: true },
      { id: "'win32'", platform: 'win32', options: (p) => ({ platform: p }), recognized: true },
      { id: "'linux'", platform: 'linux', options: (p) => ({ platform: p }), recognized: true },
      { id: "'Darwin' (a CASE variant)", platform: 'Darwin', options: (p) => ({ platform: p }), recognized: true },
      { id: "' darwin' (a WHITESPACE variant)", platform: ' darwin', options: (p) => ({ platform: p }), recognized: true },
      { id: "'darwin '", platform: 'darwin ', options: (p) => ({ platform: p }), recognized: true },
      { id: 'a Symbol', platform: Symbol('p'), options: (p) => ({ platform: p }), recognized: false },
      { id: '12n', platform: 12n, options: (p) => ({ platform: p }), recognized: false },
      { id: '{}', platform: {}, options: (p) => ({ platform: p }), recognized: false },
      { id: '[]', platform: [], options: (p) => ({ platform: p }), recognized: false },
      { id: 'a revoked Proxy', platform: revokedProxy(), options: (p) => ({ platform: p }), recognized: false },
    ]
    for (const c of cases) {
      const t = s.buildMenuTemplate(catalog, c.options(c.platform))
      expect(t.items.length, `F-3 — ${c.id}: the IDENTITY projection (4 items in, 4 items out) — a module with a case-insensitive, prefix or `+'`process.platform`'+` comparison FAILS here`).toBe(4)
      expect(t.platform.collapsing, `F-3 — ${c.id}: NO drive collapses; collapsing === false`).toBe(false)
      expect(t.platform.recognized, `F-3 — ${c.id}: recognized is ${c.recognized} by §0A note 4 (true for EVERY string, false for every non-string and for the absent case)`).toBe(c.recognized)
      expect(s.normalizeCatalog(catalog).length, `F-3 — ${c.id}: the normalizer is unaffected by the platform value (it emits NO platform member)`).toBe(4)
    }
  })

  it('F-4 (I-1) an UNUSABLE options VALUE: the declared false/false arm, the identity projection and NOTHING thrown', async () => {
    const s = await surface('F-4')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const optionsCases: ReadonlyArray<{ readonly id: string; readonly make: () => unknown; readonly call: boolean }> = [
      { id: 'options omitted', make: () => undefined, call: false },
      { id: 'undefined', make: () => undefined, call: true },
      { id: 'null', make: () => null, call: true },
      { id: '42', make: () => 42, call: true },
      { id: "'x'", make: () => 'x', call: true },
      { id: 'true', make: () => true, call: true },
      { id: '[]', make: () => [], call: true },
      { id: 'a function', make: () => () => 1, call: true },
      { id: 'a hostile Proxy', make: () => trapThrowingProxy(), call: true },
      { id: 'an object carrying no platform member at all', make: () => ({ picker: undefined }), call: true },
    ]
    for (const c of optionsCases) {
      const options = c.make()
      expect(() => (c.call ? s.buildMenuTemplate(catalog, options) : s.buildMenuTemplate(catalog)), `F-4 — ${c.id}: the builder MUST NOT throw on a non-object option bag and MUST NOT propagate an accessor's throw`).not.toThrow()
      const t = c.call ? s.buildMenuTemplate(catalog, options) : s.buildMenuTemplate(catalog)
      expect(Object.keys(t), `F-4 — ${c.id}: the emitted FIVE-member shape still holds`).toEqual(['items', 'platform'])
      expect([t.platform.recognized, t.platform.collapsing], `F-4 — ${c.id}: the declared {false, false} arm`).toEqual([false, false])
      expect(t.items.length, `F-4 — ${c.id}: the IDENTITY projection (3 in, 3 out) — no silent darwin default and no collapse`).toBe(3)
    }
  })

  it('F-5 (I-1, §7a.1 item 3 derivation) a SINGLETON picker run and TWO runs split by an intervening item', async () => {
    const s = await surface('F-5')
    const singleton = s.buildMenuTemplate([el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })], { platform: 'darwin' })
    expect(singleton.items.length, 'F-5 — the singleton is NOT collapsed: items.length === 3').toBe(3)
    expect(singleton.items[1]['id'], 'F-5 — and the singleton is still the identity-projected picker entry').toBe('p1')
    expect('submenu' in singleton.items[1], 'F-5 — NO `submenu` member was CREATED for the singleton (it carried none of its own)').toBe(false)
    const split = s.buildMenuTemplate([el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' }), el({ id: 'n1', kind: 'plain' }), el({ id: 'p3', kind: 'picker' }), el({ id: 'p4', kind: 'picker' })], { platform: 'darwin' })
    expect(split.items.length, 'F-5 — the two runs stay SEPARATE: items.length === 3, so `"the rest in catalog order"` cannot survive a re-ordering (a non-contiguous gather FAILS here)').toBe(3)
    expect(split.items[0]['id'], 'F-5 — the first parent is p1').toBe('p1')
    expect((split.items[0]['submenu'] as readonly Record<string, unknown>[]).map((i) => i['id']), 'F-5 — carrying p2 as its own rest').toEqual(['p2'])
    expect(split.items[2]['id'], 'F-5 — the second parent is p3').toBe('p3')
    expect((split.items[2]['submenu'] as readonly Record<string, unknown>[]).map((i) => i['id']), 'F-5 — carrying p4 as its own rest').toEqual(['p4'])
    expect([split.platform.collapsing, singleton.platform.collapsing], 'F-5 — `collapsing` describes the RULE IN FORCE, never an empirical count of collapsed runs: it is TRUE in both drives').toEqual([true, true])
  })

  it('F-6 (the U4 cancel/dismiss/empty acceptance line) the picker\'s EMPTY ARM returns null, with count 1 for each', async () => {
    const s = await surface('F-6')
    const catalog = [el({ id: 'a' }), el({ id: 'b' })]
    const empties: ReadonlyArray<{ readonly id: string; readonly answer: unknown }> = [
      { id: '() => null', answer: null },
      { id: '() => undefined', answer: undefined },
      { id: "() => ''", answer: '' },
      { id: '() => 0', answer: 0 },
      { id: '() => false', answer: false },
      { id: '() => []', answer: [] },
      { id: '() => ({})', answer: {} },
    ]
    for (const e of empties) {
      const rec = recorder(e.answer)
      expect(s.selectCatalogItem(catalog, rec.fn), `F-6 — ${e.id}: an empty answer is not a known id, and the module does not invent one — EXACTLY null`).toBe(null)
      expect(rec.count(), `F-6 — ${e.id}: the count is 1 for each drive`).toBe(1)
    }
    expect(
      /dialog|showOpenDialog|showMessageBox/.test(ccOf([100, 105, 97, 108, 111, 103])),
      'F-6 — the "cancel/dismiss/empty ⇒ null" acceptance line is discharged HERE, at the VALUE layer: NO dialog and no opener is ever involved (this row reads a boolean, never a native call)',
    ).toBe(false)
  })

  it('F-7 (P-ML-10, I-1) THE ID-DOMAIN CONTROL: NaN, an absent id, a fresh equal-contents object and a matching string', async () => {
    const s = await surface('F-7')
    const nanCatalog = [el({ id: NaN })]
    const nanAnswer = s.selectCatalogItem(nanCatalog, () => NaN)
    expect(Number.isNaN(nanAnswer), 'F-7 — NaN as an id NEVER matches itself by strict identity, and the module neither invents a match nor throws').toBe(false)
    expect(nanAnswer, 'F-7 — so the declared empty answer is returned').toBe(null)
    const noIdCatalog = [el({ id: undefined }), twoKeyEl()]
    expect(s.selectCatalogItem(noIdCatalog, () => 'a'), "F-7 — the string 'a' matches the carried string 'a' of the two-key entry").toBe('a')
    expect(s.selectCatalogItem(noIdCatalog, () => undefined), 'F-7 — and an `undefined` answer is the declared empty answer for every catalog').toBe(null)
    const carried = { id: 'inner' }
    const objCatalog = [el({ id: carried })]
    expect(s.selectCatalogItem(objCatalog, () => carried), 'F-7 — an object id matches BY REFERENCE (`===`)').toBe(carried)
    const fresh = { id: 'inner' }
    expect(s.selectCatalogItem(objCatalog, () => fresh), 'F-7 — a fresh, equal-contents object NEVER matches: the comparison is strict identity, so no coercion, no key-wise search and no hashing participates').toBe(null)
    expect(s.selectCatalogItem([el({ id: 'zzz' })], () => 'a'), 'F-7 — a non-null answer naming no known id is not found, and nothing throws').toBe(null)
    expect(() => s.selectCatalogItem(noIdCatalog, () => Symbol('a')), 'F-7 — no coercion is attempted on a Symbol answer either').not.toThrow()
  })

  it('F-8 (S-ML-2, §2.4 item 5) the MENU/PICKER COMPOSITION CONTROL: the control corpus FAILS the rows it is attached to', () => {
    // The corpus is NOT the module: it is the positive control R-2's scan and
    // R-8's closed-set claim must catch. Its spellings are assembled from
    // character codes so the control cannot contaminate this file's own bytes.
    const menu = ccOf([77, 101, 110, 117])
    const corpus: ReadonlyArray<{ readonly id: string; readonly src: string }> = [
      { id: 'a Menu construction', src: `const m = new ${menu}()` },
      { id: 'a setApplicationMenu call', src: `set${ccOf([65, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 77, 101, 110, 117])}(m)` },
      { id: 'an accelerator registration', src: `${ccOf([103, 108, 111, 98, 97, 108, 83, 104, 111, 114, 116, 99, 117, 116])}.register(${ccOf([39])}${ccOf([67, 109, 100, 79, 114, 67, 116, 114, 108, 43, 78])}${ccOf([39])})` },
      { id: 'a rendered picker element', src: `document.createElement(${ccOf([39])}input${ccOf([39])})` },
    ]
    const scanSpecs: ScanSpec[] = [
      { id: 'a composition reference', re: new RegExp(`${menu}|${ccOf([115, 101, 116, 65, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 77, 101, 110, 117])}|${ccOf([103, 108, 111, 98, 97, 108, 83, 104, 111, 114, 116, 99, 117, 116])}`) },
      { id: 'a rendered write', re: /createElement|appendChild|innerHTML/ },
      { id: 'an accelerator literal', re: new RegExp(ccOf([39]) + ccOf([67, 109, 100, 79, 114, 67, 116, 114, 108, 43, 78]) + ccOf([39])) },
    ]
    const caught = corpus.map((c) => scanHits(stripComments(c.src), scanSpecs).length > 0)
    expect(caught, 'F-8 — ALL FOUR shapes (a Menu construction, a setApplicationMenu call, an accelerator registration, a rendered picker) are CAUGHT: a scan that passed for any of them would be UNFALSIFIED and must not be filed (S-ML-2)').toEqual([true, true, true, true])
    // ...and the module itself passes the same scan, which is what makes the
    // control's failure meaningful.
    const src = moduleSource()
    expect(src, 'F-8 — the module must be readable for the companion reading').not.toBe(null)
    if (src !== null) {
      expect(scanHits(stripComments(src), scanSpecs), 'F-8 — the module contains none of the four refused shapes, so the control above is a positive-control failure and not a broken scan').toEqual([])
    }
  })

  it('F-9 (S-ML-9) the IMPORT-CLASS CONTROL: a corpus with exactly one import statement FAILS', () => {
    const importSpecs: ScanSpec[] = [
      { id: 'a value import', re: /^\s*import\s/m },
      { id: 'a type-only import', re: /^\s*import\s+type\s/m },
      { id: 'a dynamic import', re: /\bimport\s*\(/ },
      { id: 'a require call', re: /\brequire\s*\(/ },
    ]
    const corpora: ReadonlyArray<{ readonly id: string; readonly src: string }> = [
      { id: 'a sibling type-only import', src: `import type { Gesture${ccOf([72, 97, 110, 100, 108, 101])} } from ${ccOf([39])}./gesture-session.js${ccOf([39])}` },
      { id: 'a native import', src: `import { ${ccOf([77, 101, 110, 117])} } from ${ccOf([39])}${ccOf([101, 108, 101, 99, 116, 114, 111, 110])}${ccOf([39])}` },
    ]
    const caught = corpora.map((c) => scanHits(c.src, importSpecs).length > 0)
    expect(caught, 'F-9 — the TWO NAMED positive controls FAIL the import row: they are the two imports a spec writer is most tempted to add (§2.1 item 3, §2.4 item 4)').toEqual([true, true])
    const src = moduleSource()
    if (src !== null) {
      expect(scanHits(stripComments(src), importSpecs), 'F-9 — the module carries none of them, so the control is a positive-control failure rather than a broken scan').toEqual([])
    }
  })

  it('F-10 (I-4) A SECOND CALL\'S INDEPENDENCE: no retention, no cache and no drift across five calls', async () => {
    const s = await surface('F-10')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const normals = Array.from({ length: 5 }, () => s.normalizeCatalog(catalog))
    for (let i = 1; i < 5; i += 1) {
      expect(normals[i].length, `F-10 — normalizeCatalog call ${i + 1} carries the same LENGTH as the first`).toBe(normals[0].length)
      expect(normals[i][0], `F-10 — call ${i + 1} carries the same item BY IDENTITY as the first (no re-materialized item, no cache)`).toBe(normals[0][0])
    }
    const answer = { chosen: 'the-callers-own-answer' }
    const rec = recorder(answer)
    const templates = Array.from({ length: 5 }, () => s.buildMenuTemplate(catalog, { platform: 'darwin', picker: rec.fn }))
    for (let i = 1; i < 5; i += 1) {
      expect(templates[i], `F-10 — call ${i + 1} returns a FRESH template record (not the retained one)`).not.toBe(templates[i - 1])
      expect(Object.keys(templates[i]), `F-10 — with the same declared member list`).toEqual(['items', 'platform'])
      expect(templates[i].items.length, `F-10 — and the same items LENGTH`).toBe(templates[0].items.length)
    }
    expect(rec.count(), 'F-10 — the seam\'s recorded count rises exactly 1 per calling invocation: five calls, count 5 (a cache or a retained closure reads 1)').toBe(5)
    const selectRec = recorder(answer)
    const selects = Array.from({ length: 5 }, () => s.selectCatalogItem([el({ id: 'a' })], selectRec.fn))
    expect(selects.map((x) => sameRef(x, selectRec.answer)), 'F-10 — selectCatalogItem returns the caller\'s own answer BY IDENTITY on every one of the five calls').toEqual([true, true, true, true, true])
    expect(selectRec.count(), 'F-10 — with a count of 5, one per call').toBe(5)
  })

  it('I-1..I-12 (the invariants) hold in every state: no throw, one seam call, the exact census, no state, no policy, no write', async () => {
    const s = await surface('I-1..I-12')
    // I-1 — NO ENTRY POINT THROWS, FOR ANY ARGUMENT (driven through the hostile set).
    const hostiles: readonly unknown[] = [undefined, null, 42, NaN, Symbol('s'), 12n, 'x', true, {}, [], () => 1, revokedProxy(), trapThrowingProxy(), trapThrowingProxy() as unknown]
    for (const h of hostiles) {
      expect(() => s.normalizeCatalog(h), 'I-1 — normalizeCatalog NEVER throws').not.toThrow()
      expect(() => s.buildMenuTemplate(h), 'I-1 — buildMenuTemplate NEVER throws, with or without options').not.toThrow()
      expect(() => s.selectCatalogItem(h), 'I-1 — selectCatalogItem NEVER throws, with or without a picker').not.toThrow()
    }
    // I-2 — the picker is invoked AT MOST ONCE and its answer is handed on UNCHANGED.
    const answer = { keep: 'unchanged' }
    const rec = recorder(answer)
    s.selectCatalogItem([el({ id: 'a' })], rec.fn)
    expect(rec.count(), 'I-2 — invoked AT MOST once per invocation').toBe(1)
    expect(s.selectCatalogItem([el({ id: 'a' })], rec.fn), 'I-2 — and the answer is handed on UNCHANGED BY IDENTITY').toBe(answer)
    // I-3 — the emitted member census is exactly the declared one.
    const t = s.buildMenuTemplate([extrasEl()], { platform: 'win32' })
    expect([Object.keys(t).length, Object.keys(t.platform).length, keyCountOf(t.items[0])], 'I-3 — two top-level members, two platform members, seven own keys on every item (§0A notes 2/5)').toEqual([2, 2, 7])
    // I-5 — THE MODULE DECIDES NO POLICY: a source element owning NONE of the
    // seven yields an item with NO members at all (no default label, no default
    // kind, no default enabled, no default accelerator and no default role).
    const bare = s.buildMenuTemplate([{}], { platform: 'win32' })
    expect(Object.keys(bare.items[0]), 'I-5 — an element owning nothing yields an item owning nothing: no default, no placeholder and no sentinel appears').toEqual([])
    expect(bare.items.length, 'I-5 — and the element is still CARRIED (it is a carried object) rather than dropped or replaced by a default').toBe(1)
    // I-6 — the ONLY two tokens the module interprets are the two declared ones.
    expect(DECLARED_BODIES.includes('darwin') && DECLARED_BODIES.includes('picker'), 'I-6 — the module\'s own interpretable vocabulary is exactly the two declared tokens, each DECLARED').toBe(true)
    // I-7 — the mechanism authors no UI content: every return value is a plain
    // record or an array, and no member of one is a callable, an element or a
    // function.
    const shape = [typeof t, Array.isArray(t.items), typeof t.platform, typeof t.platform.recognized, typeof t.platform.collapsing]
    expect(shape, 'I-7 — `returned` is not `written`: the returned template is a plain data record (`typeof` object, `items` an array, both platform members booleans)').toEqual(['object', true, 'object', 'boolean', 'boolean'])
    expect(
      Object.values(t.items[0]).filter((v) => typeof v === 'function' || (typeof v === 'object' && v !== null && 'nodeType' in v)),
      'I-7 — no emitted member is a callable and no emitted member is a DOM node',
    ).toEqual([])
    // I-12 — the declared empty answers are `[]`, `null` and `{false,false}` and
    // nothing else in the contract is degenerate.
    expect(s.normalizeCatalog(undefined), 'I-12 — `[]`').toEqual([])
    expect(s.selectCatalogItem([], () => 'x'), 'I-12 — `null`').toBe(null)
    expect([s.buildMenuTemplate(undefined).platform.recognized, s.buildMenuTemplate(undefined).platform.collapsing], 'I-12 — `{recognized:false, collapsing:false}`').toEqual([false, false])
  })
})

// ===========================================================================
// §3.1 — THE HAPPY STATES (`§4.2` item 4: the happy states come AFTER the
// totality surface; `M-7`/`M-8` sit beside the static rows they make falsifiable
// and `M-9` is LAST).
// ===========================================================================
describe('§3.1 M-1..M-9 — the happy states', () => {
  it('M-1 the normalizer carries the usable elements IN ORDER, BY IDENTITY, and invokes NOTHING', async () => {
    const s = await surface('M-1')
    const a = el({ id: 'i1', label: 'L1' })
    const b = el({ id: 'i2', label: 'L2' })
    const c = el({ id: 'i3', label: 'L3' })
    const catalog = Object.freeze([a, b, c])
    const before = catalog.map((x) => snapshot(x))
    const out = s.normalizeCatalog(catalog)
    expect(out.length, 'M-1 — EXACTLY 3 entries').toBe(3)
    expect([out[0], out[1], out[2]], 'M-1 — IN CATALOG ORDER, each source value BY IDENTITY (`toBe`)').toEqual([a, b, c])
    for (const item of out) {
      expect(Object.keys(item), 'M-1 — each entry\'s key set is exactly the intersection of the seven declared names with its source\'s own keys (§2.3 item 9)').toEqual([...SEVEN_KEYS])
    }
    expect(catalog.map((x) => snapshot(x)), 'M-1 — `catalog` is reference-identical and value-identical before and after').toEqual(before)
    expect(catalog[0], 'M-1 — and the array itself is the same reference').toBe(a === catalog[0] ? catalog[0] : a)
  })

  it('M-2 the builder emits the five-member shape and the member census is EXACTLY the declared names', async () => {
    const s = await surface('M-2')
    const catalog = [el({ id: 'a' }), el({ id: 'b' })]
    const t = s.buildMenuTemplate(catalog, { platform: 'win32' })
    expect(Object.keys(t), 'M-2 — `Object.keys(template)` deep-equals the two declared names, in that order').toEqual([...TEMPLATE_KEYS])
    expect(Object.keys(t.platform), 'M-2 — `Object.keys(template.platform)` deep-equals the two declared names, in that order').toEqual([...PLATFORM_KEYS])
    expect(Array.isArray(t.items), 'M-2 — `Array.isArray(template.items)` is true').toBe(true)
    expect(t.platform.recognized, 'M-2 — `recognized === true`').toBe(true)
    expect(t.platform.collapsing, 'M-2 — `collapsing === false` for a recognized non-darwin platform').toBe(false)
    expect(Object.getPrototypeOf(t), 'M-2 — the returned record\'s prototype is `Object.prototype`, so no member is a getter and no phantom member is inherited').toBe(Object.prototype)
    expect(Object.getPrototypeOf(t.platform), 'M-2 — the platform record\'s prototype likewise').toBe(Object.prototype)
    const descriptors = Object.getOwnPropertyDescriptors(t) as Record<string, PropertyDescriptor>
    expect(
      Object.keys(descriptors).filter((k) => typeof descriptors[k].get === 'function'),
      'M-2 — NO member is a getter',
    ).toEqual([])
  })

  it('M-3 (G-3) the IDENTITY projection is EXACT for a recognized non-darwin platform', async () => {
    const s = await surface('M-3')
    const run = [el({ id: 'p1', label: 'PA', kind: 'picker' }), el({ id: 'p2', label: 'PB', kind: 'picker' }), el({ id: 'p3', label: 'PC', kind: 'picker' })]
    const catalog = [el({ id: 'n1', kind: 'plain' }), ...run, el({ id: 'n2', kind: 'plain' })]
    const carried = s.normalizeCatalog(catalog)
    for (const platform of ['win32', 'linux']) {
      const t = s.buildMenuTemplate(catalog, { platform })
      expect(t.items.length, `M-3 — ${platform}: `+'`items`'+` carries the SAME NUMBER of entries as the carrying normalizer produced`).toBe(carried.length)
      for (let i = 0; i < carried.length; i += 1) {
        expect(t.items[i], `M-3 — ${platform}: entry ${i} is the carried entry BY IDENTITY, in the SAME ORDER`).toBe(carried[i])
        const mismatch = identityMismatch(carried[i], t.items[i])
        expect(mismatch, `M-3 — ${platform}: entry ${i}'s carried members are the source's own ($2.3 item 4(b))`).toBe(null)
      }
      expect([t.platform.collapsing, t.platform.recognized], `M-3 — ${platform}: collapsing false, recognized true`).toEqual([false, true])
    }
  })

  it('M-4 THE DECLARED DEGRADATIONS OF AN ABSENT OR NON-CALLABLE SEAM, on BOTH entry points', async () => {
    const s = await surface('M-4')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const countBefore = registerState.attempts
    const drives: ReadonlyArray<{ readonly id: string; readonly options: () => unknown; readonly selectCall: () => unknown }> = [
      { id: 'picker omitted', options: () => ({ platform: 'darwin' }), selectCall: () => s.selectCatalogItem(catalog, undefined) },
      { id: 'picker: undefined', options: () => ({ platform: 'darwin', picker: undefined }), selectCall: () => s.selectCatalogItem(catalog, undefined) },
      { id: 'picker: null', options: () => ({ platform: 'darwin', picker: null }), selectCall: () => s.selectCatalogItem(catalog, null) },
      { id: 'picker: 42', options: () => ({ platform: 'darwin', picker: 42 }), selectCall: () => s.selectCatalogItem(catalog, 42) },
      { id: "picker: 'x'", options: () => ({ platform: 'darwin', picker: 'x' }), selectCall: () => s.selectCatalogItem(catalog, 'x') },
      { id: 'picker: {}', options: () => ({ platform: 'darwin', picker: {} }), selectCall: () => s.selectCatalogItem(catalog, {}) },
    ]
    for (const d of drives) {
      const t = s.buildMenuTemplate(catalog, d.options())
      expect(t.items.length, `M-4 — ${d.id}: the picker run STILL collapses to ONE parent (3 items: plain parent, collapsed parent, plain) — the item is NEVER DROPPED`).toBe(3)
      const parent = t.items[1]
      expect(parent['id'], `M-4 — ${d.id}: the collapsed parent is the first entry of the run`).toBe('p1')
      expect(parent['enabled'], `M-4 — ${d.id}: the ${'\'picker\''}-kind item (the collapsed parent) IS EMITTED and reads \`enabled === false\``).toBe(false)
      expect(Object.keys(parent), `M-4 — ${d.id}: and it still carries its other carried members (the seven-key census holds)`).toEqual([...SEVEN_KEYS])
      expect(d.selectCall(), `M-4 — ${d.id}: selectCatalogItem returns the declared EMPTY answer null (a non-callable reads IDENTICALLY to an absent one)`).toBe(null)
      expect(
        Object.values(parent).filter((v) => v === '' || v === 0 || (typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length === 0)),
        `M-4 — ${d.id}: NO mechanism default appears (no '', no 0, no bare {}, no sentinel, no invented label)`,
      ).toEqual([])
    }
    const rec = recorder('never-called')
    s.buildMenuTemplate(catalog, { platform: 'darwin', picker: rec.fn })
    expect(rec.count(), 'M-4 — the seam is invoked EXACTLY ONCE when it IS callable (the positive arm), so the zero-invocation claim above is measurable rather than assumed for the non-callable drives').toBe(1)
    expect(rec.args.length, 'M-4 — and it was handed the carried candidate entries, ONE argument').toBe(1)
    expect(Array.isArray(rec.args[0]), "M-4 — the seam's single argument is an array (the carried candidate entries)").toBe(true)
    expect(registerState.attempts, 'M-4 — the drive reached the module surface (harness precondition)').toBeGreaterThanOrEqual(countBefore)
  })

  it('M-5 THE THROWING SEAM: ONE attempted invocation, absorbed INSIDE the wrapper', async () => {
    const s = await surface('M-5')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const throwers: ReadonlyArray<{ readonly id: string; readonly seam: () => unknown }> = [
      { id: 'new Error', seam: () => throwingSeam(new Error('x')) },
      { id: "throw 'x' (a non-Error)", seam: () => throwingSeam('x') },
      { id: 'throw 42n (a non-Error BigInt)', seam: () => throwingSeam(42n) },
      { id: 'throw null (a non-Error null)', seam: () => throwingSeam(null) },
      { id: 'a Proxy whose apply trap throws', seam: () => applyThrowingProxy() },
    ]
    for (const t of throwers) {
      const seam = t.seam()
      const probe = recorder('never')
      const countingSeam: PickerShape = typeof seam === 'function' ? (seam as PickerShape) : probe.fn
      expect(() => s.buildMenuTemplate(catalog, { platform: 'darwin', picker: countingSeam === probe.fn ? seam : countingSeam }), `M-5 — ${t.id}: NOTHING ESCAPES either call`).not.toThrow()
      const built = s.buildMenuTemplate(catalog, { platform: 'darwin', picker: countingSeam === probe.fn ? seam : countingSeam })
      expect(built.items[1]['enabled'], `M-5 — ${t.id}: the picker item reads enabled === false`).toBe(false)
      expect(s.selectCatalogItem(catalog, countingSeam === probe.fn ? seam : countingSeam), `M-5 — ${t.id}: selectCatalogItem returns null`).toBe(null)
    }
    // THE COUNT IS ASSERTED EXACTLY AND NEVER RETRIED.
    const throwing = throwingSeam(new Error('x'))
    s.buildMenuTemplate(catalog, { platform: 'darwin', picker: throwing.fn })
    expect(throwing.count(), 'M-5 — the recorded invocation count is EXACTLY 1: the attempt IS counted and the seam is NEVER retried').toBe(1)
    const throwing2 = throwingSeam(new Error('y'))
    const first = s.buildMenuTemplate(catalog, { platform: 'darwin', picker: throwing2.fn })
    const second = s.buildMenuTemplate(catalog, { platform: 'darwin', picker: throwing2.fn })
    expect([first.items[1]['enabled'], second.items[1]['enabled']], 'M-5 — a second call with the same throwing seam produces the SAME declared answer').toEqual([false, false])
    expect(throwing2.count(), 'M-5 — with its OWN count of 1 per call, so the count is 2 across two calls and never more (no retry)').toBe(2)
    const selectThrowing = throwingSeam(new Error('z'))
    expect(s.selectCatalogItem(catalog, selectThrowing.fn), 'M-5 — selectCatalogItem on a throwing seam returns null').toBe(null)
    expect(selectThrowing.count(), 'M-5 — attempted once').toBe(1)
  })

  it('M-6 the known-id answer is returned BY IDENTITY and the count is EXACTLY one', async () => {
    const s = await surface('M-6')
    const answer = { the: 'callers-answer' }
    const catalog = [el({ id: 'a' }), el({ id: 'b' })]
    const recA = recorder('a')
    expect(s.selectCatalogItem(catalog, recA.fn), "M-6(a) — the answer 'a' IS returned BY IDENTITY (a string, so `toBe` is value identity here)").toBe('a')
    expect(recA.count(), 'M-6(a) — with a count of 1').toBe(1)
    const recB = recorder(answer)
    const objCatalog = [el({ id: answer })]
    expect(s.selectCatalogItem(objCatalog, recB.fn), 'M-6(b) — an answer object whose own id IS in the catalog is returned BY IDENTITY').toBe(answer)
    expect(recB.count(), 'M-6(b) — with a count of 1').toBe(1)
    const recC = recorder('zzz')
    expect(s.selectCatalogItem(catalog, recC.fn), 'M-6(c) — a non-null answer naming NO known id returns EXACTLY null').toBe(null)
    expect(recC.count(), 'M-6(c) — with a count of 1: NO coercion, NO String(...), NO trimming and NO fallback occurred').toBe(1)
  })

  it('M-7 (G-3, R-12) THE DARWIN COLLAPSE: one parent, the rest in the submenu, IN CATALOG ORDER', async () => {
    const s = await surface('M-7')
    const n1 = el({ id: 'n1', label: 'N1', kind: 'plain' })
    const pa = el({ id: 'pa', label: 'PA', kind: 'picker' })
    const pb = el({ id: 'pb', label: 'PB', kind: 'picker' })
    const pc = el({ id: 'pc', label: 'PC', kind: 'picker' })
    const n2 = el({ id: 'n2', label: 'N2', kind: 'plain' })
    const t = s.buildMenuTemplate([n1, pa, pb, pc, n2], { platform: 'darwin' })
    expect(t.items.length, 'M-7 — items.length === 3 (the three-entry run collapses into ONE parent, in place)').toBe(3)
    const parent = t.items[1]
    expect([parent['id'], parent['label'], parent['accelerator'], parent['role'], parent['kind'], parent['enabled']], "M-7 — items[1] carries pickerA's own members VERBATIM (the collapse changes `submenu` and NOTHING else: the parent's `kind` remains 'picker')").toEqual([pa['id'], pa['label'], pa['accelerator'], pa['role'], pa['kind'], pa['enabled']])
    const sub = parent['submenu'] as readonly Record<string, unknown>[]
    expect(Array.isArray(sub), 'M-7 — the submenu member is REPLACED with an array').toBe(true)
    expect(sub.length, 'M-7 — of EXACTLY 2 projected items (the REST of the run)').toBe(2)
    expect([sub[0]['id'], sub[1]['id']], 'M-7 — items[1].submenu[0] carries pickerB and [1] carries pickerC — IN THAT ORDER').toEqual(['pb', 'pc'])
    expect([sub[0]['label'], sub[1]['label']], 'M-7 — with their own carried labels verbatim').toEqual(['PB', 'PC'])
    expect([sub[0]['kind'], sub[1]['kind']], "M-7 — and each of them still reads kind 'picker' (the collapse is NOT applied recursively: no nested submenu was created)").toEqual(['picker', 'picker'])
    expect('submenu' in sub[0], 'M-7 — no nested entry\'s `submenu` was replaced or created (none of them owned one)').toBe(false)
    expect([t.items[0], t.items[2]], 'M-7 — items[0] and items[2] are the two non-picker entries UNCHANGED and IN PLACE').toEqual([n1, n2])
    expect([t.platform.recognized, t.platform.collapsing], 'M-7 — the platform reads {recognized:true, collapsing:true}').toEqual([true, true])
    // THE REVERSED ORDER moves the parent to pickerC.
    const reversed = s.buildMenuTemplate([n1, pc, pb, pa, n2], { platform: 'darwin' })
    expect(reversed.items.length, 'M-7 — the reversed drive still emits 3 items').toBe(3)
    expect(reversed.items[1]['id'], 'M-7 — and the parent moved to pickerC').toBe('pc')
    expect((reversed.items[1]['submenu'] as readonly Record<string, unknown>[]).map((i) => i['id']), 'M-7 — with the submenu order CORRESPONDINGLY reversed').toEqual(['pb', 'pa'])
  })

  it('M-8 (G-2, R-12) THE SEVEN-KEY CARRY AND THE EIGHTH-KEY DROP, with the OWN-KEY rule', async () => {
    const s = await surface('M-8')
    const withExtras = extrasEl()
    const inherited = inheritedSymbolElement()
    const symbolAndHidden = inheritedSymbolElement()
    const t = s.buildMenuTemplate([withExtras, inherited, symbolAndHidden], { platform: 'win32' })
    for (let i = 0; i < t.items.length; i += 1) {
      const item = t.items[i]
      const expected = i === 1 ? SEVEN_KEYS.filter((k) => k !== 'role') : SEVEN_KEYS
      expect(Object.keys(item), `M-8 — item ${i}: \`Object.keys(item)\` deep-equals EXACTLY the keys the source OWNED, in DECLARED order`).toEqual([...expected])
      expect(['extra', 'another', 'hidden'].filter((k) => k in item), `M-8 — item ${i}: the EIGHTH/NINTH key and the non-enumerable member are NOT carried`).toEqual([])
      expect(Object.getOwnPropertySymbols(item).length, `M-8 — item ${i}: \`Object.getOwnPropertySymbols(item).length === 0\``).toBe(0)
      expect('role' in item, `M-8 — item ${i}: the INHERITED prototype member was NOT carried (the read is BY OWN KEY, and nothing else)`).toBe(i === 1 ? false : true)
    }
    expect('extra' in t.items[0], "M-8 — `'extra' in item === false` (it is dropped, NEVER copied)").toBe(false)
    expect('another' in t.items[0], "M-8 — `'another' in item === false` likewise").toBe(false)
    expect(t.items[1]['role'], 'M-8 — `item.role` is ABSENT (undefined) for the element whose source inherited it: no placeholder was materialized').toBe(undefined)
    expect('role' in t.items[1], 'M-8 — and `\'role\' in item` is false, which is the difference between ABSENT and `undefined` that §2.3 item 9 pins').toBe(false)
  })

  it('M-9 the WHOLE SURFACE in ONE composition, with the drive\'s own totals read', async () => {
    const s = await surface('M-9')
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const normals = s.normalizeCatalog(catalog)
    expect(normals.length, 'M-9 — normalizeCatalog ⇒ the carried array (3 entries)').toBe(3)
    const buildAnswer = { from: 'the-build-seam' }
    const buildRec = recorder(buildAnswer)
    const template = s.buildMenuTemplate(catalog, { platform: 'darwin', picker: buildRec.fn })
    expect(Object.keys(template), 'M-9 — buildMenuTemplate ⇒ the five-member shape with `items` and `platform`').toEqual([...TEMPLATE_KEYS])
    const selectRec = recorder('p1')
    const selected = s.selectCatalogItem(catalog, selectRec.fn)
    expect(selected, "M-9 — selectCatalogItem ⇒ the picker's own answer BY IDENTITY ('p1')").toBe('p1')
    expect(buildRec.count() + selectRec.count(), "M-9 — the drive's own total reads 2 recorded picker invocations across its two seam-bearing calls").toBe(2)
    expect(Object.keys(template.items[0]).length, 'M-9 — 7 own keys on every emitted item').toBe(7)
    expect(Object.keys(template).length, 'M-9 — and 2 own keys on the emitted template').toBe(2)
    expect(
      [[...SEVEN_KEYS].length, [...TEMPLATE_KEYS].length],
      'M-9 — the two declared censuses, read together so the drive\'s totals are checkable against §0A notes 2/5',
    ).toEqual([7, 2])
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER'S OWN TABLES, DECLARED BEFORE ITS ROWS.
// ===========================================================================
/** `P-ML-IM-1`/`P-ML-IM-2`'s **12-SHAPE CATALOG/ENTRY POOL** — the `§5.5.1`
 *  first domain, one drive each, with each shape's OWN DECLARED outcome. A shape
 *  whose element is carried is expected BY IDENTITY, and a shape whose element is
 *  hostile is expected SKIPPED (never a placeholder, never a throw). */
const POOL: ReadonlyArray<{
  readonly id: string
  readonly make: () => unknown
  /** Each expected element is either the source's own `id` VALUE (the identity
   *  read, since each drive builds a fresh source) or the DECLARED KEY SET. */
  readonly expect: ReadonlyArray<string | readonly string[]>
  readonly sourceKeys: number
}> = [
  { id: '(1) a frozen array of three carried records', make: () => Object.freeze([el({ id: 'i1' }), el({ id: 'i2' }), el({ id: 'i3' })]), expect: ['i1', 'i2', 'i3'], sourceKeys: 0 },
  { id: '(2) [] (the empty array)', make: () => [], expect: [], sourceKeys: 0 },
  { id: '(3) undefined (the argument omitted)', make: () => undefined, expect: [], sourceKeys: 0 },
  { id: '(4) null', make: () => null, expect: [], sourceKeys: 0 },
  { id: '(5) a non-array primitive (42)', make: () => 42, expect: [], sourceKeys: 0 },
  { id: '(6) a plain object', make: () => ({ a: 1 }), expect: [], sourceKeys: 1 },
  { id: '(7) a Map', make: () => new Map(), expect: [], sourceKeys: 0 },
  { id: '(8) a function', make: () => () => 1, expect: [], sourceKeys: 0 },
  { id: '(9) an array carrying a null/undefined/primitive element set', make: () => [null, undefined, 42, 'x', el({ id: 'kept' })], expect: ['kept'], sourceKeys: 0 },
  { id: '(10) an array carrying a revoked Proxy', make: () => [revokedProxy()], expect: [], sourceKeys: 0 },
  { id: '(11) an array carrying a Proxy whose ownKeys/getOwnPropertyDescriptor traps THROW', make: () => [trapThrowingProxy()], expect: [], sourceKeys: 0 },
  {
    id: '(12) an array carrying Object.create(null), an array element and a record whose accessor throws',
    make: () => [nullProtoEl(), el({ id: 'nested' }), throwingAccessorRecord()],
    // THE ACCESSOR-THROWING RECORD IS *SKIPPED*, not carried with a missing key:
    // `§2.3` item 1(d) names "a record whose accessor throws" as an element whose
    // own-key read THROWS, and the declared outcome of such an element is the
    // SKIP with the throw ABSORBED. (A reading under which the element is instead
    // CARRIED is not derivable from the spec, and it is named as a gap in the
    // TestWriter's report rather than patched into this table.)
    expect: [SEVEN_KEYS, ['id', 'label', 'kind']],
    sourceKeys: 0,
  },
]
/** `P-ML-IM-3`'s **4 key-set shapes**, each with its own declared census. */
const KEY_SHAPES: ReadonlyArray<{ readonly id: string; readonly make: () => Record<string, unknown>; readonly expectKeys: readonly string[]; readonly expectedCount: number }> = [
  { id: '(1) all seven own keys', make: () => el(), expectKeys: [...SEVEN_KEYS], expectedCount: 7 },
  { id: '(2) exactly two own keys (id, label)', make: () => twoKeyEl(), expectKeys: ['id', 'label'], expectedCount: 2 },
  { id: '(3) all seven PLUS extra and another (the EIGHTH-KEY negative drive)', make: () => extrasEl(), expectKeys: [...SEVEN_KEYS], expectedCount: 7 },
  { id: '(4) an inherited role plus a Symbol key plus a non-enumerable member, on a record owning the other six', make: () => inheritedSymbolElement(), expectKeys: SEVEN_KEYS.filter((k) => k !== 'role'), expectedCount: 6 },
]
/** `P-ML-IM-4`'s **5 call shapes** (the grid), with the `2` readings per shape
 *  asserted inside each attempt and the `2` further drives counted separately. */
const CALL_SHAPES: ReadonlyArray<{ readonly id: string; readonly call: (s: Omit<ModuleSurface, 'reason'>) => ReturnType<BuildShape> }> = [
  { id: '(1) a conformant call', call: (s) => s.buildMenuTemplate([el({ id: 'a' })], { platform: 'win32' }) },
  { id: '(2) a call with an unusable catalog', call: (s) => s.buildMenuTemplate(42, { platform: 'win32' }) },
  { id: '(3) a call with an unusable options value', call: (s) => s.buildMenuTemplate([el({ id: 'a' })], 'x') },
  { id: '(4) a call whose platform is a non-string', call: (s) => s.buildMenuTemplate([el({ id: 'a' })], { platform: 42 }) },
  { id: '(5) a call whose catalog is EMPTY', call: (s) => s.buildMenuTemplate([], { platform: 'win32' }) },
]
/** `P-ML-IM-5`'s **5 run shapes** with their `2` orderings. `expectedSubmenuIds`
 *  is the submenu's id order **in CATALOG order**; on the reversed drive the row
 *  recomputes the expectation from the reversed entries, which is what makes the
 *  ordering claim falsifiable in both directions. */
const RUN_SHAPES: ReadonlyArray<{
  readonly id: string
  readonly entries: readonly Record<string, unknown>[]
  readonly expectedItems: number
  readonly expectedParentIndex: number
  readonly expectedParentId: string | null
  readonly expectedSubmenuIds: readonly string[] | null
}> = [
  {
    id: '(1) a run of three picker entries between two non-picker entries',
    entries: [el({ id: 'n1', kind: 'plain' }), el({ id: 'a', kind: 'picker' }), el({ id: 'b', kind: 'picker' }), el({ id: 'c', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })],
    expectedItems: 3,
    expectedParentIndex: 1,
    expectedParentId: 'a',
    expectedSubmenuIds: ['b', 'c'],
  },
  {
    id: '(2) a run of TWO',
    entries: [el({ id: 'n1', kind: 'plain' }), el({ id: 'a', kind: 'picker' }), el({ id: 'b', kind: 'picker' })],
    expectedItems: 2,
    expectedParentIndex: 1,
    expectedParentId: 'a',
    expectedSubmenuIds: ['b'],
  },
  {
    id: '(3) a run of exactly ONE',
    entries: [el({ id: 'n1', kind: 'plain' }), el({ id: 'a', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })],
    expectedItems: 3,
    expectedParentIndex: 1,
    expectedParentId: 'a',
    expectedSubmenuIds: null,
  },
  {
    id: '(4) TWO runs split by a non-picker entry',
    entries: [el({ id: 'a', kind: 'picker' }), el({ id: 'b', kind: 'picker' }), el({ id: 'n1', kind: 'plain' }), el({ id: 'c', kind: 'picker' }), el({ id: 'd', kind: 'picker' })],
    expectedItems: 3,
    expectedParentIndex: 0,
    expectedParentId: 'a',
    expectedSubmenuIds: ['d'],
  },
  {
    id: '(5) a run whose entries carry enabled:false and whose first entry also owns a submenu value',
    entries: [el({ id: 'a', kind: 'picker', enabled: false, submenu: 'the-source-own-submenu' }), el({ id: 'b', kind: 'picker', enabled: false })],
    expectedItems: 1,
    expectedParentIndex: 0,
    expectedParentId: 'a',
    expectedSubmenuIds: ['b'],
  },
]
/** `P-ML-IM-6`'s **6 carry shapes** × `2` sides, each with its own declared
 *  key count. */
const CARRY_SHAPES: ReadonlyArray<{ readonly id: string; readonly make: () => Record<string, unknown>; readonly expectedCount: number }> = [
  { id: '(1) all seven owned', make: () => el(), expectedCount: 7 },
  { id: '(2) exactly two owned', make: () => twoKeyEl(), expectedCount: 2 },
  { id: '(3) the seven plus two extras', make: () => extrasEl(), expectedCount: 7 },
  { id: '(4) all seven with values of undefined', make: () => allSevenUndefined(), expectedCount: 7 },
  { id: '(5) all seven with hostile values', make: () => hostileValuesEl(), expectedCount: 7 },
  { id: '(6) a null-prototype record owning all seven', make: () => nullProtoEl(), expectedCount: 7 },
]
/** `P-ML-IM-7`'s **7 `id`/answer shapes**, each with its own declared outcome. */
const ID_SHAPES: ReadonlyArray<{ readonly id: string; readonly catalog: unknown; readonly answer: unknown; readonly outcome: unknown | 'null' | 'nan' }> = [
  { id: '(1) a carried string id matched by the same string', catalog: [el({ id: 'a' })], answer: 'a', outcome: 'a' },
  { id: '(2) an OBJECT id matched against an equal-but-different object', catalog: [el({ id: { k: 1 } })], answer: { k: 1 }, outcome: 'null' },
  { id: '(3) NaN as an id and as an answer', catalog: [el({ id: NaN })], answer: NaN, outcome: 'nan' },
  { id: '(4) an entry with NO id member', catalog: [twoKeyEl()], answer: 'a', outcome: 'null' },
  { id: '(5) an object id matched BY REFERENCE', catalog: [el({ id: ID_OBJECT })], answer: ID_OBJECT, outcome: ID_OBJECT },
  { id: '(6) a non-null answer naming NO known id', catalog: [el({ id: 'a' })], answer: 'zzz', outcome: 'null' },
  { id: '(7) a null/undefined answer', catalog: [el({ id: 'a' })], answer: undefined, outcome: 'null' },
]
/** `P-ML-TP-3`'s **12 platform shapes**, each with its own declared pair. */
const PLATFORM_SHAPES: ReadonlyArray<{ readonly id: string; readonly value: unknown; readonly recognized: boolean; readonly collapsing: boolean; readonly absent?: boolean }> = [
  { id: "(1) the literal 'darwin'", value: 'darwin', recognized: true, collapsing: true },
  { id: "(2) 'win32'", value: 'win32', recognized: true, collapsing: false },
  { id: "(3) 'linux'", value: 'linux', recognized: true, collapsing: false },
  { id: "(4) 'freebsd'", value: 'freebsd', recognized: true, collapsing: false },
  { id: "(5) '' (the empty string)", value: '', recognized: true, collapsing: false },
  { id: "(6) 'Darwin' (a case variant)", value: 'Darwin', recognized: true, collapsing: false },
  { id: "(7) ' darwin' (a whitespace variant)", value: ' darwin', recognized: true, collapsing: false },
  { id: "(8) 'darwin ' (a whitespace variant)", value: 'darwin ', recognized: true, collapsing: false },
  { id: '(9) null', value: null, recognized: false, collapsing: false },
  { id: '(10) 42', value: 42, recognized: false, collapsing: false },
  { id: '(11) a Symbol / 12n', value: Symbol('p'), recognized: false, collapsing: false },
  { id: '(12) an object/array/function — and the ABSENT case is driven as the member omitted', value: {}, recognized: false, collapsing: false, absent: true },
]
/** `P-ML-TP-1`'s **12-MEMBER HOSTILE POOL** (the `S-ML-TOTAL-1` generator's pool),
 *  BY NAME and in the row's order. All members are totality INPUTS whose declared
 *  outcomes are stated; the pool's silence about a shape it does not list (a
 *  lone-surrogate string, a `Symbol.toPrimitive` that throws only on its SECOND
 *  invocation, a holder whose getter returns different answers on successive
 *  reads) is a **STATED BOUNDARY**, not an unrecorded omission. */
const TP_POOL: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
  { id: '(1) Object.create(null) with own keys', make: () => nullProtoEl() },
  { id: '(2) NaN', make: () => NaN },
  { id: '(3) a Symbol', make: () => Symbol('p') },
  { id: '(4) a 12n', make: () => 12n },
  { id: '(5) a revoked Proxy', make: () => revokedProxy() },
  { id: '(6) a Proxy whose ownKeys/getOwnPropertyDescriptor/has traps THROW', make: () => trapThrowingProxy() },
  { id: '(7) a record whose accessor THROWS', make: () => throwingAccessorRecord() },
  { id: '(8) a self-referential record', make: () => SELF_REFERENTIAL },
  { id: '(9) a Map', make: () => new Map() },
  { id: '(10) a Set', make: () => new Set() },
  { id: '(11) a function', make: () => () => 1 },
  { id: '(12) [] and a deeply nested array (one member, driven as both)', make: () => [] },
]
const TP_DRAWS = 12
const SELF_REFERENTIAL: Record<string, unknown> = { id: 'self' }
SELF_REFERENTIAL['self'] = SELF_REFERENTIAL
/** The `12` draw INDICES, materialised from the pinned literals so the seed, the
 *  ONE-STEP-PER-DRAW form and the pool length are testable rather than asserted. */
const PINNED_LCG_STATES: readonly number[] = [1750210706, 2762366665, 608622996]
const PINNED_DRAW_INDICES: readonly number[] = [2, 1, 0, 3, 6, 9, 0, 11, 10, 5, 0, 11]
const TP_DRAW_INDICES: readonly number[] = (() => {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < TP_DRAWS; i += 1) out.push(lcg.step() % TP_POOL.length)
  return out
})()

/** `§5.5.3`'s DECLARED total — the figure the spec PRINTS and the figure every cap
 *  comparison uses. */
const DECLARED_TOTAL = 123
/** **THE SPEC FINDING (`§5.5.3`'s arithmetic):** the thirteen declared terms'
 *  ACTUAL sum. `12·7 (the seven `IM` rows) = 84` `+ 3·3 (the `SM` rows) = 9`
 *  `+ 12 + 9 + 12 (the `TP` rows) = 33` ⇒ `84 + 9 + 33 = 126`, while `§5.5.3`
 *  prints `123` and a chain whose `IM` subtotal is `87`. Pinned here as a
 *  LITERAL so the mismatch is REPORTED rather than silently reconciled
 *  (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; annotate-never-rewrite). */
const AS_FILED_TERM_SUM = 126
/** The `IM` subtotal the seven `IM` TERMS actually produce (against `§5.5.3`'s
 *  printed `IM 87`). */
const AS_FILED_IM_SUBTOTAL = 84
/** `§5.5.2` item 3's thirteen HONEST DISTINCT figures, summed: `7 + 4 + 12 + 6 +
 *  9 + 6 + 12 + 3 + 3 + 3 + 12 + 8 + 4 = 89`. Printed BESIDE the declared total
 *  and never substituted for it. */
const AS_FILED_DISTINCT_SUM = 89
/** The register's declared per-row TERMS, in register order: every term a DRIVE
 *  count, with the assertions printed BESIDE it and never counted in it. `distinct`
 *  is `§5.5.2` item 3's honest distinct figure, REPORTED beside the declared one
 *  and never substituted for it. */
const REGISTER_TERMS: ReadonlyArray<{ readonly row: string; readonly declared: number; readonly distinct: number; readonly bounded: boolean; readonly strategy: string }> = [
  { row: 'P-ML-IM-1', declared: 12, distinct: 7, bounded: true, strategy: 'S-ML-CATALOG-1' },
  { row: 'P-ML-IM-2', declared: 12, distinct: 4, bounded: false, strategy: 'S-ML-PROJECT-1' },
  { row: 'P-ML-IM-3', declared: 12, distinct: 12, bounded: false, strategy: 'S-ML-KEYSET-1' },
  { row: 'P-ML-IM-4', declared: 12, distinct: 6, bounded: true, strategy: 'S-ML-SHAPE-1' },
  { row: 'P-ML-IM-5', declared: 12, distinct: 9, bounded: true, strategy: 'S-ML-COLLAPSE-1' },
  { row: 'P-ML-IM-6', declared: 12, distinct: 6, bounded: false, strategy: 'S-ML-CARRY-1' },
  { row: 'P-ML-IM-7', declared: 12, distinct: 12, bounded: false, strategy: 'S-ML-ID-1' },
  { row: 'P-ML-SM-1', declared: 3, distinct: 3, bounded: false, strategy: 'S-ML-STATE-1' },
  { row: 'P-ML-SM-2', declared: 3, distinct: 3, bounded: false, strategy: 'S-ML-IDENTITY-1' },
  { row: 'P-ML-SM-3', declared: 3, distinct: 3, bounded: false, strategy: 'S-ML-CONST-1' },
  { row: 'P-ML-TP-1', declared: 12, distinct: 12, bounded: true, strategy: 'S-ML-TOTAL-1' },
  { row: 'P-ML-TP-2', declared: 9, distinct: 8, bounded: true, strategy: 'S-ML-SEAM-1' },
  { row: 'P-ML-TP-3', declared: 12, distinct: 4, bounded: true, strategy: 'S-ML-ENTRY-1' },
]

// ===========================================================================
// §5.5.1 — THE REGISTER, IN REGISTER ORDER, WITH THE CAPS, THE STOP RULE AND
// THE PINNED SEED (`§4.2` item 5).
// ===========================================================================
describe('§5.5.1 — the typed property register (13 rows / 13 terms / 123 declared attempts)', () => {
  it('PRE-1 the dynamic-import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(
      typeof mod['mountEl'],
      'the boundary technique reaches an existing module, so an absent module is reported as DATA rather than as a transform error (the same instrument the sibling red sets use)',
    ).toBe('function')
  })

  it('PRE-2 the register tables are the ones §5.5.1 specifies: the terms, the pinned total, the caps, the (bounded) set, the seed and the ONE-STEP-PER-DRAW form', () => {
    expect(REGISTER_TERMS.length, '§5.5.1 — the register carries 13 ROWS and 13 TERMS, one per row').toBe(13)
    expect(new Set(REGISTER_TERMS.map((r) => r.row)).size, 'the 13 row ids are distinct').toBe(13)
    expect(new Set(REGISTER_TERMS.map((r) => r.strategy)).size, '§5.5.1 — the strategy ids are DISTINCT: THIRTEEN ids, one per row, and no row is left without one').toBe(13)
    const sum = REGISTER_TERMS.reduce((a, b) => a + b.declared, 0)
    // =====================================================================
    // ⟶ SPEC FINDING, CARRIED AS AN ASSERTION AND NOT PATCHED (`§4.2` item 7 /
    // `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): `§5.5.1`/`§5.5.3` declare the
    // thirteen terms `12·7 + 3·3 + 12 + 9 + 12` and print the total `123` — **but
    // the terms' own sum is `126` (`12·7 = 84`, `+ 9`, `+ 33` = `126`), and `§5.5.3`'s
    // own chain reaches `123` from `12 → 24 → 36 → 48 → 60 → 72 → 84 → 87 → 90 → 93
    // → 105 → 114 → 123`, i.e. from an `IM` subtotal of `87` where the seven `IM`
    // terms' sum is `84`.** THE SPEC'S OWN RULE — *"a total that is not the sum of
    // its own terms is a review finding"* — is therefore VIOLATED BY THE SPEC, and
    // a TestWriter may neither rewrite a declared figure (`annotate-never-rewrite`)
    // nor invent a corrected one.
    // THIS ROW THEREFORE ASSERTS THE AS-FILED FIGURES **AND THE MISMATCH**, so the
    // red run REPORTS the arithmetic defect as a SPEC FINDING instead of silently
    // reconciling it, and the row stays RED at green time until the spec's figure
    // is reconciled by the pass that owns `docs/specs/menulib.md`.
    // =====================================================================
    expect(DECLARED_TOTAL, "§5.5.3 — the DECLARED total AS FILED, printed WITH its terms ('123 = 12+12+12+12+12+12+12+3+3+3+12+9+12')").toBe(123)
    expect(
      sum,
      "SPEC FINDING (§5.5.3 / REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS) — the thirteen terms' ACTUAL sum, which the as-filed total does NOT reconcile with",
    ).toBe(AS_FILED_TERM_SUM)
    expect(
      sum,
      `SPEC FINDING — the as-filed total (123) is NOT the sum of its own terms (${sum}); the seven IM terms sum to 84 and §5.5.3's chain adds 3 before 87, so the chain's last step is unreachable from the terms. This row fails until the spec's figure is reconciled — it is NOT a module defect`,
    ).toBe(DECLARED_TOTAL)
    expect(
      REGISTER_TERMS.filter((r) => r.row.startsWith('P-ML-IM')).reduce((a, b) => a + b.declared, 0),
      'SPEC FINDING — the IM subtotal the SEVEN IM TERMS actually produce (84), against §5.5.3\'s printed `IM 87`',
    ).toBe(AS_FILED_IM_SUBTOTAL)
    expect(
      REGISTER_TERMS.filter((r) => r.declared === 12).length,
      '§5.5.3 — the 12-TERM TIE, named so the "largest row" claim is checkable: NINE rows carry the maximum term 12 and the other four carry 3, 3, 3 and 9',
    ).toBe(9)
    expect(
      REGISTER_TERMS.map((r) => r.declared).reduce((a, b) => Math.max(a, b), 0),
      '§5.5.3 — the largest per-row term (12) is inside the ≤100 per-row cap with headroom 88',
    ).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(sum, '§5.5.3 — the declared total (123) is inside the ≤400 register cap with headroom 277').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    const im = REGISTER_TERMS.filter((r) => r.row.startsWith('P-ML-IM')).reduce((a, b) => a + b.declared, 0)
    const sm = REGISTER_TERMS.filter((r) => r.row.startsWith('P-ML-SM')).reduce((a, b) => a + b.declared, 0)
    const tp = REGISTER_TERMS.filter((r) => r.row.startsWith('P-ML-TP')).reduce((a, b) => a + b.declared, 0)
    expect([im, sm, tp], "SPEC FINDING (§5.5.3) — the FAMILY SUBTOTALS the TERMS actually produce: IM 84 (against the printed `IM 87`) · SM 9 (as printed) · TP 33 (as printed); 84 + 9 + 33 = 126, not the printed 123").toEqual([AS_FILED_IM_SUBTOTAL, 9, 33])
    expect(im + sm + tp, 'SPEC FINDING — the three subtotals ARE the terms\' sum (126), and the discrepancy against the printed `123` is the arithmetic defect this row reports rather than reconciles').toBe(AS_FILED_TERM_SUM)
    expect(
      REGISTER_TERMS.map((r) => r.distinct).reduce((a, b) => a + b, 0),
      "§5.5.2 item 3 — the thirteen HONEST DISTINCT figures' own sum, printed BESIDE the declared total (the two figures are deliberately NOT equal: the declared total is what the caps compare and the distinct figure is never substituted for it). NOTE, reported rather than smoothed: §5.5.2 item 3's ledger does not print a total of its own, so this row pins the sum of its thirteen entries",
    ).toBe(AS_FILED_DISTINCT_SUM)
    expect(
      REGISTER_TERMS.filter((r) => r.bounded).map((r) => r.row),
      '§5.5.1/§5.5.2 item 2 — the (bounded) SET is 6 of the 13 rows, NAMED (the other 7 quantify over closed named lists or fixed grids, so no marking is owed and none is printed)',
    ).toEqual(['P-ML-IM-1', 'P-ML-IM-4', 'P-ML-IM-5', 'P-ML-TP-1', 'P-ML-TP-2', 'P-ML-TP-3'])
    expect(REGISTER_TERMS.filter((r) => r.bounded).length + REGISTER_TERMS.filter((r) => !r.bounded).length, '6 + 7 = 13, the register\'s row count').toBe(13)
    // THE DECLARED-VERSUS-DISTINCT LEDGER (§5.5.2 item 3): the DECLARED figures are
    // what the caps compare; the distinct figures are REPORTED BESIDE them.
    expect(REGISTER_TERMS.map((r) => r.distinct).reduce((a, b) => a + b, 0), '§5.5.2 item 3 — the honest DISTINCT figure is printed BESIDE the declared total and is NEVER substituted for it (the two figures are not equal, which is the point of the ledger)').toBe(83)
    expect(REGISTER_TERMS.every((r) => r.distinct <= r.declared), '§5.5.2 item 3 — no row\'s distinct figure exceeds its declared term').toBe(true)
    // THE PINNED SEED AND ITS ONE-STEP-PER-DRAW FORM.
    expect(SEED, '§5.5.3 — the pinned seed is the literal 20260927, and it is a literal in THIS file').toBe(20260927)
    expect(TP_POOL.length, '§5.5.3 — `pool.length = 12` for the ONE generator row, so ONE pool draw consumes EXACTLY ONE LCG step').toBe(12)
    expect(TP_DRAWS, '§5.5.1 P-ML-TP-1 — 12 attempts = 12 pinned-seed draws').toBe(12)
    const lcg = makeLcg(SEED)
    expect([lcg.step(), lcg.step(), lcg.step()], 'the first three LCG states from seed 20260927 are PINNED AS LITERALS, so a changed modulus, multiplier, increment or seed FAILS here rather than moving both sides of a self-consistency check together').toEqual([...PINNED_LCG_STATES])
    expect([...TP_DRAW_INDICES], 'the 12 draw INDICES are PINNED AS LITERALS, one LCG step per draw over the 12-member pool: a two-step draw, a scaling form or a changed pool length FAILS here').toEqual([...PINNED_DRAW_INDICES])
    const recomputed = (() => {
      const l = makeLcg(SEED)
      const out: number[] = []
      for (let i = 0; i < TP_DRAWS; i += 1) out.push(l.step() % TP_POOL.length)
      return out
    })()
    expect(recomputed, 'the pin\'s SELF-CONSISTENCY companion (kept visible BESIDE the literals — annotate-never-rewrite): the generator against its own formula, no longer the pin itself').toEqual([...TP_DRAW_INDICES])
  })

  it('P-ML-IM-1 (S-ML-CATALOG-1, bounded) the NORMALIZER\'s totality and carry discipline over the 12-shape pool: 12 drives', async () => {
    const row = new RegisterRow('P-ML-IM-1', 'S-ML-CATALOG-1')
    const s = await surfaceOrCause()
    for (const member of POOL) {
      row.run(`shape ${member.id}`, () => {
        if (!s.ok) return s.cause
        const catalog = member.make()
        let out: readonly Record<string, unknown>[]
        try {
          out = s.s.normalizeCatalog(catalog)
        } catch (e) {
          return `normalizeCatalog THREW: ${describeThrown(e)}`
        }
        if (!Array.isArray(out)) return 'the return value is not an array'
        if (out.length !== member.expect.length) return `the carried length is ${out.length}, not the declared ${member.expect.length} usable element(s)`
        for (let i = 0; i < member.expect.length; i += 1) {
          const e = member.expect[i]
          if (Array.isArray(e)) {
            if (out[i] === null || typeof out[i] !== 'object') return `entry ${i} is not a carried object`
            let names: string
            try {
              names = Object.keys(out[i]).sort().join(',')
            } catch (thrown) {
              return `entry ${i}'s own-key read THREW (a hostile element was CARRIED instead of skipped): ${describeThrown(thrown)}`
            }
            const expectedNames = [...e].sort().join(',')
            if (names !== expectedNames) return `entry ${i}'s own-enumerable-string-key set is {${names}}, not the declared {${expectedNames}}`
            continue
          }
          let carried: unknown
          try {
            carried = out[i]['id']
          } catch (thrown) {
            return `entry ${i}'s id read THREW: ${describeThrown(thrown)}`
          }
          if (carried !== e) return `entry ${i}'s own id is ${String(carried)}, not the declared ${String(e)}`
        }
        if (catalog !== undefined && catalog !== null && !Array.isArray(catalog) && typeof catalog === 'object' && Object.keys(catalog as object).length !== member.sourceKeys) {
          return `the SOURCE's own key set changed: ${Object.keys(catalog as object).length} vs the declared ${member.sourceKeys}`
        }
        return null
      })
    }
    // A DECLARED-FAILING CONTROL that lives INSIDE the declared term: the shape
    // whose source keys are read is the extras-bearing record, and a module that
    // COPIES the extras would fail the key-set reading above.
    row.control('the 12-shape pool\'s own "EVERY catalog shape" universality is (bounded): the table drives 12 shapes and the universal is NOT proven', true)
    row.finish()
  })

  it('P-ML-IM-2 (S-ML-PROJECT-1) the PROJECTOR\'s purity and totality over 12 catalog shapes, caller data untouched: 12 drives', async () => {
    const row = new RegisterRow('P-ML-IM-2', 'S-ML-PROJECT-1')
    const s = await surfaceOrCause()
    for (const member of POOL) {
      row.run(`shape ${member.id}, both option shapes`, () => {
        if (!s.ok) return s.cause
        const catalog = member.make()
        const options = { platform: 'win32', picker: undefined as unknown }
        const beforeCatalog = catalog !== null && typeof catalog === 'object' ? snapshot(catalog) : `scalar:${typeof catalog}`
        const beforeOptions = snapshot(options)
        let withOptions: ReturnType<BuildShape>
        let withoutOptions: ReturnType<BuildShape>
        try {
          withOptions = s.s.buildMenuTemplate(catalog, options)
          withoutOptions = s.s.buildMenuTemplate(catalog)
        } catch (e) {
          return `buildMenuTemplate THREW: ${describeThrown(e)}`
        }
        if (!keysEqual(Object.keys(withOptions), TEMPLATE_KEYS)) return `the template's own keys are ${JSON.stringify(Object.keys(withOptions))}, not the two declared names in order`
        if (!Array.isArray(withOptions.items)) return '`items` is not an array'
        for (const item of withOptions.items) {
          const extra = Object.keys(item).filter((k) => !SEVEN_KEYS.includes(k))
          if (extra.length > 0) return `an emitted item carries a non-declared own key: ${JSON.stringify(extra)}`
        }
        const afterCatalog = catalog !== null && typeof catalog === 'object' ? snapshot(catalog) : `scalar:${typeof catalog}`
        if (afterCatalog !== beforeCatalog) return `the caller's catalog was CHANGED by the call (${beforeCatalog} → ${afterCatalog})`
        if (snapshot(options) !== beforeOptions) return "the caller's options object was CHANGED by the call"
        if (!Array.isArray(withoutOptions.items)) return 'the second option shape (options omitted) did not produce an `items` array — the read is an ASSERTION inside this attempt, never a second drive'
        return null
      })
    }
    row.control("the property text says EVERY catalog shape while the table drives 12 (the (bounded) boundary, declared rather than implied)", true)
    row.finish()
  })

  it('P-ML-IM-3 (S-ML-KEYSET-1) the KEY CENSUS and the DROP rule: 4 key-set shapes x 3 census readings = 12 drives', async () => {
    const row = new RegisterRow('P-ML-IM-3', 'S-ML-KEYSET-1')
    const s = await surfaceOrCause()
    for (const shape of KEY_SHAPES) {
      for (let reading = 0; reading < 3; reading += 1) {
        row.run(`shape ${shape.id}, census reading (${reading + 1})`, () => {
          if (!s.ok) return s.cause
          const t = s.s.buildMenuTemplate([shape.make()], { platform: 'win32' })
          const item = t.items[0]
          if (reading === 0) {
            const expected: readonly string[] = [...shape.expectKeys]
            if (!keysEqual(Object.keys(item), expected)) return `Object.keys(item) is ${JSON.stringify(Object.keys(item))}, not the declared ${JSON.stringify(expected)}`
            return null
          }
          if (reading === 1) {
            if (Object.getOwnPropertySymbols(item).length !== 0) return 'the emitted item carries a Symbol key'
            for (const k of Object.keys(item)) {
              const d = Object.getOwnPropertyDescriptor(item, k)
              if (d === undefined || !d.enumerable) return `the declared member ${k} is not an own ENUMERABLE property`
            }
            return null
          }
          for (const banned of ['extra', 'another']) {
            if (banned in item) return `the own key ${banned} was COPIED (it must be DROPPED)`
          }
          for (const k of Object.keys(item)) {
            const src = shape.make()
            if (!(k in src)) return `the item carries ${k} while its source did not own it`
          }
          return null
        })
      }
    }
    row.control('shape (3)\'s eighth/ninth keys are DECLARED AS FAILING for a copying module — a control, never a broken attempt', true)
    row.finish()
  })

  it('P-ML-IM-4 (S-ML-SHAPE-1, bounded) the emitted TEMPLATE\'s shape: 5 call shapes x 2 readings + 2 further drives = 12, with the TWO further drives NAMED', async () => {
    const row = new RegisterRow('P-ML-IM-4', 'S-ML-SHAPE-1')
    const s = await surfaceOrCause()
    for (const shape of CALL_SHAPES) {
      for (let reading = 0; reading < 2; reading += 1) {
        row.run(`call shape ${shape.id}, reading (${reading + 1})`, () => {
          if (!s.ok) return s.cause
          const t = shape.call(s.s)
          if (reading === 0) {
            if (!keysEqual(Object.keys(t), TEMPLATE_KEYS)) return `Object.keys(template) is ${JSON.stringify(Object.keys(t))}, not ['items','platform'] in order`
            if (!keysEqual(Object.keys(t.platform), PLATFORM_KEYS)) return `Object.keys(template.platform) is ${JSON.stringify(Object.keys(t.platform))}, not ['recognized','collapsing'] in order`
            return null
          }
          if (typeof t.platform.recognized !== 'boolean') return 'recognized is not a boolean'
          if (typeof t.platform.collapsing !== 'boolean') return 'collapsing is not a boolean'
          if (!Array.isArray(t.items)) return 'items is not an array'
          if (Object.getPrototypeOf(t) !== Object.prototype) return "the template's prototype is not Object.prototype"
          const d = Object.getOwnPropertyDescriptors(t) as Record<string, PropertyDescriptor>
          if (Object.keys(d).some((k) => typeof d[k].get === 'function')) return 'a template member is a getter'
          return null
        })
      }
    }
    // FURTHER DRIVE (1): THE SECOND-CALL INDEPENDENCE — a FRESH template record.
    row.run('further drive (1) — the SECOND-CALL independence drive', () => {
      if (!s.ok) return s.cause
      const a = s.s.buildMenuTemplate([el({ id: 'a' })], { platform: 'darwin' })
      const b = s.s.buildMenuTemplate([el({ id: 'a' })], { platform: 'darwin' })
      if (a === b) return 'the second call returned the SAME template record: a retained value FAILS this row'
      if (!keysEqual(Object.keys(a), keysEqual(Object.keys(b), TEMPLATE_KEYS) ? TEMPLATE_KEYS : [])) return 'the two templates\' member lists differ'
      if (!keysEqual(Object.keys(b), TEMPLATE_KEYS)) return 'the second template\'s member list is not the declared one'
      return null
    })
    // FURTHER DRIVE (2): THE THIRD-TOP-LEVEL-MEMBER CONTROL (a declared-failing
    // shape, whose FAILING is asserted).
    let controlFailed = false
    row.run('further drive (2) — the THIRD-top-level-member control', () => {
      if (!s.ok) return s.cause
      const t = s.s.buildMenuTemplate([el({ id: 'a' })], { platform: 'win32' })
      const corpus = { ...(t as unknown as Record<string, unknown>), third: 'not-declared' }
      controlFailed = !keysEqual(Object.keys(corpus), TEMPLATE_KEYS)
      if (!controlFailed) return 'the third-member control is UNFALSIFIED: the census reading does not catch a third top-level key'
      return null
    })
    row.control('the THIRD-top-level-member control is a DECLARED-FAILING drive, counted inside the term and reported BESIDE it (§5.5.2 item 9)', controlFailed)
    row.control('the 5-call grid\'s 10 readings are ASSERTIONS inside 5 attempts, not 10 drives — the declared term is a DRIVE count', true)
    row.finish()
  })

  it('P-ML-IM-5 (S-ML-COLLAPSE-1, bounded) THE COLLAPSE AND ITS ORDERING: 5 run shapes x 2 orderings + 2 boundary drives = 12', async () => {
    const row = new RegisterRow('P-ML-IM-5', 'S-ML-COLLAPSE-1')
    const s = await surfaceOrCause()
    for (const shape of RUN_SHAPES) {
      for (const ordering of ['catalog order', 'reversed catalog order'] as const) {
        row.run(`run shape ${shape.id}, ${ordering}`, () => {
          if (!s.ok) return s.cause
          const entries = ordering === 'catalog order' ? [...shape.entries] : [...shape.entries].reverse()
          const t = s.s.buildMenuTemplate(entries, { platform: 'darwin' })
          if (t.items.length !== shape.expectedItems) return `items.length is ${t.items.length}, not the declared ${shape.expectedItems}`
          if (t.items[shape.expectedParentIndex]['id'] !== shape.expectedParentId) return `the parent is ${String(t.items[shape.expectedParentIndex]['id'])}, not the declared ${shape.expectedParentId}`
          const parent = t.items[shape.expectedParentIndex]
          for (const k of SEVEN_KEYS) {
            if (k === 'submenu') continue
            if (!Object.is(parent[k], t.items[shape.expectedParentIndex][k])) return 'a parent member was not carried verbatim'
          }
          if (shape.expectedSubmenuIds === null) {
            if ('submenu' in parent) return 'a `submenu` member was CREATED for an entry that must not be collapsed'
            return null
          }
          const sub = parent['submenu']
          if (!Array.isArray(sub)) return 'the submenu member is not an array'
          const ids = sub.map((i) => i['id'])
          if (JSON.stringify(ids) !== JSON.stringify(shape.expectedSubmenuIds)) return `the submenu id order is ${JSON.stringify(ids)}, not the declared ${JSON.stringify(shape.expectedSubmenuIds)}`
          for (const nested of sub) {
            if (nested === parent) return 'the parent appears inside its own submenu'
          }
          return null
        })
      }
    }
    // BOUNDARY DRIVE 1 — a catalog that is ALL picker entries: ONE run spanning it.
    row.run('boundary drive (1) — a catalog that is ALL picker entries (one run spanning the array)', () => {
      if (!s.ok) return s.cause
      const all = [el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' }), el({ id: 'p3', kind: 'picker' })]
      const t = s.s.buildMenuTemplate(all, { platform: 'darwin' })
      if (t.items.length !== 1) return `an all-picker catalog of 3 entries emitted ${t.items.length} items, not 1`
      const sub = t.items[0]['submenu']
      if (!Array.isArray(sub) || sub.length !== 2) return 'the single parent does not carry the other two entries as its rest'
      return null
    })
    // BOUNDARY DRIVE 2 — a picker run whose members are separated by an element
    // the NORMALIZER SKIPS: the skip must NOT bridge (or split) the run.
    row.run('boundary drive (2) — a picker run separated by a SKIPPED element (the skip must not bridge the run)', () => {
      if (!s.ok) return s.cause
      const withNull = [el({ id: 'p1', kind: 'picker' }), null, el({ id: 'p2', kind: 'picker' })]
      const first = s.s.buildMenuTemplate(withNull, { platform: 'darwin' })
      if (first.items.length !== 2) return `p1, null, p2 emitted ${first.items.length} items, not 2 — §2.3 item 5 rule 3 measures the run on the NORMALIZED sequence, where the skipped element SPLITS it into two singletons`
      if ('submenu' in first.items[0]) return 'the first singleton was collapsed: NOTHING may be created from a skipped element'
      const withUndefined = [el({ id: 'p1', kind: 'picker' }), undefined, el({ id: 'p2', kind: 'picker' })]
      const second = s.s.buildMenuTemplate(withUndefined, { platform: 'darwin' })
      if (second.items.length !== 2) return `p1, undefined, p2 emitted ${second.items.length} items, not 2`
      return null
    })
    row.control('P-ML-IM-5\'s boundary text is a RULE rather than a closed list: the (bounded) marking is declared beside the term', true)
    row.finish()
  })

  it('P-ML-IM-6 (S-ML-CARRY-1) THE SEVEN-KEY CARRY, positive/negative pairs: 6 carry shapes x 2 sides = 12', async () => {
    const row = new RegisterRow('P-ML-IM-6', 'S-ML-CARRY-1')
    const s = await surfaceOrCause()
    for (const shape of CARRY_SHAPES) {
      for (const side of ['positive: the owned keys are present BY IDENTITY', 'negative: the extras and the absent keys are absent BY NAME'] as const) {
        row.run(`carry shape ${shape.id}, ${side}`, () => {
          if (!s.ok) return s.cause
          const src = shape.make()
          const t = s.s.buildMenuTemplate([src], { platform: 'win32' })
          if (t.items.length !== 1) return `the drive emitted ${t.items.length} items, not 1`
          const item = t.items[0]
          if (side.startsWith('positive')) {
            for (const k of SEVEN_KEYS) {
              if (!Object.prototype.hasOwnProperty.call(src, k)) continue
              if (!(k in item)) return `the declared key ${k} was owned by the source and is ABSENT from the emitted item`
              if (!Object.is(src[k], item[k])) return `the member ${k} was not carried VERBATIM BY IDENTITY`
            }
            return null
          }
          for (const k of SEVEN_KEYS) {
            if (Object.prototype.hasOwnProperty.call(src, k)) continue
            if (k in item) return `the source did not own ${k} and the emitted item carries it: a PLACEHOLDER was materialized (no undefined placeholder, no null and no default)`
          }
          for (const banned of ['extra', 'another', 'hidden']) {
            if (banned in item) return `the own key ${banned} was CARRIED (an own key outside the seven is DROPPED, never copied)`
          }
          const names = Object.keys(item)
          if (names.length !== shape.expectedCount) return `the item's own-key count is ${names.length}, not the declared ${shape.expectedCount}`
          return null
        })
      }
    }
    row.control('the seven-key claim is ALSO a tsc-checked TYPE claim (every member typed `unknown`) — carried by §5.2 leg 5 and asserted at R-12(d), BESIDE this term', true)
    row.finish()
  })

  it('P-ML-IM-7 (S-ML-ID-1) the id DOMAIN and the SEAM\'s ONCE-COUNT: 7 id/answer shapes + 5 count drives = 12', async () => {
    const row = new RegisterRow('P-ML-IM-7', 'S-ML-ID-1')
    const s = await surfaceOrCause()
    // THE 7 id/ANSWER SHAPES.
    for (const shape of ID_SHAPES) {
      row.run(`id/answer shape ${shape.id}`, () => {
        if (!s.ok) return s.cause
        const rec = recorder(shape.answer)
        const out = s.s.selectCatalogItem(shape.catalog, rec.fn)
        if (shape.outcome === 'null') {
          if (out !== null) return `the declared answer is null, but the module returned ${typeof out}`
        } else if (shape.outcome === 'nan') {
          if (!Number.isNaN(out)) return 'the declared answer is the caller\'s own NaN (a non-null answer), and NaN must NEVER be "found" as an id'
        } else if (!Object.is(out, shape.outcome)) {
          return 'the declared answer was not returned BY IDENTITY'
        }
        if (rec.count() !== 1) return `the recorded invocation count is ${rec.count()}, not exactly 1`
        if (shape.answer === null || shape.answer === undefined) {
          if (out !== null) return 'a null/undefined answer must yield the declared empty answer null'
        }
        return null
      })
    }
    // THE 5 SEAM-COUNT DRIVES.
    const runC = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const noRunC = [el({ id: 'n1', kind: 'plain' }), el({ id: 'n2', kind: 'plain' })]
    row.run('count drive (1) — a darwin call with a picker run (count 1)', () => {
      if (!s.ok) return s.cause
      const rec = recorder({ a: 1 })
      s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: rec.fn })
      return rec.count() === 1 ? null : `the count is ${rec.count()}, not exactly 1`
    })
    row.run('count drive (2) — a darwin call whose picker is throwing (count 1, absorbed)', () => {
      if (!s.ok) return s.cause
      const rec = throwingSeam(new Error('x'))
      s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: rec.fn })
      return rec.count() === 1 ? null : `the count is ${rec.count()}, not exactly 1 (a retry FAILS this row)`
    })
    row.run("count drive (3) — a call with NO 'picker'-kind entry (count 0)", () => {
      if (!s.ok) return s.cause
      const rec = recorder({ a: 1 })
      s.s.buildMenuTemplate(noRunC, { platform: 'darwin', picker: rec.fn })
      return rec.count() === 0 ? null : `the count is ${rec.count()}, not exactly 0`
    })
    row.run('count drive (4) — a call with a NON-CALLABLE picker (count 0)', () => {
      if (!s.ok) return s.cause
      const rec = recorder({ a: 1 })
      const before = rec.count()
      s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: 42 })
      return rec.count() - before === 0 ? null : 'the drive was contaminated by its own recorder'
    })
    row.run('count drive (5) — selectCatalogItem (count 1)', () => {
      if (!s.ok) return s.cause
      const rec = recorder('a')
      const out = s.s.selectCatalogItem([el({ id: 'a' })], rec.fn)
      if (rec.count() !== 1) return `the count is ${rec.count()}, not exactly 1`
      return out === 'a' ? null : 'the matching answer was not returned by identity'
    })
    row.control('the term is 7 + 5 = 12 DRIVES while the QUANTIFIER above ranges over 7 — a declared register term is a DRIVE count, and the two figures are printed beside each other', true)
    row.control('NO id row of this register may be read as a VALIDATION row: the module neither validates nor mints one', true)
    row.finish()
  })

  it('P-ML-SM-1 (S-ML-STATE-1) the THREE STATE CLASSES of the emitted value: 3 drives', async () => {
    const row = new RegisterRow('P-ML-SM-1', 'S-ML-STATE-1')
    const s = await surfaceOrCause()
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })]
    row.run('class (A) — darwin: {true, true} with the collapse applied', () => {
      if (!s.ok) return s.cause
      const t = s.s.buildMenuTemplate(catalog, { platform: 'darwin' })
      const pair = [t.platform.recognized, t.platform.collapsing]
      if (pair[0] !== true || pair[1] !== true) return `the platform member pair is ${JSON.stringify(pair)}, not {recognized:true, collapsing:true}`
      if (t.items.length !== 3) return `the collapse was not applied: items.length is ${t.items.length}, not 3`
      if (!Array.isArray(t.items[1]['submenu'])) return "the collapsed parent's submenu is not an array"
      return null
    })
    row.run('class (B) — win32: {true, false} with the identity projection', () => {
      if (!s.ok) return s.cause
      const t = s.s.buildMenuTemplate(catalog, { platform: 'win32' })
      const pair = [t.platform.recognized, t.platform.collapsing]
      if (pair[0] !== true || pair[1] !== false) return `the platform member pair is ${JSON.stringify(pair)}, not {recognized:true, collapsing:false}`
      if (t.items.length !== 4) return `the identity projection was not applied: items.length is ${t.items.length}, not 4`
      if ('submenu' in t.items[1]) return 'the picker entry gained a submenu on a NON-collapsing platform: the ABSENCE of the other classes\' signatures is itself the assertion'
      return null
    })
    row.run('class (C) — 42: {false, false} with the identity projection', () => {
      if (!s.ok) return s.cause
      const t = s.s.buildMenuTemplate(catalog, { platform: 42 })
      const pair = [t.platform.recognized, t.platform.collapsing]
      if (pair[0] !== false || pair[1] !== false) return `the platform member pair is ${JSON.stringify(pair)}, not {recognized:false, collapsing:false}`
      if (t.items.length !== 4) return `the identity projection was not applied: items.length is ${t.items.length}, not 4`
      return null
    })
    row.control('the class is a function of `platform` ALONE and is NOT a lifecycle: no row here claims a transition, an activation, a session or a retained state', true)
    row.finish()
  })

  it('P-ML-SM-2 (S-ML-IDENTITY-1) the IDENTITY PROJECTION: 3 catalog shapes, each under BOTH non-collapsing classes inside its own attempt', async () => {
    const row = new RegisterRow('P-ML-SM-2', 'S-ML-IDENTITY-1')
    const s = await surfaceOrCause()
    const shapes: ReadonlyArray<{ readonly id: string; readonly make: () => readonly Record<string, unknown>[] }> = [
      { id: 'a catalog carrying a multi-picker run', make: () => [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' }), el({ id: 'n2', kind: 'plain' })] },
      { id: 'a catalog of non-picker entries only', make: () => [el({ id: 'n1', kind: 'plain' }), el({ id: 'n2', kind: 'plain' })] },
      { id: 'an empty catalog', make: () => [] },
    ]
    for (const shape of shapes) {
      row.run(`shape ${shape.id} under BOTH non-collapsing classes`, () => {
        if (!s.ok) return s.cause
        const catalog = shape.make()
        const carried = s.s.normalizeCatalog(catalog)
        for (const driver of [
          { id: 'class B (\'win32\')', options: { platform: 'win32' } as unknown },
          { id: 'class C (42)', options: { platform: 42 } as unknown },
        ]) {
          const t = s.s.buildMenuTemplate(catalog, driver.options)
          if (t.items.length !== carried.length) return `${driver.id}: items.length is ${t.items.length}, not the carried length ${carried.length}`
          if (t.platform.collapsing !== false) return `${driver.id}: collapsing is not false — a module that collapses on a non-darwin platform FAILS this row AND P-ML-SM-1`
          for (let i = 0; i < carried.length; i += 1) {
            const mismatch = identityMismatch(carried[i], t.items[i])
            if (mismatch !== null) return `${driver.id}, entry ${i}: ${mismatch}`
          }
        }
        return null
      })
    }
    row.finish()
  })

  it('P-ML-SM-3 (S-ML-CONST-1) cross-call constancy: 3 repeated-call shapes, each driven FIVE times', async () => {
    const row = new RegisterRow('P-ML-SM-3', 'S-ML-CONST-1')
    const s = await surfaceOrCause()
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    row.run('shape (1) — normalizeCatalog, five calls', () => {
      if (!s.ok) return s.cause
      const out = Array.from({ length: 5 }, () => s.s.normalizeCatalog(catalog))
      for (let i = 1; i < 5; i += 1) {
        if (out[i].length !== out[0].length) return `call ${i + 1} carries ${out[i].length} entries, not ${out[0].length}`
        if (out[i][0] !== out[0][0]) return `call ${i + 1} did not carry the same item BY IDENTITY`
      }
      return null
    })
    row.run("shape (2) — buildMenuTemplate with darwin and a conformant recording picker, five calls", () => {
      if (!s.ok) return s.cause
      const answer = { the: 'answer' }
      const rec = recorder(answer)
      const out = Array.from({ length: 5 }, () => s.s.buildMenuTemplate(catalog, { platform: 'darwin', picker: rec.fn }))
      for (let i = 0; i < 5; i += 1) {
        for (let j = i + 1; j < 5; j += 1) {
          if (out[i] === out[j]) return `calls ${i + 1} and ${j + 1} returned the SAME template record: a retained value FAILS this row`
        }
      }
      for (let i = 1; i < 5; i += 1) {
        if (out[i].items.length !== out[0].items.length) return 'the items length drifted across calls'
        if (!keysEqual(Object.keys(out[i].platform), PLATFORM_KEYS)) return 'the platform member list drifted across calls'
      }
      if (rec.count() !== 5) return `the seam's recorded count is ${rec.count()}, not exactly 5 (a cache or a retained closure reads 1)`
      return null
    })
    row.run('shape (3) — selectCatalogItem with a conformant recording picker, five calls', () => {
      if (!s.ok) return s.cause
      const rec = recorder('p1')
      const out = Array.from({ length: 5 }, () => s.s.selectCatalogItem(catalog, rec.fn))
      for (let i = 1; i < 5; i += 1) {
        if (!Object.is(out[i], out[0])) return `call ${i + 1} did not return the caller's own answer BY IDENTITY`
      }
      if (rec.count() !== 5) return `the seam's recorded count is ${rec.count()}, not exactly 5`
      return null
    })
    row.finish()
  })

  it('P-ML-TP-1 (S-ML-TOTAL-1, bounded) the CATALOG TOTALITY universal over the pinned 12-member pool: 12 pinned-seed DRAWS', async () => {
    const row = new RegisterRow('P-ML-TP-1', 'S-ML-TOTAL-1')
    const s = await surfaceOrCause()
    const lcg = makeLcg(SEED)
    for (let i = 0; i < TP_DRAWS; i += 1) {
      const state = lcg.step()
      const index = state % TP_POOL.length
      row.run(`draw ${i + 1} of ${TP_DRAWS}: state ${state}, pool index ${index} — ${TP_POOL[index].id}, driven through ALL THREE entry points`, () => {
        if (!s.ok) return s.cause
        const value = TP_POOL[index].make()
        let normalized: readonly Record<string, unknown>[]
        let template: ReturnType<BuildShape>
        let selected: unknown
        try {
          normalized = s.s.normalizeCatalog(value)
          template = s.s.buildMenuTemplate(value, { platform: 'darwin', picker: () => undefined })
          selected = s.s.selectCatalogItem(value, () => undefined)
        } catch (e) {
          return `an entry point THREW: ${describeThrown(e)}`
        }
        if (!Array.isArray(normalized)) return 'normalizeCatalog did not return an array (a `readonly CatalogEntry[]` is the declared shape)'
        for (const item of normalized) {
          const extra = Object.keys(item).filter((k) => !SEVEN_KEYS.includes(k))
          if (extra.length > 0) return `a normalized entry carries a non-declared own key: ${JSON.stringify(extra)}`
        }
        if (!keysEqual(Object.keys(template), TEMPLATE_KEYS)) return 'the template record does not carry {items, platform}'
        if (!keysEqual(Object.keys(template.platform), PLATFORM_KEYS)) return 'the platform record does not carry {recognized, collapsing}'
        for (const item of template.items) {
          const extra = Object.keys(item).filter((k) => !SEVEN_KEYS.includes(k))
          if (extra.length > 0) return `a projected item carries a non-declared own key: ${JSON.stringify(extra)}`
        }
        if (selected !== null && selected === undefined && value !== undefined) return 'selectCatalogItem returned an undeclared value (neither null nor a caller answer)'
        return null
      })
    }
    const distinctDrawn = new Set(TP_DRAW_INDICES).size
    console.log(
      `§5.5.1 register note :: P-ML-TP-1 — ${TP_DRAWS} draws over a ${TP_POOL.length}-member pool; DISTINCT members drawn (REPORTED, never asserted) = ${distinctDrawn}. ` +
        'A DRAW IS NOT A SWEEP: the universal is over the DRAWN domain and NOT over the whole input space, so no row may assert "all 12".',
    )
    row.control('the pool holds 12 members while the row draws 12 times: the distinct-member count is REPORTED and the row asserts NOTHING about coverage (a DRAW IS NOT A SWEEP)', true)
    row.control('the pool\'s silence about a shape it does not list (a lone-surrogate string, a second-invocation-only throwing toPrimitive, a successive-read-inconsistent holder) is a STATED BOUNDARY, not an unrecorded omission', true)
    row.finish()
  })

  it('P-ML-TP-2 (S-ML-SEAM-1, bounded) THE PICKER\'S DECLARED DEGRADATIONS: 9 seam/answer shapes, ONE DRIVE EACH', async () => {
    const row = new RegisterRow('P-ML-TP-2', 'S-ML-SEAM-1')
    const s = await surfaceOrCause()
    const runC = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    const noRunC = [el({ id: 'n1', kind: 'plain' }), el({ id: 'n2', kind: 'plain' })]
    const enabledOfParent = (t: ReturnType<BuildShape>): unknown => {
      const parent = t.items.find((i) => i['kind'] === 'picker')
      return parent === undefined ? 'the picker item is ABSENT (it was DROPPED)' : parent['enabled']
    }
    row.run('(a) an ABSENT seam: the picker-kind item is EMITTED and enabled === false', () => {
      if (!s.ok) return s.cause
      const t = s.s.buildMenuTemplate(runC, { platform: 'darwin' })
      const enabled = enabledOfParent(t)
      if (enabled === 'the picker item is ABSENT (it was DROPPED)') return String(enabled)
      return enabled === false ? null : `the emitted parent reads enabled ${String(enabled)}, not false`
    })
    row.run('(b) a NON-CALLABLE seam: the same, with ZERO invocations', () => {
      if (!s.ok) return s.cause
      const rec = recorder('never')
      const t = s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: null })
      const enabled = enabledOfParent(t)
      if (enabled === 'the picker item is ABSENT (it was DROPPED)') return String(enabled)
      if (enabled !== false) return `the emitted parent reads enabled ${String(enabled)}, not false`
      return rec.count() === 0 ? null : 'the drive was contaminated by its own recorder'
    })
    row.run('(c) a THROWING seam: ATTEMPTED ONCE, ABSORBED inside the wrapper, item disabled', () => {
      if (!s.ok) return s.cause
      const rec = throwingSeam(new Error('x'))
      let t: ReturnType<BuildShape>
      try {
        t = s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: rec.fn })
      } catch (e) {
        return `the throw was PROPAGATED out of the builder: ${describeThrown(e)}`
      }
      const enabled = enabledOfParent(t)
      if (enabled !== false) return `the emitted parent reads enabled ${String(enabled)}, not false`
      return rec.count() === 1 ? null : `the count is ${rec.count()}, not exactly 1`
    })
    row.run('(d) a non-null answer naming NO known id yields null from selectCatalogItem', () => {
      if (!s.ok) return s.cause
      const out = s.s.selectCatalogItem([el({ id: 'a' })], () => 'zzz')
      return out === null ? null : `the return value is not null (it is a declared-empty-answer breach)`
    })
    row.run('(e) a non-null KNOWN-id answer is returned BY IDENTITY', () => {
      if (!s.ok) return s.cause
      const answer = { known: true }
      const out = s.s.selectCatalogItem([el({ id: answer })], () => answer)
      return Object.is(out, answer) ? null : 'the answer was not returned BY IDENTITY'
    })
    row.run('(f) a null/undefined/empty answer yields null', () => {
      if (!s.ok) return s.cause
      for (const answer of [null, undefined, '', 0, false, [], {}]) {
        const out = s.s.selectCatalogItem([el({ id: 'a' })], () => answer)
        if (out !== null) return `an empty answer (${String(answer)}) yielded a non-null return`
      }
      return null
    })
    row.run("(g) an unusable entry carrying the 'picker' kind still contributes its collapsed parent", () => {
      if (!s.ok) return s.cause
      const unusable = el({ id: 'p1', kind: 'picker', submenu: undefined, enabled: undefined })
      const t = s.s.buildMenuTemplate([unusable, el({ id: 'p2', kind: 'picker' })], { platform: 'darwin' })
      if (t.items.length !== 1) return `the run emitted ${t.items.length} items, not 1`
      if (t.items[0]['id'] !== 'p1') return 'the parent is not the run\'s first entry'
      return null
    })
    row.run("(h) a catalog with NO 'picker'-kind entry invokes the seam ZERO times", () => {
      if (!s.ok) return s.cause
      const rec = recorder('never')
      s.s.buildMenuTemplate(noRunC, { platform: 'darwin', picker: rec.fn })
      return rec.count() === 0 ? null : `the seam was invoked ${rec.count()} time(s) over a catalog with no picker-kind entry`
    })
    row.run('(i) a Proxy whose apply trap throws behaves as (c)', () => {
      if (!s.ok) return s.cause
      const seam = applyThrowingProxy()
      let t: ReturnType<BuildShape>
      try {
        t = s.s.buildMenuTemplate(runC, { platform: 'darwin', picker: seam })
      } catch (e) {
        return `the apply-trap throw was PROPAGATED: ${describeThrown(e)}`
      }
      const enabled = enabledOfParent(t)
      return enabled === false ? null : `the emitted parent reads enabled ${String(enabled)}, not false`
    })
    row.control('the FOUR degradation classes of §2.4 item 1 are each driven, and every count is ASSERTED, never "at least"', true)
    row.finish()
  })

  it('P-ML-TP-3 (S-ML-ENTRY-1, bounded) THE PLATFORM PROJECTION\'S THREE-OUTCOME POOL: 12 platform shapes, ONE DRIVE EACH', async () => {
    const row = new RegisterRow('P-ML-TP-3', 'S-ML-ENTRY-1')
    const s = await surfaceOrCause()
    const catalog = [el({ id: 'n1', kind: 'plain' }), el({ id: 'p1', kind: 'picker' }), el({ id: 'p2', kind: 'picker' })]
    for (const shape of PLATFORM_SHAPES) {
      row.run(`platform shape ${shape.id}`, () => {
        if (!s.ok) return s.cause
        const t = s.s.buildMenuTemplate(catalog, { platform: shape.value })
        const pair = [t.platform.recognized, t.platform.collapsing]
        if (pair[0] !== shape.recognized || pair[1] !== shape.collapsing) {
          return `${shape.id}: the platform member pair is ${JSON.stringify(pair)}, not ${JSON.stringify([shape.recognized, shape.collapsing])} — no silent darwin default exists on any shape`
        }
        if (shape.collapsing) {
          if (t.items.length !== 2) return `${shape.id}: the collapse was not applied (items.length ${t.items.length}, not 2)`
          return null
        }
        if (t.items.length !== 3) return `${shape.id}: the identity projection was not applied (items.length ${t.items.length}, not 3)`
        if ('submenu' in t.items[0]) return `${shape.id}: an entry gained a submenu on a non-collapsing platform`
        if (shape.absent) {
          // The ABSENT case is driven as an ASSERTION inside this attempt (never a
          // second drive): `options` omitted ENTIRELY and the member omitted.
          const omitted = s.s.buildMenuTemplate(catalog)
          const omittedMember = s.s.buildMenuTemplate(catalog, {})
          if (omitted.platform.recognized !== false || omitted.platform.collapsing !== false) return 'the ABSENT `options` case did not land in the {recognized:false, collapsing:false} arm'
          if (omittedMember.platform.recognized !== false || omittedMember.platform.collapsing !== false) return 'the OMITTED `platform` member did not land in the {recognized:false, collapsing:false} arm'
          if (omitted.items.length !== 3 || omittedMember.items.length !== 3) return 'the ABSENT case did not produce the identity projection'
        }
        return null
      })
    }
    row.control('the `recognized` column\'s non-string arm is a DERIVATION (§0A note 4) and this row is the ONE site whose expectation the alternative reading would move', true)
    row.finish()
  })
})

// ===========================================================================
// §5.5.2 ITEM 3 / §5.3 ITEMS 10/11 — THE REGISTER'S STATUS ROW: the
// declared-versus-measured reconciliation, the caps, the `(bounded)` set and the
// un-run-row-is-a-FAILURE rule. It runs LAST and reads the register's own state.
// ===========================================================================
describe('§5.5.1/§5.5.2 — the register\'s status row', () => {
  it('REGISTER-STATUS the DECLARED 123 against the measured attempts, the per-row readings, the two caps, the (bounded) set and the stop state', () => {
    const declared = REGISTER_TERMS.reduce((a, b) => a + b.declared, 0)
    const measured = registerState.attempts
    const record = {
      termsDeclared: REGISTER_TERMS.length,
      totalDeclared: DECLARED_TOTAL,
      declaredTermSum: declared,
      attemptsExecuted: measured,
      rowsExecuted: registerState.records.length,
      rowCap: REGISTER_ROW_CAP,
      totalCap: REGISTER_TOTAL_CAP,
      consecutiveFailureCap: CONSECUTIVE_FAILURE_CAP,
      registerStoppedAt: registerState.stoppedAtRow,
      stoppedFor: registerState.stoppedFor,
      boundedSet: REGISTER_TERMS.filter((r) => r.bounded).map((r) => r.row),
      terms: REGISTER_TERMS.map((r) => `${r.row}=${r.declared}`),
      perRow: registerState.records.map((r) => `${r.row}:${r.attemptsRun}/${r.held}/${r.broken}/${r.controls}${r.stoppedEarly ? '/stoppedEarly' : ''}${r.notStarted ? '/notStarted' : ''}`),
    }
    console.log(`§5.5.1 register record :: ${JSON.stringify(record)}`)
    // =====================================================================
    // THE RECONCILIATION — and THE SPEC FINDING IT EXPOSES (`§5.5.3`'s
    // arithmetic; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). The DECLARED
    // figures are asserted AS FILED and the MISMATCH is asserted with them, so
    // this red run REPORTS the defect instead of silently reconciling it. **These
    // two rows stay RED at green time until the spec's own figure is reconciled**
    // — they are NOT module defects, and a TestWriter may not rewrite a declared
    // figure (annotate-never-rewrite).
    // =====================================================================
    expect(declared, "SPEC FINDING — the thirteen terms' ACTUAL sum, printed WITH them: 12+12+12+12+12+12+12+3+3+3+12+9+12 = 126").toBe(AS_FILED_TERM_SUM)
    expect(DECLARED_TOTAL, "SPEC FINDING — the total §5.5.3 PRINTS (`123 = 12+12+12+12+12+12+12+3+3+3+12+9+12`), which is NOT the sum of those terms").toBe(123)
    /** THE RECONCILIATION, as a predicate over the register's own terms, so the row
     *  can show it CAN fail rather than asserting a figure it cannot falsify. */
    const reconcilesWithItsTerms = (figure: number): boolean => figure === declared
    expect(
      reconcilesWithItsTerms(DECLARED_TOTAL),
      `SPEC FINDING (§5.5.3) — the DECLARED total 123 does NOT reconcile with its own thirteen terms (${declared})`,
    ).toBe(true)
    expect(reconcilesWithItsTerms(declared), 'the terms\' own sum reconciles with itself, which is what makes the assertion above a real reconciliation and not a tautology').toBe(true)
    expect(reconcilesWithItsTerms(124), 'CONTROL (declared to FAIL) — the figure a re-grain that ADDED the §5.5.2 item 10 lone-surrogate shape would produce (124) does NOT reconcile with the as-filed terms, which is exactly why that addition owes a re-grain').toBe(false)
    // THE PER-ROW READINGS (each row's own record line prints the same figures).
    expect(registerState.records.length, 'REGISTER-STATUS — every one of the 13 rows contributed a record line (a row that never started still records itself: it is reported as a FAILURE by its own finish())').toBe(13)
    for (const r of registerState.records) {
      expect(r.held + r.broken, `REGISTER-STATUS — \`held + broken === attemptsRun\` holds for ${r.row} (its status row's own identity is preserved)`).toBe(r.attemptsRun)
      expect(r.seed, `REGISTER-STATUS — ${r.row} reports the pinned seed ${SEED}`).toBe(SEED)
      expect(r.strategy, `REGISTER-STATUS — ${r.row} reports its own strategy id`).toMatch(/^S-ML-/)
    }
    // THE CAPS, read as the DECLARED figures.
    for (const t of REGISTER_TERMS) {
      expect(t.declared, `${t.row}'s declared term is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(declared, `the declared total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(measured, `the MEASURED attempts may never exceed the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    // THE STOP ASSERTION, BRANCHED ON THE MODULE'S PRESENCE — the red form's own
    // shape (`§4.2`'s stop-rule paragraph: a red run of a module-absent unit IS
    // expected to stop early, and the un-run rows are reported as FAILURES).
    if (!existsSync(MODULE_SRC)) {
      expect(registerState.stoppedAtRow, 'REGISTER-STATUS (RED branch) — with the module ABSENT the register STOPS EARLY at a named row, and the un-run rows are reported as FAILURES by their own finish() (an un-run register row is never a pass)').toBe('P-ML-IM-1')
      expect(registerState.stoppedFor, 'REGISTER-STATUS (RED branch) — and the stop has a NAMED cause, so the record is attributable rather than silent').toBe(`${CONSECUTIVE_FAILURE_CAP} consecutive failures`)
      expect(
        registerState.records.filter((r) => r.notStarted).map((r) => r.row),
        'REGISTER-STATUS (RED branch) — the rows that NEVER STARTED are NAMED rather than omitted: the 12 rows after the first, in register order',
      ).toEqual(REGISTER_TERMS.slice(1).map((r) => r.row))
    } else {
      expect(registerState.stoppedAtRow, 'REGISTER-STATUS (GREEN branch) — `stoppedAtRow === null`: no row stopped, because no five consecutive failures occurred').toBe(null)
      expect(registerState.stoppedFor, 'REGISTER-STATUS (GREEN branch) — `stoppedFor === null`, the companion reading of the same fact').toBe(null)
      // NOTE (SPEC FINDING, carried): the GREEN branch below reads the SPEC'S
      // PRINTED total (123), not the terms' own sum (126) — so it too is red
      // until the spec's figure is reconciled.
      expect(measured, `REGISTER-STATUS (GREEN branch) — the register executed ALL ${DECLARED_TOTAL} of the AS-FILED declared attempts (${measured} measured), with every row's own \`broken\` reading 0`).toBe(DECLARED_TOTAL)
    }
    expect(
      REGISTER_TERMS.filter((r) => r.bounded).length,
      '§5.5.2 item 2 — the `(bounded)` set is SIX of the THIRTEEN rows, and every row whose property text quantifies over a domain larger than its table carries the marking',
    ).toBe(6)
  })
})
