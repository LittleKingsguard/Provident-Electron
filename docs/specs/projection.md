# Spec — `U-PROJ`: the pure projection + **total** applier (`SCH-8`'s projection half)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-PROJ`**, the **projection half** of
`SCH-8` `LAYOUT-STATE-PROJECTION`; **`U-CENSUS` is a SEPARATE unit and stays in wave E**). **The unit
has NOT run: nothing here is implemented, no red set has been authored and no leg has been run by
this pass.** This pass files the contract.
**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
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

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-8` is adopted as TWO units and this is the projection half only:** *"Adopt `project(values) → record` + a **total applier** (every input yields a write-or-skip decision, never a throw, never a partial write) taking an **injected write sink** (the consumer's root), so the mechanism owns **no root and no store**."* **`U-CENSUS` (the `computeTrackVars(zones, census, sizes, revealed, specOf)` half) is SEPARATE and stays in wave E** (`docs/next-steps.md`'s `## OPEN` row **E2**; §1.2). | §1, §2 |
| **2** | **The acceptance lines are binding:** **purity** (same input ⇒ same output, no environment read) · **totality** over malformed/partial input · **the `computeTrackVars(census, …)` half is ABSENT** (census is app data — `SCH-4`'s concern) · **one write per commit**. | §2.4, §3, §5.2, §6 |
| **3** | **Variable names and units come from the CONSUMER'S SUPPLIED SPEC** — `(C)#1`-clean. There is **no built-in variable name, no built-in unit, and no built-in token literal**, and **no zone vocabulary anywhere** (`H-r17`). | §2.1, §2.2 (prohibitions 1/3), §7 item 4 |
| **4** | **The applier DECLARES nothing and OWNS nothing**: an **injected write sink** is the only environment reading, and the mechanism **owns no root and no store**. | §2.3, §2.1 (`applyProjection`) |
| **5** | **The `U-ZONES`/`U-CENSUS` delegation boundary is NOT this unit's to cross.** The **token-formatting authority is `U-ZONES`** for the **census family** (§1.1/§1.2: *"delegating token formatting to `U-ZONES` (one authority, not two)"*), and **`U-PROJ` must not import `U-ZONES`, `U-CENSUS`, or any zone/track module.** This unit formats **only** what the consumer's own `VarSpec` tells it to, and the contract makes that spec **data**, never a function it delegates to. | §2.1 (`VarSpec`), §2.4, §6 |
| **6** | **`H-r17`'s consequence, quoted because it names this unit:** *"A dashboard/toolbar use case changes NO zone/track contract: `U-PROJ` still takes an injected write sink and consumer-supplied variable names/units, so a dashboard's custom properties are projected by the consumer's data through the repo's pure applier, **with no zone vocabulary anywhere**."* | §1, §2.2, §7 item 4 |
| **7** | **No new MCP surface, no store, no persistence, no CSP change** (the amendment's obligations table): every adopted mechanism is renderer/host-resident module code — no `src/main/**`, no `electron`, no `node:fs`, no RPC types import; **no adopted unit persists anything**. | §2.2 (prohibitions 4/5), §5.1 |
| **8** | **The go-ahead for wave D does not exist yet**, and within wave D this unit lands **last**. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** | this status block, §4.5, §7 item 1 |

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

/** Every reason a key can be skipped. Closed, and deliberately small. */
export type ProjectionSkipReason =
  | 'missing-value'      // the spec's key is absent from `values`
  | 'not-a-number'       // present, but not a finite number (string, boolean, null, NaN, ±Infinity)
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
   *  NEVER `NaN`/`Infinity`/a negative (ruling 2's fail-soft pin). */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY the keys that must NOT be written, each with its reason. */
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
   *  write LOG: a key appears here iff `setProperty` was called with it. */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY what was not written, each with its reason. */
  readonly skipped: readonly ProjectionSkip[]
  /** `true` iff nothing was skipped. */
  readonly ok: boolean
}

/** THE PURE HALF. Total over every input; reads no environment; never throws. */
export function project(values: unknown, specOf: unknown): Projection

/** ONE key at a time — the same rules as `project`, exposed so a consumer can
 *  format a single value without building a spec map. */
export function projectVar(spec: unknown, value: unknown): { readonly written: string | null; readonly skip: ProjectionSkip | null }

/** THE IMPURE HALF. Total: one decision per key, at most one write per applied
 *  key, never a throw, never a partial write for a key reported applied. */
export function applyProjection(projection: unknown, sink: unknown): ApplyResult

/** The source-name alias of `applyProjection` (the amendment's own verb,
 *  "`applyVarsToRoot` returns exactly the map it applied"). SAME function. */
export function applyVarsToRoot(projection: unknown, sink: unknown): ApplyResult
```

**The skip pattern, exactly.** **Neither half throws — for any input.** The refusal/skip vocabulary
is the closed `ProjectionSkipReason` union above; a skip is **recorded**, never signalled by an
exception and never silently dropped. **`Projection.applied` and `Projection.skipped` PARTITION the
spec's key set** (row `I-1`): every spec entry contributes exactly one — a write or a skip — so
"every input yields a write-or-skip decision" (ruling 1) is a structural property, not a promise.

**The two halves' contracts must be readable off the types alone:**

| | `project` | `applyProjection` |
| --- | --- | --- |
| Returned `applied`'s meaning | **the intended writes** | **the write LOG** |
| May mutate its inputs? | **no** (a frozen `values` and a frozen spec both work — `M-9`) | **no** (it mutates only the sink) |
| Deterministic order | **yes** — spec order | **yes** — `projection.applied`'s order |
| Writes per applied key | **zero** | **exactly one** (`I-3`) |

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** every **property name**;
every **unit token**; the **formatting choice**; the **values**; the **spec set** (including its
membership and order); and the **write sink**. The only literals the module may contain are **its own
contract literals**: the `ProjectionSkipReason` members, the `'unit'`/`'number'` format tokens, and
the diagnostic sentences.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken` as vocabulary; property names and units are typed as an **open** `string` (never a closed union); the module documents **no** consumer constant, **not even an example one**. The only string-unions are `VarSpec['format']` (**two contract tokens**) and `ProjectionSkipReason` (**seven contract diagnostics**). | static source row over the module file |
| **2** | **No app UI content** authored | The module creates **no** element, authors **no** text, **no** class, **no** style string of its own, and **no default value**. It computes strings and calls one injected write method. **Every string it emits is derived from caller data** (`value` + caller `unit`) — a row asserts this by driving it with sentinel caller strings and finding them, unmodified, in the output. | `M-7` (sentinel round-trip) + static row |
| **3** | **No policy defaults** | No default unit, no default name, no default value, no "assume 0", no fallback token. An **omitted** `format` is **documented as `'unit'`** — a **contract default the caller can see and override**, not a hidden policy (the honest reading of ruling 3); **an omitted `unit` is NOT defaulted** — `unit` is required, and `''` is the caller's explicit "no unit". | `F-1`, `M-2`, `M-8` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC, zero module-level mutable state. Both halves are **call-local**: the same call twice yields deep-equal results, and no reference to an input or a sink is retained. | `I-5`, `I-6` + static row |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, cascade, `getComputedStyle`, or rendered-geometry property, and its module expands no shim member (**it may not add `setProperty` to the shim**). The one real-DOM value row is **OPTIONAL** (`[U]`, §5.2) and nothing in §3 depends on it. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 The write-or-skip rule — the applier, stated falsifiably

1. **One decision per key.** For every key in `projection.applied`, the applier either writes it
   (exactly one `setProperty` call) or skips it (`write-refused`). For every key already in
   `projection.skipped`, it propagates the skip **unchanged**. **Together these cover the whole
   spec set** — a key can never vanish between the two halves (`I-2`).
2. **No partial write for an applied key.** A key is reported in `ApplyResult.applied` **iff**
   `setProperty` was invoked with it; a key whose `setProperty` threw is reported in `skipped` with
   `write-refused` and **is not** in `applied` (`I-3`).
3. **A throwing `setProperty` does NOT abort the run.** The applier continues with the remaining
   keys and reports each failure individually — **the totality rule is what makes this the contract
   rather than a partial-write violation**; the caller sees exactly which keys did not land.
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
   call per applied key per `applyProjection` call** — a row counts the calls (`M-5`).

### 2.4 The projection rule — the pure half, stated falsifiably

1. **Purity.** `project` is a function of its two arguments alone: same arguments ⇒ **deep-equal**
   result, every time; no ambient read (`Date`, `Math.random`, `process.env`, `document`, `window`,
   the shim, the module's own past calls). A row calls it twice and asserts deep-equality (`I-4`).
2. **Totality.** For **any** `values` and **any** `specOf` — `null`, `undefined`, a string, a number,
   an array, a frozen object, a getter-bearing object, a huge object — `project` **returns a
   `Projection` and never throws** (`I-7`). **Every spec entry produces exactly one decision.**
3. **The validity rule, per spec entry (the fail-soft pin, generalized):** a key is **applied**
   **iff** its spec is usable **and** its value is present **and** the value is a **finite number**
   **and** the value is **not negative**. Otherwise it is **skipped**, with the first matching reason
   in this fixed precedence: `malformed-spec` → `duplicate-name` → `missing-value` → `not-a-number` →
   `negative`. **`NaN`, `±Infinity`, `-1`, `'12'`, `true`, `null` and an absent key are all skips** —
   **no `NaN`/`Infinity`/negative may ever appear in `applied`** (ruling 2's pin, which is the fork's
   F-2 rule generalized).
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

### 3.2 Documented fail-states / skips (each is a typed reason, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **A malformed spec entry** | `specOf` entry that is `null`/`undefined`/a string/a number/an array; a missing `name`; a non-string `name`; a missing `unit`; a non-string `unit`; an unknown `format` value | **no throw**; every such entry is skipped with **`malformed-spec`**; **no default is substituted** (prohibition 3) | `[T]` |
| **F-2** | **`duplicate-name` — two specs, one name** | two spec entries producing `name: '--dup'` | **no throw**; the **first** is applied and the **second** is skipped with `duplicate-name`; `applied` contains `--dup` **once** (first-wins, §2.4 item 5) | `[T]` |
| **F-3** | **`missing-value`** | a well-formed spec whose key is absent from `values` | skipped with **`missing-value`** — **never a 0, never an empty string, never a removal write** (§2.3 item 5) | `[T]` |
| **F-4** | **`not-a-number` — the whole class** | value `'12'`, `true`, `false`, `null`, `undefined` (present), `{}`, `[]`, `NaN`, `Infinity`, `-Infinity`, a `BigInt`, a function, a getter that throws | **no throw**; each is skipped with **`not-a-number`**. **A getter that throws**: the throw propagates **out of the getter** — the spec does **not** claim to swallow arbitrary accessor throws, and the row must record which behaviour the implementation has (§7 item 8) | `[T]` |
| **F-5** | **`negative`** | value `-1`, `-Number.MIN_VALUE`, `-0`'s distinction | `-1` and any negative ⇒ **`negative`** skip; **`-0` is NOT negative** (`-0 < 0` is `false`) and is **applied as `'0'`** — a row pins both halves, because `-0` is the one input where a naive `<= 0` test would differ from `< 0` | `[T]` |
| **F-6** | **`sink-unusable` — a malformed sink** | `null`, `undefined`, `42`, `'x'`, `{}` (no `style`), `{style: {}}` (no `setProperty`), `{style: {setProperty: 42}}` | **no throw**; **no write attempted**; **every** key of the projection appears in `skipped` with **`sink-unusable`**; `applied` `{}`; `ok === false` (`F-6` is the whole-sink class — one reason, applied to every key) | `[T]` |
| **F-7** | **`write-refused` — a `setProperty` that throws for ONE key** | a fake sink whose `setProperty` throws on the 2nd key only | **no throw out of the applier**; key 2 is in `skipped` with **`write-refused`** and **absent from `applied`**; keys 1 and 3 **are** applied; `ok === false`; **the run did not abort** (§2.3 item 3) | `[T]` |
| **F-8** | **`write-refused` — a `setProperty` that throws for EVERY key** | a fake sink that always throws | no throw; every key `write-refused`; `applied` `{}`; `ok === false` | `[T]` |
| **F-9** | **A projection whose `skipped` is malformed** | `{applied: {}, skipped: 'nope'}` / `{applied: {}, skipped: [null]}` | **no throw**; the applier still performs the `applied` half's writes; the malformed skip entries are **dropped from `ApplyResult.skipped`** (they carry no decidable reason). *(A contract decision, §7 item 7.)* | `[T]` |
| **F-10** | **A projection whose `applied` value is not a string** | `{applied: {'--a': 12}}` / `{'--a': null}` | **no throw**; the applier coerces with `String(value)` **only for a primitive**, and **skips** a non-primitive with `write-refused`. *(A contract decision, §7 item 7: the applier does not re-validate its input, but it must never hand a non-string to a real `setProperty`, which would throw a `TypeError` in a browser.)* | `[T]` |
| **F-11** | **`project` given a `specOf` that is not a record** | `null`, `undefined`, `'x'`, `42`, `[]` | **no throw**; **zero** spec entries ⇒ `applied` `{}` and `skipped` `[]`. **An empty input set is not an error** (prohibition 3: no default spec is invented) | `[T]` |

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

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/layout-projection.test.ts`** — authored **first**,
**RUN**, and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/layout-projection.js'` for every row. **There is no host-fix
branch for this unit**: the module does not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-10`, `M-1`..`M-17`, `F-1`..`F-11` **in that order**.
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
| Are there rows here that a **property** would express better than a table? | **FOUR genuine quantifications, and this unit is the strongest PBT candidate in wave D:** (i) *"for **every** unusable input shape, `project` returns a `Projection` and never throws"*; (ii) *"for **every** spec/value pair, the key appears in exactly one of `applied`/`skipped`"* (`I-1`); (iii) *"for **every** non-finite or negative number, the output never contains `NaN`/`Infinity`/a negative"* (`I-9`); (iv) *"for **every** sink whose `setProperty` throws, no key reported applied is a key whose write failed"* (`I-3`). §3 samples each with fixed tables. **None is proven by its sample**, and this spec says so — (iii) and (iv) are exactly the classes a generator would serve, and **they stay unproven**. |
| Could this unit execute them **as properties**? | **No, and not for a reason of effort:** the harness does not exist, and **adding `fast-check` is a `devDependencies` change** — outside §5.1's diff scope and a gate of its own. **This unit may not smuggle a property runner in.** |
| Do the layers permit a property run here? | **Yes in principle** for (i)…(iv): they are pure `[T]` claims over injectable arguments, and a fake sink makes (iv) trivially drivable. **The blocker is the harness, not the layer** — stated rather than hidden behind a layer claim. **The one claim that stays layer-blocked is the `[U]` one** (a real custom-property value). |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`I-7` = the no-throw drive, `I-1` = the partition drive, `F-4`/`F-5` = the numeric-boundary drive, `F-7`/`F-8` = the write-failure drive). **A strategy id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The four quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-7` + `F-1`..`F-11` (totality), `I-1` (partition), `F-4`/`F-5`/`I-9`
   (the numeric bound), `I-3` + `F-7`/`F-8` (no-false-applied).
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

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; (c) the unit is **routed back** — admissible only if the
projection half is shown to be inseparable from the census half, which would be a finding against
A-d4's split and therefore a **new gate**, not this unit's call (`H-r1`'s cite-and-supersede rule).

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` →
   `U-LISTHOST` → `U-SLOTHOST` first), and on its red set** (§0 ruling 8, §4.5).
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
5. **The `project(values)` form in the amended unit plan is INCOMPLETE, and this spec corrects it by
   naming the second parameter.** The plan's own `U5` row writes *"pure `project(values) → record`"*,
   while the governing `SCH-8` per-item row writes *"variable names and units come from the consumer's
   supplied spec"* and the acceptance line writes *"`project(values) → record` + a total applier"*.
   **A projection cannot obtain caller-supplied names/units without a spec argument**, so this spec's
   signature is `project(values, specOf)` and **the single-argument form is recorded as a source
   imprecision, not as an alternative contract** (see §8's correction table). **The sibling `U-CENSUS`
   contract already uses a `specOf` parameter**, so the vocabulary is consistent with the family.
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
   `missing-value` → `not-a-number` → `negative`; (v) **`-0` is applied as `'0'` and is not
   `negative`**; (vi) **the applier trusts its projection** (no re-validation, `M-13`) but **never
   hands a non-string to `setProperty`** (`F-10`); (vii) **a malformed `skipped` list is dropped, not
   fatal** (`F-9`); (viii) **a throwing `setProperty` skips one key and does not abort the run**
   (`F-7`); (ix) **a malformed sink is a total `sink-unusable` skip, never a throw** (`F-6`);
   (x) **`applyVarsToRoot` is an identity alias of `applyProjection`** (`M-14`). **Each is a decision,
   not a derivation — the sources are silent on all ten.**
8. **This spec leaves FOUR things UNRULED rather than inventing an answer:** **`F-4`'s throwing
   getter** (`A-2` — does the accessor's throw propagate?), **`A-11`** (is a `Projection` single-use
   or reusable across sinks?), **`A-3`** (the prototype-pollution-shaped key — does the record need a
   null-prototype?), and **`A-7`** (sink re-entrancy). **The adversarial pass must rule them and
   record the rulings here.** Naming an unresolved input as unresolved is the contract; silently
   picking an answer would be the `C-16` class (`RK-10` — a contract reverse-engineered from one
   consumer).
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
statement this spec had to amend to be contract-complete.

| Source row | Section | Status for `U-PROJ` | Where |
| --- | --- | --- | --- |
| `SCH-8`'s **projection half** (`project` + the total applier) | amendment §2.2's `SCH-8` row, §2.1 | **ADOPTED — this unit** | §1, §2 |
| `SCH-8`'s **`computeTrackVars(census, …)` half** | amendment §1.2; `docs/next-steps.md` row **E2** | **NOT THIS UNIT — `U-CENSUS`, wave E** (its refile is WITHDRAWN, so it is *adopted*, not refiled — but **by another unit**) | §0 ruling 1, §1, §7 item 2 |
| **Purity** (same input ⇒ same output, no environment read) | amendment §2.2's acceptance line | **DISCHARGED** as `I-4` + `M-9` | §2.4, §3.3 |
| **Totality** (every input yields a write-or-skip decision, never a throw, never a partial write) | amendment §2.2's acceptance line; the `U5` plan row | **DISCHARGED** as `I-1`/`I-2`/`I-3`/`I-7` + `F-1`..`F-11` | §2.3, §3.2, §3.3 |
| **The non-finite/out-of-range fail-soft pin** (the fork's F-2 generalized: no `NaN`/`Infinity`/negative in the returned map) | the `U5` plan row's red-set bullet | **DISCHARGED** as the validity rule + `I-9` + `A-1` | §2.4 item 3, §3.2 `F-4`/`F-5` |
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
| **`RK-10`** (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 7/8 are this unit's answer: ten recorded contract decisions and four deliberately-unruled seeds | §7 items 7–8 |
| **`RK-19`** (geometry unprovable here; the node layer asserts contracts/arithmetic only) | amendment §6 | **CARRIED** — §7 item 10 + `A-20` are this unit's compliance rows | §7 item 10, `A-20` |
| **`RK-16`** (a mis-sequenced census change turns a green suite red) | amendment §6 | **NOT THIS UNIT** (`U-FOCUS-TOOL`'s) — but its **false-green reading class** is `A-20`'s | `A-20` |
| `docs/specs/engine-pin.md` §5.5's register (incl. `P-SM-2`) | that file | **NOT THIS UNIT** — the register is not extended, and `P-SM-2` is **not copied** (a second authority over a landed register is a finding) | §5.5 item 4 |
| Row **D4** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/projection.md` (**OWED — not filed**) — **this filing discharges that cell**; the row stays `BLOCKED`, and its *"`U-CENSUS` is separate"* clause is §7 item 2 | this file |
| Row **E2** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table | **NOT THIS UNIT** — `U-CENSUS`'s own row, whose spec is `docs/specs/census.md` (`OWED — not filed`) | §0 ruling 1, §4.3 |
| `docs/specs/projection.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| **The `U5` plan row's `project(values) → record` form** | the amended unit plan (`U5`) | **CORRECTED** — this spec's signature is `project(values, specOf)`; the plan's single-argument form is recorded as a **source imprecision**, because a projection cannot obtain caller-supplied names/units without a spec argument (§7 item 5) | §2.1, §7 item 5 |

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

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **Row D4's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent.

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-PROJ`** (this pass is the spec-filing
pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to review — RCA-3
runs *after* a unit's green). **This table is the SEED SET for the pass that will run; no row below
is a finding, and none may be cited as one.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | **The numeric boundary table, exhaustively:** `NaN`, `±Infinity`, `-Infinity`, `-0`, `0`, `Number.MIN_VALUE`, `Number.MAX_VALUE`, `1e21`, `1e-21`, a `BigInt`, a numeric string, a `Symbol`, a function. Does **any** of them put a non-finite or negative string into `applied`? | `[T]` |
| **A-2** | **A getter that throws** and a **frozen** `values` object with an accessor — does `project` propagate, swallow, or corrupt? **`F-4` is deliberately unpinned on this; the pass must rule it and record the ruling here.** | `[T]` |
| **A-3** | A prototype-polluting key (`'__proto__'`, `'constructor'`, `'prototype'`) as a **spec key** and as a **`name`** — does the projection's record become a polluted object, or is the write emitted normally? | `[T]` |
| **A-4** | A **huge** spec set (10⁴ keys) — any quadratic path, and is the order still deterministic? (A **performance** observation, not a property claim.) | `[T]` |
| **A-5** | A `name` containing whitespace, a `;`, a `}`, a newline, or a `url(…)` — is it emitted **verbatim** (the contract) or sanitized (a policy default)? **Verbatim is the contract**; sanitizing is a **prohibition-3 finding**. | `[T]` |
| **A-6** | A `unit` containing a `;`, a `}`, or another property declaration — same question, same contract answer. | `[T]` |
| **A-7** | A `setProperty` that **re-enters** the applier (the sink calls back into `applyProjection`) — state coherence, and is the write count still one per key? | `[T]` |
| **A-8** | A `setProperty` that is a **getter returning a new function each access** — is the method called at most once per key (no double property access)? | `[T]` |
| **A-9** | A sink whose `style` is a **Proxy** that throws on the first access — total skip or throw? | `[T]` |
| **A-10** | A projection object the caller **mutates between** `project` and `applyProjection` — does the applier see the mutation (it must, it reads its argument) and does it **re-format** anything (it must not)? | `[T]` |
| **A-11** | A projection reused for **two** sinks — is it consumed (mutated) or reusable? **Must be ruled** (this spec does not decide whether a `Projection` is single-use). | `[T]` |
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
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** (`A-2`/`A-11` are the named candidates, and `F-4`'s getter clause) — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3 |
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

