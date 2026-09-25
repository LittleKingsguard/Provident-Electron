// tests/layout-projection.test.ts
// ===========================================================================
// U-PROJ · wave D · **THE RED SET** (RCA-1) — ledger row `D4`.
//
// Contract: `docs/specs/projection.md` (FILED + amended + reconciled
// 2026-09-27). The module to be built later is `src/shared/layout-projection.ts`
// — **the ELEVEN exported names of `§2.1`'s block** (FOUR value exports
// `project` · `projectVar` · `applyProjection` · `applyVarsToRoot`, SEVEN type
// declarations `VarValues` · `VarSpec` · `ProjectionSkipReason` ·
// `ProjectionSkip` · `Projection` · `VarWriteSink` · `ApplyResult`; `§2.1`'s
// prose said "Eight" and was RECONCILED, so the ROW — `§3.5 R-22` — asserts SET
// EQUALITY over the eleven, never a count). Binding sections read in full:
// `§0`/`§0A` (the four rulings: `A-11` reuse · `A-2`/`F-4` `'accessor-threw'` ·
// `A-3` `Object.create(null)` · `A-7` unguarded re-entrancy), `§2.1` (every
// export, signature, return shape, skip pattern, the widened/`projectVar`
// clauses), `§2.2` (the six prohibitions), `§2.3` (the write-or-skip rule + the
// malformed-projection/malformed-sink asymmetry), `§2.4` (the projection rule,
// incl. the ruled precedence clauses and the `M-13`/`F-10` boundary), `§2.5`
// (`Object.create(null)` + the freeze clause), `§3.1` (`M-1`..`M-22`), `§3.2`
// (`F-1`..`F-15`), `§3.3` (`I-1`..`I-14`), **`§3.4`/`§3.5` (the static rows
// `R-17`..`R-23`)**, `§4.4` (`S-1`..`S-15`), `§4.1`/`§4.2` (the red set and its
// authoring order — item 4's amendment: **the property layer rides THIS file**),
// `§5.1` (diff scope: this file + the module, nothing else), `§5.2` (legs; a
// node-suite green is **never** assembled-app evidence), `§5.3` (the DONE row,
// incl. item 10), **`§5.5.1` (the typed Property register — all EIGHT rows,
// executed here)**, `§6`, `§7`, **`§7a`/`§7a.1` (the eleven ambiguities and
// their RULINGS — the rulings name the observables this file drives)** and `§8`.
//
// LAYER: **[T] — the repo's node suite against `src/shared/dom-shim.ts` ONLY.**
// No real DOM, no window, no IPC, no assembled app, no rendered geometry, no CSS
// parse claim. The applier's environment is a **caller-supplied FAKE sink**
// (`§2.1`'s `VarWriteSink` is duck-typed); the shim's element carries
// `style: { cssText: string }` and **no `setProperty`**, so no row of this file
// drives it as a sink (§4.3). **A green here is envelope/pure-layer evidence and
// NEVER assembled-app evidence** (Layer declaration anchor 1) — for this unit it
// also proves **nothing** about what a browser does with a value (anchor 2). No
// `[U]` row is taken (`§5.2`'s optional row is precondition-gated and no row
// below depends on it).
//
// THE PROPERTY LAYER IS `§5.5.1`'s REGISTER — **8 rows** (`P-PJ-IM-1`,
// `P-PJ-TP-1`, `P-PJ-IM-2`, `P-PJ-IM-3`, `P-PJ-IM-5`, `P-PJ-IM-6`, `P-PJ-IM-7`,
// `P-PJ-IM-8`), ALL executed **deterministically in this file**: plain vitest,
// hand-authored tables, and ONE hand-rolled 32-bit LCG pinned to the literal
// seed **`20260927`** (`stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`, **ONE
// LCG step per pool draw**, `index = stateₙ₊₁ mod pool.length`; no `next(k)`
// scaling helper, no `Math.random`, no wall-clock seed, no shrinking, no
// adaptive search). **No `fast-check`, no `hypothesis`, no property runner, no
// new dependency** (`package.json`'s `devDependencies` key set stays the five
// keys — `R-20`). The caps are honoured: **≤100 attempts per row, ≤400 attempts
// in total**, rows evaluated sequentially in register order, **STOP AFTER 5
// CONSECUTIVE FAILURES** (the running row's remaining attempts are abandoned and
// no further row starts). Every row logs a record line carrying **row id ·
// strategy id · seed · attemptsRun · held · broken · stoppedEarly · notStarted ·
// registerStoppedAt**, and **a register row that never started FAILS**.
// `P-PJ-IM-1`, `P-PJ-TP-1` and `P-PJ-IM-5` are **`YES (bounded)`** — their
// property text is larger than their enumeration and none of the three is a
// proof of its unbounded universal. The pool is **counted in both rows that draw
// from it** (no deduplication), and **setup is not an attempt**.
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation: `src/shared/layout-projection.ts`
// does not exist, so every clause row, every static row and every register row
// fails on the module-absent boundary. **No `src/**`, `scripts/**`,
// `package.json` or spec file is created or modified by this pass.**
//
// THE IMPORT BOUNDARY (the repo's established technique — a structural type
// plus a **computed** run-time specifier, `tests/slot-host.test.ts:232-283` /
// `tests/mount-invariant-guard.test.ts:105-131`): an `fs` existence probe and a
// run-time-assembled specifier, so Vite cannot fail this whole file's transform
// on an unresolvable import while the module is absent. Every row therefore
// fails as an **ASSERTION** naming the absent module / missing export, never as
// a collection error that would take the whole red set with it. `PRE-1` proves
// the mechanism itself resolves, against an EXISTING module.
//
// AUTHORED ORDER (`§4.2` item 1, as amended 2026-09-27): `I-1`..`I-14`,
// `M-1`..`M-22`, `F-1`..`F-15` (with `F-4A`/`F-4B`), then the `§5.5.1` register
// rows in register order (`P-PJ-IM-1` · `P-PJ-TP-1` · `P-PJ-IM-2` … ·
// `P-PJ-IM-8`), then the seven static/existence rows `R-17`..`R-23`. The
// `describe` blocks below are in that order; NOTHING is renumbered.
// ===========================================================================
import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import type { ShimElement } from '../src/shared/dom-shim.js'

beforeAll(() => {
  installShim()
})

/** `Object.hasOwn`-equivalent membership — the PINNED way to test a
 *  null-prototype record (`§2.1`, `§2.5` item 1: `applied.hasOwnProperty` does
 *  NOT exist on the returned record). Never a truthiness/presence test. */
const hasOwn = Object.prototype.hasOwnProperty
function own<T extends object>(record: T, name: string): boolean {
  return hasOwn.call(record, name)
}

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot
// be imported for its types while it is absent, so the row set carries its own
// declarations; field names, optionality and the skip vocabulary are `§2.1`'s
// block exactly. `R-22(b)` is the row that later asserts the seven TYPE names
// exist in the module itself.
// ===========================================================================
type ProjectionSkipReason =
  | 'missing-value'
  | 'not-a-number'
  | 'accessor-threw'
  | 'negative'
  | 'malformed-spec'
  | 'duplicate-name'
  | 'sink-unusable'
  | 'write-refused'

/** `§2.1`'s closed union — **EIGHT** members since 2026-09-27 (ruling note 2
 *  added `'accessor-threw'`). No ninth member may appear (`S-9`'s class). */
const SKIP_REASONS: readonly ProjectionSkipReason[] = [
  'missing-value',
  'not-a-number',
  'accessor-threw',
  'negative',
  'malformed-spec',
  'duplicate-name',
  'sink-unusable',
  'write-refused',
]

type VarValues = Readonly<Record<string, unknown>>

interface VarSpec {
  readonly name: string
  readonly unit: string
  readonly format?: 'unit' | 'number'
}

interface ProjectionSkip {
  readonly name: string
  readonly reason: ProjectionSkipReason
}

interface Projection {
  readonly applied: Readonly<Record<string, string>>
  readonly skipped: readonly ProjectionSkip[]
}

interface VarWriteSink {
  readonly style: {
    setProperty(name: string, value: string): void
  }
}

interface ApplyResult {
  readonly applied: Readonly<Record<string, string>>
  readonly skipped: readonly ProjectionSkip[]
  readonly ok: boolean
}

type ProjectVarResult = { readonly written: string | null; readonly skip: ProjectionSkip | null }

interface ProjectionSurface {
  project(values: unknown, specOf: unknown): Projection
  projectVar(spec: unknown, value: unknown): ProjectVarResult
  applyProjection(projection: unknown, sink: unknown): ApplyResult
  applyVarsToRoot(projection: unknown, sink: unknown): ApplyResult
}

// ===========================================================================
// THE IMPORT BOUNDARY (§4.1).
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/layout-projection.ts', import.meta.url)
const TEST_SRC = new URL('./layout-projection.test.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'layout-projection.js'].join('/')

type Surface = {
  project: ProjectionSurface['project'] | null
  projectVar: ProjectionSurface['projectVar'] | null
  apply: ProjectionSurface['applyProjection'] | null
  alias: ProjectionSurface['applyVarsToRoot'] | null
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
      project: null,
      projectVar: null,
      apply: null,
      alias: null,
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const project = mod['project']
    const projectVar = mod['projectVar']
    const apply = mod['applyProjection']
    const alias = mod['applyVarsToRoot']
    const missing: string[] = []
    if (typeof project !== 'function') missing.push('project')
    if (typeof projectVar !== 'function') missing.push('projectVar')
    if (typeof apply !== 'function') missing.push('applyProjection')
    if (typeof alias !== 'function') missing.push('applyVarsToRoot')
    surfaceCache =
      missing.length === 0
        ? {
            project: project as ProjectionSurface['project'],
            projectVar: projectVar as ProjectionSurface['projectVar'],
            apply: apply as ProjectionSurface['applyProjection'],
            alias: alias as ProjectionSurface['applyVarsToRoot'],
            mod,
            reason: null,
          }
        : {
            project: null,
            projectVar: null,
            apply: null,
            alias: null,
            mod,
            reason: `§2.1's value exports are not all exported as functions — missing: ${missing.join(', ')}`,
          }
  } catch (e) {
    surfaceCache = {
      project: null,
      projectVar: null,
      apply: null,
      alias: null,
      mod: null,
      reason: `the module does not resolve: ${String(e)}`,
    }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's label, so
 *  the red message is about the absent module/export, never an import type. */
async function surface(label: string): Promise<{
  project: ProjectionSurface['project']
  projectVar: ProjectionSurface['projectVar']
  apply: ProjectionSurface['applyProjection']
  alias: ProjectionSurface['applyVarsToRoot']
  mod: Record<string, unknown>
}> {
  const s = await resolveSurface()
  if (s.project === null || s.projectVar === null || s.apply === null || s.alias === null) {
    expect(
      s.project,
      `RED — U-PROJ red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's project(values, specOf) / applyProjection(projection, sink). [${label}]`,
    ).not.toBe(null)
    throw new Error(`U-PROJ red set — module absent: ${s.reason ?? 'unavailable'} [${label}]`)
  }
  return { project: s.project, projectVar: s.projectVar, apply: s.apply, alias: s.alias, mod: s.mod ?? {} }
}

/** `§2.1`'s `projectVar` — driven on its own by `M-10`. */
async function surfaceVar(label: string): Promise<ProjectionSurface['projectVar']> {
  const s = await surface(label)
  return s.projectVar
}

// ===========================================================================
// §2.2/`§3.4` — the STATIC readers over the module FILE (and, for `R-17`, over
// this unit's own `[T]` fixtures in THIS file).
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-PROJ red set (§4.1): the static rows of §2.2/§3.4/§3.5 read the module file and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return readFileSync(MODULE_SRC, 'utf8')
}

function testSource(): string {
  return readFileSync(TEST_SRC, 'utf8')
}

/** Strip comments while PRESERVING line structure (so a hit's line number is the
 *  real one). String literals are KEPT: a banned realm word inside a string is
 *  still that word in code. Used for the ACCESS scans (`R-18`), never for
 *  `R-17`: the vocabulary scan reads comments as code, by `§4.4 S-12`. */
function stripComments(src: string): string {
  let out = ''
  let i = 0
  let quote: string | null = null
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (quote !== null) {
      out += ch
      if (ch === '\\') {
        out += next ?? ''
        i += 2
        continue
      }
      if (ch === quote) quote = null
      i += 1
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      out += ch
      i += 1
      continue
    }
    if (ch === '/' && next === '/') {
      while (i < src.length && src[i] !== '\n') i += 1
      continue
    }
    if (ch === '/' && next === '*') {
      i += 2
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') out += '\n'
        i += 1
      }
      i += 2
      continue
    }
    out += ch
    i += 1
  }
  return out
}

function staticHits(code: string, re: RegExp): string[] {
  return code
    .split('\n')
    .map((text, index) => ({ index, text }))
    .filter(({ text }) => re.test(text))
    .map(({ index, text }) => `line ${index + 1}: ${text.trim()}`)
}

function expectNoStaticHits(code: string, rules: ReadonlyArray<{ what: string; re: RegExp }>, prefix: string): void {
  for (const { what, re } of rules) {
    const hits = staticHits(code, re)
    expect(hits, `${prefix} — '${what}' must not appear in the module: ${JSON.stringify(hits)}`).toEqual([])
  }
}

// ===========================================================================
// §3.4 R-17 — THE ANTI-EVASION VOCABULARY SCAN (`§2.2` prohibition 1, `S-12`).
//
// `§4.4 S-12` requires the row to be closed against BOTH evasions BEFORE it is
// authored: **token ASSEMBLY** (`'zo' + 'ne'`, a template literal, a token split
// across lines) and **COMMENT-CARRYING** (the vocabulary in a comment rather
// than in code). So the scan runs over a NORMALIZED view:
//   (1) the raw source is scanned for every spelling (comments included — no
//       `stripComments` here);
//   (2) every string-literal VALUE is extracted and the literal VALUES ARE
//       CONCATENATED WITH EACH OTHER, so a spelling spread over `+`-joined
//       literals, over a template literal's parts, or over literals that are
//       never adjacent in the file, still meets its own letters;
//   (3) every IDENTIFIER is extracted and the identifiers are concatenated the
//       same way, so a comment or a name that ASSEMBLES the vocabulary out of
//       language chunks is caught too.
// The BANNED spellings themselves are the DATA this row needs, so this file
// carries them as FRAGMENTS (`§3.4`'s own fixtures) — never as the joined token.
// ===========================================================================
/** `§2.2` prohibition 1's seven spellings, held as fragments so THIS file's raw
 *  bytes never carry one. */
const VOCAB_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['zo', 'ne'],
  ['pa', 'ne'],
  ['t', 'ab'],
  ['re', 'gion'],
  ['tr', 'ack'],
  ['is', 'Empty'],
  ['empty', 'Token'],
]
const VOCAB_WORDS: readonly string[] = VOCAB_FRAGMENTS.map((f) => f.join(''))
const VOCAB_CAMEL: readonly string[] = ['is', 'Empty'].join('') === '' ? [] : [VOCAB_FRAGMENTS[5].join(''), VOCAB_FRAGMENTS[6].join('')]

/** Every quoted `'…'`/`"…"` literal's VALUE and every TEMPLATE literal's
 *  literal PART (a template's `${…}` expressions are scanned in source order,
 *  so a spelling assembled inside its substitutions is not swallowed). Comments
 *  are skipped here — the RAW scan covers comment-carried spellings, `S-12`. */
function stringLiteralValues(src: string): string[] {
  const out: string[] = []
  const skipLine = (from: number): number => {
    let i = from
    while (i < src.length && src[i] !== '\n') i += 1
    return i
  }
  const readQuoted = (from: number, quote: string): { value: string; next: number } => {
    let i = from
    let value = ''
    while (i < src.length && src[i] !== quote) {
      if (src[i] === '\\') {
        value += src[i + 1] ?? ''
        i += 2
        continue
      }
      value += src[i]
      i += 1
    }
    return { value, next: i + 1 }
  }
  const walk = (from: number, stopAtBrace: boolean): { next: number } => {
    let i = from
    while (i < src.length) {
      const ch = src[i]
      if (ch === '/' && src[i + 1] === '/') {
        i = skipLine(i)
        continue
      }
      if (ch === '/' && src[i + 1] === '*') {
        i += 2
        while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i += 1
        i += 2
        continue
      }
      if (ch === '"' || ch === "'") {
        const r = readQuoted(i + 1, ch)
        out.push(r.value)
        i = r.next
        continue
      }
      if (ch === '`') {
        i += 1
        let part = ''
        while (i < src.length) {
          if (src[i] === '\\') {
            part += src[i + 1] ?? ''
            i += 2
            continue
          }
          if (src[i] === '`') {
            i += 1
            break
          }
          if (src[i] === '$' && src[i + 1] === '{') {
            out.push(part)
            part = ''
            i = walk(i + 2, true).next
            continue
          }
          part += src[i]
          i += 1
        }
        out.push(part)
        continue
      }
      if (stopAtBrace && ch === '}') return { next: i + 1 }
      i += 1
    }
    return { next: i }
  }
  walk(0, false)
  return out
}

function identifierChunks(src: string): string[] {
  return src.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) ?? []
}

/** The assembled view of ONE source text: literal values + identifiers,
 *  concatenated so a spelling cannot hide between them. */
function assembledLetters(src: string): string {
  return [...stringLiteralValues(src), ...identifierChunks(src)].join('')
}

/** The violations of one source text: `(1)` a raw spelling anywhere in the bytes
 *  (comments included) and `(2)` a spelling that ASSEMBLES out of the file's
 *  literals/identifiers. Both halves are the `S-12` closure. */
function vocabularyViolations(src: string): string[] {
  const violations: string[] = []
  const raw = src.toLowerCase()
  for (const word of VOCAB_WORDS) {
    if (raw.includes(word.toLowerCase())) violations.push(`RAW occurrence of '${word}' (a comment counts, S-12)`)
  }
  const assembled = assembledLetters(src).toLowerCase()
  for (const word of VOCAB_WORDS) {
    if (assembled.includes(word.toLowerCase())) {
      violations.push(`ASSEMBLED occurrence of '${word}' (token assembly is the SAME violation, S-12)`)
    }
  }
  for (const camel of VOCAB_CAMEL) {
    if (assembled.includes(camel.toLowerCase())) {
      violations.push(`ASSEMBLED occurrence of the camel spelling '${camel}'`)
    }
  }
  return violations
}

/** The positive control's fixture shapes: a module carrying the vocabulary in
 *  each of the three evading forms. Written with the FRAGMENTS so this file does
 *  not itself carry a joined spelling. */
const VOCAB_POSITIVE_CONTROLS: ReadonlyArray<readonly [string, string]> = [
  ['assembled in a string literal', `${'const'} a = "${['zo', 'ne'].join('')}"`],
  ['assembled across a line break', `${'const'} b = "${['pa', 'ne'].join('')}" +\n  "${['t', 'ab'].join('')}"`],
  ['carried in a comment', `/* the ${['re', 'gion'].join('')} ${['tr', 'ack'].join('')} word in a comment */`],
  [
    'assembled in a template literal with substitutions',
    ['const c = `', '${"tr"}', '${"ack"}', '`'].join(''),
  ],
  ['carried as an IDENTIFIER (the camel token itself)', `const isEmpty = true`],
]
/** The negative control: the unit's own legitimate text — the skip members, the
 *  two format tokens and a diagnostic sentence. */
const VOCAB_NEGATIVE_CONTROL =
  `const reasons = ['missing-value', 'not-a-number', 'accessor-threw', 'negative', ` +
  `'malformed-spec', 'duplicate-name', 'sink-unusable', 'write-refused']\n` +
  `const formats = ['unit', 'number']\n// the value's accessor threw while it was being read\n`

// ===========================================================================
// THE FAKE SINKS (§2.3; §2.1's `VarWriteSink`, duck-typed). Every row drives a
// CALLER-SUPPLIED object — the shim's element is never a sink (its `style` has
// no `setProperty`). "Setup is NOT counted" as a register attempt.
// ===========================================================================
type Call = { name: string; value: string }
type RecordingSink = { sink: VarWriteSink; calls: Call[]; styleReads: () => number }

/** A recording + counting sink: `setProperty(name, value)` appends the EXACT
 *  arguments it was handed and returns nothing. */
function recordingSink(): RecordingSink {
  const calls: Call[] = []
  let reads = 0
  const styleTarget = {
    setProperty(name: string, value: string): void {
      calls.push({ name, value })
    },
  }
  const style = new Proxy(styleTarget, {
    get(target, prop, receiver) {
      reads += 1
      return Reflect.get(target, prop, receiver)
    },
  })
  return { sink: { style }, calls, styleReads: () => reads }
}

/** A sink whose `setProperty` throws for the 1-based call indexes in `throwAt`
 *  (and for EVERY call when the array holds every index). */
function throwingSink(throwAt: readonly number[]): RecordingSink {
  const calls: Call[] = []
  let n = 0
  const sink: VarWriteSink = {
    style: {
      setProperty(name: string, value: string): void {
        n += 1
        if (throwAt.includes(n)) throw new Error(`the sink refused write #${n} ('${name}')`)
        calls.push({ name, value })
      },
    },
  }
  return { sink, calls, styleReads: () => 0 }
}

/** The FIVE unusable sink shapes of `P-PJ-TP-1`'s sink axis / `F-6`'s class. */
function unusableSinks(): ReadonlyArray<readonly [string, unknown]> {
  return [
    ['null', null],
    ['undefined', undefined],
    ['a number', 42],
    ['{style:{}} (no setProperty)', { style: {} }],
    ['{style:{setProperty:42}} (not callable)', { style: { setProperty: 42 } }],
  ]
}

/** The FIVE sink shapes of `P-PJ-TP-1`'s cycling sink binding (`SINKS[d mod 5]`):
 *  an unusable, an unusable, a throwing, a counting and a recording fake sink. */
function cyclingSinks(): Array<{ id: string; make: () => RecordingSink | { sink: unknown } }> {
  return [
    { id: 'null sink', make: () => ({ sink: null }) },
    { id: '{style:{}} sink (no callable setProperty)', make: () => ({ sink: { style: {} } }) },
    { id: 'throwing setProperty', make: () => throwingSink([1, 2, 3, 4, 5, 6, 7, 8]) },
    { id: 'counting+recording sink', make: () => recordingSink() },
    { id: 'recording sink', make: () => recordingSink() },
  ]
}

// ===========================================================================
// §2.5/`§7a.1` item 9 — THE FOUR PINNED OBSERVABLES of an immutable projection.
// NEVER a `JSON.stringify` round-trip: a null-prototype record holding an own
// `'__proto__'` cannot be round-tripped through `JSON.parse` (`§2.5` item 4).
// ===========================================================================
type ProjectionSnapshot = {
  keys: readonly string[]
  values: ReadonlyArray<readonly [string, string | undefined]>
  skipped: readonly ProjectionSkip[]
  protoIsNull: boolean
}

function projectSnapshot(p: { applied: unknown; skipped: unknown }): ProjectionSnapshot {
  const applied = p.applied as Record<string, unknown>
  const keys = Object.keys(applied)
  return {
    keys,
    values: keys.map((name) => [name, own(applied, name) ? String(applied[name]) : undefined] as const),
    skipped: (p.skipped as readonly ProjectionSkip[]).map((s) => ({ name: s.name, reason: s.reason })),
    protoIsNull: Object.getPrototypeOf(applied) === null,
  }
}

/** `I-14`/`F-15`: the four observables, before vs after. Returns the break causes
 *  (empty ⇒ the row held). */
function immutabilityBreaks(
  before: ProjectionSnapshot,
  after: ProjectionSnapshot,
  fresh: ProjectionSnapshot,
  label: string,
): string[] {
  const breaks: string[] = []
  if (JSON.stringify(asPlain(before.keys)) !== JSON.stringify(asPlain(after.keys))) {
    breaks.push(`${label}: Object.keys(p.applied) CHANGED order/set — ${JSON.stringify(asPlain(after.keys))}`)
  }
  if (JSON.stringify(asPlain(before.values)) !== JSON.stringify(asPlain(after.values))) {
    breaks.push(`${label}: an applied VALUE changed — ${JSON.stringify(asPlain(after.values))}`)
  }
  if (JSON.stringify(asPlain(before.skipped)) !== JSON.stringify(asPlain(after.skipped))) {
    breaks.push(`${label}: p.skipped changed — ${JSON.stringify(asPlain(after.skipped))}`)
  }
  if (!after.protoIsNull) breaks.push(`${label}: Object.getPrototypeOf(p.applied) is NOT null after the call`)
  if (JSON.stringify(asPlain(after.keys)) !== JSON.stringify(asPlain(fresh.keys))) {
    breaks.push(`${label}: the AFTER snapshot differs from a FRESH project(values, specOf) result (I-4)`)
  }
  return breaks
}

/** A prototype-free, JSON-comparable view of a snapshot part: the comparison runs
 *  on VALUES, never through a `JSON.stringify` round-trip of the record itself. */
function asPlain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value))
}

function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}

function brief(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value)
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return '<function>'
  if (typeof value === 'bigint') return `${String(value)}n`
  try {
    return JSON.stringify(value) ?? String(value)
  } catch {
    return String(value)
  }
}

/** One call that MUST NOT throw (`§2.1`'s universal, `I-7`/`I-4`). */
function drive(fn: () => unknown, label: string): unknown {
  let out: unknown = undefined
  let thrown: unknown = null
  try {
    out = fn()
  } catch (e) {
    thrown = e
  }
  expect(
    thrown,
    `${label} — §2.1/§3.3 I-7: NEITHER half throws, for any input (it threw: ${describeThrown(thrown)})`,
  ).toBe(null)
  return out
}

/** The `Projection` shape check of `§2.1`: `applied` a record, `skipped` an
 *  array of `{name, reason}`, a null prototype on `applied`, every reason in the
 *  DECLARED eight-member union (no ninth), `I-9`'s string half, and `I-1`'s
 *  partition over `Object.keys`/`skipped`. */
function asProjection(value: unknown, label: string): Projection {
  expect(value !== null && typeof value === 'object', `${label} — §2.1: project() returns a Projection object`).toBe(true)
  const p = value as Projection
  expect(p.applied !== null && typeof p.applied === 'object', `${label} — §2.1: Projection.applied is a record`).toBe(true)
  expect(Array.isArray(p.skipped), `${label} — §2.1: Projection.skipped is an array`).toBe(true)
  expect(
    Object.getPrototypeOf(p.applied),
    `${label} — §2.5 item 1 / I-13: Projection.applied is built on Object.create(null)`,
  ).toBe(null)
  for (const entry of p.skipped) {
    expect(entry !== null && typeof entry === 'object', `${label} — §2.1: a skip is a {name, reason} record`).toBe(true)
    expect(
      SKIP_REASONS.includes(entry.reason),
      `${label} — §2.1/S-9: the skip reason '${String(entry.reason)}' is one of the EIGHT declared members`,
    ).toBe(true)
    expect(typeof entry.name, `${label} — §2.1: ProjectionSkip.name is a string`).toBe('string')
  }
  const appliedNames = Object.keys(p.applied)
  for (const name of appliedNames) {
    const v = p.applied[name]
    expect(typeof v, `${label} — I-9: the applied value for '${name}' is a STRING`).toBe('string')
    expect(
      v === 'NaN' || v === 'Infinity' || v === '-Infinity',
      `${label} — I-9: no applied value EQUALS 'NaN'/'Infinity'/'-Infinity' (got ${brief(v)} for '${name}')`,
    ).toBe(false)
    expect(
      p.skipped.some((s) => s.name === name),
      `${label} — I-1: '${name}' is in applied AND in skipped (the partition forbids both)`,
    ).toBe(false)
  }
  return p
}

/** The `ApplyResult` shape check of `§2.1`: the three declared fields,
 *  `ok === (skipped.length === 0)` (`I-10`, over the result's OWN emitted list),
 *  no ninth reason, a null-prototype `applied`, and `I-9`'s string half. */
function asApplyResult(value: unknown, label: string): ApplyResult {
  expect(value !== null && typeof value === 'object', `${label} — §2.1: applyProjection() returns an ApplyResult`).toBe(true)
  const r = value as ApplyResult
  expect(p.applied !== null && typeof r.applied === 'object', `${label} — §2.1: ApplyResult.applied is a record`).toBe(true)
  expect(Array.isArray(r.skipped), `${label} — §2.1: ApplyResult.skipped is an array`).toBe(true)
  expect(
    Object.getPrototypeOf(r.applied),
    `${label} — §2.5 item 1: ApplyResult.applied is built on Object.create(null)`,
  ).toBe(null)
  expect(
    r.ok,
    `${label} — §3.3 I-10: ok === (skipped.length === 0) over the RESULT'S OWN emitted list; got ok=${String(
      r.ok,
    )} with skipped.length=${r.skipped.length}`,
  ).toBe(r.skipped.length === 0)
  for (const entry of r.skipped) {
    expect(
      entry !== null && typeof entry === 'object',
      `${label} — §2.1: an ApplyResult skip is a {name, reason} record`,
    ).toBe(true)
    expect(
      SKIP_REASONS.includes(entry.reason),
      `${label} — §2.1/S-9: the reason '${String(entry.reason)}' is one of the EIGHT declared members`,
    ).toBe(true)
  }
  for (const name of Object.keys(r.applied)) {
    expect(typeof r.applied[name], `${label} — I-9: the applied value for '${name}' is a STRING`).toBe('string')
  }
  return r
}

function skipOf(p: { skipped: readonly ProjectionSkip[] }, name: string): ProjectionSkip | undefined {
  return p.skipped.find((s) => s.name === name)
}

/** A **null-prototype** expected record, built key by key through
 *  `Object.defineProperty`. A plain object literal cannot hold an own
 *  `'__proto__'` key at all (the PARSER handles it as a prototype setter —
 *  `§2.5` item 4), so every expectation over a dangerous name is built here.
 *  `toEqual` ignores prototypes, so this is the `applied`-record comparison. */
function expectedRecord(pairs: ReadonlyArray<readonly [string, string]>): Record<string, string> {
  const out = Object.create(null) as Record<string, string>
  for (const [name, value] of pairs) {
    Object.defineProperty(out, name, { value, enumerable: true, configurable: true, writable: true })
  }
  return out
}

// ===========================================================================
// §3.3 I-14/§4.4 S-11 — the no-re-entrancy-guard clause: a nested call is never
// refused, and a guard cannot exist because it would be STATE.
// ===========================================================================
function guardShapedExport(mod: Record<string, unknown>): string[] {
  return Object.keys(mod).filter((k) => /re-?entr|guard|lock|busy|depth|active/i.test(k))
}

// ===========================================================================
// PRE-1..PRE-3 — HARNESS PRECONDITIONS (not spec rows). The instruments every
// row depends on, asserted so a red row cannot be a harness artefact.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['mountEl']).toBe('function')
    const cast = mod['mountEl'] as unknown as () => ShimElement
    const el = cast()
    expect(Array.isArray(el.children), 'the shim surface is reachable through the boundary technique (§4.1)').toBe(true)
    expect(
      own(mountEl(), 'style') && !('setProperty' in (mountEl().style as Record<string, unknown>)),
      'PRE-1 / Layer anchor 2: the shim element carries `style: {cssText}` and NO setProperty — which is why every row drives a caller-supplied fake sink',
    ).toBe(true)
  })

  it('PRE-2 (harness) — the §5.5.1 register tables are the ones the spec specifies (sizes, seed, arithmetic)', () => {
    const arithmetic: Record<string, number> = {
      'P-PJ-IM-1': DECISION_CLASSES.length,
      'P-PJ-TP-1': TP_DRAWS,
      'P-PJ-IM-2': DANGEROUS_NAMES.length * OWNKEY_HOST_SHAPES.length + OWNKEY_FIXED_SHAPES.length,
      'P-PJ-IM-3': ACCESSOR_VARIANTS.length * ACCESSOR_POSITIONS.length * ACCESSOR_DISPOSITIONS.length,
      'P-PJ-IM-5': NUMERIC_TABLE.length * NUMERIC_FORMATS.length,
      'P-PJ-IM-6': 4 + 4 + 5 + 3,
      'P-PJ-IM-7': THROW_TABLE.length * THROW_DRIVES.length,
      'P-PJ-IM-8': REUSE_SHAPES.length,
    }
    // ⟶ FINDING (REPORTED, NEVER FIXED): `§5.5.1`'s "Attempt arithmetic" block states
    // a TOTAL of `239` and lists eight terms — `23 + 60 + 22 + 36 + 52 + 16 + 12 +
    // 10` — which sum to `231`, not `239`. The block contradicts ITSELF, and this
    // row cannot assert both. It asserts the terms `§5.5.1` STATES (each row's own
    // count, and the derived sum of those terms), so a table that drifts from its
    // specification row STILL fails — and the `239`-vs-`231` contradiction is
    // reported to the supervisor as a spec defect rather than hardened into a
    // green. No term is adjusted to reach the stated total.
    expect(arithmetic['P-PJ-IM-1'], "P-PJ-IM-1's attempts: the 23-drive decision table").toBe(23)
    expect(arithmetic['P-PJ-TP-1'], "P-PJ-TP-1's attempts: 60 pinned-seed draws").toBe(60)
    expect(arithmetic['P-PJ-IM-2'], "P-PJ-IM-2's attempts: 6×3 + 4").toBe(22)
    expect(arithmetic['P-PJ-IM-3'], "P-PJ-IM-3's attempts: 3×4×3").toBe(36)
    expect(arithmetic['P-PJ-IM-5'], "P-PJ-IM-5's attempts: 26×2").toBe(52)
    expect(arithmetic['P-PJ-IM-6'], "P-PJ-IM-6's attempts: 4 + 4 + 5 + 3").toBe(16)
    expect(arithmetic['P-PJ-IM-7'], "P-PJ-IM-7's attempts: 3×4").toBe(12)
    expect(arithmetic['P-PJ-IM-8'], "P-PJ-IM-8's attempts: the 10 reuse/re-entrancy shapes").toBe(10)
    const total = Object.values(arithmetic).reduce((a, b) => a + b, 0)
    expect(
      total,
      `the register total is the SUM of §5.5.1's own eight terms (23+60+22+36+52+16+12+10 = 231); ` +
        `§5.5.1's stated '239' does not equal its own terms and is REPORTED as a spec contradiction, never asserted green`,
    ).toBe(231)
    for (const [row, n] of Object.entries(arithmetic)) {
      expect(n, `${row} is inside the <=${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(total, `the register total is inside the <=${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(SEED, 'the seed is the pinned literal §5.5.1 names').toBe(20260927)
    expect(LCG_A, 'the LCG multiplier is the pinned literal').toBe(1664525)
    expect(LCG_C, 'the LCG increment is the pinned literal').toBe(1013904223)
    expect(LCG_MOD, 'the LCG modulus is 2^32').toBe(4294967296)
    // The first three STATES recomputed from the literals, so a later edit of a
    // constant reddens HERE…
    const s1 = (SEED * LCG_A + LCG_C) % LCG_MOD
    const s2 = (s1 * LCG_A + LCG_C) % LCG_MOD
    const s3 = (s2 * LCG_A + LCG_C) % LCG_MOD
    const lcg = makeLcg(SEED)
    expect([lcg.step(), lcg.step(), lcg.step()], 'the first three LCG states from seed 20260927').toEqual([s1, s2, s3])
    // …and the first three pool indices, so the ONE-STEP-PER-DRAW form is pinned.
    expect(TP_DRAWS, 'P-PJ-TP-1 draws 60 times over the 20-shape pool').toBe(60)
    expect(TP_POOL.length, "§5.5.1 P-PJ-TP-1's pool holds the 20 named shapes").toBe(20)
    expect(new Set(TP_POOL.map((s) => s.id)).size, 'the 20 pool shapes are distinct').toBe(20)
    expect(TP_DRAW_INDICES.length, 'the 60 draws are materialised as indices').toBe(TP_DRAWS)
    expect(
      TP_DRAW_INDICES.slice(0, 3),
      'one LCG step per draw: the first three pool indices are state(1..3) mod 20 (NO next(k) scaling helper)',
    ).toEqual([s1 % TP_POOL.length, s2 % TP_POOL.length, s3 % TP_POOL.length])
    expect(
      TP_DRAW_INDICES.every((i) => Number.isInteger(i) && i >= 0 && i < TP_POOL.length),
      'every drawn index is a valid pool index (state mod pool.length)',
    ).toBe(true)
    expect(TP_HALVES.length, 'the two-halves binding axis holds both halves').toBe(2)
    expect(TP_SINKS.length, 'the sink binding axis holds the five sink shapes (SINKS[d mod 5])').toBe(5)
  })

  it('PRE-3 (harness) — the R-17 scan detects BOTH evasions and passes the legitimate text (its own controls)', () => {
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `PRE-3 / §4.4 S-12 — the vocabulary scan MUST fail for a module carrying the vocabulary ${shape}: the row is otherwise UNFALSIFIED and must not be filed`,
      ).toBeGreaterThan(0)
    }
    expect(
      vocabularyViolations(VOCAB_NEGATIVE_CONTROL),
      "PRE-3 — the unit's own legitimate text (the eight skip members, the two format tokens, a diagnostic sentence) PASSES the scan",
    ).toEqual([])
    expect(
      rawSpellingViolations(VOCAB_NEGATIVE_CONTROL),
      'PRE-3 — a comment that names no consumer vocabulary is not a violation',
    ).toEqual([])
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER'S EXECUTION MACHINERY.
// Caps (uniform for the whole register): <=100 attempts per row, <=400 attempts
// in total, rows evaluated sequentially in register order, STOP AFTER 5
// CONSECUTIVE FAILURES (the running row's remaining attempts are abandoned and
// no further row starts). Each row's `it` title carries its row id AND its
// strategy id, and each row logs its own record line so the audit can read
// attempts-run / held / broken / notStarted per row from the output.
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
      this.causes.push(`the <=\${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the <=\${REGISTER_TOTAL_CAP}-attempts register cap was reached`
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

  /** The row's verdict + its `§5.3` item 10 record line. An un-run row FAILS on
   *  purpose: a register row that never started may not look green. */
  finish(): void {
    const record: RowRecord = {
      row: this.row,
      strategy: this.strategy,
      seed: SEED,
      attemptsRun: this.attemptsRun,
      held: this.held,
      broken: this.broken,
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
        `${line} — this row NEVER STARTED: the register's stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures ` +
          `discipline triggered at row ${registerState.stoppedAtRow ?? 'an earlier row'} (${
            registerState.stoppedFor ?? 'cause unrecorded'
          }). An un-run register row is reported as a FAILURE, never as a pass (§5.5.1 strategy item 3).`,
      ).toBeGreaterThan(0)
      return
    }
    expect(
      this.broken,
      `${line} — RED (§5.5.1): ${this.broken} of ${this.attemptsRun} attempts BROKE. First causes: ${JSON.stringify(
        this.causes.slice(0, 3),
      )}`,
    ).toBe(0)
  }
}

/** `S-PJ-SEED-1`'s generator: a hand-rolled 32-bit LCG whose constants are
 *  literals in THIS file. `stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`,
 *  **ONE step per draw**; the pool index is `stateₙ₊₁ mod pool.length`. No
 *  `Math.random`, no wall-clock seed, no shrinking, no adaptive search and NO
 *  `next(k)` scaling helper (`§5.5.1` strategy item 2). */
function makeLcg(seed: number): { step: () => number } {
  let state = seed >>> 0
  return {
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}

// ===========================================================================
// §3.3 — I-1..I-14, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — applied and skipped PARTITION the spec key set: no key in both, every entry in exactly one', async () => {
    const { project } = await surface('I-1')
    for (const c of DECISION_CLASSES) {
      const p = asProjection(drive(() => project(c.values, c.specOf), `I-1 class ${c.id}`), `I-1 class ${c.id}`)
      const appliedNames = Object.keys(p.applied)
      const skippedNames = p.skipped.map((s) => s.name)
      for (const name of appliedNames) {
        expect(
          skippedNames.includes(name),
          `I-1 class ${c.id}: '${name}' is in BOTH applied and skipped — the partition forbids it`,
        ).toBe(false)
      }
      expect(
        appliedNames.length + p.skipped.length,
        `I-1 class ${c.id}: every spec entry contributes EXACTLY ONE decision (applied ∪ skipped)`,
      ).toBe(c.entries)
      expect(
        new Set(skippedNames).size,
        `I-1 class ${c.id}: a skipped name appears at most once (each skipped key carries exactly ONE reason)`,
      ).toBe(skippedNames.length)
      expect(
        new Set(appliedNames).size,
        `I-1 class ${c.id}: an applied name appears at most once (§2.4 item 5 — each name once)`,
      ).toBe(appliedNames.length)
    }
    // …and over `'__proto__'`'s sibling dangerous names, where a plain-object
    // record would silently drop the key from `Object.keys` (I-12/I-13).
    for (const name of DANGEROUS_NAMES) {
      const p = asProjection(
        drive(() => project({ k: 1 }, { k: { name, unit: '' } }), `I-1 dangerous name ${name}`),
        `I-1 dangerous name ${name}`,
      )
      expect(own(p.applied, name), `I-1/I-12: '${name}' is an OWN key of applied`).toBe(true)
      expect(Object.keys(p.applied), `I-1/I-12: '${name}' appears in Object.keys(applied)`).toEqual([name])
      expect(p.skipped, `I-1: '${name}' is in NO skipped entry`).toEqual([])
    }
  })

  it('I-2 §3.3 — a key never VANISHES between the halves (well-formed projections; the sink decides every key)', async () => {
    const { project, apply } = await surface('I-2')
    const cases: Array<{ id: string; p: Projection }> = [
      { id: 'M-1 (one key, one write)', p: project({ w: 320 }, { w: { name: '--app-width', unit: 'px' } }) },
      {
        id: 'F-3/F-5/F-4A (a mixed 3-key spec)',
        p: project({ a: 1, b: NaN, c: '12' }, { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } }),
      },
      { id: 'M-12 (an empty projection)', p: project({}, {}) },
      {
        id: 'F-2 (a duplicate name)',
        p: project({ a: 1 }, { a: { name: '--dup', unit: 'px' }, b: { name: '--dup', unit: 'px' } }),
      },
    ]
    const sinks: Array<readonly [string, () => unknown]> = [
      ['a recording sink', () => recordingSink().sink],
      ['a throwing sink (F-7)', () => throwingSink([2]).sink],
      ['an unusable sink (F-6 — fully inside I-2’s domain: it DECIDES every key)', () => null],
    ]
    for (const c of cases) {
      for (const [sid, makeSink] of sinks) {
        const r = asApplyResult(drive(() => apply(c.p, makeSink()), `I-2 ${c.id} × ${sid}`), `I-2 ${c.id} × ${sid}`)
        const before = [...Object.keys(c.p.applied), ...c.p.skipped.map((s) => s.name)].sort()
        const after = [...Object.keys(r.applied), ...r.skipped.map((s) => s.name)].sort()
        expect(after, `I-2 ${c.id} × ${sid}: every key of Projection.applied ∪ Projection.skipped is covered`).toEqual(before)
        expect(
          new Set(after).size,
          `I-2 ${c.id} × ${sid}: no key is DOUBLE-decided across the two halves`,
        ).toBe(after.length)
      }
    }
  })

  it('I-3 §3.3 — a key is in ApplyResult.applied IFF setProperty was called with it, at most once per key per call', async () => {
    const { project, apply } = await surface('I-3')
    const p = project(
      { a: 1, b: 2, c: 3, d: 4 },
      {
        a: { name: '--a', unit: 'px' },
        b: { name: '--b', unit: 'px' },
        c: { name: '--c', unit: 'px' },
        d: { name: '--d', unit: 'px' },
      },
    )
    const sinks: Array<readonly [string, () => RecordingSink]> = [
      ['a clean sink', () => recordingSink()],
      ['a sink that refuses key 2', () => throwingSink([2])],
      ['a sink that refuses every key', () => throwingSink([1, 2, 3, 4])],
    ]
    for (const [sid, make] of sinks) {
      const rec = make()
      const r = asApplyResult(drive(() => apply(p, rec.sink), `I-3 ${sid}`), `I-3 ${sid}`)
      const logged = rec.calls.map((c) => c.name).sort()
      const reported = Object.keys(r.applied).sort()
      expect(reported, `I-3 ${sid}: ApplyResult.applied === the keys setProperty was CALLED with`).toEqual(logged)
      for (const name of Object.keys(p.applied)) {
        const n = rec.calls.filter((c) => c.name === name).length
        expect(n, `I-3 ${sid}: setProperty is called AT MOST ONCE for '${name}' per call (got ${n})`).toBeLessThanOrEqual(1)
      }
      for (const s of r.skipped) {
        expect(
          own(r.applied, s.name),
          `I-3 ${sid}: '${s.name}' is skipped (${s.reason}) AND reported in applied — a false applied`,
        ).toBe(false)
      }
    }
  })

  it('I-4 §3.3 — project is referentially DETERMINISTIC: two calls with deep-equal arguments agree on every observable', async () => {
    const { project } = await surface('I-4')
    for (const c of DECISION_CLASSES) {
      const first = asProjection(drive(() => project(c.values, c.specOf), `I-4 class ${c.id} (first)`), `I-4 ${c.id}`)
      const second = asProjection(drive(() => project(c.values, c.specOf), `I-4 class ${c.id} (second)`), `I-4 ${c.id}`)
      const a = projectSnapshot(first)
      const b = projectSnapshot(second)
      expect(b.keys, `I-4 class ${c.id}: the same key ORDER on a second call (purity)`).toEqual(a.keys)
      expect(b.values, `I-4 class ${c.id}: the same VALUES on a second call`).toEqual(a.values)
      expect(b.skipped, `I-4 class ${c.id}: the same skipped entries on a second call`).toEqual(a.skipped)
      expect(b.protoIsNull, `I-4 class ${c.id}: the same null prototype on a second call`).toBe(true)
    }
    // The purity half against a re-read accessor: the throwing variant throws on
    // EVERY read, so the second call must agree (F-12's repeat-call clause).
    const throws = (): unknown => {
      throw new Error('hostile')
    }
    const values: Record<string, unknown> = { k1: 1 }
    Object.defineProperty(values, 'k2', { get: throws, enumerable: true, configurable: true })
    const specOf = { k1: { name: '--k1', unit: 'px' }, k2: { name: '--k2', unit: 'px' } }
    const r1 = projectSnapshot(project(values, specOf))
    const r2 = projectSnapshot(project(values, specOf))
    expect(r2, 'I-4 with a THROWING accessor: a repeat call is deep-equal (the accessor throws every time)').toEqual(r1)
  })

  it('I-5 §3.3 — neither half retains a reference: mutating the caller’s objects afterwards changes no result', async () => {
    const { project, apply } = await surface('I-5')
    const values: Record<string, unknown> = { a: 1, b: 2 }
    const specOf: Record<string, unknown> = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }
    const p = asProjection(project(values, specOf), 'I-5 project')
    const beforeP = projectSnapshot(p)
    const rec = recordingSink()
    const r = asApplyResult(apply(p, rec.sink), 'I-5 apply')
    const beforeR = projectSnapshot(r)
    // The caller mutates EVERYTHING it handed in (values, spec entries, the sink's log).
    values['a'] = 999
    ;(specOf['a'] as Record<string, unknown>)['unit'] = 'MUTATED'
    rec.calls.length = 0
    ;(rec.sink as { style: unknown }).style = { setProperty: () => undefined }
    expect(projectSnapshot(p), 'I-5: the projection is unchanged by a later mutation of the caller’s values/spec').toEqual(beforeP)
    expect(projectSnapshot(r), 'I-5: the ApplyResult is unchanged by a later mutation of the sink').toEqual(beforeR)
  })

  it('I-6 §3.3 — the applier reads NOTHING from the sink but the callability of style.setProperty', async () => {
    const { project, apply } = await surface('I-6')
    const p = project({ a: 1 }, { a: { name: '--a', unit: 'px' } })
    let valueReads = 0
    const sink: VarWriteSink = {
      style: {
        getPropertyValue(): string {
          valueReads += 1
          return 'stale'
        },
        get cssText(): string {
          valueReads += 1
          return '--a: 1px'
        },
        setProperty(): void {
          /* the ONE method the applier may call */
        },
      } as unknown as VarWriteSink['style'],
    }
    const r = asApplyResult(drive(() => apply(p, sink), 'I-6'), 'I-6')
    expect(r.ok, 'I-6: the write succeeded — the applier did not need a read to decide').toBe(true)
    expect(
      valueReads,
      'I-6/§2.3 item 5: the applier is BLIND to the sink’s prior state — it never reads a current value back (a getter that counts reads records 0)',
    ).toBe(0)
  })

  it('I-7 §3.3 — NEITHER half throws, for any of the deterministic totality table’s inputs', async () => {
    const { project, apply } = await surface('I-7')
    const sinks: Array<readonly [string, unknown]> = [
      ['a recording sink', recordingSink().sink],
      ['a throwing sink', throwingSink([1, 2, 3]).sink],
      ...(unusableSinks() as unknown as Array<readonly [string, unknown]>),
    ]
    for (const c of DECISION_CLASSES) {
      const p = drive(() => project(c.values, c.specOf), `I-7 class ${c.id} project`)
      expect(p !== null && typeof p === 'object', `I-7 class ${c.id}: project returns a value, never throws`).toBe(true)
      for (const [sid, sink] of sinks) {
        const r = drive(() => apply(p, sink), `I-7 class ${c.id} × ${sid}`)
        expect(r !== null && typeof r === 'object', `I-7 class ${c.id} × ${sid}: applyProjection returns a value`).toBe(true)
      }
    }
    // The projection argument's own malformed shapes (M-11) and a hand-built one.
    for (const [id, malformed] of [
      ['null', null],
      ['undefined', undefined],
      ['a string', 'nope'],
      ['a number', 42],
    ] as Array<readonly [string, unknown]>) {
      drive(() => apply(malformed, recordingSink().sink), `I-7 non-record projection (${id})`)
    }
  })

  it('I-8 §3.3 — every returned record/array is FRESH: mutating one result cannot change another', async () => {
    const { project, apply } = await surface('I-8')
    const values = { a: 1, b: 2 }
    const specOf = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }
    const p1 = asProjection(project(values, specOf), 'I-8 p1')
    const p2 = asProjection(project(values, specOf), 'I-8 p2')
    expect(p1 === p2, 'I-8: two project() calls return DIFFERENT objects').toBe(false)
    expect(p1.applied === p2.applied, 'I-8: two calls return different applied records').toBe(false)
    expect(p1.skipped === p2.skipped, 'I-8: two calls return different skipped arrays').toBe(false)
    const r1 = asApplyResult(apply(p1, recordingSink().sink), 'I-8 r1')
    const r2 = asApplyResult(apply(p1, recordingSink().sink), 'I-8 r2')
    expect(r1 === r2, 'I-8: two applyProjection() calls return DIFFERENT results').toBe(false)
    expect(r1.applied === r2.applied, 'I-8: the two results do not ALIAS one another’s record').toBe(false)
    expect(r1.skipped === r2.skipped, 'I-8: the two results do not alias one another’s skipped array').toBe(false)
    ;(r1.applied as Record<string, string>)['a'] = 'MUTATED'
    ;(r1.applied as Record<string, string>)['injected'] = 'MUTATED'
    expect(Object.keys(r2.applied).sort(), 'I-8: mutating r1.applied does not touch r2').toEqual(['--a', '--b'])
    expect(Object.keys(p1.applied).sort(), 'I-8: mutating r1.applied does not touch the projection').toEqual(['--a', '--b'])
  })

  it('I-9 §3.3 — every applied value is a STRING, and no applied value equals NaN/Infinity/-Infinity', async () => {
    const { project, apply } = await surface('I-9')
    for (const c of DECISION_CLASSES) {
      const p = asProjection(drive(() => project(c.values, c.specOf), `I-9 class ${c.id}`), `I-9 class ${c.id}`)
      for (const name of Object.keys(p.applied)) {
        const v = p.applied[name]
        expect(typeof v, `I-9 class ${c.id}: applied['${name}'] is a string`).toBe('string')
        expect(
          v === 'NaN' || v === 'Infinity' || v === '-Infinity',
          `I-9 class ${c.id}: applied['${name}'] EQUALS '${v}', one of the three retired non-finite literals`,
        ).toBe(false)
      }
    }
    // The numeric table is the exhaustive half (`F-4A`/`F-5`/`M-16`/`M-17`).
    for (const entry of NUMERIC_TABLE) {
      const p = asProjection(
        drive(() => project({ k: entry.value }, { k: { name: '--n', unit: 'px' } }), `I-9 ${entry.id}`),
        `I-9 ${entry.id}`,
      )
      for (const v of Object.values(p.applied)) {
        expect(
          v === 'NaN' || v === 'Infinity' || v === '-Infinity',
          `I-9 ${entry.id}: no applied value equals one of the three non-finite literals (got ${brief(v)})`,
        ).toBe(false)
      }
    }
    // The applier half: `F-10`'s coercion produces strings for the primitive
    // half, so no result value carries a non-finite literal either.
    const hand = { applied: { '--a': 12 } as unknown as Record<string, string>, skipped: [] as ProjectionSkip[] }
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(hand, rec.sink), 'I-9 F-10 drive'), 'I-9 F-10 drive')
    expect(rec.calls, 'I-9/F-10: the sink received the COERCED string').toEqual([{ name: '--a', value: '12' }])
    expect(Object.values(r.applied), 'I-9: the result’s applied values are strings').toEqual(['12'])
  })

  it('I-10 §3.3 — ok === (skipped.length === 0) over the RESULT’S OWN emitted list, in every state', async () => {
    const { project, apply } = await surface('I-10')
    const p = project(
      { a: 1, b: NaN },
      { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } },
    )
    const states: Array<readonly [string, () => unknown]> = [
      ['a clean call (nothing skipped)', () => apply(project({ a: 1 }, { a: { name: '--a', unit: 'px' } }), recordingSink().sink)],
      ['a call with one skip', () => apply(p, recordingSink().sink)],
      ['an unusable sink (every key skipped)', () => apply(project({ a: 1 }, { a: { name: '--a', unit: 'px' } }), null)],
      ['a malformed skipped list, all entries dropped (F-9: ok === true)', () => apply({ applied: { '--a': '1' }, skipped: 'nope' }, recordingSink().sink)],
      ['a mixed skipped list (F-9’s control: ok === false)', () => apply({ applied: { '--a': '1' }, skipped: [{ name: '--x', reason: 'missing-value' }, null] }, recordingSink().sink)],
      ['a non-record projection (M-11: nothing to decide)', () => apply(null, recordingSink().sink)],
    ]
    for (const [id, fn] of states) {
      const r = asApplyResult(drive(fn, `I-10 ${id}`), `I-10 ${id}`)
      expect(r.ok, `I-10 ${id}: ok === (skipped.length === 0) — never a two-source invariant`).toBe(r.skipped.length === 0)
    }
  })

  it('I-11 §3.3 — a Projection is REUSABLE: every call is equivalent to a first call with that value', async () => {
    const { project, apply, alias } = await surface('I-11')
    const values = { a: 1, b: 2, c: 3 }
    const specOf = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } }
    const p = asProjection(project(values, specOf), 'I-11 p')
    const fresh = projectSnapshot(project(values, specOf))
    const sinkA = recordingSink()
    const sinkB = recordingSink()
    const results: ApplyResult[] = []
    for (const [id, fn] of [
      ['call 1 → sinkA', () => apply(p, sinkA.sink)],
      ['call 2 → sinkB', () => apply(p, sinkB.sink)],
      ['call 3 → sinkA', () => apply(p, sinkA.sink)],
      ['call 4 → applyVarsToRoot → sinkB', () => alias(p, sinkB.sink)],
    ] as Array<readonly [string, () => unknown]>) {
      const r = asApplyResult(drive(fn, `I-11 ${id}`), `I-11 ${id}`)
      results.push(r)
      expect(r.ok, `I-11 ${id}: each call is ok — nothing is consumed, so nothing accumulates`).toBe(true)
      expect(r.skipped, `I-11 ${id}: skipped is call-local and stays []`).toEqual([])
    }
    for (let i = 1; i < results.length; i += 1) {
      expect(projectSnapshot(results[i]), `I-11: result ${i + 1} is deep-equal to result 1 (independent but equivalent)`).toEqual(
        projectSnapshot(results[0]),
      )
    }
    expect(sinkA.calls.length, 'I-11/§2.3 item 7: sinkA holds the writes of calls 1 and 3 — 2K for K keys').toBe(6)
    expect(sinkB.calls.length, 'I-11/§2.3 item 7: sinkB holds the writes of calls 2 and 4 — 2K').toBe(6)
    expect(projectSnapshot(p), 'I-11/I-14: p is UNCONSUMED and observably unchanged after four calls').toEqual(fresh)
  })

  it('I-12 §3.3 — EVERY caller-supplied name is an OWN key: none is dropped, renamed or misdiagnosed', async () => {
    const { project, apply } = await surface('I-12')
    for (const name of DANGEROUS_NAMES) {
      const p = asProjection(
        drive(() => project({ k: 7 }, { k: { name, unit: '' } }), `I-12 name ${name}`),
        `I-12 name ${name}`,
      )
      expect(own(p.applied, name), `I-12: '${name}' is an own key of Projection.applied`).toBe(true)
      expect(Object.keys(p.applied), `I-12: Object.keys(applied) contains '${name}' in spec order`).toEqual([name])
      expect(p.skipped, `I-12: '${name}' is in no skipped entry`).toEqual([])
      const rec = recordingSink()
      const r = asApplyResult(drive(() => apply(p, rec.sink), `I-12 apply ${name}`), `I-12 apply ${name}`)
      expect(own(r.applied, name), `I-12: '${name}' is an own key of ApplyResult.applied`).toBe(true)
      expect(rec.calls, `I-12/M-20: the sink received the name VERBATIM`).toEqual([{ name, value: '7' }])
      expect(r.skipped, `I-12: the applier holds no name guard for '${name}'`).toEqual([])
    }
  })

  it('I-13 §3.3 — the returned applied records (and every internal key→value map) have NO prototype', async () => {
    const { project, apply } = await surface('I-13')
    const shapes: Array<readonly [string, Projection]> = [
      ['an ordinary name', project({ k: 1 }, { k: { name: '--ok', unit: 'px' } })],
      ['an own __proto__ name', project({ k: 1 }, { k: { name: DANGEROUS_NAMES[0], unit: '' } })],
      ['an empty projection', project({}, {})],
      ['a projection of only skips', project({}, { k: { name: '--missing', unit: 'px' } })],
    ]
    for (const [id, p] of shapes) {
      expect(
        Object.getPrototypeOf(p.applied),
        `I-13 ${id}: Object.getPrototypeOf(Projection.applied) === null (by IDENTITY, never truthiness)`,
      ).toBe(null)
      const rec = recordingSink()
      const r = asApplyResult(drive(() => apply(p, rec.sink), `I-13 apply ${id}`), `I-13 apply ${id}`)
      expect(Object.getPrototypeOf(r.applied), `I-13 ${id}: Object.getPrototypeOf(ApplyResult.applied) === null`).toBe(null)
      expect(Object.keys(p.applied), `I-13 ${id}: Object.keys still yields the deterministic write order`).toEqual(Object.keys(p.applied))
      expect([...Object.keys(p.applied)], `I-13 ${id}: key order is stable across a read`).toEqual(Object.keys(p.applied))
    }
    // The `values`/`specOf` lookups are OWN-property lookups: a plain-object
    // `values` with no own `'k'` never yields an inherited value.
    const inherited = project(
      { other: 1 },
      { k: { name: '--k', unit: 'px' } },
    ) as Projection
    expect(
      Object.keys(inherited.applied),
      'I-13/§2.5 item 2: a spec key absent from a plain-object `values` is NEVER applied from an inherited value',
    ).toEqual([])
  })

  it('I-14 §3.3 — the projection is IMMUTABLE INPUT and the module holds NO re-entrancy guard', async () => {
    const { project, apply, mod } = await surface('I-14')
    const values = { a: 1, b: 2 }
    const specOf = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }
    const p = asProjection(project(values, specOf), 'I-14 p')
    const before = projectSnapshot(p)
    const rec = throwingSink([1])
    asApplyResult(drive(() => apply(p, rec.sink), 'I-14 apply'), 'I-14 apply')
    expect(
      immutabilityBreaks(before, projectSnapshot(p), projectSnapshot(project(values, specOf)), 'I-14'),
    ).toEqual([])
    expect(
      guardShapedExport(mod),
      'I-14/prohibition 4: the module exports NO guard/flag/lock/busy/depth-shaped name — a guard would have to be state',
    ).toEqual([])
    // A re-entrant call is NEVER refused (no guard may block it).
    let innerRan = false
    const inner: VarWriteSink = { style: { setProperty: () => undefined } }
    const reentrant: VarWriteSink = {
      style: {
        setProperty: () => {
          asApplyResult(apply(p, inner), 'I-14 inner re-entrant call')
          innerRan = true
        },
      },
    }
    const outer = asApplyResult(drive(() => apply(p, reentrant), 'I-14 outer'), 'I-14 outer')
    expect(innerRan, 'I-14/F-14: the nested call RAN — no guard refused it for re-entering').toBe(true)
    expect(Object.keys(outer.applied).sort(), 'I-14: the outer result reports exactly its own call’s writes').toEqual(['--a', '--b'])
  })
})

// ===========================================================================
// THE FIXTURE TABLES the `M`/`F`/`I` rows and the register share.
// ===========================================================================

/** `§2.5`/`A-3` — the six prototype-shaped caller names. **`'__proto__'` is
 *  assembled**, because `Object.keys`-visible data spelled as a plain property
 *  in the row's own source would be handled by the PARSER, not by the record
 *  under test (`§2.5` item 4). */
const DANGEROUS_NAMES: readonly string[] = [
  ['__pro', 'to__'].join(''),
  'constructor',
  'prototype',
  'toString',
  'hasOwnProperty',
  'valueOf',
]

/** The `23` decision classes of `S-PJ-DECISION-1` (`§5.5.1 P-PJ-IM-1`). Each
 *  entry drives ONE `project` call and names the expected decision per spec
 *  entry, so the row can fail for exactly the class it enumerates. */
type DecisionClass = {
  id: string
  /** The spec entries this drive's `specOf` produces (0 for a non-record). */
  entries: number
  values: unknown
  specOf: unknown
  /** `name` ⇒ the EXACT expected reason; `null` ⇒ the name must be APPLIED. */
  expected: ReadonlyArray<readonly [string, ProjectionSkipReason | null]>
  /** The expected applied value, recomputed from the caller's own data. */
  applied?: Readonly<Record<string, string>>
}

const throwingAccessor = (): unknown => {
  throw new Error('hostile accessor')
}

const DECISION_CLASSES: readonly DecisionClass[] = (() => {
  const classes: DecisionClass[] = []
  const add = (c: DecisionClass): void => {
    classes.push(c)
  }
  // (1) one well-formed spec, a finite non-negative value.
  add({
    id: '(1) M-1 one spec, one value',
    entries: 1,
    values: { w: 320 },
    specOf: { w: { name: '--app-width', unit: 'px' } },
    expected: [['--app-width', null]],
    applied: { '--app-width': '320px' },
  })
  // (2) omitted format ⇒ the documented 'unit' default (M-2).
  add({
    id: '(2) M-2 omitted format behaves as unit',
    entries: 1,
    values: { n: 320 },
    specOf: { n: { name: '--n', unit: 'px' } },
    expected: [['--n', null]],
    applied: { '--n': '320px' },
  })
  // (3) format: 'number' drops the caller's unit token (M-3).
  add({
    id: "(3) M-3 format 'number'",
    entries: 1,
    values: { n: 320 },
    specOf: { n: { name: '--n', unit: 'px', format: 'number' } },
    expected: [['--n', null]],
    applied: { '--n': '320' },
  })
  // (4) an empty unit is VALID (M-4).
  add({
    id: '(4) M-4 unit: ""',
    entries: 1,
    values: { z: 7 },
    specOf: { z: { name: '--z', unit: '' } },
    expected: [['--z', null]],
    applied: { '--z': '7' },
  })
  // (5) 0 is a legitimate value (M-16).
  add({
    id: '(5) M-16 value 0',
    entries: 1,
    values: { z: 0 },
    specOf: { z: { name: '--z', unit: 'px' } },
    expected: [['--z', null]],
    applied: { '--z': '0px' },
  })
  // (6) a caller-supplied '__proto__' NAME (M-18).
  add({
    id: '(6) M-18 a __proto__ name',
    entries: 1,
    values: { k: 1 },
    specOf: { k: { name: DANGEROUS_NAMES[0], unit: '' } },
    expected: [[DANGEROUS_NAMES[0], null]],
    applied: { [DANGEROUS_NAMES[0]]: '1' },
  })
  // (7) an absent key (F-3).
  add({
    id: '(7) F-3 an absent key',
    entries: 1,
    values: {},
    specOf: { k: { name: '--k', unit: 'px' } },
    expected: [['--k', 'missing-value']],
  })
  // (8) a non-record specOf ⇒ ZERO entries, both records empty (F-11 (a)).
  add({
    id: '(8) F-11(a) a non-record specOf',
    entries: 0,
    values: { k: 1 },
    specOf: 42,
    expected: [],
  })
  // (9) a malformed spec entry (F-1).
  add({
    id: '(9) F-1 a malformed spec entry',
    entries: 1,
    values: { k: 1 },
    specOf: { k: null },
    expected: [['', 'malformed-spec']],
  })
  // (10) two specs naming one '--dup', the FIRST with a value (F-2).
  add({
    id: '(10) F-2 a duplicate name',
    entries: 2,
    values: { a: 1, b: 2 },
    specOf: { a: { name: '--dup', unit: 'px' }, b: { name: '--dup', unit: 'px' } },
    expected: [['--dup', null]],
    applied: { '--dup': '1px' },
  })
  // (11)-(16) the non-numeric class (F-4A).
  const nonNumeric: ReadonlyArray<readonly [string, unknown]> = [
    ['(11) F-4A a string value', '12'],
    ['(12) F-4A a boolean', true],
    ['(13) F-4A null (present)', null],
    ['(14) F-4A NaN', NaN],
    ['(15) F-4A +Infinity', Infinity],
    ['(16) F-4A -Infinity', -Infinity],
  ]
  for (const [id, value] of nonNumeric) {
    add({
      id,
      entries: 1,
      values: { k: value },
      specOf: { k: { name: '--k', unit: 'px' } },
      expected: [['--k', 'not-a-number']],
    })
  }
  // (17) a finite negative (F-5).
  add({
    id: '(17) F-5 -1 → negative',
    entries: 1,
    values: { k: -1 },
    specOf: { k: { name: '--k', unit: 'px' } },
    expected: [['--k', 'negative']],
  })
  // (18) -0 is NOT negative and is applied as '0' (F-5's second half).
  add({
    id: '(18) F-5 -0 → applied as "0"',
    entries: 1,
    values: { k: -0 },
    specOf: { k: { name: '--k', unit: 'px' } },
    expected: [['--k', null]],
    applied: { '--k': '0px' },
  })
  // (19) a prototype-shaped NAME driven with a plain-object values holding NO
  // own key of that name (F-13 (a)) — never applied from an inherited value.
  // ONE drive covers the five `Object.prototype`-shaped names: the expected
  // reason is DERIVED from what the caller's own data actually answers for that
  // name (`undefined` ⇒ `missing-value`; an inherited object/function ⇒
  // `not-a-number` — what is forbidden in every case is APPLYING the inherited
  // value), exactly as `§2.4` item 3's precedence decides it.
  const plainValues = Object.create(Object.prototype) as Record<string, unknown>
  plainValues['k'] = 3
  const plainName = 'constructor'
  add({
    id: `(19) F-13(a) ${plainName} with no own key (the prototype-shaped-name class)`,
    entries: 1,
    values: plainValues,
    specOf: { k: { name: plainName, unit: '' } },
    expected: [[plainName, typeof plainValues[plainName] === 'undefined' ? 'missing-value' : 'not-a-number']],
  })
  // (20)/(21) the ruled class the ruling pack added: a THROWING ACCESSOR (F-4B/F-12).
  add({
    id: '(20) F-4B/F-12 a throwing accessor (first key)',
    entries: 1,
    values: { k: throwingAccessor },
    specOf: { k: { name: '--k', unit: 'px' } },
    expected: [['--k', 'accessor-threw']],
  })
  add({
    id: '(21) F-12 a throwing accessor (second position)',
    entries: 2,
    values: { k1: 1 },
    specOf: { k1: { name: '--k1', unit: 'px' }, k2: { name: '--k2', unit: 'px' } },
    expected: [
      ['--k1', null],
      ['--k2', 'accessor-threw'],
    ],
    applied: { '--k1': '1px' },
  })
  // (22) a duplicate 'constructor' name pair (F-13 (b)): the FIRST applied, the
  // second 'duplicate-name' — the detection set must not see an INHERITED member
  // as already-seen.
  add({
    id: '(22) F-13(b) a duplicate constructor name pair',
    entries: 2,
    values: { a: 5, b: 7 },
    specOf: { a: { name: 'constructor', unit: '' }, b: { name: 'constructor', unit: '' } },
    expected: [['constructor', null]],
    applied: { constructor: '5' },
  })
  // (23) a specOf carrying an OWN __proto__ entry (F-13 (c)).
  add({
    id: '(23) F-13(c) an own __proto__ specOf entry',
    entries: 1,
    values: { k: 9 },
    specOf: (() => {
      const m: Record<string, unknown> = {}
      Object.defineProperty(m, DANGEROUS_NAMES[0], {
        value: { name: '--own-proto', unit: '' },
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return m
    })(),
    expected: [['--own-proto', null]],
    applied: { '--own-proto': '9' },
  })
  return classes
})()

/** A throwing accessor's construction, kept as a helper so the drives read alike. */
function valuesWithThrowingAccessor(key: string, others: Record<string, unknown>): Record<string, unknown> {
  const values: Record<string, unknown> = { ...others }
  Object.defineProperty(values, key, { get: throwingAccessor, enumerable: true, configurable: true })
  return values
}

// ===========================================================================
// §3.1 — M-1..M-22, the valid / happy states.
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it('M-1 §3.1 — one spec, one value, one write: the record, the skip list and the sink call agree', async () => {
    const { project, apply } = await surface('M-1')
    const p = asProjection(drive(() => project({ w: 320 }, { w: { name: '--app-width', unit: 'px' } }), 'M-1 project'), 'M-1 project')
    expect(Object.keys(p.applied)).toEqual(['--app-width'])
    expect(p.applied['--app-width']).toBe('320px')
    expect(p.skipped, 'M-1: p.skipped is []').toEqual([])
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'M-1 apply'), 'M-1 apply')
    expect(rec.calls, 'M-1: the sink received EXACTLY one setProperty(--app-width, 320px)').toEqual([
      { name: '--app-width', value: '320px' },
    ])
    expect(projectSnapshot(r), 'M-1: r.applied deep-equals p.applied').toEqual(projectSnapshot(p))
    expect(r.ok, 'M-1: r.ok === true').toBe(true)
  })

  it('M-2 §3.1 — omitted `format` behaves as `unit` (the documented, caller-visible default)', async () => {
    const { project } = await surface('M-2')
    const withDefault = asProjection(drive(() => project({ n: 320 }, { n: { name: '--n', unit: 'px' } }), 'M-2 default'), 'M-2 default')
    const explicit = asProjection(
      drive(() => project({ n: 320 }, { n: { name: '--n', unit: 'px', format: 'unit' } }), 'M-2 explicit'),
      'M-2 explicit',
    )
    expect(projectSnapshot(withDefault), 'M-2: an omitted format === format: "unit" in every observable').toEqual(
      projectSnapshot(explicit),
    )
    expect(withDefault.applied['--n'], 'M-2: the emitted string carries the caller’s unit').toBe('320px')
  })

  it("M-3 §3.1 — format: 'number' drops the unit token (the caller's unit is IGNORED, not emitted)", async () => {
    const { project } = await surface('M-3')
    const p = asProjection(
      drive(() => project({ n: 320 }, { n: { name: '--n', unit: 'SENTINEL_UNIT', format: 'number' } }), 'M-3'),
      'M-3',
    )
    expect(p.applied, "M-3: applied is {'--n': '320'} — the caller's unit is ignored, not emitted").toEqual({ '--n': '320' })
    expect(p.skipped, 'M-3: no skip').toEqual([])
  })

  it('M-4 §3.1 — an EMPTY unit is valid and means "no unit"; unit was not defaulted to any literal', async () => {
    const { project } = await surface('M-4')
    const p = asProjection(drive(() => project({ z: 7 }, { z: { name: '--z', unit: '' } }), 'M-4'), 'M-4')
    expect(p.applied, "M-4: applied is {'--z': '7'} — no default token was substituted").toEqual({ '--z': '7' })
    expect(p.skipped, 'M-4: no skip').toEqual([])
  })

  it('M-5 §3.1 — exactly ONE write per applied key per call (ruling 2’s "one write per commit")', async () => {
    const { project, apply } = await surface('M-5')
    const p = asProjection(
      drive(
        () =>
          project(
            { a: 1, b: 2, c: 3 },
            { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } },
          ),
        'M-5 project',
      ),
      'M-5 project',
    )
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'M-5 apply'), 'M-5 apply')
    expect(rec.calls.length, 'M-5: setProperty was called exactly K times, one per key').toBe(3)
    expect(rec.calls.map((c) => c.name), "M-5: the calls are in Object.keys(applied)'s order").toEqual(Object.keys(p.applied))
    expect(new Set(rec.calls.map((c) => c.name)).size, 'M-5: no key was written twice').toBe(3)
    expect(r.ok, 'M-5: ok === true').toBe(true)
  })

  it('M-6 §3.1 — several keys: the key order equals the SPEC order, and the result’s order equals applied’s', async () => {
    const { project, apply } = await surface('M-6')
    const p = asProjection(
      drive(
        () =>
          project(
            { c: 3, a: 1, b: 2 },
            { c: { name: '--c', unit: 'px' }, a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } },
          ),
        'M-6 project',
      ),
      'M-6 project',
    )
    expect(Object.keys(p.applied), 'M-6: applied’s key order equals the SPEC order').toEqual(['--c', '--a', '--b'])
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'M-6 apply'), 'M-6 apply')
    expect(rec.calls.map((c) => c.name), 'M-6/§2.3 item 6: the writes follow Object.keys(projection.applied)').toEqual([
      '--c',
      '--a',
      '--b',
    ])
    expect(Object.keys(r.applied), 'M-6: the result’s key order equals applied’s').toEqual(['--c', '--a', '--b'])
  })

  it('M-7 §3.1 — the SENTINEL round-trip: every emitted string is caller data, with no prefix/suffix of the module’s', async () => {
    const { project } = await surface('M-7')
    const p = asProjection(
      drive(() => project({ k: 123 }, { k: { name: '--SENTINEL_NAME', unit: 'SENTINEL_UNIT' } }), 'M-7'),
      'M-7',
    )
    expect(own(p.applied, '--SENTINEL_NAME'), 'M-7: the sentinel NAME is present VERBATIM').toBe(true)
    expect(p.applied['--SENTINEL_NAME'], 'M-7: the emitted value is exactly "123SENTINEL_UNIT"').toBe('123SENTINEL_UNIT')
    expect(Object.keys(p.applied), 'M-7: no key of the module’s own appears').toEqual(['--SENTINEL_NAME'])
  })

  it('M-8 §3.1 — a caller-supplied unit that LOOKS built-in is used verbatim (no special case for any token)', async () => {
    const { project } = await surface('M-8')
    for (const unit of ['px', 'Q', '--', 'SENTINEL;UNIT}']) {
      const p = asProjection(
        drive(() => project({ k: 4 }, { k: { name: '--u', unit } }), `M-8 unit ${brief(unit)}`),
        `M-8 unit ${brief(unit)}`,
      )
      expect(p.applied['--u'], `M-8: unit ${brief(unit)} emits exactly value+unit, verbatim`).toBe(`4${unit}`)
      expect(p.skipped, `M-8: unit ${brief(unit)} is never a skip`).toEqual([])
    }
  })

  it('M-9 §3.1 — frozen inputs: a frozen ENTRY is VALID and applied; a frozen NESTED object is `malformed-spec`', async () => {
    const { project } = await surface('M-9')
    // (a) a frozen VarSpec entry — the key is APPLIED (freezing changes no field).
    const frozenValues = Object.freeze({ w: 320 })
    const frozenSpec = Object.freeze({ w: Object.freeze({ name: '--app-width', unit: 'px' }) })
    const appliedCase = asProjection(drive(() => project(frozenValues, frozenSpec), 'M-9 (a) frozen entry'), 'M-9 (a) frozen entry')
    expect(own(appliedCase.applied, '--app-width'), 'M-9 (a): a FROZEN spec entry is VALID — its key is an own key of applied').toBe(true)
    expect(appliedCase.applied['--app-width'], 'M-9 (a): the exact expected string').toBe('320px')
    expect(skipOf(appliedCase, '--app-width'), 'M-9 (a): the key appears in NO skipped entry').toBe(undefined)
    expect(appliedCase.skipped, 'M-9 (a): nothing was skipped').toEqual([])
    // (b) a frozen NESTED object where `string` is required ⇒ `malformed-spec`
    // (the observable is the reason member — NOT a freeze-shaped/TypeError reason).
    const frozenNestedName = asProjection(
      drive(() => project({ k: 1 }, { k: { name: Object.freeze({}), unit: 'px' } }), 'M-9 (b) frozen nested name'),
      'M-9 (b) frozen nested name',
    )
    expect(frozenNestedName.applied, 'M-9 (b): a frozen nested object in the `name` position applies nothing').toEqual({})
    expect(
      frozenNestedName.skipped.map((s) => s.reason),
      'M-9 (b): the reason is EXACTLY `malformed-spec` — nothing about the freeze is a reason',
    ).toEqual(['malformed-spec'])
    const frozenNestedUnit = asProjection(
      drive(
        () => project({ k: 1 }, { k: { name: '--k', unit: Object.freeze([]) as unknown as string } }),
        'M-9 (b) frozen nested unit',
      ),
      'M-9 (b) frozen nested unit',
    )
    expect(
      frozenNestedUnit.skipped.map((s) => s.reason),
      'M-9 (b): a frozen ARRAY where `unit` is required is the SAME `malformed-spec` class',
    ).toEqual(['malformed-spec'])
  })

  it('M-10 §3.1 — `projectVar` agrees with `project`: written ⇔ applied[k], skip ⇔ the skipped entry (null is the ONLY "not written")', async () => {
    const { project, projectVar } = await surface('M-10')
    const cases: Array<readonly [string, VarSpec, unknown]> = [
      ['a plain value', spec('--a', 'px'), 320],
      ['an omitted format', { name: '--b', unit: 'px' }, 7],
      ["format: 'number' on 0", spec('--c', 'px', 'number'), 0],
      ["an empty unit (written === '' and skip === null)", spec('--d', ''), 0],
      ["format: 'number'", spec('--e', 'px', 'number'), 320],
      ['an absent value', spec('--f', 'px'), undefined],
      ['a NaN value', spec('--g', 'px'), NaN],
      ['a negative value', spec('--h', 'px'), -1],
      ['a string value', spec('--i', 'px'), '12'],
      ['a throwing accessor', spec('--j', 'px'), throwingAccessor],
      ['a malformed spec (no name)', { unit: 'px' } as unknown as VarSpec, 1],
      ['a malformed spec (null)', null as unknown as VarSpec, 1],
    ]
    for (const [id, s, value] of cases) {
      const single = drive(() => projectVar(s, value), `M-10 projectVar ${id}`) as ProjectVarResult
      const viaProject = asProjection(
        drive(() => project({ k: value }, { k: s }), `M-10 project ${id}`),
        `M-10 project ${id}`,
      )
      const appliedName = s !== null && typeof s === 'object' && typeof s.name === 'string' ? s.name : null
      if (appliedName !== null && own(viaProject.applied, appliedName)) {
        expect(single.written, `M-10 ${id}: written EQUALS project’s applied['${appliedName}'] (exact equality)`).toBe(
          viaProject.applied[appliedName],
        )
        expect(single.skip, `M-10 ${id}: an applied value carries skip === null (never a falsy test)`).toBe(null)
        expect(single.written === null, `M-10 ${id}: written === null is the ONLY "not written" observable`).toBe(false)
      } else {
        expect(single.written, `M-10 ${id}: a skip ⇒ written === null`).toBe(null)
        expect(single.skip, `M-10 ${id}: a skip ⇒ skip !== null (the companion observable)`).not.toBe(null)
        expect(
          viaProject.skipped.map((s2) => s2.reason),
          `M-10 ${id}: the single-key project result is skipped too, with the same reason`,
        ).toEqual([single.skip?.reason])
        expect(skipOf(viaProject, single.skip?.name ?? ''), `M-10 ${id}: the skip entry (name+reason) is the same`).toEqual({
          name: single.skip?.name,
          reason: single.skip?.reason,
        })
      }
      expect(
        single.written === '' && single.skip !== null,
        `M-10 ${id}: a skip NEVER produces written === ''`,
      ).toBe(false)
    }
    // The `''` case asserted by exact value, so the ambiguity cannot hide.
    const empty = drive(() => projectVar(spec('--z', ''), 0), 'M-10 unit:"" projectVar') as ProjectVarResult
    expect(empty.written, 'M-10/§7a.1 item 10: written === "" is a LEGITIMATE written value').toBe('')
    expect(empty.skip, 'M-10/§7a.1 item 10: …and skip === null for that same call').toBe(null)
  })

  it('M-11 §3.1 — a null/absent projection is a TOTAL no-op, not a throw (and not F-5’s sink class)', async () => {
    const { apply } = await surface('M-11')
    for (const [id, malformed] of [
      ['null', null],
      ['undefined', undefined],
      ['a string', 'nope'],
      ['a number', 42],
    ] as Array<readonly [string, unknown]>) {
      const rec = recordingSink()
      const r = asApplyResult(drive(() => apply(malformed, rec.sink), `M-11 ${id}`), `M-11 ${id}`)
      expect(Object.keys(r.applied), `M-11 ${id}: applied is {} — a malformed PROJECTION decides NOTHING`).toEqual([])
      expect(r.skipped, `M-11 ${id}: skipped is [] — no invented reason for the malformed-sink/projection shapes`).toEqual([])
      expect(r.ok, `M-11 ${id}: ok === true (there was nothing to decide)`).toBe(true)
      expect(rec.calls, `M-11 ${id}: zero writes`).toEqual([])
    }
  })

  it('M-12 §3.1 — a projection with an empty applied applies nothing and throws nothing', async () => {
    const { project, apply } = await surface('M-12')
    const p = asProjection(drive(() => project({}, {}), 'M-12 project'), 'M-12 project')
    expect(Object.keys(p.applied), 'M-12: project({},{}) ⇒ applied {}').toEqual([])
    expect(p.skipped, 'M-12: …and skipped []').toEqual([])
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'M-12 apply'), 'M-12 apply')
    expect(rec.calls, 'M-12: the sink received ZERO calls').toEqual([])
    expect(r.ok, 'M-12: ok === true').toBe(true)
  })

  it('M-13 §3.1 — a HAND-BUILT projection is honoured: the TRUST half (no re-validation, no re-derivation)', async () => {
    const { apply } = await surface('M-13')
    // (2) NO re-derivation from a spec: a projection carrying a skip entry that
    // `project` would never emit for the same shape (the key IS present here).
    const handBuilt: Projection = {
      applied: { '--a': '1' },
      skipped: [{ name: '--a-present-elsewhere', reason: 'missing-value' }],
    }
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(handBuilt, rec.sink), 'M-13 trust half'), 'M-13 trust half')
    expect(rec.calls, 'M-13 (2): the applier writes exactly the GIVEN record').toEqual([{ name: '--a', value: '1' }])
    expect(r.skipped, 'M-13 (2): the GIVEN skip entry is propagated UNCHANGED, never recomputed').toEqual([
      { name: '--a-present-elsewhere', reason: 'missing-value' },
    ])
    expect(r.ok, 'M-13 (2): the given skip list makes ok === false — no re-derivation to a clean result').toBe(false)
    // (3) the coercion is F-10's and only F-10's: `{applied: {'--a': 12}}` and the
    // caller's projection is unmutated.
    const coercible: Projection = { applied: { '--a': 12 } as unknown as Record<string, string>, skipped: [] }
    const before = projectSnapshot(coercible)
    const rec2 = recordingSink()
    asApplyResult(drive(() => apply(coercible, rec2.sink), 'M-13 coercion half'), 'M-13 coercion half')
    expect(rec2.calls, 'M-13 (3): setProperty received the F-10-coerced string').toEqual([{ name: '--a', value: '12' }])
    expect(projectSnapshot(coercible), 'M-13 (3)/I-14: the caller’s projection is UNMUTATED by the coercion').toEqual(before)
    // (4) a non-record projection is M-11's no-op, NOT a re-validation path.
    const rec3 = recordingSink()
    const noOp = asApplyResult(drive(() => apply('nope', rec3.sink), 'M-13 (4)'), 'M-13 (4)')
    expect(noOp.skipped, 'M-13 (4): a non-record projection produces NO re-derived skip reason').toEqual([])
    expect(noOp.ok, 'M-13 (4): ok === true (M-11’s asymmetry)').toBe(true)
  })

  it('M-14 §3.1 — `applyVarsToRoot` is an IDENTITY alias of `applyProjection`, not a second implementation', async () => {
    const { apply, alias } = await surface('M-14')
    expect(alias, 'M-14: applyVarsToRoot === applyProjection (function IDENTITY, §2.1’s source-name alias)').toBe(apply)
    const real = expectedRecord([['--a', '1']]) as unknown as Projection
    const recA = recordingSink()
    const recB = recordingSink()
    const viaApply = asApplyResult(drive(() => apply(real, recA.sink), 'M-14 applyProjection'), 'M-14 applyProjection')
    const viaAlias = asApplyResult(drive(() => alias(real, recB.sink), 'M-14 applyVarsToRoot'), 'M-14 applyVarsToRoot')
    expect(recB.calls, 'M-14: the alias drives the SAME writes').toEqual(recA.calls)
    expect(projectSnapshot(viaAlias), 'M-14: the alias returns the same shape/decisions').toEqual(projectSnapshot(viaApply))
  })

  it('M-15 §3.1 — `ok` reflects the CURRENT call only: nothing accumulates across calls', async () => {
    const { project, apply } = await surface('M-15')
    const p = project(
      { a: 1, b: NaN },
      { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } },
    )
    const first = asApplyResult(drive(() => apply(p, recordingSink().sink), 'M-15 first'), 'M-15 first')
    expect(first.ok, 'M-15: the first call has a skip ⇒ ok === false').toBe(false)
    expect(first.skipped.length, 'M-15: …and one skip entry').toBe(1)
    const clean = project({ a: 1 }, { a: { name: '--a', unit: 'px' } })
    const second = asApplyResult(drive(() => apply(clean, recordingSink().sink), 'M-15 second'), 'M-15 second')
    expect(second.ok, 'M-15: the SECOND call (a different projection) is ok === true').toBe(true)
    expect(second.skipped, 'M-15: nothing from the first call accumulates into the second').toEqual([])
    // The same projection twice: each call's `ok` is its own call's list.
    const third = asApplyResult(drive(() => apply(p, recordingSink().sink), 'M-15 third'), 'M-15 third')
    expect(third.ok, 'M-15/I-10: the re-driven projection still reports its own call’s skip (never a memo)').toBe(false)
    expect(third.skipped.length, 'M-15: …exactly its own call’s one entry').toBe(1)
  })

  it('M-16 §3.1 — a value of 0 IS applied: not treated as absent, not skipped, not coerced', async () => {
    const { project, apply } = await surface('M-16')
    const p = asProjection(drive(() => project({ z: 0 }, { z: { name: '--z', unit: 'px' } }), 'M-16'), 'M-16')
    expect(p.applied, "M-16: applied is {'--z': '0px'}").toEqual({ '--z': '0px' })
    expect(p.skipped, 'M-16: 0 is never a skip').toEqual([])
    const rec = recordingSink()
    asApplyResult(drive(() => apply(p, rec.sink), 'M-16 apply'), 'M-16 apply')
    expect(rec.calls, 'M-16: the sink received the exact string').toEqual([{ name: '--z', value: '0px' }])
  })

  it('M-17 §3.1 — very large / very small finite values: the EXACT strings are pinned', async () => {
    const { project } = await surface('M-17')
    const table: ReadonlyArray<readonly [string, number, string]> = [
      ['1e21', 1e21, '1e+21px'],
      ['-0', -0, '0px'],
      ['5e-324', 5e-324, '5e-324px'],
      ['Number.MAX_VALUE', Number.MAX_VALUE, `${String(Number.MAX_VALUE)}px`],
      ['Number.MIN_VALUE', Number.MIN_VALUE, `${String(Number.MIN_VALUE)}px`],
    ]
    for (const [id, value, expected] of table) {
      const p = asProjection(drive(() => project({ k: value }, { k: { name: '--v', unit: 'px' } }), `M-17 ${id}`), `M-17 ${id}`)
      expect(p.applied['--v'], `M-17 ${id}: the EXACT string String(value)+unit (a later pass cannot "improve" the format silently)`).toBe(
        expected,
      )
      expect(p.skipped, `M-17 ${id}: a finite value is applied, never skipped`).toEqual([])
    }
  })

  it('M-18 §3.1 — a caller-supplied `__proto__` name is an ORDINARY own key (A-3)', async () => {
    const { project } = await surface('M-18')
    const name = DANGEROUS_NAMES[0]
    const p = asProjection(drive(() => project({ k: 1 }, { k: { name, unit: '' } }), 'M-18'), 'M-18')
    expect(own(p.applied, name), 'M-18: Object.prototype.hasOwnProperty.call(applied, "__proto__") === true').toBe(true)
    expect(Object.keys(p.applied), 'M-18: Object.keys(applied) contains "__proto__" in spec order').toEqual([name])
    expect(Object.getPrototypeOf(p.applied), 'M-18: the record’s prototype was NOT mutated (=== null)').toBe(null)
    expect(p.applied[name], 'M-18: applied["__proto__"] reads back the OWN value, not a prototype').toBe('1')
    expect(p.skipped, 'M-18/I-1: "__proto__" appears in NO skipped entry — the partition holds').toEqual([])
  })

  it('M-19 §3.1 — the null-prototype record’s own membership API', async () => {
    const { project, apply } = await surface('M-19')
    const name = DANGEROUS_NAMES[0]
    const p = asProjection(drive(() => project({ k: 1 }, { k: { name, unit: '' } }), 'M-19'), 'M-19')
    expect(
      (p.applied as unknown as { hasOwnProperty?: unknown }).hasOwnProperty,
      'M-19: applied.hasOwnProperty is UNDEFINED on the null-prototype record (it cannot be called)',
    ).toBe(undefined)
    expect(
      typeof (p.applied as unknown as { hasOwnProperty?: unknown }).hasOwnProperty === 'function' &&
        ((p.applied as unknown as { hasOwnProperty: unknown }).hasOwnProperty as () => boolean).call(p.applied, name),
      'M-19: a call through `applied.hasOwnProperty` must NOT work (the pinned test is Object.hasOwn / hasOwnProperty.call)',
    ).toBe(false)
    // …and the null prototype holds for EVERY returned record, ordinary names included.
    for (const s of [
      { k: { name: '--ordinary', unit: 'px' }, v: 1 },
      { k: { name: '--ordinary2', unit: 'px' }, v: 2 },
    ]) {
      const ordinary = project({ k: s.v }, { k: s.k })
      expect(Object.getPrototypeOf(ordinary.applied), 'M-19: the null prototype holds for an ORDINARY-name record too').toBe(null)
    }
    expect(Object.keys(p.applied), 'M-19: Object.keys behaves normally').toEqual([name])
    expect(Object.entries(p.applied), 'M-19: Object.entries behaves normally').toEqual([[name, '1']])
    expect(JSON.stringify(p.applied), 'M-19: JSON.stringify serializes the own __proto__ as DATA').toBe(`{"${name}":"1"}`)
    expect({ ...p.applied }, 'M-19: spread into a plain target works (the copy hazard is the CALLER’s obligation, §2.5 item 4)').toEqual({
      [name]: '1',
    })
    expect(name in p.applied, 'M-19: `in` answers true for an own key').toBe(true)
    const rec = recordingSink()
    asApplyResult(drive(() => apply(p, rec.sink), 'M-19 apply'), 'M-19 apply')
    expect(rec.calls, 'M-19: the pinned membership forms read the same record the applier wrote from').toEqual([{ name, value: '1' }])
  })

  it('M-20 §3.1 — the APPLIER-side contrast: a dangerous NAME is an ordinary CSS property name (A-3)', async () => {
    const { project, apply } = await surface('M-20')
    const name = DANGEROUS_NAMES[0]
    const p = asProjection(drive(() => project({ k: 1 }, { k: { name, unit: '' } }), 'M-20 project'), 'M-20 project')
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'M-20 apply'), 'M-20 apply')
    expect(rec.calls, 'M-20: setProperty received EXACTLY ("__proto__", "1") — verbatim, as a string argument').toEqual([
      { name, value: '1' },
    ])
    expect(
      p.skipped,
      "M-20: no refusal, no sanitization, no sink-unusable/write-refused",
    ).toEqual([])
    expect(own(r.applied, name), 'M-20: the result carries the own key "__proto__"').toBe(true)
    expect(Object.getPrototypeOf(r.applied), 'M-20: the applier holds no name guard — the record is still null-prototype').toBe(null)
    expect(r.applied, 'M-20: the applied record carries the OWN value, not the prototype').toEqual(expectedRecord([[name, '1']]))
  })

  it('M-21 §3.1 — a projection is REUSABLE across DIFFERENT sinks, and p is unchanged after all three calls (A-11)', async () => {
    const { project, apply } = await surface('M-21')
    const values = { a: 1, b: 2 }
    const specOf = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }
    const p = asProjection(drive(() => project(values, specOf), 'M-21 project'), 'M-21 project')
    const fresh = projectSnapshot(project(values, specOf))
    const sinkA = recordingSink()
    const sinkB = recordingSink()
    const r1 = asApplyResult(drive(() => apply(p, sinkA.sink), 'M-21 call 1'), 'M-21 call 1')
    const r2 = asApplyResult(drive(() => apply(p, sinkB.sink), 'M-21 call 2'), 'M-21 call 2')
    const r3 = asApplyResult(drive(() => apply(p, sinkA.sink), 'M-21 call 3'), 'M-21 call 3')
    expect(r1 === r2 || r1 === r3 || r2 === r3, 'M-21/I-8: each call returns a FRESH ApplyResult').toBe(false)
    expect(projectSnapshot(r2), 'M-21: r1/r2/r3 are deep-equal (independent but equivalent)').toEqual(projectSnapshot(r1))
    expect(projectSnapshot(r3), 'M-21: …all three').toEqual(projectSnapshot(r1))
    expect(sinkA.calls.length, 'M-21: sinkA holds calls 1 and 3 — 2K writes for K keys').toBe(4)
    expect(sinkB.calls.length, 'M-21: sinkB holds call 2 — K writes').toBe(2)
    expect(r1.ok && r2.ok && r3.ok, 'M-21: ok === true in each call').toBe(true)
    expect(projectSnapshot(p), 'M-21/I-14: p is UNCHANGED after all three calls (not consumed)').toEqual(fresh)
    ;(r1.applied as Record<string, string>)['--a'] = 'MUTATED'
    expect(projectSnapshot(p), 'M-21/I-8: mutating r1.applied affects neither p nor r2').toEqual(fresh)
    expect(projectSnapshot(r2), 'M-21/I-8: …nor r2').not.toEqual(projectSnapshot(r1))
  })

  it('M-22 §3.1 — reusable against the SAME sink, and `applyVarsToRoot` reuses identically (no memo, no already-applied skip)', async () => {
    const { project, apply, alias } = await surface('M-22')
    const p = asProjection(
      drive(
        () => project({ a: 1, b: 2 }, { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }),
        'M-22 project',
      ),
      'M-22 project',
    )
    const rec = recordingSink()
    const first = asApplyResult(drive(() => apply(p, rec.sink), 'M-22 first'), 'M-22 first')
    const second = asApplyResult(drive(() => apply(p, rec.sink), 'M-22 second'), 'M-22 second')
    expect(projectSnapshot(second), 'M-22: the second call’s result deep-equals the first’s').toEqual(projectSnapshot(first))
    expect(rec.calls.length, 'M-22/§2.3 item 7: exactly one write per key PER CALL (4 for two 2-key calls)').toBe(4)
    expect(
      rec.calls.map((c) => c.name),
      'M-22: the write log is the CURRENT call’s log (no memo, no "already applied" skip)',
    ).toEqual(['--a', '--b', '--a', '--b'])
    const recAlias = recordingSink()
    const viaAlias1 = asApplyResult(drive(() => alias(p, recAlias.sink), 'M-22 alias 1'), 'M-22 alias 1')
    const viaAlias2 = asApplyResult(drive(() => alias(p, recAlias.sink), 'M-22 alias 2'), 'M-22 alias 2')
    expect(projectSnapshot(viaAlias2), 'M-22: the alias reuses identically').toEqual(projectSnapshot(viaAlias1))
    expect(recAlias.calls.length, 'M-22: …with one write per key per call through the alias too').toBe(4)
  })
})

// ===========================================================================
// §3.2 — F-1..F-15, the documented fail-states / skips (F-4 is SPLIT).
// ===========================================================================
describe('F — §3.2 the documented fail-states / skips', () => {
  it('F-1 §3.2 — a malformed spec entry is `malformed-spec`, and NO default is substituted', async () => {
    const { project } = await surface('F-1')
    const entries: ReadonlyArray<readonly [string, unknown]> = [
      ['null', null],
      ['undefined', undefined],
      ['a string', 'nope'],
      ['a number', 7],
      ['an array', []],
      ['a missing name', { unit: 'px' }],
      ['a non-string name', { name: 42, unit: 'px' }],
      ['a missing unit', { name: '--x' }],
      ['a non-string unit', { name: '--x', unit: 42 }],
      ['an unknown format value', { name: '--x', unit: 'px', format: 'percent' }],
    ]
    for (const [id, entry] of entries) {
      const p = asProjection(
        drive(() => project({ k: 1 }, { k: entry }), `F-1 ${id}`),
        `F-1 ${id}`,
      )
      expect(p.skipped.length, `F-1 ${id}: the entry is skipped (exactly one decision)`).toBe(1)
      expect(p.skipped[0].reason, `F-1 ${id}: the reason is exactly 'malformed-spec'`).toBe('malformed-spec')
      expect(Object.keys(p.applied), `F-1 ${id}: nothing is applied — NO default name/unit/value is invented`).toEqual([])
    }
  })

  it('F-2 §3.2 — `duplicate-name` is decided by NAME COLLISION, even when the FIRST occurrence is skipped', async () => {
    const { project } = await surface('F-2')
    // The filed half: both entries carry a value ⇒ first applied, second skipped.
    const filed = asProjection(
      drive(
        () => project({ a: 1, b: 2 }, { a: { name: '--dup', unit: 'px' }, b: { name: '--dup', unit: 'px' } }),
        'F-2 filed half',
      ),
      'F-2 filed half',
    )
    expect(filed.applied, 'F-2: the FIRST entry is applied').toEqual({ '--dup': '1px' })
    expect(filed.skipped, 'F-2: the SECOND is skipped with `duplicate-name`').toEqual([
      { name: '--dup', reason: 'duplicate-name' },
    ])
    // The §7a.1 item 5 drive: the FIRST occurrence is itself skipped.
    const firstSkipped = asProjection(
      drive(
        () => project({ b: 2 }, { a: { name: '--dup', unit: 'px' }, b: { name: '--dup', unit: 'px' } }),
        'F-2 first-occurrence-skipped',
      ),
      'F-2 first-occurrence-skipped',
    )
    expect(
      firstSkipped.skipped,
      'F-2/§7a.1 item 5: the FIRST entry keeps its OWN reason (`missing-value`) and the SECOND is `duplicate-name` — never the reverse',
    ).toEqual([
      { name: '--dup', reason: 'missing-value' },
      { name: '--dup', reason: 'duplicate-name' },
    ])
    expect(Object.keys(firstSkipped.applied), 'F-2: applied contains "--dup" ZERO times when the first occurrence was skipped').toEqual([])
    // The same collision where the first occurrence is skipped for another reason.
    const accessorFirst = asProjection(
      drive(
        () =>
          project(valuesWithThrowingAccessor('a', { b: 2 }), {
            a: { name: '--dup', unit: 'px' },
            b: { name: '--dup', unit: 'px' },
          }),
        'F-2 first occurrence accessor-threw',
      ),
      'F-2 first occurrence accessor-threw',
    )
    expect(
      accessorFirst.skipped.map((s) => s.reason),
      'F-2/§7a.1 item 5: a skipped first occurrence keeps ITS reason (`accessor-threw`), the second is `duplicate-name`',
    ).toEqual(['accessor-threw', 'duplicate-name'])
  })

  it('F-3 §3.2 — `missing-value`: never a 0, never an empty string, never a removal write', async () => {
    const { project, apply } = await surface('F-3')
    const p = asProjection(
      drive(() => project({ present: 1 }, { absent: { name: '--absent', unit: 'px' } }), 'F-3 project'),
      'F-3 project',
    )
    expect(p.skipped, 'F-3: the absent key is skipped with `missing-value`').toEqual([
      { name: '--absent', reason: 'missing-value' },
    ])
    expect(Object.keys(p.applied), 'F-3: it is not applied as 0 or as an empty string').toEqual([])
    const rec = recordingSink()
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'F-3 apply'), 'F-3 apply')
    expect(rec.calls, 'F-3/§2.3 item 5: no removal write and no write at all').toEqual([])
    expect(r.applied, 'F-3: r.applied is {}').toEqual({})
    expect(r.skipped, 'F-3: the skip propagates unchanged').toEqual([{ name: '--absent', reason: 'missing-value' }])
  })

  it('F-4A §3.2 — `not-a-number`: the whole NON-NUMERIC class (each READ without throwing)', async () => {
    const { project } = await surface('F-4A')
    const table: ReadonlyArray<readonly [string, unknown]> = [
      ['the string "12"', '12'],
      ['true', true],
      ['false', false],
      ['null', null],
      ['undefined (present)', undefined],
      ['{}', {}],
      ['[]', []],
      ['NaN', NaN],
      ['Infinity', Infinity],
      ['-Infinity', -Infinity],
      ['a BigInt', 12n],
      ['a function', () => 1],
    ]
    for (const [id, value] of table) {
      const p = asProjection(
        drive(() => project({ k: value }, { k: { name: '--k', unit: 'px' } }), `F-4A ${id}`),
        `F-4A ${id}`,
      )
      expect(
        p.skipped,
        `F-4A ${id}: skipped with exactly 'not-a-number' — the value was READ and is not a finite number`,
      ).toEqual([{ name: '--k', reason: 'not-a-number' }])
      expect(Object.keys(p.applied), `F-4A ${id}: never applied`).toEqual([])
    }
  })

  it('F-4B §3.2 — `accessor-threw`: the throwing accessor is caught PER KEY and the projection continues', async () => {
    const { project } = await surface('F-4B')
    const specOf = { k1: { name: '--k1', unit: 'px' }, k2: { name: '--k2', unit: 'px' }, k3: { name: '--k3', unit: 'px' } }
    // The accessor throws only for the SECOND of several keys.
    const p = asProjection(
      drive(() => project(valuesWithThrowingAccessor('k2', { k1: 1, k3: 3 }), specOf), 'F-4B per-key'),
      'F-4B per-key',
    )
    expect(Object.keys(p.applied), 'F-4B: the GOOD keys are still applied, before AND after the throwing key').toEqual([
      '--k1',
      '--k3',
    ])
    expect(p.skipped, 'F-4B: exactly ONE skip entry, for the throwing key, with `accessor-threw`').toEqual([
      { name: '--k2', reason: 'accessor-threw' },
    ])
    expect(
      p.skipped.filter((s) => s.name === '--k2').length,
      'F-4B: exactly one entry names the throwing key (no duplicate)',
    ).toBe(1)
    // The accessor throws on EVERY read: a repeat call is deep-equal (I-4).
    const again = asProjection(
      drive(() => project(valuesWithThrowingAccessor('k2', { k1: 1, k3: 3 }), specOf), 'F-4B repeat'),
      'F-4B repeat',
    )
    expect(projectSnapshot(again), 'F-4B/I-4: the result is deep-equal to a repeat call').toEqual(projectSnapshot(p))
  })

  it('F-5 §3.2 — `negative`: -1 is negative; -0 is NOT and is applied as "0"', async () => {
    const { project } = await surface('F-5')
    const negatives: ReadonlyArray<readonly [string, number]> = [
      ['-1', -1],
      ['-Number.MIN_VALUE', -Number.MIN_VALUE],
      ['-1e21', -1e21],
    ]
    for (const [id, value] of negatives) {
      const p = asProjection(drive(() => project({ k: value }, { k: { name: '--k', unit: 'px' } }), `F-5 ${id}`), `F-5 ${id}`)
      expect(p.skipped, `F-5 ${id}: a negative finite value ⇒ the 'negative' skip`).toEqual([{ name: '--k', reason: 'negative' }])
      expect(Object.keys(p.applied), `F-5 ${id}: never applied`).toEqual([])
    }
    const zero = asProjection(drive(() => project({ k: -0 }, { k: { name: '--k', unit: 'px' } }), 'F-5 -0'), 'F-5 -0')
    expect(zero.applied, "F-5: -0 is NOT negative (-0 < 0 is false) and IS applied as '0px'").toEqual({ '--k': '0px' })
    expect(zero.skipped, 'F-5: -0 produces no skip — the one input where a naive `<= 0` test would differ from `< 0`').toEqual([])
  })

  it('F-6 §3.2 — `sink-unusable`: a malformed sink is a TOTAL skip — one reason per key, no write attempted', async () => {
    const { project, apply } = await surface('F-6')
    const p = asProjection(
      drive(
        () => project({ a: 1, b: 2 }, { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }),
        'F-6 project',
      ),
      'F-6 project',
    )
    for (const [id, sink] of unusableSinks()) {
      const rec = recordingSink()
      const r = asApplyResult(drive(() => apply(p, sink), `F-6 ${id}`), `F-6 ${id}`)
      expect(Object.keys(r.applied), `F-6 ${id}: applied is {}`).toEqual([])
      expect(
        r.skipped,
        `F-6 ${id}: EVERY key of the projection appears in skipped with 'sink-unusable' (the whole-sink class)`,
      ).toEqual([
        { name: '--a', reason: 'sink-unusable' },
        { name: '--b', reason: 'sink-unusable' },
      ])
      expect(r.ok, `F-6 ${id}: ok === false`).toBe(false)
      expect(
        r.skipped.map((s) => s.reason).every((reason) => reason === 'sink-unusable'),
        `F-6 ${id}: ONE reason member, applied to every key — no 'projection-unusable' is invented`,
      ).toBe(true)
      expect(rec.calls, `F-6 ${id}: no write was attempted (the sink is discovered unusable without a probe write)`).toEqual([])
    }
    // The write-refusal class is DIFFERENT from this one: a throwing setProperty
    // is discovered by a write, and the run does not abort (F-7/F-8).
    const throwing = throwingSink([1, 2, 3])
    const r = asApplyResult(drive(() => apply(p, throwing.sink), 'F-6 contrast'), 'F-6 contrast')
    expect(
      r.skipped.map((s) => s.reason),
      'F-6/F-7 contrast: a CALLABLE setProperty that throws is `write-refused`, never `sink-unusable`',
    ).toEqual(['write-refused', 'write-refused'])
  })

  it('F-7 §3.2 — `write-refused`: a setProperty that throws for ONE key — the run does NOT abort', async () => {
    const { project, apply } = await surface('F-7')
    const p = asProjection(
      drive(
        () =>
          project(
            { a: 1, b: 2, c: 3 },
            { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } },
          ),
        'F-7 project',
      ),
      'F-7 project',
    )
    const rec = throwingSink([2])
    const r = asApplyResult(drive(() => apply(p, rec.sink), 'F-7 apply'), 'F-7 apply')
    expect(r.skipped, 'F-7: key 2 is skipped with `write-refused`').toEqual([{ name: '--b', reason: 'write-refused' }])
    expect(own(r.applied, '--b'), 'F-7: key 2 is ABSENT from applied (no partial write is reported)').toBe(false)
    expect(Object.keys(r.applied), 'F-7: keys 1 and 3 ARE applied — the run did not abort').toEqual(['--a', '--c'])
    expect(r.ok, 'F-7: ok === false').toBe(false)
    expect(rec.calls.map((c) => c.name), 'F-7: the sink was called for key 3 AFTER the refusal').toEqual(['--a', '--c'])
  })

  it('F-8 §3.2 — `write-refused`: a setProperty that throws for EVERY key', async () => {
    const { project, apply } = await surface('F-8')
    const p = asProjection(
      drive(
        () => project({ a: 1, b: 2 }, { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }),
        'F-8 project',
      ),
      'F-8 project',
    )
    const r = asApplyResult(drive(() => apply(p, throwingSink([1, 2]).sink), 'F-8 apply'), 'F-8 apply')
    expect(r.applied, 'F-8: applied is {}').toEqual({})
    expect(r.skipped, 'F-8: every key is `write-refused`').toEqual([
      { name: '--a', reason: 'write-refused' },
      { name: '--b', reason: 'write-refused' },
    ])
    expect(r.ok, 'F-8: ok === false').toBe(false)
  })

  it('F-9 §3.2 — a malformed `skipped` list: entries are DROPPED, the applied half still writes, `ok` is the EMITTED list’s', async () => {
    const { apply } = await surface('F-9')
    // (3) the whole-list-malformed shape.
    const wholeList = { applied: { '--a': '1' }, skipped: 'nope' } as unknown as Projection
    const recA = recordingSink()
    const rWhole = asApplyResult(drive(() => apply(wholeList, recA.sink), 'F-9 skipped="nope"'), 'F-9 skipped="nope"')
    expect(recA.calls, 'F-9 (2): the applied half is written in FULL (one setProperty per key)').toEqual([{ name: '--a', value: '1' }])
    expect(rWhole.applied, "F-9 (3): applied is {'--a': '1'}").toEqual({ '--a': '1' })
    expect(rWhole.skipped, 'F-9 (3): the malformed whole list is DROPPED ⇒ skipped []').toEqual([])
    expect(rWhole.ok, 'F-9 (4)/I-10: an all-dropped malformed list yields ok === true (ok is the EMITTED list’s)').toBe(true)
    // (3) the entry-malformed shape.
    const entryMalformed = { applied: { '--a': '1' }, skipped: [null] } as unknown as Projection
    const recB = recordingSink()
    const rEntry = asApplyResult(drive(() => apply(entryMalformed, recB.sink), 'F-9 skipped=[null]'), 'F-9 skipped=[null]')
    expect(rEntry.skipped, 'F-9 (3): the malformed ENTRY is dropped too').toEqual([])
    expect(rEntry.ok, 'F-9 (4): …and ok === true for that shape as well').toBe(true)
    expect(recB.calls, 'F-9: the applied half still wrote').toEqual([{ name: '--a', value: '1' }])
    // (5) the MIXED control: one well-formed + one malformed ⇒ length 1, ok false.
    const mixed = {
      applied: { '--a': '1' },
      skipped: [{ name: '--x', reason: 'missing-value' }, null],
    } as unknown as Projection
    const recC = recordingSink()
    const rMixed = asApplyResult(drive(() => apply(mixed, recC.sink), 'F-9 mixed'), 'F-9 mixed')
    expect(rMixed.skipped, 'F-9 (5): the well-formed entry is propagated UNCHANGED, the malformed one dropped').toEqual([
      { name: '--x', reason: 'missing-value' },
    ])
    expect(rMixed.ok, 'F-9 (5)/I-10: a MIXED list yields ok === false — the non-vacuous control').toBe(false)
  })

  it('F-10 §3.2 — a non-string `applied` value: the EXACT coercion table (primitive ⇒ String(v), non-primitive ⇒ write-refused)', async () => {
    const { apply } = await surface('F-10')
    type Case = { id: string; value: unknown; expected: string | null }
    const table: readonly Case[] = [
      { id: '12 ⇒ "12"', value: 12, expected: '12' },
      { id: '0 ⇒ "0"', value: 0, expected: '0' },
      { id: '-0 ⇒ "0"', value: -0, expected: '0' },
      { id: 'true ⇒ "true"', value: true, expected: 'true' },
      { id: 'false ⇒ "false"', value: false, expected: 'false' },
      { id: '12n ⇒ "12"', value: 12n, expected: '12' },
      { id: '"12" unchanged', value: '12', expected: '12' },
      { id: 'null ⇒ write-refused', value: null, expected: null },
      { id: 'undefined ⇒ write-refused', value: undefined, expected: null },
      { id: '{} ⇒ write-refused', value: {}, expected: null },
      { id: '[] ⇒ write-refused', value: [], expected: null },
      { id: 'a function ⇒ write-refused', value: () => 1, expected: null },
    ]
    for (const c of table) {
      const projection = { applied: { '--a': c.value }, skipped: [] } as unknown as Projection
      const before = projectSnapshot(projection)
      const rec = recordingSink()
      const r = asApplyResult(drive(() => apply(projection, rec.sink), `F-10 ${c.id}`), `F-10 ${c.id}`)
      if (c.expected === null) {
        expect(rec.calls, `F-10 ${c.id}: the sink receives NO call — String() is never applied to a non-primitive`).toEqual([])
        expect(own(r.applied, '--a'), `F-10 ${c.id}: the key is ABSENT from ApplyResult.applied`).toBe(false)
        expect(r.skipped, `F-10 ${c.id}: the key is present in skipped with 'write-refused'`).toEqual([
          { name: '--a', reason: 'write-refused' },
        ])
      } else {
        expect(rec.calls, `F-10 ${c.id}: the EXACT string the sink received`).toEqual([{ name: '--a', value: c.expected }])
        expect(r.applied, `F-10 ${c.id}: applied carries the coerced string`).toEqual({ '--a': c.expected })
        expect(r.skipped, `F-10 ${c.id}: no skip`).toEqual([])
      }
      expect(
        projectSnapshot(projection),
        `F-10 ${c.id}/I-14/F-15: the caller’s projection is UNMUTATED (the coercion produces a fresh string)`,
      ).toEqual(before)
    }
    // The symbol note is part of the ROW TEXT: a Symbol is OUTSIDE this row's
    // contract surface and no case above drives one (§7a.1 item 2).
    expect(
      table.some((c) => typeof c.value === 'symbol'),
      'F-10: no Symbol appears in this row’s table (a Symbol in `applied` is outside the row’s surface)',
    ).toBe(false)
  })

  it('F-11 §3.2 — a non-record `specOf` AND a non-record `values` are SEPARATE drives with different observables', async () => {
    const { project } = await surface('F-11')
    // (a) the specOf half: zero spec entries ⇒ both records empty.
    for (const [id, specOf] of [
      ['null', null],
      ['undefined', undefined],
      ['a string', 'x'],
      ['a number', 42],
      ['an array', []],
    ] as Array<readonly [string, unknown]>) {
      const p = asProjection(drive(() => project({ k: 1 }, specOf), `F-11(a) specOf ${id}`), `F-11(a) specOf ${id}`)
      expect(Object.keys(p.applied), `F-11(a) ${id}: zero spec entries ⇒ applied {} — no default spec is invented`).toEqual([])
      expect(p.skipped, `F-11(a) ${id}: …and skipped []`).toEqual([])
    }
    // (b) the values half: a WELL-FORMED, non-empty specOf with a non-record
    // `values` ⇒ EVERY entry is skipped `missing-value` (NEVER `skipped []`).
    const specOf = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' } }
    for (const [id, values] of [
      ['null', null],
      ['undefined', undefined],
      ['a string', 'x'],
      ['a number', 42],
      ['an array', []],
    ] as Array<readonly [string, unknown]>) {
      const p = asProjection(drive(() => project(values, specOf), `F-11(b) values ${id}`), `F-11(b) values ${id}`)
      expect(Object.keys(p.applied), `F-11(b) ${id}: applied is {} — a non-record values owns no keys`).toEqual([])
      expect(
        p.skipped,
        `F-11(b) ${id}: exactly one 'missing-value' entry per spec entry — a row asserting skipped [] for this drive FAILS`,
      ).toEqual([
        { name: '--a', reason: 'missing-value' },
        { name: '--b', reason: 'missing-value' },
      ])
      expect(
        p.skipped.some((s) => s.reason !== 'missing-value'),
        `F-11(b) ${id}: no malformed-spec / not-a-number / accessor-threw may be invented for VALUES (caller data)`,
      ).toBe(false)
    }
  })

  it('F-12 §3.2 — ONE bad key never aborts a projection: the throwing accessor driven in full over FOUR keys', async () => {
    const { project } = await surface('F-12')
    const specOf = {
      k1: { name: '--k1', unit: 'px' },
      k2: { name: '--k2', unit: 'px' },
      k3: { name: '--k3', unit: 'px' },
      k4: { name: '--k4', unit: 'px' },
    }
    // key 2 throws, key 3 is a plain finite number, key 4 is ABSENT.
    const values = valuesWithThrowingAccessor('k2', { k1: 1, k3: 3 })
    const p = asProjection(drive(() => project(values, specOf), 'F-12 plain'), 'F-12 plain')
    expect(Object.keys(p.applied), 'F-12: key 1 (before the throw) AND key 3 (after it) are applied — the projection did not stop').toEqual([
      '--k1',
      '--k3',
    ])
    expect(p.skipped, 'F-12: key 2 is `accessor-threw`, key 4 is `missing-value` — exactly one entry each').toEqual([
      { name: '--k2', reason: 'accessor-threw' },
      { name: '--k4', reason: 'missing-value' },
    ])
    expect(p.skipped.filter((s) => s.name === '--k2').length, 'F-12: exactly ONE entry for the throwing key (no duplicate)').toBe(1)
    // The `format: 'number'` variant.
    const numberSpec = {
      k1: { name: '--k1', unit: 'px', format: 'number' as const },
      k2: { name: '--k2', unit: 'px', format: 'number' as const },
      k3: { name: '--k3', unit: 'px', format: 'number' as const },
      k4: { name: '--k4', unit: 'px', format: 'number' as const },
    }
    const pn = asProjection(drive(() => project(values, numberSpec), 'F-12 format:number'), 'F-12 format:number')
    expect(pn.applied, 'F-12: the format:number variant emits the bare numbers for the same keys').toEqual({ '--k1': '1', '--k3': '3' })
    expect(pn.skipped.map((s) => s.reason), 'F-12: …with the same reasons').toEqual(['accessor-threw', 'missing-value'])
    // The duplicate-name variant: the precedence still holds for its own entry.
    const dupSpec = {
      k1: { name: '--dup', unit: 'px' },
      k2: { name: '--k2', unit: 'px' },
      k3: { name: '--dup', unit: 'px' },
      k4: { name: '--k4', unit: 'px' },
    }
    const pd = asProjection(drive(() => project(values, dupSpec), 'F-12 duplicate-name variant'), 'F-12 duplicate-name variant')
    expect(pd.applied, 'F-12: the FIRST `--dup` (key 1) is applied and the second (key 3) is a duplicate').toEqual({ '--dup': '1px' })
    expect(
      pd.skipped.map((s) => s.reason),
      'F-12: `duplicate-name` still wins for its own entry, `accessor-threw`/`missing-value` for theirs',
    ).toEqual(['duplicate-name', 'accessor-threw', 'missing-value'])
    // …and a repeat call is deep-equal (I-4).
    expect(projectSnapshot(asProjection(drive(() => project(values, specOf), 'F-12 repeat'), 'F-12 repeat'))).toEqual(projectSnapshot(p))
  })

  it('F-13 §3.2 — the prototype-shaped key HAZARD, falsifiably: (a) own-key reads, (b) collision vs prototype, (c) an own specOf entry', async () => {
    const { project } = await surface('F-13')
    // (a) a plain-object `values` with NO own property of that name.
    const plain: Record<string, unknown> = { real: 1 }
    for (const name of DANGEROUS_NAMES) {
      const p = asProjection(drive(() => project(plain, { k: { name, unit: '' } }), `F-13(a) ${name}`), `F-13(a) ${name}`)
      const looked = (plain as Record<string, unknown>)[name]
      const expectedReason: ProjectionSkipReason =
        typeof looked === 'number' && Number.isFinite(looked) && looked >= 0 ? 'applied-impossible' as never : typeof looked === 'undefined' ? 'missing-value' : 'not-a-number'
      expect(
        p.skipped.map((s) => s.reason),
        `F-13(a) ${name}: NEVER applied from an inherited value — the own-property read yields '${
          typeof looked
        }' ⇒ ${expectedReason} (the module’s prototype chain is not a value source)`,
      ).toEqual([expectedReason])
      expect(Object.keys(p.applied), `F-13(a) ${name}: nothing is applied from the prototype`).toEqual([])
      expect(Object.getPrototypeOf(p.applied), `F-13(a) ${name}: the record’s prototype is null`).toBe(null)
    }
    // (b) two spec entries both producing `name: 'constructor'`: the detection set
    // must not see an INHERITED member as already-seen.
    for (const name of DANGEROUS_NAMES) {
      const p = asProjection(
        drive(
          () => project({ a: 1, b: 2 }, { a: { name, unit: '' }, b: { name, unit: '' } }),
          `F-13(b) ${name}`,
        ),
        `F-13(b) ${name}`,
      )
      expect(own(p.applied, name), `F-13(b) ${name}: the FIRST is applied (never misdiagnosed as duplicate)`).toBe(true)
      expect(p.skipped, `F-13(b) ${name}: the SECOND is skipped 'duplicate-name'`).toEqual([{ name, reason: 'duplicate-name' }])
    }
    // (c) a specOf carrying an own '__proto__' entry read as its own entry.
    const name = DANGEROUS_NAMES[0]
    const specMap: Record<string, unknown> = {}
    Object.defineProperty(specMap, name, {
      value: { name: '--own', unit: '' },
      enumerable: true,
      configurable: true,
      writable: true,
    })
    const p = asProjection(drive(() => project({ k: 4 }, specMap), 'F-13(c)'), 'F-13(c)')
    expect(own(p.applied, '--own'), 'F-13(c): the own entry is read as its own entry and yields its formatted value').toBe(true)
    expect(p.applied['--own'], 'F-13(c): the caller’s formatted value').toBe('4')
    expect(Object.getPrototypeOf(p.applied), 'F-13(c): the record it yields has a null prototype').toBe(null)
    expect(Object.getPrototypeOf(plain), 'F-13: NO object’s prototype was written by any drive above').toBe(Object.prototype)
  })

  it('F-14 §3.2 — a re-entrant setProperty: both calls’ results stay CALL-LOCAL, and no guard refuses the nested call', async () => {
    const { project, apply } = await surface('F-14')
    const outerP = asProjection(
      drive(
        () => project({ a: 1, b: 2 }, { a: { name: '--outer-a', unit: 'px' }, b: { name: '--outer-b', unit: 'px' } }),
        'F-14 outer projection',
      ),
      'F-14 outer projection',
    )
    const innerP = asProjection(
      drive(() => project({ z: 9 }, { z: { name: '--inner-z', unit: 'px' } }), 'F-14 inner projection'),
      'F-14 inner projection',
    )
    const innerRec = recordingSink()
    const outerRec = recordingSink()
    let innerFired = 0
    let innerResult: ApplyResult | null = null
    const reentrant: VarWriteSink = {
      style: {
        setProperty(name: string, value: string): void {
          outerRec.calls.push({ name, value })
          if (innerFired === 0) {
            innerFired += 1
            innerResult = asApplyResult(drive(() => apply(innerP, innerRec.sink), 'F-14 inner call'), 'F-14 inner call')
          }
        },
      },
    }
    const outer = asApplyResult(drive(() => apply(outerP, reentrant), 'F-14 outer call'), 'F-14 outer call')
    expect(innerFired, 'F-14/I-14: the nested call RAN — no guard exists to refuse it (a guard would be state)').toBe(1)
    expect(outerRec.calls.map((c) => c.name), 'F-14: the outer call’s remaining keys are still written after the re-entrant return').toEqual([
      '--outer-a',
      '--outer-b',
    ])
    expect(Object.keys(outer.applied), 'F-14/I-3: the OUTER result reports exactly its own call’s writes').toEqual(['--outer-a', '--outer-b'])
    expect(
      Object.keys(outer.applied).includes('--inner-z'),
      'F-14: the inner call’s keys are ABSENT from the outer applied',
    ).toBe(false)
    const inner = innerResult as unknown as ApplyResult
    expect(Object.keys(inner.applied), 'F-14: the inner result is its own call’s log').toEqual(['--inner-z'])
    expect(inner.skipped, 'F-14: the inner call’s skips are absent from the outer skipped, and vice versa').toEqual([])
    expect(outer.skipped, 'F-14: …and the outer result carries no inner skip').toEqual([])
    for (const name of ['--outer-a', '--outer-b']) {
      expect(
        outerRec.calls.filter((c) => c.name === name).length,
        `F-14/§2.3 item 7: '${name}' is written exactly once PER CALL at the outer sink`,
      ).toBe(1)
    }
    // The variant where the inner call targets the SAME sink.
    const sharedRec = recordingSink()
    let sharedInner = 0
    const sharedSink: VarWriteSink = {
      style: {
        setProperty(name: string, value: string): void {
          sharedRec.calls.push({ name, value })
          if (sharedInner === 0) {
            sharedInner += 1
            apply(innerP, sharedSink)
          }
        },
      },
    }
    const sharedOuter = asApplyResult(drive(() => apply(outerP, sharedSink), 'F-14 shared sink'), 'F-14 shared sink')
    expect(sharedInner, 'F-14: the same-sink variant’s nested call ran').toBe(1)
    expect(
      Object.keys(sharedOuter.applied),
      'F-14: the outer result still reports only its own writes on the SHARED sink (the interleaving is the sink’s)',
    ).toEqual(['--outer-a', '--outer-b'])
    expect(sharedOuter.ok, 'F-14: neither call’s ok absorbs the other’s').toBe(true)
  })

  it('F-15 §3.2 — the caller’s projection is IMMUTABLE across a call: the FOUR pinned observables, never a JSON round-trip', async () => {
    const { project, apply } = await surface('F-15')
    const name = DANGEROUS_NAMES[0]
    const values = { k1: 1, k2: 2 }
    const specOf = { k1: { name, unit: '' }, k2: { name: '--two', unit: 'px' } }
    const p = asProjection(drive(() => project(values, specOf), 'F-15 project'), 'F-15 project')
    const before = projectSnapshot(p)
    // (i)-(iv) asserted BEFORE the call, by identity for the prototype.
    expect(Object.keys(p.applied), 'F-15 (i): Object.keys(p.applied) in order, before the call').toEqual([name, '--two'])
    expect(before.values, 'F-15 (ii): each value read by Object.hasOwn + index').toEqual([
      [name, '1'],
      ['--two', '2px'],
    ])
    expect(before.skipped, 'F-15 (iii): p.skipped deep-equal by value').toEqual([])
    expect(Object.getPrototypeOf(p.applied), 'F-15 (iv): asserted by IDENTITY against null, never by truthiness').toBe(null)
    // The call: the sink throws for one key and succeeds for another.
    const rec = throwingSink([2])
    asApplyResult(drive(() => apply(p, rec.sink), 'F-15 apply'), 'F-15 apply')
    const after = projectSnapshot(p)
    expect(
      immutabilityBreaks(before, after, projectSnapshot(project(values, specOf)), 'F-15'),
      'F-15: p is unchanged in EVERY observable respect — no new key, no deleted key, no cached marker, no added field',
    ).toEqual([])
    expect(own(p.applied, name), 'F-15: an own __proto__ key is STILL an own key after the call').toBe(true)
    expect(Object.keys(p), 'F-15: the projection object itself gains no field').toEqual(['applied', 'skipped'])
    expect(
      Object.getOwnPropertyNames(p).sort(),
      'F-15: …and no non-enumerable marker/field was cached into it',
    ).toEqual(['applied', 'skipped'])
    // The frozen half is SHALLOW and is the HARNESS's: the record and the
    // projection, one level each — the skipped array is NOT frozen.
    const frozenValues = { k1: 1 }
    const frozenP = project(frozenValues, { k1: { name: '--one', unit: 'px' } })
    Object.freeze(frozenP.applied)
    Object.freeze(frozenP)
    expect(Object.isFrozen(frozenP.applied) && Object.isFrozen(frozenP), 'F-15: the harness froze the record and the projection').toBe(true)
    expect(Object.isFrozen(frozenP.skipped), 'F-15/§2.5 item 5(i): the skipped ARRAY is NOT frozen (shallow freeze only)').toBe(false)
    const frozenRec = recordingSink()
    const frozenResult = asApplyResult(
      drive(() => apply(frozenP, frozenRec.sink), 'F-15 frozen p'),
      'F-15 frozen p',
    )
    expect(frozenRec.calls, 'F-15: a FROZEN p is accepted without a throw and writes normally').toEqual([{ name: '--one', value: '1px' }])
    expect(frozenResult.ok, 'F-15: …and reports ok === true').toBe(true)
    // And a consumer wanting different writes builds a NEW projection.
    const other = asProjection(
      drive(() => project({ k1: 4 }, { k1: { name: '--one', unit: 'px' } }), 'F-15 new projection'),
      'F-15 new projection',
    )
    expect(other.applied, 'F-15/I-14: the sanctioned route is a NEW project(values, specOf) — p was never edited in place').toEqual({
      '--one': '4px',
    })
    expect(projectSnapshot(p), 'F-15: …and the original p still reads its own, unchanged value').toEqual(before)
  })
})

// ===========================================================================
// §3.4/§3.5 — THE STATIC AND EXISTENCE ROWS (`R-17`..`R-23`).
// §4.2: `R-19`..`R-21` and `R-23` are evaluable NOW (they read existing
// paths/tests); `R-17`/`R-18`/`R-22` become evaluable once the module exists.
// ===========================================================================

/** The `rawSpellingViolations` half of the scan, named separately so `PRE-3` can
 *  assert the negative control against it. */
function rawSpellingViolations(src: string): string[] {
  const raw = src.toLowerCase()
  return VOCAB_WORDS.filter((word) => raw.includes(word.toLowerCase())).map((word) => `RAW occurrence of '${word}'`)
}

describe('R — §3.4/§3.5 the static + existence rows', () => {
  it('R-17 §3.4 — the anti-evasion vocabulary row: no consumer vocabulary in the module (comments scanned, assembly closed)', () => {
    const raw = moduleSource('R-17 §2.2 prohibition 1')
    // (1)+(2): the module's own source, INCLUDING its comments, with literal
    // values and identifiers assembled before the scan (S-12).
    expect(
      rawSpellingViolations(raw),
      `R-17/§2.2 prohibition 1 — no RAW occurrence of the consumer vocabulary anywhere in the module (a comment naming one is a re-entry signal): ${JSON.stringify(
        staticHits(raw, new RegExp(VOCAB_WORDS.join('|'), 'i')),
      )}`,
    ).toEqual([])
    const violations = vocabularyViolations(raw)
    expect(
      violations,
      `R-17 (S-12): no ASSEMBLED occurrence either — a spelling split across literals (or reassembled out of identifiers) is the SAME violation: ${JSON.stringify(
        violations,
      )}`,
    ).toEqual([])
    // (3): the unit's own `[T]` fixtures in THIS file, under the same scan. The
    // row's own vocabulary DATA is carried as fragments (above), so the joined
    // token never appears; the assembled view therefore must not reassemble one.
    const mine = vocabularyViolations(testSource())
    expect(
      mine,
      `R-17/§7a.1 item 11(b): the unit's own fixtures carry NO spelling of the banned vocabulary, raw or assembled: ${JSON.stringify(
        mine,
      )}`,
    ).toEqual([])
    // …and the row's controls are live (S-12 requires both halves before filing).
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(vocabularyViolations(fixture).length, `R-17 positive control (${shape}) FAILS the scan`).toBeGreaterThan(0)
    }
    expect(vocabularyViolations(VOCAB_NEGATIVE_CONTROL), 'R-17 negative control (the unit’s legitimate text) PASSES').toEqual([])
  })

  it('R-18 §3.4 — the forbidden-ACCESS row: no access rooted in a banned realm token or an alias of one', () => {
    const raw = moduleSource('R-18 §3.4')
    const code = stripComments(raw)
    expectNoStaticHits(
      code,
      [
        {
          what: 'a realm/ambient global (a banned realm TOKEN: §2.2 prohibition 1 + Layer anchor 3 — the sink is injected)',
          re: /\b(document|window|globalThis|self|top|parent|frames|matchMedia|getComputedStyle|getPropertyValue|querySelector|querySelectorAll|getElementById|activeElement)\b/,
        },
        { what: 'a computed access on a banned realm token or an alias of one', re: /\b(document|window|globalThis|self)\s*\[/ },
        { what: 'a random/time ambient read (§2.4 item 1 purity)', re: /\b(Math\.random|Date\.now|new\s+Date|performance\.now)\b/ },
        { what: 'a process/env read (§2.4 item 1 purity)', re: /\b(process\.env|process\.argv)\b/ },
        { what: 'a node realm read', re: /\b(require\s*\(|__dirname|__filename|import\.meta\.url)\b/ },
        { what: 'an eval/Function-constructed access (the same violation as the token)', re: /\b(eval|Function)\s*\(/ },
      ],
      'R-18 §3.4',
    )
    // The alias class: a binding whose initialiser is a banned realm token, then
    // an access through that binding (`const g = globalThis; g.document`).
    const aliases = [...code.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(document|window|globalThis|self)\b/g)].map((m) => m[1])
    expect(
      aliases,
      `R-18: no alias of a banned realm token exists (an alias is the SAME violation as the token, S-13): ${JSON.stringify(aliases)}`,
    ).toEqual([])
    // THE STATED LIMIT (§4.4 S-13): a blanket `[expr]` ban is NOT assertable and
    // is NOT claimed. A locally constructed object's computed access and ordinary
    // array indexing are DELIBERATELY not banned — so the module is still allowed
    // to index its own arrays, and this row does not fail it for doing so.
    expect(
      /\w+\s*\[/.test('const first = collected[index]'),
      'R-18 STATED LIMIT: ordinary array indexing (`collected[index]`) carries no banned token and is NOT banned (a row asserting "no [expr] at all" FAILS this row’s own text — §4.4 S-13)',
    ).toBe(true)
    expect(
      aliases.length,
      'R-18: the alias scan above is the assertable half; the token scan is the other — both are empty for a conforming module',
    ).toBe(0)
  })

  it('R-19 §3.4 — the import-boundary row: the module imports NOTHING (at most a TYPE-only import from src/shared/**)', () => {
    const raw = moduleSource('R-19 §3.4')
    const code = stripComments(raw)
    expectNoStaticHits(
      code,
      [
        { what: 'an import from src/main/** (the MCP/security seam)', re: /\bfrom\s+['"][^'"]*(\/main\/|main\/)/ },
        { what: 'an import from src/renderer/**', re: /\bfrom\s+['"][^'"]*(\/renderer\/|renderer\/)/ },
        { what: 'an import from shared/types (the RpcMethod surface)', re: /\bfrom\s+['"][^'"]*shared\/types/ },
        { what: 'the electron module', re: /\bfrom\s+['"]electron['"]/ },
        { what: 'a node:* builtin (including node:fs — the prohibition binds the MODULE, never this test file)', re: /\bfrom\s+['"]node:/ },
        { what: 'provident-ssr (the engine)', re: /\bfrom\s+['"]provident-ssr['"]/ },
        { what: 'a zones/census/sibling-mechanism module (rulings 1/5)', re: /\bfrom\s+['"][^'"]*(zones?|census|owned-list-host|slot-host|mount-invariant-guard|path-fork-cycle)[^'"]*['"]/ },
        { what: 'a dynamic import of anything (§2.2 prohibition 5’s seam half)', re: /\bimport\s*\(/ },
        { what: 'a CommonJS require', re: /\brequire\s*\(/ },
        { what: 'a tool/resource/group registration', re: /\b(registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|RpcMethod)\b/ },
      ],
      'R-19 §3.4',
    )
    // The POSITIVE half of the boundary: only type-only imports from src/shared/**.
    const specifiers = [...code.matchAll(/from\s+(['"`])([^'"`]+)\1/g)].map((m) => m[2])
    const badInline = [...code.matchAll(/\bimport\s+(['"`])([^'"`]+)\1/g)].map((m) => m[2])
    expect(badInline, `R-19: no bare side-effect import exists: ${JSON.stringify(badInline)}`).toEqual([])
    for (const spec of specifiers) {
      expect(
        /^\.\.?\//.test(spec) && /shared\//.test(spec),
        `R-19: the specifier '${spec}' must be a RELATIVE import from src/shared/** (at most a TYPE-only import — rulings 1/5)`,
      ).toBe(true)
    }
    for (const line of code.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('import ')) continue
      expect(
        /^import\s+type\s/.test(trimmed),
        `R-19: every import line is a TYPE-only import (this unit may import nothing at run time): ${JSON.stringify(trimmed)}`,
      ).toBe(true)
    }
  })

  it('R-20 §3.4 — the diff-scope row: this unit touches only the module + this test file (no src/**, no scripts/**, no package.json)', () => {
    // The unit's own change set, read from git (read-only; this row never edits).
    let porcelain = ''
    try {
      porcelain = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
    } catch (e) {
      porcelain = `<<git unavailable: ${describeThrown(e)}>>`
    }
    const paths = porcelain
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.slice(3).trim().replace(/^"|"$/g, ''))
    const ALLOWED: readonly string[] = ['src/shared/layout-projection.ts', 'tests/layout-projection.test.ts']
    for (const path of paths) {
      expect(
        ALLOWED.includes(path),
        `R-20/§5.1: '${path}' is OUTSIDE this unit's diff scope (only ${ALLOWED.join(' + ')} may be touched) — git status said: ${JSON.stringify(
          porcelain,
        )}`,
      ).toBe(true)
    }
    // §5.1's named OUT-OF-SCOPE paths are untouched by this unit's change set.
    for (const path of paths) {
      expect(
        /^src\/shared\/dom-shim\.ts$/.test(path) || /^src\/shared\/types\.ts$/.test(path) || /^src\/(main|renderer)\//.test(path),
        `R-20: '${path}' is outside the scope — the shim, shared types and the main/renderer trees are UNTOUCHED`,
      ).toBe(false)
    }
    // The shim gains NO member: `setProperty` must not be added to it (S-2).
    const shimSource = readFileSync(new URL('../src/shared/dom-shim.ts', import.meta.url), 'utf8')
    expect(
      staticHits(shimSource, /\bsetProperty\b/),
      'R-20/S-2: `src/shared/dom-shim.ts` gains NO `setProperty` member — the sink is a caller-supplied object, never the shim element',
    ).toEqual([])
    // `package.json` gains no dependency and the devDependency KEY SET stays five.
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
      scripts: Record<string, string>
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
    expect(
      Object.keys(pkg.devDependencies).sort(),
      'R-20/§5.5.1: devDependencies stays the FIVE keys — no property runner, no fast-check, no new dependency',
    ).toEqual(['@types/node', 'electron', 'esbuild', 'typescript', 'vitest'])
    expect(
      pkg.dependencies['provident-ssr'],
      'R-20: the provident-ssr pin is untouched by this unit',
    ).toBe('^0.5.1')
    expect(
      existingTestFiles(),
      'R-20/§5.1: no EXISTING test file is modified by this unit’s change set (the sibling red sets are untouchable)',
    ).toEqual([])
  })

  it('R-21 §3.4 — the five-seam NEGATIVE row: the seam census is name-complete and this unit adds NO seam', () => {
    const sibling = new URL('./engine-pin-version.test.ts', import.meta.url)
    expect(
      existsSync(sibling),
      'R-21: `tests/engine-pin-version.test.ts`’s existing R-15/R-15a/R-15b rows exist and run in the same node suite (they are the seam half — this row does not re-author them)',
    ).toBe(true)
    const src = readFileSync(sibling, 'utf8')
    // The tool seam is asserted against the PINNED 21-NAME set — a NEW seam fails
    // it BY NAME (S-14: never by count alone). Read from the sibling's OWN
    // `PINNED_TOOL_SET`, which is name-complete.
    const setAt = src.indexOf('PINNED_TOOL_SET')
    expect(
      setAt,
      'R-21: the sibling census declares its PINNED_TOOL_SET (a name-complete assertion, cited here rather than re-authored)',
    ).toBeGreaterThan(-1)
    const setBody = src.slice(setAt, src.indexOf(']', setAt))
    const pinnedNames = [...setBody.matchAll(/'([^'\n]+)'/g)].map((m) => m[1])
    expect(
      pinnedNames.length,
      'R-21: the sibling census pins the 21 tool NAMES (a SET assertion — a new or removed seam fails it BY NAME)',
    ).toBe(21)
    expect(
      new Set(pinnedNames).size,
      'R-21: the pinned tool names are distinct (a set, not a bag)',
    ).toBe(21)
    const code = stripComments(moduleSource('R-21 the module must add no seam'))
    expectNoStaticHits(
      code,
      [
        { what: 'a new tool/resource/group registration', re: /\b(registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|ALL_TOOLS)\b/ },
        { what: 'an IPC method surface', re: /\b(ipcRenderer|ipcMain|RpcMethod|RpcRequest)\b/ },
        { what: 'an import from the seam trees (the import half is R-19; here the point is that no seam is ADDED)', re: /\bfrom\s+['"][^'"]*(main|renderer)\// },
      ],
      'R-21 §3.4',
    )
  })

  it('R-22 §3.5 — the export-census row: SET EQUALITY over the four value exports and the seven type names', async () => {
    const { mod } = await surface('R-22 §2.1 export census')
    // (a) the RUNTIME value exports: exactly the four names (a fifth value export
    // FAILS — never a count assertion, S-14).
    expect(
      Object.keys(mod).sort(),
      'R-22(a): the module’s RUNTIME exports are EXACTLY project · projectVar · applyProjection · applyVarsToRoot — a NINTH (fifth value) export fails this set equality',
    ).toEqual(['applyProjection', 'applyVarsToRoot', 'project', 'projectVar'])
    expect(
      (mod['project'] as unknown) === (mod['applyVarsToRoot'] as unknown),
      'R-22(a): `applyVarsToRoot` is NOT the same function as `project` (M-14’s identity is between applyVarsToRoot and applyProjection)',
    ).toBe(false)
    // (b) the TYPE-only names: a type-only name is not a runtime key, so this
    // half is read as a TYPE-level assertion (A-15’s idiom).
    type ImportedModule = typeof import('../src/shared/layout-projection.js')
    const typeHalf: ProjectionSurface = null as unknown as ImportedModule
    void typeHalf
    const typeValue: VarValues = { k: 1 }
    const typeSpec: VarSpec = { name: '--t', unit: 'px' }
    const typeReason: ProjectionSkipReason = 'accessor-threw'
    const typeSkip: ProjectionSkip = { name: '--t', reason: typeReason }
    const typeProjection: Projection = { applied: { '--t': '1px' }, skipped: [typeSkip] }
    const typeSink: VarWriteSink = { style: { setProperty: () => undefined } }
    const typeResult: ApplyResult = { applied: {}, skipped: [], ok: true }
    expect(
      [typeValue, typeSpec, typeSkip, typeProjection, typeSink, typeResult].length,
      'R-22(b): the SEVEN type names (VarValues · VarSpec · ProjectionSkipReason · ProjectionSkip · Projection · VarWriteSink · ApplyResult) are all exported by the module — this row does not compile unless they are',
    ).toBe(6)
  })

  it('R-23 §3.5 — the absent-page-design PROBE: `docs/skills/designing-pages.md` does not exist (a FAIL is meaningful)', () => {
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    const exists = existsSync(pageDesign)
    expect(
      exists,
      'R-23/§7 item 9 — `docs/skills/designing-pages.md` DOES NOT EXIST at the time this red set runs. ' +
        'IF IT EXISTS this row FAILS MEANINGFULLY: the unit then OWES a test-use-case coverage row in that ' +
        'file’s coverage matrix PLUS an entry in its demo-page index (per §7 item 9’s own clause), because ' +
        '§5.5.1 is a register whose rows are quantifications.',
    ).toBe(false)
    // The probe's own instrument is real (not a restatement): the sibling path
    // that DOES exist resolves through the same mechanism.
    expect(
      existsSync(new URL('../docs/skills/process-guardrails.md', import.meta.url)),
      'R-23: the probe is not vacuous — `docs/skills/process-guardrails.md` DOES exist, so `existsSync` on the sibling path answers true',
    ).toBe(true)
  })
})

/** The EXISTING test files that this unit’s change set must not have touched. */
function existingTestFiles(): string[] {
  let porcelain = ''
  try {
    porcelain = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
  } catch {
    return []
  }
  return porcelain
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => line.slice(3).trim().replace(/^"|"$/g, ''))
    .filter((path) => /^tests\//.test(path) && path !== 'tests/layout-projection.test.ts')
}

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER (8 rows, ALL executed deterministically).
//
// Type algebra (`docs/specs/engine-pin.md` §5.5's): `P-IM` invariant ·
// `P-SM` state-machine · `P-TP` totality. Each row's `it` title carries the row
// id AND its `S-PJ-*` strategy id. Caps: <=100 attempts per row, <=400 total,
// register order, STOP AFTER 5 CONSECUTIVE FAILURES. `P-PJ-IM-1`,
// `P-PJ-TP-1` and `P-PJ-IM-5` are `YES (bounded)` — none is a proof of its
// unbounded universal.
// ===========================================================================

/** `P-PJ-IM-2`'s axes: the six dangerous names × three host shapes, + four fixed. */
const OWNKEY_HOST_SHAPES: readonly string[] = ['(a) the name applied', '(b) the name not owned by a plain values (F-13(a))', '(c) two specs naming it (F-13(b))']
const OWNKEY_FIXED_SHAPES: readonly string[] = [
  '(1) an own __proto__ specOf entry (F-13(c))',
  '(2) an own-key-only values built with Object.defineProperty',
  '(3) an ordinary-name control projection (M-19)',
  '(4) the __proto__ projection against a recording fake sink (M-20)',
]

/** `P-PJ-IM-3`'s axes: 3 accessor variants × 4 positions × 3 neighbour dispositions. */
const ACCESSOR_VARIANTS: readonly string[] = [
  '(a) an own accessor that always throws',
  '(b) an own accessor that throws only on its SECOND read (the memoization trap)',
  '(c) a frozen values object carrying the same throwing own accessor',
]
const ACCESSOR_POSITIONS: readonly string[] = ['k1', 'k2', 'k3', 'k4']
const ACCESSOR_DISPOSITIONS: readonly string[] = [
  '(i) all three others finite and applied',
  '(ii) one other key ABSENT (missing-value)',
  '(iii) one other key NaN (not-a-number)',
]

/** `P-PJ-IM-5`'s value table (26 entries × 2 format drives). */
type NumericEntry = {
  id: string
  value: unknown
  /** `null` ⇒ the value is a SKIP; otherwise the exact expected string. Held as
   *  a thunk because `String(symbol)` throws and must never be forced. */
  expect: () => string | null
  expectedReason?: ProjectionSkipReason
}
const NUMERIC_TABLE: readonly NumericEntry[] = (() => {
  const entry = (
    id: string,
    value: unknown,
    expectFn: () => string | null,
    expectedReason?: ProjectionSkipReason,
  ): NumericEntry => ({ id, value, expect: expectFn, expectedReason })
  const skip = (reason: ProjectionSkipReason): (() => string | null) => () => null
  const num = (expected: string): (() => string | null) => () => expected
  return [
    entry('NaN', NaN, skip('not-a-number'), 'not-a-number'),
    entry('+Infinity', Infinity, skip('not-a-number'), 'not-a-number'),
    entry('-Infinity', -Infinity, skip('not-a-number'), 'not-a-number'),
    entry('-1', -1, skip('negative'), 'negative'),
    entry('-Number.MIN_VALUE', -Number.MIN_VALUE, skip('negative'), 'negative'),
    entry('-0', -0, num('0px')),
    entry('0', 0, num('0px')),
    entry('Number.MIN_VALUE', Number.MIN_VALUE, num(`${String(Number.MIN_VALUE)}px`)),
    entry('Number.MAX_VALUE', Number.MAX_VALUE, num(`${String(Number.MAX_VALUE)}px`)),
    entry('1e21', 1e21, num('1e+21px')),
    entry('1e-21', 1e-21, num('1e-21px')),
    entry('0.1 + 0.2 (the float-printing control)', 0.1 + 0.2, num(`${String(0.1 + 0.2)}px`)),
    entry("'12'", '12', skip('not-a-number'), 'not-a-number'),
    entry('true', true, skip('not-a-number'), 'not-a-number'),
    entry('false', false, skip('not-a-number'), 'not-a-number'),
    entry('null', null, skip('not-a-number'), 'not-a-number'),
    entry('undefined (present)', undefined, skip('not-a-number'), 'not-a-number'),
    entry('{}', {}, skip('not-a-number'), 'not-a-number'),
    entry('[]', [], skip('not-a-number'), 'not-a-number'),
    entry('a BigInt', 12n, skip('not-a-number'), 'not-a-number'),
    entry('a Symbol', Symbol('s'), skip('not-a-number'), 'not-a-number'),
    entry('a function', () => 1, skip('not-a-number'), 'not-a-number'),
    entry('a finite negative with unit:""', -3, skip('negative'), 'negative'),
    entry('a finite non-negative with unit:""', 3, num('3')),
    entry('-0 re-driven with format:"number"', -0, num('0')),
    entry('0 re-driven with format:"number"', 0, num('0')),
  ]
})()
const NUMERIC_FORMATS: readonly ('unit' | 'number')[] = ['unit', 'number']

/** `P-PJ-IM-7`'s three table rows × four drives. */
const THROW_TABLE: ReadonlyArray<{ id: string; throwing: readonly string[] }> = [
  { id: '(1) all 4 keys throwing', throwing: ['k1', 'k2', 'k3', 'k4'] },
  { id: '(2) k1/k3 throwing, k2/k4 finite', throwing: ['k1', 'k3'] },
  { id: '(3) k2/k4 throwing, k1/k3 finite (the complement)', throwing: ['k2', 'k4'] },
]
const THROW_DRIVES: readonly string[] = [
  '(i) the plain drive',
  "(ii) format: 'number' on every spec",
  '(iii) two specs sharing a name (the precedence control)',
  '(iv) a frozen values object',
]

/** `P-PJ-IM-8`'s ten fixed reuse/re-entrancy shapes. */
const REUSE_SHAPES: ReadonlyArray<{ id: string }> = [
  { id: '(1) K=3 × sinks A,A (the same sink twice)' },
  { id: '(2) the same projection × sinks A,B' },
  { id: '(3) a 3-call sequence A,B,A' },
  { id: '(4) the same projection via applyVarsToRoot twice (M-14’s identity)' },
  { id: '(5) a projection with an empty applied, reused twice' },
  { id: '(6) a projection whose skipped carries write-refused entries, reused twice' },
  { id: '(7) an inner applyProjection from the FIRST key, the same projection' },
  { id: '(8) the inner call targeting the SAME sink' },
  { id: '(9) an inner call with a DIFFERENT projection' },
  { id: '(10) a frozen projection driven once' },
]

/** `P-PJ-TP-1`'s 20-shape pool (`S-PJ-POOL-1`). Each member names the axis it
 *  drives: `project` (a `values`/`specOf` pair for the pure half) or `apply` (a
 *  projection/sink argument for the applier half). */
type TpShape = {
  id: string
  axis: 'project' | 'apply'
  make: () => { values?: unknown; specOf?: unknown; projection?: unknown }
}
const TP_POOL: readonly TpShape[] = [
  { id: '(1) null as values', axis: 'project', make: () => ({ values: null, specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(2) undefined as values', axis: 'project', make: () => ({ values: undefined, specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(3) a string as values', axis: 'project', make: () => ({ values: 'str', specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(4) a number as values', axis: 'project', make: () => ({ values: 7, specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(5) an array as values', axis: 'project', make: () => ({ values: [1, 2], specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(6) a frozen values object (M-9)', axis: 'project', make: () => ({ values: Object.freeze({ k: 1 }), specOf: { k: { name: '--k', unit: 'px' } } }) },
  { id: '(7) a frozen nested spec object (M-9)', axis: 'project', make: () => ({ values: { k: 1 }, specOf: { k: Object.freeze({ name: '--k', unit: 'px' }) } }) },
  {
    id: '(8) a values object bearing an own accessor that throws (F-4B)',
    axis: 'project',
    make: () => ({ values: valuesWithThrowingAccessor('k', {}), specOf: { k: { name: '--k', unit: 'px' } } }),
  },
  {
    id: '(9) a getter-bearing plain object (no throw)',
    axis: 'project',
    make: () => {
      const values: Record<string, unknown> = {}
      Object.defineProperty(values, 'k', { get: () => 3, enumerable: true, configurable: true })
      return { values, specOf: { k: { name: '--k', unit: 'px' } } }
    },
  },
  { id: '(10) a non-record specOf (F-1/F-11)', axis: 'project', make: () => ({ values: { k: 1 }, specOf: 42 }) },
  { id: '(11) a null projection argument (M-11)', axis: 'apply', make: () => ({ projection: null }) },
  { id: '(12) a 42 projection argument (M-11)', axis: 'apply', make: () => ({ projection: 42 }) },
  { id: '(13) a "nope" projection argument (M-11)', axis: 'apply', make: () => ({ projection: 'nope' }) },
  {
    id: '(14) a hand-built {applied, skipped:[]} projection (M-13)',
    axis: 'apply',
    make: () => ({ projection: { applied: { '--a': '1' }, skipped: [] } }),
  },
  { id: '(15) a projection with an empty applied and skipped (M-12)', axis: 'apply', make: () => ({ projection: { applied: {}, skipped: [] } }) },
  { id: '(16) a projection whose skipped is "nope" (F-9)', axis: 'apply', make: () => ({ projection: { applied: { '--a': '1' }, skipped: 'nope' } }) },
  { id: '(17) a projection whose skipped is [null] (F-9)', axis: 'apply', make: () => ({ projection: { applied: { '--a': '1' }, skipped: [null] } }) },
  {
    id: '(18) a non-string applied value: 12, then null (the F-10 pair)',
    axis: 'apply',
    make: () => ({ projection: { applied: { '--a': 12 }, skipped: [] } }),
  },
  {
    id: '(19) a 3-key spec with a NaN value and a -1 value',
    axis: 'project',
    make: () => ({
      values: { a: NaN, b: -1, c: 1 },
      specOf: { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } },
    }),
  },
  {
    id: '(20) a 3-key spec with two keys naming the SAME --dup',
    axis: 'project',
    make: () => ({
      values: { a: 1, b: 2 },
      specOf: { a: { name: '--dup', unit: 'px' }, b: { name: '--dup', unit: 'px' } },
    }),
  },
]
const TP_DRAWS = 60
const TP_HALVES: readonly ('project' | 'apply')[] = ['project', 'apply']
const TP_SINKS: readonly string[] = ['null', '{style:{}}', 'throwing', 'counting', 'recording']
const TP_DRAW_INDICES: readonly number[] = (() => {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < TP_DRAWS; i += 1) out.push(lcg.step() % TP_POOL.length)
  return out
})()

describe('§5.5.1 — the typed property register (8 rows, executed deterministically, no PBT harness)', () => {
  it('P-PJ-IM-1 [S-PJ-DECISION-1] — for EVERY spec entry, EXACTLY ONE decision (the fixed 23-drive decision table) — YES (bounded)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-1', 'S-PJ-DECISION-1')
    const check = (c: DecisionClass, label: string): string | null => {
      if (project === null) return reason
      let p: Projection
      try {
        p = project(c.values, c.specOf) as Projection
      } catch (e) {
        return `THREW: ${describeThrown(e)} — §2.4 item 2 / I-7: project never throws for any input`
      }
      if (p === null || typeof p !== 'object') return `project returned ${brief(p)} — §2.1 declares a Projection`
      const applied = p.applied
      const skipped = p.skipped
      if (applied === null || typeof applied !== 'object') return 'Projection.applied is not a record'
      if (!Array.isArray(skipped)) return 'Projection.skipped is not an array'
      const appliedNames = Object.keys(applied)
      const skippedNames = skipped.map((x) => x.name)
      // I-1's partition, exactly as the row's statement words it.
      for (const name of appliedNames) {
        if (own(applied, name) !== true) return `'${name}' is not an OWN key of applied (I-12/I-13)`
        if (skippedNames.includes(name)) return `'${name}' is in BOTH applied and skipped (I-1)`
        const v = applied[name]
        if (typeof v !== 'string') return `applied['${name}'] is ${typeof v}, not a string (I-9)`
        if (v === 'NaN' || v === 'Infinity' || v === '-Infinity') return `applied['${name}'] EQUALS '${v}' (I-9)`
      }
      if (appliedNames.length + skipped.length !== c.entries) {
        return `${appliedNames.length + skipped.length} decisions for ${c.entries} spec entr${
          c.entries === 1 ? 'y' : 'ies'
        } — every entry contributes EXACTLY ONE decision (I-1)`
      }
      if (new Set(skippedNames).size !== skippedNames.length) return 'a skipped name appears MORE than once (I-1: one reason per key)'
      if (Object.getPrototypeOf(applied) !== null) return 'Object.getPrototypeOf(applied) is not null (I-13)'
      for (const x of skipped) {
        if (!SKIP_REASONS.includes(x.reason)) return `the reason '${String(x.reason)}' is outside the EIGHT declared members (S-9)`
      }
      // The class's own expected decision per entry.
      for (const [name, expectedReason] of c.expected) {
        if (expectedReason === null) {
          if (!own(applied, name)) return `'${name}' must be APPLIED and is not (expected decision: applied)`
          if (skippedNames.includes(name)) return `'${name}' is both applied and skipped`
        } else {
          const entry = skipped.find((x) => x.name === name)
          if (entry === undefined) {
            if (c.entries === 1 && skipped.length === 1 && expectedReason === 'malformed-spec') continue
            return `'${name}' must be skipped with '${expectedReason}' and carries no skip entry`
          }
          if (entry.reason !== expectedReason) return `'${name}' carries '${entry.reason}', not '${expectedReason}'`
        }
      }
      if (c.applied !== undefined) {
        for (const [name, expected] of Object.entries(c.applied)) {
          if (applied[name] !== expected) return `applied['${name}'] is ${brief(applied[name])}, not ${brief(expected)}`
        }
      }
      return null
    }
    for (const c of DECISION_CLASSES) rec.run(c.id, () => check(c, c.id))
    rec.finish()
  })

  it('P-PJ-TP-1 [S-PJ-POOL-1] — 60 pinned-seed draws over the 20-shape pool: BOTH halves total — YES (bounded)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const apply = s.apply
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-TP-1', 'S-PJ-POOL-1')
    const checkProjectionShape = (p: unknown, label: string): string | null => {
      if (p === null || typeof p !== 'object') return `project returned ${brief(p)} — §2.1 declares a Projection`
      const applied = (p as Projection).applied
      const skipped = (p as Projection).skipped
      if (applied === null || typeof applied !== 'object') return 'Projection.applied is not a record'
      if (!Array.isArray(skipped)) return 'Projection.skipped is not an array'
      if (Object.getPrototypeOf(applied) !== null) return 'Projection.applied’s prototype is not null (I-13)'
      for (const x of skipped) {
        if (!SKIP_REASONS.includes(x.reason)) return `the reason '${String(x.reason)}' is outside the EIGHT members`
      }
      for (const name of Object.keys(applied)) {
        if (typeof applied[name] !== 'string') return `applied['${name}'] is not a string (I-9)`
      }
      return null
    }
    const checkResultShape = (r: unknown, projection: unknown, sinkId: string, label: string): string | null => {
      if (r === null || typeof r !== 'object') return `applyProjection returned ${brief(r)} — §2.1 declares an ApplyResult`
      const res = r as ApplyResult
      if (res.applied === null || typeof res.applied !== 'object') return 'ApplyResult.applied is not a record'
      if (!Array.isArray(res.skipped)) return 'ApplyResult.skipped is not an array'
      if (Object.getPrototypeOf(res.applied) !== null) return 'ApplyResult.applied’s prototype is not null (I-13)'
      if (res.ok !== (res.skipped.length === 0)) return `ok=${String(res.ok)} with skipped.length=${res.skipped.length} (I-10)`
      for (const x of res.skipped) {
        if (!SKIP_REASONS.includes(x.reason)) return `the reason '${String(x.reason)}' is outside the EIGHT members`
      }
      for (const name of Object.keys(res.applied)) {
        if (typeof res.applied[name] !== 'string') return `applied['${name}'] is not a string (I-9)`
      }
      // I-2's union coverage over the (well-formed or not) projection: a key of a
      // projection that HAS keys may not vanish between the halves. A non-record
      // projection has no domain (M-11), and a malformed `skipped` LIST is F-9's
      // stated drop — so the coverage is asserted only where a projection record
      // supplies keys and a well-formed list.
      if (projection !== null && typeof projection === 'object') {
        const p = projection as Projection
        const pApplied = p.applied
        if (pApplied !== null && typeof pApplied === 'object') {
          const listOk = Array.isArray(p.skipped) && p.skipped.every((x) => x !== null && typeof x === 'object' && 'name' in (x as object))
          if (listOk) {
            const before = [...Object.keys(pApplied), ...(p.skipped as ProjectionSkip[]).map((x) => x.name)].sort()
            const after = [...Object.keys(res.applied), ...res.skipped.map((x) => x.name)].sort()
            if (JSON.stringify(before) !== JSON.stringify(after)) {
              return `the union coverage broke at sink ${sinkId}: ${JSON.stringify(before)} ⇒ ${JSON.stringify(after)} (I-2)`
            }
          }
        }
      }
      return null
    }
    for (let i = 0; i < TP_DRAW_INDICES.length; i += 1) {
      const shape = TP_POOL[TP_DRAW_INDICES[i]]
      const half = TP_HALVES[i % TP_HALVES.length]
      const sinkId = TP_SINKS[i % TP_SINKS.length]
      rec.run(`draw ${i + 1} · pool[${TP_DRAW_INDICES[i]}] · ${shape.id} · half ${half} · sink ${sinkId}`, () => {
        if (project === null || apply === null) return reason
        const made = shape.make()
        let projection: unknown
        if (shape.axis === 'project') {
          let p: unknown
          try {
            p = project(made.values, made.specOf)
          } catch (e) {
            return `project THREW on ${shape.id}: ${describeThrown(e)} — I-7`
          }
          const shapeBreak = checkProjectionShape(p, shape.id)
          if (shapeBreak !== null) return shapeBreak
          projection = p
        } else {
          projection = made.projection
        }
        // The sink axis of this draw ordinal (SINKS[d mod 5]): d = 1-based ordinal.
        const sinkSpec = cyclingSinks()[i % TP_SINKS.length]
        const built = sinkSpec.make()
        let r: unknown
        try {
          r = apply(projection, (built as { sink: unknown }).sink)
        } catch (e) {
          return `applyProjection THREW on ${shape.id} with the ${sinkSpec.id}: ${describeThrown(e)} — I-7`
        }
        return checkResultShape(r, projection, sinkSpec.id, `${shape.id} · ${sinkSpec.id}`)
      })
    }
    rec.finish()
  })

  it('P-PJ-IM-2 [S-PJ-OWNKEY-1] — EVERY caller name is an own key and every applied record is null-prototype (22 attempts)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const apply = s.apply
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-2', 'S-PJ-OWNKEY-1')
    const protoSnapshot = (values: unknown, specOf: unknown): unknown[] => {
      const out: unknown[] = []
      if (values !== null && typeof values === 'object') out.push(Object.getPrototypeOf(values))
      if (specOf !== null && typeof specOf === 'object') {
        out.push(Object.getPrototypeOf(specOf))
        for (const entry of Object.values(specOf as Record<string, unknown>)) {
          if (entry !== null && typeof entry === 'object') out.push(Object.getPrototypeOf(entry))
        }
      }
      return out
    }
    const check = (
      values: unknown,
      specOf: unknown,
      name: string,
      expectation: 'applied' | ProjectionSkipReason,
      label: string,
    ): string | null => {
      if (project === null) return reason
      const protosBefore = protoSnapshot(values, specOf)
      let p: Projection
      try {
        p = project(values, specOf) as Projection
      } catch (e) {
        return `THREW: ${describeThrown(e)} — I-7`
      }
      if (p === null || typeof p !== 'object') return `project returned ${brief(p)}`
      if (Object.getPrototypeOf(p.applied) !== null) return 'Object.getPrototypeOf(applied) !== null (I-13)'
      const names = Object.keys(p.applied)
      if (expectation === 'applied') {
        if (!own(p.applied, name)) return `'${name}' is NOT an own property of applied (I-12)`
        if (!names.includes(name)) return `'${name}' is an own key but does NOT appear in Object.keys (the plain-object hazard)`
        if (p.skipped.some((x) => x.name === name)) return `'${name}' is both applied and skipped (I-1)`
      } else {
        const entry = p.skipped.find((x) => x.name === name)
        if (entry === undefined) return `'${name}' is not skipped at all — expected '${expectation}'`
        if (entry.reason !== expectation) return `'${name}' carries '${entry.reason}', not '${expectation}' (the own-property read is broken)`
        if (p.skipped.filter((x) => x.name === name).length !== 1) return `'${name}' carries more than one skip entry`
      }
      const protosAfter = protoSnapshot(values, specOf)
      if (JSON.stringify(protosBefore) !== JSON.stringify(protosAfter)) {
        return `a prototype of the CALLER’s objects was written during the call (${label})`
      }
      return null
    }
    // 6 dangerous names × 3 host shapes = 18 attempts.
    for (const name of DANGEROUS_NAMES) {
      rec.run(`${name} · (a) applied`, () => check({ k: 1 }, { k: { name, unit: '' } }, name, 'applied', `${name}(a)`))
      rec.run(`${name} · (b) not owned by a plain values (F-13(a))`, () => {
        const plain: Record<string, unknown> = { real: 1 }
        const looked = plain[name]
        const expected: ProjectionSkipReason =
          typeof looked === 'undefined' ? 'missing-value' : 'not-a-number'
        return check(plain, { k: { name, unit: '' } }, name, expected, `${name}(b)`)
      })
      rec.run(`${name} · (c) two specs naming it (F-13(b))`, () => {
        if (project === null) return reason
        let p: Projection
        try {
          p = project({ a: 1, b: 2 }, { a: { name, unit: '' }, b: { name, unit: '' } }) as Projection
        } catch (e) {
          return `THREW: ${describeThrown(e)}`
        }
        if (Object.getPrototypeOf(p.applied) !== null) return 'the record is not null-prototype'
        if (!own(p.applied, name)) return `the FIRST '${name}' is not applied — an INHERITED member was read as already-seen (F-13(b))`
        const second = p.skipped.find((x) => x.name === name)
        if (second === undefined) return `the SECOND '${name}' is not skipped (expected 'duplicate-name')`
        if (second.reason !== 'duplicate-name') return `the SECOND '${name}' carries '${second.reason}', not 'duplicate-name'`
        if (p.applied[name] !== '1') return `applied['${name}'] is ${brief(p.applied[name])}, not the FIRST entry's formatted value`
        return null
      })
    }
    // Four fixed shapes.
    rec.run(OWNKEY_FIXED_SHAPES[0], () => {
      if (project === null) return reason
      const map: Record<string, unknown> = {}
      Object.defineProperty(map, DANGEROUS_NAMES[0], {
        value: { name: '--own', unit: '' },
        enumerable: true,
        configurable: true,
        writable: true,
      })
      let p: Projection
      try {
        p = project({ k: 4 }, map) as Projection
      } catch (e) {
        return `THREW: ${describeThrown(e)}`
      }
      if (!own(p.applied, '--own')) return 'the OWN __proto__ specOf entry was NOT read as its own entry (F-13(c))'
      if (p.applied['--own'] !== '4') return `applied['--own'] is ${brief(p.applied['--own'])}`
      if (Object.getPrototypeOf(p.applied) !== null) return 'the record is not null-prototype'
      return null
    })
    rec.run(OWNKEY_FIXED_SHAPES[1], () => {
      if (project === null) return reason
      const values: Record<string, unknown> = {}
      Object.defineProperty(values, 'k', { value: 2, enumerable: true, configurable: true, writable: true })
      let p: Projection
      try {
        p = project(values, { k: { name: 'constructor', unit: '' } }) as Projection
      } catch (e) {
        return `THREW: ${describeThrown(e)}`
      }
      if (p.applied['constructor'] !== '2') return `an own-key-only values must be READ as its own key (got ${brief(p.applied['constructor'])})`
      if (Object.getPrototypeOf(p.applied) !== null) return 'the record is not null-prototype'
      return null
    })
    rec.run(OWNKEY_FIXED_SHAPES[2], () => {
      if (project === null) return reason
      let p: Projection
      try {
        p = project({ k: 1 }, { k: { name: '--ok', unit: 'px' } }) as Projection
      } catch (e) {
        return `THREW: ${describeThrown(e)}`
      }
      if (Object.getPrototypeOf(p.applied) !== null) return 'an ORDINARY-name projection’s record is not null-prototype (M-19)'
      if (p.applied['--ok'] !== '1px') return `applied['--ok'] is ${brief(p.applied['--ok'])}`
      return null
    })
    rec.run(OWNKEY_FIXED_SHAPES[3], () => {
      if (project === null || apply === null) return reason
      const name = DANGEROUS_NAMES[0]
      let p: Projection
      try {
        p = project({ k: 1 }, { k: { name, unit: '' } }) as Projection
      } catch (e) {
        return `THREW (project): ${describeThrown(e)}`
      }
      const sinkRec = recordingSink()
      let r: ApplyResult
      try {
        r = apply(p, sinkRec.sink) as ApplyResult
      } catch (e) {
        return `THREW (applyProjection): ${describeThrown(e)}`
      }
      if (sinkRec.calls.length !== 1) return `the sink received ${sinkRec.calls.length} calls, expected 1 (M-20)`
      if (sinkRec.calls[0].name !== name) return `the sink received the name ${brief(sinkRec.calls[0].name)}, not ${brief(name)} verbatim`
      if (r.skipped.length !== 0) return `the applier refused/sanitized the name (skipped: ${JSON.stringify(asPlain(r.skipped))})`
      if (!own(r.applied, name)) return 'ApplyResult.applied does not carry the own key'
      return null
    })
    rec.finish()
  })

  it('P-PJ-IM-3 [S-PJ-ACCESSOR-1] — EVERY one bad key among several: skipped `accessor-threw`, the run NEVER aborts (36 attempts)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-3', 'S-PJ-ACCESSOR-1')
    const K = ['k1', 'k2', 'k3', 'k4'] as const
    const baseSpec = (): Record<string, { name: string; unit: string }> => ({
      k1: { name: '--k1', unit: 'px' },
      k2: { name: '--k2', unit: 'px' },
      k3: { name: '--k3', unit: 'px' },
      k4: { name: '--k4', unit: 'px' },
    })
    for (const variant of ACCESSOR_VARIANTS) {
      for (const position of ACCESSOR_POSITIONS) {
        for (const disposition of ACCESSOR_DISPOSITIONS) {
          rec.run(`${variant} · throwing at ${position} · ${disposition}`, () => {
            if (project === null) return reason
            const others: Record<string, unknown> = {}
            for (const k of K) if (k !== position) others[k] = 1
            if (disposition.startsWith('(ii)')) {
              const target = K.filter((k) => k !== position)[0]
              delete others[target]
            } else if (disposition.startsWith('(iii)')) {
              const target = K.filter((k) => k !== position)[0]
              others[target] = NaN
            }
            let reads = 0
            const values: Record<string, unknown> = { ...others }
            const getter = (): unknown => {
              reads += 1
              if (variant.startsWith('(b)') && reads === 1) return 1
              throw new Error('hostile accessor')
            }
            Object.defineProperty(values, position, { get: getter, enumerable: true, configurable: true })
            if (variant.startsWith('(c)')) Object.freeze(values)
            const specOf = baseSpec()
            const beforeValues = Object.getPrototypeOf(values)
            let p: Projection
            try {
              p = project(values, specOf) as Projection
            } catch (e) {
              return `THREW: ${describeThrown(e)} — F-4B/F-12: one bad key never aborts a projection`
            }
            if (Object.getPrototypeOf(values) !== beforeValues) return 'the caller’s values prototype was written'
            const throwingName = specOf[position].name
            const entries = p.skipped.filter((x) => x.name === throwingName)
            if (entries.length !== 1) return `expected exactly ONE skip entry for '${throwingName}', got ${entries.length}`
            if (entries[0].reason !== 'accessor-threw') return `'${throwingName}' carries '${entries[0].reason}', not 'accessor-threw'`
            if (own(p.applied, throwingName)) return `'${throwingName}' is ALSO applied — an accessor throw was not recorded as a skip`
            // Every OTHER key's expected decision: applied, or its own reason.
            for (const k of K) {
              if (k === position) continue
              const name = specOf[k].name
              const inApplied = own(p.applied, name)
              const skipEntry = p.skipped.find((x) => x.name === name)
              if (!inApplied && skipEntry === undefined) return `'${name}' has NO decision — the run stopped at the throwing key`
              if (inApplied && skipEntry !== undefined) return `'${name}' is both applied and skipped (I-1)`
              if (disposition.startsWith('(ii)') && k === K.filter((x) => x !== position)[0]) {
                if (skipEntry?.reason !== 'missing-value') return `the ABSENT neighbour '${name}' carries '${skipEntry?.reason ?? 'no skip'}', not 'missing-value'`
              }
              if (disposition.startsWith('(iii)') && k === K.filter((x) => x !== position)[0]) {
                if (skipEntry?.reason !== 'not-a-number') {
                  return `the NaN neighbour '${name}' carries '${skipEntry?.reason ?? 'no skip'}' — 'accessor-threw' must NOT take a readable non-number's place`
                }
              }
            }
            // …and a repeat call is deep-equal (I-4).
            let again: Projection
            const values2: Record<string, unknown> = { ...others }
            Object.defineProperty(values2, position, { get: () => {
              throw new Error('hostile accessor')
            }, enumerable: true, configurable: true })
            if (variant.startsWith('(c)')) Object.freeze(values2)
            try {
              again = project(values2, specOf) as Projection
            } catch (e) {
              return `the repeat call THREW: ${describeThrown(e)}`
            }
            if (JSON.stringify(asPlain(projectSnapshot(p))) !== JSON.stringify(asPlain(projectSnapshot(again)))) {
              return 'the result is NOT deep-equal to a repeat call (I-4)'
            }
            return null
          })
        }
      }
    }
    rec.finish()
  })

  it('P-PJ-IM-5 [S-PJ-NUMERIC-1] — EVERY non-finite/negative/non-number value stays out of `applied` (52 attempts) — YES (bounded)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-5', 'S-PJ-NUMERIC-1')
    for (const format of NUMERIC_FORMATS) {
      for (const entry of NUMERIC_TABLE) {
        rec.run(`${entry.id} · format:${format}`, () => {
          if (project === null) return reason
          const unit = entry.id.includes('unit:""') ? '' : 'px'
          const specOf = { k: { name: '--n', unit, format } }
          let p: Projection
          try {
            p = project({ k: entry.value }, specOf) as Projection
          } catch (e) {
            return `THREW: ${describeThrown(e)} — I-7`
          }
          // `'NaN'`/`'Infinity'`/`'-Infinity'` must appear in NO applied value.
          for (const v of Object.values(p.applied)) {
            if (typeof v !== 'string') return `applied carries a ${typeof v}, not a string (I-9)`
            if (v === 'NaN' || v === 'Infinity' || v === '-Infinity') return `applied carries the literal '${v}' (I-9)`
            if (v.includes('NaN') || v.includes('Infinity')) {
              return `applied carries '${v}', which contains a non-finite literal the caller’s name/unit did not supply`
            }
          }
          const expected = entry.expect()
          if (expected === null) {
            const reasonExpected = entry.expectedReason
            const got = p.skipped.find((x) => x.name === '--n')
            if (got === undefined) return `expected a '${String(reasonExpected)}' skip and applied ${brief(p.applied['--n'])}`
            if (got.reason !== reasonExpected) return `the reason is '${got.reason}', not '${String(reasonExpected)}'`
            if (own(p.applied, '--n')) return 'the rejected value is ALSO in applied'
          } else {
            if (!own(p.applied, '--n')) {
              return `expected applied['--n'] === ${brief(expected)} and got the skip '${p.skipped.find((x) => x.name === '--n')?.reason ?? 'none'}'`
            }
            if (p.applied['--n'] !== expected) return `applied['--n'] is ${brief(p.applied['--n'])}, not the EXACT string ${brief(expected)}`
          }
          if (entry.id === '-0' && format === 'unit') {
            if (p.applied['--n'] !== '0px') return `-0 must be applied as '0' + unit (got ${brief(p.applied['--n'])})`
            if (p.skipped.some((x) => x.name === '--n')) return '-0 must NOT be `negative` (-0 < 0 is false)'
          }
          return null
        })
      }
    }
    rec.finish()
  })

  it('P-PJ-IM-6 [S-PJ-WRITELOG-1] — the write log, the failing sinks, the unusable sweep and the re-entrant drives (16 attempts)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const apply = s.apply
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-6', 'S-PJ-WRITELOG-1')
    const K = 4
    const specOf: Record<string, { name: string; unit: string }> = {}
    const values: Record<string, number> = {}
    for (let i = 1; i <= K; i += 1) {
      values[`k${i}`] = i
      specOf[`k${i}`] = { name: `--k${i}`, unit: 'px' }
    }
    const makeP = (label: string): Projection | string => {
      if (project === null) return reason
      try {
        return project(values, specOf) as Projection
      } catch (e) {
        return `project THREW: ${describeThrown(e)} (${label})`
      }
    }
    // (a) the 4-key write log, one attempt per key position.
    for (let i = 0; i < K; i += 1) {
      rec.run(`(a) write log · key position ${i + 1}`, () => {
        const p = makeP(`write log ${i + 1}`)
        if (typeof p === 'string') return p
        if (apply === null) return reason
        const sinkRec = recordingSink()
        let r: ApplyResult
        try {
          r = apply(p, sinkRec.sink) as ApplyResult
        } catch (e) {
          return `applyProjection THREW: ${describeThrown(e)}`
        }
        if (JSON.stringify(asPlain(projectSnapshot(r))) !== JSON.stringify(asPlain(projectSnapshot(p)))) {
          return `r.applied does not deep-equal p.applied: ${JSON.stringify(asPlain(r.applied))} vs ${JSON.stringify(asPlain(p.applied))}`
        }
        const order = sinkRec.calls.map((c) => c.name)
        if (JSON.stringify(order) !== JSON.stringify(Object.keys(p.applied))) {
          return `the write order ${JSON.stringify(order)} !== Object.keys(p.applied) ${JSON.stringify(Object.keys(p.applied))}`
        }
        if (sinkRec.calls.length !== K) return `setProperty was called ${sinkRec.calls.length} times, expected exactly K=${K} (§2.3 item 7)`
        for (const name of Object.keys(p.applied)) {
          if (sinkRec.calls.filter((c) => c.name === name).length !== 1) return `'${name}' was written more than once (M-5)`
        }
        if (r.ok !== true) return `ok === ${String(r.ok)} on a clean write log`
        // I-3: a key is in r.applied IFF setProperty was called with it.
        const logged = sinkRec.calls.map((c) => c.name).sort()
        const reported = Object.keys(r.applied).sort()
        if (JSON.stringify(logged) !== JSON.stringify(reported)) return `r.applied ${JSON.stringify(reported)} !== the call log ${JSON.stringify(logged)} (I-3)`
        return null
      })
    }
    // (b) four failing sink shapes.
    const failing: ReadonlyArray<readonly [string, (p: Projection) => { sink: unknown; calls: Call[] }]> = [
      ['throw-on-key-1', () => throwingSink([1])],
      ['throw-on-key-2-only (F-7)', () => throwingSink([2])],
      ['throw-on-every-key (F-8)', () => throwingSink([1, 2, 3, 4])],
      ['an unusable sink (F-6)', () => ({ sink: null, calls: [] })],
    ]
    for (const [id, make] of failing) {
      rec.run(`(b) ${id}`, () => {
        const p = makeP(id)
        if (typeof p === 'string') return p
        if (apply === null) return reason
        const built = make(p)
        let r: ApplyResult
        try {
          r = apply(p, built.sink) as ApplyResult
        } catch (e) {
          return `applyProjection THREW: ${describeThrown(e)} — a throwing setProperty must not abort the run (§2.3 item 3)`
        }
        const logged = built.calls.map((c) => c.name).sort()
        const reported = Object.keys(r.applied).sort()
        if (JSON.stringify(logged) !== JSON.stringify(reported)) return `r.applied ${JSON.stringify(reported)} !== the call log ${JSON.stringify(logged)} (I-3)`
        for (const x of r.skipped) {
          if (own(r.applied, x.name)) return `'${x.name}' is skipped AND reported applied — a FALSE applied`
        }
        if (id.includes('throw-on-key-2')) {
          const entry = r.skipped.find((x) => x.name === '--k2')
          if (entry?.reason !== 'write-refused') return `key 2 carries '${entry?.reason ?? 'no skip'}', not 'write-refused' (F-7)`
          if (own(r.applied, '--k2')) return 'key 2 is absent from applied required (F-7) — it is present'
          if (r.applied['--k1'] === undefined || r.applied['--k3'] === undefined || r.applied['--k4'] === undefined) {
            return 'keys 1/3/4 must still be applied — the run must NOT abort at key 2 (F-7)'
          }
          if (r.ok !== false) return 'ok === false required when a key is refused (F-7)'
        }
        if (id.includes('every-key') && Object.keys(r.applied).length !== 0) return 'F-8: applied must be {} when every write is refused'
        if (id.includes('unusable')) {
          if (Object.keys(r.applied).length !== 0) return 'F-6: applied must be {} for an unusable sink'
          if (r.skipped.length !== K) return `F-6: every key must be skipped (got ${r.skipped.length} of ${K})`
          if (!r.skipped.every((x) => x.reason === 'sink-unusable')) return 'F-6: one reason member applies to every key'
        }
        return null
      })
    }
    // (c) the unusable-sink sweep over five shapes.
    const sweep = unusableSinks()
    for (let i = 0; i < sweep.length; i += 1) {
      const [id, sink] = sweep[i]
      rec.run(`(c) unusable sink sweep · ${id}`, () => {
        const p = makeP(`sweep ${id}`)
        if (typeof p === 'string') return p
        if (apply === null) return reason
        const sinkRec = recordingSink()
        let r: ApplyResult
        try {
          r = apply(p, sink) as ApplyResult
        } catch (e) {
          return `applyProjection THREW on an unusable sink: ${describeThrown(e)} (F-6)`
        }
        if (Object.keys(r.applied).length !== 0) return 'F-6: applied must be {}'
        if (r.skipped.length !== K) return `F-6: expected ${K} sink-unusable skips, got ${r.skipped.length}`
        if (!r.skipped.every((x) => x.reason === 'sink-unusable')) return `F-6: reasons are ${JSON.stringify(asPlain(r.skipped.map((x) => x.reason)))}`
        if (r.ok !== false) return 'F-6: ok must be false'
        if (sinkRec.calls.length !== 0) return 'the sweep’s recording sink was written to while a DIFFERENT (unusable) sink was driven'
        return null
      })
    }
    // (d) the three re-entrant drives.
    const reentrantCases: ReadonlyArray<readonly [string, 'first' | 'last' | 'throwing']> = [
      ['an inner call fired from the FIRST key', 'first'],
      ['an inner call fired from the LAST key', 'last'],
      ['an inner call fired from a key whose write throws', 'throwing'],
    ]
    for (const [id, kind] of reentrantCases) {
      rec.run(`(d) re-entrant · ${id}`, () => {
        const p = makeP('re-entrant')
        if (typeof p === 'string') return p
        if (apply === null) return reason
        const innerP = { applied: { '--inner': 'i' }, skipped: [] } as Projection
        const outerCalls: Call[] = []
        const innerCalls: Call[] = []
        let innerFired = 0
        const outerSink: VarWriteSink = {
          style: {
            setProperty(name: string, value: string): void {
              outerCalls.push({ name, value })
              if (kind === 'throwing' && name === '--k2') throw new Error('the sink refused the write')
              const isTriggerKey = kind === 'first' ? name === '--k1' : kind === 'last' ? name === '--k4' : name === '--k1'
              if (innerFired === 0 && isTriggerKey) {
                innerFired += 1
                apply(innerP, { style: { setProperty: (n: string, v: string) => void innerCalls.push({ name: n, value: v }) } })
              }
            },
          },
        }
        let r: ApplyResult
        try {
          r = apply(p, outerSink) as ApplyResult
        } catch (e) {
          return `the OUTER call THREW: ${describeThrown(e)} — F-14: both calls stay call-local, no throw`
        }
        if (innerFired !== 1) return `the inner call fired ${innerFired} times — a guard refused the re-entrant call (F-14)`
        if (!innerCalls.some((c) => c.name === '--inner')) return 'the inner call did not write to its own sink'
        if (own(r.applied, '--inner')) return 'the INNER call’s key appears in the OUTER applied — the results are not call-local (I-3)'
        if (r.skipped.some((x) => x.name === '--inner')) return 'the INNER call’s skip is absorbed by the OUTER skipped (I-10)'
        for (const name of Object.keys(p.applied)) {
          const n = outerCalls.filter((c) => c.name === name).length
          if (n !== 1) return `'${name}' was written ${n} times at the outer sink — exactly one per key per call (§2.3 item 7)`
        }
        const expectedApplied = Object.keys(p.applied).filter((name) => !(kind === 'throwing' && name === '--k2'))
        if (JSON.stringify(Object.keys(r.applied)) !== JSON.stringify(expectedApplied)) {
          return `the outer applied ${JSON.stringify(Object.keys(r.applied))} does not report exactly its own call’s writes (${JSON.stringify(expectedApplied)})`
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-PJ-IM-7 [S-PJ-THROW-1] — ANY spec set containing throwing accessors: `project` is TOTAL and per-key (12 attempts)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-7', 'S-PJ-THROW-1')
    const K = ['k1', 'k2', 'k3', 'k4'] as const
    for (const row of THROW_TABLE) {
      for (const driveId of THROW_DRIVES) {
        rec.run(`${row.id} · ${driveId}`, () => {
          if (project === null) return reason
          const throwing = new Set<string>(row.throwing)
          const finite = K.filter((k) => !throwing.has(k))
          const base: Record<string, unknown> = {}
          for (const k of finite) base[k] = 1
          const values: Record<string, unknown> = { ...base }
          for (const k of throwing) {
            Object.defineProperty(values, k, {
              get: () => {
                throw new Error('hostile accessor')
              },
              enumerable: true,
              configurable: true,
            })
          }
          const duplicateNames = driveId.startsWith('(iii)')
          const format = driveId.startsWith('(ii)') ? ('number' as const) : ('unit' as const)
          const specOf: Record<string, { name: string; unit: string; format?: 'unit' | 'number' }> = {}
          K.forEach((k, index) => {
            const name = duplicateNames && index === 2 ? '--dup' : `--${k}`
            specOf[k] = { name, unit: 'px', format }
          })
          const frozen = driveId.startsWith('(iv)')
          const actualValues = frozen ? Object.freeze(values) : values
          let p: Projection
          try {
            p = project(actualValues, specOf) as Projection
          } catch (e) {
            return `THREW: ${describeThrown(e)} — this register row's own claim: the per-key catch is not a first-key bail-out`
          }
          // The skip set equals the throwing-key set (plus the duplicate control).
          const throwingNames = [...throwing].map((k) => specOf[k].name)
          const accessorSkips = p.skipped.filter((x) => x.reason === 'accessor-threw').map((x) => x.name).sort()
          if (JSON.stringify(accessorSkips) !== JSON.stringify([...new Set(throwingNames)].sort())) {
            return `the 'accessor-threw' set ${JSON.stringify(accessorSkips)} !== the throwing-key set ${JSON.stringify(
              [...new Set(throwingNames)].sort(),
            )}`
          }
          for (const name of throwingNames) {
            if (p.skipped.filter((x) => x.name === name && x.reason === 'accessor-threw').length !== 1) {
              return `'${name}' does not carry exactly ONE 'accessor-threw' entry`
            }
          }
          // The applied set equals the finite-key set (minus a duplicate collision).
          const expectedApplied = finite
            .map((k, index) => ({ name: specOf[k].name, k, index }))
            .filter(({ name, k }, _i, arr) => arr.findIndex((x) => x.name === name && x.k === k) === arr.indexOf(arr.find((x) => x.k === k)!))
          const appliedNames = Object.keys(p.applied)
          if (duplicateNames) {
            // k3's spec shares '--dup' with k1's, so k1 wins it (or k3 if k1 throws).
            const dupInApplied = appliedNames.filter((n) => n === '--dup').length
            if (dupInApplied > 1) return "'--dup' appears more than once in applied (§2.4 item 5 first-wins)"
            const dupSkips = p.skipped.filter((x) => x.name === '--dup')
            if (throwing.has('k1')) {
              if (dupSkips.length === 0 && dupInApplied === 0) return "the duplicate pair has no decision for '--dup'"
            } else if (dupInApplied !== 1 || dupSkips.length !== 1 || dupSkips[0].reason !== 'duplicate-name') {
              return `the duplicate control failed: applied=${JSON.stringify(appliedNames)}, '--dup' skips=${JSON.stringify(
                asPlain(dupSkips),
              )} — 'duplicate-name' must still win for the second entry (§2.4 item 3)`
            }
          } else {
            for (const k of finite) {
              if (!own(p.applied, specOf[k].name)) return `the finite key '${specOf[k].name}' is NOT applied (the run stopped elsewhere)`
            }
            for (const k of throwing) {
              if (own(p.applied, specOf[k].name)) return `the throwing key '${specOf[k].name}' IS applied`
            }
            if (appliedNames.length !== finite.length) return `applied holds ${appliedNames.length} keys, expected ${finite.length}`
          }
          if (expectedApplied.length === 0 && appliedNames.length !== 0 && !duplicateNames) {
            return `no finite key exists, so applied must be empty (got ${JSON.stringify(appliedNames)})`
          }
          // …and a repeat call is deep-equal (I-4).
          let again: Projection
          try {
            again = project(actualValues, specOf) as Projection
          } catch (e) {
            return `the repeat call THREW: ${describeThrown(e)}`
          }
          if (JSON.stringify(asPlain(projectSnapshot(p))) !== JSON.stringify(asPlain(projectSnapshot(again)))) {
            return 'the result is NOT deep-equal to a repeat call (I-4)'
          }
          return null
        })
      }
    }
    rec.finish()
  })

  it('P-PJ-IM-8 [S-PJ-REUSE-1] — reuse/re-entrancy: every call equivalent to a FIRST call, `p` observably unchanged (10 attempts)', async () => {
    const s = await resolveSurface()
    const project = s.project
    const apply = s.apply
    const alias = s.alias
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-PJ-IM-8', 'S-PJ-REUSE-1')
    const values3 = { a: 1, b: 2, c: 3 }
    const spec3 = { a: { name: '--a', unit: 'px' }, b: { name: '--b', unit: 'px' }, c: { name: '--c', unit: 'px' } }
    const makeP3 = (): Projection | string => {
      if (project === null) return reason
      try {
        return project(values3, spec3) as Projection
      } catch (e) {
        return `project THREW: ${describeThrown(e)}`
      }
    }
    const snapshotFresh = (): ProjectionSnapshot | string => {
      if (project === null) return reason
      try {
        return projectSnapshot(project(values3, spec3) as Projection)
      } catch (e) {
        return `project THREW: ${describeThrown(e)}`
      }
    }
    const immutabilityCheck = (p: Projection, before: ProjectionSnapshot, fresh: ProjectionSnapshot, label: string): string | null => {
      const breaks = immutabilityBreaks(before, projectSnapshot(p), fresh, label)
      return breaks.length === 0 ? null : breaks.join('; ')
    }
    for (const shape of REUSE_SHAPES) {
      rec.run(shape.id, () => {
        if (apply === null || alias === null) return reason
        const p = makeP3()
        if (typeof p === 'string') return p
        const fresh = snapshotFresh()
        if (typeof fresh === 'string') return fresh
        const before = projectSnapshot(p)
        const sinkA = recordingSink()
        const sinkB = recordingSink()
        const id = shape.id
        if (id.startsWith('(1)')) {
          const r1 = apply(p, sinkA.sink) as ApplyResult
          const r2 = apply(p, sinkA.sink) as ApplyResult
          if (JSON.stringify(asPlain(projectSnapshot(r2))) !== JSON.stringify(asPlain(projectSnapshot(r1)))) {
            return 'the second ApplyResult does not deep-equal the first (I-11)'
          }
          if (sinkA.calls.length !== 6) return `the same-sink call log holds ${sinkA.calls.length} writes, expected 2K=6 (§2.3 item 7)`
        } else if (id.startsWith('(2)')) {
          const r1 = apply(p, sinkA.sink) as ApplyResult
          const r2 = apply(p, sinkB.sink) as ApplyResult
          if (JSON.stringify(asPlain(projectSnapshot(r2))) !== JSON.stringify(asPlain(projectSnapshot(r1)))) return 'A vs B disagree (I-11)'
          if (sinkA.calls.length !== 3 || sinkB.calls.length !== 3) return `A holds ${sinkA.calls.length}, B holds ${sinkB.calls.length} — expected K=3 each`
        } else if (id.startsWith('(3)')) {
          apply(p, sinkA.sink)
          apply(p, sinkB.sink)
          apply(p, sinkA.sink)
          if (sinkA.calls.length !== 6 || sinkB.calls.length !== 3) return `the A,B,A sequence wrote ${sinkA.calls.length}/${sinkB.calls.length}, expected 6/3`
        } else if (id.startsWith('(4)')) {
          if (alias === null || apply === null) return reason
          if (alias !== apply) return 'applyVarsToRoot !== applyProjection — M-14’s function identity is broken'
          const r1 = alias(p, sinkA.sink) as ApplyResult
          const r2 = alias(p, sinkA.sink) as ApplyResult
          if (JSON.stringify(asPlain(projectSnapshot(r2))) !== JSON.stringify(asPlain(projectSnapshot(r1)))) return 'the alias does not reuse identically'
          if (sinkA.calls.length !== 6) return `the alias wrote ${sinkA.calls.length} times, expected 6`
        } else if (id.startsWith('(5)')) {
          if (project === null) return reason
          let empty: Projection
          try {
            empty = project({}, {}) as Projection
          } catch (e) {
            return `project THREW: ${describeThrown(e)}`
          }
          const eBefore = projectSnapshot(empty)
          const r1 = apply(empty, sinkA.sink) as ApplyResult
          const r2 = apply(empty, sinkA.sink) as ApplyResult
          if (r1.ok !== true || r2.ok !== true) return 'an empty projection must be ok === true on every call'
          if (sinkA.calls.length !== 0) return 'an empty projection wrote something'
          const breaks = immutabilityBreaks(eBefore, projectSnapshot(empty), eBefore, 'empty reuse')
          if (breaks.length > 0) return breaks.join('; ')
        } else if (id.startsWith('(6)')) {
          const withSkips = {
            applied: { '--a': '1' },
            skipped: [{ name: '--x', reason: 'write-refused' as ProjectionSkipReason }],
          } as Projection
          const b = projectSnapshot(withSkips)
          const r1 = apply(withSkips, sinkA.sink) as ApplyResult
          const r2 = apply(withSkips, sinkB.sink) as ApplyResult
          if (JSON.stringify(asPlain(r1.skipped)) !== JSON.stringify(asPlain(r2.skipped))) return 'the skip list is not re-propagated identically'
          if (r1.ok !== false || r2.ok !== false) return 'a re-propagated skip must keep ok === false'
          const breaks = immutabilityBreaks(b, projectSnapshot(withSkips), b, 'skip reuse')
          if (breaks.length > 0) return breaks.join('; ')
        } else if (id.startsWith('(7)') || id.startsWith('(8)')) {
          const sameSink = id.startsWith('(8)')
          const target = sameSink ? sinkA : sinkB
          let innerFired = 0
          const outerSink: VarWriteSink = {
            style: {
              setProperty(name: string, value: string): void {
                if (sameSink) sinkA.calls.push({ name, value })
                else sinkB.calls.push({ name, value })
                if (innerFired === 0 && name === '--a') {
                  innerFired += 1
                  apply(p, sameSink ? outerSink : target.sink)
                }
              },
            },
          }
          const outer = apply(p, outerSink) as ApplyResult
          if (innerFired !== 1) return `the inner call fired ${innerFired} times — a guard refused it (F-14)`
          if (JSON.stringify(Object.keys(outer.applied)) !== JSON.stringify(['--a', '--b', '--c'])) {
            return `the outer result ${JSON.stringify(Object.keys(outer.applied))} does not report exactly its own writes`
          }
          const expectedCalls = sameSink ? 6 : 6
          const total = sinkA.calls.length + sinkB.calls.length
          if (total !== expectedCalls) return `the sinks hold ${total} writes, expected ${expectedCalls} (one per key per call)`
        } else if (id.startsWith('(9)')) {
          const otherP = { applied: { '--other': 'o' }, skipped: [] } as Projection
          let innerFired = 0
          const outerSink: VarWriteSink = {
            style: {
              setProperty(name: string, value: string): void {
                sinkA.calls.push({ name, value })
                if (innerFired === 0 && name === '--a') {
                  innerFired += 1
                  apply(otherP, sinkB.sink)
                }
              },
            },
          }
          const outer = apply(p, outerSink) as ApplyResult
          if (innerFired !== 1) return 'the inner call with a DIFFERENT projection did not fire'
          if (own(outer.applied, '--other')) return 'the inner call’s key leaked into the outer applied (I-3)'
          if (sinkB.calls.length !== 1) return `the inner call wrote ${sinkB.calls.length} times to its own sink, expected 1`
          if (sinkA.calls.length !== 3) return `the outer call wrote ${sinkA.calls.length} times, expected K=3`
        } else if (id.startsWith('(10)')) {
          if (Object.isFrozen(p.applied) !== false && Object.isFrozen(p.applied) !== true) return 'unreachable'
          Object.freeze(p.applied)
          Object.freeze(p)
          if (!Object.isFrozen(p.applied) || !Object.isFrozen(p)) return 'the harness could not freeze p.applied/p (an unexpected error)'
          const r = apply(p, sinkA.sink) as ApplyResult
          if (r.ok !== true) return `a FROZEN p must be accepted without a throw (ok === ${String(r.ok)})`
          if (sinkA.calls.length !== 3) return `a frozen p wrote ${sinkA.calls.length} times, expected K=3`
        }
        return immutabilityCheck(p, before, fresh, id)
      })
    }
    rec.finish()
  })
})
