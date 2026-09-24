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
  // -------------------------------------------------------------------------
  const LANDED_SCRIPT_KEYS = [
    'clean',
    'build',
    'build:watch',
    'start',
    'start:http',
    'typecheck',
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
      '§2 item 3/§8 N-8: `ui` is the ONE additive key — no other script key may appear in this unit',
    ).toEqual(['ui'])
    expect(
      Object.keys(scripts).length,
      '§2 item 3: the scripts block is the landed set PLUS exactly the one `ui` key',
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
