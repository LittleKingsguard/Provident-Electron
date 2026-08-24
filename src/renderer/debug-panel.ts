// src/renderer/debug-panel.ts — the read-only Debug / agent-visibility pane
// (docs/specs/debug-panel.md). Mirrors the MCP agent's view (census + SSR)
// into the `#status` pane after every render, so an operator watching the
// Electron window sees the live graph state. Never an MCP tool, never a
// mutation path — it reads `Runtime.renderedHtmlResult()` only.
import type { Runtime } from './runtime.js'

const PREVIEW_MAX = 120

/** Install the debug panel: read `#status` from the DOM + return a `refresh()`
 *  that writes a one-line census + a truncated SSR preview. If `#status` is
 *  absent (a real DOM where getElementById returns null), returns a no-op. */
export function initDebugPanel(runtime: Runtime): () => void {
  const el = (typeof document !== 'undefined' ? document.getElementById('status') : null) as
    | { textContent: string }
    | null
  if (!el) return () => undefined
  return (): void => {
    const { census, ssrHtml } = runtime.renderedHtmlResult()
    // F1 — coerce a non-number census field to '?' (a contract drift never
    // prints `undefined`/`NaN` to the operator's view).
    const c = (v: unknown): string | number => (typeof v === 'number' && Number.isFinite(v) ? v : '?')
    const censusLine =
      `inTree ${c(census.inTree)} · registered ${c(census.registered)} · ` +
      `unplaced ${c(census.unplaced)} · destroyed ${c(census.destroyed)} · prototypes ${c(census.prototypes)}`
    // F2 — coerce a non-string ssrHtml (number/object/null) to '' before the
    // string methods; never a TypeError from a contract drift.
    const raw = typeof ssrHtml === 'string' ? ssrHtml : ''
    const collapsed = raw.replace(/\s+/g, ' ').trim()
    const preview = collapsed.length === 0
      ? '(empty)'
      : collapsed.length > PREVIEW_MAX
        ? collapsed.slice(0, PREVIEW_MAX) + '…'
        : collapsed
    el.textContent = `${censusLine}\n${preview}`
  }
}