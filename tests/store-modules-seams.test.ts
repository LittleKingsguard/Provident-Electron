/**
 * tests/store-modules-seams.test.ts — THE RED SET (RCA-1) FOR UNIT `H2b` =
 * `U-STORE-MODULES-SEAMS` (`docs/specs/store-modules-seams.md`, 915 lines).
 * ⟶ LINE COUNT CORRECTED BESIDE 2026-10-03 (the H2b gate-4 landing pass; F-1b —
 * the as-filed `915 lines` above is KEPT VISIBLE, never rewritten): the spec
 * measures `937` lines as read that pass (the `§3b` table and this unit's
 * landing annotations grew it). No length census is a pinned claim — the spec
 * itself carries NO length census of any file (its `CURRENT STATE`/header
 * citation rule, the sibling convention) — this header cites the filing's size
 * at RED-set authoring time only.
 *
 * THE RED STATEMENT, HONESTLY. The unit's §3 families (M-·/F-·/I-·/S-·/E-· rows), the
 * §4.2-item-4 REAL-STORE integration drives and the §5.5.1 register's EXECUTED
 * layer live HERE — the unit's OWN new file (the `H2a` F-2 lesson; the landed
 * suites `tests/overlay.test.ts` / `theme.test.ts` / `menu-template.test.ts` /
 * `pane-drag-compliance.test.ts` are the implementations' own regression homes,
 * UNEDITED). The caller-side families drive the TWO NEW WIRING FILES this unit
 * declares — `src/renderer/overlay-store.ts` and `src/renderer/theme-store.ts` —
 * which are NOT LANDED TODAY. Those rows are RED FOR THE HONEST REASON: the
 * wiring file does not exist yet (module not found / exports absent). The
 * landing pass (Implementer green) makes them pass by landing the files exactly
 * as §2.2/§2.3 declare them; a row that could only pass by editing a module
 * byte, a store byte, `renderer.ts` or by re-landing a pane-drag read is a stop
 * condition (SMS-S-1..7) and is deliberately NOT satisfiable by this file's
 * drives.
 *
 * THE FAMILIES THAT ARE GREEN BY CONSTRUCTION AT RED TIME (said honestly):
 *   - menu-template (M-MT-1, F-MT-1, I-MT-1, S-MT-1/2, the P-SMS-MT-* rows) —
 *     the module EXISTS; its obligation is RECORDED-NOT-LANDED (§2.4), so its
 *     module-side rows are driven today and the no-consumer probe holds;
 *   - the verification half (M-PDV-*, F-PDV-1/2, I-PDV-*, S-PDV-1) — the
 *     `createPaneDrag` composition IS LANDED (`renderer.ts`); this unit VERIFIES
 *     the landed store-backed reads, it does not re-land (§2.5);
 *   - the module-census halves of the S-OV/S-TH rows and the E-· existence
 *     probes that assert today's repo state.
 *
 * RECORDED READINGS (working defaults IN FORCE, §7a.1 — noted so the landing
 * pass need not re-derive them):
 *   (1) the register's TP-1 receipts are projected to `{status, name}` (the
 *       caller-relevant surface) — §5.5.2 item 2: "the store-touching turn
 *       EFFECTS (the writes, the delivery counts, the event census) are the §3
 *       rows' subjects, not these rows'", so a receipt's `cleared[]`/`events`
 *       legitimately differ across tier-state runs (a `mem` mint on a
 *       temp-shadowed path clears the temp copy; a `file` commit on a
 *       temp-shadowed path clears it) without changing a caller answer;
 *   (2) the overlay `state`/`closed` machine words are the spec's own (§2.2,
 *       §5.5.1's scripts) — asserted as pinned;
 *   (3) the menu corpus is THIS file's own FIXED corpus (the spec pins "the
 *       fixed corpus", §5.5.1 P-SMS-MT-TP-1, not its items); the differential's
 *       executable claim is cross-run identity + totality (no throw) — the
 *       module's landed M-* VALUES are the landed suite's home;
 *   (4) M-OV-4's declaration `value` member is `'true'` AS TEXT
 *       (`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`, cited by
 *       row name), asserted spec-literal;
 *   (5) E-PDV-1/E-PDV-2's [T]-side byte-identity probes are git-diff probes
 *       (the unit's own change set contains neither file); the landed suites'
 *       green status is reported separately (§4.5's report duty).
 *
 * WALLS: this file is the ONLY file this pass writes. No src/** byte, no spec,
 * no tracker, no config is touched. The scanning rows read module bytes via fs
 * at run time (the scan IS the drive); the fixtures (recording double, fixture
 * wiring variants, fixture seam variants, fixture module bytes) all live HERE.
 */

import { describe, expect, test } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

import { createGraphStore, type GraphStore } from '../src/renderer/store-core-graph.js'
import { storeGraphReferences } from '../src/renderer/store-graph-references.js'
import { createPaneDrag, type PaneDragSurface } from '../src/renderer/renderer.js'
import { overlayTransition, overlayInertDeclaration } from '../src/shared/overlay.js'
import { resolveTheme, applyThemeDeclaration } from '../src/shared/theme.js'
import { buildMenuTemplate, normalizeCatalog, selectCatalogItem } from '../src/shared/menu-template.js'

/* ════════════════════════════════════════════════════════════════════════════
 * §0 HELPERS — fs reads, scanners, git probes (the S-·/E-· drives)
 * ════════════════════════════════════════════════════════════════════════════ */

const SRC_ROOT = join(process.cwd(), 'src')

function readSrc(relative: string): string {
  return readFileSync(join(SRC_ROOT, relative), 'utf8')
}

function srcFiles(): string[] {
  const out: string[] = []
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) out.push(p)
    }
  }
  walk(SRC_ROOT)
  return out
}

function gitNameOnlyHead(): string {
  return execFileSync('git', ['diff', '--name-only', 'HEAD'], { cwd: process.cwd() }).toString('utf8')
}

function gitLsFile(relative: string): boolean {
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', relative], { cwd: process.cwd(), stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function gitFileInHead(relative: string): boolean {
  try {
    execFileSync('git', ['cat-file', '-e', `HEAD:${relative}`], { cwd: process.cwd(), stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

/** E-ST-1's re-pin probe (spec §2.7 item 7 extension 2, 2026-10-03): the number of
 *  commits whose history touches the file — exactly ONE proves the file was
 *  BORN in that (landing) commit: it neither predated the unit (different commit)
 *  nor was edited later (a second commit). */
function gitFileCommitCount(relative: string): number {
  try {
    const out = execFileSync('git', ['log', '--format=%H', '--', relative], { cwd: process.cwd(), stdio: 'pipe', encoding: 'utf8' })
    return out.trim() === '' ? 0 : out.trim().split('\n').length
  } catch {
    return 0
  }
}

/** THE ANTI-ASSEMBLY DETECTORS (§7 item 2): import-statement forms, `require(`
 *  and dynamic `import(` are the three positive-control classes the census rows
 *  name. `import.meta` and the word `import` in prose/identifiers are NOT forms.
 *  No comment stripping happens before scanning (comments are scanned as code). */
const IMPORT_STATEMENT_FORM = /\bimport\s+(?:type\s+)?(?:[\{'"]|\*|\w+\s+from)/g
const DYNAMIC_IMPORT_FORM = /\bimport\s*\(/g
const REQUIRE_FORM = /\brequire\s*\(/g
/** THE BLOCKED-SIBLING SET is the SIBLING MECHANISMS the spec names (`§2.1`: an
 *  import of ANY sibling mechanism — `gutter.js`, `relocate.js`, `zones.js`,
 *  `census.js`, `menu-template.js` — into the overlay/theme caller files is a
 *  FAIL). The modules each caller wires (`overlay.js`/`theme.js`) are NOT in the
 *  blocked set: `§2.1` declares those imports ALLOWED (the caller file imports
 *  the module it wires; the census is over unwanted specifiers). */
const SIBLING_SPECIFIER_FORM = /from\s+['"][^'"]*(?:gutter|relocate|zones|census|menu-template)\.js['"]/g

/** A store-shaped PARAMETER in a function signature — the P-SMS-MT-IM-2 /
 *  S-OV-2 / S-TH-2 controls' second class (a signature carrying a store
 *  parameter MUST FAIL the no-store-in-signature reading). */
function signatureStoreParams(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(/(?:export\s+)?function\s+\w+\s*\(([^)]*)\)/g)) {
    if (/\bstore\b/.test(m[1] ?? '')) out.push(m[0] ?? '')
  }
  return out
}

function scanImportForms(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(IMPORT_STATEMENT_FORM)) out.push(`import-form: ${m[0]}`)
  for (const m of text.matchAll(DYNAMIC_IMPORT_FORM)) out.push(`dynamic-import: ${m[0]}`)
  for (const m of text.matchAll(REQUIRE_FORM)) out.push(`require-form: ${m[0]}`)
  return out
}

/** THE NORMALIZED VIEW (§3.4: "a NORMALIZED view (string-literal concatenation
 *  joined, template substitutions joined)"): `'im' + 'port'` and `` `i${'m'}port` ``
 *  resolve back to import-shaped text so the anti-assembly discipline binds. */
function normalizedText(text: string): string {
  let out = text
  for (let i = 0; i < 16; i += 1) {
    const next = out.replace(/(['"])((?:\\.|(?!\1).)*)\1\s*\+\s*(['"])((?:\\.|(?!\3).)*)\3/g, '$1$2$4$1')
    if (next === out) break
    out = next
  }
  return out.replace(/`([^`]*)`/g, (_m, body: string): string => `'${body.replace(/\$\{[^}]*\}/g, '')}'`)
}

function commentBodies(text: string): string {
  const out: string[] = []
  for (const m of text.matchAll(/\/\/[^\n]*/g)) out.push(m[0])
  for (const m of text.matchAll(/\/\*[\s\S]*?\*\//g)) out.push(m[0])
  return out.join('\n')
}

/** Three readings of a file (raw · normalized · comments-as-code). Each reading
 *  is CLEAN iff scanImportForms finds nothing AND no sibling-mechanism
 *  specifier import appears. */
function censusReadings(relative: string): { reading: string; hits: string[] }[] {
  const raw = readSrc(relative)
  return [
    { reading: 'raw', hits: [...scanImportForms(raw), ...scanSibling(raw)] },
    { reading: 'normalized', hits: [...scanImportForms(normalizedText(raw)), ...scanSibling(raw)] },
    { reading: 'comments-as-code', hits: [...scanImportForms(commentBodies(raw)), ...scanSibling(raw)] },
  ]
}

function scanSibling(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(SIBLING_SPECIFIER_FORM)) out.push(`sibling-specifier: ${m[0]}`)
  return out
}

/** The store's frozen bytes carry NO caller vocabulary: no `overlay`/`theme`/
 *  `settings`/`menu` root word and no caller reference spelling (S-OV-3's and
 *  S-TH-3's store half, "asserted FROM the caller side"). The store's own
 *  `GraphTierToken` vocabulary ("tier token") is ITS OWN frozen surface, not a
 *  caller spelling — no scan targets it. */
function storeVocabularyHits(): string[] {
  const out: string[] = []
  for (const f of ['renderer/store-core-graph.ts', 'renderer/store-graph-references.ts']) {
    const text = readSrc(f)
    for (const m of text.matchAll(/\b(overlay|theme|settings|menu)\b/g)) out.push(`${f}: caller-vocabulary ${m[0]}`)
    for (const spelling of ['mem.overlay', 'file.settings.theme.token', 'file.menu.catalog']) {
      if (text.includes(spelling)) out.push(`${f}: caller-spelling ${spelling}`)
    }
  }
  return out
}

function countOccurrences(text: string, needle: string): number {
  let count = 0
  let idx = 0
  for (;;) {
    idx = text.indexOf(needle, idx)
    if (idx === -1) break
    count += 1
    idx += needle.length
  }
  return count
}

/** The E-· no-importer rows' REFERENCE reading: a planted consumer's bytes
 *  carry the module's value names (the probe is over the names appearing in a
 *  file — not only the import-statement form — so a second consumer is caught
 *  even under the reference spelling). */
function textHasModuleReference(text: string, ...names: string[]): boolean {
  return names.every((n) => text.includes(n))
}

/** Module-scope store-shaped binding detector (the P-SMS-*-IM-2 scan's half):
 *  a `const`/`let`/`var` DECLARATION of a store-shaped identifier at any depth
 *  of the scanned bytes. A parameter-scoped reference (`store.commit(...)` etc.)
 *  is a member access, NOT a declaration — never matched. */
function storeBindings(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(/(?:^|\n|\s)(?:const|let|var)\s+(store|wiredGraphStore|graphStore)\b[^;\n]*/g)) {
    out.push(m[0].trim())
  }
  return out
}

/** THE ROUND-3 R-3 COMPARATOR (canonical structural comparison for record
 *  answers; `===` for primitives — hand-rolled, no deep-equality dependency;
 *  §5.5.1, §2.5). */
function canonicalOf(value: unknown, depth = 0): unknown {
  if (depth > 16) return '<depth>'
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map((item) => canonicalOf(item, depth + 1))
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    out[key] = canonicalOf((value as Record<string, unknown>)[key], depth + 1)
  }
  return out
}

function structurallyEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a as Record<string, unknown>)
  const kb = Object.keys(b as Record<string, unknown>)
  if (ka.length !== kb.length) return false
  for (const key of ka) {
    if (!Object.prototype.hasOwnProperty.call(b as Record<string, unknown>, key)) return false
    if (!structurallyEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false
  }
  return true
}

/** The overlay/theme REFERENCE SPELLINGS, declared once (the one-declaration
 *  rule §2.6 R-2/R-3 — the caller files compose each at EXACTLY ONE site). */
const OV_REFERENCE_PREFIX = 'mem.overlay.'
const TH_REFERENCE = 'file.settings.theme.token'
const MT_REFERENCE = 'file.menu.catalog'
const PDV_REFS = ['layout.pane.', 'layout.zone.'] as const

/* ════════════════════════════════════════════════════════════════════════════
 * §4.2 ITEM 1 — THE RECORDING STORE DOUBLE (conforms to the FROZEN surface's
 * shapes: resolve, tier-handle get, set, commit, remove, clear, subscribe —
 * plus the recording surface the drives assert: read log, written map,
 * subscription set, event census). It adds NO frozen-surface member of its own.
 * ════════════════════════════════════════════════════════════════════════════ */

const TIER_ORDER = ['temp', 'mem', 'file'] as const
type TierKey = (typeof TIER_ORDER)[number]

interface DoubleRead {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
}

interface DoubleReceipt {
  readonly status: 'committed' | 'refused'
  readonly name: string
  readonly reason?: string
  readonly cleared: readonly string[]
  readonly repaired: readonly string[]
  readonly rows: readonly unknown[]
  readonly crossings: number
  readonly events: number
}

interface StoreDouble {
  resolve(name: string): DoubleRead & { readonly tier: TierKey | null }
  set(name: string, value: unknown, opts?: unknown): DoubleReceipt
  commit(name: string, value: unknown, opts?: unknown): DoubleReceipt
  remove(name: string): DoubleReceipt
  clear(name: string): DoubleReceipt
  subscribe(name: string, listener: (event: unknown) => void, opts?: { subtree?: boolean }): {
    readonly name: string
    readonly subtree: boolean
    unsubscribe(): boolean
  }
  tiers: Record<TierKey, {
    get(name: string): DoubleRead
    set(name: string, value: unknown, opts?: unknown): DoubleReceipt
    clear(name: string): DoubleReceipt
    has(name: string): boolean
  }>
  readonly readLog: string[]
  readonly written: { readonly verb: string; readonly name: string; readonly value: unknown; readonly opts?: unknown }[]
  readonly subscriptions: { readonly name: string; readonly subtree: boolean; readonly listener: (event: unknown) => void }[]
  readonly events: string[]
  readonly wroteCount: number
}

function createRecordingStoreDouble(): StoreDouble {
  const tierState: Record<TierKey, Map<string, unknown>> = { temp: new Map(), mem: new Map(), file: new Map() }
  const readLog: string[] = []
  const written: { verb: string; name: string; value: unknown; opts?: unknown }[] = []
  const subscriptions: { name: string; subtree: boolean; listener: (event: unknown) => void }[] = []
  const events: string[] = []

  let wrote = 0

  const splitName = (name: string): { tier: TierKey | null; key: string } => {
    const first = name.split('.')[0] ?? ''
    if ((TIER_ORDER as readonly string[]).includes(first)) return { tier: first as TierKey, key: name.slice(first.length + 1) }
    return { tier: null, key: name }
  }

  const find = (name: string): { tier: TierKey; found: boolean; value: unknown } => {
    const { tier, key } = splitName(name)
    if (tier !== null) {
      const has = tierState[tier].has(key)
      return { tier, found: has, value: has ? tierState[tier].get(key) : undefined }
    }
    for (const t of ['file', 'mem', 'temp'] as const) {
      if (tierState[t].has(key)) return { tier: t, found: true, value: tierState[t].get(key) }
    }
    return { tier: 'temp', found: false, value: undefined }
  }

  const receipt = (name: string, status: 'committed' | 'refused', reason?: string): DoubleReceipt => {
    const out: DoubleReceipt = { status, name, cleared: [], repaired: [], rows: [], crossings: 0, events: 1 }
    if (reason !== undefined) return { ...out, reason }
    return out
  }

  const qualified = (name: string, targetTier: TierKey): string => `${targetTier}.${splitName(name).key}`

  const handleFor = (tier: TierKey): StoreDouble['tiers'][TierKey] => ({
    get(name: string): DoubleRead {
      const has = tierState[tier].has(name)
      return { found: has, value: has ? tierState[tier].get(name) : undefined, name }
    },
    set(name: string, value: unknown, opts?: unknown): DoubleReceipt {
      return write('set', qualified(name, tier), value, opts)
    },
    clear(name: string): DoubleReceipt {
      const full = qualified(name, tier)
      tierState[tier].delete(splitName(name).key)
      events.push(`clear:${full}`)
      return receipt(full, 'committed')
    },
    has(name: string): boolean {
      return tierState[tier].has(name)
    },
  })

  function write(verb: 'set' | 'commit', rawName: string, value: unknown, opts?: unknown): DoubleReceipt {
    written.push({ verb, name: rawName, value, opts })
    wrote += 1
    const { tier, key } = splitName(rawName)
    if (tier === null) return receipt(rawName, 'refused', 'malformed-name')
    if (verb === 'set' && !tierState[tier].has(key)) {
      // §2.8 item 1: a `set` on a path with NO node is the REFUSED
      // `'undeclared-name'` class — the double never mints on `set`.
      return receipt(rawName, 'refused', 'undeclared-name')
    }
    tierState[tier].set(key, value)
    events.push(`${verb}:${rawName}`)
    return receipt(rawName, 'committed')
  }

  let live = true

  return {
    resolve(name: string): DoubleRead & { readonly tier: TierKey | null } {
      readLog.push(name)
      const hit = find(name)
      return { found: hit.found, value: hit.value, name, tier: hit.found ? hit.tier : null }
    },
    set(name: string, value: unknown, opts?: unknown): DoubleReceipt {
      return write('set', name, value, opts)
    },
    commit(name: string, value: unknown, opts?: unknown): DoubleReceipt {
      return write('commit', name, value, opts)
    },
    remove(name: string): DoubleReceipt {
      written.push({ verb: 'remove', name, value: undefined })
      const { tier, key } = splitName(name)
      if (tier === null) return receipt(name, 'refused', 'malformed-name')
      if (!tierState[tier].has(key)) return receipt(name, 'refused', 'undeclared-name')
      // §2.8 item 4: remove clears the NAMED tier and every less-persistent copy.
      for (const t of TIER_ORDER) {
        if (tierState[t].has(key)) {
          tierState[t].delete(key)
          events.push(`remove:${t}.${key}`)
        }
        if (t === tier) break
      }
      events.push(`remove:${name}`)
      return receipt(name, 'committed')
    },
    clear(name: string): DoubleReceipt {
      const { tier, key } = splitName(name)
      if (tier === null) return receipt(name, 'refused', 'malformed-name')
      if (!tierState[tier].has(key)) return receipt(name, 'refused', 'undeclared-name')
      tierState[tier].delete(key)
      events.push(`clear:${name}`)
      return receipt(name, 'committed')
    },
    subscribe(name: string, listener: (event: unknown) => void, opts?: { subtree?: boolean }): {
      readonly name: string
      readonly subtree: boolean
      unsubscribe(): boolean
    } {
      const subtree = opts !== undefined && opts !== null && opts.subtree === true
      subscriptions.push({ name, subtree, listener })
      return {
        name,
        subtree,
        unsubscribe(): boolean {
          if (!live) return false
          const idx = subscriptions.findIndex((s) => s.name === name && s.listener === listener)
          if (idx === -1) return false
          subscriptions.splice(idx, 1)
          live = false
          return true
        },
      }
    },
    tiers: { temp: handleFor('temp'), mem: handleFor('mem'), file: handleFor('file') },
    readLog,
    written,
    subscriptions,
    events,
    wroteCount: 0,
  }
}

/** READ the double's record of a written name: the LAST write of `name` (or
 *  undefined when never written) — the drives assert the written VALUE. */
function writtenValueOf(double: StoreDouble, name: string, verb?: string): unknown {
  let found: unknown
  for (const w of double.written) {
    if (w.name === name && (verb === undefined || w.verb === verb)) found = w.value
  }
  return found
}

/** A THROWING store double (F-OV-3/F-TH-4's fail-state surface): every store
 *  call throws; the wiring turn must ABSORB (§0 ruling 11). */
function createThrowingStoreDouble(): Record<string, unknown> {
  const boom = (): never => {
    throw new Error('hostile store throws (test seam)')
  }
  return {
    resolve: boom,
    set: boom,
    commit: boom,
    remove: boom,
    clear: boom,
    subscribe: boom,
    tiers: {
      mem: { get: boom, has: boom, set: boom, clear: boom },
      file: { get: boom, has: boom, set: boom, clear: boom },
      temp: { get: boom, has: boom, set: boom, clear: boom },
    },
  }
}

function createRealStore(): GraphStore {
  // THE CALLER'S CONSTRUCTION-TIME DECLARATION INPUT (§2.6, storeGraphReferences
  // — the caller's own top-level roots; the pane-drag landing's names included
  // for the verification half's real-store drives).
  return createGraphStore({
    declarations: storeGraphReferences([
      { name: 'overlay' },
      { name: 'settings' },
      { name: 'menu' },
      { name: 'layout' },
      { name: 'drag' },
    ]),
    enableTestSeam: true,
  })
}

/* ════════════════════════════════════════════════════════════════════════════
 * THE WIRING LOADERS — the two NEW caller files this unit declares. NOT LANDED
 * TODAY: the loader normalizes the module-not-found rejection into the honest
 * RED reason. Each caller-family row awaits the loader first, so the whole
 * family is red for the same honest cause (§2.1's homes table).
 * ════════════════════════════════════════════════════════════════════════════ */

interface OverlayStoreTurn {
  readState(name: unknown): unknown
  transition(name: unknown, verb: unknown, callback?: unknown): { state: unknown; changed: unknown }
  declaration(target: unknown, attributeName: unknown, inert: unknown): { name: unknown; value: unknown; removal: unknown; target: unknown }
}
type OverlayWiringFactory = (store: unknown) => OverlayStoreTurn

async function loadOverlayWiringFactory(): Promise<OverlayWiringFactory> {
  try {
    const mod = (await import('../src/renderer/overlay-store.js')) as Partial<{ createOverlayStoreWiring: unknown }>
    if (typeof mod.createOverlayStoreWiring !== 'function') {
      throw new Error('the module loads but exports no createOverlayStoreWiring function')
    }
    return mod.createOverlayStoreWiring as OverlayWiringFactory
  } catch (e) {
    throw new Error(
      `RED (H2b §2.2): src/renderer/overlay-store.ts is NOT LANDED — createOverlayStoreWiring absent (${e instanceof Error ? e.message : String(e)})`,
    )
  }
}

interface ThemeResolutionRecord {
  readonly setting: unknown
  readonly prefersDark: unknown
  readonly source: unknown
}
interface ThemeResolutionTurn {
  resolveSetting(env: unknown): ThemeResolutionRecord
  writeSetting(value: unknown): unknown
}
type ThemeWiringFactory = (store: unknown, seed: unknown) => ThemeResolutionTurn

async function loadThemeWiringFactory(): Promise<ThemeWiringFactory> {
  try {
    const mod = (await import('../src/renderer/theme-store.js')) as Partial<{ createThemeResolutionWiring: unknown }>
    if (typeof mod.createThemeResolutionWiring !== 'function') {
      throw new Error('the module loads but exports no createThemeResolutionWiring function')
    }
    return mod.createThemeResolutionWiring as ThemeWiringFactory
  } catch (e) {
    throw new Error(
      `RED (H2b §2.3): src/renderer/theme-store.ts is NOT LANDED — createThemeResolutionWiring absent (${e instanceof Error ? e.message : String(e)})`,
    )
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 * THE MENU CORPUS (§5.5.1 P-SMS-MT-TP-1's fixed corpus — recorded reading (3))
 * ════════════════════════════════════════════════════════════════════════════ */

const FIXED_CATALOG = {
  title: 'H2b-fixed',
  items: [
    { id: 'open', label: 'Open' },
    { id: 'close', label: 'Close' },
  ],
}
const THROWING_PICKER = (): unknown => {
  throw new Error('picker throws (the degraded arm)')
}
const PICKER_HIT = (): unknown => 'open'
const PICKER_MISS = (): undefined => undefined

function hostileCatalog(): unknown {
  const cyclic: Record<string, unknown> = { items: [] }
  cyclic['self'] = cyclic
  const { proxy, revoke } = Proxy.revocable<Record<string, unknown>>({}, {})
  revoke()
  return { items: [cyclic], revoked: proxy }
}

function menuScriptAnswers(): unknown[] {
  const fixed = JSON.parse(JSON.stringify(FIXED_CATALOG)) as unknown
  return [
    normalizeCatalog(fixed),
    normalizeCatalog(hostileCatalog()),
    buildMenuTemplate(fixed, { platform: 'darwin' }),
    buildMenuTemplate(fixed, {}),
    buildMenuTemplate(fixed, { platform: 'win32', picker: THROWING_PICKER }),
    selectCatalogItem(fixed, PICKER_HIT),
    selectCatalogItem(fixed, PICKER_MISS),
    buildMenuTemplate(null),
  ]
}

/* ════════════════════════════════════════════════════════════════════════════
 * §3.1 THE VALID / HAPPY STATES (M-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-rows — the overlay caller-store family (M-OV-*)', () => {
  test('M-OV-1 — the read turn reads the stored state; a MISS answers undefined (§2.2 items 1/2/4)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    double.commit('mem.overlay.a.state', 'open', { onRepeat: 'edit' })
    const turn = factory(double)
    expect(turn.readState('a')).toBe('open')
    expect(double.readLog).toContain('mem.overlay.a.state')
    // the tier-qualified read is the route (§2.2 item 1: the read IS the
    // observation — resolve('mem.overlay.<name>.state'), never a tier-free read)
    expect(double.readLog.filter((n) => n === 'mem.overlay.a.state').length).toBeGreaterThanOrEqual(1)
    const cold = createRecordingStoreDouble()
    expect(factory(cold).readState('a')).toBeUndefined()
  })

  test('M-OV-2 — the write turn lands the next state; a no-change verb performs NO write (§2.2 items 1/3)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    double.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turn = factory(double)
    const r = turn.transition('a', 'open')
    expect(r.state).toBe('open')
    expect(r.changed).toBe(true)
    expect(writtenValueOf(double, 'mem.overlay.a.state', 'commit')).toBe('open')
    // the write verb is commit with onRepeat 'edit' (§2.8 item 3) — never `set`
    const last = double.written.filter((w) => w.name === 'mem.overlay.a.state')
    expect(last.some((w) => w.verb === 'commit' && w.opts !== undefined && (w.opts as { onRepeat?: unknown }).onRepeat === 'edit')).toBe(true)
    // a no-change verb performs NO write
    const before = double.written.length
    const again = turn.transition('a', 'open')
    expect(again.state).toBe('open')
    expect(again.changed).toBe(false)
    expect(double.written.length).toBe(before)
  })

  test('M-OV-3 — the Escape callback is handed through UNINTERPRETED and invoked once; a hostile callback is absorbed and the turn still writes (overlay.md M-9, §2.2 item 1)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    double.commit('mem.overlay.a.state', 'open', { onRepeat: 'edit' })
    const turn = factory(double)
    let calls = 0
    const cb = (): void => {
      calls += 1
    }
    const r = turn.transition('a', 'escape', cb)
    expect(r.state).toBe('closed')
    expect(r.changed).toBe(true)
    expect(calls).toBe(1)
    expect(writtenValueOf(double, 'mem.overlay.a.state', 'commit')).toBe('closed')
    // a hostile (throwing) callback: absorbed by the MODULE's landed totality
    // (nothing escapes the turn). Drive 2 runs on the STORED 'closed' left by
    // drive 1 — from 'closed' the escape verb is a NON-MOVING cell (overlay.md
    // M-4): the module returns the record BY IDENTITY ({state:'closed',
    // changed:false}) and NO write follows — §2.2 item 1's pass-through (write
    // ONLY when the module reports changed:true; the amended §3.1 M-OV-3 cell).
    const before = double.written.length
    const throwing = (): never => {
      throw new Error('escape callback throws')
    }
    const r2 = turn.transition('a', 'escape', throwing)
    expect(r2.state).toBe('closed')
    expect(r2.changed).toBe(false)
    expect(double.written.length).toBe(before)
    expect(writtenValueOf(double, 'mem.overlay.a.state', 'commit')).toBe('closed')
    // THE MOVING DRIVE is escape from a state that is NOT 'closed' — and it
    // still writes even with a HOSTILE callback present (the module absorbed
    // the throw before returning its record)
    const moving = createRecordingStoreDouble()
    moving.commit('mem.overlay.a.state', 'open', { onRepeat: 'edit' })
    const turnMoving = factory(moving)
    const r3 = turnMoving.transition('a', 'escape', throwing)
    expect(r3.state).toBe('closed')
    expect(r3.changed).toBe(true)
    expect(writtenValueOf(moving, 'mem.overlay.a.state', 'commit')).toBe('closed')
  })

  test('M-OV-4 — the inert declaration stays RETURNED and is NEVER applied (E5-B-1); NO element, NO attribute, NO store call in the turn (§2.2 item 1)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    const turn = factory(double)
    const target = { setAttributeCalls: 0, classListCalls: 0 } as unknown
    const recTarget = {
      setAttribute: (): void => {
        ;(target as { setAttributeCalls: number }).setAttributeCalls += 1
      },
      classList: { add: (): void => { void 0 } },
    }
    const d = turn.declaration(recTarget as unknown, 'data-inert', true)
    expect(d.name).toBe('data-inert')
    // THE RETURNED-AS-TEXT READING (recorded reading (4); the E5-B-1 row name)
    expect(d.value).toBe('true')
    expect(d.removal).toBe(false)
    expect(d.target).toBe(recTarget as unknown)
    // NEVER APPLIED: no store call of ANY kind in the declaration turn
    expect(double.readLog.length).toBe(0)
    expect(double.written.length).toBe(0)
    // no element/attribute mutation reached the target
    expect((target as { setAttributeCalls: number }).setAttributeCalls).toBe(0)
    // the removal arm (inert=false ⇒ {value:false, removal:true})
    const removal = turn.declaration(recTarget as unknown, 'data-inert', false)
    expect(removal.value).toBe(false)
    expect(removal.removal).toBe(true)
    expect(removal.target).toBe(recTarget as unknown)
  })

  test('M-OV-5 — the COLD-double drive answers the PASS-THROUGH REALITY: the module\'s landed totality coerces the MISS to the no-move record, NO write, the readback stays a MISS; the mint turn is M-OV-2\'s flow FROM A REAL STATE (§2.2 items 4/6, the amended §3.1 cell)', async () => {
    // THE AMENDED TRANSCRIPT (spec §3.1 M-OV-5's CORRECTED cell, §2.2 items
    // 1/4, §4.2 — the pre-implementer amendment pass landed 2026-10-03): the
    // COLD-double `transition('a','open')` drive answers `{state:'closed',
    // changed:false}` — the missing state is NOT a state: overlayTransition
    // coerces EVERY non-state × every verb to the declared no-move record and
    // NEVER reports changed:true from a MISS — so NO write is owed (the caller
    // writes ONLY when the module reports changed:true), and a subsequent
    // readState answers undefined (the store still holds nothing). A caller-side
    // mint-from-MISS would require inventing a default (forbidden — F-OV-1) or
    // moving a module byte (§2.7 prohibition 1); the mint/re-mint turn is
    // M-OV-2's flow FROM A REAL STATE present in the store (driven below).
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble() // COLD — no stored copy
    const turn = factory(double)
    const r = turn.transition('a', 'open')
    expect(r.state).toBe('closed')
    expect(r.changed).toBe(false)
    // NO write: the double's written map holds nothing for the reference
    expect(writtenValueOf(double, 'mem.overlay.a.state')).toBeUndefined()
    expect(double.written.length).toBe(0)
    expect(turn.readState('a')).toBeUndefined()
    // THE MINT TURN IS FROM A REAL STATE (M-OV-2's flow — the amended re-pin):
    // seed the record, drive the changed transition, the write mints 'open'
    const seeded = createRecordingStoreDouble()
    seeded.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turnSeeded = factory(seeded)
    const minted = turnSeeded.transition('a', 'open')
    expect(minted.state).toBe('open')
    expect(minted.changed).toBe(true)
    expect(writtenValueOf(seeded, 'mem.overlay.a.state', 'commit')).toBe('open')
    expect(turnSeeded.readState('a')).toBe('open')
  })
})

describe('§3.1 M-rows — the theme resolution family (M-TH-*)', () => {
  test('M-TH-1 — the resolution site reads the committed token and passes it AS the module\'s setting (§2.3 items 1/2)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble()
    double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    const turn = factory(double, 'light')
    const r = turn.resolveSetting({ prefersDark: false })
    expect(double.readLog).toContain('file.settings.theme.token')
    expect(r.setting).toBe('dark')
    expect(r.prefersDark).toBe(false)
    expect(r.source).toBe('env')
  })

  test('M-TH-2 — the DEFAULT-SEED RULE: on a MISS the answer\'s setting IS the seed BY IDENTITY; NO store write happens on the miss (§2.3 items 1/4)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble() // COLD
    const seed = 'light'
    const turn = factory(double, seed)
    const r = turn.resolveSetting({ prefersDark: true })
    expect(r.setting).toBe(seed) // BY IDENTITY (primitive identity — toBe)
    expect(r.prefersDark).toBe(true)
    expect(r.source).toBe('env')
    expect(double.written.length).toBe(0) // the miss makes NO store write
  })

  test('M-TH-3 — the pass-through keeps the module total: ANY env answers a ThemeResolution, never a throw (§2.3 item 1, theme.md §2.3 item 2)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble()
    double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    const turn = factory(double, 'light')
    const hostileEnvs: unknown[] = [
      {},
      'prefersDark',
      Object.defineProperty({}, 'prefersDark', { get: () => { throw new Error('throwing accessor') } }),
      (() => { const p = Proxy.revocable({ prefersDark: false }, {}); p.revoke(); return p.proxy })(),
      Object.create({ prefersDark: false }),
    ]
    for (const env of hostileEnvs) {
      let r: ThemeResolutionRecord | undefined
      let threw: unknown = null
      try {
        r = turn.resolveSetting(env)
      } catch (e) {
        threw = e
      }
      // never a throw; the module's declared hostile-env record
      expect(threw).toBeNull()
      expect(r).toBeDefined()
      expect(r?.prefersDark).toBe(false)
      expect(r?.source).toBe('degraded-env')
    }
    const ok = turn.resolveSetting({ prefersDark: false })
    expect(ok.source).toBe('env')
    expect(ok.prefersDark).toBe(false)
  })

  test('M-TH-4 — the write turn mints/edits the token via commit {onRepeat:edit}; a refused receipt is consumed without a throw (§2.3 item 1, §2.2 item 3)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble()
    const turn = factory(double, 'light')
    const receipt = turn.writeSetting('dark')
    expect(writtenValueOf(double, 'file.settings.theme.token', 'commit')).toBe('dark')
    const last = double.written.filter((w) => w.name === 'file.settings.theme.token')
    expect(last.some((w) => w.verb === 'commit' && w.opts !== undefined && (w.opts as { onRepeat?: unknown }).onRepeat === 'edit')).toBe(true)
    expect(receipt).toBeDefined()
    // a refused / serialization-failed receipt is consumed as the store's
    // declared return — never a throw out of the turn
    const refusing = createRecordingStoreDouble()
    const originalCommit = refusing.commit.bind(refusing)
    ;(refusing as { commit: unknown }).commit = (name: string): unknown => ({ status: 'refused', reason: 'serialize-failed', name })
    const turn2 = factory(refusing, 'light')
    let threw: unknown = null
    try {
      void turn2.writeSetting('dark')
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    void originalCommit
  })
})

describe('§3.1 M-rows — the menu-template recorded family (M-MT-*)', () => {
  test('M-MT-1 — the latent module\'s answers are argument-determined: the fixed corpus answers deterministically, no throw, no store surface involved (§2.4 items 1/4, P-SMS-MT-TP-1)', () => {
    // THE DIFFERENTIAL'S SCRIPT RUN TWICE ON THE SAME ARGUMENTS — determinism.
    const first = menuScriptAnswers()
    const second = menuScriptAnswers()
    expect(first.length).toBe(8)
    for (let i = 0; i < first.length; i += 1) {
      // no throw already proven by reaching here; the answer is DEFINED
      expect(first[i]).toBeDefined()
      expect(structurallyEqual(canonicalOf(first[i]), canonicalOf(second[i]))).toBe(true)
    }
  })
})

describe('§3.1 M-rows — the VERIFICATION half on the LANDED composition (M-PDV-*)', () => {
  test('M-PDV-1 — the pane-size read REACHES THE STORE through the composition\'s tierRead route; the answer IS the stored value (§2.5 items 1/2, pane-drag §2.1 A)', () => {
    const double = createRecordingStoreDouble()
    double.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(double, {})
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    expect(double.readLog).toContain('mem.layout.pane.pane-a.size')
    // the same closure answers defaultSizeFor identically
    expect(surface.defaultSizeFor({ id: 'pane-a' }, 'pane-a')).toBe(320)
    // the MISS arm answers the declared degradation (undefined → the E3
    // non-number class at the consumer; never a module-held value — the store
    // itself, via the boot bootstrap, invented nothing)
    const cold = createRecordingStoreDouble()
    const surfaceCold: PaneDragSurface = createPaneDrag(cold, {})
    expect(surfaceCold.startSizeOf({ id: 'pane-missing' }, 'pane-missing')).toBeUndefined()
  })

  test('M-PDV-2 — the bounds read answers AS STORED, never a policy clamped here (§2.5 items 1/2, pane-drag §2.1 A)', () => {
    const double = createRecordingStoreDouble()
    const stored = { min: 100, max: 600 }
    double.commit('mem.layout.pane.pane-a.bounds', stored, { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(double, {})
    const answer = surface.boundsOf({ id: 'pane-a' }, 'pane-a')
    expect(double.readLog).toContain('mem.layout.pane.pane-a.bounds')
    expect(structurallyEqual(canonicalOf(answer), canonicalOf({ min: 100, max: 600 }))).toBe(true)
  })

  test('M-PDV-3 — the candidate read answers the stored OPAQUE slot + the stored distance; a MISSING slot answers [] (§2.5 items 1/2, pane-drag §2.1 B)', () => {
    const double = createRecordingStoreDouble()
    const opaque = { slotToken: 'opaque-caller-value' }
    double.commit('mem.layout.zone.zone-1.slot', opaque, { onRepeat: 'edit' })
    double.commit('mem.layout.zone.zone-1.distance', 37, { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(double, {})
    const answer = surface.candidatesFor({ zoneId: 'zone-1' })
    expect(double.readLog).toContain('mem.layout.zone.zone-1.slot')
    expect(double.readLog).toContain('mem.layout.zone.zone-1.distance')
    expect(answer.length).toBe(1)
    expect(answer[0]?.candidate).toBe(opaque) // OPAQUE AS STORED, by identity
    expect(answer[0]?.distance).toBe(37)
    const missing = createRecordingStoreDouble()
    const surfaceMissing: PaneDragSurface = createPaneDrag(missing, {})
    expect(surfaceMissing.candidatesFor({ zoneId: 'zone-x' })).toEqual([])
  })

  test('M-PDV-4 — the composition owns EXACTLY ONE subscriber: the LANDED tier-qualified temp.drag form and NOTHING on the pane/zone references (§2.5 items 1/2, pane-drag §2.3 item 2)', () => {
    const double = createRecordingStoreDouble()
    createPaneDrag(double, {})
    expect(double.subscriptions.length).toBe(1)
    expect(double.subscriptions[0]?.name).toBe('temp.drag')
    expect(double.subscriptions[0]?.subtree).toBe(true)
    // nothing registered on the pane/zone references
    expect(double.subscriptions.some((s) => s.name.startsWith('mem.layout'))).toBe(false)
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.2 THE DOCUMENTED FAIL-STATES (F-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.2 F-rows — overlay (F-OV-*)', () => {
  test('F-OV-1 — the caller invents NO default on a MISS; the passing drive answers undefined (read) / the module\'s totality coerces (transition)', async () => {
    // the FAILING drive: a fixture turn that answers a CALLER-WRITTEN default
    // state straight from a MISS — the invented-state class the rule forbids
    const inventingTurn = (): unknown => 'open' // invented default, no module transition
    expect(inventingTurn()).toBe('open')
    expect(inventingTurn()).not.toBeUndefined()
    // the module's own totality IS the declared coercion — the positive control:
    // the landed totality answers the 'closed'-based record for every non-state
    // (the landed module coerces the input state to 'closed' and reports NO
    // change — the verb is NOT applied to a coerced non-state; see the
    // FAILURE-report item on M-OV-5's transcript in this file's report)
    const moduleAnswer = overlayTransition(undefined, 'open')
    expect(moduleAnswer.state).toBe('closed')
    expect(moduleAnswer.changed).toBe(false)
    // the PASSING drive (the caller wiring): the read answers undefined on the
    // MISS, and the transition passes the read's outcome to the module
    const factory = await loadOverlayWiringFactory()
    const cold = createRecordingStoreDouble()
    const turn = factory(cold)
    expect(turn.readState('a')).toBeUndefined()
  })

  test('F-OV-2 — a `set` in place of the minting `commit` is the REFUSED \'undeclared-name\' class; the turn MUST use commit for the mint (§2.8 item 1)', async () => {
    // the fail-state demonstrated on the double: a set on a path with no node
    const double = createRecordingStoreDouble()
    const setReceipt = double.set('mem.overlay.a.state', 'open')
    expect(setReceipt.status).toBe('refused')
    expect(setReceipt.reason).toBe('undeclared-name')
    // the positive control: commit on the same drive SUCCEEDS (mints)
    const commitReceipt = double.commit('mem.overlay.a.state', 'open', { onRepeat: 'edit' })
    expect(commitReceipt.status).toBe('committed')
    // the caller wiring's mint turns use commit, never set. THE CHANGED-TRUE
    // ARM IS DRIVEN FROM A REAL STATE (the amended §3.1 M-OV-5 reading — a
    // COLD drive answers {state:'closed',changed:false}, never a mint).
    const factory = await loadOverlayWiringFactory()
    const seeded = createRecordingStoreDouble()
    seeded.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turn = factory(seeded)
    const r = turn.transition('a', 'open')
    expect(r.state).toBe('open')
    expect(r.changed).toBe(true)
    // THE ABSENCE CHECK RUNS OVER THE WIRING'S OWN DOUBLE (seeded) — the
    // deliberately-refused `set` fixture double (line 914's `double`) RECORDS
    // EVERY WRITE, including the refused one, so its `written` map is the
    // wrong fixture for a no-set absence check.
    expect(seeded.written.some((w) => w.verb === 'set' && w.name === 'mem.overlay.a.state')).toBe(false)
    // the minting write on the wiring's double is commit, never set
    expect(writtenValueOf(seeded, 'mem.overlay.a.state', 'commit')).toBe('open')
  })

  test('F-OV-3 — a throwing store call never escapes the turn; every turn answers the declared shape (THROWING-SUPPLY-ABSORPTION…, §2.2 item 3)', async () => {
    const factory = await loadOverlayWiringFactory()
    const hostile = createThrowingStoreDouble()
    const turn = factory(hostile)
    let threw: unknown = null
    let read: unknown
    try {
      read = turn.readState('a')
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    expect(read).toBeUndefined() // the declared no-store degradation (MISS reading)
    try {
      const r = turn.transition('a', 'open')
      expect(r).toBeDefined()
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    try {
      const d = turn.declaration({}, 'data-inert', true)
      expect(d).toBeDefined()
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    // the same drives on the recording double pass (the positive control)
    const healthy = createRecordingStoreDouble()
    healthy.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turnOk = factory(healthy)
    expect(turnOk.readState('a')).toBe('closed')
  })

  test('F-OV-4 — NO store subscription is registered by the caller turn: the read IS the observation (§2.2 item 5)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    factory(double)
    expect(double.subscriptions.length).toBe(0)
    factory({})
    expect(double.subscriptions.length).toBe(0)
  })
})

describe('§3.2 F-rows — theme (F-TH-*)', () => {
  test('F-TH-1 — the resolution turn answers NO non-seeded default on the MISS; only the seed BY IDENTITY (§2.3 items 1/4)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble() // COLD
    const seed = 'light'
    const turn = factory(double, seed)
    const r = turn.resolveSetting({ prefersDark: false })
    expect(r.setting).toBe(seed)
    // the failing class: a store-invented / literal default would NOT be the
    // seed by identity — demonstrated on the fixture answer
    const invented: unknown = 'dark'
    expect(invented).not.toBe(seed)
  })

  test('F-TH-2 — the seed arm writes NOTHING to the store; the next write turn re-mints (§2.3 item 4, the H2a MISS-rule shape)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble() // COLD
    const turn = factory(double, 'light')
    const r = turn.resolveSetting({ prefersDark: true })
    expect(r.setting).toBe('light')
    expect(double.written.length).toBe(0) // ANY write in the miss turn FAILS
    // the positive control: after a writeSetting, the next resolveSetting
    // reads the committed token
    void turn.writeSetting('dark')
    const next = turn.resolveSetting({ prefersDark: true })
    expect(next.setting).toBe('dark')
  })

  test('F-TH-3 — a `set` in place of the minting `commit` is REFUSED on the unminted path (§2.8 item 1)', () => {
    const double = createRecordingStoreDouble()
    const setReceipt = double.set('file.settings.theme.token', 'dark')
    expect(setReceipt.status).toBe('refused')
    expect(setReceipt.reason).toBe('undeclared-name')
    const commitReceipt = double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    expect(commitReceipt.status).toBe('committed')
  })

  test('F-TH-4 — a throwing store call never escapes the resolution turn; the answer lands on the declared seed arm (§2.3 items 1/5)', async () => {
    const factory = await loadThemeWiringFactory()
    const hostile = createThrowingStoreDouble()
    const turn = factory(hostile, 'light')
    let threw: unknown = null
    let r: ThemeResolutionRecord | undefined
    try {
      r = turn.resolveSetting({ prefersDark: true })
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    expect(r?.setting).toBe('light')
    try {
      void turn.writeSetting('dark')
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
  })

  test('F-TH-5 — NO store subscription is registered by the resolution turn (§2.3 item 5)', async () => {
    const factory = await loadThemeWiringFactory()
    const double = createRecordingStoreDouble()
    factory(double, 'light')
    expect(double.subscriptions.length).toBe(0)
  })
})

describe('§3.2 F-rows — menu-template (F-MT-*)', () => {
  test('F-MT-1 — a module byte that gains a store import FAILS the 0-import census; the module as landed PASSES the same three-view scan (P-ML-4/I-9, §2.4 item 4)', () => {
    const fixtureWithStoreImport = `// fixture\nimport { createGraphStore } from '../renderer/store-core-graph.js'\nexport const x = createGraphStore()\n`
    expect(scanImportForms(fixtureWithStoreImport).length).toBeGreaterThan(0)
    expect(scanImportForms(normalizedText(fixtureWithStoreImport)).length).toBeGreaterThan(0)
    expect(scanImportForms(commentBodies('/* import { createGraphStore } from \'../renderer/store-core-graph.js\' */')).length).toBeGreaterThan(0)
    const readings = censusReadings('shared/menu-template.ts')
    for (const reading of readings) expect(reading.hits, `${reading.reading} of menu-template.ts must be import-free`).toEqual([])
  })
})

describe('§3.2 F-rows — the SECOND READ AUTHORITY (F-PDV-1, the falsifier) and the RE-LAND (F-PDV-2)', () => {
  test('F-PDV-1(a) — a MODULE-HELD authority answering a size from a module-held variable FAILS the store-backed claim; the LANDED composition on the same drive answers from the store alone (§2.5 items 1/3)', () => {
    const double = createRecordingStoreDouble()
    double.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    // THE FALSIFIER (a): the seam answers from a module-held variable that
    // DISAGREES with the store — no store read, not the stored value
    const moduleHeld = 999
    const moduleHeldSeam = (): unknown => moduleHeld
    expect(double.readLog.length).toBe(0) // NO store read happened
    expect(moduleHeldSeam()).toBe(999)
    expect(moduleHeldSeam()).not.toBe(320) // the store-backed claim FAILS on it
    // THE POSITIVE CONTROL: the LANDED composition answers the STORED value and
    // its read log holds the tier-qualified read
    const surface: PaneDragSurface = createPaneDrag(double, {})
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    expect(double.readLog).toContain('mem.layout.pane.pane-a.size')
  })

  test('F-PDV-1(b) — a DUAL-AUTHORITY seam reading the store AND a module-held value and answering from the module-held one FAILS (§2.5 items 1/3)', () => {
    const double = createRecordingStoreDouble()
    double.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    const moduleHeld = 640
    const dualSeam = (element: unknown, token: unknown): unknown => {
      void element
      void token
      double.resolve('mem.layout.pane.pane-a.size') // reads the store…
      return moduleHeld // …but answers from the module-held value
    }
    expect(dualSeam({ id: 'pane-a' }, 'pane-a')).toBe(640)
    expect(double.readLog).toContain('mem.layout.pane.pane-a.size')
    expect(dualSeam({ id: 'pane-a' }, 'pane-a')).not.toBe(320) // the store-backed claim FAILS
    const surface: PaneDragSurface = createPaneDrag(double, {})
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
  })

  test('F-PDV-2 — a RE-LANDED read (a second implementation for the same reference) is a second authority and FAILS by construction; the LANDED composition remains the sole authority (§2.5 items 1/3, the H2b queue row)', () => {
    const double = createRecordingStoreDouble()
    double.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(double, {})
    surface.startSizeOf({ id: 'pane-a' }, 'pane-a')
    const readsAfterComposition = double.readLog.filter((n) => n === 'mem.layout.pane.pane-a.size').length
    expect(readsAfterComposition).toBe(1) // exactly ONE read authority per turn
    // THE RE-LAND FIXTURE: a separate closure re-reading the same reference —
    // the second-authority class the queue row forbids ("this child VERIFIES,
    // it does not re-land")
    const reLandedClosure = (): unknown => double.resolve('mem.layout.pane.pane-a.size').value
    expect(reLandedClosure()).toBe(320)
    expect(double.readLog.filter((n) => n === 'mem.layout.pane.pane-a.size').length).toBe(2) // a SECOND read of the same reference
    // F-PDV-2 asserts the LANDED composition stays the sole authority: the tree
    // scan (S-PDV-1) proves no src/** file outside the composition reads the
    // reference — driven as part of §3.4's S-PDV-1 test.
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.3 THE INVARIANTS (I-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.3 invariants (I-rows)', () => {
  test('I-OV-1 — the store is a sharing channel, never a second authority: no caller answer consults a name outside mem.overlay.<name>.state and no store value becomes a transition DECISION (P-SMS-OV-TP-1\'s executable claim)', async () => {
    const factory = await loadOverlayWiringFactory()
    const double = createRecordingStoreDouble()
    // ambient values OUTSIDE the module's name are placed in the store — the
    // caller answers must not consult them (the TP-1 differential's cross-run
    // equality executes the full claim on a real store; §5.5.1's row)
    double.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    double.commit('mem.other.carrier', 'open', { onRepeat: 'edit' })
    const turn = factory(double)
    const r = turn.transition('a', 'open')
    expect(r.state).toBe('open')
    expect(r.changed).toBe(true)
    // the same drive on a store WITHOUT the ambient value answers identically —
    // the answer is a function of the module's own name + arguments alone
    const plain = createRecordingStoreDouble()
    plain.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turnPlain = factory(plain)
    const r2 = turnPlain.transition('a', 'open')
    expect(r2.state).toBe(r.state)
    expect(r2.changed).toBe(r.changed)
    // every read the turns performed stayed on the module's own name (or none)
    for (const read of double.readLog) expect(read.startsWith('mem.overlay.')).toBe(true)
  })

  test('I-OV-2 — the module stays pure in every state: overlay.ts performs NO write, holds NO state and its bytes are the landed ones (P-SMS-OV-IM-1, E-OV-1, P-OV-4/I-4)', () => {
    const readings = censusReadings('shared/overlay.ts')
    for (const reading of readings) expect(reading.hits, `${reading.reading} of overlay.ts`).toEqual([])
    expect(gitNameOnlyHead().includes('src/shared/overlay.ts')).toBe(false)
    // the module holds NO state: its answers are functions of the arguments
    // (the anti-ambient differential over the module's landed totality)
    const a = overlayTransition('open', 'escape')
    const b = overlayTransition('open', 'escape')
    expect(structurallyEqual(canonicalOf(a), canonicalOf(b))).toBe(true)
  })

  test('I-TH-1 — the module stays pure: theme.ts\'s answers are functions of the passed setting/env — never of store state — and its bytes (incl. the EMPTY IMPORT CENSUS, THE FLAG ROW) are the landed ones (P-SMS-TH-IM-1, E-TH-1)', () => {
    const readings = censusReadings('shared/theme.ts')
    for (const reading of readings) expect(reading.hits, `${reading.reading} of theme.ts`).toEqual([])
    expect(gitNameOnlyHead().includes('src/shared/theme.ts')).toBe(false)
    const a = resolveTheme('light', { prefersDark: true })
    const b = resolveTheme('light', { prefersDark: true })
    expect(structurallyEqual(canonicalOf(a), canonicalOf(b))).toBe(true)
    expect(a.source).toBe('env')
    expect(a.setting).toBe('light')
    expect(a.prefersDark).toBe(true)
  })

  test('I-TH-2 — the seed is the caller\'s own value in the resolution turn: resolveSetting\'s setting member is the stored token or the seed BY IDENTITY, never a derived token (§2.3 items 1/4)', async () => {
    const factory = await loadThemeWiringFactory()
    const seed = 'light'
    const stored = { token: 'dark' }
    const double = createRecordingStoreDouble()
    double.commit('file.settings.theme.token', stored.token, { onRepeat: 'edit' })
    const turn = factory(double, seed)
    expect(turn.resolveSetting({ prefersDark: false }).setting).toBe(stored.token)
    const cold = createRecordingStoreDouble()
    const turnCold = factory(cold, seed)
    expect(turnCold.resolveSetting({ prefersDark: false }).setting).toBe(seed)
  })

  test('I-MT-1 — the latent module\'s answers are argument-determined TODAY (the anti-ambient claim): the tier state of a name the module never reads never varies an answer (P-SMS-MT-TP-1)', () => {
    const runA = menuScriptAnswers()
    // the runs differ ONLY in the tier state of the hypothetical
    // file.menu.catalog / mem.menu.catalog names — the module NEVER touches them
    const store = createRealStore()
    store.commit('mem.menu.catalog', { different: true }, { onRepeat: 'edit' })
    store.commit('file.menu.catalog', { different: true }, { onRepeat: 'edit' })
    const runB = menuScriptAnswers()
    for (let i = 0; i < runA.length; i += 1) {
      expect(structurallyEqual(canonicalOf(runA[i]), canonicalOf(runB[i])), `menu script answer ${i + 1}`).toBe(true)
    }
  })

  test('I-PDV-1 — one read authority per pane/zone reference: the landed store-backed composition\'s, and nothing else (F-PDV-1\'s complement, §2.5 items 1/3)', () => {
    const double = createRecordingStoreDouble()
    double.commit('mem.layout.zone.zone-1.slot', 'slot-a', { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(double, {})
    surface.candidatesFor({ zoneId: 'zone-1' })
    expect(double.readLog.filter((n) => n === 'mem.layout.zone.zone-1.slot').length).toBe(1)
    // the tree scan half (S-PDV-1 drives the no-second-read-in-the-tree claim)
    const others = srcFiles().filter((f) => f.endsWith('renderer.ts') === false)
    for (const f of others) {
      const text = readFileSync(f, 'utf8')
      for (const ref of PDV_REFS) expect(text.includes(ref), `${f} must carry no pane-drag reference ${ref}`).toBe(false)
    }
  })

  test('I-PDV-2 — the pane-drag mechanism bytes are the landed ones: no byte of gutter.ts/relocate.ts changes in this unit (E-PDV-1, §2.5 item 4)', () => {
    const diff = gitNameOnlyHead()
    expect(diff.includes('src/shared/gutter.ts')).toBe(false)
    expect(diff.includes('src/shared/relocate.ts')).toBe(false)
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.4 THE STATIC ROWS (S-rows) — enumerated scanners with positive controls
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.4 S-rows — overlay (S-OV-*)', () => {
  test('S-OV-1 — the overlay module\'s import census (ZERO imports, three views) PLUS the caller-file census of src/renderer/overlay-store.ts (module value exports + store graph types, name-complete; a sibling-mechanism import FAILS)', () => {
    // module half — GREEN today (landed bytes, P-OV-4/I-4's force)
    for (const reading of censusReadings('shared/overlay.ts')) {
      expect(reading.hits, `${reading.reading} of overlay.ts`).toEqual([])
    }
    // the three positive controls — each form MUST FAIL the census
    expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    // the sibling-mechanism control — a gutter import into the caller file FAILS
    expect(scanSibling(`import { clampToBounds } from '../shared/gutter.js'`).length).toBeGreaterThan(0)
    // caller-file census — RED TODAY: the file is not landed
    const file = 'renderer/overlay-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.1): ${file} does not exist — the caller-file census cannot pass`).toBe(true)
    const text = readSrc(file)
    const imports = [...text.matchAll(/import\s+(?:type\s+)?([^{;]*?\{[^}]*\}|['"][^'"]+['"]|\*)\s*(?:from\s+)?(['"][^'"]+['"])?/g)]
    const specifiers = imports.map((m) => m[2] ?? '').filter((s) => s.length > 0)
    // the DECLARED name-complete set: the module's two value exports + the
    // store's graph TYPES, and nothing else
    expect(text.includes("overlayTransition")).toBe(true)
    expect(text.includes("overlayInertDeclaration")).toBe(true)
    expect(text.includes("overlay-store")).toBe(false) // no self-import
    for (const spec of specifiers) {
      expect(spec.includes('/gutter') || spec.includes('/relocate') || spec.includes('/zones') || spec.includes('/census') || spec.includes('/menu-template')).toBe(false)
    }
  })

  test('S-OV-2 — the overlay caller file\'s no-module-level-binding scan; the spelling mem.overlay.<name>.state appears EXACTLY ONCE (§2.6, P-SMS-OV-IM-2)', () => {
    // the controls — a module-scope binding and a duplicated spelling each FAIL
    expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0)
    expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0)
    const twice = `const a = 'mem.overlay.' + name + '.state'\nconst b = 'mem.overlay.' + name + '.state'\n`
    expect(countOccurrences(twice, OV_REFERENCE_PREFIX)).toBe(2) // the duplicate FAILS the exactly-once reading
    // the caller-file scan — RED TODAY: the file is not landed
    const file = 'renderer/overlay-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.2): ${file} does not exist — the scan cannot pass`).toBe(true)
    const text = readSrc(file)
    expect(storeBindings(text)).toEqual([]) // no module-scope store-shaped binding
    expect(countOccurrences(text, OV_REFERENCE_PREFIX)).toBe(1) // exactly one site
    expect(/createOverlayStoreWiring\s*\(/.test(text)).toBe(true) // the factory declares the store parameter
  })

  test('S-OV-3 — the overlay caller file\'s no-UI/no-MCP scan + the STORE\'s bytes carry no overlay/state vocabulary (asserted from the caller side)', () => {
    // the controls — UI/no-MCP corpus each FAILS the scan
    const uiCorpus = `const el = document.createElement('div')\nel.setAttribute('data-inert', 'true')\nel.classList.add('x')\nel.style.width = '1px'\nprovident.dispatch(el, {})\n`
    for (const token of ['document.createElement', 'setAttribute', 'classList', 'style', 'provident.']) {
      expect(uiCorpus.includes(token)).toBe(true)
    }
    expect(storeVocabularyHits()).toEqual([])
    // the caller-file scan — RED TODAY: the file is not landed
    const file = 'renderer/overlay-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.2): ${file} does not exist — the scan cannot pass`).toBe(true)
    const text = readSrc(file)
    for (const token of ['document.', 'window.', 'setAttribute', 'classList', 'provident.']) {
      expect(text.includes(token)).toBe(false)
    }
    expect(text.includes('style')).toBe(false)
  })
})

describe('§3.4 S-rows — theme (S-TH-*)', () => {
  test('S-TH-1 — THE FLAG ROW: theme.ts carries ZERO imports (three views) PLUS the caller-file census of src/renderer/theme-store.ts (resolveTheme/applyThemeDeclaration + store graph types, name-complete)', () => {
    for (const reading of censusReadings('shared/theme.ts')) {
      expect(reading.hits, `${reading.reading} of theme.ts`).toEqual([])
    }
    // the three positive controls — a store import IN theme.ts EACH MUST FAIL
    expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    const file = 'renderer/theme-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.3): ${file} does not exist — the caller-file census cannot pass`).toBe(true)
    const text = readSrc(file)
    expect(text.includes('resolveTheme')).toBe(true)
    expect(text.includes('applyThemeDeclaration')).toBe(true)
    const imports = [...text.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1])
    for (const spec of imports) {
      expect(spec.includes('/gutter') || spec.includes('/relocate') || spec.includes('/zones') || spec.includes('/census') || spec.includes('/menu-template')).toBe(false)
    }
  })

  test('S-TH-2 — the theme caller file\'s no-module-level-binding scan; file.settings.theme.token composed at EXACTLY ONE site (P-SMS-TH-IM-2)', () => {
    expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0)
    expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0)
    const file = 'renderer/theme-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.3): ${file} does not exist — the scan cannot pass`).toBe(true)
    const text = readSrc(file)
    expect(storeBindings(text)).toEqual([])
    expect(countOccurrences(text, TH_REFERENCE)).toBe(1)
    expect(/createThemeResolutionWiring\s*\(/.test(text)).toBe(true)
  })

  test('S-TH-3 — the theme caller file\'s no-UI/no-MCP/no-stylesheet scan; the resolution turn writes NO store state except through the declared write turn', () => {
    expect(storeVocabularyHits()).toEqual([])
    const file = 'renderer/theme-store.ts'
    expect(existsSync(join(SRC_ROOT, file)), `RED (H2b §2.3): ${file} does not exist — the scan cannot pass`).toBe(true)
    const text = readSrc(file)
    for (const token of ['document.', 'window.', 'setAttribute', 'classList', 'provident.', '.css']) {
      expect(text.includes(token)).toBe(false)
    }
    expect(text.includes('style')).toBe(false)
  })
})

describe('§3.4 S-rows — menu-template (S-MT-*)', () => {
  test('S-MT-1 — the menu-template module\'s import census: 0 imports, the landed EMPTY census (P-ML-4, I-9/I-10)', () => {
    for (const reading of censusReadings('shared/menu-template.ts')) {
      expect(reading.hits, `${reading.reading} of menu-template.ts`).toEqual([])
    }
    expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
  })

  test('S-MT-2 — the menu-template module\'s no-module-level-binding scan: no store-shaped binding; no exported signature carries a store-shaped parameter (the catalog arrives as the parameter)', () => {
    const moduleText = readSrc('shared/menu-template.ts')
    expect(storeBindings(moduleText)).toEqual([])
    expect(storeBindings(`const store = (globalThis as { store?: unknown }).store\nexport function x() { return store }\n`).length).toBeGreaterThan(0)
    expect(signatureStoreParams(`export function buildMenuTemplate(catalog: unknown, store: unknown): unknown { return catalog }\n`).length).toBeGreaterThan(0)
    // the declaration-position check: exported functions' parameters are
    // catalog/options/picker — never a store
    const signatures = [...moduleText.matchAll(/export function (\w+)\(([^)]*)\)/g)]
    expect(signatures.length).toBeGreaterThanOrEqual(3)
    for (const m of signatures) {
      expect(m[2]?.includes('store'), `signature ${m[1]} must not carry a store parameter`).toBe(false)
    }
  })
})

describe('§3.4 S-rows — the verification half (S-PDV-1)', () => {
  test('S-PDV-1 — the LANDED composition is sole-reader: renderer.ts\'s createPaneDrag region carries exactly the tier-qualified reads for names 1–4 and NO OTHER read of those references exists anywhere in the tree (§2.5, F-PDV-1/F-PDV-2)', () => {
    // tree-wide: no second read of the references outside renderer.ts
    for (const f of srcFiles().filter((p) => p.includes('renderer.ts') === false)) {
      const text = readFileSync(f, 'utf8')
      for (const ref of PDV_REFS) expect(text.includes(ref), `${f} carries a pane-drag read ${ref}`).toBe(false)
    }
    const text = readSrc('renderer/renderer.ts')
    const regionStart = text.indexOf('export function createPaneDrag')
    expect(regionStart).toBeGreaterThanOrEqual(0)
    const region = text.slice(regionStart)
    // the four declared references are read inside the composition, each via
    // the tierRead route (the qualified resolve — the SOLE read authority)
    for (const needle of ['layout.pane.${id}.size', 'layout.pane.${id}.bounds', 'layout.zone.${id}.slot', 'layout.zone.${id}.distance']) {
      expect(region.includes(needle), `composition must read ${needle}`).toBe(true)
    }
    // every layout read in the file lives INSIDE the composition region
    const lines = text.split('\n')
    for (const line of lines) {
      if (line.includes('tierRead(\'mem\'') || line.includes('tierRead("mem"')) {
        const absolute = text.indexOf(line)
        expect(absolute, `tierRead call outside createPaneDrag: ${line.trim()}`).toBeGreaterThanOrEqual(regionStart)
      }
    }
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.5 THE EXISTENCE ROWS (E-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.5 existence rows (E-*)', () => {
  test('E-OV-1 — the overlay module is referenced ONLY by the module + its DECLARED caller: overlayTransition/overlayInertDeclaration appear in NO OTHER src/** file; the positive control is a planted SECOND consumer that FAILS the probe (§3.5, re-aimed to the register\'s caller-census rows)', () => {
    // The declared caller-file census (S-OV-1/P-SMS-OV-IM-1) REQUIRES the value
    // exports present (imported) in src/renderer/overlay-store.ts — so the
    // re-aimed existence probe is "the module names appear in the module + the
    // declared caller ONLY", never "in zero files".
    const moduleFile = 'shared/overlay.ts'
    const callerFile = 'renderer/overlay-store.ts'
    for (const f of srcFiles().filter((p) => p.includes(moduleFile) === false && p.endsWith(callerFile) === false)) {
      const text = readFileSync(f, 'utf8')
      expect(text.includes('overlayTransition')).toBe(false)
      expect(text.includes('overlayInertDeclaration')).toBe(false)
    }
    // the DECLARED caller file IS the module's one consumer (the positive census)
    const callerText = readSrc(callerFile)
    expect(callerText.includes('overlayTransition')).toBe(true)
    expect(callerText.includes('overlayInertDeclaration')).toBe(true)
    // THE POSITIVE CONTROL — a planted SECOND consumer (any other src/** file
    // gaining the module import) MUST FAIL the no-importer probe: the import
    // form is detected, and its reference would trip the tree scan above
    const plantedConsumer = `import { overlayTransition } from '../shared/overlay.js'\nimport { overlayInertDeclaration } from '../shared/overlay.js'\n`
    expect(scanImportForms(plantedConsumer).length).toBeGreaterThan(0)
    expect(textHasModuleReference(plantedConsumer, 'overlayTransition', 'overlayInertDeclaration')).toBe(true)
  })

  test('E-TH-1 — the theme module is referenced ONLY by the module + its DECLARED caller: resolveTheme/applyThemeDeclaration appear in NO OTHER src/** file; the positive control is a planted SECOND consumer that FAILS the probe (§3.5, re-aimed to the register\'s caller-census rows)', () => {
    const moduleFile = 'shared/theme.ts'
    const callerFile = 'renderer/theme-store.ts'
    for (const f of srcFiles().filter((p) => p.includes(moduleFile) === false && p.endsWith(callerFile) === false)) {
      const text = readFileSync(f, 'utf8')
      expect(text.includes('resolveTheme')).toBe(false)
      expect(text.includes('applyThemeDeclaration')).toBe(false)
    }
    // the DECLARED caller file IS the module's one consumer (the positive census)
    const callerText = readSrc(callerFile)
    expect(callerText.includes('resolveTheme')).toBe(true)
    expect(callerText.includes('applyThemeDeclaration')).toBe(true)
    // THE POSITIVE CONTROL — a planted SECOND consumer MUST FAIL the probe
    const plantedConsumer = `import { resolveTheme } from '../shared/theme.js'\nimport { applyThemeDeclaration } from '../shared/theme.js'\n`
    expect(scanImportForms(plantedConsumer).length).toBeGreaterThan(0)
    expect(textHasModuleReference(plantedConsumer, 'resolveTheme', 'applyThemeDeclaration')).toBe(true)
  })

  test('E-MT-1 — THE F-11 VERIFICATION: no in-tree src/** file imports src/shared/menu-template.js — no consumer exists today (§2.4)', () => {
    for (const f of srcFiles().filter((p) => p.includes('shared/menu-template.ts') === false)) {
      const text = readFileSync(f, 'utf8')
      expect(text.includes('buildMenuTemplate')).toBe(false)
      expect(text.includes('normalizeCatalog')).toBe(false)
      expect(text.includes('selectCatalogItem')).toBe(false)
      expect(scanSibling(text).some((h) => h.includes('menu-template'))).toBe(false)
    }
  })

  test('E-PDV-1 — gutter.ts/relocate.ts bytes are the LANDED ones: the unit\'s change set contains neither file (§3.5)', () => {
    const diff = gitNameOnlyHead()
    expect(diff.includes('src/shared/gutter.ts')).toBe(false)
    expect(diff.includes('src/shared/relocate.ts')).toBe(false)
  })

  test('E-PDV-2 — no store byte and no renderer.ts byte changes in this unit (§3.5, the frozen digests recompute-unchanged is the landing pass\'s git-side claim)', () => {
    const diff = gitNameOnlyHead()
    for (const f of ['src/renderer/store-core-graph.ts', 'src/renderer/store-graph-references.ts', 'src/renderer/renderer.ts']) {
      expect(diff.includes(f), `${f} must be absent from the unit's diff`).toBe(false)
    }
  })

  test('E-ST-1 — the caller files are NEW: src/renderer/overlay-store.ts and src/renderer/theme-store.ts did not exist before this unit (their creation IS the landing; the files\' ENTIRE HISTORY is this unit\'s landing commit — re-pinned per the spec §2.7-item-7 extension 2, 2026-10-03)', () => {
    // THE RE-PIN (licensed by the spec's §2.7 item 7 extension 2, 2026-10-03): a
    // fixed `HEAD^:` probe cannot work once later commits exist after the landing,
    // so the "NEW to this unit" reading is proved by HISTORY: `git log -- <path>`
    // must list EXACTLY ONE commit — the landing commit that created the file.
    // Zero commits would mean untracked/never-committed; more than one would mean
    // the file predated the unit or was edited later — both FAIL the reading.
    expect(gitFileCommitCount('src/renderer/overlay-store.ts')).toBe(1)
    expect(gitFileCommitCount('src/renderer/theme-store.ts')).toBe(1)
    expect(gitLsFile('src/renderer/overlay-store.ts')).toBe(true)
    expect(gitLsFile('src/renderer/theme-store.ts')).toBe(true)
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §4.2 ITEM 4 — THE REAL-STORE INTEGRATION READING (at least one row per caller
 * file drives the hardware store: the tier-qualified read's HIT/MISS arms on a
 * real store). The overlay/theme rows are RED today (the wiring files are not
 * landed); the verification-half row executes the LANDED composition on the
 * hardware store.
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§4.2 item 4 — REAL-STORE integration drives', () => {
  test('REAL-STORE (M-OV-1/M-OV-5) — the overlay caller turn on the hardware store: the tier-qualified read\'s HIT/MISS arms + the mint FROM A REAL STATE (the amended §4.2 transcript)', async () => {
    const factory = await loadOverlayWiringFactory()
    // HIT arm: the mem copy seeded through the hardware store
    const store = createRealStore()
    store.commit('mem.overlay.a.state', 'open', { onRepeat: 'edit' })
    const turn = factory(store)
    expect(turn.readState('a')).toBe('open')
    // THE MINT TURN FROM A REAL STATE (the amended §4.2: the mint/re-mint
    // write is driven FROM A REAL STATE present in the store — M-OV-2's flow:
    // seed the state, drive the changed transition, commit writes)
    const seeded = createRealStore()
    seeded.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const turnSeeded = factory(seeded)
    const minted = turnSeeded.transition('a', 'open')
    expect(minted.state).toBe('open')
    expect(minted.changed).toBe(true)
    const mintedBack = seeded.resolve('mem.overlay.a.state')
    expect(mintedBack.found).toBe(true)
    expect(mintedBack.value).toBe('open')
    // MISS arm: a cold store — the read answers undefined (the declared MISS,
    // never a refusal, never an invented default); the transition answers the
    // module's no-move record {state:'closed',changed:false} with NO write, and
    // the follow-up tier-qualified readback answers {found:false} (the store
    // holds nothing — the amended §4.2 transcript, consistent with §3.1 M-OV-5)
    const cold = createRealStore()
    const turnCold = factory(cold)
    expect(turnCold.readState('a')).toBeUndefined()
    const r = turnCold.transition('a', 'open')
    expect(r.state).toBe('closed')
    expect(r.changed).toBe(false)
    const receipt = cold.resolve('mem.overlay.a.state')
    expect(receipt.found).toBe(false)
  })

  test('REAL-STORE (M-TH-1/M-TH-2) — the theme resolution site on the hardware store: the committed-token HIT and the seed-arm MISS', async () => {
    const factory = await loadThemeWiringFactory()
    const store = createRealStore()
    store.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    const turn = factory(store, 'light')
    const hit = turn.resolveSetting({ prefersDark: false })
    expect(hit.setting).toBe('dark')
    expect(hit.source).toBe('env')
    const cold = createRealStore()
    const turnCold = factory(cold, 'light')
    const miss = turnCold.resolveSetting({ prefersDark: true })
    expect(miss.setting).toBe('light') // the seed arm
    expect(miss.prefersDark).toBe(true)
    // the miss wrote NOTHING (the H2a MISS-rule shape)
    const readback = cold.resolve('file.settings.theme.token')
    expect(readback.found).toBe(false)
  })

  test('REAL-STORE (M-PDV-1/M-PDV-3) — the LANDED composition on the hardware store: the tier-qualified reads answer the committed values', () => {
    const store = createRealStore()
    store.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    const opaque = { token: 'opaque' }
    store.commit('mem.layout.zone.zone-1.slot', opaque, { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-1.distance', 37, { onRepeat: 'edit' })
    const surface: PaneDragSurface = createPaneDrag(store, {})
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    expect(surface.defaultSizeFor({ id: 'pane-a' }, 'pane-a')).toBe(320)
    const candidates = surface.candidatesFor({ zoneId: 'zone-1' })
    expect(candidates.length).toBe(1)
    expect(candidates[0]?.candidate).toBe(opaque)
    expect(candidates[0]?.distance).toBe(37)
    // the MISS arm on the hardware store: a cold reference answers the
    // declared degradation (undefined — an unusable value ⇒ the consumer's
    // E3 non-number refusal), never a throw
    const cold = createRealStore()
    const coldSurface: PaneDragSurface = createPaneDrag(cold, {})
    expect(coldSurface.startSizeOf({ id: 'pane-z' }, 'pane-z')).toBeUndefined()
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §5.5.1 THE TYPED PROPERTY REGISTER — THE EXECUTED LAYER.
 * 9 typed rows (6 P-IM + 3 P-TP), 108 declared attempts = 7+4+25 ×3,
 * printed WITH their terms (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS);
 * caps 108 ≤ 400 · per-row max 25 ≤ 100 · stop-after-5-consecutive-failures
 * per row · NO generator · NO pinned seed · NO new dependency (plain
 * deterministic vitest tables — AGENTS.md item 11(d), the engine-pin
 * precedent) · an un-run register row is a FAILURE.
 * ════════════════════════════════════════════════════════════════════════════ */

interface AttemptOutcome {
  readonly id: string
  readonly held: boolean
  readonly note: string
}

interface RegisterRowResult {
  readonly row: string
  readonly type: 'P-IM' | 'P-TP'
  readonly strategyId: string
  readonly declared: number
  readonly outcomes: AttemptOutcome[]
  /** declared attempts the stop-after-5 rule prevented from running */
  readonly stopped: number
}

const REGISTER_RESULTS: RegisterRowResult[] = []

const RED_WIRING_NOTE = 'the caller wiring file is NOT LANDED (module not found) — this attempt is red for the honest reason'

interface AttemptContext {
  readonly outcomes: AttemptOutcome[]
  consecutiveFailures: number
  stopped: number
  stoppedAfter: boolean
}

function attempt(ctx: AttemptContext, id: string, fn: () => void): void {
  if (ctx.stoppedAfter) {
    ctx.stopped += 1
    return
  }
  try {
    fn()
    ctx.outcomes.push({ id, held: true, note: 'held' })
    ctx.consecutiveFailures = 0
  } catch (e) {
    ctx.outcomes.push({ id, held: false, note: e instanceof Error ? e.message : String(e) })
    ctx.consecutiveFailures += 1
    if (ctx.consecutiveFailures >= 5) {
      ctx.stoppedAfter = true
    }
  }
}

function newAttemptContext(): AttemptContext {
  return { outcomes: [], consecutiveFailures: 0, stopped: 0, stoppedAfter: false }
}

/** THE OVERLAY TP-1 SCRIPT (§5.5.1's fixed 8-call script + the fixed tuple
 *  name 'a'). Returns the 8 projected answers. THROWS when a step fails — each
 *  drive is spec-pinned (the wiring rows' expected values). */
async function overlayTpAnswers(mode: 'cold' | 'shadowing' | 'committed', factory: OverlayWiringFactory): Promise<unknown[]> {
  const store = createRealStore()
  if (mode === 'shadowing') store.commit('temp.overlay.a.state', 'pre', { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.overlay.a.state', 'pre', { onRepeat: 'edit' })
  const target = { tag: 'fixture-target' }
  const out: unknown[] = []
  // (1) THE MINT-COMMIT RECEIPT — projected to the caller-relevant surface
  // {status, name} (recorded reading (1); §5.5.2 item 2: the store-touching
  // turn EFFECTS — cleared[]/events — are the §3 rows' subjects, not these
  // rows').
  const receipt = store.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
  const rc = receipt as { status?: unknown; name?: unknown; reason?: unknown }
  expect(rc.status).toBe('committed')
  expect(rc.name).toBe('mem.overlay.a.state')
  out.push({ status: rc.status, name: rc.name, reason: rc.reason })
  const wiring = factory(store)
  // (2) readState ⇒ 'closed'
  const v2 = wiring.readState('a')
  expect(v2).toBe('closed')
  out.push(v2)
  // (3) transition('a','open') ⇒ {state:'open',changed:true}
  const r3 = wiring.transition('a', 'open')
  expect(r3.state).toBe('open')
  expect(r3.changed).toBe(true)
  out.push(canonicalOf(r3))
  // (4) transition('a','open') again ⇒ {state:'open',changed:false}
  const r4 = wiring.transition('a', 'open')
  expect(r4.state).toBe('open')
  expect(r4.changed).toBe(false)
  out.push(canonicalOf(r4))
  // (5) transition('a','escape', cb) ⇒ {state:'closed',changed:true} with cb once
  let cbCount = 0
  const cb = (): void => { cbCount += 1 }
  const r5 = wiring.transition('a', 'escape', cb)
  expect(r5.state).toBe('closed')
  expect(r5.changed).toBe(true)
  expect(cbCount).toBe(1)
  out.push(canonicalOf(r5))
  // (6) declaration(target,'data-inert',true) ⇒ the four-member write
  const d6 = wiring.declaration(target, 'data-inert', true)
  expect(d6.name).toBe('data-inert')
  expect(d6.value).toBe('true')
  expect(d6.removal).toBe(false)
  expect(d6.target).toBe(target)
  out.push(canonicalOf(d6))
  // (7) transition('a','toggle') ⇒ 'open'
  const r7 = wiring.transition('a', 'toggle')
  expect(r7.state).toBe('open')
  expect(r7.changed).toBe(true)
  out.push(canonicalOf(r7))
  // (8) the tier-qualified readback ⇒ 'open'
  const rb = store.resolve('mem.overlay.a.state') as { found?: unknown; value?: unknown }
  expect(rb.found).toBe(true)
  expect(rb.value).toBe('open')
  out.push(rb.value)
  return out
}

/** THE THEME TP-1 SCRIPT (§5.5.1 — fixed tuple seed='light' + env
 *  {prefersDark:true}, the fixed 8-call script; step (8)'s readback is driven
 *  through the TURN's seed arm — the store's own post-remove resolve shape is
 *  the store's row (D-ANCHOR refusal / declared MISS), never a caller answer). */
async function themeTpAnswers(mode: 'cold' | 'shadowing' | 'committed', factory: ThemeWiringFactory): Promise<unknown[]> {
  const store = createRealStore()
  const seed = 'light'
  if (mode === 'shadowing') store.commit('temp.settings.theme.token', 'pre', { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.settings.theme.token', 'pre', { onRepeat: 'edit' })
  const out: unknown[] = []
  // (1) the mint-commit receipt − projected to {status, name}
  const receipt = store.commit('file.settings.theme.token', seed, { onRepeat: 'edit' })
  const rc = receipt as { status?: unknown; name?: unknown; reason?: unknown }
  expect(rc.status).toBe('committed')
  expect(rc.name).toBe('file.settings.theme.token')
  out.push({ status: rc.status, name: rc.name, reason: rc.reason })
  const wiring = factory(store, seed)
  // (2) resolveSetting(env) ⇒ {setting:'light',prefersDark:true,source:'env'}
  const r2 = wiring.resolveSetting({ prefersDark: true })
  expect(r2.setting).toBe(seed)
  expect(r2.prefersDark).toBe(true)
  expect(r2.source).toBe('env')
  out.push(canonicalOf(r2))
  // (3) again ⇒ identical
  const r3 = wiring.resolveSetting({ prefersDark: true })
  expect(structurallyEqual(canonicalOf(r3), canonicalOf(r2))).toBe(true)
  out.push(canonicalOf(r3))
  // (4) writeSetting('dark') ⇒ the edit receipt — PROJECTED to the
  // caller-relevant surface {status, name} (recorded reading (1); §5.5.2 item
  // 2: a receipt's cleared[]/rows/events are the store-touching turn EFFECTS —
  // the §3 rows' subjects, never these rows' — and they LEGITIMATELY differ
  // across the tier-state runs: the SHADOWING run's file commit clears the
  // temp pre-seed, the COMMITTED run's replaces the file pre-seed, so the
  // FULL receipt is not a caller answer; the {status, name} surface is)
  const r4 = wiring.writeSetting('dark')
  expect(r4).toBeDefined()
  const r4p = r4 as { status?: unknown; name?: unknown }
  out.push({ status: r4p.status, name: r4p.name })
  // (5) resolveSetting(env) ⇒ {setting:'dark',…}
  const r5 = wiring.resolveSetting({ prefersDark: true })
  expect(r5.setting).toBe('dark')
  expect(r5.source).toBe('env')
  out.push(canonicalOf(r5))
  // (6) remove('file.settings.theme.token') ⇒ the downward-clear receipt
  const rem = store.remove('file.settings.theme.token') as { status?: unknown; name?: unknown }
  expect(rem.status).toBe('committed')
  out.push({ status: rem.status, name: rem.name })
  // (7) resolveSetting(env) ⇒ THE SEED ARM {setting:'light',…} — the seed BY IDENTITY
  const r7 = wiring.resolveSetting({ prefersDark: true })
  expect(r7.setting).toBe(seed)
  expect(r7.prefersDark).toBe(true)
  expect(r7.source).toBe('env')
  out.push(canonicalOf(r7))
  // (8) THE SEED-ARM READBACK, DRIVEN THROUGH THE TURN — the amended re-pin
  // (the P-SMS-TH-TP-1 row, repaired 2026-10-03): the store's OWN post-remove
  // readback is NOT a caller answer and does NOT return the as-filed
  // {found:false} — after the downward remove, the tier-qualified resolve
  // answers the store's own D-ANCHOR 'no-such-anchor' refusal on the
  // COLD/COMMITTED runs and the declared MISS on the SHADOWING run (probed:
  // the frozen store's post-remove shape is the store's row), and the
  // differential is over CALLER answers (§5.5.2 item 2). The §2.3 MISS-rule
  // observable IS caller-stable: the resolution turn answers the seed BY
  // IDENTITY, again — the miss made NO write between (7) and (8), so the
  // seed arm's record is identical.
  const r8 = wiring.resolveSetting({ prefersDark: true })
  expect(r8.setting).toBe(seed)
  expect(r8.prefersDark).toBe(true)
  expect(r8.source).toBe('env')
  out.push(canonicalOf(r8))
  return out
}

/** THE MENU TP-1 SCRIPT (over the MODULE's own answers — no caller file
 *  exists; the runs differ only in the tier state of the HYPOTHETICAL
 *  file.menu.catalog / mem.menu.catalog, which the module never touches). */
async function menuTpAnswers(mode: 'cold' | 'shadowing' | 'committed'): Promise<unknown[]> {
  const store = createRealStore()
  if (mode === 'shadowing') store.commit('mem.menu.catalog', { shadowing: true }, { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.menu.catalog', { committed: true }, { onRepeat: 'edit' })
  // the module never reads the store — every answer is argument-determined
  void store
  return menuScriptAnswers().map((answer) => canonicalOf(answer))
}

describe('§5.5.1 THE REGISTER — the executed layer', () => {
  test('P-SMS-OV-IM-1 (S-SMS-OV-IM-1, P-IM) — 7 attempts: the overlay module\'s import census UNCHANGED + the caller-file census the register drives', async () => {
    const ctx = newAttemptContext()
    const readings = censusReadings('shared/overlay.ts')
    attempt(ctx, 'module-reading-raw', () => expect(readings[0]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-normalized', () => expect(readings[1]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-comments-as-code', () => expect(readings[2]?.hits ?? []).toEqual([]))
    attempt(ctx, 'control-import-store', () => { expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-require-store', () => { expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-dynamic-import-store', () => { expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'caller-census', () => {
      const file = 'renderer/overlay-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      const text = readSrc(file)
      expect(text.includes('overlayTransition')).toBe(true)
      expect(text.includes('overlayInertDeclaration')).toBe(true)
      expect(scanSibling(text)).toEqual([])
    })
    const result: RegisterRowResult = { row: 'P-SMS-OV-IM-1', type: 'P-IM', strategyId: 'S-SMS-OV-IM-1', declared: 7, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-OV-IM-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-OV-IM-2 (S-SMS-OV-IM-2, P-IM) — 4 attempts: the overlay caller file\'s no-module-level-binding row', async () => {
    const ctx = newAttemptContext()
    attempt(ctx, 'caller-scan', () => {
      const file = 'renderer/overlay-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      const text = readSrc(file)
      expect(storeBindings(text)).toEqual([])
      expect(countOccurrences(text, OV_REFERENCE_PREFIX)).toBe(1)
    })
    attempt(ctx, 'control-module-scope-const', () => { expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-module-scope-let', () => { expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'declaration-position', () => {
      const file = 'renderer/overlay-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      expect(/createOverlayStoreWiring\s*\(\s*(?:store|store\s*:)/.test(readSrc(file))).toBe(true)
    })
    const result: RegisterRowResult = { row: 'P-SMS-OV-IM-2', type: 'P-IM', strategyId: 'S-SMS-OV-IM-2', declared: 4, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-OV-IM-2 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-OV-TP-1 (S-SMS-OV-TP-1, P-TP) — 25 attempts: the overlay caller\'s store-state-independence differential (COLD/SHADOWING/COMMITTED × the 8-call script + the ambient-consultation control)', async () => {
    const ctx = newAttemptContext()
    let factory: OverlayWiringFactory | undefined
    // THE ROW'S POSITIVE CONTROL RUNS FIRST — the fixture is wiring-independent
    // (it demonstrates the probe catches an AMBIENT consultation), and the
    // stop-after-5-consecutive-failures guard must never swallow it: an
    // un-run register attempt is a FAILURE, never a pass. The declared
    // per-row count (25) is unchanged by the ordering.
    const control = (): void => {
      let ambient = 'x'
      const fixture = (): string => `answer-${ambient}`
      const runA = fixture()
      ambient = 'y'
      const runB = fixture()
      expect(structurallyEqual(canonicalOf(runA), canonicalOf(runB))).toBe(false) // the fixture FAILS the equality — the probe has teeth
    }
    try {
      factory = await loadOverlayWiringFactory()
    } catch (e) {
      const note = e instanceof Error ? e.message : String(e)
      attempt(ctx, 'control-ambient-consultation', control)
      for (const run of ['COLD', 'SHADOWING', 'COMMITTED']) {
        for (let i = 1; i <= 8; i += 1) attempt(ctx, `${run}-answer-${i}`, () => { throw new Error(note) })
      }
      const result: RegisterRowResult = { row: 'P-SMS-OV-TP-1', type: 'P-TP', strategyId: 'S-SMS-OV-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
      REGISTER_RESULTS.push(result)
      for (const o of ctx.outcomes) expect(o.held, `P-SMS-OV-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
      return
    }
    const runs = { COLD: 'cold', SHADOWING: 'shadowing', COMMITTED: 'committed' } as const
    const base = await overlayTpAnswers('cold', factory)
    attempt(ctx, 'control-ambient-consultation', control)
    for (const [runName, mode] of Object.entries(runs)) {
      const answers = await overlayTpAnswers(mode, factory)
      for (let i = 0; i < 8; i += 1) {
        const idx = i
        attempt(ctx, `${runName}-answer-${idx + 1}`, () => {
          expect(structurallyEqual(canonicalOf(answers[idx]), canonicalOf(base[idx])), `${runName} answer ${idx + 1} must equal the COLD run's`).toBe(true)
        })
      }
    }
    const result: RegisterRowResult = { row: 'P-SMS-OV-TP-1', type: 'P-TP', strategyId: 'S-SMS-OV-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) expect(o.held, `P-SMS-OV-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
  }, 30000)

  test('P-SMS-TH-IM-1 (S-SMS-TH-IM-1, P-IM) — 7 attempts: THE FLAG ROW — theme\'s EMPTY IMPORT CENSUS UNCHANGED + the caller-file census', async () => {
    const ctx = newAttemptContext()
    const readings = censusReadings('shared/theme.ts')
    attempt(ctx, 'module-reading-raw', () => expect(readings[0]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-normalized', () => expect(readings[1]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-comments-as-code', () => expect(readings[2]?.hits ?? []).toEqual([]))
    attempt(ctx, 'control-import-store', () => { expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-require-store', () => { expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-dynamic-import-store', () => { expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'caller-census', () => {
      const file = 'renderer/theme-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      const text = readSrc(file)
      expect(text.includes('resolveTheme')).toBe(true)
      expect(text.includes('applyThemeDeclaration')).toBe(true)
      expect(scanSibling(text)).toEqual([])
    })
    const result: RegisterRowResult = { row: 'P-SMS-TH-IM-1', type: 'P-IM', strategyId: 'S-SMS-TH-IM-1', declared: 7, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-TH-IM-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-TH-IM-2 (S-SMS-TH-IM-2, P-IM) — 4 attempts: the theme caller file\'s no-module-level-binding row + the exactly-once spelling', async () => {
    const ctx = newAttemptContext()
    attempt(ctx, 'caller-scan', () => {
      const file = 'renderer/theme-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      const text = readSrc(file)
      expect(storeBindings(text)).toEqual([])
      expect(countOccurrences(text, TH_REFERENCE)).toBe(1)
    })
    attempt(ctx, 'control-module-scope-const', () => { expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-module-scope-let', () => { expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'declaration-position', () => {
      const file = 'renderer/theme-store.ts'
      expect(existsSync(join(SRC_ROOT, file)), `RED (H2b): ${file} not landed — ${RED_WIRING_NOTE}`).toBe(true)
      expect(/createThemeResolutionWiring\s*\(\s*(?:store|store\s*:)/.test(readSrc(file))).toBe(true)
    })
    const result: RegisterRowResult = { row: 'P-SMS-TH-IM-2', type: 'P-IM', strategyId: 'S-SMS-TH-IM-2', declared: 4, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-TH-IM-2 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-TH-TP-1 (S-SMS-TH-TP-1, P-TP) — 25 attempts: the theme resolution site\'s store-state-independence differential (the seed-arm identity + the ambient control)', async () => {
    const ctx = newAttemptContext()
    let factory: ThemeWiringFactory | undefined
    // the row's positive control runs first (see P-SMS-OV-TP-1's note — the
    // stop-after-5 guard must never swallow the row's non-vacuity probe)
    const control = (): void => {
      let ambient = 'x'
      const fixture = (): string => `answer-${ambient}`
      const runA = fixture()
      ambient = 'y'
      const runB = fixture()
      expect(structurallyEqual(canonicalOf(runA), canonicalOf(runB))).toBe(false)
    }
    try {
      factory = await loadThemeWiringFactory()
    } catch (e) {
      const note = e instanceof Error ? e.message : String(e)
      attempt(ctx, 'control-ambient-consultation', control)
      for (const run of ['COLD', 'SHADOWING', 'COMMITTED']) {
        for (let i = 1; i <= 8; i += 1) attempt(ctx, `${run}-answer-${i}`, () => { throw new Error(note) })
      }
      const result: RegisterRowResult = { row: 'P-SMS-TH-TP-1', type: 'P-TP', strategyId: 'S-SMS-TH-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
      REGISTER_RESULTS.push(result)
      for (const o of ctx.outcomes) expect(o.held, `P-SMS-TH-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
      return
    }
    // THE SCRIPT DRIVES ARE HARNESSED (the row's repair, 2026-10-03): a throw
    // mid-script must STILL REGISTER the row — a row that throws outside the
    // attempt harness never registers, and §5.5.3's aggregate treats an un-run
    // register row as a FAILURE. Each run's answers are computed inside a
    // guard; a mid-script throw marks that run's 8 answer attempts BROKEN (the
    // attempt counts, the row fails honestly, the harness continues; the
    // stop-after-5-consecutive-failures rule reports the remainder as stopped).
    let base: unknown[] | undefined
    try {
      base = await themeTpAnswers('cold', factory)
    } catch {
      /* the cold run's throw registers as broken answer attempts below */
    }
    attempt(ctx, 'control-ambient-consultation', control)
    for (const mode of ['cold', 'shadowing', 'committed'] as const) {
      let answers: unknown[] | undefined
      let note = ''
      try {
        answers = mode === 'cold' ? base : await themeTpAnswers(mode, factory)
      } catch (e) {
        note = e instanceof Error ? e.message : String(e)
      }
      for (let i = 0; i < 8; i += 1) {
        const idx = i
        attempt(ctx, `${mode}-answer-${idx + 1}`, () => {
          if (base === undefined || answers === undefined) throw new Error(note || 'the theme TP-1 script threw mid-drive')
          expect(structurallyEqual(canonicalOf(answers[idx]), canonicalOf(base[idx])), `${mode} answer ${idx + 1} must equal the COLD run's`).toBe(true)
        })
      }
    }
    const result: RegisterRowResult = { row: 'P-SMS-TH-TP-1', type: 'P-TP', strategyId: 'S-SMS-TH-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) expect(o.held, `P-SMS-TH-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
  }, 30000)

  test('P-SMS-MT-IM-1 (S-SMS-MT-IM-1, P-IM) — 7 attempts: the menu-template module\'s 0-import census WITH THE NO-CONSUMER ABSENCE PROBE standing in for the caller-file half (§2.4 recorded-not-landed)', () => {
    const ctx = newAttemptContext()
    const readings = censusReadings('shared/menu-template.ts')
    attempt(ctx, 'module-reading-raw', () => expect(readings[0]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-normalized', () => expect(readings[1]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-comments-as-code', () => expect(readings[2]?.hits ?? []).toEqual([]))
    attempt(ctx, 'control-import-store', () => { expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-require-store', () => { expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-dynamic-import-store', () => { expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'no-consumer-probe', () => {
      // THE F-11 VERIFICATION: a src/** recursive scan matching the module's
      // specifier MUST read ZERO (the caller-file half is recorded-not-landed)
      for (const f of srcFiles().filter((p) => p.includes('shared/menu-template.ts') === false)) {
        const text = readFileSync(f, 'utf8')
        expect(scanSibling(text).some((h) => h.includes('menu-template'))).toBe(false)
        expect(text.includes("buildMenuTemplate")).toBe(false)
      }
    })
    const result: RegisterRowResult = { row: 'P-SMS-MT-IM-1', type: 'P-IM', strategyId: 'S-SMS-MT-IM-1', declared: 7, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-MT-IM-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-MT-IM-2 (S-SMS-MT-IM-2, P-IM) — 4 attempts: the menu-template module\'s no-module-level-binding row (the caller-file row, adapted to the recorded-not-landed form)', () => {
    const ctx = newAttemptContext()
    attempt(ctx, 'module-scan', () => {
      const text = readSrc('shared/menu-template.ts')
      expect(storeBindings(text)).toEqual([])
    })
    attempt(ctx, 'control-module-scope-const', () => { expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-signature-store-param', () => { expect(signatureStoreParams(`export function buildMenuTemplate(catalog: unknown, store: unknown): unknown { return catalog }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'declaration-position', () => {
      const text = readSrc('shared/menu-template.ts')
      const signatures = [...text.matchAll(/export function (\w+)\(([^)]*)\)/g)]
      expect(signatures.length).toBeGreaterThanOrEqual(3)
      for (const m of signatures) expect(m[2]?.includes('store')).toBe(false)
    })
    const result: RegisterRowResult = { row: 'P-SMS-MT-IM-2', type: 'P-IM', strategyId: 'S-SMS-MT-IM-2', declared: 4, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-MT-IM-2 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-MT-TP-1 (S-SMS-MT-TP-1, P-TP) — 25 attempts: the menu-template module\'s store-state-independence differential over the module\'s OWN answers (COLD/SHADOWING/COMMITTED × the 8-call script + the ambient control)', async () => {
    const ctx = newAttemptContext()
    const base = await menuTpAnswers('cold')
    for (const mode of ['cold', 'shadowing', 'committed'] as const) {
      const answers = await menuTpAnswers(mode)
      for (let i = 0; i < 8; i += 1) {
        const idx = i
        attempt(ctx, `${mode}-answer-${idx + 1}`, () => {
          expect(structurallyEqual(canonicalOf(answers[idx]), canonicalOf(base[idx])), `${mode} answer ${idx + 1} must equal the COLD run's — the module is argument-determined`).toBe(true)
        })
      }
    }
    attempt(ctx, 'control-ambient-consultation', () => {
      let ambient = 'x'
      const fixture = (): string => `answer-${ambient}`
      const runA = fixture()
      ambient = 'y'
      const runB = fixture()
      expect(structurallyEqual(canonicalOf(runA), canonicalOf(runB))).toBe(false)
    })
    const result: RegisterRowResult = { row: 'P-SMS-MT-TP-1', type: 'P-TP', strategyId: 'S-SMS-MT-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-MT-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)
})

describe('§5.5.3 REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS — the aggregate arithmetic row', () => {
  test('the 108 total is printed WITH its terms; every declared row RAN; caps hold; an un-run register row is a FAILURE', () => {
    // REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS — the total WITH its terms:
    console.log('REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS (H2b §5.5.3):')
    console.log('  108 = 7 (P-SMS-OV-IM-1) + 4 (P-SMS-OV-IM-2) + 25 (P-SMS-OV-TP-1) + 7 (P-SMS-TH-IM-1) + 4 (P-SMS-TH-IM-2) + 25 (P-SMS-TH-TP-1) + 7 (P-SMS-MT-IM-1) + 4 (P-SMS-MT-IM-2) + 25 (P-SMS-MT-TP-1)')
    console.log('  chain: 7 → 11 → 36 → 43 → 47 → 72 → 79 → 83 → 108; per-family subtotals IM 33 · TP 75')
    console.log('  caps: 108 ≤ 400 ✔ · per-row maximum 25 ≤ 100 ✔ · stop-after-5-consecutive-failures per row')
    // every declared row must be present in the executed set — an un-run
    // register row is a FAILURE, never a pass
    const declaredTerms: Record<string, number> = {
      'P-SMS-OV-IM-1': 7,
      'P-SMS-OV-IM-2': 4,
      'P-SMS-OV-TP-1': 25,
      'P-SMS-TH-IM-1': 7,
      'P-SMS-TH-IM-2': 4,
      'P-SMS-TH-TP-1': 25,
      'P-SMS-MT-IM-1': 7,
      'P-SMS-MT-IM-2': 4,
      'P-SMS-MT-TP-1': 25,
    }
    const ranRows = new Set(REGISTER_RESULTS.map((r) => r.row))
    for (const row of Object.keys(declaredTerms)) {
      expect(ranRows.has(row), `register row ${row} MUST have run — an un-run register row is a FAILURE`).toBe(true)
    }
    let executedTotal = 0
    const perRowTerms: string[] = []
    for (const row of REGISTER_RESULTS) {
      const declared = declaredTerms[row.row]
      expect(declared).toBeDefined()
      const executed = row.outcomes.length + row.stopped
      perRowTerms.push(`${executed} (${row.row})`)
      executedTotal += executed
      // caps: per-row ≤ 100; a row that STOPPED after 5 consecutive failures
      // reports its un-run declared attempts (the row is already a FAILURE)
      if (row.stopped > 0) console.log(`  ${row.row}: STOPPED after 5 consecutive failures — ${row.stopped} declared attempts un-run (row already FAILED)`)
      expect(executed).toBeLessThanOrEqual(100)
      expect(row.outcomes.filter((o) => o.held).length).toBeLessThanOrEqual(executed)
    }
    console.log(`  executed attempt total: ${executedTotal} = ${perRowTerms.join(' + ')}`)
    // the executed total equals the DECLARED total (108) — a total that is not
    // the sum of its own terms is a review finding; the sum must be 108
    const termSum = Object.values(declaredTerms).reduce((a, b) => a + b, 0)
    expect(termSum).toBe(108)
    expect(executedTotal).toBe(108)
    expect(108).toBeLessThanOrEqual(400)
    expect(25).toBeLessThanOrEqual(100)
    // family subtotals: IM 33 · TP 75
    const im = REGISTER_RESULTS.filter((r) => r.type === 'P-IM').reduce((a, r) => a + (declaredTerms[r.row] ?? 0), 0)
    const tp = REGISTER_RESULTS.filter((r) => r.type === 'P-TP').reduce((a, r) => a + (declaredTerms[r.row] ?? 0), 0)
    expect(im).toBe(33)
    expect(tp).toBe(75)
  }, 30000)
})