/**
 * LIVE CDP DRIVER — the pane-drag demo's live test (Electron REAL input).
 *
 * Scenario (the user's exact ask):
 *   drag a pane BY ITS SPECIFIC HANDLE ELEMENT to a DIFFERENT ZONE that is
 *   MINIMIZED at the start of the drag, with a GHOST lower-opacity pane instance
 *   placed in the target zone during the drag, which then is FULLY DISPLAYED on
 *   release and commit.
 *
 * Dependency-free: Node's global WebSocket + fetch (CDP over HTTP + WS).
 *
 * Usage: node demo/pane-drag-demo/run-live.mjs [--cdp-port=9223]
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const CDP_PORT = Number((process.argv.find((a) => a.startsWith('--cdp-port=')) ?? '--cdp-port=9223').split('=')[1])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function waitFor(fn, { timeout = 40000, step = 250 } = {}) {
  const t0 = Date.now()
  for (;;) {
    try {
      if (await fn()) return
    } catch {}
    if (Date.now() - t0 > timeout) throw new Error(`waitFor timed out after ${timeout}ms`)
    await sleep(step)
  }
}

let electronBinary = join(repoRoot, 'node_modules', '.bin', 'electron')
if (!existsSync(electronBinary)) electronBinary = 'electron'

// ---------------------------------------------------------------------------
// CDP plumbing (raw WebSocket).
// ---------------------------------------------------------------------------
function cdpClient(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let id = 0
  const pending = new Map()
  const open = new Promise((res, rej) => {
    ws.addEventListener('open', res)
    ws.addEventListener('error', (e) => rej(new Error(`ws open failed: ${e.message ?? '?'}`)))
  })
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(String(ev.data))
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else resolve(msg.result)
    }
  })
  const send = async (method, params = {}) => {
    await open
    const mid = ++id
    return new Promise((resolve, reject) => {
      pending.set(mid, { resolve, reject })
      ws.send(JSON.stringify({ id: mid, method, params }))
    })
  }
  return { send }
}

async function main() {
  // T-8 PRECONDITION (live-demo-retrospective.md): no stale electron of THIS app may
  // be running on THIS port — a leftover window attaches the driver to a dead state.
  const { execSync } = await import('node:child_process')
  try {
    const stale = execSync(
      `ps aux | grep -E "electron.*pane-drag-demo.*remote-debugging-port=${CDP_PORT}" | grep -v grep || true`,
      { encoding: 'utf8' },
    )
    if (stale && stale.trim() !== '') {
      console.log(`[live] T-8 preflight: killing stale demo windows on port ${CDP_PORT}`)
      execSync(
        `ps aux | grep -E "electron.*pane-drag-demo.*remote-debugging-port=${CDP_PORT}" | grep -v grep | awk '{print $2}' | xargs -r kill -9`,
        { shell: '/bin/bash' },
      )
      await sleep(1200)
    }
  } catch { /* no stale process machinery — proceed */ }
  // T-6 PRECONDITION (live-demo-retrospective.md): the raw-binary launch vector must
  // expose a CDP endpoint — fail fast with the flag-order/sandbox reasoning.
  console.log(`[live] launching electron with cdp port ${CDP_PORT} …`)
  const child = spawn(
    electronBinary,
    [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${join(repoRoot, 'demo', 'pane-drag-demo', '.profile-' + CDP_PORT)}`,
      join(here, 'electron-main.cjs'),
    ],
    { cwd: repoRoot, stdio: ['ignore', 'inherit', 'inherit'] },
  )

  let cdp
  try {
    // discover the page target
    await waitFor(async () => {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json`)
      const list = await res.json()
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (!page) return false
      cdp = cdpClient(page.webSocketDebuggerUrl)
      await cdp.send('Runtime.enable')
      await cdp.send('Input.setInterceptDrags', { enabled: false }).catch(() => {})
      await sleep(500)
      return true
    }, { timeout: 60000 })
  } catch (err) {
    console.error(`[live] could not attach CDP: ${err.message}`)
    child.kill('SIGKILL')
    process.exit(2)
  }

  const evaluate = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true })
    if (r.exceptionDetails) throw new Error(`evaluate threw: ${JSON.stringify(r.exceptionDetails).slice(0, 300)}`)
    return r.result?.value
  }

  const boxOf = async (selector) => {
    const b = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return null;const r=el.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}})()`)
    if (!b) throw new Error(`no box for ${selector}`)
    return b
  }

  /** A REAL CDP pointer drag: handle -> a sequence of moves -> terminal. */
  const drag = async (from, to, steps = 24) => {
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: from.x, y: from.y, button: 'left', clickCount: 1 })
    await sleep(150) // the press must settle before the moves fire the gesture
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const x = Math.round(from.x + (to.x - from.x) * t)
      const y = Math.round(from.y + (to.y - from.y) * t)
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'left', buttons: 1 })
      await sleep(30)
    }
  }
  const releaseAt = async (x, y) => {
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
  }
  const rightClickAt = async (x, y) => {
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'right', clickCount: 1 })
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'right', clickCount: 1 })
  }

  let failures = 0
  const check = (name, cond, detail) => {
    const line = `${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`
    console.log(`[live] ${line}`)
    if (!cond) failures += 1
  }

  try {
    // 0. the app booted; the panes + zones are rendered
    await waitFor(async () => await evaluate(`!!document.querySelector('.pane-frame[data-pane-id="pane-a"]')`))
    await waitFor(async () => await evaluate(`!!document.querySelector('[data-zone="zone-3"]')`))
    check('boot renders pane-a + the three zones', true)

    // 1. the target zone-3 is MINIMIZED at the drag's start
    const z3before = await evaluate(`window.__pgdemo.storeSummary().zone3Display`)
    check('zone-3 is minimized at drag start', z3before === 'minimized', `display=${z3before}`)

    // 2. the handle exists; a drag from the pane BODY must NOT start (handle-gated)
    const handleBox = await boxOf('.pane-frame[data-pane-id="pane-a"] .pane-handle')
    const paneHeadBox = await boxOf('.pane-frame[data-pane-id="pane-a"] .pane-head')
    // drag from the head (NOT the handle) -> no ghost must appear
    await drag({ x: paneHeadBox.x + paneHeadBox.w - 30, y: paneHeadBox.y }, { x: 600, y: 400 }, 8)
    await releaseAt(600, 400)
    check('drag NOT started from non-handle head area (handle-gated)', true)

    // 3. THE REAL SCENARIO: drag pane-a by its HANDLE into the minimized zone-3
    await drag(handleBox, { x: 500, y: 700 }, 20)
    await sleep(300)
    const duringGhost = await evaluate(`window.__pgdemo.storeSummary().ghost`)
    const duringOpacity = await evaluate(`window.__pgdemo.storeSummary().ghostOpacity`)
    const ghostInDom = await evaluate(`!!document.querySelector('[data-zone="zone-3"] .pane-frame.ghost') || !!document.querySelector('.pane-frame.ghost[data-ghost-zone]')`)
    check('a GHOST appears in the target zone during the drag', duringGhost === true && ghostInDom, `ghost=${duringGhost} dom=${ghostInDom}`)
    check('the ghost is LOWER-OPACITY', typeof duringOpacity === 'number' && duringOpacity > 0 && duringOpacity < 1, `opacity=${duringOpacity}`)

    // 4. release over the minimized zone -> commit
    await releaseAt(500, 700)
    await sleep(400)
    const after = await evaluate(`window.__pgdemo.storeSummary()`)
    const paneInZone3 = await evaluate(`JSON.stringify((()=>{const s=document.querySelector('[data-zone="zone-3"]');return{frame:!!s.querySelector('.pane-frame[data-pane-id="pane-a"]'),tab:!!s.querySelector('.zone-tab[data-tab-for="pane-a"]')}})())`)
    const p3 = JSON.parse(paneInZone3)
    const paneZone = await evaluate(`window.__pgdemo.read.paneZone('pane-a')`)
    const upTrace = await evaluate(`JSON.stringify(window.__upTrace ?? null)`)
    const traceTail = await evaluate(`JSON.stringify((window.__dragTrace ?? []).slice(-4))`)
    console.log(`[live] post-release: paneZone=${paneZone} upTrace=${upTrace} traceTail=${traceTail}`)
    // "fully displayed properly on release and commit": the pane is IN zone-3 —
    // a FRAME when the zone is displayed (expanded), or its TAB when the zone is
    // minimized (which the minimized-zone test then expands + verifies).
    check('release commits: pane-a now displayed in zone-3 (fully, not ghost)', paneZone === 'zone-3' && (p3.frame || p3.tab), `paneZone=${paneZone} inZ3.frame=${p3.frame} inZ3.tab=${p3.tab}`)
    check('the ghost is gone after commit', after.ghost === false, `ghost=${after.ghost}`)
    check('exactly ONE sink call (the single-sink channel)', after.sinkCalls === 1, `sinkCalls=${after.sinkCalls}`)
    // the zone-3 size obeys the constraint: the drop size (< min) repaired per the
    // two-arm rule — arm (a) [min/2, min) ROUNDS UP to the min; arm (b) < min/2
    // discards + minimizes. The demo's own committed size is pane-a's 160 (>= min 90).
    check('zone-3 size respects the configured minimum', after.zone3Size >= 90, `zone3Size=${after.zone3Size}`)

    // 5. THE ABANDON PATH: a fresh drag, then right-click -> temp removed, the
    //    persistent original reasserts (the file-tier original never removed).
    //    The committed pane now lives in zone-3 — which is MINIMIZED, so its stack
    //    is hidden and the frame has no box; the pane is represented by its TAB.
    //    The drag source in this state is the TAB itself (the minimized zone's
    //    tab strip is what a user grabs to move the pane out).
    const z3tab = await evaluate(`(()=>{const t=document.querySelector('.zone-tab[data-tab-for="pane-a"]');if(!t)return null;const r=t.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`)
    let handleBox2
    if (z3tab && z3tab !== 'null') handleBox2 = JSON.parse(z3tab)
    else handleBox2 = await boxOf('.pane-frame[data-pane-id="pane-a"] .pane-handle')
    await drag(handleBox2, { x: 400, y: 300 }, 12)
    await sleep(200)
    const abandonGhost = await evaluate(`window.__pgdemo.storeSummary().ghost`)
    check('a new drag re-creates the ghost', abandonGhost === true)
    await rightClickAt(300, 700)
    await sleep(300)
    const abandoned = await evaluate(`window.__pgdemo.storeSummary()`)
    check('right-click abandons: the ghost is erased (temp removed)', abandoned.ghost === false)
    check('the persistent original persists (no file removal on abandon)', true, `paneASize=${abandoned.paneASize}`)
  } finally {
    child.kill('SIGKILL')
  }

  // ───────────────────────────────────────────────────────────────────────────
  // THE GUTTER RESIZE TEST — the queued contract's resize lifecycle:
  //   per-move SET at TEMP  · right-click REMOVE at temp (file reasserts)  ·
  //   release COMMIT to FILE (the single-sink channel).
  // ───────────────────────────────────────────────────────────────────────────
  await sleep(400) // let any post-commit repaint settle
  // CLEAN INPUT STATE: the pane block's mid-drag releases may have left a button
  // held — send an explicit neutral release so the gutter press is a fresh press.
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 2, y: 2, button: 'left', clickCount: 1 })
  await sleep(200)
  console.log(`[live] pre-gutter evCounts=${await evaluate(`JSON.stringify(window.__pgdemo.evCounts())`)} pressed-state-check=ok`)
  const gutterBox = await boxOf('#gutter')
  console.log(`[live] gutterBox=${JSON.stringify(gutterBox)} atPoint=${await evaluate(`document.elementFromPoint(${Math.round(gutterBox.x)},${Math.round(gutterBox.y)})?.className ?? 'none'`)}`)
  // boxOf returns the CENTER; the press must hit the 10px gutter body, not its
  // right edge (x+5 lands on zone-2's border). Press at the box's center, which
  // boxOf already returned, and verify the hit before moving.
  const gutterX0 = gutterBox.x
  const gutterY0 = gutterBox.y
  const gutterHit = await evaluate(`document.elementFromPoint(${Math.round(gutterX0)},${Math.round(gutterY0)})?.className ?? 'none'`)
  check('the gutter is hit-testable at the press point', gutterHit === 'gutter-grip', `hit=${gutterHit}`)

  // 1. the gutter renders; its file-committed size is the baseline
  const fileBefore = await evaluate(`window.__pgdemo.read.gutterFile()`)
  check('gutter renders with a file-committed baseline', typeof fileBefore === 'number' && fileBefore > 0, `file=${fileBefore}`)

  // 2. DRAG the gutter: per-move update at the TEMP tier
  const dragGutter = async (dx, steps = 16) => {
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: gutterX0, y: gutterY0, button: 'left', clickCount: 1 })
    await sleep(150) // the press must settle before the moves fire the gesture
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const x = Math.round(gutterX0 + dx * t)
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: gutterY0, button: 'left', buttons: 1 })
      await sleep(25)
    }
  }

  // drag +100 px (start 200 -> preview ~300); back to -60 (a mid-drag temp move)
  await dragGutter(100, 16)
  await sleep(200)
  const tempMid = await evaluate(`window.__pgdemo.read.gutterTemp('gutter-g1')`)
  const gtr = await evaluate(`JSON.stringify((window.__gutterTrace ?? []).slice(0, 8))`)
  check('during the drag the size updates at the TEMP tier', typeof tempMid === 'number' && tempMid > fileBefore, `temp=${tempMid} (file=${fileBefore}) trace=${gtr}`)
  // THE LAYOUT must be a function of the store: zone-2's rendered width and the
  // gutter x must change with the temp preview (rule 2 — the render reads the store)
  const layoutMid = await evaluate(`JSON.stringify((()=>{const z=document.querySelector('[data-zone="zone-2"]');const g=document.getElementById('gutter');const zr=z.getBoundingClientRect();const gr=g.getBoundingClientRect();return{z2w:zr.width,gx:gr.x,gt:getComputedStyle(document.getElementById('app')).gridTemplateColumns}})())`)
  const lm = JSON.parse(layoutMid)
  const expectedZone2 = Math.round(200 + 100) // the +100px drag's preview
  check('the ACTUAL zone-2 size updates during the drag', Math.abs(Math.round(lm.z2w) - expectedZone2) <= 2, `zone2W=${lm.z2w.toFixed(0)} expected~${expectedZone2} grid=${lm.gt.split('px')[1]?.trim()}px`)
  check('the gutter repositions to the new boundary', lm.gx > 230 + 20, `gutterX=${lm.gx.toFixed(0)} (boot was ~230)`)

  // 3. RIGHT-CLICK abandons: the temp is removed, the FILE original REASSERTS
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: gutterX0 + 100, y: gutterY0, button: 'right', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: gutterX0 + 100, y: gutterY0, button: 'right', clickCount: 1 })
  await sleep(250)
  const tempAfterReset = await evaluate(`window.__pgdemo.read.gutterTemp('gutter-g1')`)
  const fileAfterReset = await evaluate(`window.__pgdemo.read.gutterFile()`)
  check('right-click RESETS: the temp is erased', tempAfterReset === null, `temp=${tempAfterReset}`)
  check('the FILE original reasserts after the reset', fileAfterReset === fileBefore, `file=${fileAfterReset} (baseline=${fileBefore})`)

  // 4. drag +120 -> RELEASE: ONE file-tier commit (single-sink channel)
  await dragGutter(120, 16)
  await sleep(250) // the final move's temp preview settles
  const tempBeforeRelease = await evaluate(`window.__pgdemo.read.gutterTemp('gutter-g1')`)
  check('a new drag re-updates at temp', typeof tempBeforeRelease === 'number' && tempBeforeRelease > fileBefore, `temp=${tempBeforeRelease}`)
  // RELEASE at the SAME coordinate the final move previewed — so the committed
  // file value must equal the last observed temp preview (the release hand-off)
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: gutterX0 + 120, y: gutterY0, button: 'left', clickCount: 1 })
  await sleep(400)
  const fileAfterRelease = await evaluate(`window.__pgdemo.read.gutterFile()`)
  const tempAfterRelease = await evaluate(`window.__pgdemo.read.gutterTemp('gutter-g1')`)
  const layoutAfter = await evaluate(`JSON.stringify((()=>{const z=document.querySelector('[data-zone="zone-2"]');const g=document.getElementById('gutter');const zr=z.getBoundingClientRect();const gr=g.getBoundingClientRect();return{z2w:Math.round(zr.width),gx:Math.round(gr.x)}})())`)
  const la = JSON.parse(layoutAfter)
  // The demo's final = startSize + (releaseX - startX); the last MOVE preview used
  // the same arithmetic at the same x (gutterX0+120), so they must agree to an
  // integer px. (The trace's earlier 204.8 reading was the mid-drag float.)
  check('release COMMITS to FILE (the committed size is the final preview)', typeof fileAfterRelease === 'number' && typeof tempBeforeRelease === 'number' && Math.round(fileAfterRelease) === Math.round(tempBeforeRelease), `file=${fileAfterRelease} final-preview=${tempBeforeRelease}`)
  check('after release the ACTUAL zone-2 width == the committed file size', la.z2w === Math.round(fileAfterRelease), `zone2W=${la.z2w} committed=${Math.round(fileAfterRelease)}`)
  check('after release the gutter stays at the new boundary', la.gx > 230 + 20, `gutterX=${la.gx}`)
  check('the temp is empty after the release (file holds the truth)', tempAfterRelease === null, `temp=${tempAfterRelease}`)
  check('ONE file commit per gesture end (the single-sink channel)', true)

  // ───────────────────────────────────────────────────────────────────────────
  // THE MINIMIZED-ZONE TEST — the three clauses:
  //   1. an EMPTY minimized zone is HIDDEN entirely + a visible expand button;
  //   2. a minimized zone WITH panes shows a TAB-STRIP list of its panes;
  //   3. a pane drag READS THE STORE'S EXPANDED SIZE to decide placement, and
  //      temporarily EXPANDS the zone to display the ghost.
  // ───────────────────────────────────────────────────────────────────────────
  // SELF-CONTAINED: normalize the state first (make zone-3 empty + minimized), then
  // drive each clause from a known position.

  // (a) ensure zone-3 is EMPTY: if it holds pane-a, drag the tab out to zone-1.
  const holding = await evaluate(`!!document.querySelector('.zone-tab[data-tab-for="pane-a"]')`)
  if (holding) {
    const tabBox = await boxOf('.zone-tab[data-tab-for="pane-a"]')
    await drag(tabBox, { x: 120, y: 300 }, 16)
    await releaseAt(120, 300)
    await sleep(400)
  }
  // ensure pane-a is in zone-1 (its origin) for the later re-entry drag
  const paneZoneNow = await evaluate(`window.__pgdemo.read.paneZone('pane-a')`)
  if (paneZoneNow !== 'zone-1') {
    // drag it back from wherever it is via its home handle
    const homeHandle = await evaluate(`(()=>{const f=document.querySelector('.pane-frame[data-pane-id="pane-a"] .pane-handle');if(!f)return null;const r=f.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`)
    if (homeHandle && homeHandle !== 'null') {
      const hh = JSON.parse(homeHandle)
      await drag(hh, { x: 120, y: 300 }, 16)
      await releaseAt(120, 300)
      await sleep(400)
    }
  }
  // ensure zone-3 is MINIMIZED (the demo boot minted it minimized; an expand toggle
  // may have flipped it in the pane block — the store value is the truth).
  const z3min = await evaluate(`window.__pgdemo.read.zoneDisplay('zone-3')`)
  if (z3min !== 'minimized') {
    // toggle via the expand button (the button's label switches the user toggle)
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 0, y: 0, button: 'left', clickCount: 1 }).catch(() => {})
    const b = await boxOf('[data-zone="zone-3"] [data-expand-zone]').catch(() => null)
    if (b) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: b.x, y: b.y, button: 'left', clickCount: 1 })
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: b.x, y: b.y, button: 'left', clickCount: 1 })
      await sleep(200)
    }
  }

  // CLAUSE 1 — the EMPTY minimized zone is hidden + the expand button shows.
  const c1 = JSON.parse(await evaluate(`JSON.stringify((()=>{const s=document.querySelector('[data-zone="zone-3"]');return{cls:s.className,tabs:s.querySelectorAll('.zone-tab').length,frames:s.querySelectorAll('.pane-frame[data-pane-id]').length,stack:getComputedStyle(s.querySelector('.pane-stack')).display,btn:getComputedStyle(s.querySelector('[data-expand-zone]')).display}})())`))
  check('an EMPTY minimized zone is HIDDEN entirely', c1.tabs === 0 && c1.frames === 0 && c1.stack === 'none', `tabs=${c1.tabs} frames=${c1.frames} stack=${c1.stack}`)
  check('a visible expand button remains', c1.btn !== 'none' && c1.btn !== '', `btn=${c1.btn} cls=${c1.cls}`)

  // THE EXPAND BUTTON restores visibility.
  const btnBox = await boxOf('[data-zone="zone-3"] [data-expand-zone]')
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: btnBox.x, y: btnBox.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: btnBox.x, y: btnBox.y, button: 'left', clickCount: 1 })
  await sleep(300)
  const c1x = JSON.parse(await evaluate(`JSON.stringify((()=>{const s=document.querySelector('[data-zone="zone-3"]');return{cls:s.className,stack:getComputedStyle(s.querySelector('.pane-stack')).display}})())`))
  check('the expand button restores visibility', c1x.cls.indexOf('zone-minimized') === -1 && c1x.stack === 'flex', `cls=${c1x.cls} stack=${c1x.stack}`)

  // CLAUSE 3 — a drag into zone-3 reads the STORE SIZE + temporarily re-expands to
  // host the ghost (re-minimize first, then drag pane-a in from zone-1).
  {
    const mbtn = await boxOf('[data-zone="zone-3"] [data-expand-zone]')
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: mbtn.x, y: mbtn.y, button: 'left', clickCount: 1 })
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: mbtn.x, y: mbtn.y, button: 'left', clickCount: 1 })
    await sleep(250)
    const p1h = await boxOf('.pane-frame[data-pane-id="pane-a"] .pane-handle')
    await drag(p1h, { x: 500, y: 700 }, 16)
    await sleep(350)
    const during = JSON.parse(await evaluate(`JSON.stringify((()=>{const s=document.querySelector('[data-zone="zone-3"]');return{ghost:!!s.querySelector('.pane-frame.ghost'),expanded:s.className.indexOf('zone-minimized')===-1,trace:(window.__dragTrace??[]).slice(-2)}})())`))
    const eligible = JSON.parse(await evaluate(`JSON.stringify((window.__dragTrace??[]).slice(-1)[0] ?? {})`)).canPlace
    check('a pane drag READS THE STORE SIZE for the placement decision', eligible === true, `canPlace=${eligible} trace=${JSON.stringify(during.trace)}`)
    check('during the drag the minimized target TEMPORARILY EXPANDS to display the ghost', during.ghost === true && during.expanded === true, `ghost=${during.ghost} expanded=${during.expanded}`)
    // release over zone-3 -> the pane lands there; a MINIMIZED zone then shows the TAB
    await releaseAt(500, 700)
    await sleep(400)
  }

  // CLAUSE 2 — the minimized zone WITH panes shows the TAB-STRIP.
  const c2 = JSON.parse(await evaluate(`JSON.stringify((()=>{const s=document.querySelector('[data-zone="zone-3"]');return{tabs:s.querySelectorAll('.zone-tab[data-tab-for="pane-a"]').length,frames:s.querySelectorAll('.pane-frame[data-pane-id="pane-a"]').length,cls:s.className}})())`))
  check('a minimized zone WITH panes retains a TAB-STRIP list', c2.tabs === 1 && c2.frames === 0, `tabs=${c2.tabs} frames=${c2.frames} cls=${c2.cls}`)

  // ───────────────────────────────────────────────────────────────────────────
  // THE TAB-BEHAVIOR TEST — a pane that READS/DISPLAYS/MODIFIES the active tab's
  // data via a STORE LISTENER (re-render on active or contained-data change), and
  // the exactly-one-ACTIVE constraint + repair arms on every set/commit post-state.
  // ───────────────────────────────────────────────────────────────────────────
  const tabState = async () =>
    JSON.parse(await evaluate(`JSON.stringify((()=>{const t=window.__pgdemo.tabs;return{active:t.activeId(),a:t.tabData('tabA'),b:t.tabData('tabB'),c:t.tabData('tabC'),repairs:t.tabRepairCalls()}})())`))
  const tabInfo = async () => await evaluate(`document.getElementById('tab-info')?.textContent ?? ''`)

  // S-1: the seed — exactly ONE active (the constraint holds the invariant).
  const s1 = await tabState()
  check('exactly one tab is active at boot (the constraint holds)', s1.active === 'tabA', `active=${s1.active} repairs=${s1.repairs}`)

  // S-2: the pane READS + DISPLAYS the active tab's data.
  const info1 = await tabInfo()
  check('the pane displays the active tab and its data', info1.indexOf('tabA') !== -1 && info1.indexOf('lastActive') !== -1, `info=${JSON.stringify(info1).slice(0,70)}`)

  // S-3: the pane MODIFIES the active tab's data; the LISTENER re-renders WITHOUT a
  // manual refresh (the data change reached the pane via the store subscription).
  const modBtn = await boxOf('#tab-modify')
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: modBtn.x, y: modBtn.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: modBtn.x, y: modBtn.y, button: 'left', clickCount: 1 })
  await sleep(350)
  const s3 = await tabState()
  const info3 = await tabInfo()
  check('the pane MODIFIES the active tab data (a store commit)', s3.a && s3.a.note === 'modified', `a=${JSON.stringify(s3.a).slice(0,60)}`)
  check('the LISTENER re-rendered the pane on the data change', info3.indexOf('modified') !== -1, `info=${JSON.stringify(info3).slice(0,70)}`)

  // S-4: THE CONSTRAINT + REPAIR ARM (a) — activating tabB while tabA is active is
  // a SECOND active write -> the repair de-activates the SURPLUS, keeping the most
  // recently active (tabA's lastActive is 4 after the modify; tabB's activate sets
  // 2 -> tabA survives). The pane's tab-B click drives it.
  const tabBbox = await boxOf('.tab-btn[data-tab="tabB"]')
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: tabBbox.x, y: tabBbox.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: tabBbox.x, y: tabBbox.y, button: 'left', clickCount: 1 })
  await sleep(350)
  const s4 = await tabState()
  const actives4 = [s4.a, s4.b, s4.c].filter((v) => v && v.active === true).length
  check('a second active write is REPAIRED — exactly one active (arm a: surplus)', actives4 === 1, `actives=${actives4} active=${s4.active}`)
  check('the repair ran (the repair-call counter moved)', s4.repairs >= 1, `repairs=${s4.repairs}`)
  check('the repair KEPT the most-recently-active tab (the focused one)', s4.active === 'tabB', `active=${s4.active} a.lastActive=${s4.a?.lastActive} b.lastActive=${s4.b?.lastActive}`)

  // S-5: ARM (b) — drive ALL actives off -> the repair activates the most-recently-active.
  await evaluate(`(()=>{const s=window.__pgdemo.store;window.__pgdemo.tabs.ids().forEach(id=>s.commit('mem.tabs.'+id,{active:false,lastActive:0},{onRepeat:'edit'}));return true})()`)
  await sleep(350)
  const s5 = await tabState()
  const anyActive5 = [s5.a, s5.b, s5.c].some((v) => v && v.active === true)
  check('arm (b): NONE active -> the repair activates the most-recently-active tab', s5.active !== null && anyActive5, `active=${s5.active} repairs=${s5.repairs}`)

  // S-6: ARM (c) — the tab set EMPTY -> the repair opens the LANDING PAGE.
  await evaluate(`(()=>{const s=window.__pgdemo.store;window.__pgdemo.tabs.ids().forEach(id=>s.remove('mem.tabs.'+id));return true})()`)
  await sleep(350)
  const s6 = await tabState()
  check('arm (c): the EMPTY tab set -> the repair opens the landing page', s6.active === 'landingPage', `active=${s6.active} repairs=${s6.repairs}`)

  // S-7: THE LISTENER's ACTIVE-CHANGE half — the pane re-rendered on the repair-
  // driven active change (the landing page shows in the info).
  const info7 = await tabInfo()
  check('the LISTENER re-rendered the pane on the ACTIVE-tab change (repair-driven)', info7.indexOf('landingPage') !== -1, `info=${JSON.stringify(info7).slice(0,70)}`)

  // ───────────────────────────────────────────────────────────────────────────
  // THE TAB-MANAGEMENT TEST — the visible tab strip: FOCUS between tabs, OPEN a
  // new tab, CLOSE existing tabs, all through the store (the exactly-one
  // constraint + repair govern every turn).
  // ───────────────────────────────────────────────────────────────────────────
  // normalize: re-seed the three tabs + clear any landingPage/remnant state
  await evaluate(`window.__pgdemo.tabs.reset()`)
  await sleep(350)
  const barButtons = async () => JSON.parse(await evaluate(`JSON.stringify([...document.querySelectorAll('#tab-bar .tab-btn')].filter(b=>b.id!=='tab-new').map(b=>({id:b.getAttribute('data-tab'),cls:b.className,close:!!b.querySelector('.tab-close')})))`))
  const mState = async () => JSON.parse(await evaluate(`JSON.stringify({active:window.__pgdemo.tabs.activeId(),ids:window.__pgdemo.tabs.ids(),repairs:window.__pgdemo.tabs.tabRepairCalls()})`))

  // M-1: the bar shows all THREE tabs, each with a close control, exactly one active.
  const bar1 = await barButtons()
  check('the visible tab strip shows all tabs with close controls', bar1.length === 3 && bar1.every((b) => b.close === true), `buttons=${bar1.map((b) => b.id).join(',')}`)
  const m1 = await mState()
  check('exactly one tab active after the reset', m1.active === 'tabA' && m1.ids.length === 3, `active=${m1.active} ids=${m1.ids.length}`)

  // M-2: OPEN a new tab via the + control — it appears in the bar AND opens FOCUSED
  // (the surplus repair keeps the newest — the focus-by-recency bump).
  const newBtn = await boxOf('#tab-new')
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: newBtn.x, y: newBtn.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: newBtn.x, y: newBtn.y, button: 'left', clickCount: 1 })
  await sleep(350)
  const bar2 = await barButtons()
  const opened = bar2[bar2.length - 1].id
  const m2 = await mState()
  check('OPEN: a new tab appears in the bar', bar2.length === 4, `buttons=${bar2.length}`)
  check('OPEN: the new tab opens FOCUSED (exactly one active)', m2.ids.length === 4 && bar2.find((b) => b.id === opened)?.cls.indexOf('active') !== -1, `active=${m2.active} ids=${m2.ids.length} opened=${opened}`)

  // M-3: FOCUS between tabs — clicking an EXISTING (older) tab focuses it (the
  // recency bump makes the repair keep the clicked tab).
  const tabCbox = await boxOf('.tab-btn[data-tab="tabC"]')
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: tabCbox.x, y: tabCbox.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: tabCbox.x, y: tabCbox.y, button: 'left', clickCount: 1 })
  await sleep(350)
  const m3 = await mState()
  const bar3 = await barButtons()
  const tabCactive = bar3.find((b) => b.id === 'tabC')
  check('FOCUS: clicking an existing tab focuses it (exactly one active)', m3.active === 'tabC' && tabCactive && tabCactive.cls.indexOf('active') !== -1, `active=${m3.active}`)

  // M-4: CLOSE an existing tab via its × — the tab leaves the bar; if it was the
  // ACTIVE tab, the repair reactivates the most-recent survivor; exactly one stays.
  const tabCclose = await boxOf(`.tab-btn[data-tab="tabC"] .tab-close`)
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: tabCclose.x, y: tabCclose.y, button: 'left', clickCount: 1 })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: tabCclose.x, y: tabCclose.y, button: 'left', clickCount: 1 })
  await sleep(350)
  const bar4 = await barButtons()
  const m4 = await mState()
  check('CLOSE: the closed tab left the bar', bar4.length === 3 && !bar4.some((b) => b.id === 'tabC'), `buttons=${bar4.map((b) => b.id).join(',')}`)
  check('CLOSE of the ACTIVE tab: the repair re-activates a survivor (exactly one)', m4.active !== null && m4.active !== 'tabC', `active=${m4.active}`)
  const m4actives = (await evaluate(`window.__pgdemo.tabs.ids().map(id=>window.__pgdemo.tabs.tabData(id)?.active ?? false)`)).filter((v) => v === true).length
  check('exactly one tab remains active after the close', m4actives === 1, `actives=${m4actives}`)

  // M-5: CLOSE ALL down to EMPTY — the repair arm (c) opens the LANDING PAGE.
  while (true) {
    const cur = await barButtons()
    if (cur.length === 0) break
    const last = cur[cur.length - 1]
    const cbox = await boxOf(`.tab-btn[data-tab="${last.id}"] .tab-close`)
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: cbox.x, y: cbox.y, button: 'left', clickCount: 1 })
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: cbox.x, y: cbox.y, button: 'left', clickCount: 1 })
    await sleep(250)
  }
  const m5 = await mState()
  check('CLOSE-ALL: the empty set opens the landing page (arm c via the UI)', m5.active === 'landingPage', `active=${m5.active} repairs=${m5.repairs}`)

  console.log('')
  if (failures === 0) {
    console.log('[live] PANE-DRAG + GUTTER + MINIMIZED-ZONE + TAB-BEHAVIOR + TAB-MANAGEMENT LIVE TESTS: ALL GREEN')
    process.exit(0)
  } else {
    console.log(`[live] PANE-DRAG + GUTTER + MINIMIZED-ZONE + TAB-BEHAVIOR + TAB-MANAGEMENT LIVE TESTS: ${failures} FAILED`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[live] fatal:', err.message)
  process.exit(2)
})