# L2 — `store-tabs-record`: the interface

- **Layer:** L2 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 8 — **rev 8 re-grains §2 and §5 to the CREATION
  as a WRITE at `docs/L3/store-tabs-record/design.md` rev 15: `commit` writes ONE row at the tab's own leaf, the seat repair APPENDS
  it, and `repaired` on it compares against the creation expectation — the mirror of rev 7, which turned `remove` into ONE targeted
  delete with a delete-only expectation (D-157, D-156, D-83, D-70)**; rev 6 took §5's composer judgement (D-139, D-135, D-73); rev 5 the write paths after D-142, rev 4 the client role.
- **Inputs:** `docs/L3/store-tabs-record/design.md` rev 15 §3–§8 and §10; `docs/L1/focus-retirement.md` §2, §3 and §6 `E-11`; D-157
  (the removal landing and the creation debt it books), D-156, D-142 (the settled shape `(b)`, a transparent passthrough), D-136, D-141, D-140, D-137, D-129, D-103, D-105, D-101, D-94, D-83, D-76,
  D-70, D-62, D-3; D-26/D-43 (a count, a path or a stage is read from its owner); D-41 (a source cite names its site, never an offset).
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`.

## 0. Scope

This document fixes the crossing's I/O surface — the record's address shape, the bridge member, its routes and answers, the
refusal vocabulary, the declarations behind them, and **who may write the record** — and the instance behind it. It never
fixes the store's internals, the renderer's rendering, or the engine `provident-storeroom` runs (§3's L2 row; `modules.md` §1).

## 1. Where the record lives, and the shape its leaves take

The record lives in the app's **one central `provident-storeroom` instance**, at `['tabs']` inside `provident-profile.json`,
beside the profile rows it already hosts — not in an instance of its own (D-64, D-65). This module constructs nothing, opens
no file and owns no instance: it DECLARES its six constraints and one change push and the boot batches them (§4, D-65).

| Address | Tier | Holds |
|---|---|---|
| `['tabs']` — `TABS_RECORD_ADDRESS` | `file`, the one tier `tabsDeclaredRoots` publishes | the record root: the `order` seat plus **one flat leaf per tab, named by the tab id** — the landing ENTRY among them, so `['tabs','landing']` is its leaf and no second seat is stored (D-76) |
| `['tabs','order']` — `TABS_ORDER_ADDRESS` | `file` | **THE ONE SINGLETON SEAT**: the ordered place of every tab id, and the sequence every judgement is seated from; an entry id spelling it is unrepresentable and is refused `seat-name` (§3, D-76) |

**THE ACTIVE ID IS DERIVED, NOT STORED** (D-76, D-140): `landingOf` answers the landing ENTRY's row where that row reads
active, else `order`'s first row reading active, else `null`, which `read()` spells `''`. A writer therefore hands the family
`order` and one member per tab and **no witness member at all**, and `exactly-one-active` (§4) is what makes the derivation
total — the id of the row reading active IS the shown tab, and a second spelling is exactly what `['focus']` was and why it
goes (D-76, D-140, D-142). **THE RECORD IS ONE ROOT AT ONE TIER**: `tabsDeclaredRoots` publishes `['tabs']`/`file` and nothing
else, which is what admits a `file`-tier write there and refuses any other tier (§5, D-101).

## 2. The bridge member and its four routes

`window.provident.tabs` — one member of the bridge — carries **four routes, no fifth**, and the ruling of §5 adds none to it
(D-142). `src/renderer/tabs-client.ts`'s `TabsClientBridge` declares two of the four (`read`, `onChanged`), because the
renderer's one write does not travel here at all; `commit` and `remove` remain the crossing's own verbs (§5, D-142).

| Route | Argument | Answer |
|---|---|---|
| `tabs.read()` | none | `{ status: 'committed'; rows; order; landing }` — a TOTAL route: a read that fails answers an empty or partial view, and the refusal type it is declared against is never minted (§1) |
| `tabs.commit(row)` | one tab's whole row, by name | `{ status: 'committed' }`, carrying `repaired: true` where a repair changed the record, or the refusal arm (§3) — the act WRITES ONE ROW and the repairs seat it (§5) |
| `tabs.remove(id)` | one tab's id | the same two arms, on the same rule (§3) — the act DELETES the row and the repairs settle the record (§5) |
| `tabs.onChanged(handler)` | one listener | the withdrawal, and nothing else (`guide §6.2`; §6) |

**`read()`'s `landing` IS §1's DERIVATION AND NOT A STORED POINTER**, so a client reads it and never composes it (D-76).
**`repaired` IS DERIVED, NEVER PREDICTED**: each act compares the record it MEANT with the record that STANDS, so the member
is present exactly where a repair left something the act did not name — absent on a clean act and never answered `false`,
because `false` would be a second spelling of its absence (D-70, D-103). **THE MEANT RECORD IS EACH ACT'S OWN EXPECTATION:**
`remove`'s is DELETE-ONLY — the reading's rows MINUS the id, flags untouched — while **`commit`'s is ADDITIVE**: that reading
PLUS the caller's row PLUS the seat naming it, so a clean creation is `committed` alone and the member says a body settled something the act did not name (L3 design §8).

**`tabs.onChanged` CARRIES NOTHING — no address and no value** — while the record's OWN listener is REGISTERED at `['tabs']`
itself, beside all six pairs, and is delivered an ADDRESS there and never a payload (D-71, `guide §6.2`, `guide §6.4`). **The
client's duty is therefore one line — RE-READ AFTER EVERY DELIVERY** — and a write a pair REFUSES delivers nothing at all, so
the push is never a client's only signal (D-71, D-137).

## 3. The refusal vocabulary — closed, and the store's own words

Every refusal is a **value**, never a throw, and its `reason` is the store's own status verbatim under one open arm; the only
words this module mints are the two arms below and ONE fallback — `'refused'`, answered where a thrown value carries no string
status — so the vocabulary stays the store's (D-76, D-105):

| Arm | `reason` | When |
|---|---|---|
| shape | `'malformed-row'` | the argument is not a plain object, its `id` is not a non-empty string, or its `target` is not a string — refused before any store verb, which is why the record is untouched when it answers (§2) |
| seat | `'seat-name'` | the `id` spells the record's own `order` seat, by `commit` **and** `remove` — refused before any store verb, because a member and a seat are one name in this family (D-76) |
| store | the instance's status verbatim | any refusal the instance answers: a write that did not land, an address that is not the record's (§1) |

**A repaired act is `committed`, never `refused`** — the repair is the engine working (§4), and a caller that read it as a
failure would refuse a write the store accepted (D-103, D-105). **The sentences a caller can receive**, each repaired and
never left standing, are the six declarations' own: *the tab record does not stand*; the `order` seat's *carries no sequence
of exactly its own tabs, once each*; `exactly-one-active`'s three — *holds no tab at all*, *carries no active tab*, *carries more than
one active tab*; and the field pairs' *a tab carries no title*, *a tab contains no data object*, *a tab carries no last-active
stamp* (D-83, §4). `'constraint-repaired'` is NOT one of them: it was minted on a committed answer that nothing produced, and
a repair is the `repaired` member of §2 (D-70).

## 4. The six declarations, and the normalisation the ruling leans on

`tabsConstraintDeclarations` exports SIX declarations, every one of them at `['tabs']`: `tabs-must-stand` (existence), then
`order-names-its-tabs` (the seat every other judgement is seated from, and the record's MEMBERSHIP in BOTH directions — a seat naming a row the record does not hold and a row the seat does not name are ONE fault, one sentence and one repair, L3 design §4), then `exactly-one-active` (`TABS_CONSTRAINT_ID`), then
`tab-has-title`, `tab-has-content` and `tab-has-lastActiveAt` (D-65, D-83). The boot batches them into the instance's
construction; this module registers no second authority over any of them (D-65).

**AND `exactly-one-active`'S REPAIR ALREADY SETTLES A TWO-ACTIVE WRITE, WHICH IS WHAT MAKES D-142 A DELETION AND NOT A
BUILD.** A value seating two active rows is normalised down to one inside the write's own commit: the survivor is the WRITTEN
referent where it survives, else the removed entry's pre-position, else the first active, and the rest are deactivated in the
same object so the re-run reads one corrected record (D-142, D-140). **THE CALLER NEVER CLEARS THE OLDER FLAG**: doing so
would make the caller the authority the repair exists to be (D-142, D-129). **AND THE REPAIR'S ANSWER IS THE WRITE'S OWN** —
`committed`, with `repaired` on this module's verbs (§2) and `repaired` + `log` on the `data.*` route that carried the value
(§5) — never a refusal that would leave the older row standing (D-103, D-105).

## 5. The write paths, after the ruling

| Path | Who composes | Who judges | What passes through unchanged |
|---|---|---|---|
| `tabs.commit(row)` / `tabs.remove(id)` — the module's own verbs | **NOBODY, at either act** (D-157, design §3): `commit` is one `write(['tabs', row.id], TABS_RECORD_TIER, row)` at the tab's own leaf and `remove` one `delete(['tabs', id], TABS_RECORD_TIER)` — no act writes a value; what `composeRecord` still supplies is each act's EXPECTATION, compared and never written (§2) | the six declarations at `['tabs']`, on the record the one key the act touched left: the seat pair refuses an unseated row and its repair APPENDS it (§4) | `commit`: the caller's row, admitted field by field, no member invented, no successor chosen and no sequence composed; `remove`: the row leaves, and the TWO REPAIRS own the seat and the activeness (§4, D-140, D-142) |
| the renderer's whole-record write — `window.provident.data.write({path:['tabs'], tier:'file', value})` → `ipcMain.handle(IPC_DATA_WRITE)` → `createDataSurface().write` → the store's write verb | the renderer, from its own committed `tabs.read()` reading: `order` plus one member per tab, and nothing invented — D-136's seat, which is where formatting belongs | **ALL SIX**, at `['tabs']` where they are registered — `order-names-its-tabs` included, which is what makes a stray key or an unseated row this path's business too: the write is JUDGED and its repairs run, not refused by this surface (§4, D-142) | the value, byte for byte: the handler forwards to the store's write verb and transforms nothing (D-136, D-142) |

**"TRANSPARENT" MEANS NO TRANSFORMATION, NOT NO REFUSAL** (D-142). `data.write` still answers `malformed-arguments`,
`declared-tier`, `parent-absent` and the store's own refusals, because those are the STORE'S judgement passing THROUGH rather
than this surface's decision — and `['tabs']` being a declared root at `file` is what admits the legal tier and refuses every
other (§1, D-101, D-142). **AND THE WHOLE-RECORD COMPOSITIONS THAT REMAIN ARE SETTLED, NOT MERELY BOOKED**: row `2` booked
`composeRecord` — this module's own whole-record composer — and **§10 KEEPS it, re-graining TWO of its three grounds** (D-139, D-83, D-73);
D-142 books the renderer's under that same entry, a RENDERER fact that adds no composing route to `tabs` and licenses no
composition of a caller's value here, while **NEITHER act writes a composed value at this rev — `commit` ONE row and
`remove` ONE delete — and both compose only the EXPECTATION their `repaired` member is judged against** (D-142, D-136, §10). **AND THE RENDERER'S PATH IS LANDED, NOT DECIDED**:
`docs/L1/focus-retirement.md` §6 `E-1` took it as the `focus` case's whole body (`focusActRoute`), which reads the tab record,
composes it once and hands it to `data.write` at `['tabs']`/`file` — so the surface this rev fixes is the one that route writes (D-142, D-143, D-3).

## 6. The renderer's client role — it reads this record, and it owns none

**A CLIENT, HOLDING NO SECOND RECORD** (D-63's client role; D-64's one instance): it reads through `tabs.read()`, re-reads
after every `onChanged`, and changes the record through §5's `data.write` path, composed from the reading it holds (§2, §5).

- **What it reads.** `read()` answers `order`, `landing` and `rows`, and every witness comes from those three members alone:
  the landing terminal stands where `landing` names a row reading `active: true` and no other row does, the error terminal
  where a row carries `error` (D-76, D-137). Both page nodes are the ENVELOPE's, and it authors no element and no text (D-127).
- **When it re-reads.** After every delivery, which carries NOTHING — no address, no value — and after every act of its OWN,
  because a repair may have changed what it wrote (§2, §4). A refused write delivers nothing, so the push is never its only
  signal (D-71, D-137).
- **What it writes.** A WHOLE RECORD IT READ — `order` plus one member per tab, with the target row's `active` set and its
  `lastActiveAt` stamped — handed to `data.write` at `file` (§5). **It never clears the older flag**, because the repair,
  not the caller, is what settles the pair (§4, D-142).
- **What it must never do.** Hold, construct or persist a SECOND record — a mirror, a cache, a renderer-side copy of the
  family — while the one composition it makes per write is a copy of a record it READ, handed straight to that write: the
  family is a set of `file`-tier rows in the app's one store, never a second store (D-62, D-142). Register a constraint at
  `['tabs']` or any second authority on `exactly-one-active`: the six pairs are this module's and the boot's batch (§4, D-65).
  **And `order` is never a client's invention** — the member written is the one the reading carried, so the composition is a
  copy of a record it READ and never a sequence it made up (D-140, D-142). Never notify by writing: a listener runs in its own
  commit, so an `onChanged` body that committed would be a second writer inside the one that fired it (D-71, `guide §6.5`).

## 7. The `focus` retirement, seen from this module's side

**NOTHING OF THIS RECORD MOVES** (D-142): `['focus']` was never a family this module declared, wrote, read or judged — its
address, tier, declaration, body and route are `store-view-record`'s and went whole with that unit's own licensed edit, `E-2`
(it landed: `src/renderer/renderer.ts`'s `focusActRoute`, D-143). The six declarations, `exactly-one-active` and its
normalisation, the `file` tier, the leaf shape and `order`'s role stand as §1–§4 state them (D-142, D-140). **THE CROSSINGS
LEG'S `['focus']` ROWS ARE THAT UNIT'S OWN L1 PASS** (`E-8`), and no battery of this module is any pass's subject here (D-3, D-94).

## 8. What this document does not decide

The battery's rows — authored under `tests/integration/store-tabs-record/` and moving with this rev: FOUR new rows, THREE
re-grains and ONE routing are NAMED at `docs/L3/store-tabs-record/design.md` §11 and are the landing pass's to author, per
D-36's `F-1` and D-3 — also the landing pass's diff scope, and the `§5.U` matrix's operator rows, which stay `PARKED` until a
human is at the window (L1 §3). It does not decide the `['focus']` deletion's own sites either: one writer each, none this module's (§7, D-3).
