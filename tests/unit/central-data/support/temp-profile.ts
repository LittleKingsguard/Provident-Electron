// tests/unit/central-data/support/temp-profile.ts — the unit battery's harness (design.md §5).
//
// A temp-profile factory (one `mkdtemp` directory per filesystem row, its one written name, its
// removal) and one answer-shape helper. The battery imports nothing of the subject but
// `src/main/data/index.ts`, and no seam is scripted here: every arm this battery drives is
// reachable through a real profile directory and the real store behind the seam (D-14).

import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect } from 'vitest'

/** `<profileDir>/provident-profile.json` — the one name this unit writes (`persistence.md` §1; D-13). */
export const PROFILE_FILE_NAME = 'provident-profile.json'

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
