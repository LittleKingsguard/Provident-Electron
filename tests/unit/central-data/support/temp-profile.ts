// tests/unit/central-data/support/temp-profile.ts — the unit battery's harness (design.md §5).
//
// A temp-profile factory (one `mkdtemp` directory per filesystem row, its one written name, its
// removal), one answer-shape helper, and THE BOOT: the store every row must now supply. The battery
// imports `src/main/data/index.ts` for the subject and the seam's `createProfileStore` for the one
// instance the composition hands the surface (`src/main/main.ts:132` → `:302`) — the app's own
// construction, never a stub, and no fake is scripted here (D-14, D-80).

import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect } from 'vitest'

import { createDataSurface, type DataSurface } from '../../../../src/main/data'
import { createProfileStore } from '../../../../src/main/storeroom.js'

/** `<profileDir>/provident-profile.json` — the one name this unit writes (`persistence.md` §1; D-13). */
export const PROFILE_FILE_NAME = 'provident-profile.json'

/** **THE BOOT'S CONSTRUCTION, STOOD BY THE BATTERY** (D-80): one `provident-storeroom` instance at the profile's one
 *  name, which that construction brings into being exclusively. `DataSurfaceOptions.store` is REQUIRED, so this is the
 *  only way to stand a surface at all — and because the construction creates the name, **no row of this battery can
 *  measure a profile with no file**: that is the state this product no longer has. The state it has is one name that
 *  stands and holds nothing, which is what the rows below assert (D-79, D-80). */
export function bootProfileStore(profileDir: string) {
  return createProfileStore({ filePath: profileFilePath(profileDir) })
}

/** The composition `src/main/main.ts:302` performs, in one call: the directory the reading names and the instance the
 *  caller already owns. A row that needs a SECOND boot over the same profile calls this again — two boots over one
 *  name is what `behaviour.md` §3's "next process" is at this grain (D-80). */
export function surfaceAt(profileDir: string): DataSurface {
  return createDataSurface({ profileDir, store: bootProfileStore(profileDir) })
}

/** One fresh profile directory under `os.tmpdir()` (D-14). */
export function makeProfileDir(): string {
  return mkdtempSync(join(tmpdir(), 'provident-data-'))
}

/** The one written name inside a profile directory (`persistence.md` §1). */
export function profileFilePath(profileDir: string): string {
  return join(profileDir, PROFILE_FILE_NAME)
}

/** Every entry the profile directory holds, sorted — an absent directory holds nothing. */
export function profileEntries(profileDir: string): string[] {
  return existsSync(profileDir) ? readdirSync(profileDir).sort() : []
}

/** The profile's own bytes, read by the battery and never written by it (`persistence.md` §5). */
export function profileBytes(profileDir: string): string {
  return readFileSync(profileFilePath(profileDir), 'utf8')
}

/** Remove one profile directory and everything under it. */
export function removeProfileDir(profileDir: string): void {
  rmSync(profileDir, { recursive: true, force: true })
}

/** A refused ledger, narrowed: the four members every refusal carries (`interface.md` §2, §3). */
export type RefusedLedger = {
  status: string
  reason: string
  message: string
  floor?: number
  through?: number
  storeStatus?: string
}

/** Assert that an operation answered a `refused` ledger and hand the ledger back for its reason. */
export function expectRefusal(answer: unknown): RefusedLedger {
  const ledger = answer as RefusedLedger
  expect(typeof ledger).toBe('object')
  expect(ledger.status).toBe('refused')
  expect(typeof ledger.reason).toBe('string')
  expect(typeof ledger.message).toBe('string')
  return ledger
}
