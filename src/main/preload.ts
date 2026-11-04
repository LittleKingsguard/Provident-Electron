// src/main/preload.ts — the contextBridge between the renderer and the main
// process. The main process owns the MCP server; the renderer owns the
// provident-ssr graph + DOM. Requests flow main → renderer (webContents.send)
// and replies flow renderer → main (send). Exposed as a minimal `provident`
// surface (no Node objects leak into the page).
import { contextBridge, ipcRenderer } from 'electron'
import { IPC_INVOKE, IPC_REPLY, IPC_READY, IPC_SECURITY_GET, IPC_SECURITY_SET, IPC_SECURITY_CHANGED, IPC_NOTIFY, IPC_MODULE_GET, IPC_MODULE_SET_DISABLED, IPC_MODULE_CHANGED, IPC_DATA_READ, IPC_DATA_WRITE, IPC_DATA_DELETE, IPC_DATA_LIST, IPC_DATA_JOURNAL, type RpcRequest, type RpcReply, type SecuritySettings, type NotifyPayload, type ModuleListEntry } from '../shared/types.js'
// ⟶ **`STORE_FILE_GET` AND `STORE_FILE_PUT` LEAVE THIS IMPORT** (`D-93`): the `store` member they served is deleted with
// the renderer's frozen graph store, so the preload reaches the channel file for `IPC_SECURITY_EXCLUSION` alone.
import { IPC_SECURITY_EXCLUSION } from '../main/store-channels.js'
import type { TabsRecordRow } from '../shared/types.js'
import {IPC_TABS_READ, IPC_TABS_COMMIT, IPC_TABS_REMOVE, IPC_TABS_CHANGED} from '../shared/tabs-channels.js'
import {IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_FOCUS_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_CHANGED} from '../shared/view-channels.js'
import type { ViewFocusMirror, ViewPaneGeometry, ViewThemeRecord, ViewZone } from './view-record/index.js'
import type { Tier4ClosedRefusal, Tier4WriteAnswer } from './settings-surface/index.js'
// **THE `data` ROUTES' ANSWER SHAPES ARE THE MODULE'S OWN, TYPE-ONLY** (`D-112`): the adapter that answers them lives in
// `src/main/data/` and this file declares what it answers rather than a second spelling of it (D-53). A type import is
// erased at build, so nothing of the main process reaches the page through these five names.
import type { DataDeleteAnswer, DataJournalAnswer, DataListAnswer, DataReadAnswer, DataWriteAnswer } from './data/index.js'
// PAR-13 — the two closed state tokens, imported TYPE-ONLY from the gate module that owns them
// (erased at build; no runtime coupling). The WIDENING is an intersection at the declaration
// sites below, never an edit to the shared `SecuritySettings` type (§1.3 item 9).
import type { ExclusionState as EXCLUSION_STATE } from './security.js'

/** PAR-13 (`docs/specs/secure-exclusion.md` §1.5 item 5) — THE BASE CARRIER, NAMED so the widened
 *  declarations below READ as intersections over an unmoved type rather than as replacements of
 *  it. `SecuritySettings` ITSELF is untouched (§1.3 item 9: `src/shared/types.ts` stays
 *  byte-identical): the manual-UI read's declared return is this base `Promise<SecuritySettings>`,
 *  EXTENDED at the two declaration sites by the additive members the two channels deliver
 *  (`write` on the SET response, `exclusion` on the GET response). */
type SecurityReadBase = Promise<SecuritySettings>

/* **THE Y-3 PUSH CHANNEL IS DELETED FROM THIS SITE** (`D-93`), and this headstone stands where its local did. What was
 * here: a preload LOCAL, `provident:store:file:changed`, carrying the change signal for the renderer's frozen graph store —
 * the reason the file's own as-filed note could say *"no third constant enters `store-channels.ts`"* while the channel
 * existed anyway. **THE SIGNAL HAD NO CONSUMER THAT DID ANYTHING**: its one registration at boot was a declared no-op
 * ("a change SIGNAL while a single window owns the realm", `renderer.ts`), and it is deleted with the store. **NO LITERAL
 * SURVIVES**: the channel name appears nowhere in `src/`, `tests/` or `scripts/` after this pass, and `store-channels.ts`
 * carries exactly the ONE constant its own surface needs (`IPC_SECURITY_EXCLUSION`). */

export interface ModuleBridgeResult {
  corrupt: boolean
  quarantined: string[]
  loaded: string[]
  modules: ModuleListEntry[]
}

export interface ProvidentBridge {
  ready(): void
  onRequest(handler: (req: RpcRequest) => void): void
  sendReply(reply: RpcReply): void
  notify(payload: NotifyPayload): void
  security: {
    // `tier4-arbitrary-storage.md` `§2.4` item 8 / `§6` `PAR-10` — the declaration site WIDENS by
    // INTERSECTION with ONE further additive member: `read` (`null` iff the read was performed, the
    // closed tier-4 refusal otherwise — the boolean-fed signal that stops a gated store from
    // blanking the operator's only reader). `SecuritySettings` ITSELF stays unmoved (§1.3 item 5)
    // and this site MUST move in LOCKSTEP with `secure-panels.ts`'s `declare global` re-declaration
    // (a half-widening FAILS).
    get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE; read: Tier4ClosedRefusal | null }>
    // THE RECEIPT'S ADDITIVE DELIVERY (G3 §2.3 item 2): `security.set`'s
    // resolution is re-declared as the SUPERSET — the post-state settings
    // extended by the declared member `write` (the receipt of THIS write).
    // `set()`'s own return shape is UNCHANGED (C-11 NON-BREAKING — the receipt
    // rides NEW members only, §2.3 item 4). `Tier4WriteAnswer` is the store's OWN answer type —
    // ONE receipt form: the post-state receipt of this write, and NEVER a refusal for a closed
    // tier — `tier4-closed` is a READ outcome only, minted by `read()` and declared at the `get()`
    // site above (D-16), so a `set` consults no tier state and commits whatever the tier state is.
    set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): Promise<SecuritySettings & { write: Tier4WriteAnswer }>
    setExclusion(state: EXCLUSION_STATE): Promise<{ applied: boolean; state: EXCLUSION_STATE; reason?: 'malformed-state' }>
    /** **THE SECURITY RECORD'S DELIVERY** (`D-106`): the secure crossing's record and its `mem` pair moved, so the realm
     *  re-reads. It carries NOTHING — no address, no value — exactly as `tabs.onChanged`, `view.onChanged` and
     *  `module.onChanged` carry nothing, and the returned function withdraws the registration. `src/renderer/secure-panels.ts`'s
     *  `declare global` half declares the same member in lockstep (the rule the `module`, `tabs` and `view` members already
     *  follow: a half-declaration FAILS). */
    onChanged(handler: () => void): () => void
  }
  module: {
    get(): Promise<ModuleBridgeResult>
    setDisabled(name: string, disabled: boolean): Promise<ModuleBridgeResult>
    /** **THE APP-STATE ROWS' DELIVERY** (`D-104`): the crossing's third address moved, so the realm re-reads. It carries
     *  NOTHING — no address, no value — exactly as `tabs.onChanged` and `view.onChanged` carry nothing, and the returned
     *  function withdraws the registration. `src/renderer/secure-panels.ts`'s `declare global` half declares the same
     *  member in lockstep (the rule the `security`, `tabs` and `view` members already follow). */
    onChanged(handler: () => void): () => void
  }
  // THE TAB RECORD'S CROSSING (D-63, `docs/L2/store-tabs-record/interface.md` §2): ONE member, FOUR routes.
  // `read` takes no argument because the record is one document; `commit` names its tab and never a path, so the
  // renderer cannot compose an address; `onChanged` delivers that the record moved and never its value. The
  // declaration below and `src/renderer/renderer.ts`'s copy are the same text in both files — the lockstep rule
  // the `store`/`security` pair already follows (L3 signatures §4).
  tabs: {
    read(): Promise<{ status: 'committed'; order: readonly string[]; landing: string; rows: readonly TabsRecordRow[] } | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }>
    commit(row: TabsRecordRow): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }>
    remove(id: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }>
    onChanged(handler: () => void): () => void
  },
  // THE VIEW RECORD'S CROSSING (D-87, D-91, D-97, `docs/L2/view-record/interface.md` §2): ONE member, SIX routes — the
  // pane geometry, the focus mirror, the zone family and the appearance record, over the boot's one store. `read` takes no
  // argument because the view is one reading; `commitPane` names a pane and never a path, `commitFocus` hands the whole
  // mirror the model produced, `commitZones` names a zone and composes its family at the crossing, and `commitTheme` hands
  // the appearance act — the setting and the caller-held attribute name — and composes NOTHING; `onChanged` delivers that
  // the view moved and never its value. The declaration below and `src/renderer/secure-panels.ts`'s copy are the same text in both files —
  // the lockstep rule the `store`, `security` and `tabs` members already follow, and this pair is the one a row reads back
  // and compares rather than cites.
  view: {
    read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; focus: ViewFocusMirror; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; focus: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
    commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitFocus(mirror: ViewFocusMirror): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    onChanged(handler: () => void): () => void
  },
  // THE `data` ROUTES' CROSSING (`D-112`; `docs/L2/central-data/interface.md` §5): ONE member, FIVE routes, NO delivery.
  // Each hands the caller's argument object to the boot's ONE profile store through the module's own adapter, and answers
  // §2's shape verbatim — `read`'s row/branch/absent, `write`'s and `delete`'s `cursor` + `repaired` + `log`, `list`'s
  // paths and `journal`'s window, each with the closed ledger's `refused` arm beside it. `onChanged` is DELIBERATELY
  // ABSENT (`D-107` reads the `data.*` clause-2 cell `N/A` because no consumer of a `data.*` change exists, and a push
  // here would be the first). The declaration below and `src/renderer/secure-panels.ts`'s copy are the same text in both
  // files — the lockstep rule the `security`, `tabs`, `view` and `module` members already follow.
  data: {
    read(args: unknown): Promise<DataReadAnswer>
    write(args: unknown): Promise<DataWriteAnswer>
    delete(args: unknown): Promise<DataDeleteAnswer>
    list(args: unknown): Promise<DataListAnswer>
    journal(args: unknown): Promise<DataJournalAnswer>
  },
  // ⟶ **THE `store` MEMBER IS DELETED** (`D-93`; `D-90`'s clause (3): "the two preload members"). It carried Y-1 the boot
  // hand-off, Y-2 the commit crossing and Y-3 the change-push registration, all three exclusively for the renderer's frozen
  // graph store — the file's own note above still describes that trio as it was filed, and this line is where it stopped
  // being true. **WHAT THE BRIDGE NOW CARRIES, AND NOTHING ELSE**: `ready` · `onRequest` · `sendReply` · `notify` ·
  // `security` · `module` · `tabs` · `view` · `data` — NINE top-level members, one per crossing surface the app actually
  // reads or writes, the ninth being `D-112`'s five `data.*` routes. The lockstep pair `store`/`security` is no longer a
  // pair: `security` stands (the secure crossing's manual-UI surface) and `store` has no successor, because the thing it
  // existed for has none. **AND THIS COUNT IS NOT RESTATED FROM MEMORY**: two sibling rows (`ISO-4` in both `isolation`
  // files) and `S-11` in `settings-carrier-retirement`'s e2e scenarios set-equality it against their own `BRIDGE_MEMBERS`,
  // and each was moved with a dated note on this pass rather than left to disagree.
}

const bridge: ProvidentBridge = {
  ready(): void {
    ipcRenderer.send(IPC_READY)
  },
  onRequest(handler: (req: RpcRequest) => void): void {
    ipcRenderer.on(IPC_INVOKE, (_event, req: RpcRequest) => {
      handler(req)
    })
  },
  sendReply(reply: RpcReply): void {
    ipcRenderer.send(IPC_REPLY, reply)
  },
  // N4 (live-notification-review.md) — the app-graph-changed push. Sourced
  // ONLY from the app Runtime re-render; main maps it to a resource-updated
  // notification over stdio. The isolated SecurePanels graph NEVER calls this.
  notify(payload: NotifyPayload): void {
    ipcRenderer.send(IPC_NOTIFY, payload)
  },
  // The manual-UI security settings (mcp-endpoint.md §6.4): exposed to the
  // renderer Settings pane ONLY. The MCP tool handlers never route to these
  // channels, so an agent cannot grant itself capabilities.
  security: {
    // PAR-13 / §1.5 item 5 — `get()`'s declared return WIDENS to the same superset idiom the
    // landed `set` uses for its additive `write` member: `SecuritySettings & { exclusion }`, and
    // `§2.4` item 8 adds the ONE further additive member `read` (`Tier4ClosedRefusal | null`).
    // `SecuritySettings` ITSELF is unmoved (§1.3 item 9): the widening is an INTERSECTION applied
    // at this declaration site and at the renderer's `declare global` re-declaration, which MUST
    // move in LOCKSTEP (a half-widening FAILS).
    get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE; read: Tier4ClosedRefusal | null }> {
      return ipcRenderer.invoke(IPC_SECURITY_GET)
    },
    set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): Promise<SecuritySettings & { write: Tier4WriteAnswer }> {
      return ipcRenderer.invoke(IPC_SECURITY_SET, patch)
    },
    // §2.4 item 4 — the ONE new channel MEMBER (the `security` member set moves `2 → 3`): the
    // operator's transition request over its OWN channel, distinguishable from a settings write
    // (`T-5`). The answer is ONE of exactly TWO closed forms; a malformed payload is REFUSED AS A
    // VALUE, never a throw.
    setExclusion(state: EXCLUSION_STATE): Promise<{ applied: boolean; state: EXCLUSION_STATE; reason?: 'malformed-state' }> {
      return ipcRenderer.invoke(IPC_SECURITY_EXCLUSION, state)
    },
    // THE FOURTH MEMBER (`D-106`): the record's and the pair's push, delivered main→renderer by the composition's broadcast
    // and withdrawn by the returned function. It reaches `ipcMain` nowhere — the channel carries no request.
    onChanged(handler: () => void): () => void {
      const listener = (): void => handler()
      ipcRenderer.on(IPC_SECURITY_CHANGED, listener)
      return () => {
        ipcRenderer.removeListener(IPC_SECURITY_CHANGED, listener)
      }
    },
  },
  // U8 — the module management bridge (module-feature-list.md §4). Manual-UI
  // only: the module store is operator-owned; an agent never reaches it over MCP.
  module: {
    get(): Promise<ModuleBridgeResult> {
      return ipcRenderer.invoke(IPC_MODULE_GET)
    },
    setDisabled(name: string, disabled: boolean): Promise<ModuleBridgeResult> {
      return ipcRenderer.invoke(IPC_MODULE_SET_DISABLED, { name, disabled })
    },
    // THE THIRD MEMBER (`D-104`): the app-state rows' push, delivered main→renderer by the composition's broadcast and
    // withdrawn by the returned function. It reaches `ipcMain` nowhere — the channel carries no request.
    onChanged(handler: () => void): () => void {
      const listener = (): void => handler()
      ipcRenderer.on(IPC_MODULE_CHANGED, listener)
      return () => {
        ipcRenderer.removeListener(IPC_MODULE_CHANGED, listener)
      }
    },
  },
  // THE TIER-1 STORE BRIDGE (`store.*` — G2 `U-STORE-PERSIST`, §2.10 item 4 / §2.11 item 4).
  // `put`'s `reason` is the SURFACE'S OWN status, verbatim: the channel returns whatever
  // `SettingsCommitAnswer` refused with (`reason: string`), so the declared type is `string` and
  // never a closed pair — a two-word union here was narrower than the value that arrives, and one
  // of its words (`'write-failed'`) was the vocabulary ASM-2 retired. The same declaration is
  // copied in `src/renderer/renderer.ts`, and the two move together (D-3, D-43):
  // the THREE new members — Y-1 the boot hand-off, Y-2 the commit crossing, Y-3 the
  // change-push registration (registered once at boot; the returned release is held by the
  // wiring and answered at realm teardown — the P1-P7 release discipline).
  tabs: {
    read(): Promise<{ status: 'committed'; order: readonly string[]; landing: string; rows: readonly TabsRecordRow[] } | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_TABS_READ)
    },
    commit(row: TabsRecordRow): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }> {
      return ipcRenderer.invoke(IPC_TABS_COMMIT, row)
    },
    remove(id: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }> {
      return ipcRenderer.invoke(IPC_TABS_REMOVE, id)
    },
    onChanged(handler: () => void): () => void {
      const listener = (): void => handler()
      ipcRenderer.on(IPC_TABS_CHANGED, listener)
      return () => {
        ipcRenderer.removeListener(IPC_TABS_CHANGED, listener)
      }
    },
  },
  view: {
    read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; focus: ViewFocusMirror; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; focus: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }> {
      return ipcRenderer.invoke(IPC_VIEW_READ)
    },
    commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_PANE_COMMIT, id, geometry)
    },
    commitFocus(mirror: ViewFocusMirror): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_FOCUS_COMMIT, mirror)
    },
    commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_ZONES_COMMIT, id, zone)
    },
    // THE APPEARANCE ACT (D-97): the setting the authored control produced and the attribute name this realm holds. The
    // declaration never crosses this channel inward — the crossing's pair resolves it and the change push carries it back.
    commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_THEME_COMMIT, token, attributeName)
    },
    onChanged(handler: () => void): () => void {
      const listener = (): void => handler()
      ipcRenderer.on(IPC_VIEW_CHANGED, listener)
      return () => {
        ipcRenderer.removeListener(IPC_VIEW_CHANGED, listener)
      }
    },
  },
  // THE `data` ROUTES (`D-112`): five requests over five channels, each passing the caller's argument object as it arrived
  // and nothing else — no path, no tier, no value is read, defaulted or re-spelled on this side. The withdrawal member the
  // crossings beside this one carry is absent with the push it would withdraw.
  data: {
    read(args: unknown): Promise<DataReadAnswer> {
      return ipcRenderer.invoke(IPC_DATA_READ, args)
    },
    write(args: unknown): Promise<DataWriteAnswer> {
      return ipcRenderer.invoke(IPC_DATA_WRITE, args)
    },
    delete(args: unknown): Promise<DataDeleteAnswer> {
      return ipcRenderer.invoke(IPC_DATA_DELETE, args)
    },
    list(args: unknown): Promise<DataListAnswer> {
      return ipcRenderer.invoke(IPC_DATA_LIST, args)
    },
    journal(args: unknown): Promise<DataJournalAnswer> {
      return ipcRenderer.invoke(IPC_DATA_JOURNAL, args)
    },
  },
  // ⟶ **THE `store` MEMBER'S IMPLEMENTATION IS DELETED** (`D-93`): the three members above are gone with the frozen graph
  // store, and with them the `STORE_FILE_CHANGED` preload LOCAL that carried the Y-3 push. **NO CHANNEL SPELLING SURVIVES
  // HERE**: `provident:store:file:get`, `provident:store:file:put` and `provident:store:file:changed` appear in no file of
  // this tree any more, and `store-channels.ts` carries the ONE constant its own secure surface needs.
}

contextBridge.exposeInMainWorld('provident', bridge)