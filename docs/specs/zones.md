# Spec — `U-ZONES`: the pure track-token mechanism (`SCH-4`'s mechanism half, architect ruling A-d4)

Status: **SPEC — FILED 2026-09-27** (wave **E**, unit **`U-ZONES`**, the **mechanism half of `SCH-4`**
per architect ruling **A-d4**). **This filing pass writes no code and runs no red set.** No module
exists, no test file exists, **no leg, no trio, no `npm run ui` and no Electron window ran in this
pass**, and **no result is recorded anywhere in this file**. **The gate-11 typed Property register is
part of this filing** — it is `§5.5.1` below (**8 rows**, seed `20260927`, caps `≤100`/row · `≤400`
total · stop-after-5, **no new dependency**), and **this unit is CODE-BEARING**, so **no zero-row
exemption is available** (`docs/decisions.md` `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, ACTIVE).

**⟶ FIRST STATUS NOTE — 2026-09-27, THE SPEC-GATE CLOSURE PASS (the supervisor's gate-2 check; a STATUS + ARITHMETIC note, and it amends ONE figure and no clause).** **What it found, and it is the exact defect this repo's newest ACTIVE rule names:** the filing printed the register total as **`400` = `30+90+36+68+52+12+15+66`**, whose true sum is **`369`** — a **mis-sum**, caught by the gate-2 arithmetic check **before any red set was authored** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **What changed: the TOTAL only** — `369` is now the declared total at `§5.5`'s banner, `§5.5.1`'s total row, `§5.3` item 10, `§7`'s honest statement and the red-run sentence in `§4.2`, with the as-filed `400` **kept visible at every site** and the correction dated. **NO per-row term moved, no row's design, id, strategy or marking changed, and no clause was weakened** — the caps are `≤100`/row (max declared `90`) and `≤400` total (`369`, now **under** the cap rather than at it). **What this note does NOT do:** it rules no new clause, moves no section number, renumbers nothing, adds no `§5.4`, and answers no `§7a` item (all six remain ruled as filed). **The delegation gate is UNCHANGED and STILL CLOSED:** the red set is the next step (`AGENTS.md` item 9 — red RUN and REPORTED before any implementation). **And the honest lesson, recorded because the class keeps recurring:** the register arithmetic has now been caught wrong at the filing pass in **three sibling units in a row** (`U-LISTHOST` `157`→`168`, `U-PROJ` `239`→`231`, `U-ZONES` `400`→`369`) — **a spec-writer pass that prints a total must print it as the SUM OF ITS OWN TERMS and verify the addition before filing**; the rule exists, and this note is its third worked example.

**⟶ SECOND STATUS NOTE — 2026-09-27, THE RED-RUN REGISTER-RECONCILIATION PASS (a STATUS + CELL-CORRECTION note; it corrects register and clause TEXT and amends NO row's id, type, strategy id or attempt term).** **What the red run produced, as RUN and REPORTED:** `tests/zones.test.ts` is authored and has **RUN** — **`57` rows · `50` red / `7` pass** — and **the `§5.5.1` register STOPPED EARLY at `P-ZN-IM-1` after `5` of its `30` attempts, with `0` held** (the stop-after-5-consecutive-failures rule of `§5.5.1` strategy item 3, doing exactly what it is written to do for a module-absent unit: the **seven** un-run register rows are REPORTED AS FAILURES, never omitted). **The module `src/shared/zones.ts` still does not exist** (`R-8`'s premise holds; confirmed by glob this pass), so **the unit is NOT green, NOT `DONE` and still NOT delegable**. **What the TestWriter reported it could NOT derive an unambiguous falsifiable row from: SIX clauses** — and **FOUR of them were defects in THIS register/clause text, i.e. exactly the class the red run exists to catch.** **What this pass therefore did:** it **ruled four cell defects** (the `P-ZN-TP-1` decomposition; the `P-ZN-SM-1` sweep term; the `P-ZN-TP-2` pool-versus-boundary contradiction; the `§2.3` item 1 limb-order-versus-`F-1` precedence), **and it reconciled two further figures the red set contradicted** (the `R-1` literal-scan scope — a wording HAZARD, not a register defect — and the `§4.1` red statement's predicted shape). **Every correction is an ANNOTATION: the as-filed wording stays visible beside each dated `⟶ CORRECTED 2026-09-27 …` banner, no section number moved, nothing was renumbered, no `§5.4` was created, no line-count census appears anywhere, and NO clause was weakened to make a test pass.** **NO row id, type, `S-ZN-*` strategy id or attempt term changed, and the register total is UNCHANGED at `369` = `30+90+36+68+52+12+15+66`** — the four rulings are all inside the declared terms (see the pass record at `§5.5.1`). **THE LESSON, recorded because it is the whole reason this pass exists:** *a register cell whose parts do not visibly add to its declared term, or whose pool contradicts its own boundary, is a defect the RED RUN catches — design cells so the derivation is PRINTED, and check EVERY pool member against the row's boundary text.* **What this note does NOT do:** it re-opens no `§7a`/`§7a.1` item (all six stay ruled as filed), moves no export census (`3` names), touches no `§5.2` leg, changes no `§5.3` item, and advances no unit status.

**Go-ahead state — stated plainly: this unit is `BLOCKED` on two things only — the architect's
go-ahead for the wave-E plan and its own red set.** *(The wave-D go-ahead was given 2026-09-27 and is
**spent**; wave **E** is authorised by no ruling currently on the record, so this unit's red set may
not be RUN and it may not be delegated — `AGENTS.md` item 9.)* **Status of its red set:
`RED SET OWED — NOT AUTHORED, NOT RUN`** (RCA-1). **⟶ AMENDED ON THE RED-SET HALF ONLY, 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass; the as-filed status line is kept visible above): the red set IS authored and HAS RUN — `tests/zones.test.ts`, `57` rows · `50` red / `7` pass, the register stopping at `P-ZN-IM-1` after `5` attempts with `0` held — and this pass reconciled the register cells its run surfaced (the SECOND STATUS NOTE above, `§5.5.1`). The GO-AHEAD half is UNCHANGED: wave E is still authorised by no ruling on the record, and the unit is still NOT delegable and NOT green.** **Ordering obligation from its queue row:** it is
the **FIRST** unit of wave **E** and the **NEXT** unit in the order
(`docs/next-steps.md`'s `## OPEN` row **`E1`**, cited by row id, never by line); its **declared leg is
the node suite** and **`U-CENSUS` (row `E2`) DEPENDS ON THIS ONE** (§1 item 6).

**Source of this unit, cited by SECTION (never by line):** the appended
**`Amendment record (A-d4…A-d8)`** of `docs/specs/provident-electron-shell-chrome-handoff-review.md` —
**§0** (the supervisor adjudication: A-d4 stands and the re-decline is adjudicated away), **§1.1**
(`U-ZONES ← SCH-4`, contract-exact: `TrackSpec { trackProp, unit, emptyToken }` all caller-supplied;
`isEmpty(census, zoneId)`; `trackFor(spec, size, empty)`; **the literal `'0px'` is NOT built in**; no
DOM, no registry, no writes; **non-finite/negative ⇒ the empty token**), **§1.2** (`U-CENSUS` —
**delegating token formatting to `U-ZONES`, one authority, not two**), **§1.3**/**§1.5** and the
**geometry clause** (*"the arithmetic is provable here; any claim about the rendered geometry is
UNPROVABLE in this repo today"*), **§2.1**/**§2.2** (the count identity and the governing `SCH-4`
row: **ADOPTED-RESHAPED, the pre-A-d4 re-decline ADJUDICATED AWAY**), **§3** (wave **E**, and the
checkpoint rule: *"the geometry family's criteria are UNPROVABLE in this repo today (node layer
asserts contracts/arithmetic only) — say so in every affected spec"*), **§5** (the **geometry
family's equivalence limit**), **§6** (`RK-19`: a later pass may "prove" geometry from a node-green —
the recurring false-green class), **§8**; `docs/decisions.md`'s ACTIVE row
**`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (which restates A-d4 contract-exact, **`isEmpty(census,
zoneId)`** included); `docs/pending.md` **§A**'s `SCH-4` rows (**the A-d1-layer decline with reason
`APP-DATA-NOT-MECHANISM`** — *"its real input is a pane census (app data) and its real content is the
consumer's CSS"* — and **§B**'s panes/zones-family row, **ADOPTED-RESHAPED, reason code
`ADOPTED-BY-ARCHITECT-RULING`**, with the family's mandatory clauses); `docs/next-steps.md`'s
`## OPEN` rows **`E1`**/**`E2`**; `H-r4` (this unit's spec owes **`H-r8`'s `§0 Contract-prohibitions`
block**, landed here as `§2.2`); `H-r8`/`S-d8` (the six prohibitions); `H-r17` (*"a dashboard/toolbar
use case changes NO zone/track contract … **with no zone vocabulary anywhere**"*); and
**`docs/specs/projection.md`** (`U-PROJ`, the sibling that landed) as the **format and register
template** this file imitates.

---

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

**These are recorded as binding and are NOT re-opened by this filing.** Where a ruling's own words
say `isEmpty(census, zoneId)` and the queue row's shortened cell says `isEmpty`, **this spec obeys the
ruling's words** and states the ruling in `§0A` (`A-4` below, `§0A` note 1).

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`A-d4` — the panes/zones family is IN SCOPE, and `SCH-4` → `U-ZONES` is ADOPTED-RESHAPED.** *"SCH-4/6/7/10 — I don't care, build the damn panes/zones framework. Everything that this project will get used for is going to have static UI elements."* **The pre-A-d4 decline (`APP-DATA-NOT-MECHANISM`) and the A-d5…A-d8 architecture pass's re-decline are BOTH adjudicated away** (they read the **landed** pre-A-d4 rows; A-d4 is the architect's explicit ruling — gate record **§0**). **The decline's REASONS survive as the contract's shape**, not as decline reasons: **the census is INJECTED, never this unit's state, and NO CSS ships** (§1 items 2/3, §2.2). | §1, §2.2, `§0A` note 1 |
| **2** | **The A-d4-ruled contract, contract-exact:** `TrackSpec { trackProp, unit, emptyToken }` **all three caller-supplied/opaque**; `isEmpty(census, zoneId)`; `trackFor(spec, size, empty)`; **the literal `'0px'` is NOT built in**; **no DOM, no registry, no writes**; **non-finite/negative ⇒ the empty token**. | §2.1, §2.3, §2.4 |
| **3** | **The prohibition rows `U-ZONES` must carry (`H-r8`):** no zone/pane/tab vocabulary **as a symbol, union member, default or documented constant** (`(C)#1`); **no CSS authoring** (`(C)#2`); **the `:has()` rules + the collapse-override declaration stay consumer-side**. | §2.2 (the six-row table), §7 item 3 |
| **4** | **`U-PROJ`'s §0 ruling 5, quoted because it names this unit: *"the token-formatting authority is `U-ZONES` for the census family … (one authority, not two)"***, and **`U-CENSUS` (row `E2`) therefore DEPENDS ON THIS ONE**. **`U-PROJ` may not import this module**; **this module may not import `U-PROJ`** — and, more generally, **no import at all** (§2.2 prohibition 6). | §1 item 6, §2.1, §2.2 (P-6), §8 |
| **5** | **`H-r17`'s consequence:** *"A dashboard/toolbar use case changes NO zone/track contract: `U-PROJ` still takes an injected write sink and consumer-supplied variable names/units … **with no zone vocabulary anywhere**."* **This unit is the one that OWNS the token arithmetic, and it still may not carry a vocabulary literal** — every value it uses is an argument. | §2.2 (P-1), §7 item 4 |
| **6** | **The geometry clause (A-d4's mandatory wording, which must appear wherever geometry criteria are described):** *"the arithmetic is provable here; **any claim about the rendered geometry is UNPROVABLE in this repo today** — it belongs to the `ui` leg's business and to no node-green."* | §2.3 item 7, §3.4 (the geometry row), §5.2 (no `[U]` row offered), §7 item 6 |
| **7** | **`A-d1`/`S-d8`'s admission rule applies with clause (C)'s six prohibitions.** `U-ZONES` is admissible under **(B)** (a pure transition whose **every** environment reading — here, literally every input — is an injected argument) and is judged under **(C)'s six prohibitions**, which §2.2 asserts. | §2.2, §5.1 |
| **8** | **No new MCP surface, no store, no persistence, no CSP change, no shim change.** `ALL_TOOLS` stays **21**, `RpcMethod` stays **21**, `MUTATING_METHODS` stays **7**, `VALID_GROUPS` keeps its five members; **`src/shared/dom-shim.ts` gains no member** (`H-r5`). | §2.2 (P-4/P-5), §5.1 |
| **9** | **`A-d2` (the engine pin) is SPENT and is NOT this unit's dependency** — `provident-ssr` is at `^0.5.1` and `U-ENGINE-PIN`/`U-ENGINE-DRIFT` are `DONE`; this module imports **no** engine surface at all. | §1 item 7 |
| **10** | **`A-d3`/`S-d9` (the node-local interaction rule) and the adopted `U-GSESSION` session are NOT this unit's dependency.** `U-ZONES` is a **pure arithmetic module**: it installs no listener, owns no element, opens no gesture, and takes no event source. **No dependency edge exists** (`U-GUTTER` composes the session; **this unit does not**). | §1 item 7, §7 item 8 |
| **11** | **`A-d7`'s static-UI reading and `A-d8`'s `ui` leg**: **`AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED**, and **a mechanism is outside that constraint because it is not a UI element**. This unit authors **no text, no control, no affordance, no class, no token value and no styling** — **every string it emits is an argument it was handed** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`). | §2.2 (P-2), §7 item 5 |
| **12** | **The go-ahead for wave E does not exist yet, and within wave E this unit lands FIRST.** **This unit is `BLOCKED` on that go-ahead and on its own red set** (its `## OPEN` row `E1` stays `BLOCKED` until both hold). **No unit of wave E precedes it, so it has no ordering precondition.** | this status block, §4.5, §7 item 1 |

### 0A. The dated ruling notes — **the clauses the ledger leaves open, RULED here (2026-09-27)**

**What this section is, and what it is not.** The ledger/A-d4 text is **contract-exact** about the
**export set** (`isEmpty`, `trackFor`, `TrackSpec`) and about the **binding negatives**; it is
**silent** about several clauses a TestWriter must have before it can author a falsifiable row. **This
filing DECIDES each of those clauses and records the decision here**, with the clause it lands in and
the reason. **A decision recorded here is a RULING of this filing, not a reading** — and **every one
of them is falsifiable**, which is the standard `§7a` must meet. **No decision here adds an export, a
parameter, an optional field or a literal**, and **none weakens a binding negative**; where a new
field was *considered* it is **DECLINED**, and the decline is recorded.

**Ruling note 1 — the `isEmpty` signature is `isEmpty(census, zoneId)`, TWO arguments and TWO
parameters.** `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `Amendment record
(A-d4…A-d8)` **§1.1** and `docs/decisions.md`'s `SHELL-CHROME-PANES-ZONES-IN-SCOPE` **both write
`isEmpty(census, zoneId)`**; the `docs/next-steps.md` `E1` cell's bare `isEmpty`, and the same file's
`E2` cell's `computeTrackVars(zones, census, sizes, revealed, specOf)` (which threads a caller
`census`), are **shorter forms of the same ruling, not a different contract**. **The ruling's words
govern.** Landing: **§2.1** (the exact declaration), **`§3.1 M-1`**, **`§3.2 F-2`**, **`§3.3 I-7`**,
**`§7a` item 1**.

**Ruling note 2 — `trackProp` is the EMITTED property NAME and nothing else; it is never a key into
the census and never a key into any container.** This is the clause that keeps prohibition 1 clean
while the mechanism still *formats a property name*: the name is **caller data**, so **no vocabulary
literal exists in the module** — the module carries the string, it does not know any string. The
**census lookup key is `zoneId`**, and **the two are separate parameters with separate jobs** (a
caller is free to pass a `trackProp` that is unrelated to the `zoneId` it asks about, and the
mechanism must not care). Landing: **§2.1** (`TrackSpec.trackProp`'s doc comment), **§2.3 item 1**,
**`§3.3 I-4`**, **`§7a` item 2**.

**Ruling note 3 — the census is read as ONE shape, with ONE explicitly supported non-record shape:
an own-property read on a record, plus `Map.get` for a `Map`.** The alternatives were weighed and
recorded: **(a) an ARRAY is NOT a supported census shape** — an index read would silently give a
*different* meaning to the same `zoneId` (an array's own `'0'` index versus a map key of `'0'`), which
is exactly the "second authority over emptiness" hazard validity finding `V-13` names, so an array
**counts as a non-record** (no own string key ⇒ `false`); **(b) a `Set` is NOT supported** (a `Set` has
no key→count association to read, and inventing one — membership ⇒ non-empty — would be **this
mechanism inventing a policy**); **(c) `Map` IS supported**, because the ruling's own `U-CENSUS` cell
passes a caller `census` through to this module and a `Map` is the ordinary "no vocabulary" shape for
it. **The rule is total either way** — an unsupported shape yields `false`, never a throw. Landing:
**§2.3 item 2**, **`§3.2 F-3`/`F-4`**, **`§5.5.1 P-ZN-IM-3`**, **`§7a` item 3**.

**Ruling note 4 — `-0` is NOT an empty case: it emits `"0<unit>"`.** The ledger's rule is
*"non-finite/negative ⇒ the empty token"*. `-0` is **finite** (`Number.isFinite(-0)`) and is **not
negative** (`-0 < 0` is `false`), so neither limb fires, and `String(-0)` is `'0'`. **The alternative
reading (treat `-0` as negative, because `Object.is(-0, -1 * 0)`-style tests can see the sign) is
DECLINED**: it would require the module to invent a sign-detection rule the ledger does not name, and
it would make a **legitimate zero size** (a zero-width track that is not "empty") unrepresentable.
Landing: **§2.3 item 1 clause (a)**, **`§3.1 M-6`**, **`§5.5.1 P-ZN-IM-2`**, **`§7a` item 4**.

**Ruling note 5 — NO refusal domain exists, and NO `format` discriminator is added.** *(a) The refusal
domain:* this is **pure arithmetic over caller-supplied values**, and the ledger names **no** typed
refusal, **no** skip reason and **no** error code for it. **`U-ZONES` therefore has no union, no
`code` field and no skip vocabulary, and every outcome is a VALUE** — `trackFor` returns the empty
token where another unit would record a refusal, and `isEmpty` returns a boolean. **A later pass that
adds a refusal union is adding a contract and needs its own gate.** *(b) The `format` discriminator:*
`U-PROJ`'s `VarSpec.format?: 'unit' | 'number'` was **considered and is DECLINED here**, on three
grounds: **`TrackSpec`'s three-field shape is contract-exact in the ruling** (adding a field edits a
pinned shape); **an optional field IS a baked-in default** (the prohibition-3 hazard `U-PROJ`'s own
`§4.4 S-8` names — *"`unit` is caller data; `''` is the caller's explicit 'no unit'"*, which is how
this unit represents the bare-number form **without** a discriminator); and **it would create a second
token-formatting authority** in the panes/zones family, the exact class ruling 4 exists to close. **A
future consumer that needs a bare-number form passes `unit: ''`** — which is caller data, and is
pinned as a row. Landing: **§2.4 item 1** (`''` is the bare-number form), **`§3.2 F-6`**
(`unit: ''`), **§7 item 7 (i)**, **`§7a` item 5**.

**Ruling note 6 — the geometry boundary is THIS unit's own clause, not an inherited sentence.** *The
arithmetic is provable here; **any claim about the rendered geometry is UNPROVABLE in this repo
today**.* Concretely: **`trackFor` returns a STRING; whether a browser accepts it, applies it, or
paints anything is not this unit's claim, is not the node suite's claim, and is not `npm run ui`'s
claim unless a `ui` row is taken with its own preconditions** — and **this spec offers no `[U]` row**
(§5.2). **A later pass may not read `M-*` rows as geometry evidence** (`RK-19`'s false-green class).
Landing: **§2.3 item 7**, **`§3.4 R-7`** (the geometry row), **§5.2**, **§7 item 6**, **§3a `A-14`**.

**No new ruling is asked of the architect by this filing.** Every clause the ledger leaves open is
decided above, with its reason, its landing site and its falsifying row; **`§7a`'s list is therefore
EMPTY after `§7a.1`'s rulings** (`§7a` items 1–6 are all decided here, and none is left open).

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **not offered by this spec** (§5.2) |

**Four honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No
   window is booted, no IPC round-trip runs, no MCP transport is exercised, and no real DOM is
   touched.**
2. **This unit touches no DOM at all, not even the shim.** Its rows need **no element, no document and
   no shim**: every input is an argument (`TrackSpec`, a size, a census value, a zone value). **A
   `[T]` green here proves ARITHMETIC and DECISION only.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`,
   no `globalThis`-rooted lookup, no `matchMedia`, no `getComputedStyle`, no `activeElement`, no
   `Date`, no `Math.random`, no `process.env`. It is admissible under **(B)** (a pure transition whose
   every environment reading is an injected argument) and is judged under **(C)'s six prohibitions**,
   which `§2.2` asserts. **The container/census/spec are all arguments; there is nothing else to
   read.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.**
   Its rows are authored in **this unit's own test file** and executed by the **same node suite**
   (`npm test`, `§5.2` leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and
   **no register row may be read as `[H]`, `[U]` or assembled-app evidence.** No register row depends
   on any real-DOM observation, and **the layer never blocks a register row here**: every claim in
   this file is arithmetic over arguments.

---

## 1. Scope

**One deliverable: two pure functions and one interface, in one `src/shared` module** — total token
arithmetic over **caller-supplied values only**.

1. **What the unit is, in one sentence.** A **pure** mechanism that (a) answers *"is this zone empty,
   according to the census I was handed?"* and (b) renders *(a caller's spec × a size × an empty flag)*
   into **the exact track token string the caller's spec prescribes** — computing nothing the caller
   did not supply and writing nothing anywhere.
2. **What it is NOT — the census is INJECTED, never this unit's state.** This unit **owns no census,
   no zone set, no registry, no default and no count**: the census arrives as the **first argument of
   `isEmpty`** and is **read, never stored, never mutated**. **`U-CENSUS`** (row `E2`) owns the
   key-set-`zones` census rule, the `revealed` decision and the never-mutate row; **`U-ZONES` owns
   token arithmetic over caller-supplied values only** (§0 ruling 1's surviving shape).
3. **What it is NOT — no CSS is shipped, in any form.** The `:has()` rules and the collapse-override
   declaration that `SCH-4`'s original request bundled **stay consumer-side** (§0 ruling 3). This unit
   emits **a string per call**; it ships **no stylesheet, no rule, no declaration, no class name and
   no literal** — **not even the `'0px'` form the ledger names**, which is the caller's `emptyToken`.
4. **What it is NOT — no DOM, no registry, no writes.** No element is read or written; no global is
   touched; no module-level mutable state exists; `isEmpty` and `trackFor` both leave **every argument
   byte-identical** (`I-6`).
5. **What the unit may land.** The module + its red/green rows + the register rows + this spec. **No
   host change**: this unit adds pure code and touches **no existing file** except this spec and the
   trackers (§5.1).
6. **The `U-CENSUS` boundary, stated as the delegate contract (this unit is the delegate).**
   `U-CENSUS` (row `E2`, `docs/specs/census.md` — **OWED, not filed**) is a **separate unit** that
   **DEPENDS ON THIS ONE** and **delegates token formatting here**. Its own ledger contract is
   `computeTrackVars(zones, census, sizes, revealed, specOf)`, and **what it may call is exactly this
   module's three exported names** — `isEmpty(census, zoneId)` for the emptiness decision and
   `trackFor(spec, size, empty)` for the token text (§2.1's delegate clause). **This spec is usable as
   that delegate, and `U-CENSUS` may not re-implement either function** (one authority over tokens,
   not two — ruling 4; validity finding `V-13`'s anti-second-authority remedy). **`U-CENSUS`'s own
   rows are its own spec's**; **no census row, no `revealed` row and no key-set-`zones` row belongs
   here** (`§4.3`).
7. **Two dependencies EXPLICITLY ABSENT, recorded so a later pass does not assume them.** **(a)** The
   engine pin (`A-d2`) is **SPENT** — this module imports nothing, not even a type, from the engine.
   **(b)** The adopted node-local interaction session **`U-GSESSION`** (`A-d3`/`S-d9`) is **NOT a
   dependency of this unit** and this unit **installs no listener, owns no element and takes no event
   source**: *"unless you find one"* — **this filing finds none, and states that plainly.** A
   dependency asserted later would be a **fabricated edge** (`H-r6`'s dissolved-edge class).
8. **What is EXPLICITLY OUT of scope (do not do in this unit).** No `computeTrackVars`, no `zones`
   parameter, no `sizes`, no `revealed`, no `specOf`-as-a-map, no key-set rule, no census-mutation row
   (that is `U-CENSUS`). No **`orderOf`** (dissolved by `H-r6`, and any contract needing it takes it
   as **its own injected parameter**). No gutter/relocate/container/theme/session/list-host/slot-host
   behaviour (`U-GUTTER`, `U-RELOCATE`, `U-CONTAINER`, `U-THEME`, `U-GSESSION`, `U-LISTHOST`,
   `U-SLOTHOST`). No mount cardinality (`U-MOUNTGUARD`). No projection or applier (`U-PROJ`) — **this
   unit formats a token string; it does not build a write map and it does not write**. No import from
   `src/main/**`, `src/renderer/**`, or a sibling mechanism module. No new MCP surface. No shim
   change. No `docs/skills/designing-pages.md` update — **no such file exists** (globbed
   `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
   matrix and no demo-page index to update**, and **this unit renders no page**.

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/zones.ts`** (a pure `src/shared` module) — **(⟶ NAME DECIDED, `§7a` item
6): the path is `src/shared/zones.ts`**, matching the sibling convention (`layout-projection.ts`,
`slot-host.ts`, `owned-list-host.ts`) and the unit's own name.

**EXPORT CENSUS — stated before the block, and it must AGREE with the block: THREE exported names,
in TWO halves — TWO value exports (`isEmpty`, `trackFor`) and ONE type declaration (`TrackSpec`).**
**The two halves are counted separately on purpose**, because the sibling `U-PROJ` review found a
spec cell that said *"eight exports"* while its own block declared **eleven** names — **a count that
does not match the block beside it is a review finding.** **This block declares exactly `2 + 1 = 3`
exported names and nothing else**, and `§3.4 R-5` is the row that pins the SET (not the count). **⟶ CORRECTED 2026-09-27 (the blind-greens pass, finding `ZN-G-67`; the as-written sentence is kept above): the block below carries a FOURTH `export`-prefixed line, `export type ZoneCensus`, and this sentence read as if the block held three. THE RECONCILED READING, and it is the one the module and `R-5` already implement: **the MODULE'S EXPORTED SURFACE is exactly THREE names — the two value exports `isEmpty`/`trackFor` and the type declaration `TrackSpec` — while `ZoneCensus` is a DOC-LEVEL ALIAS inside this spec's illustrative listing** (it names the census shapes `§0A` note 3's ruling accepts, and the module does not export it). **`R-5`(a) asserts the runtime set by NAME and `R-5`(b) asserts the type through leg 4; NO row asserts the alias, and NO pass may add an export to the module to make this listing agree.** The census sentence's “and nothing else” therefore binds the **module's** surface, not every `export`-prefixed line in the illustrative block.

```ts
/** THE CALLER'S SPEC FOR ONE TRACK. ALL THREE FIELDS ARE CALLER-SUPPLIED DATA.
 *  The mechanism has no built-in property name, no built-in unit, no built-in
 *  empty token, no default for any of the three, and no knowledge of what any
 *  of them mean. */
export interface TrackSpec {
  /** The property NAME the emitted token belongs to. It is carried, NEVER
   *  interpreted, NEVER validated, NEVER normalized and — the clause that
   *  keeps prohibition 1 clean — NEVER used as a key into the census: the
   *  census lookup key is `zoneId`, a SEPARATE parameter of `isEmpty`
   *  (§2.1's two-jobs clause, §0A note 2). Any string; no CSS-spelling
   *  requirement and no denylist. */
  readonly trackProp: string
  /** The caller's unit token, appended VERBATIM to the emitted numeric text.
   *  `''` is VALID and is the documented BARE-NUMBER form (it emits the numeric
   *  text alone). REQUIRED — never defaulted to a literal, never inferred. */
  readonly unit: string
  /** The exact token to emit for an EMPTY track. Emitted VERBATIM, byte for
   *  byte: never trimmed, never case-folded, never prefixed or suffixed, never
   *  replaced by a mechanism literal. The mechanism does NOT know this is
   *  "0px" — or anything else (§2.4 item 2). */
  readonly emptyToken: string
}

/** The caller's census — an OPAQUE value. Read as an own-property lookup on a
 *  record, plus `Map.get` for a `Map`; every other shape is a non-record and
 *  answers `false` (§2.3 item 2, §3.2 F-3/F-4). NEVER stored, NEVER mutated. */
export type ZoneCensus = Readonly<Record<string, unknown>> | ReadonlyMap<unknown, unknown> | unknown

// ⟶ THE EXPORT CENSUS, CLARIFIED 2026-09-27 (the blind-greens pass, finding `ZN-G-67`
// — an internal inconsistency this filing introduced): the block ABOVE is the spec's
// ILLUSTRATIVE surface listing, and it carries FOUR `export`-prefixed names. The
// MODULE exports **THREE**: the two value exports (`isEmpty`, `trackFor`) and the
// type declaration `TrackSpec`. **`ZoneCensus` is a DOC-LEVEL ALIAS and is NOT part
// of the module's exported surface** — it is written here (and only here) to state
// which census shapes §2.3 item 2 accepts, because `§0A` note 3's ruling needs a
// name for them. `R-5` asserts the runtime surface by SET EQUALITY over the two
// values (and `TrackSpec` through leg 4), so no row was ever asserting the alias;
// the census sentence that read *"exactly `2 + 1 = 3` exported names and nothing
// else"* is the one that was loose, and it is corrected at §2.1's census paragraph
// below. A later pass must NOT add `ZoneCensus` to the module to make the listing
// agree — the module's three names are the contract (`R-5`, and the sibling units'
// export-count reconciliations).

/** Is this zone EMPTY, according to the census I was handed?
 *  TOTAL: returns a boolean for EVERY input, never throws, reads nothing but
 *  its two arguments, mutates nothing.
 *  ⟶ THE SIGNATURE IS `isEmpty(census, zoneId)`, TWO ARGUMENTS — the ruling's
 *  own words (§0A note 1). TRUE iff the census is a record owning a key equal
 *  to `zoneId` whose own value is EXACTLY the number 0; FALSE for every other
 *  input, including an ABSENT zone, a non-string `zoneId`, a non-record
 *  census, an unreadable value, a `-0` value, `NaN`, and any non-zero number. */
export function isEmpty(census: unknown, zoneId: unknown): boolean

/** Render the track token for one spec, one size and one emptiness flag.
 *  TOTAL: returns a string for EVERY input, never throws, reads nothing but
 *  its three arguments, mutates nothing.
 *  THE EMITTED TOKEN, in full (§2.4):
 *    - `empty` is TRUTHY (`Boolean(empty) === true`)        ⇒ `spec.emptyToken`
 *    - `size` is not a finite non-negative number           ⇒ `spec.emptyToken`
 *      (`NaN`, `±Infinity`, a negative number, a numeric string, a BigInt,
 *       a Symbol, a function, `null`, `undefined`, an object)
 *    - otherwise                                            ⇒ `String(size) + spec.unit`
 *      (`-0` lands HERE and emits `'0' + unit` — `§0A` note 4)
 *    - a MALFORMED spec (not a usable record; a field unreadable or not a
 *      string) ⇒ `''` — the degenerate EMPTY STRING, never a throw, never a
 *      mechanism literal (§2.4 item 3, §3.2 F-1)
 *  ⟶ THE LIMB PRECEDENCE (CORRECTED 2026-09-27, the RED-RUN REGISTER-
 *  RECONCILIATION pass; the bullet list above is kept as filed and this line is
 *  the precedence that governs it): THE MALFORMED-SPEC RULE IS EVALUATED FIRST
 *  and it GATES the other three — for a spec that is not a usable record, or
 *  whose field is unreadable or is not a string, the answer is `''` whatever
 *  `empty` and `size` are; **the `empty` flag reaches a limb only for a
 *  WELL-FORMED spec** (§2.3 item 1's dated precedence note, `F-1`, `I-1`).
 *  The third parameter `empty` is the caller's INJECTED decision — the caller
 *  takes it from `isEmpty(census, zoneId)` or decides it itself; the mechanism
 *  NEVER calls `isEmpty` itself. */
export function trackFor(spec: unknown, size: unknown, empty?: unknown): string
```

**The delegate clause, stated exactly (what `U-CENSUS` will call and what it gets back).** `U-CENSUS`
may call **`isEmpty(census, zoneId) → boolean`** and **`trackFor(spec, size, empty) → string`**, and
**those two calls are the whole of the delegate surface.** It receives **a boolean** and **a string** —
**no wrapper object, no result record, no `ok`, no `code`, no `skipped`, no array and no `null`**. The
emitted string is **already complete**: `U-CENSUS` must **not** append a unit, a `'+'`, a `calc(...)`
wrapper or a separator to it, and must **not** pass a size it pre-scaled in a way its own spec does
not name. **The emptiness DECISION reaches `trackFor` only through the `empty` argument** — the
mechanism never calls `isEmpty` for a caller. **`U-CENSUS` may not import any other name from this
module**: there are none (§3.4 `R-5`).

**The `TrackSpec` shape is contract-exact and admits NO new field.** The optional fourth field
considered for a bare-number form was **DECLINED** (`§0A` note 5(b)); the bare-number form is
**`unit: ''`** (`F-6`). **A later pass that adds a field to `TrackSpec` is editing the A-d4-ruled
shape and needs its own gate.**

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain — **the `H-r8` SIX-PROHIBITION TABLE**

**Caller-supplied (never built in, never defaulted, never enumerated):** the property name
(`trackProp`); the unit token (`unit`); the empty token (`emptyToken`); the size; the emptiness flag;
the census; and the zone key (`zoneId`). **The module contains NO application string, NO default, NO
union member, NO `code` field, and NO literal beyond its own contract.** **The one literal the module
is *permitted* is the degenerate empty string `''` for a malformed spec (`F-1`) — and this spec states
the reason it is not a vocabulary: it is the ABSENCE of a token, it names nothing, and it cannot be
mistaken for a caller value because a caller's own `emptyToken` and `unit` are used verbatim everywhere
else.**

**The `H-r8` six prohibitions — one row each, with the row that enforces it (this is the per-unit
`§0 Contract-prohibitions` block `H-r4`/`H-r8` require):**

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No consumer vocabulary** — no zone/pane/tab/region/dashboard name, no closed union member, no documented default, no documented constant, **and no `'0px'`/`'fit-content'` literal** | Every string the module ever emits is an **argument** it was handed; the module carries **no** vocabulary literal, **no** union, **no** `code` field and **no** default. `trackProp`/`unit`/`emptyToken` are **opaque caller data** (`§0A` note 2), and the emptiness key is the caller's `zoneId` | **`R-1`** (the anti-evasion vocabulary scan), `M-6`, `M-9`, `M-11`, `M-12`, `I-4`, `A-8` |

**⟶ CORRECTED 2026-09-27 — `P-1`'s SCAN SCOPES, AND THE IMPLEMENTER WORDING HAZARD (the RED-RUN REGISTER-RECONCILIATION pass; added because `R-1`'s literal half and this prohibition's own doc-comment text were reading against each other).** **The prohibition binds TWO scans with TWO DIFFERENT scopes, and this spec now states both (`§3.4 R-1`, which is the row that owns them):** **(1) THE VOCABULARY SCAN — the WHOLE MODULE FILE, COMMENTS INCLUDED**, over a normalized view in which string-literal concatenation and template substitution are joined and identifier chunks are re-joined, with a word/identifier **boundary** rule; and **(2) THE LITERAL SCAN (`'0px'` / `'fit-content'`) — CODE WITH COMMENTS STRIPPED**, because the clause forbids the literal **as a mechanism CONSTANT** and a comment is not a constant. **THE IMPLEMENTER HAZARD, stated explicitly so the module can satisfy the prohibition without this spec handing it an illegal spelling:** **`§2.1`'s own `emptyToken` doc comment MENTIONS the `'0px'` spelling while stating that the mechanism does not know it, and `§2.1`'s `isEmpty` doc comment carries the word "zone"** — which is a **member of the banned vocabulary** (`zones` is this unit's own name, and `'zone'` is the bounded token `R-1` scans for). **A module that copies this spec's doc-comment wording verbatim would FAIL `R-1` on its own comments.** Therefore: **the module must word its OWN doc comments so as not to carry a bounded vocabulary token, and must not carry a banned literal in code** — neither of these is optional, and neither is satisfied by "the spec prints it too". **This is the sibling precedent's exact class** (`U-PROJ`/`SLOTHOST`: *a prohibition whose token the contract itself prints is a trap*) — the contract's prose **must** carry the spellings to state the prohibition, the **module's** comments must not, and the two scopes above are what make both true at once. **The as-filed `R-1` text is kept visible at its own cell, and no clause of the prohibition was weakened.**
| **P-2** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates | The unit authors **no element, no text, no class, no attribute and no stylesheet**: it returns **one string** per call, and **the `:has()` rules + the collapse-override declaration stay consumer-side** (ruling 3). A mechanism is outside the UI constraint **because it is not a UI element** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`) | **`R-1`**, `R-2`, `I-4`, `§7` item 5, `A-9` |
| **P-3** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default | **The three empty limbs are the CALLER'S**: `empty` is an argument, the size validity rule is the ledger's own binding clause, and the malformed-spec answer is **`''` (absence), never a fabricated token**. **No default unit, no default token, no default size, no inferred emptiness** | `M-6`..`M-12`, `F-1`, `I-4`, `§7` item 7 (ii) |
| **P-4** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` | **Zero module-level state**: no store, no cache, no registry, no memo, no counter, no `WeakMap`, no `Map`, no persistence. Every call is a pure function of its arguments (`I-3`) | **`R-2`**, `I-3`, `I-6`, `A-6` |
| **P-5** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry | This module is **imported by no `src/**` file** and registers nothing: `ALL_TOOLS` stays **21**, `RpcMethod` stays **21**, `MUTATING_METHODS` stays **7**, `VALID_GROUPS` keeps its five members. **The five-seam negative is an explicit non-goal** | **`R-3`** (the import row), **`R-4`** (the diff-scope row), `A-10`, `A-11` |
| **P-6** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** | **Every row in this file is `[T]` arithmetic over arguments.** **No row claims rendered geometry, CSS validity, layout or paint** — and this spec **offers no `[U]` row** (§5.2). `src/shared/dom-shim.ts` **gains no member** (`H-r5`) | **`R-6`**, **`R-7`** (the geometry row), §5.2, `I-1`, `A-14` |

**The static prohibitions the table cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-7`): the
sibling `U-PROJ` review's finding was that a prohibition citing *"a static source row"* **with no id
anywhere** is not a row. **Every static claim here has an id, a layer and a scan scope**, and each is
closed against the evasion class (token assembly, comment-carrying, realm-rooted computed access) by
`§4.4 S-7`'s stop conditions.

### 2.3 The arithmetic rule — `isEmpty` and `trackFor`, stated falsifiably

**Item 1 — the decision table for `trackFor`, in full, evaluated IN THIS ORDER (the order is the
contract: the first limb that applies decides the outcome).**

| Order | Condition (exact) | Emitted token |
| --- | --- | --- |
| **(a)** | `Boolean(empty) === true` | **`spec.emptyToken`**, verbatim |
| **(b)** | `typeof size !== 'number'`, **OR** `Number.isFinite(size) === false` (`NaN`, `+Infinity`, `-Infinity`), **OR** `size < 0` | **`spec.emptyToken`**, verbatim |
| **(c)** | otherwise — `size` is a **finite** number and **not** negative (this **includes `-0`**, because `-0 < 0` is `false`; `§0A` note 4) | **`String(size) + spec.unit`** |
| **(d)** | `spec` is **not** a usable record, **or** any of its three fields is unreadable (a throwing accessor) **or** is not a `string` | **`''`** (the degenerate empty string; `F-1`) |

**⟶ CORRECTED 2026-09-27 — THE MALFORMED-SPEC PRECEDENCE, PINNED IN ONE PLACE (the RED-RUN REGISTER-RECONCILIATION pass; reported by the TestWriter against `tests/zones.test.ts`'s `F-1` and `P-ZN-SM-1` rows, which drive the flag half `empty === true` BESIDE every malformed spec).** **THE RULING, and it is the reading the drive used: limb (d) is evaluated FIRST of all four limbs, and it DECIDES WHETHER THE OTHER THREE MAY BE REACHED.** Concretely, in one sentence: **for a malformed spec, `trackFor` returns `''` REGARDLESS of `empty` and REGARDLESS of `size` — the `empty` flag reaches a limb only when the spec is WELL-FORMED.** **The `''` that `F-1`'s unconditional iff, `I-1`'s totality and `P-ZN-SM-1`'s own text all pin is therefore NOT the fourth-place fallback the table's ordering sentence ("the first limb that applies decides") would otherwise let a reader place LAST:** a module that checked `Boolean(empty) === true` first and returned `spec.emptyToken` would pass limb (a) and FAIL this clause, because a spec it cannot read supplies **no** `emptyToken` to return — the only thing it can yield is the absence of a token, `''`. **`F-1` states it as an unconditional iff and `P-ZN-SM-1`'s `32` limb-order re-drives assert it in BOTH flag halves (`'', never the empty token, never String(size)+unit`), so the `0x0` case that decides the ordering is exactly `(malformed spec × any size × empty = true)`.** **The as-filed wording is kept visible above and is NOT rewritten:** the table's own ordering sentence (**"evaluated IN THIS ORDER (the order is the contract: the first limb that applies decides the outcome)"**), its limb list with `(a) Boolean(empty) === true` printed before `(d)` the malformed-spec rule, and `§2.1`'s doc-comment limb list in `trackFor` (which prints the malformed case last as *"a MALFORMED spec … ⇒ `''`"*) **all stand as filed**; this note is the precedence that governs them where they read against each other. **Landing: `§2.3` item 1 (this note), `F-1`, `I-1`, `§2.1`'s `trackFor` doc-comment limb list, `§5.5.1 P-ZN-SM-1`'s `cellExpected` half, and `§7a.1` item 5's ruled landing list.** **No limb was reordered, no row was added, no term moved, and the `369` total is unchanged.**

**Item 1's `trackProp` clause (the two-jobs rule, `§0A` note 2).** `trackProp` **participates in NO
limb of the table**: it is **carried, never read for a value, never compared, never trimmed, never
validated and never used as a census key.** **`trackFor` does not consult the census at all** — it has
no census parameter. **A spec whose `trackProp` is `''`, or `'__proto__'`, or a 4 kB string, behaves
identically to any other spec.**

**Item 2 — the `isEmpty` decision table, in full, evaluated IN THIS ORDER.**

| Order | Condition (exact) | Result |
| --- | --- | --- |
| **(a)** | `census` is a **`Map`** (i.e. `census instanceof Map` **or** it duck-types as a map: a callable `get`) | `census.get(zoneId) === 0` — i.e. **`true` only where the map's own `get` returns exactly the number `0`** |
| **(b)** | `census` is a **record** (a non-`null` object that is not a map and not an array) **and** `zoneId` is a **`string`** | **own-property** lookup: `true` iff the census **owns** the key `zoneId` (never a prototype-chain read) **and** that own value is **exactly the number `0`** |
| **(c)** | otherwise — `null`, `undefined`, a primitive, an **array**, a **`Set`**, a function, an unreadable census, a **`Symbol`**/number/`null`/object `zoneId` | **`false`** |

**Item 2's stated clauses.** **(i)** The comparison is `=== 0` on the **own value**, so **`-0` is EMPTY**
(`-0 === 0` is `true`) while `'0'`, `0.0 + 0` (which IS `0`), `NaN`, a `BigInt` `0n`, `false`, `''`,
`null` and `undefined` are **NOT** empty. **(ii)** A key that is **absent** is **NOT empty** — absence
and emptiness are different facts, and the mechanism reports the second only. **(iii)** A **prototype
member** is **NEVER** read: `Object.prototype`-shaped keys (`'constructor'`, `'toString'`,
`'__proto__'`) that the census does not OWN answer **`false`**. **(iv)** A **`Map`** is the ONE
supported non-record shape (`§0A` note 3); an **array** is deliberately **not** (`false`), with its
reason recorded. **(v)** An **unreadable** value (a census whose own accessor or `get` **throws**) is
**caught and treated as not-empty** — never propagated (`I-2`).

**Item 3 — every input class the ledger names, with its exact outcome.**

| Input class | `trackFor(spec, size, empty)` | `isEmpty(census, zoneId)` | Row |
| --- | --- | --- | --- |
| a finite non-negative number (`0`, `1`, `1.5`, `1024.25`, `1e21`) | `String(size) + unit` | — (no size) | `M-1`, `M-2`, `M-7` |
| `0` | **`'0' + unit`** — the token, **not** the empty token | — | `M-5` |
| `-0` | **`'0' + unit`** (`-0` is finite and not negative) | a `-0` census value ⇒ **`true`** | `M-6`, `F-5` |
| a negative number (`-1`, `-0.5`, `-Number.MIN_VALUE`) | **`spec.emptyToken`** | — | `F-2` |
| `NaN` | **`spec.emptyToken`** | — | `F-2` |
| `+Infinity` / `-Infinity` | **`spec.emptyToken`** | — | `F-2` |
| a numeric string (`'12'`, `'0'`) | **`spec.emptyToken`** (never parsed or coerced) | — | `F-2` |
| a `BigInt` (`0n`, `12n`) | **`spec.emptyToken`** | — | `F-2` |
| a `Symbol` | **`spec.emptyToken`** | as a `zoneId`: **`false`** | `F-2`, `F-4` |
| a function | **`spec.emptyToken`** | a callable `census`: **`false`** unless it duck-types as a map | `F-2`, `F-4` |
| `null` / `undefined` as `size` | **`spec.emptyToken`** | as a `zoneId`: **`false`** | `F-2`, `F-4` |
| an object/array as `size` | **`spec.emptyToken`** | — | `F-2` |
| an **absent** census key | — | **`false`** | `F-2` |
| a **malformed spec entry** (not a record / an unreadable / a non-string field) | **`''`** | — | `F-1` |
| `Boolean(empty) === true` (with ANY size, incl. a valid one) | **`spec.emptyToken`** | — | `M-11` |
| `empty` absent / `undefined` / `null` / `false` / `0` / `''` | **NOT an empty case** — limb (a) does not fire | — | `M-12` |

**Item 4 — is a typed refusal *available*? NO, and the ledger does not need one.** **This unit has NO
refusal domain**: no union, no `code`, no skip list, no `ok`, no result record. **Every outcome above
is a VALUE** — `trackFor` returns **a string** (the empty token, `String(size) + unit`, or `''`), and
`isEmpty` returns **a boolean**. **The consequence, stated so no TestWriter invents a vocabulary**: a
row asserting a `code`, a `reason`, an `ok` or a `skipped` field **FAILS this spec's text** and is
`§4.4 S-3`. **The distinction that survives is the one the ROWS carry**: the empty token means *"this
track is empty"*; `''` means *"the spec you handed me is not a spec"*; and `false` means *"not empty"*.

**Item 5 — `isEmpty` is a READ: it refuses nothing and it reports nothing but a boolean.** There is no
*"unknown zone"* outcome, no *"census unusable"* outcome and no exception. **`isEmpty` returning
`false` is the SAME value for *"the zone is non-empty"* and *"that zone is not a key of this census"***,
and **this spec pins the collapse deliberately** (it is the total answer of a two-valued function) **and
records that the caller cannot distinguish the two from this call alone** (§7 item 7 (iii)).

**Item 6 — `trackFor` NEVER calls `isEmpty`, and `isEmpty` NEVER takes a spec.** The emptiness decision
is the **caller's** and crosses through the `empty` argument only. **A `U-CENSUS` consumer that wants
the derived flag calls both itself** (that is the delegate clause's shape, §2.1). **The mechanism holds
no census and no spec between calls** (`I-3`).

**Item 7 — THE GEOMETRY CLAUSE (A-d4's mandatory wording, in this unit's own words).** *The
**arithmetic** is provable here.* **Any claim about the rendered geometry is UNPROVABLE in this repo
today.** Concretely and without hedging: **`trackFor` returns a STRING; this spec asserts the string
and NOTHING about what a browser does with it.** It does **not** claim the string is valid CSS, that it
parses, that it produces a track, that any track's size, ratio, collapse or overflow is what a caller
intended, or that any element's rendered geometry changes. **The node layer cannot see any of that**
(no layout engine, no `getComputedStyle`, no paint), **and this spec offers no `[U]` row** — so there
is no leg on which such a claim could be made from this unit at all (§5.2, `R-7`). **`RK-19`'s class
— a later pass "proving" geometry from a node-green — is the finding this clause exists to prevent.**

### 2.4 The value-formatting rule — how a size and a caller `unit` become the token

**Item 1 — the emitted form, exactly: `String(size) + spec.unit`.** **The concatenation is raw**: no
separator, no space, no `'+'`, no `'calc('` wrapper, no parentheses, no unit inference, no
normalization of the unit token, and **no validation of either part**. `unit: ''` therefore emits the
**bare numeric text** — **this is the documented bare-number form**, and the reason no
`format` discriminator exists (`§0A` note 5(b); `F-6`). **A `unit` carrying whitespace, `';'`, `'}'`, a
newline or a whole declaration is emitted VERBATIM** (it is caller data — a sanitizer here would be a
prohibition-1/3 finding).

**Item 2 — `emptyToken` is emitted VERBATIM, and the mechanism does not know what it says.** It is
**not trimmed, not case-folded, not prefixed, not suffixed, not defaulted, and not validated**. **It
may be `''`, it may be `'0px'`, it may be `'1fr'`, it may be `'fit-content'`, it may be `'none'`, it may
be nonsense** — **the module has no `'0px'` literal and no `'fit-content'` literal** (the ledger's
binding negative), and **it must not acquire one**: the empty case **never** consults `size` or `unit`,
and **the token's content is the caller's business**. **A row that expects a specific literal for the
empty case FAILS this spec's text** and is `§4.4 S-1`.

**Item 3 — NO rounding, NO truncation, NO `toFixed`, NO `parseFloat`, NO `Math.*` on the size.** The
numeric text is the engine's own `String(number)` — the **shortest round-tripping decimal
representation** — so **`1.5` ⇒ `'1.5'`, `1024.25` ⇒ `'1024.25'`, `0.1 + 0.2` ⇒
`'0.30000000000000004'`, `1e21` ⇒ `'1e+21'`, `1e-7` ⇒ `'1e-7'`, `-0` ⇒ `'0'`, `Number.MAX_VALUE` ⇒
`'1.7976931348623157e+308'`, `Number.MIN_VALUE` ⇒ `'5e-324'`.** **This is the pinned semantics**:
**`String()`, NOT `toFixed(...)`, NOT `toPrecision(...)`, NOT a locale formatter, and NOT a
`Number.prototype.toString(radix)` call with a non-decimal radix.** **The consequence, stated honestly
so a consumer is not surprised: the emitted text is EXACTLY the caller's number as JS stringifies it,
including the scientific-notation forms for very large and very small magnitudes** — **and the caller's
`unit` is what makes it a token.** **A consumer that needs a fixed decimal count pre-rounds the size
it passes; the mechanism will not do it, because rounding is a decision the consumer owns**
(prohibition 3).

**Item 4 — the size is never coerced, parsed or interpreted.** A numeric string is **not** a number
here (`'12'` ⇒ the empty token, `F-2`), a `BigInt` is **not** a number, and a `Symbol` is **not** a
number: **the limb is `typeof size === 'number'` plus finiteness plus non-negativity, and nothing
else.** **No `Number(size)`, no `parseFloat`, no `+size`, no `valueOf` call, no
`Symbol.toPrimitive` call, no `toString` call on the caller's value.** **The value's own accessors are
never invoked** — so a hostile `valueOf` or a throwing accessor **changes nothing** (the size is a
value, not a key).

**Item 5 — no size is ever emitted twice, re-formatted, cached or memoized.** Two calls with
identical arguments produce **identical** strings, and the mechanism **caches nothing between them**
(`I-3`).

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. **Every row in
this file is a `[T]` row** — this unit reads no DOM at all — and **every row is a contract row for the
TestWriter; none is a measurement this pass took.** **Every row carries an id and a `Pinned by`
citation; a row without an id is what this repo's reviews keep catching.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **A well-formed spec and an integer size** | `trackFor({trackProp:'--w', unit:'px', emptyToken:'0px'}, 120, false)` | `'120px'` — `String(120) + 'px'`; the call is total and returns a `string` | §2.4 item 1 | `[T]` |
| **M-2** | **A fractional size** | spec as `M-1`; `size = 1.5` | `'1.5px'` — **no rounding, no truncation** | §2.4 item 3 | `[T]` |
| **M-3** | **`trackProp` is carried, never used** | two specs identical except `trackProp` (`'--a'` vs `'--b'`, and a third with `trackProp: ''`) | **all three emit the SAME string** for the same size/unit/empty: **`trackProp` affects no output** | §2.3 item 1 (`trackProp` clause), `§0A` note 2 | `[T]` |
| **M-4** | **`emptyToken` is irrelevant when the track is not empty** | `emptyToken: 'SENTINEL-0'`, `size = 40`, `empty` falsy | `'40px'` — the sentinel **never appears** | §2.4 item 2 | `[T]` |
| **M-5** | **`size === 0` (a zero track is NOT empty)** | spec as `M-1`; `size = 0`, `empty` falsy | **`'0px'`** — and the row asserts *"the returned string equals `String(size) + unit`"*, **never "the returned string equals the known literal"**: the literal `'0px'` here is the drive's own data, and a module hard-coding it would pass this drive **and fail `M-10`** | §2.3 item 1 (c) | `[T]` |
| **M-6** | **`size === -0` emits `'0' + unit` (NOT the empty token)** | `size = -0`, `empty` falsy | `'0px'`; **the negative sign is not emitted**; **the empty token is NOT returned**; the row asserts `Object.is(size, -0)` is what was passed | §2.3 item 1 (c), `§0A` note 4 | `[T]` |
| **M-7** | **Large and tiny magnitudes keep `String()` semantics** | `size = 1e21`, then `1e-7`, then `Number.MAX_VALUE`, then `Number.MIN_VALUE` | `'1e+21px'`, `'1e-7px'`, `'1.7976931348623157e+308px'`, `'5e-324px'` — **verbatim `String(size)`** | §2.4 item 3 | `[T]` |
| **M-8** | **The float-printing control** | `size = 0.1 + 0.2` | `'0.30000000000000004px'` — the row's purpose is to **fail a module that rounds or `toFixed`s** | §2.4 item 3, `A-1` | `[T]` |
| **M-9** | **A unit that is itself a full declaration is emitted verbatim** | `unit = 'px; color: red'` | `'120px; color: red'` — **no sanitizing, no rejection** (a sanitizer is a prohibition-1/3 finding) | §2.4 item 1 | `[T]` |
| **M-10** | **`emptyToken` is caller data, not a mechanism constant** | TWO specs, **identical except `emptyToken`** (`'ZZZ'` and `'none'`), each driven with a negative size | `trackFor` returns **`'ZZZ'`** and **`'none'`** respectively — **the same input class yields two different tokens, which no built-in literal can satisfy**; and a third drive passes `emptyToken: ''` and the returned string is exactly `''` | §2.4 item 2, `A-2` | `[T]` |
| **M-11** | **A truthy `empty` returns the empty token for ANY size** | `empty = true` with `size = 120`, then with `size = 0`, then with `size = -1` | **all three return `spec.emptyToken`** — the third drive shows limb (a) precedes limb (b) | §2.3 item 1 (a) | `[T]` |
| **M-12** | **A falsy `empty` is NOT an empty case** | `empty` driven as `undefined` (omitted), `null`, `false`, `0`, `''`, `NaN` — each with `size = 120` | **every drive returns `'120px'`**, never the empty token: limb (a) fires on **`Boolean(empty) === true`** only | §2.3 item 1 (a) | `[T]` |
| **M-13** | **A non-empty zone** | `isEmpty({a: 3, b: 1}, 'a')` | `false` | §2.3 item 2 (b) | `[T]` |
| **M-14** | **An empty zone** | `isEmpty({a: 0, b: 3}, 'a')` | `true` | §2.3 item 2 (b) | `[T]` |
| **M-15** | **The `-0` census value is empty** | `isEmpty({a: -0}, 'a')` | `true` (`-0 === 0`) — the `isEmpty` half of `§0A` note 4 | §2.3 item 2 (i) | `[T]` |
| **M-16** | **A `Map` census is supported** | `isEmpty(new Map([['a', 0], ['b', 2]]), 'a')` and `…, 'b'` | `true`, then `false` | §2.3 item 2 (a), `§0A` note 3 | `[T]` |
| **M-17** | **A record census is read as OWN properties only** | a census created with `Object.create(null)` carrying `{a: 0}`; then a plain-object census carrying an OWN `a: 0` | both answer `true` for `'a'` — **own-key reads, no prototype read** | §2.3 item 2 (b)(iii) | `[T]` |
| **M-18** | **Two calls, identical arguments, identical results** | `trackFor` and `isEmpty` each driven TWICE with the same arguments, and the two results compared | **equal by value** (`toEqual`, and **`===` for the strings**); no state is carried between the calls | §2.4 item 5, `I-3`, `A-7` | `[T]` |

### 3.2 Documented fail-states / non-happy states (each is a row; **there is no refusal domain, so every outcome here is a VALUE** — §2.3 item 4)

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A MALFORMED SPEC — the only case that emits anything other than a token** | `spec` driven as: `null`, `undefined`, `42`, `'x'`, `[]`, `{}` (a record missing all three fields), `{trackProp: 1, unit: 'px', emptyToken: '0px'}`, `{trackProp:'--a', unit: 2, emptyToken:'x'}`, `{trackProp:'--a', unit:'px', emptyToken: 3}`, and a **throwing accessor** on `emptyToken` | **no throw**; **`''` is returned** in every case — **never the empty token, never a fabricated default, never a throw**. The rule, in one sentence: **`''` is returned iff the spec is not a usable record OR any of the three fields is unreadable or is not a `string`** — and **the SAME string is returned for all three field failures, deliberately: the unit has no diagnostic vocabulary, and a per-field distinction would be a refusal domain this contract does not have** | §2.3 item 1 (d), §2.2 (the `''` clause), `A-3` | `[T]` |
| **F-2** | **A NON-REPRESENTABLE SIZE — the ledger's binding rule** | `size` driven as `-1`, `-0.5`, `-Number.MIN_VALUE`, `NaN`, `+Infinity`, `-Infinity`, `'12'`, `'0'`, `0n`, `12n`, `Symbol('s')`, a function, `null`, `undefined`, `{}`, `[]`, `true`, `false` | **`spec.emptyToken`, VERBATIM, in every case** — *non-finite/negative ⇒ the empty token* **and** *not-a-number ⇒ the empty token*; **no throw, no `NaN` string, no `'Infinity'` string, no numeric coercion, no parse** | §2.3 item 1 (b), §2.3 item 3, `A-4` | `[T]` |
| **F-3** | **AN ABSENT ZONE (the census question)** | `isEmpty({a: 0}, 'zzz')`, `isEmpty({}, 'a')`, and a `Map` without the key | **`false`** — **an absent key is NOT empty**; **no throw**; **nothing is created, defaulted or memoized into the census** | §2.3 item 2 (ii), `A-5` | `[T]` |
| **F-4** | **A NON-RECORD CENSUS, or a non-string `zoneId`** | census driven as `null`, `undefined`, `42`, `'x'`, `true`, `Symbol('c')`, a function, `[]`, `['z']`, `new Set(['a'])`; and `zoneId` driven (against a valid record census) as `42`, `null`, `undefined`, `Symbol('a')`, `{}`, `[]`, `true` | **`false` in every case**; **no throw** — **and for the ARRAY and the SET the row states the reason in its assertion message: an array's index read and a set's membership would give a `zoneId` a meaning this contract does not define (`§0A` note 3)** | §2.3 item 2 (c), `§0A` note 3 | `[T]` |
| **F-5** | **A census that is a HOSTILE record** | a census whose own `constructor`/`toString`/`__proto__` key exists only on `Object.prototype` (not OWN); a census whose own accessor for the asked key **throws**; a census that is a `Proxy` whose `has`/`get` **throws**; a `Map` whose `get` throws | **`false` for each**, **no throw**, **no prototype member returned as a value** — and for the `__proto__`-shaped key the row asserts the census was **not modified** (`Object.getPrototypeOf` unchanged) | §2.3 item 2 (i)(iii)(v), `A-6` | `[T]` |
| **F-6** | **`unit: ''` — the bare-number form, not a failure** | `trackFor({trackProp:'--r', unit:'', emptyToken:'none'}, 2, false)` | **`'2'`** — the numeric text alone. **Recorded as a state rather than an omission because it is the documented reason no `format` discriminator exists** | §2.4 item 1, `§0A` note 5(b) | `[T]` |
| **F-7** | **`empty` is truthy but the size is invalid too** | `empty = true`, `size = NaN`; and `empty = true`, `size = -3` | **`spec.emptyToken`** in both (limb (a) decides; limb (b) is never reached) — the row exists so a module that inspects the size **first** and returns a different token **fails** | §2.3 item 1 (a) | `[T]` |
| **F-8** | **A spec whose three fields are all `''`** | `trackFor({trackProp:'', unit:'', emptyToken:''}, 0, false)` and `…, -1, false` | **`'0'`** then **`''`** — i.e. a legitimate empty-string token and a legitimate empty-string numeric text are **distinguishable from the malformed-spec `''` only by the CALLER's expectations, not by this call**; **stated so a consumer is not surprised** (the two `''` outcomes are the same string, `§7` item 7 (iv)) | §2.3 item 4, §2.4 item 2 | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **Both functions return their declared TYPE for every input** — `isEmpty` ⇒ a `boolean`, `trackFor` ⇒ a `string` — and **neither ever returns `null`, `undefined`, an object, a number or an array** | Totality, and the delegate contract `U-CENSUS` relies on | §2.1, `§5.5.1 P-ZN-TP-1` |
| **I-2** | **Neither function ever throws, for any input, including a hostile value** (`Proxy` throws, throwing accessors, a `Symbol`, an unreadable census) | The acceptance line the ledger implies (*never a throw*) | §2.3 items 1/2, `§5.5.1 P-ZN-TP-1` |
| **I-3** | **Purity: identical arguments ⇒ identical results, ALWAYS; no module-level mutable state, no cache, no memo, no counter, no registry, no store** | Prohibition 4; the admission clause **(B)** | §2.2 (P-4), `§5.5.1 P-ZN-SM-2` |
| **I-4** | **Every emitted string is either `spec.emptyToken` VERBATIM, or `String(size) + spec.unit`, or `''` (the malformed class)** — and **the mechanism adds no character of its own**: no prefix, no suffix, no separator, no wrapper, no case change, no trim | Prohibitions 1/2/3 — "no built-in token literal" made falsifiable | §2.4 items 1/2, `§5.5.1 P-ZN-IM-1` |
| **I-5** | **The empty token is emitted IFF one of exactly three limbs fired: a truthy `empty`, a non-finite `size`, or a negative `size`** — so **no finite non-negative size ever yields the empty token, and no truthy-`empty` call ever yields `String(size) + unit`** | The decision table's two directions, as an every-state invariant | §2.3 item 1, `§5.5.1 P-ZN-IM-1` |
| **I-6** | **No argument is mutated and no argument is retained**: after any call, `spec`'s three fields, `size` and `census` are **reference-identical and value-identical**, and a **frozen** `spec`/`census` works exactly like an unfrozen one | Prohibitions 2/4; anti-aliasing | §1 item 4, `§5.5.1 P-ZN-IM-4` |
| **I-7** | **`isEmpty` answers about the CENSUS ONLY, and the census is never this unit's state**: no zone is ever created, defaulted, cached, remembered or written; **and `isEmpty`'s `false` is the same value for *"non-empty"* and *"absent"*** | The anti-second-authority clause (validity `V-13`'s remedy) | §2.3 items 2/5, `§0A` note 1 |
| **I-8** | **The mechanism reads NO environment**: no ambient global, no realm access, no `document`/`window`/`matchMedia`/`getComputedStyle`/`activeElement`, no `Date`/`Math.random`/`process.env`, no engine import, no filesystem, no network | Admission clause **(B)** and the static prohibitions | §2.2 (P-4/P-6), `§3.4 R-2`/`R-3` |
| **I-9** | **`trackFor` never consults the census, and `isEmpty` never consults a spec** — the two functions share no state and neither calls the other | §2.3 item 6; keeps the delegate surface two independent calls | §2.1, `§2.3` item 6 |
| **I-10** | **THE GEOMETRY INVARIANT: no row of this unit may assert a rendered-geometry, CSS-validity, layout or paint property, and no green of this unit may be reported as one.** Every row asserts **a returned string or boolean** and nothing about a browser | A-d4's mandatory clause; `RK-19`'s false-green class | §2.3 item 7, `§5.2`, `A-14` |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for prohibitions 1, 2, 4, 5
and 6. **A prohibition citing *"a static source row"* with no id is not a row** — the sibling
`U-PROJ` review's own finding (`§7a.1` item 11 (b) there). **Every static claim in this file therefore
has an id here**, and **each scan is closed against the evasion class** by `§4.4 S-7`'s stop
conditions (token assembly, comment-carrying, realm-rooted computed access).

**Every row here is `static`-layer: it reads the unit's own FILES, never the module's runtime
behaviour.** The **harness may read files** (`node:fs`-style); **the MODULE may not** (`R-3`).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (prohibitions 1/2).** *Over the MODULE's source (`src/shared/zones.ts`) INCLUDING its comments, and over this row's OWN CONTROLLED CORPORA of `[T]` fixtures, no occurrence of a zone/pane/tab/region/dashboard vocabulary token, and no occurrence of the `'0px'` or `'fit-content'` literal as a mechanism constant (`'0px'` is legal ONLY as a drive's own data, i.e. inside the controlled corpora, never in the module).* The scan reads a **NORMALIZED** view in which **string-literal concatenation is JOINED before scanning** (`'zo' + 'ne'`, a template literal with substituted parts, a token split across a line break) **and COMMENTS ARE SCANNED LIKE CODE**, with a **word/identifier BOUNDARY rule** (so a legitimate identifier containing a banned token as a substring is a stated boundary, not a violation). **THE SCAN'S SCOPE RULE, which resolves this row's own collision:** *this spec's PROSE must carry the words — it has to, to state the prohibition — and the MODULE never contains this spec's text; and the TEST FILE must carry the raw spellings inside this row's own control DATA and its assertion messages.* **Therefore: the module half is the WHOLE module file, and the fixture half is the row's OWN controlled corpora — a whole-file negative over the test file is DELIBERATELY DROPPED, with that reason stated in the row, because a whole-file scan of a file that must contain the spellings can only fail** (the sibling `R-17` form). **Controls, both required:** a **POSITIVE control** (a corpus spelling the vocabulary raw, joined, and in a comment **FAILS**) and a **NEGATIVE control** (this unit's own legitimate text — the two function names, `trackProp`/`unit`/`emptyToken` as this row's parameter names, the diagnostic strings — **PASSES**). **A row that passes for a module spelling any banned token in any of those three forms is UNFALSIFIED and must not be filed** **⟶ CORRECTED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): THE LITERAL HALF IS SCOPED TO CODE WITH COMMENTS STRIPPED, and the as-filed cell's *"COMMENTS ARE SCANNED LIKE CODE"* + *"no occurrence of the `'0px'` … literal"* pairing is what made the two halves read as ONE whole-file scope.** The two scopes, stated as the drive implements them and as `§2.2` P-1's dated note states them: **(1) the VOCABULARY scan reads the WHOLE MODULE FILE, COMMENTS INCLUDED** (a comment carrying the vocabulary is the same violation as code carrying it — `S-7`'s comment-carrying closure), **and (2) the LITERAL scan reads CODE WITH COMMENTS STRIPPED**, because the clause forbids the literal **as a mechanism CONSTANT** and `§2.1`'s own `emptyToken` doc block — the block the module mirrors — **mentions** the spelling while stating that the mechanism does not know it. **The reason is recorded rather than assumed, and it is a HARD REQUIREMENT on the module, not a licence:** the module's own comments **must not carry a bounded vocabulary token** (so the comment-inclusive vocabulary half stays satisfiable), and the module's **code must not carry a banned literal**. **I judge the comment-inclusive scan RIGHT for the vocabulary half and comment-EXCLUSIVE for the literal half — the two are not the same claim, and the literal half is the half whose whole-file form would be unsatisfiable by a module that documents its own contract.** | §2.2 (P-1/P-2), §4.4 `S-7`, `A-8` | static |
| **R-2** | **The forbidden-ACCESS row (prohibitions 4/6; `I-8`).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, a helper returning the realm, **the no-token realm route** (`({}).constructor.constructor('return this')()`, `Reflect.construct`, `Function.prototype.call`-shaped code construction) — **and no ambient read for a value**: `document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, `matchMedia`, `getComputedStyle`, `activeElement`, `Date`, `Math.random`, `process`, `node:fs`, `localStorage`, `eval`, `new Function`. **STATED LIMIT, so the row is not written unassertably: a BLANKET ban on `[expr]` is NOT claimed** — a **locally constructed object's** computed access and ordinary **array indexing** carry no banned token and are **deliberately not banned**; **a row that asserts "no bracket notation at all" FAILS this row's own text** and is `S-8` | §2.2 (P-4/P-6), `I-8`, `A-6` | static |
| **R-3** | **The IMPORT-BOUNDARY row (prohibition 5).** *`src/shared/zones.ts` imports NOTHING* — not `src/main/**`, not `src/renderer/**`, not `electron`, not `node:*` (including `node:fs`), not `provident-ssr`, **not a sibling mechanism module of any kind** (no projection/applier module, no list host, no slot host, no census module), and **not even a type-only import**. **Any import statement at all FAILS the row.** **A later unit that legitimately imports THIS module is not a violation of it — the row binds THIS module's own imports, and the *"imported by no `src/**` file"* claim is `R-4`'s** | §2.2 (P-5), §0 ruling 4 | static |
| **R-4** | **The DIFF-SCOPE row (prohibition 5; `§5.1`).** *Only the files of `§5.1`'s allow-list are touched by this unit's committed range: the module (NEW), the test file (NEW), this spec, and the unit's own tracker/record artifacts.* **A changed path outside that list FAILS the row**, and the row **states its falsifiable half the way the siblings do**: the allow-list is `§5.1`'s rows 1–4; the **DENIED set binds absolutely** (`src/main/**` · `src/renderer/**` · `src/shared/dom-shim.ts` · `src/shared/types.ts` · every **existing** test file of another unit · `package.json`/`package-lock.json` · `scripts/**` · `node_modules/**` · `../Preempt-Providence/**` · a sibling unit's artifacts); a non-denied path outside the allow-list is a **FINDING for the adversarial pass, not an automatic FAIL** (a unit's own mandatory gate artifacts must be committable — `RCA-8(a)`); and **the canonical artifacts must be non-vacuously present in the range** (which is what keeps the row from being satisfied by an empty range). **The row also asserts the companion claim, so it is not silent about it: at the time this unit's red set runs, `src/shared/zones.ts` is imported by NO `src/**` file** | §5.1, `§7` item 2 | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/zones.ts` exports EXACTLY the three names `§2.1`'s block declares, in its two halves:* **(a) the RUNTIME value exports — exactly `isEmpty` and `trackFor`** (read from the imported namespace's own keys, with a **positive control** that a namespace carrying a third value export **FAILS**); **(b) the TYPE-ONLY name — exactly `TrackSpec`** (read as a type: a type-only name is erased at runtime, so the row's type half is a **compile-time** claim — `§5.2` leg 4 is the leg that covers it). **A row asserting only a COUNT (`=== 3`, `=== 2`) without NAMING the names FAILS this row's own text — a count is satisfiable by renaming.** **The census is `2` value exports + `1` type declaration = `3` exported names, and this row is where the block and the count are reconciled** | §2.1 (the census), §5.2 leg 4 | runtime + type-level |
| **R-6** | **The NO-SHIM / NO-NEW-SURFACE row (prohibition 5/6).** *The change set does not touch `src/shared/dom-shim.ts` (no member added, no member needed), and the five-seam negative holds:* `ALL_TOOLS` is still the pinned **21-NAME** set, `RpcMethod` is still **21** members, `MUTATING_METHODS` is still the **7** named entries, `VALID_GROUPS` still has its **5** members — **asserted by SET EQUALITY AGAINST THE NAMES where an existing name-complete row already does so, and NOT by a bare count** (`§4.4 S-8`'s `S-14` class) | §2.2 (P-5/P-6), §0 ruling 8 | static |
| **R-7** | **THE GEOMETRY ROW (A-d4's mandatory clause, in falsifiable form).** *Over the MODULE's source AND over this unit's own `[T]` test file, the change set contains **no geometry-observation call and no geometry-shaped claim**: no `getComputedStyle`, no `getBoundingClientRect`, no `offsetWidth`/`offsetHeight`/`clientWidth`/`scrollWidth`-family member, no `matchMedia`, no `style` write, no class write, no `innerHTML`, and **no assertion whose failure message or description claims a rendered/layout/CSS-resolution fact**.* **The row exists because the honest contract is the NEGATIVE one: this unit may assert ARITHMETIC, NEVER rendered geometry** (`§2.3` item 7, `I-10`). **Its falsifiable half:** a module or fixture that observes geometry, or a row description claiming layout, **FAILS**. **Its limit, stated: a text scan cannot prove the ABSENCE of a claim for all prose — the row binds the two files it names, and `§5.2`'s refusal to offer a `[U]` row is the contract half** **⟶ CONFIRMED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): THE STATED BOUND IS THE ONE THE DRIVE TAKES, and it is exactly three parts — (a) the MODULE file's raw bytes, comments included; (b) THIS UNIT'S OWN `[T]` TEST FILE's raw bytes; and (c) the row DESCRIPTIONS extracted from that test file (the `it`/`describe` titles). The geometry tokens are held as FRAGMENTS in the rule list so the scan cannot read its own rule list — a whole-file scan that spelled the joined token in its own source could only fail — and that fragment discipline was verified against the red set's own report: ZERO self-hits. Both halves carry their own POSITIVE controls (a corpus that observes geometry must FAIL; a description that claims a resolution fact must FAIL) and a NEGATIVE control (ordinary arithmetic wording PASSES), so the scan is falsifiable rather than vacuous.** | §2.3 item 7, `I-10`, §5.2, `A-14` | static |

**What these seven rows do NOT do.** They add **no `§3` contract behaviour**: each asserts a property of
**this unit's own files**, and **none may be satisfied by a runtime observation of the module**. They
land in the **SAME test file** as the red set and **change no register statement, type, strategy or
attempt count** (`§5.5.1`).

### 3.5 The EXISTENCE rows — the two repo-state claims this filing makes, each with a probe

**What this subsection is, and why it exists.** This spec makes **two existence/count claims about the
repository** that would otherwise be **unfalsifiable prose**: *"`src/shared/zones.ts` does not exist
yet"* (the red's own premise, `§4.1`) and *"`docs/skills/designing-pages.md` does not exist"* (§1 item
8). **An existence claim with no probe is not a row** (`§4.4 S-8`'s `S-15` class).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-8** | **The module-absence row (`§4.1`'s red premise).** *At the moment the red set is AUTHORED and RUN, `src/shared/zones.ts` does not exist and `tests/zones.test.ts` is the only unit-owned file in the change set* — an `fs.existsSync`-style probe on the repo-relative path. **Its PASS and its FAIL are BOTH meaningful: if the module EXISTS before the red run, this row FAILS and the unit's red-order claim (`RCA-1`) is broken** — the pass that finds it must report the inversion rather than proceed | §4.1, `RCA-1`, `§4.2` item 1 | static |
| **R-9** | **The absent-page-design row (`§1` item 8).** *`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs* — an `fs.existsSync`-style probe (globbed `docs/skills/*` at filing: `process-guardrails.md` alone). **Its FAIL is meaningful: if the file DOES exist, this unit OWES a test-use-case coverage row in that file's coverage matrix plus an entry in its demo-page index** — and **this filing's position is that the mechanism renders no page, so the row would be an ABSENCE row rather than a claim**, stated here so the obligation is not silently dropped | §1 item 8, `§0A` note 6 | static |

---

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/zones.test.ts`** — authored **first**, **RUN**, and
its failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/zones.js'` for every row that imports the module, plus the static
rows that can already be evaluated. **There is NO host-fix branch for this unit**: the module does not
exist, so the red is **purely additive**, and **the unit owes no change to any existing file**.

**⟶ CORRECTED 2026-09-27 — THE RED'S ACTUAL SHAPE, RECONCILED (the RED-RUN REGISTER-RECONCILIATION pass; the as-filed prediction above is kept visible).** **The filing predicted the literal `Cannot find module '../src/shared/zones.js'` for every importing row. THE RED AS AUTHORED IS NOT THAT, and the difference is a TECHNIQUE, not a deviation — a later reader must not read the labelled red as drift.** The authored file uses **the repo's established import-boundary technique** (the sibling `tests/slot-host.test.ts` / `tests/layout-projection.test.ts` form): **(a)** an **`fs` existence probe** on `src/shared/zones.ts` (`existsSync`), and **(b)** a **run-time-COMPUTED specifier** (`['..','src','shared','zones.js'].join('/')`) resolved through a dynamic `import(/* @vite-ignore */ …)`. **The consequence, stated exactly:** a clause row fails as a **LABELLED ASSERTION** carrying the same fact — *"the module of `§2.1`/`§5.1` row 1 does not exist yet"* — with the row's own label and its `§` citation in the message, **so the red set cannot be taken down by a collection error while the module is absent**, and **the failing set is the per-row ledger of which rows are red**, which is what `§4.2` item 3 asks for. **Both shapes carry the same fact; only the string differs, and the literal `TS2307`/`Cannot find module` text appears in exactly ONE place: `§5.2` leg 4**, where the **standalone strict `tsc` over the test file** compiles the `import type { TrackSpec }` of `R-5`(b) against a module that does not exist. **So the honest reading of the red is: every clause/static/register row is red as a labelled assertion; leg 4 is red as the module-resolution failure the filing predicted; and no row is red for a reason the filing did not name.** **The `7` rows that PASS at red time are the rows that need no module surface** — the two existence probes (`R-8`/`R-9`), the register's own harness precondition (the declared-terms/seed/caps/arithmetic census, which is exactly the row this pass's reconciliation serves), the scanner controls (`PRE-3`), and the two harness preconditions (`PRE-1` resolves an EXISTING pure module, `PRE-2` pins the register's tables). **`PRE-*` rows are harness preconditions and are NOT spec rows** (the sibling `U-MOUNTGUARD` red recorded the same split, *"the `2` greens are the harness preconditions, not spec rows"*).

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that the two
functions behave as `§2`/`§3` say over the enumerated inputs**. It is **NOT** evidence that any UI
renders, that any CSS is valid, that any track has a size, or that the app behaves differently — **in
particular, at the end of this cycle the module is still imported by NO `src/**` file** (`R-4`).

### 4.2 Red-set authoring order

1. Write **`I-1`..`I-10`**, then **`M-1`..`M-18`**, then **`F-1`..`F-8`**, **in that order**.
   **The `§3.5` existence rows `R-8`/`R-9` are authored FIRST OF ALL** (they are the red's own premise
   and are evaluable before the module exists). **Then the `§3.4` static rows `R-1`..`R-7`**
   (`R-3`/`R-4`/`R-6` are evaluable immediately; `R-1`/`R-2`/`R-5`/`R-7` read the module file, so they
   become evaluable **once it exists** — which is exactly what `R-8` records).
2. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**,
   after the `R-*` rows, **in register order** (`P-ZN-IM-1` · `P-ZN-TP-1` · `P-ZN-IM-2` ·
   `P-ZN-IM-3` · `P-ZN-SM-1` · `P-ZN-SM-2` · `P-ZN-IM-4` · `P-ZN-TP-2`). They ride **`npm test` (leg
   1)** unchanged and **need no new file, no new script, no `package.json` change and no dependency.**
   **The register's `YES` markings are execution DESIGN, not results** — **a row that is `YES` in
   `§5.5.1` but broken when run is a SPEC FINDING, reported rather than tuned to green.**
   **The register's own stop rule binds the red run**: rows are evaluated **sequentially in register
   order** with **STOP AFTER 5 CONSECUTIVE FAILURES**, so a red run of a module-absent unit **is
   expected to stop early**, and **the un-run rows must be REPORTED AS FAILURES rather than silently
   omitted** — **a red run that reports all `369` attempts as executed is the finding, not the
   expectation.** **⟶ OBSERVED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): the red run did exactly this — it STOPPED EARLY at `P-ZN-IM-1` after `5` of that row's `30` attempts (`0` held), and the seven un-run register rows were reported as FAILURES with their own record lines. `5 of 369` is the correct, reportable red shape for a module-absent unit; the register's `369` is DESIGN accounting and is not contradicted by it.**
3. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and
   existence row that can already be evaluated.
4. **Then** implement the least code that makes them green.
5. **Re-run**, record the green. **No row may be edited to reach green**; **a row found wrong is
   corrected IN THIS SPEC first, with the old text kept as `SUPERSEDED`** (annotate-never-rewrite).

### 4.3 What the red is NOT

- **Not a census test.** Any `computeTrackVars`/`zones`-key-set/`sizes`/`revealed`/`specOf`-as-a-map
  row is **`U-CENSUS`'s** (row `E2`) and belongs in `docs/specs/census.md`'s red set. **Its presence
  here is a scope violation** (§1 item 6).
- **Not a projection test.** No write map, no `applied`/`skipped` record, no write sink, no
  `setProperty` (`U-PROJ`'s territory).
- **Not a DOM test.** No element, no shim member, no `document`, no `querySelector*`: this unit's rows
  pass **plain values**.
- **Not a CSS-parsing test.** `[T]` asserts **the string the module produced**; **whether a browser
  accepts it is not asserted here at all** (`§2.3` item 7).
- **Not a geometry test.** A `getBoundingClientRect`/`getComputedStyle`/`offsetWidth`-shaped row is
  `§4.4 S-6`'s class and **may not be added**.
- **Not assembled-app evidence.** Layer declaration anchor 1.
- **Not a consumer-vocabulary test.** A row naming a real zone/pane/tab is a **prohibition-1
  violation** (its vocabulary may appear **only** inside `R-1`'s own control corpora).

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row is only satisfiable by expecting an **empty-token literal** the mechanism supplies | **Violates the ledger's binding negative and prohibition 1** — the literal is the caller's `emptyToken`. **Re-write the row against a caller-supplied sentinel** (`M-10`'s form). **Never the contract.** |
| **S-2** | A row is only satisfiable by a **size coercion** (`Number(...)`, `parseFloat`, `+size`) or by **parsing** a numeric string | **Violates §2.3 item 1 (b)** — a non-number size is the empty token. Re-write the row; never weaken the limb. |
| **S-3** | A row asserts a **`code`/`reason`/`ok`/`skipped`/result-record** shape | **Violates §2.3 item 4** — **this unit has NO refusal domain** and every outcome is a value. The row is re-written as a value assertion; **adding a union is a new contract and needs its own gate.** |
| **S-4** | A row is only satisfiable if `isEmpty` **creates, defaults or memoizes** a zone, or if `trackFor` **reads a census** | **Violates `I-7`/`I-9` and prohibition 4** — stop and report to the supervisor. |
| **S-5** | A row needs a **census key-set rule**, a **`revealed` default**, a **`sizes` map** or a **`specOf` map** | **Violates §1 item 6** — that is `U-CENSUS`. **Stop and route the row to `docs/specs/census.md`.** |
| **S-6** | A row asserts a **rendered-geometry, CSS-validity, layout or paint** property — or a `[T]` green is to be reported as one | **Violates A-d4's mandatory clause and `I-10`** — the claim is **deleted**; this spec **offers no `[U]` row**, and `§5.2` states why. **The row may not be moved to the `ui` leg silently** (`S-7`'s general rule). |
| **S-7** | A row asserts a prohibition by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **normalized** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed** (the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule: *a static prohibition satisfiable by splitting a token is not satisfied*). The row form is `R-1`/`R-2`. |
| **S-8** | A row asserts a prohibition by a **bare COUNT** (*"`ALL_TOOLS` stays 21"*, *"three exports"*) or claims an **existence/absence about the repo** with no probe | **A count is satisfiable by renaming and passes whether or not the change added a seam.** The row must assert **SET EQUALITY AGAINST THE NAMES** or be replaced by the **import/diff row** that can actually fail (`R-3`/`R-4`/`R-5`), and an existence claim must be an `fs.existsSync`-style **probe whose FAIL is meaningful** (`R-8`/`R-9`). |
| **S-9** | A row (or an implementation) proposes **validating, trimming, normalizing or sanitizing** a caller-supplied `trackProp`, `unit` or `emptyToken` — or treating `-0` as negative — or adding a `format`/options field to `TrackSpec` | **Violates the caller-data rule and the A-d4-ruled shape** (`§2.4` items 1/2/3, `§0A` notes 2/4/5). Stop and report: **each of these is a contract change needing its own gate, not an implementation choice.** |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-E plan** (§0
ruling 12), (b) this spec to exist (**done: this filing**), and (c) a **TestWriter to have RUN and
REPORTED the red set** (`AGENTS.md` item 9). **It has NO ordering precondition** — it is wave E's
**first** unit — and its `## OPEN` row **`E1`** stays `BLOCKED` until (a) and (c) both hold.
**Its row also carries a permanent scoping clause: the census is `U-CENSUS`'s and the geometry
boundary is this unit's own** (§1 items 6/7, `§2.3` item 7).

**⟶ PROGRESS 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass; a STATUS note on the gate's three conditions, and no clause of this subsection changes).** **(b) remains discharged.** **(c) HAS MOVED ONE STEP FORWARD: a TestWriter HAS AUTHORED, RUN and REPORTED the red set** (`tests/zones.test.ts`, **`57` rows · `50` red / `7` pass`, the register stopping at `P-ZN-IM-1` after `5` attempts with `0` held**) — so the *"red set owed"* half of condition (c) is **discharged**, and the **red-run findings this pass reconciled are recorded at the SECOND STATUS NOTE and `§5.5.1`.** **(a) IS STILL NOT DISCHARGED: no architect go-ahead for the wave-E plan exists on the record, the module `src/shared/zones.ts` still does not exist, and the unit is therefore still NOT delegable, NOT green and NOT `DONE`.** **The status is exactly: `RED RUN — REPORTED AND RECONCILED; IMPLEMENTATION NOT AUTHORISED`.** **The `## OPEN` row `E1` therefore stays `BLOCKED` until (a) holds** — and its tracker cells (the spec cell still reading *`OWED — not filed`*) are the **supervisor's** to reconcile, not this pass's.

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/zones.ts` | **NEW** — the **two value exports + one type declaration** of §2.1, and nothing else | always |
| 2 | `tests/zones.test.ts` | **NEW** — the red set (§4.2), the register rows and the static/existence rows | always |
| 3 | `docs/specs/zones.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and a **sibling spec** only for a dated status/annotation correction that changes **no normative clause** | the pass that produces them |

**Outside the scope, ALWAYS — the DENIED set, which binds absolutely (the same class `U-PROJ`'s `R-20`
asserts):** `src/main/**` · `src/renderer/**` · `src/shared/dom-shim.ts` · `src/shared/types.ts` ·
**`docs/specs/census.md`'s subject matter** · every **existing** test file of another unit ·
`package.json` / `package-lock.json` · `scripts/**` · `node_modules/**` · `../Preempt-Providence/**` ·
and **the artifact of a SIBLING unit** (its `*-greens.md`, its review record, its tracker-only rows).
**This unit changes NO existing file except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — and for this unit it proves **nothing** about CSS validity, applied lengths, layout or rendered geometry (layer anchor 2, `§2.3` item 7) |
| 2 | typecheck | `npm run typecheck` | **[H]** | the `TrackSpec` type and the two signatures are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and excludes `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables** (`docs/pending.md` §G records the same limit for every unit) |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles |
| 4 | **standalone strict `tsc` over the unit's own test file** — the named leg for **`R-5`(b)** | a standalone strict `tsc --noEmit` invocation over `tests/zones.test.ts` | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts that the **TYPE-ONLY** name `TrackSpec` is exported, and **an imported type name is erased at runtime** — so the runtime half of that row cannot fail, and **`npm run typecheck` (leg 2) does not compile `tests/**` at all**. **The honest leg is a standalone strict `tsc` over the test file**: if `TrackSpec` is renamed, removed or left unexported, the file **fails to compile**. **It adds no script to `package.json`, no dependency and no diff-scope row**, and **no register row depends on it. A DONE row that reports `R-5`(b) as green must cite THIS leg, not a runtime assertion.** |

**THE `[U]` ROW IS **NOT OFFERED** BY THIS UNIT — and the reason is the ledger's own sentence, quoted:
*"the contract/arithmetic is provable here; **any rendered-geometry claim is UNPROVABLE in this repo
today** → `ui` only."*** **A `[U]` row would be a rendered-geometry claim, or a claim that a browser
accepted the emitted string — and neither is falsifiable from this unit's change set**, because the
module is **imported by no `src/**` file** (`R-4`): **there is no rendered surface to observe.** **The
`ui` leg exists and is green** (`U-REALDOM-BOOT` is `DONE`), so this is **not** a leg-availability
excuse: it is the structural reason, stated in the ledger's words. **If a later unit gives this module
a shipped consumer, a `[U]` row for `trackFor`'s emitted token becomes *possible* — and it would be
that unit's row and that unit's spec, with its own preconditions and its own bound** (`U-REALDOM-BOOT`'s
`§1.13` honest limits: a `ui` green proves *one probe in one real renderer boot* and **nothing else**).
**No `§3` row is weakened by the absence of a `[U]` row, because no `§3` row makes a claim of that
kind** (`I-10`, `R-7`).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order**:

1. **Unit + wave + status**: `U-ZONES` · wave **E** · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"token arithmetic over caller-supplied values
   only; the census is INJECTED and is never this unit's state; `computeTrackVars` and the key-set-
   `zones`/`revealed` rules are `U-CENSUS`'s, row `E2`; no CSS ships; the `:has()` rules and the
   collapse-override declaration stay consumer-side."* **A DONE row that does not state this is a
   review finding** — it is the unit's defining constraint (ruling 1, `§1` items 2/3/6).
3. **The purity/totality confirmation, explicitly**: *"`isEmpty` and `trackFor` are PURE (no
   environment read, no ambient global, no import at all) and TOTAL (a value for every input, no
   throw, no refusal domain, `isEmpty` ⇒ a boolean and `trackFor` ⇒ a string, always)."*
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as **RUN and REPORTED, verbatim**, **including which
   register rows ran and which were reported un-run** (§4.2 item 2's stop rule).
6. **The three legs' results with layer labels** (`npm test` `[T]` · `npm run typecheck` `[H]`, *`src/**`
   only* · `npm run build` `[H]`) **plus leg 4** (the standalone strict `tsc` over the test file), and
   **the explicit sentence that the node-suite green is envelope/pure-layer evidence and NOT
   assembled-app evidence** — **and for this unit that it proves NOTHING about CSS validity, applied
   lengths, layout or rendered geometry.**
7. **The `[U]` status**: **not offered**, with §5.2's structural reason (imported by no `src/**` file)
   and the ledger's quoted clause. **A DONE row that claims a rendered-geometry proof is a review
   finding** (`I-10`, `R-7`).
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, which is **MANDATORY per
   completed unit**) and the **blind-greens + per-unit documentation-review records** (`AGENTS.md`
   items 10a/10d, RCA-4/RCA-6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — **and the explicit statement that
   `docs/specs/census.md`'s `U-CENSUS` row `E2` is now unblocked on this unit's delegate surface**
   (§1 item 6) **while its own spec, red set and gates remain its own**.
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken** counts, **each row's strategy id (`S-ZN-*`)**, the **pinned seed
    `20260927`** and its **step form**, the **stop-after-5-consecutive-failures status**
    (`not triggered`, or `triggered at row …`), the **total attempts reported against the `≤400` cap**
    with **every row's count against the `≤100` per-row cap**, and the **explicit sentence that
    `P-ZN-IM-1`, `P-ZN-TP-1` and `P-ZN-TP-2` are `YES (bounded)` and are NOT proofs of the unbounded
    universals they state.** **A DONE row that reports the register as "executed" without these
    per-row counts and strategy ids is a review finding** — the register's `YES` cells are **execution
    DESIGN** (`§5.5.1`), so the counts are the only executed-layer evidence the ledger can carry, and
    **a read-only PBT audit may not accept this spec's table alone**: it reads the counts here and the
    TestWriter's tables in `tests/zones.test.ts`.
11. **The register's ARITHMETIC and its DUAL COUNT.** The DONE row must print the **total WITH its per-row
    terms** — **`369` = `30+90+36+68+52+12+15+66`** *(as filed: `400` — a mis-sum of these terms)* — and must **reconcile that figure against the
    tables the test file actually produces**: **a total that is not the sum of its own terms is a
    review finding** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE). **Where
    a row's attempts are several assertions over ONE execution, or a count of DISTINCT inputs rather
    than of drives, the DONE row must report BOTH the declared attempts and the honest
    DISTINCT-DRIVE count** — here, `P-ZN-TP-2`'s **`66` declared draws over a `28`-value pool × `3`
    spec shapes** (a **draw is not a sweep**: **no** "all 28 drawn" claim may be made,
    `§5.5.1`'s honesty item 5), and `P-ZN-SM-1`'s **`68`** of which **`16`** are exhaustive table
    cells and **`52`** are fixed additional drives. **The DECLARED figures are what the caps are
    compared against; the distinct-drive figures are reported BESIDE them and never substituted for
    them.** **A DONE row that quotes the total alone, or that substitutes a distinct-drive figure in the
    cap comparison, is a review finding.**

**⟶ RECORDED: the `§5.3 → §5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs NO fix** —
it is the same deliberate gap in the three sibling specs (`docs/specs/projection.md`, `listhost.md`,
`slothost.md`), recorded by the `U-LISTHOST` documentation review (`AGENTS.md` item 10d / RCA-6).
`§5.3` is the DONE-row shape and `§5.5` is the property register; **NO clause is missing** — the
section simply does not exist. **Renaming or renumbering is FORBIDDEN for citation stability** (both
numbers are cited across the trackers and in sibling specs). **`§5.5.0` is a `###` sub-heading of
`§5.5`, not a new member of the `5.x` sequence, so the gap reads exactly as recorded. This note
renumbers nothing and changes no clause of this spec.**

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness) — **the gate-11 register is filed at `§5.5.1`**

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 / `engine-pin.md` §5.5 / `projection.md` §5.5 state it: THIS REPO
HAS NO PBT HARNESS.** `package.json`'s `devDependencies` key set is the **five keys** `@types/node`,
`electron`, `esbuild`, `typescript`, `vitest` — **no `fast-check`, no `hypothesis`, no property
runner**. **This unit is CODE-BEARING** (a pure mechanism with two value exports, a red set, a test
file and a real arithmetic contract), so **the recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE** to it:
`docs/decisions.md`'s ACTIVE row **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** restricts that exemption to
**genuinely invariant-free / doc-only / config-only / non-JS units**, and the gate record's
amendment (§8) records the follow-up. **`§5.5.1` below is therefore a real typed register** —
`≤8` rows typed `P-NN-IM`/`P-NN-SM`/`P-NN-TP`, **never an `F-` row**, **never a `§6`/`FS-n` citation as
a row**, **executed by plain deterministic vitest tables and one pinned-seed hand-rolled generator, with
NO new dependency.** **The precedent that makes this executable here (and the gate-11 ruling's
decisive point): `docs/specs/engine-pin.md` §5.5 executed `7` of its `8` register rows with plain
deterministic vitest tables and no new devDependency.** **The pilot this register models is
`docs/specs/projection.md` `§5.5.1` (`8` typed rows, `S-PJ-*` strategy ids, a pinned-seed 32-bit LCG,
caps `≤100`/row · `≤400` total · stop-after-5, honest `YES (bounded)` markings, per-row terms printed
and reconciled).**

**`§5.5.0` does not exist in this file, and that is deliberate — stated so no later pass reads it as a
loss:** this filing has **no superseded exemption to keep verbatim**, because it never recorded one
(the sibling specs' `§5.5.0` blocks exist to preserve *their* filings' exemptions after the gate-11
ruling; **this spec is filed after that ruling and carries the register from the start**). **The gap
is therefore `§5.3 → §5.5` with NO `§5.4` and NO `§5.5.0`**, and **no section number moves.**

### 5.5.1 THE REGISTER (2026-09-27, filed under the gate-11 ruling) — **8 rows, ALL executed by design**

**What this section is, in one sentence.** A **typed register of `8` rows** whose **five genuine
quantifications** — (i) *every* non-finite or negative size yields the empty token *verbatim* with no
default, (ii) *every* input shape leaves both functions total and non-throwing, (iii) *every* census
shape and `zoneId` yields the declared boolean with the census never mutated, (iv) *every* finite
non-negative size is `String(size)`-formatted in the pinned decision order, and (v) *every* legitimate
spec emits only caller-supplied text — are **executed here as quantifications over finite, pinned
enumerations**, **hand-rolled and deterministic, with no new dependency, no `fast-check`, no
`hypothesis` and no property runner** (the `devDependencies` key set is unchanged — the five keys).
Type algebra is `docs/specs/engine-pin.md` §5.5's: **`P-IM`** = invariant · **`P-SM`** = state-machine ·
**`P-TP`** = totality.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-ZN-*`** (`ZN` = this
unit, **z**o**n**es) — the analogue of `P-PJ-*` for `U-PROJ`, `P-LH-*` for `U-LISTHOST` and `P-SH-*`
for `U-SLOTHOST` — so **a register row is never mistaken for a `§3` row and never for a pilot's.** **No
id of this register reuses, extends or restates an `M-*`/`I-*`/`F-*` id of §3** (those stay
**compensating sample rows**, cited per row below), and **no `F-` register row is invented** — `F-1`..
`F-8` stay `§3.2` table rows. **No `§6`/`FS-n` citation appears as a register row.** The strategy-id
prefix is **`S-ZN-*`, one per row**, and the one **pinned-seed generator** carries its own id,
**`S-ZN-SEED-1`**.

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/zones.test.ts`, §4.1/§5.1) — the
   file the red set already owes, and the file the register **rides as part of the red** (§4.2 item 2).
   **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain
   TypeScript inside the test file.** The only generator in this register is **`S-ZN-SEED-1`**'s (used
   by `P-ZN-TP-2`), and it is pinned to **literals in the test file itself** — a hand-rolled 32-bit
   LCG, the **literal** form a contract so the run is reproducible, and **the constants are the test's
   own choice, not a dependency**: **`state₀ = 20260927`**;
   **`stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`**; **each draw applies ONE LCG step and the
   resulting state selects the pool member — `index = stateₙ₊₁ mod pool.length`** — so **one pool draw
   consumes exactly ONE LCG step.** **Stated so no TestWriter reads a two-step or a scaling form into
   it: there is NO `next(k)` helper in this register** (a pool draw is an index, never a bounded
   integer), **and `pool.length` participates in NO binding rule beyond that one modular reduction.**
   **No `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.**
3. **Caps, uniform for the whole register:** **≤100 attempts per row, ≤400 attempts in total**, rows
   evaluated **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running
   row's remaining attempts are abandoned and no further row starts). **A register row is never
   refused on the ground that "no PBT harness exists"** (the gate-11 ruling's decisive point).
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** A register row
   **proves its quantification by enumeration**; the `§3` rows remain the per-state contract rows a
   TestWriter derives first, and **no `§3` row is weakened, widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row here is `YES` or
   `YES (bounded)` by **enumeration over a FINITE, pinned input set**, and each row's cell states that
   input set exactly. **`3` of the `8` rows carry the honest `YES (bounded)` marking**
   (`P-ZN-IM-1`, `P-ZN-TP-1`, `P-ZN-TP-2`) because in each the **property text is larger than its
   enumeration**; the other `5` rows are `YES` over a fully enumerated domain the row's statement
   matches exactly. **No row is marked `NOT EXECUTED`.**
6. **The register's own boundaries, named rather than silently relied on:** (a) **no `Symbol`-keyed
   census is a driven *positive* case** — a `Symbol` `zoneId` is driven and must answer `false`
   (`F-4`), but the module is **never required to look one up as a key**; (b) **no Proxy whose traps
   return inconsistent answers across reads** is in any pool (the hostile-Proxy shapes are
   `P-ZN-IM-3`'s **fixed** table, deliberately, so no draw is ambiguous); (c) **the generator's pool
   is a SUBSET of the input space this contract pins**, and **its silence about a shape it does not
   list is a stated boundary, not an unrecorded omission**.

| ID | Type | Property | Executed? | Compensating sample rows (§3) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-ZN-IM-1`** *(the EMPTY-TOKEN quantification — required row (i))* | `P-IM` invariant | **For EVERY size that is not a finite non-negative number — every non-finite value (`NaN`, `±Infinity`), every negative number (including `-Number.MIN_VALUE`), and every non-number (a numeric string, a `BigInt`, a `Symbol`, a function, `null`, `undefined`, an object, an array, a boolean) — `trackFor` returns `spec.emptyToken` VERBATIM: byte-identical, never trimmed, never case-folded, never prefixed or suffixed, never replaced by any mechanism literal — AND, in the same call, `size` and `unit` are consulted for NOTHING.** **The converse half, asserted in the same row: a truthy `empty` yields the empty token for ANY size, including a valid one, and a falsy `empty` NEVER yields it for a valid size.** | **YES (bounded — the property text says "EVERY" while the table enumerates the `20` input classes below plus the `10` flag drives; the exhaustive claim is over the enumerated classes, which is the whole domain `§2.3` item 1 pins, and nothing larger is claimed)** | `F-2`, `M-5`, `M-6`, `M-10`, `M-11`, `M-12`, `I-4`, `I-5`, `§2.3` item 1, `§2.4` item 2 | `S-ZN-EMPTY-1` | **`30` attempts**, driven in fixed order = **`20` size-class drives + `10` flag drives**, one `trackFor` call each. **The `20` size classes, each driven once with a spec whose `emptyToken` is a caller sentinel (`'SENTINEL-A'`) and whose `unit` is a second sentinel (`'SENTINEL-U'`):** **(1)** `NaN` · **(2)** `+Infinity` · **(3)** `-Infinity` · **(4)** `-1` · **(5)** `-0.5` · **(6)** `-Number.MIN_VALUE` · **(7)** `'12'` · **(8)** `'0'` · **(9)** `12n` · **(10)** `0n` · **(11)** `Symbol('s')` · **(12)** a function · **(13)** `null` · **(14)** `undefined` · **(15)** `{}` · **(16)** `[]` · **(17)** `true` · **(18)** `false` · **(19)** `-1` re-driven with `emptyToken: 'none'` · **(20)** `-1` re-driven with `emptyToken: ''`. **The `10` flag drives:** **`5` truthy** — `empty = true` with `size = 120`; `true` with `NaN`; `true` with `-1`; `true` with `0`; and `true` with a spec whose `emptyToken` is a **second, different sentinel** (which is what proves the token is caller data); **`5` falsy controls** — `empty` as `undefined` (omitted), `null`, `false`, `0` and `''`, each with `size = 120`, **each asserting the result is NOT the empty token**. **Per attempt assert:** the returned value **`===` the exact expected string** (the sentinel, byte for byte), that the sentinel **`unit` does not occur** in the result, and that classes `(19)`/`(20)` **differ from** class `(4)` (`!==`) — **the three drives with different `emptyToken`s are what make a hard-coded literal impossible.** |
| **`P-ZN-TP-1`** *(the NO-THROW / TYPE-TOTALITY quantification — required row (ii))* | `P-TP` totality | **For EVERY input shape in the pinned `20`-shape pool below, BOTH functions are TOTAL: `isEmpty(census, zoneId)` returns a `boolean` (never `null`/`undefined`/an object) and NEVER throws, and `trackFor(spec, size, empty)` returns a `string` (never `null`/`undefined`/a number) and NEVER throws** — over **every** pairing the row drives, including a hostile `Proxy`, throwing accessors, a throwing `Map.get`, a `Symbol`, a `BigInt` and an unreadable spec — **and neither call leaves a value a later call cannot read** (`I-1`, `I-2`). | **YES (bounded — the property text says "EVERY input shape" while the pool holds `20` distinct shapes; the universal is NOT proven, and no reader may read this row as its proof)** | `I-1`, `I-2`, `M-13`..`M-17`, `F-1`, `F-2`, `F-3`, `F-4`, `F-5` | `S-ZN-TOTAL-1` | **`90` attempts**, one attempt = **one call of one function**, driven in fixed order = **`40` pool drives + `50` fixed hostile pairings**. **The `40` pool drives** = the `20`-shape pool × `2` **cycling axis bindings** **⟶ CORRECTED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): THIS `20` × `2` + `50` IS THE ONE TRUE DECOMPOSITION of the row's `90`, and the "Attempt-arithmetic" table below is corrected to it IN PLACE.** The as-filed table printed *"`20` pool shapes × `3` cycling method-axis bindings = `60`, + `30` fixed hostile pairings"* — a DIFFERENT PARTITION of the same `90`, and a second, incompatible derivation of the row's parts; the **strategy cell's partition is the sound one and the TABLE was the defect** (its `30` contradicts the row's own itemization `5+2+2+2+1+4+4+30` = `50`, and its `3` bindings would drive a third axis this row does not have). **The driving half is `40` = `20` shapes × `2` one-call-per-function bindings; the fixed half is `50`; `40 + 50 = 90`.** Each printed form stays visible at its own site with this date and this reason, **and no term, id or strategy id moved** (`§5.5.1`'s honest statement of the reconciliation: `§5.3` items 10/11). — for pool index `i` the functions are driven in the fixed order `[isEmpty(census, zoneId), trackFor(spec, size, empty)]`, where each drawn shape is bound to the position it can legally occupy (a value that is a `TrackSpec`-shaped record is driven as `spec`; everything else is driven as BOTH a `census`/`zoneId` pair and a `size`/`empty` pair), **so both functions and all of the pool's members are covered inside the `40`** — **`40` attempts.** **The pool's `20` DISTINCT shapes, each counted once:** **(1)** `null` · **(2)** `undefined` · **(3)** `42` · **(4)** `'x'` · **(5)** `true` · **(6)** `Symbol('s')` · **(7)** `0n` · **(8)** a function · **(9)** `{}` · **(10)** `[]` · **(11)** `{a: 0}` · **(12)** `{a: 3}` · **(13)** `Object.create(null)` carrying `a: 0` · **(14)** a frozen `{a: 0}` · **(15)** `new Map([['a', 0]])` · **(16)** `new Map()` · **(17)** `new Set(['a'])` · **(18)** a **throwing-accessor** record · **(19)** a **hostile `Proxy`** (throwing `get`/`has`/`getOwnPropertyDescriptor`) · **(20)** a **valid `TrackSpec`** (`{trackProp:'--t', unit:'px', emptyToken:'0px'}`). **The `50` fixed hostile pairings**, driven in fixed order and counted one call each: `(19)` × `trackFor` with `NaN`, `-1`, `120`, `'12'`, `null` (`5`); `(18)` × `trackFor` with `120`, and `(18)` × `isEmpty` (`2`); `(20)` × `isEmpty` (a spec passed where a census belongs ⇒ `false`) and `(20)` × `isEmpty` on a `Symbol` `zoneId` (`2`); `(15)` with a **throwing `get`** × both functions (`2`); `(11)` × a `Symbol` `zoneId` (`1`); `(13)` × every one of `'a'`/`'zzz'`/`42`/`Symbol('a')` as `zoneId` (`4`); `(14)` and `(20)` **frozen** × both functions (`4`); and the **`30` cross-product pairings of the `6` non-record shapes `(1)`–`(4)`, `(6)`, `(7)` with the `5` `[isEmpty, trackFor]` shapes `(9)`, `(10)`, `(15)`, `(18)`, `(19)`** (`30`) — **`5+2+2+2+1+4+4+30 = 50`.** **Per attempt assert:** the returned value is of the **declared type** (`typeof` check), **no throw**, and **the same call repeated immediately returns an equal value** (`I-3`'s determinism half). |
| **`P-ZN-IM-2`** *(the `-0` / ZERO-BOUNDARY quantification — the clause the ledger does not name)* | `P-IM` invariant | **For EVERY zero-valued input, the outcome is the NON-EMPTY one on both sides: `trackFor` with `size = -0` (or `0`) returns `String(size) + unit` — a `'0'` numeric text, with NO negative sign and NO empty token — and `isEmpty` with an own census value of `-0` (or `0`) returns `true`.** The row's whole purpose is to pin **`§0A` note 4** and to make a module that **inspects the sign of zero, or that folds a zero track into the empty case, FAIL.** | **YES** | `M-5`, `M-6`, `M-15`, `F-5`, `I-5`, `§2.3` item 1 (c), `§2.3` item 2 (i) | `S-ZN-ZERO-1` | **`36` attempts** = **`6` zero-valued sizes × `6` fixed drives**, driven in fixed order. **The `6` zero values:** `0` · `-0` · `0 * -1` (a computed `-0`, so a literal-collapsing parser cannot hide it) · `0.0` · `Number('0')` · `-0` re-driven with `Object.is` asserted. **The `6` drives, per value:** **(a)** `trackFor` with an `emptyToken` sentinel and `empty` falsy ⇒ asserts the **exact** `'0' + unit` string and `Object.is(returned, emptyToken) === false`; **(b)** the same with `unit: ''` ⇒ `'0'`; **(c)** the same with `empty = true` ⇒ the **empty token** (the opposite limb, proving limb (a) precedes); **(d)** `isEmpty` on a record owning the value under `'a'` ⇒ `true`; **(e)** `isEmpty` on the **`Object.create(null)`** record owning it ⇒ `true`; **(f)** `isEmpty` on a `Map` holding it ⇒ `true`. **Per attempt assert** the exact string or boolean, and — for the `-0` values — that the emitted string **does not begin with `'-'`**. |
| **`P-ZN-IM-3`** *(the CENSUS-DOMAIN quantification — required row (iii))* | `P-IM` invariant | **For EVERY census shape in the row's `13`-shape domain and every `zoneId` in its `4`-shape domain, `isEmpty` returns the DECLARED boolean AND the census is OBSERVABLY UNCHANGED afterwards: no key added, removed or defaulted; no own property written; `Object.getPrototypeOf(census)` unchanged (`M-17`); `Object.keys(census)` unchanged; a frozen census stays frozen and answers identically; and no value is ever memoized between two calls.** **The three semantic clauses the row asserts in the same pass:** an **absent** key ⇒ `false`; a **non-zero** own value ⇒ `false`; an own value **exactly `0`** (including `-0`) ⇒ `true` — **and, for the record shape, a key present only on `Object.prototype` ⇒ `false` (never a prototype read).** | **YES** | `M-13`..`M-17`, `F-3`, `F-4`, `F-5`, `I-6`, `I-7`, `§2.3` item 2, `§0A` note 3 | `S-ZN-CENSUS-1` | **`52` attempts** — **`13` census shapes × `4` `zoneId` shapes = `52`**, driven in fixed order (census-major). **The `13` census shapes:** **(1)** `null` · **(2)** `undefined` · **(3)** `42` · **(4)** `'x'` · **(5)** a function · **(6)** `[]` (an **array** — deliberately `false`, `§0A` note 3) · **(7)** `['a']` · **(8)** `new Set(['a'])` · **(9)** `new Map([['a', 0], ['b', 2]])` · **(10)** `{a: 0}` · **(11)** `{a: 3}` · **(12)** `Object.create(null)` carrying `a: 0` · **(13)** a frozen `{a: 0}` **plus** a record whose own accessor for `'a'` throws (driven as one shape's two variants, counted once). **The `4` `zoneId` shapes:** `'a'` · `'zzz'` · `42` · `Symbol('a')`. **Per attempt assert:** the returned **boolean** and its **exact expected value for that pair**; then a **post-call snapshot** of the census (`Object.keys` order+content, `getPrototypeOf`, `Object.isFrozen`, and `Map.size` where applicable) **reference- and value-identical to the pre-call snapshot**; and a **second immediate call** returning the same boolean. |
| **`P-ZN-SM-1`** *(the DECISION-TABLE quantification — required row (iv))* | `P-SM` state-machine | **For EVERY cell of the decision table — the cross-product of the four size classifications with the four spec classes — the emitted token is EXACTLY the one `§2.3` item 1's limb order prescribes, and the limb ORDER is what decides:** a truthy `empty` beats an invalid size; an invalid size beats a valid one; `trackProp` decides nothing; and a malformed spec yields `''` (never the empty token, never `String(size) + unit`). **No cell may be satisfied by a different limb's outcome** — the row asserts the **pair** `(cell, expected outcome)`, so a module that reorders the limbs **FAILS** on at least the cells where the limbs disagree. | **YES** | `M-1`..`M-12`, `F-1`, `F-2`, `F-6`, `F-7`, `I-4`, `I-5`, `§2.3` item 1 | `S-ZN-TABLE-1` | **`68` attempts**, driven in fixed order = **`16` exhaustive decision-table cells + `52` fixed additional drives**. **The two counted components, and they are the row's whole arithmetic:** **(a) the `16` cells** = **`4` size classifications × `4` spec classes**. The classifications: **(S1)** a finite non-negative number (`120`) · **(S2)** `NaN` · **(S3)** `-1` · **(S4)** `'12'` (a non-number). The spec classes: **(C1)** the well-formed spec · **(C2)** `null` · **(C3)** `{}` (missing fields) · **(C4)** `{trackProp:'--t', unit: 3, emptyToken:'0px'}` (a non-string field). **C1's four cells assert `String(size)+unit` once (S1) and `emptyToken` three times (S2/S3/S4); C2/C3/C4's twelve cells assert `''` for every size classification.** **(b) the `52` fixed additional drives** = **`20` `empty`-sweep drives + `32` limb-order drives**: the `20` sweep drives cross `empty` ∈ {`true`, `'x'`, `1`, `[]`, `{}`} (truthy) and {`false`, `0`, `''`, `undefined`, `NaN`} (falsy) — **⟶ CORRECTED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): THE `20` IS `10` `empty` VALUES × `2` SIZE CLASSIFICATIONS, and that product is what makes the declared term `20`.** The as-filed cell printed *"with `C1` × `S1`"*, which reads as **`10`** drives and **cannot** reach the row's own arithmetic (`16 + 20 + 32 = 68`); the row's **SECOND axis is the SIZE classification, not a second spec class**, and it is exactly the **converse half the row's property states**: **(S1)** a finite non-negative number (`120`) — a truthy `empty` **overrides a VALID size**, so a module that inspects the size first FAILS here; **(S2)** an invalid size (`NaN`) — a falsy `empty` **never** yields the token, and a truthy `empty` still does, so the pair separates limb (a) from limb (b) **in this column, where they disagree**. `10` × `2` = **`20`**, and **no term moved, so the `369` total stands.** — **the two axes pinned: `empty` (the `10` values above) × the size classification (`S1` valid, `S2` invalid) = `20`**, with `C1` the well-formed spec on both halves (asserting that a truthy `empty` **overrides a VALID size**, and that a falsy `empty` **never** yields the token); the `32` limb-order drives are the **SAME `16` cells re-driven once each with `empty = true` and once each with `empty = false`** (`16 × 2 = 32`) — **each cell's expected outcome is therefore checked TWICE, once per flag, because that is the only drive in which a limb-ORDER difference is observable** (the `16` table cells above are the `empty = false` half's first pass; the `32` re-drives are what make the ordering claim falsifiable rather than merely consistent). **Per attempt assert** the exact returned string and, for C2/C3/C4, that `''` **is not** the spec's `emptyToken` (the two strings deliberately differ in this row's data). |
| **`P-ZN-SM-2`** *(the PURITY / NO-RETENTION quantification — required row (v))* | `P-SM` state-machine | **For EVERY entry of the row's fixed table, the call mutates nothing it was handed and retains nothing: after the call, the spec record, the size binding and the census are reference-identical AND value-identical (a post-call snapshot deep-equals the pre-call snapshot), a FROZEN spec/census behaves exactly like its unfrozen twin, and the SAME entry driven twice in sequence returns an equal value both times — i.e. no memo, no cache, no counter and no module-level state exists.** | **YES** | `I-3`, `I-6`, `M-18`, `F-5`, `§2.4` item 5, `§2.2` P-4 | `S-ZN-PURITY-1` | **`12` attempts** — **`3` caller objects × `2` access patterns × `2` frozen/unfrozen twin forms = `12`**, driven in fixed order. **The `3` caller objects:** **(1)** a spec record · **(2)** a census record (with a `Map` as its `(2)`-twin) · **(3)** a spec whose `emptyToken` is read through an **own accessor**. **The `2` access patterns:** **(a)** `trackFor(spec, size, empty)` and **(b)** `isEmpty(census, zoneId)`. **The `2` twin forms:** unfrozen, and **`Object.freeze`d before the call**. **Per attempt assert:** a pre-call snapshot (own keys in order, each value by `Object.hasOwn` + index, `Object.getPrototypeOf`, `Object.isFrozen`) **deep-equals** the post-call snapshot; the returned value is unchanged by freezing; and **the same call repeated returns an equal value**. |
| **`P-ZN-IM-4`** *(the NO-OWN-CHARACTER quantification — the clause that makes "no built-in literal" falsifiable)* | `P-IM` invariant | **For EVERY legitimate (well-formed, non-empty) spec in the row's `3`-spec × `5`-size matrix, the returned string is EXACTLY `String(size) + spec.unit` — so the mechanism contributes NO character of its own and the `unit` is the ONLY suffix.** **The converse: the empty token appears in the result IFF a limb fired** (`I-5`), and **a spec whose `unit` is a full declaration is emitted verbatim.** | **YES** | `M-1`, `M-2`, `M-4`, `M-7`, `M-8`, `M-9`, `F-6`, `I-4`, `§2.4` items 1/2/3 | `S-ZN-FORMAT-1` | **`15` attempts** = **`3` spec shapes × `5` size values**, driven in fixed order. **The `3` spec shapes:** **(u1)** `unit: 'px'` · **(u2)** `unit: ''` (the bare-number form, `F-6`) · **(u3)** `unit: 'px; color: red'` (the verbatim-declaration form, `M-9`) — each with a **distinct `emptyToken` sentinel**. **The `5` size values:** `0` · `1.5` · `0.1 + 0.2` · `1e21` · `Number.MAX_VALUE`. **Per attempt assert:** the exact expected string built by the row from `String(size) + unit` **independently of the module**, that the sentinel `emptyToken` **does not occur** in it, and (for `u1`) that no character is inserted before the numeric text. |
| **`P-ZN-TP-2`** *(the SIZE-TEXT quantification — the pinned-seed pool draw)* | `P-TP` totality | **For EVERY size drawn from the pinned `28`-value pool under each of the row's `3` spec shapes, the emitted numeric text is `String(size)` VERBATIM — no rounding, no truncation, no `toFixed`, no `toPrecision`, no locale form, no radix change, no separator and no exponent normalization** — and every draw is a **finite number**, so **no NON-NEGATIVE draw may yield the empty token, and a NEGATIVE draw MUST yield it** (a non-negative draw that yields the empty token is the ROW's failure, not a boundary). **⟶ CORRECTED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass; the as-filed form is kept beside it): the filing printed *"every draw is a finite non-negative number, so no draw may yield the empty token"* — and THE POOL CONTRADICTED THAT BOUNDARY, which is the defect class this pass exists to catch.** **Pool member #23 is `Number.MIN_SAFE_INTEGER + 1` = `-9007199254740990`, a NEGATIVE number**, and the pinned seed **DOES draw it — at draw positions 29, 57 and 65 of the 66 (pool index 22, 0-based; one LCG step per draw)**. Taken literally, the as-filed sentence made the row's per-draw assertion **unsatisfiable by any contract-conforming module for those three draws**, because `§2.3` item 1 (b) makes a negative size yield the empty token (the `P-PJ-TP-1`/`ADV-PJ-6` class, ruled rather than tolerated). **THE RULING IS (A) — THE NEGATIVE MEMBER IS INTENTIONAL, AND THE PROPERTY TEXT IS NARROWED TO THE TRUTH:** the member is a **hostile/negative shape the pool deliberately includes** (it sits beside `Number.MAX_SAFE_INTEGER` and is the pool's only sign-boundary value; the sibling `U-PROJ` pool carries the same member), so the row asserts **(i)** every draw is a **finite** number, **(ii)** a **non-negative** draw emits exactly `String(drawn) + unit` and may **not** yield the empty token, and **(iii)** a **negative** draw emits `spec.emptyToken` **VERBATIM** — the `§2.3` item 1 (b) limb, asserted **per draw** at the three positions named above. **Ruling (B) — a pool typo corrected to `Number.MAX_SAFE_INTEGER + 1` — was CONSIDERED AND DECLINED**, because a pool value contradicting its own row's boundary is a defect only in the *text* here: the value is a **legitimate hostile size the pool has every reason to carry**, and correcting the pool would have changed **which shape three draws exercise** while proving *less* (a positive draw never exercises the empty limb). **The seed, the step form (`stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`, ONE step per draw, `index = stateₙ₊₁ mod 28`), the `28`-value pool and the `66` draws are ALL UNCHANGED, and the declared term stays `66` — so the `369` total is unchanged.** | **YES (bounded — the property text says "EVERY size" while the pool holds `28` distinct values and the draw count is `66`; the universal is NOT proven)** | `M-2`, `M-7`, `M-8`, `I-4`, `§2.4` item 3, `A-1` | `S-ZN-SEED-1` (the generator) with `S-ZN-POOL-1` (the row's draw strategy) | **`66` attempts** = **`66` pinned-seed draws** over the pool, driven in draw order; **a draw binds its pool value to a spec shape by `SPECS[d mod 3]` and applies ONE LCG step per draw** (`state₀ = 20260927`; `index = stateₙ₊₁ mod 28`). **The `28`-value pool (each counted once):** `0` · `-0` · `1` · `2` · `1.5` · `1024.25` · `0.1 + 0.2` · `Number.MIN_VALUE` · `Number.MAX_VALUE` · `Number.EPSILON` · `1e-7` · `1e-21` · `1e21` · `1e308` · `5e-324` · `2 ** 53` · `2 ** 53 + 1` (the precision boundary) · `9007199254740993` · `0.0001` · `1/3` · `Math.PI` · `Number.MAX_SAFE_INTEGER` · `Number.MIN_SAFE_INTEGER + 1` · `123456789.123456789` · `1e-6` · `1e6` · `0.5` · `3.25`. **The `3` spec shapes:** `unit: 'px'`, `unit: ''`, and `unit: 'fr'`, each with an `emptyToken` sentinel. **Per attempt assert (⟶ CORRECTED 2026-09-27, the RED-RUN REGISTER-RECONCILIATION pass — the as-filed form is kept beside it): for a NON-NEGATIVE draw the returned value is **`===` `String(drawnSize) + unit`**, computed by the row from the **same literal**; for a NEGATIVE draw (draws 29, 57 and 65) the returned value is **`===` `spec.emptyToken` VERBATIM**, the `§2.3` item 1 (b) limb, so the row drives BOTH halves of its narrowed boundary and neither half can pass for the other.** *As filed, this clause read "the returned value `===` `String(drawnSize) + unit`, computed by the row from the same literal" — which is exactly what made the three negative draws unsatisfiable.* **Both halves carry** the sentinel-absence check and a **repeat call** returning the identical string. **Boundary, stated: the row asserts NOTHING about how a browser treats the string** (`I-10`, `R-7`) — only that the module produced exactly `String(size) + unit`. **⟶ AND THE ROW'S OWN DRAW ARITHMETIC, PINNED SO A READER CAN CHECK IT (ADDED 2026-09-27, the RED-RUN REGISTER-RECONCILIATION pass): the `66` draws DECOMPOSE as `63` NON-NEGATIVE draws + `3` NEGATIVE draws, and the `3` are exactly draw positions `29`, `57` and `65` (all three selecting pool index `22`, 0-based, under the pinned seed and the one-step-per-draw LCG). The `63` non-negative draws assert `String(drawn) + unit` with the sentinel-absence check; the `3` negative draws assert `spec.emptyToken` VERBATIM. `63 + 3 = 66`, and the declared term is the `66` — no term moved and the `369` total is unchanged.** |

**⟶ THE REGISTER'S HONESTY BLOCK — what is NOT proven here (stated so no reader over-reads a `YES`).**

1. **Three rows carry the honest bounded marking, and it is not a formality.** `P-ZN-IM-1`'s
   statement quantifies over **every** non-representable size while its table enumerates **`20` input
   classes**; `P-ZN-TP-1`'s statement quantifies over **every** input shape while its pool holds `20`;
   `P-ZN-TP-2`'s statement quantifies over **every** size while its pool holds `28`. **None of the
   three is a proof of its unbounded universal**, and **a DONE row that reports any of them as one is
   a review finding.** **⟶ ADDED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): `P-ZN-TP-2`'s pool is ALSO the row whose boundary text had to be NARROWED, so a DONE row must report it in its corrected form — *every draw is finite; a non-negative draw emits `String(drawn)+unit`; a negative draw emits `spec.emptyToken`* — with the three negative draws (positions `29`, `57`, `65`, pool index `22`) named. A DONE row that repeats the as-filed *"no draw may yield the empty token"* sentence is reporting a boundary the pool contradicts.**
2. **`P-ZN-TP-1`'s pool is a SUBSET of the input space, by construction** (strategy-discipline item 6).
   It holds `20` shapes; **a `Symbol`-KEYED census, a `Proxy` with inconsistent traps, and a
   hostile `Symbol.toPrimitive` on the SIZE are boundary cases that are either driven as fixed shapes
   in another row or deliberately excluded**, and **their exclusion is stated rather than silently
   relied on.**
3. **`P-ZN-IM-3`'s `13` census shapes are the shapes THIS spec names, not a larger domain.** An
   implementation that invented a **fourteenth** census interpretation (say, treating a `Set` as
   membership ⇒ non-empty) **would be a `§7` item 7 (v) finding and would be caught by the row's exact
   expected values** — but **a shape this spec never contemplated would not be enumerated by it.** The
   row is an enumeration over a stated domain, never a proof about an unstated one.
4. **`P-ZN-SM-1`'s `16` table cells bind WELL-DEFINED spec classes only.** A spec whose **field reads throw
   at different times**, or whose record is a **revoked `Proxy`**, is the `F-1`/`P-ZN-TP-1` territory —
   **and the two malformed-cell classes are deliberately coarse (`''` for all three field failures),
   because this unit has no diagnostic vocabulary** (`§2.3` item 4). **The row states that coarseness
   in its own assertion messages** rather than implying a per-field distinction.
5. **The `S-ZN-SEED-1` generator's draw count (`66`) is NOT a pool-coverage claim.** **A draw is a
   draw, not a sweep**: `66` draws over a `28`-value pool do **not** guarantee that every member is
   drawn, **and no row may assert "all 28"** — **the execution record's DISTINCT-MEMBER count is a
   REPORTED figure** (`§5.3` item 11), and **a DONE row claiming "three full cycles of the pool" is a
   review finding.**
6. **No register row resolves a `§7a` item.** Every `§7a` item is **already ruled** in `§0A`/`§7a.1`
   as contract text, so a register row **may** be read as resolving **the half its ruling decides** —
   **but no register row is ADDED by a ruling, no row's `YES` marking changes, no strategy id moves,
   no per-row term moves and the `369` total is unchanged** (`400` was the as-filed mis-sum) *(**⟶ CONFIRMED 2026-09-27 by the RED-RUN REGISTER-RECONCILIATION pass: the four cell rulings of this pass changed NO per-row term — `P-ZN-TP-1` stays `90` (`40 + 50`) and `P-ZN-SM-1` stays `68` (`16 + 20 + 32`) — so this clause holds exactly as written and the total stays `369`.**)* (`§5.3` item 11's arithmetic is the
   authority).

**⟶ THE POOL-VERSUS-BOUNDARY RULE (ADDED 2026-09-27, the RED-RUN REGISTER-RECONCILIATION pass — the class the `P-ZN-TP-2` contradiction exposes, stated here because it outlives this register).** **THE RULE THE REGISTER KEEPS: *a pool or table member that contradicts the row's own declared boundary is a REGISTER DEFECT, and the RED RUN is where it is caught.*** **Concretely, for every register row:** **(i)** a drawn/enumerated member must **satisfy the row's boundary text** or the row must **declare that member as an intended class** with its expected outcome asserted **(per member, not by category)**; **(ii)** where a member is an intended hostile/negative class, the row asserts that member's **own** limb outcome, so the boundary text and the drawn members agree **byte for byte**; **(iii)** a boundary sentence that quantifies over the whole pool (*"every draw is …"*) is a claim about **every listed member** and is checked against the list **at authoring time**, not at green time. **The check this pass ran over all EIGHT rows, and its result:** **`P-ZN-TP-2` was the ONLY row carrying the contradiction** — **the other seven are CLEAN, and they are clean in the specific sense that every member of each row's pool/table satisfies that row's boundary text**, as recorded member-for-member: **`P-ZN-IM-1`** — all `20` size classes are exactly the *"not a finite non-negative number"* domain its text names (`NaN`, `±Infinity`, `-1`, `-0.5`, `-Number.MIN_VALUE`, `'12'`, `'0'`, `12n`, `0n`, `Symbol('s')`, a function, `null`, `undefined`, `{}`, `[]`, `true`, `false`, and three re-drives of `-1` under different caller `emptyToken`s), and **`-0` is deliberately ABSENT from that list** — it is `§5.5.1 P-ZN-IM-2`'s domain, so no member here contradicts the limb. **`P-ZN-TP-1`** — all `20` pool shapes are driven as `boolean`/`string`-totality inputs only, and the row claims **no** value/emptiness boundary at all, so there is nothing for a member to contradict; the `50` fixed pairings' expectations (`false`, `true`, `'120px'`) match the shapes they bind. **`P-ZN-IM-2`** — all `6` zero values (`0`, `-0`, `0 * -1`, `0.0`, `Number('0')`, `-0` re-driven) are zero-valued in the `===`-sense its boundary names, and the row does **not** claim a sign-free input — it asserts the sign-free OUTPUT (`'0' + unit`, no leading `-`), which the members can satisfy. **`P-ZN-IM-3`** — the `13` census shapes' declared `trueFor` sets are consistent with *"own value exactly `0` under the string key `'a'`"*: only `{a: 0}`, `Object.create(null)` carrying `a: 0`, the frozen `{a: 0}` and the `Map` carry an own `0`, and **the throwing-accessor variant of shape `(13)` is pinned to `false` in BOTH the row and the drive** (`§2.3` item 2 (v)) — **the one place a variant could have contradicted the shape's own declared value is the place the row already rules the other way.** **`P-ZN-SM-1`** — the `16` cells' expected outcomes and the `20` sweep + `32` re-drives all lie inside the `4 × 4` domain the row states, and **C4's own `emptyToken: '0px'` is never the expected `''`** (the two strings deliberately differ in the row's data). **`P-ZN-SM-2`** — every entry is a caller object the row hands to ONE access pattern; nothing in the table claims a value boundary. **`P-ZN-IM-4`** — all `5` size values (`0`, `1.5`, `0.1 + 0.2`, `1e21`, `Number.MAX_VALUE`) are finite and non-negative, which is exactly the row's `String(size) + unit` boundary, and **`unit: ''` is the one shape whose expected suffix is empty — asserted as the bare-number form rather than as a failure.** **THE CONSEQUENCE, stated for the DONE row and for the read-only PBT audit:** the audit must check **each pool member against its row's boundary text** as a first-class step, and **a mismatch found there is a SPEC FINDING reported in place — never a row tuned to green** (`§5.3` items 10/11, `§4.2` item 2). **No row, term, marking or id is changed by this rule.**

**Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES (one term per register row,
counted from the tables above).** **`30` (`P-ZN-IM-1`) + `90` (`P-ZN-TP-1`) + `36` (`P-ZN-IM-2`) +
`68` (`P-ZN-SM-1`) + `52` (`P-ZN-IM-3`) + `12` (`P-ZN-SM-2`) + `15` (`P-ZN-IM-4`) + `66` (`P-ZN-TP-2`)
= `369` attempts. *(**CORRECTED 2026-09-27 by the SPEC-GATE CLOSURE pass: the filing printed `400` as the total of `30+90+36+68+52+12+15+66`, whose true sum is `369` — the exact `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` defect the ACTIVE rule names, caught by the supervisor's gate-2 arithmetic check before the red set was authored. The as-filed `400` is kept visible at every site with the corrected `369` beside it; NO per-row term changed, so no row's design changes.**)***

| Row | Attempts | What counts as one attempt | Its terms |
| --- | --- | --- | --- |
| `P-ZN-IM-1` | **30** | one `trackFor` call on one enumerated class | `20` (size-class drives) + `10` (flag drives: `5` truthy + `5` falsy controls) = **30** |
| `P-ZN-TP-1` | **90** | one call of one function on one drawn/fixed triple | **⟶ CORRECTED 2026-09-27: `20` pool shapes × `2` cycling axis bindings = `40`, + `50` fixed hostile pairings (`5+2+2+2+1+4+4+30`) = **90**.** *(As filed this table printed `20` pool shapes × `3` cycling method-axis bindings = `60`, + `30` fixed hostile pairings = `90` — a SECOND, incompatible partition of the same total: the `3` would drive an axis this row does not have, and the `30` contradicts the row's own itemization `5+2+2+2+1+4+4+30` = `50`. The strategy cell's partition is the sound one and this table was the defect — RED-RUN REGISTER-RECONCILIATION pass, corrected IN PLACE; the as-filed form is kept visible here and no term moved.)* |
| `P-ZN-IM-2` | **36** | one drive of one zero-valued size | `6` zero values × `6` drives = **36** |
| `P-ZN-SM-1` | **68** | one decision-table cell, or one fixed additional drive | `16` cells (`4` size classifications × `4` spec classes) + `52` fixed additional drives (`20` `empty`-sweep = `10` `empty` values × `2` size classifications [`S1` valid, `S2` invalid], + `32` limb-order) = **68** |
| `P-ZN-IM-3` | **52** | one `(census, zoneId)` pair | `13` census shapes × `4` zoneId shapes = **52** |
| `P-ZN-SM-2` | **12** | one access pattern on one caller object in one twin form | `3` caller objects × `2` access patterns × `2` twin forms = **12** |
| `P-ZN-IM-4` | **15** | one `(spec shape, size)` pair | `3` spec shapes × `5` size values = **15** |
| `P-ZN-TP-2` | **66** | one pinned-seed draw | `66` draws (`S-ZN-SEED-1`, `state₀ = 20260927`, one LCG step per draw, `index = stateₙ₊₁ mod 28`) |
| **TOTAL** | **`400`** ⟶ **`369`** | — | **`369 ≤ 400` (under the register total cap); per-row maximum `90` (`P-ZN-TP-1`) `≤ 100`** — *(the as-filed `400` was the terms' mis-sum; corrected to the counted `369`, no term moved)* |

**How the counting works, so the numbers are checkable rather than asserted.** **One "attempt" = one
exercised DRIVE of one register row** — for the empty row one `trackFor` call on one class, for the
totality row one call of one function, for the table row one cell or one fixed drive, for the pool row
one draw. **Setup is NOT counted** (constructing a census, freezing a twin, snapshotting a value is
precondition, not attempt). **The DECLARED total is `369` (`= 30+90+36+68+52+12+15+66`; as filed `400`) and the caps are compared against it.**
**A DONE row reporting a total other than the one the test file's tables produce is a review finding**
(`§5.3` items 10/11): **the ledger's numbers are read against the test file's tables, exactly as
`§5.3` item 10 requires**, and **`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`
(ACTIVE) makes the printed arithmetic itself the assertion — *a total that is not the sum of its own
terms is a review finding*.** **This filing states its arithmetic plainly, and every term above is the
product or sum its own cell prints — the only reconciliation the filing had to make is recorded in
place at `P-ZN-SM-1`'s cell (its earlier `36`-cell phrasing was a mis-sum of a `4 × 4` product, and the
counted figures `16 + 52 = 68` are what a TestWriter drives and reports) rather than papered over.** **⟶ THE SECOND RECONCILIATION, ADDED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass), and it is recorded at its own cells as this paragraph requires: `P-ZN-TP-1`'s two printed partitions (`40+50` vs `60+30`) were reconciled IN PLACE to the strategy cell's `40 + 50 = 90` (the arithmetic table was the defect), and `P-ZN-SM-1`'s sweep term was pinned as `10` `empty` values × `2` size classifications = `20` (its as-written `C1 × S1` could not reach the declared `20`). Neither reconciliation moved a term: the eight terms above are the ones this spec declares, and their sum is `369`.**

**⟶ THE FOUR CELL RULINGS AND THE PASS RECORD (ADDED 2026-09-27, the RED-RUN REGISTER-RECONCILIATION pass — SPEC TEXT ONLY; this pass ran no test, no suite, no leg and no trio).** This block is **`§5.5.1`'s executed layer, recorded where the register is.** It does two things in the order the evidence requires: **(1)** it records the four rulings the red run forced, and **(2)** it records exactly which cells changed. **It amends NO register row's id, type, `S-ZN-*` strategy id or attempt term — and NOT the `369` total** — and it **moves no section number, renumbers nothing and creates no `§5.4`.** **Annotate-never-rewrite binds every correction: each superseded form stays visible at its own site with this date and its reason, and each ruling QUOTES the as-written form it supersedes.**

**RULING 1 — `P-ZN-TP-1`'s one true decomposition is `40 + 50`, and the "Attempt-arithmetic" table was the defect.** *The strategy cell prints `40` pool drives (`20` shapes × `2` cycling bindings) + `50` fixed hostile pairings (`5+2+2+2+1+4+4+30`); the attempt-arithmetic table printed `20` pool shapes × `3` cycling method-axis bindings = `60` + `30` fixed pairings.* **Both total the declared `90`, so the row was drivable — but two incompatible partitions of one total is an AMBIGUOUS derivation, and the red set drove the STRATEGY CELL's partition.** **RULED: `90 = 40 + 50`** — `40` = `20` pool shapes × **`2` cycling axis bindings** (the one-call-per-function pair `[isEmpty(census, zoneId), trackFor(spec, size, empty)]`), plus `50` fixed hostile pairings itemized `5+2+2+2+1+4+4+30`. **The table's `3`-binding/`30`-pairing form is CORRECTED IN PLACE and kept visible; the strategy cell is unchanged except for the dated banner that records this ruling.** **The drive is right and the cell that was wrong is the table** — stated explicitly, as the pass requires. **No term moved: `P-ZN-TP-1` stays `90`.**
**RULING 2 — `P-ZN-SM-1`'s `20` sweep drives are `10` `empty` VALUES × `2` SIZE CLASSIFICATIONS.** *The cell literally printed "the `20` sweep drives cross `empty` ∈ {5 truthy} and {5 falsy} with `C1` × `S1`", which as written is `10` drives — yet the declared term is `20` and the row's own arithmetic needs it (`16+20+32 = 68`).* **RULED: `20 = 10 × 2`**, where the second axis is the **SIZE classification** — **(S1)** a finite non-negative number (`120`), **(S2)** an invalid size (`NaN`) — **and `S2` is exactly the converse half the row's own property states** (*a truthy `empty` yields the empty token for ANY size*), so the sweep asserts limb (a) over a valid size and over an invalid one in the same column. **The derivation is now PINNED IN THE CELL (both axes named and multiplied), the term stays `20`, and the `369` total stands.**
**RULING 3 — `P-ZN-TP-2`'s pool member #23 is INTENTIONAL (ruling **(A)**), and the row's boundary text is narrowed to the truth.** *Pool member #23 is `Number.MIN_SAFE_INTEGER + 1` = `-9007199254740990`; the row declared every draw "a finite non-negative number … no draw may yield the empty token", and the pinned seed DOES draw it — draw positions `29`, `57` and `65` of the `66` (pool index `22`, 0-based, one LCG step per draw).* **Taken literally the row was unsatisfiable for those three draws by any contract-conforming module** (`§2.3` item 1 (b): a negative size yields the empty token) — the `P-PJ-TP-1`/`ADV-PJ-6` class. **RULED (A), NOT (B): the negative member is a deliberate hostile/negative shape; the property text is narrowed to — every draw is FINITE; a NON-NEGATIVE draw emits exactly `String(drawn) + unit` and may NOT yield the empty token; a NEGATIVE draw MUST yield `spec.emptyToken` VERBATIM, asserted per draw at the three positions named.** **(B) — a pool typo, `Number.MAX_SAFE_INTEGER + 1` — was considered and DECLINED:** the pool value has a legitimate purpose (it is the pool's sign-boundary member, beside `Number.MAX_SAFE_INTEGER`, and the sibling `U-PROJ` pool carries it), and substituting a positive member would **change which shape three draws exercise** while proving **less**. **The `28`-value pool, the seed `20260927`, the one-step-per-draw LCG, the `66` draws and the declared term `66` are all UNCHANGED — so NO term and NOT the `369` total changed, and the draw positions are the same three either way.**
**RULING 4 — `§2.3` item 1's limb precedence: the MALFORMED-spec rule is evaluated FIRST and gates the other three limbs.** *Item 1's stated order puts `Boolean(empty) === true ⇒ spec.emptyToken` before the malformed-spec rule, while `F-1`'s unconditional iff, `I-1`'s totality and `P-ZN-SM-1`'s own text all pin `''` for a malformed spec regardless of the flag — and the red set asserted `''` in BOTH flag halves (the `32` limb-order re-drives).* **RULED — the reading the drive used: for a MALFORMED spec `trackFor` returns `''` REGARDLESS of `empty` and `size`; the `empty` flag reaches a limb only for a WELL-FORMED spec.** **The limb list and the ordering sentence now agree with it** (the table's row `(d)` is evaluated first; `§2.1`'s `trackFor` doc-comment limb list carries the dated precedence line), and **the as-filed wording is kept visible at both sites.** **No limb was reordered, no row added, no term moved.**

**(2) The exact cells this pass changed (`§5.5.1` and the clauses the rulings land in).**

| # | Cell | What this pass wrote there |
| --- | --- | --- |
| 1 | **the header block** (after the FIRST STATUS NOTE) | a dated `SECOND STATUS NOTE — 2026-09-27, THE RED-RUN REGISTER-RECONCILIATION PASS`: the measured red (`57` rows · `50` red / `7` pass), the register stop (`P-ZN-IM-1`, `5` of `30` attempts, `0` held, seven rows un-run and reported as failures), the four cell defects and the two reconciled figures, the `369`-unchanged statement, and **the lesson** |
| 2 | **`§2.3` item 1's `(d)` row** | the dated **malformed-spec precedence** ruling (RULING 4), with the table's as-filed ordering sentence and limb list kept visible |
| 3 | **`§2.1`'s `trackFor` doc block** | the dated precedence line: the malformed-spec rule is evaluated first and gates the other three limbs |
| 4 | **`§5.5.1 P-ZN-TP-1`'s strategy cell** | the dated banner naming this `20 × 2 + 50` the ONE true decomposition, with the table's as-filed form quoted (RULING 1) |
| 5 | **`§5.5.1 P-ZN-SM-1`'s sweep clause** | the dated correction pinning `10` `empty` values × `2` size classifications = `20`, with the as-filed `"C1 × S1"` form quoted (RULING 2) |
| 6 | **`§5.5.1 P-ZN-TP-2`'s property text and its per-attempt clause** | the dated narrowing (finite draws; non-negative ⇒ `String(drawn)+unit`; negative ⇒ `spec.emptyToken`) with the as-filed sentence quoted, the three draw positions named, and ruling (B) declined in writing (RULING 3) |
| 7 | **`§5.5.1`'s new POOL-VERSUS-BOUNDARY RULE block** | the class rule, plus the member-for-member check of all EIGHT rows and the finding that `P-ZN-TP-2` was the only contradiction |
| 8 | **`§5.5.1`'s Attempt-arithmetic table, `P-ZN-TP-1` and `P-ZN-SM-1` rows** | the corrected terms (`40 + 50`; `10 × 2 = 20`) with the as-filed forms kept visible in the same cells |
| 9 | **`§2.2` P-1's cell and `§3.4 R-1`'s cell** | the two scan SCOPES (vocabulary = whole module file incl. comments; literal = code with comments stripped) and **the implementer doc-comment wording hazard** |
| 10 | **`§3.4 R-7`'s limit clause** | the CONFIRMED three-part bound (module file + the test file's raw bytes + its own row descriptions), the fragment discipline and the zero-self-hits verification |
| 11 | **`§4.1`'s red statement** | the actual red shape (fs probe + computed specifier ⇒ a LABELLED assertion), both shapes stated honestly, and the `7` passes identified by class |
| 12 | **this block** (`§5.5.1`, before the register change summary) | the four rulings, the cell table and the scope record |

**Scope of this pass, recorded so it is auditable (SPEC TEXT ONLY).** It **ran NO test, NO suite, NO leg and NO trio**, and **it executes none of the register rows** — the `YES` cells remain execution **DESIGN** (`§5.3` item 10). It **edited exactly ONE file** (`docs/specs/zones.md`) by **bounded anchored `edit`s** (never a whole-file `write`, `RCA-8(c)`), with **annotate-never-rewrite** discipline and **no section number moved** (`§5.3 → §5.5` still has no `§5.4`, and `§5.5.0` still does not exist). It **created no line-count census anywhere**, **touched no `tests/**`, no `src/**`, no `scripts/**`, no `package.json` and none of the trackers**, and **ran no `git commit`** — the tracker cells (`docs/next-steps.md`'s `E1` row still reading `docs/specs/zones.md` as *`OWED — not filed`*, and the unit's status) are the **supervisor's** to reconcile.

**Register change summary (what this filing did).** **No exemption is superseded here — there was
none** (`§5.5`'s note: no `§5.5.0` exists). **This register is `U-ZONES`'s own and is NOT a copy of
`docs/specs/projection.md` §5.5.1's or `docs/specs/engine-pin.md` §5.5's** — no row, table, pool or id
is shared, and **no engine-pin row is restated, extended or contradicted**, so **no second authority
over a landed register is created** (the discipline `docs/specs/projection.md` §8 states: *"a second
authority over a landed register is a finding"*). **It shares the TYPE ALGEBRA (`P-IM`/`P-SM`/`P-TP`)
and the STRATEGY DISCIPLINE** (deterministic tables, one pinned-seed hand-rolled LCG, caps
`≤100`/`≤400`, stop-after-5, no new dependency) **and nothing else.**

**Register integration with the legs and the DONE row (so the property layer is not an orphan).** The
register rows are carried by **the same node suite** `npm test` already runs (`§5.2` leg 1) in **this
unit's own** `tests/zones.test.ts` — **no new leg, no new file, no new script, no `package.json`
change, no new dependency** (`§5.1`'s diff scope is unchanged). **No `[U]` row exists to depend on**
(§5.2), so **no register row can be layer-blocked**. **`§5.3`'s DONE row carries items 10 and 11** (the
per-row counts, strategy ids, the pinned seed and its step form, the stop-after-5 status, the total
against the caps, the three `YES (bounded)` sentences, and the arithmetic printed **with its terms**).
**A read-only PBT audit may not report a row as executed on the strength of this table alone** — the
audit reads **the TestWriter's tables in `tests/zones.test.ts`** and **the ledger's numbers against
this cell**, because **every `YES` here is execution DESIGN and this pass ran nothing.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a pure mechanism cannot render a caller's track
token from *(a caller spec × a size × an injected emptiness flag)* while emitting ONLY caller-supplied
text and reading NO environment, then the `SCH-4`-as-mechanism shape is not realisable and the unit
fails.* **The falsification tests are `I-4`** (only caller text is emitted), **`M-10`** (two specs that
differ only in `emptyToken` yield two different tokens — which no built-in literal survives),
**`F-1`/`F-2`** (the empty class is a VALUE, and the malformed class is `''`), and **`P-ZN-IM-4`/
`P-ZN-IM-1`** (the register's two text-authority rows). **A "convenience" default token, a hard-coded
`'0px'`, a `unit` default, or a refusal union would each satisfy an apparent purpose while failing
`I-4`** — and each is the ledger's binding negative, not a judgement call.

**A second, independent falsification.** *If the emptiness decision cannot be taken from an INJECTED
census without the mechanism owning or remembering anything, then §1 item 2 and the `U-CENSUS`
delegation are not realisable.* **The test is `I-7` + `P-ZN-IM-3`** (the census is observably unchanged
across `52` pairs, no key is created or defaulted, no prototype member is read).

**A third, independent falsification.** *If the arithmetic claims cannot be made WITHOUT a rendered-
geometry claim, the unit exceeds its provable layer.* **The test is `R-7` + `I-10` + `§5.2`'s refusal to
offer a `[U]` row** — and the finding it prevents is `RK-19`'s (a later pass "proving" geometry from a
node-green).

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded **before**
implementation continues; (c) the unit is **declined back** — admissible only if a clause is shown to be
**inseparable from the census/app-data half** that `U-CENSUS` owns (which would be a finding that A-d4's
mechanism-only split is not realisable, and therefore a **new gate**, not this unit's call — `H-r1`'s
cite-and-supersede rule).

**Stop conditions (`S-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]` leg** —
it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This filing has
NO such row**: every claim in this file is arithmetic over arguments.

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **`BLOCKED` on the architect's go-ahead for wave E and on its own red set** (§0 ruling 12, `§4.5`),
   and its red set is **`OWED — NOT AUTHORED, NOT RUN`** (RCA-1). **⟶ AMENDED ON ITS RED-SET HALF
   ONLY, 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass; the as-filed sentence is kept visible
   above): the red set is no longer owed — `tests/zones.test.ts` was AUTHORED, RUN and REPORTED
   (`57` rows · `50` red / `7` pass, register stopped at `P-ZN-IM-1` after `5` attempts, `0` held), and
   this pass reconciled the register cells its run surfaced. The `DONE`-less, green-less and
   go-ahead-less half of the sentence STANDS EXACTLY AS FILED: the module still does not exist, no leg
   has been run, the unit is NOT delegable, and no status was advanced by this pass.**
2. **THIS UNIT IS A PURE `src/shared/` MODULE IMPORTED BY NO `src/**` FILE, and that is load-bearing
   for every claim below.** Until a consumer exists, **its green proves the CONTRACT HOLDS FOR A
   CALLER — not that the app behaves differently.** No window, no IPC round-trip, no MCP transport and
   no renderer behaviour changes when this module lands (`R-4` pins the claim; `§5.2` gives the
   structural reason no `[U]` row is offered).
3. **No CSS is shipped, in any form, by this unit** — `SCH-4`'s original bundle put the consumer's CSS
   in this mechanism's neighbourhood, and **A-d4 pulled in the mechanism only**: the four `:has()`
   rules and the collapse-override declaration **stay consumer-side** (ruling 3, `§1` item 3).
   **No stylesheet, no declaration, no class name and no `'0px'` literal** — the empty token is the
   caller's.
4. **No zone/track/pane/tab vocabulary exists in the mechanism** — not as a symbol, not as a union
   member, not as a default and not as a documented constant (prohibition 1, `H-r17`). **Every string
   the module emits is an argument it was handed**, and **the module does not even know that
   `emptyToken` may be `'0px'`.**
5. **The mechanism is outside the UI constraint BECAUSE IT IS NOT A UI ELEMENT**
   (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`): it authors no text, no control, no affordance, no class, no
   token value and no styling. **`AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED by this
   unit, and this unit needs no exception to them** — **the moment a later pass makes this module
   stamp a literal, a default or a label, it becomes a UI element authored outside the provident graph
   and a review finding.**
6. **THE GEOMETRY LIMIT, stated where a reader meets it.** **This unit asserts ARITHMETIC and NEVER
   rendered geometry.** *"The arithmetic is provable here; any claim about the rendered geometry is
   UNPROVABLE in this repo today."* **`trackFor` returns a string; whether a browser accepts it, applies
   it, or paints anything is not this unit's claim, not the node suite's claim, and cannot be made from
   this change set at all** (`§2.3` item 7, `I-10`, `R-7`, `§5.2`).
7. **Contract decisions this filing had to make where the ledger is silent, recorded so they are
   reviewable rather than implicit** (each is a `§0A` ruling note): **(i)** no `format` discriminator is
   added and the bare-number form is `unit: ''` (`§0A` note 5(b)); **(ii)** the malformed-spec outcome
   is the degenerate `''`, chosen over the empty token because a fabricated token would be a
   prohibition-3 default (`§0A` note 5(a), `F-1`); **(iii)** `isEmpty`'s `false` deliberately collapses
   *"non-empty"* and *"absent"*, because the function is two-valued and this contract has no
   diagnostic channel (`§2.3` item 5); **(iv)** the malformed-spec `''` and a legitimate `emptyToken:
   ''` are the same string, and a caller cannot distinguish them from one call (`F-8`); **(v)** a
   `Map` census is supported while an **array** and a **`Set`** are not, with the reason recorded
   (`§0A` note 3); **(vi)** `-0` is NOT an empty case on either side (`§0A` note 4). **Each is a
   decision, not a derivation — the sources are SILENT on all six.** **Unlike these six, the
   *"non-finite/negative ⇒ the empty token"* clause is NOT a decision made where the sources are
   silent: it is the ledger's own binding wording.**
8. **TWO dependencies are explicitly ABSENT, and this filing states that plainly rather than leaving it
   open.** **(a)** The adopted node-local interaction session **`U-GSESSION`** (`A-d3`/`S-d9`) is **NOT
   this unit's dependency** — the filing looked and found none: this module installs no listener, owns
   no element and takes no event source. **(b)** The **engine pin** (`A-d2`) is **spent** and is not a
   dependency either: the module imports nothing. **A dependency asserted later would be a fabricated
   edge** (`H-r6`'s dissolved-edge class); **`U-CENSUS` (row `E2`) IS a real and named dependency of
   the opposite direction — it depends on THIS unit** (§1 item 6).
9. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case
   coverage matrix and no demo-page index to update**. **`R-9` is the PROBE that keeps this claim
   falsifiable**, and **if that file comes to exist, this unit owes the coverage row and the demo-page
   entry** — with the honest note that a mechanism with no UI surface can only contribute an
   **absence** row.
10. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for this
    unit it is **also never a CSS-validity, applied-length, layout, paint or geometry green**. The
    `[U]` leg exists and is green (`U-REALDOM-BOOT` is `DONE`), so **the refusal to offer a `[U]` row is
    structural, not an excuse** (`§5.2`).
11. **No row of this unit claims a `bodyRuns`/`BARE-TEXT-EMIT` surface, an engine behaviour, or a
    package capability** (`H-r11`'s no-overclaim rule); **this unit exercises no engine surface at
    all.**
12. **The property register's `YES` markings are execution DESIGN, not results** (`§5.5.1`): this pass
    ran nothing, and **a row that is `YES` in `§5.5.1` but broken when the red runs is a SPEC FINDING,
    reported rather than tuned to green.** The register's arithmetic is printed **with its terms** —
    **`30+90+36+68+52+12+15+66 = 369`** *(as filed: `400` — corrected at the spec-gate closure; the terms never moved)* — and the one term this filing had to reconcile
    (`P-ZN-SM-1`'s earlier `36`-cell phrasing against its counted `4 × 4 = 16`) is recorded **in
    place** at that row's cell rather than papered over.

### 7a. Ambiguity report — clauses a TestWriter could NOT derive a falsifiable row from

**What this subsection reports, and how to read it.** **SIX clauses** of the ledger/A-d4 text left a
TestWriter unable to derive a **falsifiable** row as written: each is either **two texts naming
different signatures**, **under-specified**, or **a clause the ledger does not state at all**. **They
are REPORTED here rather than guessed** — the same discipline the three sibling specs used (their
passes found eight, nine and eleven such clauses respectively). **The report and the rulings are in ONE
table below** (`§7a.1`), because **this filing rules all six at filing time**: the report column pair
states **what could not be derived and why**, and the ruling column states **the contract text the
ruling produces and where it lands**. **No `§3` row, prohibition, register row or diff-scope clause is
weakened, widened or re-scoped by this report** — and **no item is left as a silent gap.**

### 7a.1 THE RULINGS — all six items ruled at filing (2026-09-27), so the delegation gate's ambiguity list is EMPTY

**Why this pair of subsections exists, and what it is.** `AGENTS.md` item 9's delegation gate requires
that the list of clauses a TestWriter **cannot** derive a falsifiable row from be **EMPTY or explicitly
parked** before a red set is authored. **This filing reports SIX such clauses and rules every one of
them**, from the contract's own majority reading and with the clause that decides it. **`6` items
reported · `6` ruled · `0` OPEN QUESTIONS · `0` items needing the architect.** **The report is kept
visible and the rulings are contract text**: a TestWriter writes against `§7a.1`, and **a row written
against a report-table reading instead of a ruling is the `C-16`/`RK-10` class** (a contract
reverse-engineered from a guess).

| # | The clause(s) that disagree | Why a falsifiable row could not be derived as written | My reading (best available, NOT a ruling) | Owner | **THE RULING (`§7a.1`) — contract text, cited** |
| --- | --- | --- | --- | --- | --- |
| **1** | `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s amendment **§1.1** and `docs/decisions.md`'s `SHELL-CHROME-PANES-ZONES-IN-SCOPE` write **`isEmpty(census, zoneId)`**, while `docs/next-steps.md`'s row **`E1`** writes a bare **`isEmpty`**. | A row cannot assert an arity, a parameter order or a name from two texts that name different signatures; an arity row driven from `E1` alone would assert **one** parameter and fail a correct implementation. | **The ruling's words govern: `isEmpty(census, zoneId)`, two arguments, census first.** | contract text: this spec's `§2.1` (the declaration) | **RULED — `§0A` note 1.** Landing: `§2.1`, the `isEmpty` drives through `M-13`..`M-17` and `F-3`..`F-5`, **`§5.5.1 P-ZN-IM-3`** (which states every `(census, zoneId)` pair), `I-7`, and **`A-15`** (the arity probe). **`R-5` makes the export set derivable too**, while the **parameter count** is what `A-15` asserts. |
| **2** | `TrackSpec.trackProp`'s doc requirement (*carried, never interpreted*) vs the module's need to **emit a property name** — and the prohibition-1 ban on vocabulary. | A row cannot assert both *"`trackProp` is used"* and *"`trackProp` is never used"*; as written, a reader could conclude either that `trackProp` is a census key (making it a vocabulary token after all) or that it is dead weight (making its presence in the ruled shape pointless). | **`trackProp` is the EMITTED property NAME — the token's identity for the caller — and is NEVER a census key; `zoneId` (a separate parameter) is the only census key.** | contract text: `§2.1`'s `trackProp` doc comment | **RULED — `§0A` note 2.** Landing: `§2.3` item 1's `trackProp` clause, **`M-3`** (three specs differing only in `trackProp` emit the **same** string), **`I-4`**, and **`A-8`**'s vocabulary probe. |
| **3** | The ruling's `census` parameter vs the three shapes a caller might hand it (a **plain record**, an **array**, a **`Map`**) — the sources name the parameter and none of the shapes. | A row cannot assert a census lookup rule from a spec that does not state one; three readings (index read / membership / own-key read) give three different answers for the same `zoneId`, so **any** row would be a guess. | **Own-property read on a record; `Map.get` for a `Map`; every other shape (an array, a `Set`, a primitive) answers `false`.** The array must **not** get an index read, because that would give the same `zoneId` a second meaning — the second-authority hazard `V-13` names. | contract text: `§2.3` item 2 | **RULED — `§0A` note 3.** Landing: `§2.3` items 2/3, `§2.1`'s `ZoneCensus` doc, **`F-3`/`F-4`**, **`M-16`/`M-17`**, **`§5.5.1 P-ZN-IM-3`**, and **`A-5`**. |
| **4** | The ledger's *"non-finite/negative ⇒ the empty token"* vs the **`-0`** input, which is **finite** and **not negative** by `-0 < 0` but carries a sign. | The two readings (empty vs `'0' + unit`) **both** satisfy the written limb, and a row asserting either can be failed by the other; the contract names no sign test. | **`-0` is a legitimate zero size and emits `'0' + unit`; on the `isEmpty` side a `-0` value is empty (`-0 === 0`).** | contract text: `§2.3` item 1 (c)/item 2 (i) | **RULED — `§0A` note 4.** Landing: `§2.3` items 1/2, **`M-6`/`M-15`**, **`§5.5.1 P-ZN-IM-2`** (the `36`-drive zero-boundary row), and **`A-4`**. |
| **5** | The ruled three-field shape vs `U-PROJ`'s precedent that a spec entry may carry a **`format`** discriminator — and, separately, the absence of **any** refusal/`code`/`ok` vocabulary for the malformed and invalid classes. | A row cannot know whether an unrepresentable size is *"a refusal"* (typed) or *"an empty case"* (a value), and cannot know whether a bare-number form is expressible; as written the mechanism's whole error surface is undecided. | **No refusal domain: every outcome is a value** (`trackFor` ⇒ a string, `isEmpty` ⇒ a boolean), **and no `format` field: the bare-number form is `unit: ''`, and the malformed spec's value is the degenerate `''`.** | contract text: `§2.3` item 4, `§2.4` item 1 | **RULED — `§0A` note 5(a)+(b).** Landing: `§2.3` item 4 (no union, no `code`, no `ok`), **`F-1`** (`''`), **`F-6`** (`unit: ''`), **`F-8`** (the two `''` outcomes), `§4.4 S-3`/`S-9`, and **`A-3`**. |
| **6** | This spec's module path (nothing names it) vs the sibling convention (`layout-projection.ts`, `slot-host.ts`, `owned-list-host.ts`) — and the geometry clause's status as a *contract clause* rather than a sentence inherited from a neighbouring unit. | A row cannot read a module that has no name, and cannot fail a geometry row that is not part of this unit's contract. | **The path is `src/shared/zones.ts`; and the geometry boundary is THIS unit's own clause, with `R-7` as its row and no `[U]` row offered.** | contract text: `§2.1`, `§2.3` item 7, `§3.4 R-7` | **RULED — `§0A` note 6 (the geometry half) and `§2.1`'s path note (the path half).** Landing: `§2.1`, `§2.3` item 7, `I-10`, **`R-7`**, `§5.2`, `§7` items 6/10, and **`A-14`**. |

**The gate's list is therefore EMPTY: `6` items reported, `6` ruled, `0` OPEN QUESTIONS, and NO item is
parked.** **No clause of this contract was weakened to make a test easy, and no ruling invents a
vocabulary, a default, a field or an export.** **No item is presented as contract text without the
clause that decides it**, and **no item needed the architect** — each was decidable from the ledger, the
rulings and this unit's own boundary. **`§7a.1` is a sub-heading of `§7a`, and no section number moves.**

**⟶ ADDED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass) — the gate's list, re-stated after the red run.** **The red set (`tests/zones.test.ts`) reported SIX clauses it could not derive an unambiguous falsifiable row from, and FOUR of them were defects in this spec's own register/clause text rather than gaps in the sources:** **(1)** `P-ZN-TP-1`'s decomposition printed two incompatible ways (`40+50` vs `60+30`, both `90`) — **RULED to `40 + 50`**, the strategy cell's partition, with the arithmetic table corrected in place; **(2)** `P-ZN-SM-1`'s sweep term under-specified (`10` as printed against a declared `20`) — **RULED to `10` `empty` values × `2` size classifications = `20`**, the row's own arithmetic; **(3)** `P-ZN-TP-2`'s pool contradicting its own boundary (the negative member `#23` drawn at positions `29`/`57`/`65`) — **RULED (A): the member is intentional and the boundary text is narrowed to the truth**; **(4)** `§2.3` item 1's limb list reading against `F-1` for a malformed spec with `empty === true` — **RULED: the malformed-spec limb is evaluated FIRST and gates the flag.** **The other two were wording hazards reconciled in the same pass, not register defects:** `R-1`'s literal-scan scope (now stated as TWO scopes with the implementer wording hazard recorded) and `R-7`'s bound (CONFIRMED as the three parts it states). **These four are ADDITIONAL to the six items reported and ruled above — the six above stand exactly as ruled, none is re-opened, and the four below change no `§7a` item, no `§0A` note and no landing site.** **They are recorded HERE rather than added to the table above so that `§7a.1`'s `6 reported · 6 ruled` count stays the filing-time record it is:** the red run's list is the **executed** list, and it is **`6` red-run clauses · `4` cell defects · `4` ruled · `2` wording hazards reconciled · `0` OPEN QUESTIONS · `0` items needing the architect.** **No section number moves, no new subsection is created, and no `§7a` item is renumbered.**

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited
**by SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is
cited by ROW ID** (`E1`, `E2`, `D1`–`D4`), never by line. **`docs/decisions.md`'s row anchors drift**
(rows are appended), so its rows are cited **by NAME**. **This spec writes no line-count census of any
file.**

| Source | Status for `U-ZONES` | Where |
| --- | --- | --- |
| `SCH-4` `ZONE-TRACK-CONTRACT` (**A-d4**, adopted-reshaped) | **ADOPTED — this unit's charter**, mechanism-only | §0 ruling 1, §1, §2 |
| `SCH-4`'s A-d1-layer decline, reason `APP-DATA-NOT-MECHANISM` (`docs/pending.md` §A) | **SUPERSEDED BY A-d4**; **the decline's REASONS survive as the contract's shape** (census injected, no CSS) | §0 ruling 1, §1 items 2/3 |
| `SCH-4`'s original bundle: the four `:has()` rules + the collapse-override declaration | **DECLINED — stays consumer-side**, and must not be pulled in | §1 item 3, §7 item 3, §2.2 (P-2) |
| A-d4's five mandatory units (`U-ZONES`, `U-CENSUS`, `U-GUTTER`, `U-RELOCATE`, `U-CONTAINER`) | **This unit is the FIRST of wave E**; the other four are **NOT THIS UNIT** (each its own spec/red/cycle, RCA-2) | §1 item 8, §4.5 |
| The **geometry clause** (A-d4) | **DISCHARGED as this unit's own clause**: `§2.3` item 7 + `I-10` + `R-7` + §5.2's refused `[U]` row | §2.3 item 7, §3.3 `I-10`, §3.4 `R-7`, §5.2, §7 item 6 |
| `H-r8` / `S-d8`'s six prohibitions | **DISCHARGED as `§2.2`'s six-row assertion table**, with the static rows **ENUMERATED** at `§3.4` | §2.2, §3.4 |
| `H-r17` (*"a dashboard/toolbar use case changes NO zone/track contract … with no zone vocabulary anywhere"*) | **CARRIED** — this unit owns the token arithmetic **and still carries no vocabulary literal** | §0 ruling 5, §2.2 (P-1), §7 item 4 |
| `U-PROJ`'s `§0` ruling 5 (*"the token-formatting authority is `U-ZONES` for the census family (one authority, not two)"*) | **CARRIED — this unit IS that authority**, and it is cited in `docs/specs/projection.md` by section | §0 ruling 4, §1 item 6, §2.1 |
| Validity finding `V-13` (second authority over emptiness) | **ANSWERED by the injected census + the never-mutated census rows** (`I-7`, `§5.5.1 P-ZN-IM-3`), the remedy A-d4's ruling names | §0 ruling 1, §2.3 items 2/5, §1 item 6 |
| `H-r4`'s owed-spec cell for `docs/specs/zones.md` (**`OWED — not filed`**) | **DISCHARGED by this filing.** **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, §5.1 item 4 |
| `docs/next-steps.md`'s `## OPEN` row **`E1`** | **Its spec cell is discharged by this filing; the row stays `BLOCKED`** (blocked on the wave-E go-ahead and its own red set). **Its permanent scoping clause: the census is `U-CENSUS`'s and the geometry boundary is this unit's own** | §4.5, §1 items 6/7 |
| `docs/next-steps.md`'s `## OPEN` row **`E2`** (`U-CENSUS`) | **NOT THIS UNIT — but this unit is ITS dependency.** The delegate surface it may call is `§2.1`'s delegate clause | §1 item 6, §5.3 item 9 |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (gate 11's mandatory typed register for CODE-BEARING units) | **DISCHARGED BY THIS FILING — `§5.5.1`** is `U-ZONES`'s register: **`8` typed rows**, **`400` attempts** printed **with their terms**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no fourth leg**, seed `20260927`, caps `≤100`/row · `≤400` total · stop-after-5. **The read-only PBT audit is OWED to this unit's adversarial pass** | §5.5, §5.5.1, §5.3 items 10/11, §4.2 item 2 |
| **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the total is printed with its per-row terms (**`30+90+36+68+52+12+15+66 = 369`** *(as filed: `400` — corrected at the spec-gate closure; the terms never moved)*), the one reconciled term is recorded in place, and **a total that is not the sum of its own terms is a review finding** | §5.5.1's Attempt-arithmetic block, §5.3 item 11 |
| `H-r5` / `S-d3` (no shim expansion) | **INHERITED-ONLY** — this unit touches no shim and needs no member | §0 ruling 8, §2.2 (P-6), §3.4 `R-6` |
| `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` + `UI-RENDERED-WITH-PROVIDENT` | **CARRIED** — a mechanism is outside the constraint because it is not a UI element; this unit authors no content | §0 ruling 11, §2.2 (P-2), §7 item 5 |
| `RK-19` (geometry "proved" from a node-green — the recurring false-green class) | **CARRIED as the clause this unit exists to prevent** | §2.3 item 7, `I-10`, `R-7`, §5.2, §6 |
| `A-d2`/`U-ENGINE-PIN` (the engine pin) | **SPENT / NOT THIS UNIT** — no dependency (the module imports nothing) | §0 ruling 9, §1 item 7 |
| `A-d3`/`S-d9` and the adopted `U-GSESSION` session | **NOT THIS UNIT — and NOT a dependency of it.** The filing **looked and found no edge**; a later pass asserting one would be a fabricated dependency | §0 ruling 10, §1 item 7, §7 item 8 |
| `U-MOUNTGUARD` / `U-LISTHOST` / `U-SLOTHOST` / `U-PROJ` | **NOT THIS UNIT** — no duplication of any sibling responsibility; **`U-PROJ` must not import this module and this module imports nothing** | §1 items 6/8, §3.4 `R-3`/`R-4` |
| `docs/skills/designing-pages.md` and the page-design layer | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | §1 item 8, §3.5 `R-9`, §7 item 9 |
| `§3a`'s adversarial seed set (`A-*`) | **OWED** — the pass runs **after the green** (RCA-3), read-only, and its findings land in `§3a`/`§3b` | §3a, §3b |
| `§3b`'s disposition table | **OWED — EMPTY BY CONSTRUCTION** at filing; the status vocabulary is fixed below so an appended block needs no renumbering | §3b |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates **one new spec file** and edits **no existing document** — **no tracker row is touched, no
sibling spec is annotated, and no citation is repointed.** **Row `E1`'s spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded here so the
staleness is **attributable** rather than silent. **This pass ran no test, no leg and no trio, edited
exactly ONE file, and made no commit** (`RCA-8`: the new file is untracked and must be committed by the
supervisor).

**⟶ UPDATED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass; the as-filed paragraph above is kept as the FILING pass's own record and still describes it).** **What this pass changed about it, on three points only:** **(1)** the spec **IS filed** (it is the file being edited) and `tests/zones.test.ts` **now exists and has RUN** — so the *"new file is untracked"* sentence is **the filing pass's state, not this one's**; **(2)** this pass **still archives, moves and repoints NOTHING**, edits **exactly ONE file** (`docs/specs/zones.md`), by **bounded anchored `edit`s**, and **ran no test, no leg, no trio and no `git commit`** — `RCA-8(c)/(d)` bind it exactly as they bound the filing; **(3)** **the two tracker stalenesses this pass found and did NOT fix (they are the supervisor's) are named so they stay attributable:** `docs/next-steps.md`'s `E1` row still reads the spec cell as **`OWED — not filed`** and its status cell as **`BLOCKED`→ spec → red**, and the file's own header **go-ahead state** is unchanged on its go-ahead half. **No citation was repointed, no sibling spec was annotated, and no line-count census of any file appears in this pass's text.**

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **NOTHING may be added after `§3b` as a new top-level section.** A later pass
appends **inside** `§3a`/`§3b` or inside an existing section; **no section number moves, nothing is
renumbered, and the `§5.3 → §5.5` gap (no `§5.4`) and the absent `§5.5.0` stay exactly as recorded**,
because **renaming is forbidden for citation stability** (both numbers are cited across the trackers
and in three sibling specs).

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-ZONES`** — this is the spec-filing pass;
the unit is `BLOCKED` on the wave-E go-ahead and on its red set, **so there is no green to review**
(RCA-3 runs *after* a unit's green: *"after each unit's green, a read-only adversarial sub-agent (edge
cases / unauthorized access / malformed inputs) must run before the unit is reported done"*). **Every
row below is a QUESTION for that pass, not a finding, and none may be cited as one.** The pass is
**READ-ONLY** (it changes no `tests/**` and no `src/**`), it **must also perform the gate-11 read-only
PBT audit** of `§5.5.1`'s executed tables, and **its findings are recorded in `§3b` and fixed here (host
findings) with regression rows — never in `docs/defects.md` for a host finding** (`R13-HOST-FIX`'s
precedent); **a genuine `provident-ssr` package defect would go to `docs/defects.md` + `docs/HANDOFF.md`
and the package is NEVER patched.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **The size-boundary table, exhaustively:** `NaN`, `±Infinity`, `-Infinity`, `-0`, `0`, `Number.MIN_VALUE`, `Number.MAX_VALUE`, `1e21`, `1e-21`, `0.1 + 0.2`, `2**53`, `2**53 + 1`, a numeric string, a `BigInt`, `Symbol('s')`, a function, `null`, `undefined`, `{}`, `[]`, `true`, `false`. **Does any of them produce a `NaN`/`Infinity`-shaped or negative-signed string, or a rounding artifact?** | `[T]` |
| **`A-2`** | **Is the empty token REALLY caller data?** Two specs differing **only** in `emptyToken` (and a third with `emptyToken: ''`) driven with the same invalid size: **do the results differ?** **A module with a built-in token FAILS.** | `[T]` |
| **`A-3`** | **The malformed-spec class:** `null`, `undefined`, `42`, `'x'`, `[]`, `{}`, a missing field, a wrong-typed field, a field whose accessor **throws** — **is `''` returned in every case, with no throw and no fabricated token — and is any per-field distinction silently introduced?** | `[T]` |
| **`A-4`** | **The `-0` question, on both sides:** does `-0` emit a `'-'`-free `'0' + unit`, and does a `-0` census value answer `true`? **Does the module inspect a sign bit?** | `[T]` |
| **`A-5`** | **The census-shape probe:** plain record, `Object.create(null)` record, frozen record, `Map`, empty `Map`, **array**, `Set`, a function, a primitive, `null`, `undefined` — **does each give the DECLARED answer, and are the array/`Set` answers `false` (never an index read, never a membership read)?** | `[T]` |
| **`A-6`** | **The hostile-census probe:** a census whose own accessor **throws**, a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` **throws**, a `Map` whose `get` throws, a census with an own `'__proto__'` key, a census whose `Object.prototype` carries a looked-up key — **no throw, `false`, no prototype value returned, and NO CENSUS MUTATION?** | `[T]` |
| **`A-7`** | **The repeat-drive / state-retention probe:** the same call twice in a row, then a call with **different** arguments, then the first call again — **identical results every time, and no observable state carried anywhere?** | `[T]` |
| **`A-8`** | **The vocabulary probe — and its own collision.** Does the module's source (incl. comments), or the unit's controlled fixture corpora, carry any zone/pane/tab/region/dashboard vocabulary token or the `'0px'`/`'fit-content'` literal **as a module constant** — raw, **token-assembled**, or **in a comment**? **The collision to resolve explicitly: this spec's prose and `R-1`'s own control data MUST carry the spellings, while the module must not** — is the scan's scope exactly `R-1`'s? **⟶ ANSWERED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): YES, the scan's scope IS `R-1`'s, and it is now TWO scopes — the VOCABULARY half reads the whole module file INCLUDING comments, the LITERAL half reads code with comments STRIPPED (`§2.2` P-1's dated note, `§3.4 R-1`). The collision is resolved by that split plus the module-side wording hazard: the module's own doc comments must not carry a bounded vocabulary token, so the comment-inclusive half stays satisfiable while the spec's prose (which must print the spellings) is out of the module's bytes entirely.** | static |
| **`A-9`** | **The content-authoring probe:** does the module emit any text it did not receive — a label, a unit the caller did not supply, a separator, a `'calc('` wrapper, a default token? **Any positive is a prohibition-2 finding.** | static + `[T]` |
| **`A-10`** | **The static/unauthorized-access sweep:** `document`/`window`/`globalThis`-rooted access/`matchMedia`/`getComputedStyle`/`activeElement`/`Date`/`Math.random`/`process.env`/`node:fs`/`eval`/`new Function`, any assembled or aliased realm route; **any mutable module-level binding**; **any store, cache, memo, `WeakMap` or `Map`** at module scope. | static |
| **`A-11`** | **The five-seam sweep:** any new tool / resource / group / `VALID_GROUPS` member / `RpcMethod` member / `MUTATING_METHODS` entry / IPC method — **asserted by SET EQUALITY AGAINST THE NAMES where an existing name-complete row does so, never by a bare count** (`R-6`, `S-8`). | static |
| **`A-12`** | **The import/scope probe:** does the module import anything at all (including a **type-only** import)? Does any changed file fall outside `§5.1`'s allow-list? **Is `src/shared/dom-shim.ts` untouched?** | static |
| **`A-13`** | **The cross-unit boundary:** does this unit duplicate a `U-CENSUS` responsibility (key-set-`zones`, `revealed`, `sizes`, `specOf`, the never-mutate row), a `U-PROJ` responsibility (a write map, an applier, a sink), a `U-MOUNTGUARD` responsibility, or a `U-CONTAINER` responsibility (a class taxonomy, a `contain` declaration)? **Duplication is a FINDING.** | static + `[T]` |
| **`A-14`** | **THE GEOMETRY PROBE:** does any row, in the module or in the test file, assert or claim a **rendered-geometry, CSS-validity, layout or paint** property — or does any pass report this unit's green as geometry evidence? **Any positive is an A-d4 clause violation and an `RK-19`-class false green.** | static + the DONE row |
| **`A-15`** | **The SIGNATURE probe:** is `isEmpty.length === 2` and `trackFor.length` `2` or `3` (the optional third parameter), with `(census, zoneId)` and `(spec, size, empty)` and **no options object that could smuggle a census or a default in**? **The ABSENCE half is source-level and belongs to `R-3`/`R-5`, not to a runtime assertion** — recorded so the limit is honest. | `[T]` + static |
| **`A-16`** | **The register's own audit (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the `369` total** *(as filed: `400` — corrected at the spec-gate closure)*? Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form what the test file actually contains? **⟶ ADDED 2026-09-27 (the RED-RUN REGISTER-RECONCILIATION pass): the audit must ALSO check every pool/table member against its row's declared boundary text** — **`P-ZN-TP-2`'s negative member (`#23`, drawn at positions `29`/`57`/`65`) is the worked case, and its row's boundary now names the two limbs so the check has a rule to apply** (`§5.5.1`'s POOL-VERSUS-BOUNDARY RULE). **Any mismatch between the spec's arithmetic and the file's tables is a SPEC FINDING** (`§5.3` items 10/11). | `[T]` + the test file |
| **`A-17`** | **The `U-CENSUS` delegate probe:** can `U-CENSUS` get everything it needs from exactly two calls (`isEmpty` ⇒ a boolean, `trackFor` ⇒ a string), with **no wrapper, no `ok`, no `code`, no array**? **Does the emitted string need any post-processing — i.e. does the delegate contract leak work back to the consumer?** | `[T]` + the delegate clause |

| **`A-18`** | **The layer-honesty probe:** does the DONE row (or any pass's prose) claim **assembled-app, CSS-validity, applied-length or rendered-geometry** evidence from this unit's `[T]` green — and does it state, explicitly, that the module is **imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**? | the DONE row |

**The seed set's own status, stated so it is not misread: `A-1`..`A-18` are ALL `OWED`** — the pass runs
after the green, and **a DONE row that cites no adversarial pass (or whose findings are unrecorded) is a
review finding** (`AGENTS.md` RCA-3).

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended
findings block needs **no renumbering and no new section**. **A row added later must use one of the
statuses below, or the pass must define its new token IN THIS TABLE with a one-line meaning** — an
undefined status word is what this shape exists to prevent.

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a **host** finding, **fixed here + regression-tested** as a new `§3` row (or a new `R-*` row for a static finding) |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** — the spec is amended with the old text kept visible as `SUPERSEDED`, and the row lands in `§3`/`§5.5.1` |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — **the pass may not report done with an `OWED` row** |
| **OWED — HOST FIX** | a **host** finding whose fix is owed to the **Implementer** pass that follows, **red-first**, with its regression row owed to the **TestWriter**; **it may not be reported `DONE` until the fix lands, and its owner is named** |
| **OWED — TEST-SIDE** | a finding whose remedy is a **row** the TestWriter owns; **no `§5.5.1` statement, id, strategy id or attempt term may change for it** |
| **BLOCKING — SCOPE** | `A-13`/`A-12`/`A-14`/`A-8` returning positive: **the unit does not land** until the scope violation is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; **the package is NEVER patched** |
| **PARKED-with-revisit-condition** | recorded, not fixed, with the condition that would reopen it and its owner |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3). **An appended
findings row must cite, at minimum: the seed id (`A-*`), the finding's severity, its disposition from
the table above, its owner, and the clause (`§`-section + row id) it changed or left unchanged.**
**Nothing in this table may renumber `§6`/`§7`/`§8` or add a top-level section after this one** (the
file-end note above says the same).
