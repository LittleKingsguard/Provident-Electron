# STEP-0 ADOPTION DOSSIER — the vocabulary of the data-ownership model, as `U-STORE-CORE` adopts it

**Unit `U-STORE-CORE` · wave `G` · ledger row `G1` · ADMITTED 2026-10-01 by the architect's third-round ruling
`R3-7` · contract `docs/specs/store-core.md` · filed 2026-10-01.**

**A GATE-1 INPUT AND AN ENTRY CONDITION, NOT A CONTRACT.** This dossier satisfies the STEP-0 obligation the
gate-1 record **`docs/specs/data-ownership-model-review.md` `§5`(c)** fires and records as **OWED by
`U-STORE-CORE`**, and it satisfies that record's condition **`C-2`**. **It pins no behaviour**: every
behavioural clause of this unit lives in `docs/specs/store-core.md`. **It adopts no identifier, relaxes no
prohibition and moves no ledger count.**

**STATUS OF ALL ROWS: `defined`.** **The gate's own check is met — an `undefined-until-answered` row would
block the spec gate** (the record's `§5`(c), `§5`(d)). **No row below is `undefined-until-answered`, none is
`OWED`, and none is carried as an open question.** Rows that could **not** be resolved from the plan's bytes
are **raised as decision requests in `docs/specs/store-core.md` `§7a.1`** and are marked in that file's
register, **not** silently answered here.

**TWO HARD BOUNDS ON THIS FILE, STATED SO THEY ARE NOT OVER-READ.** **(1) THIS PASS WROTE TWO NEW FILES AND
EDITED NOTHING** — `docs/specs/store-core.md` and this file. **No `src/**` byte, no `tests/**` byte, no
tracker row, no `docs/next-steps.md` count, no sibling spec and no config moved.** **(2) NOTHING WAS RUN**:
no `npm test`, no leg, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, **no
`git` command** and **no commit**. **Every behavioural claim in this file carries a layer label**
(`RCA-12`): `[H]` (this repo's `src/**`), `[T]` (the node suite / pure module), `[D]`, `[U]`, `APP`. **This
dossier's own claims are `[H]` or cited-at-their-own-row; it contains no `[U]` and no `APP` claim.**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** No count in this
file is invented: each is either this pass's own read at a named section/row, or a figure quoted from a
named artifact with that artifact's ownership stated.

---

## 1. THE EIGHT ADOPTED IDENTIFIER ROWS

**THE BASE IS THE RECORD'S OWN `§5`(c) TABLE, whose eight rows are printed there and are carried
one-for-one below without addition, merge or drop.** **ORIGIN: each identifier originates OUTSIDE this
project, in the architect's own words, quoted at `docs/specs/data-ownership-model-plan.md` `§0` and pinned by
that plan's own clauses.** **THE OWNERSHIP COLUMNS ARE THE RECORD'S MANDATORY FORM: *"who supplies / who
evaluates — never as a definition"*** (the record's `§5`(c), last sentence; the precedent for why the column
is mandatory is `docs/pending.md` §L `P-5`, where the adopted identifier `threshold` collided with three
landed prohibition tables and **no gate step grepped for it**).

| # | Identifier | Kind | What it measures / decides | Unit | Its domain, and the values OUTSIDE it | The observable that proves it | The clause that pins it | SUPPLIES | EVALUATES | Source citation (mandatory) | STATUS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **`A-1`** | **`file`** | tier token (a reference's FIRST segment) | the highest-durability of the three non-security tiers; the tier whose values survive a process exit and whose bytes `main` writes | this unit's contract (`U-STORE-CORE`); the carrier is `U-STORE-PERSIST`'s | **IN DOMAIN:** the exact lowercase token `file` as a name's first segment, a tier whose table is in the renderer realm. **OUTSIDE:** `File` (case-sensitive — refused), any other spelling, and any use of the token as a VALUE rather than a segment | a `read`/`get` answering `tier:'file'`; a store handle whose `tier` member reads `'file'`; the residency trie's `has(tier,'file.p')` | plan `§1.1` store 1 · `§1.3` grammar · `§1.8` `G-3`/`G-5` · `docs/decisions.md` `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | the **architect** (the four-store sentence) | this **contract** (the closed token set, the tier check, the precedence) | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1); `docs/specs/data-ownership-model-review.md` `§5`(b) | **`defined`** |
| **`A-2`** | **`mem`** | tier token | the middle tier: realm-scoped state that must outlive a lower tier's lifetime but need not survive a restart | this unit's contract | **IN DOMAIN:** the token `mem` as a first segment, tier-local. **OUTSIDE:** `MEM`, any other spelling, and any claim that a `mem` value survives a realm teardown | a `read` answering `tier:'mem'`; the tier handle's own `has` answering `true`; a realm teardown's release row | plan `§1.1` store 2 · `§2.1`/`§2.5` realm tables · `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | the **architect** | this **contract** | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | **`defined`** |
| **`A-3`** | **`temp`** | tier token | the lowest tier: per-episode in-flight state, cleared by the episode's end, by a commit to any higher tier, and by a realm teardown | this unit's contract | **IN DOMAIN:** the token `temp` as a first segment. **OUTSIDE:** any other spelling; any claim that a `temp` entry outlives its episode without a promotion to a higher tier | a `read` answering `tier:'temp'`; a `sweep` receipt whose `cleared[]` names temp references; the tier's entry count returning to `0` after the terminal sweep | plan `§1.1` store 3 · `§1.4` `C-5` · `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | the **architect** | this **contract** | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | **`defined`** |
| **`A-4`** | **`secure`** | tier token **and** the refusal prefix | the access-controlled, file-persisted security cache, `main`-only and OUTSIDE the fall-through read; **the token is also the trigger of the generic surface's typed refusal** | this unit's contract for the refusal **only**; the tier itself is `U-STORE-SECURITY`'s | **IN DOMAIN:** the token `secure` as a first segment. **OUTSIDE:** any renderer read of a `secure.*` VALUE through the generic surface (refused, `reason:'secure-refused'`, and refused BEFORE the registry is consulted) | a `read`/`subscribe`/`remove`/`clear`/`set`/`commit` on a `secure.*` name answering a TYPED REFUSAL with `reason:'secure-refused'`, while the tier's OWN `get` on the same name answers | plan `§1.3` `R-4` · `§1.8` `G-6`/`H-3`/`H-4` · `§3.8` · `docs/specs/mcp-endpoint.md` `§6.4`; layer 1 `§5` `A-7`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | the **architect**; the tier's own API: `U-STORE-SECURITY` | this **contract** (the refusal and its precedence) | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) and clause (2) | **`defined`** |
| **`A-5`** | **the per-tier `get`/`set` surface** | an API kind, not a token | decides that a reference can be addressed AT ONE TIER, without the fall-through and without a commit's clears | this unit's contract | **IN DOMAIN:** `get`/`has`/`set`/`clear` on a store handle, each tier-local. **OUTSIDE:** a tier-local surface that falls through to another tier, that merges, or that clears down — **none of which any tier-local call does** | a tier handle's `get('x')` on a name absent at that tier answering `{found:false}` **while `read('x')` at another tier hits** | plan `§1.1` stores 1–3 get/set cells · `§1.8` `H-5`/`H-6` · `§1.9` (v) | the **caller** (the name and the tier it names) | this **contract** (the four members' shapes and the registry consultation) | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | **`defined`** |
| **`A-6`** | **the layered `read`** (with its `value` / `cache` / `name` members) | an API surface and a return shape | decides WHICH TIER answers: an unqualified name is searched `temp` → `mem` → `file` and answers the FIRST hit; a qualified name addresses ONE tier and does not fall through | this unit's contract | **IN DOMAIN:** a caller's dotted name; the first-hit record. **OUTSIDE:** an invented default on a miss, a throw on any declared-domain name, and a second tier consulted after the first hit | `read('p')` answering the tier that holds `p`, with `cache` IDENTICAL (`toBe`) to the tier handle's own object | plan `§1.2` (`{value, cache, name}`; the miss shape) · `§1.9` (v) · `docs/decisions.md` · `QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION` and · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2) | the **caller** (the name) | this **contract** (the search order, the terminator, the miss) | the architect's words, plan `§0` (`B-1`, quoted at `§1.2`); `docs/decisions.md` · `QUALIFIED-READ-…` clause (1) | **`defined`** |
| **`A-7`** | **`commit`** | a write operation | decides that a write to a higher tier CLEARS the same LOGICAL PATH in every lower-durability tier, AFTER the higher tier accepted, and clears nothing when refused | this unit's contract | **IN DOMAIN:** a tier-qualified name plus a value of any type including `undefined`. **OUTSIDE:** an unqualified `commit` (refused); a clear of a HIGHER tier (never); a clear by suffix or by shape (refused as a second authority); a clear on a refused write (nothing is cleared) | a `commit` receipt whose `cleared[]` names exactly the lower residents of the same logical path, and a subscriber on a cleared lower reference observing its own `cause:'clear'` event | plan `§1.4` `C-1`…`C-5` and its round-2 `C-4-R` block; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | the **caller** (the name and the value) | this **contract** (the clear rule, the order, the non-destructive posture) | the architect's words, plan `§0`; `docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) | **`defined`** |
| **`A-8`** | **`subscribe` and the reference-listener paradigm** (with the `{subtree}` opt-in arm) | an API surface and an event paradigm | decides that a change to a REFERENCE notifies the listeners registered on THAT reference, and that an ANCESTOR is notified only for a subscription that opted in with `{subtree:true}` | this unit's contract | **IN DOMAIN:** a subscription on a declared reference; the `{subtree:true}` opt-in; a listener callback. **OUTSIDE:** an ancestor notified without the opt-in; a descendant event carrying a value; a listener that throws reaching the mutator's caller; a subscription that outlives its realm | the delivery count per reference (exactly `1` per subscribed reference per event, and exactly `1` subscription after `N` generations); a `descendant` event carrying `origin` and no value | plan `§1.5` and its round-2 `B-6` block · `§1.9` (iii) · `§7.1` `S-RH-1`; `docs/decisions.md` · `QUALIFIED-READ-…` clause (2) and · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (4) | the **wiring** (which references it subscribes to, and the opt-in) | this **contract** (the delivery rule, the arm table, the realm scope) | the architect's words, plan `§0` (`B-3`, `B-6`); `docs/decisions.md` · `QUALIFIED-READ-…` and · `FOUR-TIER-DATA-OWNERSHIP-MODEL` | **`defined`** |

**THE ARITHMETIC, WITH ITS TERMS: the record's table prints `8` rows, the plan's `§8.1` round-2 table prints
`6` rows for the round-2 vocabulary, and this dossier carries `8` rows — one per record row. `8` adopted
identifiers, `8` `defined`, `0` `undefined-until-answered`.** **No row was added, merged or dropped to reach
a count** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`, cited by row name: the
`≤8` figure is a component-breakdown SIGNAL, never a ceiling).

**THE SUBSUMPTION RECORD THIS DOSSIER OWES THE TWO SIBLING UNITS, STATED SO A SILENT NON-CITATION IS A
REVIEW FINDING AT THEIR SPEC GATES** (the record's `§5`(c), recorded exemption): **`U-STORE-PERSIST` and
`U-STORE-SECURITY` owe NO separate dossier**, because their adopted vocabulary is a **strict subset** of the
rows above — `PERSIST` consumes `A-1`, `A-4`, `A-7` and `A-8`; `SECURITY` consumes `A-1`, `A-4` and `A-5`.
**Each unit's spec MUST cite this file BY PATH and record the subsumption row by row.**

---

## 2. THE COLLISION BLOCK — EVERY ADOPTED IDENTIFIER CHECKED AGAINST THIS REPO'S LANDED PROHIBITION / VOCABULARY ROWS

**THE FORM IS THE RECORD'S AND IS NOT NEGOTIABLE: each hit is reconciled BY ROW ID as *"banned by row
`<R-id>` for reason `<Y>`; legitimate in this layer because `<Z>`"*. A hit is NEVER reconciled by relaxing a
prohibition; the only other lawful disposition is an EXPLICIT RE-NAME REQUEST, and none is made here.**
**The checked set is cited BY ROW NAME**, because those ledgers are appended-to and their line anchors drift.

| # | The prohibition row hit | Banned by row — FOR THE REASON Y | LEGITIMATE in this layer — BECAUSE Z | Falsifier |
| --- | --- | --- | --- | --- |
| **`K-1`** | `docs/specs/provident-electron-shell-chrome-handoff-review.md` `S-d8` prohibition 4 — *"a UI-config store or any persistence of its own … persisted state is supplied **to** the mechanism"*; with layer 1 `§5` `A-2` | banned by row `S-d8` `(C)#4` for the reason that **a MECHANISM may not acquire a UI-config store of its own** — persisted state is handed TO it | **legitimate in this layer because `U-STORE-CORE` IS NOT A MECHANISM'S STORE — IT IS THE FACILITY ITSELF, AND ITS CLAUSE 1 IS SUPERSEDED EXPLICITLY.** The architect OPENED the gate the old row itself named, as the ACTIVE row **`FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY`** clause (1); that row's clause (2) records that **clauses 2 and 3 of `NO-FOUNDATION-CONFIG-FILE-FACILITY` SURVIVE** — so *"a foundation store is obtainable through its own gate … it may not be smuggled in via a mechanism's own unit"* still binds, **and this unit is that gate's product, not a smuggling** | a store handle appearing in ANY `src/shared/**` mechanism's bytes; a mechanism constructing a store; a store import in any of the seven `PURE` modules (`docs/specs/data-ownership-model-plan.md` `§5.2.7`) |
| **`K-2`** | `docs/specs/container.md` `§2.2` `P-CT-1` with `§2.2`(D) row 7's hazard `H-r15` | banned by row `P-CT-1` for the reason that **the mirror-class taxonomy resurrects `SCH-10`/`SCH-4` under a new name** — `is-empty` / `is-minimized` / `is-revealed` and the fork-origin literal `minimized` | **legitimate in this layer because NOTHING THE STORE OWNS IS A MEMBER OF THAT NAMED SET.** The store ships **no** `is-*` literal, **no** `minimized`, **no** pane/zone/tab token **as its own vocabulary** and **no unit string**; every segment after the tier is the CALLER'S string carried verbatim (plan `§1.3` `R-1`), and the declaration table holds the CALLER'S spellings (`§1.8`'s `R-1`-clean block). **The `ZQ-2` decision is the model's own statement of this**: *"a store whose bytes spell `is-minimized`/`is-revealed`/`minimized` FAILS `P-CT-1`"* | a scan of `src/renderer/store-core.ts` and of the declaration table's bytes finding any `is-empty`/`is-minimized`/`is-revealed`/`minimized` literal, or a `tab`/`pane`/`zone` token **used as store vocabulary** |
| **`K-3`** | `docs/specs/zones.md` `§2.2` `P-1` (the `H-r8` six-prohibition block, row 1) | banned by row `P-1` for the reason that **a mechanism may carry no consumer vocabulary** — no zone/pane/tab/region/dashboard name, no closed union member, no documented default or constant | **legitimate in this layer because the identifiers are the STORE'S and the CALLER'S, never a mechanism's vocabulary**: `file`/`mem`/`temp`/`secure` are the MODEL'S four tokens (a closed domain this contract *tests against*, not a vocabulary it *interprets*), and the declaration rows are the caller's spellings | a store token appearing as a *value* rather than as a name's first segment; a consumer noun appearing as a store-owned literal |
| **`K-4`** | `docs/specs/zones.md` `§2.2` `P-3` | banned by row `P-3` for the reason that **a mechanism may not bake in a decision the consumer owns** — no policy default | **legitimate in this layer because the store's miss INVENTS NOTHING**: a miss is `{found:false, value:undefined, tier:null, name}` and a declared-but-never-written name answers the same miss on every surface (`H-2`, `H-5`/`H-6`), **never an invented default**; and **no store-side clamp exists** (`ZQ-1`: the store refuses names, tiers and caps, **never sizes**) | a registered default answered for a declared-but-unwritten name; any store-side size clamp |
| **`K-5`** | `docs/specs/zones.md` `§2.2` `P-4` — no UI-config store and no persistence in a mechanism | banned by row `P-4` for the reason that **a mechanism must not persist** | **legitimate in this layer because the persistence is the FACILITY'S OWN, DECLARED AND GATED, and it is not a mechanism's**: plan `§5.9` classifies `zones.md` `P-4`'s general-form supersession as **SUPERSESSION (architect-only)**, and `docs/specs/data-ownership-model-review.md` `§5`(c) records that **`P-4`'s general-form supersession has no `docs/decisions.md` row** — **carried there as the architect's, and NOT resolved here**. **What is resolved here is the narrower fact: no `P-4`-governed module acquires a store edge by this unit's admission** (`§5.2.7`'s `7 PURE` modules owe no edge) | a store import in `zones.ts`/`census.ts`/`container.ts`/`gesture-session.ts`/`layout-projection.ts`/`mount-invariant-guard.ts`/`gutter-affordance.ts` |
| **`K-6`** | `docs/specs/census.md` `§2.2` `P-3` and its `A-19` probe | banned by row `P-3`/`A-19` for the reason that **the four consumer decisions are the caller's and the `V-13` closure must stay answerable** | **legitimate in this layer because the store DECIDES NO CONSUMER QUESTION**: `ZQ-3` keeps the `0 ⇒ minimized` mapping in the consumer's `census` + `revealed`, and the store's only contribution is that the predicate's INPUT now has a home and a change event. **The `A-19` fifth question stays MANDATORY** for the `8 STORE-BACKED` modules at `U-STORE-MODULES`' gate, **not here** | a store-owned decision predicate; a store member named after a consumer decision |
| **`K-7`** | `docs/specs/provident-electron-shell-chrome-handoff-review.md` `S-d11` — the MANDATORY geometry clause: *"the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described"* | **NOT a token ban: it is a MANDATORY DISCLOSURE RULE** | **NOT A RELAXATION — THE CLAUSE IS CARRIED VERBATIM, AND WHERE IT BITES IS NAMED.** A store makes geometry claims no more provable than a family module does; **it must not become the place a coordinate finally lives**. `docs/specs/store-core.md` `§2.2` `P-11` carries the clause verbatim and fences exactly two places this unit's charter borders it: **the `ZQ-4` "location"** (an opaque slot key plus a caller-measured distance — **never a coordinate**; `container.md` `§3.4` `R-6`, `§3.3` `I-6`, `zones.md` `§2.3` item 7 / `§3.3` `I-10`) and **the declaration table's own segment `layout`**, which is a **substring of an unparsed caller string**, never a layout fact this unit asserts, measures or claims | any geometry-observation call, coordinate read or geometry-shaped claim in the store's bytes, its declaration table or its own test file |
| **`K-8`** | `docs/specs/gsession.md` `§2.5` — the FROZEN eleven-item delegate surface, under the ACTIVE row `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` | banned by that row for the reason that **the session's delegate surface is the ONE signature list `E3`/`E4` write against and is FROZEN AND COMPLETE** | **LEGITIMATE AND UNTOUCHED: this unit adds NO session member and reads no session state.** The plan's `Q-8` answer is the same shape — *"NO SESSION-LEVEL CHANGE CHANNEL … NO MEMBER IS ADDED to the frozen `gsession.md` `§2.5` delegate surface"* — and `S-RH-1`'s pinned subscription scope removes even the *"re-registered per generation"* story. **The store's `subscribe` is the STORE'S OWN surface, not a session channel** | a new member in the session's delegate list; a store `subscribe` implemented over a session channel |
| **`K-9`** | `docs/specs/mcp-endpoint.md` `§6.4` — the security tier is *"manual-UI-only by construction"*; layer 1 `§5` `A-7` — an agent cannot grant itself capabilities | banned by those rows for the reason that **the MCP tool handlers never route to the security tier** | **LEGITIMATE because the store ADDS NO MCP SURFACE AND REFUSES EVERY `secure.*` NAME ON THE GENERIC SURFACE, BEFORE THE REGISTRY IS CONSULTED** — so a caller learns *nothing* about tier 4's schema from a generic call (plan `§1.8`'s stated reason). `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS` and the preload member set are **UNMOVED by this unit** | a new MCP tool/resource/group/method; a `secure.*` value returned by `read`; a `secure.*` name whose refusal is decided AFTER the registry |
| **`K-10`** | `docs/specs/zones.md` `§2.2` `P-5` — no new MCP surface; the five-seam negative (`§3.4` `R-6`, `A-11`) | banned by row `P-5` for the reason that **a new surface is a new contract with its own gate** | **LEGITIMATE because this unit IS that new contract and its own gate**, and it **registers nothing**: no tool, no resource, no group, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, **no new `scripts` key** (adding one would redden `tests/ui-leg-contract.test.ts`'s `L-1`, which pins the `scripts` KEY SET) | a diff adding any of the five seams; a `package.json` script addition |
| **`K-11`** | `docs/decisions.md` `E10-SINGLE-SINK-CHANNEL` (cited by row name) | that row binds a **composition's single sink writer** and forbids a second writer on the gesture sink | **NO HIT — RE-ASSERTED, NOT RELAXED.** The plan's `§5.3` round-3 block **re-derives** that row's two-readings-agree clause for a count ≥1 per OPERATOR ACTION while leaving the drag's own commit a **one-reference** write that still agrees at `1`. **`U-STORE-CORE` ships neither the sink nor the gesture**; its obligation is the *one receipt row per reference* shape the derivation names | a store write re-using the sink's `1`-per-gesture agreement as its own count; a multi-reference set introduced to *"share the shape"* |
| **`K-12`** | `docs/decisions.md` `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` and `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` | those rows make a typed register **mandatory before the red set** for a code-bearing unit and forbid trimming it to a count | **NO HIT — OBEYED.** `U-STORE-CORE` is code-bearing, so the **zero-row exemption is NOT available** to it: its typed `§5.x` register is authored **with** the contract (`docs/specs/store-core.md` `§5.5.1`), and its row count is an **OUTCOME, not a budget** | a red set delegated without a register; a register row dropped or merged to fit a threshold |

**THE FIVE `PROHIBITED` ENTRIES ARE CARRIED, NOT RELAXED: the mirror-class taxonomy is BANNED, and no row of
this unit uses it.** **AND THE ONE HIT THIS DOSSIER CANNOT CLOSE IS NAMED RATHER THAN SMOOTHED: `K-5`'s
`P-4` general-form supersession has NO `docs/decisions.md` row** (the record's `§5`(c) records the same
absence, and `docs/specs/data-ownership-model-review.md` `§5`(e) item 4 carries the decisions-row half as the
architect's). **It does not block this unit's contract** — this unit's rows bind no `P-4`-governed module —
and it is **`CARRIED` with the architect named as owner and the positive revisit condition *"the next
`docs/decisions.md` pass"*.** **No bare `OWED` appears in this file.**

---

## 3. THE OVERFLOW LIST — THE MODEL'S VOCABULARY BEYOND THE EIGHT, WITH ITS `defined` / `PROHIBITED` STATUS

**NEVER DROPPED, ALWAYS STATUSED.** **A row reading `undefined-until-answered` would block the spec gate;
none does.** **Where an entry's meaning is fixed but its OWN home is another unit's, the CELL says so** —
that is an ownership fact, not an open semantic.

| # | The identifier / mechanism | Status | Where it is defined, or who owns it |
| --- | --- | --- | --- |
| **`O-1`** | the **merged read** and its **`parts`** list (`{tier, path}` pairs; overlay by DESCENDING durability; `tier:null`/`cache:null`/`merged:true`; `parts` names the path **the tier holds**, never the read path) | **`defined`** | plan `§1.9` (ii) and its round-3 clause (a) (the `N-1` path correction); `§4.4`; `docs/decisions.md` · `QUALIFIED-READ-…` |
| **`O-2`** | the **residency trie** (per tier, in-memory, inside that tier's own mutators, no extra write, no extra ping, total) | **`defined`** | plan `§1.9` (i); step 3 `§2.5`. **Its TWO QUERIES are a contract invention**: `docs/specs/store-core.md` `§2.7` pins `holdsExact`/`holdsDescendantBelow`, and `§7a.1` records the architect's confirmation request |
| **`O-3`** | the **pattern table** (two declaration kinds, the matcher's precedence, `G-9` ambiguous table, `G-10` malformed pattern, concrete-beside-pattern, the `secure`-first order) | **`defined`** | plan `§1.8` and its round-2 block (b), its round-3 rows `H-5`/`H-6` |
| **`O-4`** | the **constraint table** + `REPAIR` (kind · evaluated-on · repair action · refusal reason; the zero-active arm; the `≥2` arm; the `R3-1` next-surviving-with-wrap selection and the `remove` referent) | **`defined`** | plan `§1.9` (iv) and its round-3 block; `§1.7` items 3/5; `docs/decisions.md` · `NEXT-SURVIVING-REPAIR-…` |
| **`O-5`** | the **event envelope** + the seven `cause` tokens (`set` · `commit` · `clear` · `sweep` · `remove` · `repair` · `descendant`) and their per-arm member sets | **`defined`** | plan `§1.5` and its round-2 `B-6` block + round-3 block (a) (the arm table is the total statement on `origin`); `docs/decisions.md` · `QUALIFIED-READ-…` and · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (4) |
| **`O-6`** | the **refusal-reason token union** — *"the union's closure is a contract-shape decision the spec makes"* | **`defined` — CLOSED BY THIS CONTRACT, and the closure is a decision request** | `docs/specs/store-core.md` `§2.6` pins the closed union and `§2.6` item 3 the token-mapping table; `§7a.1` item 2 raises the eighth member (`'cap-exceeded'`) as the architect's confirmation request (the plan requires every cap's overflow outcome and states none; the other seven tokens are the record's own) |
| **`O-7`** | **`landing` / `<tabId>`** | **`defined`, and NOT THIS UNIT'S DOSSIER** | plan `§1.7` item 5's round-3 bullet (b) and the reference table; `§1.8`(b)(2)(i)/(3); `G-4`. **Its declarations are the SLICE'S and its home is `U-STORE-FOCUS`'s dossier — a PROPOSAL unit's, not `CORE`'s** (the record's `§5`(c) says so in those words) |
| **`O-8`** | **`storeReferences`** | **`defined`; its HOME is RESOLVED and it is renderer-side** | plan `§1.3` `R-2`'s answered block, `§3.6` `A-6`, `§5.10` `D-4` — all three annotated 2026-10-01; the record's `C-4` row. **The file is `src/renderer/store-references.ts` (NEW) and the host-side `src/main/store-channels.ts` holds CHANNEL-NAME CONSTANTS ONLY** (`docs/specs/store-core.md` `§2.6` item 1 pins it) |
| **`O-9`** | **`remove` · `clear` · `sweep` · `has`** (the plan-minted operations) | **`defined` — MINTED BY THE PLAN, pinned in this unit's contract** | plan `§1.1` store 2's `clear`/`has` cell · `§1.4` `C-5` · `§1.7` item 4 · `§1.9` (v); the record's `§5`(b) "MINTED HERE" clause. **`remove` clears DOWNWARD** (`R3-6`), **`clear` is tier-local and non-recursive**, **a sweep is never reported as a commit** |
| **`O-10`** | the **mirror-class taxonomy** (`is-empty` · `is-minimized` · `is-revealed`; the fork-origin literal `minimized`) | **`PROHIBITED` — NOT ADOPTED** | `docs/specs/container.md` `P-CT-1` with `H-r15`'s hazard; the store's own `R-1` and `ZQ-2` bind it. **A row of this unit that used one FAILS `K-2`** |
| **`O-11`** | the **test-only reset/seed seam** | **`defined` — an INVENTION this contract closes** | `docs/specs/store-core.md` `§2.8` pins its shape, its production-negative row and its status against the register; `§7a.1` item 3 records the alternative (a fresh store per case) and the recommendation |
| **`O-12`** | the **three model-required caps** (tier-2 collections · tier-3 entries · prefix/tier-wide subscriptions) | **`defined` — values pinned as RECOMMENDED and architect-reversible** | plan `§1.1` stores 2/3's failure-mode cells · `§1.5`; the record's `C-7`. **`docs/specs/store-core.md` `§2.9` pins each value AND its overflow outcome; `§7a.1` item 4 raises the values as the architect's confirmation** |
| **`O-13`** | the **`storeReferences` table's own shape** (a declaration row's fields, its two kinds, its load-time refusals) | **`defined`** | plan `§1.8` and its round-2 block (a); `docs/specs/store-core.md` `§2.6` |
| **`O-14`** | the **`StoreEvent`'s `origin` and the `{subtree}` opt-in's default** | **`defined`** | plan `§1.9` (iii) item 2 (`{subtree:true}`; the option's default is `false`) and `§1.5`'s `B-6` arm table |
| **`O-15`** | the **realm-scoped release duty** (`S-RH-1`: one subscription per realm per reference, for as long as the realm lives) | **`defined`** | plan `§7.1`'s `S-RH-1` block; `§6.5`'s `U-STORE-CORE` clause (h); `docs/specs/store-core.md` `§2.5` item 6 |
| **`O-16`** | the **`count-exactly-one` constraint KIND** and the second-constraint interaction rule | **`defined`; the interaction rule is `NW-8`(c)** | plan `§1.9` (iv) row and its row (3) — *"a second one owes its interaction rule before it is declared"*; `docs/specs/store-core.md` `§2.10` pins the rule and **declares exactly ONE row today** |

**THE OVERFLOW LIST'S OWN ARITHMETIC, PRINTED WITH ITS TERMS: `16` entries = `14` `defined` + `1`
`PROHIBITED` (`O-10`) + `1` that is BOTH (`O-11` is `defined` **and** closes an invention).** **No entry is
`undefined-until-answered`.** **Where an entry's CONTENT is `defined` but its OCCURRENCE is another unit's
(`O-7`), the cell says so and does not pretend the entry is open.**

---

## 4. WHAT THIS DOSSIER IS NOT, AND WHAT IT OWES

1. **IT IS NOT A CONTRACT.** It pins no behaviour, no signature, no return shape and no fail-state. **Every
   one of those is `docs/specs/store-core.md`'s**, and a clause of this dossier that could be read as a
   behaviour is read as a **citation to the plan's own clause**, never as a requirement.
2. **IT RELAXES NOTHING.** No prohibition row was amended, annotated or superseded here. **The two rows
   whose general-form supersession the model's own plan classifies as architect-only (`K-1`'s foundation
   facility and `K-5`'s `zones.md` `P-4`) are cited at their LANDED rows by name** — the first is
   superseded by a LANDED ACTIVE row, and the second is **`CARRIED` with the architect named as owner.**
3. **IT INVENTED NO IDENTIFIER.** Every row of `§1` cites the architect's own words at the plan's `§0` and
   the plan's own pinning clause. **The contract's inventions (the trie's two queries, the cap values, the
   reset/seed seam, the refusal union's closure, the declaration fixture's supplier) are named in `§3` as
   THE CONTRACT'S and are raised as decision requests in `docs/specs/store-core.md` `§7a.1` — they are NOT
   presented here as adoptions.**
4. **IT OWES ONE THING IT CANNOT DISCHARGE:** the ARCHITECT'S RULING on the declaration fixture's supplier
   (`docs/specs/store-core.md` `§7a.1` item 1). **This dossier's rows are `defined` either way** — the
   fixture is a TEST artifact, not an adopted identifier — so the row does not block the spec gate; **the
   `C-3` condition's owner is the architect and its status is unchanged by this file.**
5. **THE PROVENANCE OF THIS FILE'S OWN CLAIMS.** **Read for this pass:** `docs/specs/data-ownership-model-review.md`
   in full; `docs/specs/data-ownership-model-plan.md`'s `§0` preambles and round blocks, `§1.1`–`§1.9`,
   `§2.1`–`§2.5`, `§5.1`/`§5.2`/`§5.2.7`/`§5.6.5`/`§5.9`/`§5.9.1`/`§5.10`, `§6.4`/`§6.5`, `§7.1`/`§7.3`,
   `§8.1`–`§8.3`, `§9.1`; `archive/gate1/2026-10-01-DATA-OWNERSHIP-MODEL-gate1-step3-architecture.md` and
   its step-4 sibling; `docs/specs/gutter.md` `§0`/`§2.1`/`§2.2`/`§3.1`/`§3.2`/`§5.1`/`§5.2`/`§5.3`/`§5.5`;
   `docs/specs/zones.md` `§2.2`/`§2.3`/`§5.2`/`§5.3`; `docs/specs/focus-tool.md` `§2.2`(A)–(D);
   `docs/decisions.md`'s `## ACTIVE` rows by name; `docs/pending.md`'s parks region `P-1`…`P-6` and §L;
   `docs/next-steps.md`'s live-counts block and the `G1` row; `docs/FORKER.md` §4's block (iv);
   `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `S-d8`/`S-d11`/`H-r15` rows;
   `docs/specs/container.md` `§2.2`/`§3.3`/`§3.4`. **Globbed and verified free 2026-10-01:**
   `docs/specs/store*` → **no file** (so both this file and `docs/specs/store-core.md` were free);
   `docs/skills/*` → **`process-guardrails.md` ALONE** (so `docs/skills/designing-pages.md`, its test-use-case
   coverage matrix and its demo-page index **DO NOT EXIST — there is nothing to update, and this unit
   renders no page**). **NOT read, therefore not verified and not claimed:** `src/**` beyond the
   `src/renderer/` listing taken to confirm `src/renderer/store-core.ts` is free; `tests/**`;
   `node_modules/provident-ssr/**` (so the `finalizeHookCount` subpath fact is a PRIOR PASS'S read, quoted
   with that ownership); the fork's tree; `docs/HANDOFF.md`; `docs/defects.md`. **Nothing was run and nothing
   was committed** by this pass.

## 5. THE SUCCESSOR'S IN-PLACE AMENDMENT (2026-10-01) — the amendment the successor's `§6.5` item 3(a) owes THIS file

**WHAT THIS SECTION IS, AND WHAT IT IS NOT.** **The successor contract for this unit, `docs/specs/store-core-graph.md`, is
FILED, and its own `§6` carries the STEP-0 determination for that unit plus the two obligations it owes THIS FILE IN
PLACE: its `§6.2`'s re-statuses and its `§6.3`'s one new collision row — each authored THERE BY ROW ID, and each written
HERE by this pass.** **Nothing above this line is rewritten: not one row's bytes, not one status cell, not one count
sentence — every as-filed row of `§1`, `§2` and `§3` stands exactly as filed (`RCA-8(d)`, annotate-beside and never
replace).** **The successor is cited BY PATH, and its own ids (`§6.1`, `§6.2`, `§6.3`, `§6.4`, `§6.5`, `K-13`) are cited BY
ROW ID where they are the artifact the clause is owed to.** **This section is not a contract: it pins no behaviour, and a
clause of it that could be read as one is read as a citation to `docs/specs/store-core-graph.md`'s own row.**

**WHERE THE SUCCESSOR CITES THIS FILE, BY PATH.** **`docs/specs/store-core-graph.md` `§6.1`(a) cites this file's
ALREADY-ADOPTED rows `A-1`…`A-8` as the whole of the successor's adopted vocabulary; its `§6.2` opens *"`docs/specs/store-core-adoption-dossier.md`
is REUSED, NOT REPLACED"*, cites it by path, and reads this file's *"STATUS OF ALL ROWS: `defined`"* as UNCHANGED; and its
`§6.5` item 3(a) carries this amendment as an obligation with an owner and a positive revisit condition.** **Its `§6.1`
also states why the successor's own zero-row rationale is a BLOCK in that file rather than a second dossier: a second
file is not in that package's authority, so this dossier is reused and amended IN PLACE — which is the disposition this
section discharges.** **`§6.1`'s `≤8` paragraph cites `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`
for the same reason this file's `§1` does: the `≤8` figure is a component-breakdown SIGNAL, never a ceiling.**

### 5.1 The eight held rows `A-1`…`A-8`, RE-STATUSED for the successor — BY ROW ID, EVERY AS-FILED CELL KEPT

**The successor's `§6.2` is the authority for this table; each row id is cited there and each amended reading names the
clause that moves it. NOT ONE ROW RE-STATUSES TO `undefined-until-answered`, SO THE SPEC GATE IS NOT BLOCKED BY ANY ROW
OF THIS FILE — which is the condition this file's own opening status line states.**

| The held row | Its status here | Its amended reading, and the clause that moves it (all in `docs/specs/store-core-graph.md`) |
| --- | --- | --- |
| **`A-1`** · `file` | **`defined`, UNCHANGED** | the token survives as the filter's own fourth member; the carrier is now the NODE's flag (`§2.3` item 1) |
| **`A-2`** · `mem` | **`defined`, UNCHANGED** | unchanged in substance |
| **`A-3`** · `temp` | **`defined`, UNCHANGED** | unchanged in substance; the terminal sweep still returns the tier to its floor |
| **`A-4`** · `secure` | **`defined`, UNCHANGED, STRENGTHENED** | the refusal is decided BEFORE the register AND before any traversal, so the separate collection is unreachable by construction (`§2.4` item 5) |
| **`A-5`** · the per-tier `get`/`set` surface | **`defined`, UNCHANGED in substance** | the tier-local surface keeps its meaning; the handle is now a VIEW over the graph, and its identity rule survives (`§2.5` item 3) |
| **`A-6`** · the layered `read` | **`defined` → `defined`, READING NARROWED** | the merged read and `parts` now SURVIVE under the round-3 `DR-11` ruling, so the row's readings that treated the two composing cases as unreachable are read as LIVE, and its own *"OUTSIDE"* column is re-read against a merged arm that is reachable (`§2.5` item 4) |
| **`A-7`** · `commit` | **`defined` → `defined`, SCOPE WIDENED** | *"clears the same LOGICAL PATH in every lower-durability tier"* becomes ONE CLAUSE of a wider transaction — the subtree regeneration (`§2.8` items 2/5/6); the clear rule itself is UNTOUCHED |
| **`A-8`** · `subscribe` | **`defined`, with an AMENDED RELEASE PATH** | the third release trigger (a severance) is now a DECIDED clause — the `'severed'` arm and its release rule at `§2.10` item 3 — so the row does NOT reach `undefined-until-answered`, and the release path is written rather than open |

**THE SUBSUMPTION RECORD CARRIES UNCHANGED, and is re-asserted rather than amended: `U-STORE-PERSIST` consumes `A-1`,
`A-4`, `A-7` and `A-8`; `U-STORE-SECURITY` consumes `A-1`, `A-4` and `A-5`; the successor unit itself consumes `A-1`…`A-5`
directly and `A-6`/`A-7`/`A-8` through the re-statuses above.** **THE ARITHMETIC OF THIS TABLE, PRINTED WITH ITS TERMS:
`8` held rows, `8` statused, `5` read UNCHANGED (`A-1` · `A-2` · `A-3` · `A-4` · `A-5`) and `3` RE-READ (`A-6` · `A-7` ·
`A-8`); `5 + 3 = 8` ✓.** **No row was added, merged or dropped, and the count of adopted identifiers stays `8`.** **AND THE FILE'S OWN ADOPTED-IDENTIFIER COUNT IS UNMOVED, stated so no reader double-counts the two tables: `§1` still carries `8` identifier rows (`A-1`…`A-8`, each `defined`) and the table above REPEATS those same eight ids AS RE-STATUSES and adds not one — `8` as filed = `8` adopted, `8 + 0 = 8` ✓; a reader counting identifier rows counts `§1`'s table, and a reader counting collision rows counts `§2`'s plus `K-13` (`12 + 1 = 13`).**

### 5.2 The ONE NEW COLLISION ROW the successor's identifier set needs — `K-13`, reconciled BY ROW ID

**THE FORM IS `§2`'s AND IS NOT NEGOTIABLE: the hit is reconciled BY ROW ID as *"banned by row `<R-id>` for reason `<Y>`;
legitimate in this layer because `<Z>`"*. A hit is NEVER reconciled by RELAXING a prohibition; the only other lawful
disposition is an EXPLICIT RE-NAME REQUEST, and none is made here.** **The row is authored in the successor at its `§6.3`
and is carried HERE, in place, so that this file's collision block is COMPLETE for the successor's identifier set.**

| # | The prohibition row hit | Banned by row — FOR THE REASON Y | LEGITIMATE in this layer — BECAUSE Z | Falsifier |
| --- | --- | --- | --- | --- |
| **`K-13`** | **`docs/specs/store-core.md` `§3.4` `R-9`** — *"No path segment is looked up against any id registry, and the store keeps no counter, no UUID site and no string-to-entry map"*, positive control *"a `Map` keyed by a derived value FAILS"* | **banned by row `R-9` for the reason that a GLOBAL, PROCESS-WIDE, ENGINE-ID-KEYED string-to-entry map would be a THIRD holder** over the same ids the engine's registry and the `cssIndex`/`propsIndex` pair already index (the plan's `§7.2` `F-5`, `§3.3` row `2.3-8`) | **legitimate in this layer because the prohibition's SCOPE HAS BEEN RULED — not re-read — BY THE ARCHITECT, and the ruling is the ACTIVE row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`:** the class the clause binds is a **global engine-id-keyed map**, and the class it does **not** bind is a **per-link, per-edge, caller-keyed, walk-gated target set**. The successor's dictionary is **PER-EDGE** (one anchor on one node), **keyed by the CALLER'S OWN DECLARED SEGMENT**, and consulted **as the LAST STEP of a walk that already reached that node** — and it is **UNREACHABLE WITHOUT ITS WALK**, which is the observable the ruling names. **`R-9`'s no-counter / no-UUID half STANDS and binds the store-minted handle's minting (`docs/specs/store-core-graph.md` `§7a.1` item 8), and the handle is NEVER a lookup key (`§2.4` item 2).** | a per-link set that resolves a node **without** its walk; a key that is an ENGINE or AUTHORED id string rather than the caller's own segment; a store-minted handle that a path segment resolves against. **AND the vacuity test: `R-9`'s own positive control is RE-POINTED, and a control that passes on BOTH a global engine-id-keyed map and this store FAILS as vacuous** (`docs/specs/store-core.md` `§3.4` `R-9`; `docs/specs/store-core-graph.md` `§3.4` `R-9`, `F-25`) |

**THE COUNT OF THIS BLOCK, ANNOTATED BESIDE THE AS-FILED FORM RATHER THAN REWRITTEN: `§2`'s table carries `12` collision
rows as filed (`K-1`…`K-12`) and this section adds `1` (`K-13`), so the file's collision rows now number `13` —
`12 + 1 = 13` — and NOT ONE of the `13` is reconciled by relaxing a prohibition.** **The closing line below still prints
*twelve collision rows* and is KEPT VISIBLE; it is read through this sentence.** **Nothing else in `§2` moves: its `K-5`
`CARRIED` item keeps its owner (the architect) and its positive revisit condition (the next `docs/decisions.md` pass),
and its five `PROHIBITED` entries stay carried, not relaxed.**

**NO ROW IS ADDED TO `§1` AND NO ROW IS ADDED TO `§3` BY THIS SECTION: the adopted identifiers stay `8`, the overflow
entries stay `16`, and the successor's own new overflow entry (`O-17`, the per-`(logical path, tier)` uniqueness
constraint) is carried in the SUCCESSOR's `§6.4` block, not in this file's `§3`.** **A pass that reads this file's `§3` as
having gained an entry has mis-read it; a pass that reads this dossier's collision block as still numbering `12` has
mis-read this section.**

**END OF THE DOSSIER.** **Eight adopted identifiers, all `defined`; sixteen overflow entries, none
`undefined-until-answered`; twelve collision rows, none reconciled by relaxing a prohibition; one
`CARRIED` item with a named owner and a positive revisit condition; zero bare `OWED`.**
