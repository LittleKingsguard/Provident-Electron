# Pane-Drag Live Demo (store-backed)

Live Electron test of the store-integrated pane-drag flow — the reference for the
fork's H-r6 pass (the fork's own bytes are NOT migrated yet).

## Files
- `index.html` — the demo page (three zones; zone-3 starts MINIMIZED; panes with
  `.pane-handle` drag handles; a ghost lower-opacity `.pane-frame.ghost`).
- `demo.ts` — the wired store (`createGraphStore`) + the LANDED composition
  (`createPaneDrag` + `zoneSizeConstraint`/`zoneSizeRepair`) + the display layer
  (reads the store's carried values; the commit re-homes the pane + un-minimizes
  the target zone).
- `demo-entry.ts` — mounts the demo, exposes `window.__pgdemo` (driver read hook).
- `electron-main.cjs` — the disposable Electron window (contextIsolation, sandbox).
- `run-live.mjs` — the CDP live driver: real `Input.dispatchMouseEvent` drags from
  the SPECIFIC HANDLE into the MINIMIZED zone-3, asserting the ghost at reduced
  opacity during the drag, the single-sink commit, and the right-click abandon
  (temp removed, the file original reasserts). Dependency-free (Node WebSocket).

## Run
```
npx esbuild demo/pane-drag-demo/demo-entry.ts --bundle --platform=browser --format=esm --outfile=demo/pane-drag-demo/demo.mjs
node demo/pane-drag-demo/run-live.mjs
```
(Add `--cdp-port=<n>` to change the port. Electron flags `--no-sandbox
--disable-dev-shm-usage` are applied because the sandbox lacks /dev/shm.)

## Live result (2026-10-03)
PANE-DRAG LIVE TEST: ALL GREEN — 13/13 across the exact requested scenario:
drag by the specific handle → a DIFFERENT zone (minimized at the drag's start) →
a GHOST lower-opacity pane instance in the target zone → fully displayed on
release and commit. Plus the handle-gating (a body drag does not start), the
single-sink channel (sinkCalls === 1), the zone-size minimum respected, and the
right-click abandon path (ghost erased, persistent original reasserted).

Layer honesty (RCA-12): this is the CHECKOUT's own demo window — APP-level code
(the store + composition were already envelope/integration-green; this exercises
the ASSEMBLED rendered app + REAL CDP pointer input). It is NOT the fork's app;
the fork's own consumption remains its H-r6 pass.
