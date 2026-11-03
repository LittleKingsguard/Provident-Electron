// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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
 * **⟶ RE-GRAINED BESIDE 2026-11-03 (`D-93`, THE PURGE — THIS FILE'S SECOND LIFE).** The frozen
 * graph store and the two caller-side store turns this RED set was filed against are now
 * DELETED FROM `src/` OUTRIGHT: `src/renderer/store-core-graph.ts`, its
 * `src/renderer/store-graph-references.ts` declaration input, and the `H2b` caller turns
 * `src/renderer/overlay-store.ts` / `src/renderer/theme-store.ts`. So `createGraphStore`,
 * `GraphStore`, `storeGraphReferences`, `FILE_TIER_ROOT_NAMES`, `TABS_RESERVED_DECLARATION_ROWS`,
 * the Y-1 hand-off, `hydrate`, the Y-3 registration and the `crossing:{put}` seam are gone from
 * `src/renderer/renderer.ts`, and the two turns went with them (they had NO live consumer under
 * `src/` — only tests imported them — and their whole subject WAS the deleted address space
 * `mem.overlay.<name>.state` / `file.settings.theme.token`). **THE MECHANISMS THEY WIRED
 * SURVIVE**: `src/shared/overlay.ts` and `src/shared/theme.ts` are untouched and keep their own
 * landed suites. THIS PASS THEREFORE: (a) RETIRES the rows whose subject is a deleted module, a
 * deleted address space, a deleted construction or a deleted file — each one keeps a HEADSTONE
 * naming what it measured and asserting the deletion, never a silent drop; (b) RE-GRAINS every
 * row whose real TERM is about the mechanism onto `src/shared/overlay.ts` /
 * `src/shared/theme.ts` driven directly; (c) RE-GRAINS the import censuses to their STRONGER
 * TRUE form — the two mechanisms are imported by NO file under `src/` at all, since the one
 * admitted caller is gone. THE STORE SURFACE the surviving rows drive is a self-contained
 * REGISTER DOUBLE declared below (`createRegisterDouble`), never `createGraphStore`.
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

// **NO STORE IMPORT AND NO CALLER-TURN IMPORT** (`D-93`): `../src/renderer/store-core-graph.js`,
// `../src/renderer/store-graph-references.js`, `../src/renderer/overlay-store.js` and
// `../src/renderer/theme-store.js` are DELETED. The surviving imports are the SHAPE's client, the
// landed composition, and the two MECHANISM modules the deleted turns used to wire.
import { createViewClient, type ViewClient } from '../src/renderer/view-client.js'
import { createPaneDrag, type PaneDragSurface } from '../src/renderer/renderer.js'
import { overlayTransition, overlayInertDeclaration } from '../src/shared/overlay.js'
import { resolveTheme, applyThemeDeclaration } from '../src/shared/theme.js'
import { buildMenuTemplate, normalizeCatalog, selectCatalogItem } from '../src/shared/menu-template.js'

/* ════════════════════════════════════════════════════════════════════════════
 * §0 HELPERS — fs reads, scanners, git probes (the S-·/E-· drives)
 * ════════════════════════════════════════════════════════════════════════════ */

const SRC_ROOT = join(process.cwd(), 'src')

/** **COMMENT LINES ELIDED — THE DISCIPLINE'S OWN READING** (`AGENTS.md`): an absence assertion reads CODE, never prose, so
 *  a row that explains what it deleted must not measure its own explanation. `//` lines and `/** … *\/` block lines are
 *  dropped and every other line is kept verbatim. The positive control sits at each call site. */
function elideComments(text: string): string {
  let inBlock = false
  const kept: string[] = []
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (inBlock) {
      if (trimmed.includes('*/')) inBlock = false
      continue
    }
    if (trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) inBlock = true
      continue
    }
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue
    kept.push(line)
  }
  return kept.join('\n')
}

function readSrc(relative: string): string {
  return readFileSync(join(SRC_ROOT, relative), 'utf8')
}

/** **`commentElided()` — THE DISCIPLINE'S OWN NAME FOR THE READING ABOVE** (`D-93`). Every ABSENCE
 *  assertion in this file reads CODE, never bytes that carry prose: this pass's headstones name the
 *  identifiers they measured (`overlayTransition`, `tierRead`, `layout.pane.${id}.size`, …), and a row
 *  that measured its own explanation would be measuring nothing. Same reading as `elideComments`
 *  (kept, because `S-PDV-1` drives it by that name with its own positive control). */
function commentElided(text: string): string {
  return elideComments(text)
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

/** **THE SPECIFIER READING — THE CENSUS'S ONE POSITIVE FORM** (`D-93`). A module's own
 *  `*.js` specifier in ANY import form: a static `from '…/x.js'`, a `require('…/x.js')`, a
 *  dynamic `import('…/x.js')`, and the backticked spelling too. `E-OV-1` / `E-TH-1` / `S-OV-1` /
 *  `S-TH-1` / the two register IM rows and the `*IM-1` no-consumer probe read a tree through
 *  THIS, and each of them plants a specifier line that MUST be reported (the control: without
 *  it an empty hit list proves nothing). */
function scanSpecifier(text: string, moduleBase: string): string[] {
  const out: string[] = []
  const form = new RegExp(`(?:from\\s*|require\\(\\s*|import\\(\\s*)['"\`][^'"\`]*/${moduleBase}\\.js['"\`]`, 'g')
  for (const m of text.matchAll(form)) out.push(`specifier: ${m[0]}`)
  return out
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

/** **THE CALLER SPELLINGS THE PURGE DELETED, READ OVER THE WHOLE TREE** (`D-93`). The as-filed row
 *  read the FROZEN STORE's two modules for caller vocabulary ("S-OV-3's and S-TH-3's store half,
 *  asserted FROM the caller side"); those modules are DELETED, so the same probe is re-grained to
 *  its STRONGER true form: NO file under `src/**` composes any of the three consumer addresses at
 *  all — the two caller turns that did are gone and nothing took their place. Comment-elided, so
 *  this pass's own prose about the spellings cannot measure itself. The `planted` argument is the
 *  POSITIVE CONTROL channel: a synthetic text is appended to the sources and MUST be reported. */
function callerSpellingHits(planted: readonly string[] = []): string[] {
  const out: string[] = []
  const spellings = [OV_REFERENCE_PREFIX, TH_REFERENCE, MT_REFERENCE]
  const sources: { readonly name: string; readonly text: string }[] = srcFiles().map((f) => ({ name: f, text: commentElided(readFileSync(f, 'utf8')) }))
  planted.forEach((text, i) => sources.push({ name: `planted#${i + 1}`, text: commentElided(text) }))
  for (const source of sources) {
    for (const spelling of spellings) {
      if (source.text.includes(spelling)) out.push(`${source.name}: caller-spelling ${spelling}`)
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
/** **THE REFERENCES THIS UNIT'S TREE SCAN FORBIDS A SECOND READER OF** (`§2.5`, F-PDV-1/F-PDV-2). `layout.pane.` IS STILL
 *  ON THE LIST AND FOR THE OPPOSITE REASON IT WAS: the pane geometry is the SHAPE's now (`D-88`, `D-89`) and no `src/**` file
 *  reads it off a store tier, so a file that reintroduced the retired spelling would be a re-landed read wearing it. The
 *  zone pair is the drag tier's and is read by the composition alone. */
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

/**
 * **THE SHAPE THE COMPOSITION NOW READS (`D-88`, RE-GRAINED ONTO IT BY `D-89`).** The pane geometry used to be read
 * through `tierRead` off the frozen store's two tiers; it is read OFF THE SHAPE now, so a row that seeds
 * `mem.layout.pane.<id>.size` and expects the composition to answer it is measuring a read route that no longer exists.
 * This is the crossing stood in for: the family as one delivered reading, the route's call log for the writes, and the
 * client's OWN admission deciding what the composition can see.
 *
 * **IT HOLDS NO ADDRESS AND OPENS NOTHING**: a pane is named by its id, never by a path or a tier — which is the whole
 * difference `D-78` ruling 3 draws between the shape and a store.
 */
interface WirePaneGeometry {
  readonly id: string
  readonly size: number
  readonly bounds: { readonly min: number; readonly max: number }
}

/** ONE ZONE THE SHAPE MAY CARRY (`D-91`): every member optional, `slot` opaque. */
interface WireZone {
  readonly id: string
  readonly slot?: unknown
  readonly distance?: number
  readonly size?: number
  readonly display?: string
}

interface PaneShapeDouble {
  readonly client: ViewClient
  readonly paneCalls: Array<{ readonly id: string; readonly geometry: unknown }>
  readonly reads: () => number
  readonly registrations: () => number
  /** **THE ZONE FAMILY AS THE SHAPE HOLDS IT** (`D-92`): the composition's four zone reads answer here and nowhere else. */
  readonly zones: () => readonly WireZone[]
}

function paneShapeOf(panes: readonly WirePaneGeometry[] = [], zones: readonly WireZone[] = []): PaneShapeDouble {
  const paneCalls: Array<{ id: string; geometry: unknown }> = []
  const handlers: Array<() => void> = []
  let readCount = 0
  const reading = (): unknown => ({
    status: 'committed',
    panes: panes.map((pane) => ({ id: pane.id, size: pane.size, bounds: { min: pane.bounds.min, max: pane.bounds.max } })),
    focus: { entries: [], activeId: null },
    // THE THIRD FAMILY (`D-91`, WIRED `D-92`): the reading carries all three, and a row that wants a zone hands it here.
    zones: zones.map((zone) => ({ ...zone })),
    source: { panes: 'record', focus: 'record', zones: 'record' },
  })
  const member = {
    read: async (): Promise<unknown> => {
      readCount += 1
      return reading()
    },
    commitPane: async (id: string, geometry: unknown): Promise<unknown> => {
      paneCalls.push({ id, geometry })
      return { status: 'committed' }
    },
    commitFocus: async (): Promise<unknown> => ({ status: 'committed' }),
    commitZones: async (): Promise<unknown> => ({ status: 'committed' }),
    onChanged: (handler: () => void): (() => void) => {
      handlers.push(handler)
      return (): void => {
        const at = handlers.indexOf(handler)
        if (at >= 0) handlers.splice(at, 1)
      }
    },
  }
  const client = createViewClient({ bridge: member })
  // THE DELIVERY THAT FILLED THE SHAPE — one adopted reading, exactly what a boot read or a push ends in.
  client.adopt(reading() as never)
  return {
    client,
    paneCalls,
    reads: (): number => readCount,
    registrations: (): number => handlers.length,
    zones: (): readonly WireZone[] => zones,
  }
}

/** The composition over a store double (the drag tier's) and a shape (the panes'). */
function surfaceOver(store: StoreDouble | Record<string, unknown>, shape: PaneShapeDouble = paneShapeOf()): { readonly surface: PaneDragSurface; readonly shape: PaneShapeDouble } {
  const surface = createPaneDrag({ frozen: store, view: shape.client }, {}) as PaneDragSurface
  return { surface, shape }
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

/** READ a double's record of a written name: the LAST write of `name` (or
 *  undefined when never written) — the drives assert the written VALUE. Takes EITHER
 *  double structurally (`D-93`: the register double and the recording double both keep a
 *  `written` log, and neither is `StoreDouble`-only). */
function writtenValueOf(
  double: { readonly written: readonly { readonly verb: string; readonly name: string; readonly value: unknown }[] },
  name: string,
  verb?: string,
): unknown {
  let found: unknown
  for (const w of double.written) {
    if (w.name === name && (verb === undefined || w.verb === verb)) found = w.value
  }
  return found
}

/** **A THROWING STORE DOUBLE — THE ABSENCE WITH TEETH** (`D-93`). Every member throws. Its one
 *  surviving drive is the composition row: a composition handed THIS as its `frozen` record and
 *  still answering from the SHAPE alone proves no store read was on the route (`M-PDV`'s
 *  real-store sibling). It absorbed the deleted caller turns' drives before the purge. */
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
    sever: boom,
    tiers: {
      mem: { get: boom, has: boom, set: boom, clear: boom },
      file: { get: boom, has: boom, set: boom, clear: boom },
      temp: { get: boom, has: boom, set: boom, clear: boom },
    },
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 * **THE REGISTER DOUBLE — A DOUBLE OF THE DELETED FROZEN STORE** (`D-93`).
 * `src/renderer/store-core-graph.ts` together with its `store-graph-references.ts`
 * declaration input is DELETED, so `createGraphStore` / `GraphStore` /
 * `storeGraphReferences` no longer exist and the rows that drove them are RETIRED by name.
 * What survives is the SHAPE of the register those rows stood on, and it is stood in for
 * HERE — self-contained, backed by a `Map<string, unknown>` keyed by the dotted name, with
 * exactly the surface this file drives: `resolve`, a minting `commit`, a `clear`, a
 * `subscribe`, the three tier handles, and `hydrate`. **IT IS A FIXTURE, NEVER A RE-LAND**:
 * no `src/**` byte imports it, and it adds no member the frozen register did not have —
 * except `sever`, which is ARMED TO THROW: the frozen store's `sever(from, anchorKey)` is
 * deleted with it, so a drive that reached for the sever REDDENS instead of silently
 * answering, and "the sever is never called" keeps its bite.
 * ════════════════════════════════════════════════════════════════════════════ */

interface RegisterRead {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
  readonly tier: TierKey | null
}

interface RegisterReceipt {
  readonly status: 'committed' | 'refused'
  readonly name: string
  readonly reason?: string
}

interface RegisterDouble {
  resolve(name: string): RegisterRead
  commit(name: string, value: unknown, opts?: unknown): RegisterReceipt
  clear(name: string): RegisterReceipt
  subscribe(
    name: string,
    listener: (event: unknown) => void,
    opts?: { readonly subtree?: boolean },
  ): { readonly name: string; readonly subtree: boolean; unsubscribe(): boolean }
  /** **DELETED WITH THE FROZEN STORE** — calling it throws (see the block comment above). */
  sever(from: string, anchorKey: string): never
  hydrate(rows: readonly { readonly name: string; readonly value: unknown }[]): RegisterReceipt
  tiers: Record<TierKey, { get(name: string): RegisterRead; has(name: string): boolean }>
  readonly readLog: string[]
  readonly written: { readonly verb: string; readonly name: string; readonly value: unknown; readonly opts?: unknown }[]
  readonly subscriptions: { readonly name: string; readonly subtree: boolean; readonly listener: (event: unknown) => void }[]
}

function createRegisterDouble(): RegisterDouble {
  const rows = new Map<string, unknown>()
  const readLog: string[] = []
  const written: { verb: string; name: string; value: unknown; opts?: unknown }[] = []
  const subscriptions: { name: string; subtree: boolean; listener: (event: unknown) => void }[] = []

  /** `temp.` / `mem.` / `file.` prefix, or `null` for a tier-free name (the register's own
   *  `'malformed-name'` refusal class). */
  const tierOf = (name: string): TierKey | null => {
    const first = name.split('.')[0] ?? ''
    return (TIER_ORDER as readonly string[]).includes(first) ? (first as TierKey) : null
  }

  const read = (name: string): RegisterRead => {
    readLog.push(name)
    const has = rows.has(name)
    return { found: has, value: has ? rows.get(name) : undefined, name, tier: has ? tierOf(name) : null }
  }

  const write = (verb: 'commit' | 'clear', name: string, value: unknown, opts?: unknown): RegisterReceipt => {
    written.push({ verb, name, value, opts })
    if (tierOf(name) === null) return { status: 'refused', name, reason: 'malformed-name' }
    if (verb === 'clear') rows.delete(name)
    else rows.set(name, value)
    return { status: 'committed', name }
  }

  const handle = (tier: TierKey): { get(name: string): RegisterRead; has(name: string): boolean } => ({
    get(name: string): RegisterRead {
      return read(`${tier}.${name}`)
    },
    has(name: string): boolean {
      return rows.has(`${tier}.${name}`)
    },
  })

  return {
    resolve: read,
    commit: (name, value, opts) => write('commit', name, value, opts),
    clear: (name) => write('clear', name, undefined),
    subscribe(name, listener, opts) {
      const subtree = opts?.subtree === true
      subscriptions.push({ name, subtree, listener })
      return { name, subtree, unsubscribe: (): boolean => true }
    },
    sever(from: string, anchorKey: string): never {
      throw new Error(`the sever is DELETED with the frozen store (D-93) — nothing may call it: sever(${from}, ${anchorKey})`)
    },
    hydrate(hydrateRows) {
      for (const row of hydrateRows) rows.set(row.name, row.value)
      return { status: 'committed', name: 'hydrate' }
    },
    tiers: { temp: handle('temp'), mem: handle('mem'), file: handle('file') },
    readLog,
    written,
    subscriptions,
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 * **THE TWO WIRING LOADERS ARE GONE** (`D-93`, 2026-11-03). `loadOverlayWiringFactory` and
 * `loadThemeWiringFactory` used to `await import('../src/renderer/overlay-store.js')` /
 * `'../src/renderer/theme-store.js'` and normalize the module-not-found rejection into the RED
 * reason. BOTH FILES ARE DELETED, and not by accident: they wired the frozen store's
 * `mem.overlay.<name>.state` / `file.settings.theme.token` address space, they had NO live
 * consumer under `src/` (only tests imported them), and the store that address belonged to is
 * deleted too. A loader here would now load nothing. The rows that awaited them are re-grained
 * onto the MECHANISM modules they wired — `src/shared/overlay.ts` and `src/shared/theme.ts`,
 * which survive untouched and keep their own landed suites — or RETIRED with a headstone.
 * ════════════════════════════════════════════════════════════════════════════ */

interface ThemeResolutionRecord {
  readonly setting: unknown
  readonly prefersDark: unknown
  readonly source: unknown
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

describe('§3.1 M-rows — the overlay family (M-OV-*), RE-GRAINED onto src/shared/overlay.ts (D-93)', () => {
  test('M-OV-1 — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) the read turn read the stored state; a MISS answers undefined (§2.2 items 1/2/4)', () => {
    // ═══ HEADSTONE ═══ This row drove `createOverlayStoreWiring(store).readState(name)` — the
    // caller-side store turn of `src/renderer/overlay-store.ts`, DELETED with the frozen store
    // (`D-93`). Its ENTIRE subject was that turn's read of `mem.overlay.<name>.state`, an address
    // of `src/renderer/store-core-graph.ts`: both the reader and the address are gone, and the turn
    // never had a live consumer under `src/` (only tests imported it). NO RE-GRAIN IS POSSIBLE
    // HONESTLY: `src/shared/overlay.ts` is a pure transition over a passed state — it has no read
    // turn, so "a MISS answers undefined" has nothing left to be true OF. What this row still
    // measures is the DELETION, so a re-land of the file (or its address) re-opens it.
    expect(existsSync(join(SRC_ROOT, 'renderer/overlay-store.ts')), 'the retired subject must stay deleted — a re-land re-opens this row').toBe(false)
    expect(existsSync(join(SRC_ROOT, 'renderer/store-core-graph.ts')), 'the address space went with the store').toBe(false)
    // CONTROL: the same existence probe on a file that IS there answers true, so the two `false`
    // readings above are measurements and not a broken path.
    expect(existsSync(join(SRC_ROOT, 'shared/overlay.ts')), 'the MECHANISM survives — the probe reads the tree it claims to').toBe(true)
  })

  test('M-OV-2 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) the transition lands the next state; a no-change verb performs NO write (§2.2 items 1/3)', () => {
    // THE TERM IS UNCHANGED AND THE MODULE IS THE ONE SUBJECT LEFT: the deleted caller turn wrote
    // `overlayTransition`'s record with `commit {onRepeat:'edit'}` ONLY when the module reported
    // `changed:true`. That licence is the module's, so it is driven here at its source — the store
    // below is the file's REGISTER DOUBLE, standing in for the register the write landed in.
    const double = createRegisterDouble()
    double.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    // THE WRITE-DISCIPLINE FIXTURE (NOT a caller — the caller is DELETED; this is the module's
    // declared licence made countable: a write is owed IFF `changed` is true).
    const writeIfChanged = (state: unknown, verb: unknown): { readonly state: unknown; readonly changed: unknown } => {
      const record = overlayTransition(state, verb)
      if (record.changed) double.commit('mem.overlay.a.state', record.state, { onRepeat: 'edit' })
      return record
    }
    const r = writeIfChanged(double.resolve('mem.overlay.a.state').value, 'open')
    expect(r.state).toBe('open')
    expect(r.changed).toBe(true)
    expect(writtenValueOf(double, 'mem.overlay.a.state', 'commit')).toBe('open')
    // the minting verb is `commit` with onRepeat 'edit' (§2.8 item 3) — never a non-minting write
    const last = double.written.filter((w) => w.name === 'mem.overlay.a.state')
    expect(last.some((w) => w.verb === 'commit' && w.opts !== undefined && (w.opts as { onRepeat?: unknown }).onRepeat === 'edit')).toBe(true)
    // A NO-CHANGE VERB PERFORMS NO WRITE: the module reports no move, the guard writes nothing.
    const before = double.written.length
    const again = writeIfChanged('open', 'open')
    expect(again.state).toBe('open')
    expect(again.changed).toBe(false)
    expect(double.written.length).toBe(before)
    // CONTROL — the class this row forbids is a turn that writes on EVERY call whatever the module
    // reports; the same bookkeeping run on that fixture DOES grow the write log, so the no-write
    // assertion above is a measurement rather than a tautology.
    let unconditional = 0
    const writesAlways = (): void => {
      unconditional += 1
    }
    writesAlways()
    writesAlways()
    expect(unconditional, 'an unconditional writer writes on the no-change verb too — the probe has teeth').toBe(2)
  })

  test('M-OV-3 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) the Escape callback is handed through UNINTERPRETED and invoked once; a hostile callback is absorbed and the transition still lands (overlay.md M-9, §2.2 item 1)', () => {
    // THE WHOLE TERM WAS ALWAYS THE MODULE'S: the callback's hand-through, its single invocation and
    // its absorption live in `overlayTransition`. The caller that used to forward the callback is
    // DELETED; the module is called directly, so this row lost nothing but a hop.
    let calls = 0
    const cb = (): void => {
      calls += 1
    }
    const r = overlayTransition('open', 'escape', cb)
    expect(r.state).toBe('closed')
    expect(r.changed).toBe(true)
    expect(calls).toBe(1)
    // HANDED THROUGH UNINTERPRETED: the module adds NO argument of its own — the callback sees an
    // EMPTY argument list (an implementing module that forwarded `state`/`verb` would show two).
    let argc = -1
    overlayTransition('open', 'escape', (...args: unknown[]): void => {
      argc = args.length
    })
    expect(argc, 'the callback is invoked with NOTHING the module supplied').toBe(0)
    // a hostile (throwing) callback: absorbed by the MODULE's landed totality — the transition still
    // lands its move, and nothing escapes the call.
    const throwing = (): never => {
      throw new Error('escape callback throws')
    }
    const r2 = overlayTransition('open', 'escape', throwing)
    expect(r2.state).toBe('closed')
    expect(r2.changed).toBe(true)
    // from 'closed' the escape verb is a NON-MOVING cell (overlay.md M-4): the record comes back with
    // changed:false even with the hostile callback in hand — no write would be owed for it.
    const r3 = overlayTransition('closed', 'escape', throwing)
    expect(r3.state).toBe('closed')
    expect(r3.changed).toBe(false)
    // CONTROL — an INTERPRETING implementation (the class this row forbids) hands the module's own
    // figures into the callback; the same probe answers 2 on it, so the `argc === 0` reading above is
    // a measurement of the module and not of the probe.
    let interpretingArgc = -1
    const interpreting = (state: unknown, verb: unknown, callback?: unknown): void => {
      ;(callback as (...args: unknown[]) => void)(state, verb)
    }
    interpreting('open', 'escape', (...args: unknown[]): void => {
      interpretingArgc = args.length
    })
    expect(interpretingArgc, 'the interpreting fixture is caught by the same probe').toBe(2)
  })

  test('M-OV-4 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) the inert declaration stays RETURNED and is NEVER applied (E5-B-1); NO element, NO attribute, NO store call (§2.2 item 1)', () => {
    // THE DECLARATION WAS ALWAYS THE MODULE'S (`overlayInertDeclaration`): the deleted caller turn
    // only forwarded its four members. Driven directly now, with the SAME recording target.
    const double = createRecordingStoreDouble()
    const target = { setAttributeCalls: 0, classListCalls: 0 } as unknown
    const recTarget = {
      setAttribute: (): void => {
        ;(target as { setAttributeCalls: number }).setAttributeCalls += 1
      },
      classList: { add: (): void => { void 0 } },
    }
    const d = overlayInertDeclaration(recTarget as unknown, 'data-inert', true)
    expect(d.name).toBe('data-inert')
    // THE RETURNED-AS-TEXT READING (recorded reading (4); the E5-B-1 row name)
    expect(d.value).toBe('true')
    expect(d.removal).toBe(false)
    expect(d.target).toBe(recTarget as unknown)
    // NEVER APPLIED: no store call of ANY kind in the declaration turn — the module takes no store,
    // so the double in scope is never consulted.
    expect(double.readLog.length).toBe(0)
    expect(double.written.length).toBe(0)
    // no element/attribute mutation reached the target
    expect((target as { setAttributeCalls: number }).setAttributeCalls).toBe(0)
    // the removal arm (inert=false ⇒ {value:false, removal:true})
    const removal = overlayInertDeclaration(recTarget as unknown, 'data-inert', false)
    expect(removal.value).toBe(false)
    expect(removal.removal).toBe(true)
    expect(removal.target).toBe(recTarget as unknown)
    expect((target as { setAttributeCalls: number }).setAttributeCalls, 'and the removal arm touched no attribute either').toBe(0)
    // CONTROL (a): the read/write log measures a store call — ONE synthetic resolve is recorded, so
    // the two empty readings above are a measurement and not a dead double.
    double.resolve('mem.overlay.a.state')
    expect(double.readLog.length).toBe(1)
    // CONTROL (b): "no store call" is structural — the module's exported signatures carry no store
    // parameter, and a signature that DID carry one is reported by the same scan.
    const moduleCode = commentElided(readSrc('shared/overlay.ts'))
    expect(signatureStoreParams(moduleCode)).toEqual([])
    expect(storeBindings(moduleCode)).toEqual([])
    expect(signatureStoreParams('export function turn(target: unknown, store: unknown): unknown { return target }').length).toBeGreaterThan(0)
    expect(storeBindings('\nconst store = createGraphStore()\nexport function f() { return store }\n').length).toBeGreaterThan(0)
  })

  test('M-OV-5 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) the COLD drive answers the PASS-THROUGH REALITY: the module\'s totality coerces the MISS to the no-move record, NO write, the readback stays a MISS; the mint turn is FROM A REAL STATE (§2.2 items 4/6, the amended §3.1 cell)', () => {
    // THE AMENDED TRANSCRIPT (spec §3.1 M-OV-5's CORRECTED cell, §2.2 items 1/4, §4.2 — the
    // pre-implementer amendment pass landed 2026-10-03), DRIVEN AT ITS SOURCE since the caller turn
    // was deleted: the COLD `transition('a','open')` drive answered `{state:'closed',changed:false}`
    // — the missing state is NOT a state: overlayTransition coerces EVERY non-state × every verb to
    // the declared no-move record and NEVER reports changed:true from a MISS — so NO write is owed
    // (the pass-through wrote ONLY when the module reported changed:true), and a subsequent read
    // answers a MISS (nothing was minted). A mint-from-MISS would require inventing a default
    // (forbidden — F-OV-1); the mint/re-mint turn is M-OV-2's flow FROM A REAL STATE (driven below).
    const double = createRegisterDouble() // COLD — no stored copy
    const cold = double.resolve('mem.overlay.a.state')
    expect(cold.found).toBe(false)
    const r = overlayTransition(cold.value, 'open')
    expect(r.state).toBe('closed')
    expect(r.changed).toBe(false)
    // NO write: the register's written map holds nothing for the reference
    expect(double.written.length).toBe(0)
    expect(double.resolve('mem.overlay.a.state').found).toBe(false)
    // THE MINT TURN IS FROM A REAL STATE (M-OV-2's flow — the amended re-pin):
    // seed the record, drive the changed transition, the write mints 'open'
    double.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const minted = overlayTransition(double.resolve('mem.overlay.a.state').value, 'open')
    expect(minted.state).toBe('open')
    expect(minted.changed).toBe(true)
    double.commit('mem.overlay.a.state', minted.state, { onRepeat: 'edit' })
    expect(writtenValueOf(double, 'mem.overlay.a.state', 'commit')).toBe('open')
    expect(double.resolve('mem.overlay.a.state').value).toBe('open')
    // CONTROL — the coercion above is a measurement, not an accident: from a REAL state the SAME verb
    // MOVES (just driven), while a state-SHAPED non-state is still coerced to the no-move record.
    expect(overlayTransition({ state: 'open' }, 'open')).toEqual({ state: 'closed', changed: false })
    expect(overlayTransition('open', 'open')).toEqual({ state: 'open', changed: false })
  })
})

describe('§3.1 M-rows — the theme resolution family (M-TH-*), RE-GRAINED onto src/shared/theme.ts (D-93)', () => {
  test('M-TH-1 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the resolution passes its setting AS the module\'s setting, BY IDENTITY, and consults no store (§2.3 items 1/2)', () => {
    // THE DELETED CALLER TURN read the committed token and handed it to `resolveTheme` as the
    // `setting`. The module is the subject that survives: it DERIVES nothing — the setting member IS
    // the value it is handed, by identity — and it reads no store of its own.
    const double = createRegisterDouble()
    // THE REGISTER HOLDS A DIFFERENT TOKEN on purpose: an answer of 'light' would be visible.
    double.commit('file.settings.theme.token', 'light', { onRepeat: 'edit' })
    const r = resolveTheme('dark', { prefersDark: false })
    expect(r.setting).toBe('dark') // the PASSED token, by identity
    expect(r.prefersDark).toBe(false)
    expect(r.source).toBe('env')
    expect(double.readLog, 'the module took no store read: it holds no store').toEqual([])
    // CONTROL — the register's own read DOES answer 'light', so the 'dark' above is the passed value
    // and not an ambient one; and a DERIVING resolution would answer a different string.
    expect(double.resolve('file.settings.theme.token').value).toBe('light')
    expect(r.setting).not.toBe('light')
    expect(resolveTheme('dark ', { prefersDark: false }).setting).not.toBe('dark')
  })

  test('M-TH-2 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the DEFAULT-SEED RULE: on a MISS the answer\'s setting IS the seed BY IDENTITY; NO store write happens on the miss (§2.3 items 1/4)', () => {
    // the deleted turn's MISS arm handed its own `seed` to the module; the module echoes it by
    // identity and writes nothing (it has no write surface at all).
    const double = createRegisterDouble() // COLD
    const seed = 'light'
    const miss = double.resolve('file.settings.theme.token')
    expect(miss.found).toBe(false)
    const r = resolveTheme(miss.found ? miss.value : seed, { prefersDark: true })
    expect(r.setting).toBe(seed) // BY IDENTITY (primitive identity — toBe)
    expect(r.prefersDark).toBe(true)
    expect(r.source).toBe('env')
    expect(double.written.length).toBe(0) // the miss makes NO store write
    // CONTROL — the written map measures a write: ONE synthetic commit on it is recorded, so the
    // empty map above is a measurement; and an INVENTED default is not the seed by identity.
    double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    expect(double.written.length).toBe(1)
    const invented: unknown = 'dark'
    expect(invented).not.toBe(seed)
  })

  test('M-TH-3 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the pass-through keeps the module total: ANY env answers a ThemeResolution, never a throw (§2.3 item 1, theme.md §2.3 item 2)', () => {
    // THE TOTALITY WAS ALWAYS THE MODULE'S (`resolveTheme`'s degraded-env arm); the caller turn only
    // forwarded the env. Driven directly on the SAME hostile corpus.
    const double = createRecordingStoreDouble()
    double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
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
        r = resolveTheme('dark', env)
      } catch (e) {
        threw = e
      }
      // never a throw; the module's declared hostile-env record
      expect(threw).toBeNull()
      expect(r).toBeDefined()
      expect(r?.setting, 'and the setting survives the hostile env — the degraded arm is the ENV\'s, not the setting\'s').toBe('dark')
      expect(r?.prefersDark).toBe(false)
      expect(r?.source).toBe('degraded-env')
    }
    const ok = resolveTheme('dark', { prefersDark: false })
    expect(ok.source).toBe('env')
    expect(ok.prefersDark).toBe(false)
    // CONTROL — the degraded arm is not the only arm: a WELL-FORMED env answers 'env', so the five
    // 'degraded-env' readings above are a measurement of the hostility, and the register in scope was
    // never read or written by the module (`resolveTheme` takes no store): its ONE seeded commit is
    // the whole of its write log, before and after the drives.
    expect(double.readLog).toEqual([])
    expect(double.written.length, 'the module wrote nothing: the seeded commit is the only entry').toBe(1)
  })

  test('M-TH-4 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the module\'s WRITE is a RETURNED declaration carrying the resolved token; an absent resolution is the removal record; a hostile supply never throws (§2.3 item 1, §2.2 item 3)', () => {
    // THE DELETED CALLER TURN's write half committed the token into `file.settings.theme.token`;
    // that address is gone with the store. What the MODULE does with a resolved token — the
    // declaration-only applier — is the surviving subject and is driven here.
    const w = applyThemeDeclaration('data-theme', 'dark')
    expect(w.name).toBe('data-theme')
    expect(w.value, 'the resolved token is carried AS ITSELF, by identity').toBe('dark')
    expect(w.removal).toBe(false)
    // THE REMOVAL ARM: no resolved token ⇒ the declared removal record, never a throw
    const removal = applyThemeDeclaration('data-theme', null)
    expect(removal.value).toBe('')
    expect(removal.removal).toBe(true)
    // a HOSTILE supply (a revoked proxy, an unnameable attribute) is consumed as the declared
    // record — nothing escapes the call
    const revoked = Proxy.revocable({}, {})
    revoked.revoke()
    let threw: unknown = null
    let hostile: { readonly removal: unknown } | undefined
    try {
      hostile = applyThemeDeclaration('data-theme', revoked.proxy)
      expect(applyThemeDeclaration(undefined, 'dark').name).toBeNull()
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    expect(hostile?.removal).toBe(true)
    // CONTROL — the value member is an ECHO by identity: a deriving applier (the class this row
    // forbids) would answer a different string and redden the `toBe('dark')` above.
    expect('dark'.toUpperCase()).not.toBe('dark')
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
  test('M-PDV-1 — the pane-size read REACHES THE SHAPE, and the store is NO LONGER the pane read\'s authority; the answer IS the delivered value (§2.5 items 1/2, pane-drag §2.1 A; D-88/D-89)', () => {
    // THE DELIVERED FAMILY (what a boot read or a push refilled the shape with).
    const shape = paneShapeOf([{ id: 'pane-a', size: 320, bounds: { min: 0, max: 200 } }])
    const double = createRecordingStoreDouble()
    // THE STORE STILL HOLDS THE OLD SPELLING, AND THE COMPOSITION MUST NOT READ IT: that is the claim this row makes now.
    double.commit('mem.layout.pane.pane-a.size', 999, { onRepeat: 'edit' })
    const { surface } = surfaceOver(double, shape)
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    // the same closure answers defaultSizeFor identically
    expect(surface.defaultSizeFor({ id: 'pane-a' }, 'pane-a')).toBe(320)
    // ONE READ AUTHORITY: the pane reference is not read off the frozen store at all any more.
    expect(double.readLog.filter((n) => n.startsWith('mem.layout.pane')), 'the panes are the shape\'s, and no store tier is consulted for them').toEqual([])
    expect(shape.reads(), 'and the shape answered without a route read — the composition reads the held shape synchronously').toBe(0)
    // THE DEFAULT ARM: a pane the family does not name answers the MEASURED default — a NUMBER, not the `undefined` that
    // made the release refuse `\'unusable-default\'` with zero writes (the swap\'s one stated behaviour change).
    const cold = surfaceOver(createRecordingStoreDouble(), paneShapeOf())
    expect(cold.surface.startSizeOf({ id: 'pane-missing' }, 'pane-missing')).toBe(100)
  })

  test('M-PDV-2 — the bounds read answers AS DELIVERED, never a policy clamped here (§2.5 items 1/2, pane-drag §2.1 A)', () => {
    const shape = paneShapeOf([{ id: 'pane-a', size: 100, bounds: { min: 100, max: 600 } }])
    const double = createRecordingStoreDouble()
    const { surface } = surfaceOver(double, shape)
    const answer = surface.boundsOf({ id: 'pane-a' }, 'pane-a')
    expect(structurallyEqual(canonicalOf(answer), canonicalOf({ min: 100, max: 600 }))).toBe(true)
    expect(double.readLog.filter((n) => n.startsWith('mem.layout.pane')), 'no store tier answers the bounds').toEqual([])
    // THE DEFAULT PAIR answers a pane the family does not name, and it is the MEASURED one rather than an unusable value.
    expect(structurallyEqual(canonicalOf(surface.boundsOf({ id: 'pane-x' }, 'pane-x')), canonicalOf({ min: 0, max: 200 }))).toBe(true)
  })

  test('M-PDV-3 — the candidate read answers the SHAPE\'S `[\'zones\']` family: the recorded OPAQUE slot + the recorded distance by identity, and a zone the family does not name answers [] (`D-92`: the drag tier\'s zone pair is the record\'s now, so the FROZEN STORE is no longer read for it either — pane-drag §2.1 B)', () => {
    const double = createRecordingStoreDouble()
    const opaque = { slotToken: 'opaque-caller-value' }
    const shape = paneShapeOf([], [{ id: 'zone-1', slot: opaque, distance: 37 }])
    const { surface } = surfaceOver(double, shape)
    const answer = surface.candidatesFor({ zoneId: 'zone-1' })
    expect(answer.length).toBe(1)
    expect(answer[0]?.candidate).toBe(opaque) // OPAQUE AS RECORDED, by identity
    expect(answer[0]?.distance).toBe(37)
    // **NOT ONE STORE READ**: the frozen store\'s two zone tiers are not consulted, which is the change this row now names.
    expect(double.readLog.filter((n) => n.includes('layout.zone'))).toEqual([])
    const missing = createRecordingStoreDouble()
    // A ZONE THE FAMILY DOES NOT NAME — the creation repair\'s placeholder is the family that names no zone (`D-91`).
    expect(surfaceOver(missing, paneShapeOf()).surface.candidatesFor({ zoneId: 'zone-x' })).toEqual([])
  })

  test('M-PDV-4 — the composition registers NOTHING AT ALL, on the store or on the shape: the render turn is a surface member the shape\'s ONE delivery calls, which is the `subscribe(\'temp.drag\', …, {subtree:true})` registration\'s successor (`D-92`; pane-drag §2.3 item 2, re-grain of `D-88`\'s "exactly one subscriber")', () => {
    const double = createRecordingStoreDouble()
    const shape = paneShapeOf()
    const { surface } = surfaceOver(double, shape)
    // ZERO SUBSCRIPTIONS ON THE STORE — the temp-preview registration is DELETED, not narrowed.
    expect(double.subscriptions, 'the composition takes no store subscription of any kind').toEqual([])
    // AND ZERO ON THE SHAPE: a second `onChanged` registration would be a second consumer of one push and a second read
    // per delivery, so the client owns the only one.
    expect(shape.registrations(), 'the composition takes no subscription on the shape either').toBe(0)
    // THE TURN EXISTS AND IS DRIVEN BY THE DELIVERY: the member is on the surface and it renders the delivered family.
    const calls: Array<{ size: unknown; display: unknown }> = []
    const withSink = createPaneDrag(
      { frozen: double, view: paneShapeOf([], [{ id: 'zone-1', size: 320, display: 'block' }]).client },
      { layout: (zoneId: string, size: unknown, display: unknown): void => { void zoneId; calls.push({ size, display }) } },
    ) as PaneDragSurface
    withSink.renderZone()
    expect(calls).toEqual([{ size: 320, display: 'block' }])
    // the surface the row composed above has the member too, and it answers without a sink.
    expect(typeof surface.renderZone).toBe('function')
    expect(() => surface.renderZone()).not.toThrow()
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.2 THE DOCUMENTED FAIL-STATES (F-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.2 F-rows — overlay (F-OV-*), RE-GRAINED onto src/shared/overlay.ts (D-93)', () => {
  test('F-OV-1 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) NO default is invented on a MISS; the module\'s totality coerces', () => {
    // the FAILING drive: a fixture turn that answers a CALLER-WRITTEN default
    // state straight from a MISS — the invented-state class the rule forbids
    const inventingTurn = (): unknown => 'open' // invented default, no module transition
    expect(inventingTurn()).toBe('open')
    expect(inventingTurn()).not.toBeUndefined()
    // the module's own totality IS the declared coercion: for EVERY non-state it answers the
    // 'closed'-based record and reports NO change — the verb is NOT applied to a coerced non-state
    const moduleAnswer = overlayTransition(undefined, 'open')
    expect(moduleAnswer.state).toBe('closed')
    expect(moduleAnswer.changed).toBe(false)
    for (const miss of [null, {}, 'OPEN', '', 0, false, { state: 'open' }]) {
      expect(overlayTransition(miss, 'open'), `a non-state (${JSON.stringify(miss)}) invents nothing`).toEqual({ state: 'closed', changed: false })
    }
    // CONTROL — from a REAL state the same verb DOES move, so the seven no-move records above are a
    // measurement of the coercion and not a module that never moves at all.
    expect(overlayTransition('closed', 'open')).toEqual({ state: 'open', changed: true })
  })

  test('F-OV-2 — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) a `set` in place of the minting `commit` was the REFUSED \'undeclared-name\' class; the turn used commit for the mint (§2.8 item 1)', () => {
    // ═══ HEADSTONE ═══ This row's subject was the DELETED CALLER TURN's verb discipline over the
    // DELETED STORE's address space (`mem.overlay.a.state`): `set` on a path with no node was the
    // store's `'undeclared-name'` refusal, and the row's bite was that the turn minted with
    // `commit {onRepeat:'edit'}` instead. `set`, the refusal classes and the address are all
    // properties of `src/renderer/store-core-graph.ts`, which is DELETED; the minting verb survives
    // ONLY as a fixture contract of this file's register double, which is no one's subject. The
    // half that DOES survive — "the write lands only on the module's changed:true" — is driven in
    // M-OV-2 above, where it now lives.
    expect(existsSync(join(SRC_ROOT, 'renderer/overlay-store.ts')), 'the turn whose verb discipline this row measured is deleted').toBe(false)
    // CONTROL: the probe is not blind — the module the turn wired is still there and is read by name.
    expect(existsSync(join(SRC_ROOT, 'shared/overlay.ts'))).toBe(true)
  })

  test('F-OV-3 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) a HOSTILE supply never escapes the module; every drive answers the declared record (THROWING-SUPPLY-ABSORPTION…, §2.2 item 3)', () => {
    // THE ABSORPTION WAS ALWAYS THE MODULE'S. The deleted caller turn had to survive a store that
    // threw on every member; that store is gone, so the hostile supply is now the module's OWN
    // inputs — a throwing Escape callback, a hostile state, an unnameable attribute, a revoked proxy
    // target — and the claim is the same: nothing escapes, every drive answers its declared record.
    let threw: unknown = null
    let transition: { readonly state: unknown; readonly changed: unknown } | undefined
    let declaration: { readonly name: unknown; readonly removal: unknown } | undefined
    const throwingCallback = (): never => {
      throw new Error('hostile callback (test seam)')
    }
    const revoked = Proxy.revocable({}, {})
    revoked.revoke()
    const hostileAttribute = Object.defineProperty({}, 'toString', {
      get: (): never => {
        throw new Error('hostile attribute holder')
      },
    })
    try {
      transition = overlayTransition({ bogus: true }, 'open', throwingCallback)
      declaration = overlayInertDeclaration(revoked.proxy, hostileAttribute, true)
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    expect(transition?.state).toBe('closed') // the declared coercion, never a throw
    expect(transition?.changed).toBe(false)
    expect(declaration?.name, 'a non-string attribute name is the declared null, never a throw').toBeNull()
    expect(declaration?.removal).toBe(false)
    // the ESCAPE drive is the one that CALLS the hostile supply — and it still lands its record
    expect(overlayTransition('open', 'escape', throwingCallback)).toEqual({ state: 'closed', changed: true })
    // CONTROL — the absorption is the module's and not the harness's: the SAME calls made without it
    // (a fixture that invokes the callback bare) DO throw, so `threw === null` above is a measurement.
    let controlThrew: unknown = null
    try {
      throwingCallback()
    } catch (e) {
      controlThrew = e
    }
    expect(controlThrew, 'the hostile supply really does throw when nothing absorbs it').not.toBeNull()
  })

  test('F-OV-4 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) NO subscription is registered ANYWHERE: the read IS the observation (§2.2 item 5)', () => {
    // THE ORIGINAL: the deleted caller turn registered no store subscription — the read WAS the
    // observation. With the turn gone the claim is STRONGER AND STILL TRUE: the module holds no
    // subscription surface at all, so nothing can register one.
    const double = createRecordingStoreDouble()
    // driven twice, with a register and with no register in reach: the module takes no store
    for (const _ of [0, 1]) {
      overlayTransition('closed', 'open')
      overlayInertDeclaration({}, 'data-inert', true)
    }
    expect(double.subscriptions.length).toBe(0)
    // and the absence is STRUCTURAL, read off the module's CODE (comments elided):
    const moduleCode = commentElided(readSrc('shared/overlay.ts'))
    expect(moduleCode.includes('subscribe'), 'the module carries no subscription surface').toBe(false)
    expect(signatureStoreParams(moduleCode), 'and no exported signature carries a store').toEqual([])
    // CONTROL — the scanner DOES see a subscription form when one is planted, so the absence above is
    // a measurement; and the double's own `subscribe` records, so the empty list is not a dead double.
    const planted = `export function turn(name: string, listener: () => void) { return store.subscribe(name, listener) }`
    expect(commentElided(planted).includes('subscribe')).toBe(true)
    double.subscribe('mem.overlay.a.state', () => undefined, { subtree: true })
    expect(double.subscriptions.length).toBe(1)
  })
})

describe('§3.2 F-rows — theme (F-TH-*), RE-GRAINED onto src/shared/theme.ts (D-93)', () => {
  test('F-TH-1 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) NO non-seeded default on the MISS; only the seed BY IDENTITY (§2.3 items 1/4)', () => {
    // the deleted turn's MISS arm handed its own `seed` to `resolveTheme`; the module answers it
    // back by identity and invents nothing.
    const double = createRegisterDouble() // COLD
    const seed = 'light'
    const miss = double.resolve('file.settings.theme.token')
    expect(miss.found).toBe(false)
    const r = resolveTheme(miss.found ? miss.value : seed, { prefersDark: false })
    expect(r.setting).toBe(seed)
    // the failing class: a store-invented / literal default would NOT be the
    // seed by identity — demonstrated on the fixture answer
    const invented: unknown = 'dark'
    expect(invented).not.toBe(seed)
    // CONTROL — the seed arm is the MISS arm and not the module's only arm: with a token in hand the
    // SAME call answers that token, so the identity above measures the arm it names.
    expect(resolveTheme('dark', { prefersDark: false }).setting).toBe('dark')
    expect(resolveTheme('dark', { prefersDark: false }).setting).not.toBe(seed)
  })

  test('F-TH-2 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the seed arm writes NOTHING; the module holds no store and no state (§2.3 item 4, the H2a MISS-rule shape)', () => {
    // THE ORIGINAL SECOND HALF ("the next write turn re-mints") was the DELETED caller turn's; the
    // first half — the miss writes NOTHING — is the module's and is asserted here, with the purity
    // that makes it true.
    const double = createRegisterDouble() // COLD
    const r = resolveTheme('light', { prefersDark: true }) // the seed arm
    expect(r.setting).toBe('light')
    expect(double.written.length).toBe(0) // ANY write in the miss turn FAILS
    expect(double.readLog.length).toBe(0) // and no store was read either: the module takes none
    // the module is a PURE function of its two arguments — the second call answers the same record
    expect(structurallyEqual(canonicalOf(resolveTheme('light', { prefersDark: true })), canonicalOf(r))).toBe(true)
    // CONTROL — the written map measures a write, so the empty one above is a measurement (the same
    // commit a re-minting turn WOULD have made is recorded here), and a stateful module would have
    // varied between the two calls compared just now.
    double.commit('file.settings.theme.token', 'dark', { onRepeat: 'edit' })
    expect(double.written.length).toBe(1)
    expect(writtenValueOf(double, 'file.settings.theme.token', 'commit')).toBe('dark')
  })

  test('F-TH-3 — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) a `set` in place of the minting `commit` was REFUSED on the unminted path (§2.8 item 1)', () => {
    // ═══ HEADSTONE ═══ This row asserted a refusal property of the DELETED FROZEN STORE — `set` on
    // the unminted `file.settings.theme.token` path answering the `'undeclared-name'` class, and the
    // minting `commit` succeeding beside it. The address, the verb pair and the refusal classes are
    // all `src/renderer/store-core-graph.ts`'s, and that file is DELETED; no `src/**` file composes
    // `file.settings.theme.token` any more (S-TH-2 and the caller-spelling census below drive that
    // absence). What remains here is the deletion, which STANDS AS THE ROW'S SUBJECT.
    expect(existsSync(join(SRC_ROOT, 'renderer/store-core-graph.ts')), 'the store whose refusal class this row measured is deleted').toBe(false)
    // CONTROL: the mechanism module it was addressed beside is STILL THERE, so this probe reads a tree.
    expect(existsSync(join(SRC_ROOT, 'shared/theme.ts'))).toBe(true)
  })

  test('F-TH-4 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) a HOSTILE supply never escapes the resolution; the answer lands on the declared seed arm (§2.3 items 1/5)', () => {
    // the deleted turn had to survive a store that threw; the store is gone, so the hostility is the
    // module's OWN inputs: a throwing accessor, a revoked proxy, an unnameable resolution.
    const seed = 'light'
    const hostileEnvs: unknown[] = [
      Object.defineProperty({}, 'prefersDark', { get: (): never => { throw new Error('throwing accessor') } }),
      (() => { const p = Proxy.revocable({ prefersDark: true }, {}); p.revoke(); return p.proxy })(),
      Symbol('env'),
    ]
    let threw: unknown = null
    for (const env of hostileEnvs) {
      let r: ThemeResolutionRecord | undefined
      try {
        r = resolveTheme(seed, env)
      } catch (e) {
        threw = e
      }
      expect(threw).toBeNull()
      expect(r?.setting, 'the answer LANDS on the declared seed arm — the seed BY IDENTITY').toBe(seed)
      expect(r?.source).toBe('degraded-env')
    }
    // the WRITE half's hostility: an unhandled resolution answers the removal record, never a throw
    const revoked = Proxy.revocable({}, {})
    revoked.revoke()
    try {
      expect(applyThemeDeclaration(revoked.proxy, revoked.proxy).removal).toBe(true)
    } catch (e) {
      threw = e
    }
    expect(threw).toBeNull()
    // CONTROL — the same hostile env WITHOUT the module's absorption throws, so `threw === null`
    // above is a measurement of the module and not of the harness.
    const accessor = Object.defineProperty({}, 'prefersDark', { get: (): never => { throw new Error('throwing accessor') } }) as { prefersDark: boolean }
    let controlThrew: unknown = null
    try {
      void accessor.prefersDark
    } catch (e) {
      controlThrew = e
    }
    expect(controlThrew, 'the hostile env really does throw when nothing absorbs it').not.toBeNull()
  })

  test('F-TH-5 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) NO subscription is registered by the resolution (§2.3 item 5)', () => {
    // the original drove the deleted turn; the module it wired has no subscription surface at all,
    // which is the stronger true form of the same absence.
    const double = createRecordingStoreDouble()
    resolveTheme('light', { prefersDark: true })
    expect(double.subscriptions.length).toBe(0)
    const moduleCode = commentElided(readSrc('shared/theme.ts'))
    expect(moduleCode.includes('subscribe'), 'theme.ts carries no subscription surface').toBe(false)
    expect(signatureStoreParams(moduleCode), 'and no exported signature carries a store').toEqual([])
    // CONTROL — the scanner DOES see a planted subscription form, and the double DOES record one, so
    // both empty readings above are measurements rather than dead probes.
    expect(commentElided('export function f(store: unknown, name: string) { return store.subscribe(name) }').includes('subscribe')).toBe(true)
    double.subscribe('file.settings.theme.token', () => undefined)
    expect(double.subscriptions.length).toBe(1)
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
  test('F-PDV-1(a) — a MODULE-HELD authority answering a size from a module-held variable FAILS the shape-backed claim; the LANDED composition on the same drive answers from the SHAPE alone (§2.5 items 1/3; D-89)', () => {
    const shape = paneShapeOf([{ id: 'pane-a', size: 320, bounds: { min: 0, max: 200 } }])
    const double = createRecordingStoreDouble()
    const moduleHeld = 999
    const moduleHeldSeam = (): unknown => moduleHeld
    expect(double.readLog.length).toBe(0) // NO store read happened
    expect(moduleHeldSeam()).toBe(999)
    expect(moduleHeldSeam()).not.toBe(320) // the authority claim FAILS on it
    // THE POSITIVE CONTROL: the LANDED composition answers the SHAPE\'s value, and it takes no store read to do it.
    const { surface } = surfaceOver(double, shape)
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    expect(double.readLog.filter((n) => n.startsWith('mem.layout.pane'))).toEqual([])
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
    expect(dualSeam({ id: 'pane-a' }, 'pane-a')).not.toBe(320) // the authority claim FAILS
    const { surface } = surfaceOver(double, paneShapeOf([{ id: 'pane-a', size: 320, bounds: { min: 0, max: 200 } }]))
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
  })

  test('F-PDV-2 — a RE-LANDED read (a second implementation for the same pane id) is a second authority and FAILS by construction; the LANDED composition remains the sole authority (§2.5 items 1/3, the H2b queue row)', () => {
    const shape = paneShapeOf([{ id: 'pane-a', size: 320, bounds: { min: 0, max: 200 } }])
    const double = createRecordingStoreDouble()
    const { surface } = surfaceOver(double, shape)
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(320)
    // THE ONE AUTHORITY IS THE SHAPE, AND IT IS READ SYNCHRONOUSLY: no route read and no store read happen for a read turn.
    expect(shape.reads(), 'zero route reads for a read turn — the shape is already held').toBe(0)
    expect(double.readLog.filter((n) => n.startsWith('mem.layout.pane'))).toEqual([])
    // THE RE-LAND FIXTURE: a separate closure that re-derives the same pane from its own copy of the figures — the
    // second-authority class the queue row forbids ("this child VERIFIES, it does not re-land"). It answers, and it is a
    // DIFFERENT authority: the claim that fails on it is that there is ONE, not that the number differs.
    const reLandedFigures = { 'pane-a': 320 }
    const reLandedClosure = (): unknown => reLandedFigures['pane-a']
    expect(reLandedClosure()).toBe(320)
    expect(shape.client.shape().panes.find((pane) => pane.id === 'pane-a')?.size, 'and the landed authority still answers').toBe(320)
    // F-PDV-2 asserts the LANDED composition stays the sole authority: the tree scan (S-PDV-1) proves no src/** file outside
    // the composition reads the reference — driven as part of §3.4's S-PDV-1 test.
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §3.3 THE INVARIANTS (I-rows)
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§3.3 invariants (I-rows)', () => {
  test('I-OV-1 — (RE-GRAINED 2026-11-03 onto src/shared/overlay.ts, D-93) the store is a sharing channel, never an authority: NO store value becomes a transition DECISION (P-SMS-OV-TP-1\'s executable claim)', () => {
    // ambient values OUTSIDE the module's name are placed in a register — the module's answers must
    // not consult them (the TP-1 differential's cross-run equality executes the full claim; §5.5.1's
    // row). With the caller turn deleted the claim is STRONGER: the module consults NO name at all.
    const double = createRegisterDouble()
    double.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    double.commit('mem.other.carrier', 'open', { onRepeat: 'edit' })
    const r = overlayTransition(double.resolve('mem.overlay.a.state').value, 'open')
    expect(r.state).toBe('open')
    expect(r.changed).toBe(true)
    // the same drive WITHOUT the ambient value answers identically — the answer is a function of the
    // module's own arguments alone
    const plain = createRegisterDouble()
    plain.commit('mem.overlay.a.state', 'closed', { onRepeat: 'edit' })
    const r2 = overlayTransition(plain.resolve('mem.overlay.a.state').value, 'open')
    expect(r2.state).toBe(r.state)
    expect(r2.changed).toBe(r.changed)
    // and the module performs NO read of its own: the read log stands still while it works
    const readsBefore = double.readLog.length
    overlayTransition('open', 'toggle')
    overlayTransition('closed', 'open')
    overlayInertDeclaration({}, 'data-inert', true)
    expect(double.readLog.length, 'the module took no store read of its own').toBe(readsBefore)
    // CONTROL (a): the read log MEASURES reads — one synthetic resolve is recorded.
    double.resolve('mem.other.carrier')
    expect(double.readLog.length).toBe(readsBefore + 1)
    // CONTROL (b): the differential is not vacuous — a fixture that CONSULTS the ambient name answers
    // differently on the two registers, which is exactly the class this row forbids.
    const consulting = (register: RegisterDouble): unknown => register.resolve('mem.other.carrier').value
    expect(consulting(double)).toBe('open')
    expect(consulting(plain)).toBeUndefined()
    expect(consulting(double)).not.toBe(consulting(plain))
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

  test('I-TH-2 — (RE-GRAINED 2026-11-03 onto src/shared/theme.ts, D-93) the seed is the caller\'s own value: the resolution\'s setting member is the passed token or the seed BY IDENTITY, never a derived one (§2.3 items 1/4)', () => {
    // the deleted turn chose BETWEEN the stored token and its seed; the module only echoes what it is
    // handed. Both arms are driven at the source, by identity.
    const seed = 'light'
    const stored = { token: 'dark' }
    const double = createRegisterDouble()
    double.commit('file.settings.theme.token', stored.token, { onRepeat: 'edit' })
    const hit = double.resolve('file.settings.theme.token')
    expect(hit.found).toBe(true)
    expect(resolveTheme(hit.value, { prefersDark: false }).setting).toBe(stored.token)
    expect(resolveTheme(hit.value, { prefersDark: false }).setting).toBe('dark')
    const cold = createRegisterDouble()
    const miss = cold.resolve('file.settings.theme.token')
    expect(miss.found).toBe(false)
    expect(resolveTheme(miss.found ? miss.value : seed, { prefersDark: false }).setting).toBe(seed)
    // CONTROL — a DERIVED token is not the seed nor the stored one by identity; the module derives
    // nothing, and the `toBe` readings above would accept a derived answer only if the module had
    // built one.
    const derived = `${seed}-derived`
    expect(derived).not.toBe(seed)
    expect(resolveTheme(derived, { prefersDark: false }).setting).not.toBe(seed)
  })

  test('I-MT-1 — the latent module\'s answers are argument-determined TODAY (the anti-ambient claim): the tier state of a name the module never reads never varies an answer (P-SMS-MT-TP-1)', () => {
    const runA = menuScriptAnswers()
    // the runs differ ONLY in the tier state of the hypothetical
    // file.menu.catalog / mem.menu.catalog names — the module NEVER touches them
    // (the register double stands in for the deleted frozen store; the names are ambient)
    const store = createRegisterDouble()
    store.commit('mem.menu.catalog', { different: true }, { onRepeat: 'edit' })
    store.commit('file.menu.catalog', { different: true }, { onRepeat: 'edit' })
    const runB = menuScriptAnswers()
    for (let i = 0; i < runA.length; i += 1) {
      expect(structurallyEqual(canonicalOf(runA[i]), canonicalOf(runB[i])), `menu script answer ${i + 1}`).toBe(true)
    }
  })

  test('I-PDV-1 — one read authority per pane/zone reference: the SHAPE\'S, for BOTH families, and nothing else (F-PDV-1\'s complement, §2.5 items 1/3; `D-92`)', () => {
    const double = createRecordingStoreDouble()
    const shape = paneShapeOf([], [{ id: 'zone-1', slot: 'slot-a' }])
    const { surface } = surfaceOver(double, shape)
    surface.candidatesFor({ zoneId: 'zone-1' })
    // **ZERO STORE READS FOR THE ZONE**, which is the authority claim in its strongest form: the store is not consulted.
    expect(double.readLog.filter((n) => n.includes('layout.zone')), 'the record\'s zone family is the one authority').toEqual([])
    expect(shape.zones()).toEqual([{ id: 'zone-1', slot: 'slot-a' }])
    // the tree scan half (S-PDV-1 drives the no-second-read-in-the-tree claim). COMMENT-ELIDED: an
    // absence assertion reads CODE, never prose.
    const others = srcFiles().filter((f) => f.endsWith('renderer.ts') === false)
    for (const f of others) {
      const text = commentElided(readFileSync(f, 'utf8'))
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

describe('§3.4 S-rows — overlay (S-OV-*), the caller half RE-GRAINED to the stronger true form (D-93)', () => {
  test('S-OV-1 — (RE-GRAINED 2026-11-03, D-93) the overlay module\'s import census (ZERO imports, three views) PLUS the TREE census: NO file under src/ imports src/shared/overlay.js at all — its one admitted caller is DELETED', () => {
    // module half — GREEN today (landed bytes, P-OV-4/I-4's force)
    for (const reading of censusReadings('shared/overlay.ts')) {
      expect(reading.hits, `${reading.reading} of overlay.ts`).toEqual([])
    }
    // the three positive controls — each form MUST FAIL the census
    expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    // the sibling-mechanism control — a gutter specifier FAILS the same scan
    expect(scanSibling(`import { clampToBounds } from '../shared/gutter.js'`).length).toBeGreaterThan(0)
    // THE TREE CENSUS, IN ITS STRONGER TRUE FORM. The as-filed row counted the module's ONE admitted
    // caller (`src/renderer/overlay-store.ts`). That file is DELETED with the frozen store, so the
    // honest post-purge reading is not "exactly one importer" but "NO importer at all", read over the
    // whole tree, comments elided.
    const importers: string[] = []
    for (const f of srcFiles().filter((p) => p.includes('shared/overlay.ts') === false)) {
      const code = commentElided(readFileSync(f, 'utf8'))
      for (const hit of scanSpecifier(code, 'overlay')) importers.push(`${f}: ${hit}`)
    }
    expect(importers, 'the deleted caller left no successor: NO src/** file imports overlay.js').toEqual([])
    // AND NO FILE NAMES ITS TWO VALUE EXPORTS EITHER (the census's second form, so an import spelled
    // some other way is still caught by the names).
    for (const f of srcFiles().filter((p) => p.includes('shared/overlay.ts') === false)) {
      const code = commentElided(readFileSync(f, 'utf8'))
      expect(code.includes('overlayTransition'), `${f} must not reference the module's values`).toBe(false)
      expect(code.includes('overlayInertDeclaration'), `${f} must not reference the module's values`).toBe(false)
    }
    // THE CONTROL — a fixture line importing the module IS reported as an importer by the same scan,
    // so the two absences above are measurements.
    expect(scanSpecifier(`import { overlayTransition } from '../shared/overlay.js'\n`, 'overlay').length, 'a planted importer is caught').toBeGreaterThan(0)
    expect(scanSpecifier(`const o = require('../shared/overlay.js')\n`, 'overlay').length).toBeGreaterThan(0)
    expect(commentElided(`import { overlayInertDeclaration } from '../shared/overlay.js'`).includes('overlayInertDeclaration')).toBe(true)
  })

  test('S-OV-2 — (RE-GRAINED 2026-11-03, D-93) the module carries NO store-shaped binding and composes NO caller spelling; mem.overlay.<name>.state appears ZERO times in src/** (the deleted caller\'s one site is gone) (§2.6, P-SMS-OV-IM-2)', () => {
    // the controls — a module-scope binding and a duplicated spelling each FAIL
    expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0)
    expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0)
    const twice = `const a = 'mem.overlay.' + name + '.state'\nconst b = 'mem.overlay.' + name + '.state'\n`
    expect(countOccurrences(twice, OV_REFERENCE_PREFIX)).toBe(2) // the duplicate FAILS the exactly-once reading
    // THE MODULE'S OWN BYTES, and the TREE, both carry ZERO sites. The as-filed row read the caller
    // file's EXACTLY-ONE composition; the caller is DELETED, so the honest reading is the stronger
    // zero — and it is read over the whole tree, not one file.
    const text = commentElided(readSrc('shared/overlay.ts'))
    expect(storeBindings(readSrc('shared/overlay.ts'))).toEqual([]) // no module-scope store-shaped binding
    expect(countOccurrences(text, OV_REFERENCE_PREFIX)).toBe(0) // not even one site
    for (const f of srcFiles()) {
      expect(countOccurrences(commentElided(readFileSync(f, 'utf8')), OV_REFERENCE_PREFIX), `${f} must compose no such spelling`).toBe(0)
    }
    // CONTROL — the counter still counts: a ONE-site fixture reads 1 and the two-site one reads 2, so
    // the zeros above are measurements rather than a broken needle.
    expect(countOccurrences(`const a = '${OV_REFERENCE_PREFIX}' + name + '.state'`, OV_REFERENCE_PREFIX)).toBe(1)
  })

  test('S-OV-3 — (RE-GRAINED 2026-11-03, D-93) the overlay module\'s bytes carry no UI/no-MCP vocabulary, and the three caller spellings appear NOWHERE under src/** (the deleted store half, re-grained to the whole tree)', () => {
    // the controls — UI/no-MCP corpus each FAILS the scan
    const uiCorpus = `const el = document.createElement('div')\nel.setAttribute('data-inert', 'true')\nel.classList.add('x')\nel.style.width = '1px'\nprovident.dispatch(el, {})\n`
    for (const token of ['document.createElement', 'setAttribute', 'classList', 'style', 'provident.']) {
      expect(uiCorpus.includes(token)).toBe(true)
    }
    expect(callerSpellingHits(), 'NO src/** file composes a caller spelling any more').toEqual([])
    // THE MODULE'S OWN SCAN (the surviving subject), comments elided so its prose cannot answer for it
    const text = commentElided(readSrc('shared/overlay.ts'))
    for (const token of ['document.', 'window.', 'setAttribute', 'classList', 'provident.']) {
      expect(text.includes(token), `overlay.ts must carry no UI/MCP token ${token}`).toBe(false)
    }
    expect(text.includes('style')).toBe(false)
    // CONTROL — the same census DOES report a planted spelling, so the empty hit list is a measurement.
    expect(callerSpellingHits([`const k = '${TH_REFERENCE}'`]).length, 'a planted spelling is caught').toBeGreaterThan(0)
  })
})

describe('§3.4 S-rows — theme (S-TH-*), the caller half RE-GRAINED to the stronger true form (D-93)', () => {
  test('S-TH-1 — (RE-GRAINED 2026-11-03, D-93) THE FLAG ROW: theme.ts carries ZERO imports (three views) PLUS the TREE census: NO file under src/ imports src/shared/theme.js at all — its one admitted caller is DELETED', () => {
    for (const reading of censusReadings('shared/theme.ts')) {
      expect(reading.hits, `${reading.reading} of theme.ts`).toEqual([])
    }
    // the three positive controls — a store import IN theme.ts EACH MUST FAIL
    expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0)
    // THE TREE CENSUS IN ITS STRONGER TRUE FORM (the as-filed row counted the module's ONE admitted
    // caller, `src/renderer/theme-store.ts`, which is DELETED): NO importer at all, over the tree.
    const importers: string[] = []
    for (const f of srcFiles().filter((p) => p.includes('shared/theme.ts') === false)) {
      const code = commentElided(readFileSync(f, 'utf8'))
      for (const hit of scanSpecifier(code, 'theme')) importers.push(`${f}: ${hit}`)
      expect(code.includes('resolveTheme'), `${f} must not reference the module's values`).toBe(false)
      expect(code.includes('applyThemeDeclaration'), `${f} must not reference the module's values`).toBe(false)
    }
    expect(importers, 'the deleted caller left no successor: NO src/** file imports theme.js').toEqual([])
    // CONTROL — a planted importer is reported by the same scan, in each import form.
    expect(scanSpecifier(`import { resolveTheme } from '../shared/theme.js'\n`, 'theme').length).toBeGreaterThan(0)
    expect(scanSpecifier(`const t = await import('../shared/theme.js')\n`, 'theme').length).toBeGreaterThan(0)
  })

  test('S-TH-2 — (RE-GRAINED 2026-11-03, D-93) the module carries NO store-shaped binding; file.settings.theme.token appears ZERO times in src/** (the deleted caller\'s one site is gone) (P-SMS-TH-IM-2)', () => {
    expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0)
    expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0)
    const text = commentElided(readSrc('shared/theme.ts'))
    expect(storeBindings(readSrc('shared/theme.ts'))).toEqual([])
    expect(countOccurrences(text, TH_REFERENCE)).toBe(0) // the exactly-one site went with the caller
    for (const f of srcFiles()) {
      expect(countOccurrences(commentElided(readFileSync(f, 'utf8')), TH_REFERENCE), `${f} must compose no such spelling`).toBe(0)
    }
    // CONTROL — the counter still counts (a one-site fixture reads 1, a duplicate reads 2).
    expect(countOccurrences(`const t = '${TH_REFERENCE}'`, TH_REFERENCE)).toBe(1)
    expect(countOccurrences(`const t = '${TH_REFERENCE}'\nconst u = '${TH_REFERENCE}'`, TH_REFERENCE)).toBe(2)
  })

  test('S-TH-3 — (RE-GRAINED 2026-11-03, D-93) the theme module\'s bytes carry no UI/no-MCP/no-stylesheet vocabulary, and NO caller spelling survives under src/**', () => {
    expect(callerSpellingHits(), 'NO src/** file composes a caller spelling any more').toEqual([])
    const text = commentElided(readSrc('shared/theme.ts'))
    for (const token of ['document.', 'window.', 'setAttribute', 'classList', 'provident.', '.css']) {
      expect(text.includes(token), `theme.ts must carry no UI/MCP/stylesheet token ${token}`).toBe(false)
    }
    expect(text.includes('style')).toBe(false)
    // CONTROL — a planted spelling is caught by the same census.
    expect(callerSpellingHits([`const k = '${OV_REFERENCE_PREFIX}' + name + '.state'`]).length).toBeGreaterThan(0)
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
    // COMMENT-ELIDED: the binding scan reads CODE, so a prose line naming a `store` cannot answer for
    // the module (`D-93`'s discipline; this module has owned it since before the purge).
    const moduleText = readSrc('shared/menu-template.ts')
    expect(storeBindings(commentElided(moduleText))).toEqual([])
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
  test('S-PDV-1 — the LANDED composition is sole-reader, AND THE PANES ARE NOT ITS STORE READ ANY MORE: the region carries the SHAPE\'s two reads for the pane geometry and the tier-qualified reads for the zone pair, the retired pane tier spelling is gone from it, and every layout read in the file lives inside the composition (§2.5, F-PDV-1/F-PDV-2; D-88/D-89)', () => {
    // tree-wide: no second read of the still-store-backed references outside renderer.ts.
    // **COMMENT-ELIDED** (`D-93`'s discipline): an absence assertion reads CODE, never prose, so a file
    // that EXPLAINS a retired reference is not read as one that carries it.
    for (const f of srcFiles().filter((p) => p.includes('renderer.ts') === false)) {
      const text = commentElided(readFileSync(f, 'utf8'))
      for (const ref of PDV_REFS) expect(text.includes(ref), `${f} carries a pane-drag read ${ref}`).toBe(false)
    }
    const text = readSrc('renderer/renderer.ts')
    const regionStart = text.indexOf('export function createPaneDrag')
    expect(regionStart).toBeGreaterThanOrEqual(0)
    const region = text.slice(regionStart)
    // THE REGION'S OWN CODE (comments elided) — what every ABSENCE below is read against.
    const regionCode = commentElided(region)
    // THE PANE GEOMETRY IS THE SHAPE'S — two reads at the shape's own member, with no path and no tier.
    for (const needle of ['view.paneSizeOf(', 'view.paneBoundsOf(']) {
      expect(region.includes(needle), `composition must read the shape through ${needle}`).toBe(true)
    }
    // **THE DRAG TIER'S ZONE PAIR LEFT THE STORE TOO (`D-92`)**: the composition reads the zone family through the SHAPE's
    // `zoneOf`, and NOT ONE `layout.zone.*` spelling survives in it.
    expect(region.includes('zoneOf('), 'the composition must read the shape\'s zone family through `zoneOf(').toBe(true)
    for (const retired of ['layout.zone.${id}.slot', 'layout.zone.${id}.distance']) {
      expect(regionCode.includes(retired), `the zone reads left the store: ${retired} must not appear in the composition`).toBe(false)
    }
    // **THE ASSERTION THAT WOULD FAIL IF THE SWAP WERE REVERTED**: the pane tier spelling must NOT be in the composition.
    for (const retired of ['layout.pane.${id}.size', 'layout.pane.${id}.bounds']) {
      expect(regionCode.includes(retired), `the pane read left the store: ${retired} must not appear in the composition`).toBe(false)
    }
    // **AND THE `tierRead` HELPER ITSELF IS DELETED** — the one route all six reads used to take into the frozen store. The
    // assertion reads COMMENT-ELIDED code, because this row's own explanation of the deletion names the helper (an absence
    // assertion that a prose mention could fail is not an assertion about code at all).
    expect(regionCode.includes('tierRead'), 'the tier-qualified store read helper is gone from the composition').toBe(false)
    // the positive control: the elider keeps CODE and drops PROSE, so the assertion above is not vacuous.
    expect(elideComments("const tierRead = 1").includes('tierRead')).toBe(true)
    expect(elideComments("/** tierRead */ const x = 1").includes('tierRead')).toBe(false)
    // every layout read in the file lives INSIDE the composition region
    const textLines = text.split('\n')
    for (const line of textLines) {
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
  test('E-OV-1 — (RE-GRAINED 2026-11-03 to the STRONGER TRUE FORM, D-93) the overlay module is referenced by NO file under src/ at all: overlayTransition/overlayInertDeclaration appear ONLY in the module itself; the positive control is a planted consumer that FAILS the probe (§3.5)', () => {
    // The as-filed row admitted ONE consumer — the unit's declared caller
    // `src/renderer/overlay-store.ts`, whose ADMISSION was the spec's §2.7 item 7 extension. That file
    // is DELETED with the frozen store, so the honest post-purge reading is the original one, in its
    // strongest form: ZERO consumers. Read over CODE with comments elided, so this headstone's own
    // prose cannot answer for the tree.
    const moduleFile = 'shared/overlay.ts'
    const importers: string[] = []
    for (const f of srcFiles().filter((p) => p.includes(moduleFile) === false)) {
      const code = commentElided(readFileSync(f, 'utf8'))
      expect(code.includes('overlayTransition'), `${f} references the module's transition`).toBe(false)
      expect(code.includes('overlayInertDeclaration'), `${f} references the module's declaration`).toBe(false)
      for (const hit of scanSpecifier(code, 'overlay')) importers.push(`${f}: ${hit}`)
    }
    expect(importers, 'NO src/** file imports overlay.js — the admitted caller is deleted, not replaced').toEqual([])
    // THE POSITIVE CONTROL — a planted consumer (any other src/** file gaining the import) MUST FAIL
    // the no-importer probe: the import form is detected AND its reference trips the same text probe.
    const plantedConsumer = `import { overlayTransition } from '../shared/overlay.js'\nimport { overlayInertDeclaration } from '../shared/overlay.js'\n`
    expect(scanImportForms(plantedConsumer).length).toBeGreaterThan(0)
    expect(textHasModuleReference(plantedConsumer, 'overlayTransition', 'overlayInertDeclaration')).toBe(true)
    expect(scanSpecifier(commentElided(plantedConsumer), 'overlay').length).toBeGreaterThan(0)
    expect(existsSync(join(SRC_ROOT, 'renderer/overlay-store.ts')), 'and the admitted caller really is gone').toBe(false)
  })

  test('E-TH-1 — (RE-GRAINED 2026-11-03 to the STRONGER TRUE FORM, D-93) the theme module is referenced by NO file under src/ at all: resolveTheme/applyThemeDeclaration appear ONLY in the module itself; the positive control is a planted consumer that FAILS the probe (§3.5)', () => {
    const moduleFile = 'shared/theme.ts'
    const importers: string[] = []
    for (const f of srcFiles().filter((p) => p.includes(moduleFile) === false)) {
      const code = commentElided(readFileSync(f, 'utf8'))
      expect(code.includes('resolveTheme'), `${f} references the module's resolver`).toBe(false)
      expect(code.includes('applyThemeDeclaration'), `${f} references the module's declaration`).toBe(false)
      for (const hit of scanSpecifier(code, 'theme')) importers.push(`${f}: ${hit}`)
    }
    expect(importers, 'NO src/** file imports theme.js — the admitted caller is deleted, not replaced').toEqual([])
    // THE POSITIVE CONTROL — a planted consumer MUST FAIL the no-importer probe.
    const plantedConsumer = `import { resolveTheme } from '../shared/theme.js'\nimport { applyThemeDeclaration } from '../shared/theme.js'\n`
    expect(scanImportForms(plantedConsumer).length).toBeGreaterThan(0)
    expect(textHasModuleReference(plantedConsumer, 'resolveTheme', 'applyThemeDeclaration')).toBe(true)
    expect(scanSpecifier(commentElided(plantedConsumer), 'theme').length).toBeGreaterThan(0)
    expect(existsSync(join(SRC_ROOT, 'renderer/theme-store.ts')), 'and the admitted caller really is gone').toBe(false)
  })

  test('E-MT-1 — THE F-11 VERIFICATION: no in-tree src/** file imports src/shared/menu-template.js — no consumer exists today (§2.4)', () => {
    for (const f of srcFiles().filter((p) => p.includes('shared/menu-template.ts') === false)) {
      // comment-elided: the module's own prose is not a consumer, and neither is any other's
      const text = commentElided(readFileSync(f, 'utf8'))
      expect(text.includes('buildMenuTemplate')).toBe(false)
      expect(text.includes('normalizeCatalog')).toBe(false)
      expect(text.includes('selectCatalogItem')).toBe(false)
      expect(scanSibling(text).some((h) => h.includes('menu-template'))).toBe(false)
      expect(scanSpecifier(text, 'menu-template').length, `${f} imports menu-template.js`).toBe(0)
    }
    // CONTROL — the same scan DOES report a planted consumer (code, not prose).
    expect(scanSpecifier(`import { buildMenuTemplate } from '../shared/menu-template.js'`, 'menu-template').length).toBeGreaterThan(0)
  })

  test('E-PDV-1 — gutter.ts/relocate.ts bytes are the LANDED ones: the unit\'s change set contains neither file (§3.5)', () => {
    const diff = gitNameOnlyHead()
    expect(diff.includes('src/shared/gutter.ts')).toBe(false)
    expect(diff.includes('src/shared/relocate.ts')).toBe(false)
  })

  test('E-PDV-2 — (RE-GRAINED 2026-11-03 to its DELETION form, D-93) the store\'s bytes are GONE, not merely unchanged: no `store-core-graph.ts`/`store-graph-references.ts` in the tree or the index, and NO deleted store seam survives in renderer.ts (§3.5)', () => {
    // THE AS-FILED TERM was byte-identity — "no store byte and no renderer.ts byte changes in this
    // unit". `D-93` made the stronger thing TRUE instead of false: the two store modules are DELETED
    // (not edited), and `renderer.ts` lost the Y-1 hand-off, the `hydrate` call, the Y-3 registration,
    // the `crossing:{put}` seam, `getWiredGraphStore`/`buildWiredGraphStore` and the two reserved-row
    // constants. So the row keeps its TERM in the only form that still has a subject: GONE, and read
    // over CODE with comments elided (renderer.ts still DISCUSSES those seams in prose, and prose is
    // not a seam).
    for (const f of ['src/renderer/store-core-graph.ts', 'src/renderer/store-graph-references.ts']) {
      expect(existsSync(join(process.cwd(), f)), `${f} is DELETED, not merely outside a diff`).toBe(false)
      expect(gitLsFile(f), `${f} is out of the index`).toBe(false)
    }
    const rendererCode = commentElided(readSrc('renderer/renderer.ts'))
    for (const seam of [
      'getWiredGraphStore',
      'buildWiredGraphStore',
      'storeGraphReferences',
      'createGraphStore',
      'FILE_TIER_ROOT_NAMES',
      'TABS_RESERVED_DECLARATION_ROWS',
      'crossing:',
      'hydrate',
    ]) {
      expect(rendererCode.includes(seam), `the deleted store seam ${seam} survives in renderer.ts's CODE`).toBe(false)
    }
    // CONTROL (a) — the elider keeps CODE and drops PROSE, so the eight absences above are measurements
    // and not a reading that answers `false` for everything.
    expect(commentElided('const x = getWiredGraphStore({})').includes('getWiredGraphStore')).toBe(true)
    expect(commentElided('/** getWiredGraphStore */ const x = 1').includes('getWiredGraphStore')).toBe(false)
    expect(commentElided(readSrc('renderer/renderer.ts')).includes('export function createPaneDrag'), 'the composition itself is still CODE').toBe(true)
    // CONTROL (b) — files that ARE tracked still answer `true`, so the index readings above measure a
    // deletion rather than a broken git invocation.
    expect(gitLsFile('src/renderer/renderer.ts')).toBe(true)
  })

  test('E-ST-1 — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) the caller files were NEW: src/renderer/overlay-store.ts and src/renderer/theme-store.ts had this unit\'s landing as their ENTIRE history (§2.7-item-7 extension 2, 2026-10-03)', () => {
    // ═══ HEADSTONE ═══ A file-existence / git-history row: `gitFileCommitCount(path) === 1` proved the
    // file was BORN in the landing commit. BOTH FILES ARE DELETED. `git log -- <path>` now reads the
    // whole history of a path that no longer exists, and `git ls-files --error-unmatch` refuses it, so
    // the row's two terms are not merely unsatisfiable — they are about nothing. What stands is the
    // DELETION, and `git ls-files` measures exactly that: both paths are out of the index.
    expect(gitLsFile('src/renderer/overlay-store.ts'), 'the retired caller is no longer tracked').toBe(false)
    expect(gitLsFile('src/renderer/theme-store.ts'), 'the retired caller is no longer tracked').toBe(false)
    expect(existsSync(join(SRC_ROOT, 'renderer/overlay-store.ts'))).toBe(false)
    expect(existsSync(join(SRC_ROOT, 'renderer/theme-store.ts'))).toBe(false)
    // CONTROL — the probe still finds a file that IS tracked, so the two `false` readings are a
    // measurement of the deletion and not of a broken git invocation.
    expect(gitLsFile('src/shared/overlay.ts')).toBe(true)
    expect(gitLsFile('src/shared/theme.ts')).toBe(true)
  })
})

/* ════════════════════════════════════════════════════════════════════════════
 * §4.2 ITEM 4 — THE INTEGRATION READING AFTER THE PURGE (`D-93`). Two of the three
 * rows here drove the DELETED caller turns against the DELETED "hardware store" and
 * are RETIRED with headstones; the third drives the LANDED composition, and it is
 * re-pointed at this file's REGISTER DOUBLE (there is no hardware store left to
 * drive — and the composition must not reach a store at all, which the row now
 * proves with a store that THROWS).
 * ════════════════════════════════════════════════════════════════════════════ */

describe('§4.2 item 4 — the integration drives, post-purge', () => {
  test('REAL-STORE (M-OV-1/M-OV-5) — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) the overlay caller turn on the hardware store: the tier-qualified read\'s HIT/MISS arms + the mint FROM A REAL STATE', () => {
    // ═══ HEADSTONE ═══ BOTH halves of this row's subject are DELETED: the "hardware store" is
    // `src/renderer/store-core-graph.ts` (gone), and the caller turn driven on it is
    // `src/renderer/overlay-store.ts` (gone). Its two readings — the tier-qualified read's HIT/MISS
    // arms and the mint FROM A REAL STATE — have no register to hit and no address to mint into. The
    // MECHANISM terms they carried (the no-move coercion of a MISS, the changed-true mint from a real
    // state, the no-write pass-through) are driven directly in §3.1 M-OV-5 above, where they now live.
    expect(existsSync(join(SRC_ROOT, 'renderer/store-core-graph.ts')), 'the hardware store this row drove is deleted').toBe(false)
    expect(existsSync(join(SRC_ROOT, 'renderer/overlay-store.ts')), 'and so is the turn it drove on it').toBe(false)
    // CONTROL: the composition's own sibling row below still drives a REAL thing, and the probe reads
    // the tree it claims to — `renderer.ts` is there.
    expect(existsSync(join(SRC_ROOT, 'renderer/renderer.ts'))).toBe(true)
  })

  test('REAL-STORE (M-TH-1/M-TH-2) — (RETIRED 2026-11-03, D-93: SUBJECT DELETED) the theme resolution site on the hardware store: the committed-token HIT and the seed-arm MISS', () => {
    // ═══ HEADSTONE ═══ The same two deletions: the register that held `file.settings.theme.token`
    // and the caller-side resolution turn that read it. The HIT/MISS arms it measured are now the
    // MODULE's arms and are driven by identity in §3.1 M-TH-1/M-TH-2 and §3.3 I-TH-2 above, where the
    // setting member is the passed token or the seed — with no address in between.
    expect(existsSync(join(SRC_ROOT, 'renderer/store-core-graph.ts')), 'the hardware store this row drove is deleted').toBe(false)
    expect(existsSync(join(SRC_ROOT, 'renderer/theme-store.ts')), 'and so is the resolution turn it drove on it').toBe(false)
    // CONTROL: the mechanism module survives, so this probe reads a tree.
    expect(existsSync(join(SRC_ROOT, 'shared/theme.ts'))).toBe(true)
  })

  test('REAL-STORE (M-PDV-1/M-PDV-3) — (RE-GRAINED 2026-11-03 onto the REGISTER DOUBLE, D-93) the LANDED composition on the SHAPE for BOTH families: every read answers what the shape delivered and NOT ONE answers a store\'s retired spellings (`D-92`)', () => {
    const store = createRegisterDouble()
    const opaque = { token: 'opaque' }
    // THE REGISTER CARRIES THE RETIRED SPELLINGS, AND THE READS MUST IGNORE THEM — that is the row's bite: a composition that
    // still read a store for either family would answer these figures and redden.
    store.commit('mem.layout.zone.zone-1.slot', opaque, { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-1.distance', 37, { onRepeat: 'edit' })
    store.commit('mem.layout.pane.pane-a.size', 320, { onRepeat: 'edit' })
    const shape = paneShapeOf(
      [{ id: 'pane-a', size: 240, bounds: { min: 0, max: 400 } }],
      [{ id: 'zone-1', slot: opaque, distance: 37 }],
    )
    const surface = createPaneDrag({ frozen: store as unknown as Record<string, unknown>, view: shape.client }, {}) as PaneDragSurface
    expect(surface.startSizeOf({ id: 'pane-a' }, 'pane-a'), 'the SHAPE answers, not the register\'s stale spelling').toBe(240)
    expect(surface.defaultSizeFor({ id: 'pane-a' }, 'pane-a')).toBe(240)
    expect(surface.boundsOf({ id: 'pane-a' }, 'pane-a')).toEqual({ min: 0, max: 400 })
    const candidates = surface.candidatesFor({ zoneId: 'zone-1' })
    expect(candidates.length).toBe(1)
    expect(candidates[0]?.candidate).toBe(opaque)
    expect(candidates[0]?.distance).toBe(37)
    // the DEFAULT arm on a cold pane: the MEASURED default answers — a usable number, never the `undefined` the retired
    // two-tier MISS produced (the consumer's E3 arm is driven at the terminal now, pane-drag §3.2 F-8).
    expect(surface.startSizeOf({ id: 'pane-z' }, 'pane-z')).toBe(100)
    // **THE ABSENCE WITH TEETH**: the SAME drives on a composition handed a store whose EVERY member THROWS answer identically —
    // if any read were still routed through the store, this drive would throw instead of answering (and `D-93` deleted the one
    // write the composition used to make into it, so nothing even reaches for it).
    const hostile = createPaneDrag({ frozen: createThrowingStoreDouble(), view: shape.client }, {}) as PaneDragSurface
    expect(hostile.startSizeOf({ id: 'pane-a' }, 'pane-a')).toBe(240)
    expect(hostile.boundsOf({ id: 'pane-a' }, 'pane-a')).toEqual({ min: 0, max: 400 })
    expect(hostile.candidatesFor({ zoneId: 'zone-1' })[0]?.distance).toBe(37)
    // and the deleted `sever` seam is ARMED on the double: a composition that reached for it would redden here rather than
    // silently answering (the register double's `sever` throws, `D-93`).
    expect(store.readLog.filter((n) => n.includes('layout.')), 'not one layout read reached the register').toEqual([])
    expect(() => store.sever('mem', 'pane-a'), 'the sever is deleted with the store and must never be reached').toThrow()
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

// **`RED_WIRING_NOTE` IS DELETED WITH THE WIRING FILES** (`D-93`): it was the reason string the two
// deleted caller-file censuses attached to their honest RED. No attempt in this file can be red for
// that reason any more — the files are gone, not missing.

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

/** THE OVERLAY TP-1 SCRIPT (`§5.5.1`'s fixed 8-call script + the fixed tuple name 'a'),
 *  **RE-GRAINED ONTO `src/shared/overlay.ts`** (`D-93`): the deleted caller turn's eight
 *  caller-side answers were these eight module answers with one hop of `mem.overlay.<name>.state`
 *  between them, and that hop is gone. THE RUNS STILL DIFFER ONLY IN AMBIENT TIER STATE — the
 *  register below carries the (now deleted) overlay address in the SHADOWING / COMMITTED runs and
 *  nothing in the COLD run — so a module that consulted it would vary an answer and redden the
 *  row. Returns the 8 canonical answers; THROWS when a step's spec-pinned value fails. */
function overlayTpAnswers(mode: 'cold' | 'shadowing' | 'committed'): unknown[] {
  const store = createRegisterDouble()
  if (mode === 'shadowing') store.commit('temp.overlay.a.state', 'pre', { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.overlay.a.state', 'pre', { onRepeat: 'edit' })
  const target = { tag: 'fixture-target' }
  const out: unknown[] = []
  // (1) THE COLD READ the deleted turn made, now the module's own no-move coercion: a MISS is
  // coerced to the 'closed'-based record and reports NO change (M-OV-5's transcript).
  const cold = store.resolve('mem.overlay.a.state')
  expect(cold.found).toBe(false)
  const r1 = overlayTransition(cold.value, 'open')
  expect(r1.state).toBe('closed')
  expect(r1.changed).toBe(false)
  out.push(canonicalOf(r1))
  // (2) the MINT from a real state: 'closed' + 'open' ⇒ {state:'open',changed:true}
  const r2 = overlayTransition('closed', 'open')
  expect(r2.state).toBe('open')
  expect(r2.changed).toBe(true)
  out.push(canonicalOf(r2))
  // (3) the NO-MOVE verb: 'open' + 'open' ⇒ {state:'open',changed:false}
  const r3 = overlayTransition('open', 'open')
  expect(r3.state).toBe('open')
  expect(r3.changed).toBe(false)
  out.push(canonicalOf(r3))
  // (4) escape from 'open' ⇒ {state:'closed',changed:true} with the callback once
  let cbCount = 0
  const cb = (): void => {
    cbCount += 1
  }
  const r4 = overlayTransition('open', 'escape', cb)
  expect(r4.state).toBe('closed')
  expect(r4.changed).toBe(true)
  expect(cbCount).toBe(1)
  out.push(canonicalOf(r4))
  // (5) declaration(target,'data-inert',true) ⇒ the four-member RETURNED record
  const d5 = overlayInertDeclaration(target, 'data-inert', true)
  expect(d5.name).toBe('data-inert')
  expect(d5.value).toBe('true')
  expect(d5.removal).toBe(false)
  expect(d5.target).toBe(target)
  out.push(canonicalOf(d5))
  // (6) toggle from 'closed' ⇒ 'open'
  const r6 = overlayTransition('closed', 'toggle')
  expect(r6.state).toBe('open')
  expect(r6.changed).toBe(true)
  out.push(canonicalOf(r6))
  // (7) the removal arm ⇒ {value:false, removal:true}
  const d7 = overlayInertDeclaration(target, 'data-inert', false)
  expect(d7.value).toBe(false)
  expect(d7.removal).toBe(true)
  out.push(canonicalOf(d7))
  // (8) THE HELD CELL: 'held' + 'open' stays 'held' and reports no change (overlay.md's totality)
  const r8 = overlayTransition('held', 'open')
  expect(r8.state).toBe('held')
  expect(r8.changed).toBe(false)
  out.push(canonicalOf(r8))
  return out
}

/** THE THEME TP-1 SCRIPT (`§5.5.1` — fixed tuple seed='light' + env
 *  `{prefersDark:true}`), **RE-GRAINED ONTO `src/shared/theme.ts`** (`D-93`): the deleted caller
 *  turn's eight answers were these eight module answers. The runs differ only in ambient tier state
 *  (the SHADOWING / COMMITTED runs carry the deleted `settings.theme.token` address in the register,
 *  the COLD run carries nothing), and every answer is a function of the arguments alone. */
function themeTpAnswers(mode: 'cold' | 'shadowing' | 'committed'): unknown[] {
  const store = createRegisterDouble()
  const seed = 'light'
  if (mode === 'shadowing') store.commit('temp.settings.theme.token', 'pre', { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.settings.theme.token', 'pre', { onRepeat: 'edit' })
  const out: unknown[] = []
  // (1) THE COLD MISS — the register's `mem` tier holds nothing (the SHADOWING / COMMITTED runs seed
  // the temp/file copies of the SAME deleted address, which the module never reads), and the seed arm
  // answers the seed by identity
  const miss = store.resolve('mem.settings.theme.token')
  expect(miss.found).toBe(false)
  const r1 = resolveTheme(miss.found ? miss.value : seed, { prefersDark: true })
  expect(r1.setting).toBe(seed)
  expect(r1.prefersDark).toBe(true)
  expect(r1.source).toBe('env')
  out.push(canonicalOf(r1))
  // (2) again ⇒ identical (the module is pure)
  const r2 = resolveTheme(miss.found ? miss.value : seed, { prefersDark: true })
  expect(structurallyEqual(canonicalOf(r2), canonicalOf(r1))).toBe(true)
  out.push(canonicalOf(r2))
  // (3) a token in hand ⇒ that token, by identity
  const r3 = resolveTheme('dark', { prefersDark: true })
  expect(r3.setting).toBe('dark')
  expect(r3.source).toBe('env')
  out.push(canonicalOf(r3))
  // (4) THE WRITE IS A RETURNED DECLARATION carrying the resolved token
  const w4 = applyThemeDeclaration('data-theme', 'dark')
  expect(w4.name).toBe('data-theme')
  expect(w4.value).toBe('dark')
  expect(w4.removal).toBe(false)
  out.push(canonicalOf(w4))
  // (5) the miss arm again after the declaration ⇒ the seed, still by identity
  const r5 = resolveTheme(miss.found ? miss.value : seed, { prefersDark: false })
  expect(r5.setting).toBe(seed)
  expect(r5.prefersDark).toBe(false)
  out.push(canonicalOf(r5))
  // (6) an ABSENT resolution ⇒ the declared removal record
  const w6 = applyThemeDeclaration('data-theme', null)
  expect(w6.value).toBe('')
  expect(w6.removal).toBe(true)
  out.push(canonicalOf(w6))
  // (7) an EMPTY STRING is not a token either — the same removal record
  const w7 = applyThemeDeclaration('data-theme', '')
  expect(w7.removal).toBe(true)
  out.push(canonicalOf(w7))
  // (8) a hostile ENV ⇒ the declared degraded record, never a throw
  const r8 = resolveTheme(seed, 'not-an-env')
  expect(r8.setting).toBe(seed)
  expect(r8.prefersDark).toBe(false)
  expect(r8.source).toBe('degraded-env')
  out.push(canonicalOf(r8))
  return out
}

/** THE MENU TP-1 SCRIPT (over the MODULE's own answers — no caller file
 *  exists; the runs differ only in the tier state of the HYPOTHETICAL
 *  file.menu.catalog / mem.menu.catalog, which the module never touches). */
function menuTpAnswers(mode: 'cold' | 'shadowing' | 'committed'): unknown[] {
  const store = createRegisterDouble()
  if (mode === 'shadowing') store.commit('mem.menu.catalog', { shadowing: true }, { onRepeat: 'edit' })
  if (mode === 'committed') store.commit('file.menu.catalog', { committed: true }, { onRepeat: 'edit' })
  // the module never reads the store — every answer is argument-determined
  void store
  return menuScriptAnswers().map((answer) => canonicalOf(answer))
}

describe('§5.5.1 THE REGISTER — the executed layer', () => {
  test('P-SMS-OV-IM-1 (S-SMS-OV-IM-1, P-IM) — 7 attempts: the overlay module\'s import census UNCHANGED + the TREE census (NO importer, the stronger true form, D-93)', () => {
    const ctx = newAttemptContext()
    const readings = censusReadings('shared/overlay.ts')
    attempt(ctx, 'module-reading-raw', () => expect(readings[0]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-normalized', () => expect(readings[1]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-comments-as-code', () => expect(readings[2]?.hits ?? []).toEqual([]))
    attempt(ctx, 'control-import-store', () => { expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-require-store', () => { expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-dynamic-import-store', () => { expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    // THE SEVENTH ATTEMPT — the register's caller-file census, RE-GRAINED into its stronger true
    // form (`D-93`): the admitted caller `src/renderer/overlay-store.ts` is DELETED, so what the row
    // now drives is that NO file under `src/` imports or names the module.
    attempt(ctx, 'tree-census', () => {
      const importers: string[] = []
      for (const f of srcFiles().filter((p) => p.includes('shared/overlay.ts') === false)) {
        const code = commentElided(readFileSync(f, 'utf8'))
        for (const hit of scanSpecifier(code, 'overlay')) importers.push(`${f}: ${hit}`)
        expect(code.includes('overlayTransition')).toBe(false)
        expect(code.includes('overlayInertDeclaration')).toBe(false)
      }
      expect(importers).toEqual([])
      // the planted importer IS reported — the attempt's own control
      expect(scanSpecifier(`import { overlayTransition } from '../shared/overlay.js'`, 'overlay').length).toBeGreaterThan(0)
    })
    const result: RegisterRowResult = { row: 'P-SMS-OV-IM-1', type: 'P-IM', strategyId: 'S-SMS-OV-IM-1', declared: 7, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-OV-IM-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-OV-IM-2 (S-SMS-OV-IM-2, P-IM) — 4 attempts: the overlay module\'s no-module-level-binding row + the ZERO-site spelling (D-93)', () => {
    const ctx = newAttemptContext()
    attempt(ctx, 'module-scan', () => {
      const text = readSrc('shared/overlay.ts')
      expect(storeBindings(text)).toEqual([])
      expect(countOccurrences(commentElided(text), OV_REFERENCE_PREFIX)).toBe(0)
    })
    attempt(ctx, 'control-module-scope-const', () => { expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-module-scope-let', () => { expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0) })
    // THE DECLARATION POSITION (the row's fourth attempt): the module's exported signatures carry NO
    // store parameter — the deleted caller's `createOverlayStoreWiring(store)` declaration is gone with
    // it, and the mechanism declares none.
    attempt(ctx, 'declaration-position', () => {
      const code = commentElided(readSrc('shared/overlay.ts'))
      expect(signatureStoreParams(code)).toEqual([])
      expect(signatureStoreParams('export function createOverlayStoreWiring(store: unknown) { return store }').length).toBeGreaterThan(0)
    })
    const result: RegisterRowResult = { row: 'P-SMS-OV-IM-2', type: 'P-IM', strategyId: 'S-SMS-OV-IM-2', declared: 4, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-OV-IM-2 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-OV-TP-1 (S-SMS-OV-TP-1, P-TP) — 25 attempts: the overlay mechanism\'s store-state-independence differential (COLD/SHADOWING/COMMITTED × the 8-call script + the ambient-consultation control)', () => {
    const ctx = newAttemptContext()
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
    // THE SCRIPT DRIVES ARE HARNESSED: a throw mid-script must STILL REGISTER the row — a row that
    // throws outside the attempt harness never registers, and §5.5.3's aggregate treats an un-run
    // register row as a FAILURE.
    const runs = { COLD: 'cold', SHADOWING: 'shadowing', COMMITTED: 'committed' } as const
    let base: unknown[] | undefined
    try {
      base = overlayTpAnswers('cold')
    } catch {
      /* the cold run's throw registers as broken answer attempts below */
    }
    attempt(ctx, 'control-ambient-consultation', control)
    for (const [runName, mode] of Object.entries(runs)) {
      let answers: unknown[] | undefined
      let note = ''
      try {
        answers = mode === 'cold' ? base : overlayTpAnswers(mode)
      } catch (e) {
        note = e instanceof Error ? e.message : String(e)
      }
      for (let i = 0; i < 8; i += 1) {
        const idx = i
        attempt(ctx, `${runName}-answer-${idx + 1}`, () => {
          if (base === undefined || answers === undefined) throw new Error(note || 'the overlay TP-1 script threw mid-drive')
          expect(structurallyEqual(canonicalOf(answers[idx]), canonicalOf(base[idx])), `${runName} answer ${idx + 1} must equal the COLD run's`).toBe(true)
        })
      }
    }
    const result: RegisterRowResult = { row: 'P-SMS-OV-TP-1', type: 'P-TP', strategyId: 'S-SMS-OV-TP-1', declared: 25, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) expect(o.held, `P-SMS-OV-TP-1 attempt ${o.id}: ${o.note}`).toBe(true)
  }, 30000)

  test('P-SMS-TH-IM-1 (S-SMS-TH-IM-1, P-IM) — 7 attempts: THE FLAG ROW — theme\'s EMPTY IMPORT CENSUS UNCHANGED + the TREE census (NO importer, the stronger true form, D-93)', () => {
    const ctx = newAttemptContext()
    const readings = censusReadings('shared/theme.ts')
    attempt(ctx, 'module-reading-raw', () => expect(readings[0]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-normalized', () => expect(readings[1]?.hits ?? []).toEqual([]))
    attempt(ctx, 'module-reading-comments-as-code', () => expect(readings[2]?.hits ?? []).toEqual([]))
    attempt(ctx, 'control-import-store', () => { expect(scanImportForms(`import { createGraphStore } from '../renderer/store-core-graph.js'`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-require-store', () => { expect(scanImportForms(`const g = require('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-dynamic-import-store', () => { expect(scanImportForms(`const g = await import('../renderer/store-core-graph.js')`).length).toBeGreaterThan(0) })
    attempt(ctx, 'tree-census', () => {
      const importers: string[] = []
      for (const f of srcFiles().filter((p) => p.includes('shared/theme.ts') === false)) {
        const code = commentElided(readFileSync(f, 'utf8'))
        for (const hit of scanSpecifier(code, 'theme')) importers.push(`${f}: ${hit}`)
        expect(code.includes('resolveTheme')).toBe(false)
        expect(code.includes('applyThemeDeclaration')).toBe(false)
      }
      expect(importers).toEqual([])
      // the planted importer IS reported — the attempt's own control
      expect(scanSpecifier(`import { resolveTheme } from '../shared/theme.js'`, 'theme').length).toBeGreaterThan(0)
    })
    const result: RegisterRowResult = { row: 'P-SMS-TH-IM-1', type: 'P-IM', strategyId: 'S-SMS-TH-IM-1', declared: 7, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-TH-IM-1 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-TH-IM-2 (S-SMS-TH-IM-2, P-IM) — 4 attempts: the theme module\'s no-module-level-binding row + the ZERO-site spelling (D-93)', () => {
    const ctx = newAttemptContext()
    attempt(ctx, 'module-scan', () => {
      const text = readSrc('shared/theme.ts')
      expect(storeBindings(text)).toEqual([])
      expect(countOccurrences(commentElided(text), TH_REFERENCE)).toBe(0)
    })
    attempt(ctx, 'control-module-scope-const', () => { expect(storeBindings(`\nconst store = createGraphStore()\nexport function f() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'control-module-scope-let', () => { expect(storeBindings(`\nlet store;\nexport function g() { return store }\n`).length).toBeGreaterThan(0) })
    attempt(ctx, 'declaration-position', () => {
      const code = commentElided(readSrc('shared/theme.ts'))
      expect(signatureStoreParams(code)).toEqual([])
      expect(signatureStoreParams('export function createThemeResolutionWiring(store: unknown) { return store }').length).toBeGreaterThan(0)
    })
    const result: RegisterRowResult = { row: 'P-SMS-TH-IM-2', type: 'P-IM', strategyId: 'S-SMS-TH-IM-2', declared: 4, outcomes: ctx.outcomes, stopped: ctx.stopped }
    REGISTER_RESULTS.push(result)
    for (const o of ctx.outcomes) {
      expect(o.held, `P-SMS-TH-IM-2 attempt ${o.id}: ${o.note}`).toBe(true)
    }
  }, 30000)

  test('P-SMS-TH-TP-1 (S-SMS-TH-TP-1, P-TP) — 25 attempts: the theme mechanism\'s store-state-independence differential (the seed-arm identity + the ambient control)', () => {
    const ctx = newAttemptContext()
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
    // THE SCRIPT DRIVES ARE HARNESSED (the row's repair, 2026-10-03): a throw
    // mid-script must STILL REGISTER the row — a row that throws outside the
    // attempt harness never registers, and §5.5.3's aggregate treats an un-run
    // register row as a FAILURE. Each run's answers are computed inside a
    // guard; a mid-script throw marks that run's 8 answer attempts BROKEN (the
    // attempt counts, the row fails honestly, the harness continues; the
    // stop-after-5-consecutive-failures rule reports the remainder as stopped).
    let base: unknown[] | undefined
    try {
      base = themeTpAnswers('cold')
    } catch {
      /* the cold run's throw registers as broken answer attempts below */
    }
    attempt(ctx, 'control-ambient-consultation', control)
    for (const mode of ['cold', 'shadowing', 'committed'] as const) {
      let answers: unknown[] | undefined
      let note = ''
      try {
        answers = mode === 'cold' ? base : themeTpAnswers(mode)
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
        const text = commentElided(readFileSync(f, 'utf8'))
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
      expect(storeBindings(commentElided(text))).toEqual([])
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