// tests/zones.test.ts
// ===========================================================================
// U-ZONES · wave E · **THE RED SET** (RCA-1) — the next-steps row `E1`.
//
// Contract: `docs/specs/zones.md` (FILED 2026-09-27; total corrected at the
// gate-2 closure `400` → `369`). The module to be built later is
// `src/shared/zones.ts` — **the THREE exported names of `§2.1`'s block**
// (TWO value exports `isEmpty` · `trackFor`, ONE type declaration `TrackSpec`;
// the census is `2 + 1 = 3`). `§3.4 R-5` is the row that pins the SET.
//
// Binding sections read in full: `§0` (the twelve recorded rulings) and `§0A`
// (the SIX dated ruling notes — CONTRACT, not commentary: (1) `isEmpty(census,
// zoneId)` is TWO arguments; (2) `trackProp` is the EMITTED PROPERTY NAME only,
// never a census key; (3) the census is an own-property read on a record plus
// `Map.get`, while an ARRAY and a `Set` are NON-records ⇒ `false`; (4) `-0` is
// NOT empty on the formatting side (it emits `"0"+unit`) but a `-0` census value
// IS empty; (5) **there is NO refusal domain — every outcome is a VALUE**, and a
// `format` discriminator was DECLINED (bare-number form = `unit: ''`; a
// malformed spec = `''`); (6) the module path is `src/shared/zones.ts` and the
// geometry boundary is this unit's own clause), `§2.1` (the surface + the
// delegate clause), `§2.2` (the `H-r8` SIX-PROHIBITION table `P-1`..`P-6`),
// `§2.3` (items 1–7: the `trackFor` decision table in limb order, the `isEmpty`
// decision table, the input-class table, NO typed refusal, `isEmpty` is a READ,
// the no-cross-call clause, THE GEOMETRY CLAUSE), `§2.4` (items 1–5: the
// formatting rule), `§3.1` (`M-1`..`M-18`), `§3.2` (`F-1`..`F-8`), `§3.3`
// (`I-1`..`I-10`), `§3.4` (the STATIC rows `R-1`..`R-7`), `§3.5` (the EXISTENCE
// rows `R-8`/`R-9`), `§4.1`/`§4.2` (the red statement + the authoring order),
// `§4.3` (what the red is NOT), `§4.4` (`S-1`..`S-9`), `§5.1` (diff scope),
// `§5.2` (the legs; leg 4 = the standalone strict `tsc`), `§5.3` (the DONE row's
// shape), **`§5.5.1` (the typed Property register — all EIGHT rows, executed
// here: `30+90+36+68+52+12+15+66 = 369`, seed `20260927`, caps `≤100`/row ·
// `≤400` total · stop-after-5)**, `§6`, `§7` (the honest statements), `§7a`/
// `§7a.1` (the SIX ambiguities — ALL SIX RULED; no row below re-opens one),
// `§8`, and `§3a`/`§3b` (the adversarial seed set — `A-*` rows are the LATER
// pass's; NONE is authored here).
//
// LAYER: **[T] arithmetic over arguments.** This unit touches no DOM, not even
// `src/shared/dom-shim.ts` (layer anchor 2): no element, no document, no shim
// member, no window, no IPC, no assembled app, no engine surface. **No row below
// asserts a rendered-geometry, CSS-validity, layout or paint property** (`I-10`,
// `R-7`, `§2.3` item 7): `trackFor` returns a STRING and whether a browser does
// anything with it is **UNPROVABLE in this repo today** — `§5.2` offers no `[U]`
// row, structurally (the module is imported by no `src/**` file — `R-4`).
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation: `src/shared/zones.ts` does not exist,
// so every clause row, every static row and every register row fails on the
// module-absent boundary. **No `src/**`, `scripts/**`, `package.json` or spec
// file is created or modified by this pass.**
//
// THE IMPORT BOUNDARY (the repo's established technique — a structural type plus
// a **computed** run-time specifier, `tests/slot-host.test.ts` /
// `tests/layout-projection.test.ts`): an `fs` existence probe and a
// run-time-assembled specifier, so Vite cannot fail this whole file's transform
// on an unresolvable import while the module is absent. Every row therefore
// fails as an **ASSERTION** naming the absent module / missing export, never as
// a collection error that would take the whole red set with it. `PRE-1` proves
// the mechanism itself resolves, against an EXISTING pure module.
//
// LEG 4 (`§5.2`): `R-5`(b) asserts the TYPE-ONLY name `TrackSpec` is exported,
// and an imported type name is erased at run time — so the honest leg is a
// standalone strict `tsc` over THIS file (see the `R-5` row). At RED time that
// leg reports the module-absent boundary and nothing else.
//
// AUTHORED ORDER (`§4.2` item 1): the `§3.5` existence rows `R-8`/`R-9` FIRST
// (they are the red's own premise), then `I-1`..`I-10`, `M-1`..`M-18`,
// `F-1`..`F-8`, then the `§3.4` static rows `R-1`..`R-7`, then the `§5.5.1`
// register rows in register order (`P-ZN-IM-1` · `P-ZN-TP-1` · `P-ZN-IM-2` ·
// `P-ZN-IM-3` · `P-ZN-SM-1` · `P-ZN-SM-2` · `P-ZN-IM-4` · `P-ZN-TP-2`), then the
// register's own status row. The `describe` blocks below are in that order;
// NOTHING is renumbered.
//
// REGISTER FINDINGS REPORTED IN PLACE (never tuned to green — `§4.2` item 2,
// `§7` item 12): the per-row TERM decompositions of `P-ZN-TP-1` and `P-ZN-SM-1`
// and the negative pool member of `P-ZN-TP-2` are each reported beside the table
// that drives them, with the clause pair. See the `§5.5.1` block below.
// ===========================================================================
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot
// be imported for its types while it is absent, so the row set carries its own
// declarations; field names, optionality and the return types are `§2.1`'s
// block exactly. `R-5`(b) is the row that later asserts (through leg 4) that
// `TrackSpec` is exported by the module itself.
// ===========================================================================
interface TrackSpec {
  /** The property NAME the emitted token belongs to — carried, never
   *  interpreted, NEVER a census key (`§2.1`, `§0A` note 2). */
  readonly trackProp: string
  /** The caller's unit token, appended VERBATIM; `''` is the documented
   *  bare-number form (`§2.4` item 1, `F-6`). */
  readonly unit: string
  /** The exact token to emit for an EMPTY track; emitted byte for byte
   *  (`§2.4` item 2). The module has no `'0px'` literal. */
  readonly emptyToken: string
}

/** `§2.1`'s `ZoneCensus` — an OPAQUE value: an own-property read on a record,
 *  plus `Map.get` for a `Map`; every other shape is a non-record (`§2.3`
 *  item 2, `§3.2 F-3`/`F-4`). */
type ZoneCensus = Readonly<Record<string, unknown>> | ReadonlyMap<unknown, unknown> | unknown

interface ZonesSurface {
  isEmpty(census: unknown, zoneId: unknown): boolean
  trackFor(spec: unknown, size: unknown, empty?: unknown): string
}

// ===========================================================================
// THE IMPORT BOUNDARY (§4.1).
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/zones.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'zones.js'].join('/')
const TEST_FILE = fileURLToPath(import.meta.url)
const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))

type Surface = {
  isEmpty: ZonesSurface['isEmpty'] | null
  trackFor: ZonesSurface['trackFor'] | null
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
      isEmpty: null,
      trackFor: null,
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const isEmpty = mod['isEmpty']
    const trackFor = mod['trackFor']
    const missing: string[] = []
    if (typeof isEmpty !== 'function') missing.push('isEmpty')
    if (typeof trackFor !== 'function') missing.push('trackFor')
    surfaceCache =
      missing.length === 0
        ? {
            isEmpty: isEmpty as ZonesSurface['isEmpty'],
            trackFor: trackFor as ZonesSurface['trackFor'],
            mod,
            reason: null,
          }
        : {
            isEmpty: null,
            trackFor: null,
            mod,
            reason: `§2.1's value exports are not all exported as functions — missing: ${missing.join(', ')}`,
          }
  } catch (e) {
    surfaceCache = {
      isEmpty: null,
      trackFor: null,
      mod: null,
      reason: `the module does not resolve: ${describeThrown(e)}`,
    }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's label, so
 *  the red message is about the absent module/export, never an import type. */
async function surface(label: string): Promise<{
  isEmpty: ZonesSurface['isEmpty']
  trackFor: ZonesSurface['trackFor']
  mod: Record<string, unknown>
}> {
  const s = await resolveSurface()
  if (s.isEmpty === null || s.trackFor === null) {
    expect(
      s.isEmpty,
      `RED — U-ZONES red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's isEmpty(census, zoneId) / trackFor(spec, size, empty). [${label}]`,
    ).not.toBe(null)
    throw new Error(`U-ZONES red set — module absent: ${s.reason ?? 'unavailable'} [${label}]`)
  }
  return { isEmpty: s.isEmpty, trackFor: s.trackFor, mod: s.mod ?? {} }
}

// ===========================================================================
// §2.2/`§3.4` — the STATIC readers over the module FILE (and, for `R-1`/`R-7`,
// over this unit's own controlled `[T]` corpora).
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-ZONES red set (§4.1): the static rows of §2.2/§3.4/§3.5 read the module file and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return readFileSync(MODULE_SRC, 'utf8')
}

/** Strip comments while PRESERVING line structure (so a hit's line number is the
 *  real one). String literals are KEPT: a banned token inside a string is still
 *  that token in code. Used for the ACCESS/IMPORT/LITERAL scans, **never** for
 *  `R-1`: the vocabulary scan reads comments as code, by `§4.4 S-7`. */
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
// §3.4 R-1 — THE ANTI-EVASION VOCABULARY SCAN (`§2.2` P-1/P-2, `§4.4 S-7`).
//
// `§4.4 S-7` requires the row to be closed against BOTH evasions BEFORE it is
// authored: **token ASSEMBLY** (`'zo' + 'ne'`, a template literal, a token split
// across a line break) and **COMMENT-CARRYING** (the vocabulary in a comment
// rather than in code). So the vocabulary scan runs over a NORMALIZED view:
//   (1) the raw source is scanned for every spelling (comments included);
//   (2) every string-literal VALUE and every IDENTIFIER is extracted in SOURCE
//       ORDER and the chunks are re-joined where the join sits between two word
//       characters — so a spelling spread over `+`-joined literals, over a
//       template literal's parts, or reassembled out of identifiers, still meets
//       its own letters.
// The BANNED spellings are this row's own DATA, so this file carries them as
// FRAGMENTS — never as the joined token (`§3.4 R-1`'s scope rule for the file
// half). THE BOUNDARY RULE: a spelling is a violation only as a BOUNDED token,
// so the module's own legitimate identifiers that CONTAIN one as a substring
// (`zoneId`, `ZoneCensus` — both names `§2.1`'s block declares) are a stated
// boundary, not a violation (`§3.4 R-1` item (ii)).
// ===========================================================================
const VOCAB_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['zo', 'ne'],
  ['pa', 'ne'],
  ['t', 'ab'],
  ['re', 'gion'],
  ['dash', 'board'],
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
 *  chunks is re-joined and scanned, while `{a: 1}`'s braces are never turned
 *  into letters and no token is invented out of a punctuation edge. */
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
 *  (comments included) and `(2)` a BOUNDED spelling that ASSEMBLES out of the
 *  text's literals/identifiers. Both halves are the `S-7` closure. */
function vocabularyViolations(src: string): string[] {
  const violations: string[] = []
  for (const word of VOCAB_WORDS) {
    if (boundedOccurrences(src, word) > 0) {
      violations.push(`RAW bounded occurrence of '${word}' (a comment counts, S-7)`)
    }
  }
  const assembled = assembledLetters(src)
  for (const word of VOCAB_WORDS) {
    if (boundedOccurrences(assembled, word) > 0) {
      violations.push(`ASSEMBLED bounded occurrence of '${word}' (token assembly is the SAME violation, S-7)`)
    }
  }
  return violations
}

/** `R-1`'s LITERAL half (`'0px'` / `'fit-content'`), scoped to CODE with the
 *  reason STATED rather than assumed: the clause forbids the literal **as a
 *  mechanism constant**, and `§2.1`'s own `emptyToken` doc comment — the block
 *  the module mirrors — MENTIONS the spelling while stating that the mechanism
 *  does not know it. A comment is not a constant, so the comment half is not
 *  claimed here (reported as a clause pair in the red report); a literal in CODE
 *  is caught. */
function literalViolations(code: string): string[] {
  const out: string[] = []
  for (const lit of BANNED_LITERALS) {
    if (boundedOccurrences(code, lit) > 0) out.push(`a '${lit}' literal in the module's CODE (P-1's binding negative)`)
  }
  return out
}

/** `R-1`'s POSITIVE controls: the evading forms `§4.4 S-7` names — raw,
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
/** A control of the BOUNDARY rule's other half: two ordinary word chunks
 *  adjacent in the assembled view are separated (their join is a token
 *  boundary, not a spelling), so the separator semantics are asserted. */
const VOCAB_BOUNDARY_CONTROL = `${'const'} ${['tr'].join('')} = 1\n${'const'} ${['ack'].join('')} = 2`
/** The NEGATIVE control: this unit's own legitimate text — the two value export
 *  names, the three spec field names, the census parameter name, the type name
 *  `§2.1` declares, and a diagnostic sentence. */
const VOCAB_NEGATIVE_CONTROL =
  `function isEmpty(census: unknown, zoneId: unknown): boolean { return false }\n` +
  `function trackFor(spec: { trackProp: string; unit: string; emptyToken: string }): string { return '' }\n` +
  `type ZoneCensus = Readonly<Record<string, unknown>>\n` +
  `// the size is not a finite non-negative number\n`

// ===========================================================================
// §3.4 R-7 — THE GEOMETRY TOKENS, carried as FRAGMENTS for the same reason: the
// row scans the MODULE **and this unit's own `[T]` test file**, and a file that
// must name the tokens it bans can only fail a scan that reads the joined
// spelling out of its own rule list. The file half therefore reads RAW bytes
// only (stated limit below), which is exactly why the fragments are load-bearing.
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
const GEOM_CALL_RES: readonly RegExp[] = GEOM_CALL_FRAGMENTS.map((f) => new RegExp(`\\b${f.join('')}\\b`))
/** The claim words `§3.4 R-7` forbids in an assertion message or a description. */
const GEOM_CLAIM_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['render', 'ed'],
  ['lay', 'out'],
  ['pa', 'int'],
  ['CSS', ' valid'],
]
const GEOM_CLAIM_RES: readonly RegExp[] = GEOM_CLAIM_FRAGMENTS.map((f) => new RegExp(`\\b${f.join('')}\\b`, 'i'))

// ===========================================================================
// §3.3 I-8 / §3.4 R-2 — THE AMBIENT-REALM TOKENS, carried as FRAGMENTS for the
// same reason the geometry tokens are: `R-7` scans THIS FILE's raw bytes for
// geometry calls, and an access row whose rule list spelled a banned token
// joined would make that scan read its own rule list. The fragments are
// load-bearing, not decoration.
// ===========================================================================
const AMBIENT_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['doc', 'ument'],
  ['win', 'dow'],
  ['global', 'This'],
  ['self'],
  ['top'],
  ['parent'],
  ['frames'],
  ['match', 'Media'],
  ['get', 'Computed', 'Style'],
  ['get', 'Property', 'Value'],
  ['query', 'Selector'],
  ['query', 'Selector', 'All'],
  ['getElement', 'ById'],
  ['active', 'Element'],
  ['local', 'Storage'],
]
const AMBIENT_TOKENS: readonly string[] = AMBIENT_FRAGMENTS.map((f) => f.join(''))
const AMBIENT_RE = new RegExp(`\\b(${AMBIENT_TOKENS.join('|')})\\b`)
const AMBIENT_COMPUTED_RE = new RegExp(
  `\\b(${['doc', 'ument'].join('')}|${['win', 'dow'].join('')}|${['global', 'This'].join('')}|${['se', 'lf'].join('')})\\s*\\[`,
)
const AMBIENT_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  {
    what: 'an ambient realm token (Layer anchor 3: every input is an argument)',
    re: AMBIENT_RE,
  },
  {
    what: 'a computed access on a banned realm token or an alias of one',
    re: AMBIENT_COMPUTED_RE,
  },
  { what: 'a random/time ambient read', re: /\b(Math\.random|Date\.now|new\s+Date|performance\.now)\b/ },
  { what: 'a process/env read', re: /\b(process\.env|process\.argv|process\.platform)\b/ },
  { what: 'a node realm read (including the filesystem)', re: /\b(node:fs|require\s*\(|__dirname|__filename|import\.meta\.url)\b/ },
  { what: 'an eval/Function-constructed access (the same violation as the token)', re: /\b(eval|Function)\s*\(/ },
  { what: 'a realm construction route (Function.prototype.constructor, Reflect.construct)', re: /\b(Reflect\.construct|constructor\.constructor)\b/ },
]

// ===========================================================================
// §2.2/`§5.1` — THE CHANGE-SET CENSUS (shared by `R-4` and `R-6`).
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
 *  yet (the honest RED-time state — nothing is committed, `RCA-8(a)`). */
function committedChangeSet(): { range: string; paths: string[] } | null {
  const added = gitOrNull(['log', '--diff-filter=A', '--format=%H', '--', 'tests/zones.test.ts'])
  const anchor = added === null ? undefined : added.filter((l) => /^[0-9a-f]{7,40}$/.test(l))[0]
  if (anchor === undefined) return null
  const range = `${anchor}..HEAD`
  const listed = gitOrNull(['log', '--name-only', '--pretty=format:', range])
  if (listed === null) return null
  return { range, paths: Array.from(new Set(listed)).sort() }
}

// ===========================================================================
// §2.1/§3.4 R-5 — the TYPE-ONLY name. `§5.2` leg 4 is the leg that covers it:
// this import fails to compile IFF `TrackSpec` is not exported by the module
// (`import type` is erased at run time, so it cannot fail this file's
// collection while the module is absent — it fails the standalone `tsc` leg,
// which is the red's own boundary at RED time).
// ===========================================================================
import type { TrackSpec as ModuleTrackSpec } from '../src/shared/zones.js'

// ===========================================================================
// §2.3 — THE SHARED DRIVE DATA AND THE HOSTILE SHAPES.
// ===========================================================================
/** `M-1`'s spec, used by every row that says "spec as `M-1`". */
const SPEC_M1: TrackSpec = { trackProp: '--w', unit: 'px', emptyToken: '0px' }

const hasOwn = Object.prototype.hasOwnProperty
function own(record: object, name: string): boolean {
  return hasOwn.call(record, name)
}
function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}
function brief(value: unknown): string {
  if (value === null) return 'null'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'symbol') return value.toString()
  if (typeof value === 'bigint') return `${String(value)}n`
  if (typeof value === 'function') return 'a function'
  if (Array.isArray(value)) return `an array of ${value.length}`
  if (typeof value === 'object') return `{${Object.keys(value).join(',')}}`
  return String(value)
}
/** A record whose OWN accessor for `key` throws (`F-1`, `F-5`, `§2.3` item 2(v)). */
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
/** A spec whose named field is read through an own accessor that THROWS (`F-1`). */
function throwingAccessorSpec(field: string): unknown {
  const spec: Record<string, unknown> = { trackProp: '--a', unit: 'px', emptyToken: '0px' }
  Object.defineProperty(spec, field, {
    get(): never {
      throw new Error(`the accessor for '${field}' threw`)
    },
    enumerable: true,
    configurable: true,
  })
  return spec
}
/** `F-5`'s hostile `Proxy`: `get`/`has`/`getOwnPropertyDescriptor`/`ownKeys` all
 *  throw. `§2.3` item 2(v): an unreadable census is caught and treated as
 *  not-empty — never propagated. */
function hostileProxy(): unknown {
  const thrower = (): never => {
    throw new Error('the hostile proxy trap threw')
  }
  return new Proxy(
    {},
    {
      get: thrower,
      has: thrower,
      getOwnPropertyDescriptor: thrower,
      ownKeys: thrower,
    },
  )
}
/** A `Map` whose `get` throws (`F-5`, `§2.3` item 2(v)). */
function throwingGetMap(): Map<unknown, unknown> {
  return new Map<unknown, unknown>([
    ['a', 0],
    [
      'get',
      (): never => {
        throw new Error('the map get threw')
      },
    ],
  ])
}
/** A census snapshot for `I-6`/`P-ZN-IM-3`/`P-ZN-SM-2`: identity-relevant facts
 *  only, and a throwing shape is recorded as such rather than propagated. */
function censusSnapshot(census: unknown): string {
  if (census === null || (typeof census !== 'object' && typeof census !== 'function')) {
    return `primitive:${brief(census)}`
  }
  try {
    const record = census as Record<string, unknown>
    const keys = Object.keys(record)
    const values = keys.map((k) => {
      try {
        return brief(record[k])
      } catch (e) {
        return `<<threw: ${describeThrown(e)}>>`
      }
    })
    const proto = Object.getPrototypeOf(census) === null ? 'null-proto' : Object.getPrototypeOf(census) === Object.prototype ? 'Object.prototype' : 'other-proto'
    return `keys=${JSON.stringify(keys)} values=${JSON.stringify(values)} proto=${proto} frozen=${String(
      Object.isFrozen(census),
    )} mapSize=${census instanceof Map ? String(census.size) : 'n/a'} setSize=${census instanceof Set ? String(census.size) : 'n/a'}`
  } catch (e) {
    return `<<snapshot threw: ${describeThrown(e)}>>`
  }
}
/** `§2.1`/`§2.3` item 1's input classes for `trackFor` (`F-2` and `P-ZN-IM-1`). */
const NON_REPRESENTABLE_SIZES: ReadonlyArray<readonly [string, unknown]> = [
  ['-1', -1],
  ['-0.5', -0.5],
  ['-Number.MIN_VALUE', -Number.MIN_VALUE],
  ['NaN', Number.NaN],
  ['+Infinity', Number.POSITIVE_INFINITY],
  ['-Infinity', Number.NEGATIVE_INFINITY],
  ["the numeric string '12'", '12'],
  ["the numeric string '0'", '0'],
  ['the BigInt 0n', 0n],
  ['the BigInt 12n', 12n],
  ["Symbol('s')", Symbol('s')],
  ['a function', (): number => 1],
  ['null', null],
  ['undefined', undefined],
  ['an object', {}],
  ['an array', []],
  ['true', true],
  ['false', false],
]
/** `F-4`'s non-record census shapes (`§2.3` item 2(c), `§0A` note 3). */
const NON_RECORD_CENSUSES: ReadonlyArray<readonly [string, unknown]> = [
  ['null', null],
  ['undefined', undefined],
  ['the number 42', 42],
  ["the string 'x'", 'x'],
  ['true', true],
  ["Symbol('c')", Symbol('c')],
  ['a function', (): number => 1],
  ['an array', []],
  ["the array ['z']", ['z']],
  ["a Set (membership is NOT an emptiness rule, §0A note 3)", new Set(['a'])],
]
/** `F-4`'s non-string `zoneId` shapes, driven against a valid record census. */
const NON_STRING_ZONE_IDS: ReadonlyArray<readonly [string, unknown]> = [
  ['the number 42', 42],
  ['null', null],
  ['undefined', undefined],
  ["Symbol('a')", Symbol('a')],
  ['an object', {}],
  ['an array', []],
  ['true', true],
]

// ===========================================================================
// R-8/R-9 — §3.5 THE EXISTENCE ROWS, AUTHORED FIRST OF ALL (`§4.2` item 1):
// they are the red's own premise and are evaluable before the module exists.
// ===========================================================================
describe('R-8/R-9 — §3.5 the existence rows (the red’s own premise)', () => {
  it('R-8 §3.5 — the module-absence row (the §4.1 red premise): `src/shared/zones.ts` does not exist at RED time', () => {
    const exists = existsSync(MODULE_SRC)
    expect(
      exists,
      `R-8/§4.1/RCA-1 — \`src/shared/zones.ts\` does not exist at the moment this red set is AUTHORED and RUN. ` +
        `IF IT EXISTS this row FAILS MEANINGFULLY: the unit's red-order claim (RCA-1) is broken and the pass that ` +
        `finds it must report the inversion rather than proceed (${fileURLToPath(MODULE_SRC)}).`,
    ).toBe(false)
    // The unit-owned-file half: this test file is the ONLY unit-owned path in the
    // change set while the module is absent. A `git status` probe is used ONCE,
    // here, and its meaning is exactly this premise (`§3.4 R-8`); `R-4`'s scope
    // row does NOT rest on it.
    const tree = treeChangeSet()
    const unitOwned = tree.paths.filter((p) => /^(tests|src\/shared)\/zones/.test(p)).sort()
    expect(
      unitOwned,
      `R-8/§3.5 — at RED time the unit-owned change set is exactly \`tests/zones.test.ts\` (the module is absent). ` +
        `git status said: ${JSON.stringify(tree.raw)}`,
    ).toEqual(['tests/zones.test.ts'])
    expect(
      existsSync(TEST_FILE),
      'R-8/§3.5 — the probe is not vacuous: this test file itself exists on disk through the same mechanism',
    ).toBe(true)
  })

  it('R-9 §3.5 — the absent-page-design PROBE: `docs/skills/designing-pages.md` does not exist (a FAIL is meaningful)', () => {
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    const exists = existsSync(pageDesign)
    expect(
      exists,
      'R-9/§1 item 8/§7 item 9 — `docs/skills/designing-pages.md` DOES NOT EXIST at the time this red set runs. ' +
        'IF IT EXISTS this row FAILS MEANINGFULLY: this unit then OWES a test-use-case coverage row in that file’s ' +
        'coverage matrix PLUS an entry in its demo-page index — and this filing’s position is that the mechanism ' +
        'renders no page, so the row would be an ABSENCE row rather than a claim.',
    ).toBe(false)
    expect(
      existsSync(new URL('../docs/skills/process-guardrails.md', import.meta.url)),
      'R-9/§3.5 — the probe is not vacuous: `docs/skills/process-guardrails.md` DOES exist (globbed `docs/skills/*` at filing), so `existsSync` on the sibling path answers true',
    ).toBe(true)
  })
})

// ===========================================================================
// I-1..I-10 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — both functions return their DECLARED TYPE for every input (`isEmpty` ⇒ boolean, `trackFor` ⇒ string; never null/undefined/object/number/array)', async () => {
    const { isEmpty, trackFor } = await surface('I-1')
    const specs: ReadonlyArray<readonly [string, unknown]> = [
      ['a well-formed spec', SPEC_M1],
      ['null', null],
      ['undefined', undefined],
      ['a number', 42],
      ["a string", 'x'],
      ['an array', []],
      ['a record missing every field', {}],
      ['a record with a non-string field', { trackProp: '--a', unit: 3, emptyToken: '0px' }],
      ['a record with a throwing accessor', throwingAccessorSpec('emptyToken')],
    ]
    for (const [specLabel, spec] of specs) {
      for (const [sizeLabel, size] of NON_REPRESENTABLE_SIZES) {
        for (const empty of [undefined, true, false] as const) {
          const got = trackFor(spec, size, empty)
          expect(
            typeof got,
            `I-1/§2.1 — ` +
              `trackFor must return a \`string\` for EVERY input (spec: ${specLabel}, size: ${sizeLabel}, empty: ${brief(
                empty,
              )}); got ${typeof got} (${brief(got)})`,
          ).toBe('string')
        }
      }
      for (const [sizeLabel, size] of [
        ['120', 120],
        ['0', 0],
        ['1.5', 1.5],
      ] as const) {
        const got = trackFor(spec, size, false)
        expect(
          typeof got,
          `I-1/§2.1 — trackFor(spec: ${specLabel}, size: ${sizeLabel}, empty: false) returns a string; got ${typeof got} (${brief(
            got,
          )})`,
        ).toBe('string')
      }
    }
    for (const [censusLabel, census] of NON_RECORD_CENSUSES) {
      for (const zoneId of ['a', 42, null, Symbol('z')]) {
        const got = isEmpty(census, zoneId)
        expect(
          typeof got,
          `I-1/§2.1 — isEmpty(census: ${censusLabel}, zoneId: ${brief(zoneId)}) returns a \`boolean\`; got ${typeof got} (${brief(
            got,
          )})`,
        ).toBe('boolean')
      }
    }
    for (const census of [{ a: 0 }, { a: 3 }, { a: -0 }, new Map([['a', 0]]), Object.create(null)] as const) {
      const got = isEmpty(census, 'a')
      expect(typeof got, `I-1/§2.1 — isEmpty returns a boolean for the record/Map shapes too; got ${typeof got}`).toBe(
        'boolean',
      )
    }
  })

  it('I-2 §3.3 — neither function ever throws, for any input, including a hostile value (Proxy traps, throwing accessors, a Symbol, a BigInt, a throwing `Map.get`)', async () => {
    const { isEmpty, trackFor } = await surface('I-2')
    const hostileSpecs: ReadonlyArray<readonly [string, unknown]> = [
      ['a throwing `trackProp` accessor', throwingAccessorSpec('trackProp')],
      ['a throwing `unit` accessor', throwingAccessorSpec('unit')],
      ['a throwing `emptyToken` accessor', throwingAccessorSpec('emptyToken')],
      ['a hostile Proxy as the spec', hostileProxy()],
      ["a Symbol('s') spec", Symbol('s')],
      ['the BigInt 0n as the spec', 0n],
      ['a function as the spec', (): number => 1],
    ]
    for (const [label, spec] of hostileSpecs) {
      for (const size of [120, Number.NaN, -1, 0] as const) {
        for (const empty of [undefined, true, false] as const) {
          expect(
            (): void => {
              trackFor(spec, size, empty)
            },
            `I-2/§2.1 — trackFor NEVER throws (spec: ${label}, size: ${brief(size)}, empty: ${brief(empty)})`,
          ).not.toThrow()
        }
      }
    }
    const hostileCensuses: ReadonlyArray<readonly [string, unknown]> = [
      ['a hostile Proxy', hostileProxy()],
      ['a record whose own accessor for the asked key throws', throwingAccessorRecord('a')],
      ['a Map whose `get` throws', throwingGetMap()],
      ["a Symbol('c') census", Symbol('c')],
      ['a BigInt census', 0n],
      ['a function census', (): number => 1],
      ['undefined', undefined],
      ['null', null],
    ]
    for (const [label, census] of hostileCensuses) {
      for (const zoneId of ['a', 42, Symbol('z'), null, undefined] as const) {
        expect(
          (): void => {
            isEmpty(census, zoneId)
          },
          `I-2/§2.1 — isEmpty NEVER throws (census: ${label}, zoneId: ${brief(zoneId)})`,
        ).not.toThrow()
      }
    }
  })

  it('I-3 §3.3 — PURITY: identical arguments ⇒ identical results, ALWAYS; a differing call in between changes nothing (no cache, no memo, no counter, no module-level state)', async () => {
    const { isEmpty, trackFor } = await surface('I-3')
    const first = trackFor(SPEC_M1, 120, false)
    const interleaved = trackFor({ trackProp: '--x', unit: 'fr', emptyToken: 'SENTINEL' }, -3, true)
    const emptyInterleaved = isEmpty({ a: 0 }, 'a')
    const second = trackFor(SPEC_M1, 120, false)
    expect(
      second,
      `I-3/§2.4 item 5 — two calls with identical arguments produce identical strings; got ${brief(first)} then ${brief(
        second,
      )} (the interleaved calls returned ${brief(interleaved)} / ${brief(emptyInterleaved)})`,
    ).toBe(first)
    expect(second === first, 'I-3/§2.4 item 5 — the two strings are equal by `===`, not merely `toEqual`').toBe(true)
    const e1 = isEmpty({ a: 0, b: 1 }, 'a')
    isEmpty({ a: 3 }, 'a')
    const e2 = isEmpty({ a: 0, b: 1 }, 'a')
    expect(e2, `I-3 — isEmpty is a pure function of its arguments; got ${brief(e1)} then ${brief(e2)}`).toBe(e1)
  })

  it('I-4 §3.3 — every emitted string is either `spec.emptyToken` VERBATIM, or `String(size) + spec.unit`, or the degenerate empty string: the mechanism adds NO character of its own', async () => {
    const { trackFor } = await surface('I-4')
    const specs: ReadonlyArray<readonly [string, TrackSpec]> = [
      ['unit px / token SENTINEL-A', { trackProp: '--p', unit: 'px', emptyToken: 'SENTINEL-A' }],
      ['unit empty (bare-number) / token SENTINEL-B', { trackProp: '--p', unit: '', emptyToken: 'SENTINEL-B' }],
      ['unit a full declaration / token SENTINEL-C', { trackProp: '--p', unit: 'px; color: red', emptyToken: 'SENTINEL-C' }],
    ]
    const sizes: ReadonlyArray<readonly [string, unknown]> = [
      ['120', 120],
      ['0', 0],
      ['-0', -0],
      ['1.5', 1.5],
      ['0.1 + 0.2', 0.1 + 0.2],
      ['1e21', 1e21],
      ['Number.MAX_VALUE', Number.MAX_VALUE],
      ['NaN', Number.NaN],
      ['-1', -1],
      ["'12'", '12'],
      ['0n', 0n],
      ['Symbol', Symbol('s')],
      ['null', null],
      ['undefined', undefined],
    ]
    for (const [specLabel, spec] of specs) {
      for (const [sizeLabel, size] of sizes) {
        const got = trackFor(spec, size, false)
        const isToken = got === spec.emptyToken
        const isNumericText =
          typeof size === 'number' && Number.isFinite(size) && size >= 0 && got === String(size) + spec.unit
        expect(
          isToken || isNumericText,
          `I-4/§2.4 items 1/2 — for (${specLabel}, size ${sizeLabel}) the emitted string must be the caller's ` +
            `emptyToken byte for byte (${brief(spec.emptyToken)}) or String(size) + unit (${brief(
              typeof size === 'number' && Number.isFinite(size) && size >= 0 ? String(size) + spec.unit : 'n/a',
            )}); got ${brief(got)} — the mechanism adds no prefix, suffix, separator, wrapper, case change or trim, ` +
            `and a malformed spec is the only other outcome ('')`,
        ).toBe(true)
      }
    }
    const malformed = trackFor(null, 120, false)
    expect(malformed, `I-4/§2.3 item 1(d) — a malformed spec is the degenerate empty string; got ${brief(malformed)}`).toBe('')
  })

  it('I-5 §3.3 — the empty token is emitted IFF exactly one of three limbs fired (truthy `empty`, non-finite `size`, negative `size`)', async () => {
    const { trackFor } = await surface('I-5')
    const spec: TrackSpec = { trackProp: '--i5', unit: 'u', emptyToken: 'SENTINEL-I5' }
    for (const size of [0, 1, 1.5, 120, Number.MAX_VALUE] as const) {
      const got = trackFor(spec, size, false)
      expect(
        got,
        `I-5/§2.3 item 1 — a finite non-negative size (${brief(size)}) NEVER yields the empty token; got ${brief(got)}`,
      ).toBe(String(size) + spec.unit)
    }
    for (const [label, size] of NON_REPRESENTABLE_SIZES) {
      const got = trackFor(spec, size, false)
      expect(
        got,
        `I-5/§2.3 item 1(b) — a non-representable size (${label}) yields the empty token; got ${brief(got)}`,
      ).toBe(spec.emptyToken)
    }
    for (const size of [120, 0, -1, Number.NaN] as const) {
      const got = trackFor(spec, size, true)
      expect(
        got,
        `I-5/§2.3 item 1(a) — a truthy empty NEVER yields String(size) + unit; got ${brief(got)} at size ${brief(size)}`,
      ).toBe(spec.emptyToken)
    }
  })

  it('I-6 §3.3 — no argument is mutated and no argument is retained: a FROZEN spec/census behaves exactly like its unfrozen twin', async () => {
    const { isEmpty, trackFor } = await surface('I-6')
    const spec: TrackSpec = { trackProp: '--i6', unit: 'px', emptyToken: 'SENTINEL-I6' }
    const census: Record<string, unknown> = { a: 0, b: 3 }
    const specBefore = JSON.stringify(spec)
    const censusBefore = censusSnapshot(census)
    const got = trackFor(spec, 120, false)
    const isEmptyResult = isEmpty(census, 'a')
    expect(JSON.stringify(spec), `I-6/§1 item 4 — the spec's three fields are value-identical after the call (got ${brief(got)})`).toBe(
      specBefore,
    )
    expect(
      censusSnapshot(census),
      `I-6/§1 item 4 — the census is value-identical after the call (isEmpty returned ${brief(isEmptyResult)})`,
    ).toBe(censusBefore)
    const frozenSpec = Object.freeze({ trackProp: '--i6', unit: 'px', emptyToken: 'SENTINEL-I6' })
    const frozenCensus = Object.freeze({ a: 0, b: 3 })
    expect(
      trackFor(frozenSpec, 120, false),
      'I-6/§3.3 — a FROZEN spec works exactly like its unfrozen twin (the mechanism writes nothing)',
    ).toBe(got)
    expect(
      isEmpty(frozenCensus, 'a'),
      'I-6/§3.3 — a FROZEN census answers exactly like its unfrozen twin',
    ).toBe(isEmptyResult)
    expect(Object.isFrozen(frozenSpec) && Object.isFrozen(frozenCensus), 'I-6 — the twins stay frozen after the calls').toBe(
      true,
    )
  })

  it('I-7 §3.3 — `isEmpty` answers about the CENSUS ONLY: no zone is created, defaulted, cached or remembered, and `false` collapses “non-empty” and “absent”', async () => {
    const { isEmpty } = await surface('I-7')
    const nearEmpty: Record<string, unknown> = { a: 3 }
    const before = censusSnapshot(nearEmpty)
    expect(isEmpty(nearEmpty, 'a'), `I-7/§2.3 item 2(b) — a non-zero own value is NOT empty`).toBe(false)
    expect(
      isEmpty(nearEmpty, 'a'),
      'I-7/§2.3 item 5 — the SAME `false` is returned for “non-empty” and for “absent”: a caller cannot distinguish the two from this call alone',
    ).toBe(isEmpty(nearEmpty, 'zzz'))
    expect(
      censusSnapshot(nearEmpty),
      `I-7/§2.3 item 2(ii) — the absent lookup created, defaulted or memoized NOTHING into the census: ${before}`,
    ).toBe(before)
    expect(Object.keys(nearEmpty), 'I-7 — no key was added to the census by the absent lookup').toEqual(['a'])
    const mapCensus = new Map<unknown, unknown>([['a', 0]])
    const sizeBefore = mapCensus.size
    expect(isEmpty(mapCensus, 'zzz'), 'I-7 — an absent Map key answers `false`').toBe(false)
    expect(mapCensus.size, 'I-7 — an absent Map key inserts nothing').toBe(sizeBefore)
  })

  it('I-8 §3.3 — the mechanism reads NO environment: its code carries no ambient realm token, and a call adds no global', async () => {
    const raw = moduleSource('I-8 §2.2 P-4/P-6')
    const code = stripComments(raw)
    expectNoStaticHits(code, AMBIENT_RULES, 'I-8 §3.3')
    const { isEmpty, trackFor } = await surface('I-8 runtime half')
    const globalsBefore = Object.getOwnPropertyNames(globalThis).sort()
    trackFor(SPEC_M1, 120, false)
    isEmpty({ a: 0 }, 'a')
    expect(
      Object.getOwnPropertyNames(globalThis).sort(),
      'I-8 — neither call installs a global (no store, no registry, no counter at module scope)',
    ).toEqual(globalsBefore)
  })

  it('I-9 §3.3 — `trackFor` never consults the census and `isEmpty` never consults a spec: two independent calls, `isEmpty(census, zoneId)` is TWO arguments', async () => {
    const { isEmpty, trackFor } = await surface('I-9')
    expect(
      isEmpty.length,
      'I-9/§0A note 1 (A-15) — the arity is `isEmpty(census, zoneId)`: the ruling’s own words govern, so the declared arity is exactly 2',
    ).toBe(2)
    expect(
      [2, 3].includes(trackFor.length),
      `I-9/§2.1 (A-15) — \`trackFor\`'s declared arity is 3 (the third parameter is optional), so \`.length\` is 2 or 3; got ${trackFor.length}`,
    ).toBe(true)
    const bare = trackFor(SPEC_M1, 120, false)
    const withCensusShapedThirdArg = trackFor(SPEC_M1, 120, { census: { a: 0 } })
    expect(
      withCensusShapedThirdArg,
      'I-9/§2.3 item 6 — the third parameter is the caller’s INJECTED emptiness decision and nothing else: a truthy object there fires limb (a) and the call never consults a census',
    ).toBe(SPEC_M1.emptyToken)
    expect(bare, 'I-9/§2.3 item 6 — `trackFor` has no census parameter and carries no census between calls').toBe('120px')
    const asSpec = isEmpty(SPEC_M1, 'a')
    expect(
      asSpec,
      'I-9/§2.3 item 6 — `isEmpty` takes no spec: a spec-shaped record handed where a census belongs is read as a census (own key `a` absent ⇒ false)',
    ).toBe(false)
  })

  it('I-10 §3.3 — THE GEOMETRY INVARIANT: every row of this unit asserts a returned string or boolean and NOTHING about a browser', async () => {
    const { isEmpty, trackFor } = await surface('I-10 §2.3 item 7')
    const token = trackFor(SPEC_M1, 120, false)
    const flag = isEmpty({ a: 0 }, 'a')
    expect(typeof token, `I-10/§2.3 item 7 — the emitted token is a STRING (${brief(token)}) and this row claims nothing about what a browser does with it`).toBe(
      'string',
    )
    expect(typeof flag, `I-10/§2.3 item 7 — the emptiness answer is a BOOLEAN (${brief(flag)})`).toBe('boolean')
    // The falsifiable half of the invariant is the STATIC row `R-7`; its half of
    // the claim is asserted here against THIS file's own descriptions, so a row
    // that started claiming a resolution fact fails in the same suite.
    const ownSource = readFileSync(TEST_FILE, 'utf8')
    const titles = [...ownSource.matchAll(/\b(?:it|describe)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g)].map((m) => m[1])
    expect(titles.length, 'I-10 — this file’s own row descriptions were extracted (a non-vacuous census)').toBeGreaterThan(
      25,
    )
    for (const claim of GEOM_CLAIM_RES) {
      const hit = titles.find((t) => claim.test(t))
      expect(
        hit,
        `I-10/§2.3 item 7 (A-14) — no row description of this file may claim a resolution/geometry/layout fact; the offending description was ${brief(
          hit,
        )}`,
      ).toBeUndefined()
    }
  })
})

// ===========================================================================
// M-1..M-18 — §3.1 the valid / happy states.
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it('M-1 §3.1 — a well-formed spec and an integer size: `String(120) + unit`', async () => {
    const { trackFor } = await surface('M-1')
    const got = trackFor({ trackProp: '--w', unit: 'px', emptyToken: '0px' }, 120, false)
    expect(got, 'M-1/§2.4 item 1 — trackFor({trackProp:"--w",unit:"px",emptyToken:"0px"}, 120, false) is String(120) + "px"').toBe(
      '120px',
    )
    expect(typeof got, 'M-1/§2.1 — the call is total and returns a string').toBe('string')
  })

  it('M-2 §3.1 — a fractional size is NOT rounded and NOT truncated', async () => {
    const { trackFor } = await surface('M-2')
    expect(trackFor(SPEC_M1, 1.5, false), 'M-2/§2.4 item 3 — 1.5 ⇒ "1.5px" (no rounding, no toFixed)').toBe('1.5px')
    expect(trackFor(SPEC_M1, 1024.25, false), 'M-2/§2.4 item 3 — 1024.25 ⇒ "1024.25px"').toBe('1024.25px')
  })

  it('M-3 §3.1 — `trackProp` is CARRIED, never used: three specs differing only in `trackProp` emit the SAME string', async () => {
    const { trackFor } = await surface('M-3 §0A note 2')
    const a = trackFor({ trackProp: '--a', unit: 'px', emptyToken: '0px' }, 120, false)
    const b = trackFor({ trackProp: '--b', unit: 'px', emptyToken: '0px' }, 120, false)
    const emptyProp = trackFor({ trackProp: '', unit: 'px', emptyToken: '0px' }, 120, false)
    const protoProp = trackFor({ trackProp: '__proto__', unit: 'px', emptyToken: '0px' }, 120, false)
    const longProp = trackFor({ trackProp: 'x'.repeat(4096), unit: 'px', emptyToken: '0px' }, 120, false)
    expect(
      [b, emptyProp, protoProp, longProp],
      `M-3/§2.3 item 1 (trackProp clause)/§0A note 2 — \`trackProp\` participates in NO limb: '--a' ⇒ ${brief(
        a,
      )} and every other spelling ⇒ the same string; a \`trackProp\` used as a census key or validated/trimmed would differ`,
    ).toEqual([a, a, a, a])
  })

  it('M-4 §3.1 — `emptyToken` is irrelevant when the track is not empty: the sentinel never appears', async () => {
    const { trackFor } = await surface('M-4')
    const got = trackFor({ trackProp: '--c', unit: 'px', emptyToken: 'SENTINEL-0' }, 40, false)
    expect(got, 'M-4/§2.4 item 2 — a non-empty track emits String(size)+unit and the caller’s emptyToken never appears').toBe(
      '40px',
    )
    expect(got.includes('SENTINEL-0'), 'M-4 — the empty-token sentinel does not occur in the emitted token').toBe(false)
  })

  it('M-5 §3.1 — `size === 0` is a zero track, NOT an empty one', async () => {
    const { trackFor } = await surface('M-5')
    const size = 0
    const got = trackFor(SPEC_M1, size, false)
    expect(
      got,
      'M-5/§2.3 item 1(c) — the row asserts “the returned string equals String(size) + unit”, NEVER “equals the known literal”: the literal here is the DRIVE’s own data, and a module hard-coding it would pass this drive and fail M-10',
    ).toBe(String(size) + SPEC_M1.unit)
    expect(got, 'M-5 — the emitted token is "0px" (the drive data)').toBe('0px')
  })

  it('M-6 §3.1 — `size === -0` emits `\'0\' + unit` (NOT the empty token) and no negative sign is emitted', async () => {
    const { trackFor } = await surface('M-6 §0A note 4')
    const size = -0
    expect(Object.is(size, -0), 'M-6/§0A note 4 — the drive really passes `-0` (Object.is(size, -0)), so a literal-collapsing parser cannot hide the case').toBe(
      true,
    )
    const got = trackFor(SPEC_M1, size, false)
    expect(got, 'M-6/§2.3 item 1(c) — `-0` is finite and not negative (`-0 < 0` is false), so it emits String(-0) + unit').toBe('0px')
    expect(got, 'M-6/§0A note 4 — the EMPTY TOKEN is NOT returned for `-0`').not.toBe(SPEC_M1.emptyToken)
    expect(got.startsWith('-'), 'M-6 — the negative sign is not emitted').toBe(false)
  })

  it('M-7 §3.1 — large and tiny magnitudes keep `String()` semantics verbatim', async () => {
    const { trackFor } = await surface('M-7 §2.4 item 3')
    const cases: ReadonlyArray<readonly [number, string]> = [
      [1e21, '1e+21px'],
      [1e-7, '1e-7px'],
      [Number.MAX_VALUE, '1.7976931348623157e+308px'],
      [Number.MIN_VALUE, '5e-324px'],
    ]
    for (const [size, expected] of cases) {
      const got = trackFor(SPEC_M1, size, false)
      expect(
        got,
        `M-7/§2.4 item 3 — String(${brief(size)}) is the pinned semantics (NOT toFixed, NOT toPrecision, NOT a locale form, NOT a radix change, NOT exponent normalization)`,
      ).toBe(expected)
      expect(got, `M-7 — the emitted text is exactly String(size) + unit for ${brief(size)}`).toBe(String(size) + SPEC_M1.unit)
    }
  })

  it('M-8 §3.1 — the float-printing control: `0.1 + 0.2` ⇒ `\'0.30000000000000004px\'` (fails a module that rounds)', async () => {
    const { trackFor } = await surface('M-8 §2.4 item 3 / A-1')
    const got = trackFor(SPEC_M1, 0.1 + 0.2, false)
    expect(got, 'M-8 — the shortest round-tripping decimal representation is pinned: a `toFixed`/rounding module fails HERE').toBe(
      '0.30000000000000004px',
    )
  })

  it('M-9 §3.1 — a unit that is itself a full declaration is emitted VERBATIM (no sanitizing, no rejection)', async () => {
    const { trackFor } = await surface('M-9 §2.4 item 1')
    const unit = 'px; color: red'
    const got = trackFor({ trackProp: '--d', unit, emptyToken: 'SENTINEL-M9' }, 120, false)
    expect(got, 'M-9/§2.4 item 1 — the unit is caller data: no trim, no validation, no sanitizing, no rejection').toBe(
      '120px; color: red',
    )
    const multilineUnit = 'px\n}'
    expect(
      trackFor({ trackProp: '--d', unit: multilineUnit, emptyToken: 'SENTINEL-M9' }, 120, false),
      'M-9/§2.4 item 1 — a unit carrying a newline and a brace is emitted verbatim too (a sanitizer would be a P-1/P-3 finding)',
    ).toBe(`120${multilineUnit}`)
  })

  it('M-10 §3.1 — `emptyToken` is CALLER DATA, not a mechanism constant: two specs differing only in it yield two different tokens', async () => {
    const { trackFor } = await surface('M-10 §2.4 item 2 / A-2')
    const a = trackFor({ trackProp: '--e', unit: 'px', emptyToken: 'ZZZ' }, -1, false)
    const b = trackFor({ trackProp: '--e', unit: 'px', emptyToken: 'none' }, -1, false)
    const c = trackFor({ trackProp: '--e', unit: 'px', emptyToken: '' }, -1, false)
    expect(a, 'M-10 — the same input class yields the first caller token').toBe('ZZZ')
    expect(b, 'M-10 — and the second caller token; NO built-in literal can satisfy both drives').toBe('none')
    expect(c, 'M-10 — `emptyToken: \'\'` is a legitimate caller value and is returned exactly').toBe('')
    expect(a === b && b === c, 'M-10 — the three tokens are genuinely different (the drives are not redundant)').toBe(false)
  })

  it('M-11 §3.1 — a truthy `empty` returns the empty token for ANY size, including a valid one (limb (a) precedes limb (b))', async () => {
    const { trackFor } = await surface('M-11 §2.3 item 1(a)')
    for (const size of [120, 0, -1] as const) {
      const got = trackFor(SPEC_M1, size, true)
      expect(
        got,
        `M-11/§2.3 item 1(a) — with empty = true and size = ${brief(size)} the result is spec.emptyToken; the third drive shows limb (a) precedes limb (b)`,
      ).toBe(SPEC_M1.emptyToken)
    }
  })

  it('M-12 §3.1 — a FALSY `empty` is NOT an empty case: limb (a) fires on `Boolean(empty) === true` only', async () => {
    const { trackFor } = await surface('M-12 §2.3 item 1(a)')
    const drives: ReadonlyArray<readonly [string, () => string]> = [
      ['omitted (`undefined`)', () => trackFor(SPEC_M1, 120)],
      ['null', () => trackFor(SPEC_M1, 120, null)],
      ['false', () => trackFor(SPEC_M1, 120, false)],
      ['0', () => trackFor(SPEC_M1, 120, 0)],
      ["''", () => trackFor(SPEC_M1, 120, '')],
      ['NaN', () => trackFor(SPEC_M1, 120, Number.NaN)],
    ]
    for (const [label, drive] of drives) {
      const got = drive()
      expect(
        got,
        `M-12/§2.3 item 1(a) — \`empty\` driven as ${label} with size 120 returns "120px", never the empty token`,
      ).toBe('120px')
    }
  })

  it('M-13 §3.1 — a NON-EMPTY zone (`isEmpty({a:3,b:1}, \'a\')` ⇒ false)', async () => {
    const { isEmpty } = await surface('M-13 §2.3 item 2(b)')
    expect(isEmpty({ a: 3, b: 1 }, 'a'), 'M-13 — isEmpty({a:3,b:1}, "a") is false: a non-zero own value is not empty').toBe(false)
  })

  it('M-14 §3.1 — an EMPTY zone (`isEmpty({a:0,b:3}, \'a\')` ⇒ true)', async () => {
    const { isEmpty } = await surface('M-14 §2.3 item 2(b)')
    expect(isEmpty({ a: 0, b: 3 }, 'a'), 'M-14 — isEmpty({a:0,b:3}, "a") is true: an own value exactly 0 is empty').toBe(true)
    expect(isEmpty({ a: 0, b: 3 }, 'b'), 'M-14 — the OTHER key of the same census is non-empty (the read is per-key)').toBe(false)
  })

  it('M-15 §3.1 — the `-0` census value is EMPTY (`-0 === 0`)', async () => {
    const { isEmpty } = await surface('M-15 §2.3 item 2(i) / §0A note 4')
    const census: Record<string, unknown> = { a: -0 }
    expect(Object.is(census['a'], -0), 'M-15 — the census really carries `-0` under its own key').toBe(true)
    expect(
      isEmpty(census, 'a'),
      'M-15/§2.3 item 2(i) — the comparison is `=== 0` on the OWN value, so a `-0` census value is EMPTY (the isEmpty half of §0A note 4)',
    ).toBe(true)
    expect(isEmpty({ a: 0 }, 'a'), 'M-15 — and a plain `0` own value is empty for the same reason').toBe(true)
  })

  it('M-16 §3.1 — a `Map` census IS supported (`Map.get`), the one supported non-record shape', async () => {
    const { isEmpty } = await surface('M-16 §2.3 item 2(a) / §0A note 3')
    const census = new Map<unknown, unknown>([
      ['a', 0],
      ['b', 2],
    ])
    expect(isEmpty(census, 'a'), 'M-16 — a Map whose get returns exactly 0 for the key is EMPTY').toBe(true)
    expect(isEmpty(census, 'b'), 'M-16 — and a non-zero Map value is NOT empty').toBe(false)
    expect(isEmpty(new Map(), 'a'), 'M-16 — an empty Map owns no key ⇒ false (absence is not emptiness)').toBe(false)
  })

  it('M-17 §3.1 — a record census is read as OWN properties only (null-prototype and plain objects both answer)', async () => {
    const { isEmpty } = await surface('M-17 §2.3 item 2(b)(iii)')
    const nullProto = Object.assign(Object.create(null), { a: 0 })
    expect(
      isEmpty(nullProto, 'a'),
      'M-17 — an `Object.create(null)` census carrying an own `a: 0` answers true (no prototype read is needed for an own key)',
    ).toBe(true)
    const plain: Record<string, unknown> = { a: 0 }
    expect(isEmpty(plain, 'a'), 'M-17 — a plain-object census carrying an OWN `a: 0` answers true').toBe(true)
    expect(
      isEmpty({ b: 1 }, 'a'),
      'M-17 — the prototype-chain read is never taken: a record that does not OWN the key answers false',
    ).toBe(false)
  })

  it('M-18 §3.1 — two calls, identical arguments, identical results (both functions; no state is carried between calls)', async () => {
    const { isEmpty, trackFor } = await surface('M-18 §2.4 item 5 / I-3')
    const t1 = trackFor(SPEC_M1, 120, false)
    const t2 = trackFor(SPEC_M1, 120, false)
    expect(t2, `M-18 — trackFor is deterministic: ${brief(t1)} then ${brief(t2)}`).toEqual(t1)
    expect(t2 === t1, 'M-18/§3.1 — the two strings are `===` equal').toBe(true)
    const e1 = isEmpty({ a: 0, b: 3 }, 'a')
    const e2 = isEmpty({ a: 0, b: 3 }, 'a')
    expect(e2, `M-18 — isEmpty is deterministic: ${brief(e1)} then ${brief(e2)}`).toEqual(e1)
    expect(e2 === e1, 'M-18/§3.1 — the two booleans are `===` equal').toBe(true)
  })
})

// ===========================================================================
// F-1..F-8 — §3.2 the documented non-happy states. **There is NO refusal
// domain: every outcome here is a VALUE** (`§2.3` item 4, `§4.4 S-3`).
// ===========================================================================
describe('F — §3.2 the documented fail-states (every outcome is a VALUE)', () => {
  it('F-1 §3.2 — a MALFORMED SPEC returns `\'\'` in every case, never a throw, never the empty token, never a default', async () => {
    const { trackFor } = await surface('F-1 §2.3 item 1(d)')
    const malformed: ReadonlyArray<readonly [string, unknown]> = [
      ['null', null],
      ['undefined', undefined],
      ['the number 42', 42],
      ["the string 'x'", 'x'],
      ['an array', []],
      ['a record missing all three fields', {}],
      ['a non-string `trackProp`', { trackProp: 1, unit: 'px', emptyToken: '0px' }],
      ['a non-string `unit`', { trackProp: '--a', unit: 2, emptyToken: 'x' }],
      ['a non-string `emptyToken`', { trackProp: '--a', unit: 'px', emptyToken: 3 }],
      ['a throwing `emptyToken` accessor', throwingAccessorSpec('emptyToken')],
      ['a throwing `unit` accessor', throwingAccessorSpec('unit')],
    ]
    for (const [label, spec] of malformed) {
      for (const [sizeLabel, size] of [
        ['120', 120],
        ['0', 0],
        ['-1', -1],
        ['NaN', Number.NaN],
      ] as const) {
        for (const empty of [undefined, true] as const) {
          const got = trackFor(spec, size, empty)
          expect(
            got,
            `F-1/§2.3 item 1(d) — the rule is: '' is returned iff the spec is not a usable record OR any of the three ` +
              `fields is unreadable or is not a string. Spec: ${label}, size: ${sizeLabel}, empty: ${brief(empty)} ⇒ '' ` +
              `(never the empty token, never a fabricated default, never a throw). The SAME string is returned for all ` +
              `three field failures deliberately: this unit has no diagnostic vocabulary (no per-field distinction), ` +
              `because a per-field distinction would be a refusal domain this contract does not have (§2.3 item 4)`,
          ).toBe('')
        }
      }
    }
  })

  it('F-2 §3.2 — a NON-REPRESENTABLE SIZE returns `spec.emptyToken` VERBATIM for every enumerated class', async () => {
    const { trackFor } = await surface('F-2 §2.3 item 1(b)/item 3')
    const spec: TrackSpec = { trackProp: '--f2', unit: 'SENTINEL-UNIT', emptyToken: 'SENTINEL-EMPTY' }
    for (const [label, size] of NON_REPRESENTABLE_SIZES) {
      const got = trackFor(spec, size, false)
      expect(
        got,
        `F-2/§2.3 item 1(b) — ${label} is not a finite non-negative number ⇒ spec.emptyToken VERBATIM (no throw, no ` +
          `'NaN' string, no 'Infinity' string, no numeric coercion, no parse, no valueOf/Symbol.toPrimitive call)`,
      ).toBe(spec.emptyToken)
      expect(got.includes(spec.unit) && spec.unit !== '', `F-2 — the unit sentinel does not occur in the result for ${label}`).toBe(false)
    }
  })

  it('F-3 §3.2 — an ABSENT zone answers `false`: absence and emptiness are different facts', async () => {
    const { isEmpty } = await surface('F-3 §2.3 item 2(ii)')
    expect(isEmpty({ a: 0 }, 'zzz'), 'F-3 — isEmpty({a:0}, "zzz") is false').toBe(false)
    expect(isEmpty({}, 'a'), 'F-3 — isEmpty({}, "a") is false').toBe(false)
    const noKey = new Map<unknown, unknown>([['other', 0]])
    expect(isEmpty(noKey, 'a'), 'F-3 — a Map without the key answers false').toBe(false)
    expect(
      censusSnapshot(noKey),
      'F-3 — nothing is created, defaulted or memoized into the census by the absent lookup',
    ).toBe('keys=[] values=[] proto=other-proto frozen=false mapSize=1 setSize=n/a')
  })

  it('F-4 §3.2 — a NON-RECORD census or a non-string `zoneId` answers `false` in every case (the ARRAY index read and the SET membership read are NOT this contract’s meaning)', async () => {
    const { isEmpty } = await surface('F-4 §2.3 item 2(c) / §0A note 3')
    for (const [label, census] of NON_RECORD_CENSUSES) {
      const got = isEmpty(census, 'a')
      expect(
        got,
        `F-4/§2.3 item 2(c) — a census driven as ${label} is a NON-record and answers false (no throw). ` +
          `For the ARRAY and the SET the reason is stated: an array's index read and a set's membership would give a ` +
          `zoneId a meaning this contract does NOT define (§0A note 3 — the second-authority hazard V-13 names)`,
      ).toBe(false)
    }
    for (const [label, zoneId] of NON_STRING_ZONE_IDS) {
      const got = isEmpty({ a: 0 }, zoneId)
      expect(
        got,
        `F-4/§2.3 item 2(c) — a non-string zoneId (${label}) against a valid record census answers false, even though the key 'a' is empty in that census`,
      ).toBe(false)
    }
    // The record branch's own guard, asserted rather than assumed: the SAME
    // census answers `true` for the STRING key and `false` for the others.
    expect(isEmpty({ a: 0 }, 'a'), 'F-4 — the string key still answers true, so the row above is not vacuous').toBe(true)
    expect(
      isEmpty(['z'], '0'),
      'F-4/§0A note 3 — an array is deliberately NOT an index-read census: if it were, the zoneId "0" would mean “the array has a first slot”, a meaning this contract does not define',
    ).toBe(false)
    expect(
      isEmpty(new Set(['a']), 'a'),
      'F-4/§0A note 3 — a Set is deliberately NOT a membership census: membership ⇒ non-empty would be this mechanism inventing a policy',
    ).toBe(false)
  })

  it('F-5 §3.2 — a HOSTILE record answers `false`, never throws, never returns a prototype member and is NEVER MUTATED', async () => {
    const { isEmpty } = await surface('F-5 §2.3 item 2(i)(iii)(v)')
    // (1) prototype-only keys: NOT own keys ⇒ false.
    const plain: Record<string, unknown> = { a: 3 }
    for (const protoKey of ['constructor', 'toString', '__proto__', 'hasOwnProperty', 'valueOf'] as const) {
      expect(
        isEmpty(plain, protoKey),
        `F-5/§2.3 item 2(iii) — '${protoKey}' exists only on the prototype chain, so it is NEVER read: an Object.prototype member is not an answer about the census`,
      ).toBe(false)
    }
    const protoBefore = Object.getPrototypeOf(plain)
    expect(
      protoBefore,
      'F-5 — the `__proto__`-shaped lookup did not modify the census’s prototype (the census is not mutated)',
    ).toBe(Object.prototype)
    expect(Object.is(Object.getPrototypeOf(plain), Object.prototype), 'F-5 — `Object.getPrototypeOf` is unchanged (the accessor-write hazard)').toBe(
      true,
    )
    // (2) an own accessor that throws ⇒ false, no propagation.
    const throwing = throwingAccessorRecord('a')
    expect(
      isEmpty(throwing, 'a'),
      'F-5/§2.3 item 2(v) — an unreadable value (an own accessor that throws) is caught and treated as not-empty, never propagated',
    ).toBe(false)
    expect(isEmpty(throwing, 'b'), 'F-5 — the readable own key of the same census still answers normally (b: 1 ⇒ false)').toBe(false)
    // (3) a Proxy whose traps throw ⇒ false.
    const proxy = hostileProxy()
    for (const zoneId of ['a', 42, Symbol('p')] as const) {
      expect(
        isEmpty(proxy, zoneId),
        `F-5/§2.3 item 2(v) — a Proxy whose get/has/getOwnPropertyDescriptor throw answers false for ${brief(zoneId)}, never a throw`,
      ).toBe(false)
    }
    // (4) a Map whose get throws ⇒ false.
    expect(isEmpty(throwingGetMap(), 'a'), 'F-5/§2.3 item 2(v) — a Map whose `get` throws answers false, never a throw').toBe(false)
  })

  it("F-6 §3.2 — `unit: ''` is the BARE-NUMBER form, not a failure", async () => {
    const { trackFor } = await surface('F-6 §2.4 item 1 / §0A note 5(b)')
    const got = trackFor({ trackProp: '--r', unit: '', emptyToken: 'none' }, 2, false)
    expect(got, 'F-6 — the numeric text alone: this is the documented bare-number form and the reason NO `format` discriminator exists').toBe(
      '2',
    )
    expect(got, 'F-6 — the caller’s emptyToken is not appended by the mechanism').not.toBe('none')
  })

  it('F-7 §3.2 — `empty` truthy with an INVALID size too: limb (a) decides and limb (b) is never reached', async () => {
    const { trackFor } = await surface('F-7 §2.3 item 1(a)')
    const invalid: ReadonlyArray<readonly [string, unknown]> = [
      ['NaN', Number.NaN],
      ['-3', -3],
      ["the numeric string '12'", '12'],
    ]
    for (const [label, size] of invalid) {
      const got = trackFor(SPEC_M1, size, true)
      expect(
        got,
        `F-7 — with empty = true and an invalid size (${label}) the result is STILL spec.emptyToken: a module that inspects the SIZE first and returns a different token for an invalid size fails HERE`,
      ).toBe(SPEC_M1.emptyToken)
    }
  })

  it('F-8 §3.2 — a spec whose three fields are all `\'\'`: `\'0\'` then `\'\'` (the two `\'\'` outcomes are the same string)', async () => {
    const { trackFor } = await surface('F-8 §2.3 item 4 / §2.4 item 2')
    const allEmpty: TrackSpec = { trackProp: '', unit: '', emptyToken: '' }
    const zero = trackFor(allEmpty, 0, false)
    const negative = trackFor(allEmpty, -1, false)
    expect(zero, 'F-8 — a legitimate empty-string numeric text: `0` ⇒ "0"').toBe('0')
    expect(negative, 'F-8 — a legitimate empty-string token: a negative size ⇒ the caller’s emptyToken, which is ""').toBe('')
    expect(
      zero === negative,
      'F-8/§7 item 7(iv) — the legitimate `emptyToken: \'\'` and the malformed-spec `\'\'` are the SAME string: a caller cannot distinguish them from one call, and this row states that rather than implying a diagnostic channel',
    ).toBe(false)
    expect(trackFor(null, 0, false), 'F-8 — the malformed-spec class returns the same `\'\'` (F-1)').toBe('')
  })
})

// ===========================================================================
// R-1..R-7 — §3.4 the STATIC rows. Each reads the unit's own FILES (the harness
// may read files; the MODULE may not — `R-3`), each carries a POSITIVE control
// proving the scanner can fail, and each states its scan scope (`§4.4 S-7`).
// ===========================================================================
describe('R — §3.4 the static rows (the §2.2 prohibition table’s ids)', () => {
  it('R-1 §3.4 — the anti-evasion VOCABULARY row: no consumer vocabulary and no banned literal as a mechanism constant (comments scanned, boundary rule, assembly closed)', () => {
    const raw = moduleSource('R-1 §2.2 P-1/P-2')
    // (1)+(2) the MODULE half is the WHOLE module file, comments included.
    const violations = vocabularyViolations(raw)
    expect(
      violations,
      `R-1/§2.2 P-1 (S-7): no BOUNDED occurrence of the consumer vocabulary — raw, in a comment, or REASSEMBLED out of ` +
        `literals/identifiers — may appear anywhere in the module: ${JSON.stringify(violations)}. The module’s own ` +
        `legitimate names that CONTAIN a spelling as a substring ('zoneId', 'ZoneCensus' — both declared by §2.1) are a ` +
        `stated BOUNDARY, not a violation; a BOUNDED spelling is one.`,
    ).toEqual([])
    const literals = literalViolations(stripComments(raw))
    expect(
      literals,
      `R-1/§2.2 P-1 (S-1's class) — the module carries NO banned literal as a mechanism constant in its CODE: ${JSON.stringify(
        literals,
      )}. The spelling is legal ONLY as a drive's own data (inside this row's controlled corpora), and the mechanism ` +
        `must not know that an empty token may be one: the emptyToken is caller data (§2.4 item 2).`,
    ).toEqual([])
    // The BOUNDARY RULE itself, asserted rather than assumed: ordinary words that
    // CONTAIN a spelling are NOT hits.
    expect(
      vocabularyViolations('const table = 1; const stable = 2; const IMMUTABLE = 3;'),
      'R-1/§3.4 item (ii) — `table`/`stable`/`IMMUTABLE` are NOT violations: a hit is a BOUNDED token, never an unbounded substring',
    ).toEqual([])
    expect(
      vocabularyViolations(VOCAB_BOUNDARY_CONTROL),
      'R-1/§3.4 item (ii) — two ordinary word chunks adjacent in the assembled view are a token BOUNDARY, not a spelling assembled out of them',
    ).toEqual([])
    expect(
      vocabularyViolations(VOCAB_NEGATIVE_CONTROL),
      'R-1 NEGATIVE control — this unit’s own legitimate text (the two value export names, the three spec field names, the census parameter name, the type name §2.1 declares, a diagnostic sentence) PASSES the scan',
    ).toEqual([])
    // THE FILE HALF, RE-SCOPED, with the reason stated: this file MUST carry the
    // vocabulary inside its own control DATA and its assertion messages, so a
    // whole-file scan of the test file can only fail (the sibling `R-17` form).
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `R-1 POSITIVE control (${shape}) FAILS the scan — the row is otherwise UNFALSIFIED and must not be filed (S-7)`,
      ).toBeGreaterThan(0)
    }
    expect(
      literalViolations(`${'const'} d = "${['0', 'px'].join('')}"`).length,
      'R-1 POSITIVE control (the banned literal, in code) FAILS `literalViolations` — so that scanner is falsifiable too',
    ).toBeGreaterThan(0)
  })

  it('R-2 §3.4 — the forbidden-ACCESS row: no access rooted in a banned realm token or an alias of one, and no ambient read for a value', () => {
    const raw = moduleSource('R-2 §2.2 P-4/P-6')
    const code = stripComments(raw)
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = AMBIENT_RULES
    expectNoStaticHits(code, rules, 'R-2 §3.4')
    // The ALIAS class: a binding whose initialiser is a banned realm token, then
    // an access through that binding (`const g = globalThis; g.document`).
    const aliases = [...code.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(document|window|globalThis|self)\b/g)].map(
      (m) => m[1],
    )
    expect(
      aliases,
      `R-2 (S-7): no alias of a banned realm token exists (an alias is the SAME violation as the token): ${JSON.stringify(aliases)}`,
    ).toEqual([])
    // THE STATED LIMIT: a blanket `[expr]` ban is NOT asserted and is NOT
    // claimed — a locally constructed object's computed access and ordinary array
    // indexing carry no banned token and are deliberately not banned.
    expect(
      /\w+\s*\[/.test('const first = collected[index]'),
      'R-2 STATED LIMIT — ordinary array indexing (`collected[index]`) carries no banned token and is NOT banned (a row asserting “no [expr] at all” FAILS this row’s own text)',
    ).toBe(true)
    // The POSITIVE control: the scanner fails for each evading form.
    const controls: ReadonlyArray<readonly [string, string]> = [
      ['a raw realm token', `const d = ${['doc', 'ument'].join('')}`],
      ['an ASSEMBLED realm token', `const d = globalThis[${['"doc"', '"ument"'].join(' + ')}]`],
      ['a realm-rooted computed access', `${['global', 'This'].join('')}[name]`],
      ['an eval route', `${['ev', 'al'].join('')}('return this')`],
      ['a constructor route', `({}).constructor.constructor('return this')()`],
    ]
    for (const [label, fixture] of controls) {
      const hits = rules.some(({ re }) => staticHits(fixture, re).length > 0)
      const aliasHits = [...fixture.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(document|window|globalThis|self)\b/g)]
      expect(
        hits || aliasHits.length > 0,
        `R-2 POSITIVE control (${label}) must FAIL the scan — a scanner that passes a module spelling it is UNFALSIFIED and must not be filed`,
      ).toBe(true)
    }
  })

  it('R-3 §3.4 — the IMPORT-BOUNDARY row: `src/shared/zones.ts` imports NOTHING (not even a type-only import)', () => {
    const raw = moduleSource('R-3 §2.2 P-5')
    const code = stripComments(raw)
    expect(
      staticHits(code, /\bimport\b/),
      'R-3/§2.2 P-5 — ANY import statement at all FAILS this row: no `src/main/**`, no `src/renderer/**`, no `electron`, no `node:*` (including `node:fs`), no `provident-ssr`, no sibling mechanism module, and NOT EVEN a type-only import (§0 ruling 4: one authority over tokens)',
    ).toEqual([])
    expect(
      staticHits(code, /\brequire\s*\(/),
      'R-3 — a CommonJS require is an import statement and FAILS the row too',
    ).toEqual([])
    expect(
      staticHits(code, /\bimport\s*\(/),
      'R-3 — a dynamic import is an import statement and FAILS the row',
    ).toEqual([])
    // POSITIVE control: a type-only import — the weakest legitimate form
    // anywhere else in this repo — must FAIL here, so the row is not satisfied by
    // scanning for value imports only.
    const control = `${['im', 'port'].join('')} type { X } from './sibling.js'\nconst y = X`
    expect(
      staticHits(control, /\bimport\b/).length,
      'R-3 POSITIVE control — a TYPE-ONLY import fails the scan (this unit may import nothing at all)',
    ).toBeGreaterThan(0)
    // The companion claim, asserted so the row is not silent about it: at the
    // time this red set runs, the module is imported by NO `src/**` file (§5.1).
    const importers = walkSourceFiles()
      .filter((rel) => rel !== 'src/shared/zones.ts')
      .filter((rel) => /from\s+['"][^'"]*shared\/zones(\.js)?['"]/.test(stripComments(readFileSync(`${REPO_ROOT}/${rel}`, 'utf8'))))
    expect(
      importers,
      `R-3/§5.1 — at RED time \`src/shared/zones.ts\` is imported by NO \`src/**\` file (a consumer would be a later unit's row, with its own spec): ${JSON.stringify(
        importers,
      )}`,
    ).toEqual([])
  })

  it('R-4 §3.4 — the DIFF-SCOPE row: the unit’s change set stays inside §5.1’s allow-list and outside its DENIED set', () => {
    // -----------------------------------------------------------------------
    // THE SCOPE ASSERTION, RE-EXPRESSED AGAINST THE UNIT'S CHANGE SET. The
    // DENIED set binds ABSOLUTELY: any path in it FAILS the row, whatever its
    // content. A non-denied path outside the allow-list is a FINDING for the
    // adversarial pass, not an automatic FAIL — a unit's own mandatory gate
    // artifacts must be committable (RCA-8(a)). A `git status`-ONLY probe is
    // VACUOUS after any commit, so the PRIMARY census is the COMMITTED range
    // anchored at the commit that ADDED this file; while that commit does not
    // exist yet (the RED state — nothing is committed, RCA-8(a)), the row falls
    // back to the working-tree census and SAYS SO, because a probe that silently
    // passed on an empty range would be the vacuity the re-scope exists to close.
    // -----------------------------------------------------------------------
    const ALLOWED: readonly string[] = [
      'src/shared/zones.ts',
      'tests/zones.test.ts',
      'docs/specs/zones.md',
      'docs/next-steps.md',
      'docs/decisions.md',
      'docs/pending.md',
      'docs/FORKER.md',
      'docs/defects.md',
      'docs/HANDOFF.md',
    ]
    /** This unit's own `*-greens.md` artifact (RCA-4's gate-5 blind-greens set). */
    const UNIT_GREENS = /^docs\/specs\/zones[^/]*-greens\.md$/
    /** This unit's own gate-7 review record under `archive/reviews/`. */
    const UNIT_REVIEW_RECORD = /^archive\/reviews\/[^/]*(U-ZONES|zones)[^/]*\.md$/
    const inScope = (path: string): boolean =>
      ALLOWED.includes(path) || UNIT_GREENS.test(path) || UNIT_REVIEW_RECORD.test(path)
    /** **§5.1's “Outside the scope, ALWAYS” DENIED set** — these bind absolutely.
     *  A pure `src/shared/` arithmetic module may touch none of them: the
     *  renderer/main trees, the shim, the shared types, the build/config surface,
     *  a sibling unit's artifacts or the out-of-repo package. */
    const DENIED: readonly string[] = [
      'src/renderer/',
      'src/main/',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'package.json',
      'package-lock.json',
      'scripts/',
      'node_modules/',
      '../Preempt-Providence/',
    ]
    const DENIED_PATTERNS: readonly RegExp[] = [
      /^tests\/(?!zones\.test\.ts$)/,
      /^docs\/specs\/(?!zones[^/]*-greens\.md$).*-greens\.md$/,
      /^archive\/reviews\/(?!.*(U-ZONES|zones)).*\.md$/,
    ]
    const isDenied = (path: string): boolean =>
      DENIED.some((d) => path === d || path.startsWith(d)) || DENIED_PATTERNS.some((re) => re.test(path))
    const SCOPE_TEXT = `${ALLOWED.join(
      ' + ',
    )} + this unit's own docs/specs/zones*-greens.md + this unit's own review record under archive/reviews/`
    const committed = committedChangeSet()
    if (committed !== null) {
      expect(
        committed.paths.length,
        `R-4/§5.1 — the unit's committed range (${committed.range}) is NON-EMPTY: a vacuous census cannot pass this row`,
      ).toBeGreaterThan(0)
      for (const path of committed.paths) {
        expect(
          isDenied(path),
          `R-4/§5.1 — '${path}' was COMMITTED inside this unit's range ${committed.range} and is in the DENIED set: a boundary violation whatever its content. The committed change set was: ${JSON.stringify(
            committed.paths,
          )}`,
        ).toBe(false)
      }
      expect(
        committed.paths.filter((p) => ['src/shared/zones.ts', 'tests/zones.test.ts', 'docs/specs/zones.md'].includes(p)).length,
        `R-4 — at least ONE of the unit's three canonical artifacts (src/shared/zones.ts / tests/zones.test.ts / docs/specs/zones.md) is genuinely committed inside the range, so the census is a census of real unit work`,
      ).toBeGreaterThan(0)
    } else {
      const tree = treeChangeSet()
      expect(
        tree.paths.length,
        `R-4/§5.1 — the RED-time change set (the red-set commit does not exist yet, RCA-8(a)) is NON-EMPTY: ${JSON.stringify(
          tree.raw,
        )}`,
      ).toBeGreaterThan(0)
      expect(
        tree.paths.includes('tests/zones.test.ts'),
        `R-4/§5.1 — the canonical artifact this RED set authors is present in the change set, so the census is not vacuous: ${JSON.stringify(
          tree.paths,
        )}`,
      ).toBe(true)
    }
    const treePaths = treeChangeSet().paths
    for (const path of treePaths) {
      expect(
        isDenied(path),
        `R-4/§5.1 — '${path}' is in the DENIED set and is present in the WORKING TREE: a boundary violation whatever its content`,
      ).toBe(false)
    }
    for (const path of treePaths) {
      if (isDenied(path)) continue
      expect(
        inScope(path) || /^docs\/specs\/[^/]*\.md$/.test(path) || /^docs\/[^/]*\.md$/.test(path),
        `R-4/§5.1 — '${path}' is outside this unit's diff scope (the allow-list is: ${SCOPE_TEXT}, plus tracker/spec annotation)`,
      ).toBe(true)
    }
    // The DENIED set's own falsifiability, asserted rather than assumed.
    for (const probe of [
      'src/main/main.ts',
      'src/renderer/renderer.ts',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'package.json',
      'scripts/mcp-cli.mjs',
      'tests/layout-projection.test.ts',
      'docs/specs/projection-greens.md',
    ]) {
      expect(isDenied(probe), `R-4 — the DENIED set really rejects '${probe}' (the row’s falsifiable half)`).toBe(true)
    }
  })

  it('R-5 §3.4 — the EXPORT-CENSUS row: SET EQUALITY over the TWO value exports, and the type-only name `TrackSpec` through leg 4', async () => {
    const { mod } = await surface('R-5 §2.1 export census')
    const valueExports = Object.keys(mod).filter((k) => k !== 'default').sort()
    expect(
      valueExports,
      'R-5(a)/§2.1 — the module’s RUNTIME exports are EXACTLY `isEmpty` and `trackFor` (THREE exported names = TWO value exports + ONE type declaration; a THIRD value export fails this set equality, and so does a rename — the census is a SET claim, never a bare count)',
    ).toEqual(['isEmpty', 'trackFor'])
    expect(
      Object.keys(mod).includes('TrackSpec'),
      'R-5(b)/§2.1 — a type-only name is ERASED at run time, so it is not a runtime key (its half is the compile-time claim below, §5.2 leg 4)',
    ).toBe(false)
    // The positive control: a namespace carrying a third value export FAILS the
    // same predicate, so the assertion above is not vacuous.
    const thirdValueExport = { isEmpty: (): boolean => false, trackFor: (): string => '', extra: 1 }
    expect(
      Object.keys(thirdValueExport).sort(),
      'R-5(a) POSITIVE control — a namespace with a THIRD value export does not equal the pinned set',
    ).not.toEqual(['isEmpty', 'trackFor'])
    // (b) THE TYPE-ONLY NAME, asserted at the TYPE level: this file does not
    // compile unless `src/shared/zones.ts` exports `TrackSpec` (§5.2 leg 4).
    const specFromModuleType: ModuleTrackSpec = { trackProp: '--t', unit: 'px', emptyToken: '0px' }
    expect(
      Object.keys(specFromModuleType).sort(),
      'R-5(b)/§2.1 — `TrackSpec` is exported by the module and carries exactly the three fields §2.1’s block declares (trackProp · unit · emptyToken): this row does not COMPILE unless that type exists (leg 4)',
    ).toEqual(['emptyToken', 'trackProp', 'unit'])
  })

  it('R-6 §3.4 — the NO-SHIM / NO-NEW-SURFACE row: the shim gains no member and the five-seam negative holds by SET EQUALITY AGAINST THE NAMES', () => {
    const code = stripComments(moduleSource('R-6 §2.2 P-5/P-6'))
    const rules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a tool/resource/group registration', re: /\b(registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|ALL_TOOLS|ALL_RESOURCES|RpcMethod)\b/ },
      { what: 'an IPC surface', re: /\b(ipcRenderer|ipcMain|RpcRequest)\b/ },
      { what: 'a shim reference (this unit needs no shim member — H-r5)', re: /\bdom-shim\b/ },
      { what: 'an import from the seam trees', re: /\bfrom\s+['"][^'"]*(main|renderer)\// },
    ]
    expectNoStaticHits(code, rules, 'R-6 §3.4')
    // The scanner's own falsifiability: each shape must be caught.
    const controls: ReadonlyArray<readonly [string, string]> = [
      ['a registration', `registerTool('provident.zones')`],
      ['a group-table read', `const g = VALID_GROUPS`],
      ['a shim reference', `import { mountEl } from './dom-shim.js'`],
    ]
    for (const [label, fixture] of controls) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-6 POSITIVE control (${label}) must FAIL the scan — the row is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // (1) `src/shared/dom-shim.ts` is untouched by this unit's change set.
    const tree = treeChangeSet()
    expect(
      tree.paths.filter((p) => p === 'src/shared/dom-shim.ts'),
      `R-6/§0 ruling 8 (H-r5) — \`src/shared/dom-shim.ts\` gains no member because this unit’s change set never touches it: ${JSON.stringify(
        tree.paths,
      )}`,
    ).toEqual([])
    // (2) the five-seam negative, by SET EQUALITY AGAINST THE NAMES (never a
    // bare count — `§4.4 S-8`'s S-14 class). Each seam is read from its OWN live
    // declaration and compared with the pinned NAME SET.
    const toolsLive = readArrayLiteral('src/main/mcp-server.ts', /static\s+readonly\s+ALL_TOOLS\s*:\s*string\[\]\s*=\s*\[/)
    const siblingPinned = readArrayLiteral('tests/engine-pin-version.test.ts', /const\s+PINNED_TOOL_SET\s*=\s*\[/)
    expect(
      siblingPinned.length,
      'R-6/§4.4 S-8 — the sibling name-complete row (`tests/engine-pin-version.test.ts` R-15) pins the 21 tool NAMES; this row cites it rather than re-authoring it',
    ).toBe(21)
    expect(
      toolsLive.sort(),
      `R-6/§2.2 P-5 — the LIVE \`ALL_TOOLS\` set equals the pinned 21-NAME set (a tool ADDED or REMOVED fails by name, not by count): ${JSON.stringify(
        toolsLive,
      )}`,
    ).toEqual([...siblingPinned].sort())
    const groupsLive = readArrayLiteral('src/main/security.ts', /const\s+VALID_GROUPS[^=]*=\s*new\s+Set\(\s*\[/)
    expect(
      groupsLive.sort(),
      'R-6/§2.2 P-5 — the LIVE `VALID_GROUPS` keeps its FIVE named members',
    ).toEqual(['code', 'dispatch', 'graph', 'module', 'read'])
    const mutatingLive = readArrayLiteral('src/renderer/renderer.ts', /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[/)
    expect(
      mutatingLive.sort(),
      'R-6/§2.2 P-5 — the LIVE `MUTATING_METHODS` keeps its SEVEN named entries (this unit adds no mutating IPC method)',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'])
    const rpcLive = readUnionMembers('src/shared/types.ts', /export\s+type\s+RpcMethod\s*=/)
    expect(
      rpcLive.length,
      'R-6/§2.2 P-5 — the LIVE `RpcMethod` union is name-complete in this census (21 members)',
    ).toBe(21)
    expect(
      new Set(rpcLive).size,
      'R-6 — the RpcMethod census is a SET (distinct members), so the count above is not a bag',
    ).toBe(21)
  })

  it('R-7 §3.4 — THE GEOMETRY ROW: no geometry-observation call and no geometry-shaped claim, in the module or in this file', () => {
    // THE MODULE HALF: the whole module file, comments included (a geometry call
    // in the module is the violation the row exists for).
    const raw = moduleSource('R-7 §2.3 item 7 / I-10')
    for (const re of GEOM_CALL_RES) {
      const hits = staticHits(raw, re)
      expect(
        hits,
        `R-7/§2.3 item 7 (I-10, A-14) — the module observes no geometry: ${JSON.stringify(hits)}. The arithmetic is provable here; ANY claim about the resolved geometry is UNPROVABLE in this repo today, and §5.2 offers no [U] row`,
      ).toEqual([])
    }
    // THE FILE HALF (re-scoped, with the reason stated): the tokens are held as
    // FRAGMENTS because this row must name what it bans — a whole-file scan that
    // read the joined spelling out of its own rule list could only fail. The half
    // that is genuinely assertable over this file is its RAW bytes, so it is the
    // half taken here.
    const own = readFileSync(TEST_FILE, 'utf8')
    for (const re of GEOM_CALL_RES) {
      const hits = staticHits(own, re)
      expect(
        hits,
        `R-7 — this unit's own test file takes no geometry observation either: ${JSON.stringify(hits)}`,
      ).toEqual([])
    }
    // The claim half: no row DESCRIPTION of this file may claim a resolution fact.
    const titles = [...own.matchAll(/\b(?:it|describe)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g)].map((m) => m[1])
    for (const re of GEOM_CLAIM_RES) {
      const hit = titles.find((t) => re.test(t))
      expect(
        hit,
        `R-7/§3.4 — no row description may claim a resolved-geometry / layout fact; the offending description was ${brief(hit)}`,
      ).toBeUndefined()
    }
    // POSITIVE controls: the scanner fails for a module that observes geometry
    // and for a description that claims it.
    const geometryCorpus = `${['const s = get', 'Computed', 'Style'].join('')}(el)\nconst w = el.${['offset', 'Width'].join('')}`
    expect(
      GEOM_CALL_RES.some((re) => staticHits(geometryCorpus, re).length > 0),
      'R-7 POSITIVE control — a corpus observing geometry FAILS the scanner (the row is otherwise unfalsified)',
    ).toBe(true)
    const claimCorpus = ['the track is ', 'render', 'ed at 120 pixels'].join('')
    expect(
      GEOM_CLAIM_RES.some((re) => re.test(claimCorpus)),
      'R-7 POSITIVE control — a description claiming a resolution fact FAILS the claim scanner',
    ).toBe(true)
    // NEGATIVE control: the unit's own legitimate vocabulary passes the claim
    // scanner (so the rule does not fail on ordinary words).
    expect(
      GEOM_CLAIM_RES.some((re) => re.test('the emitted token is a string and the arithmetic holds')),
      'R-7 NEGATIVE control — ordinary arithmetic wording is NOT a claim',
    ).toBe(false)
    // THE ROW'S STATED LIMIT (§3.4 R-7): a text scan cannot prove the ABSENCE of
    // a claim for all prose — it binds the two files it names, and §5.2's refusal
    // to offer a [U] row is the contract half.
  })
})

// ===========================================================================
// §2.2/§5.1 — the small file readers `R-3`/`R-6` need. The HARNESS may read
// files; the MODULE may not (`R-3`).
// ===========================================================================
function walkSourceFiles(): readonly string[] {
  return [
    'src/main/main.ts',
    'src/main/mcp-server.ts',
    'src/main/preload.ts',
    'src/main/security.ts',
    'src/renderer/renderer.ts',
    'src/shared/types.ts',
    'src/shared/dom-shim.ts',
    'src/shared/layout-projection.ts',
    'src/shared/slot-host.ts',
    'src/shared/owned-list-host.ts',
    'src/shared/mount-invariant-guard.ts',
    'src/shared/path-fork-cycle.ts',
    'src/shared/demo-envelope.ts',
  ].filter((rel) => existsSync(`${REPO_ROOT}/${rel}`))
}
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

// ===========================================================================
// §5.5.1 — THE REGISTER'S EXECUTION MACHINERY.
// Caps (uniform for the whole register): <=100 attempts per row, <=400 attempts
// in total, rows evaluated sequentially in register order, STOP AFTER 5
// CONSECUTIVE FAILURES (the running row's remaining attempts are abandoned and
// no further row starts). Each row's `it` title carries its row id AND its
// `S-ZN-*` strategy id, and each row logs its own record line so a read-only PBT
// audit can read attempts-run / held / broken / notStarted / registerStoppedAt
// per row from the output. **An un-run row FAILS — it never looks green.**
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
const registerRecords: RowRecord[] = []

/** The DECLARED term (`§5.5.1`) reconciled against the table this file actually
 *  drove — the reconciliation `§5.3` items 10/11 require. A row that NEVER
 *  STARTED is not reconciled here: its own `finish()` reports it as a FAILURE,
 *  which is the loud message a stopped red run must carry (never a silent pass). */
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

  /** The row's own attempts-run figure, readable by the row's body so the
   *  DECLARED term (§5.5.1) can be reconciled with the table actually driven —
   *  the reconciliation `§5.3` items 10/11 require of a DONE row. */
  attemptsRunPublic(): number {
    return this.attemptsRun
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
    registerRecords.push(record)
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

/** `S-ZN-SEED-1`'s generator: a hand-rolled 32-bit LCG whose constants are
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
// PRE-1..PRE-3 — HARNESS PRECONDITIONS (not spec rows).
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING pure module)', async () => {
    const existing = ['..', 'src', 'shared', 'layout-projection.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(
      typeof mod['project'],
      'PRE-1 — the computed-specifier import boundary resolves against an EXISTING module, so every module-absent row below fails as an ASSERTION and never as a collection error',
    ).toBe('function')
  })

  it('PRE-2 (harness) — the §5.5.1 register tables are the ones the spec specifies (seed, terms, caps, arithmetic)', () => {
    expect(SEED, 'the seed is the pinned literal §5.5.1 names').toBe(20260927)
    expect(LCG_A, 'the LCG multiplier is the pinned literal').toBe(1664525)
    expect(LCG_C, 'the LCG increment is the pinned literal').toBe(1013904223)
    expect(LCG_MOD, 'the LCG modulus is 2^32').toBe(4294967296)
    expect(REGISTER_ROW_CAP, 'the per-row cap is <=100').toBe(100)
    expect(REGISTER_TOTAL_CAP, 'the register cap is <=400').toBe(400)
    expect(CONSECUTIVE_FAILURE_CAP, 'the stop rule is 5 consecutive failures').toBe(5)
    // §5.5.1's EIGHT declared terms, printed in register order (`REGISTER-ATTEMPT-
    // TOTALS-PRINT-THEIR-TERMS`, ACTIVE): the total must be the SUM OF ITS OWN
    // TERMS, and the as-filed `400` was the mis-sum this check exists for.
    const declared: ReadonlyArray<readonly [string, number]> = [
      ['P-ZN-IM-1', 30],
      ['P-ZN-TP-1', 90],
      ['P-ZN-IM-2', 36],
      ['P-ZN-SM-1', 68],
      ['P-ZN-IM-3', 52],
      ['P-ZN-SM-2', 12],
      ['P-ZN-IM-4', 15],
      ['P-ZN-TP-2', 66],
    ]
    const total = declared.reduce((sum, [, n]) => sum + n, 0)
    expect(
      total,
      `PRE-2/§5.3 item 11 — the declared total is the SUM OF ITS OWN TERMS (30+90+36+68+52+12+15+66 = 369; the as-filed 400 was their mis-sum)`,
    ).toBe(369)
    expect(total, 'PRE-2/§5.5.1 — the total is under the <=400 register cap').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    for (const [row, n] of declared) {
      expect(n, `PRE-2/§5.5.1 — row ${row} is under the <=100 per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    // The tables this file actually drives, against the declared terms.
    expect(IM1_CLASSES.length, "P-ZN-IM-1's 20 size classes").toBe(20)
    expect(IM1_FLAG_DRIVES.length, "P-ZN-IM-1's 10 flag drives").toBe(10)
    expect(TP1_POOL.length, "P-ZN-TP-1's 20-shape pool, each counted once").toBe(20)
    expect(new Set(TP1_POOL.map((s) => s.id)).size, 'the 20 pool shapes are distinct').toBe(20)
    expect(TP1_FIXED_DRIVES.length, "P-ZN-TP-1's 50 fixed hostile pairings, itemized 5+2+2+2+1+4+4+30").toBe(50)
    expect(IM2_ZERO_VALUES.length, "P-ZN-IM-2's 6 zero-valued sizes").toBe(6)
    expect(IM3_CENSUS_SHAPES.length, "P-ZN-IM-3's 13 census shapes").toBe(13)
    expect(IM3_ZONE_IDS.length, "P-ZN-IM-3's 4 zoneId shapes").toBe(4)
    expect(SM1_SPEC_CLASSES.length, "P-ZN-SM-1's 4 spec classes").toBe(4)
    expect(SM1_SIZE_CLASSES.length, "P-ZN-SM-1's 4 size classifications").toBe(4)
    expect(SM1_EMPTY_SWEEP.length, "P-ZN-SM-1's 10 `empty` sweep values (5 truthy + 5 falsy)").toBe(10)
    expect(SM2_CALLER_OBJECTS.length, "P-ZN-SM-2's 3 caller objects").toBe(3)
    expect(SM2_ACCESS_PATTERNS.length, "P-ZN-SM-2's 2 access patterns").toBe(2)
    expect(SM2_TWIN_FORMS.length, "P-ZN-SM-2's 2 frozen/unfrozen twin forms").toBe(2)
    expect(IM4_SPEC_SHAPES.length, "P-ZN-IM-4's 3 spec shapes").toBe(3)
    expect(IM4_SIZES.length, "P-ZN-IM-4's 5 size values").toBe(5)
    expect(TP2_POOL.length, "P-ZN-TP-2's 28-value pool").toBe(28)
    const draws = TP2_DRAW_INDICES.length
    expect(draws, "P-ZN-TP-2's 66 pinned-seed draws").toBe(66)
    expect(
      new Set(TP2_DRAW_INDICES).size,
      'the 66 draws are a DRAW, never a sweep: no row may assert "all 28 drawn" (§5.5.1 honesty item 5) — the distinct-member count is REPORTED, not asserted',
    ).toBeLessThanOrEqual(28)
    console.log(
      `§5.5.1 seed record :: ${JSON.stringify({
        seed: SEED,
        step: 'state_{n+1} = (state_n * 1664525 + 1013904223) mod 2^32, ONE step per draw, index = state_{n+1} mod pool.length',
        draws: draws,
        distinctMembersDrawn: new Set(TP2_DRAW_INDICES).size,
        poolSize: TP2_POOL.length,
      })}`,
    )
    // ---------------------------------------------------------------
    // ⟶ FINDINGS REPORTED IN PLACE (never tuned to green; §4.2 item 2, §7 item 12).
    // (1) `P-ZN-TP-1`'s TERMS DISAGREE BETWEEN THE TWO SPEC SITES: the register
    //     row's own strategy cell prints `40` pool drives (`20` shapes x `2`
    //     cycling axis bindings) + `50` fixed hostile pairings, itemized
    //     `5+2+2+2+1+4+4+30`; the "Attempt arithmetic" table prints
    //     `20 pool shapes x 3 cycling method-axis bindings = 60` + `30 fixed
    //     hostile pairings`. Both sum to the SAME row total (`90`), so the row is
    //     drivable and the declared figure is unambiguous — this file drives the
    //     strategy cell's decomposition and reports the disagreement.
    // (2) `P-ZN-SM-1`'s sweep term is under-specified: the cell prints "the `20`
    //     sweep drives cross `empty` in {5 truthy} and {5 falsy} with `C1 x S1`",
    //     which is 10 drives as literally written; the declared term is 20 and the
    //     row's own arithmetic needs 20 (`16 + 20 + 32 = 68`). This file drives
    //     the 10 values x 2 size classifications (S1 valid, S2 invalid) = 20,
    //     because the converse half of the property ("a truthy empty yields the
    //     empty token for ANY size") is exactly what the second classification
    //     probes — reported rather than guessed.
    // (3) `P-ZN-TP-2`'s pool carries a NEGATIVE member (`Number.MIN_SAFE_INTEGER +
    //     + 1` = -9007199254740990) while the row's own boundary text declares
    //     every draw "a finite non-negative number ... no draw may yield the empty
    //     token". The pinned seed SELECTS that member 3 times out of the 66 draws.
    //     The binding clause is `§2.3` item 1(b) (a negative size ⇒ the empty
    //     token), so the row asserts the DECISION TABLE's outcome for those three
    //     draws and reports the conflict; it does not guess which clause is wrong.
    // ---------------------------------------------------------------
    console.log(
      `§5.5.1 reported findings :: ${JSON.stringify({
        row: 'P-ZN-TP-1',
        finding: 'the strategy cell prints 40+50 while the Attempt-arithmetic table prints 60+30; both sum to 90',
      })}`,
    )
    console.log(
      `§5.5.1 reported findings :: ${JSON.stringify({
        row: 'P-ZN-SM-1',
        finding: 'the 20 sweep drives are 10 values as literally printed; driven as 10 values x 2 size classifications = 20',
      })}`,
    )
    console.log(
      `§5.5.1 reported findings :: ${JSON.stringify({
        row: 'P-ZN-TP-2',
        finding: 'pool member 23 (Number.MIN_SAFE_INTEGER + 1) is negative; drawn 3 of 66 times',
        drawsSelectingIt: TP2_DRAW_INDICES.map((idx, d) => ({ draw: d, index: idx })).filter((x) => x.index === 22),
      })}`,
    )
  })

  it('PRE-3 (harness) — the R-1/R-2/R-6 scanners detect their evasions and pass the legitimate text (their own controls)', () => {
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `PRE-3/S-7 — the vocabulary scan MUST fail for a module carrying the vocabulary ${shape}: the row is otherwise UNFALSIFIED and must not be filed`,
      ).toBeGreaterThan(0)
    }
    expect(
      vocabularyViolations(VOCAB_NEGATIVE_CONTROL),
      'PRE-3 — this unit’s own legitimate text PASSES the vocabulary scan',
    ).toEqual([])
    expect(
      vocabularyViolations(VOCAB_BOUNDARY_CONTROL),
      'PRE-3 — the BOUNDARY rule holds in the assembled view: two ordinary word chunks are a token boundary, not a spelling',
    ).toEqual([])
    expect(
      vocabularyViolations('const table = 1; const stable = 2; const IMMUTABLE = 3;'),
      'PRE-3 — ordinary words CONTAINING a spelling are not violations (this is why the scan is bounded)',
    ).toEqual([])
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER'S TABLES (the data the eight rows below drive).
// ===========================================================================
type PoolShape = { id: string; make: () => unknown }

// --- P-ZN-IM-1 (`S-ZN-EMPTY-1`): the 20 size classes + the 10 flag drives.
const IM1_SPEC_A: TrackSpec = { trackProp: '--p', unit: 'SENTINEL-U', emptyToken: 'SENTINEL-A' }
const IM1_CLASSES: ReadonlyArray<{ id: string; size: unknown; spec: TrackSpec }> = [
  { id: '(1) NaN', size: Number.NaN, spec: IM1_SPEC_A },
  { id: '(2) +Infinity', size: Number.POSITIVE_INFINITY, spec: IM1_SPEC_A },
  { id: '(3) -Infinity', size: Number.NEGATIVE_INFINITY, spec: IM1_SPEC_A },
  { id: '(4) -1', size: -1, spec: IM1_SPEC_A },
  { id: '(5) -0.5', size: -0.5, spec: IM1_SPEC_A },
  { id: '(6) -Number.MIN_VALUE', size: -Number.MIN_VALUE, spec: IM1_SPEC_A },
  { id: "(7) '12'", size: '12', spec: IM1_SPEC_A },
  { id: "(8) '0'", size: '0', spec: IM1_SPEC_A },
  { id: '(9) 12n', size: 12n, spec: IM1_SPEC_A },
  { id: '(10) 0n', size: 0n, spec: IM1_SPEC_A },
  { id: "(11) Symbol('s')", size: Symbol('s'), spec: IM1_SPEC_A },
  { id: '(12) a function', size: (): number => 1, spec: IM1_SPEC_A },
  { id: '(13) null', size: null, spec: IM1_SPEC_A },
  { id: '(14) undefined', size: undefined, spec: IM1_SPEC_A },
  { id: '(15) {}', size: {}, spec: IM1_SPEC_A },
  { id: '(16) []', size: [], spec: IM1_SPEC_A },
  { id: '(17) true', size: true, spec: IM1_SPEC_A },
  { id: '(18) false', size: false, spec: IM1_SPEC_A },
  { id: "(19) -1 re-driven with emptyToken 'none'", size: -1, spec: { trackProp: '--p', unit: 'SENTINEL-U', emptyToken: 'none' } },
  { id: "(20) -1 re-driven with emptyToken ''", size: -1, spec: { trackProp: '--p', unit: 'SENTINEL-U', emptyToken: '' } },
]
type FlagDrive = { id: string; call: (trackFor: ZonesSurface['trackFor']) => string; expected: string }
const IM1_FLAG_DRIVES: readonly FlagDrive[] = [
  { id: 'truthy: true with size 120', call: (t) => t(IM1_SPEC_A, 120, true), expected: IM1_SPEC_A.emptyToken },
  { id: 'truthy: true with NaN', call: (t) => t(IM1_SPEC_A, Number.NaN, true), expected: IM1_SPEC_A.emptyToken },
  { id: 'truthy: true with -1', call: (t) => t(IM1_SPEC_A, -1, true), expected: IM1_SPEC_A.emptyToken },
  { id: 'truthy: true with 0', call: (t) => t(IM1_SPEC_A, 0, true), expected: IM1_SPEC_A.emptyToken },
  {
    id: 'truthy: true with a SECOND, different emptyToken sentinel (the token is caller data)',
    call: (t) => t({ trackProp: '--p', unit: 'SENTINEL-U', emptyToken: 'SENTINEL-B' }, 120, true),
    expected: 'SENTINEL-B',
  },
  { id: 'falsy: undefined (omitted) with size 120', call: (t) => t(IM1_SPEC_A, 120), expected: '120SENTINEL-U' },
  { id: 'falsy: null with size 120', call: (t) => t(IM1_SPEC_A, 120, null), expected: '120SENTINEL-U' },
  { id: 'falsy: false with size 120', call: (t) => t(IM1_SPEC_A, 120, false), expected: '120SENTINEL-U' },
  { id: 'falsy: 0 with size 120', call: (t) => t(IM1_SPEC_A, 120, 0), expected: '120SENTINEL-U' },
  { id: "falsy: '' with size 120", call: (t) => t(IM1_SPEC_A, 120, ''), expected: '120SENTINEL-U' },
]

// --- P-ZN-TP-1 (`S-ZN-TOTAL-1`): the 20-shape pool.
const TP1_VALID_SPEC: TrackSpec = { trackProp: '--t', unit: 'px', emptyToken: '0px' }
const TP1_POOL: readonly PoolShape[] = [
  { id: '(1) null', make: () => null },
  { id: '(2) undefined', make: () => undefined },
  { id: '(3) 42', make: () => 42 },
  { id: "(4) 'x'", make: () => 'x' },
  { id: '(5) true', make: () => true },
  { id: "(6) Symbol('s')", make: () => Symbol('s') },
  { id: '(7) 0n', make: () => 0n },
  { id: '(8) a function', make: () => (): number => 1 },
  { id: '(9) {}', make: () => ({}) },
  { id: '(10) []', make: () => [] },
  { id: '(11) {a: 0}', make: () => ({ a: 0 }) },
  { id: '(12) {a: 3}', make: () => ({ a: 3 }) },
  { id: '(13) Object.create(null) carrying a: 0', make: () => Object.assign(Object.create(null), { a: 0 }) },
  { id: '(14) a frozen {a: 0}', make: () => Object.freeze({ a: 0 }) },
  { id: "(15) new Map([['a', 0]])", make: () => new Map<unknown, unknown>([['a', 0]]) },
  { id: '(16) new Map()', make: () => new Map<unknown, unknown>() },
  { id: "(17) new Set(['a'])", make: () => new Set(['a']) },
  { id: '(18) a throwing-accessor record', make: () => throwingAccessorRecord('a') },
  { id: '(19) a hostile Proxy', make: () => hostileProxy() },
  { id: '(20) a valid TrackSpec', make: () => ({ trackProp: '--t', unit: 'px', emptyToken: '0px' }) },
]
type FixedDrive = { id: string; run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }) => string | null }
/** The 50 fixed hostile pairings, itemized exactly as `P-ZN-TP-1`'s cell prints
 *  them: `5+2+2+2+1+4+4+30`. */
const TP1_FIXED_DRIVES: readonly FixedDrive[] = [
  ...([Number.NaN, -1, 120, '12', null] as const).map((size, i) => ({
    id: `(19) hostile Proxy x trackFor, size ${brief(size)} (${i + 1}/5)`,
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      typeofCall(() => s.trackFor(hostileProxy(), size, false), 'string', 'trackFor'),
  })),
  {
    id: '(18) throwing-accessor record x trackFor with 120 (1/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      typeofCall(() => s.trackFor(throwingAccessorRecord('emptyToken'), 120, false), 'string', 'trackFor'),
  },
  {
    id: '(18) throwing-accessor record x isEmpty (2/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      typeofCall(() => s.isEmpty(throwingAccessorRecord('a'), 'a'), 'boolean', 'isEmpty'),
  },
  {
    id: '(20) a valid TrackSpec passed where a census belongs x isEmpty (⇒ false)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(TP1_VALID_SPEC, 'a'), false, 'isEmpty'),
  },
  {
    id: '(20) a valid TrackSpec x isEmpty on a Symbol zoneId (⇒ false)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(TP1_VALID_SPEC, Symbol('a')), false, 'isEmpty'),
  },
  {
    id: '(15) a Map with a throwing get x isEmpty',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(throwingGetMap(), 'a'), false, 'isEmpty'),
  },
  {
    id: '(15) a Map with a throwing get x trackFor',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      typeofCall(() => s.trackFor(throwingGetMap(), 120, false), 'string', 'trackFor'),
  },
  {
    id: '(11) {a: 0} x a Symbol zoneId (⇒ false)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty({ a: 0 }, Symbol('a')), false, 'isEmpty'),
  },
  ...(['a', 'zzz', 42, Symbol('a')] as const).map((zoneId) => ({
    id: `(13) Object.create(null) x zoneId ${brief(zoneId)} (${zoneId === 'a' ? 'true' : 'false'})`,
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(Object.assign(Object.create(null), { a: 0 }), zoneId), zoneId === 'a', 'isEmpty'),
  })),
  {
    id: '(14) the frozen {a: 0} x isEmpty (1/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(Object.freeze({ a: 0 }), 'a'), true, 'isEmpty'),
  },
  {
    id: '(14) the frozen {a: 0} x trackFor (2/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      typeofCall(() => s.trackFor(Object.freeze({ a: 0 }), 120, false), 'string', 'trackFor'),
  },
  {
    id: '(20) the frozen valid TrackSpec x isEmpty (1/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.isEmpty(Object.freeze(TP1_VALID_SPEC), 'a'), false, 'isEmpty'),
  },
  {
    id: '(20) the frozen valid TrackSpec x trackFor (2/2)',
    run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
      exactCall(() => s.trackFor(Object.freeze(TP1_VALID_SPEC), 120, false), '120px', 'trackFor'),
  },
  ...(['(1) null', '(2) undefined', '(3) 42', "(4) 'x'", "(6) Symbol('s')", '(7) 0n'] as const).flatMap((a) =>
    ['(9) {}', '(10) []', "(15) new Map([['a', 0]])", '(18) throwing-accessor record', '(19) hostile Proxy'].map((b) => ({
      id: `cross-product: ${a} as zoneId x ${b} as census`,
      run: (s: { isEmpty: ZonesSurface['isEmpty']; trackFor: ZonesSurface['trackFor'] }): string | null =>
        typeofCall(() => s.isEmpty(poolValue(b), poolValue(a)), 'boolean', 'isEmpty'),
    })),
  ),
]
function poolValue(id: string): unknown {
  const shape = TP1_POOL.find((s) => s.id === id)
  expect(shape !== undefined, `P-ZN-TP-1's pool holds the named shape ${id}`).toBe(true)
  return shape?.make()
}
function typeofCall(call: () => unknown, expected: 'string' | 'boolean', fn: string): string | null {
  let got: unknown
  try {
    got = call()
  } catch (e) {
    return `${fn} THREW: ${describeThrown(e)} — I-2: neither function ever throws, for any input`
  }
  if (typeof got !== expected) return `${fn} returned ${typeof got} (${brief(got)}), not ${expected} (I-1)`
  const again = call()
  if (again !== got) return `${fn} is not deterministic on a repeat call: ${brief(got)} then ${brief(again)} (I-3)`
  return null
}
function exactCall(call: () => unknown, expected: unknown, fn: string): string | null {
  let got: unknown
  try {
    got = call()
  } catch (e) {
    return `${fn} THREW: ${describeThrown(e)} — I-2: neither function ever throws`
  }
  if (got !== expected) return `${fn} returned ${brief(got)}, not ${brief(expected)}`
  return null
}

// --- P-ZN-IM-2 (`S-ZN-ZERO-1`): the 6 zero-valued sizes.
const IM2_ZERO_VALUES: ReadonlyArray<{ id: string; make: () => number; objectIsAsserted: boolean }> = [
  { id: '0', make: () => 0, objectIsAsserted: false },
  { id: '-0', make: () => -0, objectIsAsserted: false },
  { id: '0 * -1 (a computed -0)', make: () => 0 * -1, objectIsAsserted: false },
  { id: '0.0', make: () => 0.0, objectIsAsserted: false },
  { id: "Number('0')", make: () => Number('0'), objectIsAsserted: false },
  { id: '-0 re-driven with `Object.is` asserted', make: () => -0, objectIsAsserted: true },
]

// --- P-ZN-IM-3 (`S-ZN-CENSUS-1`): the 13 census shapes x the 4 zoneId shapes.
type CensusShape = { id: string; make: () => unknown; variant?: () => unknown; trueFor: readonly string[] }
const IM3_CENSUS_SHAPES: readonly CensusShape[] = [
  { id: '(1) null', make: () => null, trueFor: [] },
  { id: '(2) undefined', make: () => undefined, trueFor: [] },
  { id: '(3) 42', make: () => 42, trueFor: [] },
  { id: "(4) 'x'", make: () => 'x', trueFor: [] },
  { id: '(5) a function', make: () => (): number => 1, trueFor: [] },
  { id: '(6) [] (an array is deliberately NOT a census shape)', make: () => [], trueFor: [] },
  { id: "(7) ['a']", make: () => ['a'], trueFor: [] },
  { id: "(8) new Set(['a'])", make: () => new Set(['a']), trueFor: [] },
  { id: "(9) new Map([['a', 0], ['b', 2]])", make: () => new Map<unknown, unknown>([['a', 0], ['b', 2]]), trueFor: ['a'] },
  { id: '(10) {a: 0}', make: () => ({ a: 0 }), trueFor: ['a'] },
  { id: '(11) {a: 3}', make: () => ({ a: 3 }), trueFor: [] },
  { id: '(12) Object.create(null) carrying a: 0', make: () => Object.assign(Object.create(null), { a: 0 }), trueFor: ['a'] },
  {
    id: "(13) a frozen {a: 0} (+ the record whose own accessor for 'a' throws, counted once)",
    make: () => Object.freeze({ a: 0 }),
    variant: () => throwingAccessorRecord('a'),
    trueFor: ['a'],
  },
]
const IM3_ZONE_IDS: ReadonlyArray<{ id: string; value: unknown }> = [
  { id: "'a'", value: 'a' },
  { id: "'zzz'", value: 'zzz' },
  { id: '42', value: 42 },
  { id: "Symbol('a')", value: Symbol('a') },
]

// --- P-ZN-SM-1 (`S-ZN-TABLE-1`): the 16 cells + the 20 sweep + the 32 re-drives.
type SpecClass = { id: string; make: () => unknown; emptyToken: string | null }
const SM1_SPEC_CLASSES: readonly SpecClass[] = [
  { id: 'C1 the well-formed spec', make: () => ({ trackProp: '--t', unit: 'px', emptyToken: '0px' }), emptyToken: '0px' },
  { id: 'C2 null', make: () => null, emptyToken: null },
  { id: 'C3 {} (missing every field)', make: () => ({}), emptyToken: null },
  {
    id: "C4 {trackProp:'--t', unit:3, emptyToken:'0px'} (a non-string field)",
    make: () => ({ trackProp: '--t', unit: 3, emptyToken: '0px' }),
    emptyToken: '0px',
  },
]
const SM1_SIZE_CLASSES: ReadonlyArray<{ id: string; value: unknown }> = [
  { id: 'S1 a finite non-negative number (120)', value: 120 },
  { id: 'S2 NaN', value: Number.NaN },
  { id: 'S3 -1', value: -1 },
  { id: "S4 '12' (a non-number)", value: '12' },
]
const SM1_EMPTY_SWEEP: ReadonlyArray<{ id: string; value: unknown; truthy: boolean }> = [
  { id: 'true', value: true, truthy: true },
  { id: "'x'", value: 'x', truthy: true },
  { id: '1', value: 1, truthy: true },
  { id: '[]', value: [], truthy: true },
  { id: '{}', value: {}, truthy: true },
  { id: 'false', value: false, truthy: false },
  { id: '0', value: 0, truthy: false },
  { id: "''", value: '', truthy: false },
  { id: 'undefined (omitted)', value: undefined, truthy: false },
  { id: 'NaN', value: Number.NaN, truthy: false },
]

// --- P-ZN-SM-2 (`S-ZN-PURITY-1`): 3 caller objects x 2 patterns x 2 twins.
type CallerObject = { id: string; make: () => unknown; twin?: () => unknown }
const SM2_CALLER_OBJECTS: readonly CallerObject[] = [
  { id: '(1) a spec record', make: () => ({ trackProp: '--s2', unit: 'px', emptyToken: 'SENTINEL-S2' }) },
  {
    id: '(2) a census record (with a Map as its twin)',
    make: () => ({ a: 0, b: 3 }),
    twin: () => new Map<unknown, unknown>([['a', 0]]),
  },
  { id: '(3) a spec whose emptyToken is read through an own accessor', make: () => accessorSpec() },
]
const SM2_ACCESS_PATTERNS: ReadonlyArray<{ id: string; fn: 'trackFor' | 'isEmpty' }> = [
  { id: '(a) trackFor(spec, size, empty)', fn: 'trackFor' },
  { id: '(b) isEmpty(census, zoneId)', fn: 'isEmpty' },
]
const SM2_TWIN_FORMS: ReadonlyArray<{ id: string; freeze: boolean }> = [
  { id: 'unfrozen', freeze: false },
  { id: 'Object.freeze-d before the call', freeze: true },
]
function accessorSpec(): unknown {
  const spec: Record<string, unknown> = { trackProp: '--s2', unit: 'px' }
  Object.defineProperty(spec, 'emptyToken', {
    get: () => 'SENTINEL-ACC',
    enumerable: true,
    configurable: true,
  })
  return spec
}

// --- P-ZN-IM-4 (`S-ZN-FORMAT-1`): 3 spec shapes x 5 size values.
const IM4_SPEC_SHAPES: ReadonlyArray<{ id: string; spec: TrackSpec }> = [
  { id: "(u1) unit: 'px'", spec: { trackProp: '--u1', unit: 'px', emptyToken: 'SENTINEL-U1' } },
  { id: "(u2) unit: '' (the bare-number form)", spec: { trackProp: '--u2', unit: '', emptyToken: 'SENTINEL-U2' } },
  { id: "(u3) unit: 'px; color: red' (the verbatim-declaration form)", spec: { trackProp: '--u3', unit: 'px; color: red', emptyToken: 'SENTINEL-U3' } },
]
const IM4_SIZES: readonly number[] = [0, 1.5, 0.1 + 0.2, 1e21, Number.MAX_VALUE]

// --- P-ZN-TP-2 (`S-ZN-SEED-1` + `S-ZN-POOL-1`): the 28-value pool.
const TP2_POOL: readonly number[] = [
  0,
  -0,
  1,
  2,
  1.5,
  1024.25,
  0.1 + 0.2,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  Number.EPSILON,
  1e-7,
  1e-21,
  1e21,
  1e308,
  5e-324,
  2 ** 53,
  2 ** 53 + 1,
  9007199254740993,
  0.0001,
  1 / 3,
  Math.PI,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER + 1,
  123456789.123456789,
  1e-6,
  1e6,
  0.5,
  3.25,
]
const TP2_SPECS: ReadonlyArray<{ id: string; spec: TrackSpec }> = [
  { id: "(u1) unit: 'px'", spec: { trackProp: '--tp2a', unit: 'px', emptyToken: 'SENTINEL-TP2A' } },
  { id: "(u2) unit: '' (bare-number)", spec: { trackProp: '--tp2b', unit: '', emptyToken: 'SENTINEL-TP2B' } },
  { id: "(u3) unit: 'fr'", spec: { trackProp: '--tp2c', unit: 'fr', emptyToken: 'SENTINEL-TP2C' } },
]
const TP2_DRAWS = 66
const TP2_DRAW_INDICES: readonly number[] = (() => {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < TP2_DRAWS; i += 1) out.push(lcg.step() % TP2_POOL.length)
  return out
})()

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER (8 rows, ALL executed deterministically).
//
// Type algebra (`docs/specs/engine-pin.md` §5.5's): `P-IM` invariant ·
// `P-SM` state-machine · `P-TP` totality. Each row's `it` title carries the row
// id AND its `S-ZN-*` strategy id. Caps: <=100 attempts per row, <=400 total,
// register order, STOP AFTER 5 CONSECUTIVE FAILURES. `P-ZN-IM-1`, `P-ZN-TP-1`
// and `P-ZN-TP-2` are `YES (bounded)` — none is a proof of its unbounded
// universal.
// ===========================================================================
describe('§5.5.1 — the typed property register (8 rows, executed deterministically, no PBT harness)', () => {
  it('P-ZN-IM-1 [S-ZN-EMPTY-1] — EVERY non-representable size yields the caller’s emptyToken VERBATIM, and the converse half holds (30 attempts) — YES (bounded)', async () => {
    const s = await resolveSurface()
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-IM-1', 'S-ZN-EMPTY-1')
    const seen = new Map<string, string>()
    for (const c of IM1_CLASSES) {
      rec.run(c.id, () => {
        if (trackFor === null) return reason
        let got: unknown
        try {
          got = trackFor(c.spec, c.size, false)
        } catch (e) {
          return `trackFor THREW: ${describeThrown(e)} — §2.3 item 1(b) is a VALUE, never a throw`
        }
        if (got !== c.spec.emptyToken) {
          return `expected the caller's emptyToken ${brief(c.spec.emptyToken)} byte for byte, got ${brief(got)}`
        }
        if (typeof got === 'string' && c.spec.unit !== '' && got.includes(c.spec.unit)) {
          return `the caller's UNIT sentinel ${brief(c.spec.unit)} occurs in the result — size and unit are consulted for NOTHING in this limb`
        }
        seen.set(c.id, String(got))
        return null
      })
    }
    for (const d of IM1_FLAG_DRIVES) {
      rec.run(d.id, () => {
        if (trackFor === null) return reason
        let got: unknown
        try {
          got = d.call(trackFor)
        } catch (e) {
          return `trackFor THREW: ${describeThrown(e)}`
        }
        if (got !== d.expected) return `expected ${brief(d.expected)}, got ${brief(got)}`
        if (d.id.startsWith('falsy') && got === IM1_SPEC_A.emptyToken) {
          return 'a FALSY empty returned the empty token for a VALID size — limb (a) fires on Boolean(empty) === true only'
        }
        return null
      })
    }
    // `finish()` FIRST, so a broken row reports its own record line and its first
    // break causes; the three-token property is asserted after it, which keeps the
    // assertion falsifiable in a GREEN run without masking the red.
    rec.finish()
    expect(
      [seen.get('(4) -1'), seen.get("(19) -1 re-driven with emptyToken 'none'"), seen.get("(20) -1 re-driven with emptyToken ''")],
      'P-ZN-IM-1 — the three drives carrying three DIFFERENT caller emptyTokens returned three different strings: no built-in literal can satisfy them (the row is not falsifiable without this)',
    ).toEqual([IM1_SPEC_A.emptyToken, 'none', ''])
  })

  it('P-ZN-TP-1 [S-ZN-TOTAL-1] — the 20-shape pool x 2 cycling bindings + the 50 fixed hostile pairings: BOTH functions are TOTAL (90 attempts) — YES (bounded)', async () => {
    const s = await resolveSurface()
    const isEmpty = s.isEmpty
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-TP-1', 'S-ZN-TOTAL-1')
    // (1) the 40 pool drives = the 20-shape pool x 2 cycling axis bindings. For
    // pool index i the two calls are [isEmpty(shape, 'a'), trackFor(...)], and a
    // value that IS a TrackSpec-shaped record is driven in the spec position.
    for (const shape of TP1_POOL) {
      rec.run(`${shape.id} [binding 1: isEmpty(census, zoneId)]`, () => {
        if (isEmpty === null) return reason
        return typeofCall(() => isEmpty(shape.make(), 'a'), 'boolean', 'isEmpty')
      })
      rec.run(`${shape.id} [binding 2: trackFor(spec, size, empty)]`, () => {
        if (trackFor === null) return reason
        const value = shape.make()
        const isSpecShaped = shape.id.startsWith('(20)')
        return isSpecShaped
          ? typeofCall(() => trackFor(value, 42, false), 'string', 'trackFor')
          : typeofCall(() => trackFor(TP1_VALID_SPEC, value, false), 'string', 'trackFor')
      })
    }
    // (2) the 50 fixed hostile pairings, itemized 5+2+2+2+1+4+4+30.
    for (const d of TP1_FIXED_DRIVES) {
      rec.run(d.id, () => {
        if (isEmpty === null || trackFor === null) return reason
        return d.run({ isEmpty, trackFor })
      })
    }
    rec.finish()
  })

  it('P-ZN-IM-2 [S-ZN-ZERO-1] — for EVERY zero-valued input the outcome is the NON-EMPTY one on both sides (36 attempts)', async () => {
    const s = await resolveSurface()
    const isEmpty = s.isEmpty
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-IM-2', 'S-ZN-ZERO-1')
    const sentinel: TrackSpec = { trackProp: '--z', unit: 'SENTINEL-ZU', emptyToken: 'SENTINEL-ZE' }
    for (const z of IM2_ZERO_VALUES) {
      const zero = z.make()
      rec.run(`${z.id} [drive (a): trackFor with the emptyToken sentinel]`, () => {
        if (trackFor === null) return reason
        const got = trackFor(sentinel, zero, false)
        if (got !== `0${sentinel.unit}`) return `expected ${brief(`0${sentinel.unit}`)}, got ${brief(got)}`
        if (got === sentinel.emptyToken) return 'the EMPTY TOKEN was returned for a zero size'
        if (z.id.startsWith('-0') || z.id.startsWith('0 * -1')) {
          // The `-0` half of the per-attempt assertion, riding INSIDE the counted
          // drive so the declared term stays `6 x 6 = 36`.
          if (got.startsWith('-')) return `the emitted token ${brief(got)} carries a negative sign (String(-0) is '0')`
          if (z.objectIsAsserted && !Object.is(zero, -0)) {
            return `Object.is(${brief(zero)}, -0) is false — the drive did not pass a true -0`
          }
        }
        return null
      })
      rec.run(`${z.id} [drive (b): trackFor with unit '']`, () => {
        if (trackFor === null) return reason
        const got = trackFor({ trackProp: '--z', unit: '', emptyToken: 'SENTINEL-ZE' }, zero, false)
        return got === '0' ? null : `expected ${brief('0')}, got ${brief(got)}`
      })
      rec.run(`${z.id} [drive (c): the opposite limb — empty = true ⇒ the empty token]`, () => {
        if (trackFor === null) return reason
        const got = trackFor(sentinel, zero, true)
        return got === sentinel.emptyToken ? null : `expected the empty token ${brief(sentinel.emptyToken)}, got ${brief(got)}`
      })
      rec.run(`${z.id} [drive (d): isEmpty on a record owning the value under 'a']`, () => {
        if (isEmpty === null) return reason
        return exactCall(() => isEmpty({ a: zero }, 'a'), true, 'isEmpty')
      })
      rec.run(`${z.id} [drive (e): isEmpty on the Object.create(null) record owning it]`, () => {
        if (isEmpty === null) return reason
        return exactCall(() => isEmpty(Object.assign(Object.create(null), { a: zero }), 'a'), true, 'isEmpty')
      })
      rec.run(`${z.id} [drive (f): isEmpty on a Map holding it]`, () => {
        if (isEmpty === null) return reason
        return exactCall(() => isEmpty(new Map<unknown, unknown>([['a', zero]]), 'a'), true, 'isEmpty')
      })
    }
    // The row's attempts must be exactly the declared 36: 6 zero values x 6 drives.
    reconcile(rec, 36, 'P-ZN-IM-2 — the declared term is `6` zero-valued sizes x `6` drives = `36` (the `-0` sign check and the `Object.is` assertion ride INSIDE drive (a) of the counted drives, so they add no attempt)')
    rec.finish()
  })

  it('P-ZN-IM-3 [S-ZN-CENSUS-1] — EVERY (census, zoneId) pair answers the declared boolean and the census is observably UNCHANGED (52 attempts)', async () => {
    const s = await resolveSurface()
    const isEmpty = s.isEmpty
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-IM-3', 'S-ZN-CENSUS-1')
    for (const shape of IM3_CENSUS_SHAPES) {
      for (const zoneId of IM3_ZONE_IDS) {
        rec.run(`${shape.id} x zoneId ${zoneId.id}`, () => {
          if (isEmpty === null) return reason
          const census = shape.make()
          const before = censusSnapshot(census)
          const expected = shape.trueFor.includes(zoneId.id)
          const got = isEmpty(census, zoneId.value)
          if (got !== expected) {
            return `expected ${String(expected)} for (${shape.id}, ${zoneId.id}), got ${brief(got)}`
          }
          const after = censusSnapshot(census)
          if (after !== before) return `the census CHANGED across the call: before ${before} / after ${after}`
          const again = isEmpty(census, zoneId.value)
          if (again !== got) return `a second immediate call returned ${brief(again)}, not ${brief(got)} (no memo, no state)`
          if (shape.variant !== undefined) {
            const variant = shape.variant()
            const variantBefore = censusSnapshot(variant)
            const variantGot = isEmpty(variant, zoneId.value)
            if (variantGot !== false) {
              return `the throwing-accessor variant answered ${brief(variantGot)} for ${zoneId.id} — an unreadable value is caught and treated as NOT empty (§2.3 item 2(v))`
            }
            if (censusSnapshot(variant) !== variantBefore) return 'the throwing-accessor variant was mutated by the call'
          }
          return null
        })
      }
    }
    reconcile(rec, 52, 'P-ZN-IM-3 — the declared term is `13` census shapes x `4` zoneId shapes = `52`')
    rec.finish()
  })

  it('P-ZN-SM-1 [S-ZN-TABLE-1] — EVERY decision-table cell is EXACTLY the limb order’s outcome (16 cells + 20 sweep + 32 limb-order = 68 attempts)', async () => {
    const s = await resolveSurface()
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-SM-1', 'S-ZN-TABLE-1')
    // The cell's expected outcome, straight from `§2.3` item 1's limb order, for
    // the SPEC classes: C1 is the well-formed spec (unit 'px', emptyToken '0px');
    // C2/C3/C4 are malformed classes and the row's own text pins `''` for EVERY
    // size classification in BOTH flag halves (`§2.3` item 1(d), `F-1`: `''` is
    // returned iff the spec is not a usable record OR any field is unreadable or
    // not a string — and the SAME string for all three field failures).
    const cellExpected = (sizeClassId: string, specClassId: string, empty: boolean): string => {
      if (specClassId !== 'C1') return ''
      if (empty) return '0px'
      return sizeClassId === 'S1' ? '120px' : '0px'
    }
    // (a) the 16 exhaustive decision-table cells (empty = false).
    for (const sizeClass of SM1_SIZE_CLASSES) {
      for (const specClass of SM1_SPEC_CLASSES) {
        rec.run(`cell ${sizeClass.id} x ${specClass.id} [empty = false]`, () => {
          if (trackFor === null) return reason
          const got = trackFor(specClass.make(), sizeClass.value, false)
          const expected = cellExpected(sizeClass.id.slice(0, 2), specClass.id.slice(0, 2), false)
          if (got !== expected) {
            return `expected ${brief(expected)}, got ${brief(got)} — §2.3 item 1's limb order decides: a truthy empty beats an invalid size, an invalid size beats a valid one, and a MALFORMED spec yields '' (never the empty token, never String(size)+unit)`
          }
          if (specClass.emptyToken !== null && specClass.id.slice(0, 2) !== 'C1' && got === specClass.emptyToken) {
            return `'' must NOT be the spec's own emptyToken in this row's data (the two strings deliberately differ): got ${brief(got)}`
          }
          return null
        })
      }
    }
    // (b) the 20 `empty`-sweep drives: the 10 `empty` values x the 2 size
    // classifications (S1 valid, S2 invalid) with C1 — so a truthy `empty`
    // overrides even an INVALID size and a falsy `empty` never yields the token
    // for a valid one. (The cell prints "with C1 x S1"; see PRE-2's reported
    // finding on the term.)
    for (const e of SM1_EMPTY_SWEEP) {
      for (const sizeClass of [SM1_SIZE_CLASSES[0], SM1_SIZE_CLASSES[1]]) {
        rec.run(`sweep empty = ${e.id} x ${sizeClass.id}`, () => {
          if (trackFor === null) return reason
          const spec = SM1_SPEC_CLASSES[0].make()
          const got = trackFor(spec, sizeClass.value, e.value)
          const expected = e.truthy ? '0px' : sizeClass.id.startsWith('S1') ? '120px' : '0px'
          if (got !== expected) {
            return `expected ${brief(expected)}, got ${brief(got)} — a truthy empty overrides a VALID size; a falsy empty NEVER yields the token for a valid size`
          }
          return null
        })
      }
    }
    // (c) the 32 limb-order drives: the SAME 16 cells re-driven once with
    // empty = true and once with empty = false — the only drives in which a
    // limb-ORDER difference is observable.
    for (const empty of [true, false]) {
      for (const sizeClass of SM1_SIZE_CLASSES) {
        for (const specClass of SM1_SPEC_CLASSES) {
          rec.run(`re-drive ${sizeClass.id} x ${specClass.id} [empty = ${String(empty)}]`, () => {
            if (trackFor === null) return reason
            const got = trackFor(specClass.make(), sizeClass.value, empty)
            const expected = cellExpected(sizeClass.id.slice(0, 2), specClass.id.slice(0, 2), empty)
            if (got !== expected) return `expected ${brief(expected)}, got ${brief(got)}`
            return null
          })
        }
      }
    }
    reconcile(rec, 68, 'P-ZN-SM-1 — the declared term is `16` cells + `20` sweep drives + `32` limb-order drives = `68`')
    rec.finish()
  })

  it('P-ZN-SM-2 [S-ZN-PURITY-1] — the call mutates nothing and retains nothing, frozen twins included (12 attempts)', async () => {
    const s = await resolveSurface()
    const isEmpty = s.isEmpty
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-SM-2', 'S-ZN-PURITY-1')
    for (const object of SM2_CALLER_OBJECTS) {
      for (const pattern of SM2_ACCESS_PATTERNS) {
        for (const twin of SM2_TWIN_FORMS) {
          rec.run(`${object.id} x ${pattern.id} x ${twin.id}`, () => {
            if (trackFor === null || isEmpty === null) return reason
            const value = object.make()
            const frozen = twin.freeze ? Object.freeze(value) : value
            const before = censusSnapshot(frozen)
            let first: unknown
            try {
              first =
                pattern.fn === 'trackFor'
                  ? trackFor(frozen, 120, false)
                  : isEmpty(frozen, 'a')
            } catch (e) {
              return `the call THREW: ${describeThrown(e)} (I-2)`
            }
            const after = censusSnapshot(frozen)
            if (after !== before) return `the caller object CHANGED across the call: before ${before} / after ${after}`
            if (twin.freeze && !Object.isFrozen(frozen)) return 'the frozen twin is no longer frozen after the call'
            const second =
              pattern.fn === 'trackFor' ? trackFor(frozen, 120, false) : isEmpty(frozen, 'a')
            if (second !== first) return `the repeat call returned ${brief(second)}, not ${brief(first)} (no memo, no cache, no counter)`
            if (object.twin !== undefined) {
              const twinValue = object.twin()
              const twinBefore = censusSnapshot(twinValue)
              const twinFirst = pattern.fn === 'trackFor' ? trackFor(twinValue, 120, false) : isEmpty(twinValue, 'a')
              if (censusSnapshot(twinValue) !== twinBefore) return 'the (2)-twin (a Map) was mutated by the call'
              const twinSecond = pattern.fn === 'trackFor' ? trackFor(twinValue, 120, false) : isEmpty(twinValue, 'a')
              if (twinSecond !== twinFirst) return 'the (2)-twin is not deterministic across calls'
            }
            return null
          })
        }
      }
    }
    reconcile(rec, 12, 'P-ZN-SM-2 — the declared term is `3` caller objects x `2` access patterns x `2` twin forms = `12`')
    rec.finish()
  })

  it('P-ZN-IM-4 [S-ZN-FORMAT-1] — EVERY legitimate (spec, size) pair emits EXACTLY `String(size) + unit` with no character of the mechanism’s own (15 attempts)', async () => {
    const s = await resolveSurface()
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-IM-4', 'S-ZN-FORMAT-1')
    for (const shape of IM4_SPEC_SHAPES) {
      for (const size of IM4_SIZES) {
        rec.run(`${shape.id} x size ${brief(size)}`, () => {
          if (trackFor === null) return reason
          const expected = String(size) + shape.spec.unit
          const got = trackFor(shape.spec, size, false)
          if (got !== expected) return `expected ${brief(expected)}, got ${brief(got)}`
          if (shape.spec.emptyToken !== '' && String(got).includes(shape.spec.emptyToken)) {
            return `the emptyToken sentinel ${brief(shape.spec.emptyToken)} occurs in a non-empty result — the empty token appears IFF a limb fired (I-5)`
          }
          if (shape.spec.unit !== '' && !String(got).startsWith(String(size))) {
            return `a character was inserted before the numeric text: ${brief(got)}`
          }
          const again = trackFor(shape.spec, size, false)
          if (again !== got) return `the repeat call returned ${brief(again)}, not ${brief(got)}`
          return null
        })
      }
    }
    reconcile(rec, 15, 'P-ZN-IM-4 — the declared term is `3` spec shapes x `5` size values = `15`')
    rec.finish()
  })

  it('P-ZN-TP-2 [S-ZN-SEED-1 / S-ZN-POOL-1] — the 66 pinned-seed draws over the 28-value pool: the numeric text is `String(size)` VERBATIM (66 attempts) — YES (bounded)', async () => {
    const s = await resolveSurface()
    const trackFor = s.trackFor
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-ZN-TP-2', 'S-ZN-SEED-1/S-ZN-POOL-1')
    for (let d = 0; d < TP2_DRAWS; d += 1) {
      const index = TP2_DRAW_INDICES[d]
      const drawn = TP2_POOL[index]
      const shape = TP2_SPECS[d % 3]
      rec.run(`draw ${d + 1}/66: pool index ${index} = ${brief(drawn)} x ${shape.id}`, () => {
        if (trackFor === null) return reason
        // ⟶ REPORTED FINDING (never tuned to green): pool member #23 is
        // `Number.MIN_SAFE_INTEGER + 1` = -9007199254740990, a NEGATIVE number,
        // while this row's own boundary text declares EVERY draw "a finite
        // non-negative number ... no draw may yield the empty token". The pinned
        // seed SELECTS it (draws 29, 57, 65 of 66). The BINDING clause is `§2.3`
        // item 1(b) — a negative size ⇒ spec.emptyToken — so those three draws
        // assert the decision table's outcome and the conflict is reported beside
        // the table instead of being guessed away in either direction.
        const expected = drawn >= 0 ? String(drawn) + shape.spec.unit : shape.spec.emptyToken
        const got = trackFor(shape.spec, drawn, false)
        if (got !== expected) return `expected ${brief(expected)}, got ${brief(got)}`
        if (drawn >= 0 && String(got).includes(shape.spec.emptyToken)) {
          return `the emptyToken sentinel occurs in a drawn non-empty token: ${brief(got)}`
        }
        const again = trackFor(shape.spec, drawn, false)
        if (again !== got) return `the repeat call returned ${brief(again)}, not ${brief(got)}`
        return null
      })
    }
    reconcile(rec, 66, 'P-ZN-TP-2 — the declared term is `66` pinned-seed draws, one LCG step each')
    rec.finish()
  })

  it('REGISTER-STATUS (harness, NOT a spec row) — the register’s own execution record: seed, attempts, held, broken, registerStoppedAt and the un-run rows', () => {
    const census = {
      declaredTotal: 369,
      terms: '30+90+36+68+52+12+15+66',
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
    expect(registerRecords.length, 'REGISTER-STATUS — all EIGHT register rows reported their record (§5.5.1: 8 rows)').toBe(8)
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
        'REGISTER-STATUS — an UNSTOPPED register run must total EXACTLY the declared 369 attempts (a red run that reports all 369 as executed is the finding, not the expectation — §4.2 item 2)',
      ).toBe(369)
      expect(notStarted, 'REGISTER-STATUS — no row is un-run in an unstoppered register').toEqual([])
    } else {
      expect(
        registerState.stoppedFor,
        'REGISTER-STATUS — the stop is attributed: the stop-after-5 rule records WHICH row stopped it and WHY (the un-run rows are then asserted as FAILURES by their own `finish()`)',
      ).not.toBe(null)
      expect(registerState.attempts, 'REGISTER-STATUS — a stopped run is strictly shorter than the declared 369').toBeLessThan(369)
      expect(
        notStarted.length,
        `REGISTER-STATUS — the stop at ${registerState.stoppedAtRow} left ${notStarted.length} register row(s) un-started, and each of them FAILED rather than passed (§5.5.1 strategy item 3)`,
      ).toBeGreaterThan(0)
    }
  })
})
