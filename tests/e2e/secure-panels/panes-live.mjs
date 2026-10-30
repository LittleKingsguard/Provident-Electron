#!/usr/bin/env node
// tests/e2e/secure-panels/panes-live.mjs — the `secure-panels` unit's LIVE battery:
// rows `P-1`…`P-7` of `docs/L1/secure-panels.md` §4.3, over a real renderer.
//
// WHAT THIS LEG IS. The unit closes D-11's uncovered census term: the gate validates SIX
// group names (`src/main/security.ts`'s `ToolGroup`) and the operator's pane offers FIVE
// (`src/renderer/secure-panels.ts`'s `GROUPS`), so `data` is a valid group with no operator
// control (D-35). The pane lives in its OWN isolated graph, so NO MCP endpoint can read or
// drive it (`src/renderer/secure-panels.ts:1-17`; D-16, D-18) — which is why the proof is a
// RENDERED reading on a live leg and never a node-suite row (`brief.md` §6, D-27, D-30).
//
// THE MEASUREMENT CHANNEL (§4.2), exactly the design's: a driver-authored provident HANDLER
// BODY, loaded through the EXISTING `provident.load` and driven by the EXISTING
// `provident.dispatch`, which reads `#panes` in the RENDERER realm and — for the gesture —
// issues an ordinary `click` event on the RENDERED toggle. The pane's own `DomAdapter` turns
// that into a pane-graph dispatch and then into the landed shared `TOGGLE_BODY`
// (`src/renderer/secure-panels.ts:385-397,135-142`), which calls the IPC bridge
// (`window.provident.security.set`) — the production path from control to store, with only
// the event's ORIGIN synthetic. The observation comes back over the EXISTING
// `provident.get_rendered_html` (the body writes it into authored graph content), never as a
// new MCP tool: no new tool, no new route, no new group, `ALL_TOOLS` untouched (D-35).
//
// THIS LEG'S OWN LIMITS, stated rather than hidden (the ui leg's `R4` precedent, and
// `scripts/electron-ui.mjs:238-241` for the same admission about its channel):
//   · A body-issued `click` is NOT a coordinate gesture. It carries an event name and a
//     rendered ELEMENT, never a pointer position; the ui leg's honest-limits row says the
//     same about `provident.dispatch`. That is why P-3's non-zero rendered box is a ROW and
//     not a comfort, and why a pointer-level upgrade is the CDP channel this unit refuses
//     (`docs/L1/secure-panels.md` ASM-2; D-30, D-32).
//   · No CDP and no renderer-eval call is used: the ui leg's `R4` static set is neither
//     weakened nor extended, and the exclusion battery's CDP channel stays its own unit's.
//   · The READ is an instrument, not a gesture: `provident.load` installs the driver's
//     envelope in the APP graph (`Runtime.loadEnvelope` REPLACES that graph) and issues no
//     click, so "before any gesture" in P-4/P-5 means "before any click on the pane", never
//     "before this leg touched the app at all". Loading the driver touches no pane node: the
//     pane is a second, ISOLATED graph (`src/renderer/secure-panels.ts:9-17`).
//   · Both boots share ONE scratch profile (P-5's restart), and the instance's own record file
//     is created ZERO-LENGTH at the store's construction, so "no record yet" and "a record"
//     are told apart by the bytes this leg reads and PRINTS, never assumed.
//   · A `DISPLAY` is a PREREQUISITE, not a skip: the app opens a real `BrowserWindow`, so a
//     host with no display exits `3` before any boot (`platform.md` §3;
//     `scripts/electron-ui.mjs:97-103`). A row is NEVER made conditional and NEVER skipped.
//   · This leg makes NO claim about any surface OUTSIDE the pane. It does not claim the
//     packaged app behaves this way, does not claim the pane is faithful under a real pointer,
//     and does not claim anything about the five landed groups beyond "they did not move"
//     (P-7). It reads exactly: the six/eight row set, one row's rendered box and word, the
//     status line's `enabled:` composition, `tools/list` as a SET DIFFERENCE, and the
//     operator-settings instance's own bytes.
//
// RED-FIRST BY CONSTRUCTION (D-27, `examiner.md` §3). At the head this file was authored
// against, `GROUPS` carries five names, so P-2…P-6 answer RED until E-1 (one entry in
// `GROUPS`, one in `GROUP_LABELS`) lands. That red is the evidence the unit is admitted on,
// never a green filed early — so a reader may meet this leg red and be looking at the defect
// it exists to name.
//
// EXIT CODES (closed vocabulary; no failure may become a skip, a `0` or a green):
//   `0` every declared row passed · `1` a row failed, or a spawn/handshake failure, or the
//   built bundle is absent · `3` PREREQUISITE ERROR (no display, decided before any boot).
//
// RUN: npm run build && node tests/e2e/secure-panels/panes-live.mjs
// (this leg adds NO script key: `package.json`'s pinned key set is not this unit's to move,
// `tests/ui-leg-contract.test.ts:165-203`)
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  ChildProcessTransport,
  cleanupProfiles,
  makeFreshProfile,
  repoRoot,
  spawnElectron,
} from '../../../scripts/electron-spawn.mjs'

const root = repoRoot
/** The built main-process bundle every boot runs (`npm run build`). */
const mainBundle = join(root, 'dist', 'main', 'main.mjs')
/** The ONE additive startup flag the seam parses: it relocates the user-data root for THIS
 *  boot and flips no security default (`src/main/main.ts:87-88`). */
const USER_DATA_FLAG = '--provident-user-data='
/** The groups the DRIVER supplies as this run's state (§4.3 P-3): the landed defaults plus
 *  the two the measurement channel's own calls live in — `provident.load` is `graph` and a
 *  handler body is `code` (`scripts/electron-ui.mjs:576`; D-19). `data` is deliberately NOT
 *  among them: the grant P-4/P-6 measure must come from the PANE, never from this seed. */
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code']
/** The retired record's name — READ ONCE at the first boot by the instance's import-once path
 *  and never written by anything (`src/main/operator-settings/index.ts:119-121`). Seeding it
 *  is how the driver supplies a state at all; the instance's own file below owns it after. */
const SEED_FILE = 'provident-security.json'
/** The instance's OWN file, at the record's address `['operator-settings']` (D-25; P-5). */
const INSTANCE_FILE = 'provident-operator-settings.json'
/** The five `provident.data.*` names central-data registered (D-11). P-4/P-6 assert these as a
 *  SET DIFFERENCE on `tools/list`, never as a count (ASM-4, D-26). */
const DATA_TOOLS = [
  'provident.data.read',
  'provident.data.write',
  'provident.data.delete',
  'provident.data.list',
  'provident.data.journal',
]
/** The pane's own address vocabulary — what `list_targets`/`get_rendered_html` must NEVER
 *  resolve, because the pane is an isolated graph (P-7; D-16, D-18). `toggle:<group>` is a
 *  PREFIX, matched as such. */
const PANE_ID_PREFIX = 'toggle:'
const PANE_IDS = ['secure-panes', 'settings-pane', 'group-toggles', 'security-status']
/** The pane's status line's `enabled:` composition (`src/renderer/secure-panels.ts:540`). */
const ENABLED_RE = /enabled:\s*\[([^\]]*)\]/
/** The settle bound: the renderer settles a requested load asynchronously and the pane's
 *  `refresh()` is an async IPC round-trip, so a single read can catch the pre-settlement paint
 *  (the ui leg's own `UI_SETTLE_READS_MAX` precedent). Bounded, and the poll count is PRINTED
 *  with the reading so a reader can tell a settled reading from a timed-out one. */
const SETTLE_READS_MAX = 16
const SETTLE_DELAY_MS = 250
/** The record-file poll bound (P-5/P-6): the write rides the instance's own store call, so a
 *  read taken in the same tick as the click can precede the bytes. */
const FILE_POLL_MAX = 20
const FILE_POLL_DELAY_MS = 150
/** ONE boot's MCP handshake bound (`src/main/mcp-server.ts`'s own 30 000 ms readiness bound). */
const HANDSHAKE_TIMEOUT_MS = 30000

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ---- the row printer -------------------------------------------------------
let failures = 0
let rowsChecked = 0
/** Report one row of the design's row set. Every row prints its own labelled line, and a
 *  failure is a NAMED row — never a silent skip (`examiner.md` §2). */
function row(id, subject, cond, detail) {
  rowsChecked += 1
  const line = `  ${cond ? '✓' : '✗'} [${id}] ${subject}`
  if (cond) console.log(`${line}\n      observed: ${detail}`)
  else {
    failures += 1
    console.error(`${line}\n      observed: ${detail}`)
  }
}

// ---- MCP plumbing ----------------------------------------------------------
async function call(client, name, args = {}) {
  MCP_CALLS.push(name)
  const r = await client.callTool({ name, arguments: args })
  const text = r.content?.[0]?.text ?? ''
  try {
    return JSON.parse(text)
  } catch {
    return { __unparsable: text }
  }
}
const MCP_CALLS = []

/** The tool NAMES the live surface advertises, SORTED — a SET reading, never a count. */
async function toolNames(client) {
  const tools = await client.listTools()
  return tools.tools.map((t) => String(t.name)).sort()
}

// ---- the driver's envelope (the measurement channel) ------------------------
// TWO handler bodies, both written to the SAME authored output node so the observation always
// comes back as ONE framed block: `PANE_OBS!…!END_OBS`. Fields are `key=value` joined by `;`
// and every free-text field is percent-encoded, so neither `;` nor `|` can appear inside a
// value (the ui leg frames its probe the same way for the same reason, `N-5`).
const READ_BODY = `function (ctx) {
  var out = null
  var nodes = ctx.tree.allNodes()
  for (var i = 0; i < nodes.length; i += 1) {
    var n = nodes[i]
    if (n && n.props && n.props.id === 'panes-out') out = n
  }
  if (!out) return
  var lines = []
  try {
    var root = document.getElementById('panes')
    if (root === null) {
      lines.push('error=' + encodeURIComponent('no #panes mount in this renderer realm'))
    } else {
      var rows = root.querySelectorAll('[data-group]')
      var first = rows.length > 0 ? rows[0] : null
      for (var j = 0; j < rows.length; j += 1) {
        var el = rows[j]
        var box = el.getBoundingClientRect()
        lines.push('row=' + String(el.getAttribute('data-group')) + '|' + String(el.getAttribute('data-on')) +
          '|' + Math.round(box.width) + 'x' + Math.round(box.height) +
          '|' + encodeURIComponent(String(el.textContent === null ? '' : el.textContent)))
      }
      var status = root.querySelector('#security-status')
      var statusText = status === null || status.textContent === null ? '' : String(status.textContent)
      lines.push('status=' + encodeURIComponent(statusText))
      lines.push('count=' + rows.length)
      lines.push('realm=' + (first === null ? 'none' : String(first.constructor && first.constructor.name)))
    }
  } catch (e) {
    lines = ['error=' + encodeURIComponent(String(e && e.message ? e.message : e))]
  }
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'PANE_OBS!' + lines.join(';') + '!END_OBS' }])
}`

// THE GESTURE, and the whole of its synthetic part: an ordinary `click` event raised on the
// RENDERED row. Nothing about the pane, the pane graph or the bridge is reached from here —
// the pane's own DomAdapter resolves the element's wiring and the landed `TOGGLE_BODY` runs
// under the pane's supervisor (`src/renderer/secure-panels.ts:385-397,135-142`).
const CLICK_BODY = `function (ctx) {
  var out = null
  var nodes = ctx.tree.allNodes()
  for (var i = 0; i < nodes.length; i += 1) {
    var n = nodes[i]
    if (n && n.props && n.props.id === 'panes-out') out = n
  }
  if (!out) return
  var note
  try {
    var root = document.getElementById('panes')
    var target = root === null ? null : root.querySelector('[data-group="data"]')
    if (target === null) {
      note = 'absent'
    } else {
      target.click()
      note = 'clicked'
    }
  } catch (e) {
    note = 'error:' + String(e && e.message ? e.message : e)
  }
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'PANE_OBS!click=' + encodeURIComponent(note) + '!END_OBS' }])
}`

const READ_BUTTON = 'panes-read'
const CLICK_BUTTON = 'panes-click-data'

function driverEnvelope() {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'panes-driver' },
        children: [
          { type: 'button', css: { id: READ_BUTTON }, props: { id: READ_BUTTON }, content: 'read the pane',
            handlers: [{ name: READ_BUTTON, event: 'click', body: READ_BODY }] },
          { type: 'button', css: { id: CLICK_BUTTON }, props: { id: CLICK_BUTTON }, content: 'click the sixth row',
            handlers: [{ name: CLICK_BUTTON, event: 'click', body: CLICK_BODY }] },
          { type: 'div', props: { id: 'panes-out' }, content: '(no observation yet)' },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

/** ONE read of the pane through the driver's body, framed and parsed. */
function parseObs(html) {
  const m = /PANE_OBS!([\s\S]*?)!END_OBS/.exec(html)
  if (m === null) return { present: false, rows: [], status: '', click: '', error: '', count: null, realm: '' }
  const rows = []
  const fields = { count: null, realm: '', status: '', click: '', error: '' }
  for (const part of m[1].split(';')) {
    const eq = part.indexOf('=')
    if (eq < 0) continue
    const key = part.slice(0, eq)
    const value = part.slice(eq + 1)
    if (key === 'row') {
      const bits = value.split('|')
      const [w, h] = String(bits[2] ?? '').split('x')
      rows.push({
        group: bits[0] ?? '',
        on: bits[1] ?? '',
        w: Number(w),
        h: Number(h),
        text: safeDecode(bits.slice(3).join('|')),
      })
    } else if (key === 'count') {
      fields.count = Number(value)
    } else if (Object.prototype.hasOwnProperty.call(fields, key)) {
      fields[key] = safeDecode(value)
    }
  }
  return { present: true, rows, ...fields }
}
function safeDecode(v) {
  try {
    return decodeURIComponent(String(v))
  } catch {
    return String(v)
  }
}
const enabledList = (status) => {
  const m = ENABLED_RE.exec(String(status))
  return m === null ? null : m[1].split(',').map((s) => s.trim()).filter((s) => s !== '')
}

async function readPane(client) {
  await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: READ_BUTTON }, event: 'click' })
  const html = await call(client, 'provident.get_rendered_html', {})
  return parseObs(String(html.renderedHtml ?? ''))
}

/** Read the pane until `until(read)` holds, bounded. Returns `{ read, polls, settled }` — the
 *  poll count is printed with the row so a timed-out read is visible as one. */
async function settlePane(client, until, what) {
  let read = await readPane(client)
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    if (until(read)) return { read, polls, settled: true }
    await sleep(SETTLE_DELAY_MS)
    read = await readPane(client)
  }
  console.log(`  · note: the pane had not settled within ${SETTLE_READS_MAX} reads waiting for ${what} — the last read stands`)
  return { read, polls: SETTLE_READS_MAX, settled: false }
}

/** Issue the gesture EXACTLY ONCE and report whether it reached a RENDERED row. */
async function clickData(client) {
  clicksIssued += 1
  await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: CLICK_BUTTON }, event: 'click' })
  const html = await call(client, 'provident.get_rendered_html', {})
  return parseObs(String(html.renderedHtml ?? '')).click
}
let clicksIssued = 0

// ---- boots -----------------------------------------------------------------
let activeChild = null
const liveBoots = []
process.on('exit', () => {
  for (const boot of liveBoots) {
    try { boot.child.kill('SIGKILL') } catch { /* already gone */ }
  }
  if (activeChild !== null) {
    try { activeChild.kill('SIGKILL') } catch { /* already gone */ }
  }
  cleanupProfiles()
})

/** A fresh scratch profile carrying the DRIVER's supplied state, through the retired name's
 *  import-once path (never a hand-written instance file: its bytes are the store's own image,
 *  and no leg may write them — C-4). */
function seededProfile() {
  const profile = makeFreshProfile('provident-panes')
  writeFileSync(join(profile, SEED_FILE), JSON.stringify({ token: null, enabled: SEEDED_GROUPS }, null, 2))
  return profile
}

async function connectBoot(tag, profile) {
  const spawned = spawnElectron([`${USER_DATA_FLAG}${profile}`])
  const child = spawned.child
  activeChild = child
  const boot = { tag, profile, child, transport: null, client: null, stderr: '' }
  liveBoots.push(boot)
  child.stderr.on('data', (d) => { boot.stderr += String(d) })
  const transport = new ChildProcessTransport(child)
  boot.transport = transport
  const client = new Client({ name: `panes-live-${tag}`, version: '0.1.0' })
  boot.client = client
  let timedOut = false
  let handshakeTimer = null
  const timeout = new Promise((_resolve, reject) => {
    handshakeTimer = setTimeout(() => {
      timedOut = true
      reject(new Error(`MCP handshake did not complete within ${HANDSHAKE_TIMEOUT_MS} ms`))
    }, HANDSHAKE_TIMEOUT_MS)
  })
  try {
    await Promise.race([client.connect(transport), timeout])
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e)
    const code = child.exitCode
    const signal = child.signalCode
    throw new Error(
      `boot ${tag} could not open its MCP transport: ${why}` +
      `${timedOut ? ' (the handshake timed out)' : ''}; child (code ${code}, signal ${signal})` +
      `${boot.stderr === '' ? '' : `\n  child stderr (tail): ${boot.stderr.split('\n').slice(-12).join('\n    ')}`}`,
    )
  } finally {
    if (handshakeTimer !== null) clearTimeout(handshakeTimer)
  }
  return boot
}

async function teardownBoot(boot) {
  try { await boot.client?.close() } catch { /* already gone */ }
  try { boot.transport?.close() } catch { /* already gone */ }
  try { boot.child.kill('SIGKILL') } catch { /* already gone */ }
  if (activeChild === boot.child) activeChild = null
  // The PROFILE is deliberately NOT removed: P-5's whole subject is a restart on the SAME
  // scratch profile. The helper's `cleanupProfiles()` removes it at process exit.
  await sleep(300)
}

/** `provident.load` replaces the app graph with the driver's envelope (`Runtime.loadEnvelope`),
 *  so it is loaded ONCE per boot and the two buttons are dispatched thereafter. */
async function loadDriver(client) {
  await call(client, 'provident.load', { kind: 'envelope', envelope: driverEnvelope() })
}

/** The app-graph surface the pane must stay absent from (P-7): the rendered HTML's own text and
 *  the `propsId`/`cssId` vocabulary `list_targets` resolves. */
async function isolationSurface(client) {
  const html = await call(client, 'provident.get_rendered_html', {})
  const targets = await call(client, 'provident.list_targets', {})
  const renderedHtml = String(html.renderedHtml ?? '')
  const ids = (Array.isArray(targets.nodes) ? targets.nodes : [])
    .flatMap((n) => [n?.propsId, n?.cssId])
    .filter((v) => typeof v === 'string')
  return { renderedHtml, ids }
}
function paneHit(surface) {
  const hits = []
  for (const id of PANE_IDS) if (surface.ids.includes(id)) hits.push(`list_targets:${id}`)
  for (const id of surface.ids) if (id.startsWith(PANE_ID_PREFIX)) hits.push(`list_targets:${id}`)
  for (const id of PANE_IDS) if (surface.renderedHtml.includes(id)) hits.push(`rendered_html:${id}`)
  if (surface.renderedHtml.includes(PANE_ID_PREFIX)) hits.push(`rendered_html:${PANE_ID_PREFIX}*`)
  return hits
}

/** The instance's own record, read at its declared address (`['operator-settings']`). The raw
 *  bytes ride along as EVIDENCE: the store creates this file exclusively and zero-length at its
 *  construction (`provident-storeroom` guide §9.1), so an empty file is the declared
 *  "no record yet" state and is reported as such rather than as an unparsable one. */
function readRecord(profile) {
  const file = join(profile, INSTANCE_FILE)
  if (!existsSync(file)) return { present: false, record: null, enabled: null, raw: '', reason: 'the instance file is absent' }
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') return { present: true, record: null, enabled: null, raw, reason: 'the instance file carries no record yet (zero-length, the construction\'s own create)' }
  try {
    const parsed = JSON.parse(raw)
    const record = parsed === null || typeof parsed !== 'object' ? null : parsed['operator-settings']
    if (record === null || typeof record !== 'object' || Array.isArray(record)) {
      return { present: true, record: null, enabled: null, raw, reason: 'the record address `operator-settings` carries no object' }
    }
    return {
      present: true,
      record,
      enabled: Array.isArray(record.enabled) ? record.enabled.map(String) : null,
      raw,
      reason: '',
    }
  } catch (e) {
    return { present: true, record: null, enabled: null, raw, reason: `the instance file is unparsable: ${e instanceof Error ? e.message : String(e)}` }
  }
}
/** One record as a printed phrase — the grant's presence or the reason there is none. */
const recordText = (rec) =>
  rec.enabled === null
    ? `${rec.present ? 'no enabled list' : 'absent'}${rec.reason === '' ? '' : ` (${rec.reason})`}`
    : `enabled=[${rec.enabled.join(', ')}]`

/** Poll the record until `until(record)` holds, bounded — the write rides the instance's own
 *  store call, so a read in the click's own tick can precede the bytes. */
async function settleRecord(profile, until, what) {
  let read = readRecord(profile)
  for (let polls = 1; polls <= FILE_POLL_MAX; polls += 1) {
    if (until(read)) return { read, polls, settled: true }
    await sleep(FILE_POLL_DELAY_MS)
    read = readRecord(profile)
  }
  console.log(`  · note: the instance's file had not settled within ${FILE_POLL_MAX} reads waiting for ${what} — the last read stands`)
  return { read, polls: FILE_POLL_MAX, settled: false }
}

// ---- P-1's precondition: the gate's DECLARED group set, read off the tree -----
/** P-1 reads the TREE (the B-1 precedent): `ToolGroup`'s union members and the two live
 *  `VALID_GROUPS` copies (D-23). It asserts the declared set the pane must offer — never the
 *  pane's own list, which is this unit's subject. */
function declaredGroupSet() {
  const gate = readFileSync(join(root, 'src', 'main', 'security.ts'), 'utf8')
  const instance = readFileSync(join(root, 'src', 'main', 'operator-settings', 'index.ts'), 'utf8')
  const union = /export type ToolGroup\s*=([^\n]+)/.exec(gate)
  const members = union === null ? [] : [...union[1].matchAll(/'([a-z]+)'/g)].map((m) => m[1])
  const copies = [['security.ts', gate], ['operator-settings/index.ts', instance]].map(([name, src]) => {
    const m = /VALID_GROUPS[^=]*=\s*new Set\(\[([^\]]*)\]\)/.exec(src)
    return { name, groups: m === null ? null : [...m[1].matchAll(/'([a-z]+)'/g)].map((x) => x[1]) }
  })
  return { members, copies }
}
const sameSet = (a, b) =>
  Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
  [...a].sort().join('|') === [...b].sort().join('|')

// ══════════════════════════════════════════════════════════════════════════════
// THE RUN
// ══════════════════════════════════════════════════════════════════════════════
console.log('\nPANES — the Settings pane\'s sixth group (secure-panels, docs/L1/secure-panels.md §4.3)')
console.log('='.repeat(88))

// The PREREQUISITES are decided BEFORE any boot and are never a retry case
// (`platform.md` §3; `scripts/electron-ui.mjs:97-103`).
if (typeof process.env.DISPLAY !== 'string' || process.env.DISPLAY === '') {
  console.error('PREREQUISITE ERROR — no display server: DISPLAY is unset.')
  console.error('  This leg boots a REAL Electron BrowserWindow (no show:false, no offscreen mode), so the')
  console.error('  rendered pane it measures cannot exist without a display. FIX: run under a display —')
  console.error('  `DISPLAY=:0 node tests/e2e/secure-panels/panes-live.mjs`, or wrap the run in xvfb:')
  console.error('  `xvfb-run -a --server-args="-screen 0 1024x768x24" node tests/e2e/secure-panels/panes-live.mjs`')
  console.error('  This is exit 3 — a prerequisite error, never a skip and never a green.')
  process.exit(3)
}
console.log(`  · display: DISPLAY=${process.env.DISPLAY} (prerequisite satisfied)`)
if (!existsSync(mainBundle)) {
  console.error(`\n  ✗ the built bundle is absent: ${mainBundle}`)
  console.error('  FIX: npm run build — this leg measures a BUILT tree and never builds one itself.')
  process.exit(1)
}

try {
  // ---- P-1: the gate's declared set (a tree reading, the precondition) ------
  const declared = declaredGroupSet()
  const copiesAgree = declared.copies.every((c) => c.groups !== null && sameSet(c.groups, declared.members))
  row(
    'P-1',
    'the gate declares the group set the pane must offer: ToolGroup carries six members and `data` is one; both live VALID_GROUPS copies admit all six',
    declared.members.length === 6 && declared.members.includes('data') && copiesAgree,
    `ToolGroup={${declared.members.join(',')}} (${declared.members.length} members); ` +
    declared.copies.map((c) => `VALID_GROUPS@${c.name}=${c.groups === null ? '(not found)' : `{${c.groups.join(',')}}`}`).join(' · '),
  )
  const declaredSet = [...declared.members].sort()
  console.log(`  · the declared set the rendered pane is read against: [${declaredSet.join(', ')}]`)

  const profile = seededProfile()
  console.log(`  · scratch profile (ONE for both boots — P-5's restart is on this directory): ${profile}`)
  console.log(`  · driver-supplied state, through the retired name's import-once path: ${SEED_FILE} → enabled=[${SEEDED_GROUPS.join(', ')}]`)

  // ══ BOOT A ══════════════════════════════════════════════════════════════════
  const bootA = await connectBoot('A', profile)
  console.log(`\n--- boot A (pid ${bootA.child.pid}) ---`)

  // P-7's SECOND HALF, read BEFORE the driver's envelope exists: this is the app graph's own
  // state, so a pane node appearing here cannot be this leg's own writing.
  const isoA0 = await isolationSurface(bootA.client)
  const toolsA0 = await toolNames(bootA.client)
  console.log(`  · tools/list before any gesture: ${toolsA0.length} names`)
  console.log(`  · app graph before the driver's load: ${isoA0.ids.length} addressable ids, ${isoA0.renderedHtml.length} bytes of renderedHtml`)

  await loadDriver(bootA.client)
  const firstPaintA = await settlePane(bootA.client, (r) => r.present && enabledList(r.status) !== null, 'the pane\'s first refresh')
  const pre = firstPaintA.read
  console.log(`  · pane read (${firstPaintA.polls} read(s), settled=${firstPaintA.settled}): ${pre.rows.length} \`[data-group]\` row(s), realm=${pre.realm}`)
  for (const r of pre.rows) console.log(`      ${r.group}: data-on=${r.on} box=${r.w}x${r.h} text="${r.text}"`)
  console.log(`      status: "${pre.status}"`)

  const renderedSet = [...pre.rows.map((r) => r.group)].sort()
  const dataRowPre = pre.rows.find((r) => r.group === 'data') ?? null
  const preEnabled = enabledList(pre.status)

  // ---- P-2: one rendered toggle per declared group --------------------------
  row(
    'P-2',
    'the rendered pane offers one toggle per declared group: the `#panes` subtree holds one `[data-group]` row per member of P-1\'s set, and the value set equals it',
    pre.present && pre.rows.length === declared.members.length && sameSet(renderedSet, declared.members) &&
      new Set(renderedSet).size === renderedSet.length &&
      Array.isArray(preEnabled) && sameSet(preEnabled, SEEDED_GROUPS),
    `rendered [${renderedSet.join(', ')}] (${pre.rows.length} row(s)) vs declared [${declaredSet.join(', ')}] (${declared.members.length}); ` +
    `status line's enabled composition = [${(preEnabled ?? []).join(', ')}] vs the driver-supplied [${SEEDED_GROUPS.join(', ')}]; realm=${pre.realm}` +
    `${pre.error === '' ? '' : `; read error: ${pre.error}`}`,
  )

  // ---- P-3: the sixth row is a control, not a decoration --------------------
  const namesGroup = dataRowPre !== null && /\bdata\b/.test(dataRowPre.text)
  const boxNonZero = dataRowPre !== null && Number.isFinite(dataRowPre.w) && Number.isFinite(dataRowPre.h) &&
    dataRowPre.w > 0 && dataRowPre.h > 0
  const readsOff = dataRowPre !== null && dataRowPre.on === 'false' && dataRowPre.text.startsWith('☐')
  row(
    'P-3',
    'the sixth row is a control, not a decoration: the `data` row carries a non-zero rendered box, a text naming the `data` group, and reads off (`data-on="false"`, `☐`) under the driver\'s supplied state',
    dataRowPre !== null && boxNonZero && namesGroup && readsOff,
    dataRowPre === null
      ? `NO \`[data-group="data"]\` ROW IS RENDERED at this head (GROUPS carries ${pre.rows.length} name(s): [${renderedSet.join(', ')}]) — the row the design's P-3 measures does not exist yet`
      : `box=${dataRowPre.w}x${dataRowPre.h} (non-zero: ${boxNonZero}); text="${dataRowPre.text}" (names the group: ${namesGroup}); data-on="${dataRowPre.on}", leading word ${JSON.stringify(dataRowPre.text.slice(0, 1))} (off: ${readsOff})`,
  )

  // ---- P-4: the operator grants `data` from the pane ------------------------
  const grantNote = await clickData(bootA.client)
  console.log(`  · P-4 gesture: ${clickNote(grantNote)}`)
  const afterGrant = await settlePane(bootA.client, (r) => r.rows.some((x) => x.group === 'data' && x.on === 'true'), 'the `data` row to turn on')
  const post = afterGrant.read
  const dataRowPost = post.rows.find((r) => r.group === 'data') ?? null
  const postEnabled = enabledList(post.status)
  const toolsA1 = await toolNames(bootA.client)
  const gained = toolsA1.filter((n) => !toolsA0.includes(n))
  const lost = toolsA0.filter((n) => !toolsA1.includes(n))
  row(
    'P-4',
    'the operator grants `data` from the pane: ONE click turns it on (`data-on="true"`, `☑`), the status line carries `data` in its `enabled:` composition, and `tools/list` gains EXACTLY the five `provident.data.*` names (a set difference, never a count)',
    dataRowPost !== null && dataRowPost.on === 'true' && dataRowPost.text.startsWith('☑') &&
      Array.isArray(postEnabled) && postEnabled.includes('data') &&
      sameSet(gained, DATA_TOOLS) && lost.length === 0 && clicksIssued === 1,
    dataRowPost === null
      ? `NO \`data\` ROW TO CLICK (${clickNote(grantNote)}); tools/list ${toolsA0.length} → ${toolsA1.length}, gained [${gained.join(', ')}]`
      : `after ONE click (${clicksIssued} issued): data-on="${dataRowPost.on}", text="${dataRowPost.text}"; ` +
        `status enabled=[${(postEnabled ?? []).join(', ')}]; tools/list ${toolsA0.length} → ${toolsA1.length}; ` +
        `GAINED [${gained.join(', ') || '(none)'}] vs the five declared [${DATA_TOOLS.join(', ')}]; LOST [${lost.join(', ') || '(none)'}]; ` +
        `settle=${afterGrant.settled} after ${afterGrant.polls} read(s)`,
  )

  // ---- P-7: the five landed rows are unmoved --------------------------------
  // Ordered, because the design fixes their ORDER in `#group-toggles` as well as their words.
  const landed = (read) => read.rows.filter((r) => r.group !== 'data').map((r) => `${r.group}/${r.on}/${r.text}`)
  const landedPre = landed(pre)
  const landedPost = landed(post)
  const isoA1 = await isolationSurface(bootA.client)
  const hitsA0 = paneHit(isoA0)
  const hitsA1 = paneHit(isoA1)

  await teardownBoot(bootA)
  console.log('  · boot A torn down; its scratch profile is KEPT for the restart (P-5)')

  // ══ BOOT B — the restart, on the SAME scratch profile ═══════════════════════
  const bootB = await connectBoot('B', profile)
  console.log(`\n--- boot B (pid ${bootB.child.pid}, the SAME profile) ---`)
  const isoB0 = await isolationSurface(bootB.client)
  const toolsB0 = await toolNames(bootB.client)
  console.log(`  · tools/list at boot B before any gesture: ${toolsB0.length} names`)

  await loadDriver(bootB.client)
  const firstPaintB = await settlePane(bootB.client, (r) => r.present && enabledList(r.status) !== null, 'boot B\'s first refresh')
  const restart = firstPaintB.read
  const restartDataRow = restart.rows.find((r) => r.group === 'data') ?? null
  const restartEnabled = enabledList(restart.status)
  const recordAfterBoot = readRecord(profile)
  console.log(`  · boot B pane read (${firstPaintB.polls} read(s), settled=${firstPaintB.settled}): ${restart.rows.length} row(s)`)
  for (const r of restart.rows) console.log(`      ${r.group}: data-on=${r.on} box=${r.w}x${r.h} text="${r.text}"`)
  console.log(`      status: "${restart.status}"`)
  console.log(`      instance file ${INSTANCE_FILE}: ${recordText(recordAfterBoot)}`)
  console.log(`      instance file bytes (verbatim, ${recordAfterBoot.raw.length}): ${JSON.stringify(recordAfterBoot.raw.slice(0, 240))}`)

  // ---- P-5: the instance owns the grant across a restart -------------------
  const recordGrant = await settleRecord(profile, (r) => Array.isArray(r.enabled) && r.enabled.includes('data'), 'the instance\'s file to carry the grant')
  const rec = recordGrant.read
  row(
    'P-5',
    'the instance owns the grant across a restart: a second boot on the SAME scratch profile paints the sixth row on at first paint, its status line carries `data`, the instance\'s file carries the grant, and `tools/list` still carries the five names',
    restartDataRow !== null && restartDataRow.on === 'true' && restartDataRow.text.startsWith('☑') &&
      Array.isArray(restartEnabled) && restartEnabled.includes('data') &&
      Array.isArray(rec.enabled) && rec.enabled.includes('data') &&
      DATA_TOOLS.every((n) => toolsB0.includes(n)),
    restartDataRow === null
      ? `NO \`data\` ROW AT BOOT B's FIRST PAINT (${restart.rows.length} row(s)); instance file ${recordText(rec)}; tools/list carries the five names: ${DATA_TOOLS.every((n) => toolsB0.includes(n))}`
      : `data-on="${restartDataRow.on}", text="${restartDataRow.text}"; status enabled=[${(restartEnabled ?? []).join(', ')}]; ` +
        `instance file ${recordText(rec)} (${recordGrant.polls} read(s), settled=${recordGrant.settled}); ` +
        `tools/list carries all five data names: ${DATA_TOOLS.every((n) => toolsB0.includes(n))} (gained at boot B: [${toolsB0.filter((n) => !toolsA0.includes(n)).join(', ') || '(none)'}])`,
  )

  // ---- P-6: the same control revokes ---------------------------------------
  const revokeNote = await clickData(bootB.client)
  console.log(`  · P-6 gesture: ${clickNote(revokeNote)}`)
  const afterRevoke = await settlePane(bootB.client, (r) => r.rows.some((x) => x.group === 'data' && x.on === 'false'), 'the `data` row to turn off')
  const revoked = afterRevoke.read
  const revokedDataRow = revoked.rows.find((r) => r.group === 'data') ?? null
  const toolsB1 = await toolNames(bootB.client)
  const revokeGained = toolsB1.filter((n) => !toolsB0.includes(n))
  const revokeLost = toolsB0.filter((n) => !toolsB1.includes(n))
  const recordAfterRevoke = await settleRecord(profile, (r) => !(Array.isArray(r.enabled) && r.enabled.includes('data')), 'the instance\'s file to drop the grant')
  const recRevoked = recordAfterRevoke.read
  row(
    'P-6',
    'the same control revokes: a second click turns the row off, the five names leave `tools/list`, and the file\'s record no longer carries `data` — a toggle, not a one-way grant',
    revokedDataRow !== null && revokedDataRow.on === 'false' && revokedDataRow.text.startsWith('☐') &&
      sameSet(revokeLost, DATA_TOOLS) && revokeGained.length === 0 &&
      Array.isArray(recRevoked.enabled) && !recRevoked.enabled.includes('data') && clicksIssued === 2,
    revokedDataRow === null
      ? `NO \`data\` ROW TO CLICK AT BOOT B (${clickNote(revokeNote)}); tools/list ${toolsB0.length} → ${toolsB1.length}`
      : `after the SECOND click (${clicksIssued} issued across both boots): data-on="${revokedDataRow.on}", text="${revokedDataRow.text}"; ` +
        `tools/list ${toolsB0.length} → ${toolsB1.length}; LOST [${revokeLost.join(', ') || '(none)'}] vs the five declared [${DATA_TOOLS.join(', ')}]; ` +
        `GAINED [${revokeGained.join(', ') || '(none)'}]; instance file ${recordText(recRevoked)} ` +
        `(${recordAfterRevoke.polls} read(s), settled=${recordAfterRevoke.settled}); settle=${afterRevoke.settled} after ${afterRevoke.polls} read(s)`,
  )

  // ---- P-7 (both halves) ---------------------------------------------------
  const isoB1 = await isolationSurface(bootB.client)
  const hitsB0 = paneHit(isoB0)
  const hitsB1 = paneHit(isoB1)
  row(
    'P-7',
    'the five landed rows are unmoved, and the pane stays unreachable from the MCP surface: each of the five reads what it read before P-4, and `provident.list_targets`/`get_rendered_html` resolve no pane node across both boots',
    landedPre.length === 5 &&
      landedPre.join('¦') === landedPost.join('¦') &&
      landedPre.join('¦') === landed(revoked).join('¦') &&
      [hitsA0, hitsA1, hitsB0, hitsB1].every((h) => h.length === 0),
    `the five, ordered, before P-4 = after P-4 = after P-6: ${landedPre.join('¦') === landedPost.join('¦') && landedPost.join('¦') === landed(revoked).join('¦')} ` +
    `(${landedPre.length} row(s); ${landedPre.join(' / ')}); pane hits in list_targets/rendered_html — ` +
    `boot A before load [${hitsA0.join(', ') || 'none'}] and after the gesture [${hitsA1.join(', ') || 'none'}], ` +
    `boot B before load [${hitsB0.join(', ') || 'none'}] and after the gesture [${hitsB1.join(', ') || 'none'}]`,
  )

  await teardownBoot(bootB)
} catch (e) {
  console.error(`\n  ✗ the leg could not complete: ${e instanceof Error ? e.message : String(e)}`)
  console.error('  a leg that cannot spawn, connect or read reports this loudly — never a 0, never a green.')
  console.error(`  MCP calls made before the failure: ${MCP_CALLS.length}`)
  process.exit(1)
}

function clickNote(note) {
  if (note === 'clicked') return 'an ordinary `click` event was raised on the RENDERED `[data-group="data"]` row'
  if (note === 'absent') return 'THERE IS NO RENDERED `[data-group="data"]` ROW TO CLICK at this head'
  if (note === '') return '(the click body wrote no note — the driver\'s envelope did not render an observation)'
  return `the click body reported: ${note}`
}

console.log(`\nPANES RESULT: ${failures} failure(s) — ${rowsChecked - failures}/${rowsChecked} of the design's rows green (P-1…P-7)`)
console.log(`  MCP calls made: ${MCP_CALLS.length}; gestures issued: ${clicksIssued} (one per P-4/P-6)`)
if (failures > 0) {
  console.error('  a declared row failed — see the named row(s) above (exit 1)')
  process.exit(1)
}
process.exit(0)
