// tests/ui-leg-contract.test.ts — the `[U]` real-DOM leg's contract rows, for
// unit `U-REALDOM-BOOT` (wave C), written RED-FIRST from
// docs/specs/ci-ui-leg.md ONLY (AGENTS.md item 3 / RCA-1 / RCA-2).
//
// SPEC SECTIONS THIS FILE PINS (one row = one spec section, cited in the row):
//   §2 items 1–3      the leg's surface (`scripts/electron-ui.mjs` NEW, the
//                     `ui` script key NEW — 12 keys today → 13, §8 N-8)
//   §3.0 R0–R4        the five red rows, each with its own pass/fail state
//   §3.1 / §3.6       the pinned run ORDER and the exit-code vocabulary
//   §3.2              the measurement channel (existing MCP tools; the
//                     leg-only fallbacks that may NEVER become MCP tools)
//   §3.4              the `UNSUPPORTED` word set
//   §5 PRE-1..PRE-4   the `divergence` precondition + the `N = 9` guard
//   §6 DIS-1..DIS-5   the DISPLAY prerequisite (exit 3, never a skip)
//   §1.13 via §3.3    the honest-limits statement `R4` must print
//   §5.5              the zero-row register exemption (the PBT-harness claim)
//   §2.1              the shared Electron-spawn helper's contract
//
// ---------------------------------------------------------------------------
// LAYER, stated first because the spec's Layer declaration binds this file.
// ---------------------------------------------------------------------------
// The leg's own observables are **[U]** ("a real `BrowserWindow` in a real
// renderer realm … driven over stdio MCP"); this file runs **[T]** — "the
// repo's own vitest files under the shim — **not** assembled-app evidence (no
// window, no IPC, no MCP transport)". **No window can boot in `[T]`**, so this
// file takes no `[U]` measurement and must not pretend to.
//
// §3.0's `R0` note is explicit and this file obeys it *exactly*:
//   "`R0`'s `(a)`/`(b)` halves are leg-layer assertions … its `(c)` half is
//    `[H]` (the seam's behaviour) and **is** pinned node-side — see §3.5's
//    `SEAM-*` rows. **A TestWriter may not move `(a)`/`(b)` into the node
//    suite**: no window boots there."
// ⇒ `R0`(a)/(b) are asserted here **structurally** (the leg's own source text
// carries the two-profile isolation and the comparison rows) and their
// **runtime** truth is the leg's own output — which is why §3.0 calls `R0`
// "the honest red". `R0`(c) and the whole seam live in the sibling file
// `tests/ui-leg-seam.test.ts`.
//
// ---------------------------------------------------------------------------
// RED-FIRST STATE AT THIS TREE (verified by this run, §7 items 1–2)
// ---------------------------------------------------------------------------
//   * `scripts/electron-ui.mjs` does NOT exist (§2 item 1: "does not exist");
//   * `package.json` has NO `"ui"` key (§2 item 3: "key absent"; 12 scripts);
//   * there is NO shared Electron-spawn helper (§2 item 2: "MUST BE CREATED;
//     none exists today"; `scripts/` = `mcp-cli.mjs`, `electron-divergence.mjs`).
// Every row below that needs one of those FAILS on a labelled assertion — the
// repo's technique for a not-yet-landed surface (`tests/dom-shim-remove-attribute
// .test.ts`'s structural-cast pattern, applied here to a source text read at
// test time so the red is an assertion, never a compile error). The rows that
// only need the LANDED tree (`PRE-4`'s pin guard, §6 `DIS-3`, §5.5, §2.1's
// divergence-leg half) PASS today and are reported as guards — never as reds.
import { describe, it, expect } from 'vitest'
import { spawnSync } from 'node:child_process'
import { EventEmitter } from 'node:events'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ProvidentMcpServer } from '../src/main/mcp-server.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEG_PATH = join(ROOT, 'scripts', 'electron-ui.mjs')
const DIVERGENCE_PATH = join(ROOT, 'scripts', 'electron-divergence.mjs')
const SCRIPTS_DIR = join(ROOT, 'scripts')
const MAIN_PATH = join(ROOT, 'src', 'main', 'main.ts')

/** Read a source file, or `null` when it does not exist yet. The `null` return
 *  is what turns "the surface is absent" into a LABELLED assertion failure in
 *  every row instead of an import-time/compile-time error. */
function readSource(abs: string): string | null {
  return existsSync(abs) ? readFileSync(abs, 'utf8') : null
}

/** §2 item 1 / §7 item 1 — the leg is this unit's deliverable and does not
 *  exist at this tree. Every `R*` row's first assertion. */
const LEG_ABSENT =
  'scripts/electron-ui.mjs does not exist — spec §2 item 1 ("NEW — the leg itself … does not exist") / §7 item 1'

type Pkg = { scripts?: Record<string, string>; devDependencies?: Record<string, string> }
function readPkg(): Pkg {
  return JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as Pkg
}

// ---------------------------------------------------------------------------
// §2 item 2 / §2.1 — the shared Electron-spawn helper. Its PATH IS NOT PINNED
// ("Recommended path (NOT pinned): `scripts/electron-spawn.mjs`; the path is
// the Implementer's/supervisor's to fix, the **contract** is §2.1's"), so the
// predicates below are FAMILIES over any `scripts/`-local module, never a
// literal filename.
// ---------------------------------------------------------------------------
const RESERVED_SCRIPT_NAMES = new Set(['mcp-cli.mjs', 'electron-divergence.mjs', 'electron-ui.mjs'])

function helperCandidates(): string[] {
  return readdirSync(SCRIPTS_DIR).filter((f) => f.endsWith('.mjs') && !RESERVED_SCRIPT_NAMES.has(f))
}

/** True when `src` imports `name` through a `scripts/`-local specifier
 *  (`./<name>` / `./<name>.mjs`), which is what "One module, imported by both
 *  legs" (§2.1 item 1) means for an ESM script in `scripts/`. */
function importsHelper(src: string | null, name: string): boolean {
  if (src === null) return false
  const base = name.replace(/\.mjs$/, '')
  return new RegExp(`from\\s+['"]\\./${base}(\\.mjs)?['"]`).test(src)
}

const DIVERGENCE_SRC = readSource(DIVERGENCE_PATH)

/** The helper the divergence leg actually imports (the landed-call-site half of
 *  §2.1 item 1), else the first candidate, else `null`. */
const HELPERS = helperCandidates()
const HELPER_NAME: string | null = HELPERS.find((f) => importsHelper(DIVERGENCE_SRC, f)) ?? HELPERS[0] ?? null
const HELPER_SRC = HELPER_NAME === null ? null : readSource(join(SCRIPTS_DIR, HELPER_NAME))
const HELPER_ABSENT =
  'no shared Electron-spawn helper exists in scripts/ — spec §2 item 2 ("MUST BE CREATED; none exists today") / §7 item 2 / §2.1'

// ---------------------------------------------------------------------------
// §2.1 item 1 / §2.1 item 3 — the spawn vector that is PINNED as landed and
// must stay byte-identical for the divergence leg (also `PRE-4`/`U-12`).
// ---------------------------------------------------------------------------
const PINNED_SPAWN_FLAGS = [
  '--mcp-transport=stdio',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--in-process-gpu',
  '--ozone-platform=x11',
  '--disable-dev-shm-usage',
]

describe('U-REALDOM-BOOT — the leg surface (§2, §3.0 R0–R4, §3.1–§3.6, §5, §6)', () => {
  // -------------------------------------------------------------------------
  // §2 items 1 + 3 — the deliverable exists and is runnable.
  // States: S1 the script file exists; S2 the `ui` key exists with the pinned
  // shape; S3 the scripts block grew by EXACTLY the one `ui` key (§2 item 3 /
  // §8 N-8: "the one additive `ui` key").
  // Fail-state: absent key/file ⇒ nothing in this unit is runnable and every
  // `R*` row below is unmeasurable (never a skip — §3.6).
  //
  // COUNT DISCREPANCY, reported rather than encoded (§2 item 3 / §8 N-8): the
  // spec says the scripts block "today has **12 keys**" and that an `"ui"` key
  // "would make 13" — but its own parenthetical enumerates ELEVEN names, and
  // THIS TREE HAS ELEVEN (`clean`, `build`, `build:watch`, `start`,
  // `start:http`, `typecheck`, `test`, `test:watch`, `battery`, `divergence`,
  // `mcp`; verified by this run), so the `ui` key makes TWELVE. Asserting the
  // spec's absolute numbers would leave this row permanently red after a
  // correct implementation, so the row pins the DELTA the spec's contract
  // really needs — exactly ONE additive key, and it is `ui`. The off-by-one in
  // the spec is reported to the supervisor; it is not silently reconciled.
  //
  // ⟶ EXTENDED 2026-09-27 (THE ADDITIVE TEST-LAYER LEG — `AGENTS.md` item 4,
  // `AN ADDITIVE FOURTH LEG LANDED 2026-09-27`). The process pass added the
  // `typecheck:tests` key (`tsc --noEmit -p tsconfig.tests.json`) BESIDE the
  // unchanged trio (`npm test` / `npm run typecheck` / `npm run build`), and
  // `AGENTS.md` item 4 names this row BY NAME as the exact consequence:
  // *"`tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET (the
  // landed keys plus exactly `ui`), so ANY further script key — including this
  // one — reddens that row until a TestWriter extends the landed set; a config
  // change cannot satisfy it."* THE MEASURED BEFORE-READING of this row was
  // `['typecheck:tests', 'ui']` vs `['ui']` (i.e. `1 failed`), and the repair is
  // the one that file's own rule names: the ROW's landed set is extended, and
  // the pinned DELTA stays exactly `['ui']`. **The key set is now pinned in
  // BOTH directions**: the filter below (no UNEXPECTED key may appear) and the
  // explicit set equality added beside it (the landed set is exactly these
  // twelve), so the extension did not turn the row into a lower bound.
  const LANDED_SCRIPT_KEYS = [
    'clean',
    'build',
    'build:watch',
    'start',
    'start:http',
    'typecheck',
    'typecheck:tests', // ⟶ ADDED 2026-09-27: the additive test-layer leg (`AGENTS.md` item 4)
    'test',
    'test:watch',
    'battery',
    'divergence',
    'mcp',
  ]

  it('L-1 (§2 items 1+3) — scripts/electron-ui.mjs exists and `npm run ui` carries the pinned shape', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()

    const pkg = readPkg()
    const scripts = pkg.scripts ?? {}
    expect(
      scripts.ui,
      'package.json has no "ui" key — §2 item 3 pins the shape `npm run build && node scripts/electron-ui.mjs` (mirroring "divergence")',
    ).toBe('npm run build && node scripts/electron-ui.mjs')
    expect(
      Object.keys(scripts).filter((k) => !LANDED_SCRIPT_KEYS.includes(k)),
      '§2 item 3/§8 N-8: `ui` is the ONE additive key — no other script key may appear in this unit. ⟶ EXTENDED 2026-09-27 (`AGENTS.md` item 4, the additive `typecheck:tests` test-layer leg): the ADDITIVE key `typecheck:tests` is now part of the LANDED set above (it was added BESIDE the unchanged trio by a separate process pass, and this row\'s own rule — quoted in `AGENTS.md` item 4 — is that the row must be extended, never that the config change is wrong). The DELTA this assertion pins is UNCHANGED: exactly `ui`',
    ).toEqual(['ui'])
    expect(
      [...Object.keys(scripts)].sort(),
      '§2 item 3/§8 N-8 — THE LANDED SET IS PINNED AS A SET, not as a count: the `scripts` key set is EXACTLY the landed keys (the eleven + the additive test-layer leg `typecheck:tests`, both `AGENTS.md`-cited) PLUS the one additive `ui` key — so no unexpected key can appear AND no landed key can vanish (the direction a count and the filter above cannot catch). Read (sorted): ' +
        JSON.stringify([...Object.keys(scripts)].sort()),
    ).toEqual([...[...LANDED_SCRIPT_KEYS, 'ui']].sort())
    expect(
      Object.keys(scripts).length,
      '§2 item 3: the scripts block is the landed set PLUS exactly the one `ui` key (the count is checked BESIDE the set equality above, never instead of it — `§4.4 S-7`: a bare count is satisfiable by renaming)',
    ).toBe(LANDED_SCRIPT_KEYS.length + 1)
  })

  // -------------------------------------------------------------------------
  // §3.0 R0 — ISOLATION across TWO temp profiles, [U] + [H].
  // States enumerated (the leg-side halves this file may assert, per §3.0's
  // `R0` note — (a)/(b) are compared between two boots inside the leg):
  //   S1 TWO scratch profiles are created, each under the OS temp dir
  //   S2 each boot is handed its own `--user-data-dir` (or the helper's
  //      profile parameter), i.e. one profile per boot
  //   S3 the leg's output carries a labelled `R0` row set
  //   S4 the operator's REAL profile is never named: no `~/.config/Electron`,
  //      no `homedir()`, no `~` expansion anywhere in the leg
  // Fail-state (§3.0 R0, named so a failure reads as an isolation failure):
  //   any inequality across the two boots ⇒ the leg's own `R0` fails; a boot
  //   that resolves its store under the default/real `userData` ⇒ `R0`(c)
  //   fails ⇒ HOST finding fixed here with a red-first regression row, never a
  //   pass and never a skip.
  // -------------------------------------------------------------------------
  it("R0 (§3.0 R0) — isolation: TWO scratch temp profiles, and the operator's real profile is never referenced", () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    // S1 — two scratch profile creators. The creator's NAME IS NOT PINNED
    // (§2.1 item 2: "Names are not pinned; the behaviour is"), so this is a
    // family predicate, not a literal.
    const creators = src.match(/(mkdtempSync|freshProfile|freshScratch|scratchProfile|newProfile|makeProfile|createProfile)\s*\(/g) ?? []
    expect(
      creators.length,
      '§3.0 R0: the leg must spawn the app TWICE — once per scratch profile — so it needs TWO scratch profile creations',
    ).toBeGreaterThanOrEqual(2)

    // S1 — the scratch root is the OS temp dir, not a repo/operator path.
    expect(src, '§6 DIS-5: a temp `userData` profile under the OS temp dir').toMatch(/tmpdir\s*\(/)

    // S3 — the `R0` row is reported as its own labelled line (§3.0 R0's pass
    // condition: "(a) ∧ (b) ∧ (c), each reported as its own labelled line").
    expect(src, '§3.0/§3.1 step 5: the leg must record its `R0` row by name').toMatch(/\bR0\b/)

    // S4 — the operator's real profile is NEVER read/written (§3.0 R0(c),
    // §0 prohibition 4, §7 item 3, adversarial seed U-2).
    expect(src, '§3.0 R0(c): the developer\'s real `~/.config/Electron` profile must never be named').not.toMatch(/\.config\/Electron/)
    expect(src, '§3.0 R0(c)/§6 DIS-5: the leg must not resolve a home-directory profile').not.toMatch(/homedir\s*\(/)
  })

  // -------------------------------------------------------------------------
  // §3.0 R1 — REAL and DISTINGUISHABLE from the shim leg by a TYPED marker.
  // States:
  //   S1 the leg records an `R1` row by name
  //   S2 the marker is a TYPED provenance observation (`typeof window`/`document`
  //      — "the marker must be a *type*, not a string the shim could equally
  //      emit", §3.0 R1) taken in the real renderer realm
  //   S3 the SAME probe is attempted on the shim leg and recorded alongside
  //      (§3.0 R1's pass condition) — the shim leg is the battery host
  //   Fail-state (§3.0 R1): indistinguishable ⇒ a RE-SCOPE FINDING, never a
  //   pass; the leg STOPS and reports. `U-11`'s runtime spoofability half
  //   (could the SHIM emit the same typed marker?) is NOT decidable in `[T]`:
  //   it needs a live shim run and is the adversarial pass's seed (§3a U-11).
  // -------------------------------------------------------------------------
  it('R1 (§3.0 R1) — REAL + distinguishable: a typed renderer-realm marker plus the shim attempt recorded alongside', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§3.0/§3.1 step 4: the leg must record the typed marker as its own `R1` row').toMatch(/\bR1\b/)
    expect(
      src,
      "§3.0 R1: the marker must be a TYPE (`typeof window`/`document`) — not a string the shim could equally emit",
    ).toMatch(/typeof\s+(window|document|globalThis)/)
    expect(src, '§3.0 R1: the real realm carries `window`/`document` provenance').toMatch(/\b(window|document)\b/)
    expect(
      src,
      '§3.0 R1: "recorded alongside the same probe attempted on the shim leg" — the shim leg is the battery host',
    ).toMatch(/battery/)
  })

  // -------------------------------------------------------------------------
  // §3.2 — the measurement channel is pinned to the EXISTING MCP surface.
  // States:
  //   S1 the probe body is loaded through the existing `provident.load` /
  //      `code.load`
  //   S2 the value is read back over the existing `provident.get_rendered_html`
  //   S3 every tool the leg calls is a member of `ProvidentMcpServer.ALL_TOOLS`
  //   S4 the leg registers NO new MCP tool (an MCP-visible "eval in the
  //      renderer" tool is a self-granting capability breach, §3.2)
  // Fail-state: a tool call outside `ALL_TOOLS`, or any tool registration in
  // the leg ⇒ §0 prohibition 5 ⇒ finding.
  // -------------------------------------------------------------------------
  it('R2-a (§3.2) — the measurement rides the EXISTING MCP tools and adds no tool', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§3.2 item 1: the handler body is loaded through the existing provident.load/code.load').toMatch(
      /provident\.load|code\.load/,
    )
    expect(src, '§3.2 item 4: the value comes back over the existing provident.get_rendered_html').toMatch(
      /provident\.get_rendered_html/,
    )

    // S3 — no call may name a tool that does not already exist (§0
    // prohibition 5: "ALL_TOOLS stays 21 and RpcMethod stays 21").
    const called = [...src.matchAll(/callTool\s*\(\s*\{[^}]*name:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    const unknown = called.filter((n) => !ProvidentMcpServer.ALL_TOOLS.includes(n))
    expect(unknown, '§0 prohibition 5 / §3.2: every tool the leg calls must already exist in ALL_TOOLS').toEqual([])

    // S4 — the leg itself must register no MCP tool.
    expect(src, '§3.2: "An MCP-visible eval in the renderer tool is a self-granting capability breach"').not.toMatch(
      /(registerTool|setRequestHandler\s*\(\s*['"]tools\/)/,
    )
  })

  // -------------------------------------------------------------------------
  // §3.0 R2 — the ONE real measurement, both halves, and the stop condition.
  // States:
  //   S1 the `R2` row is recorded by name
  //   S2 the probe reads BOTH `getBoundingClientRect` and `getComputedStyle`
  //      in the real renderer's realm (§3.2 item 2 — pinned identifiers)
  //   S3 the pinned shape: `width > 0 && height > 0`
  //   S4 the pinned shape: a non-`''` `getComputedStyle` value
  //   S5 exactly ONE measurement was taken (a tally compared against 1);
  //      §1 item 3: "A second measurement is a new design decision"
  // Fail-states (§3.0 R2): zero measurements, more than one measurement, a
  //   `0`, a blank, or a missing value ⇒ a FINDING, never a measurement, and
  //   the leg FAILS LOUDLY ("The window never paints ⇒ FAIL LOUDLY, NEVER
  //   RECORD `0`"). The runtime half of "never `0`" needs a broken window and
  //   is the adversarial seed U-5 (§3a); the structural half pinned here is the
  //   strict positivity/emptiness conjunction plus §3.6's exit 1.
  // -------------------------------------------------------------------------
  it('R2-b (§3.0 R2) — exactly ONE measurement: `width > 0 && height > 0` and a non-empty computed style', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§3.0/§3.1 step 6: the leg must record the measurement row as `R2`').toMatch(/\bR2\b/)
    expect(src, '§3.2 item 2: the probe reads getBoundingClientRect in the real renderer realm').toMatch(/getBoundingClientRect/)
    expect(src, '§3.2 item 2: the probe reads getComputedStyle in the real renderer realm').toMatch(/getComputedStyle/)
    expect(src, '§3.0 R2: the pinned shape is `width > 0 && height > 0`').toMatch(/(width|height)\s*(>|!==|>=)\s*0/)
    expect(
      src,
      "§3.0 R2: the pinned shape is a non-`''` getComputedStyle value",
    ).toMatch(/(!==|!=)\s*(''|"")/)
    expect(src, '§3.0 R2/§1 item 3: the leg tallies its measurements').toMatch(/measurement/i)
    expect(
      src,
      '§3.0 R2/§1 item 3: exactly ONE measurement — the tally must be compared against 1 (zero or more than one is the fail-state)',
    ).toMatch(/(===|!==)\s*1\b/)
  })

  // -------------------------------------------------------------------------
  // §3.0 R3 + §3.4 — the shim leg is recorded `UNSUPPORTED`, with its reason.
  // States:
  //   S1 the exact word `UNSUPPORTED` appears for the shim leg
  //   S2 it is the `R3` row (§3.1 step 7)
  //   S3 its reason is recorded (the shim has no layout, no
  //      `getBoundingClientRect` semantics, no `getComputedStyle`)
  // Fail-state (§3.0 R3 / §3.4): `divergent`, `matching`, `pass`, `n/a`, `0`,
  //   a blank, or a fabricated zero ⇒ a finding; silence (an omitted row) is
  //   also a finding. NOTE, recorded rather than improvised: the NEGATIVE half
  //   of §3.4 is deliberately NOT asserted by a source-text regex — the leg's
  //   own output may legitimately name the forbidden words while REFUSING them
  //   ("the shim is UNSUPPORTED, never divergent"), so a text-level
  //   "must-not-contain" row would be a guaranteed false red. §3a's `U-6`
  //   (shim-word drift) is the row that can falsify it, at run time.
  // -------------------------------------------------------------------------
  it('R3 (§3.0 R3 / §3.4) — the shim leg is recorded with the exact word UNSUPPORTED and its reason', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§3.4: the shim leg is reported with the single word `UNSUPPORTED`').toMatch(/UNSUPPORTED/)
    expect(src, '§3.1 step 7: the shim row is the leg\'s `R3` row').toMatch(/\bR3\b/)
    expect(
      src,
      '§3.0 R3/§3.4: the reason must be recorded — the shim has no layout, no getBoundingClientRect semantics, no getComputedStyle',
    ).toMatch(/layout/i)
  })

  // -------------------------------------------------------------------------
  // §3.0 R4 + §3.3 — the honest-limits row.
  // States:
  //   S1 the honest-limits statement appears in the leg's own output — §3.3
  //      states it "verbatim-in-substance": "A `ui` green proves that a
  //      specific probe, executed inside ONE real Electron renderer boot under
  //      a controlled profile, produced the asserted value — and nothing else"
  //   S2 the static honest-limits row: no `app.isPackaged`-based claim, no
  //      assertion phrased as an app-green, and no
  //      `webContents.executeJavaScript`/CDP call inside a SHIPPED path
  // Fail-state (§3.0 R4): a missing statement, or a call readable as an
  //   app-level claim ⇒ a REVIEW FINDING; the row fails.
  // TENSION, reported not improvised: §3.2 admits `executeJavaScript`/CDP as
  //   LEG-ONLY fallbacks that "must be recorded as a fallback in the leg's own
  //   output", while §3.0 R4's static check says "no
  //   `webContents.executeJavaScript`/CDP call inside a *shipped* path". The
  //   assertion below therefore requires the `fallback` marker whenever such a
  //   call appears at all (a stricter reading of R4 would forbid it outright;
  //   that reading is stated in the report, not silently adopted).
  // -------------------------------------------------------------------------
  it('R4 (§3.0 R4 / §3.3) — the honest-limits statement plus the static no-app-claim row', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    // S1 — §3.3's verbatim-in-substance statement (§1.13's text itself lives in
    // the handoff review's amendment record, which this spec points at; the
    // spec's own §3.3 wording is the pin available here).
    expect(src, '§3.0 R4/§3.3: the honest statement must say what the green PROVES').toMatch(/proves that a specific probe/i)
    expect(src, '§3.0 R4/§3.3: … and "and nothing else"').toMatch(/nothing else/i)
    expect(src, '§3.1 step 8: the statement is printed by the leg\'s own `R4` row').toMatch(/\bR4\b/)

    // S2 — the static honest-limits row.
    expect(src, '§3.0 R4/§3.3 C-1: the leg boots the dev tree, never a packaged bundle').not.toMatch(/app\.isPackaged/)
    const usesRendererEval = /executeJavaScript|\.debugger\b/.test(src)
    expect(
      usesRendererEval ? /fallback/i.test(src) : true,
      '§3.2/§3.0 R4: a webContents.executeJavaScript/CDP fallback is admissible ONLY if it is recorded as a fallback in the leg\'s own output',
    ).toBe(true)
  })

  // -------------------------------------------------------------------------
  // §7 item 3 — "Five rows are declared; four of them are about the leg's own
  // honesty, not about the app." States: S1 all five `R0`–`R4` labels appear.
  // Fail-state: a missing label ⇒ the leg declares a different contract than
  // §3.0's five rows.
  // -------------------------------------------------------------------------
  it('§7 item 3 — the leg declares exactly the five rows R0–R4 (four of them its own honesty)', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    for (const row of ['R0', 'R1', 'R2', 'R3', 'R4']) {
      expect(src, `§3.0/§7 item 3: the leg must declare row \`${row}\` by name`).toMatch(new RegExp(`\\b${row}\\b`))
    }
  })

  // -------------------------------------------------------------------------
  // §3.1 order + §3.6 exit codes — order is contract, and the exit-code
  // vocabulary is closed.
  // States:
  //   S1 every `process.exit(N)` literal in the leg is a member of {0,1,2,3}
  //   S2 each of 1, 2 and 3 appears (measurement failure, PRECONDITION-FAILED,
  //      PREREQUISITE ERROR) — no fail state may be a silent skip
  //   S3 the PRECONDITION check (step 2) precedes the measurement probe
  //      (step 6) in the leg's own source order
  // Fail-state (§3.6): any other exit code ⇒ inadmissible; §3.1 step 2 with a
  //   red divergence leg ⇒ exit 2, NO measurement taken.
  // -------------------------------------------------------------------------
  it('§3.1/§3.6 — the pinned order and the closed exit-code set {0,1,2,3}', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    const codes = [...src.matchAll(/process\.exit\(\s*(\d+)\s*\)/g)].map((m) => Number(m[1]))
    expect(codes.length, '§3.6: the leg must exit through the pinned vocabulary').toBeGreaterThan(0)
    const inadmissible = [...new Set(codes.filter((c) => ![0, 1, 2, 3].includes(c)))]
    expect(inadmissible, '§3.6: "No other exit code is admissible" — {0,1,2,3} only').toEqual([])
    for (const code of [0, 1, 2, 3]) {
      expect(codes, `§3.6: exit ${code} must exist as a real branch`).toContain(code)
    }

    // S3 — order: the precondition is checked BEFORE the probe is written.
    const preconditionAt = src.search(/electron-divergence|npm run divergence/)
    const probeAt = src.search(/getBoundingClientRect/)
    expect(preconditionAt, '§3.1 step 2/§5 PRE-1: the divergence precondition must be invoked by the leg').toBeGreaterThanOrEqual(0)
    expect(probeAt, '§3.1 step 6/§3.2: the measurement probe must exist').toBeGreaterThanOrEqual(0)
    expect(
      preconditionAt < probeAt,
      '§3.1: order is contract — the PRECONDITION (step 2) must precede the measurement probe (step 6); with a red divergence leg the leg exits 2 and takes NO measurement',
    ).toBe(true)
  })

  // -------------------------------------------------------------------------
  // §5 PRE-1 / PRE-2 — the precondition and the same-tree identity.
  // States:
  //   S1 the leg records the divergence leg's own result line verbatim
  //      (`R13 RESULT: <N> checks, <M> failures`, §5.1)
  //   S2 the `PRECONDITION-FAILED` marker is produced when it is not green
  //   S3 a digest of the built artifacts (`dist/main/main.cjs` at minimum) is
  //      recorded before AND after the divergence run (§5.1 PRE-2)
  //   S4 `node_modules/provident-ssr/package.json`'s version is recorded
  // Fail-states (§5.1): not green ⇒ PRECONDITION-FAILED, exit 2, no measurement,
  //   the divergence line + exit code verbatim; a differing digest or a
  //   pin/installed-dist disagreement ⇒ PRECONDITION-FAILED.
  // -------------------------------------------------------------------------
  it('§5 PRE-1/PRE-2 — PRECONDITION-FAILED, the verbatim R13 line, and the same-tree digest', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§5.1 PRE-1: the fail state is named `PRECONDITION-FAILED`').toMatch(/PRECONDITION-FAILED/)
    expect(src, '§5.1 PRE-1: the divergence leg runs as `npm run divergence` / scripts/electron-divergence.mjs').toMatch(
      /npm run divergence|electron-divergence/,
    )
    expect(src, "§5.1 PRE-1: the divergence leg's own result line is recorded verbatim — `R13 RESULT: <N> checks, <M> failures`").toMatch(
      /R13 RESULT/,
    )
    expect(src, '§5.1 PRE-2: a digest of the built artifacts (dist/main/main.cjs at minimum) is recorded').toMatch(/main\.cjs/)
    expect(src, '§5.1 PRE-2: the digest is a real hash, before and after the divergence run').toMatch(/(createHash|sha256|digest)/i)
    expect(src, '§5.1 PRE-2: the before/after comparison is stated').toMatch(/before/i)
    expect(src, '§5.1 PRE-2: the after/differing-digest fail state is stated').toMatch(/after|differ/i)
    expect(
      src,
      "§5.1 PRE-2: `node_modules/provident-ssr/package.json`'s version is recorded",
    ).toMatch(/provident-ssr/)
  })

  // -------------------------------------------------------------------------
  // §6 DIS-1 / DIS-2 — the DISPLAY prerequisite and its refusal.
  // States:
  //   S1 the leg references `DISPLAY` (§6 DIS-1)
  //   S2 the refusal names the FIX — `DISPLAY`, or an xvfb wrapper the operator
  //      supplies (§6 DIS-2)
  //   S3 the refusal is an exit 3 (§3.6), never a skip and never a green
  // Fail-state (§6 DIS-2): no DISPLAY and no xvfb ⇒ an ACTIONABLE PREREQUISITE
  //   ERROR NAMING THE FIX, exit 3 — "NEVER a silent skip, NEVER a false green,
  //   NEVER a `0`".
  // -------------------------------------------------------------------------
  it('§6 DIS-1/DIS-2 — without a display the leg refuses with the fix named and exit 3', () => {
    const src = readSource(LEG_PATH)
    expect(src, LEG_ABSENT).not.toBeNull()
    if (src === null) return

    expect(src, '§6 DIS-1: the leg requires a display server — `DISPLAY`').toMatch(/DISPLAY/)
    expect(src, '§6 DIS-2: the message must NAME THE FIX (xvfb, or DISPLAY)').toMatch(/xvfb/i)
    expect(src, '§6 DIS-2/§3.6: the refusal is an exit 3').toMatch(/process\.exit\(\s*3\s*\)/)
    expect(src, '§6 DIS-2: the refusal is a PREREQUISITE ERROR, not a skip').toMatch(/PREREQUISITE/)
  })

  // -------------------------------------------------------------------------
  // §6 DIS-3 / §1 out-of-scope / H-r19 — the two prohibitions. GUARD ROW: it
  // PASSES today and must keep passing (§6 DIS-3: "Do NOT add `show:false` and
  // do NOT add a CI config").
  // -------------------------------------------------------------------------
  it('§6 DIS-3 — no `show:false` in the app and no CI config (guard, passes today)', () => {
    const main = readSource(MAIN_PATH)
    expect(main, 'src/main/main.ts must exist').not.toBeNull()
    if (main === null) return
    expect(main, '§6 DIS-3/H-r19: do NOT add `show:false` to the BrowserWindow').not.toMatch(/show\s*:\s*false/)
    expect(existsSync(join(ROOT, '.github')), '§6 DIS-4: "This repo has NO CI config" (glob `.github/**` → no files)').toBe(false)
  })

  // -------------------------------------------------------------------------
  // §5 PRE-4 — the precondition's leg may not be weakened. GUARD ROW: it PASSES
  // today (verified this run against `scripts/electron-divergence.mjs`) and is
  // the regression net for `U-12` / §3.7 `F-8`: no diff may move the pinned
  // spawn vector or the result-line arithmetic.
  // -------------------------------------------------------------------------
  it('§5 PRE-4 — the divergence leg\'s pinned vector + result line are untouched (guard, passes today)', () => {
    expect(DIVERGENCE_SRC, 'scripts/electron-divergence.mjs must exist (§8 N-5)').not.toBeNull()
    if (DIVERGENCE_SRC === null) return
    for (const flag of PINNED_SPAWN_FLAGS) {
      expect(DIVERGENCE_SRC, `§2.1 item 1/PRE-4: the landed spawn vector flag \`${flag}\` must remain byte-identical`).toContain(flag)
    }
    expect(DIVERGENCE_SRC, '§2.1 item 1/PRE-4: the fresh scratch profile flag must remain').toContain('--user-data-dir=')
    expect(DIVERGENCE_SRC, '§2.1 item 1: the env pair must remain identical').toMatch(/DISPLAY:\s*process\.env\.DISPLAY \|\| ':0'/)
    expect(DIVERGENCE_SRC, '§2.1 item 1: the sandbox env must remain identical').toMatch(/ELECTRON_DISABLE_SANDBOX:\s*'1'/)
    expect(DIVERGENCE_SRC, '§2.1 item 1: the stdio wiring must remain identical').toMatch(/stdio:\s*\['pipe',\s*'pipe',\s*'pipe'\]/)
    expect(DIVERGENCE_SRC, '§5.4/PRE-4: the result line the precondition consumes is a PIN, not a formattable string').toMatch(
      /R13 RESULT: \$\{checks\} checks, \$\{failures\} failures/,
    )
  })

  // -------------------------------------------------------------------------
  // §5.5 — the zero-row register exemption. Its three honest statements are
  // claims about the repo, and two of them are assertable. GUARD ROW: PASSES
  // today (§5.5 read `package.json:25-31`: five `devDependencies` keys).
  // States: S1 the devDependencies key set is EXACTLY the five pinned keys;
  //   S2 no `fast-check` and no property runner is added (§5.5 item 3).
  // -------------------------------------------------------------------------
  it('§5.5 — the zero-row register exemption: no PBT harness, and none may be added (guard, passes today)', () => {
    const pkg = readPkg()
    const devDeps = Object.keys(pkg.devDependencies ?? {}).sort()
    expect(
      devDeps,
      '§5.5: "The `devDependencies` key set is `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` … **no `fast-check`, no `hypothesis`, no property runner**"; §5.5 item 3 forbids this unit adding one',
    ).toEqual(['@types/node', 'electron', 'esbuild', 'typescript', 'vitest'])
    expect(Object.keys(pkg.devDependencies ?? {})).not.toContain('fast-check')
  })
})

describe('§2.1 — the shared Electron-spawn helper (contract rows, all red today)', () => {
  // -------------------------------------------------------------------------
  // §2.1 item 1 — "One module, imported by both legs." States:
  //   S1 a candidate helper module exists in `scripts/` (path NOT pinned)
  //   S2 `scripts/electron-divergence.mjs` imports it (its two spawn sites
  //      become helper calls) and no longer spawns inline
  //   S3 `scripts/electron-ui.mjs` imports it
  // Fail-state (§2 item 2 / §7 item 2): no helper ⇒ the spawn stays duplicated
  //   inline in the divergence leg.
  // -------------------------------------------------------------------------
  it('H-1 (§2.1 item 1) — one helper module exists and BOTH legs import it', () => {
    expect(HELPERS.length, HELPER_ABSENT).toBeGreaterThan(0)
    expect(DIVERGENCE_SRC, 'scripts/electron-divergence.mjs must exist (§8 N-5)').not.toBeNull()
    const shared = HELPERS.filter((f) => importsHelper(DIVERGENCE_SRC, f))
    expect(
      shared.length,
      '§2.1 item 1: "One module, imported by both legs. scripts/electron-divergence.mjs\'s two spawn sites become helper calls"',
    ).toBeGreaterThan(0)
    expect(
      DIVERGENCE_SRC,
      '§2.1 item 1/§7 item 2: the raw child_process spawn must move INTO the helper (it is duplicated at :126/:137 today)',
    ).not.toMatch(/import\s*\{\s*spawn\s*\}\s*from\s*'node:child_process'/)

    const leg = readSource(LEG_PATH)
    expect(leg, LEG_ABSENT).not.toBeNull()
    if (leg === null) return
    const legShared = shared.filter((f) => importsHelper(leg, f))
    expect(legShared.length, '§2.1 item 1: the `ui` leg must import the same helper module').toBeGreaterThan(0)
  })

  // -------------------------------------------------------------------------
  // §2.1 item 2 — what the helper exposes. States:
  //   S1 a fresh-scratch-profile creator (the leg passes its own
  //      `--user-data-dir`) — under the OS temp dir
  //   S2 the base argument vector
  //   S3 the spawn
  //   S4 a cleanup hook registered on `process.on('exit')`
  // Fail-state: a helper without the cleanup hook leaves scratch profiles
  //   behind (adversarial seed U-10).
  // -------------------------------------------------------------------------
  it('H-2 (§2.1 item 2) — the helper exposes the scratch creator, the base vector, the spawn and the exit cleanup hook', () => {
    expect(HELPER_SRC, HELPER_ABSENT).not.toBeNull()
    if (HELPER_SRC === null) return

    expect(HELPER_SRC, '§2.1 item 2: a fresh-scratch-profile creator under the OS temp dir').toMatch(/mkdtempSync\s*\(/)
    expect(HELPER_SRC, '§2.1 item 2: the scratch root is `tmpdir()` (§6 DIS-5)').toMatch(/tmpdir\s*\(/)
    for (const flag of PINNED_SPAWN_FLAGS) {
      expect(HELPER_SRC, `§2.1 item 1/2: the helper must carry the landed base argument vector (missing ${flag})`).toContain(flag)
    }
    expect(HELPER_SRC, '§2.1 item 2: the helper performs the spawn').toMatch(/\bspawn\s*\(|from\s*'node:child_process'/)
    expect(HELPER_SRC, "§2.1 item 2: a cleanup hook registered on `process.on('exit')`").toMatch(/process\.on\(\s*'exit'/)
    expect(HELPER_SRC, '§2.1 item 2: cleanup is best-effort removal of the scratch profile').toMatch(/rmSync|rm\s*\(/)
  })

  // -------------------------------------------------------------------------
  // §2.1 item 3 — "The two flags are ONE decision, not two": both
  // `--disable-dev-shm-usage` AND the fresh scratch `--user-data-dir` are
  // REQUIRED, and "The `ui` leg inherits the pair and must not drop either".
  // States: S1 both members present in the helper; S2 the leg's own boot path
  //   cannot drop them — asserted through the helper the leg imports.
  // Fail-state: dropping either alone still dies SIGTRAP (measured,
  //   `docs/specs/engine-pin-live-status.md` §1.3).
  // -------------------------------------------------------------------------
  it('H-3 (§2.1 item 3) — both `--disable-dev-shm-usage` and a fresh scratch `--user-data-dir` survive', () => {
    expect(HELPER_SRC, HELPER_ABSENT).not.toBeNull()
    if (HELPER_SRC === null) return

    expect(HELPER_SRC, '§2.1 item 3: `--disable-dev-shm-usage` is REQUIRED').toContain('--disable-dev-shm-usage')
    expect(HELPER_SRC, '§2.1 item 3: the fresh scratch `--user-data-dir` is REQUIRED').toMatch(/user-data-dir/)
  })

  // -------------------------------------------------------------------------
  // §2.1 item 4 — "The helper must not silently swallow a spawn failure — a
  // leg that cannot spawn reports its own prerequisite/fail state; it never
  // reports `0` (§3.3, R2)." States: S1 the helper's spawn path has a throwing
  ///rejecting error path; S2 the leg's own spawn-failure branch is exit 1
  //   (§3.1 step 4) — the last half is asserted in the §3.6 row above.
  // Fail-state: a swallowed spawn failure ⇒ a silent green / a `0`.
  // -------------------------------------------------------------------------
  it('H-4 (§2.1 item 4) — a spawn failure is not swallowed', () => {
    expect(HELPER_SRC, HELPER_ABSENT).not.toBeNull()
    if (HELPER_SRC === null) return

    expect(
      HELPER_SRC,
      '§2.1 item 4: the helper must not silently swallow a spawn failure — an error/reject path is required',
    ).toMatch(/reject\s*\(|throw\s+new\s+Error|\.on\(\s*'error'/)
  })
})

// ===========================================================================
// §3.7 — THE RETRY POLICY (`RT-1`…`RT-9`): the harness the rows below drive
// ===========================================================================
//
// HONESTY NOTE (2026-09-27). The retry of §3.7 was implemented in the same pass
// that produced these rows, so the red-first order is INVERTED for this clause
// set and the rows below come back GREEN. That is stated here rather than
// hidden; the falsifiability of each row is established by OTHER means:
//   * the ELIGIBILITY / classification / bookkeeping rows drive the REAL
//     functions extracted from `scripts/electron-ui.mjs` at test time (not a
//     regex over its text), against a matrix of states — so a mutated predicate,
//     bound, backoff table, record or teardown reddens them;
//   * the SOURCE rows asserted here are chosen so that a PLAUSIBLE break
//     reddens them: a call count, an ordering, a census, or the ABSENCE of a
//     forbidden predicate/term — never a bare "the file mentions X";
//   * the `[U]`-only halves (a real boot dying `SIGTRAP`, a genuinely broken
//     boot, a red divergence precondition) are NOT reachable in `[T]` — "no
//     window boots there" (§3.0's `R0` caveat, §3.7's own two-kinds-of-row
//     note). Those halves are marked in each row and were falsified out of tree,
//     against a COPY of the leg under `/tmp/` (never the repo's scripts): the
//     observed differences are reported to the supervisor, not encoded here.
//
// THE EXTRACTION HARNESS. A regex over the leg's text can be satisfied by a
// comment (the adversarial pass's finding) or by a hard-coded literal that no
// longer decides anything. So these rows take the leg's OWN declarations out of
// its source and RUN them in an isolated sandbox with stubbed collaborators.
// The extraction itself FAILS LOUDLY if the declaration is renamed or removed —
// so "the function no longer exists" is a red row, not a skipped one.

type ScanMode = 'code' | 'line' | 'block' | 'single' | 'double' | 'template'

type ScanEvent = { ch: string; index: number; inCode: boolean }

/** Walk a JS source with a comment/string/template-aware state machine and
 *  report EVERY character, flagging whether it is executable code. `inCode` is
 *  false only inside a comment: a string literal's characters (and a template
 *  literal's text) are part of the program and count as code.
 *
 *  Braces inside `${…}` interpolations are tracked as CODE, and the closing `}`
 *  returns the walk to template mode — the naive version of this scanner (which
 *  stayed in code mode after an interpolation) silently destroyed every
 *  position after the first interpolated template literal, which is exactly the
 *  class of failure a source-text assertion must not be built on. */
function scan(src: string, start: number, on: (e: ScanEvent) => boolean): void {
  let mode: ScanMode = 'code'
  const stack: ScanMode[] = []
  const interpolationDepth: number[] = []
  let depth = 0
  for (let i = start; i < src.length; i += 1) {
    const c = src[i]
    const n = src[i + 1]
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      if (on({ ch: c, index: i, inCode: false }) === false) return
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        if (on({ ch: c, index: i, inCode: false }) === false) return
        i += 1
        mode = stack.pop() ?? 'code'
        if (on({ ch: '/', index: i, inCode: false }) === false) return
        continue
      }
      if (on({ ch: c, index: i, inCode: false }) === false) return
      continue
    }
    if (mode === 'single' || mode === 'double' || mode === 'template') {
      const quote = mode === 'single' ? "'" : mode === 'double' ? '"' : '`'
      if (c === '\\') {
        if (on({ ch: c, index: i, inCode: true }) === false) return
        i += 1
        if (on({ ch: src[i] ?? '', index: i, inCode: true }) === false) return
        continue
      }
      if (mode === 'template' && c === '$' && n === '{') {
        depth += 1
        interpolationDepth.push(depth)
        mode = 'code'
        i += 1
        if (on({ ch: '{', index: i, inCode: true }) === false) return
        continue
      }
      if (c === quote) mode = stack.pop() ?? 'code'
      if (on({ ch: c, index: i, inCode: true }) === false) return
      continue
    }
    if (c === '/' && n === '/') {
      stack.push('code')
      mode = 'line'
      if (on({ ch: c, index: i, inCode: false }) === false) return
      continue
    }
    if (c === '/' && n === '*') {
      stack.push('code')
      mode = 'block'
      if (on({ ch: c, index: i, inCode: false }) === false) return
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      stack.push('code')
      mode = c === "'" ? 'single' : c === '"' ? 'double' : 'template'
      if (on({ ch: c, index: i, inCode: true }) === false) return
      continue
    }
    if (c === '{') depth += 1
    else if (c === '}') {
      depth -= 1
      if (interpolationDepth.length > 0 && depth === interpolationDepth[interpolationDepth.length - 1] - 1) {
        interpolationDepth.pop()
        mode = 'template'
      }
    }
    if (on({ ch: c, index: i, inCode: true }) === false) return
  }
}

/** Walk `src` from `start`, calling `visit(ch, index)` for every character that
 *  is EXECUTABLE CODE. The walk stops as soon as `visit` returns `false`. */
function walkCode(src: string, start: number, visit: (ch: string, index: number) => boolean): void {
  scan(src, start, ({ ch, index, inCode }) => (inCode ? visit(ch, index) : true))
}

/** Remove comments from a JS source, preserving offsets (every comment
 *  character becomes a space; newlines are kept), so an assertion like "the
 *  helper carries no retry" can be neither satisfied nor broken by a docstring.
 *  String and template literals are kept verbatim. */
function stripComments(src: string): string {
  const out = src.split('')
  scan(src, 0, ({ ch, index, inCode }) => {
    if (!inCode) out[index] = ch === '\n' ? '\n' : ' '
    return true
  })
  return out.join('')
}

/** Index of the delimiter matching the one at `open`, or -1. */
function matchDelim(src: string, open: number, openCh: string, closeCh: string): number {
  let depth = 0
  let result = -1
  walkCode(src, open, (ch, index) => {
    if (ch === openCh) depth += 1
    else if (ch === closeCh) {
      depth -= 1
      if (depth === 0) {
        result = index
        return false
      }
    }
    return true
  })
  return result
}

/** Extract a top-level `function NAME(...) { … }` (async or not) verbatim. */
function extractFunction(src: string, name: string): string | null {
  const re = new RegExp(`^(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\(`, 'm')
  const m = re.exec(src)
  if (m === null) return null
  const parenOpen = m.index + m[0].length - 1
  const parenClose = matchDelim(src, parenOpen, '(', ')')
  if (parenClose === -1) return null
  const braceOpen = src.indexOf('{', parenClose)
  if (braceOpen === -1) return null
  const braceClose = matchDelim(src, braceOpen, '{', '}')
  if (braceClose === -1) return null
  return src.slice(m.index, braceClose + 1)
}

/** Extract a top-level `const|let|var NAME = <expr>` statement verbatim. The
 *  statement ends at the first blank line or non-continuation line at bracket
 *  depth 0 — the leg's own formatting (a blank line or a comment after every
 *  declaration), so the extraction is a real statement. */
function extractDecl(src: string, name: string): string | null {
  const re = new RegExp(`^(?:export\\s+)?(const|let|var)\\s+${name}\\s*=`, 'm')
  const m = re.exec(src)
  if (m === null) return null
  const from = m.index + m[0].length
  let depth = 0
  let end = -1
  walkCode(src, m.index, (ch, index) => {
    if (index < from) return true
    if (ch === '(' || ch === '[' || ch === '{') depth += 1
    else if (ch === ')' || ch === ']' || ch === '}') depth -= 1
    else if (ch === '\n' && depth === 0) {
      const rest = src.slice(index + 1)
      const nl = rest.indexOf('\n')
      const next = (nl === -1 ? rest : rest.slice(0, nl)).trim()
      if (next !== '' && !/^[+\-*/%?:.,&|]/.test(next)) {
        end = index
        return false
      }
    }
    return true
  })
  const expr = src.slice(from, end === -1 ? src.length : end)
  return `${m[1]} ${name} = ${expr}`
}

function requireFn(src: string, name: string): string {
  const decl = extractFunction(src, name)
  expect(
    decl,
    `§3.7 harness: the top-level function \`${name}\` could not be extracted from the leg's source — a renamed/removed decision point IS a §3.7 regression, so this row fails rather than skips`,
  ).not.toBeNull()
  return decl as string
}

function requireDecl(src: string, name: string): string {
  const decl = extractDecl(src, name)
  expect(
    decl,
    `§3.7 harness: the top-level declaration \`${name}\` could not be extracted from the leg's source — a renamed/removed pinned constant IS a §3.7 regression`,
  ).not.toBeNull()
  return decl as string
}

function requireLegSource(): string {
  const src = readSource(LEG_PATH)
  expect(src, LEG_ABSENT).not.toBeNull()
  return src as string
}

function requireHelperSource(): string {
  expect(HELPER_SRC, HELPER_ABSENT).not.toBeNull()
  return HELPER_SRC as string
}

function requireDivergenceSource(): string {
  expect(DIVERGENCE_SRC, 'scripts/electron-divergence.mjs must exist (§8 N-5)').not.toBeNull()
  return DIVERGENCE_SRC as string
}

// ---------------------------------------------------------------------------
// THE ROW-PREDICATE RUNNER (added 2026-09-27, adversarial finding `G-4`).
// ---------------------------------------------------------------------------
//
// `G-4`: the `R0`…`R4` rows asserted the leg's SOURCE TEXT, so a revert of the
// behaviour they claim to pin left them green — most glaringly the `R1` row,
// which asserted `/typeof\s+(window|document|globalThis)/`: **the very marker
// the `M-1` amendment STRUCK**, so `R1`'s runtime predicate could revert to the
// non-discriminating `typeof window` form and the row would still pass. This
// section gives the same file ONE more technique (beside the `RT-*`
// extract-and-run harness above): take the row's OWN boolean predicate out of
// the leg's source and RUN it, and take the leg's own marker/status/tallies and
// RUN them too. A row that cannot be satisfied by a comment, by a literal, or
// by a phrase now reddens when the corresponding behaviour is reverted.

/** Split a call's argument text at its TOP-LEVEL commas (comment/string aware,
 *  bracket-depth aware), so `row(label, predicate, detail)` — and any nested
 *  call inside `detail` — can each be taken out separately. */
function topLevelArgs(text: string): string[] {
  // MODE-AWARE, not just comment-aware: the leg's own row labels contain
  // apostrophes inside double-quoted strings (`"… the developer's persisted …"`),
  // and a splitter that does not know which quote opened a literal reads that
  // apostrophe as an opening `'` and destroys the argument list — measured while
  // building this harness: the `R0(c)` predicate came out as the fragment
  // `the boot\'s code-group surface follows it`.
  type Mode = 'code' | 'line' | 'block' | 'single' | 'double' | 'template'
  const args: string[] = []
  let mode: Mode = 'code'
  const stack: Mode[] = []
  let depth = 0
  let current = ''
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i]
    const n = text[i + 1]
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      current += c
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        current += c + '/'
        i += 1
        mode = stack.pop() ?? 'code'
        continue
      }
      current += c
      continue
    }
    if (mode === 'single' || mode === 'double' || mode === 'template') {
      const quote = mode === 'single' ? "'" : mode === 'double' ? '"' : '`'
      current += c
      if (c === '\\') {
        current += n ?? ''
        i += 1
        continue
      }
      if (c === quote) mode = stack.pop() ?? 'code'
      continue
    }
    if (c === '/' && n === '/') {
      stack.push('code')
      mode = 'line'
      current += c
      continue
    }
    if (c === '/' && n === '*') {
      stack.push('code')
      mode = 'block'
      current += c
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      stack.push('code')
      mode = c === "'" ? 'single' : c === '"' ? 'double' : 'template'
      current += c
      continue
    }
    if (c === '(' || c === '[' || c === '{') depth += 1
    else if (c === ')' || c === ']' || c === '}') depth -= 1
    if (c === ',' && depth === 0) {
      args.push(current.trim())
      current = ''
      continue
    }
    current += c
  }
  const last = current.trim()
  if (last !== '') args.push(last)
  return args
}

/** Extract a call `name(…)` verbatim: the whole call text, plus its top-level
 *  arguments. */
function extractCall(src: string, name: string): { text: string; args: string[]; index: number } | null {
  const m = new RegExp(`\\b${name}\\s*\\(`).exec(src)
  if (m === null) return null
  const open = m.index + m[0].length - 1
  const close = matchDelim(src, open, '(', ')')
  if (close === -1) return null
  return { text: src.slice(m.index, close + 1), args: topLevelArgs(src.slice(open + 1, close)), index: m.index }
}

/** The argument's opening quote character, or `null` when it is not a string
 *  literal. */
function literalQuote(arg: string): string | null {
  const first = arg.trim()[0]
  return first === "'" || first === '"' || first === '`' ? first : null
}

/** The leg's OWN `row(...)` call site whose LABEL contains `labelFragment`
 *  (label fragments are taken verbatim from the spec's row text, e.g.
 *  `R1 real-renderer typed marker`). The label may be a concatenation — `R4`'s
 *  is — in which case the fragment is looked for in the whole first argument.
 *  Returns `null` when no such row exists; every caller asserts non-null with a
 *  labelled message, so a renamed/removed row is a RED row, never a skip. */
function findRowCall(src: string, labelFragment: string): { text: string; args: string[] } | null {
  const re = /\brow\s*\(/g
  for (const m of src.matchAll(re)) {
    const open = m.index + m[0].length - 1
    const close = matchDelim(src, open, '(', ')')
    if (close === -1) continue
    const call = src.slice(m.index, close + 1)
    const args = topLevelArgs(src.slice(open + 1, close))
    if (args.length < 2) continue
    const label = args[0]
    const quote = literalQuote(label)
    const inside = quote === null ? label : label.trim().slice(1, -1)
    if (inside.includes(labelFragment)) return { text: call, args }
  }
  return null
}

/** RUN the leg's own boolean predicate for the row whose label contains
 *  `labelFragment`, with `scope` supplying the values the predicate reads.
 *
 *  This is a BEHAVIOURAL row, not a text match: the predicate is taken out of
 *  the leg and evaluated, so `true`, a constant, an inverted condition or a
 *  predicate that consults the wrong observation all redden it. The scope is
 *  passed as a REAL parameter (`new Function('__scope', …)`) so the predicate's
 *  own `typeof window` — if a revert reintroduces one — is the GLOBAL one, which
 *  is exactly what the `R1` falsifier below needs. */
function runRowPredicate(src: string, labelFragment: string, scope: Record<string, unknown> = {}): boolean {
  const call = findRowCall(src, labelFragment)
  expect(
    call,
    `G-4 falsifiability: the leg has no \`row(...)\` call site whose label contains "${labelFragment}" — a renamed or removed row IS a regression, so this fails rather than skips`,
  ).not.toBeNull()
  const predicate = (call as { args: string[] }).args[1]
  expect(
    predicate,
    `G-4 falsifiability: the row "${labelFragment}" carries no second argument to run — a row whose condition is not an expression cannot be falsified`,
  ).toBeTruthy()
  const names = Object.keys(scope)
  const factory = new Function(...names, `return (${predicate})`) as (...args: unknown[]) => boolean
  return factory(...names.map((n) => scope[n]))
}

/** The leg's own `function NAME(…) { … }` declaration, extracted and RUN. */
function extractFnLike(src: string, name: string): string | null {
  const re = new RegExp(`^(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\(`, 'm')
  const m = re.exec(src)
  if (m === null) return null
  const braceOpen = src.indexOf('{', m.index + m[0].length)
  if (braceOpen === -1) return null
  const braceClose = matchBrace(src, braceOpen)
  if (braceClose === -1) return null
  return src.slice(m.index, braceClose + 1)
}

/** Index of the `]` matching the `[` at `open`, or -1 — comment/string aware,
 *  via `scan` (the harness's own walker). */
function matchBracket(src: string, open: number): number {
  let depth = 0
  let result = -1
  scan(src, open, ({ ch, index, inCode }) => {
    if (!inCode) return true
    if (ch === '[') depth += 1
    else if (ch === ']') {
      depth -= 1
      if (depth === 0) {
        result = index
        return false
      }
    }
    return true
  })
  return result
}

/** Index of the backtick closing the template literal opened at `open`, or -1 —
 *  `${…}` interpolations are skipped as code. */
function matchTemplate(src: string, open: number): number {
  const interpolationDepths: number[] = []
  let depth = 0
  let mode: ScanMode = 'template'
  const stack: ScanMode[] = []
  for (let i = open + 1; i < src.length; i += 1) {
    const c = src[i]
    const n = src[i + 1]
    if (mode === 'template') {
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === '`' && depth === 0) return i
      if (c === '$' && n === '{') {
        depth += 1
        interpolationDepths.push(depth)
        mode = 'code'
        i += 1
        continue
      }
      continue
    }
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        i += 1
        mode = stack.pop() ?? 'code'
      }
      continue
    }
    if (mode === 'single' || mode === 'double') {
      const quote = mode === 'single' ? "'" : '"'
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === quote) mode = stack.pop() ?? 'code'
      continue
    }
    if (c === '`') {
      stack.push('code')
      mode = 'template'
      continue
    }
    if (c === "'" || c === '"') {
      stack.push('code')
      mode = c === "'" ? 'single' : 'double'
      continue
    }
    if (c === '{') depth += 1
    else if (c === '}') {
      depth -= 1
      if (interpolationDepths.length > 0 && depth === interpolationDepths[interpolationDepths.length - 1] - 1) {
        interpolationDepths.pop()
        mode = 'template'
      }
    }
  }
  return -1
}

/** Index of the closing quote matching the `'` or `"` at `open`, or -1. */
function matchString(src: string, open: number, quote: "'" | '"'): number {
  for (let i = open + 1; i < src.length; i += 1) {
    if (src[i] === '\\') {
      i += 1
      continue
    }
    if (src[i] === quote) return i
    if (src[i] === '\n') return -1
  }
  return -1
}

/** Index of the closing `/` of the regex literal opened at `open`, or -1. */
function matchRegex(src: string, open: number): number {
  let inClass = false
  for (let i = open + 1; i < src.length; i += 1) {
    const c = src[i]
    if (c === '\\') {
      i += 1
      continue
    }
    if (c === '\n') return -1
    if (c === '[') inClass = true
    else if (c === ']') inClass = false
    else if (c === '/' && !inClass) return i
  }
  return -1
}

/** The leg's own top-level declaration — `function NAME(…) { … }`, `const NAME =
 *  function … { … }`, or `const NAME = <expression>` — extracted and RUN.
 *
 *  WHY THIS IS NOT THE HARNESS'S `extractDecl`/`extractFunction`: those end a
 *  statement at the first newline at bracket depth 0 and count a template `${…}`
 *  interpolation as a nesting level. Two of the declarations this block RUNS
 *  break exactly there, MEASURED while building it: `probeEnvelope` is a FUNCTION
 *  declaration (`extractDecl` returns `null` for it — the first version of this
 *  harness failed on exactly that), and `HONEST_LIMITS`' statement was
 *  truncated to its header (`const HONEST_LIMITS = `, no string) by both. The
 *  extraction here finds the declaration's first opener and matches it exactly
 *  (`matchBrace` for a body, `matchParen` for a call, `matchTemplate` for a
 *  string, `matchDelim` for an array/object literal); a declaration whose
 *  expression starts with none of those falls back to `extractDecl`. */
function extractDeclFull(src: string, name: string): string | null {
  const re = new RegExp('^(?:export\\s+)?(?:(?:async\\s+)?function\\s+' + name + '\\s*\\()|(?:(?:const|let|var)\\s+' + name + '\\s*=)', 'm')
  const m = re.exec(src)
  if (m === null) return null
  const fnHeader = m[0].trimEnd().endsWith('(')
  // Find the statement's opening bracket, starting at the declaration's own
  // header: a function HEADER's parameter list belongs to the statement, so the
  // walk starts one character past the header's `(`; a `const NAME = …` walk
  // starts at the `=` (the declaration's own value).
  const from = m.index + m[0].length + (fnHeader ? 1 : 0)
  // The header's own parameter list is `fnParams`; a function's BODY is the brace
  // after it, and the statement ends at its matching `}`.
  const openParen = fnHeader ? m.index + m[0].length - 1 : -1
  const closeParen = openParen === -1 ? -1 : matchParen(src, openParen)
  let end = -1
  if (fnHeader) {
    if (closeParen === -1) return null
    const bodyOpen = src.indexOf('{', closeParen)
    if (bodyOpen === -1) return null
    end = matchBrace(src, bodyOpen)
  } else {
    scan(src, from, ({ ch, index, inCode }) => {
      if (!inCode) return true
      if (/\s/.test(ch)) return true
      if (ch === '{') {
        end = matchBrace(src, index)
        return false
      }
      if (ch === '`') {
        end = matchTemplate(src, index)
        return false
      }
      if (ch === '[') {
        end = matchBracket(src, index)
        return false
      }
      if (ch === "'" || ch === '"') {
        end = matchString(src, index, ch as "'" | '"')
        return false
      }
      if (ch === '/') {
        end = matchRegex(src, index)
        return false
      }
      // a bare expression (`const X = 1 + 2;`): ends at the first newline at
      // bracket depth 0 that is not a continuation line (the leg's own
      // formatting).
      let depth = 0
      scan(src, index, ({ ch: c, index: j, inCode: ic }) => {
        if (!ic) return true
        if (c === '(' || c === '[' || c === '{') depth += 1
        else if (c === ')' || c === ']' || c === '}') depth -= 1
        else if (c === '\n' && depth === 0) {
          const rest = src.slice(j + 1)
          const nl = rest.indexOf('\n')
          const next = (nl === -1 ? rest : rest.slice(0, nl)).trim()
          if (next !== '' && !/^[+\-*/%?:.,&|]/.test(next)) {
            end = j
            return false
          }
        }
        return true
      })
      return false
    })
  }
  if (end === -1) return null
  return src.slice(m.index, end + 1)
}

function requireFnLike(src: string, name: string): string {
  const decl = extractFnLike(src, name)
  expect(
    decl,
    `G-4 falsifiability: the leg's own \`${name}\` could not be extracted — a renamed/removed observation point IS a regression, so this row fails rather than skips`,
  ).not.toBeNull()
  return decl as string
}

/** RUN a snippet extracted from the leg's source as a function of `scope`. Used
 *  for the leg's own expressions (the status word's derivation, the marker
 *  bindings), never for a restatement of them. */
function runExtractedExpression(expr: string, scope: Record<string, unknown>): unknown {
  const names = Object.keys(scope)
  const factory = new Function(...names, `return (${expr})`) as (...args: unknown[]) => unknown
  return factory(...names.map((n) => scope[n]))
}

// ---------------------------------------------------------------------------
// THE PROBE-BODY RUNNER (`G-4`, the `R1`/`R2`/`R3` provenance half).
// ---------------------------------------------------------------------------
//
// The measurement probe is a provident HANDLER BODY — a `function (ctx) { … }`
// string inside `probeEnvelope()` — and it is the ONLY thing that writes the
// `PROBE[…]PROBE` block the `R1`/`R2`/`R3` rows read. Running it directly, in a
// controlled realm, is what makes those rows falsifiable END TO END: the row's
// predicate is run against the probe's ACTUAL output for a real-renderer realm
// and for a shim realm, so a `typeof window` predicate fails only the second and
// a `typeof window` PREDICATE REVERT passes both — i.e. reddens.

/** A stand-in for the shim's own realm: `document` IS an object and `window` IS
 *  an object, but the element is the shim's own class and its layout call
 *  throws. That is the realm a `typeof window`/`typeof document` predicate
 *  cannot discriminate (adversarial seed `U-11`). */
class ShimDocument {
  getElementById(): ShimElement {
    return new ShimElement()
  }
}

class ShimElement {
  constructor() {
    this.constructor = { name: 'ShimElement' } as unknown as Function
  }
  getBoundingClientRect(): never {
    throw new TypeError('el.getBoundingClientRect is not a function')
  }
}

/** A REAL renderer element: the element class a live renderer realm produces and
 *  a resolved computed style whose class is `CSSStyleDeclaration`. */
class HTMLDivElement {
  constructor() {
    this.constructor = { name: 'HTMLDivElement' } as unknown as Function
  }
  getBoundingClientRect(): { width: number; height: number } {
    return { width: 427, height: 22 }
  }
}

class CSSStyleDeclaration {
  display = 'block'
  fontSize = '16px'
  constructor() {
    this.constructor = { name: 'CSSStyleDeclaration' } as unknown as Function
  }
}

type ProbeRealm = {
  label: string
  globals: Record<string, unknown>
}

/** The real-renderer realm: `window`/`document` are objects (a live renderer
 *  realm) and the element/style classes are the renderer-API ones. */
const REAL_RENDERER_REALM: ProbeRealm = {
  label: 'real renderer realm (element=HTMLDivElement, style=CSSStyleDeclaration)',
  globals: {
    document: new (class RealDocument {
      getElementById(): HTMLDivElement {
        return new HTMLDivElement()
      }
    })(),
    getComputedStyle: () => new CSSStyleDeclaration(),
    window: { document: {} },
  },
}

/** The SHIM realm, as the shim's own observation is pinned in §3.0 `R1` /
 *  AMENDMENT BLOCK `M-1`: `document` is an object (the shim installs its own),
 *  `window` is the same, the element is `ShimElement` and the layout call
 *  throws. */
const SHIM_REALM: ProbeRealm = {
  label: 'shim realm (document populated, element=ShimElement, getBoundingClientRect missing)',
  globals: {
    document: new ShimDocument(),
    getComputedStyle: () => ({ display: 'block', fontSize: '' }),
    window: { document: {} },
  },
}

/** RUN the leg's OWN probe handler body in `realm` and return the graph content
 *  it wrote — the `PROBE[…]PROBE` observation the `R1`/`R2`/`R3` rows read. */
function runProbeBody(
  src: string,
  realm: ProbeRealm,
): { written: string[]; frame: string; threw: Error | null } {
  const envelope = extractDeclFull(src, 'probeEnvelope')
  expect(
    envelope,
    'G-4 falsifiability: the leg\'s own `probeEnvelope` could not be extracted — the ONE measurement probe IS the observation `R1`/`R2` read, so a renamed/removed one fails this row rather than skipping it',
  ).not.toBeNull()
  const factory = new Function(`${envelope}\nreturn probeEnvelope()`) as () => {
    template: { root: { children: Array<{ handlers?: Array<{ body: string }> }> } }
  }
  const env = factory()
  const body = env.template.root.children.flatMap((c) => c.handlers ?? [])[0]?.body
  expect(
    body,
    '§3.2: the probe envelope must carry a handler body (the ONE measurement probe) — without it no `R1`/`R2` observation exists at all',
  ).toBeTruthy()
  expect(
    body,
    '§3.2 item 2: the probe body must read the renderer-API provenance (`el.constructor`) and the layout rect — the two things `R1`/`R2` are built on',
  ).toMatch(/constructor[\s\S]*getBoundingClientRect/)

  const written: string[] = []
  const target = { id: 'n-1', props: { id: 'ui-probe-out' } }
  const ctx = {
    tree: {
      allNodes: () => [target],
    },
    clientAPI: {
      apply: (_id: unknown, muts: Array<{ value?: string }>) => {
        written.push(String(muts[0]?.value))
      },
    },
  }
  const keys = Object.keys(realm.globals)
  const saved = keys.map((k) => [k, Object.getOwnPropertyDescriptor(globalThis, k)] as const)
  let threw: Error | null = null
  try {
    for (const k of keys) Object.defineProperty(globalThis, k, { value: realm.globals[k], configurable: true, writable: true })
    ;(new Function(`return (${body})`)() as (c: unknown) => void)(ctx)
  } catch (e) {
    // A throwing realm (the shim's own signature, §3.4) is a STATE, not a
    // failure of this harness: the writes it made BEFORE the throw are the
    // observation `R1` reads, and they are returned.
    threw = e as Error
  } finally {
    for (const [k, d] of saved) {
      if (d === undefined) delete (globalThis as Record<string, unknown>)[k]
      else Object.defineProperty(globalThis, k, d)
    }
  }
  // The LAST framed write is the complete observation (the probe writes the
  // provenance block first and the SAME block plus the measurement second, and the
  // leg reads the final content) — so `findLast`, not `find`.
  const frame = written.filter((w) => /PROBE\[[\s\S]*\]PROBE/.test(w)).slice(-1)[0] ?? ''
  expect(
    frame,
    `${realm.label}: the probe wrote no framed observation — \`R1\`/\`R2\` read a frame that must exist (the shim's provenance write happens BEFORE its throwing layout call)`,
  ).not.toBe('')
  return { written, frame, threw }
}

/** The leg's own marker reader, extracted and bound to the leg's own source
 *  (`readMarker`). */
function makeReadMarker(src: string): (html: unknown, key: string) => string {
  const decl = requireFnLike(src, 'readMarker')
  return new Function(`${decl}\nreturn readMarker`)() as (html: unknown, key: string) => string
}

/** Index of the `}` matching the `{` at `open`, or -1 — TEMPLATE-INTERPOLATION
 *  AWARE. `matchDelim(…, '{', '}')` is correct for a `const X = { … }` literal but
 *  NOT for a function BODY: inside a function body this repo's JS scanner tracks a
 *  template `${…}` interpolation on the SAME depth counter, so an interpolation
 *  leaks one level of depth and the body's final `}` never matches (measured while
 *  building the `G-4` harness: `codeWithoutComments` — whose body carries `${…}`
 *  — extracted as `null`). This walker opens a nesting level on `${` and closes it
 *  on the matching `}`, then returns to template mode; string literals are skipped
 *  as code. */
function matchBrace(src: string, open: number): number {
  const interpolationDepths: number[] = []
  let depth = 1
  let result = -1
  let mode: ScanMode = 'code'
  const stack: ScanMode[] = []
  for (let i = open + 1; i < src.length && result === -1; i += 1) {
    const c = src[i]
    const n = src[i + 1]
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        i += 1
        mode = stack.pop() ?? 'code'
      }
      continue
    }
    if (mode === 'single' || mode === 'double') {
      const quote = mode === 'single' ? "'" : '"'
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === quote) mode = stack.pop() ?? 'code'
      continue
    }
    if (mode === 'template') {
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === '`') {
        mode = stack.pop() ?? 'code'
        continue
      }
      if (c === '$' && n === '{') {
        depth += 1
        interpolationDepths.push(depth)
        mode = 'code'
        i += 1
        continue
      }
      continue
    }
    if (c === '/' && n === '/') {
      stack.push('code')
      mode = 'line'
      continue
    }
    if (c === '/' && n === '*') {
      stack.push('code')
      mode = 'block'
      continue
    }
    if (c === '`') {
      stack.push('code')
      mode = 'template'
      continue
    }
    if (c === "'" || c === '"') {
      stack.push('code')
      mode = c === "'" ? 'single' : 'double'
      continue
    }
    if (c === '{') depth += 1
    else if (c === '}') {
      depth -= 1
      if (interpolationDepths.length > 0 && depth === interpolationDepths[interpolationDepths.length - 1] - 1) {
        interpolationDepths.pop()
        mode = 'template'
        continue
      }
      if (depth === 0) result = i
    }
  }
  return result
}

/** Index of the `)` matching the `(` at `open`, or -1 — REGEX-LITERAL aware.
 *  `matchDelim` models strings, templates and comments but not a regex literal,
 *  so a `(…)` inside one of the leg's own patterns (e.g. the `/…/` in the shim
 *  status derivation) miscounts and the match is lost. */
function matchParen(src: string, open: number): number {
  type Mode = ScanMode | 'regex' | 'regexClass'
  let mode: Mode = 'code'
  let prev = ''
  const stack: ScanMode[] = []
  let depth = 0
  let result = -1
  const regexOk = (p: string): boolean => p === '' || '([{,;:!&|?=+-*%<>~^'.includes(p) || /\breturn$/.test(p)
  let tail = ''
  for (let i = open; i < src.length && result === -1; i += 1) {
    const c = src[i]
    if (mode === 'regex' || mode === 'regexClass') {
      if (c === '\\') {
        i += 1
        continue
      }
      if (mode === 'regex' && c === '[') mode = 'regexClass'
      else if (mode === 'regexClass' && c === ']') mode = 'regex'
      else if (mode === 'regex' && c === '/') mode = 'code'
      continue
    }
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      continue
    }
    if (mode === 'block') {
      if (c === '*' && src[i + 1] === '/') {
        i += 1
        mode = stack.pop() ?? 'code'
      }
      continue
    }
    if (mode === 'single' || mode === 'double' || mode === 'template') {
      const quote = mode === 'single' ? "'" : mode === 'double' ? '"' : '`'
      if (c === '\\') {
        i += 1
        continue
      }
      if (c === quote) mode = stack.pop() ?? 'code'
      continue
    }
    if (c === '/' && src[i + 1] === '/' && !regexOk(prev)) {
      stack.push('code')
      mode = 'line'
      continue
    }
    if (c === '/' && src[i + 1] === '*') {
      stack.push('code')
      mode = 'block'
      continue
    }
    if (c === '/' && regexOk(prev)) {
      mode = 'regex'
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      stack.push('code')
      mode = c === "'" ? 'single' : c === '"' ? 'double' : 'template'
      continue
    }
    if (c === '(') depth += 1
    else if (c === ')') {
      depth -= 1
      if (depth === 0) result = i
    }
    tail = (tail + c).slice(-8)
    prev = tail.trimEnd().slice(-1)
  }
  return result
}

/** Build a sandbox out of the leg's OWN declarations + functions and evaluate
 *  it with the given collaborators. Returns the exported API. */
function sandbox(opts: {
  src: string
  decls?: string[]
  declsFull?: string[]
  fns?: string[]
  prelude?: string
  globals?: Record<string, unknown>
  exports: string[]
}): Record<string, unknown> {
  const body = [
    ...(opts.decls ?? []).map((n) => requireDecl(opts.src, n).replace(/^export\s+/, '')),
    ...(opts.declsFull ?? []).map((n) => {
      const decl = extractDeclFull(opts.src, n)
      expect(decl, `G-4 harness: the declaration \`${n}\` could not be extracted — a renamed/removed one IS a regression`).not.toBeNull()
      return (decl as string).replace(/^export\s+/, '')
    }),
    ...(opts.fns ?? []).map((n) => requireFn(opts.src, n).replace(/^export\s+/, '')),
    opts.prelude ?? '',
    `return { ${opts.exports.join(', ')} }`,
  ].join('\n')
  const globals = opts.globals ?? {}
  const names = Object.keys(globals)
  const factory = new Function(...names, body) as (...args: unknown[]) => Record<string, unknown>
  return factory(...names.map((n) => globals[n]))
}

function makeConsole(): { stub: { log: (...a: unknown[]) => void; error: (...a: unknown[]) => void }; out: string[]; err: string[] } {
  const out: string[] = []
  const err: string[] = []
  return {
    stub: {
      log: (...a: unknown[]) => out.push(a.map((v) => String(v)).join(' ')),
      error: (...a: unknown[]) => err.push(a.map((v) => String(v)).join(' ')),
    },
    out,
    err,
  }
}

/** A minimal stand-in for a spawned child, with the surface the leg's
 *  `bootAttempt` actually uses (stdio streams, `exit` observation, `kill`). */
class FakeChild {
  readonly stderr = new EventEmitter()
  readonly stdout = new EventEmitter()
  readonly stdin = { write: (_c: unknown): boolean => true, end: (): boolean => true }
  exitCode: number | null = null
  signalCode: string | null = null
  killed = false
  killedWith: string | null = null
  private readonly emitter = new EventEmitter()
  constructor(private readonly order: string[] = []) {}
  on(event: string, handler: (...a: unknown[]) => void): this {
    this.emitter.on(event, handler)
    return this
  }
  once(event: string, handler: (...a: unknown[]) => void): this {
    this.emitter.once(event, handler)
    return this
  }
  emit(event: string, ...args: unknown[]): boolean {
    return this.emitter.emit(event, ...args)
  }
  kill(signal?: string): boolean {
    this.killed = true
    this.killedWith = signal ?? null
    this.order.push('child.kill')
    return true
  }
}

type AttemptCtx = {
  child: FakeChild
  order: string[]
  transport: { closed: boolean; onerror: ((e: Error) => void) | null }
  delays: number[]
}

/** Drive the REAL `bootAttempt` (extracted from the leg) with stubbed
 *  `spawnElectron`, `ChildProcessTransport` and MCP `Client`. */
function bootAttemptHarness(opts: {
  connect: (ctx: AttemptCtx) => Promise<void>
  listTools?: () => Promise<unknown>
  timeoutMs?: number
  /** `fire` = the sandbox's timer callbacks run immediately (used by the rows
   *  that need the per-attempt handshake timeout to elapse); `hold` (default) =
   *  the timer is only RECORDED, the way a 30 s timer behaves inside a fast
   *  test — so a row that does not want the timeout must not get it. */
  timers?: 'fire' | 'hold'
}): {
  api: Record<string, unknown>
  ctx: AttemptCtx & { out: string[]; err: string[] }
} {
  const order: string[] = []
  const child = new FakeChild(order)
  const delays: number[] = []
  const cons = makeConsole()
  const transport: AttemptCtx['transport'] = { closed: false, onerror: null }
  const ctx: AttemptCtx = { child, order, transport, delays }
  const prelude = `
class ChildProcessTransport {
  constructor(child) {
    this.child = child
    this.closed = false
    this.onerror = null
    this.onclose = null
    __transport.child = child
  }
  async start() {}
  async send() {}
  async close() {
    if (this.closed) return
    this.closed = true
    __transport.closed = true
    __order.push('transport.close')
    if (this.onclose) this.onclose()
  }
}
class Client {
  constructor() {}
  async connect(t) { __order.push('connect'); return __connect(t) }
  async listTools() { return __listTools() }
  async close() { __order.push('client.close') }
}
function __setOnerror(fn) { __transport.onerror = fn }
function __transportOnerror() { return __transport.onerror }
`
  const api = sandbox({
    src: requireLegSource(),
    decls: ['USER_DATA_FLAG', 'UI_BOOT_TERMINATION_GRACE_MS', 'activeBoot', 'attemptRecords'],
    fns: ['observeTermination', 'isBootstrapDeath', 'signatureOf', 'teardown', 'recordAttempt', 'bootAttempt'],
    prelude,
    globals: {
      console: cons.stub,
      setTimeout: (fn: () => void, ms?: number) => {
        delays.push(Number(ms))
        if ((opts.timers ?? 'hold') === 'fire') queueMicrotask(fn)
        return 1
      },
      clearTimeout: () => {},
      spawnElectron: (args: string[]) => {
        order.push('spawn')
        return { child, args, env: {} }
      },
      __order: order,
      __transport: transport,
      __transportOnerror: () => transport.onerror,
      __connect: (t: { onerror: ((e: Error) => void) | null }) => {
        // `bootAttempt` has already wired `transport.onerror` by the time the
        // handshake IIFE calls `connect` (it assigns it before the IIFE runs),
        // so the stub may surface the transport error exactly as the real
        // ChildProcessTransport does. Deliberately NOT async: the failure is
        // delivered synchronously, the way a dying child's closed stdio does.
        transport.onerror = t.onerror
        return opts.connect({ child, order, transport, delays })
      },
      __listTools: opts.listTools ?? (() => Promise.resolve({ tools: [] })),
    },
    exports: ['bootAttempt', 'signatureOf', 'isBootstrapDeath', 'recordAttempt', 'attemptRecords'],
  })
  return { api, ctx: { child, order, delays, transport, out: cons.out, err: cons.err } }
}

type AttemptSpec = {
  outcome?: string
  retryable?: boolean
  code?: number | null
  signal?: string | null
  error?: string
  stderrTail?: string
}

/** Drive the REAL `bootUnder` retry loop (extracted) with a stubbed
 *  `bootAttempt` + `scratchProfile`, a recording timer and a settable clock —
 *  so the bound, the backoff table, the fresh-profile-per-attempt rule, the
 *  ceiling and the bookkeeping are the leg's own behaviour, not a paraphrase. */
function retryLoopHarness(opts: { responses: AttemptSpec[]; clock?: () => number }): {
  api: Record<string, unknown>
  out: string[]
  err: string[]
  delays: number[]
  calls: Array<Record<string, unknown>>
  profiles: string[]
} {
  const cons = makeConsole()
  const delays: number[] = []
  const calls: Array<Record<string, unknown>> = []
  const profiles: string[] = []
  const stub = (spec: Record<string, unknown>): Record<string, unknown> => {
    calls.push(spec)
    const r = opts.responses[Math.min(calls.length - 1, opts.responses.length - 1)] ?? {}
    if (r.outcome === 'accepted') {
      return {
        boot: spec.tag,
        attempt: spec.attempt,
        maxAttempts: spec.maxAttempts,
        profile: spec.profile,
        outcome: 'accepted',
        code: null,
        signal: null,
        error: '',
        stderrTail: '',
        client: {},
        tools: { tools: [] },
        child: {},
        transport: {},
      }
    }
    return {
      boot: spec.tag,
      attempt: spec.attempt,
      maxAttempts: spec.maxAttempts,
      profile: spec.profile,
      outcome: r.outcome ?? 'bootstrap-failed',
      code: r.code === undefined ? null : r.code,
      signal: r.signal === undefined ? null : r.signal,
      error: r.error ?? 'transport is closed',
      stderrTail: r.stderrTail ?? '',
      retryable: r.retryable ?? true,
    }
  }
  const api = sandbox({
    src: requireLegSource(),
    decls: ['attemptRecords', 'UI_BOOT_ATTEMPTS_MAX', 'UI_BOOT_TIMEOUT_MS_DEFAULT', 'UI_BOOT_BACKOFF_MS', 'UI_BOOT_CEILING_MS'],
    fns: ['signatureOf', 'recordAttempt', 'isBootstrapDeath', 'bootUnder'],
    globals: {
      console: cons.stub,
      setTimeout: (fn: () => void, ms?: number) => {
        delays.push(Number(ms))
        queueMicrotask(fn)
        return 1
      },
      clearTimeout: () => {},
      Date: { now: opts.clock ?? (() => 0) },
      scratchProfile: (tag: string) => {
        profiles.push(tag)
        return `/tmp/provident-ui-${tag}-${profiles.length}`
      },
      bootAttempt: (spec: Record<string, unknown>) => Promise.resolve(stub(spec)),
    },
    exports: ['bootUnder', 'isBootstrapDeath', 'signatureOf', 'attemptRecords'],
  })
  return { api, out: cons.out, err: cons.err, delays, calls, profiles }
}

/** Drive the leg's REAL retry loop (`bootUnder`) over the leg's REAL
 *  `bootAttempt` in ONE sandbox, with a child that NEVER exits and a handshake
 *  that NEVER resolves — so the failure under test is the leg's own per-attempt
 *  timeout (`RT-4` item 3), the CLASSIFICATION is the leg's own decision point
 *  (not a stubbed `retryable` flag), and the attempt consumption is the loop's
 *  own behaviour. Used by `RT-7f` (the timeout's EXHAUSTION path). */
function timeoutExhaustionHarness(): {
  api: Record<string, unknown>
  out: string[]
  err: string[]
  delays: number[]
  children: FakeChild[]
  transports: Array<{ closed: boolean }>
  order: string[]
} {
  const cons = makeConsole()
  const delays: number[] = []
  const children: FakeChild[] = []
  const transports: Array<{ closed: boolean }> = []
  const order: string[] = []
  const prelude = `
class ChildProcessTransport {
  constructor(child) {
    this.child = child
    this.closed = false
    this.onerror = null
    this.onclose = null
    __transports.push(this)
    __order.push('transport.new')
  }
  async start() {}
  async send() {}
  async close() {
    if (this.closed) return
    this.closed = true
    __order.push('transport.close')
    if (this.onclose) this.onclose()
  }
}
class Client {
  constructor() {}
  async connect(t) { __order.push('connect'); return __connect(t) }
  async listTools() { __order.push('listTools'); return { tools: [] } }
  async close() { __order.push('client.close') }
}
`
  const api = sandbox({
    src: requireLegSource(),
    // ORDER MATTERS: `UI_BOOT_CEILING_MS` is the DERIVED constant and reads the
    // other three.
    decls: [
      'USER_DATA_FLAG',
      'UI_BOOT_TERMINATION_GRACE_MS',
      'activeBoot',
      'attemptRecords',
      'UI_BOOT_ATTEMPTS_DEFAULT',
      'UI_BOOT_ATTEMPTS_MAX',
      'UI_BOOT_BACKOFF_MS',
      'UI_BOOT_TIMEOUT_MS_DEFAULT',
      'UI_BOOT_CEILING_MS',
    ],
    fns: ['observeTermination', 'isBootstrapDeath', 'signatureOf', 'recordAttempt', 'teardown', 'bootAttempt', 'bootUnder'],
    prelude,
    globals: {
      console: cons.stub,
      // Every timer fires immediately: the per-attempt handshake timeout
      // (`RT-4` item 3), the bounded termination-observation grace window and
      // the backoff sleeps. `delays` records them all, in order.
      setTimeout: (fn: () => void, ms?: number) => {
        delays.push(Number(ms))
        queueMicrotask(fn)
        return 1
      },
      clearTimeout: () => {},
      Date: { now: () => 0 },
      spawnElectron: (args: string[]) => {
        order.push('spawn')
        const child = new FakeChild(order)
        children.push(child)
        return { child, args, env: {} }
      },
      scratchProfile: (tag: string) => `/tmp/provident-ui-probe-${tag}`,
      __order: order,
      __transports: transports,
      __connect: () => new Promise<void>(() => {}),
    },
    exports: ['bootAttempt', 'bootUnder', 'signatureOf', 'isBootstrapDeath', 'recordAttempt', 'attemptRecords'],
  })
  return { api, out: cons.out, err: cons.err, delays, children, transports, order }
}

const death = (spec: Partial<AttemptSpec> = {}): AttemptSpec => ({ code: null, signal: 'SIGTRAP', ...spec })
const green = (): AttemptSpec => ({ outcome: 'accepted' })

describe('§3.7 RT-1…RT-4 — eligibility, the non-retryable classes, the bound and the budget', () => {
  // -------------------------------------------------------------------------
  // §3.7 RT-1 — the RETRYABLE class. States enumerated:
  //   S1  child terminated with a non-zero exit code, handshake unresolved
  //   S2  child terminated by a SIGNAL (SIGTRAP — the measured member)
  //   S3  child terminated by another signal (SIGABRT — the class is not
  //       SIGTRAP-only, §3.7 RT-1(i))
  //   S4  child terminated with a non-zero code after a signal-less OOM kill
  //   F1  a `stderr` substring match with NO observed termination (FORBIDDEN)
  //   F2  "the boot threw" (FORBIDDEN)
  //   F3  "the run ended non-zero" after the handshake resolved (FORBIDDEN)
  //   F4  a clean exit (code 0, no signal) before the handshake (not a crash)
  //   F5  a signal death AFTER the handshake resolved (RT-2 item 4)
  // Fail-state (§3.7 RT-1): a retry fired on any F-state is a RT-1 violation and
  //   the overclaim class §3.3 exists to prevent — the retried green is VOID.
  // FALSIFIABILITY: the predicate below is the leg's OWN `isBootstrapDeath`,
  //   extracted and evaluated. `return true`/`return !handshakeResolved`/
  //   `if (/SIGTRAP/.test(rec.stderrTail)) return true` each redden it.
  // -------------------------------------------------------------------------
  it('RT-1a (§3.7 RT-1(i)∧(ii)) — a boot whose child was OBSERVED to die (non-zero code or signal) before the handshake resolves IS retryable', () => {
    const api = sandbox({ src: requireLegSource(), fns: ['isBootstrapDeath'], exports: ['isBootstrapDeath'] })
    const retryable = api.isBootstrapDeath as (rec: Record<string, unknown>, resolved: boolean) => boolean
    const states: Array<{ label: string; code: number | null; signal: string | null }> = [
      { label: 'S1 non-zero exit code (1)', code: 1, signal: null },
      { label: 'S2 SIGTRAP signal termination (the measured member of the class)', code: null, signal: 'SIGTRAP' },
      { label: 'S3 SIGABRT signal termination (the class is not SIGTRAP-only)', code: null, signal: 'SIGABRT' },
      { label: 'S4 exit code 137 (an OOM-killed child)', code: 137, signal: null },
    ]
    for (const s of states) {
      expect(
        retryable({ code: s.code, signal: s.signal, error: 'child exited', stderrTail: '' }, false),
        `§3.7 RT-1(i)∧(ii): ${s.label} — observed child death + unresolved handshake ⇒ RETRYABLE`,
      ).toBe(true)
    }
  })

  it('RT-1b (§3.7 RT-1 — the FORBIDDEN predicates) — stderr-substring / "the boot threw" / "the run ended non-zero" / post-handshake deaths are NOT retryable', () => {
    const src = requireLegSource()
    const api = sandbox({ src, fns: ['isBootstrapDeath'], exports: ['isBootstrapDeath'] })
    const retryable = api.isBootstrapDeath as (rec: Record<string, unknown>, resolved: boolean) => boolean
    const forbidden: Array<{ label: string; rec: Record<string, unknown>; resolved: boolean }> = [
      {
        label:
          '(a) a stderr substring match with NO observed child termination — the clause\'s first forbidden predicate, deliberately baited with the exact measured word',
        rec: { code: null, signal: null, error: 'transport is closed', stderrTail: 'FATAL:SIGTRAP during browser init' },
        resolved: false,
      },
      {
        label: '(b) "the boot threw" — a leg-side exception with no observed termination',
        rec: { code: null, signal: null, error: 'TypeError: the boot threw', stderrTail: '' },
        resolved: false,
      },
      {
        label: '(c) "the run ended non-zero" — a non-zero code AFTER the handshake resolved',
        rec: { code: 1, signal: null, error: 'child exited (code 1, signal null)', stderrTail: '' },
        resolved: true,
      },
      {
        label: '(d) a clean exit (code 0, no signal) before the handshake — a refusal, not a crash',
        rec: { code: 0, signal: null, error: 'transport is closed', stderrTail: '' },
        resolved: false,
      },
      {
        label: '(e) a signal death AFTER the handshake resolved (RT-2 item 4)',
        rec: { code: null, signal: 'SIGTRAP', error: 'child exited (code null, signal SIGTRAP)', stderrTail: '' },
        resolved: true,
      },
    ]
    for (const f of forbidden) {
      expect(retryable(f.rec, f.resolved), `§3.7 RT-1: ${f.label} must NOT be retryable`).toBe(false)
    }

    // The structural half: the predicate cannot become a blanket because it
    // carries none of the forbidden terms at all. A predicate that consults
    // `stderrTail`/`error`/`outcome` reddens BOTH halves of this row.
    const body = stripComments(requireFn(src, 'isBootstrapDeath'))
    expect(
      body,
      '§3.7 RT-1: the retry must fire on the SIGNATURE, never on a text/general-outcome match — the predicate may read neither the stderr tail, the transport error message nor the outcome',
    ).not.toMatch(/stderr|stdout|outcome|\.error\b/)
    expect(body, '§3.7 RT-1(ii): the handshake state is one of the two observed halves').toMatch(/handshakeResolved/)
    // RE-POINTED 2026-09-27, third pass (PRECEDENCE CLAUSE (c) / AMENDMENT BLOCK
    // 3 `B3-3`): this assertion used to REQUIRE the literal shape
    // `return !handshakeResolved &&` — i.e. it pinned `RT-1`'s CONJUNCTION as
    // the ONLY admissible form of the predicate, which is exactly the
    // superseded reading (the landed leg's `died && (nonZero || signalled)`
    // conjunction, under which the timeout class was fatal). The ruling keeps
    // `RT-1`'s conjunction as the OBSERVED-DEATH signature and adds the TIMEOUT
    // signature as the second admissible one, so the predicate's shape must not
    // be pinned to the conjunction. What STANDS, and is asserted here, is that
    // the predicate is still signature-based rather than a blanket: it reads the
    // handshake-not-completed half (above) and it never returns a verdict
    // unconditionally. The BEHAVIOURAL half of the anti-blanket rule — the four
    // quadrants that falsify any widening — is `RT-1e`.
    expect(
      body,
      '§3.7 RT-1 + PRECEDENCE CLAUSE (c): the predicate is SIGNATURE-based, never a blanket — no unconditional `return true`',
    ).not.toMatch(/return\s+true\b/)
  })

  it('RT-1c (§3.7 RT-1(i)∧(ii) / RT-5) — at the attempt level: the raw (code, signal) pair is captured and classified inside the connect() window', async () => {
    const h = bootAttemptHarness({
      connect: ({ child, transport }) => {
        child.stderr.emit('data', 'stub bootstrap death: /dev/shm denied\n')
        child.signalCode = 'SIGTRAP'
        child.emit('exit', null, 'SIGTRAP')
        transport.onerror?.(new Error('child exited (code null, signal SIGTRAP)'))
        return new Promise<void>(() => {})
      },
    })
    const bootAttempt = h.api.bootAttempt as (spec: Record<string, unknown>) => Promise<Record<string, unknown>>
    const rec = await bootAttempt({ tag: 'A', clientName: 'ui-leg-a', profile: '/tmp/p1', attempt: 1, maxAttempts: 4, timeoutMs: 30000 })
    expect(rec.outcome, '§3.7 RT-1(i): the child died before the handshake ⇒ a FAILED BOOTSTRAP ATTEMPT').toBe('bootstrap-failed')
    expect(rec.code, '§3.7 RT-1(i): the raw pair as the child\'s exit event delivered it').toBeNull()
    expect(rec.signal).toBe('SIGTRAP')
    expect(rec.retryable, '§3.7 RT-1(i)∧(ii): both halves hold ⇒ retryable').toBe(true)
    const signatureOf = h.api.signatureOf as (r: Record<string, unknown>) => string
    expect(
      signatureOf(rec),
      '§3.7 RT-1(i)/RT-5: the raw (code, signal) pair is recorded VERBATIM (the transport error may ride alongside it, never replace it)',
    ).toContain('child exited (code null, signal SIGTRAP)')
    expect(rec.stderrTail, '§3.7 RT-5: the failed attempt carries the tail of its child stderr').toContain('stub bootstrap death')

    // and the SAME failure state after the handshake has resolved is NOT this
    // class (RT-2 item 4): the record is accepted, with no retry flag at all.
    const h2 = bootAttemptHarness({
      connect: () => Promise.resolve(),
      listTools: () => {
        h2.ctx.child.signalCode = 'SIGTRAP'
        h2.ctx.child.emit('exit', null, 'SIGTRAP')
        return Promise.resolve({ tools: [{ name: 'provident.load' }] })
      },
    })
    const rec2 = await (h2.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p2',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(
      rec2.outcome,
      '§3.7 RT-1(ii)/RT-2 item 4: the handshake COMPLETED, so a later child death is not a bootstrap death — no attempt is spent on it',
    ).toBe('accepted')
    expect(rec2.retryable, '§3.7 RT-2 item 4: an accepted boot carries no retry classification').toBeUndefined()
  })

  it('RT-1d (§3.7 RT-1 — the node-checkable half: WHICH code path decides) — the retry flag is set from `isBootstrapDeath(observedPair, handshakeResolved)`, once', async () => {
    // The spy IS the decision point: it records the arguments the leg feeds it.
    const seen: Array<{ code: unknown; signal: unknown; resolved: unknown }> = []
    const cons = makeConsole()
    const order: string[] = []
    const child = new FakeChild(order)
    const transport = { closed: false, onerror: null as ((e: Error) => void) | null }
    const src = requireLegSource()
    const api = sandbox({
      src,
      decls: ['USER_DATA_FLAG', 'UI_BOOT_TERMINATION_GRACE_MS', 'activeBoot', 'attemptRecords'],
      fns: ['observeTermination', 'signatureOf', 'teardown', 'bootAttempt'],
      prelude: `
class ChildProcessTransport {
  constructor(child) { this.child = child; this.closed = false; this.onerror = null; this.onclose = null }
  async start() {}
  async send() {}
  async close() { if (this.closed) return; this.closed = true; __order.push('transport.close') }
}
class Client {
  constructor() {}
  async connect(t) { __order.push('connect'); __transport.onerror = t.onerror; return __connect(t) }
  async listTools() { return { tools: [] } }
  async close() { __order.push('client.close') }
}
`,
      globals: {
        console: cons.stub,
        setTimeout: (fn: () => void) => {
          queueMicrotask(fn)
          return 1
        },
        clearTimeout: () => {},
        spawnElectron: () => ({ child, args: [], env: {} }),
        __order: order,
        __transport: transport,
        isBootstrapDeath: (rec: Record<string, unknown>, resolved: boolean) => {
          seen.push({ code: rec.code, signal: rec.signal, resolved })
          return true
        },
        __connect: async (t: { onerror: ((e: Error) => void) | null }) => {
          child.signalCode = 'SIGABRT'
          child.emit('exit', null, 'SIGABRT')
          t.onerror?.(new Error('child exited (code null, signal SIGABRT)'))
          await new Promise<void>(() => {})
        },
      },
      exports: ['bootAttempt'],
    })
    const rec = await (api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'B',
      clientName: 'ui-leg-b',
      profile: '/tmp/p3',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(seen.length, '§3.7 RT-1: the classification is decided ONCE per failed attempt').toBe(1)
    expect(seen[0].code, '§3.7 RT-1(i): the predicate is fed the OBSERVED pair (not a text match)').toBeNull()
    expect(seen[0].signal).toBe('SIGABRT')
    expect(seen[0].resolved, '§3.7 RT-1(ii): … together with the handshake state, which never resolved here').toBe(false)
    expect(rec.retryable, '§3.7 RT-1: the record carries the classification the decision point returned').toBe(true)
  })

  it('RT-1e (§3.7 the PRECEDENCE CLAUSE — the BOUNDARY between the TWO retryable signatures) — a timeout and an observed death are BOTH retryable; a completed handshake and every generic predicate are retryable under NEITHER', async () => {
    // -----------------------------------------------------------------------
    // §3.7 PRECEDENCE CLAUSE (ARCHITECT-RULED 2026-09-27, third pass, FIX 3),
    // asserted as the BOUNDARY it is — "the retryable set stays SIGNATURE-BASED
    // — two signatures only … and must never degenerate into a generic
    // 'anything failed' predicate". The four quadrants:
    //   Q1  TIMEOUT class — the child is still ALIVE, NO termination was
    //       observed, the handshake did NOT complete (the leg's own per-attempt
    //       timer ended the attempt)  ⇒ RETRYABLE, with its OWN signature
    //   Q2  OBSERVED-DEATH class — the child terminated (non-zero code or a
    //       signal), the handshake did NOT complete  ⇒ RETRYABLE (RT-1(i)∧(ii))
    //   Q3  COMPLETED handshake, then any failure (a later death, a non-zero
    //       code, a tool error, a wrong row)  ⇒ RETRYABLE UNDER NEITHER
    //       (`RT-2` items 1/4/6 are decided AFTER the handshake resolved)
    //   Q4  GENERIC predicates, every one with NO observed termination: a
    //       stderr substring match, "the boot threw", "the run ended non-zero"
    //       AFTER a completed handshake, and — the widening guard — a
    //       no-termination record whose transport error is NOT the
    //       handshake-timeout fact  ⇒ RETRYABLE UNDER NEITHER
    // Fail-state (§3.7 RT-1's own pass condition, a BICONDITIONAL): a retry of
    //   any Q4 state, or of a Q3 state, is a contract violation; and so is a
    //   Q1/Q2 state that is NOT retried. Either direction is a review finding.
    // FALSIFIABILITY, stated honestly because the implementation is changed in
    //   the same pass (AGENTS.md item 3/RCA-1 — this row was written FIRST):
    //   * Q1's `retryable === true` is RED against the pre-ruling leg (its
    //     `isBootstrapDeath` requires `died && (nonZero || signalled)`, so the
    //     timed-out record came back `retryable: false`) — observed, reported;
    //   * the Q3/Q4 half is GREEN against the pre-ruling leg and is the
    //     falsifiable guard against WIDENING the predicate: `return
    //     !handshakeResolved`, "no termination ⇒ timeout", or any stderr/error
    //     substring predicate reddens it. Because the fix lands in the same
    //     pass, that half was established by MUTATION against a copy of the leg
    //     under `/tmp/` (never by breaking the tracked tree — the leg's own
    //     precondition would rebuild it, PRE-1), and is re-checked here on every
    //     run thereafter.
    // -----------------------------------------------------------------------
    // Q1 — the timeout class, driven through the leg's own `bootAttempt`
    // (the child never exits, the handshake never resolves, the leg's timer
    // fires).
    const q1 = bootAttemptHarness({ connect: () => new Promise<void>(() => {}), timers: 'fire' })
    const q1rec = await (q1.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/q1',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect([q1rec.code, q1rec.signal], 'Q1 / PRECEDENCE CLAUSE (a): … the child is ALIVE, so NO termination was observed').toEqual([null, null])
    expect(String(q1rec.error), 'Q1: … and the handshake did not complete within its bound').toMatch(/handshake did not complete within 30000 ms/)
    expect(
      q1rec.retryable,
      'Q1 / PRECEDENCE CLAUSE (a): the TIMEOUT signature (absence of an observed termination + handshake-not-completed) is RETRYABLE',
    ).toBe(true)

    // Q2 — the observed-death class, the SAME decision point, the other
    // signature.
    const q2 = bootAttemptHarness({
      connect: ({ child, transport }) => {
        child.signalCode = 'SIGTRAP'
        child.emit('exit', null, 'SIGTRAP')
        transport.onerror?.(new Error('child exited (code null, signal SIGTRAP)'))
        return new Promise<void>(() => {})
      },
    })
    const q2rec = await (q2.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/q2',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(
      q2rec.retryable,
      'Q2 / RT-1(i)∧(ii): the OBSERVED-DEATH signature ((code, signal) + an unresolved handshake) is RETRYABLE',
    ).toBe(true)
    // …and the two signatures stay DISTINGUISHABLE records (a timeout may never
    // be re-reported as a death, or vice versa: RT-5's verbatim rule).
    const q1sig = (q1.api.signatureOf as (r: Record<string, unknown>) => string)(q1rec)
    const q2sig = (q2.api.signatureOf as (r: Record<string, unknown>) => string)(q2rec)
    expect(q1sig, 'Q1/Q2: the timeout signature carries the absence of an observed termination').toContain('no observed child termination')
    expect(q2sig, 'Q1/Q2: the death signature carries the raw (code, signal) pair verbatim').toContain('child exited (code null, signal SIGTRAP)')
    expect(q1sig, 'Q1/Q2: the two signatures are DIFFERENT records of the same boundary').not.toBe(q2sig)

    // Q3/Q4 — the predicate itself, at the two facts it is allowed to read.
    const api = sandbox({ src: requireLegSource(), fns: ['isBootstrapDeath'], exports: ['isBootstrapDeath'] })
    const retryable = api.isBootstrapDeath as (rec: Record<string, unknown>, resolved: boolean) => boolean
    const completed: Array<{ label: string; rec: Record<string, unknown> }> = [
      {
        label: '(a) a signal death AFTER the handshake completed (RT-2 item 4 — "a child that dies after connect() resolved")',
        rec: { code: null, signal: 'SIGTRAP', error: 'child exited (code null, signal SIGTRAP)', stderrTail: '' },
      },
      {
        label: '(b) a non-zero exit AFTER the handshake completed',
        rec: { code: 1, signal: null, error: 'child exited (code 1, signal null)', stderrTail: '' },
      },
      {
        label: '(c) a tool error AFTER the handshake completed (RT-2 item 4 / RT-2b)',
        rec: { code: null, signal: null, error: 'MCP error -32603: unknown tool', stderrTail: '' },
      },
    ]
    for (const f of completed) {
      expect(
        retryable(f.rec, true),
        `Q3 / PRECEDENCE CLAUSE (d): ${f.label} — the handshake COMPLETED, so neither retryable signature can hold`,
      ).toBe(false)
    }
    const generic: Array<{ label: string; rec: Record<string, unknown> }> = [
      {
        label: '(a) a stderr substring match with NO observed termination — baited with the exact measured word',
        rec: { code: null, signal: null, error: 'transport is closed', stderrTail: 'FATAL:SIGTRAP during browser init' },
      },
      {
        label: '(b) "the boot threw" — a leg-side exception with no observed termination and no timeout fact',
        rec: { code: null, signal: null, error: 'TypeError: the boot threw', stderrTail: '' },
      },
      {
        label: '(c) "the run ended non-zero" — a clean-ish exit code is not a crash signature',
        rec: { code: 0, signal: null, error: 'child exited (code 0, signal null)', stderrTail: '' },
      },
      {
        label:
          '(d) THE WIDENING GUARD — no observed termination, an unresolved handshake, and a transport error that is NOT the handshake-not-completed fact: "no termination" alone is NOT the timeout signature',
        rec: { code: null, signal: null, error: 'transport is closed', stderrTail: '' },
      },
    ]
    for (const f of generic) {
      expect(
        retryable(f.rec, false),
        `Q4 / PRECEDENCE CLAUSE (c) + RT-1: ${f.label} must NOT be retryable — "a generic 'anything failed' predicate remains FORBIDDEN"`,
      ).toBe(false)
    }
    // The structural half of the anti-blanket rule is asserted once, in RT-1b
    // (the predicate's body may not become `return !handshakeResolved` and may
    // not consult the stderr tail / outcome); this row adds the BEHAVIOURAL
    // half — every widening above is falsified by the two loops, not by
    // reading the source.
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-2 — the NON-retryable classes: they do not retry and spend no
  // second attempt. States enumerated:
  //   C1  a COMPLETED boot whose measurement/row is wrong (post-handshake)
  //   C2  a genuine divergence-precondition red — INCLUDING the divergence
  //       leg's own bootstrap signature (`R13 RESULT: 1 checks, 2 failures`)
  //   C3  a DISPLAY absence
  //   C4  a failure AFTER the handshake completed
  //   C5  a programming error in the leg (and a malformed retry configuration)
  //   C6  a row assertion failure
  // REACHABILITY, stated honestly (RT-2's own classes 2/4/6 cannot be produced
  //   from `[T]`): class 2 needs a divergence leg that fails on a real host and
  //   class 4/6 need a real boot that completes and then fails, so those halves
  //   are asserted STRUCTURALLY — which code path decides, and that the retry
  //   functions cannot reach it — and were falsified out of tree against a
  //   `/tmp/` copy whose divergence stub printed the off-green signature.
  // -------------------------------------------------------------------------
  it('RT-2a (§3.7 RT-2 items 1/4/6) — a boot whose failure came AFTER the handshake (row/measurement/assertion) is NOT retried and spends no second attempt', async () => {
    const loop = retryLoopHarness({
      responses: [
        { outcome: 'row-failed', retryable: false, code: null, signal: null, error: 'R2 width > 0 && height > 0 failed (width=0)' },
        green(),
      ],
    })
    const bootUnder = loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    let threw: Error | null = null
    try {
      await bootUnder('A', 'ui-leg-a', { attempts: 4, timeoutMs: 30000 })
    } catch (e) {
      threw = e as Error
    }
    expect(threw, '§3.7 RT-2: a non-retryable class must FAIL the boot — it is never a reason to try again').not.toBeNull()
    expect(threw?.message, '§3.7 RT-2: the class is reported as itself, naming the clause').toMatch(/RT-2/)
    expect(threw?.message, '§3.7 RT-5: the failure carries the recorded signature verbatim').toContain('R2 width > 0 && height > 0 failed')
    expect(loop.calls.length, '§3.7 RT-2: "no attempt is consumed by it" — a non-retryable failure spends no second attempt').toBe(1)
    expect(loop.delays, '§3.7 RT-4 item 1: no backoff is paid for a non-retryable failure').toEqual([])
  })

  it('RT-2c (§3.7 RT-2 item 2 / RT-8 items 1-2) — a divergence red is never a retry case, including the `1 checks, 2 failures` bootstrap signature', () => {
    const src = requireLegSource()
    const stripped = stripComments(src)
    const invocations = [...stripped.matchAll(/runDivergence\s*\(/g)]
    expect(
      invocations.length,
      '§3.7 RT-8 item 1: the divergence leg is invoked EXACTLY ONCE in the whole leg (its declaration + one call site) — a retry of the precondition leg would add a second',
    ).toBe(2)
    for (const name of ['bootUnder', 'bootAttempt']) {
      const body = stripComments(requireFn(src, name))
      expect(
        body,
        `§3.7 RT-2 item 2 / RT-8 item 1: \`${name}\` must not re-enter the precondition — no runDivergence / divergenceLeg / R13 reference may live inside the retry boundary`,
      ).not.toMatch(/runDivergence|divergenceLeg|R13/)
    }
    expect(
      stripped,
      '§3.7 RT-2 item 2 / §5.4: the off-green divergence signature (`checks = 1`, `failures = 2`) is recognised explicitly and handled as a PRECONDITION failure',
    ).toMatch(/R13 RESULT:\\s\*1\\s\*checks,\\s\*2\\s\*failures/)
  })

  it('RT-2d (§3.7 RT-2 item 3) — the DISPLAY prerequisite is decided BEFORE any boot and is never a retry case', () => {
    const src = requireLegSource()
    const stripped = stripComments(src)
    const displayAt = stripped.search(/process\.env\.DISPLAY/)
    const exitThreeAt = stripped.indexOf('process.exit(3)')
    // the CALL site, not the `async function bootUnder(...)` declaration
    const firstBootAt = stripped.indexOf('await bootUnder(')
    expect(displayAt, '§3.7 RT-2 item 3 / §6 DIS-2: the prerequisite is a real branch').toBeGreaterThanOrEqual(0)
    expect(exitThreeAt, '§6 DIS-2/§3.6: no display ⇒ exit 3').toBeGreaterThan(displayAt)
    expect(
      firstBootAt,
      '§3.7 RT-2 item 3: "the prerequisite is evaluated before the retry loop begins and is never a retry case" — the refusal precedes the first boot',
    ).toBeGreaterThan(exitThreeAt)
    for (const name of ['bootUnder', 'bootAttempt']) {
      expect(
        stripComments(requireFn(src, name)),
        `§3.7 RT-2 item 3: \`${name}\` must not evaluate the DISPLAY prerequisite — it sits OUTSIDE the retry boundary`,
      ).not.toMatch(/DISPLAY/)
    }
    expect(stripped, '§6 DIS-2: the refusal names the fix (an xvfb wrapper the operator supplies)').toMatch(/xvfb/)
  })

  it('RT-2e (§3.7 RT-4 item 4 / RT-2 class 5) — a malformed retry configuration is a PROGRAMMING ERROR: exit 1, no boot, never a silent clamp', () => {
    // Behavioural, on the real leg: the configuration is read BEFORE the
    // precondition and before any boot, so this run spawns no Electron at all.
    const bad = ['9', 'abc', '0', '2.5', '-1', ' 4']
    for (const value of bad) {
      const r = spawnSync(process.execPath, [LEG_PATH], {
        cwd: ROOT,
        env: { ...process.env, PROVIDENT_UI_BOOT_ATTEMPTS: value },
        encoding: 'utf8',
        timeout: 15000,
      })
      const text = `${r.stdout ?? ''}\n${r.stderr ?? ''}`
      expect(r.status, `§3.7 RT-4 item 4: PROVIDENT_UI_BOOT_ATTEMPTS="${value}" is malformed ⇒ exit 1 (never a clamp, never a green)`).toBe(1)
      expect(text, `§3.7 RT-4 item 4/RT-2 class 5: the malformed value is reported as a programming error ("${value}")`).toMatch(
        /malformed|out of the admissible range/,
      )
      expect(text, '§3.7 RT-2 class 5: a malformed configuration must not reach the boot/retry path').not.toMatch(/attempt \d\/\d|RT-7 EXHAUSTED|PRECONDITION/)
      expect(text, '§3.6: no failure may be converted into a skip or a green').not.toMatch(/UI RESULT:/)
    }
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-3 — the bound, the per-attempt profile, the teardown and the
  // budget's scope. States:
  //   S1  four failing attempts (the maximum) — attempt numbers 1..4
  //   S2  a lowered bound (operator) — fewer attempts
  //   S3  a retried attempt after 1-2 failures
  //   S4  boot A and boot B in sequence, each with its own budget
  // Fail-state: > 4 attempts for one boot, a reused profile/store, an attempt
  //   spent before the previous one is torn down, a retry that re-runs the
  //   precondition ⇒ a RT-3 violation; a run that breached the bound is not
  //   evidence.
  // -------------------------------------------------------------------------
  it('RT-3a (§3.7 RT-3) — the attempt bound is 4 per boot, pinned as a single named constant, and the loop is retry-AFTER-failure', async () => {
    const api = sandbox({
      src: requireLegSource(),
      decls: ['UI_BOOT_ATTEMPTS_DEFAULT', 'UI_BOOT_ATTEMPTS_MAX'],
      exports: ['UI_BOOT_ATTEMPTS_DEFAULT', 'UI_BOOT_ATTEMPTS_MAX'],
    })
    expect(api.UI_BOOT_ATTEMPTS_MAX, '§3.7 RT-3: "the leg\'s source pins the bound as a single named constant with the value 4"').toBe(4)
    expect(api.UI_BOOT_ATTEMPTS_DEFAULT, '§3.7 RT-4 item 2: the default attempt count is 4').toBe(4)

    const loop = retryLoopHarness({ responses: [death(), death(), death(), death(), death(), death()] })
    const bootUnder = loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    const res = await bootUnder('A', 'ui-leg-a', { attempts: 4, timeoutMs: 30000 })
    expect(loop.calls.length, '§3.7 RT-3: a maximum of 4 attempts to complete ONE boot\'s handshake (1 initial + up to 3 retries)').toBe(4)
    expect(loop.calls.map((c) => c.attempt), '§3.7 RT-3: the attempt numbers are 1..4').toEqual([1, 2, 3, 4])
    expect(res.ok, '§3.7 RT-7: with the budget spent and no acceptance, the boot is NOT ok').toBe(false)
    expect((res.records as Array<Record<string, unknown>>).map((r) => r.attempt), '§3.7 RT-7(ii): attempt 1 first, in attempt order').toEqual([
      1, 2, 3, 4,
    ])

    const body = stripComments(requireFn(requireLegSource(), 'bootUnder'))
    expect(body, '§3.7 RT-3: the loop is bounded by the configured attempt count').toMatch(/attempt\s*<=\s*cfg\.attempts/)
    expect(
      body,
      '§3.7 RT-3: "no speculative or parallel attempts" — one attempt is awaited at a time',
    ).not.toMatch(/Promise\.all|allSettled/)
  })

  it('RT-3b (§3.7 RT-3 / §0 prohibition 4) — EACH ATTEMPT gets a FRESH scratch profile; no retried attempt ever reuses a failed attempt\'s profile', async () => {
    const loop = retryLoopHarness({ responses: [death(), death(), green()] })
    const bootUnder = loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    const res = await bootUnder('A', 'ui-leg-a', { attempts: 4, timeoutMs: 30000 })
    expect(res.ok, '§3.7 RT-6a: the third attempt is accepted').toBe(true)
    expect(loop.profiles.length, '§3.7 RT-3: one profile per ATTEMPT (the per-boot creator becomes per-attempt)').toBe(3)
    expect(new Set(loop.profiles).size, '§3.7 RT-3: a retried boot MUST NOT REUSE a profile a failed attempt partially wrote').toBe(3)
    expect(
      loop.calls.map((c) => c.profile),
      '§3.7 RT-3: each attempt is booted under ITS OWN profile (the profile the scratch creator returned for that attempt)',
    ).toEqual([`/tmp/provident-ui-A-1`, `/tmp/provident-ui-A-r2-2`, `/tmp/provident-ui-A-r3-3`])
    const accepted = loop.calls[loop.calls.length - 1]
    expect(res.profile, '§3.7 RT-3/RT-5: the accepted attempt\'s own profile is the one the leg reports').toBe(accepted.profile)
    expect(
      loop.profiles.slice(0, 2).includes(res.profile as string),
      '§3.7 RT-3: the accepted profile is NOT one of the failed attempts\' profiles',
    ).toBe(false)

    // and the creator behind it is the helper's FRESH-scratch creator (mkdtemp
    // per call), not a reused directory
    expect(
      stripComments(requireFn(requireLegSource(), 'scratchProfile')),
      '§3.7 RT-3 / §2.1 item 2: the per-attempt profile comes from the helper\'s fresh-scratch creator',
    ).toMatch(/makeFreshProfile\s*\(/)
  })

  it('RT-3c (§3.7 RT-3) — the failed attempt\'s child is terminated and its transport closed BEFORE the attempt returns (never two Electron processes for one boot)', async () => {
    const h = bootAttemptHarness({
      connect: ({ child, transport }) => {
        child.signalCode = 'SIGTRAP'
        child.emit('exit', null, 'SIGTRAP')
        transport.onerror?.(new Error('child exited (code null, signal SIGTRAP)'))
        return new Promise<void>(() => {})
      },
    })
    const rec = await (h.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p1',
      attempt: 2,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(rec.outcome).toBe('bootstrap-failed')
    h.ctx.order.push('bootAttempt.returned')
    expect(h.ctx.transport.closed, '§3.7 RT-3: the failed attempt\'s transport is closed').toBe(true)
    expect(h.ctx.child.killed, '§3.7 RT-3: the failed attempt\'s child is TERMINATED').toBe(true)
    expect(h.ctx.child.killedWith, '§3.7 RT-3: the child is killed, not left running next to the next attempt').toBe('SIGKILL')
    const order = h.ctx.order
    expect(order, '§3.7 RT-3: the teardown runs inside the attempt, before it returns to the loop').toContain('client.close')
    expect(order, '§3.7 RT-3: the teardown runs inside the attempt, before it returns to the loop').toContain('transport.close')
    expect(
      order.indexOf('client.close') < order.indexOf('bootAttempt.returned') &&
        order.indexOf('transport.close') < order.indexOf('bootAttempt.returned') &&
        order.indexOf('child.kill') < order.indexOf('bootAttempt.returned'),
      '§3.7 RT-3: an attempt is spent only AFTER the previous one is torn down — two Electron processes for one boot may never run at once',
    ).toBe(true)
    expect(
      stripComments(requireFn(requireLegSource(), 'bootUnder')),
      '§3.7 RT-3: the teardown is awaited before the loop can spend another attempt',
    ).toMatch(/await\s+bootAttempt\(/)
  })

  it('RT-3d (§3.7 RT-3) — the budget is PER BOOT: boot A and boot B each carry their own 4 attempts', async () => {
    const loop = retryLoopHarness({ responses: Array.from({ length: 8 }, () => death()) })
    const bootUnder = loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    const a = await bootUnder('A', 'ui-leg-a', { attempts: 4, timeoutMs: 30000 })
    const b = await bootUnder('B', 'ui-leg-b', { attempts: 4, timeoutMs: 30000 })
    expect((a.records as Array<Record<string, unknown>>).map((r) => r.attempt), '§3.7 RT-3: boot A spends its own budget').toEqual([1, 2, 3, 4])
    expect(
      (b.records as Array<Record<string, unknown>>).map((r) => r.attempt),
      '§3.7 RT-3: boot B\'s budget is its OWN — a failed attempt on one boot never consumes the other\'s, and the numbering is the boot\'s own',
    ).toEqual([1, 2, 3, 4])
    expect((b.records as Array<Record<string, unknown>>).every((r) => r.boot === 'B'), '§3.7 RT-5: each record names the boot it belongs to').toBe(true)
    expect(loop.calls.length, '§3.7 RT-3: 4 + 4 attempts across the two boots').toBe(8)
    expect(loop.profiles.length, '§3.7 RT-3: one fresh profile per attempt on EACH boot').toBe(8)
    expect(new Set(loop.profiles).size, '§3.7 RT-3: no profile is shared between attempts or between boots').toBe(8)
  })

  it('RT-3e (§3.7 RT-3 / RT-8 item 4) — the precondition and the DISPLAY prerequisite sit OUTSIDE the retry boundary: an attempt re-enters neither', () => {
    const src = requireLegSource()
    const stripped = stripComments(src)
    for (const name of ['bootUnder', 'bootAttempt']) {
      const body = stripComments(requireFn(src, name))
      expect(
        body,
        `§3.7 RT-3/RT-8 item 4: \`${name}\` consumes no digest check and re-checks nothing — the PRE-2 digest pair is taken around the precondition, never inside the retry`,
      ).not.toMatch(/beforeDigest|after\b.*digest|digestUnchanged|artifactPaths|pinAgrees/)
      expect(body, `§3.7 RT-3: \`${name}\` re-enters no precondition (no runDivergence/divergenceLeg)`).not.toMatch(/runDivergence|divergenceLeg/)
    }
    const firstBootAt = stripped.indexOf('await bootUnder(')
    expect(stripped.indexOf('process.exit(2)'), '§3.7 RT-8 item 2: the precondition\'s own exit code is decided before any boot').toBeLessThan(firstBootAt)
    expect(stripped.indexOf('process.exit(3)'), '§3.7 RT-2 item 3: the DISPLAY refusal is decided before any boot').toBeLessThan(firstBootAt)
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-4 — backoff, the operator-configurable count, the per-attempt
  // timeout and the wall-clock ceiling. States:
  //   S1  the fixed table: 250 (k=2), 500 (k=3), 1000 (k=4), no jitter
  //   S2  the default attempt count (4) and each admissible value (1..4)
  //   S3  the default per-attempt timeout (30 000 ms) and its override
  //   F1  a malformed count/timeout ⇒ a programming error, exit 1, no clamp
  //   F2  an attempt that never completes the handshake ⇒ a failed bootstrap
  //       attempt that CONSUMES an attempt
  //   F3  the wall-clock ceiling exceeded mid-retry ⇒ exhaustion
  // -------------------------------------------------------------------------
  it('RT-4a (§3.7 RT-4 item 1) — the backoff is the FIXED table 250/500/1000 ms, deterministic, recorded with its attempt number', async () => {
    const table = sandbox({
      src: requireLegSource(),
      decls: ['UI_BOOT_BACKOFF_MS'],
      exports: ['UI_BOOT_BACKOFF_MS'],
    })
    expect(
      table.UI_BOOT_BACKOFF_MS,
      '§3.7 RT-4 item 1: "the sequence IS the contract (a fixed table, not an exponential expression)"',
    ).toEqual([250, 500, 1000])

    const loop = retryLoopHarness({ responses: [death(), death(), death(), death()] })
    const bootUnder = loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    await bootUnder('A', 'ui-leg-a', { attempts: 4, timeoutMs: 30000 })
    expect(loop.delays, '§3.7 RT-4 item 1: before retry attempt k the leg waits 250/500/1000 ms').toEqual([250, 500, 1000])
    const text = loop.out.concat(loop.err).join('\n')
    expect(text, '§3.7 RT-4 item 1: each wait is recorded in the leg\'s output with its attempt number').toMatch(
      /RT-4 backoff before attempt 2: 250 ms/,
    )
    expect(text).toMatch(/RT-4 backoff before attempt 3: 500 ms/)
    expect(text).toMatch(/RT-4 backoff before attempt 4: 1000 ms/)

    const loop2 = retryLoopHarness({ responses: [death(), death(), death(), death()] })
    await (loop2.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)('A', 'ui-leg-a', {
      attempts: 4,
      timeoutMs: 30000,
    })
    expect(loop2.delays, '§3.7 RT-4 item 1: "no randomness and no jitter" — an identical state produces an identical wait sequence').toEqual(
      loop.delays,
    )

    const lowered = retryLoopHarness({ responses: [death(), death()] })
    await (lowered.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)('A', 'ui-leg-a', {
      attempts: 2,
      timeoutMs: 30000,
    })
    expect(lowered.delays, '§3.7 RT-4 item 1: a lowered count spends fewer waits — the table is indexed by the attempt').toEqual([250])

    const body = stripComments(requireFn(requireLegSource(), 'bootUnder'))
    expect(
      body,
      '§3.7 RT-4 item 1: the wait comes from the fixed table — no randomness and no exponential expression in the retry region (the "no jitter" half is the identical-sequences assertion above)',
    ).not.toMatch(/Math\.random|Math\.pow|\*\*/)
  })

  it('RT-4b (§3.7 RT-4 item 2) — the attempt count: default 4, admissible range 1–4, the operator may LOWER it and may never RAISE it', () => {
    const cfg = (env: Record<string, string | undefined>): (() => { attempts: number; timeoutMs: number }) =>
      sandbox({
        src: requireLegSource(),
        decls: ['UI_BOOT_ATTEMPTS_DEFAULT', 'UI_BOOT_ATTEMPTS_MAX', 'UI_BOOT_TIMEOUT_MS_DEFAULT'],
        fns: ['readRetryConfig'],
        globals: { process: { env } },
        exports: ['readRetryConfig'],
      }).readRetryConfig as () => { attempts: number; timeoutMs: number }

    expect(cfg({})().attempts, '§3.7 RT-4 item 2: the default is 4').toBe(4)
    for (const value of ['1', '2', '3', '4']) {
      expect(cfg({ PROVIDENT_UI_BOOT_ATTEMPTS: value })().attempts, `§3.7 RT-4 item 2: ${value} is inside the admissible range 1..4`).toBe(
        Number(value),
      )
    }
    for (const value of ['5', '9', '0', '-1', '2.5', 'abc', ' 4', 'four']) {
      expect(
        () => cfg({ PROVIDENT_UI_BOOT_ATTEMPTS: value })(),
        `§3.7 RT-4 item 2/4: PROVIDENT_UI_BOOT_ATTEMPTS="${value}" is malformed or above the pinned maximum — a PROGRAMMING ERROR, never a silent clamp`,
      ).toThrow()
    }
    expect(
      () => cfg({ PROVIDENT_UI_BOOT_ATTEMPTS: '5' })(),
      '§3.7 RT-4 item 2: the operator may LOWER the attempt count, never RAISE it',
    ).toThrow(/1\.\.4|never RAISE/i)
    // SPEC-SILENT CASE, recorded rather than improvised: an EMPTY env value is
    // read as "unset" by the landed idiom (`!== undefined && !== ''`), which
    // §3.7 RT-4 item 4's malformed list does not cover (it names "non-integer,
    // < 1, > 4 attempts; a non-numeric timeout"). Asserted as the landed reading.
    expect(cfg({ PROVIDENT_UI_BOOT_ATTEMPTS: '' })().attempts, 'RT-4 item 2 (spec-silent): an empty value ⇒ unset ⇒ the default 4').toBe(4)
  })

  it('RT-4c (§3.7 RT-4 item 3) — per-attempt handshake timeout 30 000 ms by default, overridable, and a timed-out attempt is a FAILED BOOTSTRAP ATTEMPT that consumes an attempt', async () => {
    const cfg = (env: Record<string, string | undefined>): (() => { attempts: number; timeoutMs: number }) =>
      sandbox({
        src: requireLegSource(),
        decls: ['UI_BOOT_ATTEMPTS_DEFAULT', 'UI_BOOT_ATTEMPTS_MAX', 'UI_BOOT_TIMEOUT_MS_DEFAULT'],
        fns: ['readRetryConfig'],
        globals: { process: { env } },
        exports: ['readRetryConfig'],
      }).readRetryConfig as () => { attempts: number; timeoutMs: number }
    expect(cfg({})().timeoutMs, '§3.7 RT-4 item 3: the per-attempt handshake timeout defaults to 30 000 ms (the host\'s own readiness bound)').toBe(30000)
    expect(cfg({ PROVIDENT_UI_BOOT_TIMEOUT_MS: '5' })().timeoutMs, '§3.7 RT-4 item 3: the timeout is overridable for a deterministic red row').toBe(5)
    for (const value of ['0', '-1', 'abc', '1.5', 'ten']) {
      expect(
        () => cfg({ PROVIDENT_UI_BOOT_TIMEOUT_MS: value })(),
        `§3.7 RT-4 item 3/4: PROVIDENT_UI_BOOT_TIMEOUT_MS="${value}" is malformed ⇒ a programming error`,
      ).toThrow()
    }
    expect(cfg({ PROVIDENT_UI_BOOT_TIMEOUT_MS: '' })().timeoutMs, 'RT-4 item 3 (spec-silent): an empty value ⇒ unset ⇒ 30 000 ms').toBe(30000)

    // Behavioural (the leg's own `bootAttempt`): a handshake that never
    // resolves inside the bound produces a failed-bootstrap record naming the
    // bound, the attempt is torn down, and the attempt is spent — spent AND
    // retried, per the PRECEDENCE CLAUSE asserted at the end of this row.
    const h = bootAttemptHarness({ connect: () => new Promise<void>(() => {}), timers: 'fire' })
    const rec = await (h.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p1',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(rec.outcome, '§3.7 RT-4 item 3: an attempt that has not completed the handshake within the bound is a FAILED BOOTSTRAP ATTEMPT').toBe(
      'bootstrap-failed',
    )
    expect(rec.error, '§3.7 RT-4 item 3: the timeout message names the pinned bound').toMatch(/handshake did not complete within 30000 ms/)
    expect(h.ctx.delays[0], '§3.7 RT-4 item 3: the per-attempt timeout is what bounds the attempt').toBe(30000)
    expect(h.ctx.delays[1], '§3.7 RT-1(i): the termination-observation grace window is CAPPED by the per-attempt bound (min(2 000, cap))').toBe(
      2000,
    )
    expect(h.ctx.child.killed, '§3.7 RT-3: the timed-out attempt\'s child is torn down').toBe(true)
    // §3.7 PRECEDENCE CLAUSE (ARCHITECT-RULED 2026-09-27, third pass, FIX 3 —
    // a NEW clause added BESIDE RT-1, directly under the RT-1/RT-2 table):
    // "RT-4 item 3 governs for the timeout class, and RT-1's conjunction is NOT
    // the whole eligibility predicate". A hung-but-ALIVE child (the leg's own
    // per-attempt timer ended the attempt; NO termination was observed) is a
    // FAILED BOOTSTRAP ATTEMPT that consumes its attempt AND IS RETRIED, and it
    // is recorded with its OWN signature — the absence of an observed child
    // termination PLUS the handshake-not-completed fact, verbatim.
    // The superseded reading this row used to encode ("with the child still
    // alive there is no death signature, so the attempt is spent and not
    // retried — RT-1 is the stricter clause") is struck at its own site in the
    // spec (RT-1 carries a dated `SUPERSEDED IN PART` marker; AMENDMENT BLOCK 3
    // `B3-3` + the third amendment block's last row). This row must NOT be
    // re-pointed back to it: the clause is a biconditional, so a retryable
    // class that is not retried is a finding too.
    expect(
      rec.retryable,
      '§3.7 PRECEDENCE CLAUSE (a): a TIMEOUT-class bootstrap failure IS RETRYABLE — the absence of an observed termination plus the handshake-not-completed fact is the SECOND admissible signature (RT-4 item 3 governs for the timeout class; RT-1\'s conjunction is only the observed-death half, and RT-2\'s classes are unaffected)',
    ).toBe(true)
    // …and the DISTINGUISHING half: a timeout must keep its own recorded
    // signature, so it can never be silently re-classified as a child death
    // (the two retryable signatures are not interchangeable evidence).
    const signatureOf = h.api.signatureOf as (r: Record<string, unknown>) => string
    const timeoutSignature = signatureOf(rec)
    expect(
      timeoutSignature,
      '§3.7 PRECEDENCE CLAUSE (a) / RT-5: the timeout\'s signature is the absence of an observed termination + the handshake-not-completed fact, recorded VERBATIM',
    ).toContain('no observed child termination')
    expect(
      timeoutSignature,
      '§3.7 PRECEDENCE CLAUSE (a) / RT-4 item 3: the handshake-not-completed fact is named with its bound (the ruling\'s verbatim form)',
    ).toContain('handshake did not complete within 30000 ms (RT-4 item 3)')
    expect(
      timeoutSignature,
      '§3.7 PRECEDENCE CLAUSE (a): a timeout must NOT be recorded as a child death — `child exited (code …, signal …)` is the OTHER signature, and collapsing the two hides which failure actually occurred (RT-5: "no attempt\'s signature may be summarised away")',
    ).not.toMatch(/child exited/)
    expect(
      [rec.code, rec.signal],
      '§3.7 PRECEDENCE CLAUSE (a): the timeout signature rests on NO observed termination — the raw (code, signal) pair is null, which is what makes it distinguishable from RT-1\'s death pair',
    ).toEqual([null, null])

    const h2 = bootAttemptHarness({ connect: () => new Promise<void>(() => {}), timeoutMs: 500, timers: 'fire' })
    await (h2.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p1',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 500,
    })
    expect(h2.ctx.delays, '§3.7 RT-4 item 3: an attempt never consumes more than its own bound (the grace window is min(2000, cap))').toEqual([
      500, 500,
    ])
  })

  it('RT-4d (§3.7 RT-4 item 4) — the per-boot wall-clock ceiling is DERIVED from the pinned budget, and exceeding it mid-retry is EXHAUSTION', async () => {
    const api = sandbox({
      src: requireLegSource(),
      decls: ['UI_BOOT_ATTEMPTS_MAX', 'UI_BOOT_TIMEOUT_MS_DEFAULT', 'UI_BOOT_BACKOFF_MS', 'UI_BOOT_CEILING_MS'],
      exports: ['UI_BOOT_CEILING_MS', 'UI_BOOT_ATTEMPTS_MAX', 'UI_BOOT_TIMEOUT_MS_DEFAULT', 'UI_BOOT_BACKOFF_MS'],
    })
    const derived = 4 * 30000 + 250 + 500 + 1000
    const ceiling = api.UI_BOOT_CEILING_MS as number
    expect(
      ceiling,
      `§3.7 RT-4 item 4: the ceiling is DERIVED (4 attempts × 30 000 ms + the 1 750 ms backoff table = ${derived}), not a free literal — §3.7's own parenthetical arithmetic`,
    ).toBe(derived)
    expect(
      ceiling,
      '§3.7 RT-4 item 4: "a ceiling that admits more than 4 attempts" is a violation — the ceiling must not fit a 5th 30 000 ms attempt',
    ).toBeLessThan(5 * (api.UI_BOOT_TIMEOUT_MS_DEFAULT as number))
    // SPEC-NUMBER DISCREPANCY, reported not smoothed: §3.7 RT-4 item 4 LABELS
    // the ceiling "122 000 ms" while its own derivation beside it is 121 750 ms.
    // This row pins the derivation (the value that decides behaviour).
    expect(ceiling, '§3.7 RT-4 item 4: the derived ceiling is 121 750 ms — the label "122 000 ms" differs by 250 ms').toBe(121750)

    let clockCalls = 0
    const loop = retryLoopHarness({
      responses: [death(), death(), death(), death()],
      clock: () => {
        clockCalls += 1
        // call 1 = `startedAt`, call 2 = the first iteration's `waited` (0), and
        // everything after that is a clock that has jumped past the ceiling.
        return clockCalls <= 2 ? 0 : 400000
      },
    })
    const res = await (loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)(
      'A',
      'ui-leg-a',
      { attempts: 4, timeoutMs: 30000 },
    )
    expect(loop.calls.length, '§3.7 RT-4 item 4: exceeding the ceiling mid-retry stops the loop instead of spending more attempts').toBe(1)
    expect(res.ok, '§3.7 RT-7: the ceiling\'s exhaustion is not a pass').toBe(false)
    const errText = loop.err.join('\n')
    expect(errText, '§3.7 RT-4 item 4: the leg names the ceiling that was hit, with the observed budget').toMatch(
      /RT-4 item 4: the per-boot wall-clock ceiling was EXCEEDED \(400000 ms > 121750 ms\)/,
    )
    expect(errText, '§3.7 RT-4 item 4 / RT-7: exceeding the ceiling is EXHAUSTION, and the leg says which clause it hit').toMatch(
      /EXHAUSTION \(RT-7\)/,
    )
  })
})

describe('§3.7 RT-2b + RT-5…RT-9 — recording, the labelled green, exhaustion, the precondition and leg-locality', () => {
  // -------------------------------------------------------------------------
  // §3.7 RT-2 item 4 — a failure AFTER the handshake completed. States:
  //   S1  a signal death after `connect()` resolved (the boot is ACCEPTED)
  //   S2  a non-zero code after `connect()` resolved
  //   S3  a leg-wide post-handshake failure (a tool error / security refusal /
  //       probe-handler exception) reaching the outer catch
  // Fail-state: any of these retried ⇒ a RT-2 item 4 review finding.
  // REACHABILITY: S3 needs a real renderer realm to raise a tool error, so its
  //   [T] half is structural — WHICH code path handles it (the outer catch,
  //   outside the retry boundary) — and it was falsified out of tree by adding
  //   an attempt loop inside that catch on a `/tmp/` copy.
  // -------------------------------------------------------------------------
  it('RT-2b (§3.7 RT-2 item 4) — a failure AFTER the handshake completed is not a bootstrap death and is never retried', () => {
    const src = requireLegSource()
    const api = sandbox({ src, fns: ['isBootstrapDeath'], exports: ['isBootstrapDeath'] })
    const retryable = api.isBootstrapDeath as (rec: Record<string, unknown>, resolved: boolean) => boolean
    const afterHandshake: Array<{ label: string; code: number | null; signal: string | null }> = [
      { label: 'S1 a signal death after connect() resolved', code: null, signal: 'SIGTRAP' },
      { label: 'S2 a non-zero code after connect() resolved', code: 1, signal: null },
    ]
    for (const s of afterHandshake) {
      expect(
        retryable({ code: s.code, signal: s.signal, error: 'MCP error -32603: unknown tool', stderrTail: '' }, true),
        `§3.7 RT-2 item 4: ${s.label} happened outside the boot window ⇒ NOT retryable, no attempt is spent`,
      ).toBe(false)
    }
    const stripped = stripComments(src)
    const catchBlock = stripped.slice(stripped.lastIndexOf('} catch (e) {'), stripped.length)
    expect(catchBlock, '§3.7 RT-2 item 4/§3.6: a post-handshake failure is reported as itself and exits 1').toMatch(/process\.exit\(1\)/)
    expect(
      catchBlock,
      '§3.7 RT-2 item 4: the leg-wide failure path does NOT re-enter the retry loop — "MCP error", an unknown-tool error or a security-group refusal is never a retry case',
    ).not.toMatch(/bootUnder\(|runProbe\(|runDivergence\(/)
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-5 — RECORDING. States:
  //   S1  a failed attempt's record (number, boot, profile, outcome, the raw
  //       (code, signal) pair, the transport error, the stderr tail)
  //   S2  the ACCEPTED attempt's record (number + profile — "every attempt,
  //       including the accepted one, appears in the output")
  //   S3  a transport error with no observed termination
  //   S4  four failed attempts in one boot (one signature line each, verbatim)
  //   S5  a long stderr stream (the TAIL is what is recorded)
  // Fail-state: a retry leaving no trace, or a count with no signatures ⇒ the
  //   review finding RK-14's mitigation exists to prevent.
  // -------------------------------------------------------------------------
  it('RT-5a (§3.7 RT-5) — each attempt is RECORDED with its number, boot, profile, outcome and the verbatim failure signature', () => {
    const cons = makeConsole()
    const api = sandbox({
      src: requireLegSource(),
      decls: ['attemptRecords'],
      fns: ['signatureOf', 'recordAttempt'],
      globals: { console: cons.stub },
      exports: ['signatureOf', 'recordAttempt', 'attemptRecords'],
    })
    const recordAttempt = api.recordAttempt as (r: Record<string, unknown>) => Record<string, unknown>
    recordAttempt({
      boot: 'A',
      attempt: 2,
      maxAttempts: 4,
      profile: '/tmp/provident-ui-A-r2',
      outcome: 'bootstrap-failed',
      code: null,
      signal: 'SIGTRAP',
      error: 'transport is closed',
      stderrTail: 'stub bootstrap death',
    })
    const failedLines = cons.out.join('\n')
    expect(failedLines, '§3.7 RT-5: the attempt number, as `attempt <k>/<max>`').toMatch(/attempt 2\/4/)
    expect(failedLines, '§3.7 RT-5: the boot the attempt belongs to (A or B)').toContain('boot A')
    expect(failedLines, '§3.7 RT-5: the attempt\'s scratch profile path').toContain('profile=/tmp/provident-ui-A-r2')
    expect(failedLines, '§3.7 RT-5: the attempt\'s outcome').toContain('outcome=bootstrap-failed')
    expect(failedLines, '§3.7 RT-5: the raw (code, signal) pair, VERBATIM').toContain('child exited (code null, signal SIGTRAP)')
    expect(failedLines, '§3.7 RT-5: the transport error as produced').toContain('transport is closed')
    expect(failedLines, '§3.7 RT-5: the tail of the failed attempt\'s child stderr').toContain('child stderr (tail): stub bootstrap death')

    // S2 — the accepted attempt is recorded too, with its number and profile.
    recordAttempt({ boot: 'B', attempt: 1, maxAttempts: 4, profile: '/tmp/provident-ui-B', outcome: 'accepted' })
    expect(
      cons.out.join('\n'),
      '§3.7 RT-5: "every attempt, including the accepted one, appears in the output with its number and profile"',
    ).toMatch(/attempt 1\/4 boot B outcome=accepted profile=\/tmp\/provident-ui-B/)

    // S3 — a transport error with no observed termination is recorded as EXACTLY
    // that (never dressed up as a child death).
    const signatureOf = api.signatureOf as (r: Record<string, unknown>) => string
    expect(signatureOf({ code: null, signal: null, error: 'transport is closed' })).toBe(
      'no observed child termination — transport error: transport is closed',
    )
    expect(signatureOf({ code: null, signal: null, error: '' })).toBe('(no observed child termination and no transport error)')

    // the record is a real object per attempt, not a count
    const records = api.attemptRecords as Array<Record<string, unknown>>
    expect(records.length, '§3.7 RT-5: the leg keeps one record object per attempt').toBe(2)
    expect(records[0], '§3.7 RT-5: the record carries the attempt\'s own fields').toMatchObject({
      attempt: 2,
      boot: 'A',
      profile: '/tmp/provident-ui-A-r2',
      outcome: 'bootstrap-failed',
      code: null,
      signal: 'SIGTRAP',
    })
  })

  it('RT-5b (§3.7 RT-5) — every FAILED attempt\'s signature appears verbatim in the leg\'s own output; a count with no signatures is not a record', async () => {
    const loop = retryLoopHarness({
      responses: [death(), death({ code: 1, signal: null }), death({ code: null, signal: 'SIGABRT' }), death({ code: 137, signal: null })],
    })
    const res = await (loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)(
      'A',
      'ui-leg-a',
      { attempts: 4, timeoutMs: 30000 },
    )
    const text = loop.out.concat(loop.err).join('\n')
    const signatures = [
      'child exited (code null, signal SIGTRAP)',
      'child exited (code 1, signal null)',
      'child exited (code null, signal SIGABRT)',
      'child exited (code 137, signal null)',
    ]
    for (const s of signatures) {
      expect(text, `§3.7 RT-5: the failed attempt whose raw pair was ${s} must print it VERBATIM`).toContain(s)
    }
    const signatureLines = text.split('\n').filter((l) => l.includes('signature: ')).length
    expect(signatureLines, '§3.7 RT-5: one signature line per FAILED attempt (4 failures ⇒ 4 signatures — never one summary count)').toBe(4)
    const attemptLines = text.split('\n').filter((l) => /attempt \d\/4 boot A/.test(l)).length
    expect(attemptLines, '§3.7 RT-5: one record line per attempt').toBe(4)
    expect((res.records as Array<Record<string, unknown>>).length, '§3.7 RT-7(ii): the exhausted boot hands back every attempt\'s record').toBe(4)
  })

  it('RT-5c (§3.7 RT-5) — the child\'s stderr TAIL is buffered per attempt, printed with its signature, and it is the TAIL', async () => {
    const h = bootAttemptHarness({
      connect: ({ child, transport }) => {
        for (let i = 1; i <= 15; i += 1) child.stderr.emit('data', `stderr line ${i}\n`)
        child.signalCode = 'SIGTRAP'
        child.emit('exit', null, 'SIGTRAP')
        transport.onerror?.(new Error('child exited (code null, signal SIGTRAP)'))
        return new Promise<void>(() => {})
      },
    })
    const rec = await (h.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p1',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    const tail = String(rec.stderrTail)
    expect(tail, '§3.7 RT-5: the tail of the attempt\'s child stderr is recorded').toContain('stderr line 15')
    expect(tail, '§3.7 RT-5: it is the TAIL — a head-of-stream buffer is not "the tail of that attempt\'s child stderr"').not.toContain(
      'stderr line 3',
    )
    const recordAttempt = h.api.recordAttempt as (r: Record<string, unknown>) => Record<string, unknown>
    recordAttempt(rec)
    expect(
      h.ctx.out.join('\n'),
      '§3.7 RT-5: the stderr tail is printed next to the failed attempt\'s signature',
    ).toContain('child stderr (tail): stderr line 5')
    expect(h.ctx.out.join('\n'), '§3.7 RT-5: the signature itself is printed too').toContain('child exited (code null, signal SIGTRAP)')
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-6 — the labelled retried green. States:
  //   S1  a boot accepted on attempt 2 (one bootstrap failure recorded)
  //   S2  a boot accepted on attempt 1 (still labelled attempt=1/retries=0)
  //   S3  a second measurement attempt (a retried/rejected attempt measuring)
  //   S4  the recorded-sim attempt (never a measurement)
  // Fail-state: an unlabelled retried green, a multiplied measurement, or a
  //   relaxed `R0`–`R4` condition ⇒ a review finding and the green is VOID.
  // -------------------------------------------------------------------------
  it('RT-6a (§3.7 RT-6(a)) — a green reached on attempt k > 1 is LABELLED `attempt=<k>` / `retries=<k-1>`, for BOTH boots', async () => {
    const loop = retryLoopHarness({ responses: [death(), green()] })
    const res = await (loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)(
      'A',
      'ui-leg-a',
      { attempts: 4, timeoutMs: 30000 },
    )
    expect(res.ok, '§3.7 RT-6(a): the second attempt is accepted — a green reached on a retry').toBe(true)
    expect(res.attempt, '§3.7 RT-6(a): k is the ACCEPTED attempt number').toBe(2)
    expect(res.retries, '§3.7 RT-6(a): retries = k − 1 (the label\'s second token)').toBe(1)

    const stripped = stripComments(requireLegSource())
    expect(stripped, '§3.7 RT-6(a): the label carries `attempt=<k>`').toMatch(/attempt=\$\{boot\.attempt\}/)
    expect(stripped, '§3.7 RT-6(a): the label carries `retries=<k-1>`').toMatch(/retries=\$\{boot\.retries\}/)
    expect(
      stripped,
      '§3.7 RT-6(a): "printed for BOTH boots when either retried" — the label loop covers A and B',
    ).toMatch(/for \(const \[label, boot\] of \[\['A', bootA\], \['B', bootB\]\]\)/)
    expect(
      stripped,
      '§3.7 RT-6(a): a NON-retried boot still carries the same shape (attempt=1, retries=0), so no green can read as unlabelled',
    ).toMatch(/attempt=1 of \$\{retryConfig\.attempts\} \(retries=0\)/)
    expect(
      stripped,
      '§3.7 RT-6(a): the retried-green label is its own named line (a later reader must be able to see the flake)',
    ).toMatch(/RT-6 RETRY GREEN \(boot \$\{label\}\)/)

    // … AND the label must be printed from a LIVE branch. A mutation that turns
    // the label's guard into a constant (`if (false) { … }`) leaves every string
    // above in the source while silencing the label in the run — so the branch
    // that prints a label must be conditioned ON the retry bookkeeping. This
    // half is what reddens on "the label has become dead code".
    const labelBlocks: Array<{ cond: string }> = []
    for (const m of stripped.matchAll(/if \(([^)]*)\)\s*\{/g)) {
      const open = (m.index as number) + m[0].length - 1
      const close = matchDelim(stripped, open, '{', '}')
      if (close === -1) continue
      const body = stripped.slice(open, close + 1)
      if (/attempt=\$\{|retries=\$\{|RT-6 RETRY GREEN|RT-6 labelled green/.test(body)) labelBlocks.push({ cond: m[1] })
    }
    expect(labelBlocks.length, '§3.7 RT-6(a): the retry label is printed from a conditional branch').toBeGreaterThan(0)
    for (const b of labelBlocks) {
      expect(
        b.cond,
        `§3.7 RT-6(a): a branch that prints the retry label must be conditioned ON the retry bookkeeping — a dead/constant condition silences the label while leaving its text in the source (condition: "${b.cond.trim()}")`,
      ).toMatch(/\.retries/)
    }
  })

  it('RT-6b (§3.7 RT-6(b)) — the retry buys a boot, NOT a relaxation: no row is skipped and there is one single green exit', () => {
    const stripped = stripComments(requireLegSource())
    const greenExits = [...stripped.matchAll(/process\.exit\(\s*0\s*\)/g)].length
    expect(
      greenExits,
      '§3.7 RT-6(b)/§3.6: exactly ONE exit-0 path — a retried green leaves through the same single green path as a clean one',
    ).toBe(1)

    const retriesLines = stripped.split('\n').filter((l) => /\.retries/.test(l))
    expect(retriesLines.length, '§3.7 RT-6(a): the bookkeeping is used by the label').toBeGreaterThan(0)
    for (const line of retriesLines) {
      expect(
        line,
        `§3.7 RT-6(b): \`.retries\` may only LABEL a green — it must not guard, skip or short-circuit a row, a measurement or an exit: ${line.trim()}`,
      ).not.toMatch(/row\(|process\.exit|runProbe\(|bootUnder\(|measurement/i)
    }
    // The sharper half: a conditional ON the retry bookkeeping may not contain a
    // row assertion. Wrapping a `row(...)` in `if (bootA.retries === 0) …` would
    // relax the contract for exactly the run the retry made possible, so this
    // block-body assertion reddens on it (a bare "no `row(` near `.retries`"
    // check would not).
    const guardBlocks: string[] = []
    for (const m of stripped.matchAll(/if \([^)]*\.retries[^)]*\)\s*\{/g)) {
      const open = (m.index as number) + m[0].length - 1
      const close = matchDelim(stripped, open, '{', '}')
      if (close !== -1) guardBlocks.push(stripped.slice(open, close + 1))
    }
    expect(guardBlocks.length, '§3.7 RT-6(a): the retry bookkeeping does drive a conditional (the label branch)').toBeGreaterThan(0)
    for (const block of guardBlocks) {
      expect(
        block,
        '§3.7 RT-6(b): a retry-conditional branch may print a label and nothing else — no `R0`–`R4` assertion may live inside it (the retry buys a boot, not a relaxation)',
      ).not.toMatch(/row\(/)
      expect(block, '§3.7 RT-6(a): … and it must actually print the label it exists for').toMatch(/console\.(log|error)\(/)
    }

    const bootBExhaustedAt = stripped.indexOf('attempts failed (${retryConfig.attempts - 1} retries) for boot B')
    const exitZeroAt = stripped.indexOf('process.exit(0)')
    const rowSites = [...stripped.matchAll(/\brow\(\s*["']/g)].map((m) => m.index as number)
    expect(rowSites.length, '§3.7 RT-6(b): the leg\'s row assertions are the ones the retried green must still satisfy').toBe(11)
    for (const at of rowSites) {
      expect(
        at,
        '§3.7 RT-6(b): every `R0`–`R4` assertion sits on the SINGLE post-boot path (after both boots are accepted, before the one exit 0) — a retry adds an attempt, never a bypass',
      ).toBeGreaterThan(bootBExhaustedAt)
      expect(at, '§3.7 RT-6(b): … and before the single green exit').toBeLessThan(exitZeroAt)
    }
  })

  it('RT-6c (§3.7 RT-6(c) / §1 item 3) — retries may not MULTIPLY measurements; a rejected attempt\'s measurement is neither counted nor retained', async () => {
    const calls: string[] = []
    const api = sandbox({
      src: requireLegSource(),
      decls: ['measurementCount'],
      fns: ['runProbe', 'dispatchProbe', 'readMarker'],
      // `Client` it rides is stubbed — exactly as the landed channel does.

      prelude: `function probeEnvelope() { return {} }
function getCount() { return measurementCount }`,
      globals: {
        call: async (_client: unknown, name: string) => {
          calls.push(name)
          return { census: {}, results: [], renderedHtml: 'PROBE[measure=48x24;fontSize=16px]PROBE' }
        },
      },
      exports: ['runProbe', 'dispatchProbe', 'getCount'],
    })
    const dispatchProbe = api.dispatchProbe as (c: unknown) => Promise<unknown>
    const runProbe = api.runProbe as (c: unknown) => Promise<unknown>
    const getCount = api.getCount as () => number

    // S4 — the recorded SHIM attempt (and boot B) ride the UNTALLIED channel.
    await dispatchProbe({})
    await dispatchProbe({})
    expect(
      getCount(),
      '§3.7 RT-6(c): only the ONE measurement site tallies — the shim/boot-B probe is a status record, never a measurement',
    ).toBe(0)

    await runProbe({})
    expect(getCount(), '§3.7 RT-6(c): the accepted boot A takes exactly one measurement').toBe(1)

    // S3 — a measurement produced by a rejected attempt (or any second site)
    // must fail LOUDLY rather than be counted silently.
    let threw: Error | null = null
    try {
      await runProbe({})
    } catch (e) {
      threw = e as Error
    }
    expect(threw, '§3.7 RT-6(c): a second measurement must THROW — the rule is exact, not best-effort').not.toBeNull()
    expect(threw?.message, '§3.7 RT-6(c): the failure names the clause it breaks').toMatch(/RT-6\(c\)/)
    expect(threw?.message, '§3.7 RT-6(c): … and the one-measurement rule it protects').toMatch(/ONE-measurement rule/)
    expect(
      getCount(),
      '§3.7 RT-6(c): the tally is REAL, so the `measurementCount === 1` row reddens on a multiplied measurement instead of hiding it',
    ).toBe(2)

    const stripped = stripComments(requireLegSource())
    expect(
      [...stripped.matchAll(/runProbe\s*\(/g)].length,
      '§3.7 RT-6(c): exactly ONE measurement call site in the leg (its declaration + one invocation) — a retry that measured would add another',
    ).toBe(2)
    expect(
      stripped,
      '§3.7 RT-6(c): the recorded shim attempt uses the untallied `dispatchProbe`, never the measurement site',
    ).toMatch(/dispatchProbe\(shimClient\)/)
    const bootBExhaustedAt = stripped.indexOf('attempts failed (${retryConfig.attempts - 1} retries) for boot B')
    expect(
      stripped.indexOf('runProbe(bootA.client)'),
      '§3.7 RT-6(c): the ONE measurement is taken AFTER both boots are accepted, so no rejected attempt can ever measure (and nothing from one can be retained)',
    ).toBeGreaterThan(bootBExhaustedAt)

    // S3 (retention) — a REJECTED attempt's record carries no client and no
    // probe output: there is nothing to retain as evidence.
    const h = bootAttemptHarness({
      connect: ({ child, transport }) => {
        child.signalCode = 'SIGTRAP'
        child.emit('exit', null, 'SIGTRAP')
        transport.onerror?.(new Error('child exited (code null, signal SIGTRAP)'))
        return new Promise<void>(() => {})
      },
    })
    const rec = await (h.api.bootAttempt as (s: Record<string, unknown>) => Promise<Record<string, unknown>>)({
      tag: 'A',
      clientName: 'ui-leg-a',
      profile: '/tmp/p1',
      attempt: 1,
      maxAttempts: 4,
      timeoutMs: 30000,
    })
    expect(rec.client, '§3.7 RT-6(c): a rejected attempt retains no client').toBeUndefined()
    expect(rec.observed ?? rec.html ?? rec.measurement, '§3.7 RT-6(c): … and no probe observation').toBeUndefined()
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-7 — EXHAUSTION. States:
  //   S1  every attempt of boot A fails ⇒ the boot-A exhaustion branch
  //   S2  every attempt of boot B fails ⇒ the boot-B exhaustion branch
  //   S3  the ceiling is the cause (RT-4 item 4)
  // Fail-state: exhaustion reported as 0, as a skip, silently, or as 2; or an
  //   exhausted run printing a count without the per-attempt signatures.
  // -------------------------------------------------------------------------
  it('RT-7a (§3.7 RT-7 / §3.6) — exhaustion exits 1 — NOT 0, NOT 2, NOT 3 — and is never a skip or a green', async () => {
    const stripped = stripComments(requireLegSource())
    const exhaustA = stripped.indexOf('RT-7 EXHAUSTED:')
    const exhaustB = stripped.indexOf('RT-7 EXHAUSTED:', exhaustA + 1)
    expect(exhaustA, '§3.7 RT-7(i): both boots carry an explicit EXHAUSTED branch').toBeGreaterThanOrEqual(0)
    expect(exhaustB, '§3.7 RT-7(i): boot B has its own exhaustion branch (the budget is per boot)').toBeGreaterThan(exhaustA)
    for (const at of [exhaustA, exhaustB]) {
      const near = stripped.slice(at, stripped.indexOf('process.exit(', at) + 20)
      expect(near, '§3.7 RT-7: exhaustion exits 1 — the §3.6 boot/measurement-failure code').toMatch(/process\.exit\(1\)/)
      expect(
        near,
        '§3.7 RT-7: "Why 1 and not 2" — a bootstrap exhaustion is NOT a precondition failure; it must not be reported as 2 (nor as 0/3)',
      ).not.toMatch(/process\.exit\(\s*[023]\s*\)/)
    }
    expect(
      exhaustA,
      '§3.7 RT-7: an exhausted run never reaches the green headline — the exhaustion branch precedes `UI RESULT:`',
    ).toBeLessThan(stripped.indexOf('UI RESULT:'))

    const loop = retryLoopHarness({ responses: [death(), death(), death(), death()] })
    const res = await (loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)(
      'A',
      'ui-leg-a',
      { attempts: 4, timeoutMs: 30000 },
    )
    expect(res.ok, '§3.7 RT-7: exhaustion is not a pass — the boot reports ok:false, never a green').toBe(false)
    expect(
      loop.out.concat(loop.err).join('\n'),
      '§3.7 RT-7: an exhausted boot records no accepted attempt',
    ).not.toMatch(/outcome=accepted/)
  })

  it('RT-7b (§3.7 RT-7(i)) — the EXHAUSTED marker names the budget that was spent', () => {
    const stripped = stripComments(requireLegSource())
    const marker = /RT-7 EXHAUSTED: \$\{retryConfig\.attempts\} of \$\{retryConfig\.attempts\} attempts failed \(\$\{retryConfig\.attempts - 1\} retries\) for boot (A|B)/
    expect(
      marker.test(stripped),
      '§3.7 RT-7(i): the marker is `RT-7 EXHAUSTED: <n> of <n> attempts failed (<k> retries)` — the budget is INTERPOLATED, not a literal that can drift from the configured count',
    ).toBe(true)
    expect(stripped.split('\n').filter((l) => /RT-7 EXHAUSTED:/.test(l)).length, '§3.7 RT-7(i): one marker per boot').toBe(2)
  })

  it('RT-7c (§3.7 RT-7(ii)) — EVERY attempt\'s signature is reported, in attempt order, attempt 1 first', async () => {
    const loop = retryLoopHarness({
      responses: [death(), death({ code: 1, signal: null }), death({ code: null, signal: 'SIGABRT' }), death({ code: 137, signal: null })],
    })
    const res = await (loop.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>)(
      'A',
      'ui-leg-a',
      { attempts: 4, timeoutMs: 30000 },
    )
    expect(
      (res.records as Array<Record<string, unknown>>).map((r) => r.attempt),
      '§3.7 RT-7(ii): the records are handed back in ATTEMPT ORDER, attempt 1 first (reversed/sorted/truncated records are not a record)',
    ).toEqual([1, 2, 3, 4])
    const text = loop.out.concat(loop.err).join('\n')
    const positions = ['SIGTRAP', 'code 1, signal null', 'SIGABRT', 'code 137'].map((s) => text.indexOf(s))
    expect(
      positions.every((p) => p >= 0) && positions.every((p, i) => i === 0 || p > positions[i - 1]),
      '§3.7 RT-7(ii): the signatures are printed attempt-by-attempt, in attempt order',
    ).toBe(true)

    const stripped = stripComments(requireLegSource())
    expect(stripped, '§3.7 RT-7(ii): the exhaustion printer walks the records IN ORDER').toMatch(/for \(const rec of bootA\.records\)/)
    expect(stripped, '§3.7 RT-7(ii): … and the same for boot B').toMatch(/for \(const rec of bootB\.records\)/)
    expect(
      stripped,
      '§3.7 RT-7(ii): nothing reorders the records before they are printed (no reverse/sort/slice on the record list)',
    ).not.toMatch(/records\.(reverse|sort)\(|records\.slice\(/)
  })

  it('RT-7d (§3.7 RT-7(iii)) — the exhausted run states that NO MEASUREMENT was taken, after the signatures', () => {
    const stripped = stripComments(requireLegSource())
    const exhaustA = stripped.indexOf('RT-7 EXHAUSTED:')
    const exhaustB = stripped.indexOf('RT-7 EXHAUSTED:', exhaustA + 1)
    const blockA = stripped.slice(exhaustA, exhaustB)
    const blockB = stripped.slice(exhaustB, stripped.indexOf('process.exit(1)', exhaustB))
    expect(blockA, '§3.7 RT-7(iii): boot A\'s exhaustion report states that no measurement was taken').toMatch(
      /NO MEASUREMENT WAS TAKEN/,
    )
    expect(blockB, '§3.7 RT-7(iii): boot B\'s exhaustion report states it too').toMatch(/NO MEASUREMENT WAS TAKEN/)
    for (const [label, block] of [['A', blockA], ['B', blockB]] as const) {
      expect(
        block.indexOf('for (const rec of'),
        `§3.7 RT-7(ii)+(iii): boot ${label}'s report lists every attempt's signature BEFORE the no-measurement statement`,
      ).toBeLessThan(block.indexOf('NO MEASUREMENT WAS TAKEN'))
    }
    expect(
      stripped.indexOf('runProbe(bootA.client)'),
      '§3.7 RT-7(iii): the measurement site is unreachable from an exhausted run — it comes after both exhaustion branches',
    ).toBeGreaterThan(exhaustB)
  })

  it('RT-7e (§3.7 RT-7(iii) / RT-4 item 4) — when the ceiling was the cause, the ceiling that was hit is named', () => {
    const stripped = stripComments(requireLegSource())
    expect(
      stripped,
      '§3.7 RT-7(iii): "when the ceiling was the cause, the ceiling that was hit" — the break site prints the observed budget against the pinned ceiling',
    ).toMatch(/wall-clock ceiling was EXCEEDED \(\$\{waited\} ms > \$\{UI_BOOT_CEILING_MS\} ms\)/)
    expect(stripped, '§3.7 RT-7: the ceiling path calls itself what it is (EXHAUSTION), so it cannot be read as a plain retry failure').toMatch(
      /EXHAUSTION \(RT-7\)/,
    )
    // RECORDED NUANCE (reported, not smoothed): the ceiling value is named at the
    // BREAK site (before the exhaustion report) rather than inside the
    // `RT-7 EXHAUSTED` block, so the exhausted run's output carries it but the
    // marker block itself does not repeat it.
    const exhaustA = stripped.indexOf('RT-7 EXHAUSTED:')
    expect(
      stripped.indexOf('wall-clock ceiling was EXCEEDED'),
      '§3.7 RT-7(iii): the ceiling that was hit appears in the SAME run output, before the exhaustion report',
    ).toBeLessThan(exhaustA)
  })

  it('RT-7f (§3.7 PRECEDENCE CLAUSE (a)+(b) / RT-7) — the TIMEOUT class CONSUMES its attempts and REACHES EXHAUSTION: never exit-1-on-attempt-1 with a non-retryable verdict', async () => {
    // -----------------------------------------------------------------------
    // The state machine for THIS row, driven end to end through the leg's OWN
    // loop + OWN attempt (no stubbed `retryable`):
    //   S1  attempt 1: child spawned, never exits, handshake never resolves,
    //       the leg's per-attempt timer ends the attempt  ⇒ a FAILED BOOTSTRAP
    //       ATTEMPT that is RETRYABLE (PRECEDENCE CLAUSE (a)) and is RECORDED
    //       with the no-observed-termination + handshake-not-completed signature
    //   S2  attempt 2: same (fresh child, fresh transport, fresh profile) —
    //       the bound of RT-3/RT-4 item 2 is respected, backoff paid
    //   S3  attempt 3: same ⇒ the budget is SPENT ⇒ EXHAUSTION (RT-7): the loop
    //       returns `{ ok: false, records }`, NOT a throw
    // Fail-states:
    //   F1  a timeout thrown as "failed non-retryably (RT-2)" on attempt 1 —
    //       the pre-ruling behaviour (RED below before the fix)
    //   F2  fewer attempts consumed than the budget (a timeout "spent" without
    //       being retried)
    //   F3  a timeout RECORDED as a child death (`child exited (code …)`) in any
    //       attempt's signature
    // WHAT CANNOT BE DRIVEN FROM THIS FILE, stated honestly: the leg's
    //   PROCESS-LEVEL exit `1` on this path is NOT reachable from `[T]` — the
    //   exhaustion branch lives in the leg's top-level try block, and running
    //   the real leg would run the divergence precondition and boot real
    //   Electron (this host's Electron runtime is non-functional, and the leg's
    //   own precondition would rebuild the tree, PRE-1). So the exit code, the
    //   EXHAUSTED marker, the per-attempt printer and the no-measurement
    //   statement are pinned STRUCTURALLY below (their own rows are RT-7a/RT-7b/
    //   RT-7c/RT-7d), and this row pins the LINK: the timeout path hands that
    //   branch exactly the `{ ok: false, records }` value it consumes.
    // FALSIFIABILITY, observed order stated: this row is RED against the
    //   pre-ruling implementation (its `isBootstrapDeath` requires
    //   `died && (nonZero || signalled)`, so attempt 1 comes back
    //   `retryable: false` and `bootUnder` THROWS "failed non-retryably (RT-2)"
    //   after ONE attempt — F1) and GREEN once the leg implements the timeout
    //   signature. F3 is additionally falsified by a mutation that fabricates a
    //   `(code, signal)` pair for the timeout (established out of tree against a
    //   `/tmp/` copy, since the implementation is changed in the same pass).
    // -----------------------------------------------------------------------
    const probe = timeoutExhaustionHarness()
    const bootUnder = probe.api.bootUnder as (tag: string, name: string, cfg: Record<string, unknown>) => Promise<Record<string, unknown>>
    const budget = 3
    const timeoutMs = 1
    let threw: Error | null = null
    let res: Record<string, unknown> | null = null
    try {
      res = await bootUnder('A', 'ui-leg-a', { attempts: budget, timeoutMs })
    } catch (e) {
      threw = e as Error
    }
    expect(
      threw,
      '§3.7 PRECEDENCE CLAUSE (a): a TIMEOUT-class bootstrap failure IS retryable — it must NOT be thrown as "failed non-retryably (RT-2)" (that was the superseded RT-1-only reading)',
    ).toBeNull()
    expect(res?.ok, '§3.7 RT-7: every attempt timed out ⇒ the boot is NOT ok — exhaustion is never a pass, never a skip, never a green').toBe(false)

    const records = res?.records as Array<Record<string, unknown>>
    expect(
      records.map((r) => r.attempt),
      '§3.7 PRECEDENCE CLAUSE (b) + RT-7(ii): EVERY attempt is consumed and recorded, in attempt order, attempt 1 first',
    ).toEqual([1, 2, 3])
    expect(records.length, '§3.7 RT-3/RT-4 item 2: the budget of 3 attempts was SPENT, not cut short by the timeout').toBe(budget)
    for (const r of records) {
      const sig = (probe.api.signatureOf as (x: Record<string, unknown>) => string)(r)
      expect([r.code, r.signal], `§3.7 PRECEDENCE CLAUSE (a): attempt ${String(r.attempt)} observed NO child termination`).toEqual([null, null])
      expect(String(r.error), `§3.7 RT-4 item 3: attempt ${String(r.attempt)} failed on its own handshake bound`).toMatch(
        /handshake did not complete within 1 ms \(RT-4 item 3\)/,
      )
      expect(sig, `§3.7 PRECEDENCE CLAUSE (a)/RT-5: attempt ${String(r.attempt)} carries the timeout signature verbatim`).toContain(
        'no observed child termination',
      )
      expect(
        sig,
        `§3.7 PRECEDENCE CLAUSE (a): attempt ${String(r.attempt)} must not be recorded as a child death — a timeout cannot be silently classified as a death (F3)`,
      ).not.toMatch(/child exited/)
    }

    // The bound and the teardown discipline hold on the timeout path too
    // (RT-3): one child + one transport per attempt, each torn down before the
    // next attempt exists, and the backoff table was actually paid.
    expect(probe.children.length, '§3.7 RT-3: ONE Electron process per attempt — three attempts, three children').toBe(budget)
    expect(
      probe.transports.map((t) => t.closed),
      '§3.7 RT-3: every timed-out attempt\'s transport is closed before the attempt returns',
    ).toEqual([true, true, true])
    expect(
      probe.children.map((c) => c.killed),
      '§3.7 RT-3: every timed-out attempt\'s child is terminated (a hung-but-alive child is killed, not left running)',
    ).toEqual([true, true, true])
    expect(
      probe.delays.filter((ms) => ms === 250 || ms === 500),
      '§3.7 RT-4 item 1: the fixed backoff table was paid between the timeout attempts (250 ms before attempt 2, 500 ms before attempt 3) — proof the retry really happened',
    ).toEqual([250, 500])

    // The RECORDING half at the attempt level (the same printer the exhaustion
    // report uses): every attempt's number and signature appear, in order.
    const text = probe.out.concat(probe.err).join('\n')
    const marks = [`attempt 1/${budget}`, `attempt 2/${budget}`, `attempt 3/${budget}`].map((s) => text.indexOf(s))
    expect(
      marks.every((p) => p >= 0) && marks.every((p, i) => i === 0 || p > marks[i - 1]),
      '§3.7 RT-7(ii)/RT-5: every attempt is printed, attempt 1 first — an unrecorded retry is inadmissible',
    ).toBe(true)
    expect(
      text.split('\n').filter((l) => l.includes('signature: ') && l.includes('no observed child termination')).length,
      '§3.7 RT-7(ii): one verbatim timeout signature per failed attempt — a count with no signatures is not a record',
    ).toBe(budget)

    // The LINK to the process-level exhaustion path (structural, with the
    // reason stated in the header above): the value this probe returns is
    // exactly what the leg's boot-A exhaustion branch consumes, and that branch
    // carries the marker, the in-order printer, the no-measurement statement and
    // exit 1 (RT-7a/RT-7b/RT-7c/RT-7d assert those halves).
    const stripped = stripComments(requireLegSource())
    const exhaustA = stripped.indexOf('RT-7 EXHAUSTED:')
    const branchStart = stripped.lastIndexOf('if (!bootA.ok)', exhaustA)
    const exitA = stripped.indexOf('process.exit(1)', exhaustA)
    const branch = stripped.slice(branchStart, exitA)
    expect(branchStart, '§3.7 RT-7: the leg branches on exactly the `{ ok: false }` return this probe produced').toBeGreaterThanOrEqual(0)
    expect(branch, '§3.7 RT-7(i): the EXHAUSTED marker names the budget that was spent').toMatch(/RT-7 EXHAUSTED:/)
    expect(branch, '§3.7 RT-7(ii): the exhaustion report walks the attempt records IN ORDER').toMatch(/for \(const rec of bootA\.records\)/)
    expect(branch, '§3.7 RT-7(iii): the exhausted run states that NO MEASUREMENT was taken').toMatch(/NO MEASUREMENT WAS TAKEN/)
    expect(
      stripped.slice(exhaustA, exitA + 20),
      '§3.7 RT-7 / §3.6: the timeout-exhausted run exits 1 — NOT 0, NOT 2, NOT 3 (a bootstrap exhaustion is not a precondition failure)',
    ).toMatch(/process\.exit\(1\)/)
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-8 — the divergence precondition's interaction. States:
  //   S1  the precondition is invoked once and its line/exit code are consumed
  //   S2  a red precondition (including the `1 checks, 2 failures` bootstrap
  //       signature) ⇒ exit 2, no measurement, no retry entry
  //   S3  the PRE-2 digest pair is taken twice, around the precondition
  // Fail-state: a retry of the divergence leg, a measurement taken past a red
  //   precondition, a retried `ui` boot cited as weakening the verdict.
  // REACHABILITY: S2's runtime half needs a failing divergence leg (a real host
  //   + a broken Electron boot) — not reachable in `[T]`; its [T] half is the
  //   structural separation below, and it was falsified out of tree against a
  //   `/tmp/` copy whose divergence stub printed the off-green signature.
  // -------------------------------------------------------------------------
  it('RT-8a (§3.7 RT-8 item 1) — the divergence leg is invoked exactly ONCE, with its result line and exit code consumed verbatim', () => {
    const stripped = stripComments(requireLegSource())
    expect(
      [...stripped.matchAll(/runDivergence\s*\(/g)].length,
      '§3.7 RT-8 item 1: one declaration + exactly ONE invocation site — the retry is the ui boot\'s only',
    ).toBe(2)
    expect(
      stripped,
      '§3.7 RT-8 item 1 / §5.4: the harness script\'s own summary line is the authority, parsed rather than re-derived',
    ).toMatch(/out\.split\('\\n'\)\.find\(\(l\) => l\.includes\('R13 RESULT'\)\)/)
    expect(stripped, '§5.1 PRE-1: the divergence result line is printed VERBATIM').toMatch(/divergence result line \(verbatim\): \$\{divergence\.line\}/)
    expect(stripped, '§5.1 PRE-1: … together with its exit code').toMatch(/divergence exit code: \$\{divergence\.code\}/)
    expect(
      stripComments(requireFn(requireLegSource(), 'bootUnder')),
      '§3.7 RT-8 item 1: a `ui` retry never re-enters the precondition',
    ).not.toMatch(/runDivergence|divergenceLeg/)
  })

  it('RT-8b (§3.7 RT-8 item 2 / PRE-1 / PRE-3) — a red precondition exits 2 with NO measurement, decided before the retry boundary', () => {
    const stripped = stripComments(requireLegSource())
    const exitTwoAt = stripped.indexOf('process.exit(2)')
    const preconditionFailedAt = stripped.indexOf('PRECONDITION-FAILED')
    expect(preconditionFailedAt, '§5.1 PRE-1: the fail state is named `PRECONDITION-FAILED`').toBeGreaterThanOrEqual(0)
    expect(exitTwoAt, '§3.6/PRE-1: a red precondition exits 2').toBeGreaterThan(preconditionFailedAt)
    expect(
      stripped.slice(exitTwoAt - 1500, exitTwoAt),
      '§3.7 RT-8 item 2/PRE-1: "no measurement taken" is stated on the red-precondition path',
    ).toMatch(/NO MEASUREMENT TAKEN/)
    expect(
      stripped.indexOf('await bootUnder('),
      '§3.7 RT-8 item 2: "its own retry logic is not entered" — the red-precondition exit comes BEFORE the first boot attempt',
    ).toBeGreaterThan(exitTwoAt)
    expect(
      stripped.indexOf('runProbe(bootA.client)'),
      '§3.7 RT-8 item 2/PRE-3: no `ui` measurement may be taken past a red precondition',
    ).toBeGreaterThan(exitTwoAt)
  })

  it('RT-8c (§3.7 RT-8 item 5) — the `1 checks, 2 failures` diagnostic note is DIAGNOSTIC ONLY: it changes no exit code and retries nothing', () => {
    const stripped = stripComments(requireLegSource())
    const sigAt = stripped.indexOf('R13 RESULT:\\s*1')
    expect(
      sigAt,
      '§3.7 RT-8 item 5/§5.4: the off-green signature (`checks = 1`, `failures = 2`) is recognised by name, inside the red-precondition branch',
    ).toBeGreaterThan(stripped.indexOf('PRECONDITION-FAILED'))
    const noteAt = stripped.indexOf('diagnostic note')
    expect(
      noteAt,
      '§3.7 RT-8 item 5: the leg MAY record the distinction between "divergence red" and "divergence red with the bootstrap signature"',
    ).toBeGreaterThan(sigAt)
    const exitTwoAt = stripped.indexOf('process.exit(2)')
    expect(
      exitTwoAt,
      '§3.7 RT-8 item 2/5: the note sits INSIDE the red-precondition branch, BEFORE its single exit 2 — so it cannot change the exit code it annotates',
    ).toBeGreaterThan(noteAt)
    const block = stripped.slice(sigAt, stripped.indexOf('NO MEASUREMENT TAKEN', sigAt))
    expect(block, '§5.4/§3.7 RT-8 item 5: the note names the off-green signature it recognises').toMatch(/1\s*checks,\s*2\s*failures/)
    expect(
      block,
      '§3.7 RT-8 item 5: the note is diagnostic ONLY — no second exit, no retry of the divergence leg, no boot attempt may hang off it',
    ).not.toMatch(/process\.exit\(|runDivergence\(|bootUnder\(|bootAttempt\(/)
  })

  it('RT-8d (§3.7 RT-8 item 4) — the PRE-2 digest pair is taken exactly twice, around the precondition run, and is never re-taken by a retry', () => {
    const stripped = stripComments(requireLegSource())
    expect(
      [...stripped.matchAll(/beforeDigest\s*\(/g)].length,
      '§3.7 RT-8 item 4: one declaration + TWO invocations (before and after the precondition run) — a retry that re-checked the tree would add a third',
    ).toBe(3)
    const bootAt = stripped.indexOf('await bootUnder(')
    const callSites = [...stripped.matchAll(/=\s*beforeDigest\(\)/g)].map((m) => m.index as number)
    expect(callSites.length, '§3.7 RT-8 item 4: the digest pair is a real before/after pair').toBe(2)
    for (const at of callSites) {
      expect(at, '§3.7 RT-8 item 4: the digest pair is taken AROUND the precondition run, before any boot').toBeLessThan(bootAt)
    }
    expect(
      stripped.indexOf('digestUnchanged(before, after)'),
      '§3.7 RT-8 item 4/PRE-2: the pair is compared once, right after the precondition run',
    ).toBeGreaterThan(callSites[0])
    for (const name of ['bootUnder', 'bootAttempt']) {
      expect(
        stripComments(requireFn(requireLegSource(), name)),
        `§3.7 RT-8 item 4: \`${name}\` re-checks nothing — an attempt consumes no digest check`,
      ).not.toMatch(/digest|artifactPaths|pinAgrees/)
    }
  })

  // -------------------------------------------------------------------------
  // §3.7 RT-9 — leg-locality. States:
  //   S1  the shared helper: no retry, one single-shot spawn per call
  //   S2  the divergence leg: no retry, unchanged R13 arithmetic
  //   S3  the F-1 regression: two profiles, each spawned EXACTLY ONCE
  //   S4  the helper's landed export surface, unchanged (no retry facility)
  // Fail-state: a retry implemented inside the helper, or any edit to the
  //   divergence leg to make its flake disappear ⇒ RT-9 + PRE-4 violation.
  // -------------------------------------------------------------------------
  it('RT-9a (§3.7 RT-9(b)(c)) — the retry is LEG-LOCAL: the shared helper carries no retry and its spawns are single-shot', () => {
    // -----------------------------------------------------------------------
    // ⟶ DIAGNOSED 2026-09-27 (THE SHIM-INTEGRITY PRE-FLIGHT ARRIVED IN THE SHARED
    // HELPER): **THE ROW'S PINNED CONTRACT IS INTACT AND NO REPAIR IS OWED — the
    // helper change is case (b) of the diagnosis, NOT a violation.** The divergence
    // pass added a pre-flight to `scripts/electron-spawn.mjs` (`assertEntryPointSpawnable`
    // + `entryPointKind` + `readEntryHeader` + `wrapperEntryPoint`, with the constants
    // `ENTRY_HEADER_BYTES` / `NATIVE_MAGICS` / `SHELL_SHEBANG`), called from
    // `spawnElectron` BEFORE any child exists; on a corrupted npm shim it THROWS, and on
    // the healthy path it is a bounded read that changes the spawn not at all.
    // **THE MEASUREMENTS TAKEN AT THIS HEAD, against the three facts this row pins, are
    // all UNCHANGED by that pass:**
    //   · `spawn(...)` call sites, comments stripped: `1` BOTH at `HEAD` and in the
    //     worktree (the RAW count moves `1 → 2` only because the pre-flight's own prose
    //     names a spawn — the row reads the STRIPPED code, which is why the prose cannot
    //     redden it, and the pre-flight itself creates no child: `readEntryHeader` =
    //     `openSync`/`readSync`/`closeSync`, `wrapperEntryPoint` = `realpathSync`).
    //   · the export census: `13` BOTH at `HEAD` and in the worktree — the four new
    //     members are MODULE-LOCAL, so `RT-9d`'s pinned list is untouched (an added
    //     export such as `assertEntryPointSpawnable` would have reddened THAT row).
    //   · retry-shaped words (`retry|attempt|backoff|jitter`), comments stripped: `[]` —
    //     the RAW reading carries hits, every one of them inside the new prose, which the
    //     row strips (that is the row's own mechanism and it is unchanged).
    //   · `spawnElectron`/`spawnProfile` bodies carry no `for (`/`while (`/retry token`,
    //     so both are still SINGLE-SHOT.
    // **WHAT WAS *NOT* DONE, stated so the honesty is checkable:** the row's pinned
    // contract was NOT relaxed, its census was NOT widened to "name the new member", and
    // no assertion was removed — the assertion set below is byte-identical to the one
    // that measured the pre-flight's arrival, and it PASSES against it.
    // -----------------------------------------------------------------------
    const helperSrc = requireHelperSource()
    const code = stripComments(helperSrc)
    expect(
      code,
      '§3.7 RT-9(c): the helper-carried retry is a RECORDED OPTION with a named owner (`U-DIVERGENCE-EXT`), NOT adopted here — no retry code in the helper',
    ).not.toMatch(/retry|attempt|backoff|jitter/i)
    expect(
      [...code.matchAll(/\bspawn\s*\(/g)].length,
      '§3.7 RT-9: exactly ONE `spawn(...)` call in the whole helper — a helper-carried retry would have to add another',
    ).toBe(1)
    for (const name of ['spawnElectron', 'spawnProfile']) {
      const body = stripComments(requireFn(helperSrc, name))
      expect(
        body,
        `§3.7 RT-9: \`${name}\` is single-shot — a retry loop inside it would redden this`,
      ).not.toMatch(/for\s*\(|while\s*\(|retry|attempt|backoff/i)
    }
    expect(
      code,
      '§3.7 RT-9: the helper\'s exported surface carries no retry facility',
    ).not.toMatch(/export\s+(?:async\s+)?(?:function|const|class)\s+\w*(?:Retry|Attempt|Backoff|Jitter)\w*/)
    const legImport = /import \{([^}]*)\} from '\.\/electron-spawn\.mjs'/.exec(stripComments(requireLegSource()))
    expect(legImport, '§2.1 item 1: the ui leg imports the shared helper').not.toBeNull()
    expect(
      (legImport as RegExpExecArray)[1],
      '§3.7 RT-9: the ui leg asks the helper for its LANDED contract only — no retry facility is imported (the retry lives in the leg)',
    ).not.toMatch(/retry|attempt|backoff/i)
  })

  it('RT-9b (§3.7 RT-9(b) / §5.4) — the divergence leg carries no retry and its R13 arithmetic is unchanged', () => {
    const div = stripComments(requireDivergenceSource())
    expect(
      div,
      '§3.7 RT-9(a)(b): the divergence leg\'s identical flake is NOT this unit\'s to fix — no retry was added to it',
    ).not.toMatch(/retry|attempt|backoff|jitter/i)
    expect(
      [...div.matchAll(/checks \+= 1/g)].length,
      '§5.4/§3.7 RT-9: exactly ONE site increments `checks` (the `ok()` helper) — the N = 9 arithmetic is unchanged',
    ).toBe(1)
    expect(
      [...div.matchAll(/failures \+= 1/g)].length,
      '§5.4: exactly TWO sites increment `failures` (inside `ok()`, plus the bare increment in the connect/drive catch) — which is what makes the off-green signature `1 checks, 2 failures`',
    ).toBe(2)
    expect(
      [...div.matchAll(/ok\(\s*'/g)].length,
      '§5.4: the comparison census is unchanged (10 `ok(...)` call sites: 1 rendered-non-empty check, 8 comparisons, 1 off-green else-branch) — a retry or a new check would move it',
    ).toBe(10)
    expect(div, '§5.4/PRE-4: the result line the precondition consumes is the pinned template').toMatch(
      /R13 RESULT: \$\{checks\} checks, \$\{failures\} failures/,
    )
    expect(div, '§5.4: the off-green `else` branch (the bootstrap-failure signature) is intact').toMatch(
      /ok\('electron leg produced a result', false/,
    )
  })

  it('RT-9c (§3.7 RT-9(b) / §2.1 item 1 — the F-1 regression) — each scratch profile is spawned EXACTLY ONCE', () => {
    const div = stripComments(requireDivergenceSource())
    expect(
      [...div.matchAll(/makeFreshProfile\s*\(/g)].length,
      '§3.7 RT-9(b)/§2.1 item 1: the divergence leg creates exactly TWO scratch profiles',
    ).toBe(2)
    expect(
      div,
      'F-1 regression (§3.7 RT-9): `spawnProfile` both CREATES a profile and SPAWNS — using it for a profile-only site left an undrained Electron process per site and booted FOUR processes for two profiles',
    ).not.toMatch(/spawnProfile/)
    expect(div, 'F-1 regression: the first profile is spawned by the helper\'s own spawn call').toMatch(
      /spawnElectron\(\[`--user-data-dir=\$\{profileA\}`\]\)/,
    )
    expect(div, 'F-1 regression: the second profile rides the SDK transport, spawned once').toMatch(
      /new StdioClientTransport\(\{\s*\n\s*command: electronBin,\s*\n\s*args: \[\.\.\.baseArgs, `--user-data-dir=\$\{profileB\}`\]/,
    )
    // THE F-1 ASSERTION: each profile is passed to exactly ONE spawn site, and
    // each profile name occurs exactly twice (its creation + its one spawn).
    expect(
      [...div.matchAll(/--user-data-dir=\$\{profile([AB])\}/g)].map((m) => m[1]),
      'F-1 regression: TWO profiles ⇒ each profile is spawned EXACTLY ONCE (the defect booted four Electron processes for two profiles)',
    ).toEqual(['A', 'B'])
    expect([...div.matchAll(/profileA\b/g)].length, 'F-1 regression: profile A is created once and spawned once').toBe(2)
    expect([...div.matchAll(/profileB\b/g)].length, 'F-1 regression: profile B is created once and spawned once').toBe(2)
    expect([...div.matchAll(/spawnElectron\(/g)].length, 'F-1 regression: exactly ONE direct Electron spawn site').toBe(1)
    expect(
      [...div.matchAll(/new StdioClientTransport\(\{ command: process\.execPath/g)].length,
      'F-1 regression: the other transport in this file spawns the SHIM host under node — it is not a third Electron boot',
    ).toBe(1)
    expect(
      stripComments(requireLegSource()),
      'F-1 regression: the ui leg uses the helper\'s PROFILE-ONLY creator for its profiles, never the one that also spawns',
    ).not.toMatch(/spawnProfile/)
  })

  it('RT-9d (§3.7 RT-9(c)) — the helper\'s landed export surface is unchanged (no retry facility was added to it)', () => {
    const helperSrc = requireHelperSource()
    const code = stripComments(helperSrc)
    const exported = [...code.matchAll(/export\s+(?:async\s+)?(?:function|const|class)\s+(\w+)/g)].map((m) => m[1])
    expect(
      exported,
      '§2.1 item 1/§3.7 RT-9: the helper\'s exports, in source order — the landed contract the divergence leg depends on, with no retry facility among them',
    ).toEqual([
      'repoRoot',
      'electronBin',
      'mainCjs',
      'baseArgs',
      'stdioWiring',
      'stdioWiringJson',
      'electronEnv',
      'scratchRoot',
      'makeFreshProfile',
      'cleanupProfiles',
      'spawnProfile',
      'spawnElectron',
      'ChildProcessTransport',
    ])
    expect(code, '§2.1 item 1: the landed base vector is still the helper\'s own').toMatch(/export const baseArgs = \[/)
    expect(code, '§2.1 item 3: `--disable-dev-shm-usage` is still one of the two required flags').toContain('--disable-dev-shm-usage')
  })

  // -------------------------------------------------------------------------
  // §0 prohibition 4 (as extended by the retry ruling) — the UI-config-store
  // prohibition: nothing persisted outside the scratch profiles, ONE fresh
  // profile per attempt, each removed, the default/operator profile never
  // written, and no profile from a failed attempt reused.
  // -------------------------------------------------------------------------
  it('RT-0a (§0 prohibition 4 / §3.7 RT-3) — every attempt profile is a FRESH scratch dir from the helper\'s creator, and only the leg\'s own store is written into it', () => {
    const created: string[] = []
    const writes: Array<[string, string]> = []
    const api = sandbox({
      src: requireLegSource(),
      decls: ['SCRATCH_GROUPS'],
      fns: ['scratchProfile'],
      globals: {
        makeFreshProfile: (name: string) => {
          created.push(name)
          return `/tmp/provident-ui/${name}-${created.length}`
        },
        writeFileSync: (path: string, data: string) => {
          writes.push([path, data])
        },
        join,
      },
      exports: ['scratchProfile'],
    })
    const scratchProfile = api.scratchProfile as (tag: string) => string
    const p1 = scratchProfile('A')
    const p2 = scratchProfile('A-r2')
    expect(created.length, '§2.1 item 2: the helper\'s fresh-scratch creator is the ONE profile implementation').toBe(2)
    expect(p1, '§0 prohibition 4/§3.7 RT-3: two calls produce two DIFFERENT scratch profiles').not.toBe(p2)
    expect(writes.length, '§3.2: the leg seeds its own security store once per scratch profile').toBe(2)
    for (const [path, data] of writes) {
      expect(path, '§3.2/§0 prohibition 4: the store is written INSIDE the scratch profile — never the operator\'s real profile').toMatch(
        /^\/tmp\/provident-ui\//,
      )
      expect(path, '§3.2: the landed store file name').toContain('provident-security.json')
      expect(JSON.parse(data).enabled, '§3.2/SEAM-4: the scratch store is where the `code` group is enabled — never a default').toEqual([
        'read',
        'dispatch',
        'graph',
        'code',
      ])
    }
  })

  it('RT-0b (§0 prohibition 4 / §2.1 item 2) — the per-attempt profiles are removed through the helper\'s ONE cleanup on every exit path', () => {
    const cleaned: string[] = []
    const removed: string[] = []
    const api = sandbox({
      src: requireLegSource(),
      fns: ['cleanupScratch'],
      globals: {
        cleanupProfiles: () => cleaned.push('cleanupProfiles'),
        rmSync: (path: string) => removed.push(path),
        scratchRoot: '/tmp/provident-ui-run-scratch',
      },
      exports: ['cleanupScratch'],
    })
    ;(api.cleanupScratch as () => void)()
    expect(
      cleaned,
      '§3.7 RT-3/§0 prohibition 4: every per-attempt profile is deleted through the helper\'s own cleanup — one implementation, so no attempt profile is orphaned',
    ).toEqual(['cleanupProfiles'])
    expect(removed, '§2.1 item 2/DIS-5: the leg\'s own per-run scratch tree is removed next to it').toEqual([
      '/tmp/provident-ui-run-scratch',
    ])
    const stripped = stripComments(requireLegSource())
    expect(stripped, '§2.1 item 2: the cleanup is reachable from the signal paths too (a leaked profile per attempt is worse than before)').toMatch(
      /process\.on\('SIGINT'/,
    )
    expect(stripped, '§2.1 item 2: … and from the exit path').toMatch(/process\.on\('exit'/)
  })
})

// ===========================================================================
// ADVERSARIAL FINDING `G-4` (MED) — the `R0`…`R4` rows, made FALSIFIABLE
// ===========================================================================
//
// THE FINDING, verbatim in gist (§3b's `G-4` row, `[READ]` + `[NOT-VERIFIED]`):
// *"Node rows survive a revert of the re-pinned predicate: the `R1` test asserts
// `/typeof\s+(window|document|globalThis)/` — **the very marker the `M-1`
// amendment STRUCK** — so `R1`'s runtime predicate could revert to `typeof
// window` and stay green. Same class: the `R0`/`R2`/`R3`/`R4` rows and the seam
// `R0`(c) row's string-count."*
//
// WHAT WAS WRONG, ROW BY ROW (this pass, by reading both files):
//   * `R0`  — asserted profile-CREATOR COUNT (≥2) and the ABSENCE of two
//             literals. A leg that booted twice but compared NOTHING, or that
//             compared only one half, stayed green.
//   * `R1`  — asserted `/typeof\s+(window|document|globalThis)/`: exactly the
//             struck marker. A revert to `typeof window` stayed green.
//   * `R2-a`— tool-call NAMES against `ALL_TOOLS` (`R2-a` was already a real
//             set-membership row); `R2-b` asserted `/measurement/i` and
//             `/(===|!==)\s*1\b/` — a hard-coded count would have kept it green.
//   * `R3`  — asserted the WORDS `UNSUPPORTED` and `layout` appear in the file.
//             A constant status stayed green.
//   * `R4`  — asserted `/proves that a specific probe/i`, `/nothing else/i`, the
//             word `R4`, and the ABSENCE of one regex. The call-site SET the row
//             claims to check was never run (and a phrase check is a guaranteed
//             FALSE RED here: §1.13's honest-limits prose legitimately contains
//             the word "packaged").
//
// WHAT THIS BLOCK DOES — the same technique the `RT-*` rows already use, applied
// to the five declared rows: take the leg's OWN predicate out of its source and
// RUN it against the behaviour's own states, and take the leg's OWN value-readers
// (`readMarker`, the probe handler body, the tally, the status derivation, the
// call-site set) and run those too. A revert or a break reddens a row below; the
// mirror-tree mutation matrix that proves it is reported to the supervisor, never
// encoded here (the repo's `scripts/**` is not modified by any of this).
describe('G-4 falsifiability — the declared rows RUN the leg\'s own predicates, markers and tallies', () => {
  it('R0-fals (§3.0 R0(a)+(b)) — each isolation half is a REAL comparison: an inequality in either boot pair reddens the row', () => {
    const src = requireLegSource()
    const surfaceBase = {
      toolsA: '1|2|3',
      toolsB: '1|2|3',
      isolationA: { census: { nodes: 3 }, nodeIds: 'a|b|c' },
      isolationB: { census: { nodes: 3 }, nodeIds: 'a|b|c' },
    }
    // S1 — both halves equal ⇒ every `R0`(a)/(b) predicate is TRUE.
    for (const frag of [
      'R0(a) tools/list identical across the two boots',
      'R0(b) provident.list_targets census identical across the two boots',
      'R0(b) nodeId vocabulary identical across the two boots',
    ]) {
      expect(
        runRowPredicate(src, frag, surfaceBase),
        `§3.0 R0: ${frag} — the equal-state case (two boots, same graph state) must PASS`,
      ).toBe(true)
    }

    // S2 — an INEQUALITY in each half ⇒ that half's predicate is FALSE. This is
    // what "the comparison is real" means: a hard-coded `true`, a predicate that
    // compares the WRONG pair, or a leg that takes only ONE of the two boots'
    // surfaces reddens here.
    //   (a) `tools/list` differs across the boots.
    expect(
      runRowPredicate(src, 'R0(a) tools/list identical across the two boots', { ...surfaceBase, toolsB: '1|2|3|4' }),
      '§3.0 R0(a): a differing `tools/list` between the two boots must FAIL the row',
    ).toBe(false)
    //   (b) the census differs.
    expect(
      runRowPredicate(src, 'R0(b) provident.list_targets census identical across the two boots', {
        ...surfaceBase,
        isolationB: { census: { nodes: 4 }, nodeIds: 'a|b|c' },
      }),
      '§3.0 R0(b): a differing census between the two boots must FAIL its row',
    ).toBe(false)
    //   (b) the nodeId vocabulary differs (the census may agree while the
    //   vocabulary does not — the half that a single census comparison misses).
    expect(
      runRowPredicate(src, 'R0(b) nodeId vocabulary identical across the two boots', {
        ...surfaceBase,
        isolationB: { census: { nodes: 3 }, nodeIds: 'a|b|d' },
      }),
      '§3.0 R0(b): a differing nodeId vocabulary between the two boots must FAIL its own row',
    ).toBe(false)

    // S3 — the half that carries the ISOLATION claim (§3.0's caveat: "(a)/(b) are
    // leg-layer assertions"; the isolation claim itself is carried by (c), which
    // is asserted in the seam file). The two surfaces must be read from the two
    // DIFFERENT boots, not from one boot twice.
    const sA = src.search(/isolationA\s*=\s*await isolationSurface\(bootA\.client\)/)
    const sB = src.search(/isolationB\s*=\s*await isolationSurface\(bootB\.client\)/)
    expect(sA, '§3.0 R0(b): boot A\'s isolation surface must be read from boot A').toBeGreaterThanOrEqual(0)
    expect(sB, '§3.0 R0(b): boot B\'s isolation surface must be read from boot B').toBeGreaterThanOrEqual(0)
    expect(sA < sB, '§3.0 R0: the two surfaces are taken on the two boots, in boot order').toBe(true)
  })

  it('R0(c)-fals (§3.0 R0(c)) — the row depends on the operator-profile WITNESS\'s before/after comparison, not on a printed claim', () => {
    const src = requireLegSource()

    // S1 — the witness comparison is a REAL comparison, run from the leg's own
    // function. States: equal before/after; an mtime move; a presence flip; an
    // unobserved-after candidate.
    const api = sandbox({
      src,
      fns: ['operatorProfileUnchanged'],
      globals: { join },
      exports: ['operatorProfileUnchanged'],
    })
    const unchanged = api.operatorProfileUnchanged as (
      b: Array<Record<string, unknown>>,
      a: Array<Record<string, unknown>>,
    ) => { unchanged: boolean; diffs: string[] }
    const mk = (profile: string, present: boolean, mtimeMs: number | null, exists = true): Record<string, unknown> => ({
      profile,
      exists,
      files: {
        'provident-security.json': { present, mtimeMs, size: present ? 10 : null },
        'provident-modules.json': { present: false, mtimeMs: null, size: null },
      },
    })
    const before = [mk('/home/operator/.config/app', true, 1000)]
    expect(
      unchanged(before, [mk('/home/operator/.config/app', true, 1000)]).unchanged,
      '§3.0 R0(c): an UNCHANGED operator profile ⇒ the witness reports unchanged (the equal-state case)',
    ).toBe(true)
    const moved = unchanged(before, [mk('/home/operator/.config/app', true, 2000)])
    expect(moved.unchanged, '§3.0 R0(c): a boot that WROTE the operator store moves its mtime ⇒ the witness must NOT report unchanged').toBe(false)
    expect(moved.diffs.join(' '), '§3.0 R0(c): the diff names the path and what moved (legible evidence, not a bare `false`)').toContain(
      '/home/operator/.config/app/provident-security.json',
    )
    expect(
      unchanged(before, [mk('/home/operator/.config/app', false, null)]).unchanged,
      '§3.0 R0(c): a store appearing/vanishing under the operator profile must be caught (a presence flip, with an unchanged mtime field)',
    ).toBe(false)
    expect(
      unchanged(before, [mk('/home/operator/.config/other', true, 1000)]).unchanged,
      '§3.0 R0(c): a candidate not observed AFTER the run must be caught — a witness that silently skipped a missing path would compare nothing',
    ).toBe(false)

    // S2 — the witness is TAKEN around the run (before it, and after the boots),
    // and its summary is what the row prints.
    const beforeAt = src.search(/operatorProfileBefore\s*=\s*operatorProfileState\(\)/)
    const afterAt = src.search(/operatorProfileAfter\s*=\s*operatorProfileState\(\)/)
    expect(beforeAt, '§3.0 R0(c): the witness\'s BEFORE state must be taken from the leg\'s own state reader').toBeGreaterThanOrEqual(0)
    expect(afterAt, '§3.0 R0(c): the witness\'s AFTER state must be taken from the leg\'s own state reader').toBeGreaterThanOrEqual(0)
    expect(
      beforeAt < afterAt,
      '§3.0 R0(c): the witness is a before/after pair — the BEFORE read precedes the AFTER read (a single read would compare nothing)',
    ).toBe(true)
    const firstBoot = src.search(/bootA\s*=\s*await bootUnder|await bootUnder\(/)
    expect(beforeAt, '§3.0 R0(c): the BEFORE state is taken before the run does anything to any profile').toBeLessThan(firstBoot)
    expect(
      src.search(/operatorProfileUnchanged\(\s*operatorProfileBefore\s*,\s*operatorProfileAfter\s*\)/),
      '§3.0 R0(c): the witness\'s comparison is `operatorProfileUnchanged(before, after)` — the two states the run recorded',
    ).toBeGreaterThanOrEqual(0)

    // S3 — the row's own predicate CONSUMES the witness result: with the witness
    // reporting a move, the row fails. (A row that printed the witness but kept
    // its condition independent of it would stay green here.)
    const base = { seededStoreIntact: true, codeToolsOn: true, operatorWitness: { unchanged: true }, operatorWitnessEvidence: 'x' }
    expect(
      runRowPredicate(src, 'neither boot read/wrote the developer\'s persisted security store', base),
      '§3.0 R0(c): the all-halves-hold state must PASS the row',
    ).toBe(true)
    expect(
      runRowPredicate(src, 'neither boot read/wrote the developer\'s persisted security store', {
        ...base,
        operatorWitness: { unchanged: false },
      }),
      '§3.0 R0(c): the witness reporting the operator profile MOVED must FAIL the row — the row asserts the OBSERVATION, not a path spelling',
    ).toBe(false)
    expect(
      runRowPredicate(src, 'neither boot read/wrote the developer\'s persisted security store', { ...base, seededStoreIntact: false }),
      '§3.0 R0(c): a boot whose own seeded store did NOT resolve under its scratch profile must FAIL the row',
    ).toBe(false)
    expect(
      runRowPredicate(src, 'neither boot read/wrote the developer\'s persisted security store', { ...base, codeToolsOn: false }),
      '§3.0 R0(c): the code-group surface that a first-run/default store could not produce must be part of the row',
    ).toBe(false)
  })

  it('R1-fals (§3.0 R1 as RE-PINNED by AMENDMENT BLOCK `M-1`) — the discriminator is the ELEMENT/RENDERER-API provenance; a `typeof window` revert REDDENS', () => {
    const src = requireLegSource()
    const readMarker = makeReadMarker(src)

    // The leg's OWN probe body, run in two realms. The real realm is a live
    // renderer's (element class + resolved computed style); the shim realm is the
    // shim's own — `document` IS an object, `window` IS an object, the element is
    // `ShimElement`, and its layout call throws.
    const realObs = runProbeBody(src, REAL_RENDERER_REALM)
    // The shim realm's probe run THROWS at the layout call (that is the shim's
    // real signature, §3.4), but its FIRST write — the one carrying the realm
    // provenance — has already happened. That partial observation is the realm
    // the struck predicate cannot discriminate against.
    const shimObs = runProbeBody(src, SHIM_REALM)
    const read = (obs: { frame: string }, key: string): string => readMarker(obs.written.slice(-1)[0] ?? '', key)
    expect(realObs.threw, '§3.2: the REAL realm completes both probe writes (geometry + computed style)').toBeNull()
    expect(shimObs.threw, '§3.4: the shim\'s probe run throws at `getBoundingClientRect` (no layout) instead of returning a `0`').not.toBeNull()
    const realMarkers = {
      window: read(realObs, 'window'),
      document: read(realObs, 'document'),
      element: read(realObs, 'element'),
      style: read(realObs, 'style'),
      measure: read(realObs, 'measure'),
      fontSize: read(realObs, 'fontSize'),
    }
    const shimMarkers = {
      window: read(shimObs, 'window'),
      document: read(shimObs, 'document'),
      element: read(shimObs, 'element'),
      style: read(shimObs, 'style'),
      measure: read(shimObs, 'measure'),
      fontSize: read(shimObs, 'fontSize'),
    }

    // S1 — the realm observation itself is the discriminating one (this is what
    // AMENDMENT BLOCK `M-1` MEASURED and re-pinned).
    expect(realMarkers.element, '§3.0 R1/M-1: a real renderer reports its element\'s renderer-API class').toBe('HTMLDivElement')
    expect(realMarkers.style, '§3.0 R1/M-1: a real renderer reports a resolved computed style\'s class').toBe('CSSStyleDeclaration')
    expect(realMarkers.measure, '§3.0 R2: the real realm also carries the ONE measurement').toMatch(/^\d+x\d+$/)
    expect(realMarkers.fontSize, '§3.0 R2: … and the non-empty computed-style value').not.toBe('')
    expect(shimMarkers.element, '§3.0 R1/M-1: the shim reports its OWN element class — the category the old clause could not exclude').toBe('ShimElement')
    expect(shimMarkers.window, '§3.0 R1/M-1: the shim\'s realm global is an object — which is why `typeof window` cannot discriminate').toBe('object')
    expect(shimMarkers.document, '§3.0 R1/M-1: the shim populates a `document` realm of its own').toBe('object')

    // S2 — the leg's OWN `R1` predicate, RUN against both observations. This is
    // the behavioural row: it is TRUE for the real realm and FALSE for the shim
    // realm (a `typeof window`-only predicate would be TRUE for both and reddens
    // the second assertion).
    const realScope = { elementA: realMarkers.element, displayStyle: realMarkers.style, markerA: realMarkers.window, documentA: realMarkers.document }
    const shimScope = { elementA: shimMarkers.element, displayStyle: shimMarkers.style, markerA: shimMarkers.window, documentA: shimMarkers.document }
    expect(
      runRowPredicate(src, 'R1 real-renderer typed marker', realScope),
      '§3.0 R1: the real realm\'s ELEMENT/RENDERER-API provenance must satisfy the row',
    ).toBe(true)
    expect(
      runRowPredicate(src, 'R1 real-renderer typed marker', shimScope),
      '§3.0 R1/M-1: the SHIM\'s own realm observation must FAIL the row — a predicate that `typeof window` alone satisfies reddens HERE, which is the `G-4` falsifier',
    ).toBe(false)
    // … and the empty/missing-marker fail-states (§3.0 R1: indistinguishable ⇒ a
    // re-scope finding, never a pass).
    expect(
      runRowPredicate(src, 'R1 real-renderer typed marker', { ...realScope, elementA: '' }),
      '§3.0 R1: a missing element marker must fail the row (never "indistinguishable ⇒ pass")',
    ).toBe(false)
    expect(
      runRowPredicate(src, 'R1 real-renderer typed marker', { ...realScope, displayStyle: '' }),
      '§3.0 R1: a missing computed-style marker must fail the row',
    ).toBe(false)

    // S3 — THE REVERT FALSIFIER, stated as the finding states it: the OLD
    // (struck) predicate was the `typeof window`/`typeof document` pair. Run
    // that predicate over the real realm ⇒ TRUE, over the shim realm ⇒ also
    // TRUE. Since `S2` requires the shim realm to be FALSE, the revert cannot
    // pass this row.
    // The revert this row must catch, in the form the leg's OWN reads would carry
    // it: the marker values are STRINGS (`readMarker` returns text), so a reverted
    // predicate reads `markerA`/`documentA`, not the global `window`.
    const oldPredicate = (o: { window: string; document: string }): boolean =>
      o.window === 'object' || o.document === 'object'
    expect(oldPredicate(realMarkers), '§3.0 R1/M-1: the struck `typeof window`/`typeof document` predicate is TRUE on the real realm (why it looked right)').toBe(true)
    expect(
      oldPredicate(shimMarkers),
      '§3.0 R1/M-1: … and TRUE on the SHIM realm too, which is why it must not be the discriminator — with `S2` this makes a revert to it a RED row',
    ).toBe(true)

    // S4 — provenance of the observation (`G-4`'s own requirement: pin the
    // element/renderer-API provenance). The predicates' operands are bound to the
    // leg's OWN framed reads of the probe output, and the `typeof` pair may not
    // be what the discriminating half reads.
    const bindings = src.slice(
      src.search(/const markerA\s*=\s*readMarker\(/),
      src.search(/const height\s*=\s*Number\(heightText\)/) + 'const height = Number(heightText)'.length,
    )
    expect(bindings, '§3.0 R1: the element operand must be the leg\'s framed read of the probe\'s element key').toMatch(
      /const elementA\s*=\s*readMarker\(\s*probeA\.html\.renderedHtml\s*,\s*'element'\s*\)/,
    )
    expect(bindings, '§3.0 R1: the computed-style operand must be the leg\'s framed read of the probe\'s style key').toMatch(
      /const displayStyle\s*=\s*readMarker\(\s*probeA\.html\.renderedHtml\s*,\s*'style'\s*\)/,
    )
    expect(bindings, '§3.0 R1/M-1: the `typeof window`/`typeof document` pair is recorded as a SECONDARY observation').toMatch(
      /const markerA\s*=\s*readMarker\(/,
    )
    expect(bindings, '§3.0 R1/M-1: … and `typeof document` rides alongside it').toMatch(/const documentA\s*=\s*readMarker\(/)
    const r1Call = findRowCall(src, 'R1 real-renderer typed marker')
    expect(r1Call, '§3.0 R1: the row must exist').not.toBeNull()
    expect(
      (r1Call as { args: string[] }).args[1],
      '§3.0 R1/M-1: the discriminating half of the row may not be the PRIMARY/secondary `typeof` pair — the struck marker is not admissible as the asserted half',
    ).not.toMatch(/typeof/)
  })

  it('R2-tally-fals (§3.0 R2 / §1 item 3 / §3.7 RT-6(c)) — the measurement cardinality is a REAL tally whose second increment throws, and the row fails at any count but one', async () => {
    const src = requireLegSource()
    const calls: string[] = []
    // The leg's own `call()` keeps its `MCP_CALLS` bookkeeping (the ledger this
    // assertion reads); only the MCP `Client` it rides is stubbed.
    const api = sandbox({
      src,
      decls: ['measurementCount'],
      declsFull: ['MCP_CALLS', 'probeEnvelope', 'call'],
      fns: ['runProbe', 'dispatchProbe', 'readMarker'],
      globals: {
        Client: class {
          async callTool(req: { name: string }): Promise<{ content: Array<{ text: string }> }> {
            calls.push(req.name)
            const payload =
              req.name === 'provident.get_rendered_html'
                ? { renderedHtml: 'PROBE[measure=427x22;fontSize=16px]PROBE' }
                : { results: [] }
            return { content: [{ text: JSON.stringify(payload) }] }
          }
        },
      },
      exports: ['runProbe', 'dispatchProbe', 'MCP_CALLS'],
    })
    const runProbe = api.runProbe as (c: unknown) => Promise<unknown>
    const ledger = api.MCP_CALLS as string[]
    const client = {
      callTool: (req: { name: string }) => {
        calls.push(req.name)
        const payload =
          req.name === 'provident.get_rendered_html'
            ? { renderedHtml: 'PROBE[measure=427x22;fontSize=16px]PROBE' }
            : { results: [] }
        return { content: [{ text: JSON.stringify(payload) }] }
      },
    }

    // S1 — the FIRST measurement is taken through the leg's OWN channel: the
    // probe is loaded, dispatched and read back over the EXISTING MCP tools.
    await runProbe(client)
    expect(
      ledger,
      '§3.2 item 1/4: the ONE measurement rides the EXISTING MCP surface — `provident.load`, `provident.dispatch`, `provident.get_rendered_html`',
    ).toEqual(['provident.load', 'provident.dispatch', 'provident.get_rendered_html'])
    expect(
      calls,
      '§3.2: the leg\'s own `call()` is what performs them (its ledger and the client both see the three calls)',
    ).toEqual(['provident.load', 'provident.dispatch', 'provident.get_rendered_html'])

    // S2 — the SECOND measurement THROWS (§1 item 3: "A second measurement is a
    // new design decision"; §3.7 RT-6(c): retries may not multiply
    // measurements), and its message carries the LIVE tally. A hard-coded `1` —
    // the `G-4` class — cannot do this: it would report `1` no matter how many
    // probe runs happened, and the refusal would not exist at all.
    let thrown: unknown = null
    try {
      await runProbe(client)
    } catch (e) {
      thrown = e
    }
    expect(
      thrown,
      '§1 item 3/§3.7 RT-6(c): a SECOND measurement must be refused loudly, never counted as the one measurement',
    ).not.toBeNull()
    const message = String((thrown as Error).message)
    expect(message, '§1 item 3: the refusal names the ONE-measurement rule').toMatch(/second measurement|ONE-measurement/)
    expect(
      message,
      '§3.0 R2: the refusal reports the LIVE count (measurement #2) — the tally is incremented at the one measurement site, not read from a literal',
    ).toContain('#2')
    expect(ledger.length, '§1 item 3: the refused second measurement stops before any MCP call is made').toBe(3)

    // S3 — the row's own predicate over the tally: exactly ONE is the pass
    // condition; 0, 2 and 3 are the fail-states (§3.0 R2 "zero measurements, more
    // than one measurement … ⇒ a FINDING, never a measurement").
    expect(runRowPredicate(src, 'R2 measurement taken (exactly ONE)', { measurementCount: 1 }), '§3.0 R2: exactly one ⇒ PASS').toBe(true)
    expect(runRowPredicate(src, 'R2 measurement taken (exactly ONE)', { measurementCount: 2 }), '§3.0 R2: two measurements ⇒ FAIL (the cardinality is pinned, not a lower bound)').toBe(false)
    expect(runRowPredicate(src, 'R2 measurement taken (exactly ONE)', { measurementCount: 0 }), '§3.0 R2: zero measurements ⇒ FAIL (never a silent pass on "no window painted")').toBe(false)
    expect(runRowPredicate(src, 'R2 measurement taken (exactly ONE)', { measurementCount: 3 }), '§3.0 R2: three measurements ⇒ FAIL').toBe(false)

    // S4 — the tally is INCREMENTED at the one measurement site, not merely
    // declared: the increment is inside the function the probe path calls.
    const runProbeSrc = requireFn(src, 'runProbe')
    expect(runProbeSrc, '§3.0 R2/F-4: the ONE measurement site tallies its own run').toMatch(/measurementCount\s*\+=\s*1/)
    expect(runProbeSrc, '§3.0 R2: … and the site is the ONE probe dispatcher, not a second copy of it').toMatch(/dispatchProbe\s*\(/)
  })

  it('R2-frame-fals (§3.0 R2 / §3.2 item 4) — the measured value is the FRAMED readback of the leg\'s own probe output, compared to the dispatched observation', () => {
    const src = requireLegSource()
    const readMarker = makeReadMarker(src)

    // S1 — the leg's OWN probe body, run in the real realm; the framed content
    // it writes is the HTML that `provident.get_rendered_html` returns.
    const real = runProbeBody(src, REAL_RENDERER_REALM)
    const html = real.frame
    const observed = readMarker(html, 'measure')
    expect(observed, '§3.0 R2: the probe\'s framed observation carries the measurement').toMatch(/^\d+x\d+$/)
    expect(observed, '§3.0 R2/§3.2 item 2: the value is arithmetic on the renderer\'s `getBoundingClientRect()` result').toBe('427x22')

    // S2 — the row's own predicate: the framed read must EQUAL the observation and
    // be non-empty (F-14: "the value is asserted through the FRAMED `readMarker`
    // observation, never as a raw substring test").
    const pass = { framedMeasure: observed, observed, framedFontSize: readMarker(html, 'fontSize'), fontSize: '16px' }
    expect(runRowPredicate(src, 'both values visible in the provident.get_rendered_html response', pass), '§3.0 R2: framed == observed (non-empty) ⇒ PASS').toBe(true)
    expect(
      runRowPredicate(src, 'both values visible in the provident.get_rendered_html response', { ...pass, framedMeasure: '' }),
      '§3.0 R2: a value that is NOT visible in the response (empty framed read) ⇒ FAIL — never a pass on an unframed claim',
    ).toBe(false)
    expect(
      runRowPredicate(src, 'both values visible in the provident.get_rendered_html response', { ...pass, framedMeasure: '0x0' }),
      '§3.0 R2: a framed read that disagrees with the observation ⇒ FAIL (a fabricated `0` is a finding, not a measurement)',
    ).toBe(false)
    expect(
      runRowPredicate(src, 'both values visible in the provident.get_rendered_html response', { ...pass, framedFontSize: '' }),
      '§3.0 R2: the non-`\'\'` computed-style value is part of the framed readback too',
    ).toBe(false)

    // S3 — the frame is what makes the readback non-vacuous: a value present in
    // the bytes but NOT inside `PROBE[…]PROBE` does not count (`N-5`'s substring
    // caveat — the leg's own CSS class names make a bare `key=` search collide).
    expect(readMarker('measure=427x22', 'measure'), '§3.0 R2: an UNFRAMED value must read as absent').toBe('')
    expect(readMarker('PROBE[measure=427x22;fontSize=16px]PROBE', 'measure'), '§3.0 R2: a framed value reads back').toBe('427x22')

    // S4 — the SHIM realm cannot produce the measurement: its probe run throws at
    // the layout call, so the second write (the one carrying `measure=`) never
    // happens — which is exactly why the shim side is `UNSUPPORTED` (R3) and why
    // no `0` may ever be fabricated for it.
    const shimRun = runProbeBody(src, SHIM_REALM)
    expect(
      shimRun.threw,
      '§3.4: the shim has no layout — the probe\'s layout call throws rather than returning a `0`',
    ).not.toBeNull()
    expect(String(shimRun.threw), '§3.4/§3.0 R3: the shim\'s signature is its own `getBoundingClientRect is not a function`').toMatch(
      /getBoundingClientRect is not a function/,
    )
    expect(
      shimRun.written.length,
      '§3.2: the shim writes the PROVENANCE block and then throws — its second write (the measurement) never happens, so no shim measurement can exist',
    ).toBe(1)
  })

  it('R3-fals (§3.0 R3 / §3.4) — the recorded status word is DERIVED from the shim\'s own observation, never a constant', () => {
    const src = requireLegSource()

    // The leg's OWN derivation of the status word, extracted (it is an
    // ASSIGNMENT inside the shim-probe try block) and RUN as an expression.
    const derived = src.indexOf('shimStatus = shimElement')
    expect(
      derived,
      '§3.0 R3: the shim leg\'s recorded status must be DERIVED from its own observation (the shim-element/error conditional) — a constant is not a derivation',
    ).toBeGreaterThanOrEqual(0)
    const expr = src.slice(src.indexOf('=', derived) + 1, src.indexOf('\n', derived)).trim()
    expect(expr, '§3.0 R3: the derivation is a conditional EXPRESSION over the shim observation').toMatch(/\?/)
    expect(expr, '§3.0 R3: … over the shim\'s element class and its thrown layout error').toMatch(/shimElement|shimError/)

    const statusFrom = (shimElement: string, shimError: string): string =>
      runExtractedExpression(expr, { shimElement, shimError, shimStatus: 'UNSET' }) as string

    // S1 — the two shim observations §3.0 R3/M-1 pin ⇒ the pinned word.
    expect(
      statusFrom('ShimElement', 'el.getBoundingClientRect is not a function'),
      '§3.0 R3/§3.4: the shim\'s element class + its throwing layout call ⇒ the recorded word is exactly `UNSUPPORTED`',
    ).toBe('UNSUPPORTED')
    expect(
      statusFrom('ShimElement', '(no error reported)'),
      '§3.0 R3/§3.4: the element class ALONE is sufficient — the word follows the shim observation',
    ).toBe('UNSUPPORTED')
    expect(
      statusFrom('HTMLDivElement', 'el.getBoundingClientRect is not a function'),
      '§3.0 R3: the throwing layout call alone is sufficient',
    ).toBe('UNSUPPORTED')

    // S2 — the fail-states: a REAL element class with no layout error is NOT the
    // shim ⇒ no `UNSUPPORTED` (a constant would answer `UNSUPPORTED` here too).
    expect(statusFrom('HTMLDivElement', '(no error reported)'), '§3.0 R3: a real-renderer observation is NOT the shim status').not.toBe('UNSUPPORTED')

    // S3 — the ROW consumes the RECORDED value (`shimStatus === 'UNSUPPORTED'`,
    // §3.0 R3: "the row asserts the RECORDED status string, not a constant"):
    // the recorded word passes, and every word in §3.4's forbidden set fails.
    expect(runRowPredicate(src, 'R3 shim leg recorded with the exact word UNSUPPORTED', { shimStatus: 'UNSUPPORTED' }), '§3.0 R3: the pinned word ⇒ PASS').toBe(true)
    for (const forbidden of ['divergent', 'matching', 'pass', 'n/a', '0', '', 'unsupported', 'UNSUPPORTED ']) {
      expect(
        runRowPredicate(src, 'R3 shim leg recorded with the exact word UNSUPPORTED', { shimStatus: forbidden }),
        `§3.0 R3/§3.4: the recorded status \`${forbidden}\` is forbidden — the row must FAIL it (a fabricated \`0\` is a finding, not a measurement)`,
      ).toBe(false)
    }

    // S4 — and the row may not be an unconditional pass: its predicate is not the
    // literal `true`/`false` (a `row(..., true, ...)` — F-5's defect — reddens here
    // and at every assertion above).
    const call = findRowCall(src, 'R3 shim leg recorded with the exact word UNSUPPORTED')
    expect(call, '§3.0 R3: the row must exist').not.toBeNull()
    expect((call as { args: string[] }).args[1], '§3.0 R3: the row\'s condition is the recorded status, never a literal').not.toMatch(/^(true|false)$/)
  })

  it('R4-fals (§3.0 R4 / §3.3 G-3) — the static row runs the pinned CALL-SITE SET (comments stripped), and the honest-limits PROSE is neither its subject nor a false red', () => {
    const src = requireLegSource()

    // S1 — the pinned set, extracted and RUN: it is exactly the three call sites
    // §3.0 R4 names (the packaged-mode predicate, the renderer-eval call and the
    // CDP call). A dropped member reddens every assertion that needs it.
    const api = sandbox({
      src,
      decls: ['APP_CLAIM_CALL_SITES'],
      exports: ['APP_CLAIM_CALL_SITES'],
    })
    const sites = api.APP_CLAIM_CALL_SITES as string[]
    expect(
      sites,
      '§3.0 R4/G-3: the pinned static check is a SET of call sites — the packaged-mode predicate, `webContents.executeJavaScript` and `webContents.debugger`',
    ).toEqual(['app.isPackaged', 'webContents.executeJavaScript', 'webContents.debugger'])

    // S2 — the scanner that the row actually uses, extracted and RUN. It is what
    // makes the prose question moot: a call site in a COMMENT is removed, a call
    // site in CODE survives, and a template/string literal is code (it is part of
    // the program).
    const stripper = requireFnLike(src, 'codeWithoutComments')
    const codeWithoutComments = new Function(`${stripper}\nreturn codeWithoutComments`)() as (s: string) => string
    expect(
      codeWithoutComments('// a docstring naming app.isPackaged and a packaged bundle\nconst x = 1;\n'),
      '§3.0 R4: a call site named in a COMMENT is not a call site — the comment is removed before the scan',
    ).not.toContain('app.isPackaged')
    expect(
      codeWithoutComments('/* webContents.executeJavaScript / webContents.debugger */ const x = 1;\n'),
      '§3.0 R4/G-3: the leg\'s own prose names both leg-only fallbacks; the block comment is removed',
    ).not.toMatch(/executeJavaScript|\.debugger/)
    expect(codeWithoutComments('const a = 1; const b = "app.isPackaged";\n'), '§3.0 R4: a STRING literal is part of the program — it survives the strip').toContain(
      'app.isPackaged',
    )
    expect(
      codeWithoutComments('const w = app.isPackaged();\n'),
      '§3.0 R4: a REAL call site survives the strip — a break that adds one is caught by the scan',
    ).toContain('app.isPackaged')
    expect(
      codeWithoutComments('await webContents.executeJavaScript("1+1");\n'),
      '§3.0 R4: … and the renderer-eval call site does too',
    ).toContain('webContents.executeJavaScript')
    expect(codeWithoutComments('const s = webContents.debugger;\n'), '§3.0 R4: … and the CDP call site').toContain('webContents.debugger')

    // S3 — the row's claim, run over the LANDED leg: zero of the three pinned
    // sites appear in its CODE. (This is the assertion the OLD row approximated
    // with a single regex, and it is the one a break must redden.)
    const legCode = codeWithoutComments(src)
    const found = sites.filter((s) => legCode.includes(s))
    expect(found, '§3.0 R4: the landed leg contains NONE of the pinned call sites in its code').toEqual([])

    // S4 — WHY the old phrase-level form was a guaranteed FALSE RED: the
    // honest-limits statement §3.0 R4 requires the leg to PRINT legitimately
    // contains the word "packaged" (its own prose refuses the app-level claim),
    // and the leg's header comment names both leg-only fallbacks. A
    // `must-not-contain "packaged"` row would therefore fail on a correct leg —
    // while the call-site set ignores prose by construction.
    const honest = extractDeclFull(src, 'HONEST_LIMITS')
    expect(
      honest,
      '§3.0 R4/§3.3: the honest-limits statement is the leg\'s own printed prose — a renamed/removed one fails this row',
    ).not.toBeNull()
    expect(honest as string, '§3.0 R4/§3.3 C-1: the honest-limits statement is the leg\'s own printed prose').toMatch(/packaged/)
    expect(
      honest as string,
      '§3.0 R4/G-3: the prose is a STRING (a declaration), so the scan never sees it — the word "packaged" is neither evidence for nor against the row',
    ).not.toMatch(/isPackaged/)
    expect(src, '§3.0 R4/G-3: the leg\'s raw text DOES name the pinned names in comments — proof the phrase-level form was vacuous/false-red').toMatch(
      /app['"],\s*['"]isPackaged|isPackaged/,
    )

    // S5 — the row's own predicate over a fabricated scan result: a found call
    // site fails it. (The break the row must catch: a real call site added to the
    // leg's code ⇒ `appClaimSites.length === 0` is false ⇒ RED.)
    expect(
      runRowPredicate(src, 'R4 no app-level claim', { appClaimSites: [], legCode: 'x', APP_CLAIM_CALL_SITES: sites }),
      '§3.0 R4: no pinned call site in the code ⇒ PASS',
    ).toBe(true)
    expect(
      runRowPredicate(src, 'R4 no app-level claim', { appClaimSites: ['app.isPackaged'], legCode: 'x', APP_CLAIM_CALL_SITES: sites }),
      '§3.0 R4: ONE pinned call site in the leg\'s code ⇒ FAIL (the row is a set check over the code, not a phrase check over the file)',
    ).toBe(false)
  })
})
