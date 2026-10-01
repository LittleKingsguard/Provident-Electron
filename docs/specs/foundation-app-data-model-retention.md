# The foundation app data model — retention, lifetime and flow (layer 2)

Status: **RESEARCH RECORD — FILED 2026-10-01.** Read-only architecture research: **no unit, no
spec-of-behaviour, no red set, no register, no leg, no code, no test.** This document **describes
what is** and **does not propose a redesign**; its hazards are filed with falsifiers, never with
fixes.

**WHAT THIS DOCUMENT IS, AND HOW IT RELATES TO LAYER 1.** Layer 1 is
`docs/specs/foundation-app-data-model.md` (the storage/authority map: *where every value lives*,
230 table rows, findings `F-1`…`F-15`). **This layer asks a different question about the same
tree:** not *what the value is*, but **who holds a reference to it, for how long, what creates and
destroys it, and what happens to it as the app runs.** The architect's instruction was verbatim
*"the memory/storage location audit continues."*

**THE RELATION TO LAYER 1'S FINDINGS, STATED SO NOTHING IS RE-DERIVED.** Layer 1's `F-1`…`F-15` are
**cited by id only** where this layer touches the same site (`F-1` the constructor's `userData`
argument, `F-2` the module system's unreachable renderer half, `F-3` the unwired module writers,
`F-5` the two holders of the element-id kind, `F-6` the store-vs-gate divergence, `F-9` the stale
`maxJournalLength` doc claim, `F-12` the shim's module-level state). **None of them is re-derived,
re-graded or repaired here, and this pass fixes nothing.** This layer's hazards carry their own ids
(`RH-1`…`RH-10`) and are **retention**-shaped: they are about reachability and destruction, not
about which holder is authoritative.

**LAYER LABELS — CARRIED VERBATIM FROM THE REPO'S OWN DECLARATION** (`docs/specs/ci-ui-leg.md`,
*Layer declaration*; the same table layer 1 carries). **No behavioural claim below may be read on a
layer it does not carry.**

| Label | Layer | What it is |
| --- | --- | --- |
| `[T]` | node suite / pure module | the repo's vitest files under the shim; **never assembled-app evidence** (no window, no IPC, no transport). **In this document `[T]` also covers the installed engine package's own bytes** (`ENGINE`, below): a static read of pure module code, not a run and not a measurement |
| `[H]` | host-side | this repo's `src/**` — the main process, the preload, the renderer wiring |
| `[X]` | shim leg | the DOM shim (`src/shared/dom-shim.ts`) and the shim battery host (`src/main/battery-host.ts`) |
| `[A]` | divergence leg | `npm run divergence` — structural-surfaces-only identity evidence; never IPC-layer |
| `[U]` | real-DOM leg | `npm run ui` — a real `BrowserWindow` under a scratch profile (`scripts/electron-ui.mjs`); **not the packaged app**, and (see `§7`) **not a GC or retention instrument** |
| `APP` | assembled app | a reading taken from the running assembled Electron app (boot + key DOM). **No such reading exists in this pass.** |

**`ENGINE` — A SOURCE THIS PASS READ AND LAYER 1 DID NOT.** Where a claim is about engine-internal
retention, the citation is `ENGINE core/<file>.js <symbol>`, where **`ENGINE` =
`node_modules/provident-ssr/dist/core/` of the installed `provident-ssr` `0.5.1`**, read **statically
as source** (`.js` + `.d.ts`). Layer 1 explicitly recorded that it did **not** read the engine's own
storage; **this layer had to**, because *"what keeps it alive"* and *"what destroys it"* are engine
questions. **These are `[T]` readings of code, never measurements.**

**THE HONEST HEADLINE, STATED FIRST SO NO READER INFERS IT LATER:** *this pass ran no suite, no leg,
no `tsc`, no build, no Electron boot, no battery, **no GC measurement and no heap snapshot**, and no
git command* (`§8`). Everything in `§1`–`§7` is **a file read**. Where a claim needs a run, **it says
so and carries the falsifier a later pass can execute** — this pass executed none of them.

**ONE WORD ABOUT THE WORD *"LEAK"*.** This document uses **"retained"** for *"still reachable from a
root"* and **"leak"** only where the reachability is **permanent by construction** (nothing in the
tree removes it). It never means *"measured memory growth"*: **the only memory figures in this
document are cardinalities counted in source** (array lengths, map caps, one entry per construction
site), and every one of them is labelled as a read, not a measurement.

---

## §1. The lifetimes, one table

**Every holder layer 1 identified, with its creation site, its destruction site, the exact
retaining reference, what would leak it, its expected cardinality over a session, and whether a
reload / a graph re-derivation / a window close releases it.**

**Conventions.** *(a)* **"re-derivation"** = any path that builds a **fresh `Supervisor`** for the
APP graph: `Runtime.loadEnvelope`, `Runtime.loadDoc`, `Runtime.codeLoad` (which forwards to
`loadEnvelope`), and the `load` verb of `handleRequest`. *(b)* **"reload"** = the renderer realm is
torn down and re-created (`did-finish-load`), which discards **all** renderer-side module state.
*(c)* **"close"** = `app.quit()` (`src/main/main.ts` `win.on('closed')`). *(d)* "**one entry per
site**" means the cardinality is decided by a construction site in the source, not by a runtime
condition this pass measured.

| # | Holder | Creates it | Destroys it | **What keeps it alive (the exact retaining reference)** | What would leak it | Cardinality / session | Reload? | Re-derivation? | Close? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1** | **the `Runtime`** (the app graph's owner object) | `src/renderer/renderer.ts` `main()` — `new Runtime({mount, envelope: demoEnvelope(), maxJournalLength})` | nothing; it dies with the realm | the **bridge request closure** `bridge.onRequest((req) => …)` holds `runtime` and `panels`; the gutter wiring's seams hold it too | nothing — it has no destruction path at all, and it is reachable for the realm's life | **1 per page load** | **released** (the realm dies) | **NOT released** (`load` replaces the `Supervisor`, never the `Runtime`) | released |
| **2** | **`Runtime.envelope`** (the last-loaded envelope clone) | `Runtime.loadEnvelope` — `this.envelope = structureClone(envelope)`; **the CONSTRUCTOR path leaves it `null`** (a field initializer; layer 1 `F-1` is the neighbouring fact) | replaced on every load; **set to `null` by `loadDoc`** | the `Runtime` | the clone is one object per load, replaced (no accumulation) | **1** | released | **replaced** (1 live) | released |
| **3** | **the per-generation `Supervisor`** | `Runtime.constructor`, `Runtime.loadEnvelope`, `Runtime.loadDoc`, `Runtime.validateExport` (throwaway), `Runtime.validateSig` (throwaway), `SecurePanels.constructor` | **`ENGINE core/supervisor.js` `Supervisor.dispose()` exists, is public and is typed** (`supervisor.d.ts`); **no file in `src/**` calls it** (grep: zero call sites) | **the LIVE one: `Runtime.supervisor` / `SecurePanels.supervisor`. EVERY OTHER ONE: `ENGINE core/registry.js` `finalizeHooks` — a module-level array** that `Supervisor`'s constructor pushes a hook onto and `dispose()` would splice out (`onNodeFinalized` / `finalizeHookCount`) | **`RH-1`**: each discarded Supervisor is pinned by its own still-registered finalize hook, and the hook's closure retains the Supervisor, thence its `nodes` Map, `destroyedRefs`, `journal`, `undoStack`/`redoStack`, `resolvedStates`, `dispatchDedup`, `hub`, `events` | **1 live + one per `load` + two per `validate` call + 1 (pane)**: **unbounded** | released | **NOT released** (this is the hazard) | released |
| **4** | **the engine journal + `undoStack`/`redoStack`** | inside the `Supervisor`, on every applied op (`ENGINE core/supervisor.js` `journalIfApplied`) | **condense** rewrites the journal to ONE `base` marker when `journal.length > maxJournalLength` **and** the base is smaller; a generation dies only with its Supervisor (**and its Supervisor is retained — see #3**) | the Supervisor (`this.journal`) | as #3; and a **skipped** condense re-schedules on the next apply (`RH-10`) | **per generation**; entries ≤ `maxJournalLength` when set, **no cap when unset** | released | **destroyed with the old Supervisor** (the app-graph journal does not survive a `load`) — `docs/specs/mcp-endpoint.md` §3.6 | released |
| **5** | **the `requestId` dedup LRU** (`dispatchDedup`) | `ENGINE core/supervisor.js` `Supervisor` field — one `Map` per Supervisor, armed on the first `dispatch` carrying a `requestId` | **cap `DEDUP_CAP = 128`** (drop-oldest by recency, `recordDedup`) + `DEDUP_TTL_MS = 10 000`; then the generation's death | the Supervisor | as #3 | **≤ 128 entries, per generation** | released | **re-armed — destroyed with the old generation** (`docs/specs/mcp-endpoint.md` §3.1 `P-E4`) | released |
| **6** | **the engine's node registry + `destroyedRefs` tombstones + `resolvedStates` + `pass2States` + `pendingTriggers` + `hub` + `events` + the lazy `client`/`handlerCtx`** | the `Supervisor` constructor + `registerNode`/`recordResolved`/pass-2 | `dispose()` only (never called); a `destroy` op **tombstones** (`nodes.delete` → `destroyedRefs.set`) — and `ENGINE core/supervisor.js`'s own doc says destroyed entries **"are never removed"** from `destroyedRefs` | the Supervisor | as #3; inside one generation, `destroyedRefs` grows with every destroy and is never trimmed (its own doc says so) | live nodes; `destroyedRefs` **unbounded within a generation** (bounded by destroys done in that generation) | released | **destroyed with the old generation** (`Runtime.tearDownGraph` destroys every in-tree non-root node first) | released |
| **7** | **`Runtime.cssIndex` / `propsIndex`** (the derived id index — layer 1 `F-5`) | `Runtime.rebuildIdIndex()` — constructor, `loadEnvelope`, `loadDoc`, `applyCommand`, `journal`, `tearDownGraph` | **replaced** (a NEW `Map` per rebuild, `rebuildIdIndex`'s first two lines); nothing else frees the old ones | the `Runtime` | nothing — the old maps become unreachable on the next rebuild (**no leak; the hazard here is authority, `F-5`, not retention**) | **2 maps per rebuild**, each ≤ the live in-tree node count | released | **rebuilt** (not accumulated) | released |
| **8** | **the focus holder `holder` (`{entries, activeId}`)** | **module evaluation of `src/renderer/renderer.ts`** — `const holder: { state: FocusState } = {…}` (a module-level binding) | **nothing in the app**: no `close` path is reachable through the MCP route (`renderer.ts` `resolveForHolder` chooses only `'open'`/`'activate'`; `focus-model.ts` also implements `'close'`, which no shipped caller reaches) | the **module binding** — and `answerForHolder` **reassigns** `holder.state` to the fresh state the model returned | **`RH-4`**: `entries` grows by one per distinct caller `target` (the model's append arm, `focus-model.ts` `focusTransition` `'open'`), holds **the caller's own entry object** by identity, and **no cap and no removal path exists** in the app | **1 holder, unbounded `entries`** | **released** (the realm owns the module) | **NOT released — deliberately**: `docs/specs/focus-tool.md` §2.1 item 6 / §2.3 item 5 pin *"the holder IS the live authority"* and *"holds NOTHING between calls"* (the second clause is about the **tool layer**, not this holder) | released |
| **9** | **the ENGINE's module-level registries** (`finalizeHooks`; the default scope's `registered`/`byId`/`defPrototypes`/`defRootPrototypes`/`contentNodes`/`mintedByLayer`/`cascadeFlags`/`pendingDestroy`; the one sweep timer) — **not a host holder, and the one layer 1 did not map because it did not read the engine** | module evaluation of the engine bundle — **per realm**, since the engine is bundled into `renderer.js` | `dispose()` (never called) and `evictDestroyedNode` (per destroyed node); the rest die with the realm | **the engine's own module scope** | **`RH-1`** and **`RH-5`** | 1 per realm; **contents unbounded** within it | **released** (per realm) | **grows per re-derivation** (this is the hazard) | released |
| **10** | **the secure-panels graph** (`SecurePanels`: `scope`, `supervisor`, `adapter`, `root`, `nodes`, `prevMap`) | `src/renderer/renderer.ts` `main()` — `new SecurePanels(panesMount)`, **once per realm** | nothing; dies with the realm | **the bridge request closure** (`panels?.refreshDebug(runtime)` inside `bridge.onRequest`) and `handleDomEvent`'s `this.refresh()` chain | **`RH-3`** (its journal has **no cap**), and the pane graph is **never re-derived**, so its own accumulated state is never reset | **1 per realm**; `prevMap` replaced per render | released | **NOT re-derived at all** (`load` does not touch it — the isolation is by construction, `docs/specs/mcp-endpoint.md` §6.4) | released |
| **11** | **the pane's snapshots** `cfg` / `moduleStatus` / `moduleListText` / `debugValue` | `SecurePanels.refresh()` and `refreshDebug(runtime)` | **replaced** on the next refresh; never cleared on close | the `SecurePanels` instance | nothing (fields, not collections) | **1 each** (replaced) | released | unaffected | released |
| **12** | **the gesture session's state** (ledger, `slot`, counters, ids) | `src/renderer/renderer.ts` `startGutterAffordance` — `createGestureSession({source, commit: () => undefined})`, **once per realm** | `dispose()` — **no shipped `src/**` call site**; a terminal discards only the *record* (`slot`), never the ledger | the **element listeners**: the session's own `install` start listener and its tracking listeners are registered through `domEventSource` **on the handle element**, so the element's listener table retains the handlers, which retain the session closure | **`RH-6`** (via the wiring's `writes`) and **`RH-2`** (the ledger's `entries[].element` retains the element) | **1 session per realm**; ledger = 1 entry (one installed control) | released | **NOT released, and NOT re-pointed** — the wiring never re-runs (`main()` calls it once) | released |
| **13** | **the resize controller's state** | `createGutterAffordance` → `createResizeController({…})`, once per affordance instance | `detach()` — **no shipped call site** | the affordance's closure (its `controller` const) and its `entries[].element` | as #12 | **1 controller per affordance**, 1 `entries` entry (one attached element) | released | not re-created | released |
| **14** | **the affordance's own state** (`record`, `hovered`, `attached`, `detached`, `recoverable`, `listeners`, counters) | `createGutterAffordance(...)` in `startGutterAffordance`, once | `detach()` only; **the per-gesture `record`** is discarded at **every** terminal (incl. `cancel`/`drop`/reset) | **the four listeners it registered on the handle element** (`pointerover`, `pointerout`, `pointerdown`, `pointermove`), plus the controller's session delegation | **`RH-2`/`RH-6`**: the closure chain (element → listener → affordance → `commit` → the wiring's `write` → `writes` → `runtime`) is a live root for the realm's life | **1 per realm** | released | **NOT re-attached** — the wiring's `element`/`target` are the **boot** elements (`RH-2`) | released |
| **15** | **the DOM element the preview writes to** (`target`, `GUTTER_TARGET_ID`) and the handle element | the engine's `DomAdapter` at the **boot render**; `Runtime.elementForNodeId` resolves them once in the wiring | **the next `load`'s diff emits a removal op for every prior wire** (`Runtime.tearDownGraph` → `render()` with the prev baseline and an empty actionable set → `ENGINE core/render-helpers.js` `diffMinimal`/`applyOps` → `removeEl`), and `Runtime.resetRenderState` → `Runtime.reconcileMount` detaches any straggler | **the affordance's closure** (`element`, `target`) — and, for the element, its own listener table | **`RH-2`**: after a re-derivation these two elements are **detached yet retained** (by the affordance, the controller's `entries`, the session's ledger) while the mount carries fresh replacements the wiring never sees | **1 pair per realm** (plus 1 detached pair per re-derivation, retained — `RH-2`) | released | **replaced, never re-resolved** | released |
| **16** | **the affordance wiring's `writes: GutterWriteReading[]`** | `startGutterAffordance`'s closure — one entry per committing terminal, **including refusals** | **never** — no cap, no clear, and **the returned handle is discarded by `main()`** (`startGutterAffordance(runtime)` on its own line) | the wiring's `write` closure ← the affordance's `commit` seam ← the controller ← the element listener | **`RH-6`**: the only reader of the array is a return value nobody keeps | **1 per commit / unbounded** (it stops growing only when the wiring becomes inert — i.e. after the first re-derivation) | released | **the array is not reset by a load** — it is a closure variable, not a Runtime field | released |
| **17** | **the security store's `current` vs the live gate** (layer 1 `F-6`) | `src/main/main.ts` `createSecurityStore({path})` closure (`current`) and `new SecurityGate({token, enabled})` | **`current`**: never (process lifetime; the object is **replaced** on each `set`). **The gate**: **replaced on every patch** — `ProvidentMcpServer.applyGatePatch` does `this._gate = this._gate.apply(patch)`; the prior gate becomes unreachable | `current`: the store closure; the gate: `ProvidentMcpServer._gate` | nothing (1 each; the old gate is a fresh object with a copied array) | **1 each per process** (the boot snapshot `persisted` is a third, write-once — layer 1 `F-7`) | n/a (main) | unaffected | **the process** |
| **18** | **the module store** (`records` Map, `quarantinedAtBoot` Set, `loaded.corrupt`) | `src/main/main.ts` `createModuleStore({path})` → `module-store.ts` `load(path)` | never (process lifetime). `remove()` deletes a record; **`remove` has no shipped caller** (layer 1 `F-3`) | the store closure | records accumulate **one per distinct module name** — the store is **unbounded by design** (an operator can install N modules; nothing caps N) | **1 store; N records, no cap** | n/a | unaffected | the process |
| **19** | **the module registry (`CapabilityRouter`, main instance)** — `tools`, `hooks[]`, `transforms[]`, `modules`, `captureProvider` | `src/main/main.ts` `new CapabilityRouter()` + `syncModuleRouter(router, moduleStore)` (boot, after install/update, after a disable toggle) | `clear()` inside every `syncModuleRouter` call — **a full re-derivation in place** | `ProvidentMcpServer.router` and `main()`'s `moduleRouter` const | **the per-module `uploadQueue` buffers** (`extensions.ts` `registerModule`'s `const buffer: unknown[]`) are reachable only from the `ctx` handed to the entry at registration and become **unreachable** on the next `clear()`+re-register (their contents are simply dropped) | `tools` ≤ Σ declared tools; `hooks`/`transforms` **empty in the app's own wiring** | n/a | **re-derived in place** on every install/update/disable | the process |
| **20** | **the MCP request path** — `ProvidentMcpServer.registered`/`resources` (handle maps), `httpServers` Set, `RendererBackend.pending`/`seq`/`ready`/`readyPromise`, the per-POST server+transport | constructor (`registered`/`resources`/`httpServers`), `createServer` (per POST / once for stdio), `RendererBackend.invoke` (a `pending` entry per call) | `handleReply` (delete + `clearTimeout`), `handleReset` (reject-all + clear), `start`/`close`, `handleHttp`'s `res.on('close')` (deletes the per-POST server from `httpServers`), the invoke timer (60 000 ms) | `ProvidentMcpServer` (main, process lifetime); the SDK's own server while a POST is in flight | `RH-8`: the **`registered` map is shared across servers** — each per-POST `createServer` **overwrites** the same keys with the new server's handles while the old server lives in `httpServers` until the response closes; nothing caps concurrent POSTs | `pending`: ≤ concurrent in-flight invokes (each ≤ 60 s); `httpServers`: ≤ concurrent POSTs; `registered`: ≤ the allowed tool set | n/a | unaffected | the process |

**THE THREE THINGS THIS TABLE SHOWS THAT LAYER 1'S MAP COULD NOT.** **(i)** *The one holder with a
declared destruction method — the `Supervisor` — is never destroyed by this host*, so every
per-generation holder in the list dies **with its Supervisor in principle and never in fact**
(`RH-1`). **(ii)** *The wiring that binds the gesture to the DOM is created once and never
re-bound*, so the pair of elements it holds is **detached by the first re-derivation while the
wiring keeps its reference** (`RH-2`). **(iii)** *Two holders are unbounded by construction and
neither is a store*: the focus holder's `entries` (`RH-4`) and the pane graph's journal (`RH-3`).

---

## §2. The re-derivation ledger

**Every `load` builds a fresh `Supervisor`.** The path is the same in all three entry forms:

`Runtime.load` → `Runtime.loadEnvelope` **or** `Runtime.loadDoc` **or** (for `kind:'commands'`) no
rebuild at all; `Runtime.codeLoad` → `codeValidate` → `loadEnvelope`. The rebuild itself:
`Runtime.loadEnvelope` → `tearDownGraph()` → `structuredClone(envelope)` → `translateLegacy(env)` →
`new Supervisor({events: new EventBridge(), maxJournalLength})` → `registerNode` per node →
`buildPayloads` → `rebuildIdIndex` → `resetRenderState` → `render()`.

**§2.1 — WHAT DIES WITH THE OLD `Supervisor` (by its own code, if it were destroyed).** All of
`ENGINE core/supervisor.js`'s per-instance state: `nodes`, `destroyedRefs`, `journal`,
`undoStack`, `redoStack`, `resolvedStates`, `pass2States`, `pendingTriggers`, `dispatchDedup`,
`flushScheduled`/`pass2Dirty`, `hub` and `events` (the `EventBridge` created on the same line), the
lazily-built `client` (`clientAPI`) and `handlerCtx`, and the `graphScope` it was handed.

**§2.2 — WHAT DIES WITH THE OLD GENERATION THROUGH THE HOST'S OWN TEARDOWN.**
`Runtime.tearDownGraph()` runs **before** the rebuild and does three things: it **destroys every
in-tree non-root node** (`supervisor.apply({kind:'destroy', node})`), it `dropPayload`s every
content payload and empties `this.payloads`, and it clears `prevStates` + re-renders with the kept
`prevMap`, which is what **empties the mount by diff**. `Runtime.resetRenderState()` then nulls
`domPrevMap`/`ssrPrevMap`, **recreates the `SSRFragmentAdapter`** (its own comment says the SSR
adapter *"also retains stale state across a reload"*), clears `prevStates`, sets
`bootstrapped=false`, and calls `reconcileMount()` to detach any `data-node-id` child the diff
missed. **So the old graph's nodes are destroyed, its payloads dropped, and its DOM children
removed.**

**§2.3 — WHAT DOES *NOT* DIE, ENUMERATED. Every item below survives the re-derivation while the
holder the item belonged to does not.**

| # | What survives | The retaining reference | Layer | Hazard |
| --- | --- | --- | --- | --- |
| 1 | **The whole old `Supervisor` and everything reachable from it** (§2.1's list) | `ENGINE core/registry.js` `finalizeHooks` — the hook `Supervisor`'s constructor registered (`onNodeFinalized`), never spliced out because `dispose()` is never called | `[T]` (mechanism) · `[H]` (non-call) | **`RH-1`** |
| 2 | **The old generation's ROOT node** | `tearDownGraph`'s first loop **skips `n.id === this.rootNode.id`**, so the root is never destroyed and never evicted from `ENGINE core/registry.js`'s default-scope `registered` Set / `byId` Map (`registerNode` adds; only `evictDestroyedNode` removes) | `[T]` + `[H]` | **`RH-5`** |
| 3 | **Every node the old generation left `!isInTree` (unplaced) and never destroyed** | same registry (`tearDownGraph`'s loop `continue`s on `!n.isInTree`) | `[T]` + `[H]` | **`RH-5`** (same mechanism, second class) |
| 4 | **The def-prototype registries of every translate** | `ENGINE core/registry.js` `registerDefPrototypes`/`registerDefRootPrototype` — **`Map`s keyed by the component LINK object, with no delete site anywhere in the engine**; `ENGINE core/translate.js` calls them on **every** translate, and each translate builds a **fresh hub and fresh links** | `[T]` | **`RH-5`** (theoretical for today's envelope — the demo envelope carries no `def`/`component`/`anchors`/`bindings` keys at all, read; the shape is still the shape) |
| 5 | **The `DomAdapter`** — its `wires` Map, `listeners` Map (the retained handler map), `stylesSeen` Set, and the `<style id="preempt-dynamic-styles">` element it appends to `document.head` | `Runtime.adapter` is **`readonly` and created once in the constructor**; `resetRenderState` nulls the prev-maps but **not** the adapter, and no code path recreates it | `[H]` + `[T]` | **`RH-7`** (the style element and `stylesSeen`) |
| 6 | **The affordance, the controller, the session, and the two elements they hold** | the element listeners registered on the **boot** elements (§1 rows 12–15); `startGutterAffordance` is called **once** in `main()`, and no load path re-resolves `elementForNodeId` | `[H]` | **`RH-2`** |
| 7 | **The `writes` record** | the wiring's `write` closure, reachable through the affordance chain | `[H]` | **`RH-6`** |
| 8 | **The focus holder's `entries`** | the module-level `holder` binding in `src/renderer/renderer.ts` (deliberate; the graph load is not its owner) | `[H]` | **`RH-4`** (growth, not survival) |
| 9 | **The pane graph, its Supervisor and its journal** | the `SecurePanels` instance held by the bridge closure; **no load path touches it** | `[H]` | **`RH-3`** |
| 10 | **`Runtime.prevStates`' keys** — **no**: cleared by `tearDownGraph` and by `resetRenderState`, and `render()` additionally prunes ids whose node is gone from the registry. **Named here so a reader does not invent it.** | — | `[H]` | none |
| 11 | **The engine's module-level sweep timer** (`ENGINE core/registry.js` `scheduleSweep`) | a module-level `setTimeout` closure; it fires and re-arms per need, and its callback holds the `allScopes` Set | `[T]` | none observed (one timer, not one per load) |
| 12 | **A scheduled condense that was pending at the moment of the load** (`ENGINE core/supervisor.js` `scheduleCondense`) | the pending `setTimeout` holds the **discarded** Supervisor until it fires (it is a `setTimeout(…, 0)`) and then runs `condense()` **on the discarded graph** | `[T]` | **`RH-10`**'s sibling; brief by construction, listed for completeness |

**THE TWO-SENTENCE SUMMARY OF `§2`.** *The host's own teardown is thorough — nodes destroyed,
payloads dropped, DOM emptied, render baselines reset — and the renderer-side wiring is nonetheless
not re-established, so the surviving items are of two kinds: **engine-internal state the host never
told the engine to release** (`RH-1`, `RH-5`, `RH-7`) and **wiring closures that outlive the DOM they
were bound to** (`RH-2`, `RH-6`).* **Nothing in this section is a measurement; every row is a read
of the code path named in it.**

---

## §3. The listener and closure inventory

**One row per registration site in this app's own code, plus the engine's own registration site
where the host's discipline depends on it.** *"Detached on every terminal/cancel/dispose path?"* is
answered **at the bytes**, and the answer is **never** *"by design, therefore fine"* where a path can
leave one attached.

### §3.1 The table

| # | Listener | Registered where | On what target | Detached by | Can any path leave it attached? | Layer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `DOMContentLoaded` (one-shot) | `src/renderer/renderer.ts`'s module tail — `document.addEventListener('DOMContentLoaded', () => void main())` | the renderer `document` | **nothing** (no `removeEventListener` anywhere for it) | **Yes, permanently** — but the `document` is per-realm, so it dies with the realm. **Correctness: none. Retention: the realm only.** | `[H]` |
| 2 | the engine's per-element `on:<event>` handlers (this is how an **authored** handler like the theme control's `click` is wired) | `ENGINE core/adapters.js` `DomAdapter.setProp`'s `on:` branch — `elem.addEventListener(evtName, handler)` | the element the emit created | **`purgeListeners`**, called from **`removeEl`** (element leaves), from a **duplicate `createEl`** on the same wire (DOM-F8), and from the **detach-on-`undefined`** branch (`on:x` set to `undefined` → DOM-F6). The map is the adapter's **retained handler map** keyed by `wireKey(wire, forkKey)` then event | **Only if the element leaves the tree without a `removeEl` op** — which is exactly what `Runtime.reconcileMount` exists to sweep (`tearDownGraph`'s diff covers the normal path) | `[T]`, exercised in the `[X]`/`[D]` legs |
| 3 | the **session's install listener** (`pointerdown`, one per installed control) | `src/shared/gesture-session.ts` `installOperation` → `callOn(element, POINTER_TYPES.start, handler)` → the injected `domEventSource().on` → `element.addEventListener` | the handle element | **`dispose()` only** (`callOff(entry.element, POINTER_TYPES.start, entry.handler)` in `disposeOperation`) | **YES — every terminal leaves it attached, by design** (it is the establishment path). `dispose()` is **never called by any `src/**` file**: the wiring calls `affordance.attach()` and discards the handle, and `affordance.detach()`'s only caller would be the same discarded handle | `[H]` (+`[T]` for the session's own bytes) |
| 4 | the **session's three tracking listeners** (`pointermove`, `pointerup`, `pointercancel`) | `gesture-session.ts` `beginOperation` → three `callOn` calls | the handle element | **`detachTracking`** — called on **every** terminal: `runTerminal` (`end`, `reset`), `cancelOperation`, `disposeOperation`, **and** the refused-establishment rollback (a refused tracking attach rolls the successful ones back) | **No** — every path that creates them detaches them. **The claim under test holds for these three** | `[T]` (asserted by the unit's own rows against an injected source) |
| 5 | the **affordance's own four listeners** (`pointerover`, `pointerout`, `pointerdown`, `pointermove`) | `src/shared/gutter-affordance.ts` `attach()` → `registerListener` → `domEventSource().on` → `element.addEventListener` | the handle element | **`removeOwnListeners()`** — called from `detach()` **and** from `attach()`'s rollback arms | **YES for the shipped app**: `detach()` has **no shipped call site**. The rollback half only covers a *refused* `attach()` | `[H]` |
| 6 | the **controller's** delegation (`session.install(element, wrapped)`) — the wrapped `onStart`/`onMove`/`onEnd`/`onCancel` closures | `src/shared/gutter.ts` `attach` → `installer.call(session, element, wrapped)` | the handle element (via the session's #3) | **`detach()`** → `closer.call(session)` (the session's `dispose`, which drops the start listener) | **YES**, same as #3/#5 — no shipped `detach()` caller | `[H]` |
| 7 | the **renderer's bridge listener** (`ipcRenderer.on(IPC_INVOKE, …)`) | `src/main/preload.ts` `onRequest` — called **once** by `renderer.ts` `main()` | `ipcRenderer` (per-realm) | nothing — no `removeListener` for it | **Yes, permanently**, per realm. **Correctness: one handler per realm, so no duplicate-handler fan-out** | `[H]` |
| 8 | main's `ipcMain` registrations — 4 `handle` (`IPC_SECURITY_GET`/`SET`, `IPC_MODULE_GET`/`SET_DISABLED`) + 3 `on` (`IPC_READY`, `IPC_REPLY`, `IPC_NOTIFY`) | `src/main/main.ts` `main()` | `ipcMain` (process) | nothing | **Yes, permanently** — and they outlive **every** renderer reload, by construction (they are process-level, which is what makes a reload work at all). If `main()` were ever called twice in one process, **every one of them would be a duplicate registration** | `[H]` |
| 9 | the **stdio disconnect watchers** (`process.stdin` `'end'`/`'error'`) | `src/main/main.ts` (`transport === 'stdio'` only) | `process.stdin` | nothing | **Yes, permanently** — by design (*"so a spawned test run leaks no Electron instance"*, the host's own comment) | `[H]` |
| 10 | the **backend's window listeners** (`did-finish-load`, `closed`, `destroyed`) | `src/main/mcp-server.ts` `RendererBackend.attachWindow` | the `BrowserWindow` / its `webContents` | nothing — and `attachWindow` **can be called again** (the `rearm` closure guards with `win !== this.window`, which prevents a *stale* reset but does **not** detach the old window's listeners) | **Only one call site** (`main()`), so one set exists today. **A second `attachWindow` would add a second set to a second window and leave the first attached** | `[H]` |
| 11 | the **per-request HTTP listeners** — `req.on('data'/'end'/'error')` in `readBody`, and `res.on('close')` | `src/main/mcp-server.ts` `handleHttp`/`readBody` | the request/response objects | Node's own teardown when the request completes; the app never removes them | **No leak path observed**: the delete of the per-POST server happens in the `res.on('close')` callback itself | `[H]` |
| 12 | the **timers** — `RendererBackend.invoke`'s readiness timer (30 000 ms) and per-request timer (60 000 ms), `ENGINE`'s condense `setTimeout(…,0)` and sweep `setTimeout` | `mcp-server.ts` `invoke`; `ENGINE core/supervisor.js` `scheduleCondense`; `ENGINE core/registry.js` `scheduleSweep` | the event loop | the timers are cleared on reply (`handleReply`), on reset (`handleReset`), and in `invoke`'s `finally` for the readiness timer | **A dropped `pending` entry without a reply and without a reset is cleared by its own timer** (the timer deletes it then rejects). **One path is worth naming**: a `pending` entry whose reply arrives after the reset has already cleared the map is dropped by `handleReply`'s `if (!entry) return` — **no timer is left running** because `handleReset` cleared them all | `[H]` |
| 13 | **`res.on('close')` and the `httpServers` Set** | as #11 | — | Node | `httpServers` is emptied by `close()` and by each response's close | `[H]` |

### §3.2 The contracts' stated disciplines, cross-checked at the bytes

**THE CLAIM UNDER TEST (`docs/specs/gsession.md` §2.3 item 2(c) / item 7, and its own gate row
*"interrupt/cancel leaves NO retained sinks and no listeners"*).** **Read at the bytes, in two
parts, because the sentence carries two claims:**

1. **"no listeners" — TRUE for the gesture, FALSE for the session, and the difference is the
   contract's own.** `cancelOperation` (`src/shared/gesture-session.ts`) detaches all three tracking
   listeners **before** any consumer code runs (`detachTracking` precedes `record.active = false`,
   `slot = null`, and `cancelHook`), and a refused establishment rolls back the attaches it made.
   **What a cancel does NOT detach is the session's install listener** on that element — it stays
   attached until `dispose()`, which no shipped file calls. **So the sentence holds as *"the
   gesture's tracking listeners"* and fails as *"no listener of this session remains on the
   element"*.** The contract's own text supports the narrow reading (`§2.3` item 7 speaks of *"this
   session's own listener baseline"* being restored **by `dispose()`**, not by a cancel).
2. **"no retained sinks" — TRUE as *state*, with one reference that IS retained.** The session
   holds **no sink state** across a gesture (no per-gesture value, no queued write, no memo) and a
   `cancel` invokes `commit` **zero** times. **But the `commit` callback itself is a construction
   argument captured in the session's own closure and retained for the session's whole life** — the
   module's own doc says so (*"it holds the consumer's `commit` only as a construction argument"*,
   the gate row's own words). In this app that retained callback is the wiring's
   `commit: () => undefined` recorder, so **the retained reference is cheap** — and the *real*
   sink-adjacent retention is one layer up: the affordance's `commit` seam → the wiring's `write` →
   `writes` (**`RH-6`**).

**THE SECOND CLAIM WORTH CROSS-CHECKING — THE LISTENER-COUNT LIMIT (`docs/specs/gsession.md` §2.3
item 5's limit / the unit's layer anchor 5).** The contract already forbids the over-reading this
section could otherwise make: *"a listener-count green is not a browser listener-table green — the
shim removes by reference and the engine's retained map may hold a different reference; every row of
this unit asserts the CALLS the session made against the injected source, never a fact about a real
browser"*. **This section obeys it: nothing in `§3.1` claims a real browser's listener table. The
`[H]`/`[T]` column says which layer each row's evidence belongs to, and rows 2 (the engine's own
retained map) and 5 (the affordance's four) are read from source, not measured in a browser.**

**THE THIRD — THE ENGINE'S OWN REMOVAL DISCIPLINE, NAMED BECAUSE THE HOST'S DOM HYGIENE DEPENDS ON
IT.** The engine purges a slot's listeners on `removeEl`, on a duplicate `createEl`, and on an
`on:x = undefined` write, and it binds **replace** semantics on re-set (a second `addEventListener`
for the same slot first removes the previous exact function). **That is the mechanism that makes
`tearDownGraph`'s diff-emptying safe** — and it is the reason `§2.3`'s row 5 (the adapter's
`stylesSeen`/`stylesEl`, which have **no** such purge) stands out as the one adapter-owned thing with
no removal path.

---

## §4. The unbounded-growth audit

**Every container that grows, its cap, what evicts, and what a long-running session accumulates.
"NO CAP" is stated in those words where it is true; where the cap is real, its number and its site
are named.**

| Container | Site | **Cap** | **What evicts** | What a long session accumulates | Layer |
| --- | --- | --- | --- | --- | --- |
| **the engine's `finalizeHooks` array** | `ENGINE core/registry.js` `finalizeHooks` / `onNodeFinalized` / `finalizeHookCount` | **NO CAP** | **nothing in this repo** — only `dispose()`, which no `src/**` file calls | **one hook + one whole discarded `Supervisor` per `load`, two per `provident.validate`** (the two throwaway supervisors in `Runtime.validateExport` and `Runtime.validateSig`), plus one per realm for the pane graph. `finalizeHookCount()` is **exported by the package and referenced nowhere in this repo** — **`RH-1`** | `[T]` + `[H]` |
| **the engine's default-scope registries** (`registered`, `byId`, and the def-prototype `Map`s) | `ENGINE core/registry.js` `registerNode` / `byId` / `registerDefPrototypes` / `evictDestroyedNode` | **NO CAP** | `evictDestroyedNode`, reached only for nodes actually finalized/destroyed | **the previous generation's ROOT node per `load`** (skipped by `tearDownGraph`), any never-destroyed unplaced node, and — for an envelope that carries def bindings — **one prototype entry pair per def Link per translate, with no delete site in the engine** (today's demo envelope carries no def bindings: **read**) — **`RH-5`** | `[T]` + `[H]` |
| **`Supervisor.destroyedRefs`** (tombstones) | `ENGINE core/supervisor.js` `destroyedRefs` | **NO CAP** | nothing — the engine's own doc: *"Destroyed is terminal, so entries are never removed"* | one entry per destroyed node **within one generation** (so a long-lived generation that churns nodes grows); the app's own `load` path discards the generation, so it is bounded by churn-per-generation | `[T]` |
| **the engine journal** (app graph) | `ENGINE core/supervisor.js` `journal`/`undoStack`/`redoStack` | **`maxJournalLength`** — the app's Supervisor gets the value boot-read from the persisted store (`src/renderer/renderer.ts` `main()` → `Runtime.maxJournalLength` → `new Supervisor({…, maxJournalLength})`); **`undefined` = never condense** (the default when the setting is unset) | **`condense()`** — when `journal.length > maxJournalLength`, a deferred condense rewrites the journal to ONE `base` marker (`journal.splice(0, preLen, marker)`), truncates `undoStack` to the post-base entries and clears `redoStack` | with a threshold set: **≤ threshold + the post-condense growth**; with it unset: **no cap at all** | `[H]` + `[T]` |
| **the condense's skipped path** | `ENGINE core/supervisor.js` `condense`'s size guard (`baseBytes >= journalBytes` → `console.warn('condense-skipped-size …')` + return) and `journalIfApplied`'s re-schedule | **NO CAP on the retry cadence** | nothing | while the journal is over the threshold **and** the base is not smaller, **every subsequent applied op re-schedules a condense, pays a full `serializeSlice` of the graph and prints one warning** — i.e. an O(graph) cost and one log line **per op**, for as long as that state holds — **`RH-9`** | `[T]` |
| **the pane graph's journal** | `src/renderer/secure-panels.ts` `SecurePanels.constructor` — `new Supervisor({events: new EventBridge(), graphScope})` | **NO CAP — `maxJournalLength` is never passed** (the shape is pinned by `docs/specs/secure-panels.md`'s own-graph clause, which names the constructor's two options and no third) | nothing — condense cannot fire without a threshold | **one applied op per mutated pane node per `syncConfig()`**, and `syncConfig()` runs from `refreshDebug(runtime)` — which the bridge handler calls **after every MCP reply** (`src/renderer/renderer.ts`'s `onRequest` → `.then((reply) => { panels?.refreshDebug(runtime); … })`) — and from every pane DOM event. **A session of N MCP calls accumulates ≈ `N × (the number of pane nodes `syncConfig` mutates)` journal entries, with no cap and no condense** — **`RH-3`** | `[H]` |
| **the focus holder's `entries`** | `src/renderer/renderer.ts` `holder`; appended by `src/shared/focus-model.ts` `focusTransition`'s `'open'` arm (`entries.concat([entry])`) | **NO CAP — and no removal path in the app**: the model's `'close'` verb exists but `renderer.ts` `resolveForHolder` only ever chooses `'open'`/`'activate'`; no MCP tool clears the holder | nothing | **one entry per distinct caller `target` the agent sends**, each holding **the caller's own entry object** (the MCP call's own data), for the realm's whole life. `docs/specs/focus-tool.md` §2.3 item 5's *"holds NOTHING between calls"* is about the tool layer; **no spec section and no decision row caps this holder's entry count** — layer 1 maps the holder (`§2.4`) and records its neighbours (`F-1`, `F-4`), and **nothing records a bound** — **`RH-4`** | `[H]` |
| **the affordance wiring's `writes`** | `src/renderer/renderer.ts` `startGutterAffordance`'s `const writes: Array<…> = []` | **NO CAP** | nothing — no `clear`, no `length = 0`, and the returned handle is **discarded** at the call site | **one `GutterWriteReading` per committing terminal, refusals included** (`write` pushes `{node, value, status}` before returning the status). Growth stops only when the wiring becomes inert — i.e. after the first re-derivation detaches its elements (`RH-2`) — **`RH-6`**, whose retaining reference is the same closure chain that `RH-2` describes | `[H]` |
| **the module store's `records`** | `src/main/module-store.ts` `createModuleStore` → `records: Map` | **NO CAP** | `remove(name)` — **which has no shipped caller** (layer 1 `F-3`) | one record per distinct module name ever installed, each carrying its full `source` string + hash, mirrored to `<userData>/provident-modules.json` on every write | `[H]` |
| **the `CapabilityRouter`'s registries** | `src/renderer/extensions.ts` `tools`/`hooks`/`transforms`/`modules` | bounded in practice: `clear()` + re-registration on every `syncModuleRouter` | `clear()` — a full re-derivation | the whole set is rebuilt per install/update/disable; **`hooks` and `transforms` stay empty in the app's wiring** (nothing in `src/**` calls `onRender`/`transform` — layer 1 `F-2`) | `[H]` |
| **the module `uploadQueue` buffers** | `src/renderer/extensions.ts` `registerModule`'s `const buffer: unknown[]` (`MAX = 1000`, **drop-oldest**) | **`1000` per module registration** | the queue's own `shift()` when over MAX; **and `clear()` on the next re-sync makes the whole buffer unreachable** | at most 1000 items, and they are dropped wholesale at the next sync — **so the queue is both capped and ephemeral** | `[H]` |
| **the pane's per-refresh snapshots** | `src/renderer/secure-panels.ts` `cfg`, `moduleStatus`, `moduleListText`, `debugValue` | **1 each** (scalar/string fields, reassigned) | the next refresh | nothing accumulates — **but each refresh costs two `ipcRenderer.invoke` round-trips** (`security.get()` + `module.get()`) **and `refreshDebug` runs after every MCP reply**, so the session pays ≈ `2 × N` IPC round-trips and `N` pane re-renders for `N` MCP calls | `[H]` |
| **the DOM shim's `byId`** | `src/shared/dom-shim.ts` `const byId = new Map()` | **NO CAP** | `installShim()` **clears** it; `shimDocument.getElementById` **auto-creates** an entry per id | one entry per distinct `getElementById` id per shim install — **and this is the `[X]` harness layer only**: the module is imported by `src/main/battery-host.ts` and appears in `battery-host.mjs`; **no app bundle imports it** (layer 1 `§2.6`, `F-12`) | `[X]` |
| **`RendererBackend.pending`** | `src/main/mcp-server.ts` `pending: Map<number, …>` | **bounded by concurrency**, not by a number | `handleReply` (delete + `clearTimeout`), `handleReset` (reject all + clear), the 60 000 ms timer (delete + reject) | one entry per in-flight invoke; **`seq` is monotonic and never reset** (a number, not a container) | `[H]` |
| **the per-POST HTTP servers** | `src/main/mcp-server.ts` `httpServers: Set<McpServer>` + `ProvidentMcpServer.registered`/`resources` | bounded by concurrent POSTs; **`registered` is shared across servers and overwritten per POST** (`RH-11`) | `res.on('close')` deletes the server from the Set; `close()` clears it | one server + transport per in-flight POST, released when the response closes | `[H]` |
| **the renderer's `prevStates` / `domPrevMap` / `ssrPrevMap`** | `src/renderer/runtime.ts` | bounded by the live node count; **and explicitly reset on every load** | `tearDownGraph`, `resetRenderState`, and `render()`'s own prune of ids with no live node | nothing across loads — **named here because it is the one place a reader might assume growth and there is none** | `[H]` |

**THE PLAIN STATEMENT THE TABLE OWES.** **Four containers have NO CAP and are reached by ordinary
app traffic: the engine's `finalizeHooks` array (`RH-1`), the engine's default-scope registries
(`RH-5`), the pane graph's journal (`RH-3`) and the focus holder's `entries` (`RH-4`). A fifth
(`writes`, `RH-6`) has no cap but is bounded in practice by the wiring going inert at the first
re-derivation.** **Everything else in the table is either capped (the dedup LRU at 128, the upload
queue at 1000, the app journal at `maxJournalLength` when set) or replaced rather than accumulated
(the pane snapshots, the id index, the render baselines, the gate object).**

---

## §5. The flow of a value, end to end

**Four walks. Every hop carries `file:symbol` and a layer label.** `[T]`/`[H]`/`[U]`/`APP` per the
legend; **the last hop of a walk is labelled with the layer that could OBSERVE it**, which is often
not the layer that produced it.

### §5(a) — an MCP `dispatch` call that mutates authored state

*The walk runs from the HTTP request to the rendered DOM and the notification push. **The
`[U]`/APP half of this walk — that a human sees the change — was not observed by this pass.***

1. **`[H]`** A client POSTs JSON-RPC to `http://127.0.0.1:<port>/mcp` → Node's `http` server →
   `src/main/mcp-server.ts` `ProvidentMcpServer.start`'s `createServer` callback →
   `ProvidentMcpServer.handleHttp`. *(Or, on stdio, the long-lived `StdioServerTransport` from
   `start`'s first branch.)*
2. **`[H]`** `handleHttp`: the path guard (`/mcp` else 404), the method guard (GET/DELETE → 405),
   then **the token gate — `this._gate.checkRequest(req.headers)` — which rejects with 401 BEFORE
   any tool runs** (`mcp-endpoint.md` §6's fail-closed rule).
3. **`[H]`** `createServer()` — a **fresh** `McpServer` **per POST** (the SDK's stateless pattern),
   `httpServers.add(server)`, then `registerTools(server, backend, this.allowedToolNames(), …)`:
   one closure per allowed tool, and `this.registered.set(name, handle)` into the **shared**
   `registered` map. `registerResources` does the same for the `read`-group resource.
4. **`[H]`** `readBody(req)` → `transport.handleRequest(req, res, body)` → the SDK routes
   `tools/call` to the `provident.dispatch` handler closure.
5. **`[H]`** The handler builds a `DispatchRequest` (`{target, event, args?, requestId?}`) and calls
   `backend.invoke('dispatch', req)` → `RendererBackend.invoke`: **the readiness gate**
   (`readyPromise` raced against the 30 000 ms `readyTimeoutMs`), then `seq++`, a `pending` entry
   with a 60 000 ms timer, then `win.webContents.send('provident:invoke', req)` — **the channel name
   written as a LITERAL here while the preload subscribes with the `IPC_INVOKE` constant** (layer 1
   `F-8`).
6. **`[H]`** The preload's `onRequest` listener (`src/main/preload.ts`, registered once per realm)
   hands the request to the renderer's handler installed in `renderer.ts` `main()`.
7. **`[H]`** `src/renderer/renderer.ts` `handleRequest` — the `switch` on `req.method`. `'dispatch'`
   → `await runtime.dispatch(req.payload)`.
8. **`[H]`** `Runtime.dispatch` → `resolveTarget(req.target)` (engine nodeId → `cssIndex` → a
   `cssIndex`/`propsIndex` walk; the two-holder shape is layer 1 `F-5`) → `nodeId === null` throws
   `unresolved target`.
9. **`[T]`** `supervisor.dispatchAndReport(nodeId, event, {requestId?}, ...args)` — the engine's
   shared host surface: **the opt-in dedup is consulted SYNCHRONOUSLY at call entry** (a duplicate
   within 128 entries and 10 s returns the first caller's report — the LRU of `§1` row 5), the
   reentrancy guard keys `event:<event>:<node.id>`, then `dispatchEvent(node, handlerContext, …)`
   runs the **authored** handler bodies, `await this.flush()` settles the pass-2 cascade, and
   `takePass2States()` drains the pass-2 slice — **`dirtied` = the union of the op results' dirtied
   sets and the drained state keys**.
10. **`[T]`** The authored handler body (a function STRING compiled at translate; **the CSP
    `'unsafe-eval'` carve-out is what lets it run** — `mcp-endpoint.md` §4.3 `P-C3`) mutates node
    content through the client API. The mutation is journaled (`journalIfApplied` → `journal` +
    `undoStack`, `redoStack` cleared).
11. **`[H]`** Back in `Runtime.dispatch`: for each dirtied id, `supervisor.getResolvedStates(id)`
    refreshes `Runtime.prevStates` (the **non-draining** resolved store — the renderer's baseline).
12. **`[H]`** `Runtime.render()` → `mergePass2()` → the actionable set is re-collected, ids whose
    node has left the registry are pruned, `adapter.beginBatch()` → `renderProducingProcess(...,
    this.adapter, this.domPrevMap, {nodeIdAttribute: true})` → `applyOps` (the minimal diff;
    `data-node-id` on every element) → `adapter.endBatch()` → **the live DOM is mutated** → then the
    **same** actionable set is re-emitted through the `SSRFragmentAdapter` for parity (`P-E2`,
    `mcp-endpoint.md` §3.2).
13. **`[H]`** The result (`results`, `dirtied`, `renderedHtml` = `mount.innerHTML`, `ssrHtml`) is
    returned to `handleRequest`, which **also pushes the notification**: `if (reply.ok &&
    MUTATING_METHODS.has(req.method)) notify({uri: 'mcp://provident/app'})` — `MUTATING_METHODS` has
    7 members and `'dispatch'` is one.
14. **`[H]`** `.then((reply) => { panels?.refreshDebug(runtime); … })` — **the Debug pane re-reads the
    APP graph's census + SSR preview on every reply** (and `syncConfig` inside `refreshDebug`
    journals on the **pane** graph: `§4`'s unbounded row).
15. **`[H]`** `bridge.sendReply(reply)` → `IPC_REPLY` → `main.ts`'s listener → `backend.handleReply`:
    delete the `pending` entry, clear its timer, `maybeDigest` (an over-`largePayloadBytes` result
    crosses as `{census, digest, preview, truncated}`) → the awaiting `invoke` resolves.
16. **`[H]`** The notify path **in parallel**: `bridge.notify` → `IPC_NOTIFY` → `main.ts`'s listener
    (**which never reads the payload**) → `mcp.notifyGraphChanged()` → **`[H]`** stdio-only (the HTTP
    transport is stateless, so it is a no-op there) and gate-aware (`read` must be enabled) →
    `stdioServer.server.sendResourceUpdated({uri:'mcp://provident/app'})`.
17. **`APP`** *What a human sees.* **Not observed in this pass.** The `ui` leg's own honest-limits
    row says a `ui` green would not prove it either: *"NOT app-green from node-green … NOT that
    `get_rendered_html` observes layout (it reads `mount.innerHTML`)"* (`scripts/electron-ui.mjs`
    `R4`, `docs/specs/ci-ui-leg.md` §3.0 `R4`).

### §5(b) — a real gutter drag

*Pointer down → session establishment → per-move value → the one commit → the persisted layout, if
any. **`[U]` is required for every rendered claim in this walk; none was taken.***

1. **`[U]`/APP** A human presses the **handle element** — the element the engine emitted for
   `GUTTER_AFFORDANCE_ID` at the boot render, resolved once by `Runtime.elementForNodeId` in
   `src/renderer/renderer.ts` `startGutterAffordance`.
2. **`[T]`** Four listeners fire on that element: the affordance's `pointerover` (`onHoverEnter`) and
   `pointerdown` (`onPointerDownTurn`) turns, and — registered at *attach* time, hence **before** the
   tracking listeners a gesture adds — the affordance's `pointermove` turn; the fourth is the
   session's install listener (registered inside `controller.attach` → `session.install`, i.e.
   **between** the affordance's non-move registrations and its move registration).
3. **`[T]`** The session's install handler → `beginOperation(element)`: a busy/disposed/not-installed
   refusal is a closed-domain code; otherwise the record is built, the **three tracking listeners are
   attached and CHECKED** (a refusal rolls back the successful attaches), the optional capture call
   is made (**the app's `domEventSource` advertises no `capturePointer`, so this is the declared
   degradation — zero calls**), then the `onStart` hook chain runs.
4. **`[T]`** The controller's `wrappedOnStart` → `tokenFor` → `decisionFor` → the affordance's
   `tokenFor` closure **seeds the per-gesture `DragRecord`** (the token the axis producer answered)
   and `decisionFor`/`isResizable` reads the caller's resizability seam once; then the affordance's
   `onStartHook` reads `startSizeOf(element, token)` **exactly once per gesture** and `boundsOf`
   once, and takes the pre-drag revert reading.
5. **`[U]`** Pointer moves. On the same element, the affordance's own move turn runs **first** (it was
   registered at attach; the session's tracking listeners came later at establishment): it resolves
   the pointer (`resolveEventPointer` over `clientX`/`clientY` — **the family's ONE coordinate read**),
   reads `boundsOf` and `sizeFromPointer`, and clamps through the family's ONE clamp
   (`src/shared/gutter.ts` `clampToBounds`); a **non-finite** value is never previewed; the validity
   rule has four clauses (pointer resolved, finite value, no exact-`false` veto, and the caller's
   `isDragValid` never overrides a resolution failure).
6. **`[U]`/`[H]`** The preview: `applyPreview(state)` — the wiring's closure — writes
   `target.style.setProperty('width', …)` on **the target element** (the declared transient
   inline-style write, `docs/specs/gutter-ui.md` §2.5 item 4). **This is the only write in the walk
   that lands on a DOM element rather than in the graph** — and its observable layer is `[U]`.
7. **`[T]`** The session's own move turn then runs (it was registered later), reaching the
   controller's `wrappedOnMove` → the affordance's `onMoveHook` → `gesture.set(value)` — the value
   channel, once per VALID move.
8. **`[T]`** Pointer up → the session's `finish` tracking handler → `endOperation` →
   `handleIsCurrent` → `runTerminal(record, element, value, 'end')`: **`detachTracking` first** (all
   three tracking listeners off), then `record.active = false`, `slot = null`, then the `onEnd` hook
   = the controller's `wrappedOnEnd` → it computes the narrowed value (via the size/bounds seams) and
   writes **once** — `write(gesture, narrowed, suppliedSet)` → `commit(gesture, narrowed)` = the
   affordance's `commit` seam = the wiring's `commit` = `write(value)`.
9. **`[H]`** `write(value)` → `runtime.applyCommand({kind:'state-slice', node: GUTTER_STATUS_ID,
   mutation:[{targetProp:'content', mode:'replace', value}]})` — **the authored id STRING, never the
   element** (the `L-5`/`ADV-GU-1` fix) → the runtime's shape guards → `supervisor.apply` → the
   op is journaled → the dirtied node re-compiles → `prevStates` → `Runtime.render()` → the
   authored `gutter-status` node's `content` reaches **both** views.
10. **`[H]`** The returned `{status}` is **kept** in `writes` (one entry per commit, refusals
    included; a refusal also `console.error`s). **The handle that would expose `writes` is
    discarded** by `main()` (`RH-6`).
11. **`[H]`** **Persisted layout: NONE.** The commit writes the graph only. **Nothing in this repo
    persists a layout, a pane size or a focus** — `docs/decisions.md`
    `NO-FOUNDATION-CONFIG-FILE-FACILITY` clause 1 and layer 1's `§5` absence row **`A-6`** (*"no persisted
    layout, no persisted focus, no persisted journal, no persisted window geometry, no persisted
    theme"*), and the two files that
    do exist are `provident-security.json` and `provident-modules.json`. **A restart reconstructs
    the demo's authored `size`/`min`/`max` props** (`src/shared/demo-envelope.ts`'s gutter card) and
    the committed value is gone.
12. **`APP`** *What the operator sees* — the target's width following the pointer, and reverting on
    the reset/cancel/drop arms. **Not observed in this pass, and not observable node-side** (`§7`).

**THE TWO ARMS THAT DIVERGE, NAMED SO THE WALK IS NOT READ AS THE ONLY PATH.** An **invalid** move
takes `resetArm` → `controller.reset(element)` → the session's `reset` terminal (one commit of the
**supplied** pre-drag value, while the gesture is still active) + a visible revert; a **secondary
press during an observed drag** takes `dropArm` → the affordance writes the pre-drag revert, discards
its record, and lets the session's own `end` terminal commit — **still exactly one commit**.

### §5(c) — a window/renderer reload

1. **`[H]`** The reload starts in main: `win.webContents`' `did-finish-load` fires →
   `RendererBackend.attachWindow`'s `rearm` closure → the `firstLoadSeen` guard (**the FIRST
   `did-finish-load` is the initial load and is skipped**) → `handleReset('renderer reloaded (pending
   cleared)')`: **every in-flight `pending` entry is rejected** (its timer cleared), `ready = false`,
   the current `readyPromise` is **rejected** and a **fresh one** is minted.
2. **`[H]`** **What is RE-READ.** The renderer side starts over: a fresh realm evaluates
   `renderer.js` → **`bridge.security.get()` is read again** (`renderer.ts` `main()` — *the only
   renderer-side read of the persisted config*), so **a reload CAN pick up a changed
   `maxJournalLength` where a graph `load` cannot**: the new `Runtime` is constructed with it and
   passes it to every `Supervisor` it will ever build. The module store is **not** re-read by the
   renderer (`module.get()` is read only by the panes, on their own refresh).
3. **`[H]`** **What is RE-DERIVED.** A **brand-new** `Runtime` (translate + `Supervisor` +
   `DomAdapter` + first render), a **new** `startGutterAffordance` wiring (session, controller,
   affordance, four listeners, a fresh empty `writes`), and a **new** `SecurePanels` (its own
   isolated scope, hub, Supervisor and adapter). **The reload is the ONE event in this tree that
   re-establishes the wiring** — which is exactly why `RH-2` is invisible without one.
4. **`[H]`** **What is LOST.** Every renderer-side value: the whole graph (rebuilt from
   `demoEnvelope()` — **any runtime `code.set` edit lived only in the realm's envelope clone, layer 1
   `§2.3`/`§2.5`**), the focus holder's `entries` (the module-level `holder` goes with the realm), the
   `writes` record, the pane graph and its journal, the id index, the render baselines, and **all
   renderer-held retained state including the engine's `finalizeHooks` array** (the engine is bundled
   into `renderer.js`, so its module-level registries are **per realm** — the reload is what finally
   releases `RH-1`'s accumulation).
5. **`[H]`** **What does NOT change.** Main's process-level state: the two stores, the
   `CapabilityRouter`, the MCP server and its registration (stdio; HTTP rebuilds per POST anyway),
   the four `ipcMain.handle` + three `ipcMain.on` registrations, the window listeners, and the
   `seq` counter. **`firstLoadSeen` stays `true`**, so every subsequent `did-finish-load` is treated
   as a reload.
6. **`[H]`** The new realm re-arms the backend: `bridge.ready()` → `IPC_READY` → `backend.markReady()`
   → the fresh `readyPromise` resolves and later `invoke`s proceed. **An ordering question this pass
   did NOT measure and does not settle:** *if a realm's `ready()` were to land BEFORE its
   `did-finish-load` fires, the reset would clear `ready` afterwards and the next `invoke` would wait
   out the 30 000 ms readiness timeout.* **The code shape is stated; the race is not claimed.**
   (The renderer's `ready()` sits at the end of an async `main()` behind one IPC round-trip, which is
   why this pass does not predict the outcome either way.)
7. **`APP`** That the reloaded window paints the same app. **Not observed.**

### §5(d) — a module install/update through the module store

1. **`[H]`** **The route that exists:** the MCP tool `module.install` / `module.update`
   (`src/main/mcp-server.ts` `ALL_TOOLS`; **registration requires BOTH `module` and `code`** —
   `registeredToolNames`'s two-gate — and the same two-gate is re-checked on the live re-gate).
   **The route that does NOT exist:** a UI control. The pane's module half is **display-only** — the
   `IPC_MODULE_SET_DISABLED` handler and `moduleStore.setDisabled` are live, but `SecurePanels`
   `refresh()` calls only `module.get()` (layer 1 `F-3`, the recorded `U8 §4 F2` residual).
2. **`[H]`** The tool handler in `main`'s `registerTools` closure: **`module.*` tools are handled in
   MAIN**, never routed to the renderer (the store is `node:fs`), so this walk never crosses IPC.
3. **`[H]`** `handleModuleTool(moduleStore, name, args)`: name/source required; `version ?? '0.0.0'`;
   for `install` a same-version re-install is a **no-op** and a different version is **rejected**
   without `force: true`; then `parseCapabilities(source, args.capabilities)` — a best-effort parse
   of a `{…}`-shaped manifest, falling back to the `capabilities` argument — and `store.put({name,
   version, source, capabilities})`.
4. **`[H]`** `module-store.ts` `put`: re-validates name/version/source, **derives `hash =
   sha256(source)` and never trusts an input hash**, timestamps `installedAt` with a clock read,
   `records.set(rec.name, rec)`, deletes the name from `quarantinedAtBoot`, then `persist()`:
   `mkdirSync` + write to `<path>.tmp` + **`renameSync`** (the atomic replace — the module store's
   half of the pair; the security store's `persist()` is a plain `writeFileSync`, layer 1 `§3`).
5. **`[H]`** Back in the handler: on `status === 'installed' | 'updated'` it calls
   `syncModuleRouter(router, moduleStore)` → `router.clear()` → for each **active** (not disabled,
   not quarantined) module with declared tools, `router.registerModule(name, entry)` → the entry
   registers one tool per declared name with a **pass-through echo handler** (`(args) => ({tool:
   fullTool, args})`) and `registerModule` mints **one `uploadQueue` buffer per registration**
   (`MAX = 1000`, drop-oldest).
6. **`[H]`** **The registry is now re-synced; the live server is not.** The **next** MCP server build
   registers the new names: on **HTTP** that is the next POST (`createServer` per request), on
   **stdio** it is **only** the widen path of `applyGatePatch` — **a runtime install or a
   `setDisabled` toggle does not re-register the long-lived stdio server's tools by itself**
   (`RH-9`). `module.list` and the pane's list text reflect the store immediately.
7. **`[H]`** **The next load:** the app graph's `load` path does **not** touch the module store or the
   router at all — the module registry has no relationship to the graph generation. A `load`
   therefore neither re-syncs nor re-registers modules; only boot, `IPC_MODULE_SET_DISABLED` and a
   successful install/update do.
8. **`[T]`** **What is never evaluated, stated because the flow section must not omit it:** the
   module's own `source` is **not** evaluated anywhere in this wiring — `syncModuleRouter`'s own
   comment says *"the module's `entry` source … is NOT evaluated here … Full entry execution is a
   documented follow-on (the eval of the source body)"*, and the registered handler is the echo
   above. `docs/specs/module-feature-list.md` §3's `U9` row records *"dynamic module-tool live
   re-register + namespacing"* as **LANDED**; the echo handler is what "registered" means at the
   bytes today. **This is a flow observation, not a re-derivation of layer 1 `F-2`** (which is about
   the renderer-side `transformRouter`/`captureProvider`/`runHooks` carriers having no shipped
   consumer).
9. **`APP`** Nothing in this walk has an app-only hop; its last hop is a tool list, which is
   `[H]`-observable over MCP.

---

## §6. Retention hazards, ranked

**Each hazard: what it is, the retaining reference, the evidence site, the layer, what it costs,
and a falsifier a later pass can run. `Theoretical` means the mechanism is demonstrated by the code
but this tree's current traffic does not reach it; `demonstrated by the code's shape` means the code
carries the hazard structurally and no configuration removes it. **No hazard here is a measurement
of memory.***

| # | Hazard | The retaining reference | Evidence site | Layer | What it costs | **Falsifier** |
| --- | --- | --- | --- | --- | --- | --- |
| **`RH-1`** **(HIGH — demonstrated by the code's shape)** | **Every `Supervisor` the host ever builds except the live one is pinned by the engine's module-level `finalizeHooks` array, because this host never calls `Supervisor.dispose()`.** | `ENGINE core/registry.js` `finalizeHooks` (an array) — the hook pushed by `Supervisor`'s constructor (`onNodeFinalized`), spliced out **only** by the hook's own unsubscribe, which `dispose()` calls. The hook closes over the Supervisor, which reaches `nodes`, `destroyedRefs`, `journal`, `undoStack`/`redoStack`, `resolvedStates`, `pass2States`, `dispatchDedup`, `hub`, `events`, `client`, `handlerCtx`. | `ENGINE core/registry.js` `onNodeFinalized`/`finalizeHookCount`; `ENGINE core/supervisor.js` `Supervisor.constructor` (the `finalizeUnsub` assignment) and `Supervisor.dispose`; **the host's construction sites**: `src/renderer/runtime.ts` `Runtime.constructor` · `loadEnvelope` · `loadDoc` · `validateExport` · `validateSig`; `src/renderer/secure-panels.ts` `SecurePanels.constructor`; **and the absence**: grep for `dispose()` over `src/**` returns **no `Supervisor` call site** (only `gesture-session`/`slot-host`/`owned-list-host` member declarations). | `[T]` mechanism · `[H]` non-call | **A whole discarded graph per `load`** (every Node, the journal's payloads, the resolved states with their live circular anchors, the hub and its links), **two throwaway graphs per `provident.validate`**, plus an **O(N) hook scan on every node finalization**. **No correctness divergence** — the hook's own guard (`this.nodes.get(node.id) === node`) makes a stale hook inert for another graph's nodes. | **Node-side and runnable:** in a shim-hosted realm (`src/shared/dom-shim.ts` `installShim`), read the package's exported `finalizeHookCount()` before and after **1** `new Runtime(...)`, then after each of `N` `loadEnvelope` calls, then after **one** `provident.validate`. **Predicted by this read: `1`, then `1 + N`, then `1 + N + 2`.** A later pass that runs it either confirms the count or falsifies this hazard. |
| **`RH-2`** **(HIGH — demonstrated by the code's shape; the APP half is `[U]`/APP territory)** | **The gutter wiring is BOOT-ONLY.** `startGutterAffordance` resolves its two elements once and is called once; a re-derivation detaches those elements and mounts fresh replacements the wiring never sees, so the affordance's live DOM listeners are attached to detached nodes. | the affordance's `element`/`target` closure variables ← the four listeners on the **old** handle element; the controller's `entries[].element`; the session's `entries[].element` (its install listener is never detached). | `src/renderer/renderer.ts` `startGutterAffordance` (`runtime.elementForNodeId` ×2, `affordance.attach()`) and its single call site in `main()`; `src/renderer/runtime.ts` `loadEnvelope`/`loadDoc` (tear down + re-render) and `resetRenderState`/`reconcileMount`; `source of the detach`: `src/renderer/runtime.ts` `tearDownGraph` → `ENGINE core/render-helpers.js` `diffMinimal`/`applyOps` → `ENGINE core/adapters.js` `removeEl`. | `[H]` (the wiring's shape and the boot-only call site) · **`[U]`/APP for every visible consequence** | (a) **`writes` is unreadable for the rest of the realm** — its only reader is the discarded handle; (b) **the retained detached elements** (2 per re-derivation, plus their listener closures and the whole affordance chain) while the mount carries replacements; (c) **APP: after any `load`/`code.load`, a real drag on the re-rendered gutter is inert** — a claim **this pass did not and could not observe**. | **`[U]` falsifier (needs a live boot, not node):** boot the app, dispatch a synthetic `provident.code.load` (or `load`) over MCP, then perform a REAL pointer drag on the re-rendered handle and read `provident.get_rendered_html`'s `gutter-status` content — **a commit that never lands (or a preview that never moves) confirms the hazard; a landed commit falsifies it.** A node-side half is available only with a new seam: the wiring exposes no way to read the element it holds. |
| **`RH-3`** **(HIGH — demonstrated by the code's shape)** | **The pane graph's journal has NO CAP and is fed by ordinary app traffic.** `SecurePanels` builds its Supervisor with `{events, graphScope}` and **no `maxJournalLength`**, so condense never fires; `refreshDebug` → `syncConfig` applies one `state-slice` per mutated pane node — and `refreshDebug` runs **after every MCP reply**. | `SecurePanels.supervisor.journal` / `undoStack` (per the engine, every applied op is journaled), reachable from the `SecurePanels` instance the bridge closure holds. | `src/renderer/secure-panels.ts` `SecurePanels.constructor` (the two-option call) and `syncConfig` (one `apply` per node with a mutation) and `refreshDebug`; `src/renderer/renderer.ts` `main()`'s `bridge.onRequest` → `.then((reply) => { panels?.refreshDebug(runtime); … })`; **the spec authority that pins the constructor's shape**: `docs/specs/secure-panels.md` (the own-`Supervisor` clause) — **and the absence: no section and no decision row records a cap for the pane graph's journal.** | `[H]` | **Unbounded journal + undo stack growth proportional to `(MCP calls × mutated pane nodes)`, plus two IPC round-trips and a full pane re-compile + render per MCP reply.** Every pane mutation is also journaled into a stack **nothing ever reads** (the pane graph exposes no undo surface). | **Node-side, needs one seam:** drive `SecurePanels.refreshDebug` `N` times and read the pane supervisor's `undoDepth` (the engine exposes `undoDepth`) — **the instance is private today, so the honest form is: `applyPaneMutation` + `debugText()` are the shipped seams and NEITHER reads the journal; the falsifier therefore needs a read-only journal accessor on `SecurePanels` (a test-side seam) or an engine-side count taken in a test that constructs the pane graph itself.** Predicted by this read: `undoDepth` grows by one per mutated pane node per `refresh`. |
| **`RH-4`** **(MED–HIGH — demonstrated by the code's shape)** | **The focus holder's `entries` grows by one per distinct caller `target` and NOTHING in the app removes an entry.** | the module-level `holder` binding (`const holder: { state: FocusState }`) in `src/renderer/renderer.ts`, reassigned by `answerForHolder(result)` to the fresh state the model returned; each entry is **the caller's own object**. | `src/renderer/renderer.ts` `resolveForHolder` (**only `'open'`/`'activate'` are chosen**), `focusRoute`, `answerForHolder`, `carriedEntryIds`; `src/shared/focus-model.ts` `focusTransition`'s `'open'` arm (`entries.concat([entry])`) and its `'close'` arm (**implemented, unreachable from the app**); **the spec authority**: `docs/specs/focus-tool.md` §2.1 item 6 / §2.3 items 1/2/5 (the holder is the live authority; the CALLER's string is the legal entry id); **the absence: no cap is recorded** — layer 1 `§2.4` names the holder and `F-4` its inert sibling, and neither records a bound on `entries`. | `[H]` | **An agent (or a UI client) can grow the renderer's focus state without bound, one caller-supplied record per new target, for the realm's whole life** — and a graph `load`/`teardown` does not clear it (deliberately: the holder is not a graph slice). The same path also makes the **answer** grow: every `focus` reply carries **every** entry id (`carriedEntryIds`), so the reply size grows with the accumulated set. | **Node-side and runnable today:** `renderer.ts` `handleRequest` is exported, so a test can drive `handleRequest(runtime, {id:1,method:'focus',payload:{target:'t1'}}, () => {})` … for `N` distinct targets and read `value.entries.length` from each reply. **Predicted by this read: `N` after `N` distinct targets, and `N` still after an intervening graph `load`.** |
| **`RH-5`** **(MED — demonstrated by the code's shape; one class theoretical for this tree)** | **The engine's default-scope registries never release the discarded generation's root — and, for an envelope carrying def bindings, never release per-translate prototype entries at all.** | `ENGINE core/registry.js`'s scope maps: `registered` (Set) and `byId` (Map) — added by `registerNode`, removed **only** by `evictDestroyedNode`; `defPrototypes`/`defRootPrototypes` — `Map`s keyed by **the component LINK object**, written by `translateLegacy` on every translate, **with no delete site in the engine**. | `ENGINE core/registry.js` `createScope`/`registerNode`/`evictDestroyedNode`; `ENGINE core/node.js`'s Node construction calling `registerNode`; `ENGINE core/translate.js` `registerDefRootPrototype`/`registerDefPrototypes`; **the host's skip site**: `src/renderer/runtime.ts` `tearDownGraph` (**`n.id === this.rootNode.id` is skipped, and `!n.isInTree` nodes are skipped**). | `[T]` + `[H]` | **One former ROOT node (with its links and its hub) per `load`, pinned forever in a module-level Set/Map**; the same for any never-destroyed unplaced node; and, **if an envelope ever carries def bindings**, one prototype entry pair per def Link per translate. **The def-binding half is `THEORETICAL` for this tree today**: the demo envelope carries **no** `def`/`component`/`anchors`/`bindings` key (read), so the class is reachable only through an agent-authored envelope. | **Node-side:** the default scope's maps have no public accessor, so the honest falsifier is **an engine-side count taken inside a test that constructs Nodes directly** (e.g. count live entries of the default scope around `N` `translateLegacy` calls with a def-bearing envelope, and around `N` `Runtime` loads), or a package-side `scopeSize()`-shaped accessor if one is ever added. **Predicted by this read: entries grow by one root per load and by one entry pair per def Link per translate; nothing ever removes them.** |
| **`RH-6`** **(MED — demonstrated by the code's shape)** | **The wiring's `writes` record has no cap, its only reader is discarded, and the wiring keeps writing into it for as long as its element is live.** | the wiring's `write` closure ← the affordance's `commit` ← the controller ← the session ← the handle element's listeners. | `src/renderer/renderer.ts` `startGutterAffordance` (`const writes: Array<…> = []`, the `push` inside `write`, and the **discarded return** at the single call site in `main()`); `docs/specs/gutter-ui.md` §2.1 item 8(v) and `L-5`/`ADV-GU-1` (the row that made refusals *visible* — the array's purpose). | `[H]` | One record per committing terminal (refusals included) retained for the realm's life; the diagnostic it exists for is **unreachable through the shipped app** (the return value is thrown away), so the array is write-only state. | **Node-side and runnable:** call `startGutterAffordance`-shaped wiring in a shim realm (or use the exported `startGutterAffordance` against a shim-hosted Runtime), drive `N` commits through the affordance, and read `writes.length`. **Predicted by this read: `N`, with no bound.** |
| **`RH-7`** **(LOW–MED — demonstrated by the code's shape)** | **The `DomAdapter` outlives every graph generation and two of its containers are never cleared: `stylesSeen` (the rule-dedup Set) and the single `<style id="preempt-dynamic-styles">` element it appends to `document.head`.** | `Runtime.adapter` — a `readonly` field created **once** in `Runtime.constructor`; `resetRenderState()` re-creates the SSR adapter but **reuses** the DOM adapter. | `src/renderer/runtime.ts` `Runtime.constructor` (the adapter field), `resetRenderState` (what it does and does not recreate); `ENGINE core/adapters.js` `DomAdapter.stylesSeen` / `ensureStyles` / `styles` (**the append is additive text onto one element; there is no removal path**). | `[H]` + `[T]` | The dynamic-styles element grows text per distinct rule across every generation; `stylesSeen` grows one entry per distinct rule string per realm. **The shim cannot show it**: `src/shared/dom-shim.ts` `shimDocument.head.appendChild` is a **no-op**, so a node-side run observes `stylesSeen` only through the adapter's own field (private). | **`[U]` or a spy-adapter falsifier:** boot the real renderer, load envelopes carrying **different** `cssDef` rules `N` times, and read the `#preempt-dynamic-styles` element's `textContent` length (a real DOM is required: the shim's `head` is inert). A node-side half exists only with a test adapter that records `ensureStyles` calls. |
| **`RH-8`** **(LOW)** | **On stdio, a module installed or disabled at runtime re-syncs the router but does NOT re-register the long-lived server's tools; on HTTP the next POST picks them up.** (Not a leak — a **staleness** hazard in the MCP request path's handles.) | `ProvidentMcpServer.registered` (the handle map) — written by `createServer`'s `registerTools` and by `applyGatePatch`'s widen path; **not** by the install handler. | `src/main/mcp-server.ts` `handleModuleTool`'s caller (the `module.` branch of `registerTools`'s handler: it calls `syncModuleRouter` only), `syncModuleRouter` (`router.clear()` + `registerModule`), `applyGatePatch` (the widen path — the ONLY site that registers newly-allowed names onto `this.stdioServer`), `createServer` (per POST on HTTP); `src/main/main.ts` `ipcMain.handle(IPC_MODULE_SET_DISABLED)` (same: re-sync only). | `[H]` | A newly installed module's declared tools are absent from `tools/list` on stdio until the next gate patch or restart; a disabled module's tools **stay registered** until then (their handlers still route through `invokeTool`'s per-call two-gate, so the refusal is enforced at the call, not at the listing). | **Node-side and runnable:** with a stdio-configured server, call `ensureServerRegistered()`, install a module declaring one tool, then read `registeredEnabled('module:<name>.<tool>')` — **predicted `false` until an `applyGatePatch`**; then call `applyGatePatch({groups:['module','code']})` and read it again — **predicted `true`**. |
| **`RH-9`** **(LOW)** | **A skipped condense re-schedules on every subsequent applied op**, so a graph whose journal is over the threshold but whose base is not smaller pays an O(graph) `serializeSlice` **and one `console.warn` per op**. | the engine's own state: `journal.length > maxJournalLength` in `journalIfApplied` → `scheduleCondense` (guarded by `condenseScheduled` for one microtask) → `condense`'s size guard returns without rewriting. | `ENGINE core/supervisor.js` `journalIfApplied` / `scheduleCondense` / `condense` (the `baseBytes >= journalBytes` branch); the host's threshold source: `src/renderer/renderer.ts` `main()` → `Runtime.maxJournalLength` → every `new Supervisor`. | `[T]` | A per-op O(graph) cost and unbounded console output (which, in Electron, is the main process's log stream) for as long as the journal exceeds the threshold and the base is not smaller. **`THEORETICAL` for a default-configured app** (`maxJournalLength` unset ⇒ condense never fires at all — layer 1 `F-9` is the doc-claim half of that fact); reachable as soon as an operator sets a short threshold on a big graph. | **Node-side and runnable:** construct a `Supervisor` with a small `maxJournalLength` over a large graph, apply `N` ops, and count the `condense-skipped-size` warnings (a console spy) and the elapsed time. |
| **`RH-10`** **(LOW)** | **A pending condense fires on a supervisor that a `load` has already discarded**, running `condense()` (and paying the O(graph) serialize) on a graph nothing references — the one path where the discarded generation is *mutated* after its holder is gone. | the pending `setTimeout` closure from `scheduleCondense` (a `setTimeout(…, 0)`), which retains the discarded Supervisor until it fires. | `ENGINE core/supervisor.js` `scheduleCondense`; the host's discard site: `src/renderer/runtime.ts` `loadEnvelope` (the `this.supervisor = new Supervisor(...)` line). | `[T]` | Brief (one task turn) but it is the mechanism by which a discarded graph is **written to** after the load — and, combined with `RH-1`, the timer's own closure is one more path to the discarded object. | **Node-side:** schedule a condense (apply enough ops to cross a small threshold) and immediately call `loadEnvelope`, then assert that the discarded supervisor's journal was rewritten (needs the pre-load handle — the runtime replaces it, so the honest form is a direct `Supervisor` drive outside the Runtime). |

| **`RH-11`** **(LOW)** | **`ProvidentMcpServer.registered` and `resources` are SHARED across HTTP servers while HTTP builds a fresh server per POST**, so `createServer` **overwrites** the same keys with the newest server's handles — a re-gate during a concurrent POST toggles only the newest handles, and the older in-flight server keeps its own (stale) enabled state until its response closes. | the two `Map` fields on `ProvidentMcpServer` (process-lived), written by every `createServer`/`registerTools`/`registerResources` call. | `src/main/mcp-server.ts` `registered`/`resources` field docs, `createServer`, `registerTools`, `registerResources`, `applyGatePatch`'s toggle loops, `handleHttp` (a `createServer` per POST into `httpServers`). | `[H]` | Not a memory leak (the maps are key-bounded). **A staleness hazard for the manual-UI re-gate on a stateless transport**: the gate *config* is right, the *live handle* set can be one POST behind. On stdio there is exactly one server, so the hazard does not arise there. | **Node-side and runnable:** with an HTTP-configured server, call `createServer` twice (over `handleHttp`'s path, or the equivalent in a test), capture the first server's handle for one tool, then `applyGatePatch({disable:['read']})`, then read `registeredEnabled`/`resourceEnabled` — **predicted: the shared map reports the SECOND server's handle, and the first server's tools are untouched.** A test that holds a reference to the first `McpServer` and inspects its registry shows the divergence. |

**THE HONEST RANKING NOTE.** **`RH-1`, `RH-2` and `RH-3` are ranked HIGH because each is
unconditional for ordinary app traffic** (a `load`, a `code.load`, or a pane refresh — all three are
agent-reachable through documented MCP tools), **not because a memory figure was measured.**
**`RH-2` is the one hazard whose most important half is a CORRECTNESS fact rather than a memory fact**
(the shipped gutter is a boot-only wiring), and **its APP half is explicitly not this pass's
evidence**.

---

## §7. What cannot be established node-side

**This repo's node layer holds no DOM, no layout engine and no GC instrumentation.** The
consequences, each with the clause that forbids asserting it here:

1. **"The element is not released."** — **Cannot be asserted here.** The claim is about a real
   browser's reachability and, ultimately, about collection. **Two clauses forbid it:** (a) the
   **standing geometry-unprovable clause** — `docs/specs/zones.md` §0 ruling 6 and
   `docs/specs/census.md` §0 ruling 6 carry `A-d4`'s mandatory wording verbatim: *"the arithmetic is
   provable here; **any claim about the rendered geometry is UNPROVABLE in this repo today** — it
   belongs to the `ui` leg's business and to no node-green"* (also `docs/specs/projection.md` §2.5,
   `docs/specs/container.md` `R-6`, and `S-d11` in
   `docs/specs/provident-electron-shell-chrome-handoff-review.md`), and `docs/specs/projection.md`
   `S-1` gives the **disposition rule** — a row that cannot be falsified on `[T]` *"moves to §7 as
   `UNPROVABLE AT THIS LAYER`; it may not be moved to the `[U]` leg silently"*; and (b) the **`ui`
   leg's own rules** — `docs/specs/ci-ui-leg.md` §3.3 `C-7` and §3.0 `R4`: a `ui` green is **not** *"a
   rendered-geometry proof, an IPC proof, or a proof that any particular attribute row passes"*, is
   **not** *"app-green from node-green"*, and **not** a proof *"that the packaged app behaves this
   way"*. **There is no leg in this repo that measures reachability at all** — so `RH-2`'s visible
   consequence, `RH-1`'s memory cost and `RH-7`'s style-element growth are **all beyond every
   green this repo can currently produce.**
2. **"The listener table of a real browser holds exactly N listeners."** — **Cannot be asserted
   here**, and the contract already says so: `docs/specs/gsession.md` §2.3 item 5's limit — *"a
   listener-count green is NOT a listener-removal green in the engine's own retained map … this
   unit's rows assert the CALLS the session made against the injected source, never a fact about a
   real browser's listener table"*. **`§3` obeys this; nothing in it claims a browser table.**
3. **"The shim's `remove()` frees the element."** — **Cannot be asserted here.** `[X]` is a bookkeeping
   shim with no engine and no collector: `src/shared/dom-shim.ts` `ShimElement.remove` splices the
   child out of `parent.children` and sets `removed = true`, **and the shim's own `head` is inert**
   (`shimDocument.head.appendChild` is a no-op), which is why `RH-7`'s falsifier cannot be run on
   `[X]` at all. The shim's scope is bounded by `H-r5`/`S-d3` (no expansion) and
   `docs/specs/ci-ui-leg.md` §0 prohibition 6.
4. **"A real gesture commits."** — **Cannot be asserted here on ANY layer this repo owns**: `S-d9`
   (`docs/specs/provident-electron-shell-chrome-handoff-review.md`, the node-local interaction rule)
   states that *"the MCP dispatch surface carries an event name with no pointer coordinates … so a
   session reached through MCP can start/abort deterministically but cannot commit a magnitude —
   **no later pass may claim agent-drivable drags**"*. **`§5(b)` therefore describes the drag's code
   path and claims nothing about a pointer.**
5. **"The window repaints / the pane is visible."** — `[U]`/APP territory; `docs/specs/ci-ui-leg.md`
   §3.3 `C-7` names *"any attribute row, geometry/layout row, or IPC row"* as outside that leg, and
   the `ui` leg's `R2` measures **one** rect in **one** boot under a scratch profile.
6. **"Nothing else holds a reference."** — **This is the one claim that is genuinely
   non-establishable by ANY method available here**, and it is worth naming precisely: the
   reachability claims in `§1`–`§4` are **code-shape** claims (a named retaining reference exists),
   which are provable by reading. **Absence of *additional* references** (the engine's internals,
   V8's own caches, Electron's per-realm bookkeeping, devtools' retained objects) **is not provable
   by reading and not measured here.** Every hazard row therefore names the reference it *knows*
   about and does not claim to have enumerated them all.
7. **A memory figure of any kind.** **Not taken.** No heap snapshot, no `performance.memory`, no
   `process.memoryUsage`, no GC hook, no `--expose-gc` run, no profiler. **Where this document says
   "unbounded" it means "no removal path exists in the code", never "measured growth".**

---

## §8. Provenance

**WHAT I READ.** **Host (`[H]`), in full:** `src/main/main.ts`, `preload.ts`, `mcp-server.ts`,
`security-store.ts`, `module-store.ts`; `src/renderer/renderer.ts`, `runtime.ts`, `secure-panels.ts`,
`extensions.ts`; `src/shared/gesture-session.ts`, `gutter.ts`, `gutter-affordance.ts`,
`dom-shim.ts`; `src/renderer/index.html` (read in layer 1; not re-read here).
**Read at their cited surfaces:** `src/shared/focus-model.ts` (`focusTransition`'s `'open'`/`'close'`
arms, the verb domain), `src/shared/demo-envelope.ts` (grep-read for `def`/`component`/`bindings` —
**none present**), `scripts/electron-ui.mjs` (the `R0`–`R4` row declarations and `R4`'s honest-limits
text), `package.json` (script keys only).

**THE ENGINE — READ HERE AND NOT IN LAYER 1 (`ENGINE` = the installed
`node_modules/provident-ssr/dist/core/` at package version `0.5.1`, read statically):**
`supervisor.js` (`Supervisor` fields, `dispose`, `dispatchAndReport`, `recordDedup`/`DEDUP_CAP`/
`DEDUP_TTL_MS`, `journalIfApplied`, `scheduleCondense`, `condense`, `storeResolved`/`recordResolved`,
`takePass2States`, `hasPendingWork`, `flush`, `destroyedRefs`), `registry.js` (`createScope`,
`registerNode`, `evictDestroyedNode`, `onNodeFinalized`/`finalizeHooks`/`finalizeHookCount`,
`registerDefPrototypes`/`registerDefRootPrototype`, `markPending`/`scheduleSweep`,
`finalizeDestroyed`), `adapters.js` (`DomAdapter`: `wires`, `listeners`, `purgeListeners`, `removeEl`,
`createEl`, `setProp`'s `on:`/`data:`/`css:` branches, `stylesSeen`/`ensureStyles`), `render-helpers.js`
(`renderProducingProcess`, `diffMinimal`/`applyOps`), `node.js` (the Node-construction
`registerNode` call), `translate.js` (its calls into the prototype registries), `events.js`
(`EventBridge`), and the `.d.ts` files where a signature mattered (`Supervisor.dispose`,
`finalizeHookCount`).

**SPECS AND TRACKERS READ.** `docs/specs/foundation-app-data-model.md` (**in full** — layer 1);
`docs/specs/ci-ui-leg.md` (the Layer declaration, §3.3 `C-7`, §3.0 `R4`'s honest-limits row, the
§7-item-6 exclusions); `docs/specs/user-flow-audit.md` (the §7.1 predicate, the §5.U matrix, the §6.1
report, the §6.2 audit, and the §2 zero-row exemption); `docs/specs/zones.md` §0 ruling 6 and
`docs/specs/census.md` §0 ruling 6 (the mandatory geometry clause) + §2.5/§3.3-of-`census`'s `I-8`
reference; `docs/specs/projection.md` (`S-1`, `RK-19`, §2.5); `docs/specs/container.md` (`R-6`);
`docs/specs/gsession.md` (the *"interrupt/cancel leaves NO retained sinks and no listeners"* row and
§2.3 item 5's listener-count limit, `P-GS-IM-6`'s text); `docs/specs/focus-tool.md` §2.1 item 6 /
§2.3 items 1/2/4/5; `docs/specs/focus-model.md` (§2.1 item 2's *"the module holds nothing between
calls"*, the verb/refusal domains, §5.5.1's register-shape notes); `docs/specs/secure-panels.md` (the
own-`Supervisor` clause and the isolation rows); `docs/specs/mcp-endpoint.md` (§2's stateless HTTP,
§3.1 `P-E4`, §3.2, §3.6's journal note, §4.3 `P-C1`–`P-C5`, §6.4, §8's notify); `docs/specs/
runtime-host.md` (cited only as layer 1 cites it); `docs/specs/module-feature-list.md` §3 (`U5`/`U6`/
`U8`/`U9` rows) and `docs/specs/module-import-proposal.md` §6; `docs/specs/provident-electron-shell-
chrome-handoff-review.md` (`S-d9`, `S-d11`, the `H-r*` standing clauses);
`docs/decisions.md` (the ACTIVE rows named here: `NO-FOUNDATION-CONFIG-FILE-FACILITY`,
`E10-SINGLE-SINK-CHANNEL`, `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`,
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`); `docs/pending.md` (`§M`'s fork-ask
dispositions, the `GAP 1` row, `§N`); `docs/next-steps.md` (the `CURRENT WORK`/`HANDOVER STATE`
region and the ledger totals line); `docs/defects.md` (the `## OPEN` table — **empty** — and the
`REQ-GAP-12` retention row); `AGENTS.md` (items 4/10d/11 and `RCA-8`).

**WHAT I DID **NOT** READ.** (a) **The upstream source tree** `../Preempt-Providence/**` — cited only
through this repo's records and through the installed engine dist. (b) **The fork** `../Astrographer/**`
— not touched, not cited from, at all. (c) **`archive/**`** — not read. (d) **`tests/**`** — read only
by grep for call sites (`startGutterAffordance`, `dispose()`), **never in full, and no test was run**.
(e) **The `ui` and `divergence` legs' full scripts** — `scripts/electron-ui.mjs` was read at its row
declarations and its honest-limits text only; `scripts/electron-divergence.mjs` and
`scripts/electron-spawn.mjs` were **not** read. (f) **Most of the spec corpus** (~40 600 lines
by layer 1's own count) — read at the sections and rows this layer cites, not exhaustively.
(g) **`node_modules` other than `provident-ssr`** — not read.

**THE ONE THING THIS PASS LOOKED FOR IN THE TRACKERS AND DID NOT FIND, STATED PLAINLY.**
This layer's brief records that layer 1's `F-1`…`F-15` **are now parked as PENDING tracker rows**.
**This pass did not locate such a row:** a grep for `foundation-app-data-model` across `docs/**`
returns **only that file itself**, and greps for its title and for layer-1's finding ids
(`F-1`…`F-15` in the retention/data-model sense) in `docs/pending.md`, `docs/next-steps.md`,
`docs/decisions.md` and `docs/defects.md` return **other passes' same-numbered ids**, not these.
**That is recorded as an observation about the trackers, not as a finding against layer 1's
findings, which this pass did not re-derive, re-grade or fix** — and it is exactly the class the
standing rule names: **"nothing records X" is a finding, not a gap to fill by invention**
(layer 1's own `§2` convention, and its `§7` preamble). **A later pass with the parking record in
hand can settle it in one read; this one cannot, and says so.**

**WHAT I DID NOT DO — STATED PLAINLY.** **I ran no suite, no leg (`divergence`/`ui`), no `tsc`, no
build, no Electron boot, no battery, no MCP session and no git command.** I took **no GC
measurement, no heap snapshot, no allocation profile and no memory reading of any kind.** I
**created exactly one file** (this one) and **modified nothing**: no `src/**`, no `tests/**`, no
`scripts/**`, no tracker, no other spec. **Every figure in this document is my own file read or, where
attributed, a quoted spec/package figure** — in particular: the `128`/`10 000 ms` dedup caps, the
`1000` upload-queue cap, the three backend timeout literals, the `finalizeHooks` array, the
`DEDUP_CAP`/`DEDUP_TTL_MS` constants, the condense guard and the two per-`validate` supervisor
constructions are **read from the named files at each claim**, and **no leg figure is quoted as a
measurement of mine** — layer 1's leg figures and the specs' register figures are **quoted as the
other passes' own readings**, never as this pass's (`RCA-12`: *never present a node reading as app
evidence*).

**THE DATE.** Filed **2026-10-01** per the architect's instruction, layer 1's own filing convention.
`docs/pending.md` carries rows dated later than that elsewhere in the tree (layer 1's `F-15` records
the same observation about itself); **this document's date is a filing convention and not a claim
about the tree's state.**

**THE LAYER OF THIS DOCUMENT.** It is a **research record**: no code-bearing surface, no register,
no `§5.U` matrix, no `§6.1` report and no `§6.2` audit are emitted — the **explicit, recorded
zero-row exemption** of `docs/specs/user-flow-audit.md` §2 (*"a measurement/documentation record …
for such a unit no `§5.U` matrix and no `§6.1` report are emitted, and the exemption is RECORDED in
the unit's own spec with its reason"*), which is the exemption class `AGENTS.md` item 11(g) names by
row name (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`: doc-only units are outside gate 11). **The hazards
in `§6` are this pass's description of the code's shape and are filed WITH FALSIFIERS, never with
fixes; nothing here authorises a unit, a spec, a seam or a repair.**
