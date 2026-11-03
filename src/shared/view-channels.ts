// src/shared/view-channels.ts — the view record's FIVE channel names, SINGLE-SOURCED (the precedent the tab record's
// three-and-a-push set and the operator's channels set): a name spelled in the main handler and again in the preload is
// a rename that half-lands.
// Four carry a request and have an `ipcMain.handle` site; the fifth is the change push, which carries no request and
// needs no handler (D-63, D-87, D-91). **THE READ IS ONE CHANNEL AND NOT THREE**: all three families are read at one
// instant by the one consumer, so a second read channel would be a second answer to "what is the view" — and the module's
// per-pane default and per-zone absence are PURE derivations (`paneGeometryIn`, `zoneIn`) over that one reading, not routes.

export const IPC_VIEW_READ = 'provident:view:read'
export const IPC_VIEW_PANE_COMMIT = 'provident:view:pane-commit'
export const IPC_VIEW_FOCUS_COMMIT = 'provident:view:focus-commit'
export const IPC_VIEW_ZONES_COMMIT = 'provident:view:zones-commit'
export const IPC_VIEW_CHANGED = 'provident:view:changed'
