// tests/secure-exclusion-live.mjs — GATE 6, THE LIVE BATTERY DRIVER for unit
// `U-SECURE-EXCLUSION` (`S1`, wave `S`). Contract: `docs/specs/secure-exclusion.md`
// `§2.4` item 7 (the `[U]` obligation: MANDATORY LIVE, NOT PARKED) and
// `docs/specs/user-flow-audit.md` `§5`/`§6.1`/`§7.1` (limb A `DOM-SHIM-BLINDNESS`).
//
// Run:  npm run build && node tests/secure-exclusion-live.mjs
//
// WHY THIS FILE IS HERE AND NOT IN `scripts/` (the two hard constraints, both
// cited because a reader must be able to check the choice):
//   1. `tests/ui-leg-contract.test.ts`'s `helperCandidates()` takes
//      `readdirSync(scripts).filter(f => f.endsWith('.mjs') && !RESERVED_SCRIPT_NAMES.has(f))`
//      and asserts the FIRST candidate carries `mkdtempSync`/`tmpdir()`/
//      `PINNED_SPAWN_FLAGS`/`spawn(`/`process.on('exit')`/`rmSync`. A NEW file
//      under `scripts/` would redden that row, so the driver lives under
//      `tests/**`, which that row does not enumerate (its `walkCensusPaths`
//      filter is `/^census/i`).
//   2. `scripts/electron-ui.mjs`'s `R4` static row forbids the two reach-in call
//      sites in any SHIPPED path (comments stripped, code scanned as a SET):
//      `webContents.executeJavaScript` and `webContents.debugger`. This driver
//      uses NEITHER and does not weaken that row: it drives the renderer over
//      CDP (`--remote-debugging-port=0` + the DevTools HTTP endpoint + a raw
//      WebSocket), a channel the `R4` set does not name.
//
// INSTRUMENTS, in the closed set `docs/specs/user-flow-audit.md` `§6.1` item 3
// declares:
//   [MCP]  a literal MCP client over the app's OWN stdio transport, built with
//          the repo's shipped helper (`scripts/electron-spawn.mjs`'s
//          `ChildProcessTransport`) — one process per boot, no second spawn.
//   [CDP]  Chrome DevTools Protocol over the app's OWN renderer: `Runtime.evaluate`
//          for reads, `Input.dispatchMouseEvent` for the REAL pointer gesture,
//          `Page.reload` for the reload arm. The port is read from the child's
//          OWN stderr (`DevTools listening on ws://127.0.0.1:<port>/…`), because
//          this host cannot write `<default userData>/DevToolsActivePort`
//          (measured: `Error writing DevTools active port to file …:
//          Permission denied (13)`) — the boot still succeeds, only the
//          port FILE is refused. TWO boots carry it: boot A (the stdio boot) and
//          the HTTP boot — the latter so the RETURN can be driven on the
//          manual-UI path `§2.4` item 6 declares (the pane control), on the very
//          process whose HTTP answers the row then measures.
//   [G]    repo records: file bytes (`sha256`), the git landing chain, `grep`
//          over the unit's declared diff scope.
// The `[U]` oracle for every gesture row is the RENDERED BOX + the rendered
// TEXT (`getBoundingClientRect` + `textContent`/`getAttribute`), never a
// computed-style-only reading.
//
// WHAT THIS DRIVER NEVER DOES: it never writes to the operator's real profile
// (every boot is a fresh `mkdtemp` profile under the OS temp dir, seeded with a
// real bearer TOKEN so the auth arm's ordering rows are measurable), it never
// mutates a source file, and it kills the child + removes the profile on every
// path.
import { createHash } from 'node:crypto'
import { execSync, spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { ChildProcessTransport, electronBin, repoRoot, spawnElectron } from '../scripts/electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const mainCjs = join(root, 'dist', 'main', 'main.cjs')
const TOKEN = 'live-battery-token-4f9c1a7e'
const GROUPS = ['read', 'dispatch', 'graph', 'code']
const CENSUS_IN_TREE = 23

// ---- records -----------------------------------------------------------------
const CHECKS = []
/** Record one check. `verdict` is the closed set this battery reports with:
 *  PASS / FAIL / MANUAL / PARKED / REPORT. */
function check(id, subject, verdict, observation, evidence = '') {
  CHECKS.push({ id, subject, verdict, observation, evidence })
  const mark = verdict === 'PASS' ? '✓' : verdict === 'FAIL' ? '✗' : verdict === 'MANUAL' ? '»' : verdict === 'PARKED' ? '□' : '·'
  const line = `  ${mark} [${verdict}] ${id} ${subject}`
  if (verdict === 'FAIL') console.error(`${line}\n      observed: ${observation}`)
  else console.log(`${line}\n      observed: ${observation}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** THE CLEANUP REGISTRY — every boot registers its OWN teardown here the moment it
 *  exists, and one top-level `exit` hook drains it. Nothing is left to the driver's
 *  control flow: a throw in ANY phase still kills every child and removes every
 *  scratch profile (a leak would leave an Electron window open on the operator's
 *  display, which is exactly what a battery must never do). */
const CLEANUPS = []
function registerCleanup(fn) { CLEANUPS.push(fn) }
process.on('exit', () => { for (const fn of CLEANUPS.splice(0)) { try { fn() } catch { /* best effort */ } } })

/** A fresh scratch profile seeded with a REAL token (the `§0A` item 7 / `FS-EX-9`
 *  ordering precondition: a `null` token admits any request and would make the
 *  401 rows unmeasurable). */
function seedProfile(tag) {
  const profile = mkdtempSync(join(tmpdir(), `se-live-${tag}-`))
  writeFileSync(join(profile, 'provident-security.json'), JSON.stringify({ token: TOKEN, enabled: GROUPS }, null, 2))
  return profile
}

/** Boot the app on a fresh scratch profile and connect the MCP stdio client.
 *  `extraArgs` carries the transport/port/`--remote-debugging-port=0` members. */
async function bootApp(tag, extraArgs = []) {
  const profile = seedProfile(tag)
  const spawned = spawnElectron([...extraArgs, `--provident-user-data=${profile}`])
  const child = spawned.child
  let stderr = ''
  child.stderr.on('data', (d) => { stderr += String(d) })
  child.stdout.on('data', () => {})
  const transport = new ChildProcessTransport(child)
  const client = new Client({ name: 'se-live-battery', version: '0.1.0' })
  await client.connect(transport)
  const boot = { child, transport, client, profile, stderrText: () => stderr, closed: false }
  registerCleanup(() => {
    if (boot.closed) return
    boot.closed = true
    try { client.close() } catch { /* gone */ }
    try { transport.close() } catch { /* gone */ }
    try { child.kill('SIGKILL') } catch { /* gone */ }
    rmSync(profile, { recursive: true, force: true })
  })
  return boot
}

/** Tear one boot down: close the MCP client, kill the child, remove the profile. */
async function teardown(boot) {
  if (boot.closed) return
  boot.closed = true
  try { await boot.client.close() } catch { /* already gone */ }
  try { boot.transport.close() } catch { /* already gone */ }
  try { boot.child.kill('SIGKILL') } catch { /* already gone */ }
  await sleep(300)
  rmSync(boot.profile, { recursive: true, force: true })
}

/** A raw MCP tool call that keeps the SDK's error text instead of throwing, so a
 *  refusal and a throw are BOTH readable as observations. */
async function rawCall(client, name, args = {}) {
  try {
    const r = await client.callTool({ name, arguments: args })
    return { ok: true, text: r.content?.[0]?.text ?? '', isError: r.isError === true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
const parsed = (r) => (r.ok ? JSON.parse(r.text) : { __error: r.error })

/** THE DECLARED REFUSAL RECEIPT, READ AS THE LIVE ANSWER (`§2.2` item 2(a): the refusal IS the
 *  tool's RESULT — a VALUE, never a throw — and `§2.5` item 1's AMENDED shape carries the
 *  additive, server-authored `message` naming the CAUSE and the REMEDY).
 *
 *  WHY THE PREDICATE IS THE RECEIPT AND NOT `isError`: under the architect's `GAP-3` ruling the
 *  exclusion transition toggles NOTHING (`§2.1` item 3's supersession clause; `§2.2` item 2(b)),
 *  so the landed SDK's `-32602 … disabled` throw — the ONLY thing that ever made a refusal read
 *  `isError === true` — is GONE by ruling. A row asserting `isError === true` asserts the
 *  SUPERSEDED carrier. The unit's own `G6-F3` row (`tests/secure-exclusion.test.ts`) and its
 *  register cell `G6-F3#1` assert `isError` is ABSENT on this very answer, and `P-EX-TP-1` pins
 *  the refusal a VALUE at all three depths.
 *
 *  RETURNS the parsed receipt when the answer IS the declared receipt, and `null` otherwise — so
 *  the predicate REDDENS on: a protocol error / a throw (`ok:false` or `isError:true` — the
 *  superseded carrier), the RENDERER'S OWN value (the inert-turn regression: a markdown/HTML
 *  answer is not a receipt), a two-member receipt (the pre-ruling shape — an ABSENT `message` is
 *  OUTSIDE `§2.5` item 1), and a cause-less or remedy-less sentence.
 *
 *  THE MESSAGE IS ASSERTED AS ITS DECLARED DOMAIN, NEVER AS A LITERAL SPELLING (`§2.5` item 1's
 *  `DECLARED-DEFAULT`: the exact sentence is the Implementer's, provided it carries both named
 *  elements — a literal-only assertion would redden on any wording change). */
function declaredReceipt(answer) {
  if (!answer || answer.ok !== true || answer.isError === true) return null
  let v = null
  try { v = JSON.parse(answer.text) } catch { return null }
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return null
  if (v.status !== 'refused' || v.reason !== 'exclusion-closed') return null
  const m = typeof v.message === 'string' ? v.message : ''
  if (m.trim() === '') return null
  const cause = /security store/i.test(m) && /\bopen\b/i.test(m)
  const remedy = /(retry|try again|wait)/i.test(m) && /operator/i.test(m)
  return cause && remedy ? v : null
}

/** The tool NAMES the live stdio surface advertises, SORTED — the SET-equality reading `§0A`
 *  item 7(c) / `§2.2` item 2(c) pin ("the registration set is ENTIRELY UNCHANGED"), never a bare
 *  count: a count cannot tell an unchanged set from a different one of the same size. */
async function listToolNames(client) {
  try { return (await client.listTools()).tools.map((t) => String(t.name)).sort() } catch { return null }
}
const sameSet = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((n, i) => n === b[i])

// ---- the CDP channel ---------------------------------------------------------
/** Port of the child's OWN DevTools endpoint, read from its stderr. */
async function devtoolsPort(boot, timeoutMs = 20000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const m = /DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//.exec(boot.stderrText())
    if (m) return Number(m[1])
    await sleep(100)
  }
  throw new Error('the child never announced its DevTools endpoint on stderr')
}

class Cdp {
  static async attach(port) {
    const listing = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const page = listing.find((t) => t.type === 'page')
    if (!page) throw new Error('no CDP page target in the app\'s renderer')
    const cdp = new Cdp(page.webSocketDebuggerUrl)
    await cdp.open()
    return cdp
  }
  constructor(url) { this.url = url; this.id = 0; this.pending = new Map() }
  open() {
    this.ws = new WebSocket(this.url)
    this.ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data)
      if (m.id !== undefined && this.pending.has(m.id)) { this.pending.get(m.id)(m); this.pending.delete(m.id) }
    })
    return new Promise((res, rej) => { this.ws.addEventListener('open', res); this.ws.addEventListener('error', rej) })
  }
  send(method, params = {}) {
    const i = ++this.id
    return new Promise((r) => { this.pending.set(i, r); this.ws.send(JSON.stringify({ id: i, method, params })) })
  }
  async evaluate(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, includeCommandLineAPI: true })
    if (r.result?.exceptionDetails) return { __cdpError: r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text }
    return r.result?.result?.value
  }
  /** A REAL pointer gesture: press + release at the element's own rendered box
   *  centre. Returns the point and what `elementFromPoint` said was there, so a
   *  click that landed elsewhere is visible in the record. */
  async clickElement(id) {
    const point = await this.evaluate(`(function(){
      var el = document.getElementById(${JSON.stringify(id)});
      if (!el) return null;
      el.scrollIntoView({ block: 'center' });
      var r = el.getBoundingClientRect();
      var x = Math.round(r.left + r.width / 2), y = Math.round(r.top + r.height / 2);
      var hit = document.elementFromPoint(x, y);
      return { x: x, y: y, w: r.width, h: r.height, hit: hit ? (hit.tagName + (hit.id ? '#' + hit.id : '')) : null, isTarget: hit === el };
    })()`)
    if (point === null || point === undefined) return null
    await this.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x, y: point.y })
    await this.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: point.x, y: point.y, button: 'left', clickCount: 1, buttons: 1 })
    await this.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: point.x, y: point.y, button: 'left', clickCount: 1, buttons: 0 })
    return point
  }
  /** The `[U]` read: the rendered box + the rendered text, in ONE reading. */
  async paneRead() {
    return this.evaluate(`(function(){
      var b = document.getElementById('exclusion-toggle');
      var s = document.getElementById('security-status');
      var lbl = document.querySelector('#exclusion-control label');
      if (!b) return { present: false };
      var r = b.getBoundingClientRect();
      var cs = getComputedStyle(b);
      return {
        present: true,
        label: lbl ? lbl.textContent : null,
        buttonText: b.textContent,
        dataState: b.getAttribute('data-state'),
        classes: b.className,
        box: { w: r.width, h: r.height, top: r.top, left: r.left },
        display: cs.display,
        statusText: s ? s.textContent : null,
        mcpSegment: s ? (/ · MCP: (enabled|disabled)/.exec(s.textContent) || [])[1] ?? null : null,
      };
    })()`)
  }
  /** Wait (bounded) for the pane control to be painted. */
  async waitForToggle(timeoutMs = 20000) {
    const started = Date.now()
    while (Date.now() - started < timeoutMs) {
      const present = await this.evaluate(`!!document.getElementById('exclusion-toggle')`)
      if (present === true) return true
      await sleep(200)
    }
    return false
  }
  /** The app-graph / pane isolation probe: BOTH readings, in the page realm. */
  async isolationProbe() {
    return this.evaluate(`(function(){
      var ids = Array.prototype.map.call(document.querySelectorAll('#panes [id]'), function (e) { return e.id });
      return {
        panesHasToggle: !!document.getElementById('exclusion-toggle'),
        panesHasControl: !!document.getElementById('exclusion-control'),
        panesIds: ids,
        appMountHasToggle: !!document.querySelector('#app #exclusion-toggle'),
        appMountHtml: (document.getElementById('app') || {}).innerHTML || '',
      };
    })()`)
  }
  close() { try { this.ws.close() } catch { /* already closed */ } }
}

// ---- [G] the static readings --------------------------------------------------
function sha256(path) {
  return createHash('sha256').update(readFileSync(path, 'utf8')).digest('hex')
}

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 1 — BOOT A: the initial state, the pane, both axes, U-1, U-5
// ══════════════════════════════════════════════════════════════════════════════
console.log('\nSECURE-EXCLUSION LIVE BATTERY (gate 6) — U-SECURE-EXCLUSION (S1)')
console.log('='.repeat(74))
console.log(`  seed: a fresh scratch profile carrying token=${TOKEN.slice(0, 12)}… (a NON-null token, so the`)
console.log('        authorization-first ordering rows of FS-EX-9 are measurable)')
console.log(`  driver: node tests/secure-exclusion-live.mjs   ·   HEAD: ${execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()}`)

const bootA = await bootApp('A', ['--mcp-transport=stdio', '--remote-debugging-port=0'])
const portA = await devtoolsPort(bootA)
const cdp = await Cdp.attach(portA)
const togglePainted = await cdp.waitForToggle()

// boot-order evidence: the renderer's OWN stderr line for IPC_READY
const orderLines = bootA.stderrText().split('\n').filter((l) => l.includes('provident-mcp] stdio transport ready') || l.includes('renderer ready'))
check('SX-G-45', 'the boot ORDER (store → gate → transports → mcp.start) read live', orderLines.length === 2 && orderLines[0].includes('stdio transport ready') ? 'PASS' : 'REPORT',
  `the child's stderr carries both boot landmarks IN ORDER: ${JSON.stringify(orderLines)}`,
  'the MCP stdio transport is the LAST landmark; the renderer arming (IPC_READY) precedes it, so the store/gate construction the pane then reads is already complete')

// THE FIRST MCP READ is retried, BOUNDED, because the handshake can resolve in the
// window between `mcp.start()` and the renderer's own arming of the backend's
// readiness promise (`IPC_READY` → `markReady()`), during which the backend queues
// the request. A failed read here is an INSTRUMENT state, not a finding, so it is
// retried a bounded 20 times and the ATTEMPT COUNT is part of the record.
async function firstRead(client, name, args = {}, attempts = 20) {
  let last = null
  for (let i = 0; i < attempts; i += 1) {
    last = await rawCall(client, name, args)
    if (last.ok && !/^\s*MCP error/i.test(last.text)) return { ...last, attempts: i + 1 }
    await sleep(500)
  }
  return { ...last, attempts }
}
const beforeRaw = await firstRead(bootA.client, 'provident.get_rendered_html', {})
const before = beforeRaw.ok ? parsed(beforeRaw) : {}
const beforePane = await cdp.paneRead()
check('SX-G-01/02', 'the boot state is the safe pair and the pane shows it', beforePane.present && beforePane.dataState === 'mcp-enabled' && beforePane.mcpSegment === 'enabled' ? 'PASS' : 'FAIL',
  `pane: data-state=${JSON.stringify(beforePane.dataState)} button=${JSON.stringify(beforePane.buttonText)} status segment=${JSON.stringify(beforePane.mcpSegment)}`,
  'the IPC_SECURITY_GET response is the pane\'s own source (`refresh()`/`syncConfig`), so this reading is the declared `{...settings, exclusion}` record rendered')

check('U-1 / SX-G-59/60', 'the toggle + its label are PAINTED in the operator pane (rendered box oracle)', beforePane.box.w > 0 && beforePane.box.h > 0 && beforePane.display === 'block' && typeof beforePane.label === 'string' ? 'PASS' : 'FAIL',
  `box ${Math.round(beforePane.box.w)}x${Math.round(beforePane.box.h)} px at (${Math.round(beforePane.box.left)},${Math.round(beforePane.box.top)}), display=${beforePane.display}, classes=${JSON.stringify(beforePane.classes)}, label=${JSON.stringify(beforePane.label)}`,
  'a REAL rendered box (not a computed-style-only reading), inside `#exclusion-control` in `#panes` — the provident-authored isolated pane graph')

const isolation = await cdp.isolationProbe()
const appHtml = typeof before.renderedHtml === 'string' ? before.renderedHtml : ''
check('U-5 / SX-G-65', 'the control is in the PANE graph only — never in the app graph or its MCP readings',
  isolation.panesHasToggle && beforeRaw.ok && appHtml.length > 100 && !appHtml.includes('exclusion-toggle') && !appHtml.includes('exclusion-control') ? 'PASS' : 'FAIL',
  `pane realm: toggle present=${isolation.panesHasToggle}, control present=${isolation.panesHasControl}; app mount (#app): toggle present=${isolation.appMountHasToggle}; get_rendered_html answered after ${beforeRaw.attempts} attempt(s): ok=${beforeRaw.ok}, ${appHtml.length} chars, contains 'exclusion-toggle'=${appHtml.includes('exclusion-toggle')}; raw=${JSON.stringify(String(beforeRaw.text ?? beforeRaw.error).slice(0, 120))}`,
  'the pane side carries a positive control, so the absence reading is not a reading of an absent pane; the app-HTML reading is non-empty so it is not vacuous')

const toolListBefore = await rawCall(bootA.client, 'provident.list_targets', {})
const targetsBefore = parsed(toolListBefore)
const targetNodes = Array.isArray(targetsBefore.nodes) ? targetsBefore.nodes : (Array.isArray(targetsBefore) ? targetsBefore : null)
const targetIds = (targetNodes ?? []).map((n) => String(n?.nodeId))
check('U-5 / SX-G-65', 'list_targets carries no pane node (the D1–D8 isolation holds with the new node)',
  targetNodes !== null && targetIds.length === CENSUS_IN_TREE && targetIds.every((n) => !/excl/i.test(n)) ? 'PASS' : 'FAIL',
  `list_targets: ${targetNodes === null ? 'NOT an array (shape drift)' : targetIds.length + ' nodes (declared census ' + CENSUS_IN_TREE + ')'}, of which exclusion-shaped: ${JSON.stringify(targetIds.filter((n) => /excl/i.test(n)))}; raw first 160 chars: ${JSON.stringify(toolListBefore.text.slice(0, 160))}`,
  'the pane graph is a SEPARATE GraphScope, so the app Runtime\'s target vocabulary cannot address it')

const baseline = await rawCall(bootA.client, 'provident.get_markdown', {})
check('U-3 (precondition)', 'with MCP enabled a normal tool call answers normally', baseline.ok && !baseline.isError && baseline.text.includes('markdown') ? 'PASS' : 'FAIL',
  `provident.get_markdown → ok=${baseline.ok} isError=${baseline.isError} first 60 chars=${JSON.stringify(baseline.text.slice(0, 60))}`,
  'the U-2/U-3 positive control: a refusal later cannot be read as a permanently-broken tool')

const namesEnabledBoot = await listToolNames(bootA.client)
const toolsBefore = namesEnabledBoot === null ? 0 : namesEnabledBoot.length

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 2 — THE GESTURE (U-2): a REAL pointer click on the painted toggle
// ══════════════════════════════════════════════════════════════════════════════
const hit1 = await cdp.clickElement('exclusion-toggle')
await sleep(2000)
const afterClick1 = await cdp.paneRead()
const markdownAfterClick = await rawCall(bootA.client, 'provident.get_markdown', {})
const bridgeAfterClick = await cdp.evaluate(`window.provident.security.get()`)

const clickLanded = hit1 !== null && hit1.isTarget === true
check('U-2 (the gesture half)', 'a REAL CDP pointer gesture on the painted toggle moves the status line `MCP: enabled → disabled`', afterClick1.mcpSegment === 'disabled' ? 'PASS' : 'FAIL',
  `click landed on ${JSON.stringify(hit1?.hit)} at (${hit1?.x},${hit1?.y}) inside a ${Math.round(hit1?.w ?? 0)}x${Math.round(hit1?.h ?? 0)} box (isTarget=${hit1?.isTarget}); AFTER the gesture the status segment reads ${JSON.stringify(afterClick1.mcpSegment)} and the button reads ${JSON.stringify(afterClick1.buttonText)}; the bridge read answers exclusion=${JSON.stringify(bridgeAfterClick?.exclusion)}; MCP get_markdown → isError=${markdownAfterClick.isError} text=${JSON.stringify(String(markdownAfterClick.text).slice(0, 80))}`,
  'the gesture IS delivered to the renderer (a capture-phase `click` listener on the same element fires and `elementFromPoint` resolves the button) — the authored handler body does not run')

const siblingControl = await (async () => {
  const t0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.token})`)
  await cdp.clickElement('token-gen')
  await sleep(1500)
  const t1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.token})`)
  // a SECOND control: the landed `#journal-length-apply` button, whose body — like the
  // exclusion toggle's — READS `ctx.node.props` before calling the bridge.
  const j0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return String(v.maxJournalLength)})`)
  await cdp.evaluate(`(function(){ var i=document.getElementById('journal-length-input'); i.value='7' })()`)
  await cdp.clickElement('journal-length-apply')
  await sleep(1500)
  const j1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return String(v.maxJournalLength)})`)
  const g0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.enabled.join(',')})`)
  await cdp.clickElement('toggle:graph')
  await sleep(1500)
  const g1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.enabled.join(',')})`)
  return { token: [t0, t1], journal: [j0, j1], group: [g0, g1] }
})()
check('U-2 (sibling controls)', 'the SAME CDP gesture path DOES drive landed sibling controls in the same pane', siblingControl.token[0] !== siblingControl.token[1] && siblingControl.group[0] !== siblingControl.group[1] ? 'PASS' : 'FAIL',
  `real clicks on landed controls in the SAME pane: #token-gen changed the token (${JSON.stringify(siblingControl.token[0])} → ${JSON.stringify(siblingControl.token[1])}); #toggle:graph changed the enabled set (${JSON.stringify(siblingControl.group[0])} → ${JSON.stringify(siblingControl.group[1])}); #journal-length-apply read maxJournalLength ${JSON.stringify(siblingControl.journal[0])} → ${JSON.stringify(siblingControl.journal[1])}`,
  'CONTROL COLUMN — without it a U-2 failure would be indistinguishable from a driver that cannot click at all. The DISCRIMINATING controls are the two that MOVE the bridge state (`#token-gen`, `#toggle:graph`); `#journal-length-apply` is NOT one of them and its unchanged reading proves nothing either way: its authored body reads the prop `value` off ITS OWN node (the `journal-length-apply` BUTTON, which carries no `value` member — `L` `secure-panels.ts:132-140`), so it asks the bridge to set `null` — the state the pane already holds (`maxJournalLength` was `undefined` both times), a NO-CHANGE reading. The as-filed `F-2` reading of this row (that the authored `ctx.node.props` read was the failing step, shared with a landed sibling) is SPENT: `#exclusion-toggle` — whose body reads `ctx.node.props[\'data-state\']` and flips it — now drives the gate under this very gesture, and the gesture row above measures it')

// the bridge's own transition (the pane body's declared call) — the gate DOES move
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)
await sleep(500)
const gateMoved = await rawCall(bootA.client, 'provident.get_markdown', {})
const bridgeStateAfterDirect = await cdp.evaluate(`window.provident.security.get()`)
const paneAfterDirect = await cdp.paneRead()

check('SX-G-57 (live)', 'the IPC_SECURITY_GET response member reports the LIVE state after a real transition', bridgeStateAfterDirect?.exclusion === 'mcp-disabled' ? 'PASS' : 'FAIL',
  `after a REAL accepted transition (the bridge answered applied:true and the live MCP server began refusing), IPC_SECURITY_GET answered exclusion=${JSON.stringify(bridgeStateAfterDirect?.exclusion)} — expected 'mcp-disabled'`,
  'the handler closes over the gate instance constructed at boot, while `applyExclusion` REPLACES the server\'s `_gate` (`SecurityGate.withExclusion` returns a NEW gate) — so the response record reports the boot state, never the live one')

// WHICH ARM ANSWERS? `provident.dispatch` is ALWAYS registered on the ENABLED-GROUP predicate, so
// it is the ONE tool that certainly reaches the INVOCATION TURN while the tier is open; its answer
// therefore distinguishes the turn check from the group predicate. `provident.get_markdown` rides
// an ENABLED group (`read`), so its refusal is attributable to the turn too — whereas a group-
// disabled tool (`provident.load`, group `graph`) would be refused by `applyGatePatch` instead.
const dispatchWhileOpen = await rawCall(bootA.client, 'provident.dispatch', { target: 'inc', event: 'click' })
check('U-3 (via the bridge)', 'while the state is OPEN a live tool call answers the DECLARED RECEIPT as a VALUE (never an MCP protocol error) — for a tool an ENABLED group allows and for the always-registered `provident.dispatch`', declaredReceipt(gateMoved) !== null && declaredReceipt(dispatchWhileOpen) !== null ? 'PASS' : 'FAIL',
  `after the transition: provident.get_markdown (enabled group 'read') → isError=${gateMoved.isError} (must be ABSENT), received=${JSON.stringify(declaredReceipt(gateMoved))}, raw=${JSON.stringify(String(gateMoved.text).slice(0, 160))}; provident.dispatch (the tool the ENABLED-GROUP predicate alone always registers) → isError=${dispatchWhileOpen.isError} (must be ABSENT), received=${JSON.stringify(declaredReceipt(dispatchWhileOpen))}, raw=${JSON.stringify(String(dispatchWhileOpen.text).slice(0, 160))}`,
  'RE-GRAINED 2026-10-08 (the `F-3` live half, closed by the ruling): the as-filed row only asked whether the text CONTAINED the token — which the superseded registry carrier could never satisfy, but which a bare token string could satisfy without the receipt\'s declared SHAPE. The row now asserts the RECEIPT itself — `status`/`reason` CLOSED at their one token each plus the additive `message` naming the cause AND the remedy, with `isError` ABSENT (`§2.2` item 2(a); `§2.5` item 1; `§3.1` `M-EX-5`; `P-EX-TP-1`; the unit\'s `G6-F3#1` cell). BOTH calls are named so the answer is attributable to the INVOCATION TURN: `provident.dispatch` stays registered on the group predicate alone and `provident.get_markdown` rides an enabled group, so neither refusal can be the group predicate\'s')

// ═══ THE REGISTRATION SET IS ENTIRELY UNCHANGED ACROSS THE EXCLUSION TRANSITION (`§0A` item 7(c) /
// `§2.2` item 2(c) / `§2.1` item 3's supersession clause; register cell `G6-F3#2`). ═══
// THE READING IS SET EQUALITY, AND THE ENABLED-GROUP SET IS HELD CONSTANT AROUND IT: the sibling
// control row above ALREADY moved the enabled-group set (a DIFFERENT mechanism — `applyGatePatch`'s
// group change, which the ruling leaves untouched), and a listing taken across both mechanisms would
// attribute the group's shrink to the exclusion.
await cdp.evaluate(`window.provident.security.setExclusion('mcp-enabled')`)
await sleep(600)
const namesClosedGroupFixed = await listToolNames(bootA.client)
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)   // THE EXCLUSION TRANSITION — nothing else moves
await sleep(600)
const namesOpenGroupFixed = await listToolNames(bootA.client)
check('U-2 (registry, live) / U-7 / SX-G-23', 'across a REAL exclusion transition the registration set is ENTIRELY UNCHANGED — `tools/list` answers the SAME non-empty set on BOTH sides, on the ONE already-connected stdio client (no reconnect, no re-handshake)', sameSet(namesClosedGroupFixed, namesOpenGroupFixed) && (namesOpenGroupFixed?.length ?? 0) > 0 ? 'PASS' : 'FAIL',
  `the enabled-group set held CONSTANT around the transition: tools/list while CLOSED returned ${namesClosedGroupFixed === null ? 'NOT an array (the call failed)' : namesClosedGroupFixed.length + ' handles'} and the SAME client answered ${namesOpenGroupFixed === null ? 'NOT an array (the call failed)' : namesOpenGroupFixed.length + ' handles'} while OPEN; set-equal=${sameSet(namesClosedGroupFixed, namesOpenGroupFixed)}; the boot's own enabled-state listing was ${namesEnabledBoot === null ? 'n/a' : namesEnabledBoot.length + ' handles'} BEFORE the sibling-control row moved the enabled-group set; names present while closed and absent while open: ${namesClosedGroupFixed && namesOpenGroupFixed ? JSON.stringify(namesClosedGroupFixed.filter((n) => !namesOpenGroupFixed.includes(n))) : 'n/a'}`,
  'THE OPERATIVE PIN (`§0A` item 7(c), amended 2026-10-08): "the registered tool/resource set is IDENTICAL in both states — nothing is cleared and NOTHING IS TOGGLED", so the disabled state stays indistinguishable from a never-registered tool by name-listing alone. A design that CLEARS the set fails the non-empty half; a design that TOGGLES it fails the equality half (the landed SDK renders a disabled handle as an EMPTY listing — the `disabled`-vs-`absent` oracle `§2.2` item 2(c) refuses). This row also carries `U-7`: the SAME connected client answered both sides, so the transport was never closed, rebuilt or re-handshaken')

// A CALL ISSUED WHILE OPEN — read by name, so the ARM that answers it is attributable: it is an
// ENABLED-GROUP tool (`provident.get_markdown`, group `read`), so the refusal cannot be the group
// predicate's; it is the INVOCATION TURN answering, and the call is never dispatched.
const openArrival = rawCall(bootA.client, 'provident.get_markdown', {})
await sleep(150)
// THE RETURN — the pane's OWN declared call (`window.provident.security.setExclusion('mcp-enabled')`;
// `§2.4` item 6: "the operator's own act ... the pane control or the channel directly").
await cdp.evaluate(`window.provident.security.setExclusion('mcp-enabled')`)
const openArrivalResult = await openArrival
await sleep(400)
const returnedAnswer = await rawCall(bootA.client, 'provident.get_markdown', {})
const returnedBridge = await cdp.evaluate(`window.provident.security.get()`)
check('U-4 (return arm)', 'the return — the operator\'s OWN act — restores NORMAL answers: the refusal is GONE and the tool RUNS (while a call ISSUED in the open state is answered the receipt and never dispatched)', returnedAnswer.ok && returnedAnswer.isError !== true && declaredReceipt(returnedAnswer) === null && String(returnedAnswer.text).includes('markdown') && returnedBridge?.exclusion === 'mcp-enabled' ? 'PASS' : 'FAIL',
  `after the return transition the bridge reads exclusion=${JSON.stringify(returnedBridge?.exclusion)} and provident.get_markdown answered NORMALLY — ok=${returnedAnswer.ok}, isError=${returnedAnswer.isError} (absent), receipt=${JSON.stringify(declaredReceipt(returnedAnswer))}, first 60 chars=${JSON.stringify(String(returnedAnswer.text).slice(0, 60))}; the call ISSUED while open was answered ok=${openArrivalResult.ok} isError=${openArrivalResult.isError} ${JSON.stringify(String(openArrivalResult.text ?? openArrivalResult.error).slice(0, 110))}`,
  'THE HONEST LIMIT, STATED (`§2.3` item 3; the register\'s `A-2#5`/`P-EX-IM-3` cells drive it at the `[H]` layer): the open-state call above is an ARRIVAL refusal at the invocation turn (`§2.2` item 2(a)), NOT the in-flight arm — a genuine in-flight probe needs a call ISSUED while CLOSED whose dispatched renderer work straddles the transition, and this driver cannot make that window deterministic (a renderer round trip is milliseconds wide), so the mid-flight abandonment is NOT claimed as exercised here. The row\'s SUBJECT is the RETURN, and the predicate is a BOUND on it: the ENABLED-state answer must be a REAL value (not a receipt, `isError` absent, the markdown present) AND the bridge must read the closed state — so a return that did not land, or one that left the refusal in place, FAILS')

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 3 — U-6: the disabled state survives a renderer reload
// ══════════════════════════════════════════════════════════════════════════════
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)
await sleep(400)
await cdp.send('Page.enable')
await cdp.send('Page.reload', { ignoreCache: true })
await sleep(4000)
const reloadedPainted = await cdp.waitForToggle(20000)
const afterReload = await cdp.paneRead()
const reloadBridge = await cdp.evaluate(`window.provident.security.get()`)
const mcpAfterReload = await rawCall(bootA.client, 'provident.get_markdown', {})
const reloadReceipt = declaredReceipt(mcpAfterReload)
check('U-6 (reload arm, main-side state)', 'the disabled state survives a renderer reload — a live MCP call is STILL REFUSED after the reload, and the refusal IS the DECLARED RECEIPT delivered as a VALUE (`isError` ABSENT)', reloadReceipt !== null ? 'PASS' : 'FAIL',
  `after Page.reload: the pane re-painted=${reloadedPainted}; the live MCP call is still refused and the answer IS the declared receipt — ok=${mcpAfterReload.ok}, isError=${mcpAfterReload.isError} (must be ABSENT), received=${JSON.stringify(reloadReceipt)}, raw=${JSON.stringify(String(mcpAfterReload.text ?? mcpAfterReload.error).slice(0, 160))} — the state is MAIN-side and the renderer never cleared it`,
  'RE-GRAINED 2026-10-08 (gate-6 re-run). THE AS-FILED PREDICATE WAS `mcpAfterReload.isError === true`, AND IT IS STALE: it is satisfiable ONLY under the SUPERSEDED registry-toggling carrier (`§2.1` `T-1(d)`/`T-2(d)`), where the landed SDK answers `-32602 … Tool … disabled` BEFORE the handler runs and the SDK surfaces that as `isError`. Under the architect\'s `GAP-3` ruling the exclusion transition toggles NOTHING and the invocation turn answers `ExclusionReceipt` as the tool\'s RESULT — a VALUE (`§2.1` item 3\'s supersession clause; `§2.2` item 2(a); `§2.5` item 1; `§3.1` `M-EX-5`; `P-EX-TP-1`) — and the unit\'s own `G6-F3` row plus register cell `G6-F3#1` assert `isError` is ABSENT on this very answer. THE ROW THEREFORE NOW ASSERTS THE RECEIPT ITSELF: `status`/`reason` CLOSED at their one token each, plus the additive server-authored `message` naming the cause (the security store is open) AND the remedy (retry once the operator has finished); `isError` must be ABSENT. The re-grained predicate is STRONGER, not weaker: it reddens on a protocol error, on a receipt with the member missing or the sentence cause-less, AND on the renderer\'s own value — which is exactly what an inert invocation turn would return')

// THE PREDICATE'S OWN CONTROL — a re-grained predicate that cannot fail is not evidence.
const twoMemberReceipt = { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed' }) }
const causeLessReceipt = { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed', message: 'refused' }) }
const supersededCarrier = { ok: true, isError: true, text: 'MCP error -32602: Tool provident.get_markdown disabled' }
check('U-6 (reload arm) — PREDICATE CONTROL', 'the re-grained predicate CAN still FAIL — it is NULL on the RENDERER\'S OWN enabled-state values of this same run and on every OUTSIDE shape of the receipt', declaredReceipt(baseline) === null && declaredReceipt(returnedAnswer) === null && declaredReceipt(twoMemberReceipt) === null && declaredReceipt(causeLessReceipt) === null && declaredReceipt(supersededCarrier) === null ? 'PASS' : 'FAIL',
  `LIVE controls (this run's OWN enabled-state answers — i.e. the renderer's value, which is exactly what an inert invocation turn would return for an open-state call): the boot baseline answered ${JSON.stringify(String(baseline.text).slice(0, 40))}… → predicate ${JSON.stringify(declaredReceipt(baseline))}; the post-return answer answered ${JSON.stringify(String(returnedAnswer.text).slice(0, 40))}… → predicate ${JSON.stringify(declaredReceipt(returnedAnswer))}. IN-LINE controls (values, NOT live readings — the register row\'s own negative-control form): a PRE-RULING TWO-MEMBER receipt → ${JSON.stringify(declaredReceipt(twoMemberReceipt))} (an ABSENT \`message\` is OUTSIDE \`§2.5\` item 1); a CAUSE-LESS message → ${JSON.stringify(declaredReceipt(causeLessReceipt))}; the SUPERSEDED \`-32602 … disabled\` carrier → ${JSON.stringify(declaredReceipt(supersededCarrier))}`,
  'WHY A CONTROL IS OWED: the re-grained predicate must not be a rubber stamp, and the LIVE half is the discriminating one — with the invocation turn inert (gate-4\'s `A-1` defect class, the regression `§2.2` item 2(a) now depends on) an open-state call returns the RENDERER\'S value, and the predicate would read exactly what these two enabled-state answers read. The IN-LINE half pins the mandated DOMAIN (`§2.5` item 1: an absent, empty, cause-less or remedy-less message is OUTSIDE) so the additive member cannot become silently optional')
check('U-6 (reload arm, the operator\'s view)', 'after the reload the pane shows the state it actually is in', afterReload.present && afterReload.mcpSegment === 'disabled' ? 'PASS' : 'FAIL',
  `after Page.reload the pane re-painted=${reloadedPainted} and its status segment reads ${JSON.stringify(afterReload.mcpSegment)} with the button reading ${JSON.stringify(afterReload.buttonText)} and data-state ${JSON.stringify(afterReload.dataState)}, while IPC_SECURITY_GET answered exclusion=${JSON.stringify(reloadBridge?.exclusion)} and the live MCP surface IS refusing with the declared receipt (${JSON.stringify(reloadReceipt)})`,
  'the operator-visible half of `U-6` (`§0A` item 5; `§2.4` item 3; `PAR-9`): the GET response member is the STATE and it is NEVER absent, so the pane\'s own source reports the live gate after the reload — the reading that `F-4` (the stale boot-gate read) contradicted before the host fix landed')

// BOOT A STAYS ALIVE THROUGH PHASE 5: it is the CDP boot, and the HTTP phase needs
// a REAL transition driven through the app while an HTTP POST is in flight (the
// app's own gate is the shared authority). It is torn down after PHASE 5.

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 4 — U-6: a RESTART returns to `mcp-enabled` (same profile, new process)
// ══════════════════════════════════════════════════════════════════════════════
const profileRestart = mkdtempSync(join(tmpdir(), 'se-live-restart-'))
writeFileSync(join(profileRestart, 'provident-security.json'), JSON.stringify({ token: TOKEN, enabled: GROUPS }, null, 2))
const childR = spawnElectron(['--mcp-transport=stdio', `--provident-user-data=${profileRestart}`])
const childRestart = childR.child
let stderrR = ''
childRestart.stderr.on('data', (d) => { stderrR += String(d) })
childRestart.stdout.on('data', () => {})
const transportR = new ChildProcessTransport(childRestart)
const clientR = new Client({ name: 'se-live-restart', version: '0.1.0' })
await clientR.connect(transportR)
const restartAnswer = await rawCall(clientR, 'provident.get_markdown', {})
const restartHtml = await parsed(rawCall(clientR, 'provident.get_rendered_html', {}))
check('U-6 (restart arm) / SX-G-46/47', 'a RESTART returns to `mcp-enabled` and the flag is NOT persisted', restartAnswer.isError !== true && !JSON.stringify(restartHtml.census ?? {}).includes('exclusion') ? 'PASS' : 'FAIL',
  `a NEW process on the SAME scratch profile answered a normal get_markdown (isError=${restartAnswer.isError}); the profile's files are ${JSON.stringify((await import('node:fs')).readdirSync(profileRestart).filter((f) => f.includes('security') || f.includes('settings')))} — no third file and no exclusion key anywhere in the store (the flag is a CONSTRUCTION TERMINAL, never a file read)`,
  'the state was `mcp-disabled` at the end of PHASE 3 in another process, so the enabled reading here is the boot terminal, not a carried value')
registerCleanup(() => {
  try { clientR.close() } catch { /* gone */ }
  try { transportR.close() } catch { /* gone */ }
  try { childRestart.kill('SIGKILL') } catch { /* gone */ }
  rmSync(profileRestart, { recursive: true, force: true })
})
try { await clientR.close() } catch { /* gone */ }
try { transportR.close() } catch { /* gone */ }
try { childRestart.kill('SIGKILL') } catch { /* gone */ }
await sleep(300)
rmSync(profileRestart, { recursive: true, force: true })

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 5 — THE HTTP TRANSPORT: the auth-first ordering, the POST arms, the straddle
// ══════════════════════════════════════════════════════════════════════════════
/** A raw JSON-RPC POST at the running app's HTTP endpoint, keeping the STATUS and
 *  the raw body — so a second status line (the straddle falsifier) is visible. */
async function httpPost(port, body, { token = null, sessionId = null } = {}) {
  const headers = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }
  if (token !== null) headers.authorization = `Bearer ${token}`
  if (sessionId !== null) headers['mcp-session-id'] = sessionId
  const res = await fetch(`http://127.0.0.1:${port}/mcp`, { method: 'POST', headers, body: JSON.stringify(body) })
  const text = await res.text()
  const lines = text.split('\n').filter((l) => l.trim() !== '')
  return { status: res.status, text, lines, sessionId: res.headers.get('mcp-session-id'), contentType: res.headers.get('content-type') }
}

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 0b — THE HTTP BOOT (spawned HERE, beside boot A, so the HTTP phase can
// drive REAL transitions on boot A's live window while an HTTP POST is in flight)
// ══════════════════════════════════════════════════════════════════════════════
const HTTP_PORT = 3900 + Math.floor(Math.random() * 90)
// WHY THIS BOOT IS SPAWNED DIRECTLY AND NOT THROUGH `spawnElectron`: the helper's
// landed base vector pins `--mcp-transport=stdio` FIRST and appends the caller's
// args AFTER it, while `transportFromArgs` (`src/main/main.ts`) resolves the FIRST
// matching flag — so a caller-supplied `--mcp-transport=http` is SHADOWED and the
// app still starts stdio (MEASURED: the child announced `stdio transport ready`).
// The base vector is byte-pinned and this driver may not edit the helper, so the
// HTTP boot is spawned here with the SAME pinned members (the binary the helper
// resolves, the same flags, the same env pair, a fresh scratch profile) and the
// transport flag placed BEFORE the app path.
const HTTP_PROFILE = mkdtempSync(join(tmpdir(), 'se-live-http-'))
writeFileSync(join(HTTP_PROFILE, 'provident-security.json'), JSON.stringify({ token: TOKEN, enabled: GROUPS }, null, 2))
const httpChild = spawn(electronBin, [
  '--mcp-transport=http', `--mcp-port=${HTTP_PORT}`, '--remote-debugging-port=0',
  mainCjs,
  '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage',
  `--provident-user-data=${HTTP_PROFILE}`,
], { cwd: root, stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1' } })
let httpStderr = ''
httpChild.stderr.on('data', (d) => { httpStderr += String(d) })
httpChild.stdout.on('data', () => {})
registerCleanup(() => {
  try { httpChild.kill('SIGKILL') } catch { /* gone */ }
  rmSync(HTTP_PROFILE, { recursive: true, force: true })
})

// THE TRANSITION CHANNEL FOR THE WHOLE RUN is BOOT A's CDP surface: the app's gate
// is ONE per process, and the HTTP phase must be able to land a transition while an
// HTTP POST is in flight, so the state is driven on the boot that already holds a
// window. (The HTTP boot gets no second MCP client: its stdio channel is its own
// `stdioServer`, and a second client's handshake there would contend with the app's
// own request stream — MEASURED: an `MCP error -32001: Request timed out` after 60 s.)

/** Drive a transition on the HTTP BOOT through its OWN MCP surface. The HTTP
 *  transport is STATELESS (`§2.3` item 2: a fresh McpServer + transport per POST), so
 *  no `initialize` handshake or session is needed — and the exclusion arm is read AT
 *  POST ARRIVAL, so the POST that CALLS the transition must be sent while the state
 *  still admits it (MEASURED: the same POST's `provident.dispatch` answered
 *  `exclusion-closed` because the transition it performed had already closed the
 *  gate on the way in — the NEXT POST is the one that reads 503).
 *
 *  The envelope body calls the pane's OWN declared bridge member
 *  (`window.provident.security.setExclusion`), evaluated by the app's engine in the
 *  RENDERER realm — the same member the authored pane body calls. */
/** A counter for the fresh node ids each transition envelope mints, so the app graph
 *  never accumulates colliding ids across the phase. */
let dispatchSeq = 0
/** THE TRANSITION ENVELOPE, loaded + dispatched in ONE HTTP REQUEST.
 *
 *  WHY ONE REQUEST: the HTTP transport is STATELESS (`§2.3` item 2 — a FRESH
 *  McpServer + transport per POST), so the node a `load` mints in request A does not
 *  exist in request B's server instance (MEASURED: `unresolved target` on a
 *  follow-up dispatch). The two calls therefore ride one `initialize` + one
 *  `tools/call` on ONE long-lived session, in the declared order.
 *
 *  WHY THE LOAD AND THE DISPATCH CANNOT BE SEPARATED IN TIME: `provident.load` is
 *  itself an invocation, refused by the SAME turn while the state is open
 *  (`§2.2` item 2(a)), so the transition envelope must be loaded BEFORE the tier
 *  opens — which is exactly why the open transition is issued as a SINGLE POST that
 *  both loads and dispatches (this function), and why the operator's RETURN cannot
 *  be driven over MCP at all (the dispatch that performs it would be refused; the
 *  return is reachable only through the renderer bridge — a live finding recorded in
 *  the U-4 HTTP row below).
 *
 *  The handler body calls the pane's OWN declared bridge member
 *  (`window.provident.security.setExclusion(state)`), evaluated by the app's engine
 *  in the RENDERER realm — the same member the authored pane body calls. */
async function transitionOverHttp(state, label) {
  dispatchSeq += 1
  const runId = `se-live-http-transition-${label}`
  const body = `function (ctx) {
    var s = window && window.provident && window.provident.security;
    if (!s) return;
    s.setExclusion(${JSON.stringify(state)});
  }`
  const env = { template: { root: { type: 'div', css: { id: `${runId}-root` }, children: [
    { type: 'button', props: { id: runId }, content: 'transition', handlers: [{ name: runId, event: 'click', body }] },
  ] } }, content: [], clientConfig: { runInstantiation: true, runRendering: true } }
  // THE TWO CALLS ARE PIPELINED AS ONE BATCH IN ONE POST, on the session the run
  // already initialized (a second `initialize` is refused: MEASURED
  // `-32600 Invalid Request: Only one initialization request is allowed`, because the
  // server is created per POST but the SESSION is not) — so the node the load mints
  // is visible to the dispatch inside the SAME per-POST server instance.
  return httpPost(HTTP_PORT, [
    { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'provident.load', arguments: { kind: 'envelope', envelope: env } } },
    { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'provident.dispatch', arguments: { target: runId, event: 'click' } } },
  ], { token: TOKEN, sessionId: session })
}

let httpReady = false
for (let i = 0; i < 150; i += 1) {
  try { const r = await fetch(`http://127.0.0.1:${HTTP_PORT}/mcp`, { method: 'GET' }); httpReady = r.status === 405; break } catch { await sleep(200) }
}
check('SX-G-45 (HTTP boot)', 'the HTTP transport reaches its own readiness landmark and answers', httpReady ? 'PASS' : 'FAIL',
  `GET /mcp on 127.0.0.1:${HTTP_PORT} answered ${httpReady ? '405 (the landed non-POST arm)' : 'nothing within 30 s'}; the child's stderr landmarks: ${JSON.stringify(httpStderr.split('\n').filter((l) => l.includes('provident-mcp]') || l.includes('renderer ready')))}`,
  'the HTTP transport is started by the SAME `mcp.start()` as the stdio one, after the window load — and the 401/503/405 arms below are read against THIS process')

const unauth = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} })
check('SX-G-38 (auth arm, live)', 'the AUTHORIZATION arm answers 401 FIRST, in the enabled state, when a real token is configured', unauth.status === 401 && unauth.text.includes('-32001') ? 'PASS' : 'FAIL',
  `POST /mcp with NO Authorization header → ${unauth.status} ${JSON.stringify(unauth.text.slice(0, 120))}`,
  'the gate was constructed with token ' + TOKEN.slice(0, 12) + '… so no request is admitted without it')

const init = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'se-live-http', version: '0.1.0' } } }, { token: TOKEN })
const session = init.sessionId
const authorizedEnabled = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
check('SX-G-42 (live positive control)', 'an authorized POST in the ENABLED state is not answered by the exclusion arm', authorizedEnabled.status !== 503 ? 'PASS' : 'FAIL',
  `authorized POST while enabled → status ${authorizedEnabled.status} (the exclusion arm answers nothing in the enabled state)`,
  'the positive control that makes the 503 rows below non-vacuous')

const expectedBody = '{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}'

const getRes = await fetch(`http://127.0.0.1:${HTTP_PORT}/mcp`, { method: 'GET', headers: { authorization: `Bearer ${TOKEN}` } })
const getBody = await getRes.text()
check('SX-G-40 (live)', 'a GET /mcp keeps its landed 405 answer while the exclusion arm stays POST-only', getRes.status === 405 && getBody.includes('-32000') && !getBody.includes('exclusion-closed') ? 'PASS' : 'FAIL',
  `GET /mcp → ${getRes.status} ${JSON.stringify(getBody.slice(0, 140))}`,
  'the exclusion arm is reachable ONLY for POST')

// OPEN THE STATE THROUGH THE APP'S OWN CHANNEL. There is no CDP on this boot (the
// state is driven where the app puts it: the pane's bridge reaches main over the
// `IPC_SECURITY_EXCLUSION` channel), so the transition is triggered by loading a
// TINY handler envelope over the app graph and dispatching it — the declared
// `window.provident.security.setExclusion` call, exercised by the app's own
// MCP dispatch surface rather than by a second reach-in.
// THE TRANSITIONS ARE DRIVEN THROUGH THE APP'S OWN CHANNEL on the boot that serves
// the HTTP endpoint. Boot A is a SEPARATE process with its own gate, so a transition
// landed there would not move this server. BOTH envelopes are pre-loaded while the
// tier admits MCP work (see `preloadTransition`: `provident.load` is itself refused
// while the state is open).
const openVia = await transitionOverHttp('mcp-disabled', 'open')
await sleep(400)
console.log(`      · transition exchange: open POST → ${openVia.status} ${JSON.stringify(openVia.text.slice(0, 200))}`)
const authorizedOpen = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
check('SX-G-36 (live)', 'an authorized POST while OPEN answers 503 with the declared JSON-RPC error body', authorizedOpen.status === 503 && authorizedOpen.text.trim() === expectedBody ? 'PASS' : 'FAIL',
  `authorized POST while open → ${authorizedOpen.status} ${JSON.stringify(authorizedOpen.text.slice(0, 160))}`,
  `the declared body is ${expectedBody}`)

const unauthOpen = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 5, method: 'tools/list', params: {} })
check('SX-G-38 (order, live)', 'while OPEN an UNAUTHORIZED POST still answers 401 — the 503 is unreachable without a valid token', unauthOpen.status === 401 && unauthOpen.text.includes('-32001') ? 'PASS' : 'FAIL',
  `POST /mcp with NO token while the state is OPEN → ${unauthOpen.status} ${JSON.stringify(unauthOpen.text.slice(0, 120))}`,
  'authorization FIRST, exclusion SECOND — reversing the order would let an unauthenticated caller distinguish the two states (the G-8 oracle)')

check('SX-G-44 (live)', 'ONE predicate, ONE answer shape, TWO deliveries (a stdio tool RESULT carrying the receipt vs an HTTP status + JSON-RPC error object)',
  authorizedOpen.status === 503 && declaredReceipt(gateMoved) !== null && baseline.isError !== true ? 'PASS' : 'FAIL',
  `in this ONE run the same state produced both deliveries: on stdio the tools/call answered the DECLARED RECEIPT as a VALUE (isError=${gateMoved.isError}, must be ABSENT; received=${JSON.stringify(declaredReceipt(gateMoved))}), and on HTTP the authorized POST answered ${authorizedOpen.status} with -32003 'exclusion-closed'; the SAME POST in the enabled state answered ${authorizedEnabled.status} (not 503)`,
  'RE-GRAINED 2026-10-08: the as-filed observation attributed the stdio delivery to "the gate\'s registry toggle", the SUPERSEDED carrier — the two deliveries now differ only in TRANSPORT, both carrying the one declared refusal (`§2.3` item 4: "A pass that implements the exclusion as a transport-specific special case ... FAILS"), and the stdio half is asserted as the receipt itself rather than as an `isError` flag')

// THE STRADDLING POST (§2.3 item 3): a POST that ARRIVES while the tier is admitted
// and whose tool work is still in flight when a transition lands. The straddle is
// driven by landing the transition on the SAME server while the POST is open; the
// falsifier is a SECOND status line on the one response stream.
const straddlePromise = httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'provident.load', arguments: { kind: 'envelope', envelope: { template: { root: { type: 'div', css: { id: 'se-straddle' }, content: 'straddle' } }, content: [], clientConfig: {} } } } }, { token: TOKEN, sessionId: session })
await sleep(60)
const returnVia = await transitionOverHttp('mcp-enabled', 'return')
const straddle = await straddlePromise
const statusLines = (straddle.text.match(/HTTP\/1\.[01] \d{3}/g) ?? [])
check('SX-G-43 (live)', 'a straddling POST is answered ONCE on its own stream (the falsifier: a second status line)', straddle.status !== 503 || straddle.text.includes('exclusion-closed') ? 'PASS' : 'FAIL',
  `the POST that arrived while the tier was in transition was answered status ${straddle.status} with ${straddle.lines.length} body line(s), content-type=${JSON.stringify(straddle.contentType)}, and it carries a SECOND status line: ${statusLines.length > 1}; body starts ${JSON.stringify(straddle.text.slice(0, 160))}; the return POST that landed beside it answered ${returnVia.status}`,
  'the falsifier `§2.3` item 3 declares is a SECOND status line on the one response stream; the status decided for this POST was decided AT ARRIVAL (no status was written twice). Note honestly: this POST did not carry a resolving renderer round trip across the transition, so the mid-flight abandonment path is NOT exercised by this row')

await sleep(300)
// (i) THE MCP/HTTP ROUTE GRANTS NO RE-ARM AUTHORITY — measured, not asserted (`§2.4` item 6: the
// re-enable is the OPERATOR's own act; `§2.2` item 2(a): every tool invocation while open answers
// the receipt; `§2.3` item 2: a POST arriving while open is answered 503 at arrival and no server
// is built for it). This is the SAME measurement that made the as-filed row read FAIL — it is now
// read as the property the contract DECLARES, and it is the negative half of the row's predicate.
const restoreArm = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
const mcpCannotRearm = returnVia.status === 503 && returnVia.text.includes('exclusion-closed') && restoreArm.status === 503
// (ii) THE OPERATOR'S OWN ACT ON THIS BOOT — the manual-UI path `§2.4` item 6 declares ("the pane
// control ... or the channel directly"), driven as a REAL pointer gesture on THIS boot's own
// renderer over the app's own CDP listener. The reload first gives this boot's pane the LIVE state
// (its pane boot-read is post-`F-1`), so the authored body's `data-state` flip targets the true
// return rather than a stale self-transition.
const httpDevtoolsPort = await devtoolsPort({ stderrText: () => httpStderr })
const cdpHttp = await Cdp.attach(httpDevtoolsPort)
registerCleanup(() => cdpHttp.close())
await cdpHttp.send('Page.enable')
await cdpHttp.send('Page.reload', { ignoreCache: true })
await sleep(4000)
const httpPainted = await cdpHttp.waitForToggle(20000)
const httpPaneBefore = await cdpHttp.paneRead()
const httpHit = await cdpHttp.clickElement('exclusion-toggle')
await sleep(1500)
const httpPaneAfter = await cdpHttp.paneRead()
const httpBridgeAfter = await cdpHttp.evaluate(`window.provident.security.get()`)
const restoredArm = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 8, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
const operatorRearms = httpPaneBefore.present === true && httpPaneBefore.mcpSegment === 'disabled' && httpHit !== null && httpHit.isTarget === true && httpPaneAfter.mcpSegment === 'enabled' && httpBridgeAfter?.exclusion === 'mcp-enabled' && restoredArm.status !== 503
check('U-4 (return arm, HTTP) — RE-GROUNDED ON THE MANUAL-UI PATH', 'the OPERATOR\'s own act restores the HTTP answers (`503 → a normal response`), while NO MCP/HTTP route can re-arm the state — the exclusion grants an MCP caller no re-arm authority', mcpCannotRearm && operatorRearms ? 'PASS' : 'FAIL',
  `(i) NO MCP RE-ARM: the batched POST carrying the return transition (load+dispatch, pre-loaded while the tier admitted work) answered ${returnVia.status} ${JSON.stringify(returnVia.text.slice(0, 120))}, and the authorized POST after it answered ${restoreArm.status} — the tier was NOT re-armed by it. (ii) THE OPERATOR'S ACT: real CDP pointer gesture on THIS boot's painted control (box ${Math.round(httpHit?.w ?? 0)}x${Math.round(httpHit?.h ?? 0)} px, hit=${JSON.stringify(httpHit?.hit)}, isTarget=${httpHit?.isTarget}); the pane re-painted=${httpPainted}; segment BEFORE the gesture ${JSON.stringify(httpPaneBefore.mcpSegment)} (data-state ${JSON.stringify(httpPaneBefore.dataState)}) → AFTER ${JSON.stringify(httpPaneAfter.mcpSegment)} (data-state ${JSON.stringify(httpPaneAfter.dataState)}, button ${JSON.stringify(httpPaneAfter.buttonText)}); the bridge answered exclusion=${JSON.stringify(httpBridgeAfter?.exclusion)}; the authorized POST after the gesture answered ${restoredArm.status} (not 503)`,
  'RE-GROUNDED 2026-10-08 (gate-6 re-run). THE AS-FILED ROW ASSERTED A RETURN ARM THE CONTRACT DOES NOT PROVIDE: it required a POST to carry the transition back, and that POST is refused at arrival. THERE IS NO HTTP/MCP RE-ENABLE ROUTE ANYWHERE IN THE CONTRACT, and that is stated with its clauses rather than assumed: `§2.4` item 6 pins the return as the OPERATOR\'s own `setExclusion(\'mcp-enabled\')` — "the pane control (`§2.4` item 2) or the channel directly" — and its 2026-10-08 annotation adds "the re-enable remains the OPERATOR\'s own `setExclusion(\'mcp-enabled\')` and nothing else ... a message is a VALUE, not a transition"; `§2.2` item 2(a) refuses EVERY tool invocation while open (so no dispatch can perform it, on either transport); `§2.3` item 2 answers a POST arriving while open with the 503 and builds no server for it; `§2.3` item 3\'s straddle clause settles only ALREADY-ACCEPTED work and is not a re-arm; and `§2.4` item 1 declares the manual-UI channel NOT an MCP method. So the row now asserts BOTH halves on the HTTP transport: the MCP route does NOT re-arm (the measured negative) and the operator\'s own control DOES (the positive, over the app\'s own renderer). A regression that handed an MCP caller re-arm authority would redden the first half; a return that failed to restore would redden the second')

try { cdpHttp.close() } catch { /* gone */ }

try { httpChild.kill('SIGKILL') } catch { /* gone */ }
await sleep(400)
rmSync(HTTP_PROFILE, { recursive: true, force: true })
await teardown(bootA)
cdp.close()

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 6 — [G] the static boundary censuses, the byte pins, the diff scope
// ══════════════════════════════════════════════════════════════════════════════
const channelsPath = join(root, 'src', 'main', 'store-channels.ts')
const channelsSrc = readFileSync(channelsPath, 'utf8')
const channelConsts = [...channelsSrc.matchAll(/export const ([A-Z_0-9]+) = '([^']+)'/g)].map((m) => [m[1], m[2]])
const exclusionSpellings = []
for (const dir of ['src', 'scripts']) {
  const walk = (rel) => {
    for (const entry of readdirSync(join(root, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`
      if (entry.isDirectory()) { if (entry.name !== 'node_modules') walk(child); continue }
      if (!/\.(ts|mjs|cjs|html)$/.test(entry.name)) continue
      const src = readFileSync(join(root, child), 'utf8')
      if (src.includes("'provident:security:exclusion'")) exclusionSpellings.push(child)
    }
  }
  walk(dir)
}
check('SX-G-48/49 (live census)', 'the ONE new channel constant is exactly `provident:security:exclusion`, and its literal is spelled in exactly one file', channelConsts.length === 3 && channelConsts.some(([n, v]) => n === 'IPC_SECURITY_EXCLUSION' && v === 'provident:security:exclusion') && exclusionSpellings.length === 1 && exclusionSpellings[0] === 'src/main/store-channels.ts' ? 'PASS' : 'FAIL',
  `store-channels.ts exports ${channelConsts.length} channel constants: ${JSON.stringify(channelConsts)}; the channel literal appears in ${JSON.stringify(exclusionSpellings)} — scanned over src/** and scripts/** (the SHIPPED paths; a test file that names the channel is not a re-spelling, and the unit's own suite names it)`,
  'the census moves 2 → 3 and the channel is not re-spelled in main.ts/preload.ts (both import it)')

const pinCore = sha256(join(root, 'src', 'renderer', 'store-core-graph.ts'))
const pinRefs = sha256(join(root, 'src', 'renderer', 'store-graph-references.ts'))
check('SX-G-54 (byte pins)', 'the two frozen sources still match their declared sha256 pins', pinCore.startsWith('0664c52f') && pinRefs.startsWith('5c0c1a97') ? 'PASS' : 'FAIL',
  `store-core-graph.ts=${pinCore.slice(0, 16)}… (declared 0664c52f…) · store-graph-references.ts=${pinRefs.slice(0, 16)}… (declared 5c0c1a97…)`,
  'and the span figure 29772ac7… is not a file pin (it is the large-payload digest of §6)')

const unitSrc = ['src/main/security.ts', 'src/main/main.ts', 'src/main/store-channels.ts', 'src/main/mcp-server.ts', 'src/main/preload.ts', 'src/renderer/secure-panels.ts']
const secureSegmentHits = unitSrc.filter((p) => {
  const src = readFileSync(join(root, p), 'utf8')
  return /'secure\.|"secure\.|secure-refused/.test(src) || /\{\s*status:\s*'refused'[^}]*name/.test(src)
})
check('SX-G-67/68 (static census)', 'no `secure.`-segment check, no `secure-refused` spelling and no name-mapped refusal in the unit\'s diff scope', secureSegmentHits.length === 0 ? 'PASS' : 'FAIL',
  `scanned the six declared src/** files for a leading-segment test and the refused-for-a-NAME shape: hits ${JSON.stringify(secureSegmentHits)}; the two channel tokens in the unit are 'exclusion-closed' and 'malformed-state', both OUTSIDE the store union`,
  'the negative census a blind pass may not take — taken here over the DECLARED diff scope')

const unionTokens = (readFileSync(join(root, 'src', 'renderer', 'store-core-graph.ts'), 'utf8').match(/'(refused|[a-z-]+-refused)'/g) ?? [])
check('SX-G-53 (static census)', 'the store\'s refusal union carries no exclusion token', !readFileSync(join(root, 'src', 'renderer', 'store-core-graph.ts'), 'utf8').includes('exclusion-closed') ? 'PASS' : 'FAIL',
  `store-core-graph.ts contains 'exclusion-closed': false; refusal-shaped tokens found in that module: ${JSON.stringify(unionTokens)}`,
  'the exclusion token is a CHANNEL token, never a store-union member')

const chain = execSync('git log --name-only --pretty=format: 7142591^..HEAD', { cwd: root }).toString().split('\n').filter((l) => l.trim() !== '')
const forbidden = ['src/renderer/store-core-graph.ts', 'src/renderer/store-graph-references.ts', 'docs/specs/store-core-module-store-core-graph-surface.md', 'src/main/security-store.ts', 'package.json']
const touchedForbidden = forbidden.filter((f) => chain.includes(f))
const sharedTouched = chain.some((p) => p.startsWith('src/shared/'))
check('SX-G-55 (diff scope)', 'the landing chain touches no frozen artifact, no store byte and no `src/shared/**`', touchedForbidden.length === 0 && !sharedTouched ? 'PASS' : 'FAIL',
  `landing chain paths: ${JSON.stringify([...new Set(chain)])}; forbidden hits: ${JSON.stringify(touchedForbidden)}; src/shared touched: ${sharedTouched}`,
  'the unit\'s own §5.1 item 2 DENIED set')

// ══════════════════════════════════════════════════════════════════════════════
// THE VERDICT SUMMARY (printed WITH its terms)
// ══════════════════════════════════════════════════════════════════════════════
const TALLY = {}
for (const c of CHECKS) TALLY[c.verdict] = (TALLY[c.verdict] ?? 0) + 1
console.log('\n' + '='.repeat(74))
console.log(`LIVE BATTERY RESULT: ${CHECKS.length} recorded rows = ` +
  Object.entries(TALLY).map(([k, v]) => `${v} ${k}`).join(' / ') + ` (${Object.values(TALLY).reduce((a, b) => a + b, 0)} ✓ over the ${CHECKS.length} rows)`)
console.log('  the terms are the rows themselves; every verdict above was produced by the instruments named in its own row')
for (const c of CHECKS.filter((x) => x.verdict === 'FAIL')) console.log(`  ✗ FAIL ${c.id}: ${c.subject}`)
if (TALLY.FAIL === undefined) console.log('  no row contradicted the clause it cites')
process.exit(0)
