# L3 — `store-tabs-record`: the module design

- **Layer:** L3 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 5 — the crossing's structure.
- **Inputs:** `docs/L2/store-tabs-record/interface.md` rev 1 §1–§6; `docs/L1/store-tabs-record.md` rev 1 §1–§3.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** structure and guardrails; every declared name and its exact text
  is in `signatures.md`, which is what L4 transcribes (D-45).

## 1. The structure — three files, one owner each

The module is main-side and has no renderer code. Three files, and each exists because a different thing could go wrong:

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/tabs-record/index.ts` | the instance, its one file path, its two addresses, and the three verbs | the store's whole life is here, so the surface holds no store verb and `main.ts` holds no file path |
| `src/main/tabs-surface/index.ts` | the surface module: the one reference, the constraint, the listener fan-out, the refusal mapping | the instance is constructed once, and the module that constructs it is the only one that can name it (the `settings-surface` arrangement, `docs/L1/security-store-storeroom.md` §4) |
| `src/shared/tabs-channels.ts` | the two channel constants, single-sourced | a channel name spelled in two files is a rename that half-lands (`store-channels.ts`'s precedent) |

**One construction site, checked as an absence**: no file outside `tabs-surface/` may call the constructor, and no file the
MCP stack reaches may spell the instance's file name. That is the isolation property this module shares with the operator's
store, and it is asserted the same way (`docs/L1/security-store-storeroom.md` §6's `ISO-5`/`ISO-6`).

## 2. The instance, and what is not decided by this module

The instance is `provident-storeroom`'s, created with one file path and no options of its own — the package owns the file's
byte image, its journal, its rollback and its durability (`guide §9`). This module chooses **three** things and no more: the
file name, the two addresses, and the constraint.

**A construction that cannot stand is answered, not thrown.** The surface holds a nullable instance and every verb answers
`FilePathUnreachable` while it is null — the shape `settings-surface` already uses for the same reason (a store that cannot
stand must not take the app's boot with it).

## 3. The three verbs, and the two that are not verbs

`read()`, `commit(row)`, `remove(id)` and `onChanged(handler)` are the surface's whole public surface. **`remove` is the
fourth and it is a caller's act** (rev 4, 2026-10-30): the renderer's close deletes the entry's own address and reports its
receipt, and no arrangement of the other three routes can express that — `commit` writes a whole row and cannot unsay one.
One verb is still absent and named so no reader looks for it: **there is no `journal`** (the record's history is the
package's, and a second reader of it would be a second opinion about the record's past).

## 4. The constraint — the engine's gate, and the boundary's repair

**Rev 2** — the adjudication at `.strata/returns/store-tabs-record-l4.json` resolved this section's one ambiguity, and the
split is what the shipped package actually declares.

**The gate is the engine's.** The module writes the constraint function and registers it at construction through
`cfg.constraints`, whose element carries the pair **and** the function and is **armed before any filesystem act**
(`guide §7.2` route one). The engine invokes the body with the attempt's own context and reads its answer: **`true` is the
only pass value**, and an object carrying a `message` is a **rejection** (`guide §7.2`, `§7.5`; the shipped
`landing-page-must-stand` example at `§7.7` is the precedent for both arms). The body **reads the record** to count
actives, which `guide §7.6` says is the caller's work — *"if your constraint cares about the state at any other location,
it reads that location"* — and a read inside a body brackets no commit and is judged by nothing (`§7.6`'s measured clause).

**The repair is the engine's too, and the shape is the package's own contract.** *Rev 3* — the upstream checkout settles
what the shipped declaration omits (`../Provident-Storeroom/docs/specs/storeroom-constraints/contract.md` §(viii)): the
outcome object carries **`message` and `repair`**, and `repair` is a **function** the kernel invokes as
`repair(repairContext)` **inside the attempt's own commit** (`bindings/js/src/entry/kernel-attempt.mjs` reads an own
`message`, then an own `repair`, and calls it through `repairInCommit`, so its writes join the attempt rather than opening a
second commit — that repo's `D-45`, `D-46` item 2). The body above therefore returns `{ message, repair }` when the record
carries more than one active tab, and the repair keeps the last tab in `order` active and deactivates the rest.

**The repair carries the renderer's rules, rule for rule** (transported 2026-10-30): drop the detached keys; give an empty
sequence the **landing page**; where no tab is active take the referent — the removed entry's **pre-position**, else the
caller's own **written referent**, else the first survivor; where more than one is active **keep one** by that same
precedence and deactivate the rest.

**Rev 5 (2026-11-01) — WHAT A REPAIR MUST DO TO BE CREDITED, MEASURED RATHER THAN ASSUMED.** Three facts of the engine
decide the shape of every write in §4, and the earlier revisions of this section were wrong about the third:

- **A repair NAMES THE COMMIT IT WAS HANDED** (D-67). The context is `{address, id, op, tier, value, pending}`, and `pending`
  is the commit's own member (`surface.md §2.11` clause 6). Passing that context at `write`'s **fourth position** makes the
  repair's write **join** the open attempt; without it the same write is refused `KC-7` — *"a constraint attempt is already
  open at `tabs`; it is disposed of by its own K-3 and by no other act"* — which is a ban on a second `K-2` there and not on
  the address.
- **A repair RETURNS THE OP ITS WRITE LANDED**, `{ok: true, op: receipt.op}`: the kernel credits it only through `landedOp`,
  so a `void` return fails `KC-4` as *"the repair … produced no op"*. That contract is undocumented in the shipped artifact —
  filed upstream as `ST-F2`.
- **A repair leaves ONE legal record**, and every one of the four leaves the same one: the three field pairs heal all three
  defaults and the active invariant in the same write, because a repair correcting only its own field hands the re-run a
  record that still violates the others and each repair then nests another until the restart budget (`RESTART_LIMIT` 3) is
  spent.

**The boundary no longer writes a correction, and that is the point of the transport.** The invariant has **one home** —
the engine's evaluation — so `commit` writes the caller's record as the caller asked for it and nothing else: **one whole
value at `['tabs']`**, which mints the root, the `order` seat and the tab's member in the same call (a nested write does
not create its parent — measured: `write(['tabs', id])` on a fresh store answers `AddressNotFound` with an EMPTY `log`, so
no constraint is ever asked). The engine hands a constraint the **landing op and its value** and never the machinery's
pre-write capture, so the PRE side here is **the last record this module observed**, refreshed by every read and every
commit: bounded because the cache is this module's own view of a record only this module writes.

**Four declarations ride the batch, not one — and the reason is the sentence a caller gets.** `exactly-one-active` guards
the *shape of the set*; three more guard each tab's own **fields**, and each is a separate pair because a violation is a fact
about ONE field — a repair that fixed all of them at once could not tell the caller which they broke (D-65's batched list;
`guide §7.2` rejects a repeated `id` in one supplied list, so the four are named apart):

| id | Holds when | Repair |
|---|---|---|
| `exactly-one-active` | at least one member survives **and** exactly one entry reads active | the referent discipline (§4's first paragraph) |
| `tab-has-title` | the tab's `label` is a non-empty string | writes `'untitled'` |
| `tab-has-content` | the tab's `target` — the data object it contains — is a non-empty string | points it at the landing page |
| `tab-has-lastActiveAt` | the tab carries an activation stamp | stamps it with **now**, as an ISO string so the record's byte image stays JSON-plain |

**A repaired commit answers `committed` with `repaired: true`** (L2 §3): the renderer re-reads and renders what the store
says, rather than being told what to think.

## 5. The listener — an address, never a payload

`onChanged` subscribes once and re-delivers every committed change of the `tabs` root. The delivery names the **triggered
address** and never the value (`guide §6.4`): a renderer that needs the value re-reads, and a renderer that needs to know
*what moved* diffs the record it already holds.

**The withdrawal is its own answer** and is exercised: a boot that subscribes and a teardown that withdraws is the pair,
and a listener that outlives its window is a leak the renderer cannot see.

## 6. What this module may not do

- **No MCP surface.** No tool, resource or `RpcMethod` member names the instance or its file; the crossing is the bridge's
  and only the bridge's.
- **No renderer import.** `src/renderer/**` never imports these files — it reaches the record through `window.provident.tabs`
  and nothing else, which is the property that keeps the renderer a client (D-63).
- **No second instance.** One construction site, one file, one constraint. A second `createTabsRecord` call anywhere is a
  finding, not a convenience.
