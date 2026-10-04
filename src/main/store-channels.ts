// src/main/store-channels.ts — THE TIER-1 CHANNEL-NAME CONSTANTS ONLY (`Q-3` / `R` `C-4`;
// `docs/specs/store-persist.md` §2.1/§2.2). The file holds EXACTLY the two channel-name
// constants and NOTHING else: no callable, no state, no type, no logic and no runtime
// dependency. The constants are the SINGLE SOURCE of the two channel names — the handler
// registrations in `src/main/main.ts` and the invokes in `src/main/preload.ts` take them
// from THIS ONE file, and a literal re-spelling anywhere else in `src/**` is a finding (the
// F-8 rule). The `Y-3` push rides the existing `webContents.send` surface with a THIRD
// preload registration member and needs NO third constant here — the census stays EXACTLY TWO.

export const STORE_FILE_GET = 'provident:store:file:get'
export const STORE_FILE_PUT = 'provident:store:file:put'