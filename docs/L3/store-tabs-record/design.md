# L3 — `store-tabs-record`: the module design

- **Layer:** L3 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 10 — the crossing's structure, the record root as
  an enforced invariant, the change push beside the five pairs, and the landing witness DERIVED rather than stored (D-76).
- **Inputs:** `docs/L2/store-tabs-record/interface.md` rev 1 §1–§6; `docs/L1/store-tabs-record.md` rev 1 §1–§3.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** structure and guardrails; every declared name and its exact text
  is in `signatures.md`, which is what L4 transcribes (D-45).

## 1. The structure — three files, one owner each

The module is main-side and has no renderer code. Three files, and each exists because a different thing could go wrong:

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/tabs-record/index.ts` | the record over the APP'S ONE STORE: **three** address constants, **five** batched declarations and **four** routes — and no instance and no file of its own (D-64, D-65) | every write is one whole record at `['tabs']`, so the surface holds no store verb and `main.ts` holds no file path |
| `src/main/tabs-surface/index.ts` | the surface module: the one reference to the record, the one subscription (`attach`/`detach`), the shape arm and the refusal mapping | the record is constructed once at boot, and this module is the only one that holds it (the `settings-surface` arrangement, `docs/L1/security-store-storeroom.md` §4) |
| `src/shared/tabs-channels.ts` | the **four** channel constants, single-sourced | a channel name spelled in two files is a rename that half-lands (`store-channels.ts`'s precedent) |

**One construction site, and it is the boot's, not this module's**: no tabs file constructs an instance and none spells a `provident-*.json`
name — measured 2026-11-02, `grep -rn "provident-.*\.json" src/main/tabs-record/ src/main/tabs-surface/ src/shared/tabs-channels.ts` is empty.

## 2. The instance, and what is not decided by this module

The instance is `provident-storeroom`'s and it is the APP'S CENTRAL ONE (D-64): the boot constructs it with one file path and
the batched `cfg.constraints`, and the package owns that file's byte image, its journal, its rollback and its durability
(`guide §9`). This module constructs nothing and opens no file. It chooses **three** address constants — `TABS_RECORD_ADDRESS`,
`TABS_ORDER_ADDRESS` and `TABS_LANDING_ADDRESS` — and **five** declarations (`tabsConstraintDeclarations`), and nothing else. **Only
the second names a SEAT**: the third is `['tabs', TABS_LANDING_ID]` — the landing ENTRY's own leaf, where the witness is derived, not stored (D-76).

**A construction that cannot stand is not this module's arm.** No route answers `FilePathUnreachable`: measured 2026-11-02, `grep -rn
'FilePathUnreachable' src/main/tabs-record/ src/main/tabs-surface/` is empty — the boot hands this module a store that already stands (D-65).

## 3. The four routes, and the one that is absent

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
actives, which `guide §7.6` says is the caller's work — *"if your constraint cares about the state at any other location, it reads that location"* — and a read inside a body brackets no commit and is judged by nothing (`§7.6`'s measured clause).

**The repair is the engine's too, and the shape is the package's own contract.** *Rev 3* — the upstream checkout settles
what the shipped declaration omits (`../Provident-Storeroom/docs/specs/storeroom-constraints/contract.md` §(viii)): the
outcome object carries **`message` and `repair`**, and `repair` is a **function** the kernel invokes as
`repair(repairContext)` **inside the attempt's own commit** (`bindings/js/src/entry/kernel-attempt.mjs` reads an own
`message`, then an own `repair`, and calls it through `repairInCommit`, so its writes join the attempt rather than opening a
second commit — that repo's `D-45`, `D-46` item 2). The body above therefore returns `{ message, repair }` when the record
carries more than one active tab, and the repair keeps the last tab in `order` active and deactivates the rest.

**The repair carries the renderer's rules, rule for rule** (transported 2026-10-30): drop the detached keys; give an empty sequence
the **landing entry**; where no tab is active take the referent — the removed entry's **pre-position**, else the caller's own
**written referent**, else the first survivor; where more than one is active **keep one** by that precedence and deactivate the rest.

**Rev 5 (2026-11-01) — WHAT A REPAIR MUST DO TO BE CREDITED, MEASURED RATHER THAN ASSUMED.** Three facts of the engine decide the shape of every write here, and the earlier revisions were wrong about the third:

- **A repair NAMES THE COMMIT IT WAS HANDED** (D-67). The context is `{address, id, op, tier, value, pending}`, and `pending`
  is the commit's own member (`surface.md §2.11` clause 6). Passing that context at `write`'s **fourth position** makes the
  repair's write **join** the open attempt; without it the same write is refused `KC-7` — *"a constraint attempt is already
  open at `tabs`; it is disposed of by its own K-3 and by no other act"* — which is a ban on a second `K-2` there and not on
  the address.
- **A repair RETURNS THE OP ITS WRITE LANDED**, `{ok: true, op: receipt.op}`: the kernel credits it only through `landedOp`,
  so a `void` return fails `KC-4` as *"the repair … produced no op"*. That contract is undocumented in the shipped artifact —
  filed upstream as `ST-F2`.
- **A repair leaves ONE legal record**, and every one of the five leaves the same one: the three field pairs heal all three
  defaults and the active invariant in the same write, because a repair correcting only its own field hands the re-run a
  record that still violates the others and each repair then nests another until the restart budget (`RESTART_LIMIT` 3) is
  spent.

**The boundary no longer writes a correction, and that is the point of the transport.** The invariant has **one home** —
the engine's evaluation — so `commit` writes the caller's record as the caller asked for it and nothing else: **one whole
value at `['tabs']`**, which mints the root, the `order` seat and the tab's member in the same call (a nested write does
not create its parent — measured: `write(['tabs', id])` on a fresh store answers `AddressNotFound` with an EMPTY `log`, so
no constraint is ever asked).

**The engine hands a constraint the **landing op and its value** and never the machinery's pre-write capture, so the PRE side
here is **the last record this module observed**, refreshed by every read and every commit: bounded because the cache is this
module's own view of a record only this module writes.

**Rev 10 (2026-11-02) — THE LANDING WITNESS IS DERIVED, AND THE FAMILY CARRIES ONE SEAT (D-75's measurement, D-76's derivation).**
The composer used to append a `landing` STRING after the tab members, and a member's key and a seat's name are one namespace: the
construction instant wrote `{"landing":"tabs-landing-page","order":["tabs-landing-page"],…}`, and on a healthy record a
`commit({id:'landing',…})` was answered `committed` while `order` gained a member the object did not hold — `read()` naming a
landing row it could not seat. So **`composeRecord` writes `order` and one member per seated id and no witness at all**, and
`landingOf` derives it: the landing entry's row when it reads active, else `order`'s active row — one row on any legal record
(`exactly-one-active` makes it so), and `''` at `read()` where no act left one. **No route's shape moved and none of the five
pairs' behaviour either**: the empty sequence still re-mints the entry, and `tab-has-content`'s fallback is still the authored
`'tabs-landing-page'` content target, which is not an id.

**Five declarations ride the batch, not one — and the reason is the sentence a caller gets.** `tabs-must-stand` guards the
record's **existence**; `exactly-one-active` guards the *shape of the set*; three more guard each tab's own **fields**, and
each is a separate pair because a violation is a fact about ONE field — a repair that fixed all of them at once could not
tell the caller which they broke (D-65's batched list; `guide §7.2` rejects a repeated `id` in one supplied list, so the
five are named apart):

| id | Holds when | Repair |
|---|---|---|
| `tabs-must-stand` | the address `['tabs']` holds a record at all | **creates** it: the landing entry, seated and active |
| `exactly-one-active` | at least one member survives **and** exactly one entry reads active | the referent discipline (§4's first paragraph) |
| `tab-has-title` | the tab's `label` is a non-empty string | writes `'untitled'` |
| `tab-has-content` | the tab's `target` — the data object it contains — is a non-empty string | points it at the landing page |
| `tab-has-lastActiveAt` | the tab carries an activation stamp | stamps it with **now**, as an ISO string so the record's byte image stays JSON-plain |

**Rev 6 (2026-11-01) — THE ROOT IS AN ENFORCED INVARIANT, AND ITS REPAIR IS ASKED AT TWO INSTANTS WITH TWO ARITIES.** Before this
revision `['tabs']` was minted only by the first `commit`, so between the boot and that write `read()` answered an empty record
with no witness (D-69). `tabs-must-stand` makes existence the engine's to demand:

- **A pair whose own key is ABSENT is APPLIED** where its parent resolves (`guide §7.2`'s dated clause, item (3)); `['tabs']`'s parent is the register, which always resolves, so it is asked at construction over an empty store — the one arm a repair can rescue, since a pair under an absent PARENT is never asked at all.
- **The body judges `context.value` and needs no store handle**: at the construction instant the boot has not bound one, so
  the null-store abstention every other body rides would silence the one pair that must act. `value` is the value read at
  the address, `undefined` where nothing is held.
- **THE REGISTRATION INSTANT'S REPAIR WRITES WITH THREE POSITIONS — `write(address, tier, value)` — AND CANNOT NAME THE COMMIT**
  (item (4)): that commit is the registration's own, and a fourth position there is a `TypeError` before any store act. **THE LANDING
  INSTANT'S WRITES WITH FOUR AND MUST NAME IT** — `pending`, the commit the repair is part of (`D-67`), which is what makes the write
  join the attempt instead of opening a second `K-2`. **Each instant declares its own arity and one call shape cannot satisfy both**,
  so the repair branches on the record's own `write` member, which alone tells them apart. **The write runs no pass of its own**: the
  registration's re-run judges the pair over the op the repair returned.
- **Consequence, carried and not absorbed: a fresh record carries the landing tab.** `read()` answers that entry seated and
  active — `order: ['landing']`, the id D-76 moved — before any commit, and the first commit APPENDS to that record
  instead of creating the root. Nothing in the module depended on the old emptiness: every route reads the record as it stands and
  writes it whole. **And the root cannot be deleted out from under the app**: measured 2026-11-01, a `delete(['tabs'])` is answered
  as the store's own success while the existence pair's repair re-creates the record inside the same commit, so the address the
  record is read at is an invariant at both ends.

**A repaired commit answers `committed` with `repaired: true`** (L2 §3): the renderer re-reads and renders what the store says, rather than being told what to think. **Rev 7 DERIVES that member, and until it no code produced it at all.** The write's record carries no member for a repair inside its own commit (`guide §6.4`), so the act compares the record it INTENDED with the record that STANDS — CANONICALLY, member order and absence normalised, or a clean act would report a false difference — answering `repaired: true` only where they differ and omitting the member on a clean act. **No `cursor` member survives**: it named nothing the package supplies (D-70).

## 5. The listener — an address, never a payload

**`onChanged` takes ONE subscription and delivers exactly ONE notification per committed change of the record** — a `commit`, a `remove`, and a repair's own write inside that same commit, which JOINs it (D-67) rather than opening a second one. The delivery names the **triggered address** and never the value (`guide §6.4`): a renderer that needs the value re-reads, and one that needs to know *what moved* diffs the record it already holds. **A write a pair REFUSES delivers NOTHING**: the pair is asked, the pass throws, and the delivery window never opens.

**Rev 8 (2026-11-01) — THE LISTENER STANDS AT `['tabs']` ITSELF, BESIDE ALL FIVE PAIRS** (D-71). The consumed `provident-storeroom 1.7.0` lifts the address exclusion: **a constraint pair and a listener MAY stand at one address** — the pair ASKED by the pass, the listener DELIVERED after it — and **the ONLY cross-kind restriction is the HANDLE**, a listener whose handle equals a pair's `id` being refused `AddressMalformed` at `listen`/`register`/`addConstraint` (`guide §7.3`'s clause of 2026-11-01). This module's handles are `tabs-record:<n>@tabs` — a fixed prefix plus a minted ordinal — so none can spell one of its five ids. **The `['tabs','order']` installation rev 7 declared was a workaround for a refusal 1.7.0 no longer makes, and it is withdrawn.** **The installation is TWO acts, and both are the package's** (`guide §6.2`): `listen` installs the entry, `register` the FUNCTION under it — an entry no `register` filled is a lawful, silent RESERVATION that fires nothing (`§6.3` rule 1). The handle is MINTED PER SUBSCRIPTION (`register` replaces a handle's function, `unlisten` withdraws it WHOLE, so a fixed name starves a second subscriber), the body WRITES NOTHING (a listener's write opens its own commit) and CONTAINS the caller's throw (it crosses into the firing write, `§6.5a`). **The withdrawal is its own answer**, exercised by a counter in `crossing.test.ts`'s delivery rows and its control, by the row pinning the pair-and-listener-at-one-address pattern, and by `surface.test.ts`'s `attach`/`detach` row — a listener that outlives its window is a leak the renderer cannot see.

## 6. What this module may not do

- **No MCP surface.** No tool, resource or `RpcMethod` member names the instance or its file; the crossing is the bridge's
  and only the bridge's.
- **No renderer import.** `src/renderer/**` never imports these files — it reaches the record through `window.provident.tabs`
  and nothing else, which is the property that keeps the renderer a client (D-63).
- **No second record.** One construction site (`createTabsSurface`) and no file of this module's own (§2). A second
  `createTabsRecord` call anywhere is a finding, not a convenience.
