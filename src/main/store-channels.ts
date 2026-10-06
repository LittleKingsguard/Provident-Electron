// src/main/store-channels.ts — THE TIER-1 CHANNEL-NAME CONSTANTS ONLY (`Q-3` / `R` `C-4`;
// `docs/specs/store-persist.md` §2.1/§2.2). The file holds EXACTLY the two channel-name
// constants and NOTHING else: no callable, no state, no type, no logic and no runtime
// dependency. The constants are the SINGLE SOURCE of the two channel names — the handler
// registrations in `src/main/main.ts` and the invokes in `src/main/preload.ts` take them
// from THIS ONE file, and a literal re-spelling anywhere else in `src/**` is a finding (the
// F-8 rule). The `Y-3` push rides the existing `webContents.send` surface with a THIRD
// preload registration member and needs NO third constant here — the census stays EXACTLY TWO.
//
// ⟶ ANNOTATED BESIDE 2026-10-05 (`U-SECURE-EXCLUSION` `S1`, `RCA-8(d)` annotate-beside; the
// sentence above STANDS as the as-filed words of the `Y-3` decision and is NOT rewritten):
// THE CENSUS IS NO LONGER TWO. The exclusion unit's manual-UI channel adds the ONE declared
// constant below (`docs/specs/secure-exclusion.md` §1.3 item 9 / §2.4 item 4 / §2.6 item 3),
// so the constant census moves `2 → 3` — `STORE_FILE_GET` · `STORE_FILE_PUT` ·
// `IPC_SECURITY_EXCLUSION`, and `1 + 1 + 1 = 3`. The `Y-3` ruling above is untouched by this:
// the `store:file:changed` push still rides its preload LOCAL and still contributes no
// constant here.

export const STORE_FILE_GET = 'provident:store:file:get'
export const STORE_FILE_PUT = 'provident:store:file:put'
/** `docs/specs/secure-exclusion.md` §1.5 item 4 / §2.4 item 4 — the exclusion transition's OWN
 *  channel. It reaches `main.ts` (the handler) and `preload.ts` (the `setExclusion` member) by
 *  IMPORT from THIS file and is never re-spelled; it does NOT enter `src/shared/types.ts`. */
export const IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'