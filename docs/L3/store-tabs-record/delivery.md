# L3 — `store-tabs-record`: the one registration moves to the construction, and the surface stops taking it

- **Layer:** L3 · **Unit:** `store-tabs-record` (this pass) · **Branch:** `strata` (D-6) · **Artifact:** `l3-design` · **Rev:** 1 — **THIS PAGE IS NEW AND IT IS A SPLIT, NOT AN APPEND**: `docs/L3/store-tabs-record/design.md` stands at **`147` lines of a `150`-line ceiling** and this pass's delta cannot fit in three (`D-1`, `D-2`). **The delta**: **`['tabs']`' one `listen`+`register` moves out of `subscribe` and into the store's construction**, through a delivery object this module builds **before the store exists**; `subscribe(handler)` keeps its signature, its meaning and its containment and **stops touching the store**; `tabsSurface.attach`/`detach` and the surface's `onChanged` option **go whole** (`D-219`, `D-218`, `D-217`).
- **Inputs:** `D-219` (**the four registration instants deliver after their repairs land**; a `cfg.listeners[]` entry is `{ address, handle, listener }` with `listener` REQUIRED), `D-218` (the app's registration runs **after** construction, so the creation's writes are dropped), `D-217` (*"the initial render is driven by the listeners firing on store load"*), `D-216` (a render with no event behind it is off-paradigm), `D-92`, `D-93`/`D-129`, `D-71`, `D-70`, `D-83`, `D-65`, `D-41` (sites), `D-3`. The store's contract is `node_modules/provident-storeroom/README.guide.md` §6 (`:497`–`:567`).
- **Ceiling:** 150 lines, class max (`D-1`) · **Write scope:** `docs/L3/store-tabs-record/` · **Status:** structure, signatures, hunks and guardrails — **no function body appears here** (`D-45`).

## 1. The family, the address, and the one registration

| | |
|---|---|
| the family | `['tabs']` — `TABS_RECORD_ADDRESS`, `TABS_RECORD_TIER` = `file`, **one root at one tier** (`design.md` §2, `D-76`, `D-101`) |
| the handle | `tabs-record:<n>@tabs`, minted **once**, at the delivery's construction, and **never withdrawn** (`D-71`) |
| the registration it REPLACES | `subscribe`'s `handleFor()` + `listen(handle, [TABS_RECORD_ADDRESS])` + `register(handle, body)`, and its `unlisten` on the withdrawal path — **three statements that go whole** (`src/main/tabs-record/index.ts`, `subscribe`) |
| fires at the creation? | **YES** — the six declarations' creation repairs write the landing floor through `tabs-must-stand` and `order-names-its-tabs` (`design.md` §4, `D-83`), so the adopted listener is invoked after those repairs land (`D-219`) |

- **WHY IT MUST MOVE AND NOT BE COPIED**: `tabsSurface.attach()` → `record.subscribe(...)` runs **after** `createProfileStore` returns, so the creation's writes are delivered to nobody — the measured `deliveries = 0` (`D-218`). **Leaving it and adding a `cfg` entry would be two registrations for one address, which is the copy `D-129` forbids and a doubled delivery on every write** (`D-219`, `D-93`).
- **AND ITS DELIVERY IS THE APP'S ONLY PATH FROM A TAB WRITE TO A RENDERED ROW**: the renderer's `startTabsClientInstrument` re-reads on the push and mints the rows; **with the registration at the construction, the first frame's rows are a delivery's and not a boot read's** (`docs/L3/app-shell/delivery.md` §8, `docs/L2/renderer-wiring/interface.md` §2 turn 1).

## 2. The delivery object — built before the store, adopted by it

- **`createTabsDelivery(sink)` answers two halves of one thing**: `entries` — the **one** `cfg.listeners` element the boot spreads into `createProfileStore`'s `listeners` array — and `subscribe(handler)`, the fan-out a later consumer takes. **It is built before the store because the store's `listeners` array is read inside the call that creates it** (`D-219`, `docs/L3/app-shell/delivery.md` §1).
- **THE ENTRY IS `{ address, handle, listener }`, THREE OWN MEMBERS WITH THE THIRD REQUIRED**; `address` is `[TABS_RECORD_ADDRESS]`'s single address — **one element carries exactly one address** — and a two-member element is refused `AddressMalformed` (subject `listeners`) **before any filesystem act** (`guide §6`, `:533`–`:560`).
- **THE BODY IS ONE LINE AND TWO GUARANTEES**: `sink(address)` inside `try`/`catch`. **It writes nothing** (`guide §6.5` item 1 — a listener's write opens a commit of its own inside the one that fired it) **and it contains its own throw** (an uncontained throw at a registration instant refuses the act at rank `21` `ListenerBodyThrew`, which at the creation means `storeCreate` refuses and the app takes `D-80`'s fatal arm — `guide §6`, `:513`–`:516`).
- **THE SINK RECEIVES THE ADDRESS AND NEVER A VALUE**: the tab record's delivery has always been a signal and the client has always re-read (`design.md` §5, `D-92`, `D-137`). **A delivery that carried the record would be the renderer-side copy `design.md` §6 forbids by name.**
- **THE PREFIX CLAUSE STILL CARRIES THE ACTS AND NONE OF THEM MOVES**: `commit`'s leaf write at `['tabs', row.id]` and the seat repair's whole-record write inside that commit are **one commit and therefore one delivery**, and an outside whole-record `data.write` delivers through the same entry — **the address was always the authority, and it still is** (`design.md` §5, `D-67`, `D-142`).

## 3. `subscribe` after the move — signature unmoved, store act gone

- **`subscribe(handler: () => void): () => void` STANDS VERBATIM, AND SO DOES ITS MEANING**: one notification per committed change of the record, a body that writes nothing, the caller's throw contained, and an idempotent withdrawal. **What goes is the store's third of it**: no `handleFor()` call, no `listen`, no `register`, no `unlisten`, no `try` around a store verb. **Its body is one handler appended to one list and one removal returned** (`D-71`, `design.md` §5).
- **THE WITHDRAWAL IS LOCAL AND THAT IS THE HONEST SHAPE** (`D-70`): the entry the construction adopted is the instance's for its life, and a `unlisten` whose only possible act is to remove the app's own listener is a name without a reader.
- **`D-71`'s *"a registration that could not stand leaves nothing behind"* loses its site and not its force**: `storeCreate` adopts the entry or refuses the construction, and a refused construction is `D-80`'s fatal arm — there is no half-registration to withdraw (`D-71`, `D-80`).

## 4. The surface — two members and one option leave, and nothing on the wire moves

- **`TabsSurface` LOSES `attach(): void` AND `detach(): void`, AND ITS OPTIONS LOSE `onChanged`**: their subject was the one subscription, and **the construction holds it now** (`D-70`, `D-219`). **`read`, `commit`, `remove` and their shape arms are byte-unmoved.**
- **NO CHANNEL, NO BRIDGE MEMBER, NO `ipcMain.handle` SITE AND NO `src/shared/` BYTE MOVES**: `src/shared/tabs-channels.ts` keeps its four constants, `preload.ts`'s `tabs` block and the renderer's half keep their four members, and the client's `onChanged` registration on the bridge is unmoved — **that route is `main`'s fan-out and not this registration** (`D-112`, `D-14`). **`endpoints` stays `4`** (`D-26`, `D-43`).

## 5. The hunks, in the order L4 lands them

| # | File · site | The write | Cite |
|---|---|---|---|
| `TD-1` | `src/main/tabs-record/index.ts`, beside `tabsDeclaredRoots()` | `createTabsDelivery(sink)` and its two members; the one entry, built from `TABS_RECORD_ADDRESS` and `handleFor` | §2 |
| `TD-2` | the same file, `subscribe`'s body | the `handleFor`/`listen`/`register` and the two `unlisten` sites **go whole**; `subscribe` becomes the delivery's fan-out; `createTabsRecord`'s options gain `delivery` | §3 |
| `TD-3` | `src/main/tabs-surface/index.ts` | `TabsSurface` loses `attach` and `detach`; the options lose `onChanged` and gain `delivery`, passed through to the record | §4 |
| `TD-4` | the docblocks the landing falsifies, re-grained in place (`D-46`: comments, not `D-n` rows) | `subscribe`'s own block (the two-acts paragraph, the `1.6.2` measurement it cites as the reason the push exists, and the `unlisten`-on-failure clause) and `design.md`'s §1 surface row — **the latter is §6's, not a hunk in this file** | `D-1`, §1 |
| `TD-5` | `docs/L3/store-tabs-record/signatures.md` and the row that pins it | the surface block's `attach(): void` / `detach(): void` **leave**; the rev token moves in the same edit; `subscribe`'s declared line is **byte-unmoved** | `D-45`, `C-7` |

- **NOTHING ELSE MOVES**: `commit`'s leaf write and its creation expectation, `remove`'s delete-only expectation, the six declarations, `exactly-one-active`'s normalisation, `composeRecord` and `rowsSeatedUnder`, `repaired` on both acts, the three address constants, `tabsDeclaredRoots()` and `tabs-channels.ts` — **all unmoved, and `design.md` §3, §4, §7, §8 and §10 licence no byte of them differently** (`D-159`, `D-155`).
- **AND NO `src/` FILE IS CREATED**: `pins`' `srcTypeScriptFiles` and the map's `mapRows` do not move (`D-26`, `D-43`).

## 6. Guardrails for L4

| id | Guardrail | Cite |
|---|---|---|
| `TG-1` | **ONE REGISTRATION AT `['tabs']`, TAKEN AT THE CONSTRUCTION** — no `listen`/`register`/`removeListener`/`unlisten` remains under `src/main/tabs-record/` or `src/main/tabs-surface/` | `D-219`, `D-129`, `D-93` |
| `TG-2` | **NO `listener: () => {}` AND NO NO-OP**: the package's migration route satisfies its own refusal and changes no behaviour | `D-219`, `docs/L3/app-shell/delivery.md` `G-1` |
| `TG-3` | **THE ENTRY'S BODY WRITES NOTHING AND CONTAINS ITS OWN THROW**; the listener is not the place for a repair, a read or a re-mint | `guide §6.5`, `D-124`, `D-80` |
| `TG-4` | **THE HANDLE STAYS MINTED BY `handleFor` AND IS NOT RE-SPELLED**: `tabs-record:` is the prefix no batch `id` repeats | `D-71` |
| `TG-5` | **NO TIMER, NO POLL, NO WRITE ON A READ** — the delivery is a signal and the client re-reads | `D-82` clause 4, `D-92` |
| `TG-6` | **`design.md`'s §5 IS FALSIFIED BY `TD-2` AND IS NOT THIS PAGE'S TO RE-GRAIN**: it stands at `147/150` and its next pass replaces it; a reader who needs the listener's contract reads §1–§3 here until then | `D-2`, `D-3`, §7 |

## 7. The rows that move, and what must move on `design.md`

- **`tests/integration/store-tabs-record/crossing.test.ts`** — its four `record.subscribe(...)` rows: **the SETUP gains the delivery and its `entries`, the assertions stand** (a committed creation delivers ONCE through the leaf write and its repairs; a refused write delivers nothing — `design.md` §5, `D-159`).
- **`tests/integration/store-tabs-record/surface.test.ts`** — its `surface.attach()` / `surface.detach()` rows: **the two members are gone**, and what they measured (the push reaches a subscriber once per change, the withdrawal idempotent) is measured through `record.subscribe` on a delivery-fed store.
- **`tests/unit/store-tabs-record/signatures.test.ts`** — the rev token it pins, and the surface block's two departed lines (`TD-5`).
- **`design.md` §1's surface row (*"the surface: … the one subscription (`attach`/`detach`)"*) and §5 in full are falsified by this pass.** **They must be re-grained at that page's next pass, which must REPLACE the page** (`D-2`): `147/150` leaves room for three lines and §5 plus the rev delta is more than three. **Named here so the drift is a debt and not a discovery** (`D-3`, `D-46`).
