// src/shared/tabs-channels.ts — the tab record's two channel names, SINGLE-SOURCED (the precedent the
// operator's channels set): a name spelled in the main handler and again in the preload is a rename that half-lands.
// The third name is the change push, which carries no request and needs no handler (D-63).

export const IPC_TABS_READ = 'provident:tabs:read'
export const IPC_TABS_COMMIT = 'provident:tabs:commit'
export const IPC_TABS_REMOVE = 'provident:tabs:remove'
export const IPC_TABS_CHANGED = 'provident:tabs:changed'
