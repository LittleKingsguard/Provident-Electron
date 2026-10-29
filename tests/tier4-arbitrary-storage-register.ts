// tests/tier4-arbitrary-storage-register.ts — THE HARNESS THAT SURVIVED `E-1`, AND WHAT RETIRED.
//
// WHAT THIS MODULE IS NOW, NAMED (never smoothed — `RCA-8(d)`: annotate BESIDE, never over; D-1 §4):
// the `§5.5.1` TYPED PROPERTY REGISTER that lived here — TEN rows (`P-T4-TP-1` … `P-T4-IM-5`), the
// declared total `113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8` (`P-IM 47` · `P-SM 10` ·
// `P-TP 56`; chain `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113`, with BOTH earlier forms —
// the filing's `108` and the gate-4 row-8 re-grain's `112` — printed beside the operative one), its
// EXECUTOR, its report, its five controls and its PRE-CARRIER register-owned term — RETIRES WITH
// THE STORE IT MEASURED. NINE OF ITS TEN ROWS DROVE `src/main/security-store.ts`, WHICH `E-1`
// DELETED and which the rebuild DISREGARDS rather than carries: the operator's record now lives in
// its own `provident-storeroom` instance inside `src/main/operator-settings/index.ts`, reached only
// through `src/main/settings-surface/index.ts`, and no shim, no dual write and no re-point stands
// between them. A register is ONE table and ONE executor: with nine of its rows gone the declared
// cells bind to nothing, so the block retires AS A CHAIN — table, arithmetic, executor, report and
// controls together — and its arithmetic is retired with it, NEVER re-pointed at the instance.
//
// THE PANE TERM THE REGISTER CARRIED IS NOT LOST: the gate-6 `F-1` PRE-CARRIER family (row 6's
// `+ 1`, `10 → 11`) is driven by `F-1` and `F-1-CTL` in `tests/tier4-arbitrary-storage.test.ts`,
// which enumerate the same four no-answer states with the same four controls.
//
// ALSO RETIRED HERE, AS THE STORE'S OWN ARTIFACTS (each NAMED, per the retirement predicate):
//   · `SECURITY_STORE_SRC` — it named the DELETED path, and no export may name it.
//   · `SECURITY_STORE_PIN` + `SECURITY_STORE_PIN_CHAIN` — the frozen byte-pin chain (the operative
//     `7a85e021…` and the five terms it kept awake) retires AS A CHAIN, because a replacement
//     artifact that is not this module makes all six dead at once: `SECURITY_STORE_PIN` and its
//     five `_PRE_*` ancestors, and EVERY reader of them (`D-X` and register row 9).
//   · `loadStoreModule` / `StoreModule` — the store-module resolver (a fragment-assembled dynamic
//     import of the deleted file), and `declaredReasonTokens`, which read the deleted module's
//     two-token `SecurityWriteReceipt` bytes off that same path.
//   · the store's own census figures — `DECLARED_SURFACE_MEMBERS` / `LANDED_SURFACE_MEMBERS` (the
//     five-member surface: `get` · `lastWriteReceipt` · `set` · `readEntry` · `writeEntry`) and
//     `DECLARED_OPTION_CENSUS` / `LANDED_OPTION_CENSUS` (`SecurityStoreOptions` `1 = 1 (path)`) —
//     whose rows `P-T4-CENSUS`, `P-T4-OPTIONS`, `P-T4-EXPORTS` and `P-T4-TYPES` retired.
//
// WHAT REMAINS IS WHAT A SURVIVING ROW STILL CALLS, plus the declared figures that outlive the
// register: the path table, the token/message vocabulary, the carrier's additive member pair, the
// `§5.5.1` caps, and the source readers (`sourceOf`, `sourceOrEmpty`, `sha256Of`, `exists`).
// `MEASURED_FROZEN_PINS` is KEPT although its two readers (`D-X`, register row 9) retired: its
// subject — the two RENDERER modules' frozen field-7 bytes — still stands, and deleting a live
// frozen figure is not this pass's mandate.
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts` only), so it is
// never collected as a suite.

import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

// ---- PATHS -----------------------------------------------------------------------------
const TESTS_DIR = new URL('./', import.meta.url)
const REPO = new URL('./../', TESTS_DIR)
export const SRC = (rel: string): string => fileURLToPath(new URL('./src/' + rel, REPO))
export const TEST = (rel: string): string => fileURLToPath(new URL('./' + rel, TESTS_DIR))

/** THE STATIC HOLDER'S OWN MODULE (`§0A` item 1, the architect's `A-1` ruling) — UNMOVED by `E-1`:
 *  the ONE main-side LEAF that holds the one boolean, with the declared surface
 *  `tier4OpenState()` / `setTier4OpenState(open)` and the declared initial value `STORE-OPEN`
 *  (`true`). ITS SOLE WRITER MOVED (`C-3`): it is now `src/main/settings-surface/index.ts`, written
 *  at `attach` and on each committed exclusion write, and NO `src/**` file reads it for a decision
 *  any more — the store's consult is gone with the store (`FS-T4-09`). */
export const TIER4_STATE_SRC = SRC('main/tier4-state.ts')
/** ⟶ ADDED (`C-3`): THE SURFACE (`src/main/settings-surface/index.ts`) — the operator path's ONE
 *  reference to the instance, the four verbs `main.ts` delegates its three security routes to, the
 *  carrier's own `read()` and the holder's sole writer. It is where the GET answer's TWO additive
 *  members are minted from ONE reading (`D-VIII`), so it is where a carrier detector must read. */
export const SETTINGS_SURFACE_SRC = SRC('main/settings-surface/index.ts')
/** ⟶ ADDED (`C-1`/`C-4`): THE INSTANCE (`src/main/operator-settings/index.ts`) — the record and the
 *  settings as ONE `provident-storeroom` instance: the group set's second live copy at six (`:77`),
 *  `FILE_NAME = 'provident-operator-settings.json'` and the retired `RETIRED_NAME`
 *  `= 'provident-security.json'` (read at most once, never written). */
export const OPERATOR_SETTINGS_SRC = SRC('main/operator-settings/index.ts')
export const MCP_SERVER_SRC = SRC('main/mcp-server.ts')
export const MAIN_SRC = SRC('main/main.ts')
export const PRELOAD_SRC = SRC('main/preload.ts')
export const SECURE_PANELS_SRC = SRC('renderer/secure-panels.ts')
export const STORE_CHANNELS_SRC = SRC('main/store-channels.ts')
export const STORE_CORE_SRC = SRC('renderer/store-core-graph.ts')
export const STORE_REFS_SRC = SRC('renderer/store-graph-references.ts')
export const SHARED_TYPES_SRC = SRC('shared/types.ts')

// ---- THE DECLARED TOKEN + MESSAGE (`§2.4` items 1/4) — UNMOVED --------------------------
export const TIER4_CLOSED = 'tier4-closed'
export const TIER4_CLOSED_MESSAGE =
  'Tier-4 access is blocked because the MCP endpoint is open — disable MCP before reading or writing secured data.'
export const EXCLUSION_CLOSED = 'exclusion-closed'
export const STATE_MCP_ENABLED = 'mcp-enabled' as const
export const STATE_MCP_DISABLED = 'mcp-disabled' as const

// ---- THE CARRIER'S ADDITIVE MEMBERS (`§2.4` item 7) — UNMOVED ---------------------------
/** The GET answer's additive pair: `exclusion` (landed) plus the widening `read` (`null` iff the
 *  read was performed, the closed refusal otherwise). Both are still minted together, from ONE
 *  reading — now inside `settings-surface/index.ts`'s `read()` (`D-VIII`) — and neither is
 *  substituted for the other. */
export const DECLARED_CARRIER_MEMBERS: readonly string[] = ['exclusion', 'read']
export const LANDED_CARRIER_MEMBERS: readonly string[] = ['exclusion']

/** `§2.7` item 1's two measured frozen pins — KEPT: the two RENDERER modules stand, so the figures
 *  still have a live subject. Their two readers (`D-X` and the register's row 9) retired with the
 *  store, so this cell is currently read by no row; it is not deleted because deleting a live
 *  frozen byte-figure is not this pass's mandate (the pins it belonged to are `E-1`'s artifacts,
 *  not these). */
export const MEASURED_FROZEN_PINS: Readonly<Record<string, string>> = {
  'src/renderer/store-core-graph.ts': '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450',
  'src/renderer/store-graph-references.ts': '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
}

// ---- THE `§5.5.1` CAPS — KEPT, WITH THE REGISTER THEY BELONGED TO NAMED AS RETIRED --------
/** The register that measured itself against these three figures retired with `E-1` (see the
 *  header): no row is executed against them any more. They are KEPT as the contract's own caps,
 *  not as a claim that a register is running. */
export const REGISTER_ROW_CAP = 100
export const REGISTER_TOTAL_CAP = 400
export const STOP_AFTER_CONSECUTIVE = 5

// ---- THE SOURCE READERS -----------------------------------------------------------------
export function sourceOf(path: string): string {
  return readFileSync(path, 'utf8')
}
export function sourceOrEmpty(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}
export function sha256Of(path: string): string {
  return existsSync(path) ? createHash('sha256').update(readFileSync(path)).digest('hex') : 'ABSENT'
}
export function exists(path: string): boolean {
  return existsSync(path)
}

export { TESTS_DIR, REPO }
