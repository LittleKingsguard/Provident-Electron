# L3 — `module-system`: the pane declaration — `C-9`'s five nouns, the two placed arrays, and the parser that drops the member today

- **Layer:** L3 · **Module:** `module-system` · **Unit:** `modularity` (`U5`'s `S-17`) · **Branch:** `main` · **Rev:** 1 — **NEW, AND IT IS THE SPLIT `D-1` ASKS FOR AT THE CEILING**: `design.md` stands at **148/150** and `signatures.md` at **149/150**, so `S-17`'s cells are stated HERE and neither page is appended to (`D-1`, `D-2`, `AN-15`)
- **Inputs:** `docs/L1/modularity.md` §3 `S-17`, §4 `C-5`/`C-6`/`C-9`, §6 `M-17`; `docs/L3/module-system/{design,signatures}.md` by site; `src/shared/types.ts` (`ModuleCapabilities`, `ModuleListenerDeclaration`); `src/main/mcp-server.ts`'s `parseCapabilities`; `src/shared/demo-envelope.ts`'s pane container at `:951`; `docs/L3/declaration-registry/{design,signatures}.md`
- **Write scope:** `docs/L3/module-system/` (brief §3); `src/**` read-only at this layer (`D-3`) · **Status:** DESIGN — `S-17` is OWED to L4 and lands in `U5`'s sub-unit; no `src/**` byte carries it, so `M-17` is reserved and red for the absence it names (`D-40`)

## 1. The subject, and the two gaps it closes

- **THE GRAMMAR IS `C-9`'s FIVE NOUNS PLUS TWO ARRAYS OF PLACED DECLARATIONS** (`S-17`; §4 `C-5`, `C-9`): `{paneId, zone?, width?, height?, head, body, constraints?, listeners[]}`. The first five are the **pane API's** — declared record id, geometry source (`zone?` + the two axis defaults), head, body — and the last two are **`S-1` declarations placed on the pane**, the author's and never the API's. **THE NODE ID IS THE FIFTH NOUN AND NOT A MEMBER**: `S-17`'s cell says it is `renderer-wiring`'s map's answer to the record id (`PANE_NODE_IDS`, `S-18`), and §2 below states the ONE operand that makes that answer possible for a module pane.
- **AND THE MEMBER IS DROPPED TODAY — MEASURED, AT TWO SITES**: `ModuleCapabilities` (`src/shared/types.ts:249-257`) carries `tools`, `hooks`, `transforms`, `listeners` and `groups`, and **no `panes`**; `parseCapabilities` (`src/main/mcp-server.ts:331-369`) parses `tools`/`hooks`/`transforms`/`groups` and **returns only those four**, so a module's `capabilities.panes` is discarded at install. The registry's projection already reads it structurally (`declarationsOf`'s `read('pane', capabilities.panes, stringIds)`, `src/shared/registry/index.ts:220`) — so **the projection exists, the declaration cannot reach it, and the pane domain is empty by construction on both realms.** That is the gap `S-17` closes, and it is the reason this page is not merely a grammar.
- **WHAT IT IS NOT**: not the map (`S-18`), not the contribution that mints the nodes (`S-15`/`S-16`), not the isolated graph's placeholder route (`S-21`), and not the pane record's storage — `S-7` made the pane family total over the composed set already, and this page declares an id into that set, never a record's shape.

## 2. Structure — the declaration, member by member

| Member | Kind | What it is, and what it may not be |
|---|---|---|
| `paneId` | **API noun** · required, non-empty string | The pane's **DECLARED RECORD ID** — the key under the pane family (`['panes', paneId]`), the id `S-7`'s creation and second pass mint, and the id `S-18`'s map is keyed by. A module may not declare a foundation id: the registry refuses it by name (`S-6`'s `declaration-duplicate`, no second refusal here) |
| `zone?` | **API noun** (the geometry source) | One of the four foundation zone names **or a registry-declared zone id** (`declaredZoneIds()`), evaluated at admission. **ABSENT IS THE STAGE** (`C-9`'s absence rule): the pane stands where no zone fixes an axis, which is why `pane-a` behaves as a sidebar pane without carrying one |
| `width?` / `height?` | **API nouns** (the axis defaults) | The pane's own members' **initial** figures, used ONLY by a creation that has no stored record — a stored member is never rewritten (`C-9`, `D-105`; `S-7`'s `standMissingFamilies()`). Absent means the family's own default (`DEFAULT_PANE_SIZE`), never `0` |
| `head` | **API noun** · required node id | The authored **head row**'s node id — the element `attr(status)` is read off (`PANE_HEAD_IDS`' value one node over). **A NODE ID AND NOT A SUBTREE**: the module mints the node in its own contribution (`S-15`), and the map answers the correspondence (`S-18`) |
| `body` | **API noun** · required node id | The authored **scroll body**'s node id (`PANE_BODY_IDS`' value) — the node whose `overflow` the pane's fill writes (`D-243`, `D-270`). A node id, same rule |
| `constraints?` | **PLACED `S-1` declaration** | One address-keyed pair per element, at an address **under this pane's id** and nowhere else. Refused by name if it owns a foundation root or another author's address (§4 `C-5`); the pair's shape is the store's, adopted and not restated (`S-19`'s own point) |
| `listeners?` | **PLACED `S-1` declaration** | `ModuleListenerDeclaration` (`{address, main?, client?}`) at an address under the pane's id, its owner the module and its address its own (`C-5`). **A SUBSCRIBER IS NOT AN OWNER**: at a crossing's own address a listener adds no ownership and no inverse, and that difference is `C-5`'s whole distinction |

- **THE ONE OPERAND THAT MAKES THE NODE ID ANSWERABLE, AND IT IS ALREADY AUTHORED**: a pane's container node carries **`props.pane = paneId`** — `src/shared/demo-envelope.ts:951` (`props: { id, pane: paneId, zone }`) does it for every foundation pane, and `installPaneCollapse` already reads that operand off a node at press time (`C2`). So `S-18`'s module arm resolves the container from the **composed graph** by that member, and the foundation's five literal tables stay literals (`PM-2`'s spelling rule unmoved): **the foundation's ids are spelled, a module's are found.**
- **A MODULE PANE'S NODE IDS ARE ITS OWN CONTRIBUTION'S** (`S-15`, `C-6`): `head`/`body` name nodes the module's contribution mints, and no member names the container because the container is the node that carries `pane: paneId`. **A DECLARATION WHOSE `head`/`body` NAMES NO COMPOSED NODE IS REFUSED BY NAME AT COMPOSITION** (`S-18`'s arm), never silently painted into nothing — the `absent` silence `D-225` already records as the wrong answer here.
- **THE NODES ARE NOT THIS PAGE'S TO COMPOSE** (`C-6`, `S-15`): the contribution is a graph-data list in the resolver's activation order, merged before `translateLegacy`; this page declares the correspondence and mints no node.

## 3. The parse, and the refusals

- **THE MEMBER IS TYPED AND KEPT BY SHAPE** (`S-17`'s owed edit, `D-315`'s "a refusal is a value"): `ModuleCapabilities` gains `panes?: readonly PaneDeclaration[]`, and `parseCapabilities` gains `panesOf(c.panes)` built exactly as `groupsOf` is (`mcp-server.ts:349-360`) — each entry kept only where every required member is a non-empty string, `constraints`/`listeners` kept only where they are arrays of that shape, and **a malformed entry DROPPED with a named refusal, never coerced**.
- **THE REFUSALS, EACH A NAME AND A SUBJECT** (`D-105`): `pane-undeclared-id` (no `paneId`), `pane-unheaded` (no usable `head`), `pane-unbodied` (no usable `body`), `pane-zone-unknown` (a `zone` neither the foundation nor the registry declares), `pane-placed-address-owned` (a `constraints`/`listeners` address that owns a foundation root or another author's address — `C-5`). **The first four stand in the parse; the last needs the registry and stands at admission**, where `declaredZoneIds()` and the address rule are answerable — the same split `S-9` records for the operator record (`D-323`: ask the domain where the domain can be asked).
- **A DUPLICATE `paneId` IS THE REGISTRY'S REFUSAL AND NOT THIS PAGE'S** (`S-6`'s `declaration-duplicate`): a module naming a foundation pane id, or naming one twice, is refused there BY NAME and the set keeps what it admitted. This page adds no second net — a second refusal for one fault is the double-naming `D-129` forbids.

## 4. What this page does not own

- **`S-18`'s map, and the container resolution**: this page states the OPERAND (`props.pane`), and the map's module arm, its `PM-1` re-grain and `M-18` are `renderer-wiring`'s, written by that step.
- **The contribution and its order** (`S-15`/`S-16`): what nodes a module mints, and when they merge, is the resolver's answer; a pane declaration names three of them and composes none.
- **The isolated graph's placeholder route** (`S-21`): a pane in the app graph and a fill under a placeholder in the overlay are two different points (`C-8`), and this page declares neither's composition.
- **The pane record's family** (`S-7`): the record's creation, the second pass and the admission predicates are total over the composed set already; this page widens that set by declaring into it.

## 5. The battery — `M-17`

- **`M-17` IS RESERVED AND FILED WITH `S-17`** in `tests/integration/module-system/pane-declaration.test.ts` (this module's map row claims the directory), RED until this design lands (`L1` §6, `D-40`). **ITS GRAIN IS INTEGRATION** by `D-324`'s rule: the census cannot be seeded through a sanctioned route, so a booted row cannot carry a module's `capabilities.panes` where a boot-constructed registry would read it.
- **ARM (i) — THE MEMBER SURVIVES THE PARSER**: a source declaring two panes yields two entries after `parseCapabilities`, and a source declaring a pane with no `head` yields **one entry and one named refusal** — the drop is measured, not assumed.
- **ARM (ii) — THE PANE REACHES THE COMPOSED SET AND A FOUNDATION ID IS REFUSED BY NAME**: a registry composed over the parsed carriers answers `declaredPaneIds()` with the module's ids appended after the foundation's; a module naming `pane-a` is refused with the registry's own `declaration-duplicate`, and the set is unchanged.
- **ARM (iii) — THE PLACED ARRAYS**: a `listeners` element at an address under the pane stands and an element owning a foundation root is refused by name; a constraint pair is carried whole and restated nowhere.
- **WHAT NO ROW HERE CAN SEE**: the rendered pane (`S-18`'s map and the app leg), the contribution's own nodes (`S-15`), and the overlay (`S-21`) — a green here is the declaration's and the parser's, never the surface's (brief §6, `D-27`).

## 6. Assumptions, each with the alternative it rejected

- **`ASM-PD-1` — `head`/`body` are NODE IDS the module's contribution mints.** Rejected: a subtree literal in the declaration (it would put graph data in a manifest and make the declaration the composition point `C-6` reserves); deriving them from `paneId` (a convention no row could read, and `D-188` debt 2's exact class).
- **`ASM-PD-2` — the container is FOUND by `props.pane`, never derived from the id.** Rejected: `nodeId = paneId` for module panes (the identity `PM-2` bans, and a rule that would be right once and wrong after); a sixth grammar member naming the container (it would make `C-9`'s node id the declaration's rather than the map's, which `S-17`'s own cell refuses).
- **`ASM-PD-3` — `zone?` is validated at ADMISSION, where `declaredZoneIds()` is answerable.** Rejected: validating in the parse (the registry does not exist at install, and a foundation-only check would refuse a composed zone id); a free-form zone string (a pane in no zone and in a typo, indistinguishably).
- **`ASM-PD-4` — a malformed entry is DROPPED AND NAMED, never refused whole.** Rejected: refusing the module for one bad pane (a manifest's pane list is not the module's identity, and `S-6` already refuses per id); coercing defaults (`D-105`'s second-authority class).
- **`ASM-PD-5` — the two arrays are placed declarations, refused where they would own another author's address.** Rejected: modelling them as pane API nouns (the over-fit `C-9` and the firewall sentence forbid it); accepting any address (a module's constraint at the view record's root is a second author on `C-5`'s own address).

## 7. Debts this page does not discharge

- **`docs/L2/module-system/interface.md` rev is OWED** (`D-1`'s split rule): its `capabilities` grammar names four members and the fifth's absence, and it must say so in its own words.
- **`docs/L3/renderer-wiring/module-shape-signatures.md` §2 is STALE and `S-18`'s own rev corrects it**: it says *"the composed set is `U2`'s … the five tables are total over the foundation's set today"* — `U2` has landed (`CH-31`…`CH-36`), so the sentence is a reading of a tree that no longer stands.
- **`src/shared/types.ts` is `ipc-contract`'s and `src/main/mcp-server.ts` is this module's**: the member and its parser land together in one edit (`C-4`'s widening rule), and the registry's structural read (`DomainCapabilities`) drops to the typed member in the same pass.
- **`M-17`'s file is the landing act's**; `M-18` is `S-18`'s and this page does not claim it.

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "module-system", "writes": [{"path": "docs/L3/module-system/pane-declaration.md", "d": "D-306", "why": "this page, rev 1 NEW — S-17 split by owner at the ceiling: the seven-member grammar with C-9's five nouns, the two placed arrays and the C-5 ownership rule, the measured double gap (untyped member, parser dropping it), the props.pane operand that makes a module pane's node answerable, the refusals split parse-versus-admission, M-17's three arms, five assumptions and the three debts; no src byte"}]}
```
