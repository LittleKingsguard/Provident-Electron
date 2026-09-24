# Spec — `U-SLOTHOST`: the slot **HOST** (`SCH-9`'s host half only — the publisher/carrier half is DECLINED)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-SLOTHOST`**, the **host-half-only** adoption
of `SCH-9` `SHELL-STATUS-CARRIER` under architect ruling **A-d7**). **The unit has NOT run: nothing
here is implemented, no red set has been authored and no leg has been run by this pass.** This pass
files the contract.
**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**.
Wave **D** is authorised by no ruling currently on the record, so this unit's red set may not be RUN
and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET OWED — NOT
AUTHORED, NOT RUN** (RCA-1). **Ordering obligation from its queue row: it lands after `U-LISTHOST`**
(the amendment's appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** — *"`U-MOUNTGUARD` →
`U-LISTHOST` → `U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row **D3**'s
`Blocked on` cell). Source of this unit: the amendment record's **§1.10 `U-SLOTHOST` ← `SCH-9`'s host
half (A-d7 — host-only, mechanism-only)** (read in full), §2.2's `SCH-9` row
(**SPLIT — host half ADOPTED-RESHAPED; publisher/carrier half STAYS DECLINED**), `S-d14`, `H-r15`,
`H-r17`, §3 (wave D), the §"Per-unit equivalence limits" and "no new MCP surface" rows, and
`docs/next-steps.md`'s `## OPEN` row **D3** (spec cell `docs/specs/slothost.md` — **OWED — not
filed**; this file is that filing).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-9` is SPLIT and the split is BINDING and must not be re-merged (`H-r15`).** The **host** half is adopted as this unit; the **publisher/carrier** half stays **DECLINED** (`AUTHORS-UI-CONTENT`, prohibition `(C)#2`) because *"it authors the element's text and slot content"* — i.e. a UI element authored outside the provident graph, a `UI-RENDERED-WITH-PROVIDENT` **review finding** (`AGENTS.md:23-34`, `docs/decisions.md:53`). | §1, §2.2 (prohibition 2), §7 item 2 |
| **2** | **`H-r15`'s hazard, quoted so it is not lost: *"`U-SLOTHOST` must not grow per-zone/per-pane semantics or a mirror-class taxonomy (`is-empty`/`is-minimized`/`is-revealed`) — that would resurrect `SCH-10`/`SCH-4` under a new name, and its `§0 Contract-prohibitions` table must assert their absence."*** | §2.2 (prohibitions 1/2/3), §3 (`F-1`), §4 `A-17`, §6 |
| **3** | **The adopted contract, contract-exact** (§1.10): `createSlotHost({ container, keys, order?, classNameOf?, attributesOf? })` — (a) opaque keys; (b) caller-created nodes; (c) own-node ownership; (d) **no content authored — no text, no default label, no class taxonomy, no styling, and NO `publish` API**; (e) ordering as a projection of the caller's `order`; (f) empty key set ⇒ an empty container and no throw; a `null`/absent container ⇒ every operation a no-op with a valid state; an **undeclared key ⇒ a TYPED REFUSAL, never a silent create**. | §2.1, §2.3, §3 |
| **4** | **`V-7` is resolved by own-node ownership and stays a HARD row in BOTH units** (§2.2 + §1.10): *"a re-render removes exactly the nodes the host placed and nothing else; a foreign sibling survives two re-renders as the SAME element (`toBe`)"*. | §2.4, §3 (`M-7`/`I-3`), §7 item 3 |
| **5** | **`H-r17`'s decisive consequence — the SLOT host is the host that IS admissible, and the region host is NOT.** *"menus/toolbars/dashboards are containers + content, and the two halves have different admissibility — region host NO (stays declined) … slot host YES (`U-SLOTHOST`)"*. **This unit is therefore the ONLY host of the two that may exist**, and it must not acquire a region concept. | §1, §2.2, §7 item 4 |
| **6** | **`A-d7` reading (a) is the authority: `AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED**, and a mechanism is outside that constraint **because it is not a UI element** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `docs/decisions.md:54`, read) — *"it authors no text, no control, no affordance, no class taxonomy, no slot content and no styling, and every node it creates is empty and consumer-driven (every visual property is consumer-supplied)"*. **A mechanism that authors content — a status text, a status element, a mirror-class taxonomy, a slot model, a literal default — IS a UI element authored outside the provident graph and remains a review finding.** | §2.2, §5, §7 item 5 |
| **7** | **The go-ahead for wave D does not exist yet**, and within wave D this unit follows `U-LISTHOST`. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** | this status block, §4.4, §7 item 1 |

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
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **Every row of this unit is a SHIM-TREE row.** The shim has no real CSS resolution, no
   `getComputedStyle`, no `querySelector(All)` and no `classList` (`src/shared/dom-shim.ts:1-3`
   announces exactly that scope; the shim's `className` is a **plain string field**, `:12`, read) —
   so a `[T]` green says *"the shim's tree and the shim's attribute store are as asserted"*, **not**
   *"the element renders with this class"*.
3. **The container is injected and the module reads no ambient global.** No `document`, no `window`,
   no `matchMedia`, no `getElementById`. The module is admissible under **(C)** (a consumer-agnostic
   shell-chrome mechanism) and judged under **(C)'s six prohibitions**, which §2.2 asserts.

## 1. Scope

**One deliverable: `createSlotHost(...)`** — a host that maps **caller-declared opaque keys** to
containers holding **caller-created nodes**, orders and attributes them by **caller-supplied**
policy, owns exactly the nodes it placed, and **refuses an undeclared key with a typed refusal
instead of creating anything**.

1. **What it is, in one sentence.** A per-key container manager for caller-created nodes. The
   caller declares the keys once; thereafter it supplies *(key → node)* pairs, an order and
   attributes, and the host places each node in that key's container.
2. **What it is NOT — the publisher half, declined.** There is **no `publish` API**, no status
   text, no status element, no default label, no badge, no mirror-class taxonomy, no slot *model*
   (i.e. no notion of "an empty slot", "a minimized slot", "a revealed slot"), and no styling.
   **This is the declined half, and the decline is why the host half is admissible at all.**
3. **What the unit may land.** The module + its red/green rows + this spec. **No host change**: this
   unit adds consumer-agnostic code and touches no existing file except this spec and the trackers.
4. **What the host DOES write (the complete list, so "no DOM writes beyond what is pinned" is
   falsifiable):** it creates **exactly one container element per declared key**; it places a
   **caller-created** node into the container for that node's key; it moves a node between two
   declared containers; it removes a node **it placed**; and it applies a **caller-supplied**
   `classNameOf`/`attributesOf` result to a **caller-created** node. **Nothing else. It authors no
   text and no class value of its own.**

**Explicitly OUT of scope (do not do in this unit):**

- **The publisher/carrier half, in any spelling** — `publish`, a status string, a status element,
  a label, a badge, an "empty/minimized/revealed" class or state, a slot model, a text write, a
  default value. **Declined, not deferred** (§0 ruling 1).
- **Any per-zone/per-pane semantics, any mirror-class taxonomy, any `is-*` class literal**
  (`H-r15`'s named hazard).
- **Any region concept** — no region name, spec, registry or mount resolution (`H-r17`, ruling 5).
- **Any `querySelectorAll`, `querySelector`, `closest`, `getElementById`, `matchMedia`,
  `activeElement`, `getComputedStyle`, `document` or `window` reference**, and **no class-list
  manipulation beyond the injected `classNameOf`** (§2.2).
- **Any store, registry, persistence, or module-level mutable state** beyond the host's own
  per-key ownership bookkeeping.
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names).
- **Any shim change.** `src/shared/dom-shim.ts` is untouched; a green must not depend on a new shim
  member (`H-r5`).
- **Any other wave-D/E/F unit.** Each is its own spec, red and cycle (RCA-2). **In particular, this
  unit must not absorb `U-LISTHOST`'s list role or `U-PROJ`'s value role** (§4 `A-18`).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and refusal pattern

**New module: `src/shared/slot-host.ts`** (a pure `src/shared` module). **Seven exports**, and
nothing else:

```ts
/** An opaque caller key. The host compares it for equality and reports it
 *  back; it NEVER interprets, normalizes, prefixes or enumerates it. */
export type SlotKey = string

/** A caller-supplied attribute write, applied VERBATIM to a caller-created
 *  node. The host neither validates nor defaults either field. */
export interface SlotAttribute {
  readonly name: string
  readonly value: string | number | boolean
}

export interface SlotHostOptions {
  /** The element the per-key containers are created INSIDE. `null`/absent is a
   *  valid, supported configuration (§3.2 `F-6`). */
  readonly container: unknown | null
  /** The DECLARED key set. The host's vocabulary is EXACTLY this list —
   *  nothing may be created for a key outside it (§3.2 `F-1`). */
  readonly keys: readonly SlotKey[]
  /** The caller's ordering policy for the containers, per key. Omitted ⇒ the
   *  supplied `keys` order. */
  readonly orderOf?: (key: SlotKey) => string | number
  /** The caller's class value for a node. Applied VERBATIM. Omitted ⇒ no class
   *  write at all. */
  readonly classNameOf?: (key: SlotKey, node: unknown) => string | null | undefined
  /** The caller's attribute writes for a node. Applied VERBATIM, in order.
   *  Omitted ⇒ no attribute write at all. */
  readonly attributesOf?: (key: SlotKey, node: unknown) => readonly SlotAttribute[] | null | undefined
  /** Notified ONCE per refusal. The host NEVER awaits it and NEVER lets it
   *  change the refusal's outcome (§2.1's callback rule). */
  readonly refuse?: (refusal: SlotHostRefusal) => void
}

export interface SlotHostRefusal {
  /** The key exactly as supplied (never normalized, never prefixed). */
  readonly key: SlotKey
  readonly code: 'unknown-key' | 'no-container' | 'malformed-node' | 'container-not-appendable'
  /** One sentence, in this unit's own voice. */
  readonly message: string
}

export interface SlotHostResult {
  /** `true` iff nothing was refused. */
  readonly ok: boolean
  /** The declared keys, IN THE PROJECTED CONTAINER ORDER. */
  readonly order: readonly SlotKey[]
  /** Every key that currently holds a host-placed node, in projected order. */
  readonly placed: readonly SlotKey[]
  /** Every node this call REMOVED (the ones the host had placed), by reference. */
  readonly removed: readonly unknown[]
  /** This call's refusals, in encounter order. */
  readonly refused: readonly SlotHostRefusal[]
}

export interface SlotHost {
  /** Declare the node for a key. An UNDECLARED key is refused (never a silent
   *  create). A `null`/malformed node is refused (`malformed-node`). */
  setNode(key: SlotKey, node: unknown | null): SlotHostResult
  /** Remove the node the host placed for a key (unknown key ⇒ refusal). */
  remove(key: SlotKey): SlotHostResult
  /** The projected container order (`orderOf` + supplied `keys`). */
  setOrder(keys: readonly SlotKey[]): SlotHostResult
  /** Place/refresh the current declarations (idempotent). */
  render(): SlotHostResult
  /** The declared keys, in the projected order. Always valid. */
  keys(): readonly SlotKey[]
  /** The container element the host created for a key, or `null` for an
   *  undeclared key. Exposed so the caller can place its OWN content in it. */
  containerFor(key: SlotKey): unknown | null
  /** Relinquish ownership: remove the containers the host created. The
   *  caller's NODES are not destroyed (§2.4 item 5). */
  dispose(): void
}

export function createSlotHost(options: SlotHostOptions): SlotHost
```

**The refusal pattern, exactly.** **No method of this host throws — for any input.** Every method
returns a `SlotHostResult` (except `dispose()`, which returns `void` and is idempotent). A refused
operation contributes a `SlotHostRefusal` and leaves the host's state valid. **`ok` is `false` iff
`refused.length > 0`** (row `I-1`).

**The injected-callback rule, stated because it is a real hazard.** `classNameOf`,
`attributesOf` and `refuse` are **caller code**. **A throw from caller code is the caller's bug, and
this contract does not claim to swallow it** — a later pass may not read the totality rule as
covering a throwing callback. **`refuse` is NOTIFIED, never awaited**: the host calls it **once per
refusal** and **ignores its return value and any promise it returns**, so a `refuse` callback cannot
change a refusal's outcome or the returned result. *(The adversarial seed `A-5` carries the "what if
`classNameOf`/`attributesOf` throws" question to the pass that runs, because the sources are silent
on it — §7 item 7.)*

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **container**; every
**key** (declared by the caller — "opaque keys" is the contract); every **node** (the caller creates
it; the host **never** creates a node of its own); the **order** and the **order policy**; the
**class value**; every **attribute name and value**; and the **refusal listener**.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`is-empty`/`is-minimized`/`is-revealed`/`status` as vocabulary; keys are typed as an **open** `type SlotKey = string` (an alias, not a closed union — so a consumer value can never be a member); no consumer constant is documented. The only string-union is `SlotHostRefusal['code']`'s **four** contract diagnostics. **The declared key set is caller data, not a vocabulary of the mechanism.** | static source row over the module file |
| **2** | **No app UI content** authored | The host authors **no** text, **no** label, **no** status string, **no** `role`/ARIA attribute, **no** class value of its own, **no** style, and **no** default node. It creates **containers** (empty elements) and applies **caller-supplied** class/attribute values to **caller-created** nodes. **A `publish`-shaped surface is ABSENT by contract** (ruling 1). | static rows: zero `textContent` write, zero `className` value literal, zero `publish`-shaped export |
| **3** | **No policy defaults** | No default container, no default ordering policy (omitted `orderOf` ⇒ **the supplied key order**, which is the **absence** of a policy), no default class, no default attribute, no default key, no default node, no default text. | `F-4` + `M-2`/`M-5` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC. The host's **only** state is its per-key ownership bookkeeping + the container elements it created; `dispose()` empties it, and a row asserts no state survives `dispose()`. **No consumer value is retained beyond the current declaration** (no history, no previous-value cache). | `M-13`, `I-5` |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, styling-resolution, focus, real-click or rendered-geometry property, and its module expands no shim member. The real-DOM identity row is **OPTIONAL** (`[U]`, §5.2) and nothing in §3 depends on it. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 The declared-key rule — the typed refusal, stated falsifiably

1. **The key set is declared once, at construction, by the caller.** `options.keys` is the host's
   **entire** vocabulary. A key not in it is **undeclared**.
2. **An undeclared key is REFUSED, never silently created** (§1.10 (f) — *"never a silent create"*).
   The refusal is `{ code: 'unknown-key', key }`; **no container is created, no node is placed, no
   state changes**, and the host never grows its own key set. **A row asserts that the mount's child
   count is unchanged after the attempt** (`F-1`).
3. **One container per declared key, created by the host inside the injected container.** The order
   of those containers is the projection (§2.5). A row asserts the count is **exactly**
   `keys.length` once rendered (`M-1`).
4. **The caller may place its OWN content inside a container** — that is what `containerFor(key)`
   exposes the container **for**. **The host does not fill it.** *(This is the boundary the declined
   publisher half crossed.)*
5. **An empty key set is a valid state**: `keys: []` ⇒ an empty container, `order` `[]`,
   `refused` `[]`, and **no throw when rendering** (§1.10 (f)).
6. **A `null`/absent container is a valid no-op configuration** (§1.10 (f) — *"a `null`/absent
   container ⇒ every operation a no-op with a valid state"*). It is **NOT a refusal** — see `F-6`.

### 2.4 Own-node ownership — the exact rule (the `V-7` hard row, in this unit too)

1. **The host owns exactly the nodes it placed, and exactly the containers it created.**
2. **On a `remove`/replacement/`dispose`, it removes exactly those** — **and nothing else.**
3. **FOREIGN SIBLINGS ARE NOT TOUCHED.** A foreign sibling is any child of the injected container
   (or of a container) that the host did not place/create. **The hard row: a foreign sibling
   survives two re-renders as the SAME element (`toBe`)** (`M-7`). **`V-7`'s contradiction —
   `SCH-9` #2's "publish replaces the element" versus `SCH-11` #1's foreign-sibling-survives — is
   resolved by this rule and stays a hard row in BOTH units** (§2.2; §1.10 (c)).
4. **A node supplied for a key is the node the caller created; the host never clones or re-creates
   it**, and `placed`-by-reference is asserted against the exact object (`I-6`).
5. **`dispose()` removes the CONTAINERS the host created, and does NOT destroy the caller's
   nodes.** A caller node that was inside a host container is **detached with its container but not
   destroyed**: the caller still holds the object. **A row asserts the node object survives
   `dispose()` and that the host retains no state** (`M-13`, `I-5`). **The choice is deliberate and
   is a contract decision**: destroying caller nodes would be the same ownership overreach as
   authoring their content.
6. **A node moved from one declared key to another is removed from the first container and placed in
   the second** — one node, one key, one container at a time. A row asserts the first container no
   longer holds it (`M-9`).

### 2.5 Order-and-attributes as PROJECTION

1. **`orderOf(key)` is the container-ordering policy; it is INJECTED.** Omitted ⇒ the **supplied
   `keys` order**.
2. **`setOrder(keys)`** sets the projected container order. Keys **not declared** and **duplicate**
   keys in `keys` are **ignored**; the projected order is **exactly** the declared key set, once
   each (`I-7`).
3. **Ordering is a projection of the caller's order — DOM order is never the authority**
   (§1.10 (e)); an order change performs **zero graph ops**.
4. **`classNameOf`/`attributesOf` values are applied VERBATIM to caller-created nodes.** The host
   **validates nothing, defaults nothing, prefixes nothing, and normalizes nothing.** A `null`/
   `undefined` return means **no write for that field** (not an empty-string write) — a row asserts
   the distinction (`M-5`/`M-6`).
5. **Attribute application order is the array's order**, and a later entry for the same name wins
   (the shim's `setAttribute` is last-write-wins, `src/shared/dom-shim.ts:30-39`, read). A row
   asserts the final value (`M-6`).

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **Declared keys ⇒ one container each, in `keys` order** | `createSlotHost({ container, keys: ['a','b','c'] })`; `render()` | `ok === true`; `order === ['a','b','c']`; the injected container's children are **exactly three** host-created elements, in that order; `containerFor('b')` is the second; each container holds **no text and no caller node yet**; `placed` `[]` | `[T]` |
| **M-2** | **Omitted `orderOf` ⇒ the supplied key order** | M-1, no `orderOf` | `order` is exactly `keys`' order; **no sorting occurs**; prohibition-3 row | `[T]` |
| **M-3** | **`orderOf`-projected container order** | `orderOf: (k) => ({a:2,b:0,c:1})[k]` | `order === ['b','c','a']`; the injected container's child sequence matches | `[T]` |
| **M-4** | **`orderOf` ties keep the supplied key order (stability)** | two keys with equal `orderOf` values | relative order is the supplied order; **no invented tiebreak** (prohibition 3). **A row pins it so a later pass cannot "stabilise" differently without amending this clause** | `[T]` |
| **M-5** | **`setNode` places the caller's node — reference identity** | `setNode('a', n)` where `n` is caller-created | `ok === true`; `placed` contains `'a'`; `containerFor('a')`'s children include `n` **by reference** (`toBe`); `removed` `[]` | `[T]` |
| **M-6** | **Verbatim class + attribute application (and last-write-wins)** | `classNameOf: () => 'caller-class'`; `attributesOf: () => [{name:'data-k', value:'v'}, {name:'data-k', value:'w'}]` | the node's class is **exactly** `caller-class`; its attribute store holds `data-k = "w"` (last write wins); **the host added no attribute of its own** — a row asserts the attribute-name set is exactly `{data-k}` plus whatever the caller's node already had | `[T]` |
| **M-7** | **FOREIGN SIBLINGS SURVIVE (the `V-7` hard row)** | Append two caller-created foreign elements to the injected container; `render()` **twice** | `ok === true`; **both foreign elements are the SAME objects after the second render** (`toBe`); they were never removed or re-appended; their relative order and positions are unchanged | `[T]` |
| **M-8** | **Empty key set** | `keys: []`; `render()` | `ok === true`; `order` `[]`; `placed` `[]`; `refused` `[]`; the injected container is **unchanged**; **nothing throws** (§1.10 (f)) | `[T]` |
| **M-9** | **A node moves between declared keys** | `setNode('a', n)` then `setNode('b', n)` | `containerFor('a')` no longer holds `n`; `containerFor('b')` holds `n` **by reference**; `order` unchanged; `placed` contains `'b'` and not `'a'` | `[T]` |
| **M-10** | **Replacement: the same key, a different node** | `setNode('a', n1)` then `setNode('a', n2)` | `n1` appears in `removed`; the container holds `n2` (by reference); `'a'` still in `order` **once** | `[T]` |
| **M-11** | **A `null` class/attribute return is NO WRITE** | `classNameOf: () => null`; `attributesOf: () => undefined` | the node's attribute set is **unchanged**; **no empty-string attribute and no empty class are written** (prohibition 3's boundary) | `[T]` |
| **M-12** | **`remove` keeps the container, drops the node** | `remove('a')` after `setNode('a', n)` | `n` in `removed`; `'a'` still **declared** (`keys()` still contains it, `containerFor('a')` still an element) and still in `order`; the node is gone from the container | `[T]` |
| **M-13** | **`dispose()` removes the host's containers and destroys no caller node** | declare 3, place 3, `dispose()` | no throw; the injected container holds **only** the foreign siblings it held before; the three nodes **still exist as objects**; `keys()` `[]`; a second `dispose()` is a no-op; **no state retained** (`I-5`) | `[T]` |
| **M-14** | **A `null`/absent/ malformed container ⇒ every operation a no-op with a valid state** | `container: null` / `undefined` / `{}` / `42` / `'div'`; then `setNode`/`setOrder`/`remove`/`render`/`keys`/`containerFor`/`dispose` | **no throw for any call**; `keys()` still reports the **declared** keys; `order` still valid; `placed` `[]`; `containerFor(k)` returns `null`; `ok === true` for valid inputs (nothing refused — the host simply has nowhere to place) | `[T]` |
| **M-15** | **`setOrder` with undeclared/duplicate keys ignores them** | `setOrder(['a','a','nope'])` | `ok === true`; `refused` `[]`; `order` is the declared key set in the requested relative order (here `['a', …rest]`) | `[T]` |
| **M-16** | **`render()` is idempotent** | `render()` twice with unchanged state | the second call: `removed` `[]`, `refused` `[]`, **no child re-append**, and the same `order`/`placed` | `[T]` |
| **M-17** | **The refusal listener is notified once per refusal, in order** | a call producing two refusals with `refuse` injected | `refuse` called **exactly twice**, with the two refusal objects in **encounter order**, each `deepEqual` to its entry in the returned `refused`; **its return value is ignored** (a row returns a rejected promise and asserts no effect) | `[T]` |
| **M-18** | **Allocation of the key set to the CONTAINER, not to the caller's node** | `keys: ['a','b']`, only `'a'` placed | **both** containers exist (`containerFor('b')` is an element); `placed === ['a']`; `order === ['a','b']` — the two fields are defined differently and a row asserts the difference | `[T]` |

### 3.2 Documented fail-states / refusals (each is a typed `code`, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **UNDECLARED KEY — the contract's central refusal** | `setNode('nope', n)` / `remove('nope')` | **no throw**; `ok === false`; **one** refusal with `code === 'unknown-key'` and the **exact key string** as supplied; **no container is created** (the injected container's child count is unchanged); `order` unchanged; `placed` unchanged; `refuse` notified once | `[T]` |
| **F-2** | **A malformed node** | `setNode('a', null)` / `undefined` / `42` / `'x'` / `{}` | **no throw**; `ok === false`; one refusal with `code === 'malformed-node'`; **the key's prior node is left as it was** (a malformed input never removes a valid placement — the row pins this) | `[T]` |
| **F-3** | **A key that is not a string** | `setNode(42, n)` / `setNode(null, n)` / `setNode('', n)` | **no throw**; `''` and non-strings are refused under `code === 'unknown-key'` (they cannot be declared keys, since `keys` is a string array and `''` **may** be declared — **so the row is: a declared `''` works, an undeclared non-string is `unknown-key`**, and a row pins both halves) | `[T]` |
| **F-4** | **An empty/malformed `keys` option** | `keys: []` (valid — `M-8`) / `keys: null` / `keys: 'a,b'` / `keys: [1,2]` | `keys: []` is **valid** (`M-8`); the malformed forms ⇒ **no throw**, an **empty declared set**, and any `setNode` call is `unknown-key`. **`createSlotHost` itself never throws** | `[T]` |
| **F-5** | **A `containerFor` on an undeclared key** | `containerFor('nope')` | returns **`null`** — **this READ is not a refusal** (it creates nothing and changes nothing); a row pins the asymmetry with `F-1` so a later pass does not "unify" them | `[T]` |
| **F-6** | **A `null`/absent container is NOT a refusal** | `M-14`'s configuration | `refused` is `[]`, `ok === true` — **the malformed-container class of `U-MOUNTGUARD`'s `mount-not-appendable` does NOT apply here**: this host's absent container is a **supported no-op configuration**, while `U-MOUNTGUARD`'s probe **asks a question about a tree**. **The asymmetry is deliberate and recorded so a later pass does not "harmonise" the two.** `container-not-appendable` therefore fires only when a container is **present but refused by the environment** (e.g. an object with no `appendChild`), **not** when it is absent — a row pins both | `[T]` |
| **F-7** | **A present-but-unusable injected container** | `container: {}` (no `appendChild`), `container: { appendChild: 42 }` | **no throw**; **every** operation reports `code === 'container-not-appendable'` **once per attempted placement**, and the host remains in a valid state. **Distinguished from `F-6`** (absent ≠ unusable) | `[T]` |
| **F-8** | **`classNameOf`/`attributesOf` returning a malformed value** | a non-string class; an attributes array containing a non-object, a missing `name`, or a non-primitive `value` | **no throw**; the malformed entry is **skipped**; `ok` is **not** forced `false` (attribute application is best-effort per entry — **a contract decision**, §7 item 7) — a row pins that the well-formed entries are still applied | `[T]` |
| **F-9** | **A node placed, then detached by the caller, then removed** | caller detaches `n`, then `remove('a')` | **no throw**; the key is no longer `placed`; **no dangling ownership** (`keys()` still shows `'a'` as declared, per `M-12`). *(The `removed` membership for this case is deliberately not pinned: the shim's `remove()` is idempotent at `src/shared/dom-shim.ts:89-96`, read, so the honest contract is "no throw, no dangling ownership" — stated as a decision, §7 item 7.)* | `[T]` |
| **F-10** | **A throwing caller callback** | `classNameOf` that throws | **This spec does not decide it** — a caller-code throw is not this host's refusal class, and the sources are silent. **The row is a seed for the adversarial pass (`A-5`), which must rule it and record the ruling here** (§7 item 8) | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `ok === (refused.length === 0)` **always** | No "ok with refusals" state exists |
| **I-2** | `order` is **exactly** the declared key set, each key **once**, in some order | §2.5 item 2 |
| **I-3** | **Foreign siblings are reference-identical before and after every call** — in the injected container **and** inside every host container | The `V-7` hard row as an every-state invariant |
| **I-4** | The host authors **no content**: no `textContent` write, no `className` **value** of its own, no `role`/ARIA attribute of its own, no style, no `publish`-shaped method | Prohibitions 1/2, made falsifiable (static + state rows) |
| **I-5** | After `dispose()`, the host retains **no** declared key, **no** container reference, **no** node reference and no other state | Prohibition 4 |
| **I-6** | For every placed key, the container holds the caller's node **by reference** — never a clone | §2.4 item 4 |
| **I-7** | `placed` is a **subset** of `order`, and `order` contains every declared key regardless of placement | `M-18`'s distinction |
| **I-8** | No method throws **for any input** — asserted by a deterministic table (`null`, `undefined`, numbers, strings, arrays, undeclared keys, malformed nodes, an absent container, an unusable container, a detached node) | The refusal contract's boundary |
| **I-9** | Every `SlotHostResult` array is a **fresh array**; a caller mutating a returned array cannot change host state | Anti-aliasing |
| **I-10** | The number of host-created containers inside the injected container is **exactly** `keys.length` after any successful `render()`, and **never more** — no container is ever created for an undeclared key | `F-1`'s "no silent create", as an invariant |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/slot-host.test.ts`** — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/slot-host.js'` for every row. **There is no host-fix branch for
this unit**: the module does not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-10`, `M-1`..`M-18`, `F-1`..`F-10` **in that order**.
2. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static
   row that can already be evaluated (e.g. "the module file does not exist").
3. **Then** implement the least code that makes them green.
4. **Re-run**, record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a styling/overflow/layout test.** No such criterion exists here.
- **Not a publisher test.** A row asserting a status text, a label, a badge, an `is-*` class, or a
  `publish` method is a **prohibition-1/2 violation** and a `H-r15` re-merge.
- **Not a shim change.** The rows run against the landed shim as-is.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.2).
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires a **new shim member** | **Scope violation** (`H-r5`) — re-write it against the shim's public surface (`children`, `appendChild`, `setAttribute`, `remove`, `className`). |
| **S-3** | A row is only satisfiable by authoring content (a label, a status string, a class taxonomy, a default) | **Violates ruling 1** — the publisher half is declined. **Re-write the row; never the contract.** |
| **S-4** | A row needs to inspect the **real** DOM's class/CSS resolution | The row is `[U]`-only and **optional**; mark it so, do not fake it on the shim. |
| **S-5** | A row requires the host to grow a per-zone/per-pane semantic | **Violates `H-r15`** — this is exactly the named hazard. **Stop and report to the supervisor.** |
| **S-6** | A row is only satisfiable by making `dispose()` destroy caller nodes | **Violates §2.4 item 5** — re-write it. |
| **S-7** | A row needs a **graph seam** to prove "zero graph ops on order change" | There is no seam; the row is **static** (module imports/calls). **Do not add a spy, a hook or an injection point.** |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 7), (b) the **wave-D order** — `U-MOUNTGUARD`, then `U-LISTHOST`, then this unit, (c) this
spec to exist (**done: this filing**), and (d) a **TestWriter to have RUN and REPORTED the red set**
(`AGENTS.md` item 9). Its `## OPEN` row (D3) stays `BLOCKED` until all four hold — **and its row
carries an extra, permanent prohibition: *"Publisher half stays DECLINED — do not re-merge."***

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/slot-host.ts` | **NEW** — the seven exports of §2.1 | always |
| 2 | `tests/slot-host.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `docs/specs/slothost.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row; the `U-SLOTHOST` rows the amendment already owes to `docs/pending.md` and `docs/FORKER.md`) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**`. **This unit changes no existing file
except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | the option/result types are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read) |

**OPTIONAL `[U]` real-DOM identity row — with its named preconditions.** The row: *a caller-created
node placed in a declared slot container, then re-ordered, with the node's **identity** observed in
the **real** DOM across the reorder*. **Preconditions, all named and none assumed:** (a) the `ui`
leg exists and is green for the same built tree, (b) `npm run divergence` is green for that tree,
and (c) for any **attribute-presence**- or **class-presence**-shaped variant, the `H-r10`
extractor, owed to **`U-DIVERGENCE-EXT`** (a real-DOM class/CSS-resolution claim is **not**
derivable from the shim at all — the shim's `className` is a plain string field,
`src/shared/dom-shim.ts:12`, read). **If not taken, no §3 row is weakened.** **A node-suite green is
never a real-DOM green.**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-SLOTHOST` · wave **D** · `DONE` or the honest non-DONE status.
2. **The wave-D order confirmation**: `U-MOUNTGUARD` and `U-LISTHOST` landed first.
3. **The host/publisher boundary confirmation, explicitly**: *"the publisher/carrier half remains
   DECLINED; this unit adds no `publish` and no content-authoring surface."* **A DONE row that does
   not state this is a review finding** — it is the unit's defining constraint (`H-r15`).
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
6. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
7. **The `[U]` row's status**: taken (with its result) or **not taken** (with the reason).
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
| Are there rows here that a **property** would express better than a table? | **Three genuine quantifications, all sampled deterministically:** (i) *"for **every** key not in `keys`, `setNode` refuses and creates no container"* — `F-1`/`I-10` sample a few; (ii) *"for **every** input shape, no method throws"* — `I-8` + `F-1`..`F-9` are a deterministic table; (iii) *"for **every** permutation of the declared keys, `order` is that permutation and each container's identity is preserved"* — `M-15`/`I-2` sample it. **None of the three is proven by its sample**, and this spec says so. |
| Could this unit execute them **as properties**? | **No, and not because of effort:** no harness exists, and adding one is a `devDependencies` change — outside §5.1's diff scope and a gate of its own. |
| Do the layers permit a property run here? | **Yes in principle** for (i) and (ii) (pure `[T]` work over an injectable container); (iii)'s identity half is also `[T]`. **The blocker is the harness, not the layer** — stated rather than hidden behind a layer claim. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`F-1` = the undeclared-key drive, `I-8` = the no-throw drive, `M-7` = the foreign-sibling drive). **A strategy id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The three quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-10`/`F-1` (no-silent-create), `I-8` + `F-1`..`F-9` (totality), `I-2`/
   `M-15`/`I-6` (permutation + identity).
3. **No `fast-check` and no generator is added by this unit.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`).

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a slot host cannot place, order and attribute
caller-created nodes per caller-declared key without ever authoring content of its own, then the
host/publisher split is not realisable and the unit fails.* The falsification tests are
**`I-4`** (no host-authored content), **`M-7`/`I-3`** (foreign siblings by reference) and
**`F-1`/`I-10`** (no silent create). **A "small" default label, an "empty slot" class, or a
convenience `publish` would each satisfy the unit's apparent purpose while failing `I-4`** — and
each is `H-r15`'s named hazard, not a judgement call.

**A second, independent falsification.** *If ordering the containers cannot be done as a projection
of caller-supplied order, then `§2.5` is not implementable.* The test is the static row (§4.4
`S-7`) plus `I-2`.

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; (c) the unit is **declined back to the fork** — admissible only
if the host half is shown to be inseparable from the declined publisher half, which would be a
**finding that `H-r15`'s split is not realisable**, and therefore a **new gate**, not this unit's
call (`H-r1`'s cite-and-supersede rule).

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` →
   `U-LISTHOST` first), and on its red set** (§0 ruling 7, §4.5).
2. **THE PUBLISHER/CARRIER HALF IS DECLINED — this file must never be read as adopting it.** The
   declined half is what authors the element's text and slot content; it is a `UI-RENDERED-WITH-
   PROVIDENT` review finding, and the host half is admissible **only** because it does not touch that.
   **The queue row carries the same prohibition verbatim: *"Publisher half stays DECLINED — do not
   re-merge."***
3. **`V-7` stays a hard row in BOTH units, and this unit is one of the two.** *"Publish replaces the
   element"* is contradicted by the foreign-sibling-survives rule; the resolution is own-node
   ownership. **A later pass that weakens `M-7`/`I-3` in either spec has re-opened a resolved
   contradiction.**
4. **The slot host is the only admissible host of the two** (`H-r17`): the region host stays
   declined (its blockers are `(C)#1` + `(C)#6`), and **this unit must not acquire a region
   concept** to make itself more useful.
5. **The mechanism-vs-UI-element test is this unit's compliance row, not a licence.**
   `AGENTS.md:23-34` and `docs/decisions.md:53` are **UNCHANGED**; the carve-out (`:54`) excludes a
   mechanism **because it is not a UI element**. **The moment this host writes a label, a status
   string, a class taxonomy or a default, it becomes a UI element authored outside the graph and a
   review finding.**
6. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for
   this unit also **never a real-DOM class/CSS-resolution green** (the shim's `className` is a plain
   field). The `[U]` row is optional and precondition-gated (§5.2).
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result-object + refusal-list** shape (the sources
   name the contract's *arguments* and its refusal *existence*, and name no return shape); (ii)
   **`ok === refused.length === 0`**; (iii) **`containerFor` is a read and is not a refusal** (`F-5`)
   while `setNode` on an undeclared key is (`F-1`); (iv) **the absent container is a no-op, not a
   refusal**, while a **present-but-unusable** one is `container-not-appendable` (`F-6`/`F-7`) —
   deliberately asymmetric with `U-MOUNTGUARD`; (v) **`dispose()` removes host containers and
   destroys no caller node** (§2.4 item 5); (vi) **attribute/class application is best-effort per
   entry** — a malformed attribute entry is skipped without failing the call (`F-8`); (vii) **the
   refusal listener is notified once and its return value ignored** (§2.1). **Each is a decision,
   not a derivation — the sources are silent on all seven.**
8. **This spec deliberately leaves FOUR seeds UNRULED** rather than inventing rules: **`F-10`/`A-5`**
   (a throwing caller callback), **`A-3`** (duplicate declared keys), **`A-6`** (one node for two
   keys) and **`A-7`** (two host instances over one container). **The adversarial pass must rule them
   and record the rulings here.** Naming an unresolved input as unresolved is the contract; silently
   picking an answer would be the `C-16` class (`RK-10` — a contract reverse-engineered from one
   consumer).
9. **`F-9`'s `removed` membership is deliberately not pinned** (a caller-detached node). The honest
   contract is *"no throw, no dangling ownership"*; the shim's `remove()` is idempotent
   (`src/shared/dom-shim.ts:89-96`, read), so pinning a specific membership would pin a shim detail
   rather than the mechanism's contract.
10. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
    (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = the part-half that stays
with the fork (and must not be re-merged). **OWED** = an obligation not yet discharged.
**NOT THIS UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

| Source row | Section | Status for `U-SLOTHOST` | Where |
| --- | --- | --- | --- |
| `SCH-9`'s **host half** (A-d7) | amendment §1.10, §2.2's `SCH-9` row, `S-d14` | **ADOPTED — this unit**, host-only, mechanism-only | §1, §2 |
| `SCH-9`'s **publisher/carrier half** (`AUTHORS-UI-CONTENT`, `(C)#2`) | amendment §1.10 (the declined half), §2.2's `SCH-9` row | **DECLINED — must not be re-merged** (`H-r15`) | §2.2 (prohibitions 1/2), §7 item 2, `A-1` |
| `H-r15` (the split + the named hazard: no per-zone/per-pane semantics, no mirror-class taxonomy) | `H-r15` | **DISCHARGED** as §2.2's prohibition rows + `A-1`/`A-17` | §2.2, §3 `F-1`, §4 `S-5`, §6 |
| `H-r17` (the slot host YES / region host NO consequence) | `H-r17` | **DISCHARGED** — this unit acquires no region concept | §0 ruling 5, §1, §7 item 4 |
| `V-7` (publish-replaces-the-element vs foreign-sibling-survives) | `V-7`; amendment §2.2's `SCH-9` row (*"resolved by own-node ownership and kept as a hard row"*) | **RESOLVED + carried as the hard row** | §2.4, §3 `M-7`/`I-3`, `A-19` |
| The **`SCH-9 → SCH-11`** edge | `H-r6` | **DISSOLVED** — `U-LISTHOST` and this unit are **independent** mechanisms, each taking its own injected policy | §4 `A-18` |
| `H-r17`'s **"a dashboard/toolbar use case changes NO zone/track contract"** clause | `H-r17` | **CARRIED** — no zone vocabulary, no track contract, no `contain` declaration in this unit | §1, `A-17` |
| The amendment's **"no new MCP surface"** obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-16` |
| The amendment's **per-unit equivalence limits** for `U-OVERLAY`/`U-LISTHOST` (the family this unit joins) | amendment §"Per-unit equivalence limits" | **CARRIED in the shared form**: order is a projection; foreign-sibling survival is a hard row; no equivalence between a placed/visible node and any graph op | §2.5, §7 items 3–4 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3` | **INHERITED-ONLY** — the shim is untouched | §1, §4 `S-2` |
| `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (a mechanism is outside the UI constraint because it is not a UI element) | `docs/decisions.md:54`, read | **CARRIED** — prohibition 2 + `I-4` are this unit's compliance rows | §0 ruling 6, §2.2, §7 item 5 |
| `UI-RENDERED-WITH-PROVIDENT` | `docs/decisions.md:53`, read | **CARRIED** — and it is the reason the publisher half is declined | §0 ruling 1, §7 item 2 |
| `UI-STATIC-MEANS-APP-STATE-DERIVED` (A-d7's ruling row) | `docs/decisions.md:64`, read | **CARRIED** — this unit is the "SLOT HOST: YES" half it names | §0 ruling 5 |
| `RK-10` (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 7/8 are this unit's answer: seven recorded contract decisions and four deliberately-unruled seeds | §7 items 7–8 |
| `RK-15` (the demo appearance control over-read as production UI — the same over-read risk class) | amendment §6 | **CARRIED** — this unit's `A-20` is the tracker-level version of that risk | `A-20` |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `REAL-DOM-UI-GATE-LEG` (the shim demoted to pre-filter) | `docs/decisions.md:65`, read | **CARRIED** — a node-suite green is never a real-DOM green | Layer declaration, §5.2 |
| The eight-unit plan's **`U7`**-family provenance (`U-OVERLAY`/`U-PROJ` plan rows) | amendment §"The amended unit plan" | **NOT THIS UNIT** — but the amended plan's **`U-SLOTHOST` row is `U-SLOTHOST`'s own** and its red-set cell is expanded in §3 | §3, §4 |
| Row **D3** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/slothost.md` (**OWED — not filed**) — **this filing discharges that cell**; the row stays `BLOCKED` and its *"Publisher half stays DECLINED — do not re-merge"* clause is §7 item 2 | this file |
| `docs/specs/slothost.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| The `U-SLOTHOST` rows the amendment owes to `docs/pending.md` + `docs/FORKER.md` | `H-r15`'s "artifact that must exist" cell | **NOT THIS UNIT's edit** — tracker rows are the supervisor's/doc-review's pass; recorded here so the obligation is not lost | §5.1 item 4 |

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor cited
above was **read in this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` — 143
lines, `:1-3`, `:12`, `:30-39`, `:89-96`; `package.json:10`, `:19`, `:26-31`;
`tests/engine-pin-version.test.ts:174-197`; `docs/decisions.md:53`, `:54`, `:64`, `:65`).
**`docs/next-steps.md` is cited by row id only** — that file's own convention forbids line
citations. **`docs/decisions.md` is 406 lines today** and its ledger is split into labelled appended
blocks plus `## HISTORICAL` (`:230`), `## SPECULATIVE / IN GATE` (`:288`) and `## AMENDMENTS TO
PRE-EXISTING ACTIVE ROWS` (`:294`) to `:406` — so a bare `decisions.md:<n>` from an earlier layer
**must be resolved against the live file before it is quoted**, which is what this spec did.

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **Row D3's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent.

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-SLOTHOST`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to review
— RCA-3 runs *after* a unit's green). **This table is the SEED SET for the pass that will run; no row
below is a finding, and none may be cited as one.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | **THE RE-MERGE PROBE (the unit's defining hazard, `H-r15`):** does any code path, symbol, literal, default or test row introduce a **`publish`**, a status text, a label, a badge, an `is-empty`/`is-minimized`/`is-revealed` class, a slot *model*, or a per-zone/per-pane semantic? **Any positive is a blocking finding.** | static + `[T]` |
| **A-2** | An undeclared key tried by **every** entry point (`setNode`, `remove`, `setOrder`, `containerFor`) — is a container ever created, or a key ever added to the host's set? | `[T]` |
| **A-3** | A declared key set containing **duplicates** (`['a','a']`) — one container or two? **Must be ruled explicitly** (this spec does not decide it) | `[T]` |
| **A-4** | A declared key set containing `''`, whitespace, unicode and a very long key — all opaque, all must work identically; a row asserts **no normalization** anywhere | `[T]` |
| **A-5** | A **throwing** `classNameOf`/`attributesOf` (caller code) and a `refuse` callback that **returns a rejected promise** — does the host swallow, propagate, or corrupt its state? **`F-10` is deliberately unruled: the pass must rule it and record the ruling here.** | `[T]` |
| **A-6** | The **same caller node** supplied for **two declared keys** in sequence (M-9 covers one step) and **in one render** — what is placed, and is it a refusal? **Must be ruled explicitly** | `[T]` |
| **A-7** | Two **host instances** over the **same** injected container — is ownership isolated per instance, and can one instance remove the other's containers? **Must be ruled explicitly** | `[T]` |
| **A-8** | A caller node that is **itself a container** the host created (node/container aliasing) — infinite recursion or a clean refusal? | `[T]` |
| **A-9** | An injected container that is **already a child of another** host container, or that is the host's own container for a key | `[T]` |
| **A-10** | `attributesOf` returning `name` values that collide with the node's **existing** attributes, with `id`, with a `data-*`, and with a duplicate name inside the array | `[T]` |
| **A-11** | `attributesOf` returning a value of every primitive type (`string`/`number`/`boolean`) and a non-primitive (`{}`/`[]`/`null`) — what is written, and is a malformed entry skipped? | `[T]` |
| **A-12** | An injected container whose `appendChild` **throws** on the 2nd call — is the host left in a valid state, and is the failure reported (it must **not** throw out of a method)? | `[T]` |
| **A-13** | A caller **detaches** a host container, then the host is asked to remove/re-place a key — no throw, no dangling ownership? | `[T]` |
| **A-14** | **Static/unauthorized-access sweep:** `querySelectorAll`/`querySelector`/`closest`/`getElementById`/`matchMedia`/`activeElement`/`getComputedStyle`/`document`/`window`, any `src/renderer/**` import, any `electron`/`node:fs`, any store, any module-level mutable state, any `publish`-shaped export. | static |
| **A-15** | **Vocabulary sweep:** `zone`/`pane`/`tab`/`region`/`is-empty`/`is-minimized`/`is-revealed`/`status` in any spelling; any **closed string union** of consumer values; any documented consumer constant. | static |
| **A-16** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? | `[H]` + static |
| **A-17** | **The `SCH-10`/`SCH-4` resurrection probe:** does the host grow a class taxonomy, a token, a track/zone concept, a `contain` declaration, or an emptiness rule under a new name? | static + `[T]` |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-LISTHOST` responsibility (list ordering, activate/close callbacks) or any `U-PROJ` responsibility (variable values), or does `U-LISTHOST` duplicate this unit's per-key containers? **Duplication is a FINDING** — the wave-D units share one layer idiom and must not share one contract. | static + `[T]` |
| **A-19** | **Content-leak probe (the `(C)#2` boundary):** can a caller's **node** be made to carry host-authored text through any code path (a default text node, a fallback label, an empty-state string)? | `[T]` |
| **A-20** | **The declined-half boundary at the TRACKER level:** does any doc row (this file, `docs/pending.md`, `docs/FORKER.md`, `docs/next-steps.md`) read as if the carrier/publisher half were adopted? | static (docs) |

## 3b. The adversarial pass's disposition table — **the shape this contract will be reconciled to**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** (`A-3`/`A-6`/`A-7`/`A-5`/`F-10` are the named candidates) — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3 |
| **BLOCKING — RE-MERGE** | `A-1`/`A-17`/`A-20` returning positive: **the unit does not land** until the publisher/zone semantics are removed |
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

