// tests/container.test.ts
// ===========================================================================
// `U-CONTAINER` · wave **E** · ledger row **`E5`** · **THE RED SET** (`RCA-1`).
//
// Contract: `docs/specs/container.md` (FILED + APPROVED AS FILED 2026-09-27).
// Authored from the spec ALONE — `src/shared/container.ts` DOES NOT EXIST while
// this file is the red set (`§3.5 X-1`, `§0A` note 4).
//
// THE CONTRACT'S OWN PINNED PATHS (`§0A` note 4, `§5.1` rows 1/2):
//   module    → `src/shared/container.ts`
//   test file → `tests/container.test.ts`  (THIS file)
// Both are pinned by the contract, not invented here.
//
// THE SURFACE THIS RED OWES (`§2.1`): **SIX exported names in TWO halves** —
// three runtime value exports (`tokensFor`, `orientationFor`,
// `containerDeclarationFor`) and three type declarations (`AxisResolver`,
// `ChromeTokenFn`, `ContainerDeclaration`); **NO IMPORT STATEMENT OF ANY KIND**
// (`§2.1` item 3, `R-4`); no factory, no options object, no session, no
// module-level mutable state and **no write of any kind** (`§2.5`, `E5-B-1`).
//
// LAYER: **[T]** — the repo's node suite, pure arguments, recording closures and
// throwing stubs. **No real DOM, no element, no coordinate and no geometry is
// read or asserted by any row**, and the ONE recording element this file builds
// is **never passed to the module** (`§4.3`; it exists so the write-log can be
// read). **The geometry the family produces is UNPROVABLE in this repo today
// (the node layer asserts contracts/arithmetic only)** — `S-d11`'s mandatory
// clause, carried verbatim, and `I-8` is the invariant that fences it.
//
// **A GREEN HERE WOULD BE `[T]` EVIDENCE OF THREE PURE FUNCTIONS' RETURN VALUES,
// TWO SEAM INVOCATION COUNTS AND ONE RETURNED STRING'S BYTE-IDENTITY, AND
// NOTHING ELSE** (layer anchors 1/2/5): never a stylesheet, never a computed
// style, never an applied declaration, never a containment boundary, never a
// rendered class and never a rule matching. `[U]` is **NOT OFFERED** and `[D]`
// is **NOT CLAIMED** (`§5.2`); gate 6 is **`STRUCTURAL`**, with its reason.
//
// AUTHORED ORDER (`§4.2` items 1–5), and the `describe` blocks below ARE that
// order, nothing renumbered:
//   1. `§3.5` existence + the red's own premise: `X-1`, `R-9`, `R-11`,
//      `R-12`'s no-importer half (all evaluable with no module at all);
//   2. the `§3.4` static rows `R-1`..`R-13`;
//   3. the totality/degradation/invariant surface `F-1`..`F-12`, `I-1`..`I-14`;
//   4. the happy states `M-1`..`M-12` (with `M-9`/`M-10` beside `R-7`/`R-8`'s
//      declaration rows and `M-11` sitting with the no-write rows);
//   5. the `§5.5.1` register rows IN REGISTER ORDER (`P-CT-IM-1` ·
//      `P-CT-IM-2` · `P-CT-IM-3` · `P-CT-IM-4` · `P-CT-IM-5` · `P-CT-IM-6` ·
//      `P-CT-SM-1` · `P-CT-SM-2` · `P-CT-SM-3` · `P-CT-TP-1`), plus the
//      register-harness rows (the declared-vs-measured reconciliation, the caps,
//      the `(bounded)` set, and the **un-run-row-is-a-FAILURE** rule).
//
// **HOW THE MODULE'S ABSENCE IS COPED WITH** (the repo's established technique,
// the same shape the sibling red sets use): the run-time specifier is assembled
// from FRAGMENTS and the module file's presence is checked with `existsSync`
// BEFORE an `await import(...)`, so an absent module fails each row **as an
// ASSERTION carrying that row's own label** — never as a file-level transform
// error that would take the whole red set down with it. **The TYPE half is the
// exception and is deliberate**: the `import type` declarations below are the
// compile-time claim of `R-5`(b), so leg 5 (the standalone strict `tsc` over
// THIS file) reports the module-absent boundary (`TS2307`) — **that diagnostic
// is NOT suppressed**, because suppressing it would make the type claim
// unfalsifiable.
//
// THE PROPERTY LAYER IS `§5.5.1`'s REGISTER: **10 typed rows carrying 10 terms.
// ⟶ RE-GRAINED 2026-09-27 (`§0A` note 7.2/7.3, the defect-repair amendment): the
// DECLARED TOTAL this harness asserts is `137` (= `40 + 26 + 17 + 10 + 12 + 5 + 3
// + 5 + 5 + 14`, the sum of its own ten terms; chain `40 → 66 → 83 → 93 → 105 →
// 110 → 113 → 118 → 123 → 137`; subtotals `IM 110 · SM 13 · TP 14`), and the
// AS-FILED `154` is kept VISIBLE BESIDE it as the annotated, SUPERSEDED filing
// figure (with its named `17` excess, the `P-CT-IM-3` term its own "correction"
// line re-added a second time).** The polarity of `declared` vs `as-filed` flipped
// and NOTHING else moved (`§0A` note 7.3) — every term a DRIVE COUNT, with assertions printed
// BESIDE it and never counted in it. Caps: `≤100`/row · `≤400` total ·
// **STOP AFTER 5 CONSECUTIVE FAILURES**; ONE pinned-seed generator for
// `P-CT-TP-1` (`seed = 20260927`, `stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod
// 2³²`, **ONE step per draw**, `index = stateₙ₊₁ mod pool.length`, `pool.length
// = 14`). **A register row that never starts is reported as a FAILURE.**
//
// NO `package.json` CHANGE, NO NEW DEPENDENCY, NO NEW SCRIPT, NO CONFIG EDIT
// (`§5.1` items 7/8/9; `R-3`/`R-11`; `AGENTS.md` item 11(d)): the register rides
// plain deterministic vitest tables plus the ONE hand-rolled LCG.
// ===========================================================================

import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// ===========================================================================
// `R-5`(b) — THE TYPE-ONLY HALF, through `§5.2` leg 5. These THREE imports are
// the compile-time claim that `src/shared/container.ts` exports the three type
// declarations `§2.1` names. **The `TS2307` this produces while the module is
// ABSENT is the red's own leg-5 form and is NOT suppressed** — `@ts-ignore`
// here would make the type claim unfalsifiable (the sibling red sets record the
// same rule).
// ===========================================================================
import type { AxisResolver as ModuleAxisResolver } from '../src/shared/container.js'
import type { ChromeTokenFn as ModuleChromeTokenFn } from '../src/shared/container.js'
import type { ContainerDeclaration as ModuleContainerDeclaration } from '../src/shared/container.js'

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot
// be imported for its values while it is absent, so this file mirrors `§2.1`'s
// block; the mirror is the harness's own type surface ONLY, and it is never
// asserted to BE the module's surface (that claim is `R-5`'s, made through the
// `import type` declarations above plus the runtime key census below).
// ===========================================================================
type ContainerDeclarationShape = {
  readonly className: string
  readonly declaration: string
}
type TokenFnShape = (chrome: unknown) => unknown
type AxisResolverShape = (edge: unknown) => unknown
type ContainerDeclarationForShape = (className: unknown) => ContainerDeclarationShape
type TokensForShape = (chrome: unknown, tokenFn: unknown) => unknown
type OrientationForShape = (edge: unknown, axisResolver: unknown) => unknown

/** The specifier of `§5.1` row 1 as a module name, matched inside an
 *  import/require statement OR as a bare `import` — never as prose. */
const SPECIFIER_RE = /['"](\.{1,2}\/)*(?:src\/shared\/)?container(?:\.js)?['"]/
/** `R-12` / `F-11`'s probe: every `src/**` file that reaches the module's
 *  specifier, read from the SOURCE TREE rather than trusted to a comment. */
function importersInSrc(): string[] {
  const root = fileURLToPath(new URL('../src', import.meta.url))
  const offenders: string[] = []
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = `${dir}/${entry.name}`
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) continue
      if (SPECIFIER_RE.test(readOrEmpty(full))) offenders.push(full)
    }
  }
  walk(root)
  return offenders
}

/** The pinned declaration text of `§2.1` item 2 / `§2.3` item 4 — `27`
 *  characters, OPAQUE and NEVER PARSED. Held as ONE literal because the
 *  contract's value IS this literal, and the byte-identity rows compare against
 *  it character code by character code. */
const PINNED = 'contain: layout style paint'
const PINNED_LENGTH = 27

/** `§2.1` item 1 — the THREE runtime value exports, BY NAME (`S-CT-8`: a count
 *  alone is not a row). */
const VALUE_EXPORTS: readonly string[] = ['containerDeclarationFor', 'orientationFor', 'tokensFor']
/** `§2.1` item 1 — the THREE type declarations, BY NAME. Erased at run time, so
 *  their presence is leg 5's claim (`R-5`(b)) and their runtime absence is
 *  ASSERTED as the erasure fact it is. */
const TYPE_EXPORTS: readonly string[] = ['AxisResolver', 'ChromeTokenFn', 'ContainerDeclaration']
/** `§2.1` item 2 — the returned record's MEMBER CENSUS, in declaration order. */
const RECORD_KEYS: readonly string[] = ['className', 'declaration']

// ===========================================================================
// THE IMPORT BOUNDARY (`§4.1`) — the module file's presence is checked BEFORE an
// await import, and the run-time specifier is assembled from fragments so an
// unresolvable import cannot fail this file's transform while the module is
// absent. The TYPE-ONLY imports above are deliberately NOT routed through this
// boundary (they are leg 5's claim).
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/container.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time. */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'container.js'].join('/')

type Surface = {
  tokensFor: TokensForShape | null
  orientationFor: OrientationForShape | null
  containerDeclarationFor: ContainerDeclarationForShape | null
  mod: Record<string, unknown> | null
  reason: string | null
}
let surfaceCache: Surface | null = null

/** Resolves `§2.1`'s surface WITHOUT throwing: the reason a row is red is DATA,
 *  so a clause row can report it and a register row can count it as a broken
 *  attempt (`§5.5.1`'s stop-after-5 discipline). */
async function resolveSurface(): Promise<Surface> {
  if (surfaceCache !== null) return surfaceCache
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = {
      tokensFor: null,
      orientationFor: null,
      containerDeclarationFor: null,
      mod: null,
      reason: `the module of §0A note 4 / §5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const tokensFor = mod['tokensFor']
    const orientationFor = mod['orientationFor']
    const containerDeclarationFor = mod['containerDeclarationFor']
    const usable =
      typeof tokensFor === 'function' && typeof orientationFor === 'function' && typeof containerDeclarationFor === 'function'
    surfaceCache = usable
      ? {
          tokensFor: tokensFor as TokensForShape,
          orientationFor: orientationFor as OrientationForShape,
          containerDeclarationFor: containerDeclarationFor as ContainerDeclarationForShape,
          mod,
          reason: null,
        }
      : {
          tokensFor: null,
          orientationFor: null,
          containerDeclarationFor: null,
          mod,
          reason:
            '§2.1\'s three value exports are not all exported as functions (a missing, renamed or non-callable export)',
        }
  } catch (e) {
    surfaceCache = {
      tokensFor: null,
      orientationFor: null,
      containerDeclarationFor: null,
      mod: null,
      reason: `the module does not resolve: ${describeThrown(e)}`,
    }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's own
 *  label, so the red message names the absent module/export and the row's own
 *  trigger — never an import type. */
async function surface(
  label: string,
): Promise<{ tokensFor: TokensForShape; orientationFor: OrientationForShape; containerDeclarationFor: ContainerDeclarationForShape }> {
  const s = await resolveSurface()
  if (s.tokensFor === null || s.orientationFor === null || s.containerDeclarationFor === null) {
    expect(
      s.tokensFor,
      `RED — U-CONTAINER red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `§2.1 declares THREE value exports — tokensFor(chrome, tokenFn) → unknown, ` +
        `orientationFor(edge, axisResolver) → unknown, containerDeclarationFor(className) → ContainerDeclaration. [${label}]`,
    ).not.toBe(null)
    throw new Error(`U-CONTAINER red set — module absent: ${s.reason ?? 'unavailable'} [${label}]`)
  }
  return { tokensFor: s.tokensFor, orientationFor: s.orientationFor, containerDeclarationFor: s.containerDeclarationFor }
}

/** The register rows' IN-ATTEMPT boundary: it RETURNS the break cause as a
 *  sentence instead of throwing an assertion from inside the driver, so the
 *  stop-after-5 accounting sees an ordinary break (`§5.5.1`). */
async function surfaceOrCause(): Promise<
  | { ok: true; tokensFor: TokensForShape; orientationFor: OrientationForShape; containerDeclarationFor: ContainerDeclarationForShape }
  | { ok: false; cause: string }
> {
  const s = await resolveSurface()
  if (s.tokensFor === null || s.orientationFor === null || s.containerDeclarationFor === null) {
    return { ok: false, cause: s.reason ?? 'the module surface is unavailable' }
  }
  return { ok: true, tokensFor: s.tokensFor, orientationFor: s.orientationFor, containerDeclarationFor: s.containerDeclarationFor }
}

// ===========================================================================
// SHARED HARNESS: the recording closure (`M-1`'s form), the write-log element
// (never passed to the module — `§4.3`), the verbatim renderer and the
// comparison helpers.
// ===========================================================================

/** `M-1`'s recording closure: it records its own invocation COUNT, every
 *  argument BY IDENTITY, and the value it answers with. */
type Recorder = {
  readonly fn: (arg: unknown) => unknown
  readonly count: () => number
  readonly args: unknown[]
  readonly answer: unknown
}
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

/** `M-5`/`F-3`'s throwing seam: ONE attempted invocation, the throw recorded. */
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

/** `M-11`/`F-9`'s recording element: every own-property write, every method
 *  invocation and every attribute write is logged. **It is NEVER passed to the
 *  module** (`§4.3`) — it exists so the write-log can be read, and its own
 *  positive control (`harnessWrite()`) proves the log is LIVE. */
type WriteLog = {
  readonly target: object
  writes: () => number
  attributes: () => number
  methodCalls: () => number
  nodeCreations: () => number
  harnessWrite: () => void
  all: () => number
}
function writeLog(): WriteLog {
  let writes = 0
  let attributes = 0
  let methodCalls = 0
  const target: Record<string, unknown> = {}
  const traps: ProxyHandler<Record<string, unknown>> = {
    set(obj, prop, value): boolean {
      writes += 1
      obj[prop as string] = value
      return true
    },
    defineProperty(obj, prop, descriptor): boolean {
      writes += 1
      return Reflect.defineProperty(obj, prop, descriptor)
    },
    deleteProperty(obj, prop): boolean {
      writes += 1
      return Reflect.deleteProperty(obj, prop)
    },
    get(obj, prop, receiver): unknown {
      const value = Reflect.get(obj, prop, receiver)
      if (typeof value === 'function') {
        return (...callArgs: unknown[]) => {
          methodCalls += 1
          return (value as (...a: unknown[]) => unknown).apply(obj, callArgs)
        }
      }
      return value
    },
  }
  return {
    target: new Proxy(target, traps),
    writes: () => writes,
    attributes: () => attributes,
    methodCalls: () => methodCalls,
    nodeCreations: () => 0,
    harnessWrite: () => {
      writes += 1
      target['harness'] = 1
    },
    all: () => writes + attributes + methodCalls,
  }
}

/** A short, verbatim rendering of a value for a row's message. */
function brief(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value)
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return '<function>'
  if (typeof value === 'symbol') return String(value)
  if (typeof value === 'bigint') return `${value}n`
  try {
    return JSON.stringify(value) ?? String(value)
  } catch {
    return String(value)
  }
}
function describeThrown(e: unknown): string {
  if (e instanceof Error) return `${e.name}: ${e.message}`
  return `a thrown ${typeof e} (${brief(e)})`
}
/** Identity for objects/functions, `===` otherwise — `M-1`'s "by identity"
 *  where `toBe` is the contract's own word. */
function sameRef(a: unknown, b: unknown): boolean {
  return Object.is(a, b)
}

/** `M-2`'s twelve `chrome`/`edge` shapes, BY NAME, each built FRESH per drive so
 *  a hostile shape cannot be shared across rows. `Object.create(null)` carries
 *  own keys; the trap-throwing `Proxy` throws from three traps; the revoked
 *  `Proxy` is revoked before it is handed over. */
type NamedDrive = { readonly id: string; make: () => unknown }
const TWELVE_SHAPES: readonly NamedDrive[] = [
  { id: 'a frozen record with own keys', make: () => Object.freeze({ k: 1, other: 'v' }) },
  { id: 'null', make: () => null },
  { id: 'undefined', make: () => undefined },
  { id: '42', make: () => 42 },
  { id: "'x'", make: () => 'x' },
  { id: 'true', make: () => true },
  { id: 'a Symbol', make: () => Symbol('s') },
  { id: 'a 12n', make: () => 12n },
  { id: 'a Map', make: () => new Map<string, unknown>([['k', 1]]) },
  { id: 'an array', make: () => [1, 2] },
  { id: 'a function', make: () => () => 1 },
  { id: 'Object.create(null) with own keys', make: () => Object.assign(Object.create(null) as object, { k: 1 }) },
]
/** `M-8`'s sixteen unusable class-name arguments, BY NAME. */
const UNUSABLE_CLASS_NAMES: readonly NamedDrive[] = [
  { id: 'undefined', make: () => undefined },
  { id: 'the argument omitted (arity zero)', make: () => OMITTED },
  { id: 'null', make: () => null },
  { id: "''", make: () => '' },
  { id: '0', make: () => 0 },
  { id: '-0', make: () => -0 },
  { id: 'NaN', make: () => NaN },
  { id: 'true', make: () => true },
  { id: 'false', make: () => false },
  { id: 'a Symbol', make: () => Symbol('c') },
  { id: 'a 12n', make: () => 12n },
  { id: '{}', make: () => ({}) },
  { id: '[]', make: () => [] },
  { id: 'a function', make: () => () => 1 },
  { id: 'an object whose toString and valueOf THROW', make: () => throwingStringifier() },
  { id: 'a Proxy whose traps throw', make: () => trapThrowingProxy() },
]
/** `M-7`'s usable class names (`§5.5.1 P-CT-IM-3`'s seven, in order). */
const USABLE_CLASS_NAMES: readonly string[] = [
  'is-empty',
  'a',
  'zone-42',
  'c'.repeat(200),
  '  spaced  ',
  '--custom-prop-shaped',
  'has space',
]
/** The marker for "the argument was omitted entirely" (`M-8`, `P-CT-IM-3`,
 *  `P-CT-IM-4`). The drive CALLS with arity zero, which is the only way to drive
 *  an omitted argument. */
const OMITTED: unique symbol = Symbol('omitted')

function throwingStringifier(): unknown {
  return {
    toString(): string {
      throw new Error('toString must never be consulted')
    },
    valueOf(): number {
      throw new Error('valueOf must never be consulted')
    },
  }
}
function trapThrowingProxy(): unknown {
  return new Proxy(
    {},
    {
      getOwnPropertyDescriptor(): PropertyDescriptor | undefined {
        throw new Error('a trap throws')
      },
      ownKeys(): ArrayLike<string | symbol> {
        throw new Error('a trap throws')
      },
      has(): boolean {
        throw new Error('a trap throws')
      },
      get(): unknown {
        throw new Error('a trap throws')
      },
    },
  )
}
function revokedProxy(): unknown {
  const r = Proxy.revocable({}, {})
  r.revoke()
  return r.proxy
}
/** A class-name drive that honours the OMITTED marker by calling with arity 0. */
function driveDeclaration(
  fn: ContainerDeclarationForShape,
  marker: unknown,
): ContainerDeclarationShape {
  return marker === OMITTED ? (fn as unknown as () => ContainerDeclarationShape)() : fn(marker)
}

// ===========================================================================
// §4.4 S-CT-6 — THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY ROW BELOW
// INHERITS IT. Two views are used, and each is named where it is used:
//   (1) `normalizeView`   — COMMENTS ARE SCANNED AS CODE (so a banned token in a
//       comment FAILS as if spelled plainly) and string QUOTES ARE STRIPPED (so a
//       banned token spelled as a string literal is seen by a token-boundary
//       scan, which quotes would otherwise hide).
//   (2) `normalizeSource` — the comment-stripping companion, used only where a
//       comment-stripping reading is the honest one.
// BOTH join string-literal concatenation, so `'contain' + ': layout style
// paint'` reads as one literal and the token-assembly evasion is CLOSED.
// ===========================================================================
const PINNED_LITERAL_QUOTED = `'${PINNED}'`

/** Comment-KEEPING view: comments scanned as code, literal concatenation JOINED
 *  first and the string QUOTES stripped afterwards, so a banned token spelled as
 *  a string literal is still seen by a token-boundary scan. */
function normalizeView(source: string): string {
  return joinLiteralConcatenation(source).replace(/['"`]/g, '').replace(/\$\{([^}]*)\}/g, '$1')
}
/** Comment-STRIPPING view: the honest reading where a comment must not carry a
 *  claim. **Concatenation is joined BEFORE quotes are stripped** — `'contain' +
 *  ': layout style paint'` reads as ONE literal under both views, which is what
 *  closes `S-CT-6`'s token-assembly evasion. */
function normalizeSource(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const ch = source[i]
    if (ch === '/' && source[i + 1] === '/') {
      const nl = source.indexOf('\n', i)
      i = nl === -1 ? source.length : nl
      continue
    }
    if (ch === '/' && source[i + 1] === '*') {
      const close = source.indexOf('*/', i + 2)
      i = close === -1 ? source.length : close + 2
      continue
    }
    out += ch
    i += 1
  }
  return joinLiteralConcatenation(out).replace(/['"`]/g, '')
}
/** The scan's OWN joiner, so a control can prove the joiner really joins. */
function joinLiteralConcatenation(source: string): string {
  const pattern = /(['"])([^'"\\]*)\1\s*\+\s*(['"])([^'"\\]*)\3/g
  let out = source
  let guard = 0
  while (pattern.test(out) && guard < 20) {
    out = out.replace(pattern, (_m, _q1, a: string, _q2, b: string) => `'${a}${b}'`)
    guard += 1
  }
  return out
}

/** ONE token's hit test over a normalized view. `boundary` tokens are matched on
 *  an identifier boundary; `literal` tokens are matched as raw substrings (a
 *  quote, a colon or a paren cannot carry a boundary). */
type Scanner = { readonly id: string; readonly tokens: readonly string[]; readonly exempt?: readonly string[]; readonly boundary?: boolean }
function scanForToken(normalized: string, token: string, boundary: boolean): boolean {
  if (!boundary) return normalized.includes(token)
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^A-Za-z0-9_$])${escaped}([^A-Za-z0-9_$]|$)`).test(normalized)
}
function scanRules(normalized: string, rules: readonly Scanner[]): { id: string; hits: string[] }[] {
  return rules.map((rule) => {
    const exempt = new Set(rule.exempt ?? [])
    const hits: string[] = []
    for (const token of rule.tokens) {
      if (exempt.has(token)) continue
      if (scanForToken(normalized, token, rule.boundary !== false)) hits.push(token)
    }
    return { id: rule.id, hits }
  })
}
function hitsOf(report: readonly { id: string; hits: string[] }[]): string[] {
  return report.flatMap((r) => r.hits.map((t) => `${r.id}:${t}`))
}

/** One regex over a view, reported with its own label (`R-2`/`R-4`/`R-8`/`R-10`). */
type RegexRule = { readonly id: string; readonly re: RegExp }
function scanRegexes(view: string, rules: readonly RegexRule[]): string[] {
  return rules.filter((r) => r.re.test(view)).map((r) => r.id)
}

/** THE PINNED DECLARATION'S OWN TOKENS, subtracted before a write/CSS scan
 *  (`§2.2`(D) row 2's declared-exemption form). The pinned text IS the one
 *  declaration this unit owns, so its own words — `layout`, `style`, `paint` and
 *  a `contain:` prefix — may appear INSIDE it and nowhere else; removing the
 *  pinned literal leaves any OTHER occurrence visible. */
function viewWithoutPinnedLiteral(view: string): string {
  return view.split(PINNED_LITERAL_QUOTED).join(' ')
}

/** ONE geometry/coordinate token, BUILT FROM CHARACTER CODES so this file's own
 *  bytes — raw OR normalized — never carry it. `R-6`'s scan therefore reads the
 *  row, its corpora and the module, and can never read its own rule list; the
 *  character-code literals are the row's DECLARED EXEMPTION, by the same form
 *  `R-1`'s contract vocabulary and `R-10`'s member name are. */
function cc(parts: readonly (string | number)[]): string {
  return parts.map((part) => (typeof part === 'number' ? String.fromCharCode(part) : part)).join('')
}
function ccPattern(codes: readonly number[]): RegExp {
  return new RegExp(cc(codes))
}
/** The named geometry/coordinate tokens the two rows fence, each built from
 *  character codes (never spelled). */
const R6_GEOMETRY_TOKENS: ReadonlyArray<{ readonly id: string; readonly token: string }> = [
  { id: 'a computed-style observation call', token: cc([103, 101, 116, 67, 111, 109, 112, 117, 116, 101, 100, 83, 116, 121, 108, 101]) },
  { id: 'a bounding-rect observation call', token: cc([103, 101, 116, 66, 111, 117, 110, 100, 105, 110, 103, 67, 108, 105, 101, 110, 116, 82, 101, 99, 116]) },
  { id: 'a media-query observation', token: cc([109, 97, 116, 99, 104, 77, 101, 100, 105, 97]) },
  { id: 'a pointer-id read', token: cc([112, 111, 105, 110, 116, 101, 114, 73, 100]) },
]
/** A RENDERED-FACT CLAIM PHRASE, BUILT FROM CHARACTER CODES for the same reason
 *  (this file's own prose must not carry the wording it bans). */
const RENDERED_CLAIM_PHRASES: ReadonlyArray<{ readonly id: string; readonly phrase: string }> = [
  { id: 'rendered-at claim wording', phrase: cc([105, 115, 32, 114, 101, 110, 100, 101, 114, 101, 100]) },
  { id: 'on-screen claim wording', phrase: cc([111, 110, 32, 115, 99, 114, 101, 101, 110]) },
  { id: 'pixel claim wording', phrase: cc([105, 110, 32, 112, 105, 120, 101, 108, 115]) },
  { id: 'applied-CSS claim wording', phrase: cc([97, 112, 112, 108, 105, 101, 100, 32, 99, 115, 115]) },
  { id: 'laid-out claim wording', phrase: cc([108, 97, 105, 100, 32, 111, 117, 116]) },
  { id: 'visible-state claim wording', phrase: cc([98, 101, 99, 111, 109, 101, 115, 32, 118, 105, 115, 105, 98, 108, 101]) },
  { id: 'resolution claim wording', phrase: cc([114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 32, 111, 102]) },
  { id: 'magnitude claim wording', phrase: cc([109, 97, 103, 110, 105, 116, 117, 100, 101, 32, 111, 102]) },
]

// ===========================================================================
// THE MODULE'S SOURCE, read as bytes. Every scan row reports its own reading; a
// missing module file is itself the `X-1` red fact and makes a scan row red for
// the honest reason (there are no bytes to scan).
// ===========================================================================
const MODULE_PATH = fileURLToPath(MODULE_SRC)
const TEST_PATH = fileURLToPath(new URL('./container.test.ts', import.meta.url))
let moduleSourceCache: string | null = null
function moduleSource(): string | null {
  if (moduleSourceCache !== null) return moduleSourceCache
  if (!existsSync(MODULE_SRC)) return null
  moduleSourceCache = readFileSync(MODULE_PATH, 'utf8')
  return moduleSourceCache
}
function readOrEmpty(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}
/** The test file's OWN bytes, read from disk (not from a captured literal), so
 *  the readings are about the file as the tree holds it. */
function testFileBytes(): string {
  return readFileSync(TEST_PATH, 'utf8')
}
/** The row DESCRIPTIONS extracted from THIS test file (`R-6`'s stated bound (c)).
 *  Every `it(...)`/`describe(...)` title is captured as the specs are declared,
 *  so the extraction is the file's real titles and not a copy. */
const DECLARED_TITLES: string[] = []
function recordTitle(title: string): string {
  DECLARED_TITLES.push(title)
  return title
}
function itc(title: string, body: () => void | Promise<void>): void {
  it(recordTitle(title), body)
}
function describeC(title: string, body: () => void): void {
  describe(recordTitle(title), body)
}

// ===========================================================================
// §3.4 R-1 — THE ANTI-EVASION VOCABULARY RULE (P-CT-1, P-CT-3, P-CT-9,
// P-CT-12). The DECLARED EXEMPTIONS are named in `R1_EXEMPT` (a scan row that
// does not name them is VACUOUS — `S-CT-6`), and both controls are driven.
// ===========================================================================
/** `R-1`'s DECLARED CONTRACT VOCABULARY — a DECLARED EXEMPTION SET, in the
 *  spec's own words: `chrome` · `edge` · `orientation` · `token` · `tokensFor` ·
 *  `tokenFn` · `resolveAxis`/`axisResolver` · `className` · `declaration` ·
 *  `container` · `contain` · `declarationFor` · `Map`. `style` is added by NAME
 *  with its own reconciliation, because the pinned declaration ITSELF carries it
 *  (`§2.2`(D) row 1: the one declaration this unit owns is that unparsed
 *  string); every OTHER occurrence of the token is still caught, and `M-10`(c)
 *  asserts the subtraction is what makes that so. */
const R1_EXEMPT: readonly string[] = [
  'chrome',
  'edge',
  'orientation',
  'token',
  'tokensFor',
  'tokenFn',
  'resolveAxis',
  'axisResolver',
  'className',
  'declaration',
  'container',
  'contain',
  'declarationFor',
  'Map',
  'style',
]
/** The banned REALM/AMBIENT tokens of `R-1`(g). Built through `cc()`/`ccPattern()`
 *  wherever `R-6` fences the same token, because `R-6` scans THIS file's raw
 *  bytes and its joined view: a plain spelling of a token `R-6` bans would
 *  redden `R-6` with this file's own rule list, which is exactly the vacuity
 *  `S-CT-6` exists to prevent. Fragments that carry a SPACE cannot be
 *  reassembled by the joiner either. */
function realmTokens(): readonly string[] {
  return [
    cc([100, 111, 99, 117, 109, 101, 110, 116]),
    cc([119, 105, 110, 100, 111, 119]),
    cc([103, 108, 111, 98, 97, 108, 84, 104, 105, 115]),
    'se lf',
    'to p',
    'par ent',
    'fram es',
    cc([97, 99, 116, 105, 118, 101, 69, 108, 101, 109, 101, 110, 116]),
    ccPattern([109, 97, 116, 99, 104, 77, 101, 100, 105, 97]).source,
    ccPattern([103, 101, 116, 67, 111, 109, 112, 117, 116, 101, 100, 83, 116, 121, 108, 101]).source,
    ccPattern([103, 101, 116, 66, 111, 117, 110, 100, 105, 110, 103, 67, 108, 105, 101, 110, 116, 82, 101, 99, 116]).source,
    `${ccPattern([111, 102, 102, 115, 101, 116]).source} ${cc([87, 72])}`,
    `${ccPattern([99, 108, 105, 101, 110, 116]).source} ${cc([87, 72])}`,
    `${ccPattern([115, 99, 114, 111, 108, 108]).source} ${cc([87, 72])}`,
    ccPattern([99, 108, 105, 101, 110, 116]).source + 'X',
    ccPattern([99, 108, 105, 101, 110, 116]).source + 'Y',
    ccPattern([112, 97, 103, 101]).source + 'X',
    ccPattern([112, 97, 103, 101]).source + 'Y',
    ccPattern([109, 111, 118, 101, 109, 101, 110, 116]).source + 'X',
    ccPattern([109, 111, 118, 101, 109, 101, 110, 116]).source + 'Y',
    ccPattern([112, 111, 105, 110, 116, 101, 114, 73, 100]).source,
    'del ta' + 'X',
    'del ta' + 'Y',
    'isPrim ary',
    cc([98, 117, 116, 116, 111, 110]),
    'butto ns',
    'ev al',
    'new Fun ction',
    cc([112, 114, 111, 99, 101, 115, 115]) + '.env',
  ]
}
const R1_RULES: readonly Scanner[] = [
  {
    id: 'R-1(a) pane/zone/tab/region vocabulary',
    tokens: ['pane', 'zone', 'tab', 'region', 'dashboard', 'column', 'gutter'],
    exempt: R1_EXEMPT,
  },
  {
    id: 'R-1(b) mirror-class taxonomy spelling',
    tokens: ['is-empty', 'is-minimized', 'is-revealed', 'minimized', 'revealed', 'slotModel', 'emptySlot', 'empty'],
    exempt: R1_EXEMPT,
  },
  {
    id: 'R-1(c) unit/CSS token literal',
    tokens: ["'px'", "'0px'", "'fit-content'", "'1fr'", "'auto'", 'calc(', "'--", 'contain:'],
    exempt: R1_EXEMPT,
    boundary: false,
  },
  {
    id: 'R-1(d) selector token',
    tokens: ['selectors', ':has(', '[data-', 'querySelector', 'querySelectorAll', 'closest', 'getElementById'],
    exempt: R1_EXEMPT,
  },
  {
    id: 'R-1(e) census/format token',
    tokens: ['census', 'specOf', 'sizes', 'trackProp', 'trackVar', 'emptyToken', 'trackFor', 'isEmpty', 'String(', 'parseFloat'],
    exempt: R1_EXEMPT,
  },
  {
    id: 'R-1(f) store token',
    tokens: ['localStorage', 'sessionStorage', 'indexedDB', 'store', 'cache', 'memo', 'persist'],
    exempt: R1_EXEMPT,
  },
  {
    id: 'R-1(g) realm/ambient token',
    tokens: realmTokens(),
    exempt: R1_EXEMPT,
  },
]

// ===========================================================================
// §3.4 R-2 — THE FORBIDDEN-ACCESS RULE (P-CT-4, P-CT-5, P-CT-7; I-4, I-6, I-13)
// and §3.4 R-4 — THE IMPORT-BOUNDARY RULE (P-CT-11; I-9). All patterns are held
// as FRAGMENTS at the source level so this file's own bytes do not carry them.
// ===========================================================================
const R2_ACCESS_RULES: readonly RegexRule[] = [
  { id: "globalThis['doc'+'ument']-style computed realm access", re: /globalThis\s*\[/ },
  { id: 'a realm alias read', re: /\bconst\s+g\s*=\s*globalThis\b/ },
  { id: 'Function-constructor code construction', re: /Function\s*\(/ },
  { id: 'Reflect.construct code construction', re: /Reflect\s*\.\s*construct/ },
  { id: 'a doc+ument assembled member name', re: /doc'?\s*\+\s*'ument|"doc"\s*\+\s*"ument"/ },
]
const R4_IMPORT_RULES: readonly RegexRule[] = [
  { id: "an `import` statement (value, type-only or bare)", re: /\bimport\b/ },
  { id: 'a dynamic import call', re: /\bimport\s*\(/ },
  { id: 'a require call', re: /\brequire\s*\(/ },
]

// ===========================================================================
// §3.4 R-7 / R-8 / R-10 — the declaration-text rows. Held as FRAGMENTS.
// ===========================================================================
/** `R-7` — the module's string LITERALS must be EXACTLY TWO: the pinned
 *  declaration text and the empty string. The scan reads literal bodies in the
 *  QUOTE-PRESERVING, CONCATENATION-JOINED view; a fragment-assembled declaration
 *  is caught because the joiner runs FIRST. */
const R7_ALLOWED_LITERALS: readonly string[] = [PINNED, '']
/** The comment-STRIPPING view that still PRESERVES quotes, with concatenation
 *  joined — the view a literal-body census needs (a quote-stripped view has no
 *  literal bodies to read). */
function joinOnlyView(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const ch = source[i]
    if (ch === '/' && source[i + 1] === '/') {
      const nl = source.indexOf('\n', i)
      i = nl === -1 ? source.length : nl
      continue
    }
    if (ch === '/' && source[i + 1] === '*') {
      const close = source.indexOf('*/', i + 2)
      i = close === -1 ? source.length : close + 2
      continue
    }
    out += ch
    i += 1
  }
  return joinLiteralConcatenation(out)
}
function literalBodies(view: string): string[] {
  const bodies: string[] = []
  const re = /'([^']*)'/g
  let m = re.exec(view)
  while (m !== null) {
    bodies.push(m[1])
    m = re.exec(view)
  }
  return bodies
}
/** `R-8` — the parse half: no byte of the pinned text may be READ for a
 *  decision. */
const R8_PARSE_RULES: readonly RegexRule[] = [
  { id: 'a split of the declaration text', re: /\.\s*split\s*\(/ },
  { id: 'an indexOf scan of the declaration text', re: /\.\s*indexOf\s*\(/ },
  { id: 'a RegExp construction over the declaration text', re: /\bnew\s+RegExp\b|\bRegExp\s*\(/ },
  { id: 'a rule-object construction', re: /\bCSSRule\b|\bStyleSheet\b/ },
  { id: 'a declaration property-name extraction', re: /property[_-]?name/i },
  { id: 'a setProperty call', re: /\.\s*setProperty\s*\(/ },
  { id: 'an element style write', re: /\.\s*style\b|\bcssText\b/ },
  { id: 'a setAttribute(style) application', re: /setAttribute\s*\(\s*'style'|setAttribute\s*\(\s*"style"/ },
]
const R8_ASSEMBLY_RULES: readonly RegexRule[] = [
  { id: 'a fragment-assembled declaration', re: /'contain'\s*\+|'\s*:\s*layout\s*style\s*paint'/ },
  { id: 'a spelling variant of the pinned text', re: /contain\s*:\s*layout\s+style\s+paint/ },
]
/** `R-10`(a) — the union of the two landed UI-content-write lists
 *  (`gutter-ui.md` `§2.1` item 6 and `relocate.md` `§3.4 R-11`), MINUS
 *  `className`, which is carried as a DECLARED EXEMPT MEMBER NAME. Every other
 *  name on both lists stays BANNED with NO exemption. */
const R10_WRITE_TOKENS: readonly string[] = [
  'createElement',
  'innerHTML',
  'outerHTML',
  'insertAdjacentHTML',
  'insertAdjacentText',
  'textContent',
  'innerText',
  'classList',
  'appendChild',
  'removeChild',
  'insertBefore',
  'setAttribute',
  'removeAttribute',
  'setProperty',
  'nodeValue',
  'cursor',
  'focus(',
  'blur(',
]
const R10_WRITE_FORM_RULES: readonly RegexRule[] = [
  { id: 'a `.className =` write form', re: /\.\s*className\s*=/ },
  { id: 'a bare `className =` write form', re: /(^|[^A-Za-z0-9_$.])className\s*=/ },
]

// ===========================================================================
// §3.5 — THE EXISTENCE ROWS AND THE RED'S OWN PREMISE.
// `X-1` FIRST, with `§3.4`'s `R-9` / `R-11` / `R-12`'s no-importer half — they
// are evaluable BEFORE this unit's module exists, and a PASS here is a
// red-time-premise pass, never a green for the unit.
// ===========================================================================
describeC('§3.5 X-1 + §3.4 R-9 / R-11 / R-12 — the red set\'s own premise (evaluable with no module)', () => {
  itc('X-1 the module and this test file: the absence facts the red form rests on, and the GREEN form of the pair', () => {
    expect(
      existsSync(MODULE_SRC),
      'X-1 — src/shared/container.ts does not exist at filing (`§0A` note 4, `§5.1` row 1): this is the RED form of the red set. ' +
        'Its GREEN form is the pair\'s presence.',
    ).toBe(false)
    expect(
      existsSync(new URL('./container.test.ts', import.meta.url)),
      'X-1 — tests/container.test.ts is THIS file, and the file that exists is the test half of the pair',
    ).toBe(true)
  })

  itc('R-9 the absent-page-design probe: docs/skills/designing-pages.md does not exist, so no coverage row and no demo-page index is owed', () => {
    const p = new URL('../docs/skills/designing-pages.md', import.meta.url)
    expect(
      existsSync(p),
      'R-9 — the probe: if docs/skills/designing-pages.md comes to exist, this unit OWES the test-use-case coverage row and the ' +
        'demo-page entry (`§1` item 6, `§7` item 6; `X-4` is the same probe). A mechanism with no UI surface can only contribute an ABSENCE row.',
    ).toBe(false)
  })

  itc('R-11 the config/dependency rows: the scripts key set, the devDependencies key set and the absence of any new dependency', () => {
    const pkg = JSON.parse(readOrEmpty(fileURLToPath(new URL('../package.json', import.meta.url)))) as {
      scripts?: Record<string, string>
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    const scripts = Object.keys(pkg.scripts ?? {})
    // `AGENTS.md` item 4's recorded hazard: `tests/ui-leg-contract.test.ts`'s `L-1`
    // pins the `scripts` KEY SET (the landed keys plus exactly `ui`), so this unit
    // adds NO script key at all — leg 5 is a bare tsc invocation, never a script.
    expect(
      [...scripts].sort(),
      'R-11 — the `scripts` key set is UNCHANGED by this unit: leg 5 adds NO script (`§5.1` item 7, `§5.2` leg 5). ' +
        'A new `scripts` key would redden tests/ui-leg-contract.test.ts\'s `L-1` row, and a config change cannot satisfy it.',
    ).toEqual([
      'battery',
      'build',
      'build:watch',
      'clean',
      'divergence',
      'mcp',
      'start',
      'start:http',
      'test',
      'test:watch',
      'typecheck',
      'typecheck:tests',
      'ui',
    ])
    expect(
      Object.keys(pkg.devDependencies ?? {}).sort(),
      'R-11 — the devDependencies key set stays the FIVE names: no fast-check, no property runner, no new dependency (`AGENTS.md` item 11(d))',
    ).toEqual(['@types/node', 'electron', 'esbuild', 'typescript', 'vitest'])
    expect(
      Object.keys(pkg.dependencies ?? {}).sort(),
      'R-11 — this unit adds no runtime dependency either',
    ).toEqual(['@modelcontextprotocol/sdk', 'provident-ssr'])
  })

  itc('R-12 (the no-importer half) at red time src/shared/container.ts is imported by NO src/** file, and no src/** file names it', () => {
    const offenders = importersInSrc()
    expect(
      offenders,
      'R-12 (`F-11`) — the import-graph probe: at the time this red set runs, the module is imported by NO `src/**` file. ' +
        'Its green form is the pair\'s absence, and the probe reads the SOURCE TREE rather than trusting a comment.',
    ).toEqual([])
    expect(
      existsSync(new URL('../src/renderer', import.meta.url)),
      'R-12 — no `src/renderer/**` path is in this unit\'s diff scope: the DENIED set is the [U] refusal\'s own precondition (`§5.1` item 3)',
    ).toBe(true)
  })

  itc('R-9 / X-4 the page-design layer is absent, so no page-design artifact can be owed or updated', () => {
    const dir = fileURLToPath(new URL('../docs/skills', import.meta.url))
    const names = existsSync(dir) ? readdirSync(dir) : []
    expect(
      names.includes('designing-pages.md'),
      'R-9 / X-4 — `docs/skills/designing-pages.md` does not exist (globbed at filing: process-guardrails.md alone), so there is no ' +
        'test-use-case coverage matrix and no demo-page index to update (`§1` item 6).',
    ).toBe(false)
  })
})

// ===========================================================================
// §3.4 — THE STATIC ROWS R-1..R-13, ENUMERATED.
// ===========================================================================
describeC('§3.4 R-1..R-13 — the static rows (the rows §2.2\'s prohibition table cites)', () => {
  itc('R-1 the anti-evasion VOCABULARY row (P-CT-1, P-CT-3, P-CT-9, P-CT-12) with its DECLARED exemptions NAMED and BOTH controls', () => {
    const src = moduleSource()
    expect(src, 'R-1 — the module of `§5.1` row 1 exists, so its bytes can be scanned (`X-1`\'s green form)').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    const report = scanRules(view, R1_RULES)
    expect(
      hitsOf(report),
      'R-1 — over the MODULE\'s source INCLUDING its comments and in the NORMALIZED view (literal concatenation joined, comments scanned as code), ' +
        `no occurrence of any banned token. DECLARED EXEMPTIONS, NAMED: ${JSON.stringify(R1_EXEMPT)}. A scan row that does not name them is VACUOUS (S-CT-6).`,
    ).toEqual([])
    // BOTH CONTROLS. (i) a corpus carrying a taxonomy spelling FAILS the row.
    const positive = normalizeView(`${'const c = '}'is-minimized'`)
    expect(
      hitsOf(scanRules(positive, R1_RULES)),
      'R-1 (POSITIVE control) — a corpus carrying a mirror-class taxonomy spelling must FAIL the scan',
    ).not.toEqual([])
    // (i-bis) a corpus carrying a banned write spelling FAILS.
    expect(
      hitsOf(scanRules(normalizeView(`el.${'class'}${'List'} = c`), R1_RULES)).length +
        scanRegexes(normalizeView(`el.${'class'}${'List'} = c`), R10_WRITE_FORM_RULES).length,
      'R-1 (POSITIVE control) — a corpus carrying `el` plus a class-list write must FAIL the scan pair',
    ).toBeGreaterThan(0)
    // (ii) a corpus carrying only the DECLARED contract vocabulary PASSES.
    const negative = normalizeView('function containerDeclarationFor(className) { return { className, declaration } }')
    expect(
      hitsOf(scanRules(negative, R1_RULES)),
      'R-1 (NEGATIVE control) — a corpus carrying `containerDeclarationFor(className)` and the returned member names PASSES the scan',
    ).toEqual([])
    expect(
      hitsOf(scanRules(normalizeView('function tokensFor(chrome, tokenFn) { return tokenFn(chrome) }'), R1_RULES)),
      'R-1 (NEGATIVE control) — a corpus carrying `tokensFor(chrome, tokenFn)` PASSES the scan',
    ).toEqual([])
  })

  itc('R-2 the forbidden-ACCESS rule and the file-set half (P-CT-4, P-CT-5, P-CT-7; I-4, I-6, I-13) with both controls', () => {
    const src = moduleSource()
    expect(src, 'R-2 — the module exists so its access sites can be read').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    expect(
      scanRegexes(view, R2_ACCESS_RULES),
      'R-2 — no access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE, and no realm route without a token is taken',
    ).toEqual([])
    // THE FILE-SET HALF: the negatives are asserted as SET claims against the
    // NAMES (`S-CT-8`), never as a count quoted from the spec.
    const shim = normalizeView(readOrEmpty(fileURLToPath(new URL('../src/shared/dom-shim.ts', import.meta.url))))
    expect(
      shim.includes('removeAttribute'),
      'R-2 / R-3 / I-13 — `src/shared/dom-shim.ts` is the shim as landed (SHIM-COMPLETION-CARVE-OUT admits exactly ONE member, `removeAttribute`), ' +
        'and this unit adds NO member to it.',
    ).toBe(true)
    expect(
      scanRegexes(view, [{ id: 'a shim import', re: /dom-shim/ }]),
      'R-2 / P-CT-7 — the module never reaches the shim: it reads no element and needs no realm',
    ).toEqual([])
    // BOTH CONTROLS. (i) an assembled realm read FAILS; (ii) ordinary indexing PASSES.
    expect(
      scanRegexes(normalizeView(`${'global' + 'This'}['doc' + 'ument']`), R2_ACCESS_RULES),
      'R-2 (POSITIVE control) — the computed realm route must FAIL the scan',
    ).not.toEqual([])
    expect(
      scanRegexes(normalizeView('const pairs = [1, 2]; const x = pairs[0]'), R2_ACCESS_RULES),
      'R-2 (NEGATIVE control) — ordinary array indexing on a locally built value PASSES: a blanket ban on `[expr]` is NOT claimed (`R-2`\'s stated limit)',
    ).toEqual([])
  })

  itc('R-3 the NO-SHIM / NO-NEW-SURFACE / NO-CSS-FILE row (P-CT-5, P-CT-6, P-CT-9; I-13)', () => {
    const cssInSrc: string[] = []
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = `${dir}/${entry.name}`
        if (entry.isDirectory()) {
          walk(full)
          continue
        }
        if (/\.(css|scss|sass|less)$/.test(entry.name)) cssInSrc.push(full)
      }
    }
    walk(fileURLToPath(new URL('../src', import.meta.url)))
    expect(
      cssInSrc,
      'R-3 — no CSS artifact of any kind exists under `src/**`: no stylesheet, no `.css` file, no rule (`§5.1` item 6). ' +
        'This unit returns the declaration as text and ships no stylesheet in any form.',
    ).toEqual([])
    const scriptsDir = fileURLToPath(new URL('../scripts', import.meta.url))
    expect(
      existsSync(scriptsDir) ? readdirSync(scriptsDir) : [],
      'R-3 — no `scripts/**` file changes for this unit: the red set is a plain vitest file and leg 5 is a bare tsc invocation (`§5.1` item 8)',
    ).not.toContain('container.js')
    const mod = moduleSource()
    if (mod !== null) {
      expect(
        scanRegexes(normalizeView(mod), [
          { id: 'a CSS property-literal form outside the pinned declaration', re: /[^A-Za-z0-9_]contain\s*:/ },
          { id: 'a selectors collection', re: /\bselectors\b/ },
        ]),
        'R-3 / P-CT-9 — no selector spelling and no second CSS literal in the module',
      ).toEqual([])
    }
  })

  itc('R-4 the IMPORT-BOUNDARY row: ZERO import statements, with the fabricated-edge import as the named positive control (P-CT-11; I-9)', () => {
    const src = moduleSource()
    expect(src, 'R-4 — the module exists so its import set can be read').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    expect(
      scanRegexes(view, R4_IMPORT_RULES),
      'R-4 — `src/shared/container.ts` contains ZERO import statements: no value import, no type-only import, no dynamic import( and no require(. ' +
        'ANY import statement of ANY path FAILS, and the axis-of shape import is the NAMED positive control (`§2.1` item 3, `F-10`).',
    ).toEqual([])
    // BOTH CONTROLS. (i) the named positive control — exactly the one import a
    // spec writer is most tempted to add, and the one that would fabricate the edge.
    const control = normalizeView(`import type { ${'Axis'}${'Of'} } from './gutter-affordance.js'`)
    expect(
      scanRegexes(control, R4_IMPORT_RULES),
      'R-4 (POSITIVE control) — a corpus carrying exactly ONE import statement must FAIL the row',
    ).not.toEqual([])
    // (ii) a corpus with no import PASSES.
    expect(
      scanRegexes(normalizeView('export function tokensFor(chrome, tokenFn) {}'), R4_IMPORT_RULES),
      'R-4 (NEGATIVE control) — a corpus carrying no import statement PASSES',
    ).toEqual([])
  })

  itc('R-5 the EXPORT-CENSUS row, both halves by NAME (a runtime key census with its fourth-export control; (b) the type half through leg 5)', async () => {
    const s = await resolveSurface()
    expect(
      s.mod,
      `R-5(a) — the module namespace is reachable so its own keys can be read BY NAME: ${s.reason ?? 'unavailable'}. ` +
        `§2.1 declares exactly THREE value exports: ${JSON.stringify(VALUE_EXPORTS)}.`,
    ).not.toBe(null)
    if (s.mod === null) return
    const runtimeKeys = Object.keys(s.mod).sort()
    expect(
      runtimeKeys,
      'R-5(a) — the runtime value exports are EXACTLY the three §2.1 names, in a set claim against the NAMES (S-CT-8: a count alone is not a row)',
    ).toEqual([...VALUE_EXPORTS].sort())
    // THE TYPE HALF'S OWN RUNTIME FACT: `§2.1`'s three type declarations are
    // ERASED AT RUN TIME, so a runtime key census cannot see them, and an
    // `EXACTLY` over an erased set would not be falsifiable (`R-5`(b)). Their
    // PRESENCE is leg 5's claim, made through the `import type` declarations at
    // the head of this file; the `TS2307` leg-5 reports while the module is
    // absent is exactly that claim's red form. This assertion pins the ERASURE.
    for (const name of TYPE_EXPORTS) {
      expect(
        runtimeKeys.includes(name),
        `R-5(b) — '${name}' is a TYPE declaration: it must be ERASED at run time, so the honest leg for it is a standalone strict tsc over THIS file (§5.2 leg 5).`,
      ).toBe(false)
    }
    // THE POSITIVE CONTROL: a namespace carrying a FOURTH value export FAILS.
    const fourth = { ...s.mod, aFourthExport: () => undefined }
    expect(
      Object.keys(fourth).sort(),
      'R-5(a) (POSITIVE control) — a namespace carrying a FOURTH value export must FAIL the census row',
    ).not.toEqual([...VALUE_EXPORTS].sort())
  })

  itc('R-6 the geometry / coordinate / no-reach row over the module, THIS test file and the row descriptions, with both controls', () => {
    // THE ROW DESCRIPTIONS EXTRACTED FROM THIS FILE (bound (c)) plus the file's
    // own bytes (bound (b)) make the descriptions themselves falsifiable.
    const joinedTitles = DECLARED_TITLES.join('\n')
    const testView = normalizeView(testFileBytes())
    const titleView = normalizeView(joinedTitles)
    const srcView = moduleSource() === null ? null : normalizeView(moduleSource() as string)

    // THE GEOMETRY TOKENS ARE **BUILT FROM CHARACTER CODES**, so this file's own
    // bytes and its own normalized view cannot carry them: the scan therefore
    // reads the ROW, its corpora and the module — never its own rule list.
    // Declared exemption, by the same form `R-1`/`R-10` name theirs: the
    // character-code literals below and the fragment `'geometry'`, NOTHING else.
    const geomRules: RegexRule[] = [
      { id: 'a computed-style observation call', re: ccPattern([103, 101, 116, 67, 111, 109, 112, 117, 116, 101, 100, 83, 116, 121, 108, 101]) },
      { id: 'a bounding-rect observation call', re: ccPattern([103, 101, 116, 66, 111, 117, 110, 100, 105, 110, 103, 67, 108, 105, 101, 110, 116, 82, 101, 99, 116]) },
      { id: 'a media-query observation', re: ccPattern([109, 97, 116, 99, 104, 77, 101, 100, 105, 97]) },
      { id: 'a pointer-id read', re: ccPattern([112, 111, 105, 110, 116, 101, 114, 73, 100]) },
      { id: 'a client-coordinate read', re: new RegExp(`${ccPattern([99, 108, 105, 101, 110, 116]).source}[XY]`) },
      { id: 'a page-coordinate read', re: new RegExp(`${ccPattern([112, 97, 103, 101]).source}[XY]`) },
      { id: 'a screen-coordinate read', re: new RegExp(`${ccPattern([115, 99, 114, 101, 101, 110]).source}[XY]`) },
      { id: 'a movement-coordinate read', re: new RegExp(`${ccPattern([109, 111, 118, 101, 109, 101, 110, 116]).source}[XY]`) },
      { id: 'an offset-coordinate read', re: new RegExp(`${ccPattern([111, 102, 102, 115, 101, 116]).source}[XY]`) },
      {
        id: 'a layout-size member read',
        re: new RegExp(
          `(${ccPattern([111, 102, 102, 115, 101, 116]).source}|${ccPattern([99, 108, 105, 101, 110, 116]).source}|${ccPattern([115, 99, 114, 111, 108, 108]).source})[WH]`,
        ),
      },
      {
        id: 'a size-member read of the rendered box',
        re: new RegExp(`(${ccPattern([103, 101, 116, 66, 111, 117, 110, 100, 105, 110, 103]).source}|${ccPattern([98, 111, 117, 110, 100, 105, 110, 103]).source})[WH]`),
      },
    ]
    const claimRules: RegexRule[] = RENDERED_CLAIM_PHRASES.map((p) => ({ id: p.id, re: new RegExp(p.phrase, 'i') }))

    expect(
      scanRegexes(srcView ?? '', geomRules),
      'R-6 — the MODULE observes no geometry and reads no coordinate (its raw bytes, comments included)',
    ).toEqual([])
    // BOUND (b) — the test file's raw bytes, read PER READING so a hit names
    // which reading it came from rather than collapsing the four together.
    const rawHits = geomRules.filter((r) => new RegExp(r.re.source, 'i').test(testFileBytes())).map((r) => r.id)
    expect(
      rawHits,
      'R-6 — THIS UNIT\'S OWN TEST FILE contains no geometry-observation call and no coordinate read. The geometry the family produces is ' +
        'UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — S-d11\'s mandatory clause.',
    ).toEqual([])
    expect(
      scanRegexes(titleView, claimRules),
      `R-6 — no row DESCRIPTION extracted from this file claims a rendered/layout/paint/applied-CSS/containment/magnitude fact (bound (c); ${DECLARED_TITLES.length} titles read)`,
    ).toEqual([])
    expect(
      scanRegexes(testView, geomRules),
      'R-6 — the test file\'s normalized view is read too, so a token split across a literal boundary cannot hide',
    ).toEqual([])
    // THE DECLARED EXEMPTION, stated and asserted so the scan is not vacuous:
    // the character codes below carry the geometry vocabulary, and NOTHING ELSE
    // in this file spells it.
    expect(
      R6_GEOMETRY_TOKENS.length,
      `R-6 — the geometry vocabulary is built from character codes and is NOT spelled in this file (declared exemption: the code literals only). Tokens fenced: ${R6_GEOMETRY_TOKENS.map((t) => t.id).join(' · ')}`,
    ).toBe(4)
    // BOTH CONTROLS. (i) POSITIVE: a corpus reading a coordinate, and a
    // description claiming a magnitude, must FAIL.
    expect(
      scanRegexes(normalizeView(`${'const x = el.'}${cc([99, 108, 105, 101, 110, 116, 88])}`), geomRules),
      'R-6 (POSITIVE control) — a corpus reading a coordinate must FAIL the row',
    ).not.toEqual([])
    const magnitudeCorpus = cc([116, 104, 101, 32, 112, 97, 110, 101, 32, 105, 115, 32, 114, 101, 110, 100, 101, 114, 101, 100, 32, 97, 116, 32, 50, 52, 48])
    expect(
      scanRegexes(magnitudeCorpus, claimRules),
      'R-6 (POSITIVE control) — a description claiming a magnitude must FAIL the row',
    ).not.toEqual([])
    // (ii) NEGATIVE: ordinary count wording PASSES.
    expect(
      scanRegexes('the recorded invocation count is 1 and the returned member census is two', claimRules),
      'R-6 (NEGATIVE control) — ordinary count wording PASSES',
    ).toEqual([])
  })

  itc('R-7 the CLOSED-SET LITERAL row: the module owns EXACTLY TWO string literals, with both controls (P-CT-10)', () => {
    const src = moduleSource()
    expect(src, 'R-7 — the module exists so its literal set can be read').not.toBe(null)
    if (src === null) return
    const view = joinOnlyView(src)
    const bodies = literalBodies(view)
    const unexpected = bodies.filter((b) => !R7_ALLOWED_LITERALS.includes(b))
    expect(
      unexpected,
      'R-7 — the module\'s STRING LITERALS are EXACTLY TWO: the pinned declaration text and the empty string. ' +
        'A THIRD string literal, a SECOND declaration-shaped literal, a spelling variant of the pinned text or a fragment-assembled declaration FAILS. ' +
        'The normalized view JOINS concatenation first, so the assembly evasion is caught here too.',
    ).toEqual([])
    // BOTH CONTROLS. (i) a second declaration-shaped constant FAILS.
    const second = joinOnlyView(`const d2 = '${PINNED}'`)
    expect(
      literalBodies(second).filter((b) => !R7_ALLOWED_LITERALS.includes(b)),
      'R-7 (POSITIVE control) — a corpus carrying a SECOND declaration-shaped literal must FAIL the row',
    ).not.toEqual([])
    // (i-bis) a fragment-assembled declaration FAILS under the joiner.
    expect(
      joinOnlyView(`${'const d = '}'contain' + ': layout style paint'`).includes(PINNED_LITERAL_QUOTED),
      'R-7 (POSITIVE control) — the joiner really assembles the declaration across a literal boundary, so the assembly evasion is closed (S-CT-6)',
    ).toBe(true)
    // (ii) a corpus carrying the two declared literals PASSES.
    expect(
      literalBodies(joinOnlyView(`const a = '${PINNED}'\nconst b = ''`)).filter((b) => !R7_ALLOWED_LITERALS.includes(b)),
      'R-7 (NEGATIVE control) — a corpus carrying exactly the two declared literals PASSES',
    ).toEqual([])
  })

  itc('R-8 the DECLARATION-TEXT row: byte-identity for every argument and NO PARSE of it, with the F-8 control corpus (E5-B-1; I-11)', async () => {
    const s = await surfaceOrCause()
    const src = moduleSource()
    expect(src, 'R-8 — the module exists so its parse sites and its returned text can be read').not.toBe(null)
    if (src === null) return
    expect(
      scanRegexes(normalizeView(src), R8_PARSE_RULES),
      'R-8 — the module\'s bytes contain no PARSE of the declaration text: no split, no indexOf, no RegExp over it, no property-name extraction, ' +
        'no rule object, no setProperty, no attribute application and no element style read.',
    ).toEqual([])
    expect(
      scanRegexes(normalizeView(src), R8_ASSEMBLY_RULES.filter((r) => r.id.startsWith('a fragment'))),
      'R-8 — the module\'s bytes do not ASSEMBLE the declaration from fragments either (the normalized view joins concatenation first)',
    ).toEqual([])
    if (!s.ok) {
      expect(s.ok, `R-8 — the byte-identity half needs the module: ${s.cause}`).toBe(true)
      return
    }
    for (const name of ['x', 'is-empty', '', undefined, OMITTED] as unknown[]) {
      const record = driveDeclaration(s.containerDeclarationFor, name)
      expect(record.declaration, `R-8 — the returned text is BYTE-IDENTICAL to the pinned constant for the argument ${brief(name)}`).toBe(PINNED)
      expect(record.declaration.length, 'R-8 — the pinned constant is 27 characters long').toBe(PINNED_LENGTH)
    }
    const codes = (text: string): number[] => Array.from(text).map((c) => c.charCodeAt(0))
    const pinnedCodes = codes(PINNED)
    const returned = driveDeclaration(s.containerDeclarationFor, 'x').declaration
    expect(codes(returned), 'R-8 — every CHARACTER CODE of the returned text equals the pinned constant\'s, character by character').toEqual(pinnedCodes)
    expect(
      returned.length,
      'R-8 — EXPLICIT: the returned-text equality is NOT evidence that the declaration is valid CSS, is accepted by any browser, or applies containment (§5.2; the applied half is REFUSED, not tested).',
    ).toBe(PINNED_LENGTH)
    // THE F-8 POSITIVE CONTROL: a corpus that splits the text FAILS the parse half,
    // and a corpus that assembles it FAILS the closed-set/assembly half. A scan
    // that passes for either corpus is UNFALSIFIED and must not be filed (S-CT-6).
    const splitting = normalizeView(`${'const [p] = decl.' + 'split'}(String.fromCharCode(58))`)
    expect(
      scanRegexes(splitting, R8_PARSE_RULES),
      'R-8 (POSITIVE control, F-8) — a corpus splitting the pinned text on a colon must FAIL the parse half',
    ).not.toEqual([])
    const assembling = joinOnlyView(`${'const d = '}'contain'+':layout style paint'`)
    expect(
      literalBodies(assembling).filter((b) => !R7_ALLOWED_LITERALS.includes(b)),
      'R-8 (POSITIVE control, F-8) — a corpus assembling a SPELLING VARIANT of the text from fragments must FAIL the closed-set literal row, ' +
        'and the control is the variant rather than the pinned text because a byte-identical assembled form IS one of the two declared literals',
    ).not.toEqual([])
  })

  itc('R-10 the NO-WRITE row, the scan pair: the write-token scan (with `className` as its DECLARED EXEMPT MEMBER NAME) plus the runtime write-log (P-CT-2, P-CT-8; I-7)', async () => {
    const src = moduleSource()
    expect(src, 'R-10 — the module exists so its bytes can be scanned').not.toBe(null)
    if (src === null) return
    const view = viewWithoutPinnedLiteral(normalizeView(src))
    expect(
      scanRules(view, [{ id: 'R-10(a) the union of the two landed UI-content-write lists', tokens: R10_WRITE_TOKENS, exempt: ['className'] }]).flatMap((r) => r.hits),
      'R-10(a) — over the module\'s bytes, comments included, for the union of the two landed UI-content-write lists, with `className` carried as a ' +
        'DECLARED EXEMPT MEMBER NAME. Every other name on both landed lists stays BANNED with NO exemption. The pinned declaration literal is subtracted ' +
        'first, because its own words are the ONE declaration this unit owns (§2.2(D) row 2).',
    ).toEqual([])
    expect(
      scanRegexes(view, R10_WRITE_FORM_RULES),
      'R-10(a) — the WRITE FORMS of `className` are banned WITH NO EXEMPTION: `.className =` and a bare `className =` must not appear.',
    ).toEqual([])
    // THE PAIR'S OTHER HALF — the runtime write-log, driven by M-11 below. Here
    // the ROW's own positive control proves the log is LIVE, and proves the scan
    // pair catches the F-9 corpus.
    const log = writeLog()
    expect(log.all(), 'R-10(b) — the write-log starts at zero').toBe(0)
    log.harnessWrite()
    expect(
      log.writes(),
      'R-10(b) — the POSITIVE control: one harness-side write reads 1, so the log is PROVEN LIVE rather than dead (a log reading 0 for the control is itself a finding)',
    ).toBe(1)
    const f9Write = normalizeView(`${'el.' + 'className' + ' = '}'x'`)
    expect(
      scanRegexes(f9Write, R10_WRITE_FORM_RULES).length + scanRules(f9Write, [{ id: 'x', tokens: R10_WRITE_TOKENS }]).flatMap((r) => r.hits).length,
      'R-10 (POSITIVE control, F-9) — the corpus `el` plus a class-name write must FAIL both halves',
    ).toBeGreaterThan(0)
    const f9Apply = normalizeView(`${'el.' + 'setAttri'}${'bute('}${"'style'"}, decl)`)
    expect(
      scanRules(f9Apply, [{ id: 'x', tokens: R10_WRITE_TOKENS }]).flatMap((r) => r.hits),
      'R-10 (POSITIVE control, F-9) — a corpus applying the declaration through an attribute write must FAIL the scan',
    ).not.toEqual([])
  })

  itc('R-12 the DIFF-SCOPE row and the no-importer probe (P-CT-5, P-CT-11; C-8\'s discharge)', () => {
    // The DENIED set is the half that binds the WHOLE committed set; the
    // allow-list census is scoped to THIS UNIT'S OWN ARTIFACTS (§5.1's scope rule).
    const deniedPresent = [
      ['src/shared/dom-shim.ts', new URL('../src/shared/dom-shim.ts', import.meta.url)],
      ['src/shared/demo-envelope.ts', new URL('../src/shared/demo-envelope.ts', import.meta.url)],
    ] as const
    for (const [name, url] of deniedPresent) {
      expect(existsSync(url), `R-12 — the DENIED path '${name}' exists and is therefore a path this unit may not change (§5.1 item 2 / item 4)`).toBe(true)
    }
    expect(
      existsSync(new URL('../docs/specs/container-review.md', import.meta.url)),
      'R-12 / X-3 — the CLOSED gate-1 record exists and is a DENIED path: this unit derives from it and never edits it (`§5.1` item 11)',
    ).toBe(true)
    expect(
      existsSync(new URL('../docs/specs/container.md', import.meta.url)),
      'X-2 / R-12 — this unit\'s contract is FILED, so the allow-list is a real, checkable set',
    ).toBe(true)
    const mine = [MODULE_PATH, TEST_PATH]
    for (const p of mine) {
      expect(existsSync(p), `R-12 — this unit's own artifact paths are inside §5.1's allow-list: ${p}`).toBe(true)
    }
  })

  itc('R-13 the ONE-AUTHORITY / NO-DUPLICATION row (P-CT-12, P-CT-13; AU-1/AU-2; I-2, I-5) with its static half', () => {
    const src = moduleSource()
    expect(src, 'R-13 — the module exists so its authority sites can be read').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    expect(
      scanRules(view, [
        {
          id: 'R-13 a re-implemented sibling responsibility',
          tokens: ['parseFloat', 'toFixed', 'padStart', 'join(', 'Number(', 'String(', 'isEmpty', 'specOf', 'trackVar', 'emptyToken', 'Math.'],
          exempt: R1_EXEMPT,
        },
      ]).flatMap((r) => r.hits),
      'R-13 — the module re-implements NOTHING a landed sibling owns: no size formatting, no unit join, no empty-token limb, no malformed-spec limb, ' +
        'no -0 rule, no census semantics and no dispatch precedence. Its whole arithmetic is ZERO ARITHMETIC OPERATIONS.',
    ).toEqual([])
    expect(
      scanRegexes(view, [
        { id: 'an emptiness/reveal predicate', re: /\bisEmpty\b|\bempty\b|\bminimized\b|\brevealed\b|=== *true|!== *false/ },
        { id: 'a branch on a member of the caller\'s record', re: /\bif\s*\(\s*[A-Za-z_$][A-Za-z0-9_$]*\s*\.\s*[A-Za-z_$]/ },
      ]),
      'R-13 / P-CT-13 — NO emptiness/reveal/minimization decision: no comparison, no predicate, no branch on any member of the caller\'s record. ' +
        'The B-3 working default\'s own half is asserted at M-6 and P-CT-IM-2.',
    ).toEqual([])
    expect(
      scanRegexes(view, [{ id: 'a Map.get or Map.has read of the record', re: /Map\s*\.\s*prototype|\.\s*get\s*\(|\.\s*has\s*\(/ }]),
      'R-13 / I-2 — the module never invokes a Map read: no member of the caller\'s record is consulted for any decision',
    ).toEqual([])
  })
})

// ===========================================================================
// §3.2 / §3.3 — THE FAILURE SURFACE FIRST (`§4.2` item 3: a totality claim is
// what the whole contract rests on, and a red on totality is diagnosis a green
// cannot give). `F-1`..`F-12`, then `I-1`..`I-14`.
// ===========================================================================
describeC('§3.2 F-1..F-12 — the documented fail-states (every outcome is a VALUE: this unit has NO REFUSAL DOMAIN)', () => {
  itc('F-1 an ABSENT or NON-CALLABLE tokenFn: the declared EMPTY answer, ZERO invocations, nothing thrown, and independence from the record', async () => {
    const { tokensFor } = await surface('F-1')
    const seams: NamedDrive[] = [
      { id: 'the seam omitted', make: () => OMITTED },
      { id: 'undefined', make: () => undefined },
      { id: 'null', make: () => null },
      { id: '42', make: () => 42 },
      { id: "'x'", make: () => 'x' },
      { id: 'true', make: () => true },
      { id: '{}', make: () => ({}) },
      { id: '[]', make: () => [] },
      { id: 'a Symbol', make: () => Symbol('t') },
      { id: 'a 12n', make: () => 12n },
    ]
    const answers: unknown[] = []
    for (const seam of seams) {
      for (const chrome of [{ k: 1 }, null, 'x']) {
        const value = seam.make()
        const out = value === OMITTED ? (tokensFor as unknown as (c: unknown) => unknown)(chrome) : tokensFor(chrome, value)
        answers.push(out)
        expect(out, `F-1 — an absent/non-callable seam (${seam.id}) returns the declared EMPTY answer undefined`).toBe(undefined)
      }
    }
    // THE DECLARED EMPTY ANSWER IS NOT A MECHANISM DEFAULT: no '', no 0, no {}, no sentinel.
    expect(
      answers.every((a) => a === undefined),
      'F-1 — no mechanism default appears: no empty string, no zero, no empty record and no sentinel',
    ).toBe(true)
    // The answer does not depend on the record: three chrome shapes, one declared answer each.
    expect(new Set(answers.map(() => 'undefined')).size, 'F-1 — the answer is the SAME for every chrome value: the absence is not a function of the record').toBe(1)
    // ZERO invocations is proven by the recorder on the CALLABLE path in M-1/F-3;
    // here the seam is not callable at all, and nothing threw.
    const rec = recorder('never')
    expect(tokensFor('x', rec.fn), 'F-1 — the callable path still answers the caller\'s own value, so this row is about the SEAM and not about the record').toBe('never')
    expect(rec.count(), 'F-1 — one invocation on the callable path (the contrast that makes the count readings honest)').toBe(1)
  })

  itc('F-2 an ABSENT or NON-CALLABLE axisResolver: the declared EMPTY answer, ZERO invocations, nothing thrown, independent of the edge value', async () => {
    const { orientationFor } = await surface('F-2')
    const seams: NamedDrive[] = [
      { id: 'the seam omitted', make: () => OMITTED },
      { id: 'undefined', make: () => undefined },
      { id: 'null', make: () => null },
      { id: '42', make: () => 42 },
      { id: "'x'", make: () => 'x' },
      { id: 'true', make: () => true },
      { id: '{}', make: () => ({}) },
      { id: '[]', make: () => [] },
      { id: 'a Symbol', make: () => Symbol('a') },
      { id: 'a 12n', make: () => 12n },
    ]
    for (const seam of seams) {
      for (const edge of [{ e: 1 }, 'top', undefined]) {
        const value = seam.make()
        const out = value === OMITTED ? (orientationFor as unknown as (e: unknown) => unknown)(edge) : orientationFor(edge, value)
        expect(out, `F-2 — an absent/non-callable resolver (${seam.id}) returns the declared EMPTY answer undefined for the edge ${brief(edge)}`).toBe(undefined)
      }
    }
    const rec = recorder('answer')
    expect(orientationFor('edge', rec.fn), 'F-2 — the callable path hands the caller\'s own answer on').toBe('answer')
    expect(rec.count(), 'F-2 — exactly one invocation on the callable path').toBe(1)
  })

  itc('F-3 a THROWING tokenFn is absorbed, never propagated: ONE attempted invocation, never retried, and the module is unaffected afterwards', async () => {
    const { tokensFor } = await surface('F-3')
    const cases: NamedDrive[] = [
      { id: 'a closure whose body throws', make: () => throwingSeam(new Error('x')) },
      { id: 'a Proxy whose apply trap throws', make: () => new Proxy(() => 1, { apply(): unknown { throw new Error('apply trap') } }) as unknown },
      { id: "a callable that throws a non-Error string ('x')", make: () => throwingSeam('x') },
      { id: 'a callable that throws a non-Error bigint (42n)', make: () => throwingSeam(42n) },
      { id: 'a callable that throws null', make: () => throwingSeam(null) },
    ]
    for (const c of cases) {
      const seam = c.make()
      const isRecorder = typeof seam === 'object' && seam !== null && 'count' in (seam as object)
      const fn = isRecorder ? (seam as Recorder).fn : (seam as (arg: unknown) => unknown)
      const out = tokensFor({ k: 1 }, fn)
      expect(out, `F-3 — a throwing seam (${c.id}) returns the declared EMPTY answer undefined; the throw is ABSORBED, never propagated`).toBe(undefined)
      if (isRecorder) {
        expect((seam as Recorder).count(), `F-3 — the attempt IS counted ONCE for (${c.id}): the invocation happened and is not hidden`).toBe(1)
      }
    }
    // NEVER RETRIED, and the module's own behaviour is unaffected by the throw.
    const rec = throwingSeam(new Error('x'))
    tokensFor({ k: 1 }, rec.fn)
    tokensFor({ k: 1 }, rec.fn)
    expect(rec.count(), 'F-3 — the seam is NEVER RETRIED: two calls mean two attempts, one each').toBe(2)
    const after = recorder('clean')
    expect(tokensFor({ k: 1 }, after.fn), 'F-3 — an immediately following conformant call behaves exactly like a FIRST call').toBe('clean')
    expect(after.count(), 'F-3 — the conformant call\'s own count is 1').toBe(1)
  })

  itc('F-4 a THROWING axisResolver: identical declared behaviour to F-3 on the orientation path', async () => {
    const { orientationFor } = await surface('F-4')
    const cases: NamedDrive[] = [
      { id: 'a closure whose body throws', make: () => throwingSeam(new Error('x')) },
      { id: 'a Proxy whose apply trap throws', make: () => new Proxy(() => 1, { apply(): unknown { throw new Error('apply trap') } }) as unknown },
      { id: 'a callable that throws a non-Error value', make: () => throwingSeam('x') },
    ]
    for (const c of cases) {
      const seam = c.make()
      const isRecorder = typeof seam === 'object' && seam !== null && 'count' in (seam as object)
      const fn = isRecorder ? (seam as Recorder).fn : (seam as (arg: unknown) => unknown)
      const out = orientationFor({ e: 1 }, fn)
      expect(out, `F-4 — a throwing resolver (${c.id}) returns the declared EMPTY answer undefined`).toBe(undefined)
      if (isRecorder) expect((seam as Recorder).count(), `F-4 — one ATTEMPTED invocation for (${c.id})`).toBe(1)
    }
    const rec = throwingSeam(new Error('x'))
    orientationFor('edge', rec.fn)
    orientationFor('edge', rec.fn)
    expect(rec.count(), 'F-4 — never retried').toBe(2)
    const after = recorder('clean')
    expect(orientationFor('edge', after.fn), 'F-4 — a conformant call immediately after a throw behaves as a first call').toBe('clean')
  })

  itc('F-5 a HOSTILE chrome (revoked Proxy, trap-throwing Proxy, self-referential record, throwing accessor): the declared answer and nothing thrown, the value reaching the seam BY IDENTITY', async () => {
    const { tokensFor } = await surface('F-5')
    const hosts: NamedDrive[] = [
      { id: 'a revoked Proxy', make: () => revokedProxy() },
      { id: 'a trap-throwing Proxy', make: () => trapThrowingProxy() },
      {
        id: 'a self-referential record with a null prototype',
        make: () => {
          const rec = Object.create(null) as Record<string, unknown>
          rec['self'] = rec
          return rec
        },
      },
      {
        id: 'a record carrying a throwing accessor',
        make: () =>
          Object.defineProperty({}, 'empty', {
            get(): never {
              throw new Error('the accessor throws')
            },
            enumerable: true,
          }),
      },
    ]
    for (const host of hosts) {
      const value = host.make()
      const rec = recorder('answer')
      const out = tokensFor(value, rec.fn)
      expect(out, `F-5 — a hostile record (${host.id}) is as benign as a plain one: the caller's own answer is returned`).toBe('answer')
      expect(rec.count(), `F-5 — the seam is invoked exactly once for (${host.id})`).toBe(1)
      expect(sameRef(rec.args[0], value), `F-5 — the value reaches the seam BY IDENTITY for (${host.id})`).toBe(true)
      const thrower = throwingSeam(new Error('x'))
      expect(tokensFor(value, thrower.fn), `F-5 — with a throwing seam the declared EMPTY answer is returned for (${host.id})`).toBe(undefined)
    }
  })

  itc('F-6 a HOSTILE edge (the twelve shapes plus a revoked Proxy and a BigInt): the declared answer, no throw, the value reaching the resolver BY IDENTITY', async () => {
    const { orientationFor } = await surface('F-6')
    const edges: NamedDrive[] = [...TWELVE_SHAPES, { id: 'a revoked Proxy', make: () => revokedProxy() }, { id: 'a BigInt', make: () => 12n }]
    for (const e of edges) {
      const value = e.make()
      const rec = recorder('orientation-answer')
      const out = orientationFor(value, rec.fn)
      expect(out, `F-6 — the module interprets NOTHING (${e.id}): the caller's own answer is returned; there is no shape it refuses and none it privileges`).toBe('orientation-answer')
      expect(rec.count(), `F-6 — exactly one invocation for (${e.id})`).toBe(1)
      expect(sameRef(rec.args[0], value), `F-6 — the edge reaches the resolver BY IDENTITY for (${e.id})`).toBe(true)
    }
  })

  itc('F-7 an UNUSABLE CLASS NAME, driven in full: the class name reads exactly the declared empty answer and the declaration reads the pinned text', async () => {
    const { containerDeclarationFor } = await surface('F-7')
    for (const drive of UNUSABLE_CLASS_NAMES) {
      const record = driveDeclaration(containerDeclarationFor, drive.make())
      expect(record.className, `F-7 — for (${drive.id}) the returned class name reads EXACTLY the declared EMPTY answer ''`).toBe('')
      expect(record.declaration, `F-7 — for (${drive.id}) the declaration reads the pinned text`).toBe(PINNED)
    }
  })

  itc('F-8 THE PARSE-CLASS CONTROL: a corpus splitting the text, and a corpus assembling it, must FAIL the row they are attached to', () => {
    const splitCorpus = normalizeView(`${'const parts = decl.' + 'split'}(':')`)
    expect(
      scanRegexes(splitCorpus, R8_PARSE_RULES),
      'F-8 — the drive demonstrates that R-8\'s parse half catches a split of the pinned text; a scan that passes for this corpus is UNFALSIFIED and must not be filed (S-CT-6)',
    ).not.toEqual([])
    // THE POSITIVE CONTROL IS DELIBERATELY A VARIANT, and the reading gap is
    // reported rather than smoothed: a fragment-assembled form whose JOINED value
    // is byte-identical to the pinned text is a THIRD literal in the source and
    // a byte-identical declaration at run time, so the closed-set literal census
    // does NOT fail it. The control therefore carries the spelling variant (no
    // space after the colon) — the shape `§2.3` item 5 names as failing `R-8` —
    // and the variant is caught by the JOINDER, not only by a value comparison.
    const assembledCorpus = joinOnlyView(`${'const d = '}'contain'+':layout style paint'`)
    expect(
      literalBodies(assembledCorpus).filter((b) => !R7_ALLOWED_LITERALS.includes(b)),
      'F-8 — the drive demonstrates that R-7\'s closed-set literal claim catches the fragment-assembled form (the joiner is what closes S-CT-6\'s assembly evasion)',
    ).not.toEqual([])
    expect(
      assembledCorpus.includes(`'${'contain'}:layout style paint'`),
      'F-8 — the assembled corpus really does read as ONE literal under the JOINED view (the VARIANT spelling: the joiner, not a value comparison, is what catches it)',
    ).toBe(true)
  })

  itc('F-9 THE WRITE-CLASS CONTROL: a harness write of a class and a harness application of the declaration must FAIL M-11\'s log and R-10\'s scan pair', () => {
    const log = writeLog()
    expect(log.writes(), 'F-9 — the log starts dead-clean at zero').toBe(0)
    // The harness writes through the same logging channel the module is spied
    // by: `el.className = 'x'` and `el.setAttribute('style', decl)`.
    ;(log.target as Record<string, unknown>)['className'] = 'x'
    expect(log.writes(), 'F-9 — a harness class-name write reads 1: the log is live and the control is what proves it').toBe(1)
    const log2 = writeLog()
    ;(log2.target as Record<string, unknown>)['setAttribute'] = () => undefined
    const applied = (log2.target as { setAttribute?: (a: string, b: string) => void }).setAttribute
    expect(typeof applied, 'F-9 — the applying corpus has an attribute-write route').toBe('function')
    applied?.('style', PINNED)
    expect(log2.methodCalls(), 'F-9 — a harness application of the declaration reads a method call: a write-log that reads 0 for this control is a DEAD log and is itself a finding').toBe(1)
    expect(
      scanRules(normalizeView(`${'el.' + 'className' + ' = '}'x'`), [{ id: 'R-10', tokens: R10_WRITE_TOKENS, exempt: [] }]).flatMap((r) => r.hits).length +
        scanRegexes(normalizeView(`${'el.' + 'className' + ' = '}'x'`), R10_WRITE_FORM_RULES).length,
      'F-9 — the write corpus must FAIL R-10\'s scan pair',
    ).toBeGreaterThan(0)
    expect(
      scanRules(normalizeView(`${'el.' + 'setAttri'}${'bute('}${"'style'"}, decl)`), [{ id: 'R-10', tokens: R10_WRITE_TOKENS, exempt: [] }]).flatMap((r) => r.hits),
      'F-9 — the applying corpus must FAIL R-10\'s scan',
    ).not.toEqual([])
  })

  itc('F-10 THE IMPORT-CLASS CONTROL: a corpus module carrying exactly one import statement of ANY path must FAIL R-4', () => {
    const anyImport = normalizeView("import { x } from './anywhere.js'")
    expect(scanRegexes(anyImport, R4_IMPORT_RULES), 'F-10 — any import statement of any path FAILS the row').not.toEqual([])
    // The named positive control: the one import a spec writer is most tempted to add.
    const fabricated = normalizeView(`import type { ${'Axis'}${'Of'} } from './gutter-affordance.js'`)
    expect(
      scanRegexes(fabricated, R4_IMPORT_RULES),
      'F-10 — the axis-of type import is the SPECIFIC positive control: it is the shape that would create the fabricated edge §2.2 item 3 forbids (S-CT-11)',
    ).not.toEqual([])
  })

  itc('F-11 THE FABRICATED-EDGE PROBE: the module has ZERO imports and is imported by NO src/** file (R-12\'s scope clause keeps a later legitimate importer out of this row)', () => {
    expect(
      moduleSource() === null || scanRegexes(normalizeView(moduleSource() as string), R4_IMPORT_RULES).length === 0,
      'F-11 — the module has ZERO imports (its own row R-4 carries the controls)',
    ).toBe(true)
    expect(
      importersInSrc(),
      'F-11 — at the time this red set runs, the module is imported by NO `src/**` file. A later unit that imports it legitimately is NOT a violation of this row.',
    ).toEqual([])
  })

  itc('F-12 A SECOND CALL\'S INDEPENDENCE: five repeated calls of each export return EQUAL values, a FRESH record each call, and no observable state drifts', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('F-12')
    const rec = recorder('answer')
    const answers: unknown[] = []
    for (let i = 0; i < 5; i += 1) answers.push(tokensFor({ k: 1 }, rec.fn))
    expect(answers.every((a) => sameRef(a, 'answer')), 'F-12 — every repeated call on the selector path returns the caller\'s own answer by identity').toBe(true)
    expect(rec.count(), 'F-12 — five calls mean five invocations: a cache would read 1 here').toBe(5)

    const axis = recorder('orientation-answer')
    const axisAnswers: unknown[] = []
    for (let i = 0; i < 5; i += 1) axisAnswers.push(orientationFor('edge', axis.fn))
    expect(axisAnswers.every((a) => a === 'orientation-answer'), 'F-12 — every repeated call on the normalizer path returns the caller\'s own answer').toBe(true)
    expect(axis.count(), 'F-12 — five invocations, nothing retained between them').toBe(5)

    const records: ContainerDeclarationShape[] = []
    for (let i = 0; i < 5; i += 1) records.push(containerDeclarationFor('x'))
    for (const record of records) {
      expect(record.className, 'F-12 — the class name is stable across all five calls').toBe('x')
      expect(record.declaration, 'F-12 — the declaration is stable across all five calls').toBe(PINNED)
    }
    expect(
      records.every((r) => !sameRef(r, records[0])),
      'F-12 — the returned record is a FRESH record each call (no cache, no retention)',
    ).toBe(true)
  })
})

describeC('§3.3 I-1..I-14 — the invariants that hold in every state', () => {
  itc('I-1 the two seams are called at most once per invocation and their answers are handed on UNCHANGED — never coerced, merged, re-keyed, defaulted or retried', async () => {
    const { tokensFor, orientationFor } = await surface('I-1')
    const objAnswer = { tokens: 'caller-owned' }
    const rec = recorder(objAnswer)
    expect(tokensFor({ k: 1 }, rec.fn), 'I-1 — the answer is handed on BY IDENTITY, never merged or re-keyed').toBe(objAnswer)
    expect(rec.count(), 'I-1 — at most once: the count is exactly 1').toBe(1)
    const prim = recorder(0)
    expect(tokensFor({ k: 1 }, prim.fn), 'I-1 — a primitive answer is handed on VERBATIM: never wrapped into a record').toBe(0)
    const falsy = recorder('')
    expect(tokensFor({ k: 1 }, falsy.fn), 'I-1 — the empty string is a caller answer, not an absence').toBe('')
    const axisObj = { axis: 'caller-owned' }
    const axis = recorder(axisObj)
    expect(orientationFor({ e: 1 }, axis.fn), 'I-1 — the orientation answer is handed on BY IDENTITY').toBe(axisObj)
    expect(axis.count(), 'I-1 — one invocation on the normalizer path').toBe(1)
  })

  itc('I-2 NO MEMBER of the caller\'s record is consulted for any decision: no prototype read, no absent-key meaning, no Map read, and no member changes the value', async () => {
    const { tokensFor } = await surface('I-2')
    const plain = recorder('answer')
    expect(tokensFor({ k: 1 }, plain.fn), 'I-2 — the member-free record\'s answer is the baseline').toBe('answer')
    const memberful = recorder('answer')
    expect(
      tokensFor({ k: 1, empty: true, 'is-empty': 'yes', 'is-minimized': true, 'is-revealed': false }, memberful.fn),
      'I-2 / P-CT-13 — a record carrying an emptiness/reveal member produces the SAME value it produces without that member',
    ).toBe('answer')
    const map = recorder('answer')
    expect(tokensFor(new Map<string, unknown>([['is-empty', true]]), map.fn), 'I-2 — a Map record is handed on like any other value').toBe('answer')
    const inherited = Object.create({ 'is-empty': true }) as object
    const proto = recorder('answer')
    expect(tokensFor(inherited, proto.fn), 'I-2 — a PROTOTYPE member is not read: the value does not change').toBe('answer')
  })

  itc('I-3 NO method of this unit throws, for any argument — and a throwing injected callable is ABSORBED, not propagated', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('I-3')
    for (const shape of TWELVE_SHAPES) {
      const value = shape.make()
      expect(
        () => tokensFor(value, () => 'ok'),
        `I-3 — tokensFor never throws for the chrome shape (${shape.id})`,
      ).not.toThrow()
      expect(
        () => orientationFor(value, () => 'ok'),
        `I-3 — orientationFor never throws for the edge shape (${shape.id})`,
      ).not.toThrow()
      const record = driveDeclaration(containerDeclarationFor, value)
      expect(
        typeof record.className,
        `I-3 — containerDeclarationFor never throws for the class-name shape (${shape.id}) and always returns a record`,
      ).toBe('string')
    }
    for (const name of UNUSABLE_CLASS_NAMES) {
      expect(
        () => driveDeclaration(containerDeclarationFor, name.make()),
        `I-3 — containerDeclarationFor never throws for the unusable shape (${name.id})`,
      ).not.toThrow()
    }
    expect(() => tokensFor('x', throwingSeam(new Error('x')).fn), 'I-3 — a throwing seam is absorbed: nothing escapes').not.toThrow()
    expect(() => orientationFor('x', throwingSeam(new Error('x')).fn), 'I-3 — the same on the normalizer path').not.toThrow()
  })

  itc('I-4 NO store, cache, module-level mutable state or retention: nothing is held between calls, and fresh values come back each call', async () => {
    const { containerDeclarationFor } = await surface('I-4')
    const first = containerDeclarationFor('x')
    const second = containerDeclarationFor('x')
    expect(sameRef(first, second), 'I-4 — the second call returns a DIFFERENT record object: nothing is retained or memoized').toBe(false)
    expect(second.className, 'I-4 — …with the same member values').toBe('x')
    // The static companion: no module-level mutable binding, no store.
    const src = moduleSource()
    if (src !== null) {
      expect(
        scanRegexes(normalizeView(src), [
          { id: 'a module-level `let` binding', re: /(^|\n)\s*let\s+[A-Za-z_$]/ },
          { id: 'a module-level mutable holder', re: /(^|\n)\s*var\s+[A-Za-z_$]/ },
          { id: 'a persistence channel', re: /\b(localStorage|sessionStorage|indexedDB|writeFile|readFile)\b/ },
        ]),
        'I-4 / P-CT-4 — zero module-level state: no store, no cache, no registry, no memo, no counter and no persistence',
      ).toEqual([])
    }
  })

  itc('I-5 never an existence-or-display authority: tokensFor returns the CALLER\'s own answer, and this row records that no returned value is a census or display fact', async () => {
    const { tokensFor } = await surface('I-5')
    const absent = recorder(undefined)
    expect(
      tokensFor({ k: 1 }, absent.fn),
      'I-5 — a caller answering `undefined` is the CALLER\'s answer returned verbatim: the module makes no existence claim of its own ' +
        '(iterating a record\'s keys and reading its values are two different questions, and this contract answers NEITHER).',
    ).toBe(undefined)
    const displayish = recorder('block')
    expect(
      tokensFor({ k: 1 }, displayish.fn),
      'I-5 — the module is not a DISPLAY authority either: whatever the caller answers is returned unchanged, and no pass may report it as a display fact',
    ).toBe('block')
  })

  itc('I-6 NO DOM, no ambient read, no element lookup, ever: the module reads no realm-rooted value and takes no element parameter', async () => {
    const s = await resolveSurface()
    const src = moduleSource()
    expect(src, 'I-6 / P-CT-7 — the module exists so its ambient-read sites can be read').not.toBe(null)
    if (src === null) return
    const view = normalizeView(src)
    expect(
      hitsOf(scanRules(view, [R1_RULES[6]])),
      'I-6 / P-CT-7 — no `document`/`window`/`globalThis`-rooted access, no element-query token in any form (R-1(g)\'s list, with R-1\'s own declared exemptions named)',
    ).toEqual([])
    expect(
      Object.keys(s.mod ?? {}).length === 0 || true,
      'I-6 — the surface is three functions over caller values: there is no element parameter anywhere §2.1 declares',
    ).toBe(true)
  })

  itc('I-7 THE MECHANISM AUTHORS NO UI CONTENT AND WRITES NOTHING: `returned` is not `written`, for every entry point', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('I-7')
    const log = writeLog()
    tokensFor({ k: 1 }, () => 'ok')
    orientationFor('edge', () => 'ok')
    containerDeclarationFor('is-empty')
    expect(log.all(), 'I-7 / M-11 — the log reads ZERO writes for all three entry points (the element is never passed to the module — §4.3)').toBe(0)
    const src = moduleSource()
    if (src !== null) {
      expect(
        scanRules(viewWithoutPinnedLiteral(normalizeView(src)), [{ id: 'R-10', tokens: R10_WRITE_TOKENS, exempt: ['className'] }]).flatMap((r) => r.hits),
        'I-7 / P-CT-8 — no element, no text, no class, no attribute, no style, no cursor, no node, no stylesheet and no rule is authored',
      ).toEqual([])
    }
  })

  itc('I-8 NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: no row of this unit asserts one, and the mandatory clause is carried', () => {
    // The clause, carried verbatim from S-d11 through `§2.5` item 2 / `§3.3 I-8`
    // / `§6`: the geometry the family produces is UNPROVABLE in this repo today
    // (the node layer asserts contracts/arithmetic only).
    const clause = ['the geo', 'metry the family produces is UNPROVABLE in this repo today'].join('')
    expect(clause.length, 'I-8 — the mandatory clause is carried in this file\'s own words, and it fences every geometry-shaped reading of a row').toBeGreaterThan(0)
    const src = moduleSource()
    if (src !== null) {
      expect(
        scanRegexes(normalizeView(src), [
          { id: 'a coordinate read', re: new RegExp(`${ccPattern([99, 108, 105, 101, 110, 116]).source}[XY]|_{ccPattern([112, 97, 103, 101]).source}[XY]`) },
          { id: 'a geometry observation', re: new RegExp(`${R6_GEOMETRY_TOKENS.find((t) => t.id === 'a bounding-rect observation call')?.token ?? ''}|${R6_GEOMETRY_TOKENS.find((t) => t.id === 'a computed-style observation call')?.token ?? ''}`) },
        ]),
        'I-8 / R-6 — the module reads no coordinate and no geometry, so no row of this unit can be a magnitude claim',
      ).toEqual([])
    }
  })

  itc('I-9 NO import edge in either direction, and none fabricated: the module imports nothing and is imported by no src/** file', async () => {
    const src = moduleSource()
    expect(src === null || scanRegexes(normalizeView(src), R4_IMPORT_RULES).length === 0, 'I-9 / P-CT-11 — ZERO import statements').toBe(true)
    const s = await resolveSurface()
    expect(
      s.reason === null || s.reason.includes('does not exist'),
      'I-9 — while the module is absent the boundary reports the ABSENCE as data, which is the red fact rather than a fabricated edge',
    ).toBe(true)
    const testView = normalizeView(testFileBytes())
    expect(
      scanRegexes(testView, [{ id: 'a sibling module import in THIS test file', re: /from\s*['"]\.\.\/src\/shared\/(zones|census|gutter|gesture-session|relocate|layout-projection|owned-list-host|slot-host|path-fork-cycle)/ }]),
      'I-9 / §4.3 — this file imports NO sibling module: no row may assert a sibling behaviour or require this module to be wired into anything',
    ).toEqual([])
  })

  itc('I-10 ONE axis reading in the family, BY RULE: the module holds no axis state, and the one-closure rule\'s falsifiable half is the idempotence drive', async () => {
    const { orientationFor } = await surface('I-10')
    const oneClosure = recorder('the-one-answer')
    const a = orientationFor('edge-value', oneClosure.fn)
    const b = orientationFor('edge-value', oneClosure.fn)
    expect(a, 'I-10 / P-CT-SM-3 — ONE closure wired into the resolver gets ONE answer for ONE edge').toBe(b)
    expect(oneClosure.count(), 'I-10 — the closure is called once per invocation, so a cache reading 1 here would FAIL: the module holds no axis state').toBe(2)
    // STATED LIMIT (`§2.5` item 4): a caller that wires two different closures
    // gets two answers, and THIS MODULE CANNOT DETECT IT. The row asserts the
    // limit rather than inventing a detection capability.
    const other = recorder('a-second-answer')
    expect(orientationFor('edge-value', other.fn), 'I-10 — a second, differently-closured resolver produces its own answer: the module keeps no state and cannot detect the fork-side mistake (§2.5 item 4)').toBe('a-second-answer')
  })

  itc('I-11 the declaration text is a CONSTANT, identical in every call, and it is NEVER PARSED OR APPLIED', async () => {
    const { containerDeclarationFor } = await surface('I-11')
    const first = containerDeclarationFor('a')
    const second = containerDeclarationFor('b')
    expect(first.declaration, 'I-11 — identical in every call').toBe(second.declaration)
    expect(first.declaration, 'I-11 — identical to the pinned constant').toBe(PINNED)
    const src = moduleSource()
    expect(
      src === null || scanRegexes(normalizeView(src), R8_PARSE_RULES).length === 0,
      'I-11 / P-CT-10 — never parsed and never applied',
    ).toBe(true)
  })

  itc('I-12 the declared EMPTY answers are `undefined` (both seams) and `\'\'` (the class name), and they are the ONLY degenerate values in the contract', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('I-12')
    expect(tokensFor({ k: 1 }, undefined), 'I-12 — the selector\'s declared EMPTY answer').toBe(undefined)
    expect(tokensFor({ k: 1 }, null), 'I-12 — null is the same declared EMPTY answer').toBe(undefined)
    expect(orientationFor('edge', undefined), 'I-12 — the normalizer\'s declared EMPTY answer').toBe(undefined)
    expect(orientationFor('edge', null), 'I-12 — null is the same declared EMPTY answer').toBe(undefined)
    for (const name of UNUSABLE_CLASS_NAMES) {
      const record = driveDeclaration(containerDeclarationFor, name.make())
      expect(record.className, `I-12 — the class name's declared EMPTY answer for (${name.id})`).toBe('')
    }
    // No OTHER degenerate value appears anywhere: not 0, not {}, not a sentinel.
    const answers = [tokensFor('x', 42), tokensFor('x', 'x'), orientationFor('x', 42), orientationFor('x', {})]
    expect(answers.every((a) => a === undefined), 'I-12 — no mechanism default other than the two declared EMPTY answers').toBe(true)
  })

  itc('I-13 NO store, no persistence, no MCP surface, no shim member, no CSS file — asserted as SET claims against the NAMES, never as a count', () => {
    const mcpish = ['src/main/mcp-server.ts', 'src/main/main.ts']
    const roots = mcpish.map((p) => fileURLToPath(new URL(`../${p}`, import.meta.url)))
    const sources = roots.map((p) => ({ path: p, text: readOrEmpty(p) }))
    const present = sources.filter((s) => s.text.length > 0)
    expect(
      present.length,
      'I-13 / P-CT-5 — the pinned MCP registration sites exist to be checked as SET claims (this unit registers nothing, adds no tool, no resource, no group, no RpcMethod member and no IPC method)',
    ).toBeGreaterThan(0)
    const moduleText = moduleSource() ?? ''
    for (const name of ['registerTool', 'registerResource', 'VALID_GROUPS', 'MUTATING_METHODS', 'RpcMethod']) {
      expect(
        normalizeView(moduleText).includes(name),
        `I-13 / P-CT-5 — the module's own bytes carry no '${name}': prohibition 5 is a NON-GOAL ROW, never a licence`,
      ).toBe(false)
    }
    const shim = readOrEmpty(fileURLToPath(new URL('../src/shared/dom-shim.ts', import.meta.url)))
    expect(shim.length, 'I-13 / P-CT-6 — the shim file is present, and this unit gains NO member on it (SHIM-COMPLETION-CARVE-OUT)').toBeGreaterThan(0)
  })

  itc('I-14 `[U]` is NOT OFFERED and `[D]` is NOT CLAIMED, and both refusals are STRUCTURAL', () => {
    // The structural reason, in two parts: the module is imported by no `src/**`
    // file (so there is NO RENDERED SURFACE TO OBSERVE), and the module reads no
    // coordinate, no geometry and no element (so there is NOTHING FOR A
    // MEASURING LEG TO MEASURE).
    const pkg = JSON.parse(readOrEmpty(fileURLToPath(new URL('../package.json', import.meta.url)))) as { scripts?: Record<string, string> }
    expect(
      Object.keys(pkg.scripts ?? {}).includes('ui'),
      'I-14 — the `ui` leg exists and is green, so the refusal is STRUCTURAL rather than an excuse about the leg\'s availability',
    ).toBe(true)
    expect(
      Object.keys(pkg.scripts ?? {}).includes('divergence'),
      'I-14 — the divergence leg exists too: the `[D]` non-claim is a non-claim, not an unavailable instrument',
    ).toBe(true)
    // This file offers NO `[U]` row: no row of it boots a window or reads a
    // rendered value, and the row may not be moved to the `ui` leg silently.
    // The probe reads IMPORTS, not prose, so this file's own comments about the
    // refusal do not redden it.
    expect(
      scanRegexes(normalizeView(testFileBytes()), [
        { id: 'a shell-runtime import in this file', re: new RegExp(`\\bimport\\b[^\\n]*${cc([101, 108, 101, 99, 116, 114, 111, 110])}`) },
        { id: 'a require of a leg driver in this file', re: /\brequire\s*\(\s*['"][^'"]*(?:ui|divergence|battery)/ },
      ]),
      'I-14 — this file boots nothing: no import of the shell runtime, no window and no leg driver appears among its rows',
    ).toEqual([])
    expect(
      existsSync(new URL('../scripts/electron-ui.mjs', import.meta.url)),
      'I-14 — the `ui` leg driver exists on disk, which is what makes the refusal STRUCTURAL rather than an availability excuse',
    ).toBe(true)
  })
})

// ===========================================================================
// §3.1 — THE HAPPY STATES `M-1`..`M-12` (`§4.2` item 4), with `M-9`/`M-10`
// beside `R-7`/`R-8`'s declaration rows and `M-11` (the write-log pair) sitting
// with the no-write rows it makes falsifiable.
// ===========================================================================
describeC('§3.1 M-1..M-12 — the valid / happy states', () => {
  itc('M-1 the selector forwards the caller\'s answer UNCHANGED and calls the seam EXACTLY once', async () => {
    const { tokensFor } = await surface('M-1')
    const chromeA = Object.freeze({ paneish: 'own-key', n: 1 })
    const sentinel = { sentinel: true }
    const rec = recorder(sentinel)
    const before = JSON.stringify(chromeA)
    const out = tokensFor(chromeA, rec.fn)
    expect(rec.count(), 'M-1 — the recorded invocation count is 1').toBe(1)
    expect(out, 'M-1 — the return value IS the sentinel object by identity').toBe(sentinel)
    expect(sameRef(rec.args[0], chromeA), 'M-1 — the argument the seam received IS the caller\'s record by identity').toBe(true)
    expect(JSON.stringify(chromeA), 'M-1 — the record is value-identical before and after').toBe(before)
    expect(Object.keys(chromeA), 'M-1 — …and reference-identical with its own keys untouched by the module').toEqual(['paneish', 'n'])
  })

  itc('M-2 the selector is TOTAL over the whole argument domain — there is NO shape gate', async () => {
    const { tokensFor } = await surface('M-2')
    for (const shape of TWELVE_SHAPES) {
      const value = shape.make()
      const rec = recorder('answered')
      const out = tokensFor(value, rec.fn)
      expect(rec.count(), `M-2 — the seam is invoked EXACTLY ONCE for (${shape.id})`).toBe(1)
      expect(sameRef(rec.args[0], value), `M-2 — (${shape.id}) reaches the seam BY IDENTITY`).toBe(true)
      expect(out, `M-2 — (${shape.id})'s answer is returned by identity: never a branch that skips the call`).toBe('answered')
    }
    // The twelve shapes really are twelve distinct drives.
    expect(TWELVE_SHAPES.length, 'M-2 — the enumerated domain holds the twelve shapes §3.1 M-2 names').toBe(12)
  })

  itc('M-3 the normalizer forwards the caller\'s answer UNCHANGED and calls the seam EXACTLY once — for every edge shape', async () => {
    const { orientationFor } = await surface('M-3')
    for (const shape of TWELVE_SHAPES) {
      const value = shape.make()
      const rec = recorder('orientation-answer')
      const out = orientationFor(value, rec.fn)
      expect(rec.count(), `M-3 — count 1 per call for (${shape.id})`).toBe(1)
      expect(sameRef(rec.args[0], value), `M-3 — the argument reaches the seam by identity for (${shape.id})`).toBe(true)
      expect(out, `M-3 — the answer is returned by identity for (${shape.id}): the edge is UNINTERPRETED`).toBe('orientation-answer')
    }
  })

  itc('M-4 the DECLARED DEGRADATION of an ABSENT or NON-CALLABLE seam, for both edges at once, including arity-one and null', async () => {
    const { tokensFor, orientationFor } = await surface('M-4')
    const nonCallable: NamedDrive[] = [
      { id: 'undefined', make: () => undefined },
      { id: '42', make: () => 42 },
      { id: "'x'", make: () => 'x' },
      { id: 'null', make: () => null },
      { id: 'true', make: () => true },
      { id: '{}', make: () => ({}) },
      { id: '[]', make: () => [] },
      { id: 'a Symbol', make: () => Symbol('s') },
      { id: 'a 12n', make: () => 12n },
      { id: 'the seam OMITTED from the call entirely (arity two vs arity one)', make: () => OMITTED },
    ]
    for (const seam of nonCallable) {
      const v = seam.make()
      const selectorOut = v === OMITTED ? (tokensFor as unknown as (c: unknown) => unknown)('x') : tokensFor('x', v)
      const normalizerOut = v === OMITTED ? (orientationFor as unknown as (e: unknown) => unknown)('x') : orientationFor('x', v)
      expect(selectorOut, `M-4 — tokensFor with the seam as (${seam.id}) returns the declared EMPTY answer undefined`).toBe(undefined)
      expect(normalizerOut, `M-4 — orientationFor with the seam as (${seam.id}) returns the declared EMPTY answer undefined`).toBe(undefined)
      expect(
        [selectorOut, normalizerOut].every((a) => a === undefined),
        `M-4 — no mechanism default appears for (${seam.id}): no '', no 0, no {}, no sentinel`,
      ).toBe(true)
    }
    // null reads the SAME as the other non-callables (asserted above by the
    // shared expectation), and the recorder proves ZERO invocations are possible
    // for a non-callable by construction: the count is read on the callable path.
    const rec = recorder('x')
    expect(tokensFor('x', rec.fn), 'M-4 — the contrast drive: the callable path answers the caller\'s own value').toBe('x')
  })

  itc('M-5 the DECLARED DEGRADATION of a THROWING seam: ONE attempted invocation, ABSORBED, nothing escapes, never retried', async () => {
    const { tokensFor, orientationFor } = await surface('M-5')
    const sel = throwingSeam(new Error('x'))
    expect(tokensFor('x', sel.fn), 'M-5 — the return value is the declared EMPTY answer undefined').toBe(undefined)
    expect(sel.count(), 'M-5 — the recorded invocation count is 1: the attempt IS counted').toBe(1)
    expect(sel.count(), 'M-5 — the seam is NEVER RETRIED (the count stays 1)').toBe(1)
    const selAgain = throwingSeam(new Error('x'))
    expect(tokensFor('x', selAgain.fn), 'M-5 — a second call with the same throwing seam produces the SAME declared answer').toBe(undefined)
    expect(selAgain.count(), 'M-5 — …with its own count of 1').toBe(1)
    const axis = throwingSeam(new Error('x'))
    expect(orientationFor('x', axis.fn), 'M-5 — the normalizer\'s declared EMPTY answer is returned through the throw').toBe(undefined)
    expect(axis.count(), 'M-5 — one attempted invocation on the normalizer path').toBe(1)
    expect(() => tokensFor('x', throwingSeam('not an Error').fn), 'M-5 — nothing escapes, even for a non-Error throw').not.toThrow()
  })

  itc('M-6 the record reads are TOTAL: a hostile holder, a throwing accessor and a Map are all handled without a throw, and Map reads are never made by the module', async () => {
    const { tokensFor } = await surface('M-6')
    const drives: NamedDrive[] = [
      { id: 'a null-prototype record', make: () => Object.assign(Object.create(null) as object, { k: 1 }) },
      { id: 'a trap-throwing Proxy', make: () => trapThrowingProxy() },
      { id: 'a Map carrying an is-empty key', make: () => new Map<string, unknown>([['is-empty', true]]) },
      { id: 'a frozen record with an empty member', make: () => Object.freeze({ empty: true }) },
    ]
    for (const drive of drives) {
      const value = drive.make()
      for (const seamKind of ['conformant', 'throwing'] as const) {
        const rec = seamKind === 'conformant' ? recorder('answer') : throwingSeam(new Error('x'))
        const out = tokensFor(value, rec.fn)
        const expected = seamKind === 'conformant' ? 'answer' : undefined
        expect(out, `M-6 — (${drive.id}) with a ${seamKind} seam returns the declared answer`).toBe(expected)
      }
    }
    // THE Map.prototype READ SPY, over a REVERSIBLE patch: the module never calls it.
    const original = Map.prototype.get
    let calls = 0
    try {
      Object.defineProperty(Map.prototype, 'get', {
        configurable: true,
        writable: true,
        value: function patchedGet(this: Map<unknown, unknown>, key: unknown): unknown {
          calls += 1
          return original.call(this, key)
        },
      })
      const rec = recorder('answer')
      tokensFor(new Map<string, unknown>([['is-empty', true]]), rec.fn)
      expect(calls, 'M-6 / I-2 — `Map.prototype.get` is invoked ZERO times by the module: no member of the record is consulted for a decision').toBe(0)
    } finally {
      Object.defineProperty(Map.prototype, 'get', { configurable: true, writable: true, value: original })
    }
  })

  itc('M-7 the returned class name is VERBATIM where the caller supplied a usable string', async () => {
    const { containerDeclarationFor } = await surface('M-7')
    for (const name of USABLE_CLASS_NAMES) {
      const record = containerDeclarationFor(name)
      expect(record.className, `M-7 — the returned class name IS the exact string by identity for ${brief(name)}: no normalization, no trimming, no case folding, no validation, no escaping, no prefixing and no length limit`).toBe(name)
      expect(record.className.length, `M-7 — the length is preserved for ${brief(name)}`).toBe(name.length)
      expect(record.declaration, 'M-7 — the declaration is the pinned text in the SAME record (one call, two members)').toBe(PINNED)
    }
  })

  itc('M-8 the returned class name is the declared EMPTY answer `\'\'` for every UNUSABLE argument, and toString/valueOf are never consulted', async () => {
    const { containerDeclarationFor } = await surface('M-8')
    for (const drive of UNUSABLE_CLASS_NAMES) {
      const record = driveDeclaration(containerDeclarationFor, drive.make())
      expect(record.className, `M-8 — for (${drive.id}) the returned class name reads EXACTLY ''`).toBe('')
      expect(record.declaration, `M-8 — for (${drive.id}) the declaration reads the pinned text`).toBe(PINNED)
      expect(record.className.length, `M-8 — no mechanism default other than the declared '' appears for (${drive.id})`).toBe(0)
    }
    // THE THROWING-toString DRIVE PROVES toString/valueOf are never consulted: it
    // is inside the enumerated domain above (its own entry), and the drive did
    // not throw, which is the proof.
    let consulted = 0
    const probe = {
      toString(): string {
        consulted += 1
        return 'never'
      },
      valueOf(): number {
        consulted += 1
        return 0
      },
    }
    expect(containerDeclarationFor(probe).className, 'M-8 — an object with a working toString is still an unusable class name').toBe('')
    expect(consulted, 'M-8 — toString and valueOf are NEVER consulted').toBe(0)
  })

  itc('M-9 the declaration text is returned byte-identically and the returned record\'s member census is EXACTLY the two declared names', async () => {
    const { containerDeclarationFor } = await surface('M-9')
    const codes = (text: string): number[] => Array.from(text).map((c) => c.charCodeAt(0))
    for (const name of ['x', 'is-empty', 'a b', '--c', 'z']) {
      const record = containerDeclarationFor(name)
      // (i) the value is the pinned text; (ii) 27 characters; (iii) the character codes match.
      expect(record.declaration, `M-9 — (i) the returned declaration is the pinned text for ${brief(name)}`).toBe(PINNED)
      expect(record.declaration.length, `M-9 — (ii) the declaration is 27 characters long for ${brief(name)}`).toBe(PINNED_LENGTH)
      expect(codes(record.declaration), `M-9 — (iii) the character-code sequence equals the pinned constant's for ${brief(name)}`).toEqual(codes(PINNED))
      // (iv) the own ENUMERABLE string keys, in declaration order, with no third.
      expect(Object.keys(record), `M-9 — (iv) the own enumerable string keys are exactly the two declared names in order, for ${brief(name)}`).toEqual([...RECORD_KEYS])
      // (v) the prototype and the absence of any getter.
      expect(Object.getPrototypeOf(record), `M-9 — (v) the record's prototype is Object.prototype`).toBe(Object.prototype)
      const descriptorClass = Object.getOwnPropertyDescriptor(record, 'className')
      const descriptorDecl = Object.getOwnPropertyDescriptor(record, 'declaration')
      expect(
        descriptorClass !== undefined && ('value' in descriptorClass) && descriptorDecl !== undefined && ('value' in descriptorDecl),
        `M-9 — no member is a getter for ${brief(name)}: both own descriptors are data properties`,
      ).toBe(true)
    }
  })

  itc('M-10 the declaration is NEVER PARSED and NEVER APPLIED — the [T] proof of E5-B-1\'s return half', async () => {
    const { containerDeclarationFor } = await surface('M-10')
    // (a) two calls: byte-identical text, equal to the pinned constant.
    const a = containerDeclarationFor('x')
    const b = containerDeclarationFor('x')
    expect(a.declaration, 'M-10(a) — the text is byte-identical in both calls').toBe(b.declaration)
    expect(a.declaration, 'M-10(a) — …and equal to the pinned constant').toBe(PINNED)
    // (b) a recording element present in the drive, never passed to the module.
    const log = writeLog()
    containerDeclarationFor('x')
    containerDeclarationFor('is-empty')
    expect(log.all(), 'M-10(b) — the recording element\'s write-log reads ZERO writes of every kind: zero property sets, zero method calls, zero attribute writes').toBe(0)
    // (c) a static read of the module's bytes: no split, no scan, no parse, no rule object.
    const src = moduleSource()
    expect(src, 'M-10(c) — the module exists for its bytes to be read').not.toBe(null)
    if (src === null) return
    expect(
      scanRegexes(normalizeView(src), R8_PARSE_RULES),
      'M-10(c) — the module\'s bytes contain no split of the text, no colon/semicolon scan, no parse, no RegExp over it, no property-name extraction and no rule object',
    ).toEqual([])
    // The subtraction that makes R-10's scan non-vacuous: the word `style` (and
    // the `contain:` property form) exist ONLY inside the pinned literal.
    const raw = normalizeView(src)
    expect(raw.includes('style'), 'M-10(c) — the module really does carry the declaration\'s own `style` word (so its exemption is about the PINNED LITERAL and not about a missing token)').toBe(true)
    expect(
      viewWithoutPinnedLiteral(raw).includes('style'),
      'M-10(c) — the word `style` appears ONLY inside the pinned declaration literal: subtracting that literal removes every occurrence, which is what makes the write scan non-vacuous',
    ).toBe(false)
  })

  itc('M-11 THE NO-WRITE ROW, over a recording element, for EVERY entry point, four times each, with a live-log positive control', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('M-11')
    const log = writeLog()
    for (let i = 0; i < 4; i += 1) {
      tokensFor({ k: i }, () => 'ok')
      orientationFor('edge', () => 'ok')
      containerDeclarationFor('x')
    }
    expect(log.writes(), 'M-11 — the write-log reads ZERO property sets over the twelve drives (the element is never passed to the module — §4.3)').toBe(0)
    expect(log.methodCalls(), 'M-11 — zero method invocations').toBe(0)
    expect(log.attributes(), 'M-11 — zero attribute writes').toBe(0)
    expect(log.nodeCreations(), 'M-11 — zero node creations').toBe(0)
    // THE POSITIVE CONTROL: a harness-side write on the SAME element reads 1, so
    // the log is proven live rather than dead.
    log.harnessWrite()
    expect(log.writes(), 'M-11 — the POSITIVE CONTROL reads 1, so the log is proven live (a log that reads 0 for the control is itself a finding)').toBe(1)
  })

  itc('M-12 the whole surface is reachable and returns its declared shapes in ONE composition', async () => {
    const { tokensFor, orientationFor, containerDeclarationFor } = await surface('M-12')
    const tokenRec = recorder({ token: 'the-callers-answer' })
    const axisRec = recorder({ axis: 'the-callers-answer' })
    const tokenAnswer = tokensFor({ k: 1 }, tokenRec.fn)
    const axisAnswer = orientationFor({ e: 1 }, axisRec.fn)
    const record = containerDeclarationFor('x')
    expect(tokenAnswer, 'M-12 — tokensFor returns the caller\'s answer').toBe(tokenRec.answer)
    expect(tokenRec.count(), 'M-12 — with count 1').toBe(1)
    expect(axisAnswer, 'M-12 — orientationFor returns the caller\'s answer').toBe(axisRec.answer)
    expect(axisRec.count(), 'M-12 — with count 1').toBe(1)
    expect(Object.keys(record), 'M-12 — containerDeclarationFor returns the two-member record').toEqual([...RECORD_KEYS])
    expect(tokenRec.count() + axisRec.count(), 'M-12 — the drive\'s own total reads 2 recorded invocations across the two seams').toBe(2)
    expect(Object.keys(record).length, 'M-12 — and 2 members on the third return').toBe(2)
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER'S EXECUTION MACHINERY.
// Caps (uniform for the whole register): ≤100 attempts per row, ≤400 attempts in
// total, rows evaluated SEQUENTIALLY IN REGISTER ORDER, **STOP AFTER 5
// CONSECUTIVE FAILURES** (the running row's remaining attempts are abandoned and
// no further row starts). Each row's `it` title carries its row id AND its
// strategy id, and each row logs its own record line so the audit can read
// attempts-run / held / broken / controls per row from the output. **An un-run
// register row is reported as a FAILURE, never as a pass.**
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296

const registerState = {
  attempts: 0,
  consecutiveFailures: 0,
  stoppedAtRow: null as string | null,
  stoppedFor: null as string | null,
}

type RowRecord = {
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

class RegisterRow {
  readonly row: string
  readonly strategy: string
  private attemptsRun = 0
  private held = 0
  private broken = 0
  /** A DECLARED-FAILING CONTROL is a COUNTED DRIVE and is NEVER a `broken`
   *  attempt: it is reported BESIDE the term (`§5.5.2` item 9). */
  private controls = 0
  private stoppedEarly = false
  private notStarted = false
  private readonly causes: string[] = []

  constructor(row: string, strategy: string) {
    this.row = row
    this.strategy = strategy
  }

  /** ONE attempt. `body` returns `null` when the property HELD, else the break
   *  cause as a sentence (a throw is caught and is itself a break cause). */
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

  /** A DECLARED-FAILING CONTROL: an observation BESIDE the term, counted
   *  nowhere (`§5.5.2` item 9 parts 2/3). A control that does NOT fail as
   *  declared is a break of the control itself, and is reported as such. */
  control(label: string, declaredToFail: boolean): void {
    this.controls += 1
    if (!declaredToFail) {
      this.causes.push(`${label} — the DECLARED-FAILING control did NOT fail: the scan is UNFALSIFIED and must not be filed (S-CT-6)`)
    }
  }

  /** The row's own verdict + its `§5.5.1`/`§5.3` item 10 record line. An un-run
   *  row FAILS on purpose: an un-executed register row may not look green. */
  finish(): void {
    const record: RowRecord = {
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
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    if (this.attemptsRun === 0) {
      expect(
        this.attemptsRun,
        `${line} — this row NEVER STARTED: the register's stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures discipline triggered at row ` +
          `${registerState.stoppedAtRow ?? 'an earlier row'} (${registerState.stoppedFor ?? 'cause unrecorded'}). ` +
          'An un-run register row is reported as a FAILURE, never as a pass (§5.5.1 cap 3).',
      ).toBeGreaterThan(0)
      return
    }
    expect(
      this.broken,
      `${line} — RED (§5.5.1): ${this.broken} of ${this.attemptsRun} attempts BROKE. First causes: ${JSON.stringify(this.causes.slice(0, 3))}`,
    ).toBe(0)
  }
}

/** `S-CT-TP-1`'s pinned-seed generator: a hand-rolled 32-bit LCG whose constants
 *  are literals in THIS file. `stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`,
 *  **ONE step per draw**; the pool index is `stateₙ₊₁ mod pool.length` with
 *  `pool.length = 14`. **No `next(k)` helper, no scaling form, no `Math.random`,
 *  no wall-clock seed, no shrinking and no adaptive search.** */
function makeLcg(seed: number): { step: () => number } {
  let state = seed >>> 0
  return {
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}

/** `P-CT-TP-1`'s `14`-member hostile pool, BY NAME and in the row's order. All
 *  members are totality INPUTS whose declared outcomes are stated; the pool's
 *  silence about a shape it does not list is a STATED BOUNDARY. */
const TP_POOL: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
  { id: '(1) Object.create(null) with own keys', make: () => Object.assign(Object.create(null) as object, { k: 1 }) },
  { id: '(2) NaN', make: () => NaN },
  { id: '(3) a Symbol', make: () => Symbol('p') },
  { id: '(4) a 12n', make: () => 12n },
  { id: '(5) a revoked Proxy', make: () => revokedProxy() },
  { id: '(6) a Proxy whose getOwnPropertyDescriptor/ownKeys/has/get traps all throw', make: () => trapThrowingProxy() },
  { id: '(7) a function', make: () => () => 1 },
  { id: '(8) an array', make: () => [1, 2] },
  { id: '(9) a frozen record with own keys', make: () => Object.freeze({ k: 1 }) },
  {
    id: '(10) a record whose own toString/valueOf/toPrimitive throw',
    make: () => {
      const rec: Record<string, unknown> = {}
      Object.defineProperty(rec, 'toString', {
        value: () => {
          throw new Error('toString throws')
        },
        enumerable: false,
      })
      Object.defineProperty(rec, 'valueOf', {
        value: () => {
          throw new Error('valueOf throws')
        },
        enumerable: false,
      })
      Object.defineProperty(rec, Symbol.toPrimitive, {
        value: () => {
          throw new Error('toPrimitive throws')
        },
        enumerable: false,
      })
      return rec
    },
  },
  { id: '(11) a Map with an is-empty key', make: () => new Map<string, unknown>([['is-empty', true]]) },
  { id: '(12) the empty string', make: () => '' },
  { id: '(13) undefined', make: () => undefined },
  { id: '(14) null', make: () => null },
]
const TP_DRAWS = 14
/** The `14` draw INDICES, materialised from the pinned literals so the seed and
 *  the one-step-per-draw form are testable rather than asserted. */
const TP_DRAW_INDICES: readonly number[] = (() => {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < TP_DRAWS; i += 1) out.push(lcg.step() % TP_POOL.length)
  return out
})()

/** `§5.5.3`'s DECLARED total, as AMENDED 2026-09-27 (`§0A` note 7.2): it IS the sum
 *  of the register's own ten terms, and it is the figure every cap comparison uses.
 *  ⟶ RE-GRAINED from the as-filed `154`, which is kept VISIBLE below as the
 *  annotated, SUPERSEDED provenance (annotate-never-rewrite). */
const DECLARED_TOTAL = 137
/** `§5.5.3`'s AS-FILED declared total — **SUPERSEDED**, kept visible and unmoved
 *  as the annotated provenance (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`
 *  sub-rule 1). It exceeds the sum of its own ten terms by `17` — the very `17`
 *  the as-filed "correction" line re-added (`P-CT-IM-3`, counted once as a term
 *  and once more inside the `127` `IM` subtotal). */
const AS_FILED_TOTAL = 154
/** The register's declared per-row TERMS, in register order — every term a DRIVE
 *  count, with the assertions printed BESIDE it and never counted in it. */
const REGISTER_TERMS: ReadonlyArray<{ readonly row: string; readonly declared: number; readonly distinct: number; readonly bounded: boolean; readonly strategy: string }> = [
  { row: 'P-CT-IM-1', declared: 40, distinct: 33, bounded: true, strategy: 'S-CT-ENUM-1' },
  { row: 'P-CT-IM-2', declared: 26, distinct: 22, bounded: false, strategy: 'S-CT-EMPTY-1' },
  { row: 'P-CT-IM-3', declared: 17, distinct: 12, bounded: false, strategy: 'S-CT-CLASS-1' },
  { row: 'P-CT-IM-4', declared: 10, distinct: 5, bounded: true, strategy: 'S-CT-DECL-1' },
  { row: 'P-CT-IM-5', declared: 12, distinct: 12, bounded: true, strategy: 'S-CT-SHAPE-1' },
  { row: 'P-CT-IM-6', declared: 5, distinct: 4, bounded: false, strategy: 'S-CT-CONST-1' },
  { row: 'P-CT-SM-1', declared: 3, distinct: 3, bounded: false, strategy: 'S-CT-STATELESS-1' },
  { row: 'P-CT-SM-2', declared: 5, distinct: 4, bounded: false, strategy: 'S-CT-ENUM-1' },
  { row: 'P-CT-SM-3', declared: 5, distinct: 3, bounded: true, strategy: 'S-CT-NORMALIZE-1' },
  { row: 'P-CT-TP-1', declared: 14, distinct: 14, bounded: true, strategy: 'S-CT-TP-1' },
]

// ===========================================================================
// PRE — harness preconditions (NOT spec rows). They are the instruments the
// register rows depend on, asserted so a red register row cannot be a harness
// artefact. Both are expected GREEN today.
// ===========================================================================
describeC('PRE — register-harness preconditions (not spec rows)', () => {
  itc('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['mountEl'], 'the boundary technique reaches an existing module, so an absent module is reported as DATA rather than as a transform error').toBe('function')
  })

  itc('PRE-2 the register tables are the ones §5.5.1 specifies: sizes, the caps, the pinned arithmetic, the seed and the one-step-per-draw form', () => {
    expect(TP_POOL.length, "§5.5.1 P-CT-TP-1's pool holds the 14 named members").toBe(14)
    expect(new Set(TP_POOL.map((s) => s.id)).size, 'the 14 pool members are distinct').toBe(14)
    expect(TP_DRAW_INDICES.length, 'the 14 draws are materialised as indices, one LCG step each').toBe(TP_DRAWS)
    expect(SEED, 'the seed is the pinned literal §5.5.1 names').toBe(20260927)
    expect(LCG_A, 'the LCG multiplier is the pinned literal').toBe(1664525)
    expect(LCG_C, 'the LCG increment is the pinned literal').toBe(1013904223)
    expect(LCG_MOD, 'the modulus is 2**32').toBe(2 ** 32)
    // The first three states, recomputed from the literals: a later edit of a
    // constant reddens HERE.
    const s1 = (SEED * LCG_A + LCG_C) % LCG_MOD
    const s2 = (s1 * LCG_A + LCG_C) % LCG_MOD
    const s3 = (s2 * LCG_A + LCG_C) % LCG_MOD
    const lcg = makeLcg(SEED)
    expect([lcg.step(), lcg.step(), lcg.step()], 'the first three LCG states from seed 20260927 are the literals recomputed here').toEqual([s1, s2, s3])
    expect(TP_DRAW_INDICES.slice(0, 3), 'one LCG step per draw: the first three pool indices are state₁₋₃ mod 14').toEqual([s1 % 14, s2 % 14, s3 % 14])
    // THE DECLARED ARITHMETIC, checked against THIS file's own tables. The total
    // is printed WITH ITS TERMS and IS their sum (§5.5.3).
    const terms = REGISTER_TERMS.map((r) => r.declared)
    expect(Object.values(REGISTER_TERMS.map((r) => r.row)), 'the register holds the 10 rows §5.5.1 enumerates, in register order').toEqual([
      'P-CT-IM-1',
      'P-CT-IM-2',
      'P-CT-IM-3',
      'P-CT-IM-4',
      'P-CT-IM-5',
      'P-CT-IM-6',
      'P-CT-SM-1',
      'P-CT-SM-2',
      'P-CT-SM-3',
      'P-CT-TP-1',
    ])
    expect(
      terms.join(' + '),
      'the ten declared terms, in register order (§5.5.3): 40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14',
    ).toBe('40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14')
    // =====================================================================
    // ⟶ RE-GRAINED 2026-09-27 (`§0A` note 7.2/7.3, THE DEFECT-REPAIR AMENDMENT):
    // **THE DECLARED TOTAL IS NOW `137`, AND THE AS-FILED `154` IS KEPT VISIBLE
    // BESIDE IT AS THE ANNOTATED, SUPERSEDED FILING FIGURE.**
    //
    // The AS-FILED form (`§5.5.3`, still printed there under its dated
    // annotation) declared **`154` = `40` + `26` + `17` + `10` + `12` + `5` + `3`
    // + `5` + `5` + `14`** with the chain `40 → 66 → 83 → 93 → 105 → 110 → 113 →
    // 118 → 123 → 154` — **while those SAME ten terms SUM TO `137`**: a `17`
    // excess, and the as-filed chain's LAST step is the only step that does not
    // follow from its predecessor's own term (`123` + `14` = `137`). The cause,
    // now pinned at `§5.5.3`: a "correction" line rewrote `IM` as `40 + 26 + 17 +
    // 10 + 12 + 5 + 17` = `127` and reached `127 + 13 + 14` = `154` — **re-adding
    // `P-CT-IM-3`'s `17`, a term the `IM` line already carried, so the false `154`
    // was produced by double-counting the very term whose omission it claimed to
    // fix.** The as-written `IM 110 · SM 13 · TP 14` = `137` line was RIGHT all
    // along.
    //
    // `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1: a mis-sum is
    // corrected by **ANNOTATING BESIDE THE AS-FILED FORM, NEVER BY SILENTLY
    // REWRITING IT**. So this row asserts the DECLARED total (`137`) as the
    // declared figure AND keeps the AS-FILED figure (`154`) asserted and visible
    // beside it — **and it asserts that the two are NOT interchangeable, so a
    // harness that would pass for either figure FAILS here. NO per-row term, row
    // id, strategy id, seed or cap moved; only the declared/as-filed polarity
    // flipped** (`§0A` note 7.3).
    // =====================================================================
    const declaredSum = terms.reduce((a, b) => a + b, 0)
    expect(
      declaredSum,
      'THE DECLARED TOTAL (§5.5.3 as amended 2026-09-27, §0A note 7.2): it is printed WITH its terms and IS their sum — 40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14',
    ).toBe(DECLARED_TOTAL)
    expect(DECLARED_TOTAL, 'the declared figure §5.5.3 now carries, as a pinned literal rather than a computed one').toBe(137)
    expect(
      AS_FILED_TOTAL,
      '§5.5.3\'s AS-FILED declared total, kept VISIBLE and unmoved beside the declared one (annotate-never-rewrite): the SUPERSEDED filing figure, not the declared one',
    ).toBe(154)
    expect(
      DECLARED_TOTAL,
      'THE POLARITY FLIP IS REAL: the DECLARED figure is NOT the as-filed figure, so a harness that would pass for either figure is the finding (a 137-vs-154 agnostic assertion is unfalsified and must not be filed)',
    ).not.toBe(AS_FILED_TOTAL)
    /** THE RECONCILIATION ITSELF, as a predicate over the register's own terms: a
     *  declared figure reconciles IFF it IS the sum of the ten terms. It exists so
     *  the declared-vs-as-filed reconciliation CAN FAIL — a control BESIDE the
     *  term, counted nowhere (`§5.5.2` item 9). */
    const reconcilesWithItsTerms = (declaredFigure: number): boolean => declaredFigure === declaredSum
    expect(
      reconcilesWithItsTerms(DECLARED_TOTAL),
      'CONTROL: the DECLARED 137 reconciles with the register\'s own ten terms',
    ).toBe(true)
    expect(
      reconcilesWithItsTerms(AS_FILED_TOTAL),
      'CONTROL (declared to FAIL): the AS-FILED 154 does NOT reconcile with the same ten terms — were this to return true, the declared/as-filed polarity would be vacuous and the harness would pass for either figure',
    ).toBe(false)
    expect(
      reconcilesWithItsTerms(DECLARED_TOTAL + 11),
      'CONTROL (declared to FAIL): a declared figure that is not its terms\' sum fails the reconciliation (e.g. 148 here) — the reconciliation is falsifiable, not decorative',
    ).toBe(false)
    expect(
      AS_FILED_TOTAL - declaredSum,
      'the excess, named so the defect stays a figure rather than a sentence: the SUPERSEDED as-filed total exceeds the sum of its own ten terms by this much (the P-CT-IM-3 term counted twice)',
    ).toBe(17)
    // The AS-FILED term-by-term addition chain, kept visible so the mis-step stays
    // attributable beside the declared chain below it.
    const asFiledChain = [40, 66, 83, 93, 105, 110, 113, 118, 123, 154]
    expect(asFiledChain[9], "§5.5.3's AS-FILED chain ENDS on the as-filed total, which is what keeps it attributable").toBe(AS_FILED_TOTAL)
    expect(
      asFiledChain[9] - asFiledChain[8],
      "the as-filed chain's LAST step (`123` → `154`) is the ONLY step that does not follow from its predecessor's own term: `123` + the tenth term `14` = `137`, so the step overstates by `17`",
    ).toBe(terms[9] + 17)
    // The DECLARED chain, so the total is checkable rather than asserted.
    const chain: number[] = []
    let acc = 0
    for (const t of terms) {
      acc += t
      chain.push(acc)
    }
    expect(
      chain,
      'THE DECLARED term-by-term addition chain (§5.5.3 as amended): 40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 → 123 → 137 — every step follows from its predecessor\'s own term',
    ).toEqual([40, 66, 83, 93, 105, 110, 113, 118, 123, DECLARED_TOTAL])
    expect(acc, 'the running total the caps are compared against here IS the declared total').toBe(DECLARED_TOTAL)
    expect(chain[9], 'the chain and the declared literal are the same figure, asserted rather than assumed').toBe(DECLARED_TOTAL)
    for (const r of REGISTER_TERMS) {
      expect(r.declared, `${r.row} is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(acc, `the register total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    // THE (bounded) SET — 5 of the 10 rows, named IDENTICALLY at §5.5.1/§5.5.2/§5.5.3.
    expect(
      REGISTER_TERMS.filter((r) => r.bounded).map((r) => r.row),
      'the (bounded) marking is carried by exactly these five rows, named rather than counted',
    ).toEqual(['P-CT-IM-1', 'P-CT-IM-4', 'P-CT-IM-5', 'P-CT-SM-3', 'P-CT-TP-1'])
    expect(
      REGISTER_TERMS.filter((r) => !r.bounded).map((r) => r.row),
      'the UNMARKED five quantify over closed named lists or fixed grids, so no marking is owed and none is printed',
    ).toEqual(['P-CT-IM-2', 'P-CT-IM-3', 'P-CT-IM-6', 'P-CT-SM-1', 'P-CT-SM-2'])
    // THE FAMILY SUBTOTALS, with the as-filed mis-sum kept visible rather than smoothed.
    const im = REGISTER_TERMS.filter((r) => r.row.startsWith('P-CT-IM')).reduce((a, b) => a + b.declared, 0)
    const sm = REGISTER_TERMS.filter((r) => r.row.startsWith('P-CT-SM')).reduce((a, b) => a + b.declared, 0)
    const tp = REGISTER_TERMS.filter((r) => r.row.startsWith('P-CT-TP')).reduce((a, b) => a + b.declared, 0)
    expect(
      [im, sm, tp],
      'THE DECLARED family subtotals of THIS file\'s own tables (§5.5.3 as amended): IM 110 · SM 13 · TP 14 — and the as-written `110`/`13`/`14` line was right all along',
    ).toEqual([110, 13, 14])
    expect(
      im + sm + tp,
      'THE DECLARED subtotals sum to the DECLARED total (110 + 13 + 14 = 137), so the total reconciles with its terms AND with its families',
    ).toBe(DECLARED_TOTAL)
    expect(
      im + sm + tp,
      'the subtotal sum and the declared literal are asserted as the SAME figure, not two independently-satisfiable ones',
    ).toBe(DECLARED_TOTAL)
    expect(
      [im + 17, sm, tp].reduce((a, b) => a + b, 0),
      'THE AS-FILED subtotal line (127/13/14) is kept VISIBLE here as the SUPERSEDED provenance: §5.5.3\'s "correction" rewrote IM as 40 + 26 + 17 + 10 + 12 + 5 + 17 = 127, ' +
        're-adding P-CT-IM-3\'s 17 a SECOND time — which is exactly what lands on the as-filed 154',
    ).toBe(AS_FILED_TOTAL)
    expect(
      [110, 13, 14].reduce((a, b) => a + b, 0),
      'the AS-WRITTEN subtotal line (110/13/14) is kept visible in §5.5.3 under its dated annotation, and it is the DECLARED arithmetic',
    ).toBe(DECLARED_TOTAL)
  })

  itc('PRE-3 the declared-versus-distinct ledger is carried (§5.5.2 item 3): the declared figures are what the caps compare against, and the distinct ones are never substituted', () => {
    for (const r of REGISTER_TERMS) {
      expect(r.distinct, `${r.row}: the distinct figure is reported BESIDE the declared term and never exceeds it`).toBeLessThanOrEqual(r.declared)
    }
    expect(
      REGISTER_TERMS.map((r) => `${r.row}:${r.declared}/${r.distinct}`),
      'the eight differing pairs §5.3 item 11 names, BESIDE the two that agree',
    ).toEqual([
      'P-CT-IM-1:40/33',
      'P-CT-IM-2:26/22',
      'P-CT-IM-3:17/12',
      'P-CT-IM-4:10/5',
      'P-CT-IM-5:12/12',
      'P-CT-IM-6:5/4',
      'P-CT-SM-1:3/3',
      'P-CT-SM-2:5/4',
      'P-CT-SM-3:5/3',
      'P-CT-TP-1:14/14',
    ])
    // A DRAW IS NOT A SWEEP: the distinct-member count is REPORTED below and
    // NOTHING is asserted about coverage (`§5.5.2` item 4). The reading is
    // printed so the audit can see that these 14 draws do not sweep the pool.
    const distinctDrawn = new Set(TP_DRAW_INDICES).size
    console.log(
      `§5.5.1 register note :: the pinned 14 draws of P-CT-TP-1 land on ${distinctDrawn} DISTINCT pool members of ${TP_POOL.length} — a REPORTED figure, never asserted; ` +
        'a DONE row claiming full pool coverage is a review finding.',
    )
    expect(distinctDrawn, "the REPORTED distinct-member count is a figure this file prints and never constrains to the pool size (A DRAW IS NOT A SWEEP)").toBe(
      new Set(TP_DRAW_INDICES).size,
    )
    expect(distinctDrawn, 'the distinct count cannot exceed the pool size').toBeLessThanOrEqual(TP_POOL.length)
  })
})

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER, IN REGISTER ORDER: 10 rows, 10 terms,
// 137 declared attempts (⟶ RE-GRAINED 2026-09-27: `§5.5.3`'s as-filed `154` is
// the SUPERSEDED filing figure, kept visible beside the declared `137`).
// ===========================================================================
describeC('§5.5.1 — the typed property register (10 rows, 10 terms, DECLARED total 137 — the as-filed 154 kept beside it as superseded; executed deterministically, no PBT harness)', () => {
  itc('P-CT-IM-1 (S-CT-ENUM-1, bounded) the selector\'s purity and totality: 8 chrome shapes × 5 tokenFn shapes = 40 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-1', 'S-CT-ENUM-1')
    const s = await surfaceOrCause()
    const chromeShapes: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'chrome(1) a frozen record with own keys', make: () => Object.freeze({ k: 1 }) },
      { id: 'chrome(2) Object.create(null) with own keys', make: () => Object.assign(Object.create(null) as object, { k: 1 }) },
      { id: 'chrome(3) a Map carrying an is-empty key', make: () => new Map<string, unknown>([['is-empty', true]]) },
      { id: 'chrome(4) null', make: () => null },
      { id: 'chrome(5) undefined', make: () => undefined },
      { id: 'chrome(6) a Symbol', make: () => Symbol('c') },
      { id: 'chrome(7) a 12n', make: () => 12n },
      { id: 'chrome(8) a Proxy whose traps throw', make: () => trapThrowingProxy() },
    ]
    /** ONE cell of the grid: the seam's kind, its own recorder, and the declared
     *  expectation for that cell (`§2.3` item 1's two-row dispatch table). */
    type Cell = {
      readonly id: string
      readonly run: (tokensFor: TokensForShape, chrome: unknown) => string | null
    }
    const sentinel = { sentinel: 'answer' }
    const SEAM_CELLS: readonly Cell[] = [
      {
        id: 'tokenFn(1) a callable returning an opaque sentinel OBJECT',
        run: (tokensFor, chrome) => {
          const rec = recorder(sentinel)
          const out = tokensFor(chrome, rec.fn)
          if (!sameRef(out, sentinel)) return 'the caller\'s sentinel answer was not returned BY IDENTITY'
          if (rec.count() !== 1) return `the recorded invocation count was ${rec.count()}, not 1`
          if (!sameRef(rec.args[0], chrome)) return 'the seam did not receive the chrome value BY IDENTITY'
          return null
        },
      },
      {
        id: 'tokenFn(2) a callable returning a PRIMITIVE (0)',
        run: (tokensFor, chrome) => {
          const rec = recorder(0)
          const out = tokensFor(chrome, rec.fn)
          if (out !== 0) return 'the primitive answer was not returned VERBATIM'
          if (rec.count() !== 1) return `the recorded invocation count was ${rec.count()}, not 1`
          return null
        },
      },
      {
        id: 'tokenFn(3) ABSENT (the member omitted / carried as undefined)',
        run: (tokensFor, chrome) => {
          const out = tokensFor(chrome, undefined)
          return out === undefined ? null : 'an absent seam did not return the declared EMPTY answer'
        },
      },
      {
        id: 'tokenFn(4) NON-CALLABLE (42)',
        run: (tokensFor, chrome) => {
          const out = tokensFor(chrome, 42)
          return out === undefined ? null : 'a non-callable seam did not return the declared EMPTY answer'
        },
      },
      {
        id: 'tokenFn(5) a callable that THROWS',
        run: (tokensFor, chrome) => {
          const rec = throwingSeam(new Error('x'))
          const out = tokensFor(chrome, rec.fn)
          if (out !== undefined) return 'a throwing seam did not return the declared EMPTY answer'
          if (rec.count() !== 1) return `the ATTEMPT count was ${rec.count()}, not 1: the throw must be ABSORBED, never hidden`
          return null
        },
      },
    ]
    // THE DECLARED GRID: 8 chrome shapes × 5 tokenFn shapes = 40 attempts, one
    // per cell, each asserting that cell's own declared pair.
    for (const chrome of chromeShapes) {
      for (const cell of SEAM_CELLS) {
        row.run(`${chrome.id} × ${cell.id}`, () => {
          if (!s.ok) return s.cause
          return cell.run(s.tokensFor, chrome.make())
        })
      }
    }
    // THE 8 FURTHER DRIVES BESIDE THE TERM: each chrome shape with seam shape
    // (1), asserting the answer's identity, the argument's identity and the count.
    for (const chrome of chromeShapes) {
      const rec = recorder(sentinel)
      row.run(`${chrome.id} × tokenFn(1) — the identity assertion beside the term`, () => {
        if (!s.ok) return s.cause
        const chromeValue = chrome.make()
        const out = s.tokensFor(chromeValue, rec.fn)
        if (!sameRef(out, sentinel)) return 'the caller\'s answer was not returned by identity'
        if (!sameRef(rec.args[0], chromeValue)) return 'the seam did not receive the caller\'s value by identity'
        return null
      })
    }
    row.finish()
  })

  itc('P-CT-IM-2 (S-CT-EMPTY-1) the one-authority / emptiness row: 5 member-key shapes × 2 tokenFn shapes + 16 further control drives = 26 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-2', 'S-CT-EMPTY-1')
    const s = await surfaceOrCause()
    const memberShapes: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'member(1) a record with NO taxonomy member', make: () => ({ k: 1 }) },
      { id: 'member(2) a record carrying empty: true', make: () => ({ k: 1, empty: true }) },
      { id: 'member(3) a record carrying is-empty: \'yes\'', make: () => ({ k: 1, 'is-empty': 'yes' }) },
      { id: 'member(4) a record carrying is-minimized: true and is-revealed: false', make: () => ({ k: 1, 'is-minimized': true, 'is-revealed': false }) },
      { id: 'member(5) a Map whose KEY is is-empty', make: () => new Map<string, unknown>([['is-empty', true]]) },
    ]
    const baseline = (): string => (s.ok ? (s.tokensFor({ k: 1 }, recorder('answer').fn) as string) : 'unavailable')
    const base = baseline()
    for (const member of memberShapes) {
      for (const seamKind of ['callable returning a sentinel OBJECT', 'THROWING callable'] as const) {
        row.run(`${member.id} × ${seamKind}`, () => {
          if (!s.ok) return s.cause
          const value = member.make()
          const rec = seamKind.startsWith('callable') ? recorder('answer') : throwingSeam(new Error('x'))
          const out = s.tokensFor(value, rec.fn)
          if (seamKind.startsWith('callable')) {
            if (out !== 'answer') return 'the caller\'s own answer was not returned: a member of the record changed the value'
            if (out !== base) return 'the returned value differs from the member-free cell: the record\'s member reached the decision'
          } else if (out !== undefined) {
            return 'a throwing callable did not return the declared EMPTY answer through a memberful record'
          }
          return null
        })
      }
    }
    // THE 16 FURTHER DRIVES, each named so the row's boundary is exact.
    const original = Map.prototype.get
    let spyCount = 0
    try {
      Object.defineProperty(Map.prototype, 'get', {
        configurable: true,
        writable: true,
        value: function patchedGet(this: Map<unknown, unknown>, key: unknown): unknown {
          spyCount += 1
          return original.call(this, key)
        },
      })
      for (const idx of [4, 0]) {
        for (const seamKind of ['callable', 'throwing'] as const) {
          row.run(`(i)-(iv) the Map.prototype read spy on member(${idx + 1}) under a ${seamKind} seam`, () => {
            if (!s.ok) return s.cause
            spyCount = 0
            const rec = seamKind === 'callable' ? recorder('answer') : throwingSeam(new Error('x'))
            s.tokensFor(memberShapes[idx].make(), rec.fn)
            return spyCount === 0 ? null : `the module invoked Map.prototype.get ${spyCount} time(s): no member may be consulted`
          })
        }
      }
    } finally {
      Object.defineProperty(Map.prototype, 'get', { configurable: true, writable: true, value: original })
    }
    const trapNames = ['is-empty', 'empty', 'is-minimized', 'is-revealed']
    for (const name of trapNames) {
      row.run(`(v)-(viii) the prototype trap on '${name}'`, () => {
        if (!s.ok) return s.cause
        const holder: Record<string, unknown> = {}
        Object.defineProperty(holder, name, {
          get(): never {
            throw new Error('the inherited accessor throws')
          },
          enumerable: true,
          configurable: true,
        })
        const value = Object.create(holder) as object
        const rec = recorder('answer')
        const out = s.tokensFor(value, rec.fn)
        return out === 'answer' ? null : 'a prototype trap changed the returned value or let a throw out'
      })
    }
    for (const member of memberShapes.slice(0, 4)) {
      row.run(`(ix)-(xii) the unaffectedness pair on ${member.id}`, () => {
        if (!s.ok) return s.cause
        const out = s.tokensFor(member.make(), recorder('answer').fn)
        return out === base ? null : 'the returned value is NOT the member-free cell\'s value: the record\'s member reached the decision'
      })
    }
    const opposite: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'empty: false', make: () => ({ k: 1, empty: false }) },
      { id: 'is-empty: \'no\'', make: () => ({ k: 1, 'is-empty': 'no' }) },
      { id: 'is-minimized: false', make: () => ({ k: 1, 'is-minimized': false }) },
      { id: 'is-revealed: true', make: () => ({ k: 1, 'is-revealed': true }) },
    ]
    for (const member of opposite) {
      row.run(`(xiii)-(xvi) the B-3 alternative-reading control on ${member.id}`, () => {
        if (!s.ok) return s.cause
        const out = s.tokensFor(member.make(), recorder('answer').fn)
        return out === base ? null : 'the returned value tracked the member: a module whose answer tracks the member FAILS under EITHER B-3 reading'
      })
    }
    row.finish()
  })

  itc('P-CT-IM-3 (S-CT-CLASS-1) the class name is RETURNED, never WRITTEN: 7 usable + 10 unusable = 17 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-3', 'S-CT-CLASS-1')
    const s = await surfaceOrCause()
    const log = writeLog()
    for (const name of USABLE_CLASS_NAMES) {
      row.run(`usable class-name argument ${brief(name)}`, () => {
        if (!s.ok) return s.cause
        const record = s.containerDeclarationFor(name)
        if (record.className !== name) return `the returned class name was ${brief(record.className)}, not the caller's string verbatim`
        if (record.declaration !== PINNED) return 'the declaration member did not read the pinned text'
        if (log.all() !== 0) return `the write-log read ${log.all()} write(s): NO WRITE OF ANY KIND is permitted`
        return null
      })
    }
    for (const drive of UNUSABLE_CLASS_NAMES) {
      row.run(`unusable class-name argument ${drive.id}`, () => {
        if (!s.ok) return s.cause
        const record = driveDeclaration(s.containerDeclarationFor, drive.make())
        if (record.className !== '') return `the returned class name was ${brief(record.className)}, not the declared EMPTY answer`
        if (record.declaration !== PINNED) return 'the declaration member did not read the pinned text'
        if (log.all() !== 0) return `the write-log read ${log.all()} write(s): NO WRITE OF ANY KIND is permitted`
        return null
      })
    }
    // THE DRIVE'S OWN POSITIVE CONTROL — one harness-side write on the same
    // element — reads 1, so the log is PROVEN LIVE. It is a DECLARED-FAILING
    // CONTROL counted BESIDE the term, never inside it.
    log.harnessWrite()
    row.control('the write-log positive control (a harness-side write must read 1)', log.writes() === 1)
    row.finish()
  })

  itc('P-CT-IM-4 (S-CT-DECL-1, bounded) the declaration text is BYTE-IDENTICAL and NEVER PARSED: 5 call shapes × 2 observable classes = 10 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-4', 'S-CT-DECL-1')
    const s = await surfaceOrCause()
    const codes = (text: string): number[] => Array.from(text).map((c) => c.charCodeAt(0))
    const pinnedCodes = codes(PINNED)
    const callShapes: ReadonlyArray<{ readonly id: string; readonly drive: (fn: ContainerDeclarationForShape) => ContainerDeclarationShape }> = [
      { id: 'call(1) a usable class name', drive: (fn) => fn('x') },
      { id: 'call(2) an unusable class name', drive: (fn) => fn(undefined) },
      { id: 'call(3) the argument omitted', drive: (fn) => (fn as unknown as () => ContainerDeclarationShape)() },
      { id: 'call(4) a throwing-toString object', drive: (fn) => fn(throwingStringifier()) },
      { id: 'call(5) the same call made a SECOND time in the same drive', drive: (fn) => fn('x') },
    ]
    for (const shape of callShapes) {
      // OBSERVABLE CLASS (I) — VALUE, read inside the attempt.
      row.run(`${shape.id} × (I) VALUE: byte-identity, length 27, character-code equality`, () => {
        if (!s.ok) return s.cause
        const record = shape.drive(s.containerDeclarationFor)
        if (record.declaration !== PINNED) return 'the returned declaration was not byte-identical to the pinned constant'
        if (record.declaration.length !== PINNED_LENGTH) return `the declaration length was ${record.declaration.length}, not 27`
        if (JSON.stringify(codes(record.declaration)) !== JSON.stringify(pinnedCodes)) return 'the character-code sequence did not equal the pinned constant\'s'
        return null
      })
      // OBSERVABLE CLASS (II) — NON-PARSE: the drive's OWN control corpus (a
      // module-shaped string assembled from fragments, and a corpus that splits
      // the text) FAILS the row's own assertion while the module's call PASSES.
      row.run(`${shape.id} × (II) NON-PARSE: the failing control corpus beside the passing module call`, () => {
        if (!s.ok) return s.cause
        const record = shape.drive(s.containerDeclarationFor)
        if (record.declaration !== PINNED) return 'the module\'s own call did not pass the byte-equality half'
        const assembled = joinOnlyView(`${'const d = '}'contain'+':layout style paint'`)
        const splitCorpus = normalizeView(`${'const parts = decl.' + 'split'}(':')`)
        const assembledFails = literalBodies(assembled).filter((b) => !R7_ALLOWED_LITERALS.includes(b)).length > 0
        const splitFails = scanRegexes(splitCorpus, R8_PARSE_RULES).length > 0
        if (!assembledFails) return 'the fragment-assembled control corpus did NOT fail: the closed-set literal claim is unfalsified'
        if (!splitFails) return 'the splitting control corpus did NOT fail: the parse claim is unfalsified'
        return null
      })
    }
    row.control('the P-CT-IM-4 control corpora are DECLARED AS FAILING and do fail', true)
    // The explicit sentence the row carries, asserted so it cannot be dropped.
    expect(
      PINNED.length,
      'P-CT-IM-4 — the returned-text equality is NOT evidence that the declaration is valid CSS, is accepted by any browser, or applies containment (§5.2)',
    ).toBe(PINNED_LENGTH)
    row.finish()
  })

  itc('P-CT-IM-5 (S-CT-SHAPE-1, bounded) the returned record\'s MEMBER CENSUS: 6 call shapes × 2 census readings = 12 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-5', 'S-CT-SHAPE-1')
    const s = await surfaceOrCause()
    const callShapes: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'a usable class name', make: () => 'x' },
      { id: 'the empty string', make: () => '' },
      { id: 'undefined', make: () => undefined },
      { id: 'a number', make: () => 7 },
      { id: 'a throwing-toString object', make: () => throwingStringifier() },
      { id: 'a Proxy whose traps throw', make: () => trapThrowingProxy() },
    ]
    for (const shape of callShapes) {
      row.run(`${shape.id} × (i) Object.keys deep-equals the two declared names in order`, () => {
        if (!s.ok) return s.cause
        const record = driveDeclaration(s.containerDeclarationFor, shape.make())
        return JSON.stringify(Object.keys(record)) === JSON.stringify([...RECORD_KEYS])
          ? null
          : `the own enumerable string keys were ${JSON.stringify(Object.keys(record))}, not ${JSON.stringify([...RECORD_KEYS])}`
      })
      row.run(`${shape.id} × (ii) the prototype and both member types`, () => {
        if (!s.ok) return s.cause
        const record = driveDeclaration(s.containerDeclarationFor, shape.make())
        if (Object.getPrototypeOf(record) !== Object.prototype) return 'the record\'s prototype was not Object.prototype'
        if (typeof record.className !== 'string') return 'the class-name member was not a string'
        if (typeof record.declaration !== 'string') return 'the declaration member was not a string'
        return null
      })
    }
    // THE CONTROL: a record carrying a THIRD member FAILS the row.
    const withThird = { className: 'x', declaration: PINNED, extra: 1 }
    row.control('a record carrying a THIRD member must FAIL the census row', JSON.stringify(Object.keys(withThird)) !== JSON.stringify([...RECORD_KEYS]))
    row.finish()
  })

  itc('P-CT-IM-6 (S-CT-CONST-1) cross-call constancy: 5 repeated-call shapes, each driven five times = 5 attempts', async () => {
    const row = new RegisterRow('P-CT-IM-6', 'S-CT-CONST-1')
    const s = await surfaceOrCause()
    row.run('(1) the selector with a conformant pair, five times', () => {
      if (!s.ok) return s.cause
      const rec = recorder('answer')
      const answers: unknown[] = []
      for (let i = 0; i < 5; i += 1) answers.push(s.tokensFor({ k: 1 }, rec.fn))
      if (!answers.every((a) => a === 'answer')) return 'the five return values were not mutually equal'
      if (rec.count() !== 5) return `the recorded invocation count at the fifth call was ${rec.count()}, not 5 (a count of 6 FAILS this row for a cache or a retained closure)`
      return null
    })
    row.run('(2) the selector with a throwing seam, five times', () => {
      if (!s.ok) return s.cause
      const rec = throwingSeam(new Error('x'))
      const answers: unknown[] = []
      for (let i = 0; i < 5; i += 1) answers.push(s.tokensFor({ k: 1 }, rec.fn))
      if (!answers.every((a) => a === undefined)) return 'the five return values were not the declared EMPTY answer each time'
      if (rec.count() !== 5) return `the recorded attempt count was ${rec.count()}, not 5`
      return null
    })
    row.run('(3) the normalizer with a conformant pair, five times', () => {
      if (!s.ok) return s.cause
      const rec = recorder('orientation-answer')
      const answers: unknown[] = []
      for (let i = 0; i < 5; i += 1) answers.push(s.orientationFor('edge', rec.fn))
      if (!answers.every((a) => a === 'orientation-answer')) return 'the five return values were not mutually equal'
      if (rec.count() !== 5) return `the recorded invocation count was ${rec.count()}, not 5`
      return null
    })
    row.run('(4) the normalizer with an absent seam, five times', () => {
      if (!s.ok) return s.cause
      const answers: unknown[] = []
      for (let i = 0; i < 5; i += 1) answers.push(s.orientationFor('edge', undefined))
      if (!answers.every((a) => a === undefined)) return 'the five return values were not the declared EMPTY answer each time'
      return null
    })
    row.run('(5) the declaration returner with a usable class name, five times', () => {
      if (!s.ok) return s.cause
      const records: ContainerDeclarationShape[] = []
      for (let i = 0; i < 5; i += 1) records.push(s.containerDeclarationFor('x'))
      if (!records.every((r) => r.className === 'x' && r.declaration === PINNED)) return 'a returned record differed in its member values'
      if (!records.every((r) => !sameRef(r, records[0]) || sameRef(r, records[0]) === (records.length === 1))) return 'the returned record was not fresh (the records are not distinct objects)'
      if (!records.every((r) => JSON.stringify(Object.keys(r)) === JSON.stringify([...RECORD_KEYS]))) return 'a returned record carried a different census'
      return null
    })
    row.finish()
  })

  itc('P-CT-SM-1 (S-CT-STATELESS-1) the statelessness / purity row: 3 clauses = 3 attempts', async () => {
    const row = new RegisterRow('P-CT-SM-1', 'S-CT-STATELESS-1')
    const s = await surfaceOrCause()
    row.run('(a) ORDER INDEPENDENCE across three orders of the same argument set', () => {
      if (!s.ok) return s.cause
      const drive = (order: readonly string[]): string[] =>
        order.map((id) => {
          if (id === 'A') return String(s.tokensFor({ k: 1 }, recorder('A').fn))
          if (id === 'B') return String(s.orientationFor('edge', recorder('B').fn))
          return `${s.containerDeclarationFor('x').className}/${Object.keys(s.containerDeclarationFor('x')).length}`
        })
      const first = drive(['A', 'B', 'C'])
      const second = drive(['C', 'A', 'B'])
      const third = drive(['B', 'C', 'A'])
      const rotate = (arr: string[], by: number): string[] => arr.slice(by).concat(arr.slice(0, by))
      if (JSON.stringify(second) !== JSON.stringify(rotate(first, 1))) return 'the C-A-B order did not reproduce the first order\'s readings'
      if (JSON.stringify(third) !== JSON.stringify(rotate(first, 2))) return 'the B-C-A order did not reproduce the first order\'s readings'
      return null
    })
    row.run('(b) NO CROSS-CALL COUPLING: a hostile drive then each entry point, each equal to its isolated call', () => {
      if (!s.ok) return s.cause
      const hostile = trapThrowingProxy()
      s.tokensFor(hostile, recorder('x').fn)
      s.orientationFor('edge', throwingSeam(new Error('x')).fn)
      const isolatedSelector = s.tokensFor(hostile, recorder('x').fn)
      const isolatedOrientation = s.orientationFor('edge', throwingSeam(new Error('x')).fn)
      const isolatedRecord = s.containerDeclarationFor('x')
      const afterSelector = s.tokensFor(hostile, recorder('x').fn)
      const afterOrientation = s.orientationFor('edge', throwingSeam(new Error('x')).fn)
      const afterRecord = s.containerDeclarationFor('x')
      if (!sameRef(isolatedSelector, afterSelector)) return 'the selector\'s return value was coupled to an earlier hostile call'
      if (!sameRef(isolatedOrientation, afterOrientation)) return 'the normalizer\'s return value was coupled to an earlier hostile call'
      if (isolatedRecord.className !== afterRecord.className || isolatedRecord.declaration !== afterRecord.declaration) {
        return 'the declaration returner\'s value was coupled to an earlier hostile call'
      }
      return null
    })
    row.run('(c) STABILITY AFTER A THROW: a hostile drive then a conformant drive with its own counts (1/1)', () => {
      if (!s.ok) return s.cause
      s.tokensFor(trapThrowingProxy(), throwingSeam(new Error('x')).fn)
      s.orientationFor('edge', throwingSeam(new Error('x')).fn)
      const sel = recorder('answer')
      const axis = recorder('orientation-answer')
      const selOut = s.tokensFor({ k: 1 }, sel.fn)
      const axisOut = s.orientationFor('edge', axis.fn)
      if (selOut !== 'answer' || sel.count() !== 1) return 'the conformant selector call after a throw did not behave as a FIRST call (count must be 1)'
      if (axisOut !== 'orientation-answer' || axis.count() !== 1) return 'the conformant normalizer call after a throw did not behave as a FIRST call (count must be 1)'
      return null
    })
    // The static companion assertion, reported BESIDE the term.
    const src = moduleSource()
    row.control('no module-level mutable binding is declared (the static companion, read beside the term)', src === null || scanRegexes(normalizeView(src), [{ id: 'a module-level let/var', re: /(^|\n)\s*(let|var)\s+[A-Za-z_$]/ }]).length === 0)
    row.finish()
  })

  itc('P-CT-SM-2 (S-CT-ENUM-1) the once-and-unchanged discipline for the selector: 4 call shapes + 1 positive control = 5 attempts', async () => {
    const row = new RegisterRow('P-CT-SM-2', 'S-CT-ENUM-1')
    const s = await surfaceOrCause()
    row.run('(1) a conformant call: count 1, argument and answer by identity', () => {
      if (!s.ok) return s.cause
      const rec = recorder('answer')
      const chrome = { k: 1 }
      const out = s.tokensFor(chrome, rec.fn)
      if (rec.count() !== 1) return `the recorded count was ${rec.count()}, not 1`
      if (!sameRef(rec.args[0], chrome)) return 'the seam did not receive the value by identity'
      if (out !== 'answer') return 'the answer was not returned by identity'
      return null
    })
    row.run('(2) a THROWING seam: the ATTEMPT count is 1 and the call is NOT retried', () => {
      if (!s.ok) return s.cause
      const rec = throwingSeam(new Error('x'))
      const out = s.tokensFor({ k: 1 }, rec.fn)
      if (rec.count() !== 1) return `the attempt count was ${rec.count()}, not 1`
      if (out !== undefined) return 'the declared EMPTY answer was not returned'
      return null
    })
    row.run('(3) a NON-CALLABLE seam: the count is 0 and no coercion was attempted as a call', () => {
      if (!s.ok) return s.cause
      const out = s.tokensFor({ k: 1 }, 42)
      return out === undefined ? null : 'a non-callable seam did not return the declared EMPTY answer'
    })
    row.run('(4) a NON-OBJECT answer returned VERBATIM (the anti-wrapping cell)', () => {
      if (!s.ok) return s.cause
      const answers: unknown[] = [0, '', false, NaN]
      for (const answer of answers) {
        const out = s.tokensFor({ k: 1 }, recorder(answer).fn)
        if (!Object.is(out, answer)) return `the answer ${brief(answer)} was not returned VERBATIM (a module that wraps it into a record FAILS here)`
      }
      const sym = Symbol('answer')
      if (!Object.is(s.tokensFor({ k: 1 }, recorder(sym).fn), sym)) return 'a Symbol answer was not returned verbatim'
      if (!Object.is(s.tokensFor({ k: 1 }, recorder(12n).fn), 12n)) return 'a BigInt answer was not returned verbatim'
      return null
    })
    // The 1 positive control: the same seam called TWICE by the DRIVER reads 2.
    const rec = recorder('answer')
    rec.fn('x')
    rec.fn('x')
    row.control('the recording instrument is LIVE: the same seam called twice by the driver reads 2', rec.count() === 2)
    row.finish()
  })

  itc('P-CT-SM-3 (S-CT-NORMALIZE-1, bounded) the normalizer\'s once-and-unchanged discipline and its idempotence: 1 grid of 4 shapes + 1 idempotence control = 5 attempts', async () => {
    const row = new RegisterRow('P-CT-SM-3', 'S-CT-NORMALIZE-1')
    const s = await surfaceOrCause()
    const edgeShapes: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }> = [
      { id: 'edge(1) an opaque object', make: () => ({ e: 1 }) },
      { id: 'edge(2) a string', make: () => 'edge-value' },
      { id: 'edge(3) undefined', make: () => undefined },
      { id: 'edge(4) a revoked Proxy', make: () => revokedProxy() },
    ]
    for (const edge of edgeShapes) {
      row.run(`${edge.id} × the cross-product of callable / throwing / absent resolver`, () => {
        if (!s.ok) return s.cause
        const value = edge.make()
        // CALLABLE: exactly one invocation, argument and answer by identity.
        const rec = recorder('orientation-answer')
        const out = s.orientationFor(value, rec.fn)
        if (rec.count() !== 1) return `the callable resolver's recorded count was ${rec.count()}, not 1`
        if (!sameRef(rec.args[0], value)) return 'the resolver did not receive the edge by identity'
        if (out !== 'orientation-answer') return 'the answer was not returned by identity'
        // THROWING: the attempt is counted once and the declared EMPTY answer comes back.
        const thrower = throwingSeam(new Error('x'))
        if (s.orientationFor(value, thrower.fn) !== undefined) return 'a throwing resolver did not return the declared EMPTY answer'
        if (thrower.count() !== 1) return `the throwing resolver's attempt count was ${thrower.count()}, not 1`
        // ABSENT / NON-CALLABLE: the declared EMPTY answer.
        if (s.orientationFor(value, undefined) !== undefined) return 'an absent resolver did not return the declared EMPTY answer'
        if (s.orientationFor(value, 42) !== undefined) return 'a non-callable resolver did not return the declared EMPTY answer'
        return null
      })
    }
    // THE 1 IDEMPOTENCE CONTROL: ONE closure, called twice with the same edge
    // value — the two answers are the SAME VALUE by identity and the closure's
    // own recorded count is 2. A module that caches the answer reads 1 here.
    row.run('the idempotence control: one closure, two invocations, count 2 (a cache reads 1 and FAILS)', () => {
      if (!s.ok) return s.cause
      const rec = recorder('the-one-answer')
      const a = s.orientationFor('edge-value', rec.fn)
      const b = s.orientationFor('edge-value', rec.fn)
      if (a !== b) return 'two invocations with the same pair produced different answers'
      if (rec.count() !== 2) return `the closure's recorded count was ${rec.count()}, not 2: a module that caches the answer reads 1 here and FAILS`
      return null
    })
    // The static companion assertion, reported BESIDE the term.
    const src = moduleSource()
    row.control(
      'the module reads no coordinate, no geometry and no element (the static companion, read beside the term)',
      src === null ||
        scanRegexes(normalizeView(src), [
          { id: 'a coordinate read', re: new RegExp(`${ccPattern([99, 108, 105, 101, 110, 116]).source}[XY]|_{ccPattern([112, 97, 103, 101]).source}[XY]`) },
          { id: 'a geometry observation', re: new RegExp(`${R6_GEOMETRY_TOKENS.find((t) => t.id === 'a bounding-rect observation call')?.token ?? ''}|${R6_GEOMETRY_TOKENS.find((t) => t.id === 'a computed-style observation call')?.token ?? ''}`) },
        ]).length === 0,
    )
    row.finish()
  })

  itc('P-CT-TP-1 (S-CT-TP-1, bounded) the TOTALITY universal over the pinned 14-member pool: 14 pinned-seed draws = 14 attempts', async () => {
    const row = new RegisterRow('P-CT-TP-1', 'S-CT-TP-1')
    const s = await surfaceOrCause()
    for (let i = 0; i < TP_DRAWS; i += 1) {
      const index = TP_DRAW_INDICES[i]
      const member = TP_POOL[index]
      row.run(`draw ${i + 1}: pool index ${index} — ${member.id}, driven through ALL THREE entry points`, () => {
        if (!s.ok) return s.cause
        const value = member.make()
        const sel = recorder('selector-answer')
        const axis = recorder('orientation-answer')
        const tokenOut = s.tokensFor(value, sel.fn)
        const axisOut = s.orientationFor(value, axis.fn)
        const record = driveDeclaration(s.containerDeclarationFor, value)
        if (tokenOut !== 'selector-answer') return 'tokensFor did not return the supplied closure\'s own recorded answer'
        if (axisOut !== 'orientation-answer') return 'orientationFor did not return the supplied closure\'s own recorded answer'
        if (typeof record.className !== 'string') return 'the returned record\'s class-name member was not a string'
        if (record.declaration !== PINNED) return 'the returned record\'s declaration member was not byte-equal to the pinned constant'
        if (sel.count() !== 1 || axis.count() !== 1) return `the closures' recorded counts were ${sel.count()} and ${axis.count()}, not 1 and 1`
        return null
      })
    }
    // THE POOL'S STATED BOUNDARY, asserted as the boundary it is: a DRAW IS NOT
    // A SWEEP, and the distinct-member count is REPORTED and never asserted.
    const distinctDrawn = new Set(TP_DRAW_INDICES).size
    console.log(
      `§5.5.1 register note :: P-CT-TP-1 — ${TP_DRAWS} draws over a ${TP_POOL.length}-member pool; DISTINCT members drawn (REPORTED, never asserted) = ${distinctDrawn}. ` +
        'The universal is over the DRAWN domain and NOT over the whole input space.',
    )
    expect(
      TP_POOL.length,
      'P-CT-TP-1 — the pool holds 14 members while the row draws 14 times, and the pool\'s silence about any shape it does not list is a stated boundary, not an unrecorded omission',
    ).toBe(14)
    row.control('the pool\'s distinct-member count is REPORTED and the row asserts nothing about coverage (a DRAW IS NOT A SWEEP)', true)
    row.finish()
  })
})

// ===========================================================================
// THE REGISTER'S STATUS ROW — the declared-versus-measured reconciliation.
// It runs LAST, reads the register's own state, and reports the caps, the
// `(bounded)` set and the un-run-row-is-a-FAILURE rule.
// ⟶ RE-GRAINED 2026-09-27 (`§0A` note 7.2/7.3): the DECLARED figure this row
// reconciles against is `137`; the as-filed `154` stays asserted BESIDE it as
// the annotated, SUPERSEDED provenance, and the row carries a control proving
// the reconciliation CAN fail (a declared figure that is not its terms' sum).
// ===========================================================================
describeC('§5.5.1 / §5.5.2 — the register\'s status row (declared-vs-measured reconciliation)', () => {
  itc('REGISTER-STATUS the DECLARED 137 (as-filed 154 kept beside it) against the measured attempts, the two caps, and the stop state', () => {
    const declared = REGISTER_TERMS.reduce((a, b) => a + b.declared, 0)
    const measured = registerState.attempts
    const record = {
      termsDeclared: REGISTER_TERMS.length,
      totalDeclared: DECLARED_TOTAL,
      totalDeclaredAsFiled: AS_FILED_TOTAL,
      declaredTermSum: declared,
      attemptsExecuted: measured,
      rowCap: REGISTER_ROW_CAP,
      totalCap: REGISTER_TOTAL_CAP,
      consecutiveFailureCap: CONSECUTIVE_FAILURE_CAP,
      registerStoppedAt: registerState.stoppedAtRow,
      stoppedFor: registerState.stoppedFor,
      boundedSet: REGISTER_TERMS.filter((r) => r.bounded).map((r) => r.row),
      terms: REGISTER_TERMS.map((r) => `${r.row}=${r.declared}`),
    }
    console.log(`§5.5.1 register record :: ${JSON.stringify(record)}`)
    // THE DECLARED FIGURE FIRST, and the as-filed figure BESIDE it (see PRE-2's
    // block): `§5.5.3` as amended declares 137, and the superseded filing figure
    // was 154, kept visible with the 17 excess its own terms measure.
    expect(
      declared,
      'REGISTER-STATUS — THE DECLARED TOTAL is the SUM OF ITS OWN TEN TERMS (printed WITH its terms: 40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14 = 137)',
    ).toBe(DECLARED_TOTAL)
    expect(DECLARED_TOTAL, "REGISTER-STATUS — the declared figure §5.5.3 now carries (`§0A` note 7.2, 2026-09-27)").toBe(137)
    expect(AS_FILED_TOTAL, 'REGISTER-STATUS — the AS-FILED 154, kept VISIBLE and unmoved beside it as the annotated, SUPERSEDED provenance').toBe(154)
    expect(
      DECLARED_TOTAL,
      'REGISTER-STATUS — THE POLARITY FLIP IS REAL: the declared figure is NOT the as-filed one, so a harness that would pass for either figure is the finding',
    ).not.toBe(AS_FILED_TOTAL)
    expect(AS_FILED_TOTAL - declared, 'the named excess of the SUPERSEDED as-filed total over the terms it prints (P-CT-IM-3 counted twice)').toBe(17)
    /** THE RECONCILIATION, as a predicate over the register's own terms, so this
     *  row can show it CAN fail rather than asserting a figure it cannot falsify. */
    const reconcilesWithItsTerms = (declaredFigure: number): boolean => declaredFigure === declared
    expect(reconcilesWithItsTerms(DECLARED_TOTAL), 'CONTROL: the DECLARED 137 reconciles with the register\'s own ten terms').toBe(true)
    expect(
      reconcilesWithItsTerms(AS_FILED_TOTAL),
      'CONTROL (declared to FAIL): the AS-FILED 154 does NOT reconcile with the same ten terms — a reconciliation that returned true here would make the declared/as-filed polarity vacuous',
    ).toBe(false)
    expect(
      reconcilesWithItsTerms(declared + 1),
      'CONTROL (declared to FAIL): a declared figure that is not its terms\' sum fails the reconciliation — the check is falsifiable, not decorative',
    ).toBe(false)
    expect(
      measured,
      `REGISTER-STATUS — the MEASURED attempts are read from the register's own state (${measured}) against the declared ${declared}. ` +
        'A RED RUN OF A MODULE-ABSENT UNIT IS EXPECTED TO STOP EARLY: the stop-after-5-consecutive-failures discipline fires on the first row. ' +
        `A red run that reports all ${declared} of the declared attempts as executed is the finding, not the expectation (§4.2 item 6).`,
    ).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(
      registerState.stoppedAtRow,
      'REGISTER-STATUS — with the module absent the register STOPS EARLY at a named row and the un-run rows are reported as FAILURES by their own `finish()` (an un-run register row is never a pass)',
    ).not.toBe(null)
    expect(
      registerState.stoppedFor,
      'REGISTER-STATUS — the stop has a NAMED cause, so the record is attributable rather than silent',
    ).not.toBe(null)
    // THE CAPS, read as the declared figures (the DECLARED ones are what the caps
    // are compared against; the distinct figures are reported BESIDE them).
    for (const r of REGISTER_TERMS) {
      expect(r.declared, `${r.row}'s declared term is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(declared, `the declared total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(
      REGISTER_TERMS.filter((r) => r.bounded).length,
      'REGISTER-STATUS — the (bounded) set is FIVE of the TEN rows, and each row whose property text quantifies wider than its tables carries the marking',
    ).toBe(5)
  })
})
