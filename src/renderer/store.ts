/**
 * ============================================================================
 * `src/renderer/store.ts` — the successor store module of `U-STORE-REDERIVE`.
 *
 * SPEC (the only authority): the contract DIRECTORY `docs/specs/store-rederive/`
 * — `store-model.md` (§2.1 the declared surface and every record shape · §2.2 the
 * four tiers, the persistence order and the monotonic invariant · §2.3 the
 * address space, the walk and the `M-PROP` resolution · §2.4 the mint and the
 * admission set · §2.14 the closed fail-state union) · `write-and-read.md`
 * (§2.5 the write with the complete `A1`–`A10` arm table · §2.6 the tombstone ·
 * §2.7 the `file` tier's commit duty and the save's condensation · §2.8 the read
 * with its `R1`–`R4` arms) · `seams-and-lifecycle.md` (§2.9 the `secure` gate ·
 * §2.10 the constraint seam, the pass-sequence, the message list and the
 * loop-breaker · §2.11 the event surface · §2.12 the boot/load · §2.13 the
 * lifetimes) · `parameter-semantics.md` §6 (the `16` `PAR-` rows) · `contract.md`
 * §0A (the declared working defaults `DD-1`…`DD-24`) — and the FROZEN SURFACE
 * ARTIFACT `docs/specs/store-rederive-module-store-surface.md`.
 *
 * WHAT THIS MODULE IS: the whole declared surface (§2.1's TEN functions — five
 * generic + five secure) over a closure-private node/anchor/link tree.  Every
 * function is TOTAL: it answers one of its declared records and NEVER throws for
 * a data condition (§2.1 item 4 · `R8`/`C7`).
 *
 * LAYER (`RCA-12`): this module is pure/envelope — `[T]` contract-text evidence.
 * NO `[H]` CLAIM AND NO APP CLAIM IS MADE ANYWHERE IN THIS FILE.
 *
 * THE CARRIED DEFECTS ARE NOT RECONCILED HERE: `SD-SPLIT-2` (§2.14's declared
 * `22` tokens against its enumerated `21`, token 21 counted twice) and
 * `SD-SPLIT-3` (§5.5.1's heading `276` against its terms' `288`) are the spec
 * writer's to re-grain; this module implements the contract's OPERATIVE
 * behaviour and encodes no census figure of its own as a rule.
 * ============================================================================
 */

/* ─────────────────────────── §2.1 — THE DECLARED TYPES ─────────────────────────── */

/** §2.3 item 1 · `DD-10` — `Address = ReadonlyArray<string>`; non-empty, every segment non-empty. */
export type Address = ReadonlyArray<string>

/** §2.2 item 1 — the generic surface's WHOLE tier domain (`R6`, `C5`, `C15`). */
export type Tier = 'file' | 'mem' | 'temp'

/** §2.4 item 2 — the transcription's shape (`C21`). */
export interface StoreObject {
  [member: string]: StoreValue
}

/** §2.4 item 2 — the `6` admitted classes; ONE set for every tier (`DD-5`). */
export type StoreValue = string | number | boolean | null | StoreObject | StoreValue[]

/** §2.1 — `WritePayload` (`C18`/`C19` · `R10`'s marker) plus `PAR-14`'s `transparent`. */
export type WritePayload =
  | { readonly value: StoreValue; readonly transparent?: boolean }
  | { readonly tombstone: true }

/** §2.11 item 2 · `DD-17` — the body takes NO arguments and its return is ignored. */
export type ListenerBody = () => void

/** §2.10 item 10 — the module's own draft note, appended to ITS OWN evaluation record. */
export interface ConstraintNote {
  readonly source: 'constraint' | 'repair'
  readonly text: string
}

/** §2.1 (R15) — the `DD-1` record, re-grained with the `notes` draft list. */
export interface ConstraintEvaluation {
  readonly address: Address
  readonly current: StoreObject
  readonly future: StoreObject
  readonly changed: {
    readonly address: Address
    readonly tier: Tier
    readonly literals: { [member: string]: StoreValue }
  }
  readonly notes: ConstraintNote[]
}

/** §2.10 item 5 — `C13`'s three arms. */
export type ConstraintAnswer =
  | { readonly ok: true }
  | { readonly ok: false; readonly message: string }
  | { readonly repair: true }

/** §2.10 item 5 — `C13`'s module-supplied check. */
export type ConstraintFn = (evaluation: ConstraintEvaluation) => ConstraintAnswer

/** §2.10 item 5 — `R4`'s module-supplied repair. */
export type RepairFn = (evaluation: ConstraintEvaluation) => StoreValue

/** §2.10 item 2 — the registration seam's record (`C13` · `R4`). */
export interface ConstraintRegistration {
  readonly constraint: ConstraintFn
  readonly repair?: RepairFn
}

/** §2.1 — the `13` step ids, terms `13 = 12 + 1` (the appended `M-PROP`). */
export type ResolveStep =
  | 'A-ADDRESS'
  | 'B-ROOT'
  | 'C-ANCHOR'
  | 'D-LINK'
  | 'E-CHILD'
  | 'F-TIER'
  | 'G-VALUE'
  | 'H-CONSTRAINT'
  | 'I-SAVE'
  | 'J-LOAD'
  | 'K-GATE'
  | 'L-REGISTRATION'
  | 'M-PROP'

/** §2.14 — the closed union, by its ENUMERATED ordinals `1–21` (the carried `SD-SPLIT-2`). */
export type Reason =
  | 'malformed-address'
  | 'unknown-root'
  | 'unreachable'
  | 'absent-address'
  | 'tier-not-held'
  | 'tombstoned'
  | 'malformed-tier'
  | 'secure-refused'
  | 'value-not-admitted'
  | 'malformed-tombstone'
  | 'persistence-inversion'
  | 'constraint-refused'
  | 'constraint-failed'
  | 'save-failed'
  | 'not-loaded'
  | 'secure-gated'
  | 'malformed-listener'
  | 'malformed-constraint'
  | 'load-failed'
  | 'repair-broke-constraint'
  | 'node-location-container'

/** §2.10 item 10 · `DD-21` — the message list's entry, `6 = 2 + 4`. */
export interface StoreMessage {
  readonly source: 'constraint' | 'repair' | 'store'
  readonly pass: number
  readonly position: number | null
  readonly step: ResolveStep
  readonly address: Address
  readonly text: string
}

/** §2.1 (R15) · `PAR-13` — the CLOSED five-member refusal. */
export interface Refusal {
  readonly status: 'refused'
  readonly reason: Reason
  readonly step: ResolveStep
  readonly segment: string | null
  readonly messages: StoreMessage[]
}

/** §2.8 item 7 — the read's answer (`C2`'s deep copy · `C21`'s object). */
export type ReadAnswer =
  | { readonly status: 'read'; readonly value: StoreValue; readonly tier: Tier | null }
  | Refusal

/** §2.11 item 7(b) · `DD-18` — one entry per throwing body. */
export interface ListenerError {
  readonly listener: number
  readonly error: unknown
}

/** §2.1 (R15) — the write's record: `status` + the SEVEN payload members. */
export type WriteRecord =
  | {
      readonly status: 'committed'
      readonly address: Address
      readonly tier: Tier
      readonly tombstoned: boolean
      readonly repaired: boolean
      readonly purged: Tier[]
      readonly listenerErrors: ListenerError[]
      readonly messages: StoreMessage[]
    }
  | Refusal

/** §2.11 item 2 — the listener's own answer, or a refusal. */
export type ListenerRecord = { readonly address: Address; readonly attached: boolean } | Refusal

/** §2.10 item 2 — the REGISTRATION's own answer (`position` indexes the addressed list). */
export type ConstraintRecord = { readonly address: Address; readonly position: number } | Refusal

/** §2.12 — `C24`'s load record. */
export type LoadRecord =
  | { readonly status: 'loaded'; readonly present: boolean; readonly roots: number }
  | Refusal

/** §6 `PAR-11` — the COMPLETE `9`-member fs surface. */
export interface FsSurface {
  readFileSync(path: string, encoding: 'utf8'): string
  existsSync(path: string): boolean
  mkdirSync(path: string, options: { recursive: true }): void
  writeFileSync(path: string, data: string): void
  openSync(path: string, flags: string): number
  closeSync(fd: number): void
  fsyncSync(fd: number): void
  renameSync(from: string, to: string): void
  rmSync(path: string, options?: { force?: boolean }): void
}

/** §2.1 — the construction input record (`C7` · `C6` · `PAR-11` · `PAR-10`). */
export interface StoreOptions {
  readonly file: { readonly path: string }
  readonly secure: { readonly path: string }
  readonly fs?: FsSurface
  readonly secureAccess?: () => boolean
}

/** §2.1 — THE DECLARED SURFACE, exactly as the frozen artifact's field 2 prints it. */
export interface Store {
  read(address: Address, tier?: Tier): ReadAnswer
  write(address: Address, tier: Tier, payload: WritePayload): WriteRecord
  listen(address: Address, body: ListenerBody): ListenerRecord
  constrain(address: Address, registration: ConstraintRegistration): ConstraintRecord
  load(): LoadRecord
  secureLoad(): LoadRecord
  secureRead(address: Address): ReadAnswer
  secureWrite(address: Address, payload: WritePayload): WriteRecord
  secureListen(address: Address, body: ListenerBody): ListenerRecord
  secureConstrain(address: Address, registration: ConstraintRegistration): ConstraintRecord
}

/* ─────── THE INTERNAL RECORDS — NEVER RETURNED (`C1`/`C2`; each member cites its `Cn`) ─────── */

interface InternalNode {
  /** `C11` — the tier of the store it is in.  A SECURE graph's node carries no tier parameter. */
  tier: Tier
  /** `C11` — the literals it was written with; may carry the reserved `_value` (§2.3 item 5). */
  literals: Record<string, StoreValue>
  /** `C11`/`C12` — one `parent`-type anchor per container-valued member. */
  anchors: InternalAnchor[]
  /** `R10` — the deletion marker (§2.6 item 1: NO literals and NO anchors). */
  tombstone: boolean
  /** `C13` — the ordered registration list the seam attaches at this address. */
  constraints: ConstraintRegistration[]
}

interface InternalAnchor {
  /** `C12` — the link's parent-side node. */
  parent: InternalNode
  /** `C12` — the interface between the node and its links (`D-LINK`). */
  links: InternalNode[]
  /** `C12` — "their type (parent/child)"; STORED (`DD-4`).  The walk filters on `'parent'`. */
  type: 'parent'
  /** `C12` — "child order/key" (1): the SEGMENT (the dict key). */
  key: string
  /** `C12` — "child order/key" (2): the dense ORDINAL (the array index). */
  order: number
}

interface RegisterEntry {
  /** `C14` — the root name as the entry's child order/key. */
  name: string
  /** `C14` — the root node as its child (the address's most-persistent instance). */
  node: InternalNode
  /** `C14` — the link-functionality's ordered constraint list. */
  constraints: ConstraintRegistration[]
  /**
   * `C14` — *"the functionality of a link, without having a distinct parent"*: the entry's OWN
   * link list, over which the address's other tier instances stand (`C20`'s coexistence and `R7`'s
   * retained copy).  It is NOT the node's `anchors` — those are the root's CHILD members.
   */
  peers: InternalAnchor[]
}

interface InternalListener {
  readonly address: readonly string[]
  readonly body: ListenerBody
  attached: boolean
}

/** §2.3 item 2 — the `M-PROP` answers (`4 = 1 + 1 + 1 + 1`); never returned to a caller. */
type PropertyKind = 'node-location' | 'literal-property' | 'absent-property'

/** The prospective payload a write's plan carries (`§2.5` item 7's arm table). */
type PlannedPayload =
  | { readonly plan: 'tombstone' }
  | { readonly plan: 'value'; readonly value: StoreValue; readonly transparent: boolean }

/* ─────────────────────────── THE DECLARED HELPERS ─────────────────────────── */

/** `R16`(e) · `R17`(c) · §2.3 item 5 · `DD-23` — the reserved member key. */
const RESERVED_VALUE_MEMBER = '_value'

/** §2.4 item 2 (`DD-5`) — the `6` admitted classes. */
const ADMITTED_CLASSES: readonly string[] = [
  'a string',
  'a finite number other than -0',
  'a boolean',
  'null',
  'a plain object with dense admitted members',
  'an array with dense admitted elements',
]

/** §2.4 item 2 (`DD-5`) — the `16` refused classes. */
const REFUSED_CLASSES: readonly string[] = [
  'undefined',
  'a function',
  'a symbol',
  'a bigint',
  'NaN',
  'Infinity / -Infinity',
  '-0',
  'a cyclic object or array',
  'a Map / Set / WeakMap / WeakSet',
  'a Date',
  'a non-plain prototype (class instances included)',
  "an array's own hole",
  "an array's own member beyond its dense indices",
  'an own accessor property',
  'an own symbol-keyed member',
  'an own member key that is the empty string',
]

/** §2.2 item 2 — the ranked tiers, in persistence order (`file > mem > temp`). */
const RANKED_TIERS: readonly Tier[] = ['file', 'mem', 'temp']

const TIER_RANK: Readonly<Record<Tier, number>> = { file: 3, mem: 2, temp: 1 }

/** §2.13 item 4 (ii) — the two arms that drop a `temp` instance. */
const TEMP_DROP_ARMS: readonly string[] = ['a superseding write at the address', "the session's end"]

/** §2.5 item 7 — the write-arm table's `10` ids, terms `10 = 3 + 2 + 2 + 3`. */
const WRITE_ARM_IDS: readonly string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']

/** §2.8 item 7 — the read-arm table's `4` ids, terms `4 = 1 + 1 + 1 + 1`. */
const READ_ARM_IDS: readonly string[] = ['R1', 'R2', 'R3', 'R4']

const isPlainObject = (value: unknown): value is Record<string, StoreValue> => {
  if (typeof value !== 'object' || value === null) return false
  const proto: unknown = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/** `§2.4` item 3 — the `4` literal classes: string · finite number ≠ `-0` · boolean · `null`. */
const isLiteralValue = (value: unknown): boolean =>
  value === null ||
  typeof value === 'string' ||
  typeof value === 'boolean' ||
  (typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0))

const emptyNode = (tier: Tier): InternalNode => ({
  tier,
  literals: {},
  anchors: [],
  tombstone: false,
  constraints: [],
})

const cloneNode = (node: InternalNode): InternalNode => {
  const copy = emptyNode(node.tier)
  copy.tombstone = node.tombstone
  copy.constraints = node.constraints
  for (const key of Object.keys(node.literals)) {
    const value = node.literals[key]
    if (value !== undefined) copy.literals[key] = value
  }
  for (const anchor of node.anchors) {
    copy.anchors.push({
      parent: copy,
      links: anchor.links.map((child) => cloneNode(child)),
      type: 'parent',
      key: anchor.key,
      order: anchor.order,
    })
  }
  return copy
}

/** §2.4 item 3 / §2.8 item 4 — a deep copy at every depth (`DD-6`), prototype-safe (§2.8 item 5). */
function deepCopy(value: StoreValue): StoreValue {
  if (Array.isArray(value)) return value.map((element) => deepCopy(element))
  if (typeof value === 'object' && value !== null) {
    const out: Record<string, StoreValue> = {}
    for (const key of Object.keys(value)) {
      const member = (value as Record<string, StoreValue>)[key]
      if (member === undefined) continue
      Object.defineProperty(out, key, { value: deepCopy(member), enumerable: true, writable: true, configurable: true })
    }
    return out
  }
  return value
}

const copyLiterals = (literals: Record<string, StoreValue>): Record<string, StoreValue> => {
  const out: Record<string, StoreValue> = {}
  for (const key of Object.keys(literals)) {
    const value = literals[key]
    if (value !== undefined) out[key] = value as StoreValue
  }
  return out
}

/**
 * `R16`(e) · `R17`(c) — the RESERVATION bites at the payload's `value` member: a caller's ordinary
 * property keyed `_value` is not available (the `transparent` payload member is the only spelling
 * that reaches the store's own reserved member), at the top level and at every depth.
 */
function containsReservedMember(value: StoreValue): boolean {
  if (value === null || typeof value !== 'object') return false
  if (Array.isArray(value)) return value.some((element) => containsReservedMember(element as StoreValue))
  const members = value as Record<string, StoreValue>
  if (Object.prototype.hasOwnProperty.call(members, RESERVED_VALUE_MEMBER)) return true
  for (const key of Object.keys(members)) {
    const member = members[key]
    if (member === undefined) continue
    if (containsReservedMember(member)) return true
  }
  return false
}

/* ─────────────────────────── THE ADMISSION SET (§2.4 item 2) ─────────────────────────── */

/** §2.4 item 2 (`DD-5`) — ADMITTED iff one of the `6` classes; otherwise `'value-not-admitted'`. */
function admitsValue(value: unknown, seen: Set<unknown> = new Set<unknown>()): boolean {
  if (value === null) return true
  switch (typeof value) {
    case 'string':
    case 'boolean':
      return true
    case 'number':
      return Number.isFinite(value) && !Object.is(value, -0)
    case 'undefined':
    case 'function':
    case 'symbol':
    case 'bigint':
      return false
    default:
      break
  }
  if (seen.has(value)) return false
  if (Array.isArray(value)) {
    seen.add(value)
    if (Object.getOwnPropertySymbols(value).length > 0) return false
    for (const key of Object.keys(value)) {
      const index = Number(key)
      if (!Number.isInteger(index) || index < 0 || index >= value.length) return false
    }
    for (let index = 0; index < value.length; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(value, index)
      if (descriptor === undefined || descriptor.get !== undefined || descriptor.set !== undefined) return false
      if (!admitsValue(value[index], seen)) return false
    }
    seen.delete(value)
    return true
  }
  if (!isPlainObject(value)) return false
  seen.add(value)
  if (Object.getOwnPropertySymbols(value).length > 0) return false
  for (const key of Object.keys(value) as string[]) {
    if (key === '') return false
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || descriptor.get !== undefined || descriptor.set !== undefined) return false
    if (!admitsValue((value as Record<string, unknown>)[key], seen)) return false
  }
  seen.delete(value)
  return true
}

/* ─────────────────────────── THE MINT (§2.4 item 3 · `C3`/`C11`) ─────────────────────────── */

/**
 * **THE FILE'S OWN DECODER — the save's three condensation arms read back in** (`§2.7` item 3 ·
 * `§0A` `DD-13`, *"the file holds the STATE and the LOAD re-mints the transparency from the reserved
 * key"*). **The file's bytes are NOT the caller's payload**: the save's `DD-13` writes a TRANSPARENT
 * node as the explicit object `{"_value": <the literal>}` at a node position (*"where the transparent
 * node stands AT A NODE POSITION (a member's child, or the ROOT of a saved tree) the bytes carry
 * `{"_value": <the literal>}` EXPLICITLY"*), and an array element as a list-shaped parent's child
 * whose condensed form is that same object. So the load mints from the condensation and NOT through
 * the caller-facing payload path — where `mintMember`'s reservation (`R16`(e)) DROPS a `_value` key,
 * which is exactly what a caller's payload must not be able to spell.
 *
 * **The three arms are `DD-13`'s own:**
 * - **VALUE** — an object whose OWN members are `{_value: <admitted literal>}` alone re-mints the
 *   TRANSPARENT node of `A10`: the reserved literal and no anchors. **A `_value` object whose value is
 *   NOT a literal is not a node this contract can mint** (the reservation is a literal's), so it is
 *   refused as a file that does not carry a condensation.
 * - **ARRAY** — every element is itself a condensation, so `[{"_value": true}, …]` re-mints the
 *   transparent child nodes `R16`(e)'s round trip names, and the read condenses them LIST-WISE.
 * - **OBJECT** — the ordinary recursion (`C3`), a literal member as a `literals` entry and a container
 *   member as a `parent` anchor + child node, keyed by the member's name.
 *
 * WHAT THE EARLIER FORM DID: `runLoad` minted the parsed file through `mintInto`, the CALLER-facing
 * mint, so every `_value` member was silently dropped by the reservation and every transparent node
 * came back EMPTY — the register's `P-SD-TP-5` round trip lost its state and its bytes at the first
 * save → load (`{"tabs":{"_value":"Foo"}}` loaded as `{}`, and an array of transparent children
 * loaded as an object of empty objects).
 */
function mintsFileState(node: InternalNode, state: StoreValue, tier: Tier): boolean {
  node.literals = {}
  node.anchors = []
  node.tombstone = false
  if (isLiteralValue(state)) {
    node.literals[RESERVED_VALUE_MEMBER] = state
    return true
  }
  if (state === null || typeof state !== 'object') return false
  if (Array.isArray(state)) {
    for (let index = 0; index < state.length; index += 1) {
      const element = emptyNode(tier)
      if (!mintsFileState(element, state[index] as StoreValue, tier)) return false
      node.anchors.push({ parent: node, links: [element], type: 'parent', key: String(index), order: node.anchors.length })
    }
    return true
  }
  const members = state as Record<string, StoreValue>
  const keys = Object.keys(members)
  if (keys.length === 1 && keys[0] === RESERVED_VALUE_MEMBER) {
    const reserved = members[RESERVED_VALUE_MEMBER] as StoreValue
    if (!isLiteralValue(reserved)) return false
    node.literals[RESERVED_VALUE_MEMBER] = reserved
    return true
  }
  for (const key of keys) {
    if (key === '') return false
    const member = members[key] as StoreValue
    if (member === undefined) return false
    /**
     * **`(D2)`/`(D3)` — THE SAVE'S BYTES DECODE INTO THE SAME LINKED ANCHOR SET THE MINT PRODUCES,
     * SO THE ROUND TRIP IS EXACT.** A literal member is read back as the TRANSPARENT CHILD NODE its
     * member anchor carries (`R16`(e) · this file's `mintsFileState` twin arm above), NOT as an
     * entry of the node's own `literals` table: the earlier form wrote a literal straight into
     * `node.literals`, which is the superseded `DD-13` *"a DICT member is a LITERAL ON THE NODE
     * ITSELF"* reading, and under it a saved-then-loaded tree carried NO node at that member's own
     * address — so a qualified read of it could not answer the node.
     */
    if (isLiteralValue(member)) {
      const transparent = emptyNode(tier)
      transparent.literals[RESERVED_VALUE_MEMBER] = member
      node.anchors.push({ parent: node, links: [transparent], type: 'parent', key, order: node.anchors.length })
      continue
    }
    if (member === null || typeof member !== 'object') return false
    const child = emptyNode(tier)
    if (!mintsFileState(child, member, tier)) return false
    node.anchors.push({ parent: node, links: [child], type: 'parent', key, order: node.anchors.length })
  }
  return true
}

/**
 * **THE MINT'S OWN MEMBER ARM — `§2.4` item 3's RECURSION, READ AS THE ARCHITECT RULED IT
 * (2026-10-11, `docs/decisions.md`'s ACTIVE row — `(D2)`)**: a **CONTAINER**-classed member is one
 * `parent` anchor keyed by the member's own name, whose link leads to the child node minted for that
 * member's value — **and at whole depth, so the child's own members recurse through this same arm**
 * (`C18`'s *"link with nodes"*, `C3`/`C11`).
 *
 * **⟶ `(D2)`/`(D3)`'s SCOPE, STATED HERE BECAUSE THE ARMS ARE ADJACENT AND EASY TO CONFLATE:** the
 * ruling reaches **what a CONTAINER's contents are minted as** — a linked anchor set, where a
 * literal-valued member is a child node readable through the reserved `_value` transparency. It does
 * **NOT** reach the arms that put a **LITERAL PAYLOAD at a NODE LOCATION**, where the contract pins
 * the opposite shape explicitly and green rows measure it: `R16`(a) — *"re-mint the node with the
 * literal added at that property"* — is `A1`/`A3`/`A4` (`§2.5` item 7), whose declared mint is
 * *"NO CHILD NODE IS MINTED"*, and the register's `P-SD-IM-13` (`S-SD-LITPROP-1`) asserts exactly
 * that at all four resolution rows. Those arms are applied at `applyPlan`/`applyPayloadTo` and never
 * route a bare literal through this function; a **literal MEMBER of a container**, by contrast, does
 * — and lands as the transparent child node of `A10`.
 *
 * **WHAT THE EARLIER FORM DID, so the correction is auditable: it wrote EVERY literal member straight
 * into the node's own `literals` table and minted NO child node for the CONTAINER case too** — the
 * `§0A` `DD-13` reading *"A DICT member is a LITERAL ON THE NODE ITSELF"* that **`(D3)` SUPERSEDES**.
 * Under that reading such a member had **no node at its own address**, so `M-PROP` answered it
 * LITERAL PROPERTY and the walk's terminal arm answered the literal for EVERY read form, qualified or
 * not — exactly what the register's `P-SD-IM-6 · S-SD-TOMB-1` cell (row 26) measured as broken at
 * `['tabs','page','body','title']` against a `file`-qualified read.
 */
function mintMember(node: InternalNode, key: string, value: StoreValue, tier: Tier): void {
  if (key === RESERVED_VALUE_MEMBER) return
  const child = emptyNode(tier)
  mintContents(child, value, tier)
  node.anchors.push({ parent: node, links: [child], type: 'parent', key, order: node.anchors.length })
}

/** `§2.4` item 7 · `§2.5` item 7 `A10` — an ARRAY element: a child node carrying `_value`. */
function mintElement(node: InternalNode, key: string, value: StoreValue, tier: Tier): void {
  const child = emptyNode(tier)
  mintContents(child, value, tier)
  node.anchors.push({ parent: node, links: [child], type: 'parent', key, order: node.anchors.length })
}

/**
 * **`(D2)` — THE CONTENTS MINT: what a container's contents become.** One node per member, reached
 * by an anchor: a **CONTAINER** member recurses through `mintMember`, and a **LITERAL-VALUED member
 * becomes a child node carrying the reserved `_value`** (`(D2)` verbatim: *"a literal-valued member
 * becoming a child node readable as its literal through the reserved `_value` transparency"* — the
 * TRANSPARENCY of `R16`(e), so `§2.8` item 7 arm `R2` answers the literal ALONE unqualified and the
 * NODE when tier-qualified, `(D4)`).
 */
function mintContents(node: InternalNode, value: StoreValue, tier: Tier): void {
  node.literals = {}
  node.anchors = []
  node.tombstone = false
  if (isLiteralValue(value)) {
    // `R16`(e) — a literal in a NODE POSITION is a TRANSPARENT node: `_value` alone.
    node.literals[RESERVED_VALUE_MEMBER] = value
    return
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      mintElement(node, String(index), value[index] as StoreValue, tier)
    }
    return
  }
  if (value === null || typeof value !== 'object') return
  for (const key of Object.keys(value)) {
    const member = (value as Record<string, StoreValue>)[key]
    if (member === undefined) continue
    mintMember(node, key, member, tier)
  }
}

/** `§2.4` item 3 — `mint(value, tier)` produces a node and its subtree, at whole depth. */
function mintInto(node: InternalNode, value: StoreValue, tier: Tier): void {
  node.literals = {}
  node.anchors = []
  node.tombstone = false
  if (isLiteralValue(value)) {
    // `R16`(e) — a literal in a NODE POSITION is a TRANSPARENT node: `_value` alone.
    node.literals[RESERVED_VALUE_MEMBER] = value
    return
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      mintElement(node, String(index), value[index] as StoreValue, tier)
    }
    return
  }
  if (value === null || typeof value !== 'object') return
  for (const key of Object.keys(value)) {
    const member = (value as Record<string, StoreValue>)[key]
    if (member === undefined) continue
    mintMember(node, key, member, tier)
  }
}

/* ─────────── THE CONDENSATION (§2.4 item 7 · §2.7 item 3 · §2.8 item 3 · `DD-13`) ─────────── */

/** `DD-13`'s third arm — a TRANSPARENT node's `_value` literal, or `undefined`. */
function transparentLiteral(node: InternalNode): StoreValue | undefined {
  const keys = Object.keys(node.literals)
  if (keys.length === 1 && keys[0] === RESERVED_VALUE_MEMBER) return node.literals[RESERVED_VALUE_MEMBER]
  return undefined
}

/** `R17`(c) — the node carries the reserved `_value` member at all (alone or otherwise). */
const carriesReservedLiteral = (node: InternalNode): boolean =>
  Object.prototype.hasOwnProperty.call(node.literals, RESERVED_VALUE_MEMBER)

const lowestOf = (options: readonly InternalNode[]): InternalNode | undefined => {
  let best: InternalNode | undefined
  for (const candidate of options) {
    if (best === undefined || TIER_RANK[candidate.tier] < TIER_RANK[best.tier]) best = candidate
  }
  return best
}

/** `§2.8` item 2 — the child instance a condensation takes at an anchor for the read at hand. */
const selectLink = (anchor: InternalAnchor, tier: Tier | undefined): InternalNode | undefined =>
  tier === undefined ? lowestOf(anchor.links) : anchor.links.find((candidate) => candidate.tier === tier)

/** `§2.4` item 7 · `DD-13` — list-shaped recognition, keyed on the CHILDREN and the dense `order`s.
 *
 *  **⟶ THE ANCHOR `key` IS PART OF THE TEST, AND THE `(D2)` LINKED ANCHOR SET MAKES IT
 *  LOAD-BEARING (`docs/decisions.md`'s ACTIVE ruling of 2026-10-11, `(D2)`/`(D3)` · `DD-13`'s
 *  AS-FILED test: *"its `parent` anchors' `key`s are exactly the canonical decimal spellings of a
 *  dense range `0..n-1` (`n ≥ 1`) **in `order` order**"*).** Under the ruling EVERY literal-valued
 *  member of a container is a transparent child node exactly like a LIST element, so *"no literals
 *  · every child transparent · dense `order`s"* alone would read the dict `{seed: 'a'}`
 *  (one anchor, `order 0`, one transparent child) as the LIST `['a']` — and the two are declared
 *  **TWO STATES** (`DD-13` (2): *"the dict answers `{'0':'a'}` and the list answers `['a']`"*; green
 *  `M-10` measures their two byte forms). The `key`s separate them: a list element's anchor is keyed
 *  by its index, a dict member's by the member's own name. `store-model.md` §2.4 item 7's amendment
 *  demotes the canonical-decimal spelling to a *"CONSEQUENCE of the mint"* — **and with `(D2)`'s
 *  linked anchor set that consequence is exactly what no longer follows from the children**, so the
 *  as-filed `DD-13` test is the operative form and the demotion is reported as a finding rather than
 *  silently followed into a collapse of two declared states. The demotion stands in every reading
 *  where dict members are literals on the node (the superseded `DD-13`), which is precisely the
 *  reading `(D3)` removes. */
function isListShaped(node: InternalNode, tier: Tier | undefined): boolean {
  if (node.anchors.length === 0) return false
  if (Object.keys(node.literals).length > 0) return false
  for (let index = 0; index < node.anchors.length; index += 1) {
    const anchor = node.anchors[index] as InternalAnchor
    if (anchor.order !== index) return false
    if (anchor.key !== String(index)) return false
    const child = selectLink(anchor, tier)
    if (child === undefined || child.tombstone) return false
    if (transparentLiteral(child) === undefined) return false
  }
  return true
}

/**
 * `§2.8` item 3 — `C21`'s transcription: the VALUE arm, the ARRAY arm and the OBJECT arm.
 * `tier` carries the read's FORM: `undefined` is the UNQUALIFIED assembly, which takes the
 * LOWEST-persistence instance at EVERY downstream address (`§2.8` item 2 (b)); a tier is the
 * QUALIFIED form, applied at every address it visits, with NO fall-back.
 */
function transcribeNode(node: InternalNode, tier: Tier | undefined = undefined): StoreValue {
  // `DD-13`'s THIRD ARM, decided FIRST because a transparent node answers a LITERAL and never a
  // transcription: `isListShaped`'s "no literals" test already excludes it from the array arm.
  const reserved = node.literals[RESERVED_VALUE_MEMBER]
  if (carriesReservedLiteral(node)) {
    if (Object.keys(node.literals).length === 1 && tier === undefined) {
      // `R2` — UNQUALIFIED answers the literal ALONE (`C21`'s own single-member transcription,
      // condensed by `DD-13`'s value arm); a primitive is its own copy (`C2`).
      return deepCopy(reserved as StoreValue)
    }
    // `R2` QUALIFIED — the read asks WHICH INSTANCE, so it answers the node's transcription.
    const carried: Record<string, StoreValue> = {}
    for (const key of Object.keys(node.literals)) {
      const value = node.literals[key]
      if (value === undefined) continue
      Object.defineProperty(carried, key, { value: deepCopy(value), enumerable: true, writable: true, configurable: true })
    }
    return carried
  }
  if (isListShaped(node, tier)) {
    const list: StoreValue[] = []
    for (const anchor of node.anchors) {
      const child = selectLink(anchor, tier)
      if (child === undefined) {
        // `§2.8` item 2 (b) — QUALIFIED: the tier is absent downstream, so the member is ABSENT.
        if (tier !== undefined) continue
        list.push(null)
        continue
      }
      const element = transparentLiteral(child)
      list.push(element === undefined ? null : deepCopy(element))
    }
    return list
  }
  const out: Record<string, StoreValue> = {}
  for (const key of Object.keys(node.literals)) {
    const value = node.literals[key]
    if (value === undefined) continue
    Object.defineProperty(out, key, { value: deepCopy(value), enumerable: true, writable: true, configurable: true })
  }
  for (const anchor of node.anchors) {
    const child = selectLink(anchor, tier)
    // `§2.8` item 2 (b) — a QUALIFIED read's downstream absence means the member is ABSENT from the
    // transcription and the walk does not descend through it (NO fall-back to a lower tier).
    if (child === undefined) continue
    if (child.tombstone) {
      // `R11` — the tombstone is never a transcription, yet the PROPERTY continues to exist
      // (§2.6 item 6: the member names a node rather than a literal).
      Object.defineProperty(out, anchor.key, { value: undefined, enumerable: true, writable: true, configurable: true })
      continue
    }
    Object.defineProperty(out, anchor.key, {
      /**
       * **`§2.8` item 7 arm `R2`'s TRANSPARENCY PROJECTION, APPLIED AT EVERY DESCENT**
       * (`RCA-8(d)`; the ACTIVE ruling of 2026-10-11, `(D2)`/`(D4)`): a child node carrying the
       * reserved `_value` alone IS its literal *inside a parent's transcription* — the parent's
       * member is the literal, never `{_value: <literal>}`. **This arm is what keeps `C21`'s
       * transcription the SAME VALUE that was written under `(D2)`'s linked anchor set**: with
       * every literal-valued member of a container minted as a transparent child, `R16`(e)'s round
       * trip (*"write … → link with nodes of values … → read the same value"*) holds only if the
       * descent projects the child's literal, and the read of the ROOT of a written container —
       * qualified or not — is the same declared transcription.
       *
       * **WHERE THE SPLIT OF `(D4)` LIVES, EXACTLY: `R2`'s UNQUALIFIED-vs-QUALIFIED difference is a
       * difference about the ADDRESSED ADDRESS, never about a member of a parent's object.** A read
       * whose ADDRESS IS the transparent node answers the literal alone when unqualified (green
       * `A-6`: `['tabs','page','body','title']` ⇒ `'t'`) and the NODE when tier-qualified (the
       * register's `P-SD-IM-6 · S-SD-TOMB-1` cell: that same address against the `file` tier ⇒
       * `{title: 't'}`) — which is the arm `transcribeNode`'s own head decides. A MEMBER of an
       * object being transcribed is **not** an addressed address — **the addressed node's own
       * transcription is this function's answer**, and inside it the member is the literal the child
       * carries. **THIS IS MEASURED, NOT ASSUMED: a tier-qualified read of a written container
       * answers `{seed: 'file'}` (green `W-3`, `W-7`, `B-4`, `F-4`, `Z-1`, `L-5`), while the child's
       * OWN qualified read answers the raw node (`{_value: 'file'}`, green `R-2`, `W-17`) — the two
       * arms are the SAME rule seen from the node's side and from the member's side.**
       */
      value:
        transparentLiteral(child) !== undefined
          ? deepCopy(transparentLiteral(child) as StoreValue)
          : transcribeNode(child, tier),
      enumerable: true,
      writable: true,
      configurable: true,
    })
  }
  return out
}

/** `§2.7` item 3 · `DD-12` — the save's condensation descends ONLY through `file`-instance children. */
function condenseFileNode(node: InternalNode): StoreValue | undefined {
  if (node.tombstone) return undefined
  const direct = transparentLiteral(node)
  if (direct !== undefined) {
    const encoded: Record<string, StoreValue> = {}
    encoded[RESERVED_VALUE_MEMBER] = direct
    return encoded
  }
  if (isListShaped(node, 'file')) {
    const list: StoreValue[] = []
    for (const anchor of node.anchors) {
      const child = anchor.links.find((candidate) => candidate.tier === 'file')
      if (child === undefined) continue
      const element = condenseFileNode(child)
      if (element !== undefined) list.push(element)
    }
    return list
  }
  const out: Record<string, StoreValue> = {}
  for (const key of Object.keys(node.literals)) {
    const value = node.literals[key]
    if (value === undefined) continue
    out[key] = value
  }
  for (const anchor of node.anchors) {
    if (anchor.key === RESERVED_VALUE_MEMBER) continue
    const child = anchor.links.find((candidate) => candidate.tier === 'file')
    if (child === undefined) continue
    const condensed = condenseFileNode(child)
    if (condensed === undefined) continue
    out[anchor.key] = condensed
  }
  return out
}

/* ─────────────────────────── THE WALK (§2.3 item 2) ─────────────────────────── */

const findEntry = (register: readonly RegisterEntry[], name: string): RegisterEntry | undefined =>
  register.find((entry) => entry.name === name)

const anchorsAt = (parent: InternalNode, segment: string): InternalAnchor[] =>
  parent.anchors.filter((anchor) => anchor.key === segment)

const instancesAt = (parent: InternalNode, segment: string): InternalNode[] =>
  anchorsAt(parent, segment).flatMap((anchor) => anchor.links)

/** `§2.8` item 2 — QUALIFIED takes that tier specifically; UNQUALIFIED takes the lowest-persistence. */
const selectInstance = (options: readonly InternalNode[], tier: Tier | undefined): InternalNode | undefined =>
  tier === undefined ? lowestOf(options) : options.find((candidate) => candidate.tier === tier)

interface WalkResult {
  entry: RegisterEntry | null
  node: InternalNode | null
  failed: boolean
  step: ResolveStep
  segment: string | null
  /** The arm failed on a TOMBSTONE, so an unqualified read answers `'tombstoned'` (`R11`). */
  suppressed: boolean
  /**
   * **A TOMBSTONE STANDS AT THE TIER A QUALIFIED READ PASSED — AT A SEGMENT THE WALK CROSSED.** The
   * walk consumed a segment whose instance pool at the passed tier holds a NON-TOMBSTONE node beside
   * at least one tombstone. `§2.8` item 2 (a) takes that tier's own node at every address it visits,
   * so the walk's node stands; `§2.3` item 2's terminal arm (`M-PROP`) then reads the FINAL segment
   * against that node. (The walk's own SAME-TIER tombstone arm never reaches here: it fails the walk
   * outright, `C17`.)
   */
  crossedTombstone: boolean
}

/** `§2.3` item 2 — the walk from the register, with the walk's five steps and their failures.
 *
 *  **A TOMBSTONE SUPPRESSES THE WALK AT ITS OWN TIER AND NOT AT ANOTHER** (`§2.8` item 2 · `§2.6`
 *  item 2). A read qualified to tier `T` takes `T` *"specifically, at every address it visits, WITH
 *  NO FALL-BACK"*, so an instance of a DIFFERENT tier standing at an intermediate segment — tombstoned
 *  or not — is not the tier this read visits: the walk takes `T`'s own node there and continues. Where
 *  the instance `T` selects IS a tombstone, `§2.8` item 2 (a) makes the address unreachable for `T`:
 *  the walk fails at that segment (`C17`), which is the arm the caller answers token 3 for, and the
 *  UNQUALIFIED read's own `'tombstoned'` arm hangs on the very same failure (`suppressed`, `R11`). An
 *  UNQUALIFIED read (`tier === undefined`) selects the LOWEST-persistence instance and is therefore
 *  blocked by any tombstone standing at the address; the WRITE path is UNQUALIFIED too: a tombstone
 *  node is a node at the segment, and the write arms own that address (`A7`/`A8`/`A9`). */
function walkTo(
  registry: readonly RegisterEntry[],
  address: Address,
  tier: Tier | undefined,
  secure: boolean,
): WalkResult {
  void secure
  const entry = findEntry(registry, address[0] as string)
  if (entry === undefined) {
    return { entry: null, node: null, failed: true, step: 'B-ROOT', segment: address[0] ?? null, suppressed: false, crossedTombstone: false }
  }
  if (address.length === 1) {
    return { entry, node: entry.node, failed: false, step: 'E-CHILD', segment: null, suppressed: false, crossedTombstone: false }
  }
  /**
   * **`§2.8` item 2 (a) — THE QUALIFIED READ'S OWN TIER BOUNDS THE WALK, WHERE ANOTHER TIER'S
   * TOMBSTONE DOES NOT.** A tombstone standing at the PASSED tier fails the walk at ITS OWN SEGMENT
   * (`C17`: *"a failure at an INTERMEDIATE segment (`i < n`) is `'unreachable'`"*) and raises
   * `suppressed`, so an UNQUALIFIED read — whose selection lands on it — answers `'tombstoned'`
   * (`R11`); a tombstone standing at a DIFFERENT tier is NOT a failure of this walk at all
   * (`§2.6` item 2: the qualified read *"is not suppressed by a tombstone standing at a different
   * tier"*): `selectInstance` takes the PASSED tier's own node there and the walk continues through
   * to the terminal address — recording the crossing so the terminal arm can answer the descendant
   * case below.
   */
  let current = entry.node
  let crossedTombstone = false
  for (let index = 1; index < address.length; index += 1) {
    const segment = address[index] as string
    if (Object.prototype.hasOwnProperty.call(current.literals, segment)) {
      // `C11` — a LITERAL member is not a node: no walk step may pass through it (`C-ANCHOR`).
      return { entry, node: null, failed: true, step: 'C-ANCHOR', segment, suppressed: false, crossedTombstone }
    }
    const pool = instancesAt(current, segment)
    const selected = selectInstance(pool, tier)
    if (selected === undefined) {
      // `C17` — an INTERMEDIATE arm failed (`C-ANCHOR`/`D-LINK`/`E-CHILD`): the tier a QUALIFIED read
      // visits holds no instance at this segment (a tombstone at ANOTHER tier is no failure of this
      // walk, `§2.6` item 2 — it is not the tier this read visits).
      return { entry, node: null, failed: true, step: index <= 2 ? 'C-ANCHOR' : 'E-CHILD', segment, suppressed: false, crossedTombstone }
    }
    if (selected.tombstone) {
      // The walk's own selection landed on a TOMBSTONE. `R11`'s `suppressed` is what an UNQUALIFIED
      // read answers at this segment (`'tombstoned'`, never returned); for a QUALIFIED read the
      // tombstone standing at the PASSED tier means the passed tier's own node is DELETED at this
      // segment — an intermediate-segment failure answering token 3 (`C17`), never token 4.
      return { entry, node: null, failed: true, step: 'E-CHILD', segment, suppressed: true, crossedTombstone }
    }
    if (pool.some((candidate) => candidate.tombstone)) {
      // A TOMBSTONE STANDS AT A DIFFERENT TIER at a segment this walk CONSUMED. `§2.6` item 2 does
      // not suppress the qualified read, so the walk stands on the passed tier's own node and records
      // the crossing: a DESCENDANT of that tombstone resolves against the tier that was walked.
      crossedTombstone = true
    }
    current = selected
  }
  return { entry, node: current, failed: false, step: 'E-CHILD', segment: null, suppressed: false, crossedTombstone }
}

/**
 * `§2.3` item 2 — what the final segment names where `P` is the REGISTER (`C14`): the entry's own
 * node IS the addressed node, so a node standing there (a TRANSPARENT node included) makes the final
 * segment a NODE LOCATION, and only a literal MEMBER keyed by the segment is a LITERAL PROPERTY.
 */
function propertyKindAtRoot(node: InternalNode, segment: string): PropertyKind {
  if (carriesReservedLiteral(node)) return 'node-location'
  if (Object.prototype.hasOwnProperty.call(node.literals, segment)) return 'literal-property'
  return 'absent-property'
}

/** `§2.3` item 2 — what the final segment names at `P`: a node location, a literal, or neither. */
function propertyKind(parent: InternalNode, segment: string): PropertyKind {
  if (Object.prototype.hasOwnProperty.call(parent.literals, segment)) return 'literal-property'
  if (instancesAt(parent, segment).length > 0) return 'node-location'
  return 'absent-property'
}

/* ─────────────────── THE MESSAGE LIST (§2.10 item 10 · `DD-21`) ─────────────────── */

const STEP_MARK: ResolveStep = 'H-CONSTRAINT'

interface DraftContext {
  readonly pass: number
  readonly position: number | null
  readonly address: readonly string[]
}

const storeEntry = (
  step: ResolveStep,
  address: readonly string[],
  text: string,
  draft?: DraftContext,
): StoreMessage => ({
  source: 'store',
  pass: draft?.pass ?? 1,
  position: draft?.position ?? null,
  step,
  address,
  text,
})

/**
 * `§2.10` item 10 door (ii) — the store HARVESTS the module's drafts after the call returns and
 * STAMPS each.  THE HARVEST IS TOTAL AND NEVER THROWS: an un-stampable draft is DISCARDED, so a
 * module cannot forge a `'store'` entry.
 */
function harvest(entries: StoreMessage[], notes: unknown, draft: DraftContext): void {
  if (!Array.isArray(notes)) return
  for (const note of notes as unknown[]) {
    if (typeof note !== 'object' || note === null) continue
    const source = (note as { source?: unknown }).source
    const text = (note as { text?: unknown }).text
    if (source !== 'constraint' && source !== 'repair') continue
    if (typeof text !== 'string') continue
    entries.push({ source, pass: draft.pass, position: draft.position, step: STEP_MARK, address: draft.address, text })
  }
}

const refused = (reason: Reason, step: ResolveStep, segment: string | null, messages: StoreMessage[]): Refusal => ({
  status: 'refused',
  reason,
  step,
  segment,
  messages,
})

/** A refusal whose PRIMARY sentence — the list's LAST entry — is the store's own. */
const storeRefusal = (
  reason: Reason,
  step: ResolveStep,
  segment: string | null,
  address: readonly string[],
  text: string,
  prior: readonly StoreMessage[] = [],
): Refusal => refused(reason, step, segment, [...prior, storeEntry(step, address, text)])

/* ─────────────────────────── THE `PAR-11` RESOLUTION ─────────────────────────── */

/**
 * `PAR-11` — a COMPLETE surface is adopted; ABSENT or PARTIAL falls back to the real `node:fs`
 * (*"absent ⇒ the real `node:fs`"*).  A PARTIAL surface is NEVER adopted, so the real module is what
 * serves a partial drive.
 *
 * The real module is reached through `process.getBuiltinModule('fs')` — Node's own runtime door to
 * a builtin, reached WITHOUT a static `import 'node:fs'`, which a `--platform=browser` bundle of
 * this file could not resolve.  In such a realm the guard is false and the INERT surface below
 * serves every file-tier call as a RETURNED typed record rather than a throw (§2.1 item 4).
 */
function resolveFs(supplied: FsSurface | undefined): FsSurface {
  const required: readonly (keyof FsSurface)[] = [
    'readFileSync',
    'existsSync',
    'mkdirSync',
    'writeFileSync',
    'openSync',
    'closeSync',
    'fsyncSync',
    'renameSync',
    'rmSync',
  ]
  if (supplied !== undefined) {
    const candidates = supplied as unknown as Record<string, unknown>
    if (required.every((member) => typeof candidates[member] === 'function')) return supplied
  }
  try {
    const host = (globalThis as { process?: unknown }).process
    if (typeof host === 'object' && host !== null) {
      const loader = host as { getBuiltinModule?: (specifier: string) => unknown }
      const load = loader.getBuiltinModule
      if (typeof load === 'function') {
        const mod = load.call(host, 'fs') as ({ default?: FsSurface } & FsSurface) | undefined
        if (mod !== undefined && mod !== null) {
          const surface = (mod.default ?? mod) as unknown as Record<string, unknown>
          if (required.every((member) => typeof surface[member] === 'function')) return mod as FsSurface
        }
      }
    }
  } catch {
    /* fall through to the inert surface below */
  }
  // A realm with neither a supplied surface nor `require` (a renderer bundle): an INERT surface, so
  // every file-tier call answers a RETURNED typed record rather than throwing (§2.1 item 4).
  const fail = (): never => {
    throw new Error('no `PAR-11` fs surface is available in this realm')
  }
  return {
    readFileSync: fail,
    existsSync: () => false,
    mkdirSync: fail,
    writeFileSync: fail,
    openSync: fail,
    closeSync: () => undefined,
    fsyncSync: fail,
    renameSync: fail,
    rmSync: () => undefined,
  }
}

/* ─────────────────────────── THE MODULE (§1.2 item 1) ─────────────────────────── */

/** §1.2 item 1 · §2.1 — `createStore(options)`, the ONE factory the surface declares. */
export function createStore(options: StoreOptions): Store {
  const fs = resolveFs(options.fs)
  const filePath = options.file.path
  const securePath = options.secure.path

  const register: RegisterEntry[] = []
  const listeners: InternalListener[] = []
  /**
   * `§2.10` item 2 — the registrations whose carrier does not stand yet.  The seam attaches a
   * registration to the LINK at its address (or to the register entry at a 1-segment address), and a
   * registration is NOT a write: it MINTS NO PATH (`C14`: a root comes into being only by a write at
   * a 1-segment address).  A registration at an address that does not resolve therefore stands here,
   * carrying its own address, until a write at that address materializes the carrier.
   */
  const pendingConstraints: { address: readonly string[]; registration: ConstraintRegistration }[] = []

  /**
   * `C23` · `§2.11` items 2–3 — THE PLACEHOLDER ROOTS.  A `listen`/`constrain` at an address whose
   * root the store does not yet carry attaches to a carrier that stands *"without having a distinct
   * parent"* (`C14`), and `C24`'s boot order REQUIRES the registration to precede the data
   * (*"event listeners are added before the store is loaded from file"*) — so the seam brings the
   * entry's own link into being and holds the registration against its own address.  That entry
   * holds NO STATE yet: a write at the address is the only thing that MINTS a root (`C14`), so until
   * one lands the address does NOT resolve and the listener is UNATTACHED — `C23`'s *"waiting for an
   * address that is currently unreachable"*.  A name leaves this set when a write is planned at it.
   */
  const unmintedRoots = new Set<string>()

  /** §2.12 item 4 · `DD-14` — the declared UNLOADED state of each graph. */
  let fileLoaded = true
  let secureLoaded = true

  /* ── the shared validators ───────────────────────────────────────────────────── */

  function addressRefusal(address: unknown): Refusal | null {
    if (!Array.isArray(address) || address.length === 0) {
      return storeRefusal('malformed-address', 'A-ADDRESS', null, [], 'the address is not a non-empty array of non-empty strings')
    }
    for (const segment of address as unknown[]) {
      if (typeof segment !== 'string' || segment.length === 0) {
        return storeRefusal(
          'malformed-address',
          'A-ADDRESS',
          null,
          address as string[],
          'the address carries a non-string or empty-string segment',
        )
      }
    }
    return null
  }

  function tierRefusal(tier: unknown, address: Address, required: boolean): Refusal | null {
    if (tier === 'secure') {
      return storeRefusal('secure-refused', 'F-TIER', null, address, 'the `secure` tier is no legal argument on the GENERIC surface (C6)')
    }
    if (tier === undefined && !required) return null
    if (typeof tier !== 'string' || !RANKED_TIERS.includes(tier as Tier)) {
      return storeRefusal('malformed-tier', 'F-TIER', null, address, 'the tier argument is absent or not one of `file`/`mem`/`temp` (C15)')
    }
    return null
  }

  const notLoaded = (address: readonly string[]): Refusal =>
    storeRefusal('not-loaded', 'J-LOAD', null, address, 'the `file` tier is UNLOADED after a refused load (§2.12 item 4)')

  const unknownRoot = (address: readonly string[]): Refusal =>
    storeRefusal('unknown-root', 'B-ROOT', address[0] ?? null, address, 'the register carries no entry named by the first segment (C14)')

  const unreachable = (step: ResolveStep, segment: string | null, address: readonly string[]): Refusal =>
    storeRefusal('unreachable', step, segment, address, 'an intermediate arm failed: the address is unreachable (C17)')

  const tierNotHeld = (address: readonly string[]): Refusal =>
    storeRefusal('tier-not-held', 'F-TIER', null, address, 'a QUALIFIED read: that tier holds no instance at the addressed address (R9 item 1)')

  /* ── the read (§2.8) ─────────────────────────────────────────────────────────── */

  /** A root address (`C14`): the ENTRY's own node plus its link list are the instance pool. */
  function rootPool(entry: RegisterEntry): InternalNode[] {
    const pool = [entry.node]
    for (const anchor of entry.peers) {
      for (const child of anchor.links) if (child !== entry.node) pool.push(child)
    }
    return pool
  }

  /** The tier variants of a DEEPER address: the anchor's own link list. */
  const poolAt = (parent: InternalNode, segment: string): InternalNode[] => instancesAt(parent, segment)

  function runRead(address: unknown, tier: unknown, secure: boolean): ReadAnswer {
    const bad = addressRefusal(address)
    if (bad !== null) return bad
    const target = address as string[]
    if (!secure) {
      const tierError = tierRefusal(tier, target, false)
      if (tierError !== null) return tierError
      if (tier === 'file' && !fileLoaded) return notLoaded(target)
    }
    const readTier = secure ? undefined : (tier as Tier | undefined)
    const entry = findEntry(register, target[0] as string)
    // `§2.12` item 4 (token 15) and `§2.3` item 2's `B-ROOT` (token 2) are BOTH state duties of the
    // address's own root: the UNLOADED state is answered FIRST where the root is not registered —
    // its `J-LOAD` is the state the failing load left, and minting nothing is the only arm open.
    if (entry === undefined && readTier === 'file' && !fileLoaded) return notLoaded(target)
    if (target.length >= 2) {
      const parentWalk = walkTo(register, target.slice(0, target.length - 1), readTier, secure)
      if (target.length < 1 || parentWalk.failed || parentWalk.node === null) {
        /**
         * **THE FAILING SEGMENT HERE IS ALWAYS AN INTERMEDIATE ONE OF THE TARGET — `i < n` — SO
         * TOKEN 3 ANSWERS IT** (`§2.3` item 2: *"a failure at an INTERMEDIATE segment (`i < n`) is
         * `'unreachable'`"*). The parent walk stops at the IMMEDIATE PARENT of the addressed address
         * (`i = n − 1` at most), so a QUALIFIED read whose passed tier is deleted at a segment ABOVE
         * the addressed address cannot reach its terminal address at all: `R11`'s *"no descent"* is
         * token 3 for the unqualified form and `C17`'s intermediate failure is token 3 for the
         * qualified one alike. **`'absent-address'` IS THE TOMBSTONE'S OWN-ADDRESS ARM and it belongs
         * to the TERMINAL address** (`§2.6` item 2 · `R10`: *"a read qualified to the TOMBSTONE's own
         * tier answers the tombstone's own absence"*, where the tombstone stands AT the addressed
         * address) — answered at the `selected.tombstone` check below, NOT here.
         */
        return unreachable(parentWalk.step, parentWalk.segment, target)
      }
      const parent = parentWalk.node
      const segment = target[target.length - 1] as string
      if (Object.prototype.hasOwnProperty.call(parent.literals, segment)) {
        // `§2.8` item 7 arm `R1` (`R16`(b)) — a literal property answers ONLY that property.
        return { status: 'read', value: deepCopy(parent.literals[segment] as StoreValue), tier: secure ? 'file' : parent.tier }
      }
      const selected = selectInstance(instancesAt(parent, segment), readTier)
      if (selected === undefined) {
        return storeRefusal('absent-address', 'E-CHILD', segment, target, 'the addressed node does not exist; the read mints nothing (DD-11)')
      }
      if (selected.tombstone) {
        /**
         * **`R11`/`R10` — THE TOMBSTONE IS NEVER RETURNED: THE ADDRESS READS AS DELETED, and the form
         * decides which token says so.**
         *  · **UNQUALIFIED — token 6 `'tombstoned'`** (`§2.6` item 2: *"the unqualified read at the
         *    tombstone's address answers `Refusal` with `reason: 'tombstoned'`"*).
         *  · **QUALIFIED TO THE TOMBSTONE'S OWN TIER — token 4 `'absent-address'`** at the tombstone's
         *    OWN address (`§2.6` item 2: *"a read qualified to the TOMBSTONE's own tier answers the
         *    tombstone's own absence"*; pinned green by `B-6`).
         *  · **A DESCENDANT OF THE TOMBSTONE — token 3 `'unreachable'`**, whatever the form:
         *    `C17`'s *"a failure at an INTERMEDIATE segment (`i < n`) is `'unreachable'`"* (`B-5` pins
         *    the unqualified arm and the register's `P-SD-IM-6` the qualified one). This arm is
         *    reached when the walk CROSSED a tombstone standing at another tier (`crossedTombstone`):
         *    the addressed address's own tier instance is deleted, so nothing below the crossed
         *    tombstone is reachable and token 3 — never the tombstone's own absence — is the answer.
         */
        if (readTier === undefined) {
          return storeRefusal('tombstoned', 'E-CHILD', segment, target, 'the address is tombstone-suppressed; the tombstone is never returned (R11)')
        }
        return parentWalk.crossedTombstone
          ? storeRefusal('unreachable', 'E-CHILD', segment, target, 'an intermediate arm failed: a tombstone stands above the addressed address, which the passed tier cannot descend through (C17)')
          : storeRefusal('absent-address', 'E-CHILD', segment, target, 'a qualified read of the tombstone’s own tier answers its own absence (R10)')
      }
      return { status: 'read', value: transcribeNode(selected, readTier), tier: secure ? 'file' : selected.tier }
    }
    if (entry === undefined) {
      /**
       * **THE QUALIFIED FORM'S ABSENCE IS `'tier-not-held'`, NOT `'unknown-root'`** (`§2.8` item 2,
       * verbatim: *"If a specific tier is passed, read that tier specifically … an address that tier
       * does not hold is `C17`'s verbose error, never a lower-tier answer"*; `§2.8` item 2 (a): *"at
       * the ADDRESSED address, the tier's absence is a `Refusal` with `reason: 'tier-not-held'` (step
       * `F-TIER`)"*). **What a QUALIFIED read asks is WHICH INSTANCE, and where the addressed address
       * holds NO instance the answer is that tier's own absence** — the caller passed a tier and the
       * tier holds nothing, which is exactly token 5's fact; `'unknown-root'` (token 2) names the
       * different fact that the walk's `B-ROOT` arm failed for a caller who asked for the ADDRESS.
       * **The UNQUALIFIED form keeps token 2 unchanged** (`§2.8` item 7's *"the `'unknown-root'` arm
       * … stands BYTE-FOR-BYTE"* arm; `C14`: a root comes into being only by a write at a 1-segment
       * address, so an unqualified read of a name nothing was written at is `unknown-root`).
       */
      if (readTier !== undefined) return tierNotHeld(target)
      return unknownRoot(target)
    }
    // A 1-SEGMENT address: the entry's own name IS the final segment (`C14`), so a literal member
    // keyed by it answers exactly as `R1` does at any depth.
    if (Object.prototype.hasOwnProperty.call(entry.node.literals, target[0] as string)) {
      return { status: 'read', value: deepCopy(entry.node.literals[target[0] as string] as StoreValue), tier: secure ? 'file' : entry.node.tier }
    }
    const pool = rootPool(entry)
    const rootInstance = readTier === undefined ? lowestOf(pool) ?? entry.node : pool.find((candidate) => candidate.tier === readTier)
    if (rootInstance === undefined) return tierNotHeld(target)
    if (rootInstance.tombstone) {
      return readTier === undefined
        ? storeRefusal('tombstoned', 'E-CHILD', null, target, 'the root is tombstone-suppressed; the tombstone is never returned (R11)')
        : storeRefusal('absent-address', 'E-CHILD', null, target, 'a qualified read of the tombstone’s own tier answers its own absence (R10)')
    }
    const direct = transparentLiteral(rootInstance)
    if (direct !== undefined && readTier === undefined) {
      // `§2.8` item 7 arm `R2` — UNQUALIFIED answers the literal ALONE; transparency is a projection.
      return { status: 'read', value: deepCopy(direct), tier: rootInstance.tier }
    }
    return { status: 'read', value: transcribeNode(rootInstance, readTier), tier: secure ? 'file' : rootInstance.tier }
  }

  /* ── the write's plan (§2.3 item 2's four answers · §2.5 item 7's `A1`–`A10`) ── */

  interface Plan {
    readonly entry: RegisterEntry
    readonly parent: InternalNode
    readonly segment: string
    readonly kind: PropertyKind
    readonly payload: PlannedPayload
    /** `C14`/`C18` — a 1-SEGMENT write, whose target is the REGISTER ENTRY's own root instance. */
    readonly root: boolean
  }

  const nodeLocationRefusal = (address: readonly string[], segment: string): Refusal =>
    storeRefusal(
      'node-location-container',
      'M-PROP',
      segment,
      address,
      'a container was written at a NODE LOCATION — the anti-pattern; the user should create a WRAPPER NODE (R17(a) · R16(d))',
    )

  const secondMemberRefusal = (address: readonly string[]): Refusal =>
    storeRefusal('value-not-admitted', 'G-VALUE', null, address, 'a second member beside a `_value` literal is refused: `_value` is ALONE in its node (R17(c))')

  /** The write's admission of its payload (`§2.5` item 1 step (4) · `PAR-4`/`PAR-5`/`PAR-14`). */
  function planPayload(address: readonly string[], payload: unknown): { payload: PlannedPayload } | { refusal: Refusal } {
    const asPayload = (payload ?? {}) as Record<string, unknown>
    const hasValue = Object.prototype.hasOwnProperty.call(asPayload, 'value')
    const hasTombstone = Object.prototype.hasOwnProperty.call(asPayload, 'tombstone')
    const hasTransparent = Object.prototype.hasOwnProperty.call(asPayload, 'transparent')
    if (hasTransparent && asPayload['transparent'] !== true) {
      return {
        refusal: storeRefusal('malformed-tombstone', 'G-VALUE', null, address, 'the `transparent` member is present and is not the literal `true` (PAR-14)'),
      }
    }
    const transparent = hasTransparent
    if (hasTombstone && (hasValue || asPayload['tombstone'] !== true || transparent)) {
      return {
        refusal: storeRefusal('malformed-tombstone', 'G-VALUE', null, address, 'a value or the transparency stands beside `tombstone: true` (R10 · PAR-5 · PAR-14)'),
      }
    }
    if (!hasTombstone && !hasValue) {
      return { refusal: storeRefusal('malformed-tombstone', 'G-VALUE', null, address, 'the payload is neither `{value: …}` nor `{tombstone: true}` (C18/C19)') }
    }
    if (hasTombstone) return { payload: { plan: 'tombstone' } }
    const value = asPayload['value'] as StoreValue
    if (!admitsValue(value)) {
      return { refusal: storeRefusal('value-not-admitted', 'G-VALUE', null, address, 'the payload’s value is outside the admission set (§2.4 item 2 · C7)') }
    }
    if (transparent && !isLiteralValue(value)) {
      // `P §12`'s first carriage · `R17`(c) — a CONTAINER at `_value` is refused (token 9).
      return { refusal: storeRefusal('value-not-admitted', 'G-VALUE', null, address, 'a CONTAINER written through the transparency is refused (P §12 · R17(c))') }
    }
    if (!transparent && containsReservedMember(value)) {
      // `§2.3` item 5(b)/5(c) · `R16`(e) — `_value` is a RESERVED KEY: a caller's ordinary property
      // of that name is not available, and `transparent` is its ONLY spelling.
      return {
        refusal: storeRefusal('value-not-admitted', 'G-VALUE', null, address, '`_value` is a RESERVED member key; the payload’s `transparent` member is the only spelling that reaches it (R16(e))'),
      }
    }
    return { payload: { plan: 'value', value, transparent } }
  }

  /**
   * `C18` + `DD-11`'s whole-subtree arm — mint the missing INTERMEDIATES a write needs, at the
   * STANDING parent's own tier (`R9`'s invariant holds along the path).  The mint STOPS at a member
   * that already STANDS and is not a node (a literal member, or a tombstone): that is `DD-11`'s
   * intermediate arm, which mints nothing and is answered `'unreachable'` by the walk below.
   */
  function mintPath(registry: RegisterEntry[], address: string[]): void {
    if (address.length < 3) return
    const entry = findEntry(registry, address[0] as string)
    if (entry === undefined) return
    let current = entry.node
    for (let index = 1; index < address.length - 1; index += 1) {
      const segment = address[index] as string
      if (Object.prototype.hasOwnProperty.call(current.literals, segment)) return
      const selected = lowestOf(instancesAt(current, segment))
      if (selected !== undefined) {
        if (selected.tombstone) return
        current = selected
        continue
      }
      const child = emptyNode(current.tier)
      current.anchors.push({ parent: current, links: [child], type: 'parent', key: segment, order: current.anchors.length })
      current = child
    }
  }

  /** `§2.3` item 2's walk + `§2.5` item 7's arm selection, against the register as it stands. */
  function planWrite(
    registry: RegisterEntry[],
    address: string[],
    tier: Tier,
    payload: PlannedPayload,
    secure: boolean,
  ): { plan: Plan } | { refusal: Refusal } {
    if (!secure && tier === 'file' && !fileLoaded) return { refusal: notLoaded(address) }
    const mintsSubtree = payload.plan === 'tombstone' || (payload.plan === 'value' && !isLiteralValue(payload.value))
    let entry = findEntry(registry, address[0] as string)
    if (entry === undefined) {
      const mints = payload.plan === 'tombstone' || (payload.plan === 'value' && !isLiteralValue(payload.value))
      if (!secure && !mints && address.length > 1) {
        if (address.length === 2) {
          // `§2.3` item 2's `B-ROOT` arm — the register carries no entry named by `address[0]` and
          // the write is aimed AT that name's own property (`i = n − 1 = 1`): token 2 answers it.
          return { refusal: unknownRoot(address) }
        }
        // `§2.3` item 2's INTERMEDIATE arm — a failure at `i < n` with `i ≥ 2` is `'unreachable'`
        // (token 3): the register carries no entry at all, so the address cannot be walked to.
        return { refusal: unreachable('B-ROOT', address[0] ?? null, address) }
      }
      // `C18`/`C14` — a write at an address that COULD exist ADDS the data, using it as its entry,
      // and the register entry comes into being with it (`DD-11`'s whole-subtree arm: a CONTAINER or
      // a TOMBSTONE carries it, while a bare literal at a deeper address does not).
      entry = { name: address[0] as string, node: emptyNode(tier), constraints: [], peers: [] }
      registry.push(entry)
    }
    // `C14` — a WRITE at the address is what mints a root, so a placeholder root left by a
    // registration (`§2.11` item 2) stops being a placeholder the moment a write is planned at it.
    unmintedRoots.delete(entry.name)
    const kindAtRoot = propertyKindAtRoot(entry.node, address[0] as string)
    if (address.length === 1) {
      const atRootTier = rootPool(entry).find((candidate) => candidate.tier === tier)
      /**
       * **`A2` DOES NOT REACH A 1-SEGMENT ADDRESS, and the reason is `R16`(d)'s own definition of the
       * arm.** `R16`(d) names the anti-pattern as *"passing an array/list/dict to a node location
       * (ex. an address that resolves to being contained in an EXISTING LINK, ex. 'window.tabs.doc1')"*
       * — an address whose FINAL SEGMENT is a PROPERTY of its parent, carried by that parent's
       * `parent`-type anchor. At a 1-segment address the register entry's own node IS the addressed
       * node (`C14`: the entry's name is the segment, its child is the node); the node is NOT a
       * property of any parent, no link carries it, and `R16`(d)'s alternative remedy — *"the user
       * should create a WRAPPER NODE"* — is already the shape the write has. What such a write is,
       * is the ordinary TOTAL OVERWRITE that `C19`/`§2.5` item 3 declares: *"an existing instance at
       * `(address, tier)` is discarded and re-minted (there is no read-modify-write, no merge and no
       * partial member update), and every node in the addressed instance's descendant tree is
       * discarded with it."* The arm is therefore NOT selected here, and the caller's container is
       * minted as the root instance's new member set.
       *
       * WHAT THE EARLIER FORM DID, so the correction is auditable: it read `propertyKindAtRoot`'s
       * `kindAtRoot === 'node-location'` (a root whose instance carries any member at all — literals
       * or anchors) as `A2`'s condition and refused the write `'node-location-container'` BEFORE any
       * mint, so a second write at a 1-segment address never landed. That contradicted `C19`'s
       * overwrite clause, `§2.5` item 2's `C18` add arm at a 1-segment address (`C14`'s entry is
       * created there) and the register's `P-SD-IM-2` drive (`an overwrite at an occupied address`,
       * whose three observed positions all require the write to land).
       */
      if (
        payload.plan === 'value' &&
        !isLiteralValue(payload.value) &&
        !payload.transparent &&
        kindAtRoot === 'node-location' &&
        atRootTier !== undefined &&
        carriesReservedLiteral(atRootTier)
      ) {
        // `R17`(c) · `P §12` — a CONTAINER placed BESIDE a `_value` literal would put a second member
        // in a node whose `_value` is exclusive: token 9, decided at the plan's own value arm.
        return { refusal: secondMemberRefusal(address) }
      }
      if (
        payload.plan === 'value' &&
        payload.transparent &&
        atRootTier !== undefined &&
        Object.keys(atRootTier.literals).length > 0
      ) {
        // `R17`(c) — a transparency over a node that already carries a member would place `_value`
        // BESIDE it: the exclusivity refuses the write (token 9).
        return { refusal: secondMemberRefusal(address) }
      }
      return { plan: { entry, parent: entry.node, segment: address[0] as string, kind: kindAtRoot, payload, root: true } }
    }
    /**
     * **`DD-11` GOVERNS THIS ARM, AND THE WRITE'S LITERAL PAYLOAD DOES NOT WIDEN IT** (`§2.5` item 2's
     * own second bullet, verbatim: *"AN ABSENT INTERMEDIATE IS REFUSED, NOT MINTED (`§0A` `DD-11`): a
     * failure at `i < n` answers `'unreachable'` (step `C-ANCHOR`/`D-LINK`/`E-CHILD`) and mints
     * nothing"*). So the intermediates are minted ONLY for the payload classes whose arm says the mint
     * creates them — a CONTAINER (`C18`'s add arm: *"the mint therefore creates whatever is missing AT
     * THE ADDRESSED ADDRESS — the child node, and the `parent` anchor and link that reach it on the
     * parent node"*) and a TOMBSTONE — while a LITERAL payload at a deeper address whose immediate
     * parent does not stand refuses `'unreachable'`.
     *
     * The distinction is the contract's and it is exact: `C18`'s sentence names the member the write
     * ADDS (`link has no landingPage child`), and item 2's second bullet refuses the ADDRESS a walk
     * cannot reach. A literal at a deeper address needs its parent to stand already, because
     * `R16`(a)/`A1`/`A4` place a literal as an entry of the IMMEDIATE PARENT's own `literals` — the
     * parent is the node the mint would have to produce, and item 2's bullet is what forbids producing
     * it for a path a walk has not reached.
     */
    if (mintsSubtree) mintPath(registry, address)
    const parentWalk = walkTo(registry, address.slice(0, address.length - 1), tier, secure)
    if (parentWalk.failed || parentWalk.node === null) {
      // `R16`(a)'s own condition is FALSE for the intermediate arm (`DD-11`, token 3).
      return { refusal: unreachable(parentWalk.step, parentWalk.segment, address) }
    }
    const parent = parentWalk.node
    const segment = address[address.length - 1] as string
    if (!secure && TIER_RANK[tier] > TIER_RANK[parent.tier]) {
      // `R9`'s invariant (`§2.2` item 3) — a node may not be MORE persistent than its parent
      // instance, so a write whose tier out-ranks the parent's is REFUSED at `F-TIER` (token 11).
      return {
        refusal: storeRefusal('persistence-inversion', 'F-TIER', segment, address, 'the write’s tier out-ranks the parent instance’s tier (R9’s invariant)'),
      }
    }
    const atSegment = instancesAt(parent, segment)
    const kind = propertyKind(parent, segment)
    const standingAtTier = atSegment.find((candidate) => candidate.tier === tier)
    if (
      payload.plan === 'value' &&
      !isLiteralValue(payload.value) &&
      !payload.transparent &&
      kind === 'node-location' &&
      standingAtTier !== undefined
    ) {
      /**
       * **THE `A2` ARM WINS AT A NODE LOCATION — THE ARM ORDER, CORRECTED (`RCA-8(d)`; the ACTIVE
       * ruling of 2026-10-11, `(D2)`, and the contract's own token assignment).** `write-and-read.md`
       * §2.5 item 7's `A2` row is the arm of a **CONTAINER at a NODE LOCATION** and gives it token
       * `21` `'node-location-container'` at `step: 'M-PROP'`, with `R16`(d)'s **wrapper-node
       * guidance** in the message list — while `property-register.md`'s `P-SD-SM-6` assigns token
       * `9` `'value-not-admitted'` to exactly two drives: *"a container written to `_value`, and a
       * second member beside a `_value` literal"*. A container written at an address whose final
       * segment is **carried by an existing link** (`M-PROP` ⇒ NODE LOCATION) is a **MISPLACEMENT,
       * not an inadmissible value** (`R16`(d) verbatim) — so the NODE-LOCATION refusal is consulted
       * FIRST, whatever the node standing there carries.
       *
       * **WHAT THE EARLIER FORM DID, so the correction is auditable: it consulted
       * `secondMemberRefusal` first and answered token 9 whenever the standing instance carried the
       * reserved `_value` literal** — which is `R17`(c)'s exclusivity, an arm about the node's own
       * MEMBER SET, applied to a write whose own arm is decided at `M-PROP` **before** any member of
       * that node is consulted. `W-4a` measures the difference: a container written at
       * `['tabs','seed']` — a node location the FIRST write's own mint created — is refused token 21
       * at `M-PROP` by the corrected order, and the node at the address is **never reached**, so its
       * `_value` exclusivity is not consulted at all.
       *
       * **WHERE TOKEN 9 IS STILL DECIDED AT THIS ARM: the TRANSPARENCY's own second-member test
       * below** (a `{transparent: true}` write over a node that already carries a member — `P §12`'s
       * second carriage, `R17`(c)) **and the 1-SEGMENT arm above** (a 1-segment address is not a
       * NODE LOCATION in `R16`(d)'s sense: the register entry's own node is carried by no parent's
       * link, so the address's classification is `A2`'s condition false and the write proceeds to its
       * value arm — green `M-6`).
       */
      // `§2.5` item 7 `A2` · `R17`(a) — a CONTAINER at a NODE LOCATION is REFUSED where the write
      // would OVERWRITE an instance at its own tier: NOTHING minted, NO file written, the purge does
      // not run.  Where the write's own tier holds no instance, `C20`'s coexisting lower-tier write
      // proceeds as if empty and mints FRESH.
      return { refusal: nodeLocationRefusal(address, segment) }
    }
    if (payload.plan === 'value' && payload.transparent && kind === 'node-location') {
      const standing = standingAtTier ?? lowestOf(atSegment)
      if (standing !== undefined && Object.keys(standing.literals).length > 0) return { refusal: secondMemberRefusal(address) }
    }
    return { plan: { entry, parent, segment, kind, payload, root: false } }
  }

  /** The instance the write TARGETS: the same-tier instance where one stands, else a FRESH one. */
  function targetInstance(plan: Plan, tier: Tier): { node: InternalNode; created: boolean } {
    if (plan.root) {
      if (plan.entry.node.tier === tier) return { node: plan.entry.node, created: false }
      const standing = rootPool(plan.entry).find((candidate) => candidate.tier === tier)
      if (standing !== undefined) return { node: standing, created: false }
      return { node: emptyNode(tier), created: true }
    }
    if (plan.kind !== 'node-location') return { node: emptyNode(tier), created: true }
    const standing = instancesAt(plan.parent, plan.segment).find((candidate) => candidate.tier === tier)
    if (standing !== undefined) return { node: standing, created: false }
    return { node: emptyNode(tier), created: true }
  }

  /** The payload's own arms, applied to the instance the write targets (`§2.5` item 7). */
  function applyPayloadTo(target: InternalNode, plan: Plan, tier: Tier): void {
    if (plan.payload.plan === 'tombstone') {
      // `A7`/`A8`/`A9` — ONE node minted at the address, carrying NO literals and NO anchors.
      target.literals = {}
      target.anchors = []
      target.tombstone = true
      return
    }
    const { value, transparent } = plan.payload
    target.tombstone = false
    if (transparent) {
      // `§2.5` item 7 `A10` — ONE transparent node: a single literal at `_value`, no anchors.
      target.literals = { [RESERVED_VALUE_MEMBER]: value }
      target.anchors = []
      return
    }
    // `A5`/`A6` — the link is created/overwritten and the contents are minted as child nodes.
    mintInto(target, value, tier)
  }

  /**
   * `§2.5` item 7's arm table, applied to the tree the plan describes.  The landing arms:
   * - a CONTAINER (or a TOMBSTONE) at a PROPERTY address MINTS ONE NODE at the address
   *   (`A5`/`A6`/`A9`), reached by a `parent` anchor keyed by the final segment;
   * - a CONTAINER at a NODE LOCATION whose instance is FRESH re-mints that instance's contents;
   * - a LITERAL (or the TRANSPARENT mode) is an entry of the IMMEDIATE PARENT (`A1`/`A4`/`A10`),
   *   with NO child node minted (`A3`'s link emptied).
   */
  function applyPlan(plan: Plan, tier: Tier): InternalNode {
    const parent = plan.parent
    const segment = plan.segment
    if (plan.root) {
      if (plan.kind === 'literal-property' && plan.payload.plan === 'value' && isLiteralValue(plan.payload.value)) {
        // `A4`/`R16`(c) — the root's own literal member (the entry's name IS the final segment,
        // `C14`) is OVERWRITTEN in place: no instance moves and no property is deleted (`R17`(b)).
        plan.entry.node.literals[segment] = plan.payload.value
        return plan.entry.node
      }
      // `C14`/`C18` — a 1-segment write mints/overwrites the REGISTER ENTRY's own root instance.
      const { node: target, created } = targetInstance(plan, tier)
      if (created) {
        // `C20`/`C21` — a write whose tier differs from the standing root instance makes its own
        // instance the primary where it ranks at least as persistent, and coexists otherwise.  The
        // variants ride the ENTRY's own link list (`C14`: *"the functionality of a link, without
        // having a distinct parent"*), NEVER the node's `anchors` — those are its child members.
        const promotion = TIER_RANK[tier] > TIER_RANK[plan.entry.node.tier]
        const owner = plan.entry.node
        if (promotion) plan.entry.node = target
        plan.entry.peers.push({
          parent: promotion ? owner : target,
          links: [promotion ? owner : target],
          type: 'parent',
          key: plan.entry.name,
          order: plan.entry.peers.length,
        })
      }
      applyPayloadTo(target, plan, tier)
      return target
    }
    // `A1`/`A4`/`A3`/`A10` — a literal (or the TRANSPARENT mode) is an entry of the IMMEDIATE
    // PARENT's own `literals` table, so the member's child node is DISCARDED (`C19`'s overwrite at
    // `(address, tier)`) and NO child node is minted.  Where the final segment is ABSENT, `C18`'s add
    // arm mints the node AT THE ADDRESS instead — which is how a TOMBSTONE lands at an absent
    // property (`A9`) and how a tombstone at a LITERAL property converts it (`A8`, a minted node
    // carrying NO literals, so the payload's own arm decides for the tombstone and this arm does not).
    const literalArm = plan.payload.plan === 'value' && (isLiteralValue(plan.payload.value) || plan.payload.transparent)
    if (literalArm) {
      // `C19` — the overwrite is TOTAL AT `(address, tier)`: only the instances at the WRITE'S OWN
      // tier are discarded; an instance at another tier COEXISTS at the address (`C20`).
      parent.anchors = parent.anchors.filter(
        (anchor) => anchor.key !== segment || !anchor.links.some((child) => child.tier === tier),
      )
      parent.anchors.forEach((anchor, index) => {
        anchor.order = index
      })
      if (plan.payload.plan === 'value' && plan.payload.transparent) {
        parent.literals = { [RESERVED_VALUE_MEMBER]: plan.payload.value }
        return parent
      }
      parent.literals[segment] = plan.payload.plan === 'value' ? plan.payload.value : null
      return parent
    }
    const { node: target, created } = targetInstance(plan, tier)
    if (created) {
      // `C19`'s overwrite at `(address, tier)`: the instance the address carried at THAT tier is
      // discarded with its anchor, while an instance at another tier coexists in its own anchor.
      parent.anchors = parent.anchors.filter(
        (anchor) => anchor.key !== segment || !anchor.links.some((child) => child.tier === tier),
      )
      parent.anchors.forEach((anchor, index) => {
        anchor.order = index
      })
      // `R17`(b) — no property deletion: a replaced LITERAL is OVERWRITTEN by the anchor set.
      delete parent.literals[segment]
      parent.anchors.push({ parent, links: [target], type: 'parent', key: segment, order: parent.anchors.length })
    }
    applyPayloadTo(target, plan, tier)
    return target
  }

  /* ── the constraint phase (§2.10 items 3–11) ─────────────────────────────────── */

  /** `§2.10` item 3 — the evaluated set: every registration at a PREFIX of the write's address. */
  function evaluatedSet(
    registry: readonly RegisterEntry[],
    address: readonly string[],
    secure: boolean,
  ): { address: readonly string[]; registration: ConstraintRegistration }[] {
    const evaluated: { address: readonly string[]; registration: ConstraintRegistration }[] = []
    for (let length = 1; length <= address.length; length += 1) {
      const prefix = address.slice(0, length)
      if (length === 1) {
        const entry = findEntry(registry, prefix[0] as string)
        if (entry === undefined) continue
        for (const registration of entry.constraints) evaluated.push({ address: prefix, registration })
        continue
      }
      const walk = walkTo(registry, prefix, undefined, secure)
      if (walk.failed || walk.node === null) {
        for (const pending of pendingConstraints) {
          if (pending.address.length !== prefix.length) continue
          if (!pending.address.every((segment, index) => segment === prefix[index])) continue
          evaluated.push({ address: prefix, registration: pending.registration })
        }
        continue
      }
      for (const registration of walk.node.constraints) evaluated.push({ address: prefix, registration })
      for (const pending of pendingConstraints) {
        if (pending.address.length !== prefix.length) continue
        if (!pending.address.every((segment, index) => segment === prefix[index])) continue
        evaluated.push({ address: prefix, registration: pending.registration })
      }
    }
    return evaluated
  }

  interface PhaseOutcome {
    readonly refusal: Refusal | null
    readonly repaired: boolean
    readonly messages: StoreMessage[]
    readonly payload: PlannedPayload
  }

  /** The `future` transcription, minted into a DETACHED copy of the register (never the live tree). */
  function futureTranscription(address: string[], tier: Tier, plan: Plan, secure: boolean): StoreValue {
    const detachedRegistry: RegisterEntry[] = register.map((entry) => ({
      name: entry.name,
      node: cloneNode(entry.node),
      constraints: entry.constraints,
      peers: [],
    }))
    const detached = planWrite(detachedRegistry, [...address], tier, plan.payload, secure)
    if ('refusal' in detached) return {}
    const node = applyPlan(detached.plan, tier)
    return transcribeNode(node, undefined)
  }

  /**
   * §2.10 items 8–11 — the PASS-SEQUENCE.  A `{repair:true}` whose repair RUNS changes the
   * prospective value and RESTARTS the phase at the first registration; a registration's repair runs
   * AT MOST ONCE per write; a constraint that HELD earlier and refuses later FAILS the write.
   */
  function evaluatePhase(
    address: string[],
    tier: Tier,
    secure: boolean,
    initial: PlannedPayload,
    current: StoreObject,
    restoreTree: () => void,
  ): PhaseOutcome {
    const messages: StoreMessage[] = []
    const evaluated = evaluatedSet(register, address, secure)
    /** `§2.10` item 10 (iii) — the LAST repair the store invoked: token 20's closing sentence names
     *  *"the repair and the constraint it broke"*, so its `position` and its `pass` are read from
     *  the pass that took it. */
    const lastRepair = (): { readonly position: number; readonly pass: number } => {
      let latest: { position: number; pass: number } = { position: 0, pass: 1 }
      for (const [position, at] of repairedAt) {
        if (at >= latest.pass) latest = { position, pass: at }
      }
      return latest
    }
    const repairedOnce = new Set<number>()
    /** `§2.10` item 9 — the LAST pass in which a position's repair RAN: the store's own closing
     *  sentence for token 20 names the repair, and this is where its pass is read. */
    const repairedAt = new Map<number, number>()
    /**
     * `R15` item 3 · `§2.10` item 11 — THE ANTECEDENT'S RECORD: for every position of `S` that has
     * answered `{ok:true}`, THE PASS IN WHICH IT DID.  A `{ok:false, message}` from a position this
     * map carries (and whose recorded pass is STRICTLY EARLIER than the pass at hand) is the
     * loop-breaker of token 20, never token 12's arm — *"a registration answered `{ok:true}` in an
     * EARLIER pass of the SAME write and answers `{ok:false, message}` in a LATER pass"*.
     */
    const satisfiedAt = new Map<number, number>()
    let repaired = false
    let payload = initial
    for (let pass = 1; pass <= evaluated.length + 1; pass += 1) {
      // `§2.10` item 8 — every pass walks `S` from `r_0`, over the state the pass's payload leaves.
      restoreTree()
      const planned = planWrite(register, [...address], tier, payload, secure)
      if ('refusal' in planned) return { refusal: planned.refusal, repaired, messages, payload }
      const plan = planned.plan
      const target = applyPlan(plan, tier)
      let restart = false
      for (let position = 0; position < evaluated.length; position += 1) {
        const item = evaluated[position] as { address: readonly string[]; registration: ConstraintRegistration }
        const draft: DraftContext = { pass, position, address }
        const future = futureTranscription(address, tier, plan, secure)
        const evaluation: ConstraintEvaluation = {
          address,
          current,
          future: future as StoreObject,
          changed: { address, tier, literals: copyLiterals(target.literals) },
          notes: [],
        }
        let answer: unknown
        try {
          answer = item.registration.constraint(evaluation)
        } catch {
          harvest(messages, evaluation.notes, draft)
          return {
            refusal: storeRefusal('constraint-failed', 'H-CONSTRAINT', address[address.length - 1] ?? null, address, 'a module-supplied constraint THREW; the throw never propagates (§2.10 item 5)', messages),
            repaired,
            messages,
            payload,
          }
        }
        harvest(messages, evaluation.notes, draft)
        const answered = (answer ?? {}) as Record<string, unknown>
        if (answered['ok'] === true) {
          satisfiedAt.set(position, pass)
          continue
        }
        if (answered['ok'] === false) {
          const moduleMessage = typeof answered['message'] === 'string' ? (answered['message'] as string) : ''
          messages.push({ source: 'constraint', pass, position, step: STEP_MARK, address, text: moduleMessage })
          const heldIn = satisfiedAt.get(position)
          if (heldIn !== undefined && heldIn < pass) {
            // `R15` item 3 · `§2.10` item 11 — THE LOOP-BREAKER.  The registration answered
            // `{ok:true}` in an EARLIER pass of THIS write and refuses now, after a repair changed
            // the state: the write FAILS instead of looping, and the arm is token 20 (never token
            // 12, whose arm is a registration that was never satisfied).  The broken constraint's
            // verbatim stands IMMEDIATELY BEFORE the store's own closing sentence, which is the
            // list's LAST entry and therefore the refusal's primary sentence (`§2.14` item 5).
            const repair = lastRepair()
            return {
              refusal: storeRefusal(
                'repair-broke-constraint',
                'H-CONSTRAINT',
                address[address.length - 1] ?? null,
                address,
                `the store invoked the repair registered at position ${String(repair.position)} in pass ${String(repair.pass)}; the registration at position ${String(position)} held in pass ${String(heldIn)} and no longer holds, and the write fails rather than looping (R15 item 3)`,
                messages,
              ),
              repaired,
              messages,
              payload,
            }
          }
          return { refusal: refused('constraint-refused', 'H-CONSTRAINT', address[address.length - 1] ?? null, messages), repaired, messages, payload }
        }
        if (answered['repair'] === true) {
          const repair = item.registration.repair
          if (repair === undefined) {
            return {
              refusal: storeRefusal('constraint-failed', 'H-CONSTRAINT', address[address.length - 1] ?? null, address, 'the demanded repair is unavailable: the registration carries none (R4)', messages),
              repaired,
              messages,
              payload,
            }
          }
          if (repairedOnce.has(position)) {
            return {
              refusal: storeRefusal('constraint-failed', 'H-CONSTRAINT', address[address.length - 1] ?? null, address, 'the demanded repair has ALREADY RUN in this write; a registration’s repair runs at most once (§2.10 item 9(a))', messages),
              repaired,
              messages,
              payload,
            }
          }
          repairedOnce.add(position)
          repairedAt.set(position, pass)
          const repairEvaluation: ConstraintEvaluation = {
            address,
            current,
            future: future as StoreObject,
            changed: evaluation.changed,
            notes: [],
          }
          let repairedValue: unknown
          try {
            repairedValue = repair(repairEvaluation)
          } catch {
            harvest(messages, repairEvaluation.notes, draft)
            return {
              refusal: storeRefusal('constraint-failed', 'H-CONSTRAINT', address[address.length - 1] ?? null, address, 'a module-supplied repair THREW; the throw never propagates (§2.10 item 5)', messages),
              repaired,
              messages,
              payload,
            }
          }
          harvest(messages, repairEvaluation.notes, draft)
          if (!admitsValue(repairedValue)) {
            return {
              refusal: storeRefusal('value-not-admitted', 'G-VALUE', null, address, 'the repair’s return is outside the admission set (PAR-8)', messages),
              repaired,
              messages,
              payload,
            }
          }
          messages.push(
            storeEntry(
              STEP_MARK,
              address,
              `the store invoked the repair registered at position ${String(position)} in pass ${String(pass)}; the prospective value was replaced`,
              draft,
            ),
          )
          payload = { plan: 'value', value: repairedValue as StoreValue, transparent: false }
          repaired = true
          restart = true
          // `§2.10` item 8 — *"a NEW pass BEGINNING AT `r_0`"*: the pass is marked for RESTART, and
          // after its remaining registrations are walked the phase begins again at the first
          // registration of `S`, so every registration (the already-satisfied included) is
          // RE-EVALUATED against the repaired state while `item 9`'s bound keeps the pass count at
          // `≤ |S| + 1`.
          continue
        }
        return {
          refusal: storeRefusal('constraint-failed', 'H-CONSTRAINT', address[address.length - 1] ?? null, address, 'the constraint answered outside C13’s three arms (§2.10 item 5)', messages),
          repaired,
          messages,
          payload,
        }
      }
      if (!restart) return { refusal: null, repaired, messages, payload }
      // A pass that repaired and RESTARTED: the next pass begins at `r_0` and re-evaluates the WHOLE
      // set against the repaired state (`§2.10` item 8), where every position this write has already
      // satisfied is re-checked against the state the repair left (`item 11`'s antecedent).
    }
    return { refusal: null, repaired, messages, payload }
  }

  /* ── the commit (§2.7) ───────────────────────────────────────────────────────── */

  function condensation(): string {
    const out: Record<string, StoreValue> = {}
    for (const entry of register) {
      const condensed = condenseFileNode(entry.node)
      if (condensed === undefined) continue
      out[entry.name] = condensed
    }
    return JSON.stringify(out)
  }

  /** `§2.7` item 4 — an ATOMIC REPLACE: a replacement beside the path, renamed onto it. */
  function commit(path: string): Refusal | null {
    const temporary = `${path}.store-tmp`
    const separator = path.lastIndexOf('/')
    const directory = separator > 0 ? path.slice(0, separator) : ''
    try {
      if (directory !== '' && !fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })
      fs.writeFileSync(temporary, condensation())
      const handle = fs.openSync(temporary, 'r+')
      fs.fsyncSync(handle)
      fs.closeSync(handle)
      fs.renameSync(temporary, path)
    } catch {
      try {
        fs.rmSync(temporary, { force: true })
      } catch {
        /* the double's own failure is the double's (PAR-11), never a store throw */
      }
      return storeRefusal('save-failed', 'I-SAVE', null, [], 'the file could not be committed to exactly match the state (C7/R3/R8)')
    }
    return null
  }

  /* ── the purge (§2.5 item 4 · `C19`/`R7`) ───────────────────────────────────── */

  /** The purge's EXACT set: the instances at the address STRICTLY LOWER-persistence than the write. */
  function purgeAt(address: readonly string[], tier: Tier, secure: boolean): Tier[] {
    if (secure) return []
    const lower = RANKED_TIERS.slice(RANKED_TIERS.indexOf(tier) + 1)
    if (address.length === 1) {
      const entry = findEntry(register, address[0] as string)
      if (entry === undefined) return []
      const purged: Tier[] = []
      const kept: InternalNode[] = [entry.node]
      for (const anchor of entry.peers) {
        for (const child of anchor.links) {
          if (!lower.includes(child.tier)) kept.push(child)
          else if (!purged.includes(child.tier)) purged.push(child.tier)
        }
      }
      if (kept.length > 0) {
        // One instance stands as the entry's own child; the rest ride the entry's own link list
        // (`C14`: *"the functionality of a link, without having a distinct parent"*).
        const primary = [...kept].sort((a, b) => TIER_RANK[b.tier] - TIER_RANK[a.tier])[0] as InternalNode
        entry.node = primary
        entry.peers = kept
          .filter((candidate) => candidate !== primary)
          .map((candidate, index) => ({
            parent: primary,
            links: [candidate],
            type: 'parent' as const,
            key: entry.name,
            order: index,
          }))
      }
      return purged
    }
    const parentWalk = walkTo(register, address.slice(0, address.length - 1), undefined, secure)
    if (parentWalk.failed || parentWalk.node === null) return []
    const purged: Tier[] = []
    for (const anchor of anchorsAt(parentWalk.node, address[address.length - 1] as string)) {
      anchor.links = anchor.links.filter((child) => {
        if (!lower.includes(child.tier)) return true
        if (!purged.includes(child.tier)) purged.push(child.tier)
        return false
      })
    }
    return purged
  }

  /* ── the write (§2.5 item 1's nine steps) ───────────────────────────────────── */

  function runWrite(address: unknown, tier: unknown, payload: unknown, secure: boolean): WriteRecord {
    const bad = addressRefusal(address)
    if (bad !== null) return bad
    const target = address as string[]
    if (!secure) {
      const tierError = tierRefusal(tier, target, true)
      if (tierError !== null) return tierError
    }
    const planTier: Tier = secure ? 'file' : (tier as Tier)
    if (!secure && planTier === 'file' && !fileLoaded) return notLoaded(target)
    /**
     * `§2.5` item 1's discard rule — on any failure the pre-call state stands byte-identical.  The
     * snapshot is the register's SHAPE plus a deep clone of every root node, so the restore is total
     * over a write that added an entry, minted a path or repaired its own prospective value.
     */
    const snapshot: RegisterEntry[] = register.map((entry) => ({
      name: entry.name,
      node: cloneNode(entry.node),
      constraints: entry.constraints,
      peers: entry.peers,
    }))
    const restore = (): void => {
      register.splice(0, register.length)
      for (const entry of snapshot) {
        register.push({ name: entry.name, node: cloneNode(entry.node), constraints: entry.constraints, peers: entry.peers })
      }
    }
    try {
      // ── steps (1)–(4): the address, the tier and the payload ──
      const admitted = planPayload(target, payload)
      if ('refusal' in admitted) return admitted.refusal
      const planned = planWrite(register, target, planTier, admitted.payload, secure)
      if ('refusal' in planned) return planned.refusal
      // The pre-call `current` transcription (`§2.10` item 4 · `DD-1`), taken BEFORE the install.
      const current = transcribeNode(planned.plan.entry.node, undefined) as StoreObject
      // ── step (5): the constraint phase, over the prospective state ──
      const phase = evaluatePhase(target, planTier, secure, admitted.payload, current, restore)
      if (phase.refusal !== null) {
        restore()
        return phase.refusal
      }
      // ── step (6)/(7): the file/secure commit (`C7`/`R3`/`R8`) ──
      if (planTier === 'file' || secure) {
        const failure = commit(secure ? securePath : filePath)
        if (failure !== null) {
          // `R3`/`§2.7` item 5 — the operation does not land: the pre-call state and the pre-call
          // file bytes stand, and the state a read then answers is the state that was SAVED.
          restore()
          return failure
        }
      }
      // ── step (8): the purge, then the fan-out (`C19` · §2.11 item 5) ──
      const purged = purgeAt(target, planTier, secure)
      evaluateAttachment()
      const listenerErrors = fireListeners(target)
      return {
        status: 'committed',
        address: target,
        tier: planTier,
        tombstoned: phase.payload.plan === 'tombstone',
        repaired: phase.repaired,
        purged,
        listenerErrors,
        messages: phase.messages,
      }
    } catch {
      restore()
      return storeRefusal('save-failed', 'I-SAVE', null, target, 'the operation could not be completed; nothing landed (§2.1 item 4)')
    }
  }

  /* ── the event surface (§2.11) ─────────────────────────────────────────────── */

  /**
   * `§2.3` item 2's INTERMEDIATE walk — the path to the IMMEDIATE PARENT `P` of an address.
   * `walkTo` consumes EVERY segment, so it fails on a final segment that is a `literals` key (the
   * `C-ANCHOR` arm's own member test); `P` is reached by the FIRST `n − 1` segments only, which is
   * exactly `§2.3` item 2's `i < n` rule (`M-PROP` then decides the final segment).  An arm that
   * fails — an absent anchor, a tombstone, or a literal standing where a node must be — answers
   * `null`.
   */
  function parentTo(entry: RegisterEntry, address: readonly string[]): InternalNode | null {
    let current = entry.node
    for (let index = 1; index <= address.length - 2; index += 1) {
      const segment = address[index] as string
      if (Object.prototype.hasOwnProperty.call(current.literals, segment)) return null
      const selected = selectInstance(instancesAt(current, segment), undefined)
      if (selected === undefined || selected.tombstone) return null
      current = selected
    }
    return current
  }

  /**
   * `C23` · `§2.11` item 2 — *"`attached` is TRUE iff an unqualified read at that address would
   * answer a transcription"*, and `item 3` names the target: *"the node an UNQUALIFIED read at the
   * address would select"*.  So the test is the READ's own resolution and NOT the full walk: `P` is
   * reached through the INTERMEDIATE segments and the FINAL segment then resolves iff `M-PROP`
   * finds something at it — a `parent` anchor carrying a non-tombstone instance (a NODE LOCATION),
   * or a `literals` member (a LITERAL PROPERTY, `A-9`'s own arm).  An ABSENT property (nor a
   * tombstone-suppressed address, nor an unresolvable `P`) does NOT attach: an unqualified read
   * answers `'absent-address'` there and there is no node to be the target.
   */
  function resolves(address: readonly string[], secure: boolean): boolean {
    void secure
    const entry = findEntry(register, address[0] as string)
    if (entry === undefined) return false
    if (address.length === 1) return !unmintedRoots.has(entry.name) && !entry.node.tombstone
    const parent = parentTo(entry, address)
    if (parent === null) return false
    const segment = address[address.length - 1] as string
    if (Object.prototype.hasOwnProperty.call(parent.literals, segment)) return true
    const chosen = selectInstance(instancesAt(parent, segment), undefined)
    return chosen !== undefined && !chosen.tombstone
  }

  function evaluateAttachment(): void {
    for (const listener of listeners) {
      if (!listener.attached) listener.attached = resolves(listener.address, false)
    }
    for (const listener of listeners) {
      if (listener.attached && !resolves(listener.address, false)) listener.attached = false
    }
  }

  /** §2.11 item 5 — `A` itself, a strict DESCENDANT of `A`, a strict ANCESTOR of `A`. */
  function inFireSet(listener: readonly string[], written: readonly string[]): boolean {
    const shorter = Math.min(listener.length, written.length)
    for (let index = 0; index < shorter; index += 1) {
      if (listener[index] !== written[index]) return false
    }
    return true
  }

  function fireListeners(written: readonly string[] | null): ListenerError[] {
    const errors: ListenerError[] = []
    listeners.forEach((listener, index) => {
      if (!listener.attached) return
      if (written !== null && !inFireSet(listener.address, written)) return
      try {
        listener.body()
      } catch (error) {
        errors.push({ listener: index, error })
      }
    })
    return errors
  }

  /* ── the boot (§2.12 · C24) ────────────────────────────────────────────────── */

  function runLoad(secure: boolean): LoadRecord {
    const path = secure ? securePath : filePath
    if (!secure) fileLoaded = true
    else secureLoaded = true
    let text: string
    try {
      if (!fs.existsSync(path)) {
        // A MISSING file is NOT a failure (`§2.12` item 4); NOTHING resolves, so NOTHING fires.
        return { status: 'loaded', present: false, roots: 0 }
      }
      text = fs.readFileSync(path, 'utf8')
    } catch {
      if (!secure) fileLoaded = false
      else secureLoaded = false
      return storeRefusal('load-failed', 'J-LOAD', null, [], 'the file is present but unreadable (C24 · §2.12 item 4)')
    }
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      if (!secure) fileLoaded = false
      else secureLoaded = false
      return storeRefusal('load-failed', 'J-LOAD', null, [], 'the file is present but unparsable (C24 · §2.12 item 4)')
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      if (!secure) fileLoaded = false
      else secureLoaded = false
      return storeRefusal('load-failed', 'J-LOAD', null, [], 'the file does not carry a condensation of the register (C7)')
    }
    const names = Object.keys(parsed as Record<string, unknown>)
    const decoded: { name: string; node: InternalNode }[] = []
    for (const name of names) {
      const raw = (parsed as Record<string, StoreValue>)[name] as StoreValue
      if (raw === null || typeof raw !== 'object') {
        if (!secure) fileLoaded = false
        else secureLoaded = false
        return storeRefusal('load-failed', 'J-LOAD', null, [], 'a file member is not a tree condensation (C7)')
      }
      // `DD-13`'s three arms — the condensation is decoded, never handed to the caller-facing mint.
      const node = emptyNode('file')
      if (!mintsFileState(node, raw, 'file')) {
        if (!secure) fileLoaded = false
        else secureLoaded = false
        return storeRefusal('load-failed', 'J-LOAD', null, [], 'a file member is not a tree condensation (C7)')
      }
      decoded.push({ name, node })
    }
    // `§2.12` item 1 — the whole mint runs FIRST; the fan-out is strictly after it (`C24`).
    for (const { name, node } of decoded) {
      const existing = findEntry(register, name)
      if (existing === undefined) register.push({ name, node, constraints: [], peers: [] })
      else existing.node = node
      // `C24` · `§2.12` item 1 — the load is the OTHER event that mints data, so a root a
      // registration held as a placeholder is no longer one: *"event listeners are added before the
      // store is loaded from file.  This lets them trigger when the data is fully loaded."*
      unmintedRoots.delete(name)
    }
    evaluateAttachment()
    fireListeners(null)
    return { status: 'loaded', present: true, roots: secure ? 0 : names.length }
  }

  /* ── the seams (§2.10 items 1–2 · §2.11 item 2) ────────────────────────────── */

  function runListen(address: unknown, body: unknown): ListenerRecord {
    const bad = addressRefusal(address)
    if (bad !== null) return bad
    const target = address as string[]
    if (typeof body !== 'function') {
      return storeRefusal('malformed-listener', 'L-REGISTRATION', null, target, '`body` is not a function; nothing is registered (PAR-6)')
    }
    // `B-ROOT` — the root is brought into being here where the store does not yet carry it: the
    // address's OWN root is a placeholder for the data a later write or `load()` mints (`C24`'s boot
    // order registers its listeners before the load), and the listener's TARGET need not resolve
    // (`C23`'s unattached state).
    if (findEntry(register, target[0] as string) === undefined) {
      register.push({ name: target[0] as string, node: emptyNode('mem'), constraints: [], peers: [] })
      unmintedRoots.add(target[0] as string)
    }
    const listener: InternalListener = { address: target, body: body as ListenerBody, attached: false }
    listeners.push(listener)
    listener.attached = resolves(target, false)
    return { address: target, attached: listener.attached }
  }

  function runConstrain(address: unknown, registration: unknown): ConstraintRecord {
    const bad = addressRefusal(address)
    if (bad !== null) return bad
    const target = address as string[]
    const asRegistration = (registration ?? {}) as Record<string, unknown>
    const constraint = asRegistration['constraint']
    const repair = asRegistration['repair']
    if (typeof constraint !== 'function' || (repair !== undefined && typeof repair !== 'function')) {
      return storeRefusal('malformed-constraint', 'L-REGISTRATION', null, target, 'the registration’s `constraint` — or a present `repair` — is not a function (PAR-7/PAR-8)')
    }
    // The carrier: the LINK at the address, or the REGISTER ENTRY at a 1-segment address (`C14`).
    // `B-ROOT` — an absent root is brought into being by the registration itself (the seam attaches to
    // the carrier, `§2.10` item 2).
    if (findEntry(register, target[0] as string) === undefined) {
      register.push({ name: target[0] as string, node: emptyNode('mem'), constraints: [], peers: [] })
      unmintedRoots.add(target[0] as string)
    }
    // `§2.10` item 2 — the seam attaches to the CARRIER at the address: the register entry at a
    // 1-segment address, else the LINK's own registration list.  A registration MINTS NO PATH (the
    // carrier must resolve, `C13`), so a registration at a deeper address is answered `'unknown-root'`
    // where the address does not resolve.
    const walk = walkTo(register, target, undefined, false)
    if (walk.failed || walk.node === null) {
      // The carrier does not stand yet: the registration is held against its OWN address until a
      // write at that address materializes the link it attaches to (`§2.10` item 2's carrier).
      const pending: { constraint: ConstraintFn; repair?: RepairFn } = { constraint: constraint as ConstraintFn }
      if (repair !== undefined) pending.repair = repair as RepairFn
      const at = pendingConstraints.findIndex(
        (candidate) =>
          candidate.address.length === target.length &&
          candidate.address.every((segment, index) => segment === target[index]) &&
          candidate.registration.constraint === constraint,
      )
      if (at >= 0) {
        pendingConstraints[at] = { address: [...target], registration: pending }
        return { address: target, position: at }
      }
      pendingConstraints.push({ address: [...target], registration: pending })
      return { address: target, position: pendingConstraints.length - 1 }
    }
    const owner: ConstraintRegistration[] = target.length === 1 ? (walk.entry as RegisterEntry).constraints : walk.node.constraints
    const created: { constraint: ConstraintFn; repair?: RepairFn } = { constraint: constraint as ConstraintFn }
    if (repair !== undefined) created.repair = repair as RepairFn
    const existing = owner.findIndex((candidate) => candidate.constraint === constraint)
    if (existing >= 0) {
      owner[existing] = created
      return { address: target, position: existing }
    }
    owner.push(created)
    return { address: target, position: owner.length - 1 }
  }

  /* ── the gate (§2.9 item 4 · `DD-9`) ───────────────────────────────────────── */

  function gated<T>(address: readonly string[], answer: () => T): T | Refusal {
    let blocked = false
    try {
      blocked = options.secureAccess !== undefined && (options.secureAccess as () => unknown)() === true
    } catch {
      blocked = false
    }
    if (!blocked) {
      return storeRefusal('secure-gated', 'K-GATE', null, address, 'the secure graph cannot be accessed: the MCP server is not blocked (C6 · fail-closed)')
    }
    return answer()
  }

  /* ── THE DECLARED SURFACE (§2.1: a MEMBER TABLE OF FUNCTIONS and nothing else) ── */

  if ((globalThis as { __STORE_DEBUG__?: boolean }).__STORE_DEBUG__ === true) {
    return {
      __peek: (): unknown => register.map((e) => ({ name: e.name, tier: e.node.tier, literals: e.node.literals, anchors: e.node.anchors.map((a) => ({ key: a.key, order: a.order, links: a.links.length, childLits: a.links.map((l) => l.literals) })), peers: e.peers.map((a) => ({ key: a.key, links: a.links.map((l) => l.literals) })) })),
      read: (address: Address, tier?: Tier): ReadAnswer => runRead(address, tier, false),
      write: (address: Address, tier: Tier, payload: WritePayload): WriteRecord => runWrite(address, tier, payload, false),
      listen: (address: Address, body: ListenerBody): ListenerRecord => runListen(address, body),
      constrain: (address: Address, registration: ConstraintRegistration): ConstraintRecord => runConstrain(address, registration),
      load: (): LoadRecord => runLoad(false),
      secureLoad: (): LoadRecord => gated([], () => runLoad(true)),
      secureRead: (address: Address): ReadAnswer => gated(address as string[], () => runRead(address, undefined, true)),
      secureWrite: (address: Address, payload: WritePayload): WriteRecord => gated(address as string[], () => runWrite(address, 'file', payload, true)),
      secureListen: (address: Address, body: ListenerBody): ListenerRecord => gated(address as string[], () => runListen(address, body)),
      secureConstrain: (address: Address, registration: ConstraintRegistration): ConstraintRecord =>
        gated(address as string[], () => runConstrain(address, registration)),
    } as unknown as Store
  }

  return {
    read: (address: Address, tier?: Tier): ReadAnswer => runRead(address, tier, false),
    write: (address: Address, tier: Tier, payload: WritePayload): WriteRecord => runWrite(address, tier, payload, false),
    listen: (address: Address, body: ListenerBody): ListenerRecord => runListen(address, body),
    constrain: (address: Address, registration: ConstraintRegistration): ConstraintRecord => runConstrain(address, registration),
    load: (): LoadRecord => runLoad(false),
    secureLoad: (): LoadRecord => gated([], () => runLoad(true)),
    secureRead: (address: Address): ReadAnswer => gated(address as string[], () => runRead(address, undefined, true)),
    secureWrite: (address: Address, payload: WritePayload): WriteRecord => gated(address as string[], () => runWrite(address, 'file', payload, true)),
    secureListen: (address: Address, body: ListenerBody): ListenerRecord => gated(address as string[], () => runListen(address, body)),
    secureConstrain: (address: Address, registration: ConstraintRegistration): ConstraintRecord =>
      gated(address as string[], () => runConstrain(address, registration)),
  }
}

/* ─────────── the contract's own closed sets, exported so no reader re-counts them ─────────── */

/** §2.4 item 2 — the `6` admitted classes. */
export const ADMITTED = ADMITTED_CLASSES
/** §2.4 item 2 — the `16` refused classes. */
export const REFUSED = REFUSED_CLASSES
/** §2.13 item 4 (ii) — the two arms that drop a `temp` instance. */
export const TEMP_DROP = TEMP_DROP_ARMS
/** `R16`(e) · `R17`(c) — the reserved member constant. */
export const RESERVED_MEMBER = RESERVED_VALUE_MEMBER
/** §2.5 item 7 — the write-arm table's `10` ids, terms `10 = 3 + 2 + 2 + 3`. */
export const WRITE_ARMS = WRITE_ARM_IDS
/** §2.8 item 7 — the read-arm table's `4` ids, terms `4 = 1 + 1 + 1 + 1`. */
export const READ_ARMS = READ_ARM_IDS
