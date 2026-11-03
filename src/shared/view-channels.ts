// src/shared/view-channels.ts — the view record's FOUR channel names, SINGLE-SOURCED (the precedent the tab record's
// three-and-a-push set and the operator's channels set): a name spelled in the main handler and again in the preload is
// a rename that half-lands.
// Three carry a request and have an `ipcMain.handle` site; the fourth is the change push, which carries no request and
// needs no handler (D-63, D-87). **THE READ IS ONE CHANNEL AND NOT TWO**: both families are read at one instant by the
// one consumer, so a second read channel would be a second answer to "what is the view" — and the module's per-pane
// default is a PURE derivation (`paneGeometryIn`) over that one reading, not a route.

export const IPC_VIEW_READ = 'provident:view:read'
export const IPC_VIEW_PANE_COMMIT = 'provident:view:pane-commit'
export const IPC_VIEW_FOCUS_COMMIT = 'provident:view:focus-commit'
export const IPC_VIEW_CHANGED = 'provident:view:changed'
