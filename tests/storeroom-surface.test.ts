// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/storeroom-surface.test.ts — THE STOREROOM IMPORT SEAM: what the app gets when it imports
// `provident-storeroom`, pinned so a version drift is a red row here rather than a surprise later.
//
// AUTHORED BEFORE `src/main/storeroom.ts` EXISTS (the gate-3 order: the red set is RUN and
// REPORTED first). The declared surface is the one the package's own `index.d.ts` carries and
// the one the 1.6.x review measured; every figure below is a LITERAL, not a derivation.
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'
import { storeCreate } from 'provident-storeroom'

import { createProfileStore, STOREROOM_DECLARED_SURFACE } from '../src/main/storeroom'

/**
 * The package types a constraint body's context as `unknown` (`index.d.ts`, `export type Constraint`),
 * so a typed consumer narrows it. This file reads two members and no more.
 */
type PairContext = { readonly value?: unknown; readonly tier?: unknown }
const ctxOf = (ctx: unknown): PairContext => ctx as PairContext

const MEMBERS = [
  'read',
  'readLiteral',
  'readTiered',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
  'constraints',
  'removeListener',
  'removeConstraint',
  'register',
] as const

const LOG_ENTRY_KEYS = ['kind', 'id', 'opId', 'message', 'state'] as const

function fresh() {
  return storeCreate({ journalLength: 400, listeners: [], constraints: [] })
}

describe('S-1 — the seam module is what the app imports', () => {
  it('S-1.1 — `src/main/storeroom.ts` exposes `createProfileStore` and the declared surface census', () => {
    expect(typeof createProfileStore).toBe('function')
    expect(STOREROOM_DECLARED_SURFACE.members).toEqual([...MEMBERS])
    expect(STOREROOM_DECLARED_SURFACE.memberCount).toBe(15)
  })

  it('S-1.3 — package.json pins the reviewed package, and the pin is a caret RANGE so a patch fix lands'
    + ' without a repo change', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as
      { dependencies: Record<string, string> }
    // **`2.0.0` IS THE PIN, AND THE PIN IS STILL A CARET RANGE** (`D-219`) — **THE REVIEWED PACKAGE MOVED `1.12.0` →
    // `2.0.0`, AND THIS TIME THE CARET DID NOT ADMIT IT**: `2.0.0` is a MAJOR, so the adoption moved the RANGE as well as
    // `package-lock.json`, and the figure below moved because a REVIEW adopted it (`D-310`, verbatim: *"Adopt now: pin +
    // rev 10"*) and never because a resolver's discretion reached past the pin. **THE FIGURE IS RE-GRAINED HERE ON
    // PURPOSE, BECAUSE A PIN THAT MOVES SILENTLY IS THE DEFECT THIS ROW EXISTS TO CATCH** (`D-310` is the row this
    // re-grain belongs to, and it is cited as the row and not by offset, `D-41`). **THE CLAIM IS STILL WRITTEN ON THE
    // RANGE AND NEVER ON A LOCKED VERSION**, for the reason the paragraph at the foot of this row states: a caret landing
    // a later release must not red the row that exists to bless it (`D-298`'s rule, unmoved by this move).
    // **THE REVIEW'S FIVE MOVES ARE THE REASON THE FIGURE MOVES** — `node_modules/provident-storeroom/RELEASE-NOTES.md`
    // §2.0.0 and `strata/records/storeroom-2.0.0-research.md`'s fact base, read at the INSTALLED `2.0.0`:
    //   (1) **`record.op.compacted` REMOVED** — a journal record's member set narrows; the app's reader of the store's own
    //       journal is `src/main/storeroom.ts` (`D-103`), and a member it read would be the site that reds.
    //   (2) **THE LISTENER-RETURN RECEIPTS.** `returnedValues` (one entry per handle whose body RETURNED A VALUE, the
    //       entry being the SETTLED value) and `bodyFailures` (one entry per REJECTING body, `{status, message,
    //       address}`) are NON-ENUMERABLE, `configurable` own getters over symbol-keyed data, installed on all three
    //       records — write, delete and rollback — so **`Object.keys` is unmoved and `Object.getOwnPropertyNames` reads
    //       SEVEN** (`index.d.ts:840`, `:879`, `D-150` item 1). Both are present on every arm and answer one shared
    //       frozen `{}` where nothing stands.
    //   (3) **RANK 23 `ListenerBodyRejected`** — the 23rd literal of `StoreStatus` (`index.d.ts:529`), and **no rank of
    //       `1`…`22` moves**. The type's own last algebra still reads "twenty-two, ranked `1`…`22`", one amendment behind
    //       its own union: a PACKAGE drift, recorded upstream-owned and never patched here (`D-5`, `D-52`).
    //   (4) **THE SETTLE-BEFORE-ANSWER ARM.** An act's answer is withheld until its delivered set settles — conditional
    //       on a STARTED body's answer carrying a callable `then`, and only at `write`/`delete`
    //       (`src/entry/delivery.mjs:323-407`) — so a promise-returning listener body is SETTLED rather than refused,
    //       and its rejection becomes a datum the act resolves with.
    //   (5) **THE JOURNAL BOUNDED, AND THE WEBASSEMBLY SIBLING.** `@auspicion/provident-storeroom-js-wasm` is a SIXTH
    //       artefact and a SECOND package, version-coupled to the five siblings, shipping NOTHING inside
    //       `provident-storeroom`, whose namespace keeps its ONE name (`storeCreate`); the browser-side store joins the
    //       modularity design as an electron-vs-node parity concern (`D-310`).
    // **AND NO MEMBER COUNT MOVED WITH `2.0.0`** — the module namespace keeps its one name, the instance's own member set
    // stays fifteen and `readTiered` stays THIRD in its order — **re-verified below at the installed `2.0.0` rather than
    // assumed**, so `S-1.1` and `S-1.2` still read fifteen.
    // **THE PIN IS A REVIEWED PIN AND NOT A RESOLUTION FLOOR** (`D-41`'s site; `D-68` states it verbatim for the `^1.6.2`
    // move — *"so the pin is a REVIEWED pin (D-41's site) and not a resolution floor"*). The caret landing a release is what
    // the caret DOES; what this row asserts is what a reviewer ADOPTED. **So the reviewed package is `2.0.0` and the figure
    // follows the review, never the resolver's discretion.**
    // **AND `1.12.0`'S OWN REASON, KEPT AS THE READING IT WAS** (`D-46`; `D-298` is the row that move belonged to) —
    // `node_modules/provident-storeroom/RELEASE-NOTES.md`
    // §1.12.0, in its own words (its section head states the class: *"a MINOR — the `require` route into the one claimed
    // realm: a third condition on the one `exports` arm, naming the SAME `./index.mjs`, and a floor that moves `>=18.0.0`
    // → `>=22.12.0` on all six manifests — one line, two moves"*):
    //   (1) **THE `require` CONDITION.** `exports["."]` gains `"require": "./index.mjs"` as the THIRD condition, AFTER
    //       `types` AND `import`, naming the SAME ESM entry the `import` condition names — so **`require('provident-storeroom')`
    //       NOW LOADS**, through Node's own `require(esm)` interop (§1.12.0's consumer list item 2: on `1.11.0` the map
    //       resolved no arm for that specifier and the loader answered `ERR_PACKAGE_PATH_NOT_EXPORTED`). That is the finding
    //       `D-297` recorded here as upstream-owned and refused to patch (`D-5`, `D-52`), answered upstream at this pin: a
    //       ROUTE into the one claimed realm, not a second realm.
    //   (2) **THE FLOOR, AND IT IS THE BREAKING HALF.** `"engines": { "node": ">=22.12.0" }` on the main manifest AND on the
    //       five platform manifests (§1.12.0 item 3: *"THE FLOOR MOVES `">=18.0.0"` → `">=22.12.0"`, AND THAT IS THE
    //       BREAKING HALF"*) — the one comparator set under which the declared route is true at every admitted version.
    //       **NO ROW IN THIS MODULE ASSERTS THE PACKAGE'S OWN FLOOR**, which is why this move reds nothing below; it is said
    //       here so that a later pass which wants the floor pinned ADDS a row and does not narrow this one.
    //   (3) **THE ABSENCE OF A CJS BUILD.** No `main`, no `default`, no `.cjs`, no wildcard, no second subpath, no second
    //       build, no dual-package hazard: *"the one file is reached by two of Node's specifiers for it"* (§1.12.0 item 4).
    //       So nothing this tree ships changes shape for it — the app's entry is ESM (`D-297`'s answer to the fork) and the
    //       `require` route is the package's to serve, not this repo's to shim.
    // **AND NO MEMBER COUNT MOVED WITH `1.12.0`** — §1.12.0's "what does not move" list keeps *"the module namespace's one
    // name (`storeCreate`)"*, *"the instance's own member set"*, *"every record, status and message"* and *"the `files`
    // allowlist's seven rows"*; **re-verified rather than assumed then on the installed `1.12.0`, and re-verified AGAIN at
    // `2.0.0` for this row's own move**, so `S-1.1` and `S-1.2` read fifteen and `readTiered` sits THIRD in the instance's
    // own order (measured: `read`, `readLiteral`, `readTiered`, `write`, …).
    // **AND THIS ROW CARRIES A RANGE ASSERTION AND NO LOCKED-VERSION ASSERTION, DELIBERATELY — THEY ARE TWO DIFFERENT
    // CLAIMS AND ONLY ONE OF THEM IS A PIN.** `package.json`'s `^2.0.0` is the REPO'S DECISION; the locked `2.0.0` in
    // `package-lock.json` (and in `node_modules/provident-storeroom/package.json`) is WHAT IS ON THIS DISK. A row that
    // pinned the latter would red on precisely the event this row exists to bless — a caret landing a later release
    // without a repo change — so the installed version is measured where it is the subject and where it can be measured
    // live: `S-1.1` and `S-1.2` above (the instance's own member census, from the constructed store) and the e2e `S-9`
    // (that census's own two DECLARED figures, `15` members and `13` symbols — `S-9` reads the declaration, not a live
    // enumeration). **AND A MEASUREMENT TAKEN HERE IS RECORDED BESIDE THOSE TWO RATHER THAN FOLDED INTO THEM — RESIDUAL,
    // ROUTED, NOT THIS ROW'S SUBJECT**: a fresh construction on the installed `1.12.0` answers **`14` own symbols**
    // (`getOwnPropertySymbols`, two of them enumerable) and **`15`** after the first `write`, where the census declares
    // `13` at construction and `14` after a write — one behind on the same axis, on a figure whose last re-read was
    // `1.10.0`'s and which no row measures live. **IT IS NOT `1.12.0`'s MOVE** (§1.12.0 lists no instance-member change
    // and names no symbol), and the constant is `src/main/storeroom.ts`'s, which this layer never edits. **A future pass
    // that WANTS the locked version pinned must add a SECOND row and say so; it must not narrow this one.**
    // *What stood before, kept as the readings they were* (`D-46` — an offset is a date, not a claim): **`1.11.0` WAS THE
    // PIN** (`D-219`), and its reading stands as the reading of that date: the MINOR the caret admitted, and **THE MINOR WAS
    // NOT A PATCH AND DID CARRY BEHAVIOUR CHANGES, SO THREE ROWS RE-GRAINED WITH IT AND THIS ONE DID NOT HAVE TO**
    // (`RELEASE-NOTES.md` §1.11.0: a `cfg.listeners[]` element now REQUIRES its `listener` — a two-member element is
    // refused `AddressMalformed`, subject `listeners`, before any filesystem act — and a boot over a corrupt image now
    // REFUSES at rank `22` `FileImageRefused` rather than opening a store over it). **AND THE MEMBER COUNTS DID NOT MOVE
    // WITH IT**: §1.11.0's own "what does not move" list keeps *"the instance's own member set stays fifteen"*, so `S-1.1`
    // and `S-1.2` read fifteen under it as well. **Before it, `1.10.0` WAS THE PIN** (`D-134`) — the release whose ONE
    // addition is the third read verb `readTiered`, which answers the durability tier at every node it returns, and
    // **THE MEMBER COUNTS DID MOVE WITH IT, WHICH `1.9.3`'s DID NOT**: the fourteen became fifteen and `readTiered` sits
    // THIRD in the instance's own order (measured: `read`, `readLiteral`, `readTiered`, `write`, …), so `S-1.1` and `S-1.2`
    // read fifteen. **Before it, `1.9.3` WAS THE PIN** — the release that makes the kernel's TWO instants
    // agree: the registration instant reads a returned outcome's `message` and `repair`, and a repair's return's
    // `ok`, as OWN members, exactly as the write's own evaluation reads them, so a member carried on a prototype
    // is a member neither instant reads — the divergence this repo filed as `ST-F1`, never patched here (`D-5`)
    // and discharged upstream at that release (`D-109`). **AND THE TWO MEMBER COUNTS ABOVE DID NOT MOVE WITH
    // IT** — `1.9.3` adds no name and no symbol, which is why `S-1.1` and `S-1.2` read the same fourteen (`D-109`).
    // In every one of those moves the figure moved for the reason this row states: the pin follows the reviewed install,
    // never the other way.
    expect(pkg.dependencies['provident-storeroom']).toBe('^2.0.0')
  })

  it('S-1.2 — the store `createProfileStore` returns IS a storeroom store, member for member', () => {
    const store = createProfileStore()
    const own = Object.getOwnPropertyNames(store)
    expect(own).toEqual([...MEMBERS])
    expect(own).toHaveLength(15)
  })
})

describe('S-2 — the refused form is the four-member literal, and its `address` names the refused act', () => {
  it('S-2.1 — a refusal of the caller\'s OWN act names the caller\'s address', () => {
    const store = fresh()
    store.write(['q'], 'mem', 5)
    store.addConstraint({ address: ['q'], id: 'no-nine' }, (ctx) =>
      ctxOf(ctx).value === 9 ? { message: 'nine is refused at q' } : true,
    )
    let refusal: unknown = null
    try {
      store.write(['q'], 'mem', 9)
    } catch (e) {
      refusal = e
    }
    const form = refusal as {
      status: string
      message: string
      log: readonly Record<string, unknown>[]
      address: readonly (string | number)[]
    }
    expect(form).not.toBeNull()
    expect(Object.getOwnPropertyNames(form)).toEqual(['status', 'message', 'log', 'address'])
    expect(form.status).toBe('ConstraintPassRefused')
    expect(form.address).toEqual(['q'])
    // The refused value does not stand — the per-op floor is reached.
    expect(store.read(['q'])).toBe(5)
  })

  it('S-2.2 — a refusal crossed from a LISTENER names the listener\'s address, never the caller\'s, and the caller\'s own act stands', () => {
    const store = fresh()
    store.write(['b'], 'mem', 1)
    store.write(['a'], 'mem', 5)
    const w2 = store.write(['a'], 'mem', 7)
    // THE REGISTRATION EVALUATION IS A REAL ASK (host 4, the declared unjudged window): the
    // body also runs when the pair is registered, against the state the pair is registered AT.
    // A body that refuses unconditionally therefore refuses its own registration. The first
    // ask is admitted here so that the refusal under test is the DELIVERY's.
    let asks = 0
    store.addConstraint({ address: ['a'], id: 'no-five' }, (ctx) => {
      asks += 1
      if (asks === 1) return true
      return ctxOf(ctx).value === 5 ? { message: 'five is not admitted at a' } : true
    })
    store.listen('L', [['b']])
    store.register('L', () => {
      try {
        store.rollback(w2.op.opId)
      } catch {
        /* the raise's own answer is not this row's subject */
      }
    })
    let refusal: unknown = null
    try {
      store.write(['b'], 'mem', 2)
    } catch (e) {
      refusal = e
    }
    const form = refusal as { status: string; address: readonly (string | number)[] }
    expect(form).not.toBeNull()
    expect(form.status).toBe('ConstraintPassRefused')
    // THE DEF-AU PIN: the refusal names `a`, the listener's act — NOT `b`, the caller's.
    expect(form.address).toEqual(['a'])
    // ...and the caller's own admitted write to `b` therefore stands.
    expect(store.read(['b'])).toBe(2)
  })
})

describe('S-3 — the log entry is the five-key record, and its size is bounded', () => {
  it('S-3.1 — a log entry carries exactly `kind, id, opId, message, state` and NEVER a `seq` (D-65)', () => {
    const store = fresh()
    store.write(['q'], 'mem', 5)
    store.addConstraint({ address: ['q'], id: 'no-nine' }, (ctx) =>
      ctxOf(ctx).value === 9 ? { message: 'nine is refused at q' } : true,
    )
    let refusal: unknown = null
    try {
      store.write(['q'], 'mem', 9)
    } catch (e) {
      refusal = e
    }
    const log = (refusal as { log: readonly unknown[] }).log
    expect(log.length).toBeGreaterThan(0)
    for (const entry of log) {
      expect(Object.keys(entry as object)).toEqual([...LOG_ENTRY_KEYS])
      expect('seq' in (entry as object)).toBe(false)
    }
  })

  it('S-3.2 — a deep chain of throwing bodies keeps every log entry bounded (the DEF-AR pin: 196 chars at depth 28)', () => {
    const store = fresh()
    let depth = 0
    const N = 28
    // **THE RETURN IS ANNOTATED `true` BECAUSE `1.9.0` CLOSED THE BODY'S ARM SET**: at `1.7.0` a constraint body was
    // declared `(context: unknown) => unknown` and an inferred `boolean` assigned; `1.9.0` declares
    // `Constraint = (context: AttemptContext) => ConstraintOutcome`, whose pass arm is the LITERAL `true`, so a helper that
    // could return `false` no longer assigns. Nothing about the drive changes — this body has only ever returned `true`
    // on the arm that does not throw — and the widened return was the type's looseness, not the row's intent.
    const throwOnce = (): true => {
      depth += 1
      if (depth <= N) {
        try {
          store.write(['c', String(depth)], 'mem', depth)
        } catch {
          /* the inner refusal crosses as a throwable; its own answer is not this row's subject */
        }
        throw new Error('X'.repeat(1 << 16) + String(depth))
      }
      return true
    }
    store.addConstraint({ address: ['c'], id: 'c0' }, (ctx) => (ctxOf(ctx).value === 1 ? throwOnce() : true))
    let refusal: unknown = null
    try {
      store.write(['c', '0'], 'mem', 1)
    } catch (e) {
      refusal = e
    }
    const form = refusal as { status?: string; message?: string; log?: readonly { message?: string }[] }
    expect(form).not.toBeNull()
    const longest = Math.max(
      String(form.message ?? '').length,
      ...(form.log ?? []).map((e) => String(e.message ?? '').length),
    )
    // A serialisation of the inner throwable would be tens of thousands of characters; a
    // summary is hundreds. The ceiling is generous on purpose — it pins "bounded", not a number.
    expect(longest).toBeLessThan(4096)
  })
})
