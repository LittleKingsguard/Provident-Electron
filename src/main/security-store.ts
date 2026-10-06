// src/main/security-store.ts — the manual-UI security settings persistence
// store (docs/specs/mcp-endpoint.md §6.4). Loads a SecuritySettings JSON from
// a path, defaults to `read`+`dispatch` ON / `graph`+`code` OFF / token null
// on first run, and persists changes write-through so reload/restart restores
// them. This is the main-process owner of the config the Settings pane reads
// and the MCP server gate reflects.
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync, openSync, closeSync, fsyncSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import type { SecuritySettings } from '../shared/types.js'

export interface SecurityStoreOptions {
  /** The JSON file the settings persist to (usually in Electron userData). */
  path: string
}

/** THE RECEIPT — the persist outcome of a `set()` attempt, in the TWO closed
 *  forms (§2.1 item 5 / §0A item 3, G3 `U-STORE-SECURITY`):
 *  `{status:'committed'}` or `{status:'refused', reason:'write-failed'}` — the
 *  reason set is closed at the ONE token 'write-failed' (covering the tmp-write,
 *  the fsync and the rename failure points, §2.2 item 6). It is NOT a member of
 *  the store's 16-member refusal union (the G2 channel-tokens precedent — a
 *  security token added to the STORE's union is a collision finding). */
export type SecurityWriteReceipt = { status: 'committed' } | { status: 'refused'; reason: 'write-failed' }

export interface SecurityStore {
  get(): SecuritySettings
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SecuritySettings
  /** The persist outcome of the MOST RECENT `set()` attempt through this store
   *  instance — `null` ONLY before the first write attempt (a cold, never-written
   *  store, §2.1 item 4); after every `set()` a receipt exists — committed or
   *  refused — never a silent no-op (P-SE-TP-1). */
  lastWriteReceipt(): SecurityWriteReceipt | null
}

const VALID_GROUPS = new Set(['read', 'dispatch', 'graph', 'code', 'module'])

function sanitize(input: unknown): SecuritySettings {
  const src = (input ?? {}) as Partial<SecuritySettings>
  const enabled = Array.isArray(src.enabled)
    ? [...new Set(src.enabled.filter((g): g is string => typeof g === 'string' && VALID_GROUPS.has(g)))]
    : ['read', 'dispatch']
  const maxJournalLength = typeof src.maxJournalLength === 'number' && src.maxJournalLength > 0
    ? Math.floor(src.maxJournalLength)
    : undefined
  return { token: typeof src.token === 'string' && src.token !== '' ? src.token : null, enabled, maxJournalLength }
}

/** Create a security settings store backed by `path`. A missing/empty file is
 *  treated as the first-run default; a corrupt file falls back to the default
 *  (never throws — a settings read must not crash the app). */
export function createSecurityStore(opts: SecurityStoreOptions): SecurityStore {
  let current: SecuritySettings
  try {
    if (existsSync(opts.path)) {
      current = sanitize(JSON.parse(readFileSync(opts.path, 'utf8')))
    } else {
      current = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
    }
  } catch {
    current = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
  }

  // THE RECEIPT HOLDER (§2.3 — the persist outcome of the most recent set();
  // null until the first write attempt, P-SE-SM-1's IDLE terminal).
  let lastReceipt: SecurityWriteReceipt | null = null

  /** O-3's COPY DISCIPLINE (§2.5 item 1 / §0A item 4): every value this module returns from a
   *  declared member is DETACHED AT EVERY DEPTH — the copy is built with `Object.create(null)`
   *  as its prototype and a `seen` map as its cycle guard (the `snapshotValue` shape, §0 ruling
   *  6), never a JSON round-trip (§2.2 item 2's reason). */
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

  /** O-2's ADMISSION, AND ITS REFUSAL (§2.2 items 3/4/5/6; §6 PAR-2…PAR-5) — the check runs over
   *  the patch's FOUR declared members and BEFORE the write path touches the filesystem (§0A item
   *  3). A value the tier cannot persist AS ITSELF, and which is not one of the DOCUMENTED
   *  coercions' own declared inputs (§2.2 item 3: the `null` clear on `token`/`maxJournalLength`,
   *  the numeric "else cleared" arm, the `undefined` absent marker, the group filter's dropped
   *  non-group strings), REFUSES THE WHOLE PATCH: `null` is this function's answer, and no
   *  filesystem call is made for it. A patch OUTSIDE the declared domain — a non-object, an
   *  array, a non-plain object — refuses in the same form, so `set()` never throws (§2.3 item 1:
   *  the landed `set(null)` TypeError is CLOSED). */
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
    const add = src.groups === undefined ? [] : groupSet(src.groups)
    if (add === null) return null
    const del = src.disable === undefined ? [] : groupSet(src.disable)
    if (del === null) return null
    let token: string | null = current.token
    if (src.token !== undefined) {
      if (src.token === null || src.token === '') token = null
      else if (typeof src.token === 'string') token = src.token
      else return null
    }
    let maxJournalLength: number | undefined = current.maxJournalLength
    if (src.maxJournalLength !== undefined) {
      if (src.maxJournalLength === null) maxJournalLength = undefined
      else if (typeof src.maxJournalLength === 'number') {
        // The NON-FINITE pair refuses (§2.2 item 3: "`Infinity`/`-Infinity` … REFUSE the patch" —
        // the measured divergence's own fixture). `NaN` does NOT: §2.2 item 3 declares it a
        // documented-clear-arm value ("NaN is unrepresentable but sits in the documented clear
        // arm, which is exactly why it needs this rule rather than the predicate alone") — the
        // `> 0` test below is the landed rule and clears it.
        if (src.maxJournalLength === Infinity || src.maxJournalLength === -Infinity) return null
        maxJournalLength = src.maxJournalLength > 0 ? Math.floor(src.maxJournalLength) : undefined
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
  function persist(candidate: SecuritySettings): SecurityWriteReceipt {
    const tmp = `${opts.path}.tmp`
    try {
      mkdirSync(dirname(opts.path), { recursive: true })
      writeFileSync(tmp, JSON.stringify(candidate, null, 2))
      const tmpFd = openSync(tmp, 'r')
      fsyncSync(tmpFd)
      closeSync(tmpFd)
      renameSync(tmp, opts.path)
    } catch {
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
      try {
        rmSync(tmp, { recursive: true, force: true })
      } catch {
        // swallowed by design: the refused receipt is the write's only answer
      }
      return { status: 'refused', reason: 'write-failed' }
    }
    // THE COMMIT POINT HAS PASSED (§0A item 2): the rename already put the candidate's bytes at
    // the real path, so the directory fsync is a best-effort DURABILITY STRENGTHENING — its own
    // failure is swallowed and the write stays `committed`, live still equals durable.
    try {
      const dirFd = openSync(dirname(opts.path), 'r')
      fsyncSync(dirFd)
      closeSync(dirFd)
    } catch {
      // swallowed by design: a refusal here would roll the record back out of the file's content
    }
    return { status: 'committed' }
  }

  // THE DECLARED CENSUS ORDER (§2.5 item 3 / §0A item 5): `Object.keys(store)` is EXACTLY
  // `["get","lastWriteReceipt","set"]` — the three value-returning members, in the order the
  // contract declares them.
  return {
    get(): SecuritySettings {
      // O-3: the record's DEEP DETACHED copy — fresh at every depth, cycle-safe and
      // prototype-safe (§2.1 item 5 / §2.5 items 1/2).
      return freshCopy(current)
    },
    lastWriteReceipt(): SecurityWriteReceipt | null {
      // O-3: a FRESH copy per call (§2.1 item 6 / §2.5 item 4(b)) — the tier's own receipt object
      // is NEVER handed out, and two calls never answer the same object. The copy is a PLAIN
      // object literal (§0A item 4): the receipt is a value this module authors and no caller
      // value reaches it, so there is no prototype hazard to guard.
      return lastReceipt === null ? null : { ...lastReceipt }
    },
    set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SecuritySettings {
      // 1 · ADMISSION (§2.1 item 3 step 1 / §2.2): a value the tier cannot persist refuses the
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
      // 2/3 · THE CANDIDATE IS A LOCAL, and the write path is handed THAT candidate — never the
      // closure's record (§0A item 3).
      const staged = persist(candidate)
      // 4 · THE COMMIT POINT (§2.1 item 3 step 4 / §2.3 item 2): the record advances IFF a save
      // succeeded — HERE and nowhere else, at the first instant the file's bytes ARE the
      // candidate. A refusal therefore returns the PRE-WRITE record: live equals durable.
      if (staged.status === 'committed') current = candidate
      // 6 · THE ANSWER: the record now live (the candidate on a commit, the PRE-WRITE record on a
      // refusal), plus the receipt of THIS attempt (§2.1 item 3 step 6).
      lastReceipt = staged
      return this.get()
    },
  } as SecurityStore
}
