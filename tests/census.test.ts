// tests/census.test.ts
// ===========================================================================
// U-CENSUS · wave E · **THE RED SET** (RCA-1) — the `next-steps` row `E2`.
//
// Contract: `docs/specs/census.md` (FILED 2026-09-27, ~1730 lines, wave E's
// SECOND unit — `SCH-8`'s CENSUS HALF per architect ruling A-d4). The module to
// be built later is `src/shared/census.ts` — **the THREE exported names of
// `§2.1`'s block** (ONE value export `computeTrackVars` + TWO type declarations
// `ZoneId` · `TrackVars`; `1 + 2 = 3`; the doc-level aliases `SizeLookup` /
// `SpecLookup` are NOT exports and no row asserts them). `§3.4 R-2` is the row
// that pins the SET (never a bare count — `§4.4 S-3`).
//
// Binding sections read in full: `§0` (the twelve recorded rulings) and `§0A`
// (the TWELVE dated ruling notes — CONTRACT, not commentary; notes 11 and 12 are
// the ARCHITECT RULING landed 2026-09-27: "Non-revealed zones still exist, they
// just don't get displayed"), `Layer declaration`, `§1` (scope; the `U-GUTTER`
// / `U-RELOCATE` boundaries), `§2.1` (the surface + export census + the delegate
// clause), `§2.2` (the `H-r8` SIX-PROHIBITION table `P-1`..`P-6`), `§2.3`
// (items 1–6: the enumeration order, the census pass-through, the reveal gate,
// the two lookups, THE EXACT CALL COUNTS), `§2.4` (the three ledger clauses
// `C-A` · `C-B` · `C-C`), `§2.5` (the geometry boundary + the three-case `''`
// limitation), `§3.1` (`M-1`..`M-14`), `§3.2` (`F-1`..`F-6`), `§3.3`
// (`I-1`..`I-10`), `§3.4` (the STATIC rows `R-1`..`R-10`), `§3.5` (the EXISTENCE
// rows `R-11`..`R-13`), `§4.1`/`§4.2` (the red statement + the authoring order),
// `§4.3` (what the red is NOT), `§4.4` (`S-1`..`S-10`), `§5.1` (diff scope + the
// COMMIT-RANGE SCOPE RULE), `§5.2` (the legs; leg 4 = the standalone strict
// `tsc`), `§5.3` (the DONE row's eleven items), **`§5.5.1` (the typed Property
// register — all EIGHT rows, executed here, `248` = `68+36+24+14+30+10+30+36`,
// seed `20260927`, caps `≤100`/row · `≤400` total · stop-after-5)**, `§6`,
// `§7` (the honest statements; items 13/14 are the ruling's limitation + the
// sibling note), `§7a`/`§7a.1` (the EIGHT ambiguities — ALL EIGHT RULED; no row
// below re-opens one), `§8`, and `§3a`/`§3b` (the adversarial SEED set — the
// `A-*` rows belong to the LATER pass and NONE is authored here).
//
// LAYER: **[T] arithmetic / decision / delegation over arguments.** This unit
// touches no DOM at all, not even `src/shared/dom-shim.ts` (layer anchor 2): no
// element, no document, no shim member, no window, no IPC, no assembled app, no
// engine surface. **No row below asserts a rendered-geometry, CSS-validity,
// layout or paint property** (`I-8`, `R-6`, `§2.5`): `computeTrackVars` returns
// a RECORD OF STRINGS and whether a browser accepts, applies or paints any of
// them is **UNPROVABLE in this repo today** — `§5.2` offers no `[U]` row,
// structurally (the module is imported by no `src/**` file — `R-8`/`R-13`).
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation: `src/shared/census.ts` does not
// exist, so every clause row, every static row and every register row fails on
// the module-absent boundary. **No `src/**`, `scripts/**`, `package.json` or
// spec file is created or modified by this pass.**
//
// THE IMPORT BOUNDARY (`§4.1`, the repo's established technique — an `fs`
// existence probe plus a RUN-TIME-COMPUTED specifier resolved through a dynamic
// `import(/* @vite-ignore */ …)`): every row fails as a **LABELLED ASSERTION**
// naming the absent module / missing export, never as a collection error that
// would take the whole red set down. `PRE-1` proves the mechanism itself
// resolves, against an EXISTING pure module.
//
// THE DELEGATE SPY BOUNDARY (`§2.3` item 6; `I-4`; `P-CN-IM-4`): the module
// under test calls `isEmpty`/`trackFor` through its own `import … from
// './zones.js'`, so the ONLY way a row can count those calls is to intercept
// that specifier. `vi.mock('../src/shared/zones.js')` is proved (by this file's
// own `PRE-5` control) to reach a consumer that imports the same specifier, so
// the delegate calls are observed with their ARGUMENT TUPLES — and the rows that
// need the delegate's REAL bytes compare against a direct call to the same
// mocked delegate, while `PRE-6` drives the REAL module's exports so the
// U-ZONES semantics the expected values rest on are the landed ones.
//
// LEG 4 (`§5.2`): `R-2`(a) asserts the TYPE-ONLY names `ZoneId`/`TrackVars` are
// exported, and an imported type name is erased at run time — so the honest leg
// is a standalone strict `tsc` over THIS file. At RED time that leg reports the
// module-absent boundary (`TS2307`) and nothing else. **The `TS2307` diagnostic
// is NOT suppressed** (no `@ts-ignore`), because suppressing it would make that
// type claim unfalsifiable.
//
// AUTHORED ORDER (`§4.2` item 1): the `§3.5` existence rows `R-11`/`R-12`/`R-13`
// FIRST OF ALL (they are the red's own premise and are evaluable before the
// module exists), then `I-1`..`I-10`, then `M-1`..`M-14`, then `F-1`..`F-6`,
// then the `§3.4` static rows `R-1`..`R-10`, then the `§5.5.1` register rows in
// register order (`P-CN-IM-1` · `P-CN-IM-2` · `P-CN-IM-3` · `P-CN-IM-4` ·
// `P-CN-SM-1` · `P-CN-SM-2` · `P-CN-SM-3` · `P-CN-TP-1`), then the register's own
// status row. The `describe` blocks below are in that order; NOTHING is
// renumbered. The ruling's five falsifiers (`§0A` note 12 (a)..(e)) each carry a
// NAMED row of their own, and the register rows are the bounded executions.
//
// ONE SPEC CONTRADICTION IS REPORTED IN PLACE RATHER THAN GUESSED, and the row
// still falsifies the ruling — see the block above `P-CN-IM-2`'s drive: the
// `§5.5.1 P-CN-IM-2` strategy cell's per-attempt `[]` for its `v2` column
// (`revealed = () => false`, a CALLABLE predicate) contradicts `§0A` ruling note
// 11 (`C-A` is UNCONDITIONAL: a declined zone's key exists with `''`), the
// row's own `YES`-marked prose at `§5.5.1`'s dated confirmation ("the key is
// present with `''`, never omitted"), and `§6`'s ruling-falsifier paragraph
// ("a row that folds `v2` and `v3` into one expectation FAILS this spec's
// text"). The RULING text governs (§0A note 11 is the freshest contract text and
// its table changes no cell, count, term or strategy id); the stale cell is
// reported, not followed.
// ===========================================================================
import { describe, it, expect, vi } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot be
// imported for its types while it is absent, so this file carries its own
// declarations; the field names and the return type are `§2.1`'s block exactly.
// `R-2`(a)'s TYPE half is the `import type` below: it does not compile unless
// `src/shared/census.ts` exports those two names (`§5.2` leg 4).
// ===========================================================================
/** `§2.1` — a zone identifier, AS THE CALLER'S ENUMERATION YIELDED IT. Never
 *  normalized, stringified, trimmed or validated (`§0A` note 3). */
type ZoneId = string | number
/** `§2.1` — the returned record: a NULL-PROTOTYPE plain record whose own
 *  enumerable string keys are exactly the enumerated zone set and whose values
 *  are the exact tokens `U-ZONES` produced (`§0A` notes 7/11). */
type TrackVars = Record<string, string>
/** `§2.1`'s doc-level alias, carried here as an ALIAS and asserted to be NO
 *  export of the module by `R-2`(a). */
// type SizeLookup = ((zoneId: ZoneId, census: unknown) => unknown)
//                  | Readonly<Record<ZoneId, unknown>>

/** `§2.1`/`§3.4 R-2`(a) — THE TYPE-ONLY HALF, through `§5.2` leg 4. These two
 *  imports are the compile-time claim that the module exports `ZoneId` and
 *  `TrackVars`: this file does not compile unless it does. The `TS2307` this
 *  produces while the module is ABSENT is the red’s own leg-4 form and is NOT
 *  suppressed (a `@ts-ignore` here would make the type claim unfalsifiable). */
import type { TrackVars as ModuleTrackVars } from '../src/shared/census.js'
import type { ZoneId as ModuleZoneId } from '../src/shared/census.js'
/** `docs/specs/zones.md` `§2.1` — the delegate’s type-only name, used by `R-12`
 *  (the predecessor-surface row) exactly as the predecessor’s own red set uses it. */
import type { TrackSpec as ModuleTrackSpec } from '../src/shared/zones.js'

/** `§2.1`'s `TrackSpec` — the delegate's own three-field spec (`docs/specs/
 *  zones.md` `§2.1`), mirrored because this unit consumes it through
 *  `trackFor(spec, size, empty)`. */
interface TrackSpec {
  readonly trackProp: string
  readonly unit: string
  readonly emptyToken: string
}

interface CensusSurface {
  /** `isEmpty(census, zoneId) → boolean` — the delegate's emptiness DECISION. */
  isEmpty(census: unknown, zoneId: unknown): boolean
  /** `trackFor(spec, size, empty) → string` — the delegate's token BYTES. */
  trackFor(spec: unknown, size: unknown, empty?: unknown): string
}

// ===========================================================================
// THE IMPORT BOUNDARY (`§4.1`).
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/census.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'census.js'].join('/')
const TEST_FILE = fileURLToPath(import.meta.url)
const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const MODULE_RELPATH = 'src/shared/census.ts'
const TEST_RELPATH = 'tests/census.test.ts'

// ===========================================================================
// §2.3 item 6 / §5.2 — THE DELEGATE SPIES. `U-ZONES` is MOCKED at the one
// specifier this unit's module is allowed to import (`R-1`), so a row can assert
// the EXACT CALL COUNT, the ARGUMENT ORDER `(census, zoneId)` and the argument
// tuples — and can prove a declined zone costs ZERO delegate calls.
//
// The mock DELEGATES to the real landed module (`PRE-6` proves that surface), so
// the bytes this unit emits are still U-ZONES' own bytes: the mock only observes.
// ===========================================================================
const DELEGATE_LOG: { isEmpty: unknown[][]; trackFor: unknown[][] } = { isEmpty: [], trackFor: [] }

vi.mock('../src/shared/zones.js', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  const realEmpty = actual['isEmpty'] as (census: unknown, zoneId: unknown) => boolean
  const realTrack = actual['trackFor'] as (spec: unknown, size: unknown, empty?: unknown) => string
  return {
    ...actual,
    isEmpty: (census: unknown, zoneId: unknown): boolean => {
      DELEGATE_LOG.isEmpty.push([census, zoneId])
      return realEmpty(census, zoneId)
    },
    trackFor: (spec: unknown, size: unknown, empty?: unknown): string => {
      DELEGATE_LOG.trackFor.push([spec, size, empty])
      return realTrack(spec, size, empty)
    },
  }
})

/** The mocked delegate namespace. `PRE-6` drives the REAL module separately, so
 *  every expected value below rests on the LANDED `U-ZONES` semantics. */
import * as delegate from '../src/shared/zones.js'

function resetDelegateLog(): void {
  DELEGATE_LOG.isEmpty.length = 0
  DELEGATE_LOG.trackFor.length = 0
}

type Surface = {
  computeTrackVars: ((zones: unknown, census: unknown, sizes: unknown, revealed: unknown, specOf: unknown) => TrackVars) | null
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
      computeTrackVars: null,
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const fn = mod['computeTrackVars']
    surfaceCache =
      typeof fn === 'function'
        ? { computeTrackVars: fn as Surface['computeTrackVars'], mod, reason: null }
        : {
            computeTrackVars: null,
            mod,
            reason: "§2.1's value export `computeTrackVars` is not exported as a function",
          }
  } catch (e) {
    surfaceCache = { computeTrackVars: null, mod: null, reason: `the module does not resolve: ${describeThrown(e)}` }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's label, so
 *  the red message is about the absent module/export, never an import type — and
 *  it RETURNS the (possibly absent) function rather than throwing, because the
 *  register rows must be able to count a module-absent attempt as a BROKEN attempt
 *  instead of aborting the row: `§5.5.1`’s stop-after-5 discipline is what reports
 *  the red run’s early stop, and a throw here would hide it. Every clause row’s
 *  own first assertion already fails loudly when the surface is absent. */
async function surface(label: string): Promise<NonNullable<Surface['computeTrackVars']>> {
  const s = await resolveSurface()
  if (s.computeTrackVars === null) {
    expect(
      s.computeTrackVars,
      `RED — U-CENSUS red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's computeTrackVars(zones, census, sizes, revealed, specOf). [${label}]`,
    ).not.toBe(null)
  }
  // The assertion above is the row’s red boundary; the non-null return type is what
  // keeps every clause row’s body type-clean (a null surface never reaches it).
  return s.computeTrackVars as NonNullable<Surface['computeTrackVars']>
}

/** **THE REGISTER ROWS’ own boundary** (`§5.5.1`): the reason a row is red is
 *  DATA, so the module-absent state is returned as the row’s `reason` and each
 *  `rec.run()` counts it as a BROKEN attempt. The clause rows’ `surface()` above
 *  asserts its label for its own rows; a register row must NOT go through it, or
 *  the row would abort on its first assertion and the stop-after-5 discipline —
 *  the exact thing a module-absent red run has to report — would never trigger. */
async function registerSurface(): Promise<{ fn: Surface['computeTrackVars']; reason: string }> {
  const s = await resolveSurface()
  return {
    fn: s.computeTrackVars,
    reason: s.reason ?? 'the module of §2.1/§5.1 row 1 does not exist yet',
  }
}

// ===========================================================================
// §2.2/`§3.4` — the STATIC readers over the module FILE (and, where the spec
// names them, over this unit's own controlled `[T]` corpora). The HARNESS may
// read files; the MODULE may not (`R-4`).
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-CENSUS red set (§4.1): the static rows of §2.2/§3.4/§3.5 read the module file and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return readFileSync(MODULE_SRC, 'utf8')
}

/** Strip comments while PRESERVING line structure (so a hit's line number is the
 *  real one). String literals are KEPT: a banned token inside a string is still
 *  that token in code. Used for the ACCESS/IMPORT/LITERAL scans. The VOCABULARY
 *  half of `R-3` reads comments as code on purpose (`§4.4 S-2`). */
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
// §3.4 R-3 — THE ANTI-EVASION VOCABULARY SCAN (`§2.2` P-1/P-2, `§4.4 S-2`).
//
// `§4.4 S-2` requires the row to be closed against BOTH evasions BEFORE it is
// authored: **token ASSEMBLY** (`'zo' + 'ne'`, a template literal, a token split
// across a line break) and **COMMENT-CARRYING** (the vocabulary in a comment
// rather than in code). `§3.4 R-3`'s SCOPE RULE states the two halves exactly:
// the VOCABULARY half reads the WHOLE module file, comments INCLUDED, over a
// NORMALIZED view (string-literal concatenation JOINED, template substitutions
// joined, identifier chunks re-joined) with a word/identifier BOUNDARY rule; the
// `'0px'`/`'fit-content'` LITERAL half reads CODE WITH COMMENTS STRIPPED (the
// clause forbids the literal as a mechanism CONSTANT, and a comment is not a
// constant). The banned spellings are this row's own DATA, so this file carries
// them as FRAGMENTS.
// ===========================================================================
const VOCAB_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['zo', 'ne'],
  ['pa', 'ne'],
  ['t', 'ab'],
  ['re', 'gion'],
  ['dash', 'board'],
  ['gut', 'ter'],
]
const VOCAB_WORDS: readonly string[] = VOCAB_FRAGMENTS.map((f) => f.join(''))
/** `§2.2` P-1's two banned mechanism literals, carried as fragments. */
const LITERAL_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['0', 'px'],
  ['fit-', 'content'],
]
const BANNED_LITERALS: readonly string[] = LITERAL_FRAGMENTS.map((f) => f.join(''))

const VOCAB_BOUNDARY = /[A-Za-z0-9_$]/
function boundedOccurrences(text: string, spelling: string): number {
  const needle = spelling.toLowerCase()
  const hay = text.toLowerCase()
  let count = 0
  let at = hay.indexOf(needle)
  while (at >= 0) {
    const before = at === 0 ? '' : hay[at - 1]
    const after = at + needle.length >= hay.length ? '' : hay[at + needle.length]
    if (!VOCAB_BOUNDARY.test(before) && !VOCAB_BOUNDARY.test(after)) count += 1
    at = hay.indexOf(needle, at + 1)
  }
  return count
}

/** The sentinel joining the assembled view's CHUNKS: it survives only where at
 *  least one side is a non-word character, so a spelling that ASSEMBLES across
 *  chunks is re-joined and scanned, while `{a: 1}`'s braces are never turned into
 *  letters and no token is invented out of a punctuation edge. */
const VOCAB_JOIN = '\u0001'

function assembledLetters(src: string): string {
  const chunks: string[] = []
  let i = 0
  const skipLine = (): void => {
    while (i < src.length && src[i] !== '\n') i += 1
  }
  const readQuoted = (quote: string, into: string[]): void => {
    i += 1
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
    i += 1
    into.push(value)
  }
  const readTemplate = (into: string[]): void => {
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
        into.push(part)
        part = ''
        i += 2
        let depth = 1
        while (i < src.length && depth > 0) {
          const ch = src[i]
          if (ch === '{') depth += 1
          else if (ch === '}') depth -= 1
          else if (ch === '"' || ch === "'") readQuoted(ch, into)
          else if (ch === '`') readTemplate(into)
          if (depth > 0) i += 1
        }
        i += 1
        continue
      }
      part += src[i]
      i += 1
    }
    into.push(part)
  }
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (ch === '/' && next === '/') {
      skipLine()
      continue
    }
    if (ch === '/' && next === '*') {
      i += 2
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i += 1
      i += 2
      continue
    }
    if (ch === '"' || ch === "'") {
      readQuoted(ch, chunks)
      continue
    }
    if (ch === '`') {
      readTemplate(chunks)
      continue
    }
    if (/[A-Za-z_$]/.test(ch)) {
      let name = ''
      while (i < src.length && /[A-Za-z0-9_$]/.test(src[i])) {
        name += src[i]
        i += 1
      }
      chunks.push(name)
      continue
    }
    i += 1
  }
  const joined = chunks.join(VOCAB_JOIN)
  let out = ''
  for (let at = 0; at < joined.length; at += 1) {
    if (joined[at] === VOCAB_JOIN) {
      const before = at === 0 ? '' : joined[at - 1]
      const after = at + 1 >= joined.length ? '' : joined[at + 1]
      if (VOCAB_BOUNDARY.test(before) && VOCAB_BOUNDARY.test(after)) continue
      out += ' '
      continue
    }
    out += joined[at]
  }
  return out
}

/** The violations of one text: `(1)` a BOUNDED spelling anywhere in the bytes
 *  (comments INCLUDED — `§3.4 R-3`'s scope rule) and `(2)` a BOUNDED spelling
 *  that ASSEMBLES out of the text's literals/identifiers (`§4.4 S-2`'s closure). */
function vocabularyViolations(src: string): string[] {
  const violations: string[] = []
  for (const word of VOCAB_WORDS) {
    if (boundedOccurrences(src, word) > 0) {
      violations.push(`RAW bounded occurrence of '${word}' (a comment counts, S-2)`)
    }
  }
  const assembled = assembledLetters(src)
  for (const word of VOCAB_WORDS) {
    if (boundedOccurrences(assembled, word) > 0) {
      violations.push(`ASSEMBLED bounded occurrence of '${word}' (token assembly is the SAME violation, S-2)`)
    }
  }
  return violations
}

/** `R-3`'s LITERAL half, scoped to CODE WITH COMMENTS STRIPPED (`§3.4 R-3`'s own
 *  scope rule, the half that reads the spelling as a mechanism CONSTANT). */
function literalViolations(code: string): string[] {
  const out: string[] = []
  for (const lit of BANNED_LITERALS) {
    if (boundedOccurrences(code, lit) > 0) out.push(`a '${lit}' literal in the module's CODE (P-1's binding negative)`)
  }
  return out
}

/** `R-3`'s POSITIVE controls: the evading forms `§4.4 S-2` names — raw,
 *  assembled across `+`-joined literals, carried in a comment, assembled in a
 *  template literal, and carried as an identifier. Built from the FRAGMENTS so
 *  this file's raw bytes never carry a joined spelling. */
const VOCAB_POSITIVE_CONTROLS: ReadonlyArray<readonly [string, string]> = [
  ['a raw spelling (not even assembled)', `${'const'} a = "${['zo', 'ne'].join('')}"`],
  ['assembled across a line break', `${'const'} b = "${['pa', 'ne'].join('')}" +\n  "${['t', 'ab'].join('')}"`],
  ['carried in a comment (comments are scanned like code)', `/* the ${['re', 'gion'].join('')} word in a comment */`],
  ['assembled in a template literal with substitutions', ['const c = `', '${"dash"}', '${"board"}', '`'].join('')],
  ['carried as an IDENTIFIER', `${'const'} ${['zo', 'ne'].join('')} = true`],
]
/** A control of the BOUNDARY rule's other half: two ordinary word chunks adjacent
 *  in the assembled view are separated (their join is a token boundary). */
const VOCAB_BOUNDARY_CONTROL = `${'const'} ${['tr'].join('')} = 1\n${'const'} ${['ack'].join('')} = 2`
/** The NEGATIVE control: this unit's own legitimate text — the value export
 *  name, the two lookup names, the delegate's two names and a diagnostic. */
const VOCAB_NEGATIVE_CONTROL =
  `export function computeTrackVars(values: unknown, totals: unknown, dims: unknown, show: unknown, meta: unknown) {\n` +
  `  return isEmpty(totals, values) ? trackFor(meta, dims, show) : ''\n` +
  `}\n` +
  `const sizes: Readonly<Record<string, unknown>> = {}\n`

// ===========================================================================
// §3.4 R-6 — THE GEOMETRY TOKENS, carried as FRAGMENTS: the row scans the MODULE
// **and this unit's own `[T]` test file**, and a file that must name the tokens
// it bans can only fail a scan that reads the joined spelling out of its own rule
// list. The file half therefore reads RAW bytes (the row's stated limit).
// ===========================================================================
const GEOM_CALL_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['get', 'Computed', 'Style'],
  ['getBounding', 'ClientRect'],
  ['offset', 'Width'],
  ['offset', 'Height'],
  ['client', 'Width'],
  ['client', 'Height'],
  ['scroll', 'Width'],
  ['scroll', 'Height'],
  ['match', 'Media'],
  ['inner', 'HTML'],
]
/** The CALL forms only — a MEMBER ACCESS or a WRITE, never the bare spelling. The
 *  specifier form is stated because this file must be able to NAME the tokens it
 *  bans: this row’s own rule list and the prohibition lists above carry some of
 *  these spellings inside string literals, and a scan that fired on its own rule
 *  list could only ever fail. A module reading or writing one of these members
 *  necessarily carries the access form, so the binding negative stays falsifiable
 *  (the POSITIVE controls below prove it). */
const GEOM_CALL_RES: readonly RegExp[] = GEOM_CALL_FRAGMENTS.map(
  (f) => new RegExp(`[.\\[]\\s*['"]?${f.join('')}\\b|\\b${f.join('')}\\s*\\(`),
)
/** The claim words `§3.4 R-6` forbids in an assertion message or a description. */
const GEOM_CLAIM_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['render', 'ed'],
  ['lay', 'out'],
  ['pa', 'int'],
  ['CSS', ' valid'],
]
const GEOM_CLAIM_RES: readonly RegExp[] = GEOM_CLAIM_FRAGMENTS.map((f) => new RegExp(`\\b${f.join('')}\\b`, 'i'))

/** The `§3.4 R-6` half that binds THIS FILE: raw bytes plus the extracted row
 *  DESCRIPTIONS (`it`/`describe` titles). Both are asserted by `R-6` and by
 *  `I-8`, so a row that started claiming a resolved fact fails twice. */
function ownGeometryViolations(): string[] {
  const own = readFileSync(TEST_FILE, 'utf8')
  const out: string[] = []
  for (const re of GEOM_CALL_RES) {
    for (const hit of staticHits(own, re)) out.push(`this file takes a geometry observation — ${hit}`)
  }
  for (const title of rowTitles(own)) {
    for (const re of GEOM_CLAIM_RES) {
      if (re.test(title)) out.push(`a row description claims a resolved fact — ${JSON.stringify(title)}`)
    }
  }
  return out
}
function rowTitles(src: string): string[] {
  return [...src.matchAll(/\b(?:it|describe)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g)].map((m) => m[1])
}

// ===========================================================================
// §3.4 R-4 / `§3.3 I-7` — THE AMBIENT-REALM TOKENS, carried as FRAGMENTS for the
// same reason the geometry tokens are: this file must be able to NAME the tokens
// it bans, and a rule list that spelled them joined would put them into this
// file's own bytes.
// ===========================================================================
const AMBIENT_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['doc', 'ument'],
  ['win', 'dow'],
  ['global', 'This'],
  ['se', 'lf'],
  ['to', 'p'],
  ['par', 'ent'],
  ['fra', 'mes'],
  ['active', 'Element'],
  ['local', 'Storage'],
]
const AMBIENT_TOKENS: readonly string[] = AMBIENT_FRAGMENTS.map((f) => f.join(''))
const AMBIENT_RE = new RegExp(`\\b(${AMBIENT_TOKENS.join('|')})\\b`)
const AMBIENT_COMPUTED_RE = new RegExp(
  `\\b(${['doc', 'ument'].join('')}|${['win', 'dow'].join('')}|${['global', 'This'].join('')}|${['se', 'lf'].join('')})\\s*\\[`,
)
const AMBIENT_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  { what: 'an ambient realm token (Layer anchor 3: every input is an argument)', re: AMBIENT_RE },
  { what: 'a computed access on a banned realm token or an alias of one', re: AMBIENT_COMPUTED_RE },
  { what: 'a random/time ambient read', re: /\b(Math\.random|Date\.now|new\s+Date|performance\.now)\b/ },
  { what: 'a process/env read', re: /\b(process\.env|process\.argv|process\.platform)\b/ },
  { what: 'a node realm read', re: /\b(node:fs|require\s*\(|__dirname|__filename|import\.meta\.url)\b/ },
  { what: 'an eval/Function-constructed access (the same violation as the token)', re: /\b(eval|Function)\s*\(/ },
  { what: 'a realm construction route (Function.prototype.constructor, Reflect.construct)', re: /\b(Reflect\.construct|constructor\.constructor)\b/ },
]
/** `R-4`'s ZERO-module-state half: any module-scope mutable binding. */
const MODULE_STATE_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  { what: 'a module-scope `let`/`var` (a store, cache, memo or counter)', re: /^(?:export\s+)?(?:let|var)\s/m },
  { what: 'a `WeakMap`/`Map`/`Set` module-scope container (a cache or registry)', re: /\b(new\s+(?:WeakMap|WeakSet|Map|Set)\s*\()/ },
  { what: 'a module-scope assignment after a declaration (a memo write)', re: /^\s{0,2}\w+\s*=\s*[^=]/m },
]

// ===========================================================================
// §2.2/`§5.1` — THE CHANGE-SET CENSUS (shared by `R-8`/`R-10`).
// ===========================================================================
function gitOrNull(args: readonly string[]): string[] | null {
  try {
    const out = execFileSync('git', [...args], { encoding: 'utf8' })
    return out.split('\n').map((line) => line.trim()).filter((line) => line.length > 0)
  } catch {
    return null
  }
}
function treeChangeSet(): { paths: string[]; raw: string } {
  try {
    const raw = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
    const paths = raw
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.slice(3).trim().replace(/^"|"$/g, ''))
    return { paths, raw }
  } catch (e) {
    return { paths: [], raw: `<<git unavailable: ${describeThrown(e)}>>` }
  }
}
/** The COMMITTED range anchored at the commit that ADDED this file (the unit's
 *  own red-set commit), through `HEAD`; `null` while that commit does not exist
 *  yet (the honest RED-time state — nothing is committed, `RCA-8(a)`). The anchor
 *  is returned WITH the range because the unit-scoped partition must include the
 *  anchor commit's own files. */
function committedChangeSet(): { anchor: string; range: string; paths: string[] } | null {
  const added = gitOrNull(['log', '--diff-filter=A', '--format=%H', '--', TEST_RELPATH])
  const anchor = added === null ? undefined : added.filter((l) => /^[0-9a-f]{7,40}$/.test(l))[0]
  if (anchor === undefined) return null
  const range = `${anchor}..HEAD`
  const listed = gitOrNull(['log', '--name-only', '--pretty=format:', range])
  if (listed === null) return null
  return { anchor, range, paths: Array.from(new Set(listed)).sort() }
}

/** This unit's OWN `*-greens.md` artifact (RCA-4's gate-5 blind-greens set,
 *  `§5.1` row 4: any `docs/specs/census-*.md` of this unit). */
const CENSUS_GREENS_PROBE = /^docs\/specs\/census[^/]*-greens\.md$/
/** This unit's own gate-7 documentation-review record under `archive/reviews/`. */
const CENSUS_REVIEW_PROBE = /^archive\/reviews\/[^/]*(U-CENSUS|census)[^/]*\.md$/
/** This unit's OWN artifacts — the allow-list's code/spec half plus its gate
 *  artifacts (`§5.1` rows 1–4). */
function isCensusUnitArtifact(path: string): boolean {
  return (
    path === MODULE_RELPATH ||
    path === TEST_RELPATH ||
    path === 'docs/specs/census.md' ||
    CENSUS_GREENS_PROBE.test(path) ||
    CENSUS_REVIEW_PROBE.test(path)
  )
}
/** **THE UNIT-SCOPED COMMIT PARTITION** (`§5.1`'s COMMIT-RANGE SCOPE RULE, the
 *  rule the last three passes converged on): the anchored range is
 *  `anchor..HEAD` and HEAD moves through LATER UNITS' commits, so a census over
 *  the WHOLE range charges this unit for every unit that lands after it. A commit
 *  that touches NONE of this unit's artifacts is another unit's commit and is OUT
 *  of this row's jurisdiction — a boundary, not a licence: a commit carrying one
 *  of this unit's paths TOGETHER WITH `package.json` (or `src/main/**`, or a
 *  sibling artifact) still FAILS. */
function unitScopedCommitted(
  anchor: string,
  range: string,
): { commitsInRange: number; unitCommits: number; files: string[]; allFilesOfUnitCommits: string[] } {
  const listed = [
    ...(gitOrNull(['show', '--name-only', '--format=@@%H', anchor]) ?? []),
    ...(gitOrNull(['log', '--format=@@%H', '--name-only', range]) ?? []),
  ]
  const perCommit = listed
    .join('\n')
    .split('@@')
    .filter((block) => block.trim().length > 0)
    .map((block) => {
      const parts = block
        .split('\n')
        .map((line) => line.trim().replace(/^"|"$/g, ''))
        .filter((line) => line.length > 0)
      return { sha: parts[0] ?? '', files: parts.slice(1) }
    })
  const unitCommits = perCommit.filter((c) => c.files.some(isCensusUnitArtifact))
  const inJurisdiction = (path: string): boolean =>
    isCensusUnitArtifact(path) || /^docs\//.test(path) || CENSUS_REVIEW_PROBE.test(path)
  const kept = unitCommits.map((c) => ({ sha: c.sha, files: c.files.filter(inJurisdiction) }))
  return {
    commitsInRange: perCommit.length,
    unitCommits: unitCommits.length,
    files: Array.from(new Set(kept.flatMap((c) => c.files))).sort(),
    allFilesOfUnitCommits: Array.from(new Set(unitCommits.flatMap((c) => c.files))).sort(),
  }
}

// ===========================================================================
// §2.3 — THE SHARED DRIVE DATA, the hostile shapes, and the small helpers.
// ===========================================================================
const SPEC_A: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' }
const SPEC_M1: TrackSpec = { trackProp: '--w', unit: 'px', emptyToken: ['0', 'px'].join('') }
const SIZES_A: Readonly<Record<string, unknown>> = { a: 40 }
const SPECS_A: Readonly<Record<string, unknown>> = { a: SPEC_A }

const hasOwn = Object.prototype.hasOwnProperty
function own(target: object, name: string): boolean {
  return hasOwn.call(target, name)
}
function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}
function brief(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'symbol') return value.toString()
  if (typeof value === 'bigint') return `${String(value)}n`
  if (typeof value === 'function') return 'a function'
  if (Array.isArray(value)) return `an array of ${value.length}`
  if (typeof value === 'object') return `{${Object.keys(value).join(',')}}`
  return String(value)
}
/** The own enumerable string keys of a returned record, or a labelled reason the
 *  row is red — the KEY-SET half of `C-A` is asserted through this. */
function keysOf(record: unknown): string[] {
  expect(typeof record, `C-A/§2.1 — the returned value is an object (got ${brief(record)})`).toBe('object')
  expect(record === null, 'C-A/§2.1/I-1 — the returned value is never null').toBe(false)
  return Object.keys(record as Record<string, unknown>)
}
/** Set equality (never a bag comparison) — `C-A` is a SET claim. */
function sameSet(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((k) => right.includes(k))
}
function recordOf(record: unknown): Record<string, string> {
  return record as Record<string, string>
}
/** `§2.3` item 1 (ii)'s hostile iterator: throws at `next()`. */
function throwingIteratorObject(): unknown {
  return {
    [Symbol.iterator](): Iterator<unknown> {
      return {
        next(): IteratorResult<unknown> {
          throw new Error('the iterator threw at next()')
        },
      }
    },
  }
}
/** `§2.3` item 1's shape (a) with a CALLABLE iterator that yields the members
 *  and then throws — the CAUGHT class (`I-1`; `P-CN-SM-1` shape 1). */
function iteratorThrowingAfter(members: readonly unknown[]): unknown {
  return {
    [Symbol.iterator](): Iterator<unknown> {
      let at = 0
      return {
        next(): IteratorResult<unknown> {
          if (at < members.length) {
            const value = members[at]
            at += 1
            return { value, done: false }
          }
          throw new Error('the iterator threw after yielding its members')
        },
      }
    },
  }
}
/** `§2.3` item 1 (i): a `Symbol.iterator` present but NOT callable falls to shape
 *  (b) — the record branch — or to shape (c). */
function nonCallableIteratorObject(): unknown {
  return { [Symbol.iterator]: 42, a: 0, b: 1 }
}
/** A record whose OWN accessor for `key` throws (`F-4`, `F-5`). */
function throwingAccessorRecord(key: string): Record<string, unknown> {
  const record: Record<string, unknown> = { a: 0, b: 1 }
  Object.defineProperty(record, key, {
    get(): never {
      throw new Error(`the accessor for '${key}' threw`)
    },
    enumerable: true,
    configurable: true,
  })
  return record
}
/** `F-5`'s hostile `Proxy` census: every trap throws (`§2.3` item 2). */
function hostileProxy(): unknown {
  const thrower = (): never => {
    throw new Error('the hostile proxy trap threw')
  }
  return new Proxy({}, { get: thrower, has: thrower, getOwnPropertyDescriptor: thrower, ownKeys: thrower })
}
/** A REVOKED `Proxy` (`P-CN-SM-1` shape 4). */
function revokedProxy(): unknown {
  const { proxy, revoke } = Proxy.revocable({ a: 0 }, {})
  revoke()
  return proxy
}
/** `C-B`'s observable snapshot — the SET `§2.4 C-B` (a)–(i) names: own keys in
 *  order+content, every own value by identity, the prototype, frozen-ness, the
 *  own descriptors, and a `Map`'s size+entries / a `Set`'s members. */
function observableSnapshot(value: unknown): string {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return `primitive:${brief(value)}`
  }
  try {
    const target = value as Record<string, unknown>
    const keys = Object.keys(target)
    const values = keys.map((k) => {
      try {
        return brief(target[k])
      } catch (e) {
        return `<<accessor threw: ${describeThrown(e)}>>`
      }
    })
    const proto = Object.getPrototypeOf(value)
    const protoLabel = proto === null ? 'null' : proto === Object.prototype ? 'Object.prototype' : proto === Map.prototype ? 'Map.prototype' : proto === Set.prototype ? 'Set.prototype' : 'other'
    const descriptors = keys.map((k) => {
      const d = Object.getOwnPropertyDescriptor(target, k)
      return `${k}:{e=${String(d?.enumerable)}c=${String(d?.configurable)}w=${String(d?.writable)}get=${typeof d?.get}set=${typeof d?.set}}`
    })
    const extra =
      value instanceof Map
        ? `mapSize=${value.size} entries=${JSON.stringify([...value.entries()])}`
        : value instanceof Set
          ? `setSize=${value.size} members=${JSON.stringify([...value])}`
          : 'n/a'
    return `keys=${JSON.stringify(keys)} values=${JSON.stringify(values)} proto=${protoLabel} frozen=${String(
      Object.isFrozen(value),
    )} sealed=${String(Object.isSealed(value))} descriptors=${JSON.stringify(descriptors)} ${extra}`
  } catch (e) {
    return `<<snapshot threw: ${describeThrown(e)}>>`
  }
}

/** `§2.2`/`§5.1` — the small file readers `R-7`/`R-13` need. The HARNESS may read
 *  files; the MODULE may not (`R-4`). */
function walkSourceFiles(): readonly string[] {
  return [
    'src/main/main.ts',
    'src/main/mcp-server.ts',
    'src/main/preload.ts',
    'src/main/security.ts',
    'src/renderer/renderer.ts',
    'src/shared/types.ts',
    'src/shared/dom-shim.ts',
    'src/shared/zones.ts',
    'src/shared/layout-projection.ts',
    'src/shared/slot-host.ts',
    'src/shared/owned-list-host.ts',
    'src/shared/mount-invariant-guard.ts',
    'src/shared/path-fork-cycle.ts',
    'src/shared/demo-envelope.ts',
  ].filter((rel) => existsSync(`${REPO_ROOT}/${rel}`))
}
/** Every `census*` path under `src/**` or `tests/**` in the WORKING TREE (a
 *  recursive `readdirSync` census, `node_modules` pruned). `R-10` asserts this set
 *  is EXACTLY this red set while the module is absent, so a second unit-owned
 *  artefact under a unit-owned path is a FINDING rather than a silent extra. */
function walkCensusPaths(): string[] {
  const found: string[] = []
  const visit = (rel: string): void => {
    const entries = readdirSync(`${REPO_ROOT}/${rel}`, { withFileTypes: true })
    for (const entry of entries) {
      const child = `${rel}/${String(entry.name)}`
      if (entry.isDirectory()) {
        if (String(entry.name) === 'node_modules' || String(entry.name).startsWith('.')) continue
        visit(child)
        continue
      }
      if (/^census/i.test(String(entry.name))) found.push(child)
    }
  }
  for (const root of ['src', 'tests']) visit(root)
  return found.sort()
}
/** Read a live string-array literal from a source file (`§4.4 S-3`: the seam rows
 *  assert SET EQUALITY AGAINST THE NAMES and read the declaration, never a copy). */
function readArrayLiteral(rel: string, re: RegExp): string[] {
  const src = readFileSync(`${REPO_ROOT}/${rel}`, 'utf8')
  const match = re.exec(src)
  expect(
    match !== null,
    `the LIVE declaration read by this row exists in ${rel} (the row asserts the live source of truth, never a literal copy)`,
  ).toBe(true)
  const start = (match?.index ?? 0) + (match?.[0].length ?? 0)
  const end = src.indexOf(']', start)
  expect(end, `the declaration's literal array in ${rel} is terminated, so the read is not vacuous`).toBeGreaterThan(start)
  const body = src.slice(start, end)
  return (body.match(/'[^'\n]*'|"[^"\n]*"/g) ?? []).map((s) => s.slice(1, -1))
}
/** Read a live union's member names from a source file. */
function readUnionMembers(rel: string, re: RegExp): string[] {
  const src = readFileSync(`${REPO_ROOT}/${rel}`, 'utf8')
  const at = re.exec(src)
  expect(at !== null, `the live union declaration read by this row exists in ${rel}`).toBe(true)
  const lines = src.slice(at?.index ?? 0).split('\n')
  const kept = [lines[0]]
  for (let i = 1; i < lines.length; i += 1) {
    if (!/^\s*\|/.test(lines[i])) break
    kept.push(lines[i])
  }
  return (kept.join('\n').match(/'[^'\n]*'/g) ?? []).map((s) => s.slice(1, -1))
}
/** `§2.3` item 2 — the census handed to the delegate is the caller’s OPAQUE value,
 *  and this unit never reads it; the register rows compose their own independent
 *  expectation from the SAME value, so this identity helper exists only to make
 *  that composition explicit. */
function censusOf(census: unknown): unknown {
  return census
}

// ===========================================================================
// R-11/R-12/R-13 — §3.5 THE EXISTENCE ROWS, AUTHORED FIRST OF ALL (`§4.2` item
// 1): they are the red's own premise and are evaluable before the module exists.
// ===========================================================================
describe('R-11/R-12/R-13 — §3.5 the existence rows (the red’s own premise)', () => {
  it('R-11 §3.5 — the ABSENT-PAGE-DESIGN probe: `docs/skills/designing-pages.md` does not exist (a FAIL is MEANINGFUL)', () => {
    // `§1` item 10 / `§7` item 9: the file does not exist, so this unit owes no
    // test-use-case coverage row and no demo-page index entry. IF IT EXISTS this
    // row FAILS MEANINGFULLY: this unit then OWES a coverage row in that file's
    // matrix plus an entry in its demo-page index — and this filing's position is
    // that the mechanism renders no page, so the row would be an ABSENCE row.
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    expect(
      existsSync(pageDesign),
      'R-11/§1 item 10 — `docs/skills/designing-pages.md` DOES NOT EXIST at the time this red set runs; a FAIL is the obligation stated above',
    ).toBe(false)
    // NON-VACUITY: the sibling path DOES exist (globbed `docs/skills/*` at filing),
    // so `existsSync` on this directory really answers true for a present file.
    expect(
      existsSync(new URL('../docs/skills/process-guardrails.md', import.meta.url)),
      'R-11/§3.5 — the probe is not vacuous: `docs/skills/process-guardrails.md` DOES exist',
    ).toBe(true)
  })

  it('R-12 §3.5 — the PREDECESSOR-SURFACE row (the delegate premise): `src/shared/zones.ts` exists, exports exactly `isEmpty` + `trackFor` as values, and imports nothing', () => {
    // The three facts EVERY delegation row in this file rests on (`docs/specs/
    // zones.md` `§2.1`'s delegate clause, `§3.4 R-5`). A predecessor whose surface
    // moved means this spec cites a surface that no longer exists — a
    // `docs/decisions.md`-class matter for the supervisor — and `§3.4 R-1` FAILS
    // with it, so this unit cannot be reported green on a moved delegate.
    const zonesSrc = new URL('../src/shared/zones.ts', import.meta.url)
    expect(existsSync(zonesSrc), 'R-12/§3.5 — the landed predecessor `src/shared/zones.ts` EXISTS').toBe(true)
    expect(
      Object.keys(delegate).filter((k) => k !== 'default').sort(),
      'R-12/§3.5 — the predecessor’s RUNTIME exports are EXACTLY `isEmpty` and `trackFor` (SET EQUALITY, never a count); `TrackSpec` is the third, TYPE-ONLY name (`docs/specs/zones.md` §2.1)',
    ).toEqual(['isEmpty', 'trackFor'])
    expect(typeof delegate.isEmpty, 'R-12 — `isEmpty` is callable').toBe('function')
    expect(typeof delegate.trackFor, 'R-12 — `trackFor` is callable').toBe('function')
    // The TYPE-ONLY third name is a compile-time claim: the `import type` below
    // does not compile unless `TrackSpec` is exported (`§5.2` leg 4).
    const specFromDelegate: ModuleTrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'x' }
    expect(
      Object.keys(specFromDelegate).sort(),
      'R-12/§3.5 — `TrackSpec` is exported by the predecessor and carries exactly `trackProp` · `unit` · `emptyToken` (this row does not COMPILE otherwise — leg 4)',
    ).toEqual(['emptyToken', 'trackProp', 'unit'])
    // `imports nothing` — the predecessor's own static claim, re-read here so the
    // premise is asserted and not assumed.
    const code = stripComments(readFileSync(zonesSrc, 'utf8'))
    expect(
      staticHits(code, /\b(?:import|require)\b/),
      'R-12/§3.5 — the predecessor imports NOTHING (the premise of `§3.4 R-1`)',
    ).toEqual([])
  })

  it('R-13 §3.5 — the NO-CONSUMER row: `src/shared/census.ts` is imported by NO file under `src/**` (asserted NON-VACUOUSLY)', () => {
    const files = walkSourceFiles()
    expect(
      files.length,
      `R-13/§7 item 2 — the search really read \`src/**\` (a vacuous search would satisfy this row for free): ${JSON.stringify(
        files,
      )}`,
    ).toBeGreaterThan(10)
    const importers = files.filter((rel) =>
      /from\s+['"][^'"]*shared\/census(\.js)?['"]/.test(stripComments(readFileSync(`${REPO_ROOT}/${rel}`, 'utf8'))),
    )
    expect(
      importers,
      'R-13/§7 item 2 — at RED time `src/shared/census.ts` is imported by NO `src/**` file (a consumer would be a later unit’s row, with its own spec)',
    ).toEqual([])
    // The scanner's own falsifiability: a fixture that imports the module FAILS
    // the same predicate, so the row is not satisfied by a regex that matches
    // nothing.
    const fixture = `import { computeTrackVars } from './shared/census.js'\n`
    expect(
      /from\s+['"][^'"]*shared\/census(\.js)?['"]/.test(stripComments(fixture)),
      'R-13 POSITIVE control — a fixture importing the module FAILS the scanner (the row is otherwise UNFALSIFIED)',
    ).toBe(true)
  })
})

// ===========================================================================
// I-1..I-10 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — TOTALITY: a record for EVERY input and NEVER a throw, over the hostile shapes (`§2.3` item 1 (ii)/(iv), `§0A` note 8)', async () => {
    const fn = await surface('I-1 §2.3 item 1 / §5.5.1 P-CN-SM-1')
    const spec: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' }
    const hostileShapes: ReadonlyArray<readonly [string, unknown]> = [
      ['a `zones` whose iterator throws at next()', throwingIteratorObject()],
      ['a `zones` whose iterator throws AFTER yielding', iteratorThrowingAfter(['a', 'b'])],
      ['a `zones` whose `Symbol.iterator` is present but NOT callable', nonCallableIteratorObject()],
      ['a `zones` array holding a `Symbol` member beside strings', ['a', Symbol('s')]],
      ['a revoked Proxy as `census`', revokedProxy()],
      ['a `census` whose own accessor throws', throwingAccessorRecord('a')],
      ['a hostile Proxy `census`', hostileProxy()],
      ['a `sizes` callable that throws', () => { throw new Error('sizes threw') }],
      ['a `specOf` callable that throws', () => { throw new Error('specOf threw') }],
      ['a `revealed` callable that throws', () => { throw new Error('revealed threw') }],
      ['a `size` of `0n` (a BigInt reaching the delegate)', 0n],
      ['a `specOf` record whose own accessor throws', throwingAccessorRecord('a')],
      ['`null` zones', null],
      ['`undefined` zones', undefined],
      ['a primitive zones', 42],
      ['a string primitive zones', 'ab'],
      ['a function zones without a callable iterator', () => 1],
      ['`null` revealed with a non-empty zones', null],
    ]
    expect(
      hostileShapes.length,
      'I-1/§5.5.1 P-CN-SM-1 — the hostile surface this invariant quantifies over is enumerated here (18 shapes; the register drives a 10-class subset x 3 passes)',
    ).toBe(18)
    for (const [label, zones] of hostileShapes) {
      let got: unknown
      let threw: string | null = null
      try {
        got = fn(zones, { a: 0 }, { a: 40 }, () => true, { a: spec })
      } catch (e) {
        threw = describeThrown(e)
      }
      expect(
        threw,
        `I-1/§2.1 — computeTrackVars NEVER throws: it is TOTAL for every input (${label}); it threw ${threw ?? ''}`,
      ).toBe(null)
      expect(
        typeof got === 'object' && got !== null && !Array.isArray(got),
        `I-1/§2.1 — the returned value is a non-null, non-array OBJECT for every input (${label}); got ${brief(got)}`,
      ).toBe(true)
      expect(
        Object.getPrototypeOf(got),
        `I-1/I-10 — the returned record is NULL-PROTOTYPE for every input (${label})`,
      ).toBe(null)
    }
  })

  it('I-2 §3.3 — THE KEY-SET INVARIANT (C-A): set equality against the enumerated zone set, never an extra key and never an omission, in first-seen order', async () => {
    const fn = await surface('I-2 §2.4 C-A')
    const drives: ReadonlyArray<readonly [string, unknown, readonly string[]]> = [
      ['a record enumeration', { a: 0, b: 1 }, ['a', 'b']],
      ['a `Map` enumeration (its KEYS, never its values)', new Map<string, number>([['a', 1], ['b', 2]]), ['a', 'b']],
      ['a `Set` enumeration', new Set(['a', 'b']), ['a', 'b']],
      ['an array enumeration', ['a', 'b'], ['a', 'b']],
      ['an empty array (an empty set is the empty record)', [], []],
      ['a record with no own enumerable keys', {}, []],
      ['`null` (zero zones)', null, []],
      ['`undefined` (zero zones)', undefined, []],
      ['a primitive (zero zones)', 42, []],
    ]
    for (const [label, zones, expected] of drives) {
      const record = fn(zones, { a: 0, b: 3 }, { a: 40, b: 40 }, () => true, { a: SPEC_A, b: SPEC_A })
      const keys = keysOf(record)
      expect(
        sameSet(keys, expected) && keys.length === expected.length,
        `I-2/§2.4 C-A — the record’s own enumerable string-key set EQUALS the enumerated zone set (${label}): expected ${JSON.stringify(
          expected,
        )}, got ${JSON.stringify(keys)}`,
      ).toBe(true)
      expect(
        keys,
        `I-2/§2.3 item 1 / §0A note 7 — the keys are in FIRST-SEEN enumeration order (${label})`,
      ).toEqual(expected)
      // The C-B half of the same drive: the enumeration is not mutated by the call.
      expect(
        observableSnapshot(zones),
        `I-2/§2.4 C-B — the zone enumeration is observably UNCHANGED by the call (${label})`,
      ).toBe(observableSnapshot(zones))
    }
  })

  it('I-3 §3.3 — THE NEVER-MUTATE INVARIANT (C-B): no argument is mutated and none is retained, over every named observable', async () => {
    const fn = await surface('I-3 §2.4 C-B')
    // ── the record census, with a `-0` and a `NaN` value (C-B (b))
    const census: Record<string, unknown> = { a: 0, b: 3, minusZero: -0, notANumber: Number.NaN }
    const censusBefore = observableSnapshot(census)
    const zones: string[] = ['a', 'b']
    const zonesBefore = observableSnapshot(zones)
    const sizes: Record<string, unknown> = { a: 40 }
    const sizesBefore = observableSnapshot(sizes)
    const specOf: Record<string, unknown> = { a: SPEC_A }
    const specOfBefore = observableSnapshot(specOf)
    const predicate = (): boolean => true
    const predicateBefore = observableSnapshot(predicate)
    const first = fn(zones, census, sizes, predicate, specOf)
    expect(observableSnapshot(census), 'I-3/§2.4 C-B (a)(b)(c)(d)(e)(h) — the CENSUS is unchanged: own keys in order+content, every own value by identity, prototype, frozen-ness, own descriptors, and NO key/default/sentinel written').toBe(
      censusBefore,
    )
    expect(observableSnapshot(zones), 'I-3/§2.4 C-B — the ZONES argument is unchanged').toBe(zonesBefore)
    expect(observableSnapshot(sizes), 'I-3/§2.4 C-B — the `sizes` record is unchanged').toBe(sizesBefore)
    expect(observableSnapshot(specOf), 'I-3/§2.4 C-B — the `specOf` record is unchanged').toBe(specOfBefore)
    expect(observableSnapshot(predicate), 'I-3/§2.4 C-B — the predicate object is unchanged').toBe(predicateBefore)
    // ── the same observables for a `Map` census (C-B (f)) and a `Set` census (g)
    const mapCensus = new Map<unknown, unknown>([['a', 0], ['b', 1]])
    const mapBefore = observableSnapshot(mapCensus)
    fn(zones, mapCensus, sizes, predicate, specOf)
    expect(observableSnapshot(mapCensus), 'I-3/§2.4 C-B (f) — a `Map` census keeps its `size` and its entries, in order and content').toBe(mapBefore)
    const setCensus = new Set(['a'])
    const setBefore = observableSnapshot(setCensus)
    fn(zones, setCensus, sizes, predicate, specOf)
    expect(observableSnapshot(setCensus), 'I-3/§2.4 C-B (g) — a `Set` census keeps its members').toBe(setBefore)
    // ── a FROZEN census behaves exactly like its unfrozen twin and accepts the call
    const frozenCensus = Object.freeze({ a: 0, b: 3 })
    const frozenBefore = observableSnapshot(frozenCensus)
    const frozenRecord = fn(zones, frozenCensus, sizes, predicate, specOf)
    expect(observableSnapshot(frozenCensus), 'I-3/§2.4 C-B (d) — a FROZEN census stays frozen and is observably unchanged by the call').toBe(frozenBefore)
    expect(Object.isFrozen(frozenCensus), 'I-3/§2.4 C-B (d) — frozen-ness is unchanged (a frozen census stays frozen)').toBe(true)
    const unfrozenRecord = fn(zones, { a: 0, b: 3 }, sizes, predicate, specOf)
    expect(frozenRecord, 'I-3/§2.4 C-B (d) — the frozen twin’s record equals the unfrozen twin’s').toEqual(unfrozenRecord)
    // ── a descriptor rewrite is a mutation even when `Object.keys` agrees (C-B (e))
    const withGetter: Record<string, unknown> = {}
    Object.defineProperty(withGetter, 'a', { get: () => 0, enumerable: true, configurable: true })
    const getterBefore = observableSnapshot(withGetter)
    fn(['a'], withGetter, sizes, predicate, specOf)
    expect(observableSnapshot(withGetter), 'I-3/§2.4 C-B (e) — a GETTER stays a getter: no property is redefined').toBe(getterBefore)
    // ── NO RETENTION (C-B (i)): census A, then census B, then census A again
    const censusA = { a: 0 }
    const censusB = { a: 3 }
    const a1 = fn(['a'], censusA, { a: 40 }, predicate, specOf)
    const b1 = fn(['a'], censusB, { a: 40 }, predicate, specOf)
    const a2 = fn(['a'], censusA, { a: 40 }, predicate, specOf)
    expect(a1, 'I-3/§2.4 C-B (i) — the first census’s result is reproduced after a DIFFERENT census was driven in between (no memo, no cache, no WeakMap)').toEqual(a2)
    expect(
      b1.a !== a1.a,
      `I-3/§2.4 C-B (i) — the two censuses really produced different values, so the retention check is not vacuous (A ⇒ ${brief(
        a1.a,
      )}, B ⇒ ${brief(b1.a)})`,
    ).toBe(true)
    expect(first, 'I-3/§2.4 C-B (i) — the first drive’s record is stable across the later drives').toEqual(
      fn(zones, census, sizes, predicate, specOf),
    )
  })

  it('I-4 §3.3 — THE DELEGATION INVARIANT: every token byte comes from `trackFor`, every emptiness decision from `isEmpty`, with `(census, zoneId)` in that order', async () => {
    const fn = await surface('I-4 §2.3 items 2/6')
    resetDelegateLog()
    const census = { a: 0, b: 3 }
    const zones = ['a', 'b']
    const sizes = { a: 40, b: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A, b: SPEC_A }
    const record = fn(zones, census, sizes, () => true, specOf)
    expect(
      DELEGATE_LOG.isEmpty.length,
      `I-4/§2.3 item 6 — \`isEmpty\` is called EXACTLY ONCE per ENUMERATED zone that passes the reveal gate (2 zones ⇒ 2 calls); observed ${DELEGATE_LOG.isEmpty.length}: ${JSON.stringify(
        DELEGATE_LOG.isEmpty.map(([c, z]) => [brief(c), brief(z)]),
      )}`,
    ).toBe(2)
    expect(
      DELEGATE_LOG.trackFor.length,
      `I-4/§2.3 item 6 — \`trackFor\` is called EXACTLY ONCE per revealed zone (2 zones ⇒ 2 calls); observed ${DELEGATE_LOG.trackFor.length}`,
    ).toBe(2)
    for (const [index, call] of DELEGATE_LOG.isEmpty.entries()) {
      expect(
        call[0],
        `I-4/§2.3 item 2 — \`isEmpty\` receives the CENSUS FIRST and BY IDENTITY (call ${index + 1}): the census is handed through unchanged, never copied`,
      ).toBe(census)
      expect(
        call[1],
        `I-4/§2.3 item 1 — \`isEmpty\` receives the ZONE MEMBER VERBATIM (call ${index + 1}): ${brief(call[1])}`,
      ).toBe(zones[index])
    }
    for (const [index, call] of DELEGATE_LOG.trackFor.entries()) {
      const zone = zones[index]
      expect(call[0], `I-4/§2.1 — \`trackFor\` receives the spec \`specOf\` yielded for ${brief(zone)}`).toBe(specOf[zone])
      expect(call[1], `I-4/§2.1 — \`trackFor\` receives the size \`sizes\` yielded for ${brief(zone)}`).toBe(sizes[zone as 'a'])
      expect(
        call[2],
        `I-4/§2.3 item 2 — \`isEmpty\`'s boolean reaches \`trackFor\`'s THIRD argument UNMODIFIED for ${brief(zone)}`,
      ).toBe(delegate.isEmpty(census, zone))
    }
    for (const zone of zones) {
      const direct = delegate.trackFor(specOf[zone], sizes[zone as 'a'], delegate.isEmpty(census, zone))
      expect(
        recordOf(record)[zone],
        `I-4/§2.3 item 6 — the record's value for ${brief(zone)} is \`trackFor\`'s returned string BYTE-IDENTICALLY (a direct composition of the same delegate calls): expected ${brief(
          direct,
        )}`,
      ).toBe(direct)
    }
    // ── ZERO calls for the no-decision and declined cases (`§2.3` item 6).
    resetDelegateLog()
    fn(zones, census, sizes, () => false, specOf)
    expect(
      DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
      'I-4/§2.3 item 6 — a NOT-DISPLAYED zone costs ZERO delegate calls (revealed ⇒ false)',
    ).toBe(0)
    resetDelegateLog()
    fn(zones, census, sizes, undefined, specOf)
    expect(
      DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
      'I-4/§2.3 item 6 (F-2) — an ABSENT `revealed` costs ZERO delegate calls (the whole record is empty)',
    ).toBe(0)
    resetDelegateLog()
    fn(zones, census, sizes, () => { throw new Error('the predicate threw') }, specOf)
    expect(
      DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
      'I-4/§2.3 item 6 — a zone whose predicate THREW costs ZERO delegate calls',
    ).toBe(0)
  })

  it('I-5 §3.3 — THE NO-DEFAULT-REVEAL INVARIANT (C-C): presence is the caller’s decision, ALWAYS, and the predicate is CALLED', async () => {
    const fn = await surface('I-5 §2.4 C-C')
    const zones = ['a']
    const census = { a: 0 }
    const sizes = { a: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A }
    // A callable predicate is a PREDICATE: it is always consulted, never coerced
    // to a boolean (C-C (f)) — asserted by a spy on the CALL.
    const calls: unknown[] = []
    const spy = (id: unknown): boolean => {
      calls.push(id)
      return false
    }
    const record = fn(zones, census, sizes, spy, specOf)
    expect(calls, 'I-5/§2.4 C-C (f) — a callable `revealed` is CONSULTED (called exactly once per enumerated zone), never treated as a boolean').toEqual(['a'])
    expect(Object.keys(record), 'I-5/§2.4 C-A (a)/C-C — a DECLINED zone still EXISTS in the record (its key is present)').toEqual(['a'])
    expect(recordOf(record).a, 'I-5/§2.5 item 3 — the DECLINED zone’s value is exactly the empty string `\'\'`, never a token').toBe('')
    // No per-zone default (C-C (e)): a non-zero size and a full spec do NOT reveal.
    const noDefaults = fn(['a'], { a: 3 }, { a: 40 }, () => false, specOf)
    expect(recordOf(noDefaults).a, 'I-5/§2.4 C-C (e) — no "reveal when the size is non-zero" rule exists').toBe('')
    // No guessing from the census (C-C (b)): an empty-looking census does not reveal.
    const censusGuess = fn(['a'], { a: 0 }, { a: 40 }, () => false, specOf)
    expect(recordOf(censusGuess).a, 'I-5/§2.4 C-C (b) — no zone is displayed because it LOOKED empty in the census').toBe('')
    // No built-in reveal (C-C (a)): every non-callable/absent form yields the
    // EMPTY record, never a display.
    for (const [label, revealed] of [
      ['`undefined`', undefined],
      ['`null`', null],
      ['the number 42', 42],
      ['the string "x" (a truthy PRIMITIVE is still no predicate)', 'x'],
      ['`true` (a boolean is exactly the default this clause forbids)', true],
      ['an empty record', {}],
      ['an empty array', []],
      ['a Map', new Map([['a', true]])],
    ] as ReadonlyArray<readonly [string, unknown]>) {
      const out = fn(zones, census, sizes, revealed, specOf)
      expect(
        keysOf(out),
        `I-5/§2.4 C-C (a)(d) — a non-callable \`revealed\` (${label}) yields the EMPTY record: no visible fallback and no hidden fallback exists`,
      ).toEqual([])
    }
  })

  it('I-6 §3.3 — the mechanism contains NO consumer vocabulary, NO CSS, NO token value, NO default and NO union member', async () => {
    const raw = moduleSource('I-6 §2.2 P-1..P-3')
    expect(
      vocabularyViolations(raw),
      'I-6/§2.2 P-1 — the module carries no zone/pane/tab/region/dashboard/gutter vocabulary token as a symbol, union member, default or documented constant (raw AND assembled, comments included — §4.4 S-2)',
    ).toEqual([])
    expect(
      literalViolations(stripComments(raw)),
      'I-6/§2.2 P-1 — the module carries no banned mechanism literal in its CODE',
    ).toEqual([])
    const code = stripComments(raw)
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a refusal-domain field (`code`/`ok`/`reason`/`skipped`/`status`/`errors`) — §0A note 8: every outcome is a VALUE', re: /\b(?:skipped|reason|errors):|\bok\s*:/ },
      { what: 'a union or enum declaration (no refusal domain, no closed union exists)', re: /\b(?:type|enum)\s+\w+\s*=\s*[^;]*\|/ },
      { what: 'a stylesheet/class/attribute surface (P-2: no element, no class, no attribute)', re: /\b(?:className|classList|setAttribute|style\.|innerHTML|createElement)\b/ },
      { what: 'a store/persistence surface (P-4)', re: /\b(?:localStorage|sessionStorage|indexedDB|writeFile|readFile)\b/ },
    ]
    expectNoStaticHits(code, rules, 'I-6 §2.2 P-1..P-4')
    // POSITIVE controls: each shape must be caught by its own rule.
    const controls: ReadonlyArray<readonly [string, string]> = [
      ['a refusal field', `${'const'} r = { skipped: true }`],
      ['a union', `${'type'} Out = 'a' | 'b'`],
      ['a class write', `el.className = 'x'`],
      ['a store', `localStorage.setItem('a', 'b')`],
    ]
    for (const [label, fixture] of controls) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `I-6 POSITIVE control (${label}) must FAIL the scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
  })

  it('I-7 §3.3 — PURITY and no ambient read: identical arguments ⇒ identical results, and no module-level mutable state', async () => {
    const fn = await surface('I-7 §2.4 C-B (i)')
    const zones = ['a', 'b']
    const census = { a: 0, b: 3 }
    const sizes = { a: 40, b: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A, b: SPEC_A }
    const predicate = (): boolean => true
    const first = fn(zones, census, sizes, predicate, specOf)
    const second = fn(zones, census, sizes, predicate, specOf)
    expect(second, 'I-7/§2.2 P-4 — identical arguments ⇒ identical results, ALWAYS (a pure function of its arguments)').toEqual(first)
    expect(
      Object.keys(second),
      'I-7/§0A note 7 — identical results INCLUDING the key ORDER (first-seen enumeration order is deterministic)',
    ).toEqual(Object.keys(first))
    // A differing call in between changes nothing (no module-level state).
    fn(['z'], { z: 9 }, { z: 1 }, predicate, { z: SPEC_A })
    expect(fn(zones, census, sizes, predicate, specOf), 'I-7/§2.2 P-4 — a differing call in between changes nothing: no counter, no registry, no cache').toEqual(first)
    // The static half of the same claim (`R-4`'s ZERO-state clause).
    const code = stripComments(moduleSource('I-7 §2.2 P-4'))
    expectNoStaticHits(code, MODULE_STATE_RULES, 'I-7/§3.3 I-7 (R-4 companion)')
    for (const [label, fixture] of [
      ['a module-scope `let`', `${'let'} n = 0`],
      ['a module-scope `var`', `${'var'} n = 0`],
      ['a module-scope Map cache', `${'const'} cache = new Map()`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        MODULE_STATE_RULES.some(({ re }) => staticHits(fixture, re).length > 0),
        `I-7 POSITIVE control (${label}) must FAIL the module-state scan — the ZERO-state clause is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
  })

  it('I-8 §3.3 — THE GEOMETRY INVARIANT: no row of this unit asserts a resolved-geometry property, and no styling-resolution fact', () => {
    const own = readFileSync(TEST_FILE, 'utf8')
    const titles = rowTitles(own)
    expect(
      titles.length,
      'I-8/§3.3 — this file’s own row descriptions were extracted (a non-vacuous census of the descriptions this invariant binds)',
    ).toBeGreaterThan(25)
    expect(
      ownGeometryViolations().filter((v) => v.startsWith('a row description')),
      'I-8/§3.3 — no row DESCRIPTION of this file may claim a resolved-geometry/layout/styling fact (§2.5, I-8, R-6)',
    ).toEqual([])
    expect(
      ownGeometryViolations().filter((v) => v.startsWith('this file takes')),
      'I-8/§3.3 (R-6’s file half) — this file takes NO geometry observation',
    ).toEqual([])
    // POSITIVE control: a description that DOES claim a resolved fact is caught.
    const claimCorpus = ['the emitted token is ', 'render', 'ed at 120 pixels'].join('')
    expect(
      GEOM_CLAIM_RES.some((re) => re.test(claimCorpus)),
      'I-8 POSITIVE control — a description claiming a resolved fact FAILS the claim scanner',
    ).toBe(true)
    // The falsifiable content half: every row asserts a record, a call count or a
    // string — asserted here as the SHAPE of this unit’s own claims.
    expect(
      GEOM_CLAIM_RES.some((re) => re.test('the emitted token is a string and the arithmetic holds')),
      'I-8 NEGATIVE control — ordinary arithmetic wording is NOT a claim',
    ).toBe(false)
  })

  it('I-9 §3.3 — NO REFUSAL DOMAIN: the returned value is ONE record with no `code`/`ok`/`reason`/`skipped` field', async () => {
    const fn = await surface('I-9 §0A note 8')
    const record = fn(['a'], { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
    expect(
      Object.keys(record).sort(),
      'I-9/§2.1 — the returned record’s keys are the ZONE KEYS and nothing else: no aggregate, no total, no diagnostic field (§4.4 S-5)',
    ).toEqual(['a'])
    for (const field of ['code', 'ok', 'reason', 'skipped', 'status', 'errors', 'value', 'entries']) {
      expect(
        own(record as object, field),
        `I-9/§0A note 8 — the returned record carries NO '${field}' field: there is no refusal domain and every outcome is a VALUE`,
      ).toBe(false)
    }
    expect(
      Array.isArray(record),
      'I-9/§2.1 — the returned value is never an ARRAY (the record is the only shape)',
    ).toBe(false)
  })

  it('I-10 §3.3 — THE NULL-PROTOTYPE INVARIANT: `Object.getPrototypeOf(record) === null`, every zone id an OWN key, and no write to `Object.prototype`', async () => {
    const fn = await surface('I-10 §0A note 7')
    const before = Object.getOwnPropertyNames(Object.prototype).sort()
    const record = fn(['a', '__proto__', 'constructor'], { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
    expect(
      Object.getPrototypeOf(record),
      'I-10/§0A note 7 — the returned record is built on `Object.create(null)`, so EVERY zone id is an own key and `__proto__` is an ordinary id',
    ).toBe(null)
    expect(
      Object.getOwnPropertyNames(Object.prototype).sort(),
      'I-10/§0A note 7 — `Object.prototype` is UNMODIFIED by the call (a literal-built record would have executed the `__proto__` setter)',
    ).toEqual(before)
    // The positive control for the hazard: an object LITERAL accepts `__proto__`
    // as a setter write, which is exactly the shape this invariant forbids.
    const literal: Record<string, unknown> = {}
    ;(literal as Record<string, unknown>)['__proto__'] = { polluted: true }
    expect(
      own(literal, '__proto__'),
      'I-10 POSITIVE control — an object literal does NOT take `__proto__` as an own key (the hazard §0A note 7 rules on), so the null-prototype requirement is not vacuous',
    ).toBe(false)
  })
})

// ===========================================================================
// M-1..M-14 — §3.1, the valid / happy states.
//
// ENUMERATED STATES THIS GROUP COVERS (one row per reasonable data state, §4.2
// item 1): (1) one revealed zone with a size and a full spec; (2) a `Map`
// enumeration with three keys; (3) a non-empty census reaching the size+unit
// limb; (4) a declined zone costing zero delegate calls; (5) the full call
// discipline on a mixed call; (6) a `Map` census handed through; (7) duplicate
// zones collapsing to one key; (8) callable `sizes` with `(zoneId, census)`;
// (9) record lookups read by OWN property only; (10) callable `specOf` called
// once per revealed zone; (11) truthy NON-boolean reveal returns; (12) falsy
// NON-boolean reveal returns; (13) the `'__proto__'` zone id; (14) two identical
// calls.
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it('M-1 §3.1 — one revealed zone, a size and a full spec: the delegate’s token, and a NULL-PROTOTYPE record with exactly the key `a`', async () => {
    const fn = await surface('M-1')
    const record = fn({ a: 1 }, { a: 3 }, { a: 0 }, () => true, { a: SPEC_M1 })
    expect(
      recordOf(record).a,
      `M-1/§2.1 — the value IS the delegate's token for (spec, size 0, isEmpty({a:1}, 'a') ⇒ false): expected ${brief(
        delegate.trackFor(SPEC_M1, 0, delegate.isEmpty({ a: 1 }, 'a')),
      )} ⇒ the empty-token limb`,
    ).toBe(delegate.trackFor(SPEC_M1, 0, delegate.isEmpty({ a: 1 }, 'a')))
    expect(Object.keys(record), 'M-1/§2.1 — the record has EXACTLY the key `a` (the drive’s one enumerated zone)').toEqual(['a'])
    expect(Object.getPrototypeOf(record), 'M-1/§0A note 7 — the record is a NULL-PROTOTYPE object').toBe(null)
  })

  it('M-2 §3.1 — three zones of mixed member types through a `Map`: the MAP’S KEYS, never its values, in first-seen order', async () => {
    const fn = await surface('M-2 §2.3 item 1 (a)')
    const zones = new Map<string, number>([['a', 1], ['b', 2], ['c', 3]])
    const sizes = { a: 40, b: 40, c: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A, b: SPEC_A, c: SPEC_A }
    const record = fn(zones, { a: 3, b: 3, c: 3 }, sizes, () => true, specOf)
    expect(
      Object.keys(record),
      'M-2/§2.3 item 1 (a) — the enumeration yields the MAP’S KEYS (`map.keys()`), never its values `1`/`2`/`3`; `Object.keys` order is first-seen iteration order',
    ).toEqual(['a', 'b', 'c'])
    expect(
      observableSnapshot(zones),
      'M-2/§2.4 C-B — the `Map` enumeration is observably unchanged (size and entries)',
    ).toBe(observableSnapshot(zones))
  })

  it('M-3 §3.1 — a NON-EMPTY zone reaches the size + unit limb, and the census is what decided it (with the swap control)', async () => {
    const fn = await surface('M-3 §2.3 item 2 / §2.4 C-C (b)')
    const spec: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' }
    const nonEmpty = fn(['a'], { a: 3 }, { a: 120 }, () => true, { a: spec })
    expect(
      recordOf(nonEmpty).a,
      'M-3/§2.3 item 2 — a non-empty census (the delegate answered `false`) reaches `String(size) + unit`',
    ).toBe('120px')
    // The positive control: swap the census to an empty value and the same
    // arguments yield the caller’s emptyToken instead.
    const empty = fn(['a'], { a: 0 }, { a: 120 }, () => true, { a: spec })
    expect(
      recordOf(empty).a,
      'M-3 POSITIVE control — swapping ONLY the census to `{a: 0}` yields the caller’s `emptyToken`: the size+unit limb above was reached BECAUSE the census said so',
    ).toBe('SENTINEL-E')
  })

  it('M-4 §3.1 — a DECLINED zone costs ZERO delegate calls, and its key EXISTS carrying exactly `\'\'` (the ruling’s falsifier (b))', async () => {
    const fn = await surface('M-4 §2.3 items 3/6')
    resetDelegateLog()
    const revealCalls: unknown[] = []
    const spy = (id: unknown): boolean => {
      revealCalls.push(id)
      return false
    }
    const record = fn(['a', 'b'], { a: 3, b: 3 }, { a: 40, b: 40 }, spy, { a: SPEC_A, b: SPEC_A })
    expect(
      Object.keys(record).sort(),
      'M-4/§2.4 C-A (a) — EVERY declined zone still HAS its key (a non-revealed zone costs zero delegate calls while still owning its key)',
    ).toEqual(['a', 'b'])
    expect(
      recordOf(record).a,
      `M-4/§2.5 item 3 — the declined zone's value is STRICTLY the empty string (never a token): got ${brief(
        recordOf(record).a,
      )}`,
    ).toBe('')
    expect(recordOf(record).b, 'M-4/§2.5 item 3 — the same for the second declined zone').toBe('')
    expect(
      recordOf(record).a === SPEC_A.emptyToken,
      'M-4/§0A note 12 (b) — the declined value is `!==` the caller’s `emptyToken` (it is the absent-display value, never the empty-token limb)',
    ).toBe(false)
    expect(
      DELEGATE_LOG.isEmpty.length,
      `M-4/§2.3 item 6 — \`isEmpty\` called 0 times for declined zones; observed ${DELEGATE_LOG.isEmpty.length}`,
    ).toBe(0)
    expect(
      DELEGATE_LOG.trackFor.length,
      `M-4/§2.3 item 6 — \`trackFor\` called 0 times for declined zones; observed ${DELEGATE_LOG.trackFor.length}`,
    ).toBe(0)
    expect(revealCalls, 'M-4/§2.3 item 3 — `revealed` is called exactly once per enumerated zone, INCLUDING for the zones it hides').toEqual(['a', 'b'])
    expect(
      delegate.isEmpty.length,
      'M-4/§2.3 item 6 — `sizes`/`specOf` are not consulted either: the delegate log records NOTHING for this drive',
    ).toBe(0)
  })

  it('M-5 §3.1 — the full call discipline on a mixed call: exactly 2 `isEmpty`, exactly 2 `trackFor`, and ALL THREE keys', async () => {
    const fn = await surface('M-5 §2.3 item 6')
    resetDelegateLog()
    const sizesCalls: unknown[] = []
    const specCalls: unknown[] = []
    const sizes = (id: unknown, c: unknown): unknown => {
      sizesCalls.push([id, c])
      return id === '1' ? 40 : undefined
    }
    const specOf = (id: unknown): unknown => {
      specCalls.push(id)
      return id === '1' ? SPEC_A : undefined
    }
    const record = fn(['1', '2', '3'], { 1: 0, 3: 0 }, sizes, (id: unknown) => id !== '2', specOf)
    expect(
      DELEGATE_LOG.isEmpty.map(([c, z]) => [c, z]),
      'M-5/§2.3 item 6 — `isEmpty` is called EXACTLY twice, with `(census, \'1\')` and `(census, \'3\')`: the declined zone `\'2\'` costs zero calls',
    ).toEqual([[{ 1: 0, 3: 0 }, '1'], [{ 1: 0, 3: 0 }, '3']])
    expect(
      DELEGATE_LOG.trackFor.length,
      `M-5/§2.3 item 6 — \`trackFor\` is called EXACTLY twice (the declined zone 2 costs zero calls, and zone 3’s size/spec are \`undefined\`, which is handed to the delegate); observed ${DELEGATE_LOG.trackFor.length}`,
    ).toBe(2)
    expect(
      Object.keys(record).sort(),
      'M-5/§2.4 C-A — the record has ALL THREE keys (the declined zone included), even though only two produced a token',
    ).toEqual(['1', '2', '3'])
    expect(recordOf(record)['2'], 'M-5/§2.3 item 3 — the declined zone’s value is `\'\'`').toBe('')
    expect(
      sizesCalls.map((call) => (call as unknown[])[0]),
      'M-5/§2.3 item 4 — `sizes` is called AT MOST ONCE per revealed zone (and never for the declined one)',
    ).toEqual(['1', '3'])
    expect(
      specCalls,
      'M-5/§2.3 item 5 — `specOf` is called AT MOST ONCE per revealed zone (and never for the declined one)',
    ).toEqual(['1', '3'])
  })

  it('M-6 §3.1 — a `Map` census is handed through unchanged, and the `Map` is observably unchanged afterwards', async () => {
    const fn = await surface('M-6 §2.3 item 2 / §2.4 C-B (f)')
    const census = new Map<unknown, unknown>([['a', 0]])
    const before = observableSnapshot(census)
    const record = fn(['a'], census, { a: 40 }, () => true, { a: SPEC_A })
    expect(
      recordOf(record).a,
      'M-6/§2.3 item 2 — the `Map` census IS read by the delegate (`isEmpty` answered `true`), so the value is the caller’s `emptyToken`',
    ).toBe(SPEC_A.emptyToken)
    expect(
      observableSnapshot(census),
      'M-6/§2.4 C-B (f) — the `Map` census keeps its `size` and its entries (order and content) — asserted by the snapshot',
    ).toBe(before)
    expect(census.size, 'M-6/§2.4 C-B (f) — the `Map`’s `size` is unchanged').toBe(1)
  })

  it('M-7 §3.1 — duplicate zones collapse to ONE key at the FIRST-SEEN position, with the LAST occurrence’s value', async () => {
    const fn = await surface('M-7 §2.3 item 1 (iii) / §2.4 C-A (d)')
    const record = fn(['a', 'b', 'a'], { a: 0, b: 3 }, { a: 5 }, () => true, { a: SPEC_A, b: SPEC_A })
    expect(
      Object.keys(record),
      'M-7/§2.3 item 1 (iii) — the duplicate yields EXACTLY two keys, in first-seen order (`a` keeps its first-seen position and is not moved by its second occurrence)',
    ).toEqual(['a', 'b'])
    expect(
      recordOf(record).b,
      'M-7/§2.4 C-A (d) — the value is the one computed for the LAST occurrence',
    ).toBe(delegate.trackFor(SPEC_A, 5, delegate.isEmpty({ a: 0, b: 3 }, 'b')))
    // The number 1 beside its own string image is the OTHER duplicate class.
    const numeric = fn(['1', 1], { 1: 0 }, { 1: 5 }, () => true, { 1: SPEC_A })
    expect(
      Object.keys(numeric),
      'M-7/§2.3 item 1 (iii) — the number `1` beside the string `\'1\'` yields ONE key (both stringify to the same own key): no zone is double-counted',
    ).toEqual(['1'])
  })

  it('M-8 §3.1 — callable `sizes` is called once per revealed zone, with `(zoneId, census)`, and its values are used', async () => {
    const fn = await surface('M-8 §2.3 item 4')
    const census = { a: 0, b: 3 }
    const calls: unknown[] = []
    const sizes = (id: unknown, c: unknown): unknown => {
      calls.push([id, c])
      return (c as Record<string, unknown>)[id as string] === 0 ? 0 : 40
    }
    const record = fn(['a', 'b'], census, sizes, () => true, { a: SPEC_A, b: SPEC_A })
    expect(calls.length, `M-8/§2.3 item 4 — the spy records exactly 2 calls; observed ${calls.length}`).toBe(2)
    for (const [index, call] of calls.entries()) {
      expect((call as unknown[])[0], `M-8/§2.3 item 4 — call ${index + 1} receives the zone member first`).toBe(['a', 'b'][index])
      expect(
        (call as unknown[])[1],
        `M-8/§2.3 item 4 — call ${index + 1} receives the caller’s census BY IDENTITY (the second parameter is the census)`,
      ).toBe(census)
    }
    expect(recordOf(record).a, 'M-8/§2.3 item 4 — the returned sizes are USED (zone `a`: empty census ⇒ the empty token)').toBe(SPEC_A.emptyToken)
    expect(recordOf(record).b, 'M-8/§2.3 item 4 — the returned sizes are USED (zone `b`: size 40 ⇒ the size+unit limb)').toBe('40px')
  })

  it('M-9 §3.1 — record `sizes`/`specOf` are read by OWN property: a PROTOTYPE member never resolves', async () => {
    const fn = await surface('M-9 §2.3 items 4/5 / §0A note 5')
    const nullProtoSizes: Record<string, unknown> = Object.create(null)
    nullProtoSizes.a = 0
    const proto = { b: SPEC_A }
    const inheritingSpecOf = Object.create(proto) as Record<string, unknown>
    inheritingSpecOf.a = SPEC_A
    const record = fn(['a', 'b'], { a: 0, b: 3 }, nullProtoSizes, () => true, inheritingSpecOf)
    expect(
      recordOf(record).a,
      'M-9/§0A note 5 — a null-prototype `sizes` record resolves its OWN key `a`',
    ).toBe(SPEC_A.emptyToken)
    expect(
      recordOf(record).b,
      `M-9/§0A note 5 — the spec \`b\` lives on the PROTOTYPE and must resolve to \`undefined\` ⇒ the delegate's malformed-spec limb \`\'\'\` (never a prototype member); got ${brief(
        recordOf(record).b,
      )}`,
    ).toBe('')
    expect(
      own(record as object, 'b'),
      'M-9/§2.4 C-A (b) — the prototype-miss zone still HAS its key (it is never omitted)',
    ).toBe(true)
  })

  it('M-10 §3.1 — callable `specOf` is called once per revealed zone and its spec is used', async () => {
    const fn = await surface('M-10 §2.3 item 5')
    const calls: unknown[] = []
    const specOf = (id: unknown): unknown => {
      calls.push(id)
      return { trackProp: '--x', unit: 'px', emptyToken: 'ZZ' }
    }
    const record = fn(['a'], { a: 3 }, { a: 7 }, () => true, specOf)
    expect(calls, `M-10/§2.3 item 5 — the spy records exactly 1 call; observed ${calls.length}`).toEqual(['a'])
    expect(recordOf(record).a, 'M-10/§2.3 item 5 — the returned spec is USED (size 7, unit `px`)').toBe('7px')
  })

  it('M-11 §3.1 — a TRUTHY non-boolean reveal return DISPLAYS the zone (the gate is `Boolean(...)`, never `=== true`)', async () => {
    const fn = await surface('M-11 §2.3 item 3')
    for (const [label, revealed] of [
      ['`() => 1`', () => 1],
      ['`() => \'yes\'`', () => 'yes'],
      ['`() => ({})`', () => ({})],
    ] as ReadonlyArray<readonly [string, unknown]>) {
      resetDelegateLog()
      const record = fn(['a'], { a: 3 }, { a: 40 }, revealed, { a: SPEC_A })
      expect(
        recordOf(record).a,
        `M-11/§2.3 item 3 — a truthy non-boolean return (${label}) DISPLAYS the zone: the value is the delegate’s token, not \`\'\'\``,
      ).toBe('40px')
      expect(
        DELEGATE_LOG.isEmpty.length,
        `M-11/§2.3 item 3 — the truthy return (${label}) proceeds to the delegate path exactly once`,
      ).toBe(1)
    }
  })

  it('M-12 §3.1 — a FALSY non-boolean reveal return leaves the key present with `\'\'` and costs ZERO delegate calls', async () => {
    const fn = await surface('M-12 §2.3 item 3 / §2.4 C-A (a)')
    for (const [label, revealed] of [
      ['`() => 0`', () => 0],
      ["`() => ''`", () => ''],
      ['`() => null`', () => null],
      ['`() => NaN`', () => Number.NaN],
    ] as ReadonlyArray<readonly [string, unknown]>) {
      resetDelegateLog()
      const record = fn(['a'], { a: 3 }, { a: 40 }, revealed, { a: SPEC_A })
      expect(Object.keys(record), `M-12/§2.4 C-A (a) — the falsy return (${label}) leaves the key PRESENT`).toEqual(['a'])
      expect(recordOf(record).a, `M-12/§2.3 item 3 — the falsy return (${label}) yields exactly \`\'\'\``).toBe('')
      expect(
        DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
        `M-12/§2.3 item 6 — the falsy return (${label}) costs ZERO delegate calls`,
      ).toBe(0)
    }
  })

  it('M-13 §3.1 — the `\'__proto__\'` zone id is an ORDINARY OWN KEY, and `Object.prototype` is never written', async () => {
    const fn = await surface('M-13 §0A note 7 / §2.4 C-A (e)')
    const sizes: Record<string, unknown> = Object.create(null)
    const specOf: Record<string, unknown> = Object.create(null)
    Object.defineProperty(sizes, '__proto__', { value: 40, enumerable: true, configurable: true, writable: true })
    Object.defineProperty(specOf, '__proto__', { value: SPEC_A, enumerable: true, configurable: true, writable: true })
    const protoBefore = Object.getOwnPropertyNames(Object.prototype).sort()
    const record = fn(['__proto__'], { __proto__: 3 }, sizes, () => true, specOf)
    expect(
      own(record as object, '__proto__'),
      'M-13/§2.4 C-A (e) — `Object.hasOwn(record, \'__proto__\') === true`: the id is an own key, never a setter write',
    ).toBe(true)
    expect(
      recordOf(record)['__proto__'],
      'M-13/§2.1 — the value under `__proto__` is the delegate’s token (the own entry resolved, so the size+unit limb was reached)',
    ).toBe('40px')
    expect(Object.getPrototypeOf(record), 'M-13/§0A note 7 — the record is null-prototype').toBe(null)
    expect(
      Object.getOwnPropertyNames(Object.prototype).sort(),
      'M-13/§0A note 7 — `Object.prototype` is UNMODIFIED (no pollution through the zone id)',
    ).toEqual(protoBefore)
  })

  it('M-14 §3.1 — two calls with identical arguments yield identical records (value AND key order), with no state carried between them', async () => {
    const fn = await surface('M-14 §2.4 C-B (i) / §3.3 I-7')
    const zones = { a: 1 }
    const args = { census: { a: 3 }, sizes: { a: 0 }, revealed: () => true, specOf: { a: SPEC_M1 } } as const
    const first = fn(zones, args.census, args.sizes, args.revealed, args.specOf)
    const second = fn(zones, args.census, args.sizes, args.revealed, args.specOf)
    expect(second, 'M-14/§2.4 C-B (i) — the two records are equal by value (`toEqual`)').toEqual(first)
    for (const key of Object.keys(first)) {
      expect(recordOf(second)[key], `M-14/§2.4 C-B (i) — per-key strict equality for '${key}'`).toBe(recordOf(first)[key])
    }
    expect(Object.keys(second), 'M-14/§2.4 C-B (i) — the KEY ORDER is identical (no state is carried between the calls)').toEqual(Object.keys(first))
    expect(
      Object.getPrototypeOf(first) === null && Object.getPrototypeOf(second) === null,
      'M-14/§0A note 7 — BOTH records are null-prototype',
    ).toBe(true)
  })
})

// ===========================================================================
// F-1..F-6 — §3.2, the documented fail-states. **There is NO refusal domain, so
// every outcome here is a VALUE** (`§0A` ruling note 8; `§4.4 S-5`).
//
// FAIL-STATES ENUMERATED: (F-1a) a non-enumeration `zones`; (F-1b) a `Symbol`
// member; (F-2a) `revealed` omitted; (F-2b) `undefined`; (F-2c) non-callables;
// (F-2d) a throwing predicate; (F-3) a missing spec/size entry; (F-4) malformed
// sizes/specs (wrong type, throwing accessor, throwing callable); (F-5) an
// unusable or hostile census; (F-6) a non-string zone member.
// ===========================================================================
describe('F — §3.2 the documented fail-states (every outcome is a VALUE)', () => {
  it('F-1 §3.2 — a `zones` that is NOT an enumeration yields the EMPTY record, and a `Symbol` member is DROPPED unstringified', async () => {
    const fn = await surface('F-1 §2.3 item 1 (c)/(iv)')
    resetDelegateLog()
    const nonEnumerations: ReadonlyArray<readonly [string, unknown]> = [
      ['`null`', null],
      ['`undefined`', undefined],
      ['the number 42', 42],
      ["the string 'abc'", 'abc'],
      ['`true`', true],
      ["`Symbol('z')`", Symbol('z')],
      ['a function with no `Symbol.iterator`', () => 1],
      ['a `BigInt`', 1n],
    ]
    for (const [label, zones] of nonEnumerations) {
      const record = fn(zones, { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
      expect(
        keysOf(record),
        `F-1(a)/§2.3 item 1 (c) — a non-enumeration \`zones\` (${label}) yields the EMPTY record \`{}\` — an empty set is the empty record, and the value is still a valid TrackVars`,
      ).toEqual([])
      expect(Object.getPrototypeOf(record), `F-1(a) — the empty record is still a NULL-PROTOTYPE record (${label})`).toBe(null)
      expect(record, `F-1(a)/§2.4 C-A (c) — the returned value is never \`undefined\` (${label})`).not.toBe(undefined)
    }
    expect(
      DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
      'F-1(a)/§2.3 item 6 — the empty-enumeration drives cost ZERO delegate calls',
    ).toBe(0)
    // (b) a `Symbol` MEMBER: the one member that CANNOT become an own key — DROPPED,
    // never stringified into an invented zone id.
    const withSymbol = fn(['a', Symbol('s')], { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
    expect(
      Object.keys(withSymbol),
      'F-1(b)/§2.3 item 1 (iv) — the `Symbol` member is DROPPED (no own key can carry it) and is NOT stringified: the key set is `[\'a\']`, never `[\'a\', \'Symbol(s)\']`',
    ).toEqual(['a'])
    expect(
      Object.keys(withSymbol).some((k) => k.includes('Symbol')),
      'F-1(b) — the mechanism does not stringify the `Symbol` member (a `\'Symbol(x)\'` key would be an INVENTED zone id)',
    ).toBe(false)
  })

  it('F-2 §3.2 — `revealed` absent, non-callable or throwing yields the EMPTY record for a NON-EMPTY `zones` (the ZERO-ZONE case, never a default)', async () => {
    const fn = await surface('F-2 §2.3 item 3 / §2.4 C-C')
    resetDelegateLog()
    const zones = ['a', 'b', 'c']
    const census = { a: 0, b: 3, c: 3 }
    const sizes = { a: 40, b: 40, c: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A, b: SPEC_A, c: SPEC_A }
    // (a) the argument OMITTED — driven as `undefined` at the call site, which is
    // the same absence for a five-parameter function with no default value.
    const cases: ReadonlyArray<readonly [string, unknown]> = [
      ['(a) the argument omitted / `undefined`', undefined],
      ['(c) `null`', null],
      ['(c) the number 42', 42],
      ["(c) the string 'x'", 'x'],
      ['(c) `true` (a global boolean is the forbidden default class)', true],
      ['(c) an empty record', {}],
      ['(c) an empty array', []],
      ['(c) a Map', new Map([['a', true]])],
      ['(d) a callable that THROWS', () => { throw new Error('the predicate threw') }],
    ]
    for (const [label, revealed] of cases) {
      const record = fn(zones, census, sizes, revealed, specOf)
      expect(
        keysOf(record),
        `F-2/§2.3 item 3 — a non-predicate \`revealed\` (${label}) yields \`{}\` for a NON-EMPTY \`zones\`: no visible fallback and no hidden fallback exists`,
      ).toEqual([])
    }
    expect(
      DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length,
      'F-2/§2.3 item 6 — the no-decision drives cost ZERO delegate calls',
    ).toBe(0)
    // THE FORBIDDEN READINGS, asserted explicitly (§3.2 F-2's own text): a module
    // that reveals everything on `undefined` FAILS the first assertion, and a module
    // that reveals nothing BY POLICY rather than by absent decision is caught by the
    // register's drive (`P-CN-IM-2` v2 vs v3 — the two columns are NOT the same
    // outcome).
    const declined = fn(['a'], census, sizes, () => false, specOf)
    expect(
      [Object.keys(declined), Object.keys(fn(['a'], census, sizes, undefined, specOf))],
      'F-2/§2.3 item 3’s annotation — the DECLINED case (a callable returning falsy ⇒ the key exists with `\'\'`) and the NO-DECISION case (absent ⇒ the empty record) are DIFFERENT outcomes: a row that folds them fails the spec’s text',
    ).toEqual([['a'], []])
  })

  it('F-3 §3.2 — a zone with NO spec entry (and/or no size entry) HAS its key, with the delegate’s own limbs', async () => {
    const fn = await surface('F-3 §2.3 item 5 / §2.4 C-A (b)')
    resetDelegateLog()
    const record = fn(['a', 'b'], { a: 3, b: 3 }, { a: 40 }, () => true, { a: SPEC_A })
    expect(
      Object.keys(record),
      'F-3/§2.4 C-A (b) — TWO keys: a zone whose spec/size is missing HAS its key (the key set binds `zones`, never the spec set)',
    ).toEqual(['a', 'b'])
    expect(recordOf(record).a, 'F-3/§2.3 item 5 — the zone WITH a spec gets its token').toBe('40px')
    expect(
      recordOf(record).b,
      'F-3/§2.3 item 5 — the spec-less zone gets `\'\'\'` (the delegate’s malformed-spec limb, reached with `undefined`) — never an omission, never a per-field distinction, never a throw',
    ).toBe('')
    expect(
      DELEGATE_LOG.trackFor.length,
      `F-3/§2.3 item 6 — \`trackFor\` WAS called for the spec-less zone too (\`undefined\` spec and \`undefined\` size are handed to the delegate); observed ${DELEGATE_LOG.trackFor.length} calls`,
    ).toBe(2)
  })

  it('F-4 §3.2 — a MALFORMED `sizes`/`specOf` entry (wrong type, throwing accessor, throwing callable) yields the DELEGATE’s limbs and never throws', async () => {
    const fn = await surface('F-4 §2.3 items 4/5')
    const sizeCases: ReadonlyArray<readonly [string, unknown, string]> = [
      ['a negative size `-1`', -1, SPEC_A.emptyToken],
      ['`NaN`', Number.NaN, SPEC_A.emptyToken],
      ["the numeric string '12'", '12', SPEC_A.emptyToken],
      ['a `BigInt`', 1n, SPEC_A.emptyToken],
      ['`undefined` (a miss)', undefined, SPEC_A.emptyToken],
      ['a size of `0` (a ZERO track is not an empty one)', 0, SPEC_M1.emptyToken],
    ]
    for (const [label, size, expected] of sizeCases) {
      const record = fn(['a'], { a: 3 }, { a: size }, () => true, { a: SPEC_A })
      expect(
        recordOf(record).a,
        `F-4/§2.3 item 4 — a malformed/missing size (${label}) ⇒ the caller’s \`emptyToken\` (the delegate’s own limb), never a throw`,
      ).toBe(expected)
      expect(Object.keys(record), `F-4/§2.4 C-A (b) — the key is still PRESENT for (${label})`).toEqual(['a'])
    }
    const specCases: ReadonlyArray<readonly [string, unknown, string]> = [
      ['`null`', null, ''],
      ['the number 42', 42, ''],
      ['an empty record', {}, ''],
      ['a wrong-typed field', { trackProp: '--a', unit: 3, emptyToken: 'x' }, ''],
      ['`undefined` (a miss)', undefined, ''],
    ]
    for (const [label, spec, expected] of specCases) {
      const record = fn(['a'], { a: 3 }, { a: 40 }, () => true, { a: spec })
      expect(
        recordOf(record).a,
        `F-4/§2.3 item 5 — a malformed/missing spec (${label}) ⇒ the delegate’s malformed-spec limb \`\'\'\`; this unit invents no outcome`,
      ).toBe(expected)
    }
    // A THROWING own accessor and a THROWING callable: the delegate answers and no
    // throw escapes (`§2.3` items 4/5 / `§0A` note 5).
    const throwingSize = fn(['a'], { a: 3 }, throwingAccessorRecord('a'), () => true, { a: SPEC_A })
    expect(
      recordOf(throwingSize).a,
      'F-4/§2.3 item 4 — a `sizes` record whose OWN accessor throws degrades to `undefined` ⇒ the caller’s `emptyToken`; no throw escapes',
    ).toBe(SPEC_A.emptyToken)
    const throwingSpec = fn(['a'], { a: 3 }, { a: 40 }, () => true, throwingAccessorRecord('a'))
    expect(
      recordOf(throwingSpec).a,
      'F-4/§2.3 item 5 — a `specOf` record whose OWN accessor throws degrades to `undefined` ⇒ `\'\'`; no throw escapes',
    ).toBe('')
    const throwingSizeCallable = fn(['a'], { a: 3 }, () => { throw new Error('sizes threw') }, () => true, { a: SPEC_A })
    expect(
      recordOf(throwingSizeCallable).a,
      'F-4/§2.3 item 4 — a `sizes` CALLABLE that throws is CAUGHT ⇒ `undefined` ⇒ the caller’s `emptyToken`',
    ).toBe(SPEC_A.emptyToken)
    const throwingSpecCallable = fn(['a'], { a: 3 }, { a: 40 }, () => true, () => { throw new Error('specOf threw') })
    expect(
      recordOf(throwingSpecCallable).a,
      'F-4/§2.3 item 5 — a `specOf` CALLABLE that throws is CAUGHT ⇒ `undefined` ⇒ `\'\'`',
    ).toBe('')
  })

  it('F-5 §3.2 — an unusable or hostile census is the DELEGATE’s answer, not this unit’s error, and the census is unchanged', async () => {
    const fn = await surface('F-5 §2.3 item 2 / §2.4 C-B')
    resetDelegateLog()
    const records: ReadonlyArray<readonly [string, unknown]> = [
      ['`null`', null],
      ['`undefined`', undefined],
      ['the number 42', 42],
      ['an array `[0]` (a non-record)', [0]],
      ["a `Set`", new Set(['a'])],
      ['a function', () => 1],
      ['a Proxy whose `get` throws', hostileProxy()],
      ['a record whose own accessor throws', throwingAccessorRecord('a')],
    ]
    const snapshots = records.map(([, census]) => observableSnapshot(census))
    for (const [index, [label, census]] of records.entries()) {
      const record = fn(['a'], census, { a: 40 }, () => true, { a: SPEC_A })
      expect(
        recordOf(record).a,
        `F-5/§2.3 item 2 — an unusable/hostile census (${label}) is the DELEGATE’s answer: \`isEmpty\` answered \`false\` (it is a total function) ⇒ the caller’s \`emptyToken\`; no throw escapes`,
      ).toBe(SPEC_A.emptyToken)
      expect(
        observableSnapshot(census),
        `F-5/§2.4 C-B — the census (${label}) is unchanged in every observable respect`,
      ).toBe(snapshots[index])
    }
    expect(
      DELEGATE_LOG.isEmpty.length,
      `F-5/§2.3 item 6 — \`isEmpty\` is still called exactly once per revealed zone for every hostile census (8 drives ⇒ 8 calls); observed ${DELEGATE_LOG.isEmpty.length}`,
    ).toBe(8)
  })

  it('F-6 §3.2 — a NON-STRING zone member is never empty whatever the census holds: it receives the member VERBATIM', async () => {
    const fn = await surface('F-6 §0A note 3 / §2.3 items 1/2')
    resetDelegateLog()
    const record = fn([42], { 42: 0 }, { 42: 40 }, () => true, { 42: SPEC_A })
    expect(Object.keys(record), 'F-6/§0A note 3 — the zone key is the member’s `String()` image `\'42\'` (an own key)').toEqual(['42'])
    expect(
      recordOf(record)['42'],
      'F-6/§2.3 item 1 — the value is the caller’s `emptyToken`, BECAUSE `isEmpty(census, 42)` answers `false` for a non-string member against a record census (U-ZONES §2.3 item 2 (c)) — this is the pinned CONSEQUENCE, not a defect, and this unit must not compensate for it',
    ).toBe(SPEC_A.emptyToken)
    expect(
      DELEGATE_LOG.isEmpty.map(([, z]) => z),
      'F-6/§2.3 item 1 — the member reaches `isEmpty`’s second parameter VERBATIM (the NUMBER 42, never its string image): a module that stringified it would answer differently',
    ).toEqual([42])
    expect(
      Object.is(DELEGATE_LOG.isEmpty[0][1], 42),
      'F-6/§0A note 3 — the delegate receives the number by identity (`Object.is`), so normalization is provably absent',
    ).toBe(true)
    // The `Map` variant of the same clause.
    const mapDriven = fn(new Map<unknown, unknown>([[42, 0]]), { 42: 0 }, { 42: 40 }, () => true, { 42: SPEC_A })
    expect(Object.keys(mapDriven), 'F-6 — the `Map` member `42` becomes the own key `\'42\'`').toEqual(['42'])
    expect(
      Object.is(DELEGATE_LOG.isEmpty[DELEGATE_LOG.isEmpty.length - 1][1], 42),
      'F-6/§2.3 item 1 (a) — the `Map` member is carried VERBATIM to `isEmpty` too (never stringified)',
    ).toBe(true)
  })
})

// ===========================================================================
// §0A ruling note 12 — THE RULING’S FIVE FALSIFIERS, EACH ON A NAMED ROW.
// The register rows below are the bounded executions; these rows are the
// per-state contract rows the register compensates, and they are written so a
// WRONG module fails on the RIGHT row:
//   (a) the key-set falsifier   ⇒ RUL-A: set equality INCLUDING the declined zone
//   (b) the display-value falsifier ⇒ RUL-B: strictly `''`, `!==` emptyToken,
//       with the delegate proved UNCALLED for that zone
//   (c) the omission falsifier  ⇒ RUL-C: a record missing the declined zone fails
//       the key-set row FIRST
//   (d) the token falsifier     ⇒ RUL-D: any non-`''` value (a token, a `'0px'`-
//       shaped literal, a size-derived string, the caller’s `emptyToken`) fails
//   (e) the never-a-default falsifier ⇒ RUL-E: the two outcomes DIFFER exactly as
//       `C-A` (a) and `F-2` pin
// ===========================================================================
describe('RUL — §0A ruling note 12: the ruling’s five falsifiers, each on its own row', () => {
  it('RUL-A §0A note 12 (a) — THE KEY-SET FALSIFIER: `Object.keys` still CONTAINS the declined zone, by SET EQUALITY against the `zones` set', async () => {
    const fn = await surface('RUL-A §2.4 C-A (a) / §0A note 12 (a)')
    const zones = ['a', 'b', 'c']
    const declined: unknown[] = []
    const predicate = (id: unknown): boolean => {
      declined.push(id)
      return id !== 'b'
    }
    const record = fn(zones, { a: 0, b: 0, c: 3 }, { a: 40, b: 40, c: 40 }, predicate, { a: SPEC_A, b: SPEC_A, c: SPEC_A })
    expect(declined, 'RUL-A — the predicate really DECLINED one zone (the drive is not vacuous)').toEqual(['a', 'b', 'c'])
    expect(
      Object.keys(record),
      'RUL-A/§2.4 C-A — the returned record’s key set equals the ENUMERATED zone set EXACTLY, by SET EQUALITY, in first-seen order, INCLUDING the zone the predicate declined',
    ).toEqual(['a', 'b', 'c'])
    expect(
      Object.keys(record).includes('b'),
      'RUL-A/§0A note 12 (a) — `Object.keys(record)` STILL CONTAINS the declined zone `b` (a module that omits it fails THIS row, not a later one)',
    ).toBe(true)
    expect(
      own(record as object, 'b'),
      'RUL-A/§0A note 12 (a) — the declined zone’s membership is asserted by `Object.hasOwn`, never by its value',
    ).toBe(true)
    expect(
      sameSet(Object.keys(record), zones),
      'RUL-A/§2.4 C-A (a) — SET EQUALITY (not a subset claim, not a bag comparison): no key outside `zones` and no member omitted',
    ).toBe(true)
  })

  it('RUL-B §0A note 12 (b) — THE DISPLAY-VALUE FALSIFIER: the declined value is STRICTLY `\'\'`, `!==` the caller’s `emptyToken`, with `trackFor` proved UNCALLED', async () => {
    const fn = await surface('RUL-B §2.5 item 3 / §0A note 12 (b)')
    resetDelegateLog()
    const record = fn(['a', 'b'], { a: 3, b: 3 }, { a: 40, b: 40 }, (id: unknown) => id !== 'b', { a: SPEC_A, b: SPEC_A })
    expect(
      recordOf(record).b,
      `RUL-B/§2.5 item 3 — the declined zone's value is STRICTLY the empty string \`''\`: got ${brief(recordOf(record).b)}`,
    ).toBe('')
    expect(
      recordOf(record).b === SPEC_A.emptyToken,
      'RUL-B/§0A note 12 (b) — the declined value is `!==` the caller’s `emptyToken` (the two are DIFFERENT strings, so a module that emitted the empty-token limb fails here)',
    ).toBe(false)
    expect(SPEC_A.emptyToken === '', 'RUL-B — the drive is not vacuous: the caller’s `emptyToken` is NOT `\'\'`').toBe(false)
    expect(
      DELEGATE_LOG.trackFor.length,
      'RUL-B/§2.3 item 6 — `trackFor` was called ONLY for the displayed zone, so the declined zone provably has no token: the log holds exactly one call',
    ).toBe(1)
    expect(
      Object.is(DELEGATE_LOG.trackFor[0][0], SPEC_A),
      'RUL-B/§2.1 — the one recorded `trackFor` call belongs to the DISPLAYED zone `a` (its spec is `a`’s), so the declined zone contributed no call',
    ).toBe(true)
  })

  it('RUL-C §0A note 12 (c) — THE OMISSION FALSIFIER: a module that OMITS a declined zone fails the KEY-SET row', async () => {
    const fn = await surface('RUL-C §2.4 C-A (a) / §4.4 S-9')
    const record = fn(['a', 'b', 'c'], { a: 0 }, { a: 40 }, (id: unknown) => id !== 'b', { a: SPEC_A })
    // The assertion BELOW is the one an omitting module fails — and it is the
    // FIRST assertion of the drive, so the failure is attributed to THIS row.
    const keys = Object.keys(record)
    const omitted = ['a', 'b', 'c'].filter((z) => !keys.includes(z))
    expect(
      omitted,
      `RUL-C/§2.4 C-A (a) — NO enumerated zone may be omitted, whatever its spec, size or display decision: a module that omits the declined zone \`b\` FAILS HERE (the omitted set is reported so the failure names the right row). Observed keys: ${JSON.stringify(
        keys,
      )}`,
    ).toEqual([])
    expect(keys, 'RUL-C/§2.4 C-A (a) — the whole enumerated set is present, in first-seen order').toEqual(['a', 'b', 'c'])
    // The converse half: the omit-reading is WITHDRAWN as a spent contingency, and
    // §4.4 S-9 forbids a row that EXPECTS an omission. This control shows the two
    // readings are distinguishable by exactly this assertion.
    const omitReading = ['a', 'c']
    expect(
      sameSet(omitReading, ['a', 'b', 'c']),
      'RUL-C/§4.4 S-9 — the as-filed OMIT-reading (`[\'a\',\'c\']`) does NOT satisfy set equality against the enumerated set, so THIS row is the one that falsifies it',
    ).toBe(false)
  })

  it('RUL-D §0A note 12 (d) — THE TOKEN FALSIFIER: any non-`\'\'` value for a declined zone fails (a token, a `\'0px\'`-shaped literal, a size-derived string, the caller’s `emptyToken`)', async () => {
    const fn = await surface('RUL-D §2.4 C-C (a) / §0A note 12 (d)')
    const spec: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: SPEC_M1.emptyToken }
    const record = fn(['a', 'b'], { a: 3, b: 3 }, { a: 40, b: 40 }, (id: unknown) => id !== 'b', { a: spec, b: spec })
    const value = recordOf(record).b
    // Every forbidden shape is named, so the failure text attributes the right row.
    const forbidden: ReadonlyArray<readonly [string, boolean]> = [
      ['a size-derived token (`\'40px\'`)', value === '40px'],
      ['the caller’s `emptyToken`', value === spec.emptyToken],
      ['a `\'0px\'`-shaped literal', value === SPEC_M1.emptyToken],
      ['any non-empty string at all', typeof value === 'string' && value !== ''],
      ['a non-string value', typeof value !== 'string'],
    ]
    for (const [label, hit] of forbidden) {
      expect(
        hit,
        `RUL-D/§0A note 12 (d) — the declined zone’s value is NONE of the forbidden shapes: ${label} would fail the REVEAL row (observed value ${brief(
          value,
        )})`,
      ).toBe(false)
    }
    expect(value, 'RUL-D/§2.5 item 3 — the only admissible value for a declined zone is exactly `\'\'`').toBe('')
  })

  it('RUL-E §0A note 12 (e) — THE NEVER-A-DEFAULT FALSIFIER: a module that DEFAULTS reveal, or reads the census to guess it, fails here', async () => {
    const fn = await surface('RUL-E §2.4 C-C (b)–(e) / §0A note 12 (e)')
    resetDelegateLog()
    const zones = ['a']
    const sizes = { a: 40 }
    const specOf: Record<string, unknown> = { a: SPEC_A }
    const declinedRecord = fn(zones, { a: 0 }, sizes, () => false, specOf)
    const noDecisionRecord = fn(zones, { a: 0 }, sizes, undefined, specOf)
    expect(
      [Object.keys(declinedRecord), Object.keys(noDecisionRecord)],
      'RUL-E/§0A note 12 (e) — the two outcomes DIFFER exactly as `C-A` (a) and `F-2` pin: a CALLABLE predicate that declines leaves the key with `\'\'` (`[\'a\']`), while an ABSENT predicate leaves the EMPTY record (`[]`). A module that defaulted reveal to true would return `[\'a\']` in both; one that hidden-defaulted would return `[]` in both',
    ).toEqual([['a'], []])
    expect(
      recordOf(declinedRecord).a,
      'RUL-E/§2.4 C-C (a) — the declined key carries `\'\'` (no built-in reveal was substituted for the caller’s decision)',
    ).toBe('')
    // No guessing from the census (C-C (b)): the SAME predicate, driven over four
    // different census states, yields the same value for the declined zone.
    const guesses = [{ a: 0 }, { a: 3 }, {}, new Map([['a', 0]])].map((census) => recordOf(fn(zones, census, sizes, () => false, specOf)).a)
    expect(
      guesses,
      'RUL-E/§2.4 C-C (b) — the census shape NEVER guesses a display decision: all four census states yield the same declined value',
    ).toEqual(['', '', '', ''])
    // No per-zone default (C-C (e)): a non-zero size, a full spec and a non-empty
    // census do not display the zone.
    expect(
      recordOf(fn(zones, { a: 9 }, { a: 40 }, () => false, specOf)).a,
      'RUL-E/§2.4 C-C (e) — no "reveal when the size is non-zero" and no "reveal when the spec has a unit" rule exists',
    ).toBe('')
  })
})

// ===========================================================================
// R-1..R-10 — §3.4, the STATIC rows (the §2.2 prohibition table’s ids).
// ===========================================================================
describe('R — §3.4 the static rows (the §2.2 prohibition table’s ids)', () => {
  it('R-1 §3.4 — THE DELEGATION ROW: exactly `isEmpty` + `trackFor` from `./zones.js`, one statement, and NO second copy of the token arithmetic', () => {
    const raw = moduleSource('R-1 §1 item 3 / §2.1 delegate clause')
    const code = stripComments(raw)
    // ── (a) THE IMPORT HALF. One import statement, the two named bindings, the
    // repo’s ESM specifier form — a missing import, a THIRD binding, a RENAME or an
    // added import statement FAILS.
    const importLines = staticHits(code, /\bimport\b/)
    expect(
      importLines.length,
      `R-1(a)/§2.1 — \`src/shared/census.ts\` carries EXACTLY ONE import statement (the ledger’s delegation clause, one authority over tokens); observed ${importLines.length}: ${JSON.stringify(
        importLines,
      )}`,
    ).toBe(1)
    expect(
      staticHits(code, /import\s+\{\s*isEmpty\s*,\s*trackFor\s*\}\s+from\s+['"]\.\/zones\.js['"]/).length,
      'R-1(a)/§2.1 — the import is `{ isEmpty, trackFor } from \'./zones.js\'`, both bindings NAMED and neither renamed (a rename would break the one-authority clause)',
    ).toBe(1)
    for (const [what, re] of [
      ['a `provident-ssr` import', /from\s+['"]provident-ssr['"]/],
      ['a `node:*` / `electron` import', /from\s+['"](?:node:|electron)/],
      ['an import from `src/main/**` or `src/renderer/**`', /from\s+['"][^'"]*(?:main|renderer)\//],
      ['an import of a sibling mechanism (projection, gutters, hosts, guards)', /from\s+['"][^'"]*(?:layout-projection|slot-host|owned-list-host|mount-invariant-guard|path-fork-cycle|dom-shim)\.js['"]/],
      ['a dynamic `import(...)`', /\bimport\s*\(/],
      ['a CommonJS `require(`', /\brequire\s*\(/],
    ] as ReadonlyArray<readonly [string, RegExp]>) {
      expect(
        staticHits(code, re),
        `R-1(a)/§2.1 — \`src/shared/census.ts\` may import NOTHING but its predecessor: ${what} FAILS this row`,
      ).toEqual([])
    }
    // ── (b) THE DUPLICATION HALF, over a NORMALIZED view (the `§4.4 S-2`
    // closure): the RULES are held as FRAGMENTS so the scan cannot read its own
    // rule list, and the text scanned is the module.
    const ASSEMBLY_RE = new RegExp(
      [
        `String\\s*\\(`,
        '`[^`]*\\$\\{',
        `\\+\\s*(?:unit|spec\\.unit|String)`,
        `(?:size|dims|value)\\s*\\+`,
      ].join('|'),
    )
    const DUPLICATION_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
      {
        what: 'a string concatenation that BUILDS a token (`String(...)`, a template substitution, `+` on a size and a unit)',
        re: ASSEMBLY_RE,
      },
      {
        what: 'a numeric-validity test applied to a size (`Number.isFinite` / `isNaN` / `< 0` / `typeof … === \'number\'`)',
        re: /\b(?:Number\.isFinite|isFinite|isNaN|Number\.isNaN)\s*\(|<\s*0\b|typeof\s+\w+\s*===\s*['"]number['"]/,
      },
      {
        what: "an assignment or return of `''` in the spec-MALFORMED position (the `''` of `C-C`/§2.5 item 3 is the one legal site)",
        re: /(?:spec|meta|trackSpec)\s*\)\s*\?\s*['"]['"]\s*:/,
      },
      {
        what: 'a census read of this unit’s own (`hasOwnProperty`/`in`/`Map`/`Set`/`instanceof Map` applied to the census)',
        re: /\b(?:hasOwnProperty|Object\.keys\s*\(\s*(?:census|totals)|instanceof\s+(?:Map|Set))\b/,
      },
    ]
    const normalized = assembledLetters(raw)
    const duplicationHits: string[] = []
    for (const { what, re } of DUPLICATION_RULES) {
      for (const hit of staticHits(normalized, re)) duplicationHits.push(`${what} ⇒ ${hit}`)
    }
    expect(
      duplicationHits,
      `R-1(b)/§1 item 3 — the module’s code carries NO SECOND COPY of the token arithmetic (the two call sites are the delegation working; a duplicate implementation is a FINDING — §4.4 S-1)`,
    ).toEqual([])
    // ── the POSITIVE controls, required by the row: a fixture inlining the
    // arithmetic, and a fixture renaming the binding, must FAIL.
    const inlineArithmetic = `${'const'} t = String(size) + spec.unit\nif (!Number.isFinite(size) || size < 0) return spec.emptyToken`
    expect(
      DUPLICATION_RULES.some(({ re }) => staticHits(assembledLetters(inlineArithmetic), re).length > 0),
      'R-1(b) POSITIVE control — a fixture that INLINES the token arithmetic FAILS the duplication scan (the row is otherwise UNFALSIFIED)',
    ).toBe(true)
    const renamed = `${'import'} { isEmpty as ask, trackFor } from './zones.js'`
    expect(
      staticHits(code, /import\s+\{\s*isEmpty\s*,\s*trackFor\s*\}\s+from\s+['"]\.\/zones\.js['"]/).length === 0 &&
        staticHits(renamed, /\bimport\b/).length > 0,
      'R-1(a) POSITIVE control — a RENAMED binding (`isEmpty as ask`) FAILS the import form: the scan is on the exact statement, not on the presence of the word',
    ).toBe(true)
    expect(
      staticHits(renamed, /import\s+\{\s*isEmpty\s*,\s*trackFor\s*\}\s+from\s+['"]\.\/zones\.js['"]/).length,
      'R-1(a) POSITIVE control — the exact-statement scanner rejects the renamed import',
    ).toBe(0)
    // ── the NEGATIVE control: this unit’s own legitimate text PASSES.
    const legitimate =
      `import { isEmpty, trackFor } from './zones.js'\n` +
      `export function computeTrackVars(zones: unknown, census: unknown, sizes: unknown, revealed: unknown, specOf: unknown): TrackVars {\n` +
      `  const out: Record<string, string> = Object.create(null)\n` +
      `  const empty = isEmpty(census, zones)\n` +
      `  out['x'] = trackFor(specOf, sizes, empty)\n` +
      `  return out as TrackVars\n}\n`
    const legitHits = DUPLICATION_RULES.flatMap(({ re }) => staticHits(assembledLetters(legitimate), re))
    expect(
      legitHits,
      'R-1(b) NEGATIVE control — this unit’s own legitimate text (the two call sites, the one `\'\'` site of `C-C`) PASSES the duplication scan',
    ).toEqual([])
  })

  it('R-2 §3.4 — THE EXPORT-CENSUS + ARITY ROW: the three NAMED exports, `length === 5`, and no options object / rest / default', async () => {
    const s = await resolveSurface()
    const { mod } = s
    expect(
      mod,
      `R-2(a)/§2.1 — the module of §2.1/§5.1 row 1 exists and resolves (${s.reason ?? 'resolved'})`,
    ).not.toBe(null)
    const valueExports = Object.keys(mod ?? {}).filter((k) => k !== 'default').sort()
    expect(
      valueExports,
      'R-2(a)/§2.1 — the module’s RUNTIME exports are EXACTLY `computeTrackVars` (ONE value export; `1 + 2 = 3` exported names = this value export + the TWO type declarations). A SECOND value export fails this SET equality, and so does a DOC-LEVEL ALIAS (`SizeLookup`/`SpecLookup` are NOT part of the surface and a module that exports them FAILS)',
    ).toEqual(['computeTrackVars'])
    // The positive control: a namespace carrying a second value export FAILS.
    const twoValueExports = { computeTrackVars: (): TrackVars => ({}), sizeLookup: 1 }
    expect(
      Object.keys(twoValueExports).filter((k) => k !== 'default').sort(),
      'R-2(a) POSITIVE control — a namespace with a SECOND value export does not equal the pinned set (the census is a SET claim, never a bare count — §4.4 S-3)',
    ).not.toEqual(['computeTrackVars'])
    // (b) THE ARITY AND PARAMETER NAMES — the five named parameters, in the
    // ledger’s order, with no options object, no rest parameter and no default.
    const fn = s.computeTrackVars
    expect(fn, 'R-2(b)/§2.1 — `computeTrackVars` is exported as a function').not.toBe(null)
    expect(
      fn?.length,
      'R-2(b)/§2.1 — `computeTrackVars.length === 5`: the five parameters of §2.1 in the ledger’s ORDER (zones, census, sizes, revealed, specOf). A sixth declared parameter, a `...args` rest parameter or an options object FAILS',
    ).toBe(5)
    const source = String(fn)
    for (const [index, name] of ['zones', 'census', 'sizes', 'revealed', 'specOf'].entries()) {
      expect(
        new RegExp(`\\b${name}\\b`).test(source),
        `R-2(b)/§2.1 — the parameter at position ${index + 1} is NAMED \`${name}\` (a count is satisfiable by renaming, so the row asserts the NAMES)`,
      ).toBe(true)
    }
    expect(
      /\.\.\./.test(source),
      'R-2(b)/§2.1 — no REST parameter exists (a rest parameter would let a caller smuggle a default in)',
    ).toBe(false)
    expect(
      /=\s*(?!>)/.test(source.slice(source.indexOf('('), source.indexOf(')') + 1)),
      'R-2(b)/§2.1 — no DEFAULT-VALUED parameter exists in the declared signature',
    ).toBe(false)
    // (a) THE TYPE HALF, asserted at the TYPE level: this file does not compile
    // unless `ZoneId` and `TrackVars` are exported by the module (`§5.2` leg 4).
    const zoneFromModule: ModuleZoneId = 'a'
    const recordFromModule: ModuleTrackVars = { a: '1px' }
    const localZone: ZoneId = 42
    const localRecord: TrackVars = recordFromModule
    expect(
      [
        typeof zoneFromModule,
        typeof localZone,
        Object.keys(recordFromModule).length,
        Object.keys(localRecord).length,
      ],
      'R-2(a)/§2.1 — `ZoneId` and `TrackVars` are exported by the module (`import type` above) AND mirrored locally as `§2.1` declares them: this row does not COMPILE otherwise, which is the leg-4 half of the claim (a non-string member is a legal `ZoneId`, and the record is `Record<string, string>`)',
    ).toEqual(['string', 'number', 1, 1])
    // The doc-level alias is a LOCAL alias only: it is used here so the alias’s own
    // absence from the module’s runtime surface is asserted rather than assumed.
    // The doc-level alias’s SHAPE is carried as a local structural type here (never
    // as a module member), so the alias’s absence from the runtime surface is
    // asserted rather than assumed.
    const aliased: Readonly<Record<string, unknown>> = { a: 40 }
    expect(
      Object.keys(mod ?? {}).includes('SizeLookup'),
      'R-2(a)/§2.1 — the DOC-LEVEL ALIAS `SizeLookup` is NOT a runtime export of the module (it names a lookup SHAPE for §2.3 items 4/5 only)',
    ).toBe(false)
    expect(Object.keys(aliased), 'R-2 — the alias is exercised as a record lookup shape, never as a module member').toEqual(['a'])
  })

  it('R-3 §3.4 — THE ANTI-EVASION VOCABULARY ROW: no consumer vocabulary and no banned literal as a mechanism constant, with BOTH halves’ controls', () => {
    const raw = moduleSource('R-3 §2.2 P-1/P-2')
    // ── THE SCOPE RULE (§3.4 R-3), applied exactly: the VOCABULARY half reads the
    // WHOLE module file INCLUDING comments, over the NORMALIZED view; the LITERAL
    // half reads CODE WITH COMMENTS STRIPPED (a comment is not a constant).
    expect(
      vocabularyViolations(raw),
      'R-3/§2.2 P-1 — the module carries no consumer vocabulary token as a mechanism constant, symbol, union member or default, RAW or ASSEMBLED, with comments scanned as code (§4.4 S-2)',
    ).toEqual([])
    expect(
      literalViolations(stripComments(raw)),
      "R-3/§2.2 P-1 — the module carries no `'0px'`/`'fit-content'` literal in its CODE (the spelling may be MENTIONED in the spec’s prose; the module must not carry it as a constant)",
    ).toEqual([])
    // ── THE CONTROLS, both required by the row.
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `R-3 POSITIVE control — the vocabulary scan MUST fail for a module carrying the vocabulary ${shape}: the row is otherwise UNFALSIFIED and must not be filed`,
      ).toBeGreaterThan(0)
    }
    expect(
      vocabularyViolations(VOCAB_NEGATIVE_CONTROL),
      'R-3 NEGATIVE control — this unit’s own legitimate text (the value export name, the lookup names, the delegate’s names) PASSES the vocabulary scan',
    ).toEqual([])
    expect(
      vocabularyViolations(VOCAB_BOUNDARY_CONTROL),
      'R-3 — the BOUNDARY rule holds in the assembled view: two ordinary word chunks are a token boundary, not a spelling',
    ).toEqual([])
    expect(
      vocabularyViolations(`${'const'} table = 1; ${'const'} stable = 2;`),
      'R-3 — ordinary words CONTAINING a spelling are not violations (this is why the scan is bounded)',
    ).toEqual([])
    const literalPositive = `${'const'} t = '${['0', 'px'].join('')}'`
    expect(
      literalViolations(literalPositive).length,
      'R-3 POSITIVE control — a banned literal in CODE FAILS the literal half (the row is otherwise UNFALSIFIED)',
    ).toBeGreaterThan(0)
    expect(
      literalViolations(`// the caller's ${['0', 'px'].join('')} spelling is mentioned in a comment only`),
      'R-3 — the LITERAL half’s scope is CODE with comments stripped, stated in the row’s own text',
    ).toEqual([])
  })

  it('R-4 §3.4 — THE FORBIDDEN-ACCESS / NO-STORE ROW: no realm-rooted access, no ambient read, and ZERO module-level mutable state', () => {
    const raw = moduleSource('R-4 §2.2 P-4/P-6')
    const code = stripComments(raw)
    expectNoStaticHits(code, AMBIENT_RULES, 'R-4 §3.4 (§2.2 P-4/P-6)')
    expectNoStaticHits(code, MODULE_STATE_RULES, 'R-4 §3.4 (I-7 zero-state)')
    // ── the positive controls: every named evasion shape must be caught.
    const controls: ReadonlyArray<readonly [string, string, ReadonlyArray<{ re: RegExp }>]> = [
      ['a raw realm token', `const d = ${['doc', 'ument'].join('')}`, AMBIENT_RULES],
      ['a COMPUTED access on a banned token', `const g = ${['global', 'This'].join('')}['pro' + 'cess']`, AMBIENT_RULES],
      ['a helper-returned realm alias', `const realm = ${['global', 'This'].join('')}\nrealm['x']`, AMBIENT_RULES],
      ['the no-token realm route', `const g = ({}).constructor.constructor('return this')()`, AMBIENT_RULES],
      ['an ambient time read', `const t = Date.now()`, AMBIENT_RULES],
      ['a node fs read', `const fs = require('fs')`, AMBIENT_RULES],
      ['a module-scope `let` (a counter/store)', `${'let'} calls = 0`, MODULE_STATE_RULES],
      ['a module-scope Map (a cache)', `${'const'} cache = new Map()`, MODULE_STATE_RULES],
    ]
    for (const [label, fixture, rules] of controls) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-4 POSITIVE control (${label}) must FAIL its scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // ── THE ROW’S STATED LIMIT (§3.4 R-4): a BLANKET ban on `[expr]` is NOT
    // claimed — a locally constructed object’s computed access and ordinary
    // array/`Object.keys` indexing carry no banned token and are deliberately not
    // banned. A row asserting "no bracket notation at all" FAILS this row’s own
    // text and is `§4.4 S-3`; the controls below assert that no such over-broad
    // rule exists in this row.
    const legitimateIndexing = `${'const'} out: Record<string, string> = {}\nout['a'] = '1px'\nfor (const k of Object.keys(out)) { void out[k] }`
    expectNoStaticHits(legitimateIndexing, AMBIENT_RULES, 'R-4 STATED LIMIT — local computed access')
    expectNoStaticHits(legitimateIndexing, MODULE_STATE_RULES, 'R-4 STATED LIMIT — local computed access')
    expect(
      staticHits(legitimateIndexing, /\[/).length,
      'R-4 STATED LIMIT — the scan does not ban bracket notation as such (the fixture is full of it and passes)',
    ).toBeGreaterThan(0)
  })

  it('R-5 §3.4 — THE CROSS-UNIT BOUNDARY ROW: no projection/applier, no sibling host/gutter/session behaviour, no CSS/DOM/store', () => {
    const raw = moduleSource('R-5 §1 items 4/5/10')
    const code = stripComments(raw)
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a projection/applier vocabulary (`project`, `applyVarsToRoot`, `setProperty`, a write map or a sink)', re: /\b(?:applyVarsToRoot|setProperty|writeMap|project\s*\(|sink)\b/ },
      { what: 'a gutter/relocate/container/theme/session/host import or behaviour', re: /\b(?:createResizeController|clampToBounds|relocate|container|theme|session|listHost|slotHost|resizeController)\b/i },
      { what: 'a mount-cardinality behaviour (`U-MOUNTGUARD`)', re: /\b(?:mountCardinality|invariantGuard|mountCount)\b/i },
      { what: 'a CSS/DOM/store surface', re: /\b(?:style\b|customProperty|stylesheet|documentElement|localStorage|sessionStorage)\b/ },
    ]
    expectNoStaticHits(code, rules, 'R-5 §3.4 (§1 items 4/5/10)')
    for (const [label, fixture] of [
      ['an applier', `export function applyVarsToRoot(root: unknown, values: unknown) {}`],
      ['a resize controller', `export function createResizeController(x: unknown) {}`],
      ['a write map', `${'const'} writeMap: Record<string, unknown> = {}`],
      ['a style write', `el.style.setProperty('--a', '1px')`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-5 POSITIVE control (${label}) must FAIL the boundary scan — a positive on any half is a FINDING, not a style note`,
      ).toBe(true)
    }
    // The row’s honest limit, asserted so it is not read as a licence: it binds
    // THIS unit’s own file, so a SIBLING that later imports this module is NOT a
    // violation of `R-5` — that claim belongs to `R-8`/§7 item 2 and is asserted
    // there.
    expect(
      existsSync(new URL('../src/shared/layout-projection.ts', import.meta.url)),
      'R-5 — the sibling module really exists beside this one, so the boundary the row asserts is a boundary between real artefacts',
    ).toBe(true)
  })

  it('R-6 §3.4 — THE GEOMETRY ROW: no geometry-observation call and no geometry-shaped assertion, in the module or in this file', () => {
    // (a) THE MODULE FILE’s raw bytes, comments included.
    const raw = moduleSource('R-6 §2.5 / I-8')
    for (const re of GEOM_CALL_RES) {
      const hits = staticHits(raw, re)
      expect(
        hits,
        `R-6(a)/§2.5 item 1 — the module observes no geometry: ${JSON.stringify(hits)}. The arithmetic is provable here; ANY claim about the rendered geometry is UNPROVABLE in this repo today, and §5.2 offers no [U] row`,
      ).toEqual([])
    }
    // (b)/(c) THIS UNIT’S OWN TEST FILE: raw bytes, plus the row DESCRIPTIONS
    // extracted from it (the tokens are held as FRAGMENTS, which is why this half
    // reads raw bytes and the extracted titles rather than the rule list).
    expect(
      ownGeometryViolations(),
      'R-6(b)/(c) — this unit’s own [T] test file takes no geometry observation and no row description claims a resolved/layout/styling fact',
    ).toEqual([])
    const titles = rowTitles(readFileSync(TEST_FILE, 'utf8'))
    expect(titles.length, 'R-6(c) — the extracted-description census is NON-EMPTY (a vacuous extraction cannot pass this row)').toBeGreaterThan(25)
    // POSITIVE controls: a corpus observing geometry must FAIL, and a description
    // claiming a resolved fact must FAIL.
    const geometryCorpus = `${['const s = get', 'Computed', 'Style'].join('')}(el)\nconst w = el.${['offset', 'Width'].join('')}`
    expect(
      GEOM_CALL_RES.some((re) => staticHits(geometryCorpus, re).length > 0),
      'R-6 POSITIVE control — a corpus observing geometry FAILS the scanner (the row is otherwise UNFALSIFIED)',
    ).toBe(true)
    const claimCorpus = ['the token is accepted by the ', 'lay', 'out engine'].join('')
    expect(
      GEOM_CLAIM_RES.some((re) => re.test(claimCorpus)),
      'R-6 POSITIVE control — a description claiming a resolved fact FAILS the claim scanner',
    ).toBe(true)
    expect(
      GEOM_CLAIM_RES.some((re) => re.test('the emitted token is a string and the arithmetic holds')),
      'R-6 NEGATIVE control — ordinary arithmetic wording is NOT a claim',
    ).toBe(false)
    // THE ROW’S STATED LIMIT: a text scan cannot prove the absence of a claim for
    // ALL prose — it binds the two files it names, and §5.2’s refusal to offer a
    // `[U]` row is the contract half.
  })

  it('R-7 §3.4 — THE NO-SHIM / NO-NEW-SURFACE ROW: the shim gains no member and the five-seam negative holds by SET EQUALITY AGAINST THE NAMES', () => {
    const code = stripComments(moduleSource('R-7 §2.2 P-5/P-6'))
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a tool/resource/group registration', re: /\b(?:registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|ALL_TOOLS|ALL_RESOURCES|RpcMethod)\b/ },
      { what: 'an IPC surface', re: /\b(?:ipcRenderer|ipcMain|RpcRequest)\b/ },
      { what: 'a shim reference (this unit needs no shim member — H-r5)', re: /\bdom-shim\b/ },
      { what: 'an import from the seam trees', re: /\bfrom\s+['"][^'"]*(?:main|renderer)\// },
    ]
    expectNoStaticHits(code, rules, 'R-7 §3.4')
    for (const [label, fixture] of [
      ['a registration', `registerTool('x')`],
      ['a group-table read', `const g = VALID_GROUPS`],
      ['a shim reference', `import { mountEl } from './dom-shim.js'`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-7 POSITIVE control (${label}) must FAIL the scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // (1) `src/shared/dom-shim.ts` is untouched by this unit’s change set.
    const tree = treeChangeSet()
    expect(
      tree.paths.filter((p) => p === 'src/shared/dom-shim.ts'),
      `R-7/§0 ruling 8 (H-r5) — \`src/shared/dom-shim.ts\` gains no member because this unit’s change set never touches it: ${JSON.stringify(
        tree.paths,
      )}`,
    ).toEqual([])
    // (2) the five-seam negative, by SET EQUALITY AGAINST THE NAMES (never a bare
    // count — `§4.4 S-3`). Each seam is read from its OWN live declaration.
    const toolsLive = readArrayLiteral('src/main/mcp-server.ts', /static\s+readonly\s+ALL_TOOLS\s*:\s*string\[\]\s*=\s*\[/)
    const siblingPinned = readArrayLiteral('tests/engine-pin-version.test.ts', /const\s+PINNED_TOOL_SET\s*=\s*\[/)
    expect(
      siblingPinned.length,
      'R-7/§4.4 S-3 — the sibling name-complete row (`tests/engine-pin-version.test.ts` R-15) pins the 21 tool NAMES; this row cites it rather than re-authoring it',
    ).toBe(21)
    expect(
      toolsLive.sort(),
      `R-7/§2.2 P-5 — the LIVE \`ALL_TOOLS\` set equals the pinned 21-NAME set (a tool ADDED or REMOVED fails by name, not by count): ${JSON.stringify(
        toolsLive,
      )}`,
    ).toEqual([...siblingPinned].sort())
    const groupsLive = readArrayLiteral('src/main/security.ts', /const\s+VALID_GROUPS[^=]*=\s*new\s+Set\(\s*\[/)
    expect(groupsLive.sort(), 'R-7/§2.2 P-5 — the LIVE `VALID_GROUPS` keeps its FIVE named members').toEqual([
      'code',
      'dispatch',
      'graph',
      'module',
      'read',
    ])
    const mutatingLive = readArrayLiteral('src/renderer/renderer.ts', /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[/)
    expect(
      mutatingLive.sort(),
      'R-7/§2.2 P-5 — the LIVE `MUTATING_METHODS` keeps its SEVEN named entries (this unit adds no mutating IPC method)',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'])
    const rpcLive = readUnionMembers('src/shared/types.ts', /export\s+type\s+RpcMethod\s*=/)
    expect(rpcLive.length, 'R-7/§2.2 P-5 — the LIVE `RpcMethod` union is name-complete in this census (21 members)').toBe(21)
    expect(new Set(rpcLive).size, 'R-7 — the RpcMethod census is a SET (distinct members), so the count above is not a bag').toBe(21)
  })

  it('R-8 §3.4 — THE DIFF-SCOPE ROW: the unit’s own committed artifacts inside the allow-list, the DENIED set over the WHOLE set, and no consumer', () => {
    // -----------------------------------------------------------------------
    // `§5.1`’s COMMIT-RANGE SCOPE RULE, in the UNIT-SCOPED form the last three
    // passes converged on: the ALLOW-LIST binds THIS UNIT’S OWN COMMITTED
    // ARTIFACTS (a later unit’s commits and a sibling’s dirty files are NOT this
    // unit’s diff), the DENIED set binds the WHOLE committed/working set, and the
    // canonical artifacts must be non-vacuously present. A `git status`-ONLY probe
    // is VACUOUS after any commit and a WHOLE-RANGE probe goes red on later units’
    // work — both are the classes this form exists to close.
    // -----------------------------------------------------------------------
    const ALLOWED: readonly string[] = [
      MODULE_RELPATH,
      TEST_RELPATH,
      'docs/specs/census.md',
      'docs/next-steps.md',
      'docs/decisions.md',
      'docs/pending.md',
      'docs/FORKER.md',
      'docs/defects.md',
      'docs/HANDOFF.md',
    ]
    const UNIT_GREENS = CENSUS_GREENS_PROBE
    const UNIT_REVIEW_RECORD = CENSUS_REVIEW_PROBE
    const inScope = (path: string): boolean =>
      ALLOWED.includes(path) || UNIT_GREENS.test(path) || UNIT_REVIEW_RECORD.test(path)
    /** **`§5.1`’s “Outside the scope, ALWAYS” DENIED set** — it binds the WHOLE
     *  committed set absolutely. A pure `src/shared/` mechanism may touch none of
     *  these: the renderer/main trees, the shim, the shared types, the LANDED
     *  PREDECESSOR’s module and test file (read-only to this unit), another unit’s
     *  existing test file, the build/config surface, the out-of-repo package. */
    const DENIED: readonly string[] = [
      'src/renderer/',
      'src/main/',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'src/shared/zones.ts',
      'tests/zones.test.ts',
      'package.json',
      'package-lock.json',
      'scripts/',
      'node_modules/',
      '../Preempt-Providence/',
    ]
    const DENIED_PATTERNS: readonly RegExp[] = [
      // A SIBLING unit’s artifact (its `*-greens.md` or its review record) — the
      // carve-out is NAMED: this unit’s OWN `docs/specs/census-*.md` and its own
      // review record are admitted, and nothing else is.
      /^docs\/specs\/(?!census[^/]*-greens\.md$).*-greens\.md$/,
      /^archive\/reviews\/(?!.*(U-CENSUS|census)).*\.md$/,
      // Another unit’s EXISTING test file (this unit authors exactly one test file).
      /^tests\/(?!census\.test\.ts$)/,
    ]
    const isDenied = (path: string): boolean =>
      DENIED.some((d) => path === d || path.startsWith(d)) || DENIED_PATTERNS.some((re) => re.test(path))
    const SCOPE_TEXT = `${ALLOWED.join(
      ' + ',
    )} + this unit’s own docs/specs/census*-greens.md + this unit’s own review record under archive/reviews/`
    const committed = committedChangeSet()
    if (committed !== null) {
      const scoped = unitScopedCommitted(committed.anchor, committed.range)
      expect(
        scoped.unitCommits,
        `R-8/§5.1 — at least ONE commit in ${committed.range} touched this unit’s own artifacts: the unit-scoped census is non-empty (commits in the range: ${scoped.commitsInRange}, unit-touching commits: ${scoped.unitCommits}). A commit touching none of them is another unit’s commit and is out of this row’s jurisdiction — not a licence, a boundary`,
      ).toBeGreaterThan(0)
      expect(
        scoped.files.length,
        `R-8/§5.1 — the unit’s own committed change set (${committed.range}, unit-scoped) is NON-EMPTY: a vacuous census cannot pass this row`,
      ).toBeGreaterThan(0)
      // THE DENIED HALF binds the WHOLE unit-scoped set (every file of every
      // unit-touching commit), so a denied path fails even when it rides beside a
      // correct gate commit.
      for (const path of scoped.allFilesOfUnitCommits) {
        expect(
          isDenied(path),
          `R-8/§5.1 — '${path}' was COMMITTED inside this unit’s range ${committed.range} and is in the DENIED set: a boundary violation whatever its content. The unit-scoped committed change set was: ${JSON.stringify(
            scoped.allFilesOfUnitCommits,
          )}`,
        ).toBe(false)
      }
      // THE ALLOW-LIST half binds THIS UNIT’S OWN artifacts only.
      for (const path of scoped.files.filter((p) => isCensusUnitArtifact(p) || /^docs\//.test(p))) {
        if (isDenied(path)) continue
        expect(
          inScope(path) || /^docs\/specs\/[^/]*\.md$/.test(path) || /^docs\/[^/]*\.md$/.test(path),
          `R-8/§5.1 — '${path}' is one of this unit’s own committed artifacts and is outside the allow-list (${SCOPE_TEXT})`,
        ).toBe(true)
      }
      expect(
        scoped.files.filter((p) => [MODULE_RELPATH, TEST_RELPATH, 'docs/specs/census.md'].includes(p)).length,
        `R-8 — at least ONE of the unit’s three canonical artifacts is genuinely committed inside the unit-scoped range, so the census is a census of real unit work: ${JSON.stringify(
          scoped.files,
        )}`,
      ).toBeGreaterThan(0)
    } else {
      // THE RED-TIME BRANCH: the red-set commit does not exist yet (RCA-8(a)), so
      // the census falls back to the WORKING TREE — and says so, because a probe
      // that silently passed on an empty range would be the vacuity this form
      // closes.
      const tree = treeChangeSet()
      expect(
        tree.paths.includes(TEST_RELPATH),
        `R-8/§5.1 — the canonical artifact this RED set authors is present in the change set, so the census is not vacuous: ${JSON.stringify(
          tree.paths,
        )}`,
      ).toBe(true)
    }
    // THE WORKING-TREE HALF, scoped to THIS UNIT’S OWN artifacts (a sibling’s
    // in-flight file is not this unit’s diff).
    const ownTreePaths = treeChangeSet().paths.filter((p) => isCensusUnitArtifact(p))
    for (const path of ownTreePaths) {
      expect(
        isDenied(path),
        `R-8/§5.1 — '${path}' is in the DENIED set and is present in the WORKING TREE: a boundary violation whatever its content`,
      ).toBe(false)
      expect(
        inScope(path),
        `R-8/§5.1 — '${path}' is outside this unit’s diff scope (the allow-list is: ${SCOPE_TEXT})`,
      ).toBe(true)
    }
    // THE DENIED SET’S OWN FALSIFIABILITY, asserted rather than assumed.
    for (const probe of [
      'src/main/main.ts',
      'src/renderer/renderer.ts',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'src/shared/zones.ts',
      'tests/zones.test.ts',
      'package.json',
      'scripts/mcp-cli.mjs',
      'tests/listhost.test.ts',
      'docs/specs/projection-greens.md',
      'archive/reviews/2026-09-27-U-ZONES-doc-review.md',
    ]) {
      expect(isDenied(probe), `R-8 — the DENIED set really rejects '${probe}' (the row’s falsifiable half)`).toBe(true)
    }
    // …and this unit’s own artifacts are not themselves denied.
    for (const path of [MODULE_RELPATH, TEST_RELPATH, 'docs/specs/census.md', 'docs/specs/census-greens.md']) {
      expect(isDenied(path), `R-8 — '${path}' is THIS unit’s own artifact and can be in no denied set`).toBe(false)
    }
    // THE COMPANION CLAIM: at the time this red set runs, `src/shared/census.ts`
    // is imported by NO `src/**` file (`R-13` carries the probe; asserted here as
    // the same fact at the row that names it).
    const importers = walkSourceFiles().filter((rel) =>
      /from\s+['"][^'"]*shared\/census(\.js)?['"]/.test(stripComments(readFileSync(`${REPO_ROOT}/${rel}`, 'utf8'))),
    )
    expect(importers, 'R-8/§7 item 2 — the module is imported by NO `src/**` file at red time').toEqual([])
  })

  it('R-9 §3.4 — THE NO-MUTATION STATIC ROW: no write into any argument and no caller value cached in a retained binding', () => {
    const code = stripComments(moduleSource('R-9 §2.4 C-B (static half) / I-3'))
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a write into an argument by computed/indexed assignment', re: /\b(?:zones|census|sizes|specOf|values|totals|dims|meta)\s*\[[^\]]*\]\s*=[^=]/ },
      { what: 'a mutating `Object.assign`/`defineProperty`/`Reflect.set`/`Object.freeze` on a caller value', re: /\b(?:Object\.assign|Object\.defineProperty|Reflect\.set|Object\.freeze|Object\.seal)\s*\(/ },
      { what: 'a `Map.set`/`Set.add`/`push`/`sort`/`splice`/`delete` on a caller value', re: /\.(?:set|add|push|sort|splice|unshift|shift|pop|delete)\s*\(/ },
      { what: 'an assignment to a bare parameter name', re: /^\s*(?:zones|census|sizes|specOf|values|totals|dims|meta)\s*=[^=]/m },
    ]
    expectNoStaticHits(code, rules, 'R-9 §3.4')
    for (const [label, fixture] of [
      ['a census write', `census['a'] = 0`],
      ['an Object.assign into zones', `Object.assign(zones, { a: 1 })`],
      ['a Map write', `cache.set('a', 1)`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-9 POSITIVE control (${label}) must FAIL the write-site scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // The row’s honest limit, asserted so it is not over-read: a source scan proves
    // the ABSENCE OF A WRITE SITE in the file it reads; the OBSERVABLE half is
    // `I-3`’s and `P-CN-IM-3`’s runtime drives. The legitimate local write to the
    // RETURNED record (a fresh object this module owns) is not a caller-value write
    // and must PASS.
    const legitimate = `${'const'} out: Record<string, string> = Object.create(null)\nout['a'] = '1px'`
    expectNoStaticHits(legitimate, rules, 'R-9 STATED LIMIT — the returned record is this module’s own object')
    expect(
      staticHits(legitimate, /^\s*out\[[^\]]*\]\s*=/m).length,
      'R-9 — the fixture really contains a write site, so the stated limit is measured and not assumed',
    ).toBeGreaterThan(0)
  })

  it('R-10 §3.4 — THE PATH / MODULE-ABSENCE ROW: at RED time the module does not exist and this test file is the only unit-owned file in the change set', () => {
    // (RED form, governing AT RED TIME — the form that is TRUE in the state this
    // row RUNS in). Its FAIL is MEANINGFUL: if the module EXISTS before the red
    // run, this row FAILS and the unit’s red-order claim (RCA-1) is broken, and
    // the pass that finds it must report the inversion rather than proceed. The
    // GREEN form (the module landed; the unit-owned set is EXACTLY the module plus
    // this test file; the census asserted NON-EMPTY before the equality) is
    // recorded as PROVENANCE in the comment below and is deliberately NOT asserted
    // here, because asserting a green-state claim at red time would report the
    // red’s own premise as a defect.
    //
    // PROVENANCE — the GREEN form this row will carry at green time:
    //   the module EXISTS; no other `census*` path exists anywhere in `src/**` or
    //   `tests/**`; both canonical artefacts are present; the census is asserted
    //   NON-EMPTY before the equality that is its claim.
    const moduleExists = existsSync(MODULE_SRC)
    expect(
      moduleExists,
      `R-10 (RED form)/§0A note 1 — at the moment this red set is AUTHORED and RUN, \`src/shared/census.ts\` does NOT exist (${fileURLToPath(
        MODULE_SRC,
      )}). IF IT EXISTS, this row FAILS and the unit's red-order claim (RCA-1) is broken — the pass that finds it reports the inversion rather than proceeding`,
    ).toBe(false)
    // The unit-owned path census: this test file is the ONLY `census*` path in
    // `src/**` + `tests/**` while the module is absent.
    const onDisk = walkCensusPaths()
    expect(
      onDisk.length,
      'R-10/§3.5 — the unit-owned path census is NON-EMPTY, so the equality below is not satisfied vacuously',
    ).toBeGreaterThan(0)
    expect(
      onDisk,
      `R-10/§0A note 1 — the unit-owned surface of \`src/**\` and \`tests/**\` is EXACTLY this red set while the module is absent (a second unit-owned path would be an artefact this row's claim does not admit): ${JSON.stringify(
        onDisk,
      )}`,
    ).toEqual([TEST_RELPATH])
    expect(
      existsSync(TEST_FILE),
      'R-10 — the probe is not vacuous: this test file itself exists on disk through the same mechanism',
    ).toBe(true)
  })
})

// ===========================================================================
// PRE — harness preconditions (NOT spec rows). `§4.2` item 2 requires the
// un-run register rows to be reported as failures; these rows exist so that a
// red run’s *own* instruments are proved to work.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING pure module)', async () => {
    const existing = ['..', 'src', 'shared', 'zones.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(
      typeof mod['isEmpty'],
      'PRE-1 — the computed-specifier import boundary resolves against an EXISTING module, so every module-absent row below fails as an ASSERTION and never as a collection error',
    ).toBe('function')
    expect(mod['trackFor'], 'PRE-1 — the second value export of the existing module is reachable too').toBeTypeOf('function')
  })

  it('PRE-2 (harness) — the §5.5.1 register tables are the ones the spec specifies (seed, terms, caps, arithmetic)', () => {
    expect(SEED, 'the seed is the pinned literal §5.5.1 names').toBe(20260927)
    expect(LCG_A, 'the LCG multiplier is the pinned literal').toBe(1664525)
    expect(LCG_C, 'the LCG increment is the pinned literal').toBe(1013904223)
    expect(LCG_MOD, 'the LCG modulus is 2^32').toBe(4294967296)
    expect(REGISTER_ROW_CAP, 'the per-row cap is <=100').toBe(100)
    expect(REGISTER_TOTAL_CAP, 'the register cap is <=400').toBe(400)
    expect(CONSECUTIVE_FAILURE_CAP, 'the stop rule is 5 consecutive failures').toBe(5)
    // §5.5.1’s EIGHT declared rows — `(row id, strategy id, term)` in register
    // order, with the term printed so the total is the SUM OF ITS OWN TERMS
    // (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE): `248` =
    // `68+36+24+14+30+10+30+36`. The table is declared ONCE at module scope, so
    // `PRE-2`, `P-CN-SEED-POOL` and `REGISTER-STATUS` all reconcile against the
    // same object — which is what makes this file’s tables machine-comparable for
    // the later read-only PBT audit (`§3a A-17`).
    const declared = REGISTER_DECLARED.map((r) => [r.row, r.term] as const)
    const total = declared.reduce((sum, [, n]) => sum + n, 0)
    expect(
      total,
      'PRE-2/§5.3 item 11 — the declared total is the SUM OF ITS OWN TERMS: 68+36+24+14+30+10+30+36 = 248',
    ).toBe(248)
    expect(total, 'PRE-2/§5.5.1 — the total is under the <=400 register cap').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    for (const [row, n] of declared) {
      expect(n, `PRE-2/§5.5.1 — row ${row} is under the <=100 per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    // The tables this file actually drives, against the declared terms.
    expect(IM1_PREDICATE_VARIANTS.length, "P-CN-IM-1's 17 reveal-predicate variants").toBe(17)
    expect(IM1_CENSUS_SHAPES.length, "P-CN-IM-1's 4 census shapes").toBe(4)
    expect(IM2_DECISIONS.length, "P-CN-IM-2's 3 decision variants").toBe(3)
    expect(IM2_CENSUSTS.length, "P-CN-IM-2's 4 census states").toBe(4)
    expect(IM2_MISSINGNESS.length, "P-CN-IM-2's 3 missingness configurations").toBe(3)
    expect(IM3_CALLER_OBJECTS.length, "P-CN-IM-3's 3 caller objects").toBe(3)
    expect(IM3_ACCESS_PATTERNS.length, "P-CN-IM-3's 2 access patterns").toBe(2)
    expect(IM3_TWIN_FORMS.length, "P-CN-IM-3's 2 frozen/unfrozen twin forms").toBe(2)
    expect(IM4_ARGUMENT_DRIVES.length, "P-CN-IM-4's 8 argument-shape drives").toBe(8)
    expect(IM4_COUNT_DRIVES.length, "P-CN-IM-4's 3 call-count drives").toBe(3)
    expect(IM4_FIDELITY_DRIVES.length, "P-CN-IM-4's 3 argument-fidelity drives").toBe(3)
    expect(SM1_SHAPES.length, "P-CN-SM-1's 10 shape classes").toBe(10)
    expect(SM1_PASSES.length, "P-CN-SM-1's 3 driving passes").toBe(3)
    expect(SM2_SHAPES.length, "P-CN-SM-2's 10 zone-enumeration shapes").toBe(10)
    expect(SM3_SHAPES.length, "P-CN-SM-3's 10 empty-input shapes").toBe(10)
    expect(SM3_PASSES.length, "P-CN-SM-3's 3 passes").toBe(3)
    expect(TP1_POOL.length, "P-CN-TP-1's 30-member pool, each counted once").toBe(30)
    expect(new Set(TP1_POOL.map((m) => m.id)).size, 'the 30 pool members are distinct (each counted once)').toBe(30)
    const draws = TP1_DRAW_INDICES.length
    expect(draws, "P-CN-TP-1's 36 pinned-seed draws").toBe(36)
    expect(
      new Set(TP1_DRAW_INDICES).size,
      'the 36 draws are a DRAW, never a sweep: NO row may assert "all 30 drawn" (§5.5.1 honesty item 5) — the distinct-member count is REPORTED, not asserted',
    ).toBeLessThanOrEqual(30)
    // THE SEED’S OWN ARITHMETIC, re-derived here from the pinned literals (one LCG
    // step per draw, `index = stateₙ₊₁ mod pool.length`) so the draw sequence is
    // checked rather than trusted.
    expect(
      makeLcg(SEED).step(),
      'PRE-2/§5.5.1 — ONE LCG step from the pinned seed is (20260927·1664525 + 1013904223) mod 2^32, recomputed from the pinned literals',
    ).toBe((20260927 * 1664525 + 1013904223) % 4294967296)
    // ⟶ THE EXECUTION RECORD §5.5.1’s honesty item 5 DEFERS TO THIS RUN: the
    // per-draw pool index, the DISTINCT-MEMBER count and the repetition count are
    // MEASURED here (the filing could not execute the generator).
    const distinct = new Set(TP1_DRAW_INDICES).size
    const repetitions = draws - distinct
    console.log(
      `§5.5.1 seed record :: ${JSON.stringify({
        seed: SEED,
        step: 'state_{n+1} = (state_n * 1664525 + 1013904223) mod 2^32, ONE step per draw, index = state_{n+1} mod pool.length',
        draws,
        poolSize: TP1_POOL.length,
        distinctMembersDrawn: distinct,
        repetitions,
        indices: TP1_DRAW_INDICES,
      })}`,
    )
    expect(distinct, 'PRE-2 — the distinct-member count is a MEASURED figure reported beside the declared 36 draws').toBeGreaterThan(0)
    expect(repetitions, 'PRE-2 — repetitions = draws − distinct members (reported, never asserted as coverage)').toBe(draws - distinct)
  })

  it('PRE-3 (harness) — the R-3/R-4/R-6 scanners detect their evasions and pass the legitimate text (their own controls)', () => {
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `PRE-3/S-2 — the vocabulary scan MUST fail for a module carrying the vocabulary ${shape}: the row is otherwise UNFALSIFIED`,
      ).toBeGreaterThan(0)
    }
    expect(vocabularyViolations(VOCAB_NEGATIVE_CONTROL), 'PRE-3 — this unit’s own legitimate text PASSES the vocabulary scan').toEqual([])
    expect(
      ownGeometryViolations(),
      'PRE-3/R-6 — this unit’s own file takes no geometry observation and claims none in its descriptions',
    ).toEqual([])
  })

  it('PRE-4 (harness) — THE POOL-VERSUS-BOUNDARY RULE: every register row’s declared members satisfy ITS OWN declared boundary', () => {
    // `§5.5.1`’s POOL-VERSUS-BOUNDARY RULE: *a pool or table member that
    // contradicts the row’s own declared boundary is a REGISTER DEFECT, and the RED
    // RUN is where it is caught.* The predecessor’s worked case (`P-ZN-TP-2`’s
    // negative member under a "non-negative only" boundary) is the class this check
    // exists to prevent.
    const violations: string[] = []
    // `P-CN-TP-1`’s boundary, AS THE ROW’S OWN DRIVE-SCOPE CLAUSE STATES IT (per
    // member, never by category): an OBJECT/FUNCTION member is driven WRAPPED in a
    // one-element array (so it becomes the sole member of `zones` and its
    // `String()` image is its own key); a member that is not itself a sequence and
    // is passed DIRECTLY is `§2.3` item 1 (c)’s ZERO-ZONE class, whose declared
    // outcome is the empty record; and the `Symbol` member is the DROP case.
    // **THE ROW’S `§5.5.1` POOL-VERSUS-BOUNDARY CELL CLAIMS “every member is an
    // OBJECT or a FUNCTION”, WHICH THE ROW’S OWN `30`-MEMBER LIST CONTRADICTS**
    // (members `(1)`–`(18)` are primitives, `(19)`/`(20)` are `null`/`undefined`
    // and `(24)` is a `Symbol`), so this check binds the clause the row’s own DRIVE
    // SCOPE states — per member, with each member’s declared outcome — and the
    // contradiction is REPORTED beside this row rather than reconciled by guessing
    // (a spec fix is the supervisor’s, not a TestWriter’s).
    const tp1BoundaryViolations: string[] = []
    for (const member of TP1_POOL) {
      const value = member.make()
      const kind = value === null ? 'null' : typeof value
      if (member.dropsSymbol === true) {
        if (kind !== 'symbol') tp1BoundaryViolations.push(`pool member ${member.id} is declared the DROP case but is ${kind}`)
        continue
      }
      if (kind === 'object' || kind === 'function') continue
      // A primitive member: the DRIVE SCOPE declares it zero zones (driven
      // directly), so its declared outcome must be stated as such.
      if (!TP1_ZERO_ZONE_MEMBERS.includes(member.id) && !TP1_PRIMITIVE_STRING_MEMBERS.includes(member.id)) {
        tp1BoundaryViolations.push(
          `pool member ${member.id} is ${kind} and declares no zero-zone outcome although the row's DRIVE SCOPE names that class`,
        )
      }
    }
    expect(
      tp1BoundaryViolations,
      `PRE-4/§5.5.1 — every member of \`P-CN-TP-1\`'s pool satisfies the outcome its own DRIVE-SCOPE clause declares for that member (checked member-for-member): ${JSON.stringify(
        tp1BoundaryViolations,
      )}`,
    ).toEqual([])
    violations.push(
      ...tp1BoundaryViolations,
    )
    // `P-CN-IM-1`’s boundary: every predicate variant is a CALLABLE or a declared
    // non-callable with its own expected outcome, and every census shape has its
    // own declared expectation.
    for (const variant of IM1_PREDICATE_VARIANTS) {
      if (variant.make() !== undefined && typeof variant.make() !== 'function' && variant.expected !== 'empty-record') {
        violations.push(`P-CN-IM-1 variant ${variant.id} is not callable yet does not declare the empty-record outcome`)
      }
    }
    // `P-CN-SM-3`’s boundary: every shape is an EMPTY-or-non-enumerable input whose
    // declared outcome is the empty record.
    for (const shape of SM3_SHAPES) {
      if (shape.expectedKeys.length !== 0) {
        violations.push(`P-CN-SM-3 shape ${shape.id} declares ${JSON.stringify(shape.expectedKeys)} — the row's boundary is the empty record for every shape`)
      }
    }
    // `P-CN-SM-2`’s boundary: every shape declares its OWN expected key list, so no
    // member can contradict the text by category.
    for (const shape of SM2_SHAPES) {
      if (!Array.isArray(shape.expectedKeys)) {
        violations.push(`P-CN-SM-2 shape ${shape.id} declares no expected key list`)
      }
    }
    expect(
      violations,
      `PRE-4/§5.5.1 — every declared member satisfies its row's own boundary (all 8 rows checked member-for-member): ${JSON.stringify(
        violations,
      )}`,
    ).toEqual([])
    console.log(
      `§5.5.1 pool-versus-boundary record :: ${JSON.stringify({
        P_CN_TP_1: {
          members: TP1_POOL.length,
          boundaryBOUND: "the row's DRIVE-SCOPE clause, per member (object/function ⇒ wrapped; non-sequence ⇒ zero zones; Symbol ⇒ dropped)",
          boundaryCLAIMED_BY_THE_SPEC_CELL: 'every member is an object or a function',
          specCellContradicted: true,
          violations: 0,
        },
        P_CN_IM_1: { variants: IM1_PREDICATE_VARIANTS.length, censusShapes: IM1_CENSUS_SHAPES.length, violations: 0 },
        P_CN_SM_2: { shapes: SM2_SHAPES.length, violations: 0 },
        P_CN_SM_3: { shapes: SM3_SHAPES.length, violations: 0 },
      })}`,
    )
  })

  it('PRE-5 (harness) — the DELEGATE-SPY boundary reaches the module’s own import specifier (proved against a live consumer)', async () => {
    // The module under test will call the delegate through `import … from
    // './zones.js'`. This control proves the `vi.mock` intercepts THAT specifier
    // for any module resolving to `src/shared/zones.ts`, by driving the real
    // delegate namespace this file imported and asserting the spy log records the
    // call — i.e. the observation mechanism is not silently inert.
    resetDelegateLog()
    const spec: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'E' }
    const value = delegate.trackFor(spec, 40, delegate.isEmpty({ a: 0 }, 'a'))
    expect(
      value,
      'PRE-5 — the mocked delegate still returns U-ZONES’ own bytes (the mock observes; here the census answered `true`, so the caller’s emptyToken is the delegate’s own answer for that flag)',
    ).toBe('E')
    expect(
      [DELEGATE_LOG.isEmpty.length, DELEGATE_LOG.trackFor.length],
      'PRE-5 — the spy wrappers the module will receive ARE the ones this file imported, so a delegate call from the module lands in DELEGATE_LOG',
    ).toEqual([1, 1])
    expect(DELEGATE_LOG.isEmpty[0][1], 'PRE-5 — the log records the argument tuple, not a bare count').toBe('a')
  })

  it('PRE-6 (harness) — the REAL U-ZONES semantics the expected values rest on (driven through the same namespace)', () => {
    // Every expected value in this file is composed from these two functions or
    // taken from the delegate’s own answer. This row pins the LIMBS the expected
    // values depend on (cited from `docs/specs/zones.md` `§2.3`, never re-derived
    // as this unit’s own contract — `§2.5` item 2 / `§4.4 S-1`).
    const spec: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' }
    expect(delegate.isEmpty({ a: 0 }, 'a'), 'PRE-6 — an own `0` value is EMPTY').toBe(true)
    expect(delegate.isEmpty({ a: 3 }, 'a'), 'PRE-6 — a non-zero own value is NOT empty').toBe(false)
    expect(delegate.isEmpty(new Map([['a', 0]]), 'a'), 'PRE-6 — a `Map` with an own `0` is EMPTY').toBe(true)
    expect(delegate.isEmpty({ 42: 0 }, 42), 'PRE-6 — a NON-STRING member against a record census is never empty (F-6’s premise)').toBe(false)
    expect(delegate.trackFor(spec, 120, false), 'PRE-6 — the size+unit limb').toBe('120px')
    expect(delegate.trackFor(spec, undefined, false), 'PRE-6 — a non-finite/absent size yields the caller’s `emptyToken`').toBe('SENTINEL-E')
    expect(delegate.trackFor(null, 120, false), 'PRE-6 — a malformed spec yields the degenerate `\'\'`').toBe('')
    expect(delegate.trackFor(spec, -0, false), 'PRE-6 — `-0` yields the `\'0\'` numeric text (the delegate’s own ruled limb)').toBe('0px')
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER’S EXECUTION MACHINERY.
// Caps (uniform for the whole register): <=100 attempts per row, <=400 attempts
// in total, rows evaluated SEQUENTIALLY IN REGISTER ORDER, STOP AFTER 5
// CONSECUTIVE FAILURES (the running row’s remaining attempts are abandoned and no
// further row starts). Each row’s `it` title carries its row id AND its `S-CN-*`
// strategy id, and each row logs its own record line so a read-only PBT audit can
// read attempts-run / held / broken / notStarted / registerStoppedAt per row.
// **An un-run row FAILS — it never looks green.**
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296

/** **`§5.5.1`’s EIGHT DECLARED ROWS** — `(row id, strategy id, term)`, as the
 *  spec states them: `68+36+24+14+30+10+30+36 = 248`. Declared ONCE, at module
 *  scope, so `PRE-2` (the table precondition), `PRE-4` (the pool-versus-boundary
 *  rule) and `REGISTER-STATUS` (the executed record) all reconcile against the
 *  same object. */
const REGISTER_DECLARED: ReadonlyArray<{ row: string; strategy: string; term: number }> = [
  { row: 'P-CN-IM-1', strategy: 'S-CN-KEYSET-1', term: 68 },
  { row: 'P-CN-IM-2', strategy: 'S-CN-REVEAL-1', term: 36 },
  { row: 'P-CN-IM-3', strategy: 'S-CN-PURITY-1', term: 24 },
  { row: 'P-CN-IM-4', strategy: 'S-CN-DELEGATE-1', term: 14 },
  { row: 'P-CN-SM-1', strategy: 'S-CN-TOTAL-1', term: 30 },
  { row: 'P-CN-SM-2', strategy: 'S-CN-SHAPE-1', term: 10 },
  { row: 'P-CN-SM-3', strategy: 'S-CN-EMPTY-1', term: 30 },
  { row: 'P-CN-TP-1', strategy: 'S-CN-SEED-1', term: 36 },
]
function registerKeySet(rows: ReadonlyArray<{ row: string; strategy: string }>): string[] {
  return rows.map((r) => `${r.row} :: ${r.strategy}`).sort()
}

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
const registerRecords: RowRecord[] = []

/** The DECLARED term (`§5.5.1`) reconciled against the table this file actually
 *  drove — the reconciliation `§5.3` items 10/11 require. A row that NEVER
 *  STARTED is not reconciled here: its own `finish()` reports it as a FAILURE,
 *  which is the loud message a stopped red run must carry. */
function reconcile(rec: RegisterRow, declared: number, what: string): void {
  const ran = rec.attemptsRunPublic()
  if (ran === 0) return
  expect(ran, `${what} — the declared term is ${declared}`).toBe(declared)
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
      this.causes.push(`the <=${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the <=${REGISTER_TOTAL_CAP}-attempts register cap was reached`
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

  attemptsRunPublic(): number {
    return this.attemptsRun
  }

  /** The row’s verdict + its `§5.3` item 10 record line. An un-run row FAILS on
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
    registerRecords.push(record)
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    // ── THE UN-RUN ROWS ARE REPORTED AS FAILURES, and the STOPPED row is the one
    // that carries the blame (§4.2 item 2: “a red run that reports all `248`
    // attempts as executed is the finding, not the expectation”). A row that never
    // STARTED because an EARLIER row triggered the stop-after-5 rule is recorded
    // with `notStarted: true` and does NOT add a second, misleading failure — the
    // stop itself is asserted at the row that caused it and by `REGISTER-STATUS`,
    // which requires the un-run set to be non-empty and each un-run row to be
    // reported rather than silently omitted.
    if (this.attemptsRun === 0) {
      expect(
        registerState.stoppedAtRow !== null,
        `${line} — this row NEVER STARTED although the register did NOT stop: an un-run register row is a FAILURE, never a pass (§5.5.1 strategy item 3)`,
      ).not.toBe(null)
      expect(
        this.notStarted || registerState.stoppedAtRow !== this.row,
        `${line} — the row was reported as un-run (notStarted) because the stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures discipline triggered at ${registerState.stoppedAtRow} (${registerState.stoppedFor})`,
      ).toBe(true)
      console.log(
        `§5.5.1 un-run row record :: ${JSON.stringify({
          row: this.row,
          strategy: this.strategy,
          attemptsRun: 0,
          reported: 'FAILURE — never started; the register stopped earlier',
          registerStoppedAt: registerState.stoppedAtRow,
          stoppedFor: registerState.stoppedFor,
        })}`,
      )
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

/** `S-CN-SEED-1`’s generator: a hand-rolled 32-bit LCG whose constants are
 *  literals in THIS file. `stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`,
 *  **ONE step per draw**; the pool index is `stateₙ₊₁ mod pool.length` — there is
 *  NO `next(k)` scaling helper (`§5.5.1` strategy item 2). */
function makeLcg(seed: number): { state: () => number; step: () => number } {
  let state = seed >>> 0
  return {
    state(): number {
      return state
    },
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}

// ===========================================================================
// §5.5.1 — THE REGISTER TABLES (the pinned inputs each row drives).
// ===========================================================================
type Variant = { id: string; make: () => unknown; expected: string }

/** `P-CN-IM-1`’s 17 reveal-predicate variants, in the spec’s fixed order. */
const IM1_PREDICATE_VARIANTS: ReadonlyArray<Variant> = [
  { id: '(1) absent (the argument omitted)', make: () => undefined, expected: 'empty-record' },
  { id: '(2) `undefined`', make: () => undefined, expected: 'empty-record' },
  { id: '(3) `null`', make: () => null, expected: 'empty-record' },
  { id: '(4) `42`', make: () => 42, expected: 'empty-record' },
  { id: "(5) `'x'`", make: () => 'x', expected: 'empty-record' },
  { id: '(6) `true`', make: () => true, expected: 'empty-record' },
  { id: '(7) `{}`', make: () => ({}), expected: 'empty-record' },
  { id: '(8) `[]`', make: () => [], expected: 'empty-record' },
  { id: '(9) a `Map`', make: () => new Map([['a', true]]), expected: 'empty-record' },
  { id: '(10) `() => true`', make: () => (): boolean => true, expected: 'all-three' },
  { id: '(11) `() => false`', make: () => (): boolean => false, expected: 'declined-all' },
  { id: '(12) `() => 0`', make: () => (): number => 0, expected: 'declined-all' },
  { id: "(13) `() => ''`", make: () => (): string => '', expected: 'declined-all' },
  { id: '(14) `() => NaN`', make: () => (): number => Number.NaN, expected: 'declined-all' },
  { id: '(15) `() => 1`', make: () => (): number => 1, expected: 'all-three' },
  { id: '(16) a function that THROWS', make: () => (): never => { throw new Error('the predicate threw') }, expected: 'empty-record' },
  { id: "(17) a spy `(id) => id !== 'b'`", make: () => (id: unknown): boolean => id !== 'b', expected: 'declined-middle' },
]
/** `P-CN-IM-1`’s 4 census shapes. */
const IM1_CENSUS_SHAPES: ReadonlyArray<{ id: string; make: () => unknown }> = [
  { id: '(i) the record `{a: 0, b: 3}`', make: () => ({ a: 0, b: 3 }) },
  { id: "(ii) the `Map` `new Map([['a', 0], ['b', 1]])`", make: () => new Map([['a', 0], ['b', 1]]) },
  { id: '(iii) a null-prototype record carrying `{a: 0}`', make: () => { const r: Record<string, unknown> = Object.create(null); r.a = 0; return r } },
  { id: '(iv) the record `{a: 3}` (a non-zero, so `a` is non-empty too)', make: () => ({ a: 3 }) },
]
/** The expected key set of `P-CN-IM-1`’s drive per variant class. */
function im1ExpectedKeys(variant: Variant): string[] {
  switch (variant.expected) {
    case 'empty-record':
      return []
    case 'declined-all':
    case 'declined-middle':
    case 'all-three':
      return ['a', 'b', 'c']
    default:
      return []
  }
}
/** The declined zones of a variant, by id (`declined-middle` declines `b`). */
function im1DeclinedZones(variant: Variant): string[] {
  switch (variant.expected) {
    case 'declined-all':
      return ['a', 'b', 'c']
    case 'declined-middle':
      return ['b']
    default:
      return []
  }
}

/** `P-CN-IM-2`’s 3 decision variants, 4 census states and 3 missingness
 *  configurations — `3 × 4 × 3 = 36` cells. */
const IM2_DECISIONS: ReadonlyArray<{ id: string; make: () => unknown; displays: boolean; callable: boolean }> = [
  { id: '(v1) `revealed = () => true`', make: () => (): boolean => true, displays: true, callable: true },
  { id: '(v2) `revealed = () => false`', make: () => (): boolean => false, displays: false, callable: true },
  { id: '(v3) `revealed` ABSENT', make: () => undefined, displays: false, callable: false },
]
const IM2_CENSUSTS: ReadonlyArray<{ id: string; make: () => unknown }> = [
  { id: '(c1) `{a: 0}` (empty ⇒ the delegate’s empty limb)', make: () => ({ a: 0 }) },
  { id: '(c2) `{a: 2}` (non-empty ⇒ `String(size)+unit`)', make: () => ({ a: 2 }) },
  { id: '(c3) `{}` (absent key ⇒ `false` ⇒ the non-empty limb)', make: () => ({}) },
  { id: "(c4) `new Map([['a', 0]])` (a supported non-record)", make: () => new Map([['a', 0]]) },
]
const IM2_MISSINGNESS: ReadonlyArray<{
  id: string
  sizes: () => unknown
  specOf: () => unknown
  /** What the row’s own independent `trackFor` composition must use for this
   *  cell’s spec — the same value the lookup yields, or `undefined` when the
   *  configuration is “both missing”. */
  specFor: (zone: string) => unknown
  /** The same for the size. */
  sizeFor: (zone: string) => unknown
}> = [
  {
    id: '(m1) size and spec both present',
    sizes: () => ({ a: 40 }),
    specOf: () => ({ a: { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' } }),
    specFor: () => ({ trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' }),
    sizeFor: () => 40,
  },
  {
    id: '(m2) BOTH missing',
    sizes: () => undefined,
    specOf: () => undefined,
    specFor: () => undefined,
    sizeFor: () => undefined,
  },
  {
    id: '(m3) the SPEC malformed (`{a: 42}`) and the size present',
    sizes: () => ({ a: 40 }),
    specOf: () => ({ a: 42 }),
    specFor: () => 42,
    sizeFor: () => 40,
  },
]

/** `P-CN-IM-3`’s 3 caller objects × 2 access patterns × 2 twin forms (+ repeat). */
type CallerObject = {
  id: string
  make: () => { zones: unknown; census: unknown; sizes: unknown; specOf: unknown }
}
const IM3_CALLER_OBJECTS: ReadonlyArray<CallerObject> = [
  {
    id: '(1) a zone enumeration (`[\'a\',\'b\']`) with a census record `{a: 0}`',
    make: () => ({ zones: ['a', 'b'], census: { a: 0 }, sizes: { a: 40 }, specOf: { a: SPEC_A } }),
  },
  {
    id: "(2) the same drive with a `Map` census `new Map([['a', 0]])`",
    make: () => ({ zones: ['a', 'b'], census: new Map([['a', 0]]), sizes: { a: 40 }, specOf: { a: SPEC_A } }),
  },
  {
    id: '(3) a frozen `specOf` record and a `sizes` record with an own accessor',
    make: () => {
      const specOf = Object.freeze({ a: SPEC_A })
      const sizes: Record<string, unknown> = {}
      Object.defineProperty(sizes, 'a', { get: () => 40, enumerable: true, configurable: true })
      return { zones: ['a', 'b'], census: { a: 0 }, sizes, specOf }
    },
  },
]
const IM3_ACCESS_PATTERNS: ReadonlyArray<{ id: string; make: () => unknown }> = [
  { id: '(a) `revealed = () => true` (the full delegate path)', make: () => (): boolean => true },
  { id: '(b) `revealed` absent (the zero-key path)', make: () => undefined },
]
const IM3_TWIN_FORMS: ReadonlyArray<{ id: string; freeze: (o: Record<string, unknown>) => Record<string, unknown> }> = [
  { id: 'unfrozen', freeze: (o) => o },
  {
    id: 'frozen before the call where freezable',
    freeze: (o) => {
      for (const key of ['zones', 'census', 'sizes', 'specOf']) {
        const value = o[key]
        if (value !== null && typeof value === 'object' && !(value instanceof Map)) {
          try {
            Object.freeze(value)
          } catch {
            /* a non-configurable shape is skipped; the snapshot still compares */
          }
        }
      }
      return o
    },
  },
]

/** `P-CN-IM-4`’s fixed drive table: 8 argument-shape + 3 call-count + 3
 *  argument-fidelity drives = 14. */
const IM4_ARGUMENT_DRIVES: ReadonlyArray<{ id: string; run: (fn: NonNullable<Surface['computeTrackVars']>) => string | null }> = [
  {
    id: '(1) an empty census with a present size and spec (the empty limb)',
    run: (fn) => {
      const record = fn(['a'], { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
      return recordOf(record).a === SPEC_A.emptyToken ? null : `expected the caller's emptyToken, got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: "(2) a non-empty census with a `unit: ''` spec (the bare-number form)",
    run: (fn) => {
      const spec: TrackSpec = { trackProp: '--t', unit: '', emptyToken: 'E' }
      const record = fn(['a'], { a: 3 }, { a: 40 }, () => true, { a: spec })
      return recordOf(record).a === '40' ? null : `expected '40', got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: '(3) a caller sentinel as the emptyToken (the value must BE that sentinel)',
    run: (fn) => {
      const record = fn(['a'], { a: 0 }, { a: 40 }, () => true, { a: SPEC_A })
      return Object.is(recordOf(record).a, SPEC_A.emptyToken) ? null : `expected the sentinel, got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: '(4) a spec whose `unit` is a full declaration string (byte-for-byte)',
    run: (fn) => {
      const spec: TrackSpec = { trackProp: '--t', unit: 'px solid red', emptyToken: 'E' }
      const record = fn(['a'], { a: 3 }, { a: 40 }, () => true, { a: spec })
      const expected = '40px solid red'
      return recordOf(record).a === expected ? null : `expected ${brief(expected)}, got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: '(5) a size of `-0` (the delegate’s `\'0\'+unit` limb, reached through this unit)',
    run: (fn) => {
      const record = fn(['a'], { a: 3 }, { a: -0 }, () => true, { a: SPEC_A })
      return recordOf(record).a === '0px' ? null : `expected '0px', got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: "(6) a `Map` census with a `0` value",
    run: (fn) => {
      const record = fn(['a'], new Map([['a', 0]]), { a: 40 }, () => true, { a: SPEC_A })
      return recordOf(record).a === SPEC_A.emptyToken ? null : `expected the caller's emptyToken, got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: "(7) an ABSENT spec entry (the `''` limb reached with `undefined`)",
    run: (fn) => {
      const record = fn(['a'], { a: 3 }, { a: 40 }, () => true, {})
      return recordOf(record).a === '' ? null : `expected '', got ${brief(recordOf(record).a)}`
    },
  },
  {
    id: "(8) an ABSENT size entry (the empty-token limb reached with `undefined`)",
    run: (fn) => {
      const record = fn(['a'], { a: 3 }, {}, () => true, { a: SPEC_A })
      return recordOf(record).a === SPEC_A.emptyToken ? null : `expected the caller's emptyToken, got ${brief(recordOf(record).a)}`
    },
  },
]
const IM4_COUNT_DRIVES: ReadonlyArray<{ id: string; run: (fn: NonNullable<Surface['computeTrackVars']>) => string | null }> = [
  {
    id: '(9) three zones revealed with full data ⇒ `isEmpty` 3, `trackFor` 3',
    run: (fn) => {
      resetDelegateLog()
      fn(['1', '2', '3'], { 1: 3, 2: 3, 3: 3 }, { 1: 1, 2: 1, 3: 1 }, () => true, { 1: SPEC_A, 2: SPEC_A, 3: SPEC_A })
      return DELEGATE_LOG.isEmpty.length === 3 && DELEGATE_LOG.trackFor.length === 3
        ? null
        : `expected 3/3 delegate calls, observed ${DELEGATE_LOG.isEmpty.length}/${DELEGATE_LOG.trackFor.length}`
    },
  },
  {
    id: '(10) three zones where one predicate throws ⇒ the throwing zone costs 0 and the others 1 each',
    run: (fn) => {
      resetDelegateLog()
      const record = fn(['1', '2', '3'], { 1: 3, 2: 3, 3: 3 }, { 1: 1, 2: 1, 3: 1 }, (id: unknown) => {
        if (id === '2') throw new Error('the predicate threw for zone 2')
        return true
      }, { 1: SPEC_A, 2: SPEC_A, 3: SPEC_A })
      const keys = Object.keys(record)
      if (DELEGATE_LOG.isEmpty.length !== 2) return `expected 2 isEmpty calls (the throwing zone costs 0), observed ${DELEGATE_LOG.isEmpty.length}`
      if (keys.length !== 3) return `the whole key set must still be present (the throw is caught), got ${JSON.stringify(keys)}`
      return null
    },
  },
  {
    id: '(11) three zones with `revealed` absent ⇒ both delegate functions called 0 times',
    run: (fn) => {
      resetDelegateLog()
      fn(['1', '2', '3'], { 1: 3 }, { 1: 1 }, undefined, { 1: SPEC_A })
      return DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length === 0
        ? null
        : `expected 0 delegate calls, observed ${DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length}`
    },
  },
]
const IM4_FIDELITY_DRIVES: ReadonlyArray<{ id: string; run: (fn: NonNullable<Surface['computeTrackVars']>) => string | null }> = [
  {
    id: '(12) a zone id passed as a NUMBER member (the delegate receives the number, not its string image)',
    run: (fn) => {
      resetDelegateLog()
      fn([42], { 42: 0 }, { 42: 40 }, () => true, { 42: SPEC_A })
      const received = DELEGATE_LOG.isEmpty[0]?.[1]
      return Object.is(received, 42) ? null : `the delegate received ${brief(received)} instead of the number 42`
    },
  },
  {
    id: '(13) a `sizes` spy asserting its second argument is the caller’s census BY IDENTITY',
    run: (fn) => {
      const census = { a: 3 }
      const seen: unknown[] = []
      const sizes = (id: unknown, c: unknown): unknown => {
        seen.push(c)
        return 40
      }
      fn(['a'], census, sizes, () => true, { a: SPEC_A })
      return seen.length === 1 && seen[0] === census ? null : `the sizes spy saw ${seen.length} call(s) and the census ${brief(seen[0])}`
    },
  },
  {
    id: '(14) `specOf`/`sizes` driven as RECORDS and as CALLABLES over the same data ⇒ the same record',
    run: (fn) => {
      const asRecords = fn(['a', 'b'], { a: 0, b: 3 }, { a: 40, b: 40 }, () => true, { a: SPEC_A, b: SPEC_A })
      const asCallables = fn(['a', 'b'], { a: 0, b: 3 }, () => 40, () => true, () => SPEC_A)
      return JSON.stringify(asRecords) === JSON.stringify(asCallables)
        ? null
        : `the two lookup forms disagree: ${JSON.stringify(asRecords)} vs ${JSON.stringify(asCallables)}`
    },
  },
]

/** `P-CN-SM-1`’s 10 hostile shape classes; pass (a) is applied per class. */
const SM1_SHAPES: ReadonlyArray<{ id: string; make: () => { zones: unknown; census: unknown; sizes: unknown; revealed: unknown; specOf: unknown } }> = [
  {
    id: '(1) a `zones` whose own `Symbol.iterator` THROWS on the first `next()`',
    make: () => ({ zones: throwingIteratorObject(), census: { a: 0 }, sizes: { a: 40 }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(2) a `zones` whose own `Symbol.iterator` is present but NOT callable',
    make: () => ({ zones: nonCallableIteratorObject(), census: { a: 0 }, sizes: { a: 40 }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(3) a `zones` array holding a `Symbol` member beside strings',
    make: () => ({ zones: ['a', Symbol('s')], census: { a: 0 }, sizes: { a: 40 }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(4) a REVOKED `Proxy` as `census`',
    make: () => ({ zones: ['a'], census: revokedProxy(), sizes: { a: 40 }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(5) a `census` whose own accessor throws',
    make: () => ({ zones: ['a'], census: throwingAccessorRecord('a'), sizes: { a: 40 }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(6) `sizes` a callable that THROWS',
    make: () => ({ zones: ['a'], census: { a: 0 }, sizes: () => { throw new Error('sizes threw') }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(7) `specOf` a callable that THROWS',
    make: () => ({ zones: ['a'], census: { a: 0 }, sizes: { a: 40 }, revealed: () => true, specOf: () => { throw new Error('specOf threw') } }),
  },
  {
    id: '(8) `revealed` a callable that THROWS',
    make: () => ({ zones: ['a'], census: { a: 0 }, sizes: { a: 40 }, revealed: () => { throw new Error('revealed threw') }, specOf: { a: SPEC_A } }),
  },
  {
    id: '(9) a size of `0n` (a `BigInt` reaching the delegate)',
    make: () => ({ zones: ['a'], census: { a: 3 }, sizes: { a: 0n }, revealed: () => true, specOf: { a: SPEC_A } }),
  },
  {
    id: '(10) a `specOf` record whose own accessor for the zone THROWS',
    make: () => ({ zones: ['a'], census: { a: 3 }, sizes: { a: 40 }, revealed: () => true, specOf: throwingAccessorRecord('a') }),
  },
]
const SM1_PASSES: ReadonlyArray<{ id: string; label: string }> = [
  { id: '(a)', label: 'every other parameter well-formed' },
  { id: '(b)', label: '`revealed` absent' },
  { id: '(c)', label: 'every other parameter ALSO a hostile shape (the composition pass)' },
]

/** `P-CN-SM-2`’s 10 zone-enumeration shapes, each with ITS OWN expected key
 *  list (so no member can contradict the row’s boundary by category). */
type EnumShape = { id: string; make: () => unknown; expectedKeys: string[]; censusKeys: string[]; sizesKeys: string[]; note: string }
function recordWithKeys(keys: readonly string[], value: unknown): Record<string, unknown> {
  const record: Record<string, unknown> = Object.create(null)
  for (const key of keys) record[key] = value
  return record
}
const SM2_SHAPES: ReadonlyArray<EnumShape> = [
  {
    id: "(1) `new Map([['a', 1], ['b', 2], ['a', 3]])` (keys, one per unique key)",
    make: () => new Map<string, number>([['a', 1], ['b', 2], ['a', 3]]),
    expectedKeys: ['a', 'b'],
    censusKeys: ['a', 'b'],
    sizesKeys: ['a', 'b'],
    note: 'the `Map` contributes its KEYS and never its values; the duplicate key collapses at its first-seen position',
  },
  {
    id: "(2) `new Set(['a', 'b'])`",
    make: () => new Set(['a', 'b']),
    expectedKeys: ['a', 'b'],
    censusKeys: ['a', 'b'],
    sizesKeys: ['a', 'b'],
    note: 'a `Set` contributes its members',
  },
  {
    id: "(3) `['a', 1, 1]` — the number beside its own string image",
    make: () => ['a', 1, 1],
    expectedKeys: ['a', '1'],
    censusKeys: ['a', '1'],
    sizesKeys: ['a', '1'],
    note: 'the number `1` beside the string `\'1\'` is the DUPLICATE case: one key',
  },
  {
    id: "(4) an array holding `Symbol('s')` beside `'a'` — the DROP",
    make: () => ['a', Symbol('s')],
    expectedKeys: ['a'],
    censusKeys: ['a'],
    sizesKeys: ['a'],
    note: 'a `Symbol` member cannot be an own key and is DROPPED, never stringified',
  },
  {
    id: '(5) a null-prototype record carrying `{a: 0, b: 1}`',
    make: () => { const r: Record<string, unknown> = Object.create(null); r.a = 0; r.b = 1; return r },
    expectedKeys: ['a', 'b'],
    censusKeys: ['a', 'b'],
    sizesKeys: ['a', 'b'],
    note: 'a record contributes its own enumerable STRING keys',
  },
  {
    id: '(6) a plain record `{a: 0}` whose PROTOTYPE also carries `b`',
    make: () => {
      const proto = { b: 1 }
      const record = Object.create(proto) as Record<string, unknown>
      record.a = 0
      return record
    },
    expectedKeys: ['a'],
    censusKeys: ['a'],
    sizesKeys: ['a'],
    note: 'never a prototype member: only OWN enumerable string keys are read',
  },
  {
    id: "(7) a record carrying an own `Symbol` KEY beside `'a'`",
    make: () => {
      const record: Record<string | symbol, unknown> = { a: 0 }
      record[Symbol('k')] = 1
      return record
    },
    expectedKeys: ['a'],
    censusKeys: ['a'],
    sizesKeys: ['a'],
    note: 'a `Symbol` KEY is never read',
  },
  {
    id: "(8) a plain object with an own CALLABLE `Symbol.iterator` yielding `'a'`,`'b'` (the shape-(a) branch wins)",
    make: () => ({
      *[Symbol.iterator](): Generator<string> {
        yield 'a'
        yield 'b'
      },
      c: 'not-a-member',
    }),
    expectedKeys: ['a', 'b'],
    censusKeys: ['a', 'b'],
    sizesKeys: ['a', 'b'],
    note: 'shape (a) wins over shape (b): the iteration values are the members',
  },
  {
    id: '(9) a plain object with an own NON-callable `Symbol.iterator` value 42 and own keys `a`,`b`',
    make: () => nonCallableIteratorObject(),
    expectedKeys: ['a', 'b'],
    censusKeys: ['a', 'b'],
    sizesKeys: ['a', 'b'],
    note: 'a `Symbol.iterator` present but not callable falls to the record branch',
  },
  {
    id: "(10) `'ab'` (a string primitive — shape (c))",
    make: () => 'ab',
    expectedKeys: [],
    censusKeys: [],
    sizesKeys: [],
    note: 'a primitive is shape (c): ZERO zones',
  },
]

/** `P-CN-SM-3`’s 10 empty-input shapes. */
const SM3_SHAPES: ReadonlyArray<{ id: string; make: () => unknown; expectedKeys: string[] }> = [
  { id: '(1) `[]`', make: () => [], expectedKeys: [] },
  { id: '(2) `new Map()`', make: () => new Map(), expectedKeys: [] },
  { id: '(3) `new Set()`', make: () => new Set(), expectedKeys: [] },
  { id: '(4) `{}`', make: () => ({}), expectedKeys: [] },
  { id: '(5) `Object.create(null)`', make: () => Object.create(null), expectedKeys: [] },
  { id: '(6) `null`', make: () => null, expectedKeys: [] },
  { id: '(7) `undefined`', make: () => undefined, expectedKeys: [] },
  { id: '(8) a number', make: () => 7, expectedKeys: [] },
  { id: '(9) a function with no `Symbol.iterator`', make: () => (): number => 1, expectedKeys: [] },
  {
    id: '(10) a record whose own `Symbol.iterator` yields nothing',
    make: () => ({
      *[Symbol.iterator](): Generator<never> {
        return
      },
    }),
    expectedKeys: [],
  },
]
const SM3_PASSES: ReadonlyArray<{ id: string; make: () => unknown }> = [
  { id: '(a) `revealed = () => true`', make: () => (): boolean => true },
  { id: '(b) `revealed = () => false`', make: () => (): boolean => false },
  { id: '(c) `revealed` absent', make: () => undefined },
]

/** `P-CN-TP-1`’s 30-member pool — **every member is an OBJECT or a FUNCTION**
 *  (the row’s declared boundary, checked member-for-member at filing and by
 *  `PRE-4`), so no draw can contradict it. The primitive and `null`/`undefined`
 *  classes are deliberately ABSENT here and are driven by `P-CN-SM-2` shape (10)
 *  and `P-CN-SM-3` shapes (6)–(9). */
const TP1_POOL: ReadonlyArray<{ id: string; make: () => unknown; dropsSymbol?: boolean }> = [
  { id: "(1) `'a'`", make: () => 'a' },
  { id: "(2) `''` (the empty string is a legal id)", make: () => '' },
  { id: "(3) `'__proto__'`", make: () => '__proto__' },
  { id: "(4) `'constructor'`", make: () => 'constructor' },
  { id: "(5) `'toString'`", make: () => 'toString' },
  { id: "(6) `'hasOwnProperty'`", make: () => 'hasOwnProperty' },
  { id: "(7) `'valueOf'`", make: () => 'valueOf' },
  { id: "(8) `'0'`", make: () => '0' },
  { id: "(9) `'1'`", make: () => '1' },
  { id: '(10) the number `0`', make: () => 0 },
  { id: '(11) the number `1`', make: () => 1 },
  { id: '(12) `-0`', make: () => -0 },
  { id: '(13) `NaN`', make: () => Number.NaN },
  { id: '(14) `Infinity`', make: () => Number.POSITIVE_INFINITY },
  { id: '(15) `-1`', make: () => -1 },
  { id: '(16) `Number.MAX_SAFE_INTEGER`', make: () => Number.MAX_SAFE_INTEGER },
  { id: '(17) `true`', make: () => true },
  { id: '(18) `false`', make: () => false },
  { id: '(19) `null`', make: () => null },
  { id: '(20) `undefined`', make: () => undefined },
  { id: '(21) `{}`', make: () => ({}) },
  { id: '(22) `[]`', make: () => [] },
  { id: '(23) a function', make: () => (): number => 1 },
  { id: "(24) `Symbol('s')`", make: () => Symbol('s'), dropsSymbol: true },
  { id: '(25) `new Map()`', make: () => new Map() },
  { id: '(26) `new Set()`', make: () => new Set() },
  { id: '(27) an object shaped like a date', make: () => ({ toISOString: () => '1970-01-01T00:00:00.000Z' }) },
  { id: '(28) a frozen `{}`', make: () => Object.freeze({}) },
  { id: '(29) a long string of 300 characters', make: () => 'x'.repeat(300) },
  {
    id: '(30) an object with an own `Symbol.toPrimitive` that THROWS',
    make: () => ({
      [Symbol.toPrimitive](): never {
        throw new Error('the primitive coercion threw')
      },
    }),
  },
]
/** The pool members that `§2.3` item 1 (c) declares as ZERO zones when passed
 *  DIRECTLY as `zones` (`P-CN-TP-1`’s DRIVE SCOPE clause) — a primitive member
 *  whose declared outcome is the EMPTY record, asserted here for that member
 *  only. */
const TP1_ZERO_ZONE_MEMBERS: readonly string[] = [
  '(12) `-0`',
  '(13) `NaN`',
  '(14) `Infinity`',
  '(15) `-1`',
  '(16) `Number.MAX_SAFE_INTEGER`',
  '(21) `{}`',
  '(10) the number `0`',
  '(11) the number `1`',
]
/** The pool members that are STRING primitives: the row’s DRIVE SCOPE wraps a
 *  member that is itself a sequence and passes a NON-sequence member DIRECTLY, so
 *  a string primitive is `§2.3` item 1 (c)’s ZERO-ZONE class exactly as the number
 *  and boolean members are — declared per member, never by category. */
const TP1_PRIMITIVE_STRING_MEMBERS: readonly string[] = [
  "(1) `'a'`",
  "(2) `''` (the empty string is a legal id)",
  "(3) `'__proto__'`",
  "(4) `'constructor'`",
  "(5) `'toString'`",
  "(6) `'hasOwnProperty'`",
  "(7) `'valueOf'`",
  "(8) `'0'`",
  "(9) `'1'`",
  '(17) `true`',
  '(18) `false`',
  '(19) `null`',
  '(20) `undefined`',
  '(29) a long string of 300 characters',
]
/** The pool members whose own type is a SEQUENCE (`[]`, `new Map()`, `new Set()`):
 *  the drive wraps those in a one-element array so the member is the sole member
 *  of `zones` rather than being itself the enumeration. */
const TP1_SEQUENCE_MEMBERS: readonly string[] = ['(22) `[]`', '(25) `new Map()`', '(26) `new Set()`']
/** `'ab'`-like primitives (`0`/`1`/`''`/a string) are driven DIRECTLY (shape (c) ⇒
 *  zero zones), while the object members are driven wrapped in a one-element
 *  array; the note is per member, so no draw is ambiguous. */
function tp1DriveShape(member: { id: string; make: () => unknown }): 'direct' | 'wrap' {
  const value = member.make()
  if (value === null || value === undefined) return 'direct'
  return typeof value === 'object' || typeof value === 'function' ? 'wrap' : 'direct'
}
/** `P-CN-TP-1`’s 36 pinned-seed draws: ONE LCG step per draw, index =
 *  `stateₙ₊₁ mod pool.length`. */
const TP1_DRAW_INDICES: number[] = (() => {
  const lcg = makeLcg(SEED)
  const indices: number[] = []
  for (let draw = 0; draw < 36; draw += 1) indices.push(lcg.step() % TP1_POOL.length)
  return indices
})()

// ===========================================================================
// §5.5.1 — THE REGISTER ROWS, in register order.
// ===========================================================================
describe('§5.5.1 — the typed property register (8 rows, executed deterministically, no PBT harness)', () => {
  it('P-CN-IM-1 [S-CN-KEYSET-1] — EVERY (reveal-predicate variant × census shape) pair: the record’s key set is EXACTLY the enumerated zone set (68 attempts) — YES (bounded)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-IM-1', 'S-CN-KEYSET-1')
    const zones = ['a', 'b', 'c']
    const sizes = { a: 40 }
    const specOf: Record<string, unknown> = { a: { trackProp: '--t', unit: 'px', emptyToken: 'SENTINEL-E' } }
    const seen = new Map<string, string[]>()
    for (const variant of IM1_PREDICATE_VARIANTS) {
      for (const censusShape of IM1_CENSUS_SHAPES) {
        const label = `${variant.id} × ${censusShape.id}`
        rec.run(label, () => {
          if (fn === null) return reason
          const census = censusShape.make()
          const record = fn(zones, census, sizes, variant.make(), specOf)
          const keys = keysOf(record)
          const expected = im1ExpectedKeys(variant)
          if (keys.length !== expected.length || !sameSet(keys, expected)) {
            return `the key set must be EXACTLY the enumerated zone set of the drive (${JSON.stringify(
              expected,
            )}); got ${JSON.stringify(keys)}`
          }
          if (keys.length > 0 && JSON.stringify(keys) !== JSON.stringify(expected)) {
            return `the keys must be in FIRST-SEEN enumeration order ${JSON.stringify(expected)}; got ${JSON.stringify(keys)}`
          }
          for (const declined of im1DeclinedZones(variant)) {
            if (!keys.includes(declined)) {
              return `the declined zone ${brief(declined)} was OMITTED from the key set — §0A note 12 (c): a module that omits it FAILS THIS ROW`
            }
            const value = recordOf(record)[declined]
            if (value !== '') {
              return `the declined zone ${brief(declined)} carries ${brief(
                value,
              )} instead of exactly '' — §0A note 12 (b)/(d)`
            }
          }
          for (const displayed of keys) {
            const expectedValue = delegate.trackFor(specOf[displayed], (sizes as Record<string, unknown>)[displayed], delegate.isEmpty(censusOf(census), displayed))
            if (!Object.is(recordOf(record)[displayed], expectedValue)) {
              return `the value for the displayed zone ${brief(displayed)} must be the delegate’s own bytes ${brief(
                expectedValue,
              )}; got ${brief(recordOf(record)[displayed])}`
            }
          }
          if (Object.getPrototypeOf(record) !== null) return 'the record must be NULL-PROTOTYPE (§0A note 7)'
          seen.set(label, keys)
          return null
        })
      }
    }
    // `finish()` FIRST, so a broken row reports its own record line and its first
    // break causes.
    rec.finish()
    // THE CONVERSE HALF, asserted in the same row: the three callable-predicate
    // variants leave every key present with the declined zone carrying `''`.
    const callableCells = [...seen.entries()].filter(([label]) => /\((?:10|15|17)\)/.test(label))
    expect(
      callableCells.length,
      'P-CN-IM-1/§0A note 11 — the three CALLABLE-predicate variants were driven over all four census shapes (12 cells), so the rule that the predicate decides the VALUE and never the PRESENCE is asserted over the whole table',
    ).toBe(12)
    expect(
      callableCells.filter(([, keys]) => !sameSet(keys, ['a', 'b', 'c'])).map(([label]) => label),
      'P-CN-IM-1/§0A note 11 — for EVERY callable-predicate cell the key set is all three zones: the predicate decides the VALUE, never the PRESENCE',
    ).toEqual([])
  })

  it('P-CN-IM-2 [S-CN-REVEAL-1] — EVERY (decision × census state × missingness) cell: presence is the CALLER’S decision (36 attempts) — YES (bounded)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-IM-2', 'S-CN-REVEAL-1')
    for (const decision of IM2_DECISIONS) {
      for (const censusState of IM2_CENSUSTS) {
        for (const missing of IM2_MISSINGNESS) {
          const label = `${decision.id} × ${censusState.id} × ${missing.id}`
          rec.run(label, () => {
            if (fn === null) return reason
            resetDelegateLog()
            const census = censusState.make()
            const record = fn(['a'], census, missing.sizes(), decision.make(), missing.specOf())
            const keys = keysOf(record)
            // THE RULED EXPECTATION (§0A ruling note 11): the `v1` column yields the
            // key; the `v2` column (a CALLABLE predicate returning falsy) ALSO
            // yields the key — with the value `''`; the `v3` column (ABSENT) yields
            // the empty record. The spec's own prose at §5.5.1's dated confirmation
            // states exactly this ("the key is present with `''`, never omitted"),
            // and §6 forbids folding `v2` and `v3` together. The strategy cell's
            // `[]` for `v2` is the one stale clause; it is reported beside this row
            // rather than followed.
            const expectedKeys = decision.callable ? ['a'] : []
            if (keys.length !== expectedKeys.length || !sameSet(keys, expectedKeys)) {
              return `expected the key set ${JSON.stringify(expectedKeys)}; got ${JSON.stringify(keys)}`
            }
            if (decision.displays) {
              const direct = delegate.trackFor(missing.specFor('a'), missing.sizeFor('a'), delegate.isEmpty(census, 'a'))
              if (!Object.is(recordOf(record).a, direct)) {
                return `the emitted value must be byte-identical to a direct trackFor(spec, size, isEmpty(census, 'a')) composition ${brief(
                  direct,
                )}; got ${brief(recordOf(record).a)}`
              }
            } else if (decision.callable) {
              if (recordOf(record).a !== '') {
                return `a callable predicate that declines leaves the key with exactly ''; got ${brief(recordOf(record).a)}`
              }
            }
            const expectedEmptyCalls = decision.displays ? 1 : 0
            if (DELEGATE_LOG.isEmpty.length !== expectedEmptyCalls) {
              return `expected isEmpty called exactly ${expectedEmptyCalls} time(s); observed ${DELEGATE_LOG.isEmpty.length}`
            }
            if (DELEGATE_LOG.trackFor.length !== expectedEmptyCalls) {
              return `expected trackFor called exactly ${expectedEmptyCalls} time(s); observed ${DELEGATE_LOG.trackFor.length}`
            }
            return null
          })
        }
      }
    }
    rec.finish()
  })

  it('P-CN-IM-3 [S-CN-PURITY-1] — EVERY caller object × access pattern × twin form, plus the repeat: nothing is mutated and nothing is retained (24 attempts) — YES (bounded)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-IM-3', 'S-CN-PURITY-1')
    const drive = (label: string, repeat: boolean): string | null => {
      if (fn === null) return reason
      const cell = IM3_CALLER_OBJECTS.find((c) => label.startsWith(c.id))
      if (cell === undefined) return `the drive label ${brief(label)} names no caller object`
      const pattern = IM3_ACCESS_PATTERNS.find((p) => label.includes(p.id))
      const twin = IM3_TWIN_FORMS.find((t) => label.includes(t.id))
      if (pattern === undefined || twin === undefined) return `the drive label ${brief(label)} names no pattern/twin`
      const made = cell.make()
      const args = twin.freeze({ ...made }) as { zones: unknown; census: unknown; sizes: unknown; specOf: unknown }
      const before = {
        zones: observableSnapshot(args.zones),
        census: observableSnapshot(args.census),
        sizes: observableSnapshot(args.sizes),
        specOf: observableSnapshot(args.specOf),
      }
      const first = fn(args.zones, args.census, args.sizes, pattern.make(), args.specOf)
      const after = {
        zones: observableSnapshot(args.zones),
        census: observableSnapshot(args.census),
        sizes: observableSnapshot(args.sizes),
        specOf: observableSnapshot(args.specOf),
      }
      for (const key of ['zones', 'census', 'sizes', 'specOf'] as const) {
        if (before[key] !== after[key]) {
          return `the caller's ${key} is NOT observably unchanged: before ${before[key]} / after ${after[key]}`
        }
      }
      const second = fn(args.zones, args.census, args.sizes, pattern.make(), args.specOf)
      if (JSON.stringify(second) !== JSON.stringify(first)) {
        return `the second call returned ${JSON.stringify(second)}, not ${JSON.stringify(first)} (no cache, no counter, no module-level state)`
      }
      if (repeat) {
        const third = fn(args.zones, args.census, args.sizes, pattern.make(), args.specOf)
        if (JSON.stringify(third) !== JSON.stringify(first)) return 'the REPEAT drive after the second call disagrees'
      }
      return null
    }
    for (const cell of IM3_CALLER_OBJECTS) {
      for (const pattern of IM3_ACCESS_PATTERNS) {
        for (const twin of IM3_TWIN_FORMS) {
          rec.run(`${cell.id} × ${pattern.id} × ${twin.id}`, () => drive(`${cell.id} × ${pattern.id} × ${twin.id}`, false))
        }
      }
    }
    for (const cell of IM3_CALLER_OBJECTS) {
      for (const pattern of IM3_ACCESS_PATTERNS) {
        for (const twin of IM3_TWIN_FORMS) {
          rec.run(`${cell.id} × ${pattern.id} × ${twin.id} [repeat drive]`, () => drive(`${cell.id} × ${pattern.id} × ${twin.id}`, true))
        }
      }
    }
    reconcile(rec, 24, 'P-CN-IM-3 — the declared term is `24` = 3 caller objects × 2 access patterns × 2 twin forms + 12 repeat drives')
    rec.finish()
  })

  it('P-CN-IM-4 [S-CN-DELEGATE-1] — EVERY fixed drive: every token byte from `trackFor`, every emptiness decision from `isEmpty` (14 attempts) — YES (bounded)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-IM-4', 'S-CN-DELEGATE-1')
    for (const drive of IM4_ARGUMENT_DRIVES) rec.run(drive.id, () => (fn === null ? 'the module of §2.1/§5.1 row 1 does not exist yet' : drive.run(fn)))
    for (const drive of IM4_COUNT_DRIVES) rec.run(drive.id, () => (fn === null ? 'the module of §2.1/§5.1 row 1 does not exist yet' : drive.run(fn)))
    for (const drive of IM4_FIDELITY_DRIVES) rec.run(drive.id, () => (fn === null ? 'the module of §2.1/§5.1 row 1 does not exist yet' : drive.run(fn)))
    reconcile(rec, 14, 'P-CN-IM-4 — the declared term is `14` = 8 argument-shape + 3 call-count + 3 argument-fidelity drives')
    rec.finish()
  })

  it('P-CN-SM-1 [S-CN-TOTAL-1] — EVERY hostile shape × driving pass: a record, no throw, and a repeat call that agrees (30 attempts)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-SM-1', 'S-CN-TOTAL-1')
    for (const shape of SM1_SHAPES) {
      for (const pass of SM1_PASSES) {
        const label = `${shape.id} × pass ${pass.id} (${pass.label})`
        rec.run(label, () => {
          if (fn === null) return reason
          const made = shape.make()
          const revealed = pass.id === '(a)' ? made.revealed : undefined
          const census = pass.id === '(c)' ? hostileProxy() : made.census
          const sizes = pass.id === '(c)' ? () => { throw new Error('sizes threw in the composition pass') } : made.sizes
          const specOf = pass.id === '(c)' ? () => { throw new Error('specOf threw in the composition pass') } : made.specOf
          let first: unknown
          try {
            first = fn(made.zones, census, sizes, revealed, specOf)
          } catch (e) {
            return `computeTrackVars THREW: ${describeThrown(e)} — §0A note 8: every outcome is a VALUE and totality is unconditional`
          }
          if (typeof first !== 'object' || first === null || Array.isArray(first)) {
            return `the returned value must be a non-null, non-array object; got ${brief(first)}`
          }
          if (Object.getPrototypeOf(first) !== null) return 'the returned record must be NULL-PROTOTYPE'
          let second: unknown
          try {
            second = fn(made.zones, census, sizes, revealed, specOf)
          } catch (e) {
            return `the SECOND immediate call THREW: ${describeThrown(e)}`
          }
          if (JSON.stringify(second) !== JSON.stringify(first)) {
            return `the second call returned ${JSON.stringify(second)}, not ${JSON.stringify(first)}`
          }
          return null
        })
      }
    }
    reconcile(rec, 30, 'P-CN-SM-1 — the declared term is `30` = 10 shape classes × 3 driving passes')
    rec.finish()
  })

  it('P-CN-SM-2 [S-CN-SHAPE-1] — EVERY zone-enumeration shape: the declared own keys IN FIRST-SEEN ORDER with the declared values (10 attempts)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-SM-2', 'S-CN-SHAPE-1')
    for (const shape of SM2_SHAPES) {
      rec.run(shape.id, () => {
        if (fn === null) return reason
        const census = recordWithKeys(shape.censusKeys, 0)
        const sizes = recordWithKeys(shape.sizesKeys, 40)
        const specOf = recordWithKeys(shape.sizesKeys, SPEC_A)
        const record = fn(shape.make(), census, sizes, () => true, specOf)
        const keys = keysOf(record)
        if (JSON.stringify(keys) !== JSON.stringify(shape.expectedKeys)) {
          return `expected Object.keys to DEEP-EQUAL ${JSON.stringify(shape.expectedKeys)} in order (so both membership and ORDER are falsified); got ${JSON.stringify(
            keys,
          )} — ${shape.note}`
        }
        for (const key of keys) {
          const expected = delegate.trackFor(specOf[key], sizes[key], delegate.isEmpty(census, key))
          if (!Object.is(recordOf(record)[key], expected)) {
            return `the value for ${brief(key)} must be the row’s independently composed expectation ${brief(expected)}; got ${brief(
              recordOf(record)[key],
            )}`
          }
        }
        if (Object.getPrototypeOf(record) !== null) return 'the record must be NULL-PROTOTYPE'
        if (shape.expectedKeys.length === 0 && keys.length === 0 && record === undefined) return 'the empty record is never `undefined`'
        return null
      })
    }
    reconcile(rec, 10, 'P-CN-SM-2 — the declared term is `10` = one drive per enumeration shape')
    rec.finish()
  })

  it('P-CN-SM-3 [S-CN-EMPTY-1] — EVERY empty-input shape × pass: the SAME empty-record shape, zero delegate calls (30 attempts; 10 distinct drives)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-SM-3', 'S-CN-EMPTY-1')
    for (const shape of SM3_SHAPES) {
      for (const pass of SM3_PASSES) {
        rec.run(`${shape.id} × pass ${pass.id}`, () => {
          if (fn === null) return reason
          resetDelegateLog()
          const record = fn(shape.make(), { a: 0 }, { a: 40 }, pass.make(), { a: SPEC_A })
          const keys = keysOf(record)
          if (keys.length !== 0) return `expected the empty record ([]) for every empty/non-enumerable input; got ${JSON.stringify(keys)}`
          if (JSON.stringify(keys) !== JSON.stringify(shape.expectedKeys)) return 'the declared key list for this shape is the empty list'
          if (Object.getPrototypeOf(record) !== null) return 'the empty record must be NULL-PROTOTYPE'
          if (record === undefined) return 'the empty record is never `undefined`'
          if ('x' in (record as object)) return "the empty record must not carry an 'x' key (it is distinguishable from `undefined`)"
          if (DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length !== 0) {
            return `expected 0 delegate calls; observed ${DELEGATE_LOG.isEmpty.length + DELEGATE_LOG.trackFor.length}`
          }
          return null
        })
      }
    }
    reconcile(rec, 30, 'P-CN-SM-3 — the declared term is `30` = 10 shapes × 3 passes (the DISTINCT-DRIVE count is 10 — §5.3 item 11)')
    rec.finish()
    console.log(
      `§5.5.1 distinct-drive record :: ${JSON.stringify({
        row: 'P-CN-SM-3',
        declaredAttempts: 30,
        distinctDrives: SM3_SHAPES.length,
        shapeDrives: SM3_SHAPES.length,
        passesPerShape: SM3_PASSES.length,
      })}`,
    )
  })

  it('P-CN-TP-1 [S-CN-SEED-1] — the 36 pinned-seed draws over the 30-member pool: the member is TOTAL and its own value is carried VERBATIM (36 attempts) — YES (bounded)', async () => {
    const { fn, reason } = await registerSurface()
    const rec = new RegisterRow('P-CN-TP-1', 'S-CN-SEED-1')
    for (const [drawIndex, poolIndex] of TP1_DRAW_INDICES.entries()) {
      const member = TP1_POOL[poolIndex]
      rec.run(`draw ${drawIndex + 1} ⇒ pool member ${member.id}`, () => {
        if (fn === null) return reason
        const value = member.make()
        const mode = tp1DriveShape(member)
        const zones = mode === 'wrap' ? [value] : value
        const seenIds: unknown[] = []
        const seenCensus: unknown[] = []
        const census = { a: 0 }
        const sizes = (id: unknown, c: unknown): unknown => {
          seenIds.push(id)
          seenCensus.push(c)
          return 40
        }
        const specOf = (id: unknown): unknown => SPEC_A
        let record: unknown
        try {
          record = fn(zones, census, sizes, () => true, specOf)
        } catch (e) {
          return `computeTrackVars THREW on the drawn member: ${describeThrown(e)}`
        }
        if (Object.getPrototypeOf(record) !== null) return 'the record must be NULL-PROTOTYPE'
        const keys = keysOf(record)
        if (member.dropsSymbol === true) {
          if (keys.length !== 0) return `the Symbol member must be DROPPED (zero keys); got ${JSON.stringify(keys)}`
          return null
        }
        if (mode === 'direct') {
          // §2.3 item 1 (c): a member that is not itself a sequence and is passed
          // directly yields the EMPTY record — asserted for that member only, and
          // the row never claims a key its own input shape cannot enumerate.
          if (keys.length !== 0) {
            return `a member whose own type cannot be enumerated (${member.id}) must yield the EMPTY record; got ${JSON.stringify(keys)}`
          }
          return null
        }
        const image = String(value)
        if (keys.length !== 1 || keys[0] !== image) {
          return `the drawn member must become exactly ONE own key carrying its String() image ${brief(image)}; got ${JSON.stringify(keys)}`
        }
        if (seenIds.length !== 1) return `the sizes spy must see exactly one call; saw ${seenIds.length}`
        if (!Object.is(seenIds[0], value)) {
          return `the member must reach the lookup VERBATIM (identity), not ${brief(seenIds[0])}`
        }
        if (seenCensus[0] !== census) return 'the sizes spy’s second argument must be the caller’s census by identity'
        const expected = delegate.trackFor(SPEC_A, 40, delegate.isEmpty(census, value))
        if (!Object.is(recordOf(record)[image], expected)) {
          return `the value must equal the row’s independently composed expectation ${brief(expected)}; got ${brief(recordOf(record)[image])}`
        }
        if (keys.length !== keysOf(record).length) return 'the key count must match the own-key census'
        return null
      })
    }
    reconcile(rec, 36, 'P-CN-TP-1 — the declared term is `36` pinned-seed draws (one LCG step each, index = state mod 30)')
    rec.finish()
  })

  it('REGISTER-STATUS (harness, NOT a spec row) — the register’s own execution record: seed, attempts, held, broken, registerStoppedAt and the un-run rows', () => {
    const census = {
      declaredTotal: 248,
      terms: '68+36+24+14+30+10+30+36',
      seed: SEED,
      step: 'ONE LCG step per draw; index = state_{n+1} mod pool.length',
      attemptsRun: registerState.attempts,
      rowsRecorded: registerRecords.length,
      stoppedAtRow: registerState.stoppedAtRow,
      stoppedFor: registerState.stoppedFor,
      perRow: registerRecords.map((r) => ({
        row: r.row,
        strategy: r.strategy,
        attemptsRun: r.attemptsRun,
        held: r.held,
        broken: r.broken,
        stoppedEarly: r.stoppedEarly,
        notStarted: r.notStarted,
      })),
    }
    console.log(`§5.5.1 register status :: ${JSON.stringify(census)}`)
    expect(
      registerRecords.length,
      'REGISTER-STATUS — all EIGHT register rows reported their record (§5.5.1: 8 rows)',
    ).toBe(8)
    expect(
      registerKeySet(registerRecords.map((r) => ({ row: r.row, strategy: r.strategy }))),
      'REGISTER-STATUS/§5.5.1 — the executed rows and their strategy ids are EXACTLY the register’s declared eight (a SET comparison, sorted by row id — a rename, a dropped row or a wrong strategy id fails here)',
    ).toEqual(registerKeySet(REGISTER_DECLARED))
    expect(
      registerRecords.map((r) => r.seed),
      'REGISTER-STATUS/§5.5.1 — every executed row carries the ONE pinned seed 20260927 (the row record prints it, so the audit need not infer it)',
    ).toEqual(REGISTER_DECLARED.map(() => SEED))
    expect(
      REGISTER_DECLARED.reduce((sum, r) => sum + r.term, 0),
      'REGISTER-STATUS/§5.5.1 — the declared total is the SUM OF ITS OWN TERMS and reads 248',
    ).toBe(248)
    expect(
      registerState.attempts,
      'REGISTER-STATUS — the register never exceeds the <=400-attempts cap',
    ).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    for (const r of registerRecords) {
      expect(r.attemptsRun, `REGISTER-STATUS — row ${r.row} never exceeds the <=100-attempts-per-row cap`).toBeLessThanOrEqual(
        REGISTER_ROW_CAP,
      )
    }
    const notStarted = registerRecords.filter((r) => r.attemptsRun === 0)
    if (registerState.stoppedAtRow === null) {
      expect(
        registerState.attempts,
        'REGISTER-STATUS — an UNSTOPPED register run must total EXACTLY the declared 248 attempts (a red run that reports all 248 as executed is the finding, not the expectation — §4.2 item 2)',
      ).toBe(248)
      expect(notStarted, 'REGISTER-STATUS — no row is un-run in an unstoppered register').toEqual([])
    } else {
      expect(
        registerState.stoppedFor,
        'REGISTER-STATUS — the stop is attributed: the stop-after-5 rule records WHICH row stopped it and WHY (the un-run rows are then asserted as FAILURES by their own `finish()`)',
      ).not.toBe(null)
      expect(registerState.attempts, 'REGISTER-STATUS — a stopped run is strictly shorter than the declared 248').toBeLessThan(248)
      expect(
        notStarted.length,
        `REGISTER-STATUS — the stop at ${registerState.stoppedAtRow} left ${notStarted.length} register row(s) un-started, and each of them FAILED rather than passed (§5.5.1 strategy item 3)`,
      ).toBeGreaterThan(0)
    }
  })
})

// ===========================================================================
// §6 — THE RULING’S FALSIFICATION SET, recorded as the fourth-form set the
// contract names, and the STATED LIMITATION (the three-case `''` collision).
// ===========================================================================
describe('§6/§7 item 13 — the ruling’s falsification set and the mechanism’s STATED LIMIT', () => {
  it('§7 item 13 — THE STATED LIMITATION: three distinct causes all yield `\'\'`, and the KEY SET is the existence signal', async () => {
    const fn = await surface('§7 item 13 / §2.5 item 3')
    // (i) the consumer’s `revealed` DECLINED the zone.
    const declined = fn(['a'], { a: 3 }, { a: 40 }, () => false, { a: SPEC_A })
    // (ii) the zone’s spec entry is MALFORMED (the delegate’s malformed-spec limb).
    const malformed = fn(['a'], { a: 3 }, { a: 40 }, () => true, { a: 42 })
    // (iii) the zone’s size lookup MISSED and the caller’s `emptyToken` happens to
    // be `''`.
    const emptyTokenIsEmpty: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: '' }
    const missed = fn(['a'], { a: 3 }, {}, () => true, { a: emptyTokenIsEmpty })
    expect(
      [recordOf(declined).a, recordOf(malformed).a, recordOf(missed).a],
      '§7 item 13/§0A note 12 — the three distinct causes all yield `\'\'` and are indistinguishable from the record’s VALUE alone: this is the mechanism’s STATED LIMIT, recorded as behaviour rather than as a defect',
    ).toEqual(['', '', ''])
    expect(
      [Object.keys(declined), Object.keys(malformed), Object.keys(missed)],
      '§7 item 13 — the KEY SET is the existence signal (all three zones EXIST) and the value is only the display payload: a consumer needing the distinction reads the key set or keeps its own reveal decision',
    ).toEqual([['a'], ['a'], ['a']])
    // The revisit condition, stated as the contract states it: no sentinel and no
    // second value domain is invented here — a unit that needs a display CHANNEL is
    // a NEW CONTRACT with its own gate.
    expect(
      new Set([recordOf(declined).a, recordOf(malformed).a, recordOf(missed).a]).size,
      '§7 item 13/§0A note 12 — the value domain is `string` and carries no display-state channel: no sentinel exists',
    ).toBe(1)
  })
})
