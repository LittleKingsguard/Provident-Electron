# L2 — `store-tabs-record`: the interface

- **Layer:** L2 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — the crossing D-63 decided.
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
| `['tabs']` (the central instance's) | `file` | the record root: `order` and `landing` seats plus **one flat leaf per tab** whose name is the tab id |
| `['tabs-exclusion']` | `mem` | the volatile pair the renderer's landing witness reads, never persisted |

The `file`-tier write is `provident-storeroom`'s, not this module's: the module writes no byte and parses no file
(§2, `persistence.md`).

## 2. The bridge member and its three routes

`window.provident` gains **one** top-level member, `tabs`, shaped like the tier-1 `store` bridge it sits beside — three
routes, no fourth:

| Route | Argument | Answer |
|---|---|---|
| `tabs.read()` | none | `{ status: 'committed'; rows: readonly TabRow[]; order: readonly string[]; landing: string }` or the refusal arm |
| `tabs.commit(row: TabRow)` | one tab's whole record, by name | `{ status: 'committed' }`, carrying **`repaired: true`** where a repair changed the record, or the refusal arm |
| `tabs.remove(id: string)` | one tab's id | `{ status: 'committed' }`, carrying **`repaired: true`** on the same condition, or the refusal arm |
| `tabs.onChanged(handler)` | one listener | the withdrawal, and nothing else |

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
**it cannot install at `['tabs']`**: all five of the record's pairs stand there and a listener and a constraint do not
share one address, so it installs at the record's `order` descendant, which the one whole value every act writes always
touches (design §5). A `subscribe` that installed one act and not two was a push that existed in name only (D-70).

## 3. The refusal vocabulary — closed, and the store's own words

Every refusal is a **value**, never a throw, and its `reason` is the store's own status verbatim under an open escape arm;
the module mints no status of its own beyond the one shape arm below:

| Arm | `reason` | When |
|---|---|---|
| shape | `'malformed-row'` | the commit's argument is not a plain object, or its `id` is not a non-empty string — refused **before** any store verb |
| store | the instance's status verbatim | any refusal the instance answers: the write did not land, the construction could not stand, the address is not the record's |

**There is no third token, and there was no third arm.** This section carried **`'constraint-repaired'`** as a reason minted
*on a committed answer*; **nothing in `src/main/` ever produced it** (`grep -rn 'constraint-repaired' src/` is empty) and it is
removed here: a repair is not a refusal vocabulary's business, it is the `repaired` member of a `committed` answer (§2).

**A repaired commit is `committed`, never `refused`** — the repair is the engine working (L1 §2), and a renderer that treats
it as a failure would refuse a write the store accepted. **And the act does not GUESS that a repair ran**: the answer
carries `repaired: true` only where the record that stands is not the record the act intended, derived by the module and
never read from the store, whose write record has no member for a repair inside its own commit (`guide §6.4`).

**The five constraint sentences a caller can receive** (each repaired, never left standing): *the tab record does not
stand* · *the tab record carries more than one active tab* · *a tab carries no title* · *a tab contains no data object* ·
*a tab carries no last-active stamp*. Each names the thing it is about, because that is how a caller learns what broke; the
first names the record's **existence**, and it is the one a caller does not read from a `commit` or a `delete`: a write at
`['tabs']` creates what it writes, and a `delete` at the root is answered as the store's own success while the repair
re-creates the record in the same commit (measured 2026-11-01: `tiers: ['file']`, and the read after it holds the landing
page again). It reaches a caller as a refusal only where the registration's own repair could not land the record.

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
- **The five `data.*` members stay unanswered.** The tab record does not ride them: they are `central-data`'s surface over
  the profile store, and a second unit over one route is what D-32 forbids. Their own debt is `strata/pending.md`'s.
- **`src/renderer/store.ts` is not involved.** It is renderer-side and unwired (ASM-7); D-63 decoupled this rework from it.

## 6. What this document does not decide

The battery's rows (`tests/integration/store-tabs-record/`, claimed before it is authored — D-36 `F-1`), the landing
pass's diff scope, and the `§5.U` matrix's operator rows, which stay `PARKED` until a human is at the window (L1 §3).
