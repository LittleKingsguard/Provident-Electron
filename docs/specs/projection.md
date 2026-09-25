# Spec — `U-PROJ`: the pure projection + **total** applier (`SCH-8`'s projection half)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-PROJ`**, the **projection half** of
`SCH-8` `LAYOUT-STATE-PROJECTION`; **`U-CENSUS` is a SEPARATE unit and stays in wave E**). **The unit
has NOT run: nothing here is implemented, no red set has been authored and no leg has been run by
this pass.** This pass files the contract.
**⟶ STATUS NOTE — 2026-09-27, THE `U-MOUNTGUARD` DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN.** The
architect **GAVE the wave-D go-ahead (2026-09-27)** and **`U-MOUNTGUARD` is `DONE`** (the ledger's
**FOURTH `DONE` row**; the counts are **`4 DONE / 16 open`**). **This is a STATUS/ANNOTATION note: it
amends no normative clause, adds no row and moves no section number — in particular it does NOT touch the
four ruling notes in §0A or any of the `CORRECTED`/approved cells they carry.** **What it supersedes, in
its STATUS half only:** the go-ahead paragraph below (and §0 **ruling 8**, §0 **ruling 9**'s closing
sentence *"the go-ahead of ruling 8 is still absent"*, §4.5, §7 item 1), whose *"BLOCKED on the
architect's go-ahead … Wave D is authorised by no ruling currently on the record … the go-ahead of ruling
8 is still absent … RED SET OWED — NOT AUTHORED, NOT RUN"* clauses are **kept visible and are the filing
and ruling passes' state**. **What it does NOT change:** `AGENTS.md` item 9 still binds (delegable only
once the red set is **RUN and REPORTED**), and the **wave-D order is unskipped** — `U-MOUNTGUARD`
(`DONE`) → `U-LISTHOST` → `U-SLOTHOST` → **this unit (`U-PROJ`), which lands LAST** — so this unit's
ordering precondition is `U-SLOTHOST`, not the go-ahead. **Its exact next action: `TestWriter red` RUN
and REPORTED → green → adversarial → blind greens → legs → documentation review → DONE**, with
`docs/next-steps.md` `## OPEN` row **`D4`** the queue pointer. **The four rulings in §0A are untouched and
still bind** (`A-11` reuse, `A-2`/`F-4` `'accessor-threw'`, `A-3` `Object.create(null)`, `A-7`
re-entrancy).

**Go-ahead state — stated plainly: this unit is BLOCKED on two things only — the architect's go-ahead
for the wave-D plan, and its own red set.** *(The two-argument projection signature was formerly listed
here as a third, OPEN item; **it is no longer open — the architect APPROVED the correction
`project(values, specOf)` on 2026-09-27** (this file's §0 ruling 1 annotation, §7 item 5 and §8's
approved row; `docs/decisions.md`'s `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row; the gate record's
dated ruling note). The go-ahead and the red set remain the blockers, unchanged.)* The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**.
Wave **D** is authorised by no ruling currently on the record, so this unit's red set may not be RUN
and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET OWED — NOT
AUTHORED, NOT RUN** (RCA-1). **Ordering obligation from its queue row: it lands last in wave D,
after `U-SLOTHOST`** (the amendment's appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** —
*"`U-MOUNTGUARD` → `U-LISTHOST` → `U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row
**D4**'s `Blocked on` cell). Source of this unit: that amendment record's §2.2 `SCH-8` row (**BOTH
halves adopted; the `computeTrackVars` refile is WITHDRAWN** under A-d4 — **but the census half is
`U-CENSUS`'s, wave E, and is NOT this unit's**), §1.2 (`U-CENSUS` — kept separate here on purpose),
the amended unit plan's **`U5`** row (the projection-half bullet list, provenance), §2.1/§3 (the unit
list, wave D, the checkpoint rule), §1.5 + `H-r17` (the "dashboard/toolbar use case changes NO
zone/track contract" clause: *"`U-PROJ` still takes an injected write sink and consumer-supplied
variable names/units … **with no zone vocabulary anywhere**"*), the §"Per-unit equivalence limits",
"Adopted units' security / equivalence obligations" and "no new MCP surface" rows, `H-r8` (the six
prohibitions), and `docs/next-steps.md`'s `## OPEN` row **D4** (spec cell `docs/specs/projection.md` —
**OWED — not filed**; this file is that filing).

**The 2026-09-27 ruling pack — stated here so a reader meets it before §0's table: the FOUR contract
inputs this filing left UNRULED (§7 item 8) are now RULED, and ZERO remain unruled.** `A-11` (a
`Projection` is **reusable** — a value, not a session → `I-11`) · `A-2`/`F-4` (a **throwing value
accessor** is **skipped and recorded**, never propagated → the **EIGHTH** `ProjectionSkipReason`
member, `'accessor-threw'`, so the vocabulary is now **eight contract diagnostics**) · `A-3` (the
**prototype-pollution-shaped key**: `Projection.applied` and every internal key→value map are built on
**`Object.create(null)`** → §2.5) · `A-7` (**sink re-entrancy is NOT guarded**; the projection is
**immutable input** to the applier) — see **§0A's dated ruling notes** and §0 ruling 9. **The rulings
advance no unit status: no code, no red set, go-ahead of ruling 8 still absent (§4.5).**

## 0. The rulings this unit derives from (recorded, NOT re-opened — with ONE CORRECTION APPROVED) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-8` is adopted as TWO units and this is the projection half only:** *"Adopt `project(values) → record` + a **total applier** (every input yields a write-or-skip decision, never a throw, never a partial write) taking an **injected write sink** (the consumer's root), so the mechanism owns **no root and no store**."* **[the quoted `project(values)` form is the plan's as-filed text, `SUPERSEDED`: **the architect has APPROVED the two-argument correction — the signature is `project(values, specOf)` (ruling dated 2026-09-27; recorded in this file's §7 item 5 and §8's `CORRECTED`/approved row, and as the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in `docs/decisions.md`)**; see §2.1. The quote is kept verbatim so the source and its correction stay auditable.]** **`U-CENSUS` (the `computeTrackVars(zones, census, sizes, revealed, specOf)` half — note it too threads a caller `specOf`) is SEPARATE and stays in wave E** (`docs/next-steps.md`'s `## OPEN` row **E2**; §1.2). | §1, §2 |
| **2** | **The acceptance lines are binding:** **purity** (same input ⇒ same output, no environment read) · **totality** over malformed/partial input · **the `computeTrackVars(census, …)` half is ABSENT** (census is app data — `SCH-4`'s concern) · **one write per commit**. | §2.4, §3, §5.2, §6 |
| **3** | **Variable names and units come from the CONSUMER'S SUPPLIED SPEC** — `(C)#1`-clean. There is **no built-in variable name, no built-in unit, and no built-in token literal**, and **no zone vocabulary anywhere** (`H-r17`). | §2.1, §2.2 (prohibitions 1/3), §7 item 4 |
| **4** | **The applier DECLARES nothing and OWNS nothing**: an **injected write sink** is the only environment reading, and the mechanism **owns no root and no store**. | §2.3, §2.1 (`applyProjection`) |
| **5** | **The `U-ZONES`/`U-CENSUS` delegation boundary is NOT this unit's to cross.** The **token-formatting authority is `U-ZONES`** for the **census family** (§1.1/§1.2: *"delegating token formatting to `U-ZONES` (one authority, not two)"*), and **`U-PROJ` must not import `U-ZONES`, `U-CENSUS`, or any zone/track module.** This unit formats **only** what the consumer's own `VarSpec` tells it to, and the contract makes that spec **data**, never a function it delegates to. | §2.1 (`VarSpec`), §2.4, §6 |
| **6** | **`H-r17`'s consequence, quoted because it names this unit:** *"A dashboard/toolbar use case changes NO zone/track contract: `U-PROJ` still takes an injected write sink and consumer-supplied variable names/units, so a dashboard's custom properties are projected by the consumer's data through the repo's pure applier, **with no zone vocabulary anywhere**."* | §1, §2.2, §7 item 4 |
| **7** | **No new MCP surface, no store, no persistence, no CSP change** (the amendment's obligations table): every adopted mechanism is renderer/host-resident module code — no `src/main/**`, no `electron`, no `node:fs`, no RPC types import; **no adopted unit persists anything**. | §2.2 (prohibitions 4/5), §5.1 |
| **8** | **The go-ahead for wave D does not exist yet**, and within wave D this unit lands **last**. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the as-written cell is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`, so the surviving blockers are the wave-D order (this unit lands LAST, after `U-SLOTHOST`) and its OWN RED SET.** | this status block, §4.5, §7 item 1 |
| **9** | **THE 2026-09-27 RULING PACK (architect) — the FOUR previously UNRULED contract inputs of §7 item 8 are now RULED; ZERO remain unruled.** **(a) `A-11` — a `Projection` is REUSABLE** (a value, not a session: no consumption, no per-projection state; every call is equivalent to a first call with that value) ⇒ **new invariant `I-11`** + §2.3. **(b) `A-2`/`F-4` — a THROWING VALUE ACCESSOR is SKIPPED and RECORDED by the projection, NEVER propagated** ⇒ **`ProjectionSkipReason` 7 → 8 members (the new member `'accessor-threw'`)** + `F-4` split into `F-4A`/`F-4B` + `F-12`. **(c) `A-3` — the prototype-pollution-shaped key: `Projection.applied` (and any internal key→value map) is built on `Object.create(null)`** ⇒ §2.5 (the analysis + the alternatives rejected) + `I-12`/`I-13` + `F-13`/`M-18`/`M-19`/`M-20`. **(d) `A-7` — sink RE-ENTRANCY: NOT GUARDED; the projection is IMMUTABLE INPUT to the applier** ⇒ §2.3 item 8 + `I-11`/`I-14` + `M-21`/`M-22` + `F-14`/`F-15`; a consumer wanting different writes builds a **NEW** projection. **None of the four advances the unit's status** (§4.5): no code, no red set, and the go-ahead of ruling 8 is still absent. **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the clause is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27), so this sentence's surviving truth is *"no code and no red set"* — the four rulings still advance no status by themselves, and the unit remains blocked on its own red set.** | §0A (the dated notes), §1, §2.3, §2.5, §3.2, §3.3, §7 items 7/8, §8 |

## 0A. The dated ruling notes — **the 2026-09-27 ruling pack (architect): the four UNRULED inputs are RULED**

**What this section is, and what it is not.** §7 item 8 recorded **FOUR** contract inputs this filing
**left UNRULED on purpose** rather than inventing an answer (`A-2`/`F-4`'s throwing getter, `A-11`,
`A-3`, `A-7`). **The architect has now ruled all four (2026-09-27).** These notes record each ruling
with the clause that carries it. **They advance no unit status**: nothing here is implemented, no red
set is authored or run, and §4.5's delegation gate is unchanged — `U-PROJ` is still `BLOCKED` on the
wave-D go-ahead (§0 ruling 8) and on its own red set. **Every superseded sentence stays visible in
place and is marked `SUPERSEDED`** (this file's citation-and-supersede convention, `H-r1`).

### Ruling note 1 — **`A-11` (2026-09-27): a `Projection` is REUSABLE — it is a VALUE, not a session**

**The ruling:** *the same projection object may be passed to `applyProjection` repeatedly — to the same
sink or different sinks — with independent results; no consumption, no per-projection state. Every call
must be equivalent to a FIRST call with that value.*

**It follows from ruling 4 (`A-7`, note 4 below) and must be consistent with `I-5`/`I-8`:** the applier
**retains no reference** to its projection (`I-5` — no aliasing, no store) and **every returned record
is fresh** (`I-8` — a caller mutating one result cannot change another), so **there is nothing to
consume and nowhere for per-projection state to live**. Reuse is therefore **structural**, not a
promise: a second `applyProjection(p, sink2)` cannot see that `p` was ever used.

**What this note pins, and where:** the **new invariant `I-11`** (§3.3 — the load-bearing clause, since
`A-11` is a cross-state property); **§2.3's write-or-skip rules** (item 1 gains the reuse sentence: the
rules read the projection as an **input**, never as a cursor); **§1 item 3's split table** (the
`applyProjection` column's "Owns: nothing" row already said it — the ruling makes it falsifiable by a
row); and the **rows** `M-21` (reuse across two sinks) and `M-22` (reuse into the same sink twice, with
the write log still recording exactly the writes of the current call). **`ApplyResult` is call-local**:
`ok` reflects **only** the call that produced it (§3.1 `M-15`), so two calls over one projection yield
**two independent `ApplyResult`s**.

### Ruling note 2 — **`A-2`/`F-4` (2026-09-27): the THROWING VALUE ACCESSOR is SKIPPED and RECORDED — NEVER propagated**

**The ruling:** *when reading a value throws (a hostile or absent accessor), the projection **catches
per key**, **records that key as a skip**, and **continues**; one bad key never aborts a projection.*

**The principle it follows, already pinned in this spec for the other half:** a throwing `setProperty`
does not abort the run (§2.3 item 3) — the applier continues, reports each failure individually, and
the caller sees exactly which keys did not land. **The projection is now symmetric with the applier:
`one key, one decision`, and a failure of the *environment* (an accessor that throws, a sink that
refuses) is a **recorded skip**, never an abort and never a propagated throw** (ruling 2's totality
acceptance line, `I-7`).

**THE CHOICE — an EIGHTH member of the closed union, and this spec states plainly that it CHANGES A
CLOSED UNION.** `ProjectionSkipReason` gains **`'accessor-threw'`** (**7 → 8 members**), with its
diagnostic sentence: *"the value's accessor threw while it was being read; the key was skipped and the
projection continued."* **The rejected alternative, and why it is rejected:** **reusing
`'not-a-number'` would SILENTLY CONFLATE two different facts** — *"the value is not a number"* (the
caller's data is the wrong type, which the caller can fix by passing a number) versus *"we could not
read the value at all"* (the caller's **accessor** is hostile or broken, which the caller fixes
somewhere else entirely). That distinction is **information the consumer cannot recover from
`not-a-number`**, and a skip vocabulary exists precisely to hand the consumer recoverable information.
**A closed union is allowed to grow by ruling** — what it may not do is **misreport**: the honest move
is a new member, not a false diagnosis inside an existing one.

**What this note pins, and where (the full recount, so no later pass has to hunt for one):**

| Place | Was | Is |
| --- | --- | --- |
| §2.1, the `ProjectionSkipReason` union | **seven** members | **EIGHT** members — `'accessor-threw'` added, with its own comment |
| §2.2, prohibition 1's string-union count | *"`ProjectionSkipReason` (**seven** contract diagnostics)"* | *"`ProjectionSkipReason` (**eight** contract diagnostics)"* — **⟶ SUPERSEDED: seven → eight (2026-09-27, ruling note 2)** |
| §2.4 item 3, the fixed skip-reason **precedence** | `malformed-spec` → `duplicate-name` → `missing-value` → `not-a-number` → `negative` | the same five, **plus** `accessor-threw`, positioned **where the read happens** — i.e. the read is attempted **once**, and an accessor throw yields `accessor-threw` **in place of** `missing-value`/`not-a-number` (the key was *present* to the lookup and the *read* failed) |
| §3.2 `F-4` | one row: *"`not-a-number` — the whole class"*, with the throwing getter inside it and the behaviour **unpinned** | **SPLIT**: **`F-4A`** (the plain non-numeric inputs keep `not-a-number`) + **`F-4B`** (**the throwing accessor gets its own reason `accessor-threw`**) |
| §3.2 (new) | — | **`F-12`**: the throwing-accessor fail-state as a **row in its own right** (per-key catch, the projection continues, `applied` still carries the good keys, no throw out of `project`) |
| §7 item 8 | FOUR unruled seeds | **ZERO unruled** — `F-4`'s getter is ruled here |
| §8's `RK-10` index row | *"ten recorded contract decisions and **four** deliberately-unruled seeds"* | *"ten recorded contract decisions and **zero** unruled seeds"* |

**THE OPERATIONAL NOTE, recorded as a REQUIREMENT (the architect's words, in substance):** *downstream
code must inspect the result's skip record.* **A consumer that only checks a value's PRESENCE will not
see a skipped key** — presence is not the contract; the **skip record** is. Stated plainly so the two
halves are not confused: **the projection reports INTENT** (`Projection.applied` = *what must be
written*, `Projection.skipped` = *what must not be written, and why*), whereas **the applier's
`ApplyResult` is what a caller checks** — `ok` and `skipped` describe **what actually landed**. **A
caller must read `ApplyResult.skipped` to know what did not land**, and must read
`Projection.skipped` to know **why** a key was never attempted. Neither record may be replaced by a
presence test (`key in applied` / a truthiness check on a value), because a key can be **present in
the caller's `values` and still skipped**, and a key can be **absent from the sink after a call that
reported `ok === false`**.

### Ruling note 3 — **`A-3` (2026-09-27): the prototype-pollution-shaped key — the ANALYSIS, and the ruling: `Object.create(null)`**

**The question, exactly.** A caller-supplied `VarSpec.name` can be **any string** — **the contract does
not require it to be a CSS-legal custom-property name**, and this unit **may not invent a name-legality
rule** (names are **caller data**, §2.2; rulings 3/5). Therefore `'__proto__'`, `'constructor'`,
`'prototype'`, `'toString'` and `'hasOwnProperty'` are all **reachable** both as keys of the returned
`Projection.applied` record and as keys of any internal per-key map the implementation keeps.

**The mechanism, spelled out so the finding is not a slogan.** On a plain-object literal,
`applied['__proto__'] = 'x'` **does not create an own property**: the assignment reaches
**`Object.prototype`'s `__proto__` accessor** and **silently changes the record's prototype** (to
`'x'`'s — here, a `TypeError`-free no-op, since a string is not an object, which is worse: it fails
**silently**). Consequences, all measured facts rather than speculation:

- the key **does not appear in `Object.keys(applied)`** — so **`I-1`'s partition BREAKS**: the spec
  entry is in **neither** `applied` **nor** `skipped`, and a key vanished inside a contract that
  promises it cannot;
- write order (`§2.3` item 6, `M-6`/`M-5`) **silently loses a key**;
- and the projection **still reports `ok`/no-skip for that key while being wrong about it** — the
  false-green class, inside a mechanism whose whole acceptance line is **totality**;
- the **same hazard exists in the duplicate-detection pass**: a lookup table built as a plain object
  and read as `seen[name]` will, for `name === 'constructor'`, read
  **`Object.prototype.constructor`** — a **truthy inherited value that was never written** — so **a
  non-duplicate key is misdiagnosed as `duplicate-name`** (and `'toString'`/`'hasOwnProperty'` likewise
  hand back inherited functions);
- and the hazard is **not only in the write direction**: a **plain-object `values`** returns an
  **inherited value** for such a key, so a spec naming `'constructor'` can be **applied with a string
  the caller never supplied** instead of being skipped `missing-value`.

**THE RULING (adopted, as recommended — and this filing's own reading agrees with it):**
**`Projection.applied` — and any internal key→value map — is built on a NULL-PROTOTYPE object
(`Object.create(null)`).** Every key lookup on caller-supplied data is an **own-property** lookup
(`Object.prototype.hasOwnProperty.call(obj, name)`-equivalent semantics), never a prototype-chain read.
The four reasons, kept as the ruling's own justification:

1. **It costs nothing** — `Object.create(null)` instead of `{}` is one expression, no new dependency,
   no new policy, no new branch.
2. **It is TOTAL** — it covers **every** dangerous key, **including ones nobody enumerated**
   (`'valueOf'`, `'__defineGetter__'`, and every key a later JS engine adds to `Object.prototype`),
   which is exactly this unit's **totality acceptance line** (ruling 2) applied to the record itself.
   An enumerated **denylist** would be a **partial** answer to a total requirement.
3. **It needs NO new skip reason and NO name-legality policy** — the caller's authority over names is
   **intact**: **the unit may not invent a name-legality rule**, because names are caller data (§2.2),
   and a rejected/renamed key would be the unit **editing caller data** (prohibition 2/3).
4. **It is verifiable by ONE row** — a projection whose spec names `'__proto__'` produces an **own key
   `'__proto__'`**, never a mutated prototype, and `I-1`'s partition still holds (`F-13`).

**Alternatives this filing rejected, each with its reason** (recorded so the ruling is auditable and a
later pass does not re-derive it):

| Rejected alternative | Why it is rejected |
| --- | --- |
| **Plain object literal `{}` (status quo, no row)** | **Wrong today**: silently drops `'__proto__'` from `Object.keys`, mutates the record's prototype, breaks `I-1`'s partition, and misdiagnoses `'constructor'`/`'toString'` as `duplicate-name` during duplicate detection. **The false-green class; a review finding.** |
| **`Object.defineProperty(applied, name, {value, enumerable: true, …})` per key** | **Works for own keys, but is not the better rule:** it is a per-key call (more code and more ways to get the descriptor wrong — a forgotten `enumerable: true` silently hides the key from `Object.keys`, re-breaking `I-1`), it does **not** fix the **duplicate-detection lookup** or the **`values` inherited-value** read, and it does not cover keys a later pass writes by plain assignment. **A `create(null)` record fixes all three by construction.** |
| **Reject / rename / skip a "dangerous" name (a denylist, or a `'malformed-name'` skip)** | **A name-legality policy this unit may not have**: `VarSpec.name` is **caller data**, so the module would be **rejecting caller data on a criterion no ruling supplies** (prohibition 3's "no built-in vocabulary", ruling 3's "no built-in name"). It is also **partial** (an enumeration) and it **loses a legitimate caller name** — a consumer is entitled to name a property `'toString'` and have it written. |
| **Return a `Map` / a `null`-prototype `Object` only for the *returned* record** | **A `Map` changes the return shape** (`Object.keys`/spread/`JSON.stringify` all change) — a different contract, needing its own gate. **Fixing only the returned record leaves the internal lookup maps** (duplicate detection, `values` reads) **polluted**, so the ruling is applied to **every** internal key→value map, not just the returned one. |

**THE CONSEQUENCES, RECORDED HONESTLY so no consumer is surprised** (each is a contract fact, not a
caveat):

1. **The returned record has NO prototype.** So: **`applied.hasOwnProperty(k)` DOES NOT EXIST** on it (a
   `TypeError`), and neither do `applied.toString()`/`applied.valueOf()`; `instanceof` is unaffected in
   substance (a null-prototype object is still an object, and was never an instance of anything
   meaningful); **`Object.hasOwn(applied, k)` / `Object.prototype.hasOwnProperty.call(applied, k)` is
   the pinned way to test membership**; and a **`toEqual`-style deep-equality helper that compares
   prototypes** will see a null-prototype actual against an object-literal expected and **must be
   written with that in mind** (a row states it explicitly rather than discovering it as a mystery
   failure).
2. **What still behaves normally, named so the consumer is not over-cautious:** **`Object.keys`**
   (own enumerable string keys), **spread** (`{...applied}` — *into a target that is itself
   null-prototype-safe, see item 3*), **`in`** (own keys answer `true`; nothing else exists to
   answer), **`JSON.stringify`** (`'__proto__'` is serialized as **data**, and re-parsing yields an
   object whose `__proto__` is handled by the **parser**, which is a separate, documented JS hazard and
   **not this module's**), **`structuredClone`**, **`Object.entries`/`Object.fromEntries`** and
   **`Object.assign`** (with a null-prototype target — item 3). **`Object.keys(applied)` still yields
   the pinned deterministic write order** (§2.3 item 6) — the ruling changes the record's
   **prototype**, never its key order.
3. **A hazard the ruling EXPOSES rather than creates, recorded because the fix is a caller-side
   obligation:** **the null prototype is destroyed by a naive copy.** `{...applied}` and
   `Object.assign({}, applied)` produce a **plain-prototype** object — and, if the source held an own
   `'__proto__'`, both **re-invoke `Object.prototype`'s `__proto__` accessor on the target** (spread
   and `Object.assign` copy own keys through `[[Set]]` on the target). **A consumer that copies the
   record MUST use a null-prototype target** (`Object.assign(Object.create(null), applied)` — or
   `Object.entries`/`Object.fromEntries` + an explicit null-prototype build). **This sentence is a
   contract obligation on the consumer, not a defect in the module**: the module returns a record
   whose keys survive, and it may not police how a caller copies it.
4. **`readonly` is a TYPE-LEVEL promise and does NOT freeze the object.** `Projection.applied`'s
   `Readonly<Record<string, string>>` **prevents TypeScript-level reassignment**; **it freezes
   nothing at runtime**, and this spec **does not require `Object.freeze`** (a frozen record is
   **permitted** — it changes no row, since the return value is treated as a value — but it is **not
   a contract clause**, and **a caller may not rely on either behaviour**). **What this spec DOES pin
   about mutation is the direction it can prove:** the applier never mutates the projection (ruling
   note 4 / `I-14`), and `I-5`/`I-8` pin that no returned record aliases module-internal state. **A
   caller mutating an `applied` record mutates its own copy of a value** — the module holds no
   reference to it.
5. **THE APPLIER NEEDS NO GUARD, and the two halves DIFFER here — stated explicitly, because the
   contrast is the point.** The applier calls **`CSSStyleDeclaration.setProperty(name, value)`** with
   a **CSS PROPERTY NAME**. In that position `'__proto__'` is an **ordinary string argument**: the DOM
   API takes a property name string, performs **no object-key assignment**, and therefore has **no
   prototype-write hazard at all**. **The record-key hazard and the CSS-property-name position are
   different objects**: the record is a **JS object keyed by caller data** (null-prototype it), while
   the sink call is a **string argument to a DOM API** (nothing to guard, and **the applier is
   explicitly NOT required to refuse, sanitize or re-name a name for either half**). A row pins the
   contrast: a projection whose spec names `'__proto__'` **is written to the sink verbatim as the
   string `'__proto__'`** (a fake sink records the exact arguments), with no refusal and no
   `sink-unusable`/`write-refused`.
6. **`skipped` is an ARRAY of `{name, reason}` records, so NO key-map hazard exists there.** An array's
   indices are engine-owned **integer** slots; the caller's `name` is a **value** (`ProjectionSkip.name`)
   and is **never used as a key of any object**. **No null-prototype requirement attaches to
   `skipped`**, and **none attaches to `ProjectionSkip`'s own two fields** (they are fixed contract
   field names, not caller data). **This is why the ruling's objects are exactly two — the returned
   `applied` record and the internal key→value maps — and no more**, and it is recorded so a later
   pass does not "complete" the ruling by rewriting `skipped` (which would be a **shape change** to a
   part of the contract `A-3` never implicated).

**What this note pins, and where:** **§2.5** (this analysis, the ruling and the consequences),
**§2.1** (the `Projection.applied` doc-comment now states the null prototype and the copy hazard),
**§3.3**'s **`I-12`** (the own-key invariant for every caller-supplied name, including `'__proto__'`)
and **`I-13`** (the null prototype itself + own-property lookup semantics), and the **rows** `F-13`
(the hazard, falsifiably), `M-18` (the `'__proto__'` name), `M-19` (own-key membership without
`hasOwnProperty`) and `M-20` (the applier-side contrast).

### Ruling note 4 — **`A-7` (2026-09-27): sink RE-ENTRANCY — SKIP it; treat the projection as IMMUTABLE input**

**The ruling, verbatim in substance:** *"skip, treat projection as non-mutable and expect consumers to
create new projection if they want changes."*

**What it pins.** The projection is **immutable INPUT to the applier**: the applier **never mutates it,
never caches into it, and never re-enters it to change it**. **A consumer wanting different writes must
build a NEW projection** (`project(values', specOf')`) — the projection is a **value**, and editing one
in place is **not a supported operation** (which is also why `A-11`'s reuse is safe: nothing consumes
and nothing mutates).

**Re-entrancy, stated as far as the invariants can prove it.** If the injected sink's `setProperty`
**re-enters `applyProjection`** (with the same or another projection), the applier's behaviour is
**call-local**, per `I-5` (no retained reference to an argument), `I-8` (every returned record fresh)
and `I-11` (**no per-projection state exists to interleave**). **Can a re-entrant call interleave
OBSERVABLY? Yes at the SINK, and NO at the contract** — recorded honestly, with the reason:

- **At the sink: yes, trivially.** The sink is the **caller's own object**, and the applier holds no
  lock over it (§2.3 item 4's "the applier owns nothing"; ruling 4 of §0). A sink that re-enters is a
  sink that **chooses** to interleave its own writes — an interleaving **of the sink's state**, which
  this module does **not** own and **may not** arbitrate.
- **At the contract: no.** Each call's `ApplyResult` remains **its own call's** write log: `I-3` pins
  *a key is in `ApplyResult.applied` **iff** `setProperty` was called with it*, and a re-entrant call
  **cannot** place a key in the **outer** result — and **cannot remove** one. The outer iteration set
  is fixed when the call reads `projection.applied` (`I-2`, §2.3 item 6's order), so a re-entrant call
  **cannot change what the outer call writes next**. `ok`/`skipped` stay call-local (`M-15`, `I-10`).
  **Write counts stay one per key per call** (§2.3 item 7): two calls ⇒ two writes, **one each** —
  which is the count the acceptance line ("one write per commit") pins, since each call **is** a
  commit.
- **The module holds NO re-entrancy guard, and that is the ruling, not an omission:** it holds **no
  module-level and no instance-level state at all** (prohibition 4; §1 item 3's "Owns nothing"; the
  §2.5-type static sweep `A-14`). **A guard would have to be state** — which is exactly what this unit
  may not have. **Adding a re-entrancy flag would be a NEW CONTRACT needing its own gate**, and it
  would make the applier non-total in a new way (a nested call would be *refused* for a reason that has
  no `ProjectionSkipReason` member).
- **Is there an ordering hazard the invariants do NOT already cover? NO — and the finding is recorded
  as `CONFIRMED-RULED`, not as an owed guard.** The one candidate is **double-writing a key on a
  shared sink** (outer writes `--a`, the re-entrant call writes `--a` too, then the outer call's
  `--a` write lands again) — but that is the **sink's own ordering choice**, it is **visible in the
  sink's own call log**, the **contract is blind to the sink's prior state by design** (§2.3 item 5,
  `I-6` — the applier never reads the sink back), and **neither `ApplyResult` over-claims**: each
  reports its own write. **No clause is weakened and no `OWED` row is raised.** **If a later pass
  contrives a case where a re-entrant call makes an `ApplyResult` report something its own call did not
  do, that is a `BLOCKING` finding against `I-3` and belongs in §3b as such — the seed `A-7` is
  discharged as RULED here, and the pass that runs after the green re-checks it against the landed
  module, not against this note.**

**What this note pins, and where:** **§2.3 item 8** (the new write-or-skip rule: immutability of the
projection + the new-projection rule + no guard + call-local re-entrancy), **§3.3**'s **`I-14`** (the
applier never mutates its projection and never re-enters it to change it) alongside **`I-11`**, and the
**rows** `M-21`/`M-22` (reuse — the `A-11` pair, whose second half is exactly "reuse is not
consumption"), **`F-14`** (a re-entrant `setProperty` ⇒ both calls' results stay call-local, no throw,
counts intact) and **`F-15`** (the caller's projection is **byte-identical** after a call — the
immutability row).

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read) — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance |

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass. **No window is booted, no IPC round-trip runs, no MCP transport is
   exercised, and no real DOM is touched.** For this unit that sentence is unusually load-bearing:
   **a `[T]` green proves the projection's ARITHMETIC and the applier's write/refuse DECISIONS, and
   proves nothing about what a browser does with the values.**
2. **The `[T]` applier is exercised against `src/shared/dom-shim.ts`'s element**, whose `style` is
   **`{ cssText: string }`** — a plain object with **no `setProperty`** (`src/shared/dom-shim.ts:9`,
   read: `style: { cssText: string } = { cssText: '' }`). **Therefore the `[T]` rows drive a
   caller-supplied FAKE sink**, not the shim element; the shim element is used only where a row needs
   a real element to carry a `style`-shaped object. **A `[T]` row must never claim that a browser
   parsed the value** — and the shim's inability to do so is exactly why the one real-DOM value row is
   a `[U]` row (§5.2).
3. **The sink is injected and the module reads no ambient global.** No `document`, no `window`, no
   `getComputedStyle`, no `matchMedia`, no `getElementById`. The module is admissible under **(B)**
   (a pure transition whose only environment reading is an injected argument) and is judged under
   **(C)'s six prohibitions**, which §2.2 asserts.

## 1. Scope

**One deliverable: a pure projection plus a total applier**, in one `src/shared` module.

1. **What the projection is, in one sentence.** A **pure function** that turns *(caller values ×
   caller spec)* into a **record of custom-property writes** — `project(values, specOf)` — computing
   and formatting every value itself and producing **no side effect of any kind**.
2. **What the applier is, in one sentence.** A **total function** — `applyProjection(projection,
   sink)` — that takes that record and an **injected write sink**, and for **every** key produces a
   **write-or-skip decision**: writes what it can, records what it skipped and why, **never throws,
   and never performs a partial write for a key it reported as applied**.
3. **What the pure/impure split is, stated crisply (this unit's whole shape):**

   | | `project(values, specOf)` | `applyProjection(projection, sink)` |
   | --- | --- | --- |
   | **Kind** | **PURE** | **IMPURE — exactly one injected sink** |
   | **Reads** | its two arguments only | its two arguments only |
   | **Writes** | **nothing** | **only** the injected sink |
   | **May throw** | **no** | **no** |
   | **Owns** | nothing | nothing (no root, no store, no registry) |

   **Nothing else is in this unit.** There is **no** third function, no state, no cache, no
   observer, no DOM query, and no vocabulary.

4. **What the unit may land.** The module + its red/green rows + this spec. **No host change**: this
   unit adds pure code and touches no existing file except this spec and the trackers.

**Explicitly OUT of scope (do not do in this unit):**

- **The census half.** No `computeTrackVars`, no `zones`/`census`/`revealed`/`sizes` parameter, no
  `specOf`-as-`zones`-lookup, no key-set-`zones` rule, no census-mutation row. **That is `U-CENSUS`,
  wave E** (ruling 1). **A `U-PROJ` implementation that also reads a census is a scope violation.**
- **Any zone/track/pane/tab vocabulary** — no `zoneId`, `trackProp`, `emptyToken`, `isEmpty`,
  `trackFor`, `pane`, `region`. `H-r17` names this unit as the one that must be clean of it.
- **Importing `U-ZONES`/`U-CENSUS`/any sibling module** (ruling 5).
- **Any built-in variable name, unit, token, or formatting literal.** The `'px'` family, `'--'`
  prefixes and property names are **consumer data**.
- **Any DOM query or read** — no `getComputedStyle`, no `getPropertyValue`, no "read the current value
  and skip if equal" optimisation. **The applier is blind to the sink's prior state** (§2.3, `I-6`).
- **Any store, registry, cache, persistence, or module-level mutable state.**
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names).
- **Any shim change.** `src/shared/dom-shim.ts` is untouched, and **no `setProperty` may be added to
  it** (§2.3 — the sink is a caller-supplied object, not the shim's element type).
- **Any other wave-D/E/F unit.** In particular **`U-SLOTHOST`'s node placement, `U-LISTHOST`'s
  ordering, and `U-CENSUS`'s zone key set** are other contracts (RCA-2).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and skip pattern

**New module: `src/shared/layout-projection.ts`** (a pure `src/shared` module). **Eight exports**,
and nothing else:

```ts
/** The caller's value set: an opaque property name -> the caller's raw value.
 *  The host interprets NO name and NO value beyond what VarSpec says. */
export type VarValues = Readonly<Record<string, unknown>>

/** The caller's spec for ONE property. EVERY field is caller-supplied; nothing
 *  here has a built-in name, unit or token (ruling 3). */
export interface VarSpec {
  /** The FULL custom-property name, verbatim (e.g. the caller's own
   *  `--app-width`). REQUIRED — a spec without a name is malformed (`F-1`). */
  readonly name: string
  /** The caller's unit token, appended verbatim. An empty string is VALID and
   *  means "no unit". REQUIRED (may be `''`) — never defaulted to a literal. */
  readonly unit: string
  /** The caller's formatting choice for THIS property. `'unit'` (the default)
   *  emits `${value}${unit}`; `'number'` emits the bare number. Both are
   *  caller-visible options, not hidden policy. */
  readonly format?: 'unit' | 'number'
}

/** Every reason a key can be skipped. Closed, and deliberately small.
 *  EIGHT members (2026-09-27 ruling note 2: `'accessor-threw'` was ADDED — a
 *  closed union may grow by ruling; what it may NOT do is misreport). */
export type ProjectionSkipReason =
  | 'missing-value'      // the spec's key is absent from `values`
  | 'not-a-number'       // present, and READ, but not a finite number (string, boolean, null, NaN, ±Infinity)
  | 'accessor-threw'     // the value's accessor THREW while it was being read (A-2/F-4)
  | 'negative'           // finite, a number, but < 0
  | 'malformed-spec'     // the spec entry is not a usable VarSpec
  | 'duplicate-name'     // two specs produce the same `name`
  | 'sink-unusable'      // (applier only) the injected sink cannot be written to
  | 'write-refused'      // (applier only) `setProperty` threw for this key

export interface ProjectionSkip {
  readonly name: string
  readonly reason: ProjectionSkipReason
}

export interface Projection {
  /** EXACTLY the writes to perform: name -> the formatted string, in a
   *  deterministic order. Contains ONLY keys the applier must write, and
   *  NEVER `NaN`/`Infinity`/a negative (ruling 2's fail-soft pin).
   *  BUILT ON Object.create(null) — NO prototype (2026-09-27 ruling note 3):
   *  a caller-supplied name may be any string, so `applied[name] = …` must be
   *  an OWN property for EVERY name, including `'__proto__'`, `'constructor'`,
   *  `'prototype'`, `'toString'`, `'hasOwnProperty'`. Test membership with
   *  Object.hasOwn/…hasOwnProperty.call — `applied.hasOwnProperty` does NOT
   *  exist. A COPYING consumer must use a null-prototype target (spread and
   *  Object.assign({}) destroy this record's null prototype). */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY the keys that must NOT be written, each with its reason. An
   *  ARRAY of records: `name` is a VALUE, never used as an object key, so NO
   *  key-map hazard exists here (ruling note 3, consequence 6). */
  readonly skipped: readonly ProjectionSkip[]
}

/** The ONE write surface the applier will use. Duck-typed — a caller-supplied
 *  object, never the shim's element type (Layer declaration anchor 2). */
export interface VarWriteSink {
  readonly style: {
    setProperty(name: string, value: string): void
  }
}

export interface ApplyResult {
  /** EXACTLY what was written, name -> value, in write order. `applied` is a
   *  write LOG: a key appears here iff `setProperty` was called with it.
   *  Like `Projection.applied`, this is a null-prototype record — §2.5 binds
   *  it (its keys are the SAME caller-supplied names, so the hazard is
   *  identical); the ruling's objects are the returned `applied` records and
   *  every internal key→value map. */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY what was not written, each with its reason. AN ARRAY of records —
   *  no key-map hazard (ruling note 3, consequence 6). */
  readonly skipped: readonly ProjectionSkip[]
  /** `true` iff nothing was skipped. */
  readonly ok: boolean
}

/** THE PURE HALF. Total over every input; reads no environment; never throws.
 *  A THROWING value accessor is CAUGHT PER KEY and recorded as `'accessor-threw'`
 *  (never propagated, 2026-09-27 ruling note 2). The returned `Projection` is a
 *  VALUE and is REUSABLE (ruling note 1 / `I-11`). */
export function project(values: unknown, specOf: unknown): Projection

/** ONE key at a time — the same rules as `project`, exposed so a consumer can
 *  format a single value without building a spec map. */
export function projectVar(spec: unknown, value: unknown): { readonly written: string | null; readonly skip: ProjectionSkip | null }

/** THE IMPURE HALF. Total: one decision per key, at most one write per applied
 *  key, never a throw, never a partial write for a key reported applied.
 *  The projection is IMMUTABLE INPUT: it is never mutated, never cached into
 *  and never re-entered to change it — a consumer wanting different writes
 *  builds a NEW projection (2026-09-27 ruling note 4 / `I-14`). REUSABLE: the
 *  same projection may be passed again, to this sink or another (`I-11`). There
 *  is NO re-entrancy guard, because the module holds no state at all; a
 *  re-entrant `setProperty` yields call-local results (`F-14`). */
export function applyProjection(projection: unknown, sink: unknown): ApplyResult

/** The source-name alias of `applyProjection` (the amendment's own verb,
 *  "`applyVarsToRoot` returns exactly the map it applied"). SAME function. */
export function applyVarsToRoot(projection: unknown, sink: unknown): ApplyResult
```

**The skip pattern, exactly.** **Neither half throws — for any input.** The refusal/skip vocabulary
is the closed `ProjectionSkipReason` union above — **EIGHT members since 2026-09-27** (`'accessor-threw'`
added by ruling note 2; the seven-member form is the pre-ruling text) — and a skip is **recorded**,
never signalled by an exception and never silently dropped. **A value whose accessor THROWS is one of
those recorded skips** — caught **per key**, so **one bad key never aborts a projection** — exactly as
a throwing `setProperty` does not abort the applier (§2.3 item 3). **`Projection.applied` and
`Projection.skipped` PARTITION the spec's key set** (row `I-1`): every spec entry contributes exactly
one — a write or a skip — so "every input yields a write-or-skip decision" (ruling 1) is a structural
property, not a promise. **The two records are not interchangeable, and the difference is operational
(ruling note 2): the projection reports INTENT; the applier's `ApplyResult` is what a caller CHECKS**
(`ok`/`skipped` say what did not land). **A consumer that only tests a value's PRESENCE will not see a
skipped key** — a key can be present in the caller's `values` and still skipped — so **downstream code
must inspect the skip record** (`Projection.skipped` for *why not attempted*; `ApplyResult.skipped` for
*what did not land*).

**The two halves' contracts must be readable off the types alone:**

| | `project` | `applyProjection` |
| --- | --- | --- |
| Returned `applied`'s meaning | **the intended writes** | **the write LOG** |
| Returned `applied`'s prototype | **none — `Object.create(null)`** (`I-13`) | **none — `Object.create(null)`** (`I-13`) |
| May mutate its inputs? | **no** (a frozen `values` and a frozen spec both work — `M-9`) | **no** — it mutates **only the sink**; the projection is **immutable INPUT** (`I-14`) and is **never re-entered to change it** |
| Reusable? | **n/a** (no state: `project` is pure, `I-4`) | **YES — a value, not a session** (`I-11`): the same projection may be passed to this sink again or to another, with independent results |
| Deterministic order | **yes** — spec order | **yes** — `projection.applied`'s order |
| Writes per applied key | **zero** | **exactly one** (`I-3`) |

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** every **property name**;
every **unit token**; the **formatting choice**; the **values**; the **spec set** (including its
membership and order); and the **write sink**. The only literals the module may contain are **its own
contract literals**: the `ProjectionSkipReason` members (**EIGHT** — ruling note 2), the
`'unit'`/`'number'` format tokens, and the diagnostic sentences. **Every caller-supplied name is
OPAQUE: any string whatsoever is a legal `VarSpec.name`, with no CSS-legal-spelling requirement and no
denylist** (ruling note 3) — which is why the two returned `applied` records and every internal
key→value map are **null-prototype** objects and every **key lookup over caller data is an
own-property lookup**, never a prototype-chain read (`I-12`/`I-13`, §2.5).

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken` as vocabulary; property names and units are typed as an **open** `string` (never a closed union); the module documents **no** consumer constant, **not even an example one**. The only string-unions are `VarSpec['format']` (**two contract tokens**) and `ProjectionSkipReason` (**eight contract diagnostics** — **⟶ SUPERSEDED: "seven", changed to EIGHT on 2026-09-27 by ruling note 2, which added `'accessor-threw'`; the pre-ruling "seven" is kept visible here rather than edited away**). | static source row over the module file |
| **2** | **No app UI content** authored | The module creates **no** element, authors **no** text, **no** class, **no** style string of its own, and **no default value**. It computes strings and calls one injected write method. **Every string it emits is derived from caller data** (`value` + caller `unit`) — a row asserts this by driving it with sentinel caller strings and finding them, unmodified, in the output. | `M-7` (sentinel round-trip) + static row |
| **3** | **No policy defaults** | No default unit, no default name, no default value, no "assume 0", no fallback token. An **omitted** `format` is **documented as `'unit'`** — a **contract default the caller can see and override**, not a hidden policy (the honest reading of ruling 3); **an omitted `unit` is NOT defaulted** — `unit` is required, and `''` is the caller's explicit "no unit". **A NAME-LEGALITY rule is a policy this unit may NOT have** (2026-09-27 ruling note 3): `VarSpec.name` is **caller data** and the contract requires **no CSS-legal spelling**, so the module may **not** reject, rename, sanitize or skip a caller-supplied name — **not even a hostile-looking one** (`'__proto__'`, `'constructor'`, `'toString'` are all written verbatim; the record hazard they pose is solved by the **null prototype**, `I-13`, **not** by editing the caller's name). **⟶ CORRECTED 2026-09-27: the pre-ruling text said "no default name" only, which left the NAME-LEGALITY question open — the clause above closes it, and the pre-ruling half is unchanged.** | `F-1`, `M-2`, `M-8`, `M-18`, `F-13` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC, zero module-level mutable state. Both halves are **call-local**: the same call twice yields deep-equal results, and no reference to an input or a sink is retained. **Consequences pinned by the 2026-09-27 rulings and asserted here so prohibition 4 covers them:** a `Projection` is therefore **REUSABLE** with **no per-projection state** (`I-11` — there is no state to hold, so there is nothing to consume), and **no re-entrancy guard exists or may be added** (`I-14`'s note; a guard would have to be state, which is exactly what this prohibition forbids). | `I-5`, `I-6`, `I-11`, `I-14` + static row |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, cascade, `getComputedStyle`, or rendered-geometry property, and its module expands no shim member (**it may not add `setProperty` to the shim**). The one real-DOM value row is **OPTIONAL** (`[U]`, §5.2) and nothing in §3 depends on it. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 The write-or-skip rule — the applier, stated falsifiably

1. **One decision per key.** For every key in `projection.applied`, the applier either writes it
   (exactly one `setProperty` call) or skips it (`write-refused`). For every key already in
   `projection.skipped`, it propagates the skip **unchanged**. **Together these cover the whole
   spec set** — a key can never vanish between the two halves (`I-2`). **The projection is read as an
   INPUT, never as a cursor: it is REUSABLE**, so the same projection may be passed again — to this
   sink or to another — and **every call must be equivalent to a first call with that value** (`I-11`;
   ruling note 1). **Nothing is consumed, and there is no per-projection state**; a second call yields
   an **independent** `ApplyResult` (`ok`/`skipped` are call-local — `M-15`, `I-10`).
2. **No partial write for an applied key.** A key is reported in `ApplyResult.applied` **iff**
   `setProperty` was invoked with it; a key whose `setProperty` threw is reported in `skipped` with
   `write-refused` and **is not** in `applied` (`I-3`).
3. **A throwing `setProperty` does NOT abort the run.** The applier continues with the remaining
   keys and reports each failure individually — **the totality rule is what makes this the contract
   rather than a partial-write violation**; the caller sees exactly which keys did not land. **The
   projection half is SYMMETRIC with this rule since 2026-09-27:** a **value accessor that THROWS** is
   caught **per key** and recorded as `'accessor-threw'`, and **one bad key never aborts the
   projection** either (ruling note 2, `F-4B`/`F-12`).
4. **A malformed/unusable sink is a TOTAL skip, not a throw.** A `null`/absent sink, or one whose
   `style` is missing or whose `style.setProperty` is not callable, ⇒ **no writes at all** and
   **every** key skipped with `sink-unusable` (`F-5`/`F-6`) — the applier must **not** attempt a
   write to discover the sink is unusable, and must not throw.
5. **The applier is BLIND to the sink's prior state.** It never reads a value back, never compares,
   never skips "because it is already correct". **Consequence, stated so it is not a surprise: a
   stale property on the sink is NOT cleared by this mechanism** — removing a property is a
   *removal* concern, not a projection concern, and an empty/absent value is a **skip**
   (`missing-value`), not a removal write. **A later pass that wants a removal API is proposing a
   DIFFERENT contract and needs its own gate.**
6. **Write order is `Object.keys(projection.applied)`'s order** — deterministic, caller-visible.
7. **`one write per commit`** (ruling 2's fourth acceptance line) means **exactly one `setProperty`
   call per applied key per `applyProjection` call** — a row counts the calls (`M-5`). **A reused
   projection writes ONCE PER CALL, not once ever**: each call **is** a commit, so K keys applied twice
   is **2K** calls, one per key per call (`M-21`).
8. **The projection is IMMUTABLE INPUT, and sink RE-ENTRANCY is NOT GUARDED** (2026-09-27 ruling
   note 4). The applier **never mutates the projection, never caches into it, and never re-enters it
   to change it**; **a consumer wanting different writes must build a NEW projection** (`I-14`). If the
   injected sink's `setProperty` **re-enters `applyProjection`** — with the same projection or another
   — the applier's behaviour is **call-local** per `I-5`/`I-8`/`I-11`: each call keeps **its own**
   write log, `ok`/`skipped`, and write count, and **a re-entrant call cannot add a key to, or remove
   a key from, the outer call's `ApplyResult`** (the outer iteration set is fixed when it reads
   `projection.applied`). **Observable interleaving IS possible AT THE SINK and is the sink's own
   choice** — the applier is blind to the sink's prior state (item 5) and **owns no lock over an
   object it does not own** (ruling 4 of §0); **no clause of this contract is weakened by it, so no
   guard is owed.** **The module holds NO re-entrancy guard because it holds no module or instance
   state at all** (prohibition 4) — **and a guard would have to be state**, so adding one is a **NEW
   CONTRACT needing its own gate** (`F-14`).

### 2.4 The projection rule — the pure half, stated falsifiably

1. **Purity.** `project` is a function of its two arguments alone: same arguments ⇒ **deep-equal**
   result, every time; no ambient read (`Date`, `Math.random`, `process.env`, `document`, `window`,
   the shim, the module's own past calls). A row calls it twice and asserts deep-equality (`I-4`).
2. **Totality.** For **any** `values` and **any** `specOf` — `null`, `undefined`, a string, a number,
   an array, a frozen object, a getter-bearing object, **a getter that THROWS**, a huge object —
   `project` **returns a `Projection` and never throws** (`I-7`). **Every spec entry produces exactly
   one decision.** **A throwing accessor is caught PER KEY and does not abort the projection**
   (2026-09-27 ruling note 2): the remaining keys are still decided, and the throwing key lands in
   `skipped` with `'accessor-threw'`.
3. **The validity rule, per spec entry (the fail-soft pin, generalized):** a key is **applied**
   **iff** its spec is usable **and** its value is present **and** the value can be **read** **and**
   the read value is a **finite number** **and** that number is **not negative**. Otherwise it is
   **skipped**, with the first matching reason in this fixed precedence: `malformed-spec` →
   `duplicate-name` → `missing-value` → **`accessor-threw`** → `not-a-number` → `negative`. **The read
   happens ONCE, and `accessor-threw` takes the place of `missing-value`/`not-a-number` when the read
   itself threw**: a hostile accessor means *"we could not read the value"*, which is a **different
   fact** from *"the value is not a number"* (ruling note 2 — reusing `not-a-number` would **silently
   conflate** them, and the consumer cannot recover the distinction from it). **`NaN`, `±Infinity`,
   `-1`, `'12'`, `true`, `null` and an absent key are all skips** — **no `NaN`/`Infinity`/negative may
   ever appear in `applied`** (ruling 2's pin, which is the fork's F-2 rule generalized).
   **⟶ SUPERSEDED: the pre-ruling precedence was the five-member list `malformed-spec` →
   `duplicate-name` → `missing-value` → `not-a-number` → `negative`; the sixth member `accessor-threw`
   was inserted at the read point on 2026-09-27 (ruling note 2), and `F-4` was SPLIT into `F-4A`/`F-4B`
   so the plain non-numeric inputs keep `not-a-number`.**
4. **Number formatting is the applier's own arithmetic, not a delegated dependency.** With
   `format: 'unit'` (or omitted): `${value}${spec.unit}`; with `format: 'number'`:
   `String(value)`. **`0` is a legitimate value and is applied** — a row pins that `0` is not
   mistaken for absent (`F-3`'s mirror case). **The output is a string produced by the JS number →
   string conversion, and this spec does NOT claim a CSS serialization** (Layer declaration anchor 2).
5. **`duplicate-name` is resolved FIRST-WINS.** If two specs produce the same `name`, the **first**
   (in spec order) is applied and the **second** is skipped with `duplicate-name`; the `applied`
   record therefore contains each name **at most once** (`F-2`).
6. **The census half is ABSENT, structurally.** `project`'s parameters are `(values, specOf)` —
   there is **no** `census`, `zones`, `sizes` or `revealed` parameter, and **no** key-set rule that
   consults one. A static row asserts the module imports nothing from a zones/census module
   (ruling 5), and a signature row pins the parameter list (`A-15`).

### 2.5 The record-building rule — `Object.create(null)`, stated falsifiably (2026-09-27 ruling note 3)

**Why this section exists, in one sentence:** a caller-supplied `VarSpec.name` is **any string**
(the contract requires **no** CSS-legal spelling and the unit may **not** invent a name-legality rule),
so `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'` and `'hasOwnProperty'` are **reachable
both as keys of the returned `applied` record and as keys of any internal per-key map** — and on a
plain-object literal the assignment `applied['__proto__'] = 'x'` **silently changes the record's
prototype instead of creating an own property**, dropping the key from `Object.keys` and leaving the
projection **wrong for that key while claiming no skip**. **The full analysis, the four reasons and the
rejected alternatives are §0A's ruling note 3** (they are recorded there and not duplicated here).
**This section states the resulting RULES, which are what a row drives.**

1. **The returned `applied` records are built on `Object.create(null)`** — `Projection.applied` and
   `ApplyResult.applied` **alike** — so **every** key is an **own** property for **every** caller name,
   including `'__proto__'`. **`I-12`** pins the own-key requirement; **`I-13`** pins the null
   prototype. **A row is one call:** a spec naming `'__proto__'` yields an **own key `'__proto__'`**,
   it **appears in `Object.keys(applied)` in spec order**, and **`I-1`'s partition still holds** —
   which is exactly the falsification of the plain-object hazard (`F-13`). **A projection's own
   prototype must be unchanged by any caller-supplied name**: `Object.getPrototypeOf(applied) === null`
   after such a call, and the **module's** prototype chain is never written.
2. **Every internal key→value map is built the same way, and every lookup over caller data is an OWN
   property lookup.** The named cases, each a row's drive:
   - **the duplicate-name detection set** — read with own-property semantics, so a **name colliding
     with an `Object.prototype` member** (`'constructor'`, `'toString'`, `'hasOwnProperty'`,
     `'valueOf'`) is **NOT** misdiagnosed as `duplicate-name` and is **not** treated as already seen
     (`F-2`'s rows drive `'--dup'`; this clause adds the prototype-shaped names to that drive);
   - **the `values` lookup** — an **own-property** read (`Object.prototype.hasOwnProperty.call`-style,
     or a null-prototype-safe equivalent), so a **plain-object `values`** with **no** own key named
     `'constructor'` yields **`missing-value`**, never the **inherited function**
     `Object.prototype.constructor` (which would be a value **the caller never supplied**);
   - **the `specOf` entry lookup** — the same own-property semantics, so a spec set that legitimately
     carries an own key `'__proto__'` (e.g. a `Object.create(null)` spec map, or one built with
     `Object.defineProperty`) is **read as its own entry** rather than silently resolving to the
     prototype;
   - **any other map** the implementation keeps (a formatter memo, an order list) — the same rule, and
     **`A-14`'s static sweep is where a new one would be noticed**.
   **`values` and `specOf` are NOT required to be null-prototype objects** — they are the **caller's**
   data, and this unit may not impose a shape on them (ruling note 3, reason 3). **What is pinned is
   the MODULE's own read semantics**: own properties only.
3. **`Projection.skipped` and `ApplyResult.skipped` are ARRAYS of `{name, reason}` records, so no
   key-map hazard exists there, and the null-prototype rule does NOT extend to them.** `name` is a
   **value** (`ProjectionSkip.name`), never an object key; the array's indices are engine-owned
   integer slots. **A later pass that "completes" this ruling by rewriting `skipped` would be changing
   a part of the shape `A-3` never implicated** (ruling note 3, consequence 6).
4. **The copy hazard is a CONSUMER obligation, stated because the ruling exposes it:** the null
   prototype is **destroyed by a naive copy** — `{...applied}` and `Object.assign({}, applied)`
   produce a **plain-prototype** object and **re-invoke `Object.prototype`'s `__proto__` accessor on
   the target** when the source holds an own `'__proto__'`. **A consumer copying the record MUST use a
   null-prototype target** (`Object.assign(Object.create(null), applied)`). **The module returns a
   record whose keys survive and may not police how a caller copies it** — a contract obligation, not
   a defect.
5. **`readonly` is TYPE-LEVEL and freezes NOTHING at runtime.** `Object.freeze` on the returned record
   is **permitted** (it changes no row — the return value is treated as a value) but **is NOT a
   contract clause**, and **a caller may rely on neither freezing nor non-freezing**. **What IS pinned
   about mutation is provable and directional:** the applier **never** mutates the projection
   (`I-14`), and no returned record **aliases** module-internal state (`I-5`/`I-8`) — so a caller
   mutating its own copy mutates **its own copy of a value**.
6. **The APPLIER needs NO guard against a dangerous NAME, and the two halves differ — stated
   explicitly, because the contrast is the point.** The applier passes the name as a **string argument
   to `CSSStyleDeclaration.setProperty(name, value)`**, where `'__proto__'` is an **ordinary string in
   a CSS property-name position**: the DOM API performs **no object-key assignment**, so there is **no
   prototype-write hazard on that side at all**. **The record-key hazard (a JS object keyed by caller
   data) and the CSS-property-name position (a string argument to a DOM API) are different objects** —
   the first is solved by the null prototype, the second needs nothing — and **the applier must NOT
   refuse, sanitize or re-name a caller-supplied name on either half** (prohibition 3). `M-20` drives
   the contrast on a fake sink that records its exact arguments.

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **The unit-family shape: one spec, one value, one write** | `project({w: 320}, {w: {name: '--app-width', unit: 'px'}})` then `applyProjection(p, fakeSink)` | `p.applied` is `{'--app-width': '320px'}`; `p.skipped` is `[]`; the sink received **exactly one** `setProperty('--app-width','320px')`; `r.applied` deep-equals `p.applied`; `r.ok === true` | `[T]` |
| **M-2** | **Omitted `format` behaves as `'unit'`** | the same spec with **no** `format` | identical to M-1 — a row pins the documented default so it is **not** discovered by accident | `[T]` |
| **M-3** | **`format: 'number'` drops the unit token** | `{name:'--n', unit:'px', format:'number'}`, value `320` | `applied` is `{'--n': '320'}` — the caller's `unit` is **ignored, not emitted** | `[T]` |
| **M-4** | **An empty `unit` is valid and means "no unit"** | `{name:'--z', unit:''}`, value `7` | `applied` is `{'--z': '7'}`; **`unit` was not defaulted to any literal** | `[T]` |
| **M-5** | **Exactly one write per applied key per call** | a counting fake sink over K keys | `setProperty` called **exactly K** times, once per key, in `Object.keys(applied)`'s order (ruling 2's "one write per commit") | `[T]` |
| **M-6** | **Several keys, deterministic order** | a spec of 3 keys with values | `applied`'s key order equals the **spec** order for every call; `r.applied`'s key order equals `applied`'s | `[T]` |
| **M-7** | **Sentinel round-trip — every emitted string is caller data** | `name: '--SENTINEL_NAME'`, `unit: 'SENTINEL_UNIT'`, value `123` | `applied` contains the sentinel name **verbatim** and the value is exactly `'123SENTINEL_UNIT'` — **the module added no prefix, no suffix and no separator of its own** (prohibition 2/3) | `[T]` |
| **M-8** | **A caller-supplied `unit` that looks like a built-in is used verbatim** | `unit: 'px'` and, in the next row, `unit: 'Q'` and `unit: '--'` | all three emit exactly `${value}${unit}` — **the module has no special case for any token** | `[T]` |
| **M-9** | **Purity against FROZEN inputs** | `Object.freeze`d `values` and a `Object.freeze`d spec (and a frozen nested spec object) | **no throw** (no strict-mode write to a frozen object), and the result is correct — the halves **read** both arguments | `[T]` |
| **M-10** | **`projectVar` agrees with `project` on the same input** | `projectVar(spec, value)` vs `project(values, {k: spec})` | for every §3 row's inputs, the single-key result's `written` equals `project`'s `applied[k]` **and** its `skip` is deep-equal to the corresponding entry in `skipped` (or both `null`/absent) — **one authority, two entry points** | `[T]` |
| **M-11** | **A `null`/absent projection is a total skip, not a throw** | `applyProjection(null, sink)` / `undefined` / `'nope'` / `42` | **no throw**; `applied` `{}`; `skipped` `[]`; `ok === true` (there was nothing to decide). **Distinguished from `F-5`** (a valid projection, an unusable sink ⇒ skips with reasons) | `[T]` |
| **M-12** | **A projection with an empty `applied` applies nothing** | `project({}, {})`; then apply | `applied` `{}`; `skipped` `[]`; the sink received **zero** calls; `ok === true`; **nothing throws** | `[T]` |
| **M-13** | **A hand-built projection object is honoured** | a literal `{applied: {…}, skipped: []}` passed straight to `applyProjection` | the applier writes exactly that record — **it does not re-validate, re-format or re-derive it**. *(A contract decision: the applier trusts the projection it is given; §7 item 7.)* | `[T]` |
| **M-14** | **`applyVarsToRoot` is the same function** | `applyVarsToRoot(p, sink)` | identical behaviour **and identity** to `applyProjection` (a row asserts `applyVarsToRoot === applyProjection`) — the source-name alias is not a second implementation | `[T]` |
| **M-15** | **`ok` reflects the current call only** | one call with a skip, then a clean call | the second call: `ok === true`, `skipped` `[]` — nothing accumulates | `[T]` |
| **M-16** | **A value of `0` IS applied** | `{name:'--z', unit:'px'}`, value `0` | `applied` is `{'--z': '0'}` — **`0` is not treated as absent, not skipped, and not coerced** | `[T]` |
| **M-17** | **A very large and a very small finite value** | `1e21`, `-0`, `5e-324`, `Number.MAX_VALUE` | all finite ⇒ **applied** as `String(value) + unit` (`-0`'s string is `'0'`; `1e21`'s is `'1e+21'`); a row records the **exact** strings, so a later pass cannot "improve" the number formatting silently | `[T]` |
| **M-18** | **A caller-supplied name `'__proto__'` is an ORDINARY key (`A-3`)** | `project({k: 1}, {k: {name: '__proto__', unit: ''}})` | **own key `'__proto__'`** in `applied`, value `'1'`; `Object.prototype.hasOwnProperty.call(applied, '__proto__') === true`; `Object.keys(applied)` contains `'__proto__'` **in spec order**; **`Object.getPrototypeOf(applied) === null`** (the record's prototype was NOT mutated); `applied['__proto__']` reads back `'1'` as an own value, **not** the prototype; `skipped` is `[]`; `ok === true`; and with the sibling rows below, **`I-1`'s partition still holds** (`'__proto__'` appears in **no** `skipped` entry) | `[T]` |
| **M-19** | **The null-prototype record's own membership API (`A-3`)** | `project({k: 1}, {k: {name: '__proto__', unit: ''}})` | **`applied.hasOwnProperty` is `undefined`** (calling it throws `TypeError`) — the pinned membership test is **`Object.hasOwn(applied, name)`** / `Object.prototype.hasOwnProperty.call(applied, name)`; **`Object.getPrototypeOf(applied) === null`** for **every** returned `applied` record, including one with only ordinary names; **`Object.keys` / spread-into-a-null-prototype-target / `in` / `Object.entries` / `JSON.stringify` behave normally**; and **a deep-equality helper that compares prototypes is written with the null prototype in mind** (the row states which of the two forms it uses, so a mystery failure cannot hide a contract surprise) | `[T]` |
| **M-20** | **The APPLIER-side contrast: a dangerous NAME is an ordinary CSS property name (`A-3`)** | the M-18 projection applied to a **recording** fake sink | `setProperty` received **exactly `('__proto__', '1')`** — the name **verbatim as a string argument**, **no** refusal, **no** sanitization, **no** `sink-unusable`/`write-refused`; `r.applied` carries the own key `'__proto__'`; and **the applier holds no name guard** — the contrast with M-18's record is the point of the row (§2.5 item 6) | `[T]` |
| **M-21** | **A projection is REUSABLE across DIFFERENT sinks (`A-11`)** | `p = project(values, specOf)`; `r1 = applyProjection(p, sinkA)`; `r2 = applyProjection(p, sinkB)`; `r3 = applyProjection(p, sinkA)` again | **all three calls succeed with independent results**; `sinkA` received the writes **of calls 1 and 3** (once per key per call — **2K** calls total for K keys), `sinkB` those of call 2; `r1`, `r2`, `r3` are **deep-equal to each other** and each is a **fresh** object (`I-8`); `ok === true` in each; **`p` is UNCHANGED after all three** (deep-equal to a fresh `project(values, specOf)`, and mutating `r1.applied` does not affect `p` or `r2`) — **`p` was not consumed** | `[T]` |
| **M-22** | **A projection is REUSABLE against the SAME sink, and `applyVarsToRoot` reuses identically (`A-11`)** | `applyProjection(p, sink)` twice; then the same twice via `applyVarsToRoot` | each call is **equivalent to a first call with that value**: the second call's `ApplyResult` is deep-equal to the first's, the write log is the **current call's** log (`I-3`), and **only one** `setProperty` call per key **per call** is made (no memo, no "already applied" skip — §2.3 item 7); `applyVarsToRoot(p, sink)` behaves identically (`M-14`'s identity) | `[T]` |

### 3.2 Documented fail-states / skips (each is a typed reason, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **A malformed spec entry** | `specOf` entry that is `null`/`undefined`/a string/a number/an array; a missing `name`; a non-string `name`; a missing `unit`; a non-string `unit`; an unknown `format` value | **no throw**; every such entry is skipped with **`malformed-spec`**; **no default is substituted** (prohibition 3) | `[T]` |
| **F-2** | **`duplicate-name` — two specs, one name** | two spec entries producing `name: '--dup'` | **no throw**; the **first** is applied and the **second** is skipped with `duplicate-name`; `applied` contains `--dup` **once** (first-wins, §2.4 item 5) | `[T]` |
| **F-3** | **`missing-value`** | a well-formed spec whose key is absent from `values` | skipped with **`missing-value`** — **never a 0, never an empty string, never a removal write** (§2.3 item 5) | `[T]` |
| **F-4A** | **`not-a-number` — the whole NON-NUMERIC class** *(was `F-4`, the first half of the 2026-09-27 SPLIT)* | value `'12'`, `true`, `false`, `null`, `undefined` (present), `{}`, `[]`, `NaN`, `Infinity`, `-Infinity`, a `BigInt`, a function **— each READABLE without throwing** | **no throw**; each is skipped with **`not-a-number`** — the reason means *"the value was read and is not a finite number"*, which is a **different fact** from a read failure (ruling note 2) | `[T]` |
| **F-4B** | **`accessor-threw` — the THROWING VALUE ACCESSOR (`A-2`), a reason of its OWN** *(was `F-4`'s embedded clause; the SECOND half of the 2026-09-27 SPLIT)* | a `values` object whose **own** property is an accessor that **throws** on read (e.g. `Object.defineProperty(values, 'k', {get() { throw new Error('hostile') }, enumerable: true})`), with a well-formed spec naming it — and the same where the accessor throws **only for the second** of several keys | **`project` does NOT throw** and the key is **skipped with `accessor-threw`** — **caught PER KEY**: the other keys are still decided normally, the good keys still appear in `applied`, and `skipped` carries exactly one entry for the throwing key (the **`F-12`** row drives it in full). **⟶ SUPERSEDED, KEPT VISIBLE — the pre-ruling `F-4` text read: *"A getter that throws: the throw propagates **out of the getter** — the spec does **not** claim to swallow arbitrary accessor throws, and the row must record which behaviour the implementation has (§7 item 8)"*. That sentence is SUPERSEDED by the architect's 2026-09-27 ruling (ruling note 2): the projection now **catches per key and records the skip**, it does **not** propagate, and the behaviour is **no longer deferred to the implementation** — `§7 item 8` no longer lists it as unruled.** | `[T]` |
| **F-5** | **`negative`** | value `-1`, `-Number.MIN_VALUE`, `-0`'s distinction | `-1` and any negative ⇒ **`negative`** skip; **`-0` is NOT negative** (`-0 < 0` is `false`) and is **applied as `'0'`** — a row pins both halves, because `-0` is the one input where a naive `<= 0` test would differ from `< 0` | `[T]` |
| **F-6** | **`sink-unusable` — a malformed sink** | `null`, `undefined`, `42`, `'x'`, `{}` (no `style`), `{style: {}}` (no `setProperty`), `{style: {setProperty: 42}}` | **no throw**; **no write attempted**; **every** key of the projection appears in `skipped` with **`sink-unusable`**; `applied` `{}`; `ok === false` (`F-6` is the whole-sink class — one reason, applied to every key) | `[T]` |
| **F-7** | **`write-refused` — a `setProperty` that throws for ONE key** | a fake sink whose `setProperty` throws on the 2nd key only | **no throw out of the applier**; key 2 is in `skipped` with **`write-refused`** and **absent from `applied`**; keys 1 and 3 **are** applied; `ok === false`; **the run did not abort** (§2.3 item 3) | `[T]` |
| **F-8** | **`write-refused` — a `setProperty` that throws for EVERY key** | a fake sink that always throws | no throw; every key `write-refused`; `applied` `{}`; `ok === false` | `[T]` |
| **F-9** | **A projection whose `skipped` is malformed** | `{applied: {}, skipped: 'nope'}` / `{applied: {}, skipped: [null]}` | **no throw**; the applier still performs the `applied` half's writes; the malformed skip entries are **dropped from `ApplyResult.skipped`** (they carry no decidable reason). *(A contract decision, §7 item 7.)* | `[T]` |
| **F-10** | **A projection whose `applied` value is not a string** | `{applied: {'--a': 12}}` / `{'--a': null}` | **no throw**; the applier coerces with `String(value)` **only for a primitive**, and **skips** a non-primitive with `write-refused`. *(A contract decision, §7 item 7: the applier does not re-validate its input, but it must never hand a non-string to a real `setProperty`, which would throw a `TypeError` in a browser.)* | `[T]` |
| **F-11** | **`project` given a `specOf` that is not a record** | `null`, `undefined`, `'x'`, `42`, `[]` | **no throw**; **zero** spec entries ⇒ `applied` `{}` and `skipped` `[]`. **An empty input set is not an error** (prohibition 3: no default spec is invented) | `[T]` |
| **F-12** | **One bad key NEVER aborts a projection — the throwing accessor, driven in full (`A-2`)** | a spec of FOUR keys, where key 2's value is an accessor that throws, key 3's is a plain finite number and key 4's key is absent; plus the `format: 'number'` and `duplicate-name` variants | **no throw out of `project`**; key 2 is in `skipped` with **`accessor-threw`**; key 1 (before the throw) **and key 3 (after it) are applied** — **the projection did not stop at the throwing key**; key 4 is skipped `missing-value`; **exactly one** skip entry per key and **no duplicate** entry for the throwing key; the **precedence** holds (`malformed-spec`/`duplicate-name` still win for their own entries — §2.4 item 3); the result is **deep-equal to a repeat call** (`I-4`, the accessor throws every time) | `[T]` |
| **F-13** | **The prototype-shaped key HAZARD, falsifiably (`A-3`)** | **(a)** a spec whose `values` key is `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'`, `'valueOf'` or `'__proto__'`, with a plain-object `values` that has **no own** property of that name; **(b)** two spec entries both producing `name: 'constructor'`; **(c)** a `specOf` that legitimately carries an **own** key `'__proto__'` | **(a)** each is skipped **`missing-value`** — **never applied from an inherited value** (`Object.prototype.constructor` and friends are **not** the caller's data), and the module's own prototype chain is **never read** as a value source; **(b)** the FIRST is applied and the second is skipped **`duplicate-name`** — the detection set must **not** see an inherited member as "already seen" (a misdiagnosis of either kind is the finding this row exists to catch); **(c)** the own entry is read as its own entry, and the record it yields has **own key `'__proto__'`** with the caller's formatted value. **In every case: `Object.getPrototypeOf(applied) === null`, no prototype of any object is written, `I-1`'s partition holds, and nothing throws.** **Contrast (the negative half): a pre-fix implementation using plain object literals fails this row exactly as ruled in §0A note 3** — `'__proto__'` vanishes from `Object.keys`, the partition breaks, and `'constructor'` is misdiagnosed | `[T]` |
| **F-14** | **A `setProperty` that RE-ENTERS `applyProjection` — results stay CALL-LOCAL (`A-7`)** | a fake sink whose `setProperty` calls `applyProjection(p2, innerSink)` (same or another projection) on the FIRST key, then returns; also the variant where the inner call targets the **SAME** sink | **no throw out of either call**; the **outer** `ApplyResult` reports **exactly its own call's** writes — the inner call's keys are **absent from the outer `applied`** and the inner call's skips **absent from the outer `skipped`** (`I-3`); neither call's `ok`/`skipped` absorbs the other's (`I-10`, `M-15`); **each key of each call is written exactly once per call** (§2.3 item 7); **the outer call's remaining keys are still written after the re-entrant call returns** (its iteration set was fixed at entry); **no guard exists, and neither call is refused/blocked for re-entering** — the interleaving is **at the sink** and is the sink's own choice. **If this row ever produces an outer `ApplyResult` that reports a write its own call did not make, that is a `BLOCKING` finding against `I-3`, not a defect in this clause** (§0A note 4) | `[T]` |
| **F-15** | **The caller's projection is IMMUTABLE across a call — byte-identical after (`A-7`)** | snapshot `p` (deep copy **and** `JSON.stringify`-with-null-prototype-aware comparison, plus `Object.keys(p.applied)` order and `Object.getPrototypeOf`), call `applyProjection(p, sink)` where the sink throws for one key and succeeds for another, then re-snapshot | **`p` is unchanged in every observable respect** — same own keys **in the same order**, same values, same `skipped` entries, same null prototype, and **no new key, no deleted key, no cached marker, no added field**; a **frozen** `p` (`Object.freeze` on the record and on `p` itself) is also **accepted without a throw**; and **a consumer wanting different writes builds a NEW projection** — the row asserts that `project(values', specOf')` is the sanctioned route, and that no supported operation edits `p` in place (`I-14`) | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `Projection.applied`'s keys and `Projection.skipped`'s names **partition** the spec's key set: no key in both, and every spec entry in exactly one | "Every input yields a write-or-skip decision" (ruling 1), structurally |
| **I-2** | **A key never vanishes between the halves**: `ApplyResult.applied ∪ ApplyResult.skipped` covers every key of `Projection.applied ∪ Projection.skipped` | No silent drop |
| **I-3** | A key is in `ApplyResult.applied` **iff** `setProperty` was called with it; **`setProperty` is called at most once per key per call** | The write LOG's meaning + "one write per commit" |
| **I-4** | `project` is **referentially deterministic**: two calls with deep-equal arguments return **deep-equal** results | Purity, made falsifiable |
| **I-5** | Neither half retains a reference to an argument: after the call, mutating the caller's `values`/`spec` object or the sink does not change any already-returned result | No store, no aliasing |
| **I-6** | `applyProjection` reads **nothing** from the sink except the callability of `style.setProperty` — it never reads a current value | §2.3 item 5 (blindness) |
| **I-7** | **No function throws for any input** — asserted by a deterministic table (`null`, `undefined`, numbers, strings, arrays, frozen objects, throwing getters, throwing `setProperty`, malformed projections) | The totality contract's boundary |
| **I-8** | Every returned record/array is a **fresh** object; a caller mutating a returned `applied` record cannot change any other result | Anti-aliasing |
| **I-9** | `projected.applied`'s value for an applied key is **always a string**, and **never** contains `NaN`/`Infinity`/`-Infinity` or begins with `'-'` (except a caller's own `unit`/`name` that literally does) | Ruling 2's fail-soft pin, as an invariant |
| **I-10** | `ok === (skipped.length === 0)` for `ApplyResult` | No "ok with skips" state exists |
| **I-11** | **A `Projection` is REUSABLE, and reuse is indistinguishable from a first call (`A-11`, 2026-09-27)**: for any projection `p`, `applyProjection(p, s1)` followed by any number of further calls — **to `s1` again or to other sinks, with the same or another projection** — yields, for every call, a result **equivalent to a first call with that value**; **nothing is consumed and no per-projection state exists** (so a second call cannot observe the first); each call's `ApplyResult` is **its own** call's log (`I-3`) with `ok`/`skipped` **call-local** (`I-10`), and each writes **at most once per key per call** (§2.3 item 7) | `A-11`'s ruling, made falsifiable; it **follows from** `A-7` (§0A note 4) and is **consistent with** `I-5` (no retained reference ⇒ nothing to consume) and `I-8` (every returned record fresh ⇒ a result cannot be a cursor) |
| **I-12** | **EVERY caller-supplied name is an OWN key** — in `Projection.applied` and in `ApplyResult.applied`, `name` is an own property for **any** string, including `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'`, `'valueOf'`; **no key is dropped, renamed or misdiagnosed**, and `I-1`'s partition holds for every such name | `A-3`'s ruling (2026-09-27, §0A note 3): the contract requires **no** CSS-legal name and the unit may **not** invent a name-legality rule, so the total answer is the record's own keys |
| **I-13** | **The returned `applied` records (and every internal key→value map) have NO prototype**: `Object.getPrototypeOf(applied) === null`; **every key lookup over caller data is an OWN-property lookup** (never a prototype-chain read) — for the duplicate-detection set, the `values` lookup, the `specOf` entry lookup and any other map; **`Object.keys(applied)` still yields the pinned deterministic write order** | `A-3`'s ruling, mechanically: one expression that is **TOTAL** over dangerous keys, needs **no new skip reason** and **no name policy**, and is **verifiable by one row** (`F-13`). **Consequences recorded where a consumer meets them** (§2.5 items 3–6: no `hasOwnProperty`, the copy hazard, `readonly` ≠ frozen, the applier's contrasting position) |
| **I-14** | **The projection is IMMUTABLE INPUT to the applier — and the module holds NO re-entrancy guard**: `applyProjection` never **mutates** the projection, never **caches into** it, and never **re-enters** it to change it; the caller's projection is **observably unchanged** after any call (`F-15`); a consumer wanting different writes builds a **NEW** projection; and **a re-entrant `setProperty`** yields **call-local** behaviour per `I-3`/`I-5`/`I-8`/`I-11` (`F-14`), with **no guard, because a guard would have to be state and the module holds none** (prohibition 4) | `A-7`'s ruling (2026-09-27, §0A note 4): *"skip, treat projection as non-mutable and expect consumers to create new projection if they want changes"*. **A guard is a NEW CONTRACT needing its own gate**, and it would make a nested call refusable for a reason with no `ProjectionSkipReason` member |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/layout-projection.test.ts`** — authored **first**,
**RUN**, and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/layout-projection.js'` for every row. **There is no host-fix
branch for this unit**: the module does not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-14` (**`I-11`..`I-14` are the 2026-09-27 ruling pack's rows**), `M-1`..`M-22`
   (`M-18`..`M-22` are the ruling pack's), `F-1`, `F-2`, `F-3`, **`F-4A`/`F-4B`** (the split), `F-5`..
   `F-15` (**`F-12`..`F-15` are the ruling pack's**) **in that order**.
2. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static
   row that can already be evaluated.
3. **Then** implement the least code that makes them green.
4. **Re-run**, record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a census test.** A `computeTrackVars`/`zones`/`revealed` row is **`U-CENSUS`'s** and belongs
  in `docs/specs/census.md`'s red set (wave E). **Its presence in this unit's red set is a scope
  violation** (ruling 1).
- **Not a zone/track test.** Any `zoneId`/`trackProp`/`emptyToken` input is a prohibition-1
  violation.
- **Not a shim change.** The rows drive a **caller-supplied fake sink**; **`setProperty` may not be
  added to `src/shared/dom-shim.ts`** (Layer declaration anchor 2, §1).
- **Not a CSS-parsing test.** `[T]` asserts the **string the module produced**; whether a browser
  accepts it is a `[U]` question and the `[U]` row is optional.
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires **adding a member to the shim** (e.g. `setProperty`) | **Scope violation** (`H-r5`) — re-write the row against a caller-supplied fake sink. |
| **S-3** | A row is only satisfiable by delegating token formatting to another module (`U-ZONES`/`U-CENSUS`) | **Violates ruling 5** — this unit formats from the caller's `VarSpec` **data**. **Do not add the import.** |
| **S-4** | A row needs a census, a zone key set, or a `revealed` flag | **Violates ruling 1** — that is `U-CENSUS`. Stop and route the row there. |
| **S-5** | A row is only satisfiable by reading the sink's current value ("skip if unchanged") | **Violates §2.3 item 5** — the applier is blind. Re-write the row. |
| **S-6** | A row is only satisfiable by making a skip a **removal write** | **A different contract** — §2.3 item 5. Stop and report; a removal API needs its own gate. |
| **S-7** | A `[T]` row's "the value is valid CSS" claim cannot be made without a browser | The claim is **deleted**; the row asserts the **string**, and the `[U]` row (optional) carries the real-DOM half. |
| **S-8** | The implementation wants to make `unit` optional with a default | **Violates prohibition 3** — `unit` is caller data; `''` is the caller's explicit "no unit". |
| **S-9** | A row (or an implementation) proposes letting a **value-accessor throw propagate** — or proposes folding it into an existing reason (`not-a-number`, `missing-value`) | **Violates the 2026-09-27 ruling (`A-2`/`F-4`, §0A note 2)** — the throwing accessor is caught **per key** and recorded as its **own** member, **`'accessor-threw'`**; **propagating is now a contract violation**, not a deferred implementation choice, and **reusing `not-a-number` misreports** (it conflates *"could not read"* with *"not a number"*). |
| **S-10** | A row (or an implementation) proposes **rejecting, renaming, sanitizing or skipping** a caller-supplied name because it "looks dangerous" (`'__proto__'`, `'constructor'`, `'toString'`, …) — or proposes testing key membership by **presence/truthiness** on a record | **Violates the 2026-09-27 ruling (`A-3`, §0A note 3) and prohibition 3** — names are **caller data**; the record is fixed by **`Object.create(null)`** (`I-12`/`I-13`), **not** by a name-legality policy. And **presence is not the contract**: downstream code must inspect the **skip record** (`Projection.skipped` / `ApplyResult.skipped`) — a key may be present in `values` and still skipped (ruling note 2's operational note). |
| **S-11** | A row (or an implementation) wants the applier to **mutate or cache into** its projection, to **re-derive** it in place, or to add a **re-entrancy guard/flag** | **Violates the 2026-09-27 ruling (`A-7`, §0A note 4) and prohibition 4** — the projection is **immutable input** (`I-14`); a consumer wanting different writes builds a **NEW** projection, and **a guard would be state** (a new contract needing its own gate). |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 8), (b) the **wave-D order** — `U-MOUNTGUARD`, `U-LISTHOST`, `U-SLOTHOST` before it,
(c) this spec to exist (**done: this filing**), and (d) a **TestWriter to have RUN and REPORTED the
red set** (`AGENTS.md` item 9). Its `## OPEN` row (D4) stays `BLOCKED` until all four hold — **and its
row carries the permanent scoping clause: `U-CENSUS` is separate.**

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/layout-projection.ts` | **NEW** — the eight exports of §2.1 | always |
| 2 | `tests/layout-projection.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `docs/specs/projection.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · **`docs/specs/census.md`'s subject matter** · every **existing** test file ·
`package.json` / `package-lock.json` · `scripts/**` · `node_modules/**` ·
`../Preempt-Providence/**`. **This unit changes no existing file except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence**; for this unit it also proves **nothing** about CSS validity (anchor 2) |
| 2 | typecheck | `npm run typecheck` | **[H]** | the `VarSpec`/`Projection`/`ApplyResult` types are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read) |

**OPTIONAL `[U]` row — ONE measured custom-property value, with its named preconditions.** The row:
*a caller-specified custom property, written by `applyProjection` to a **real** element in the
renderer, read back and observed as that value.* **Preconditions, all named and none assumed:**
(a) the `ui` leg exists and is green for the same built tree; (b) `npm run divergence` is green for
that tree; (c) the observation route is the landed leg's **preferred measurement channel** — a
provident **handler body** loaded through the **EXISTING** `provident.load`/`code.load`, reading
`getBoundingClientRect`/`getComputedStyle` in the real renderer and **writing the value into graph
content** so it returns over the **existing** `get_rendered_html` (`REAL-DOM-UI-GATE-LEG`'s
preferred channel, `docs/decisions.md:65`, read); and (d) the leg's fallbacks
(`webContents.executeJavaScript`, CDP) are **leg-only and may never become MCP tools**. **If the row is
not taken, no §3 row is weakened** — and **no row may claim a rendered-geometry property**: the
measurement is **one value**, exactly as `U-REALDOM-BOOT`'s `R2` row words it (`width > 0 && height >
0` plus a non-`''` `getComputedStyle` value, both read back through graph content).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-PROJ` · wave **D** · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"the projection half only; `computeTrackVars`
   is absent, and `U-CENSUS` remains a separate wave-E unit."* **A DONE row that does not state this
   is a review finding** — it is the unit's defining constraint (ruling 1).
3. **The purity/totality confirmation, explicitly**: *"`project` is pure (no environment read);
   `applyProjection` is total (one decision per key, never a throw, never a partial write for a key
   reported applied)."*
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
6. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
7. **The `[U]` row's status**: taken (with its **one** measured value) or **not taken** (with the
   reason).
8. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6).

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **FOUR genuine quantifications (the count is UNCHANGED by the 2026-09-27 ruling pack — the four new ruled classes are extra INSTANCES of the same ones), and this unit is the strongest PBT candidate in wave D:** (i) *"for **every** unusable input shape, `project` returns a `Projection` and never throws"* — **now explicitly including a throwing accessor (`A-2`/`F-4B`/`F-12`) and a re-entering sink (`A-7`/`F-14`)**; (ii) *"for **every** spec/value pair, the key appears in exactly one of `applied`/`skipped`"* (`I-1`) — **now explicitly including the prototype-shaped names `'__proto__'`/`'constructor'`/`'toString'` (`A-3`/`I-12`/`F-13`)**; (iii) *"for **every** non-finite or negative number, the output never contains `NaN`/`Infinity`/a negative"* (`I-9`); (iv) *"for **every** sink whose `setProperty` throws, no key reported applied is a key whose write failed"* (`I-3`) — **now explicitly including a re-entrant inner call (`F-14`) and a reused projection (`I-11`/`M-21`)**. §3 samples each with fixed tables. **None is proven by its sample**, and this spec says so — (iii) and (iv) are exactly the classes a generator would serve, and **they stay unproven**. |
| Could this unit execute them **as properties**? | **No, and not for a reason of effort:** the harness does not exist, and **adding `fast-check` is a `devDependencies` change** — outside §5.1's diff scope and a gate of its own. **This unit may not smuggle a property runner in.** |
| Do the layers permit a property run here? | **Yes in principle** for (i)…(iv): they are pure `[T]` claims over injectable arguments, and a fake sink makes (iv) trivially drivable. **The blocker is the harness, not the layer** — stated rather than hidden behind a layer claim. **The one claim that stays layer-blocked is the `[U]` one** (a real custom-property value). |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`I-7` = the no-throw drive, `I-1` = the partition drive, **`F-4A`/`F-4B`/`F-12`** = the numeric-boundary **and** accessor-throw drives, **`F-13`** = the prototype-shaped-key drive, **`F-14`/`F-15`** = the re-entrancy/immutability drives, `F-5` = the sign-boundary drive, `F-7`/`F-8` = the write-failure drive). **A strategy id here is a repeat-drive label, not a property id.** *(**⟶ CORRECTED 2026-09-27: the pre-ruling row named `F-4`/`F-5` for the numeric drive; `F-4` is now the SPLIT `F-4A`/`F-4B`, so this drive names both halves and the ruling pack's `F-12`/`F-13`/`F-14`/`F-15`.**)* |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The four quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-7` + `F-1`..`F-15` (totality — **the range endpoint moved from `F-11`
   to `F-15` on 2026-09-27**, the ruling pack's `F-12`..`F-15` being part of the same no-throw drive),
   `I-1` (partition — **now driven also over the prototype-shaped names by `F-13`**), `F-4A`/`F-4B`/
   `F-12`/`F-5`/`I-9` (the numeric bound **and the accessor-throw class**), `I-3` + `F-7`/`F-8` (the
   no-false-applied drive — **now extended by `F-14`'s re-entrancy and `M-21`'s reuse**).
3. **No `fast-check` and no generator is added by this unit.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`). **`P-SM-2` (the pin unit's value-space property) is the nearest relative and is
   NOT extended or duplicated here** — it is that unit's row, and copying it would be a second
   authority over a landed register.

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a projection cannot be computed without
reading an environment value, or an applier cannot make a decision for every input without throwing,
then the two-half split fails and the unit fails.* The falsification tests are **`I-4`** (purity under
frozen inputs), **`I-7`** (no input throws) and **`I-1`** (the partition). **A "read
`getComputedStyle` to skip unchanged values" optimisation would satisfy the unit's apparent purpose
while failing `I-6`** — that is the named failure mode, not a judgement call.

**A second, independent falsification.** *If the projection half cannot be specified without the
census half, then the A-d4 split is not realisable.* The test is the **signature row** (`A-15`): if
`project` needs a `zones`/`census`/`revealed` parameter to be usable, the split fails and the finding
belongs to the architect (a **new gate**), not to this unit.

**The ruling pack sharpens the falsification and adds NO new outcome.** The 2026-09-27 rulings
(`I-11`..`I-14`) are **falsifiable in the same three ways**, so the exhaustive outcome list below is
**unchanged**: **`I-11`** (a projection whose second call differs from a first call ⇒ reuse is not a
value property), **`I-12`/`I-13`** (a caller-supplied name that vanishes from `applied` or whose
record has a non-null prototype ⇒ the record rule is not total), and **`I-14`** (a projection that
changes after a call, or a re-entrant call that moves a key across results ⇒ the immutability/ruling
boundary is broken). **Each of those is a clause-level failure of this spec, not an environment
question** — and, per §0A note 4, a re-entrancy case that breaks `I-3` is escalated as **`BLOCKING`**
rather than quietly guarded.

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; (c) the unit is **routed back** — admissible only if the
projection half is shown to be inseparable from the census half, which would be a finding against
A-d4's split and therefore a **new gate**, not this unit's call (`H-r1`'s cite-and-supersede rule).
**A FOURTH outcome that is NOT admissible** (recorded because the ruling pack makes the temptation
concrete): **inventing a guard, a denylist, a name-legality rule or a tenth-skip-reason to "fix" one
of the four ruled inputs** — that is **a new contract needing its own gate** (§4.4 `S-9`/`S-10`/`S-11`),
not an implementation choice.

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` →
   `U-LISTHOST` → `U-SLOTHOST` first), and on its red set** (§0 ruling 8, §4.5). **⟶ SUPERSEDED ON ITS
   GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the sentence above is kept visible): the
   wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`; the surviving
   blockers are the wave-D order (this unit lands LAST) and its own red set.**
2. **THIS IS THE PROJECTION HALF ONLY, and `U-CENSUS` is a separate wave-E unit.** The
   `computeTrackVars(zones, census, sizes, revealed, specOf)` half **exists in the plan** (its refile
   is WITHDRAWN, §1.2) but it is **not this unit's**, and this unit's diff scope **excludes its
   subject matter**. **A later pass that merges the two halves repeats the multi-unit batching RCA-2
   forbids and blurs two different layer questions.**
3. **The token-formatting authority question is answered by SPLIT OWNERSHIP, and this file states it
   so it cannot be read as a second authority:** for the **census family** (`U-ZONES`/`U-CENSUS`),
   token formatting is **`U-ZONES`'s** (one authority, not two); for **this unit**, formatting is
   derived from the **caller's own `VarSpec`** and **no module is imported**. **`U-PROJ` does not
   delegate to `U-ZONES`, and `U-ZONES` does not own the projection's strings.**
4. **`H-r17` names this unit as the one that must have no zone vocabulary anywhere** — *"`U-PROJ`
   still takes an injected write sink and consumer-supplied variable names/units … with no zone
   vocabulary anywhere"*. **A row, a fixture, a doc sentence or a symbol that carries a zone/track
   concept is a review finding.**
5. **The `project(values)` form in the amended unit plan is INCOMPLETE, and this spec CORRECTED it by
   naming the second parameter — and the correction is no longer a proposal: THE ARCHITECT HAS
   APPROVED IT (2026-09-27).** The plan's own `U5` row writes *"pure `project(values) → record`"*,
   while the governing `SCH-8` per-item row writes *"variable names and units come from the consumer's
   supplied spec"* and the acceptance line writes *"`project(values) → record` + a total applier"*.
   **A projection cannot obtain caller-supplied names/units without a spec argument**, so this spec's
   signature is `project(values, specOf)` and **the single-argument form is `SUPERSEDED`, recorded as a
   source imprecision, not as an alternative contract** (see §8's correction row). **The sibling
   `U-CENSUS` contract already threads `specOf`**, so the vocabulary is consistent with the family.
   **Where the approval is recorded, named because later passes must cite it rather than re-argue it:
   §8's `CORRECTED` row in this file; the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in
   `docs/decisions.md` (with that file's `AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` note 16); and the
   dated architect-ruling note in the governing gate record
   `docs/specs/provident-electron-shell-chrome-handoff-review.md` (its `SCH-8` row `:291` and its `U5`
   plan row `:354` both read `project(values, specOf)` now, with the as-filed wording kept visible).**
6. **The `[U]` row, if taken, yields ONE measured value and nothing more.** It is **not** a geometry
   proof and **not** an app-green: `U-REALDOM-BOOT`'s honest limits (its `R4` row, `§1.13`) apply
   verbatim — *"A `ui` green proves that a specific probe, executed inside ONE real Electron renderer
   boot under a controlled profile, produced the asserted value — and nothing else."*
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result shapes** — `Projection{applied, skipped}` and
   `ApplyResult{applied, skipped, ok}` (the sources name the *semantics* — "write-or-skip decision",
   "returns exactly the map it applied" — and no field names); (ii) **`unit` is REQUIRED and `''` is
   valid**, while **`format` has the documented default `'unit'`** (the only default this unit may
   have, and it is caller-visible); (iii) **first-wins on duplicate names**, with the second skipped
   (`duplicate-name`); (iv) **the fixed skip-reason precedence** `malformed-spec` → `duplicate-name` →
   `missing-value` → **`accessor-threw`** → `not-a-number` → `negative`; (v) **`-0` is applied as `'0'`
   and is not
   `negative`**; (vi) **the applier trusts its projection** (no re-validation, `M-13`) but **never
   hands a non-string to `setProperty`** (`F-10`); (vii) **a malformed `skipped` list is dropped, not
   fatal** (`F-9`); (viii) **a throwing `setProperty` skips one key and does not abort the run**
   (`F-7`); (ix) **a malformed sink is a total `sink-unusable` skip, never a throw** (`F-6`);
   (x) **`applyVarsToRoot` is an identity alias of `applyProjection`** (`M-14`). **Each is a decision,
   not a derivation — the sources are silent on all TEN.** **⟶ KEPT AT TEN, AND THE COUNT IS
   RECONCILED (2026-09-27): the ruling pack did NOT add an eleventh decision to this list.** What it
   changed is the **status** of four inputs that §7 item 8 recorded as **deliberately unruled** — the
   architect ruled them, so they **stopped being open decisions** and became **pinned contract**
   (`A-11` ⇒ `I-11`; `F-4`'s throwing getter ⇒ the **eighth** union member `'accessor-threw'`;
   `A-3` ⇒ `I-12`/`I-13`; `A-7` ⇒ `I-14`), which **moves the unruled count to ZERO** and leaves the
   decision count at its original **ten**. **They are not appended here as (xi)…(xiv)**: a decision
   item in this list means *"the sources are silent and no ruling exists"*, and that is **no longer
   true** of these four. **The list is otherwise unedited, item (iv)'s precedence line excepted**
   (it gained `accessor-threw`, above).
8. **This spec formerly left FOUR things UNRULED rather than inventing an answer — and ALL FOUR ARE
   NOW RULED (2026-09-27); ⟶ THE COUNT OF UNRULED SEEDS IS ZERO.** The struck-in-place record of what
   was open, kept so the change is auditable: **`F-4`'s throwing getter** (`A-2` — does the
   accessor's throw propagate?), **`A-11`** (is a `Projection` single-use or reusable across sinks?),
   **`A-3`** (the prototype-pollution-shaped key — does the record need a null-prototype?), and
   **`A-7`** (sink re-entrancy) — **the adversarial pass must rule them and record the rulings here.**
   **⟶ SUPERSEDED 2026-09-27 (the architect's ruling pack; §0A carries the four dated notes):**
   **`A-11` ⇒ REUSABLE, a value not a session** (`I-11`, `M-21`/`M-22`); **`A-2`/`F-4` ⇒ the throwing
   accessor is skipped and recorded, never propagated, with its OWN eighth reason `'accessor-threw'`**
   (`F-4A`/`F-4B`/`F-12`, and the vocabulary count moved **seven → eight** everywhere it is stated);
   **`A-3` ⇒ `Object.create(null)` for `applied` and every internal key→value map** (§2.5, `I-12`/
   `I-13`, `F-13`/`M-18`/`M-19`/`M-20`); **`A-7` ⇒ not guarded, the projection is immutable input**
   (`I-14`, `F-14`/`F-15`, §2.3 item 8). **NO SEED OF THIS SPEC REMAINS UNRULED.** Naming an
   unresolved input as unresolved is the contract; silently picking an answer would be the `C-16`
   class (`RK-10` — a contract reverse-engineered from one consumer) — **and the ruling pack is the
   architect's answer to exactly that objection, so it is neither a silence nor an invention by this
   filing.** **What remains OWED is not a ruling but the adversarial PASS itself** (§3a/§3b: it runs
   after the green and re-checks each of these four **against the landed module** — `A-7`'s
   `CONFIRMED-RULED` carries an explicit `BLOCKING` escalation path if a re-entrancy case is ever
   found that `I-3` does not cover).
9. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
   (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.
10. **The `[T]` layer cannot carry a CSS claim** (Layer declaration anchor 2), and the shim cannot
    either: its `style` is `{ cssText: string }` with **no `setProperty`** (`src/shared/dom-shim.ts:9`,
    read). **A `[T]`-green that is read as "the custom property works in the app" is the exact
    false-green class `RK-19`/`RK-16` name, and a review finding.**
11. **This unit asserts no magnitude-equivalence and no removal capability.** §2.3 item 5 states both
    boundaries: a stale property is not cleared, and a removal API is **a different contract needing
    its own gate**.
12. **The `U5` plan row is a PRE-EXECUTION plan, kept as provenance.** Its red-set bullet list is
    the same row set this spec expands (`purity`, `totality`, the non-finite/negative fail-soft pin,
    "returns exactly the map it applied", "the `computeTrackVars` half is absent") — **every one of
    those five is a row here**, and **the fourth is re-anchored as `applied`'s write-LOG meaning**
    (§2.1, §2.3 item 2) rather than left as an unbounded phrase.

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **NOT THIS UNIT** = another unit's contract
or a closed elsewhere row — listed so no later pass routes it here. **CORRECTED** = a source
statement this spec had to amend to be contract-complete; **where a `CORRECTED` row also carries
`ARCHITECT-APPROVED (2026-09-27)`, the amendment is the architect's ruling, not this filing's
proposal** (§7 item 5, the `U5` row below).

| Source row | Section | Status for `U-PROJ` | Where |
| --- | --- | --- | --- |
| `SCH-8`'s **projection half** (`project` + the total applier) | amendment §2.2's `SCH-8` row, §2.1 | **ADOPTED — this unit** | §1, §2 |
| `SCH-8`'s **`computeTrackVars(census, …)` half** | amendment §1.2; `docs/next-steps.md` row **E2** | **NOT THIS UNIT — `U-CENSUS`, wave E** (its refile is WITHDRAWN, so it is *adopted*, not refiled — but **by another unit**) | §0 ruling 1, §1, §7 item 2 |
| **Purity** (same input ⇒ same output, no environment read) | amendment §2.2's acceptance line | **DISCHARGED** as `I-4` + `M-9` | §2.4, §3.3 |
| **Totality** (every input yields a write-or-skip decision, never a throw, never a partial write) | amendment §2.2's acceptance line; the `U5` plan row | **DISCHARGED** as `I-1`/`I-2`/`I-3`/`I-7` + `F-1`..`F-15` (**⟶ CORRECTED 2026-09-27: the range endpoint moved from `F-11` to `F-15`, the ruling pack's `F-12`..`F-15` belonging to the same no-throw drive**) | §2.3, §3.2, §3.3 |
| **The non-finite/out-of-range fail-soft pin** (the fork's F-2 generalized: no `NaN`/`Infinity`/negative in the returned map) | the `U5` plan row's red-set bullet | **DISCHARGED** as the validity rule + `I-9` + `A-1` | §2.4 item 3, §3.2 **`F-4A`**/`F-5` (**⟶ CORRECTED 2026-09-27: `F-4` is the split `F-4A`/`F-4B`; the numeric bound is `F-4A`'s**) |
| **"`applyVarsToRoot` returns exactly the map it applied"** | the `U5` plan row's red-set bullet | **DISCHARGED** as `applied`'s **write-LOG** meaning (`I-3`) **and** the identity alias `M-14` | §2.1, §2.3 item 2 |
| **"the `computeTrackVars(census, …)` half is absent"** | the `U5` plan row's red-set bullet | **DISCHARGED as a structural absence** (parameter list + static import row) | §2.4 item 6, `A-12`, `A-15` |
| **Variable names and units from the consumer's supplied spec** (`(C)#1`-clean) | amendment §2.2's `SCH-8` row | **DISCHARGED** as `VarSpec` (all four fields caller-supplied) | §2.1, §2.2 (prohibitions 1/3) |
| **An injected write sink; the mechanism owns no root and no store** | amendment §2.2's `SCH-8` row; §"Adopted units' security / equivalence obligations" | **DISCHARGED** as `VarWriteSink` (duck-typed, caller-supplied) + `I-5`/`I-6` | §2.1, §2.3, §2.2 (prohibition 4) |
| **`H-r17`'s "no zone vocabulary anywhere" clause, naming `U-PROJ`** | `H-r17` | **DISCHARGED** as prohibition 1 + `A-13` + `A-18` | §2.2, §7 item 4 |
| **Token formatting delegated to `U-ZONES` (one authority, not two)** | amendment §1.1/§1.2 | **NOT THIS UNIT's delegation** — it binds the **census family**; this unit formats from caller `VarSpec` data and imports nothing | §0 ruling 5, §7 item 3 |
| **The `'0px'`-family literal prohibition** | amendment §1.1 (`U-ZONES`) | **NOT THIS UNIT** — but the **same prohibition-3 discipline** applies here (no built-in token) | §2.2 (prohibition 3), `M-8` |
| **`H-r8`'s six-prohibition block** | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| **The amendment's "no new MCP surface" / no-store / no-CSP-change rows** | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative + prohibition 4 | §2.2, `A-16` |
| **`REAL-DOM-UI-GATE-LEG`** (the third leg; the shim demoted to pre-filter; the preferred measurement channel) | `docs/decisions.md:65`, read | **CARRIED** — the optional `[U]` row uses the leg's **existing** channel and makes **no** app-green claim | §5.2, §7 item 6 |
| **`U-REALDOM-BOOT`'s honest limits (`R4`/`§1.13`)** | amendment §1.13 | **CARRIED verbatim-in-substance** as §7 item 6 | §5.2, §7 item 6 |
| **`H-r19`'s hermeticity truth** (isolation YES, headlessness NO, declared with an actionable failure) | `H-r19` | **NOT THIS UNIT's deliverable**, but **binding if the `[U]` row is taken**: no `DISPLAY` ⇒ a prerequisite error naming the fix, never a silent skip | §5.2 |
| **`H-r5` / `S-d3`** (no shim expansion) | `H-r5`, `S-d3`, `H-r7` | **INHERITED-ONLY** — and for this unit it is **stricter**: the shim may not gain `setProperty` | §1, §4.4 `S-2`, `A-17`, §7 item 10 |
| **`RK-10`** (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 7/8 are this unit's answer: **ten recorded contract decisions and ZERO unruled seeds** (**⟶ CORRECTED 2026-09-27: this cell read "four deliberately-unruled seeds"; all four were RULED by the architect's 2026-09-27 ruling pack, so the unruled count is ZERO and the decision count is UNCHANGED at ten**) | §7 items 7–8, §0A |
| **`RK-19`** (geometry unprovable here; the node layer asserts contracts/arithmetic only) | amendment §6 | **CARRIED** — §7 item 10 + `A-20` are this unit's compliance rows | §7 item 10, `A-20` |
| **`RK-16`** (a mis-sequenced census change turns a green suite red) | amendment §6 | **NOT THIS UNIT** (`U-FOCUS-TOOL`'s) — but its **false-green reading class** is `A-20`'s | `A-20` |
| `docs/specs/engine-pin.md` §5.5's register (incl. `P-SM-2`) | that file | **NOT THIS UNIT** — the register is not extended, and `P-SM-2` is **not copied** (a second authority over a landed register is a finding) | §5.5 item 4 |
| Row **D4** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/projection.md` (**OWED — not filed**) — **this filing discharges that cell**; the row stays `BLOCKED`, and its *"`U-CENSUS` is separate"* clause is §7 item 2 | this file |
| Row **E2** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table | **NOT THIS UNIT** — `U-CENSUS`'s own row, whose spec is `docs/specs/census.md` (`OWED — not filed`) | §0 ruling 1, §4.3 |
| `docs/specs/projection.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| **The `U5` plan row's `project(values) → record` form** | the amended unit plan (`U5`) | **CORRECTED — AND THE CORRECTION IS NOW ARCHITECT-APPROVED (2026-09-27)**: this spec's signature is `project(values, specOf)`, and the plan's single-argument form is `SUPERSEDED` (kept as the source text, not deleted), because a projection cannot obtain caller-supplied names/units without a spec argument (§7 item 5). The approval is recorded as this row + §7 item 5 + the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in `docs/decisions.md` (its note 16) + the gate record's dated ruling note (its `SCH-8` row, `provident-electron-shell-chrome-handoff-review.md:291`) | §2.1, §7 item 5 |
| **Seed `A-11`** (is a `Projection` single-use or reusable?) — §3a's seed set | §3a, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — a `Projection` is REUSABLE: a value, not a session.** Discharged as **`I-11`** + §2.3 item 1 + `M-21`/`M-22`; it **follows from** `A-7` and is **consistent with** `I-5`/`I-8` | §0A note 1, §3.3 `I-11`, §3.1 `M-21`/`M-22` |
| **Seed `A-2` / `F-4`'s throwing getter** (does the accessor's throw propagate?) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED; §3b named it a `CONTRACT-AMENDED` candidate**) | **RULED (2026-09-27) — the throwing accessor is SKIPPED and RECORDED, NEVER propagated.** The spec chose the **eighth** union member **`'accessor-threw'`** over reusing `'not-a-number'` (which would **silently conflate** *"not a number"* with *"could not read it"*); discharged as the **7 → 8 vocabulary change** (§2.1/§2.2/§2.4 item 3), the **`F-4` SPLIT** into `F-4A`/`F-4B`, **`F-12`**, and §8's totality-range correction (`F-11` → `F-15`) | §0A note 2, §2.1, §2.2 prohibition 1, §2.4 item 3, §3.2 `F-4A`/`F-4B`/`F-12` |
| **Seed `A-3`** (the prototype-pollution-shaped key — does the record need a null-prototype?) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — `Object.create(null)` for `Projection.applied`, `ApplyResult.applied` and every internal key→value map**, with every caller-data key lookup an **own-property** lookup. The analysis + the four rejected alternatives are §0A note 3; the rules are **§2.5**; discharged as **`I-12`/`I-13`** + `F-13`/`M-18`/`M-19`/`M-20`; **no new skip reason and NO name-legality policy** (names are caller data — prohibition 3) | §0A note 3, §2.5, §3.3 `I-12`/`I-13`, §3.1 `M-18`/`M-19`/`M-20`, §3.2 `F-13` |
| **Seed `A-7`** (sink re-entrancy) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — SKIP: the projection is IMMUTABLE INPUT and NO re-entrancy guard is held.** A consumer wanting different writes builds a **NEW** projection; a re-entrant `setProperty` yields **call-local** results per `I-5`/`I-8`/`I-11`; **no ordering hazard the invariants do not cover was found, so nothing is owed** — and the seed is discharged as **`CONFIRMED-RULED`** (§3b) with an explicit `BLOCKING` escalation path if that ever changes. Discharged as **`I-14`** + §2.3 item 8 + `F-14`/`F-15` | §0A note 4, §2.3 item 8, §3.3 `I-14`, §3.2 `F-14`/`F-15`, §3b |
| **§3a's seed set as a whole** (`A-1`..`A-20`) | §3a (**the pass has NOT run**) | **THE FOUR UNRULED CONTRACT-INPUT SEEDS ARE RULED, AND NO CONTRACT-INPUT SEED REMAINS UNRULED.** What is still **OWED is the adversarial PASS itself** — it runs **after this unit's green** (RCA-3) and must re-check the four against the **landed module**, fill §3b, and record any **new** finding for the remaining behaviour seeds (`A-1`, `A-4`..`A-6`, `A-8`..`A-10`, `A-12`..`A-20`), which are **questions for a pass, not contract decisions awaiting a ruling** | §3a, §3b, §7 item 8 |

**Cross-file citation findings this pass found and did NOT fix (not this unit's files; report, do not
silently reconcile).** Each was read in this pass:

| Claim as written | Verified state (read 2026-09-27) |
| --- | --- |
| `package.json:23` = the `provident-ssr` pin (`docs/decisions.md` note 2 at `:322`, and several spec/queue cells) | **STALE.** `:23` is `@modelcontextprotocol/sdk`; **`"provident-ssr": "^0.5.1"` is at `:24`**. `docs/decisions.md`'s own note 2 cites the stale anchor **in the same sentence** that corrects its substance |
| `package.json:25-31` / `:25-31` = the `devDependencies` block (`docs/decisions.md` note 2 at `:334`; the `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED` row at `:101`) | **STALE as a range.** `"devDependencies"` opens at **`:26`**; the **five** keys run **`:27`-`:31`**; `:32-34` is the installer-owned `allowScripts` block |
| `package.json:18` = the `divergence` script, and "`battery:17`/`divergence:18`" (amendment §1.11; `REAL-DOM-UI-GATE-LEG` at `docs/decisions.md:65`) | **VERIFIED for `:18`**; the same sentence's **`ui` leg is at `:19`** — this spec cites **`:19`** for `npm run ui` and does not repeat the pair's `:17`/`:18` shorthand without the read anchor |
| `src/decisions`-style anchors for `MUTATING_METHODS` (the amendment's prohibition-5 family) | **STALE.** The set is at **`src/renderer/renderer.ts:12`**, not in `src/main/mcp-server.ts` — seven members, read |
| `src/shared/types.ts:259-280` (`RpcMethod`, **21** members) | **VERIFIED in substance** — the union is `:259-281`, **21** members; `RpcRequest` begins at `:282` |
| `src/main/mcp-server.ts:281-303` (`ALL_TOOLS`, **21** names) | **VERIFIED** — declared `:281`, 21 names `:282-302`, closed `:303` |
| `tests/engine-pin-version.test.ts:174-197` (the `RpcMethod` census, asserted **21**) | **VERIFIED** — `RPC_METHOD_CENSUS` `:174-196`, `expect(…).toBe(21)` at `:197` |

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor cited
above was **read in this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` — 143
lines, `:9`; `package.json:10`, `:19`, `:24`, `:26-31`; `tests/engine-pin-version.test.ts:174-197`;
`docs/decisions.md:53`, `:54`, `:65`, `:101`, `:294`, `:322`, `:334`). **`docs/next-steps.md` is
cited by row id only** — that file's own convention forbids line citations.

**Citation hygiene — the RULING-PACK pass (2026-09-27), stated separately so the two passes stay
auditable:** the anchors this pass **re-read and added** are `src/shared/dom-shim.ts:9` (re-read:
`style: { cssText: string }`, no `setProperty` — the M-20/§2.5-item-6 contrast rests on it),
`package.json:8-21` (the scripts block — `ui` at `:19`, `divergence` at `:18`),
`package.json:22-35` (**`"dependencies"` opens `:22`; `:24` = the `provident-ssr` pin; `:26-31` =
`devDependencies`' key set, five keys; `:33-35` = `allowScripts`**), and a **glob over
`docs/skills/*`** for the page-design layer (§7 item 9, §8's second archival-loop check). **Every
`docs/decisions.md` citation this pass relied on** (`:230`, `:231`, `:233`, `:235`, `:301-413` — the
insertion notes and the amendment list) was **read directly**; **the four new ACTIVE rows and note 17
are appended so that no previously cited `docs/decisions.md:<n>` anchor moves.**

**Archival-loop check (`AGENTS.md` item 6): the FILING archived, moved and repointed NOTHING.** It
creates one new spec file and edits no existing document. **Row D4's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent.

**Archival-loop check, SECOND pass (`AGENTS.md` item 6 — this is the 2026-09-27 RULING-PACK pass, and
the sentence above is kept as the FILING pass's record). This pass edits exactly TWO files and creates
nothing:** this spec (`docs/specs/projection.md` — the four rulings landed in §0's table + the new
**§0A**, §1, §2.1, §2.2, §2.3, §2.4, **§2.5**, §3.1, §3.2, §3.3, §4.2, §4.4, §5.5, §6, §7 items 7/8,
§8 and §3a/§3b) and **`docs/decisions.md`** (the four new ACTIVE rows + trailing **note 17** in its
`AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` list). **No third document was touched** — `src/**`,
`tests/**`, `scripts/**`, `docs/next-steps.md`, `docs/pending.md`, `docs/defects.md`,
`docs/HANDOFF.md` and the governing gate record are **untouched by this pass**, so **nothing is
archived, moved or repointed**, and **every `docs/decisions.md:<n>` citation in this file still
resolves** (the new rows are **appended after the last cited anchor**, per that file's own insertion
note — the same rule the `INSERTION NOTE` and `SECOND INSERTION NOTE` state). **`docs/next-steps.md`
is still cited by row id only.** **`docs/skills/designing-pages.md` still does not exist** (globbed
again this pass: `docs/skills/*` → `process-guardrails.md` alone), so the page-design layer, its
test-use-case coverage matrix and its demo-page index have **nothing to update** (§7 item 9). **The
one staleness this pass could NOT fix, restated because it is now older:** `package.json:25-31` is a
**stale range for `devDependencies`** — re-read this pass, `"devDependencies"` opens at **`:26`** and
the five keys run **`:27`-`:31`** (`:23` = `@modelcontextprotocol/sdk`, **`:24`** = the `provident-ssr`
pin) — and §5.5's own anchor cites it; **this spec quotes `:26-31` where it must, and the stale range
stands in the other documents, which are not this pass's to edit** (report, do not silently
reconcile).

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-PROJ`** (this pass is the spec-filing
pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to review — RCA-3
runs *after* a unit's green). **This table is the SEED SET for the pass that will run; no row below
is a finding, and none may be cited as one.** **⟶ UPDATED 2026-09-27 (the architect's ruling pack): the
four seeds that were *contract inputs awaiting a ruling* — `A-2`, `A-3`, `A-7`, `A-11` — are now
marked in place as RULED, with the clause each ruling landed in named. That marking does NOT discharge
the adversarial pass**: the pass still runs after the green and re-checks each of the four against the
**landed module**, records its disposition in §3b, and examines the **remaining** behaviour seeds
(`A-1`, `A-4`..`A-6`, `A-8`..`A-10`, `A-12`..`A-20`), which are **questions for a pass rather than
contract decisions awaiting a ruling** (§7 item 8, §8's last ruling row).

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | **The numeric boundary table, exhaustively:** `NaN`, `±Infinity`, `-Infinity`, `-0`, `0`, `Number.MIN_VALUE`, `Number.MAX_VALUE`, `1e21`, `1e-21`, a `BigInt`, a numeric string, a `Symbol`, a function. Does **any** of them put a non-finite or negative string into `applied`? | `[T]` |
| **A-2** | **A getter that throws** and a **frozen** `values` object with an accessor — does `project` propagate, swallow, or corrupt? **⟶ RULED 2026-09-27 (architect's ruling pack, §0A note 2): CAUGHT PER KEY and recorded as the EIGHTH skip reason `'accessor-threw'` — the throw is NEVER propagated, one bad key never aborts a projection (§2.4 item 3, `F-4B`/`F-12`). The pre-ruling text of this seed — *"`F-4` is deliberately unpinned on this; the pass must rule it and record the ruling here"* — is SUPERSEDED: `F-4` is now SPLIT into `F-4A`/`F-4B` and the behaviour is PINNED. The pass that runs after the green re-checks the ruled behaviour against the landed module and records the disposition in §3b.** | `[T]` |
| **A-3** | A prototype-polluting key (`'__proto__'`, `'constructor'`, `'prototype'`) as a **spec key** and as a **`name`** — does the projection's record become a polluted object, or is the write emitted normally? **⟶ RULED 2026-09-27 (§0A note 3): the record is built on `Object.create(null)` (`I-12`/`I-13`, §2.5) — every caller-supplied name is an OWN key, no prototype is written, and `I-1`'s partition holds (`F-13`/`M-18`/`M-19`/`M-20`). The analysis and the rejected alternatives are §0A note 3; the pass re-checks the LANDED record.** | `[T]` |
| **A-4** | A **huge** spec set (10⁴ keys) — any quadratic path, and is the order still deterministic? (A **performance** observation, not a property claim.) | `[T]` |
| **A-5** | A `name` containing whitespace, a `;`, a `}`, a newline, or a `url(…)` — is it emitted **verbatim** (the contract) or sanitized (a policy default)? **Verbatim is the contract**; sanitizing is a **prohibition-3 finding**. | `[T]` |
| **A-6** | A `unit` containing a `;`, a `}`, or another property declaration — same question, same contract answer. | `[T]` |
| **A-7** | A `setProperty` that **re-enters** the applier (the sink calls back into `applyProjection`) — state coherence, and is the write count still one per key? **⟶ RULED 2026-09-27 (§0A note 4): NOT GUARDED — the projection is IMMUTABLE INPUT and results stay CALL-LOCAL per `I-3`/`I-5`/`I-8`/`I-11` (`I-14`, §2.3 item 8, `F-14`/`F-15`); the write count stays one per key per call. NO ordering hazard the invariants do not cover was found, so nothing is owed — an `I-3`-breaking case would be escalated `BLOCKING`.** | `[T]` |
| **A-8** | A `setProperty` that is a **getter returning a new function each access** — is the method called at most once per key (no double property access)? | `[T]` |
| **A-9** | A sink whose `style` is a **Proxy** that throws on the first access — total skip or throw? | `[T]` |
| **A-10** | A projection object the caller **mutates between** `project` and `applyProjection` — does the applier see the mutation (it must, it reads its argument) and does it **re-format** anything (it must not)? | `[T]` |
| **A-11** | A projection reused for **two** sinks — is it consumed (mutated) or reusable? **⟶ RULED 2026-09-27 (architect's ruling pack, §0A note 1): REUSABLE — a `Projection` is a VALUE, not a session (`I-11`, §2.3 item 1, `M-21`/`M-22`); no consumption, no per-projection state, and every call must be equivalent to a first call with that value. The pre-ruling text — *"Must be ruled (this spec does not decide whether a `Projection` is single-use)"* — is SUPERSEDED.** | `[T]` |
| **A-12** | **The `U-CENSUS` boundary probe:** does the module read a census, a `zones` set, a `revealed` flag, or import any zones/census/`U-ZONES` module? **Any positive is a scope violation** (ruling 1/5). | static |
| **A-13** | **The zone-vocabulary probe:** does any `name`, `unit`, default, union member, doc sentence or test fixture in this unit carry a zone/track/pane/tab name (`H-r17`)? | static |
| **A-14** | **Static/unauthorized-access sweep:** `querySelector*`/`getComputedStyle`/`getPropertyValue`/`document`/`window`/`matchMedia`/`activeElement`, any `src/renderer/**` or `src/main/**` import, any `electron`/`node:fs`, any store, any module-level mutable state, any ambient read (`Date`/`Math.random`/`process.env`). | static |
| **A-15** | **The signature probe:** does `project` take exactly `(values, specOf)` — no `census`/`zones`/`sizes`/`revealed` parameter, and no options object that could smuggle one in? | static + a type-level row |
| **A-16** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? | `[H]` + static |
| **A-17** | **The shim-scope probe:** does anything in the change set touch `src/shared/dom-shim.ts`, or require a member the shim lacks (`setProperty`, `getComputedStyle`)? | static |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-ZONES` responsibility (the `'0px'`-family empty token, emptiness arithmetic), any `U-CENSUS` responsibility (key-set-`zones`, delegation to `U-ZONES`), or any `U-SLOTHOST`/`U-LISTHOST` responsibility? **Duplication is a FINDING** — `U-ZONES`/`U-CENSUS` are wave E and own token authority for the census family. | static + `[T]` |
| **A-19** | **The removal-shaped input probe:** can a caller express "remove this property" through any path — an empty string value, a `null`, an absent key? **Each must land in `skipped`, never as a removal write** (§2.3 item 5). | `[T]` |
| **A-20** | **The false-green probe (`RK-16`'s class):** could a green `[T]` suite be read as "the dashboard's custom properties work in the app"? Does the DONE row and this spec say otherwise in those words? | doc + `[T]` |

## 3b. The adversarial pass's disposition table — **the shape this contract will be reconciled to**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3. **⟶ Its three named candidates are SPENT:** `A-2`, `A-11` and `F-4`'s getter clause were **RULED and the spec AMENDED on 2026-09-27** (§0A notes 1/2; `F-4` split into `F-4A`/`F-4B`, with the pre-ruling sentence kept visible in `F-4B`). **A later pass may still use this status for a NEW gap** — it is not retired, only its current examples |
| **CONFIRMED-RULED (2026-09-27 — the architect's ruling pack; recorded pre-green so the disposition is not left implicit)** | **`A-11`** (a `Projection` is **reusable** — `I-11`), **`A-2`/`F-4`** (a throwing accessor is **skipped and recorded** as **`'accessor-threw'`**, never propagated — `F-4A`/`F-4B`/`F-12`), **`A-3`** (**`Object.create(null)`** for the records and every internal map — `I-12`/`I-13`, `§2.5`), **`A-7`** (**no re-entrancy guard**; the projection is **immutable input** — `I-14`), **and `A-7`'s ordering question specifically: no hazard the invariants do not already cover was found, so NO guard is owed** (an `I-3`-breaking case would be escalated `BLOCKING`) |
| **BLOCKING — SCOPE** | `A-12`/`A-13`/`A-18`/`A-15` returning positive: **the unit does not land** until the census/zone surface is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; the package is never patched |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

