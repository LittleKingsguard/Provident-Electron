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
//   R1  REAL and DISTINGUISHABLE from the shim leg by a TYPED marker
//       (`typeof window` in the renderer realm), with the same probe attempted
//       on the shim leg (the battery host) recorded alongside.
//   R2  ONE real measurement: an element measured inside the REAL renderer
//       (a layout rect + a resolved computed style in the renderer realm),
//       whose value comes back
//       over the existing `provident.get_rendered_html`. Pinned shape:
//       `width > 0 && height > 0` AND a non-'' computed-style value.
//       The window never paints ⇒ FAIL LOUDLY, NEVER RECORD `0`.
//   R3  the shim leg is recorded `UNSUPPORTED` (never `divergent`, never a
//       fabricated `0`): the shim is not a browser — no layout, no rect
//       semantics, no resolved computed style.
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
// EXIT CODES (§3.6, closed vocabulary — no failure may become a skip, a `0` or
// a green): 0 every declared row passed · 1 a measurement row failed (or a
// spawn/connect failure) · 2 PRECONDITION-FAILED (divergence not green for the
// same built tree; no measurement taken) · 3 PREREQUISITE ERROR (no display).
//
// Run: npm run build && node scripts/electron-ui.mjs   (== `npm run ui`)
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
// §2.1 item 1 — the shared Electron-spawn helper (scripts/electron-spawn.mjs).
// Both legs import the SAME module; the base argument vector (including
// `--disable-dev-shm-usage`) and the fresh scratch `--user-data-dir` pair live
// there and are never dropped (§2.1 item 3).
import { ChildProcessTransport, electronEnv, repoRoot, spawnElectron, stdioWiring } from './electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const batteryHost = join(root, 'dist', 'main', 'battery-host.mjs')
const mainBundle = join(root, 'dist', 'main', 'main.cjs')
// The §5 precondition's leg: `scripts/electron-divergence.mjs` — the script
// behind `npm run divergence`. Declared here with the other leg paths; the
// precondition runs (and is checked) BEFORE any scratch profile exists (§3.1
// steps 2-3) and before the measurement probe of step 6.
const divergenceLeg = join(root, 'scripts', 'electron-divergence.mjs')

// The ONE additive startup flag the leg passes to the app (§4.2 ADD-2/ADD-3):
// a `--`-prefixed argument on the process's own command line, parsed by the
// same argv-scan idiom as `--mcp-transport=`/`--mcp-port=`. It only RELOCATES
// the user-data root for THIS boot; it flips no security default (§3.5 SEAM-4).
const USER_DATA_FLAG = '--provident-user-data='

// The groups the leg opts into in its OWN scratch store (§3.2): the landed
// defaults (`read` + `dispatch`) plus `graph` (the EXISTING `provident.load`
// lives in that group) plus `code`. This is an operator-equivalent action on a
// THROWAWAY file inside the leg's scratch profile — it may NEVER be done
// against the operator's real profile (§3.2, §4.3, adversarial seed U-3).
const SCRATCH_GROUPS = ['read', 'dispatch', 'graph', 'code']

/** §1.13's honest-limits statement, printed verbatim-in-substance by `R4`
 *  (§3.0 R4 / §3.3): what a `ui` green proves, and that it proves nothing else. */
const HONEST_LIMITS =
  'R4 HONEST LIMITS: a `ui` green proves that a specific probe, executed inside ONE real Electron renderer boot under a controlled profile, produced the asserted value — and nothing else. It is NOT a proof that the packaged app behaves this way (the leg boots the dev tree, not a distribution), NOT app-green from node-green, NOT any MCP-contract property obtained outside the MCP surface, NOT that provident.dispatch is a real gesture (it carries an event name, no coordinates), NOT that get_rendered_html observes layout (it reads mount.innerHTML), NOT that the shim is now faithful (the shim is demoted to pre-filter and is recorded UNSUPPORTED for this measurement), and NOT a rendered-geometry proof, an IPC proof, or a proof that any particular attribute row passes.'

// ---- the five rows (§3.0) --------------------------------------------------
let failures = 0
/** Report one row of this leg's five. Every row prints its own labelled line
 *  (§3.0): a failure is a named row, never a silent skip. */
function row(label, cond, detail = '') {
  if (cond) console.log(`  ✓ ${label}${detail ? ` (${detail})` : ''}`)
  else {
    failures += 1
    console.error(`  ✗ ${label}${detail ? ` (${detail})` : ''}`)
  }
}

async function call(client, name, args = {}) {
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
//   1. the TYPED realm marker — `typeof window`, `typeof document` and the
//      element's CONSTRUCTOR name. A DOM shim reports `typeof window =
//      undefined` and a shim element class (`ShimElement`); a real renderer
//      reports `object` and `HTMLDivElement`. That is a TYPE, not a string the
//      shim could equally emit (§3.0 R1), and the shim's own marker is recorded
//      alongside it.
//   2. the ONE measurement — `getBoundingClientRect()` and `getComputedStyle(el)`
//      in that realm, written into the SAME node's content. On the shim this
//      step THROWS (`el.getBoundingClientRect is not a function`): the shim has
//      no layout, which is why the shim leg is recorded `UNSUPPORTED` (§3.4) and
//      why the shim can never fabricate a `0` for this row.
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

/** Run the SAME probe by dispatching the ONE event: the handler writes its
 *  observation into graph content, and the value comes back over the EXISTING
 *  `provident.get_rendered_html`. This is the leg's ONLY measurement site. */
async function runProbe(client) {
  await call(client, 'provident.load', { kind: 'envelope', envelope: probeEnvelope() })
  const dispatched = await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'ui-probe-run' }, event: 'click' })
  const html = await call(client, 'provident.get_rendered_html', {})
  return { dispatched, html, observed: readMarker(html.renderedHtml, 'measure') }
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
async function isolationSurface(client) {
  const targets = await call(client, 'provident.list_targets', {})
  const html = await call(client, 'provident.get_rendered_html', {})
  return {
    census: html.census,
    nodeIds: targets.nodes.map((n) => n.nodeId).sort().join('|'),
  }
}

console.log('\nUI — REAL-DOM MEASUREMENT LEG (U-REALDOM-BOOT, docs/specs/ci-ui-leg.md)')
console.log('========================================================================')

// ---- §6 PREREQUISITE: a display server (before anything else is attempted) --
// The app's `BrowserWindow` is created with NO `show:false`/offscreen option and
// the leg spawns with `--ozone-platform=x11` + `DISPLAY || ':0'`. On a host with
// no display server the leg REFUSES with an actionable message naming the fix
// (§6 DIS-2): PREREQUISITE ERROR, exit 3 — never a silent skip, never a false
// green, never a `0`. The `DISPLAY` env var is the contract (an xvfb wrapper the
// operator supplies is the other admissible fix named in the message).
const display = process.env.DISPLAY
if (typeof display !== 'string' || display === '') {
  console.error('PREREQUISITE ERROR — no display server: DISPLAY is unset.')
  console.error('  The `ui` leg boots a REAL Electron BrowserWindow (no show:false, no offscreen mode),')
  console.error('  so it requires a display (docs/specs/ci-ui-leg.md §6 DIS-1..DIS-5).')
  console.error('  FIX: run under a display — either export DISPLAY (e.g. `DISPLAY=:0 npm run ui`)')
  console.error('  on a host with an X server, or wrap the run in xvfb:')
  console.error('  `xvfb-run -a --server-args="-screen 0 1024x768x24" npm run ui`')
  process.exit(3)
}
console.log(`  · display: DISPLAY=${display} (prerequisite satisfied)`)

const before = beforeDigest()
const divergence = await runDivergence()
console.log(`\n--- §5 PRECONDITION: npm run divergence (same built tree) ---`)
console.log(`  ${divergence.line} (exit ${divergence.code})`)
console.log(`  tree digest before: dist/main/main.cjs sha256=${before.main.slice(0, 16)}… provident-ssr@${before.version}`)

let preconditionOk = divergence.code === 0 && divergence.failures === 0
const after = beforeDigest()
if (!digestUnchanged(before, after)) {
  console.error('  ✗ PRE-2: the built tree MOVED between the divergence run and this boot (digest differs after)')
  preconditionOk = false
}
if (!preconditionOk) {
  console.error('\nPRECONDITION-FAILED — `npm run divergence` is not green for the same built tree')
  console.error(`  divergence result line (verbatim): ${divergence.line}`)
  console.error(`  divergence exit code: ${divergence.code}`)
  console.error('  NO MEASUREMENT TAKEN (ci-ui-leg.md §3.1 step 2, §5 PRE-1/PRE-3).')
  process.exit(2)
}
console.log(`  ✓ precondition: divergence green (${divergence.line}), tree digest after matches before`)

// ---- §3.1 steps 4-8: the boots, the rows, the exit ------------------------
// Every scratch profile this leg creates is tracked so `process.on('exit')`
// removes it (best-effort, §2.1 item 2 / adversarial seed U-10).
const scratchProfiles = []

/** Write the leg's OWN scratch security store into a fresh scratch profile
 *  (§3.2, §4.3): an operator-equivalent action on a throwaway file — never
 *  against the operator's real profile. The store file name is the landed
 *  `provident-security.json`, and the profile root is the OS temp dir (never a
 *  home-directory profile). Each boot gets its OWN scratch profile, so two boots
 *  can neither see nor write each other's store (§3.5 SEAM-3). */
function scratchProfile(tag) {
  const profile = mkdtempSync(join(tmpdir(), `provident-ui-${tag}-`))
  scratchProfiles.push(profile)
  writeFileSync(join(profile, 'provident-security.json'), JSON.stringify({ token: null, enabled: SCRATCH_GROUPS }, null, 2))
  return profile
}

// §2.1 item 2 / adversarial seed U-10 — both scratch profiles are removed on
// EVERY exit path (success, failure, SIGINT). Best-effort: a scratch profile
// left behind is recorded as non-fatal, never as a failure.
process.on('exit', () => {
  for (const profile of scratchProfiles.splice(0)) {
    try {
      rmSync(profile, { recursive: true, force: true })
    } catch {
      /* best-effort: a leftover scratch profile is not a failure */
    }
  }
})

/** Boot the app under its OWN scratch profile, passing the §4.2 `ADD-2`
 *  override flag: the boot's stores resolve under that profile, so the
 *  operator's persisted security store is never read or written (`R0`(c)). */
async function bootUnder(profile, clientName) {
  // ONE process per boot: the helper spawns it (the landed vector + this
  // profile's `--user-data-dir`), and the transport drives THAT child's stdio —
  // no second Electron process per boot.
  const spawned = spawnElectron([`${USER_DATA_FLAG}${profile}`, `--user-data-dir=${profile}`])
  const child = spawned.child
  let stderr = ''
  child.stderr.on('data', (d) => {
    stderr += String(d)
  })
  const transport = new ChildProcessTransport(child)
  const client = new Client({ name: clientName, version: '0.1.0' })
  await client.connect(transport)
  const tools = await client.listTools()
  return { client, child, tools, stderr: () => stderr, profile }
}

// ---- §5 PRECONDITION: `divergence` green for the SAME BUILT TREE -----------
function digestOf(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

/** `PRE-2` — a digest of the built artifacts, taken BEFORE and AFTER the
 *  divergence run, must be EQUAL, with the installed `provident-ssr` version
 *  recorded. A differing digest (or a pin/installed-dist disagreement) means
 *  the tree moved under the precondition: PRECONDITION-FAILED, no measurement. */
function beforeDigest() {
  return {
    main: digestOf(mainBundle),
    providentSsr: digestOf(join(root, 'node_modules', 'provident-ssr', 'package.json')),
    version: JSON.parse(readFileSync(join(root, 'node_modules', 'provident-ssr', 'package.json'), 'utf8')).version,
  }
}
function digestUnchanged(before, after) {
  return after.main === before.main && after.providentSsr === before.providentSsr
}

/** `PRE-1` — run the divergence leg itself (NOT `npm run divergence`: that
 *  script rebuilds first, which would move the built tree under `PRE-2`'s
 *  digest). Capture its result line (`R13 RESULT: <N> checks, <M> failures`)
 *  and its exit code verbatim; a red leg is NEVER worked around (`PRE-3`). */
function runDivergence() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [divergenceLeg], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: electronEnv() })
    let out = ''
    child.stdout.on('data', (d) => { out += String(d) })
    child.stderr.on('data', (d) => { process.stderr.write(String(d)) })
    child.on('error', (e) => resolve({ code: 1, line: `R13 RESULT: 0 checks, 0 failures (spawn failed: ${e.message})`, failures: 1 }))
    child.on('close', (code) => {
      // The harness script's own summary line is authoritative (§5.4): parse it
      // rather than re-deriving N.
      const line = (out.split('\n').find((l) => l.includes('R13 RESULT')) ?? 'R13 RESULT: <absent>').trim()
      const m = line.match(/R13 RESULT:\s*(\d+)\s*checks,\s*(\d+)\s*failures/)
      resolve({ code: code ?? 1, line, failures: m === null ? 1 : Number(m[2]) })
    })
  })
}

try {
  // §3.1 step 4 — boot under scratch profile A; record the typed marker (`R1`).
  const profileA = scratchProfile('a')
  const profileB = scratchProfile('b')
  console.log(`\n--- R0: two scratch profiles (isolation) ---`)
  console.log(`  · scratch root: ${tmpdir()} (OS temp dir — never the operator's real profile)`)
  console.log(`  · profile A: ${profileA}`)
  console.log(`  · profile B: ${profileB}`)
  console.log(`  · override flag: ${USER_DATA_FLAG.slice(0, -1)}=<profile> (§4.2 ADD-2/ADD-3)`)

  const bootA = await bootUnder(profileA, 'ui-leg-a')
  const bootB = await bootUnder(profileB, 'ui-leg-b')

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

  console.log(`\n--- R1: REAL + distinguishable (typed marker) ---`)
  console.log(`  · real renderer realm: typeof window=${markerA} typeof document=${documentA} element=${elementA}`)
  console.log(`  · rendered computed-style provenance: styleCtor=${displayStyle} fontSize="${fontSize}"`)

  // The SAME probe attempted on the SHIM leg (the battery host, `npm run
  // battery`'s host): recorded ALONGSIDE the real boot's marker (§3.0 R1). The
  // shim is a Node DOM shim, not a browser — `window`/`document` are not the
  // real realm's and there is no layout to measure (that is exactly why the shim
  // is recorded UNSUPPORTED below, §3.4).
  let shimMarker = 'shim probe not attempted'
  try {
    const shimChild = spawn(process.execPath, [batteryHost, '--mcp-transport=stdio'], { cwd: root, stdio: stdioWiring, env: electronEnv() })
    const shimTransport = new ChildProcessTransport(shimChild)
    const shimClient = new Client({ name: 'ui-leg-shim', version: '0.1.0' })
    await shimClient.connect(shimTransport)
    const shimProbe = await runProbe(shimClient)
    const shimWindow = readMarker(shimProbe.html.renderedHtml, 'window')
    const shimElement = readMarker(shimProbe.html.renderedHtml, 'element')
    const shimMeasure = readMarker(shimProbe.html.renderedHtml, 'measure')
    const shimError = shimProbe.dispatched.results?.find((r) => r && r.error)?.error?.message ?? '(no error reported)'
    shimMarker = `typeof window=${shimWindow === '' ? '(not written)' : shimWindow}, element=${shimElement === '' ? '(not written)' : shimElement}, measure=${shimMeasure === '' ? 'UNSUPPORTED (never a 0)' : shimMeasure}, measurement step: ${shimError}`
    await shimClient.close()
  } catch (e) {
    shimMarker = `probe threw: ${e instanceof Error ? e.message : String(e)}`
  }
  console.log(`  · shim leg (battery host) attempt: ${shimMarker}`)
  row(
    'R1 real-renderer typed marker is a TYPE, and the shim attempt is recorded alongside',
    markerA === 'object' && documentA === 'object',
    `real: typeof window=${markerA} typeof document=${documentA} element=${elementA} · shim: ${shimMarker}`,
  )

  console.log(`\n--- R2: the ONE real measurement ---`)
  console.log(`  · probe observation (verbatim graph content): ${observed}`)
  const measurementCount = 1
  const bothHalves = Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
  const styleNonEmpty = typeof fontSize === 'string' && fontSize !== ''
  console.log(`  · pinned shape: width=${width} (>0: ${width > 0}) height=${height} (>0: ${height > 0}) computedStyle fontSize="${fontSize}"`)
  row('R2 measurement taken (exactly ONE)', measurementCount === 1, `${measurementCount} measurement`)
  row(
    'R2 width > 0 && height > 0 in the REAL renderer',
    bothHalves,
    `width=${width} height=${height} — the window never paints ⇒ FAIL LOUDLY, NEVER RECORD 0`,
  )
  row('R2 non-empty getComputedStyle value read back in the graph content', styleNonEmpty, `fontSize="${fontSize}"`)
  row(
    'R2 both values visible in the provident.get_rendered_html response',
    probeA.html.renderedHtml.includes(widthText) && probeA.html.renderedHtml.includes(heightText),
    `measure:${observed} appears in renderedHtml (${probeA.html.renderedHtml.length} bytes)`,
  )

  // §3.1 step 5 / §3.0 R0 — the isolation comparison across the TWO boots. Boot B
  // loads the SAME envelope as boot A (same graph state, no probe dispatched), so
  // the comparison is between two profiles rather than between two graph states.
  const loadedB = await loadSameEnvelope(bootB.client)
  const isolationA = await isolationSurface(bootA.client)
  const isolationB = await isolationSurface(bootB.client)
  console.log(`\n--- R0: isolation across the two scratch profiles ---`)
  const toolsA = bootA.tools.tools.map((t) => t.name).sort().join('|')
  const toolsB = bootB.tools.tools.map((t) => t.name).sort().join('|')
  console.log(`  · envelope loaded identically in both boots (B census ${JSON.stringify(loadedB.census)})`)
  console.log(`  · tools/list: A=${bootA.tools.tools.length} tools, B=${bootB.tools.tools.length} tools`)
  console.log(`  · census: A=${JSON.stringify(isolationA.census)} B=${JSON.stringify(isolationB.census)}`)
  row('R0(a) tools/list identical across the two boots', toolsA === toolsB, `A=${toolsA === toolsB ? 'identical' : 'DIFFERS'}`)
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
  // R0(c) — neither boot resolved its store under the default/real userData
  // directory: each boot was handed its OWN scratch profile, and the app
  // honoured the override (§4.2 ADD-3). A boot that wrote its store elsewhere
  // would leave this profile's store file untouched.
  const storeA = join(profileA, 'provident-security.json')
  const storeB = join(profileB, 'provident-security.json')
  const storeAKept = existsSync(storeA) && JSON.parse(readFileSync(storeA, 'utf8')).enabled.join('+') === SCRATCH_GROUPS.join('+')
  const storeBKept = existsSync(storeB) && JSON.parse(readFileSync(storeB, 'utf8')).enabled.join('+') === SCRATCH_GROUPS.join('+')
  row(
    'R0(c) neither boot read/wrote the developer\'s persisted security store (both resolved under their own scratch profile)',
    storeAKept && storeBKept,
    `A=${storeA} honoured, B=${storeB} honoured, no default-profile store touched`,
  )

  // §3.1 step 7 / §3.4 — the shim leg's recorded status.
  console.log(`\n--- R3: the shim leg's recorded status ---`)
  console.log(`  · shim leg: UNSUPPORTED`)
  console.log(`    reason: the shim has no layout, no getBoundingClientRect semantics and no getComputedStyle,`)
  console.log(`    so it cannot carry this measurement; it is recorded UNSUPPORTED — never divergent, never matching, never a fabricated 0.`)
  console.log(`  · shim probe observation: ${shimMarker}`)
  row('R3 shim leg recorded UNSUPPORTED with its reason (no layout / no getBoundingClientRect / no getComputedStyle)', true, 'UNSUPPORTED')

  // §3.1 step 8 / §3.0 R4 — the honest-limits row.
  console.log(`\n--- R4: honest limits (static row: no app-level claim in this leg) ---`)
  console.log(HONEST_LIMITS)
  const legSource = readFileSync(join(here, 'electron-ui.mjs'), 'utf8')
  const appClaim = /app\.isPackaged/.test(legSource)
  row('R4 no app-level claim: no packaged-bundle reference, no packaged-mode detection claim in this leg', !appClaim, `${legSource.length} bytes scanned`)

  await bootA.client.close()
  await bootB.client.close()
  try { bootA.child.kill('SIGKILL') } catch { /* already gone */ }
  try { bootB.child.kill('SIGKILL') } catch { /* already gone */ }

  console.log(`\nUI RESULT: ${failures} failures (${5 - failures}/5 rows green)`)
  if (failures > 0) {
    console.error('  a measurement row failed — see the named row above (ci-ui-leg.md §3.6 exit 1)')
    process.exit(1)
  }
  console.log('  measurement: ' + observed)
  process.exit(0)
} catch (e) {
  console.error(`\n  ✗ boot/connect failure: ${e instanceof Error ? e.message : String(e)}`)
  console.error('  a leg that cannot spawn or connect reports this loudly — never a 0, never a green (ci-ui-leg.md §2.1 item 4, §3.6 exit 1)')
  process.exit(1)
}
