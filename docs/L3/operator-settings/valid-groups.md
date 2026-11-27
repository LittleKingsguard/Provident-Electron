# L3 — `operator-settings`: the group domain is the registry's reading — one thunk, one gate (the patch), and shape-only everywhere else

- **Layer:** L3 · **Module:** `operator-settings` · **Unit:** `modularity` (`U2`'s `S-9`) · **Branch:** `main` · **Rev:** 2 — **REV 2 RE-GRAINS WHAT REV 1 COULD NOT KNOW: THE BOOT ORDER PUTS THE DOMAIN'S FIRST READ BEFORE THE REGISTRY** (`AN-30`, `D-46`): the set is a THUNK and the PATCH is its one gate; the read, the registration constraint and the live repair are SHAPE-only. Rev 1's *"held once, three readers"* and its required-option arm are withdrawn with the measurement that killed them; the subject is unmoved.
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Write scope:** `docs/L3/operator-settings/` (brief §3); `src/**` read-only at this layer and neither package is ever modified (`D-3`, `D-5`)
- **Inputs:** `docs/L1/modularity.md` §3 `S-9`, §4 `C-4`, §6 `M-9`; `docs/L2/declaration-registry/interface.md` §3–§4; `docs/L3/mcp-surface/group-domain.md` §1–§2; `src/main/operator-settings/index.ts`, `src/main/settings-surface/index.ts`, `src/main/main.ts` by site; `D-11`, `D-19`, `D-35`, `D-105`, `D-129` · **Status:** LANDED (`RG-15`): the literal is gone, the thunk is threaded from `main.ts`, and `M-9`'s three rows are green

## 1. The subject, and where the domain is asked

- **THE SECOND LIVE COPY IS GONE** (`S-9`, `D-11`): `const VALID_GROUPS = new Set(['read','dispatch','graph','code','module','data'])` no longer exists at `src/main/operator-settings/index.ts`. No literal replaced it; the domain is `OperatorSettingsOptions.groups`' answer.
- **THE PATCH IS THE DOMAIN'S ONE GATE**: `write({enabled})` filters the list through the set it is handed (`admitGroups(enabled, domain())`), keeping the caller's order and dropping a name outside it — the landed behaviour, its source composed.
- **EVERYTHING ELSE IS SHAPE-ONLY, AND THAT IS THE ORDER'S RULING** (`AN-30`'s fix (a), measured): `fromStored` (the live record's read) and `groupsAdmit`/`recordAdmitsAt` (the registration constraint and the repair) admit a list of non-empty, unrepeated strings and ask no domain. **THE INSTANCE IS CONSTRUCTED BEFORE THE GATE AND BEFORE THE CENSUS**, and the registry needs the census's records while the census reads the store this instance creates — so a domain asked at the construction would be a domain that does not yet exist. A stored module group is therefore CARRIED, not refused: it is inert until an operator's patch or the next declaration admits it.
- **THE RETIRED CARRIER'S ONE-TIME IMPORT KEEPS ITS OWN CHECK** (`D-19`'s landed row, unmoved): `provident-settings.json` predates the module skeleton, so `importOnce` filters by `TOOL_GROUP_IDS` — the shared literal, never a copy — and a name it cannot hold is junk.

## 2. The interface: one optional thunk, defaulting to the foundation's own six

| Name | Site | Kind | What it is |
|---|---|---|---|
| `OperatorSettingsOptions.groups` | `src/main/operator-settings/index.ts` | NEW · **optional** member | `() => readonly string[]` — a THUNK, because the instance exists before the registry does. **Absent answers `TOOL_GROUP_IDS`** (`src/shared/types.ts`): the foundation's own contribution, one spelling, and never a local six-id literal |
| `groupDomain` / `domain()` | the instance | NEW · private | `options.groups ?? (() => TOOL_GROUP_IDS)`; `domain()` builds a `ReadonlySet` per call, so no held set and no mutable module-level list exists (`D-129`; `S-9`'s `ASM-OS-2`) |
| `storedGroups` | the file | NEW · private | the shape rule: non-empty strings, first occurrence first, caller's order, never re-sorted (`interface` §2 `A-5`) |
| `admitGroups` | the file | MOVE · one parameter | `(list, groups)` — `storedGroups` narrowed to the set; the import and the patch are its two callers and nothing else |
| `createSettingsSurface`'s options | `src/main/settings-surface/index.ts` | MOVE · one optional member | `groups?: () => readonly string[]`, passed through to the instance and asked nowhere else by the surface |

- **WHY OPTIONAL AND NOT REQUIRED** (rev 1 chose required, and the choice is withdrawn with its premise): rev 1 required it because the READ filtered by the set — a default would then have dropped every stored grant. With the read shape-only, a default can drop nothing, and requiring it would red every construction site in the suite for a value that is already the foundation's contribution (`TOOL_GROUP_IDS`).
- **WHY A THUNK AND NOT A SET**: rev 1's "held once" is impossible at this order. A thunk answered once per patch is ONE source (the registry), and a set captured at construction would be the pre-registry empty answer for the process's life.

## 3. The order at the boot, and the one line that changes

- **`main.ts` DECLARES THE REGISTRY'S SLOT BEFORE THE SURFACE AND FILLS IT AFTER THE CENSUS**: `let moduleRegistry: DeclarationRegistry | null = null`, then `groups: () => moduleRegistry?.declaredGroups() ?? []` on `createSettingsSurface`'s options, then — after `bootCensus` — `moduleRegistry = createRegistry({…}).registry`. The `?? []` is unreachable at a patch (no IPC handler can run before this line) and is the type's own total answer, never a second policy.
- **THE FIVE FOUNDATION LITERALS ARE HANDED THERE, ONCE** (`S-6`'s construction): `DECLARED_PANE_IDS`, `DECLARED_ZONE_IDS`, `TOOL_GROUP_IDS`, `ProvidentMcpServer.ALL_TOOLS`, and the placeholder domain empty (`C-4`; `docs/L3/declaration-registry/design.md` §2). The module half is the census's own records through `declarationsOf`.
- **THE SET'S CONTENT TODAY IS THE FOUNDATION'S SIX PLUS ANY RECORD'S `capabilities.groups`**: `mcp-server.ts`'s `ModuleRecord.capabilities` does not yet carry `groups`, so a module-declared group reaches the domain only when `S-8` widens that record — named, not assumed.

## 4. The battery — `M-9`, as landed

- **`M-9` IS FILED AND GREEN** at `tests/integration/settings-carrier-retirement/valid-groups.test.ts` (this module's map row claims the directory), unmarked and gating (`D-40`). Three rows: **(a)** the read carries a stored name the domain no longer admits, across a second construction — the boot filters nothing; **(b)** the patch filters by the set it is handed, and the row that proves the literal is gone is a module group (`reporting`) the foundation's six never held, while an absent thunk drops it; **(c)** a name outside the default's six survives construction and its own re-read, and the next write with the default domain drops it.
- **THE RETIRED CARRIER'S ROW IS UNMOVED**: `tests/integration/security-store-storeroom/instance.test.ts`'s import row still proves that the legacy file's grants are deduplicated through the six-member set — its subject is the import, not the live record.
- **WHAT NO ROW HERE CAN SEE**: the operator's click and the gate's answer — a green here is the instance's, never the app's (brief §6, `D-27`).

## 5. Assumptions, each with the alternative it rejected

- **`ASM-OS-1` — the domain is an OPTIONAL THUNK defaulting to `TOOL_GROUP_IDS`.** Rejected: a required member (it reds every construction site for the foundation's own contribution, and buys nothing once the read is shape-only) and a default of `[]` (a domain that refuses every patch and no longer protects any read).
- **`ASM-OS-2` — one source asked per call; no held set and no module-level mutable list.** Rejected: a set captured at construction (the pre-registry answer for the process's life) and a late `configure`/assignment (a second writer of the domain, `D-129`).
- **`ASM-OS-3` — the domain is asked at the PATCH alone; the read, the constraint and the repair are shape-only.** Rejected: asking it at the registration constraint, which refuses the whole instance at boot for a name the registry would have admitted had it stood — the measured `ConstraintRefusedAtRegistration` this rev's tests first hit.

## 6. Debts this page does not discharge

- **`src/main/settings-surface/index.ts` is the `settings-surface` row's** and `src/main/main.ts` is `app-shell`'s: the pass-through member and the registry's construction site are declared here and carried there (`D-301`, `D-302`).
- **`S-8`'s composed rule is still owed and is not blocked by this page**: `ToolGroup`/`groupOf` and the gate's validator need the registry at `main.ts`'s gate construction, which stands *before* the census and must MOVE after it — an `app-shell` edit in that step.
- **`mcp-server.ts`'s `ModuleRecord.capabilities` must gain `groups`** before a module group can reach the set (`S-8`'s site).
- **The `endpoints` figure is read, never asserted** (`D-26`, `D-41`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "operator-settings", "writes": [{"path": "docs/L3/operator-settings/valid-groups.md", "d": "D-306", "why": "this page, rev 2 — the boot order re-grains S-9: the domain is an optional thunk defaulting to TOOL_GROUP_IDS, the PATCH is its one gate, and the read, the registration constraint and the repair are shape-only (AN-30's fix (a)); rev 1's required option and held set are withdrawn with the measurement that killed them; the landed battery is M-9's three rows"}, {"path": "src/main/operator-settings/index.ts", "d": "D-306", "why": "S-9 LANDED — VALID_GROUPS retires whole; storedGroups is the shape rule, admitGroups takes the set for the import and the patch, groupsAdmit/recordAdmitsAt are shape-only, and the instance asks options.groups ?? (() => TOOL_GROUP_IDS) per patch", "by": "L4"}, {"path": "src/main/settings-surface/index.ts", "d": "D-306", "why": "the groups thunk is passed through to the instance and asked nowhere else by the surface — the settings-surface row's file, declared here as this pass's cross-seat write", "by": "L4"}, {"path": "src/main/main.ts", "d": "D-306", "why": "app-shell's file: the registry's slot is declared before the surface, the thunk is handed to createSettingsSurface, and the registry is constructed over the five foundation literals and the census's records after the boot delivery", "by": "L4"}, {"path": "tests/integration/settings-carrier-retirement/valid-groups.test.ts", "d": "D-306", "why": "M-9's three rows: the read carries a stored name the domain no longer admits, the patch filters by the set it is handed (and a module group is the row that proves the literal is gone), and the default's six are a domain and never a boot-time filter", "by": "L4"}]}
```
