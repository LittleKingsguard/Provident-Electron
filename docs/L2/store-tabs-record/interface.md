# L2 — `store-tabs-record`: the interface

- **Layer:** L2 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 4 — the crossing D-63 decided; rev 2
  moved the record onto the central instance (D-64, §1), rev 3 put the change push at the record's own address (D-71, §2),
  and rev 4 declares the renderer's client role (§6).
- **Inputs:** `docs/L1/store-tabs-record.md` rev 1 §1–§4 (the record family, the constraint, the `§5.U` matrix); D-62
  (the unit and its `N = 4`), D-63 (the crossing), D-32 (no path or route claimed twice), D-26/D-39 (a count has one
  home), D-30/D-40 (the marked surface), D-43 (cite, never restate).
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`;
  a source cite names its site (D-41).

## 0. Scope

This document fixes the crossing's I/O surface — the bridge member, its routes, their arguments and answers, the refusal
vocabulary — and the instance behind it. It never fixes the store's internals, the renderer's rendering, or the engine
`provident-storeroom` runs (§3's L2 row; `modules.md` §1).

## 1. Where the record lives, and why it is a third instance

**Rev 2** — *D-64 supersedes this section's first reading.* The record lives in the app's **one central
`provident-storeroom` instance**, at the `['tabs']` addresses inside `provident-profile.json`, beside the profile rows it
already hosts — **not** in an instance of its own. D-32 governs two units claiming one path in the map, not two surfaces
reading one store at different addresses, and the app keeps one store rather than three. The routes below are unchanged;
only whose instance answers them is.

**And D-65 fixes the boot order that makes it possible**: the central instance is constructed **at boot, unconditionally**,
with the **batched `cfg.constraints`** every module declares — this module contributes
`{ address: ['tabs'], id: 'exactly-one-active', constraint }` as a declaration, not as a constructor call — and then
**listeners drive the rest of the data flow**. So this module declares its constraint and its change push and constructs
nothing; the third instance and `provident-tabs-record.json` go, and the written name set returns to two. The lazy
construction `central-data` documented is superseded by D-65, which that unit's L2 revises.

Its addresses are the L1 §1 family, unchanged by the crossing:

| Address | Tier | Holds |
|---|---|---|
| `['tabs']` (the central instance's) | `file` | the record root: the `order` seat plus **one flat leaf per tab** whose name is the tab id — the landing entry's among them, so `file.tabs.landing` is its leaf and no second seat is stored (D-76) |
| `['tabs-exclusion']` | `mem` | the volatile pair the renderer's landing witness reads, never persisted |

The `file`-tier write is `provident-storeroom`'s, not this module's: the module writes no byte and parses no file
(§2, `persistence.md`).

## 2. The bridge member and its four routes

`window.provident` gains **one** top-level member, `tabs`, shaped like the tier-1 `store` bridge it sits beside — four
routes, no fifth:

| Route | Argument | Answer |
|---|---|---|
| `tabs.read()` | none | `{ status: 'committed'; rows: readonly TabRow[]; order: readonly string[]; landing: string }` or the refusal arm |
| `tabs.commit(row: TabRow)` | one tab's whole record, by name | `{ status: 'committed' }`, carrying **`repaired: true`** where a repair changed the record, or the refusal arm — `'seat-name'` where the id spells the record's own seat (§3) |
| `tabs.remove(id: string)` | one tab's id | `{ status: 'committed' }`, carrying **`repaired: true`** on the same condition, or the refusal arm — `'seat-name'` on the same id rule (§3) |
| `tabs.onChanged(handler)` | one listener | the withdrawal, and nothing else |

**`read()`'s `landing` MEMBER IS DERIVED, NOT A STORED POINTER** (D-76): the id of the row reading active — `'landing'` when that entry is the shown tab, `''` on a record no legal act has left — so a client reads it and never composes it.
**THE COMMITTED ARM OF `commit` AND `remove` IS `{ status: 'committed' }` AND NOTHING ELSE, EXCEPT `repaired`.** **Measured
2026-11-01, and the two answer declarations above consequently carry no `cursor`**: the store's write receipt is `{op,
watched, triggered}` and its declaration carries no `cursor` at all (`grep -n 'cursor'
node_modules/provident-storeroom/index.d.ts` is empty), so the member was read off a receipt that never held it and no act
could have produced it — a name with nothing behind it, removed as a contract deletion (D-70). **`repaired` is the member
that was declared and never produced, and it is present EXACTLY when the record that STANDS is not the record the act
intended**: the engine's repair ran in the act's own commit, the module derived it by comparing the written intent with the
standing record, and the renderer therefore re-reads and renders what the store says (§3). **It is ABSENT on a clean act and
never answered `false`** — the member is a signal, and `false` would be a second spelling of its absence.

**`tabs.onChanged` is the event generator**: the instance's own listener delivers the triggered address, and the renderer
re-reads rather than being handed the value — the delivery argument is an address, not a payload (`guide §6.4`).
**The listener is REGISTERED, not merely listened for** (`guide §6.2`: `listen(handle, addresses)` installs the entry and
`register(handle, listener)` installs the function under it — the store invokes nothing it was not registered with), and
**Rev 3 — it installs at `['tabs']` ITSELF, the record's own address, beside all six of the record's pairs** (D-71, D-83): from
the consumed `provident-storeroom 1.7.0` a constraint pair and a listener **may stand at one address** — the pair ASKED by
the pass, the listener DELIVERED after it — and **the only cross-kind restriction is the HANDLE**, a listener's handle
equal to a pair's `id` being refused `AddressMalformed`, which this module's minted `tabs-record:<n>@tabs` can never spell
(design §5; `guide §7.3`'s clause of 2026-11-01). **The client's duty is therefore unchanged and says nothing about
addressing: RE-READ AFTER EVERY `onChanged`** — the push carries no value, and a write a pair REFUSES delivers nothing at
all. A `subscribe` that installed one act and not two was a push that existed in name only (D-70).

## 3. The refusal vocabulary — closed, and the store's own words

Every refusal is a **value**, never a throw, and its `reason` is the store's own status verbatim under an open escape arm;
the module mints no status of its own beyond the two arms below:

| Arm | `reason` | When |
|---|---|---|
| shape | `'malformed-row'` | the commit's argument is not a plain object, or its `id` is not a non-empty string — refused **before** any store verb |
| seat | `'seat-name'` | the `id` spells the record's own `order` seat, by `commit` **and** `remove` — refused **before** any store verb, because a member and a seat are one name in this family (D-76) |
| store | the instance's status verbatim | any refusal the instance answers: a write that did not land, an address that is not the record's |

**And `'constraint-repaired'` is removed, never renamed into one of these.** It was minted *on a committed answer*, **nothing in `src/main/` ever produced it** (`grep -rn 'constraint-repaired' src/` is empty), and a repair is the `repaired` member of a `committed` answer (§2).

**A repaired commit is `committed`, never `refused`** — the repair is the engine working (L1 §2), and a renderer that treats
it as a failure would refuse a write the store accepted. **And the act does not GUESS that a repair ran**: the answer
carries `repaired: true` only where the record that stands is not the record the act intended, derived by the module and
never read from the store, whose write record has no member for a repair inside its own commit (`guide §6.4`).

**The six constraint sentences a caller can receive** (each repaired, never left standing): *the tab record does not
stand* · *the tab record's `'order'` seat carries no sequence of its own tabs, once each* · *the tab record carries more
than one active tab* · *a tab carries no title* · *a tab contains no data object* · *a tab carries no last-active stamp*.
Each names the thing it is about, because that is how a caller learns what broke; the **first** names the record's
**existence**, the **second** names its `order` SEAT — the sixth pair, `order-names-its-tabs`, whose subject is the seat
every other judgement is seated from, and which is the second of the two tested at the STORE'S CREATION rather than at a
write (D-83; its states are D-83's). The first is the one a caller does not read from a `commit` or a `delete`: a write at
`['tabs']` creates what it writes, and a `delete` at the root is answered as the store's own success while the repair
re-creates the record in the same commit (measured 2026-11-01: `tiers: ['file']`, and the read after it holds the landing
page again). Either of the first two reaches a caller as a refusal only where the registration's own repair could not land
the record.

## 4. The constraint moves to the instance

`TABS_CONSTRAINT` is a `GraphConstraint` the renderer evaluates today (L1 §2). Under D-63 it becomes the **instance's**
constraint: `exactly-one-active` over the `tabs` matched set, evaluated on `set`/`commit`/`remove`, with the corrective
write the engine applies rather than a value the renderer applies. The renderer loses the constraint registration and
gains a client's duty: **re-read after every `onChanged`**.

## 5. What the crossing costs, named rather than absorbed

- **The bridge grows to eight top-level members.** Three gating batteries assert the seven-member census by set equality
  (`tests/integration/security-store-storeroom/isolation.test.ts`'s `BRIDGE_MEMBERS`, and the two `tests/e2e/` isolation
  batteries), and `docs/L1/security-store-storeroom.md` §6 and `docs/L3/security-store-storeroom/signatures.md` state it.
  Those move **in the landing pass**, as a named census move (D-11, D-13, D-31) — never as a silent widening.
- **`N` re-derives.** The map row's four operative spellings do not change; what changes is the route count the census
  counts (D-39: the figure is read from the row, never counted here).
- **The five `data.*` members stay unanswered.** The tab record does not ride them: they are `central-data`'s surface over the profile store, and a second unit over one route is what D-32 forbids. Their own debt is `strata/pending.md`'s.
- **`src/renderer/store.ts` is not involved.** It is renderer-side and unwired (ASM-7); D-63 decoupled this rework from it — **and it no longer exists: D-78's purge stage 1 DELETED it 2026-11-02, so this line now means "no module of that name is in the closure at all".**

## 6. The renderer's client role — it reads this record, and it owns none

**A CLIENT, HOLDING NO SECOND RECORD** (D-63's client role; D-64's one instance): it reads through `tabs.read()`, re-reads after
every `tabs.onChanged`, and changes the record only through `tabs.commit(row)` and `tabs.remove(id)` — §2's four routes, no fifth.

- **What it reads.** `read()` answers `order`, `landing` and `rows`, and every witness a client needs comes from those three members alone: the landing terminal stands where `landing` names a row reading `active: true` and no other row does, the
  error terminal where a row carries `error`. Both page nodes are the ENVELOPE's (`src/shared/demo-envelope.ts`'s
  `TABS_LANDING_PAGE_ID` / `TABS_ERROR_PAGE_ID`), resolved through `Runtime.elementForNodeId`; it authors no element and no text.
- **When it re-reads.** After every `onChanged` delivery, which carries an ADDRESS and not a value (`guide §6.4`), and after
  every act of its OWN, because `repaired` is exactly the case where the record that stands is not the one the act intended
  (§3). A write a pair REFUSED delivers nothing (D-71), so the push is never a client's only signal.
- **What it commits.** One tab's whole row, by name, in `TabsRecordRow`'s own fields — or one id's removal. **No SEAT**: `order`
  is the one composed member a client must not spell, and `landing` is derived, written by no act at all (D-76, §4).
- **What it must never do.** Hold, construct or persist a second record — the graph store's `file.tabs.*` root family is the
  renderer-owned copy this role retires. Register a constraint at `['tabs']`, or any second authority on
  `exactly-one-active`: the six pairs are this module's and the boot's batch (D-65, D-83). Write outside `commit`/`remove` — no
  `put`, no file, no channel of its own — and never notify by writing: a listener runs in its own commit (`guide §6.5`), so an
  `onChanged` body that committed would be a second writer inside the one that fired it (D-71).
- **DECIDED, AND SPELLED (D-75, D-76):** the landing ENTRY's id is the renderer's `'landing'` in this record too — the seat that
  made it unrepresentable is DERIVED away, `TABS_LANDING_ID` is exported so a client reads one spelling, and a tab id equal to the
  remaining seat (`order`) is refused. **No migration** (the carrier's rows are dropped, not moved); **OPEN:** boot order.

## 7. What this document does not decide

The battery's rows (`tests/integration/store-tabs-record/`, claimed before it is authored — D-36 `F-1`), the landing pass's diff scope, and the `§5.U` matrix's operator rows, which stay `PARKED` until a human is at the window (L1 §3).
