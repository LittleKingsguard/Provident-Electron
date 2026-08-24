# Summary — Renderer Debug Panel (#3)

## Expected Behavior
A read-only renderer-side panel that mirrors the current graph status (census and SSR preview) into the `#status` DOM element.

## Inputs & Outputs
- `initDebugPanel(runtime)`: Input: `Runtime` instance. Output: `refresh()` function.
- `refresh()`: Reads `runtime.renderedHtmlResult()` and writes a formatted string to `#status`.
    - Census line: `inTree <n> · registered <n> · unplaced <n> · destroyed <n> · prototypes <n>`
    - SSR preview: First ~120 chars of `ssrHtml`, collapsed to one line.

## Error Conditions
- `#status` element missing: `initDebugPanel` returns a no-op function (no throw).
- Non-number census fields: Coerced to `?`.
- Non-string `ssrHtml`: Coerced to `(empty)`.
