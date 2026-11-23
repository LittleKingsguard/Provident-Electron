# modularity — unit record

**The unit `D-306` admitted; its design is `docs/L1/modularity.md` rev 15 (150/150, certified); the layer is L3–L4 in flight.** Fact base: `modularity-research.md` (canonical D-23), `modularity-findings.md` (canonical D-24), `storeroom-2.0.0-research.md`. Nothing here is a design.

**What the design lands** (D-306, D-307, D-310): seven sub-units — `U1` the executor and both halves, `U2` the registries, `U3` the passthrough and its per-listener batch, `U4` the ordered pre-build point, `U5` the extension points, `U6` the Cordis foundation-side mechanisms, `U7` the acceptance conversion **last**; the parity is `C-13`/`S-13b`/`M-29` (the browser-side WASM store joins the main/node one; one store per app); the battery `tests/e2e/modularity/` is unmarked and gating, `M-1`…`M-5` red-first until U1 lands (D-30, D-40).

**Handoffs, by pointer** (the design's §5 carries each with D-5's four fields): `H-1`/`H-2` → `provident-ssr`, DELIVERED (`Preempt-Providence/docs/handoff-modularity-2026-11-20.md`), answered and re-tested (`handoffs-answer-modularity-2026-11-23.md`; the arm `docs/probes/post-bootstrap-emit-drop.mjs`); **`H-1` DISCHARGED at 0.6.0** (rev 15's `C-7` is the host-side adoption); **`H-2` WITHDRAWN** (in-process graph; §2.3's live-closure recipe). `H-3`/`H-4` → `provident-storeroom`: `2.0.0`'s `returnedValues`/`bodyFailures` supersede `H-3`; `H-4` is answered (settle-before-answer). `H-5` → the WebAssembly arm: MEASURED, DELIVERED, **DISCHARGED at 2.0.1**.

**The pins**: `provident-storeroom ^2.0.0` (lock 2.0.1), `provident-ssr ^0.6.0` (D-310, D-314); the demo bundle regenerated; `SC-1` reads `15`/`14`; the map's `module-system` `endpoints` **24** (cap **290**, D-14).

**The build so far**: L1 rev 15 → L2 (the two interface pages) → L3 (both modules' designs and signatures) → L4 (the executor 8/8; the `invoke` door; the transport's composition over `ModulePort`; the mcp-surface battery 7/7). The six marked rows re-grained to the shipped realm surface (55/55); the runtime's transform hook retired. **Three diagnostics remain, all in `syncModuleRouter`'s body** (`src/main/mcp-server.ts`) — the design's declared coupled act, app-shell's (`main.ts`'s `router:` literal and its two calls, `:631`/`:795`); the mcp-surface integration battery's setup path still rides the retired route (its L2 re-grain). Legs: unit 8/8 and 7/7; `build` 0; `typecheck`/`typecheck:tests` 3.

**The next acts**: app-shell's coupled act (the router retirement and the port wiring), the integration battery's re-grain, then the four legs and U1's e2e (`M-1`…`M-5`).

```boundary-declared
{"unit":"modularity","layer":"L0","module":null,"writes":[
 {"path":"strata/records/modularity-unit.md","why":"this record, compacted to the ceiling: the landings, the handoffs' states, the door and the composition, the three remaining diagnostics and the next acts","d":"D-306"},
 {"path":"src/main/mcp-server.ts","why":"the composition over ModulePort: composePublishedSet, syncPublishedTools, the delivery arm, the version authority, invokeModuleTool(door, gate, ...), the dynamic arm schema","d":"D-306"},
 {"path":"src/main/security.ts","why":"registrationAllowed homed beside the group predicates, one spelling","d":"D-306"},
 {"path":"src/shared/module-contract.ts","why":"the ModuleExecutor fifth member invoke, the two invocation refusals, the ModuleHost docblock corrected","d":"D-306"},
 {"path":"src/main/modules/activation.ts","why":"ActiveRecord.handlers - the door reads the standing activation at the turn","d":"D-306"},
 {"path":"src/main/modules/index.ts","why":"the invoke door beside deactivate, the header re-grained","d":"D-306"},
 {"path":"tests/unit/mcp-surface/published-set.test.ts","why":"the battery re-grained to the port: MS-1..MS-6 (MS-6 new, the schema cell)","d":"D-306"},
 {"path":"tests/unit/mcp-surface/signatures.test.ts","why":"SD-1 header re-grained to the port and the door-first call","d":"D-306"},
 {"path":"strata/modules.json","why":"module-system endpoints 23 -> 24 (cap 290), the L2 count returned by L1","d":"D-14"},
 {"path":"tests/integration/store-view-record/boundary.test.ts","why":"the B-2 control's fixture re-pointed from `src/main/security.ts` (now inside the union) to `src/main/store-channels.ts`, untouched and undeclared","d":"D-101"}]}
```
