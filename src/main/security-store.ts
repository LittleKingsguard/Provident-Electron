// src/main/security-store.ts — the manual-UI security settings persistence
// store (docs/specs/mcp-endpoint.md §6.4). Loads a SecuritySettings JSON from
// a path, defaults to `read`+`dispatch` ON / `graph`+`code` OFF / token null
// on first run, and persists changes write-through so reload/restart restores
// them. This is the main-process owner of the config the Settings pane reads
// and the MCP server gate reflects.
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync, openSync, closeSync, fsyncSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import type { SecuritySettings } from '../shared/types.js'
// `docs/specs/tier4-arbitrary-storage.md` `§2.4` item 1 — THE REFUSAL'S CHANNEL TOKEN AND ITS
// SERVER-AUTHORED MESSAGE are HOMED BESIDE `EXCLUSION_CLOSED` in `mcp-server.ts` and reach this
// module BY IMPORT (`§2.1` item 5 step 1: `lastReceipt = { status:'refused',
// reason:'tier4-closed', message: TIER4_CLOSED_MESSAGE }`). `mcp-server.ts` imports nothing from
// this module, so the edge is acyclic; the constant is never re-spelled here (`§2.4` item 4:
// built once, in the module that mints it).
import { TIER4_CLOSED, TIER4_CLOSED_MESSAGE } from './mcp-server.js'

export interface SecurityStoreOptions {
  /** The JSON file the settings persist to (usually in Electron userData). */
  path: string
  /** `§0A` item 1 / `§6` `PAR-2` — **THE ONE BOOLEAN'S NAMED, GATE-LESS READER**, constructed
   *  before the store and handed to it here: a THUNK read ONCE PER CALL at the caller's own turn
   *  and never cached across a call (the landed `exclusionTurn` precedent, `mcp-server.ts:72-81`).
   *  `true` means the store is OPEN (the MCP endpoint is blocked), `false` means CLOSED. ITS
   *  ABSENT ARM IS TOTAL AND FAIL-SAFE (`§3.2` `FS-T4-09`): with the option absent — or with a
   *  thunk that throws, or one answering a non-boolean — the tier answers CLOSED, never a throw.
   *  The store CONSULTS this state; it never holds, moves or persists it (`§2.5` items 1/2). */
  tier4Open?: () => boolean
}

/** THE RECEIPT — the persist outcome of a `set()` attempt, in the TWO closed
 *  forms (§2.1 item 5 / §0A item 3, G3 `U-STORE-SECURITY`):
 *  `{status:'committed'}` or `{status:'refused', reason:'write-failed'}` — the
 *  reason set is closed at the ONE token 'write-failed' (covering the tmp-write,
 *  the fsync and the rename failure points, §2.2 item 6). It is NOT a member of
 *  the store's 16-member refusal union (the G2 channel-tokens precedent — a
 *  security token added to the STORE's union is a collision finding). */
export type SecurityWriteReceipt = { status: 'committed' } | { status: 'refused'; reason: 'write-failed' }

/** `§2.1` item 3 — **THE TWO NEW DECLARED TYPES OF THIS UNIT** (`§0A` item 5 names the
 *  spellings), declared BESIDE the landed three: **`Tier4Entry`** is the value this module MINTS
 *  from the tier's own map (its `name` is the admitted key verbatim, its `value` a detached copy),
 *  and **`Tier4ClosedRefusal`** is the third member of the already-declared receipt FORM family —
 *  `§2.4` item 3: `status` and `reason` closed exactly as the landed pair's are, `message`
 *  additive. **`Tier4WriteAnswer` is a declared SUPERSET**, so that `SecurityWriteReceipt` ITSELF
 *  stays BYTE-IDENTICAL (`§2.4` item 3: no third form is added to it). */
export type Tier4Entry = { name: string; value: unknown }
export type Tier4ClosedRefusal = { status: 'refused'; reason: 'tier4-closed'; message: string }
export type Tier4WriteAnswer = SecurityWriteReceipt | Tier4ClosedRefusal

/** `§2.2` item 2 — THE PERSISTED RECORD'S DECLARED SHAPE: the three landed members plus the ONE
 *  new member `entries`, which is **ABSENT until the first successful arbitrary write** (`(i)`) and
 *  is otherwise a plain object mapping an admitted name to its value VERBATIM. NO VERSION member of
 *  any spelling is added (`§2.2` item 2 `(iv)` — recorded by its own id, so the module's bytes carry
 *  no version token at all: the persisted-format pin's own `S-4` probe reads `src/main/**` for one
 *  and must keep finding it ONLY at the tier-1 landing site) and no third filename exists. */
type PersistedSecurityRecord = SecuritySettings & { entries?: Record<string, unknown> }

export interface SecurityStore {
  get(): SecuritySettings
  /** The persist outcome of the MOST RECENT READ/WRITE attempt through this store
   *  instance — `null` ONLY before the first write attempt (a cold, never-written
   *  store, §2.1 item 4); after every attempt a receipt exists — committed or
   *  refused — never a silent no-op (P-SE-TP-1). `§2.1` item 3 widens the holder's
   *  declared type to `Tier4WriteAnswer` while `SecurityWriteReceipt` itself stays
   *  byte-identical. */
  lastWriteReceipt(): Tier4WriteAnswer | null
  /** `§2.1` item 3 / `§3.2` `FS-T4-09` — `null` **iff** the name was never written and never
   *  ingested; otherwise `{ name, value }`, DETACHED at every depth; **on a refused read, the
   *  PRE-CALL value of that name, detached** (`§2.4` item 6) — a refusal is NEVER a throw and
   *  NEVER in the value; `null` never means "refused" (`§6` `PAR-5`). */
  readEntry(name: string): Tier4Entry | null
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SecuritySettings
  /** `§2.1` item 5 step 6 / `§2.2` item 5 — the name-addressed write: the closed answer of THIS
   *  attempt (`{status:'committed'}` · the landed `write-failed` · the new `tier4-closed`), the
   *  gate consult FIRST, the name's domain second, the landed value-preservation admission third.
   *  TOTAL: never a throw, for any `name`, any `value`, any state. There is NO delete arm
   *  (`writeEntry(name, undefined)` is REFUSED, never a delete — `§1.3` item 11). */
  writeEntry(name: string, value: unknown): Tier4WriteAnswer
}

const VALID_GROUPS = new Set(['read', 'dispatch', 'graph', 'code', 'module'])

/** `§2.2` item 4 arm 3 — THE FOUR DECLARED NAMES of the persisted record. Every OTHER top-level
 *  member the file carries is INGESTED INTO `entries` UNDER ITS OWN NAME, VERBATIM — PRESERVED,
 *  never dropped, never routed into a landed member (the arm that closes the KEY axis of
 *  `SECURITY-STORE-SILENT-KEY-DROP`). */
const DECLARED_RECORD_MEMBERS = new Set(['token', 'enabled', 'maxJournalLength', 'entries'])

/** `§2.2` item 3 — **`sanitize()`'S FATE, DISCHARGED**: it SURVIVES as the record's validator
 *  (the three landed members keep their landed rules VERBATIM — a general record validating
 *  nothing would let a foreign file inject group-state into the live `SecurityGate`), and its
 *  reconstruction GAINS the `entries` ingestion, so it is no longer a three-member rebuild that
 *  discards the rest.
 *
 *  THE BOOT TREATMENT OF UNKNOWN KEYS, ARM BY ARM (`§2.2` item 4): a member naming one of the
 *  three landed names is ingested by that member's landed rule · a member naming `entries` is
 *  ingested member by member VERBATIM iff it IS a plain object, and TREATED AS ABSENT (the empty
 *  map, the raw value NOT preserved) otherwise — the ONE declared non-verbatim boot arm · a
 *  member OUTSIDE the four declared names is ingested into `entries` under its own name VERBATIM
 *  (even a name outside `PAR-3`'s domain is INGESTED: the boot does not adjudicate a name it
 *  merely read, so it survives every subsequent write while staying unreachable by `readEntry`) ·
 *  no per-entry admission runs at boot (a `JSON.parse`d value is representable by construction).
 *
 *  `entries` answers **`null`** iff the file carried NEITHER an `entries` member NOR any foreign
 *  top-level key — i.e. iff the member must stay ABSENT from the file (`§2.2` item 2 `(i)`). */
function ingest(input: unknown): { record: SecuritySettings; entries: Record<string, unknown> | null } {
  const src = (input ?? {}) as Record<string, unknown>
  const enabled = Array.isArray(src.enabled)
    ? [...new Set(src.enabled.filter((g): g is string => typeof g === 'string' && VALID_GROUPS.has(g)))]
    : ['read', 'dispatch']
  const maxJournalLength = typeof src.maxJournalLength === 'number' && src.maxJournalLength > 0
    ? Math.floor(src.maxJournalLength)
    : undefined
  const record: SecuritySettings = { token: typeof src.token === 'string' && src.token !== '' ? src.token : null, enabled, maxJournalLength }
  const declared = src.entries
  const declaredIsMap = declared !== null && typeof declared === 'object' && !Array.isArray(declared)
  const foreign = Object.keys(src).filter((name) => !DECLARED_RECORD_MEMBERS.has(name))
  const entries: Record<string, unknown> = {}
  if (declaredIsMap) for (const [name, value] of Object.entries(declared as Record<string, unknown>)) entries[name] = value
  for (const name of foreign) entries[name] = src[name]
  return { record, entries: declaredIsMap || foreign.length > 0 ? entries : null }
}

/** THE `fs` SEAM — **SPEC FINDING (b)** (`docs/specs/tier4-arbitrary-storage.md` `§9` item 5):
 *  *"the `fs` seam is undeclared, and `§3.3` item 4's 'NO FILESYSTEM CALL ON A REFUSAL' is not
 *  measurable without one"*. The red set hands an instrumented surface at construction so a
 *  refusal's no-`fs` property is a MEASUREMENT rather than an inference from a code read. It is
 *  deliberately **NOT a member of the declared `SecurityStoreOptions`** — whose census this unit
 *  moves `1 → 2` (`§5.1` item 4: `2 = path + tier4Open`) and NOT to `3` — so it is read as an
 *  undeclared construction extra; absent, every call below is the landed `node:fs` one, byte for
 *  byte. */
interface FsSurface {
  readFileSync: typeof readFileSync
  existsSync: typeof existsSync
  mkdirSync: typeof mkdirSync
  writeFileSync: typeof writeFileSync
  openSync: typeof openSync
  closeSync: typeof closeSync
  fsyncSync: typeof fsyncSync
  renameSync: typeof renameSync
  rmSync: typeof rmSync
}
const nodeFs: FsSurface = { readFileSync, existsSync, mkdirSync, writeFileSync, openSync, closeSync, fsyncSync, renameSync, rmSync }

/** Create a security settings store backed by `path`. A missing/empty file is
 *  treated as the first-run default; a corrupt file falls back to the default
 *  (never throws — a settings read must not crash the app). */
export function createSecurityStore(opts: SecurityStoreOptions): SecurityStore {
  /** THE CONSTRUCTION SEAM (`SPEC FINDING (b)` above) and **THE DECLARED READER** (`§2.1` item 2
   *  / `PAR-2`): the boolean is read ONCE PER CALL at the call's own turn, never cached across a
   *  call, and its absent/throwing/non-boolean arms are FAIL-SAFE CLOSED (`§3.2` `FS-T4-09`). */
  const fs: FsSurface = (opts as SecurityStoreOptions & { fs?: FsSurface }).fs ?? nodeFs
  const tier4Open = (): boolean => {
    try {
      return opts.tier4Open !== undefined && opts.tier4Open() === true
    } catch {
      return false
    }
  }
  /** `§2.4` items 3/4 — THE CLOSED REFUSAL VALUE, minted from the channel token and the
   *  server-authored message (`mcp-server.ts`), never from caller input. */
  const tier4Closed = (): Tier4ClosedRefusal => ({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })

  /** THE INGESTION, DEFERRED TO THE FIRST MEMBER CALL — `§2.2` item 4: *"Ingestion is a READ"*.
   *  The boot read (`main.ts:89`, the first member call the app makes) is therefore the ingestion
   *  TURN, and the record the tier answers is the record the FILE carries — reading (b), *"live
   *  state equals durable state"* (`§3.3` item 5) — while the CONSTRUCTOR still reads nothing and
   *  writes NO file (`S3` §2.1 item 2). The three landed boot fail-states (a missing file, a
   *  corrupt file, a path that IS a directory) answer the first-run default, never a throw. */
  let loaded = false
  let current: SecuritySettings = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
  /** THE ARBITRARY-DATA MAP (`§2.2` item 2): `null` iff the member must stay ABSENT from the
   *  file — i.e. until the first successful arbitrary write (or the first boot that ingested one
   *  from the file's own bytes). */
  let entries: Record<string, unknown> | null = null
  function load(): void {
    if (loaded) return
    loaded = true
    try {
      if (fs.existsSync(opts.path)) {
        const ingested = ingest(JSON.parse(fs.readFileSync(opts.path, 'utf8')))
        current = ingested.record
        entries = ingested.entries
      }
    } catch {
      current = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
      entries = null
    }
  }

  // THE RECEIPT HOLDER (§2.3 — the persist outcome of the most recent attempt;
  // null until the first write attempt, P-SE-SM-1's IDLE terminal; its declared
  // type widened to `Tier4WriteAnswer` by `§2.1` item 3).
  let lastReceipt: Tier4WriteAnswer | null = null

  /** O-3's COPY DISCIPLINE (§2.5 item 1 / §0A item 4): every value this module returns from a
   *  declared member is DETACHED AT EVERY DEPTH — the copy is built with `Object.create(null)`
   *  as its prototype and a `seen` map as its cycle guard (the `snapshotValue` shape, §0 ruling
   *  6), never a JSON round-trip (§2.2 item 2's reason).
   *  KICK-BACK (`ADV-1`'s sibling row `P-O3-IM-2` reading 7): this file's arrays are returned as
   *  REAL arrays (their prototype is `Array.prototype`), NOT null-prototype copies — because
   *  nulling `enabled`'s prototype makes the very red set that demands it throw: measured, that
   *  single reading costs `P-O2-IM-1` `7`, `P-M-SM-1` `4`, `P-O2-IM-2` `1`, `P-O1-TP-1` `1`,
   *  `P-O3-IM-2` `2` and `P-M-SM-2`/`P-O2-TP-1` whole-row failures (`TypeError: enabled.push is
   *  not a function` / `pre.enabled is not iterable` at `expectedPost()`, `probe()`'s consumers
   *  and `M-4`, all OUTSIDE `§5.1` item 1's edit set). Reported to the supervisor, not resolved
   *  by an edit. */
  function freshCopy<T>(value: T, seen: Map<object, unknown> = new Map()): T {
    if (value === null || typeof value !== 'object') return value
    const node: object = value
    const copied: unknown = seen.get(node)
    if (copied !== undefined) return copied as T
    if (Array.isArray(node)) {
      const elements: unknown[] = []
      seen.set(node, elements)
      for (const element of node as unknown[]) elements.push(freshCopy(element, seen))
      return elements as unknown as T
    }
    const record: Record<string, unknown> = Object.create(null) as Record<string, unknown>
    seen.set(node, record)
    for (const key of Object.keys(node as Record<string, unknown>)) {
      record[key] = freshCopy((node as Record<string, unknown>)[key], seen)
    }
    return record as unknown as T
  }

  /** O-2's VALUE-PRESERVATION PREDICATE (§2.2 item 1) — module-internal, NEVER EXPORTED (§2.1
   *  item 1). A value is REPRESENTABLE iff it is a JSON primitive — `null` · a boolean · a FINITE
   *  number · a string — or an ARRAY / ordinary object whose own enumerable members are each
   *  representable, with NO path revisiting a node it already visited (the cycle guard). Symbols,
   *  `BigInt`s, functions, `Map`/`Set`/`Date` and every other non-plain object are NOT
   *  representable; `NaN`/`Infinity`/`-Infinity` are NOT (the finite test). */
  function representableValue(value: unknown, seen: Set<object>): boolean {
    if (value === null) return true
    const kind = typeof value
    if (kind === 'string' || kind === 'boolean') return true
    if (kind === 'number') return Number.isFinite(value as number)
    if (kind !== 'object') return false
    const node = value as object
    if (seen.has(node)) return false
    seen.add(node)
    if (Array.isArray(node)) {
      for (const element of node as unknown[]) if (!representableValue(element, seen)) return false
      return true
    }
    const proto: object | null = Object.getPrototypeOf(node)
    if (proto !== Object.prototype && proto !== null) return false
    const members = node as Record<string, unknown>
    for (const key of Object.keys(members)) if (!representableValue(members[key], seen)) return false
    return true
  }

  /** The predicate is TOTAL (§2.2 item 1): a hostile value — a `Symbol`-bearing shape, a proxy
   *  whose own property reads throw — answers NOT representable and NEVER throws. */
  function admittedValue(value: unknown): boolean {
    try {
      return representableValue(value, new Set<object>())
    } catch {
      return false
    }
  }

  /** `§6` `PAR-3` — **THE NAME'S DOMAIN**: a non-empty `string` of at most 512 code units carrying
   *  NO control character (`U+0000`–`U+001F`, `U+007F`). Every other string is IN the domain,
   *  including the four landed persisted names — the name-addressed surface is a SEPARATE
   *  NAMESPACE from the record's top-level members. An out-of-domain name answers `null` on a
   *  READ and the landed refused form on a WRITE (`§2.1` item 5 step 2), never a throw and never a
   *  silent write. */
  function admittedName(name: unknown): name is string {
    return typeof name === 'string' && name.length > 0 && name.length <= 512 && !/[\u0000-\u001f\u007f]/.test(name)
  }

  /** O-2's ADMISSION, AND ITS REFUSAL (§2.2 items 3/4/5/6; §6 PAR-2…PAR-5) — the check runs over
   *  the patch's FOUR declared members and BEFORE the write path touches the filesystem (§0A item
   *  3). A value the tier cannot persist AS ITSELF, and which is not one of the DOCUMENTED
   *  coercions' own declared inputs (§2.2 item 3: the `null` clear on `token`/`maxJournalLength`,
   *  the numeric "else cleared" arm, the `undefined` absent marker, the group filter's dropped
   *  non-group strings), REFUSES THE WHOLE PATCH: `null` is this function's answer, and no
   *  filesystem call is made for it. A patch OUTSIDE the declared domain — a non-object, an
   *  array, a non-plain object — refuses in the same form, so `set()` never throws (§2.3 item 1:
   *  the landed `set(null)` TypeError is CLOSED). Each declared member is read from the patch
   *  EXACTLY ONCE and THAT reading is what is admitted, coerced and persisted (`ADV-1`). */
  function admittedRecord(patch: unknown): SecuritySettings | null {
    if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) return null
    const proto: object | null = Object.getPrototypeOf(patch)
    if (proto !== Object.prototype && proto !== null) return null
    const src = patch as { token?: unknown; groups?: unknown; disable?: unknown; maxJournalLength?: unknown }
    /** The documented group filter (§2.2 item 3): an array is deduplicated through the five
     *  VALID_GROUPS with current-state order preserved and a non-group string dropped; a
     *  non-group ELEMENT is dropped, but a value the tier cannot carry at ANY depth refuses the
     *  patch (§2.2 item 4) — as does a non-array (PAR-4/PAR-5). */
    const groupSet = (value: unknown): string[] | null => {
      if (!Array.isArray(value)) return null
      for (const element of value) if (!admittedValue(element)) return null
      return [...new Set(value.filter((group): group is string => typeof group === 'string' && VALID_GROUPS.has(group)))]
    }
    // EACH DECLARED MEMBER IS READ FROM THE PATCH EXACTLY ONCE (`ADV-1`, GATE 4's HIGH host fix;
    // `§2.2` item 2 — "the admitted-and-persisted value equals the value the caller supplied").
    // The patch arrives from a caller, so a member may be an ACCESSOR (or a proxy's get trap):
    // reading it again for the coercion would let a LATE read answer a DIFFERENT value than the
    // one the admission approved — a 6th read of `maxJournalLength` answering `Infinity` passes
    // the `> 0` guard, `Math.floor(Infinity)` is `Infinity`, and the tier would answer a
    // `committed` receipt with a cap LIVE that `JSON.stringify` turns into a `null` cap in the
    // file: exactly the live-versus-durable divergence (`§2.3` item 7 / I-1) this unit exists to
    // close, re-opened through the caller's object. One read per member admits THAT reading and
    // coerces/store THE SAME reading, so the admission and the persisted value cannot disagree.
    const patchGroups = src.groups
    const patchDisable = src.disable
    const patchToken = src.token
    const patchCap = src.maxJournalLength
    const add = patchGroups === undefined ? [] : groupSet(patchGroups)
    if (add === null) return null
    const del = patchDisable === undefined ? [] : groupSet(patchDisable)
    if (del === null) return null
    let token: string | null = current.token
    if (patchToken !== undefined) {
      if (patchToken === null || patchToken === '') token = null
      else if (typeof patchToken === 'string') token = patchToken
      else return null
    }
    let maxJournalLength: number | undefined = current.maxJournalLength
    if (patchCap !== undefined) {
      if (patchCap === null) maxJournalLength = undefined
      else if (typeof patchCap === 'number') {
        // The NON-FINITE pair refuses (§2.2 item 3: "`Infinity`/`-Infinity` … REFUSE the patch" —
        // the measured divergence's own fixture). `NaN` does NOT: §2.2 item 3 declares it a
        // documented-clear-arm value ("NaN is unrepresentable but sits in the documented clear
        // arm, which is exactly why it needs this rule rather than the predicate alone") — the
        // `> 0` test below is the landed rule and clears it.
        if (patchCap === Infinity || patchCap === -Infinity) return null
        maxJournalLength = patchCap > 0 ? Math.floor(patchCap) : undefined
      } else return null
    }
    const enabled = [...current.enabled]
    for (const group of add) if (!enabled.includes(group)) enabled.push(group)
    for (const group of del) {
      const at = enabled.indexOf(group)
      if (at !== -1) enabled.splice(at, 1)
    }
    return { token, enabled, maxJournalLength }
  }

  /** THE ATOMIC WRITE (§2.1 item 4 — CANDIDATE-PARAMETERISED: it reads NO closure state and
   *  touches NO record state, so a refusal leaves the record untouched BY CONSTRUCTION, §0A item
   *  3; §2.2 — G3's HEADLINE; the G2/module-store precedent's five-step shape). IN ORDER — the
   *  parent directory created recursively, the CANDIDATE STAGED to `${path}.tmp`, the staged file
   *  fsync'ed BEFORE the rename, the rename onto the real path (THE COMMIT POINT, §2.1 item 3 step
   *  4), then the parent DIRECTORY fsync'ed. A torn file at the real path is IMPOSSIBLE by
   *  construction (the rename is atomic on the same filesystem); a failure BEFORE the rename
   *  leaves the previous file intact at the real path and is RETURNED as the refused receipt (the
   *  catch-and-ignore swallow is still REPLACED by the receipt's answerability — a settings write
   *  must never crash the app, §7 item 6's dated re-point, 2026-10-03). A POST-RENAME
   *  directory-fsync failure is NOT a refusal (§0A item 2): the file's CONTENT is already the
   *  candidate from the moment the rename lands, so rolling the record back there would put the
   *  live record and the file's bytes into precisely the disagreement reading (b) forbids — the
   *  durability strengthening at that point is BEST-EFFORT and its failure moves nothing back. A
   *  stale `${path}.tmp` (a failure after the stage write) is removed best-effort on a CAUGHT
   *  failure — the tmp is never parsed as the record and is overwritten by the next write (§2.2
   *  items 3/6); a successful persist leaves NO tmp (the rename consumed it). */
  function persist(candidate: PersistedSecurityRecord, land: (staged: SecurityWriteReceipt) => void): SecurityWriteReceipt {
    const tmp = `${opts.path}.tmp`
    try {
      fs.mkdirSync(dirname(opts.path), { recursive: true })
      fs.writeFileSync(tmp, JSON.stringify(candidate, null, 2))
      const tmpFd = fs.openSync(tmp, 'r')
      fs.fsyncSync(tmpFd)
      fs.closeSync(tmpFd)
      fs.renameSync(tmp, opts.path)
    } catch {
      // `§2.6` item 5's `(h-i)` landing sink, refused arm (items 2(ii)/3(b)/4): the REFUSAL TERMINAL
      // is the caught failure, so the attempt's OWN refused closed form lands HERE — before the
      // best-effort cleanup, whose own failure stays swallowed — and the record is advanced by
      // NOTHING (the pre-write record is what `get()` answers at this terminal).
      // G3 gate-4 finding 1 (F-11, 2026-10-03): the stale-tmp cleanup must
      // NEVER escape persist() — a stale `${path}.tmp` that names a DIRECTORY
      // (or a protected path) made the earlier writeFileSync throw EISDIR and
      // THEN made `rmSync(tmp, {force:true})` throw ITS OWN EISDIR (force masks
      // only ENOENT), which escaped the catch: set() threw and no receipt was
      // answered — totality (§2.3 item 5) and never-throw (§3.3 I-4/I-7)
      // violated. The cleanup is BEST-EFFORT and its failure is SWALLOWED —
      // the receipt is the refusal, never a throw; `recursive` restores
      // writability when the stale tmp is a directory (§2.2 item 3's "the tmp
      // fate": a stale tmp is never the record and is removed/overwritten next).
      const refused: SecurityWriteReceipt = { status: 'refused', reason: 'write-failed' }
      land(refused)
      try {
        rmSync(tmp, { recursive: true, force: true })
      } catch {
        // swallowed by design: the refused receipt is the write's only answer
      }
      return refused
    }
    // THE COMMIT POINT HAS PASSED (§0A item 2): the rename already put the candidate's bytes at
    // the real path, so the directory fsync is a best-effort DURABILITY STRENGTHENING — its own
    // failure is swallowed and the write stays `committed`, live still equals durable.
    // `§2.6` item 5's `(h-i)` landing sink, committed arm (items 2(i)/3/4): the successful rename
    // is the FIRST instant the real path's bytes ARE the candidate, so the record's advance and
    // the attempt's own committed closed form land TOGETHER here — inside the write's own window,
    // BEFORE the directory fsync, never after `persist()` has returned (I-10-a / I-10-b).
    const committed: SecurityWriteReceipt = { status: 'committed' }
    land(committed)
    try {
      const dirFd = fs.openSync(dirname(opts.path), 'r')
      fs.fsyncSync(dirFd)
      fs.closeSync(dirFd)
    } catch {
      // swallowed by design: a refusal here would roll the record back out of the file's content
    }
    return committed
  }

  // THE DECLARED CENSUS ORDER (`§2.1` item 3 / `§5.1` item 4): `Object.keys(store)` is EXACTLY
  // `["get","lastWriteReceipt","readEntry","set","writeEntry"]` — the FIVE value-returning
  // members, in the order the contract declares them
  // (`5 = 3 (landed: get · lastWriteReceipt · set) + 2 (new: readEntry · writeEntry)`).
  return {
    get(): SecuritySettings {
      // O-3: the record's DEEP DETACHED copy — fresh at every depth, cycle-safe and
      // prototype-safe (§2.1 item 5 / §2.5 items 1/2). `G-2`: on a refused read the answer is the
      // tier's PRE-CALL record — which is this same value, because a read moves NOTHING, so the
      // refusal is SILENT IN THE VALUE (§2.4` item 6) and is legible on the CHANNEL alone.
      load()
      return freshCopy(current)
    },
    lastWriteReceipt(): Tier4WriteAnswer | null {
      // O-3: a FRESH copy per call (§2.1 item 6 / §2.5 item 4(b)) — the tier's own receipt object
      // is NEVER handed out, and two calls never answer the same object. The copy is a PLAIN
      // object literal (§0A item 4): the receipt is a value this module authors and no caller
      // value reaches it, so there is no prototype hazard to guard. `G-2`: the PRE-CALL receipt is
      // what this answers on a refused read, with NO carve-out for this member.
      return lastReceipt === null ? null : { ...lastReceipt }
    },
    readEntry(name: string): Tier4Entry | null {
      // `§2.1` item 5 step 2 — the NAME'S DOMAIN (the gate consult precedes it on a WRITE; a READ
      // has no gate consult of its own: its answer is the PRE-CALL value by construction). `§2.2`
      // item 6 — the value handed out is DETACHED at every depth, cycle-safe and prototype-safe.
      load()
      if (!admittedName(name)) return null
      if (entries === null || !Object.prototype.hasOwnProperty.call(entries, name)) return null
      return { name, value: freshCopy(entries[name]) }
    },
    set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SecuritySettings {
      load()
      // 1 · THE GATE CONSULT (`§2.1` item 5 step 1 / `G-1`), read ONCE at this call's own turn and
      // AHEAD of, and BESIDE, the landed admission check — the refusal the admission would ALSO
      // make answers `tier4-closed`, makes NO filesystem call and advances NOTHING. The answer is
      // the PRE-WRITE record (`this.get()`), and the receipt is the attempt's own closed refusal.
      if (!tier4Open()) {
        lastReceipt = tier4Closed()
        return this.get()
      }
      // 2 · ADMISSION (§2.1 item 5 step 3 / §2.2): a value the tier cannot persist refuses the
      // WHOLE patch HERE — no filesystem call at all, the record untouched, the landed refused
      // receipt (§0A item 1). A hostile patch is caught here too, so nothing escapes set().
      let candidate: SecuritySettings | null
      try {
        candidate = admittedRecord(patch)
      } catch {
        candidate = null
      }
      if (candidate === null) {
        lastReceipt = { status: 'refused', reason: 'write-failed' }
        return this.get()
      }
      // 3/4 · THE CANDIDATE IS A LOCAL, and the write path is handed THAT candidate — never the
      // closure's record (§0A item 3). THE PERSISTED CANDIDATE carries the `entries` member IFF it
      // must be present at all (`§2.2` item 2 `(i)`: ABSENT until the first successful arbitrary
      // write), so a `set()` can never mint an empty `entries` into the file and can never drop
      // the arbitrary data the file already carries (reading (b)).
      // 5 · THE LANDING SINK (§2.6 item 5's mechanism `(h-i)`, the ONE production site this clause
      // requires): the sink is the CALLER's own closure and it is invoked BY the write path
      // EXACTLY ONCE, at the attempt's terminal — so the record's advance and the attempt's own
      // closed form land TOGETHER there (§2.1 item 3 step 4 / §2.3 item 2: the record advances IFF
      // a save succeeded, at the first instant the file's bytes ARE the candidate; a refusal
      // advances nothing and answers the PRE-WRITE record). The write path itself is never given
      // `current` and reads no closure state, so §2.1 item 4's declared shape is unmoved.
      const persistedCandidate: PersistedSecurityRecord = entries === null ? candidate : { ...candidate, entries }
      persist(persistedCandidate, (staged) => {
        if (staged.status === 'committed') current = candidate
        lastReceipt = staged
      })
      // 6 · THE ANSWER: the record now live (the candidate on a commit, the PRE-WRITE record on a
      // refusal), plus the receipt of THIS attempt (§2.1 item 3 step 6).
      return this.get()
    },
    writeEntry(name: string, value: unknown): Tier4WriteAnswer {
      load()
      // 1 · THE GATE CONSULT (`§2.1` item 5 step 1 / `G-1`): CLOSED ⇒ no admission, no filesystem
      // call, no record advance, nothing written; the answer is the closed refusal VALUE and the
      // receipt is that same attempt.
      if (!tier4Open()) {
        lastReceipt = tier4Closed()
        return lastReceipt
      }
      // 2 · THE NAME'S DOMAIN, then 3 · THE LANDED VALUE-PRESERVATION ADMISSION (`admittedValue`):
      // an out-of-domain name and a non-representable value both answer the LANDED refused form,
      // make NO filesystem call and move nothing (`§2.2` item 5: `undefined` is NOT a delete).
      if (!admittedName(name) || !admittedValue(value)) {
        lastReceipt = { status: 'refused', reason: 'write-failed' }
        return lastReceipt
      }
      // 6 · THE COMMIT (`§2.1` item 5 step 6): the candidate entry is written into the CANDIDATE
      // record's `entries` map, `persist()` is handed that candidate, and the tier's live map
      // advances ONLY on a `committed` landing — the reading-(b) consequence (a `writeEntry` that
      // advanced the live map on a refused persist would make live disagree with durable).
      const candidateEntries: Record<string, unknown> = { ...(entries ?? {}), [name]: value }
      return persist({ ...current, entries: candidateEntries }, (staged) => {
        if (staged.status === 'committed') {
          entries = candidateEntries
          lastReceipt = staged
        } else {
          lastReceipt = staged
        }
      })
    },
  } as SecurityStore
}
