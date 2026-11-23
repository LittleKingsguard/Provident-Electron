# L2 — `module-system`: the module contract and its executor — one manifest, two deliveries through one loader, two ctx halves, admission, the resolver, and the crossing that carries a client source as a string

- **Layer:** L2 · **Module:** `module-system` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **REV 2 RE-DERIVES THIS SURFACE'S `endpoints` COUNT FROM THE MEMBERS THIS PAGE ITSELF DECLARES, FIXES `23`, AND MOVES NOTHING ELSE** (`D-14`, `D-43`; §13): the cap that follows is `50 + 10×23 = 280`, so the count — and not a trim, and not a shed battery row — answers the escalation the L3 pass routed (`strata/records/modularity-unit.md` finding (i)), and the map row's move `16 → 23` stays L1's to file. **REV 1 WAS `NEW`**, because the module surface `U1` designs has had no L2 home: `S-1`, `S-2`, `S-2b`, `S-3` and `S-4` are stated here at the I/O grain, and the steps that extend this module later (`S-15`, `S-16`, `S-22`…`S-24`) cite it rather than re-spell it (`D-305`, `D-306`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** a site and never an offset (D-41); a figure this page states is one this pass read off the tree, and a figure another document owns is read there and not restated (D-26, D-43)
- **Charter:** `D-304`'s must-haves this module carries — *"main-side module code … a listener or the managed channel can reference"*, *"client/Renderer-side module code"*, *"dependency resolution — ex. module B requires module A vers. >1.1.0"*, *"ordered invocation of multiple `provident-ssr` graph modifications before render"* — under `D-306`'s three rulings and `D-307`'s two-half listener. **`L1` below is `docs/L1/modularity.md` rev 15**: its §2 row for this module, §3 `S-1`…`S-4`, §4 `C-1`…`C-3`/`C-11`/`C-12`/`C-15`/`C-16`, §6's `M-1`…`M-5`
- **Write scope:** `docs/L2/module-system/` and `tests/integration/module-system/` (brief §3). `src/**` is read-only at this layer and neither package is ever modified (D-3, D-5)
- **Status:** DESIGN — and it fixes **no structure, signature or pseudocode**: `docs/L3/module-system/` is that grain (brief §3, D-1). Its battery is **RED-FIRST**, and §12 states the grain exactly: seven of its eight rows red for ONE absence (`src/main/modules/` and `src/shared/module-contract.ts` are both NEW at L1 §2) and `I-2` reds on the TREE, because the realm half's ctx lives in `src/renderer/extensions.ts` already (D-30, D-40)

## 0. What this page fixes, and the three seams it borrows and never re-derives

- **The store's interface is `C-16`'s and is not this page's to state**: the `store` member is typed by ONE host-agnostic interface declared in `src/shared/module-contract.ts` — the store instance's fifteen own members, satisfied by the Node addon and the WebAssembly arm alike — so this page names the member, cites the constraint, and re-lists nothing (L1 §4 `C-16`, `D-312`).
- **The channel is `module-channel`'s and only its INPUT crosses here**: this page states what the executor *hands* `U3` (§8, §9) and where; the batch, the per-listener entry, the fan-out and per-module containment are that module's own page (L1 §2's row for it, `D-307`, `D-311`).
- **The tool names are `mcp-surface`'s**: `module:<name>.<tool>` is the namespace this module's registrations occupy and `docs/L2/mcp-surface/interface.md` §10 is the composition that publishes them (L1 §3 `S-5`).

## 1. The manifest — seven members, each with a type and a job

| Member | Type | What the executor does with it, and what it may refuse |
|---|---|---|
| `name` | `string` | the identity **and** the tool namespace: no `.` and no `:` may appear, so `module:<name>.<tool>` is injective; a second install under a standing name re-uses the record's own verdict vocabulary rather than this page's (L1 §2, `src/renderer/extensions.ts`'s `registerModule` injectivity rule) |
| `version` | `string` | the version the resolver's ranges are judged against (§7) and the one the registry row carries (`D-310`, L1 §4 `C-11`) |
| `requires` | `{ modules: ModuleDependency[]; app: string }` | resolved to an activation order; `ModuleDependency` is `src/shared/types.ts`'s OWN `{name, versionRange}`, imported and never re-spelled, and `app` is a range judged against §8's one authority (L1 §2, `D-304`'s example) |
| `capabilities` | `ModuleCapabilities` | the DECLARATION set the executor checks registrations against in both directions; a listener declaration rides as an element of it (§4) — so the manifest's seven members stand and no count moves (L1 §4 `C-12`, §7 `OWED-5`) |
| `entry` | `string` | the MAIN half's source: a function-STRING, compiled at activation (§6); a module carrying one is `code`-gated at the tool boundary (L1 §3 `S-5`, `D-307`) |
| `client` | `string` | the CLIENT half's source: a function-STRING and therefore transport-safe DATA, delivered over §9's crossing (L1 §4 `C-15`, `D-308`) |
| `coeffects` | `ModuleCoeffects` | what the module consumes — modules, addresses, pane ids, groups, placeholders — classified against provision/unprovision so activation is re-resolved when one moves (L1 §5 `C4` (i), `S-22`) |

- **`ModuleManifest.dependsOn` and `.needsCode` RETIRE, and the retirement is `ipc-contract`'s edit**: `requires.modules` IS `ModuleDependency`, and a flag declared *"authoritative: `entry !== ''`"* cannot answer for a manifest that now names TWO executable sources (L1 §4 `C-15`, §7 `OWED-6`, `D-309`).

## 2. Two deliveries, one loader

- **`ModuleDelivery` is a closed pair and the loader's answer is ONE shape** (L1 §3 `S-1`): `{kind:'source'; source: string}` — an installed module arrives as its manifest text, which is what the registry row already holds — and `{kind:'table'; entries: readonly {name: string; source: string}[]}` — an in-tree module arrives as a bundled table. Both parse to the same `ModuleSource = {manifest: ModuleManifest; origin: 'source' | 'table'}`, so nothing downstream of the loader can tell them apart.
- **The installed-source arm is the one this unit witnesses**: the bundled table has no module to hold until `U7`'s first conversion, so its row is that step's and the loader's identical-shape claim is measured on both deliveries at the loader's own grain (§12 `I-1`) (L1 §7 `OWED-3`, §6 (vii)).

## 3. The two ctx halves — exact member sets, and the four-inert-members retirement

- **A half is handed a ctx whose own key set is EXACTLY its set, main or client** — no shared bag, no member present-but-inert: the six members the replaced `ModuleCtx` carries today (`captureView`, `onRender`, `emit`, `transform`, `uploadQueue`, `fetch`) retire WHOLE rather than being re-pointed, because four of them are stubs or unwired and `transform` is the post-compile string class this rebuild forbids (L1 §7 `OWED-1` items 8/9, `D-305`; `modularity-findings.md` 9, `D-231`).

| `MainHalfCtx` (four) | Type | Why the main half has it |
|---|---|---|
| `store` | `StoreSurface` | the passthrough's one route to the app's store; on THIS half every verb refuses `reentrant-call` (§10) (L1 §4 `C-2`, `D-311`) |
| `declare` | `(declaration: CapabilityDeclaration) => DeclarationHandle` | the runtime declaration a `capabilities` element is checked against (§5, §6) (L1 §4 `C-12`) |
| `tool` | `(tool: string, handler: (args: unknown) => unknown) => ToolHandle` | a `module:<name>.<tool>` registration, which `U1`'s executor is the only producer of (§11) (L1 §1, `D-305`) |
| `log` | `(line: string, detail?: unknown) => void` | the module's own evidence, contained per module and never fatal, written to the host's `log` sink (L1 §4 `C-6`'s containment rule, `D-124`) |

| `ClientHalfCtx` (five) | Type | Why the client half has it |
|---|---|---|
| `store` | `StoreSurface` | the same type; here a verb is an E2E REQUEST the channel executes, so the channel owns the write turn and the receipt (§10) (`D-311`) |
| `onDelivery` | `(listener: string, fn: (data: unknown, address: string[]) => void) => DeliveryHandle` | **THE REGISTRATION a listener's `client` half stands on**, fired on delivery under the store's prefix relation (§4) (`D-307`, L1 §3 `S-2b`) |
| `action` | `(name: string, fn: (ctx: never, ...args: unknown[]) => unknown) => void` | a NAMED ACTION in the foundation's host-side name → function table, matched by the engine at dispatch; no source text enters graph data (L1 §4 `C-10`, `D-313`) |
| `graph` | `(contribution: GraphContribution) => ContributionHandle` | graph DATA contributed at the ordered pre-build point, parent named by id, never a string transform (L1 §4 `C-6`, §3 `S-15`) |
| `log` | `(line: string, detail?: unknown) => void` | the same contained evidence, realm-side (L1 §4 `C-6`, `D-124`) |

- **`store` is the ONE member both halves carry and the ONE whose behaviour differs by half**; `declare`/`tool` are main's alone because a tool is invoked in main, and `onDelivery`/`action`/`graph` are the client's alone because each is an act on the realm (§10, L1 §4 `C-10`).

## 4. The listener declaration, and the handle it gets

- **`ListenerDeclaration = { address: string[]; main?: string; client?: string }`** — ONE address and TWO OPTIONAL HALVES, riding as an element of `capabilities.listeners[]`: `main` is a function-STRING the executor compiles at activation and hands to `U3`'s binding, and `client` is the KEY a function inside the module's ONE `client` source registers under through `onDelivery` — the client's CODE crosses once per module and never once per listener (L1 §4 `C-15`, `D-307`, §3 `S-1`/`S-2b`). **BOTH `ipc-contract` EDITS ARE ITS AND NOT THIS SEAT'S**: `capabilities.hooks`/`.transforms` retire and `capabilities.listeners[]` joins `ModuleCapabilities` (`src/shared/types.ts`), in the same pass as `dependsOn`/`needsCode` (§1, §13).
- **ONE HANDLE PER DECLARATION, minted by a namespace the foundation holds** — namespaced per module and per listener, stable for the declaration's life, disjoint from constraint ids — because the store mints nothing and the caller's own string IS the identity the store holds; the receipt's `returnedValues`/`bodyFailures` key by that same handle (L1 §4 `C-3`, `D-310`).
- **A declaration with no `main` half is the PASSTHROUGH arm and not an absence**: the channel carries the triggering address to the client half, and `C-12` counts this declaration as lawful rather than overstated (`D-307`, L1 §4 `C-12`).
- **A declaration at a crossing's own address, or at a leaf under one, registers NOTHING**: it is a SUBSCRIBER and is counted on the declaration's side only — which is why the crossing is a subscription where a module-owned address is an ownership (L1 §4 `C-5`, `C-12`, `C-3`).

## 5. Admission — three refusals by name, each a value and never a throw

`ModuleVerdict = { status: 'installed' | 'updated' | 'no-op' | 'rejected'; name: string; version: string; reason?: string }` — the app's own `ModuleInstallResult` shape, so no second spelling is minted, with its ONE narrowed member stated rather than slipped in: `version` is REQUIRED here because the executor always knows the version it admitted, where the tool's own answer may omit it (`src/shared/types.ts`; `D-18`).

| Class | Refused when | Carried in `reason` |
|---|---|---|
| `host-api-token` | the source names a host-API token — an `ipcRenderer`, a `webContents`, a `window`, a `window.provident.*` or an IPC channel name | the token it refused, so a caller learns WHICH name closed the door (L1 §4 `C-1`; `modularity-findings.md` 19) |
| `declaration-overstated` | a `capabilities` element the entry does not register — **and a declared listener whose `main` half registers nothing** | the declaration it could not find (L1 §4 `C-12`'s first direction, `D-307`) |
| `foundation-tool` | a declaration or a registration names a foundation tool — an `ALL_TOOLS` entry or any `provident.`-prefixed name | the tool name it refused, because the `module:` namespace is closed to the foundation's own (L1 §2's `mcp-surface` row, `D-305` (i)) |

- **S-3's FOURTH refusal is `address-owned-by-another` and it is a DEBT, not an omission**: a declaration that would OWN another author's address — a foundation root or a leaf under one — is refused by name, and the lawfulness of the address needs `U2`'s registry and `U5`'s declared pane set, so no row of this unit can green it (L1 §3 `S-3`, §4 `C-5`; §13).
- **Every refusal is a VALUE** — no throw crosses the install path, because a throw at a door is a refusal an agent cannot read (`D-105`; L1 §3 `S-3`).

## 6. Activation, deactivation, and the inverses

- **ACTIVATION compiles `entry` and runs it with the main half's ctx**: every registration the run makes lands through that half's `declare`/`tool` (the client's `graph`/`action` belong to the realm, §3), and the resulting set is compared with `capabilities` in the SECOND direction — a registration the manifest never declared is refused by name at activation, `declaration-undeclared` (L1 §3 `S-2`, §4 `C-12`; L1 §6 (viii) names this arm the one no e2e row of that unit measures, and §12 `I-4` is where it is measured).
- **DEACTIVATION runs the inverses in reverse order**, and each inverse is the store's own verb: a listener's two halves are ONE entry with ONE inverse, so `unlisten`/`removeListener` withdraws both, and a constraint's pair withdraws with `removeConstraint` — no new store verb and no second authority (L1 §3 `S-23`, §5 `C4` (ii), `D-307`).
- **A deactivation that runs twice, or after a partial teardown, CONTAINS the store's throw as a value**: `removeListener` throws on every arm that is not a real removal, and a contained refusal is a verdict rather than a crash (`D-105`; L1 §3 `S-23`).
- **The graph phase is not this step's**: §7's order is what `S-15`'s ordered contribution list consumes, and a throwing contribution is contained and named there (L1 §3 `S-15`, §4 `C-6`).

## 7. The resolver — module ranges, cycles, the application floor, and the order

- **`requires.modules[]` is judged pairwise against the versions the registry holds**, and the judgement answers one of three values: the **activation order** (a total order over the admitted set, every dependency before its dependent, the foundation's own contributions before any module's), `dependency-cycle` when the order cannot be built, or `dependency-unsatisfied` naming the module and the range that failed — the request's own `>1.1.0` against a `1.0.0` (`D-304`, L1 §3 `S-4`).
- **`requires.app` is judged against §8's ONE number**, and a range that authority cannot satisfy is `application-version-unsatisfied`, naming the range — refused, never silently activated (L1 §4 `C-11`).
- **The order is the resolver's ANSWER and not a convention**: it is what makes *"the standard menus pane first, then the new submenu"* true, so no caller sorts (L1 §4 `C-6`, `D-304`'s ordering must-have).

## 8. The one application-version authority

- **`appVersion(): string` is declared in `src/shared/module-contract.ts`** — this seat's declaration of the site, because both readers of the number sit in `U1` and neither may own the other's file: the resolver (§7) judges against it and the MCP transport reports the same number, so the `'0.1.0'` literal beside `createServer` retires into it (L1 §4 `C-11`; `modularity-findings.md` 12; `docs/L2/mcp-surface/interface.md` §11).
- **What it must answer is the number the build carries**, which the battery reads off the build's own manifest rather than trusting a second literal (§12 `I-6`) (L1 §6's `M-5` drift-control rule, `D-44`).

## 9. The crossing to the client — `C-15`'s `registration` kind, produced here

- **The executor reads the module's `source` STRING out of its own registry row, takes the manifest's `client` member, and hands `RegistrationFrame = { module: string; client: string }` to the host's sender** at activation and on the realm's boot read; the realm evaluates that string inside the CLIENT ctx of §3 and registers each listener's `client` half on `onDelivery` (L1 §4 `C-15`, §3 `S-2b`, `D-308`).
- **The payload is DATA and a STRING**, which is what the registry row already holds — so `C-2`'s five write-turn arms are untouched, no sixth arm exists, no `RpcMethod`, no bridge route and no census member moves (L1 §1's `handleModuleTool` reading, §4 `C-15`, `D-308`).
- **`S-12`'s eleventh bridge member is `app-shell`'s and the message kind is `module-channel`'s**: this page produces one frame and states its two members; the wire, its second kind and the fan-out are those seats' (L1 §2's two rows, §3 `S-12`/`S-13`).

## 10. The `reentrant-call` refusal

- **A MAIN half that opens a store verb is REFUSED BY NAME**: `{status:'refused', reason:'reentrant-call', message}`, as a value, because a main half's write is not an e2e request and the channel — not the half — owns every write turn's receipt (`D-311`, L1 §4 `C-2`/`C-3`, §7 `OWED-10` (4)).
- **The guard's reader stands in THIS module's ctx and nowhere at the seam**: no store verb is added and no `STOREROOM_DECLARED_SURFACE` member moves, which is why the seam's census rows are unmoved by it (L1 §3 `S-11`, §7 `OWED-2`; brief §2's seam row).
- **The CLIENT half's `store` is the opposite arm**: its verb IS an e2e request, the channel executes it, and the batch is composed from the channel's own receipt — so `returnedValues`/`bodyFailures` reach the batch and no capture of the binding's stands beside it (`D-311`, L1 §4 `C-2`).

## 11. The surface this page declares, member by member

| Member | Type | Cite |
|---|---|---|
| `createModuleExecutor` | `(host: ModuleHost) => ModuleExecutor` | L1 §3 `S-1`, `D-305` |
| `install` | `(delivery: ModuleDelivery) => readonly ModuleVerdict[]` — one verdict per delivered module; §2, §5, §6, §7 in one act | L1 §3 `S-1`…`S-4` |
| `deactivate` | `(name: string) => DeactivationVerdict` — §6's inverses | L1 §3 `S-23`, `D-105` |
| `activations` | `() => readonly Activation[]` — §7's order, with each activation's record | L1 §4 `C-6`, `D-304` |

`ModuleHost = { store: StoreSurface; appVersion: () => string; sendRegistration: (frame: RegistrationFrame) => void; log: (line: string, detail?: unknown) => void }` (`C-16`, §8, §9, §3). `DeactivationVerdict = { status: 'deactivated' | 'no-op' | 'rejected'; name: string; reason?: string }`. `Activation = { name: string; version: string; tools: readonly string[]; listeners: readonly ListenerBinding[] }`, its `tools` being the FULL `module:<name>.<tool>` names the composition publishes; `ListenerBinding = { address: string[]; handle: string; main?: (address: string[]) => unknown }`. **AND THE ACT THAT HANDS A DELIVERY TO `install` IS THIS PAGE'S TO NAME AND `mcp-surface`'S TO PUBLISH**: the `module.install`/`module.update` tools call `install` with one of §2's two deliveries and answer the returned verdicts' own members, while the tool's answer SHAPE is `docs/L2/mcp-surface/interface.md` §1/§10's (`D-305`, L1 §3 `S-5`). **THIS SURFACE'S `endpoints` COUNT IS `23`, BY THE DERIVATION AT §13 AND NOT BY AGREEMENT**: this table's four stand there beside §1's seven, §2's two, §3's seven, §7's one, §9's one and §8's one, so the cap reads `50 + 10×23 = 280` — the map row stays L1's to carry (`D-14`, `D-43`).

## 12. This module's battery — unmarked, gating, and red-first

`tests/integration/module-system/` drives §11's surface in one node process. **THE SEAMS IT BORROWS ARE DECLARED, AND THERE ARE THREE**: the store instance is a REAL `createProfileStore` construction — `central-data`'s declared surface, the one `C-16` types the ctx's `store` member by (`docs/L2/central-data/interface.md`, `D-312`) — and not a fixture; `sendRegistration` and `log` RECORD, because each is a seam to `U3`'s channel or to the foundation's log and neither is the subject (§9, §3) (brief §3, `D-27`).

| Row | Step | What it measures |
|---|---|---|
| `I-1` | `S-1` | both deliveries parse to ONE `ModuleSource` shape and both activate (§2) |
| `I-2` | `S-1`, `S-2b` | the CLIENT ctx's key set is exactly §3's five, driven through `src/renderer/extensions.ts`'s router — the realm half's home |
| `I-3` | `S-1`, `S-2` | the MAIN ctx's key set is exactly §3's four, and activation runs `entry`: the entry's own log line arrives and its tool is in `activations()` |
| `I-4` | `S-2` | deactivation's inverse, and the ACTIVATION-time `declaration-undeclared` refusal (§6) |
| `I-5` | `S-3` | §5's three refusals, each a value that NAMES what it refused |
| `I-6` | `S-4` | §7's order, cycle, unsatisfied range and application floor — and the judged number is the BUILD's own, so §8's accessor is held to `package.json`'s `version` and the two floor arms judge that number |
| `I-7` | `S-2b` | §9's frame, by value identity, and its payload the manifest's `client` STRING |
| `I-8` | `C-2` | §10's `reentrant-call`, as a value, on the main half — with the same store's own acceptance of the same write as the positive control |

**THE GRAIN, STATED PLAINLY, AND THE ONE EXEMPTION NAMED**: seven of the eight rows are **RED at this head for ONE absence** — the executor's file does not exist — so their red is not yet evidence about the behaviour each names; **`I-2` is the exception and reds on the TREE**, because the realm half's ctx lives in `src/renderer/extensions.ts` already and carries SEVEN members, six of which §3 retires, where §3 declares five — so that row would green the day `S-2b` replaces it and needs no absent file at all (D-40, `D-30`). Each row reds or greens on ITS OWN subject the day §11 lands; none is marked, skipped or softened, and `tests/integration/**` authored after the rework sweep gates (D-40, `D-30`). Ids here are FILE-SCOPED, as the corpus's are: a cite names this file and the id together. **THE THREE INTERNALS THIS BATTERY BORROWS ARE NAMED, NOT EXEMPTED**: `createProfileStore` and `createModuleExecutor` are the two declared modules' surfaces, and `CapabilityRouter` — `src/renderer/extensions.ts`, this module's own file — is the third; nothing else under `src/**` is imported, and no `scripts/**` row is (brief §3, `D-27`).

## 13. Debts, and what this page does not do

- **A MAP PATH IS OWED, and it is L1's**: `tests/unit/module-system/` and `tests/integration/module-system/` are both outside `strata/modules.json`'s row for this module (its paths carry `tests/e2e/modularity/` and `tests/e2e/module-parity/`), so that row owes both paths; this page writes the batteries and never the map (D-7, `modules.md` §3). **AND THE `endpoints` COUNT IS DERIVED HERE, MEMBER BY MEMBER, AND IS `23`** — the map's row reads `16` (L1 §7 `OWED-5`: the manifest's seven + the ctx's seven + the two deliveries) and **that reading stops at §3**, while this page goes on declaring members; under L1 §7 `OWED-5`'s own convention — a member of a member counts nothing, a property of a member counts nothing, the ctx is ONE member set however many halves carry it, and a surface declared adds no endpoint (`D-14`) — the count is **`7` §1's manifest** (`name`, `version`, `requires`, `capabilities`, `entry`, `client`, `coeffects`) **+ `2` §2's deliveries** (`source`, `table`; `ModuleSource` is the shape BOTH parse to and never a third delivery) **+ `7` §3's ctx member SET** (main's `store`/`declare`/`tool`/`log` and client's `store`/`onDelivery`/`action`/`graph`/`log`, with `store` and `log` carried by both halves and therefore counted ONCE each — `ASM-MS-1`'s exact sets are not eight or nine members, they are seven names) **+ `4` §11's executor** (`createModuleExecutor`, `install`, `deactivate`, `activations`: the last two ARE members of the surface as this page's own table declares it, not behaviour on an unlisted one) **+ `1` §7's resolver answer** (the ordered activation set — the other two values are refusals of that one answer) **+ `1` §9's registration frame** (§11's `sendRegistration` is that frame's SECOND SITE, one member and never two, exactly as `app-shell` reads its lockstep half) **+ `1` §8's `appVersion`** (the accessor, consumed by the resolver and a member of no shape above) **= `23`**, so the cap is **`50 + 10×23 = 280`** and the L3 unit battery's `246` lines — read off `tests/unit/module-system/executor.test.ts` this pass — sit `34` under it. **AND THE FIGURE IS DERIVED RATHER THAN FITTED, WHICH IS THE ONLY THING THAT MAKES IT WORTH STATING**: the battery's `246` needs `N ≥ 20`, the narrowest sibling reading (`16` plus §11's four) is exactly `20`, and this page's own declarations give `23`, so **no member is shed to make a cap and no row is dropped to make a battery** — the surface's two shared names (`store`, `log`) are the designed asymmetry of §3 and not an unspent duplicate, and `deactivate`/`activations`/the frame/`appVersion` are each a door a caller or the resolver actually uses; **the row's move `16 → 23` is L1's to file**, with the two paths above and with `tests/unit/mcp-surface/`/`tests/integration/mcp-surface/` owed to that module's row for the same reason (`D-14`, `D-43`).
- **Not this unit's, named so a reader does not look here for them**: the fourth admission refusal (needs `U2`/`U5`, §5); the bundled-table delivery's witness (needs `U7`, §2); the batch, fan-out and containment (`U3`, §9); the graph phase's containment (`U4`, §6); host parity (`M-29`, L1 §4 `C-13`); the retirement of `dependsOn`/`needsCode` (`ipc-contract`, §1). **And this page restates no rule from a page that owns one**: §0 names four seams and cites each instead.

## 14. Assumptions, each with the alternative it rejected (D-1 §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-MS-1` | the two ctx halves' member sets are EXACT and disjoint by half (main `store`/`declare`/`tool`/`log`, client `store`/`onDelivery`/`action`/`graph`/`log`), so a member present-but-inert is unspellable (L1 §7 `OWED-1` items 8/9) | ONE ctx carrying the seven members to both halves, with the half-appropriate ones refusing at call time — which is the stub shape this rebuild exists to delete and would make `onDelivery` reachable from a main half that can never deliver (`D-305`) |
| `ASM-MS-2` | `appVersion()` is declared in `src/shared/module-contract.ts`, the contract file both `U1` readers already import, so neither module owns the other's file (L1 §4 `C-11`) | declaring it in `src/main/mcp-server.ts` beside the literal it replaces, which makes the resolver import `mcp-surface`'s file and gives one number two owners (`D-311`'s rule read at a second seam) |
| `ASM-MS-3` | a refusal's `reason` NAMES the thing refused (the token, the declaration, the tool name, the range) and no numeric code stands beside it | a closed code vocabulary (`host-api-token-01`), which an agent cannot read without a table this design does not ship and which a second table would let drift (`D-105`) |

```boundary-declared
{"unit":"modularity","layer":"L2","module":"module-system","writes":[
 {"path":"docs/L2/module-system/interface.md","why":"this page, rev 2 — the `endpoints` count re-derived from the members THIS page declares rather than from L1 §7 `OWED-5`'s seven-plus-seven-plus-two: §11's four executor members, §7's one answer, §9's one frame and §8's one accessor are each declared here and counted, so the figure is `23` and the cap `50 + 10×23 = 280`, which admits the L3 unit battery's 246 lines with 34 to spare and answers the escalation routed at `strata/records/modularity-unit.md` finding (i) by the count and not by a trim; `strata/modules.json`'s row and the two test paths it owes are L1's to file and are untouched here","d":"D-14"}]}
```
