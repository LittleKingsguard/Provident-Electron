// src/main/operator-settings/index.ts — THE INSTANCE (D-16, D-17): the operator's security record
// and settings as ONE `provident-storeroom` instance of its own — its own lifetime, its own file,
// and no MCP path resolving into it (D-18). The declared surface is `docs/L3/security-store-storeroom/
// signatures.md` §2 and nothing else; the design is `design.md` §2-§8, whose §3/§8 name every private
// helper below so this file mints none of its own (the one exception: `plain`, reported at L4).
//
// THREE ADDRESSES, and the measurement is why: a `file`-tier write purges the versions it outranks
// AT ITS OWN KEY, so one address would let a settings commit reset the operator's exclusion pair
// (guide §5.1; design.md §2). `['operator-settings']` carries the durable record
// WHOLE — `enabled` always, `token` and `maxJournalLength` only while they stand, `entries` iff it
// stands — and `['operator-exclusion']` carries `{exclusion}` alone, because a cleared member is
// written as its ABSENCE and the package's walk refuses `null`/`undefined` anywhere in a value
// (guide §10.1; persistence §4). `tier4` is derived at the read and never stored, so the illegal
// pair is unspellable (interface §1).
//
// THE THIRD ADDRESS — `['operator-app-state']` on `file` — carries the retired carrier's rows WHOLE
// as `{rows: [{name, value}, …]}`, an ORDERED array and never a name→value map, because the
// crossing does not preserve an object's member order while a genuine array's survives exactly
// (persistence §3; interface §1). Its two verbs are `readAppState`/`writeAppState`: one store write
// per act, the sibling's own receipt, and NO listener — `subscribe` binds the two addresses above
// (design §2; L1 §3). Its second import-once arm reads the retired carrier at most once and writes
// no byte of it, and the diagnosis it answers is the BOOT's, served for the process's life
// (design §2.2; interface §2).
//
// ONE TRANSITION IS ONE STORE WRITE: one op, one cursor, one receipt, the store's own ordinals
// verbatim — no offset, no renumbering, and `write`'s fourth position never supplied, so its
// class-test arm is unreachable (guide §3.3, §6.4; interface §2 `ASM-L2-7`).
//
// IT WRITES NO FILE OF ITS OWN and makes exactly TWO `fs` calls — the two import-once reads: the
// retired `provident-security.json` inside the first path, and the retired settings carrier inside
// the second. Each is read once and never written, renamed, repaired or deleted (D-19; persistence
// §2, §3, §5). NO VERB HERE THROWS, for any patch, any rows list and any state: every caught value
// is contained and every arm answers its declared answer (L1 §3).
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { storeCreate } from 'provident-storeroom'

/** The instance's own type, named here so the package import stays ONE name (`storeCreate`) —
 *  the six members called are `read`, `write`, `listen`, `register`, `unlisten` and the factory
 *  itself; `readLiteral`, `delete`, `rollback` and the four constraint members are never called. */
type Store = ReturnType<typeof storeCreate>

/** The durable row: the record minus the pair and the flag it derives (interface §1). */
type Row = Omit<OperatorSettingsRecord, 'exclusion' | 'tier4'>

/** The second import arm's answer as it is HELD: the four members an answer carries minus `storage`,
 *  which is the read's own member and never an arm's (signatures §3; design §2.2). */
type AppStateImport = Omit<AppStateAnswer, 'storage'>

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

/** The app-state row: a name carried VERBATIM and the value under it, in the carrier's own order
 *  (`A-2`). A name is a member of a row and never a path segment, so nothing is interpreted. */
export interface AppStateRow { name: string; value: unknown }

/** The boot-time diagnosis, served for the process's life and never written: the second import
 *  arm's three words plus the fourth L1 §4 does not name — a record stood, so no arm applied
 *  (interface §2 `ASM-L2-1`; L1 §4 `ASM-4`). */
export type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'

/** The third address's whole answer: the rows, the arm that ran, the names the import could not
 *  carry, and whether a store stands at all (`storage` is the refused construction as a READ,
 *  interface §2 `ASM-L2-3`). */
export interface AppStateAnswer {
  rows: AppStateRow[]
  legacy: AppStateLegacy
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}

export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }

export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void      // answers the withdrawal
  readAppState(): AppStateAnswer
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
}

/** The group set's SECOND LIVE COPY (D-11, D-15; exception §2 E-1): six members, re-homed here with
 *  the file and read at the two filter sites — the patch's `enabled` and the import's `enabled`. */
const VALID_GROUPS: ReadonlySet<string> = new Set(['read', 'dispatch', 'graph', 'code', 'module', 'data'])
const RECORD_ADDRESS: OperatorSettingsAddress = ['operator-settings']
const EXCLUSION_ADDRESS: OperatorSettingsAddress = ['operator-exclusion']
/** THE THIRD DURABLE ADDRESS, beside the record and not inside its value: a `file`-tier write
 *  purges at its own key, so a module write can never compose a value carrying the token
 *  (interface §1; design §2; L1 §3 `ASM-1`). */
const APP_STATE_ADDRESS: OperatorSettingsAddress = ['operator-app-state']
const FILE_NAME = 'provident-operator-settings.json'
const RETIRED_NAME = 'provident-security.json'
/** The retired tier-1 carrier, spelled ONCE in `src/**`: read by the second import-once arm and
 *  written by none (behaviour §8 `RET-2`; persistence §4; L1 §4). */
const RETIRED_SETTINGS_NAME = 'provident-settings.json'
/** The absent answer the second arm's other branches start from. Its arrays are NEVER served: every
 *  `rows` and every `unrepresentable` an answer carries is fresh (`FIRST_RUN`'s discipline). */
const NO_IMPORT: AppStateImport = { rows: [], legacy: 'absent', unrepresentable: [] }
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

/**
 * THE SECOND IMPORT-ONCE ARM — the retired tier-1 carrier, read AT MOST ONCE and never written,
 * renamed, repaired or deleted: the module's SECOND and last `fs` call (L1 §4; persistence §4).
 * The validation is the retired boot read's own, carried whole — a JSON object whose keys are
 * `file.*` names plus the single reserved `schemaVersion === '1'` — so what the old code loaded is
 * what this one imports (behaviour §7 `ASM-L2-7`; L1 §4 `ASM-3`). `absent` and `corrupt` are told
 * apart from the CAUGHT error's own `code`, never by a second `fs` call: a directory (`EISDIR`) and
 * an unreadable file (`EACCES`) are `corrupt` (design §2.2, §6 `ASM-1`). A row whose value carries
 * `null`/`undefined` cannot be represented, so it is answered BY NAME and never dropped (L1 §4).
 */
function importAppStateOnce(userDataDir: string): AppStateImport {
  let text: string
  try { text = readFileSync(join(userDataDir, RETIRED_SETTINGS_NAME), 'utf8') } catch (caught) {
    return missing(caught) ? NO_IMPORT : { rows: [], legacy: 'corrupt', unrepresentable: [] }
  }
  let parsed: unknown
  try { parsed = JSON.parse(text) } catch { return { rows: [], legacy: 'corrupt', unrepresentable: [] } }
  if (!plain(parsed)) return { rows: [], legacy: 'corrupt', unrepresentable: [] }
  for (const name of Object.keys(parsed)) {
    if (name !== 'schemaVersion' && !name.startsWith('file.')) return { rows: [], legacy: 'corrupt', unrepresentable: [] }
  }
  if (parsed.schemaVersion !== '1') return { rows: [], legacy: 'corrupt', unrepresentable: [] }
  // THE RECORD'S OWN ORDER, in, and `schemaVersion` skipped: the retired record's format marker is
  // not operator state and is never carried as a row (L1 §4; D-13).
  const rows: AppStateRow[] = []
  const unrepresentable: string[] = []
  for (const name of Object.keys(parsed)) {
    if (name === 'schemaVersion') continue
    const value = parsed[name]
    if (representable(value)) rows.push({ name, value })
    else unrepresentable.push(name)
  }
  return { rows, legacy: 'imported', unrepresentable }
}

/** The caught value's own `code === 'ENOENT'`: `absent` and `corrupt` are told apart from the ONE
 *  `readFileSync`, never by a probe (design §2.2, §6 `ASM-1`). */
function missing(caught: unknown): boolean {
  const code = (caught as { code?: unknown } | null)?.code
  return code === 'ENOENT'
}

/** `false` iff the value carries `null` or `undefined` anywhere at any depth — the ONE refusal the
 *  import tests, because the package publishes no admission predicate (`guide §10.1`; persistence
 *  §8 `P-1`, `ASM-L2-9`). Everything else it cannot carry is the store's refusal at the first commit,
 *  with its own status verbatim. */
function representable(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value !== 'object') return true
  const pending: unknown[] = [value]
  while (pending.length > 0) {
    const here = pending.pop()
    if (here === null || here === undefined) return false
    if (typeof here !== 'object') continue
    for (const name of Object.keys(here)) {
      const member = (here as Record<string, unknown>)[name]
      if (member === null || member === undefined) return false
      if (typeof member === 'object') pending.push(member)
    }
  }
  return true
}

/** The marker is the record's PRESENCE: a plain object carrying a genuine array at `rows` — no
 *  version member, no marker file and no second written name (persistence §4; `guide §9.1`). */
function recordedAt(value: unknown): boolean {
  if (!plain(value)) return false
  return Array.isArray(value.rows)
}

/** The read-back: `undefined` where no record stands, else the rows in their committed order with
 *  every value detached. A stored row that fails the declared `{name, value}` shape on read-back is
 *  SKIPPED and its siblings served — never `[]` for the whole record (design §6 `ASM-4`; `guide §10`). */
function fromAppState(value: unknown): AppStateRow[] | undefined {
  if (!recordedAt(value)) return undefined
  const rows: AppStateRow[] = []
  for (const row of (value as { rows: unknown[] }).rows) {
    if (!plain(row)) continue
    const name: unknown = row.name
    if (typeof name !== 'string' || name === '') continue
    if (!Object.prototype.hasOwnProperty.call(row, 'value')) continue
    rows.push({ name, value: detach(row.value) })
  }
  return rows
}

/** THE WRITE BOUNDARY: each row composed as EXACTLY `{name, value}` (a caller's extra member does not
 *  cross), wrapped as `{rows}`, imaged through `JSON.stringify`/`JSON.parse` — so an own member whose
 *  value is `undefined` crosses as ABSENCE, exactly as the retired carrier's `JSON.stringify` dropped
 *  it, and `undefined` where no image can be minted (persistence §3; interface §7 `ASM-L2-2`;
 *  design §6 `ASM-5`). */
function toAppState(rows: readonly AppStateRow[]): Record<string, unknown> | undefined {
  try {
    const carried: unknown[] = []
    for (const row of rows) carried.push({ name: row.name, value: row.value })
    const image: unknown = JSON.parse(JSON.stringify({ rows: carried }))
    return plain(image) ? image : undefined
  } catch {
    return undefined
  }
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

  // THE SECOND ARM'S MARKER IS ITS OWN ADDRESS, and the diagnosis it answers is the BOOT'S: a
  // record standing at construction means no arm applies and the fourth word is served; otherwise
  // one read of the retired carrier runs HERE and its answer is held — the rows it carries stand in
  // memory until an ordinary write supersedes them, and nothing is written (interface §2; L1 §4;
  // persistence §4). A refused construction stands at `absent`, because no record was read and no
  // arm ran (interface §2 `ASM-L2-3`).
  let appLegacy: AppStateLegacy = 'absent'
  let appImport: AppStateImport = NO_IMPORT
  if (store !== null) {
    const standing = store
    let stands = false
    try { stands = recordedAt(standing.read(APP_STATE_ADDRESS, 'file')) } catch { stands = false }
    if (stands) appLegacy = 'recorded'
    else {
      appImport = importAppStateOnce(options.userDataDir)
      appLegacy = appImport.legacy
    }
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

  // THE THIRD ADDRESS'S READ: each answer re-projects the store, so the import overlay is served
  // ONLY while nothing stands at the address, and `legacy` — fixed at construction — never moves
  // (interface §2; persistence §4; behaviour §7). No record, no arm and no store: the empty answer
  // with `storage:'unreachable'`, never a throw (interface §2 `ASM-L2-3`).
  const readAppState = (): AppStateAnswer => {
    const standing = store
    if (standing === null) return { rows: [], legacy: appLegacy, unrepresentable: [], storage: 'unreachable' }
    let held: unknown
    try { held = standing.read(APP_STATE_ADDRESS, 'file') } catch { held = undefined }
    const recorded = fromAppState(held)
    if (recorded !== undefined) return { rows: recorded, legacy: appLegacy, unrepresentable: [], storage: 'standing' }
    const rows: AppStateRow[] = []
    for (const row of appImport.rows) rows.push({ name: row.name, value: detach(row.value) })
    return { rows, legacy: appLegacy, unrepresentable: [...appImport.unrepresentable], storage: 'standing' }
  }

  // THE THIRD ADDRESS'S ONE WRITE, and its receipt is the SIBLING'S: the store's `cursor`/`opId` or
  // the store's `reason`/`message`/`address` verbatim, never a second vocabulary (interface §2).
  // NO VERB HERE THROWS FOR ANY ARGUMENT: the construction's refusal is answered FIRST, before any
  // admission; then every argument-shape failure and every caught value raised before the store is
  // called answers THIS module's own `ValueRefusedAtBoundary` sentence with `address:null`
  // (interface §6 `ASM-L2-6`; design §2.1, §6 `ASM-5`).
  const writeAppState = (rows: readonly AppStateRow[]): OperatorSettingsReceipt => {
    const standing = store
    if (refusal !== null) return refusal
    if (standing === null) return { status: 'refused', reason: 'FilePathUnreachable', message: 'no instance stands behind this module', address: null }
    const refuse = (message: string): OperatorSettingsReceipt =>
      ({ status: 'refused', reason: 'ValueRefusedAtBoundary', message, address: null })
    let candidate: Record<string, unknown> | undefined
    try {
      if (!Array.isArray(rows)) return refuse('the rows are an array of app-state rows')
      const admitted: AppStateRow[] = []
      const named: string[] = []
      for (const row of rows) {
        if (!plain(row)) return refuse('a row is a plain object carrying a name and a value')
        const name: unknown = row.name
        if (typeof name !== 'string' || name === '') return refuse('a row names a non-empty string')
        if (named.includes(name)) return refuse('two rows name one name')
        named.push(name)
        admitted.push({ name, value: row.value })
      }
      candidate = toAppState(admitted)
    } catch {
      return refuse('the rows could not be read as an app-state row list')
    }
    if (candidate === undefined) return refuse('the rows have no JSON image, so no record can carry them')
    try {
      // ONE write at the one address, and the fourth position never supplied.
      return receiptOf(standing.write(APP_STATE_ADDRESS, 'file', candidate))
    } catch (caught) {
      return refusalOf(caught, APP_STATE_ADDRESS)
    }
  }

  return { read, write, subscribe, readAppState, writeAppState }
}
