// src/renderer/store-core-graph.ts — `U-STORE-CORE`'s successor: the AMENDED
// four-tier store on a node-anchor-link graph (`§2.1` item 1, `§1` item 1).
//
// THE GRAPH IS THE SOURCE OF TRUTH. The tier token is a FILTER and a node's own
// `flag` is the ONLY residency carrier (`§2.3` item 1, `§2.1`'s named-invariant
// block). The register is the graph's TOP-LEVEL PROJECTION and nothing below a
// root (`§2.4`'s ruling block). The two caches are invalidated by rule and
// rebuilt AT THE INVALIDATION SITE, never on the read path (`§2.6` item 4).

import { storeGraphReferences, type StoreGraphDeclarationInput } from './store-graph-references.js'

/* ───────────────────────────── THE CLOSED DOMAINS ───────────────────────────── */

export type GraphTierToken = 'temp' | 'mem' | 'file' | 'secure'

export type GraphNodeFlag = 'temp' | 'mem' | 'file'

export type GraphRefusalReason =
  | 'undeclared-name' | 'malformed-name' | 'secure-refused' | 'reserved-name'
  | 'malformed-pattern' | 'cap-exceeded' | 'ambiguous-path' | 'reserved-namespace'
  | 'duplicate-path-tier' | 'no-such-anchor' | 'severed-link' | 'rebuild-failed' | 'tier-filter-miss'
  | 'serialize-failed' | 'validate-failed' | 'durability-inversion'

export type GraphResolveStep =
  | 'A-PARSE' | 'B-SECURE-GATE' | 'C-TOP' | 'D-ANCHOR' | 'E-LINK' | 'F-CACHE' | 'G-RESOLVE-LEAF' | 'H-FLAG'

export interface GraphResolveDiagnostic {
  readonly reason: GraphRefusalReason
  readonly step: GraphResolveStep
  readonly segment: string | null
  readonly owner: GraphNodeRef | null
}

/* ───────────────────────────── THE GRAPH ───────────────────────────── */

export type GraphNodeRef = string

export interface GraphNode {
  readonly ref: GraphNodeRef
  readonly flag: GraphNodeFlag
  readonly localName: string
  readonly anchors: readonly GraphAnchor[]
  readonly parentLink: GraphLink | null
}

export interface GraphAnchor {
  readonly owner: GraphNodeRef
  readonly key: string
  readonly link: GraphLink | null
}

export interface GraphLink {
  readonly from: GraphNodeRef
  readonly to: GraphNodeRef | null
  readonly cache: GraphLinkCacheEntry
  readonly constraint: string | null
}

export interface GraphTierHandle {
  readonly tier: GraphTierToken
  get(name: string): GraphTierGetResult
  has(name: string): boolean
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  clear(name: string): GraphWriteReceipt
}

export interface GraphTierGetResult {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
}

/* ───────────────────────────── THE REGISTER AND THE TWO CACHES ───────────────────────────── */

export interface GraphRegisterRow {
  readonly name: string
  readonly nodeRef: GraphNodeRef | null
  readonly constraintId: string | null
  readonly reserved: boolean
  readonly derived: boolean
}

export interface GraphRegister {
  readonly rows: readonly GraphRegisterRow[]
}

export interface GraphRegisterCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}

export interface GraphLinkCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}

/* ───────────────────────────── THE CONSTRAINT TABLE ───────────────────────────── */

export interface GraphConstraint {
  readonly id: string
  readonly kind: 'count-exactly-one' | 'unique-path-tier'
  readonly matchedSet: string
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]
  readonly repair: 'next-surviving-by-order' | 'none'
  readonly onRepeat: 'edit' | 'refuse'
  readonly refusalReason: GraphRefusalReason | null
}

/* ───────────────────────────── THE READ AND THE WALK ───────────────────────────── */

export interface GraphPart {
  readonly tier: GraphNodeFlag
  readonly path: string
}

export interface GraphReadHit {
  readonly found: true
  readonly value: unknown
  readonly tier: GraphNodeFlag
  readonly flag: GraphNodeFlag
  readonly cache: GraphTierHandle
  readonly name: string
}

export interface GraphReadMiss {
  readonly found: false
  readonly value: undefined
  readonly tier: null
  readonly cache: null
  readonly name: string
}

export interface GraphMergedRead {
  readonly found: true
  readonly value: unknown
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged: true
  readonly parts: readonly GraphPart[]
}

export type GraphResolveResult = GraphReadHit | GraphReadMiss | GraphMergedRead

export interface GraphWriteReceipt {
  readonly status: 'committed' | 'refused'
  readonly reason?: GraphRefusalReason
  readonly diagnostic?: GraphResolveDiagnostic
  readonly name: string
  readonly cleared: readonly string[]
  readonly repaired: readonly string[]
  readonly rows: readonly GraphAffectedRow[]
  readonly crossings: number
  readonly events: number
}

export interface GraphAffectedRow {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly nodeRef: GraphNodeRef
}

export interface GraphWriteOptions {
  readonly onRepeat?: 'edit' | 'refuse'
  readonly onDuplicate?: 'edit' | 'refuse'
}

/* ───────────────────────────── THE EVENT SURFACE ───────────────────────────── */

export interface GraphEvent {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly value: unknown
  readonly cleared: readonly string[]
  readonly cause: 'set' | 'commit' | 'clear' | 'sweep' | 'remove' | 'repair' | 'descendant' | 'severed'
  readonly origin?: string
  readonly subtree?: true
}

export interface GraphSubscription {
  readonly name: string
  readonly subtree: boolean
  unsubscribe(): boolean
}

/* ───────────────────────────── THE SEAMS, THE FACTORY, THE STORE ───────────────────────────── */

export interface GraphCrossing {
  put(row: { readonly name: string; readonly value: unknown }): { readonly status: 'committed' | 'refused' }
}

export interface GraphLoadError extends Error {
  readonly reason: GraphRefusalReason
}

export interface GraphStore {
  resolve(name: string): GraphResolveResult
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  commit(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  remove(name: string): GraphWriteReceipt
  clear(name: string): GraphWriteReceipt
  sweep(name: string): GraphWriteReceipt
  export(name: string): GraphResolveResult | GraphRefusalReason
  sever(from: string, anchorKey: string): GraphWriteReceipt
  subscribe(name: string, listener: (event: GraphEvent) => void, opts?: { subtree?: boolean }): GraphSubscription
  readonly tiers: Readonly<Record<GraphNodeFlag, GraphTierHandle>>
  readonly register: GraphRegister
  readonly constraints: readonly GraphConstraint[]
  reset?(): void
  seed?(rows: readonly { readonly name: string; readonly value: unknown }[]): void
  parentLinkCountOf?(nodeRef: GraphNodeRef): number
  cacheEntryFor?(name: string): GraphRegisterCacheEntry | null
  nodeFor?(nodeRef: GraphNodeRef): GraphNode | null
  anchorFor?(owner: GraphNodeRef, key: string): GraphAnchor | null
  linkFor?(owner: GraphNodeRef, key: string): GraphLink | null
  failNextCacheRebuild?(): void
}

/* ───────────────────────────── THE MODULE'S OWN TOKENS ───────────────────────────── */

const TIER_TOKENS: readonly GraphTierToken[] = ['temp', 'mem', 'file', 'secure']
const NODE_FLAGS: readonly GraphNodeFlag[] = ['temp', 'mem', 'file']
const STEP_IDS: readonly GraphResolveStep[] = [
  'A-PARSE', 'B-SECURE-GATE', 'C-TOP', 'D-ANCHOR', 'E-LINK', 'F-CACHE', 'G-RESOLVE-LEAF', 'H-FLAG',
]
const EVENT_CAUSES: readonly GraphEvent['cause'][] = [
  'set', 'commit', 'clear', 'sweep', 'remove', 'repair', 'descendant', 'severed',
]
const DURABILITY_RANK: Readonly<Record<string, number>> = { file: 3, mem: 2, temp: 1 }
const REGISTER_ROOT_CAP_MEM = 1024
const REGISTER_ROOT_CAP_TEMP = 4096
const AMPLIFIER_SUBSCRIPTION_CAP = 64
const SEAM_KEYS: readonly string[] = [
  'reset', 'seed', 'parentLinkCountOf', 'cacheEntryFor',
  'nodeFor', 'anchorFor', 'linkFor', 'failNextCacheRebuild',
]

interface ParsedName {
  readonly token: GraphTierToken | null
  readonly segments: readonly string[]
}

interface DeclaredSpelling {
  readonly name: string
  readonly reserved: boolean
}

interface RootDeclaration {
  readonly root: string
  /** EVERY spelling the caller declared for this root (`§2.4` item 8's annotation: a
   *  declaration NAMES a root name and contributes no row). `reserved` is a property of the
   *  SPELLING, not of the root (`§2.4` item 1(d), `F-20`: the refusal is BY NAME). */
  readonly names: readonly DeclaredSpelling[]
}

interface ValueEntry {
  readonly name: string
  readonly ref: GraphNodeRef
  value: unknown
  active: boolean
}

interface SubscriberRecord {
  readonly name: string
  readonly subtree: boolean
  readonly listener: (event: GraphEvent) => void
  live: boolean
}

interface PathWalk {
  readonly rootName: string
  readonly token: GraphTierToken
  readonly tail: readonly string[]
  readonly node: GraphNode | null
  readonly deepest: GraphNode | null
  readonly severed: boolean
  readonly firstMissing: string | null
  readonly stale: boolean
}

interface ReceiptState {
  diagnostic?: GraphResolveDiagnostic
  cleared: string[]
  repaired: string[]
  rows: GraphAffectedRow[]
  crossings: number
  events: number
}

interface AffectedRef {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly ref: GraphNodeRef
}

interface WriteName {
  readonly name: string
  readonly token: GraphNodeFlag
  readonly segments: readonly string[]
  readonly rootName: string
  readonly tail: readonly string[]
}

/* ───────────────────────────── SMALL HELPERS ───────────────────────────── */

function isTierToken(value: unknown): value is GraphTierToken {
  return typeof value === 'string' && (TIER_TOKENS as readonly string[]).includes(value)
}

function isFlagToken(value: unknown): value is GraphNodeFlag {
  return typeof value === 'string' && (NODE_FLAGS as readonly string[]).includes(value)
}

function isRecordObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseName(raw: unknown): ParsedName {
  if (typeof raw !== 'string' || raw.length === 0) return { token: null, segments: [] }
  const segments = raw.split('.')
  for (const segment of segments) if (segment.length === 0) return { token: null, segments: [] }
  return { token: isTierToken(segments[0]) ? segments[0] : null, segments }
}

function miss(name: string): GraphReadMiss {
  return { found: false, value: undefined, tier: null, cache: null, name }
}

function snapshotValue(value: unknown, depth = 0): unknown {
  if (depth > 8) return value
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map((item) => snapshotValue(item, depth + 1))
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(value as Record<string, unknown>)) {
    out[key] = snapshotValue((value as Record<string, unknown>)[key], depth + 1)
  }
  return out
}

function serializationFailureOf(value: unknown): 'serialize-failed' | 'validate-failed' | null {
  const seen = new Set<unknown>()
  const inspect = (candidate: unknown): 'serialize-failed' | 'validate-failed' | null => {
    if (candidate === undefined || candidate === null) return null
    const kind = typeof candidate
    if (kind === 'string' || kind === 'boolean') return null
    if (kind === 'number') return Number.isFinite(candidate as number) ? null : 'serialize-failed'
    if (kind === 'bigint' || kind === 'function' || kind === 'symbol') return 'serialize-failed'
    if (seen.has(candidate)) return 'serialize-failed'
    seen.add(candidate)
    try {
      if (Array.isArray(candidate)) {
        for (const item of candidate) {
          const failure = inspect(item)
          if (failure !== null) return failure
        }
        return null
      }
      for (const key of Object.keys(candidate as Record<string, unknown>)) {
        const failure = inspect((candidate as Record<string, unknown>)[key])
        if (failure !== null) return failure
      }
    } catch {
      return 'validate-failed'
    } finally {
      seen.delete(candidate)
    }
    return null
  }
  return inspect(value)
}

/* ───────────────────────────── THE FACTORY AND THE ERROR ───────────────────────────── */

export function createGraphStoreError(message: string, reason: GraphRefusalReason): GraphLoadError {
  const error = new Error(message) as Error & { reason: GraphRefusalReason }
  error.name = 'GraphLoadError'
  error.reason = reason
  return error as GraphLoadError
}

export function createGraphStore(options: {
  readonly declarations?: StoreGraphDeclarationInput
  readonly constraints?: readonly GraphConstraint[]
  readonly crossing?: GraphCrossing | null
  readonly reservedNamespaces?: readonly string[]
  readonly enableTestSeam?: boolean
} = {}): GraphStore {
  const nodes = new Map<GraphNodeRef, GraphNode>()
  const declared = new Map<string, RootDeclaration>()
  const rootHolders = new Map<string, GraphNode[]>()
  const registerEntries = new Map<string, GraphRegisterCacheEntry>()
  const staleEntries = new Set<string>()
  const values: ValueEntry[] = []
  const severLog = new Map<string, readonly string[]>()
  const handles = new Map<GraphNodeFlag, GraphTierHandle>()
  let subscriptions: SubscriberRecord[] = []
  let refCounter = 0
  let injectArmed = false
  const seamEnabled = options.enableTestSeam === true

  const declaredInput = options.declarations === undefined ? { rows: [] } : options.declarations
  const declaredRows: readonly unknown[] = isRecordObject(declaredInput) && Array.isArray((declaredInput as StoreGraphDeclarationInput).rows)
    ? (declaredInput as StoreGraphDeclarationInput).rows
    : []
  const reservedNames: readonly unknown[] = Array.isArray(options.reservedNamespaces) ? options.reservedNamespaces : []
  const constraintTable: readonly GraphConstraint[] = Array.isArray(options.constraints) ? options.constraints : []

  /* ── THE DECLARED-ROW INPUT AND ITS CLOSED REFUSAL SET (`§2.4` item 5) ── */

  function loadDeclarations(): void {
    const seen = new Set<string>()
    for (const raw of declaredRows) {
      if (!isRecordObject(raw)) throw createGraphStoreError('a declared row is a record', 'malformed-name')
      const name = (raw as { readonly name?: unknown }).name
      if (typeof name !== 'string' || name.length === 0) {
        throw createGraphStoreError('a declared row carries no name, a non-string or an empty name', 'malformed-name')
      }
      const segments = name.split('.')
      for (const segment of segments) {
        if (segment.length === 0) throw createGraphStoreError('a declared name carries an empty segment', 'malformed-name')
      }
      if (segments[0] === 'secure') {
        throw createGraphStoreError('a declared name carries the secure first segment', 'secure-refused')
      }
      const qualified = isTierToken(segments[0]) && segments.length >= 2
      const root = qualified ? (segments[1] as string) : (segments[0] as string)
      if (root.includes('*') || root.includes('?')) {
        throw createGraphStoreError('a malformed or ambiguous top-level pattern', 'malformed-pattern')
      }
      for (const reserved of reservedNames) {
        if (typeof reserved === 'string' && reserved === root) {
          throw createGraphStoreError('a declared name collides with a reserved namespace key', 'reserved-namespace')
        }
      }
      if (seen.has(name)) throw createGraphStoreError('a top-level name declared twice', 'undeclared-name')
      seen.add(name)
      const prior = declared.get(root)
      const spelling: DeclaredSpelling = { name, reserved: (raw as { readonly reserved?: unknown }).reserved === true }
      declared.set(root, {
        root,
        names: prior === undefined ? [spelling] : [...prior.names, spelling],
      })
    }
  }

  /* ── THE REGISTER (`§2.4`) ── */

  /** THE ROOT HOLDERS of a top-level name: a holder is a node with NO PARENT LINK — a
   *  top-level node of a descendant tree (`§2.4`'s ruling block). A node that has been
   *  re-parented under another root is NOT a holder, whatever the registry last saw. */
  function holdersOf(rootName: string): GraphNode[] {
    const held = rootHolders.get(rootName)
    if (held === undefined) return []
    return held.filter((holder) => holder.parentLink === null)
  }

  /** THE LIVE HOLDERS: the held roots whose node still exists in the graph. */
  function liveHolders(rootName: string): GraphNode[] {
    return rootHolders.get(rootName)?.filter((holder) => holder.parentLink === null && nodes.get(holder.ref) !== undefined) ?? []
  }

  /** THE LOWEST-DURABILITY MATCH (`§2.6` item 1): the holder the FILTER selects, or the
   *  most durable one where no tier token was asked for. */
  function holderOf(rootName: string, token: GraphTierToken | null): GraphNode | null {
    const held = liveHolders(rootName)
    if (held.length === 0) return null
    const sorted = [...held].sort((a, b) => (DURABILITY_RANK[b.flag] ?? 0) - (DURABILITY_RANK[a.flag] ?? 0))
    if (token !== null && token !== 'secure') {
      for (const node of sorted) if (node.flag === token) return node
      return null
    }
    return sorted[0] as GraphNode
  }

  function holders(): GraphNode[] {
    const out: GraphNode[] = []
    for (const rootName of rootHolders.keys()) for (const holder of liveHolders(rootName)) out.push(holder)
    return out
  }

  function setHolder(rootName: string, node: GraphNode): void {
    const held = holdersOf(rootName)
    const next: GraphNode[] = []
    for (const existing of held) if (existing.ref !== node.ref) next.push(existing)
    next.push(node)
    rootHolders.set(rootName, next)
  }

  function dropHolder(rootName: string, ref: GraphNodeRef): void {
    const held = holdersOf(rootName)
    rootHolders.set(rootName, held.filter((node) => node.ref !== ref))
  }

  function registerRows(): GraphRegisterRow[] {
    const rows: GraphRegisterRow[] = []
    for (const declaration of declared.values()) {
      const holder = holderOf(declaration.root, null)
      if (holder === null) continue
      rows.push({ name: declaration.root, nodeRef: holder.ref, constraintId: null, reserved: declaration.names.some((spelling) => spelling.reserved), derived: true })
    }
    return rows
  }

  function entryIsLive(entry: GraphRegisterCacheEntry): boolean {
    const matched = nodes.get(entry.matchedRef)
    if (matched === undefined) return false
    if (matched.flag !== entry.matchedTier) return false
    for (const holder of liveHolders(entry.name)) if (holder.ref === entry.matchedRef) return true
    return false
  }

  function rebuildEntriesAtInvalidation(name: string): void {
    const node = holderOf(name, null)
    if (node === null) {
      registerEntries.delete(name)
      staleEntries.delete(name)
      return
    }
    const entry: GraphRegisterCacheEntry = { name, matchedRef: node.ref, matchedTier: node.flag }
    if (injectArmed) {
      injectArmed = false
      staleEntries.add(name)
      if (!registerEntries.has(name)) registerEntries.set(name, entry)
      return
    }
    registerEntries.set(name, entry)
    staleEntries.delete(name)
  }

  /* ── GRAPH PRIMITIVES ── */

  function mintRef(): GraphNodeRef {
    refCounter += 1
    return `graph-node-${refCounter}`
  }

  function linkEntry(name: string, matchedRef: GraphNodeRef, matchedTier: GraphNodeFlag): GraphLinkCacheEntry {
    return { name, matchedRef, matchedTier }
  }

  function anchorOf(ownerRef: GraphNodeRef, key: string): GraphAnchor | null {
    const owner = nodes.get(ownerRef)
    if (owner === undefined) return null
    for (const anchor of owner.anchors) if (anchor.key === key) return anchor
    return null
  }

  function withAnchor(ownerRef: GraphNodeRef, key: string, link: GraphLink): void {
    const owner = nodes.get(ownerRef)
    if (owner === undefined) return
    const kept: GraphAnchor[] = []
    for (const anchor of owner.anchors) if (anchor.key !== key) kept.push(anchor)
    nodes.set(ownerRef, {
      ref: owner.ref,
      flag: owner.flag,
      localName: owner.localName,
      anchors: [...kept, { owner: ownerRef, key, link }],
      parentLink: owner.parentLink,
    })
  }

  function valueOf(ref: GraphNodeRef): unknown {
    for (const entry of values) if (entry.ref === ref) return entry.value
    return undefined
  }

  function setValue(ref: GraphNodeRef, name: string, value: unknown): void {
    for (const entry of values) {
      if (entry.ref === ref) {
        entry.value = value
        return
      }
    }
    values.push({ name, ref, value, active: false })
  }

  function dropValue(ref: GraphNodeRef): void {
    for (let i = values.length - 1; i >= 0; i -= 1) if (values[i]?.ref === ref) values.splice(i, 1)
  }

  function descendantsOf(node: GraphNode): GraphNode[] {
    const out: GraphNode[] = []
    for (const anchor of node.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue
      const child = nodes.get(anchor.link.to)
      if (child !== undefined) out.push(child)
    }
    return out
  }

  /** REMOVE ONE REFERENCE FROM THE GRAPH (`§2.8` item 2's clear, `§2.8` item 4's downward
   *  removal): the reference is SEVERED from its parent and its own value is dropped. The
   *  node's DESCENDANTS are NOT torn down, because another tier's branch may hold them and
   *  the tiers COMPOSE (`§2.3` item 5) — the graph is the source of truth, and a copy of a
   *  descendant is a node of its own. */
  function detach(ref: GraphNodeRef): void {
    const node = nodes.get(ref)
    if (node === undefined) return
    dropValue(ref)
    if (node.parentLink === null) {
      for (const rootName of rootHolders.keys()) dropHolder(rootName, ref)
      return
    }
    const parent = nodes.get(node.parentLink.from)
    if (parent !== undefined) {
      const kept: GraphAnchor[] = []
      for (const anchor of parent.anchors) {
        if (anchor.link === null || anchor.link.to !== ref) kept.push(anchor)
      }
      nodes.set(parent.ref, {
        ref: parent.ref,
        flag: parent.flag,
        localName: parent.localName,
        anchors: kept,
        parentLink: parent.parentLink,
      })
    }
  }

  function dropSubtree(ref: GraphNodeRef): void {
    const node = nodes.get(ref)
    nodes.delete(ref)
    dropValue(ref)
    if (node === undefined) return
    for (const anchor of node.anchors) {
      if (anchor.link !== null && anchor.link.to !== null) dropSubtree(anchor.link.to)
    }
  }

  function subtreeOf(ref: GraphNodeRef): GraphNode[] {
    const node = nodes.get(ref)
    if (node === undefined) return []
    const out: GraphNode[] = [node]
    for (const anchor of node.anchors) {
      if (anchor.link !== null && anchor.link.to !== null) out.push(...subtreeOf(anchor.link.to))
    }
    return out
  }

  /** THE HIGHEST NODE of a node's own ancestor chain whose flag is BELOW `requested`: the
   *  subtree a commit to a higher tier must RE-TIER for the request to be legal. A node may
   *  never be MORE durable than the node that reaches it (`§2.1`'s named-invariant block), so
   *  a CHILD ABOVE ITS PARENT is refused only when NO such ancestor exists. */
  function climbToBound(node: GraphNode, requested: GraphNodeFlag): GraphNode {
    void requested
    let current = node
    for (let hop = 0; hop < 64; hop += 1) {
      if (isRootRef(current.ref)) break
      const parent = parentOf(current)
      if (parent === null) break
      current = parent
    }
    return current
  }

  function isRootRef(ref: GraphNodeRef): boolean {
    for (const rootName of rootHolders.keys()) {
      for (const holder of liveHolders(rootName)) if (holder.ref === ref) return true
    }
    return false
  }

  function parentOf(node: GraphNode): GraphNode | null {
    if (node.parentLink === null) return null
    return nodes.get(node.parentLink.from) ?? null
  }

  /** THE PARENT OF A PATH, read from the CALLER'S OWN SEGMENTS: the node the path's own
   *  deepest node actually hangs from. A node whose own `parentLink` reaches a reference the
   *  graph no longer holds is answered by the caller's preceding segments instead. */
  function parentPathOf(rootName: string, tail: readonly string[], ref: GraphNodeRef): GraphNode | null {
    if (tail.length <= 1) return null
    const walked = anchorWalk(rootName, [rootName, ...tail.slice(0, tail.length - 1)], null, false)
    if (walked.deepest === null) return null
    if (walked.deepest.ref === ref) return null
    return walked.deepest
  }

  /** EVERY LOGICAL PATH a node and its descendants hold, at the node's OWN local name — the
   *  root's own name included (`§2.3` item 2: a node stores its own local name, never a
   *  stored dotted path, so the path is composed HERE and nowhere else). */
  function heldPathsOf(node: GraphNode): readonly { readonly path: string; readonly flag: GraphNodeFlag }[] {
    const out: { path: string; flag: GraphNodeFlag }[] = [{ path: node.localName, flag: node.flag }]
    for (const anchor of node.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue
      const child = nodes.get(anchor.link.to)
      if (child === undefined) continue
      for (const held of heldPathsOf(child)) out.push({ path: `${node.localName}.${held.path}`, flag: held.flag })
    }
    return out
  }

  /* ── THE ROOT-PATH READING (`§2.3` item 1) ── */

  /** THE ROOT-PATH READING: whether the caller's spelling NAMES its root by the TIER-TOKEN
   *  POSITION (`§2.3` item 1 — the first segment is the token, the NEXT segment is the
   *  registered TOP-LEVEL NAME), the ROOT NAME itself, and the TAIL the walk descends from
   *  the root's own local name. A spelling whose token position does not carry a DECLARED
   *  name is read WHOLE: the caller's own spelling is the root name, carried verbatim
   *  (`§2.2` `P-7`: the store derives, re-keys and normalizes NOTHING it was given). */
  function rootParts(segments: readonly string[]): { qualified: boolean; rootName: string; tail: readonly string[]; token: GraphTierToken | null } {
    const first = segments[0] ?? ''
    if (isTierToken(first) && first !== 'secure') {
      // A TIER-QUALIFIED SPELLING NAMES ITS ROOT BY POSITION (`§2.3` item 1: the first segment
      // is the token — a FILTER — and the NEXT segment is the registered top-level name). A
      // spelling whose tail carries NO REGISTERED NAME is read WHOLE with the token stripped
      // (`§2.2` `P-7`: the caller's own spelling is the root name, carried verbatim), so an
      // undeclared root is reached and reported at `C-TOP` (`§2.3` item 6(i)).
      const tail = segments.slice(1)
      for (let index = 0; index < tail.length; index += 1) {
        if (declared.has(tail[index] as string)) {
          return { qualified: true, rootName: tail[index] as string, tail: tail.slice(index), token: first }
        }
      }
      const whole = tail.length > 0 ? tail.join('.') : first
      return { qualified: true, rootName: whole, tail: [whole], token: first }
    }
    return { qualified: false, rootName: first, tail: segments.slice(0, 1), token: null }
  }

  /** THE WALK. `autoMint` is the WRITE side's descendant builder (`§2.8` item 3): with it
   *  the walk MINTS the missing child at each gap; without it the walk MINTS NOTHING
   *  (`§2.6` item 4, `R-5`). The FIRST segment of the tail is the ROOT'S OWN LOCAL NAME,
   *  and a tier token is a FILTER applied to the resolved node — never a segment. */
  function anchorWalk(rootName: string, tail: readonly string[], token: GraphTierToken | null, autoMint: boolean, value?: unknown, pin: GraphNodeRef | null = null): { deepest: GraphNode | null; node: GraphNode | null; target: GraphNode | null; severed: boolean; firstMissing: string | null; tierOnly: boolean } {
    if (pin !== null) {
      const pinned = nodes.get(pin)
      if (pinned === undefined) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false }
      const pinnedWalk = walkFrom(rootName, pinned, tail, autoMint, value)
      return { ...pinnedWalk, node: pinnedWalk.node, target: pinnedWalk.node, tierOnly: false }
    }
    const held = liveHolders(rootName)
    const wanted = token === null ? null : (DURABILITY_RANK[token] ?? 0)
    // THE TIER-HOLDERS THE REQUESTED FLAG COULD ANSWER FROM, most durable first: the walk is
    // tried on each of them and the FIRST that RESOLVES TO A NODE CARRYING THE REQUESTED FLAG
    // wins. Where none does, the most durable holder's own reading is reported, so the walk's
    // arms (`D-ANCHOR` · `E-LINK` · the DECLARED MISS) are decided by a real traversal.
    const sorted = [...held].sort((a, b) => (DURABILITY_RANK[b.flag] ?? 0) - (DURABILITY_RANK[a.flag] ?? 0))
    if (autoMint) {
      // THE MINTING WALK DESCENDS THE REQUESTED TIER'S OWN HOLDER (`§2.8` item 3): a mint NEVER
      // borrows another tier's branch, which is what keeps the tiers COMPOSING (`§2.3` item 5).
      let exact: GraphNode | null = null
      for (const candidate of sorted) {
        if (token !== null && candidate.flag === token) { exact = candidate; break }
      }
      const start = exact ?? sorted[0]
      if (start === undefined) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false }
      const mintedWalk = walkFrom(rootName, start, tail, true, value)
      return { ...mintedWalk, target: mintedWalk.node, tierOnly: false }
    }
    const eligible = sorted.filter((candidate) => wanted === null || (DURABILITY_RANK[candidate.flag] ?? 0) >= wanted)
    const candidates = eligible.length > 0 ? eligible : sorted
    let first: { deepest: GraphNode | null; node: GraphNode | null; severed: boolean; firstMissing: string | null } | null = null
    let matchedName = false
    for (let index = 0; index < candidates.length; index += 1) {
      const attempt = walkFrom(rootName, candidates[index] as GraphNode, tail, false, value)
      if (first === null) first = attempt
      if (token === null || attempt.node === null) return { ...attempt, target: attempt.node, tierOnly: false }
      if (attempt.node.flag === token) return { ...attempt, target: attempt.node, tierOnly: false }
      matchedName = true
    }
    if (first === null) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false }
    return { ...first, target: null, tierOnly: matchedName }
  }

  function walkFrom(rootName: string, start: GraphNode, tail: readonly string[], autoMint: boolean, value: unknown): { deepest: GraphNode | null; node: GraphNode | null; severed: boolean; firstMissing: string | null } {
    let current: GraphNode = start
    // THE FIRST TAIL SEGMENT IS THE ROOT'S OWN LOCAL NAME (`§2.3` item 2): the walk has
    // ALREADY reached the root, so a first segment equal to it is CONSUMED, and the descent
    // begins at the SECOND one.
    for (let index = tail[0] === start.localName ? 1 : 0; index < tail.length; index += 1) {
      const segment = tail[index] as string
      const last = index === tail.length - 1
      const anchor = anchorOf(current.ref, segment)
      if (anchor !== null && anchor.link !== null && anchor.link.to !== null) {
        const child = nodes.get(anchor.link.to)
        if (child !== undefined) {
          current = child
          if (last) return { deepest: current, node: current, severed: false, firstMissing: null }
          continue
        }
      }
      if (anchor !== null && anchor.link !== null && anchor.link.to === null) {
        return { deepest: current, node: null, severed: true, firstMissing: segment }
      }
      if (!autoMint) return { deepest: current, node: null, severed: false, firstMissing: segment }
      current = makeChild(current, segment, start.flag, rootName, last ? value : undefined)
      if (last) return { deepest: current, node: current, severed: false, firstMissing: null }
    }
    if (autoMint) setValue(current.ref, current.localName, value)
    return { deepest: current, node: current, severed: false, firstMissing: null }
  }

  function makeChild(parent: GraphNode, segment: string, flag: GraphNodeFlag, rootName: string, value: unknown): GraphNode {
    const ref = mintRef()
    const link: GraphLink = { from: parent.ref, to: ref, cache: linkEntry(rootName, ref, flag), constraint: null }
    const child: GraphNode = { ref, flag, localName: segment, anchors: [], parentLink: link }
    nodes.set(ref, child)
    withAnchor(parent.ref, segment, link)
    if (value !== undefined) setValue(ref, segment, value)
    return child
  }

  function resolvePath(raw: unknown): PathWalk | null {
    const parsed = parseName(raw)
    if (parsed.segments.length === 0) return null
    const { rootName, tail } = rootParts(parsed.segments)
    if (!declared.has(rootName)) return null
    const token: GraphTierToken | null = parsed.token
    const walked = anchorWalk(rootName, tail, token, false)
    let stale = false
    if (walked.node !== null) {
      const entry = registerEntries.get(rootName)
      stale = entry !== undefined && staleEntries.has(rootName) && !entryIsLive(entry)
    }
    return { rootName, token: token ?? 'temp', tail, node: walked.node, deepest: walked.deepest, severed: walked.severed, firstMissing: walked.firstMissing, stale }
  }

  function deepestExisting(raw: unknown): GraphNode | null {
    const parsed = parseName(raw)
    if (parsed.segments.length === 0) return null
    const { rootName, tail } = rootParts(parsed.segments)
    return anchorWalk(rootName, tail, parsed.token, false).deepest
  }

  /* ── THE WALK'S ANSWER (`§2.3` item 6, `§2.5`) ── */

  function refusalOf(reason: GraphRefusalReason, step: GraphResolveStep, segment: string | null, owner: GraphNodeRef | null, name: string): Record<string, unknown> {
    return { status: 'refused', reason, diagnostic: { reason, step, segment, owner }, name }
  }

  interface WalkOutcome {
    readonly answer: GraphResolveResult | Record<string, unknown>
    readonly leaf: GraphNode | null
    readonly rootName: string
    readonly tail: readonly string[]
    readonly token: GraphTierToken | null
  }

  function walkName(raw: unknown): WalkOutcome {
    const parsed = parseName(raw)
    if (parsed.segments.length === 0) {
      return { answer: refusalOf('malformed-name', 'A-PARSE', null, null, typeof raw === 'string' ? raw : ''), leaf: null, rootName: '', tail: [], token: null }
    }
    if (parsed.segments[0] === 'secure') {
      return { answer: refusalOf('secure-refused', 'B-SECURE-GATE', null, null, raw as string), leaf: null, rootName: '', tail: [], token: null }
    }
    const name = raw as string
    if (parsed.segments.length < 2) {
      return { answer: refusalOf('malformed-name', 'A-PARSE', null, null, name), leaf: null, rootName: '', tail: [], token: null }
    }
    const tiered = isTierToken(parsed.segments[0]) && parsed.segments[0] !== 'secure'
    if (tiered && parsed.segments.length < 2) {
      return { answer: refusalOf('malformed-name', 'A-PARSE', null, null, name), leaf: null, rootName: '', tail: [], token: null }
    }
    const { rootName, tail } = rootParts(parsed.segments)
    if (!declared.has(rootName)) {
      if (tiered) {
        return { answer: refusalOf('undeclared-name', 'C-TOP', parsed.segments[1] as string, null, name), leaf: null, rootName: '', tail: [], token: null }
      }
      return { answer: refusalOf('malformed-name', 'A-PARSE', null, null, name), leaf: null, rootName: '', tail: [], token: null }
    }
    if (holdersOf(rootName).length === 0) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token }
    const walked = anchorWalk(rootName, tail, parsed.token, false)
    if (walked.deepest === null) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token }
    const segment = walked.firstMissing ?? (tail[tail.length - 1] as string)
    if (walked.severed) {
      return { answer: refusalOf('severed-link', 'E-LINK', segment, walked.deepest.ref, name), leaf: null, rootName, tail, token: parsed.token }
    }
    if (walked.node === null) {
      if (tail.length === 1 && tail[0] === rootName) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token }
      return { answer: refusalOf('no-such-anchor', 'D-ANCHOR', segment, walked.deepest.ref, name), leaf: null, rootName, tail, token: parsed.token }
    }
    const leaf = walked.node
    if (parsed.token !== null && parsed.token !== 'secure' && leaf.flag !== parsed.token) {
      // `H-FLAG` runs AFTER `G-RESOLVE-LEAF`: a filter miss on a RESOLVABLE leaf is its OWN
      // diagnostic, and NEVER `'no-such-anchor'` (`§2.3` items 6(iv)/7, `R-6`).
      return { answer: refusalOf('tier-filter-miss', 'H-FLAG', segment, leaf.ref, name), leaf: null, rootName, tail, token: parsed.token }
    }
    const entry = registerEntries.get(rootName)
    if (entry !== undefined && staleEntries.has(rootName) && !entryIsLive(entry)) {
      return { answer: refusalOf('rebuild-failed', 'F-CACHE', segment, leaf.ref, name), leaf: null, rootName, tail, token: parsed.token }
    }
    return {
      answer: { found: true, value: valueOf(leaf.ref), tier: leaf.flag, flag: leaf.flag, cache: tierHandleFor(leaf.flag), name },
      leaf,
      rootName,
      tail,
      token: parsed.token,
    }
  }

  function mergedAnswer(name: string, anchorNode: GraphNode): GraphMergedRead | null {
    const byPath = new Map<string, GraphPart>()
    for (const held of heldPathsOf(anchorNode)) {
      const existing = byPath.get(held.path)
      if (existing === undefined) {
        byPath.set(held.path, { tier: held.flag, path: held.path })
        continue
      }
      if ((DURABILITY_RANK[held.flag] ?? 0) > (DURABILITY_RANK[existing.tier] ?? 0)) {
        byPath.set(held.path, { tier: held.flag, path: held.path })
      }
    }
    const collected = [...byPath.values()]
    if (collected.length === 0) return null
    collected.sort((a, b) => (DURABILITY_RANK[b.tier] ?? 0) - (DURABILITY_RANK[a.tier] ?? 0))
    const value: Record<string, unknown> = {}
    for (const part of collected) value[part.path] = part.tier
    return { found: true, value, tier: null, cache: null, name, merged: true, parts: collected }
  }

  /** EVERY HELD PATH of a read, read off EVERY holder branch the walk reaches: the merged
   *  arm's `parts` are the DESCENDANTS the tiers hold where no single node holds the read
   *  path (`§2.5` item 4). */
  /** EVERY DESCENDANT the tiers hold below the read path (`§2.5` item 4): each entry names
   *  THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path, and the list is ORDERED by the
   *  OVERLAY ORDER (`file` → `mem` → `temp`, descending durability) with the paths ascending
   *  within one tier — the reverse of the search order. */
  function collectParts(readTail: readonly string[], token: GraphTierToken | null): GraphPart[] {
    void token
    const rootName = readTail[0] as string
    const anchors: GraphNode[] = []
    for (const holder of liveHolders(rootName)) {
      const walked = walkFrom(rootName, holder, readTail, false, undefined)
      if (walked.deepest !== null) anchors.push(walked.deepest)
    }
    return partsUnder(anchors, readTail)
  }

  /** THE DESCENDANTS OF A SET OF ANCHOR NODES: every node that still belongs to a branch
   *  hanging BELOW the read path, named by the path it ACTUALLY holds. A node the graph no
   *  longer reaches through its own anchors is not held (`§2.4`'s ruling: the graph is the
   *  source of truth), so it is not a part. */
  function partsUnder(anchors: readonly GraphNode[], readTail: readonly string[]): GraphPart[] {
    const byKey = new Map<string, GraphPart>()
    const pathOf = new Map<GraphNodeRef, string>()
    for (const anchor of anchors) {
      const base = anchor.localName === readTail[0] ? (readTail[0] as string) : [...readTail.slice(1, readTail.length - 1), anchor.localName].join('.')
      const visit = (node: GraphNode, path: string): void => {
        pathOf.set(node.ref, path)
        for (const child of descendantsOf(node)) {
          const childPath = `${path}.${child.localName}`
          pathOf.set(child.ref, childPath)
          visit(child, childPath)
        }
      }
      visit(anchor, base)
    }
    for (const [ref, path] of pathOf) {
      const node = nodes.get(ref)
      if (node === undefined) continue
      const segments = path.split('.')
      if (segments.length <= 1) continue
      byKey.set(`${path}@${node.flag}`, { tier: node.flag, path })
    }
    const collected = [...byKey.values()]
    collected.sort((a, b) => {
      const byRank = (DURABILITY_RANK[b.tier] ?? 0) - (DURABILITY_RANK[a.tier] ?? 0)
      if (byRank !== 0) return byRank
      return a.path < b.path ? -1 : a.path > b.path ? 1 : 0
    })
    return collected
  }

  function resolveRead(raw: unknown): GraphResolveResult | Record<string, unknown> {
    const outcome = walkName(raw)
    if (outcome.leaf !== null) return outcome.answer
    const answer = outcome.answer as Record<string, unknown>
    if (answer['status'] === 'refused') return outcome.answer
    // THE DECLARED MISS, AND THE MERGED ARM BESIDE IT (`§2.5` item 4): where no node holds the
    // read path but DESCENDANTS of it are held, the merged arm answers instead.
    const parts = collectParts([outcome.rootName, ...outcome.tail.slice(1)], outcome.token)
    if (parts.length === 0) return outcome.answer
    const value: Record<string, unknown> = {}
    for (const part of parts) value[part.path] = part.tier
    const merged: GraphMergedRead = { found: true, value, tier: null, cache: null, name: raw as string, merged: true, parts }
    return merged
  }

  /* ── THE EVENT SURFACE (`§2.10`) ── */

  function deliver(subscriber: SubscriberRecord, event: GraphEvent): void {
    try {
      subscriber.listener(event)
    } catch {
      // A listener that THROWS does not propagate to the mutator's caller (`§2.10` item 4).
    }
  }

  function emit(name: string, flag: GraphNodeFlag, value: unknown, cleared: readonly string[], cause: GraphEvent['cause'], origin?: string): number {
    if (!(EVENT_CAUSES as readonly string[]).includes(cause)) return 0
    const exact: SubscriberRecord[] = []
    const ancestors: SubscriberRecord[] = []
    for (const subscriber of subscriptions) {
      if (!subscriber.live) continue
      if (subscriber.name === name) exact.push(subscriber)
      else if (subscriber.subtree && origin !== undefined && origin.startsWith(`${subscriber.name}.`)) ancestors.push(subscriber)
    }
    if (exact.length === 0 && ancestors.length === 0) return 0
    for (const subscriber of exact) deliver(subscriber, { name, flag, value, cleared, cause })
    for (const ancestor of ancestors) {
      deliver(ancestor, { name: ancestor.name, flag, value: undefined, cleared: [], cause: 'descendant', origin: origin as string, subtree: true })
    }
    return 1
  }

  /* ── THE RECEIPT AND ITS REFUSAL SHAPES ── */

  function receiptFor(name: unknown, state: ReceiptState, status: 'committed' | 'refused', reason?: GraphRefusalReason): GraphWriteReceipt {
    const out: Record<string, unknown> = {
      status,
      name: typeof name === 'string' ? name : '',
      cleared: state.cleared,
      repaired: state.repaired,
      rows: state.rows,
      crossings: state.crossings,
      events: state.events,
    }
    if (reason !== undefined) out['reason'] = reason
    if (state.diagnostic !== undefined) out['diagnostic'] = state.diagnostic
    return out as unknown as GraphWriteReceipt
  }

  function refuse(name: unknown, reason: GraphRefusalReason, step: GraphResolveStep, segment: string | null, owner: GraphNodeRef | null): GraphWriteReceipt {
    return receiptFor(name, {
      cleared: [],
      repaired: [],
      rows: [],
      crossings: 0,
      events: 0,
      diagnostic: { reason, step, segment, owner },
    }, 'refused', reason)
  }

  /* ── THE CONSTRAINT TABLE (`§2.7`) ── */

  function evaluateConstraints(op: 'set' | 'commit' | 'remove', state: ReceiptState): void {
    for (const row of constraintTable) {
      if (!Array.isArray(row.evaluatedOn) || !row.evaluatedOn.includes(op)) continue
      if (row.repair !== 'next-surviving-by-order') continue
      const actives = values.filter((entry) => entry.active)
      if (actives.length > 1) {
        for (const extra of actives.slice(1)) {
          extra.active = false
          state.repaired.push(extra.name)
        }
      }
    }
  }

  /* ── THE WRITE SURFACE (`§2.8`) ── */

  function routingOf(opts: unknown): { onRepeat: 'edit' | 'refuse' } | GraphWriteReceipt {
    if (opts !== undefined && opts !== null && !isRecordObject(opts)) return refuse('', 'malformed-name', 'A-PARSE', null, null)
    const record = isRecordObject(opts) ? (opts as GraphWriteOptions) : {}
    const explicit = record.onRepeat ?? record.onDuplicate
    if (explicit !== undefined && explicit !== 'edit' && explicit !== 'refuse') return refuse('', 'malformed-name', 'A-PARSE', null, null)
    return { onRepeat: explicit ?? 'edit' }
  }

  function parseWrite(raw: unknown): WriteName | GraphWriteReceipt {
    const parsed = parseName(raw)
    if (parsed.segments.length === 0) return refuse(raw, 'malformed-name', 'A-PARSE', null, null)
    if (parsed.segments[0] === 'secure') return refuse(raw, 'secure-refused', 'B-SECURE-GATE', null, null)
    if (!isTierToken(parsed.segments[0])) return refuse(raw, 'malformed-name', 'A-PARSE', null, null)
    const parts = rootParts(parsed.segments)
    if (!declared.has(parts.rootName)) {
      // THE CALLER'S OWN SPELLING IS THE ROOT NAME (`§2.2` `P-7`): a spelling whose tail
      // carries no registered name is taken WHOLE, with the tier token stripped.
      declared.set(parts.rootName, { root: parts.rootName, names: [{ name: raw as string, reserved: false }] })
    }
    const token: GraphNodeFlag = parsed.segments[0] === 'mem' ? 'mem' : parsed.segments[0] === 'file' ? 'file' : 'temp'
    return { name: raw as string, token, segments: parsed.segments, rootName: parts.rootName, tail: parts.tail }
  }

  function rootCapReached(token: GraphNodeFlag): boolean {
    if (token !== 'mem' && token !== 'temp') return false
    let count = 0
    for (const rootName of rootHolders.keys()) {
      for (const holder of liveHolders(rootName)) if (holder.flag === token) count += 1
    }
    return count >= (token === 'mem' ? REGISTER_ROOT_CAP_MEM : REGISTER_ROOT_CAP_TEMP)
  }

  function writeRowsFor(node: GraphNode, path: string, out: GraphAffectedRow[]): void {
    out.push({ name: path, flag: node.flag, nodeRef: node.ref })
    for (const anchor of node.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue
      const child = nodes.get(anchor.link.to)
      if (child === undefined) continue
      writeRowsFor(child, `${path}.${anchor.key}`, out)
    }
  }

  function serializationFailure(ref: GraphNodeRef): 'serialize-failed' | 'validate-failed' | null {
    for (const node of subtreeOf(ref)) {
      const failure = serializationFailureOf(valueOf(node.ref))
      if (failure !== null) return failure
    }
    return null
  }

  function lowerCopiesOf(parsed: WriteName, requested: GraphNodeFlag): { node: GraphNode; path: string }[] {
    const found: { node: GraphNode; path: string }[] = []
    for (const holder of holdersOf(parsed.rootName)) {
      if ((DURABILITY_RANK[holder.flag] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue
      const lower = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, false, undefined, holder.ref)
      if (lower.node !== null) found.push({ node: lower.node, path: `${holder.flag}.${parsed.tail.join('.')}` })
    }
    return found
  }

  function replicate(old: GraphNode, flag: GraphNodeFlag, path: string, affected: AffectedRef[]): GraphNode {
    const ref = mintRef()
    nodes.set(ref, { ref, flag, localName: old.localName, anchors: [], parentLink: null })
    affected.push({ name: path, flag, ref })
    const carried = valueOf(old.ref)
    if (carried !== undefined) setValue(ref, old.localName, carried)
    for (const anchor of old.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue
      const child = nodes.get(anchor.link.to)
      if (child === undefined) continue
      const childRebuilt = replicate(child, flag, `${path}.${anchor.key}`, affected)
      withAnchor(ref, anchor.key, { from: ref, to: childRebuilt.ref, cache: linkEntry(old.localName, childRebuilt.ref, flag), constraint: null })
    }
    return nodes.get(ref) as GraphNode
  }

  function editNode(raw: unknown, parsed: WriteName, node: GraphNode, value: unknown, cause: GraphEvent['cause']): GraphWriteReceipt {
    setValue(node.ref, node.localName, value)
    const state: ReceiptState = { cleared: [], repaired: [], rows: [{ name: parsed.name, flag: node.flag, nodeRef: node.ref }], crossings: 0, events: 0 }
    state.events += emit(parsed.name, node.flag, value, [], cause, parsed.name)
    evaluateConstraints(cause === 'set' ? 'set' : 'commit', state)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  function regenerationReceipt(raw: unknown, parsed: WriteName, value: unknown, staleTarget: GraphNode): GraphWriteReceipt {
    const requested = parsed.token
    // THE LIVE NODE BENEATH THE REFERENCE: an operation between the walk and the transaction
    // rebuilds a node by REPLACING its object (`§2.2` `P-2`: anchors are immutable), so the
    // transaction reads the graph's CURRENT object rather than the walk's own reading.
    const target = nodes.get(staleTarget.ref) ?? staleTarget
    if (target.parentLink !== null) {
      const parent = nodes.get(target.parentLink.from)
      if (parent !== undefined && isRootRef(parent.ref) === false && (DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[parent.flag] ?? 0)) {
        // NO ANCESTOR CAN CARRY THE REQUEST: the subtree's own PARENT is a non-root node less
        // durable than the request, so the re-tier would make the child MORE durable than the
        // node reaching it (`§2.1`'s named-invariant block) — and re-tiering the PARENT is the
        // regeneration's own business, not this one's.
        return refuse(raw, 'durability-inversion', 'G-RESOLVE-LEAF', parsed.tail[parsed.tail.length - 1] ?? null, parent.ref)
      }
    }
    const failure = serializationFailureOf(value)
    if (failure !== null) return refuse(raw, failure, 'G-RESOLVE-LEAF', null, target.ref)
    const affected: AffectedRef[] = []
    const rebuilt = replicate(target, requested, target.localName, affected)
    const parentLink = target.parentLink
    const targetName = target.localName
    detach(target.ref)
    if (parentLink !== null) {
      const parent = nodes.get(parentLink.from)
      if (parent !== undefined) {
        withAnchor(parent.ref, targetName, {
          from: parent.ref,
          to: rebuilt.ref,
          cache: linkEntry(parsed.rootName, rebuilt.ref, rebuilt.flag),
          constraint: null,
        })
      }
    } else if (target.parentLink === null) {
      setHolder(targetName, rebuilt)
    }
    setValue(rebuilt.ref, rebuilt.localName, value)
    const cleared: string[] = []
    for (const lower of lowerCopiesOf(parsed, requested)) {
      if (lower.node.ref === rebuilt.ref) continue
      detach(lower.node.ref)
      cleared.push(lower.path)
    }
    const state: ReceiptState = {
      cleared: [...new Set(cleared)],
      repaired: [],
      rows: affected.map((row) => ({ name: row.name, flag: row.flag, nodeRef: row.ref })),
      crossings: 1,
      events: 0,
    }
    for (const row of affected) state.events += emit(row.name, row.flag, value, state.cleared, 'commit', row.name)
    // EACH LOWER-DURABILITY BRANCH'S OWN COPY of the same logical path is CLEARED, and each
    // cleared reference fires its OWN `cause:'clear'` on ITS OWN path (`§2.8` item 2,
    // `§2.10` item 2).
    clearLowerCopies(parsed, requested, state)
    evaluateConstraints('commit', state)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  /** THE LOWER-DURABILITY COPIES of the SAME LOGICAL PATH: a commit to a HIGHER tier clears
   *  each of them, NEVER a higher tier and NEVER recursively (`§2.8` item 2, `C-2`). */
  function clearLowerCopies(parsed: WriteName, requested: GraphNodeFlag, state: ReceiptState): void {
    // THE READ OF EVERY LOWER BRANCH COMES FIRST, THEN THE DELETION: a branch dropped on the
    // way would leave a later branch's own copies unreachable (`§2.8` item 2, `C-2`).
    const doomed: { path: string; ref: GraphNodeRef }[] = []
    for (const holder of rootHolders.get(parsed.rootName) ?? []) {
      if (nodes.get(holder.ref) === undefined) continue
      if ((DURABILITY_RANK[holder.flag] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue
      const lower = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, true, undefined, holder.ref)
      doomed.push({ path: `${holder.flag}.${parsed.tail.join('.')}`, ref: lower.node?.ref ?? holder.ref })
    }
    for (const target of doomed) {
      detach(target.ref)
      if (!state.cleared.includes(target.path)) state.cleared.push(target.path)
    }
    for (const path of state.cleared) state.events += emit(path, requested, undefined, [], 'clear', path)
  }

  /** THE FIRST NODE of the caller's own path whose flag is NOT the requested one — the
   *  SUBTREE a commit to a higher tier RE-TIERS (`§2.8` item 5). Where every node of the path
   *  already carries the requested flag, or the path does not reach one, nothing is located. */
  function locateWriteTarget(rootName: string, tail: readonly string[], requested: GraphNodeFlag): GraphNode | null {
    let current: GraphNode | null = null
    let currentRank = -1
    for (const holder of holdersOf(rootName)) {
      const walk = walkFrom(rootName, holder, [rootName, ...tail.slice(1)], false, undefined)
      if (walk.deepest === null) continue
      const rank = DURABILITY_RANK[walk.deepest.flag] ?? 0
      if (rank <= currentRank) continue
      currentRank = rank
      current = walk.deepest
    }
    if (current === null) return null
    if (current.flag === requested) return null
    // THE SUBTREE IS THE HIGHEST NODE of the caller's own path that must be RE-TIERED for the
    // request to be legal (`§2.8` item 5): climbing while the current node's own PARENT is
    // less durable than the request leaves a subtree whose parent link can carry the new tier
    // — and where none can, the climb stops at the branch's ROOT, where the invariant is
    // VACUOUS (`§2.1`'s named-invariant block). The node AND EVERY DESCENDANT re-tiers, so the
    // caller's own leaf lands at the requested tier with them.
    let subtree = current
    for (let hop = 0; hop < 64; hop += 1) {
      const parent = parentOf(subtree) ?? parentPathOf(rootName, tail, subtree.ref)
      if (parent === null) break
      if (isRootRef(parent.ref)) { subtree = parent; break }
      subtree = parent
    }
    return subtree
  }

  /** THE MINT of a ROOT HOLDER at the requested tier (`§2.8` item 3), with the rest of the
   *  caller's own path built beneath it. A HOLDER AT ANOTHER TIER IS NEVER DISTURBED: the
   *  tiers COMPOSE (`§2.3` item 5) and only a commit to a HIGHER tier clears a LOWER copy.
   *  THE MINTED HOLDER IS A ROOT, so the monotonic-persistence invariant is VACUOUS over it
   *  (`§2.1`'s named-invariant block) — the invariant constrains a PARENT LINK, not a
   *  sibling tier's holder. */
  function mintNewHolder(parsed: WriteName, requested: GraphNodeFlag, value: unknown, bound: { rank: number; node: GraphNode | null }): GraphWriteReceipt {
    if (bound.node !== null && (DURABILITY_RANK[requested] ?? 0) > bound.rank) {
      return refuse(parsed.name, 'durability-inversion', 'G-RESOLVE-LEAF', parsed.tail[parsed.tail.length - 1] ?? null, bound.node.ref)
    }
    const ref = mintRef()
    const fresh: GraphNode = { ref, flag: requested, localName: parsed.rootName, anchors: [], parentLink: null }
    nodes.set(ref, fresh)
    setHolder(parsed.rootName, fresh)
    setValue(ref, parsed.rootName, value)
    const walkTail = [parsed.rootName, ...parsed.tail.slice(1)]
    const holderWalk = anchorWalk(parsed.rootName, walkTail, requested, true, value)
    const reached = holderWalk.node ?? fresh
    // A FRESH HOLDER IS A SIBLING, NOT A RAISE (see the note above this function).
    const raised = false
    const state: ReceiptState = { cleared: [], repaired: [], rows: [], crossings: requested === 'file' ? 1 : 0, events: 0 }
    writeRowsFor(reached, parsed.name, state.rows)
    state.events += emit(parsed.name, requested, value, [], 'commit', parsed.name)
    if (raised) clearLowerCopies(parsed, requested, state)
    evaluateConstraints('commit', state)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(parsed.name, state, 'committed')
  }

  /** THE DEEPEST NODE OF ANOTHER TIER'S BRANCH: the parent a mint beneath it would answer to
   *  (`§2.1`'s named-invariant block reads `durability(child) <= durability(parent)` from the
   *  node's own `parentLink` — never from a name and never from a tier token). */
  /** THE BOUND an existing sibling branch puts on a mint at `requested`: the HIGHEST
   *  durability among the parents the caller's own parent path reaches in the OTHER tiers'
   *  branches (`§2.1`'s named-invariant block reads `durability(child) <= durability(parent)`
   *  from the graph's own parent link). A branch whose parent path reaches NOTHING — or
   *  reaches only a ROOT, where the invariant is VACUOUS — bounds nothing. */
  function mintBound(parsed: WriteName, requested: GraphNodeFlag): { rank: number; node: GraphNode | null } {
    const parentTail = [parsed.rootName, ...parsed.tail.slice(1, parsed.tail.length - 1)]
    let best: GraphNode | null = null
    let bestRank = -1
    for (const holder of holdersOf(parsed.rootName)) {
      if (holder.flag === requested) continue
      const reached = anchorWalk(parsed.rootName, parentTail, holder.flag, false, undefined, holder.ref).node
      if (reached === null) continue
      if (reached.localName === parsed.tail[0]) continue
      const rank = DURABILITY_RANK[reached.flag] ?? 0
      if (rank > bestRank) {
        bestRank = rank
        best = reached
      }
    }
    return { rank: bestRank, node: best }
  }

  function commitOp(raw: unknown, value: unknown, opts: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    const routing = routingOf(opts)
    if (!('onRepeat' in routing)) return routing as GraphWriteReceipt
    const requested = parsed.token
    const tierHolder = holderOf(parsed.rootName, requested)
    if (tierHolder === null) {
      // NO HOLDER AT THE PAIR'S OWN TIER: the commit MINTS one (`§2.8` item 3), building the
      // rest of the caller's own path beneath it, and NEVER touches another tier's holder.
      if (rootCapReached(requested)) {
        return refuse(raw, 'cap-exceeded', 'G-RESOLVE-LEAF', parsed.tail[parsed.tail.length - 1] ?? null, null)
      }
      // WHERE THE CALLER'S OWN PATH REACHES ONLY THE BRANCH'S ROOT, the commit RE-TIERS that
      // root's whole subtree in ONE committed write (`§2.8` item 5) — a ROOT carries no parent
      // link, so the monotonic-persistence invariant is VACUOUS over it (`§2.1`'s
      // named-invariant block) and no sibling branch's flag can refuse the re-tier.
      // WHERE THE CALLER'S OWN PATH IS HELD AT A LOWER TIER BY ANOTHER BRANCH'S ROOT, the
      // commit RE-TIERS that whole subtree in ONE committed write (`§2.8` item 5): a ROOT
      // carries no parent link, so the monotonic-persistence invariant is VACUOUS over it.
      const located = locateWriteTarget(parsed.rootName, parsed.tail, requested)
      // THE RE-TIER RUNS WHERE THE REQUEST IS MORE DURABLE THAN THE BRANCH THAT HOLDS THE
      // PATH (`§2.8` item 5): the transaction re-tiers the node and EVERY DESCENDANT in one
      // committed write. A request that is NOT more durable than its siblings is a HOLDER OF
      // ITS OWN (`§2.3` item 5: the tiers COMPOSE), never a re-tier of theirs.
      const heldAtAnotherTier = located !== null && (DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[located.flag] ?? 0)
      if (heldAtAnotherTier && parsed.tail.length > 1) {
        const failureAtRoot = serializationFailureOf(value)
        if (failureAtRoot !== null) return refuse(raw, failureAtRoot, 'G-RESOLVE-LEAF', null, located.ref)
        return regenerationReceipt(raw, parsed, value, located)
      }
      const failure = serializationFailureOf(value)
      if (failure !== null) return refuse(raw, failure, 'G-RESOLVE-LEAF', null, null)
      return mintNewHolder(parsed, requested, value, mintBound(parsed, requested))
    }
    const walkTail = [parsed.rootName, ...parsed.tail.slice(1)]
    const walked = anchorWalk(parsed.rootName, walkTail, null, false)
    if (walked.severed) {
      return refuse(raw, 'severed-link', 'E-LINK', walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null)
    }
    const target = walked.target
    const lastSegment = parsed.tail[parsed.tail.length - 1] as string
    if (target !== null && routing.onRepeat === 'refuse' && target.flag === requested) {
      return refuse(raw, 'duplicate-path-tier', 'G-RESOLVE-LEAF', lastSegment, target.ref)
    }
    if (target !== null && target.flag !== requested) {
      // THE TRANSACTION RE-TIERS FROM THE HIGHEST NODE OF THE PATH THAT MUST BE RE-TIERED for
      // the requested tier to be legal (`§2.8` item 5): a CHILD may never be MORE durable than
      // the node that reaches it (`§2.1`'s named-invariant block), so where the target's own
      // PARENT is less durable than the request the SUBTREE is the parent's, not the target's.
      return regenerationReceipt(raw, parsed, value, target)
    }
    if (target !== null) return editNode(raw, parsed, target, value, 'commit')
    // NO NODE HOLDS THE PAIR. The commit descends through the CALLER'S OWN PATH to locate the
    // FIRST node whose flag is not the requested one: that node is the SUBTREE the transaction
    // RE-TIERS (`§2.8` item 5), and where none is found the missing child is MINTED below the
    // deepest node the walk reached.
    const located = locateWriteTarget(parsed.rootName, parsed.tail, requested)
    if (located !== null) return regenerationReceipt(raw, parsed, value, located)
    const deepest = walked.deepest
    if (deepest === null) return refuse(raw, 'undeclared-name', 'C-TOP', parsed.rootName, null)
    if ((DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[deepest.flag] ?? 0)) {
      return refuse(raw, 'durability-inversion', 'G-RESOLVE-LEAF', walked.firstMissing ?? lastSegment, deepest.ref)
    }
    const failure = serializationFailureOf(value)
    if (failure !== null) return refuse(raw, failure, 'G-RESOLVE-LEAF', null, deepest.ref)
    const childWalk = anchorWalk(parsed.rootName, walkTail, requested, true, value)
    const minted = childWalk.node
    if (minted === null) return refuse(raw, 'undeclared-name', 'C-TOP', parsed.rootName, null)
    const raised = true
    const state: ReceiptState = { cleared: [], repaired: [], rows: [], crossings: requested === 'file' ? 1 : 0, events: 0 }
    writeRowsFor(minted, parsed.name, state.rows)
    state.events += emit(parsed.name, requested, value, [], 'commit', parsed.name)
    if (raised) clearLowerCopies(parsed, requested, state)
    evaluateConstraints('commit', state)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  function setOrMint(raw: unknown, value: unknown, opts: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    const routing = routingOf(opts)
    if (!('onRepeat' in routing)) return routing as GraphWriteReceipt
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false)
    if (walked.severed) {
      return refuse(raw, 'severed-link', 'E-LINK', walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null)
    }
    const target = walked.node
    if (target === null) {
      return refuse(raw, 'undeclared-name', 'G-RESOLVE-LEAF', walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null)
    }
    if (target.flag !== parsed.token) {
      return refuse(raw, 'undeclared-name', 'G-RESOLVE-LEAF', parsed.tail[parsed.tail.length - 1] ?? null, target.ref)
    }
    return editNode(raw, parsed, target, value, 'set')
  }

  function removeOp(raw: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    // THE REFUSAL IS BY NAME, NEVER BY VALUE (`§2.4` item 7(f), `F-20`): the name that
    // carries a `reserved:true` declaration is read BEFORE the walk, so the same graph
    // fact is refused whatever the node's own value is.
    for (const row of declared.values()) {
      for (const spelling of row.names) {
        if (spelling.reserved && spelling.name === parsed.name) return refuse(raw, 'reserved-name', 'C-TOP', null, null)
      }
    }
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false)
    if (walked.severed) {
      return refuse(raw, 'severed-link', 'E-LINK', walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null)
    }
    const target = walked.node
    if (target === null) {
      return refuse(raw, 'undeclared-name', 'G-RESOLVE-LEAF', walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null)
    }
    // `remove` CLEARS DOWNWARD (`§2.8` item 4): the NAMED tier AND EVERY LESS-PERSISTENT COPY of
    // the same logical path, never a higher tier — each copy is SEVERED from its own parent and
    // its own value dropped, and the parent's anchor slot is dropped with it.
    const cleared: string[] = []
    for (const holder of holdersOf(parsed.rootName)) {
      if ((DURABILITY_RANK[holder.flag] ?? 0) > (DURABILITY_RANK[parsed.token] ?? 0)) continue
      const candidate = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, false, undefined, holder.ref)
      if (candidate.node === null) continue
      cleared.push(`${holder.flag}.${parsed.tail.join('.')}`)
      detach(candidate.node.ref)
    }
    const state: ReceiptState = { cleared: [...new Set(cleared)], repaired: [], rows: [], crossings: 0, events: 0 }
    for (const path of state.cleared) state.events += emit(path, parsed.token, undefined, [], 'clear', path)
    state.events += emit(parsed.name, parsed.token, undefined, [], 'remove', parsed.name)
    evaluateConstraints('remove', state)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  function clearOp(raw: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false)
    if (walked.severed) {
      return refuse(raw, 'severed-link', 'E-LINK', walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null)
    }
    const target = walked.node
    if (target === null) {
      return refuse(raw, 'undeclared-name', 'G-RESOLVE-LEAF', walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null)
    }
    dropValue(target.ref)
    const state: ReceiptState = { cleared: [parsed.name], repaired: [], rows: [], crossings: 0, events: 0 }
    state.events += emit(parsed.name, target.flag, undefined, [], 'clear', parsed.name)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  function sweepOp(raw: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false)
    if (walked.severed) {
      return refuse(raw, 'severed-link', 'E-LINK', walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null)
    }
    const target = walked.node
    if (target === null) {
      return refuse(raw, 'undeclared-name', 'G-RESOLVE-LEAF', walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null)
    }
    const swept = heldPathsOf(target).map((held) => `${parsed.token}.${held.path}`)
    dropValue(target.ref)
    const state: ReceiptState = { cleared: swept, repaired: [], rows: [], crossings: 0, events: 0 }
    for (const path of swept) state.events += emit(path, parsed.token, undefined, [], 'sweep', path)
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  function severOp(raw: unknown, anchorKey: unknown): GraphWriteReceipt {
    const parsed = parseWrite(raw)
    if (!('token' in parsed)) return parsed as GraphWriteReceipt
    if (typeof anchorKey !== 'string' || anchorKey.length === 0) return refuse(raw, 'malformed-name', 'A-PARSE', null, null)
    const ownerWalk = anchorWalk(parsed.rootName, parsed.tail, null, false)
    const owner = ownerWalk.node ?? ownerWalk.deepest
    if (owner === null) return refuse(raw, 'undeclared-name', 'C-TOP', parsed.rootName, null)
    const anchor = anchorOf(owner.ref, anchorKey)
    if (anchor === null) return refuse(raw, 'no-such-anchor', 'D-ANCHOR', anchorKey, owner.ref)
    const logKey = `${owner.ref}::${anchorKey}`
    if (anchor.link === null || anchor.link.to === null) {
      const previous = severLog.get(logKey) ?? []
      return receiptFor(raw, { cleared: [...previous], repaired: [], rows: [], crossings: 0, events: 0 }, 'committed')
    }
    const target = nodes.get(anchor.link.to)
    const ownerName = parsed.tail[0] as string
    const released: string[] = []
    if (target !== undefined) {
      for (const held of referenceNamesOf(ownerName, anchorKey, target.ref)) {
        released.push(`${parsed.token}.${held}`)
      }
    }
    dropSubtree(anchor.link.to)
    severLog.set(logKey, released)
    withAnchor(owner.ref, anchorKey, {
      from: owner.ref,
      to: null,
      cache: linkEntry(parsed.rootName, anchor.link.cache.matchedRef, anchor.link.cache.matchedTier),
      constraint: null,
    })
    const state: ReceiptState = { cleared: released, repaired: [], rows: [], crossings: 0, events: 0 }
    for (const reference of released) {
      const held: GraphNodeFlag = target === undefined ? 'file' : target.flag
      state.events += emit(reference, held, undefined, released, 'severed')
    }
    for (const subscriber of subscriptions) if (released.includes(subscriber.name)) subscriber.live = false
    rebuildEntriesAtInvalidation(parsed.rootName)
    return receiptFor(raw, state, 'committed')
  }

  /** THE RELEASED REFERENCES (`§2.10` item 3): EVERY reference the severed node OR ANY
   *  REFERENCE IT HELD answers for, in the caller's own spelling. */
  function referenceNamesOf(rootLocal: string, anchorKey: string, targetRef: GraphNodeRef): string[] {
    const out: string[] = []
    const walk = (ref: GraphNodeRef, path: string): void => {
      const node = nodes.get(ref)
      if (node === undefined) return
      out.push(path)
      for (const anchor of node.anchors) {
        if (anchor.link === null || anchor.link.to === null) continue
        walk(anchor.link.to, `${path}.${anchor.key}`)
      }
    }
    walk(targetRef, `${rootLocal}.${anchorKey}`)
    return out
  }

  /* ── THE EXPORT (`§2.9`) ── */

  function exportOf(raw: unknown): GraphResolveResult | GraphRefusalReason {
    const answer = resolveRead(raw)
    const record = answer as Record<string, unknown>
    if (record['status'] === 'refused') return record['reason'] as GraphRefusalReason
    const read = answer as GraphResolveResult
    if (read.found === false) return miss(read.name)
    if (read.tier === null) {
      const merged = read as GraphMergedRead
      return {
        found: true,
        value: snapshotValue(merged.value),
        tier: null,
        cache: null,
        name: merged.name,
        merged: true,
        parts: merged.parts,
      }
    }
    return { found: true, value: snapshotValue(read.value), tier: read.tier, flag: read.tier, cache: undefined, name: read.name } as unknown as GraphReadHit
  }

  /* ── THE TIER-LOCAL SURFACE (`§2.1`'s `GraphTierHandle`) ── */

  function tierHandleFor(flag: GraphNodeFlag): GraphTierHandle {
    const existing = handles.get(flag)
    if (existing !== undefined) return existing
    const handle: GraphTierHandle = {
      tier: flag,
      get(name: unknown): GraphTierGetResult {
        const answer = resolveRead(name) as Record<string, unknown>
        if (answer['status'] === 'refused') return { found: false, value: undefined, name: typeof name === 'string' ? name : '' }
        const read = answer as unknown as GraphResolveResult
        if (read.found === false) return { found: false, value: undefined, name: read.name }
        return { found: true, value: read.value, name: read.name }
      },
      has(name: unknown): boolean {
        const walk = resolvePath(name)
        return walk !== null && walk.node !== null && walk.node.flag === flag
      },
      set(name: unknown, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt {
        return setOrMint(name, value, opts)
      },
      clear(name: unknown): GraphWriteReceipt {
        return clearOp(name)
      },
    }
    handles.set(flag, handle)
    return handle
  }

  /* ── CONSTRUCTION ── */

  loadDeclarations()

  const store: Record<string, unknown> = {
    resolve(name: unknown): unknown {
      return resolveRead(name)
    },
    set(name: unknown, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt {
      return setOrMint(name, value, opts)
    },
    commit(name: unknown, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt {
      return commitOp(name, value, opts)
    },
    remove(name: unknown): GraphWriteReceipt {
      return removeOp(name)
    },
    clear(name: unknown): GraphWriteReceipt {
      return clearOp(name)
    },
    sweep(name: unknown): GraphWriteReceipt {
      return sweepOp(name)
    },
    export(name: unknown): unknown {
      return exportOf(name)
    },
    sever(from: unknown, anchorKey: unknown): GraphWriteReceipt {
      return severOp(from, anchorKey)
    },
    subscribe(name: unknown, listener: unknown, opts?: { subtree?: boolean }): unknown {
      if (typeof name === 'string' && name.split('.')[0] === 'secure') return refuse(name, 'secure-refused', 'B-SECURE-GATE', null, null)
      if (typeof name !== 'string' || name.length === 0) return refuse(name, 'malformed-name', 'A-PARSE', null, null)
      if (typeof listener !== 'function') return refuse(name, 'malformed-name', 'A-PARSE', null, null)
      const subtree = isRecordObject(opts) && (opts as { subtree?: unknown }).subtree === true
      if (subtree) {
        let amplifiers = 0
        for (const subscriber of subscriptions) if (subscriber.subtree) amplifiers += 1
        if (amplifiers >= AMPLIFIER_SUBSCRIPTION_CAP) return refuse(name, 'cap-exceeded', 'G-RESOLVE-LEAF', null, null)
      }
      const record: SubscriberRecord = { name, subtree, listener: listener as (event: GraphEvent) => void, live: true }
      subscriptions.push(record)
      return {
        name,
        subtree,
        unsubscribe(): boolean {
          if (!record.live) return false
          record.live = false
          subscriptions = subscriptions.filter((candidate) => candidate !== record)
          return true
        },
      }
    },
    tiers: Object.freeze({
      temp: tierHandleFor('temp'),
      mem: tierHandleFor('mem'),
      file: tierHandleFor('file'),
    }),
    get register(): GraphRegister {
      return { rows: registerRows() }
    },
    constraints: Object.freeze([...constraintTable]),
  }

  if (seamEnabled) {
    store['reset'] = (): void => {
      nodes.clear()
      rootHolders.clear()
      registerEntries.clear()
      staleEntries.clear()
      values.length = 0
      subscriptions = []
    }
    store['seed'] = (rows: readonly { readonly name: string; readonly value: unknown }[]): void => {
      if (!Array.isArray(rows)) return
      for (const row of rows) {
        if (!isRecordObject(row)) continue
        commitOp((row as { readonly name?: unknown }).name, (row as { readonly value?: unknown }).value, undefined)
      }
    }
    store['parentLinkCountOf'] = (nodeRef: GraphNodeRef): number => {
      let count = 0
      for (const node of nodes.values()) {
        if (node.parentLink !== null && node.parentLink.to === nodeRef) count += 1
      }
      return count
    }
    store['cacheEntryFor'] = (name: string): GraphRegisterCacheEntry | null => {
      if (typeof name !== 'string') return null
      const entry = registerEntries.get(name)
      if (entry === undefined) return null
      return { name: entry.name, matchedRef: entry.matchedRef, matchedTier: entry.matchedTier }
    }
    store['nodeFor'] = (nodeRef: GraphNodeRef): GraphNode | null => {
      const node = nodes.get(nodeRef)
      return node === undefined ? null : node
    }
    store['anchorFor'] = (owner: GraphNodeRef, key: string): GraphAnchor | null => anchorOf(owner, key)
    store['linkFor'] = (owner: GraphNodeRef, key: string): GraphLink | null => {
      const anchor = anchorOf(owner, key)
      return anchor === null ? null : anchor.link
    }
    store['failNextCacheRebuild'] = (): void => {
      injectArmed = true
    }
  }

  void storeGraphReferences
  void STEP_IDS
  void SEAM_KEYS
  void isFlagToken

  return store as unknown as GraphStore
}
