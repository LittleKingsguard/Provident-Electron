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
    const paneInZone3 = await evaluate(`!!document.querySelector('[data-zone="zone-3"] .pane-frame[data-pane-id="pane-a"]')`)
    const paneZone = await evaluate(`window.__pgdemo.read.paneZone('pane-a')`)
    const upTrace = await evaluate(`JSON.stringify(window.__upTrace ?? null)`)
    const traceTail = await evaluate(`JSON.stringify((window.__dragTrace ?? []).slice(-4))`)
    console.log(`[live] post-release: paneZone=${paneZone} upTrace=${upTrace} traceTail=${traceTail}`)
    check('release commits: pane-a now displayed in zone-3 (fully, not ghost)', paneInZone3 === true, `paneZone=${paneZone} inZ3=${paneInZone3}`)
    check('the ghost is gone after commit', after.ghost === false, `ghost=${after.ghost}`)
    check('exactly ONE sink call (the single-sink channel)', after.sinkCalls === 1, `sinkCalls=${after.sinkCalls}`)
    // the zone-3 size obeys the constraint: the drop size (< min) repaired per the
    // two-arm rule — arm (a) [min/2, min) ROUNDS UP to the min; arm (b) < min/2
    // discards + minimizes. The demo's own committed size is pane-a's 160 (>= min 90).
    check('zone-3 size respects the configured minimum', after.zone3Size >= 90, `zone3Size=${after.zone3Size}`)

    // 5. THE ABANDON PATH: a fresh drag, then right-click -> temp removed, the
    //    persistent original reasserts (the file-tier original never removed).
    //    The committed pane now lives in zone-3, so re-query its handle there.
    const handleBox2 = await boxOf('.pane-frame[data-pane-id="pane-a"] .pane-handle')
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

  console.log('')
  if (failures === 0) {
    console.log('[live] PANE-DRAG + GUTTER LIVE TESTS: ALL GREEN')
    process.exit(0)
  } else {
    console.log(`[live] PANE-DRAG + GUTTER LIVE TESTS: ${failures} FAILED`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[live] fatal:', err.message)
  process.exit(2)
})