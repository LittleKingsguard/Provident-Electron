# L3 — `view-record`: the crossing's registration moves to the construction, and its four entries are built before the store

- **Layer:** L3 · **Unit:** `store-view-record` (this pass) · **Branch:** `strata` (D-6) · **Artifact:** `l3-design` · **Rev:** 1 — **THIS PAGE IS NEW AND IT IS A SPLIT, NOT AN APPEND**: `docs/L3/view-record/design.md` stands at **`150` lines of a `150`-line ceiling**, so this pass takes its own page (`D-1`, `D-2`). **The delta**: the four roots' `listen`+`register` leave `subscribe` and **move into the store's construction**, through a delivery object this module builds **before the store exists**; `subscribe` keeps its signature and its meaning and **stops touching the store**; the surface loses `attach`, `detach` and its `onChanged` option; and the two docblocks that state the defect as a design fact are re-grained (`D-219`, `D-218`, `D-217`).
- **Inputs:** `D-219` (a `cfg.listeners[]` entry is `{ address, handle, listener }` with `listener` REQUIRED, and the four registration instants deliver **after** their repairs), `D-218` (the app registers **after** construction, so the creation's writes are dropped), `D-216`/`D-217` (a render with no event behind it is off-paradigm; the initial render IS the listeners firing on load), `D-92` (a push carries an address), `D-93`/`D-129` (one registration per address), `D-137` (the four-root array is one edit), `D-71` (the handle, and `unlisten`'s whole-withdrawal), `D-70`, `D-98`, `D-82` clause 4, `D-105`, `D-41` (sites), `D-3`, `D-5`. The store's contract is `node_modules/provident-storeroom/README.guide.md` §6 (`:497`–`:567`).
- **Ceiling:** 150 lines, class max (`D-1`) · **Write scope:** `docs/L3/view-record/` · **Status:** structure, signatures, hunks and guardrails — **no function body appears here** (`D-45`); **no name this page declares is on the wire** (§4).

## 1. Why the registration cannot stay where it is — and what the object has to be

- **THE ORDER IS THE WHOLE ARGUMENT.** `createProfileStore` runs the registration instant whose repairs write the four families **before it answers an instance**, and `viewSurface.attach()` runs **after construction** and calls `listen`+`register` — so **the writes are delivered to nobody** (`D-218`, `src/main/main.ts`'s boot order). **`1.11.0` closes the gap upstream only for listeners the construction ADOPTED**, so the registration must exist **before the store does**.
- **AND "BEFORE THE STORE" IS THE CONSTRAINT THAT FIXES THE OBJECT'S SHAPE**, because the store is constructed with `listeners: [...]` **inside the call that creates it**: the entries cannot be built by anything that needs the instance. **The object this module builds is therefore `createViewDelivery(sink)`, and it is TWO HALVES OF ONE THING**: `entries` — the four `cfg.listeners` elements the boot spreads into the construction — and `subscribe(handler)` — the fan-out a later consumer takes (`D-219`, `D-137`).
- **THE LIFECYCLE, IN THREE STEPS AND NO FOURTH**: **(1)** the boot builds the delivery with the crossing's sink, **before** `createProfileStore`; **(2)** the construction adopts `delivery.entries`, so a creation delivery has a destination from the instant a repair writes; **(3)** `createViewRecord({ store, delivery })` is created over the standing instance, and `subscribe` fans out from there. **Nothing in this order needs a mutable slot**, which is why the `storeHolder` idiom the constraint batch uses is **not** the shape here — a null holder would mean *"abstain"*, and a listener that abstains is the defect (`D-219`, `D-81`).
- **AND THE SINK IS THE APP'S, TOTAL AND UNINTERPRETED** (`docs/L3/app-shell/delivery.md` §3): this module hands it the **address the delivery carried** and nothing else — no reading, no family, no formatted value. **A record that handed a value would be the cache `D-92` forbids**, and the consumer's only correct answer to a push is its own re-read (`D-92`, `D-137`).

## 2. The four entries — one per root, and the containment is the entry's

| Address | Handle | Its entry replaces |
|---|---|---|
| `['panes']` (`VIEW_PANES_ADDRESS`, `file`) | `handleFor(address)` | `subscribe`'s loop, third turn |
| `['zones']` (`VIEW_ZONES_ADDRESS`, `mem`) | `handleFor(address)` | `subscribe`'s loop, fourth turn |
| `['theme']` (`VIEW_THEME_ADDRESS`, `file`) | `handleFor(address)` | `subscribe`'s loop, fifth turn |
| `['drag']` (`VIEW_DRAG_ADDRESS`, `temp`) | `handleFor(address)` | `subscribe`'s loop, sixth turn — the `D-137` arm, kept because a root the array omits is a write the renderer never hears |

- **THE BODY IS ONE LINE AND TWO GUARANTEES**: `deliver(address)`, inside `try`/`catch`. **It writes nothing** — a listener body's write opens a commit of its own inside the one that fired it (`guide §6.5` item 1) — **and it contains its own throw**, because at a registration instant an uncontained throw refuses the act at rank `21` `ListenerBodyThrew`, which at the creation means `storeCreate` refuses and the app takes `D-80`'s fatal arm (`guide §6`, `:513`–`:516`, `D-124` item 2).
- **THE ENTRY CARRIES THE ADDRESS AND THE HANDLE AND NEVER A VALUE** — `{ address, handle, listener }`, three own members with the third required; a two-member element is refused `AddressMalformed` (subject `listeners`) **before any filesystem act** (`guide §6`, `:533`–`:560`, `D-219`). **And the package arms the substance**: a `cfg` handle is registered and firing from the instant the instance exists, which is the `listen`+`register` pair done for us — **which is exactly why keeping the module's own pair would be a second registration** (`guide §6`, `:557`; `D-129`).
- **`handleFor` IS KEPT, ITS `issuance` COUNTER IS KEPT, AND ITS INSTANT MOVES**: four handles are minted when the delivery is built, one per address, and **never withdrawn** — so `D-71`'s starvation guard has nothing to guard and the spelling cannot equal a constraint `id` (`view-record:` is a prefix no id of the batch carries, `guide §7.3`).
- **`['drag']` FIRES AT NO REGISTRATION INSTANT AND THAT IS LAWFUL**: nothing is written at `temp` before a gesture, so its adopted listener is the **standing** one the gesture's `commitDrag` and `clearDrag` deliver to. **A row that expected a creation delivery at `['drag']` would be asserting a write no pair performs** (`D-132`, `docs/L3/app-shell/delivery.md` §2).

## 3. `subscribe` after the move — the signature is unmoved and the store act is gone

- **`subscribe(handler: () => void): () => void` STANDS, VERBATIM**, and so does its meaning: **a committed change of any of the four roots calls `handler` once, and the answer withdraws that handler**. **What goes is the two-thirds of its body that was the store's**: no `listen`, no `register`, no `unlisten`, no `handleFor` call, no per-address loop. **Its body is one entry appended to one list and one removal returned** (`D-71`, `D-137`).
- **THE WITHDRAWAL IS NOW LOCAL AND THAT IS THE HONEST SHAPE**: it drops that one handler, is idempotent, and **runs no store verb** — the entry the construction adopted is the instance's for the instance's life, which is the app's life (`D-70`: a member whose only act would be a no-op `unlisten` is a name without a reader).
- **THE ORDER INSIDE THE ENTRY'S BODY IS THE FAN-OUT, THEN THE SINK, AND THE TWO CANNOT DISAGREE**: a subscriber standing hears the delivery first, then the app's sink is called — **on every delivery, armed or not**, so the queue's `held` list and a subscriber's calls are two readings of one event and never two paths through different code. **In the app exactly ONE destination stands** (the sink: `main.ts` registers no subscriber), so no delivery is duplicated; in a battery the sink is the recorder and the fan-out is the assertion (`D-92`, `docs/L3/app-shell/delivery.md` §3).
- **AND `D-71`'s *"a registration that could not stand leaves nothing behind"* LOSES ITS SITE WITHOUT LOSING ITS FORCE**: `storeCreate` either adopts every entry or refuses the construction, and a refused construction is `D-80`'s fatal arm — **there is no half-registration left to withdraw** (`D-71`, `D-80`).
- **THE CONTAINMENT MOVES FROM THE SUBSCRIBER'S BODY TO THE ENTRY'S** (§2): a handler's throw is contained where it always was — at the fan-out — and the entry's own containment is the registration instant's guard. **Two containments, two instants, and neither is a `try` around a store verb** (`D-71`, `D-105`).

## 4. The surface — two members leave, and the option goes with them

- **`ViewSurface` LOSES `attach(): void` AND `detach(): void`, AND `ViewSurfaceOptions` LOSES `onChanged`.** Their subject was *"take the one subscription so the window's teardown can withdraw exactly what it took"*, and **the app no longer takes a subscription there**: the construction took it, the push is the sink's, and nothing calls `detach` under `src/` (`D-70`, `D-219`).
- **THE SEVEN ROUTES ARE UNMOVED AND SO IS THE WIRE**: `read`, `commitPane`, `commitZones`, `commitTheme`, `commitDrag`, `clearDrag` are unchanged in name, argument count, body and channel; `src/shared/view-channels.ts` gains and loses nothing; `src/main/preload.ts`'s `view` block and `src/renderer/secure-panels.ts`'s lockstep half are byte-unmoved — so **the comparison row that holds them member for member still passes** (`D-112`, `D-14`). **`endpoints` stays `7`** (`D-26`, `D-43`).
- **`createViewSurface`'s options become `{ store, delivery }`** and its body passes both to `createViewRecord`, which is the only change inside the surface's own file. **`src/renderer/view-client.ts` GAINS NO BYTE**: it registers on the bridge's `onChanged` route, and that route is main's fan-out and not this registration (`D-89`, `D-137`).

## 5. The hunks, in the order L4 lands them

| # | File · site | The write | Cite |
|---|---|---|---|
| `V-1` | `src/main/view-record/index.ts`, beside `viewDeclaredRoots()` | `createViewDelivery(sink)` and the delivery's two members; `handleFor` reused, minted once per address; the four entries built from the four `VIEW_*_ADDRESS` constants **and from that array, in that order** | §1, §2, `D-137` |
| `V-2` | the same file, `subscribe`'s body | the six `listen`/`register`/`unlisten` statements and the per-address loop **go whole**; `subscribe` becomes the delivery's fan-out; `ViewRecord`'s and `createViewRecord`'s declarations gain the `delivery` this needs | §3 |
| `V-3` | the same file, `createViewRecord`'s options | `{ store, delivery }`; `ViewRecord`'s `subscribe` **keeps its declared text** and its body delegates | §3 |
| `V-4` | `src/main/view-surface/index.ts` | `ViewSurface` loses `attach` and `detach`; `ViewSurfaceOptions` loses `onChanged`; the factory's options gain `delivery` and pass it through. **The six shape arms are byte-unmoved** | §4 |
| `V-5` | the docblocks the landing falsifies, re-grained in place (`D-46`: comments, not `D-n` rows) | `subscribe`'s own block (the two-acts-per-address paragraph and the `unlisten` clause), `createViewRecord`'s *"the subscription is the push's own"*, and the surface's *"the one subscription the push needs"* — each now naming the construction | `D-1`, §1 |
| `V-6` | `src/renderer/view-client.ts`, the header's third bullet | *"a boot's own store acts happened before this realm subscribed and a cold profile changes nothing afterwards — so no delivery exists to carry the first fill"* → **the delivery exists and carries it, because the construction adopted the listener; the reload is the one arrival a read still serves** | §6, `D-219` |

- **`V-6` IS THE ONE HUNK IN THE RENDERER AND IT IS A COMMENT**: no renderer behaviour moves — `fill()` stays, `subscribe` stays, `adopt` stays, and **the delivery's continuation is the one the client already runs** (`D-98`, `D-89`). Its authority is the `D-217` correction read at the file that stated the defect as a design fact.
- **NOT ONE HUNK TOUCHES A CHANNEL, A BRIDGE MEMBER, AN `ipcMain.handle` SITE OR A `src/shared/` FILE** (`D-112`, `D-123`): the seven routes, the seven constants, the lockstep pair, `view-shape.ts`'s vocabulary and the four declared roots are unmoved, and **no `src/` file is created** — `pins`' `srcTypeScriptFiles` and the map's `mapRows` do not move (`D-26`, `D-43`).

## 6. Guardrails for L4

| id | Guardrail | Cite |
|---|---|---|
| `VD-1` | **THE ENTRIES ARE BUILT BEFORE `createProfileStore` AND NOWHERE ELSE**: the boot may not build them after the instance, and this module may not offer a second way to register — one registration per address, and it is the construction's | `D-219`, `D-129`, `D-93` |
| `VD-2` | **NO `listener: () => {}`, NO NO-OP, NO `listeners: []` PASSED BY THE APP**: a function that does nothing satisfies the package's refusal and changes no behaviour, which is a row that cannot fail | `D-219`, `docs/L3/app-shell/delivery.md` `G-1` |
| `VD-3` | **THE ENTRY'S BODY WRITES NOTHING AND CONTAINS ITS OWN THROW**; it hands the address to the sink and returns | `guide §6.5`, `D-124`, `D-80` |
| `VD-4` | **`handleFor` IS NOT INLINED AND THE HANDLE IS NOT RE-SPELLED AT A SECOND SITE**: the entry's handle and the store's are the same string, minted once | `D-71` |
| `VD-5` | **NO `listen`/`register`/`removeListener`/`unlisten` REMAINS IN `src/main/view-record/` OR `src/main/view-surface/`** — a leftover pair is the second registration `D-129` forbids | §3, `D-129` |
| `VD-6` | **NO TIMER, NO POLL, NO RETRY, NO WRITE ON A READ** anywhere this pass touches: the sink is called once per delivery and the consumer re-reads | `D-82` clause 4, `D-92` |
| `VD-7` | **NO ADDRESS IS SPELLED OUTSIDE THIS MODULE**: the entries are built from the four constants, and no consumer — including `main.ts` — names a root to this module | `D-53`, `D-101` |

## 7. The rows that move, with their files and their owners

| Row | Its file | What moves |
|---|---|---|
| its `record.subscribe` rows and its *"and the push is attached where the tab record's is"* assertion (`main.includes('viewSurface.attach()')`) | `tests/integration/store-view-record/crossing.test.ts` | the SETUP gains the delivery and its `entries`; the `attach()`/`detach()` subjects leave with the members; **the delivery assertions themselves stand** |
| its `record.subscribe` rows and `surface.attach()`/`surface.detach()` | `tests/integration/store-view-record/zone-family.test.ts` | the same setup, the same two members |
| its two `record.subscribe` rows | `tests/integration/store-view-record/theme-family.test.ts` | the setup only |
| the surface block's `attach`/`detach` and the rev token | `docs/L3/store-tabs-record/signatures.md` is **`store-tabs-record`'s**; this module's `signatures.md` **does not exist** | nothing here — `ViewRecord`'s `subscribe` text is unmoved, so this page declares no signature block of its own |

- **AND THE ONE ROW THAT MUST BE RE-READ RATHER THAN RE-GRAINED**: `crossing.test.ts`'s unpaired-root control (`D-145`) asserts the `temp` family's absence of a pair, of a boot datum and of any `drag` byte in the profile — **all three still hold**, and `['drag']`'s entry now exists as a standing listener, which the row does not measure. **The next pass adds the assertion rather than changing this one** (`D-152`'s precedent: assert the widened reading, never satisfy it by a rename).
- **`central-data`'s published-roots row is unmoved** (`declared-root.test.ts`'s `D-1`): this pass adds no root, moves no tier and adds no declaration (`D-101`, `D-43`).

## 8. What must move on `design.md`, which is at its ceiling

- **`design.md` §3's second bullet — *"`subscribe`'s array gained `VIEW_DRAG_ADDRESS` WITH the constants"* — and §7's bullet 83 (*"`subscribe`'s array: the loop's literal gains a fourth address"*) both describe a loop this pass deletes.** They are **the two sentences a reader would otherwise use to reconstruct the defect**, and they are **falsified by `V-2`**, so they must be re-grained at that page's next pass. **They were not edited here**: the page is at `150/150` and `D-2` forbids an append, so the whole page must be REPLACED — and when it is, §7's `H10`–`H17` (rev 13's pane hunks) and §2's placeholder values need re-reading first, because **no `src/` byte has moved for them yet** (`D-3`, `D-145`).
- **AND §6's *"the delivery that carries a signal and no value — now over every root this module declares"* STANDS**: it is the one sentence this page strengthens rather than falsifies, and it now holds at the construction as well as after it (`D-137`).
