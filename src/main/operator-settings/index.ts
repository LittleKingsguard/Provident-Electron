// src/main/operator-settings/index.ts — THE INSTANCE (D-16, D-17): the operator's security record
// and settings as ONE `provident-storeroom` instance of its own — its own lifetime, its own file,
// and no MCP path resolving into it (D-18). The declared surface is `docs/L3/security-store-storeroom/
// signatures.md` §2 and nothing else; the design is `design.md` §2-§8, whose §3/§8 name every private
// helper below so this file mints none of its own but the declaration machinery `D-84` adds — `repairAnswer`,
// `mintExclusion`, `exclusionMustStand` and the batch itself, all named in that table (the one L4 exception:
// `plain`, reported at L4).
//
// FOUR ADDRESSES (three at `D-84`–`D-85`, the fourth at `D-123`), and the measurement is why: a `file`-tier write purges the versions it outranks
// AT ITS OWN KEY, so one address would let a settings commit reset the operator's exclusion pair
// (guide §5.1; design.md §2). `['operator-settings']` carries the durable record
// WHOLE — `enabled` always, `token` and `maxJournalLength` only while they stand, `entries` iff it
// stands — and `['operator-exclusion']` carries `{exclusion}` alone, because a cleared member is
// written as its ABSENCE and the package's walk refuses `null`/`undefined` anywhere in a value
// (guide §10.1; persistence §4). `tier4` is derived at the read and never stored, so the illegal
// pair is unspellable (interface §1).
//
// **THE FOURTH ADDRESS — `['operator-pane']` on `mem` — CARRIES THE OPERATOR PANE'S OPEN STATE, AND IT IS THE
// OTHER HALF OF THE ONE INVARIANT THIS INSTANCE NOW HOLDS** (`D-123`): `{open: boolean}` alone, written by the
// realm's own act (`writePane`, one `mem` write), and read by the constraint that refuses a store holding an open
// pane over open ports. It is `mem` because a pane is not a durable fact: the overlay's state machine is the
// renderer's and is seeded from the AUTHORED carrier at every boot (`startOverlayApplication`), so a persisted
// `open` would be a second authority over a surface that no longer exists at the next boot — and `D-122`'s own
// failure clause (`the exclusion is not persisted either`) is the same property read at the other half. Its
// existence declaration is the `mem` pair's shape for the `mem` pair's reason: a `mem` address has one lawful
// source under the convention's clause 3, a repair at creation (D-84).
//
// THE THIRD ADDRESS — `['operator-app-state']` on `file` — carries the retired carrier's rows WHOLE
// as `{rows: [{name, value}, …]}`, an ORDERED array and never a name→value map, because the
// crossing does not preserve an object's member order while a genuine array's survives exactly
// (persistence §3; interface §1). Its two verbs are `readAppState`/`writeAppState`: one store write
// per act, the sibling's own receipt — **and SINCE `D-104` A LISTENER OF ITS OWN**: `subscribe` binds this address beside
// the two above and routes its deliveries to the subscriber's second body, so a module row's change is DELIVERED to the
// consumer and never merely asked for by it (`D-82`'s `V3`, closed there; design §2; L1 §3). Its second import-once arm
// reads the retired carrier and writes no byte of it,
// and the diagnosis it answers is the BOOT's, served for the process's life (design §2.2;
// interface §2) — **and since `D-85` the word rides the record, so a boot that finds the record
// standing reads the arm that created it instead of asking the import again.**
//
// ONE TRANSITION IS ONE STORE WRITE: one op, one cursor, one receipt, the store's own ordinals
// verbatim — no offset, no renumbering, and `write`'s fourth position never supplied, so its
// class-test arm is unreachable (guide §3.3, §6.4; interface §2 `ASM-L2-7`).
//
// **ALL FOUR ADDRESSES' EXISTENCE IS AN ENFORCED INVARIANT OF THE INSTANCE AND NO LONGER A READ-SIDE DEFAULT** (D-84,
// D-85, D-123): one declaration rides the construction's `constraints` batch at each of them — `operator-exclusion-must-stand` at
// `['operator-exclusion']`, `operator-record-must-stand` at `['operator-settings']`, `operator-app-state-must-stand` at
// `['operator-app-state']`, `operator-pane-must-stand` at `['operator-pane']` — plus the ONE pair that judges two of them
// together, `no-open-pane-over-open-ports` at the store's root `[]` (D-123), and **EACH REPAIR PERFORMS WHAT THAT ADDRESS'S ABSENCE USED TO KEY**: the `mem` pair's repair
// mints `SAFE_PAIR`'s own value at creation on EVERY boot, because a `mem` address can never come from a file (D-84); the
// two `file` addresses' repairs perform their own IMPORT-ONCE ARM and write what it answered as ONE whole legal record —
// the record as `toStored(imported ?? FIRST_RUN)`, the rows as `{rows, legacy, unrepresentable}` (D-85).
// **SO THE ABSENCE-KEYED ACTION IS IN THE REPAIR AND NOT BESIDE IT**: `D-84` stopped these two declarations because a
// creation repair made each arm's marker permanently true and the import never ran, measured there as `54` rows red over
// `16` files; a repair that performs the import itself cannot retire it — the marker's truth IS the repair's own act.
//
// IT WRITES NO FILE OF ITS OWN and makes exactly TWO `fs` calls — the two import-once reads, now taken INSIDE a repair at
// the registration instant: the retired `provident-security.json`, and the retired settings carrier. Each is read and
// never written, renamed, repaired or deleted (D-19; persistence §2, §3, §5). The file the records land in is the STORE's
// own and every byte of it is the store's write (D-85). NO VERB HERE THROWS, for any patch, any rows list and any state:
// every caught value is contained and every arm answers its declared answer (L1 §3).
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

/** **THE APP-STATE ROWS' OWN DELIVERY, AND WHY IT IS A SECOND BODY RATHER THAN A SECOND SUBSCRIPTION** (`D-104`): the
 *  third address' rows are a WHOLE VALUE the surface hands on rather than a member of the record it re-patches from, so
 *  the subscriber that wants them names no address and reads no record — it is TOLD the rows moved. It is routed HERE,
 *  where `APP_STATE_ADDRESS` is a constant of this module, so no other file spells the address (`D-53`; the `ISO-7`
 *  census in `tests/e2e/settings-carrier-retirement/scenarios.test.ts` counts the spellings and requires exactly one
 *  file). A subscriber that supplies no second body still hears every address through the first, which is what the
 *  one-argument subscription has always done. */
export type OperatorAppStateListener = () => void

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
  subscribe(listener: OperatorSettingsListener, appStateListener?: OperatorAppStateListener): () => void      // answers the withdrawal
  readAppState(): AppStateAnswer
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
  /** **THE FOURTH ADDRESS'S ONE VERB** (`D-123`): one `mem` write of `{open}` at `['operator-pane']`, the sibling
   *  receipt verbatim. It is the realm's act recorded — never a decision: the constraint this instance holds is what
   *  refuses an open pane over open ports, and this verb only says what the operator's pane did. */
  writePane(open: boolean): OperatorSettingsReceipt
}

/** The group set's SECOND LIVE COPY (D-11, D-15; exception §2 E-1): six members, re-homed with the
 *  file and filtered at THREE sites — `fromStored` on every `read()`, the record's repair (`mintRecord`
 *  through `importOnce`), the patch. */
const VALID_GROUPS: ReadonlySet<string> = new Set(['read', 'dispatch', 'graph', 'code', 'module', 'data'])
const RECORD_ADDRESS: OperatorSettingsAddress = ['operator-settings']
const EXCLUSION_ADDRESS: OperatorSettingsAddress = ['operator-exclusion']
/** THE THIRD DURABLE ADDRESS, beside the record and not inside its value: a `file`-tier write
 *  purges at its own key, so a module write can never compose a value carrying the token
 *  (interface §1; design §2; L1 §3 `ASM-1`). */
const APP_STATE_ADDRESS: OperatorSettingsAddress = ['operator-app-state']
/** **THE FOURTH ADDRESS — THE OPERATOR PANE'S OPEN STATE, AND THE OTHER HALF OF THE INVARIANT THE LAST PAIR BELOW
 *  JUDGES** (`D-123`). It is `mem` for the pair's own reason and one more: a pane is not a durable fact — the
 *  overlay's four-state machine is the RENDERER's and is seeded from the AUTHORED state carrier on every boot, so a
 *  persisted `open` would be a second authority over a surface that does not exist at the next boot. */
const PANE_ADDRESS: OperatorSettingsAddress = ['operator-pane']
/** The address the invariant pair stands at: THE STORE'S OWN ROOT. It is a MEASURED choice and not a tidy one — a
 *  pair is asked only where the act touches its address (`D-56`/`D-66`; `guide §7.6`), so a pair at either half's
 *  address would see ONE of the two landing ops; at `[]` every act in this instance is at or below it, so ONE body
 *  judges both edges. Measured 2026-11-05 over the installed `provident-storeroom@1.9.3`: a construction carrying a
 *  pair at `[]` is accepted, the pair is asked at its registration and at every write this instance makes, and a
 *  write at `['operator-pane']` and a write at `['operator-exclusion']` are BOTH asked of it. */
const ROOT_ADDRESS: OperatorSettingsAddress = []
const FILE_NAME = 'provident-operator-settings.json'
const RETIRED_NAME = 'provident-security.json'
/** The retired tier-1 carrier, spelled ONCE in `src/**`: read by the second import-once arm and
 *  written by none (behaviour §8 `RET-2`; persistence §4; L1 §4). */
const RETIRED_SETTINGS_NAME = 'provident-settings.json'
/** The absent answer the second arm's `ENOENT` branch starts from. Its arrays are NEVER served and never written:
 *  the repair images the rows through `toAppState` before the store sees them, and every `rows`/`unrepresentable`
 *  an ANSWER carries is freshly minted off the record (`fromAppState`, `unrepresentableOf`; signatures §3). */
const NO_IMPORT: AppStateImport = { rows: [], legacy: 'absent', unrepresentable: [] }
/** The answer over no file and over every import-failure arm: `read`+`dispatch` on, token null
 *  (behaviour §1, §3). It is handed out only as a FRESH copy — never itself, never its array — and
 *  since `D-85` it is also the PLACEHOLDER the record address's repair writes through `toStored`. */
const FIRST_RUN: Row = { token: null, enabled: ['read', 'dispatch'] }
/** What a boot, a crash, a torn record and a corrupt file all resolve to, because the pair is
 *  `mem` and is never persisted (interface §1 `ASM-L2-2`; behaviour §7). */
const SAFE_PAIR: { exclusion: 'mcp-enabled' | 'mcp-disabled'; tier4: boolean } = { exclusion: 'mcp-enabled', tier4: false }
/** **THE PANE FAMILY'S ONE WHOLE LEGAL VALUE, AND ITS ONE AUTHORITY** (`D-123`): `{open: false}`. The creation
 *  repair writes exactly this, the absence arms read exactly this, and the invariant treats an absent record as it
 *  treats a closed one — so no second literal answers "what is a closed pane". It is `{open}` ALONE: the four-state
 *  word the overlay's mechanism carries (`closed`/`open`/`held`/`closing`) is the RENDERER's vocabulary and stays
 *  there, because the crossing's datum is the one predicate the invariant judges — `state === 'open' || state ===
 *  'held'` — and a four-state word here would make `closing` a third half-open state this instance would have to
 *  decide about, which is a second authority over the mechanism (D-123). */
const CLOSED_PANE: { open: boolean } = { open: false }
/** The pair's other state, spelled once: the value the invariant's repair writes, which is the DIRECTION it settles
 *  (`D-123` — closing the ports is the safe half, because the pane is what the user is doing). */
const PORTS_CLOSED: 'mcp-enabled' | 'mcp-disabled' = 'mcp-disabled'

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

/** The record address's import, six arms each answering without a throw, and the module's FIRST `fs` call — taken
 *  INSIDE the repair at `['operator-settings']` since `D-85`, which is the act that address's absence used to key: the
 *  retired name is READ here and never written, renamed, repaired or deleted (design §7; D-19; `guide §7.2` (4)).
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
 * THE SECOND IMPORT-ONCE ARM — the retired tier-1 carrier, read by the repair at `['operator-app-state']` and never
 * written, renamed, repaired or deleted: the module's SECOND and last `fs` call, and since `D-85` the act that address's
 * absence used to key (L1 §4; persistence §4; `guide §7.2` (4)).
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

/** **THE ARM'S OWN ANSWER AS ONE WHOLE LEGAL RECORD, AND THE WORD RIDES IT** (`D-85`): `{rows, legacy,
 *  unrepresentable}` — the rows imaged exactly as the caller's write images them, the arm the import
 *  ran under, and the names it could not carry. **THE WORD IS HERE BECAUSE IT WAS DERIVED FROM THE
 *  IMPORT OUTCOME AT THE READ, AND ONCE THE RECORD STANDS THE DERIVATION MUST COME FROM THE RECORD**:
 *  measured 2026-11-03, `legacy` was `'recorded'` iff a record stood and the import's own word
 *  otherwise, so a record standing over a profile whose carrier held rows was the ONLY way to keep
 *  both facts — the rows and the arm that produced them — and a repair that wrote the rows alone
 *  would collapse every arm to `'recorded'` (D-84's own measurement of that collapse). The two
 *  import words a repair can write are `'absent'`, `'imported'` and `'corrupt'`; `'recorded'` is a
 *  read's word for a record this repair did not write and is never written by it.
 *  `undefined` where the rows have no JSON image — unreachable from a parsed carrier, and answered
 *  rather than thrown so a repair can state its own failed arm. */
function toAppStateRecord(imported: AppStateImport): Record<string, unknown> | undefined {
  const image = toAppState(imported.rows)
  if (image === undefined) return undefined
  return { rows: image['rows'], legacy: imported.legacy, unrepresentable: [...imported.unrepresentable] }
}

/** **THE DIAGNOSIS THE BOOT SERVES, READ OFF THE RECORD** (`D-85`, closing the read-side derivation): a
 *  record that stands carries the arm that created it, and a record that stands WITHOUT a word is one
 *  a caller's write composed (`{rows}` alone) — the arm that ran is then no longer knowable and the
 *  fourth word is the honest answer, which is exactly the answer this module gave before the word was
 *  stored (measured 2026-11-03, both arms). Nothing stands → the address was never repaired, so no arm
 *  can be claimed and `'absent'` is served; that state is only reachable through a refused
 *  construction, where no store and no batch exist (D-84's measured read-side arm). */
function legacyOf(value: unknown): AppStateLegacy {
  if (!recordedAt(value)) return 'absent'
  const word = plain(value) ? value['legacy'] : undefined
  if (word === 'absent' || word === 'imported' || word === 'corrupt') return word
  return 'recorded'
}

/** The names the import could not carry, read back off the record as a FRESH list per answer: the
 *  discipline `NO_IMPORT`'s arrays were held to is now the record's (signatures §3; `D-85`). */
function unrepresentableOf(value: unknown): string[] {
  if (!plain(value)) return []
  const held = value['unrepresentable']
  if (!Array.isArray(held)) return []
  const names: string[] = []
  for (const name of held) if (typeof name === 'string') names.push(name)
  return names
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
 *  **AND IT IS THE ONE ADDRESS OF THE THREE `D-82` NAMED WHOSE REPAIR MINTS A PLACEHOLDER RATHER THAN PERFORMING AN
 *  IMPORT** (`D-84`, `D-85`): this pair has no import arm, writes no byte to the file and marks nothing. The two `file`
 *  addresses are declared beside it and their repairs DO perform what their absence keyed — `D-85` moved that work into
 *  them, which is the whole of what `D-84` could not build. */
const EXCLUSION_MUST_STAND_ID = 'operator-exclusion-must-stand'
/** The two `file` addresses' ids, exported nowhere for the exclusion's own reason: the instance is the only consumer. */
const RECORD_MUST_STAND_ID = 'operator-record-must-stand'
const APP_STATE_MUST_STAND_ID = 'operator-app-state-must-stand'
/** **THE PANE FAMILY'S EXISTENCE PAIR** (`D-123`): the `mem` half's shape, under an id of its own so a rename is a
 *  red row rather than a silent one, and exported nowhere for the exclusion's reason — the instance is its own only
 *  consumer. */
const PANE_MUST_STAND_ID = 'operator-pane-must-stand'
/** **THE INVARIANT'S OWN PAIR, AND IT IS THE ONE PAIR IN THIS BATCH THAT JUDGES TWO ADDRESSES** (`D-123`): it stands
 *  at the store's root `[]` so BOTH landing ops are asked of it — the pane opening while the ports stand open, and
 *  the ports being enabled while the pane stands open — and it reads both halves rather than the act's own value
 *  (`guide §7.6`: *"If your constraint cares about the state at any other location … IT READS THAT LOCATION"*). */
const EXCLUSIVITY_ID = 'no-open-pane-over-open-ports'
/** **THE SENTENCE NAMES THE FAULT AND NOT THE ACT** — the register of L2 §3 and of the tab record's five: the address
 *  holds no version of the pair, which is why nothing can be read there, and `tier4` is a DERIVED member and never part
 *  of what is missing (interface §1). The two `file` addresses' sentences hold the same line: what is missing is the
 *  RECORD (or the row list), never the read that wants it (`D-85`). */
const EXCLUSION_ABSENT_MESSAGE = "the operator exclusion does not stand at its address, so no 'mem' version of the pair exists"
const RECORD_ABSENT_MESSAGE = 'no operator record stands at its address, so no durable settings exist to read'
const APP_STATE_ABSENT_MESSAGE = 'no app-state row list stands at its address, so no tier-1 row can be read'
/** **AND THE THREE THE VALUE ARMS ANSWER, IN THE SAME REGISTER AND FOR THE OTHER FAULT** (`D-105`): a value that STANDS
 *  and carries something no read of this module can state. Each names the FAMILY and the fault, never the act — a write
 *  refused here and a value standing in the file are one fault, whichever caller met it. **NO ROUTE OF THIS MODULE
 *  ANSWERS ONE**: `write`, `writeAppState` and the transition each compose a value their own domain already admits
 *  (interface §2), so only a caller naming the instance's own store address can meet these arms. */
const RECORD_UNUSABLE_MESSAGE =
  'the operator record stands but carries a member that is no member of it, or a member outside its own domain, so no durable setting can be read from the record that stands'
const EXCLUSION_UNUSABLE_MESSAGE =
  "the operator exclusion stands but names no state — 'exclusion' is absent, or it is neither 'mcp-enabled' nor 'mcp-disabled' — so the pair names nothing the gate can apply"
const APP_STATE_UNUSABLE_MESSAGE =
  'the app-state row list stands but carries a row that is no row, a name that is not a non-empty string, or no value at all, so the row it holds cannot be read back'
/** **THE PANE FAMILY'S TWO SENTENCES, AND THE TWO THE INVARIANT ANSWERS** (`D-123`). The first pair is the `mem` half's
 *  register — the family and the fault, never the act. **THE THIRD IS THE INVARIANT'S AND IT NAMES THE ACTUAL FAULT**:
 *  not "an illegal state" but what the state lets happen — the agent's dispatch path standing open over the surface the
 *  operator opened the crossing TO configure — because that is the sentence an operator reads off a refused write. */
const PANE_ABSENT_MESSAGE = "no operator pane record stands at its address, so no 'mem' version of the pane's open state exists"
const PANE_UNUSABLE_MESSAGE =
  "the operator pane record stands but carries no boolean 'open' — a member that is no member of it, a non-boolean value, or a memberless record — so the pane's open state cannot be read"
const EXCLUSIVITY_MESSAGE =
  'the operator pane stands open while the MCP ports stand open, so the agent can read and dispatch from under the surface the pane was opened to configure'

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE VALUE ARMS — A FAMILY THAT STANDS BUT CARRIES A VALUE ITS OWN READ CANNOT STATE IS REFUSED (D-105)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE INSTANT A BODY IS ASKED AT, READ OFF ITS OWN CONTEXT — MEASURED, NOT ASSUMED.** A REGISTRATION instant hands
 *  the body `{address, tier, value, attempt, op}` with `tier`, `attempt` and `op` ALL NULL; a WRITE's landing instant
 *  hands `{address, attempt, op, tier, value}` with all three SET (measured 2026-11-03 at this head, at these addresses).
 *  **THE DISTINCTION IS LOAD-BEARING RATHER THAN TIDY**: a body answering the unrepairable arm at a registration
 *  instant REFUSES THE CONSTRUCTION — `provident-storeroom@1.9.2` throws `ConstraintRefusedAtRegistration` before the
 *  instance exists (measured, over this module's own batch) — so a value a caller or a hand-edited file left at one of
 *  these addresses would leave the app with no instance at all. There is no standing record for a rollback to protect at
 *  that instant, so the value arms answer `true` there and refuse only where a write's own rollback exists. */
function atWrite(context: unknown): boolean {
  const tier = plain(context) ? context['tier'] : undefined
  return tier !== null && tier !== undefined
}

/** **THE NODE A PASS IS AT, RELATIVE TO THE FAMILY'S ADDRESS — a subtraction, and the measurement is why it is one.** A
 *  pass is asked at the WRITE's own address (`context.address`), never at the pair's, so a write at
 *  `['operator-settings','token']` hands the record's pair `{address: ['operator-settings','token'], tier: 'file', …}`
 *  and the remainder names the node the value is. The store's address domain is THREE segments, so a remainder is at
 *  most two long. `null` where the context names no address under this root: an arm no measured act reaches, and one
 *  that must never refuse. */
function nodeOf(context: unknown, root: OperatorSettingsAddress): readonly string[] | null {
  const at = plain(context) ? context['address'] : undefined
  if (!Array.isArray(at) || at.length < root.length) return null
  for (let index = 0; index < root.length; index += 1) if (at[index] !== root[index]) return null
  return at.slice(root.length) as readonly string[]
}

/** The record's four durable members — the closed set `toStored` composes and `fromStored` reads, so a fifth name is a
 *  member the read never reads and the value is not the record that stands. */
const RECORD_MEMBERS: ReadonlySet<string> = new Set(['token', 'enabled', 'maxJournalLength', 'entries'])
/** The row list's three members (`toAppStateRecord` composes them, `fromAppState`/`legacyOf`/`unrepresentableOf` read
 *  them) and the four words the diagnosis may stand as (`AppStateLegacy`). */
const APP_STATE_MEMBERS: ReadonlySet<string> = new Set(['rows', 'legacy', 'unrepresentable'])
const LEGACY_WORDS: ReadonlySet<string> = new Set(['absent', 'imported', 'corrupt', 'recorded'])

/** `admitGroups`' rule as an ADMISSION rather than a filter: every member is a group name and no name repeats, so the
 *  read states the list the value carries instead of silently dropping what it cannot admit. */
function groupsAdmit(list: readonly unknown[]): boolean {
  const seen = new Set<string>()
  for (const name of list) {
    if (typeof name !== 'string' || !VALID_GROUPS.has(name) || seen.has(name)) return false
    seen.add(name)
  }
  return true
}

/** One record member's own domain, by the name it is carried under — **`fromStored`'s four rules, member for member**:
 *  a non-empty token (a cleared one is written as ABSENCE), an array of group names, a POSITIVE INTEGER cap (the write
 *  floors it, so a fraction would be read back floored — a loss), and a plain entries map. */
function recordMemberAdmits(member: string, value: unknown): boolean {
  if (member === 'token') return typeof value === 'string' && value !== ''
  if (member === 'enabled') return Array.isArray(value) && groupsAdmit(value)
  if (member === 'maxJournalLength') return typeof value === 'number' && Number.isFinite(value) && value > 0 && Number.isInteger(value)
  return plain(value)
}

/** **THE RECORD AT ONE NODE OF ITS OWN SHAPE**: the root is the record whole — its member set CLOSED and every present
 *  member in domain — a member is that member's own domain, and one level into a member is a group name or an entries
 *  value, the only two the read looks inside. A record naming NO member (`{}`) is admitted: every member falls to
 *  `fromStored`'s first-run value, which `D-84` measured as the state `{}` stands in. */
function recordAdmitsAt(node: readonly string[], value: unknown): boolean {
  if (node.length === 0) {
    if (!plain(value)) return false
    for (const member of Object.keys(value)) {
      if (!RECORD_MEMBERS.has(member) || !recordMemberAdmits(member, value[member])) return false
    }
    return true
  }
  const member = node[0]
  if (member === undefined || !RECORD_MEMBERS.has(member)) return false
  if (node.length === 1) return recordMemberAdmits(member, value)
  if (member === 'enabled') return typeof value === 'string' && VALID_GROUPS.has(value)
  return member === 'entries'
}

/** The pair's one member and its two words — `fromStored`'s exclusion arm reads exactly this, and `SAFE_PAIR` answers
 *  where it cannot, which is the substitution the arm refuses. */
function pairAdmits(value: unknown): boolean {
  return value === 'mcp-enabled' || value === 'mcp-disabled'
}

/** **THE PAIR AT ONE NODE**: the root is `{exclusion}` and nothing else, and a write at the member is one of the two
 *  words. **A PAIR THAT NAMES NO MEMBER IS REFUSED TOO** — `{}` reads as `SAFE_PAIR.exclusion`, which OPENS the gate,
 *  so a memberless pair is a state this family's read can only substitute for. */
function exclusionAdmitsAt(node: readonly string[], value: unknown): boolean {
  if (node.length === 0) {
    if (!plain(value)) return false
    const members = Object.keys(value)
    return members.length === 1 && members[0] === 'exclusion' && pairAdmits(value['exclusion'])
  }
  return node.length === 1 && node[0] === 'exclusion' && pairAdmits(value)
}

/** **THE PANE AT ONE NODE** (`D-123`): the root is `{open}` and nothing else, and a write at the member is one boolean.
 *  **A RECORD THAT NAMES NO MEMBER IS REFUSED TOO** — `{}` would read as a closed pane under the invariant's own
 *  tolerance, which is exactly the substitution this family refuses to make: the crossing's datum IS the record, so a
 *  record naming nothing is a state no invariant can state (`D-105`'s rule, read at the fourth address). A standing
 *  `open` that is not a boolean is refused for the same reason — the invariant would judge a word it cannot read and
 *  pass the store, which is the fail-open this whole pass exists to close. */
function paneAdmitsAt(node: readonly string[], value: unknown): boolean {
  if (node.length === 0) {
    if (!plain(value)) return false
    const members = Object.keys(value)
    return members.length === 1 && members[0] === 'open' && typeof value['open'] === 'boolean'
  }
  return node.length === 1 && node[0] === 'open' && typeof value === 'boolean'
}

/** **THE INVARIANT'S TWO HALVES, EACH READ OFF A VALUE AND NOT OFF AN ACT** (`D-123`): an absent record is a closed
 *  pane and an absent pair is enabled ports — which is the state BEFORE the family declarations run, and the state the
 *  invariant must not refuse at any instant but a landing one. **THE CONJUNCTION IS THE WHOLE PREDICATE**, and it has
 *  exactly one spelling in this file. */
function paneStandsOpen(pane: unknown): boolean {
  return plain(pane) && pane['open'] === true
}
function portsStandOpen(pair: unknown): boolean {
  return !(plain(pair) && pair['exclusion'] === PORTS_CLOSED)
}
/** The one spelling of the fault: `true` where the store holds both halves open at once. */
function bothStandOpen(pane: unknown, pair: unknown): boolean {
  return paneStandsOpen(pane) && portsStandOpen(pair)
}

/** One row of the list: a plain record naming a NON-EMPTY string and carrying its own `value` — `fromAppState`'s three
 *  tests in its own order, and the third is `hasOwnProperty` because a row whose `value` is absent is a row the read
 *  SKIPS, so the caller's row is gone while the receipt says `committed`. */
function rowAdmits(value: unknown): boolean {
  if (!plain(value)) return false
  const name = value['name']
  return typeof name === 'string' && name !== '' && Object.prototype.hasOwnProperty.call(value, 'value')
}

function namesAdmit(value: unknown): boolean {
  return Array.isArray(value) && value.every((name) => typeof name === 'string')
}

/** **THE ROW LIST AT ONE NODE OF ITS OWN SHAPE**: the root is `{rows, legacy, unrepresentable}` — its member set closed,
 *  the rows each a row, the word one of the four, the names a list of strings — and the nodes below it are `rows`, the
 *  word, the names, one row, and a row's two members. */
function appStateAdmitsAt(node: readonly string[], value: unknown): boolean {
  if (node.length === 0) {
    if (!plain(value)) return false
    for (const member of Object.keys(value)) {
      if (!APP_STATE_MEMBERS.has(member)) return false
      if (member === 'rows' && !(Array.isArray(value[member]) && value[member].every(rowAdmits))) return false
      if (member === 'legacy' && !(typeof value[member] === 'string' && LEGACY_WORDS.has(value[member] as string))) return false
      if (member === 'unrepresentable' && !namesAdmit(value[member])) return false
    }
    return true
  }
  const member = node[0]
  if (member === 'rows' && node.length === 1) return Array.isArray(value) && value.every(rowAdmits)
  if (member === 'legacy' && node.length === 1) return typeof value === 'string' && LEGACY_WORDS.has(value)
  if (member === 'unrepresentable' && node.length === 1) return namesAdmit(value)
  if (member !== 'rows') return false
  if (node.length === 2) return rowAdmits(value)
  const field = node[2]
  if (field === 'name') return typeof value === 'string' && value !== ''
  return field === 'value'
}

/** **THE ONE PLACE A REPAIR'S ANSWER IS CONSTRUCTED** (`D-72`): a `repair` returns the op its own write landed, and the
 *  store's refusal arm is not swallowed — a receipt with no `op` answers `null`, which is the failed value the kernel
 *  refuses as *"produced no op"*, and the write that produced it has already said why. */
function repairAnswer(receipt: unknown): RepairCredited {
  return { ok: true, op: plain(receipt) ? (receipt as Record<string, unknown>)['op'] : null }
}

/** The registration instant's route, or nothing: `write(address, tier, value)` on the record the repair is handed, with
 *  NO FOURTH POSITION, because the commit there is the registration's own and cannot be named (`D-69`, `D-73`; `guide
 *  §7.2` (4)). `undefined` where the repair was handed no such record, so the caller answers its own failed arm. */
function registrationRoute(context: unknown): ((address: OperatorSettingsAddress, tier: string, value: unknown) => unknown) | undefined {
  const route = plain(context) ? context['write'] : undefined
  return typeof route === 'function' ? route as (address: OperatorSettingsAddress, tier: string, value: unknown) => unknown : undefined
}

/** **ONE WHOLE LEGAL PAIR VALUE WRITTEN THROUGH THE MODULE'S ONE REPAIR-WRITE PATH, AT WHICHEVER INSTANT THE REPAIR WAS
 *  ASKED** (`D-84`'s `mintExclusion`, re-derived at `D-123` because a second caller arrived). The value is `{exclusion}`
 *  ALONE — the same shape the module's own transition write composes — because `tier4` is derived at the read and is
 *  never stored, so a repair carrying it would be a second authority over a member no write may hold (interface §1;
 *  design §2). **AND EACH CALLER PASSES A CONSTANT THIS MODULE ALREADY OWNS, NOT A SECOND LITERAL**: the existence
 *  repair writes `SAFE_PAIR.exclusion` and the invariant's repair writes `PORTS_CLOSED`, both spelled once above.
 *
 *  **THE TWO INSTANTS ROUTE DIFFERENTLY, AND `D-123` IS WHERE THE SECOND ROUTE ARRIVED — SUPPLYING `write`'S FOURTH
 *  POSITION, WHICH THIS MODULE SUPPLIED NOWHERE UNTIL THEN.** A repair at a REGISTRATION instant is handed a record
 *  carrying a `write` MEMBER — the store's own three positions, the commit being the registration's own — so the write
 *  NAMES that commit the only way that instant allows (`D-73`; a supplied fourth position there is a `TypeError` thrown
 *  before any store act). At a LANDING instant the record is the six-member one with no `write`, and the commit MUST be
 *  named at `write`'s fourth position — **which is the one supported route for a repair that writes anywhere other than
 *  the address its own pair judges** (`guide §7.6`'s worked example; `D-103`: *"Writing a repair function that does not
 *  pass the commit in is unsupported"*). The repair's own record carries that commit at its `pending` member, so the
 *  route is `standing.write(address, tier, value, context)` and nothing else. **THE ROUTE IS STILL ONE PATH**: both
 *  instants compose the same value through this one function, and neither `write` verb a CALLER reaches ever names a
 *  commit — a caller's write IS its own commit (`signatures.md` §2's claim, re-grained there).
 *  The failed arm below is stated rather than fallen into, because a repair that reaches no lawful write says so in its
 *  own two members instead of answering `void`, which carries "no op". */
function writeExclusion(context: unknown, exclusion: 'mcp-enabled' | 'mcp-disabled', standing: Store | null): RepairAnswer {
  const value = { exclusion }
  const routeWrite = registrationRoute(context)
  if (routeWrite !== undefined) return repairAnswer(routeWrite(EXCLUSION_ADDRESS, 'mem', value))
  if (standing === null) {
    return {
      ok: false,
      message: 'the exclusion does not stand, and this repair was handed neither a registration route nor a store to create it through',
    }
  }
  try {
    // THE COMMIT IS THE REPAIR'S OWN RECORD, at `write`'s DECLARED FOURTH POSITION (`guide §7.6`; `D-103`).
    return repairAnswer(standing.write(EXCLUSION_ADDRESS, 'mem', value, context as never))
  } catch (caught) {
    const shape = caught as { message?: unknown } | null
    return {
      ok: false,
      message: typeof shape?.message === 'string' ? shape.message : 'the exclusion could not be written through the repair route',
    }
  }
}

/** **THE `mem` PAIR'S EXISTENCE REPAIR: `SAFE_PAIR`'S OWN VALUE, ONE WHOLE LEGAL VALUE, AT THE ONE ADDRESS** (`D-84`). */
function mintExclusion(context: unknown, standing: Store | null): RepairAnswer {
  return writeExclusion(context, SAFE_PAIR.exclusion, standing)
}

/** **THE PANE FAMILY'S EXISTENCE REPAIR: THE SAME SHAPE AT THE FOURTH ADDRESS** (`D-123`), and it writes
 *  `CLOSED_PANE` for the pair's own reason — the value a `mem` address can never get from a file is minted by a repair
 *  at creation, and the closed pane is the value the invariant can never fault (an open pane over open ports is the
 *  state the whole batch refuses). */
function mintPane(context: unknown): RepairAnswer {
  const routeWrite = registrationRoute(context)
  if (routeWrite === undefined) {
    return { ok: false, message: 'the operator pane record does not stand, and this repair was handed no registration route to create it through' }
  }
  return repairAnswer(routeWrite(PANE_ADDRESS, 'mem', { open: CLOSED_PANE.open }))
}

/** **`['operator-settings']`'s REPAIR PERFORMS THE IMPORT ITS ABSENCE USED TO KEY, AND WRITES WHAT IT ANSWERED AS ONE WHOLE
 *  LEGAL RECORD** (`D-85`, the instruction's own shape: *"If their absence keys another action, then that is part of the
 *  repair shape"*). The absence of this address WAS the marker for `importOnce` — `carries` at the old construction — so
 *  the act the marker keyed moves into the repair that stands where the marker stood: the retired
 *  `provident-security.json` is read HERE, once, and `toStored(imported ?? FIRST_RUN)` is written at the address as ONE
 *  value. **`?? FIRST_RUN` IS THE WHOLE OF WHAT THE READ-SIDE DEFAULT WAS**: `importOnce` answers `undefined` on its four
 *  absent/corrupt arms (absent, unparsable, not a plain object, unreadable), and the old `read()` substituted `FIRST_RUN`
 *  over that arm, so the placeholder written here is the constant the read used to answer and not a second authority
 *  (`D-84`'s rule at this address).
 *
 *  **THE IMPORT IS AN `fs` READ THAT NOW RUNS INSIDE A REPAIR AT THE REGISTRATION INSTANT, AND THAT IS LAWFUL AND
 *  MEASURED**: nothing in the package constrains a repair's body beyond the answer it returns — the route is the
 *  repair's alone and the body is the caller's code (`guide §7.2` (4)) — so a body that reads a file, decides, and writes
 *  through the route is the ordinary repairable arm. **Measured 2026-11-03, and measured at the RECORD rather than at the
 *  receipt**: a profile seeded with a retired carrier carrying a token, three grants, a cap and one entry, booted and
 *  then flushed by a write at the OTHER address, leaves `provident-operator-settings.json` holding
 *  `{"operator-settings":{"enabled":["graph","read","module"],"entries":{"x-kept":{"a":1}},"maxJournalLength":9,
 *  "token":"tok"}}` — the imported values, at the address, in the store's own bytes, with no `read()` in the path. A
 *  repair whose write merely succeeded would leave `FIRST_RUN`'s value there instead.
 *
 *  **ONE WHOLE VALUE AND NEVER A SEQUENCE** (`D-85`, and the tab record's rule): one `write`, one op, one value —
 *  `toStored`'s own composition, which is also what this module's `write` composes, so no second answer to "what is a
 *  legal record" exists. A caught value is answered in the repair's own failed arm rather than thrown. */
function mintRecord(context: unknown, userDataDir: string): RepairAnswer {
  const routeWrite = registrationRoute(context)
  if (routeWrite === undefined) {
    return { ok: false, message: 'the operator record does not stand, and this repair was handed no registration route to create it through' }
  }
  try {
    return repairAnswer(routeWrite(RECORD_ADDRESS, 'file', toStored(importOnce(userDataDir) ?? FIRST_RUN)))
  } catch {
    return { ok: false, message: 'the operator record does not stand, and its import could not be written at this registration' }
  }
}

/** **`['operator-app-state']`'s REPAIR DOES THE SAME FOR THE ROWS *AND* FOR THE WORD** (`D-85`). This address's absence was
 *  the marker for `importAppStateOnce` — `recordedAt` at the old construction — and `legacy` was read straight off that
 *  import's outcome; so the repair performs the import and writes ONE record carrying `{rows, legacy, unrepresentable}`.
 *  **THE WORD IS IN THE RECORD BECAUSE IT WAS DERIVED FROM THE IMPORT AT THE READ AND THE DERIVATION MUST NOW COME FROM
 *  THE RECORD**: `D-84` measured the failure of the alternative — a declaration that wrote rows alone made `legacy` read
 *  `'recorded'` on every arm, `absent`, `imported` and `corrupt` alike. Measured 2026-11-03 over a carrier with an
 *  uncarryable row: the flushed bytes at this address are
 *  `{"rows":[{"name":"file.layout.dock","value":"left"}],"legacy":"imported","unrepresentable":["file.tabs.order"]}`.
 *
 *  **AND A CORRUPT CARRIER DOES NOT CRASH THE BOOT**: `importAppStateOnce` discriminates `absent` from `corrupt` on the
 *  caught error's own `code` and answers `{rows: [], legacy: 'corrupt'}` for every failure arm, so the repair writes that
 *  word and the record stands — measured on five corrupt shapes, the answer unmoved at `'corrupt'` (behaviour §7). */
function mintAppState(context: unknown, userDataDir: string): RepairAnswer {
  const routeWrite = registrationRoute(context)
  if (routeWrite === undefined) {
    return { ok: false, message: 'the app-state rows do not stand, and this repair was handed no registration route to create them through' }
  }
  try {
    const imported = importAppStateOnce(userDataDir)
    const value = toAppStateRecord(imported)
    if (value === undefined) {
      return { ok: false, message: 'the app-state rows do not stand, and the import answered a row list with no JSON image' }
    }
    return repairAnswer(routeWrite(APP_STATE_ADDRESS, 'file', value))
  } catch {
    return { ok: false, message: 'the app-state rows do not stand, and their import could not be written at this registration' }
  }
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
 *  **ABSENCE IS THE FIRST ARM, AND THE SECOND IS THE VALUE'S (`D-105`).** A pair that does not stand is repaired to
 *  `SAFE_PAIR`; **a pair that STANDS and names no state is REFUSED, with no repair** — before `D-105` such a value was
 *  passed through and the read answered `SAFE_PAIR.exclusion` over it, so `{junk:true}` at this address silently reopened
 *  the gate the operator had closed. The arm is a REFUSAL rather than a repair because a placeholder here would destroy
 *  the state the caller wrote, and the store's own rollback already protects the pair that stood. **THE TWO ARMS ARE TOLD
 *  APART BY `plain(value)` AND BY NOTHING ELSE.** */
function exclusionMustStand(context: unknown, standing: Store | null): ConstraintAnswer {
  const value = plain(context) ? context['value'] : undefined
  if (!plain(value)) return { message: EXCLUSION_ABSENT_MESSAGE, repair: (repairContext: unknown) => mintExclusion(repairContext, standing) }
  const node = nodeOf(context, EXCLUSION_ADDRESS)
  if (node === null || exclusionAdmitsAt(node, value)) return true
  if (!atWrite(context)) return true
  return { message: EXCLUSION_UNUSABLE_MESSAGE }
}

/** **THE PANE FAMILY'S EXISTENCE BODY, IN THE PAIR'S SHAPE** (`D-123`): the first arm repairs an absent record to the
 *  closed pane; the second REFUSES a record that stands and carries no boolean `open`, with no repair — a placeholder
 *  there would overwrite the state the realm wrote, and the store's rollback already protects the record that stood.
 *  `paneAdmitsAt`'s docblock is the ground for why `{}` and a non-boolean `open` are refused and not repaired. */
/** The store's own value at one address, or `undefined` where no store stands or the read refuses — the shape a body that
 *  must judge a value OTHER than the act's uses (`guide §7.6`: *"a pair that judges its own address READS it"*). */
function readAt(standing: Store | null, address: OperatorSettingsAddress, tier: 'mem' | 'file' | 'temp'): unknown {
  if (standing === null) return undefined
  try {
    return standing.read(address, tier)
  } catch {
    return undefined
  }
}

function paneMustStand(context: unknown, standing: Store | null): ConstraintAnswer {
  // **THE PANE'S BODY READS ITS OWN ADDRESS AT A LANDING INSTANT, AND THAT IS A MEASUREMENT AND NOT A PREFERENCE.** A
  // RE-RUN HANDS EVERY PAIR IN THE PASS'S SET THE VALUE THE REPAIR'S OP LANDED — at the ACT's address, not at the pair's —
  // measured 2026-11-05: a write at `['operator-pane']` whose invariant repair landed `{exclusion:'mcp-disabled'}` at
  // `['operator-exclusion']` handed THIS body `{exclusion:'mcp-disabled'}` at the pane's own address, and the body refused
  // it as a pane record naming no member, so the whole write crossed `ConstraintPassRefused` as *"violated a re-run"*.
  // Reading its own address makes the re-run judge the pane that actually stands — which is what the store holds after
  // the repair, and the pass then agrees with the repair instead of fighting it.
  const value = atWrite(context) && standing !== null
    ? readAt(standing, PANE_ADDRESS, 'mem')
    : (plain(context) ? context['value'] : undefined)
  if (!plain(value)) return { message: PANE_ABSENT_MESSAGE, repair: mintPane }
  const node = nodeOf(context, PANE_ADDRESS)
  if (node === null || paneAdmitsAt(node, value)) return true
  if (!atWrite(context)) return true
  return { message: PANE_UNUSABLE_MESSAGE }
}

/** **THE INVARIANT — THE ONE PAIR IN THIS BATCH THAT JUDGES TWO ADDRESSES, AND THE WHOLE OF THE PASS IS ITS TWO ARMS**
 *  (`D-123`; the instruction verbatim: *"Enforce that the security pane cannot be open while the MCP ports are open"*).
 *  **IT STANDS AT THE STORE'S ROOT** because a pair is asked only where an act touches its address (`guide §7.6`;
 *  `D-56`/`D-66`) — measured 2026-11-05 at this package: a pair at one half's address is asked for that half's landing op
 *  and NOT for the other's, so one pair at either address would see one edge. At `[]` every act of this instance is at or
 *  below the pair, and both edges are caught by ONE body.
 *
 *  **WHAT IT JUDGES, AND THE TWO INSTANTS ARE TOLD APART BY `atWrite` AND BY NOTHING ELSE.** At a LANDING instant the
 *  context's `value` is the ACT'S value — the pane's on one edge, the pair's on the other, and **THE REPAIR'S LANDED VALUE
 *  on the re-run** (measured: the re-run hands the body the value the repair's op landed, at the act's address, *not* the
 *  object its own address holds) — so the body READS both addresses through the store handle instead of trusting it
 *  (`guide §7.6`'s own rule, which is what makes the re-run pass on a repaired state rather than refuse it again). At a
 *  REGISTRATION instant the context's `value` IS THE WHOLE REGISTER, so the same judgement is made off `context.value`
 *  with no handle at all — which is also the instant where both halves are ABSENT before the family pairs beside this one
 *  have run, and an absent half is judged exactly as a closed pane and as enabled ports, i.e. no fault.
 *
 *  **AND THE READING IS TOTAL OVER A FAILED READ**: a `Store` that refuses a read (a tier word the store does not hold)
 *  answers `undefined`, which the two predicates treat as absence — so a read this body could not perform can never
 *  *manufacture* the fault. It can only miss it, and the second boot's creation repairs re-establish both halves. */
function paneAndPortsAreExclusive(context: unknown, standing: Store | null): ConstraintAnswer {
  let pane: unknown
  let pair: unknown
  if (atWrite(context) && standing !== null) {
    pane = readAt(standing, PANE_ADDRESS, 'mem')
    pair = readAt(standing, EXCLUSION_ADDRESS, 'mem')
  } else {
    const register = plain(context) ? context['value'] : undefined
    pane = plain(register) ? register[PANE_ADDRESS[0] as string] : undefined
    pair = plain(register) ? register[EXCLUSION_ADDRESS[0] as string] : undefined
  }
  if (!bothStandOpen(pane, pair)) return true
  // THE REPAIR SETTLES THE PORTS AND LEAVES THE PANE ALONE (`D-123`): closing the ports is the safe half — the pane is
  // what the operator is doing — and it is expressible: the crossing's own answer is `{applied, state}` and the realm
  // paints it, while the pane's authored open state is already the user's.
  return { message: EXCLUSIVITY_MESSAGE, repair: (repairContext: unknown) => writeExclusion(repairContext, PORTS_CLOSED, standing) }
}

/** **THE FIRST ARM IS EXISTENCE** (`D-85`): `plain(value)` is the read's own admission — `read()` is
 *  `plain(durable) ? fromStored(durable) : …` — and a non-plain value is repaired by the import that address's absence
 *  used to key. **THE SECOND ARM IS THE VALUE'S (`D-105`)**: a record that STANDS and carries a member outside its four,
 *  or a present member outside its own domain, is REFUSED with no repair — before `D-105` it was passed through and
 *  `fromStored` answered the first-run defaults over it, so `{junk:true}` at this address erased the operator's token and
 *  grants while `read()` served a first run as though one had happened. **A record that stands as `{}` still PASSES**,
 *  exactly as `D-84` measured it (`{}` stays `{}`, and the per-member defaults are `fromStored`'s): this arm judges the
 *  members a value NAMES, and `{}` names none. Repairing a named member instead of refusing it would be the second
 *  authority over one value that the placeholder rule forbids. */
function recordMustStand(context: unknown, userDataDir: string): ConstraintAnswer {
  const value = plain(context) ? context['value'] : undefined
  if (!plain(value)) return { message: RECORD_ABSENT_MESSAGE, repair: (repairContext: unknown) => mintRecord(repairContext, userDataDir) }
  const node = nodeOf(context, RECORD_ADDRESS)
  if (node === null || recordAdmitsAt(node, value)) return true
  if (!atWrite(context)) return true
  return { message: RECORD_UNUSABLE_MESSAGE }
}

/** **THE APP-STATE ADDRESS'S BODY REFUSES AN ABSENT ROW LIST**, which is `recordedAt` — the very predicate the old
 *  construction used to decide whether to import (`D-85`; persistence §4). A value that stands without a `rows` array is
 *  a state the read cannot serve (`fromAppState` answers `undefined` for it) and the import is what the read fell back
 *  to, so it is repaired here with the record the import answers.
 *
 *  **AND A LIST THAT STANDS WITH A ROW THE READ SKIPS IS REFUSED, WITH NO REPAIR (`D-105`).** `fromAppState` SKIPS a row
 *  that is no record, names no non-empty string, or carries no `value` of its own — measured at this head: a write of
 *  `{rows: [{name: 7, value: 'x'}]}` answered `committed` and `readAppState()` then answered `rows: []`, so the row list
 *  the app had was gone and no member of the receipt said so. The existence arm above keeps a MISSING list its own — a
 *  boot over such a value still imports, which is what that arm is for — and this one judges the rows that ARE there. */
function appStateMustStand(context: unknown, userDataDir: string): ConstraintAnswer {
  const value = plain(context) ? context['value'] : undefined
  if (!recordedAt(value)) return { message: APP_STATE_ABSENT_MESSAGE, repair: (repairContext: unknown) => mintAppState(repairContext, userDataDir) }
  const node = nodeOf(context, APP_STATE_ADDRESS)
  if (node === null || appStateAdmitsAt(node, value)) return true
  if (!atWrite(context)) return true
  return { message: APP_STATE_UNUSABLE_MESSAGE }
}

/** **THE INSTANCE'S BATCH — FIVE DECLARATIONS IN ONE CONSTRUCTION: FOUR FAMILIES' EXISTENCE AND ONE INVARIANT OVER TWO
 *  OF THEM** (`D-84`, `D-85`, `D-123`). The list rides `StoreConfig['constraints']` at the `storeCreate` call below, so
 *  every address is ARMED before anything can write and is asked again at every later instant it is touched (`guide §7.2`;
 *  `D-65`'s batching, applied to an instance that constructs itself rather than being handed a store). **IT IS STILL ONE
 *  BATCH AND ONE INSTANCE**: the fifth declaration is an element of the list the one `storeCreate` call adopts, never a
 *  second store and never a second registration site.
 *
 *  **IT IS BUILT PER CONSTRUCTION, AND THAT IS THE `D-85` CHANGE TO `D-84`'s MODULE-LEVEL LIST**: the two `file`
 *  addresses' repairs must reach the profile directory the construction was handed — the path is the only thing that says
 *  WHERE the retired carriers stand — and `cfg.constraints`' act is taken while the caller holds no handle (`guide §7.2`
 *  (1)), so a body cannot read it off the instance. Two instances in one process therefore adopt two lists with the same
 *  five ids, and each store's registry is its own (`guide §6.2`).
 *
 *  **AND SINCE `D-123` THE LIST ALSO CARRIES A READER**: `standing` answers the store this same construction is building,
 *  which is `null` at the registration instant (the instance does not exist yet) and the live handle at every landing one.
 *  That is what lets ONE body judge two addresses: at a write it READS both halves (`guide §7.6`), and at creation it
 *  judges the whole register the context hands it. Nothing here reads the store through a module-level binding — the
 *  closure is per construction, which is `D-85`'s rule read at a third route.
 *
 *  **NO LISTENER COLLIDES WITH AN `id`, AND THAT IS A PROPERTY OF THE SPELLING**: this module mints
 *  `operator-settings:<n>@<address>` for a handle while the ids are the literals above, and the cross-kind rule `1.7.0`
 *  keeps reads the HANDLE — so a live listener and a pair stand at `['operator-settings']` or `['operator-exclusion']` at
 *  once, which is what `subscribe` does (D-71; guide §7.3's clause of 2026-11-01). */
function declarationsFor(userDataDir: string, standing: () => Store | null): readonly ConstraintDeclaration[] {
  return [
    { address: RECORD_ADDRESS, id: RECORD_MUST_STAND_ID, constraint: (context: unknown) => recordMustStand(context, userDataDir) },
    { address: APP_STATE_ADDRESS, id: APP_STATE_MUST_STAND_ID, constraint: (context: unknown) => appStateMustStand(context, userDataDir) },
    { address: EXCLUSION_ADDRESS, id: EXCLUSION_MUST_STAND_ID, constraint: (context: unknown) => exclusionMustStand(context, standing()) },
    { address: PANE_ADDRESS, id: PANE_MUST_STAND_ID, constraint: (context: unknown) => paneMustStand(context, standing()) },
    // THE INVARIANT STANDS LAST, AND THE POSITION IS LOAD-BEARING: at the creation instant each pair is asked in this
    // list's own order, so the two family halves are minted BEFORE the one body that judges them together is asked.
    { address: ROOT_ADDRESS, id: EXCLUSIVITY_ID, constraint: (context: unknown) => paneAndPortsAreExclusive(context, standing()) },
  ]
}

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings {
  let store: Store | null = null
  let refusal: OperatorSettingsReceipt | null = null
  try {
    // **THE BATCH IS THE CONSTRUCTION'S, AND IT IS WHAT MAKES ALL THREE ADDRESSES INVARIANTS RATHER THAN READ-SIDE
    // DEFAULTS** (D-84, D-85): `constraints` is `StoreConfig`'s fourth declared key and its absence is in domain, so
    // supplying it is the whole of the structural change — every address is armed before this constructor returns, the
    // `mem` pair's repair mints the value a `mem` address can never get from a file, and the two `file` repairs perform
    // the imports their addresses' absence used to key. The list is minted PER CONSTRUCTION because a repair must know
    // where the retired carriers stand and no handle exists at that instant (`guide §7.2` (1); `declarationsFor`).
    store = storeCreate({ journalLength: cap(options.journalLength), listeners: [], filePath: join(options.userDataDir, FILE_NAME), constraints: declarationsFor(options.userDataDir, () => store) })
  } catch (caught) {
    // A refused construction throws nothing across this boundary: no instance stands and every
    // later write answers this value (design §4 `ASM-4`; interface §2.1; guide §8.2).
    refusal = refusalOf(caught, null)
  }

  // THE DIAGNOSIS IS THE BOOT'S AND IT IS NOW READ OFF THE RECORD: the construction's own repair wrote the arm that
  // created the record, so this reads one member of one value and holds it for the process's life — the same lifetime
  // rule the read-side derivation had (interface §2; persistence §4), with the import outcome stored rather than
  // re-derived. A refused construction stands at `absent`, because no record stands and no arm ran (interface §2
  // `ASM-L2-3`), and that is the ONE arm no declaration can reach: with no instance there is no batch and no repair
  // (measured, `D-84`; `readAppState`'s two answer sites below serve it).
  let appLegacy: AppStateLegacy = 'absent'
  if (store !== null) {
    const standing = store
    let held: unknown
    try { held = standing.read(APP_STATE_ADDRESS, 'file') } catch { held = undefined }
    appLegacy = legacyOf(held)
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
    // **NO IMPORT STANDS ON THIS PATH ANY MORE** (D-85): the record address's absence is repaired at the creation
    // instant, so `durable` is the imported-or-placeholder record the store itself holds. `FIRST_RUN` remains as the
    // answer for the ONE arm no declaration can reach — a refused construction, whose read has no store behind it and
    // whose `FIRST_RUN` is therefore not a substituted placeholder but the only value there is (measured, D-84).
    const row = plain(durable) ? fromStored(durable) : FIRST_RUN
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

  const subscribe = (listener: OperatorSettingsListener, appStateListener?: OperatorAppStateListener): (() => void) => {
    const standing = store
    // No instance stands, or the subscriber is no callable at all: a withdrawal that withdraws
    // nothing, and never a throw (design §4, §8; behaviour §5).
    if (standing === null || typeof listener !== 'function') return () => {}
    const handles: string[] = []
    // **THREE ADDRESSES, ONE SUBSCRIPTION** (`D-104`): the two the record and the pair occupy, and the app-state rows'
    // own — which `D-82` clause 2 measured as delivering ZERO, so a module row's change reached its consumers only by
    // their own request. The third handle is registered exactly as the other two are; what differs is the ROUTING below.
    const addresses: readonly OperatorSettingsAddress[] = [RECORD_ADDRESS, EXCLUSION_ADDRESS, APP_STATE_ADDRESS, PANE_ADDRESS]
    const body = (address: OperatorSettingsAddress): void => {
      // The delivery carries the address and nothing else, so the subscriber reads the record for
      // what moved; a THROW IS CONTAINED HERE and withdraws that subscriber WHOLE — both handles —
      // so the write that triggered it still answers its receipt (design §8; `ASM-L2-6`).
      try {
        // **THE APP-STATE ROWS GO TO THEIR OWN BODY AND NOWHERE ELSE** (`D-104`): this address carries a whole value the
        // record's read does not project, so handing it to the record's listener would ask that listener to re-read a
        // record that did not move. A subscriber that supplied no second body hears it through the first — the one-argument
        // subscription's total reading, unchanged.
        if (typeof appStateListener === 'function' && address[0] === APP_STATE_ADDRESS[0]) {
          appStateListener()
          return
        }
        listener(detach(address) as OperatorSettingsAddress)
      } catch { withdraw(standing, handles) }
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

  // **THE THIRD ADDRESS'S READ READS THE RECORD, WHICH NOW ALWAYS STANDS** (D-85): each answer re-projects the store, and
  // the word — fixed at construction — never moves (interface §2; persistence §4; behaviour §7). **NO IMPORT STANDS ON
  // THIS PATH ANY MORE**: the rows are the record's, the names it could not carry are the record's, and the arm is the
  // one the construction read off it. A standing store whose record could not stand would be a construction that never
  // returned; the branch is answered rather than assumed, with the same empty answer the refused construction gets and
  // the `storage` member telling the two apart (interface §2 `ASM-L2-3`).
  const readAppState = (): AppStateAnswer => {
    const standing = store
    if (standing === null) return { rows: [], legacy: appLegacy, unrepresentable: [], storage: 'unreachable' }
    let held: unknown
    try { held = standing.read(APP_STATE_ADDRESS, 'file') } catch { held = undefined }
    const recorded = fromAppState(held)
    if (recorded === undefined) return { rows: [], legacy: appLegacy, unrepresentable: [], storage: 'standing' }
    return { rows: recorded, legacy: appLegacy, unrepresentable: unrepresentableOf(held), storage: 'standing' }
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

  // THE FOURTH ADDRESS'S ONE WRITE (`D-123`): one `mem` write of `{open}` and the sibling receipt verbatim — no
  // composition, no condition and no second verb. **IT REFUSES A NON-BOOLEAN FIRST**, and the arm is this module's own
  // `ValueRefusedAtBoundary` with `address:null`, exactly as `writeAppState`'s shape arms answer (interface §2): the
  // pane's record is `{open: boolean}` alone, so any other word is a value no invariant can judge.
  const writePane = (open: boolean): OperatorSettingsReceipt => {
    const standing = store
    if (refusal !== null) return refusal
    if (standing === null) return { status: 'refused', reason: 'FilePathUnreachable', message: 'no instance stands behind this module', address: null }
    if (typeof open !== 'boolean') return { status: 'refused', reason: 'ValueRefusedAtBoundary', message: 'open is a boolean', address: null }
    try {
      // ONE write at the one address, and the fourth position never supplied: a CALLER's write is its own commit.
      return receiptOf(standing.write(PANE_ADDRESS, 'mem', { open }))
    } catch (caught) {
      return refusalOf(caught, PANE_ADDRESS)
    }
  }

  return { read, write, subscribe, readAppState, writeAppState, writePane }
}
