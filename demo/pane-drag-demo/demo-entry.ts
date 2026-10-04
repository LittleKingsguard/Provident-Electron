// The demo entry — mounts the demo into the page and exposes a driver read hook.
import { buildDemo } from './demo.ts'

const root = document.getElementById('app')
if (!root) throw new Error('no #app root')

const demo = buildDemo()
demo.mount(root)

// The live driver's read hook (window.__pgdemo). It reads the STORE + DOM only —
// never a privileged surface; the demo exposes nothing.
const evCounts = { down: 0, move: 0, up: 0, ctx: 0 }
window.addEventListener('pointerdown', (e) => { evCounts.down += 1; window.__lastDown = { target: (e.target as HTMLElement)?.className ?? e.target?.toString?.() ?? '', handle: !!((e.target as HTMLElement)?.closest?.('.pane-handle')) } })
window.addEventListener('pointermove', () => { evCounts.move += 1 })
window.addEventListener('pointerup', () => { evCounts.up += 1 })
window.addEventListener('contextmenu', (e) => { evCounts.ctx += 1 })
;(window as unknown as Record<string, unknown>).__pgdemo = {
  store: demo.store,
  drag: demo.drag,
  tabs: demo.tabs,
  read: demo.read,
  evCounts: () => ({ ...evCounts }),
  storeSummary: () => {
    // a few store-carried values the driver asserts live
    return {
      paneASize: demo.read.paneSize('pane-a'),
      zone3Size: demo.read.zoneSize('zone-3'),
      zone3Display: demo.read.zoneDisplay('zone-3'),
      ghost: demo.read.ghostPresent(),
      ghostOpacity: demo.read.ghostOpacity(),
      sinkCalls: demo.read.sinkCalls(),
    }
  },
}
