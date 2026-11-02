// tests/module-registry-fixture.ts — THE MODULE REGISTRY, BUILT OVER THE CROSSING'S OWN ROWS.
//
// WHAT THIS REPLACES, AND WHY IT IS NOT A SECOND STORE. Until 2026-11-02 the module rows of
// `tests/module-tools.test.ts`, `tests/module-pane.test.ts` and `tests/module-e2e.test.ts` built their
// fixtures with `createModuleStore({ path: join(dir, 'modules.json') })` — the raw-`fs` registry in
// `src/main/module-store.ts`, writing `<userData>/provident-modules.json`. That file is DELETED with
// the Q-5 arm that was its only reader (`D-78`'s second clause; the user's ruling; carried as `D-81`),
// and the name it wrote is dropped, not migrated. So the three files' fixtures are re-derived HERE,
// to the shape the product actually has: **the `file.modules.<id>` rows of the secure crossing's
// `['operator-app-state']` record, reached through `createSettingsSurface`'s two verbs
// (`state()`, `commit()`).** That is the same surface `src/main/main.ts` builds its own registry
// object over, and it is `src/**`'s ONLY writer of a module row.
//
// WHY A FIXTURE AT ALL, STATED SO NOBODY MISTAKES IT FOR A COMPOSITION: the one implementation of
// `ModuleStore` the product has is an object literal inside `main()`, and `src/main/main.ts` imports
// `electron` at module scope, so NO node-suite row can construct it (`interface.md` §8). This file is
// the node suite's stand-in, and it is a TEST FILE — it adds no store to `src/`, opens no second file
// and is imported by no production path. Its six verbs mirror `main.ts`'s literal member for member:
//
//   · `get` / `list`  — the `file.modules.`-prefixed rows, the value's object-ness checked exactly as
//                        `moduleRecordsOf()` checks it;
//   · `status`        — `quarantined` by re-deriving the hash from the record's own `source`, and
//                        `corrupt` from the SURFACE's diagnosis (`legacy === 'corrupt' ||
//                        storage === 'unreachable'`), never from a file of its own;
//   · `put`           — the same four refusals `main.ts` makes (object, name, version, source), then
//                        ONE `commit` of the whole composed list through the replace-or-append rule;
//   · `remove` / `setDisabled` — one `commit` each, as `main.ts` issues.
//
// THE CLAIM EACH SURVIVING ROW KEEPS IS THE ONE IT HAD: they were never about `provident-modules.json`
// — every one of them drives a CONSUMER of the registry (the `module.*` tools, the SecurePanels
// bridge, the store→router→MCP chain) and asserted what the consumer answers. What moves is where the
// rows come from, and it moves to the crossing.
import { createHash } from 'node:crypto'
import { createSettingsSurface } from '../src/main/settings-surface/index.js'
import type { ModuleRecord, ModuleStore, ModuleStoreStatus } from '../src/main/mcp-server.js'

const PREFIX = 'file.modules.'

const sha256 = (source: string): string => createHash('sha256').update(source, 'utf8').digest('hex')

/** `main.ts`'s replace-or-append rule: the row named `key` replaced in place, else appended. An
 *  append would leave two rows naming one name, which the whole-map write refuses as a VALUE — so a
 *  duplicate install would refuse the commit rather than update the record (`interface.md` §6). */
function rowsWith(
  rows: readonly { name: string; value: unknown }[],
  key: string,
  value: unknown,
): { name: string; value: unknown }[] {
  const next: { name: string; value: unknown }[] = []
  let replaced = false
  for (const row of rows) {
    if (row.name !== key) next.push(row)
    else {
      next.push({ name: key, value })
      replaced = true
    }
  }
  if (!replaced) next.push({ name: key, value })
  return next
}

/**
 * The module registry over a real crossing: a `provident-storeroom` instance inside
 * `createSettingsSurface({ userDataDir })`, whose rows are the registry. `userDataDir` is the
 * scratch profile the caller owns and removes; nothing here names a file.
 *
 * A refused `commit` THROWS here rather than being swallowed, because a fixture whose write
 * silently failed would green a row about an install that never landed.
 */
export function createModuleRegistry(userDataDir: string): ModuleStore {
  const surface = createSettingsSurface({ userDataDir })

  const recordsOf = (): ModuleRecord[] => {
    const out: ModuleRecord[] = []
    for (const row of surface.state().rows) {
      if (!row.name.startsWith(PREFIX)) continue
      const entry: unknown = row.value
      if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) out.push(entry as ModuleRecord)
    }
    return out
  }

  const commitWith = (key: string, rec: ModuleRecord): void => {
    const answer = surface.commit(rowsWith(surface.state().rows, key, rec))
    if (answer.status !== 'committed') {
      throw new Error(`the registry's commit was REFUSED: ${JSON.stringify(answer)} — the crossing's`)
    }
  }

  const registry: ModuleStore = {
    get(name: string): ModuleRecord | undefined {
      const entry: unknown = surface.state().rows.find((row) => row.name === `${PREFIX}${name}`)?.value
      if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) return undefined
      return entry as ModuleRecord
    },
    list(): ModuleRecord[] {
      return recordsOf()
    },
    status(): ModuleStoreStatus {
      const loadedNames: string[] = []
      const quarantinedNames: string[] = []
      const answer = surface.state()
      for (const row of answer.rows) {
        if (!row.name.startsWith(PREFIX)) continue
        const rec = row.value as ModuleRecord
        if (rec === null || typeof rec !== 'object' || Array.isArray(rec)) continue
        // boot re-verification, exactly as `main.ts` states it: the hash is ALWAYS re-derived
        if (rec.hash !== sha256(rec.source)) quarantinedNames.push(rec.name)
        else if (rec.disabled !== true) loadedNames.push(rec.name)
      }
      return {
        corrupt: answer.legacy === 'corrupt' || answer.storage === 'unreachable',
        quarantined: quarantinedNames,
        loaded: loadedNames,
      }
    },
    put(record: ModuleRecord): ModuleRecord {
      if (record === null || typeof record !== 'object') throw new Error('module put: record must be an object')
      if (typeof record.name !== 'string' || record.name === '') throw new Error('module put: name required')
      if (typeof record.version !== 'string' || record.version === '') throw new Error('module put: version required')
      if (typeof record.source !== 'string' || record.source === '') throw new Error('module put: source required')
      const rec: ModuleRecord = {
        name: record.name,
        version: record.version,
        source: record.source,
        hash: sha256(record.source),
        capabilities: record.capabilities,
        installedAt: record.installedAt ?? new Date().toISOString(),
        disabled: record.disabled === true,
        quarantined: false,
      }
      commitWith(`${PREFIX}${rec.name}`, rec)
      return { ...rec, capabilities: rec.capabilities }
    },
    remove(name: string): boolean {
      const key = `${PREFIX}${name}`
      const held = surface.state().rows
      if (!held.some((row) => row.name === key)) return false
      const answer = surface.commit(held.filter((row) => row.name !== key))
      if (answer.status !== 'committed') {
        throw new Error(`the registry's remove was REFUSED: ${JSON.stringify(answer)}`)
      }
      return true
    },
    setDisabled(name: string, disabled: boolean): void {
      const rec = registry.get(name)
      if (rec === undefined) return
      commitWith(`${PREFIX}${name}`, { ...rec, disabled })
    },
  }
  return registry
}
