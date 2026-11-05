# Pane-Drag Live Demo — **the app's own gesture, driven on a stub shape** (`D-118`)

A disposable Electron window (`electron-main.cjs`: `contextIsolation`, no preload, no main process) that loads the page in
this directory and **runs the app's own modules** on it: the gesture session, the resize controller, the gutter affordance,
and the pane-drag composition `D-117` wired the app's live drag onto. The source is `demo.ts` (+ `stub-view.ts`); the page
loads `demo.mjs`, which **`build.mjs` regenerates** from that source and the `src/` modules it imports — the bundle is a
BUILD PRODUCT with a provenance header, never a checked-in copy of anything.

## The one command that rebuilds it

```
node demo/pane-drag-demo/build.mjs
```

It bundles `demo/pane-drag-demo/demo.ts` with esbuild (already a devDependency, so **no `package.json` `scripts` key is
added** — that key set is pinned by six censuses) into `demo/pane-drag-demo/demo.mjs`, and prepends a header carrying one
`sha256` per input plus the digest of the generated body. Two read-only arms:

```
node demo/pane-drag-demo/build.mjs --check              # is demo.mjs current with its sources? (exit 0 / 1)
node demo/pane-drag-demo/build.mjs --verify <path>      # the same test against any file (the suite's control)
```

**The suite gates on it**: `tests/demo-bundle.test.ts` runs `--check`, so a source that moves without a rebuild reds `DB-1` in
`npm test`. `DB-2` proves the instrument can fail (a doctored copy of the bundle is refused). **The gate is a CONTENT HASH,
not an mtime comparison**: git writes a checkout's files in index order, so on a fresh clone `demo.ts` is newer than the
`demo.mjs` it was built from while the content is current — an mtime gate would red every clean clone. A hash answers the
question actually asked, and catches a content edit that preserved an mtime.

## What the page shows, and what each part IS

| On the page | What it is |
|---|---|
| the handle (the grey bar right of the pane) | the **affordance element** `createGutterAffordance` is attached to. No `id` (so `createPaneDrag`'s `paneIdOf` derives the pane from the AXIS TOKEN `pane-a`, the id the stub family names) and it carries no size of its own. |
| the pane (left) | the **preview target** — the declared transient inline-style write of `§2.5` item 4 lands on it during a drag. |
| `release: …` line | **THE SINK** — the demo's own status node, i.e. the app's `write` role (`D-117`) with an authored node in place of a graph node. |
| `stub size ±40`, `stub bounds …`, `reset` | **THE CONTROL** — it writes the STUB SHAPE (see below) and nothing else. |
| the three readout blocks | the demo's own readings: the stub family and the route's calls, the app modules' counters, and the zone family's absent read. |

**THE DRAG IS `D-117`'S WIRING, VISIBLY.** `createPaneDrag({ view: stub.members }, domEventSource())` is constructed once;
the affordance is handed its `startSizeOf`, its `boundsOf` and — as its single sink writer and its route in one ordered turn
— its `release(gestureId, value, write)`. So the pre-drag size and the pair the drag clamps against are **the composition's
read of the shape**, and the release writes the status node and then sends `commitPane('pane-a', {size})`. **The pane's
parent element carries the DECOY attributes `size="999" min="0" max="999"` on purpose**: the pre-`D-117` wiring read those
attributes and the composition does not, so a drag that started at 999 would mean the defect is back. It starts at the
shape's figure, and the driver asserts exactly that.

**THE STUB SHAPE — what it stands for, said plainly.** `stub-view.ts` implements four members of `src/renderer/view-client.ts`'s
`ViewClient` (`paneSizeOf`, `paneBoundsOf`, `zoneOf`, `commitPane`, taken as a `Pick`, so the demo cannot drift from the
client's declaration) and stands for **the view record's `['panes']` family**: one pane, `pane-a`, at the tree's **measured
defaults** (`size 100`, `bounds {0, 200}`, re-derived from `src/shared/view-shape.ts`, never re-spelled). Every read is the
app's own pure derivation `paneGeometryIn`, so a pane the family does not name answers the measured default with
`source: 'default'` — the page shows both. **Its `commitPane` is NOT a crossing**: the app's sends a route over the preload
bridge and refills the shape from the delivery that commit causes; this page has no bridge, so the stub composes the write
into its own family at the call (the same "a supplied member is written over what stands" rule the crossing applies), records
it, and answers the same declared `{status: 'sent'}` statement. **Nothing crosses a boundary, and the demo does not pretend
one does.**

## What it CANNOT show without the real app — stated, not simulated

- **The crossing and its receipt.** No `provident-storeroom` instance, no IPC, no `['panes']` write that reaches a file. The
  stub's write is a synchronous stand-in; there is no delivery, no `writeOutcome()`, no second boot to read the value back.
- **The app's own boot, graph and authored elements.** The app resolves its three elements through
  `Runtime.elementForNodeId` and writes its sink through `Runtime.applyCommand`; this page has neither, so it uses
  `querySelector` and a plain status node. The bundle also **neutralises `renderer.ts`'s one boot guard**, because importing
  the module would otherwise boot the app into `#app` — `build.mjs` fails unless that guard's text is found exactly once.
- **The tabs, the zone family's real data, the minimized zone, the drag ghost.** Those belonged to the store-backed demo this
  directory carried before `D-118` (see below). `['zones']` is here only as its EMPTY family, so `zoneIn`'s measured `null`
  arm is shown and no geometry is invented. **No ghost is drawn: a ghost was a store mechanism's, and faking one would be the
  simulation this rebuild refuses.**
- **A real pointer drag against the APP.** The app's live gesture has no leg that drives real coordinate input (`npm run
  panes`'s "gesture" is a `dispatch` click), so nothing here says how the app's drag behaves. **What this demo DID find and
  had to solve for itself**: the session's tracking listeners live on the handle element, so a real pointer that leaves a
  14px handle stops targeting it; the demo's own `pointerdown` listener calls `setPointerCapture`. `domEventSource()`
  advertises no capture, and whether the app's drag survives the pointer leaving its handle is **unmeasured here**.
- **The example's own pointer→size mapping.** The demo supplies `sizeFromPointer` as `start + (pointer.x − pressX)` (a drag
  of `dx` = a size change of `dx`) because the caller seam's example form, `pointer.x − start`, reads a raw absolute
  magnitude. The mapping is a caller seam (`D-117` names it the caller's), and the demo's own arithmetic is this file's
  `demo.ts` and nowhere in `src/`.

## Run the live drive

```
DISPLAY=:0 node demo/pane-drag-demo/run-live.mjs          # --cdp-port=<n> to move the port
```

Dependency-free (Node's own `WebSocket` + `fetch`); it boots the window, attaches CDP, and drives **real pointer input**
(`Input.dispatchMouseEvent`): a hover writes and clears the cursor declaration; four drags press, move, preview and release;
the panel's buttons change the stub and tighten its bounds between them. It asserts the shape's authority at each turn —
**start read 100 → commit 140 → control → start read 180 → preview 195 → tight bounds → preview and commit clamped to 180 →
reset → start read 100** — plus the sink count, the route calls, the session/affordance/controller counters, and that the
window raised no page exception. The profile directory is a fresh `mkdtemp` in the OS temp area (`--user-data-dir`), and it
is removed with the window's whole process group at the end: **a run writes nothing into the repository**. (The old driver
wrote `.profile-<port>` here and killed only the main process, leaving renderer children behind.)

Last run: **29 rows, ALL GREEN, exit 0** — `[live] THE DRAG'S START SIZE: before the stub's control 100 → after it 180;
clamped commit 180; back to 100 after the reset.`

## What stood here before `D-118`, and why it is gone

The directory used to hold a **store-backed** live test: pane drag into a minimized zone, a lower-opacity drag ghost, the
gutter resize lifecycle, and a full tab strip (focus / open / close) — 50 rows over the store, green on 2026-10-03. Its
source was `demo.ts` + `demo-entry.ts` (747 + 34 lines), and **`D-94` DELETED both** because they imported
`src/renderer/store-core-graph.ts`, which `D-93` deleted: no line of them could compile against this tree. What was kept was
the artifact — **`demo.mjs`, 13,217 lines / 511,559 bytes, a self-contained esbuild bundle with ZERO
`import`/`export`/`require` statements, carrying `store-core-graph.ts` and `store-graph-references.ts` INLINED** — so the
directory still ran, demonstrating a mechanism the tree no longer has. `D-94`/`D-95` kept it deliberately, with this README
carrying a disclaimer, because nothing in the tree built it and the corpus named the path.

**That artifact is REPLACED, not lost by accident** (`D-118`): the mechanism it demonstrated was retired (`D-90`–`D-93`), it
carried a frozen copy of `startGutterAffordance` reading the element-attribute seams `D-117` removed, and there was no way
to regenerate it — a checked-in bundle with no generator is a copy, and this directory now has a generator instead. The three
screenshots that stood beside it (`shot-boot.png`, `shot-committed.png`, `shot-ghost.png`) were images OF that retired demo —
the ghost no longer exists — and were removed with it. The Electron leg that drives the app's own panes and crossings is
`npm run panes` / `npm run crossings`, as it was; this demo is a demonstration, not a leg.

## Files

- `demo.ts` — the demo's source: the page wiring, the stub's control, the readouts, and `window.__pgdemo` (the driver's door).
- `stub-view.ts` — the stub shape standing for `['panes']`; typed off the app's `ViewClient`.
- `build.mjs` — the generator, its provenance header, `--check` and `--verify`.
- `demo.mjs` — GENERATED. Do not edit; rebuild with the command above.
- `index.html` — the page's container and its five named elements.
- `electron-main.cjs` — the disposable window.
- `run-live.mjs` — the CDP driver described above.
