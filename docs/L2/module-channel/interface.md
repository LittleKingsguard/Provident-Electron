# L2 — `module-channel`: the binding, the write-turn envelope, the registration frame, the realm's fan-out and containment — the managed passthrough's transport half

- **Layer:** L2 · **Module:** `module-channel` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW**, the module having had no L2 home: `U3`'s steps `S-11`…`S-13` and the parity `S-13b` are stated here at the I/O grain, and the steps that consume them (`S-20`'s realm driver, `S-22`…`S-24`'s inverses) cite this page rather than re-spell it (`D-306`, `D-307`) · **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2)
- **Citations:** a site and never an offset (D-41); a figure this page states is one this pass read off the tree, and a figure another document owns is read there and not restated (D-26, D-43)
- **Charter:** `D-304`'s must-haves this module carries — *"main-side module code … a listener or the managed channel can reference"* and *"client/Renderer-side module code"* — under `D-307`'s two-half listener and `D-311`'s writer ruling. **`L1` below is `docs/L1/modularity.md` rev 15**: its §2 row for this module, §3 `S-11`/`S-13`/`S-13b`, §4 `C-2`/`C-3`/`C-13`/`C-15`/`C-16`, §6 `M-2b`/`M-11`/`M-13`/`M-29`
- **Inputs:** `docs/L2/module-system/interface.md` §4 (the listener declaration and its handle), §9 (the registration frame this page carries); `docs/L3/module-system/design.md` §4; `strata/records/modularity-unit.md`; `D-307`, `D-310`, `D-311`, `D-312`, `D-313`, `D-314`, `D-105`
- **Write scope:** `docs/L2/module-channel/` and `tests/integration/module-channel/` (brief §3). `src/**` is read-only at this layer and neither package is ever modified (D-3, D-5)
- **Status:** DESIGN — and it fixes **no structure, signature or pseudocode**: `docs/L3/module-channel/` is that grain (brief §3, D-1). **Its battery is OWED**: `tests/integration/module-channel/` is written with the steps that green it (`S-11`/`S-13`), and the e2e rows `M-2b`/`M-11`/`M-13` are L1's, filed at `S-20`'s realm driver (`D-30`, `D-40`). **At this head `src/main/module-channel/`, `src/shared/module-channels.ts` and `src/renderer/module-channel-client.ts` do not exist** — the module is NEW, and this page is the first rung of its ladder

## 0. What this page fixes, and the four seams it borrows and never re-derives

- **The store is `C-16`'s and is not this page's to state**: every verb this module calls is one of the instance's fifteen own members, typed by the one host-agnostic surface declared in `src/shared/module-contract.ts` and satisfied by the Node addon and the WebAssembly arm alike (L1 §4 `C-16`, `D-312`).
- **The handle namespace is `module-system`'s**: the executor mints ONE handle per declaration (`src/main/modules/handles.ts`) and hands the binding a `ListenerBinding`; this module REGISTERS that handle and never mints a second identity — the store's `returnedValues`/`bodyFailures` key by it, and a second spelling would break the attribution `D-310` shipped (L1 §4 `C-3`).
- **The client source is `module-system`'s payload**: the executor reads the module's `source` string, takes the manifest's `client` member and produces `{module, client}`; this module CARRIES it and never reads the registry (L1 §4 `C-15`, §2's `module-system` row).
- **The wire is `app-shell`'s**: `S-12`'s eleventh bridge member and its `secure-panels` lockstep half are that step's two sites, and the three census rows are other seats' (`D-301`/`D-302`). This page owns the MESSAGE and the realm's RECEIPT; the carrier is `S-12`'s.

## 1. The five members — the map row's `endpoints: 5`, and nothing beside them

| # | Member | What enters | What answers | The job, and the L1 cell it carries |
|---|---|---|---|---|
| 1 | **BINDING** | a `ListenerBinding[]` from one activation, the store, and the message sink | the registrations made, and a withdrawal for the inverse | one store entry per DECLARATION under its ONE handle; the handler IS the function the store holds (`S-11`, `C-3`) |
| 2 | **ENVELOPE** | one write turn's settled receipt | ONE message per turn per realm, carrying per-listener entries | the batch and the five arms (`S-11`, `S-13`, `C-2`) |
| 3 | **REGISTRATION** | `{module, client}` from the executor | the second kind of the SAME message | the client source crosses as a STRING and in no other form (`S-2b`, `C-15`) |
| 4 | **FAN-OUT** | a write-turn message, in the realm | one call per module, each entry's client half fired | delivery-time dispatch, address-keyed under the store's prefix relation (`S-13`, `C-3`) |
| 5 | **CONTAINMENT** | a module's throw, at the fan-out or in a body | a named datum, and the batch continuing | a module's fault stops neither the batch nor the app's paint (`S-13`, findings 14) |

**The five are the surface and the count is derived, not declared** (`platform.md` §4, D-14): a member of a member adds nothing, and the receipt's maps are data the envelope READS rather than a sixth member. **No sixth exists** — no `invoke`, no source request, no per-entry delivery (§4 below).

## 2. The binding — what the store holds, and what the channel owns

- **One handle per declaration; the handler is the function the store holds** (L1 §3 `S-11`, §4 `C-3`): the foundation calls `listen(handle, [address])` and `register(handle, handler)`, the store fires once per DISTINCT handle with the WRITE's address, and the binding runs THAT listener's main half with that address as its argument. **A declaration that names no `main` half is the PASSTHROUGH arm**: it is registered, its entry carries the triggering address, and the client half is fired on delivery — an absence is never a skip (`D-307`).
- **The binding CONTAINS the main half's throw**: the store catches nothing and would carry it out of an unrelated writer's call, so the throw is answered as the `threw` datum and the writer's own call is unaffected (L1 §3 `S-11`, §4 `C-2`).
- **The main half's answer reaches the channel on the receipt, never from a capture beside it**: the binding RETURNS it into the store's own loop, the store stands it beside that handle, and the channel reads `returnedValues`/`bodyFailures` keyed by the caller's own string (`D-310`, `C-3`). **A suspending body is LAWFUL**: the store settles it and the `return` arm carries the SETTLED value; the edge is the settled answer, not the plain return (`D-310`, `H-4`).
- **The channel is the WRITER for a client half's `store` act** (`D-311`): client half → channel → store, so the receipt is the CHANNEL's and the batch is composed from it; no capture rides beside the receipt, and a main half's own store verb is NOT an e2e request and is refused (§7).
- **The client half's `store` member is the channel's PROXY over the DATA verbs** — `read`, `readLiteral`, `readTiered`, `write`, `delete`, `rollback`, `constraints`, `constraintOn`, `constraintOff` — **and the six registration verbs (`listen`, `unlisten`, `register`, `removeListener`, `addConstraint`, `removeConstraint`) answer `client-registration-refused` BY NAME as a value**, because a client half that could `register` at a harness-known handle would replace its own main half's body behind admission's comparison (`C-3`, `S-3`, `D-105`).
- **The turn set is EVERY act that delivers**, each marked at its own return: `write`; `delete` on its own member arm; a registration (`addConstraint` and the re-arm); a boot's adopted set; and a reversal's legs (`D-310`, `H-3`). **A binding that marked writes alone would leave a delete's and a registration's firings in no turn at all** (L1 §4 `C-2`).

## 3. The envelope — one message per turn per realm, and the five arms

- **`{turn, entries}`**, one message per write turn per realm, and **ONE entry per listener that spoke**, each `{turn, module, listener, outcome, address?, data?, refusal?}` — the shape `C-2` fixes and `M-11`'s witness reads (`L1` §4/§6), with **`address?` the WRITE's address** because the subscription relation compares it with the listener's declared one (`C-3`, `M-13`), and **`listener` the declaration's ONE handle** — client-keyed when it names a client half, address-keyed otherwise (`C-3`). `turn` is monotone per realm; the entries of one turn share it, and a turn's message is never split (L1 §3 `S-11`).
- **The five arms say what a MAIN HALF ANSWERED, and there is no sixth**: **`return`** — it answered a value, and `data` is the SETTLED value read off `returnedValues` under the listener's handle; **`passthrough`** — no main half is declared, and `data` is the address the store handed the binding; **`empty`** — a declared main half FIRED and appears in neither map (the `undefined`-returner's silence), `data` absent; **`threw`** — it threw synchronously, `data` absent and `refusal: 'main-half-threw'`, the contained sentence whole; **`refused`** — its answer cannot cross (a function, a symbol, a cycle), `data` absent and `refusal: 'not-transport-safe'` (`D-310`, `C-2`; `M-11`).
- **A rejecting body is the SECOND SHAPE OF `empty` and not a sixth arm**: the store has already contained it, its rank-23 `bodyFailures` datum stands under that handle, and the act still answers — only `write`/`delete` settle, so the registration, boot and reversal instants neither convert a rejection nor await a suspension (`D-310`, `H-4`). **A refused store call is not an arm either**: a main half forwarding one returns a plain value under `return` (L1 §4 `C-2`).
- **The registration frame is the message's SECOND KIND and is not a write turn**: it carries `{module, client}`, answers nothing, and exists because a boot's registry writes happen before the realm subscribes — a channel with only write turns would leave a pre-installed module's client half undelivered on every boot (`D-308`, `C-15`). **Two kinds and no third**; no `RpcMethod`, no second bridge member, no source request.

## 4. The realm's fan-out — one call per module, and the address relation

- **One call per MODULE carrying that module's entries**, never one call per listener and never one entry per delivery: the module's client half receives its own batch and fires each entry's `client` half ON DELIVERY **with the ENTRY**, in the message's order (`S-13`, findings 14).
- **The relation is the STORE'S OWN PREFIX**, and it is what makes a crossing a subscription: the address the fan-out receives is the WRITE's, and a subscriber is notified when ITS declared address prefixes that one — **a subscriber at a crossing's own root IS notified by a write at a leaf under it, and a subscriber AT that leaf is NOT notified by a write at the root** (`C-3`, `M-13`). A subscriber adds no registration and no inverse; the crossing's ONE registration is the construction's (`C-5`, `D-129`).
- **Containment is PER MODULE**: a client half that throws is answered as that module's datum, its batch stops there, and neither another module's entries nor the app's paint are touched (`S-13`). **A module's fault is never the boot's** (`D-80`, `D-124`).

## 5. The second topology — the same module code, the same message, one store per host

- **The channel writes to whichever store hosts the records**: main-side Node under Electron, realm-side WebAssembly under the browser/Node host. The same module source, the same two-half listener and the same `{turn, entries}` message run under both; the WIRE is the only carrier that differs, and under one realm there is no crossing at all (`C-13`, `S-13b`).
- **The store the binding is handed satisfies `C-16`'s ONE surface**, so a member one host refuses and the other answers is a RED BY NAME, not a per-host contract (`D-312`, `M-29`). **One store per host and never two in one process**; the realm construction is `central-data`'s second construction and is not this page's (`D-310`, `D-129`).
- **The parity is a FOUNDATION concern and never the acceptance conversion**: `U7` stays last (`D-306`).

## 6. What this module does NOT own, said rather than implied

- **The write itself**: the client half's `store` act and the module's own records are `central-data`'s and the store's; the channel executes the request and reads the receipt, and no module writes directly (`C-1`, `D-311`).
- **The handle**, the **client source payload**, the **wire**, and the **realm's ctx** are four other seats' (§0); **`src/shared/types.ts`'s `RpcMethod` and the three `module` bridge routes are untouched** (`C-15`).
- **The graph**, the pane, the template and the overlay are `U4`/`U5`'s; this module carries data and invokes client halves, and installs no node (`C-10`, `C-6`).

## 7. The `reentrant-call` refusal — raised here, read there

- **The binding RAISES the flag around a main half's run; the ctx `module-system` hands the module READS it**, its store members answering `{status:'refused', reason:'reentrant-call', subject:<the verb>, message}` as a VALUE — so the store's own permission stands unrepealed and the design refuses at its own door (`C-1`/`S-3`'s pattern; `D-105`, `D-311`). **No envelope entry carries it and no sixth arm exists** (L1 §4 `C-2`).

## 8. The battery, and the rows that will judge this page

- **`tests/integration/module-channel/` is this page's battery and is OWED** (`CH-1`…`CH-6`, named when the step that greens them is written): the binding's one-handle registration and its inverse; the five arms at the envelope grain; the registration frame's string payload and its no-answer; the fan-out's one-call-per-module and its prefix relation; containment; and the `reentrant-call` flag crossing the two seats. **Every row is unmarked and gating when authored** (`D-30`, `D-40`).
- **The e2e rows are L1's and are filed at `S-20`'s realm driver**: `M-2b` (the client half delivered and evaluated), `M-11` (the batch's six readings) and `M-13` (the fan-out's address relation), all in `tests/e2e/module-channel/`; `M-29` is the parity's, reserved in its own battery (`L1` §6).

## 9. Assumptions, each with its rejected alternative

- **`ASM-CH-1` — the handle is `module-system`'s and this module never re-mints it.** Alternative rejected: mint a channel-local handle, which would give one declaration two identities and break the receipt's attribution (`D-310`, `C-3`).
- **`ASM-CH-2` — one message per write TURN per realm, never one per entry.** Alternative rejected: per-entry messages, which would make one turn observable as many and let the realm interleave two turns (`C-2`).
- **`ASM-CH-3` — the fan-out is one call per MODULE carrying its entries.** Alternative rejected: one call per listener, which would let a module's halves observe one turn out of order and would put containment below the module (`S-13`, findings 14).
- **`ASM-CH-4` — the registration frame is a KIND of the one message, not a second member and not a write turn.** Alternative rejected: a second bridge member or an `invoke`-style source request, both refused by `C-15`'s one-member rule (L1 §4 `C-15`, `D-308`).

```boundary-declared
{"unit": "modularity", "layer": "L2", "module": "module-channel", "writes": [{"path": "docs/L2/module-channel/interface.md", "d": "D-307", "why": "this page, rev 1 NEW: the managed passthrough's transport half stated at the I/O grain — binding, envelope, registration frame, fan-out, containment and the parity, with the battery owed and no `src/**` write"}]}
```
