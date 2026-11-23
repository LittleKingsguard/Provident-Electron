# handover — 2026-11-23: the `modularity` unit is at L4, its executor, door and composition landed; the four legs are whole and the eleven remaining suite reds are each named

Read `strata/brief.md` first, then `strata/decisions.md` from `D-304` onward.

## Where the branch stands

`main` carries the work; **nothing is pushed** (D-6's pointer clause, D-119). The unit `modularity` (`D-306`) went L1 rev 15 → L2 → L3 → L4 in this session; the ledger's `layer` reads `L3` (the last entered) and its `stage` is not a verdict — read `.strata/units/modularity.json` (D-26, D-43). The unit's record is `strata/records/modularity-unit.md`; its design `docs/L1/modularity.md` rev 15; L2 the two interface pages; L3 both modules' designs and signatures.

## What landed

- **The pins** (D-310, D-314): `provident-storeroom ^2.0.0` (lock 2.0.1), `provident-ssr ^0.6.0`; the demo bundle regenerated; `SC-1` reads `15`/`14`; the map's `module-system` `endpoints` **24** (cap **290**, D-14).
- **The executor** (`src/shared/module-contract.ts`, `src/main/modules/{loader,admission,activation,resolver,handles,index}.ts`, `src/renderer/extensions.ts`): the manifest, the two deliveries through one `ModuleSource`, the disjoint ctx halves, admission's three refusals by name, the resolver's four and its total order, the listener two-half with the passthrough arm, the `reentrant-call` refusal, and the **`invoke` door** (unknown name / throwing handler answer values).
- **The transport** (`src/main/mcp-server.ts`): the published set as the registry's composition over **`ModulePort`**, re-registration on activation with withdrawal by `remove()`, one version authority (`appVersion()`), `invokeModuleTool(door, gate, …)`, the dynamic arm's schema moved so a caller's args reach the door.
- **`src/main/main.ts`**: the executor's host and its `modulePort` at the one-line options pass; `syncModuleRouter` and `router?` retired whole; the set-disabled toggle stated as a census write (the port's `activations()` is the live set).
- **The six marked rows** re-grained to the shipped realm surface (55/55); `src/renderer/runtime.ts`'s transform hook retired (C-10, D-231).

## The readings (clean tree)

`typecheck` **0**, `typecheck:tests` **0**, `build` **0**; the unit batteries **15/15** (`module-system` 8 + `mcp-surface` 7); the boundary **10/10**; `strata-lint` **211**. The suite: **11 failed / 3,020 passed / 2 skipped of 3,033** over **158** files.

## The eleven reds, each with its owner

- **`M-1`…`M-5`** (`tests/e2e/modularity/`): U1's e2e — waiting on the **boot census activation route** (the delivery arm is the MCP tool's; a boot's census-loaded module has no activation path).
- **`I-3`/`I-8`** (`tests/integration/module-system/`): the activation's main-ctx/log/refusing shape — module-system's seat.
- **`S-11`** (e2e) **and `ISO-4`** (integration) `security-store-storeroom`: the isolation scanner flags `src/main/modules/admission.ts`'s **token census** as a channel invocation — a row re-grain (the census site is a refusal vocabulary).
- **`S-9`** (`tests/e2e/central-data/`): the seam census — `src/shared/module-contract.ts` is a **fourth** package importer.
- **`REGISTER-EXEC-1`** (`tests/focus-tool.test.ts`): the register's execution against the composition.

## The handoff set (by pointer)

`H-1`/`H-2` → `provident-ssr`: delivered (`Preempt-Providence/docs/handoff-modularity-2026-11-20.md`), answered (`handoffs-answer-modularity-2026-11-23.md`), the arm handed over (`docs/probes/…`, `handoffs-arm-…`); **`H-1` discharged at 0.6.0** (rev 15's `C-7` is the host-side adoption), **`H-2` withdrawn**. `H-3`/`H-4` → `provident-storeroom`: superseded/answered at 2.0.0. `H-5` → the WebAssembly arm: delivered and **discharged at 2.0.1**. The release summary: `Preempt-Providence/docs/handoffs-update-0.6.0-2026-11-23.md`.

## What a fresh session does next, in order

1. **The five named reds' owners**: the isolation scanner's row re-grain, the seam census's re-grain, the focus register, `I-3`/`I-8` (module-system's activation), and the **boot census activation route** — then `M-1`…`M-5` close.
2. **The two outstanding halves**, named not hidden: the **registration frame's wire** (`S-12`'s eleventh bridge member + its `secure-panels` lockstep + `module-channel`'s receiver + three census rows — other seats' files) and the **out-of-band activation sink** (`design.md` §5's third caller — no port/host member carries it).
3. Then **U2–U7**, with **U7's acceptance conversion (the menus pane and the demo contents as modules) last**.

## Operating notes that cost real time

- **Each window's declaration block declares exactly that window's paths** (D-146): a fresh pass writing `src/`/`docs/`/`tests/` must declare every path it writes, in a page it owns; the duplicates `P-7` names are the usual slip, and a committed path must not stay in a live block (P-5 refuses a pre-filed declaration).
- **The demo bundle regenerates** when its `@source` digests move (`node demo/pane-drag-demo/build.mjs`, D-118); the demo-bundle rows red until it does.
- **Commit per gate and never push** (D-6); a reading is taken on a clean tree; the four legs plus the boundary instrument are the floor (brief §6, D-301).

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-306", "why": "the session handover replaced whole: where the branch stands, what landed, the eleven named reds, the handoff set and the next acts"}]}
```
