// src/shared/view-channels.ts — the view record's SIX channel names, SINGLE-SOURCED (the precedent the tab record's
// three-and-a-push set and the operator's channels set): a name spelled in the main handler and again in the preload is
// a rename that half-lands.
// Five carry a request and have an `ipcMain.handle` site; the sixth is the change push, which carries no request and
// needs no handler (D-63, D-87, D-91; the appearance route is D-97's). **THE READ IS ONE CHANNEL AND NOT FOUR**: all four
// families are read at one instant by the one consumer, so a second read channel would be a second answer to "what is the
// view" — and the module's per-pane default, per-zone absence and appearance placeholder are PURE derivations
// (`paneGeometryIn`, `zoneIn`, `viewThemePlaceholder`) over that one reading, not routes.

export const IPC_VIEW_READ = 'provident:view:read'
export const IPC_VIEW_PANE_COMMIT = 'provident:view:pane-commit'
export const IPC_VIEW_FOCUS_COMMIT = 'provident:view:focus-commit'
export const IPC_VIEW_ZONES_COMMIT = 'provident:view:zones-commit'
/** **THE APPEARANCE ACT'S CHANNEL — the USER ACTION's one route** (D-97): the authored control's handler writes the setting
 *  node's `content`, the app renderer reads that setting and sends it here with the attribute name it holds, and the
 *  crossing's pair resolves it. The act crosses and never its resolution: no declaration comes INWARD on this channel. */
export const IPC_VIEW_THEME_COMMIT = 'provident:view:theme-commit'
export const IPC_VIEW_CHANGED = 'provident:view:changed'
