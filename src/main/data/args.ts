// src/main/data/args.ts — argument validation: the declared member set checked by name, then the
// path domain, the cursor domain, the volatile spelling and the sort key (`interface.md` §1;
// `behaviour.md` §4; D-13). Every refusal here is a value that names what it refused, and the
// member set is checked FIRST — ahead of the reading and of any byte (`design.md` §3).

import { sentence } from './mapper.js'
import type { DataLedger, DataPath } from './types.js'

export type Parsed<T> = { ok: true; value: T } | { ok: false; ledger: DataLedger }

/** The three spellings the store's volatile tiers would answer to; this surface holds the durable
 *  profile only, so a first segment beginning with one of them is refused, never dropped (D-13). */
const VOLATILE_PREFIXES: readonly string[] = ['mem.', 'temp.', 'secure.']

/** A refused call, naming the member it refused. Never a throw (`interface.md` §6; G1). */
function malformed(detail: string): { ok: false; ledger: DataLedger } {
  return {
    ok: false,
    ledger: { status: 'refused', reason: 'malformed-arguments', message: `${sentence('malformed-arguments')}: ${detail}` },
  }
}

/** A refusal whose reason is fixed by the spelling rather than by a member. */
function refusal(reason: DataLedger['reason']): { ok: false; ledger: DataLedger } {
  return { ok: false, ledger: { status: 'refused', reason, message: sentence(reason) } }
}

/** `arguments` as a plain object of its own enumerable members: anything else, and any own key
 *  outside the tool's declared set, is refused BY NAME and never ignored (`interface.md` §1).
 *  AN OMITTED `arguments` IS THE SAME CALL AS `{}` — the registration boundary folds the two
 *  together with `z.preprocess((carried) => carried ?? {}, …)`, and this adapter agrees with it, so
 *  `list`/`journal` answer the whole profile and the whole retained window while `read`/`write`/
 *  `delete` answer `malformed-arguments` for their absent `path` (`interface.md` §1). */
function members(
  tool: string,
  args: unknown,
  declared: readonly string[],
): { ok: true; carried: Record<string, unknown> } | { ok: false; ledger: DataLedger } {
  const carriedArgs = args === undefined ? {} : args
  if (carriedArgs === null || typeof carriedArgs !== 'object' || Array.isArray(carriedArgs)) {
    return malformed(`${tool} takes an object of its declared members`)
  }
  const carried = carriedArgs as Record<string, unknown>
  const proto = Object.getPrototypeOf(carried)
  if (proto !== null && proto !== Object.prototype) {
    return malformed(`${tool} takes a plain object of its declared members`)
  }
  for (const key of Object.keys(carried)) {
    if (!declared.includes(key)) return malformed(`${tool} carries no '${key}' member`)
  }
  return { ok: true, carried }
}

/** The address domain: a DENSE array whose every element is a string key or a non-negative safe
 *  integer (`guide §4`, rules 1-5). A hole, a negative, a fractional or an over-range index is
 *  outside it, and `''` is a legal key. */
function asPath(value: unknown): DataPath | null {
  if (!Array.isArray(value)) return null
  const segments = value as unknown[]
  for (let index = 0; index < segments.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(segments, index)) return null
    const segment = segments[index]
    if (typeof segment === 'string') continue
    if (typeof segment === 'number' && Number.isSafeInteger(segment) && segment >= 0) continue
    return null
  }
  return segments as DataPath
}

function carries(carried: Record<string, unknown>, member: string): boolean {
  return Object.prototype.hasOwnProperty.call(carried, member)
}

export function parseRead(args: unknown): Parsed<{ path: DataPath }> {
  const own = members('provident.data.read', args, ['path'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.read carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (isVolatile(path)) return refusal('volatile-path')
  return { ok: true, value: { path } }
}

/** `write` takes exactly ONE path/value pair (`interface.md` §1; ASM-L2-1). An ABSENT `value` is a
 *  malformed call; a SUPPLIED `undefined` is a value the store's own walk refuses (G9). */
export function parseWrite(args: unknown): Parsed<{ path: DataPath; value: unknown }> {
  const own = members('provident.data.write', args, ['path', 'value'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.write carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (!carries(own.carried, 'value')) return malformed("provident.data.write carries no 'value' member")
  if (path.length === 0) return refusal('root-not-writable')
  if (isVolatile(path)) return refusal('volatile-path')
  return { ok: true, value: { path, value: own.carried.value } }
}

export function parseDelete(args: unknown): Parsed<{ path: DataPath }> {
  const own = members('provident.data.delete', args, ['path'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.delete carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (path.length === 0) return refusal('root-not-writable')
  if (isVolatile(path)) return refusal('volatile-path')
  return { ok: true, value: { path } }
}

/** `prefix` is optional and an omitted one is the same call as `{}`: the whole profile. A supplied
 *  one is a path, and `[]` narrows nothing (`interface.md` §1; ASM-L3-1 — no volatile refusal). */
export function parseList(args: unknown): Parsed<{ prefix: DataPath | null }> {
  const own = members('provident.data.list', args, ['prefix'])
  if (!own.ok) return own
  if (!carries(own.carried, 'prefix')) return { ok: true, value: { prefix: null } }
  const prefix = asPath(own.carried.prefix)
  if (prefix === null) return malformed("the member 'prefix' is outside the address domain")
  return { ok: true, value: { prefix } }
}

/** `cursor` is optional and an omitted one is the same call as `{}`: the whole retained window. A
 *  supplied one is a non-negative integer, refused `malformed-arguments` otherwise (D-12). */
export function parseJournal(args: unknown): Parsed<{ from: number }> {
  const own = members('provident.data.journal', args, ['cursor'])
  if (!own.ok) return own
  if (!carries(own.carried, 'cursor')) return { ok: true, value: { from: 0 } }
  const cursor = own.carried.cursor
  if (typeof cursor !== 'number' || !Number.isSafeInteger(cursor) || cursor < 0) {
    return malformed("the member 'cursor' is outside the cursor domain (a non-negative integer)")
  }
  return { ok: true, value: { from: cursor } }
}

/** A volatile spelling: the FIRST segment begins `mem.`, `temp.` or `secure.` (D-13). */
export function isVolatile(path: DataPath): boolean {
  const first = path.length > 0 ? path[0] : undefined
  if (typeof first !== 'string') return false
  return VOLATILE_PREFIXES.some((prefix) => first.startsWith(prefix))
}

/** The sort key `list` orders by: the path's JSON text (ASM-L2-2). */
export function pathText(path: DataPath): string {
  return JSON.stringify(path)
}
