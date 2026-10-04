# Live-Demo Retrospective — the difficulties, and the automated tests that were missing

**Status: filed 2026-10-03 · the pane-drag + gutter live-demo build (commit range
`6384a20` → `6bcda6f`).** This record does two things: (1) it enumerates, honestly,
every difficulty encountered while getting the store-integrated pane-drag/gutter to
operate in the LIVE Electron app (not the shim); (2) for each, it names the
AUTOMATED test case that was missing and would have caught it earlier — so the
findings are dispositioned as concrete red-set additions, not anecdotes. The live
results themselves (PANE-DRAG + GUTTER LIVE TESTS: ALL GREEN 25/25) are recorded in
the demo's README (`demo/pane-drag-demo/README.md`).

---

## Part 1 — the difficulties (in chronological order), each with its hidden test-case gap

### D-1. The sandbox cannot create `/dev/shm` — electron SIGTRAPs on launch
Electron crashed with `Creating shared memory in /dev/shm/... failed: Permission denied`
then `SIGTRAP` on a fresh launch. Fix: `--no-sandbox --disable-dev-shm-usage` (the
repo's own `scripts/electron-spawn.mjs` already carries these — the demo driver did not).
- **The missing test:** a LAUNCH-PRECONDITION test — spawn the repo's electron binary
  with the demo's exact flag vector once, assert the CDP target list appears and a page
  target answers `Runtime.evaluate`, else fail fast. Today NO automated test asserts the
  raw-binary launch vector; only the repo's own driver scripts know the flags, and they
  are not in the test suite.
- **Class:** STRUCTURAL-ENV (the sandbox is deployment-specific) but **the flag vector is
  testable** — a launch-probe belongs in a `scripts/`-level leg.

### D-2. Chromium flags must precede the app path
`--remote-debugging-port` placed AFTER the app entry was ignored (no CDP endpoint);
placed BEFORE it, works. The repo's `electron-ui.mjs` spawn helper has the correct
order; a fresh driver did not.
- **The missing test:** the same launch-precondition test (D-1) with the ASSERTION that
  the port resolves — a flag-order bug is caught by "can I reach `/json`?", which no
  current test asks of the raw launch.

### D-3. Stale Electron windows from prior runs / kill hygiene
Leftover Electron PIDs made CDP ports collide (a new run attached to an OLD window).
`pgrep -f electron` matched the shell's own command line — killing the shell.
- **The missing test:** an "environment preflight" that asserts NO electron of this
  profile is running before launch, or a per-run unique `--user-data-dir` +
  unique port (the fork's driver does exactly this: `mkdtempSync` home + fixed ports).
  The demo driver now uses a per-port profile dir but the preflight is ad-hoc.

### D-4. CDP protocol traps (id collision + result nesting)
An ad-hoc probe reused message id `1` for `Runtime.enable` and the later evaluate —
colliding. And `Page.captureScreenshot` returns `{ result: { data } }`, not `{ data }`.
- **The missing test:** a unit test over a tiny CDP-client helper (a monotonic id
  counter + a `result?.result?.value` extractor) — the fork's `live-drive.mjs` has this
  discipline inlined; the demo reinvented it and stumbled twice.

### D-5. The demo's owns reads did not unwrap the store's `{ found, value }` answer shape
`zoneSize`/`zoneDisplay` casts read the raw tier answer record — `display` was
`[object Object]` and the minimized-state check failed.
- **The missing test:** a CONSUMER-FACING read-contract row — "the tier handle `get`
  answers `{ found, value }`; a consumer that casts the record verbatim must see a
  type error / test failure". The store red set asserts the SHAPE; nothing asserts
  the consumer-facing convention loudly enough for a lazy demo cast.

### D-6. The composition's tenant roots must be DECLARED — else the F1 write gate silently refuses
`commit('temp.drag.demo-g1.placement', …)` hit the write-side C-TOP gate and refused
`'undeclared-name'` (the `drag` root undeclared). The composition absorbs the refusal —
so the demo saw NO throw, just a silently-dead gesture (ghost never appeared; the
store state was invisible at first). The landed wiring declares the roots; a demo
author does not know that from the surface.
- **The missing test (IMPORTANT):** a red-set row that a `createPaneDrag` gesture on a
  store WITHOUT the declared `drag` root is OBSERVABLE — the composition must either
  surface the refusal (a returned receipt/log) or the red set must prove the consumer
  can discover the undeclared-root failure. Today the absorbed refusal is a silent
  dead end — the exact class that cost the session an hour.

### D-7. The composition's `release` is hard-coded to `pane-a` and needs `{ min, max }` bounds
`release` reads `mem.layout.pane.pane-a.size` and clamps with
`readPaneBounds({}, 'pane-a')`; `clampToBounds` returns NaN unless the stored bounds
are the `{ min, max }` OBJECT — a demo minting `[60, 600]` (an array) silently made
release return before the sink (sinkCalls 0).
- **The missing test (IMPORTANT):** a WIRE-SHAPE negative row — "a consumer that mints
  the pane bounds as an ARRAY (not `{ min, max }`) gets a LOUD failure (a refused
  receipt or a documented over-strong check), never a silent no-sink". The red set
  mints `pair` as an object, so it never saw the array break.

### D-8. Hit-testing: `elementFromPoint` at the handle's center returned `zone-title`
The rendered handle had `h: 0` (a `height: 100%` grip inside an auto-height flex head
collapses), and the zone title intercepted the hit. Fixes: `align-self: stretch` +
`min-height` on the handle, `pointer-events: none` on the decorative title,
`position: relative; z-index: 1` on the pane frame.
- **The missing test:** a RENDERED-GEOMETRY row — "a control's `getBoundingClientRect`
  is non-degenerate AND `document.elementFromPoint` at its center resolves to the
  control" — exactly the class the dom-shim CANNOT see (it is deliberately
  layout-less, RCA-12). This is the single most representative live-only gap.

### D-9. `elementFromPoint`/rect-based zone resolution broke under the pane repaint
The ghost `paint()` re-renders the stack each move, temporarily removing the element
under the pointer — the zone hit failed mid-drag. Fix: a RECT fallback (a point inside
a zone's box resolves to that zone even when the stack is momentarily empty).
- **The missing test:** a row that the drag's zone decision is STABLE across the
  gesture's repaints — a property the node suite cannot drive (no layout).

### D-10. CSS grid duplicates / stale rules silently moved the target zone's rect
Editing the grid for the gutter left two competing `#zone-footer`/`#zone-main`
`grid-column` rules; the LATER (older 2-column) ones won, so zone-3's rect shrank to
the first column and the pane drag's target (500, 700) resolved to zone-1. The pane
drag's `lastZone` was wrong for the whole session with NO error.
- **The missing test:** the same rendered-geometry row (D-8) — the TEST asserts the
  TARGET ZONE's rect covers the target point; a stale-rule layout fails it loudly.

### D-11. The gutter's layout pass never ran — `querySelector('#app')` from `#app`
`applyGutterLayout` used `root.querySelector('#app')`; `root` IS `#app`, so the lookup
matched nothing and the style never changed. The gutter's store updated (temp 296) but
the zone width stayed 200 — the user-visible "size calculates but doesn't update".
- **The missing test (IMPORTANT):** a row that the gutter's display pass mutates the
  DOM (the grid template string actually changed) under a temp write — the red set
  tests the STORE side of the seam, never that the page follows.

### D-12. Driver assertion hygiene: comparing mid-drag float vs the release coordinate
The release's final is computed from the release coordinate; comparing it to the last
MOVE's preview (a mid-drag float) failed spuriously. Fix: align both to the same
integer coordinate.
- **The missing test:** a driver-hygiene rule — "the release-commit assertion reads the
  SAME coordinate the final move previewed" (a documented driver convention; unit
  testable as a pure function).

### D-13. CDP `mouseMoved` needs `buttons: 1` + settled press before moves
Rapid no-sleep `dragTo` moves were coalesced/dropped (the pane ghost didn't appear;
the gutter temp stayed null). Fix: settle ~150 ms after `mousePressed` and ~25 ms
between moves (the fork's `live-drive.mjs` gestures do this).
- **The missing test:** a driver-gesture convention row (pure-timestep generator +
  the settle constants), unit-testable.

---

## Part 2 — the missing automated test cases, consolidated by home

### A. NEW unit-testable rows the node suite can carry (RED-SET-FIX candidates)

| # | The missing row (what it asserts) | Would have caught | Home |
| --- | --- | --- | --- |
| T-1 | **A `createPaneDrag` gesture on a store WITHOUT the declared `drag` root is OBSERVABLE** — the first move answers a refusal/error event the caller can see, never a silent absorbed dead end | D-6 | `tests/pane-drag-compliance.test.ts` (a new F-row) |
| T-2 | **The pane-bounds WIRE SHAPE: a store minting `[min, max]` (an array) is a LOUD failure on release** (a documented over-strong check or a refused receipt), never a silent no-sink — while `{ min, max }` works | D-7 | `tests/pane-drag-compliance.test.ts` (a new F-row) |
| T-3 | **The tier-handle read answers `{ found, value }`**; a consumer cast that treats the record as the value (a `{ found, value }`-shaped object at a `number` position) fails | D-5 | `tests/store-core-graph.test.ts` (a register-adjacent row) or the pane-drag suite |
| T-4 | **The gutter/affordance DISPLAY turn mutates the consumer DOM under a temp write** — the "write the seam then assert the layout callback received the value and applied it" row (the caller-side seam target) | D-11 | the pane-drag compliance suite (the affordance's store-backed seam target row) |
| T-5 | **A consumer surface with an undeclared tenant root list** is returned/declared by the composition (a `tenantRoots`-style introspection or a construction-time declared check) so a demo author can see the requirement | D-6, D-7 | the composition's own red set |

### B. LIVE-only rows the node suite CANNOT carry (RCA-12's honest limit — these need the demo driver)

| # | The missing live assertion | Would have caught | Home |
| --- | --- | --- | --- |
| T-6 | **A launch-precondition leg over the raw binary**: spawn with the demo flag vector, assert CDP `/json` resolves and a `Runtime.evaluate` answers | D-1, D-2 | the demo driver (`run-live.mjs`) as its own leg block |
| T-7 | **Rendered-geometry: the drag handle's rect is non-degenerate AND `elementFromPoint` at its center is the handle** (not an overlay/title), AND the target zone's rect covers the drag endpoint | D-8, D-9, D-10 | the demo driver's pane block |
| T-8 | **A preflight: no stale electron of this profile is running** (or a unique profile+port per run) before launch | D-3 | the demo driver's preflight |
| T-9 | **A CDP client unit test** (monotonic ids + `result.result.value` extraction) over a headless WS | D-4 | a small `tests/` unit for the shared client helper |
| T-10 | **Driver-gesture convention**: settled press + `buttons:1` moves + same-coordinate release assertion (pure-timestep generator unit test) | D-12, D-13 | a `tests/` unit for the gesture helper or the driver's own rows |

### C. The architectural lesson (recorded once)

The **dom-shim is deliberately layout-less/CSS-less** (RCA-12), so EVERY geometry,
hit-test, stacking-context and rect issue of D-8/D-9/D-10/D-11 was structurally
invisible to the node suite. That is a KNOWN, RULED limit — the fix is not to make the
shim layout-ful (the rule stands) but to make the **live driver a first-class leg**
with the D-6/D-7 consumer-contract rows in the node suite and the T-6..T-10 live rows
in the demo driver, so the live layer has the same adversarial rigor the envelope has.

---

## Part 2A — the minimized-zone build's additional findings (the next session)

### D-14. A scope slip in `paint()` cost a ReferenceError cycle
Inserting the zone-morphology block with a Python string splice left it OUTSIDE the
per-zone `for` loop (the loop's closing brace was duplicated) — `ReferenceError: z is
not defined` at mount. The same class as D-10 (brace/scope drift from string splicing
a complex DOM loop).
- **The missing test (T-11):** a BUILD-CLEAN assertion on the demo bundle (esbuild
  exit 0 + a boot probe with `Runtime.exceptionThrown` captured) — a mount-time
  exception must fail the leg. The demo driver's boot block now implicitly catches it
  (the pane/window checks fail), but the preflight should assert "no page exceptions
  at boot" explicitly.

### D-15. The re-homed pane has NO box when its zone is minimized
After committing a pane into the minimized zone, its frame lives in a `display:none`
stack — `getBoundingClientRect()` is zero and `boxOf` fails. The pane is represented
by its TAB. This is CORRECT demo behavior, but the driver's second-drag re-query
assumed a boxed handle.
- **The missing test (T-12):** a driver row that the drag SOURCE in a minimized zone
  is the TAB (a `.zone-tab` is a drag source carrying the pane id) — the demo now
  makes tabs draggable; a driver asserting "I can move a pane out of its minimized
  zone by its tab" is the honest integration check.

### D-16. The minimized-zone clauses needed a state-independent driver block
The pane block's residue (pane-a in zone-3, zone minimized) plus the gutter block's
grid changes made the first minimized-zone block order-dependent (it assumed an
empty zone-3). Rewritten to normalize the state first (empty zone-3, pane-a in
zone-1, zone minimized) then drive each clause.
- **The missing test (T-13):** driver blocks NORMALIZE their preconditions before
  asserting (the driver discipline the pane block already follows); a shared
  normalize-step helper would make new blocks composable.

## Part 3 — dispositions

- **T-1, T-2, T-3, T-4, T-5 (node rows)**: `RED-SET-FIX` — land as dated additions to
  the named suites at the units' next test-bearing pass (the unit DONE rows annotate
  beside). Owner: the supervisor routes each to the owning unit.
- **T-6, T-7, T-8, T-9, T-10 (live rows)**: the demo driver (`run-live.mjs`) gains the
  T-6/T-7/T-8 blocks as its own assertions (T-7's geometry rows partially exist now —
  the hit-testable-gutter + zone-rect checks are live; T-6/T-8 preflight blocks are the
  additions); T-9/T-10 become small unit tests for the reusable helpers.
- **Not dispositioned as findings against any unit**: the demo is the fork's H-r6
  reference, not a shipped unit; every row above is a HARDENING addition, not a defect
  in a landed contract. The pane-drag compliance contract itself is correct — its
  consumer-facing ergonomics (undeclared-root observability, wire-shape loudness) are
  what the session exposed as under-tested.