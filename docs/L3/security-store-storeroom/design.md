# L3 — `src/main/operator-settings/`: the instance

- **Layer:** L3 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 2 · **Artifact:** `security-store-storeroom-l3-design`
- **Status:** DESIGN — structure, private helpers, pseudocode and guardrail notes for one owner; the declared surface is `signatures.md` §2, the contract is `docs/L2/security-store-storeroom/interface.md` §1-§3 and `behaviour.md` §1-§8 (rev 2)
- **Charter:** D-16 rebuilt wholesale and MCP-isolated · D-17 the state machine under the operator's surface · D-18 one operator-only reference · D-19 import once, then own a new shape · D-13 its own on-disk shape
- **Ceiling:** 150 lines, class max (D-1) · `guide §n` is `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The shape

| what | the decision | cite |
|---|---|---|
| files | **one**: `src/main/operator-settings/index.ts` — nothing is created beside it | interface §2; D-16 |
| held state | **no copy of the record**: `read()` projects the store at each call. The one held value is the import overlay, which answers only while the record address carries nothing | guide §9.2; persistence §3; ASM-1 |
| the store | one `storeCreate` with `listeners: []`, no `constraints`, one `filePath` under the caller's `userDataDir` | interface §2.1; guide §3.1 |
| a transition | **one** `write` at the one address the patch names — one op, one cursor, one receipt | guide §4 arm `W-4`; interface §1 |
| file effects | none of the module's own: no `.tmp`, no lock, no sidecar, no `mkdir`, no `rename`, no `delete`, no `rollback`, no second name | persistence §5; D-13 |
| `fs` | exactly one call, `readFileSync`, inside the import path; every other file effect is the store's | persistence §2; D-19 |
| throws | none — for any patch, any listener and any state | interface §2; L1 §3 |

## 2. The two addresses, and why each transition is one write

| address | tier | the value written whole | the act that writes it | cite |
|---|---|---|---|---|
| `['operator-settings']` | `file` | an object of the durable members: `enabled` always, `token` and `maxJournalLength` **only while they stand**, `entries` **iff it stands** | `write({token\|enabled\|maxJournalLength\|entries})` | guide §4 `W-4`, §10.2; persistence §4 |
| `['operator-exclusion']` | `mem` | `{exclusion}` alone — `tier4` is **derived at the read** and never stored, so the illegal pair is unspellable | `write({exclusion})` | interface §1; `src/main/security.ts:98-101` |

- **Two addresses, and the measurement is why**: a `file`-tier write purges the versions it outranks **at its own key**, so one address would let a settings commit reset the operator's exclusion pair (guide §5.1; interface §1 `ASM-L2-1`; persistence §9 P-3).
- **A patch names one tier** — the durable members **or** `exclusion`; one naming both is refused as a value with no store call (interface §1 `ASM-L2-5`; ASM-2 below).

## 3. The private helpers (never exported — the product is the whole surface)

| helper | what it does | cite |
|---|---|---|
| `VALID_GROUPS` | the group set's **second live copy**, six members — `read`·`dispatch`·`graph`·`code`·`module`·`data` — re-homed here with the file, read at the **two** filter sites: the patch's `enabled` and the import's `enabled` | D-11, D-15; exception §2 E-1; the deleted `src/main/security-store.ts:87,122,339` |
| `FIRST_RUN` | `{token:null, enabled:['read','dispatch']}`, no cap, no `entries` — the answer over no file and over every import failure arm | L1 §5; behaviour §1, §3 |
| `SAFE_PAIR` | `{exclusion:'mcp-enabled', tier4:false}` — what a boot, a crash, a torn record and a corrupt file all resolve to, because the pair is `mem` | interface §1 `ASM-L2-2`; `src/main/main.ts:109-113` |
| `detach(value)` · `newMap()` | the copy discipline both ways: arrays as real arrays, maps built with `Object.create(null)` so an entry named `__proto__` lands as an **own data property** and survives to the bytes and across a re-read; cycle-safe, each member read once | guide §10, §10.1; the deleted `src/main/security-store.ts:131-141,243-260` |
| `admitGroups(list)` | first occurrence first, in the caller's own order, a non-group string dropped, never re-sorted into `VALID_GROUPS` order | interface §2 `A-5`; the deleted `src/main/security-store.ts:122,339` |
| `toStored(record)` | the value that crosses: a **cleared member is written as its absence**, because the walk refuses `null`/`undefined` anywhere in a value | guide §10.1; persistence §4 |
| `fromStored(value)` | the read-back mapping: no `token` → `null`, no `maxJournalLength` → `undefined`, no `entries` → absent; a member failing its rule falls to its first-run value | interface §2; the deleted `src/main/security-store.ts:112-142` as behaviour |
| `importOnce(dir)` | the six-arm boot import of §7, reading `<dir>/provident-security.json` **once** and writing nothing | D-19; interface §2.1 |
| `receiptOf(record)` | `{status:'committed', cursor:<op.seq>, opId:<op.opId>}` — the store's own ordinals **verbatim**, no offset and no renumbering | interface §2 `ASM-L2-7`; guide §6.4 |
| `refusalOf(caught, address)` | the store's `status`, `message` and `address` **verbatim**; a caught value carrying no string `status` → `reason:'UnattributedFailure'` with its own message, contained | interface §3; guide §8, §8.3 |
| `cap(journalLength)` | a positive integer: `Math.floor` of a supplied finite positive number, else **256**, because the store's required key cannot be absent | guide §3.1; ASM-3 |

## 4. Construction, and the arm where the store refuses to stand

```
createOperatorSettings({ userDataDir, journalLength }):
  filePath ← join(userDataDir, FILE_NAME)                                  · interface §2.1; D-13
  try store ← storeCreate({ journalLength: cap(…), listeners: [], filePath })
  catch caught → refusal ← refusalOf(caught, null); no instance stands      · guide §8.2
  if an instance stands:
      overlay ← RECORD_ADDRESS carries nothing ? importOnce(userDataDir) : nothing   · persistence §3
  return the product over (store, overlay, refusal)
```

- **The construction creates the file exclusively, zero-length and empty where it is absent, and truncates nothing where it stands** — that is the store's act, not this module's (guide §9.1; interface §2.1; persistence §2).
- **A refused construction throws nothing across this boundary**: no instance, no file, no directory and no byte; `read()` answers `FIRST_RUN` with `SAFE_PAIR`, every later `write` answers `FilePathUnreachable`, and `subscribe` answers a withdrawal that withdraws nothing (interface §2.1; guide §8.2; ASM-4).
- **The boot is read-only and the import runs only on a standing instance**: construction, the record-address probe and the import write no byte beyond the store's own exclusive create, and an instance that does not stand has no address to read as its marker (interface §2.1; persistence §2, §3).

## 5. `read()` — the projection, and the two read arms that are not refusals

```
read():
  durable ← try store.read(RECORD_ADDRESS, 'file') catch → nothing   · guide §4: AddressNotFound is a read arm
  pair    ← try store.read(EXCLUSION_ADDRESS, 'mem') catch → nothing · guide §5.2: TierNotFound is a read arm
  file    ← durable is a plain object ? fromStored(durable) : overlay ?? FIRST_RUN
  exclusion ← pair is a plain object and names a literal ? pair.exclusion : SAFE_PAIR.exclusion
  return { …file, exclusion, tier4: exclusion is 'mcp-disabled' }    · interface §1
```

- **`AddressNotFound` and `TierNotFound` are read arms, never refusals**, and **any other read failure resolves to the same defaults and throws nothing**: a read moves nothing and a refusal has no channel on this surface, so neither appears in the value (interface §2; guide §4, §5.2; L1 §3).
- **The overlay answers only while the record address carries nothing**, so a profile whose operator never writes re-attempts at every boot while no record stands and answers the same record (persistence §3; behaviour §3).
- **Two reads, one synchronous turn, no `await` between them**, so the record and the pair a carrier sees in one answer are never two states of one act; and the answer is detached at every depth by construction, because `fromStored` builds fresh containers and `newMap` gives the `entries` map a null prototype (guide §5.1, §10; ASM-1; the deleted `src/main/security-store.ts:231-260`).

## 6. `write()` — one admission, one call, one receipt

```
write(patch):
  values ← read each declared member ONCE off the patch, inside one try/catch   · the deleted security-store.ts:341-354
  if the patch is not a plain object, or names both tiers → refused(ValueRefusedAtBoundary, null)   · ASM-2
  case durable:
      candidate ← toStored(current projection with token/enabled/cap/entries from values)
      try record ← store.write(RECORD_ADDRESS, 'file', candidate)          · guide §3.3: no commit position
      catch caught → return refusalOf(caught, RECORD_ADDRESS)
      return receiptOf(record)                                            · guide §6.4
  case exclusion ∈ the two literals:
      try record ← store.write(EXCLUSION_ADDRESS, 'mem', { exclusion })    · one mem write
      catch caught → return refusalOf(caught, EXCLUSION_ADDRESS)
      return receiptOf(record)
  otherwise → refused(ValueRefusedAtBoundary, null)                       · interface §2
```

- **Two admission layers, each with its own subject and no duplication**: this module admits the **member domains** (a `token` that is a string or `null`, an `enabled` array, a finite cap or `null`, an `entries` plain object, one of the two literals); the **package's walk** admits the **value**, so a cycle, a function, a symbol, a lone surrogate, a non-finite number, a `-0` or a node past the two ceilings answer `ValueRefusedAtBoundary` from the store and cross verbatim (guide §10.2, §10.3; interface §3; ASM-5).
- **`maxJournalLength`'s clear arm is `null`**, and the durable member is a `> 0` floored number or absent — `NaN` and a non-positive value clear it, `±Infinity` refuse the patch (interface §2; behaviour §2; the deleted `src/main/security-store.ts:365-377` carried).
- **`enabled` is served in the caller's own order**, first occurrence first — the order row discriminates against a re-sort (interface §2 `A-5`; behaviour §2).
- **A refusal leaves the record and the bytes exactly as they stood, mints no cursor and delivers nothing**, and its `reason` is the store's own status **verbatim under the open escape arm** — never narrowed to a spelling this surface does not name, and a sentence is authored here only for a refusal this module makes itself (interface §3; guide §9.4, §8.1; behaviour §5; ASM-6).

## 7. The import-once path — six arms, one name, and the marker

```
importOnce(dir):
  try text ← readFileSync(join(dir, RETIRED_NAME), 'utf8')      · D-19: the module's ONE fs call
  catch → nothing                                              · arms 1 and 5: absent, directory, unreadable
  try parsed ← JSON.parse(text) catch → nothing                · arm 3: unparsable
  if parsed is not a plain object → nothing                    · arm 4: an array, a string, a number, a boolean
  record ← FIRST_RUN with each declared member admitted by its own rule
  map ← newMap(); a declared `entries` plain object copies in member by member   · arm 6: any other value → absent
  every foreign top-level name copies in under its own name, verbatim            · arm 2: preserved, never dropped
  return { …record, entries: map carries a name ? map : nothing }
```

- **Six arms, each answering without a throw**: absent, an object, unparsable bytes, a non-object, a directory or an unreadable file, and `entries` not a plain object — the last the one declared non-verbatim arm (interface §2.1; behaviour §3; the deleted `src/main/security-store.ts:112-142`).
- **The marker is the absence of a record at the record address**, so there is no version member, no second written name and no repair of the retired file; **the retired name is read only until a record stands and never written, renamed, repaired or deleted**, its bytes standing as seeded (persistence §3; guide §9.1; D-19; L1 §5).
- **Ingested values cross as data and not as an admission**: a `JSON.parse`d value is representable by construction, so no per-entry admission runs at boot (the deleted `src/main/security-store.ts:108`; guide §10.4).

## 8. The listener registry — one handle per subscription, per address

```
subscribe(listener):
  if no instance stands → answer a withdrawal that withdraws nothing        · interface §2; ASM-4
  handles ← one per address: handleFor(address, seq++) = 'operator-settings:' + seq + '@' + key   · guide §6.1
  for each address a: listen(handles[a], [a]) and register(handles[a], address => {   · §6.1 ONE address; §6.2
      try listener(detach(address)) catch → withdraw both }) catch → withdraw both   · ASM-L2-6; guide §6.5a
  return () => withdraw both                                                 · guide §6.2: one unlisten each
```

- **One handle per subscription PER ADDRESS — two handles, and never one handle whose set names both** (ASM-7): a second `register` on one handle replaces the first, so two subscriptions are two handle pairs, and the withdrawal is `unlisten` **over a one-address handle**, which is the arm the package silences correctly — a plain no-op success over a handle already withdrawn, so calling the answered withdrawal twice is harmless (guide §6.2; behaviour §5; P-6).
- **P-6 — `unlisten` does not withdraw a handle bound at TWO addresses; upstream-owned, never patched here (D-5).** *Symptom:* a handle whose `listen` set names two addresses keeps firing for one of them after `unlisten(handle)`, while a one-address handle is silenced. *Reproduction:* `listen('h', [['operator-settings'],['operator-exclusion']])`, `register('h', fn)`, `unlisten('h')`, then a write at each address — `fn` still fires for one; reproduced at this head by this unit's L3 test writer on `provident-storeroom ^1.6.1`, where `removeListener('h')` and `listen('h', [])` both silence it. *Suspected root cause:* the withdrawal is keyed per store-side entry while the registry entry is removed only where the identity stands nowhere (guide §6.2), so one surviving entry keeps the handle live. *Proposed fix shape:* make `unlisten` withdraw every store-side entry the identity holds, or declare the one-entry-per-call reading at its own line (guide §6.2, §6.3). **This design depends on P-6 outright**: ASM-7's two one-address handles are the whole of the withdrawal, and a handle whose set names both addresses is a defect at L4 (D-5; ASM-7).
- **The delivery's one argument is the address, never the value**, so a subscriber learns *that* an address moved and reads the record for what moved; one handle stands at each address, so the touched address's own handle is the one delivered and each act is still one delivery (guide §6.3, §6.4; exception §8 item 2; behaviour §5).
- **A throw is contained inside this module's own listener body and the subscriber is withdrawn WHOLE — both its handles**: the write still answers its receipt, because a listener's throw would otherwise take the answer away after the data landed (guide §6.5a; `ASM-L2-6`; behaviour §6).

## 9. Guardrails for L4

- No file write of the module's own, no `.tmp`, no lock, no sidecar, no `delete`, no `rollback`, no constraint registered and no `commit` position supplied; and no throw for any patch and any state, every caught value contained and every arm answering a receipt (D-16; interface §2; guide §3.3, §8.3; L1 §3).
- No MCP surface, resource, `RpcMethod` member, bridge channel or rendered element: the module is reached by the surface module alone (D-18; L1 §6).
- No second `filePath`, no second construction, no other module's file name; and `VALID_GROUPS` stays six and stays here — the group set's first copy in `src/main/security.ts:159` does not move (persistence §8; D-11, D-15; exception §2 E-1).

## 10. Assumptions made here that L2 left open, with the alternative each rejected

| id | assumption | the rejected alternative |
|---|---|---|
| ASM-1 | the record is a **projection** re-derived from the store at every `read()`, not a live copy advanced on commit | a cached copy advanced only on a committed receipt, which a subscriber's in-delivery `read()` would serve stale — the commit resolves before its delivery runs (guide §6.5a, §9.2) |
| ASM-2 | a patch naming **both** tiers is refused as a value with no store call | splitting it into two writes, which is two receipts or a landed-then-refused tear (interface §1 `ASM-L2-5`) |
| ASM-3 | `journalLength` defaults to **256** when the caller supplies none | passing nothing, which the store's required positive-integer key cannot receive (guide §3.1) |
| ASM-4 | with no instance standing, `read`/`write`/`subscribe` answer `FIRST_RUN`/`FilePathUnreachable`/a no-op withdrawal and never throw | a construction that throws, which puts a refusal across a boundary L1 §3 forbids |
| ASM-5 | the module admits **member domains** and lets the **store's walk** admit the value | re-implementing the representability walk here as the displaced file did, which is a second admission rule to keep in step with the package's (interface §3; guide §10.2) |
| ASM-6 | the module authors the sentence only for a refusal it makes itself | re-spelling a store refusal's generated sentence, which gives one refusal two spellings |
| ASM-7 | `subscribe` binds **one handle per address** — two `listen` calls, a one-address set each, and one `unlisten` per handle at withdrawal — and no handle carries a two-address set | one handle naming both addresses and withdrawn with `unlisten` alone, which leaves a live delivery after `off()` (P-6); or the assignment arm `listen(handle, [])` before `unlisten`, which is inside the census but leans on P-6's own entry-removal half and leaves the registry entry standing until the second call lands (guide §6.1 rule 3, §6.2) |
