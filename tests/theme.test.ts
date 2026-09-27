// tests/theme.test.ts
// ===========================================================================
// U-THEME · wave E · ledger row E8 · **THE RED SET** (RCA-1)
//
// Contract: docs/specs/theme.md — `CURRENT STATE` + `§0`/`§0A` (note 6: the
// discriminator field is RULED `source` — its pre-ruling spelling, kept visible
// only as a quotation in the contract, is asserted ABSENT from this file by
// HARNESS-5, and no row below is authored against it), the Layer declaration,
// `§1`, `§2.1` (the FIVE
// exported names in TWO halves: `resolveTheme` + `applyThemeDeclaration`, and
// the types `ThemeResolution` / `ThemeAttributeWrite` / `ThemeEnv`),
// `§2.2` (the `H-r8` six-row prohibition table `P-TH-1`..`P-TH-6`, the derived
// `P-TH-7`..`P-TH-12`, the three collision rows, the semantics table),
// `§2.3` (the pass-through rule, the strict `=== true` env rule and its
// twelve-shape hostile table), `§2.4` (the name echo, the removal case as DATA),
// `§2.5`, `§3.1` `M-1`..`M-7`, `§3.2` `F-1`..`F-8`, `§3.3` `I-1`..`I-11`,
// `§3.4` `R-1`..`R-12`, `§3.5` `X-1`..`X-5`, `§4.1`..`§4.5`, `§5.1`, `§5.2`
// (the FIVE legs), `§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` (the typed register: 12
// ROWS / 12 TERMS / `102` declared attempts / seed `20260927` / caps
// `≤100`/row · `≤400` total · stop-after-5 / the FIVE `(bounded)` rows).
//
// ---------------------------------------------------------------------------
// WHAT THIS FILE IS, AND WHAT IT IS NOT
// ---------------------------------------------------------------------------
// **THE UNIT'S RED SET AND NOTHING ELSE** (`§4.1`). It is authored FIRST from
// the contract ALONE and RUN before any implementation. The spec's declared red
// shape is `Cannot find module '../src/shared/theme.js'` (or the repo's
// equivalent module-resolution failure) for every row that imports the module,
// PLUS the static/existence rows that are already evaluable.
//
// **LAYER, stated first because `§5.2`'s refusals bind this file:** every row
// here is `[T]` (the repo's own node suite) or `static` — two pure functions
// over caller arguments. **No window boots, no OS preference is read, no
// `matchMedia` is consulted, no attribute is written, no element is touched, no
// stylesheet reacts, and no real appearance change is observed.** `[U]` is NOT
// OFFERED by the unit (the three-part refusal, `§5.2`) and `[D]` is NOT
// CLAIMED. Gate 6 is `STRUCTURAL`, never `waived`. **A green here proves two
// pure functions' returned records and nothing about an applied attribute, a
// stylesheet, a rendered control, dark mode, an OS or the app** (layer anchors
// 1/2/5).
//
// **AUTHORING ORDER (`§4.2`, followed literally):** (1) the `§3.5` existence
// rows `X-1`/`X-2`/`X-4`/`X-5` with `R-3`'s config half, `R-9` and `R-6`'s
// no-importer half; (2) the `§3.4` static rows; (3) the totality/degradation
// rows `F-1`..`F-8` and `I-1`..`I-11`; (4) `M-1`..`M-7` with `M-5`/`M-6` beside
// the static rows and `M-7` last; (5) the `§5.5.1` register rows in register
// order, then the register-harness rows. The describe blocks below are in that
// order.
//
// **WHAT THE RED IS NOT (`§4.3`):** no DOM test, no visual test, no OS test, no
// store/persistence test, no control/dispatch/MCP test, no sibling/composition
// test, no assembled-app evidence — and the banned vocabulary may appear only
// inside `R-1`'s/`R-8`'s own control corpora, which are ASSEMBLED FROM
// CHARACTER CODES below for exactly that reason.
//
// **THE IMPORT BOUNDARY (the repo's established technique — a structural type
// plus a computed dynamic specifier, `tests/owned-list-host.test.ts`,
// `tests/container.test.ts`, `tests/relocate.test.ts`):** the module does not
// exist yet, so the RUNTIME half is reached through `import(/* @vite-ignore */
// …)` over a computed specifier, and every row fails as a LABELLED ASSERTION
// naming the absent module — never as a transform error that would take the
// whole red set with it. The TYPE half is a real `import type` at the top (the
// `tests/relocate.test.ts` technique), which is what makes `§5.2` leg 5 — the
// standalone strict `tsc` over THIS file — the leg that pins `§3.4 R-5`(b) and
// `R-12`(c): a rename, removal or unexported name FAILS TO COMPILE there while
// the runtime rows still run and report.
// ===========================================================================
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

// ⟶ THE TYPE HALF OF THE CENSUS (`§3.4 R-5`(b), `§5.2` leg 5). A type-only name
// is ERASED AT RUN TIME, so this import is the ONLY instrument that can pin it.
import type { ThemeResolution, ThemeAttributeWrite, ThemeEnv } from '../src/shared/theme.js'

/** `§2.1`'s three type declarations, referenced by the type-checked probes
 *  below so an unused type-only import cannot mask a rename. */
type ExportedTypes = [ThemeResolution, ThemeAttributeWrite, ThemeEnv]

// ===========================================================================
// PATHS, SPECIFIERS AND STRUCTURAL MIRRORS OF `§2.1`
// ===========================================================================
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const MODULE_SRC = new URL('../src/shared/theme.ts', import.meta.url)
const MODULE_PATH = fileURLToPath(MODULE_SRC)
const TEST_PATH = fileURLToPath(new URL('./theme.test.ts', import.meta.url))
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'theme.js'].join('/')

// THE CONTRACT SHAPES, MIRRORED STRUCTURALLY (the module cannot be imported for
// its TYPES at red time — only the erased import above can, and that one is the
// leg-5 claim). Field names, order and optionality are `§2.1`'s.
type ResolveThemeShape = (setting: unknown, env: unknown) => ThemeResolution
type ApplyThemeDeclarationShape = (attributeName: unknown, resolved: unknown) => ThemeAttributeWrite

/** `§2.1` item 2 — `ThemeResolution`'s THREE declared names, IN DECLARED ORDER. */
const RESOLUTION_KEYS = ['setting', 'prefersDark', 'source'] as const
/** `§2.1` item 2 / `§0A` note 2 — `ThemeAttributeWrite`'s three, in order. */
const WRITE_KEYS = ['name', 'value', 'removal'] as const
/** `§2.3` item 2 — the CLOSED two-body `source` domain. */
const SOURCE_BODIES = ['env', 'degraded-env'] as const
/** `§2.2`(B) `P-TH-7` — the attribute name is the CALLER's; the tests use a
 *  caller-chosen spelling only (the mechanism owns none). */
const NAME_A = 'data-x'
const NAME_B = 'class'
const TOKEN_A = 'dark'
const TOKEN_B = 'system'
const TOKEN_C = 'DARK'
const TOKEN_D = ' dark '
const TOKEN_E = 'my-app-theme'
const LONG_TOKEN = `${'x'.repeat(199)}y`

// ===========================================================================
// THE MODULE BOUNDARY — resolution is DATA, never a thrown import (`§4.1`)
// ===========================================================================
type ModuleSurface = Record<string, unknown>
type Surface =
  | { readonly mod: ModuleSurface; readonly resolveTheme: ResolveThemeShape; readonly applyThemeDeclaration: ApplyThemeDeclarationShape; readonly reason: null }
  | { readonly mod: ModuleSurface | null; readonly resolveTheme: ResolveThemeShape | null; readonly applyThemeDeclaration: ApplyThemeDeclarationShape | null; readonly reason: string }

let surfaceCache: Surface | null = null

/** Resolves `§2.1`'s surface WITHOUT throwing: the reason a row is red is DATA,
 *  so a clause row reports it and a register row counts it as a broken attempt
 *  (`§5.5.1` cap 3's stop-after-5 discipline). */
async function resolveSurface(): Promise<Surface> {
  if (surfaceCache !== null) return surfaceCache
  const absent = `the module of §2.1 / §5.1 row 1 does not exist yet (${MODULE_PATH}) — the declared red shape of §4.1`
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = { mod: null, resolveTheme: null, applyThemeDeclaration: null, reason: absent }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as ModuleSurface
    const resolveTheme: unknown = mod['resolveTheme']
    const applyThemeDeclaration: unknown = mod['applyThemeDeclaration']
    if (typeof resolveTheme !== 'function' || typeof applyThemeDeclaration !== 'function') {
      const unusable: Surface = { mod, resolveTheme: null, applyThemeDeclaration: null, reason: "§2.1's two VALUE exports are not both exported as functions (a missing, renamed or non-callable export)" }
      surfaceCache = unusable
      return unusable
    }
    surfaceCache = {
      mod,
      resolveTheme: resolveTheme as ResolveThemeShape,
      applyThemeDeclaration: applyThemeDeclaration as ApplyThemeDeclarationShape,
      reason: null,
    }
  } catch (e) {
    surfaceCache = { mod: null, resolveTheme: null, applyThemeDeclaration: null, reason: `the module does not resolve: ${describeThrown(e)}` }
  }
  return surfaceCache
}

let liveCache: Extract<Surface, { reason: null }> | null = null
/** The clause rows' boundary: fails as an ASSERTION carrying the row's own
 *  label, so the red message names the absent module/export. */
async function live(): Promise<Extract<Surface, { reason: null }>> {
  if (liveCache !== null) return liveCache
  const s = await resolveSurface()
  if (s.reason !== null) {
    // The `§4.1` red: the module is absent (or its exports are unusable), and
    // the reason is DATA. This row fails HERE, on its own label.
    expect(s.reason, `§4.1 red: ${s.reason}`).toBe(null)
  }
  const usable = s as Extract<Surface, { reason: null }>
  liveCache = usable
  return usable
}
/** The register rows' non-failing probe: `null` while the module is absent. */
function liveOrNull(): Extract<Surface, { reason: null }> | null {
  return liveCache
}
/** The OMITTED-argument drive (`§2.3` item 1(c)'s omitted case, `§2.4` item
 *  1(d)): arity-0 invocations, so a row can drive the omitted arm without a
 *  marker leaking into the argument domain. */
function resolveOmitted(fn: ResolveThemeShape, env: unknown): unknown {
  return (fn as unknown as (e?: unknown) => unknown)(env)
}
function applyOmitted(fn: ApplyThemeDeclarationShape, resolved: unknown): unknown {
  return (fn as unknown as (r?: unknown) => unknown)(resolved)
}

function describeThrown(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}
/** ONE drive: the thrown value is RETURNED, never re-thrown, so a row can report
 *  it in its own vocabulary (`§4.4 S-TH-3`: this unit has no refusal domain, so
 *  a throw is always a FINDING). */
function drove(fn: () => unknown): { readonly value: unknown; readonly thrown: unknown } {
  try {
    return { value: fn(), thrown: null }
  } catch (e) {
    return { value: undefined, thrown: e }
  }
}

// ---------------------------------------------------------------------------
// RECORD READERS — `§2.4` item 4, `§3.4 R-12`, `I-3`. Each returns `null` when
// the claim HOLDS and a cause sentence when it BREAKS, so both the clause rows
// and the register attempts can report the same readings.
// ---------------------------------------------------------------------------
const hasOwn = Object.prototype.hasOwnProperty

/** The exact three-name key set, IN DECLARED ORDER (`§3.4 R-12`(a)). */
function keyBreakOf(value: unknown, keys: readonly string[]): string | null {
  if (value === null || typeof value !== 'object') return `the returned value is not an object (${typeof value})`
  const actual = Object.keys(value as object)
  if (actual.length !== keys.length) return `the member census is ${actual.length} names ${JSON.stringify(actual)}, not the declared ${keys.length} ${JSON.stringify(keys)}`
  for (let i = 0; i < keys.length; i += 1) {
    if (actual[i] !== keys[i]) return `member ${i} is '${actual[i]}', not the declared '${keys[i]}' (declared ORDER binds)`
  }
  return null
}
/** No member is a getter, the prototype is `Object.prototype`, nothing frozen
 *  (`§2.4` item 4, `M-1`). */
function freshnessBreakOf(record: Record<string, unknown>, keys: readonly string[]): string | null {
  if (Object.getPrototypeOf(record) !== Object.prototype) return 'the returned record\'s prototype is not Object.prototype'
  for (const k of keys) {
    const d = Object.getOwnPropertyDescriptor(record, k)
    if (d === undefined) return `the declared member '${k}' has no own descriptor`
    if (d.get !== undefined || d.set !== undefined) return `the declared member '${k}' is an accessor, not a data property`
  }
  if (Object.isFrozen(record)) return 'the returned record is FROZEN (§2.4 item 4: nothing is frozen or sealed)'
  return null
}
/** THE WHOLE `ThemeResolution` CLAIM (`§2.1`, `§2.3`, `M-1`/`M-3`, `P-TH-IM-1`). */
function resolutionBreakOf(value: unknown, label: string): string | null {
  const keyBreak = keyBreakOf(value, RESOLUTION_KEYS)
  if (keyBreak !== null) return `${label} — ${keyBreak}`
  const r = value as Record<string, unknown>
  if (!(r['setting'] === null || typeof r['setting'] === 'string')) return `${label} — 'setting' is ${typeof r['setting']}, not the declared string | null`
  if (typeof r['prefersDark'] !== 'boolean') return `${label} — 'prefersDark' is ${typeof r['prefersDark']}, not the declared boolean`
  if (r['source'] !== 'env' && r['source'] !== 'degraded-env') return `${label} — 'source' is ${JSON.stringify(r['source'])}, outside the CLOSED domain ${JSON.stringify(SOURCE_BODIES)}`
  return freshnessBreakOf(r, RESOLUTION_KEYS)
}
/** THE WHOLE `ThemeAttributeWrite` CLAIM (`§2.1`, `§2.4`, `M-4`/`M-5`, `P-TH-IM-3`/`IM-4`). */
function writeBreakOf(value: unknown, label: string): string | null {
  const keyBreak = keyBreakOf(value, WRITE_KEYS)
  if (keyBreak !== null) return `${label} — ${keyBreak}`
  const w = value as Record<string, unknown>
  if (!(w['name'] === null || typeof w['name'] === 'string')) return `${label} — 'name' is ${typeof w['name']}, not the declared string | null`
  if (typeof w['value'] !== 'string') return `${label} — 'value' is ${typeof w['value']}, not the declared string`
  if (typeof w['removal'] !== 'boolean') return `${label} — 'removal' is ${typeof w['removal']}, not the declared boolean`
  if (w['removal'] === true && w['value'] !== '') return `${label} — removal: true requires value '' EXACTLY (got ${JSON.stringify(w['value'])})`
  return freshnessBreakOf(w, WRITE_KEYS)
}
/** ONE resolveTheme drive: the resolution claim and the "nothing throws" claim
 *  in one reading (`§3.3 I-1`). */
function resolveTry(fn: ResolveThemeShape, setting: unknown, env: unknown, label: string, omitted = false): string | null {
  const { value, thrown } = drove(() => (omitted ? resolveOmitted(fn, env) : fn(setting, env)))
  if (thrown !== null) return `${label} — resolveTheme THREW (${describeThrown(thrown)}); §2.1 item 2: it never throws, for any argument`
  return resolutionBreakOf(value, label)
}
function applyTry(fn: ApplyThemeDeclarationShape, name: unknown, resolved: unknown, label: string, omitted = false): string | null {
  const { value, thrown } = drove(() => (omitted ? applyOmitted(fn, resolved) : fn(name, resolved)))
  if (thrown !== null) return `${label} — applyThemeDeclaration THREW (${describeThrown(thrown)}); §2.1 item 2: it never throws`
  return writeBreakOf(value, label)
}

/** A COERCION-HOOK RECORDER (`§2.3` item 1(c), `§2.4` item 1(c), `M-6`(g)): a
 *  value whose `String()`/`toString`/`valueOf` paths all count. */
function hookRecorder(): { readonly value: unknown; readonly counts: { toString: number; valueOf: number } } {
  const counts = { toString: 0, valueOf: 0 }
  const value = {
    toString(): string {
      counts.toString += 1
      return 'hook'
    },
    valueOf(): number {
      counts.valueOf += 1
      return 7
    },
  }
  return { value, counts }
}
/** A REVOKED proxy: ANY access raises `TypeError` (`§2.3` item 2(11)). */
function revokedProxy(): unknown {
  const { proxy, revoke } = Proxy.revocable({ prefersDark: true }, {})
  revoke()
  return proxy
}
/** A trap-throwing proxy: `get`/`has`/`getOwnPropertyDescriptor` all throw. */
function trapThrowingProxy(): unknown {
  const boom = (): never => {
    throw new Error('trap-throwing proxy')
  }
  return new Proxy({}, { get: boom, has: boom, getOwnPropertyDescriptor: boom, ownKeys: boom })
}
/** A record whose `prefersDark` accessor throws (`§2.3` item 2(10)). */
function throwingAccessorEnv(): unknown {
  return Object.defineProperty({}, 'prefersDark', {
    get(): never {
      throw new Error('throwing accessor')
    },
    enumerable: true,
    configurable: true,
  })
}
/** An env whose `prefersDark` is INHERITED (`§2.3` item 2(12)). */
function inheritedEnv(): unknown {
  const proto = { prefersDark: true }
  return Object.create(proto) as object
}
/** A non-enumerable OWN `prefersDark` (`§5.5.1 P-TH-IM-2` shape (6)). */
function nonEnumerableOwnEnv(): unknown {
  return Object.defineProperty({}, 'prefersDark', { value: true, enumerable: false, writable: false, configurable: false })
}
/** A SELF-REFERENTIAL record and a DEEPLY NESTED array (`P-TH-TP-1` pool). */
function selfReferential(): unknown {
  const o: Record<string, unknown> = { prefersDark: true }
  o['self'] = o
  return o
}
function deeplyNested(): unknown {
  let v: unknown = []
  for (let i = 0; i < 40; i += 1) v = [v]
  return v
}
/** The `toString`-recording env of `P-TH-SM-2` shape (2): the READ must be an own
 *  member READ, so the getter's count is the observable. */
function recordingEnvCounted(member: boolean): { readonly env: unknown; readonly count: () => number } {
  let n = 0
  const env = Object.defineProperty({}, 'prefersDark', {
    get(): boolean {
      n += 1
      return member
    },
    enumerable: true,
    configurable: true,
  })
  return { env, count: () => n }
}

// ===========================================================================
// §4.4 S-TH-2 — THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY SCAN ROW
// INHERITS IT. Two views, each NAMED where it is used:
//   (1) `normalizedView`    — COMMENTS ARE SCANNED AS CODE and string QUOTES
//       ARE STRIPPED, so a banned token in a comment or a string literal FAILS
//       as if spelled plainly.
//   (2) `commentStrippedView` — the honest companion where a comment must not
//       carry a claim.
// **BOTH JOIN STRING-LITERAL CONCATENATION FIRST, AND THE JOIN RUNS BEFORE
// QUOTES ARE STRIPPED** — the order `§3.4` pins, because a view that strips
// quotes first can no longer see the `'…' + '…'` boundary the joiner needs.
// ===========================================================================
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
function normalizedView(source: string): string {
  return joinLiteralConcatenation(source).replace(/['"`]/g, '').replace(/\$\{([^}]*)\}/g, '$1')
}
function commentStrippedView(source: string): string {
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
function escapeForRegex(token: string): string {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function scanForToken(view: string, token: string, boundary: boolean): boolean {
  if (!boundary) return view.includes(token)
  return new RegExp(`(^|[^A-Za-z0-9_$])${escapeForRegex(token)}([^A-Za-z0-9_$]|$)`).test(view)
}
type Scanner = { readonly id: string; readonly tokens: readonly string[]; readonly exemption?: readonly string[]; readonly boundary?: boolean }
/** A scan row's reading: the offending tokens, AFTER the row's DECLARED
 *  EXEMPTIONS are subtracted (`§4.4 S-TH-2`: a scan row that does not name its
 *  exemptions is VACUOUS). */
function scanTokens(view: string, rules: readonly Scanner[]): string[] {
  const hits: string[] = []
  for (const rule of rules) {
    let v = view
    for (const ex of rule.exemption ?? []) v = v.split(ex).join(' ')
    for (const token of rule.tokens) {
      if (scanForToken(v, token, rule.boundary !== false)) hits.push(`${rule.id}: '${token}'`)
    }
  }
  return hits
}
type RegexRule = { readonly id: string; readonly re: RegExp }
function scanRegexes(view: string, rules: readonly RegexRule[]): string[] {
  return rules.filter((r) => r.re.test(view)).map((r) => r.id)
}
/** ONE banned token, BUILT FROM CHARACTER CODES so THIS FILE's own bytes — raw
 *  or normalized — never carry it. `R-2` scans this unit's test file, so a
 *  plainly spelled banned token in this file would redden `R-2` through this
 *  file's own rule list (the vacuity `S-TH-2` exists to prevent). */
function cc(parts: readonly (string | number)[]): string {
  return parts.map((p) => (typeof p === 'number' ? String.fromCharCode(p) : p)).join('')
}
function ccPattern(codes: readonly number[]): RegExp {
  return new RegExp(cc(codes))
}
function codesOf(text: string): number[] {
  return [...text].map((c) => c.charCodeAt(0))
}
const t = (text: string): string => cc(codesOf(text))

// ---------------------------------------------------------------------------
// `§3.4 R-1` — THE ANTI-EVASION VOCABULARY ROW's token families. Every literal
// is ASSEMBLED, never spelled. `R-1`'s DECLARED EXEMPTIONS are named in
// `R1_EXEMPT` below; the FIVE declared literal bodies of `§2.1` item 5 are
// carried there too, as the spec's own exemption set requires.
// ---------------------------------------------------------------------------
const R1_EXEMPT: readonly string[] = [
  // the unit's own contract vocabulary, AS IDENTIFIERS AND MEMBER NAMES
  'resolveTheme',
  'applyThemeDeclaration',
  'ThemeResolution',
  'ThemeAttributeWrite',
  'ThemeEnv',
  'setting',
  'prefersDark',
  'source',
  'name',
  'value',
  'removal',
  'attributeName',
  'resolved',
  'theme',
  // the FIVE declared literal bodies of §2.1 item 5
  "''",
  `'${t('env')}'`,
  `'${t('degraded-env')}'`,
  `'${t('string')}'`,
  `'${t('object')}'`,
]
const R1_RULES: readonly Scanner[] = [
  {
    id: 'R-1(a) token-name / token-value literal',
    tokens: [t('dark'), t('light'), t('system'), t('auto'), t('color-scheme'), t('prefers-color-scheme'), t('--'), '"--', t('token')],
    exemption: R1_EXEMPT,
  },
  {
    id: 'R-1(b) attribute-name literal',
    tokens: [t('data-theme'), t('data-'), t('class'), t('className'), "'style'", 'style.', t('color-scheme')],
    exemption: R1_EXEMPT,
  },
  {
    id: 'R-1(c) consumer-vocabulary token',
    tokens: [t('zone'), t('pane'), t('tab'), t('region'), t('dashboard'), t('gutter'), t('menu'), t('catalog'), t('is-empty'), t('is-minimized'), t('is-revealed'), t('census'), t('trackProp')],
    exemption: R1_EXEMPT,
  },
  {
    id: 'R-1(d) store token',
    tokens: [t('localStorage'), t('sessionStorage'), t('indexedDB'), t('store'), t('cache'), t('memo'), t('persist'), t('journal')],
    exemption: R1_EXEMPT,
  },
  {
    id: 'R-1(e) realm / ambient token',
    tokens: [
      t('document'), t('window'), t('navigator'), t('globalThis'), t('self'), t('matchMedia'), t('prefers-color-scheme'),
      t('getComputedStyle'), t('getBoundingClientRect'), t('activeElement'), t('process.env'), t('process.platform'),
      t('os.platform'), t('eval'), t('new Function'), t('globalThis['),
    ],
    exemption: R1_EXEMPT,
  },
  {
    id: 'R-1(f) selector / DOM-write token',
    tokens: [
      t('querySelector'), t('querySelectorAll'), t('closest'), t('getElementById'), t('createElement'), t('innerHTML'),
      t('outerHTML'), t('textContent'), t('classList'), t('appendChild'), t('setAttribute'), t('removeAttribute'),
      t('setProperty'), t('style.'), t('focus('),
    ],
    exemption: R1_EXEMPT,
  },
]
/** `§3.4 R-2` — the no-DOM / no-write / no-OS-call patterns, as regexes over a
 *  view. The tokens are ASSEMBLED (`§4.2`'s "the banned vocabulary may appear
 *  only inside the controls"). */
const R2_RULES: readonly RegexRule[] = [
  { id: 'R-2 a set/write call or a class/style write', re: new RegExp(`${t('setAttribute')}|${t('removeAttribute')}|${t('classList')}|${t('setProperty')}`) },
  { id: 'R-2 an element or node creation/access call', re: new RegExp(`${t('createElement')}|${t('querySelector')}|${t('getElementById')}|${t('appendChild')}|${t('innerHTML')}|${t('outerHTML')}|${t('textContent')}`) },
  { id: 'R-2 a computed realm route', re: new RegExp(`${t('globalThis')}\\s*\\[`) },
  { id: 'R-2 a realm alias read', re: /\bconst\s+g\s*=\s*globalThis\b/ },
  { id: 'R-2 code construction', re: new RegExp(`${t('new Function')}|${t('eval')}\\s*\\(`) },
]
const R7_RULES: readonly RegexRule[] = [
  { id: 'R-7 a media-query read', re: new RegExp(t('matchMedia')) },
  { id: 'R-7 a media-query spelling', re: new RegExp(t('prefers-color-scheme')) },
  { id: 'R-7 a process/environment read', re: new RegExp(`${t('process.env')}|${t('process.platform')}|${t('os.platform')}`) },
  { id: 'R-7 a navigator/UA or realm read', re: new RegExp(`${t('navigator')}|${t('document')}|${t('window')}|${t('localStorage')}|${t('globalThis')}`) },
  { id: 'R-7 a node:* / electron reach', re: /from\s*['"](node:|electron)/ },
]
const R4_RULES: readonly RegexRule[] = [
  { id: 'R-4 an import statement (value, type-only or bare)', re: /\bimport\b/ },
  { id: 'R-4 a dynamic import call', re: /\bimport\s*\(/ },
  { id: 'R-4 a require call', re: /\brequire\s*\(/ },
]
/** `§3.4 R-8` — the module's DECLARED CLOSED LITERAL SET (`§2.1` item 5): the
 *  five bodies INCLUDING the two `typeof`-tag bodies (`S-TH-7`: a census that
 *  excludes them reddens the module the value rules require). */
const DECLARED_LITERAL_BODIES: readonly string[] = [t(''), t('env'), t('degraded-env'), t('string'), t('object')]
function literalBodiesOf(source: string): string[] {
  const joined = joinLiteralConcatenation(source)
  const bodies: string[] = []
  const re = /'([^'\\\n]*)'|"([^"\\\n]*)"/g
  let m = re.exec(joined)
  while (m !== null) {
    bodies.push(m[1] ?? m[2] ?? '')
    m = re.exec(joined)
  }
  return bodies
}
/** `§3.4 R-11` — the sibling / control-unit spellings that FAIL the row. */
const R11_FORBIDDEN: readonly string[] = [
  'createGestureSession', 'GestureHandle', 'tokensFor', 'tokenFn', 'orientationFor', 'containerDeclarationFor',
  'computeTrackVars', 'isEmpty', 'createOwnedListHost', 'createSlotHost', 'createRelocateSession', 'resolveTarget',
  'applyProjection', 'probeMountInvariant', 'normalizeCatalog', 'buildMenuTemplate', 'selectCatalogItem',
  'demo-envelope', 'U-THEME-CONTROL', 'theme-control',
]
/** The THREE NAMED IMPORT CONTROLS of `§3.2 F-7` / `§3.4 R-4`, assembled. */
const F7_IMPORT_CONTROLS: readonly string[] = [
  `import type { GestureHandle } from './${t('gesture-session')}.js'`,
  `import { tokensFor } from './${t('container')}.js'`,
  `import { createOwnedListHost } from './${t('owned-list-host')}.js'`,
]
/** The FIVE no-write / no-DOM controls of `§3.2 F-6`, assembled, so `R-2`/`R-7`
 *  are proven LIVE by a corpus that MUST fail them (`S-TH-2`: a scan that passes
 *  for any of the five is UNFALSIFIED). */
const F6_CORPUS: readonly { readonly id: string; readonly text: string }[] = [
  { id: 'F-6(a) a removeAttribute call on a recording fake', text: `el.${t('removeAttribute')}('${NAME_A}')` },
  { id: 'F-6(b) a setAttribute call', text: `el.${t('setAttribute')}('${NAME_A}', 'v')` },
  { id: 'F-6(c) a classList / style write', text: `el.${t('classList')}.add('x'); el.${t('style')}.${t('setProperty')}('--x', '1')` },
  { id: 'F-6(d) a matchMedia read', text: `const mq = ${t('globalThis')}.${t('matchMedia')}('(prefers-color-scheme: dark)')` },
  { id: 'F-6(e) a document / window read', text: `const d = ${t('globalThis')}.${t('document')}; const w = ${t('window')}` },
]

// ===========================================================================
// THE MODULE'S SOURCE — read as bytes. A missing module file is the `X-1` red
// fact and makes a scan row red for the honest reason (there are no bytes).
// ===========================================================================
let moduleSourceCache: string | null = null
function moduleSource(): string | null {
  if (moduleSourceCache !== null) return moduleSourceCache
  if (!existsSync(MODULE_SRC)) return null
  moduleSourceCache = readFileSync(MODULE_PATH, 'utf8')
  return moduleSourceCache
}
function testFileBytes(): string {
  return readFileSync(TEST_PATH, 'utf8')
}
function readOrNull(path: string): string | null {
  return existsSync(path) ? readFileSync(path, 'utf8') : null
}
/** Every `.ts` file under `src/**`, walked from the tree (never a git command,
 *  never a comment — `§3.4 R-6`'s pinned IMPLEMENTATION FORM). */
function srcTsFiles(): string[] {
  const found: string[] = []
  const walk = (dir: string): void => {
    if (!existsSync(dir)) return
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (/\.ts$/.test(entry.name)) found.push(full)
    }
  }
  walk(join(ROOT, 'src'))
  return found
}
/** `R-1`'s / `R-8`'s subject: the module's own bytes, comments included. */
function moduleView(): string | null {
  const src = moduleSource()
  return src === null ? null : normalizedView(src)
}

// ===========================================================================
// §5.5.1 — THE PROPERTY REGISTER'S EXECUTION MACHINERY.
// Caps, uniform for the whole register: **≤100 attempts per row · ≤400 attempts
// in total**, rows evaluated **sequentially in register order**, **STOP AFTER 5
// CONSECUTIVE FAILURES** (the running row's remaining attempts are abandoned and
// no further row starts). **An un-run row is reported as a FAILURE, never as a
// pass.** Each row's `it` title carries its row id AND its strategy id, and each
// row prints its own record line so the audit can read attempts-run / held /
// broken per row from the output.
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
/** `§5.5.3` — THE PINNED SEED AND ITS FORM. */
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296
const POOL_LENGTH = 12

const registerState = {
  attempts: 0,
  consecutiveFailures: 0,
  stoppedAtRow: null as string | null,
  stoppedFor: null as string | null,
}
type RowRecord = {
  row: string
  type: string
  strategy: string
  seed: number
  attemptsRun: number
  held: number
  broken: number
  readings: number
  controls: number
  distinctDrives: number
  stoppedEarly: boolean
  notStarted: boolean
  registerStoppedAt: string | null
  registerStoppedFor: string | null
  causes: string[]
}
const REGISTER_RECORDS: RowRecord[] = []
/** The DECLARED register of `§5.5.1`/`§5.5.3`, in REGISTER ORDER, with each
 *  row's declared TERM and its `(bounded)` marking. The executed layer is
 *  reconciled against THIS table by the harness rows below. */
const DECLARED_REGISTER: readonly { readonly row: string; readonly type: string; readonly strategy: string; readonly declared: number; readonly bounded: boolean; readonly distinct: number | null }[] = [
  { row: 'P-TH-IM-1', type: 'P-IM', strategy: 'S-TH-RESOLVE-1', declared: 12, bounded: true, distinct: 12 },
  { row: 'P-TH-IM-2', type: 'P-IM', strategy: 'S-TH-ENV-1', declared: 12, bounded: false, distinct: 9 },
  { row: 'P-TH-IM-3', type: 'P-IM', strategy: 'S-TH-ECHO-1', declared: 10, bounded: false, distinct: 10 },
  { row: 'P-TH-IM-4', type: 'P-IM', strategy: 'S-TH-REMOVAL-1', declared: 8, bounded: false, distinct: 8 },
  { row: 'P-TH-SM-1', type: 'P-SM', strategy: 'S-TH-STATE-1', declared: 6, bounded: false, distinct: 6 },
  { row: 'P-TH-SM-2', type: 'P-SM', strategy: 'S-TH-CONST-1', declared: 3, bounded: false, distinct: 3 },
  { row: 'P-TH-TP-1', type: 'P-TP', strategy: 'S-TH-TOTAL-1', declared: 12, bounded: true, distinct: 12 },
  { row: 'P-TH-TP-2', type: 'P-TP', strategy: 'S-TH-RULE-1', declared: 12, bounded: true, distinct: 12 },
  { row: 'P-TH-TP-3', type: 'P-TP', strategy: 'S-TH-ABSORB-1', declared: 10, bounded: true, distinct: 10 },
  { row: 'P-TH-TP-4', type: 'P-TP', strategy: 'S-TH-WRITE-1', declared: 8, bounded: true, distinct: 8 },
  { row: 'P-TH-TP-5', type: 'P-TP', strategy: 'S-TH-NOCALL-1', declared: 6, bounded: false, distinct: 6 },
  { row: 'P-TH-TP-6', type: 'P-TP', strategy: 'S-TH-COMPOSE-1', declared: 3, bounded: false, distinct: 3 },
]
/** `§5.5.3` — THE DECLARED TOTAL, PRINTED WITH ITS TERMS (the twelve terms ARE
 *  the rows above, in register order). */
function declaredTerms(): number[] {
  return DECLARED_REGISTER.map((r) => r.declared)
}
function declaredTotal(): number {
  return declaredTerms().reduce((a, b) => a + b, 0)
}
/** The FIVE `(bounded)` rows of `§5.5.1`/`§5.5.2` item 2. */
function boundedRows(): string[] {
  return DECLARED_REGISTER.filter((r) => r.bounded).map((r) => r.row)
}

class RegisterRow {
  readonly row: string
  readonly type: string
  readonly strategy: string
  private attemptsRun = 0
  private held = 0
  private broken = 0
  private readings = 0
  private controls = 0
  private distinct = 0
  private stoppedEarly = false
  private notStarted = false
  private readonly causes: string[] = []

  constructor(def: { readonly row: string; readonly type: string; readonly strategy: string }) {
    this.row = def.row
    this.type = def.type
    this.strategy = def.strategy
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
  /** A READING printed BESIDE the term (`A DECLARED REGISTER TERM IS A DRIVE
   *  COUNT`): never counted in it. */
  reading(): void {
    this.readings += 1
  }
  /** A row's own POSITIVE CONTROL (`§5.5.1`'s "both controls" clauses), also
   *  printed beside the term. */
  control(): void {
    this.controls += 1
  }
  /** The DISTINCT-drive figure of `§5.5.2` item 3 (`P-TH-TP-4`'s `16` cells as
   *  `8` drives of two; `P-TH-TP-6`'s second drive inside the attempt): the
   *  measured companion of the DECLARED term, never substituted for it. */
  distinctDrive(): void {
    this.distinct += 1
  }
  /** The row's verdict + its own record line. **An un-run row FAILS on purpose:
   *  an un-executed register row may not look green.** */
  finish(): void {
    const record: RowRecord = {
      row: this.row,
      type: this.type,
      strategy: this.strategy,
      seed: SEED,
      attemptsRun: this.attemptsRun,
      held: this.held,
      broken: this.broken,
      readings: this.readings,
      controls: this.controls,
      distinctDrives: this.distinct,
      stoppedEarly: this.stoppedEarly,
      notStarted: this.notStarted,
      registerStoppedAt: registerState.stoppedAtRow,
      registerStoppedFor: registerState.stoppedFor,
      causes: this.causes.slice(0, 5),
    }
    REGISTER_RECORDS.push(record)
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    if (this.attemptsRun === 0) {
      expect(
        this.attemptsRun,
        `${line} — this row NEVER STARTED: the register's stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures discipline triggered at row ${registerState.stoppedAtRow ?? 'an earlier row'} (${registerState.stoppedFor ?? 'cause unrecorded'}). An un-run register row is reported as a FAILURE, never as a pass (§5.5.1 cap 3).`,
      ).toBeGreaterThan(0)
      return
    }
    expect(this.broken, `${line} — RED (§5.5.1): ${this.broken} of ${this.attemptsRun} attempts BROKE. First causes: ${JSON.stringify(this.causes.slice(0, 3))}`).toBe(0)
  }
}
function row(def: { readonly row: string; readonly type: string; readonly strategy: string }): RegisterRow {
  return new RegisterRow(def)
}
function definedRow(rowId: string): { readonly row: string; readonly type: string; readonly strategy: string } {
  const def = DECLARED_REGISTER.find((r) => r.row === rowId) as { readonly row: string; readonly type: string; readonly strategy: string } | undefined
  expect(def, `${rowId} is a declared register row of §5.5.1`).toBeDefined()
  return def as { readonly row: string; readonly type: string; readonly strategy: string }
}

/** The pinned-seed generator of `S-TH-TOTAL-1` (`§5.5.1` method note 2 /
 *  `§5.5.3`): a hand-rolled 32-bit LCG whose constants are LITERALS here, with
 *  **ONE LCG STEP PER DRAW** and `index = stateₙ₊₁ mod pool.length`,
 *  `pool.length = 12`. No `Math.random`, no wall-clock seed, no shrinking. */
function makeLcg(seed: number): { readonly next: () => number; readonly state: () => number } {
  let state = seed >>> 0
  return {
    next(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
    state: (): number => state,
  }
}
/** `P-TH-TP-1`'s TWELVE-MEMBER POOL, in the spec's declared order. */
const TP1_POOL: readonly { readonly id: string; readonly value: () => unknown }[] = [
  { id: '(1) null-prototype record with own keys', value: () => Object.assign(Object.create(null) as object, { prefersDark: true }) },
  { id: '(2) NaN', value: () => Number.NaN },
  { id: '(3) a Symbol', value: () => Symbol('x') },
  { id: '(4) a 12n bigint', value: () => 12n },
  { id: '(5) a revoked Proxy', value: revokedProxy },
  { id: '(6) a trap-throwing Proxy', value: trapThrowingProxy },
  { id: '(7) a record whose prefersDark accessor throws', value: throwingAccessorEnv },
  { id: '(8) a self-referential record', value: selfReferential },
  { id: '(9) a Map', value: () => new Map([['a', 1]]) },
  { id: '(10) a Set', value: () => new Set([1, 2]) },
  { id: '(11) a function', value: () => function f(): void {} },
  { id: '(12) [] and a deeply nested array', value: deeplyNested },
]
/** `P-TH-IM-1`'s TWELVE-SHAPE SETTING POOL (`§5.5.1`), ONE DRIVE EACH. */
const IM1_POOL: readonly { readonly id: string; readonly setting: () => unknown; readonly carried: boolean }[] = [
  { id: '(1) a short token', setting: () => TOKEN_A, carried: true },
  { id: '(2) a token this mechanism could plausibly "recognize"', setting: () => TOKEN_B, carried: true },
  { id: '(3) a CASE variant', setting: () => TOKEN_C, carried: true },
  { id: '(4) a WHITESPACE variant', setting: () => TOKEN_D, carried: true },
  { id: '(5) the empty string', setting: () => '', carried: false },
  { id: '(6) the argument OMITTED', setting: () => undefined, carried: false },
  { id: '(7) null', setting: () => null, carried: false },
  { id: '(8) a number (0, -0, NaN, 1)', setting: () => 0, carried: false },
  { id: '(9) a boolean (true/false)', setting: () => true, carried: false },
  { id: '(10) a Symbol and a 12n', setting: () => Symbol('s'), carried: false },
  { id: '(11) an object with recording toString/valueOf', setting: () => hookRecorder().value, carried: false },
  { id: '(12) a revoked Proxy and a trap-throwing Proxy', setting: revokedProxy, carried: false },
]
/** `P-TH-IM-3`'s TEN ATTRIBUTE-NAME SHAPES, one drive each. */
const IM3_POOL: readonly { readonly id: string; readonly name: () => unknown; readonly echoed: string | null; readonly omitted?: boolean }[] = [
  { id: '(1) a caller spelling', name: () => NAME_A, echoed: NAME_A },
  { id: '(2) a spelling the module must merely ECHO', name: () => NAME_B, echoed: NAME_B },
  { id: '(3) the empty string', name: () => '', echoed: null },
  { id: '(4) the argument OMITTED', name: () => undefined, echoed: null, omitted: true },
  { id: '(5) null', name: () => null, echoed: null },
  { id: '(6) a number (42, NaN)', name: () => 42, echoed: null },
  { id: '(7) a boolean', name: () => true, echoed: null },
  { id: '(8) a Symbol and a 12n', name: () => Symbol('n'), echoed: null },
  { id: '(9) an object with recording toString/valueOf', name: () => hookRecorder().value, echoed: null },
  { id: '(10) a revoked Proxy', name: revokedProxy, echoed: null },
]
/** `P-TH-IM-4`'s EIGHT RESOLVED-VALUE SHAPES, one drive each. */
const IM4_POOL: readonly { readonly id: string; readonly resolved: () => unknown; readonly removal: boolean; readonly value: string | null }[] = [
  { id: '(1) a token', resolved: () => TOKEN_A, removal: false, value: TOKEN_A },
  { id: '(2) a legal token that is not a boolean', resolved: () => 'false', removal: false, value: 'false' },
  { id: '(3) a legal token that is not a number', resolved: () => '0', removal: false, value: '0' },
  { id: '(4) a whitespace-only token', resolved: () => ' ', removal: false, value: ' ' },
  { id: '(5) the empty string', resolved: () => '', removal: true, value: '' },
  { id: '(6) null', resolved: () => null, removal: true, value: '' },
  { id: '(7) a non-string (number/boolean/Symbol/12n)', resolved: () => 42, removal: true, value: '' },
  { id: '(8) an object, an array and a function', resolved: () => ({ a: 1 }), removal: true, value: '' },
]
/** `P-TH-IM-2`'s EIGHT USABLE ENVIRONMENT SHAPES + its FOUR further drives. */
const IM2_SHAPES: readonly { readonly id: string; readonly env: () => unknown; readonly reads: boolean }[] = [
  { id: '(1) a plain object with a true member', env: () => ({ prefersDark: true }), reads: true },
  { id: '(2) a plain object with a false member', env: () => ({ prefersDark: false }), reads: false },
  { id: '(3) a FROZEN object with a true member', env: () => Object.freeze({ prefersDark: true }), reads: true },
  { id: '(4) a null-prototype record with an OWN true member', env: () => Object.assign(Object.create(null) as object, { prefersDark: true }), reads: true },
  { id: '(5) a second member that must be ignored', env: () => ({ prefersDark: true, extra: 'must-be-ignored' }), reads: true },
  { id: '(6) a non-enumerable OWN true member', env: nonEnumerableOwnEnv, reads: true },
  { id: '(7) a true member with a setting drawn from the IM-1 pool', env: () => ({ prefersDark: true }), reads: true },
  { id: '(8) a false member with a setting drawn from the IM-1 pool', env: () => ({ prefersDark: false }), reads: false },
]
/** `P-TH-TP-3`'s TEN HOSTILE ENVIRONMENT SHAPES, one drive each. */
const TP3_POOL: readonly { readonly id: string; readonly env: () => unknown }[] = [
  { id: '(1) the member MISSING', env: () => ({}) },
  { id: '(2) the member present as undefined', env: () => ({ prefersDark: undefined }) },
  { id: "(3) the member 'true' as a STRING", env: () => ({ prefersDark: 'true' }) },
  { id: "(4) the member 'false' as a STRING", env: () => ({ prefersDark: 'false' }) },
  { id: '(5) the member 1 as a NUMBER', env: () => ({ prefersDark: 1 }) },
  { id: '(6) the member 0 and the member NaN', env: () => ({ prefersDark: 0 }) },
  { id: '(7) the member [] and {} and a function', env: () => ({ prefersDark: [] }) },
  { id: '(8) env itself undefined / null / a non-object', env: () => 42 },
  { id: '(9) a record whose accessor THROWS', env: throwingAccessorEnv },
  { id: '(10) a revoked Proxy and a trap-throwing Proxy', env: revokedProxy },
]
/** `P-TH-TP-5`'s THREE REMOVAL SHAPES and its TWO instrument configurations. */
const TP5_SHAPES: readonly { readonly id: string; readonly resolved: () => unknown; readonly omitted: boolean }[] = [
  { id: '(1) the empty string', resolved: () => '', omitted: false },
  { id: '(2) null', resolved: () => null, omitted: false },
  { id: '(3) the argument OMITTED', resolved: () => undefined, omitted: true },
]
const TP5_INSTRUMENTS: readonly string[] = ['(i) recording-Proxy arguments + a fake element in scope', '(ii) the same drive with the arguments FROZEN']
/** `P-TH-TP-6`'s THREE COMPOSED SHAPES. */
const TP6_SHAPES: readonly { readonly id: string; readonly name: string; readonly setting: unknown; readonly env: unknown; readonly echoed: string | null; readonly removal: boolean }[] = [
  { id: "(1) a carried token with a strict-true env", name: NAME_A, setting: TOKEN_A, env: { prefersDark: true }, echoed: NAME_A, removal: false },
  { id: '(2) the composed REMOVAL', name: NAME_A, setting: '', env: {}, echoed: NAME_A, removal: true },
  { id: '(3) both rules degraded at once', name: '', setting: 42, env: { prefersDark: 1 }, echoed: null, removal: true },
]
/** A recording Proxy whose every trap counts, plus a fake element-shaped object
 *  that is NEVER passed to the module (`P-TH-TP-5`'s instrument). */
function recordingInstrument(): {
  readonly proxy: unknown
  readonly counts: () => number
  readonly fake: Record<string, unknown>
  readonly fakeWrites: () => number
} {
  const counts = { n: 0 }
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(target, prop, recv) {
      counts.n += 1
      return Reflect.get(target, prop, recv) as unknown
    },
    set(target, prop, val, recv) {
      counts.n += 1
      return Reflect.set(target, prop, val, recv)
    },
    has(target, prop) {
      counts.n += 1
      return Reflect.has(target, prop)
    },
    deleteProperty(target, prop) {
      counts.n += 1
      return Reflect.deleteProperty(target, prop)
    },
    ownKeys(target) {
      counts.n += 1
      return Reflect.ownKeys(target)
    },
    apply() {
      counts.n += 1
      return undefined
    },
  }
  const proxy = new Proxy(function () {} as unknown as Record<string, unknown>, handler)
  let writes = 0
  const fake: Record<string, unknown> = {}
  for (const m of [t('setAttribute'), t('removeAttribute'), 'classList', t('setProperty'), 'style']) {
    Object.defineProperty(fake, m, {
      value: () => {
        writes += 1
        return undefined
      },
      enumerable: true,
    })
  }
  return { proxy, counts: () => counts.n, fake, fakeWrites: () => writes }
}

// ===========================================================================
// 1. §3.5 X-1 / X-2 / X-4 / X-5 + §3.4 R-3's config half, R-9, R-6's
//    no-importer half — THE RED'S OWN PREMISE (`§4.2` step 1). Evaluable before
//    this unit's module exists.
// ===========================================================================
describe('§3.5 X-1 / X-2 / X-4 / X-5 + §3.4 R-9 / R-3(config) / R-6(no-importer) — the red set\'s own premise', () => {
  it('X-1 (§3.5) — the pair: the module\'s absence is the RED branch; its presence + the export census BY NAME is the GREEN branch', async () => {
    const moduleExists = existsSync(MODULE_SRC)
    expect(existsSync(new URL('./theme.test.ts', import.meta.url)), 'X-1 — this test file exists and is the test half of the pair (§5.1 row 2)').toBe(true)
    if (!moduleExists) {
      // THE RED BRANCH, governing AT RED TIME.
      expect(
        moduleExists,
        `X-1 (RED branch) — src/shared/theme.ts does not exist (${MODULE_PATH}): this is the RED form of the red set, and every row that drives the module fails on its own labelled assertion naming this fact (\`§4.1\`'s declared red shape). §5.1 row 1 is the path this unit must LAND.`,
      ).toBe(true)
      return
    }
    // THE GREEN BRANCH (module present): the pair's presence + the census BY NAME.
    const s = await resolveSurface()
    expect(s.reason, `X-1 (GREEN branch) — the module namespace is reachable: ${s.reason ?? 'ok'}`).toBe(null)
    for (const name of ['resolveTheme', 'applyThemeDeclaration']) {
      expect(typeof s.mod?.[name], `X-1 (GREEN branch) — the value export '${name}' is present (§2.1 item 1; the type half is §5.2 leg 5)`).toBe('function')
    }
    expect(
      Object.keys(s.mod ?? {}).sort(),
      'X-1 (GREEN branch) — the census is EXACTLY the two §2.1 VALUE names, so a third value export fails this premise',
    ).toEqual(['applyThemeDeclaration', 'resolveTheme'])
  })

  it('X-2 (§3.5) — this unit\'s contract is FILED: docs/specs/theme.md EXISTS and is THIS file\'s contract', () => {
    const specPath = join(ROOT, 'docs', 'specs', 'theme.md')
    expect(existsSync(specPath), `X-2 — the contract is filed at ${specPath} (the unit is not delegable without it, §4.5)`).toBe(true)
    const spec = readFileSync(specPath, 'utf8')
    expect(spec.split('\n')[0], 'X-2 — the first line names the unit and its two-function surface, so the file is the contract and not a sibling').toContain('U-THEME')
    expect(spec, 'X-2 — the contract declares the RULED discriminator spelling (§0A note 6); the as-filed spelling is kept visible only as a quotation').toContain('readonly source:')
  })

  it('X-4 / R-9 (§3.5, §3.4) — the page-design layer is ABSENT, so no coverage row and no demo-page entry can be owed', () => {
    expect(
      existsSync(join(ROOT, 'docs', 'skills', 'designing-pages.md')),
      'X-4 / R-9 — docs/skills/designing-pages.md does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update (§1 item 7, §7 item 6). THIS ROW\'S FAIL IS MEANINGFUL: if the file comes to exist, this unit owes the coverage row and the demo-page entry — and the honest form of that row is an ABSENCE row, because a mechanism that renders nothing contributes no page.',
    ).toBe(false)
  })

  it('X-5 (§3.5) — src/** carries NO theme/appearance/attribute-write/media-query/OS surface, and the only theme-ish artifact is index.html\'s existing rule', () => {
    const vocabulary = [t('matchMedia'), t('prefers-color-scheme'), t('data-theme'), t('color-scheme'), t('appearance')]
    const hits: string[] = []
    const readFile = (p: string): void => {
      const src = readFileSync(p, 'utf8')
      for (const v of vocabulary) if (scanForToken(src, v, false)) hits.push(`${p.replace(ROOT, '.')}: ${v}`)
    }
    readFile(join(ROOT, 'src', 'renderer', 'index.html'))
    const tsHits: string[] = []
    for (const p of srcTsFiles()) {
      const src = readFileSync(p, 'utf8')
      for (const v of [t('theme'), t('appearance'), t('dark')]) if (scanForToken(src, v, false)) tsHits.push(`${p.replace(ROOT, '.')}: ${v}`)
      readFile(p)
    }
    expect(
      tsHits,
      'X-5 — a src/**/*.ts search for the theme/appearance vocabulary returns ZERO matches (re-measured at §3.5 X-5). A FAIL here means a theme surface already exists and this unit\'s DENIED list must be re-derived.',
    ).toEqual([])
    expect(
      hits.length,
      `X-5 — a src/** search for the appearance vocabulary returns EXACTLY ONE matching line: the existing :root rule in src/renderer/index.html (the repo\'s EXISTING appearance authority, which is F1\'s surface and which nothing this unit returns can influence). Read: ${JSON.stringify(hits)}`,
    ).toBe(1)
    expect(hits[0], 'X-5 — the one match is in src/renderer/index.html, the DENIED path of §5.1 item 2').toContain('index.html')
  })

  it('R-3(config half) (§3.4) — package.json/package-lock.json carry the LANDED dependency and script sets: no new dependency, no new script key', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts?: Record<string, string>
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    const LANDED_SCRIPT_KEYS = ['clean', 'build', 'build:watch', 'start', 'start:http', 'typecheck', 'typecheck:tests', 'test', 'test:watch', 'battery', 'divergence', 'ui', 'mcp']
    const LANDED_DEV = ['@types/node', 'electron', 'esbuild', 'typescript', 'vitest']
    const LANDED_DEPS = ['@modelcontextprotocol/sdk', 'provident-ssr']
    // A SET claim against the NAMES, never a bare count (§4.4 S-TH-6).
    expect(Object.keys(pkg.scripts ?? {}).sort(), 'R-3 — the scripts KEY SET is the landed set: ANY further script key reddens this row, and a config change cannot satisfy it (§5.1 item 7, AGENTS.md item 4). §5.2 leg 5 adds NO script.').toEqual([...LANDED_SCRIPT_KEYS].sort())
    expect(Object.keys(pkg.devDependencies ?? {}).sort(), 'R-3 — no new devDependency: the register is executed by plain deterministic vitest tables with NO property runner and NO fast-check (§5.5).').toEqual([...LANDED_DEV].sort())
    expect(Object.keys(pkg.dependencies ?? {}).sort(), 'R-3 — the dependency SET is unchanged').toEqual([...LANDED_DEPS].sort())
  })

  it('R-6(no-importer half) (§3.4) — src/shared/theme.ts is imported by NO src/** file (a recursive tree probe, never a git command)', () => {
    const importerPattern = new RegExp(`['"][^'"]*${t('theme')}[^'"]*['"]`)
    const importers: string[] = []
    for (const p of srcTsFiles()) {
      const src = readFileSync(p, 'utf8')
      for (const line of src.split('\n')) {
        if (/\bimport\b|\brequire\s*\(/.test(line) && importerPattern.test(line)) importers.push(`${p.replace(ROOT, '.')}: ${line.trim()}`)
      }
    }
    expect(importers, 'R-6 — §2.5 item 5 answers the entry-point question NO: no src/** path reaches this mechanism, and at red time (module absent) the probe reads zero by construction; at green time it must STILL read zero, so a later importer is a FINDING.').toEqual([])
  })

  it('R-6 / §5.1 (allow-list census) — the DENIED paths are PRESENT and the unit\'s own artifact paths are the allow-list', () => {
    const denied = ['src/renderer/index.html', 'src/shared/dom-shim.ts', 'src/main/main.ts', 'package.json', 'vitest.config.ts', 'tsconfig.json', 'tsconfig.tests.json']
    for (const p of denied) {
      expect(existsSync(join(ROOT, p)), `R-6 — the DENIED path §5.1 names is PRESENT on disk: ${p}. The denial binds this unit's diff (a later F1 pass lawfully importing the module does NOT falsify U-THEME).`).toBe(true)
    }
    expect(existsSync(join(ROOT, 'docs', 'specs', 'theme-review.md')), 'R-6 / X-3 — the gate-1 record is a DENIED path (§5.1 item 11) and it EXISTS, so a later edit is a FINDING').toBe(true)
    expect(existsSync(MODULE_SRC), 'R-6 — the allow-list row 1 (`src/shared/theme.ts`) is the path this unit LANDs; absent at red time (the X-1 red branch)').toBe(false)
    expect(existsSync(new URL('./theme.test.ts', import.meta.url)), 'R-6 — the allow-list row 2 is THIS file').toBe(true)
  })
})

// ===========================================================================
// 2. §3.4 THE STATIC ROWS — R-1..R-12, each with its DECLARED EXEMPTIONS and
//    BOTH CONTROLS. (`§4.2` step 2; the scan rows read THIS module's bytes and
//    become evaluable exactly when it lands — `§4.1`.)
// ===========================================================================
describe('§3.4 R-1 / R-2 / R-7 / R-8 / R-10 / R-11 — the anti-evasion scans over the MODULE, exemptions named, both controls', () => {
  it('R-1 (§3.4) — the VOCABULARY row (P-TH-1/P-TH-3/P-TH-10): in the normalized view, comments scanned as code, no banned token occurs', () => {
    const view = moduleView()
    expect(view, 'R-1 — the module of §5.1 row 1 exists, so its bytes can be scanned (X-1\'s green form); at red time there are no bytes to scan and this row is red for that reason.').not.toBe(null)
    const hits = scanTokens(view as string, R1_RULES)
    expect(
      hits,
      `R-1 — the module's DECLARED EXEMPTIONS are NAMED here so the row is not vacuous (§4.4 S-TH-2): the contract vocabulary ${JSON.stringify(R1_EXEMPT)} as IDENTIFIERS and MEMBER NAMES, plus the five declared literal bodies. The NORMALIZED view joins string-literal concatenation BEFORE stripping quotes and scans COMMENTS as code, so an assembled or commented banned token FAILS. Offending: ${JSON.stringify(hits)}`,
    ).toEqual([])
    // POSITIVE control: the assembly evasion must FAIL the same scan.
    const assembly = `const a = ${t('da')} + ${t('rk')}`
    expect(scanTokens(normalizedView(assembly), R1_RULES).length, 'R-1 (POSITIVE control) — a FRAGMENT-ASSEMBLED banned token must FAIL the row (the joiner runs before quotes are stripped).').toBeGreaterThan(0)
    const commented = `// the caller may pass ${t('da')}${t('rk')}\nconst b = 1`
    expect(scanTokens(normalizedView(commented), R1_RULES).length, 'R-1 (POSITIVE control) — a banned token in a COMMENT must FAIL (comments are scanned as code).').toBeGreaterThan(0)
    expect(scanTokens(normalizedView(`const c = 1`), R1_RULES), 'R-1 (NEGATIVE control) — ordinary code with none of the tokens PASSES.').toEqual([])
  })

  it('R-2 (§3.4) — the NO-DOM / NO-WRITE / NO-OS-CALL row over the MODULE and over THIS test file, with the F-6 corpus as its positive control', () => {
    const src = moduleSource()
    expect(src, 'R-2 — the module exists so its access sites can be read').not.toBe(null)
    const moduleHits = scanRegexes(commentStrippedView(src as string), R2_RULES)
    expect(moduleHits, `R-2 — the module contains no attribute write, no element access, no node creation and no realm route; NO EXEMPTIONS (the row bans the whole class). Offending: ${JSON.stringify(moduleHits)}`).toEqual([])
    const testHits = scanRegexes(normalizedView(testFileBytes()), R2_RULES)
    const declaredControls = F6_CORPUS.map((c) => c.id)
    expect(
      testHits.filter((h) => !declaredControls.some((d) => h.includes(d))),
      `R-2 — THIS unit's own test file contains no write/read of the class either: its only occurrences are inside the ASSEMBLED F-6 control corpus (declared exemption: the five controls ${JSON.stringify(declaredControls)}).`,
    ).toEqual([])
    // THE F-6 CORPUS must FAIL the row: a scan that passes for any of the five is UNFALSIFIED.
    for (const corpus of F6_CORPUS) {
      expect(
        scanRegexes(corpus.text, R2_RULES).length > 0 || scanRegexes(corpus.text, R7_RULES).length > 0,
        `R-2 / R-7 (POSITIVE control ${corpus.id}) — the corpus MUST fail the scan: ${corpus.text}`,
      ).toBe(true)
    }
    expect(scanRegexes(`const arr = [1, 2][0]; const o = { a: 1 }; o.a = 2`, R2_RULES), 'R-2 (NEGATIVE control) — ordinary array indexing and local mutation PASS: a blanket ban on computed access is NOT claimed.').toEqual([])
  })

  it('R-7 (§3.4) — the NO-OS-READ / NO-MEDIA-QUERY row: exactly ONE comparison against the environment, and it is against the literal true', () => {
    const src = moduleSource()
    expect(src, 'R-7 — the module exists so its ambient-read surface can be read').not.toBe(null)
    const hits = scanRegexes(commentStrippedView(src as string), R7_RULES)
    expect(hits, `R-7 — no media query, no process/platform read, no navigator/UA sniffing, no theme cookie, no node:*/electron reach. The DECLARED EXEMPTION is the literal 'true' — the one comparison this contract requires. Offending: ${JSON.stringify(hits)}`).toEqual([])
    const strict = new RegExp(`${t('prefersDark')}\\s*===\\s*true`)
    expect(strict.test(src as string), 'R-7 — the module performs ONE strict comparison against the literal true (§2.3 item 2, §3.3 I-7).').toBe(true)
    expect(scanRegexes(commentStrippedView(`${t('matchMedia')}('(prefers-color-scheme: dark)')`), R7_RULES).length, 'R-7 (POSITIVE control) — a corpus reading a media query FAILS.').toBeGreaterThan(0)
    expect(scanRegexes(commentStrippedView(`const dark = env.prefersDark === true`), R7_RULES), 'R-7 (NEGATIVE control) — reading the caller\'s OWN injected member under strict identity PASSES.').toEqual([])
  })

  it('R-8 (§3.4) — the CLOSED-SET LITERAL row: the module\'s literal bodies are exactly the FIVE declared bodies, the typeof tags INCLUDED (S-TH-7)', () => {
    const src = moduleSource()
    expect(src, 'R-8 — the module exists so its literal bodies can be read').not.toBe(null)
    const bodies = [...new Set(literalBodiesOf(src as string))]
    const extra = bodies.filter((b) => !DECLARED_LITERAL_BODIES.includes(b))
    expect(
      extra,
      `R-8 — the declared closed set is NAMED: ${JSON.stringify(DECLARED_LITERAL_BODIES)} — and the two typeof-tag bodies are INSIDE it, because a row that excludes them reddens the module the value rules require (§2.1 item 5's limit, §4.4 S-TH-7). A token literal, an attribute-name literal, a custom-property literal, a THIRD source body or a spelling variant FAILS. Extra bodies read: ${JSON.stringify(extra)}`,
    ).toEqual([])
    const missing = DECLARED_LITERAL_BODIES.filter((b) => !bodies.includes(b))
    expect(missing, `R-8 — every declared body is PRESENT (a body the module needs but does not carry is the mirror error). Missing: ${JSON.stringify(missing)}`).toEqual([])
    expect(literalBodiesOf(`const t2 = ${t('da')} + ${t('rk')}`).filter((b) => !DECLARED_LITERAL_BODIES.includes(b)).length, 'R-8 (POSITIVE control) — a corpus carrying a token literal in a second constant FAILS, and the assembly evasion lands here too (the row reads the NORMALIZED view).').toBeGreaterThan(0)
    expect(literalBodiesOf(`const a = ${t('degraded-env')}`), 'R-8 (NEGATIVE control) — a corpus carrying a declared body PASSES.').toEqual([t('degraded-env')])
  })

  it('R-10 (§3.4) — the NO-INTERPRETATION / NO-PRECEDENCE row: no computation relates setting to prefersDark', () => {
    const src = moduleSource()
    expect(src, 'R-10 — the module exists so its computation surface can be read').not.toBe(null)
    const view = commentStrippedView(src as string)
    const forbidden: readonly RegexRule[] = [
      { id: 'a branch selecting a value from the reading', re: new RegExp(`${t('prefersDark')}\\s*\\?`) },
      { id: 'a comparison relating the two inputs', re: new RegExp(`${t('setting')}\\s*[=!]==?\\s*${t('prefersDark')}|${t('prefersDark')}\\s*[=!]==?\\s*${t('setting')}`) },
      { id: 'a transition or override vocabulary', re: /\boverride\b|\btransition\b|\btri-?state\b|\bfallback\b/ },
      { id: 'a token-minting assignment from the reading', re: new RegExp(`${t('setting')}\\s*=\\s*${t('prefersDark')}`) },
    ]
    const hits = scanRegexes(view, forbidden)
    expect(hits, `R-10 — no comparison, branch, transition, state name, override rule or tri-state member relates the two inputs; the ONE legal use of the reading is the prefersDark REPORT itself. Offending: ${JSON.stringify(hits)}`).toEqual([])
    expect(scanRegexes(`const out = env.prefersDark ? 'x' : 'y'`, forbidden).length, 'R-10 (POSITIVE control) — a module returning a token derived from the reading FAILS.').toBeGreaterThan(0)
    expect(scanRegexes(`const prefersDarkReport = env.prefersDark === true`, forbidden), 'R-10 (NEGATIVE control) — the strict reading carried into the REPORT PASSES.').toEqual([])
  })

  it('R-11 (§3.4) — the NO-SIBLING-COMPOSITION / NO-FABRICATED-EDGE row: no sibling surface and NONE to the control unit', () => {
    const src = moduleSource()
    expect(src, 'R-11 — the module exists so its references can be read').not.toBe(null)
    const view = normalizedView(src as string)
    const hits = R11_FORBIDDEN.filter((token) => view.includes(token))
    expect(hits, `R-11 — §2.5 items 3/4's non-edges are CHECKABLE claims: a reference to any named sibling surface or to the control unit FAILS (I-8; H-r6's dissolved-edge class). Offending: ${JSON.stringify(hits)}`).toEqual([])
    const importHits = scanRegexes(view, R4_RULES)
    expect(importHits, `R-4 / R-11 (CROSS-CHECK) — zero import statements of any path. Offending: ${JSON.stringify(importHits)}`).toEqual([])
    expect(R11_FORBIDDEN.filter((tk) => normalizedView(F7_IMPORT_CONTROLS.join('\n')).includes(tk)), 'R-11 (POSITIVE control) — the three named sibling imports must FAIL R-4/R-11 (they carry a sibling surface by name).').not.toEqual([])
    expect(R11_FORBIDDEN.filter((tk) => normalizedView(`const f = (x: unknown): boolean => x === true`).includes(tk)), 'R-11 (NEGATIVE control) — a module composing nothing PASSES.').toEqual([])
  })

  it('R-4 (§3.4) — the IMPORT-BOUNDARY row: ZERO import statements, with the THREE named positive controls', () => {
    const src = moduleSource()
    expect(src, 'R-4 — the module exists so its import census can be read').not.toBe(null)
    const statements = (src as string)
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => /^import\b/.test(line) || /\bimport\s*\(/.test(line) || /\brequire\s*\(/.test(line))
    const hits = scanRegexes(normalizedView(src as string), R4_RULES)
    expect(
      hits,
      `R-4 — the import census is NONE: no value import, no type-only import, no dynamic import(, no require(. ANY import statement of ANY path FAILS. Statements read: ${JSON.stringify(statements)}`,
    ).toEqual([])
    for (const control of F7_IMPORT_CONTROLS) {
      expect(scanRegexes(normalizedView(control), R4_RULES).length, `R-4 (POSITIVE control) — this named import form MUST FAIL: ${control}`).toBeGreaterThan(0)
    }
  })

  it('R-5 (§3.4) — the EXPORT-CENSUS row as a SET claim BY NAME: the two VALUE exports at run time; the three TYPE names on §5.2 leg 5', async () => {
    const s = await live()
    expect(Object.keys(s.mod).sort(), 'R-5(a) — the imported namespace\'s own keys, BY NAME: exactly resolveTheme and applyThemeDeclaration. A third value export FAILS.').toEqual(['applyThemeDeclaration', 'resolveTheme'])
    expect(
      Object.keys({ resolveTheme: 1, applyThemeDeclaration: 1, thirdExport: 1 }).sort(),
      'R-5(a) (POSITIVE control) — a namespace carrying a THIRD value export FAILS the same reading (the row is a SET claim, never a bare count — §4.4 S-TH-6).',
    ).not.toEqual(['applyThemeDeclaration', 'resolveTheme'])
    // R-5(b) — the TYPE half: a PRESENCE claim, pinned by §5.2 leg 5 (the
    // standalone strict tsc over THIS file), because a type name is ERASED at run
    // time and the runtime assertion above cannot fail for one.
    expect(true, 'R-5(b) — the three type-only names ThemeResolution / ThemeAttributeWrite / ThemeEnv are pinned by §5.2 leg 5: the type-only import at this file\'s head fails to COMPILE for a renamed, removed or unexported name. That leg is run and reported separately.').toBe(true)
  })

  it('R-12 (§3.4) — the MEMBER-CENSUS NEGATIVE row: exact three-name key sets in declared order, a fourth-member control, and the declared types on the leg', async () => {
    const s = await live()
    const r = s.resolveTheme(TOKEN_A, { prefersDark: true })
    expect(Object.keys(r), 'R-12(a) — a returned resolution\'s key set deep-equals exactly the declared three names, IN DECLARED ORDER.').toEqual([...RESOLUTION_KEYS])
    const w = s.applyThemeDeclaration(NAME_A, TOKEN_A)
    expect(Object.keys(w), 'R-12(a) — a returned write\'s key set likewise.').toEqual([...WRITE_KEYS])
    expect(
      Object.keys({ setting: 'x', prefersDark: false, source: 'env', extra: 1 }),
      'R-12(b) (POSITIVE control) — a record carrying a FOURTH member FAILS the census reading.',
    ).not.toEqual([...RESOLUTION_KEYS])
    expect(
      Object.keys({ name: null, value: '', removal: true, fourth: 0 }),
      'R-12(b) (POSITIVE control) — the write\'s fourth-member control.',
    ).not.toEqual([...WRITE_KEYS])
    expect(
      true,
      'R-12(c) — the DECLARED-TYPE half (setting/name are string|null; prefersDark/removal boolean; value string; all five readonly) is pinned by §5.2 leg 5\'s standalone strict tsc over THIS file, the only instrument with a falsifier for it.',
    ).toBe(true)
  })
})

// ===========================================================================
// §3.4 R-5(b) / R-12(c) — THE TYPE-LEVEL HALF, COMPILE-TIME ONLY. §5.2 leg 5
// (the standalone strict `tsc --noEmit` over THIS file) is the leg with a
// falsifier for these three claims; nothing here runs. Declared so the leg's
// claim is checkable at the source.
// ===========================================================================
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type IsReadonly<T, K extends keyof T> = Exact<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }> extends true ? false : true
/** R-5(b) — the three type-only names are EXPORTED, each with its declared member set. */
type R5bTypePresence = [
  Exact<keyof ThemeResolution, 'setting' | 'prefersDark' | 'source'>,
  Exact<keyof ThemeAttributeWrite, 'name' | 'value' | 'removal'>,
  Exact<keyof ThemeEnv, 'prefersDark'>,
]
/** R-12(c) — the declared member TYPES and the `readonly` claim, per member. */
type R12cTypes = [
  Exact<ThemeResolution['setting'], string | null>,
  Exact<ThemeResolution['prefersDark'], boolean>,
  Exact<ThemeResolution['source'], 'env' | 'degraded-env'>,
  Exact<ThemeAttributeWrite['name'], string | null>,
  Exact<ThemeAttributeWrite['value'], string>,
  Exact<ThemeAttributeWrite['removal'], boolean>,
  IsReadonly<ThemeResolution, 'setting'>,
  IsReadonly<ThemeResolution, 'prefersDark'>,
  IsReadonly<ThemeResolution, 'source'>,
  IsReadonly<ThemeAttributeWrite, 'name'>,
  IsReadonly<ThemeAttributeWrite, 'value'>,
  IsReadonly<ThemeAttributeWrite, 'removal'>,
  IsReadonly<ThemeEnv, 'prefersDark'>,
]
/** `§2.1` item 2's ARITY and RETURN SHAPES at the type layer. */
type R5bArity = [
  Exact<Parameters<typeof resolveTheme>, [setting: unknown, env: unknown]>,
  Exact<ReturnType<typeof resolveTheme>, ThemeResolution>,
  Exact<Parameters<typeof applyThemeDeclaration>, [attributeName: unknown, resolved: unknown]>,
  Exact<ReturnType<typeof applyThemeDeclaration>, ThemeAttributeWrite>,
]
export const TYPE_LEVEL_ONLY: readonly [ExportedTypes, R5bTypePresence, R12cTypes, R5bArity] = [
  [null as unknown as ThemeResolution, null as unknown as ThemeAttributeWrite, null as unknown as ThemeEnv],
  [true, true, true],
  [true, true, true, true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true],
]

// ===========================================================================
// 3. §3.2 F-1..F-8 and §3.3 I-1..I-11 — THE TOTALITY / DEGRADATION SURFACE
//    FIRST (`§4.2` step 3: a totality claim is what the whole contract rests
//    on). F-2 (the hostile environment) and F-3/F-4 (the removal and the name
//    arms) are the three rows carrying the unit's hardest claims.
// ===========================================================================
describe('§3.2 F-1..F-8 — the documented fail-states (every outcome is a VALUE, never an error)', () => {
  it('F-1 (§3.2) — AN UNUSABLE SETTING, driven in full: setting reads null for every outside shape, and NO coercion hook is consulted', async () => {
    const s = await live()
    const outside: readonly { readonly id: string; readonly make: () => unknown; readonly omitted?: boolean }[] = [
      { id: 'omitted', make: () => undefined, omitted: true },
      { id: 'null', make: () => null },
      { id: "''", make: () => '' },
      { id: '0', make: () => 0 },
      { id: '-0', make: () => -0 },
      { id: 'NaN', make: () => Number.NaN },
      { id: 'false', make: () => false },
      { id: 'true', make: () => true },
      { id: 'a Symbol', make: () => Symbol('s') },
      { id: '12n', make: () => 12n },
      { id: '{}', make: () => ({}) },
      { id: 'Object.create(null)', make: () => Object.create(null) as object },
      { id: '[]', make: () => [] },
      { id: 'a Map', make: () => new Map() },
      { id: 'a function', make: () => function f(): void {} },
      { id: 'a revoked Proxy', make: revokedProxy },
      { id: 'a trap-throwing Proxy', make: trapThrowingProxy },
      { id: 'an object with a THROWING toString', make: () => ({ toString: (): never => { throw new Error('toString') } }) },
    ]
    for (const c of outside) {
      const arg = c.make()
      const rec = hookRecorder()
      const { value, thrown } = drove(() => (c.omitted ? resolveOmitted(s.resolveTheme, { prefersDark: true }) : s.resolveTheme(arg, { prefersDark: true })))
      expect(thrown, `F-1 / I-1 — setting=${c.id}: NOTHING THROWS for any unusable setting.`).toBe(null)
      const res = value as ThemeResolution
      expect(Object.keys(res), `F-1 — setting=${c.id}: the declared three-name census still holds.`).toEqual([...RESOLUTION_KEYS])
      expect(res.setting, `F-1 — setting=${c.id}: the declared null, never '', never a fabricated default and never a sentinel.`).toBe(null)
      expect(res.prefersDark, `F-1 — setting=${c.id}: the env reading is UNAFFECTED by the setting's shape.`).toBe(true)
      expect(res.source, `F-1 — setting=${c.id}: source is '${t('env')}' — the setting's shape does not degrade the ENVIRONMENT reading.`).toBe(t('env'))
      expect(rec.counts, `F-1 — setting=${c.id}: the recorder is untouched (it is never passed).`).toEqual({ toString: 0, valueOf: 0 })
    }
    // The coercion hooks on an OBJECT the module would have to coerce.
    const hooks = hookRecorder()
    const out = s.resolveTheme(hooks.value, { prefersDark: false }) as ThemeResolution
    expect(out.setting, 'F-1 — an object argument reads the declared null.').toBe(null)
    expect(hooks.counts, 'F-1 / §2.3 item 1(c) — String(), toString and valueOf are NEVER invoked for the setting: the ONE operation is a typeof test and an emptiness test.').toEqual({ toString: 0, valueOf: 0 })
    // The NAMED cross-check: the object is not a usable token by any reading.
    expect(typeof hooks.value === 'object' && out.setting === null, 'F-1 — the object is outside the pass-through form and the return says so as DATA.').toBe(true)
  })

  it('F-2 (§3.2) — A HOSTILE ENVIRONMENT, the whole twelve-row table as its own row, with the FROZEN-true exception', async () => {
    const s = await live()
    const hostile: readonly { readonly id: string; readonly env: () => unknown; readonly reads: boolean }[] = [
      { id: '(3) the member MISSING', env: () => ({}), reads: false },
      { id: '(4) the member present as undefined', env: () => ({ prefersDark: undefined }), reads: false },
      { id: '(5) env omitted/null/non-object', env: () => undefined, reads: false },
      { id: '(6) a string member', env: () => ({ prefersDark: 'false' }), reads: false },
      { id: '(7) a number member', env: () => ({ prefersDark: 1 }), reads: false },
      { id: '(8) an array/object member', env: () => ({ prefersDark: [] }), reads: false },
      { id: '(9) a FROZEN record with a true member', env: () => Object.freeze({ prefersDark: true }), reads: true },
      { id: '(10) a THROWING accessor', env: throwingAccessorEnv, reads: false },
      { id: '(11) a revoked Proxy', env: revokedProxy, reads: false },
      { id: '(11b) a trap-throwing Proxy', env: trapThrowingProxy, reads: false },
      { id: '(12) an INHERITED member', env: inheritedEnv, reads: false },
      { id: '(5b) a number / string / boolean / Symbol / 12n env', env: () => 12n, reads: false },
    ]
    for (const c of hostile) {
      const { value, thrown } = drove(() => s.resolveTheme(TOKEN_A, c.env()))
      expect(thrown, `F-2 — env=${c.id}: NOTHING THROWS, the revoked Proxy's TypeError and the throwing accessor's throw INCLUDED.`).toBe(null)
      const res = value as ThemeResolution
      expect(res.setting, `F-2 — env=${c.id}: the setting is carried unaffected by the environment's shape.`).toBe(TOKEN_A)
      expect(res.prefersDark, `F-2 — env=${c.id}: the declared pair of §2.3 item 2's table.`).toBe(c.reads)
      expect(res.source, `F-2 — env=${c.id}: source reads ${c.reads ? `'${t('env')}' (a frozen true member is a NORMAL reading, NOT a degradation)` : `'${t('degraded-env')}' (the degradation is OBSERVABLE)`}.`).toBe(c.reads ? t('env') : t('degraded-env'))
      expect(Object.keys(res), `F-2 — env=${c.id}: no member is FABRICATED and the census holds.`).toEqual([...RESOLUTION_KEYS])
    }
  })

  it('F-3 (§3.2) — THE NON-REMOVAL / REMOVAL SPLIT from both sides: legal tokens are never read as booleans or numbers', async () => {
    const s = await live()
    const nonRemoval = [TOKEN_A, '0', 'false', ' ']
    const removal = ['', null, undefined, 42, Symbol('r'), {}]
    for (const v of nonRemoval) {
      const w = s.applyThemeDeclaration(NAME_A, v) as ThemeAttributeWrite
      expect(w.removal, `F-3 — resolved=${JSON.stringify(v)} is a NON-EMPTY STRING and must read removal: false — a legal token, never a boolean or a number.`).toBe(false)
      expect(w.value, `F-3 — resolved=${JSON.stringify(v)}: the value is the caller's own string BY IDENTITY.`).toBe(v)
      expect(w.name, 'F-3 — the name is independent of the removed/non-removed arm.').toBe(NAME_A)
    }
    for (const v of removal) {
      const { value, thrown } = drove(() => s.applyThemeDeclaration(NAME_A, v))
      expect(thrown, `F-3 — resolved=${String(v)}: NOTHING THROWS.`).toBe(null)
      const w = value as ThemeAttributeWrite
      expect(w.removal, `F-3 — resolved=${String(v)} is outside the pass-through form and reads the REMOVAL case.`).toBe(true)
      expect(w.value, 'F-3 — the removal case\'s value is the declared \'\' EXACTLY.').toBe('')
      expect(w.name, 'F-3 — the name is ECHOED even on a removal.').toBe(NAME_A)
      expect(Object.keys(w), 'F-3 — the removal case carries NO absent member and NO fourth member.').toEqual([...WRITE_KEYS])
    }
  })

  it('F-4 (§3.2) — AN UNUSABLE ATTRIBUTE NAME, and the independence of the two arguments (the CROSSED drives)', async () => {
    const s = await live()
    const unusable: readonly { readonly id: string; readonly make: () => unknown; readonly omitted?: boolean }[] = [
      { id: "''", make: () => '' },
      { id: 'omitted', make: () => undefined, omitted: true },
      { id: 'null', make: () => null },
      { id: '42', make: () => 42 },
      { id: 'true', make: () => true },
      { id: 'a Symbol', make: () => Symbol('n') },
      { id: '12n', make: () => 12n },
      { id: '{}', make: () => ({}) },
      { id: '[]', make: () => [] },
      { id: 'a function', make: () => function f(): void {} },
      { id: 'a revoked Proxy', make: revokedProxy },
    ]
    for (const c of unusable) {
      const arg = c.make()
      const { value, thrown } = drove(() => (c.omitted ? applyOmitted(s.applyThemeDeclaration, TOKEN_A) : s.applyThemeDeclaration(arg, TOKEN_A)))
      expect(thrown, `F-4 — name=${c.id}: NOTHING THROWS; the declared null is the answer.`).toBe(null)
      const w = value as ThemeAttributeWrite
      expect(w.name, `F-4 — name=${c.id}: reads the declared null (no default name, no coercion).`).toBe(null)
      expect(w.removal, 'F-4 — the removal arm is driven by the OTHER argument and is unaffected.').toBe(false)
      expect(w.value, 'F-4 — the value is the resolved token by identity.').toBe(TOKEN_A)
    }
    expect(s.applyThemeDeclaration('', ''), 'F-4 (CROSSED) — an unusable name AND an unusable resolved: a removal with a null name is a NORMAL return.').toEqual({ name: null, value: '', removal: true })
    expect(s.applyThemeDeclaration(NAME_A, ''), 'F-4 (CROSSED) — a removal WITH AN ECHOED NAME is a NORMAL return, not a contradiction (§2.4 item 2\'s independence clause).').toEqual({ name: NAME_A, value: '', removal: true })
  })

  it('F-5 (§3.2) — THE COMPOSED PATH, driven over the declared cross-product: 4 settings × 3 envs × 2 names', async () => {
    const s = await live()
    const settings: readonly { readonly id: string; readonly v: unknown; readonly carried: string | null }[] = [
      { id: 'a token', v: TOKEN_A, carried: TOKEN_A },
      { id: "''", v: '', carried: null },
      { id: 'null', v: null, carried: null },
      { id: '42', v: 42, carried: null },
    ]
    const envs: readonly { readonly id: string; readonly v: unknown }[] = [
      { id: '{prefersDark: true}', v: { prefersDark: true } },
      { id: '{}', v: {} },
      { id: 'a throwing accessor', v: throwingAccessorEnv() },
    ]
    const names: readonly { readonly v: unknown; readonly echoed: string | null }[] = [
      { v: NAME_A, echoed: NAME_A },
      { v: '', echoed: null },
    ]
    let cells = 0
    for (const st of settings) {
      for (const e of envs) {
        for (const n of names) {
          cells += 1
          const { value, thrown } = drove(() => s.applyThemeDeclaration(n.v, (s.resolveTheme(st.v, e.v) as ThemeResolution).setting))
          expect(thrown, `F-5 — cell (setting=${st.id}, env=${e.id}, name=${String(n.v)}): NOTHING THROWS, the throwing-accessor env included.`).toBe(null)
          const w = value as ThemeAttributeWrite
          expect(Object.keys(w), `F-5 — cell ${cells}: a declared ThemeAttributeWrite with the exact three-name census.`).toEqual([...WRITE_KEYS])
          expect(w.name, `F-5 — cell ${cells}: the name comes from the NAME rule ALONE.`).toBe(n.echoed)
          expect(w.removal, `F-5 — cell ${cells}: the removal comes from the RESOLVED value alone.`).toBe(st.carried === null)
          expect(w.value, `F-5 — cell ${cells}: the composed value is the resolution's own setting member by identity.`).toBe(st.carried ?? '')
        }
      }
    }
    expect(s.applyThemeDeclaration('', (s.resolveTheme(TOKEN_A, {}) as ThemeResolution).setting), 'F-5 (NAMED) — (\'\' , resolveTheme(token, {}).setting) reads {name: null, value: <token>, removal: false}.').toEqual({ name: null, value: TOKEN_A, removal: false })
    expect(s.applyThemeDeclaration(NAME_A, (s.resolveTheme(null, {}) as ThemeResolution).setting), 'F-5 (NAMED) — (name, resolveTheme(null, {}).setting) reads {name: <echoed>, value: \'\', removal: true}.').toEqual({ name: NAME_A, value: '', removal: true })
    expect(cells, 'F-5 — the declared cross-product is 4 × 3 × 2 = 24 cells, all driven.').toBe(24)
  })

  it('F-6 (§3.2) — THE NO-WRITE / NO-DOM CONTROL: a corpus that MUST FAIL R-2 and R-7 in all five shapes', () => {
    const caught = F6_CORPUS.map((c) => ({ id: c.id, hits: [...scanRegexes(c.text, R2_RULES), ...scanRegexes(c.text, R7_RULES)] }))
    for (const c of caught) {
      expect(c.hits.length, `F-6 — the control must FAIL the row it is attached to (${c.id}); a scan that passes for any of the five is UNFALSIFIED and must not be filed (§4.4 S-TH-2). Read: ${JSON.stringify(c)}`).toBeGreaterThan(0)
    }
    expect(caught.length, 'F-6 — the corpus carries FIVE shapes (a),(b),(c),(d),(e).').toBe(5)
  })

  it('F-7 (§3.2) — THE IMPORT-CLASS CONTROL: exactly ONE import of ANY path must FAIL R-4, with the three named forms as controls', () => {
    for (const control of F7_IMPORT_CONTROLS) {
      expect(scanRegexes(normalizedView(control), R4_RULES).length, `F-7 — this named control must FAIL R-4: ${control}`).toBeGreaterThan(0)
    }
    expect(
      scanRegexes(normalizedView(`import type { ThemeEnv } from './theme.js'`), R4_RULES).length,
      'F-7 — even the unit\'s OWN module path as a type-only import FAILS: the census is NONE.',
    ).toBeGreaterThan(0)
    expect(scanRegexes(normalizedView(`const x: unknown = 1`), R4_RULES), 'F-7 (NEGATIVE control) — an import-free corpus PASSES.').toEqual([])
  })

  it('F-8 (§3.2) — A SECOND CALL\'S INDEPENDENCE: five repeated calls return EQUAL values and FRESH records (S-TH-8)', async () => {
    const s = await live()
    const callSets: readonly { readonly id: string; readonly call: () => unknown }[] = [
      { id: 'resolveTheme(token, {prefersDark: true})', call: () => s.resolveTheme(TOKEN_A, { prefersDark: true }) },
      { id: 'resolveTheme(token, {prefersDark: false})', call: () => s.resolveTheme(TOKEN_A, { prefersDark: false }) },
      { id: 'applyThemeDeclaration(name, token)', call: () => s.applyThemeDeclaration(NAME_A, TOKEN_A) },
      { id: 'applyThemeDeclaration(name, the removal case)', call: () => s.applyThemeDeclaration(NAME_A, '') },
    ]
    for (const set of callSets) {
      const five = [0, 1, 2, 3, 4].map(() => set.call())
      for (let i = 1; i < five.length; i += 1) {
        expect(five[i], `F-8 — ${set.id}: every repeated call returns an EQUAL value (toEqual), call ${i + 1}.`).toEqual(five[0])
        expect(five[i], `F-8 / S-TH-8 — ${set.id}: each returned RECORD is a DISTINCT OBJECT (pairwise !==), call ${i + 1}. A toBe between two calls' records FAILS BY DESIGN (§2.4 item 4).`).not.toBe(five[0])
      }
      expect(new Set(five).size, `F-8 — ${set.id}: five DISTINCT record objects.`).toBe(5)
      const first = five[0] as Record<string, unknown>
      for (const key of Object.keys(first)) {
        if (typeof first[key] === 'string' && first[key] !== '') {
          expect(five[4], `F-8 — ${set.id}: no observable state differs between the first and the fifth call.`).toEqual(first)
        }
      }
    }
    const carried = callSets[0].call() as ThemeResolution
    expect(carried.setting, 'F-8 — the resolved setting member is the caller\'s own token BY IDENTITY in every call.').toBe(TOKEN_A)
  })
})

describe('§3.3 I-1..I-11 — the invariants that hold in every state', () => {
  it('I-1 / I-2 (§3.3) — NO ENTRY POINT THROWS for any argument, and the environment reading is STRICT and a REPORT, never a source', async () => {
    const s = await live()
    const settings: readonly unknown[] = [TOKEN_A, '', null, undefined, 42, Symbol('s'), 12n, {}, [], function f(): void {}, revokedProxy(), trapThrowingProxy()]
    const envs: readonly unknown[] = [{ prefersDark: true }, { prefersDark: false }, {}, { prefersDark: 1 }, throwingAccessorEnv(), revokedProxy(), undefined, null]
    for (const st of settings) {
      for (const e of envs) {
        const { value, thrown } = drove(() => s.resolveTheme(st, e))
        expect(thrown, `I-1 — resolveTheme(setting=${String(st)}, env) THREW; §3.3 I-1 forbids a throw for ANY argument: an unusable input produces a DECLARED VALUE.`).toBe(null)
        const res = value as ThemeResolution
        const strict = typeof e === 'object' && e !== null && Object.getOwnPropertyDescriptor(e, 'prefersDark')?.value === true
        expect(res.prefersDark, `I-2 — the reading is STRICT === true of the SINGLE declared OWN member; env=${String(e)}`).toBe(strict === true)
        expect(res.source, `I-2 — the degradation is OBSERVABLE: source reads '${t('degraded-env')}' whenever the reading was absorbed.`).toBe(strict === true ? t('env') : t('degraded-env'))
        expect(res.setting, 'I-2 / §2.3 item 3 — prefersDark is a REPORT and NEVER the source of setting: the carried token is unaffected by the reading.').toBe(typeof st === 'string' && st !== '' ? st : null)
      }
    }
  })

  it('I-3 / I-4 (§3.3) — the returned records\' census and freshness, and NO store / cache / module-level mutable state', async () => {
    const s = await live()
    const r1 = s.resolveTheme(TOKEN_A, { prefersDark: true })
    const r2 = s.resolveTheme(TOKEN_A, { prefersDark: true })
    expect(keyBreakOf(r1, RESOLUTION_KEYS), 'I-3 — three members on ThemeResolution, in declared order, no phantom and no missing member.').toBe(null)
    expect(freshnessBreakOf(r1 as unknown as Record<string, unknown>, RESOLUTION_KEYS), 'I-3 — each returned record is a FRESH plain object: Object.prototype, data properties, nothing frozen.').toBe(null)
    expect(r1, 'I-3 — the records are equal but DISTINCT.').not.toBe(r2)
    const w1 = s.applyThemeDeclaration(NAME_A, TOKEN_A)
    expect(keyBreakOf(w1, WRITE_KEYS), 'I-3 — three members on ThemeAttributeWrite, in declared order.').toBe(null)
    expect(freshnessBreakOf(w1 as unknown as Record<string, unknown>, WRITE_KEYS), 'I-3 — fresh plain object.').toBe(null)
    // I-4: nothing is retained across calls — the module holds no value between
    // invocations. The observable form available on this layer: an identical
    // drive repeated LATER reads identically, and the caller's own objects are
    // never mutated.
    const env = { prefersDark: true }
    const snapshot = JSON.stringify(env)
    const first = JSON.stringify(s.resolveTheme(TOKEN_A, env))
    expect(JSON.stringify(s.resolveTheme(TOKEN_A, env)), 'I-4 — no store, no cache, no drift: the same call reads the same value later in the run.').toBe(first)
    expect(JSON.stringify(env), 'I-4 / §2.5 item 1 — the module never writes to or retains the caller\'s objects.').toBe(snapshot)
  })

  it('I-5 / I-10 (§3.3) — the mechanism decides NO POLICY, and the ONLY degenerate values are null, false and the empty string', async () => {
    const s = await live()
    const degenerates: unknown[] = []
    degenerates.push((s.resolveTheme(42, { prefersDark: true }) as ThemeResolution).setting)
    degenerates.push((s.applyThemeDeclaration(42, TOKEN_A) as ThemeAttributeWrite).name)
    degenerates.push((s.resolveTheme(TOKEN_A, {}) as ThemeResolution).prefersDark)
    degenerates.push((s.applyThemeDeclaration(NAME_A, '') as ThemeAttributeWrite).value)
    expect(degenerates, 'I-10 — the declared degenerate values are null (an unusable setting, an unusable name), false (an unusable reading) and the empty string (the removal case\'s value) — and they are the ONLY ones.').toEqual([null, null, false, ''])
    expect((s.resolveTheme('', { prefersDark: true }) as ThemeResolution).setting, 'I-5 — the empty setting reads the declared null, NEVER the empty string (the absence of a token, never a fabricated default).').toBe(null)
    expect((s.applyThemeDeclaration('', TOKEN_A) as ThemeAttributeWrite).name, 'I-5 — an unusable name is an ABSENCE, not a default attribute: null, never a mechanism-chosen spelling.').toBe(null)
  })

  it('I-6 / I-7 (§3.3) — no UI content, no write, and NO OS CLAIM: every reading is data-in/data-out', async () => {
    const s = await live()
    const rec = recordingInstrument()
    const before = rec.fakeWrites()
    const { value, thrown } = drove(() => s.applyThemeDeclaration(rec.proxy as unknown, rec.proxy as unknown))
    expect(thrown, 'I-6 — the applier performs NO write: it takes no element parameter and CALLS NOTHING.').toBe(null)
    expect(writeBreakOf(value, 'I-6'), 'I-6 — the returned value is the declaration as DATA.').toBe(null)
    expect(rec.fakeWrites(), 'I-6 / P-TH-9 — the fake element\'s write counters are 0: no attribute was written anywhere.').toBe(before)
    expect(
      s.resolveTheme(TOKEN_A, { prefersDark: true }),
      'I-7 — the ONLY claim is data-in/data-out: a caller-supplied environment claim produces a value, and NO row of this unit asserts that an OS preference was read, that a media query matched, that an attribute was applied, that a stylesheet reacted or that the app looks different.',
    ).toEqual({ setting: TOKEN_A, prefersDark: true, source: t('env') })
  })

  it('I-8 / I-9 (§3.3) — NO import edge in either direction, no MCP surface, no shim member, no new dependency and no store', async () => {
    const s = await live()
    expect(Object.keys(s.mod).sort(), 'I-8 — the module exposes nothing but its two declared value exports: no MCP registration site, no tool, no resource, no group, no RPC method.').toEqual(['applyThemeDeclaration', 'resolveTheme'])
    const shim = readOrNull(join(ROOT, 'src', 'shared', 'dom-shim.ts'))
    expect(shim, 'I-9 — src/shared/dom-shim.ts exists and is FROZEN (SHIM-COMPLETION-CARVE-OUT admits exactly ONE member; this unit adds none — its removal case is DATA).').not.toBe(null)
    expect(
      /removeAttribute\s*\(/.test(shim as string),
      'I-9 — the one admitted shim member is present in the shim as landed; THIS UNIT neither adds a member nor CALLS it.',
    ).toBe(true)
  })

  it('I-11 (§3.3) — [U] is NOT offered and [D] is NOT claimed: both refusals are STRUCTURAL, and gate 6 is never "waived"', () => {
    const spec = readFileSync(join(ROOT, 'docs', 'specs', 'theme.md'), 'utf8')
    expect(spec, 'I-11 — the contract records gate 6 as STRUCTURAL').toContain('STRUCTURAL')
    expect(spec, 'I-11 — the §7.1 predicate decision is recorded as DOES NOT TRIGGER').toContain('DOES NOT TRIGGER')
    expect(/\[U\].{0,200}not offered|THE `\[U\]` ROW IS NOT OFFERED/s.test(spec), 'I-11 — the three-part [U] refusal is recorded (the refusal · the structural reason · the zones.md §4.4 S-6 sentence).').toBe(true)
    expect(spec.includes('`[D]` ROW IS NOT CLAIMED') || /\[D\].{0,120}not claimed/i.test(spec), 'I-11 — the [D] non-claim is recorded.').toBe(true)
  })
})

// ===========================================================================
// 4. §3.1 M-1..M-7 — the happy states, with M-5/M-6 beside the static rows and
//    M-7 (the one composition drive) LAST (`§4.2` step 4).
// ===========================================================================
describe('§3.1 M-1..M-7 — the valid / happy states', () => {
  it('M-1 (§3.1) — the resolver returns the THREE-member resolution and the top-level census is EXACTLY three names', async () => {
    const s = await live()
    const resolution = s.resolveTheme(TOKEN_A, { prefersDark: true }) as ThemeResolution
    expect(Object.keys(resolution), 'M-1 — Object.keys deep-equals the declared three names IN THAT ORDER.').toEqual([...RESOLUTION_KEYS])
    expect(resolution.setting, 'M-1 — the caller\'s own string BY IDENTITY (toBe).').toBe(TOKEN_A)
    expect(resolution.prefersDark, 'M-1 — the strict reading.').toBe(true)
    expect(resolution.source, `M-1 — source is '${t('env')}' when the reading resolved normally.`).toBe(t('env'))
    expect(Object.getPrototypeOf(resolution), 'M-1 — the prototype is Object.prototype.').toBe(Object.prototype)
    for (const k of RESOLUTION_KEYS) {
      const d = Object.getOwnPropertyDescriptor(resolution, k)
      expect(d?.get, `M-1 — member '${k}' is a data property, never a getter.`).toBeUndefined()
    }
    expect(revokedProxy(), 'M-1 — the drive above reached here without a throw.').not.toBe(null)
  })

  it('M-2 (§3.1) — the pass-through is EXACT: the caller\'s token is carried and NOTHING is interpreted', async () => {
    const s = await live()
    const tokens: readonly string[] = [TOKEN_A, 'light', TOKEN_B, TOKEN_C, TOKEN_D, LONG_TOKEN, 'a-b_c-d', 'Ω✓']
    for (const token of tokens) {
      const res = s.resolveTheme(token, { prefersDark: true }) as ThemeResolution
      expect(res.setting, `M-2 — the token ${JSON.stringify(token)} is returned CHARACTER FOR CHARACTER BY IDENTITY: never folded, never trimmed, never parsed, never validated against a vocabulary.`).toBe(token)
      expect(res.source, `M-2 — source is '${t('env')}' in every drive.`).toBe(t('env'))
    }
    expect((s.resolveTheme(TOKEN_C, {}) as ThemeResolution).setting, 'M-2 — an upper-case variant is NOT folded (the row a member-pool implementation FAILS).').toBe(TOKEN_C)
    expect((s.resolveTheme(TOKEN_D, {}) as ThemeResolution).setting, 'M-2 — a padded token is NOT trimmed.').toBe(TOKEN_D)
    expect((s.resolveTheme(TOKEN_B, {}) as ThemeResolution).setting, 'M-2 / P-TH-10 — a plausible "recognized" token is NOT treated as a third state: it is carried.').toBe(TOKEN_B)
    expect(LONG_TOKEN.length, 'M-2 — the 200-character token of the row is really 200 characters.').toBe(200)
  })

  it('M-3 (§3.1) — the environment reading is STRICT and the report is INDEPENDENT of the token', async () => {
    const s = await live()
    const a = s.resolveTheme(TOKEN_A, { prefersDark: false }) as ThemeResolution
    expect(a.prefersDark, 'M-3(a) — a FALSE member is a NORMAL reading, not a degradation.').toBe(false)
    expect(a.source, `M-3(a) — source is '${t('env')}': a legitimate false member is NOT degraded.`).toBe(t('env'))
    expect(a.setting, 'M-3(a) — the setting is its own token by identity, unaffected by the environment.').toBe(TOKEN_A)
    const b = s.resolveTheme('light', { prefersDark: true }) as ThemeResolution
    expect(b.prefersDark, 'M-3(b) — the strict reading.').toBe(true)
    expect(b.setting, 'M-3(b) — the token is carried, not replaced by anything the reading would imply.').toBe('light')
    const c = s.resolveTheme('x', {}) as ThemeResolution
    expect(c.prefersDark, 'M-3(c) — a MISSING member degrades.').toBe(false)
    expect(c.source, 'M-3(c) — the degradation is observable.').toBe(t('degraded-env'))
    const d = s.resolveTheme('x', { prefersDark: 1 }) as ThemeResolution
    expect(d.prefersDark, 'M-3(d) — the number 1 is NOT read as true (the sharpest discriminator; a truthiness implementation FAILS here).').toBe(false)
    expect(d.source, 'M-3(d) — and the absorption is reported.').toBe(t('degraded-env'))
  })

  it('M-4 (§3.1) — the applier returns the write record and the top-level census is EXACTLY three names', async () => {
    const s = await live()
    const write = s.applyThemeDeclaration(NAME_A, TOKEN_A) as ThemeAttributeWrite
    expect(Object.keys(write), 'M-4 — Object.keys deep-equals [name, value, removal] in that order.').toEqual([...WRITE_KEYS])
    expect(write.name, 'M-4 — the caller\'s name BY IDENTITY.').toBe(NAME_A)
    expect(write.value, 'M-4 — the resolved value BY IDENTITY.').toBe(TOKEN_A)
    expect(write.removal, 'M-4 — a non-empty resolved string reads removal: false.').toBe(false)
    expect(writeBreakOf(write, 'M-4'), 'M-4 — string | null and the two declared member types.').toBe(null)
    expect(revokedProxy(), 'M-4 — NO element, attribute or class was touched anywhere in the drive: the surface has no element parameter at all (the drive passed two values).').not.toBe(null)
  })

  it('M-5 (§3.1) — THE REMOVAL CASE IS RETURNED AS DATA, for both triggers, with the name echoed', async () => {
    const s = await live()
    const drives: readonly { readonly id: string; readonly call: () => unknown }[] = [
      { id: "(a) resolved=''", call: () => s.applyThemeDeclaration(NAME_A, '') },
      { id: '(b) resolved=null', call: () => s.applyThemeDeclaration(NAME_A, null) },
      { id: "(c) resolved=resolveTheme('', {}).setting", call: () => s.applyThemeDeclaration(NAME_A, (s.resolveTheme('', {}) as ThemeResolution).setting) },
      { id: '(d) resolved omitted', call: () => applyOmitted(s.applyThemeDeclaration, undefined) },
    ]
    for (const d of drives) {
      const { value, thrown } = drove(d.call)
      expect(thrown, `M-5 — ${d.id}: NOTHING THROWS.`).toBe(null)
      expect(value, `M-5 — ${d.id}: every trigger returns the NAME ECHOED, the declared empty value and removal true.`).toEqual({ name: NAME_A, value: '', removal: true })
    }
  })

  it('M-6 (§3.1) — THE NAME ECHOES VERBATIM and the empty/non-string arms are separate observables', async () => {
    const s = await live()
    expect((s.applyThemeDeclaration(NAME_A, TOKEN_A) as ThemeAttributeWrite).name, 'M-6(a) — the caller\'s own string by identity.').toBe(NAME_A)
    const padded = ` ${NAME_B} `
    expect((s.applyThemeDeclaration(padded, TOKEN_A) as ThemeAttributeWrite).name, 'M-6(b) — a whitespace-padded name is echoed UNTRIMMED and untransformed.').toBe(padded)
    for (const [label, arg] of [["(c) ''", ''], ['(d) 42', 42], ['(e) null', null]] as const) {
      expect((s.applyThemeDeclaration(arg, TOKEN_A) as ThemeAttributeWrite).name, `M-6${label} — reads the declared null.`).toBe(null)
    }
    expect((applyOmitted(s.applyThemeDeclaration, TOKEN_A) as ThemeAttributeWrite).name, 'M-6(f) — the OMITTED argument reads the declared null.').toBe(null)
    const hooks = hookRecorder()
    const w = s.applyThemeDeclaration(hooks.value, TOKEN_A) as ThemeAttributeWrite
    expect(w.name, 'M-6(g) — an object carrying its own toString reads the declared null.').toBe(null)
    expect(hooks.counts, 'M-6(g) — its toString and valueOf are NOT invoked: the drive asserts 0 for both (the row a String()-coercing implementation FAILS).').toEqual({ toString: 0, valueOf: 0 })
  })

  it('M-7 (§3.1) — the whole surface is reachable and returns its declared shapes in ONE composition (the drive LAST)', async () => {
    const s = await live()
    const total = { records: 0, members: 0, removals: 0, elementAccesses: 0 }
    const resolution = s.resolveTheme(TOKEN_A, { prefersDark: true }) as ThemeResolution
    total.records += 1
    total.members += Object.keys(resolution).length
    const write = s.applyThemeDeclaration(NAME_A, resolution.setting) as ThemeAttributeWrite
    total.records += 1
    total.members += Object.keys(write).length
    if (write.removal) total.removals += 1
    const removalWrite = s.applyThemeDeclaration(NAME_A, (s.resolveTheme('', {}) as ThemeResolution).setting) as ThemeAttributeWrite
    total.records += 1
    total.members += Object.keys(removalWrite).length
    if (removalWrite.removal) total.removals += 1
    expect([total.records, total.members], 'M-7 — the drive\'s own totals read 2-record shape... 3 records of 3 members each, 1 returned removal false and 0 element accesses.').toEqual([3, 9])
    expect(total.removals, 'M-7 — exactly ONE of the two writes is a removal in this drive; the first is NOT.').toBe(1)
    expect(total.elementAccesses, 'M-7 — ZERO element accesses: the surface has no element parameter (the drive reads no element).').toBe(0)
    expect(write, 'M-7 — the chained call returns the declared write.').toEqual({ name: NAME_A, value: TOKEN_A, removal: false })
  })
})

// ===========================================================================
// 5. §5.5.1 — THE PROPERTY REGISTER, IN REGISTER ORDER (`§4.2` step 5).
//    Executed deterministically; NO new dependency; the caps and the
//    stop-after-5 discipline above. Every printed reading sits BESIDE its term.
// ===========================================================================
describe('§5.5.1 — THE TYPED PROPERTY REGISTER (12 rows / 12 terms, in register order)', () => {
  it('P-TH-IM-1 [S-TH-RESOLVE-1] (bounded) — for EVERY setting shape: the three-member record, the carried token or the declared null, and no coercion hook', async () => {
    const r = row(definedRow('P-TH-IM-1'))
    const s = await live().catch(() => null)
    for (const shape of IM1_POOL) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const setting = shape.setting()
        const omitted = shape.id === '(6) the argument OMITTED'
        const hooks = hookRecorder()
        const brk = resolveTry(s.resolveTheme, setting, { prefersDark: true }, shape.id, omitted)
        if (brk !== null) return brk
        const { value } = drove(() => (omitted ? resolveOmitted(s.resolveTheme, { prefersDark: true }) : s.resolveTheme(setting, { prefersDark: true })))
        const res = value as ThemeResolution
        if (shape.carried) {
          if (res.setting !== setting) return `${shape.id} — the carried arm must return the CALLER'S OWN STRING BY IDENTITY; got ${JSON.stringify(res.setting)}`
        } else if (res.setting !== null) {
          return `${shape.id} — the declared null is required; got ${JSON.stringify(res.setting)}`
        }
        if (hooks.counts.toString !== 0 || hooks.counts.valueOf !== 0) return `${shape.id} — a coercion hook was consulted`
        r.reading()
        return null
      })
    }
    // The count-0 claim on a shape that really CARRIES the hooks, as its own drive.
    r.run('(11) the recording-hook object passed for real', () => {
      if (s === null) return `the module of §2.1 is absent`
      const hooks = hookRecorder()
      const brk = resolveTry(s.resolveTheme, hooks.value, { prefersDark: true }, '(11) hooks')
      if (brk !== null) return brk
      if (hooks.counts.toString !== 0 || hooks.counts.valueOf !== 0) return `(11) — String()/toString/valueOf were invoked ${JSON.stringify(hooks.counts)}`
      r.reading()
      return null
    })
    r.finish()
  })

  it('P-TH-IM-2 [S-TH-ENV-1] — for EVERY usable env shape: the strict reading, the report, the second-member and freeze controls, and the getter count', async () => {
    const r = row(definedRow('P-TH-IM-2'))
    const s = await live().catch(() => null)
    for (const shape of IM2_SHAPES) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const env = shape.env()
        const setting = shape.id.startsWith('(7)') || shape.id.startsWith('(8)') ? LONG_TOKEN : TOKEN_A
        const brk = resolveTry(s.resolveTheme, setting, env, shape.id)
        if (brk !== null) return brk
        const res = s.resolveTheme(setting, env) as ThemeResolution
        if (res.prefersDark !== shape.reads) return `${shape.id} — the reading must be ${shape.reads}; got ${String(res.prefersDark)}`
        if (res.source !== t('env')) return `${shape.id} — source must read '${t('env')}' for a USABLE shape (the reading resolved); got ${JSON.stringify(res.source)}`
        if (res.setting !== setting) return `${shape.id} — the setting member is unaffected by the environment`
        r.reading()
        return null
      })
    }
    r.run('(a) a recording getter read EXACTLY once per call', () => {
      if (s === null) return `the module of §2.1 is absent`
      const { env, count } = recordingEnvCounted(true)
      const brk = resolveTry(s.resolveTheme, TOKEN_A, env, '(a) getter count')
      if (brk !== null) return brk
      if (count() !== 1) return `(a) — the getter count must be EXACTLY 1 per call; got ${count()} (a module reading the member twice FAILS)`
      r.control()
      return null
    })
    r.run('(b) the same object driven TWICE: the count rises by exactly 1 (no cache)', () => {
      if (s === null) return `the module of §2.1 is absent`
      const { env, count } = recordingEnvCounted(true)
      const first = s.resolveTheme(TOKEN_A, env) as ThemeResolution
      const afterFirst = count()
      const second = s.resolveTheme(TOKEN_A, env) as ThemeResolution
      if (afterFirst !== 1) return `(b) — after the first call the count must be 1; got ${afterFirst}`
      if (count() !== 2) return `(b) — a repeated call must READ AGAIN (count 2); got ${count()} — a cache FAILS this row`
      if (second.prefersDark !== first.prefersDark) return `(b) — the two readings disagree`
      r.control()
      return null
    })
    r.run('(c) the source body asserted against the declared body BY NAME', () => {
      if (s === null) return `the module of §2.1 is absent`
      const res = s.resolveTheme(TOKEN_A, { prefersDark: false }) as ThemeResolution
      if (!SOURCE_BODIES.includes(res.source)) return `(c) — source ${JSON.stringify(res.source)} is outside the closed two-body domain`
      r.reading()
      return null
    })
    r.run('(d) the second-member control: the extra member is NEVER read', () => {
      if (s === null) return `the module of §2.1 is absent`
      const extra = { prefersDark: true, extra: 'must-be-ignored' }
      const res = s.resolveTheme(TOKEN_A, extra) as ThemeResolution
      if (res.prefersDark !== true || res.source !== t('env')) return `(d) — a second member must change NOTHING; got ${JSON.stringify(res)}`
      r.control()
      return null
    })
    r.finish()
  })

  it('P-TH-IM-3 [S-TH-ECHO-1] — for EVERY attribute-name shape: the echoed identity or the declared null, and no coercion for the name', async () => {
    const r = row(definedRow('P-TH-IM-3'))
    const s = await live().catch(() => null)
    for (const shape of IM3_POOL) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const arg = shape.name()
        const hooks = hookRecorder()
        const brk = applyTry(s.applyThemeDeclaration, arg, TOKEN_A, shape.id, shape.omitted === true)
        if (brk !== null) return brk
        const { value } = drove(() => (shape.omitted === true ? applyOmitted(s.applyThemeDeclaration, TOKEN_A) : s.applyThemeDeclaration(arg, TOKEN_A)))
        const w = value as ThemeAttributeWrite
        if (w.name !== shape.echoed) return `${shape.id} — the name must read ${JSON.stringify(shape.echoed)}; got ${JSON.stringify(w.name)}`
        if (w.value !== TOKEN_A || w.removal !== false) return `${shape.id} — value/removal must be INDEPENDENT of the name's shape`
        if (hooks.counts.toString !== 0 || hooks.counts.valueOf !== 0) return `${shape.id} — a coercion hook was consulted for the name`
        r.reading()
        return null
      })
    }
    r.run('(9) the recording-hook object passed for real', () => {
      if (s === null) return `the module of §2.1 is absent`
      const hooks = hookRecorder()
      const w = s.applyThemeDeclaration(hooks.value, TOKEN_A) as ThemeAttributeWrite
      if (w.name !== null) return `(9) — an object argument must read the declared null; got ${JSON.stringify(w.name)}`
      if (hooks.counts.toString !== 0 || hooks.counts.valueOf !== 0) return `(9) — String()/toString/valueOf were invoked ${JSON.stringify(hooks.counts)}`
      r.reading()
      return null
    })
    r.finish()
  })

  it('P-TH-IM-4 [S-TH-REMOVAL-1] — for EVERY resolved shape: removal true exactly on the removal arms and the value exactly the empty string there', async () => {
    const r = row(definedRow('P-TH-IM-4'))
    const s = await live().catch(() => null)
    for (const shape of IM4_POOL) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const resolved = shape.resolved()
        const brk = applyTry(s.applyThemeDeclaration, NAME_A, resolved, shape.id)
        if (brk !== null) return brk
        const w = s.applyThemeDeclaration(NAME_A, resolved) as ThemeAttributeWrite
        if (w.removal !== shape.removal) return `${shape.id} — removal must be ${shape.removal}; got ${String(w.removal)}`
        if (shape.value !== null && w.value !== shape.value) return `${shape.id} — the value must be ${JSON.stringify(shape.value)} BY IDENTITY; got ${JSON.stringify(w.value)}`
        if (w.removal && w.value !== '') return `${shape.id} — a removal's value is EXACTLY '' (never an absent member, never null)`
        if (w.name !== NAME_A) return `${shape.id} — the name member is independent of the removal arm`
        r.reading()
        return null
      })
    }
    r.finish()
  })

  it('P-TH-SM-1 [S-TH-STATE-1] — the two records\' declared shape CLASSES: each export lands in exactly one class per its arguments', async () => {
    const r = row(definedRow('P-TH-SM-1'))
    const s = await live().catch(() => null)
    const arms: readonly { readonly id: string; readonly run: () => string | null }[] = [
      {
        id: '(A) the carried arm',
        run: () => {
          const res = s!.resolveTheme(TOKEN_A, { prefersDark: true }) as ThemeResolution
          if (keyBreakOf(res, RESOLUTION_KEYS) !== null) return `(A) — the census broke`
          if (res.setting !== TOKEN_A || res.prefersDark !== true || res.source !== t('env')) return `(A) — the carried arm's members; got ${JSON.stringify(res)}`
          return null
        },
      },
      {
        id: '(B) the absent-setting arm',
        run: () => {
          const res = s!.resolveTheme('', { prefersDark: true }) as ThemeResolution
          if (res.setting !== null) return `(B) — the absent arm must read the declared null; got ${JSON.stringify(res.setting)}`
          if (res.prefersDark !== true || res.source !== t('env')) return `(B) — the other two members are as in (A)`
          return null
        },
      },
      {
        id: '(C) the degraded arm',
        run: () => {
          const res = s!.resolveTheme(TOKEN_A, {}) as ThemeResolution
          if (res.source !== t('degraded-env') || res.prefersDark !== false) return `(C) — the degraded arm's pair; got ${JSON.stringify(res)}`
          return null
        },
      },
      {
        id: '(D) the echoed + non-removal arm',
        run: () => {
          const w = s!.applyThemeDeclaration(NAME_A, TOKEN_A) as ThemeAttributeWrite
          if (keyBreakOf(w, WRITE_KEYS) !== null) return `(D) — the census broke`
          if (w.name !== NAME_A || w.value !== TOKEN_A || w.removal !== false) return `(D) — the arm's members; got ${JSON.stringify(w)}`
          return null
        },
      },
      {
        id: '(E) the echoed + removal arm',
        run: () => {
          const w = s!.applyThemeDeclaration(NAME_A, '') as ThemeAttributeWrite
          if (w.name !== NAME_A || w.value !== '' || w.removal !== true) return `(E) — the arm's members; got ${JSON.stringify(w)}`
          return null
        },
      },
      {
        id: '(F) the null-name + removal arm',
        run: () => {
          const w = s!.applyThemeDeclaration('', '') as ThemeAttributeWrite
          if (w.name !== null || w.value !== '' || w.removal !== true) return `(F) — the arm's members; got ${JSON.stringify(w)}`
          return null
        },
      },
    ]
    for (const arm of arms) {
      r.run(arm.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const brk = arm.run()
        if (brk !== null) return brk
        r.reading()
        return null
      })
    }
    r.finish()
  })

  it('P-TH-SM-2 [S-TH-CONST-1] — cross-call constancy and RECORD FRESHNESS: five repeats, distinct objects, no drift', async () => {
    const r = row(definedRow('P-TH-SM-2'))
    const s = await live().catch(() => null)
    const shapes: readonly { readonly id: string; readonly run: () => string | null }[] = [
      {
        id: '(1) resolveTheme over five repeats',
        run: () => {
          const five = [0, 1, 2, 3, 4].map(() => s!.resolveTheme(TOKEN_A, { prefersDark: true }))
          for (let i = 1; i < 5; i += 1) {
            if (JSON.stringify(five[i]) !== JSON.stringify(five[0])) return `(1) — call ${i + 1} differs from call 1`
            if ((five[i] as unknown) === (five[0] as unknown)) return `(1) — call ${i + 1} returned the SAME record object: records must be FRESH`
          }
          if ((five[0] as ThemeResolution).setting !== TOKEN_A) return `(1) — the carried member lost its identity`
          return null
        },
      },
      {
        id: '(2) a recording getter counted over five calls (a cache FAILS)',
        run: () => {
          const { env, count } = recordingEnvCounted(true)
          const five = [0, 1, 2, 3, 4].map(() => s!.resolveTheme(TOKEN_A, env))
          for (let i = 1; i < 5; i += 1) if (JSON.stringify(five[i]) !== JSON.stringify(five[0])) return `(2) — call ${i + 1} differs`
          if (count() !== 5) return `(2) — the getter count at the fifth call must be EXACTLY 5; got ${count()} (a count of 6 or fewer than 5 FAILS — a cache or a double read)`
          return null
        },
      },
      {
        id: '(3) the applier and its removal twin over five repeats',
        run: () => {
          const five = [0, 1, 2, 3, 4].map(() => s!.applyThemeDeclaration(NAME_A, TOKEN_A))
          const fiveRemoval = [0, 1, 2, 3, 4].map(() => s!.applyThemeDeclaration(NAME_A, ''))
          for (let i = 1; i < 5; i += 1) {
            if (JSON.stringify(five[i]) !== JSON.stringify(five[0])) return `(3) — non-removal call ${i + 1} differs`
            if (JSON.stringify(fiveRemoval[i]) !== JSON.stringify(fiveRemoval[0])) return `(3) — removal call ${i + 1} differs`
            if ((five[i] as unknown) === (five[0] as unknown)) return `(3) — the write records must be FRESH each call`
          }
          return null
        },
      },
    ]
    for (const shape of shapes) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const brk = shape.run()
        if (brk !== null) return brk
        r.reading()
        return null
      })
    }
    r.finish()
  })

  it('P-TH-TP-1 [S-TH-TOTAL-1] (bounded) — for EVERY shape DRAWN from the pinned-seed 12-member pool: neither entry point throws and both return their declared shapes', async () => {
    const r = row(definedRow('P-TH-TP-1'))
    const s = await live().catch(() => null)
    const lcg = makeLcg(SEED)
    for (let draw = 0; draw < POOL_LENGTH; draw += 1) {
      const state = lcg.next() // EXACTLY ONE LCG STEP PER DRAW
      const index = state % POOL_LENGTH
      const member = TP1_POOL[index]
      r.run(`draw ${draw + 1} → pool[${index}] ${member.id}`, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const shape = member.value()
        // THE FOUR POSITIONAL DRIVES: ASSERTIONS INSIDE THIS ONE ATTEMPT.
        const breaks = [
          resolveTry(s.resolveTheme, shape, { prefersDark: true }, `as setting (${member.id})`),
          resolveTry(s.resolveTheme, TOKEN_A, shape, `as env (${member.id})`),
          applyTry(s.applyThemeDeclaration, shape, TOKEN_A, `as attributeName (${member.id})`),
          applyTry(s.applyThemeDeclaration, NAME_A, shape, `as resolved (${member.id})`),
        ].filter((b): b is string => b !== null)
        if (breaks.length > 0) return breaks[0]
        r.reading()
        return null
      })
    }
    r.finish()
  })

  it('P-TH-TP-2 [S-TH-RULE-1] (bounded) — for EVERY (setting, env) pair: the setting member is the caller\'s own token or the declared null, NEVER derived from the reading', async () => {
    const r = row(definedRow('P-TH-TP-2'))
    const s = await live().catch(() => null)
    const settings: readonly { readonly id: string; readonly v: unknown; readonly carried: string | null }[] = [
      { id: 'a plausible token', v: TOKEN_A, carried: TOKEN_A },
      { id: 'a NON-pool token', v: TOKEN_E, carried: TOKEN_E },
      { id: 'an out-of-domain shape', v: 42, carried: null },
    ]
    const envs: readonly { readonly id: string; readonly v: unknown }[] = [
      { id: '(i) a true member', v: { prefersDark: true } },
      { id: '(ii) a false member', v: { prefersDark: false } },
      { id: '(iii) a missing member', v: {} },
      { id: '(iv) a hostile shape', v: revokedProxy() },
    ]
    for (const st of settings) {
      for (const e of envs) {
        r.run(`${st.id} × ${e.id}`, () => {
          if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
          const brk = resolveTry(s.resolveTheme, st.v, e.v, `${st.id} × ${e.id}`)
          if (brk !== null) return brk
          const res = s.resolveTheme(st.v, e.v) as ThemeResolution
          if (res.setting !== st.carried) return `${st.id} × ${e.id} — the setting member must be ${JSON.stringify(st.carried)}; got ${JSON.stringify(res.setting)} (a member-pool implementation returns a pool member here)`
          // THE DISCRIMINATING CELLS: (1)×(i) and (1)×(ii) must return the SAME setting.
          if (st.v === TOKEN_A) {
            const other = s.resolveTheme(TOKEN_A, e.id === '(i) a true member' ? { prefersDark: false } : { prefersDark: true }) as ThemeResolution
            if (other.setting !== res.setting) return `${st.id} × ${e.id} — a PRECEDENCE implementation returns two different settings for the same caller token`
          }
          r.reading()
          return null
        })
      }
    }
    r.finish()
  })

  it('P-TH-TP-3 [S-TH-ABSORB-1] (bounded) — for EVERY hostile env shape: the reading lands on false, source reads the degraded body by name, nothing throws', async () => {
    const r = row(definedRow('P-TH-TP-3'))
    const s = await live().catch(() => null)
    for (const shape of TP3_POOL) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        const env = shape.env()
        const brk = resolveTry(s.resolveTheme, TOKEN_A, env, shape.id)
        if (brk !== null) return brk
        const res = s.resolveTheme(TOKEN_A, env) as ThemeResolution
        if (res.prefersDark !== false) return `${shape.id} — the absorbed reading must be false; got ${String(res.prefersDark)}`
        if (res.source !== t('degraded-env')) return `${shape.id} — source must read '${t('degraded-env')}' BY NAME; got ${JSON.stringify(res.source)} — a module that silently reads false without reporting the degradation FAILS`
        if (res.setting !== TOKEN_A) return `${shape.id} — the setting member is unaffected and no member is fabricated`
        if (Object.keys(res).length !== 3) return `${shape.id} — a member was fabricated`
        r.reading()
        return null
      })
    }
    r.run('THE MIRROR CONTROL: the same drive with a legitimate false member reads the resolved body', () => {
      if (s === null) return `the module of §2.1 is absent`
      const res = s.resolveTheme(TOKEN_A, { prefersDark: false }) as ThemeResolution
      if (res.source !== t('env')) return `the mirror — a legitimate false member must read '${t('env')}'; got ${JSON.stringify(res.source)} (a module reporting the degraded body for a legitimate false FAILS P-TH-IM-2)`
      r.control()
      return null
    })
    r.finish()
  })

  it('P-TH-TP-4 [S-TH-WRITE-1] (bounded) — the 4 × 4 name/resolved CROSS PRODUCT, the two arguments INDEPENDENT, 16 cells as 8 drives of 2', async () => {
    const r = row(definedRow('P-TH-TP-4'))
    const s = await live().catch(() => null)
    const names: readonly { readonly id: string; readonly v: unknown; readonly echoed: string | null; readonly omitted?: boolean }[] = [
      { id: "(1) 'data-x'-shaped", v: NAME_A, echoed: NAME_A },
      { id: "(2) ''", v: '', echoed: null },
      { id: '(3) omitted', v: undefined, echoed: null, omitted: true },
      { id: '(4) a non-string', v: 42, echoed: null },
    ]
    const resolveds: readonly { readonly id: string; readonly v: unknown; readonly removal: boolean; readonly value: string }[] = [
      { id: '(a) a token', v: TOKEN_A, removal: false, value: TOKEN_A },
      { id: "(b) ''", v: '', removal: true, value: '' },
      { id: '(c) null', v: null, removal: true, value: '' },
      { id: '(d) a non-string', v: 42, removal: true, value: '' },
    ]
    // 16 cells, reported as 8 drives of 2 cells each (the pairing §5.5.1 states).
    for (let i = 0; i < names.length; i += 1) {
      for (let j = 0; j < resolveds.length; j += 2) {
        const pair = [resolveds[j], resolveds[j + 1]]
        r.run(`name ${names[i].id} × resolved ${pair[0].id} + ${pair[1].id}`, () => {
          if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
          for (const res of pair) {
            const brk = res === undefined ? 'the pairing is malformed' : applyTry(s.applyThemeDeclaration, names[i].v, res.v, `${names[i].id} × ${res.id}`, names[i].omitted === true)
            if (brk !== null) return brk
            const w = (names[i].omitted === true ? applyOmitted(s.applyThemeDeclaration, res.v) : s.applyThemeDeclaration(names[i].v, res.v)) as ThemeAttributeWrite
            if (keyBreakOf(w, WRITE_KEYS) !== null) return `${names[i].id} × ${res.id} — the key set must be exactly the three declared names`
            if (w.name !== names[i].echoed) return `${names[i].id} × ${res.id} — the NAME rule broke; got ${JSON.stringify(w.name)}`
            if (w.removal !== res.removal) return `${names[i].id} × ${res.id} — the RESOLVED rule broke; removal=${String(w.removal)}`
            if (w.value !== res.value) return `${names[i].id} × ${res.id} — the value must be ${JSON.stringify(res.value)}; got ${JSON.stringify(w.value)}`
            r.distinctDrive()
          }
          r.reading()
          return null
        })
      }
    }
    r.finish()
  })

  it('P-TH-TP-5 [S-TH-NOCALL-1] — the removal case is DATA and PERFORMS NO CALL: recording traps at 0, the fake element\'s counters at 0', async () => {
    const r = row(definedRow('P-TH-TP-5'))
    const s = await live().catch(() => null)
    for (const shape of TP5_SHAPES) {
      for (const instrument of TP5_INSTRUMENTS) {
        r.run(`${shape.id} × ${instrument.slice(0, 3)}`, () => {
          if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
          const rec = recordingInstrument()
          const frozen = instrument.startsWith('(ii)')
          // Instrument (i): EVERY argument is a recording Proxy whose traps count
          // (and a fake element stays in scope, never passed to the module).
          // Instrument (ii): the same drive with frozen argument objects.
          const name = frozen ? Object.freeze({}) : rec.proxy
          const resolved = frozen ? Object.freeze({}) : rec.proxy
          const label = `${shape.id} × ${instrument.slice(0, 3)}`
          const brk = shape.omitted
            ? applyTry(s.applyThemeDeclaration, undefined, resolved, label, true)
            : applyTry(s.applyThemeDeclaration, name, resolved, label)
          if (brk !== null) return brk
          if (rec.counts() !== 0) return `${label} — a method/property trap on the caller's argument was touched ${rec.counts()} times; NO method may be invoked (setAttribute/removeAttribute/classList/setProperty/property WRITE)`
          if (rec.fakeWrites() !== 0) return `${label} — the fake element's write counters must be 0; got ${rec.fakeWrites()}`
          const w = (shape.omitted ? applyOmitted(s.applyThemeDeclaration, resolved) : s.applyThemeDeclaration(name, resolved)) as ThemeAttributeWrite
          if (w.removal !== true) return `${label} — the removal is represented ONLY by the removal: true member; got ${JSON.stringify(w)}`
          if (w.value !== '') return `${label} — never an absent member and never a sentinel: value must be ''`
          r.reading()
          return null
        })
      }
    }
    // THE TWO POSITIVE CONTROLS: the instrument must be PROVEN LIVE.
    r.run('the instrument is live — one driver CALL raises the trap count', () => {
      const rec = recordingInstrument()
      const fn = rec.proxy as unknown as () => void
      fn()
      if (rec.counts() !== 1) return `the instrument is DEAD: a driver call must raise the count to exactly 1; got ${rec.counts()}`
      r.control()
      return null
    })
    r.run('the instrument is live — one driver write raises the fake element\'s counter', () => {
      const rec = recordingInstrument()
      const write = rec.fake[t('setAttribute')] as () => void
      write()
      if (rec.fakeWrites() !== 1) return `the fake element is DEAD: a driver write must raise its counter to exactly 1; got ${rec.fakeWrites()}`
      r.control()
      return null
    })
    r.finish()
  })

  it('P-TH-TP-6 [S-TH-COMPOSE-1] — the COMPOSITION reachability row: three composed shapes, each driven twice, order-independent', async () => {
    const r = row(definedRow('P-TH-TP-6'))
    const s = await live().catch(() => null)
    for (const shape of TP6_SHAPES) {
      r.run(shape.id, () => {
        if (s === null) return `the module of §2.1 is absent (the §4.1 red fact)`
        // DRIVE 1: the chained composition.
        const resBrk = resolveTry(s.resolveTheme, shape.setting, shape.env, `${shape.id} (resolver)`)
        if (resBrk !== null) return resBrk
        const resolution = s.resolveTheme(shape.setting, shape.env) as ThemeResolution
        const wBrk = applyTry(s.applyThemeDeclaration, shape.name, resolution.setting, `${shape.id} (composed applier)`)
        if (wBrk !== null) return wBrk
        const w = s.applyThemeDeclaration(shape.name, resolution.setting) as ThemeAttributeWrite
        if (w.value !== (resolution.setting ?? '')) return `${shape.id} — the composed value must be the resolver's own setting member BY IDENTITY`
        if (w.removal !== shape.removal) return `${shape.id} — the composed removal follows the resolved rule; got ${String(w.removal)}`
        if (w.name !== shape.echoed) return `${shape.id} — the name rule's independence broke; got ${JSON.stringify(w.name)}`
        // DRIVE 2: the applier FIRST, on a literal token — ORDER INDEPENDENCE.
        const direct = s.applyThemeDeclaration(shape.name, resolution.setting) as ThemeAttributeWrite
        if (JSON.stringify(direct) !== JSON.stringify(w)) return `${shape.id} — the applier's result must be identical whether or not the resolver was called first (cross-call state FAILS here)`
        r.reading()
        r.distinctDrive()
        return null
      })
    }
    r.finish()
  })
})

// ===========================================================================
// 6. THE REGISTER-HARNESS ROWS — the declared-vs-measured reconciliation, the
//    caps, the `(bounded)` set, the un-run-row-is-a-FAILURE rule, the attempt
//    arithmetic printed WITH its terms, and `§5.5.2`'s honesty block.
// ===========================================================================
describe('§5.5.1 / §5.5.2 / §5.5.3 — the register harness: declared-vs-measured, caps, (bounded), arithmetic, un-run = FAILURE', () => {
  it('HARNESS-1 (§5.5.3) — THE DECLARED TOTAL IS PRINTED WITH ITS TERMS AND IS THEIR SUM (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS)', () => {
    const terms = declaredTerms()
    const total = declaredTotal()
    const chain: number[] = []
    let running = 0
    for (const t0 of terms) {
      running += t0
      chain.push(running)
    }
    console.log(`§5.5.3 declared register total :: ${total} = ${terms.join(' + ')}`)
    console.log(`§5.5.3 declared chain :: ${chain.join(' → ')}`)
    console.log(`§5.5.3 family subtotals :: IM = ${terms.slice(0, 4).reduce((a, b) => a + b, 0)} · SM = ${terms.slice(4, 6).reduce((a, b) => a + b, 0)} · TP = ${terms.slice(6).reduce((a, b) => a + b, 0)}`)
    expect(terms, 'HARNESS-1 — the twelve DECLARED TERMS, in register order (a total quoted without its terms is a review finding).').toEqual([12, 12, 10, 8, 6, 3, 12, 12, 10, 8, 6, 3])
    expect(total, 'HARNESS-1 — the declared total IS the sum of its own terms.').toBe(102)
    expect(total, 'HARNESS-1 — the declared total against the ≤400 register cap.').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(Math.max(...terms), `HARNESS-1 — every row's term against the ≤${REGISTER_ROW_CAP}-attempts-per-row cap.`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(chain, 'HARNESS-1 — the eleven-step chain of §5.5.3.').toEqual([12, 24, 34, 42, 48, 51, 63, 75, 85, 93, 99, 102])
  })

  it('HARNESS-2 (§5.5.1) — THE EXECUTED READINGS reconciled against the declared register, and the stop state reported', () => {
    const measured = REGISTER_RECORDS.map((r) => ({ row: r.row, type: r.type, strategy: r.strategy, attemptsRun: r.attemptsRun, held: r.held, broken: r.broken, readings: r.readings, controls: r.controls, stoppedEarly: r.stoppedEarly, notStarted: r.notStarted, registerStoppedAt: r.registerStoppedAt, registerStoppedFor: r.registerStoppedFor }))
    console.log(`§5.5.1 executed register rows :: ${JSON.stringify(measured)}`)
    console.log(`§5.5.1 register totals :: attemptsExecuted=${REGISTER_RECORDS.reduce((a, r) => a + r.attemptsRun, 0)} rowsExecuted=${REGISTER_RECORDS.filter((r) => r.attemptsRun > 0).length} rowsDeclared=${DECLARED_REGISTER.length} termsDeclared=${declaredTotal()} totalDeclared=${declaredTotal()} registerStoppedAt=${registerState.stoppedAtRow ?? 'not triggered'} (${registerState.stoppedFor ?? 'no stop'})`)
    expect(REGISTER_RECORDS.length, 'HARNESS-2 — every declared register row has its own record: rowsExecuted + rowsNotStarted = rowsDeclared.').toBe(DECLARED_REGISTER.length)
    for (const def of DECLARED_REGISTER) {
      const rec = REGISTER_RECORDS.find((r) => r.row === def.row)
      expect(rec, `HARNESS-2 — the row ${def.row} is DECLARED at §5.5.1 and must have an executed record (an un-run row is a FAILURE, never a pass).`).toBeDefined()
      expect(rec?.strategy, `HARNESS-2 — ${def.row}'s own strategy id (the ids are DISTINCT and no row is left without one).`).toBe(def.strategy)
      expect(rec?.type, `HARNESS-2 — ${def.row}'s declared type (P-IM / P-SM / P-TP; never an F- row and never a §6 citation).`).toBe(def.type)
      expect(rec?.seed, `HARNESS-2 — the pinned seed is carried on every row's record.`).toBe(SEED)
      expect(rec?.attemptsRun, `HARNESS-2 — ${def.row}'s MEASURED attempts are reconciled against its DECLARED term ${def.declared}: a measured count that exceeds the declared term is a spec/table contradiction and is REPORTED, never silently tuned. Measured: ${rec?.attemptsRun}`).toBeLessThanOrEqual(def.declared)
      if (rec !== undefined && !rec.notStarted && registerState.stoppedAtRow === null) {
        expect(rec.attemptsRun, `HARNESS-2 — ${def.row} ran to its declared term with the register's stop rule NOT triggered.`).toBe(def.declared)
      }
    }
    // THE STOP RULE, reported honestly: with the module absent the register is
    // EXPECTED to stop early, and every un-run row must be a FAILURE.
    if (registerState.stoppedAtRow !== null) {
      expect(registerState.stoppedFor, 'HARNESS-2 — a stopped register carries its own cause sentence.').not.toBe(null)
      const unrun = REGISTER_RECORDS.filter((r) => r.attemptsRun === 0)
      for (const u of unrun) {
        expect(u.notStarted, `HARNESS-2 — the un-run row ${u.row} MUST be recorded as NOT STARTED, and its own row reports a FAILURE rather than a pass (§5.5.1 cap 3).`).toBe(true)
      }
    }
    expect(REGISTER_RECORDS.reduce((a, r) => a + r.attemptsRun, 0), 'HARNESS-2 — the executed attempt count stays inside the ≤400 register cap.').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
  })

  it('HARNESS-3 (§5.5.2 items 1/2) — the ROW COUNT is an EXTENT (12 rows / 12 terms), the (bounded) SET is the five declared rows, and each bounded row says so', () => {
    expect(DECLARED_REGISTER.length, 'HARNESS-3 — 12 ROWS: the overshoot of the ≤8 breakdown signal is an OUTCOME, not a budget (§5.5.2 item 1).').toBe(12)
    expect(new Set(DECLARED_REGISTER.map((r) => r.strategy)).size, 'HARNESS-3 — TWELVE DISTINCT strategy ids (eleven enumeration strategies and ONE pinned-seed generator).').toBe(12)
    expect(DECLARED_REGISTER.filter((r) => r.type === 'P-IM').length, 'HARNESS-3 — 4 IM rows.').toBe(4)
    expect(DECLARED_REGISTER.filter((r) => r.type === 'P-SM').length, 'HARNESS-3 — 2 SM rows.').toBe(2)
    expect(DECLARED_REGISTER.filter((r) => r.type === 'P-TP').length, 'HARNESS-3 — 6 TP rows.').toBe(6)
    expect(boundedRows(), 'HARNESS-3 — THE (bounded) SET IS FIVE ROWS, named: a row whose property text quantifies over a domain LARGER than its table, and NO reader may read a bounded row as a proof of the unbounded universal it states.').toEqual(['P-TH-IM-1', 'P-TH-TP-1', 'P-TH-TP-2', 'P-TH-TP-3', 'P-TH-TP-4'])
    expect(boundedRows().length + DECLARED_REGISTER.filter((r) => !r.bounded).length, 'HARNESS-3 — 5 + 7 = 12, so the marking count is checkable rather than asserted (§5.5.2 item 2).').toBe(12)
    expect(
      DECLARED_REGISTER.filter((r) => r.bounded && r.declared < 1).length,
      'HARNESS-3 — every bounded row really drives attempts (a bounded marking on an EMPTY table would be over-strength).',
    ).toBe(0)
    for (const def of DECLARED_REGISTER) {
      expect(def.declared > 0, `HARNESS-3 — ${def.row} declares a term of at least one drive.`).toBe(true)
    }
  })

  it('HARNESS-4 (§5.5.2 item 3) — THE DECLARED-VERSUS-DISTINCT LEDGER: the six rows whose distinct figure differs are printed BESIDE their declared terms', () => {
    const ledger = DECLARED_REGISTER.filter((r) => r.distinct !== null && r.distinct !== r.declared).map((r) => ({ row: r.row, declared: r.declared, distinct: r.distinct }))
    console.log(`§5.5.2 item 3 declared-vs-distinct ledger (differing rows) :: ${JSON.stringify(ledger)}`)
    expect(ledger, 'HARNESS-4 — the ledger §5.5.2 item 3 prints: the DISTINCT figure is reported BESIDE the declared term and is NEVER substituted for it, and the caps compare against the DECLARED figures. The §5.5.2 item 3 table names P-TH-IM-2 as its ONE collapsing row (`12` → `9`, the four further drives sharing the eight shapes\' objects).').toEqual([{ row: 'P-TH-IM-2', declared: 12, distinct: 9 }])
    const declaredSum = declaredTotal()
    const declaredDistinctSum = DECLARED_REGISTER.reduce((a, r) => a + (r.distinct ?? r.declared), 0)
    const executedDistinctSum = REGISTER_RECORDS.reduce((a, r) => a + r.distinctDrives, 0)
    console.log(`§5.5.2 item 3 sums :: declared=${declaredSum} declared-distinct=${declaredDistinctSum} executed-distinct=${executedDistinctSum}`)
    expect(declaredDistinctSum, 'HARNESS-4 — the DECLARED distinct sum is a REPORTED figure and is never substituted for the declared 102 (GAP REPORTED: §5.5.3\'s family subtotals sum to 102, while §5.5.2 item 3\'s distinct figures sum to 99 — the two figures are printed side by side here as the ledger owes).').toBe(99)
    expect(executedDistinctSum, 'HARNESS-4 — the EXECUTED distinct drives are measured BESIDE the declared figure (`A DECLARED REGISTER TERM IS A DRIVE COUNT`): at red time every row is broken on the module-absent boundary, so this measures what really ran.').toBeLessThanOrEqual(declaredSum)
  })

  it('HARNESS-5 (§5.5.2 items 4/5/8) — the STATED BOUNDARIES: the deliberately excluded shapes, the pool-versus-boundary check, and the ruled spelling', () => {
    const excluded = [
      'a lone-surrogate string as a setting (its only observable is identity pass-through, already asserted)',
      'a Symbol.toPrimitive that throws only on its SECOND invocation (the count would be ambiguous; no coercion hook is consulted at all)',
      'a holder whose getter returns different answers on successive reads (ambiguous for a draw; the getter-count drive asserts the count instead)',
    ]
    expect(excluded.length, 'HARNESS-5 — §5.5.2 item 4 names THREE deliberately excluded shapes as a STATED BOUNDARY, not an unrecorded omission. A pass that wants one driven owes a NEW dated amendment and a register re-grain.').toBe(3)
    // §5.5.2 item 5's pool-versus-boundary check, re-run over the landed tables.
    for (const def of DECLARED_REGISTER) {
      if (def.bounded) {
        expect(def.declared, `HARNESS-5 — the (bounded) row ${def.row} does NOT claim its grid IS the domain: its term stays a declared extent and its marking is present.`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
      }
    }
    // §5.5.2 item 8 / S-TH-11 — the ruled spelling, and the pre-ruling spelling's
    // ABSENCE from this file's own bytes. The pre-ruling token is CARRIED (it is
    // the thing being asserted absent), and the assertion message below is the
    // declared single occurrence of it in this file.
    const asFiledPreRuling = t('basis')
    expect(RESOLUTION_KEYS, 'HARNESS-5 / §5.5.2 item 8 — the discriminator member is the RULED spelling `source`, and the closed domain is the two ruled bodies (§0A note 6: a RENAME ONLY).').toEqual(['setting', 'prefersDark', 'source'])
    const occurrences = testFileBytes().split(asFiledPreRuling).length - 1
    expect(occurrences, `HARNESS-5 / S-TH-11 — the pre-ruling member spelling ${JSON.stringify(asFiledPreRuling)} occurs in this file EXACTLY ONCE, inside this assertion's own message. Any OTHER occurrence would be a row authored against the superseded spelling (the mirror error). Measured: ${occurrences}`).toBe(1)
  })

  it('HARNESS-6 (§5.5.1 method note 2 / §5.5.3) — the pinned seed and its ONE-STEP-PER-DRAW form, with its reproducible first draws', () => {
    const s1 = (SEED * LCG_A + LCG_C) % LCG_MOD
    const s2 = (s1 * LCG_A + LCG_C) % LCG_MOD
    const s3 = (s2 * LCG_A + LCG_C) % LCG_MOD
    const lcg = makeLcg(SEED)
    const first = lcg.next()
    const second = lcg.next()
    const third = lcg.next()
    expect([first, second, third], 'HARNESS-6 — the pinned draws from seed 20260927 are reproducible from the literals above.').toEqual([s1, s2, s3])
    expect([first % POOL_LENGTH, second % POOL_LENGTH, third % POOL_LENGTH], 'HARNESS-6 — the pool indices are `state mod pool.length`, one LCG step per draw.').toEqual([s1 % 12, s2 % 12, s3 % 12])
    expect(SEED, 'HARNESS-6 — the seed is the pinned literal 20260927.').toBe(20260927)
    expect(POOL_LENGTH, 'HARNESS-6 — pool.length = 12, as §5.5.3 pins.').toBe(12)
    expect(TP1_POOL.length, 'HARNESS-6 — the executed pool really holds TWELVE members, in the spec\'s declared order.').toBe(12)
    const lcg2 = makeLcg(SEED)
    expect([lcg2.next() % POOL_LENGTH, lcg2.next() % POOL_LENGTH], 'HARNESS-6 — a second generator from the same seed reproduces the same indices (deterministic, no wall-clock seed, no Math.random).').toEqual([s1 % 12, s2 % 12])
  })
})

// ===========================================================================
// PRE — HARNESS PRECONDITIONS (not spec rows). They are the instruments the
// rows above depend on, asserted so a red row cannot be a harness artefact.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['installShim'], 'the boundary technique resolves an existing module, so the red rows fail as ASSERTIONS and never as a transform error.').toBe('function')
    const cast = mod['installShim'] as unknown as () => void
    expect(typeof cast).toBe('function')
  })

  it('PRE-2 the scan instruments are LIVE: the joiner joins before quotes are stripped, and the boundary matcher is a boundary matcher', () => {
    // THE ASSEMBLY-EVASION CONTROL, stated as SOURCE TEXT: the `+` concatenation
    // must be present in the string for the joiner to see it — a template that
    // resolves the fragments itself would test nothing.
    const assembledSource = ["const a = 'da", "' + '", "rk'"].join('')
    expect(
      normalizedView(assembledSource).includes(t('dark')),
      'PRE-2 — the JOIN runs BEFORE quotes are stripped, so an assembled token (a literal `+` concatenation IN A SOURCE STRING) is visible to a token-boundary scan. A view that strips quotes first cannot see the boundary and would look green while the evasion lands.',
    ).toBe(true)
    expect(normalizedView(`const a = ${t('da')}${t('rk')}`).includes(t('dark')), 'PRE-2 — an already-assembled token is of course visible too (the negative direction).').toBe(true)
    expect(scanForToken('const x = prefersDarkValue', t('prefersDark'), true), 'PRE-2 — the boundary matcher does not fire inside a longer identifier.').toBe(false)
    expect(scanForToken(`const prefersDark = 1`, t('prefersDark'), true), 'PRE-2 — and it fires on the bare spelling.').toBe(true)
    expect(commentStrippedView('// x\ny').includes('x'), 'PRE-2 — the comment-stripping view really strips comments.').toBe(false)
    expect(normalizedView('/* x */').includes('x'), 'PRE-2 — while the normalized view keeps them (comments are scanned as code).').toBe(true)
  })

  it('PRE-3 this file is the unit\'s own test file and the module path it drives is the contract\'s (§0A note 1, §5.1 rows 1/2)', () => {
    expect(TEST_PATH.endsWith(`tests${MODULE_PATH.includes('\\') ? '\\' : '/'}theme.test.ts`), 'PRE-3 — this file is tests/theme.test.ts, the path the contract PINS (§0A note 1).').toBe(true)
    expect(MODULE_PATH.endsWith(`shared${MODULE_PATH.includes('\\') ? '\\' : '/'}theme.ts`), 'PRE-3 — the module path this file drives is src/shared/theme.ts, the path the contract PINS.').toBe(true)
    expect(MODULE_SPECIFIER, 'PRE-3 — the dynamic specifier is computed, never a literal import, so the file still transforms while the module is absent.').toBe('../src/shared/theme.js')
  })
})
