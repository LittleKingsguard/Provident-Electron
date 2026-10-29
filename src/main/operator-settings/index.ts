// src/main/operator-settings/index.ts — THE INSTANCE (D-16, D-17): the operator's security record
// and settings as ONE `provident-storeroom` instance of its own — its own lifetime, its own file,
// and no MCP path resolving into it (D-18). The declared surface is `docs/L3/security-store-storeroom/
// signatures.md` §2 and nothing else; the design is `design.md` §2-§8, whose §3/§8 name every private
// helper below so this file mints none of its own (the one exception: `plain`, reported at L4).
//
// TWO ADDRESSES, one per tier, and the measurement is why: a `file`-tier write purges the versions
// it outranks AT ITS OWN KEY, so one address would let a settings commit reset the operator's
// exclusion pair (guide §5.1; design.md §2). `['operator-settings']` carries the durable record
// WHOLE — `enabled` always, `token` and `maxJournalLength` only while they stand, `entries` iff it
// stands — and `['operator-exclusion']` carries `{exclusion}` alone, because a cleared member is
// written as its ABSENCE and the package's walk refuses `null`/`undefined` anywhere in a value
// (guide §10.1; persistence §4). `tier4` is derived at the read and never stored, so the illegal
// pair is unspellable (interface §1).
//
// ONE TRANSITION IS ONE STORE WRITE: one op, one cursor, one receipt, the store's own ordinals
// verbatim — no offset, no renumbering, and `write`'s fourth position never supplied, so its
// class-test arm is unreachable (guide §3.3, §6.4; interface §2 `ASM-L2-7`).
//
// IT WRITES NO FILE OF ITS OWN and makes exactly ONE `fs` call — `readFileSync` of the retired
// `provident-security.json` inside the import-once path, which is read once and never written,
// renamed, repaired or deleted (D-19; persistence §2, §3, §5). NO VERB HERE THROWS, for any patch
// and any state: every caught value is contained and every arm answers its declared answer (L1 §3).
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { storeCreate } from 'provident-storeroom'

/** The instance's own type, named here so the package import stays ONE name (`storeCreate`) —
 *  the six members called are `read`, `write`, `listen`, `register`, `unlisten` and the factory
 *  itself; `readLiteral`, `delete`, `rollback` and the four constraint members are never called. */
type Store = ReturnType<typeof storeCreate>

/** The durable row: the record minus the pair and the flag it derives (interface §1). */
type Row = Omit<OperatorSettingsRecord, 'exclusion' | 'tier4'>

export type OperatorSettingsAddress = readonly (string | number)[]

export interface OperatorSettingsRecord {
  token: string | null
  enabled: string[]
  maxJournalLength?: number
  entries?: Readonly<Record<string, unknown>>
  exclusion: 'mcp-enabled' | 'mcp-disabled'
  tier4: boolean
}

export interface OperatorSettingsPatch {
  token?: string | null
  enabled?: string[]
  maxJournalLength?: number | null
  entries?: Readonly<Record<string, unknown>>
  exclusion?: 'mcp-enabled' | 'mcp-disabled'
}

export type OperatorSettingsRefusalReason =
  | 'ValueRefusedAtBoundary' | 'FileCommitFailed' | 'FilePathUnreachable'
  | (string & {})                     // the store's OPEN escape arm, carried verbatim (interface §3)

export type OperatorSettingsReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: OperatorSettingsRefusalReason
      message: string; address: OperatorSettingsAddress | null }

export type OperatorSettingsListener = (address: OperatorSettingsAddress) => void

export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }

export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void      // answers the withdrawal
}

/** The group set's SECOND LIVE COPY (D-11, D-15; exception §2 E-1): six members, re-homed here with
 *  the file and read at the two filter sites — the patch's `enabled` and the import's `enabled`. */
const VALID_GROUPS: ReadonlySet<string> = new Set(['read', 'dispatch', 'graph', 'code', 'module', 'data'])
const RECORD_ADDRESS: OperatorSettingsAddress = ['operator-settings']
const EXCLUSION_ADDRESS: OperatorSettingsAddress = ['operator-exclusion']
const FILE_NAME = 'provident-operator-settings.json'
const RETIRED_NAME = 'provident-security.json'
/** The answer over no file and over every import-failure arm: `read`+`dispatch` on, token null
 *  (behaviour §1, §3). It is handed out only as a FRESH copy — never itself, never its array. */
const FIRST_RUN: Row = { token: null, enabled: ['read', 'dispatch'] }
/** What a boot, a crash, a torn record and a corrupt file all resolve to, because the pair is
 *  `mem` and is never persisted (interface §1 `ASM-L2-2`; behaviour §7). */
const SAFE_PAIR: { exclusion: 'mcp-enabled' | 'mcp-disabled'; tier4: boolean } = { exclusion: 'mcp-enabled', tier4: false }

/** The one monotonic source of handle names, so no two subscriptions share an identity (design §8). */
let issuance = 0

/** An object whose prototype is `Object.prototype` or `null`, and not an array: the plainness test
 *  the read arms, the patch, the `entries` map and the import each stand on (design §5, §6, §7). */
function plain(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false
  const proto: unknown = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/** The copy discipline's map half: `Object.create(null)`, so an entry named `__proto__` lands as an
 *  OWN data property and survives to the bytes and across a re-read (design §3; guide §10). */
function newMap(): Record<string, unknown> {
  return Object.create(null) as Record<string, unknown>
}

/** The copy discipline both ways: arrays as REAL arrays, maps built by `newMap`, every member read
 *  once and a container seen twice answered by its own copy — so the copy is cycle-safe and no
 *  served value shares a container with the record, at any depth (design §3, §5; guide §10). */
function detach(value: unknown): unknown {
  const seen = new Map<object, unknown>()
  const copy = (input: unknown): unknown => {
    if (input === null || typeof input !== 'object') return input
    const held = seen.get(input)
    if (held !== undefined) return held
    if (Array.isArray(input)) {
      const list: unknown[] = []
      seen.set(input, list)
      for (const member of input) list.push(copy(member))
      return list
    }
    const map = newMap()
    seen.set(input, map)
    for (const name of Object.keys(input)) map[name] = copy((input as Record<string, unknown>)[name])
    return map
  }
  return copy(value)
}

/** First occurrence first, in the CALLER's own order, a non-group string dropped, never re-sorted
 *  into `VALID_GROUPS` order — the order row discriminates against a re-sort (interface §2 `A-5`). */
function admitGroups(list: readonly unknown[]): string[] {
  const admitted: string[] = []
  for (const name of list) if (typeof name === 'string' && VALID_GROUPS.has(name) && !admitted.includes(name)) admitted.push(name)
  return admitted
}

/** The value that crosses: a CLEARED member is written as its ABSENCE, because the walk refuses
 *  `null`/`undefined` anywhere in a value (design §3; persistence §4; guide §10.1). */
function toStored(row: Row): Record<string, unknown> {
  const value: Record<string, unknown> = { enabled: [...row.enabled] }
  if (typeof row.token === 'string' && row.token !== '') value.token = row.token
  if (row.maxJournalLength !== undefined) value.maxJournalLength = row.maxJournalLength
  if (row.entries !== undefined) value.entries = detach(row.entries)
  return value
}

/** The read-back mapping: no `token` → `null`, no cap → `undefined`, no `entries` → absent, and a
 *  member failing its own rule falls to its first-run value (design §3; interface §2). */
function fromStored(value: Record<string, unknown>): Row {
  const row: Row = {
    token: typeof value.token === 'string' && value.token !== '' ? value.token : FIRST_RUN.token,
    enabled: Array.isArray(value.enabled) ? admitGroups(value.enabled) : [...FIRST_RUN.enabled],
  }
  const cap = value.maxJournalLength
  if (typeof cap === 'number' && Number.isFinite(cap) && cap > 0) row.maxJournalLength = Math.floor(cap)
  if (plain(value.entries)) row.entries = detach(value.entries) as Readonly<Record<string, unknown>>
  return row
}

/** The boot import, six arms each answering without a throw, and the module's ONE `fs` call: the
 *  retired name is READ here and never written, renamed, repaired or deleted (design §7; D-19).
 *  A foreign top-level name copies into the entries map VERBATIM under its own name — preserved,
 *  never dropped — so the operator's token, grants, cap and arbitrary entries all survive (behaviour
 *  §3). Nothing is imported when the file is absent, unparsable, not an object or unreadable. */
function importOnce(userDataDir: string): Row | undefined {
  let text: string
  try { text = readFileSync(join(userDataDir, RETIRED_NAME), 'utf8') } catch { return undefined }
  let parsed: unknown
  try { parsed = JSON.parse(text) } catch { return undefined }
  if (!plain(parsed)) return undefined
  const source = parsed
  const declared = (name: string): boolean => name === 'token' || name === 'enabled' || name === 'maxJournalLength' || name === 'entries'
  const row: Row = {
    token: typeof source.token === 'string' && source.token !== '' ? source.token : FIRST_RUN.token,
    enabled: Array.isArray(source.enabled) ? admitGroups(source.enabled) : [...FIRST_RUN.enabled],
  }
  const cap = source.maxJournalLength
  if (typeof cap === 'number' && Number.isFinite(cap) && cap > 0) row.maxJournalLength = Math.floor(cap)
  const map = newMap()
  let carries = false
  if (plain(source.entries)) {
    for (const name of Object.keys(source.entries)) map[name] = (source.entries as Record<string, unknown>)[name]
    carries = true
  }
  for (const name of Object.keys(source)) {
    if (declared(name)) continue
    map[name] = source[name]
    carries = true
  }
  if (carries) row.entries = map
  return row
}

/** The store's own ordinals VERBATIM — no offset and no renumbering (design §3; guide §6.4). */
function receiptOf(record: ReturnType<Store['write']>): OperatorSettingsReceipt {
  return { status: 'committed', cursor: record.op.seq, opId: record.op.opId }
}

/** The store's `status`, `message` and `address` VERBATIM under the open escape arm; a caught value
 *  carrying no string `status` is not a store refusal at all and crosses as `UnattributedFailure`
 *  with its own sentence — contained, never re-spelled (interface §3; guide §8, §8.3). */
function refusalOf(caught: unknown, address: OperatorSettingsAddress | null): OperatorSettingsReceipt {
  let status: unknown
  let message: unknown
  let carried: unknown = address
  try {
    const failure = caught as { status?: unknown; message?: unknown; address?: unknown } | null
    status = failure?.status
    message = failure?.message
    if (failure !== null && typeof failure === 'object' && Object.prototype.hasOwnProperty.call(failure, 'address')) carried = failure.address
  } catch { /* a hostile thrown value names nothing, so the arm keeps its own address */ }
  const named = typeof status === 'string' && status !== ''
  const sentence = typeof message === 'string' && message !== ''
    ? message
    : named ? 'the store refused the act' : 'the store threw a value carrying no status'
  return {
    status: 'refused',
    reason: named ? status as string : 'UnattributedFailure',
    message: sentence,
    address: carried === null ? null : Array.isArray(carried) ? detach(carried) as OperatorSettingsAddress : address,
  }
}

/** A positive integer, because the store's required key cannot be absent (`ASM-3`; guide §3.1). */
function cap(journalLength: number | undefined): number {
  const supplied = typeof journalLength === 'number' && Number.isFinite(journalLength) && journalLength > 0
    ? Math.floor(journalLength)
    : 0
  return supplied > 0 ? supplied : 256
}

/** The handle identity, minted here and held by the caller — one per subscription PER ADDRESS, so
 *  the withdrawal is `unlisten` over a ONE-address handle, the arm the package silences (design §8
 *  `ASM-7`; behaviour §5). */
function seq(): number {
  issuance += 1
  return issuance
}

function handleFor(address: OperatorSettingsAddress): string {
  return 'operator-settings:' + seq() + '@' + address.map(String).join('/')
}

/** The withdrawal: one `unlisten` per handle, a no-op success over a handle already withdrawn, and
 *  never a throw — so calling an answered withdrawal twice is harmless (design §8; guide §6.2). */
function withdraw(store: Store, handles: readonly string[]): void {
  for (const handle of handles) {
    try { store.unlisten(handle) } catch { /* a withdrawal answers nothing, not even a failure */ }
  }
}

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings {
  let store: Store | null = null
  let refusal: OperatorSettingsReceipt | null = null
  let overlay: Row | null = null
  try {
    store = storeCreate({ journalLength: cap(options.journalLength), listeners: [], filePath: join(options.userDataDir, FILE_NAME) })
  } catch (caught) {
    // A refused construction throws nothing across this boundary: no instance stands and every
    // later write answers this value (design §4 `ASM-4`; interface §2.1; guide §8.2).
    refusal = refusalOf(caught, null)
  }
  if (store !== null) {
    const standing = store
    let carries = true
    try { standing.read(RECORD_ADDRESS, 'file') } catch { carries = false }
    // THE MARKER IS THE ABSENCE OF A RECORD AT THE RECORD ADDRESS: no version member, no second
    // written name, and the import only over a standing instance (design §7; persistence §3).
    if (!carries) overlay = importOnce(options.userDataDir) ?? null
  }

  const read = (): OperatorSettingsRecord => {
    const standing = store
    let durable: unknown
    let pair: unknown
    if (standing !== null) {
      // Two reads in ONE synchronous turn with no `await` between them, and `AddressNotFound` /
      // `TierNotFound` / any other failure resolving to the defaults: a read is never a refusal
      // and this surface has no channel for one (design §5; interface §2).
      try { durable = standing.read(RECORD_ADDRESS, 'file') } catch { durable = undefined }
      try { pair = standing.read(EXCLUSION_ADDRESS, 'mem') } catch { pair = undefined }
    }
    const row = plain(durable) ? fromStored(durable) : (overlay ?? FIRST_RUN)
    const exclusion: 'mcp-enabled' | 'mcp-disabled' = plain(pair) && (pair.exclusion === 'mcp-disabled' || pair.exclusion === 'mcp-enabled')
      ? pair.exclusion
      : SAFE_PAIR.exclusion
    const answer: OperatorSettingsRecord = { token: row.token, enabled: [...row.enabled], exclusion, tier4: exclusion === 'mcp-disabled' }
    if (row.maxJournalLength !== undefined) answer.maxJournalLength = row.maxJournalLength
    if (row.entries !== undefined) answer.entries = detach(row.entries) as Readonly<Record<string, unknown>>
    return answer
  }

  const write = (patch: OperatorSettingsPatch): OperatorSettingsReceipt => {
    const standing = store
    // THE NO-INSTANCE ARM IS FIRST, before any member-domain logic: even a well-formed pair patch
    // answers the construction's own refusal (design §4; interface §2.1).
    if (refusal !== null) return refusal
    if (standing === null) return { status: 'refused', reason: 'FilePathUnreachable', message: 'no instance stands behind this module', address: null }
    const refuse = (message: string): OperatorSettingsReceipt =>
      ({ status: 'refused', reason: 'ValueRefusedAtBoundary', message, address: null })
    // Every declared member is read ONCE, inside this ONE try/catch: a hostile `Proxy`, a getter
    // trap, `null`, `undefined` and any primitive answer a receipt and never a throw (design §6).
    let hasToken = false
    let token: unknown
    let hasEnabled = false
    let enabled: unknown
    let hasCap = false
    let max: unknown
    let hasEntries = false
    let entries: unknown
    let hasExclusion = false
    let exclusion: unknown
    try {
      const source = patch as unknown
      if (!plain(source)) return refuse('the patch is not a plain object')
      const own = (name: string): boolean => Object.prototype.hasOwnProperty.call(source, name)
      if (own('token')) { hasToken = true; token = source.token }
      if (own('enabled')) { hasEnabled = true; enabled = source.enabled }
      if (own('maxJournalLength')) { hasCap = true; max = source.maxJournalLength }
      if (own('entries')) { hasEntries = true; entries = source.entries }
      if (own('exclusion')) { hasExclusion = true; exclusion = source.exclusion }
    } catch (caught) {
      return refusalOf(caught, null)
    }
    const durable = hasToken || hasEnabled || hasCap || hasEntries
    // A patch NAMES ONE TIER: both is two writes, which is two receipts or a landed-then-refused
    // tear, so it is refused as a value with no store call (interface §1 `ASM-L2-5`; design §10 ASM-2).
    if (hasExclusion && durable) return refuse('the patch names both tiers, and a patch names one')
    if (!hasExclusion && !durable) return refuse('the patch names no member of either tier')
    if (hasExclusion) {
      if (exclusion !== 'mcp-enabled' && exclusion !== 'mcp-disabled') return refuse('exclusion is mcp-enabled or mcp-disabled')
      try { return receiptOf(standing.write(EXCLUSION_ADDRESS, 'mem', { exclusion })) } catch (caught) { return refusalOf(caught, EXCLUSION_ADDRESS) }
    }
    try {
      // The whole record value is composed from `read()`'s durable row overridden by the supplied
      // members, and a cleared member is written as its ABSENCE — never as `null` (design §6).
      const current = read()
      let nextToken: string | null = current.token
      if (hasToken) {
        if (token === null || token === '') nextToken = null
        else if (typeof token === 'string') nextToken = token
        else return refuse('token is a non-empty string or null')
      }
      let nextEnabled: string[] = [...current.enabled]
      if (hasEnabled) {
        if (!Array.isArray(enabled)) return refuse('enabled is an array of group names')
        nextEnabled = admitGroups(enabled)
      }
      let nextCap: number | undefined = current.maxJournalLength
      if (hasCap) {
        if (max === null) nextCap = undefined
        else if (typeof max !== 'number') return refuse('maxJournalLength is a finite number or null')
        // The landed clear/refuse split carried verbatim: `null`, `NaN` and a non-positive value
        // CLEAR the cap, while `±Infinity` REFUSES the patch with no store verb at all.
        else if (Number.isNaN(max) || max <= 0) nextCap = undefined
        else if (!Number.isFinite(max)) return refuse('maxJournalLength is a finite number or null')
        else nextCap = Math.floor(max)
      }
      let nextEntries: Readonly<Record<string, unknown>> | undefined = current.entries
      if (hasEntries) {
        if (!plain(entries)) return refuse('entries is a plain object of names to values')
        const map = newMap()
        for (const name of Object.keys(entries)) map[name] = entries[name]
        nextEntries = map
      }
      const row: Row = { token: nextToken, enabled: nextEnabled }
      if (nextCap !== undefined) row.maxJournalLength = nextCap
      if (nextEntries !== undefined) row.entries = nextEntries
      // ONE write at the one address the patch names, and the fourth position never supplied.
      return receiptOf(standing.write(RECORD_ADDRESS, 'file', toStored(row)))
    } catch (caught) {
      return refusalOf(caught, RECORD_ADDRESS)
    }
  }

  const subscribe = (listener: OperatorSettingsListener): (() => void) => {
    const standing = store
    // No instance stands, or the subscriber is no callable at all: a withdrawal that withdraws
    // nothing, and never a throw (design §4, §8; behaviour §5).
    if (standing === null || typeof listener !== 'function') return () => {}
    const handles: string[] = []
    const addresses: readonly OperatorSettingsAddress[] = [RECORD_ADDRESS, EXCLUSION_ADDRESS]
    const body = (address: OperatorSettingsAddress): void => {
      // The delivery carries the address and nothing else, so the subscriber reads the record for
      // what moved; a THROW IS CONTAINED HERE and withdraws that subscriber WHOLE — both handles —
      // so the write that triggered it still answers its receipt (design §8; `ASM-L2-6`).
      try { listener(detach(address) as OperatorSettingsAddress) } catch { withdraw(standing, handles) }
    }
    try {
      for (const address of addresses) {
        const handle = handleFor(address)
        standing.listen(handle, [address])
        handles.push(handle)
        standing.register(handle, body)
      }
    } catch {
      withdraw(standing, handles)
    }
    return () => withdraw(standing, handles)
  }

  return { read, write, subscribe }
}
