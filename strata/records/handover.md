# handover — 2026-11-25 (rev 4): under its 60-line ceiling, with the distance-behind a reading; what is left is `U2`'s L4, `U6`'s cells and `U7`

Read `strata/brief.md` first, then `strata/decisions.md` from **`D-304`** onward. **The unit's worklist is `strata/records/modularity-cleanup.md`** (`D-319`): re-grains, anomalies, process rules, environment limits and the sweep order.

## Where the branch stands

**`main`'s tip carries this page**; the tree is clean. The remote's last known tip is **`a58a7ab`** and **nothing is pushed**
(`D-6`'s pointer clause; the freeze is lifted). **How far behind is a READING** — `git rev-list --count a58a7ab..HEAD` — because a
count written here is stale on the commit that writes it (rev 3 said `48`; the next session read `50`). Pins stand
(`provident-storeroom ^2.0.0`, lock 2.0.1; `provident-ssr ^0.6.0`); the demo bundle is regenerated (`D-118`).

## The readings (clean tree at `fd92687`; the three commits since touch this page only)

`typecheck` **0** · `typecheck:tests` **0** · `build` **0** · **`npm test` GREEN — 3,077 passed / 2 skipped of 3,079 over 165 files**, all 11 `tests/e2e/` batteries inside it.
The unit's own: boundary **10/10**, `MF-1`…`MF-5`, `RW-M1`…`RW-M7`, `D-317(a)`…`(c)` with `M-14`/`M-15` **7/7**, `CH-1`…`CH-6` **6/6**, `MC-1`…`MC-13`, `M-11`/`M-13`/`M-2b` **3/3** on ONE boot.

## What has landed

- **`U1` the executor and both halves**: manifest, `entry` at activation, admission by value, the resolver, the ONE `invoke`
  door, the published tools, the client source as `C-15`'s frame. `M-1`…`M-5`, `MS-9`, `I-9`, `M-30`.
- **`U3` the channel**: the store facade and binding, the two-kind message and settled turn, the realm end's per-entry
  fan-out and async client proxy, the ELEVENTH bridge member. `MC-1`…`MC-13`, `CH-1`…`CH-6`.
- **`U4`/`U5` the pre-build, compile and composition** (`D-317`): contributions merge before `translateLegacy`; `applyCommand`
  honours `getCompileMode()`; the runtime stores its document, gains `contribute`, and `startModuleShape` installs each
  `ActionRecord.fn` by NAME through one `state-slice` on `handlers` (per module, `AN-7`), re-driving the paints. `M-14`/`M-15`, `RW-M1`…`RW-M6`.
- **`S-23`'s inverse** (`D-318`): a CHANGED source replaces (the same text stays the no-op), `registerModule` answers
  `{registered, withdrawn}`, and **`Runtime.withdraw(ids)`** takes the authored nodes back before the new contribution composes. `13b`, `RW-M7`.
- **The e2e battery** `tests/e2e/module-channel/channel-live.test.ts`, ONE boot, harness extracted (`AN-20`): `M-11` (one turn,
  five entries, five arms), `M-13` (the PREFIX read; containment per firing; no entry hears nothing), `M-2b` (the client half
  crosses and evaluates; one registration counts one; the census entry names no source).
- **`U2`'s rung WRITTEN** (`docs/L2/declaration-registry/interface.md` rev 1 + its L3 pair): five id domains as data, the entry
  `{id, source, origin}`, foundation ∪ module with a duplicate refused by name, five queries with accessors and consumers.
- **The corpus caught up**: `docs/L1/modularity.md` rev 22, the `app-shell` pages' ELEVENTH member, the map's `D-321` `planned` member with `MF-1`…`MF-5` stat-ing both arms; `D-319`–`D-321` are the pass's decisions.

## What is open, named not hidden

- **`U2`'s L4 — PLANNED AND STARTED, NOT LANDED** (`AN-28`): the plan landed (`7122af1`) and `S-8`'s group domain is designed (`docs/L3/mcp-surface/group-domain{,-signatures}.md` rev 1, `RG-10`); `OWED-4` still puts the registry and `S-7`…`S-10`/`S-18` in ONE sub-unit. Surface
  measured: `DECLARED_PANE_IDS` 23/9, `DECLARED_ZONE_IDS` 24/5, `ALL_TOOLS` 6/24, `VALID_GROUPS` 7/18, `GROUP_LABELS` 5/0,
  `PANE_STATUS_WORDS` 6/0 (`src/` sites / test files). **Next**: `S-7`'s tool half, then the five revs the plan's §3 lists — `secure-panels`, `renderer-wiring`, `view-record`, `operator-settings` — before any `src/` byte.
- **`U6`**: `S-22` (coeffects — carried, judged by nobody), `S-24` (activate/deactivate by classification), `S-25`
  (component-scoped replacement). **`U7`** (`S-26`…`S-28`, acceptance; no `src/modules/`) is **last**, on the user's ordering.
- **Reserved**: `M-16` (mode adoption's e2e), `M-18` (composed pane census, on `U2`), `M-29` (parity, on an absent WASM host).
- **Decisions owed**: the **harness-cap ruling** (`module-system` L2 counts 246 lines against `50 + 10×N`; `bundle-boot-seam`
  says a product battery is evidence and does not count); the **out-of-band sink** (undeclared; `main.ts`'s disable handler and
  `mcp-server.ts:818` say so); **`app-shell`'s L2 rev** for the boot census route (`D-316`).
- **Cleanup**: `AN-15`/`AN-16` (two splits, one blank line), `AN-25` (a nested write creates no parent), `AN-1`/`AN-2` (upstream facts, at the next pin), and the absent ledger tools (`strata-state`/`strata-lint`; every ceiling is a `wc -l`).

## Three habits, and the next acts in order

1. **Touch a boundary block ⇒ run the boundary battery before committing** (`tests/e2e/boundary-grain/declarations.test.ts`,
   `tests/integration/store-view-record/boundary.test.ts`); one live block per page. 2. **The four legs are green only on a CLEAN
tree**: typecheck/typecheck:tests/build/filter → commit → `npm test` → report. 3. **Measure a row's stimulus first**: `M-11`…`M-2b`
each found a defect (`AN-21`, `AN-23`, `AN-26`) review had not seen.

**Next, in order:** `U2`'s L4 — plan written, `S-8` designed, the registry and the other five revs next (unblocks `M-18` and `S-18`); then `U6`'s `S-22`/`S-24`/`S-25`; then `U7`;
beside them the cap ruling, the sink, `app-shell`'s boot-route rev, and the two splits.

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-115", "why": "the page under its 60-line ceiling (rev 4), refreshed for `U2`'s L4's state — the plan landed and `S-8`'s group domain is designed (`RG-10`) — with the tip-dependent distance still left to `git rev-list --count` and the remote's SHA named (D-99, D-115)"}]}
```
