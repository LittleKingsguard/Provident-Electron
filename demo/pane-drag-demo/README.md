# Pane-Drag Live Demo (store-backed) — **ITS SOURCE IS GONE AND `demo.mjs` IS THE ARTEFACT** (`D-94`)

Live Electron test of the store-integrated panes — the drag into a minimized zone,
the gutter resize lifecycle, the minimized-zone clauses, the tab pane and the full
tab strip (focus / open / close). **The suite's current total: PANE-DRAG + GUTTER +
MINIMIZED-ZONE + TAB-BEHAVIOR + TAB-MANAGEMENT LIVE TESTS: ALL GREEN 50/50.** The
sections below record each block's layered result as it landed (25 → 31 → 41 → 50).
It is the reference for the fork's H-r6 pass (the fork's own bytes are NOT migrated
yet).

**WHAT THIS DIRECTORY IS AS OF 2026-11-03, STATED BEFORE THE HISTORY SO NOTHING BELOW
IS MISTAKEN FOR A LIVE CLAIM.** `demo.ts` and `demo-entry.ts` were the source this
bundle was built from, and **both are DELETED** (`D-94`): `demo.ts` imported
`src/renderer/store-core-graph.ts` — the app's frozen graph store, deleted at `D-93` —
and constructed it (`createGraphStore`), minted the layout into its `mem` tier, read it
back through `store.tiers.mem.get(…)` and committed through it, so no line of it could
compile against this tree. **`demo.mjs` is a self-contained esbuild bundle** (it carries
`store-graph-references.ts` and `store-core-graph.ts` INLINED, 13,217 lines, zero
`import`/`require` statements) and it still runs, so it is kept and it carries the demo.
**It demonstrates a mechanism this tree no longer has**, and no file here regenerates
it: a reader wanting a live instrument for the app's current panes, tabs or crossings
wants `npm run panes` / `npm run crossings`, not this directory. The measurement that
decided the deletion, and the four legs that read 0 on the other side of it, are `D-94`'s.

## Files
- `index.html` — the demo page (three zones; zone-3 starts MINIMIZED; panes with
  `.pane-handle` drag handles; a ghost lower-opacity `.pane-frame.ghost`).
- `demo.mjs` — **THE DEMO ITSELF**: the checked-in bundle (see the paragraph above) that
  the page loads. Its source, `demo.ts` + `demo-entry.ts`, is deleted; nothing rebuilds it.
- `electron-main.cjs` — the disposable Electron window (contextIsolation, sandbox).
- `run-live.mjs` — the CDP live driver: real `Input.dispatchMouseEvent` drags from
  the SPECIFIC HANDLE into the MINIMIZED zone-3, asserting the ghost at reduced
  opacity during the drag, the single-sink commit, and the right-click abandon
  (temp removed, the file original reasserts). Dependency-free (Node WebSocket).

## Run
```
node demo/pane-drag-demo/run-live.mjs
```
(Add `--cdp-port=<n>` to change the port. Electron flags `--no-sandbox
--disable-dev-shm-usage` are applied because the sandbox lacks /dev/shm. **No `esbuild`
step and no leg builds this directory**; the bundle is what runs.)

## Live result (2026-10-03)
**PANE-DRAG + GUTTER LIVE TESTS: ALL GREEN (21/21 PASS, exit 0).**

PANE-DRAG (13 rows): the exact requested scenario — drag by the specific handle
into a zone minimized at the drag's start, a ghost lower-opacity instance in the
target zone, fully displayed on release and commit. Plus handle-gating, the
single-sink channel (sinkCalls === 1), the zone-size minimum, the re-homed
handle re-query, and the right-click abandon (ghost erased, the persistent
original reasserted).

GUTTER RESIZE (8 rows): the exact requested lifecycle —
- per-move updates at the TEMP tier during the drag (`temp` rises from the file
  baseline while `file` stays untouched);
- right-click RESETS: the temp is erased and the FILE original reasserts (the
  four-tier abandon: `remove('temp.drag.<gid>.placement')`, never a file removal);
- release COMMITS to FILE (the committed size === the final preview; ONE file
  commit per gesture end — the single-sink channel) and the temp is parked
  (empty after the release — the file holds the truth).
Since the first run:
drag by the specific handle → a DIFFERENT zone (minimized at the drag's start) →
a GHOST lower-opacity pane instance in the target zone → fully displayed on
release and commit. Plus the handle-gating (a body drag does not start), the
single-sink channel (sinkCalls === 1), the zone-size minimum respected, and the
right-click abandon path (ghost erased, persistent original reasserted).

## Live result — the MINIMIZED-ZONE clauses (2026-10-03)
PANE-DRAG + GUTTER + MINIMIZED-ZONE LIVE TESTS: ALL GREEN (31/31 PASS, exit 0).
The three clauses, verified in the real Electron app:
1. **An EMPTY minimized zone is hidden entirely** — its stack `display:none`, the
   section collapsed — with a **visible expand button** that restores it.
2. **A minimized zone WITH panes retains a TAB-STRIP list** of its panes (no frames;
   the tabs are also PANE-DRAG SOURCES, so a user can drag a contained pane out).
3. **A pane drag reads the STORE'S EXPANDED SIZE** (`mem.layout.zone.<id>.size` —
   `canPlace = size >= MIN_ZONE_SIZE`; the live trace records `expandedSize` in the
   placement) to decide whether to place into the zone, and **temporarily expands the
   minimized target to display the ghost** (restored on release/abandon — never a
   file write).

## Live result — the TAB-BEHAVIOR clauses (2026-10-03)
PANE-DRAG + GUTTER + MINIMIZED-ZONE + TAB-BEHAVIOR LIVE TESTS: ALL GREEN (41/41 PASS, exit 0).
The tab-pane clauses, verified in the real Electron app:
- a consumer pane READS the active tab's data, DISPLAYS it, and MODIFIES it (a store
  commit — the constraint evaluates post-state), all through the REAL store;
- a STORE LISTENER re-renders the pane when the active tab OR its contained data changes
  (both the user-driven change and the REPAIR-driven active change);
- the count-exactly-one constraint on the tabs root (the CR6 worked example verbatim):
  arm (a) a second active write de-activates the surplus keeping the most-recently-active
  (repairs=1), arm (b) none active re-activates the most-recent per tab-local lastActive
  (repairs=4), arm (c) an empty set opens the landingPage (repairs=7) — each repair's
  active change propagated to the listening pane.

## Live result — the TAB-MANAGEMENT clauses (2026-10-03)
PANE-DRAG + GUTTER + MINIMIZED-ZONE + TAB-BEHAVIOR + TAB-MANAGEMENT LIVE TESTS: ALL GREEN (50/50 PASS, exit 0).
The tab-strip management clauses, verified in the real Electron app:
- **FOCUS between tabs**: clicking an existing tab bumps its lastActive to max+1, so
  the exactly-one surplus repair KEEPS the clicked tab (focus wins by recency);
- **OPEN a new tab** (the persistent `+ new` control): a new active leaf at max+1 opens
  FOCUSED, the bar shows it, exactly one stays active;
- **CLOSE existing tabs** (the per-tab `×`): the leaf leaves the store + the bar;
  closing the ACTIVE tab makes the repair arm (b) reactivate the most-recent survivor;
  closing ALL makes arm (c) open the landing page via the UI path.
The bar renders dynamically from the registry with per-tab close buttons; the pane's
subscription is a SUBTREE listener on `mem.tabs` (open/close/repair re-render). The
session's registry-vs-synchronous-store-event races (closeTab/openNewTab ordering) are
D-19/T-16 in the retrospective.

## Consumer contract + hardening record
- **Wire shapes every consumer must observe** (the tenant roots declared: `layout`/`settings`/`drag`; the bounds as `{ min, max }`; the temp/file lifecycle spellings): `docs/FORKER.md` §4's STORE-BACKED DRAG + GUTTER FEATURES block.
- **The build/debug difficulties + the automated tests that were missing** (D-1..D-13, T-1..T-10): `docs/specs/live-demo-retrospective.md`.
- **Live driver preflights** (T-6/T-8): the driver kills stale demo windows on the port before launching and could fail fast if the CDP endpoint doesn't resolve.

Layer honesty (RCA-12): this is the CHECKOUT's own demo window — APP-level code
(the store + composition were already envelope/integration-green; this exercises
the ASSEMBLED rendered app + REAL CDP pointer input). It is NOT the fork's app;
the fork's own consumption remains its H-r6 pass.
