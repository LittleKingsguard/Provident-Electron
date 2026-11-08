// src/shared/view-channels.ts — the view record's SEVEN channel names, SINGLE-SOURCED (the precedent the tab record's
// three-and-a-push set and the operator's channels set): a name spelled in the main handler and again in the preload is
// a rename that half-lands.
// SIX carry a request and have an `ipcMain.handle` site; the seventh is the change push, which carries no request and
// needs no handler (D-63, D-87, D-91; the appearance route is D-97's; the drag pair is D-132's). **THE READ IS ONE CHANNEL
// AND NOT THREE**: all three families are read at one instant by the one consumer, so a second read channel would be a
// second answer to "what is the view" — and the module's per-pane default, per-zone absence and appearance placeholder are
// PURE derivations (`paneGeometryIn`, `zoneIn`, `viewThemePlaceholder`) over that one reading, not routes. **AND THE DRAG
// READING IS READ WHERE THE TIERS ARE READ** (`provident.data.read({path: ['drag']})`, whose node carries its own `_tier`),
// so the two drag channels carry WRITES and no read is added for them (D-133, D-144).

export const IPC_VIEW_READ = 'provident:view:read'
export const IPC_VIEW_PANE_COMMIT = 'provident:view:pane-commit'
export const IPC_VIEW_ZONES_COMMIT = 'provident:view:zones-commit'
/** **THE APPEARANCE ACT'S CHANNEL — the USER ACTION's one route** (D-97): the authored control's handler writes the setting
 *  node's `content`, the app renderer reads that setting and sends it here with the attribute name it holds, and the
 *  crossing's pair resolves it. The act crosses and never its resolution: no declaration comes INWARD on this channel. */
export const IPC_VIEW_THEME_COMMIT = 'provident:view:theme-commit'
/** **THE DRAG'S MOVE — ONE PANE'S IN-PROCESS PLACEMENT** (D-132): a pane id and the placement the gesture read, sent to the
 *  crossing's `temp` family. It carries a WRITE and never a path and never a tier: the address is the module's. */
export const IPC_VIEW_DRAG_COMMIT = 'provident:view:drag-commit'
/** **THE DRAG'S END — THE GESTURE'S CLEAR** (D-132): the crossing DELETES the `temp` family, so the address answers
 *  `absent` once the gesture is over. **IT CARRIES NO ARGUMENT**, the `null` arm `D-140` spent a row removing. */
export const IPC_VIEW_DRAG_CLEAR = 'provident:view:drag-clear'
export const IPC_VIEW_CHANGED = 'provident:view:changed'
