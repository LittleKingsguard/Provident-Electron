# L3 — `operator-settings`: the valid-group set is the registry's reading — one required input, three readers, no literal

- **Layer:** L3 · **Module:** `operator-settings` · **Unit:** `modularity` (`U2`'s `S-9`) · **Branch:** `main` · **Rev:** 1 — **NEW, AND IT IS A SPLIT, NOT AN APPEND** (`D-1`, `D-2`): this module's standing design page is `docs/L3/security-store-storeroom/design.md`, unit-named and at 150/150, and `delivery.md` is the crossing's own page — so `S-9`'s cells are stated HERE by owner (the `store-tabs-record/delivery.md` and `mcp-surface/group-domain.md` splits are the precedent)
- **Inputs:** `docs/L1/modularity.md` §3 `S-9`, §4 `C-4`, §6 `M-9`; `docs/L2/declaration-registry/interface.md` §3–§4 (the composition and `declaredGroups()`); `docs/L3/mcp-surface/group-domain.md` §1–§2; `src/main/operator-settings/index.ts` (the literal, `admitGroups`, `groupsAdmit`, `recordAdmitsAt`, `createOperatorSettings`), `src/main/main.ts` by site; `D-11`, `D-15`, `D-35`, `D-105`, `D-129`
- **Write scope:** `docs/L3/operator-settings/` (brief §3); `src/**` read-only at this layer and neither package is ever modified (`D-3`, `D-5`) · **Status:** DESIGN — `S-9` is OWED to L4 and lands in `U2`'s one sub-unit (`OWED-4`); no `src/**` byte carries it, so `M-9` is reserved and red for the absence it names (`D-40`)

## 1. The subject: the second live copy, and the three readers that must stop reading it

- **THE LITERAL IS `const VALID_GROUPS: ReadonlySet<string> = new Set(['read','dispatch','graph','code','module','data'])`** at `src/main/operator-settings/index.ts` — the file's own copy of the six ids, beside `src/main/security.ts`'s (`S-8`'s). It is a **live second copy of one SET** and not a label table (`E-1`'s distinction): this module carries no labels, so no compile-time net is owed here and none stands (`docs/L1/modularity.md` §1).
- **THREE MODULE-LEVEL READERS, AND NO FOURTH**: `admitGroups` filters a stored list on it (`:295`, reached from `fromStored`'s two arms and the patch at `:1402`), `groupsAdmit` admits a record's `enabled` array on it (`:810`), and `recordAdmitsAt` admits an `enabled.<name>` leaf on it (`:844`). The patch's call is `admitGroups`' and not a fourth literal read.
- **THE RULE DOES NOT MOVE; ITS SOURCE DOES** (`S-9`, `D-11`): a stored name the domain does not hold is still filtered out by the read and refused by the repair and the patch — the three behaviours are today's. What retires is the literal they read.

## 2. Structure — one required input, held once, passed three ways

| Name | Site | Kind | What it is |
|---|---|---|---|
| `OperatorSettingsOptions.groups` | `operator-settings/index.ts` | NEW · **REQUIRED** member | `readonly string[]` — the group domain, as `registry.declaredGroups()` answers it. **Required, and that is the design**: a default would be the copy resurrected under another name (a six-id literal) or a silent grant loss (an empty set), so the omission is a `typecheck` red at every construction site — the re-grain's own list, on the floor leg (`D-11`, `D-35`) |
| `groups` (instance field) | `operator-settings/index.ts` | NEW · private readonly | `ReadonlySet<string>` built once in `createOperatorSettings` from the option; the three helpers receive it as a parameter, so no module-level mutable set and no second holder exists (`D-129`) |
| `VALID_GROUPS` | `operator-settings/index.ts` | RETIRE · read by nothing here | the six-id literal; with it retire the three reads above and nothing else |
| `admitGroups`, `groupsAdmit`, `recordAdmitsAt` | `operator-settings/index.ts` | MOVE · one parameter | each gains `groups: ReadonlySet<string>` as its LAST parameter and reads `groups.has(name)`; the order, the dedupe and the never-re-sort rule are unmoved (`interface` §2 `A-5`) |

- **THE INSTANCE TAKES THE SET AND NOT THE REGISTRY**: importing `DeclarationRegistry` into this file would put a second construction's type in a boot-order it does not own, and the instance needs one question (`has`), never an entry (`D-129`; `ASM-GD-1`'s posture at this axis).
- **THE SET IS PASSED AT THE ONE CONSTRUCTION SITE THAT HAS ONE**: `main.ts` constructs the registry over the boot census, then the gate (`S-8`'s rule), then this instance with `groups: registry.declaredGroups()` — `D-316`'s order, and the registry is boot-constructed and read-only, which is exactly what a valid-domain read needs (a later `module.install` is not in the set until the next boot's census, the same law the registry itself lives under).
- **AN EMPTY SET IS LAWFUL AND MEANS "NOTHING IS A GROUP"**: the filter answers `[]`, the admission refuses every non-empty list, and the patch admits nothing — the same total posture the gate carries with no groups enabled. **No fallback to `FIRST_RUN.enabled` exists**, because the first-run grant is a *grant* and this input is the *domain*.

## 3. What this page does not own

- **`src/main/security.ts`'s own copy is `S-8`'s** (`docs/L3/mcp-surface/group-domain.md` §1): this step removes the second copy, never the first, and the gate's validator reads the composed rule there.
- **The renderer's roster is `S-10`'s** (`docs/L3/secure-panels/roster-and-placeholders.md`): the renderer never reads this instance's set, and no bridge member carries it (`D-18`).
- **The crossing's delivery is `delivery.md`'s**: this page changes no address, no entry, no queue and no receipt.
- **`main.ts` is `app-shell`'s**: the construction site's new argument is that seat's declared write, in the same act as the registry's and the gate's (`D-301`, `D-302`).

## 4. The battery — `M-9`, and what its witness can see

- **`M-9` IS RESERVED AND FILED WITH `S-9`** in `tests/integration/settings-carrier-retirement/` (this module's map row claims that directory), and it is RED until this design lands (`L1` §6; `D-40`). Its witness constructs the instance over a profile carrying `enabled: ['read', 'no-such-group']` twice: once with a set declaring `read` and once with a set declaring neither.
- **ARM (i) — THE READ FILTERS BY THE SET**: the first answers `enabled: ['read']`, the second `enabled: []`. **A row that passes a set containing a name the literal never held is the one that proves the literal is gone**: the set declares `reporting` (a module group), the stored record carries it, and the read keeps it.
- **ARM (ii) — THE REPAIR AND THE PATCH AGREE WITH THE READ**: a stored `enabled: ['read','no-such']` is repaired to `['read']` by the same set, and the patch refuses `['no-such']` whole rather than filtering it — the two admission arms (`groupsAdmit`, the patch's `admitGroups`) read the same set as the read.
- **WHAT NO ROW HERE CAN SEE**: the operator's click, the gate's answer and the boot's construction order (`D-316`) — a green here is the instance's, never the app's (brief §6, `D-27`).

## 5. Assumptions, each with the alternative it rejected

- **`ASM-OS-1` — the domain is a REQUIRED option, not a defaulted one.** Rejected: an optional member defaulting to the six-id literal (the copy, renamed), and one defaulting to `[]` (a silent grant loss on every construction site that forgot it). A required member turns both into a `typecheck` red at the site.
- **`ASM-OS-2` — the instance holds the SET, and the helpers take it as a parameter.** Rejected: a module-level mutable set (a second holder and a test seam no row can see, `D-129`), and closing the helpers over the instance's field (they are module-level and shared by the repair and the patch, which run outside the instance's `read`).
- **`ASM-OS-3` — the source is `registry.declaredGroups()` and the order is the caller's.** Rejected: re-sorting into the foundation's order, which `interface` §2 `A-5` names as the rule the order row discriminates against; and reading `TOOL_GROUP_IDS` directly, which would keep the foundation's six and never admit a module group.

## 6. Debts this page does not discharge

- **The `endpoints` figure is read, never asserted** (`D-26`, `D-41`): whether a required option member moves the `operator-settings` row's count is the landing act's reading of `strata/modules.json`, and no number is written here.
- **The tests' construction sites are the landing act's re-grain**: a required member reds every `createOperatorSettings({ userDataDir })` in the suite (`tests/**`), so the landing pass adds `groups` there in the same edit — that red IS the coupling the required member buys.
- **`M-9`'s witness is not filed by this rev**: a reserved row is filed with the step whose landing makes it green (`L1` §6; `D-40`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "operator-settings", "writes": [{"path": "docs/L3/operator-settings/valid-groups.md", "d": "D-306", "why": "this page, rev 1 NEW — S-9 split by owner at the standing page's ceiling: the second live copy of the six ids found at three readers (`admitGroups`, `groupsAdmit`, `recordAdmitsAt`), a REQUIRED `OperatorSettingsOptions.groups` from `registry.declaredGroups()` so the omission is a typecheck red rather than a renamed literal, the set held once and passed as a parameter, the empty set lawful, `main.ts`'s argument as app-shell's declared write, `M-9`'s two arms, three assumptions and the debts; no src byte"}]}
```
