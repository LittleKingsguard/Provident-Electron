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

  /** THE ATOMIC WRITE (§2.2 — G3's HEADLINE; the G2/module-store precedent's
   *  five-step shape): IN ORDER — the parent directory created recursively, the
   *  serialized settings STAGED to `${path}.tmp`, the staged file fsync'ed
   *  BEFORE the rename, the rename onto the real path, then the parent DIRECTORY
   *  fsync'ed AFTER the rename. A torn file at the real path is IMPOSSIBLE by
   *  construction (the rename is atomic on the same filesystem); a failure at
   *  any point leaves the previous file intact at the real path and is RETURNED
   *  as the refused receipt — the catch-and-ignore swallow (the old plain
   *  `writeFileSync` inside `catch { }`; "persist failures are non-fatal… never
   *  crash the app on a settings write") is REPLACED: the landing keeps the
   *  landed discipline (the in-memory config still applies for this process
   *  lifetime, §2.1 item 2 — a settings write must never crash the app) and adds
   *  the receipt's answerability (§7 item 6's dated re-point, 2026-10-03). A
   *  stale `${path}.tmp` (a failure after the stage write) is removed
   *  best-effort on a CAUGHT failure — the tmp is never parsed as the record and
   *  is overwritten by the next write (§2.2 items 3/6); a successful persist
   *  leaves NO tmp (the rename consumed it). */
  function persist(): SecurityWriteReceipt {
    const tmp = `${opts.path}.tmp`
    try {
      mkdirSync(dirname(opts.path), { recursive: true })
      writeFileSync(tmp, JSON.stringify(current, null, 2))
      const tmpFd = openSync(tmp, 'r')
      fsyncSync(tmpFd)
      closeSync(tmpFd)
      renameSync(tmp, opts.path)
      const dirFd = openSync(dirname(opts.path), 'r')
      fsyncSync(dirFd)
      closeSync(dirFd)
      return { status: 'committed' }
    } catch {
      rmSync(tmp, { force: true })
      return { status: 'refused', reason: 'write-failed' }
    }
  }

  return {
    get(): SecuritySettings {
      return { token: current.token, enabled: [...current.enabled], maxJournalLength: current.maxJournalLength }
    },
    set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SecuritySettings {
      const add = Array.isArray(patch.groups)
        ? [...new Set(patch.groups.filter((g) => VALID_GROUPS.has(g)))]
        : []
      const del = Array.isArray(patch.disable)
        ? [...new Set(patch.disable.filter((g) => VALID_GROUPS.has(g)))]
        : []
      const enabled = [...current.enabled]
      for (const g of add) if (!enabled.includes(g)) enabled.push(g)
      for (const g of del) {
        const i = enabled.indexOf(g)
        if (i !== -1) enabled.splice(i, 1)
      }
      const token = patch.token !== undefined ? (typeof patch.token === 'string' && patch.token !== '' ? patch.token : null) : current.token
      const maxJournalLength = patch.maxJournalLength !== undefined
        ? (typeof patch.maxJournalLength === 'number' && patch.maxJournalLength > 0 ? Math.floor(patch.maxJournalLength) : undefined)
        : current.maxJournalLength
      current = { token, enabled, maxJournalLength }
      lastReceipt = persist()
      return this.get()
    },
    lastWriteReceipt(): SecurityWriteReceipt | null {
      return lastReceipt
    },
  } as SecurityStore
}
