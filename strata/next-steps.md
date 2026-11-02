# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **PURGE, not migrate: six store-like things stand and two are intended** (D-78). A STORE is a `provident-storeroom` instance and there are to be exactly two — the **normal crossing** (`createProfileStore`, `src/main/main.ts:132`) and the **secure crossing** (the operator-settings instance, `src/main/operator-settings/index.ts:405`). **The provident-ssr graph is a RENDERING ENGINE**: never a store, never called one, never used as one. The four to delete are the app's own frozen graph store (`src/renderer/store-core-graph.ts`, constructed at `src/renderer/renderer.ts:819`), `src/renderer/store.ts` (imported by no file under `src/`), the `central-data` surface's **second instance of the seam opened on the boot store's own file** (`src/main/data/store.ts:120`), and `src/main/module-store.ts`. **It is a purge because nothing reconciles today**: the frozen store is the only store wired to the render (`renderer.ts:1301`–`1339`, `:1734`, `:1880`) while the tab record's own driver is resolved and **discarded** (`renderer.ts:681`, called at `:1385`), so ruling 2's chain — store acts → listener deliveries → the read → the data shape → the render — is implemented by nothing | `store-tabs-record`'s L4, then `renderer-wiring`'s and `central-data`'s | **two `provident-storeroom` instances and no other store-like thing in `src/`**, and the shape the rendering engine renders is driven by listener deliveries rather than by a store the renderer holds |

Every other open item is `pending.md`'s, and each states what it waits on: the `data.*` answer sites and D-22's second
half wait on admission, one boot-battery process tree waits on a run on the machine that reported it, `strata-lint`'s record
gap on the harness owner. **`A-4`'s flake is no longer among them** — its cause was measured and its fix landed on
2026-11-02, and `pending.md` records both rather than letting a flake that stopped stand in for a cause that was found.
**ST-F2 is no longer among them** — `pending.md` records why it was deleted rather than narrowed on 2026-11-02 — and **ST-F1** stays live in
`strata/records/store-tabs-record-unit.md` §1; neither is pushed from here (D-5, D-24). **Row 2 is gone with its work, not
deferred**: `docs/L3/store-tabs-record/signatures.md` rev 2 is regenerated from the three modules and pinned against them by
`tests/unit/store-tabs-record/signatures.test.ts` — D-45's checking arm, which reds on a divergence in either direction.
