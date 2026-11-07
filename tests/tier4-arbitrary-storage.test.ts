// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
/**
 * ============================================================================
 * S2 = U-TIER4-ARBITRARY-STORAGE — THE SURVIVING BATTERY, RE-GRAINED ON THE
 * `provident-operator-settings` / `settings-surface` LANDING.  Author: TestWriter.
 * Layer: `[H]`/`[T]` per `§1.4`; the `[U]` battery is gate 6's and is NOT driven
 * here (`§5.2` item 6).
 *
 * WHAT HAPPENED TO THIS FILE, NAMED (never smoothed — D-1 §4, `RCA-8(d)`): the store
 * this battery was authored against — `src/main/security-store.ts`, its five-member
 * surface, its two-token receipt vocabulary, its 16-member refusal union, its on-disk
 * record, its `/tmp` staging mechanics, its sanitize-and-ingest arms and its frozen
 * byte-pins — was DELETED (`E-1`) and is DISREGARDED, not carried: no shim, no dual
 * write.  The operator's record now lives in its own `provident-storeroom` instance in
 * `src/main/operator-settings/index.ts`, and the operator path's ONE reference to it —
 * the construction, the boot read, the four verbs `main.ts` delegates its three routes
 * to, and the holder's sole writer — is `src/main/settings-surface/index.ts` (`E-3`).
 *
 * SO EVERY ROW WHOSE BODY CONSTRUCTED OR DROVE THAT STORE RETIRES WITH IT, and none is
 * re-pointed at the instance to fake a store: `§2.1`'s `P-T4-CENSUS`, `P-T4-OPTIONS`,
 * `P-T4-EXPORTS`, `P-T4-TYPES` · `§3.1`'s `M-1`…`M-10` · `§3.2`'s `FS-T4-01`…`FS-T4-08`,
 * `FS-T4-10`, `FS-T4-11` · the whole `§4.2` authoring-order row · the whole `§5.5.1`
 * register block (`REGISTER-EXEC`, `REGISTER-TERMS`, `REGISTER-REPORT`,
 * `REGISTER-CONTROL`, `REGISTER-GREEN` and the executor/arithmetic only they used) ·
 * `S2 REPAIR`'s `D-I`, `D-II`, `D-III`, `D-IV`, `D-IX` and `D-X` (the last as a CHAIN:
 * `SECURITY_STORE_PIN` and the five terms it kept awake, with every reader of them).
 *
 * WHAT SURVIVES, AND WHY EACH STILL HAS A SUBJECT:
 *  · `P-T4-TOKEN-HOME` — `tier4-closed` and its message are still declared and exported
 *    beside `EXCLUSION_CLOSED` in `mcp-server.ts`; unmoved figures.
 *  · `M-11` — a self-transition is a lawful no-op and an outside value is refused AS A
 *    VALUE; the transition still lives in `security.ts` (`withExclusion`).  Unmoved.
 *  · `FS-T4-09` — **RETIRED 2026-11-06 (`D-117`): ITS ONLY SUBJECT WAS THE HOLDER, AND THE
 *    HOLDER IS DELETED.**  `src/main/tier4-state.ts`, its declared surface, its declared
 *    initial `STORE-OPEN`, its sole writer and the "zero consults" census it carried all named
 *    `src/main/tier4-state.ts`; the file is gone, so the row had no referent to re-grain onto.
 *    WHAT REPLACES IT IS THE OTHER SIDE OF THE SAME QUESTION, and it is `FS-T4-12`'s now.
 *  · `FS-T4-12`, `FS-T4-13` — the one-home/one-writer census and the pane's refusal to
 *    paint a state the carrier never supplied; unmoved figures.
 *  · `§2.6`'s four rows, `D-VI`, and the gate-6 `F-1` pair — the pane's re-sourced cells,
 *    the additive `· refused: tier4-closed` segment and the PRE-CARRIER family; unmoved.
 *  · `D-VII` (RE-GRAINED, `C-3`) — the boot ORDER, read at the composition sites that
 *    moved: `createSettingsSurface(` at `main.ts:108`, the boot read
 *    `settingsSurface.read()` at `:109`, the gate at `:115`, the CLOSE
 *    `settingsSurface.attach(mcp)` at `:527`, `new BrowserWindow(` at `:529` and
 *    `await mcp.start()` at `:545`.  The order survives IN KIND (`D-19`, `D-vii`).
 *  · `D-VIII` (RE-GRAINED, `C-3`) — the carrier's honesty: `main.ts:411` is ONE
 *    delegation to `settingsSurface.read()`, and THAT verb mints both additive members
 *    (`read`, `exclusion`) from ONE reading of the instance's record.
 *
 * ── THE TYPE SHIM, STILL IN FORCE ────────────────────────────────────────────
 * Leg 4 is `npm run typecheck:tests` (`tsc -p tsconfig.tests.json`) under `--strict`.
 * Every not-yet-widened surface is read through a NARROW local receiver with an
 * explicit `as unknown as` at the call site; the shim changes NO runtime value and
 * weakens NO assertion.
 *
 * ── THE DECLARED LIMIT, STATED (never hidden) ────────────────────────────────
 * `§1.4` item 3: NO timing figure is claimed anywhere; every drive asserts ORDER and
 * OUTCOME.  The `[H]` rows that read `main.ts`'s composition and the surface module's
 * carrier verb are SOURCE PROBES WITH A DECLARED LIMIT, exactly the form
 * `docs/specs/secure-store-discipline.md` `§9` item 5(c) permits for a clause whose
 * seam the contract forbids the unit to export; each such row names its limit in-line.
 * ============================================================================
 */
import { beforeAll, describe, expect, it } from 'vitest'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
import { createSecurityClient } from '../src/renderer/security-client.js'
import { SecurityGate, exclusionAllowsWork } from '../src/main/security.js'
import {
  DECLARED_CARRIER_MEMBERS, LANDED_CARRIER_MEMBERS, MAIN_SRC, MCP_SERVER_SRC, OPERATOR_SETTINGS_SRC,
  SECURE_PANELS_SRC, SETTINGS_SURFACE_SRC, STATE_MCP_DISABLED, STATE_MCP_ENABLED, TIER4_CLOSED,
  TIER4_CLOSED_MESSAGE, TIER4_STATE_PATH, sourceOrEmpty,
} from './tier4-arbitrary-storage-register.js'

/* ═══════════════════════════ THE ONE SURVIVING `node:fs` BINDING ═══════════════════════════
 * The `src/**` tree walk below is the ONLY filesystem reader left in this file: the instrumented
 * `fs` seam, the `/tmp` staging log and the refusal's WRITE-class call census retired with the
 * store they instrumented (`E-1`), and no row here owns a temp directory any more. */
const fsModule = await import('node:fs')

/* ═══════════ THE STATIC HOLDER IS DELETED, AND ITS LOADER GOES WITH IT (`D-117`) ═══════════
 * WHAT STOOD HERE was the fragment-assembled dynamic import that resolved `src/main/tier4-state.ts`
 * — its declared surface (`tier4OpenState()`/`setTier4OpenState(open)`), its declared initial
 * `STORE-OPEN` and the absent-symbol error a holder row threw — so that the holder's own row could
 * drive it and its ABSENCE could be DATA. **THE FILE IS DELETED**, so a loader would resolve nothing
 * and its "absent" arm would be the only arm it ever answered: an existence probe whose subject does
 * not exist is the vacuous green `examiner.md` §2 names. THE RETIREMENT'S EVIDENCE IS `FS-T4-12`
 * below, re-grained onto the whole `src` tree: no module-level home for the boolean stands anywhere,
 * and the GATE still closes from its own record without one. */

/* ═══════════════════════════ THE PANE FIXTURE (`§2.6`) ═════════════════════ */
function carrierRecord(exclusion: string, read: unknown): Record<string, unknown> {
  return { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion, read }
}
/** **⟶ `D-106` — THE PANE'S `cfg` IS A DELIVERY'S NOW, SO THE CARRIER'S READING IS TAKEN THROUGH THE SHAPE.** Until this
 *  pass `SecurePanels.refresh()` opened the read itself at request time (the boot, every authored click, the `dispatch()`
 *  seam) and these rows obtained the carrier's answer by awaiting it. That read is DELETED — the pane paints what a delivery
 *  left — so the fixture takes the app's own path: the shape's ONE read (`src/renderer/security-client.ts`) and the pane's
 *  adopt step, which is exactly what `startSecurityShape`'s subscription body and its ONE stated boot fill perform. **NO
 *  CLAIM BELOW MOVES**: every cell is still driven from the CARRIER's answer, never from the pane's prior value, and the
 *  `reads()` counter still counts the carrier's one read. */
async function fillPane(panels: SecurePanels): Promise<void> {
  const client = createSecurityClient()
  await client.fill()
  panels.applySecurity(client.shape())
}
async function mountPaneFor(carrier: Record<string, unknown>): Promise<{ panels: SecurePanels; mount: unknown; reads: () => number }> {
  let reads = 0
  const bridge = {
    get: async () => { reads += 1; return { ...carrier } },
  }
  ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: bridge } }
  const mount = mountEl()
  const panels = new SecurePanels(mount as never)
  panels.refresh()
  await fillPane(panels)
  return { panels, mount, reads: () => reads }
}
function paneTextOf(panels: SecurePanels, nodeId: string): string {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}" (the landed SecurePanels surface)`)
  return String((node as { content?: unknown }).content ?? '')
}
function panePropOf(panels: SecurePanels, nodeId: string, prop: string): unknown {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}"`)
  return (node as { props?: Record<string, unknown> }).props?.[prop]
}
const REFUSAL_SEGMENT = '· refused: tier4-closed'
function segmentDetector(text: string, read: unknown): boolean {
  const present = text.includes(REFUSAL_SEGMENT)
  return read === null ? !present : present
}
function fabricatedDisabledDetector(text: string, exclusion: string): boolean {
  if (exclusion === STATE_MCP_DISABLED) return /· MCP: disabled/.test(text)
  return /· MCP: enabled/.test(text)
}

/** Comments stripped, by a small SCANNER (never by a regex): the subject is CODE, never prose —
 *  `D-vi`/`D-viii` and the carrier row's re-grain (now `D-VIII`) all require a detector a comment
 *  cannot satisfy. The scanner walks STRINGS verbatim (a `//` inside a literal is not a comment),
 *  which also means a prose mention of a glob such as `src/**` inside a LINE comment can never
 *  open a block comment and swallow the code beneath it — the failure mode a regex stripper has,
 *  and one this file hit while being authored. */
function codeOnly(src: string): string {
  let out = ''
  let i = 0
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (ch === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2)
      i = end === -1 ? src.length : end + 2
      out += ' '
      continue
    }
    if (ch === '/' && next === '/') {
      const end = src.indexOf('\n', i)
      i = end === -1 ? src.length : end
      out += ' '
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      let j = i + 1
      while (j < src.length) {
        if (src[j] === '\\') { j += 2; continue }
        if (src[j] === quote) { j += 1; break }
        j += 1
      }
      out += src.slice(i, j)
      i = j
      continue
    }
    out += ch
    i += 1
  }
  return out
}
/** Every TypeScript module under `src/`, recursively — the read set of `FS-T4-12`'s ONE-HOME
 *  census since `D-117`: the holder is deleted, so the row scans the WHOLE tree for a module-level
 *  home that replaced it rather than `mcp-server.ts` alone, and a second home in a module no other
 *  row names is still FOUND. */
function listSourceFiles(root: string, out: string[] = []): string[] {
  for (const entry of fsModule.readdirSync(root, { withFileTypes: true })) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) listSourceFiles(full, out)
    else if (entry.name.endsWith('.ts')) out.push(full)
  }
  return out
}

/* ═══════════════ THE `main.ts` / `settings-surface` SOURCE PROBES (`[H]`, declared limit) ═══════
 * Each probe reads ONE region of ONE file, and each names its limit: the seam the contract forbids
 * the unit to export is read as SOURCE, and the region is BOUNDED (paren- or brace-balanced,
 * comment-stripped) so no detector can fire on a LOCAL outside it and no PROSE can satisfy it. */
function getHandlerBody(mainSrc: string): string {
  const at = mainSrc.search(/ipcMain\.handle\(\s*IPC_SECURITY_GET\s*,/)
  if (at === -1) return ''
  const open = mainSrc.indexOf('(', at)
  let depth = 0
  for (let i = open; i < mainSrc.length; i++) {
    if (mainSrc[i] === '(') depth += 1
    else if (mainSrc[i] === ')') { depth -= 1; if (depth === 0) return mainSrc.slice(at, i + 1) }
  }
  return ''
}
/** THE SURFACE MODULE'S `read` VERB'S OWN BODY (`src/main/settings-surface/index.ts`) — the region
 *  the carrier's member detectors read since `E-3` moved the GET answer there: `const read = ():
 *  SettingsReadAnswer => {…}`, brace-balanced and comment-STRIPPED, so a local outside it cannot
 *  make a detector fire and a comment cannot satisfy one (`D-VIII`). */
function surfaceReadVerbBody(surfaceSrc: string): string {
  const code = codeOnly(surfaceSrc)
  const at = code.search(/const\s+read\s*=\s*\(\s*\)\s*:\s*SettingsReadAnswer\s*=>\s*\{/)
  if (at === -1) return ''
  const open = code.indexOf('{', at)
  let depth = 0
  for (let i = open; i < code.length; i++) {
    if (code[i] === '{') depth += 1
    else if (code[i] === '}') { depth -= 1; if (depth === 0) return code.slice(open + 1, i) }
  }
  return ''
}

/** The repo root as a PLAIN PATH (`REPO` from the register module is a URL; `join`
 *  needs a path). */
const REPO_ROOT = fileURLToPath(new URL('./../', import.meta.url))

/* ═══════════════════════════ THE SUITE ═════════════════════════════════════ */
/* NO temp-dir fixture, NO register executor and NO `beforeEach` holder reset survive: all three
 * belonged to the store battery and retired with it (`E-1`). The `beforeAll` installs the DOM shim
 * the pane rows mount into and resolves the STATIC HOLDER the one surviving holder row drives. */
beforeAll(async () => {
  installShim()
})

describe('S2 §2.1/§2.4 THE DECLARED TOKEN\'S HOME (`P-T4-CENSUS`, `P-T4-OPTIONS`, `P-T4-EXPORTS` and `P-T4-TYPES` measure the DELETED store and retire with `E-1`)', () => {
  it('P-T4-TOKEN-HOME: `TIER4_CLOSED` and its message are declared in `mcp-server.ts`, exported', async () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    expect(/export const TIER4_CLOSED\s*=\s*'tier4-closed'/.test(src), 'the token, beside `EXCLUSION_CLOSED` (§2.4 item 1)').toBe(true)
    expect(/export const TIER4_CLOSED_MESSAGE\s*=/.test(src), 'its server-authored message, beside `EXCLUSION_CLOSED_MESSAGE`').toBe(true)
  })
})

describe('S2 §3.1 THE HAPPY STATES (`M-11` alone holds; `M-1`…`M-10` drove the deleted store and retire with `E-1`)', () => {
  it('M-11 a self-transition and an outside-value payload are a no-op / refused as a value', () => {
    const gate = new SecurityGate({ token: null, enabled: [] })
    const self = gate.withExclusion(STATE_MCP_ENABLED)
    expect(self.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect((self as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.(), 'T-3: the epoch does not bump').toBe((gate as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.())
    const outside = gate.withExclusion('mcp-ENABLED' as never)
    expect(outside.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect(JSON.stringify(outside.exclusion), 'the boolean does not move').toBe(JSON.stringify({ mcpEnabled: true, tier4Open: false }))
  })
})

describe('S2 §3.2 THE FAIL-STATES (`FS-T4-12` · `FS-T4-13`; `FS-T4-09` retired with its only subject at `D-117`; `FS-T4-01`…`FS-T4-08`, `FS-T4-10` and `FS-T4-11` drove the deleted store and retire with `E-1`)', () => {
  // `D-117` re-grains this row onto the RETIREMENT it now states: the holder is deleted, no module-level
  // home replaces it anywhere under `src/`, and the gate is driven to prove it still closes from its own record. The
  // as-filed row scanned `mcp-server.ts` alone for a second home; the subject is now the WHOLE tree, which is why it gates.
  // strata:gates — `D-117`: the retirement's absence census and the gate's drive, which no marked row states
  it('FS-T4-12 RE-GRAINED (`D-117`, THE ONE-HOME ROW): `src/main/tier4-state.ts` IS DELETED and NO module-level mutable home for the boolean stands ANYWHERE under `src/` — neither exported half is even spelled — AND THE GATE IS UNMOVED, driven: `exclusionAllowsWork(gate.exclusionState())` answers the turn from the gate\'s own `_exclusion` and `toolAllowed` from its own `_config`, with no holder in the process', async () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    const assignments = [...src.matchAll(/^\s*(?!\/\/|\*)(?:let|var)\s+(\w*(?:exclusion|storeOpen|tier4Open)\w*)\s*=/gm)].map((m) => m[1])
    expect(assignments, `NO module-level mutable home for the boolean — measured [${assignments.join(', ')}]`).toEqual([])
    /* ── (1) THE HOLDER IS GONE, BY TWO INDEPENDENT READINGS. `existsSync` answers the path, and the
     *     MODULE SPECIFIER is un-resolvable — a row that only greps for a name would pass over a file
     *     that still stood, so both are taken and the existsSync detector is driven on a live path. */
    const holderPath = join(REPO_ROOT, TIER4_STATE_PATH)
    expect(fsModule.existsSync(join(REPO_ROOT, 'src/main/security.ts')), 'CONTROL: the existence probe FIRES on a file that stands').toBe(true)
    expect(fsModule.existsSync(holderPath), `the holder's file is DELETED — measured exists(${TIER4_STATE_PATH})`).toBe(false)
    const unresolvable = await import(/* @vite-ignore */ ['..', 'src', 'main', 'tier4-state.js'].join('/'))
      .then(() => false, () => true)
    expect(unresolvable, 'and the module is not merely unused — its specifier CANNOT BE RESOLVED, which is what makes an absent-symbol probe impossible rather than merely absent').toBe(true)
    /* ── (2) NEITHER EXPORTED HALF IS SPELLED ANYWHERE UNDER the whole `src` tree, read over CODE with comment
     *     lines ELIDED (the discipline: a headstone that names what it deleted must not measure its
     *     own explanation), and the detector is driven both ways so it cannot be vacuous. */
    const halfSitesIn = (source: string): number => (codeOnly(source).match(/(?:set)?Tier4OpenState|tier4OpenState/g) ?? []).length
    expect(halfSitesIn('void setTier4OpenState(open === \'mcp-disabled\')'), 'CONTROL: the half-name detector FIRES on a live call').toBe(1)
    expect(halfSitesIn('// tier4OpenState() used to be consulted here\n'), 'CONTROL (negative): a COMMENTED mention is not a site — the detector reads code, never prose').toBe(0)
    const sourceFiles = listSourceFiles(join(REPO_ROOT, 'src'))
    expect(sourceFiles.length, 'CONTROL: the declared scope is the WHOLE TypeScript tree under `src/`, not one module').toBeGreaterThan(20)
    /* **A MODULE-LEVEL `let`/`var` IS ONE AT COLUMN ZERO** — a declaration indented inside a function body is a
     * local, and the tree holds one (`operator-settings/index.ts`'s `let exclusion: unknown`, a local of the
     * read-back arm). The detector is therefore anchored, and both arms of that anchor are controlled below. */
    const homePattern = /^(?:let|var)\s+(\w*(?:exclusion|storeOpen|tier4Open)\w*)\s*[=:]/
    const moduleHomeIn = (source: string): string[] => [...codeOnly(source).matchAll(new RegExp(homePattern.source, 'gm'))].map((m) => m[1]!)
    expect(moduleHomeIn('let storeOpen = true\n'), 'CONTROL: the module-home detector FIRES on a column-zero declaration').toEqual(['storeOpen'])
    expect(moduleHomeIn('    let exclusion: unknown\n'), 'CONTROL (negative): an INDENTED declaration is a function local, not a module-level home — `operator-settings/index.ts` holds one').toEqual([])
    const foreignHomes = sourceFiles
      .filter((p) => halfSitesIn(sourceOrEmpty(p)) > 0 || moduleHomeIn(sourceOrEmpty(p)).length > 0)
      .map((p) => p.replace(REPO_ROOT, ''))
    expect(foreignHomes, `NO home and NO reference anywhere under the whole \`src\` tree — measured [${foreignHomes.join(', ')}]`).toEqual([])
    /* ── (3) AND THE GATE STILL CLOSES, FROM ITS OWN RECORD, DRIVEN. The turn is
     *     `mcp-server.ts`'s `exclusionTurn`: `exclusionAllowsWork(gate().exclusionState())`, the one
     *     shared check the tool closure and the resource callback call. It is driven here against a
     *     REAL gate, and the grant is read off `_config` in the same turn — the pair and the groups
     *     are two records and neither answers for the other. */
    const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
    expect(exclusionAllowsWork(gate.exclusionState()), 'the boot pair allows work').toBe(true)
    const closed = gate.withExclusion('mcp-disabled')
    expect(exclusionAllowsWork(closed.exclusionState()), 'THE TURN REFUSES on the gate\'s own record — no holder is consulted, and none exists to consult').toBe(false)
    expect(closed.toolAllowed('provident.get_rendered_html'), 'and the GRANT is unmoved by the pair: `toolAllowed` answers from its own `_config`, so closing the store does not silently empty the group set').toBe(true)
    expect(exclusionAllowsWork(closed.withExclusion('mcp-enabled').exclusionState()), 'and the transition back re-opens the turn').toBe(true)
    // THE ONE WRITER (`§2.5` item 2): `withExclusion` lives in `security.ts` and is called
    // from exactly ONE production site. The detector is COUNTABLE (a second writer means a
    // `withExclusion(` occurrence appearing in a module that today holds none), and it is
    // driven both ways so it cannot be vacuous.
    const writerSites = (source: string): number => (source.match(/withExclusion\s*\(/g) ?? []).length
    expect(writerSites('const gate = other.withExclusion(next)'), 'CONTROL: the detector FIRES on a foreign site').toBe(1)
    expect(writerSites(src), '`mcp-server.ts` holds ONE landed site — the transition the spec CITES as landed (`applyExclusion`)').toBe(1)
    expect(writerSites(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own (`F-11`: main supplies STATE, never takes the DECISION)').toBe(0)
    const securitySrc = sourceOrEmpty(join(REPO_ROOT, 'src/main/security.ts'))
    expect(writerSites(securitySrc), 'the ONE writer — the pure-constructor transition — lives in `security.ts`').toBe(1)
    // the STATE's one home (`§2.5` item 1): a direct `_exclusion` assignment anywhere outside
    // its own module is a SECOND writer, and the detector is driven both ways:
    const directAssignment = (source: string): boolean => /_exclusion\s*=[^=]/.test(source)
    expect(directAssignment('this._exclusion = next'), 'CONTROL: the detector FIRES on a direct assignment').toBe(true)
    expect(directAssignment(sourceOrEmpty(MCP_SERVER_SRC)), '`mcp-server.ts` never assigns the record directly (it replaces the GATE)').toBe(false)
  })

  it('FS-T4-13 the pane rendering a state the carrier did not supply is a FAILING row', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
    const text = paneTextOf(panels, 'security-status')
    expect(text, 'the state word comes from the carrier, never from the pane\'s own prior value').toContain('· MCP: enabled')
    expect(text, 'CONTROL: the fabrication detector FIRES on the opposite rendering').not.toContain('· MCP: disabled')
    expect(text, '`read: null` ⇒ no fabricated refusal segment (§2.6 item 4)').not.toContain(REFUSAL_SEGMENT)
  })
})

describe('S2 §2.6 THE PANE\'S TWO RE-SOURCED CELLS + THE ONE ADDITIVE SEGMENT', () => {
  it('the carrier is READ (the pane drives its cells from the response record, not from a store read)', async () => {
    const pane = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(pane.reads(), 'the pane read the carrier').toBeGreaterThan(0)
  })

  it('the `MCP:` segment and the toggle follow the carrier across a refresh (CTL-5: the probe can read a stale value)', async () => {
    const first = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(paneTextOf(first.panels, 'security-status')).toContain('· MCP: disabled')
    expect(paneTextOf(first.panels, 'security-status'), 'CONTROL: the probe can distinguish the two renderings').not.toContain('· MCP: enabled')
    const next = carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...next }) } } }
    await fillPane(first.panels)
    const text = paneTextOf(first.panels, 'security-status')
    expect(text).toContain('· MCP: enabled')
    expect(text, 'the additive trailing segment is present iff `read` is non-null (`PAR-11`)').toContain(REFUSAL_SEGMENT)
  })

  it('the segment carries a TOKEN, never a message body, never a tier-4 value or name (`§2.6` item 4)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const text = paneTextOf(panels, 'security-status')
    expect(text).toContain(REFUSAL_SEGMENT)
    expect(text, 'the message body is NOT rendered in place of the token').not.toContain(TIER4_CLOSED_MESSAGE)
    expect(text, 'no group set leaks into the segment').not.toContain('read, dispatch,')
  })

  it('no new node, class or geometry: the segment rides the landed line (`§2.6` item 5)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
    const ids = nodes.map((n) => ((n as { props?: { id?: string } }).props?.id) ?? '')
    expect(ids, 'the authored node census is UNMOVED (D1–D8 stand)').toContain('security-status')
    expect(ids.filter((id) => id === 'security-status')).toHaveLength(1)
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * S2 REPAIR — GATE 4's RULED REPAIR CONTRACT (`2026-10-11`), AS IT STANDS AFTER `E-1`.
 *
 * THE RED SET OF THAT CONTRACT WAS TEN ROWS, `D-I` … `D-X`. SIX OF THEM RETIRE WITH THE STORE
 * THEY REPAIRED — `D-I` (the `-0` identity arm) · `D-II` (`__proto__`) · `D-III` (a top-level
 * non-object record) · `D-IV` (the declared `fs` seam) · `D-IX` (a refusal's WRITE-class `fs`
 * window) · `D-X` (the frozen pins, which retire AS A CHAIN: `SECURITY_STORE_PIN` and the five
 * terms it kept awake, WITH EVERY READER OF THEM) — because each one's subject is
 * `src/main/security-store.ts`: its declared `fs` seam, its `/tmp` staging mechanics, its
 * sanitize-and-ingest arms or its byte-pins. `E-1` deleted that module wholesale and this rebuild
 * disregards it: no shim, no dual write, and the record now lives in its own `provident-storeroom`
 * instance behind `src/main/settings-surface/index.ts`.
 *
 * THE THREE THAT STAND, EACH WITH ITS OWN SUBJECT:
 *  · `D-VI` — the pane's fabrications, driven at the pane from the carrier record (`§2.6`).
 *  · `D-VII` (RE-GRAINED, `C-3`) — the boot ORDER, read at the composition sites that moved into
 *    the surface module; the order survives IN KIND (`D-19`, `D-vii`).
 *  · `D-VIII` (RE-GRAINED, `C-3`) — the carrier's ONE reading and its two additive members, read
 *    off the surface module's `read()` verb, where `E-3` put them.
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
describe('S2 REPAIR (gate 4\'s ruled repair contract) — THE SURVIVING ROWS: `D-VI` · `D-VII` · `D-VIII` (`D-I`…`D-IV`, `D-IX` and `D-X` retire with `E-1`)', () => {
  it('D-VI · THE PANE FABRICATES NOTHING: a reading the carrier never supplied paints NO `· MCP:` word, no affordance word and no refusal segment — and the refusal segment appears IFF the carrier\'s `read` is non-null, with `undefined` counting as null', async () => {
    // state 1 — a BRIDGE-REJECTED refresh on a never-supplied pane (the ruling's own named case):
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    const mount = mountEl()
    const panels = new SecurePanels(mount as never)
    panels.refresh()
    // **⟶ `D-106`: THE REJECTED READ IS DRIVEN THROUGH THE SHAPE.** `refresh()` no longer reads, so the rejecting route is
    // taken where the app takes it — the shape's `fill()`, whose `unread` answer fills nothing and leaves the pane at its own
    // no-reading state. The claim is unchanged and is now held one step further out: a rejection is a statement about the
    // transport, never about the record, so nothing is painted from it.
    await fillPane(panels)
    const text = paneTextOf(panels, 'security-status')
    expect(text, `the pane's own FIELD DEFAULT must paint NO \`· MCP:\` word when no carrier supplied a reading — measured text: "${text}"`).not.toMatch(/· MCP:/)
    expect(text, 'nor a refusal segment').not.toContain(REFUSAL_SEGMENT)
    expect(paneTextOf(panels, 'exclusion-toggle'), 'and the AFFORDANCE word is not painted from the field default either — no carrier supplied a reading to word it from').not.toMatch(/Disable MCP|Enable MCP/)
    // state 2 — `read: undefined` (the ruling: `undefined` COUNTS AS null):
    const undef = await mountPaneFor({ ...carrierRecord(STATE_MCP_ENABLED, null), read: undefined })
    expect(paneTextOf(undef.panels, 'security-status'), '`read: undefined` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
    // state 3 — an ABSENT `read` member (the same reading, via `PAR-8`'s OUTSIDE cell):
    const absentMember: Record<string, unknown> = { ...carrierRecord(STATE_MCP_ENABLED, null) }
    delete absentMember.read
    const absent = await mountPaneFor(absentMember)
    expect(paneTextOf(absent.panels, 'security-status'), 'an ABSENT `read` member ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
    // state 4 — the pane's own FIELD DEFAULT carries no state member (the source instrument for the
    // `data-state` half, whose VALUE is byte-identical to the authored envelope and is therefore not
    // separately observable — a DECLARED LIMIT, named rather than hidden):
    const panelsSrc = codeOnly(sourceOrEmpty(SECURE_PANELS_SRC))
    const fieldInit = /private\s+cfg\b[^=]*=\s*\{([\s\S]*?)\}/.exec(panelsSrc)?.[1] ?? ''
    expect(fieldInit, 'CONTROL: the pane\'s `cfg` field initializer is found').not.toBe('')
    expect(/exclusion\s*:/.test(fieldInit), `the pane's own FIELD DEFAULT carries NO state member — a never-supplied pane has nothing to fabricate from. MEASURED INITIALIZER: ${fieldInit.trim().slice(0, 160)}`).toBe(false)
    /* ── ANNOTATED BESIDE `2026-10-11` (`RCA-8(d)`: every byte above STANDS — this note is added
     * BESIDE the as-filed cell, never over it). **THE `data-state` HALF IS NO LONGER A DECLARED
     * LIMIT.** The as-filed state 4 above declared the `data-state` half *"not separately
     * observable"* because its VALUE (with no reading yet) is byte-identical to the authored
     * envelope's own literal. The gate-6 live battery's finding `F-1` REFUTED that instrument
     * limit: the prop's PRESENCE before a carrier answer IS observable at the node layer and it IS
     * the fabrication (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§5` `F-1`), and the
     * `[T]` row `F-1` below now reads it in four no-answer states. THE AS-FILED FIELD-DEFAULT
     * TERM ABOVE IS UNAFFECTED AND STILL HOLDS: the pane's own FIELD carries no state member, so
     * the literal the operator saw is not the field's — it is the AUTHORED NODE's. */
  })

  it('D-VII RE-GRAINED (`C-3`): the boot order — `createSettingsSurface(` < the boot read `settingsSurface.read()` < the gate < the flip `settingsSurface.attach(mcp)` < `await mcp.start()`, AND the flip < `new BrowserWindow(` (the CLOSE lands before the window is created/loaded)', () => {
    /* ── RE-GRAINED (`C-3`; `RCA-8(d)`: the as-filed row's own TERMS stay named here, never
     * overwritten). The SUBJECT is `main.ts`'s COMPOSITION and it STANDS; what moved are the SITE
     * SPELLINGS, because `E-3` moved the construction, the boot read and the carrier into
     * `src/main/settings-surface/index.ts`. `D-19`'s order survives IN KIND — construction → boot
     * read → gate → flip → `mcp.start()` — and `D-vii`'s own clause (the CLOSE lands BEFORE the
     * window is created/loaded) survives at the new site. THE AS-FILED SPELLINGS, for the record:
     * the construction was `createSecurityStore(`, the boot read `securityStore.get()`, and the
     * flip the literal `mcp.applyExclusion('mcp-enabled')`. The searches read CODE (comments
     * stripped), so no prose can supply a site. */
    const code = codeOnly(sourceOrEmpty(MAIN_SRC))
    const construction = code.search(/createSettingsSurface\(/)
    const bootRead = code.search(/settingsSurface\.read\(\)/)
    const gate = code.search(/new SecurityGate\(/)
    const flip = code.search(/settingsSurface\.attach\(\s*mcp\s*\)/)
    const enable = code.search(/await\s+mcp\.start\(/)
    const window = code.search(/new BrowserWindow\(/)
    for (const [label, at] of [['createSettingsSurface(', construction], ['the boot read `settingsSurface.read()`', bootRead], ['new SecurityGate(', gate], ['the flip `settingsSurface.attach(mcp)`', flip], ['await mcp.start()', enable], ['new BrowserWindow(', window]] as Array<[string, number]>) {
      expect(at, `the site \`${label}\` exists in \`main.ts\``).toBeGreaterThan(-1)
    }
    expect(construction, 'D-19 step 1: the instance is constructed FIRST (`main.ts:108`)').toBeLessThan(bootRead)
    expect(bootRead, 'D-19 step 2: the boot read follows it (`main.ts:109`)').toBeLessThan(flip)
    expect(gate > bootRead && gate < flip, `D-19: the gate construction sits BETWEEN the boot read and the flip — \`construction → boot read → gate → flip → mcp.start()\` is PRESERVED — measured gate@${gate}`).toBe(true)
    expect(flip, 'D-19 step 3: the CLOSE precedes the enable').toBeLessThan(enable)
    expect(flip, `THE REPAIR'S OWN CLAUSE (D-vii), AT THE NEW SITE: the CLOSE (\`settingsSurface.attach(mcp)\`, which subscribes, writes the holder from the boot record, re-patches the gate and lands the boot terminal \`mcp-enabled\`) lands BEFORE the window is created/loaded — measured flip@${flip} vs \`new BrowserWindow(\`@${window}`).toBeLessThan(window)
    /* THE RETIRED SPELLINGS MAY NOT COME BACK — measured, not assumed: `main.ts` constructs no store
     * and reads none (`E-1`, `E-3`), and it holds NO transition of its own (the boot terminal lands
     * inside the surface module's `attach`; `ASM-4`, and `F-11`'s "main supplies STATE, never the
     * DECISION"). */
    expect(/createSecurityStore\(|securityStore\.get\(\)/.test('const store = createSecurityStore({ path })\nconst persisted = securityStore.get()'), 'CONTROL: the retired-spelling detector FIRES on the as-filed construction and boot read').toBe(true)
    expect(/createSecurityStore\(|securityStore\.get\(\)/.test(code), 'NO `createSecurityStore(` and NO `securityStore.get()` in `main.ts` — the store the as-filed row named is retired (`E-1`) and this composition constructs none (`E-3`)').toBe(false)
    expect(/mcp\.applyExclusion\(/.test("mcp.applyExclusion('mcp-enabled')"), 'CONTROL: the transition-site detector FIRES on the as-filed flip').toBe(true)
    expect(/mcp\.applyExclusion\(/.test(code), 'and `main.ts` calls no transition of its own: the gate edge is the surface module\'s `attach` (`D-17`, `ASM-4`)').toBe(false)
  })

  it('D-VIII RE-GRAINED (`C-3`): the CARRIER\'S HONESTY — the GET handler is ONE delegation to `settingsSurface.read()`, and THAT verb mints BOTH additive members (`read`, `exclusion`) from ONE reading of the instance\'s record, so the two cannot carry two states in one response', () => {
    /* ── RE-GRAINED (`C-3`; `RCA-8(d)`: annotate BESIDE, never over). The as-filed subject was the
     * GET handler's body in `main.ts`, which read the STATIC HOLDER exactly once
     * (`tier4OpenState()`) and composed both members from that one reading. `E-3` MOVED THE BODY:
     * `main.ts:411` is now `ipcMain.handle(IPC_SECURITY_GET, () => settingsSurface.read())` — ONE
     * delegation — and the answer is minted in `src/main/settings-surface/index.ts`'s `read()` verb,
     * where ONE `settings.read()` feeds `token`, `enabled`, `read` and `exclusion`. THE PROPERTY IS
     * UNMOVED IN KIND (one reading, two members, never two states); the SITES are the surface
     * module's. **AND THAT MODULE NO LONGER WRITES A HOLDER** (`D-117`): the projection this note
     * used to place beside the reading is deleted with `src/main/tier4-state.ts`, so the reading has
     * ONE product — the answer — and `FS-T4-12` owns the census that says so. */
    const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
    expect(handler.length, 'the GET handler exists in `main.ts`').toBeGreaterThan(0)
    const handlerCode = codeOnly(handler)
    expect(/=>\s*settingsSurface\.read\(\)/.test(handlerCode), `THE DELEGATION: the handler is ONE call to the surface's own \`read()\` (\`main.ts:411\`) — measured body: ${handlerCode.trim().slice(0, 160)}`).toBe(true)
    expect(/securityStore\.get\(\)|tier4OpenState\s*\(/.test("ipcMain.handle(IPC_SECURITY_GET, () => ({ ...securityStore.get(), exclusion: tier4OpenState() ? 'mcp-disabled' : 'mcp-enabled' }))"), 'CONTROL: the composer detector FIRES on an as-filed handler body').toBe(true)
    expect(/securityStore\.get\(\)|tier4OpenState\s*\(/.test(handlerCode), 'and the handler composes NOTHING itself: no store read, no holder consult (`§2.4` item 7 — the deadlock\'s dissolution, now structural)').toBe(false)
    const surface = sourceOrEmpty(SETTINGS_SURFACE_SRC)
    const verb = surfaceReadVerbBody(surface)
    expect(verb.length, 'the surface module\'s `read()` verb is found — `const read = (): SettingsReadAnswer => {…}`').toBeGreaterThan(0)
    /* LEG 1 — THE SITE CENSUS: exactly ONE reading of the instance's record in the carrier verb. A
     * second `settings.read()` is a SECOND state, and the two members could then disagree. */
    const readings = verb.match(/settings\.read\s*\(\s*\)/g) ?? []
    expect(readings.length, `EXACTLY ONE \`settings.read()\` in the carrier verb — measured ${readings.length} (the module's OTHER verbs read the record again, which is why this census is scoped to THIS verb by its own declaration line)`).toBe(1)
    expect(/const\s+open\s*=\s*record\.exclusion\s*===\s*'mcp-disabled'/.test(verb), 'and the closed-ness is DERIVED ONCE from that one reading').toBe(true)
    /* LEG 2 — THE RECORD HALF: the same reading answers the record's own members … */
    expect(/token\s*:\s*record\.token/.test(verb), 'the SAME reading feeds the `token` member').toBe(true)
    expect(/enabled\s*:\s*\[\s*\.\.\.record\.enabled\s*\]/.test(verb), 'and the `enabled` member — as a detached COPY, never the record\'s own array').toBe(true)
    /* … AND THE TWO ADDITIVE MEMBERS, both from it (`PAR-9`: neither is substituted for the other,
     * and neither is ever absent). */
    expect(/read\s*:\s*open\s*\?\s*TIER4_CLOSED_REFUSAL\s*:\s*null/.test(verb), 'the `read` member is CONDITIONAL on that ONE derived reading — `null` iff the pair stands at `mcp-enabled`, the closed refusal otherwise (never an unconditional `null`)').toBe(true)
    expect(/exclusion\s*:\s*record\.exclusion/.test(verb), 'and `exclusion` carries the STATE token from the SAME record — never the message, never a second reading').toBe(true)
    /* ── THE CONTROLS (`RCA-8(d)`: a detector that cannot fail proves nothing) ───────────────── */
    expect((surfaceReadVerbBody('const read = (): SettingsReadAnswer => { const record = settings.read(); const again = settings.read(); return answer }').match(/settings\.read\s*\(\s*\)/g) ?? []).length, 'CONTROL: the census FIRES on a synthetic TWO-read carrier body').toBe(2)
    const unconditionalNull = /read\s*:\s*null\b/
    expect(unconditionalNull.test('read: null, exclusion: record.exclusion'), 'CONTROL: the unconditional-`null` detector FIRES on a flat `null` `read`').toBe(true)
    expect(unconditionalNull.test(verb), 'THE UNCONDITIONAL-`null` ARM: the live verb\'s `read` is CONDITIONAL').toBe(false)
    const stateFedByRefusal = /exclusion\s*:\s*(?:[^,{}]*\W)?read\b/
    expect(stateFedByRefusal.test('exclusion: read'), 'CONTROL: the substitution detector FIRES on the FIXTURE STRING `exclusion: read` — the subject it can actually leave').toBe(true)
    expect(stateFedByRefusal.test(verb), 'THE LIVE SUBJECT: the carrier substitutes neither member for the other').toBe(false)
    const refusalFedByState = /read\s*:\s*exclusion\b/
    expect(refusalFedByState.test('read: exclusion'), 'CONTROL: the mirror detector FIRES on its fixture string').toBe(true)
    expect(refusalFedByState.test(verb), 'and the live carrier never feeds `read` from the state').toBe(false)
    expect((('const read = (): SettingsReadAnswer => { /* settings.read() is taken once per turn */ return answer }').match(/settings\.read\s*\(\s*\)/g) ?? []).length, 'CONTROL: the UN-STRIPPED form counts a COMMENT-ONLY mention — which is exactly why the probe strips').toBe(1)
    expect((surfaceReadVerbBody('const read = (): SettingsReadAnswer => { /* settings.read() */ return answer }').match(/settings\.read\s*\(\s*\)/g) ?? []).length, 'CONTROL (negative): the stripped verb does not count it').toBe(0)
    /* ── THE ADDITIVE PAIR ITSELF, UNMOVED (`PAR-10`: the widening is an INTERSECTION, declared at
     * the answer the surface mints — ONE member beside the landed one). */
    const answerType = /export type SettingsReadAnswer\s*=\s*\{([\s\S]*?)\}/.exec(codeOnly(surface))?.[1] ?? ''
    expect(answerType, 'the surface declares its own `SettingsReadAnswer`').not.toBe('')
    for (const member of DECLARED_CARRIER_MEMBERS) {
      expect(new RegExp(`\\b${member}\\s*:`).test(answerType), `the answer carries the declared carrier member \`${member}\``).toBe(true)
    }
    expect(DECLARED_CARRIER_MEMBERS.length, 'the widening is exactly ONE member beside the landed one').toBe(LANDED_CARRIER_MEMBERS.length + 1)
    expect(DECLARED_CARRIER_MEMBERS).toContain('exclusion')
    expect(DECLARED_CARRIER_MEMBERS).toContain('read')
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * S2 = `U-TIER4-ARBITRARY-STORAGE` — GATE 6's `F-1` (`HIGH`): THE RED ROW (`RCA-1`).
 *
 * Authored from the CONTRACT and from the gate-6 RECORD, against the tree as it stands, and RUN
 * and REPORTED failing BEFORE any `src/**` byte of the repair. Nothing in `src/**` was read as a
 * SOURCE OF EXPECTATIONS; the two sites cited below are cited so the repair has a site.
 *
 * ── THE FINDING, AS MEASURED ON THE ASSEMBLED APP (cited, never re-derived) ─────────────────
 * Record: `docs/specs/tier4-arbitrary-storage-live-battery.md` `§5` `F-1`, whose matrix row is its
 * `§3` `U-1` — verdict **`FAIL`**, falsifier *"a state that paints a `· MCP:` word OR a `data-state`
 * PROP the carrier did not supply — i.e. a pre-carrier paint that carries state at all"*. A
 * document-start `MutationObserver` on the real app read, at FIRST PAINT,
 * `statusText: "token: (none) · enabled: [read, dispatch] · journal: ∞"` — NO `· MCP:` word, i.e.
 * the pane's own reading is `null` and the `D-vi` FIELD-default fix DID land — while the toggle
 * still carried `data-state: "mcp-enabled"` and its affordance had been cleared to `""`. In the
 * MCP-DISABLED document that literal is the INVERSE of the carried state. Window measured: `2.4`
 * ms (boot) / `2.6` ms (MCP-disabled), `68.3` ms instrument-widened, with a compositor frame
 * delivered inside it.
 *
 * ── THE CLAUSES THIS ROW READS (each named, each a term of the assertion below) ─────────────
 *  (1) `§2.6` item 3's dated `D-vi` note (`§3c`'s `S2-ADV-01`, `HIGH`, `HOST-FIX` + `RED-SET-FIX`):
 *      *"BEFORE ANY CARRIER ANSWER — and ON A BRIDGE REJECTION — the pane paints NO `· MCP:` word
 *      and writes NO `data-state` PROP."* — `D-vi` names THE PROP, not only the field, and
 *      `§2.6` item 3's own words declare `cfg.exclusion` NULLABLE with `null` as the *"no reading
 *      yet"* state.
 *  (2) `§2.6` item 1(b): the toggle's `data-state` prop and its affordance word *"must come from
 *      the boolean-fed carrier member"*.
 *  (3) `§3.2` `FS-T4-13` + the dated note BESIDE it: a `data-state` PROP written before the
 *      carrier has answered is a **FAILING** row.
 *
 * ── THE MECHANISM, AT THE BYTES (a cited reading, not an expectation) ───────────────────────
 * The `null` arm of `syncConfig` pushes only `content: ''` for the toggle — it clears the
 * AFFORDANCE WORD and writes NO prop — while the AUTHORED ENVELOPE NODE still declares
 * `props: { id: 'exclusion-toggle', 'data-state': 'mcp-enabled' }`
 * (`src/renderer/secure-panels.ts:227`), and nothing clears or removes that PROP. So the pane
 * paints no state of its OWN and the surface it mounts still does. `D-vi`'s own words name the
 * PROP, not only the field.
 *
 * ── THE STATES THIS ROW ENUMERATES, BEFORE THE DRIVES (`§3.1`/`§3.2` vocabulary) ─────────────
 *  `F1-S1` **NO CARRIER AT ALL** — `window.provident.security` ABSENT: the pane's declared
 *          `refresh()` skips the read entirely and `cfg.exclusion` stays at its declared `null`.
 *  `F1-S2` **A BRIDGE THAT REJECTS** — `get()` throws (`S2-ADV-01` limb (c); the swallow at
 *          `secure-panels.ts:462-464`), so no reading was taken this turn.
 *  `F1-S3` **THE FIRST PAINT, DRIVEN SYNCHRONOUSLY** — see the layer note below.
 *  `F1-S4` **A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER** — the pane's own declared
 *          `undefined`-counts-as-`null` arm.
 *  `F1-CTL` **THE INVERSE, CARRIER-SUPPLIED** (`CTL-6`) — `exclusion: 'mcp-disabled'` paints
 *          `data-state='mcp-disabled'`, through the SAME probe. Driven FIRST, so the four
 *          no-answer readings above are readings by a probe SEEN to read a SUPPLIED state word —
 *          and that word is the INVERSE of the authored literal, which is the whole of `F-1`.
 *  The settled states (`F1-CTL-1`..`F1-CTL-4`) are enumerated in the second row below.
 * FAIL-STATE COVERED: **`FS-T4-13`** (extended by its dated note) — the pane rendering a state the
 * carrier did not supply. `FS-T4-14`/`FS-T4-15` are NOT this row's subject.
 *
 * ── THE LAYER, AND WHAT THIS ROW DOES *NOT* INSTRUMENT (stated, never hidden) ───────────────
 * This is a `[T]` row. **THE CLOSEST `[T]` SHAPE OF THE LIVE FIRST PAINT IS DRIVEN HERE, AND IT
 * IS `F1-S3`:** `src/renderer/renderer.ts:643` calls `void panels.refresh()` **UN-AWAITED** while
 * `:645` calls `refreshDebug(runtime)` **synchronously in the same turn**, so `syncConfig()` — and
 * therefore the null arm — runs with NO reading taken. `F1-S3` drives exactly that: the pane is
 * constructed, `refreshDebug(runtimeStub)` is called SYNCHRONOUSLY (no carrier, no await), and the
 * node is read. `F1-S1`/`F1-S2` drive the same arm through `refresh()`'s two no-answer paths.
 * **WHAT IS NOT REPRODUCIBLE AT `[T]`, AND WHERE IT IS CARRIED:** the DOCUMENT-START/TIMING half —
 * the `2.4`/`2.6` ms window and the compositor frame delivered inside it — needs a real document,
 * a real first paint and an injection-time observer. **THE LIVE ROW THAT CARRIES THAT HALF IS THE
 * GATE-6 RECORD'S `U-1` (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§3`), currently
 * `FAIL`**, and its falsifier is quoted above. No `[U]` claim is made or moved by this file
 * (`§1.4` item 3: no timing figure is claimed; every drive asserts SOURCE, ORDER and OUTCOME).
 *
 * ── THE REGISTER, AND WHY NO TERM MOVES IN THIS PASS ─────────────────────────────────────────
 * `§5.5.1` row 6 (`P-T4-IM-3`, `S-T4-PANE-1`, term `10 = 4 + 6`) IS the pane's fabrication row, and
 * NOT ONE of its six FABRICATION drives reads the PRE-CARRIER shape: FABRICATION 2 drives the
 * pane's own PRIOR state, FABRICATION 4 the affordance substitution. **THAT GAP IS WHY THE
 * REGISTER READ `112/112 held` WHILE THE LIVE BATTERY CAUGHT THIS.** A row-6 term `10 → 11` would
 * move the file's DECLARED total `112 → 113`, i.e. a SPEC-OWNED cell (`§5.5.1`'s declared
 * arithmetic, `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`), so **THIS PASS MOVES NO DECLARED TERM
 * AND TOUCHES NO REGISTER BYTE**; the re-grain is recorded here as OWED, WITH ITS ARITHMETIC
 * (`P-T4-IM-3 10 → 11 ⇒ 112 → 113`), to the supervisor's ruling — the same authority that owns
 * every other register re-grain of this unit.
 *
 * ⟶ ANNOTATED BESIDE `2026-10-11` (THE OWED RE-GRAIN HAS LANDED — `RCA-8(d)`: the paragraph
 * ABOVE STANDS, all of it, and this note is inserted BESIDE it, never over it). **THE RULING THE
 * PASS ABOVE DEFERRED HAS BEEN GIVEN AND EXECUTED IN THE SAME `2026-10-11` WAVE**, so the
 * paragraph's closing clause (*"THIS PASS MOVES NO DECLARED TERM AND TOUCHES NO REGISTER BYTE"*)
 * is a record of THAT pass and MUST NOT BE READ AS THE CURRENT STATE: `§5.5.1` row 6
 * (`P-T4-IM-3`, `S-T4-PANE-1`) now DECLARES **`11 = 10 (as filed) + 1`**, the register's declared
 * total is **`113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`** (`P-IM 47` · `P-SM 10` ·
 * `P-TP 56`, `47 + 10 + 56 = 113`), and the eleventh drive it counts is an entry of that row's OWN
 * `drives` array in this file (the PRE-CARRIER family, `...preCarrierPaneDrives()`), with
 * `REGISTER_OWNED_TERMS` in the register harness standing EMPTY. **BOTH EARLIER FORMS STAY WAKE
 * AND PRINTED:** the filing's `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8` (the spec gate)
 * and the gate-4 re-grain's `112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8` (row 8's four
 * `D-i`…`D-iv` terms) — the `112 → 113` movement is row 6's `+ 1`, caused by `F-1`, the gate-6
 * live finding this whole block is authored from. NO term, row, strategy id or cap is dropped,
 * merged or re-worded by the relocation.
 *
 * ⟶ ANNOTATED BESIDE THE `E-1` REBUILD (`RCA-8(d)`: every byte above STANDS and this note is added
 * BESIDE it, never over it). **THE REGISTER THIS BLOCK NAMES IS RETIRED.** `§5.5.1`'s register
 * carried this finding's `+ 1` as row 6's eleventh drive; nine of its ten rows drove
 * `src/main/security-store.ts`, which `E-1` deleted, so the whole register — its table, its
 * arithmetic, its executor, its report and its controls — retired as a CHAIN with it, and its
 * PRE-CARRIER term retires INTO the two rows below, which drive the SAME four no-answer states
 * with the SAME four controls. **NO TERM OF THIS SUITE MOVES WITH THAT RETIREMENT:** `F-1` and
 * `F-1-CTL` are unchanged, byte for byte.
 * ========================================================================================= */
describe('S2 GATE-6 `F-1` — THE PANE\'S RE-SOURCE TO THE HOLDER IS TOTAL: no AUTHORED state literal may stand in for a reading the carrier never supplied', () => {
  const STATE_WORDS: readonly string[] = [STATE_MCP_ENABLED, STATE_MCP_DISABLED]
  const MCP_WORD = /· MCP:\s*(?:enabled|disabled)/
  const AFFORDANCE_WORD = /Disable MCP|Enable MCP/
  /** `refreshDebug`'s own runtime stub — the synchronous first-paint driver. The pane reads ONLY
   *  `renderedHtmlResult()` from its runtime, so the stub carries exactly that one member. */
  const runtimeStub = {
    renderedHtmlResult: () => ({
      census: { inTree: 0, registered: 0, unplaced: 0, destroyed: 0, prototypes: 0 },
      ssrHtml: '',
    }),
  }

  it('F-1 · NO `data-state` PROP BEFORE A CARRIER ANSWER (`§2.6` item 3\'s `D-vi` · item 1(b) · `§3.2` `FS-T4-13`): the AUTHORED ENVELOPE LITERAL may not stand in for a reading that does not exist — in four no-answer states, DRIVEN', async () => {
    /* ── THE IN-ROW CONTROL (`CTL-6`), DRIVEN FIRST: the SAME probe reads a CARRIER-SUPPLIED word,
     * and that supplied word is the INVERSE of the authored literal — so the readings below are
     * SOURCE readings, and no repair may satisfy this row by blanking the prop forever. */
    expect(STATE_WORDS, 'CONTROL: the clause\'s closed STATE-WORD pair — the only two words a `data-state` may ever carry — and the AUTHORED literal is one of them').toEqual([STATE_MCP_ENABLED, STATE_MCP_DISABLED])
    const supplied = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(panePropOf(supplied.panels, 'exclusion-toggle', 'data-state'), 'CONTROL (`CTL-6`): a CARRIER-SUPPLIED `exclusion: mcp-disabled` paints the SUPPLIED word, through the same probe — the INVERSE of the authored literal').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(supplied.panels, 'exclusion-toggle'), 'CONTROL: and the carrier-supplied affordance word is painted').toMatch(AFFORDANCE_WORD)

    const readings: Array<{ state: string; prop: unknown; status: string; affordance: string }> = []
    const readOf = (state: string, panels: SecurePanels): void => {
      readings.push({
        state,
        prop: panePropOf(panels, 'exclusion-toggle', 'data-state'),
        status: paneTextOf(panels, 'security-status'),
        affordance: paneTextOf(panels, 'exclusion-toggle'),
      })
    }

    /* `F1-S1` — NO CARRIER AT ALL: `window.provident.security` is ABSENT, so the pane's declared
     * read is skipped entirely and `cfg.exclusion` stays at its declared `null` ("no reading
     * yet"). */
    ;(globalThis as unknown as { window?: unknown }).window = {}
    const s1 = new SecurePanels(mountEl() as never)
    s1.refresh()
    await fillPane(s1)
    readOf('F1-S1', s1)

    /* `F1-S2` — A BRIDGE THAT REJECTS (`S2-ADV-01` limb (c)): no reading was TAKEN this turn. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    const s2 = new SecurePanels(mountEl() as never)
    s2.refresh()
    await fillPane(s2)
    readOf('F1-S2', s2)

    /* `F1-S3` — THE FIRST PAINT, DRIVEN SYNCHRONOUSLY: the `[T]` shape of the live sequence
     * (`renderer.ts:643`'s UN-AWAITED `void panels.refresh()` beside `:645`'s synchronous
     * `refreshDebug(runtime)` in the SAME TURN) — `syncConfig()` runs with NO reading taken. */
    const s3 = new SecurePanels(mountEl() as never)
    s3.refreshDebug(runtimeStub)
    readOf('F1-S3', s3)

    /* `F1-S4` — A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER (the declared
     * `undefined`-counts-as-`null` arm). */
    const omittingExclusion: Record<string, unknown> = { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, read: null }
    const s4 = await mountPaneFor(omittingExclusion)
    readOf('F1-S4', s4.panels)

    /* ── THE LANDED HALF OF `D-vi`, ASSERTED PER STATE, AND IT HOLDS ON TODAY'S BYTES: the
     * `· MCP:` word and the affordance word are NOT painted before a carrier answer. That is what
     * makes the red below ATTRIBUTABLE TO THE PROP ALONE — the FIELD-default repair landed; the
     * AUTHORED NODE's literal did not move with it. */
    for (const r of readings) {
      expect(r.status, `${r.state} — the \`· MCP:\` WORD is not painted before a carrier answer (measured line: "${r.status}")`).not.toMatch(MCP_WORD)
      expect(r.affordance, `${r.state} — nor is the AFFORDANCE WORD (measured: "${r.affordance}")`).not.toMatch(AFFORDANCE_WORD)
    }
    /* THE FIDELITY ANCHOR — the `[T]` shape of `F1-S1` reproduces the LIVE record's own pre-carrier
     * `statusText` VERBATIM (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§3` `U-1`), so
     * the four readings below are the same paint the live observer caught, measured one layer
     * down. */
    // **RE-GRAINED AT `D-129`, AND THE ANCHOR IS THE REASON THIS ROW NOW BITES TWICE.** It reproduced the live record's
    // pre-carrier `statusText` VERBATIM, which carried `enabled: [read, dispatch]` — and that member is THE SAME DEFECT this
    // row is about: an authored value standing in for a reading the carrier never supplied (`D-vi`'s own clause, and
    // `recordMustStand` already enforces the real shape at the record address). Re-taken so the anchor keeps its job — proving
    // the paint is faithful apart from the defects under test — over the honest arm.
    expect(readings[0].status, 'THE FIDELITY ANCHOR, RE-TAKEN AT `D-129`: the pre-carrier `statusText` names BOTH absences in words (`D-vi`) and paints no group set').toBe('token: (none) · enabled: (no reading) · journal: ∞')

    /* ── THE RED (all FOUR no-answer states measured in ONE reading, so a first failure hides
     * none of them): NO `data-state` PROP BEFORE A CARRIER ANSWER. The expected reading is the
     * clause's own — `D-vi`: *"writes NO `data-state` PROP"* — so an absent prop is the term, and
     * NEITHER state word is admitted (an authored `mcp-enabled` is the INVERSE of the carried
     * state in the MCP-DISABLED case: the live record's own figure). */
    expect(
      readings.map((r) => `${r.state}: ${JSON.stringify(r.prop)}`),
      'NO AUTHORED STATE LITERAL BEFORE A CARRIER ANSWER — `§2.6` item 3\'s `D-vi` ("BEFORE ANY CARRIER ANSWER … writes NO `data-state` PROP"), `§2.6` item 1(b) (the prop "must come from the boolean-fed carrier member"), `§3.2` `FS-T4-13`. Expected every no-answer state to write NO prop at all (`undefined`); what stands there instead is the AUTHORED ENVELOPE LITERAL `\'mcp-enabled\'` (`src/renderer/secure-panels.ts:227`), the one thing the `null` arm never clears — it clears the affordance WORD and writes no prop. The clause admits NEITHER state word, and the value is measured, never inferred.',
    ).toEqual(['F1-S1: undefined', 'F1-S2: undefined', 'F1-S3: undefined', 'F1-S4: undefined'])
  })

  it('F-1-CTL · THE SETTLED PATH IS UNCHANGED (the non-vacuity control for `F-1`): a successful carrier answer paints the CARRIER\'s value at BOTH cells — so the repair may NOT be "stop painting the toggle" — and the refusal segment is present IFF `read` is non-null', async () => {
    /* `F1-CTL-1` — OPEN, `read: null` (the steady open pair): BOTH cells carry the carrier. */
    const open = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(panePropOf(open.panels, 'exclusion-toggle', 'data-state'), 'CELL 1 (`§2.6` item 1(b)): the toggle\'s `data-state` carries the CARRIER\'s value').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(open.panels, 'security-status'), 'CELL 2: the `MCP:` segment carries the SAME reading').toContain('· MCP: disabled')
    expect(paneTextOf(open.panels, 'exclusion-toggle'), 'and the affordance word follows it').toContain('Enable MCP')
    expect(paneTextOf(open.panels, 'security-status'), '`read: null` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-2` — CLOSED with the refusal (the SAME two cells, the INVERSE value — DRIVEN, never
     * inferred: this is the value pair the `F-1` finding turns on). */
    const closed = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    expect(panePropOf(closed.panels, 'exclusion-toggle', 'data-state'), 'the INVERSE value, driven from the carrier').toBe(STATE_MCP_ENABLED)
    expect(paneTextOf(closed.panels, 'security-status')).toContain('· MCP: enabled')
    expect(paneTextOf(closed.panels, 'exclusion-toggle')).toContain('Disable MCP')
    expect(paneTextOf(closed.panels, 'security-status'), 'the segment is PRESENT iff `read` is non-null').toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-3` — the SAME pane, re-refreshed with the OTHER carrier value (the re-source
     * driven, `CTL-5`'s own subject): the two cells move TOGETHER, and the segment leaves with the
     * refusal. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...carrierRecord(STATE_MCP_DISABLED, null) }) } } }
    await fillPane(closed.panels)
    expect(panePropOf(closed.panels, 'exclusion-toggle', 'data-state'), 'the pane re-sources from the CARRIER — never from its own prior value, never from a literal').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(closed.panels, 'security-status'), 'and BOTH cells moved together').toContain('· MCP: disabled')
    expect(paneTextOf(closed.panels, 'security-status'), '`read` is null again ⇒ the segment is gone').not.toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-4` — THE DECLARED RETENTION ACROSS A BRIDGE ERROR (`§2.6` item 3's own reading of the
     * as-filed *"absent means the last observed read was performed"*: *"the last value it WAS TOLD
     * stays on screen"*), which `§3.2` `FS-T4-13`'s dated note declares NOT A FAILURE. **THE LIMIT
     * OF THIS ARM, NAMED:** the note makes RETENTION of a CARRIER-SUPPLIED value not-a-failure, so
     * this row does NOT require the prop to be retained; what it requires is that the AUTHORED
     * LITERAL is not what stands there — the two admitted readings are the last CARRIER-SUPPLIED
     * value or an absent prop. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    await fillPane(closed.panels)
    expect(paneTextOf(closed.panels, 'security-status'), 'the last CARRIER-SUPPLIED reading stays on the line — and it is `mcp-disabled`, NOT the authored literal').toContain('· MCP: disabled')
    const retained = panePropOf(closed.panels, 'exclusion-toggle', 'data-state')
    expect([STATE_MCP_DISABLED, undefined], `the prop carries the last CARRIER-SUPPLIED value or is ABSENT — never the AUTHORED literal (measured: ${JSON.stringify(retained)}; the authored literal is ${STATE_MCP_ENABLED}, which is the value \`F-1\` measures in the no-answer states)`).toContain(retained)
    expect([STATE_MCP_DISABLED, undefined], `CONTROL: NEITHER admitted reading is the AUTHORED literal — \`${STATE_MCP_DISABLED}\` and an absent prop are BOTH distinct from \`${STATE_MCP_ENABLED}\`, which is the value \`F-1\` measures in its four no-answer states`).not.toContain(STATE_MCP_ENABLED)
  })
})
