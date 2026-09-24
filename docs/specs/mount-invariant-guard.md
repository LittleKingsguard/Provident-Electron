# Spec — `U-MOUNTGUARD`: the cross-envelope mount cardinality/identity probe (`SCH-1`'s invariant half)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-MOUNTGUARD`**, the invariant half of
`SCH-1` `SHELL-REGION-HOST`). **The unit has NOT run: nothing here is implemented, no probe exists,
no red set has been authored and no leg has been run by this pass.** This pass files the contract.
**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is
**spent** — wave B landed. Wave **D** is authorised by no ruling currently on the record, so this
unit's red set may not be RUN and it may not be delegated (`AGENTS.md` item 9).
**Status of its red set: RED SET OWED — NOT AUTHORED, NOT RUN** (RCA-1: the red is written and RUN
and REPORTED before any implementation). Source of this unit:
`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s appended
**`Amendment record (A-d4…A-d8)` — the governing layer** (`S-d8`'s admission rule with the six
prohibitions; the `SCH-1` per-item row in §2.2; the `U-MOUNTGUARD` rows in §2.1/§3; `H-r4`/`H-r8`
as amended by `H-r20`), plus `docs/next-steps.md`'s `## OPEN` row **D1**
(`docs/specs/mount-invariant-guard.md` — **OWED — not filed**; this file is that filing) and the
pre-amendment eight-unit plan's `U2` row (kept for provenance: it is the row that names the owner
artifact and the four call sites).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-1` IS SPLIT** (`S-d2`, unchanged): the **cross-envelope mount cardinality/identity invariant** is ADOPTED as this repo's own unit; the **region host** half (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions`) is **DECLINED + REFILED to the fork** and **is not restored by A-d7**. | §3, §7 item 2 |
| **2** | **The region half's blockers are `(C)#1` + `(C)#6`, NOT prohibition #5** (adjudicated in the amendment's §0 and restated in the `SCH-1` row of §2.2). It fails **(C)#1** as a consumer-specified closed region set and **(C)#6** (API-shape criteria plus a render-count row this repo refuses), and it is **redundant for the invariant it was meant to support** — a declared region sits **outside** the mount, so root counting is unaffected. | §3, §6 (prohibition table) |
| **3** | **The falsification is BINDING and unchanged:** a cycle-2 load into one mount yielding **2** engine-emitted roots ⇒ **a HOST fix is owed**; **1** ⇒ **detection + pin only**, and **no guard ships if the adversarial pass finds no reproduction**. This is the *only* ruling that decides the unit's shape. | §4, §5.4, §7 item 3 |
| **4** | **The verification layer is HELD** (`S-d3`, `H-r5`): the DOM shim **must NOT be expanded**; real-DOM claims belong on the offscreen Electron legs. The **one** admitted shim carve-out (`H-r7`, `ShimElement.removeAttribute`) is **already landed** and is **not this unit's to touch**. | §2.2, §5.3, §6 (prohibition 6) |
| **5** | **The mount invariant's current behaviour is UNPROVEN** (the amendment's Layer declaration item 2): *"`U-MOUNTGUARD`'s red run is what settles the cardinality; this record asserts none."* **This spec asserts none either.** The per-teardown test that exists (`tests/runtime-host.test.ts:150-161`, read) is a **per-teardown** statement, **not** a cross-envelope one. | §2.4, §4.1, §7 item 4 |
| **6** | **The go-ahead for wave D does not exist yet.** The wave-B go-ahead is spent; *"No unit is delegable"* (amendment §3, `H-r20`). **This unit is BLOCKED on that go-ahead plus its red set.** | this status block, §4.5, §7 item 1 |

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no probe result is recorded here**. Every row below is a *contract
row*, never a measurement.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, `src/renderer/runtime.ts` and this unit's own `src/shared/` module | not engine-internal behaviour |
| **[E]** | engine-side | the **installed** `provident-ssr@0.5.1` dist's own behaviour, as observed through a public engine surface | not a package defect call |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read), the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity/divergence leg, **not** assembled-app acceptance |

**[B]**/**[A]** (the shim battery host and the `divergence` leg) are **not** layers this unit uses:
its only leg is the node suite (§5.3), and its optional real-DOM row is a `[U]` row.

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.** *A node-suite green
   is envelope/pure-layer evidence, **never assembled-app evidence*** — that sentence is part of
   this contract, not a caveat attached to it.
2. **The count the probe takes is a count of ENGINE-EMITTED elements**, never of DOM roots: only
   elements carrying `data-node-id` are engine-emitted (the opt-in `renderOptions` pinned at
   `src/renderer/runtime.ts:90`, read). A cross-envelope count of *DOM* roots is on the
   "what every node-green must NOT be claimed as" list (amendment's §"Adopted units' security /
   equivalence obligations") and is **not** this unit's claim.
3. **The probe's own subject is the SHIM's element tree.** The shim implements no
   `querySelector`/`querySelectorAll`/`closest`, no layout, no CSS resolution, and no
   `getComputedStyle` (`src/shared/dom-shim.ts:1-3` announces exactly this scope; read this pass,
   143 lines). **A `[T]` cardinality green says what the shim's tree holds under the engine's
   emitted output — it is not a real-DOM tree assertion.**

## 1. Scope

**One deliverable: a cross-envelope mount cardinality/identity probe** — the repo's own, in-tree
half of `SCH-1` — plus its red set, and **conditionally** a host fix in `src/renderer/runtime.ts`
**only if** the red run proves rule 3's two-root outcome.

1. **What the invariant is, stated in this spec's own voice.** *For one stable mount and one
   re-derivation path, at every point where the graph has been re-derived, the mount holds exactly
   one engine-emitted root element, and that element is the graph's current root node.* The mount
   reference may not change across re-derivations.
2. **What the probe is.** A **pure** function over an injected mount element (and an optional
   injected identity expectation + an optional injected callback) — **no ambient `document`, no
   `window`, no global lookup, no store, no I/O** (admission **(B)**; §2.1). It **observes**; it
   never renders, loads, tears down, dispatches, or mutates.
3. **What the unit may land.** Either (a) **detection + pin only** — the probe + its rows, no host
   change, if the red run yields **1**; or (b) **a host fix** in `src/renderer/runtime.ts` + the
   probe + the regression rows, if the red run yields **2**. **Rule 3's third clause binds both
   outcomes: if the adversarial pass finds no reproduction, NO GUARD SHIPS** — the unit then lands
   as its recorded red evidence + this spec's rows as *contract rows that failed their own
   falsification*, and the supervisor's DONE row must say so.
4. **The four re-derivation paths the invariant is stated over** (each read this pass; **one of the
   four anchors the sources cite is STALE — see §8**):
   `loadEnvelope` (`src/renderer/runtime.ts:303`), `loadDoc` (`:330`), `teardown` (`:560`), and the
   `code.*` route — `codeLoad` (`:980`) → `loadEnvelope` (`:994`), entered from
   `codeLoadBatch` (`:1016`). Every one of them calls `tearDownGraph()` first (`:304`, `:331`,
   `:561`, and `:994`'s `loadEnvelope` call), **so all four are one code path with one mount**.

**Explicitly OUT of scope (do not do in this unit):**

- **The region host, in any spelling.** No `ShellRegionName`, `ShellRegionSpec`, `ShellRegions`, no
  region declaration, no region registry, no region→mount resolution. **Declined, not deferred to a
  later wave of this unit** (§0 rulings 1–2).
- **Any shim change.** `src/shared/dom-shim.ts` is **not touched**; the shim is host-owned test code
  and **no shim change is needed** (the leg cell of row D1) — the probe reads the shim's public
  element tree. The one admitted carve-out (`H-r7`) is landed and **not re-opened**.
- **Any new MCP surface.** No tool, resource, group, `VALID_GROUPS` member (`src/main/security.ts:134`,
  read: the five members `read`/`dispatch`/`graph`/`code`/`module`), renderer RPC method or
  `MUTATING_METHODS` entry (the set lives at `src/renderer/renderer.ts:12`, read — seven members).
  `ALL_TOOLS` **stays 21** for this unit (`src/main/mcp-server.ts:281-303`, read: 18 `provident.*`
  + the `module.*` trio; the `21 → 22` move belongs to `U-FOCUS-TOOL`).
- **Any registry, store, persistence, file, or `localStorage`.**
- **Any claim about render counts, listener removal, focus/`activeElement`, layout/paint,
  real clicks, or attribute absence after a close.** Each is on the amendment's
  "what every node-green must NOT be claimed as" list.
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists in this
  tree** (globbed `docs/skills/*` this pass: the directory holds `process-guardrails.md` alone), so
  there is **no test-use-case coverage matrix and no demo-page index to update**, and this unit
  changes no page design. **Recorded so no later pass hunts for an owed page-design edit.**
- **Any other wave-D/E/F unit.** `U-LISTHOST`, `U-SLOTHOST`, `U-PROJ`, `U-CENSUS` and every later
  unit are other units, with their own specs, reds and cycles (RCA-2).

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**New module: `src/shared/mount-invariant-guard.ts`** (a pure `src/shared` module; no `electron`,
no `node:fs`, no `src/main/**`, no renderer import). **Four exports**, and nothing else:

```ts
/** One engine-emitted element observed as a DIRECT child of the mount. */
export interface MountRootObservation {
  /** The `data-node-id` attribute value exactly as read off the element. */
  readonly nodeId: string
  /** The element itself, by reference (never a copy, never a clone). */
  readonly element: unknown
  /** The element's serialized open tag + inner HTML, as the shim emits it —
   *  recorded so a failure can be reported without re-reading the element. */
  readonly serialization: string
}

export type MountViolationCode =
  | 'no-root'                     // 0 engine-emitted direct children
  | 'multiple-roots'              // ≥ 2 engine-emitted direct children
  | 'root-identity-mismatch'      // exactly 1, but its nodeId ≠ expect.rootNodeId
  | 'mount-not-appendable'        // mount is malformed: not object-like, or has no children array
  | 'mount-reference-mismatch'    // expect.mount is supplied and !== mount
  | 'expect-mismatch'             // expect is present and not an object

export interface MountViolation {
  readonly code: MountViolationCode
  /** One sentence, in this unit's own voice, naming what was observed. */
  readonly message: string
  /** The count actually observed (0, 1, or N). */
  readonly count: number
  /** Every engine-emitted direct child's nodeId, in document order. */
  readonly nodeIds: readonly string[]
  /** Present only when `expect.rootNodeId` was supplied. */
  readonly expectedRootNodeId?: string
}

export interface MountInvariantResult {
  /** `true` iff there is EXACTLY ONE engine-emitted direct child and, when an
   *  expectation was supplied, its nodeId equals `expect.rootNodeId`. */
  readonly ok: boolean
  /** The number of engine-emitted direct children observed. */
  readonly count: number
  /** Every engine-emitted direct child, in document order. */
  readonly roots: readonly MountRootObservation[]
  /** Every DIRECT child that is NOT engine-emitted (no `data-node-id`). */
  readonly foreignSiblings: readonly unknown[]
  /** The mount element, by reference — returned so a caller can assert that
   *  the mount did not change across re-derivations. */
  readonly mount: unknown
  /** `null` when `ok`; otherwise exactly one typed violation. */
  readonly violation: MountViolation | null
}

export interface MountExpectation {
  /** The graph's current root nodeId. Omit to assert cardinality only. */
  readonly rootNodeId?: string | null
  /** The mount the caller believes it is probing (identity, by reference). */
  readonly mount?: unknown
}

/** PROBE (pure, total, non-throwing). Reads mount.children and each direct
 *  child's `data-node-id`; never renders, loads, tears down or mutates. */
export function probeMountInvariant(
  mount: unknown,
  expect?: MountExpectation | null,
): MountInvariantResult

/** ASSERTION (calls the probe once, then throws on a violation). */
export function assertMountInvariant(
  mount: unknown,
  expect?: MountExpectation | null,
): MountInvariantResult
```

**The throw pattern, exactly.** `probeMountInvariant` **never throws** — not for a `null`/`''`/
string/number/array mount, not for a malformed `expect`, not for an unreadable child. It returns
`ok:false` with a typed `violation` (`'mount-not-appendable'` for a malformed mount,
`'expect-mismatch'` for a malformed `expect`). `assertMountInvariant` calls the probe **exactly
once** and:

| Case | `assertMountInvariant` behaviour |
| --- | --- |
| `ok === true` | returns the **same** result object it read |
| `ok === false` | **throws** `Error` whose `message` begins `mount invariant violated (<code>):` and continues with `violation.message`; the thrown object carries **no** additional properties (a plain `Error`, matching this repo's existing throw style at `src/renderer/runtime.ts:1178`, read) |
| the probe itself were to throw | not a case — **the probe is total by contract, and a test that observes it throwing is a red row of its own** |

**Why a result object AND an assert function.** The result object is what a **probe/red row** needs
(it must be able to *record* a violation, not die on it), and the assert function is what a
**regression row** needs. **A guard that only threw could not produce the red evidence rule 3
depends on.**

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **mount element**; the
**expected root nodeId** (or its absence); the **mount identity expectation**; and — if a later pass
adds one — any **observer callback**. There is **no built-in vocabulary of any kind**: no region
name, no mount id, no tag name, no `data-node-id` value list, no element-type enum, no default
expectation. The only string literals the module may contain are **the probe's own contract
literals**: the observed attribute name `data-node-id`, the six `MountViolationCode` members, the
`'mount invariant violated ('` message prefix, and the diagnostic sentences.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module contains **no** `region`/`Region`/`pane`/`tab`/`zone`/`ShellRegionName`/`ShellRegionSpec`/`ShellRegions` occurrence **at all** (source-level static row), and its only string-union is the six-member `MountViolationCode` whose members are contract diagnostics, not consumer values. Consumer values cross as **opaque strings** (`data-node-id` values are never enumerated). | static source row over the module file |
| **2** | **No app UI content** authored | The module creates **no** element, authors **no** text, **no** class, **no** style, **no** affordance, and emits **nothing** into any tree. It is a **reader**. *(This is what makes it a mechanism and not a UI element — `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `docs/decisions.md:54`.)* | static row: zero `createElement`/`document`/`body`/`textContent` writes |
| **3** | **No policy defaults** | There is no default expectation, no "assume 1", no default mount, no fallback rootNodeId. An omitted `expect.rootNodeId` means **cardinality-only**, and the result reports `expectedRootNodeId` **absent** — a row asserts that absence. | §3.1 rows + a row asserting the field is omitted |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero module-level mutable state, zero file/`localStorage`/IPC. The module holds **no state between calls** — a row probes twice with the same arguments and asserts byte-identical results + no retained reference. | static row + an idempotence row (§3.3) |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member (`src/main/security.ts:134`), no `RpcMethod` member (`src/shared/types.ts:259-281`, read: **21** members), no `MUTATING_METHODS` entry (`src/renderer/renderer.ts:12`), **and no IPC method at all**. `ALL_TOOLS` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s census row (read: 21 keys, asserted 21) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]/[H]** alone. The unit asserts **no** layout, paint, focus, listener-removal, real-click or real-DOM-tree property, **and its module expands no shim member** (§2.4). The **optional** `[U]` row (§5.3) is the only real-DOM row and it is **optional** and **precondition-gated**. | the `[U]` row is marked optional; every §3 row carries `[T]`/`[H]` |

### 2.3 What it must NOT do (the short list, for the TestWriter)

- **No render/load/teardown/dispatch/mutation call** from the module — a static row asserts the
  module imports nothing from `src/renderer/**` and calls no `render`/`load`/`apply`.
- **No DOM writes beyond what is pinned — and what is pinned is NOTHING.** The module writes
  nothing: it does not append, remove, reorder, or set an attribute. (`U-LISTHOST`/`U-SLOTHOST` are
  the units that write; this one reads.)
- **No global lookup**: no `document`, `window`, `matchMedia`, `getComputedStyle`, `activeElement`,
  `querySelector`, `querySelectorAll`, `getElementById`, `closest`.
- **No registry/store**, no caching keyed on the mount, no `WeakMap` of mounts.
- **No MCP surface, no vocabulary, no literals** beyond §2.2's list.

### 2.4 How the probe reads the tree (so the layer is not over-read)

1. **Direct children only.** The engine-emitted roots are the **direct** children of the mount
   carrying `data-node-id` (`src/renderer/runtime.ts:90`'s `{ nodeIdAttribute: true }`, read: every
   emitted element carries its engine `nodeId` in **both** views). Nested elements are **not**
   counted — `SCH-1`'s claim is about **roots**.
2. **Serialization-derived read, no query API.** The attribute value is read off the child's
   **own attribute surface**: a child exposing `getAttribute('data-node-id')` is read through it;
   otherwise the value is parsed out of the child's serialized form (`outerHTML` in the shim,
   `src/shared/dom-shim.ts:108-119`, read — which emits `attrs` then the `id` slot then
   `class`/`style`). **The module must not require `querySelectorAll` anywhere**, matching `SCH-11`'s
   own acceptance line for the sibling unit.
3. **`foreignSiblings` is defined by absence of `data-node-id`** among the mount's direct children.
   That is exactly the class `SCH-11`/`SCH-9` call foreign siblings; this unit never removes them,
   it **reports** them.
4. **No shim member is required and no shim member may be added.** The probe is written against
   the shim's **already-public** surface (`children`, `getAttribute`, `outerHTML`) — which is why
   the row's leg cell says *no shim change is needed*. **A red run that "needs" a new shim member is
   a scope violation, not a red** (`H-r5`; the sole carve-out is landed and closed).
5. **The mount is not resolved by id.** The mount is whatever element the caller injects; the
   module never calls `getElementById` (the shim's `getElementById` **auto-creates** on a miss —
   `src/shared/dom-shim.ts:126-129`, read — so a lookup-based probe would silently probe a **new,
   empty** element and report a false `'no-root'`). **That hazard is named here so no later pass
   "simplifies" the probe into a lookup.**

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[E]** engine-side · **[U]** real-DOM
`ui` leg (see the Layer declaration). Every row is a **contract row** for the TestWriter to turn
into a test; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **One engine-emitted root — fresh graph** | `new Runtime({ mount, envelope: demoEnvelope() })`; `bootstrap()`; `probeMountInvariant(mount)` | `ok === true`; `count === 1`; `roots.length === 1`; `violation === null`; `roots[0].nodeId` is a **non-empty** string; `roots[0].element` is a **direct child of the mount by reference** (present in `mount.children`) | `[T]`/`[H]` |
| **M-2** | **One engine-emitted root — after ONE re-derivation** | `loadEnvelope(demoEnvelope())` (cycle 2) | `ok === true`; `count === 1`; `violation === null` | `[T]`/`[H]` |
| **M-3** | **THE CROSS-ENVELOPE ROW (the unit's reason to exist)** | Two loads into **one** mount, in **one** sequence, with the **same** mount reference | `count === 1` **at every observation point** — before the first load, after the first, after the second, and after a third. **`count === 2` at any point is rule 3's HOST-fix branch** and the row is reported as such, never softened | `[T]`/`[H]` |
| **M-4** | **Identity — the root is the graph's current root node** | `probeMountInvariant(mount, { rootNodeId })` where `rootNodeId` is read from the graph (e.g. the in-tree node whose `propsId`/`cssId` matches the envelope's root) | `ok === true`; `roots[0].nodeId === rootNodeId`; `expectedRootNodeId === rootNodeId` | `[T]`/`[H]` |
| **M-5** | **Cardinality-only mode omits the identity field** | `probeMountInvariant(mount)` (no `expect`) | `ok === true`; `expectedRootNodeId` is **absent** (`Object.prototype.hasOwnProperty` is `false` — not `undefined`, not `null`); prohibition-3 row | `[T]` |
| **M-6** | **Mount identity does not change across re-derivations** | Capture `mount`; run N re-derivations; `probeMountInvariant(mount, { mount })` | Every call returns `mount` **by reference** equal to the captured mount; `violation` is never `'mount-reference-mismatch'` | `[T]`/`[H]` |
| **M-7** | **Foreign siblings are reported, never swept** | Append two caller-created elements to the mount **before** the probe (no `data-node-id`); probe | `ok === true`; `count === 1`; `foreignSiblings.length === 2`; both are the **same references**, in document order; the probe **removed nothing** (`mount.children.length` unchanged) | `[T]` |
| **M-8** | **A `null`/absent mount is a typed refusal, not a throw** | `probeMountInvariant(null)` / `undefined` / `''` / `42` | returns (does not throw); `ok === false`; `violation.code === 'mount-not-appendable'`; `count === 0`; `roots` empty; `mount` echoes the argument | `[T]` |
| **M-9** | **A malformed `expect` is a typed refusal, not a throw** | `probeMountInvariant(mount, 'nope')` / `42` / `[]` | returns; `ok === false`; `violation.code === 'expect-mismatch'` | `[T]` |
| **M-10** | **`assertMountInvariant` returns the probe's own result on success** | `assertMountInvariant(mount)` on M-1's state | returns an object **deep-equal** to the probe's result and **identity-equal** to the probe's single call result; throws nothing | `[T]`/`[H]` |
| **M-11** | **`teardown` leaves exactly one engine-emitted root** | `teardown()` on the landed graph | `count === 1` and the probe reports that root as the **graph root** (the root stays in-tree — `src/renderer/runtime.ts:783-786` skips the root; read) — **the mount's direct children are exactly one `data-node-id` element after teardown**, matching `tests/runtime-host.test.ts:150-161`'s `mount.innerHTML === ''` from the **serialization** side of the same fact | `[T]`/`[H]` |
| **M-12** | **`teardown` is idempotent across N cycles** | `teardown()` × 3 | `count === 1` after each; `ok === true` after each | `[T]`/`[H]` |
| **M-13** | **The `code.*` route enters the same invariant** | `codeLoad(envelope)` (`src/renderer/runtime.ts:980`, which calls `loadEnvelope` at `:994`); then `codeLoadBatch([…])` (`:1016` → `codeLoad` at `:1064`) | `count === 1` after each; the **first** `codeLoadBatch` is the row that exercises the multi-step staging path | `[T]`/`[H]` |
| **M-14** | **The placement-routed path obeys the same invariant** | `loadEnvelope(placementEnvelope(4))` — the path-enumeration `compilePath` case (`tests/runtime-host.test.ts:183-189`, read: `inTree === 7`) | `count === 1`; `ok === true`. **This is the row that distinguishes "one root" from "one element"** — a depth-4 tree emits many elements, and the probe counts only **direct mount children** | `[T]`/`[H]` |
| **M-15** | **`loadDoc` (the snapshot path) obeys the same invariant** | `loadDoc(doc)` where `doc` comes from `exportSerialized()` (`src/renderer/runtime.ts:516`) | `count === 1`; `ok === true` | `[T]`/`[H]` |
| **M-16** | **Round-trip identity: legacy → serialized → legacy** | `loadEnvelope(env)` → `exportLegacy()` (`:501`) → `loadEnvelope(exported)` → `exportSerialized()` → `loadDoc(…)` | `count === 1` at each step; **no cycle accumulates a second root** | `[T]`/`[H]` |

### 3.2 Documented fail-states (each is a typed violation, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **Two or more engine-emitted roots in one mount** — the defect class this unit exists for | Any re-derivation sequence whose mount holds ≥ 2 `data-node-id` direct children | `ok === false`; `violation.code === 'multiple-roots'`; `count === 2` (or N); `nodeIds` lists **every** child in document order; `assertMountInvariant` **throws** with the `multiple-roots` prefix. **RULE 3: this row is the HOST-FIX branch** — the finding lands in this spec's §3a (a host finding is **not** a `docs/defects.md` row: the `R13-HOST-FIX` precedent, `docs/decisions.md:39`, read) | `[T]`/`[H]` |
| **F-2** | **Zero engine-emitted roots** | A mount with no `data-node-id` direct children — e.g. a mount never bootstrapped, or an empty fresh mount before `bootstrap()` | `ok === false`; `violation.code === 'no-root'`; `count === 0`; `roots` empty. **Not** an exception, and **not** reported as `ok` | `[T]` |
| **F-3** | **Root identity mismatch** | Exactly one root whose `nodeId` ≠ `expect.rootNodeId` (e.g. a **stale** expectation captured before a reload whose envelope has a different root) | `ok === false`; `violation.code === 'root-identity-mismatch'`; `count === 1`; `expectedRootNodeId === expect.rootNodeId`; `nodeIds[0]` is the **observed** root | `[T]`/`[H]` |
| **F-4** | **Mount reference mismatch** | `probeMountInvariant(mountB, { mount: mountA })` where `mountA !== mountB` | `ok === false`; `violation.code === 'mount-reference-mismatch'`. **This is the row that makes "one stable mount" checkable** — it is a violation of the caller's own claim, not of the tree | `[T]` |
| **F-5** | **Malformed mount** | `null` / `undefined` / a string / a number / an array / an object with a non-array `children` | `ok === false`; `violation.code === 'mount-not-appendable'`; **no throw** | `[T]` |
| **F-6** | **Malformed `expect`** | A non-object, non-nullish `expect` | `ok === false`; `violation.code === 'expect-mismatch'`; **no throw** | `[T]` |
| **F-7** | **A child that exposes no readable attribute surface** | A direct child that is neither `getAttribute`-bearing nor serializable | **The probe must not throw**: the child is counted as **engine-emitted only if a non-empty `data-node-id` can be read**; otherwise it lands in `foreignSiblings`. **A row asserts the no-throw and the placement** | `[T]` |
| **F-8** | **A duplicated `data-node-id` among direct children** | Two children carrying the **same** `data-node-id` (the same engine node emitted twice) | `ok === false`; `violation.code === 'multiple-roots'`; `count === 2`; `nodeIds` contains the value **twice** (the probe reports duplicates, it does not dedupe — deduping would hide F-1) | `[T]` |
| **F-9** | **An empty-string `data-node-id`** | A child with `data-node-id=""` | Counted as **NOT engine-emitted** (empty ⇒ unreadable value), so a mount whose only child has `data-node-id=""` reports **`'no-root'`**, not `ok`. **Recorded because the engine emits a real nodeId in practice and a blank value must never satisfy the invariant** | `[T]` |
| **F-10** | **The probe is called with a second argument of `null`** | `probeMountInvariant(mount, null)` | Behaves exactly as the omitted-`expect` case (M-5): `ok === true` on M-1's state, `expectedRootNodeId` absent **and no `expect-mismatch`** | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `roots.length === count` **always**, and `nodeIds.length === count` **always** | The three fields cannot disagree; a row asserts it for M-1, M-8, F-1 and F-5 |
| **I-2** | `violation === null` **iff** `ok === true`; `violation !== null` **iff** `ok === false` | No "ok with a violation" state exists |
| **I-3** | The probe performs **zero** writes: `mount.children` is **reference-identical (element-by-element, in order)** before and after every call, and no child's attribute set changes | The read-only claim, made falsifiable |
| **I-4** | The probe holds **no state**: calling it twice with the same arguments returns deep-equal results, and the second call is unaffected by the first | Prohibition 4's row |
| **I-5** | `mount` echoes the **exact argument** by reference (never a copy) in every outcome, including the malformed-mount case | Lets a caller chain a mount-identity check |
| **I-6** | No outcome depends on the **order** in which the caller called anything else — the probe reads the tree as it finds it | Purity |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — this unit's rows are not present anywhere today, so unlike
`U-ENGINE-DRIFT` (whose red was the existing suite under a moved pin) this unit's red is **authored
first and RUN**. Proposed path: **`tests/mount-invariant-guard.test.ts`**. **The red run's
observed outcome is the unit's decisive fact and must be quoted verbatim:**

- If `count === 1` at every observation point of M-3 (and the identity rows hold): the red set's
  guard-dependent rows (`F-1`…`F-10`-by-assert) fail with *"module does not exist / is not a
  function"*, and the **host-fix branch is NOT taken**. The unit lands as **detection + pin only**.
- If `count === 2` at any observation point: **the red set's `M-3` row fails against the SHIM
  TREE**, and that failure **names a host defect** — a second engine-emitted root surviving a
  re-derivation into one mount. **That is rule 3's HOST-fix branch**, and the fix is in
  `src/renderer/runtime.ts` (the `tearDownGraph()`/diff-removal path, `:777-795` read), **not**
  in the probe. The finding is recorded in **§3a** of this spec — **never** in `docs/defects.md`
  (the `R13-HOST-FIX` precedent, `docs/decisions.md:39`, read).

**The red must be reported with the raw observed `count`, the raw `nodeIds`, and the mount's child
count — never as a summary.** A red run reported as *"the probe does not exist yet"* **without** the
`count` observation **has not settled rule 3** and may not be reported as this unit's red.

### 4.2 Red-set authoring order and the ⛔ shape

1. **Write all §3 rows first**, in this order: `I-1`..`I-6`, `M-1`..`M-16`, `F-1`..`F-10`.
2. **RUN them** on the untouched tree and **REPORT** the failing set verbatim (expected:
   `Cannot find module '../src/shared/mount-invariant-guard.js'` — or the equivalent — for every
   row, **plus** whatever `M-3`'s raw count turns out to be, measured **directly against the
   mount** so the count is obtainable **before** the module exists — this is the one row whose
   *observation* is written against the tree, not against the module; it is the reason the red can
   settle rule 3 at all).
3. **Only then** implement the least code that makes them green.
4. **Re-run** and record the green. **No test row may be edited to reach green**; a row that turns
   out to be wrong is corrected in **this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a shim change.** `src/shared/dom-shim.ts` stays at its landed state; an "add
  `querySelectorAll` so the probe can count" move is a **scope violation** (`H-r5`).
- **Not a licence to edit an existing test.** `tests/runtime-host.test.ts`'s per-teardown row
  (`:150-161`) is **read-only evidence** for M-11 and is **never edited**.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.3).
- **Not a measurement of the assembled app.** §Layer declaration, anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | The cycle-2 count is **2** | **STOP implementation of the probe-first sequence and take the HOST-fix branch** — fix `src/renderer/runtime.ts`, add the regression rows, and record the finding in §3a. **Do not ship the probe as if the invariant held.** |
| **S-2** | The adversarial pass finds **no reproduction** of a violation | **NO GUARD SHIPS** (rule 3's third clause). The unit lands as its red evidence + this spec's rows as contract rows; the DONE row must say *"the guard was not shipped because its falsification produced no reproduction"* in exactly those terms. |
| **S-3** | The red run cannot obtain a raw `count` | The red is **incomplete**; report that, and do not proceed to implementation. |
| **S-4** | The probe "needs" a new shim member, a global lookup, or a render call | **Scope violation** — re-read §2.4 and re-write the probe. |
| **S-5** | A row of §3 turns out to be unverifiable on `[T]`/`[H]` | The row moves to §7's honest statements as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 6 — the wave-B go-ahead is spent and authorises nothing here), (b) this spec to exist
(**done: this filing**), and (c) a **TestWriter to have RUN and REPORTED the red set**
(`AGENTS.md` item 9). Its row in `docs/next-steps.md` `## OPEN` (D1) is `BLOCKED` and stays
`BLOCKED` until (a) and (c) are both true.

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/mount-invariant-guard.ts` | **NEW** — the four exports of §2.1 | always |
| 2 | `tests/mount-invariant-guard.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `src/renderer/runtime.ts` | a **host fix** on the teardown/diff-removal path | **only** under rule 3's two-root branch (S-1), with a regression row |
| 4 | `docs/specs/mount-invariant-guard.md` | this spec — §3a/§3b findings as they land, §7 additions | always |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | the unit's own tracker rows (the supervisor's DONE row; a decision row **if** a host fix lands; **no** `defects.md` row — host finding) | the pass that produces them |

**Outside the scope, always:** `src/shared/dom-shim.ts` · `src/main/**` (incl.
`src/main/mcp-server.ts` and `src/main/security.ts`) · `src/renderer/renderer.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**` · the declined region-host surface
under any name.

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]/[H]** envelope/pure layer | the red (§4) **and** the green, run before and after. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | `tsc --noEmit`; the probe's types are part of the contract, and a malformed signature is a typecheck failure, not a runtime one |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read); a new `src/shared/` module that fails to bundle is a build failure even if the suite is green |

**That is the whole required set.** Row D1's leg cell says **node suite** alone; the trio's other two
legs (`typecheck`, `build`) are mandatory for any source change under `AGENTS.md` item 4 and are
therefore listed here **as obligations, not as new claims**. **No battery, no divergence leg** — the
unit asserts no MCP-surface behaviour and no real-DOM property.

**OPTIONAL `[U]` row (needs the `ui` leg — and names its precondition):** the real-DOM
cardinality row — *one mount, one real-DOM root element after a cycle-2 load*. **Preconditions, all
named and none assumed:** (a) the `ui` leg exists and is green on the same built tree,
(b) `npm run divergence` is green for that tree, and (c) — for any **attribute-presence**-shaped
variant of the row — the `H-r10` attribute-presence extractor, which is owed to
**`U-DIVERGENCE-EXT`**. **A cycle-2 cardinality row reads element COUNTS, not attribute presence, so
it does not depend on the extractor** — but it **does** depend on the leg. **If the row is not
taken, nothing in §3 is weakened: every §3 row is `[T]`/`[H]` and stands alone** (row D1's own
wording: *"a real-DOM identity row is OPTIONAL"* is not this unit's leg — this unit's D1 cell names
the node suite and the shim; the OPTIONAL `[U]` row is stated here because the layer must be named
before anyone claims it).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-MOUNTGUARD` · wave **D** · `DONE` or the honest non-DONE status.
2. **The rule-3 outcome, FIRST and explicitly**: *"cycle-2 count = N"* with the **raw observed
   value**, and then *"the HOST-fix branch / the detection-only branch"*. **A DONE row that does
   not state the cycle-2 count is a review finding** — it is the unit's whole point.
3. **The guard's disposition, explicitly**: shipped / **not shipped because the adversarial pass
   found no reproduction** (S-2), in those terms.
4. **The code/test delta**: files changed, named, with the host fix named if taken.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim, **including the raw count**.
6. **The three legs' results** (§5.2), each with its **layer label** (`[T]/[H]`), plus the explicit
   sentence that the node-suite green is envelope/pure-layer evidence and **not** assembled-app
   evidence.
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
| Are there rows here that a **property** would express better than a table? | **One candidate exists and is a genuine quantification:** *"for every re-derivation sequence of any length over the four paths, `count === 1` at every observation point."* §3's `M-2`/`M-3`/`M-12`/`M-13`/`M-16` sample that space **deterministically** (a fixed table of cycles). **The property is not thereby proven — a sampled table is not the property**, and this spec **says so** rather than implying coverage. |
| Could this unit execute that property **as a property**? | **No, and not for reasons of effort:** there is no PBT harness to run it in, and **adding one is a `devDependencies` change** — i.e. outside §5.1's diff scope and a new gate of its own. |
| Do the layers permit a property run here? | **No for the interesting half.** The real-DOM cardinality question is a `[U]`-layer question and the `[U]` row is **optional and precondition-gated** (§5.2); a property over an unmountable population is not executable at any layer. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their strategy by the unit's own ids (`M-3` = the cycle-2 drive; `I-3` = the write-freedom drive; `F-8` = the duplicate drive). **A strategy id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled** — the carried honesty
   anchor of `docs/specs/engine-drift.md` §5.5.
2. **The one quantified claim in this unit is recorded as `NOT EXECUTED — no PBT harness`**: the
   *"every re-derivation sequence"* property. **Its compensating rows are named**: `M-1`..`M-16`
   (the fixed table), `I-1`..`I-6` (the per-state invariants), and `F-1`..`F-10` (the fail-states).
3. **No `fast-check` and no generator is added by this unit** — adding one would be a
   `devDependencies` change outside the diff scope and would need its own gate.
4. **Register change summary: none** — this spec introduces no register row, so there is nothing to
   reconcile with `docs/specs/engine-pin.md` §5.5's register (counted there as 8 rows: 4 `P-IM` +
   3 `P-SM` + 2 `P-TP`, 7 executed deterministically, `P-TP-1` `NOT EXECUTED`).

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If no cycle-2 (or later-cycle) re-derivation
into one mount ever produces two engine-emitted roots, then the invariant this unit exists to guard
is not being violated in this tree, and rule 3 forbids shipping a guard for it.* **The unit does not
thereby fail** — it lands as detection + pin + recorded evidence — **but it must not manufacture a
guard to justify itself.** The three outcomes, exhaustively:

| Outcome | Condition | What lands |
| --- | --- | --- |
| **(a) Detection + pin only** | the red run yields `count === 1` and the adversarial pass reproduces **no** violation | the probe module + the §3 rows as contract rows; **no** guard claim, **no** host change. The DONE row says the probe *detects a class that is not currently occurring* |
| **(b) Host fix** | the red run yields `count === 2` | a fix in `src/renderer/runtime.ts` + its regression row + the §3a finding; the probe ships as the regression's instrument |
| **(c) The guard does not ship** | the red run yields `count === 2` but the adversarial pass cannot reproduce it, **or** the violation is not reproducible outside a single sequence | the probe is **withdrawn from the contract** and `§2.1`'s surface is marked **SUPERSEDED** with the reason; the recorded evidence stands |

**A fourth outcome is not admissible.** *"The probe was needed because the invariant says so"* is not
an outcome — it is a restatement of the claim under test.

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** This
   pass files the contract. **The unit is BLOCKED on the architect's go-ahead for wave D and on its
   red set** (§0 ruling 6, §4.5). The wave-B go-ahead authorises **nothing here**.
2. **The region host stays DECLINED and this file must not be read as adopting it.** `SCH-1`'s
   region half is refiled to the fork; its blockers are `(C)#1` and `(C)#6` (**not** prohibition 5),
   and it is redundant for the invariant. **A later pass that re-merges the two halves to satisfy
   one fork request is repeating a landed ruling.**
3. **The unit's shape is CONDITIONAL.** Rule 3 decides between detection-only, a host fix, and no
   guard at all — and **the third outcome is allowed**. Any document that presents the guard as a
   certainty of this unit is over-reading §0 ruling 3.
4. **The mount invariant's current behaviour is UNPROVEN, and this spec asserts no cardinality.**
   The per-teardown test at `tests/runtime-host.test.ts:150-161` (read) is a **per-teardown**
   statement; the validity pass's characterization of it as *"diff-based emptying exists and is
   tested"* is **not** a cross-envelope statement. **Rule 3's red run is what settles it.**
5. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence** — and for
   this unit it is also **never real-DOM-tree evidence** (the shim has no layout, no CSS, no query
   API). The `[U]` row is optional and precondition-gated (§5.2).
6. **The probe counts ENGINE-EMITTED elements, never DOM roots.** A cross-envelope count of DOM
   roots is explicitly on the "what every node-green must NOT be claimed as" list, and this unit's
   claim is **narrower**, not wider.
7. **`docs/decisions.md`'s line anchors are pre-amendment in several sources and were re-resolved
   here by reading the live file.** The file is **406 lines** today (read this pass) and its ledger
   is **not** one contiguous table — it carries the main ACTIVE table, then appended labelled blocks
   (the `U-ENGINE-PIN` sets, then `U-ENGINE-DRIFT`, then five `U-REALDOM-BOOT` blocks at
   `:139`/`:155`/`:172`/`:189`/`:209`), then `## HISTORICAL` (`:230`), `## SPECULATIVE / IN GATE`
   (`:288`) and `## AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` (`:294`). **The six rows this spec cites
   were read directly and resolve as claimed**: `R13-HOST-FIX` at `:39`, `HOST-OP-REJECT` at `:42`,
   `MULTI-GRAPH-ISOLATION` at `:51`, `UI-RENDERED-WITH-PROVIDENT` at `:53`,
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` at `:54`, `SHELL-CHROME-HANDOFF-DISPOSITION` at `:58`. **Every
   one is cited here by ID as well as by line**, per the gate record's own "cite this record by ID,
   not by line" rule (`§7` item 7).
8. **Stale citations this pass found and did NOT fix (they are not this unit's files to edit — the
   rule is report, do not silently reconcile):** see §8's closing block. **Every anchor this spec
   cites by line was read by this pass**; every anchor this spec could **not** verify is either
   named as unverified or replaced by the line that was read.
9. **No page-design layer exists to update.** `docs/skills/designing-pages.md` **does not exist**
   (globbed; the directory holds `process-guardrails.md` alone), so there is **no test-use-case
   coverage matrix and no demo-page index**, and this unit makes no page-design change.
10. **This unit is not a `docs/defects.md` row**, and a host finding it produces is not one either:
    the amendment's adjudicated residual disagreement #1 (read) is explicit that the mount
    invariant is a **target hardening unit**, and the `R13-HOST-FIX` precedent
    (`docs/decisions.md:39`, read) **refuses** a `defects.md`/`HANDOFF.md` row for a host finding.
11. **The probe's contract is deliberately a RESULT OBJECT plus a thin ASSERT.** An implementation
    that only throws cannot produce the evidence rule 3 requires; an implementation that only
    returns cannot be used as a regression assertion. **Both are required, and the split is a
    contract decision recorded here** (the sources name the probe only by its purpose).

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = the row's obligation is this unit's charter. **DECLINED** = a
part-half that stays with the fork. **OWED** = an obligation this unit has not yet discharged.
**NOT THIS UNIT** = the row is closed elsewhere or belongs to another unit — listed so no later pass
routes it here.

| Source row | Section | Status for `U-MOUNTGUARD` | Where |
| --- | --- | --- | --- |
| `SCH-1`'s **invariant half** (`S-d2`; §2.2's `SCH-1` row) | amendment §1 preamble, §2.2 | **ADOPTED — this unit** | §1, §2 |
| `SCH-1`'s **region host** (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions`) | amendment §0, §2.2, `S-d11`, `H-r17` | **DECLINED + REFILED to the fork** — **must not be re-merged** | §3, §7 item 2 |
| Row **D1** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: the row's spec cell reads *"`docs/specs/mount-invariant-guard.md` (**OWED — not filed**)"* — **this filing discharges that cell** (the row itself stays `BLOCKED`) | this file |
| The eight-unit plan's **`U2`** row | amendment §"The amended unit plan" | **INHERITED-ONLY provenance** (superseded by the 20-unit plan, `H-r20`); its owner-artifact + red-set cells are re-anchored in §5.1/§4 | §5.1, §4 |
| `H-r4` (the spec's required shape) | `H-r4` as amended by `H-r20` | **DISCHARGED by this filing**: status/source block, `§0` prohibitions, exact surface, every state/fail-state, red-set plan, trio plan, explicit falsification/stop condition, explicit zero-row PBT decision | §0–§7 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3`, `H-r7` | **INHERITED-ONLY** — the shim is untouched; the sole carve-out is landed and closed | §1, §5.1, §5.5 `A-15` |
| The amendment's "no new MCP surface" obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-14` |
| "What every node-green must NOT be claimed as" | same section | **CARRIED** as the layer declaration's anchors + §7 item 5–6 | Layer declaration, §7 |
| `RK-19` (geometry criteria unprovable here) | amendment §6 | **NOT THIS UNIT** — no geometry row exists here | — |
| `RK-6` (the real-DOM `hidden` substring false red) | amendment §6, `H-r10` | **NOT THIS UNIT**, but **binding if the OPTIONAL `[U]` row is taken** as an attribute-presence row: it needs `U-DIVERGENCE-EXT`'s extractor | §5.2 |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `LIVE-OP-REJECT` | `docs/defects.md` `## FIXED (in this repo)`; `docs/decisions.md` | **NOT THIS UNIT** — but its **layer lesson binds**: an envelope green must never be converted into an IPC claim | Layer declaration anchor 1 |
| `U-ENGINE-PIN`'s landed state (pin at `package.json:24` = `^0.5.1`; the shim's `removeAttribute`) | amendment §4.1, `docs/specs/engine-pin.md` | **INHERITED as landed state** — this unit does not re-open or re-measure it | §0 ruling 4, §2.4 |
| `docs/specs/mount-invariant-guard.md`'s row in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** (the file exists) | this file |

**Cross-file citation findings this pass found and did NOT fix (not this unit's files; report, do
not silently reconcile).** Each was read in this pass:

| Claim as written | Verified state (read 2026-09-27) |
| --- | --- |
| `src/renderer/runtime.ts:735-753` declares `tearDownGraph` (amendment §Layer declaration item 2, the pre-amendment `SCH-1` row, `H-r2`) | **STALE.** `:735-741` is `shapeSig()`; `tearDownGraph()` is declared at **`:777`** and its body ends at **`:795`**. The **citation's substance holds** — the method exists, is called by every re-derive path, and does the diff-based emptying the row describes |
| `src/renderer/runtime.ts:1074-1075` backs the invariant by reading `mount.innerHTML` | **STALE.** `renderedHtml()` reads `this.mount.innerHTML` at **`:1116-1118`** |
| Re-derive call sites `:304`, `:331`, `:519` | **`:304` and `:331` VERIFIED** (`loadEnvelope`/`loadDoc` each call `tearDownGraph()`); **`:519` is STALE** — `teardown()` is declared at **`:560`** and calls it at **`:561`** |
| `codeLoad` at `:938` → `:304`; `codeLoadBatch` at `:974` | **BOTH STALE.** `codeLoad` is declared at **`:980`** and calls `loadEnvelope` at **`:994`**; `codeLoadBatch` is declared at **`:1016`** and reaches `codeLoad` at **`:1064`**. **The dependency claim holds** — both routes do enter `loadEnvelope`, hence `tearDownGraph` |
| `tests/runtime-host.test.ts:150-160` / `:150-161` (the per-teardown row) | **VERIFIED in substance.** The row is at `:150-161`: `teardown → inTree === 1, mount empty, and is idempotent`; `mount.innerHTML === ''` asserted at `:157` and `:160` |
| `src/shared/dom-shim.ts:77-88` (the `outerHTML` serialization gap) | **STALE as an anchor, and the substance is spent**: the file was amended by the landed `U-ENGINE-PIN` unit and is **143 lines** today; `outerHTML` is the getter at **`:108-119`** |
| `src/shared/dom-shim.ts:50-56` (listener removal by reference) | **STALE.** `removeEventListener` is at **`:81-87`** today |
| `src/main/mcp-server.ts:281-303` (21 `ALL_TOOLS`) | **VERIFIED.** `ALL_TOOLS` is declared at `:281`, the 21 names run `:282-302`, the array closes at `:303` |
| `src/main/security.ts:134` (`VALID_GROUPS`) | **VERIFIED** — five members |
| `src/shared/types.ts:259-280` (`RpcMethod`, **21** members) | **VERIFIED in substance.** The union is `:259-281`; **21** members; `RpcRequest` begins at `:282` |
| `package.json:23` = the pin, and `package.json:18` = the `divergence` script | **`:23` is STALE** for the pin (`:23` is `@modelcontextprotocol/sdk`; **`provident-ssr: "^0.5.1"` is at `:24`**); the `divergence` script **is at `:18`**, and the **`ui` script is at `:19`** |
| `MUTATING_METHODS` cited at `src/main/mcp-server.ts` (amendments §"no new MCP surface" family) | **STALE.** The set is at **`src/renderer/renderer.ts:12`** — seven members: `dispatch`, `load`, `op`, `teardown`, `code.load`, `code.loadBatch`, `journal` |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **The `## OPEN` row `D1`'s spec cell
therefore still reads `OWED — not filed` until the supervisor's reconciliation pass flips it** —
recorded here so the staleness is attributable rather than silent.

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-MOUNTGUARD`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so **there is no green for an
adversarial pass to review** — RCA-3 runs *after* a unit's green). **The table below is the SEED SET
for the pass that will run**, not a findings table. **No row below is a finding, and none may be
cited as one.**

**THE SEED SET — every row is an edge case / malformed input / unauthorized-access probe that the
later pass MUST resolve:**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | Two loads into **one** mount with the **same** envelope, then a third — does any intermediate observation point show `count === 2`? (This is `M-3` re-run adversarially, with the mount inspected **between** every call, not only after.) | `[T]`/`[H]` |
| **A-2** | A foreign sibling appended **between** two re-derivations: does the probe still find exactly one engine-emitted root, and does the diff-removal leave the foreign sibling's **reference** intact? | `[T]` |
| **A-3** | A mount reference mismatch (`probeMountInvariant(mountB, { mount: mountA })`) — is it reported rather than silently accepted? | `[T]` |
| **A-4** | `loadDoc` after `loadEnvelope`, then `loadEnvelope` again — does the **serialized** path leak a second root? | `[T]`/`[H]` |
| **A-5** | `codeLoadBatch` with several staged `code.*` ops (one re-derive) — does the batch path leave exactly one root? | `[T]`/`[H]` |
| **A-6** | `teardown()` × 3, then a load — does the count return to 1? | `[T]`/`[H]` |
| **A-7** | A placement-routed envelope at depth 4 (the `compilePath` path) — is `count` still **1**, or does the path enumeration emit a second **direct** child? | `[T]`/`[H]` |
| **A-8** | An envelope whose graph is **root-only** (`inTree === 1`) — one root, or zero? | `[T]`/`[H]` |
| **A-9** | Malformed mounts: `null`, `undefined`, `''`, `0`, `{children: 'x'}`, a `ShimElement` with a **removed** child still referenced | `[T]` |
| **A-10** | `expect.rootNodeId` set to a **stale** id, a **foreign** id, `''`, `null`, and a number | `[T]` |
| **A-11** | Duplicate `data-node-id` values among direct children — reported **twice**, or deduped (a dedupe is a FINDING: it hides F-1)? | `[T]` |
| **A-12** | A child with `data-node-id=""` — does a blank value satisfy the invariant? (It must not — F-9.) | `[T]` |
| **A-13** | Static/unauthorized-access sweep: does the module contain `querySelector`/`querySelectorAll`/`getElementById`/`closest`, `document`, `window`, `matchMedia`, `getComputedStyle`, `activeElement`, any `src/renderer/**` import, any `electron`/`node:fs` import, any registry/store, any module-level mutable state? | static |
| **A-14** | The five-seam sweep: does the unit add a tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s **21**-member census still pass **unchanged**? | `[H]` + static |
| **A-15** | **Shim-scope probe:** does anything in the change set touch `src/shared/dom-shim.ts`, or require a member the shim lacks (`querySelectorAll`, `setProperty`, `getComputedStyle`)? | static |
| **A-16** | **The region re-entry probe:** does any file of this unit reintroduce a region/`ShellRegion*` concept, or import a name from the declined half? | static |

## 3b. The adversarial pass's disposition table — **the shape this contract will be reconciled to**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** (a new §3 row) |
| **CONFIRMED-RULED** | a behaviour reviewed and ruled correct; the ruling is recorded with its reason |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md` (symptom · repro · root cause · proposed fix shape); **the package is never patched** |
| **NOT-A-FINDING** | raised, examined, and recorded with the reason it is not a finding |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **No row may be moved out of
§3a's seed set into this table without a named disposition and, for a host finding, a landed fix +
its regression row.** **A DONE row that cites no adversarial pass (or whose findings are
unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

