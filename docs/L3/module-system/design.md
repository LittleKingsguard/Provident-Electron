# L3 — `module-system`: one contract file, one loader with two deliveries, four doors on the executor, admission's values, the resolver's answer, and the realm's five-member half

- **Layer:** L3 · **Module:** `module-system` · **Unit:** `modularity` · **Rev:** 3 — **REV 3 MOVES NO STRUCTURE AND RE-PARTITIONS ONLY THE DECLARATION AT THE FOOT OF THIS PAGE**: every shape, pseudocode block and guardrail note rev 2 fixed stands whole, and this revision's one write here is its own `boundary-declared` block, which now declares THIS PAGE ALONE — the two entries it carried for the files the signatures pass wrote (`docs/L3/module-system/signatures.md` and `tests/unit/module-system/executor.test.ts`) are declared by that page's own block, because one path is declared by the page that WRITES it and a path two pages declare reds the instrument's `P-7` for both (`D-146`). **REV 2 CLOSED THE EXAMINER'S BLOCKING FINDINGS AND RE-DERIVED NOTHING ELSE**: every refusal now carries its SUBJECT into `reason` (F1), a main-less declaration is REGISTERED as the passthrough arm (F2), `install` reads `host.appVersion()` (F3), the tool NAME is separated from the declaration HANDLE (F4), an entry's two store-side halves are withdrawn as a UNIT so a failed body-withdrawal cannot consume the watch (N2), and the harness's `50 + 10×16` overage is **ROUTED to L1** on `modules.md` §4's own remedy rather than paid by a dropped row (F5). Rev 1 was `NEW`, because `docs/L2/module-system/interface.md` rev 1 fixed this module's surface and no page stated the structure, signatures, pseudocode or guardrails under it (brief §3, `D-1`, `D-305`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** a site and never an offset (D-41); a figure this page states is one this pass read off the tree, and a figure another document owns is read there (D-26, D-43)
- **Inputs:** `docs/L2/module-system/interface.md` §0–§14 — all of it and no sibling page (isolation, `modules.md` §1); `docs/L1/modularity.md` rev 15 §2's `module-system` row, §3 `S-1`/`S-2`/`S-2b`/`S-3`/`S-4`, §4 `C-1`/`C-3`/`C-6`/`C-10`/`C-11`/`C-12`/`C-15`/`C-16`, §7 `OWED-5`/`OWED-6`; `strata/brief.md` §2/§3/§6; `strata/modules.md` §1/§4; `strata/platform.md` §4; `D-304`…`D-314`; `strata/records/modularity-findings.md` 1–20; **and the tree this pass read, by site** — `src/renderer/extensions.ts` (`ModuleCtx`'s seven members, `CapabilityRouter`), `src/main/mcp-server.ts` (`ModuleStore`, `ModuleRecord`, `handleModuleTool`, `syncModuleRouter`, the `'0.1.0'` literal beside `createServer`), `src/shared/types.ts` (`ModuleCapabilities`, `ModuleDependency`, `ModuleManifest`, `ModuleInstallResult`), `node_modules/provident-storeroom/index.d.ts` (`StoreInstance`'s fifteen members, `unlisten`'s withdrawal clause, `removeListener`'s throw), `package.json`'s `version`
- **Status:** DESIGN — structure, signatures, pseudocode and guardrail notes only. **`src/**` is read-only at this layer**: `src/main/modules/` and `src/shared/module-contract.ts` are NEW and `src/renderer/extensions.ts` is REPLACED (`L1` §2), all three at `U1`'s `S-1`…`S-4`, which is L4's landing — so §8's battery is **RED-FIRST by construction** and each row names whose absence reds it (D-40, `D-30`)

## 0. What this page fixes, and the four seams it borrows rather than re-derives

- **It fixes the shape of three NEW/REPLACED file groups and nothing else**: the contract file (`src/shared/module-contract.ts`), **six** files under `src/main/modules/`, and the realm half that REPLACES `src/renderer/extensions.ts`'s `ModuleCtx` (`L1` §2). The four seams are borrowed at their owners' pages and never re-spelled here — the store's fifteen members (`C-16`, `D-312`), the batch, its fan-out and the binding's containment (`module-channel`, `L2` §0), the `module:<name>.<tool>` composition (`mcp-surface`, `S-5`), and the ordered graph point (`producing-runtime`, `L2` §6). **And each ctx half's OWN KEY SET is exactly its set** (`L2` §3, ASM-MS-1): main `{store, declare, tool, log}`, client `{store, onDelivery, action, graph, log}`, both built as object literals — so a member present-but-inert is unspellable (`D-305`, findings 9).

## 1. The files, and what lives in each

| Path | What lives there | Status |
|---|---|---|
| `src/shared/module-contract.ts` | every type in §2, `moduleHandle` and `toolName`, and `appVersion()` — no other behaviour | NEW |
| `src/main/modules/loader.ts` | `loadDelivery(delivery): readonly LoadedModule[]` — both arms of `ModuleDelivery` to ONE `ModuleSource` shape (`L2` §2) | NEW |
| `src/main/modules/admission.ts` | `L2` §5's three refusals as VALUES, each with its SUBJECT: `admitSource`, `admitDeclaration`, and the two-direction `compare` the activation feeds | NEW |
| `src/main/modules/activation.ts` | compile + run `entry`, collect the runtime declarations and tool registrations, register ONE store entry per DECLARED listener, mint `Activation`/`ListenerBinding`, and run the inverse | NEW |
| `src/main/modules/resolver.ts` | version comparison, the range checks, the cycle test and the total order of `L2` §7 | NEW |
| `src/main/modules/handles.ts` | the main side's two spellings — `addressKey` and `listenerHandle`, both composing the contract's `moduleHandle` — never a counter and never a tool name (`D-310`) | NEW |
| `src/main/modules/index.ts` | `createModuleExecutor` and the four-door object of `L2` §11; the one file importing the other five | NEW |
| `src/renderer/extensions.ts` | the realm half: `ClientHalfCtx` (five members), `CapabilityRouter` REPLACED, the client source's evaluation and the delivery table (`S-2b`) | REPLACED |

- **`ModuleManifest` is declared ONCE, in the contract file, and `src/shared/types.ts` keeps the name by re-export**: `ipc-contract`'s pass retires `dependsOn` and `needsCode` there and leaves `export type { ModuleManifest } from './module-contract.js'`, so no second manifest shape exists, `L1` §2's *"the contract's manifest is `module-system`'s file"* holds, and `L2` §1's TWO retired members are still the retirement (`OWED-6`, `D-309`). `ModuleCapabilities`/`ModuleDependency` stay `types.ts`'s, imported and never re-spelled. **And the replaced router's three main-side consumers are other seats' files, whose edits are named here and never written here**: `src/main/main.ts`'s one `new CapabilityRouter()` (`app-shell`), `src/main/mcp-server.ts`'s `syncModuleRouter`/`invokeModuleTool` (`mcp-surface`, `S-5`), and `src/renderer/runtime.ts`'s `transformRouter` (`producing-runtime`), which retires with `transform` — the `D-231` class (`L1` §1, `OWED-2`).

## 2. The contract's shapes — names, arity and types, argued at `signatures.md`

- **One manifest, twice delivered**: `ModuleManifest = {name; version; requires?: ModuleRequires; capabilities; entry?: string; client?: string; coeffects?: ModuleCoeffects}`, `ModuleRequires = {modules?: readonly ModuleDependency[]; app?: string}` — **both members optional, because `L2` §12's own manifests carry one or the other**. `entry`/`client` are function-STRINGS and an absent or empty member is NO half, which is why `needsCode` cannot answer for two sources (`L2` §1, `C-15`). `coeffects` is CARRIED and judged by nobody until `S-22`: manifest data, never a ctx member (`L1` §5 `C4` (i)).
- **Deliveries**: `ModuleDelivery = {kind:'source'; source: string} | {kind:'table'; entries: readonly {name: string; source: string}[]}` → `ModuleSource = {manifest: ModuleManifest; origin: 'source'|'table'}` (`L2` §2); the loader's record also keeps the delivered TEXT, because a crossing quotes what was delivered and never a re-serialisation (`D-308`).
- **Verdicts, declarations, handles**: `ModuleVerdict = {status:'installed'|'updated'|'no-op'|'rejected'; name; version; reason?: string}` — the app's own `ModuleInstallResult` with `version` REQUIRED (`L2` §5, `D-18`) — `DeactivationVerdict = {status:'deactivated'|'no-op'|'rejected'; name; reason?: string}`; `ListenerDeclaration = {address: string[]; main?: string; client?: string}` (`L2` §4); `CapabilityDeclaration = {kind:'listener'; address: string[]; main?: string; client?: string}` is what `declare` takes at RUNTIME; **the declaration HANDLE is `moduleHandle(module, key)` = `module:<name>#<key>` and lives its whole life disjoint from constraint ids, while the TOOL NAME is `toolName(module, tool)` = `module:<name>.<tool>`, the spelling `L2` §11 publishes — two compositions, never one, and `compare` judges BARE names on both sides by stripping the `module:<name>.` prefix from each registration, so a manifest's `tools` and the entry's `tool()` calls are ONE vocabulary** (`C-3`, `L2` §4, §11).
- **The surface, and its refusal vocabulary**: `ModuleHost = {store: StoreSurface; appVersion: () => string; sendRegistration: (f: RegistrationFrame) => void; log: (line: string, detail?: unknown) => void}`; `RegistrationFrame = {module: string; client: string}`; `Activation = {name; version; tools: readonly string[]; listeners: readonly ListenerBinding[]}`; `ListenerBinding = {address: string[]; handle: string; main?: (address: string[]) => unknown}` (`L2` §9, §11). `StoreSurface` is `C-16`'s fifteen members, typed from `provident-storeroom` by `import type` and satisfied by both hosts (`D-312`). **The names are `host-api-token`, `declaration-overstated`, `foundation-tool`, `declaration-undeclared`, `dependency-cycle`, `dependency-unsatisfied`, `application-version-unsatisfied`, `reentrant-call` — `L2`'s own — plus three this page ADDS because `L2` names no value for their arms: `entry-malformed` (a half that will not compile), `entry-threw` (a half that throws at activation) and `no-store-host` (a client store with no writer yet), each carrying its subject in `reason`; the rejected alternative was a silent `undefined`, which `D-105` forbids.** No numeric code stands beside any of them (`L2` §5, ASM-MS-3, `D-105`).

## 3. The executor's four doors (`L2` §11), and the one gap behind them

- `createModuleExecutor(host)` builds ONE object whose state is `records: Map<string, ActiveRecord>` and `order: readonly string[]`; `install` is §4–§5 in one act, `deactivate` is §4, and `activations()` answers `order.map(name => recordOf(records.get(name)))` — the order is the resolver's ANSWER and no caller sorts (`L2` §7, `D-304`). **And the tool handler table is the executor's own, while the route by which `mcp-surface` reaches a handler is the one cell `L2` §11 fixes no member for**: `Activation.tools` carries names and `ModuleHost` carries no tool sink. This page adds NO fifth host member and NO `invoke`, and it carries the cell as **`ASM-MS-4` — the executor keeps a `name → handler` table a host must reach through one member `L2` §11 does not declare; the rejected alternative is this seat declaring a fifth `ModuleHost` member, which would move the interface it is bound by** (`D-1` §8, `modules.md` §4).

## 4. Pseudocode — `install`, its activation loop, and `deactivate`

```
install(delivery):
  loaded = loadDelivery(delivery); refused = Map(); out = Map()      # verdict order IS delivery order
  for src in loaded:
    for check in [s => admitSource(s), s => admitDeclaration(s, FOUNDATION)]   # host-api-token, then foundation-tool
      a = check(src); if !a.ok && !refused.has(src.name): refused.set(src.name, a)
  plan = resolve(standing ++ loaded.filter(s => !refused.has(s.name)), host.appVersion())  # §5, C-11
  if !plan.ok: return loaded.map(src => rejected(src, refused.get(src.name) ?? plan))
  for src in plan.order where src is IN THIS DELIVERY:   # activation follows the RESOLVER, not the delivery
    if refused.has(src.name): continue
    standing = records.get(src.name)
    if standing && standing.version === src.manifest.version: sendFrame(standing); out.set(src, 'no-op'); continue
    if standing: withdraw(standing, host.store)    # the entry's own inverses, contained
    made = activate(src)
    if made.ok: records.set(src.name, made.record)
    out.set(src, made.ok ? (standing ? 'updated' : 'installed') : rejected(src, made))
  order = plan.order.filter(name => records.has(name))
  return loaded.map(src => out.get(src) ?? rejected(src, refused.get(src.name)))
rejected(src, r) = {status: 'rejected', name: src.manifest.name, version: src.manifest.version,
                    reason: `${r.reason}: ${r.subject}`}     # the NAME *and* the thing it refused (ASM-MS-3)
activate(src):
  cap = src.manifest.capabilities; mains = Map()      # addressKey -> the entry's compiled main half, or null
  reg = {tools: Set(), mains, handlers: Map(), refusal: null}
  ctx = {store: refusingStore(),                     # the FOUR members, EXACTLY (L2 §3, §10)
         declare: d => { mains.set(addressKey(d.address), d.main ? compileMain(d.main) : null)
                         return moduleHandle(src.name, addressKey(d.address)) },
         tool: (t, h) => { n = toolName(src.name, t)
                           if isFoundationTool(n): reg.refusal ??= {reason: 'foundation-tool', subject: n}
                           reg.tools.add(n); reg.handlers.set(n, h); return n },
         log: (line, detail) => host.log(`module:${src.name}: ${line}`, detail)}
  try { compileMain(src.manifest.entry)(ctx) } catch e { return refused({reason: 'entry-threw', subject: msg(e)}) }
  c = compare(cap, reg)      # BOTH directions; a declaration with NO `main` is the passthrough arm and lawful (C-12)
  if c || reg.refusal: return refused(c ?? reg.refusal)     # nothing reaches the store before this comparison
  bindings = []
  for d in cap.listeners ?? []:                       # ONE store entry per DECLARATION (D-307, L2 §4)
    k = addressKey(d.address); h = moduleHandle(src.name, k)
    if d.main && !mains.get(k): return refused({reason: 'declaration-overstated', subject: k})   # C-12, dir. 1
    bindings.push({address: d.address, handle: h, main: mains.get(k) ?? undefined})
    host.store.listen(h, d.address)                   # the watching, under the declaration's ONE handle
    host.store.register(h, contained(mains.get(k) ?? passthrough(d.address)))   # the body; the wrapper is U3's
  if src.manifest.client: sendFrame(src)              # {module, client}, ONCE, by value (L2 §9)
  return {ok: true, record: {name: src.manifest.name, version: src.manifest.version, manifest: src.manifest,
                             tools: [...reg.tools], listeners: bindings}}
deactivate(name):
  rec = records.get(name)
  if !rec: return {status: 'no-op', name}             # nothing stands: NO store call, no throw to contain
  failures = []
  for b in [...rec.listeners].reverse():              # reverse of the registration order (L2 §6)
    for verb in ['removeListener', 'unlisten']:       # ONE entry's two store-side halves, withdrawn as a UNIT:
      try host.store[verb](b.handle)                  #   a failed body-withdrawal ABORTS the pair, so the watch the
      catch e: failures.push({handle: b.handle, message: msg(e)}); break   # retry needs is never consumed (N2)
  if failures.length:                                 # the record STANDS, so the inverse stays retryable
    return {status: 'rejected', name, reason: `${failures[0].handle}: ${failures[0].message}`}
  records.delete(name); order = order.filter(n => n !== name)
  return {status: 'deactivated', name}
```

## 5. Pseudocode — the resolver's ordering (`L2` §7), and the one number it judges

```
resolve(candidates, appVersion):
  for c in candidates:
    if c.requires?.app && !satisfies(appVersion, c.requires.app):
      return refusal('application-version-unsatisfied', `requires app ${c.requires.app}; ${appVersion} stands`)
    for dep in c.requires?.modules ?? []:
      held = byName(dep.name)
      if !held || !satisfies(held.version, dep.versionRange):
        return refusal('dependency-unsatisfied',
                       `requires ${dep.name} ${dep.versionRange}; ${held ? held.version : 'not admitted'}`)
  indegree = Map(c => 0); dependents = Map()                  # edges: dependency -> dependent  for c, for dep in c.requires?.modules ?? []: dependents.get(dep.name).push(c); indegree(c) += 1
  ready = candidates.filter(indegree 0)                       # arrival order, so ties keep it — never a sort
  order = []
  while ready.length: n = ready.shift(); order.push(n)
    for d in dependents.get(n) ?? []: if --indegree(d) === 0: ready.push(d)
  if order.length < candidates.length: return refusal('dependency-cycle',
    `cycle among ${candidates.filter(c => !order.includes(c)).map(name)}`)
  return {ok: true, order}   # the FOUNDATION's own nodes precede every module's by construction, and
                             # `activations()` carries modules only, so no prefix is added here (C-6)
satisfies(version, range): ...   # `>`, `>=`, `<`, `<=`, `=` and a bare exact version, on dotted numerics; an UNPARSABLE range is UNSATISFIED and named, never silently satisfied
```

## 6. The realm half — `src/renderer/extensions.ts`, replaced and not extended (`S-2b`, `D-305`)

- **`CapabilityRouter` keeps its name and gains the crossing's arm**: `registerModule(module, entry: string | ((ctx: ClientHalfCtx) => void))` — a STRING is `L2` §9's `{module, client}` payload EVALUATED here, a function is the in-tree arm; the ONE ctx is built from `ClientHalfDeps = {store?: StoreSurface; log?}` as a five-key literal (`L2` §3, §9).
- **`onDelivery(listener, fn)` is THE registration a listener's `client` half stands on** (`D-307`): it mints `moduleHandle(module, listener)` and answers that `DeliveryHandle`; `action(name, fn)` lands in the host-side name → function table the engine matches at dispatch — never a graph-text substitution, never a dispatch-time resolver (`C-10`, `D-313`); `graph(c)` answers a `ContributionHandle` for `U4`'s ordered point (`L2` §6).
- **The default `store` is a NAMED refusal and not a stub**: with no writer handed in, every verb answers `{status:'refused', reason:'no-store-host', subject: <the verb>, message: <sentence>}` as a value; at `U3` the channel hands its own surface as this member and owns the write turn (`D-311`). `fire(handle, data, address)` is the realm's ONE delivery entry, contained per handle — the BATCH that calls it is `module-channel`'s, never this file's (`L2` §0).

## 7. Guardrail notes — what a later implementer must never do

1. **No `window`, no IPC, no `ipcRenderer`, no `webContents`, no `window.provident.*` and no bridge route** in the contract or either ctx: the passthrough is the only way out, and the door is `admitSource` (`C-1`, `D-304` (i), findings 19).
2. **No dispatch-time resolver and no source text in graph data**: `action` installs a LIVE closure keyed by name (`C-10`, `D-313`).
3. **No second store**: the executor hands `host.store` into the ctx and constructs nothing — no `storeCreate`, no filesystem, no `provident-storeroom` import except `import type` (`C-16`, `D-312`).
4. **One handle per DECLARATION, from `moduleHandle` and nowhere else, and never a tool's**: no counter, no random id, no store-minted handle, no collision with a constraint id (`C-3`, `D-310`).
5. **The main half's `store` refuses EVERY verb `reentrant-call`, as a value**, and the two ctx halves stay DISJOINT: each a literal of exactly its keys, `store` and `log` the only members both carry, `declare`/`tool` never client-side, `onDelivery`/`action`/`graph` never main-side. The guard stands in this module's ctx and at no seam, so no store verb and no `STOREROOM_DECLARED_SURFACE` member moves (`L2` §10, `D-311`, §0, ASM-MS-1).
6. **Every refusal is a VALUE carrying its SUBJECT**: no throw crosses `install`, `deactivate`, `activate` or a ctx door, every store call sits inside its own `catch`, and the composed `reason` names the thing refused — `<name>: <subject>` for a verdict, `<handle>: <message>` for a deactivation — while the CTX's own refusal keeps `L2` §10's `reason: 'reentrant-call'` and puts its sentence in `message` beside a `subject` (`D-105`, `L2` §5, §10, ASM-MS-3).
7. **`host.appVersion()` is read ONCE per install and is the ONE number**: no second literal, no `'0.1.0'` beside `createServer`, a range the authority cannot satisfy refused by name (`C-11`, findings 12) — and **no new dependency**, no `semver`; ranges are judged by the contract's own comparators (`platform.md` §4).
8. **The client source crosses as a STRING in `{module, client}` and in no other form** — never a function, never an `RpcMethod`, never a route on the `module` bridge member (`C-15`, `D-308`).
9. **`capabilities` is compared in BOTH directions and every declaration is REGISTERED**: a declared `main` half the entry never declares is `declaration-overstated`, an undeclared registration is `declaration-undeclared`, and a main-less declaration is the PASSTHROUGH arm — lawful AND registered, never an absence (`C-12`, `D-307`).
10. **One store entry per declaration, withdrawn by BOTH of its own verbs AS A UNIT**: `listen`+`register` under the declaration's handle, and the inverse runs `removeListener` (the body — the addon's THROWING arm, which is what the containment above is for) then `unlisten` (the watch — a declared no-op success outside the domain) in reverse of registration, each inside its own `catch`, and **a failure at either verb aborts that entry's pair so the surviving registration is still there for the retry**; no second handle is ever minted (`L2` §6, `index.d.ts`'s `removeListener` and `unlisten` clauses).

## 8. Debts, the battery this page declares, and what it does not do

- **The battery**: `tests/unit/module-system/executor.test.ts` — one file, one node process, **UNMARKED and GATING** (`D-40`, `D-30`), driving `L2` §11's surface with the SUBJECT REAL and two seams declared: a `StoreSurface` double whose `removeListener` THROWS where a removal is not real (the addon's own rule, measured on the installed `2.0.1`) and whose `unlisten` answers the declared no-op success, plus recorders for `sendRegistration`/`log` and a counter on the `appVersion` accessor (`L2` §12). Rows `MS-1`…`MS-8`, each naming its own absence: **none can green at this head**, because `src/main/modules/` and `src/shared/module-contract.ts` do not exist and `src/renderer/extensions.ts` still carries `ModuleCtx`'s seven members — this design's landing state, not a defect in the battery (D-40). **AND THE HARNESS CAP IS ROUTED, NOT QUIETLY EXCEEDED**: the battery reads `246` lines against `50 + 10×16`, and `modules.md` §4's own remedy is *"shrink the surface, never the harness"* — so this page sheds no row to fit a figure L2 fixed and **L1 owes the escalation that the module's `endpoints` surface is too large for its cap** (`platform.md` §4, `L1` §7 `OWED-5`, `D-43`).
- **The census re-read this page OWES, and what is not this unit's**: `src/shared/module-contract.ts` imports `provident-storeroom`'s TYPES, so whichever row counts importing FILES (`central-data`'s import census, `L1` §1) must be re-read where it stands — erasure is a bundle fact and not a census exemption (`D-146`, `OWED-2`). **Not this unit's, and a map path is owed**: the fourth admission refusal (`U2`/`U5`, `L2` §5), the bundled table's first real module (`U7`, `OWED-3`), the batch and fan-out (`U3`), the graph phase (`U4`), coeffects' classification (`U6`), host parity (`M-29`), and the `dependsOn`/`needsCode` retirement (`ipc-contract`, `OWED-6`); `tests/unit/module-system/` is not in `strata/modules.json`'s `module-system` row, which is L1's to carry (`modules.md` §3, `D-7`).

```boundary-declared
{"unit":"modularity","layer":"L3","module":"module-system","writes":[
 {"path":"docs/L3/module-system/design.md","why":"this page, rev 3 — rev 2's structure, pseudocode and guardrail notes are whole, and this revision's single write here is this `boundary-declared` block re-partitioned: the two entries it carried for the files the signatures pass wrote (`docs/L3/module-system/signatures.md`, `tests/unit/module-system/executor.test.ts`) are now declared by the page that WROTE them, because one path is declared by the page that writes it and a path two pages declare reds `P-7` for both (`D-146`)","d":"D-146"}]}
```
