// src/main/modules/resolver.ts — the module ranges, the cycle, the application floor, and the ORDER
// (`L2` §7, `L1` §4 `C-11`, `design.md` §5).
//
// The order IS the answer: a total order over the admitted set in which every dependency precedes its
// dependent, ties keeping ARRIVAL order and never a sort, so "the standard menus pane first, then the
// new submenu" is the resolver's reading and no caller re-sorts (`C-6`, `D-304`). The one number the
// application floor is judged against is handed in by the caller and is never read here.
import type { ModuleRequires, RefusalName } from '../../shared/module-contract.js'

export interface Candidate {
  readonly name: string
  readonly version: string
  readonly requires?: ModuleRequires
}

export type Resolution =
  | { readonly ok: true; readonly order: readonly string[] }
  | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }

export function resolve(candidates: readonly Candidate[], appVersion: string): Resolution {
  const held = new Map<string, Candidate>()
  for (const candidate of candidates) held.set(candidate.name, candidate)

  for (const candidate of candidates) {
    const floor = candidate.requires?.app
    if (typeof floor === 'string' && floor !== '' && !satisfies(appVersion, floor)) {
      return {
        ok: false,
        reason: 'application-version-unsatisfied',
        subject: `requires app ${floor}; ${appVersion} stands`,
      }
    }
    for (const dependency of candidate.requires?.modules ?? []) {
      const met = held.get(dependency.name)
      if (met === undefined || !satisfies(met.version, dependency.versionRange)) {
        return {
          ok: false,
          reason: 'dependency-unsatisfied',
          subject: `requires ${dependency.name} ${dependency.versionRange}; ${met === undefined ? 'not admitted' : met.version}`,
        }
      }
    }
  }

  const indegree = new Map<string, number>()
  const dependents = new Map<string, string[]>()
  for (const candidate of candidates) {
    indegree.set(candidate.name, indegree.get(candidate.name) ?? 0)
    for (const dependency of candidate.requires?.modules ?? []) {
      const list = dependents.get(dependency.name) ?? []
      list.push(candidate.name)
      dependents.set(dependency.name, list)
      indegree.set(candidate.name, (indegree.get(candidate.name) ?? 0) + 1)
    }
  }

  const ready: string[] = candidates.filter((candidate) => (indegree.get(candidate.name) ?? 0) === 0).map((candidate) => candidate.name)
  const order: string[] = []
  while (ready.length > 0) {
    const name = ready.shift() as string
    order.push(name)
    for (const dependent of dependents.get(name) ?? []) {
      const remaining = (indegree.get(dependent) ?? 0) - 1
      indegree.set(dependent, remaining)
      if (remaining === 0) ready.push(dependent)
    }
  }

  if (order.length < candidates.length) {
    const stuck = candidates.filter((candidate) => !order.includes(candidate.name)).map((candidate) => candidate.name)
    return { ok: false, reason: 'dependency-cycle', subject: `cycle among ${stuck.join(', ')}` }
  }
  return { ok: true, order }
}

/** `>`, `>=`, `<`, `<=`, `=` and a bare exact version, on dotted numerics. An UNPARSABLE version or
 *  range is UNSATISFIED and named by the caller's refusal, never silently satisfied (`L2` §7). */
export function satisfies(version: string, range: string): boolean {
  const holding = parseVersion(version)
  const wanted = typeof range === 'string' ? range.trim() : ''
  if (holding === null || wanted === '') return false
  const parts = /^(>=|<=|>|<|=)?\s*(\S+)$/.exec(wanted)
  if (parts === null) return false
  const bound = parseVersion(parts[2] ?? '')
  if (bound === null) return false
  const sign = compareVersions(holding, bound)
  switch (parts[1] ?? '=') {
    case '>':
      return sign > 0
    case '>=':
      return sign >= 0
    case '<':
      return sign < 0
    case '<=':
      return sign <= 0
    default:
      return sign === 0
  }
}

function parseVersion(text: string): readonly number[] | null {
  if (typeof text !== 'string') return null
  const trimmed = text.trim()
  if (!/^\d+(\.\d+)*$/.test(trimmed)) return null
  return trimmed.split('.').map((part) => Number(part))
}

function compareVersions(left: readonly number[], right: readonly number[]): number {
  const length = Math.max(left.length, right.length)
  for (let index = 0; index < length; index += 1) {
    const a = left[index] ?? 0
    const b = right[index] ?? 0
    if (a !== b) return a < b ? -1 : 1
  }
  return 0
}
