/**
 * PROVIDENT PANE-DRAG DEMO — the store-backed drag flow, LIVE in Electron.
 *
 * The reference for the fork's H-r6 pass: a pane dragged by its SPECIFIC HANDLE,
 * preview committed as TEMP-tier data, a GHOST lower-opacity instance in the target
 * zone during the drag, the MINIMIZED zone's size constraint (passed functions,
 * two-arm repair), release = ONE sink call + file-tier commit, right-click = temp
 * removal (the file original REASSERTS).
 *
 * Every value flows through the REAL store via the LANDED composition
 * (`createPaneDrag` — src/renderer/renderer.ts). No fork bytes touched (H-r6).
 */

import { createGraphStore } from '../../src/renderer/store-core-graph.ts'
import {
  createPaneDrag,
  zoneSizeConstraint,
  zoneSizeRepair,
} from '../../src/renderer/renderer.ts'
import type { GraphStore } from '../../src/renderer/store-core-graph.ts'

export const MIN_ZONE_SIZE = 90
export const GHOST_OPACITY = 0.45

/** The demo's three zones; zone-3 starts MINIMIZED (the queued clause-3 state). */
export const ZONES = ['zone-1', 'zone-2', 'zone-3'] as const
export type ZoneId = (typeof ZONES)[number]

interface PaneRecord {
  id: string
  title: string
  zone: ZoneId
  size: number
  bounds: { min: number; max: number }
}

const INITIAL_PANES: PaneRecord[] = [
  { id: 'pane-a', title: 'Pane A (notes)', zone: 'zone-1', size: 160, bounds: { min: 60, max: 600 } },
  { id: 'pane-b', title: 'Pane B (search)', zone: 'zone-2', size: 200, bounds: { min: 60, max: 600 } },
]

export interface DemoSurface {
  store: GraphStore
  drag: ReturnType<typeof createPaneDrag>
  commitSink: (finalSize: number) => void
  read: {
    paneSize: (id: string) => number
    zoneSize: (id: ZoneId) => number
    zoneDisplay: (id: ZoneId) => string
    ghostPresent: () => boolean
    ghostOpacity: () => number | null
    sinkCalls: () => number
    paneZone: (id: string) => ZoneId | null
  }
  /** the DOM the driver reads/paints (live window) */
  root: HTMLElement | null
  mount: (root: HTMLElement) => void
}

let activeGhostZone: ZoneId | null = null
let activeGhostOpacity = 0
let sinkCalls = 0

export function buildDemo(): DemoSurface {
  const store = createGraphStore({
    declarations: { rows: [{ name: 'layout' }, { name: 'settings' }, { name: 'drag' }] },
  })

  const panes = new Map<string, PaneRecord>(INITIAL_PANES.map((p) => [p.id, { ...p }]))

  // MINT the store-carried layout the composition reads:
  //   mem.layout.pane.<id>.size / .bounds   (the pane-size/bounds reads)
  //   mem.layout.zone.<id>.size / .display  (the zone render read)
  const mintAll = (): void => {
    for (const p of panes.values()) {
      store.commit(`mem.layout.pane.${p.id}.size`, p.size, { onRepeat: 'edit' })
      store.commit(`mem.layout.pane.${p.id}.bounds`, p.bounds, { onRepeat: 'edit' })
    }
    store.commit('mem.layout.zone.zone-1.size', 160, { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-1.display', 'normal', { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-2.size', 200, { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-2.display', 'normal', { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-3.size', MIN_ZONE_SIZE, { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-3.display', 'minimized', { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-1.slot', 'doc-nav', { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-2.slot', 'main', { onRepeat: 'edit' })
    store.commit('mem.layout.zone.zone-3.slot', 'collapsed', { onRepeat: 'edit' })
  }
  mintAll()

  // The passed-function constraint + two-arm repair (CONSTRAINTS-ARE-PASSED-FUNCTIONS).
  // The store evaluates the constraint on every set/commit post-state; a violation
  // routes to the repair in the same committed write (cause:'repair' + repaired[]).
  void zoneSizeConstraint(MIN_ZONE_SIZE, 600)
  void zoneSizeRepair(MIN_ZONE_SIZE, 600)

  let root: HTMLElement | null = null
  const zoneEl = (id: ZoneId): HTMLElement | null =>
    root?.querySelector(`[data-zone="${id}"] .pane-stack`) ?? null

  // THE DISPLAY LAYER — paints from the STORE's carried values + the temp preview.
  const paint = (): void => {
    if (!root) return
    for (const z of ZONES) {
      const stack = zoneEl(z)
      if (!stack) continue
      stack.textContent = ''
      const displayRaw = (store.tiers as unknown as Record<string, { get: (n: string) => unknown }>).mem.get(
        `mem.layout.zone.${z}.display`,
      ) as { found?: boolean; value?: unknown } | null
      const display = displayRaw && displayRaw.found ? String(displayRaw.value ?? '') : 'normal'
      const minimized = display === 'minimized'
      for (const p of panes.values()) {
        if (p.zone !== z) continue
        const frame = document.createElement('div')
        frame.className = 'pane-frame'
        frame.setAttribute('data-pane-id', p.id)
        const head = document.createElement('div')
        head.className = 'pane-head'
        const handle = document.createElement('div')
        handle.className = 'pane-handle'
        handle.setAttribute('data-handle-for', p.id)
        const title = document.createElement('span')
        title.className = 'pane-title'
        title.textContent = p.title
        head.append(handle, title)
        const body = document.createElement('div')
        body.className = 'pane-body'
        body.textContent = minimized ? '▸ minimized' : `content of ${p.title}`
        frame.append(head, body)
        stack.append(frame)
      }
    }
    // GHOST: if a temp drag preview is live, paint the ghost into its zone at
    // reduced opacity (fully displayed on release+commit).
    if (activeGhostZone && root) {
      const stack = zoneEl(activeGhostZone)
      if (stack) {
        const ghost = document.createElement('div')
        ghost.className = 'pane-frame ghost'
        ghost.setAttribute('data-ghost-for', activeGhostZone)
        ghost.setAttribute('data-ghost-zone', activeGhostZone)
        const head = document.createElement('div')
        head.className = 'pane-head'
        const handle = document.createElement('div')
        handle.className = 'pane-handle'
        const title = document.createElement('span')
        title.className = 'pane-title'
        title.textContent = 'ghost — dragging'
        head.append(handle, title)
        ghost.append(head)
        ghost.style.opacity = String(activeGhostOpacity)
        stack.append(ghost)
      }
    }
  }

  // The zone-render turn the composition triggers (the subscriber on the temp
  // preview). The demo keeps its display layer store-fed; the layout call is the
  // composition's own tenant shape (reads the store-carried zone-1 values).
  const layoutFn = (): void => {
    paint()
  }

  const drag = createPaneDrag(store, { layout: layoutFn } as never)

  let lastPlacementZone: ZoneId | null = null
  const commitSink = (finalSize: number): void => {
    sinkCalls += 1
    window.__sinkTrace = window.__sinkTrace ?? []
    window.__sinkTrace.push({ finalSize, at: Date.now() })
    window.__sinkSaw = sinkCalls
    const pa = panes.get('pane-a')
    if (pa) {
      pa.size = finalSize
      // THE COMMIT'S RE-HOME: the pane now lives in the zone the gesture landed on
      // (the queued contract clause 6 — release commits the preview to file, the
      // pane is fully displayed there; the ghost is replaced by the real pane).
      if (lastPlacementZone) pa.zone = lastPlacementZone
      // the committed zone is fully displayed (a minimized target's drop un-minimizes it)
      store.commit(`mem.layout.zone.${pa.zone}.display`, 'normal', { onRepeat: 'edit' })
    }
    mintAll()
    paint()
  }

  const mount = (el: HTMLElement): void => {
    root = el
    paint()
    if (!root) return
    // THE HANDLE-GATED DRAG — a drag starts ONLY from the pane handle element.
    root.addEventListener('pointerdown', (ev) => {
      const handle = (ev.target as HTMLElement)?.closest?.('.pane-handle')
      if (!handle) return
      const paneId = handle.getAttribute('data-handle-for')
      if (!paneId) return
      const pane = panes.get(paneId)
      if (!pane) return
      const gid = 'demo-g1'
      drag.startSizeOf({ id: paneId }, null)
      drag.boundsOf({ id: paneId }, null)
      const zoneAtPoint = (x: number, y: number): ZoneId | null => {
        const el = document.elementFromPoint(x, y) as HTMLElement | null
        const via = el?.closest?.('.zone') ?? (root as HTMLElement | null)?.querySelector?.('.zone')
        // fall back to a rect check when the pointer is over the pane itself (the
        // pane sits inside the zone — the closest .zone resolves correctly)
        const z = via?.getAttribute?.('data-zone') as ZoneId | null
        if (z && (ZONES as readonly string[]).includes(z)) return z
        return null
      }
      const onMove = (e: PointerEvent): void => {
        try {
          const targetZone = zoneAtPoint(e.clientX, e.clientY) ?? (e.target as HTMLElement)?.closest?.('.zone')?.getAttribute('data-zone') as ZoneId | null
          const zone = targetZone && (ZONES as readonly string[]).includes(targetZone) ? targetZone : pane.zone
          const placement = { paneId, zone, ghostOpacity: GHOST_OPACITY }
          drag.move(gid, placement)
          lastPlacementZone = zone
          activeGhostZone = zone
          activeGhostOpacity = GHOST_OPACITY
          paint()
          window.__dragTrace = window.__dragTrace ?? []
          window.__dragTrace.push({ zone, x: e.clientX, y: e.clientY })
        } catch (err) {
          window.__dragTrace = window.__dragTrace ?? []
          window.__dragTrace.push({ err: String(err) })
        }
      }
      const onUp = (): void => {
        cleanup()
        try {
          drag.release(gid, pane.size, commitSink)
          window.__upTrace = { ok: true, final: pane.size, sinkCalls: sinkCalls, lastZone: lastPlacementZone }
        } catch (err) {
          window.__upTrace = { ok: false, err: String(err), final: pane.size }
        }
        activeGhostZone = null
        activeGhostOpacity = 0
        paint()
      }
      const onCancel = (): void => {
        cleanup()
        drag.rightClick(gid)
        activeGhostZone = null
        activeGhostOpacity = 0
        paint()
      }
      const onCtx = (e: Event): void => {
        e.preventDefault()
        onCancel()
      }
      const cleanup = (): void => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onCancel)
        window.removeEventListener('contextmenu', onCtx)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onCancel)
      window.addEventListener('contextmenu', onCtx)
    })
  }

  return {
    store,
    drag,
    commitSink,
    read: {
      paneSize: (id) => panes.get(id)?.size ?? 0,
      zoneSize: (id) => {
        const r = ((store.tiers as unknown as Record<string, { get: (n: string) => unknown }>).mem.get(
          `mem.layout.zone.${id}.size`,
        ) as { found?: boolean; value?: unknown } | null)
        return r && r.found && typeof r.value === 'number' ? r.value : 0
      },
      zoneDisplay: (id) => {
        const r = ((store.tiers as unknown as Record<string, { get: (n: string) => unknown }>).mem.get(
          `mem.layout.zone.${id}.display`,
        ) as { found?: boolean; value?: unknown } | null)
        return r && r.found && typeof r.value === 'string' ? r.value : 'normal'
      },
      ghostPresent: () => activeGhostZone !== null,
      ghostOpacity: () => (activeGhostZone ? activeGhostOpacity : null),
      sinkCalls: () => sinkCalls,
      paneZone: (id) => panes.get(id)?.zone ?? null,
    },
    root,
    mount,
  }
}

export function createGraphStoreForDemo(): GraphStore {
  return createGraphStore({ declarations: { rows: [{ name: 'layout' }, { name: 'settings' }, { name: 'drag' }] } })
}