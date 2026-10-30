// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
/**
 * ============================================================================
 * G3 = U-STORE-SECURITY — `docs/specs/store-security.md`'s battery, RE-GRAINED
 * onto the storeroom re-home (`security-store-storeroom` `E-1`..`E-4`; this pass,
 * `2026-10-29`, the one that landed `5790656`).
 *
 * WHAT THIS FILE WAS: the tier-4 re-home's red set, authored from the spec alone
 * against the tree that still owned `src/main/security-store.ts` — every §2.2/§2.3
 * row drove that module's own persist and its `lastWriteReceipt()`, and its §5.5.1
 * register executed the module's typed register as a closed 50-attempt table.
 *
 * WHAT IT IS NOW, AND WHY: `E-1` RETIRED `src/main/security-store.ts` — the
 * operator's security record lives in its OWN `provident-storeroom` instance
 * (`src/main/operator-settings/index.ts`), and the composition reaches it only
 * through ONE surface module (`src/main/settings-surface/index.ts`) whose verbs
 * `src/main/main.ts`'s three security routes DELEGATE to (`:411` GET · `:425`
 * SET · `:440` transition · carrier `settingsSurface.read()` at `:109` ·
 * `attach(mcp)` at `:527`).  So this pass applied exactly TWO predicates and
 * invented no third:
 *
 *  · RE-GRAIN — a row whose FIGURE or PATH LITERAL moved under `C-1`..`C-4` and
 *    whose SUBJECT still stands is moved to the new figure or the new path, and
 *    nothing else about it changes.  Where such a row asserted an ABSENCE the
 *    landing has now satisfied, it is flipped to the PRESENCE reading the row
 *    itself declares (a re-grain, never a weakening).  The four moved figures:
 *    `C-2` the receipt types' import source (`settings-surface/index.ts`);
 *    `C-3` `main.ts`'s construction / boot read / carrier into the surface module;
 *    `C-4` the persisted-file names (`provident-security.json` retired — read at
 *    most once, never written — and `provident-operator-settings.json` added).
 *    (`C-1`, the group set's second live copy at `operator-settings/index.ts:77`,
 *    moves no figure this file cites: no surviving row reads the group set.)
 *  · RETIREMENT — a row whose SUBJECT is `E-1`'s retired file, its five-member API,
 *    its two-token receipt vocabulary (`'committed'` / `'write-failed'`), its
 *    on-disk record shape, its frozen byte-digests, its 16-member refusal union,
 *    its `secure-refused` PLACEMENT census, or its boot over a file; or a row
 *    whose subject is a composition site `E-1`/`E-2`/`E-3` removed and whose
 *    behaviour no longer exists anywhere.  A retired row is NEVER re-pointed: no
 *    deleted file is re-hashed and no digest is re-pinned (the two frozen
 *    `renderer/store-*.ts` digests stay retired WITH their row, not re-frozen
 *    here).
 *
 * THE LEDGER OF THIS PASS — 33 `it` rows as filed (40 with the section blocks)
 * → 17 `it` rows (16 retired, 10 re-grained, 7 untouched; the per-row table is in
 * the pass's own return):
 *   RETIRED (16) · §2.2 M-1 · F-1 · F-2 · F-3 · F-5 · F-6 · I-1/I-7/I-8 (the
 *   store's persist/atomicity, its `lastWriteReceipt()`, its `'committed'` /
 *   `'write-failed'` vocabulary, its on-disk record shape, the deleted file's
 *   swallow); §2.3 M-2 · M-6 (the receipt read on the STORE surface, and the
 *   store's atomic journal-length round-trip — the SET-response half both rows
 *   also read survives in the re-grained `write`-member row and has its own home
 *   in `tests/unit/settings-surface/surface.test.ts` and
 *   `tests/integration/security-store-storeroom/surface.test.ts`) · "the receipt
 *   is NOT a member of the store's 16-member refusal union"; §2.4 the E-2-form
 *   byte-pin · "the tier's OWN API answers"; §3.2/§3.3 F-4/I-4 (the store's boot
 *   over a file) · F-11 (the store's tmp-cleanup persist); §5.5.1 BOTH register
 *   rows, retired WITH the register machinery only they used (the typed
 *   register's subject IS the retired module).
 *   RE-GRAINED (10) · "the SET response record's `write` member" (absence → the
 *   presence reading: the handler DELEGATES, the surface MINTS) · "the preload's
 *   `security.set` is re-declared …" (`C-2`) · "P-SE-IM-3's visible divergence"
 *   (the re-gate is the surface module's own subscription, not the handler's) ·
 *   "the no-second-site census" and "the DECLARED TEST SEAM" production-absence
 *   census (the deleted file leaves the census list; the unit's two new sites
 *   join it) · "M-7/P-SE-IM-4(2)" (`C-2`: the `lastWriteReceipt` spelling leaves a
 *   reach detector over a bridge that no longer declares it) · "M-4(dynamic)" (the
 *   drive the seam unblocked now RUNS: the register that hosted it retired, so its
 *   own falsifier form is driven here) · "M-8" (`C-3`: the chain's main-side
 *   carrier is `settingsSurface.read()`) · "F-7/F-10/I-2/I-3" (`C-4`: the
 *   persisted-file literals moved) · "the I-1/I-5/I-6 fold" (its register pointer
 *   retires; its two live pointers stand).
 *   UNTOUCHED (7) · M-3/F-14 · M-4(static)/F-8 · M-5/F-8 (the burst) ·
 *   M-7/P-SE-IM-4(1) · (3/4) · F-9 · §7a — every figure each cites is a
 *   `src/renderer/**` or `src/shared/**` fact the landing did not move (checked,
 *   not assumed: the burst probe's exactly-two count, the one `bridge.security.get()`
 *   read, the `{uri}`-only payload and the Runtime/Supervisor wiring all still read
 *   as filed).
 *
 * THE SECOND PASS'S LEDGER — `settings-carrier-retirement` `E-5` (L1 §6/§9 E-5,
 * `2026-10-29`).  ONE row moves in this file, and it is a RE-GRAIN, never a
 * retirement: this file holds no row whose subject is the retired tier-1 carrier's
 * own machinery (that battery is `tests/store-persist.test.ts`, where the tmp
 * sequence and the `schemaVersion` stamp live and where §6's retirement rule bites).
 *   RE-GRAINED (1) · "F-7/F-10/I-2/I-3" — the carrier's `provident-settings.json`
 *   LEFT `main.ts` with the writer, so the userData literal census falls to
 *   `['provident-modules.json']` ALONE (L1 §3's closed removal list), the instance
 *   module's `readFileSync` count moves ONE → TWO (the security record's import read
 *   plus the carrier's, still with no write, rename or remove call anywhere), and
 *   the "spell neither record name" and "the retired name is declared once" limbs are
 *   EXTENDED to the second retired name (`provident-settings.json`, `L2
 *   behaviour.md` §8 `RET-2`/`RET-3`, `persistence.md`:43).  THE CLAIM IS UNMOVED: the
 *   persisted set is exactly the declared carriers, each with one writer, no third
 *   file — only the place the tree spells the names moved (D-13).
 *   RETIRED (0) · UNTOUCHED (16) · every other row above reads `src/renderer/**`,
 *   `src/shared/**` or the security record, none of which this unit moved (checked:
 *   `src/renderer/renderer.ts` still names no record file, and the instance module
 *   still carries no write verb).
 *
 * NO TIMING FIGURE IS CLAIMED ANYWHERE IN THIS FILE (§1.4), and no row asserts a
 * refusal, a token or a digest of the retired module.
 * ============================================================================
 */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { beforeAll, describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGraphStore } from '../src/renderer/store-core-graph.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
// G3 gate-4 finding 2's P-SE-SM-2 drive constructs the REAL pane —
// `new SecurePanels(mountEl(), { maxJournalLength: M })` — so the shimmed DOM the
// secure-panels.test.ts precedent installs (installShim() + mountEl()) is needed.
// RE-GRAINED 2026-10-29: the drive now lives in the M-4(dynamic) ROW (it hosted
// the retired register's P-SE-SM-2 attempts before; its subject did not retire).
import { installShim, mountEl } from '../src/shared/dom-shim.js'

/* ============================ test-local source IO (REAL fs) ============== */

const TEST_ROOT = dirname(fileURLToPath(import.meta.url))
const SRC = (...rel: string[]): string => join(TEST_ROOT, '..', 'src', ...rel)

async function sourceOf(rel: string[]): Promise<string> {
  return await readFile(SRC(...rel), 'utf8')
}
let cachedMainSrc: string | null = null
async function awaitMainSource(): Promise<string> {
  if (cachedMainSrc === null) cachedMainSrc = await sourceOf(['main', 'main.ts'])
  return cachedMainSrc
}
let cachedSurfaceSrc: string | null = null
async function surfaceSource(): Promise<string> {
  if (cachedSurfaceSrc === null) cachedSurfaceSrc = await sourceOf(['main', 'settings-surface', 'index.ts'])
  return cachedSurfaceSrc
}
/** THE IPC_SECURITY_SET HANDLER'S BODY WINDOW (`C-3`; main.ts:425-441).
 *  RE-GRAINED 2026-10-29: the as-filed anchor closed on `return updated`, the
 *  landed handler's own resolution; the handler now DELEGATES — `return
 *  settingsSurface.set(patch)` — so the anchor closes on that line.  The window
 *  is opened on the registration and truncated at the registration's own `})`,
 *  so the patch TYPE's closing brace never truncates it. */
async function setHandlerSource(): Promise<string> {
  const mainSrc = await awaitMainSource()
  return /ipcMain\.handle\(\s*IPC_SECURITY_SET[\s\S]*?return settingsSurface\.set\(patch\)\s*\n  \}\)/.exec(mainSrc)?.[0] ?? ''
}
/** THE ADDITIVE `write` MEMBER'S ONE MINT SITE (`settings-surface/index.ts:170`),
 *  read as a DETECTOR so its bite can be controlled: the SET answer's literal must
 *  carry `write:` bound to THAT write's receipt.  The control beside every reading
 *  drives the same detector over a carrier missing the member (it must NOT fire). */
const SET_ANSWER_WRITE = /const answer: SettingsSetAnswer = \{[^}]*write: receipt[^}]*\}/
const SET_ANSWER_TYPE_WRITE = /export type SettingsSetAnswer = \{[^}]*write: SecurityWriteReceipt[^}]*\}/
/** THE UNIT'S DIFF SCOPE as `E-1`..`E-4` LEAVE IT (`C-3`, `C-4`): the two modules
 *  that now own the record and the surface, then the four carriers the unit
 *  already denied.  RE-GRAINED 2026-10-29: `main/security-store.ts` LEAVES the list
 *  (the file is retired — a census over a deleted file proves nothing) and the
 *  unit's two new subjects join it, so the "no second site" claim is a claim about
 *  the code that actually exists. */
const DIFF_SCOPE: readonly string[][] = [
  ['main', 'operator-settings', 'index.ts'],
  ['main', 'settings-surface', 'index.ts'],
  ['main', 'main.ts'],
  ['main', 'preload.ts'],
  ['renderer', 'renderer.ts'],
  ['renderer', 'secure-panels.ts'],
]

/** The refreshDebug drive's fake runtime — the app Runtime's rendered-html surface
 *  the pane reads (`renderedHtmlResult(): { census, ssrHtml }`, secure-panels.ts).
 *  The census/ssrHtml CONTENT is irrelevant to the depth observable — a fresh
 *  object per call, never shared state across drives. */
function fakePaneRuntime(): { renderedHtmlResult(): { census: Record<string, unknown>; ssrHtml: string } } {
  return {
    renderedHtmlResult: () => ({
      census: { inTree: 1, registered: 1, unplaced: 0, destroyed: 0, prototypes: 0 },
      ssrHtml: '<div class="app" id="root">security panes</div>',
    }),
  }
}
/** THE FALSIFIER'S FORM (§2.5 items 1/2/4): construct the REAL pane with a SMALL
 *  cap M, drive N refreshDebug cycles — one cycle journals one state-slice per
 *  mutated pane node — let the engine's DEFERRED condense (a timer-tick macro
 *  task) settle, then READ the seam `journalDepth()`.  Returns the settled capped
 *  depth + the UNCAPPED control's depth (the same N on a pane with NO
 *  `maxJournalLength` — the cap never fires there, so the control grows past M,
 *  proving the capped ≤ M is the CAP's observable and never a vacuous zero). */
async function drivePaneCap(M: number, N: number): Promise<{ capped: number; uncapped: number }> {
  const mount = mountEl() as never
  const panels = new SecurePanels(mount as never, { maxJournalLength: M })
  for (let i = 0; i < N; i++) panels.refreshDebug(fakePaneRuntime() as never)
  await new Promise((r) => setTimeout(r, 0)) // the deferred condense's timer tick
  const capped = panels.journalDepth()
  const rawMount = mountEl() as never
  const uncapped = new SecurePanels(rawMount as never)
  for (let i = 0; i < N; i++) uncapped.refreshDebug(fakePaneRuntime() as never)
  await new Promise((r) => setTimeout(r, 0))
  const uncappedDepth = uncapped.journalDepth()
  return { capped, uncapped: uncappedDepth }
}
/** THE BURST-ABSENCE PROBE (§2.5 item 3) — the CLOSED-OCCURRENCE form kept from
 *  the gate-4 re-audit (NEW-1): the as-filed `bridge.onRequest … sendReply` span
 *  matched NOTHING after the re-home (sendReply sits INSIDE `replyRoute`), so the
 *  probe passed vacuously under ANY code state.  The count pins the CODE-LEVEL
 *  invocation spelling `panels.{?}.refreshDebug(runtime)` — EXACTLY TWO sites
 *  allowed: the boot refresh + the app-graph-changed notify-callback — and a THIRD
 *  site anywhere (a re-added reply-path burst) FAILS.  Raw `/refreshDebug/` is NOT
 *  counted: it also matches the two COMMENT mentions that quote the removed verb. */
function refreshDebugCodeSites(rendererSrc: string): string[] {
  const out: string[] = []
  for (const m of rendererSrc.matchAll(/panels\??\.refreshDebug\(runtime\)/g)) {
    const lineHead = m.index !== undefined ? rendererSrc.slice(rendererSrc.lastIndexOf('\n', m.index - 1) + 1, m.index) : ''
    if (!lineHead.includes('//')) out.push(m[0])
  }
  return out
}
/** The closed-occurrence assertion block — the row's intent, all three legs: (i)
 *  the EXACTLY-TWO count, (ii) the boot refresh's presence, (iii) the notify
 *  callback's presence. */
function assertBurstAbsentForm2(rendererSrc: string): void {
  const sites = refreshDebugCodeSites(rendererSrc)
  expect(sites.length,
    '§2.5 item 3 — the debug refresh re-homes onto EXACTLY TWO invocation sites: the BOOT refresh + the app-graph-changed notify callback. A re-added reply-path refreshDebug is a THIRD code-level site ANYWHERE in renderer.ts and FAILS. Measured sites: ' + sites.length + ' (' + sites.join(' | ') + ')').toBe(2)
  const bootBlock = /if \(panels\) \{[\s\S]*?\n  \}/.exec(rendererSrc)?.[0] ?? ''
  expect(/panels\.refreshDebug\(runtime\)/.test(bootBlock),
    '§2.5 item 3(i) — the BOOT refresh (panels.refresh() + panels.refreshDebug(runtime)) stays').toBe(true)
  const notifyCallback = /handleRequest\(runtime, req, \(p\) => [\s\S]*?bridge!?\.notify\(p\)[\s\S]*?\)/.exec(rendererSrc)?.[0] ?? ''
  expect(/refreshDebug/.test(notifyCallback),
    '§2.5 item 3(ii) — the notify callback becomes `(p) => { bridge.notify(p); panels?.refreshDebug(runtime) }` — ONE refresh per MUTATING reply, coalesced with the ONE notify (N4).').toBe(true)
}

beforeAll(async () => {
  // the M-4(dynamic) falsifier constructs the REAL SecurePanels (mountEl() +
  // DomAdapter) — the shimmed DOM must be installed first (the
  // secure-panels.test.ts precedent, installShim() + mountEl()):
  installShim()
})

/* ============================================================================
 * §2.3 THE RECEIPT — the additive `write` member, the bridge's declared surface,
 * and the divergence that keeps the two holders visible.  (RE-GRAINED 2026-10-29:
 * the §2.2 block retired WHOLE — its seven rows' subject was `security-store.ts`'s
 * own persist and its `lastWriteReceipt()`, both retired by `E-1`; the rows that
 * survive here are the CARRIER rows, whose subject is `main.ts`'s handler bodies
 * and `preload.ts`'s declared surface.)
 * ========================================================================== */

describe('G3 §2.3 THE RECEIPT — the additive `write` carrier and the bridge\'s declared surface (RE-GRAINED 2026-10-29: `C-2`/`C-3`)', () => {
  it('the SET response record\'s `write` member — the additive delivery (§2.3 item 2) is MINTED by the surface module and DELEGATED by the handler (RE-GRAINED 2026-10-29: the as-filed reading asserted the member ABSENT from a handler that returned `updated`; the landing SATISFIES that absence)', async () => {
    const setHandler = await setHandlerSource()
    // THE ROW'S OWN DECLARED READING, now a PRESENCE: the handler returns
    // `{...settings, write: <this write's receipt>}` because the surface module's
    // `set()` mints exactly that answer.  The bite is kept by the two controls below.
    expect(setHandler.length, 'the IPC_SECURITY_SET handler window is readable — a reading over nothing proves nothing (§2.3 item 2)').toBeGreaterThan(0)
    expect(/return settingsSurface\.set\(patch\)\s*\n  \}\)/.test(setHandler),
      '§2.3 item 2 / `C-3` — the SET handler DELEGATES to the surface module (`return settingsSurface.set(patch)`), whose answer is the post-state extended by the additive `write` member; the handler spells no receipt of its own.').toBe(true)
    expect(/mcp\.applyGatePatch/.test(setHandler),
      '§2.3 item 3 / `C-3` — and the handler re-patches NO gate: the re-patch rides the surface module\'s OWN subscription, inside the write, so no second edge exists (D-17).').toBe(false)
    const surface = await surfaceSource()
    expect(SET_ANSWER_WRITE.test(surface),
      '§2.3 item 2 / `C-2` — the SET answer\'s `write` member is minted by `settings-surface/index.ts` from THAT write\'s receipt, beside the same post-state reading (`const answer: SettingsSetAnswer = { … write: receipt … }`).').toBe(true)
    expect(SET_ANSWER_WRITE.test('const answer: SettingsSetAnswer = { token: post.token, enabled: [...post.enabled], exclusion: post.exclusion }'),
      'CONTROL — the detector does NOT fire on a carrier missing the member, so the reading above is a bound and not a tautology.').toBe(false)
    expect(SET_ANSWER_TYPE_WRITE.test(surface),
      '§2.3 item 2 — and the declared ANSWER TYPE carries the member (`SettingsSetAnswer … write: SecurityWriteReceipt`), so a reader typed to the answer reads the receipt.').toBe(true)
  })

  it('the preload\'s security.set is re-declared as the SUPERSET Promise<SecuritySettings & { write }> (§2.3 item 2)', async () => {
    const preloadSrc = await sourceOf(['main', 'preload.ts'])
    /* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (5)): THE LANDED SHAPE.** The as-filed
     * term pinned `{ write: SecurityWriteReceipt }`; `S2` `U-TIER4-ARBITRARY-STORAGE`
     * DECLARES the response record's `write` member as the store's own ANSWER SUPERSET —
     * `Tier4WriteAnswer = SecurityWriteReceipt | Tier4ClosedRefusal` — at BOTH declaration
     * sites (`S2` `§2.4` item 2's superset clause, `§2.1` item 3's declared types, `PAR-10`
     * and `§2.1` item 8: *"the SET sites become `Promise<SecuritySettings & { write:
     * Tier4WriteAnswer }>`"*), and `SecurityWriteReceipt` ITSELF stays byte-identical inside
     * that superset. The term reads the LANDED spelling; the bite is kept below by a control
     * that drives the detector on a shape MISSING the member. */
    const writeSuperset = /Promise<SecuritySettings\s*&\s*\{\s*write\s*:\s*Tier4WriteAnswer\s*\}>/
    expect(writeSuperset.test('set(): Promise<SecuritySettings & { write: Tier4WriteAnswer }>'),
      'CONTROL — the superset detector FIRES on the LANDED declaration').toBe(true)
    expect(writeSuperset.test('set(): Promise<SecuritySettings>'),
      'CONTROL (negative) — and it does NOT fire on the UNWIDENED carrier (`Promise<SecuritySettings>`), so the reading below is a bound').toBe(false)
    // the base form exists (GREEN half — the preload's own read base is still declared):
    expect(/Promise<SecuritySettings>/.test(preloadSrc), 'the preload still declares the base `Promise<SecuritySettings>` (the read base, `SecurityReadBase`)').toBe(true)
    // the DECLARED superset (the receipt's additive write member, in its LANDED spelling) is present — GREEN:
    expect(writeSuperset.test(preloadSrc),
      '§2.3 item 2 / `S2` PAR-10 — the preload\'s security.set is re-declared as `Promise<SecuritySettings & { write: Tier4WriteAnswer }>`: the declared SUPERSET of the committed receipt (`SecurityWriteReceipt`, byte-identical inside it) and the new sibling closed refusal (`Tier4ClosedRefusal`).').toBe(true)
    // the pane module's OWN bridge declaration carries the same superset:
    const panelSrc = await sourceOf(['renderer', 'secure-panels.ts'])
    expect(writeSuperset.test(panelSrc),
      '§2.3 item 2 / `S2` PAR-10 — the pane\'s declared `security.set` follows the same LANDED superset, so the two declaration sites are widened in LOCKSTEP (a HALF-WIDENING fails, `S2` `§2.1` item 8).').toBe(true)
    // **⟶ RE-GRAINED 2026-10-29 (`C-2`): THE TYPES' IMPORT SOURCE.** The two declaration
    // sites no longer import the receipt types from the retired module; `E-1` re-homed them
    // at `settings-surface/index.ts`.  The claim is unmoved — the two sites declare ONE
    // superset type from ONE holder — so the reading names the new holder:
    expect(/import type \{[^}]*Tier4WriteAnswer[^}]*\} from '\.\/settings-surface\/index\.js'/.test(preloadSrc),
      '`C-2` — `preload.ts` draws `Tier4WriteAnswer` from `settings-surface/index.ts` (its landed home), never from the retired module').toBe(true)
    expect(/import type \{[^}]*Tier4WriteAnswer[^}]*\} from '\.\.\/main\/settings-surface\/index\.js'/.test(panelSrc),
      '`C-2` — and the pane\'s declaration draws the SAME name from the SAME holder, so the lockstep widening survives the re-home').toBe(true)
  })

  it('P-SE-IM-3\'s visible divergence: the two-holder shape is NOT merged but never silent; the gate re-gate is still invoked — by the SURFACE MODULE\'S OWN subscription (RE-GRAINED 2026-10-29: `C-3`)', async () => {
    // **THE RE-GRAIN, OLD → NEW.** AS FILED this row asserted `/mcp\.applyGatePatch/`
    // inside the IPC_SECURITY_SET handler's body.  `C-3` moved the handler's gate call
    // into the surface module: the handler delegates, and the re-patch rides the
    // instance's ONE subscription INSIDE the write (D-17; design §6), plus `attach`'s
    // boot patch.  THE CLAIM IS UNMOVED — "the re-gate is still invoked; the divergence
    // is visible, never silent" — and the bite is EQUAL: a landing that dropped the
    // re-patch entirely (or restored a second gate edge in the handler) still reddens.
    const setHandler = await setHandlerSource()
    expect(/return settingsSurface\.set\(patch\)/.test(setHandler),
      '§2.3 item 3 / `C-3` — the SET handler delegates to the surface module, so the write and its answer are ONE act').toBe(true)
    expect(/mcp\.applyGatePatch/.test(setHandler),
      '§2.3 item 3 — NO second gate edge survives in the handler (§2.6 item 4: the total re-patch reach is the surface module\'s)').toBe(false)
    const surface = await surfaceSource()
    expect(/held\.applyGatePatch\(/.test(surface),
      '§2.3 item 3 — the re-patch is INVOKED on every delivery, inside the subscription body (`onDelivery`), so the gate holds the granted groups before any answer is minted').toBe(true)
    expect(/heldSink\.applyGatePatch\(/.test(surface),
      '§2.3 item 3 — and `attach` re-patches the record it finds (the boot edge), so a store that stands at boot is never left unpainted').toBe(true)
    // the divergence is VISIBLE via the receipt on the delivery surface (the store's own
    // `lastWriteReceipt()` half of this row retired WITH the module; the carrier half is
    // the SET answer's `write` member, minted from that write's receipt):
    expect(SET_ANSWER_WRITE.test(surface),
      'P-SE-IM-3 — the persist outcome exists on the SET response record (`write`), minted from the instance\'s receipt of THAT write').toBe(true)
    expect(/const receipt: OperatorSettingsReceipt = settings\.write\(/.test(surface),
      'P-SE-IM-3 — and the receipt the member carries is the one the instance ANSWERED to this write (one write, one receipt, no re-read)').toBe(true)
  })
})

/* ============================================================================
 * §2.4 THE secure.* REFUSAL — the store's OWN, NO second site (driven [T]).
 * (The E-2-form byte-pin row and the retired tier's own-API row leave with `E-1`;
 * the drive below and the census are the two whose subject stands.)
 * ========================================================================== */

describe('G3 §2.4 THE secure.* REFUSAL — the store\'s own, NO second site (driven [T])', () => {
  it('M-3/F-14: every generic-surface call on a secure.* name answers the store\'s own \'secure-refused\' — BEFORE the register, BEFORE any traversal', () => {
    const g = createGraphStore()
    // the F-14 drive (§2.4 item 1): read + the generic write surface, on well-formed names NOT declared:
    for (const name of ['secure.operator.token', 'secure.undeclared']) {
      const r = g.resolve(name) as unknown as { status: unknown; reason: unknown; step: unknown }
      expect(r.status, `resolve('${name}') answers the typed refusal record, never a throw, never a silent miss (§2.4 item 2)`).toBe('refused')
      expect(r.reason, `resolve('${name}') → 'secure-refused' — NEVER 'undeclared-name', NEVER 'tier-filter-miss', NEVER a value (M-3, F-14)`).toBe('secure-refused')
      expect(r.step, `resolve('${name}') refuses AT B-SECURE-GATE — BEFORE the register and BEFORE any traversal (§2.4 item 1)`).toBe('B-SECURE-GATE')
    }
    // OBSERVATION (recorded, not a row): the malformed+secure twin `secure..x` answers
    // 'malformed-name' from the LANDED module (A-PARSE wins before B-SECURE-GATE for that
    // spelling).  §3a's adversarial seed owns that precedence hunt for the STORE's own
    // contract (store-core-graph.md §2.5 item 2) — this unit asserts nothing about the
    // store's internals beyond F-14's drive (§1.4 item 1, §7 item 7).
    const writes: Array<[string, () => unknown]> = [
      ['set', () => g.set('secure.operator.token', 'x')],
      ['commit', () => g.commit('secure.operator.token', 'x')],
      ['remove', () => g.remove('secure.operator.token')],
      ['clear', () => g.clear('secure.operator.token')],
      ['subscribe', () => g.subscribe('secure.operator.token', () => undefined)],
    ]
    for (const [op, run] of writes) {
      const r = run() as { status: unknown; reason: unknown }
      expect(r.status, `${op}('secure.operator.token') answers the typed refusal record (§2.4 item 1, F-14)`).toBe('refused')
      expect(r.reason, `${op}('secure.operator.token') → 'secure-refused', NEVER 'undeclared-name' (F-14)`).toBe('secure-refused')
    }
    // THE POSITIVE CONTROL (F-14): the SAME names without the secure segment answer 'undeclared-name' —
    // the refusal is distinguishable, never a blanket miss:
    for (const name of ['mem.operator.token', 'file.settings.theme.token']) {
      const r = g.resolve(name) as unknown as { reason: unknown }
      expect(r.reason, `positive control — resolve('${name}') (the same name without the secure segment) answers 'undeclared-name' (F-14, M-3)`).toBe('undeclared-name')
    }
  })

  it('F-7/P-SE-IM-2(3): the no-second-site census — the unit\'s diff-scope files carry NO \'secure-refused\' spelling and NO secure-segment check (RE-GRAINED 2026-10-29: `C-3`/`C-4` — the deleted file leaves the census, the unit\'s two new sites join it)', async () => {
    // **THE RE-GRAIN, OLD → NEW.** AS FILED the scope was `security-store.ts · main.ts ·
    // preload.ts · renderer.ts · secure-panels.ts`.  `E-1` deleted the first and `E-2`/`E-3`
    // created the two modules that now own the record and the surface, so the census reads
    // the code that EXISTS.  THE CLAIM IS UNMOVED: the refusal lives in the ONE landed store
    // module (`renderer/store-core-graph.ts`) and nowhere in this unit's scope — a rebuilt
    // site that spells it a second time is still a COLLISION finding (§2.4 item 3).
    for (const rel of DIFF_SCOPE) {
      const src = await sourceOf(rel)
      expect(/['"`]secure-refused['"`]/.test(src),
        `P-SE-IM-2(3) — ${rel.join('/')} carries NO 'secure-refused' spelling (§2.4 item 3 — a byte of THIS unit's scope that spells it is a COLLISION finding)`).toBe(false)
      expect(/=== ['"`]secure['"`]|split\('\.'\)\[0\] === ['"`]secure['"`]/.test(src),
        `P-SE-IM-2(3) — ${rel.join('/')} carries NO secure-segment check (§2.4 item 3 — the refusal lives ONLY in the landed store module)`).toBe(false)
    }
    // the store module is the ONLY holder of the spelling (the census's positive half):
    const moduleSrc = await sourceOf(['renderer', 'store-core-graph.ts'])
    expect(moduleSrc.includes('secure-refused'), 'the landed store module holds the refusal spelling (§2.4 item 1)').toBe(true)
  })
})

/* ============================================================================
 * §2.5 RH-3'S TWO HALVES — the cap, the burst's replacement, the seam.
 * ========================================================================== */

describe('G3 §2.5 RH-3\'s two halves', () => {
  it('M-4(static)/F-8: the pane Supervisor is built WITH the tier-4 maxJournalLength — the construction site carries the option (GREEN)', async () => {
    const panelSrc = await sourceOf(['renderer', 'secure-panels.ts'])
    // half (a) §2.5 items 1/2: the Supervisor construction gains the option:
    expect(/new Supervisor\(\{ events: new EventBridge\(\), graphScope: this\.scope, maxJournalLength/.test(panelSrc),
      '§2.5 items 1/2 — the pane Supervisor is constructed WITH `maxJournalLength` (the tier-4 value; the pane-cap IS that value — IDENTITY)').toBe(true)
    // the constructor declares the NEW option (a boot-read projection of tier 4, §2.5 item 2):
    expect(/constructor\(\s*mount: HTMLElement,\s*opts\?:\s*\{\s*maxJournalLength\?:\s*number\s*\}\s*\)/.test(panelSrc),
      '§2.5 item 2 — SecurePanels declares `constructor(mount, opts?: { maxJournalLength?: number })`').toBe(true)
    // the wiring passes the boot snapshot value at construction (§2.5 item 2 → renderer.ts):
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/new SecurePanels\(\s*panesMount,\s*\{\s*maxJournalLength/.test(rendererSrc),
      '§2.5 item 2 — the wiring constructs `new SecurePanels(panesMount, { maxJournalLength })` from the SAME boot snapshot the Runtime read').toBe(true)
  })

  it('§2.5 item 4: the DECLARED TEST SEAM `journalDepth()` exists on SecurePanels — and its production-negative control (RE-GRAINED 2026-10-29: `C-3`/`C-4` — the census list follows the unit\'s scope)', async () => {
    expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
      '§2.5 item 4 — `SecurePanels.journalDepth(): number` (the read-only seam over the pane supervisor\'s undoDepth) EXISTS.').toBe('function')
    // the seam's production-absence — NO shipped wiring calls it (honest GREEN control).
    // RE-GRAINED: the deleted file leaves the list, the unit's two new sites join it; the
    // claim is unmoved (a drive through shipped wiring FAILS, R C-8's discipline).
    for (const rel of DIFF_SCOPE) {
      const src = await sourceOf(rel)
      expect(/\.journalDepth\(/.test(src),
        `§2.5 item 4 production-negative — ${rel.join('/')} never calls journalDepth() (a drive through shipped wiring FAILS)`).toBe(false)
    }
  })

  it('M-5/F-8: THE BURST IS STOPPED — the reply path does NOT call refreshDebug; the debug refresh re-homes onto boot + the app-graph-changed notify', async () => {
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    // NEW-1 re-aim (2026-10-03, gate-4 RE-audit): the as-filed anchor
    // `bridge\.onRequest[^]*?bridge\.sendReply\(reply\)` matched NOTHING after the
    // re-home (sendReply sits INSIDE replyRoute), so `expect(/refreshDebug/.test(''))`
    // passed under ANY code state — the probe was structurally vacuous.  THE
    // CLOSED-OCCURRENCE FORM (assertBurstAbsentForm2) counts the code-level
    // refreshDebug invocation sites: exactly TWO (boot + notify callback); a third
    // site anywhere (a re-added reply-path burst) FAILS — the mutation probe (a
    // scratch copy of renderer.ts with the burst re-added) reddens this row, so the
    // absence is checkable, not assumed:
    assertBurstAbsentForm2(rendererSrc)
  })

  it('M-4(dynamic): the pane journal stays bounded — the falsifier\'s form, DRIVEN (RE-GRAINED 2026-10-29: the seam exists, so the drive the retired register hosted now runs HERE)', async () => {
    // **THE RE-GRAIN, OLD → NEW.** AS FILED this row asserted only the seam's existence
    // (`typeof journalDepth === 'function'`), because the red that blocked the drive was
    // the seam's absence.  The seam landed, and the drive itself (the register's
    // `P-SE-SM-2` attempts, whose term carried it) retires WITH that register — so the
    // row's OWN declared reading — "with the cap M set, drive N refresh cycles and assert
    // journalDepth() ≤ M" — is driven here.  This is a RE-GRAIN, never a weakening: the
    // as-filed existence leg is kept and the falsifier is added beside it.
    expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
      'M-4 — journalDepth() exists so the bounded-journal drive can read it (§2.5 item 4)').toBe('function')
    const { capped, uncapped } = await drivePaneCap(2, 5)
    expect(capped,
      'M-4 — with the cap M=2, FIVE refreshDebug drives cross the cap (one cycle journals one state-slice per mutated pane node) and journalDepth() stays ≤ M once the deferred condense settles (§2.5 items 1/2/4): measured ' + capped).toBeLessThanOrEqual(2)
    expect(uncapped,
      'M-4 — the UNCAPPED control grows past M on the same drive (the journal is written; the capped ≤ M is the CAP\'s observable, never a vacuous zero): measured ' + uncapped).toBeGreaterThan(2)
  })
})

/* ============================================================================
 * §2.6 THE INVISIBILITY CENSUS — the tier-4 non-negotiable; GREEN if clean.
 * ========================================================================== */

describe('G3 §2.6 THE INVISIBILITY CENSUS (honest: the current surface is clean — GREEN with live controls)', () => {
  it('M-7/P-SE-IM-4(1): no graph node can hold a tier-4 value — the refusal precedes registration, and a tier-1 value DOES reach a node (positive control 1)', () => {
    const g = createGraphStore()
    // a tier-1 value reaches a node (the control proves the carrier is real — the root-level
    // mint is the one write that lifts a state-(iii) top into state (i), §2.8 item 3):
    const w = g.commit('mem.settings', { theme: { token: 'dark' } }) as { status: unknown }
    expect(w.status, 'positive control — a tier-1 value commits at the root level (mem.settings) (§2.6 item 5)').toBe('committed')
    const hit = g.resolve('mem.settings') as { found: unknown; value: { theme: { token?: unknown } } | null; flag: unknown }
    expect(hit.found, 'the committed tier-1 record resolves to a node').toBe(true)
    expect((hit.value as { theme?: { token?: unknown } } | null)?.theme?.token).toBe('dark')
    // the node flag is a GraphNodeFlag member — 'secure' is a FILTER token, never a flag (store-core-graph.ts:14-16):
    expect(['temp', 'mem', 'file']).toContain(hit.flag)
    // and no tier-4 name can ever be registered/resolved:
    const refused = g.resolve('secure.settings.theme.token') as unknown as { status: unknown; reason: unknown }
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('secure-refused')
    // the register never carries a secure name (the register row's subject):
    expect(JSON.stringify(g.register)).not.toMatch(/secure/)
  })

  it('M-7/P-SE-IM-4(2): a tool result carries graph answers and NO tier-4 value; the MCP route never touches tier 4 (static)', async () => {
    // the MCP route: handleRequest serves from the APP graph (the runtime), never bridge.security:
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    const requestRoute = /function handleRequest[\s\S]*?^}/m.exec(rendererSrc)?.[0] ?? ''
    expect(/bridge\.security/.test(requestRoute),
      '§2.6 item 2 — the MCP tool route does NOT read tier 4 (mcp-endpoint.md §6.4 — "the MCP tool handlers never route to it")').toBe(false)
    // the total renderer-side tier-4 reach is EXACTLY the one declared read (§2.6 item 4).
    // RE-GRAINED 2026-10-29 (`C-2`): the as-filed alternation counted THREE spellings —
    // `get`, `set` and `lastWriteReceipt`.  The third is GONE with `E-1` (the preload's
    // `security` member set declares `get`, `set` and `setExclusion`; a `lastWriteReceipt`
    // member no longer exists on the bridge, so a call to it could only be a type error).
    // THE BITE IS UNMOVED: the count is still EXACTLY ONE over the readings that exist —
    // a SECOND `bridge.security.get()` or any `bridge.security.set()` call reddens it.
    const securityReads = [...rendererSrc.matchAll(/bridge\.security\.(get|set)\(\)/g)].map((m) => m[0])
    expect(securityReads.length, '§2.6 item 4 — the renderer\'s tier-4 reads are EXACTLY the pane snapshot + the boot projection (`bridge.security.get()`) and nothing else').toBe(1)
    expect(securityReads[0]).toBe('bridge.security.get()')
  })

  it('M-7/P-SE-IM-4(3/4): the notification payload is `{uri}` ONLY, and no resource payload carries tier 4', async () => {
    const typesSrc = await sourceOf(['shared', 'types.ts'])
    const notifyBlock = /export interface NotifyPayload\s*\{[\s\S]*?\n\}/.exec(typesSrc)?.[0] ?? ''
    expect(/uri:\s*string/.test(notifyBlock), 'the notification payload carries `uri` (§2.6 item 3)').toBe(true)
    expect(/token|enabled|group|maxJournalLength/.test(notifyBlock),
      '§2.6 item 3 — the N4 payload carries NO tier-4 member (shared/types.ts) — `{uri}` ONLY').toBe(false)
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/notify\(\{\s*uri: 'mcp:\/\/provident\/app'\s*\}\)/.test(rendererSrc),
      'the N4 push carries only the app URI (renderer.ts)').toBe(true)
    expect(/notify\(\{[^}]*token/.test(rendererSrc), 'no notification carries a tier-4 value').toBe(false)
  })

  it('M-8: the boot chain store → renderer → Runtime is preserved — the boot projection exists (RE-GRAINED 2026-10-29: `C-3` — the chain\'s main-side carrier is `settingsSurface.read()`)', async () => {
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/bridge\.security\.get\(\)/.test(rendererSrc), 'M-8 — the renderer reads the tier-4 snapshot at boot').toBe(true)
    expect(/new Runtime\(\{ mount, envelope: demoEnvelope\(\), maxJournalLength \}\)/.test(rendererSrc),
      'M-8 — the boot value feeds the app Runtime').toBe(true)
    const runtimeSrc = await sourceOf(['renderer', 'runtime.ts'])
    expect(/new Supervisor\(\{ events: new EventBridge\(\), maxJournalLength: opts\.maxJournalLength \}\)/.test(runtimeSrc),
      'M-8 — the app Runtime\'s Supervisors receive maxJournalLength').toBe(true)
    // **THE RE-GRAIN, OLD → NEW.** AS FILED this row read only the RENDERER half of the
    // chain (the preload bridge's `bridge.security.get()` and the Runtime wiring).  `C-3`
    // moved the chain's MAIN-side carrier: `main.ts` no longer reads the retired store but
    // the surface module's own `read()`, and the boot order
    // `construction < boot read < gate < flip < window < mcp.start()` is the landed one
    // (the landed order survives UNCHANGED IN KIND).  The claim is unmoved — ONE boot
    // snapshot feeds the renderer, and the chain runs store → carrier → renderer → Runtime —
    // and the reading below pins the link that moved:
    const mainSrc = await awaitMainSource()
    const at = (needle: string): number => mainSrc.indexOf(needle)
    const construction = at('createSettingsSurface({ userDataDir: app.getPath(\'userData\') })')
    const bootRead = at('const persisted = settingsSurface.read()')
    const gate = at('new SecurityGate({ token: persisted.token')
    const flip = at('settingsSurface.attach(mcp)')
    const window = at('const win = new BrowserWindow(')
    const start = at('await mcp.start()')
    expect(construction, 'M-8 / `C-3` — the surface is CONSTRUCTED at the composition\'s first act (its own instance, its own file: D-18)').toBeGreaterThan(-1)
    expect(bootRead, 'M-8 / `C-3` — the boot read IS the carrier: `settingsSurface.read()` answers the instance\'s own record, and it is the one reading that feeds the gate').toBeGreaterThan(construction)
    expect(gate, 'M-8 — the gate is constructed AFTER the boot read and takes `persisted.token` / `persisted.enabled` from it (D-19 step 2)').toBeGreaterThan(bootRead)
    expect(flip, 'M-8 — the flip (`settingsSurface.attach(mcp)`) follows the gate').toBeGreaterThan(gate)
    expect(window, 'M-8 — the window is created AFTER the flip (D-vii: no renderer turn in the pre-flip gap)').toBeGreaterThan(flip)
    expect(start, 'M-8 — the MCP starts LAST (D-19 step 4)').toBeGreaterThan(window)
  })
})

/* ============================================================================
 * THE REMAINING FAIL-STATES — §3.2 (F-9 static) + the write-site census + the
 * fold.  (F-4/I-4 — the store's boot over a file — and F-11 — the store's
 * tmp-cleanup persist — retired with `E-1`.)
 * ========================================================================== */

describe('G3 §3.2 fail-states and §3.3 invariants', () => {
  it('F-7/F-10/I-2/I-3: the write-site census — EXACTLY the declared persisted files, the record file\'s single writer, no third file (RE-GRAINED 2026-10-29: `C-4` moved the persisted-file names; then `E-5`, the carrier\'s literal leaves `main.ts` and the read count becomes two)', async () => {
    const mainSrc = await awaitMainSource()
    const userDataFiles = [...mainSrc.matchAll(/join\(app\.getPath\('userData'\), '([a-z-]+\.json)'\)/g)].map((m) => m[1]).sort()
    // **THE RE-GRAIN, OLD → NEW.** AS FILED the census read
    // `['provident-modules.json', 'provident-security.json', 'provident-settings.json']`
    // from `main.ts` — the security file's name among them, written by the retired module.
    // `C-4` RETIRED that name (`provident-security.json` is read at most once by the
    // import-once path and NEVER written) and ADDED `provident-operator-settings.json`,
    // whose two names belong to the INSTANCE module (main.ts spells neither: it
    // constructs no store and owns no record file name).
    // **`E-5` (this re-grain, `settings-carrier-retirement`) MOVES THE SECOND NAME OUT TOO.**
    // AS RE-GRAINED UNDER `C-4` the census still read TWO literals from `main.ts` —
    // `['provident-modules.json', 'provident-settings.json']` — because
    // `provident-settings.json` was still the hand-written tier-1 CARRIER, composed at
    // `main.ts`'s `settingsPath`.  THE CARRIER LEFT THE FILE (L1 §3's CLOSED removal list:
    // `const settingsPath`, the boot read, the guarded second read, and the whole
    // tmp+rename+fsync writer), so what stands in `main.ts` now is the Q-5 legacy name
    // ALONE.  THE CLAIM IS UNMOVED — the persisted set is EXACTLY the declared carriers,
    // each with ONE writer, and no third file exists — and it is carried now by the two
    // facts below rather than by a literal count: `main.ts` spells no record name at all,
    // and the instance module makes TWO import-once reads and no write (L1 §6; L2
    // `behaviour.md` §8 `RET-2`/`RET-3`; `persistence.md`:43).
    expect(userDataFiles, 'I-2 / `E-5` — main.ts\'s ONE userData file literal is the legacy `provident-modules.json`, read once and never written; every record name lives in the INSTANCE module, and a SECOND literal here still reddens (L1 §3/§6)').toEqual(['provident-modules.json'])
    expect(/never WRITTEN by this boot/.test(mainSrc), 'the legacy provident-modules.json is declared never-written — so the persisted Tier-1 set stays the exactly-two').toBe(true)
    // THE ABSENCE LIMB, EXTENDED TO THE SECOND RETIRED NAME (`E-5`): `main.ts` spelled
    // `provident-settings.json` while the carrier was its own; it spells no record name now —
    // neither the added one, nor the security record's, nor the carrier's retired name.
    expect(/provident-security|provident-operator-settings|provident-settings/.test(mainSrc), '`C-4` / `E-5` — main.ts spells NEITHER record name, and no longer the retired carrier\'s name either (the surface module owns the record names; the instance module owns the carrier\'s)').toBe(false)
    const surfaceSrc = await surfaceSource()
    expect(/(provident-security|provident-operator-settings|provident-settings)\.json/.test(surfaceSrc), '`C-4` / `E-5` — and the surface module spells none of the three: the names are the instance module\'s alone').toBe(false)
    const instanceSrc = await sourceOf(['main', 'operator-settings', 'index.ts'])
    expect(/const FILE_NAME = 'provident-operator-settings\.json'/.test(instanceSrc), '`C-4` — the ADDED name is declared ONCE, in the instance module').toBe(true)
    // THE SINGLE-DECLARATION LIMB, EXTENDED TO THE SECOND RETIRED NAME (`E-5`): each retired
    // name is declared EXACTLY ONCE, here, and is read by an import-once path at most once.
    expect(/const RETIRED_NAME = 'provident-security\.json'/.test(instanceSrc), '`C-4` — the RETIRED name is declared here and is read by the import-once path at most once (D-19)').toBe(true)
    expect((instanceSrc.match(/const RETIRED_NAME = 'provident-security\.json'/g) ?? []).length, '`E-5` — and declared exactly ONCE: a second declaration would be a second reader\'s spelling').toBe(1)
    expect(/const RETIRED_SETTINGS_NAME = 'provident-settings\.json'/.test(instanceSrc), '`E-5` — the SECOND retired name is declared here and nowhere else, read at most once per boot by the carrier\'s import arm (L1 §4/§6; `RET-2`)').toBe(true)
    expect((instanceSrc.match(/const RETIRED_SETTINGS_NAME = 'provident-settings\.json'/g) ?? []).length, '`E-5` — and declared exactly ONCE, the same single-declaration rule `C-4` set for the first retired name').toBe(1)
    expect((instanceSrc.match(/readFileSync\(/g) ?? []).length, 'I-3 / `E-5` — the module makes EXACTLY TWO `fs` calls: two import-once reads, the security record\'s and the retired carrier\'s (L2 `behaviour.md` §8 `RET-3`; `persistence.md`:43)').toBe(2)
    expect(/readFileSync\(join\(userDataDir, RETIRED_NAME\), 'utf8'\)/.test(instanceSrc), 'I-3 — and the first of those two calls IS the security record\'s read').toBe(true)
    expect(/readFileSync\(join\(userDataDir, RETIRED_SETTINGS_NAME\), 'utf8'\)/.test(instanceSrc), 'I-3 / `E-5` — and the second IS the retired carrier\'s import-once read: neither is a write, and no third read stands (L1 §4 `ASM-4`: the arm writes no byte)').toBe(true)
    expect(/writeFileSync|renameSync|rmSync|unlinkSync/.test(instanceSrc), '`C-4` / `E-1` — the retired file is NEVER written, renamed, repaired or deleted: the module carries no write/rename/remove call at all').toBe(false)
    expect(/filePath: join\(options\.userDataDir, FILE_NAME\)/.test(instanceSrc), 'I-3 — the record file has ONE writer: the instance\'s own store construction (`filePath` names `FILE_NAME` and nothing else)').toBe(true)
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/provident-security/.test(rendererSrc), 'I-3 — no renderer site writes (or names) the record file').toBe(false)
  })

  it('I-1/I-5/I-6 fold: the one-site refusal and the four-carrier census are the §2.4/§2.6 blocks above (RE-GRAINED 2026-10-29: the never-torn pointer retires with the §5.5.1 register)', () => {
    // cross-reference honesty — the invariant blocks are driven in their own rows, never
    // double-asserted here.  RE-GRAINED: the as-filed pointer read "the never-torn reading is
    // the register's"; that register's subject was the retired module's typed table and it
    // retires WHOLE with `E-1` (I-1's never-torn half is the tier's own, asserted by the
    // storeroom batteries).  The two pointers below stand, and their blocks are above.
    expect(true).toBe(true)
  })

  it('F-9: no tier-4 value in any carrier — the carrier scan is clean (GREEN; a leak would redden here)', async () => {
    // value-shaped leaks: a token/group-set/journal value inside a carrier's construction:
    const mainSrc = await awaitMainSource()
    expect(/notify\(\{[^}]*token/.test(mainSrc), 'F-9 — no notification payload carries a tier-4 value in main').toBe(false)
    const preloadSrc = await sourceOf(['main', 'preload.ts'])
    expect(/notify\(/.test(preloadSrc)).toBe(true) // the notify channel exists
    // the notification payload type is pinned `{uri}` ONLY (asserted in §2.6 block)
  })

  it('§7a: no clause of this spec was un-derivable — every row above carries its §/row derivation', () => {
    // the honesty note, not an executable claim: each failing row names its spec cell in its message.
    expect(true).toBe(true)
  })
})
