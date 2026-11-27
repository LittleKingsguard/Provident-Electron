# `modularity` — `U2`'s L4 plan: the order, the six literals, and the design revs L4 cannot write

- **Layer:** L0 · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — a PLAN, not a design: it claims no behaviour and every row it names is `docs/L1/modularity.md`'s. **Ceiling:** 40 lines, replaced per run. **Why:** `AN-28` sized the L4 as one sub-unit (`OWED-4`) and fixed its first act to this plan, measured at `c144554`. **REV 2 MARKS §3's ITEM 1 HALF-LANDED AND RECORDS THE ORDERING FACT IT MEASURED**: the group half is written (`docs/L3/mcp-surface/group-domain.md` + `group-domain-signatures.md`, rev 1, `RG-10`), and `TOOL_GROUP_IDS` must land with the registry at step 1 because `FoundationDeclarations.group` cannot be handed without it — `S-8` re-grains the gate's read, it does not mint the literal.

## 1. The order is set by the design, not the code

L4 owns no design (`brief.md` §3/§4), and the five consumers' L3 pages still declare the CLOSED forms: `docs/L3/mcp-surface/design.md` §4 says `S-8`'s shape "is not on the L2 page"; `docs/L3/secure-panels/signatures.md` §1 still declares `GROUP_LABELS: Record<ToolGroup, string>`; `docs/L3/renderer-wiring/module-shape-signatures.md` lost its invented map to `RG-5` and leaves the composed set to `U2` with no derivation; `docs/L2/view-record/interface.md` states the repair over the literal.
**So §3's revs precede every `src/` byte** — the measurement that makes this a plan and not an implementation order.

## 2. The surface, and what each consumer stops reading

| literal | defined at | `src/` readers | tests | stops reading → reads |
|---|---|---|---|---|
| `DECLARED_PANE_IDS` | `src/shared/view-shape.ts:257` | `view-record/index.ts` (`paneNodeAdmits`, placeholder loop, `:1647`), `renderer.ts:3799/4082`, `view-shape.ts:374` | 9 | `declaredPaneIds()` |
| `DECLARED_ZONE_IDS` | `view-shape.ts:273` | `view-record/index.ts` (`paneOf`'s zone arm, `zoneNodeAdmits`, two totals, `:1756`), `view-surface:98`, `renderer.ts:433/443`, `demo-envelope:1332`, `view-shape.ts:335` | 5 | `declaredZoneIds()` |
| `ALL_TOOLS` | `src/main/mcp-server.ts:749` | `:791` (`registeredToolNames`), `modules/admission.ts:49` | 24 | the foundation half + `declaredTools()` |
| `VALID_GROUPS` ×2 | `security.ts:194`, `operator-settings/index.ts:168` | `security.ts:199`; `operator-settings:297/813/844` | 18 | `declaredGroups()`; the copy dies |
| `GROUP_LABELS` | `secure-panels.ts:172`, `GROUPS:185` | `:281`, `:715` | 0 | a runtime set-equality row |
| `PANE_STATUS_WORDS` | `view-shape.ts:99` | `view-record/index.ts:616/939` | 0 | **nothing** — not a domain |

## 3. The revs owed before `src/`

1. `docs/L3/mcp-surface/{design,signatures}.md` — **GROUP HALF LANDED** (`group-domain.md` + `group-domain-signatures.md` rev 1, split at the ceiling): what `ToolGroup` is once groups are data, `TOOL_GROUPS`/`groupForTool`'s read, the rule and its composition. **TOOL HALF STILL OWED**: `S-7`'s re-grain of `allowedToolNames()` to the registry's `declaredTools()`, with `ALL_TOOLS` stated as that domain's foundation half.
2. `docs/L3/secure-panels/{design,signatures}.md` — the runtime label row (registry ↔ roster, red by name both ways) and the placeholder authoring.
3. `docs/L3/renderer-wiring/module-shape-signatures.md` — the five derived-map signatures `RG-5` left to `U2`.
4. `docs/L2/view-record/interface.md` + `docs/L3/view-record/design.md` — the repair and the totals over `declaredPaneIds()`/`declaredZoneIds()`.
5. `docs/L3/operator-settings/delivery.md` — the second copy's removal.
6. `docs/L2/declaration-registry/interface.md` rev 2 — §4's two-realm construction.

## 4. The two realms, and the rev the rung does not carry

The rung says "constructed once, at boot, from ... the activations" — that is main's. The renderer's consumers (`renderer.ts`'s maps, `secure-panels`' labels) need the same set, and no activation reaches that realm. **The existing route is the app-state rows**: `ModuleListEntry.capabilities` (`src/shared/types.ts:261`) is delivered through the secure crossing and held by `src/renderer/module-client.ts`, so the renderer can run the SAME pure `createRegistry` over the delivered declarations. **Rev 2 must say so** (one function, two constructions over one fact, `D-129`) or `S-18` needs a new delivery — the one choice this plan cannot make.

**The order.** Registry (`src/shared/registry/index.ts`) + its unit battery + **`TOOL_GROUP_IDS` in `src/shared/types.ts`** (its foundation group input, so it lands here and not at `S-8`) → `S-9` (one copy, smallest) → `S-8` → `S-7`'s main half → the renderer half (`S-10`, `S-18`, `S-7`'s renderer reads) → the re-grains (`AL-8`, `PM-1`, `VA-14`, `POST_CENSUS`, `docs/guides/forking.md` §2.4) and `M-6`…`M-10`/`M-18`, `M-18` last because it reads the composed set through the renderer's route.

**What does not move, and what proves it.** The foundation literals survive as pins (`ASM-DR-2`); a module may not declare a foundation id (`declaration-duplicate`, by name); `PANE_STATUS_WORDS` stays `view-record`'s; no MCP member, route or transport is added (`D-18`). **Proved by** `tests/unit/declaration-registry/` + `tests/integration/declaration-registry/`, the re-grained rows above, the boundary battery over every page §3 touches, and the four legs on a clean tree.

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/modularity-u2-l4-plan.md", "d": "D-306", "why": "`U2`'s L4 plan, rev 2 — `AN-28`'s first act: the six literals with their readers and test files, the five consumers' re-grain, the six design revs owed before any `src/` byte (item 1's group half now landed, its tool half named), the two-realm construction question, the `TOOL_GROUP_IDS`-with-the-registry ordering, and the order; no src byte"}]}
```
