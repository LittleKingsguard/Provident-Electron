// src/main/settings-surface/index.ts — THE SURFACE (D-17, D-18): the operator path's ONE reference
// to the instance, the four verbs `src/main/main.ts` delegates its three security routes to, and
// the composition's only gate edge. The declared surface is `docs/L3/security-store-storeroom/
// signatures.md` §3 and nothing else; the design is `design-settings-surface.md` §2-§7.
//
// IT SEES THE INSTANCE THROUGH READ, WRITE AND LISTENERS ALONE — the same interface a foreign
// consumer gets from the package — so the instance knows nothing about this file and its tests can
// drive it without the instance's code (D-17). Held here: the sink, the one subscription's
// withdrawal and the group list this module last applied to the gate. NEVER a copy of the record
// (design §1, §8 ASM-1).
//
// THE TWO STRINGS ARE IMPORTED FROM THEIR LANDED HOME and never re-spelled, so one refusal has one
// sentence and one closed pair has one spelling (PAR-13; design §1 ASM-6). No `node:fs`, no
// `electron`, no `provident-storeroom` import, no IPC handler registered here, no rendered element
// and no MCP drive: the three handler registrations stay in `main.ts` (exception §2 E-3).
import { TIER4_CLOSED, TIER4_CLOSED_MESSAGE } from '../mcp-server.js'
import { setTier4OpenState } from '../tier4-state.js'
import { createOperatorSettings, type AppStateLegacy, type AppStateRow, type OperatorSettings, type OperatorSettingsRecord, type OperatorSettingsReceipt } from '../operator-settings/index.js'

import type { ExclusionState } from '../security.js'

export type { ExclusionState } from '../security.js'

export type SecurityWriteReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: string; message: string
      address: readonly (string | number)[] | null }
export type Tier4WriteAnswer = SecurityWriteReceipt       // one form; `tier4-closed` is not one (D-16)
export type Tier4ClosedRefusal = { status: 'refused'; reason: 'tier4-closed'; message: string }

/** THE STRUCTURAL SINK: a live `ProvidentMcpServer` satisfies it as it stands, with no second
 *  declaration and no group spelling in this file. It is NEVER widened — no member that clears the
 *  token, no reader of the gate's groups (interface §5; design §7; ASM-7, ASM-5). */
export interface SettingsGateSink {
  applyGatePatch(patch: { token?: string | null; groups?: string[]; disable?: string[] }): unknown
  applyExclusion(state: ExclusionState): unknown
  readonly gate: { exclusionState(): ExclusionState }
}

export type SettingsSetAnswer = { token: string | null; enabled: string[]; maxJournalLength?: number
  write: SecurityWriteReceipt; exclusion: ExclusionState }
export type SettingsReadAnswer = { token: string | null; enabled: string[]; maxJournalLength?: number
  read: Tier4ClosedRefusal | null; exclusion: ExclusionState }
export type SettingsTransitionAnswer =
  | { applied: true; state: ExclusionState }
  | { applied: false; state: ExclusionState; reason?: 'malformed-state' }

/** THE INSTANCE'S APP-STATE ANSWER, as this surface hands it on: the row, the boot-time diagnosis
 *  alias and the four members, none of them re-composed here (interface §3; signatures §4). */
export type SettingsAppStateRow = AppStateRow
export type SettingsLegacyAnswer = AppStateLegacy
export interface SettingsAppStateAnswer {
  rows: SettingsAppStateRow[]
  legacy: SettingsLegacyAnswer
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}
/** The channel's answer, which this module mints: the committed arm carries NO ordinal because the
 *  bridge answer it serves has none and `preload.ts` is byte-identical (interface §3 `ASM-L2-4`). */
export type SettingsCommitAnswer =
  | { status: 'committed' }
  | { status: 'refused'; reason: string; message: string
      address: readonly (string | number)[] | null }

export interface SettingsSurface {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]
    maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer
}

/** The carrier's closed read token: `tier4-closed` is a READ outcome and never a write outcome, and
 *  no third state exists (D-16; interface §3, §5). */
const TIER4_CLOSED_REFUSAL: Tier4ClosedRefusal = { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }

/** THE ONE COMPOSER of the sink's patch. `token` crosses ONLY while a non-empty string stands,
 *  because the gate admits that member as a non-empty string wherever it is PRESENT and rejects the
 *  WHOLE patch — `groups` included — for any other value, so a `token:null` would leave the boot
 *  patch and every later group patch silently unapplied on exactly the first-run profile
 *  (src/main/security.ts:176-179; design §5 ASM-7; exception §2 E-2, E-3). */
function patchOf(record: OperatorSettingsRecord): { token?: string; groups: string[] } {
  const token = record.token
  const groups = [...record.enabled]
  if (typeof token === 'string' && token !== '') return { token, groups }
  return { groups }
}

export function createSettingsSurface(options: { userDataDir: string; journalLength?: number }): SettingsSurface {
  // THE INSTANCE IS CONSTRUCTED HERE, ONCE, AND HELD HERE: the operator path's single reference
  // (interface §5 `ASM-L2-8`; D-18). No second instance, no second `filePath`, no second name.
  const settings: OperatorSettings = createOperatorSettings(options)
  let sink: SettingsGateSink | null = null
  let appliedGroups: string[] = []
  let off: (() => void) | null = null

  // THE SUBSCRIPTION IS THE CHANGE PATH: the re-patch happens INSIDE this body, never at a call
  // site, a poll or a boot-order re-read, and the delivery's one argument is the address — never
  // the value and never which member moved (D-17; design §6; guide §6.4).
  const onDelivery = (address: readonly (string | number)[]): void => {
    const held = sink
    const record = settings.read()
    // The holder is written from the SAME reading that feeds the carrier, at `attach` and on every
    // delivery — this module is its sole writer and reads it nowhere (exception §2 E-3; L1 §3 ASM-4).
    setTier4OpenState(record.exclusion === 'mcp-disabled')
    if (held === null) return
    // The exclusion branch RETURNS before the patch arm, which is what keeps one delivery to one
    // sink call; an unknown address applying both arms is the total reading of the domain.
    if (address[0] === 'operator-exclusion') {
      held.applyExclusion(record.exclusion)
      return
    }
    // The removal set is THIS module's own last-applied list, because the gate's `applyPatch` adds
    // `groups` and removes only what `disable` names and the sink declares no enabled reader:
    // passing the record's set alone would leave a revoked group enabled (design §6 ASM-5).
    const removed = appliedGroups.filter((name) => !record.enabled.includes(name))
    held.applyGatePatch({ ...patchOf(record), disable: removed })
    appliedGroups = [...record.enabled]
  }

  const read = (): SettingsReadAnswer => {
    // ONE reading of the row feeds BOTH additive members, so the two cannot carry two states, and
    // the reading is the INSTANCE's row rather than `tier4-state.ts`'s holder, which still carries
    // its declared initial until `attach` flips it (design §2; interface §5; ASM-L2-2).
    const record = settings.read()
    const open = record.exclusion === 'mcp-disabled'
    const answer: SettingsReadAnswer = {
      token: record.token,
      enabled: [...record.enabled],
      read: open ? TIER4_CLOSED_REFUSAL : null,
      exclusion: record.exclusion,
    }
    if (record.maxJournalLength !== undefined) answer.maxJournalLength = record.maxJournalLength
    return answer
  }

  const set = (patch: { token?: string | null; groups?: string[]; disable?: string[]
    maxJournalLength?: number | null }): SettingsSetAnswer => {
    // Each declared position is read ONCE, guarded so no value throws: `groups`/`disable` only when
    // they are arrays, `token` only when the property is present, and `maxJournalLength` whenever it
    // is — `null`, `NaN` and `Infinity` included, because the INSTANCE judges those.
    let hasToken = false
    let token: unknown
    let groups: readonly unknown[] = []
    let disable: readonly unknown[] = []
    let hasCap = false
    let max: unknown
    try {
      const source = patch as unknown as Record<string, unknown> | null
      if (source !== null && typeof source === 'object') {
        const own = (name: string): boolean => Object.prototype.hasOwnProperty.call(source, name)
        if (own('token')) { hasToken = true; token = source.token }
        if (Array.isArray(source.groups)) groups = source.groups
        if (Array.isArray(source.disable)) disable = source.disable
        if (own('maxJournalLength')) { hasCap = true; max = source.maxJournalLength }
      }
    } catch {
      // An outside patch position names nothing: the merge then runs over the record as it stands.
      hasToken = false
      hasCap = false
      groups = []
      disable = []
    }
    // The merge base is the durable row: the record's own order first, then each `groups` name not
    // already held appended in the caller's own order, then each `disable` name removed. The group
    // set itself is the INSTANCE's second live copy, so a non-group string is dropped there
    // (design §3; D-11, D-15; behaviour §2).
    const current = settings.read()
    const enabled = [...current.enabled]
    for (const name of groups) if (typeof name === 'string' && !enabled.includes(name)) enabled.push(name)
    for (const name of disable) {
      if (typeof name !== 'string') continue
      const at = enabled.indexOf(name)
      if (at !== -1) enabled.splice(at, 1)
    }
    // ONE write, never a mixed patch, never an `exclusion` member here, and a `token` the patch did
    // not carry is NOT sent: an explicit `token: undefined` is outside the instance's member domain
    // and would refuse the whole patch (design §3; interface §5).
    const receipt: OperatorSettingsReceipt = settings.write({
      ...(hasToken ? { token: token as string | null } : {}),
      enabled,
      ...(hasCap ? { maxJournalLength: max as number | null } : {}),
    })
    // The answer is minted AFTER the store has delivered, so the gate already holds the granted
    // groups when the operator reads it (design §3; behaviour §10).
    const post = settings.read()
    const answer: SettingsSetAnswer = { token: post.token, enabled: [...post.enabled], write: receipt, exclusion: post.exclusion }
    if (post.maxJournalLength !== undefined) answer.maxJournalLength = post.maxJournalLength
    return answer
  }

  const transition = (state: unknown): SettingsTransitionAnswer => {
    const current = settings.read().exclusion
    // `malformed-state` is the INPUT arm alone and is total over every outside value: a boolean, a
    // number, an object, an array, `undefined`, `null`, an unknown string, a case variant, a padded
    // string — and no store call is made (design §4; interface §5.1; behaviour §10).
    if (state !== 'mcp-enabled' && state !== 'mcp-disabled') return { applied: false, state: current, reason: 'malformed-state' }
    // One `mem` write, and the answer carries NO receipt member: the receipt is observed on `set`
    // and the state on `read().exclusion` (interface §5.1 `ASM-L2-4`).
    const receipt = settings.write({ exclusion: state })
    // `{applied:false, state}` WITH NO `reason` key is the store's arm, constructed without the
    // property so `'reason' in answer` is false (design §4; interface §5.1).
    if (receipt.status === 'refused') return { applied: false, state: settings.read().exclusion }
    return { applied: true, state: settings.read().exclusion }
  }

  const attach = (heldSink: SettingsGateSink): void => {
    // A second `attach` REPLACES the sink and registers no second listener, so the instance keeps
    // the one subscription D-17 declares (design §5 ASM-3).
    sink = heldSink
    // SUBSCRIBE FIRST: no change can fall between the acts (design §5 ASM-3; guide §6.1).
    if (off === null) off = settings.subscribe(onDelivery)
    const record = settings.read()
    // THE BOOT TERMINAL LANDS HERE: the holder is written from the boot reading, then the record is
    // re-patched onto the gate and the boot `mcp-enabled` is applied — a self-transition is lawful
    // (design §5; behaviour §10). Two sink calls at `attach`, one patch and one exclusion.
    setTier4OpenState(record.exclusion === 'mcp-disabled')
    heldSink.applyGatePatch(patchOf(record))
    appliedGroups = [...record.enabled]
    heldSink.applyExclusion(record.exclusion)
  }

  // THE TWO DELEGATING VERBS ARE LOCALS OF THIS FACTORY, beside the four above: no module-scope name
  // is added, and neither verb composes, filters, sorts or validates a name or a value — the
  // instance owns the record and the argument's own shape is the ONE thing it judges (interface §3
  // `ASM-L2-5`; signatures §5; design §3).
  const state = (): SettingsAppStateAnswer => settings.readAppState()

  const commit = (rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer => {
    const receipt = settings.writeAppState(rows)
    // THE COMMITTED ARM DROPS THE ORDINALS, because the channel this serves answers exactly
    // `{status:'committed'}` and `preload.ts` is byte-identical (interface §3 `ASM-L2-4`); the
    // refused arm carries the store's own three members VERBATIM and re-spells none of them.
    if (receipt.status === 'committed') return { status: 'committed' }
    return { status: 'refused', reason: receipt.reason, message: receipt.message, address: receipt.address }
  }

  return { read, set, transition, attach, state, commit }
}
