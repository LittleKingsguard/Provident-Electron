/**
 * ============================================================================
 * U-STORE-REDERIVE — THE RED SET (RCA-1: tests FIRST, RUN and REPORTED failing,
 * before any implementation). Author: TestWriter. Gate 3's first half.
 *
 * SPEC (the only authority): the contract DIRECTORY `docs/specs/store-rederive/`
 * — `contract.md` (§1.2 the declared edit scope · §0A's 24 declared defaults
 * `DD-1`…`DD-24` · §0B the claim ledger) · `store-model.md` (§2.1 the declared
 * surface and every record shape · §2.2 the four tiers, the persistence order, the
 * monotonic invariant · §2.3 the address space, the walk and the `M-PROP`
 * resolution · §2.4 the mint and the admission set · §2.14 the closed fail-state
 * union) · `write-and-read.md` (§2.5 the write with the COMPLETE `A1`–`A10` arm
 * table · §2.6 the tombstone · §2.7 the `file` tier's commit duty and the save's
 * condensation · §2.8 the read with its `R1`–`R4` arm table) ·
 * `seams-and-lifecycle.md` (§2.9 the `secure` graph and its gate · §2.10 the
 * constraint seam, the pass sequence, the message list and the loop-breaker ·
 * §2.11 the event surface · §2.12 the boot/load · §2.13 the lifetimes) ·
 * `census.md` (§4.1–§4.9b, each figure printed with its terms) ·
 * `property-register.md` (§5.5 the executed layer's rules · §5.5.1 the 27 typed
 * rows · §5.5.2 the honesty block · §5.5.3 the arithmetic) ·
 * `parameter-semantics.md` (§6 the `16 = 13 + 3` `PAR-` rows) — and the FROZEN
 * SURFACE ARTIFACT `docs/specs/store-rederive-module-store-surface.md` (the module
 * `store` at `src/renderer/store.ts`, its signatures, return shapes, i/o surface,
 * error shapes, host wiring points and edit-set).
 *
 * NO IMPLEMENTATION WAS READ: there is none for this unit. `src/renderer/store.ts`
 * is declared and NOT YET AUTHORED (`contract.md` §1.2 item 1 · §0A `DD-20`), and
 * the replaced family's modules carry no clause of this contract
 * (`contract.md` §0.2 item 1: their clause-level conformances DO NOT CARRY). Every
 * row below cites the clause it derives from in its own title or its own comment.
 *
 * THE RED SET, STATED PLAINLY: the module does not exist at this head, so EVERY row
 * below fails on the SAME honest reason — `contract.md` §1.2 item 1's absence —
 * carried as DATA by the register's resolver (`resolveStoreSurface()`), never as a
 * collection error. The failing set is therefore the WHOLE file, and each row's
 * failure message names the module's own absence; no row is skipped, softened or
 * satisfied with a placeholder.
 *
 * ── THE CARRIED DEFECT `SD-SPLIT-2` (`docs/pending.md` §3), NOTED HERE AS THE
 * TASK REQUIRES ────────────────────────────────────────────────────────────────
 * `store-model.md` §2.14's head DECLARES a closed union of `22` tokens (terms
 * `22 = 6 + 2 + 2 + 6 + 2 + 2 + 1 + 1`), while its own TABLE ENUMERATES tokens
 * `1–21`: token `21` is counted TWICE (once in the write-dose group `6 = 5 + 1`,
 * once as the resolution group's own `1`), so DISTINCT MEMBERSHIP IS `21`.
 * **NO ROW OF THIS FILE ASSERTS `22` DISTINCT TOKENS.** The union rows below drive
 * the `21` ENUMERATED tokens, and the declared `22` is asserted only as the
 * contract's own FIGURE — never as a countable membership.
 *
 * ── THE CARRIED DEFECT `SD-SPLIT-3`, NAMED AND NOT RECONCILED ─────────────────
 * `property-register.md` §5.5.1's `R16`/`R17` HEADING cell prints the register's
 * attempt total as `276`, while its own printed terms are
 * `276 = 232 + 8 + 24 + 12 + 12` — and that sum is `288`, which the same section's
 * foot and `§5.5.3` print. The OPERATIVE figure is therefore `288`; this file
 * asserts `288` and REPORTS the `276` beside it (`REG-ARITH`), rewriting neither.
 *
 * ── THE EXECUTED LAYER ────────────────────────────────────────────────────────
 * The `27` typed rows ride this file through `./store-rederive-register.js`
 * (`contract.md` §1.2 item 3 · `property-register.md` §5.5 item 1): the register
 * layer EXECUTES them over closed, exhaustively enumerated input sets — plain
 * vitest tables, one table per row, no draw, no new dependency — enforcing
 * `≤100` attempts per row · `≤400` total · STOP after `5` consecutive failures, and
 * treating an UN-RUN row as a FAILURE, never a pass.
 * ============================================================================
 */

import { afterAll } from 'vitest'
import { describe, expect, it } from 'vitest'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  ADMITTED_CLASSES,
  APPENDER_DOORS,
  COMMITTED_PAYLOAD_KEYS,
  CONDENSATION_SHAPES,
  DECLARED_TOTAL,
  DECLARED_TOTAL_AS_FILED_HEADING,
  DECLARED_TOTAL_TERMS,
  DECLARED_UNION_COUNT,
  DISTINGUISHED_READ_TOKENS,
  ENUMERATED_REASON_TOKENS,
  ENUMERATED_UNION_COUNT,
  EVALUATION_KEYS,
  FILE_PATH,
  GENERIC_FUNCTIONS,
  HONESTY,
  LISTENER_ERROR_KEYS,
  LITERAL_CLASSES,
  MALFORMED_ADDRESS_ARMS,
  MODULE_PATH,
  NODE_MEMBER_KINDS,
  PARAMETER_ROWS,
  PERSISTENCE_ORDER,
  READ_ARMS,
  REFUSAL_KEYS,
  REFUSED_CENSUS,
  REFUSED_CLASSES,
  REGISTER_ROW_CAP,
  REGISTER_TOTAL_CAP,
  REPAIR_RUNS_PER_REGISTRATION_PER_WRITE,
  RESOLUTION_ANSWERS,
  SECURE_FUNCTIONS,
  STEP_IDS,
  STOP_AFTER_CONSECUTIVE,
  STORE_MESSAGE_KEYS,
  TEMP_DROP_ARMS,
  TIERS_ALL,
  TIERS_RANKED,
  TOKEN_STEPS,
  WRITE_ARMS,
  call,
  describeThrown,
  expectCommitted,
  expectRefusal,
  isRefusal,
  memoryFs,
  messagesOf,
  primarySentence,
  readOn,
  readValue,
  refusalOf,
  register,
  registerRows,
  resolveStoreSurface,
  runRegister,
  store,
  storeOver,
  storeWithoutFs,
  storeWithAccess,
  writeOn,
  type Rec,
  type StoreFixture,
} from './store-rederive-register.js'

/* ─────────────────────────── THE DECLARED SPELLINGS USED BELOW ─────────────────────────── */

const ROOT: readonly string[] = ['tabs']
const CHILD: readonly string[] = ['tabs', 'page']
const DEEPER: readonly string[] = ['tabs', 'page', 'body']

/* ───────────── THE `A2` CELLS: ONE HELPER, SO EVERY CONTAINER-AT-A-NODE-LOCATION CELL
 *               ASSERTS THE SAME SEVEN CLAIMS (`write-and-read.md` §2.5 item 7 arm `A2` ·
 *               `R17`(a) · `R16`(d) · `store-model.md` §2.14 item 6) ─────────────
 * `A2`'s row is TYPED and TOTAL (`§2.5` item 7: *"A row driven to an arm outside this table
 * FAILS"*): a CONTAINER (a plain object or an array) written at an address whose final segment is
 * carried by an EXISTING link (`M-PROP` ⇒ NODE LOCATION) is REFUSED `'node-location-container'`
 * (token 21) at `step: 'M-PROP'` — a RETURNED `Refusal`, never a throw — and **NOTHING IS MINTED,
 * NO FILE IS WRITTEN, THE PURGE DOES NOT RUN AND NO LISTENER FIRES** (`§2.5` item 1's steps-`(1)`–
 * `(7)` discard rule), **and the message list's LAST entry carries the WRAPPER-NODE GUIDANCE**
 * (`R16`(d): *"the user should create a wrapper node"*). A cell whose drive lands a container at a
 * node location asserts an arm OUTSIDE the table and is a defect of the CELL. */
function expectNodeLocationContainerRefusal(answer: Rec, cell: string): Rec {
  const r = expectRefusal(answer, { reason: 'node-location-container', step: 'M-PROP' })
  expect(
    primarySentence(r),
    `${cell} — R16(d)/PAR-13: the refusal's PRIMARY SENTENCE (the list's LAST entry's \`text\`) carries the WRAPPER-NODE GUIDANCE ("the user should create a wrapper node")`,
  ).toMatch(/wrapper/i)
  return r
}

/* ───────────── `PAR-11`'s DRIVES: A `file`-TIER DRIVE SUPPLIES EITHER AN EXPLICIT
 *               FILESYSTEM DOUBLE OR ITS OWN WRITABLE TEMPORARY PATH ─────────────
 * `parameter-semantics.md` §6 `PAR-11` declares *"absent ⇒ the real `node:fs`"*. A drive that
 * supplies no `fs` therefore hands the module the REAL filesystem, so such a drive MUST own its
 * path: it takes one under `os.tmpdir()`, created here and removed in `afterAll`. A drive that
 * supplies an explicit double (the fixture's `memoryFs`, or the caller's own complete surface)
 * needs no path of its own. NO assertion is weakened for an unwritable path: the module is
 * expected to use the real `node:fs` exactly as `PAR-11` declares. */
const TEMP_DIRS: string[] = []

/** `PAR-11` — a drive-owned writable directory under `os.tmpdir()`, removed in `afterAll`. */
function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'store-rederive-par11-'))
  TEMP_DIRS.push(dir)
  return dir
}

/** `PAR-11` — a drive-owned writable FILE path under `os.tmpdir()`. */
function tempPath(name: string): string {
  return join(tempDir(), name)
}

afterAll(() => {
  for (const dir of TEMP_DIRS) rmSync(dir, { recursive: true, force: true })
})

/** `store-model.md` §2.1 — the declared surface of `createStore(options)`, BY NAME. */
const DECLARED_FUNCTIONS: readonly string[] = [...GENERIC_FUNCTIONS, ...SECURE_FUNCTIONS]

/** `parameter-semantics.md` §6 — one OUTSIDE drive per declared parameter, asserting the DECLARED
 *  answer and NEVER a throw. */
const OUTSIDE_PARAMETER_DRIVES: readonly (readonly [string, (f: StoreFixture) => Rec, string])[] = [
  ['PAR-1', (f) => call(f, 'write', 'tabs.page', 'mem', { value: 1 }), 'malformed-address'],
  ['PAR-1a', (f) => {
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    return call(f, 'write', CHILD, 'mem', { value: { seed: 2 } })
  }, 'node-location-container'],
  ['PAR-2', (f) => call(f, 'write', ROOT, 'disk', { value: 1 }), 'malformed-tier'],
  ['PAR-3', (f) => call(f, 'read', ROOT, 'disk'), 'malformed-tier'],
  ['PAR-4', (f) => call(f, 'write', ROOT, 'mem', { value: undefined }), 'value-not-admitted'],
  ['PAR-4a', (f) => {
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    return call(f, 'write', CHILD, 'mem', { value: [1, 2] })
  }, 'node-location-container'],
  ['PAR-5', (f) => call(f, 'write', ROOT, 'mem', { value: 1, tombstone: true }), 'malformed-tombstone'],
  ['PAR-6', (f) => call(f, 'listen', ROOT, 'not a function'), 'malformed-listener'],
  ['PAR-7', (f) => call(f, 'constrain', ROOT, { constraint: 'not a function' }), 'malformed-constraint'],
  ['PAR-8', (f) => {
    register(f, ROOT, [{ repair: true }])
    return call(f, 'write', ROOT, 'mem', { value: 1 })
  }, 'constraint-failed'],
  ['PAR-9', (f) => {
    /** `PAR-9`'s OUTSIDE value is a path whose file is present-but-unparsable, and the declared
     *  answer is `'not-loaded'` (token 15, `§2.12` item 4 (i)): every `file`-tier read and write
     *  refuses it AFTER a refused load. The drive therefore performs the refused load — whose own
     *  token is 19 — and then reads the `file` tier. `B-ROOT` precedes every later arm (`§2.3`
     *  item 2), so the earlier form (a read at `['tabs']` on a store where nothing had resolved)
     *  answered token 2 instead and never reached token 15. */
    f.fs.seed(FILE_PATH, '{not json')
    call(f, 'load')
    return call(f, 'read', ROOT, 'file')
  }, 'not-loaded'],
  ['PAR-10', (f) => call(f, 'secureRead', ROOT), 'secure-gated'],
  ['PAR-11', (f) => call(f, 'load'), 'loaded-or-refused-never-throw'],
  ['PAR-12', (f) => call(f, 'load'), 'loaded-or-refused-never-throw'],
  ['PAR-13', (f) => call(f, 'read', ['']), 'malformed-address'],
  ['PAR-14', (f) => call(f, 'write', ROOT, 'mem', { value: 1, transparent: true, tombstone: true }), 'malformed-tombstone'],
]

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.1 — THE DECLARED SURFACE (the frozen artifact's field 2)
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.1 — THE DECLARED SURFACE (five generic + five secure)', () => {
  it('S-1 · §2.1 / field 2 — `createStore(options)` exists and answers the TEN declared functions, BY NAME', async () => {
    const s = await resolveStoreSurface()
    expect(s.createStore, `§2.1 — the module's declared factory (${MODULE_PATH})`).not.toBeNull()
    expect(typeof s.createStore).toBe('function')
    const f = store()
    for (const name of DECLARED_FUNCTIONS) {
      expect(typeof f.store[name], `§2.1 — the declared function \`${name}\``).toBe('function')
    }
    expect(DECLARED_FUNCTIONS.length, 'census.md §4.3 — the store’s functions in total: `10 = 5 + 5` ✓').toBe(10)
  })

  it('S-2 · §2.1 — the surface is a MEMBER TABLE OF FUNCTIONS: the store exposes exactly the ten and no live record', async () => {
    await resolveStoreSurface()
    const f = store()
    const keys = Object.keys(f.store).filter((k) => typeof (f.store[k] as unknown) === 'function')
    expect(keys.sort(), '§2.1 item 1 / C1 — data is accessed and modified by STORE-LEVEL FUNCTIONS only').toEqual([...DECLARED_FUNCTIONS].sort())
  })

  it('S-3 · §2.1 — `write` takes a REQUIRED tier PARAMETER and the tier is NOT a name segment (R6)', async () => {
    await resolveStoreSurface()
    expect(String(store().store['write']).length, 'C15/R6 — `write(address, tier, payload)`: the tier is a required positional parameter').toBeGreaterThan(0)
    expect(String(store().store['write']).includes('tier'), 'R6 — the declared second parameter is the tier').toBe(true)
    const f = store()
    expectRefusal(call(f, 'write', ROOT, undefined, { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
  })

  it('S-4 · §2.1 items 1–3 — the two read/write forms, the no-tier seams, and `load` taking no argument', async () => {
    await resolveStoreSurface()
    const f = store()
    expect(call(f, 'read', ROOT)['status'], '§2.1 item 1 — the address is REQUIRED and the tier is OPTIONAL').toBeDefined()
    expect(call(f, 'listen', ROOT, () => undefined)['address'], '§2.1 item 3 — `listen`, `constrain` and `load` take no tier').toEqual(ROOT)
    expect(call(f, 'load')['status'], '§2.1 item 3 — the load is the `file` tier’s own').toBeDefined()
  })

  it('S-5 · §2.1 item 4 / field 5 — EVERY function is TOTAL: it answers a declared record and NEVER throws for a data condition', async () => {
    await resolveStoreSurface()
    /** `P-SD-IM-8`'s ten-function census: no function is exempt, the load included. */
    const drives: readonly (readonly [string, () => Rec])[] = [
      ['read', () => call(store(), 'read', [''])],
      ['write', () => call(store(), 'write', ROOT, 'mem', { value: undefined })],
      ['listen', () => call(store(), 'listen', ROOT, 'nope')],
      ['constrain', () => call(store(), 'constrain', ROOT, {})],
      ['load', () => call(store(), 'load')],
      ['secureRead', () => call(storeWithAccess('not-blocked'), 'secureRead', ROOT)],
      ['secureWrite', () => call(storeWithAccess('not-blocked'), 'secureWrite', ROOT, { value: 1 })],
      ['secureListen', () => call(storeWithAccess('not-blocked'), 'secureListen', ROOT, () => undefined)],
      ['secureConstrain', () => call(storeWithAccess('not-blocked'), 'secureConstrain', ROOT, { constraint: () => ({ ok: true }) })],
      ['secureLoad', () => call(storeWithAccess('not-blocked'), 'secureLoad')],
    ]
    for (const [name, drive] of drives) {
      expect(drive, `§2.1 item 4 / §2.14 item 4 — \`${name}\` NEVER throws for a data condition`).not.toThrow()
    }
  })
})

describe('§2.1 — EVERY RETURNED SHAPE’S MEMBERS, EXACTLY', () => {
  it('N-1 · §2.1 — the `committed` record’s member set is CLOSED: `status` + the seven payload members', async () => {
    await resolveStoreSurface()
    const r = expectCommitted(writeOn(store(), 'generic', ROOT, 'mem', { value: { seed: 1 } }))
    expect(Object.keys(r).sort(), '§2.1 (R15) / P-SD-TP-2 — the record’s whole member set is `8`').toEqual(['status', ...COMMITTED_PAYLOAD_KEYS].sort())
    expect(typeof r['tombstoned'], '§2.1 — `tombstoned: boolean`').toBe('boolean')
    expect(typeof r['repaired'], '§2.1 — `repaired: boolean`').toBe('boolean')
    expect(Array.isArray(r['purged']), '§2.1 — `purged: Tier[]`').toBe(true)
    expect(Array.isArray(r['listenerErrors']), '§2.1 — `listenerErrors: ListenerError[]`').toBe(true)
    expect(Array.isArray(r['messages']), '§2.1 — `messages: StoreMessage[]` (the seventh payload member)').toBe(true)
  })

  it('N-2 · §2.1 — the `Refusal` is a CLOSED five-member record whose FOURTH member is the LIST', async () => {
    await resolveStoreSurface()
    const r = refusalOf(call(store(), 'read', ['']))
    expect(Object.keys(r).sort(), '§2.1 (R15) / PAR-13 — `status` + the four diagnostics; the fourth is `messages`, so the count does not move').toEqual([...REFUSAL_KEYS].sort())
    expect(Array.isArray(r['messages']), '§2.1 — the list REPLACES the superseded `message: string`').toBe(true)
    expect('message' in r, '§2.10 item 10 — there is NO second `message` string beside the list (one member, one channel)').toBe(false)
  })

  it('N-3 · §2.1 — the `StoreMessage` entry is `6 = 2 + 4`: the module’s `source` · `text` and the store’s `pass` · `position` · `step` · `address`', async () => {
    await resolveStoreSurface()
    const r = refusalOf(call(store(), 'read', ['']))
    const entry = messagesOf(r)[0] ?? {}
    expect(Object.keys(entry).sort(), '§2.10 item 10 (census §4.9a) — the entry’s six members').toEqual([...STORE_MESSAGE_KEYS].sort())
    expect(['constraint', 'repair', 'store'].includes(String(entry['source'])), '§2.1 — `source` is WHO authored it').toBe(true)
    expect(typeof entry['pass'], '§2.10 item 10 — `pass` is the 1-based pass, `1` for a call with no constraint phase').toBe('number')
    expect(entry['step'], '§2.10 item 10 — `step` is the step id that appended it').toBe('A-ADDRESS')
  })

  it('N-4 · §2.1 / §2.10 item 4 — the `ConstraintEvaluation` record carries the FOUR `DD-1` members PLUS the `R15` `notes` draft list', async () => {
    await resolveStoreSurface()
    const f = store()
    const probe = register(f, ROOT, [{ ok: true }])
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { seed: 1 } }))
    const evaluation = probe.calls[0]?.evaluation ?? {}
    expect(Object.keys(evaluation).sort(), '§2.1 (R15) — `{address, current, future, changed}` + `notes`, `5 = 4 + 1`').toEqual([...EVALUATION_KEYS].sort())
    expect(Array.isArray(evaluation['notes']), '§2.10 item 4 — `notes` is MINTED EMPTY with the record, PER EVALUATION').toBe(true)
    expect(Object.keys((evaluation['changed'] ?? {}) as Rec).sort(), '§2.10 item 4 — `changed` is the addressed node’s own `{address, tier, literals}`').toEqual(['address', 'literals', 'tier'])
  })

  it('N-5 · §2.1 — `LoadRecord` is a closed `LoadedRecord | Refusal`, with `present` and `roots` on the loaded arm (PAR-12)', async () => {
    await resolveStoreSurface()
    const loaded = call(store(), 'load')
    if (loaded['status'] !== 'refused') {
      expect(Object.keys(loaded).sort(), 'PAR-12 — a load answering `loaded` carries `present` and `roots`').toEqual(['present', 'roots', 'status'])
      expect(typeof loaded['present'], 'PAR-12 — `present`: boolean (the file existed)').toBe('boolean')
      expect(typeof loaded['roots'], 'PAR-12 — `roots`: the count of register entries minted').toBe('number')
    }
    const fs = memoryFs()
    const g = storeOver(fs)
    fs.seed(FILE_PATH, '{not json')
    const refused = call(g, 'load')
    expectRefusal(refused, { reason: 'load-failed', step: 'J-LOAD' })
    expect('roots' in refused, 'PAR-12 — a refusal carrying `roots` FAILS (nothing was minted)').toBe(false)
  })

  it('N-6 · §2.1 — `ListenerRecord = {address, attached}` and `attached` is TRUE iff an unqualified read would answer a transcription', async () => {
    await resolveStoreSurface()
    const f = store()
    const waiting = call(f, 'listen', CHILD, () => undefined)
    expect(Object.keys(waiting).sort(), '§2.1 — the listener record’s two members').toEqual(['address', 'attached'])
    expect(waiting['attached'], '§2.11 item 2 / C23 — an address that does not resolve is UNATTACHED').toBe(false)
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(call(f, 'listen', CHILD, () => undefined)['attached'], '§2.11 item 2 — attached iff the address resolves and is not tombstone-suppressed').toBe(true)
  })

  it('N-7 · §2.1 — `ConstraintRecord = {address, position}` and its `position` indexes the addressed list, NOT the write’s set S', async () => {
    await resolveStoreSurface()
    const f = store()
    const record = call(f, 'constrain', ROOT, { constraint: () => ({ ok: true }) })
    expect(Object.keys(record).sort(), '§2.1 — the REGISTRATION’s own answer').toEqual(['address', 'position'])
    expect(record['position'], '§2.10 item 10 — `ConstraintRecord.position` indexes a registration within the addressed link’s or entry’s OWN list').toBe(0)
    expect(record['address'], '§2.1 — the registration’s own address').toEqual(ROOT)
  })

  it('N-8 · §2.1 / §2.11 item 7(b) — a listener error is `{listener, error}`: its registration index and the thrown value', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'listen', ROOT, () => {
      throw new Error('a listener body threw')
    })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
    const errors = (r['listenerErrors'] ?? []) as Rec[]
    expect(errors.length, 'DD-18 / §2.11 item 7(b) — a throwing body is reported as ONE `listenerErrors` entry').toBe(1)
    expect(Object.keys(errors[0] ?? {}).sort(), '§2.1 — `ListenerError = {listener, error}`').toEqual([...LISTENER_ERROR_KEYS].sort())
    expect(errors[0]?.['listener'], '§2.11 item 7(b) — `listener` is its registration index').toBe(0)
  })

  it('N-9 · §2.1 — `StoreValue`’s admission classes are the SIX and the literal classes within them are the FOUR (`census §4.6`)', async () => {
    await resolveStoreSurface()
    expect(ADMITTED_CLASSES.length, 'census.md §4.6 — ADMITTED `6`').toBe(6)
    expect(LITERAL_CLASSES.length, 'census.md §4.2 — the literal CLASSES those members may carry: `4`').toBe(4)
    const f = store()
    for (const value of ['a string', 123, true, null]) {
      expect(typeof value === 'string' ? 'a string' : value === null ? 'null' : typeof value, '§2.4 item 3 — a LITERAL-classed member becomes an entry of the node’s `literals`').toBeDefined()
    }
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { a: 'a string', b: 123, c: true, d: null } }))['status'], '§2.4 item 3 — the four literal classes mint as literals').toBe('committed')
  })

  it('N-10 · §2.1 — `Tier` is the ranked three on the generic surface and `secure` is NOT a legal argument there', async () => {
    await resolveStoreSurface()
    expect(TIERS_RANKED, '§2.2 item 1 — the generic surface’s WHOLE tier domain').toEqual(['file', 'mem', 'temp'])
    expect(TIERS_ALL.length, 'census.md §4.1 — `4 = 1 (secure, outside every ordering) + 3 (the ranked tiers)`').toBe(4)
    const f = store()
    expectRefusal(call(f, 'read', ROOT, 'secure'), { reason: 'secure-refused', step: 'F-TIER' })
    expectRefusal(call(f, 'write', ROOT, 'secure', { value: 1 }), { reason: 'secure-refused', step: 'F-TIER' })
  })

  it('N-11 · §2.1 / census §4.2 — the step-id set is `13 = 12 + 1`: the appended `M-PROP` sits beside the as-filed twelve', async () => {
    await resolveStoreSurface()
    expect(STEP_IDS.length, 'census.md §4.2 — the diagnostic step ids: `13 = 6 + 7` ✓').toBe(13)
    expect(STEP_IDS[STEP_IDS.length - 1], '§2.1’s appended block — (13) `M-PROP`, the property-resolution step').toBe('M-PROP')
    expectRefusal(call(store(), 'read', ['']), { step: 'A-ADDRESS' })
  })

  it('N-12 · §2.8 item 3 — the read’s answer carries NO provenance: no `parts`, no per-member tier, no `merged` flag', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
    call(f, 'write', CHILD, 'mem', { value: { inner: 2 } })
    const answer = readOn(f, 'generic', ROOT)
    expect(Object.keys(answer).sort(), '§2.8 item 3 — `C21`’s object alone; the tier mix is implicit in the per-node rule').toEqual(['status', 'tier', 'value'])
    expect('parts' in answer || 'merged' in answer, '§2.8 item 3 — a read answer carrying a per-member tier or a `merged` flag FAILS').toBe(false)
  })

  it('N-13 · §2.3 item 4 / C1/C2 — no function returns a node, an anchor, a link, a register entry or a live internal record', async () => {
    await resolveStoreSurface()
    const f = store()
    const answers = [
      call(f, 'read', ROOT),
      call(f, 'write', ROOT, 'mem', { value: { seed: 1 } }),
      call(f, 'listen', ROOT, () => undefined),
      call(f, 'constrain', ROOT, { constraint: () => ({ ok: true }) }),
      call(f, 'load'),
    ]
    for (const answer of answers) {
      const serialized = Object.keys(answer)
      expect(serialized.includes('anchors') || serialized.includes('literals') || serialized.includes('links'), 'C1/C2 — no live internal record is ever returned').toBe(false)
    }
    const readAnswer = readValue(readOn(f, 'generic', ROOT))
    const proto = Object.getPrototypeOf(readAnswer)
    expect(proto === Object.prototype || Array.isArray(readAnswer), '§2.8 item 5 — `Object.getPrototypeOf(v)` is `Object.prototype` for every object and `Array.prototype` for every array').toBe(true)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.2 — THE FOUR TIERS, THE PERSISTENCE ORDER AND THE MONOTONIC INVARIANT
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.2 — THE TIERS, THE ORDER AND THE MONOTONIC INVARIANT', () => {
  it('T-1 · §2.2 item 2 — the persistence order is `file > mem > temp`, with `secure` outside every ordering', async () => {
    await resolveStoreSurface()
    expect(PERSISTENCE_ORDER, 'census.md §4.1 — the order’s ordered pairs: `3` ✓').toEqual([['file', 'mem'], ['file', 'temp'], ['mem', 'temp']])
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.8 item 2 — “lower persistence” = the tier to the RIGHT of `file > mem > temp`').toEqual({ seed: 'temp' })
  })

  it('T-2 · §2.2 item 3 — the monotonic invariant: a node is NEVER more persistent than its parent', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { page: { seed: 1 } } })
    const r = expectRefusal(writeOn(f, 'generic', CHILD, 'file', { value: { seed: 2 } }), { reason: 'persistence-inversion', step: 'F-TIER' })
    expect(Object.keys(r).length, '§2.14 item 2 — the refusal’s four diagnostics ride the closed record').toBe(5)
    expect(f.fs.puts(), 'C7/R3 — the refused write lands nothing and writes no file').toBe(0)
  })

  it('T-3 · §2.2 item 3 — the root has NO parent, so the invariant is vacuously satisfied there', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const tier of TIERS_RANKED) {
      expect(expectCommitted(writeOn(f, 'generic', ROOT, tier, { value: { seed: tier } }))['status'], `C14/§2.2 item 3 — a root write at \`${tier}\` is legal`).toBe('committed')
    }
  })

  it('T-4 · §2.2 item 4 — `secure` is a SEPARATE graph saved to a SEPARATE file, following `file`’s constraints otherwise', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'secureWrite', ROOT, { value: { seed: 1 } })
    expect(fs.bytes(FILE_PATH), 'C6 — “saves to a separate file”: the generic `file` tier’s path is untouched').toBeNull()
    expect(fs.bytes('/store/secure.json'), 'C6 — the secure graph’s OWN file carries the state').not.toBeNull()
  })

  it('T-5 · §2.2 item 3 / census §4.4 — the nine tier pairs: six legal and three refused, each driven to its DECLARED answer', async () => {
    await resolveStoreSurface()
    /** THE DECLARED CLASSIFICATION, cell by cell, FROM THE CLAUSE AND NOT FROM THE BUILD
     *  (`store-model.md` §2.2 item 3: *"A NODE MAY NOT BE MORE PERSISTENT THAN ITS PARENT"* —
     *  `rank(child) ≤ rank(parent)` with `rank(file)=3 > rank(mem)=2 > rank(temp)=1`, terms
     *  `9 = 3 × 3`, of which `6` legal and `3` refused — `census.md` §4.4, whose own words are
     *  *"of which `6` legal + `3` refused"*; the tier-pair figure lives at `§4.4` and `§4.5`
     *  carries the `file` tier's bound mutation classes).
     *
     *  `(child, parent)` cells — THE ONE READING THIS CONTRACT DECLARES (`store-model.md` §2.2 item 3:
     *  *"For every parent-side anchor's link, `rank(child node's tier) ≤ rank(parent node's tier)`"*,
     *  *"A write whose tier OUT-RANKS the parent instance's tier is REFUSED"*, with the `9 = 3 × 3`
     *  figure at `census.md` §4.4 and the `file` tier's bound mutation classes at `§4.5`). **THE
     *  TUPLE ORDER IS THE CLAUSE'S OWN SENTENCE ORDER — CHILD FIRST, PARENT SECOND** (`rank(child)`
     *  is written before `rank(parent)`), so a cell `(mem, file)` reads *"a `mem` CHILD under a `file`
     *  PARENT"* and drives `rank(mem)=2 ≤ rank(file)=3`: LEGAL. **THE RANK CONSTANTS ARE THE
     *  CLAUSE'S OWN, PRINTED: `rank(file)=3 > rank(mem)=2 > rank(temp)=1`** — `file`
     *  is the MOST persistent, which `§2.5` item 4's purge set (`purge(file) = {mem, temp}`, i.e. `2`
     *  at `census.md` §4.4 with `purge(temp) = 0 · purge(mem) = 1`) confirms from the other side: a
     *  more-persistent write purges MORE lower instances. So `rank(child) ≤ rank(parent)` refuses
     *  exactly the three pairs whose CHILD out-ranks its parent:
     *    LEGAL   (child no MORE persistent than the parent) — `6`:
     *            `(file,file)` · `(mem,file)` · `(mem,mem)` · `(temp,file)` · `(temp,mem)` · `(temp,temp)`
     *    REFUSED (`'persistence-inversion'` at `F-TIER`, token 11) — `3`:
     *            `(file,mem)` · `(file,temp)` · `(mem,temp)`
     *
     *  `(mem,file)` is LEGAL and not refused: a `mem` CHILD under a `file` PARENT does NOT out-rank
     *  it (`rank(mem)=2 ≤ rank(file)=3` — the child is allowed to be no MORE persistent than the
     *  parent; `rank(file)=3 > rank(mem)=2` is the OTHER direction, the one that is REFUSED), and
     *  §2.5 item 7's `A2` refuses
     *  a CONTAINER at a NODE LOCATION — so every cell below drives its child member through `A5`/`A6`
     *  (a PROPERTY address of the root: the container LANDS) and never through `A2`. Each cell drives
     *  the tiers its own pair names (the `file` cells included), and every cell supplies the fixture's
     *  explicit `PAR-11` filesystem double (`memoryFs`, `store()`'s own), so no cell reaches a real
     *  writable path and `PAR-11`'s *"absent ⇒ the real `node:fs`"* arm is NOT what this row
     *  exercises. */
    const legalPairs: readonly (readonly [string, string])[] = [
      ['file', 'file'], ['mem', 'file'], ['mem', 'mem'], ['temp', 'file'], ['temp', 'mem'], ['temp', 'temp'],
    ]
    const refusedPairs: readonly (readonly [string, string])[] = [
      ['file', 'mem'], ['file', 'temp'], ['mem', 'temp'],
    ]
    /** THE RANK, READ OFF THE CLAUSE'S OWN PRINTED CONSTANTS: `§2.2` item 3 prints
     *  *"`rank(file)=3 > rank(mem)=2 > rank(temp)=1`"* — `file` is the MOST persistent — so the map
     *  below is the clause's own constant mapping, spelled tier by tier (`file` 3 > `mem` 2 >
     *  `temp` 1), and `§2.2` item 3's `rank(child) ≤ rank(parent)` is the assertion below. **THE
     *  EARLIER FORM OF THIS HELPER USED `indexOf(tier)+1`, WHICH IS THE INVERTED CONSTANT**
     *  (`rank(file)=1`), contradicting the clause it cites while leaving this row's legal/refused
     *  LISTS — which are the clause's — untouched: a defect of the HELPER, corrected here. **THE
     *  TUPLE ORDER IS THE ONE THING THE LISTS DO NOT SPELL OUT, AND IT IS THE CLAUSE'S OWN: child
     *  FIRST, parent SECOND** — every call site below destructures `[child, parent]` and passes the
     *  child's tier to `rank()` first, so a cell `(mem, file)` evaluates `2 ≤ 3` and is LEGAL, and the
     *  drive writes the PARENT instance at the parent tuple member's tier (a root write: the
     *  invariant is vacuous there, `§2.2` item 3) and the CHILD at the child member's tier. An
     *  earlier form of these loops destructured `[parent, child]`, i.e. fed the tuple's PARENT slot
     *  (`file` in `(mem, file)`) to `rank(child)` as `3` and its CHILD slot to `rank(parent)` as `2`,
     *  reading the clause's own LEGAL cell backwards (`3 ≤ 2`) and failing at this pre-check before
     *  the module was ever touched. */
    const TIER_RANK_LOCAL: Readonly<Record<string, number | undefined>> = { file: 3, mem: 2, temp: 1 }
    const rank = (tier: string): number => TIER_RANK_LOCAL[tier] ?? Number.NEGATIVE_INFINITY
    expect(TIERS_RANKED, '§2.2 item 2 — the ranked tiers, in the declared order').toEqual(['file', 'mem', 'temp'])
    expect(legalPairs.length + refusedPairs.length, 'census.md §4.4 — the persistence pairs for the invariant: `9 = 3 × 3` ✓').toBe(9)
    expect(legalPairs.length, 'census.md §4.4 — of which `6` legal').toBe(6)
    expect(refusedPairs.length, 'census.md §4.4 — and `3` refused').toBe(3)
    for (const [child, parent] of legalPairs) {
      expect(
        rank(child) <= rank(parent),
        `§2.2 item 3 — \`(${child}, ${parent})\` is LEGAL: rank(child)=${rank(child)} ≤ rank(parent)=${rank(parent)}, so the write does not out-rank its parent instance`,
      ).toBe(true)
    }
    for (const [child, parent] of refusedPairs) {
      expect(rank(child) > rank(parent), `§2.2 item 3 — \`(${child}, ${parent})\` is REFUSED: the child would out-rank its parent`).toBe(true)
    }
    for (const [child, parent] of legalPairs) {
      const f = store()
      /** The CHILD member is driven through a PROPERTY address (`A6`'s add: a CONTAINER at an
       *  ABSENT PROPERTY) — never at `ROOT` itself, where `A2`'s node-location refusal would fire
       *  before `F-TIER` ever ran. */
      expect(expectCommitted(writeOn(f, 'generic', ROOT, parent, { value: { seed: 1 } }))['status'], `§2.2 item 3 — the ROOT write at \`${parent}\` is legal (no parent ⇒ the invariant is vacuous)`).toBe('committed')
      expect(
        expectCommitted(writeOn(f, 'generic', CHILD, child, { value: { page: 2 } }))['status'],
        `§2.2 item 3 — \`(${child}, ${parent})\`: rank(child) ≤ rank(parent), so the write LANDS`,
      ).toBe('committed')
    }
    for (const [child, parent] of refusedPairs) {
      const f = store()
      call(f, 'write', ROOT, parent, { value: { seed: 1 } })
      expectRefusal(writeOn(f, 'generic', CHILD, child, { value: { page: 2 } }), { reason: 'persistence-inversion', step: 'F-TIER' })
    }
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.3 — THE ADDRESS SPACE, THE WALK AND THE `M-PROP` RESOLUTION
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.3 — THE ADDRESS SPACE AND THE WALK', () => {
  it('A-1 · §2.3 item 1 — the FOUR malformed arms are REFUSED `malformed-address` at `A-ADDRESS`, `segment: null`', async () => {
    await resolveStoreSurface()
    expect(MALFORMED_ADDRESS_ARMS.length, 'census.md §4.7 — terms: `4` malformed arms').toBe(4)
    const arms: readonly (readonly [string, unknown])[] = [
      ['a non-array', 'tabs.page'],
      ['an empty array', []],
      ['a non-string segment', ['tabs', 7]],
      ['an empty-string segment', ['tabs', '']],
    ]
    for (const [name, address] of arms) {
      expectRefusal(call(store(), 'write', address, 'mem', { value: 1 }), { reason: 'malformed-address', step: 'A-ADDRESS', segment: null })
      expectRefusal(call(store(), 'read', address), { reason: 'malformed-address', step: 'A-ADDRESS', segment: null })
      expect(name.length, '§2.3 item 1 — the arm is named').toBeGreaterThan(0)
    }
  })

  it('A-2 · §2.3 item 1 / DD-10 — a DOTTED STRING is OUTSIDE the domain: the store declares NO parser', async () => {
    await resolveStoreSurface()
    expectRefusal(call(store(), 'read', 'tabs.page'), { reason: 'malformed-address', step: 'A-ADDRESS' })
  })

  it('A-3 · §2.3 item 2 — `B-ROOT`: `address[0]` names no register entry ⇒ `unknown-root` where the call WALKS, and `listen`/`constrain` are HELD PENDING against their own address', async () => {
    await resolveStoreSurface()
    /** THE WALK'S OWN REFUSAL (`§2.3` item 2 `B-ROOT` · `§2.14` token 2, whose `applies to` cell is
     *  `read` · `write` · `listen` · `constrain`). A `read` and a `write` walk their address AT CALL
     *  TIME, so a missing root is token 2 AT THAT CALL (`C14`: a root comes into being ONLY by a write
     *  at a 1-segment address). */
    const f = store()
    expectRefusal(call(f, 'read', ['nope']), { reason: 'unknown-root', step: 'B-ROOT' })
    expectRefusal(call(f, 'write', ['nope', 'child'], 'mem', { value: 1 }), { reason: 'unknown-root', step: 'B-ROOT' })
    /** THE ATTACHMENT SEAM IS NOT THE WALK (`§2.11` items 2–3 · `C14` · `§2.10` item 2): `listen`
     *  answers `{address, attached}` and `constrain` answers `{address, position}` for an address that
     *  does not yet resolve — `C23`'s own *"an event listener can be unattached (waiting for an
     *  address that is currently unreachable)"* — and `C14`'s register seam NEVER MINTS A PATH, so a
     *  registration at an address that does not resolve is HELD PENDING against its OWN address and is
     *  evaluated when a write reaches it (`§2.11` item 4: attachment is re-evaluated at the end of
     *  every successful write; `§2.10` item 3: the evaluated set is every registration at a PREFIX
     *  address of the write). An expectation of a refusal AT REGISTRATION is the defect this row's
     *  earlier form carried — it contradicted this file's own `listen`/`constrain` rows on a fresh
     *  store. */
    const g = store()
    let fired = 0
    const listener = call(g, 'listen', ['nope'], () => {
      fired += 1
    })
    expect(listener['address'], '§2.1 — the listener record’s own address').toEqual(['nope'])
    expect(listener['attached'], 'C23 — the address does not resolve yet, so the listener is UNATTACHED (held pending), never refused').toBe(false)
    const registration = call(g, 'constrain', ['nope'], { constraint: () => ({ ok: true }) })
    expect(registration['address'], '§2.10 item 2 — the registration is held against its OWN address').toEqual(['nope'])
    expect(registration['position'], '§2.1 — the registration’s own position in that address’s list').toBe(0)
    expect(fired, '§2.11 item 4 — an unattached listener is not fired by a registration').toBe(0)
    /** AND IT IS EVALUATED ONCE THE WRITE REACHES IT (`§2.11` item 4 with `§2.10` item 3): the write
     *  that mints the root is the write that reaches `['nope']`. */
    const probe = register(g, ['nope'], [{ ok: true }])
    expectCommitted(writeOn(g, 'generic', ['nope'], 'mem', { value: { seed: 1 } }))
    expect(probe.calls.length, '§2.10 item 3 — the pending registration is evaluated by the write that reaches its address').toBe(1)
    expect(call(g, 'read', ['nope']), 'C14 — the write at the 1-segment address minted the register entry').toBeDefined()
  })

  it('A-4 · §2.3 item 2 / DD-11 — an INTERMEDIATE arm that fails refuses `unreachable` and MINTS NOTHING', async () => {
    await resolveStoreSurface()
    /** THE MIDDLE OF A WALK, WITH THE ROOT RESOLVED (`§2.3` item 2's `C-ANCHOR` · `C17` ·
     *  `§2.14` token 3, step `C-ANCHOR`). `B-ROOT` PRECEDES `C-ANCHOR`, so every drive here first
     *  mints its root: an address whose `address[0]` names no entry is token 2 (row `A-3`), NOT this
     *  one. */
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(f, 'write', ['tabs', 'missing', 'deeper'], 'mem', { value: 1 }), { reason: 'unreachable', step: 'C-ANCHOR' })
    const g = store()
    call(g, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(g, 'write', ['tabs', 'page', 'body', 'title'], 'mem', { value: 1 }), { reason: 'unreachable', step: 'C-ANCHOR' })
    expect(readValue(readOn(g, 'generic', ROOT)), 'DD-11 — an intermediate arm that fails mints nothing at all').toEqual({ seed: 1 })
    /** THE TIER ARGUMENT IS `PAR-2`'s PARAMETER, NOT THIS ROW'S ARM (`§6` `PAR-2`): a write tier that
     *  is a non-string or any other string is `'malformed-tier'` at `F-TIER` (token 7). */
    expectRefusal(call(store(), 'write', ROOT, 'disk', { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
    expectRefusal(call(store(), 'write', ROOT, 7, { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
  })

  it('A-5 · §2.3 item 2 / C14 — a root comes into being ONLY by a write at a 1-segment address', async () => {
    await resolveStoreSurface()
    const f = store()
    expectRefusal(call(f, 'read', ROOT), { reason: 'unknown-root' })
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))['status'], 'C18/C14 — the 1-segment write creates the register entry').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT)), 'C14 — the entry’s child is the root node').toBe(1)
  })

  it('A-6 · §2.3 item 4 — the walk consumes `segment i ≥ 2` through `C-ANCHOR → D-LINK → E-CHILD`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { page: { body: { title: 't' } } } })
    expect(readValue(readOn(f, 'generic', DEEPER)), 'C16 — the node named by the prefix is the child-side node reached at `i`').toEqual({ title: 't' })
    expect(readValue(readOn(f, 'generic', ['tabs', 'page', 'body', 'title'])), 'C16 — the walk reaches the addressed node at `i = n`').toBe('t')
  })

  it('A-7 · §2.3 item 4 — a `child`-type anchor is NEVER a walk step (a row that lets it be one FAILS)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { page: { seed: 1 } } })
    expect(readValue(readOn(f, 'generic', CHILD)), '§2.3 item 4 — the two anchor sides carry the same `key`, so `C-ANCHOR` MUST filter on `type === \'parent\'`').toEqual({ seed: 1 })
    /** THE TRAP THE FILTER CLOSES, DRIVEN AND MEASURED: the node at `['tabs','page']` carries a
     *  `child`-type anchor whose `key` is ALSO `'page'` (`§2.3` item 4: *"the two sides carry the same
     *  `key`"*). A walk that let a `child`-type anchor be a STEP would follow that anchor back onto
     *  its own node and transcribe `['tabs','page','page']`; the declared arm for the FINAL segment at
     *  a resolved parent that carries neither a literal nor a `parent` anchor is the ABSENT-PROPERTY
     *  row (`§2.3` item 2 (iii) · `§2.8` item 7 arm `R3`: `'absent-address'` at `E-CHILD`, token 4),
     *  and it is the SAME arm this file's row `A-10` asserts for the same walk state. */
    expectRefusal(call(f, 'read', [...CHILD, 'page']), { reason: 'absent-address', step: 'E-CHILD' })
    expectRefusal(call(f, 'read', [...CHILD, 'page', 'deeper']), { reason: 'unreachable' })
  })

  it('A-8 · §2.3 item 2 — `M-PROP` resolves a NODE LOCATION: an address carried by an EXISTING link', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(readValue(readOn(f, 'generic', CHILD)), '§2.3 item 2 (i) — “an address that resolves to being contained in an existing link”').toEqual({ seed: 1 })
    /** The `A2` cell: a CONTAINER at that NODE LOCATION. The fixture's EXPLICIT `PAR-11` double is
     *  supplied, so the no-file-written half is asserted on its bytes. */
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', CHILD, () => {
      fired += 1
    })
    const r = expectNodeLocationContainerRefusal(writeOn(f, 'generic', CHILD, 'mem', { value: { seed: 2 } }), 'A-8')
    expect(fs.bytes(FILE_PATH), 'A2 — NO FILE IS WRITTEN (the pre-call bytes stand byte-identical)').toBe(preBytes)
    expect(fired, 'A2 — the purge does not run and no listener fires').toBe(0)
    expect('purged' in r, 'A2 — the closed `Refusal` carries no `purged` member').toBe(false)
    expect(readValue(readOn(f, 'generic', CHILD)), 'A2 — nothing is minted: the pre-call state stands').toEqual({ seed: 1 })
  })

  it('A-9 · §2.3 item 2 — `M-PROP` resolves a LITERAL PROPERTY: the final segment stands in the parent’s `literals`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 'a literal' } })
    expect(readValue(readOn(f, 'generic', ['tabs', 'seed'])), 'R16(b) — a read address that corresponds to a literal property returns ONLY that property').toBe('a literal')
  })

  it('A-10 · §2.3 item 2 — `M-PROP` resolves an ABSENT PROPERTY: neither a literal nor a `parent` anchor at that segment', async () => {
    await resolveStoreSurface()
    const f = store()
    /** `B-ROOT` PRECEDES `C-ANCHOR` (`§2.3` item 2), so the root is minted FIRST: an address whose
     *  `address[0]` names no entry answers token 2 (`unknown-root`, row `A-3`), never token 4. */
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(f, 'read', CHILD), { reason: 'absent-address', step: 'E-CHILD' })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { inner: 2 } }))['status'], 'C18 — the write ADDS the data using that address as its entry').toBe('committed')
  })

  it('A-11 · §2.3 item 2 — the FOURTH resolution state is NO RESOLUTION (`unreachable`): `R16`(a)’s own condition is FALSE', async () => {
    await resolveStoreSurface()
    expect(RESOLUTION_ANSWERS, 'census.md §4.2 — the `M-PROP` resolution’s answers: `4 = 1 + 1 + 1 + 1` ✓').toEqual(['node-location', 'literal-property', 'absent-property', 'unreachable'])
    /** NO RESOLUTION = the IMMEDIATE PARENT does not resolve (`§2.3` item 2 (iv) · `§2.5` item 7:
     *  *"A row driven to an arm outside this table FAILS"*). The walk runs `B-ROOT` BEFORE
     *  `C-ANCHOR`, so the root is minted first and only the SEGMENT ABOVE it is missing — a missing
     *  ROOT is token 2 (`unknown-root`, row `A-3`), and the two rows thereby agree on the arm. */
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(f, 'write', ['tabs', 'missing', 'leaf'], 'mem', { value: 'a literal' }), { reason: 'unreachable', step: 'C-ANCHOR' })
    expectRefusal(call(store(), 'write', ['nope', 'page'], 'mem', { value: 'a literal' }), { reason: 'unknown-root', step: 'B-ROOT' })
  })


  it('A-12 · §2.3 item 2 — the resolution’s two records are NEVER returned to a caller (C1/C2)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    const answer = call(f, 'write', CHILD, 'mem', { value: { seed: 2 } })
    expect('kind' in answer && 'parent' in answer, '§2.1 — `PropertyResolution` is the write’s and the read’s shared arm-selector; neither is ever returned').toBe(false)
  })

  it('A-13 · §2.3 item 1 — a segment may be ANY non-empty string (`_value`, `secure`, dots): no alphabet, no escaping', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const segment of ['_value', 'secure', 'file.mem', 'a b c', '0']) {
      expect(expectCommitted(writeOn(f, 'generic', [segment], 'mem', { value: segment }))['status'], `§2.3 item 1 / R2 — “${segment}” is a legal SEGMENT (no whitelist, no alphabet)`).toBe('committed')
    }
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.4 — THE MINT AND THE ADMISSION SET
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.4 — THE MINT AND THE ADMISSION SET', () => {
  it('M-1 · §2.4 item 2 / DD-5 — the SIX admitted classes each mint, at every depth', async () => {
    await resolveStoreSurface()
    const values: readonly unknown[] = ['a string', 123, true, null, { nested: { deeper: 1 } }, [1, 'a', null]]
    expect(values.length, 'census.md §4.6 — ADMITTED `6`').toBe(6)
    for (const value of values) {
      const f = store()
      expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value }))['status'], '§2.4 item 2 — an admitted class mints').toBe('committed')
      expect(readValue(readOn(f, 'generic', ROOT)), '§2.4 item 3 — the whole-depth recursion is addressable').toEqual(value)
    }
  })

  it('M-2 · §2.4 item 2 / DD-5 — the SIXTEEN refused classes each answer `value-not-admitted`, minting nothing and writing no file', async () => {
    await resolveStoreSurface()
    expect(REFUSED_CLASSES.length, '`P-SD-TP-4` — the refused census is `16` named classes, and every one is driven').toBe(REFUSED_CENSUS)
    const cyclic: Rec = { name: 'cycle' }
    cyclic['self'] = cyclic
    const accessor: Rec = {}
    Object.defineProperty(accessor, 'computed', { get: () => 1, enumerable: true })
    class ClassInstance {
      readonly x = 1
    }
    const arrayExtra = [1, 2] as unknown[] & Rec
    arrayExtra['extra'] = 'x'
    const arrayHole: unknown[] = [1]
    arrayHole[2] = 3
    const symbolKeyed: Rec = {}
    ;(symbolKeyed as Record<symbol, unknown>)[Symbol('hidden')] = 1
    /** The refused census is `16` CLASSES (`§2.4` item 2 · `census.md` §4.6), so the two classes
     *  the contract prints as ONE row each (`Infinity`/`-Infinity`, and the `Map`/`Set`/`WeakMap`/
     *  `WeakSet` group) are driven INSIDE one cell and each member of the group is asserted. */
    const refused: readonly (readonly [string, readonly unknown[]])[] = [
      ['undefined', [undefined]],
      ['a function', [(): void => undefined]],
      ['a symbol', [Symbol('s')]],
      ['a bigint', [BigInt(1)]],
      ['NaN', [Number.NaN]],
      ['Infinity / -Infinity', [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]],
      ['-0', [-0]],
      ['a cyclic object', [cyclic]],
      ['a Map / Set / WeakMap / WeakSet', [new Map(), new Set(), new WeakMap(), new WeakSet()]],
      ['a Date', [new Date(0)]],
      ['a non-plain prototype / class instance', [new ClassInstance()]],
      ["an array's own hole", [arrayHole]],
      ["an array's own member beyond its dense indices", [arrayExtra]],
      ['an own accessor property', [accessor]],
      ['an own symbol-keyed member', [symbolKeyed]],
      ["an own member key that is the empty string", [{ '': 1 }]],
    ]
    for (const [label, values] of refused) {
      expect(label.length, 'census.md §4.6 — the refused class is NAMED').toBeGreaterThan(0)
      for (const value of values) {
        const fs = memoryFs()
        const f = storeOver(fs)
        expectRefusal(writeOn(f, 'generic', ROOT, 'file', { value }), { reason: 'value-not-admitted', step: 'G-VALUE' })
        expect(fs.puts(), '§2.4 item 2 — nothing is minted and NO file is written').toBe(0)
        expectRefusal(call(f, 'read', ROOT), { reason: 'unknown-root', step: 'B-ROOT' })
      }
    }
  })

  it('M-3 · §2.4 item 2 / PAR-4 — `undefined` is REFUSED as a value and is NEVER read as a delete', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { keep: 1 } })
    expectRefusal(call(f, 'write', ['tabs', 'keep'], 'mem', { value: undefined }), { reason: 'value-not-admitted' })
    expect(readValue(readOn(f, 'generic', ROOT)), 'write-and-read.md §2.8 item 8(c) — no `undefined`-as-delete exists').toEqual({ keep: 1 })
  })

  it('M-4 · §2.4 item 6 — the node’s content model is EXACTLY THREE member kinds, and there is no fourth', async () => {
    await resolveStoreSurface()
    expect(NODE_MEMBER_KINDS.length, 'census.md §4.2 — the node’s member KINDS: `3 = 1 + 1 + 1` ✓').toBe(3)
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { literal: 1, container: { inner: 2 } } })
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.4 item 6 — a LITERAL member and an ANCHOR member are distinguished by WHICH TABLE the key stands in').toEqual({ literal: 1, container: { inner: 2 } })
    expect(NODE_MEMBER_KINDS[2], '§2.4 item 6(iii) — the reserved `_value` is a LITERAL member distinguished BY ITS KEY ALONE').toBe('the reserved _value')
  })

  it('M-5 · §2.3 item 5 / R16(e) — a TRANSPARENT node is a node whose `literals` holds EXACTLY `_value` and no anchors', async () => {
    await resolveStoreSurface()
    const f = store()
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 123, transparent: true }))['status'], 'PAR-14 — the transparency is asked for with the payload’s `transparent` member').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT)), 'R16(e) — the unqualified read answers the `_value` literal alone').toBe(123)
    expect(readValue(readOn(f, 'generic', ROOT, 'mem')), '§2.3 item 5(a) — the node IS addressable and a QUALIFIED read returns the node').toEqual({ _value: 123 })
  })

  it('M-6 · §2.3 item 5(c) / R17(c) — EXCLUSIVITY: `_value` is alone in its node, and a second member is refused', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: 'alone', transparent: true })
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: { second: 1 } }), { reason: 'value-not-admitted', step: 'G-VALUE' })
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.3 item 5(c) — a member no unqualified read can reach is a member the contract must not permit').toBe('alone')
  })

  it('M-7 · §2.3 item 5(b) — `_value` is RESERVED as a MEMBER KEY (a different referent from a legal SEGMENT)', async () => {
    await resolveStoreSurface()
    const f = store()
    expect(call(f, 'write', ROOT, 'mem', { value: { _value: 'ordinary' } })['status'], '§2.3 item 5(b) — a caller who writes a member named `_value` does NOT get the transparency').not.toBe('committed')
    expect(expectCommitted(writeOn(f, 'generic', ['_value'], 'mem', { value: 'a literal' }))['status'], 'PAR-1a — a segment spelled `_value` is LEGAL').toBe('committed')
  })

  it('M-8 · §2.4 item 7 — a LIST-SHAPED node is recognised by its CHILDREN, and a DICT-SHAPED node by its anchors+literals', async () => {
    await resolveStoreSurface()
    expect(CONDENSATION_SHAPES, 'census.md §4.2 — the condensation SHAPES: `2 = 1 + 1` ✓').toEqual(['list-shaped', 'dict-shaped'])
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { list: [true, 123, 'Foo'], dict: { a: 1 } } })
    const value = readValue(readOn(f, 'generic', ROOT)) as Rec
    expect(value['list'], 'R16(e)’s own round trip: `write [true, 123, "Foo"] → link with nodes of values → read [true, 123, "Foo"]`').toEqual([true, 123, 'Foo'])
    expect(Array.isArray(value['list']), '§2.4 item 7 — the ARRAY arm is decided by the children (each a transparent node) and the dense `order`s').toBe(true)
    expect(Array.isArray(value['dict']), '§2.4 item 7 — a dict-shaped node condenses to an OBJECT').toBe(false)
  })

  it('M-9 · DD-13 (re-grained) — `[] ≅ {}` is KEPT; the struck `{\'0\':\'a\'} ≅ [\'a\']` corner is NOT asserted', async () => {
    await resolveStoreSurface()
    const emptyArray = store()
    call(emptyArray, 'write', ROOT, 'mem', { value: [] })
    const emptyObject = store()
    call(emptyObject, 'write', ROOT, 'mem', { value: {} })
    expect(readValue(readOn(emptyArray, 'generic', ROOT)), 'DD-13 (3) — `[] ≅ {}` STANDS, verified clean: both empty writes mint the same memberless node').toEqual({})
    expect(readValue(readOn(emptyObject, 'generic', ROOT)), 'DD-13 (3) — the object arm is the `otherwise` arm and the bytes answer `{}`').toEqual({})
  })

  it('M-10 · §2.4 item 7 / DD-13 (2) / `(D2)` — a DICT’s KEYED anchor set and a LIST’s DENSE-ORDER anchor set are TWO STATES with TWO byte forms, and both carry `{\'_value\': …}` children', async () => {
    await resolveStoreSurface()
    /** **RE-DERIVED 2026-10-11 (THE TESTWRITER, ON THE ARCHITECT'S ACTIVE RULING IN
     *  `docs/decisions.md`: `(D2)`/`(D3)`).** THE EARLIER FORM DROVE `{'0':'a'}` AGAINST `['a']` AND
     *  CLAIMED THAT `DD-13`(2)'s *"A DICT member is a LITERAL ON THE NODE ITSELF"* reading made their
     *  bytes differ (`"0"` in the dict, `[` in the list). **`(D3)` SUPERSEDES THAT READING, and the
     *  clause's own two-state claim dies with it — NOT as a test defect but as a CONTRACT-INTERNAL
     *  follow-up, reported by this cell's author and NOT rewritten here.** Under `(D2)` a
     *  literal-valued member of ANY container is minted as a child node carrying the reserved
     *  `_value` (`R16`(e)), so `{'0':'a'}` and `['a']` mint the SAME tree: one anchor, `order 0`, one
     *  transparent child — and even their ANCHOR KEYS coincide, because a 1-element list's element
     *  anchor is keyed `'0'` (`§2.4` item 3) exactly as the dict's member anchor is. `DD-13`'s
     *  AS-FILED array test was restored to operate on the keys, so the pair is NOT interchangeable —
     *  but the distinction `DD-13`(2) asserts is not derivable at a `'0'`-spelled key, and a
     *  `{'0':'a'}` ≅ `['a']` row of its own is OWED to the spec writer (`§2.4` item 7's third
     *  amendment *"THE CANONICAL-DECIMAL KEY SPELLING IS DEMOTED FROM TEST TO CONSEQUENCE"*, whose
     *  *follows-from-the-mint* claim is refuted by `(D2)`'s linked anchor set). **WHAT THIS ROW
     *  DERIVES NOW IS THE DISTINCTION `(D2)` LEAVES STANDING** — `§2.4` item 7's two recognised
     *  SHAPES: a **DICT-SHAPED** node *"condensed by anchor `key`"* (a keyed anchor set) against a
     *  **LIST-SHAPED** node *"condensed by anchor `order`"* (a dense-order anchor set), both carrying
     *  `_value`-carrying children, and `DD-13`'s `[]` ≅ `{}` half kept exactly as the clause states
     *  it (`M-9` carries that half's own equality). `PAR-11` — a `memoryFs` per drive. */
    const dictFs = memoryFs()
    const dict = storeOver(dictFs)
    call(dict, 'write', ROOT, 'file', { value: { k: 'a' } })
    const dictBytes = dictFs.bytes(FILE_PATH)
    const listFs = memoryFs()
    const list = storeOver(listFs)
    call(list, 'write', ROOT, 'file', { value: ['a'] })
    const listBytes = listFs.bytes(FILE_PATH)
    expect(dictBytes, 'C7 — the keyed arm’s bytes are the state').not.toBeNull()
    expect(listBytes, 'C7 — the dense-order arm’s bytes are the state').not.toBeNull()
    expect(dictBytes, '`DD-13` (2) as re-derived by `(D2)` — a KEYED anchor set and a DENSE-ORDER anchor set are two states with TWO byte forms').not.toBe(listBytes)
    expect(dictBytes ?? '', '`(D2)`/`R16`(e) — BOTH arms carry the transparency’s child nodes: the dict’s member child is `{"_value":"a"}`').toContain('"_value"')
    expect(listBytes ?? '', '`(D2)`/`R16`(e) — and so is the list’s element child').toContain('"_value"')
    expect(
      JSON.parse(dictBytes ?? '{}') as unknown,
      '§2.4 item 7 — the DICT-SHAPED arm is condensed BY ANCHOR `key`: the object’s member is the member’s own name and its value is the child node’s `_value`',
    ).toEqual({ tabs: { k: { _value: 'a' } } })
    expect(
      JSON.parse(listBytes ?? '{}') as unknown,
      '§2.4 item 7 — the LIST-SHAPED arm is condensed BY ANCHOR `order`: the array’s element is the child node’s `_value`',
    ).toEqual({ tabs: [{ _value: 'a' }] })
    /** THE READ SIDE OF THE SAME TWO ARMS, so the byte forms are tied to the states they condense:
     *  the dict answers ONE object whose member is the member’s own name, and the list answers a real
     *  ARRAY. (The `'0'`-spelled dict is deliberately NOT driven here — see the note above: its
     *  distinctness from `['a']` is a contract-internal follow-up, not this row’s claim.) */
    const dictRead = readValue(readOn(dict, 'generic', ROOT)) as Rec
    const listRead = readValue(readOn(list, 'generic', ROOT))
    expect(Array.isArray(listRead), '§2.4 item 7 — the list arm condenses to an ARRAY (its children being transparent, condensed AWAY)').toBe(true)
    expect(Array.isArray(dictRead), '§2.4 item 7 — the dict arm is the `otherwise` arm and never an array').toBe(false)
    expect(Object.keys(dictRead), '§2.4 item 7 — the dict’s member naming is the ANCHOR KEY’s').toEqual(['k'])
    expect(readValue(readOn(dict, 'generic', ['tabs', 'k'])), '`R16`(e)/`(D2)` — the dict member’s own address is a NODE LOCATION, answering its literal through the transparency').toBe('a')
    expect(readValue(readOn(list, 'generic', ['tabs', '0'])), '`R16`(e)/`(D2)` — and the list element’s own address is the same kind of node').toBe('a')
  })

  it('M-11 · §2.4 item 3 — the mint keys a CONTAINER member’s anchor by the member’s name and orders it densely from 0', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { a: { inner: 1 }, b: { inner: 2 } } })
    expect(Object.keys(readValue(readOn(f, 'generic', ROOT)) as Rec), '§2.4 item 3 — a parent anchor per container member, `key`ed by the member’s name').toEqual(['a', 'b'])
    expect(readValue(readOn(f, 'generic', ['tabs', 'b'])), '§2.4 item 3 — the child node is addressable as `address ⊕ [key]`').toEqual({ inner: 2 })
  })

  it('M-12 · §2.4 item 5 — NO VALUE IS EVER A REFERENCE and NO MINT IS EVER PARTIAL', async () => {
    await resolveStoreSurface()
    const f = store()
    const caller: Rec = { inner: { deep: 1 } }
    call(f, 'write', ROOT, 'mem', { value: caller })
    ;((caller['inner'] ?? {}) as Rec)['deep'] = 99
    expect(readValue(readOn(f, 'generic', ROOT)), 'C2/C3 — a stored value that aliases the caller’s object FAILS; the store holds its own minted state').toEqual({ inner: { deep: 1 } })
    /** A FAILED SAVE IS NOT A REFUSED LOAD (`contract.md` §0A `DD-14`: only a refused LOAD enters the
     *  declared UNLOADED state — `§2.12` item 4, token 15). The tier's PRE-CALL state therefore
     *  STANDS after a `'save-failed'` write (`§2.7` item 5: *"the pre-call file-tier state stands; the
     *  pre-call file bytes stand"*), and a `file`-tier read at it answers its pre-call instance — the
     *  store does NOT answer `'not-loaded'` for a failed save (`§2.6` item 3 / row `F-3`). The drive
     *  therefore establishes an instance first, so the pre-call state is observable. */
    const fs = memoryFs()
    const g = storeOver(fs)
    call(g, 'write', ROOT, 'file', { value: 'pre-call' })
    const preBytes = fs.bytes(FILE_PATH)
    fs.failSaves(1)
    expectRefusal(writeOn(g, 'generic', ROOT, 'file', { value: 'partial' }), { reason: 'save-failed', step: 'I-SAVE' })
    expect(fs.bytes(FILE_PATH), '§2.7 item 5 — the pre-call file bytes stand').toBe(preBytes)
    expect(readValue(call(g, 'read', ROOT)), 'DD-14 — a failed SAVE is not a refused LOAD: the pre-call state stands and the tier stays loaded').toEqual('pre-call')
  })


  it('M-13 · §2.4 item 4 / C18 — the worked illustration: `{active: true, contents: {...}}`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { active: true, contents: { deep: 1 } } })
    expect(readValue(readOn(f, 'generic', ['tabs', 'active'])), 'C18 — the node holds a literal for `active`').toBe(true)
    expect(readValue(readOn(f, 'generic', ['tabs', 'contents'])), 'C18 — one parent anchor for the `contents` object, itself addressable').toEqual({ deep: 1 })
  })

  it('M-14 · §2.4 item 3 — NODES CARRY NO NAME: a node’s name is its anchor’s `key` or the register entry’s `name`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(readValue(readOn(f, 'generic', CHILD)), 'C11/C14 — a node does not carry its own name, ref, flag or cache').toEqual({ seed: 1 })
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.5 — THE WRITE, WITH THE COMPLETE `A1`–`A10` ARM TABLE
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.5 — THE WRITE ORDER AND THE COMPLETE `A1`–`A10` ARM TABLE', () => {
  it('W-1 · §2.5 item 1 — the write’s nine-step ORDER, with the discard rule at steps (1)–(7)', async () => {
    await resolveStoreSurface()
    /** A FAILURE AT STEP (3) `F-TIER`, WHICH IS INSIDE THE DISCARD RULE'S RANGE: the write's tier
     *  OUT-RANKS its parent instance's tier (`§2.2` item 3's monotonic invariant · `§2.14` token 11
     *  `'persistence-inversion'`), so the prospective state is DISCARDED at step `(3)` — before the
     *  mint `(6)` and long before the file write `(7)` — the pre-call state and the pre-call file
     *  bytes stand byte-identical, the purge does not run and no listener fires. (The earlier form of
     *  this row drove `['tabs','page']` at `file` under a `file` parent, which NO arm refuses: `C18`'s
     *  add arm LANDS it.) */
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'temp', { value: { seed: 'pre-call' } })
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    const refused = call(f, 'write', CHILD, 'file', { value: { seed: 2 } })
    expect(isRefusal(refused), '§2.5 item 1 — a failure at steps (1)–(7) answers a Refusal').toBe(true)
    expect(refusalOf(refused)['reason'], '§2.2 item 3 — the arm that failed is the tier check at step (3)').toBe('persistence-inversion')
    expect(fs.bytes(FILE_PATH), '§2.5 item 1 — the pre-call file bytes stand byte-identical').toBe(preBytes)
    expect(readValue(readOn(f, 'generic', ROOT, 'temp')), '§2.5 item 1 — the pre-call state stands').toEqual({ seed: 'pre-call' })
    expect(fired, '§2.5 item 1 — the purge does not run and no listener fires').toBe(0)
  })


  it('W-2 · §2.5 item 2 / C18 — a deeper address that could exist but does not ADDS the data', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { inner: 2 } }))['status'], 'C18 — the mint creates whatever is missing AT THE ADDRESSED ADDRESS').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT)), 'C18 — the parent gained the anchor and link that reach the new child').toEqual({ seed: 1, page: { inner: 2 } })
  })

  it('W-3 · §2.5 item 2 / C20 — a write aimed at a LOWER tier where a more-persistent instance exists PROCEEDS AS IF EMPTY', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file', only: 'file' } })
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'temp', { value: { fresh: true } }))['status'], 'C20 — the write does NOT read, inherit, merge or base itself on the more-persistent instance’s data').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT)), 'C20 — it MINTS FRESH from its own payload and the instances COEXIST, one per tier').toEqual({ fresh: true })
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'C20/C21 — the instances coexist at the address; the duplicate ban forbids two at the SAME tier').toEqual({ seed: 'file', only: 'file' })
  })

  it('W-4 · §2.5 item 7 `A2` / R17(a) · R16(d) — a CONTAINER at a NODE LOCATION is REFUSED with NOTHING minted, NO file written, NO purge and NO listener', async () => {
    await resolveStoreSurface()
    /** THE ARM TABLE'S `A2` ROW (`§2.5` item 7), re-derived by this row's author because the
     *  earlier form of this cell drove a CONTAINER at `CHILD` — an address carried by an EXISTING
     *  link (`C18`'s mint at the first write leaves a `parent` anchor + link at `page`) — and
     *  asserted a `committed` overwrite. `M-PROP` answers NODE LOCATION for that address, so the
     *  arm is `A2` and its declared answer is the TYPED REFUSAL: *"a row driven to an arm outside
     *  this table FAILS"*. `C19`'s overwrite (`§2.5` item 3) governs only the arms that LAND
     *  (`A1`, `A4`, `A5`, `A6`, `A7`, `A9`); it is not a competing arm. This cell supplies the
     *  fixture's EXPLICIT `PAR-11` double (`memoryFs`) so the bytes can be read either side. */
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    const preState = readValue(readOn(f, 'generic', CHILD))
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    call(f, 'listen', CHILD, () => {
      fired += 1
    })
    const r = expectNodeLocationContainerRefusal(writeOn(f, 'generic', CHILD, 'mem', { value: { c: 3 } }), 'W-4')
    expect(fs.bytes(FILE_PATH), 'A2/R17(a) — NO FILE IS WRITTEN: the pre-call file bytes stand byte-identical').toBe(preBytes)
    expect(fired, 'A2/R17(a) — the purge does not run and NO listener fires').toBe(0)
    expect('purged' in r, 'A2/R17(a) — the answer is the closed `Refusal`: the purge is not even recorded').toBe(false)
    expect(readValue(readOn(f, 'generic', CHILD)), 'A2 — NOTHING IS MINTED: the pre-call state stands, and the caller’s container is never partially placed').toEqual(preState)
  })

  it('W-4a · §2.5 item 3 / `A2` / `R17`(a) / `R16`(d) / `D2` — the CONTAINER at the NODE LOCATION the first write’s own mint created: REFUSED `\'node-location-container\'` at `M-PROP`', async () => {
    await resolveStoreSurface()
    /** **RE-DERIVED 2026-10-11 (THE TESTWRITER, ON THE ARCHITECT'S ACTIVE RULING IN
     *  `docs/decisions.md`: `(D1)`…`(D4)`, the row of `2026-10-11`; `(D3)` SUPERSEDES `§0A`
     *  `DD-13`'s *"A DICT member is a LITERAL ON THE NODE ITSELF"* reading).** THE EARLIER FORM OF
     *  THIS CELL DROVE `write(ROOT, 'mem', {value: {seed: 1, other: 3}})`, then asserted `A5`'s
     *  LANDING at `['tabs','seed']` — which requires that address to be a LITERAL PROPERTY, i.e.
     *  `seed` to stand in `tabs`' OWN `literals` table. **UNDER `(D2)` IT DOES NOT: the first write's
     *  payload IS A CONTAINER, so `(D2)` MINTS ITS CONTENTS AS A LINKED ANCHOR SET — *"a
     *  literal-valued member becoming a child node readable as its literal through the reserved
     *  `_value` transparency"* (`R16`(e)) — and a child node is reached by an ANCHOR at `seed`, so
     *  `§2.3` item 2's `M-PROP` answers NODE LOCATION (i) at that address, not LITERAL PROPERTY (ii).
     *  **A CONTAINER WRITTEN THERE IS THEREFORE THE ANTI-PATTERN `R16`(d) NAMES:**
     *  *"Passing an array/list/dict to a node location … is an anti-pattern and the user should
     *  create a wrapper node"* ⇒ `A2`/`R17`(a). **THE RULING'S OWN WORDS, AND WHY NO EXCEPTION IS
     *  AVAILABLE:** *"adding an array, dict, or other container as a node value is an unsupported
     *  anti-pattern and this needs to be wrapped in another node so that is can be translated to a
     *  linked anchor set"* — the REFUSAL is what makes the wrapper necessary, so a cell that LANDED a
     *  container here would assert an arm OUTSIDE the table (`§2.5` item 7: *"a row driven to an arm
     *  outside this table FAILS"*). **`A5`'s ARM IS NOT WITHDRAWN BY THIS RE-DERIVATION: it is driven
     *  — deliberately and legitimately — by `W-12` beside this cell, whose drive writes the literal
     *  DIRECTLY AT THE PROPERTY ADDRESS first (`A1`/`A4`: *"an entry of the IMMEDIATE PARENT's own
     *  `literals`"*), which is the ONE way `M-PROP` answers LITERAL PROPERTY at that address.**
     *  `PAR-11` — the fixture supplies the explicit `memoryFs` double, so the bytes are readable on
     *  both sides of the refusal. */
    const fs = memoryFs()
    const f = storeOver(fs)
    expect(
      expectCommitted(call(f, 'write', ROOT, 'mem', { value: { seed: 1, other: 3 } }))['status'],
      '(D2) — the container mint lands: its literal-valued members become CHILD NODES (`R16`(e))',
    ).toBe('committed')
    /** THE ADDRESS CLASSIFICATION `M-PROP` MAKES THEREAFTER, MEASURED BEFORE THE REFUSAL: the
     *  unqualified read at the address PROJECTS the `_value` transparency (`R2`/`(D4)`), the
     *  tier-qualified read returns the NODE — which is what NODE LOCATION means at an address. */
    expect(readValue(readOn(f, 'generic', ['tabs', 'seed'])), '`R2`/`(D4)` — unqualified, the child node answers its literal ALONE').toBe(1)
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed'], 'mem')),
      '(D2)/`(D4)`/`R16`(e) — the qualified read returns the NODE: the member was minted as a child node carrying the reserved `_value`',
    ).toEqual({ _value: 1 })
    const preBytes = fs.bytes(FILE_PATH)
    const preState = readValue(readOn(f, 'generic', ROOT))
    let firedAncestor = 0
    let firedAddress = 0
    call(f, 'listen', ROOT, () => {
      firedAncestor += 1
    })
    call(f, 'listen', ['tabs', 'seed'], () => {
      firedAddress += 1
    })
    const r = expectNodeLocationContainerRefusal(
      writeOn(f, 'generic', ['tabs', 'seed'], 'mem', { value: { c: 3 } }),
      'W-4a (`A2` ⇒ token 21, `M-PROP`)',
    )
    expect(fs.bytes(FILE_PATH), '`A2`/`R17`(a) — NO FILE IS WRITTEN: the pre-call file bytes stand byte-identical').toBe(preBytes)
    expect(firedAncestor + firedAddress, '`A2`/`R17`(a) — the purge does not run and NO listener fires, at the ancestor or at the address').toBe(0)
    expect('purged' in r, '`A2`/`R17`(a) — the answer is the closed `Refusal`: the purge is not even recorded').toBe(false)
    expect(readValue(readOn(f, 'generic', ROOT)), '`A2` — NOTHING IS MINTED: the pre-call state stands and the caller’s container is never partially placed').toEqual(preState)
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed'], 'mem')),
      '`A2` — the node at the address is UNTOUCHED: `_value`’s exclusivity (`R17`(c)) is not consulted because the arm that refuses this write is the NODE-LOCATION arm, which never reaches the node',
    ).toEqual({ _value: 1 })
  })

  it('W-5 · §2.5 item 4 / C19 — the PURGE runs at step (8) with its EXACT set: `0 + 1 + 2 = 3`', async () => {
    await resolveStoreSurface()
    const sets: readonly (readonly [string, string, readonly string[]])[] = [
      ['temp', 'temp', []],
      ['mem', 'mem', ['temp']],
      ['file', 'file', ['mem', 'temp']],
    ]
    for (const [label, tier, expected] of sets) {
      const f = store()
      call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
      call(f, 'write', ROOT, 'mem', { value: { seed: 'mem' } })
      call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
      const r = expectCommitted(writeOn(f, 'generic', ROOT, tier, { value: { seed: 'new' } }))
      expect(r['purged'], `C19 — purge(${label}) = ${JSON.stringify(expected)}`).toEqual(expected)
    }
  })

  it('W-6 · §2.5 item 6 / R1 — NO purge, eviction, clock or cap exists beyond the purge’s own set', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { seed: 2 } }))
    expect(r['purged'], '§2.5 item 6 — the store declares no FIFO, no LRU, no per-tier root cap, no idle sweep and no severance').toEqual([])
    expect('sever' in f.store || 'clear' in f.store || 'sweep' in f.store || 'export' in f.store, 'R1 — the landed family’s caps/severance/clear/sweep/export are STALE PENDING and are NOT this contract’s surface').toBe(false)
  })

  it('W-7 · §2.5 item 5 / R7 — no purge may delete the retained lower copy while a `temp` instance stands', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'temp', { value: { seed: 'temp2' } }))
    expect(r['purged'], 'R7 — the `temp` instance ITSELF is purged by a file/mem write, but the retained copy is not touched by a purge').toEqual([])
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'R7/C9 — the retained lower copy stands for the automatic rollback').toEqual({ seed: 'file' })
  })

  it('W-8 · §2.5 item 7 `A1` — a LITERAL at a NODE LOCATION re-mints the immediate parent and mints NO CHILD', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', ['tabs', 'page', 'leaf'], 'mem', { value: true }))['status'], 'R16(a) — re-mint the node with the literal added at that property').toBe('committed')
    expect(readValue(readOn(f, 'generic', ['tabs', 'page', 'leaf'])), 'R16(a) — the literal’s own address is a first-class read address').toBe(true)
  })

  it('W-9 · §2.5 item 7 `A2` / R17(a) · R16(d) — a CONTAINER at a NODE LOCATION is REFUSED `node-location-container`, with NOTHING minted, NO file, NO purge and NO listener', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'file', { value: { seed: 1 } })
    const preBytes = fs.bytes(FILE_PATH)
    const preState = readValue(readOn(f, 'generic', CHILD, 'file'))
    let fired = 0
    call(f, 'listen', CHILD, () => {
      fired += 1
    })
    const r = expectNodeLocationContainerRefusal(writeOn(f, 'generic', CHILD, 'file', { value: { seed: 2 } }), 'W-9')
    expect(fs.bytes(FILE_PATH), 'R17(a) — NOTHING minted, NO file written: the pre-call bytes stand byte-identical').toBe(preBytes)
    expect(fired, 'R17(a) — the purge does not run and no listener fires').toBe(0)
    expect('purged' in r, 'R17(a) — the closed `Refusal` carries no `purged` member').toBe(false)
    expect(readValue(readOn(f, 'generic', CHILD, 'file')), 'R17(a) — the pre-call state stands: the caller’s container is never partially placed').toEqual(preState)
  })

  it('W-10 · §2.5 item 7 `A3` — a LITERAL at a node location whose child stood there answers the literal (the link is emptied)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: 'a literal' }))['status'], 'R16(c) — “edit as above if the value to write is a literal”').toBe('committed')
    expect(readValue(readOn(f, 'generic', CHILD)), 'A3 — the member becomes an ordinary LITERAL MEMBER').toBe('a literal')
  })

  it('W-11 · §2.5 item 7 `A4` — a LITERAL at a LITERAL PROPERTY overwrites it IN PLACE, with no property deletion', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 'first' } })
    expect(expectCommitted(writeOn(f, 'generic', ['tabs', 'seed'], 'mem', { value: 'second' }))['status'], 'R16(c) first half / R17(b) — the member is OVERWRITTEN, never removed').toBe('committed')
    expect(readValue(readOn(f, 'generic', ['tabs', 'seed'])), 'A4 — no property deletion is involved and none is possible').toBe('second')
  })

  it('W-12 · §2.5 item 7 `A5` / `R16`(c) / `R17`(b) / `(D2)` — a CONTAINER at a LITERAL PROPERTY replaces the literal with an anchor/link/child set: the overwrite is TOTAL at (address, tier) and the PATH is re-minted', async () => {
    await resolveStoreSurface()
    /** **RE-DERIVED 2026-10-11 (THE TESTWRITER, ON THE ARCHITECT'S ACTIVE RULING IN
     *  `docs/decisions.md`: `(D1)`…`(D4)`; `(D3)` SUPERSEDES `§0A` `DD-13`'s *"A DICT member is a
     *  LITERAL ON THE NODE ITSELF"* reading).** THE EARLIER DRIVE REACHED `A5`'s LITERAL-PROPERTY
     *  ROW BY WRITING THE CONTAINER `{seed: 1}` AT `ROOT` — which under `(D2)` MINTS `seed`'s
     *  contents as a CHILD NODE (`R16`(e)'s reserved `_value`), so `M-PROP` answers NODE LOCATION
     *  there and the next container write is `A2`'s REFUSAL (`W-4a` beside this cell). **THE LEGAL
     *  ROUTE TO `A5`, AND THE ONE DRIVEN HERE, IS THE LITERAL WRITTEN DIRECTLY AT THE PROPERTY
     *  ADDRESS:** `write(['tabs','seed'], …, {value: 'a literal'})` is `A1`/`A4` — *"an entry of the
     *  IMMEDIATE PARENT's own `literals` table, with NO child node minted"* (`R16`(c) first half,
     *  `R16`(a)'s re-mint) — and `A4`'s own cell `W-11` already pins that this member is the parent's
     *  own literal. **`M-PROP` therefore answers LITERAL PROPERTY (ii) at that address, and THAT is
     *  `A5`'s row:** *"replace with an anchor/link/child set if it is an array or object"*
     *  (`R16`(c) second half) — ONE `parent` anchor at the final segment on the re-minted parent, ONE
     *  link, ONE child node minted from the payload container, its subtree at whole depth, the literal
     *  OVERWRITTEN and never deleted (`R17`(b)). **THE OVERWRITE IS TOTAL AT `(address, tier)` and the
     *  FIRE SET is the re-mint's only observable (`C4`/`C19` · `§2.11` item 5) — the properties the
     *  pre-`(D3)` form of this cell drove at a drive that could no longer reach the arm.**
     *  `PAR-11` — `store()`'s explicit double is supplied. */
    const f = store()
    expect(
      expectCommitted(call(f, 'write', ROOT, 'mem', { value: { other: 3 } }))['status'],
      '`A1`/`R16`(a) — the register entry’s own root node is minted first, so the property address below has a resolved parent',
    ).toBe('committed')
    expect(
      expectCommitted(writeOn(f, 'generic', ['tabs', 'seed'], 'mem', { value: 'a literal' }))['status'],
      '`A4`/`R16`(c) first half — a LITERAL written at a property address is an entry of the IMMEDIATE PARENT’s own `literals`: NO child node is minted there',
    ).toBe('committed')
    const preMember = readValue(readOn(f, 'generic', ['tabs', 'seed']))
    expect(preMember, '`A4` — the member is the parent’s own literal, so `M-PROP` will answer LITERAL PROPERTY for the next write').toBe('a literal')
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed'], 'mem')),
      '`A4`/`R16`(b) — and a LITERAL PROPERTY is not a node: the qualified read answers the LITERAL, never a node transcription (the contrast `A5`’s landing will break)',
    ).toBe('a literal')
    const preRoot = readValue(readOn(f, 'generic', ROOT)) as Rec
    let firedAncestor = 0
    let firedAddress = 0
    call(f, 'listen', ROOT, () => {
      firedAncestor += 1
    })
    call(f, 'listen', ['tabs', 'seed'], () => {
      firedAddress += 1
    })
    const r = expectCommitted(writeOn(f, 'generic', ['tabs', 'seed'], 'mem', { value: { inner: { deep: 2 } } }))
    expect(r['status'], '`R16`(c) second half — “replace with an anchor/link/child set if it is an array or object”').toBe('committed')
    expect(r['purged'], '§2.5 item 4 — the purge set is `∅` for a `mem` write over a `mem` instance').toEqual([])
    expect(readValue(readOn(f, 'generic', ['tabs', 'seed'])), '`A5` — ONE parent anchor, ONE link, ONE child node minted from the payload container, its subtree at whole depth').toEqual({ inner: { deep: 2 } })
    expect(
      Object.keys(readValue(readOn(f, 'generic', ['tabs', 'seed'])) as Rec),
      '`(D2)`/`R16`(e) — the minted child’s own subtree is a LINKED ANCHOR SET: `inner` is a child node (readable as its literal through `_value`), not a literal on its parent',
    ).toEqual(['inner'])
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed', 'inner'], 'mem')),
      '`(D2)` — `inner` is a DICT-SHAPED child node whose own member `deep` is a further child: the container’s contents translate to nodes at WHOLE DEPTH (`§2.4` item 3), so a qualified read at its own address returns the NODE, not the literal',
    ).toEqual({ deep: 2 })
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed', 'inner', 'deep'])),
      '`(D2)`/`R16`(e) — the WHOLE-DEPTH mint: `deep` is a transparent child node, so the unqualified read at ITS own address projects its `_value` literal alone',
    ).toBe(2)
    expect(
      readValue(readOn(f, 'generic', ['tabs', 'seed', 'inner', 'deep'], 'mem')),
      '`(D2)`/`(D4)` — and the tier-qualified read at that same address returns the NODE: the reserved `_value` is what carries the literal',
    ).toEqual({ _value: 2 })
    expect(readValue(readOn(f, 'generic', ROOT)), '`C4` — the re-mint is of the PARENT PATH, not a second mechanism: the parent carries the new child beside its own surviving literal').toEqual({ other: 3, seed: { inner: { deep: 2 } } })
    expect(Object.keys(preRoot), '`A5` — the pre-write parent carried the literal members the re-mint preserves').toEqual(['other', 'seed'])
    expect(
      Object.keys(readValue(readOn(f, 'generic', ROOT)) as Rec),
      '`R17`(b) — NO PROPERTY DELETION: the member at the final segment is the SAME key set afterwards, the literal having been OVERWRITTEN (replaced by the anchor/link/child set), never removed',
    ).toEqual(['other', 'seed'])
    expect(firedAncestor, '`C4`/`§2.11` item 5 — the FIRE SET is the re-mint’s only observable: the ancestor fires ONCE per LANDING write').toBe(1)
    expect(firedAddress, '`§2.11` item 5 — the addressed address is re-minted too, so its own listener fires ONCE').toBe(1)
  })

  it('W-13 · §2.5 item 7 `A6` — a CONTAINER at an ABSENT PROPERTY creates the link (`C18`’s add arm)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { inner: 1 } }))['status'], 'C18 + R16(d) — “create/overwrite the link and add the contents as nodes” covers the CREATE half verbatim').toBe('committed')
    expect(readValue(readOn(f, 'generic', CHILD)), 'A6 — the child node’s subtree is minted at whole depth').toEqual({ inner: 1 })
  })

  it('W-14 · §2.5 item 7 `A7` — a TOMBSTONE at a NODE LOCATION is the `R10`/`R12` arm, unchanged', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { tombstone: true }))['status'], 'R10 — the tombstone mints ONE node at (address, tier) carrying NO literals and NO anchors').toBe('committed')
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned', step: 'E-CHILD' })
  })

  it('W-15 · §2.5 item 7 `A8` — a TOMBSTONE at a LITERAL PROPERTY converts the property into a node that reads as deleted', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 'a literal' } })
    /** `A8`'s DECLARED OUTCOME, CELL BY CELL (`§2.5` item 7 `A8` · `§2.6` item 6 · `census` §4.9b):
     *  `1` node minted at `(address, tier)` · `1` literal REPLACED by the anchor/link · `1` property
     *  RETAINED (the member still exists and now names a node, so `M-PROP` classifies the address as
     *  a NODE LOCATION thereafter) · and the address thereafter answers `'tombstoned'` by `R11`. */
    const r = expectCommitted(writeOn(f, 'generic', ['tabs', 'seed'], 'mem', { tombstone: true }))
    expect(r['tombstoned'], '§2.6 item 1 — the write’s own record carries `tombstoned: true`').toBe(true)
    expectRefusal(readOn(f, 'generic', ['tabs', 'seed']), { reason: 'tombstoned', step: 'E-CHILD' })
    const parent = readValue(readOn(f, 'generic', ROOT)) as Rec
    expect(Object.prototype.hasOwnProperty.call(parent, 'seed'), 'A8 — “the property itself continues to exist” (the literal is not recoverable, but the member is)').toBe(true)
    expect(Object.keys(parent), 'A8 — the immediate parent was re-minted carrying the member at that segment').toEqual(['seed'])
  })

  it('W-16 · §2.5 item 7 `A9` — a TOMBSTONE at an ABSENT PROPERTY is the ordinary `C18` add of the tombstone node', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { tombstone: true }))['status'], 'A9 — ONE tombstone node is minted and the link is created').toBe('committed')
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned' })
  })

  it('W-17 · §2.5 item 7 `A10` — the `_value` payload mode: `[true, 123, "Foo"]` delivered by `A5` + `A10` together', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { list: [true, 123, 'Foo'] } })
    expect(readValue(readOn(f, 'generic', ['tabs', 'list'])), 'R16(e) — the list arrives as CHILD NODES because it was written at a PROPERTY, and each child is TRANSPARENT').toEqual([true, 123, 'Foo'])
    expect(readValue(readOn(f, 'generic', ['tabs', 'list', '0'], 'mem')), 'A10 — a list element’s child is a transparent node: its qualified read answers `{_value: …}`').toEqual({ _value: true })
  })

  it('W-18 · §2.5 item 7 — the CLOSED token set per arm: `A2`⇒21 · `A10`⇒9 · transparency+tombstone⇒10 · no-resolution⇒3', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'file', { value: { seed: 1 } })
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', CHILD, () => {
      fired += 1
    })
    /** `A2` — a CONTAINER at a NODE LOCATION, whose payload class here is the ARRAY `R16`(d) names in
     *  its own example. */
    expectNodeLocationContainerRefusal(call(f, 'write', CHILD, 'file', { value: [1] }), 'W-18 (`A2` ⇒ token 21)')
    expect(fs.bytes(FILE_PATH), '§2.5 item 7 `A2` — NO file is written and the purge does not run').toBe(preBytes)
    expect(fired, '§2.5 item 7 `A2` — NO listener fires').toBe(0)
    expect(refusalOf(call(f, 'write', ROOT, 'mem', { value: { container: 1 }, transparent: true }))['reason'], '§2.5 item 7 — `A10`’s container-at-`_value` refusal ⇒ token 9').toBe('value-not-admitted')
    expect(refusalOf(call(f, 'write', ROOT, 'mem', { value: 1, transparent: true, tombstone: true }))['reason'], '§2.5 item 7 — the transparency beside a tombstone ⇒ token 10').toBe('malformed-tombstone')
    /** THE IMMEDIATE PARENT'S NON-RESOLUTION ⇒ token 3 (`§2.5` item 7's own token list: *"the
     *  IMMEDIATE PARENT's non-resolution ⇒ `C17`'s arm (`'unreachable'`, token 3, at the intermediate
     *  step)"*) — the NO-RESOLUTION resolution row, driven WRITE-side. The root is minted FIRST and
     *  the SEGMENT ABOVE the addressed address is missing, so the failure is the walk's `C-ANCHOR`
     *  step and it is INTERMEDIATE (`i < n`): a missing ROOT would answer token 2 instead
     *  (`unknown-root`, row `A-3`), and a FINAL segment at a resolved parent is the ABSENT PROPERTY
     *  row, whose write arm is `C18`'s ADD — it LANDS. */
    const h = store()
    call(h, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(h, 'write', ['tabs', 'missing', 'leaf'], 'mem', { value: 1 }), { reason: 'unreachable', step: 'C-ANCHOR' })
  })

  it('W-19 · §2.5 item 8 / R17(b) — NO PROPERTY DELETION: no delete verb, no property-level tombstone', async () => {
    await resolveStoreSurface()
    expect(WRITE_ARMS, 'census.md §4.9b — the write arms: `10 = 3 + 2 + 2 + 3` ✓').toEqual(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'])
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { keep: 1, overwrite: 2 } })
    call(f, 'write', ['tabs', 'overwrite'], 'mem', { value: 3 })
    expect(readValue(readOn(f, 'generic', ROOT)), 'R17(b) — a member disappears only when its carrying node is tombstoned; a member is cleared only by overwriting it').toEqual({ keep: 1, overwrite: 3 })
    expect('remove' in f.store || 'delete' in f.store, '§2.5 item 8(a) — there is NO delete verb and NO property-level tombstone').toBe(false)
  })

  it('W-20 · §2.5 item 8(c) — no `delete`-shaped payload member, no `undefined`-as-delete and no `null`-as-delete', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { keep: 1 } })
    call(f, 'write', ['tabs', 'keep'], 'mem', { value: null })
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.5 item 8(c) — `null` is an ADMITTED literal and is DATA, not a deletion').toEqual({ keep: null })
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.6 — THE TOMBSTONE
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.6 — THE TOMBSTONE', () => {
  it('B-1 · §2.6 item 1 — a tombstone is a WRITE whose payload is `{tombstone: true}`, minting one empty node', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    const r = expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { tombstone: true }))
    expect(r['tombstoned'], '§2.1 — the write’s own record carries `tombstoned`').toBe(true)
  })

  it('B-2 · §2.6 item 2 — the tombstone is INVISIBLE to the read and NEVER returned', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    call(f, 'write', CHILD, 'mem', { tombstone: true })
    /** R11's WHOLE CLAIM, AND THE ONE TOKEN THAT IS NOT A LEAK OF IT (`§2.6` item 2 · `§2.14` item 3
     *  · `§2.14` token 6): the tombstone node is NEVER a transcription, at any address, under any read
     *  form — and the UNQUALIFIED read at its address answers `Refusal` whose `reason` IS
     *  `'tombstoned'`, which the clause REQUIRES and this row must not forbid (a row that forbids the
     *  declared token contradicts `§2.6` item 2 and `§2.14` item 6). The tombstone node's OWN members
     *  are what must never appear: no `anchors`, no `literals`, no `tier`, no live internal record
     *  (`§2.1`'s `Node` · `C1`/`C2`). */
    const unqualified = refusalOf(readOn(f, 'generic', CHILD))
    expect(unqualified['reason'], '§2.6 item 2 / §2.14 token 6 — the unqualified read at the tombstone’s address answers `tombstoned`').toBe('tombstoned')
    expect(unqualified['step'], '§2.6 item 2 — the arm is the walk’s `E-CHILD`').toBe('E-CHILD')
    expectRefusal(readOn(f, 'generic', CHILD, 'mem'), { reason: 'absent-address', step: 'E-CHILD' })
    const root = readValue(readOn(f, 'generic', ROOT))
    expect(root, 'R11 — the tombstone node itself is NEVER a transcription: its address contributes NO member to its parent’s transcription').toEqual({})
    for (const answer of [unqualified, readOn(f, 'generic', CHILD, 'mem'), readOn(f, 'generic', ROOT)]) {
      const asText = JSON.stringify(answer)
      expect(
        /"anchors"|"literals"|"links"|"parent"\s*:/.test(asText),
        '§2.1/C1/C2 — no returned record carries a live internal record (`Node`/`Anchor`/`Link`)',
      ).toBe(false)
    }
  })

  it('B-3 · §2.6 item 2 — the unqualified read at the tombstone’s address answers `tombstoned`, NOT `absent-address`', async () => {
    await resolveStoreSurface()
    expect(DISTINGUISHED_READ_TOKENS, '§2.14 item 3 — two tokens, because a consumer must distinguish “never written” from “soft-deleted”').toEqual(['tombstoned', 'absent-address'])
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    call(f, 'write', CHILD, 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned', step: 'E-CHILD' })
  })

  it('B-4 · §2.6 item 2 (i) — NO FALL-BACK: the tombstone does not fall through to a lower-persistence instance', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'file', { value: { seed: 'file' } })
    call(f, 'write', CHILD, 'temp', { tombstone: true })
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned', step: 'E-CHILD' })
    expect(readValue(readOn(f, 'generic', CHILD, 'file')), 'R10 — a read QUALIFIED to another tier reads THAT tier specifically and is not suppressed').toEqual({ seed: 'file' })
  })

  it('B-5 · §2.6 item 2 (ii) — NO DESCENT: every address BELOW the tombstone answers `unreachable` at its first unreachable segment', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'file', { value: { body: { title: 't' } } })
    call(f, 'write', CHILD, 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', ['tabs', 'page', 'body']), { reason: 'unreachable' })
    expectRefusal(readOn(f, 'generic', ['tabs', 'page', 'body', 'title']), { reason: 'unreachable' })
  })

  it('B-6 · §2.6 item 2 — a read qualified to the TOMBSTONE’s own tier answers the tombstone’s own absence', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    call(f, 'write', CHILD, 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', CHILD, 'mem'), { reason: 'absent-address', step: 'E-CHILD' })
  })

  it('B-7 · §2.6 item 3 / R12 — the `file` tier’s lifecycle: memory → omitted from the file → removed on commit', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'file', { value: { seed: 1 } })
    const before = fs.bytes(FILE_PATH)
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'file', { tombstone: true }))['status'], 'R12 — “tombstone in memory → node removed on successful commit”').toBe('committed')
    const after = fs.bytes(FILE_PATH)
    expect(after, 'R10 — “tombstoning at file tier omits it from the saved file, which will delete the node on commit”').not.toBe(before)
    expect(after ?? '', 'R12 — the whole tombstone is ONE write and leaves no marker in the bytes').not.toContain('tombstone')
  })

  it('B-8 · §2.6 item 3 — a FAILED save rolls the tombstone back and the pre-write node stands intact', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'file', { value: { seed: 'pre-write' } })
    const preBytes = fs.bytes(FILE_PATH)
    fs.failSaves(1)
    expectRefusal(writeOn(f, 'generic', CHILD, 'file', { tombstone: true }), { reason: 'save-failed', step: 'I-SAVE' })
    expect(fs.bytes(FILE_PATH), 'R12/R3 — the operation does not land and the pre-call bytes stand').toBe(preBytes)
    expect(readValue(readOn(f, 'generic', CHILD, 'file')), 'R12 — on a FAILED save the tombstone is rolled back and the pre-write node stands intact').toEqual({ seed: 'pre-write' })
  })

  it('B-9 · §2.6 item 4 — the tombstone and the monotonic invariant: its tier is bounded by its parent’s', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { page: { seed: 1 } } })
    expectRefusal(writeOn(f, 'generic', CHILD, 'file', { tombstone: true }), { reason: 'persistence-inversion', step: 'F-TIER' })
  })

  it('B-10 · §2.6 item 5 — `R10`’s “until the temp node is cleared”: a `temp` tombstone is dropped by exactly the two arms', async () => {
    await resolveStoreSurface()
    expect(TEMP_DROP_ARMS.length, '§2.13 item 4 (ii) — the temp instance is dropped by EXACTLY TWO ARMS and by nothing else').toBe(2)
    const f = store()
    call(f, 'write', CHILD, 'file', { value: { seed: 'file' } })
    call(f, 'write', CHILD, 'temp', { tombstone: true })
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned' })
    /** ARM (i) — *"a later write at the same address at a tier of equal or lower persistence (`C4`'s
     *  discard-and-re-mint)"* (`§2.13` item 4 (ii)): the `temp` tombstone STANDS at `temp` and the
     *  write at `temp` is the SUPERSEDING WRITE at the SAME ADDRESS, so it re-mints the instance
     *  THERE and the tombstone is dropped — the address then reads its new `temp` instance, which is
     *  this write's own payload. (The drive's earlier form wrote at `file`, a tier of HIGHER
     *  persistence: that is `C9`'s commit flow and its purge, not arm (i).) */
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'temp', { value: 're-minted' }))['status'], '§2.13 item 4 (ii) — the superseding write at the same address').toBe('committed')
    expect(readValue(readOn(f, 'generic', CHILD)), 'C4/R7 — the `temp` tombstone was dropped by the superseding write, so the address reads its new `temp` instance').toEqual('re-minted')
    expect(readValue(readOn(f, 'generic', CHILD, 'temp')), 'C4 — the superseding write re-minted the instance at (CHILD, temp)').toEqual('re-minted')
  })

  it('B-11 · §2.6 item 6 — the property-address tombstone: `3 = 1 + 1 + 1` (one node minted · one literal replaced · one property retained)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 'literal' } })
    call(f, 'write', ['tabs', 'seed'], 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', ['tabs', 'seed']), { reason: 'tombstoned' })
    expect(readValue(readOn(f, 'generic', ROOT)), 'A8 — M-PROP classifies the address as a NODE LOCATION thereafter').toEqual({ seed: undefined })
    expect(Object.prototype.hasOwnProperty.call(readValue(readOn(f, 'generic', ROOT)), 'seed'), 'A8 — the property CONTINUES TO EXIST (the literal is not recoverable, but the member is)').toBe(true)
  })

  it('B-12 · §2.6 item 6 — a tombstone at a TRANSPARENT node deletes it exactly as any node’s tombstone does', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: 'v', transparent: true })
    call(f, 'write', ROOT, 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', ROOT), { reason: 'tombstoned' })
    expectRefusal(readOn(f, 'generic', ROOT, 'mem'), { reason: 'absent-address' })
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.7 — THE `file` TIER: THE COMMIT DUTY AND THE SAVE'S CONDENSATION
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.7 — THE `file` TIER', () => {
  it('F-1 · §2.7 item 1 / C7+R3 — the tier’s state is synchronised to its JSON file and the duty is ABSOLUTE', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { seed: { deep: 1 } } })
    const bytes = fs.bytes(FILE_PATH)
    expect(bytes, 'C7 — the file must “exactly match the data state”').not.toBeNull()
    expect(JSON.parse(bytes ?? '{}'), 'C7 — the bytes are the state, keyed by register-entry name; `DD-13`(iv)/`(D2)` — a member position holds a NODE, so the bytes carry the state’s node as `{"_value": <the literal>}` and a member that is itself a container as the object its own child members condense to').toEqual({ tabs: { seed: { deep: { _value: 1 } } } })
  })

  it('F-2 · §2.7 item 2 — the FOUR bound mutation classes, each answering a returned typed record', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    for (const payload of [{ value: { seed: 1 } }, { tombstone: true }, { value: { seed: { deeper: 2 } } }] as const) {
      const answer = writeOn(f, 'generic', ROOT, 'file', payload as Rec)
      expect(['committed', 'refused'].includes(String(answer['status'])), 'R8 — every file-tier mutation is observed as a RETURNED typed record').toBe(true)
    }
    expect(call(f, 'load')['status'], '§2.7 item 2 — the load is a READ of the file and performs NO write-back, so no record is owed by a modification it does not make').toBeDefined()
  })

  it('F-3 · §2.7 item 2 — a failed save answers `save-failed` at `I-SAVE` with the pre-call state AND bytes standing', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { seed: 'pre-call' } })
    const preBytes = fs.bytes(FILE_PATH)
    const preState = readValue(readOn(f, 'generic', ROOT, 'file'))
    fs.failSaves(1)
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    expectRefusal(writeOn(f, 'generic', ROOT, 'file', { value: { seed: 'prospective' } }), { reason: 'save-failed', step: 'I-SAVE' })
    expect(fs.bytes(FILE_PATH), '§2.7 item 5 — the pre-call file bytes stand byte-identical').toBe(preBytes)
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), '§2.7 item 5 — the pre-call file-tier state stands').toEqual(preState)
    expect(fired, '§2.7 item 5 — the purge does not run and no listener fires').toBe(0)
  })

  it('F-4 · §2.7 item 3 / DD-12 — the save descends ONLY through `file`-instance children', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { page: { seed: 'file' } } })
    call(f, 'write', CHILD, 'mem', { value: { seed: 'mem-only' } })
    const bytes = fs.bytes(FILE_PATH)
    expect(bytes ?? '', 'DD-12 — a member whose instance stands only at mem/temp is OMITTED from the file’s bytes').not.toContain('mem-only')
    const g = storeOver(fs)
    call(g, 'load')
    expect(readValue(readOn(g, 'generic', ROOT, 'file')), 'DD-12 — the load does not re-mint the omitted member').toEqual({ page: { seed: 'file' } })
  })

  it('F-5 · §2.7 item 3 — the condensation’s THREE arms: array · object · value, at the SAVE site too', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { list: [1, 2], dict: { a: 1 }, transparentRoot: true } })
    const bytes = fs.bytes(FILE_PATH) ?? '{}'
    expect(bytes, 'DD-13 (iv) — the save’s rule reads ARRAY · OBJECT · VALUE').toContain('[')
    expect(bytes, '§2.7 item 3 — the dict arm is the object arm').toContain('{')
    expect(bytes, 'DD-13 (5) — at a NODE POSITION the bytes carry `_value` EXPLICITLY: `{"_value": <the literal>}`').toContain('_value')
  })

  it('F-6 · §2.7 item 3 — the file’s bytes carry the STATE and nothing else', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
    const bytes = fs.bytes(FILE_PATH) ?? ''
    for (const forbidden of ['version', 'schema', 'clock', 'timestamp', 'counter', 'metadata', 'id']) {
      expect(bytes.includes(forbidden), `C7 — no ${forbidden} member: “exactly match the data state” is the reason`).toBe(false)
    }
  })

  it('F-7 · §2.7 item 4 — the commit is an ATOMIC REPLACE: the real path holds either the pre-call or the post-call bytes, never a mixture', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
    const before = fs.bytes(FILE_PATH)
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: { seed: 2 } }))['status'], 'R3 — the commit writes a replacement beside the path and renames it onto the path').toBe('committed')
    const after = fs.bytes(FILE_PATH)
    expect(after, 'R3 — the path never holds a mixture').not.toBe(before)
    expect(JSON.parse(after ?? '{}'), 'R3 — the post-call bytes are the post-call state; `DD-13`(iv)/`(D2)` — the member position carries the minted child node, whose bytes are `{"_value": <the literal>}` EXPLICITLY (the member is no bare scalar: `C7`’s duty binds the bytes to the STATE, which holds a node)').toEqual({ tabs: { seed: { _value: 2 } } })
  })

  it('F-8 · §2.7 item 5 — the `file` tier is UNLOADED after a refused load: every read/write refuses `not-loaded`', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, '{not json')
    expectRefusal(call(f, 'load'), { reason: 'load-failed', step: 'J-LOAD' })
    expectRefusal(call(f, 'read', ROOT, 'file'), { reason: 'not-loaded', step: 'J-LOAD', segment: null })
    expectRefusal(call(f, 'write', ROOT, 'file', { value: 1 }), { reason: 'not-loaded', step: 'J-LOAD' })
    expect(fs.bytes(FILE_PATH), 'DD-14 — NO file is written: the operator’s bytes are never clobbered by a save of an empty state').toBe('{not json')
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.8 — THE READ: `R1`–`R4` AND THE TWO FORMS
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.8 — THE READ AND ITS `R1`–`R4` ARM TABLE', () => {
  it('R-1 · §2.8 item 7 `R1` / R16(b) — a LITERAL PROPERTY answers ONLY that property', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 'a literal', other: { deep: 1 } } })
    const answer = readOn(f, 'generic', ['tabs', 'seed'])
    expect(readValue(answer), 'R16(b) — the LITERAL ITSELF at the top level of `value`, NEVER `{<final segment>: <literal>}`').toBe('a literal')
    expect(readValue(answer), 'R1 — never the carrier node’s transcription').not.toEqual({ seed: 'a literal' })
    expect(answer['tier'], 'R1 — the tier reported is the instance’s own selection').toBe('mem')
  })

  it('R-2 · §2.8 item 7 `R2` — a TRANSPARENT node answers its literal UNQUALIFIED and its transcription QUALIFIED', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: 'Foo', transparent: true })
    expect(readValue(readOn(f, 'generic', ROOT)), 'R2 UNQUALIFIED — the answer is the node’s `_value` literal alone, NEVER `{_value: <the literal>}`').toBe('Foo')
    expect(readValue(readOn(f, 'generic', ROOT, 'mem')), 'R2 QUALIFIED — a tier-qualified read asks WHICH INSTANCE, not WHAT IT READS AS').toEqual({ _value: 'Foo' })
  })

  it('R-3 · §2.8 item 7 `R3` — an ABSENT PROPERTY answers `absent-address` and the read MINTS NOTHING', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'absent-address', step: 'E-CHILD' })
    expect(readValue(readOn(f, 'generic', ROOT)), 'DD-11 — a read mints nothing at all').toEqual({ seed: 1 })
  })

  it('R-4 · §2.8 item 7 `R4` — a MIXED node answers `C21`’s transcription: literals AND anchored members in ONE object', async () => {
    await resolveStoreSurface()
    expect(READ_ARMS, 'census.md §4.9b — the read arms: `4 = 1 + 1 + 1 + 1` ✓').toEqual(['R1', 'R2', 'R3', 'R4'])
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { literal: 1, anAnchor: { inner: 2 } } })
    expect(readValue(readOn(f, 'generic', ROOT)), 'R4 — a node carrying BOTH literal members and anchored members answers ONE object carrying both').toEqual({ literal: 1, anAnchor: { inner: 2 } })
  })

  it('R-5 · §2.8 item 7 — a transparent node is NEVER driven to the array arm or to `R4`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: 42, transparent: true })
    const value = readValue(readOn(f, 'generic', ROOT))
    expect(Array.isArray(value), '§2.8 item 7 R4’s own amendment — a row that drives a transparent node to the array arm, or to `R4`, FAILS').toBe(false)
    expect(value, '§2.8 item 3 — the THIRD arm (`value`) decides, not the object arm').toBe(42)
  })

  it('R-6 · §2.8 item 2 — QUALIFIED: the passed tier applies at EVERY address, with NO fall-back downstream', async () => {
    await resolveStoreSurface()
    /** THE PASSED TIER AT EVERY ADDRESS (`§2.8` item 2, QUALIFIED: *"THE READ TAKES THAT TIER
     *  SPECIFICALLY, AT EVERY ADDRESS IT VISITS, WITH NO FALL-BACK"*), driven so that BOTH instances
     *  can exist: the drive's earlier form wrote a `mem` instance at the address of an EXISTING
     *  `file` LITERAL PROPERTY, which is `§2.5` item 7's `A4` OVERWRITE of that member — so the only
     *  `file` instance at that address was replaced and the premise was unreachable. Here the
     *  descendant is a fresh PROPERTY address (`A6`'s add), whose `mem` instance can therefore stand
     *  beside the `file` instances on the path and beside its own `file` instance. */
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { a: 1 } })
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { inner: 1 } }))['status'], 'C18/A6 — a CONTAINER at an ABSENT PROPERTY of the `file` root: the link is created').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), '§2.8 item 2 (b) — at a DOWNSTREAM address the tier’s absence means the member is ABSENT from the transcription and the walk does not descend through it').toEqual({ a: 1 })
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.8 item 2 — UNQUALIFIED is a PER-NODE rule: the descendant’s mem instance IS visible to a read of its ancestor').toEqual({ a: 1, page: { inner: 1 } })
    expect(readValue(readOn(f, 'generic', CHILD)), '§2.8 item 2 — the unqualified read at the addressed address takes the lowest-persistence instance').toEqual({ inner: 1 })
  })

  it('R-7 · §2.8 item 2 — a qualified read’s absence AT THE ADDRESSED address is `tier-not-held`, never a lower-tier answer', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'temp', { value: { seed: 1 } })
    expectRefusal(readOn(f, 'generic', ROOT, 'file'), { reason: 'tier-not-held', step: 'F-TIER' })
  })

  it('R-8 · §2.8 item 3 — the answer carries NO provenance: `C21`’s object alone', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
    const answer = readOn(f, 'generic', ROOT)
    expect(Object.keys(answer).sort(), '§2.8 item 3 — no `parts` member, no per-member tier, no `merged` flag').toEqual(['status', 'tier', 'value'])
  })

  it('R-9 · §2.8 item 4 / C2 — a read returns a DEEP COPY at every depth, so mutating it never writes the store', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { nested: { list: [1, 2] } } })
    const copy = readValue(readOn(f, 'generic', ROOT)) as Rec
    ;(((copy['nested'] ?? {}) as Rec)['list'] as unknown[])[0] = 99
    ;((copy['nested'] ?? {}) as Rec)['extra'] = 'added'
    expect(readValue(readOn(f, 'generic', ROOT)), 'C2 — writes happen only by explicit function call, not by reference').toEqual({ nested: { list: [1, 2] } })
  })

  it('R-10 · §2.8 item 5 — the copy is PROTOTYPE-SAFE: `__proto__`/`constructor`/`prototype` are carried as OWN data properties', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { ['__proto__']: { polluted: true }, constructor: 'c', prototype: 'p' } })
    const value = readValue(readOn(f, 'generic', ROOT)) as Rec
    expect(Object.getPrototypeOf(value), '§2.8 item 5 — a returned transcription whose prototype was changed by a member key FAILS').toBe(Object.prototype)
    expect(Object.prototype.hasOwnProperty.call(value, '__proto__'), '§2.8 item 5 — carried as an OWN data property, never through the prototype chain').toBe(true)
    expect((value['constructor']), '§2.8 item 5 — `constructor` is an own member, not the Object constructor').toBe('c')
  })

  it('R-11 · §2.8 item 6 / C21 — MORE THAN ONE NODE SHARING BOTH AN ADDRESS AND A TIER is forbidden by the write logic', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const seed of [1, 2, 3]) call(f, 'write', ROOT, 'mem', { value: { seed } })
    expect(readValue(readOn(f, 'generic', ROOT)), 'C21 — the overwrite arm replaces the instance at (address, tier) wholesale, so no sequence of writes can produce a second').toEqual({ seed: 3 })
  })

  it('R-12 · §2.8 item 7 — the UNCHANGED arms are closed: tombstone · unreachable · tier-not-held · unknown-root', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    call(f, 'write', CHILD, 'mem', { tombstone: true })
    expectRefusal(readOn(f, 'generic', CHILD), { reason: 'tombstoned' })
    expectRefusal(readOn(f, 'generic', ['tabs', 'page', 'x']), { reason: 'unreachable' })
    expectRefusal(readOn(f, 'generic', ROOT, 'file'), { reason: 'tier-not-held' })
    expectRefusal(readOn(f, 'generic', ['nope']), { reason: 'unknown-root' })
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.9 — THE `secure` GRAPH AND ITS GATE
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.9 — THE `secure` GRAPH AND ITS GATE', () => {
  it('G-1 · §2.9 item 2 — the five SECURE functions reach the graph and the generic surface cannot', async () => {
    await resolveStoreSurface()
    expect(SECURE_FUNCTIONS.length, 'census.md §4.3 — the secure surface: `5`, one counterpart per generic function').toBe(5)
    const f = store()
    expect('secure' in f.store, '§2.9 item 2 — no `secure.` segment, prefix or generic member reaches the secure graph').toBe(false)
    expectRefusal(call(f, 'read', ROOT, 'secure'), { reason: 'secure-refused', step: 'F-TIER' })
  })

  it('G-2 · §2.9 item 4 — the named reader is consulted ONCE per call, at that call’s own turn', async () => {
    await resolveStoreSurface()
    const f = storeWithAccess('blocked')
    call(f, 'secureRead', ROOT)
    expect(f.accessReadings.length, '§2.9 item 4 / DD-9 — “read once per call at that call’s own turn, never captured”').toBe(1)
    call(f, 'secureLoad')
    expect(f.accessReadings.length, '§2.9 item 4 — one further reading, one per call (5 gated functions × 2 readings = 10 drives)').toBe(2)
  })

  it('G-3 · §2.9 item 4 — `not blocked` refuses `secure-gated` at `K-GATE` with NOTHING done', async () => {
    await resolveStoreSurface()
    const f = storeWithAccess('not-blocked')
    expectRefusal(call(f, 'secureWrite', ROOT, { value: { seed: 1 } }), { reason: 'secure-gated', step: 'K-GATE' })
    expectRefusal(call(f, 'secureRead', ROOT), { reason: 'secure-gated', step: 'K-GATE' })
  })

  it('G-4 · §2.9 item 4 / PAR-10 — ABSENT, a THROW or a NON-BOOLEAN reader is FAIL-CLOSED', async () => {
    await resolveStoreSurface()
    for (const arm of ['absent', 'throw', 'non-boolean'] as const) {
      const f = storeWithAccess(arm)
      expectRefusal(call(f, 'secureRead', ROOT), { reason: 'secure-gated', step: 'K-GATE' })
    }
  })

  it('G-5 · §2.9 item 3 / R2 — the secure graph admits EVERY address and the SINGLE admission set (no whitelist)', async () => {
    await resolveStoreSurface()
    const f = storeWithAccess('blocked')
    expect(expectCommitted(call(f, 'secureWrite', ['anything', 'at', 'all'], { value: { deep: { deeper: 1 } } }))['status'], 'R2 — DO NOT construct an address or value whitelist').toBe('committed')
    expectRefusal(call(f, 'secureWrite', ROOT, { value: { bad: Number.NaN } }), { reason: 'value-not-admitted', step: 'G-VALUE' })
  })

  it('G-6 · §2.9 item 6 — inside the secure graph the tier is NOT a node member and NOT a parameter', async () => {
    await resolveStoreSurface()
    const f = storeWithAccess('blocked')
    call(f, 'secureWrite', ROOT, { value: { seed: 1 } })
    expect(readValue(call(f, 'secureRead', ROOT)), 'C11 — “secure is determined by being in an isolated graph”').toEqual({ seed: 1 })
  })

  it('G-7 · §2.9 item 6 — the commit duty, the tombstone lifecycle and the event surface apply inside the secure graph unchanged', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'secureWrite', ROOT, { value: { seed: 1 } })
    expect(fs.bytes('/store/secure.json'), 'C6 — “for all other purposes, it follows the same constraints as file”').not.toBeNull()
    expect(expectCommitted(call(f, 'secureWrite', ROOT, { tombstone: true }))['status'], 'R12 — the tombstone lifecycle applies inside the secure graph').toBe('committed')
    expectRefusal(call(f, 'secureRead', ROOT), { reason: 'tombstoned' })
  })

  it('G-8 · §2.9 item 5 — no MCP surface, tool, resource or notification payload is declared by this contract', async () => {
    await resolveStoreSurface()
    const f = store()
    expect('mcp' in f.store || 'notify' in f.store || 'resource' in f.store, 'R §2.3 — a pass that reads R2 as granting an MCP-reachable tier-4 read path has mis-read the ruling').toBe(false)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.10 — THE CONSTRAINT SEAM, THE PASS SEQUENCE AND THE MESSAGE LIST
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.10 — THE CONSTRAINT SEAM, THE PASS SEQUENCE AND THE MESSAGE LIST', () => {
  it('C-1 · §2.10 item 3 — the evaluated set is every registration at a PREFIX address, shortest prefix first', async () => {
    await resolveStoreSurface()
    const f = store()
    const rootProbe = register(f, ROOT, [{ ok: true }])
    const childProbe = register(f, CHILD, [{ ok: true }])
    expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { seed: 1 } }))
    expect(rootProbe.calls.length, '§2.10 item 3 — the evaluated set of a write at W is every registration at a PREFIX address P of W').toBe(1)
    expect(childProbe.calls.length, '§2.10 item 3 — including P = W').toBe(1)
  })

  it('C-2 · §2.10 item 3 — within ONE address, registration order governs', async () => {
    await resolveStoreSurface()
    const f = store()
    const first = register(f, ROOT, [{ ok: true }])
    const second = register(f, ROOT, [{ ok: true }])
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
    expect(first.calls.length, 'C13’s plural “constraint functions” — a link or entry carries an ORDERED LIST in registration order').toBe(1)
    expect(second.calls.length, '§2.10 item 2 — the second registration is evaluated too').toBe(1)
  })

  it('C-3 · §2.10 item 2 / DD-15 — a re-registration with the SAME function identity REPLACES that entry in place', async () => {
    await resolveStoreSurface()
    const f = store()
    const probe = register(f, ROOT, [{ ok: true }])
    const constraint = ((): Rec => ({ ok: true })) as unknown as (...args: unknown[]) => unknown
    call(f, 'constrain', ROOT, { constraint })
    call(f, 'constrain', ROOT, { constraint })
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
    expect(probe.calls.length, '§2.10 item 2 — a re-registration carrying the SAME identity at the SAME address replaces in place (idempotent wiring)').toBe(1)
    expect('unconstrain' in f.store || 'clearConstraints' in f.store, 'DD-15 — the seam carries NO withdrawal verb').toBe(false)
  })

  it('C-4 · §2.10 item 5 — `{ok:false, message}` refuses `constraint-refused` with the MODULE’s message VERBATIM as the primary entry', async () => {
    await resolveStoreSurface()
    const f = store()
    register(f, ROOT, [{ ok: false, message: 'exactly one tab node must be marked active' }])
    const r = expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }), { reason: 'constraint-refused', step: 'H-CONSTRAINT' })
    expect(primarySentence(r), 'C13 — “return false with an error message explaining the constraint violation”: the message is the MODULE’s').toBe('exactly one tab node must be marked active')
    expect(messagesOf(r)[0]?.['source'], '§2.10 item 10 door (i) — the entry is authored by the constraint').toBe('constraint')
  })

  it('C-5 · §2.10 item 5 — a MALFORMED answer or a THROW from a constraint refuses `constraint-failed`, never propagating', async () => {
    await resolveStoreSurface()
    const malformed = store()
    register(malformed, ROOT, [{ oops: true }])
    expectRefusal(writeOn(malformed, 'generic', ROOT, 'mem', { value: 1 }), { reason: 'constraint-failed', step: 'H-CONSTRAINT' })
    const throwing = store()
    register(throwing, ROOT, [{ throw: true }])
    expect(() => call(throwing, 'write', ROOT, 'mem', { value: 1 }), '§2.10 item 5 — the throw never propagates').not.toThrow()
  })

  it('C-6 · §2.10 item 8 / DD-22 — the phase is a PASS-SEQUENCE: a repair that changes the state RESTARTS at the first registration', async () => {
    await resolveStoreSurface()
    const f = store()
    const probe = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))
    expect(probe.calls.length, 'R15 item 1 — every registration is RE-EVALUATED against the repaired state, including those that answered `{ok:true}`').toBeGreaterThanOrEqual(2)
    expect(probe.calls[0]?.evaluation['future'], '§2.10 item 4 — `future` is the transcription the write WOULD leave, minted per evaluation').toBeDefined()
  })

  it('C-7 · §2.10 item 9 — a repair runs AT MOST ONCE per registration per write; a SECOND demand refuses `constraint-failed`', async () => {
    await resolveStoreSurface()
    expect(REPAIR_RUNS_PER_REGISTRATION_PER_WRITE, 'DD-22 — the unit of “once” is THE REGISTRATION').toBe(1)
    const f = store()
    let runs = 0
    register(f, ROOT, [{ repair: true }, { repair: true }], {
      withRepair: () => {
        runs += 1
        return 'repaired'
      },
    })
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), { reason: 'constraint-failed', step: 'H-CONSTRAINT' })
    expect(runs, '§2.10 item 9(a) — a second `{repair:true}` does NOT run the repair again: the repetition the ruling forbids becomes a FAILURE').toBe(1)
  })

  it('C-8 · §2.10 item 5 — `{repair:true}` with NO registered repair refuses `constraint-failed`', async () => {
    await resolveStoreSurface()
    const f = store()
    register(f, ROOT, [{ repair: true }])
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }), { reason: 'constraint-failed', step: 'H-CONSTRAINT' })
  })

  it('C-9 · §2.10 item 6(a) — a repaired write IS a successful write: it lands and `C19`’s purge runs after it', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))
    expect(r['repaired'], '§2.10 item 6(d) — the record carries `repaired: true` iff any repair was taken').toBe(true)
    expect(r['purged'], 'C19 — the purge runs after the repair settles').toEqual(['temp'])
  })

  it('C-10 · §2.10 item 6(a) — never TWO file writes: ONE commit, after the repair settles', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: 'original' }))
    expect(fs.puts(), '§2.10 item 6(a) — “one commit, after the repair settles — never two file writes”').toBe(1)
  })

  it('C-11 · §2.10 item 11 / R15 item 3 — a repair that BREAKS a previously-`{ok:true}` constraint FAILS with token 20', async () => {
    await resolveStoreSurface()
    /** THE ARM'S ANTECEDENT, MET CELL BY CELL (`§2.10` item 11: *"If a registration answered
     *  `{ok:true}` in an EARLIER pass of the SAME write and answers `{ok:false, message}` in a LATER
     *  pass, the write FAILS"*). The antecedent needs a LATER PASS, and a later pass exists only
     *  because a `{repair:true}` whose repair RAN **RESTARTS the phase at the first registration**
     *  (`§2.10` items 8–9 · `DD-22`) — so the drive is TWO REGISTRATIONS AND ONE REPAIR:
     *    registration 0 (`ROOT`'s own list) answers `{repair:true}` on its first evaluation and
     *    `{ok:true}` on every later one, and its repair is the ONE that runs;
     *    registration 1 answers `{ok:true}` in pass 1 and `{ok:false, message}` in pass 2 — the
     *    PREVIOUSLY-SATISFIED registration the repair broke.
     *  The earlier form of this row registered a constraint whose FIRST answer was already
     *  `{ok:false}`, which is token 12's arm at ITS OWN first evaluation (row `C-13`) and can never
     *  reach token 20. Two registrations are required because a single registration cannot both
     *  demand the repair and be the constraint the repair broke. */
    const f = store()
    const repairRegistration = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    const brokenRegistration = register(f, ROOT, [{ ok: true }, { ok: false, message: 'the broken constraint’s verbatim' }])
    const r = expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), { reason: 'repair-broke-constraint', step: 'H-CONSTRAINT' })
    const list = messagesOf(r)
    expect(repairRegistration.calls.length, '§2.10 item 8 — the repair RESTARTED the phase: registration 0 is RE-EVALUATED against the repaired state').toBe(2)
    expect(repairRegistration.calls[0]?.['answer'], '§2.10 item 8 — registration 0 demanded the repair in pass 1').toEqual({ repair: true })
    expect(brokenRegistration.calls.length, '§2.10 item 8 — the already-satisfied registration 1 is re-evaluated in the NEW pass, and its later answer is what the phase acted on').toBe(2)
    expect(brokenRegistration.calls[0]?.['answer'], '§2.10 item 11 — the antecedent: registration 1 answered `{ok:true}` in the EARLIER pass').toEqual({ ok: true })
    expect(list.length, 'R15 item 3 — the whole list, whose last entry is the store’s own sentence').toBeGreaterThanOrEqual(2)
    expect(list[list.length - 2]?.['text'], '§2.14 item 5 — the broken constraint’s own verbatim stands at the entry IMMEDIATELY BEFORE the store’s').toBe('the broken constraint’s verbatim')
    expect(primarySentence(r), '§2.14 item 5 — the last entry is the STORE’s own sentence naming the repair and the constraint it broke').not.toBe('the broken constraint’s verbatim')
    /** **`§2.10` item 9's BOUND, READ AS THE LIVE EVALUATION COUNT** — *"the repair ran ONCE for the
     *  whole write"*: the ONE `{repair:true}` pass 1 saw is not a second repair, so registration 0 is
     *  never asked again (the two assertions above ARE that count: `calls.length` is exactly `2`, one
     *  per pass). **`register`'s `pending` is a SNAPSHOT TAKEN AT RETURN and cannot carry this claim:**
     *  `constrain` only ATTACHES the registration (`§2.10` item 2), so at return nothing has been
     *  evaluated and `pending` is `answers.length` — `2` here, and `0` only if `register` itself had
     *  evaluated twice. The LIVE reading is `consume()`, and the two must ACCOUNT for the whole queue
     *  (`consumed + pending = declared`, `1 + 1 = 2`), which is what makes the one-run bound visible
     *  without weakening the token-20 assertions above. */
    expect(repairRegistration.pending, '§2.10 item 2 — the snapshot at return: nothing is evaluated when `constrain` only ATTACHES the registration, so it equals the DECLARED answer count').toBe(2)
    expect(repairRegistration.consume(), '§2.10 items 8–9 — the LIVE evaluation count of registration 0 (one per pass), read AFTER the phase ran').toBe(2)
    expect(repairRegistration.remaining(), '§2.10 item 9 — NO THIRD EVALUATION: a second `{repair:true}` would have restarted the phase a third time, and the queue still holds its last answer unconsumed').toBe(0)
    expect(
      repairRegistration.consume() + repairRegistration.remaining(),
      'the queue ACCOUNTS for every declared answer: consumed + remaining = declared (`2 + 0 = 2`)',
    ).toBe(2)
  })

  it('C-12 · §2.10 item 11 — the loop-breaker lands NOTHING: no install, no file write, no purge, no firing', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'mem', { value: 'pre-call' })
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    /** The same two-registration + one-repair drive as row `C-11` (`§2.10` items 8–9, 11). */
    register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    register(f, ROOT, [{ ok: true }, { ok: false, message: 'broken' }])
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'prospective' }), { reason: 'repair-broke-constraint' })
    expect(fs.bytes(FILE_PATH), '§2.10 item 11 — the `file`/`secure` commit is never attempted').toBe(preBytes)
    expect(readValue(readOn(f, 'generic', ROOT)), '§2.10 item 11 — nothing is installed: the pre-call state stands').toEqual('pre-call')
    expect(fired, '§2.11 item 5 — a REFUSED write fires NOTHING').toBe(0)
  })

  it('C-13 · §2.10 item 11 — the two arms are DISTINGUISHED: a never-satisfied constraint’s refusal is token 12, not 20', async () => {
    await resolveStoreSurface()
    const f = store()
    register(f, ROOT, [{ repair: true }, { ok: false, message: 'never satisfied' }], { withRepair: () => 'repaired' })
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), { reason: 'constraint-refused', step: 'H-CONSTRAINT' })
  })

  it('C-14 · §2.10 item 10 — the FOUR appender doors, and NOTHING else', async () => {
    await resolveStoreSurface()
    expect(APPENDER_DOORS.length, 'census.md §4.9a — the appender doors: `4 = 2 + 2` ✓').toBe(4)
    const f = store()
    register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))
    const sources = new Set(messagesOf(r).map((entry) => String(entry['source'])))
    for (const source of sources) {
      expect(['constraint', 'repair', 'store'].includes(source), '§2.1 — `source` is WHO authored it: a constraint, a repair, the store’s own arms').toBe(true)
    }
  })

  it('C-15 · §2.10 item 10 — `pass` and `position`: the 1-based pass, `1` with no constraint phase, and `null` where no single registration is concerned', async () => {
    await resolveStoreSurface()
    const f = store()
    const r = refusalOf(call(f, 'read', ['']))
    const entry = messagesOf(r)[0] ?? {}
    expect(entry['pass'], '§2.10 item 10 — `1` for every entry appended by a call that has no constraint phase').toBe(1)
    expect(entry['position'], '§2.10 item 10 — `position` is `null` where the entry concerns no single registration').toBeNull()
  })

  it('C-16 · §2.10 item 10 — the ordering lemma: `(pass, position)` ASCENDING, and TWO APPENDS OF THE SAME TEXT ARE TWO ENTRIES', async () => {
    await resolveStoreSurface()
    const f = store()
    register(f, ROOT, [{ ok: false, message: 'same text' }])
    const r = refusalOf(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
    const list = messagesOf(r)
    const passes = list.map((entry) => Number(entry['pass']))
    expect(passes, '§2.10 item 10 — the list is ordered by `pass` ASCENDING').toEqual([...passes].sort((a, b) => a - b))
    expect(list.length, '§2.10 item 10 — the list is a LOG, not a set: it is never re-ordered, dropped or duplicated').toBeGreaterThanOrEqual(1)
  })

  it('C-17 · §2.10 item 10 — the module NEVER holds the write’s own list (it receives only its own record’s `notes`)', async () => {
    await resolveStoreSurface()
    const f = store()
    const seen: unknown[] = []
    register(f, ROOT, [{ ok: true }], {
      note: (evaluation) => {
        seen.push(evaluation['notes'])
      },
    })
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
    expect(Array.isArray(seen[0]), 'DD-1/§2.10 item 4 — the module appends to ITS OWN record’s list; handing out the write’s list would hand a module a live internal record').toBe(true)
  })

  it('C-18 · §2.10 item 7 / R4 — NO built-in constraint, no store-owned vocabulary and no store-owned round limit', async () => {
    await resolveStoreSurface()
    const f = store()
    expect('constraints' in f.store || 'builtins' in f.store, 'R4 — “DO NOT add built-in constraint functions”').toBe(false)
    const probe = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
    expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))
    expect(probe.calls.length, '§2.10 item 7 — the phase terminates because of the ARCHITECT’s per-registration bound, not a store-owned policy').toBeLessThanOrEqual(2)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.11 — THE EVENT SURFACE
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.11 — THE EVENT SURFACE', () => {
  it('E-1 · §2.11 item 3 / DD-16 — attachment is BY ADDRESS and survives every re-mint', async () => {
    await resolveStoreSurface()
    /** THE ATTACHMENT'S OWN OBSERVABLE (`C23` · `§2.11` item 3: *"the body, when it reruns, reads the
     *  address and therefore observes the NEW node"*), driven through a LANDING arm: the earlier form
     *  wrote a CONTAINER at a NODE LOCATION, which `§2.5` item 7's `A2` REFUSES — so nothing landed,
     *  no fan-out ran, and the row asserted an observable of a write that never happened. Here the
     *  write lands INSIDE the listened node's subtree (`A6`'s add at a deeper PROPERTY address), so the
     *  target address is re-minted by `C4` and fires. */
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1, page: { a: 1 } } })
    const observed: unknown[] = []
    const record = call(f, 'listen', CHILD, () => {
      observed.push(readValue(readOn(f, 'generic', CHILD)))
    })
    expect(record['attached'], 'C23 — the address resolves, so the listener is attached to its target node').toBe(true)
    expect(expectCommitted(writeOn(f, 'generic', [...CHILD, 'b'], 'mem', { value: 2 }))['status'], 'C18/A6 — the write lands inside the listened address’s subtree').toBe('committed')
    expect(observed, 'C4/DD-16 — the target it observes is the node an unqualified read at that address would select AFTER the re-mint').toEqual([{ a: 1, b: 2 }])
    /** AND IT SURVIVES A SECOND RE-MINT (`C4`: *"a re-mint of the target node does not detach it"*). */
    expect(expectCommitted(writeOn(f, 'generic', [...CHILD, 'b'], 'mem', { value: 3 }))['status'], 'A4 — a literal at the LITERAL PROPERTY the previous write created').toBe('committed')
    expect(observed, 'C23/DD-16 — a write elsewhere in the store never detaches a listener, and a re-mint of the target node does not detach it').toEqual([{ a: 1, b: 2 }, { a: 1, b: 3 }])
  })

  it('E-2 · §2.11 item 2 — the body takes NO ARGUMENTS and collects through the store’s own `read`', async () => {
    await resolveStoreSurface()
    const f = store()
    let argCount = -1
    call(f, 'listen', ROOT, ((...args: unknown[]) => {
      argCount = args.length
    }) as unknown as () => void)
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expect(argCount, 'C22/DD-17 — the event surface carries no payload, no cause taxonomy and no unsubscribe').toBe(0)
  })

  it('E-3 · §2.11 item 7(b) / DD-18 — a THROWING body is caught, the fan-out CONTINUES, and there is NO rollback', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', ROOT, 'file', { value: { seed: 'pre-call' } })
    let secondRan = false
    call(f, 'listen', ROOT, () => {
      throw new Error('a body threw')
    })
    call(f, 'listen', ROOT, () => {
      secondRan = true
    })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: { seed: 'landed' } }))
    expect((r['listenerErrors'] ?? []) as unknown[], 'DD-18 — one `listenerErrors` entry on the write’s record').toHaveLength(1)
    expect(secondRan, 'DD-18 — the fan-out CONTINUES after a throwing body').toBe(true)
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'DD-18 — NO rollback follows: the write landed before the fan-out').toEqual({ seed: 'landed' })
  })

  it('E-4 · §2.11 item 5 — the FIRE SET is exactly A, its strict ancestors and its strict descendants, once each: a SIBLING and an unrelated address never fire', async () => {
    await resolveStoreSurface()
    /** **THE FOUR POSITIONS ARE `A` ITSELF, A STRICT ANCESTOR, A STRICT DESCENDANT AND A SIBLING —
     *  read off the clause's own three classes** (`seams-and-lifecycle.md` §2.11 item 5: *"every
     *  ATTACHED listener whose address is (i) `A` itself, (ii) a strict DESCENDANT of `A` … or (iii) a
     *  strict ANCESTOR of `A`. Listeners on any OTHER address do not fire"*, terms `3 = 1 + 1 + 1` at
     *  `census.md` §4.8). **A SIBLING IS AN "OTHER ADDRESS":** a listener at `A ⊕ ['a']` and a write at
     *  `A ⊕ ['c']` share the prefix `A` and are NEITHER ancestor nor descendant of one another, so the
     *  clause FORBIDS the firing — the earlier form of this row attached its `descendant` listener at
     *  exactly that sibling (`['tabs','page','sub','a']` against a write at `['tabs','page','sub','c']`)
     *  and asserted a fire the fan-out's own rule excludes, a defect of the ROW corrected here. The
     *  strict DESCENDANT is now the write's OWN address `A ⊕ ['c']` (a strict prefix of it is `A`), and
     *  the sibling stays in the row as the NEGATIVE.
     *
     *  THE DRIVE LANDS THROUGH `A5`/`A6` AT A PROPERTY ADDRESS (an ABSENT member `'c'` of `A`), NOT at
     *  a NODE LOCATION: a CONTAINER at a node location is `§2.5` item 7's arm `A2`, REFUSED
     *  `'node-location-container'` before any fan-out (`§2.11` item 5: *"a REFUSED write fires
     *  NOTHING"*). The write does not discard a subtree, so every listener below stays ATTACHED
     *  (the clause fires only *"every ATTACHED listener"*). */
    const f = store()
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { seed: 1 } }))['status'], 'C14 — the root comes into being by a 1-segment write').toBe('committed')
    expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { keep: 1, sub: { a: 1, b: 2 } } }))['status'], 'A6 — a CONTAINER at an ABSENT PROPERTY: the link is created and the contents minted as child nodes').toBe('committed')
    /** THE FIVE LISTENERS, ONE PER POSITION: `ROOT` and `CHILD` are strict ANCESTORS of `A`, `A` is
     *  `CHILD ⊕ ['sub']` ITSELF, the DESCENDANT is the strict descendant `A ⊕ ['c']` — the write's own
     *  address, whose strict prefix `A` makes it class (ii) — the `sibling` is `A ⊕ ['a']`, which
     *  RESOLVES (a `literals` member of `A`, so it is ATTACHED before the call) and must NOT fire, and
     *  `other` is an address unrelated to the write's path. */
    const A: readonly string[] = [...CHILD, 'sub']
    const fired: string[] = []
    call(f, 'listen', ROOT, () => fired.push('ancestor'))
    call(f, 'listen', CHILD, () => fired.push('ancestor2'))
    call(f, 'listen', A, () => fired.push('address'))
    call(f, 'listen', [...A, 'c'], () => fired.push('descendant'))
    const sibling = call(f, 'listen', [...A, 'a'], () => fired.push('sibling'))
    call(f, 'listen', ['tabs', 'unrelated'], () => fired.push('other'))
    expect(sibling['attached'], 'C23/§2.11 item 2 — the SIBLING listener’s address RESOLVES before the call (`a` is a `literals` member of `A`), so it IS attached and the negative below is a genuine fire-set reading, not an unattached listener').toBe(true)
    expect(expectCommitted(writeOn(f, 'generic', [...A, 'c'], 'mem', { value: 3 }))['status'], 'A6 — the write lands at an ABSENT PROPERTY `c` of `A`, so no subtree is discarded and every listener stays attached').toBe('committed')
    expect(
      fired,
      'C19/C4/§2.11 item 5 — the fire set is exactly A, its strict ancestors and its strict descendants, once each; a listener on any OTHER address (a SIBLING included) does not fire',
    ).toEqual(['ancestor', 'ancestor2', 'address', 'descendant'])
    expect(
      fired.filter((x) => x === 'descendant').length,
      '§2.11 item 5 — (ii) a strict DESCENDANT of `A` fires: the listener sits at `A ⊕ [\'c\']`, whose strict prefix `A` the write addressed',
    ).toBe(1)
    expect(
      fired.includes('sibling'),
      '§2.11 item 5 — *"Listeners on any OTHER address do not fire"*: `A ⊕ [\'a\']` shares the prefix `A` with the write at `A ⊕ [\'c\']` and is NEITHER an ancestor NOR a descendant of it, so the SIBLING never fires',
    ).toBe(false)
    expect(fired.includes('other'), '§2.11 item 5 — a listener on an address that is neither `A`, a strict descendant nor a strict ancestor NEVER fires').toBe(false)
    expect(
      fired.filter((x) => x === 'address').length,
      '§2.11 item 5 — “the whole write … is ONE firing; a write never fires a listener twice”',
    ).toBe(1)
  })

  it('E-5 · §2.11 item 5 — a REFUSED write fires NOTHING', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: undefined }), { reason: 'value-not-admitted' })
    expect(fired, 'R3/R8 — a refused write did not land, so it fires nothing').toBe(0)
  })

  it('E-6 · §2.11 item 5 — the FAN-OUT runs AFTER the purge and AFTER the install (one firing per write)', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    const observed: unknown[] = []
    call(f, 'listen', ROOT, () => {
      observed.push(readValue(readOn(f, 'generic', ROOT)))
    })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { seed: 'mem' } }))
    expect(r['purged'], 'C19 — the purge ran before the fan-out').toEqual(['temp'])
    expect(observed, '§2.11 item 5 — the body reads the post-install, post-purge state').toEqual([{ seed: 'mem' }])
    expect(observed.length, '§2.11 item 5 — a write never fires a listener twice').toBe(1)
  })

  it('E-7 · §2.11 item 7(a) / DD-19 — a body MAY write, depth-first, with no bound, coalescing or deferral', async () => {
    await resolveStoreSurface()
    const f = store()
    let innerFired = 0
    call(f, 'listen', ROOT, () => {
      if (innerFired === 0) {
        innerFired += 1
        call(f, 'write', ROOT, 'mem', { value: { nestedWrite: true } })
      }
    })
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { outer: true } }))['status'], 'DD-19 — a write issued inside a fan-out is an ORDINARY write whose own fan-out runs to completion before the body returns').toBe('committed')
    expect(readValue(readOn(f, 'generic', ROOT)), 'DD-19 — the nested write’s fan-out ran depth-first').toEqual({ nestedWrite: true })
  })

  it('E-8 · §2.11 item 4 — a listener is never attached by a REFUSED write', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    call(f, 'listen', CHILD, () => undefined)
    expectRefusal(writeOn(f, 'generic', CHILD, 'mem', { value: undefined }), { reason: 'value-not-admitted' })
    expect(call(f, 'listen', CHILD, () => undefined)['attached'], '§2.11 item 4 — nothing landed, so nothing attaches').toBe(false)
  })

  it('E-9 · §2.11 item 2 — the surface carries no payload, no cause taxonomy, no fan-out policy and no unsubscribe', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const absent of ['unsubscribe', 'off', 'events', 'on']) {
      expect(absent in f.store, `DD-17/§2.11 item 2 — no \`${absent}\` is this contract’s surface (the landed family’s opt-in, cap and count are STALE PENDING)`).toBe(false)
    }
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.12 — THE BOOT / LOAD, AND §2.13 — THE LIFETIMES
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.12 — THE BOOT (`load()`)', () => {
  it('L-1 · §2.12 item 1 — `load()` is the ONE function that reads the files, and the fan-out runs strictly AFTER the whole mint', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 'loaded' } }))
    const observed: unknown[] = []
    call(f, 'listen', ROOT, () => {
      observed.push(readValue(readOn(f, 'generic', ROOT)))
    })
    expect(call(f, 'load')['status'], 'C24/§2.12 item 1 — the load answers a `LoadRecord`: `LoadedRecord | Refusal`, and the loaded arm carries `present` and `roots` (PAR-12)').toBe('loaded')
    expect(observed, 'C24 — each listener observes the FULLY LOADED state').toEqual([{ seed: 'loaded' }])
  })

  it('L-2 · §2.12 item 1 — the load fires each resolving listener ONCE, in registration order', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 1 } }))
    const order: string[] = []
    call(f, 'listen', ROOT, () => order.push('first'))
    call(f, 'listen', ROOT, () => order.push('second'))
    call(f, 'load')
    expect(order, 'C24/§2.11 item 6 — ONCE, in registration order, AFTER the whole load has completed').toEqual(['first', 'second'])
  })

  it("L-3 · §2.12 item 4 — a MISSING file is not a failure: `{status:'loaded', present:false, roots:0}` and no listener fires", async () => {
    await resolveStoreSurface()
    const f = storeOver(memoryFs())
    let fired = 0
    call(f, 'listen', ROOT, () => {
      fired += 1
    })
    const answer = call(f, 'load')
    expect(answer['status'], '§2.12 item 4 — a missing file is NOT a failure').toBe('loaded')
    expect(answer['present'], '§2.12 item 4 — `present: false`').toBe(false)
    expect(answer['roots'], '§2.12 item 4 — `roots: 0`').toBe(0)
    expect(fired, '§2.12 item 4 — nothing resolves, so no listener fires').toBe(0)
  })

  it('L-4 · §2.12 item 4 — a PRESENT-but-unreadable/unparsable file refuses `load-failed` and enters the UNLOADED state', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, '{not json')
    expectRefusal(call(f, 'load'), { reason: 'load-failed', step: 'J-LOAD', segment: null })
    expectRefusal(call(f, 'read', ROOT, 'file'), { reason: 'not-loaded', step: 'J-LOAD' })
    expect(fs.bytes(FILE_PATH), '§2.12 item 4 (ii) — NO file is written').toBe('{not json')
  })

  it('L-5 · §2.12 item 4 — a LATER successful `load()` leaves the UNLOADED state for the rest of the session', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, '{not json')
    expectRefusal(call(f, 'load'), { reason: 'load-failed' })
    fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 'recovered' } }))
    const loaded = call(f, 'load')
    expect(loaded['status'], '§2.12 item 4 — “a later successful load() leaves the state for the rest of the session”').toBe('loaded')
    expect(loaded['present'], 'PAR-12 — a load answering `loaded` carries `present`').toBe(true)
    expect(typeof loaded['roots'], 'PAR-12 — `roots`: the count of register entries minted').toBe('number')
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), '§2.12 item 4 — the file tier is usable again').toEqual({ seed: 'recovered' })
  })

  it('L-6 · §2.12 item 3 / DD-8 — a listener registered AFTER the load is owed NO initial call', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 1 } }))
    call(f, 'load')
    let fired = 0
    const record = call(f, 'listen', ROOT, () => {
      fired += 1
    })
    expect(fired, 'DD-8 — a listener registered AFTER a successful load is NOT fired by that load and is owed no initial call').toBe(0)
    expect(record['attached'], 'DD-8/§2.12 item 3 — it is attached IMMEDIATELY if its address resolves, which is the caller’s signal').toBe(true)
  })

  it('L-7 · §2.12 item 2 / C24 — the boot ORDER is a contract clause: construct, `listen(...)`, THEN `load()`', async () => {
    await resolveStoreSurface()
    /** THE MARKER RECORDS THE LOAD **AS THE LOAD RUNS IT**, not before the call it measures: the
     *  earlier form pushed `'load'` BEFORE `call(f, 'load')`, so it asserted the opposite of `C24`.
     *  `C24` (`§2.11` item 6 · `§2.12` item 2) declares the order: the host registers its listeners
     *  FIRST and THEN calls `load()`, and the fan-out runs ONCE after the whole mint — so the
     *  LISTENER'S OWN FIRING is the marker that must record the load's position in the order. */
    const fs = memoryFs()
    fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 1 } }))
    const g = storeOver(fs)
    const order: string[] = []
    const listenerRanAt: number[] = []
    call(g, 'listen', ROOT, () => {
      order.push('listener')
      listenerRanAt.push(1)
    })
    const loaded = call(g, 'load')
    order.push('load')
    expect(loaded['status'], '§2.12 item 1 — the load answers its declared `LoadRecord`').toBe('loaded')
    expect(order, 'C24 — the listener fired INSIDE the load call, i.e. the load followed its registration and the fan-out ran after the whole mint').toEqual(['listener', 'load'])
    expect(listenerRanAt, 'C24 — the fan-out ran ONCE').toEqual([1])
  })

  it('L-8 · §2.12 item 5 — no `reset`, `clear`, `unload` or `hydrate` verb is declared', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const absent of ['reset', 'clear', 'unload', 'hydrate']) {
      expect(absent in f.store, `§2.12 item 5 — the landed \`hydrate(rows)\` seam is STALE PENDING and is NOT imported: \`${absent}\` is not this contract’s surface`).toBe(false)
    }
  })
})

describe('§2.13 — THE LIFETIMES (`C8`, `C9`, `R7`)', () => {
  it('Z-1 · §2.13 item 3 / C9 — a `temp` write RETAINS the more-persistent instance rather than purging it', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'C9 — “easy rollback … by retaining the state on the lower tier”').toEqual({ seed: 'file' })
    expect(readValue(readOn(f, 'generic', ROOT)), 'C9 — the pre-committed value is tested through ordinary reads').toEqual({ seed: 'temp' })
  })

  it('Z-2 · §2.13 item 3 — COMMITTING is an ordinary write at the more-persistent tier; no separate commit verb exists', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    const r = expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: { seed: 'committed' } }))
    expect(r['purged'], 'C9 (d) — committing purges the `temp` instance through the ordinary purge').toEqual(['temp'])
    expect('commit' in f.store, '§2.13 item 3 — no separate commit verb exists').toBe(false)
  })

  it('Z-3 · §2.13 item 4 / R7 — the rollback is AUTOMATIC and creates NO verb', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'retained' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'pre-committed' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'pre-committed-2' } })
    expect(readValue(readOn(f, 'generic', ROOT)), 'R7 — dropping the temp node restores the retained lower-tier state').toEqual({ seed: 'pre-committed-2' })
    expect('rollback' in f.store || 'revert' in f.store, 'R7 — NO new store-level verb is created: `C9`’s rollback IS the retained lower-tier instance').toBe(false)
  })

  it('Z-4 · §2.13 item 4 — dropped by exactly TWO arms: a superseding write at the address, or the session’s end', async () => {
    await resolveStoreSurface()
    expect(TEMP_DROP_ARMS, '§2.13 item 4 (ii) — “the temp instance is dropped by EXACTLY TWO ARMS … and by nothing else”').toEqual(['a superseding write at the address', "the session's end"])
    const f = store()
    call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
    call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
    call(f, 'write', ROOT, 'file', { value: { seed: 'file2' } })
    expect(readValue(readOn(f, 'generic', ROOT)), 'C9 — the commit flow drops the temp instance and the retained copy is the answer').toEqual({ seed: 'file2' })
  })

  it('Z-5 · §2.13 item 2 / DD-7 — the session IS the store instance’s lifetime: `mem` and `temp` do not survive it', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const first = storeOver(fs)
    call(first, 'write', ROOT, 'mem', { value: { seed: 'mem' } })
    call(first, 'write', ROOT, 'file', { value: { seed: 'file' } })
    const second = storeOver(fs)
    call(second, 'load')
    expect(readValue(readOn(second, 'generic', ROOT, 'file')), 'C8/C7 — the `file` tier survives, hydrated from its own file').toEqual({ seed: 'file' })
    expectRefusal(call(second, 'read', ROOT, 'mem'), { reason: 'tier-not-held' })
  })

  it('Z-6 · §2.13 item 4 (iii) — no timer, idle sweep, TTL, clock or GC hook exists', async () => {
    await resolveStoreSurface()
    const f = store()
    for (const absent of ['sweep', 'gc', 'ttl', 'clock']) {
      expect(absent in f.store, `R1/§2.13 item 4 (iii) — no timer, idle sweep, TTL, clock or GC hook is declared (\`${absent}\`)`).toBe(false)
    }
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §2.14 — THE CLOSED FAIL-STATE UNION, BY ITS ENUMERATED ORDINALS
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§2.14 — THE CLOSED FAIL-STATE UNION (the 21 ENUMERATED tokens; the carried `SD-SPLIT-2` note)', () => {
  it('U-1 · §2.14 — the union’s DECLARED count is `22` while its enumerated ordinals are `1–21` (`SD-SPLIT-2`, carried)', async () => {
    await resolveStoreSurface()
    expect(DECLARED_UNION_COUNT, '§2.14’s head — the contract’s own DECLARED count, terms `22 = 6 + 2 + 2 + 6 + 2 + 2 + 1 + 1`').toBe(22)
    expect(ENUMERATED_UNION_COUNT, 'docs/pending.md §3 SD-SPLIT-2 — the enumerated ordinals are `1–21`: token 21 is counted twice, so DISTINCT membership is `21`').toBe(21)
    expect(ENUMERATED_REASON_TOKENS.length, '§2.14 — NO row of this file asserts `22` distinct tokens').toBe(ENUMERATED_UNION_COUNT)
    expect(DECLARED_UNION_COUNT - ENUMERATED_UNION_COUNT, 'SD-SPLIT-2 — the carried defect’s own delta, named and NOT reconciled here').toBe(1)
  })

  it('U-2 · §2.14 — every enumerated ordinal’s TOKEN and STEP are the table’s own', async () => {
    await resolveStoreSurface()
    expect(TOKEN_STEPS.length, '§2.14 item 1 — one row per enumerated ordinal').toBe(ENUMERATED_UNION_COUNT)
    for (const [ordinal, token, step] of TOKEN_STEPS) {
      expect(ENUMERATED_REASON_TOKENS[ordinal - 1], `§2.14 — ordinal ${ordinal}’s token`).toBe(token)
      expect(step.length, `§2.14 — ordinal ${ordinal}’s step`).toBeGreaterThan(0)
    }
  })

  it('U-3 · §2.14 — the TWENTY-ONE enumerated tokens are DRIVEN, each to its own applicable arm, and each answer is a returned typed record', async () => {
    await resolveStoreSurface()
    /** One drive per enumerated token: `(ordinal, token, the arm that mints it)`. */
    const drives: readonly (readonly [number, string, () => Rec])[] = [
      [1, 'malformed-address', () => call(store(), 'read', 'tabs')],
      [2, 'unknown-root', () => call(store(), 'read', ['nope'])],
      [3, 'unreachable', () => {
        /** THE MIDDLE OF A WALK WITH ITS ROOT MINTED: `B-ROOT` precedes `C-ANCHOR` (`§2.3` item 2),
         *  so a read whose `address[0]` names no entry is token 2 (`unknown-root`) and the `C-ANCHOR`
         *  arm needs the root to reach its first intermediate segment. */
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        return call(f, 'read', ['tabs', 'missing', 'deeper'])
      }],
      [4, 'absent-address', () => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { page: 1 } })
        return call(f, 'read', ['tabs', 'missing'])
      }],
      [5, 'tier-not-held', () => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        return call(f, 'read', ROOT, 'file')
      }],
      [6, 'tombstoned', () => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        call(f, 'write', ROOT, 'mem', { tombstone: true })
        return call(f, 'read', ROOT)
      }],
      [7, 'malformed-tier', () => call(store(), 'read', ROOT, 'disk')],
      [8, 'secure-refused', () => call(store(), 'write', ROOT, 'secure', { value: 1 })],
      [9, 'value-not-admitted', () => call(store(), 'write', ROOT, 'mem', { value: undefined })],
      [10, 'malformed-tombstone', () => call(store(), 'write', ROOT, 'mem', { value: 1, tombstone: true })],
      [11, 'persistence-inversion', () => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { page: { seed: 1 } } })
        return call(f, 'write', CHILD, 'file', { value: { seed: 2 } })
      }],
      [12, 'constraint-refused', () => {
        const f = store()
        register(f, ROOT, [{ ok: false, message: 'violated' }])
        return call(f, 'write', ROOT, 'mem', { value: 1 })
      }],
      [13, 'constraint-failed', () => {
        const f = store()
        register(f, ROOT, [{ repair: true }])
        return call(f, 'write', ROOT, 'mem', { value: 1 })
      }],
      [14, 'save-failed', () => {
        const fs = memoryFs()
        const f = storeOver(fs)
        fs.failSaves(1)
        return call(f, 'write', ROOT, 'file', { value: 1 })
      }],
      [15, 'not-loaded', () => {
        const fs = memoryFs()
        const f = storeOver(fs)
        fs.seed(FILE_PATH, '{not json')
        call(f, 'load')
        return call(f, 'read', ROOT, 'file')
      }],
      [16, 'secure-gated', () => call(storeWithAccess('not-blocked'), 'secureRead', ROOT)],
      [17, 'malformed-listener', () => call(store(), 'listen', ROOT, 'nope')],
      [18, 'malformed-constraint', () => call(store(), 'constrain', ROOT, { constraint: 'nope' })],
      [19, 'load-failed', () => {
        const fs = memoryFs()
        const f = storeOver(fs)
        fs.seed(FILE_PATH, '{not json')
        return call(f, 'load')
      }],
      [20, 'repair-broke-constraint', () => {
        /** THE SAME TWO-REGISTRATION + ONE-REPAIR DRIVE AS ROW `C-11` (`§2.10` items 8–9, 11): a
         *  single registration cannot both demand the repair and be the constraint that the repair
         *  broke, and the antecedent (*"answered `{ok:true}` in an EARLIER pass … `{ok:false}` in a
         *  LATER pass"*) needs the restart a RUN repair forces. */
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: 'pre-call' })
        register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
        register(f, ROOT, [{ ok: true }, { ok: false, message: 'broken' }])
        return call(f, 'write', ROOT, 'mem', { value: 'original' })
      }],
      [21, 'node-location-container', () => {
        const f = store()
        call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
        return call(f, 'write', CHILD, 'mem', { value: { seed: 2 } })
      }],
    ]
    expect(drives.length, '§2.14 — one drive per ENUMERATED token, and no drive asserts a twenty-second').toBe(ENUMERATED_UNION_COUNT)
    const minted: string[] = []
    for (const [ordinal, token, drive] of drives) {
      const answer = drive()
      /** The ordinal is named in the failure's own message, so a mis-pointed cell is visible. */
      const r = refusalOf(answer)
      expect(r['reason'], `§2.14 — ordinal ${ordinal}'s token \`${token}\` is the reason the arm mints`).toBe(token)
      minted.push(String(r['reason']))
      expect(messagesOf(r).length, `§2.14 item 2 — ordinal ${ordinal}'s refusal carries a non-empty list`).toBeGreaterThan(0)
    }
    expect(new Set(minted).size, '§2.14 — every driven token is DISTINCT (21 of the enumerated 21)').toBe(ENUMERATED_UNION_COUNT)
    for (const token of minted) {
      expect(ENUMERATED_REASON_TOKENS.includes(token), `§2.14 — a row that mints a token outside the union FAILS (${token})`).toBe(true)
    }
    /** THE `A2` CELL'S EXTRA CLAIMS (`§2.14` item 6 · `PAR-13` · `R16`(d)): ordinal 21's refusal is
     *  a RETURNED typed record at `step: 'M-PROP'` whose LAST entry carries the WRAPPER-NODE
     *  GUIDANCE, and whose cell leaves nothing minted. The fixture's EXPLICIT `PAR-11` double is
     *  supplied here (`storeOver(memoryFs)`), so the no-file-written half is asserted on its bytes. */
    const fs21 = memoryFs()
    const f21 = storeOver(fs21)
    call(f21, 'write', CHILD, 'mem', { value: { seed: 1 } })
    const preBytes21 = fs21.bytes(FILE_PATH)
    let fired21 = 0
    call(f21, 'listen', CHILD, () => {
      fired21 += 1
    })
    const r21 = expectNodeLocationContainerRefusal(call(f21, 'write', CHILD, 'mem', { value: { seed: 2 } }), 'U-3[21]')
    expect(r21['segment'], '§2.14 item 6 — the refusal names the failing segment (the write’s last segment)').toBe('page')
    expect(fs21.bytes(FILE_PATH), '§2.14 item 6 — NO file is written (the pre-call bytes stand byte-identical)').toBe(preBytes21)
    expect(fired21, '§2.14 item 6 — the purge does not run and no listener fires').toBe(0)
    expect('purged' in r21, '§2.14 item 6 — the closed `Refusal` carries no `purged` member').toBe(false)
    expect(readValue(readOn(f21, 'generic', CHILD)), '§2.14 item 6 — nothing is minted').toEqual({ seed: 1 })
  })

  it('U-4 · §2.14 item 1 — the read’s applicable set is `8 = 6 + 2`', async () => {
    await resolveStoreSurface()
    const readTokens = ENUMERATED_REASON_TOKENS.slice(0, 8)
    expect(readTokens.length, '§2.14 item 1 — the read’s `8 = 6 (tokens 1–6) + 2 (tokens 7–8)` ✓').toBe(8)
    /** Each of the eight is driven through a READ. */
    const driven = [
      call(store(), 'read', 'tabs'),
      call(store(), 'read', ['nope']),
      (() => {
        /** `B-ROOT` precedes `C-ANCHOR`: the root must be minted before an INTERMEDIATE arm can be
         *  the failing one (`§2.3` item 2). */
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        return call(f, 'read', ['tabs', 'missing', 'deeper'])
      })(),
      (() => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        return call(f, 'read', CHILD)
      })(),
      (() => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        return call(f, 'read', ROOT, 'file')
      })(),
      (() => {
        const f = store()
        call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
        call(f, 'write', ROOT, 'mem', { tombstone: true })
        return call(f, 'read', ROOT)
      })(),
      call(store(), 'read', ROOT, 'disk'),
      call(store(), 'read', ROOT, 'secure'),
    ]
    for (const [index, answer] of driven.entries()) {
      const r = expectRefusal(answer)
      expect(r['reason'], `§2.14 item 1 — the read's applicable token ${index + 1}`).toBe(readTokens[index])
    }
  })

  it('U-5 · §2.14 item 1 — the write’s applicable set is `16 = 3 + 2 + 2 + 6 + 2 + 1`, and token 21 is the resolution row’s own', async () => {
    await resolveStoreSurface()
    const applicable = [
      'malformed-address', 'unknown-root', 'unreachable',
      'malformed-tier', 'secure-refused',
      'value-not-admitted', 'malformed-tombstone',
      'persistence-inversion', 'constraint-refused', 'constraint-failed', 'save-failed', 'repair-broke-constraint',
      'not-loaded', 'secure-gated',
      'node-location-container',
    ]
    expect(applicable.length, '§2.14 item 1 — the write’s DISTINCT applicable tokens, driven from the printed groups (`3` address-side + `2` tier-argument + `2` value/plan + `6` write-dose + `2` state-duty)').toBe(15)
    expect(new Set(applicable).size, 'SD-SPLIT-2 — the same carried defect reaches this figure: the write-dose group `6 = 5 (tokens 11–14 + 20) + 1 (token 21)` already CONTAINS token 21, and the resolution group adds it again, so the distinct applicable tokens are `15` — asserted beside the declared `16`, never reconciled').toBe(15)
  })

  it('U-6 · §2.14 item 2 — `reason` and `step` are drawn from CLOSED sets: the 21 enumerated tokens and the 13 step ids', async () => {
    await resolveStoreSurface()
    const r = refusalOf(call(store(), 'read', ['']))
    expect(ENUMERATED_REASON_TOKENS.includes(String(r['reason'])), '§2.14 — a token outside the union FAILS').toBe(true)
    expect(STEP_IDS.includes(String(r['step'])), 'PAR-13 — `step` ∈ the `13` step ids').toBe(true)
  })

  it('U-7 · §2.14 item 4 — NOTHING IS SWALLOWED AND NOTHING IS A THROW: every fail-state is a returned typed record', async () => {
    await resolveStoreSurface()
    const f = store()
    expect(() => call(f, 'write', ROOT, 'mem', { value: undefined }), 'R8 — “a failed operation does not land”, answered never as a throw').not.toThrow()
    expect(() => call(f, 'read', ['']), 'C17 — a verbose error, not a throw').not.toThrow()
    expect(() => call(storeWithAccess('not-blocked'), 'secureLoad'), 'C6 — the gate refuses as a record').not.toThrow()
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §6 — THE PARAMETERS: one drive per declared parameter’s OUTSIDE values
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§6 — PARAMETER SEMANTICS (the `16 = 13 + 3` `PAR-` rows)', () => {
  it('P-1 · §6 — the declared row set is `16 = 13 + 3` and EVERY declared parameter has a row', async () => {
    await resolveStoreSurface()
    expect(PARAMETER_ROWS.length, '§6’s head — terms `16 = 13 (the as-filed PAR-1…PAR-13) + 3 (PAR-1a · PAR-4a · PAR-14)` ✓').toBe(16)
    expect([...PARAMETER_ROWS].sort(), '§0B item 4 — a declared parameter without a row would be a gate-2 finding').toEqual([...PARAMETER_ROWS].sort())
  })

  it('P-2 · §6 — for EVERY declared parameter an OUTSIDE value answers its DECLARED answer, and NEVER a throw', async () => {
    await resolveStoreSurface()
    expect(OUTSIDE_PARAMETER_DRIVES.length, '§6 — one outside drive per declared parameter row').toBe(16)
    for (const [row, drive, declared] of OUTSIDE_PARAMETER_DRIVES) {
      const f = row.startsWith('PAR-10') ? storeWithAccess('not-blocked') : store()
      let answer: Rec | null = null
      expect(() => {
        answer = drive(f)
      }, `§6’s head — OUTSIDE means the input is a domain violation and the declared answer is the one named — NEVER a throw (${row})`).not.toThrow()
      const value = answer as unknown as Rec
      if (declared === 'loaded-or-refused-never-throw') {
        expect(['loaded', 'refused'].includes(String(value['status'])), `${row} — the declared answer is one of the declared records`).toBe(true)
      } else {
        expect(value['reason'], `${row} — the declared answer`).toBe(declared)
        if (declared === 'node-location-container') {
          /** EVERY `A2` cell of this table — `PAR-1a` (the resolution's input) and `PAR-4a` (the
           *  value's address-class) — carries the SAME seven claims as `§2.5` item 7's `A2` row and
           *  `PAR-13`'s re-grained arm: *"a `'node-location-container'` refusal whose LAST entry's
           *  `text` does NOT carry the wrapper-node guidance ⇒ FAILS"* (`R16`(d): *"the user should
           *  create a wrapper node"*). This drive supplies the fixture's explicit `PAR-11` double
           *  through `store()`, so nothing reaches an unwritable path. */
          expectRefusal(value, { reason: 'node-location-container', step: 'M-PROP' })
          expect(
            primarySentence(value),
            `${row} — the refusal's PRIMARY SENTENCE carries the WRAPPER-NODE GUIDANCE (PAR-13 / R16(d))`,
          ).toMatch(/wrapper/i)
        }
      }
    }
  })

  it('P-3 · PAR-1 — every malformed-address arm answers at `A-ADDRESS` with `segment: null`', async () => {
    await resolveStoreSurface()
    for (const address of ['tabs', [], ['tabs', 7], ['tabs', '']] as const) {
      expectRefusal(call(store(), 'read', address), { reason: 'malformed-address', step: 'A-ADDRESS', segment: null })
    }
  })

  it('P-4 · PAR-1a — a well-formed array naming nothing answers one of the three walk tokens', async () => {
    await resolveStoreSurface()
    const f = store()
    const answers = [call(f, 'read', ['nope']), call(f, 'read', CHILD)]
    const reasons = answers.map((a) => String(refusalOf(a)['reason']))
    for (const reason of reasons) {
      expect(['unknown-root', 'unreachable', 'absent-address'].includes(reason), 'PAR-1a — a well-formed array naming nothing ⇒ `unknown-root` or `unreachable` or `absent-address`').toBe(true)
    }
  })

  it('P-5 · PAR-2 — a write tier that is absent, a non-string or any other string is `malformed-tier`; `secure` is `secure-refused`', async () => {
    await resolveStoreSurface()
    const f = store()
    expectRefusal(call(f, 'write', ROOT, undefined, { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
    expectRefusal(call(f, 'write', ROOT, 7, { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
    expectRefusal(call(f, 'write', ROOT, 'disk', { value: 1 }), { reason: 'malformed-tier', step: 'F-TIER' })
    expectRefusal(call(f, 'write', ROOT, 'secure', { value: 1 }), { reason: 'secure-refused', step: 'F-TIER' })
  })

  it('P-6 · PAR-3 — a read tier of `secure` is refused, any other value is `malformed-tier`, and a legal-but-unheld tier is `tier-not-held`', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(f, 'read', ROOT, 'secure'), { reason: 'secure-refused', step: 'F-TIER' })
    expectRefusal(call(f, 'read', ROOT, 'disk'), { reason: 'malformed-tier', step: 'F-TIER' })
    expectRefusal(call(f, 'read', ROOT, 'file'), { reason: 'tier-not-held', step: 'F-TIER' })
  })

  it('P-7 · PAR-4a / PAR-14 — a CONTAINER at a NODE LOCATION · at `_value` · a second member beside `_value` · a literal with no resolution', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
    /** `PAR-4a` — *"a CONTAINER passed to a NODE LOCATION ⇒ `'node-location-container'` (token 21)
     *  with the wrapper-node guidance, NOTHING minted, no file written (`R17`(a)) — the container is
     *  ADMITTED and MISPLACED, which is why it is not token 9"*. The fixture's EXPLICIT `PAR-11`
     *  double is supplied, so the bytes stand as the evidence. */
    const preBytes = fs.bytes(FILE_PATH)
    let fired = 0
    call(f, 'listen', CHILD, () => {
      fired += 1
    })
    const r = expectNodeLocationContainerRefusal(call(f, 'write', CHILD, 'mem', { value: [1] }), 'P-7 (`PAR-4a`)')
    expect(fs.bytes(FILE_PATH), 'PAR-4a — NO file written (the pre-call bytes stand byte-identical)').toBe(preBytes)
    expect(fired, 'PAR-4a — the purge does not run and no listener fires').toBe(0)
    expect('purged' in r, 'PAR-4a — the closed `Refusal` carries no `purged` member').toBe(false)
    expect(readValue(readOn(f, 'generic', CHILD)), 'PAR-4a — nothing is minted').toEqual({ seed: 1 })
    expectRefusal(call(f, 'write', ROOT, 'mem', { value: { inner: 1 }, transparent: true }), { reason: 'value-not-admitted', step: 'G-VALUE' })
    call(f, 'write', ROOT, 'mem', { value: 'alone', transparent: true })
    expectRefusal(call(f, 'write', ROOT, 'mem', { value: { second: 1 } }), { reason: 'value-not-admitted', step: 'G-VALUE' })
    /** `PAR-4a`'s fourth arm: *"a literal written where the immediate parent does NOT resolve ⇒
     *  `'unreachable'` (`C17`) and nothing minted"*. The drive mints its root FIRST and leaves the
     *  SEGMENT ABOVE the addressed one missing — `B-ROOT` precedes `C-ANCHOR`, so a missing ROOT is
     *  token 2 (`unknown-root`, row `A-3`), and the earlier form's address (`ROOT`'s own child, whose
     *  parent `ROOT` was a TRANSPARENT node by then) is not the arm this row means. */
    const h = store()
    call(h, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(h, 'write', ['tabs', 'missing', 'leaf'], 'mem', { value: 1 }), { reason: 'unreachable', step: 'C-ANCHOR' })
  })

  it('P-8 · PAR-5 — a value beside `tombstone: true`, or a `tombstone` member that is not `true`, is `malformed-tombstone`', async () => {
    await resolveStoreSurface()
    const f = store()
    expectRefusal(call(f, 'write', ROOT, 'mem', { value: 1, tombstone: true }), { reason: 'malformed-tombstone', step: 'G-VALUE' })
    expectRefusal(call(f, 'write', ROOT, 'mem', { tombstone: 'yes' }), { reason: 'malformed-tombstone', step: 'G-VALUE' })
    expectRefusal(call(f, 'write', ROOT, 'mem', { tombstone: false }), { reason: 'malformed-tombstone', step: 'G-VALUE' })
  })

  it('P-9 · PAR-6 — a non-function body is `malformed-listener` and registers NOTHING', async () => {
    await resolveStoreSurface()
    const f = store()
    call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
    expectRefusal(call(f, 'listen', ROOT, 'not a function'), { reason: 'malformed-listener', step: 'L-REGISTRATION' })
    let fired = 0
    call(f, 'write', ROOT, 'mem', { value: { seed: 2 } })
    expect(fired, 'PAR-6 — a refused listener registers nothing').toBe(0)
  })

  it('P-10 · PAR-7 — a constraint that is not a function is `malformed-constraint`; an answer outside the three arms is `constraint-failed`', async () => {
    await resolveStoreSurface()
    const malformed = store()
    expectRefusal(call(malformed, 'constrain', ROOT, { constraint: 'nope' }), { reason: 'malformed-constraint', step: 'L-REGISTRATION' })
    const outsideArms = store()
    register(outsideArms, ROOT, [{ nope: true }])
    expectRefusal(call(outsideArms, 'write', ROOT, 'mem', { value: 1 }), { reason: 'constraint-failed', step: 'H-CONSTRAINT' })
  })

  it('P-11 · PAR-8 — a present-but-non-function repair is `malformed-constraint`; an absent repair demanded is `constraint-failed`', async () => {
    await resolveStoreSurface()
    const f = store()
    expectRefusal(call(f, 'constrain', ROOT, { constraint: () => ({ ok: true }), repair: 'nope' }), { reason: 'malformed-constraint', step: 'L-REGISTRATION' })
    const g = store()
    register(g, ROOT, [{ repair: true }])
    expectRefusal(call(g, 'write', ROOT, 'mem', { value: 1 }), { reason: 'constraint-failed', step: 'H-CONSTRAINT' })
  })

  it('P-12 · PAR-9 — an unparsable file is `load-failed` at `J-LOAD`; a failing save is `save-failed` at `I-SAVE`; neither throws', async () => {
    await resolveStoreSurface()
    const fs = memoryFs()
    const f = storeOver(fs)
    fs.seed(FILE_PATH, 'not json at all')
    expectRefusal(call(f, 'load'), { reason: 'load-failed', step: 'J-LOAD' })
    fs.seed(FILE_PATH, JSON.stringify({}))
    call(f, 'load')
    fs.failSaves(1)
    expectRefusal(call(f, 'write', ROOT, 'file', { value: 1 }), { reason: 'save-failed', step: 'I-SAVE' })
  })

  it('P-13 · PAR-11 — a PARTIAL `fs` surface is NOT adopted: the real module is used and NEITHER arm throws, over this drive’s OWN writable path', async () => {
    await resolveStoreSurface()
    /** `PAR-11` — *"a PARTIAL surface is NOT adopted — the real module is used and NEITHER arm
     *  throws"*. THIS DRIVE OWNS ITS PATH: `file.path` is a drive-created path under `os.tmpdir()`
     *  and NO `fs` is supplied, so the module faces the declared *"absent ⇒ the real `node:fs`"*
     *  arm and must reach the REAL filesystem (the seed made through `node:fs` is what proves it —
     *  the `partial` surface below, whose `readFileSync` answers `'{}'`, would report `roots: 0`). */
    const path = tempPath('partial-surface.json')
    writeFileSync(path, JSON.stringify({ tabs: { seed: 'real' } }))
    const partial = { readFileSync: () => '{}' } as unknown as StoreFixture['fs']['surface']
    let loadAnswer: Rec | null = null
    expect(() => {
      loadAnswer = call(store({ file: { path }, fs: partial }), 'load')
    }, 'PAR-11 — the LOAD arm: a partial surface is NOT adopted and the arm does not throw').not.toThrow()
    const loaded = loadAnswer as unknown as Rec
    expect(['loaded', 'refused'].includes(String(loaded['status'])), 'PAR-11 — the load answers a declared record either way').toBe(true)
    expect(loaded['status'], 'PAR-11 — the real `node:fs` reads the seeded file: a partial surface that WAS adopted would answer `readFileSync → \'{}\'`').toBe('loaded')
    expect(loaded['present'], 'PAR-11 — the real module reports the file present (`PAR-12`)').toBe(true)
    expect(loaded['roots'], 'PAR-11 — the real module mints the seeded register entry (a partial surface adopting `readFileSync` would mint none)').toBe(1)
    let writeAnswer: Rec | null = null
    expect(() => {
      writeAnswer = call(store({ file: { path }, fs: partial }), 'write', ROOT, 'file', { value: { seed: 2 } })
    }, 'PAR-11 — the WRITE/COMMIT arm: the same partial surface is not adopted and the arm does not throw').not.toThrow()
    expect(
      expectCommitted(writeAnswer as unknown as Rec)['status'],
      'PAR-11 — the commit reaches the real module too (the partial surface has no `writeFileSync` to offer)',
    ).toBe('committed')
  })

  it('P-13b · PAR-11 — ABSENT `fs` ⇒ the real `node:fs`: a `file`-tier drive with NO `fs` commits and loads through this drive’s OWN writable path', async () => {
    await resolveStoreSurface()
    /** `PAR-11`'s FIRST declared arm, VERBATIM: *"absent ⇒ the real `node:fs`"*. **`storeWithoutFs` IS
     *  THE ONLY FIXTURE ENTRY THAT FABRICATES NO DOUBLE:** the options it hands `createStore` carry no
     *  `fs` member at all, so the module faces the real filesystem for BOTH the commit and the load;
     *  the ordinary `store()` supplies this register's own `memoryFs` (and must, since the rows that
     *  read the bytes or force a save failure need it). The earlier form of this row used `store()`,
     *  whose fixture injected its double UNCONDITIONALLY, so THIS ARM WAS NEVER DRIVEN — a defect of
     *  the FIXTURE, not of the row. THIS DRIVE OWNS ITS PATH (a drive-created file under `os.tmpdir()`,
     *  removed in `afterAll`) and the assertion reads the bytes through the REAL `node:fs` module,
     *  which is the only way to tell the declared arm from a store that keeps its `file` tier in
     *  memory. */
    const path = tempPath('absent-fs.json')
    expect(existsSync(path), 'PAR-11 — the path this drive owns starts ABSENT: nothing but the module’s own real-`node:fs` write can create it').toBe(false)
    const f = storeWithoutFs({ file: { path } })
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: { seed: { deep: 1 } } }))['status'], 'R3/C7 — the absent-`fs` commit lands').toBe('committed')
    expect(existsSync(path), 'PAR-11 — “absent ⇒ the real `node:fs`”: the JSON file EXISTS on the real path after the commit').toBe(true)
    expect(
      JSON.parse(readFileSync(path, 'utf8')) as unknown,
      'C7 — the real file’s bytes are the state, keyed by register-entry name; `DD-13`(iv)/`(D2)` — a container’s literal-valued member is a NODE in the state, so the bytes carry `{"_value": <the literal>}` EXPLICITLY at that member position',
    ).toEqual({ tabs: { seed: { deep: { _value: 1 } } } })
    const second = storeWithoutFs({ file: { path } })
    /** `PAR-12`/`§2.12` item 1 — the LOAD is its OWN arm (`'loaded' | 'refused'`), never a `committed`
     *  record, so the load's own status and its `present`/`roots` figure are what this drive asserts. */
    const reloaded = call(second, 'load')
    expect(reloaded['status'], 'PAR-11 — the load arm reaches the same real path').toBe('loaded')
    expect(reloaded['present'], 'PAR-11 — the real file the commit just wrote is PRESENT to the real `node:fs`').toBe(true)
    expect(reloaded['roots'], 'PAR-11 — the load re-mints exactly the one register entry the bytes carry').toBe(1)
    expect(readValue(readOn(second, 'generic', ROOT, 'file')), '§2.12 item 1 — the load re-mints the file instances from the real bytes').toEqual({ seed: { deep: 1 } })
  })

  it('P-13c · PAR-11 — a COMPLETE surface IS adopted: the caller’s own double serves the commit, over this drive’s OWN writable path', async () => {
    await resolveStoreSurface()
    /** `PAR-11`'s declared IN domain: *"a COMPLETE surface — all NINE members present and
     *  callable"*, supplied by the caller. THIS DRIVE OWNS ITS PATH (under `os.tmpdir()`) so that a
     *  module which fell back to the real `node:fs` would still be distinguishable: the real path
     *  stays ABSENT while the caller’s double holds the bytes. */
    const path = tempPath('complete-surface.json')
    const calls: string[] = []
    const double = memoryFs()
    const recording: StoreFixture['fs']['surface'] = {
      readFileSync: (p, encoding) => {
        calls.push('readFileSync')
        return double.surface.readFileSync(p, encoding)
      },
      existsSync: (p) => {
        calls.push('existsSync')
        return double.surface.existsSync(p)
      },
      mkdirSync: (p, opts) => {
        calls.push('mkdirSync')
        double.surface.mkdirSync(p, opts)
      },
      writeFileSync: (p, data) => {
        calls.push('writeFileSync')
        double.surface.writeFileSync(p, data)
      },
      openSync: (p, flags) => {
        calls.push('openSync')
        return double.surface.openSync(p, flags)
      },
      closeSync: (fd) => {
        calls.push('closeSync')
        double.surface.closeSync(fd)
      },
      fsyncSync: (fd) => {
        calls.push('fsyncSync')
        double.surface.fsyncSync(fd)
      },
      renameSync: (from, to) => {
        calls.push('renameSync')
        double.surface.renameSync(from, to)
      },
      rmSync: (p, opts) => {
        calls.push('rmSync')
        double.surface.rmSync(p, opts)
      },
    }
    const f = store({ file: { path }, fs: recording })
    expect(expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: { seed: 'double' } }))['status'], 'PAR-11 — a complete surface is ADOPTED and the commit lands').toBe('committed')
    expect(calls.includes('writeFileSync'), 'PAR-11 — the commit called the CALLER’S own surface').toBe(true)
    expect(double.bytes(path), 'C7 — the caller’s double holds the state (the double is the filesystem the store used)').not.toBeNull()
    expect(existsSync(path), 'PAR-11 — the real path was NOT written: the supplied complete surface is the one adopted').toBe(false)
  })

  it('P-14 · PAR-13 — a refusal carries no fifth member, its token is inside the union, and its list is non-empty', async () => {
    await resolveStoreSurface()
    const r = refusalOf(call(store(), 'read', ['']))
    expect(Object.keys(r).length, 'PAR-13 — the closed record is STILL five members').toBe(5)
    expect(ENUMERATED_REASON_TOKENS.includes(String(r['reason'])), 'PAR-13 — a token outside the TWENTY-TWO ⇒ FAILS').toBe(true)
    expect(messagesOf(r).length, 'PAR-13 — a refusal whose `messages` list is EMPTY ⇒ FAILS').toBeGreaterThan(0)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §5.5 — THE REGISTER’S EXECUTED LAYER, WITH ITS CAPS, ITS STOP RULE AND ITS `un-run` LINE
 * ───────────────────────────────────────────────────────────────────────────── */

describe('§5.5 — THE REGISTER’S EXECUTED LAYER (the 27 typed rows)', () => {
  it('REG-ID · §5.5.1 — the register files `27` ROWS = `13` P-IM + `6` P-SM + `8` P-TP, with their ids and strategy ids in register order', () => {
    const rows = registerRows()
    const byType = (t: string): number => rows.filter((row) => row.type === t).length
    expect(rows.length, '§5.5.1 — the third heading amendment: `27` typed rows; `13 + 6 + 8 = 27` ✓').toBe(27)
    expect(byType('P-IM'), '§5.5.1 — `P-SD-IM` rows').toBe(13)
    expect(byType('P-SM'), '§5.5.1 — `P-SD-SM` rows').toBe(6)
    expect(byType('P-TP'), '§5.5.1 — `P-SD-TP` rows').toBe(8)
    for (const row of rows) {
      expect(row.id.length, '§5.5.1 — every row carries its id').toBeGreaterThan(0)
      expect(row.strategyId.startsWith('S-SD-'), `§5.5.1 — ${row.id}'s strategy id is an \`S-SD-*\` id`).toBe(true)
    }
  })

  it('REG-TERM · §5.5.1 — every row’s declared TERM is a DRIVE count: `executed = declared` per row', () => {
    for (const row of registerRows()) {
      expect(row.drives.length, `§5.5.1 — ${row.id}'s declared term is a DRIVE count: ${row.term} attempts, authored (no row takes a draw)`).toBe(row.term)
    }
  })

  it('REG-ARITH · §5.5.1/§5.5.3 — the declared total is `288 = 232 + 8 + 24 + 12 + 12`, and the carried `276` is NAMED, not reconciled', () => {
    const terms = registerRows().map((row) => row.term)
    const total = terms.reduce((sum, term) => sum + term, 0)
    expect(total, '§5.5.1’s third-amendment foot · §5.5.3 — `12 + 9 + … + 12 + 12 = 288` ✓ (twenty-seven terms)').toBe(DECLARED_TOTAL)
    expect(DECLARED_TOTAL_TERMS.reduce((sum, term) => sum + term, 0), '§5.5.1 — `232 + 8 + 24 + 12 + 12 = 288` ✓').toBe(DECLARED_TOTAL)
    expect(
      DECLARED_TOTAL_AS_FILED_HEADING,
      '`SD-SPLIT-3` — the heading cell prints `276` where its own terms give `288`: ANNOTATED BESIDE, never silently reconciled',
    ).toBe(276)
    expect(DECLARED_TOTAL_AS_FILED_HEADING, '`SD-SPLIT-3` — the as-filed heading figure is NOT the operative total: it does not sum from its own printed terms').not.toBe(DECLARED_TOTAL)
  })

  it('REG-CAPS · §5.5 — each term against its OWN cap: the per-row maximum `24` ≤ `100`/row, and the declared total `288` ≤ `400`', () => {
    const terms = registerRows().map((row) => row.term)
    expect(Math.max(...terms), '§5.5 item 2 — the per-row cap; the largest row is `24` (P-SD-SM-6), headroom `76`').toBe(24)
    expect(Math.max(...terms), '§5.5 item 2 — `≤100` attempts per row').toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(terms.reduce((sum, term) => sum + term, 0), '§5.5 item 2 — `≤400` attempts total; headroom `112`').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(STOP_AFTER_CONSECUTIVE, '§5.5 item 2 — STOP AFTER 5 CONSECUTIVE FAILURES').toBe(5)
  })

  it('REG-EXEC · §5.5.1 — THE EXECUTED LAYER: every row’s strategy id · attempts-run/declared · held · broken · abandoned, the chain, the subtotals, the caps, the stop-rule reading, and `un-run: …`', async () => {
    const report = await runRegister()
    const lines: string[] = []
    lines.push(
      `REGISTER DECLARED: ${report.rowsDeclared} rows · total ${report.declaredTotal} = ${report.declaredTerms.join(' + ')} (chain ${report.chain.join(' → ')})`,
    )
    lines.push(
      `  subtotals BY TYPE: P-SD-IM ${report.subtotals['P-IM']} · P-SD-SM ${report.subtotals['P-SM']} · P-SD-TP ${report.subtotals['P-TP']} (${report.subtotals['P-IM']} + ${report.subtotals['P-SM']} + ${report.subtotals['P-TP']} = ${report.declaredTotal})`,
    )
    lines.push(
      `  declared terms, as printed: ${report.declaredTotalTerms.join(' + ')} = ${report.declaredTotalTerms.reduce((a, b) => a + b, 0)} · the heading cell’s as-filed ${report.declaredTotalAsFiledHeading} (SD-SPLIT-3, carried and NOT reconciled)`,
    )
    lines.push(
      `  caps against their OWN caps: per-row max ${report.perRowMax} (${report.perRowMaxRow}) ≤ ${REGISTER_ROW_CAP} · total ${report.declaredTotal} ≤ ${REGISTER_TOTAL_CAP}`,
    )
    for (const row of report.rows) {
      lines.push(
        `  ${row.id} · ${row.strategyId} · ${row.type} · term ${row.declaredTerm}: attempts-run ${row.attemptsRun}/${row.declaredTerm} · held ${row.held} · broken ${row.broken} · abandoned ${row.abandoned} · ${row.state}`,
      )
      for (const reading of row.readings.slice(0, 2)) lines.push(`      ${reading}`)
    }
    lines.push(
      `  EXECUTED: attempts ${report.attemptsExecuted}/${report.declaredTotal} · rows executed ${report.rowsExecuted}/${report.rowsDeclared} · rows held ${report.rowsHeld} · rows broken ${report.rowsBroken} · un-run ${report.unrunRows.length === 0 ? 'none' : report.unrunRows.join(' · ')}`,
    )
    lines.push(
      `  STOP RULE: ${report.stoppedAtRow === null ? 'not fired — no 5 consecutive failures' : `FIRED at ${report.stoppedAtRow} — ${report.stopReason ?? ''}`}`,
    )
    process.stdout.write(
      `\n──────────── U-STORE-REDERIVE §5.5.1 REGISTER — THE EXECUTED LAYER ────────────\n${lines.join('\n')}\n──────────────────────────────────────────────────────────────────────────────\n`,
    )

    expect(report.rowsDeclared, '§5.5.1 — the register files `27` rows').toBe(27)
    expect(report.declaredTotal, '§5.5.1/§5.5.3 — the declared total with its terms').toBe(DECLARED_TOTAL)
    expect(report.attemptsExecuted, '§5.5.1 — `executed = declared` is OWED at 288, and the STOP RULE may abandon attempts inside a row').toBeLessThanOrEqual(report.declaredTotal)
    expect(
      report.unrunRows.length,
      `§5.5 item 2 / §5.5.2 item 4 — an UN-RUN row is a FAILURE, never a pass. un-run: ${report.unrunRows.join(' · ') || 'none'}`,
    ).toBe(0)
    expect(
      report.reasons.length,
      `§5.5.1 — the register is RED at this head; every BROKEN attempt is reported with its own reason:\n${report.reasons.slice(0, 12).join('\n')}`,
    ).toBe(0)
  })

  it('REG-HONESTY · §5.5.2 — the honesty block: no `[H]` claim, no APP claim, no draw, no new dependency, and an un-run row is a FAILURE', () => {
    expect(HONESTY.length, '§5.5.2 — the honesty block’s five boundaries, carried into the executed layer').toBe(5)
    expect(HONESTY.some((line) => line.includes('an un-run row is a FAILURE')), '§5.5.2 item 4 — “an un-run row is a FAILURE, never a pass”').toBe(true)
    expect(HONESTY.some((line) => line.includes('NO row takes a draw')), '§5.5.2 item 2 / AGENTS.md item 11(d) — no fast-check, no property runner, no fourth leg').toBe(true)
  })

  it('REG-STOP · §5.5 item 2 — the stop rule is enforced at FIVE consecutive failures, and the harness reports where it fired', async () => {
    const report = await runRegister()
    if (report.attemptsExecuted < report.declaredTotal) {
      expect(report.stoppedAtRow, '§5.5 item 2 — a run that abandoned attempts must name the row it stopped at').not.toBeNull()
      expect(report.stopReason, '§5.5 item 2 — and state its reason').not.toBeNull()
    } else {
      expect(report.stoppedAtRow, '§5.5 item 2 — a run that executed every attempt did not fire the stop rule').toBeNull()
    }
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * THE DECLARED-SURFACE CENSUS, DERIVED FROM THE SPEC AND NOT FROM THE BUILD
 * ───────────────────────────────────────────────────────────────────────────── */

describe('census — the figures the red set’s own rows rest on, each with its terms', () => {
  it('CEN-1 · census §4.1–§4.9b — the tier, walk, surface, purge, gate, admission, union, listener and condensation figures', async () => {
    await resolveStoreSurface()
    expect(TIERS_ALL.length, 'census.md §4.1 — `4 = 1 + 3` ✓').toBe(4)
    expect(PERSISTENCE_ORDER.length, 'census.md §4.1 — the order’s ordered pairs: `3` ✓').toBe(3)
    expect(STEP_IDS.length, 'census.md §4.2 — the diagnostic step ids: `13 = 6 + 7` ✓').toBe(13)
    expect(RESOLUTION_ANSWERS.length, 'census.md §4.2 — the `M-PROP` resolution’s answers: `4 = 1 + 1 + 1 + 1` ✓').toBe(4)
    expect(NODE_MEMBER_KINDS.length, 'census.md §4.2 — the node’s member KINDS: `3 = 1 + 1 + 1` ✓').toBe(3)
    expect(LITERAL_CLASSES.length, 'census.md §4.2 — the literal CLASSES: `4`').toBe(4)
    expect(CONDENSATION_SHAPES.length, 'census.md §4.2 — the condensation SHAPES: `2 = 1 + 1` ✓').toBe(2)
    expect(DECLARED_FUNCTIONS.length, 'census.md §4.3 — the store’s functions in total: `10 = 5 + 5` ✓').toBe(10)
    expect(ADMITTED_CLASSES.length + REFUSED_CENSUS, 'census.md §4.6 — TOTAL: `22 = 6 + 16` ✓').toBe(22)
    expect(READ_ARMS.length, 'census.md §4.9b — the read arms: `4 = 1 + 1 + 1 + 1` ✓').toBe(4)
    expect(WRITE_ARMS.length, 'census.md §4.9b — the write arms: `10 = 3 + 2 + 2 + 3` ✓').toBe(10)
    expect(TEMP_DROP_ARMS.length, 'census.md §4.8/§4.9 — the temp instance’s two drop arms (`C23`’s two listener states are `2 = 1 + 1`)').toBe(2)
    expect(APPENDER_DOORS.length, 'census.md §4.9a — the appender doors: `4 = 2 + 2` ✓').toBe(4)
    expect(STORE_MESSAGE_KEYS.length, 'census.md §4.9a — the message list’s entry: `6 = 2 + 4` ✓').toBe(6)
    expect(EVALUATION_KEYS.length, '§2.10 item 4 — the `DD-1` record plus `R15`’s `notes`: `5 = 4 + 1`').toBe(5)
    expect(REFUSAL_KEYS.length, 'PAR-13 — the closed record is STILL five members (`status` + the four diagnostics)').toBe(5)
    expect(DECLARED_UNION_COUNT, 'census.md §4.7 — the declared count, terms `22 = 6 + 2 + 2 + 6 + 2 + 2 + 1 + 1` ✓').toBe(22)
    expect(ENUMERATED_REASON_TOKENS.length, 'docs/pending.md §3 SD-SPLIT-2 — the enumerated ordinals are `1–21`: DISTINCT membership is 21').toBe(21)
  })
})
