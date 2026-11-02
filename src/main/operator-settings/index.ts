// src/main/operator-settings/index.ts — THE INSTANCE (D-16, D-17): the operator's security record
// and settings as ONE `provident-storeroom` instance of its own — its own lifetime, its own file,
// and no MCP path resolving into it (D-18). The declared surface is `docs/L3/security-store-storeroom/
// signatures.md` §2 and nothing else; the design is `design.md` §2-§8, whose §3/§8 name every private
// helper below so this file mints none of its own but the declaration machinery `D-84` adds — `repairAnswer`,
// `mintExclusion`, `exclusionMustStand` and the batch itself, all named in that table (the one L4 exception:
// `plain`, reported at L4).
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
// **THE VOLATILE PAIR'S EXISTENCE IS AN ENFORCED INVARIANT OF THE INSTANCE AND NO LONGER A READ-SIDE DEFAULT** (D-84):
// one declaration rides the construction's `constraints` batch — `operator-exclusion-must-stand` at
// `['operator-exclusion']` — whose body refuses an address holding nothing and whose repair mints `SAFE_PAIR`'s own
// value as ONE whole `{exclusion}` at `mem`. **That address cannot come from a file, so a repair at creation on EVERY
// boot is its only lawful source under the convention's clause 3**, and the boot value stops being the code constant
// substituted at a read. **THE TWO `file` ADDRESSES CARRY NO DECLARATION YET, AND THE REASON IS MEASURED**: each of them
// is MARKED BY ABSENCE by one of this module's two import-once arms, so a creation repair there retires an import
// silently — the record address's would lose a retired `provident-security.json`'s token, grants, cap and entries, and
// the app-state address's would collapse `legacy` to `'recorded'` and never import the retired carrier. Closing those two
// needs a marker a repair cannot forge, which is a ruling and not this pass's (`D-84`, `D-82`'s `V2`/`V3`/`V4` open).
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

/** The group set's SECOND LIVE COPY (D-11, D-15; exception §2 E-1): six members, re-homed with the
 *  file and filtered at THREE sites — `fromStored` on every `read()`, `importOnce`, the patch. */
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

/** The boot import, six arms each answering without a throw, and the module's FIRST `fs` call: the
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

/** **THE REPAIR'S TWO ARMS, DECLARED AS A TYPE SO A `void` REPAIR IS A COMPILE ERROR HERE TOO** (`D-72`, `D-84`).
 *  This module exports one VALUE name and this is not a second one (`signatures.md` §1/§2, the census row that reads
 *  `Object.keys` of the module entry): the constraint machinery below stands INSIDE the instance, which is what makes
 *  it different from the tab record's batch — the crossing there is a module the boot hands a store, while this
 *  instance CONSTRUCTS its own and is the only consumer of its own declarations. **So the declaration types are local
 *  and `npm run typecheck` is the leg that holds them**, where `tabs-record`'s are exported because the boot annotates
 *  against them (`src/main/tabs-record/index.ts`'s `TabsRepairAnswer`, `D-72`).
 *
 *  **THE CREDITED ARM CARRIES `op` AND NEVER A MAYBE**: `undefined`, `void` and a bare `{ok: true}` are not written
 *  here on any release. At `1.9.0` the package *would* credit an op-less repair — it credits by the legs its own write
 *  wrote — and the reason this module takes none of that licence is the one `D-72` records: the explicit arm states the
 *  intent and stays correct after a bump, and at `1.7.0` a `void` return is still refused `KC-4` naming the CALLER's
 *  address (`ST-F2`, filed upstream, never patched here — D-5). */
interface RepairCredited { readonly ok: true; readonly op: unknown }
interface RepairFailed { readonly ok: false; readonly message: string }
type RepairAnswer = RepairCredited | RepairFailed

/** **THE BODY'S CLOSED THREE-ARM SET, IN THE PACKAGE'S OWN WORDS** (`guide §7.2`, `§7.6`): `true` is the only pass value,
 *  `{message, repair}` a repairable violation, `{message}` one no repair answers. **`repair?: never` ON THE THIRD ARM IS
 *  THE WHOLE OF ITS JOB** — written as a bare `{message: string}` the union was assignable from a shape carrying a
 *  `void` repair, because excess-property checking reads the union's WHOLE member set (measured 2026-11-02,
 *  `src/main/tabs-record/index.ts`'s `TabsConstraintAnswer`); `never` makes that arm refuse the member outright. */
type ConstraintAnswer =
  | true
  | { readonly message: string; readonly repair: (context: unknown) => RepairAnswer }
  | { readonly message: string; readonly repair?: never }

/** One element of the batch the construction adopts (`StoreConfig['constraints']`): the pair, and the body the engine
 *  asks at every instant the pair's address is touched. */
interface ConstraintDeclaration {
  readonly address: OperatorSettingsAddress
  readonly id: string
  readonly constraint: (context: unknown) => ConstraintAnswer
}

/** **`['operator-exclusion']`'s EXISTENCE IS AN ENFORCED INVARIANT OF THE INSTANCE, AND ITS REPAIR IS ITS ONLY LAWFUL
 *  SOURCE OF BOOT DATA** (`D-84`, closing `D-82`'s `V5` and one of `V1`'s three addresses). The address is `mem`, so it
 *  can never come from a file: before this pair, a boot's value came from the code constant `SAFE_PAIR` substituted at
 *  the READ — measured 2026-11-02 on this head, `read(['operator-exclusion'],'mem')` refuses `AddressNotFound` and
 *  `read()` answers `exclusion:'mcp-enabled'` over an address holding nothing, so the constant was simultaneously the
 *  record's default and its only authority. Under the convention's clause 3 — *boot data comes from file or constraint
 *  repairs* — a `mem` address has exactly one lawful source, and a **repair at creation on EVERY boot** is it.
 *
 *  **SO THIS IS THE ONE DECLARATION OF THE THREE `D-82` NAMED THAT CAN STAND, AND THAT IS MEASURED RATHER THAN
 *  PREFERRED.** The instance's two `file` addresses are MARKED BY ABSENCE: `importOnce` runs iff
 *  `read(['operator-settings'],'file')` throws, and the second import arm runs iff `['operator-app-state']` holds no
 *  recorded value. A creation repair at either makes its marker permanently true and silently RETIRES an import —
 *  measured 2026-11-02 over a profile seeded with a retired `provident-security.json` carrying a token, three grants, a
 *  cap and one entry: as this head stands, `read()` answers all four; with a declaration at `['operator-settings']` it
 *  answers `token:null` / `enabled:['read','dispatch']` and the retired values are GONE. `['operator-app-state']` is the
 *  same fact with a different marker: with a declaration there, `legacy` reads `'recorded'` on every arm and the retired
 *  carrier's rows never import. **Both are reported, not built** (`D-84`): a marker a repair cannot forge is a ruling
 *  this pass does not hold. The `mem` pair has no import arm, writes no byte and marks nothing — so it is declarable. */
const EXCLUSION_MUST_STAND_ID = 'operator-exclusion-must-stand'
/** **THE SENTENCE NAMES THE FAULT AND NOT THE ACT** — the register of L2 §3 and of the tab record's five: the address
 *  holds no version of the pair, which is why nothing can be read there, and `tier4` is a DERIVED member and never part
 *  of what is missing (interface §1). */
const EXCLUSION_ABSENT_MESSAGE = "the operator exclusion does not stand at its address, so no 'mem' version of the pair exists"
/** **THE ONE PLACE A REPAIR'S ANSWER IS CONSTRUCTED** (`D-72`): a `repair` returns the op its own write landed, and the
 *  store's refusal arm is not swallowed — a receipt with no `op` answers `null`, which is the failed value the kernel
 *  refuses as *"produced no op"*, and the write that produced it has already said why. */
function repairAnswer(receipt: unknown): RepairCredited {
  return { ok: true, op: plain(receipt) ? (receipt as Record<string, unknown>)['op'] : null }
}

/** **THE REPAIR MINTS THE PAIR FROM `SAFE_PAIR` AND WRITES ONE WHOLE LEGAL VALUE AT THE ONE ADDRESS** (`D-84`). The value
 *  is `{exclusion}` ALONE — the same shape the module's own transition write composes — because `tier4` is derived at the
 *  read and is never stored, so a repair carrying it would be a second authority over a member no write may hold
 *  (interface §1; design §2). **AND IT IS `SAFE_PAIR`'S OWN SPELLING, NOT A SECOND LITERAL**: a placeholder that disagreed
 *  with the read-side default would be two authorities for one value, which is the failure `D-84` closes at the record
 *  address by reading `FIRST_RUN` — so the constant stays the source and the repair is one arm over it.
 *
 *  **IT WRITES THROUGH THE REGISTRATION'S OWN ROUTE AND NEVER AT A LANDING INSTANT, WHICH IS A MEASURED BOUND AND NOT AN
 *  OMISSION.** A repair at a registration instant is handed a record carrying a `write` MEMBER — the store's own three
 *  positions, the commit being the registration's own — so the write NAMES that commit the only way that instant allows
 *  (`D-73`; a supplied fourth position there is a `TypeError` thrown before any store act). At a LANDING instant the
 *  record is the six-member one with no `write`, and the commit MUST be named at `write`'s fourth position — **and this
 *  module supplies that position nowhere** (`signatures.md` §2: *"`write`'s fourth position is never supplied, so the
 *  class-test `TypeError` arm is unreachable"*). The two are reconciled by the reachability of the arm, measured
 *  2026-11-02: every store write this module makes at that address composes `{ exclusion }` at the literal in
 *  `write`'s exclusion arm, and `delete` — the only route that could leave the address absent — is called by no line of this
 *  file (`signatures.md` §2's call census), so **no route of this instance can hand a landing instant an absent pair**.
 *  The failed arm below is stated rather than fallen into, because a repair that reaches no lawful write says so in its
 *  own two members instead of answering `void`, which carries "no op". */
function mintExclusion(context: unknown): RepairAnswer {
  const route = plain(context) ? context['write'] : undefined
  if (typeof route !== 'function') {
    return {
      ok: false,
      message: 'the exclusion does not stand, and this repair was handed no registration route to create it through',
    }
  }
  const routeWrite = route as (address: OperatorSettingsAddress, tier: string, value: unknown) => unknown
  // THREE POSITIONS AND NO FOURTH: the commit here is the registration's own and cannot be named (`D-69`, `D-73`).
  return repairAnswer(routeWrite(EXCLUSION_ADDRESS, 'mem', { exclusion: SAFE_PAIR.exclusion }))
}

/** **THE BODY JUDGES `context.value` AND NEEDS NO HANDLE — the shape `tabsMustStand` measured, and the reason is the same
 *  one** (`D-69`, `D-83`, `D-84`). A pair whose own key is absent is APPLIED where its parent resolves, and this
 *  address's parent is the register, which always resolves — so the pair is asked over an empty store **at
 *  construction**, which is the one instant a repair can rescue (a pair under an ABSENT parent is never asked at all).
 *  **Measured 2026-11-02, one fresh instance per arm, on the three addresses at once:** a registration's context is the
 *  five-member `{address, attempt, op, tier, value}` with `attempt`/`op`/`tier` all `null`, no `write` member on the
 *  BODY's record, and `value` the current value read at the address — `{"token":"t"}` where the address held that
 *  object, `{}` where it held an empty one **and `undefined` where it held nothing**, which is the whole of what absence
 *  needs. So no handle is wanted for the judgement; the write is the only thing that wants one, and the record the
 *  repair is handed lends it.
 *
 *  **ABSENCE IS THE WHOLE ARM, AND EVERY OTHER SHAPE IS LEFT WHERE IT ALREADY HAS AN AUTHORITY.** A pair that stands is
 *  passed through, INCLUDING one whose `exclusion` member is not a token: this body judges EXISTENCE, and the read's own
 *  admission (`plain(pair)` and one of the two words) remains the authority over the member — the split the tab record
 *  draws between `tabs-must-stand` and its three field pairs, which this instance has no field pair for. Repairing the
 *  member here would be the second authority over one value that the placeholder rule forbids (`D-84`). */
function exclusionMustStand(context: unknown): ConstraintAnswer {
  const value = plain(context) ? context['value'] : undefined
  if (plain(value)) return true
  return { message: EXCLUSION_ABSENT_MESSAGE, repair: mintExclusion }
}

/** **THE INSTANCE'S BATCH — ONE DECLARATION, AND THE CONSTRUCTION THAT ADOPTS IT IS THE ONE CONSUMER IT HAS.** The list
 *  rides `StoreConfig['constraints']` at the `storeCreate` call below, so the pair is ARMED before anything can write
 *  and is asked again at every later instant its address is touched (`guide §7.2`; `D-65`'s batching, applied to an
 *  instance that constructs itself rather than being handed a store).
 *
 *  **NO LISTENER COLLIDES WITH ITS `id`, AND THAT IS A PROPERTY OF THE SPELLING**: this module mints
 *  `operator-settings:<n>@<address>` for a handle while the id is the literal `operator-exclusion-must-stand`, and the
 *  cross-kind rule `1.7.0` keeps reads the HANDLE — so a live listener and a pair stand at `['operator-exclusion']` at
 *  once, which is what `subscribe` does (D-71; guide §7.3's clause of 2026-11-01).
 *
 *  **AND THE TWO `file` ADDRESSES CARRY NO DECLARATION, WHICH `D-84` RECORDS AS A STOPPED PASS AND NOT AS AN OVERSIGHT**:
 *  see `EXCLUSION_MUST_STAND_ID`'s docblock for the two measurements that obstruct them. */
const OPERATOR_CONSTRAINT_DECLARATIONS: readonly ConstraintDeclaration[] = [
  { address: EXCLUSION_ADDRESS, id: EXCLUSION_MUST_STAND_ID, constraint: exclusionMustStand },
]

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings {
  let store: Store | null = null
  let refusal: OperatorSettingsReceipt | null = null
  let overlay: Row | null = null
  try {
    // **THE BATCH IS THE CONSTRUCTION'S, AND IT IS WHAT MAKES THE PAIR AN INVARIANT RATHER THAN A READ-SIDE DEFAULT**
    // (D-84): `constraints` is `StoreConfig`'s fourth declared key and its absence is in domain, so supplying it is the
    // whole of the change — the pair is armed before this constructor returns, and its repair mints the `mem` value a
    // `mem` address can never get from a file. The list is module-level and read-only: two instances in one process
    // adopt the same one body, and each store's registry is its own (`guide §6.2`).
    store = storeCreate({ journalLength: cap(options.journalLength), listeners: [], filePath: join(options.userDataDir, FILE_NAME), constraints: OPERATOR_CONSTRAINT_DECLARATIONS })
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
        // The landed clear/refuse split carried verbatim, in the guards' order: `null` CLEARS the
        // cap; a non-number REFUSES; `NaN` and any non-positive value — `-Infinity` included —
        // CLEAR; then only a remaining `+Infinity` REFUSES, with no store verb; else `Math.floor`.
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
