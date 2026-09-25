# Spec — `U-LISTHOST`: the owned-node list host (`SCH-11`'s adopted shape — own-node ownership + order-as-projection)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-LISTHOST`**, the adopted-reshaped form of
`SCH-11` `TAB-STRIP-SHELL`). **The unit has NOT run: nothing here is implemented, no red set has been
authored and no leg has been run by this pass.** This pass files the contract.
**⟶ STATUS NOTE — 2026-09-27, THE `U-MOUNTGUARD` DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN.** The
architect **GAVE the wave-D go-ahead (2026-09-27)** and **`U-MOUNTGUARD` is `DONE`** (the ledger's
**FOURTH `DONE` row** — `docs/next-steps.md`'s `## DONE — U-MOUNTGUARD` record; the counts are
**`4 DONE / 16 open`**). **This is a STATUS/ANNOTATION note: it amends no normative clause, adds no row
and moves no section number.** **What it supersedes, and only in its STATUS half:** the go-ahead
paragraph immediately below (and §0 **ruling 8**, §4.5, §7 item 1), whose *"BLOCKED on the architect's
go-ahead … wave D is authorised by no ruling currently on the record … RED SET OWED — NOT AUTHORED, NOT
RUN"* clauses are **kept visible and are the filing pass's state**. **What it does NOT change:**
`AGENTS.md` item 9 still binds — **this unit is delegable only once its red set has been RUN and
REPORTED**, and the **wave-D ORDER still stands unskipped**: `U-MOUNTGUARD` (now `DONE`) → **this unit
(`U-LISTHOST`)** → `U-SLOTHOST` → `U-PROJ`. **So this unit's exact next action is: `TestWriter red` RUN
and REPORTED → green → adversarial → blind greens → legs → documentation review → DONE**, with its
`docs/next-steps.md` `## OPEN` row **`D2`** the queue pointer.

**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**
— wave B landed. Wave **D** is authorised by no ruling currently on the record, so this unit's red
set may not be RUN and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET
OWED — NOT AUTHORED, NOT RUN** (RCA-1). Additional **ordering** obligation from its queue row: it
lands **after `U-MOUNTGUARD`** (`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s
appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** — *"`U-MOUNTGUARD` → `U-LISTHOST` →
`U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row **D2**'s `Blocked on` cell).
**Ordering is not a dependency edge this unit may skip** — the wave-D order is the amendment's own.
Source of this unit: the same amendment record's §2.2 `SCH-11` row (the acceptance lines, read),
§2.1 (the sixteen `SCH`-derived unit names), §3 (wave D and the checkpoint rule), `H-r6` (the
**dissolved** `SCH-9 → SCH-11` edge), `H-r8` (the six prohibitions), and `docs/next-steps.md`'s
`## OPEN` row **D2** (*"`U-LISTHOST` — the owned-node list host (own-node ownership +
order-as-projection; **not** a tab strip)"*; spec cell `docs/specs/listhost.md` (**OWED — not
filed**) — this file is that filing).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-11` is ADOPTED-RESHAPED, and the reshape is a RENAME TO WHAT IT ACTUALLY IS: an owned-node list host** — `createOwnedListHost({mount, orderOf, itemFactory, onActivate, onClose})` — **"not a tab strip"** (the §2.2 row + the D2 queue row, both read). | §1, §2 |
| **2** | **Own-node ownership is kept:** *"the host owns the nodes it created and leaves foreign siblings untouched"*. **Foreign-sibling survival is a HARD row** (amendment §"Per-unit equivalence limits"). | §2.3, §3 (rows `M-8`/`I-3`), §4 |
| **3** | **Order-as-projection is kept:** *"the host projects an order; it does not sort a graph; **no graph pass on order change**"*. | §2.4, §3.4, §4 |
| **4** | **The acceptance negatives are binding:** **no `querySelectorAll`**, **no tab-strip vocabulary**, **no `matchMedia`** in the mechanism; and **the "one overflow mode" criterion is DROPPED** — *"overflow is CSS and this repo ships no stylesheet for a fork"* (§2.2). | §2.2 (prohibitions), §4 |
| **5** | **`V-7` is resolved by own-node ownership and stays a hard row**: `SCH-9` #2's *"publish replaces the element"* **contradicted** this unit's #1 foreign-sibling-survives rule; the resolution is that **this host replaces only its own nodes** — and **`U-SLOTHOST` must carry the same hard row** (its own §2.2/§3). | §3 (rows `M-8`/`F-2`), §7 item 3 |
| **6** | **The `SCH-9 → SCH-11` dependency edge is DISSOLVED** (`H-r6`): *"each adopted contract takes an injected `orderOf`-shaped callback as its own parameter, so `C-15`'s cycle is broken rather than inherited"*. **`orderOf` is INJECTED HERE — it is not imported from `SCH-4`/`U-ZONES` and not a second authority over ordering** (`SCH-4`'s `orderOf` remains fork-owned). | §2.1 (`orderOf`), §6 |
| **7** | **No unit may claim magnitude-equivalence.** Per the amendment's per-unit equivalence limits: *"order is a **projection**, so the mechanism may not claim the graph's child order changed; foreign-sibling survival is a **hard row**; no overflow/tab vocabulary; no equivalence between 'one visible item' and any graph op."* | §7 item 4, §5.3 |
| **8** | **The go-ahead for wave D does not exist yet**, and within wave D this unit follows `U-MOUNTGUARD`. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the as-written cell is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` — the unit this one follows — is `DONE`, so the surviving blocker is this unit's OWN RED SET (plus this spec's `OWED`-cell status in its queue row). The wave-D order still binds.** | this status block, §4.5, §7 item 1 |

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no probe result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read) — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance |

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **Every row of this unit is a SHIM-TREE row.** The shim has no layout, no CSS resolution, no
   `getComputedStyle`, and no `querySelector(All)` (`src/shared/dom-shim.ts:1-3` announces exactly
   that scope; read this pass, 143 lines). **A `[T]` ordering green says the shim's `children` array
   is in the projected order — it is not a visual-layout assertion, and "one overflow mode" is not
   asserted anywhere** (ruling 4 drops that criterion).
3. **The mount is injected and the module reads no ambient global.** No `document`, no `window`, no
   `matchMedia`, no `getElementById`. The module is therefore admissible under **(B)** (a pure
   transition over injected environment readings) **and** under **(C)** (a consumer-agnostic
   shell-chrome mechanism) — **and it is judged under (C)'s six prohibitions**, which §2.2 asserts.

## 1. Scope

**One deliverable: `createOwnedListHost(...)`** — a host that owns exactly the nodes it created,
projects a caller-supplied order over them, reports activation/close through injected callbacks,
and leaves every other child of the mount exactly as it found it.

1. **What it is, in one sentence.** A container manager for **caller-created nodes**: the caller
   supplies the entries, the nodes, the order and the callbacks; the host places those nodes inside
   the injected mount in the projected order and removes **only** the ones it placed.
2. **What it is NOT.** It is **not a tab strip**. It authors **no** `role`/`aria-*`, **no** label,
   **no** class taxonomy, **no** selected/active state, **no** overflow mode, **no** stylesheet, and
   it does not know what an "item" means. **Every semantic crosses as opaque caller data.**
3. **What the unit may land.** The module + its red/green rows + this spec. **No host change** under
   any circumstance: this unit adds consumer-agnostic code and touches no existing file except this
   spec and the trackers (contrast `U-MOUNTGUARD`, whose host-fix branch exists because it probes
   existing behaviour).

**Explicitly OUT of scope (do not do in this unit):**

- **Any tab-strip vocabulary, symbol, union member, default or documented constant** — `'tab'`,
  `'tabs'`, `'strip'`, `'pane'`, `'zone'`, `'region'`, `'document'`, `'overflow'`, `'active'`,
  `'selected'` as vocabulary. **The module's source must contain none of them** (§2.2 prohibition 1).
- **Any `querySelectorAll`, `querySelector`, `closest`, `getElementById`, `matchMedia`,
  `activeElement`, `getComputedStyle`, `document` or `window` reference** (§2.2).
- **Any styling, class taxonomy, `role`/ARIA attribute, or content authorship** (§2.2 prohibition 2).
- **The dropped "one overflow mode" criterion, in any spelling.** Overflow is **CSS and
  consumer-side**; **this repo ships no stylesheet** for a consumer.
- **Any graph operation on order change.** `setOrder` performs **zero** graph ops — no `dispatch`,
  no `op`, no `applyCommand`, no `load`. A static row asserts the module imports nothing from
  `src/renderer/**` (§2.2, §5.1).
- **Any store, registry, persistence, or module-level mutable state.**
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names).
- **Any shim change.** `src/shared/dom-shim.ts` is untouched; a green must not depend on a new shim
  member (`H-r5`).
- **Any other wave-D/E/F unit** (`U-SLOTHOST`, `U-PROJ`, `U-CENSUS`, …). Each is its own spec, red
  and cycle (RCA-2).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and refusal pattern

**New module: `src/shared/owned-list-host.ts`** (a pure `src/shared` module). **Seven exports**, and
nothing else:

```ts
/** An opaque caller key. The host NEVER interprets it: it is a string it can
 *  compare for equality and report back. */
export type ListKey = string

/** One entry: an opaque key, the CALLER-CREATED node for it, and an optional
 *  opaque payload the host may only pass back to the caller's own callbacks. */
export interface ListEntry<N = unknown> {
  readonly key: ListKey
  readonly node: N
  /** Opaque caller data. Never read by the host, never serialized, never
   *  defaulted; returned verbatim on the matching callback. */
  readonly payload?: unknown
}

export interface OwnedListHostOptions<N = unknown> {
  /** The element the host places CALLER-CREATED nodes inside. `null`/absent is
   *  a valid, supported configuration (§3.2 `F-7`). */
  readonly mount: unknown | null
  /** The caller's ordering policy: key -> comparable. INJECTED, never owned.
   *  Omit to keep the order the entries were supplied in. */
  readonly orderOf?: (entry: ListEntry<N>) => string | number
  /** The caller's node factory, used ONLY when an entry supplies no node.
   *  If both are absent the entry is refused (§3.2 `F-3`) — the host
   *  NEVER creates a node itself. */
  readonly itemFactory?: (entry: ListEntry<N>) => N | null
  /** Fired at most ONCE per `activate(key)` for a known key. */
  readonly onActivate?: (key: ListKey, entry: ListEntry<N>) => void
  /** Fired at most ONCE per `remove(key)` for a known key. */
  readonly onClose?: (key: ListKey, entry: ListEntry<N>) => void
  /** The caller's per-entry ordering position, consulted at render time ONLY
   *  when `orderOf` is absent. */
  readonly order?: readonly ListKey[]
}

export interface ListHostRefusal {
  /** The key the refusal is about, exactly as supplied (never normalized). */
  readonly key: ListKey
  readonly code: 'unknown-key' | 'duplicate-key' | 'no-node' | 'factory-returned-null' | 'malformed-entry'
  /** One sentence, in this unit's own voice. */
  readonly message: string
}

export interface ListHostResult {
  /** `true` iff the render placed every entry and removed every node the host
   *  had previously placed and no longer owns. */
  readonly ok: boolean
  /** The keys the host currently owns, IN THE PROJECTED ORDER. */
  readonly order: readonly ListKey[]
  /** The nodes the host placed, IN THE PROJECTED ORDER, by reference. */
  readonly placed: readonly unknown[]
  /** Every node the host REMOVED during this render, by reference. */
  readonly removed: readonly unknown[]
  /** Refusals of THIS call, in encounter order. Never throws; never partial
   *  in the sense of §2.3 (see §3.2's totality note). */
  readonly refused: readonly ListHostRefusal[]
}

export interface OwnedListHost<N = unknown> {
  /** Declare/replace the full entry set. A second call with the same data is a
   *  no-op at the DOM level (row `I-2`). `null`/`undefined` ⇒ an EMPTY set. */
  setEntries(entries: readonly ListEntry<N>[] | null | undefined): ListHostResult
  /** Remove one entry by key. An UNKNOWN key is a refusal, never a throw. */
  remove(key: ListKey): ListHostResult
  /** Set the projected order. Unknown/duplicate keys in `keys` are IGNORED
   *  (they never appear in the result's `order`). NO graph op occurs. */
  setOrder(keys: readonly ListKey[]): ListHostResult
  /** Place the current set (idempotent). */
  render(): ListHostResult
  /** Fire `onActivate` for a KNOWN key (at most once); refusal for unknown. */
  activate(key: ListKey): ListHostResult
  /** Fire `onClose` for a KNOWN key and stop owning it. */
  close(key: ListKey): ListHostResult
  /** The keys the host currently owns, in the projected order. Always valid. */
  keys(): readonly ListKey[]
  /** Drop the host's ownership bookkeeping and place nothing. The nodes are
   *  NOT destroyed — the caller owns them (see §2.3). */
  dispose(): void
}

export function createOwnedListHost<N = unknown>(
  options: OwnedListHostOptions<N>,
): OwnedListHost<N>
```

**The refusal pattern, exactly.** **No method of this host throws — for any input.** Every method
returns a `ListHostResult`; a refused operation contributes a `ListHostRefusal` to `refused` and
leaves the host's state valid. `dispose()` returns `void` and is idempotent. **`ok` is `false` iff
`refused.length > 0`** (row `I-1`) — there is no "ok with refusals" state.

**Totality note, stated precisely so it cannot be over-read as a partial-write licence.** The host
is **atomic per call at the ownership level**: an entry that is refused is **not placed, not
owned, and not added to `order`**, while **every other entry in the same call is placed normally**.
This is **not** a partial write in the sense the prohibition-6/`SCH-8` family forbids: the host's
own contract is a **list of entries whose individual validity is caller-controlled**, and refusing
an invalid entry while placing the valid ones is **the contract**, not an error path. **A caller
that needs all-or-nothing supplies valid entries** — and a row asserts exactly that behaviour
(`F-3`, `F-4`, `F-5`).

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **mount**; every
**key** (an opaque string — "an opaque key" is the contract); every **node** (the caller creates it,
or supplies a factory that does); the **order** and the **`orderOf`** policy; the **payload**; every
**callback**; and every **visual/structural attribute** of the nodes.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `tab`/`Tab`, `strip`/`Strip`, `pane`, `zone`, `region`, `document`, `active`/`selected` as vocabulary; keys are typed as an **open** `type ListKey = string` (an alias, not a closed string union — so a consumer value can never be a member); the module documents **no** consumer constant. The only string-union is `ListHostRefusal['code']`'s **five** contract diagnostics. | static source row over the module file |
| **2** | **No app UI content** authored | The host authors **no** text, **no** label, **no** class, **no** style, **no** `role`/ARIA attribute, **no** default node, and **no** selected/active state. It writes **only** three things: `appendChild` (or the equivalent place operation) of a caller node, `remove()` of a node **it placed**, and **nothing else**. A static row asserts the module calls no attribute-writing method. | static row + `I-4` |
| **3** | **No policy defaults** | No default order policy, no default mount, no default node, no default label, no built-in comparator beyond *"keep the supplied order"* (which is the **absence** of a policy, not a policy), no default key. Omitted `orderOf`/`order` ⇒ **supplied order**, and that fact is pinned by a row. | `F-6` + `M-2` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC. The host's **only** state is its own ownership bookkeeping (owned keys → placed nodes), which is the mechanism's necessary state — **it is not a store of consumer data and it persists nothing**; `dispose()` empties it, and a row asserts no state survives `dispose()`. | `M-14`, `I-5` |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, overflow, focus, real-click or rendered-geometry property, and its module expands no shim member. Real-DOM identity is **OPTIONAL** (`[U]`, §5.2) and **nothing in §3 depends on it**. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 Ownership — the exact rule (the amendment's hard row, stated falsifiably)

1. **The host owns exactly the nodes it placed.** "Placed" means the node objects passed to (or
   returned by the factory for) the current entry set and appended by the host.
2. **On a `remove`/`close`/replacement, the host removes exactly those.** If a node it placed was
   meanwhile **detached by the caller**, the host's removal is a **no-op that must not throw**
   (`F-6`).
3. **Foreign siblings ARE NOT TOUCHED.** A foreign sibling is any child of the mount that the host
   did not place. **The hard row: a foreign sibling survives two re-renders as the SAME element
   (`toBe`, reference identity), and its position among its siblings is unchanged** (`M-8`).
4. **`dispose()` relinquishes ownership WITHOUT destroying the nodes.** The caller created them;
   destroying caller nodes would be a content/ownership overreach. **A row asserts that after
   `dispose()` every placed node still exists and is still reachable by the caller**, and that the
   host's bookkeeping is empty.
5. **The host never re-parents, clones, or re-creates a caller node.** **A row asserts reference
   identity** (`toBe`) of `placed[i]` against the exact object the caller supplied — for the whole
   life of the entry (`I-6`).

### 2.4 Order-as-projection — the exact rule

1. **`orderOf(entry)` is the comparator; it is INJECTED.** Omitted ⇒ the **supplied order**.
2. **`setOrder(keys)`** sets the projected order. Keys **not** in the current set and **duplicate**
   keys in `keys` are **ignored**; the projected order contains **exactly** the current keys, once
   each. **A row asserts the `order` field is a permutation of the current key set** (`I-7`).
3. **A permutation reorders the placed nodes with per-entry identity preserved** (`M-7`): after
   `setOrder`, `placed` is in the new order and each element is the **same object** as before.
4. **DOM order is NEVER the authority.** The host's own `keys()` is the state; the tree is its
   projection. **A row asserts that reordering does not read the tree** (the module contains no
   child-order read other than its own bookkeeping — a static row).
5. **An order change performs ZERO graph ops** (ruling 3): no `dispatch`, `op`, `applyCommand`,
   `load`, `teardown`. Static import row + a counter row using an injected spy is **not** possible
   (there is no graph seam) — so the row is the **static** one, and this spec says so rather than
   inventing a spy.

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **Empty set** | `createOwnedListHost({ mount })`; `render()`; `setEntries([])` | `ok === true`; `order` `[]`; `placed` `[]`; `removed` `[]`; `refused` `[]`; the mount is **unchanged**; **nothing throws** | `[T]` |
| **M-2** | **Supplied order is the default projection** | `setEntries([a, b, c])` with **no** `orderOf` | `order` is exactly `[a.key, b.key, c.key]`; `placed[i]` is entry `i`'s node **by reference**; the mount's child sequence for those nodes is `a, b, c` | `[T]` |
| **M-3** | **`orderOf`-projected order** | `orderOf: (e) => e.payload.n` with payloads `2, 0, 1` | `order` is by ascending `n`; `placed` follows; identity preserved | `[T]` |
| **M-4** | **`orderOf` ties keep supplied order (stability)** | Two entries with equal `orderOf` values | Their relative order is the supplied order — **the host does not invent a tiebreak** (prohibition 3). **A row asserts this, and a later pass must not "stabilise" it differently without amending this clause** | `[T]` |
| **M-5** | **The caller supplies nodes directly** | `setEntries([{key, node}])` | `placed[0] === node` (`toBe`); `itemFactory` is **never called** (an injected spy row) | `[T]` |
| **M-6** | **The factory path — a caller-INJECTED factory** | `setEntries([{key}])` with `itemFactory` | `placed[0]` is the factory's return **by reference**; the factory is called **once per node-less entry** | `[T]` |
| **M-7** | **Order-as-projection: a permutation preserves identity** | place 3 entries, then `setOrder([c, a, b])` | `order === [c, a, b]`; `placed` matches; **each element is the SAME object as before** (`toBe`); `removed` is `[]` (a reorder removes nothing) | `[T]` |
| **M-8** | **FOREIGN SIBLINGS SURVIVE (the `V-7` hard row)** | Append two caller-created foreign elements to the mount; `setEntries`/`render` **twice** | `ok === true`; **both foreign elements are the SAME objects after the second render** (`toBe`); they were never removed or re-appended; their relative order is unchanged; the host placed its own nodes **inside the same mount** | `[T]` |
| **M-9** | **Activation fires exactly once** | `activate(key)` on a known key | `onActivate` called **exactly once** with `(key, entry)`; `ok === true`; `refused` `[]`; a second `activate(key)` calls it **again once** (activation is not one-shot — a row asserts the count is exactly 1 **per call**) | `[T]` |
| **M-10** | **Close fires exactly once and drops ownership** | `close(key)` on a known key | `onClose` called **exactly once**; the key leaves `keys()`; the node the host placed is **removed from the mount**; `removed` contains it | `[T]` |
| **M-11** | **`remove(key)` is `close`'s sibling and does not fire `onClose`** | `remove(key)` | the key leaves `keys()`; the node is removed; **`onClose` is NOT called** (the two are distinguishable — a row asserts the count is 0) | `[T]` |
| **M-12** | **Replacement keeps the caller's node identity when the caller supplies the same object** | `setEntries([e])`, then `setEntries([e])` again | the same node object is still placed (`toBe`); **no remove+re-add cycle is observable** (`removed` is `[]`) — `I-2` | `[T]` |
| **M-13** | **`setEntries` replaces a changed node for the same key** | `setEntries([{key:'k', node: n1}])` then `setEntries([{key:'k', node: n2}])` | `n1` appears in `removed`; `placed[0] === n2`; `order` still contains `'k'` **once** | `[T]` |
| **M-14** | **`dispose()` relinquishes ownership without destroying caller nodes** | place 3, `dispose()` | no method throws; `keys()` `[]`; the three nodes **still exist and are still reachable by the caller** (reference-held, not removed); **no further host state** (`I-5`); a second `dispose()` is a no-op | `[T]` |
| **M-15** | **A `null`/absent mount ⇒ every operation a no-op with a VALID state** | `createOwnedListHost({ mount: null })`; `setEntries`/`setOrder`/`activate`/`close`/`render`/`keys` | **no throw for any call**; `ok === true` when the input was valid (nothing was refused — the host simply has nowhere to place); `keys()` still reports the **current** keys; `placed` is `[]`; `removed` is `[]`. **A later `mount` is NOT retro-fitted** (the option is read once — a row pins that no setter exists) | `[T]` |
| **M-16** | **A mount whose child surface is malformed is a valid no-op, never a throw** | `mount: {}`, `mount: 42`, `mount: 'div'` | **no throw**; operations behave as M-15's no-op path; `ok === true` for valid inputs (nothing refused), `refused` `[]`. **The mount's absence is a configuration, not an error** | `[T]` |
| **M-17** | **`ok` reflects the current call only** | A call with one refused entry followed by a clean call | The second call's `ok === true` and `refused` `[]` — refusals do not accumulate into host state | `[T]` |

### 3.2 Documented fail-states / refusals (each is a typed `code`, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **Unknown key** | `remove('nope')` / `close('nope')` / `activate('nope')` | **no throw**; `ok === false`; `refused` has exactly one member with `code === 'unknown-key'` and the **exact key string** as supplied; **no callback fires**; state unchanged | `[T]` |
| **F-2** | **Duplicate key in one `setEntries` call** | `setEntries([{key:'k', node:a}, {key:'k', node:b}])` | **no throw**; **one** refusal with `code === 'duplicate-key'`; **the FIRST occurrence is placed and the second is refused** (first-wins, stated so it is not ambiguous); `order` contains `'k'` **once** | `[T]` |
| **F-3** | **An entry with no node and no factory** | `setEntries([{key:'k'}])` with **no** `itemFactory` | **no throw**; one refusal with `code === 'no-node'`; the key is **not owned**; `order` does not contain it; `ok === false` | `[T]` |
| **F-4** | **The factory returns `null`/`undefined`** | `itemFactory: () => null` | **no throw**; one refusal with `code === 'factory-returned-null'`; the key is not owned | `[T]` |
| **F-5** | **A malformed entry** | A non-object entry; `node: null` **with** a factory absent; `key` not a string (`42`, `null`, `{}`, `''`) | **no throw**; one refusal with `code === 'malformed-entry'`; other entries in the same call are placed normally (the §2.1 totality note) | `[T]` |
| **F-6** | **A previously placed node was detached by the caller** | The caller removes a host-placed node from the mount itself, then `close(key)`/`setEntries([])` | **no throw**; the removal is a no-op; the key still leaves `keys()`; the node appears in `removed` **or not** — **the row pins that the host does NOT throw and that the key is not left owned**. *(This is the one cell deliberately stated as a choice for the implementer, because the shim's `remove()` is idempotent at `src/shared/dom-shim.ts:89-96`, read: the honest contract is "no throw, no dangling ownership", not a specific `removed` membership.)* | `[T]` |
| **F-7** | **A `null`/absent mount is NOT a refusal** | M-15's configuration | `refused` is `[]` and `ok === true` — **the malformed-mount class of `U-MOUNTGUARD`'s `mount-not-appendable` does NOT apply here**: this host's absent mount is a **supported no-op configuration**, while `U-MOUNTGUARD`'s probe is **asking a question about a tree**. **The asymmetry is deliberate and recorded so a later pass does not "harmonise" the two** | `[T]` |
| **F-8** | **`setOrder` with unknown/duplicate keys** | `setOrder(['a','a','nope'])` | **no throw**; unknown/duplicate keys are **ignored**, not refused; `order` is the current key set in the requested relative order; `ok === true`; `refused` `[]`. **Stated so the "ignored" rule is not confused with a refusal** | `[T]` |
| **F-9** | **`setEntries(null)` after a populated set** | populate 3, then `setEntries(null)` | **no throw**; the 3 host-placed nodes are removed; `order` `[]`; the 3 nodes appear in `removed`; foreign siblings untouched (**the `M-8` row re-run in this shape**) | `[T]` |
| **F-10** | **`activate` on a key whose node was detached** | detached node, then `activate(key)` | The callback **still fires once** (activation is a caller-semantic event, not a DOM event) — a row pins it, so a later pass cannot make activation silently depend on the tree | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `ok === (refused.length === 0)` **always** | No "ok with refusals" state exists |
| **I-2** | A `render()` with unchanged inputs performs **no** child mutation: `removed === []` and no node is re-appended | Idempotence, and what makes `M-12`/`M-7` assertable |
| **I-3** | **Foreign siblings are reference-identical before and after every call** | The amendment's hard row, as an every-state invariant (stronger than `M-8` alone) |
| **I-4** | The host writes **only** `appendChild`-class placement of caller nodes and `remove()` of **its own** placed nodes — **no attribute write, no `textContent` write, no `className`, no `style`** | Prohibition 2, made falsifiable (static row + a state row) |
| **I-5** | After `dispose()`, the host retains **no** owned key, **no** placed-node reference, and no other state | Prohibition 4 |
| **I-6** | For every owned key, `placed[i]` is **reference-identical** to the object the caller supplied (or the factory returned) for the whole life of the entry | §2.3 item 5 — the anti-cloning rule |
| **I-7** | `order` is **exactly** the current key set, each key **once**, in some order | §2.4 item 2 |
| **I-8** | No method throws **for any input** — the totality claim, asserted by a fuzz-shaped deterministic table (`null`, `undefined`, numbers, strings, arrays-in-place-of-objects, detached nodes, a mount that is a `ShimElement` already holding host-placed children) | The refusal contract's boundary |
| **I-9** | Every `ListHostResult` array is a **fresh array** and the result object is not reused across calls (a caller mutating a returned array cannot change host state) | A small but assertable anti-aliasing rule |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/owned-list-host.test.ts`** — authored **first**,
**RUN**, and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/owned-list-host.js'` (or the equivalent resolution failure) for
every row. **There is no host-fix branch for this unit** (contrast `U-MOUNTGUARD`): the module does
not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-9`, `M-1`..`M-17`, `F-1`..`F-10` **in that order**.
2. **RUN and REPORT** the failing set verbatim — the file/module resolution failure plus any row
   that can already be evaluated (e.g. a static source row over the module file fails as
   "file does not exist").
3. **Then** implement the least code that makes them green.
4. **Re-run**; record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a shim change.** The rows run against the landed shim as-is.
- **Not a styling or overflow test.** Ruling 4 drops the "one overflow mode" criterion; a row
  asserting a style, a class, or an overflow behaviour is a **scope violation**.
- **Not a tab-strip test under another name.** A row asserting `role`, `aria-selected`, a label, or
  a "selected item" is a **prohibition-1/2 violation**.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.2).
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires a **new shim member** (`querySelectorAll`, `getComputedStyle`, …) | **Scope violation** (`H-r5`) — re-write the row to use the shim's public `children`/`remove()` surface. |
| **S-3** | A row requires reading the **tree** to establish order | **Violates ruling 3** (order is a projection) — re-write it against `keys()`/`order`. |
| **S-4** | A row needs a **graph seam** to prove "zero graph ops on order change" | There is no seam; the row is **static** (module imports/calls). **Do not add a spy, a hook, or an injection point.** |
| **S-5** | A row is only satisfiable by making `dispose()` destroy caller nodes | **Violates §2.3 item 4** — re-write it. |
| **S-6** | A test asserts a **callback count of exactly one** and the implementation fires twice for a replace-then-render cycle | **The implementation is wrong, not the row** — `M-9`/`M-10`/`M-11` are counted rows. |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 8), (b) the **wave-D order** — `U-MOUNTGUARD` first, (c) this spec to exist (**done: this
filing**), and (d) a **TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9). Its
`## OPEN` row (D2) stays `BLOCKED` until all four hold.

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/owned-list-host.ts` | **NEW** — the seven exports of §2.1 | always |
| 2 | `tests/owned-list-host.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `docs/specs/listhost.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**`. **This unit changes no existing file
except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | the generic signatures (`N = unknown`) are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read); a new `src/shared/` module that fails to bundle is a failure even when the suite is green |

**OPTIONAL `[U]` real-DOM identity row — and its named preconditions.** The row: *one mount, a
caller-supplied node placed and then re-ordered, with the node's identity observed in the **real**
DOM across the reorder*. **Preconditions, all named and none assumed:** (a) the `ui` leg exists and
is green for the same built tree, (b) `npm run divergence` is green for that tree, and (c) for any
**attribute-presence**-shaped variant, the `H-r10` extractor, owed to **`U-DIVERGENCE-EXT`** — a
real-DOM reorder row reads element **identity/order**, not attribute presence, so it does **not**
depend on the extractor, but it **does** depend on the leg. **If not taken, no §3 row is weakened.**
**A node-suite green is never a real-DOM green** (`REAL-DOM-UI-GATE-LEG`'s "the shim is DEMOTED to
pre-filter — not retired" clause, `docs/decisions.md:65`, read).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-LISTHOST` · wave **D** · `DONE` or the honest non-DONE status.
2. **The wave-D order confirmation**: that `U-MOUNTGUARD` landed (its rule-3 outcome named) before
   this unit's red.
3. **The code/test delta**: the module + the test file, named.
4. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
5. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
6. **The `[U]` row's status**: taken (with its result) or **not taken** (with the reason).
7. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
8. **The tracker reconciliation** (`AGENTS.md` items 3/6).

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **Two candidates, both genuine quantifications, both sampled deterministically:** (i) *"for **every** permutation of the current key set, `order` is that permutation and every element's identity is preserved"* — §3 samples a handful (`M-7`, `I-7`); (ii) *"for **every** input shape, no method throws"* — §3 samples a deterministic table (`I-8`, `F-1`..`F-10`). **Neither property is proven by its sample**, and this spec says so rather than implying coverage. |
| Could this unit execute them **as properties**? | **No, and not because of effort:** no harness exists, and **adding one is a `devDependencies` change** — outside §5.1's diff scope and a gate of its own. |
| Do the layers permit a property run here? | **Yes for the node layer, in principle** — everything here is pure `[T]` work over an injectable mount. **The blocker is the harness, not the layer**, and that is stated rather than hidden behind a layer claim. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`M-7` = the reorder drive, `M-8` = the foreign-sibling drive, `I-8` = the no-throw drive). **A strategy id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The two quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `M-7`/`I-7`/`I-6` (identity-under-permutation) and `I-8` + `F-1`..`F-10`
   (totality/no-throw).
3. **No `fast-check` and no generator is added by this unit.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`).

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If the host cannot be written such that a
foreign sibling survives re-renders **by reference** while the host still owns and removes exactly
its own nodes, then "own-node ownership" is not a coherent contract and the unit fails.* The
falsification test is `M-8` plus `I-3`: **if any implementation reaches `M-8` by re-creating,
re-parenting or re-appending a foreign sibling, the row fails** — the rule is identity, not
presence.

**A second, independent falsification.** *If order cannot be projected without a graph pass or a
tree read, then ruling 3 is not implementable and the unit fails.* The test is the static row
(§4.4 `S-3`/`S-4`): the module imports nothing from `src/renderer/**` and reads no tree for order.

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause
is found (§6's two falsifications) and **the spec is amended** with the clause marked `SUPERSEDED`
and the reason recorded, **before** any implementation continues; (c) the unit is **declined back
to the fork** — admissible only if the amendment's own adoption is shown to rest on a false premise,
which would be a **new gate**, not this unit's call (`H-r1`'s cite-and-supersede rule).

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` first), and
   on its red set** (§0 ruling 8, §4.5). **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the
   `U-MOUNTGUARD` DONE pass; the sentence above is kept visible): the wave-D go-ahead WAS GIVEN
   (architect, 2026-09-27), `U-MOUNTGUARD` is `DONE`, and this unit is now blocked only on its own red
   set — the wave-D order still binds.**
2. **"Owned-node list host" is the amendment's own rename, and the rename is normative.** A later
   pass that implements a tab strip (labels, `role`, selected state, overflow) under this spec's
   symbol has **violated the contract**, not fulfilled it. **`SCH-11`'s own pre-amendment decline
   reason was "`createTabStripHost` leaks consumer vocabulary"** — the reshape exists because of it.
3. **`V-7` is resolved here by ownership, and the same hard row binds `U-SLOTHOST`.** `SCH-9` #2's
   "publish replaces the element" is **declined**; the surviving rule is *"a re-render removes
   exactly the nodes the host placed and nothing else"*. **A later pass that re-merges the two units
   must not weaken this row** (`H-r15`).
4. **No magnitude-equivalence claim exists here.** Order is a projection: **the host may not claim
   the graph's child order changed**, and **no equivalence between "one visible item" and any graph
   op** may be asserted (the amendment's per-unit equivalence limits, read). The mechanism owns **no
   graph and no store**.
5. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for
   this unit also **never a real-DOM or layout green**. The `[U]` row is optional and
   precondition-gated (§5.2).
6. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
   (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result-object + per-call refusal list** shape (the
   sources say "the host projects an order" and "unknown key ⇒ a typed refusal", but name no return
   shape for the LIST host — note that the **typed refusal** phrasing is `SCH-9`'s; this unit's
   refusals are the same discipline applied to its own five codes); (ii) **first-wins** on a
   duplicate key within one call (`F-2`); (iii) **`ok` is `refused.length === 0`**; (iv) **stability**
   of `orderOf` ties (`M-4`); (v) the **absent-mount no-op is NOT a refusal** (`F-7`) — deliberately
   asymmetric with `U-MOUNTGUARD`'s `mount-not-appendable`; (vi) `remove` does **not** fire
   `onClose` while `close` does (`M-11`); (vii) `dispose()` **relinquishes without destroying**
   (§2.3 item 4). **Each of these is a decision, not a derivation — the sources are silent on all
   seven.**
8. **This spec deliberately leaves TWO seeds UNRULED** rather than inventing a rule: **`A-5`**
   (`orderOf` that throws) and **`A-9`** (one node object for two keys). **The adversarial pass must
   rule them and record the ruling here.** Naming an unresolved input as unresolved is the contract;
   silently picking an answer would be the `C-16` class (a contract reverse-engineered from one
   consumer).
9. **`SCH-4`'s `orderOf` is NOT this unit's and is not imported.** Ruling 6 dissolves the edge; the
   callback is **injected here**. A later pass that imports a zone/track module to get an ordering
   policy has **reinstated a dissolved edge** (`H-r6`).
10. **The dropped "one overflow mode" criterion stays dropped.** A later pass may not add it back
    "because a host needs it": overflow is CSS, **this repo ships no stylesheet**, and the reshape's
    acceptance line records the drop explicitly.

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DROPPED** = a criterion the reshape
removed. **DISSOLVED** = a dependency edge the amendment breaks. **NOT THIS UNIT** = closed
elsewhere or another unit's — listed so no later pass routes it here.

| Source row | Section | Status for `U-LISTHOST` | Where |
| --- | --- | --- | --- |
| `SCH-11` `TAB-STRIP-SHELL`, **ADOPTED-RESHAPED** | amendment §2.2 (the `SCH-11` row), §2.1 | **ADOPTED — this unit**, as the renamed **owned-node list host** | §1, §2, §7 item 2 |
| `SCH-11`'s acceptance: **no `querySelectorAll`** | amendment §2.2 | **DISCHARGED** as a static + behavioural row | §2.2 (prohibitions 1/6), §3 `I-4`, `A-13` |
| `SCH-11`'s acceptance: **no tab-strip vocabulary, no `matchMedia`** | amendment §2.2 | **DISCHARGED** as static rows | §2.2 (prohibition 1), `A-14` |
| The **"one overflow mode" criterion** | amendment §2.2 (*"DROPPED"*) | **DROPPED — must not be re-added** | §1, §7 item 10 |
| **Order-as-projection** + **no graph pass on order change** | amendment §2.2 | **DISCHARGED** | §2.4, §3 `M-7`/`F-8`, §6 |
| **Own-node ownership** + **foreign-sibling-survives (the `V-7` hard row)** | amendment §2.2, §"Per-unit equivalence limits" | **DISCHARGED as the hard row** | §2.3, §3 `M-8`/`I-3`/`F-9`, §7 item 3 |
| **`orderOf` injected as this contract's own parameter** (the dissolved `SCH-4 → SCH-11` edge) | `H-r6`; `C-15` | **DISSOLVED — `orderOf` is injected here**, not imported | §2.1, §7 item 9 |
| The **`SCH-9 → SCH-11`** edge (`"`SCH-9` declined"`, pre-amendment) | `H-r6` | **DISSOLVED**, then **partially re-created by A-d7 in the OPPOSITE direction**: `U-SLOTHOST` is now adopted (host half only) and its publisher half stays declined | §7 item 3 |
| The eight-unit plan's **`U6`** row (its red-set cell) | amendment §"The amended unit plan" | **INHERITED-ONLY provenance** (superseded by the 20-unit plan, `H-r20`) — its red-set cell lists exactly the rows this spec expands (`M-7`/`M-8`/`M-17`/`F`-family) | §3, §4 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| The amendment's **"no new MCP surface"** obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-15` |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3` | **INHERITED-ONLY** — the shim is untouched | §1, §4.4 `S-2` |
| `RK-10` (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 2/7/8 are this unit's answer: the rename, the seven recorded contract decisions, and the two deliberately-unruled seeds | §7 items 7–8 |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `REAL-DOM-UI-GATE-LEG` (the shim is demoted to pre-filter) | `docs/decisions.md:65` | **CARRIED** — a node-suite green is never a real-DOM green | Layer declaration, §5.2 |
| `UI-RENDERED-WITH-PROVIDENT` / `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (a mechanism authors no content) | `docs/decisions.md:53` / `:54`, both read | **CARRIED** — prohibition 2 is this unit's compliance row | §2.2, §7 item 4 |
| Row **D2** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/listhost.md` (**OWED — not filed**) — **this filing discharges that cell** (the row itself stays `BLOCKED`, and its leg cell's *"a real-DOM identity row (**optional**) → `ui`"* is §5.2) | this file |
| `docs/specs/listhost.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |

**Citation hygiene for this file:** every `src/**` and `tests/**` anchor cited above was **read in
this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` (143 lines,
`:1-3`/`:89-96`); `package.json:10`/`:19`/`:26-31`; `tests/engine-pin-version.test.ts:174-197`;
`docs/decisions.md:53`/`:54`/`:65`). **`docs/next-steps.md` is cited by row id only** — that file's
own convention forbids line citations. **One anchor the sibling spec found stale is re-stated here
for the same reason:** `docs/decisions.md` is **406 lines** today, its ledger is split into labelled
appended blocks (`:104`, `:124`, `:139`, `:155`, `:172`, `:189`, `:209`) plus `## HISTORICAL`
(`:230`), `## SPECULATIVE / IN GATE` (`:288`) and `## AMENDMENTS TO PRE-EXISTING ACTIVE ROWS`
(`:294`) — so a bare `decisions.md:<n>` from an earlier layer **must be resolved against the live
file before it is quoted**, which is what this spec did.

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **Row D2's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent. **⟶ FLIPPED 2026-09-27 (the handover-staleness pass): `D2`'s spec cell
now reads `FILED 2026-09-27`**, so the sentence above describes the filing pass's own state and nothing current.

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-LISTHOST`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to
review — RCA-3 runs *after* a unit's green). **The table is the SEED SET for the pass that will
run; no row below is a finding, and none may be cited as one.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | Two foreign siblings appended **before and between** two renders: are they the **same objects** at the end (`toBe`), and were they ever re-appended or re-parented? | `[T]` |
| **A-2** | A caller **detaches** a host-placed node, then the host is asked to remove it, then asked to re-add the same key — does any path throw, or leave the key dangling in `keys()`? | `[T]` |
| **A-3** | `setOrder` with a permutation that **omits** a current key and **adds** an unknown one — is the resulting `order` exactly the current key set? | `[T]` |
| **A-4** | `setOrder` given the same array object twice, and given a caller array the caller later mutates — does host state change? (`I-9`) | `[T]` |
| **A-5** | `orderOf` that **throws** (a malformed injected comparator) — is that the caller's bug surfacing, or does the host swallow it? **This row must be RULED explicitly** (this spec does not decide it: `orderOf` is caller code, and a caller-code throw is not this host's refusal class — the pass must record the ruling rather than leave it unspecified) | `[T]` |
| **A-6** | `orderOf` returning **mixed types** (`string` vs `number`) — what order results, and is the projection still a permutation of the key set? | `[T]` |
| **A-7** | Duplicate keys across **separate** `setEntries` calls (not within one) — is the refusal class the same, and is the first-wins rule consistent? | `[T]` |
| **A-8** | A key of `''` (empty string), a key with whitespace, a unicode key, and a very long key — opaque, so all must work **identically**; a row asserts no normalization anywhere | `[T]` |
| **A-9** | The **same node object** supplied for **two different keys** — what happens (double placement? one placement?), and is it a refusal? **This row must be RULED explicitly** (this spec does not decide it; the pass must, and record the ruling here) | `[T]` |
| **A-10** | A mount that **already contains** host-placed-looking children from a **prior host instance** (two hosts, one mount) — is ownership isolated per host instance? **Must be ruled** | `[T]` |
| **A-11** | `itemFactory` returning a node **already placed** for another key, or returning the host's own mount | `[T]` |
| **A-12** | Malformed injections: `orderOf`/`itemFactory`/`onActivate`/`onClose` supplied as non-functions; `order` as a non-array; `options` as `null`/a string | `[T]` |
| **A-13** | Static/unauthorized-access sweep: does the module contain `querySelectorAll`/`querySelector`/`closest`/`getElementById`/`matchMedia`/`activeElement`/`getComputedStyle`/`document`/`window`, any `src/renderer/**` import, any `electron`/`node:fs`, any store, any module-level mutable state? | static |
| **A-14** | Vocabulary sweep: does the module contain `tab`/`strip`/`pane`/`zone`/`region`/`overflow`/`active`/`selected` in any spelling, or any closed string-union of consumer values? | static |
| **A-15** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? | `[H]` + static |
| **A-16** | **`dispose()`-then-use:** every method called after `dispose()` — does each return a valid result, and is no ownership resurrected? | `[T]` |
| **A-17** | **Callback re-entrancy:** `onActivate` calling `close(key)` (or `setEntries`) inside the callback — is the host's state coherent, and is the callback count still exactly one? | `[T]` |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-SLOTHOST` responsibility (per-key containers, attribute/class application), any `U-PROJ` responsibility (variable values), or any `U-MOUNTGUARD` responsibility (counting engine-emitted roots)? **Duplication is a FINDING** — the three units share one layer idiom and must not share one contract. | static + `[T]` |
| **A-19** | **The `V-7` re-entry probe:** does any behaviour of this host let a "replace" remove a foreign sibling — i.e. is the foreign-sibling rule truly ownership-scoped and not position-scoped? | `[T]` |

## 3b. The adversarial pass's disposition table — **the shape this contract will be reconciled to**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** (A-5/A-9/A-10 are named candidates) — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3 |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; the package is never patched |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no
adversarial pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

