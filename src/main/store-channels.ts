// src/main/store-channels.ts — THE CHANNEL-NAME CONSTANTS (`Q-3` / `R` `C-4`; `docs/specs/store-persist.md`
// §2.1/§2.2). The file holds channel-name constants and NOTHING else: no callable, no state, no type, no
// logic and no runtime dependency. The constants are the SINGLE SOURCE of the channel names — the handler
// registrations in `src/main/main.ts` and the invokes in `src/main/preload.ts` take them from THIS ONE file,
// and a literal re-spelling anywhere else in `src/**` is a finding (the F-8 rule).
//
// ⟶ **THE CENSUS READS ONE, AND THE TWO IT LOST WENT WITH THE FROZEN GRAPH STORE (`D-93`).** The as-filed note
// above stands as written: the file held **TWO** constants (`STORE_FILE_GET` · `STORE_FILE_PUT`, the Y-1
// request channel and the Y-2 commit crossing) and it refused a THIRD, because the `Y-3` push rode a preload
// LOCAL rather than a constant here. A dated annotation then moved the census `2 → 3` by adding
// `IPC_SECURITY_EXCLUSION` (`U-SECURE-EXCLUSION` `S1`, `RCA-8(d)` annotate-beside;
// `docs/specs/secure-exclusion.md` §1.3 item 9 / §2.4 item 4 / §2.6 item 3). **THIS PASS MOVES IT `3 → 1`**:
// `STORE_FILE_GET` and `STORE_FILE_PUT` existed for the renderer's `file.*` projection into the secure
// crossing's `['operator-app-state']` rows and for nothing else (`D-90`'s clause (3)) — their two
// `ipcMain.handle` sites, their two `ipcRenderer.invoke` sites, the three preload `store` members and the
// preload's own `provident:store:file:changed` LOCAL are all deleted with that projection, so neither name has
// a caller left to reach. **`IPC_SECURITY_EXCLUSION` IS NOT THE PURGE'S**: it belongs to the SECURE CROSSING's
// manual-UI surface — one member of the operator's `security` namespace, delivered to `main.ts`'s handler and
// `preload.ts`'s `setExclusion` — and it has nothing to do with the frozen store. It stands, and `D-123` makes it
// two. **AND THE MENUS ROUTE MAKES IT THREE** (`D-181`): `IPC_MENU_ROLE` is the third, appended below its two
// siblings with their reason and theirs alone — a channel name this file owns, imported by both ends and never
// re-spelled. The census above reads `2 → 3` at that addition and no other figure moves with it.

/** `docs/specs/secure-exclusion.md` §1.5 item 4 / §2.4 item 4 — the exclusion transition's OWN
 *  channel. It reaches `main.ts` (the handler) and `preload.ts` (the `setExclusion` member) by
 *  IMPORT from THIS file and is never re-spelled; it does NOT enter `src/shared/types.ts`. */
export const IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'

/** **THE PANE'S OPEN STATE'S OWN CHANNEL** (`D-123`). It is the exclusion channel's sibling for the exclusion channel's
 *  reason: one member of the operator's `security` namespace, reaching `main.ts`'s handler and `preload.ts`'s `setPane`
 *  by IMPORT from this file and never by a literal. **IT ENTERS `src/shared/types.ts` NOWHERE**, exactly as its sibling
 *  does not — the file is imported by the MCP-reachable stack, and an address spelled there would be an address one
 *  MCP-reachable file could name (`ISO-5`/`ISO-6`). **AND THE CENSUS MOVES `1 → 2` WITH IT**: `D-93` left this file one
 *  constant wide, and `D-123` adds the second because a crossing's verb that no realm could reach is a verb no realm
 *  can drive. */
export const IPC_SECURITY_PANE = 'provident:security:pane'

/** **THE MENU'S ROLE ROUTE** (`D-181`; `docs/L2/app-shell/interface.md` §5). The third constant in a file that holds channel
 *  names and nothing else, for its two siblings' reason: an ADDRESS that must not be spelled in `src/shared/types.ts`, the
 *  file the MCP-reachable stack imports (`D-123`, `ISO-5`/`ISO-6`). It reaches `main.ts`'s handler and `preload.ts`'s `menu`
 *  member by IMPORT from this file and is never re-spelled. **THE FILE'S CENSUS MOVES `2 → 3`** and no other member joins. */
export const IPC_MENU_ROLE = 'provident:menu:role'
