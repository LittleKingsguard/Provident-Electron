// src/main/data/args.ts — argument validation: the declared member set checked by name, then the
// path domain, the tier domain, the cursor domain, the volatile spelling and the sort key
// (`interface.md` §1; `behaviour.md` §4; D-13, D-101). Every refusal here is a value that names what
// it refused, and the member set is checked FIRST — ahead of the reading and of any byte
// (`design.md` §3).

import { sentence } from './mapper.js'
import type { DataLedger, DataPath, DataTier } from './types.js'

export type Parsed<T> = { ok: true; value: T } | { ok: false; ledger: DataLedger }

/** The three spellings the store's volatile tiers would answer to; this surface holds the durable
 *  profile only, so a first segment beginning with one of them is refused, never dropped (D-13). */
const VOLATILE_PREFIXES: readonly string[] = ['mem.', 'temp.', 'secure.']

/** **THE TIER'S DOMAIN, SPELLED ONCE, AND IT IS THE STORE'S** (`D-101`): three lowercase tokens and no fourth
 *  (`guide §5.2`, `the declaration`'s `Tier`). The array exists because a domain is checked at run time; the
 *  TYPE is `DataTier`, and `typecheck` is what keeps the two spellings the same three words. */
export const DATA_TIER_DOMAIN: readonly DataTier[] = ['file', 'mem', 'temp']

/** **THE DEFAULT, AND IT IS `file` FOR THE TWO WRITING VERBS AND FOR NO READER** (`D-101`). `file` is the tier
 *  this surface has written since it existed, so an omitted member is not a behaviour change at an ordinary path
 *  — which is what keeps every gating row that names no tier green.
 *
 *  **`write` MUST NAME ONE TOKEN AND THE STORE SAYS SO**: an absent tier there is `AddressMalformed`
 *  (`guide §5.2`), and `file` is the one it has always been.
 *
 *  **`delete` MUST NAME ONE TOO, AND FOR A REASON THAT IS THIS CORPUS'S RATHER THAN THE STORE'S**: the store
 *  permits an absent tier on a delete — and what that means is *"every tier at the target and all downstream of
 *  each"* (`guide §5.3`), which is precisely the whole-target arm `ASM-L2-6` refuses to reach. So the surface
 *  names `file`, as it always has.
 *
 *  **`read` IS NOT DEFAULTED AND ITS ABSENT MEMBER IS THE STORE'S OWN UNQUALIFIED READ** — the lowest
 *  persistence present — because narrowing a read behind a caller's back is the same class of lie the module
 *  constant told: a reader that wants one tier's version names it, and gets `absent` where that tier holds none. */
export const DEFAULT_WRITE_TIER: DataTier = 'file'
export const DEFAULT_DELETE_TIER: DataTier = 'file'

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

/** **THE TIER MEMBER'S DOMAIN ARM, IN THE REGISTER OF THE TWO THAT STOOD HERE** (`D-101`): a tier outside the
 *  store's three tokens is refused `malformed-arguments` and the sentence NAMES the member, its value and the
 *  domain — the same arm that refuses a `path` outside the address domain and a `cursor` outside the cursor
 *  domain (`behaviour.md` §4). It never reaches `store-refused`: the store's own `OutOfDomainTier` is a status
 *  this surface does not need to meet, because a tier the store would refuse is refused here first.
 *
 *  `fallback` is what an OMITTED member answers, and it is the caller's own choice of default per verb
 *  (`DEFAULT_WRITE_TIER` / `DEFAULT_DELETE_TIER`); a caller that passes `null` gets `malformed-arguments`
 *  rather than `AddressMalformed` from the store, because `null` is not a tier and this is the arm that says so. */
function tierOf(
  carried: Record<string, unknown>,
  tool: string,
  fallback: DataTier,
): { ok: true; tier: DataTier } | { ok: false; ledger: DataLedger } {
  if (!carries(carried, 'tier')) return { ok: true, tier: fallback }
  const held = carried.tier
  for (const admitted of DATA_TIER_DOMAIN) {
    if (held === admitted) return { ok: true, tier: admitted }
  }
  return malformed(`${tool} carries a 'tier' outside the domain ('file', 'mem', 'temp')`)
}

export function parseRead(args: unknown): Parsed<{ path: DataPath; tier: DataTier | null }> {
  const own = members('provident.data.read', args, ['path', 'tier'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.read carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (isVolatile(path)) return refusal('volatile-path')
  // A READ NAMES NO DEFAULT TIER: an omitted `tier` is the store's own UNQUALIFIED read (the lowest
  // persistence present, `guide §5.2`), which is what this surface has always done — so a read is never
  // narrowed behind its caller's back and an omitted member is no behaviour change here (`D-101`).
  if (!carries(own.carried, 'tier')) return { ok: true, value: { path, tier: null } }
  const tier = tierOf(own.carried, 'provident.data.read', 'file')
  if (!tier.ok) return tier
  return { ok: true, value: { path, tier: tier.tier } }
}

/** `write` takes exactly ONE path/value pair at ONE caller-chosen tier (`interface.md` §1; ASM-L2-1).
 *  An ABSENT `value` is a malformed call; a SUPPLIED `undefined` is a value the store's own walk refuses
 *  (G9). An absent `tier` is `file`, the tier this surface has always written and the one token the store
 *  requires a writer to name (`D-101`). */
export function parseWrite(args: unknown): Parsed<{ path: DataPath; value: unknown; tier: DataTier }> {
  const own = members('provident.data.write', args, ['path', 'value', 'tier'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.write carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (!carries(own.carried, 'value')) return malformed("provident.data.write carries no 'value' member")
  if (path.length === 0) return refusal('root-not-writable')
  if (isVolatile(path)) return refusal('volatile-path')
  const tier = tierOf(own.carried, 'provident.data.write', DEFAULT_WRITE_TIER)
  if (!tier.ok) return tier
  return { ok: true, value: { path, value: own.carried.value, tier: tier.tier } }
}

export function parseDelete(args: unknown): Parsed<{ path: DataPath; tier: DataTier }> {
  const own = members('provident.data.delete', args, ['path', 'tier'])
  if (!own.ok) return own
  if (!carries(own.carried, 'path')) return malformed("provident.data.delete carries no 'path' member")
  const path = asPath(own.carried.path)
  if (path === null) return malformed("the member 'path' is outside the address domain")
  if (path.length === 0) return refusal('root-not-writable')
  if (isVolatile(path)) return refusal('volatile-path')
  const tier = tierOf(own.carried, 'provident.data.delete', DEFAULT_DELETE_TIER)
  if (!tier.ok) return tier
  return { ok: true, value: { path, tier: tier.tier } }
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
