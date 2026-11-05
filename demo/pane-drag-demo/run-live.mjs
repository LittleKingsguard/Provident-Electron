/**
 * `demo/pane-drag-demo/run-live.mjs` — **THE LIVE CDP DRIVE OF THE REBUILT DEMO** (`D-118`).
 *
 * WHAT IT IS. A dependency-free driver (Node's global `WebSocket` + `fetch`, so no package and no leg script) that boots
 * the demo page in a disposable Electron window and drives it with REAL CDP pointer input — `Input.dispatchMouseEvent`,
 * not a synthetic `dispatch` — then reads the DEMO'S OWN module counters back out of the page. It asserts nothing about
 * a store, a crossing or a bridge: this page has none, and pretending otherwise is what `D-94`/`D-95` refused.
 *
 * WHAT IT PROVES, ROW BY ROW:
 *   · the page boots the demo and NOTHING ELSE — the app's boot guard is neutralised by the bundle, so `#app` still holds
 *     the demo's own heading and the window raised no page exception;
 *   · the SHAPE is what the drag reads: the stub answers `pane-a` at `100 / {0,200}` (`source: 'record'`) and a pane it does
 *     not name at the same figures (`source: 'default'`, the measured default `D-87`), while the handle's parent carries
 *     the DECOY attributes `size="999" min="0" max="999"` the pre-`D-117` wiring read and the composition does not;
 *   · a real hover writes the cursor declaration and a real exit clears it (`gutter-affordance`'s hover counters);
 *   · a real drag PREVIEWS from the shape's start, and its release COMMITS through `createPaneDrag`'s `release` — the
 *     demo's status node is the sink, and the route's call is recorded by the stub;
 *   · **THE STUB'S CONTROL IS THE AUTHORITY**: after the panel changes `pane-a`, the NEXT drag's start read is the new
 *     value, and after the bounds are tightened the next preview and commit are CLAMPED into the new pair.
 *
 * USAGE — `node demo/pane-drag-demo/run-live.mjs [--cdp-port=9223]`. It needs a display (`DISPLAY=:0`) because an Electron
 * window is a real window; the profile directory is a FRESH one in the OS temp area (`mkdtemp`) and is removed at the end,
 * so a run never writes into the repository (the checkouts of the old driver wrote `.profile-<port>` into this directory).
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(HERE, '..', '..')
const CDP_PORT = Number((process.argv.find((a) => a.startsWith('--cdp-port=')) ?? '--cdp-port=9223').split('=')[1])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function waitFor(fn, { timeout = 40000, step = 250 } = {}) {
  const started = Date.now()
  for (;;) {
    try {
      if (await fn()) return
    } catch {
      /* not ready yet — the caller's timeout is the reported failure */
    }
    if (Date.now() - started > timeout) throw new Error(`waitFor timed out after ${timeout}ms`)
    await sleep(step)
  }
}

let electronBinary = join(REPO_ROOT, 'node_modules', '.bin', 'electron')
if (!existsSync(electronBinary)) electronBinary = 'electron'

// ---------------------------------------------------------------------------
// CDP plumbing: a raw WebSocket, one pending map, nothing else.
// ---------------------------------------------------------------------------
function cdpClient(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let nextId = 0
  const pending = new Map()
  const pageExceptions = []
  const open = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', (event) => reject(new Error(`ws open failed: ${event.message ?? '?'}`)))
  })
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data))
    if (message.method === 'Runtime.exceptionThrown') pageExceptions.push(message.params)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(JSON.stringify(message.error)))
      else resolve(message.result)
    }
  })
  const send = async (method, params = {}) => {
    await open
    const id = ++nextId
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject })
      ws.send(JSON.stringify({ id, method, params }))
    })
  }
  return { send, pageExceptions }
}

async function main() {
  // T-8 PRECONDITION (live-demo-retrospective.md): no stale demo window may hold this port — a leftover window attaches
  // the driver to a dead state. Scoped to THIS directory's electron-main, so no other Electron process is ever touched.
  const { execSync } = await import('node:child_process')
  try {
    // THE PATTERN IS ORDER-INDEPENDENT ON PURPOSE: the window's command line puts `--remote-debugging-port=<n>` BEFORE the
    // app path (`electron … --remote-debugging-port=9223 … demo/pane-drag-demo/electron-main.cjs`), so the as-filed
    // `electron.*pane-drag-demo.*remote-debugging-port=` order could never match its own child — measured: two stale
    // windows from two runs survived it and the driver attached to the older one.
    const stalePattern = `pane-drag-demo.*remote-debugging-port=${String(CDP_PORT)}|remote-debugging-port=${String(CDP_PORT)}.*pane-drag-demo`
    const stale = execSync(`ps aux | grep -E "${stalePattern}" | grep -v grep || true`, {
      encoding: 'utf8',
      shell: '/bin/bash',
    })
    if (stale.trim() !== '') {
      console.log(`[live] T-8 preflight: killing ${String(stale.trim().split('\n').length)} stale demo process(es) on port ${String(CDP_PORT)}`)
      execSync(`ps aux | grep -E "${stalePattern}" | grep -v grep | awk '{print $2}' | xargs -r kill -9`, {
        shell: '/bin/bash',
      })
      await sleep(1200)
    }
  } catch {
    /* no process machinery to read — proceed and let the CDP attach report */
  }

  const profile = await mkdtemp(join(tmpdir(), 'provident-pane-demo-'))
  console.log(`[live] launching electron with cdp port ${String(CDP_PORT)} (profile ${profile}) …`)
  const child = spawn(
    electronBinary,
    [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--remote-debugging-port=${String(CDP_PORT)}`,
      `--user-data-dir=${profile}`,
      join(HERE, 'electron-main.cjs'),
    ],
    // `detached` puts the window in its own PROCESS GROUP, so the cleanup below can reap it BY GROUP: an Electron main
    // process killed by pid leaves its renderer and zygote children behind (measured: two survivors after the as-filed
    // `child.kill('SIGKILL')`), and a leg that leaves processes is not a leg.
    { cwd: REPO_ROOT, stdio: ['ignore', 'inherit', 'inherit'], detached: true },
  )

  /** Reap the window's whole process group, then forget the profile. Idempotent, never throws. */
  const reap = async () => {
    try {
      process.kill(-child.pid, 'SIGKILL')
    } catch {
      try {
        child.kill('SIGKILL')
      } catch {
        /* already gone */
      }
    }
    await sleep(300)
    await rm(profile, { recursive: true, force: true })
  }

  let cdp
  try {
    await waitFor(
      async () => {
        const response = await fetch(`http://127.0.0.1:${String(CDP_PORT)}/json`)
        const list = await response.json()
        const page = list.find((target) => target.type === 'page' && target.webSocketDebuggerUrl)
        if (!page) return false
        cdp = cdpClient(page.webSocketDebuggerUrl)
        await cdp.send('Runtime.enable')
        await cdp.send('Input.setInterceptDrags', { enabled: false }).catch(() => {})
        await waitFor(async () => await evaluate(cdp, `!!window.__pgdemo`), { timeout: 20000 })
        return true
      },
      { timeout: 60000 },
    )
  } catch (error) {
    console.error(`[live] could not attach CDP: ${error.message}`)
    await reap()
    process.exit(2)
  }

  const read = async () => JSON.parse(await evaluate(cdp, `JSON.stringify(window.__pgdemo.read())`))
  const boxOf = async (selector) => {
    const box = await evaluate(
      cdp,
      `(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return null;const r=el.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}})()`,
    )
    if (box === null) throw new Error(`no box for ${selector}`)
    return box
  }
  const press = async (point) => {
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: point.x, y: point.y, button: 'left', clickCount: 1 })
    await sleep(120)
  }
  /** A real horizontal move sequence. The pointer CAPTURE the page installs on the press is what keeps these events on the
   *  handle once it has moved away from the pointer — that is measured by the drag rows, not assumed. */
  const moveBy = async (point, dx, steps = 12) => {
    for (let step = 1; step <= steps; step += 1) {
      const x = Math.round(point.x + (dx * step) / steps)
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: point.y, button: 'left', buttons: 1 })
      await sleep(25)
    }
  }
  const release = async (point, dx) => {
    await cdp.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: Math.round(point.x + dx),
      y: point.y,
      button: 'left',
      clickCount: 1,
    })
    await sleep(350)
  }
  const clickSelector = async (selector) => {
    const box = await boxOf(selector)
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 })
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 })
    await sleep(250)
  }

  let failures = 0
  const check = (name, condition, detail) => {
    console.log(`[live] ${condition ? 'PASS' : 'FAIL'}  ${name}${detail === undefined ? '' : `  — ${detail}`}`)
    if (!condition) failures += 1
  }
  const lastOf = (list) => (list.length === 0 ? undefined : list[list.length - 1])
  /** EVERY DRAG RE-QUERIES THE HANDLE: a commit (or a control) MOVES it, so a cached box would press the pane beside it. */
  const handleBoxNow = async () => await boxOf('[data-gutter-handle]')

  try {
    // ── 0. THE PAGE BOOTED THE DEMO AND NOTHING ELSE ────────────────────────────────────────────────────────────────
    const heading = await evaluate(cdp, `document.querySelector('h1')?.textContent ?? ''`)
    check(
      'boot: the demo page stands (the app boot guard is neutralised, so #app is the demo and not the app)',
      heading.includes('Pane-drag demo') && (await evaluate(cdp, `document.querySelectorAll('#app').length`)) === 1,
      `heading=${JSON.stringify(heading).slice(0, 60)}`,
    )
    const before = await read()
    check('boot: no page exception was raised', cdp.pageExceptions.length === 0, `exceptions=${String(cdp.pageExceptions.length)}`)
    check(
      "boot: the stub answers pane-a from its RECORD at the measured defaults",
      before.geometry['pane-a'].source === 'record' &&
        before.geometry['pane-a'].pane.size === 100 &&
        before.geometry['pane-a'].pane.bounds.min === 0 &&
        before.geometry['pane-a'].pane.bounds.max === 200,
      JSON.stringify(before.geometry['pane-a']),
    )
    check(
      "boot: a pane the family does NOT name answers the measured default (the derivation's own arm)",
      before.geometry['pane-unknown'].source === 'default' &&
        before.geometry['pane-unknown'].pane.size === 100 &&
        before.geometry['pane-unknown'].pane.bounds.max === 200,
      JSON.stringify(before.geometry['pane-unknown']),
    )
    check(
      "boot: the zone family is the empty family and its read is null (D-91's measured missing arm)",
      before.zone === null,
      `zone=${JSON.stringify(before.zone)}`,
    )
    check(
      'boot: the DECOY attributes the pre-D-117 wiring read are present and are not the shape',
      before.decoy.size === '999' && before.decoy.min === '0' && before.decoy.max === '999',
      `decoy=${JSON.stringify(before.decoy)}`,
    )
    check(
      'boot: the affordance attached and the controller has the handle installed',
      before.controller.attached === 1 && before.session.installed === 1 && before.drag.attachRefusals === 0,
      `controller.attached=${String(before.controller.attached)} session.installed=${String(before.session.installed)}`,
    )

    // ── 1. THE HOVER — the affordance's cursor declarations, driven by real pointer moves ───────────────────────────
    const handleBox = await boxOf('[data-gutter-handle]')
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: handleBox.x, y: handleBox.y })
    await sleep(200)
    const hovered = await read()
    check(
      'hover: a real pointerover writes the cursor declaration the caller seam resolves',
      hovered.handle.cursor === 'col-resize' && hovered.affordance.cursorWrites >= 1 && hovered.affordance.lastCursor === 'col-resize',
      `cursor=${JSON.stringify(hovered.handle.cursor)} writes=${String(hovered.affordance.cursorWrites)}`,
    )
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: handleBox.x + 320, y: handleBox.y + 40 })
    await sleep(200)
    const unhovered = await read()
    check(
      'hover: a real pointerout CLEARS it and counts the clear',
      unhovered.handle.cursor === '' && unhovered.affordance.cursorClears >= 1,
      `cursor=${JSON.stringify(unhovered.handle.cursor)} clears=${String(unhovered.affordance.cursorClears)}`,
    )

    // ── 2. DRAG #1 — the start is the SHAPE's 100, the commit goes through release ─────────────────────────────────
    const first = await handleBoxNow()
    await press(first)
    await moveBy(first, 40)
    const mid = await read()
    check(
      'drag 1: the pre-drag size read at establishment is the SHAPE’s 100, not the element’s decoy 999',
      lastOf(mid.probe.starts) === 100,
      `start=${JSON.stringify(lastOf(mid.probe.starts))} decoy=${JSON.stringify(mid.decoy.size)}`,
    )
    check(
      'drag 1: the bounds pair read at establishment is the SHAPE’s {0,200}',
      JSON.stringify(lastOf(mid.probe.boundsReads)) === JSON.stringify({ min: 0, max: 200 }),
      `bounds=${JSON.stringify(lastOf(mid.probe.boundsReads))}`,
    )
    check(
      'drag 1: the preview moved with the pointer (100 + 40)',
      mid.drag.preview !== null && mid.drag.preview.value === 140 && mid.drag.previews > 0,
      `preview=${JSON.stringify(mid.drag.preview)} previews=${String(mid.drag.previews)}`,
    )
    check(
      'drag 1: the target element was painted from the preview (the declared transient write)',
      mid.target.width === '140px',
      `target.width=${JSON.stringify(mid.target.width)}`,
    )
    await release(first, 40)
    const afterOne = await read()
    check(
      'drag 1: the release wrote ONCE through the demo’s status node (the sink)',
      afterOne.drag.sinkWrites.length === 1 && afterOne.drag.sinkWrites[0] === 140 && afterOne.controller.sinkCalls === 1,
      `sinkWrites=${JSON.stringify(afterOne.drag.sinkWrites)} sinkCalls=${String(afterOne.controller.sinkCalls)}`,
    )
    check(
      "drag 1: the release sent ONE commitPane('pane-a', {size}) through the composition's route",
      afterOne.stub.writes.length === 1 &&
        afterOne.stub.writes[0].id === 'pane-a' &&
        JSON.stringify(afterOne.stub.writes[0].geometry) === JSON.stringify({ size: 140 }),
      JSON.stringify(afterOne.stub.writes),
    )
    check(
      'drag 1: the shape now holds the committed size (the next read answers it)',
      afterOne.geometry['pane-a'].pane.size === 140 && afterOne.geometry['pane-a'].source === 'record',
      JSON.stringify(afterOne.geometry['pane-a']),
    )
    check(
      'drag 1: exactly one gesture and one session commit were recorded',
      afterOne.session.gestures === 1 && afterOne.session.commits === 1,
      `gestures=${String(afterOne.session.gestures)} commits=${String(afterOne.session.commits)}`,
    )

    // ── 3. THE CONTROL — the stub's geometry moves, and the next drag starts from the NEW value ─────────────────────
    await clickSelector('#ctl-size-inc')
    const afterControl = await read()
    check(
      'control: the panel changed the stub to 180 and the page repainted from the record',
      afterControl.geometry['pane-a'].pane.size === 180 && afterControl.target.width === '180px',
      `stub=${String(afterControl.geometry['pane-a'].pane.size)} target.width=${JSON.stringify(afterControl.target.width)}`,
    )
    const secondBox = await handleBoxNow()
    await press(secondBox)
    await moveBy(secondBox, 15)
    const second = await read()
    check(
      'control: THE NEXT DRAG READ ITS START FROM THE NEW VALUE — 180, not the old 140 and not the decoy',
      lastOf(second.probe.starts) === 180,
      `start=${JSON.stringify(lastOf(second.probe.starts))} previous start was 100`,
    )
    check(
      'control: its preview is start + 15 (195), so the whole arithmetic follows the shape',
      second.drag.preview !== null && second.drag.preview.value === 195,
      `preview=${JSON.stringify(second.drag.preview)}`,
    )
    await release(secondBox, 15)
    const afterTwo = await read()
    check(
      'control: the second release committed 195 (one more sink write, one more route call)',
      afterTwo.drag.sinkWrites.length === 2 &&
        afterTwo.drag.sinkWrites[1] === 195 &&
        afterTwo.stub.writes.length === 2 &&
        afterTwo.geometry['pane-a'].pane.size === 195,
      `sinkWrites=${JSON.stringify(afterTwo.drag.sinkWrites)} writes=${afterTwo.stub.writes.length}`,
    )

    // ── 4. THE BOUNDS PAIR — the shape's pair is what CLAMPS the preview and the commit ─────────────────────────────
    await clickSelector('#ctl-bounds-tight')
    const narrowed = await read()
    check(
      'bounds: the control tightened the pair to {20,180} on the record',
      narrowed.geometry['pane-a'].pane.bounds.min === 20 && narrowed.geometry['pane-a'].pane.bounds.max === 180,
      JSON.stringify(narrowed.geometry['pane-a'].pane.bounds),
    )
    const thirdBox = await handleBoxNow()
    await press(thirdBox)
    await moveBy(thirdBox, 40)
    const clamped = await read()
    check(
      'bounds: the start read IS the record’s 195 and the preview is CLAMPED to the pair’s max (180)',
      lastOf(clamped.probe.starts) === 195 && clamped.drag.preview !== null && clamped.drag.preview.value === 180,
      `start=${JSON.stringify(lastOf(clamped.probe.starts))} preview=${JSON.stringify(clamped.drag.preview)}`,
    )
    await release(thirdBox, 40)
    const afterThree = await read()
    check(
      'bounds: the release committed the CLAMPED value, not the pointer’s 235',
      afterThree.drag.sinkWrites[2] === 180 && afterThree.geometry['pane-a'].pane.size === 180,
      `sink=${JSON.stringify(afterThree.drag.sinkWrites[2])} stub=${String(afterThree.geometry['pane-a'].pane.size)}`,
    )

    // ── 5. THE RESET — back to the measured defaults, and a fourth drag reads THEM ──────────────────────────────────
    await clickSelector('#ctl-reset')
    const reset = await read()
    check(
      'reset: the panel restored the measured defaults 100 / {0,200}',
      reset.geometry['pane-a'].pane.size === 100 &&
        reset.geometry['pane-a'].pane.bounds.min === 0 &&
        reset.geometry['pane-a'].pane.bounds.max === 200,
      JSON.stringify(reset.geometry['pane-a'].pane),
    )
    const handleAfter = await handleBoxNow()
    await press(handleAfter)
    await moveBy(handleAfter, 0, 3)
    const fourth = await read()
    check(
      'reset: a fourth drag starts from the restored 100 (the shape’s authority, round trip)',
      lastOf(fourth.probe.starts) === 100,
      `start=${JSON.stringify(lastOf(fourth.probe.starts))}`,
    )
    await release(handleAfter, 0)
    const final = await read()
    check(
      'reset: four gestures, four sink writes, four route calls, and not one refused attach',
      final.session.gestures === 4 &&
        final.controller.sinkCalls === 4 &&
        final.session.commits === 4 &&
        final.stub.writes.length === 4 &&
        final.drag.attachRefusals === 0,
      `gestures=${String(final.session.gestures)} sinkCalls=${String(final.controller.sinkCalls)} writes=${String(final.stub.writes.length)}`,
    )
    check(
      'counters: no reset and no drop arm ran on this path (they are the invalid-move and secondary-press paths)',
      final.affordance.resets === 0 && final.affordance.drops === 0,
      `resets=${String(final.affordance.resets)} drops=${String(final.affordance.drops)}`,
    )
    check('the window raised no page exception across the whole drive', cdp.pageExceptions.length === 0, `exceptions=${String(cdp.pageExceptions.length)}`)

    console.log('')
    console.log(
      `[live] THE DRAG'S START SIZE: before the stub's control ${String(afterOne.probe.starts[0])} → after it ${String(lastOf(second.probe.starts))}; ` +
        `clamped commit ${String(afterThree.drag.sinkWrites[2])}; back to ${String(lastOf(fourth.probe.starts))} after the reset.`,
    )
  } finally {
    await reap()
  }

  if (failures === 0) {
    console.log('[live] PANE-DRAG DEMO LIVE TEST: ALL GREEN')
    process.exit(0)
  }
  console.log(`[live] PANE-DRAG DEMO LIVE TEST: ${String(failures)} FAILED`)
  process.exit(1)
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(`evaluate threw: ${JSON.stringify(result.exceptionDetails).slice(0, 300)}`)
  return result.result?.value
}

main().catch((error) => {
  console.error('[live] fatal:', error.message)
  process.exit(2)
})
