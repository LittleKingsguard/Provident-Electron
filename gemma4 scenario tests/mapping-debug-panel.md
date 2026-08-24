# Mapping — Debug Panel (Unit: Debug Panel)

- **Panel Logic**:
  - `src/renderer/debug-panel.ts:13` (`initDebugPanel`): Reads `#status` from the DOM and returns a `refresh` function.
  - `src/renderer/debug-panel.ts:18` (`refresh`): Reads `runtime.renderedHtmlResult()` and writes formatted census + SSR preview to the DOM.
  - `src/renderer/debug-panel.ts:22` (`c` helper): Coerces non-number census fields to '?' to prevent `NaN`/`undefined` display.
  - `src/renderer/debug-panel.ts:28` (`raw` coercion): Ensures `ssrHtml` is a string before processing.

- **Wiring**:
  - `src/renderer/renderer.ts:80` (`main`): Initializes the debug panel.
  - `src/renderer/renderer.ts:89` (`handleRequest` callback): Triggers `refreshDebug()` after every MCP reply.
