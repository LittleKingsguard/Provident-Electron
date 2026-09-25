# Spec — `U-CENSUS`: the census → track-variable record (`SCH-8`'s census half, architect ruling A-d4)

Status: **SPEC — FILED 2026-09-27 (wave E, unit U-CENSUS, the census half of SCH-8 per architect ruling
A-d4)**. **This filing writes no code and runs no red set.** No module exists, no test file exists, **no
leg, no trio, no `npm run test`/`typecheck`/`build`, no `npm run ui` and no Electron window ran in this
pass**, and **no result is recorded anywhere in this file**. **The gate-11 typed Property register is part
of this filing** — it is `§5.5.1` below (**8 rows**, strategy prefix `S-CN-*`, pinned seed `20260927`,
caps **`≤100` attempts/row · `≤400` total · stop-after-5**, **no new dependency**, **no `fast-check`**),
and **this unit is CODE-BEARING**, so **no zero-row exemption is available**
(`docs/decisions.md` `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, ACTIVE; its follow-ups in
`docs/pending.md` §G).

**Go-ahead state — stated plainly.** This unit is **`UNBLOCKED` on the architect question and
`BLOCKED` on ONE thing only — its own red set.** *(The wave-D go-ahead was given 2026-09-27 and is
**spent**; wave **E** is authorised by the wave-E go-ahead **plus** the ARCHITECT RULING recorded at
`§0A` ruling note 11 below, so **the architect question this unit escalated is ANSWERED and NO architect
question remains open for this unit** — and **the red set may now be AUTHORED and RUN**; the unit may be
delegated the moment the red set has been RUN and REPORTED — `AGENTS.md` item 9, RCA-1.)* **Status of its
red set: `RED SET OWED — NOT AUTHORED, NOT RUN`** (RCA-1) — **NO red set exists yet and NO leg has been
run** (`npm test`, `npm run typecheck`, `npm run build` and `npm run ui` are all UNRUN, and the register's
`YES` cells remain execution DESIGN). **Ordering obligation from its queue row:** it
is the **SECOND** unit of wave **E**, its **predecessor `U-ZONES` (row `E1`) is `DONE`** (the ledger's
**eighth** `DONE` row, its record being `docs/next-steps.md`'s `## DONE — U-ZONES` section, cited by
SECTION and never by line), and **its delegate surface is landed, green and verified** — so **this unit
has NO ordering precondition left** except its own red set. **Its successor-in-need is `U-GUTTER` (row
`E3`), which DEPENDS ON THIS ONE** (§1 item 7, §8).

**⟶ RULING LANDED (2026-09-27) — the header above is annotated, not rewritten, and the annotated state
GOVERNS from here.** *(As-filed text is kept visible under this dated banner — annotate-never-rewrite.)*
**THE ARCHITECT QUESTION THIS FILING ESCALATED IS ANSWERED, verbatim:** *"**Non-revealed zones still
exist, they just don't get displayed.**"* **There is NO open architect question left for this unit** — the
answer is recorded as the contract's own dated ruling at **`§0A` ruling note 11**, quoted verbatim, with
the exact clauses it settles named there (`§2.4 C-A`, `§2.4 C-C`, `F-2`, `M-4`, `I-2`/`I-5`, and the
register cells flagged as conditional — `P-CN-IM-1` cells `10`/`15`/`17` and `P-CN-SM-3`). **THE
DELEGATION GATE (`AGENTS.md` item 9) is therefore SATISFIED ON ITS AMBIGUITY CONDITION** — the contract
exists (this file), **`§7a.1`'s ambiguity list was already EMPTY at filing, and the one clause escalated
beyond it is now ruled** — and **the only remaining gate condition is the red set.** **THE NEXT STEP IS
THEREFORE: the red set AUTHORED and RUN and its failing set REPORTED verbatim** (`AGENTS.md` item 9 and
**RCA-1**; the authoring order and the expected red shape are `§4.1`/`§4.2`). **NOTHING HAS BEEN RUN: no
red set exists yet, and no leg of this unit has been run** — no `npm test`, no `npm run typecheck`, no
`npm run build`, no `npm run ui`, and no Electron window; **every `YES` in `§5.5.1` is execution DESIGN,
and no result is recorded anywhere in this file.**

**Source of this unit, cited by SECTION (never by line):** the appended **`Amendment record (A-d4…A-d8)`**
of `docs/specs/provident-electron-shell-chrome-handoff-review.md` — **§0** (the supervisor adjudication:
A-d4 stands and the re-decline is adjudicated away), **§1.2** (`U-CENSUS ← SCH-8`'s census half,
**its earlier refile is WITHDRAWN**; contract-exact: `computeTrackVars(zones, census, sizes, revealed,
specOf)` **delegating token formatting to `U-ZONES`**; `revealed` a **consumer decision, never a
default**; the returned record's **key set exactly `zones`**; **the census object never mutated** — *"the
anti-second-authority row that answers validity finding `V-13`"*), **§1.1** (the delegate surface this
unit consumes: `isEmpty(census, zoneId)`, `trackFor(spec, size, empty)`,
`TrackSpec { trackProp, unit, emptyToken }`), **§1.3**/**§1.5** and the **geometry clause** (*"the
arithmetic is provable here; any claim about the rendered geometry is UNPROVABLE in this repo today"*),
**§2.2** (the `SCH-8` row: **BOTH halves adopted, the refile WITHDRAWN**), **§3** (wave **E**'s order —
`U-ZONES` → **`U-CENSUS`** → `U-GUTTER` → … — and the checkpoint rule: *"the geometry family's criteria
are UNPROVABLE in this repo today (node layer asserts contracts/arithmetic only) — say so in every
affected spec"*), **§3.1**/**§3.2** (the 20-unit plan and its honest costs), **§4.4**/**§4.6** (the
recorded-fact and validity layers), **§5** (the geometry family's equivalence limit); the record's
**`V-13`** row (the second-authority validity finding whose **remedy** A-d4 names as **this unit's**
never-mutate + exactly-`zones`-key rows); `docs/decisions.md`'s ACTIVE row
**`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (which restates A-d4 contract-exact, this unit's four binding
rows included) and the ACTIVE rows **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and
**`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`**; `docs/pending.md` **§B**'s panes/zones-family row and
its **`SCH-8`** row (**ADOPTED-RESHAPED in BOTH halves**, reason code `ADOPTED-PURE-PROJECTION`, with the
`computeTrackVars` acceptance line **SUPERSEDED BY A-d4**), **§G** (the gate-11 follow-ups) and **§H**
(the process residues); `docs/next-steps.md`'s `## OPEN` rows **`E2`**/**`E3`** and the `## DONE —
U-ZONES` record; `docs/FORKER.md`'s `U-CENSUS` row; and **`docs/specs/zones.md`** (`U-ZONES`, the landed
predecessor — **the delegate, read in full, INCLUDING its `§0A` ruling notes, its `§2.3` dispatch
precedence and its `§2.1` delegate clause**) as **both the dependency and the format/register template**
this file imitates. **`docs/specs/projection.md`** (`U-PROJ`, `SCH-8`'s other half, `DONE`) is the second
format template.

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are recorded as binding and are NOT re-opened by this filing.** Where a source's own words say
`computeTrackVars(zones, census, sizes, revealed, specOf)` and the queue row's shortened cell says
`computeTrackVars(...)`, **this spec obeys the sources' words** and states the ruling in `§0A`.

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`A-d4` — the census half of `SCH-8` is THIS REPO's, and its earlier refile is WITHDRAWN.** *"SCH-4/6/7/10 — I don't care, build the damn panes/zones framework. Everything that this project will get used for is going to have static UI elements."* The A-d5…A-d8 architecture pass's re-decline is **ADJUDICATED AWAY** (it read the **landed** pre-A-d4 rows; A-d4 is the architect's explicit ruling — gate record **§0**). **The pre-amendment `SCH-8` acceptance line** *"the `computeTrackVars(census, …)` half is absent"* is **SUPERSEDED** and is **not** the governing acceptance (§0 ruling 2). | §1, §2.2, §0A note 1 |
| **2** | **`SCH-8`'s own acceptance line, now BOTH-HALVES:** **ADOPTED-RESHAPED — the earlier refile is WITHDRAWN** — *"`U-CENSUS` delegates token formatting to `U-ZONES`; `revealed` is a consumer decision, **never a default**; the returned key set is **exactly `zones`**; **the census object is never mutated**."* **BOTH halves are this repo's**: `U-PROJ` owns the projection/applier and is `DONE`; **this unit owns the census half.** | §1, §2.4 (`C-A`/`C-B`/`C-C`), §3 |
| **3** | **The `V-13` anti-second-authority finding, and the remedy A-d4 names.** `V-13` (the gate record's validity layer) is *"the `SCH-4` second-authority question (the fork's census vs a contract-side emptiness rule)"* — and the pre-amendment `SCH-4` row recorded it as **standing unresolved** because a second emptiness authority would coexist with the fork's census. **A-d4's remedy is this unit's own contract**: the census is **injected**, is **never mutated** and is **never cached into**, and the returned record's **key set is exactly `zones`** — so **no second authority over emptiness or over tokens exists**. | §1 item 2, §2.4 (`C-B`), §3.3 `I-2`/`I-3`, `§5.5.1 P-CN-IM-2`/`P-CN-IM-4`, §8 |
| **4** | **ONE authority over tokens, not two — `U-ZONES` is that authority, and this unit DELEGATES.** *"delegating token formatting to `U-ZONES` (one authority, not two)"*; and `U-PROJ`'s `§0` ruling 5 states the same family rule. **This unit must call `isEmpty(census, zoneId)` and `trackFor(spec, size, empty)` and must NOT re-implement either** — **a duplicate implementation is a FINDING**, not a style choice. | §1 item 1, §2.3, §3.2 `F-5`, `§3.3 I-4`, `§3.4 R-1`, §4.4 `S-1`, §8 |
| **5** | **`revealed` is a CONSUMER DECISION, NEVER A DEFAULT.** The returned record is gated by the caller's own decision; **no built-in reveal, no guessing from the census, no `undefined`-means-visible fallback** — and, this filing adds because the clause cannot be falsified otherwise, **no `undefined`-means-hidden fallback either** (`§7a.1` item 2). | §2.4 (`C-C`), §2.3 item 3, `F-2`, `§3.3 I-5`, `§5.5.1 P-CN-IM-2` |
| **6** | **The geometry clause (A-d4's mandatory wording, which must appear wherever geometry criteria are described):** *"the arithmetic is provable here; **any claim about the rendered geometry is UNPROVABLE in this repo today** — it belongs to the `ui` leg's business and to no node-green."* | §1 item 6, §2.5, `§3.4 R-6`, §5.2 (no `[U]` row offered), §7 item 6 |
| **7** | **The `H-r8` six prohibitions (`(C)#1`..`(C)#6`) apply to this unit exactly as they apply to its predecessor** — no consumer vocabulary as a symbol/union member/default/documented constant; no authored UI content; no policy default; no store/persistence; no new MCP surface; no unverifiable criterion and no shim expansion. **`H-r17` restates the consequence for the family**: a dashboard/toolbar use case changes **no** zone/track contract. | §2.2 (the six-row table), §7 item 5 |
| **8** | **No new MCP surface, no store, no persistence, no CSP change, no shim change.** `ALL_TOOLS` stays **21**, `RpcMethod` stays **21**, `MUTATING_METHODS` stays **7**, `VALID_GROUPS` keeps its five members; **`src/shared/dom-shim.ts` gains no member** (`H-r5`). | §2.2 (P-4/P-5), §5.1 |
| **9** | **`A-d2` (the engine pin) is SPENT and is NOT this unit's dependency** — this module imports **no** engine surface at all, and its only import is its own predecessor (`§3.4 R-1`). | §1 item 8, `§3.4 R-1` |
| **10** | **`A-d3`/`S-d9` (the node-local interaction rule) and the adopted `U-GSESSION` session are NOT this unit's dependency.** This unit is a **pure `src/shared/` mechanism**: it installs no listener, owns no element, opens no gesture and takes no event source. **It does not compose the session** — `U-GUTTER` does. | §1 item 8, §7 item 8 |
| **11** | **`A-d7`'s static-UI reading and `A-d8`'s `ui` leg**: **`AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED**, and **a mechanism is outside that constraint because it is not a UI element** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`). This unit authors **no text, no control, no affordance, no class, no token value, no CSS and no DOM**. | §2.2 (P-2/P-3), §7 item 5 |
| **12** | **This unit's red set is not authorised by any ruling on the record** (wave E's go-ahead), so it may not be RUN and the unit may not be delegated (`AGENTS.md` item 9). **Its ordering precondition is DISCHARGED**: `U-ZONES` (row `E1`) is `DONE`. **⟶ ANNOTATED 2026-09-27 (`§0A` ruling note 11): the red set IS NOW AUTHORISED by the wave-E go-ahead plus the architect ruling, so it may be AUTHORED and RUN — and the unit becomes delegable the moment the red set has been RUN and REPORTED. `BLOCKED` is now true of ONE thing only: the red set (which is OWED, NOT AUTHORED, NOT RUN). The as-filed sentence above is kept visible.** | this status block, §4.5, §7 item 1 |

### 0A. The dated ruling notes — the clauses the ledger leaves open, RULED here (2026-09-27)

**What this section is, and what it is not.** The ledger/A-d4 text is **contract-exact** about the
**signature**, the **four binding rows** and the **delegation**; it is **silent** about the **shapes** of
`sizes`, `revealed`, `zones` and `specOf`, about **which zones reach the record**, and about the
**emptiness read**. **This filing DECIDES each of those clauses and records the decision here**, with the
clause it lands in and the reason. **A decision recorded here is a RULING of this filing, not a reading**
— and **every one of them is falsifiable** (`§7a`/`§7a.1`). **No decision here adds a parameter, an export
count, an optional field or a literal beyond the contract's own**, and **none weakens a binding row.**
**⟶ ANNOTATION (2026-09-27): the ten notes below are this filing's own rulings and stay as filed; `§0A`
now ALSO carries ruling notes 11 and 12, which record the ARCHITECT'S dated ruling on the one clause this
filing escalated, verbatim, and the falsifiers that ruling carries. Nothing below is superseded by them —
note 9's pinned reading is CONFIRMED by the architect and is made UNCONDITIONAL.**

**Ruling note 1 — the module path is `src/shared/census.ts`, and the typecheck leg's test file is
`tests/census.test.ts`.** Nothing in the sources names either path; the sibling convention
(`mount-invariant-guard.ts`, `owned-list-host.ts`, `slot-host.ts`, `layout-projection.ts`, and this unit's
predecessor `zones.ts`) plus the unit's own name decide it. **The pair is contract text** because
`§3.4 R-1`'s import scan and `§5.2` leg 4 both read them. Landing: **§2.1**, `§3.5 R-10`, §5.1 row 1,
`§7a` item 7.

**Ruling note 2 — `zones` is a SEQUENCE or a RECORD, and the mechanism reads exactly one shape.** The
ledger names the parameter and no shape. **DECIDED, in this order:** **(a)** if `zones` supplies a
callable `Symbol.iterator` (a `Map` — **whose keys are enumerated, never its values** — a `Set`, an
`Array`, or any caller object with its own callable `Symbol.iterator`), the zone members are **its
iteration values, in iteration order**; **(b)** otherwise, if `zones` is a non-`null` object **that is
not a function**, the zone members are its **own enumerable string keys** (`Object.keys` order); **(c)**
otherwise (a primitive, a function, `null`, `undefined`), **there are ZERO zones** and the answer is the
empty record. **A `Symbol.iterator` that is present but not callable is shape (c)** (it is not an
iterator), and **an iterator that throws is CAUGHT ⇒ ZERO zones** (`I-1`). **The record branch reads OWN
enumerable STRING keys only** — never a `Symbol` key, never a prototype member. Landing: **§2.3 item 1**,
`M-2`/`M-7`, `F-1`, `§5.5.1 P-CN-SM-2`, `§7a` item 1.

**Ruling note 3 — the ZONE ID is whatever the enumeration yielded, carried VERBATIM and interpreted
nowhere.** A record's key is a string; a `Map`/`Set`/array member may be a string, a number, a boolean,
`null`, `undefined`, an object or a `Symbol`. **The mechanism does not normalize, stringify, trim,
validate or reject any of them** — it passes the member, unchanged, to the consumer's lookups and to
`isEmpty`'s second parameter. **The CONSEQUENCE is pinned and is not a defect:** `U-ZONES`'s `§2.3` item
2 (c) answers `false` for a non-string `zoneId` against a record census, so **a non-string zone member is
never empty, whatever the census holds** — and **this unit must not compensate for that** (compensating
would be a second authority over emptiness, the `V-13` class ruling 3 closes). Landing: **§2.3 item 1**,
`M-2`, `F-6`, `§3.3 I-4`, `§7a` item 1.

**Ruling note 4 — `census` is an OPAQUE caller value, passed through to `isEmpty` unchanged, and this
unit NEVER reads it.** This unit holds **no census policy** and performs **no census read**: it makes
**exactly one `isEmpty(census, zoneId)` call per enumerated zone that passes the reveal gate** and hands
the boolean straight into `trackFor`'s third parameter. **Why the mechanism DOES call `isEmpty`** (the
clause `§7a` item 6 asks for): the **emptiness decision has no other admissible source** — the census is
the only carrier of it, `U-ZONES`'s `§2.3` item 6 explicitly says *"a `U-CENSUS` consumer that wants the
derived flag calls both itself"*, and **not calling it would force this unit to invent its own reading of
the census, which IS a second authority** (`V-13`). **So the call is the delegation working, not a
duplication of it**: `U-ZONES` decides emptiness, this unit merely *asks*. Landing: **§2.3 item 2**,
`M-3`/`M-5`, `§3.3 I-4`, `§5.5.1 P-CN-IM-4`, `§7a` item 6.

**Ruling note 5 — `sizes` and `specOf` are each a LOOKUP: a callable (called once per enumerated zone)
or a record (read by own property).** **`sizes(zoneId, census) → unknown`** and **`specOf(zoneId) →
unknown`**, or `Readonly<Record<ZoneId, unknown>>`. **Every unusable form degrades to `undefined`, and
`undefined` is handed to `trackFor`** — which is exactly where the value semantics already live: a
`sizes` miss or a malformed size ⇒ **the caller's `emptyToken`**; a `specOf` miss or a malformed spec ⇒
**`''`** — **both being `U-ZONES`'s own limbs, so this unit invents NO new outcome** (`§7a` items 1/3).
**A non-callable, non-record `sizes`/`specOf` (a number, a string, an array, a `null`) is shape (c) of
this note: every lookup yields `undefined`.** **A throwing callable or a throwing own accessor is CAUGHT
⇒ `undefined`.** Landing: **§2.3 items 4/5**, `M-8`..`M-12`, `F-3`/`F-4`, `§5.5.1 P-CN-SM-1`,
`§7a` items 1/3.

**Ruling note 6 — `revealed` is a CALLABLE PREDICATE — `revealed(zoneId) → unknown` — and NOTHING
ELSE.** The word *"decision"* in every source is read as **a decision FUNCTION**, not a global boolean
and not a record: a global boolean would be **one policy for every zone** (the prohibition-3 default
class), and a record would duplicate the `sizes`/`specOf` lookup device for the one parameter whose
whole point is that the **consumer** decides. **A truthy return means the zone IS emitted; a falsy return
means it is NOT emitted** (`Boolean()` semantics, exactly as `trackFor`'s `empty` argument works).
**An absent `revealed`, a non-callable `revealed`, or a THROWING `revealed` ⇒ ZERO keys** — the empty
record — and that is **the absence of a decision, NOT a hidden default**: no clause of this contract ever
substitutes a visible/hidden value for the caller's own (`§2.4` clause `C-C`, `F-2`). Landing:
**§2.3 item 3**, `F-2`, `§3.3 I-5`, `§5.5.1 P-CN-IM-2`, `§7a` item 2.

**Ruling note 7 — the returned record is a NULL-PROTOTYPE plain record, and the key ORDER is first-seen
enumeration order.** A zone id is **caller data**, and **`'__proto__'` is a legal zone id**, so building
the result as an ordinary object literal would make `'__proto__'` a setter write rather than a key
(the hazard the sibling `U-PROJ` ruled on with `A-3`). **DECIDED: the record is built on
`Object.create(null)`** — the same expression the sibling's `A-3` ruling uses — **so every zone id is an
OWN key and no zone id can be dropped or mis-assigned**, and **the mechanism never writes to
`Object.prototype`**. **The key order is the first-seen order of the zone enumeration** (a duplicate does
not move its key). Landing: **§2.1**, `M-1`/`M-7`, `§3.3 I-2`, `§5.5.1 P-CN-SM-2`, `§7a` item 5.

**Ruling note 8 — there is NO refusal domain, NO skip vocabulary and NO `ok`/`code`/`reason`/`skipped`
field, and every outcome is a VALUE.** This is a **pure function returning one record**, and the ledger
names **no** typed refusal, **no** skip reason and **no** error code for it. **`computeTrackVars`
therefore has no union and no diagnostic channel**: a non-enumerable `zones` yields `{}`; a non-revealed
zone is simply absent; a missing/malformed spec yields `''` **as this record's value for that key** (the
delegate's own malformed-spec limb); a missing/malformed size yields the caller's `emptyToken` (the
delegate's own limb). **A later pass that adds a refusal union is adding a contract and needs its own
gate.** Landing: **§2.2 (P-3)**, **§3.2**'s preamble, `F-3`, `§4.4 S-5`, `§7a` item 3.

**Ruling note 9 — the THREE-CLAUSE CROSS-CHECK is satisfied, and it is stated here because the three
clauses constrain each other.** `C-A` (*key set exactly `zones`*), `C-B` (*census never mutated*) and
`C-C` (*`revealed` never defaulted*) **could be read as conflicting** where a zone is not revealed (does
`C-A` force its key anyway?) or where its spec is malformed (does `C-A` force the key despite `''`?).
**THE READING THIS FILING PINS, and it is the only one under which all three are simultaneously
falsifiable: `C-A` binds the `zones` parameter, NOT the reveal decision — the returned record's key set
is exactly the set enumerated from `zones`, and `C-C` decides each key's VALUE (a non-revealed zone is
present with `''`), never its presence.** An implementation that omitted non-revealed zones would violate
`C-A`; one that included anything outside `zones` would violate `C-A` in the other direction. Landing:
**§2.4**, `F-2`, `§3.3 I-2`/`I-5`, `§5.5.1 P-CN-IM-2`.

**Ruling note 10 — the geometry boundary is THIS unit's own clause, not an inherited sentence.** *The
arithmetic is provable here; **any claim about the rendered geometry is UNPROVABLE in this repo today**.*
Concretely: `computeTrackVars` returns **a record of strings**; whether a browser accepts any of them,
applies it, or paints anything is **not this unit's claim, is not the node suite's claim, and cannot be
made from this change set at all** — **this spec offers no `[U]` row** (§5.2). **A later pass may not read
an `M-*` row as geometry evidence** (`RK-19`'s false-green class). Landing: §2.5, `§3.3 I-8`,
`§3.4 R-6`, §5.2, §7 item 6, `§3a A-16`.

**No new ruling is asked of the architect by this filing.** Every clause the ledger leaves open is
decided above, with its reason, its landing site and its falsifying row; **`§7a`'s list is therefore
EMPTY after `§7a.1`'s rulings** (`§7a` items 1–8 are all decided here, and none is left open).
**One item is REPORTED as a standing risk rather than a question** (`§5.5.1`'s honesty item 5: this pass
could not execute the pinned-seed generator, so the draws' distinct-member count is an **execution
record** the red run must report — **not** an architect question, and it blocks nothing).

**Ruling note 11 — THE ARCHITECT RULING OF 2026-09-27, recorded here VERBATIM as the contract's own dated
ruling.** *(This note is added by the annotation pass; the ten notes above are `§0A`'s as-filed text and
are kept visible. **No section number moves, no note is renumbered, and `§0A` keeps its number.**)*

**The ruling, word for word:** *"**Non-revealed zones still exist, they just don't get displayed.**"*

**What it resolves, stated exactly.** This filing had escalated ONE clause it declined to guess: the
**`C-A`-versus-`revealed` tension** — whether the returned record's key set (*exactly `zones`*) forces a
key for a zone the consumer's predicate **declines**, or whether a declined zone is **omitted**. **The
ruling resolves it in READING A — the reading this filing pinned provisionally as its best reading at
`§7a.1` item 4 and in ruling note 9 above.** **The ruling confirms it and makes it UNCONDITIONAL.**

**The exact clauses the ruling settles — named, and none besides these:**

| Clause | What the ruling makes of it |
| --- | --- |
| **`§2.4 C-A` — the returned record's key set** | **EXACTLY `zones`, in first-seen order, INCLUDING every zone the `revealed` predicate declines.** **A non-revealed zone EXISTS in the record — it is not dropped, not omitted and not filtered**, and **a zone the predicate declines costs ZERO delegate calls (`§2.3` item 6 is unchanged) while still owning its key.** **The clause is now UNCONDITIONAL and is NOT a subset claim** — it is not *"exactly the zones that produced a token"* and not *"exactly the revealed zones"*. |
| **`§2.4 C-C` — `revealed`** | **`revealed` decides DISPLAY, and only display.** **A declined zone's token is the family's empty/absent-display value — `''` — not a removed entry.** **`revealed` remains a CONSUMER DECISION, NEVER A DEFAULT**: there is still **no built-in default reveal, no guessing from the census, and no `undefined`-means-hidden (or `undefined`-means-visible) fallback**. **The ledger's clause is unchanged and is now fully consistent with `C-A`.** |
| **`F-2`** | Unchanged in its outcome (absent/non-callable/throwing `revealed` ⇒ **the empty record**) — but **the ruling fixes that this is the ZERO-ZONE case, not the declined-zone case**: `F-2` drives `revealed` that is **not a predicate at all**, so **no zone is ever enumerated-and-decided**; whereas a **callable** predicate that returns falsy leaves **every zone present with `''`** (`C-A` (a)). |
| **`M-4`** | **CONFIRMED as filed:** *"A non-revealed zone costs ZERO delegate calls"* — and the ruling adds its complement: **the record contains the key with `''`** (the row already asserts this; the ruling makes it unconditional). |
| **`I-2` / `I-5`** | **`I-2` CONFIRMED UNCONDITIONAL:** the key-set invariant is **exact equality against the enumerated zone set**, **never an omission** — and the ruling removes the last clause under which it could have been read as a subset. **`I-5` CONFIRMED:** presence is the caller's decision **and display is the caller's decision too** — the ruling separates **existence** (the record's key set, which is this unit's) from **display** (the consumer's, which is not expressed in the record's value domain). |
| **`P-CN-IM-1` cells `10`/`15`/`17`** — the three **callable-predicate** variants (`() => true`, `() => 1`, the spy `(id) => id !== 'b'`) | **CONFIRMED on the Reading-A form as filed**: the expected record is **all three keys** with the declined zone(s) carrying `''` — **the predicate decides the VALUE, never the PRESENCE.** **No cell, count, term or strategy id changes.** |
| **`P-CN-SM-3`** — the zero-boundary row | **CONFIRMED as filed**: its three causes (`zones` yields nothing; `revealed` decides nothing; both) **each return the SAME empty record shape**, and **the ruling does not merge this row with `C-A`'s declined-zone case** — a **declined zone is not a zero-boundary case**: the row drives `revealed` over **zero-member / non-enumerable inputs**, so no zone is present to decline. **No term changes (`10` shapes × `3` passes = its declared `30`, distinct drives `10`).** |

**THE SPENT CONTINGENCY — withdrawn with provenance, kept visible rather than deleted (the
annotate-never-rewrite convention).** While the escalated clause was open, this filing framed the
`C-A`-versus-`revealed` question as a **provisional best reading** (ruling note 9 above: *"THE READING THIS
FILING PINS"*) and left open the alternative **"omit-reading"** — *"the returned key set is exactly the
zones that were REVEALED"* — under which a declined zone would have been **omitted** and several expected
outcomes (`C-A` (a), `M-4`, `F-2`'s declined-zone complement, the register cells flagged conditional)
would have read differently. **THAT CONTINGENCY IS NOW WITHDRAWN — SPENT, NOT OPEN**, and **it is recorded
as a spent contingency with its provenance** (the escalation and this ruling) **rather than being silently
deleted**, because a later pass that finds the provisional framing must be able to see that it was spent
and by what. **THE OMIT-READING IS NOT AN AVAILABLE READING OF THIS CONTRACT AND MAY NOT BE IMPLEMENTED,
TESTED OR RE-OPENED:** **the architect's own words are that non-revealed zones "still exist"** — so **a
module that omits a declined zone FAILS the `C-A` key-set row, and a row that EXPECTS an omission FAILS
this spec's text** (`§4.4 S-9`). **Nothing else in the register changes on the ruling's
account: no id, no strategy id, no attempt term, no `YES`/`YES (bounded)` marking, and the total stays
`248` = `68+36+24+14+30+10+30+36`** (`§5.5.1`'s attempt arithmetic, re-verified after this annotation
pass).

**Ruling note 12 — THE FALSIFIERS the ruling carries, stated so a red row can be DERIVED from it.** *A
ruling that cannot be falsified is not a contract clause.* **The ruling is falsifiable, and its five
falsifiers are:**

- **(a) THE KEY-SET FALSIFIER.** For a `revealed` predicate that **declines** zone `z` (a callable
  returning falsy for `z`), **`Object.keys(record)` STILL CONTAINS `z`** — and, for the whole drive, the
  record's own enumerable string-key set equals the enumerated zone set **EXACTLY, by SET EQUALITY**
  (`C-A`). **A red row asserts `z`'s membership by `Object.keys`/`Object.hasOwn`, never by its value.**
- **(b) THE DISPLAY-VALUE FALSIFIER.** The declined zone's **value** is the family's absent-display value
  **`''`**, **NEVER a token** — asserted as **strict equality to `''`** and as **`!==` the caller's
  `emptyToken`**, with the delegate spies proving **`trackFor` was never called for that zone**.
- **(c) THE OMISSION FALSIFIER.** **A module that OMITS a declined zone FAILS the key-set row** — the red
  row is written so that a record missing `z` fails **that** row, not a later one.
- **(d) THE TOKEN FALSIFIER.** **A module that EMITS A TOKEN for a declined zone FAILS the reveal row** —
  i.e. the value-assertion row of (b) fails for any non-`''` value, including the caller's own
  `emptyToken`, a `'0px'`-shaped literal or any size-derived string.
- **(e) THE NEVER-A-DEFAULT FALSIFIER.** **A module that DEFAULTS reveal to true, or that READS THE CENSUS
  to guess a reveal, FAILS the never-a-default row** — driven with a callable predicate that declines a
  zone AND with an absent/non-callable predicate, asserting the two outcomes differ exactly as `C-A` (a)
  and `F-2` pin, so **no substitution of a policy for the caller's decision can pass**.

**⟶ THE CONSEQUENCE THE RULING MAKES EXPLICIT, AND THE LIMITATION IT LEAVES — stated plainly, because it
is the load-bearing honesty item for a consumer.** The architect's sentence distinguishes **existence**
from **display**; **THIS UNIT'S CONTRACT HAS NO CHANNEL THAT EXPRESSES DISPLAY STATE.** Every outcome here
is a **VALUE** — the ruled family style of `U-ZONES`'s **"no refusal domain"** (`§0A` ruling note 8,
`I-9`) — and **the record's value domain is `string`.** **So under this ruling a consumer reading ONLY the
record CANNOT DISTINGUISH three cases that all yield `''`:** **(i)** **the consumer's `revealed` DECLINED
the zone** (the ruling's own case: the zone exists, it is not displayed); **(ii)** **the zone's spec entry
is MALFORMED** (the delegate's malformed-spec limb, reached with `undefined` — `F-3`/`F-4`); **(iii)** **the
zone's size lookup MISSED** and the caller's `emptyToken` happens to be `''` (the delegate's empty limb —
`§2.3` item 4). **Three different causes, one `''`.** **THE HONEST CONSEQUENCE, named:** a consumer that
needs the distinction **must keep its own reveal decision** (it already holds the predicate it passed in —
this unit reflects the decision it was handed and nothing else) **or read the record's KEY SET, NOT the
value** — because **the key set is the existence signal and the value is only the display payload**.
**THE REVISIT CONDITION:** **a unit that needs a per-zone display/existence CHANNEL — a status record, a
reason domain, or a sentinel OTHER than `''` — is a NEW CONTRACT that must go through its own gate; it may
not be smuggled in as a value-semantics change to this one.** **A sentinel and a second value domain are
NOT invented here:** the ruling does not authorise one, and **inventing one would break this unit's
delegation to `U-ZONES`** (a second token authority — `§0A` ruling 4, `I-4`, `§3.4 R-1`) **and the `V-13`
anti-second-authority argument** (`§0` ruling 3, §8). **This limitation is recorded as a STATED LIMIT of
the mechanism, not as a defect and not as a parked question** — and **it is not an architect question
either: it is what the ruled mechanism honestly does.**

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no Electron
window booted, and **no result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module and its predecessor's | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **not offered by this spec** (§5.2) |

**Four honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this
   repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No window
   is booted, no IPC round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **This unit touches no DOM at all, not even the shim.** Its rows need **no element, no document and no
   shim**: every input is an argument (an enumeration of zone ids, an opaque census, two lookups, a
   predicate, a spec set). **A `[T]` green here proves ARITHMETIC, DECISION and DELEGATION only.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no
   `globalThis`-rooted lookup, no `matchMedia`, no `getComputedStyle`, no `activeElement`, no `Date`, no
   `Math.random`, no `process.env`. It is admissible under **(B)** (a pure function whose **every**
   environment reading is an injected argument) and is judged under **(C)'s six prohibitions**, which
   `§2.2` asserts.
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its
   rows are authored in **this unit's own test file** and executed by the **same node suite**
   (`npm test`, `§5.2` leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and
   **no register row may be read as `[H]`, `[U]` or assembled-app evidence.**

---

## 1. Scope

**One deliverable: one pure function and a three-name export surface, in one `src/shared` module** — the
census → track-variable record, computed **only** from caller-supplied values and **delegating every
token byte to `U-ZONES`**.

1. **What the unit is, in one sentence.** A **pure** function that, given **the caller's zone
   enumeration**, **an opaque census**, **two caller lookups** and **the caller's reveal predicate**,
   returns **a record whose key set is exactly `zones`** and whose values are **the exact track tokens
   `U-ZONES` produces** — computing nothing the caller did not supply, deciding nothing the consumer
   owns, and writing nothing anywhere.
2. **What it is NOT — the census is INJECTED, and it is neither this unit's state nor its authority.**
   This unit **owns no census, no zone set, no registry, no default and no count**: the census arrives as
   an **argument**, is **read only by the delegate** (`isEmpty`), is **never stored, never cached into,
   never mutated**, and **the module contains no census read of its own** (`§2.4` clause `C-B`,
   `§3.3 I-3`, ruling note 4). **This is the `V-13` remedy** (ruling 3).
3. **What it is NOT — the token authority is `U-ZONES`'s.** This unit **imports `isEmpty` and `trackFor`
   and calls them**; it **does not** re-implement size formatting, the empty-token limb, the
   malformed-spec limb, the `-0` rule, the `Map`/record census semantics or the dispatch precedence.
   **A second copy of any of those is a FINDING** (ruling 4, `§3.4 R-1`, `§4.4 S-1`).
4. **What it is NOT — `U-PROJ` owns the projection/applier.** **No write map, no custom-property name, no
   unit arithmetic, no sink, no `setProperty`, no `applyVarsToRoot`-shaped function, no applier, no write
   of any kind.** `U-PROJ`'s `project(values, specOf)` is a **separate contract in a separate module**,
   and **this unit neither imports nor re-expresses it** (`§3.4 R-1`/`R-5`).
5. **What it is NOT — no CSS, no DOM, no store, no writes.** **No stylesheet, no declaration, no class
   name, no rule, no token literal, no attribute, no element read or written, no global touched, no
   module-level mutable state, no persistence, no `Map`/`WeakMap` cache.** **The `:has()` rules and the
   collapse-override declaration stay consumer-side** (ruling 7, `§2.2` P-2).
6. **What it is NOT — a geometry claim of any kind.** *The arithmetic is provable here; any claim about
   the rendered geometry is UNPROVABLE in this repo today* (ruling 6, `§2.5`, `§3.3 I-8`, `§5.2`).
7. **The `U-GUTTER` boundary, stated as the successor contract (this unit is the predecessor).**
   **`U-GUTTER` (row `E3`, `docs/specs/gutter.md` — OWED, not filed) DEPENDS ON THIS ONE** and composes
   the node-local session **with** the sizes a census supplies. **What it may take from this unit: the
   `sizes` VALUE it already injects, and the token strings the record carries — and NOTHING ELSE.** It
   may **not** import this module (`§1` item 1's boundary is one-directional: **this module's only import
   is `U-ZONES`**, and `U-GUTTER`'s contract is *"arithmetic over injected values"* — a dependency edge
   asserted the other way would be a **fabricated edge**, `H-r6`'s dissolved-edge class). **Its
   geometry clause is its own** and this unit supplies no evidence for it (§5.2, §7 item 6).
   **⟶ THE SIBLING-FACING CONSEQUENCE OF THE ARCHITECT RULING (2026-09-27), stated here because
   `U-GUTTER` (`E3`) and `U-RELOCATE` (`E4`) will consume THIS record (`§0A` ruling note 11 verbatim:
   *"**Non-revealed zones still exist, they just don't get displayed.**"*).** **(a) THE KEY SET IS THE
   FULL `zones` SET REGARDLESS OF REVEAL.** A consumer driving **geometry per KEY** — a `U-GUTTER`
   composing one track's controller per zone, or any consumer iterating `Object.keys(record)` — **SEES
   EVERY ZONE**, including every zone the predicate declined; **that consumer must therefore consult its
   OWN reveal decision for DISPLAY**, because **the record's value does not express display state** (a
   declined zone's value is `''`, exactly as a malformed-spec zone's or an `''`-`emptyToken` size-miss
   zone's value is — the three-way `''` collision stated as this mechanism's STATED LIMIT in `§0A` ruling
   note 12). **Iterating the record's KEYS and reading the record's VALUES are therefore two different
   questions — existence and display — and only the first is answered by this contract.** **(b)
   `U-RELOCATE`'s REVEAL-SET SEMANTICS ARE THE CONSUMER-SIDE COUNTERPART OF THIS RULE, NOT A COMPETING
   ONE.** The reveal set `U-RELOCATE` maintains is **the consumer's OWN state**, and **this unit merely
   REFLECTS the decision it is handed** (through the `revealed` predicate — `§2.4 C-C`): the two are the
   same decision seen from the two sides of the call, **so neither unit overrides, duplicates or
   re-derives the other's reveal semantics**, and **no clause of this contract is changed by
   `U-RELOCATE`'s reveal set existing** (`§1` item 10: `U-RELOCATE` stays `NOT THIS UNIT`, and this unit
   duplicates none of its responsibility — `§3.4 R-5`). **Neither consequence adds a parameter, a field, a
   value domain or a row to this unit: both are what the ruled mechanism honestly does.**
8. **Two dependencies EXPLICITLY ABSENT, recorded so a later pass does not assume them.** **(a)** The
   engine pin (`A-d2`) is **SPENT** — this module imports nothing from the engine, not even a type.
   **(b)** The adopted node-local interaction session **`U-GSESSION`** (`A-d3`/`S-d9`) is **NOT a
   dependency of this unit** and this unit **installs no listener, owns no element and takes no event
   source**: *"unless you find one"* — **this filing finds none, and states that plainly.** A dependency
   asserted later would be a **fabricated edge**.
9. **What the unit may land.** The module + its red/green rows + the register rows + this spec. **No host
   change**: this unit adds pure code and touches **no existing file** except this spec and the trackers
   (§5.1). **It does not touch `src/shared/zones.ts`, `tests/zones.test.ts`, `package.json` or
   `scripts/**`.**
10. **What is EXPLICITLY OUT of scope (do not do in this unit).** No re-implementation of `isEmpty` or
    `trackFor`; no census read of this module's own; no census mutation or caching; no `revealed`
    default; no key set other than exactly `zones`; no CSS/DOM/store/writes; no projection or applier
    (`U-PROJ`); no mount cardinality (`U-MOUNTGUARD`); no gutter/relocate/container/theme/session/
    list-host/slot-host behaviour (`U-GUTTER`, `U-RELOCATE`, `U-CONTAINER`, `U-THEME`, `U-GSESSION`,
    `U-LISTHOST`, `U-SLOTHOST`); no new MCP surface; no shim change; **no import from `src/main/**`,
    `src/renderer/**`, `provident-ssr` or any sibling mechanism module**; **no `docs/skills/
    designing-pages.md` update** — **no such file exists** (globbed `docs/skills/*` this pass:
    `process-guardrails.md` alone; `§3.5 R-11` is the probe), so there is **no test-use-case coverage
    matrix and no demo-page index to update**, and **this unit renders no page**.

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/census.ts`** (`§0A` ruling note 1), a pure `src/shared` module whose **ONLY
import** is its predecessor.

**EXPORT CENSUS — stated before the block, and it must AGREE with the block: THREE exported names, in TWO
halves — ONE value export (`computeTrackVars`) and TWO type declarations (`ZoneId`, `TrackVars`).** **The
two halves are counted separately on purpose**, because the sibling `U-PROJ` review and this unit's
predecessor both caught a spec cell whose count contradicted its own block — **a count that does not match
the block beside it is a review finding.** **This block declares exactly `1 + 2 = 3` exported names and
nothing else**, and **`§3.4 R-2` is the row that pins the SET (not the count).** **The illustrative block
below also carries TWO `export`-prefixed names that are NOT part of the module's exported surface —
`SizeLookup` and `SpecLookup` — and they are marked there as DOC-LEVEL ALIASES, named as such:** they
exist to give `§2.3` items 4/5 a name for the lookup shapes, **they are not exported, no row asserts them,
and no pass may add them to the module to make this listing agree.**

```ts
/** The ONLY import: the landed predecessor's module, its two value exports. No
 *  other import exists — not the engine, not a sibling, not `node:*`, not a
 *  type-only import (`R-1`). The specifier is the repo's ESM form. */
import { isEmpty, trackFor } from './zones.js'

/** A zone identifier, AS THE CALLER'S ENUMERATION YIELDED IT. This unit never
 *  normalizes, stringifies, trims or validates it (§0A ruling note 3): a record
 *  key is a `string`, a `Map`/`Set`/array member may be anything. It is carried
 *  VERBATIM to the caller's lookups and to `isEmpty`'s second parameter. */
export type ZoneId = string | number

/** The RETURNED record: a NULL-PROTOTYPE plain record whose own enumerable
 *  string keys are exactly the enumerated zone set and whose values are the
 *  exact tokens `U-ZONES` produced (§0A ruling note 7). Non-string zone members
 *  therefore appear under their `String()` image as an own key — stated plainly,
 *  because a `Symbol` member is the one zone id that CANNOT become an own key
 *  and is therefore DROPPED (F-1(b)). */
export type TrackVars = Record<string, string>

/** ⟶ DOC-LEVEL ALIAS, NOT AN EXPORT. The shape `sizes` may take: a callable
 *  `(zoneId, census) => unknown`, or an own-keyed record. */
// type SizeLookup = ((zoneId: ZoneId, census: unknown) => unknown)
//                  | Readonly<Record<ZoneId, unknown>>

/** ⟶ DOC-LEVEL ALIAS, NOT AN EXPORT. The shape `specOf` may take: a callable
 *  `(zoneId) => unknown`, or an own-keyed record. */
// type SpecLookup = ((zoneId: ZoneId) => unknown)
//                  | Readonly<Record<ZoneId, unknown>>

/** THE WHOLE CONTRACT, IN ONE SENTENCE: for every enumerated zone, ask the
 *  caller's predicate whether to emit it; if so, ask the caller's two lookups
 *  for its size and its spec and ask U-ZONES for the token — and return a record
 *  whose key set is EXACTLY the enumerated zone set.
 *
 *  TOTAL: returns a `TrackVars` record for EVERY input, NEVER throws, reads
 *  nothing but its six arguments, mutates NOTHING, caches NOTHING.
 *  Parameters, exact:
 *    - `zones`   — a SEQUENCE (a `Map` => its KEYS; a `Set`; an `Array`; any
 *                  object with a callable own `Symbol.iterator`) or a RECORD
 *                  (its own enumerable string keys). Every other input => ZERO
 *                  zones (§0A ruling note 2). Never read for a value beyond
 *                  its members; never mutated.
 *    - `census`  — an OPAQUE value handed VERBATIM to `isEmpty` as its FIRST
 *                  argument. This unit does not read it at all (§0A note 4).
 *    - `sizes`   — the caller's lookup: a callable `(zoneId, census) => unknown`
 *                  called AT MOST ONCE per enumerated zone, or an own-keyed
 *                  record. Anything else => every lookup is `undefined`.
 *    - `revealed`— the caller's DECISION, a callable `(zoneId) => unknown`
 *                  called AT MOST ONCE per enumerated zone. Absent, non-callable
 *                  or throwing => the empty record. NEVER defaulted (§2.4 C-C).
 *    - `specOf`  — the caller's lookup: a callable `(zoneId) => unknown` called
 *                  AT MOST ONCE per enumerated zone, or an own-keyed record.
 *  A malformed/absent `sizes` or `specOf` ENTRY yields `undefined`, which is
 *  handed to `trackFor` — so the outcome is `U-ZONES`'s own limb (the caller's
 *  `emptyToken`, or `''`), never an outcome this module invents.
 *  THE RETURNED RECORD'S KEY SET IS EXACTLY THE ENUMERATED ZONE SET — every
 *  enumerated zone has a key, whether revealed or not, whether its spec exists
 *  or not; and no key outside that set ever appears (§2.4 clause C-A). The
 *  record is built on `Object.create(null)` and its keys are in FIRST-SEEN
 *  enumeration order.
 *  NO refusal domain: no `code`, `ok`, `reason`, `skipped`, array, `null` or
 *  `undefined` is ever returned — every outcome is a VALUE (§0A ruling note 8). */
export function computeTrackVars(
  zones: unknown,
  census: unknown,
  sizes: unknown,
  revealed: unknown,
  specOf: unknown,
): TrackVars
```

**The parameters are FIVE and their ORDER is contract text:** `(zones, census, sizes, revealed, specOf)`
— **`revealed` fourth, `specOf` fifth**, exactly as the ledger, the gate record's `§1.2` and
`docs/decisions.md`'s `SHELL-CHROME-PANES-ZONES-IN-SCOPE` row all write it. **No options object, no
default parameter value, no overload and no rest parameter exists** — an options object would let a
caller smuggle a default in (the `A-15`-class hazard) and is **DECLINED**; `§3.4 R-2`'s arity half is
the row that pins it.

**The delegate clause, stated exactly (what this unit calls and what it may NOT re-derive).** This unit
calls **`isEmpty(census, zoneId) → boolean`** — its boolean goes **straight into** `trackFor`'s third
parameter, unmodified — and **`trackFor(spec, size, empty) → string`** — whose return value **IS** the
record's value for that key, byte for byte. **It must not append a unit, a `'+'`, a `calc(...)` wrapper
or a separator to the returned string; must not pre-scale or pre-format a size; must not substitute a
token for `''`; and must not implement any limb of `U-ZONES`'s arithmetic itself** (ruling 4, `§4.4
S-1`).

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain — the `H-r8` SIX-PROHIBITION TABLE

**Caller-supplied (never built in, never defaulted, never enumerated):** the zone enumeration; the census;
the `sizes` lookup and every size value; the `revealed` predicate and every decision; the `specOf` lookup
and every spec entry (`TrackSpec { trackProp, unit, emptyToken }`, **all three fields caller data**); and
the empty-token value itself (via `specOf`'s `emptyToken`, which `U-ZONES` emits verbatim). **The module
contains NO application string, NO default, NO union member, NO `code` field, and NO literal beyond its
own contract.** **The one literal the module is permitted is the degenerate empty string `''` — and only
as the ABSENCE of a value it would otherwise have to fabricate (an unrevealed zone's absent decision) —
which names nothing and cannot be mistaken for a caller value because every *emitted token* is the
delegate's own output (§2.4 clause `C-C`).**

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No consumer vocabulary** — no zone/pane/tab/region/track/column/gutter name, no closed union member, no documented default, no documented constant, and no `'0px'`/`'fit-content'`/`'1fr'` literal | Every string the module ever emits is **the delegate's output from caller data**; the module carries **no** vocabulary literal, **no** union, **no** `code` field and **no** default. The zone ids, the census, the sizes, the reveal decisions and the specs are **opaque caller data**; the module does not even know that an `emptyToken` may be `'0px'` | **`R-3`** (the vocabulary scan), `M-5`, `F-5`, `§3.3 I-6`, `§3a A-9` |
| **P-2** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates | The unit authors **no element, no text, no class, no attribute and no stylesheet**: it returns **one record of strings** per call, and **the `:has()` rules + the collapse-override declaration stay consumer-side**. A mechanism is outside the UI constraint **because it is not a UI element** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`) | **`R-3`**, `R-4`, `§3.3 I-6`, `§7` item 5, `§3a A-10` |
| **P-3** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default | **The four consumer decisions are the CALLER'S**: the zone set, the reveal decision, the size set and the spec set. **There is no default zone, no default census, no default size, no default spec (`TrackSpec`'s three fields are never defaulted by anyone, at either layer), and no default reveal.** The two "fallback" values are **the delegate's own limbs reached with `undefined`** (`emptyToken`, `''`), never a mechanism constant | `M-5`..`M-12`, `F-2`..`F-4`, `§3.3 I-5`, `§4.4 S-5`, `§7` item 7 (i) |
| **P-4** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` | **Zero module-level state**: no store, no cache, no registry, no memo, no counter, no `WeakMap`, no `Map`, no persistence. Every call is a pure function of its arguments; **the census, the lookups and the predicates are never written to and never retained** (`§3.3 I-3`/`I-7`) | **`R-4`**, `I-3`, `I-7`, `§3a A-7` |
| **P-5** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry | This module is **imported by no `src/**` file** and registers nothing: `ALL_TOOLS` stays **21**, `RpcMethod` stays **21**, `MUTATING_METHODS` stays **7**, `VALID_GROUPS` keeps its five members. **The five-seam negative is an explicit non-goal** | **`R-5`** (the import row), **`R-8`** (the diff-scope row), `§3a A-11` |
| **P-6** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** | **Every row in this file is `[T]` arithmetic/delegation over arguments.** **No row claims rendered geometry, CSS validity, layout, paint or DOM behaviour** — and this spec **offers no `[U]` row** (§5.2). `src/shared/dom-shim.ts` **gains no member** (`H-r5`) | **`R-6`** (the geometry row), §5.2, `I-1`, `§3a A-16` |

**The static prohibitions the table cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-8`) — the
sibling `U-PROJ` review's finding was that a prohibition citing *"a static source row"* **with no id
anywhere** is not a row. **Every static claim here has an id, a layer and a scan scope.**

### 2.3 The mechanism, stated falsifiably — the evaluation order and the five parameters

**Item 1 — the ENUMERATION of `zones`, evaluated IN THIS ORDER (the order is the contract: the first
shape that applies decides).**

| Order | Condition (exact) | Zone members |
| --- | --- | --- |
| **(a)** | `zones` is a non-`null` object **or** a function, **and** its `Symbol.iterator` is **callable** | **its iteration values, in iteration order** — for a **`Map`, the KEYS** (`map.keys()`), never the values; for a `Set`, its members; for an `Array`, its elements |
| **(b)** | otherwise, `zones` is a non-`null object` (not a function) | **its OWN ENUMERABLE STRING keys** (`Object.keys` order) — never a `Symbol` key, never a prototype member |
| **(c)** | otherwise — `null`, `undefined`, a primitive (a string, a number, a boolean, a `BigInt`, a `Symbol`), or a function **without** a callable `Symbol.iterator` | **ZERO zones** ⇒ the empty record `{}` |

**The stated clauses.** **(i)** A `Symbol.iterator` that is **present but not callable** falls to shape
(b) (an object) or (c) — **the test is `typeof it === 'function'`, not its presence**. **(ii)** An
iterator or a `next()` that **throws** is **caught, and the whole enumeration is then the members yielded
so far** — never a throw (`I-1`); **this is the one shape whose result depends on how far the iterator
got, and it is stated so a row asserts the CAUGHT class rather than a count.** **(iii)** A member whose
`String()` image is an **own key already present** (a **duplicate**, including `1` beside `'1'`) does
**not** add a second key: **the key is written once, at its FIRST-SEEN position, and its VALUE is the one
computed for the LAST occurrence** — because the record is a plain object and JS own-key writes overwrite
(last-write-wins) while the key order is first-seen (`§0A` ruling note 7). **(iv)** **A `Symbol` member is
the one member that CANNOT become an own key of the returned record and is therefore DROPPED** — stated
explicitly as the single exception to `C-A`, which is otherwise absolute (`F-1`(b)); **the mechanism does
not stringify it** (a stringified `'Symbol(x)'` would be an invented zone id). **(v)** No zone member is
ever **read as a value** — the mechanism holds no zone payload and looks at no member's own fields.

**Item 2 — the CENSUS is passed through, and the emptiness decision is the DELEGATE'S.** For each
enumerated zone that passes the reveal gate, this unit makes **exactly one** call
**`isEmpty(census, zoneId)`** and hands the returned boolean **unchanged** into `trackFor`'s third
parameter. **This unit performs NO census read of its own** — it does not test `census[key]`, does not
enumerate the census's keys, does not call `hasOwnProperty`, does not test `Map`/`Set`, and does not
infer emptiness from a size, a spec or anything else (ruling note 4, `§3.3 I-4`). **A non-record census,
an unsupported census shape, a hostile census, a throwing `get` — all of them are `U-ZONES`'s `false`,
and this unit neither knows nor corrects that** (`F-6`).

**Item 3 — the REVEAL gate, and the exact call discipline.** For each enumerated zone, this unit calls
**`revealed(zoneId)` at most once**, takes **`Boolean(...)` of the return**, and: **a truthy return ⇒ the
zone is EMITTED (it proceeds to the census/size/spec/token path); a falsy return ⇒ the zone is NOT
emitted.** **The gate is evaluated for every enumerated zone, INCLUDING zones the predicate would
obviously hide, and including when `revealed` is absent or non-callable** — in the latter case nothing is
called and every zone is not-emitted (`F-2`). **`revealed` is NEVER defaulted**: no clause substitutes a
visible or hidden value for the caller's own, and **`undefined` means "no decision was supplied", which
yields the empty record** (ruling note 6, `§2.4` clause `C-C`).

**⟶ ANNOTATED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 11, and this is where the ruling's
EXISTENCE/DISPLAY distinction lands in `§2.3`.** **The text above is unchanged in its call discipline**
(`revealed(zoneId)` at most once, `Boolean(...)`, zero delegate calls for a not-emitted zone — `§2.3` item
6). **What the ruling fixes is what "NOT emitted" MEANS, and both readings in the sentence above must be
read with it:** **a FALSY return from a CALLABLE predicate means the zone is not DISPLAYED — and its key
STILL EXISTS in the returned record, carrying `''` (`§2.4 C-A` (a), `M-4`)** — whereas **an ABSENT,
non-callable or throwing `revealed` is the no-decision case, which yields the EMPTY record with ZERO keys
(`F-2`).** **The two cases are therefore NOT the same outcome, and a row that conflates them FAILS this
spec's text** — *"not emitted"* is a statement about DISPLAY for the first case and about the WHOLE RECORD
for the second. **No clause above is weakened; the ruling removes the last reading under which the first
case could have been taken as a key omission.**

**Item 4 — the SIZE lookup, and what a missing/malformed size yields.** `sizes` is **a callable**
`(zoneId, census) → unknown`, called **at most once per enumerated zone** (and **only for zones that pass
the reveal gate**), **or an own-keyed record** read by own property. **Every unusable form —
`undefined`, `null`, a number, a string, an array, a function that throws, a record with a throwing own
accessor — yields `undefined` as the size**, and `undefined` is handed to `trackFor`, **which returns the
caller's `emptyToken` for it** (`U-ZONES` `§2.3` item 1 (b)). **The mechanism does not substitute a size,
does not default one, does not coerce one and does not test the delegate's limb itself.**

**Item 5 — the SPEC lookup, and what a missing/malformed spec yields.** `specOf` is **a callable**
`(zoneId) → unknown`, called **at most once per enumerated zone** (**only** for zones that pass the
reveal gate), **or an own-keyed record** read by own property. **Every unusable form yields `undefined`,
and `undefined` is handed to `trackFor`, which returns `''` for it** (`U-ZONES` `§2.3` item 1 (d) — the
malformed-spec limb, evaluated FIRST there and gating the other limbs). **The consequence is pinned
because it is the clause most likely to be mis-derived: a zone with NO spec entry still GETS ITS KEY**
— its value is `''`, **not** an omission, **because `C-A` binds the key set to `zones` and never to the
spec set** (`§0A` ruling note 9, `F-3`).

**Item 6 — the exact call counts, stated so a TestWriter can assert them.** For one call of
`computeTrackVars`: **`isEmpty` is called exactly once per ENUMERATED zone that passes the reveal gate**;
**`trackFor` is called exactly once per ENUMERATED zone that passes the reveal gate** (with that zone's
own spec, size and emptiness boolean); **`revealed` is called at most once per enumerated zone**;
**`sizes`/`specOf` are each called at most once per enumerated zone that passes the reveal gate**; and
**no delegate or caller function is called for a zone outside those sets** — **in particular, a
not-emitted zone costs ZERO delegate calls** and **a zone whose predicate threw costs ZERO delegate
calls** (`M-4`, `§5.5.1 P-CN-IM-4`).

### 2.4 The three contract clauses the ledger names, each stated FALSIFIABLY as a row

**`C-A` — THE RETURNED RECORD'S KEY SET IS EXACTLY `zones`, as SET EQUALITY.** *Let `E` be the set of zone
members the enumeration of `§2.3` item 1 yields. Then the returned record's own enumerable string-key set
equals `{ String(m) : m ∈ E }` MINUS the `Symbol` members* — **no key outside that set ever appears, and
no member inside it is ever omitted.** Concretely and each falsifiably: **(a)** a non-revealed zone **HAS
its key** (with the value `''`) — it is NOT omitted; **(b)** a zone whose spec/size is missing **HAS its
key**; **(c)** an EMPTY (or non-enumerable) `zones` ⇒ **the empty record `{}`** — an empty set is the
empty record, and **the record is still a valid `TrackVars`**; **(d)** a **DUPLICATE** zone (including a
number and the string image of it) yields **ONE key**, in first-seen order, with the last occurrence's
value (`§2.3` item 1 (iii), `M-7`); **(e)** the key `'__proto__'` **IS an own key of the returned record**
(null-prototype build, `§0A` ruling note 7); **(f)** a `Symbol` member is the **single** exception — it
cannot be an own key and is dropped, and **that is stated rather than left to be discovered**
(`§2.3` item 1 (iv)). **Pinned by `§2.3` items 1/3, `§5.5.1 P-CN-IM-2`/`P-CN-SM-2`, rows `M-1`/`M-2`/
`M-7`/`F-1`/`F-2`/`F-3`.**

**⟶ CONFIRMED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 11.** *("**Non-revealed zones still
exist, they just don't get displayed.**")* **The clause above is CONFIRMED on the form as filed and is now
UNCONDITIONAL**: the returned record's key set is **exactly `zones`, in first-seen order, INCLUDING every
zone a callable `revealed` predicate declines.** **This is NOT a subset claim** — it is not *"exactly the
zones that produced a token"* and not *"exactly the revealed zones"*; **(a) is confirmed verbatim: the
declined zone HAS its key, with the value `''`, and is NOT omitted.** **No text above is superseded, no
clause is weakened, and no other clause of this spec changes** — the ruling's five falsifiers and the
`''`-collision limitation it leaves are recorded at `§0A` ruling note 12.

**`C-B` — THE CENSUS OBJECT IS NEVER MUTATED, and this unit caches nothing into it.** After any call,
**all of the following are observably UNCHANGED, and each is a separate assertion**: **(a)** the census's
**own enumerable keys, in order and content**; **(b)** **every own value** (by `Object.is`), **including a
`-0` and a `NaN` value**; **(c)** the census's **prototype** (`Object.getPrototypeOf` returns the same
object reference/value); **(d)** its **frozen-ness** (`Object.isFrozen` unchanged — a frozen census stays
frozen and accepts the call without a throw); **(e)** its **own property DESCRIPTORS** (a getter stays a
getter; nothing is redefined); **(f)** for a `Map`, its **`size` and its entries** (`[...map.entries()]`
unchanged in order and content); **(g)** for a `Set`, its members; **(h)** no **new key, default or
sentinel** is created in it — **in particular no zone is written into the census, no `undefined` is
written for an absent zone, and no count is decremented or incremented**; **(i)** it is **never retained**
— a call with a census, then a call with a different census, then the first census again, behaves
identically every time (no memo, no cache, no `WeakMap`). **The same observables are asserted for
`zones`, for the `sizes`/`specOf` records, and for the predicate objects** (`§3.3 I-3`). **Pinned by
`§2.3` items 1/2, `§5.5.1 P-CN-IM-3`, rows `M-6`/`F-5`/`I-3`.**

**`C-C` — `revealed` IS A CONSUMER DECISION, NEVER A DEFAULT.** **What this FORBIDS, each falsifiably:**
**(a)** no **built-in reveal** — nothing the module emits is revealed unless the caller's predicate said
so; **(b)** no **guessing from the census** — a zone is never emitted because it looked empty,
non-empty, present or absent in the census (the census is not read by this unit at all, `§2.3` item 2);
**(c)** no **`undefined`-means-visible fallback**; **(d)** **no `undefined`-means-hidden fallback either**
— i.e. the module must not carry a *policy* for the absent case, only the **consequence** of having no
decision, which is **the empty record**; **(e)** **no per-zone default**, no *"reveal the first N"*, no
*"reveal when the size is non-zero"* and no *"reveal when the spec has a unit"*; **(f)** **no truthiness
of the PARAMETER itself** — a callable `revealed` is a predicate and is always consulted, never treated
as a boolean; **(g)** a **non-callable, absent or throwing** `revealed` yields **the empty record**, not a
partial one and not a throw. **The values of the keys that ARE emitted are unaffected by `revealed`** —
the predicate decides presence, and `C-A` (not the predicate) decides the key set (`§0A` ruling note 9).
**Pinned by `§2.3` item 3, `§5.5.1 P-CN-IM-2`, rows `M-3`/`F-2`/`I-5`.**

**⟶ CONFIRMED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 11.** *("**Non-revealed zones still
exist, they just don't get displayed.**")* **`revealed` is confirmed to be the DISPLAY decision, and only
the display decision**: **(a)–(g) stand exactly as filed and are NOT weakened** — **there is still no
built-in default reveal, no guessing from the census, no `undefined`-means-visible fallback and no
`undefined`-means-hidden fallback.** **What the ruling settles is the CONSEQUENCE for a decline: a zone the
predicate declines is present in the record with the family's absent-display value `''`, and the predicate
decides the VALUE, never the PRESENCE** (the `C-A` key set is not the predicate's to decide — text above
unchanged). **The record carries no display CHANNEL beyond that value; the limitation that follows (three
distinct causes all yielding `''`) is stated at `§0A` ruling note 12 and is this mechanism's STATED LIMIT,
not a defect.**

### 2.5 The geometry boundary, and the value semantics this unit does not own

**Item 1 — THE GEOMETRY CLAUSE (A-d4's mandatory wording, in this unit's own words).** *The
**arithmetic** is provable here.* **Any claim about the rendered geometry is UNPROVABLE in this repo
today.** Concretely and without hedging: **`computeTrackVars` returns a RECORD OF STRINGS; this spec
asserts the strings and NOTHING about what a browser does with them.** It does **not** claim any string is
valid CSS, that it parses, that it produces a track, that any track's size, ratio, collapse or overflow
is what a caller intended, or that any element's rendered geometry changes. **The node layer cannot see
any of that** (no layout engine, no `getComputedStyle`, no paint), **and this spec offers no `[U]` row** —
so there is **no leg on which such a claim could be made from this unit at all** (§5.2, `§3.4 R-6`).
**`RK-19`'s class — a later pass "proving" geometry from a node-green — is the finding this clause exists
to prevent.**

**Item 2 — the value semantics are `U-ZONES`'s, and this spec does not restate them as its own.** An
emitted value is **one of exactly three things**: the caller's `emptyToken` **verbatim** (the empty limb),
or **`String(size) + unit`** (the non-empty limb, with the caller's `unit` appended raw), or **`''`**
(the delegate's malformed-spec limb). **The rules that produce them — the limb order, the `-0` case, the
no-coercion rule, `String()` numeric formatting, the empty-token-is-caller-data rule — are `docs/specs/
zones.md`'s `§2.3`/`§2.4`, cited by SECTION and NOT re-derived or re-pinned here.** **A row of this unit
must assert them ONLY through this unit's own rows, and a row that re-states a `U-ZONES` limb with a
different answer would be `§4.4 S-1`.**

**Item 3 — the one outcome this unit DOES own is the ABSENT-DECISION value `''`.** Where a zone is not
revealed, **the record's value for that key is the empty string** — **this is this unit's own contract
text** (it is the only honest value for *"the consumer declined to emit this zone"*, and it is not a
token), and it is the ONE place this module writes a literal. **It names nothing, it is not a CSS value,
it is not a fallback for a caller value, and it is distinguishable from the delegate's malformed-spec
`''` only by the caller's own expectations — stated plainly so a consumer is not surprised** (`F-2`(c)).

**⟶ ANNOTATED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 12, and this item is where the
mechanism's STATED LIMIT lands in `§2`.** **The ruling's sentence distinguishes EXISTENCE from DISPLAY;
this unit's record can express existence (the KEY SET — `C-A`) and CANNOT express display state, because
every outcome here is a VALUE and the record's value domain is `string` (`§0A` ruling note 8, `I-9`).**
**Therefore THREE distinct causes all yield `''` and are indistinguishable from the record's VALUE alone:
(i) the consumer's `revealed` DECLINED the zone (this very item's case); (ii) the zone's spec entry is
MALFORMED (the delegate's malformed-spec limb, `F-3`/`F-4`); (iii) the zone's size lookup MISSED and the
caller's `emptyToken` happens to be `''` (the delegate's empty limb, `§2.3` item 4).** **A consumer that
needs the distinction must keep its OWN reveal decision (it already holds the predicate it passed in) or
read the record's KEY SET, not the value** — and **a unit that needs a per-zone display/existence CHANNEL
(status record, reason domain, or a sentinel other than `''`) is a NEW CONTRACT that must go through its
own gate: it may NOT be smuggled in as a value-semantics change to this one.** **No sentinel and no second
value domain is invented here** (that would break the `U-ZONES` delegation — `I-4`, `§3.4 R-1` — and the
`V-13` anti-second-authority argument, `§0` ruling 3). **The text above is unchanged and nothing in `§2.3`
item 3 is weakened: the value for a declined zone is still exactly `''`.**

**Item 4 — the record carries no order guarantee beyond first-seen order, and no caller may rely on
more.** `Object.keys(record)` yields the zones in **first-seen enumeration order**, which is contract
text only so a row can assert determinism; **set equality (`C-A`) is the binding half** and no consumer
may depend on an order this contract does not pin (a `Map`'s insertion order, an array's index order and
a record's `Object.keys` order are all "first-seen" here, and none of them is a sorting rule).

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. **Every row in
this file is a `[T]` row** — this unit reads no DOM at all — and **every row is a contract row for the
TestWriter; none is a measurement this pass took.** **Every row carries an id and a `Pinned by`
citation; a row without an id is what this repo's reviews keep catching.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **One revealed zone, a size and a full spec** | `computeTrackVars({a: 1}, {a: 3}, {a: 0}, () => true, {a: {trackProp:'--w', unit:'px', emptyToken:'0px'}})` | `{'a': '0px'}` — **the delegate's token**, and the record is a **null-prototype** object with exactly the key `'a'` | §2.1, §2.3 items 1/4/5, `§0A` note 7 | `[T]` |
| **M-2** | **Three zones of mixed member types, a `Map` enumeration** | `zones = new Map([['a', 1], ['b', 2], ['c', 3]])`, all revealed, sizes/specs present | **three keys, `'a'`/`'b'`/`'c'` — the MAP'S KEYS, never `1`/`2`/`3`**; `Object.keys` equals `['a','b','c']` | §2.3 item 1 (a) | `[T]` |
| **M-3** | **A non-empty zone emits the size + unit form** | census `{a: 3}`, size `120`, spec `{unit:'px'}` | `'120px'` — i.e. the non-empty limb was reached **because the census said so** (a positive control: swap the census to `{a: 0}` and the value becomes the `emptyToken`) | §2.3 item 2, `§2.4 C-C` (b) | `[T]` |
| **M-4** | **A non-revealed zone costs ZERO delegate calls** | `revealed` a spy returning `false`; `isEmpty`/`trackFor` spies | **the record contains the key with `''`** (`C-A` (a)); **`isEmpty` called `0` times, `trackFor` called `0` times, `sizes`/`specOf` called `0` times**; `revealed` called once | §2.3 items 3/6, `§2.4 C-A` (a)/`C-C` | `[T]` |
| **M-5** | **The full call discipline on a mixed call** | three zones; zone 1 revealed + full data, zone 2 non-revealed, zone 3 revealed with a `sizes`/`specOf` miss | `isEmpty` called **exactly `2` times** (`(census,'1')`, `(census,'3')`), `trackFor` **exactly `2` times** (zone 3's size `undefined`), `sizes`/`specOf` **at most once per revealed zone**; the record has **all three keys** | §2.3 item 6, `§2.4 C-A` | `[T]` |
| **M-6** | **A `Map` census is handed through unchanged** | `census = new Map([['a', 0]])`, zone `'a'` | the value is the caller's `emptyToken` (the census IS read by the delegate) — and the `Map` is observably unchanged afterwards (`size` and entries) | §2.3 item 2, `§2.4 C-B` (f) | `[T]` |
| **M-7** | **Duplicate zones collapse to ONE key (and the value follows the last occurrence)** | `zones = ['a', 'b', 'a']` with `sizes` a record `{a: 5}` | **exactly two keys, and `Object.keys` order is `['a','b']`** (first-seen wins the position); the value is the one computed for the **last** `'a'`; **no zone is double-counted** | §2.3 item 1 (iii), `§2.4 C-A` (d) | `[T]` |
| **M-8** | **Callable `sizes` is called once per revealed zone, with `(zoneId, census)`** | `sizes = (id, c) => (c[id] === 0 ? 0 : 40)` (a spy), two revealed zones | the spy records exactly `2` calls, the **census argument is the caller's own object by identity**, and the returned sizes are used | §2.3 item 4 | `[T]` |
| **M-9** | **Record `sizes`/`specOf` are read by OWN property** | `sizes = Object.create(null)` carrying only `{a: 0}`; and a plain record whose **prototype** carries `b` while the record itself does not | `'a'` resolves to `0`; **`'b'` resolves to `undefined`** (never a prototype member) | §2.3 items 4/5, `§0A` note 5 | `[T]` |
| **M-10** | **Callable `specOf` is called once per revealed zone** | `specOf = (id) => ({trackProp:'--x', unit:'px', emptyToken:'ZZ'})` (a spy), one revealed zone, size `7` | `'7px'`; the spy records exactly `1` call | §2.3 item 5 | `[T]` |
| **M-11** | **A truthy non-boolean reveal return is TRUTHY** | `revealed = () => 1`, then `() => 'yes'`, then `() => ({})` | **all three emit the zone** — the gate is `Boolean(...)`, never `=== true` | §2.3 item 3 | `[T]` |
| **M-12** | **A falsy non-boolean reveal return is FALSY** | `revealed = () => 0`, `() => ''`, `() => null`, `() => NaN` | **all four do NOT emit** — the key is present with `''` and no delegate call happens | §2.3 item 3, `§2.4 C-A` (a) | `[T]` |
| **M-13** | **The `'__proto__'` zone id is an own key** | `zones = ['__proto__']`, `sizes`/`specOf` records carrying own `'__proto__'` entries (`Object.defineProperty`), revealed | **`Object.hasOwn(record, '__proto__') === true`**, the value is the delegate's token, `Object.getPrototypeOf(record) === null`, and `Object.prototype` is unmodified | §0A note 7, `§2.4 C-A` (e) | `[T]` |
| **M-14** | **Two calls, identical arguments, identical results** | the `M-1` call driven twice, compared with `toEqual` and per-key `===` | **equal by value**, same key order, both null-prototype; no state is carried between the calls | §2.4 `C-B` (i), `§3.3 I-7` | `[T]` |

### 3.2 Documented fail-states / non-happy states (each is a row; **there is no refusal domain, so every outcome here is a VALUE** — §0A ruling note 8)

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A `zones` that is NOT an enumeration ⇒ the EMPTY record** | `zones` driven as `null`, `undefined`, `42`, `'abc'`, `true`, `Symbol('z')`, `() => {}` (a function with no `Symbol.iterator`) — **(b)** a `Symbol` MEMBER: `zones = [Symbol('s')]` | **(a)** `{}` is returned — no throw, `isEmpty`/`trackFor` called `0` times, and **the returned value is still a valid `TrackVars`**; **(b)** the `Symbol` member is **DROPPED** (no own key can carry it) — **the row states this as the single stated exception to `C-A` and does NOT expect a stringified key** | §2.3 item 1 (c)/(iv), `§2.4 C-A` (c)/(f) | `[T]` |
| **F-2** | **`revealed` absent, non-callable, or throwing ⇒ the EMPTY record (NEVER a default)** | **(a)** the argument OMITTED; **(b)** `undefined`; **(c)** `null`, `42`, `'x'`, `true`, `{},` `[]`, a `Map`; **(d)** `() => { throw new Error('x') }` | **`{}` in every case, for a NON-EMPTY `zones`** — no throw, no key, **no visible fallback and no hidden fallback**; `isEmpty`/`trackFor` called `0` times; and **the row asserts the forbidden readings explicitly**: a module that reveals everything on `undefined` FAILS, and a module that reveals nothing *by policy* rather than by absent decision fails `C-C` (d) in the register's drive | §2.3 item 3, `§2.4 C-C` (a)–(g), `§5.5.1 P-CN-IM-2` | `[T]` |
| **F-3** | **A zone with NO spec entry (and/or no size entry)** | `zones = ['a','b']`, `specOf = {a: {unit:'px', emptyToken:'0px', trackProp:'--a'}}`, no `b` entry; `sizes` likewise missing `b` | **TWO keys** — `'a'` gets its token and **`'b'` gets `''`** (the delegate's malformed-spec limb, reached with `undefined`); **`trackFor` WAS called for `'b'`** (with `undefined` spec and `undefined` size); **no per-field distinction, no omission, no throw** | §2.3 item 5, `§2.4 C-A` (b) | `[T]` |
| **F-4** | **A MALFORMED `sizes`/`specOf` ENTRY (wrong type, throwing accessor)** | `sizes` driven as a size of `-1`/`NaN`/`'12'`; a `sizes` record whose own accessor for the zone **throws**; a callable `sizes` that **throws**; the same for `specOf` (a spec that is `null`, `42`, `{}`, a wrong-typed field, a throwing accessor) | **the size case ⇒ the caller's `emptyToken`; the spec case ⇒ `''`** — i.e. **the delegate's own limbs, reached with what the lookup yielded**; **no throw ever escapes**, the key is still present, and **this unit invents no outcome** | §2.3 items 4/5, `§4.4 S-1` | `[T]` |
| **F-5** | **A census that is unusable or hostile is the DELEGATE'S answer, not this unit's error** | `census` driven as `null`, `undefined`, `42`, an **array** (`[0]`), a **`Set`**, a **function**, a `Proxy` whose `get` throws, a record whose own accessor throws | **no throw**; every revealed zone yields **the `emptyToken`** (because `isEmpty` answered `false` — it is a total function); **the census is unchanged** in every observable respect | §2.3 item 2, `§2.4 C-B`, `§3.3 I-4` | `[T]` |
| **F-6** | **A NON-STRING zone member is never empty, whatever the census holds** | `zones = [42]` with a record census owning `'42'` = `0`; and `zones = new Map([[42, 0]])` | **no throw**; the zone key is `'42'` (the member's `String()` image becomes the own key) and its value is **the `emptyToken`** — **because `isEmpty(census, 42)` is `false`** (`U-ZONES` `§2.3` item 2 (c)); **the row states the reason in its assertion message so the behaviour is never read as a defect** | §0A note 3, `§2.3` items 1/2 | `[T]` |

**⟶ ANNOTATED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 11, and `F-2` is the row whose
BOUNDARY the ruling sharpens.** *("**Non-revealed zones still exist, they just don't get displayed.**")*
**`F-2` drives `revealed` that is NOT A PREDICATE AT ALL** (omitted, `undefined`, non-callable, throwing),
so **no zone is ever enumerated-and-DECLINED in this row: the whole record is empty because no decision was
supplied** — **`F-2` is the ZERO-ZONE case, NOT the declined-zone case.** **The declined-zone case is a
CALLABLE predicate returning falsy, and it is `M-4`/`M-12`'s: there every key EXISTS with `''` (`C-A`
(a)).** **The two are different rows on purpose and the ruling confirms the split; a row that expects `{}`
for a callable predicate that declines a zone FAILS this spec's text, and a row that expects a key from an
ABSENT `revealed` FAILS it in the other direction.** **Nothing in `F-2`'s own text is superseded, and its
forbidden readings stand exactly as filed.**

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **`computeTrackVars` returns a `TrackVars` record for EVERY input and NEVER throws** — a hostile `Symbol.iterator`, a throwing iterator, a throwing `sizes`/`specOf`/`revealed`, a revoked `Proxy`, a `Symbol` member, a `BigInt` — and it never returns `null`, `undefined`, an array or a primitive | Totality, and the one contract a consumer can rely on unconditionally | §2.1, `§5.5.1 P-CN-SM-1` |
| **I-2** | **THE KEY-SET INVARIANT (`C-A`): the returned record's own enumerable string-key set is exactly the string images of the enumerated zone members** (the `Symbol`-member exception of `§2.3` item 1 (iv) aside) — **never an extra key, never an omission** — and the keys are in first-seen enumeration order | The ledger's second binding row, and the half of the `V-13` remedy that says *no second authority over the zone set* | §2.4 `C-A`, `§5.5.1 P-CN-IM-2`, `§5.5.1 P-CN-SM-2` |
| **I-3** | **THE NEVER-MUTATE INVARIANT (`C-B`): no argument is mutated and none is retained.** After any call, `zones`, `census`, `sizes`, `specOf`, `revealed` and every value they hold are **reference-identical and value-identical**; a frozen census/record/array behaves exactly like its unfrozen twin; a `Map` keeps its `size` and entries; nothing is written into the census (no key, no default, no sentinel) | The ledger's third binding row, and the OTHER half of the `V-13` remedy — the second authority is closed by never writing | §2.4 `C-B`, `I-3`, `§5.5.1 P-CN-IM-3` |
| **I-4** | **THE DELEGATION INVARIANT: every token byte comes from `trackFor`, and every emptiness decision comes from `isEmpty`.** The record's value is **`trackFor`'s returned string, unmodified**, for every revealed zone; this unit performs **no census read of its own**, tests no limb of the delegate's arithmetic, and holds no token formatting of its own | One authority over tokens, not two (ruling 4); the `V-13` class | §1 item 3, §2.3 items 2/6, `§3.4 R-1`, `§5.5.1 P-CN-IM-4` |
| **I-5** | **THE NO-DEFAULT-REVEAL INVARIANT (`C-C`): presence is the caller's decision, ALWAYS.** No zone is emitted without a truthy `revealed` return for it; no `undefined`/absent/malformed `revealed` yields anything but the empty record; nothing about a zone's census shape, size or spec makes it visible; and the predicate is always CALLED (never coerced to a boolean) | The ledger's first binding row, in its every-state form | §2.4 `C-C`, `§5.5.1 P-CN-IM-2` |
| **I-6** | **The mechanism contains NO consumer vocabulary, NO CSS, NO token value, NO default and NO union member** — every string it EMITS is the delegate's output over caller data; the one literal it may write is the absent-decision `''`, which names nothing | Prohibitions 1/2/3 (`H-r8`), made falsifiable | §2.2 (P-1..P-3), `§3.4 R-3`, `§5.5.1 P-CN-IM-3` |
| **I-7** | **Purity and no ambient read:** identical arguments ⇒ identical results, ALWAYS; no module-level mutable state, no cache, no memo, no counter, no registry, no store; **no `document`/`window`/`globalThis`/`matchMedia`/`getComputedStyle`/`activeElement`/`Date`/`Math.random`/`process.env`/`node:*`/engine read** | Prohibitions 4/6; admission clause **(B)** | §2.2 (P-4/P-6), `§3.4 R-4`, `§5.5.1 P-CN-IM-3` |
| **I-8** | **THE GEOMETRY INVARIANT: no row of this unit may assert a rendered-geometry, CSS-validity, layout or paint property, and no green of this unit may be reported as one.** Every row asserts **a record, a call count or a string** | A-d4's mandatory clause; `RK-19`'s false-green class | §2.5, §5.2, `§3.4 R-6`, `§3a A-16` |
| **I-9** | **No refusal domain: `computeTrackVars` returns ONE record and has no `code`, `ok`, `reason`, `skipped`, `status` or `errors` field**, and a row asserting one FAILS this spec's text | §0A ruling note 8; the class `U-ZONES` `§4.4 S-3` closes for that unit | §2.1, §2.2 (P-3), `F-4`, `§4.4 S-5` |
| **I-10** | **The record is a NULL-PROTOTYPE object** (`Object.getPrototypeOf(record) === null`), every zone id is an **own** key, and **no write to `Object.prototype` ever occurs** | §0A ruling note 7; the `'__proto__'`-is-a-legal-zone-id hazard | §0A note 7, `M-13`, `§5.5.1 P-CN-SM-2` |

**⟶ CONFIRMED BY THE ARCHITECT RULING (2026-09-27) — `§0A` ruling note 11, and it names `I-2`/`I-5`
explicitly.** *("**Non-revealed zones still exist, they just don't get displayed.**")* **`I-2` is CONFIRMED
UNCONDITIONAL:** the key-set invariant is **exact equality against the enumerated zone set, never an extra
key and never an omission**, and **the ruling removes the last clause under which it could have been read
as a SUBSET** (*"exactly the zones that produced a token"* / *"exactly the revealed zones"*). **`I-5` is
CONFIRMED with its scope made explicit:** **presence is the caller's decision, AND so is display** — the
ruling separates **EXISTENCE** (the record's key set, which is this unit's contract) from **DISPLAY** (the
consumer's decision, which **the record's `string` value domain cannot express**, `§0A` ruling note 12).
**Neither invariant is weakened, neither is widened, and no other invariant in this table changes.**

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for prohibitions 1, 2, 4, 5 and
6. **A prohibition citing *"a static source row"* with no id is not a row** — the sibling `U-PROJ`
review's own finding. **Every static claim in this file therefore has an id here**, and **each scan is
closed against the evasion class** by `§4.4 S-2`'s stop conditions (token assembly, comment-carrying,
realm-rooted computed access). **Every row here is `static`-layer: it reads the unit's own FILES, never
the module's runtime behaviour.** The **harness may read files**; **the MODULE may not** (`R-4`).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **`R-1`** | **THE DELEGATION ROW (the ledger's delegation clause; prohibitions 1/3; `§1` items 1/3).** *`src/shared/census.ts` imports EXACTLY `isEmpty` and `trackFor` from `./zones.js` — one import statement, two named bindings, no other import at all (no `provident-ssr`, no `node:*`, no `electron`, no sibling mechanism, **not even a type-only import**) — AND the module's source carries NO SECOND COPY of the token arithmetic.* **The falsifiable half, and it is a SOURCE scan with a bounded rule list:** **(a) the import half** — a missing import, a third binding, a rename (`import { isEmpty as ask }`) or an added import statement **FAILS**; **(b) the duplication half** — the module's **code with comments stripped** must contain **no** occurrence of **(i)** a string concatenation that builds a token (`String(...)` / a template literal / `+` applied to a size and a unit), **(ii)** a numeric-validity test (`Number.isFinite`, `isNaN`, `< 0`, `typeof … === 'number'`) applied to a value that is then used to CHOOSE a token, **(iii)** an assignment or return of `''` **in the spec-malformed position** (the `''` of `C-C`/`§2.5` item 3 is the one legal `''` site), or **(iv)** `hasOwnProperty`/`in`/`Map`/`Set`/`instanceof Map` applied to the **census**. **Rules are held as FRAGMENTS in the rule list so the scan cannot read its own rule list** (the `U-ZONES` `R-7` discipline), and **both controls are required**: a **positive** control (a fixture module inlining the arithmetic, or renaming the binding, **FAILS**) and a **negative** control (this unit's own legitimate text — the two call sites, `isEmpty`/`trackFor`, `computeTrackVars`, the `''` of `C-C` — **PASSES**). **The row's cited call sites are the falsifiable half of `I-4`: `isEmpty(census, zoneId)`'s boolean reaches `trackFor`'s third parameter unmodified.** | §1 item 3, §2.1 (the delegate clause), `§3.3 I-4` | static |
| **`R-2`** | **THE EXPORT-CENSUS + ARITY ROW (`§2.1`) — a SET claim and an ARITY claim, never a bare count.** **(a)** `src/shared/census.ts` exports **exactly the three names `§2.1` declares**: the runtime **value** export `computeTrackVars` (read from the imported namespace's own keys, with a **positive control** that a namespace carrying a second value export FAILS), and the type names `ZoneId` and `TrackVars` (read as types — erased at runtime, so this half is a **compile-time** claim; `§5.2` leg 4 covers it); **the DOC-LEVEL ALIASES `SizeLookup`/`SpecLookup` are NOT part of the surface and a module that exports them FAILS (a), and no row asserts them.** **(b)** `computeTrackVars.length === 5` — the five named parameters of `§2.1`, in the ledger's order — **and no options object, rest parameter or default-valued parameter exists** (a sixth declared parameter, a `...args` or an options object FAILS). **A row asserting only a COUNT (3, 5) without NAMING the names/parameters FAILS this row's own text — a count is satisfiable by renaming** | §2.1 (the census + the signature), `§4.4 S-3`, `§4.4 S-4` | runtime + type-level |
| **`R-3`** | **THE ANTI-EVASION VOCABULARY ROW (prohibitions 1/2).** *Over the MODULE's source (`src/shared/census.ts`) INCLUDING its comments, and over this row's OWN CONTROLLED CORPORA of `[T]` fixtures, no occurrence of a zone/pane/tab/region/track/gutter vocabulary token as a mechanism constant, symbol, union member or default, and no occurrence of a `'0px'`/`'fit-content'`/`'1fr'` literal as a mechanism constant.* **THE SCAN'S SCOPE RULE, which resolves this row's own collision:** *this spec's PROSE must carry the words — it has to, to state the prohibition — and the MODULE never contains this spec's text; and the TEST FILE must carry the raw spellings inside this row's own control DATA and its assertion messages, so a whole-file negative over the test file is DELIBERATELY DROPPED with that reason stated.* **Therefore: the vocabulary half reads the WHOLE module file (comments included) over a NORMALIZED view (string-literal concatenation JOINED, template substitutions joined, identifier chunks re-joined) with a word/identifier BOUNDARY rule; and the literal half reads CODE WITH COMMENTS STRIPPED** (the clause forbids the literal as a mechanism **constant**, and a comment is not a constant). **THE IMPLEMENTER WORDING HAZARD, stated explicitly so the module can satisfy the prohibition without this spec handing it an illegal spelling:** **this spec's own doc-comment text for the module carries the words `zone`, `census`, `track` and the `'0px'` mention — a module that copies this spec's wording into its own comments would FAIL the vocabulary half.** The module must word its own comments so as not to carry a bounded vocabulary constant. **Controls, both required:** a POSITIVE control (a corpus spelling the vocabulary raw, joined, and in a comment **FAILS**) and a NEGATIVE control (the unit's own legitimate text — `computeTrackVars`, `isEmpty`/`trackFor`, the parameter names, the diagnostic strings — **PASSES**) | §2.2 (P-1/P-2), `§3.3 I-6`, `§4.4 S-2` | static |
| **`R-4`** | **THE FORBIDDEN-ACCESS / NO-STORE ROW (prohibitions 4/6; `I-7`).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis`, a helper returning the realm, **the no-token realm route** (`({}).constructor.constructor('return this')()`, `Reflect.construct`) — **and no ambient read for a value**: `document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, `matchMedia`, `getComputedStyle`, `activeElement`, `Date`, `Math.random`, `process`, `node:fs`, `localStorage`, `eval`, `new Function`, `import(...)`. **Also asserted: ZERO module-level mutable state** — no `let`/`var` at module scope, no store, no cache, no memo, no `WeakMap`/`Map`, no counter, no registry — and **no `require`/`import` beyond `R-1`'s one statement**. **STATED LIMIT: a BLANKET ban on `[expr]` is NOT claimed** — a locally constructed object's computed access and ordinary array/`Object.keys` indexing carry no banned token and are **deliberately not banned**; **a row asserting "no bracket notation at all" FAILS this row's own text and is `§4.4 S-3`** | §2.2 (P-4/P-6), `§3.3 I-7`, `§3a A-7` | static |
| **`R-5`** | **THE CROSS-UNIT BOUNDARY ROW (prohibition 5; `§1` items 4/5/10).** *This unit duplicates NO sibling responsibility and imports no sibling module.* The falsifiable halves: **(a)** no **projection/applier** vocabulary or behaviour — no write map, no `setProperty`, no sink, no `applyVarsToRoot`/`project`-shaped export, and no import of `layout-projection.js`; **(b)** no **gutter/relocate/container/theme/session/list-host/slot-host** import or behaviour; **(c)** no **mount-cardinality** behaviour; **(d)** no CSS/DOM/store. **A positive on any half is a FINDING, not a style note.** **The row's honest limit: it binds THIS unit's own file, so a sibling that later imports this module is NOT a violation of it — that claim is `R-8`'s and `§7` item 2's** | §1 items 4/5/10, `§2.2` (P-5) | static |
| **`R-6`** | **THE GEOMETRY ROW (A-d4's mandatory clause, in falsifiable form).** *Over the MODULE's source AND over this unit's own `[T]` test file, the change set contains **no geometry-observation call and no geometry-shaped claim**: no `getComputedStyle`, no `getBoundingClientRect`, no `offsetWidth`/`offsetHeight`/`clientWidth`/`scrollWidth`-family member, no `matchMedia`, no `style` write, no class write, no `innerHTML`, no `document`/`window` use, and **no assertion whose failure message or description claims a rendered/layout/CSS-resolution fact**.* **Falsifiable form: its bound is exactly three parts — (a) the MODULE file's raw bytes, comments included; (b) THIS UNIT'S OWN `[T]` TEST FILE's raw bytes; (c) the row DESCRIPTIONS extracted from that test file (`it`/`describe` titles)** — with the geometry tokens held as **FRAGMENTS** in the rule list (so the scan cannot read its own rule list), a **positive control** (a corpus that observes geometry must FAIL; a description claiming a resolution fact must FAIL) and a **negative control** (ordinary arithmetic wording PASSES). **Its stated limit: a text scan cannot prove the absence of a claim for ALL prose — the row binds the two files it names, and §5.2's refusal to offer a `[U]` row is the contract half** | §2.5, `§3.3 I-8`, §5.2, `§3a A-16` | static |
| **`R-7`** | **THE NO-SHIM / NO-NEW-SURFACE ROW (prohibitions 5/6).** *The change set does not touch `src/shared/dom-shim.ts` (no member added, no member needed), and the five-seam negative holds:* `ALL_TOOLS` is still the pinned **21-NAME** set, `RpcMethod` is still **21** members, `MUTATING_METHODS` is still the **7** named entries, `VALID_GROUPS` still has its **5** members — **asserted by SET EQUALITY AGAINST THE NAMES where an existing name-complete row already does so (`tests/engine-pin-version.test.ts`'s `R-15`/`R-15a`/`R-15b` and its `RpcMethod` census), and NOT by a bare count** (`§4.4 S-4`) | §2.2 (P-5/P-6), §0 ruling 8 | static |
| **`R-8`** | **THE DIFF-SCOPE ROW (prohibition 5; `§5.1`).** *Only the files of `§5.1`'s allow-list are touched by this unit's committed range: the module (NEW), the test file (NEW), this spec, the unit's own gate-5 blind-greens artifact, and the unit's own tracker/record artifacts.* **A changed path in the DENIED set FAILS the row absolutely.** **A non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (a unit's own mandatory gate artifacts must be committable — `RCA-8(a)`). **THE SCOPE RULE `§5.1` states and this row must obey — a lesson from the last three passes:** *a diff-scope claim asserted over a **COMMIT RANGE** is scoped to THIS UNIT'S OWN ARTIFACTS, so a later unit's commits and a sibling's dirty files are NOT this unit's diff and may not fail the row*; **the DENIED set is the half that binds the WHOLE committed set**, and **the canonical artifacts must be non-vacuously present in the range** (which keeps the row from being satisfied by an empty range). **The row also asserts the companion claim, at the time this unit's red set runs: `src/shared/census.ts` is imported by NO `src/**` file** | §5.1, §7 item 2 | static |
| **`R-9`** | **THE NO-MUTATION STATIC ROW (`C-B`'s source-level half; `I-3`).** *The module contains no write into any argument*: no assignment to a parameter, no `zones[...] = …` / `census[...] = …` / `sizes[...] = …` / `specOf[...] = …`, no `Object.assign`/`Object.defineProperty`/`Reflect.set`/`Object.freeze` applied to `zones`/`census`/`sizes`/`specOf`/`revealed`, no `Map.set`/`Set.add`/`Array.prototype.push`/`sort`/`splice` on a caller value, and **no caching of a caller value in a module-level or closure-retained binding** (`R-4`'s ZERO-state half is the companion assertion). **The row's honest limit: a source scan proves the ABSENCE OF A WRITE SITE in the file it reads; the OBSERVABLE half is `§3.3 I-3`'s and `P-CN-IM-3`'s runtime drives** | §2.4 `C-B`, `§3.3 I-3`, `§5.5.1 P-CN-IM-3` | static |
| **`R-10`** | **THE PATH / MODULE-ABSENCE ROW (`§0A` ruling note 1; `§4.1`'s red premise).** **(RED form, governing AT RED TIME)** *at the moment the red set is AUTHORED and RUN, `src/shared/census.ts` does not exist and `tests/census.test.ts` is the only unit-owned file in the change set* — an `fs.existsSync`-style probe; **its FAIL is meaningful: if the module EXISTS before the red run, this row FAILS and the unit's red-order claim (`RCA-1`) is broken**, and the pass that finds it must report the inversion rather than proceed. **(GREEN form, governing AT GREEN TIME)** *in the state where `§5.1` row 1 has LANDED, the module EXISTS and the unit-owned change set is EXACTLY the module + this test file* — no other `census*` path anywhere in `src/**` or `tests/**`, both canonical artifacts present, and the census asserted **NON-EMPTY before the equality** (which keeps the row from being satisfied vacuously) | §0A note 1, §4.1, §5.1, `RCA-1` | static |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

**What this subsection is, and why it exists.** This spec makes **three existence claims about the
repository** that would otherwise be **unfalsifiable prose**: *"`docs/skills/designing-pages.md` does not
exist"* (§1 item 10, so no coverage matrix and no demo-page index are owed), *"`src/shared/zones.ts` is
the landed predecessor and carries the two value exports this unit delegates to"* (the premise of every
delegation row), and *"`src/shared/census.ts` is imported by no `src/**` file"* (§7 item 2). **An
existence claim with no probe is not a row** (`§4.4 S-4`'s class).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **`R-11`** | **The absent-page-design row.** *`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs* — an `fs.existsSync`-style probe (globbed `docs/skills/*` at filing: `process-guardrails.md` alone). **Its FAIL is meaningful: if the file DOES exist, this unit OWES a test-use-case coverage row in that file's coverage matrix plus an entry in its demo-page index** — and **this filing's position is that the mechanism renders no page, so the row would be an ABSENCE row rather than a claim**, stated here so the obligation is not silently dropped | §1 item 10, §7 item 9 | static |
| **`R-12`** | **The predecessor-surface row (the delegate premise).** *`src/shared/zones.ts` EXISTS, exports **exactly the runtime values `isEmpty` and `trackFor`** (by namespace-key set equality, naming `TrackSpec` as the third, type-only name) and **imports nothing*** — the three facts every delegation row in this file rests on (`docs/specs/zones.md` `§2.1`'s delegate clause, `§3.4 R-5`). **Its FAIL is meaningful: a predecessor whose surface moved means THIS spec's delegate clause cites a surface that no longer exists, and the finding is a `docs/decisions.md`-class matter for the supervisor** — **and `§3.4 R-1` FAILS with it**, so the unit cannot be reported green on a moved delegate. | `docs/specs/zones.md` §2.1/§3.4, `§5.3` item 9 | static + `[H]` |
| **`R-13`** | **The no-consumer row (`§7` item 2; `R-8`'s companion).** *At the time this unit's red set runs, `src/shared/census.ts` is imported by NO file under `src/**`* — a source search over `src/**` for the module specifier, asserted **NON-VACUOUSLY** (the search must be shown to have read `src/**`, and a fixture that imports the module must make the row FAIL) | §7 item 2, `§3.4 R-8` | static |

---

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/census.test.ts`** — authored **first**, **RUN**, and
its failing set **REPORTED verbatim** before any implementation. **Expected red shape, stated in BOTH
forms because the predecessor's filing got this wrong in writing (and its red run corrected it):** every
clause/static/register row fails as a **LABELLED ASSERTION** — *"the module of `§2.1`/`§5.1` row 1 does
not exist yet"* — carrying its own `§` citation, via **the repo's established import-boundary
technique** (an `fs.existsSync`-style probe on the repo-relative path **plus** a run-time-COMPUTED
specifier resolved through a dynamic `import(/* @vite-ignore */ …)`), **so the red set cannot be taken
down by a collection error while the module is absent**; and **`§5.2` leg 4 is red as the literal
module-resolution failure** (`TS2307`/`Cannot find module`) because it compiles the test file's
`import type { TrackVars }` against a module that does not exist. **Both shapes carry the same fact; only
the string differs.** **There is NO host-fix branch for this unit**: the module does not exist and the red
is **purely additive** — **this unit owes no change to any existing file**, and it owes **no edit to
`src/shared/zones.ts` or `tests/zones.test.ts`** (a sibling unit's file is not this unit's diff — `§5.1`).

**What a green at the end of this cycle IS, and is NOT.** It is **`[T]` evidence that
`computeTrackVars` behaves as `§2`/`§3` say over the enumerated inputs, and that it delegates**. It is
**NOT** evidence that any UI renders, that any CSS is valid, that any track has a size, that any census
means what a caller intended, or that the app behaves differently — **in particular, at the end of this
cycle the module is still imported by NO `src/**` file** (`R-8`/`R-13`).

### 4.2 Red-set authoring order

1. Write **`I-1`..`I-10`**, then **`M-1`..`M-14`**, then **`F-1`..`F-6`**, **in that order**. **The
   `§3.5` existence rows `R-11`/`R-12`/`R-13` are authored FIRST OF ALL** (they are the red's own premise
   and are evaluable before the module exists). **Then the `§3.4` static rows `R-1`..`R-10`**
   (`R-4`/`R-5`/`R-7`/`R-8`/`R-10` are evaluable immediately; `R-1`/`R-2`/`R-3`/`R-6`/`R-9` read the
   module file, so they become evaluable **once it exists** — which is exactly what `R-10` records).
2. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**,
   after the `R-*` rows, **in register order** (`P-CN-IM-1` · `P-CN-IM-2` · `P-CN-IM-3` ·
   `P-CN-IM-4` · `P-CN-SM-1` · `P-CN-SM-2` · `P-CN-SM-3` · `P-CN-TP-1`). They ride **`npm test` (leg 1)**
   unchanged and **need no new file, no new script, no `package.json` change and no dependency.**
   **The register's `YES` markings are execution DESIGN, not results** — **a row that is `YES` in
   `§5.5.1` but broken when run is a SPEC FINDING, reported rather than tuned to green.**
   **The register's own stop rule binds the red run**: rows are evaluated **sequentially in register
   order** with **STOP AFTER 5 CONSECUTIVE FAILURES**, so a red run of a module-absent unit **is expected
   to stop early**, and **the un-run rows must be REPORTED AS FAILURES rather than silently omitted** —
   **a red run that reports all `248` attempts as executed is the finding, not the expectation.**
3. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and
   existence row that can already be evaluated.
4. **Then** implement the least code that makes them green.
5. **Re-run**, record the green. **No row may be edited to reach green**; **a row found wrong is
   corrected IN THIS SPEC first, with the old text kept as `SUPERSEDED`** (annotate-never-rewrite).

### 4.3 What the red is NOT

- **Not a `U-ZONES` test.** No `isEmpty`/`trackFor` arithmetic row (the size limb, the `-0` rule, the
  malformed-spec `''`, the census dispatch precedence) belongs here — those are `docs/specs/zones.md`'s,
  and **re-pinning one of its limbs with a different answer is `§4.4 S-1`.**
- **Not a projection/applier test.** No write map, no `setProperty`, no sink, no `applied`/`skipped`
  record, no `applyVarsToRoot` (`U-PROJ`'s territory, `§1` item 4).
- **Not a CSS test, and not a geometry test.** A `getComputedStyle`/`getBoundingClientRect`/
  `offsetWidth`-shaped row is `§4.4 S-7`'s class and **may not be added**.
- **Not a DOM test.** No element, no shim member, no `document`, no `querySelector*`: this unit's rows
  pass **plain values**.
- **Not a store/persistence test.** This unit has no store; a row asserting one would be inventing the
  prohibition's opposite.
- **Not a refusal test.** There is no refusal domain (`I-9`): a row asserting a `code`/`ok`/`reason`/
  `skipped` field **FAILS this spec's text** and is `§4.4 S-5`.
- **Not assembled-app evidence.** Layer declaration anchor 1.
- **Not a consumer-vocabulary test.** A row naming a real pane/tab/region is a prohibition-1 violation
  (its vocabulary may appear **only** inside `R-3`'s own control corpora).

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row is only satisfiable if **this unit re-implements** a `U-ZONES` limb — formatting `size` + `unit` itself, choosing an empty token itself, returning `''` for a malformed spec **instead of** calling `trackFor`, or testing the census itself | **Violates the delegation clause and ruling 4 (one authority, not two).** Re-write the row against the delegate; **a duplicate implementation is a FINDING**, never the contract. |
| **S-2** | A row asserts a prohibition by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **normalized** view (concatenation joined, template substitutions joined) **and it scans comments as code** where the clause forbids a constant. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed** (the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule: *a static prohibition satisfiable by splitting a token is not satisfied*). The row form is `R-1`/`R-3`/`R-6`. |
| **S-3** | A row asserts a prohibition by a **bare COUNT** (*"three exports"*, *"five parameters"*) **without naming the members**, or asserts an import/diff claim by a count | **A count is satisfiable by renaming.** The row must assert **SET EQUALITY AGAINST THE NAMES** (or the arity WITH the parameter names) — `R-2`/`R-7`/`R-8`. |
| **S-4** | A row claims an **existence/absence about the repo** with no probe | The claim must become an `fs.existsSync`/source-search **probe whose FAIL is meaningful** (`R-10`..`R-13`). |
| **S-5** | A row asserts a **`code`/`reason`/`ok`/`skipped`/result-record** shape, or that a non-enumerable `zones` / a non-revealed zone is a *"refusal"* | **Violates `§0A` ruling note 8** — this unit has **NO refusal domain** and every outcome is a VALUE. The row is re-written as a value assertion; **adding a union is a new contract and needs its own gate.** |
| **S-6** | A row is only satisfiable if `computeTrackVars` **mutates, defaults into, or caches into the census** (or into `zones`/`sizes`/`specOf`) | **Violates `C-B`, `I-3` and prohibition 4** — stop and report to the supervisor. |
| **S-7** | A row asserts a **rendered-geometry, CSS-validity, layout or paint** property — or a `[T]` green is to be reported as one | **Violates A-d4's mandatory clause and `I-8`** — the claim is **deleted**; this spec **offers no `[U]` row**, and §5.2 states why. **The row may not be moved to the `ui` leg silently.** |
| **S-8** | A row is only satisfiable by a **`revealed` default** — a visible fallback for an absent predicate, a per-zone reveal rule, or treating a non-callable `revealed` as a boolean | **Violates `C-C`, ruling 5 and `I-5`** — the consumer's decision may not be manufactured. Stop and report. |
| **S-9** | A row is only satisfiable by a **key set other than exactly `zones`** — omitting a non-revealed zone, omitting a zone whose spec/size is missing, adding an aggregate/total key, or adding a key derived from the census | **Violates `C-A` and `I-2`** — the ledger's row, and the `V-13` remedy's other half. Stop and report. |
| **S-10** | A row is only satisfiable if a **test file's type error** is caught by the trio's typecheck leg (`npm run typecheck`) | **`tsconfig.json` includes `src/**/*.ts` and excludes `tests`, so that leg never reads a test file** (`docs/pending.md` §H; the same limit is recorded for every unit). Use **`§5.2` leg 4** (the standalone strict `tsc` over this unit's test file) — **the only leg that can see a type error in a test file, and it caught one in the preceding unit this cycle.** |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-E plan** (§0 ruling
12), (b) this spec to exist (**done: this filing**), and (c) a **TestWriter to have RUN and REPORTED the
red set** (`AGENTS.md` item 9). **Its ordering precondition is DISCHARGED** — `U-ZONES` (row `E1`) is
`DONE` and **its delegate surface is landed, green and verified** (`docs/next-steps.md`'s `## DONE —
U-ZONES` record; `§3.5 R-12` is the row that keeps that premise falsifiable) — **so its `## OPEN` row
`E2` stays `BLOCKED` until (a) and (c) both hold and nothing else.** **Its row also carries a permanent
scoping clause: the key-set/`revealed`/never-mutate rows are THIS unit's and the token arithmetic is the
predecessor's; the successor's own mechanism is `U-GUTTER`'s** (§1 items 1/7).

**⟶ ANNOTATED (2026-09-27) — the gate's conditions, re-stated against the ARCHITECT RULING; the as-filed
text above is kept visible and its one changed half is this banner.** *(`§0A` ruling note 11, verbatim:
"**Non-revealed zones still exist, they just don't get displayed.**")* **(a) IS SATISFIED** — the wave-E
go-ahead is on the record **and the architect question this unit escalated is ANSWERED, so there is NO open
architect question left for this unit**; **(b) IS SATISFIED** — this spec exists. **(c) IS NOT SATISFIED
YET** — **there is no red set: it is OWED, NOT AUTHORED, NOT RUN, and no leg has been run.** **THE
DELEGATION GATE IS THEREFORE SATISFIED ON ITS AMBIGUITY CONDITION** (this contract exists and **`§7a.1`'s
ambiguity list is EMPTY — `8` items reported, `8` ruled, `0` open — on top of which the one escalated
clause is now RULED**), and **the ONLY remaining condition is (c): the red set AUTHORED and RUN and its
failing set REPORTED verbatim** (`AGENTS.md` item 9, **RCA-1**; authoring order and red shape at
`§4.1`/`§4.2`). **So this unit is NOT delegable until that run happens — and it is no longer waiting on
anyone but the TestWriter pass.** **The permanent scoping clause above is unchanged by the ruling.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/census.ts` | **NEW** — the **one value export + two type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/census.test.ts` | **NEW** — the red set (§4.2), the register rows and the static/existence rows | always |
| 3 | `docs/specs/census.md` | this spec — `§3a`/`§3b` findings as they land | always |
| 4 | `docs/specs/census-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/census-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and a **sibling spec** only for a dated status/annotation correction that changes **no normative clause** | the pass that produces them |

**Outside the scope, ALWAYS — the DENIED set, which binds the WHOLE committed set absolutely (the same
class `U-PROJ`'s `R-20` asserts):** `src/main/**` · `src/renderer/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · **`src/shared/zones.ts` and `tests/zones.test.ts`** (the landed predecessor: its
module and its test file are **read-only** to this unit — a residue of `U-ZONES` is its own pass's,
`docs/pending.md` §H) · every **existing** test file of another unit · `package.json` /
`package-lock.json` · `scripts/**` · `node_modules/**` · `../Preempt-Providence/**` · and **the artifact
of a SIBLING unit** (its `*-greens.md`, its review record, its tracker-only rows). **This unit changes NO
existing file except this spec and the trackers.**

**THE COMMIT-RANGE SCOPE RULE — stated here because a scope row that cannot distinguish correct gate work
from a boundary violation has stopped being falsifiable (a lesson from the last three passes).** A
diff-scope row asserted over a **commit range** must scope its **allow-list census to THIS UNIT'S OWN
ARTIFACTS** — *the module, this unit's test file, this spec, this unit's own `*-greens.md` and
`archive/reviews/**` record, and the unit's own tracker rows* — and **must NOT read a later unit's
commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this unit's diff.**
**The DENIED set is the exception and is the half that binds the WHOLE committed set**: a denied path
anywhere in the range **FAILS** the row regardless of which pass committed it. **A non-denied path outside
the allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every
gate boundary to leave a commit, including the unit's own). **The canonical artifacts must be
non-vacuously present in the range**, and **`§3.4 R-8` is the row that carries this rule.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — and for this unit it proves **nothing** about CSS validity, applied lengths, layout, rendered geometry or any census meaning. |
| 2 | typecheck | `npm run typecheck` | **[H]** | the `ZoneId`/`TrackVars` types and the five-parameter signature are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and excludes `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables** (`docs/pending.md` §H records the same limit for every unit). |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles. **This unit's new module is imported by no `src/**` file, so the build's only bearing on it is that nothing broke**: a bundle census that is unchanged is not evidence the module works. |
| 4 | **standalone strict `tsc` over the unit's own test file** — the named leg for `R-2`(a)'s type half | a standalone strict `tsc --noEmit` invocation over `tests/census.test.ts` | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-2`(a) asserts that the **TYPE-ONLY** names `ZoneId`/`TrackVars` are exported, and **an imported type name is erased at runtime** — so the runtime half of that row cannot fail, and **`npm run typecheck` (leg 2) does not compile `tests/**` at all**. **The honest leg is a standalone strict `tsc` over the test file**: if either type is renamed, removed or left unexported, the file **fails to compile**. **THE `U-ZONES` LESSON, recorded because it is why this leg is not optional: in the preceding unit this cycle, leg 4 was the ONLY leg that could see a type error in a test file — and it caught one.** It adds no script to `package.json`, no dependency and no diff-scope row, and **no register row depends on it. A DONE row that reports `R-2`(a)'s type half as green must cite THIS leg, not a runtime assertion.** |

**THE `[U]` ROW IS **NOT OFFERED** BY THIS UNIT — and the reason is structural, in the ledger's own
words:** *"the arithmetic is provable here; **any claim about the rendered geometry is UNPROVABLE in this
repo today** — it belongs to the `ui` leg's business and to no node-green."* **A `[U]` row here would be a
rendered-geometry claim, or a claim that a browser accepted an emitted string — and neither is
falsifiable from this unit's change set**, because **the module is imported by no `src/**` file**
(`R-8`/`R-13`): **there is no rendered surface to observe.** This is **not** a leg-availability excuse:
**the `ui` leg exists and is green** (`U-REALDOM-BOOT` is `DONE`), so the refusal is structural.
**If a later unit gives this module a shipped consumer, a `[U]` row for an emitted token becomes
*possible* — and it would be that unit's row and that unit's spec, with its own preconditions and its own
bound** (`U-REALDOM-BOOT`'s honest limits: a `ui` green proves *one probe in one real renderer boot*).
**No `§3` row is weakened by the absence of a `[U]` row, because no `§3` row makes a claim of that kind**
(`I-8`, `R-6`).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order**, **all ELEVEN
items**:

1. **Unit + wave + status**: `U-CENSUS` · wave **E** · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"the census half only: `computeTrackVars(zones,
   census, sizes, revealed, specOf)` delegating token formatting to `U-ZONES`; the token arithmetic is
   `U-ZONES`'s and is NOT re-implemented here; `revealed` is the consumer's decision and is never a
   default; the returned record's key set is exactly `zones`; the census object is never mutated; no
   projection/applier (`U-PROJ`), no gutter/relocate/container/theme/session/mount-guard behaviour, no
   CSS, no DOM, no store and no writes ship here."* **A DONE row that does not state this is a review
   finding** — it is the unit's defining constraint (rulings 2/3/4, `§1` items 2–5).
3. **The purity/totality confirmation, explicitly**: *"`computeTrackVars` is PURE (no environment read,
   no ambient global, no module-level state, one import) and TOTAL (a record for every input, no throw,
   no refusal domain, no `code`/`ok`/`reason`/`skipped`)".*
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as **RUN and REPORTED, verbatim**, in **both** shapes (the
   labelled assertions and leg 4's literal module-resolution failure), **including which register rows
   ran and which were reported un-run** (§4.2 item 2's stop rule).
6. **The legs' results with layer labels** (`npm test` `[T]` · `npm run typecheck` `[H]`, *`src/**` only*
   · `npm run build` `[H]`) **plus leg 4** (the standalone strict `tsc` over the test file), and **the
   explicit sentence that the node-suite green is envelope/pure-layer evidence and NOT assembled-app
   evidence** — **and for this unit that it proves NOTHING about CSS validity, applied lengths, layout or
   rendered geometry, and nothing about what any census means to a caller.**
7. **The `[U]` status**: **not offered**, with §5.2's structural reason (imported by no `src/**` file) and
   the ledger's quoted clause. **A DONE row that claims a rendered-geometry proof is a review finding**
   (`I-8`, `R-6`).
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, **MANDATORY per completed
   unit**) and the **blind-greens + per-unit documentation-review records** (`AGENTS.md` items 10a/10d,
   RCA-4/RCA-6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — **and the explicit statement that
   `U-GUTTER` (row `E3`) is now unblocked on this unit's half** (`§1` item 7: it takes the `sizes` VALUE
   it injects and the token strings, and **imports neither this module nor a fabricated edge from it**)
   **while `U-GUTTER`'s own spec, red set, gates and geometry clause remain its own.** **The predecessor's
   residue rows (`docs/pending.md` §H: `ADV-ZN-3`/`ADV-ZN-6`) stay the TestWriter's** — **this unit may
   not edit `tests/zones.test.ts`** (`§5.1`'s denied set).
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken** counts, **each row's strategy id (`S-CN-*`)**, the **pinned seed
    `20260927`**, its **step form** and the **pool/index discipline**, the
    **stop-after-5-consecutive-failures status** (`not triggered`, or `triggered at row …`), the **total
    attempts reported against the `≤400` cap** with **every row's count against the `≤100` per-row cap**,
    and the **explicit sentence that the FIVE bounded rows — `P-CN-IM-1`, `P-CN-IM-2`, `P-CN-IM-3`,
    `P-CN-IM-4` and `P-CN-TP-1` — are `YES (bounded)` and are
    NOT proofs of the unbounded universals they state.** **A DONE row that reports the register as
    "executed" without these per-row counts and strategy ids is a review finding** — the register's `YES`
    cells are **execution DESIGN**, so the counts are the only executed-layer evidence the ledger can
    carry, and **a read-only PBT audit may not accept this spec's table alone**: it reads the counts here
    and the TestWriter's tables in `tests/census.test.ts`. **It must ALSO report `P-CN-TP-1`'s
    DISTINCT-MEMBER draw count** (`§5.5.1`'s honesty item 5 — see item 11 below).
11. **The register's ARITHMETIC and its DUAL COUNT.** The DONE row must print the **total WITH its
    per-row terms** — **`248` = `68+36+24+14+30+10+30+36`** — and must **reconcile that figure against the
    tables the test file actually produces**: **a total that is not the sum of its own terms is a review
    finding** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE). **Where a row's
    attempts are several assertions over ONE execution, or a count of DISTINCT inputs rather than of
    drives, the DONE row must report BOTH the declared attempts and the honest DISTINCT-DRIVE count** —
    here, **`P-CN-TP-1`'s `36` declared draws over a `30`-member pool** (a **draw is not a sweep**: **no**
    "all 30 drawn" claim may be made until the run reports it, `§5.5.1`'s honesty item 5) and
    **`P-CN-SM-3`'s `30`** (which are **`10` shape drives × `3` passes**, i.e. `3` assertions over **one**
    drive each — the **distinct-drive count is `10`**). **The DECLARED figures are what the caps are
    compared against; the distinct-drive figures are reported BESIDE them and never substituted for
    them.** **A DONE row that quotes the total alone, or that substitutes a distinct-drive figure in the
    cap comparison, is a review finding.**

**⟶ RECORDED: the `§5.3 → §5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs NO fix** — it
is the same deliberate gap in the four sibling specs (`docs/specs/projection.md`, `listhost.md`,
`slothost.md`, `zones.md`), recorded by the `U-LISTHOST` documentation review (`AGENTS.md` item 10d /
RCA-6). `§5.3` is the DONE-row shape and `§5.5` is the property register; **NO clause is missing** — the
section simply does not exist. **Renaming or renumbering is FORBIDDEN for citation stability** (both
numbers are cited across the trackers and in sibling specs). **This note renumbers nothing and changes no
clause of this spec, and no `§5.5.0` exists here** (this spec is filed AFTER the gate-11 ruling, so it
carries the register from the start and has no superseded exemption to keep — the same reason
`docs/specs/zones.md` `§5.5` gives).

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness) — **the gate-11 register is filed at `§5.5.1`**

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-pin.md` §5.5 / `listhost.md` §5.5 / `slothost.md` §5.5 / `projection.md` §5.5 /
`zones.md` §5.5 state it: THIS REPO HAS NO PBT HARNESS.** `package.json`'s `devDependencies` key set is
the **five keys** `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` — **no `fast-check`, no
`hypothesis`, no property runner**. **This unit is CODE-BEARING** (a pure mechanism with a value export, a
red set, a test file and a real key-set/delegation contract), so **the recorded ZERO-ROW EXEMPTION IS NOT
AVAILABLE** to it: `docs/decisions.md`'s ACTIVE row **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** restricts
that exemption to **genuinely invariant-free / doc-only / config-only / non-JS units**, and the gate
record's amendment (§8) records the follow-up. **`§5.5.1` below is therefore a real typed register** —
`≤8` rows typed `P-NN-IM`/`P-NN-SM`/`P-NN-TP`, **never an `F-` row**, **never a `§6`/`FS-n` citation as a
row** — **executed by plain deterministic vitest tables and one pinned-seed hand-rolled generator, with
NO new dependency.** **The precedent that makes this executable here: `docs/specs/engine-pin.md` §5.5
executed `7` of its `8` register rows with plain deterministic vitest tables and no new devDependency.**
**The pilots this register models are `docs/specs/projection.md` `§5.5.1`** (`8` typed rows, `S-PJ-*`
strategy ids, a pinned-seed 32-bit LCG, `231` attempts, honest `YES (bounded)` markings, per-row terms
printed and reconciled) **and `docs/specs/zones.md` `§5.5.1`** (`8` typed rows, `S-ZN-*` ids, `369`
attempts) — **the type algebra, the strategy-id discipline, the pinned seed and the caps are the SHARED
form, and NO row, pool, table or id is copied from any of them** (a second authority over a landed
register is a finding, the discipline `docs/specs/projection.md` §8 states).

**`§5.5.0` does not exist in this file, and that is deliberate — stated so no later pass reads it as a
loss:** this filing has **no superseded exemption to keep verbatim**, because it never recorded one (the
sibling specs' `§5.5.0` blocks exist to preserve *their* filings' exemptions after the gate-11 ruling;
**this spec is filed after that ruling and carries the register from the start**). **The gap is therefore
`§5.3 → §5.5` with NO `§5.4` and NO `§5.5.0`, and no section number moves.**

### 5.5.1 THE REGISTER (2026-09-27, filed under the gate-11 ruling) — **8 rows, ALL executed by design**

**What this section is, in one sentence.** A **typed register of `8` rows** whose **five genuine
quantifications** — (i) *every* input shape leaves `computeTrackVars` total and non-throwing with the
declared record shape, (ii) *every* enumerated zone reaches the record as exactly one key with the
caller's own decision deciding presence and the delegate deciding the value, (iii) *every* call leaves
the census, the zone enumeration and both lookups observably unmutated and uncached, (iv) *every*
delegation is a real `isEmpty`/`trackFor` call with no second copy of the token arithmetic anywhere, and
(v) *every* zone id shape — including the `'__proto__'` and duplicate cases — lands as the declared own
key — are **executed here as quantifications over finite, pinned enumerations**, **hand-rolled and
deterministic, with no new dependency, no `fast-check`, no `hypothesis` and no property runner** (the
`devDependencies` key set is unchanged — the five keys). Type algebra is `docs/specs/engine-pin.md`
§5.5's: **`P-IM`** = invariant · **`P-SM`** = state-machine/fixed-shape table · **`P-TP`** =
totality/pool.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-CN-*`** (`CN` = this
unit, **c**e**n**sus) — the analogue of `P-ZN-*` for `U-ZONES`, `P-PJ-*` for `U-PROJ`, `P-LH-*` for
`U-LISTHOST` and `P-SH-*` for `U-SLOTHOST` — so **a register row is never mistaken for a `§3` row and
never for a pilot's.** **No id of this register reuses, extends or restates an `M-*`/`I-*`/`F-*`/`R-*` id
of `§3`** (those stay **compensating sample rows**, cited per row below), and **no `F-` register row is
invented** — `F-1`..`F-6` stay `§3.2` table rows. **No `§6`/`FS-n` citation appears as a register row.**
The strategy-id prefix is **`S-CN-*`, one per row**, and the one **pinned-seed generator** carries its own
id, **`S-CN-SEED-1`**.

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/census.test.ts`, §4.1/§5.1) — the
   file the red set already owes, and the file the register **rides as part of the red** (§4.2 item 2).
   **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript
   inside the test file.** The only generator in this register is **`S-CN-SEED-1`**'s (used by
   `P-CN-TP-1`), and it is pinned to **literals in the test file itself** — a hand-rolled 32-bit LCG, the
   **literal** form a contract so the run is reproducible, and **the constants are the test's own choice,
   not a dependency**: **`state₀ = 20260927`**;
   **`stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`**; **each draw applies ONE LCG step and the
   resulting state selects the pool member — `index = stateₙ₊₁ mod pool.length`** — so **one pool draw
   consumes exactly ONE LCG step.** **Stated so no TestWriter reads a two-step or a scaling form into
   it: there is NO `next(k)` helper in this register** (a pool draw is an index, never a bounded
   integer), and **`pool.length` participates in NO binding rule beyond that one modular reduction.**
   **No `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.**
3. **Caps, uniform for the whole register:** **≤100 attempts per row, ≤400 attempts in total**, rows
   evaluated **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
   remaining attempts are abandoned and no further row starts). **A register row is never refused on the
   ground that "no PBT harness exists"** (the gate-11 ruling's decisive point).
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** A register row
   **proves its quantification by enumeration**; the `§3` rows remain the per-state contract rows a
   TestWriter derives first, and **no `§3` row is weakened, widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row here is `YES` or `YES (bounded)`
   by **enumeration over a FINITE, pinned input set**, and each row's cell states that input set exactly.
   **`5` of the `8` rows carry the honest `YES (bounded)` marking** (`P-CN-IM-1`, `P-CN-IM-2`,
   `P-CN-IM-3`, `P-CN-IM-4`, `P-CN-TP-1`) because in each the **property text is larger than its
   enumeration**; the other `3` rows (`P-CN-SM-1`, `P-CN-SM-2`, `P-CN-SM-3`) are `YES` over a fully
   enumerated domain the row's statement matches exactly. **No row is marked `NOT EXECUTED`.**
6. **The register's own boundaries, named rather than silently relied on:** (a) **no `Proxy` whose traps
   return inconsistent answers across reads** is in any pool (the hostile shapes are **fixed** tables,
   deliberately, so no draw is ambiguous); (b) **no `Symbol`-KEYED census is a driven *positive* case** —
   a `Symbol` zone member is driven and must be DROPPED (`F-1`(b)), and a `Symbol` census key is never
   required to be read by this unit; (c) **the generator's pool is a SUBSET of the input space this
   contract pins**, and **its silence about a shape it does not list is a stated boundary, not an
   unrecorded omission**; (d) **the register asserts NOTHING about the delegate's internal limbs** — its
   drives are chosen so that a delegate-shaped answer is the expected one, never so that this unit
   re-derives the limb.

| ID | Type | Property | Executed? | Compensating sample rows (§3) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-CN-IM-1`** *(the KEY-SET / `C-A` quantification — required row (ii))* | `P-IM` invariant | **For EVERY (reveal-predicate variant × census shape) pair in the row's `17 × 4` table, the returned record's own enumerable string-key set is EXACTLY the enumerated zone set of the drive's `zones` — no extra key, no omission — every non-revealed zone's value is exactly `''`, every revealed zone's value is exactly the string the delegate returned for `(spec, size, isEmpty(census, zoneId))`, and the record is NULL-PROTOTYPE with its keys in first-seen order.** **The converse half, asserted in the same row: a module that omits a non-revealed zone, that omits a zone with no spec entry, or that reveals a zone on its own initiative FAILS at a named cell.** | **YES (bounded — the property text quantifies over EVERY predicate variant and EVERY census shape while the drive enumerates `17 × 4 = 68` pairs; the exhaustive claim is over the enumerated table, which is the whole domain `§2.3` items 2/3 pin, and nothing larger is claimed)** | `M-1`, `M-3`..`M-6`, `M-11`, `M-12`, `F-2`, `F-3`, `F-5`, `F-6`, `I-2`, `I-5`, `I-10`, `§2.4 C-A`, `§2.4 C-C` | `S-CN-KEYSET-1` | **`68` attempts** = **`17` reveal-predicate variants × `4` census shapes**, driven in fixed order (predicate-major), one `computeTrackVars` call per attempt. **The drive's fixed `zones` is `['a','b','c']` with `sizes = {a: 40}` and `specOf = {a: {trackProp:'--t', unit:'px', emptyToken:'SENTINEL-E'}}` (so `b`/`c` exercise the missing-lookup paths).** **The `17` predicate variants:** **(1)** absent (the argument omitted); **(2)** `undefined`; **(3)** `null`; **(4)** `42`; **(5)** `'x'`; **(6)** `true`; **(7)** `{}`; **(8)** `[]`; **(9)** a `Map`; **(10)** `() => true`; **(11)** `() => false`; **(12)** `() => 0`; **(13)** `() => ''`; **(14)** `() => NaN`; **(15)** `() => 1`; **(16)** a function that **throws**; **(17)** a spy `(id) => id !== 'b'`. **The `4` census shapes:** **(i)** `{a: 0, b: 3}` (own `0` for `a`, non-zero for `b`); **(ii)** `new Map([['a', 0], ['b', 1]])`; **(iii)** `Object.create(null)` carrying `{a: 0}`; **(iv)** `{a: 3}` (a **non-zero**, so `a` is non-empty too). **Per attempt assert:** `Object.keys(record)` **set-equals** the expected key set (`[]` for variants `1`–`9` and `16`; `['a','b','c']` for `10` and `15`; `['a','b','c']` for `12`/`13`/`14` too — the keys are present with `''`; `['a','c']` for the spy `17` **only if** the spec's `C-A` reading were the omitting one — **the row asserts the CONTRACT reading, so `17` yields `['a','b','c']` with `'b'` = `''`**); each revealed zone's value equals the delegate-driven expectation; `Object.getPrototypeOf(record) === null`; and the key order equals first-seen enumeration order. |
| **`P-CN-IM-2`** *(the NO-DEFAULT-REVEAL / delegation-consistency quantification — required rows (ii)+(iv))* | `P-IM` invariant | **For EVERY entry of the row's `3 × 4 × 3 = 36`-attempt fixed table, presence is the CALLER'S decision and never the mechanism's: a truthy predicate return emits the zone and a falsy one does not; no zone is emitted on the strength of its census shape, its size, or its spec; `undefined`/non-callable/throwing `revealed` yields the empty record with ZERO delegate calls; and the returned value for every EMITTED zone is byte-identical to what `isEmpty`+`trackFor` produce for that same `(census, spec, size)` triple — so the mechanism adds, removes and reorders NO character.** | **YES (bounded — the property text quantifies over EVERY decision/census/missingness combination while the drive enumerates the `36`-cell table below; nothing larger is claimed)** | `M-3`, `M-4`, `M-5`, `M-11`, `M-12`, `F-2`, `F-3`, `F-6`, `I-4`, `I-5`, `§2.4 C-C`, `§2.3` item 6 | `S-CN-REVEAL-1` | **`36` attempts** = **`3` decision variants × `4` census states × `3` missingness configurations**, driven in fixed order with `zones = ['a']` (one zone, so the cell is unambiguous), one `computeTrackVars` call per attempt, each with **spies** on `isEmpty`, `trackFor`, `revealed`, `sizes` and `specOf`. **The `3` decision variants:** **(v1)** `revealed = () => true`; **(v2)** `revealed = () => false`; **(v3)** `revealed` absent. **The `4` census states:** **(c1)** `{a: 0}` (**empty** ⇒ the delegate's empty limb); **(c2)** `{a: 2}` (**non-empty** ⇒ `String(size)+unit`); **(c3)** `{}` (**absent** key ⇒ `false` ⇒ non-empty limb); **(c4)** `new Map([['a', 0]])` (a supported non-record). **The `3` missingness configurations:** **(m1)** size and spec both present (`sizes = {a: 40}`, `specOf = {a: {trackProp:'--t', unit:'px', emptyToken:'SENTINEL-E'}}`); **(m2)** BOTH missing (`sizes`/`specOf` are `undefined`); **(m3)** the SPEC malformed (`specOf = {a: 42}`) and the size present. **Per attempt assert:** the key set is `['a']` in all 12 `(v1,m*)` cells and `[]` in every `v2`/`v3` cell; the `v1` value for `(c1,m1)` is exactly `'SENTINEL-E'`, for `(c2,m1)` exactly `'40px'`, for `(c3,m1)` exactly `'40px'`, for `(c4,m1)` exactly `'SENTINEL-E'`, for `(m2)` exactly `'SENTINEL-E'` (the delegate's non-finite-size limb reached with `undefined`), for `(m3)` exactly `''` (the delegate's malformed-spec limb); **`isEmpty` called exactly `1` time in `v1` and `0` times in `v2`/`v3`; `trackFor` exactly `1` time in `v1` and `0` in `v2`/`v3`; ⟶ **CORRECTED 2026-09-27 (the `U-CENSUS` RED-SET pass — a REAL CONTRACT DEFECT the red run caught, exactly the class a red run exists for; the as-filed sentence is kept above and is SUPERSEDED on this one clause): the two columns are NOT the same case and the call counts differ.** **`v2` (`revealed = () => false`, a CALLABLE predicate) DECLINES the zone — so `isEmpty` is called `0` times (no census read for a declined zone) while `trackFor` IS called exactly `1` time, with the emptiness boolean `true` passed in, producing the DECLINED zone's `''`.** **`v3` (`revealed` ABSENT) expresses NO DECISION AT ALL — the whole call returns the EMPTY record, so `trackFor` is called `0` times and `isEmpty` `0` times.** **THE RULING GOVERNS (`§0A` note 11: a declined zone EXISTS with the absent-display value; an absent decision yields `{}`), and `§6`'s own sentence says a row that folds `v2` and `v3` into ONE expectation FAILS this spec's text.** **No id, strategy id, attempt term, marking or the `248` total changes** — the row drives `['a']` with `''` for `v2` and `{}` for `v3`. `revealed` called once per attempt when callable and `0` times when absent** — and **the `v1` value is compared against a DIRECT `trackFor(spec, size, isEmpty(census, 'a'))` call made by the row itself**, so "the record carries the delegate's bytes" is asserted rather than assumed. |
| **`P-CN-IM-3`** *(the NEVER-MUTATE / NO-CACHE quantification — required row (iii))* | `P-IM` invariant | **For EVERY entry of the row's `3` caller-object × `2` access pattern × `2` frozen/unfrozen twin table plus its repeat, `computeTrackVars` mutates nothing it was handed and retains nothing: after the call the zone enumeration, the census and both lookups are reference-identical AND value-identical (post-call snapshot deep-equals pre-call snapshot), a FROZEN caller object behaves exactly like its unfrozen twin, a `Map` keeps its `size` and entries, no key/default/sentinel is written into the census, and the SAME call driven twice in sequence returns an equal record — i.e. no memo, no cache, no counter and no module-level state exists.** | **YES (bounded — the property text quantifies over EVERY caller object while the table holds `3` objects × `2` patterns × `2` twin forms `+ 2` repeat drives; the enumeration is the whole domain the row names)** | `M-6`, `M-14`, `F-5`, `I-3`, `I-7`, `§2.4 C-B`, `§2.2` (P-4) | `S-CN-PURITY-1` | **`24` attempts** = **`3` caller objects × `2` access patterns × `2` twin forms = `12`, plus `12` repeat drives** (the same matrix re-driven once, asserting an equal result and an unchanged snapshot after the SECOND call), driven in fixed order. **The `3` caller objects:** **(1)** a zone enumeration (`['a','b']`) with a census record `{a: 0}` — the **record** case; **(2)** the same drive with a **`Map`** census `new Map([['a', 0]])` (the non-record case, whose `size`/entries are snapshotted); **(3)** a drive whose `specOf` is a **frozen record** and whose `sizes` is a **record with an own accessor**. **The `2` access patterns:** **(a)** `revealed = () => true` (the full delegate path); **(b)** `revealed` absent (the zero-key path, which must still not touch anything). **The `2` twin forms:** unfrozen, and **`Object.freeze`d before the call** (the census, the enumeration and the lookups frozen where freezable). **Per attempt assert:** a pre-call snapshot — `Object.keys` order+content, every own value by `Object.hasOwn` + `Object.is`, `Object.getPrototypeOf`, `Object.isFrozen`, `Object.getOwnPropertyDescriptor` per own key, and `Map.size` + `[...entries()]` where applicable — **deep-equals** the post-call snapshot; the returned record deep-equals the unfrozen twin's; and **the repeat call's record deep-equals the first call's**. |
| **`P-CN-IM-4`** *(the PURE-DELEGATION quantification — required row (iv))* | `P-IM` invariant | **For EVERY entry of the row's `14`-attempt fixed drive table, every token byte in the returned record comes from `trackFor` and every emptiness decision comes from `isEmpty`: `isEmpty` is called with EXACTLY `(census, zoneId)` — census FIRST and the zone member VERBATIM — its boolean reaches `trackFor`'s THIRD argument UNMODIFIED, `trackFor` is called with `(spec, size, empty)` where the spec and size are exactly what the two lookups yielded, the returned string is the record's value BYTE-IDENTICALLY, and the count of each call is the count `§2.3` item 6 pins (per revealed zone; `0` for non-revealed zones).** | **YES (bounded — the property text quantifies over EVERY zone/lookup combination while the drive table holds `14` fixed drives; the enumeration is the whole delegation domain this contract names)** | `M-1`, `M-4`, `M-5`, `M-8`, `M-10`, `F-3`, `F-4`, `I-4`, `§2.3` items 2/6, `§2.1` (the delegate clause) | `S-CN-DELEGATE-1` | **`14` attempts**, driven in fixed order, one `computeTrackVars` call per attempt, **each with spy wrappers over the delegate and the caller lookups**. **The `8` argument-shape drives:** **(1)** an empty census with a present size and spec (the empty limb); **(2)** a non-empty census with a `unit: ''` spec (the bare-number form); **(3)** a spec whose `emptyToken` is a caller sentinel (the value is asserted to BE that sentinel); **(4)** a spec whose `unit` is a full declaration string (the value is asserted byte-for-byte); **(5)** a size of `-0` (the delegate's `'0'+unit` limb, reached through this unit); **(6)** a `Map` census with a `0` value; **(7)** an **absent spec** entry (the `''` limb reached with `undefined`); **(8)** an **absent size** entry (the empty-token limb reached with `undefined`). **The `3` call-count drives:** **(9)** three zones revealed with full data ⇒ `isEmpty` `3` times, `trackFor` `3` times; **(10)** three zones where one predicate throws ⇒ the throwing zone costs `0` delegate calls and the other two cost `1` each; **(11)** three zones with `revealed` absent ⇒ both delegate functions called `0` times. **The `3` argument-fidelity drives:** **(12)** a zone id passed as a NUMBER member (asserting the delegate receives that number, not its string image — `F-6`'s premise); **(13)** a `sizes` spy asserting its second argument is the caller's census **by identity** (`===`); **(14)** a `specOf`/`sizes` pair driven as RECORDS and as CALLABLES over the same data, asserting the same record results both ways. **Per attempt assert:** the spy call log's argument tuples (deep-equal, and `===` for the census), the call counts above, and the record's values deep-equal to a direct `trackFor(spec, size, isEmpty(census, zoneId))` composition built by the row itself. |
| **`P-CN-SM-1`** *(the TOTALITY / no-throw fixed-shape quantification — required row (i))* | `P-SM` state-machine | **For EVERY entry of the row's `10`-shape parameter table (all five parameters driven through their enumerated shape lists in fixed combinations), `computeTrackVars` RETURNS A RECORD and NEVER THROWS — the returned value is a non-`null` object with a `null` prototype, never an array, never a primitive, never `undefined` — including a hostile `Symbol.iterator`, an iterator that throws, a throwing `sizes`/`specOf`/`revealed`, a revoked `Proxy` census, a `Symbol` zone member and a `BigInt` size; and no call leaves a value a later call cannot read.** | **YES** *(the row's statement matches its enumeration exactly: it quantifies over the `10` parameter-shape classes, which are the whole failure surface the table drives)* | `I-1`, `F-1`, `F-4`, `F-5`, `M-13`, `§2.3` item 1 (ii)/(iv), `§0A` note 8 | `S-CN-TOTAL-1` | **`30` attempts** = **`10` shape classes × `3` driving passes**, driven in fixed order (shape-major), one `computeTrackVars` call per attempt. **The `10` shape classes:** **(1)** a `zones` whose own `Symbol.iterator` **throws** on the first `next()`; **(2)** a `zones` whose own `Symbol.iterator` is **present but not callable** (must fall to the record branch); **(3)** a `zones` **array** holding a `Symbol` member beside strings (the DROP case); **(4)** a **revoked `Proxy`** as `census`; **(5)** a `census` whose own accessor **throws** (this unit never reads it, so the row asserts the delegate still answers and no throw escapes); **(6)** `sizes` a **callable that throws**; **(7)** `specOf` a **callable that throws**; **(8)** `revealed` a **callable that throws**; **(9)** a `size` of `0n` (a `BigInt` reaching the delegate); **(10)** a `specOf` record whose own accessor for the zone **throws**. **The `3` passes:** **(a)** the shape with every other parameter well-formed; **(b)** the shape with `revealed` absent; **(c)** the shape with every other parameter ALSO a hostile shape (the composition pass). **Per attempt assert:** no throw; `typeof record === 'object' && record !== null && !Array.isArray(record)`; `Object.getPrototypeOf(record) === null`; and a **second immediate call** with the same arguments returning an equal record. |
| **`P-CN-SM-2`** *(the ZONE-MEMBER / ORDER / DUPLICATE fixed-table quantification — the clause the ledger does not name)* | `P-SM` state-machine | **For EVERY zone-enumeration shape of the row's `10`-shape table, the zone members become the declared own keys IN FIRST-SEEN ORDER with the declared values: a `Map` contributes its KEYS and never its values; a `Set`/array/own-`Symbol.iterator` object contributes its iteration values; a record contributes its own enumerable STRING keys and never a `Symbol` key nor a prototype member; a non-object contributes ZERO zones; a DUPLICATE (including `1` beside `'1'`) yields ONE key at its first-seen position with the LAST occurrence's value; `'__proto__'` and `'constructor'` are ordinary own keys; and a `Symbol` member is DROPPED.** | **YES** *(the row's statement matches its enumeration exactly: the `10` shapes are the whole enumeration domain `§2.3` item 1 pins)* | `M-2`, `M-7`, `M-9`, `M-13`, `F-1`, `F-6`, `I-2`, `I-10`, `§2.3` item 1, `§0A` notes 2/3/7 | `S-CN-SHAPE-1` | **`10` attempts**, one per shape, driven in fixed order, with `revealed = () => true`, `census = Object.create(null)` carrying a `0` under every expected string key, and `sizes`/`specOf` records carrying an own entry under every expected key. **The `10` shapes and the expected key lists:** **(1)** `new Map([['a', 1], ['b', 2], ['a', 3]])` ⇒ `['a','b']` (**keys, one per unique key, first-seen order**) with `'a'`'s value computed from the LAST occurrence's lookup; **(2)** `new Set(['a', 'b'])` ⇒ `['a','b']`; **(3)** `['a', 1, 1]` ⇒ `['a','1']` (the number `1` beside the string `'1'` is **the duplicate case**); **(4)** an array holding `Symbol('s')` beside `'a'` ⇒ `['a']` (the **DROP**); **(5)** `Object.create(null)` carrying `{a: 0, b: 1}` ⇒ `['a','b']`; **(6)** a plain record `{a: 0}` whose **prototype** also carries `b` ⇒ `['a']` (never a prototype read); **(7)** a record carrying an own `Symbol` key beside `'a'` ⇒ `['a']`; **(8)** a plain object with an own **callable** `Symbol.iterator` yielding `'a'`,`'b'` (the **shape-(a) branch wins over shape (b)**); **(9)** a plain object with an own **non-callable** `Symbol.iterator` value 42 and own keys `a`,`b` ⇒ `['a','b']` (it falls to the record branch); **(10)** `'ab'` (a string primitive — **shape (c)**, not an iterable here) ⇒ `[]`. **Per attempt assert:** `Object.keys(record)` **deep-equals** the expected list **in order** (so both membership and order are falsified, not just membership); every value equals the row's independently computed expectation; and `Object.getPrototypeOf(record) === null`. **⟶ POOL-VERSUS-BOUNDARY CHECK (run at filing, member-for-member): all `10` members satisfy this row's declared boundary** — each member is either a shape (a)/(b) input whose members are the declared enumeration, or a shape (c) input whose declared outcome is the empty record; **the `Symbol`-bearing members (`3`/`4`/`7`) are declared as the DROP/duplicate classes with their own expected outcomes asserted per member**, so no member contradicts the boundary text. |
| **`P-CN-SM-3`** *(the ZERO-BOUNDARY fixed-table quantification)* | `P-SM` state-machine | **For EVERY one of the row's `10` enumeration shapes, the EMPTY-INPUT outcomes are the declared ones — a zero-member enumeration yields the empty record (never `undefined`, never a throw, never a key), a NON-enumerable input yields the empty record, and the empty record of EVERY such drive is a valid `TrackVars` whose prototype is `null` and whose `Object.keys` is `[]`** — so the three "nothing to emit" causes (`zones` yields nothing; `revealed` decides nothing; both) are each driven and each returns the SAME empty record shape. | **YES** *(the row's statement matches its enumeration exactly)* | `F-1`, `F-2`, `M-4`, `I-1`, `I-2`, `§2.4 C-A` (c), `§3.5 R-10` | `S-CN-EMPTY-1` | **`30` attempts** = **`10` empty-input shapes × `3` passes** (the declared `30`; the **DISTINCT-DRIVE count is `10`**, because the three passes are three assertions over ONE drive each — reported per `§5.3` item 11). **The `10` shapes:** **(1)** `[]`; **(2)** `new Map()`; **(3)** `new Set()`; **(4)** `{}`; **(5)** `Object.create(null)`; **(6)** `null`; **(7)** `undefined`; **(8)** a number; **(9)** a function with no `Symbol.iterator`; **(10)** a record whose own `Symbol.iterator` yields nothing. **The `3` passes:** **(a)** `revealed = () => true`; **(b)** `revealed = () => false`; **(c)** `revealed` absent. **Per attempt assert:** `Object.keys(record)` deep-equals `[]`; `Object.getPrototypeOf(record) === null`; no throw; `isEmpty`/`trackFor` called `0` times; and the returned value is **distinguishable from `undefined`** (`record !== undefined`, and `'x' in record === false`). |
| **`P-CN-TP-1`** *(the ZONE-ID totality quantification — the pinned-seed pool draw)* | `P-TP` totality | **For EVERY zone member drawn from the pinned `30`-member pool under the pinned seed, `computeTrackVars` is TOTAL and the declared own-key outcome holds: the drive returns a record with the pool member's `String()` image as an own key (or, for the `Symbol` member, DROPS it), never throws, and the member's own VALUE is carried VERBATIM to the consumer's lookups and to `isEmpty`'s second argument (so a `42` member is asked about as `42`, never as `'42'`) — and every draw's key set is exactly the enumerated set.** **⟶ THE POOL'S BOUNDARY IS HOMOGENEOUS BY CONSTRUCTION: **⟶ CORRECTED 2026-09-27 (the `U-CENSUS` RED-SET pass — the second REAL CONTRACT DEFECT the red run caught; the as-filed wording is kept above and is SUPERSEDED): the as-filed sentence claimed every pool member is an OBJECT or a FUNCTION, and the row's own 30-member list CONTRADICTS it** — members `(1)`–`(18)` are **primitives**, `(19)`/`(20)` are `null`/`undefined`, and `(24)` is a **`Symbol`**. **THE RECONCILED BOUNDARY, and it is the one the row's own DRIVE SCOPE clause already implements: the pool is HOMOGENEOUS IN ITS DRIVE, not in its member classes** — **every member is driven as a `zones` ARGUMENT**, and the row's expectation is a function of the member's own class (a sequence-shaped member enumerates zero-or-more zones; a non-sequence member yields **zero zones**; a `Symbol` member is **DROPPED** by the row's own drive-scope rule rather than coerced). **The falsifiable claim is therefore: for EVERY member, the call is TOTAL (a record, never a throw) and the KEY SET equals the set of zones the member itself enumerates — zero for a non-sequence member.** The as-filed 'objects-or-functions' sentence was the defect; the row's per-member expectations were always right. **No id, strategy id, attempt term (the `36`), the pool, the seed or the `248` total changes.** *(This is the THIRD contract defect this unit's red run has caught — after the `v2`/`v3` fold above — and the pattern is consistent with the three sibling units: the register's own design cells are where filing errors concentrate, which is why the register is executed under a red run rather than taken on the filing pass's word.)* — the primitive and `null`/`undefined` classes are **deliberately absent** from this pool and are driven by `P-CN-SM-2`/`P-CN-SM-3` instead. | **YES (bounded — the property text says "EVERY zone member" while the pool holds `30` members and the drive performs `36` draws; the universal is NOT proven, and no reader may read this row as its proof)** | `M-2`, `M-13`, `F-1`, `F-6`, `I-1`, `I-2`, `§2.3` item 1, `§0A` note 3 | `S-CN-SEED-1` | **`36` pinned-seed draws** (`state₀ = 20260927`; one LCG step per draw; `index = stateₙ₊₁ mod 30`), one draw = one attempt, driven in draw order, each draw driving the drawn member as the **sole** member of `zones` (an array wrapping it), with `revealed = () => true` and `sizes`/`specOf` **callables** (so the member's own value reaches them verbatim and the row can assert the received argument). **The `30` pool members, each counted once:** **(1)** `'a'` · **(2)** `''` (the empty string is a legal id) · **(3)** `'__proto__'` · **(4)** `'constructor'` · **(5)** `'toString'` · **(6)** `'hasOwnProperty'` · **(7)** `'valueOf'` · **(8)** `'0'` · **(9)** `'1'` · **(10)** `0` · **(11)** `1` · **(12)** `-0` · **(13)** `NaN` · **(14)** `Infinity` · **(15)** `-1` · **(16)** `Number.MAX_SAFE_INTEGER` · **(17)** `true` · **(18)** `false` · **(19)** `null` · **(20)** `undefined` · **(21)** `{}` · **(22)** `[]` · **(23)** a function · **(24)** `Symbol('s')` · **(25)** `new Map()` · **(26)** `new Set()` · **(27)** a `Date`-shaped object · **(28)** a frozen `{}` · **(29)** a long string of 300 characters · **(30)** an object with an own `Symbol.toPrimitive` that **throws**. **Per attempt assert:** the drawn member is the sole key (or the DROP case for member `24`); the record's prototype is `null`; no throw; the `sizes`/`specOf` spies received the member **by identity** (`===` for objects; `Object.is` for `-0`/`NaN`); and the value equals the row's independently composed `trackFor(spec, size, isEmpty(census, member))`. **DRIVE SCOPE, stated because the member's OWN type decides which `§2.3` item 1 shape the drive exercises: for a member that is an ARRAY (member `22`) or a `Map`/`Set` (members `25`/`26`) the drive wraps the member in a one-element array; for every member that is NOT itself a sequence — including primitive members `12`/`13`/`14`/`15`/`16`, `null` (member `19`) and `undefined` (member `20`), which `§2.3` item 1 (c) declares as ZERO zones — the drive passes the member DIRECTLY as `zones`, so a primitive member's declared outcome is the EMPTY record** (the `P-CN-SM-3` territory, asserted here for that member only), **and the row never claims a key for a member its own input shape cannot enumerate.** **⟶ ARITHMETIC HONESTY (see `§5.5.1`'s honesty item 5): the DRAW SEQUENCE this row's seed produces — the per-draw pool index, the distinct-member count and the repetition count — is an EXECUTION record the red run must report and this filing does NOT assert, because this pass could not execute `S-CN-SEED-1` and this repo's own rule forbids printing an arithmetic figure its author has not verified** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; the predecessor's register needed exactly this kind of independent recomputation). **The seed, the LCG form, the one-step-per-draw rule, the `mod 30` reduction, the `36` declared attempts and the `30`-member pool ARE asserted contract text.** |

**⟶ THE REGISTER'S DATED CONFIRMATION (2026-09-27) — WHAT THE ARCHITECT RULING CONFIRMS, AND WHAT IT
WITHDRAWS.** *(`§0A` ruling notes 11 and 12, verbatim: "**Non-revealed zones still exist, they just don't
get displayed.**")* **The register table above is UNCHANGED in every row — no id, no type, no `YES`/
`YES (bounded)` marking, no compensating-sample citation, no strategy id, no enumeration strategy and no
attempt term is added, removed or rewritten** — because **every row above was filed on the READING-A form
the ruling confirms.** **What the ruling CONFIRMS, named cell by cell so a red run can derive it:**
**(a)** **`P-CN-IM-1` cells `10`/`15`/`17`** — the three **callable-predicate** variants (`() => true`,
`() => 1`, the spy `(id) => id !== 'b'`) — **are CONFIRMED**: for each, the returned record's key set is
**all three keys** (`['a','b','c']`) and **a declined zone's value is exactly `''`**, i.e. **the predicate
decides the VALUE and never the PRESENCE**; the variants `1`–`9`/`16` (no predicate at all) remain the
EMPTY-record case (`F-2`) and are **not** the declined-zone case (`§2.3` item 3's annotation). **All `68`
pairs of that row are driven unchanged.** **(b)** **`P-CN-SM-3`** is **CONFIRMED as filed**: its three
"nothing to emit" causes (`zones` yields nothing; `revealed` decides nothing; both) each return the SAME
empty record shape, and **the ruling does NOT merge this row with the declined-zone case** — a declined
zone is not a zero-boundary input, and **no shape, pass or term of that row moves** (`10` shapes × `3`
passes = its declared `30`; **distinct drives `10`**, unchanged). **(c) THE WITHDRAWN, PROVISIONAL
ALTERNATIVE — recorded as a SPENT CONTINGENCY, not deleted (annotate-never-rewrite):** the **"omit-reading"**
under which a declined zone would have been **omitted** (and under which the two cells above and the `C-A`
(a)/`F-2`/`M-4` outcomes would have read differently) **was a contingency attached to the open architect
question; the question is ANSWERED in favour of Reading A, so the contingency is SPENT and WITHDRAWN with
its provenance recorded at `§0A` ruling note 11** — **it is not an available reading, no row may expect an
omission, and `§4.4 S-9` is the stop condition that forbids one.** **(d)** **Nothing else changes: no id,
no strategy id, no attempt term, and the total stays `248` = `68+36+24+14+30+10+30+36`** — re-verified
after this annotation pass, term by term, against the table's own cells and the attempt-arithmetic block
below.

**⟶ THE REGISTER'S HONESTY BLOCK — what is NOT proven here (stated so no reader over-reads a `YES`).**

1. **Five rows carry the honest bounded marking, and it is not a formality.** `P-CN-IM-1`'s statement
   quantifies over **every** predicate variant and census shape while its table drives **`68`**
   pairs; `P-CN-IM-2`'s quantifies over **every** decision/census/missingness combination while its
   table drives **`36`** cells; `P-CN-IM-3`'s quantifies over **every** caller object while its table
   holds three; `P-CN-IM-4`'s quantifies over **every** zone/lookup combination while its table holds
   **`14`** drives; `P-CN-TP-1`'s quantifies over **every** zone member while its pool holds **`30`**.
   **None of the five is a proof of its unbounded universal**, and **a DONE row that reports any of them
   as one is a review finding.**
2. **`P-CN-TP-1`'s pool is a SUBSET of the input space, by construction** (strategy-discipline item 6).
   It holds `30` objects/functions; **a primitive member, a `Symbol`-KEYED census, a `Proxy` with
   inconsistent traps and a hostile `Symbol.toPrimitive` on a SIZE are either driven as fixed shapes in
   another row or deliberately excluded**, and **their exclusion is stated rather than silently relied
   on.**
3. **`P-CN-IM-1`'s `17 × 4` table is the pair space THIS spec names, not a larger one.** A
   `revealed` variant this spec never contemplated **would not be enumerated by it**; the row is an
   enumeration over a stated domain, never a proof about an unstated one.
4. **`P-CN-SM-1`'s hostile classes bind the shapes the table names.** A `Proxy` whose traps return
   **inconsistent** answers across reads, or a spec whose field reads throw **at different times**, is
   **deliberately outside** every pool (strategy-discipline item 6 (a)) so that no draw is ambiguous.
5. **`S-CN-SEED-1`'s draw accounting is NOT asserted by this filing, and it is the one figure the red
   run must produce.** Every other arithmetic figure in this register is a product or sum of its own
   printed terms; **the seed's draw sequence (per-draw pool index, distinct-member count, repetition
   count) was NOT computed in this pass** — **this pass could not execute the generator** (it writes no
   code, runs no shell and authors no test), and **this repo's own ACTIVE rule forbids printing an
   arithmetic figure its author has not verified** (`docs/decisions.md`
   `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; the predecessor's register needed an independent
   recomputation for exactly this class). **Therefore: the DONE row and the read-only PBT audit MUST
   report `P-CN-TP-1`'s DISTINCT-MEMBER count and its repetition count as MEASURED figures from
   `tests/census.test.ts`'s own run** — **and NO row may assert "all `30` drawn"** (`36` draws over a
   `30`-member pool do **not** guarantee coverage: **a draw is a draw, not a sweep**). **This is a
   REPORTED-figure boundary, not a defect in the row**: the row's per-draw assertions are exact for every
   draw the seed produces, whatever the sequence is.
6. **The register's own cross-check against `§2.4`'s three clauses, stated so a reader sees that no row
   is redundant and none is missing:** `C-A` ⇒ `P-CN-IM-1` (key-set equality, per pair) **+**
   `P-CN-TP-1` (the member-level key outcome) **+** `P-CN-SM-2` (shape/order/duplicate) **+**
   `P-CN-SM-3` (the empty-input boundary); `C-B` ⇒ `P-CN-IM-3` (the never-mutate/no-cache drives) **+**
   `§3.4 R-9` (the source-level absence of a write site); `C-C` ⇒ `P-CN-IM-2` (the decision is the
   caller's, per cell) **+** `P-CN-SM-3`'s predicate-absent pass; **totality** ⇒ `P-CN-SM-1`;
   **delegation** ⇒ `P-CN-IM-4` **+** `§3.4 R-1`. **No `§3` row is replaced by any of these**, and **no
   register row resolves a `§7a` item** — every `§7a` item is already ruled in `§0A`/`§7a.1` as contract
   text, so a register row **may** be read as resolving **the half its ruling decides**, but **no
   register row was ADDED by a ruling, no row's `YES` marking changed, no strategy id moved and no
   per-row term moved.**
   **⟶ CONFIRMED BY THE ARCHITECT RULING 2026-09-27 (`§0A` ruling notes 11/12): this cross-check stands
   EXACTLY as filed, and the ruling adds no row and moves no term. What it does is CONFIRM the Reading-A
   cells the `C-A` chain already carries — `P-CN-IM-1` cells `10`/`15`/`17` (a callable predicate's decline
   leaves every key present with `''`) and `P-CN-SM-3` (zero-boundary only; a declined zone is NOT a
   zero-boundary input) — and WITHDRAW the provisional omit-reading as a SPENT contingency, so those two
   rows' `C-A` coverage is now unconditional rather than contingent. `248` = `68+36+24+14+30+10+30+36`,
   re-verified term by term after the annotation pass, is UNCHANGED.**

**⟶ THE POOL-VERSUS-BOUNDARY RULE (kept, because it outlives this register and this repo has already
paid for it twice).** **THE RULE: *a pool or table member that contradicts the row's own declared
boundary is a REGISTER DEFECT, and the RED RUN is where it is caught.*** **Concretely, for every register
row:** **(i)** a drawn/enumerated member must **satisfy the row's boundary text**, or the row must
**declare that member as an intended class** with its expected outcome asserted **(per member, not by
category)**; **(ii)** where a member is an intended hostile/negative class, the row asserts that
member's **own** limb outcome, so the boundary text and the drawn members agree **byte for byte**;
**(iii)** a boundary sentence that quantifies over the whole pool (*"every draw is …"*) is a claim about
**every listed member** and is checked against the list **at authoring time**, not at green time. **The
predecessor's worked case:** `docs/specs/zones.md` `§5.5.1`'s `P-ZN-TP-2` carried a **negative** pool
member under a **"non-negative only"** boundary and was **unsatisfiable as written** until a red run
caught it — **the exact class this rule exists to prevent**, and the reason every pool in **this** register
was checked member-for-member at filing. **THE CHECK THIS FILING RAN, AND ITS RESULT — all `8` rows are
CLEAN, recorded member-for-member:**

| Row | Its declared boundary | The check, and the result |
| --- | --- | --- |
| `P-CN-IM-1` | *"EVERY (reveal-predicate variant × census shape)"*, with the outcome declared per pair | **All `17` predicate variants are declared with their own expected key set (callable truthy/falsy/throw/absent/non-callable), and all `4` census shapes are declared with their own expected value class.** No member contradicts the text; **the `17` include only callables and non-callables, which is exactly the boundary `§2.3` item 3 states.** **⟶ CONFIRMED BY THE ARCHITECT RULING 2026-09-27 (`§0A` ruling note 11): the check's RESULT stands unchanged, and the three CALLABLE variants (`10`, `15`, `17`) are confirmed to declare EVERY zone present with the declined zone's value `''` — the predicate decides the VALUE, never the PRESENCE.** |
| `P-CN-IM-2` | *"EVERY entry of the `3 × 4 × 3` fixed table"*, with `3` decision variants, `4` census states and `3` missingness configurations | **Every cell's expected key set AND expected value is written out in the cell, and the call counts are declared per variant.** No member contradicts the text. |
| `P-CN-IM-3` | *"EVERY entry of the `3` objects × `2` patterns × `2` twin forms `+` repeat"* | **`12 + 12 = 24`**, all `24` enumerated; every object is declared freezable-or-not and every pattern's expected call profile is declared. **No member contradicts the text.** |
| `P-CN-IM-4` | *"EVERY entry of the `14`-attempt fixed drive table"* | **`8 + 3 + 3 = 14`**, each drive declared with its expected call counts and values. **No member contradicts the text** (in particular, the size `-0` drive declares the delegate's `'0'+unit` limb, which is `U-ZONES`'s own ruled boundary, not a contradiction of it). |
| `P-CN-SM-1` | *"EVERY entry of the `10`-shape parameter table"*, `× 3` passes | **`10 × 3 = 30`**, every shape declared as a hostile/negative class with its expected outcome (a record, no throw). **No member contradicts the text.** |
| `P-CN-SM-2` | *"EVERY zone-enumeration shape of the `10`-shape table"*, with the expected key list per shape | **All `10` shapes' expected `Object.keys` lists are written out, INCLUDING the `Symbol` DROP, the duplicate `1`/`'1'`, the prototype-carrying record and the non-callable-`Symbol.iterator` fallback.** No member contradicts the text — **and this is the row whose boundary would have been easiest to overstate (a "strings only" boundary would have contradicted members `4`, `7` and `10`), which is why the boundary is stated as "the declared outcome per member".** |
| `P-CN-SM-3` | *"EVERY one of the `10` enumeration shapes"*, empty-input outcomes, `× 3` passes | **`10 × 3 = 30` declared, `10` distinct drives**, all `30` enumerated. **No member contradicts the text** — every shape is an empty-or-non-enumerable input, which is exactly the boundary the row names. **⟶ CONFIRMED BY THE ARCHITECT RULING 2026-09-27 (`§0A` ruling note 11): the row is confirmed as filed and is NOT merged with the declined-zone case — a declined zone is not a zero-boundary input, and the ruling changes no shape, pass or term here.** |
| `P-CN-TP-1` | *"EVERY zone member drawn from the `30`-member pool"*, **boundary: every member is an OBJECT or a FUNCTION** | **CHECKED MEMBER-FOR-MEMBER AND THE BOUNDARY WAS NARROWED AT FILING TO MAKE IT TRUE:** the pool was originally drafted to include the primitive and `null`/`undefined` zone-id classes beside the object classes; **a homogeneous boundary is the only one under which a *drawn* member cannot contradict the row's text**, so **those classes were REMOVED from this pool** (they are driven by `P-CN-SM-2` shape `(10)` and `P-CN-SM-3` shapes `(6)`–`(9)` instead) and **the row's boundary now reads exactly "every member is an object or a function"** — which **all `30` listed members satisfy**. **This is the pool-versus-boundary rule applied at filing time rather than at red time, and it is recorded because the alternative (a heterogeneous pool with a per-member outcome clause) would have made `36` unbounded draws assert a boundary the pool does not hold in general.** |

**Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES (one term per register row,
counted from the table above).** **`68` (`P-CN-IM-1`) + `36` (`P-CN-IM-2`) + `24` (`P-CN-IM-3`) + `14`
(`P-CN-IM-4`) + `30` (`P-CN-SM-1`) + `10` (`P-CN-SM-2`) + `30` (`P-CN-SM-3`) + `36` (`P-CN-TP-1`) =
`248` attempts.** **The terms, added out loud, term by term, BEFORE this filing was written (the addition
is done here so it cannot be a mis-sum — three sibling units in a row mis-summed this figure:
`U-LISTHOST` `157`→`168`, `U-PROJ` `239`→`231`, `U-ZONES` `400`→`369`):**
**`68 + 36 = 104` · `104 + 24 = 128` · `128 + 14 = 142` · `142 + 30 = 172` · `172 + 10 = 182` ·
`182 + 30 = 212` · `212 + 36 = 248`.**
**THE TOTAL IS `248`, AND `248` IS THE SUM OF THE EIGHT TERMS ABOVE (`248` = `68+36+24+14+30+10+30+36`).**
**`248 ≤ 400`** (under the register total cap); **the per-row maximum is `68` (`P-CN-IM-1`) `≤ 100`.**

| Row | Attempts | What counts as one attempt | Its terms |
| --- | --- | --- | --- |
| `P-CN-IM-1` | **68** | one `computeTrackVars` call on one (predicate variant × census shape) pair | `17` predicate variants × `4` census shapes = **68** |
| `P-CN-IM-2` | **36** | one `computeTrackVars` call on one (decision × census state × missingness) cell | `3` decision variants × `4` census states × `3` missingness configurations = **36** |
| `P-CN-IM-3` | **24** | one `computeTrackVars` call on one (caller object × access pattern × twin form) cell, or its repeat | `3` objects × `2` patterns × `2` twin forms = `12`, `+ 12` repeat drives = **24** |
| `P-CN-IM-4` | **14** | one `computeTrackVars` call in the fixed drive table | `8` argument-shape drives `+ 3` call-count drives `+ 3` argument-fidelity drives = **14** |
| `P-CN-SM-1` | **30** | one `computeTrackVars` call on one (hostile shape × driving pass) cell | `10` shape classes × `3` passes = **30** |
| `P-CN-SM-2` | **10** | one zone-enumeration shape driven once | `10` shapes (one drive each) = **10** |
| `P-CN-SM-3` | **30** | one `computeTrackVars` call on one (empty-input shape × pass) cell | `10` empty-input shapes × `3` passes = **30** (**the DISTINCT-DRIVE count is `10`** — `§5.3` item 11) |
| `P-CN-TP-1` | **36** | one pinned-seed draw | `36` draws (`S-CN-SEED-1`, `state₀ = 20260927`, one LCG step per draw, `index = stateₙ₊₁ mod 30`) |
| **TOTAL** | **`248`** | — | **`248 ≤ 400`** (under the register total cap); **the per-row maximum is `68` (`P-CN-IM-1`) `≤ 100`** — and **the eight terms `68+36+24+14+30+10+30+36` are the sum `248`** (verified by the step-by-step addition printed above) |

**How the counting works, so the numbers are checkable rather than asserted.** **One "attempt" = one
exercised DRIVE of one register row** — for the key-set row one `computeTrackVars` call on one pair, for
the delegation row one call in its drive table, for the shape row one drive of one enumeration shape, for
the pool row one draw. **Setup is NOT counted** (constructing a census, freezing a twin, snapshotting a
value is precondition, not attempt). **The DECLARED total is `248` (`= 68+36+24+14+30+10+30+36`) and the
caps are compared against it.** **A DONE row reporting a total other than the one the test file's tables
produce is a review finding** (`§5.3` items 10/11): **the ledger's numbers are read against the test
file's tables**, and **`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` (ACTIVE) makes the
printed arithmetic itself the assertion — *a total that is not the sum of its own terms is a review
finding*.**

**Register change summary (what this filing did).** **No exemption is superseded here — there was none**
(`§5.5`'s note: no `§5.5.0` exists). **This register is `U-CENSUS`'s own and is NOT a copy of
`docs/specs/projection.md` §5.5.1's, `docs/specs/zones.md` §5.5.1's, `docs/specs/listhost.md` §5.5.1's or
`docs/specs/slothost.md` §5.5.1's** — no row, table, pool or id is shared, and **no landed register's row
is restated, extended or contradicted**, so **no second authority over a landed register is created**
(the discipline `docs/specs/projection.md` §8 states). **It shares the TYPE ALGEBRA
(`P-IM`/`P-SM`/`P-TP`) and the STRATEGY DISCIPLINE** (deterministic tables, one pinned-seed hand-rolled
LCG, caps `≤100`/`≤400`, stop-after-5, no new dependency) **and nothing else.**

**Register integration with the legs and the DONE row (so the property layer is not an orphan).** The
register rows are carried by **the same node suite** `npm test` already runs (`§5.2` leg 1) in **this
unit's own** `tests/census.test.ts` — **no new leg, no new file, no new script, no `package.json` change,
no new dependency** (`§5.1`'s diff scope is unchanged). **No `[U]` row exists to depend on** (§5.2), so
**no register row can be layer-blocked**. **`§5.3`'s DONE row carries items 10 and 11** (the per-row
counts, strategy ids, the pinned seed and its step form, the stop-after-5 status, the total against the
caps, the five `YES (bounded)` sentences, the `P-CN-TP-1` distinct-member report, and the arithmetic
printed **with its terms**). **A read-only PBT audit may not report a row as executed on the strength of
this table alone** — the audit reads **the TestWriter's tables in `tests/census.test.ts`** and **the
ledger's numbers against this cell**, because **every `YES` here is execution DESIGN and this pass ran
nothing.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a pure census → record function cannot compute a
record whose key set is exactly its caller's zone enumeration while delegating every token byte to
`U-ZONES` and mutating nothing, then `SCH-8`'s census half is not realisable and the unit fails.* **The
falsification tests are `I-2`** (the exact key set — `P-CN-IM-1`/`P-CN-SM-2`/`P-CN-TP-1`), **`I-4`** (the
delegate carries every byte — `P-CN-IM-4` + `R-1`), and **`I-3`** (nothing is mutated or cached —
`P-CN-IM-3`). **A "helpful" default reveal, an omitted non-revealed key, a fabricated key set derived
from the census, a locally re-implemented empty-token limb or an in-module census read would each satisfy
an apparent purpose while failing one of those rows** — and each is a ledger row, not a judgement call.

**A second, independent falsification.** *If the emptiness/token decision cannot be taken from an
INJECTED census through the predecessor's two calls without this unit owning or remembering anything,
then `§1` items 2/3 and the `V-13` remedy are not realisable.* **The test is `I-4` + `P-CN-IM-4`** (the
call counts and argument fidelity, over `14` drives) **+ `P-CN-IM-3`** (the census is observably
unchanged across `24` drives).

**A third, independent falsification.** *If the key-set rule and the reveal rule cannot hold
simultaneously, the ledger's contract is internally inconsistent.* **The test is `C-A` and `C-C` driven
in the same cell** — `P-CN-IM-1`'s variants `1`–`9`/`16` (no decision supplied ⇒ `{}`) against its
variant `10`/`15` (a truthy decision ⇒ all three keys) **and** `P-CN-IM-2`'s `v2`/`v3` columns (a falsy or
absent decision for a single zone ⇒ the key present with `''`, never omitted).

**⟶ THE RULING'S FALSIFIERS, ADDED HERE AS THE FOURTH-FORM FALSIFICATION SET (`§0A` ruling note 11,
2026-09-27: "**Non-revealed zones still exist, they just don't get displayed.**"; the falsifiers themselves
are written out verbatim at `§0A` ruling note 12).** **The third paragraph above is kept as filed, and the
ruling's own falsifiers SUPERSEDE its last clause in one NAMED respect rather than silently rewriting it:
the ruling's falsifier (a) requires that a `revealed` predicate that DECLINES zone `z` still leaves `z` IN
`Object.keys(record)` — and the ruling's own `F-2` boundary fix (`§3.2`'s annotation, `§2.3` item 3's
annotation) says an ABSENT/non-callable/THROWING `revealed` is the EMPTY-record case, so `P-CN-IM-2`'s
`v2` column (`() => false`) yields the key with `''` while its `v3` column (absent) yields `{}`. **A row
that folds `v2` and `v3` into one expectation FAILS this spec's text** — the as-filed sentence lumped them
together as *"a falsy or absent decision"*, and the ruling separates them.** **The falsifiable tests of the
ruling are therefore, each on a NAMED row:** **(1)** the key-set falsifier — `Object.keys` contains `z` and
the key set equals the `zones` set **by set equality** (`C-A`, `I-2`, `P-CN-IM-1` cells `10`/`15`/`17`);
**(2)** the display-value falsifier — the declined zone's value is **exactly `''`**, never a token and never
the `emptyToken`, with `trackFor` proved uncalled for it (`M-4`, `M-12`, `F-3`); **(3)** the omission
falsifier — a module that OMITS a declined zone **FAILS** the key-set row (`C-A` (a), `§4.4 S-9`);
**(4)** the token falsifier — a module that EMITS A TOKEN for a declined zone **FAILS** the reveal row
(`C-C` (a), `I-5`); **(5)** the never-a-default falsifier — a module that DEFAULTS reveal to true, or reads
the census to guess it, **FAILS** the never-a-default row (`C-C` (b)–(e), `I-5`, `P-CN-IM-2`). **A ruling
whose falsifiers cannot be derived this way is not a contract clause, and these five are the reason this
one is.**

**A fourth, independent falsification.** *If the arithmetic claims cannot be made WITHOUT a
rendered-geometry claim, the unit exceeds its provable layer.* **The test is `R-6` + `I-8` + §5.2's
refusal to offer a `[U]` row** — and the finding it prevents is `RK-19`'s (a later pass "proving"
geometry from a node-green).

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded **before**
implementation continues; (c) the unit is **declined back** — admissible only if a clause is shown to be
**inseparable from the projection half** that `U-PROJ` owns (which would be a finding that A-d4's
two-half split is not realisable, and therefore a **new gate**, not this unit's call — `H-r1`'s
cite-and-supersede rule).

**Stop conditions (`S-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]` leg** —
it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This filing has
NO such row**: every claim in this file is arithmetic, delegation or a static scan over this unit's own
files.

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **`UNBLOCKED` on the architect question and `BLOCKED` on ONE thing only — its own red set** (§0 ruling
   12 as annotated by **`§0A` ruling note 11**, `§4.5`),
   and its red set is **`OWED — NOT AUTHORED, NOT RUN`** (RCA-1). **Its ordering precondition is
   discharged** (`U-ZONES` is `DONE`; `R-12` keeps that premise falsifiable), which is the only half of
   this sentence that differs from its predecessor's filing state.
2. **THIS UNIT IS A PURE `src/shared/` MODULE IMPORTED BY NO `src/**` FILE, and that is load-bearing for
   every claim below.** Until a consumer exists, **its green proves the CONTRACT HOLDS FOR A CALLER — not
   that the app behaves differently.** No window, no IPC round-trip, no MCP transport and no renderer
   behaviour changes when this module lands (`R-8`/`R-13` pin the claim; §5.2 gives the structural reason
   no `[U]` row is offered).
3. **No CSS is shipped, in any form, by this unit** — and **no CSS is shipped by the family either**: the
   `:has()` rules and the collapse-override declaration **stay consumer-side** (ruling 7, `§1` item 5).
   **No stylesheet, no declaration, no class name, no token literal** — the empty token is the caller's
   and this unit never sees its spelling.
4. **No zone/pane/tab/region/track vocabulary exists in this mechanism** — not as a symbol, not as a
   union member, not as a default and not as a documented constant (prohibition 1, `H-r17`). **Every
   string the module emits is the delegate's output over caller data**, and **the module does not know
   that an `emptyToken` may be `'0px'`** — **including in its own doc comments, which must not carry a
   bounded vocabulary token (`R-3`'s implementer wording hazard).**
5. **The mechanism is outside the UI constraint BECAUSE IT IS NOT A UI ELEMENT**
   (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`): it authors no text, no control, no affordance, no class, no
   token value and no styling. **`AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED by this
   unit, and this unit needs no exception to them** — **the moment a later pass makes this module stamp
   a literal, a default or a label, it becomes a UI element authored outside the provident graph and a
   review finding.**
6. **THE GEOMETRY LIMIT, stated where a reader meets it.** **This unit asserts ARITHMETIC and DELEGATION
   and NEVER rendered geometry.** *"The arithmetic is provable here; any claim about the rendered
   geometry is UNPROVABLE in this repo today."* **`computeTrackVars` returns a record of strings;
   whether a browser accepts them, applies them, or paints anything is not this unit's claim, not the
   node suite's claim, and cannot be made from this change set at all** (`§2.5`, `I-8`, `R-6`, §5.2).
   **And it is doubly true here: `U-GUTTER`'s geometry clause is `U-GUTTER`'s**, and **no row of this
   unit may be cited as evidence for it** (`§1` item 7).
7. **Contract decisions this filing had to make where the ledger is silent, recorded so they are
   reviewable rather than implicit** (each is a `§0A` ruling note): **(i)** `zones` accepts a
   sequence (iterator) or a record's own string keys, and every other input yields **zero zones**
   (note 2); **(ii)** a zone member is carried **verbatim** and interpreted nowhere, and a non-string
   member is therefore **never empty** because `U-ZONES` says so — **this unit must not compensate**
   (note 3); **(iii)** `census` is opaque and this unit **never reads it** — it asks `isEmpty` instead,
   and the call is the delegation working rather than a duplication of it (note 4); **(iv)** `sizes` and
   `specOf` are each a callable-or-record lookup whose unusable forms degrade to `undefined`, so the
   **outcome is `U-ZONES`'s own limb and never an outcome this module invents** (note 5); **(v)**
   `revealed` is a **callable predicate and nothing else**, and absent/non-callable/throwing ⇒ **the
   empty record** — **an absence of decision, not a hidden default** (note 6); **(vi)** the returned
   record is a **null-prototype** object, so `'__proto__'` is an ordinary zone id (note 7); **(vii)**
   there is **NO refusal domain** and every outcome is a value (note 8); **(viii)** the key-set clause
   binds the **`zones`** parameter and never the reveal decision, which is the only reading under which
   all three ledger clauses are simultaneously falsifiable (note 9). **Each is a decision, not a
   derivation — the sources are SILENT on all eight.** **Unlike these eight, the *"key set exactly
   `zones`"*, *"never mutated"*, *"never a default"* and *"delegating token formatting"* clauses are NOT
   decisions made where the sources are silent: they are the ledger's own binding wording.**
8. **THREE dependencies are explicitly ABSENT, and this filing states that plainly rather than leaving
   them open.** **(a)** The engine pin (`A-d2`) is **spent** — the module imports nothing but its
   predecessor. **(b)** The adopted node-local interaction session **`U-GSESSION`** (`A-d3`/`S-d9`) is
   **NOT this unit's dependency** — this module installs no listener, owns no element and takes no event
   source. **(c)** The projection/applier (`U-PROJ`) is **NOT a dependency** — no import, no re-expression
   of its contract (`R-5`). **A dependency asserted later would be a fabricated edge** (`H-r6`'s
   dissolved-edge class); **`U-GUTTER` (row `E3`) IS a real and named dependency of the opposite
   direction — it depends on THIS unit** (§1 item 7).
9. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case coverage
   matrix and no demo-page index to update**. **`R-11` is the PROBE that keeps this claim falsifiable**,
   and **if that file comes to exist, this unit owes the coverage row and the demo-page entry** — with the
   honest note that a mechanism with no UI surface can only contribute an **absence** row.
10. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for this
    unit it is **also never a CSS-validity, applied-length, layout, paint or geometry green**. The `[U]`
    leg exists and is green (`U-REALDOM-BOOT` is `DONE`), so **the refusal to offer a `[U]` row is
    structural, not an excuse** (§5.2).
11. **No row of this unit claims a `bodyRuns`/`BARE-TEXT-EMIT` surface, an engine behaviour, a package
    capability or a census semantics** (`H-r11`'s no-overclaim rule); **this unit exercises no engine
    surface at all, and it does not know what any census counts.**
12. **The property register's `YES` markings are execution DESIGN, not results** (`§5.5.1`): this pass ran
    nothing, and **a row that is `YES` in `§5.5.1` but broken when the red runs is a SPEC FINDING,
    reported rather than tuned to green.** The register's arithmetic is printed **with its terms** —
    **`68+36+24+14+30+10+30+36 = 248`** — added term by term before filing, **and ONE figure is
    deliberately NOT asserted: `S-CN-SEED-1`'s draw sequence and distinct-member count, which this pass
    could not execute and which the red run must REPORT** (`§5.5.1`'s honesty item 5, and the
    `P-CN-TP-1` cell's arithmetic-honesty clause). **`C-B`'s static half (`R-9`) proves the absence of a
    write SITE and never the absence of a mutation behaviour** — the observable half is `I-3`'s.
13. **THE STATED LIMITATION OF THE MECHANISM — the three-case `''` collision, recorded here because the
    ARCHITECT RULING (2026-09-27, `§0A` ruling note 11: *"**Non-revealed zones still exist, they just don't
    get displayed.**"*) makes it explicit and it is the load-bearing honesty item for a consumer.** **The
    ruling distinguishes EXISTENCE from DISPLAY; this unit's record can express existence (its KEY SET,
    `C-A`) and CANNOT express display state**, because **every outcome is a VALUE (`§0A` ruling note 8,
    `I-9`) and the record's value domain is `string`.** **Consequently THREE distinct causes all yield `''`
    and are indistinguishable from the record's VALUE alone: (i) the consumer's `revealed` DECLINED the
    zone; (ii) the zone's spec entry is MALFORMED (the delegate's malformed-spec limb, `F-3`/`F-4`);
    (iii) the zone's size lookup MISSED and the caller's `emptyToken` happens to be `''` (`§2.3` item 4).**
    **THE HONEST CONSEQUENCE:** a consumer that needs the distinction **must keep its OWN reveal decision**
    (it already holds the predicate it passed in) **or read the record's KEY SET, not the value** — **the
    key set is the existence signal; the value is only the display payload.** **THE REVISIT CONDITION:** **a
    unit that needs a per-zone display/existence CHANNEL — a status record, a reason domain, or a sentinel
    OTHER than `''` — is a NEW CONTRACT that must go through its own gate; it may not be smuggled in as a
    value-semantics change to this one.** **NO sentinel and NO second value domain is invented here** — the
    ruling does not authorise either, and **inventing one would break the `U-ZONES` delegation** (`I-4`,
    `§3.4 R-1`, `§4.4 S-1`) **and the `V-13` anti-second-authority argument** (`§0` ruling 3, §8). **This
    is a limitation of the mechanism as ruled, NOT a defect and NOT a parked question** — it states what
    the ruled contract honestly does, so that no consumer reads a `''` as more than it is. **This item is
    added by the annotation pass; items 1–12 above are kept as filed.**
14. **THE SIBLING-FACING HALF OF THE RULING, recorded where a consumer's reader meets it** (`§1` item 7's
    annotation, `§8`'s `U-GUTTER`/`U-RELOCATE` rows, 2026-09-27): **the returned record's KEY SET is the
    full `zones` set REGARDLESS OF REVEAL** — so **a consumer driving geometry per KEY (`U-GUTTER`'s
    per-zone controllers, `U-RELOCATE`'s relocation drives) SEES EVERY ZONE and must consult its OWN reveal
    decision for DISPLAY** — and **`U-RELOCATE`'s reveal-set semantics are the CONSUMER-SIDE COUNTERPART of
    this rule, NOT a competing one**: **that reveal set is the consumer's own state, and this unit merely
    REFLECTS the decision it is handed** through the `revealed` predicate (`§2.4 C-C`). **Neither unit
    overrides, duplicates or re-derives the other's reveal semantics, and this unit still duplicates no
    sibling responsibility** (`§1` item 10, `§3.4 R-5`). **No parameter, field, value domain or row is
    added by this item.**

### 7a. Ambiguity report — clauses a TestWriter could NOT derive a falsifiable row from

**What this subsection reports, and how to read it.** **EIGHT clauses** of the ledger/A-d4 text left a
TestWriter unable to derive a **falsifiable** row as written: each is either **two texts implying
different shapes**, **under-specified**, or **a clause the ledger does not state at all**. **They are
REPORTED here rather than guessed** — the same discipline the four sibling specs used. **The report and
the rulings are in ONE table below** (`§7a.1`), because **this filing rules all eight at filing time**:
the report column pair states **what could not be derived and why**, and the ruling column states **the
contract text the ruling produces and where it lands**. **No `§3` row, prohibition, register row or
diff-scope clause is weakened, widened or re-scoped by this report** — and **no item is left as a silent
gap. One item (`§7a` item 7, the module path) was resolved by this filing's own convention rather than by
a source, and is recorded as such.**

### 7a.1 THE RULINGS — all eight items ruled at filing (2026-09-27), so the delegation gate's ambiguity list is EMPTY

**Why this pair of subsections exists, and what it is.** `AGENTS.md` item 9's delegation gate requires
that the list of clauses a TestWriter **cannot** derive a falsifiable row from be **EMPTY or explicitly
parked** before a red set is authored. **This filing reports EIGHT such clauses and rules every one of
them**, from the contract's own majority reading and with the clause that decides it. **`8` items
reported · `8` ruled · `0` OPEN QUESTIONS · `0` items needing the architect.** **The report is kept
visible and the rulings are contract text**: a TestWriter writes against `§7a.1`, and **a row written
against a report-table reading instead of a ruling is the `C-16`/`RK-10` class** (a contract
reverse-engineered from a guess).

| # | The clause(s) that disagree | Why a falsifiable row could not be derived as written | My reading (best available, NOT a ruling) | Owner | **THE RULING (`§7a.1`) — contract text, cited** |
| --- | --- | --- | --- | --- | --- |
| **1** | The ledger's `zones` parameter (and the queue row's cell) vs the four shapes a caller might hand it (**a record**, an **array**, a **`Set`**, a **`Map`**) — the sources name the parameter and none of the shapes; and, separately, the SHAPE of `sizes` (a record keyed by zone? a function? both?) and what a missing/malformed size yields. | A row cannot assert an enumeration rule or a lookup rule from a spec that states none: for `zones`, four readings (index read / membership / own-key read / keys-of-a-`Map`) give four different key sets for the SAME input, so **any** row would be a guess; for `sizes`, a row cannot know whether a missing entry is an omission, a `0`, or the empty token. | **`zones`: a sequence (a `Map`'s KEYS; a `Set`; an array; an own callable `Symbol.iterator`) or a record's own enumerable string keys; everything else ⇒ zero zones. `sizes`: a callable or an own-keyed record; a miss/malformed entry ⇒ `undefined` ⇒ the caller's `emptyToken` (the delegate's own limb).** | contract text: `§2.3` items 1/4 | **RULED — `§0A` ruling notes 2, 3 and 5.** Landing: `§2.3` items 1/4, `M-2`, `M-7`..`M-9`, `F-1`, `F-4`, `§5.5.1 P-CN-SM-2`/`P-CN-TP-1`, `§3a A-1`/`A-3`. |
| **2** | *"`revealed` is a consumer decision, never a default"* — the ledger states the PROHIBITION and never the SHAPE (a per-zone predicate? a record? a single boolean?), nor the outcome when it is absent or malformed. | A row cannot assert a call signature, an arity or an outcome from a prohibition alone: a single boolean reading gives one policy for every zone (and makes `C-A`'s key set unreachable), a record reading duplicates `sizes`/`specOf`, and **both** an `undefined`-means-visible and an `undefined`-means-hidden fallback are compatible with the words as written. | **`revealed` is a CALLABLE PREDICATE `(zoneId) → unknown`; truthy ⇒ emitted, falsy ⇒ not; absent/non-callable/throwing ⇒ the EMPTY record (no decision was supplied).** | contract text: `§2.3` item 3, `§2.4` clause `C-C` | **RULED — `§0A` ruling note 6.** Landing: `§2.3` item 3, `§2.4 C-C`, `M-11`/`M-12`, `F-2`, `§5.5.1 P-CN-IM-2`, `§3a A-2`. **⟶ ANNOTATED 2026-09-27: this ruling's predicate SHAPE is CONFIRMED by the architect ruling (`§0A` ruling note 11) — a decline requires a callable predicate, and the ruling's DECLINE case (`C-A` (a): the key exists with `''`) presupposes exactly this shape, while the ABSENT case stays `F-2`'s empty record.** |
| **3** | The returned record's `C-A` (*key set exactly `zones`*) vs **a zone with NO `specOf` entry**: does it yield the delegate's malformed-spec `''`, or is it skipped entirely — **and is that a reason domain or a value?** | Both readings satisfy the clauses as **written**: omitting the key satisfies *"no extras"* but violates *"no omissions"*, and yielding `''` satisfies the set but leaves a consumer unable to tell *"no spec"* from *"a caller-supplied empty token"*. And if the answer were a skip, the ledger's refusal vocabulary would have to exist — which it does not describe. | **The key IS present, its value is `''` (the delegate's own malformed-spec limb reached with `undefined`), and there is NO reason domain — the outcome is a VALUE.** | contract text: `§2.3` item 5, `§0A` ruling note 8 | **RULED — `§0A` ruling notes 5 and 8.** Landing: `§2.3` item 5, `§2.4 C-A` (b), `F-3`, `F-4`, `I-9`, `§5.5.1 P-CN-IM-1`/`P-CN-IM-2` (the `m3` cells), `§4.4 S-5`, `§3a A-4`. |
| **4** | Whether the returned record may include a key for a zone **whose size is missing**, and a zone **whose spec is missing** — the ledger's *"no omissions"* vs the natural instinct to emit only zones that have something to emit. | A row cannot decide an omission from *"the key set is exactly `zones`"* alone if the phrase is read as *"exactly the zones that produced a token"*, and the two readings give different `Object.keys` for the same input. | **YES — every enumerated zone HAS a key, whether revealed or not, whether its spec/size exists or not.** **⟶ RATIFIED 2026-09-27 by the architect ruling (`§0A` ruling note 11: "**Non-revealed zones still exist, they just don't get displayed.**"): the reading pinned here — and the reject clause *"exactly the zones that produced a token"* — is CONFIRMED, so `C-A` is UNCONDITIONAL and is NOT a subset claim. The as-filed *"best available, NOT a ruling"* framing stands visible and is now superseded by the ruling, not by this annotation.** | contract text: `§2.4` clause `C-A`, `§0A` ruling note 9 | **RULED — `§0A` ruling note 9.** Landing: `§2.4 C-A` (a)/(b), `M-4`, `F-3`, `§5.5.1 P-CN-IM-1`/`P-CN-SM-3`, `§3a A-5`. |
| **5** | **DUPLICATES in `zones`** (and a number beside its own string image): the sources say the key set is exactly `zones` and never what a duplicate means — one key or two, and which value wins. | A row cannot assert a count or a winning value from a clause that speaks about sets: *"exactly `zones`"* as a **set** gives one key, as a **multiset/list** gives two (which a JS record cannot express anyway), and **the value's provenance** is undecided. | **One key, at its FIRST-SEEN position, with the LAST occurrence's value** (plain own-key write overwrites; key order is first-seen). | contract text: `§2.3` item 1 (iii), `§2.4 C-A` (d) | **RULED — `§0A` ruling note 7 + `§2.3` item 1 (iii).** Landing: `§2.3` item 1 (iii), `M-7`, `§5.5.1 P-CN-SM-2` shapes `(1)`/`(3)`, `§3a A-6`. |
| **6** | **May `computeTrackVars` call `isEmpty` at all?** The ledger's contract names the census parameter and the delegation; the predecessor's `§2.1` delegate note says its **mechanism never calls `isEmpty` itself** and its `§2.3` item 6 says *"a `U-CENSUS` consumer that wants the derived flag calls both itself"* — so the caller is undecided between *"this unit decides emptiness itself"* (which would be a second authority) and *"this unit asks the delegate"*. | A row cannot assert a call count, an argument order or a precedence from an undecided caller: *"calls `isEmpty`"* and *"does not call `isEmpty`"* are both compatible with the ledger's row text, and **the second reading forces this unit to invent its own census reading — the `V-13` class the unit exists to close.** | **YES: exactly one `isEmpty(census, zoneId)` call per revealed zone, its boolean passed straight into `trackFor`'s third argument; zero calls for non-revealed zones; and NO census read of this unit's own.** | contract text: `§2.3` item 2, `I-4`, `§5.5.1 P-CN-IM-4` | **RULED — `§0A` ruling note 4** (with the reason written out: the emptiness decision has no other admissible source, and the predecessor explicitly names this unit as the caller). Landing: `§2.3` items 2/6, `M-5`, `M-8`, `F-5`, `I-4`, `§5.5.1 P-CN-IM-4`, `§3.4 R-1`, `§3a A-8`. |
| **7** | **This spec's module path and test-file path** — nothing in the sources names either, while five sibling modules exist under `src/shared/`. | A row cannot read a module that has no name, and cannot scope a diff over a path the spec leaves open. | **The paths are `src/shared/census.ts` and `tests/census.test.ts`.** | contract text: `§2.1`, `§5.1` row 1 | **RULED — `§0A` ruling note 1 (the path pair).** Landing: `§2.1`, `§5.1` rows 1/2, `§3.5 R-10`, `§3.4 R-8`. |
| **8** | The ledger's *"the census object is never mutated"* vs **the observable SET the clause binds**: own keys? values? prototype? frozen-ness? descriptors? a `Map`'s `size`/entries? — and whether the unit may **cache into** the census (the words forbid mutation and say nothing about retention). | A row cannot assert *"unchanged"* without naming what is compared: `Object.keys` equality passes for a prototype swap, `toBe` passes for a descriptor rewrite, and a frozen-ness change is invisible to both — so **an un-named observable set makes the row unfalsifiable in one direction and over-strong in the other.** | **All of: own keys in order+content; every own value by `Object.is`; the prototype; frozen-ness; own descriptors; a `Map`'s size+entries; a `Set`'s members; no new key/default/sentinel; and no retention (a cache would show on the third call).** | contract text: `§2.4` clause `C-B`, `I-3` | **RULED — `§0A` ruling note 8's companion clause and `§2.4 C-B`.** Landing: `§2.4 C-B` (a)–(i), `I-3`, `M-6`, `M-14`, `F-5`, `§5.5.1 P-CN-IM-3`, `§3.4 R-9`, `§3a A-7`. |

**The gate's list is therefore EMPTY: `8` items reported, `8` ruled, `0` OPEN QUESTIONS, and NO item is
parked.** **No clause of this contract was weakened to make a test easy, and no ruling invents a
vocabulary, a default, a field or an export.** **No item is presented as contract text without the clause
that decides it**, and **no item needed the architect** — each was decidable from the ledger, A-d4's
ruling, the predecessor's landed and RULED semantics (`docs/specs/zones.md` `§0A`/`§2.3`), or this unit's
own boundary. **`§7a.1` is a sub-heading of `§7a`, and no section number moves.**

**⟶ ANNOTATED (2026-09-27) — THE ARCHITECT RULING RATIFIES ITEM 4'S READING, AND THE LIST REMAINS EMPTY
WITH NO OPEN QUESTION.** *(As-filed text above is kept visible. `§0A` ruling note 11, verbatim:
"**Non-revealed zones still exist, they just don't get displayed.**")* **Item 4's ruling (the `C-A`
key-set question — *"YES — every enumerated zone HAS a key, whether revealed or not, whether its
spec/size exists or not"*) is the reading the architect's ruling CONFIRMS, and item 2's ruled predicate
shape (`revealed` as a CALLABLE PREDICATE) is the shape the ruling's DECLINE case presupposes — a decline
needs a predicate to decline with.** **The one clause this filing escalated BEYOND `§7a`'s eight — the
`C-A`-versus-`revealed` tension, pinned provisionally at `§7a.1` item 4 and in ruling note 9 — is now
RULED, so there is NO open question in this subsection and NONE with the architect.** **The gate's list is
therefore EMPTY for the second time and for a stronger reason.** **The two report cells are annotated below
(the as-filed *"best available, NOT a ruling"* framing stands visible; the ratifying clause is the ruling),
and NO section number moves, no item is renumbered and no clause is weakened.**

**ONE ITEM IS REPORTED AS A STANDING RISK RATHER THAN A QUESTION, so the list above stays honest**
(`§5.5.1`'s honesty item 5): **this pass could not execute `S-CN-SEED-1`, so `P-CN-TP-1`'s draw sequence
and distinct-member count are an EXECUTION record the red run must report and this filing deliberately
does not assert** — the repo's own ACTIVE rule forbids printing an arithmetic figure its author has not
verified. **That is a reporting obligation on the red run and the DONE row, not an ambiguity in the
contract and not an architect question.**

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited
**by SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited
by ROW ID** (`E1`, `E2`, `E3`), never by line. **`docs/decisions.md`'s row anchors drift** (rows are
appended), so its rows are cited **by NAME**. **This spec writes no line-count census of any file.**

| Source | Status for `U-CENSUS` | Where |
| --- | --- | --- |
| **`SCH-8`'s census half (`LAYOUT-STATE-PROJECTION`), `A-d4`, refile WITHDRAWN** | **ADOPTED — this unit's charter**, census half only | §0 ruling 1/2, §1, §2 |
| **THE ARCHITECT RULING OF 2026-09-27 — *"Non-revealed zones still exist, they just don't get displayed."*** | **RECORDED VERBATIM as the contract's own dated ruling and BINDING: it settles the `C-A`-versus-`revealed` tension in favour of Reading A (the reading this filing pinned provisionally), makes `C-A` UNCONDITIONAL and NOT a subset claim, confirms `C-C`'s *"`revealed` decides display, never a default"*, and separates EXISTENCE (this unit's key set) from DISPLAY (the consumer's decision, which the record's `string` value domain cannot express). It confirms the register cells flagged conditional (`P-CN-IM-1` cells `10`/`15`/`17`; `P-CN-SM-3`) and WITHDRAWS the provisional omit-reading as a SPENT CONTINGENCY (kept visible with its provenance). It carries five falsifiers and leaves one STATED LIMIT (the three-case `''` collision) with its revisit condition** | **`§0A` ruling notes 11 and 12**, §2.4 `C-A`/`C-C` (their dated confirmations), §2.3 items 3's annotation, §2.5 item 3's annotation, `§3.2 F-2`'s annotation, `§3.3 I-2`/`I-5`'s confirmation, `§5.5.1`'s dated register confirmation, §6, §7 item 13, §8 |
| **`computeTrackVars(zones, census, sizes, revealed, specOf)`** — the exact signature, five parameters in that order, `revealed` fourth | **ADOPTED CONTRACT-EXACT**; arity and parameter order pinned and asserted by a row | §2.1, `§3.4 R-2` (b), `§3a A-13` |
| **The delegation contract: what it calls in `U-ZONES` and what it must never duplicate** | **CARRIED** — `isEmpty(census, zoneId) → boolean` (census FIRST, zone verbatim) and `trackFor(spec, size, empty) → string` (returned bytes are the record's value); **NO limb of the token arithmetic may be re-implemented, and no census read of this unit's own may exist** | §1 item 3, §2.1 (the delegate clause), §2.3 items 2/6, `§3.3 I-4`, `§3.4 R-1`, `§4.4 S-1`, `§5.5.1 P-CN-IM-4` |
| **`revealed` a consumer decision, never a default** | **CARRIED as `§2.4 C-C`**, with the forbidden readings enumerated (a)–(g) | §2.4 `C-C`, §2.3 item 3, `F-2`, `§3.3 I-5`, `§5.5.1 P-CN-IM-2`, `§3a A-2` |
| **The returned record's key set exactly `zones`** | **CARRIED as `§2.4 C-A`**, as SET EQUALITY, with the duplicate/empty/missing-spec cases named | §2.4 `C-A`, §2.3 item 1, `M-1`/`M-2`/`M-7`, `F-1`..`F-3`, `§3.3 I-2`, `§5.5.1 P-CN-IM-1`/`P-CN-SM-2`/`P-CN-SM-3`/`P-CN-TP-1` |
| **The census object is never mutated** | **CARRIED as `§2.4 C-B`**, with the observable set named (a)–(i) INCLUDING no-caching-into and no-retention | §2.4 `C-B`, `M-6`, `M-14`, `F-5`, `§3.3 I-3`, `§5.5.1 P-CN-IM-3`, `§3.4 R-9` |
| **Validity finding `V-13`** (a second authority over emptiness/tokens) | **ANSWERED BY THIS UNIT** — by the never-mutate rows (`C-B`, `I-3`, `P-CN-IM-3`, `R-9`) and the exactly-`zones`-key rows (`C-A`, `I-2`, `P-CN-IM-1`), **plus the one-authority delegation clause** (`I-4`, `R-1`). **The three rows the ledger names are the remedy; this index names them so no later pass reads `V-13` as open** | §0 ruling 3, §2.4, §3.3 `I-2`/`I-3`/`I-4`, `§3.4 R-1`/`R-9`, `§5.5.1` |
| **`U-ZONES` (`E1`, `DONE`) — the delegate, `docs/specs/zones.md`** | **DEPENDENCY, LANDED, GREEN, VERIFIED** — this unit consumes `isEmpty`/`trackFor`/`TrackSpec` and **must not re-implement them**; its `§0A`'s ruled semantics (`-0`, no refusal domain, the `Map`/record dispatch precedence, the malformed-spec-first limb order, `''` for a malformed spec) are **CITED, never re-pinned** | §1 item 3, §2.1, §2.3 items 2/4/5, §2.5 item 2, `§3.4 R-1`, `§3.5 R-12`, `§4.3` |
| **`docs/specs/zones.md`'s `§2.1` delegate clause** (*"what `U-CENSUS` may call is exactly this module's three exported names … the emptiness DECISION reaches `trackFor` only through the `empty` argument; the mechanism never calls `isEmpty` for a caller"*) | **CARRIED — and it is the clause that makes this unit the CALLER** (`§7a` item 6): this unit calls `isEmpty` itself, exactly once per revealed zone | §2.3 items 2/6, `§3.3 I-4`, `§7a.1` item 6 |
| **`U-PROJ` (`D4`, `DONE`) — the other half of `SCH-8`** | **NOT THIS UNIT — and NOT a dependency.** No write map, no applier, no sink, no `setProperty`, no import, no re-expression | §1 item 4, `§2.2` (P-5), `§3.4 R-5` |
| **`U-GUTTER` (`E3`) — `createResizeController(...)` + the pure `clampToBounds`** | **NOT THIS UNIT — its successor-in-need.** It takes **the `sizes` VALUE it already injects and the token strings**, imports neither this module nor a fabricated edge, and **its geometry clause is its own** | §1 item 7, §5.3 item 9, §7 item 6, `docs/next-steps.md` row `E3` |
| **`U-GUTTER`'s SIBLING-FACING CONSEQUENCE OF THE ARCHITECT RULING (2026-09-27)** — a consumer of this record | **RECORDED, NOT A DEPENDENCY CHANGE:** **the key set is the full `zones` set REGARDLESS OF REVEAL**, so **a consumer driving geometry per KEY sees every zone and must consult its OWN reveal decision for DISPLAY** (the record's value cannot express display state — `§0A` ruling note 12's stated limit). **No import edge is created in either direction, and `U-GUTTER`'s own spec/red set/gates/geometry clause remain its own** | §0A ruling note 11/12, §1 item 7 (the sibling-facing note), §7 item 14, `docs/next-steps.md` row `E3` |
| **`U-RELOCATE` (`E4`)** | **NOT THIS UNIT** — and **its REVEAL-SET SEMANTICS are the CONSUMER-SIDE COUNTERPART of this unit's ruled `C-C`/`C-A` split, NOT a competing rule**: the reveal set is **the consumer's own state** (this unit merely **reflects the decision it is handed** through `revealed`), so **neither unit overrides, duplicates or re-derives the other's reveal semantics** | §0A ruling note 11, §1 item 7 (the sibling-facing note), §7 item 14, `§1` item 10 |
| **`U-RELOCATE` / `U-CONTAINER` / `U-THEME` / `U-GSESSION` / `U-MOUNTGUARD` / `U-LISTHOST` / `U-SLOTHOST`** | **NOT THIS UNIT** — no duplication of any sibling responsibility | §1 item 10, `§3.4 R-5` |
| **The geometry clause (A-d4)** | **DISCHARGED as this unit's own clause**: §2.5 + `I-8` + `R-6` + §5.2's refused `[U]` row | §2.5, `§3.3 I-8`, `§3.4 R-6`, §5.2, §7 item 6 |
| **`H-r8` / `S-d8`'s six prohibitions** | **DISCHARGED as `§2.2`'s six-row assertion table**, with the static rows **ENUMERATED** at `§3.4` | §2.2, §3.4 |
| **`H-r17`** (*"a dashboard/toolbar use case changes NO zone/track contract … with no zone vocabulary anywhere"*) | **CARRIED** — this unit owns the census half **and still carries no vocabulary literal** | §0 ruling 7, §2.2 (P-1), §7 item 4 |
| **`H-r5` / `S-d3`** (no shim expansion) | **INHERITED-ONLY** — this unit touches no shim and needs no member | §0 ruling 8, §2.2 (P-6), `§3.4 R-7` |
| **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** + **`UI-RENDERED-WITH-PROVIDENT`** | **CARRIED** — a mechanism is outside the constraint because it is not a UI element; this unit authors no content | §0 ruling 11, §2.2 (P-2), §7 item 5 |
| **`RK-19`** (geometry "proved" from a node-green — the recurring false-green class) | **CARRIED as the clause this unit exists to prevent** | §2.5, `I-8`, `R-6`, §5.2, §6 |
| **`A-d2`/`U-ENGINE-PIN`** (the engine pin) | **SPENT / NOT THIS UNIT** — no dependency (the module imports only its predecessor) | §0 ruling 9, §1 item 8, `§3.4 R-1` |
| **`A-d3`/`S-d9` and the adopted `U-GSESSION` session** | **NOT THIS UNIT — and NOT a dependency of it.** The filing **looked and found no edge**; a later pass asserting one would be a fabricated dependency | §0 ruling 10, §1 item 8, §7 item 8 |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (gate 11's mandatory typed register for CODE-BEARING units) | **DISCHARGED BY THIS FILING — `§5.5.1`** is `U-CENSUS`'s register: **`8` typed rows**, **`248` attempts** printed **with their terms**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no fourth leg**, seed `20260927`, caps `≤100`/row · `≤400` total · stop-after-5. **The read-only PBT audit is OWED to this unit's adversarial pass** | §5.5, §5.5.1, §5.3 items 10/11, §4.2 item 2 |
| **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the total is printed with its per-row terms (**`68+36+24+14+30+10+30+36 = 248`**) **and added term by term before filing**; the one figure this pass could NOT verify (`S-CN-SEED-1`'s draw sequence) is **deliberately reported as an execution record rather than asserted**; and **a total that is not the sum of its own terms is a review finding** | §5.5.1's Attempt-arithmetic block, `P-CN-TP-1`'s arithmetic-honesty clause, §5.3 item 11, §7 item 12 |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-11` is the probe** | §1 item 10, `§3.5 R-11`, §7 item 9 |
| **`docs/next-steps.md`'s `## OPEN` row `E2`** | **Its spec cell is discharged by this filing; the row stays `BLOCKED`** (blocked on the wave-E go-ahead and its own red set). **Its ordering cell (`then U-ZONES`) is SPENT — the predecessor is `DONE`** | §4.5, §1 item 7 |
| **`docs/next-steps.md`'s `## OPEN` row `E3` (`U-GUTTER`)** | **NOT THIS UNIT — but this unit is one of ITS two dependencies.** The other is `U-GSESSION` | §1 item 7, §5.3 item 9 |
| **`docs/pending.md` §H's `ADV-ZN-3`/`ADV-ZN-6` residues** | **NOT THIS UNIT** — both are **TestWriter-owned** rows on `tests/zones.test.ts`, a file in this unit's **DENIED** set | §5.1 (the denied set), §5.3 item 9 |
| **The `SCH-8` row's pre-amendment acceptance line** (*"the `computeTrackVars(census, …)` half is absent"*) | **SUPERSEDED BY A-d4** — that half is **this unit**, adopted, not refiled | §0 rulings 1/2, §1 item 1 |
| **`§3a`'s adversarial seed set (`A-*`)** | **OWED — `NOT RUN`**: this is the spec-filing pass and there is **no green to review** (RCA-3 runs *after* a unit's green). **Every `A-*` row is a QUESTION for that pass, not a finding** | §3a |
| **`§3b`'s disposition table** | **OWED — empty by construction**; its status vocabulary is fixed here so an appended findings block needs no renumbering and no new section | §3b |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates **one new spec file** and edits **no existing document** — **no tracker row is touched, no
sibling spec is annotated, and no citation is repointed.** **`docs/next-steps.md`'s `E2` row therefore
still reads its spec cell as `OWED — not filed` and `docs/pending.md` §B's `SCH-8` row still reads
`docs/specs/census.md` as *"still `OWED — not filed`"* until the supervisor's reconciliation pass flips
them** — recorded here so the staleness is **attributable** rather than silent. **This pass ran no test,
no leg and no trio, edited exactly ONE file, and made no commit** (`RCA-8`: the new file is untracked and
must be committed by the supervisor).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **NOTHING may be added after `§3b` as a new top-level section.** A later pass appends
**inside** `§3a`/`§3b` or inside an existing section; **no section number moves, nothing is renumbered,
and the `§5.3 → §5.5` gap (no `§5.4`, no `§5.5.0`) stays exactly as recorded**, because **renaming is
forbidden for citation stability** (both numbers are cited across the trackers and in four sibling
specs).

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-CENSUS`** — this is the spec-filing pass;
the unit is `BLOCKED` on the wave-E go-ahead and on its own red set, **so there is no green to review**
(RCA-3 runs *after* a unit's green: *"after each unit's green, a read-only adversarial sub-agent (edge
cases / unauthorized access / malformed inputs) must run before the unit is reported done"*). **Every row
below is a QUESTION for that pass, not a finding, and none may be cited as one.** The pass is
**READ-ONLY** (it changes no `tests/**` and no `src/**`), it **must also perform the gate-11 read-only
PBT audit** of `§5.5.1`'s executed tables — **including the pool-versus-boundary check, and including
the `S-CN-SEED-1` draw accounting this filing deliberately did NOT assert** — and **its findings are
recorded in `§3b` and fixed here (host findings) with regression rows — never in `docs/defects.md` for a
host finding** (`R13-HOST-FIX`'s precedent); **a genuine `provident-ssr` package defect would go to
`docs/defects.md` + `docs/HANDOFF.md` and the package is NEVER patched.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **The `zones`-shape probe, exhaustively:** a record, `Object.create(null)`, an array, a `Set`, a **`Map`** (do its KEYS and never its values appear?), an own-callable-`Symbol.iterator` object, an own-`Symbol.iterator` **non-callable** value, an iterator that **throws mid-iteration**, a string, a number, `null`, `undefined`, a function. **Does each give the DECLARED key set, and is the `Map`-keys reading the one implemented?** | `[T]` |
| **`A-2`** | **Is `revealed` REALLY the consumer's decision?** A truthy/falsy/absent/non-callable/**throwing** predicate over the same `zones`: **do the key sets differ as declared — and does any `undefined`/absent path reveal anything at all?** **A module with a built-in reveal, or with an `undefined`-means-visible fallback, FAILS.** | `[T]` |
| **`A-3`** | **The `sizes` probe:** a record, `Object.create(null)`, a callable taking `(zoneId, census)`, a callable that throws, a record whose own accessor throws, a **missing** entry — **does every unusable form land on the caller's `emptyToken` through the delegate, and is `sizes` called exactly once per revealed zone?** | `[T]` |
| **`A-4`** | **The no-spec / no-size completeness probe:** a zone with no `specOf` entry, with no `sizes` entry, with neither, and with a MALFORMED spec entry — **is the key PRESENT in every case (never omitted), is the value `''` for the spec cases and the `emptyToken` for the size cases, and is any reason/code vocabulary silently introduced?** | `[T]` |
| **`A-5`** | **The key-set equality probe:** for a non-empty `zones` with a mix of revealed, unrevealed, spec-less and size-less zones — **is `Object.keys(record)` exactly the enumerated set, in first-seen order, with no extra key?** **An implementation that emits only zones with a token FAILS.** | `[T]` |
| **`A-6`** | **The duplicate/`Symbol` probe:** `['a','b','a']`, `[1,'1']`, `[Symbol('s'),'a']`, a `Map` with a repeated key — **one key per distinct member, at the first-seen position, with the declared value; and is the `Symbol` member dropped WITHOUT being stringified?** | `[T]` |
| **`A-7`** | **The census-mutation + retention probe:** a plain census, a frozen census, a `Map` census, a census with a throwing own accessor, and a `Proxy` census — **after the call: own keys, values (by `Object.is`, `-0`/`NaN` included), prototype, frozen-ness, own descriptors and `Map` size/entries all unchanged, no key written, no sentinel/default written; then the same call twice more with a DIFFERENT census in between — identical results (no cache)?** | `[T]` |
| **`A-8`** | **The delegation probe (the ledger's one-authority clause):** with SPIES on the delegate — **is `isEmpty` called exactly once per revealed zone with `(census, zoneId)` in that order, is its boolean passed to `trackFor`'s THIRD argument unmodified, is `trackFor` called exactly once per revealed zone with `(spec, size, empty)`, is the returned string byte-identical to the record's value, and are BOTH called ZERO times for non-revealed zones and when `revealed` is absent?** **A module that reads the census itself, or formats a token itself, FAILS.** | `[T]` + static (`R-1`) |
| **`A-9`** | **The vocabulary probe — and its own collision.** Does the module's source (incl. comments), or the unit's controlled fixture corpora, carry any zone/pane/tab/region/track vocabulary token or the `'0px'`/`'fit-content'` literal **as a module constant** — raw, **token-assembled**, or **in a comment**? **The collision to resolve explicitly: this spec's prose MUST carry the spellings, while the module must not** — is the scan's scope exactly `R-3`'s (whole module file incl. comments for the vocabulary half; code with comments stripped for the literal half)? | static |
| **`A-10`** | **The content-authoring probe:** does the module emit any text it did not receive — a label, a unit the caller did not supply, a separator, a `'calc('` wrapper, a `''`-substitution for a caller value? **Any positive is a prohibition-2/3 finding** (the `C-C` absent-decision `''` is the ONE legal site). | static + `[T]` |
| **`A-11`** | **The static/unauthorized-access sweep:** `document`/`window`/`globalThis`-rooted access/`matchMedia`/`getComputedStyle`/`Date`/`Math.random`/`process.env`/`node:*`/`eval`/`new Function`/`import(...)`, any assembled or aliased realm route; **any mutable module-level binding**; **any store, cache, memo, `WeakMap` or `Map`** at module scope. | static |
| **`A-12`** | **The five-seam sweep:** any new tool / resource / group / `VALID_GROUPS` member / `RpcMethod` member / `MUTATING_METHODS` entry / IPC method — **asserted by SET EQUALITY AGAINST THE NAMES, never by a bare count** (`R-7`, `§4.4 S-3`). | static |
| **`A-13`** | **The signature/export probe:** is `computeTrackVars.length === 5` with the five parameters in the ledger's order; is the runtime export set **exactly** `{computeTrackVars}`; and are the doc-level aliases `SizeLookup`/`SpecLookup` **absent from the module** (and the type names `ZoneId`/`TrackVars` present)? **Is there NO options object, rest parameter or default-valued parameter?** | `[T]` + static + leg 4 |
| **`A-14`** | **The cross-unit boundary:** does this unit duplicate a `U-ZONES` responsibility (any token limb, any census semantics), a `U-PROJ` responsibility (a write map, an applier, a sink), a `U-GUTTER`/`U-RELOCATE`/`U-CONTAINER`/`U-THEME`/`U-GSESSION`/`U-MOUNTGUARD` responsibility, or a list/slot host's? **Duplication is a FINDING.** | static + `[T]` |
| **`A-15`** | **The `U-GUTTER` handoff probe:** can `U-GUTTER` get what it needs from this unit **without importing it** — i.e. are the tokens this unit returns sufficient for its geometry clause's *input*, while its `sizes` remain ITS OWN injected values? **A claimed import edge in either direction is a fabricated dependency and a FINDING** (`H-r6`). | static + the delegate clause |
| **`A-16`** | **THE GEOMETRY PROBE:** does any row, in the module or in the test file, assert or claim a **rendered-geometry, CSS-validity, layout or paint** property — or does any pass report this unit's green as geometry evidence (including as input to `U-GUTTER`'s geometry clause)? **Any positive is an A-d4 clause violation and an `RK-19`-class false green.** | static + the DONE row |
| **`A-17`** | **The register's own audit (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the `248` total**? Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form what the test file actually contains? **Is every pool/table member consistent with its row's declared boundary** (`§5.5.1`'s POOL-VERSUS-BOUNDARY RULE) — and **what is `P-CN-TP-1`'s MEASURED distinct-member draw count** (the figure this filing deliberately did not assert)? **Any mismatch between the spec's arithmetic and the file's tables is a SPEC FINDING** (`§5.3` items 10/11). | `[T]` + the test file |
| **`A-18`** | **The layer-honesty probe:** does the DONE row (or any pass's prose) claim **assembled-app, CSS-validity, applied-length or rendered-geometry** evidence from this unit's `[T]` green — and does it state, explicitly, that the module is **imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**? | the DONE row |
| **`A-19`** | **The `V-13` closure probe:** reading the landed module, **is there ANY second authority over emptiness or over tokens** — a census read in this module, a token limb formatted here, a key set derived from anything other than `zones`, or a `revealed` policy? **Any positive means the finding A-d4 says these rows ANSWER is not in fact answered.** | static + `[T]` |
| **`A-20`** | **The tracker/handoff probe:** does the DONE row state `U-GUTTER`'s unblock correctly (its **two** dependencies, `U-CENSUS` and `U-GSESSION`, with no fabricated edge), and does it leave `docs/pending.md` §H's `ADV-ZN-3`/`ADV-ZN-6` residues **with their own owner** rather than absorbing them into this unit's file? | the DONE row |
| **`A-21`** | **THE ARCHITECT-RULING PROBE (`§0A` ruling notes 11/12, added by the 2026-09-27 annotation pass):** with a CALLABLE `revealed` that declines zone `z` — **is `z` still in `Object.keys(record)` (set equality against the `zones` set), is `z`'s value EXACTLY `''` and NOT a token and NOT the caller's `emptyToken`, is `trackFor` provably UNCALLED for `z`, and does an implementation that OMITS `z` FAIL the key-set row while one that EMITS A TOKEN for `z` FAILS the reveal row?** **And the boundary probe the ruling fixes: does an ABSENT/non-callable/throwing `revealed` give the EMPTY record (`F-2`) rather than a record with `''` keys — i.e. is the DECLINED case never conflated with the NO-DECISION case?** **Any positive on the omit/conflate/token/default halves is a `BLOCKING — SCOPE`-class finding against the ruled contract.** | `[T]` |

**The seed set's own status, stated so it is not misread: `A-1`..`A-21` are ALL `OWED`** — the pass runs
after the green, and **a DONE row that cites no adversarial pass (or whose findings are unrecorded) is a
review finding** (`AGENTS.md` RCA-3). **⟶ ANNOTATION (2026-09-27): `A-21` is the ONE seed ADDED by the
architect-ruling annotation pass** (`§0A` ruling notes 11/12) — **it exists because the ruling's five
falsifiers and its one stated limit are the exact class of edge case this pass hunts, and because the
ruling fixes a boundary (`F-2` vs `M-4`) that a later implementer could otherwise conflate. It is a
QUESTION for the adversarial pass like every other seed, NOT a finding, and it changes no `§3` row, no
register row, no attempt term and no `YES` marking.**

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
| **BLOCKING — SCOPE** | `A-14`/`A-15`/`A-16`/`A-9` returning positive: **the unit does not land** until the scope violation is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; **the package is NEVER patched** |
| **PARKED-with-revisit-condition** | recorded, not fixed, with the condition that would reopen it and its owner |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3). **An appended findings
row must cite, at minimum: the seed id (`A-*`), the finding's severity, its disposition from the table
above, its owner, and the clause (`§`-section + row id) it changed or left unchanged.** **Nothing in this
table may renumber `§6`/`§7`/`§8` or add a top-level section after this one** (the file-end note above
says the same).
