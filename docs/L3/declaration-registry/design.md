# L3 — `declaration-registry`: the file, the composition, the five queries and the consumers' re-grain

- **Layer:** L3 · **Module:** `declaration-registry` · **Unit:** `modularity` (`U2`) · **Branch:** `main` · **Rev:** 2 — **THE CONSTRUCTION IS PER REALM, AND THE PROJECTION FROM A CARRIER IS ONE** (`ASM-DR-4`): rev 1's *"constructed once, at boot"* was main's sentence stated as the app's, so §1 re-grains it, §2 names each realm's inputs and the projection that keeps them from spelling one declaration two ways, and §5 and §6 carry the guardrail and the row. **Rev 1 was NEW**: `docs/L2/declaration-registry/interface.md` rev 1 fixes the module's cells; no page stated the structure, the signatures or the guardrails under them (`D-1`, brief §3)
- **Ceiling:** 150 lines (class max); replaced, never appended (`D-1`, `D-2`) · **Citations:** a source cite names its site and never an offset (`D-41`)
- **Inputs:** `docs/L2/declaration-registry/interface.md` rev 1 §1–§7; `docs/L1/modularity.md` rev 21 §3 `S-6`…`S-10`, §4 `C-4`/`C-9`/`C-11`, §6 `M-6`…`M-10`; `src/shared/view-shape.ts`, `src/shared/types.ts`, `src/renderer/secure-panels.ts` by site; `D-306`, `D-129`, `D-146`
- **Write scope:** `docs/L3/declaration-registry/` (brief §3); `src/**` is read-only at this layer (`D-3`)
- **Status:** DESIGN — `S-6`'s structure is below and its signatures are `signatures.md`; **the L4 is OWED**, and `OWED-4` fixes `S-6` and the consuming re-grains (`S-7`…`S-10`, `S-18`) to land in ONE sub-unit

## 1. The file, and the three things it holds

- **ONE FILE, `src/shared/registry/index.ts`**, holding (i) the five domains as a closed list, (ii) the composed entries per domain, and (iii) the five queries with their accessors. **No type of a consumer's, no paint, no store** — it is shared data and five functions.
- **IT IS CONSTRUCTED ONCE PER REALM THAT HAS A CONSUMER** — main at boot from the foundation's literals and the activations the executor answers (`S-6`, `S-15`'s order), the renderer from the literals IT can read and the declarations the app-state rows already carry (`ASM-DR-4`, `docs/L2/declaration-registry/interface.md` §4); **nothing re-composes either registry at runtime** — a module's declaration arrives with its activation and a deactivation's is the inverse's (`S-23`).
- **THE DOMAINS ARE A CLOSED FIVE** (`C-4`): `pane`, `zone`, `group`, `tool`, `placeholder` — a sixth is a corpus change and not a data change, so the list is a literal with its reason beside it.

## 2. The composition

- **`createRegistry(foundation, declarations)`** mints the foundation's entries from its five literals — in the literal's own order — then appends each declaration's entries in the order the resolver fixed (`C-11`). **THE FOUNDATION'S ANSWER IS ITS LITERAL'S ANSWER**: `declaredPaneIds()` answers `DECLARED_PANE_IDS` element for element while nothing declares a pane.
- **A DUPLICATE ID IS REFUSED AS A VALUE, NOT THROWN** (`D-105`'s rule applied here): `{status:'refused', reason:'declaration-duplicate', subject: id}` — the first one to claim an id holds it, and the second is answered BY NAME. **A REFUSAL NEVER HALVES THE SET**: the registry keeps what it admitted and the boot names what it refused.
- **A MODULE'S ENTRY CARRIES ITS `origin`**, so a consumer can say *who declared this pane* without a second lookup; the foundation's entries carry `source: 'foundation'` and no origin.
- **THE ORDER IS STABLE AND THE SET IS A SET**: the composed list is built once, in that order, and a later read never re-sorts — a consumer's iteration is the same on every boot (`S-6`'s "no caller re-sorts").

**The two constructions, and what each hands the function** (`ASM-DR-4`)

- **THE FOUNDATION INPUT IS PER REALM AND IS NEVER DELIVERED**: main hands all five literals — pane and zone from `src/shared/view-shape.ts`, group and tool from their main-side sites, placeholder empty; the renderer hands the four it can read and an empty tool list. **A realm handed a delivered set would be consuming a composition rather than making one**, which is the alternative `ASM-DR-4` refuses.
- **THE DECLARATION INPUT IS ONE PROJECTION OF ONE MEMBER**: `declarationsOf(carrier)` (`signatures.md` §2) reads `capabilities` — main's carrier is the activated manifest, the renderer's is the `ModuleListEntry` row — so the two realms cannot spell one declaration two ways, and the renderer needs no new member, route or delivery (`D-18`).
- **A DOMAIN WITH NO CONSUMER IN A REALM IS COMPOSED EMPTY THERE**: the tool domain in the renderer, the placeholder domain in main. That is `C-9`'s totality read per realm, not a gap; the alternative — every realm composing every domain — would make main read the renderer's envelope and the renderer read `ALL_TOOLS`.
- **THE GROUP DOMAIN'S SIX IDS MUST BE DATA THE RENDERER CAN READ**, and the roster `S-10` makes a projection cannot be that data without making `S-10`'s set-equality row vacuous; the shared home is `S-8`'s to declare, and this page states only the constraint.

## 3. The five queries

- **A QUERY ANSWERS THE IDS, AN ACCESSOR ANSWERS THE ENTRIES**: `declaredPaneIds()` is `paneEntries().map(entry => entry.id)`, and the same pairing holds for the other four. **ONE DERIVATION, TWO READINGS** — a query that re-derived the ids would be a second authority beside its own accessor.
- **THEY ARE TOTAL OVER THE COMPOSED SET** (`C-9`): there is no arm for "the foundation's only" and no arm for "a module's own"; a consumer that wants the foundation's answer reads the literal (`ASM-DR-2`).
- **A DOMAIN WITH NO ENTRY ANSWERS AN EMPTY LIST AND NEVER `undefined`**: a consumer iterating it is total by construction, which is what lets `S-18`'s census maps be derived over `declaredPaneIds()` without a guard.

## 4. The consumers' re-grain, each named with its site

- **`S-7` — `store-view-record`**: `DECLARED_PANE_IDS`/`DECLARED_ZONE_IDS` become the foundation's contribution and the repair reads the composed set through `declaredPaneIds()`/`declaredZoneIds()`; **the repair stays total** over it, and `panesMustStand` keeps naming the pane it repaired.
- **`S-8` — `mcp-surface`**: `ToolGroup` becomes the registered set and `ALL_TOOLS` the composed tool set; **a module-declared group carries its own label** and the invocation two-gate reads the composed groups.
- **`S-9` — `operator-settings`**: the instance's `VALID_GROUPS` copy dies at its source, because the registry is the reading the second copy was standing in for.
- **`S-10` — `secure-panels`**: `GROUP_LABELS`' compile-time net cannot survive the group domain becoming data, so that step REPLACES it — **the placeholder domain is the fifth and is AUTHORED on ruling (b)'s authority**, not widened.
- **`S-18` — `renderer-wiring`**: the five census maps become total over `declaredPaneIds()`, which is why `AN-15`'s split and this registry name each other.

## 5. Guardrail notes

- **No second authority**: the literals are the foundation's contribution and are read; the registry never authors its own input (`ASM-DR-2`, `D-129`).
- **No last-wins**: a duplicate is a refusal with its id as subject (`ASM-DR-3`).
- **No domain type of a consumer's**: a group's label, a pane's geometry and a zone's figure stay with their owners (`C-9`, `S-17`).
- **No MCP member, no route, no transport**: in-process data read at boot (`D-18`).
- **No delivered composition**: each realm composes from facts it reads — a foundation literal and the `capabilities` member — and main never hands the renderer a registry (`ASM-DR-4`).
- **No boot-time side effect**: constructing the registry paints nothing and repairs nothing; it answers.

## 6. The battery

- **`tests/unit/declaration-registry/`** (the map row's path): the composition's order, a duplicate refused by name with the id as subject, the foundation's answer equal to its literal, a domain with no entries answering `[]`, and each query equal to its accessor's projection.
- **`tests/integration/declaration-registry/`**: two modules declaring into one domain in activation order, a module claiming a foundation id, a consumer reading the registry instead of its literal, and **the two realms' row** — one foundation input and one delivered carrier set answering the same foundation entries and the same composed set as the main-side construction, so *one fact, two constructions* is a reading and not a claim (`ASM-DR-4`).
- **No `tests/e2e/` row**: the registry's boundary is a function call in one process, so a booted bundle would measure the same five functions — `M-6`…`M-10` are the rows, and `M-18` is `renderer-wiring`'s.

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "declaration-registry", "writes": [{"path": "docs/L3/declaration-registry/design.md", "d": "D-306", "why": "this page, rev 2 — the construction is once per realm and not once per app, the foundation input and the declaration input each realm hands, the domains composed empty where no consumer asks them, the group ids' shared home left to S-8 with its constraint, the no-delivered-composition guardrail, and the integration row that reads the two constructions; no src byte"}]}
```
