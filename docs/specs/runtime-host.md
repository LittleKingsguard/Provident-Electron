# Spec — Runtime Host Capabilities (Unit A)

Status: **SPEC** (delegation gate for the battery's Unit A). Source:
`docs/specs/e2e-test-battery.md` §3/§4/§6 + `docs/specs/architecture-review.md`
A2/A5. Extends the existing `Runtime` (`src/renderer/runtime.ts`) with the
load/export/teardown operations the MCP tools + battery host consume. All
operations use ONLY existing `provident-ssr@0.1.3` surfaces.

## 1. Scope

The `Runtime` today: translate → register → compile → render (DOM + SSR), plus
`dispatch`/`renderedHtmlResult`/`listTargets`/`nodeState`. This unit adds the
**battery-mode host capabilities** — the operations the 5 graph MCP tools +
the battery host call. They are pure host code (no package change).

## 2. The surface (exact additions to `Runtime`)

```ts
loadEnvelope(envelope: LegacyInitialData, opts?: { userData?: unknown }): Census
loadDoc(doc: SerializedRenderDoc): Census
applyCommand(cmd: OpCommand): { status: string; dirtied?: string[]; minted?: string[] }
exportLegacy(): LegacyInitialData
exportSerialized(): SerializedRenderDoc
validateExport(kind: 'legacy' | 'serialized', export: unknown): { valid: boolean; censusMatch: boolean; warnings: unknown[] }
teardown(): Census
```

`OpCommand` = a managed-channel op payload (`{ kind: 'clone-instance' | 'attach'
| 'detach' | 'move' | 'state-slice' | 'layer-apply' | 'rows-mint' | 'rows-clear'
| 'placement-attach' | 'destroy', ... }`).

## 3. Behavior (every state / fail-state)

### 3.1 `loadEnvelope(envelope, { userData })` — A2 load
- Replaces the current graph: tears down the existing content (see §3.6), then
  `translateLegacy(envelope)` → register → compile → `recordResolved` → render.
- Sets the translate-scoped `userData` (R8) when provided; CLEARS it when
  absent (so an anon load after a user load has no stale userData).
- Returns the post-load census.
- Placement-routed envelopes (a node with a `content`-role anchor) bootstrap via
  `compilePath()` per node (the path-enumeration pass), NOT `rootNode.compile`
  (R-new). Non-placement envelopes use the default bootstrap.
- A malformed envelope (translate throws / `envelope-mismatch`) → throws with
  the translate error; the graph is left in the pre-load (torn-down) state.

### 3.2 `loadDoc(doc)` — A1 load (snapshot/restore)
- `loadState(doc)` → seeds → `new Node(seed, createLinkHub())` (template root
  first, content after) → `reconcileParentTargets(nodes)` → register per node →
  compile → `recordResolved` → render. ONE hub shared with the supervisor.
- Snapshot-parity only (R3): def/seam/rows machinery does NOT survive loadState.
- Returns the post-load census.

### 3.3 `applyCommand(cmd)` — A3 single op
- `supervisor.apply(cmd)` (the managed channel) → `flush()` → drain rule (R9:
  `takePass2States` consumed exactly once, before render) → render.
- Returns the apply result `{ status, dirtied?, minted? }`.
- A rejected op returns its `{ status: 'rejected', error }` — never throws.

### 3.4 `exportLegacy()` / `exportSerialized()`
- `exportLegacy()` → `reverseTranslate(root, { content: contentNodes })`.
- `exportSerialized()` → `serializeSlice(root, kids, clientConfig)`.
- Both return the current graph's export (no mutation).

### 3.5 `validateExport(kind, export)`
- Re-loads the export into a THROWAWAY graph (a fresh `Supervisor` + hub; never
  the live one) and compares census + (for legacy) re-translate warnings.
- `censusMatch` = the throwaway graph's census equals the live graph's census.
- Returns `{ valid, censusMatch, warnings }` — never throws on a malformed
  export (returns `valid:false`).

### 3.6 `teardown()` — restore root-only (C3/C4)
- Destroys every in-tree child of root via `supervisor.apply('destroy')` per
  node (runtime-minted retention), `dropPayload` on content payloads, clears
  userData (R8), then the **settle-gate (R6): `while (hasPendingWork())
  await flush()`**, then re-render.
- Returns the post-teardown census — `inTree === 1` (root only), mount empty.
- Idempotent: calling teardown on an already-root-only graph is a no-op.

### 3.7 id-index (A5)
- The Runtime maintains a `Map<cssId, nodeId>` + `Map<propsId, nodeId>` rebuilt
  on every load/teardown (NOT per-call `allNodes().find`).
- `resolveTarget`/`resolveString` use the index first, then fall back to
  `getNode` (nodeId/wire). A destroyed node's id is NOT in the index (the
  tombstone shadow-hazard is avoided).

## 3a. Adversarial findings (2026-08-22) — landed as fixes

An adversarial review of the first Unit-A green landed these host-side fixes
(no engine defect). The green scenarios encode them.

| # | Finding | Fix (documented contract) |
| --- | --- | --- |
| H1 | Placement-routed loads always used `rootNode.compile` → the path-state element set (4095 at d12) was silently dropped (the fragment was the wrong ~3). | `render()`/`loadEnvelope`/`loadDoc` detect placement-routing (a `content`-role anchor) and bootstrap via `compilePath()` per node. |
| H2 | `teardown` left children as resolvable `unplaced` ghosts (only link-dissolved, never destroyed) — a stale ghost tree + index. | `teardown`/the id-index/`resolveTarget`/`listTargets` are all IN-TREE-only: torn-down node ids never resolve (A5). |
| H3 | `applyCommand` clone-instance with an unresolvable string `node` THREW (`source.clone` on the raw string) instead of returning rejected. | `applyCommand` rejects cleanly when a string `node` does not resolve (never throws). |

## 4. Verify (the TestWriter's exact states)

- `loadEnvelope(demoEnvelope())` → census with `inTree > 0`; the mount renders.
- `loadEnvelope` with `userData` then `loadEnvelope` without → the second has no
  stale userData (the anon-after-alice trap is closed).
- `loadEnvelope` of a placement-routed envelope (the path-fork shape) →
  `inTree === 23` (the static family census), `elements === 4095` (via the
  digest/sample, not the raw fragment).
- `applyCommand({ kind: 'state-slice', ... })` → `{ status: 'applied' }` and the
  render reflects it; a rejected op returns `{ status: 'rejected' }` (no throw).
- `exportLegacy()` → a `LegacyInitialData`; `validateExport('legacy', it)` →
  `{ valid: true, censusMatch: true }`.
- `teardown()` → `inTree === 1`, mount empty; idempotent (second call no-op).
- `resolveTarget('counter')` (a css.id) resolves via the index without an
  `allNodes()` scan (the index is used).
- A destroyed node's id does not resolve via the index.
