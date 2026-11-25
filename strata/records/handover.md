# handover — 2026-11-25 (rev 3): the unit's e2e battery is written and green, `S-23`'s inverse is landed, and what is left is `U2`'s sized L4, `U6`'s remaining cells and `U7`

Read `strata/brief.md` first, then `strata/decisions.md` from **`D-304`** onward. **The unit's worklist is
`strata/records/modularity-cleanup.md`** (`D-319`) — re-grains performed, anomalies standing, process rules, environment limits
and the sweep order. It carries no claim about behaviour and nothing cites it as authority.

## Where the branch stands

**`main`'s tip carries this page** and the tree is clean; the remote is at **`a58a7ab`** and is **48 commits behind it — nothing pushed** (`D-6`'s pointer clause; the
freeze is lifted). The worktree is clean, the pins stand (`provident-storeroom ^2.0.0`, lock 2.0.1; `provident-ssr ^0.6.0`),
and the demo bundle is regenerated against the renderer and runtime it bundles (`D-118`).

## The readings (clean tree at `fd92687`, the commit before this page)

`typecheck` **0** · `typecheck:tests` **0** · `build` **0** · **`npm test` GREEN — 0 failed / 3,077 passed / 2 skipped of 3,079
over 165 files**. All 11 `tests/e2e/` batteries ran inside it (they boot the built bundle). The unit's own batteries: the
boundary **10/10**, `MF-1`…`MF-5` **5/5**, `RW-M1`…`RW-M7` **7/7**, `D-317(a)`…`(c)` with `M-14`/`M-15` **7/7**,
`CH-1`…`CH-6` **6/6**, `MC-1`…`MC-13`, and the channel's `M-11`/`M-13`/`M-2b` **3/3** on ONE boot.

## What has landed

- **`U1` — the executor and both halves**: manifest, `entry` evaluated at activation, admission by value, the resolver, the
  ONE `invoke` door, the published tool set, and the client source delivered as `C-15`'s registration frame. Rows
  `M-1`…`M-5`, `MS-9`, `I-9`, `M-30`.
- **`U3` — the channel**: the store facade and the binding (`src/main/module-channel/`), the two-kind message and the
  settled turn (`src/shared/module-channels.ts`), the realm end with its per-entry fan-out and async client proxy
  (`src/renderer/module-channel-client.ts`), and the ELEVENTH bridge member (`S-12`). Rows `MC-1`…`MC-13`, `CH-1`…`CH-6`.
- **`U4` — the pre-build and the compile**: `RuntimeOptions.contributions` merges into the authored template before
  `translateLegacy`; `applyCommand` honours `getCompileMode()` (`'path'` per member, `'family'` byte-for-byte). `M-14`/`M-15`.
- **`U5` — the runtime composition and the module shape** (`D-317`): the runtime stores its composed authored document and
  gains **`contribute`** (the app's 30 authored handlers survive; the serializer round-trip and a raw `LayerApplyOp` are
  refused by measurement); `startModuleShape` composes the pending contributions, installs each `ActionRecord.fn` by NAME
  through one `state-slice` on `handlers` (per module, `AN-7`), and re-drives the paints. `RW-M1`…`RW-M6`.
- **`S-23`'s inverse** (`D-318`): a registration frame whose SOURCE CHANGED **replaces** — the census re-send of the same text
  stays the no-op — `registerModule` answers `{registered, withdrawn}`, and **`Runtime.withdraw(ids)`** takes the authored
  nodes back before the new contribution composes. Rows `13b`, `RW-M7`.
- **The e2e battery** `tests/e2e/module-channel/channel-live.test.ts`, on ONE boot with the harness extracted to
  `tests/e2e/harness/live-boot.ts` (`AN-20`): **`M-11`** (the batch: one turn, five entries, the five arms), **`M-13`** (the
  fan-out's PREFIX read — the leaf write reaches the root and the leaf, where identity would reach the leaf alone;
  containment per firing; a module with no entry hears nothing), **`M-2b`** (the client half crosses and evaluates, one
  registration counts one, an update leaves the new marker with the old gone, the census entry names no source).
- **`U2`'s ladder rung, WRITTEN** (`docs/L2/declaration-registry/interface.md` rev 1 and its L3 `design.md` + `signatures.md`
  rev 1): the five id domains as data, the entry `{id, source, origin}`, the composition rule (foundation ∪ module, a
  duplicate refused by name), the five queries each paired with its accessor and its consumer, five assumptions.
- **The corpus caught up**: `docs/L1/modularity.md` rev 22 (the three lagging figures re-taken, `M-30` filed, `M-2b`'s filing
  re-grained, the `Proven by` vocabulary stated), `app-shell`'s L2/L3 pages now state the ELEVENTH bridge member, the map
  carries `D-321`'s **`planned`** member with `MF-1`…`MF-5` stat-ing both arms, and `D-319`/`D-320`/`D-321` are the pass's
  three decisions.

## What is open, named not hidden

- **`U2`'s L4 — SIZED AND NOT STARTED** (`AN-28`): `OWED-4` requires the registry and its five consuming re-grains
  (`S-7`…`S-10`, `S-18`) to land in ONE sub-unit, and the consumers' surface is measured — `DECLARED_PANE_IDS` 23 `src/` sites
  / 9 test files, `DECLARED_ZONE_IDS` 24/5, `ALL_TOOLS` 6/**24**, `VALID_GROUPS` 7/**18**, `GROUP_LABELS` 5/0,
  `PANE_STATUS_WORDS` 6/0. **Its first act is a plan** naming which literal each consumer stops reading and which rows
  re-grain.
- **`U6`'s remaining cells**: `S-22` (coeffects — the manifest member is carried and judged by nobody), `S-24`
  (activate/deactivate by the classification), `S-25` (component-scoped replacement).
- **`U7`** (`S-26`…`S-28`, the acceptance conversion; no `src/modules/`) — **last**, on the user's own ordering.
- **Reserved rows**: `M-16` (the mode adoption's e2e), `M-18` (the composed pane census, on `U2`), `M-29` (parity, on a WASM
  host build that is not a dependency here).
- **Decisions owed**: the **harness-cap ruling** (`module-system`'s L2 counts its 246-line battery against `50 + 10×N`;
  `bundle-boot-seam`'s pages say a product battery is evidence and does not count); the **out-of-band activation sink**
  (undeclared, and `src/main/main.ts`'s disable handler plus `src/main/mcp-server.ts:818` both say so); **`app-shell`'s L2
  rev for the boot census route** (`D-316`'s table delivery).
- **Cleanup**: `AN-15`/`AN-16` (the two page splits and the blank line `AN-15` cost), `AN-25` (a nested write does not create
  its parent), `AN-1`/`AN-2` (the two upstream facts, re-measured at the next pin), and the ledger tools (`../Agent Harness/`
  is absent, so `strata-state`/`strata-lint` cannot run and every ceiling count is a `wc -l`).

## Three habits a fresh session should keep

1. **Touch a boundary block ⇒ run `tests/e2e/boundary-grain/declarations.test.ts` and `tests/integration/store-view-record/boundary.test.ts` before committing.** The instruments exist and they bite (a clean-path declaration reds `P-5`; a second block on one page reds `B-1`'s duplicate arm); the cost is running them late. **One live block per page** — the newest row's.
2. **The four legs are fully green only on a CLEAN tree** (`F-9(b)` and the boundary rows measure the tree). The order: `typecheck`/`typecheck:tests`/`build`/filtered suite → commit → `npm test` → then report.
3. **Measure a row's stimulus before writing its harness**, and prefer a measurement that can disagree with the pages: `M-11`…`M-2b` each found a real defect (`AN-21`, `AN-23`, `AN-26`) that no review had seen.

## The worklist

`strata/records/modularity-cleanup.md` (`D-319`) carries the rest at the item grain: `AN-28` (the sized `U2` L4), `AN-15`/`AN-16`,
`AN-25`, `AN-1`/`AN-2`, and the environment limits. A working pass appends; a cleanup pass sweeps an item out only by fixing it or
by moving the residue where it belongs.

## What a fresh session does next, in order

1. **`U2`'s L4, starting with its plan** — the registry plus `S-7`…`S-10`/`S-18` in one sub-unit, which is what unblocks
   `M-18` and the composed pane set `S-18` has waited on since the design pass.
2. **`U6`'s remaining cells** — `S-22`, `S-24`, `S-25` — the inverses the update path already leans on.
3. **`U7`**, last: `S-26`…`S-28`, the acceptance conversion, with every census row re-read rather than assumed.
4. Beside them: the **cap ruling**, the **out-of-band sink**, **`app-shell`'s boot-route rev**, and the **two splits**.

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-321", "why": "the handover replaced whole: the tree as it stands (its tip carries this page) \u2014 four legs green at 3,077/165, the U1/U3/U4/U5 and S-23 landings, the e2e battery and its three rows, U2's written rung, the open set, the three habits and the next acts in order"}]}
```
