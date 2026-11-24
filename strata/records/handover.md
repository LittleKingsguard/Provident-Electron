# handover — 2026-11-24 (rev 2): `U1`/`U3`/`U4`/`U5` are landed and green; what is left is the e2e battery's second row set, `U2`/`U6`/`U7`, and four named non-code debts

Read `strata/brief.md` first, then `strata/decisions.md` from `D-304` onward. **The unit's worklist is `strata/records/modularity-cleanup.md`** (`D-319`) — re-grains performed, anomalies standing, process rules, environment limits and the sweep order. It is not a design page and nothing cites it as authority.

## Where the branch stands

`main` is at **`e49d372`**; the remote is at `a58a7ab` (30 commits behind, **nothing pushed** — `D-6`'s pointer clause, the freeze lifted). The worktree is clean, the pins stand (`provident-storeroom ^2.0.0`, lock 2.0.1; `provident-ssr ^0.6.0`), and the demo bundle was regenerated against the renderer and runtime it bundles (`D-118`).

## The readings (clean tree at `e49d372`)

`typecheck` **0** · `typecheck:tests` **0** · `build` **0** · **`npm test` GREEN — 0 failed / 3,068 passed / 2 skipped of 3,070 over 164 files**. All 11 `tests/e2e/` batteries ran inside it (they boot the built bundle), and the module batteries are green: the boundary battery **10/10**, `RW-M1`…`RW-M5` **5/5**, `D-317(a)`…`(c)` with `M-14`/`M-15` **7/7**, `MF-1`…`MF-3` **3/3**, `CH-1`…`CH-6` **6/6**, `MC-1`…`MC-13` green.

## What has landed, in the unit's own order

- **`U1` — the executor and both halves**: one manifest, `entry` evaluated at activation, admission by value (`host-api-token`, `declaration-overstated`, `foundation-tool`), the dependency resolver, the ONE `invoke` door, the published tool set, and the client source delivered as `C-15`'s registration frame. Rows `M-1`…`M-5`, `MS-9`, `I-9`.
- **`U3` — the channel**: the store facade and the binding (`src/main/module-channel/`), the two-kind message and the settled turn (`src/shared/module-channels.ts`), the realm end with the per-entry fan-out and the async client store proxy (`src/renderer/module-channel-client.ts`), and the ELEVENTH bridge member (`S-12`). Rows `MC-1`…`MC-13`, `CH-1`…`CH-6`.
- **`U4` — the pre-build and the post-bootstrap compile**: `RuntimeOptions.contributions` merges the ordered contributions into the authored template **before `translateLegacy`**, and `applyCommand`'s dirty loop honours `getCompileMode()` (`'path'` per member, `'family'` byte-for-byte, never the pass-2). Rows `M-14`/`M-14b`/`M-14c`/`M-15`; `M-16` is the e2e adoption row, **not written**.
- **`U5` — the runtime composition and the module shape** (`D-317`, `D-318`): the runtime **stores its composed authored document** at construction (which also closes the boot-time `code.*` class) and gains **`contribute`** — the same merge routine, re-loaded through `loadEnvelope`, so the app's **30 authored handlers** survive; the serializer round-trip is refused by measurement and so is a raw `LayerApplyOp`. `startModuleShape` composes the router's pending contributions (live-graph id check **plus** a per-router key set), installs each `ActionRecord.fn` by NAME through one `state-slice` on `targetProp:'handlers'`, and re-drives the paints. Rows `D-317(a)`…`(c)`, `RW-M1`…`RW-M5`.
- **The boot census route** (`D-316`): `main` hands `status().loaded` to the executor as ONE table delivery before the transport composes; `M-30` re-boots the same profile and calls the tools with no install, and `D-315`'s refusal rule is its other arm.
- **The corpus caught up**: `docs/L1/modularity.md` **rev 16** (`M-30` filed; `module-system` `16 → 24`, `producing-runtime` `17 → 18`, `renderer-wiring` + its integration path), `strata/modules.json` moved for the last two, **`app-shell`'s L2/L3 pages now state the ELEVENTH bridge member** (`RG-8`), and `D-319` gave the unit its ledger — whose first sweep closed `AN-5`, `AN-6` (which found an id-less forest was never loaded at all), `AN-8`, `AN-12` and `AN-18`.

## What is open, named not hidden

- **The e2e battery, split by `D-318`**: **`M-11`/`M-13`** are owed at `S-20` in `tests/e2e/module-channel/` (one shared boot; the harness is `module-executor`'s ~650 lines — `AN-20` says extract it first); **`M-2b`** moves to `S-23`/`U6`, because `module.update`'s second registration frame is dropped by the router's one-frame guard, so the updated `client` source is never evaluated.
- **`AN-4`, before `M-11` is written**: `ASM-MC-3`/L2 §4 say the fan-out makes *one call per module*; the code fires *per entry*. One of the two has to move, and the row must not assert a grain the code lacks.
- **The out-of-band activation sink**: undeclared, and the code says so itself (`src/main/main.ts`'s disable handler, `src/main/mcp-server.ts:818`).
- **`app-shell`'s L2 rev for the boot census route** (`D-316`'s table delivery): the `channel` row landed, this one has not.
- **The harness-cap ruling**: `module-system`'s L2 counts its 246-line unit battery against `50 + 10×N` (44 under); `bundle-boot-seam`'s pages say a product battery is EVIDENCE and does not count.
- **The state ledger is behind** (`L3`/`design`/no artifacts): `../Agent Harness/` is absent, so `strata-state`/`strata-lint` cannot run and no ceiling or citation is machine-checked. Every ceiling count in the corpus is a `wc -l`.
- **Upstream (`AN-1`, `D-5`)**: the real store's `returnedValues` carries a settled thenable's value, not a synchronous listener's return, so the channel's `return` arm is async-only; the fix shape is the store's. `AN-2`: `serializeNode` emits no `handlers` against the 30 the envelope authors.
- **Unbuilt rungs**: `U2` (`S-6`…`S-10`, the five-domain declaration registry — no code; blocks `S-18`/`M-18`), `U6` (`S-22`…`S-25` — coeffects carried and judged by nobody, inverses, activate/deactivate), `U7` (`S-26`…`S-28`, the acceptance conversion; no `src/modules/`). `M-29` needs the WASM host build, which is not a dependency here.

## The worklist

`strata/records/modularity-cleanup.md` (`D-319`) carries the rest at the item grain: `AN-7`, `AN-9`, `AN-10`, `AN-11`, `AN-13`…`AN-17`, `AN-19`, `AN-20`, and the two splits `AN-15`/`AN-16`. A working pass appends; a cleanup pass sweeps. Its items are not claims and no design cites them.

## What a fresh session does next, in order

1. **`AN-4`'s decision**, then **`M-11`/`M-13`** — settle the fan-out's grain, extract the boot harness (`AN-20`), write the two rows in `tests/e2e/module-channel/`, and run them (a `DISPLAY` is a prerequisite and never a skip).
2. **`U6`** (`S-22`…`S-25`), which is what `M-2b`'s third arm and the update path need; then `M-2b`.
3. **`U2`** (`S-6`…`S-10`), which unblocks `S-18`/`M-18`'s composed pane set; then **`U7`**'s acceptance conversion, last.
4. **`AN-15`/`AN-16`**'s splits, **`AN-11`**'s two claimed-but-absent battery paths, **`AN-7`/`AN-9`/`AN-10`**, and the **cap ruling** — then the ledger move when the workflow checkout returns.

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-319", "why": "the handover replaced whole: the tree as it stands at e49d372 — four legs green at 3,068/164, the U1/U3/U4/U5 and corpus landings, the open set (the battery split, AN-4, the sink, app-shell's boot-route rev, the cap ruling, the absent tools, the upstream pair, U2/U6/U7), and the next acts in order"}]}
```
