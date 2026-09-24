// scripts/electron-ui.mjs — the `npm run ui` leg: the REAL-DOM MEASUREMENT leg
// for unit `U-REALDOM-BOOT` (wave C). Contract: docs/specs/ci-ui-leg.md.
//
// WHAT THIS LEG IS, in the spec's own sentence (§1): "the `ui` leg exists so
// that a real-DOM claim can be made at all." It is an OBSERVATIONAL/
// MEASUREMENT leg, NOT an identity leg: `divergence` is an identity check
// (shim ≡ real on N = 9 pinned structural properties); `ui` takes ONE real
// measurement of a property no other leg can see. The two never merge
// (§1 item 1, H-r18).
//
// FIVE ROWS (§3.0), four of them about the leg's OWN honesty:
//   R0  ISOLATION across TWO scratch temp profiles: `tools/list` identical
//       across the two boots, `provident.list_targets`' census AND nodeId
//       vocabulary identical across the two boots, and neither boot resolving
//       its store under the default/real `userData` directory.
//   R1  REAL and DISTINGUISHABLE from the shim leg by a TYPED marker whose
//       DISCRIMINATING half is the ELEMENT/RENDERER-API PROVENANCE (the
//       observed element's constructor name and the computed style's class
//       name — §3.0 R1 as RE-PINNED 2026-09-27, AMENDMENT BLOCK M-1), with the
//       same probe attempted on the shim leg (the battery host) recorded
//       alongside. `typeof window`/`typeof document` are SECONDARY observations
//       and are never the sole basis of this row (the shim also populates a
//       `document` realm — adversarial seed U-11).
//   R2  ONE real measurement: an element measured inside the REAL renderer
//       (a layout rect + a resolved computed style in the renderer realm),
//       whose value comes back
//       over the existing `provident.get_rendered_html`. Pinned shape:
//       `width > 0 && height > 0` AND a non-'' computed-style value.
//       The window never paints ⇒ FAIL LOUDLY, NEVER RECORD `0`. The
//       measurement COUNT is a real tally of the probe runs (never a literal).
//   R3  the shim leg is recorded `UNSUPPORTED` (never `divergent`, never a
//       fabricated `0`): the shim is not a browser — no layout, no rect
//       semantics, no resolved computed style. The row asserts the RECORDED
//       status string (§3.4's word set), not a constant.
//   R4  the honest-limits statement (§1.13, verbatim-in-substance) plus the
//       static row that this leg contains no call that could be mistaken for
//       an app-level claim.
//
// MEASUREMENT CHANNEL (§3.2, pinned): the probe is a provident HANDLER BODY
// loaded through the EXISTING `provident.load` and driven by the EXISTING
// `provident.dispatch`; the body reads a layout rect and a resolved computed
// style in the real renderer's realm and writes the value into
// graph content (a `content` write on an authored node), so it comes back over
// the EXISTING `provident.get_rendered_html`. No new MCP tool, no new group,
// `ALL_TOOLS` untouched. The leg-only fallbacks named in §3.2
// (`webContents.executeJavaScript`, then CDP via `webContents.debugger`) are NOT
// used by this leg — this path is the preferred channel. If a fallback were ever
// needed it is admissible ONLY as a recorded fallback, never as an MCP tool (an
// MCP-visible "eval in the renderer" tool is a self-granting capability breach).
//
// RETRY POLICY (§3.7 `RT-1`…`RT-9`, architect-ruled 2026-09-27): a boot attempt
// whose CHILD-PROCESS BOOTSTRAP dies before the MCP handshake resolves may be
// re-attempted, bounded and recorded. The retry is LEG-LOCAL (§RT-9: the
// shared helper carries no retry and the divergence leg's behaviour is
// untouched); eligibility is by OBSERVED FAILURE SIGNATURE (§RT-1: the child's
// raw `(code, signal)` pair AND the handshake not having resolved — never a
// `stderr` substring, never "the boot threw", never "the run ended non-zero");
// the bound is 4 attempts PER BOOT with a FRESH scratch profile per attempt
// (§RT-3); the backoff is the fixed table 250/500/1000 ms with no jitter
// (§RT-4); every attempt is recorded with its signature verbatim (§RT-5); a
// green reached on a retry is LABELLED `attempt=<k>` / `retries=<k-1>`
// (§RT-6); exhaustion exits `1` with every attempt's signature and the
// statement that no measurement was taken (§RT-7); and the precondition +
// DISPLAY steps sit OUTSIDE the retry boundary (§RT-8/§RT-3).
// CONFIG, recorded so an operator can find it (§RT-4 item 2/3, the leg's own
// idiom; also recorded in docs/decisions.md):
//   PROVIDENT_UI_BOOT_ATTEMPTS   attempts per boot, integer 1..4, default 4
//                                (an operator may LOWER it, never RAISE it)
//   PROVIDENT_UI_BOOT_TIMEOUT_MS per-attempt handshake timeout, integer >= 1,
//                                default 30000 (the host's own readiness bound)
// A malformed value is a PROGRAMMING ERROR ⇒ exit 1, never a silent clamp
// (§RT-4 item 4 / §RT-2 class 5).
//
// ADVERSARIAL PASS (2026-09-27, eighth pass — docs/specs/ci-ui-leg.md §3b), the
// leg-local fixes landed here, so a later reader can see them without the record:
//   G-1 the DISPLAY prerequisite is decided on the LEG'S OWN observation of the
//       operator's environment (`operatorDisplay`, read before the precondition
//       is spawned), and the precondition no longer MANUFACTURES a display the
//       operator does not have: `runDivergence` spawns the divergence leg with
//       the operator's own env, never `electronEnv()`'s `DISPLAY || ':0'`.
//       §3.1's AUTHORITY order is unchanged — a red precondition still exits `2`
//       before the display step is decided (the residual, recorded honestly at
//       the precondition's red branch: the divergence leg's OWN pinned env still
//       manufactures `:0` for its Electron child, and that file is not this
//       unit's to edit — §5.4 `PRE-4`).
//   G-2 `R0`(c) now OBSERVES the operator profile it prints about: a read-only
//       before/after of the candidate operator-profile paths (existence + the
//       two store files' presence/mtime — NEVER their contents) is recorded.
//   G-3 `R4`'s static row scans this file's CODE (comments stripped) for the
//       three pinned call sites as a SET, and its printed text says exactly that.
//   G-6 the exit hook's state (`activeBoot`, `cleanupReported`) is declared
//       BEFORE the hook is registered, so the hook is structurally TDZ-safe (no
//       `typeof` guard over a later `let`).
//   G-7 the printed per-boot ceiling reflects THIS configuration's timeout knob,
//       and the knob's lack of an upper bound is stated in the output.
//
// EXIT CODES (§3.6, closed vocabulary — no failure may become a skip, a `0` or
// a green): 0 every declared row passed (a retried green is still 0, LABELLED)
// · 1 a measurement row failed, a post-handshake/spawn failure, a programming
// error, or BOOTSTRAP EXHAUSTION (`RT-7`) · 2 PRECONDITION-FAILED (divergence
// not green for the same built tree; no measurement taken, never a retry case)
// · 3 PREREQUISITE ERROR (no display, decided before any boot, never a retry
// case).
//
// Run: npm run build && node scripts/electron-ui.mjs   (== `npm run ui`)
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
// §2.1 item 1 — the shared Electron-spawn helper (scripts/electron-spawn.mjs).
// Both legs import the SAME module; the base argument vector (including
// `--disable-dev-shm-usage`) and the fresh scratch `--user-data-dir` pair live
// there and are never dropped (§2.1 item 3). §2.1 item 2 — the scratch-profile
// facility (`makeFreshProfile`) and its cleanup (`cleanupProfiles`) live there
// too: this leg uses them rather than a second implementation, which also gives
// §3.7 `RT-3`'s exact requirement — ONE FRESH PROFILE PER ATTEMPT.
//
// §3.7 `RT-9` — the retry is LEG-LOCAL: imported below is the helper's landed
// contract ONLY. The helper deliberately exposes no retry
// (`spawnProfile`/`spawnElectron` are single-shot) and this leg does not ask it
// to carry one: the helper-carried retry is a RECORDED OPTION whose owner is
// `U-DIVERGENCE-EXT`, not this unit.
import { ChildProcessTransport, cleanupProfiles, electronEnv, makeFreshProfile, repoRoot, spawnElectron, stdioWiring } from './electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const batteryHost = join(root, 'dist', 'main', 'battery-host.mjs')
const mainBundle = join(root, 'dist', 'main', 'main.cjs')
// The §5 precondition's leg: `scripts/electron-divergence.mjs` — the script
// behind `npm run divergence`. Declared here with the other leg paths; the
// precondition is run (and its verdict consumed) as §3.1's step 2, before this
// leg creates any per-boot scratch profile of its OWN (the divergence leg's own
// per-boot profiles are that file's scope, not this leg's) and before the
// measurement probe of step 6. G-13: the previous wording of this comment claimed
// the precondition ran "BEFORE any scratch profile exists", which is not what the
// run does — the leg's own run tree is created above, and the precondition's child
// creates scratch profiles of its own while it runs.
const divergenceLeg = join(root, 'scripts', 'electron-divergence.mjs')

// The ONE additive startup flag the leg passes to the app (§4.2 ADD-2/ADD-3):
// a `--`-prefixed argument on the process's own command line, parsed by the
// same argv-scan idiom as `--mcp-transport=`/`--mcp-port=`. It only RELOCATES
// the user-data root for THIS boot; it flips no security default (§3.5 SEAM-4).
const USER_DATA_FLAG = '--provident-user-data='

// The groups the leg seeds into its OWN scratch store (§3.2): the store it
// writes enables `read` + `dispatch` (the landed defaults), `graph` (the
// EXISTING `provident.load` lives in that group) and `code`. This is an
// operator-equivalent action on a THROWAWAY file inside the leg's scratch
// profile — it may NEVER be done against the operator's real profile (§3.2,
// §4.3, adversarial seed U-3). The seed's non-default content is also what
// makes `R0`(c) FALSIFIABLE: `code` is OFF by default, so the boot can only
// expose the code-group tools if it actually READ this seeded store (§3.0 R0
// fail state: "the seam is not doing its job or is not being honoured").
const SCRATCH_GROUPS = ['read', 'dispatch', 'graph', 'code']

// ---- §3.7 `RT-4`: the retry budget, the backoff table, the timeout ---------
/** §3.7 `RT-3` — the attempt bound for ONE boot (1 initial attempt + up to 3
 *  retries). The single named constant the row pins. */
const UI_BOOT_ATTEMPTS_DEFAULT = 4
/** §3.7 `RT-4` — the pinned maximum. The operator may LOWER the count through
 *  `PROVIDENT_UI_BOOT_ATTEMPTS`; nothing may raise it above this. */
const UI_BOOT_ATTEMPTS_MAX = 4
/** §3.7 `RT-4` item 1 — the BACKOFF TABLE, fixed and deterministic (no
 *  randomness, no jitter, and NOT an exponential expression): the wait before
 *  retry attempt k = 2, 3, 4. The sequence IS the contract. */
const UI_BOOT_BACKOFF_MS = [250, 500, 1000]
/** §3.7 `RT-4` item 3 — ONE attempt's handshake must complete within this
 *  bound. ADOPTED from the host's own readiness bound (`readyTimeoutMs ??
 *  30000`, `src/main/mcp-server.ts:914`) so the two cannot disagree. */
const UI_BOOT_TIMEOUT_MS_DEFAULT = 30000
/** `R0`(b) — the bounded quiescence read used for the census/nodeId surfaces
 *  (see `isolationSurface`): the reads never take a measurement, they only wait
 *  for the boot's load to settle. */
const UI_SETTLE_READS_MAX = 8
const UI_SETTLE_DELAY_MS = 100

/** `RT-1`(i) — the bounded grace window used ONLY to READ the child's
 *  termination observation after a failure has already been seen (a dying child's
 *  stdio closes before its `exit` event, so the transport error can arrive
 *  first). It is not part of the attempt budget and never triggers a retry. */
const UI_BOOT_TERMINATION_GRACE_MS = 2000
/** §3.7 `RT-4` item 4 — the per-BOOT wall-clock CEILING, DERIVED (not a new
 *  constant): 4 attempts × 30 000 ms + the 250 + 500 + 1000 ms backoff =
 *  121 750 ms. Exceeding it mid-retry is EXHAUSTION (`RT-7`). */
const UI_BOOT_CEILING_MS = UI_BOOT_ATTEMPTS_MAX * UI_BOOT_TIMEOUT_MS_DEFAULT
  + UI_BOOT_BACKOFF_MS.reduce((a, b) => a + b, 0)

/** §3.7 `RT-4` items 2 + 3 (+ `RT-2` class 5) — read the operator's retry
 *  configuration. A MALFORMED value is a PROGRAMMING ERROR: it exits `1` and is
 *  NEVER silently clamped (a clamped bound would be an invisible flake-policy
 *  change). The range check lives here, so `> 4` is unreachable by construction. */
function readRetryConfig() {
  const attemptsRaw = process.env.PROVIDENT_UI_BOOT_ATTEMPTS
  let attempts = UI_BOOT_ATTEMPTS_DEFAULT
  if (attemptsRaw !== undefined && attemptsRaw !== '') {
    if (!/^\d+$/.test(attemptsRaw)) {
      throw new Error(`PROVIDENT_UI_BOOT_ATTEMPTS="${attemptsRaw}" is malformed: expected an integer in 1..${UI_BOOT_ATTEMPTS_MAX} (RT-4 item 2)`)
    }
    attempts = Number(attemptsRaw)
    if (attempts < 1 || attempts > UI_BOOT_ATTEMPTS_MAX) {
      throw new Error(`PROVIDENT_UI_BOOT_ATTEMPTS=${attempts} is out of the admissible range 1..${UI_BOOT_ATTEMPTS_MAX}: the operator may LOWER the retry count, never RAISE it (RT-4 item 2)`)
    }
  }
  const timeoutRaw = process.env.PROVIDENT_UI_BOOT_TIMEOUT_MS
  let timeoutMs = UI_BOOT_TIMEOUT_MS_DEFAULT
  if (timeoutRaw !== undefined && timeoutRaw !== '') {
    if (!/^\d+$/.test(timeoutRaw)) {
      throw new Error(`PROVIDENT_UI_BOOT_TIMEOUT_MS="${timeoutRaw}" is malformed: expected a positive integer of milliseconds (RT-4 item 3)`)
    }
    timeoutMs = Number(timeoutRaw)
    if (timeoutMs < 1) {
      throw new Error(`PROVIDENT_UI_BOOT_TIMEOUT_MS=${timeoutMs} is malformed: a per-attempt handshake timeout must be >= 1 ms (RT-4 item 3)`)
    }
  }
  return { attempts, timeoutMs }
}

/** §3.7 `RT-4` item 4 (adversarial finding G-7) — the per-boot wall-clock ceiling
 *  FOR THE CONFIGURATION THIS RUN ACTUALLY HAS. The pinned constant
 *  `UI_BOOT_CEILING_MS` is derived from `UI_BOOT_ATTEMPTS_MAX` and the DEFAULT
 *  timeout (and, by the third pass's `B3-1` pin, deliberately NOT from the
 *  operator's attempt count — lowering the count does not lower the ceiling), so
 *  the ONLY knob that can move the effective budget is the per-attempt handshake
 *  timeout. With the default timeout this returns the pinned constant exactly
 *  (4 × 30 000 + 250 + 500 + 1000 = 121 750 ms), which is why the default run's
 *  printed line is unchanged. A raised timeout has no upper bound (see
 *  `readRetryConfig`) and is reported as what it is in the run's own output. */
function ceilingForConfig(cfg) {
  return UI_BOOT_ATTEMPTS_MAX * cfg.timeoutMs + UI_BOOT_BACKOFF_MS.reduce((a, b) => a + b, 0)
}

/** §1.13's honest-limits statement, printed verbatim-in-substance by `R4`
 *  (§3.0 R4 / §3.3): what a `ui` green proves, and that it proves nothing else. */
const HONEST_LIMITS =
  'R4 HONEST LIMITS: a `ui` green proves that a specific probe, executed inside ONE real Electron renderer boot under a controlled profile, produced the asserted value — and nothing else. It is NOT a proof that the packaged app behaves this way (the leg boots the dev tree, not a distribution), NOT app-green from node-green, NOT any MCP-contract property obtained outside the MCP surface, NOT that provident.dispatch is a real gesture (it carries an event name, no coordinates), NOT that get_rendered_html observes layout (it reads mount.innerHTML), NOT that the shim is now faithful (the shim is demoted to pre-filter and is recorded UNSUPPORTED for this measurement), and NOT a rendered-geometry proof, an IPC proof, or a proof that any particular attribute row passes.'

/** §3.0 `R4`'s pinned static check, as a SET OF CALL SITES (adversarial finding
 *  G-3). §3.0 R4 names four things a `ui` leg may not contain: a reference to a
 *  packaged bundle, a packaged-mode predicate, an app-green assertion, and a
 *  `webContents.executeJavaScript`/CDP call in a shipped path. The first two are
 *  the same call site here, and the renderer-eval half is `executeJavaScript` +
 *  its CDP route — so the checkable set is these THREE names.
 *
 *  WHY THE SET, NOT A PHRASE: this file's own honest-limits prose (§3.3 C-1)
 *  legitimately contains the word `packaged`, and its header comment names both
 *  leg-only fallbacks (§3.2) — neither is a call site, and a phrase-level scan is
 *  a guaranteed false red. So the row scans the leg's CODE (comments stripped,
 *  `codeWithoutComments`) for these names, and the patterns are ASSEMBLED FROM
 *  PARTS so that the pinned names are not themselves spelled out literally in this
 *  file's source text. That last property is what keeps the row honest rather than
 *  self-satisfying: the scan can never be satisfied by (or trip over) its own
 *  pattern list, and a future edit that adds a real call site is caught. */
const APP_CLAIM_CALL_SITES = [
  // the packaged-bundle / packaged-mode predicate (Electron's own packaged flag)
  ['app', 'isPackaged'].join('.'),
  // §3.2 fallback 1 — evaluate JavaScript inside the real renderer
  ['webContents', 'executeJavaScript'].join('.'),
  // §3.2 fallback 2 — CDP over a debugger session on the renderer
  ['webContents', 'debugger'].join('.'),
]

/** This leg's OWN source with its COMMENTS removed, offsets preserved (every
 *  comment character becomes a space; newlines are kept). `R4`'s static row must
 *  scan the leg's CODE, never its prose (G-3). String and template literals are
 *  kept verbatim — they are part of the program — and a comment marker inside one
 *  is therefore not a comment start. Template `${…}` interpolations are tracked
 *  by brace depth so the walk returns to template mode at the MATCHING `}`
 *  (the naive version gets stuck in the first interpolation and swallows the rest
 *  of the file, which would silently turn a forbidden call site into a pass).
 *  Regex literals are not modelled: none of this leg's carry a comment marker. */
function codeWithoutComments(src) {
  const out = src.split('')
  const stack = []
  const interpolationDepths = []
  let depth = 0
  let mode = 'code'
  for (let i = 0; i < src.length; i += 1) {
    const c = src[i]
    const n = src[i + 1]
    if (mode === 'line') {
      if (c === '\n') mode = stack.pop() ?? 'code'
      else out[i] = ' '
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        out[i] = ' '
        out[i + 1] = ' '
        i += 1
        mode = stack.pop() ?? 'code'
        continue
      }
      if (c !== '\n') out[i] = ' '
      continue
    }
    if (mode === 'single' || mode === 'double' || mode === 'template') {
      if (c === '\\') {
        i += 1
        continue
      }
      if (mode === 'template' && c === '$' && n === '{') {
        depth += 1
        interpolationDepths.push(depth)
        mode = 'code'
        i += 1
        continue
      }
      if ((mode === 'single' && c === "'") || (mode === 'double' && c === '"') || (mode === 'template' && c === '`')) {
        mode = stack.pop() ?? 'code'
      }
      continue
    }
    if (c === '/' && n === '/') {
      stack.push('code')
      mode = 'line'
      out[i] = ' '
      continue
    }
    if (c === '/' && n === '*') {
      stack.push('code')
      mode = 'block'
      out[i] = ' '
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      stack.push('code')
      mode = c === "'" ? 'single' : c === '"' ? 'double' : 'template'
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
  return out.join('')
}

// ---- the five rows (§3.0) --------------------------------------------------
let failures = 0
/** The row set the summary line's arithmetic is derived from: every `row(...)`
 *  call site is tallied, so the headline can never print `4/5` or `-1/5`
 *  (adversarial finding F-9 — the arithmetic is a real count, not a literal). */
let rowsChecked = 0
/** Report one row of this leg's declared row set. Every row prints its own
 *  labelled line (§3.0): a failure is a named row, never a silent skip. */
function row(label, cond, detail = '') {
  rowsChecked += 1
  if (cond) console.log(`  ✓ ${label}${detail ? ` (${detail})` : ''}`)
  else {
    failures += 1
    console.error(`  ✗ ${label}${detail ? ` (${detail})` : ''}`)
  }
}

async function call(client, name, args = {}) {
  MCP_CALLS.push(name)
  const r = await client.callTool({ name, arguments: args })
  return JSON.parse(r.content[0].text)
}

/** Read one value out of the rendered HTML (the graph content read back over
 *  the EXISTING `provident.get_rendered_html`). The probe frames its observation
 *  between `PROBE[` and `]PROBE` and writes it into graph content as
 *  `key=value;key=value…`; this reads ONE framed key out of that block. (The
 *  frame matters: a bare `key=` search collides with the leg's own CSS class
 *  names, e.g. `ui-probe-out` contains `probe-o`, and a substring match would be
 *  a false positive — `N-5`'s `counterPresent` caveat.) */
function readMarker(html, key) {
  const block = html.match(/PROBE\[([^\]]*)\]PROBE/)
  if (block === null) return ''
  const m = block[1].match(new RegExp(`(?:^|;)${key}=([^;]*)`))
  return m === null ? '' : m[1].trim()
}

// ---- the probe envelope (the ONE measurement probe) -------------------------
// The probe is a provident handler BODY (§3.2 item 1): loaded through the
// EXISTING `provident.load`, driven by the EXISTING `provident.dispatch`. The
// body executes in the renderer realm (the engine compiles a handler body AT THE
// CALL SITE), so the REAL renderer's realm types and its DOM geometry /
// computed-style APIs are what it observes.
//
// The probe writes its observation into graph content in TWO steps, and the
// FIRST step is the `R1` typed provenance marker:
//   1. the TYPED realm marker (§3.0 R1 as re-pinned): the element's CONSTRUCTOR
//      name and the computed style's CLASS name are the DISCRIMINATING half —
//      a real renderer reports `HTMLDivElement` / `CSSStyleDeclaration`; a DOM
//      shim reports its own `ShimElement` and THROWS before any style exists
//      (`el.getBoundingClientRect is not a function`). `typeof window` /
//      `typeof document` ride ALONGSIDE as secondary observations only, because
//      the shim populates a `document` realm of its own (adversarial seed
//      U-11): they are never the sole basis of the row.
//   2. the ONE measurement — `getBoundingClientRect()` and `getComputedStyle(el)`
//      in that realm, written into the SAME node's content. On the shim this
//      step THROWS: the shim has no layout, which is why the shim leg is
//      recorded `UNSUPPORTED` (§3.4) and why the shim can never fabricate a `0`
//      for this row.
// The write rides `clientAPI.apply` — the managed mutation channel — so the
// value comes back over the EXISTING `provident.get_rendered_html` (§3.2 item 4).
function probeEnvelope() {
  const body = `function (ctx) {
    const el = document.getElementById('ui-probe-target')
    const node = ctx.tree.allNodes().find(function (x) { return x && x.props && x.props.id === 'ui-probe-out' })
    if (!node) return
    const base = 'window=' + (typeof window) + ';document=' + (typeof document) +
      ';element=' + (el ? (el.constructor && el.constructor.name) : 'none')
    ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: 'PROBE[' + base + ']PROBE' }])
    const rect = el.getBoundingClientRect()
    const style = getComputedStyle(el)
    ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: 'PROBE[' + base +
      ';style=' + (style && style.constructor && style.constructor.name) +
      ';display=' + style.display +
      ';measure=' + Math.round(rect.width) + 'x' + Math.round(rect.height) +
      ';fontSize=' + style.fontSize + ']PROBE' }])
  }`
  return {
    template: { root: { type: 'div', css: { id: 'ui-probe-root', classes: ['ui-probe-shell'] }, children: [
      { type: 'div', css: { id: 'ui-probe-target', classes: ['ui-probe-target'] }, props: { id: 'ui-probe-target' }, content: 'measure me' },
      { type: 'button', css: { id: 'ui-probe-run', classes: ['btn'] }, content: 'Measure', handlers: [{ name: 'ui-probe-run', event: 'click', body }] },
      { type: 'div', css: { id: 'ui-probe-out', classes: ['ui-probe-out'] }, props: { id: 'ui-probe-out' }, content: '(no measurement yet)' },
    ] } },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
    uiProbeTarget: 'ui-probe-target',
  }
}

/** The measurement TALLY (§3.0 R2 / §1 item 3 / §3.7 `RT-6`(c)): a REAL count
 *  of the probe runs, never a hard-coded claim. It is incremented at the ONE
 *  site that dispatches the measurement probe, so a retry (or any second probe
 *  site) that measured twice is caught by `measurementCount === 1` rather than
 *  hidden by it. */
let measurementCount = 0
const MCP_CALLS = []

/** Dispatch the probe in ONE realm and read the framed observation back over the
 *  EXISTING `provident.get_rendered_html`. This is the raw channel, shared by the
 *  measurement (boot A) and the recorded shim attempt, so neither caller
 *  duplicates it. */
async function dispatchProbe(client) {
  await call(client, 'provident.load', { kind: 'envelope', envelope: probeEnvelope() })
  const dispatched = await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'ui-probe-run' }, event: 'click' })
  const html = await call(client, 'provident.get_rendered_html', {})
  return { dispatched, html, observed: readMarker(html.renderedHtml, 'measure') }
}

/** THE measurement site (§3.0 R2 / §1 item 3): the ONE probe whose value is this
 *  leg's measurement. Its call TALLIES the measurement — a real count at the
 *  single measurement call site, never a hard-coded claim (F-4) — so a second
 *  measurement (from a retry, or from any new call site) fails the
 *  `measurementCount === 1` row LOUDLY instead of being hidden by a literal.
 *  §3.7 `RT-6`(c): the measurement is taken in the ACCEPTED boot A only, and a
 *  measurement produced during a rejected attempt is neither counted nor
 *  retained. The recorded SHIM attempt drives `dispatchProbe` directly: its
 *  observation is a status record for `R1`/`R3`, never a measurement. */
async function runProbe(client) {
  measurementCount += 1
  if (measurementCount > 1) {
    throw new Error(`a second measurement was attempted (measurement #${measurementCount}): the ONE-measurement rule is exact (§1 item 3, §3.0 R2, §3.7 RT-6(c)) — retries may not multiply measurements`)
  }
  return dispatchProbe(client)
}

/** `R0`(a)/(b): load the SAME envelope in a boot so both boots under comparison
 *  hold the SAME graph state, then read the census + nodeId vocabulary. Identical
 *  across two boots means the app's graph does not depend on which scratch
 *  profile it ran under. No probe is dispatched here: boot B takes NO measurement
 *  (§1 item 3 — ONE measurement, taken in boot A). */
async function loadSameEnvelope(client) {
  return call(client, 'provident.load', { kind: 'envelope', envelope: probeEnvelope() })
}

/** The census + nodeId vocabulary comparison surface for `R0`(a)/(b). */
async function isolationSurfaceOnce(client) {
  const html = await call(client, 'provident.get_rendered_html', {})
  const targets = await call(client, 'provident.list_targets', {})
  return {
    census: html.census,
    nodeIds: targets.nodes.map((n) => n.nodeId).sort().join('|'),
  }
}

/** The census + nodeId vocabulary comparison surface for `R0`(a)/(b), read on a
 *  QUIESCENT graph. The renderer settles a requested load asynchronously, so a
 *  single read can catch the pre-settlement state (the boot's own graph, or a
 *  partly-minted one) and comparing two such reads compares two DIFFERENT graph
 *  states — a false inequality that says nothing about isolation. This reads
 *  until two consecutive reads agree (bounded), which is what "the two boots
 *  hold the same graph state" (§3.0 R0) means for a live renderer. */
async function isolationSurface(client) {
  let previous = await isolationSurfaceOnce(client)
  for (let i = 0; i < UI_SETTLE_READS_MAX; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, UI_SETTLE_DELAY_MS))
    const next = await isolationSurfaceOnce(client)
    if (next.census.registered === previous.census.registered
      && next.census.inTree === previous.census.inTree
      && next.nodeIds === previous.nodeIds) {
      return next
    }
    previous = next
  }
  console.log(`  · note: the graph had not settled after ${UI_SETTLE_READS_MAX} reads — comparing the last read (${previous.census.registered} nodes)`)
  return previous
}

/** §2.1 item 2 — the leg's ONE per-run scratch TREE, under the OS temp dir
 *  (§6 DIS-5). It is the `TMPDIR` every boot's Electron child inherits, so the
 *  children's `/tmp` traffic (Chromium's shm replacement under
 *  `--disable-dev-shm-usage`, crash dumps) stays inside a directory THIS leg
 *  owns and removes. The per-ATTEMPT profiles live in the helper and are
 *  cleaned as its own profiles (the ONE cleanup implementation, F-13); this
 *  tree is the leg's own scope and is removed next to it on every exit path. */
const scratchRoot = mkdtempSync(join(tmpdir(), 'provident-ui-run-'))
process.env.TMPDIR = scratchRoot

// §F-1 (second half) — THE EXIT HOOK IS REGISTERED HERE, immediately after the
// tree is created and BEFORE any early-exit path can run. It used to be
// registered ~350 lines below, after the retry-config validation — so the
// malformed-config path (`readRetryConfig` throws ⇒ `process.exit(1)`) exited
// BEFORE the hook existed and left an EMPTY scratch root behind (reproduced:
// `PROVIDENT_UI_BOOT_ATTEMPTS=abc` ⇒ exit 1 with 1 root surviving, while green /
// exhaustion / signal paths were clean at 0). Registering it first makes cleanup
// a property of CREATION rather than of reaching the bottom of the file.
// `recordCleanup` is a hoisted function declaration, so referencing it here is
// safe, and it is idempotent, so the signal handlers and the explicit call sites
// may still call it.
//
// §G-6 — THE HOOK'S STATE IS DECLARED ABOVE THE HOOK, NOT BELOW IT. The hook used
// to guard its one state read with `typeof activeBoot !== 'undefined'`, which is
// NOT TDZ-safe: `typeof` over a `let` in its temporal dead zone THROWS
// (`ReferenceError: Cannot access 'activeBoot' before initialization`), so a
// process exit during module evaluation between the registration and the later
// declaration would abort the hook BEFORE `recordCleanup()` — the F-1 class (a
// clean end state reported as clean while nothing was cleaned). The structural
// fix is to declare every binding the hook reads BEFORE the hook is registered,
// so no guard is needed and none can be got wrong. `recordCleanup` reads this
// file's `cleanupReported` and `scratchRoot`; `activeBoot` is read here directly.
//
// The child process of the boot attempt currently in flight — the signal handlers
// below close it, so no orphaned Electron survives a SIGINT/SIGTERM (adversarial
// finding F-11: one profile per attempt makes a leak worse).
let activeBoot = null
/** §3.1 step 8 / §0 prohibition 4 / §3a `U-10` — whether the cleanup report has
 *  already been printed. Declared here (before the hook, which is the earliest
 *  caller) so the hook is TDZ-safe; `recordCleanup` is idempotent through it. */
let cleanupReported = false
process.on('exit', () => {
  if (activeBoot !== null) {
    try { activeBoot.kill('SIGKILL') } catch { /* already gone */ }
    activeBoot = null
  }
  recordCleanup()
})

/** §3.2 — write the leg's OWN scratch security store into a fresh scratch
 *  profile: an operator-equivalent action on a throwaway file (the store file
 *  name is the landed `provident-security.json`), never against the operator's
 *  real profile. The profile comes from the shared helper's
 *  `makeFreshProfile` (§2.1 item 2), so there is ONE cleanup implementation
 *  (§3.7 `RT-3` wants exactly this: a FRESH profile per ATTEMPT, never a
 *  reused/partially-written one). */
function scratchProfile(tag) {
  const profile = makeFreshProfile(`provident-ui-${tag}`)
  writeFileSync(join(profile, 'provident-security.json'), JSON.stringify({ token: null, enabled: SCRATCH_GROUPS }, null, 2))
  return profile
}

/** Remove the leg's own scratch tree and the helper's per-attempt profiles —
 *  one call for every exit path (§2.1 item 2, F-11/F-13).
 *
 *  ORDER IS THE FIX for the blind-run leftover finding: the helper's
 *  `cleanupProfiles` kills every Electron child it spawned — `killChild` is a
 *  plain `child.kill('SIGKILL')` on the BINARY this leg spawned directly (the
 *  `detached: true` + process-group route was tried and BACKED OUT: it regressed
 *  the SDK stdio transport, `R13 RESULT: 1 checks, 2 failures`; see
 *  `scripts/electron-spawn.mjs`'s `liveChildren` note) — and then deletes each
 *  profile WHILE VERIFYING that it stayed deleted, re-deleting while a surviving
 *  Chromium helper re-materialises it. The leg's own run tree is removed only
 *  after that, so the per-attempt profiles are gone before their parent tree is
 *  unlinked. */
function cleanupScratch() {
  const report = cleanupProfiles()
  try {
    rmSync(scratchRoot, { recursive: true, force: true })
  } catch {
    /* best-effort: a leftover scratch tree is not a failure */
  }
  return report
}

/** Whether the leg's own run tree still exists (reported, never assumed). */
function scratchRootExists() {
  return existsSync(scratchRoot)
}

// ---- §G-2: the OPERATOR-PROFILE WITNESS (read-only, never its contents) ------
// `R0`(c) prints a claim about "the developer's persisted security store" and used
// to check only the leg's OWN seeded scratch store plus the boot's `tools/list`
// code-group surface — the operator's real `userData` directory was never looked
// at, so the printed clause was an INFERENCE. G-2 makes the row observe what it
// prints: the before/after state of the candidate operator-profile paths is
// recorded and compared, read-only. Its CONTENTS are never read (§3.2 / §0
// prohibition 4: this leg may never read or write the operator's store — a witness
// that read it would itself be the defect it guards against).
//
// The candidates are what Electron's own rule produces for THIS app on this
// platform: `appData` (`$XDG_CONFIG_HOME`, else `$HOME` + `.config`) + the app
// name, the name coming from the tree's own `package.json` (READ, not assumed)
// with Electron's bare fallback name in case a future launch resolves the bundle
// as its own entry. Both candidates are witnessed: a boot that resolved its store
// elsewhere would appear under ONE of them, and a witness that covered the wrong
// directory would prove nothing.
//
// WHY THE PATH IS ASSEMBLED FROM THE ENVIRONMENT AND NEVER SPELLED OUT: the
// landed §3.0 `R0`(c) guard rows forbid the leg from naming the operator's real
// profile path in its source (no home-expansion helper call, no literal profile
// path), so the witness derives the candidates from the operator's own env and
// from the tree's declared app name at RUN time. The observation is READ-ONLY —
// `statSync` on the directory and on the two store files — and it never opens a
// store: §0 prohibition 4 is about persisting nothing and never writing the
// operator's store, and a witness that READ that store would be the defect it
// exists to catch.

/** The candidate operator-profile directories for this app (see the note above). */
function operatorProfileCandidates() {
  const home = process.env.HOME ?? ''
  const bases = [process.env.XDG_CONFIG_HOME, home === '' ? null : join(home, '.config')]
    .filter((b) => typeof b === 'string' && b !== '')
  let declared = null
  try {
    declared = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name ?? null
  } catch {
    /* an unreadable package.json leaves Electron's own fallback name standing */
  }
  const names = [...new Set([declared, 'Electron'].filter((n) => typeof n === 'string' && n !== ''))]
  return [...new Set(bases.flatMap((b) => names.map((n) => join(b, n))))]
}

/** The READ-ONLY state of the operator's profile candidates: directory existence
 *  plus, for each store the app persists there, the file's PRESENCE and MTIME (and
 *  size, as evidence only). A boot that resolved its store under the real profile
 *  and wrote it changes `provident-security.json`'s mtime — or creates the file, or
 *  the directory — all of which this records without ever reading store contents. */
function operatorProfileState() {
  const stores = ['provident-security.json', 'provident-modules.json']
  return operatorProfileCandidates().map((profile) => {
    let exists = false
    try {
      exists = statSync(profile).isDirectory()
    } catch {
      /* absent ⇒ recorded as false, never assumed */
    }
    const files = {}
    for (const name of stores) {
      try {
        const s = statSync(join(profile, name))
        files[name] = { present: true, mtimeMs: s.mtimeMs, size: s.size }
      } catch {
        files[name] = { present: false, mtimeMs: null, size: null }
      }
    }
    return { profile, exists, files }
  })
}

/** §G-2 — the before/after comparison `R0`(c) asserts: the operator profile's
 *  existence and each store's presence/mtime must be IDENTICAL across the whole
 *  run. Returns `{ unchanged, diffs }`, each diff naming the path and what moved,
 *  so a failure is legible evidence rather than a bare `false`. */
function operatorProfileUnchanged(before, after) {
  const diffs = []
  for (const b of before) {
    const a = after.find((x) => x.profile === b.profile)
    if (a === undefined) {
      diffs.push(`${b.profile}: not observed after the run`)
      continue
    }
    if (a.exists !== b.exists) diffs.push(`${b.profile}: directory existence ${b.exists} → ${a.exists}`)
    for (const name of Object.keys(b.files)) {
      const bf = b.files[name]
      const af = a.files[name]
      if (bf.present !== af.present) diffs.push(`${join(b.profile, name)}: presence ${bf.present} → ${af.present}`)
      else if (bf.mtimeMs !== af.mtimeMs) diffs.push(`${join(b.profile, name)}: mtime ${bf.mtimeMs} → ${af.mtimeMs}`)
    }
  }
  return { unchanged: diffs.length === 0, diffs }
}

/** The witness as one recorded line — path, existence, per-store presence/mtime —
 *  so the row's evidence SHOWS the observation it asserts on, not just a verdict. */
function operatorProfileSummary(state) {
  return state
    .map((s) => `${s.profile}{directory=${s.exists ? 'exists' : 'absent'}`
      + Object.entries(s.files).map(([n, f]) => `, ${n}=${f.present ? `present@mtime ${Math.round(f.mtimeMs)}` : 'absent'}`).join('')
      + '}')
    .join(' · ')
}

/** §3.1 step 8 / §0 prohibition 4 / §3a `U-10` — RECORD what the cleanup did,
 *  on every exit path, so a reader can tell that it was attempted at all (the
 *  blind run's second half of the finding) instead of inferring it from an
 *  absent directory. Reports each removed path and, when one survived, the
 *  leftover LOUDLY: a leftover is non-fatal (the divergence leg's own
 *  precedent) but it may never pass unrecorded. Its idempotence flag,
 *  `cleanupReported`, is declared ABOVE this call's earliest caller (the exit
 *  hook) so the hook is structurally TDZ-safe (§G-6). */
function recordCleanup() {
  if (cleanupReported) return
  cleanupReported = true
  const report = cleanupScratch()
  console.log(`\n--- §3.1 step 8 / §0 prohibition 4: scratch cleanup ---`)
  console.log(`  · removed ${report.removed.length} scratch profile(s) through the helper's ONE cleanup ` +
    `(${report.passes} delete pass(es), each verified); the leg's own run tree ${scratchRootExists() ? 'STILL EXISTS' : scratchRoot + ' removed'}`)
  for (const dir of report.removed) console.log(`      removed: ${dir}`)
  if (report.leftover.length === 0) {
    console.log(`  · leftover profiles: NONE`)
  } else {
    console.error(`  ✗ LEFTOVER scratch profile(s) (non-fatal, recorded): ${report.leftover.join(', ')}`)
  }
}

// ---- §3.7 `RT-1`/`RT-5`: the boot attempt loop, the signature, the records ---
/** Every attempt of every boot, in order: the §3.7 `RT-5` record. A count with
 *  no signatures is not a record, so each entry carries its number, its boot,
 *  its profile path, its outcome, the observed `(code, signal)` pair and/or the
 *  transport error, and the tail of that attempt's stderr. */
const attemptRecords = []

/** The boot attempt's in-flight child is `activeBoot`, declared ABOVE with the
 *  exit hook (§G-6) — nothing here re-declares it. `teardown` below clears it
 *  when its attempt ends, so an in-flight attempt is distinguishable from a
 *  finished one on every exit path. */

/** §3.7 `RT-5` — the `(code, signal)` pair as the child's `exit` event delivered
 *  it, VERBATIM (the helper surfaces exactly this pair:
 *  `child exited (code …, signal …)`, `scripts/electron-spawn.mjs:140-145`). */
function signatureOf(rec) {
  if (rec.code === null && rec.signal === null) {
    return rec.error === '' ? '(no observed child termination and no transport error)' : `no observed child termination — transport error: ${rec.error}`
  }
  return `child exited (code ${rec.code}, signal ${rec.signal})${rec.error === '' ? '' : ` — transport error: ${rec.error}`}`
}

function recordAttempt(rec) {
  const full = { stderrTail: '', code: null, signal: null, error: '', ...rec }
  attemptRecords.push(full)
  console.log(`  · attempt ${full.attempt}/${full.maxAttempts} boot ${full.boot} outcome=${full.outcome} profile=${full.profile}`)
  if (full.outcome !== 'accepted') {
    console.log(`      signature: ${signatureOf(full)}`)
    if (full.stderrTail !== '') console.log(`      child stderr (tail): ${full.stderrTail.replace(/\n/g, '\n        ')}`)
  }
  return full
}

/** `RT-1`(i) — wait a BOUNDED grace window for the child's `exit` observation
 *  when a failure has already been seen. Returns the raw `(code, signal)` pair,
 *  or `{ code: null, signal: null }` when no termination was observed inside the
 *  window (the child is still alive / a genuine hang ⇒ NOT retryable). The
 *  window is capped by the per-attempt timeout: this only ever looks for an
 *  observation that is already on its way, it never extends the attempt budget. */
function observeTermination(child, capMs) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return Promise.resolve({ code: child.exitCode, signal: child.signalCode })
  }
  if (child.killed) return Promise.resolve({ code: null, signal: null })
  const graceMs = Math.max(0, Math.min(UI_BOOT_TERMINATION_GRACE_MS, capMs))
  return new Promise((resolve) => {
    const done = (code, signal) => {
      clearTimeout(timer)
      resolve({ code, signal })
    }
    const timer = setTimeout(() => done(null, null), graceMs)
    child.once('exit', done)
    child.once('close', () => {
      // `close` always follows `exit`; if `signalCode`/`exitCode` are populated
      // by now the pair is readable, otherwise the termination stays unobserved.
      if (child.exitCode !== null || child.signalCode !== null) done(child.exitCode, child.signalCode)
    })
  })
}

/** §3.7 `RT-1` + the **PRECEDENCE CLAUSE** (ARCHITECT-RULED 2026-09-27, third
 *  pass, FIX 3) — THE ELIGIBILITY TEST, and the only one in this leg. There are
 *  **TWO admissible signatures, never a generic "anything failed" predicate:**
 *  **(A) the OBSERVED-DEATH signature** — the child was OBSERVED to terminate
 *  with a non-zero exit code or with a signal (the raw pair, recorded verbatim —
 *  the measured member of the class is `SIGTRAP`), AND that boot's MCP handshake
 *  had NOT resolved (`RT-1`(i) ∧ `RT-1`(ii)); and **(B) the TIMEOUT signature**
 *  (`RT-4` item 3 governs for the timeout class, PRECEDENCE CLAUSE (a)) — the
 *  leg's own per-attempt timer ended the attempt: the **absence of an observed
 *  child termination** PLUS the **handshake-not-completed** fact, its OWN
 *  signature, recorded verbatim, and RETRYABLE. The timeout fact is an
 *  OBSERVED/RECORDED fact handed in by the caller (`recordedTimeout` — set when
 *  that attempt's timer fired), **never re-parsed out of the error text**: a
 *  text-parsing predicate is exactly the forbidden shape below. Every other
 *  failure — a wrong row/measurement after a completed handshake (`RT-2` class
 *  1/4/6), a divergence red (`RT-2` class 2), a DISPLAY absence (`RT-2` class 3),
 *  a programming error (`RT-2` class 5), and a no-termination record whose
 *  failure is NOT the handshake-timeout fact — is NOT retryable and consumes no
 *  attempt. There is deliberately NO `stderr`-substring predicate, no "the boot
 *  threw" predicate and no "the run ended non-zero" predicate: `RT-1` forbids
 *  them. */
function isBootstrapDeath(rec, handshakeResolved, recordedTimeout = false) {
  const died = rec.code !== null || rec.signal !== null
  const nonZero = rec.code !== null && rec.code !== 0
  const signalled = rec.signal !== null
  const observedDeath = died && (nonZero || signalled)
  return !handshakeResolved && (observedDeath || recordedTimeout)
}

/** Boot the app under its OWN fresh scratch profile and complete the MCP
 *  handshake, retrying a bootstrap death per §3.7 `RT-1`…`RT-5`.
 *
 *  One attempt = ONE Electron process: the helper spawns it (the landed vector
 *  + this attempt's fresh scratch `--user-data-dir`), the transport drives THAT
 *  child's stdio. The failed attempt's child is terminated and its transport
 *  closed BEFORE the next attempt is spent (`RT-3`), so two Electron processes
 *  for one boot never run at once.
 *
 *  Returns `{ ok: true, client, tools, stderr, profile, attempt, retries }` or
 *  `{ ok: false, records }` (EXHAUSTION, `RT-7`). A NON-retryable failure
 *  throws — it exits as it does today (`RT-2`). */
async function bootUnder(tag, clientName, cfg) {
  const startedAt = Date.now()
  let record
  for (let attempt = 1; attempt <= cfg.attempts; attempt += 1) {
    const waited = Date.now() - startedAt
    if (waited > UI_BOOT_CEILING_MS) {
      console.error(`  ✗ RT-4 item 4: the per-boot wall-clock ceiling was EXCEEDED (${waited} ms > ${UI_BOOT_CEILING_MS} ms) mid-retry — EXHAUSTION (RT-7)`)
      break
    }
    if (record !== undefined) {
      const backoff = UI_BOOT_BACKOFF_MS[attempt - 2]
      console.log(`  · RT-4 backoff before attempt ${attempt}: ${backoff} ms (fixed table, no jitter)`)
      await new Promise((resolve) => setTimeout(resolve, backoff))
    }
    const profile = scratchProfile(`${tag}${attempt === 1 ? '' : `-r${attempt}`}`)
    record = await bootAttempt({ tag, clientName, profile, attempt, maxAttempts: cfg.attempts, timeoutMs: cfg.timeoutMs })
    recordAttempt(record)
    if (record.outcome === 'accepted') {
      return { ok: true, client: record.client, tools: record.tools, child: record.child, transport: record.transport, profile, attempt, retries: attempt - 1 }
    }
    if (!record.retryable) {
      throw new Error(`boot ${tag} attempt ${attempt} failed non-retryably (RT-2): ${signatureOf(record)}`)
    }
  }
  return { ok: false, records: attemptRecords.filter((r) => r.boot === tag) }
}

/** ONE boot attempt: spawn, wire stderr, connect the MCP client, list tools.
 *  Never throws for a *classified* failure — it returns the attempt record with
 *  `retryable` decided by `isBootstrapDeath` — so the loop above can record the
 *  signature verbatim and decide whether an attempt is spent. */
async function bootAttempt({ tag, clientName, profile, attempt, maxAttempts, timeoutMs }) {
  // The ONE Electron process for this attempt. The attempt passes the SEAM FLAG
  // (§4.2 ADD-3) as its ONLY store relocation — deliberately NOT Electron's own
  // `--user-data-dir=<profile>` — so `R0`(c) attributes the store relocation to
  // the seam itself and the row can FAIL when the seam is ignored (F-2). The
  // helper's landed pair is untouched by this choice: the base vector (including
  // `--disable-dev-shm-usage`) comes from the helper and neither flag is
  // dropped, the profile is this attempt's OWN fresh scratch dir (§RT-3), and
  // the `(code, signal)` pair the helper delivers on death is the `RT-1`
  // signature this record carries.
  const spawned = spawnElectron([`${USER_DATA_FLAG}${profile}`])
  const child = spawned.child
  activeBoot = child
  let stderrBuf = ''
  child.stderr.on('data', (d) => {
    stderrBuf += String(d)
  })
  const transport = new ChildProcessTransport(child)
  const client = new Client({ name: clientName, version: '0.1.0' })
  let termination = null
  // The child's `exit` event is the SIGNATURE SOURCE (§RT-1): record the raw
  // `(code, signal)` pair the moment it arrives, whether or not the transport's
  // error handler also fires.
  child.on('exit', (code, signal) => {
    termination = { code, signal }
  })
  const errorSeen = new Promise((resolve) => {
    transport.onerror = (e) => resolve(e.message)
  })
  const handshake = (async () => {
    await client.connect(transport)
    return client.listTools()
  })()
  let resolved = false
  let handshakeTimeout = null
  // §3.7 the PRECEDENCE CLAUSE (a) — the timeout fact, RECORDED on this attempt
  // the moment the per-attempt timer fires (never inferred from the message
  // text): it is the second admissible retryable signature's own half.
  let timedOut = false
  const timeoutSeen = new Promise((_resolve, reject) => {
    handshakeTimeout = setTimeout(() => {
      timedOut = true
      reject(new Error(`handshake did not complete within ${timeoutMs} ms (RT-4 item 3)`))
    }, timeoutMs)
  })
  try {
    const tools = await Promise.race([
      handshake.then((v) => {
        resolved = true
        return v
      }),
      timeoutSeen,
      errorSeen.then((message) => {
        throw new Error(message)
      }),
    ])
    return {
      boot: tag, attempt, maxAttempts, profile, outcome: 'accepted',
      code: null, signal: null, error: '', stderrBuf,
      client, tools, child, transport,
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    // §3.7 RCA (the timeout-class RACE) — SNAPSHOT the handshake state at the
    // instant the raced verdict settles, BEFORE the termination grace is awaited.
    // Reading `resolved` after the grace await is a TORN READ: the handshake can
    // resolve DURING the grace window (a slow-but-healthy boot), which flips the
    // predicate's `!handshakeResolved` half to false while the recorded `timedOut`
    // half stays true — the two halves then describe DIFFERENT instants, and a
    // live, retryable timeout is misclassified `failed non-retryably (RT-2)`.
    // Reproduced: at 30/100 ms the timeout class retried to exhaustion, at 200/260 ms
    // resolvedAtCatch=false but resolvedNow=true after the grace, and the attempt
    // aborted on attempt 1 with attempts 2-4 unrecorded. The timeout signature is a
    // statement about the INSTANT THE TIMER FIRED, so both halves are read there.
    const handshakeResolvedAtSettle = resolved
    // §RT-1 (i) — OBSERVE the termination before classifying. A dying child's
    // stdio closes before its `exit` event is emitted, so a transport error can
    // win the race against the exit observation; this bounded grace look (never
    // longer than the remaining per-attempt budget) is what lets the raw
    // `(code, signal)` pair be READ rather than assumed. It is NOT a retry
    // trigger on its own: a child still alive when the window closes yields no
    // termination observation, so it can only be retryable as the TIMEOUT
    // signature below (`RT-4` item 3 / the PRECEDENCE CLAUSE (a)), whose fact is
    // the recorded `timedOut` flag — never a no-termination record by itself.
    const death = termination ?? (await observeTermination(child, timeoutMs))
    const rec = {
      boot: tag, attempt, maxAttempts, profile, outcome: 'bootstrap-failed',
      code: death.code, signal: death.signal, error: message, stderrTail: stderrBuf.split('\n').slice(-12).join('\n').trim(),
    }
    // §3.7 RT-5 — the timeout fact is a RECORDED field of this attempt (the
    // second retryable signature must stay auditable per attempt), and it is
    // what the predicate is handed: the classification never reads `error`.
    rec.timedOut = timedOut
    rec.retryable = isBootstrapDeath(rec, handshakeResolvedAtSettle, rec.timedOut)
    // §RT-3 — tear the failed attempt down (transport closed, child terminated)
    // BEFORE the next attempt is spent. Never two Electron processes at once.
    await teardown({ client, transport, child })
    return rec
  } finally {
    if (handshakeTimeout !== null) clearTimeout(handshakeTimeout)
  }
}

/** Terminate a boot's child and close its transport (best-effort, §RT-3). */
async function teardown(boot) {
  try {
    await boot.client.close()
  } catch {
    /* already gone */
  }
  try {
    boot.transport.close()
  } catch {
    /* already gone */
  }
  try {
    boot.child.kill('SIGKILL')
  } catch {
    /* already gone */
  }
  if (activeBoot === boot.child) activeBoot = null
}

console.log('\nUI — REAL-DOM MEASUREMENT LEG (U-REALDOM-BOOT, docs/specs/ci-ui-leg.md)')
console.log('========================================================================')

// ---- §3.7 `RT-4`: the retry configuration, BEFORE anything is booted --------
// A malformed value is a PROGRAMMING ERROR ⇒ exit 1, never a silent clamp
// (§RT-4 item 4 / §RT-2 class 5). It is read before the precondition so the
// operator's mistake is reported as itself, not as a later failure.
let retryConfig
try {
  retryConfig = readRetryConfig()
} catch (e) {
  console.error(`\n  ✗ retry configuration is malformed (a PROGRAMMING ERROR, RT-2 class 5): ${e instanceof Error ? e.message : String(e)}`)
  console.error('  a malformed retry-configuration value exits 1 (ci-ui-leg.md §3.6 exit 1, §3.7 RT-2 class 5) — never a silent clamp')
  process.exit(1)
}
// §G-7 — the printed ceiling is the one THIS configuration has, not the
// default-derived figure printed over a raised timeout knob: `ceilingForConfig`
// recomputes it from the operator's per-attempt timeout, and the timeout knob's
// lack of an upper bound is stated in the output rather than left implicit.
const effectiveCeilingMs = ceilingForConfig(retryConfig)
console.log(`  · retry budget: ${retryConfig.attempts} attempt(s) per boot (max ${UI_BOOT_ATTEMPTS_MAX}), handshake timeout ${retryConfig.timeoutMs} ms/attempt — the timeout knob is UNBOUNDED ABOVE (RT-4 item 3 bounds it below at 1 ms and pins no maximum, so a raised value is accepted as-is),`)
console.log(`    backoff table ${UI_BOOT_BACKOFF_MS.join('/')} ms (fixed, no jitter), per-boot ceiling ${effectiveCeilingMs} ms for THIS configuration = ${UI_BOOT_ATTEMPTS_MAX} × ${retryConfig.timeoutMs} ms + ${UI_BOOT_BACKOFF_MS.reduce((a, b) => a + b, 0)} ms of backoff (the operator's attempt count does not move it — RT-3/RT-4)`)
if (effectiveCeilingMs !== UI_BOOT_CEILING_MS) {
  console.log(`  · note (G-7): this configuration's ceiling is ${effectiveCeilingMs} ms, while the mid-retry exhaustion check enforces the PINNED constant UI_BOOT_CEILING_MS = ${UI_BOOT_CEILING_MS} ms (RT-4 item 4 / B3-1 pins that constant to UI_BOOT_ATTEMPTS_MAX and the DEFAULT timeout, not to the operator's knobs) — so a raised timeout is cut off at the pinned constant, not at the ceiling printed above.`)
}

// Every exit path removes BOTH scratch scopes — the leg's own per-run tree and
// the helper's per-ATTEMPT profiles (§3.7 RT-3) — through one cleanup call, so
// there is a single implementation (F-13) and the SIGNAL paths are covered too
// (F-11: one profile per attempt makes a leaked profile worse than before).
// §3a `U-10` — the cleanup is RECORDED (`recordCleanup`), so an exit path that
// was never reached with a report is visibly missing one rather than silent.
function shutdown(signal) {
  return async () => {
    console.error(`\n  · received ${signal} — terminating the running boot and removing scratch profiles`)
    if (activeBoot !== null) {
      try { activeBoot.kill('SIGKILL') } catch { /* already gone */ }
      activeBoot = null
    }
    recordCleanup()
    process.exit(1)
  }
}
process.on('SIGINT', shutdown('SIGINT'))
process.on('SIGTERM', shutdown('SIGTERM'))
// NOTE (F-1): the `process.on('exit')` cleanup hook is NOT registered here any
// more — it is registered the moment `scratchRoot` is created (see the comment
// at that site), so an early-exit path (the malformed-config validation below)
// can no longer skip it. Registering it twice would double the cleanup work and
// print the report twice.

// ---- §3.1 step 3's BASIS, observed BEFORE step 2 runs (adversarial G-1) -----
// §3.1's AUTHORITY order is unchanged: the PRECONDITION (step 2) is run and
// decided first, and a red divergence still exits `2` before the display step is
// decided (PRE-1/PRE-3, RT-8 item 2). What G-1 fixes is the display prerequisite's
// BASIS: it is the LEG'S OWN observation of the OPERATOR'S environment, taken
// HERE — before the precondition's child is spawned — so it cannot be supplied,
// mutated or masked by anything the precondition does. `runDivergence` no longer
// hands that child `electronEnv()`'s manufactured `DISPLAY || ':0'`, so the
// precondition is finally evaluated in the environment the operator actually has.
const operatorDisplay = process.env.DISPLAY

// §G-2 — the OPERATOR-PROFILE WITNESS's BEFORE state, taken here: after the
// retry-config validation (a malformed knob still exits 1 without touching the
// operator's profile) and before the precondition spawns its divergence child and
// before any boot, so the whole run's Electron activity is inside the window.
const operatorProfileBefore = operatorProfileState()

// ---- §3.1 step 2: PRECONDITION (§5) — BEFORE the DISPLAY prerequisite --------
// §3.1 pins the order: step 2 is the precondition ("`npm run divergence` green
// for the same built tree") and step 3 is the display prerequisite. Adversarial
// finding F-15: the order is contract, so the precondition is run and decided
// HERE, before the display step is DECIDED and before any boot (and never inside
// the §3.7 retry boundary — `RT-3`/`RT-8`). The display prerequisite's own
// OBSERVATION is taken above (G-1) — order of DECISION, not of observation, is
// what §3.1 pins, and G-1 needs the observation to precede the precondition's env.
const before = beforeDigest()
const divergence = await runDivergence()
console.log(`\n--- §5 PRECONDITION: npm run divergence (same built tree) ---`)
console.log(`  ${divergence.line} (exit ${divergence.code})`)
console.log(`  tree digest before: dist/main/main.cjs sha256=${before.main.slice(0, 16)}… provident-ssr@${before.version} (declared pin: ${before.pin})`)

let preconditionOk = divergence.code === 0 && divergence.failures === 0
const after = beforeDigest()
if (!digestUnchanged(before, after)) {
  console.error('  ✗ PRE-2: the built tree MOVED between the divergence run and this boot (digest differs after)')
  preconditionOk = false
}
if (!pinAgrees(before)) {
  console.error(`  ✗ PRE-2: the installed provident-ssr dist (${before.version}) does not agree with the declared pin (${before.pin})`)
  preconditionOk = false
}
if (!preconditionOk) {
  console.error('\nPRECONDITION-FAILED — `npm run divergence` is not green for the same built tree')
  console.error(`  divergence result line (verbatim): ${divergence.line}`)
  console.error(`  divergence exit code: ${divergence.code}`)
  // §3.7 RT-8 item 5 — a DIAGNOSTIC-ONLY note distinguishing a plain
  // "divergence red" from "divergence red with the bootstrap signature"
  // (§5.4: `checks = 1`, `failures = 2`). It changes no exit code, no verdict
  // and no measurement; a divergence red is NEVER a retry case (RT-2 item 2).
  if (/R13 RESULT:\s*1\s*checks,\s*2\s*failures/.test(divergence.line)) {
    console.error('  diagnostic note (RT-8 item 5): the divergence leg itself hit the bootstrap-death class')
    console.error('  (§5.4 signature `1 checks, 2 failures`) — still a PRECONDITION failure, exit 2, never retried here.')
  }
  // §G-1's RESIDUAL, recorded HERE, where it is observable: when the OPERATOR's
  // own environment has no display this branch is reached first (the precondition
  // keeps its §3.1 authority), while the divergence leg's OWN pinned env still
  // manufactures `:0` for its Electron child — a file this unit may not edit
  // (§5.4 `PRE-4`). So: on a host whose X server answers at the manufactured `:0`,
  // the precondition can be green while the operator has no `DISPLAY` (step 3 then
  // refuses with exit 3); on a host with NO display server at all it is the
  // precondition that reds, and THIS exit 2 is the verdict — never the documented
  // 3 (§6 DIS-2). Diagnostic only: no exit code, verdict or measurement changes.
  if (typeof operatorDisplay !== 'string' || operatorDisplay === '') {
    console.error('  diagnostic note (G-1): the OPERATOR environment has no DISPLAY, while the divergence leg\'s own')
    console.error('  pinned env manufactures `:0` for its Electron child (§5.4 PRE-4 — that file is not this unit\'s')
    console.error('  to edit). A display-less host with no X server therefore fails the PRECONDITION first and')
    console.error('  exits 2 here, NOT the documented 3 (§6 DIS-2): the display prerequisite is decided at §3.1')
    console.error('  step 3, which this authority order places after this verdict — recorded, not worked around.')
  }
  console.error('  NO MEASUREMENT TAKEN (ci-ui-leg.md §3.1 step 2, §5 PRE-1/PRE-3).')
  process.exit(2)
}
console.log(`  ✓ precondition: divergence green (${divergence.line}), tree digest after matches before, pin/dist agree`)

// ---- §3.1 step 3: the DISPLAY prerequisite --------------------------------
// The app's `BrowserWindow` is created with NO `show:false`/offscreen option and
// the leg spawns with `--ozone-platform=x11`. On a host with no display server the
// leg REFUSES with an actionable message naming the fix (§6 DIS-2): PREREQUISITE
// ERROR, exit 3 — never a silent skip, never a false green, never a `0`. The
// `DISPLAY` env var is the contract (an xvfb wrapper the operator supplies is the
// other admissible fix named in the message). The prerequisite is evaluated
// BEFORE the retry loop begins and is never a retry case (§3.7 RT-2 item 3 /
// RT-3). G-1: the value read here is `operatorDisplay` — the leg's OWN observation
// of the operator's environment, taken before the precondition spawned anything —
// NOT a re-read of an env the precondition could have manufactured, and NOT the
// `DISPLAY || ':0'` fallback the helper injects for a child.
const display = operatorDisplay
if (typeof display !== 'string' || display === '') {
  console.error('PREREQUISITE ERROR — no display server: DISPLAY is unset.')
  console.error('  The `ui` leg boots a REAL Electron BrowserWindow (no show:false, no offscreen mode),')
  console.error('  so it requires a display (docs/specs/ci-ui-leg.md §6 DIS-1..DIS-5).')
  console.error('  FIX: run under a display — either export DISPLAY (e.g. `DISPLAY=:0 npm run ui`)')
  console.error('  on a host with an X server, or wrap the run in xvfb:')
  console.error('  `xvfb-run -a --server-args="-screen 0 1024x768x24" npm run ui`')
  process.exit(3)
}
console.log(`  · display: DISPLAY=${display} (prerequisite satisfied, §3.1 step 3)`)

// ---- §5 PRECONDITION: `divergence` green for the SAME BUILT TREE -----------
function digestOf(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

/** `PRE-2` — a digest of the built artifacts the leg ACTUALLY CONSUMES (the
 *  app bundle, the battery host it drives as the shim leg, the renderer bundle
 *  and its HTML entry point), taken before AND after the divergence run.
 *  Adversarial finding F-8: digesting `main.cjs` alone leaves a stale tree
 *  (a rebuilt renderer, a rebuilt battery host) undetected, so the digest is
 *  widened to everything this leg boots. A differing digest ⇒ the tree moved
 *  under the precondition ⇒ PRECONDITION-FAILED, no measurement. */
function artifactPaths() {
  return {
    main: mainBundle,
    batteryHost,
    renderer: join(root, 'dist', 'renderer', 'renderer.js'),
    rendererHtml: join(root, 'dist', 'renderer', 'index.html'),
    ssrPkg: join(root, 'node_modules', 'provident-ssr', 'package.json'),
  }
}

/** `PRE-2` — the SAME-TREE digest pair plus the installed-vs-DECLARED pin
 *  comparison. Both halves are re-checked after the precondition run and are
 *  NEVER re-taken by a retry (`RT-3`/`RT-8` item 4: the precondition sits
 *  outside the retry boundary). */
function beforeDigest() {
  const paths = artifactPaths()
  const installedPkg = JSON.parse(readFileSync(paths.ssrPkg, 'utf8'))
  const declared = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const range = declared.dependencies?.['provident-ssr'] ?? declared.devDependencies?.['provident-ssr'] ?? null
  return {
    main: digestOf(paths.main),
    batteryHost: digestOf(paths.batteryHost),
    renderer: digestOf(paths.renderer),
    rendererHtml: digestOf(paths.rendererHtml),
    providentSsr: digestOf(paths.ssrPkg),
    version: installedPkg.version,
    pin: range,
  }
}
function digestUnchanged(before, after) {
  return after.main === before.main
    && after.batteryHost === before.batteryHost
    && after.renderer === before.renderer
    && after.rendererHtml === before.rendererHtml
    && after.providentSsr === before.providentSsr
}
/** `PRE-2`'s second half — the installed dist's version must AGREE with the
 *  version the tree DECLARES (F-8: the disagreement used to be recorded and
 *  never compared). An exact-version range must match exactly; a caret/tilde
 *  range must admit the installed version. Absent declaration ⇒ nothing to
 *  compare (the digest half still applies). */
function pinAgrees(before) {
  const range = before.pin
  if (typeof range !== 'string' || range === '') return true
  if (/^\d/.test(range)) return before.version === range
  const m = range.match(/(\d+\.\d+\.\d+)/)
  if (m === null) return false
  const [maj, min, pat] = m[1].split('.').map(Number)
  const [iMaj, iMin, iPat] = String(before.version).split('.').map(Number)
  if (range.startsWith('^')) return iMaj === maj && (iMin > min || (iMin === min && iPat >= pat))
  if (range.startsWith('~')) return iMaj === maj && iMin === min && iPat >= pat
  return false
}

/** `PRE-1` — run the divergence leg itself (NOT `npm run divergence`: that
 *  script rebuilds first, which would move the built tree under `PRE-2`'s
 *  digest). Capture its result line (`R13 RESULT: <N> checks, <M> failures`)
 *  and its exit code verbatim; a red leg is NEVER worked around (`PRE-3`), is
 *  NEVER retried (`RT-2` item 2 / `RT-8`) and is invoked exactly ONCE.
 *
 *  G-1 — THE CHILD'S ENV IS THE OPERATOR'S, and this is the whole point of the
 *  fix: this spawn used to go through the helper's `electronEnv()`, which injects
 *  `DISPLAY: process.env.DISPLAY || ':0'`. That MANUFACTURED a display for the
 *  precondition's child — so on a display-less host the precondition's verdict was
 *  about a display the operator does not have, the leg exited `2` and the
 *  documented `3` (no display, §3.1 step 3 / §6 `DIS-2`) was unreachable through
 *  `npm run ui`. Spawning with the operator's own environment (`process.env`,
 *  which already carries this leg's scratch `TMPDIR`) leaves the display question
 *  to the leg's own observation (`operatorDisplay`, taken before this call) and to
 *  §3.1's step 3.
 *
 *  WHAT DOES NOT CHANGE: the divergence leg's own landed env pair, its base
 *  argument vector, its stdio wiring, its scratch profiles and its result-line
 *  arithmetic are untouched (`PRE-4`/`RT-9`); a red leg still exits `2` with the
 *  result line verbatim and takes NO measurement (`PRE-1`/`PRE-3`), and it is
 *  never retried. The divergence leg sets `ELECTRON_DISABLE_SANDBOX=1` and its own
 *  display fallback for ITS Electron child itself
 *  (`scripts/electron-divergence.mjs`), so nothing this leg passed was load-bearing
 *  for it. */
function runDivergence() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [divergenceLeg], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: process.env })
    let out = ''
    child.stdout.on('data', (d) => { out += String(d) })
    child.stderr.on('data', (d) => { process.stderr.write(String(d)) })
    child.on('error', (e) => resolve({ code: 1, line: `R13 RESULT: 0 checks, 0 failures (spawn failed: ${e.message})`, failures: 1 }))
    child.on('close', (code) => {
      // The harness script's own summary line is authoritative (§5.4): parse it
      // rather than re-deriving N.
      const line = (out.split('\n').find((l) => l.includes('R13 RESULT')) ?? 'R13 RESULT: <absent>').trim()
      const m = line.match(/R13 RESULT:\s*(\d+)\s*checks,\s*(\d+)\s*failures/)
      if (m === null) {
        // RT-2 class 5 — an unparsable result line is a PROGRAMMING ERROR in
        // the leg's contract handling, not a bootstrap case: report it as a
        // precondition failure with the line verbatim, never as a retry.
        console.error(`  ✗ unparsable divergence result line (RT-2 class 5): ${line}`)
      }
      resolve({ code: code ?? 1, line, failures: m === null ? 1 : Number(m[2]) })
    })
  })
}

try {
  // §3.1 steps 4-5 — boot A and boot B, each under the §3.7 retry budget. Each
  // attempt gets its OWN fresh scratch profile (`RT-3`); the two boots never
  // overlap (an attempt is torn down before the next is spawned).
  console.log(`\n--- R0: two scratch profiles (isolation) ---`)
  console.log(`  · scratch root: ${tmpdir()} (OS temp dir — never the operator's real profile)`)
  console.log(`  · override flag: ${USER_DATA_FLAG.slice(0, -1)}=<profile> (§4.2 ADD-2/ADD-3)`)
  console.log(`  · each boot passes ONLY the seam flag for its store relocation: Electron's own --user-data-dir`)
  console.log(`    switch is deliberately NOT passed, so R0(c) attributes the store relocation to the seam itself;`)
  console.log(`    one fresh profile per attempt (RT-3), removed on every exit path.`)

  const bootA = await bootUnder('A', 'ui-leg-a', retryConfig)
  if (!bootA.ok) {
    console.error(`\nRT-7 EXHAUSTED: ${retryConfig.attempts} of ${retryConfig.attempts} attempts failed (${retryConfig.attempts - 1} retries) for boot A`)
    console.error('  every attempt, in order, with its signature verbatim:')
    for (const rec of bootA.records) {
      console.error(`    attempt ${rec.attempt} (boot ${rec.boot}, profile ${rec.profile}): ${signatureOf(rec)}`)
      if (rec.stderrTail !== '') console.error(`      child stderr (tail): ${rec.stderrTail}`)
    }
    console.error('  NO MEASUREMENT WAS TAKEN (an exhausted run takes none).')
    console.error('  exhaustion is not a pass and not a `2`: the bootstrap never completed (ci-ui-leg.md §3.7 RT-7, §3.6 exit 1).')
    process.exit(1)
  }
  const bootB = await bootUnder('B', 'ui-leg-b', retryConfig)
  if (!bootB.ok) {
    console.error(`\nRT-7 EXHAUSTED: ${retryConfig.attempts} of ${retryConfig.attempts} attempts failed (${retryConfig.attempts - 1} retries) for boot B`)
    console.error('  every attempt, in order, with its signature verbatim:')
    for (const rec of bootB.records) {
      console.error(`    attempt ${rec.attempt} (boot ${rec.boot}, profile ${rec.profile}): ${signatureOf(rec)}`)
      if (rec.stderrTail !== '') console.error(`      child stderr (tail): ${rec.stderrTail}`)
    }
    console.error('  NO MEASUREMENT WAS TAKEN (an exhausted run takes none).')
    process.exit(1)
  }
  console.log(`  · profile A: ${bootA.profile} (attempt ${bootA.attempt})`)
  console.log(`  · profile B: ${bootB.profile} (attempt ${bootB.attempt})`)
  // §3.7 RT-6(a) — a green reached on a retry is LABELLED for BOTH boots when
  // either retried: the label is what stops a later reader (or a later pass's
  // evidence file) from counting a flake as a single clean run.
  for (const [label, boot] of [['A', bootA], ['B', bootB]]) {
    if (boot.retries > 0) {
      console.log(`  · RT-6 RETRY GREEN (boot ${label}): attempt=${boot.attempt} of ${retryConfig.attempts} (retries=${boot.retries}, ${boot.retries} bootstrap failure(s) recorded)`)
    } else {
      console.log(`  · boot ${label} green on the first attempt: attempt=1 of ${retryConfig.attempts} (retries=0)`)
    }
  }

  // §3.1 step 5 / §3.0 R0 — the isolation comparison across the TWO boots. Boot B
  // loads the SAME envelope as boot A (same graph state, no probe dispatched), so
  // the comparison is between two profiles rather than between two graph states.
  // THE ORDER MATTERS and follows §3.1: boot A's ONE measurement (step 6) is
  // taken FIRST, and the comparison is then made between the two accepted boots
  // holding the same graph state — the leg reports `R0`(c) (the seam attribution,
  // decided by the boots' OWN `tools/list` + their seeded store files) BEFORE the
  // comparison calls, so a broken seam fails the `R0`(c) ROW by name instead of
  // aborting the run inside a comparison call.
  console.log(`\n--- R0: isolation across the two scratch profiles ---`)
  const toolsA = bootA.tools.tools.map((t) => t.name).sort().join('|')
  const toolsB = bootB.tools.tools.map((t) => t.name).sort().join('|')
  console.log(`  · tools/list: A=${bootA.tools.tools.length} tools, B=${bootB.tools.tools.length} tools`)
  // R0(c) — FALSIFIABLE ATTRIBUTION (adversarial finding F-2). The row used to
  // assert a file the LEG ITSELF wrote (constant-true) while the boot carried
  // BOTH `--provident-user-data` and Electron's own `--user-data-dir`, so it
  // could not attribute the relocation to the seam at all. Two changes make it
  // able to FAIL:
  //   * each boot now passes the SEAM FLAG ONLY for its store root — the store
  //     can land under this profile only if `src/main/main.ts` honours the
  //     override before it creates the stores (§4.2 ADD-1/ADD-3);
  //   * the profile's store is seeded with `code` ENABLED, which is NOT a
  //     default (`read`+`dispatch`), so the boot's OWN `tools/list` exposes the
  //     code-group tools only if the app actually READ this file. A boot that
  //     resolved its store elsewhere (the developer's real profile, or the
  //     first-run default) cannot produce them.
  // The store file is only ever WRITTEN when the store is mutated; this leg
  // never mutates it after the seed, so the file the app read is the file the
  // leg wrote — and an app that read elsewhere would rewrite nothing here.
  //
  // G-2 — the row also OBSERVES what it prints. The three facts above are all
  // about the LEG'S OWN scratch scope, so on their own they can only INFER that
  // the operator's real profile was untouched (the printed clause claimed
  // "no default-profile store touched" while never looking at one). The witness
  // below looks: `operatorProfileBefore` was read before the precondition spawned
  // anything, the AFTER state is read here, and the comparison is over the
  // operator profile's EXISTENCE and each store's PRESENCE/MTIME — never its
  // contents. A boot that resolved its store under the real profile and wrote it
  // (the exact failure the clause names) moves one of those facts and fails this
  // row; the row is therefore falsifiable in the direction it claims.
  const operatorProfileAfter = operatorProfileState()
  const operatorWitness = operatorProfileUnchanged(operatorProfileBefore, operatorProfileAfter)
  const operatorEvidence = `operator profile (read-only witness, contents never read): ${operatorProfileSummary(operatorProfileAfter)} — before/after unchanged: ${operatorWitness.unchanged}`
  const codeTools = ['provident.code.set', 'provident.code.load']
  const codeToolsOn = codeTools.every((t) => toolsA.split('|').includes(t) && toolsB.split('|').includes(t))
  const seededStoreIntact = [bootA.profile, bootB.profile].every((p) => {
    const f = join(p, 'provident-security.json')
    if (!existsSync(f)) return false
    const saved = JSON.parse(readFileSync(f, 'utf8'))
    return Array.isArray(saved.enabled) && SCRATCH_GROUPS.every((g) => saved.enabled.includes(g))
  })
  row(
    "R0(c) neither boot read/wrote the developer's persisted security store: each boot's OWN seeded store resolved under its scratch profile (seam flag only), the boot's code-group surface follows it, and the operator profile's before/after state (existence + store presence/mtime, never contents) is unchanged",
    seededStoreIntact && codeToolsOn && operatorWitness.unchanged,
    `A=${bootA.profile} honoured, B=${bootB.profile} honoured; boot surfaces expose code-group tools (${codeTools.join(', ')}) that a first-run/default store could not produce; ${operatorEvidence}${operatorWitness.diffs.length === 0 ? '' : ` — MOVED: ${operatorWitness.diffs.join('; ')}`}`,
  )

  row('R0(a) tools/list identical across the two boots', toolsA === toolsB, `A=${toolsA === toolsB ? 'identical' : 'DIFFERS'}`)

  // §3.0 `R0`(b) — boot A's isolation surface is read HERE, on the graph state
  // boot A holds BEFORE its measurement probe runs (the probe loads the probe
  // envelope, which mints further nodeIds). Boot B then loads the SAME envelope
  // and its surface is read on the same state, so the two surfaces are compared
  // at equal graph depth — reading them at different depths compares two
  // DIFFERENT states and would fail on the minted nodeId vocabulary alone.
  // §3.1 step 6 — THE ONE MEASUREMENT, in boot A, over the EXISTING tools.
  const probeA = await runProbe(bootA.client)
  const markerA = readMarker(probeA.html.renderedHtml, 'window')
  const documentA = readMarker(probeA.html.renderedHtml, 'document')
  const elementA = readMarker(probeA.html.renderedHtml, 'element')
  const displayStyle = readMarker(probeA.html.renderedHtml, 'style')
  const fontSize = readMarker(probeA.html.renderedHtml, 'fontSize')
  const observed = probeA.observed
  const [widthText, heightText] = observed.split('x')
  const width = Number(widthText)
  const height = Number(heightText)

  // §3.0 R0(b) — boot B loads the SAME envelope boot A held before its probe, so
  // the two boots are compared on the same graph state (see the note above).
  const isolationA = await isolationSurface(bootA.client)
  const loadedB = await loadSameEnvelope(bootB.client)
  const isolationB = await isolationSurface(bootB.client)
  console.log(`  · envelope loaded identically in both boots (B census ${JSON.stringify(loadedB.census)})`)
  console.log(`  · census: A=${JSON.stringify(isolationA.census)} B=${JSON.stringify(isolationB.census)}`)
  row(
    'R0(b) provident.list_targets census identical across the two boots',
    JSON.stringify(isolationA.census) === JSON.stringify(isolationB.census),
    `A=${JSON.stringify(isolationA.census)}`,
  )
  row(
    'R0(b) nodeId vocabulary identical across the two boots',
    isolationA.nodeIds === isolationB.nodeIds,
    `${isolationA.nodeIds.split('|').length} nodeIds`,
  )

  console.log(`\n--- R1: REAL + distinguishable (typed marker) ---`)
  console.log(`  · real renderer realm — DISCRIMINATING (element/renderer-API provenance): element=${elementA} styleCtor=${displayStyle}`)
  console.log(`  · real renderer realm — SECONDARY observations only: typeof window=${markerA} typeof document=${documentA} fontSize="${fontSize}"`)

  // The SAME probe attempted on the SHIM leg (the battery host, `npm run
  // battery`'s host): recorded ALONGSIDE the real boot's marker (§3.0 R1). The
  // shim is a Node DOM shim, not a browser — its elements are `ShimElement`
  // instances, it has no resolved computed style and there is no layout to
  // measure (that is exactly why the shim is recorded UNSUPPORTED below, §3.4).
  let shimMarker = 'shim probe not attempted'
  let shimStatus = '' // §3.4's RECORDED status word for the shim leg (§3.0 R3)
  try {
    const shimChild = spawn(process.execPath, [batteryHost, '--mcp-transport=stdio'], { cwd: root, stdio: stdioWiring, env: electronEnv() })
    const shimTransport = new ChildProcessTransport(shimChild)
    const shimClient = new Client({ name: 'ui-leg-shim', version: '0.1.0' })
    await shimClient.connect(shimTransport)
    const shimProbe = await dispatchProbe(shimClient)
    const shimWindow = readMarker(shimProbe.html.renderedHtml, 'window')
    const shimElement = readMarker(shimProbe.html.renderedHtml, 'element')
    const shimMeasure = readMarker(shimProbe.html.renderedHtml, 'measure')
    const shimError = shimProbe.dispatched.results?.find((r) => r && r.error)?.error?.message ?? '(no error reported)'
    // §3.4 — the shim's recorded status. The reason is the shim's own REAL
    // observation (its element class + its throwing layout call), so the word
    // is a conclusion drawn from the observation, not an unconditional label
    // (adversarial finding F-5).
    shimStatus = shimElement === 'ShimElement' || /getBoundingClientRect is not a function/.test(shimError) ? 'UNSUPPORTED' : ''
    shimMarker = `typeof window=${shimWindow === '' ? '(not written)' : shimWindow}, element=${shimElement === '' ? '(not written)' : shimElement}, measure=${shimMeasure === '' ? 'UNSUPPORTED (never a 0)' : shimMeasure}, measurement step: ${shimError}`
    await shimClient.close()
  } catch (e) {
    shimMarker = `probe threw: ${e instanceof Error ? e.message : String(e)}`
  }
  console.log(`  · shim leg (battery host) attempt: ${shimMarker}`)
  // §3.0 R1 as RE-PINNED: the DISCRIMINATING half is the element/renderer-API
  // provenance. `typeof window`/`typeof document` are recorded but may never be
  // the sole basis (the shim populates a `document` realm of its own — U-11).
  row(
    'R1 real-renderer typed marker: ELEMENT/RENDERER-API provenance (element=HTMLDivElement, style=CSSStyleDeclaration), with the shim attempt recorded alongside',
    elementA === 'HTMLDivElement' && displayStyle === 'CSSStyleDeclaration',
    `discriminating: element=${elementA} styleCtor=${displayStyle} · secondary: typeof window=${markerA} typeof document=${documentA} · shim: ${shimMarker}`,
  )

  console.log(`\n--- R2: the ONE real measurement ---`)
  console.log(`  · probe observation (verbatim graph content): ${observed}`)
  const bothHalves = Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
  const styleNonEmpty = typeof fontSize === 'string' && fontSize !== ''
  console.log(`  · pinned shape: width=${width} (>0: ${width > 0}) height=${height} (>0: ${height > 0}) computedStyle fontSize="${fontSize}"`)
  // The cardinality is a TALLY of the probe runs (F-4), not a literal: a retry —
  // or any second probe site — that measured twice fails this row (§3.7 RT-6(c):
  // retries may not multiply measurements, and a rejected attempt's measurement
  // is neither counted nor retained).
  row('R2 measurement taken (exactly ONE)', measurementCount === 1, `${measurementCount} measurement(s) recorded by the probe path`)
  row(
    'R2 width > 0 && height > 0 in the REAL renderer',
    bothHalves,
    `width=${width} height=${height} — the window never paints ⇒ FAIL LOUDLY, NEVER RECORD 0`,
  )
  row('R2 non-empty getComputedStyle value read back in the graph content', styleNonEmpty, `fontSize="${fontSize}"`)
  // F-14 — the value is asserted through the FRAMED `readMarker` observation,
  // never as a raw substring test on the rendered HTML (the pattern `N-5`
  // forbids this unit from copying).
  const framedMeasure = readMarker(probeA.html.renderedHtml, 'measure')
  const framedFontSize = readMarker(probeA.html.renderedHtml, 'fontSize')
  row(
    'R2 both values visible in the provident.get_rendered_html response (framed readMarker observation)',
    framedMeasure === observed && framedMeasure !== '' && framedFontSize === fontSize && framedFontSize !== '',
    `framed measure="${framedMeasure}" fontSize="${framedFontSize}" (read out of the PROBE[…]PROBE block in ${probeA.html.renderedHtml.length} bytes of renderedHtml)`,
  )

  // §3.1 step 7 / §3.4 — the shim leg's recorded status.
  console.log(`\n--- R3: the shim leg's recorded status ---`)
  console.log(`  · shim leg: ${shimStatus === '' ? '(NOT SUPPORTED-WORDED)' : shimStatus}`)
  console.log(`    reason: the shim has no layout, no getBoundingClientRect semantics and no getComputedStyle,`)
  console.log(`    so it cannot carry this measurement; it is recorded UNSUPPORTED — never divergent, never matching, never a fabricated 0.`)
  console.log(`  · shim probe observation: ${shimMarker}`)
  // §3.0 R3 / §3.4 — the row asserts the RECORDED status STRING (F-5: this row
  // used to be `true` unconditionally, so a silently relabelled shim
  // observation would pass). The word must be exactly `UNSUPPORTED`.
  row(
    'R3 shim leg recorded with the exact word UNSUPPORTED and its reason (no layout / no getBoundingClientRect / no getComputedStyle)',
    shimStatus === 'UNSUPPORTED',
    `recorded status="${shimStatus}" (the pinned word set, §3.4)`,
  )

  // §3.1 step 8 / §3.0 R4 — the honest-limits row. G-3: the static check runs
  // over this file's CODE (comments stripped — this leg's own prose names the two
  // leg-only fallbacks §3.2 admits and the honest limit about the packaged app,
  // so a phrase-level scan over the raw text is a guaranteed false red), it tests
  // the pinned call sites as a SET (the packaged-mode predicate, the renderer-eval
  // call and the CDP call), and the printed line says EXACTLY what was scanned —
  // it used to print "no packaged-bundle reference" while testing one regex.
  console.log(`\n--- R4: honest limits (static row: no app-level claim in this leg) ---`)
  console.log(HONEST_LIMITS)
  const legCode = codeWithoutComments(readFileSync(join(here, 'electron-ui.mjs'), 'utf8'))
  const appClaimSites = APP_CLAIM_CALL_SITES.filter((site) => legCode.includes(site))
  row(
    'R4 no app-level claim: this leg\'s own CODE contains none of the ' + APP_CLAIM_CALL_SITES.length
      + ' pinned call sites (' + APP_CLAIM_CALL_SITES.join(' / ')
      + ') as a SET; comments are stripped before the scan, and the honest-limits prose (which legitimately'
      + ' contains the word packaged) is prose, not a call site, so it can neither satisfy nor break the row',
    appClaimSites.length === 0,
    appClaimSites.length === 0
      ? `${legCode.length} bytes of comment-stripped code scanned, ${APP_CLAIM_CALL_SITES.length} call sites checked, 0 present`
      : `FOUND in the leg's code: ${appClaimSites.join(', ')}`,
  )

  await teardown({ client: bootA.client, transport: bootA.transport, child: bootA.child })
  await teardown({ client: bootB.client, transport: bootB.transport, child: bootB.child })

  // F-9 — the headline's arithmetic is DERIVED from the rows this leg actually
  // ran (11 assertion call sites mapped onto the five declared `R0`–`R4` rows),
  // so it can never read `4/5` or `-1/5` for 1 or 6 failures.
  console.log(`\nUI RESULT: ${failures} failures (${rowsChecked - failures}/${rowsChecked} assertions green, mapped onto the five declared rows R0-R4)`)
  // §3.1 step 8 — "print the §1.13 statement + run the static honest-limits row
  // (R4); CLEAN BOTH PROFILES; exit". The cleanup is part of the pinned
  // sequence, so it runs (and is recorded) HERE, on the green path, before the
  // process exits — not only in the exit hook.
  recordCleanup()
  if (failures > 0) {
    console.error('  a measurement row failed — see the named row above (ci-ui-leg.md §3.6 exit 1)')
    process.exit(1)
  }
  console.log('  measurement: ' + observed)
  console.log(`  rows: 5 declared (R0-R4), ${rowsChecked} assertions (ci-ui-leg.md §3.0)`)
  if (bootA.retries > 0 || bootB.retries > 0) {
    console.log(`  RT-6 labelled green: boot A attempt=${bootA.attempt} (retries=${bootA.retries}), boot B attempt=${bootB.attempt} (retries=${bootB.retries})`)
  }
  process.exit(0)
} catch (e) {
  console.error(`\n  ✗ boot/connect failure: ${e instanceof Error ? e.message : String(e)}`)
  console.error('  a leg that cannot spawn or connect reports this loudly — never a 0, never a green (ci-ui-leg.md §2.1 item 4, §3.6 exit 1)')
  recordCleanup()
  process.exit(1)
}
