# L3 — `renderer-wiring`: the module design

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 6 — rev 2 was re-issued on its examiner's report; rev 3 carried
  the amendment an L4 `D-45` FAIL forced; rev 4 settled §2 `S10` (the refusal is the writer's LEDGER, widened) and that licence STANDS; rev 5 stated `refused`'s PRESENCE as the landed bodies implement it and licenced the two comments that still asserted the replaced rule; **rev 6 is the CURRENCY pass `D-143`'s `STALE` routed here (`strata/records/focus-retirement-walkthrough.md` §3): §2's `S4`/`S5` row now says what §2's own two-words sentence says — a non-string `target` is THIS ROUTE's `refused` value (`:848`), never the tool's, and the tool's own class is exactly one, its argument HOLDER before any invoke (`src/main/mcp-server.ts:157`–`:169`) — and §7's licence items read LANDED at their sites rather than as instructions (D-41, D-1).**
- **Inputs:** `docs/L2/renderer-wiring/interface.md` rev 2 §1–§7 (its §2 arms, whose refusal-class row rev 2 re-grained to the bytes §2 of this file now states, §3 `composeRecord`, §7 `ASM-4`/`ASM-5`); `docs/L1/focus-retirement.md` §2, §3, §4's
  second table, §6 `E-1`/`E-12`; D-142 (its last paragraph settles shape `(b)`), D-141, D-140, D-139, D-138, D-137, D-136, D-129, D-127, D-112, D-107, D-105, D-103,
  D-101, D-92, D-76, D-18, D-9, D-1 · D-26/D-43 (a count, a path or a stage is read from its owner) · D-41 (a site, never an offset — every offset below only LOCATES, at the head
  its own sentence names: PRE-`E-1` in §4, **THIS** head in §2's S-cites and in §7's two comment hunks) · **Ceiling:** 150 lines, class max.
- **Status:** structure, pseudocode and guardrail notes; the exact declared text is `signatures.md`'s (brief §3, D-45).

## 1. The shape after the change

Unless a path is given, the site is `src/renderer/renderer.ts`.

| Entry point | After the change | Cite |
|---|---|---|
| `handleRequest`'s `case 'focus'` | keeps its quoted label and its `RpcMethod` member; the body becomes `value = await focusActRoute(req.payload)` — awaited, because the act reads, writes and re-reads | D-112, L2 §1 |
| `focusActRoute(payload)` (landed, private) | the act's ONE body (§2) | D-142, L2 §2 |
| `composeRecord(reading, seat)` (landed, exported) | the renderer's ONE whole-record composition, the entry `pending.md` row `2` books — the crossing's own `composeRecord` (`src/main/tabs-record/index.ts:540`) is another function and unmoved | D-136, D-139, D-142 |
| `dataRoute`, `startTabsClientInstrument`, `holdTabsReading`, `driveTabsLandingPage`, `getTabsClient`, `mintTabId`, `closeTab`, `createPaneDrag`, both `*WiringRole`s, the six `start*` roles | untouched — the focus ROLE is replaced by `focusActRoute` and no other role is | D-142, D-137, L2 §4 |

## 2. The route body, statement by statement

`focusActRoute` receives `payload: unknown` and answers `Promise<FocusActAnswer>` (`signatures.md` §1). It is TOTAL: every arm answers a value and none throws, so no caller wraps an IPC turn in a `try` (D-127, L2 §2) — S1 guards the payload's shape rather than trusting `'target' in <non-object>`.

```
S1  caller = (payload !== null && typeof payload === 'object') ? payload as record : {} ; hasTarget = 'target' in caller
    target = caller['target'] ; opens = caller['newTab'] === true
S2  reading = await getTabsClient().read()
S3  if reading.status !== 'committed' → withRefusal(reading, unreadableOf(reading))                     // D-127: NO write
S4  if !hasTarget → reading                                                                             // no target, no act
S5  if typeof target !== 'string' → withRefusal(reading, malformed(target))                              // the route's own, no write
S6  seat = seatOf(reading, target, opens)         // first row in `order` whose `target` matches | the mint | unresolved
S7  if seat.kind === 'unresolved' → withRefusal(reading, absentTarget(target))                           // ASM-5: no write
S8  written = await dataRoute('write', { path: ['tabs'], tier: 'file', value: composeRecord(reading, seat) })
S9  after = await getTabsClient().read()                                                               // ASM-2: what STANDS
S10 refusal = refusalOf(written)                                                                        // hoisted, so the branch types
S11 return refusal === null ? after : withRefusal(after, refusal)
```

- **S1/S2 — the argument space and the reading** (D-18, D-137, L2 §2): `{target?, newTab?}` and nothing else — `focusHandler` refuses a third own key and a non-object BEFORE the seam — and `opens` is `newTab === true` with no default or coercion; the reading is the realm's ONE, through `getTabsClient()`, never a direct `window.provident.tabs.read()`.
- **S3 — a reading that is not `committed` is not a record** (D-127, L2 §2, L2 `ASM-6`): `absent`, `unread` and `refused` supply no rows, so the route refuses
  rather than composing over a state the realm never read and sends NO write. **It mints no word**: `unreadableOf` carries the reading's OWN `reason` — the
  client's closed set (`no-tabs-member`, `no-read-route`, `route-threw`, `answer-not-declared`, or the store's own on a `refused` arm, `tabs-client.ts`'s
  `TabsClientReading`) — with one message `signatures.md` spells, and the reading travels as the answer's report of what it could not read.
- **S4/S5 — two arms with no act, and NEITHER of them the tool's** (L2 §2's arms, re-grained to these bytes at rev 2): an act naming no row has no act, so the record as it stands IS the answer; a `target` that is not a string is THIS ROUTE's OWN refusal — a VALUE in `refused`, minted at `malformed` (`:848`) with no store asked — since a row's `target` is a string (`src/shared/types.ts`'s `TabsRecordRow`). **The tool's own class is EXACTLY ONE, and it is not a `target`**: `focusHandler` passes each supplied member BY IDENTITY, no `typeof` test, no coercion, no trim (`src/main/mcp-server.ts:157`–`:169`, D-18), so what it refuses before any invoke is the argument HOLDER — a non-plain-object member, or an own key outside `{target?, newTab?}`, as a `TypeError` naming the rejected form. Its word, `malformed-arguments`, is the `data` ledger's own (`src/main/data/types.ts:31`–`:34`, D-112, D-105), and the route spends it as a refusal VALUE rather than as a thrown class.
- **S6 — the seat, in the record's own terms** (D-142, ASM-1): `seatOf` matches `row.target === target` over `reading.order`, FIRST match winning (`{kind:'seat', id}`); no match with `opens === true` opens `{kind:'open', id, target}`; no match without it is `unresolved` (S7) — no second identity rule, the caller's string names a row's content reference and nothing else.
- **The open row's id is MINTED, never the caller's target** (ASM-1, D-142): candidate `tab-<n>` from `n = order.length + 1` upward, accepted by the existing
  `mintTabId(order, candidate)`, whose three reasons (`malformed-row`, `seat-name`, `duplicate-id`) are reused, not re-spelled (`mintTabId`'s docblock, D-92). Termination is by argument: `tab-<n>` is never `'order'`, and only finitely many are members of a finite `order`.
- **S8 — ONE composition, ONE passthrough, no retry** (D-136, D-142, D-112): the args object is handed on verbatim and no member of it is read, defaulted or
  re-spelled; `file` is the record's own tier, the one the declared-root guard admits (D-101). **The `order` this value extends is one the renderer added an id
  to, and that is `ASM-1`'s arm, not a client's invention**: the module still forbidding it at its two documents is `L1 §6`'s `E-11`, this unit's other writer.
- **S9/S10/S11 — the answer and the refusal** (ASM-2, D-136): the answer is the record as re-read after the write, never the value sent nor its ledger, and the
  STORE's judgement rides beside it as `refused`, never converted into a success or into a refusal of the record. **`refused` IS PRESENT ON EVERY ARM THAT ANSWERS A
  REFUSAL AND ON NO OTHER — absent exactly where NOTHING was refused, which is the LANDED BODIES' rule** (site `focusActRoute`; offsets at THIS head): S3 `:846`, S5 `:848`, S7 `:850` and S11's store arm `:854`
  answer `withRefusal(...)`, while S4 `:847` (no target, no act) answers the bare reading and a landed write answers `after` — so a write is what this member may REPORT, never what puts it
  there. Two words are this route's own, and NEITHER is the tool's (S4/S5 above, whose tool-side class is its argument HOLDER alone): `malformed-arguments` (S5) and `target-absent` (S7 — L2 §2's fifth arm and L2 §7's `ASM-5` fix that the route "answers … a
  refusal reason of its own" and name none, so this document names it); every other member is carried, member for member — the store's on S10/S11 (below), the reading's own on S3.
- **THE REFUSAL IS THE WRITER'S LEDGER, AND THAT IS `S10`'s CLAIM MADE CHECKABLE AGAINST A SITE** (D-142: *"'transparent' means no transformation and not no
  refusal"*; `DataLedger`, `src/main/data/types.ts:53`–`:62`): `refusalOf`'s return is `{status, reason, message}` **plus `storeStatus`, `path` and `log` wherever
  the writer carried them** — each spread in only where answered, so no own `undefined` key is minted, and nothing outside the ledger's declared set (`floor`/`through`
  ride `cursor-unknown` alone, an arm `write` composes on none). **THE REJECTED ARM IS THE LANDED THREE-MEMBER REBUILD**: choosing which of the store's members an agent
  sees is the surface's decision D-142 forbids, and its cost is the evidence — an agent cannot tell WHICH store arm refused it (`storeStatus`) nor whether a pass ran (`log`, D-103).
- **The answer is FLAT** (ASM-2, L2 §2): `TabsClientReading & { refused?: FocusRefusal }` — the reading's members (`status`, `order`, `landing`, `rows`,
  `witness`) carry the record and `refused` rides beside them, so the two `status` members cannot collide on one key.

## 3. `composeRecord` — the one composition this module keeps

It receives the committed reading (`TabsCommittedAnswer`, `src/renderer/tabs-client.ts`) and S6's seat; it reads no store, calls no route and holds nothing
between calls (D-136, L2 §3).

```
C1  order = seat.kind === 'open' ? [...reading.order, seat.id] : [...reading.order]
C2  value = { order } ; for each row of reading.rows: value[row.id] = { ...row }
C3  value[seat.id] = seat.kind === 'open'
      ? { id: seat.id, target: seat.target, active: true, lastActiveAt: new Date().toISOString() }
      : { ...value[seat.id], active: true, lastActiveAt: new Date().toISOString() }
C4  return value
```

- **C1 — `order` is copied, never invented** (D-140, D-142, ASM-1): the reading's own sequence, moved by no seat, extended by EXACTLY ONE id where the act
  opens, never re-sorted — it is the record's one stored seat.
- **C2 — every row is copied WHOLE under its own id** (ASM-4, D-76): `error`, `label` and `lastActiveAt` travel as carried, and the value is the member-keyed
  record `{order, <id>: row}` — NEVER the read answer's `{order, landing, rows}`, because `landing` is DERIVED and its address is the landing entry's row.
- **C3 — the one row whose bytes move** (D-142, D-129): the target's `active` reads `true` and its `lastActiveAt` is stamped now for the `tab-has-lastActiveAt`
  pair; the opened row carries no `label` and no `error`, those being the record's repairs, and a local default for a shape a repair supplies is a SECOND AUTHORITY.
- **C4 — and nothing else** (ASM-3, D-142, D-76): the row that stood active keeps `active: true` EXACTLY as the reading carried it — the value may seat two actives ON PURPOSE, the repair settling the pair — and no `landing` member is written.
- **Why it is lawful, and what it does not decide** (D-138, D-139, D-142): `D-138`'s one test asks whether a write is a LEAF of an enforced structure, and this is a whole-record write at an enforced root — which is why it is BOOKED as row `2`'s `composeRecord`; whether a per-tab address with enforced ancestry replaces it is row `2`'s own review, and this document neither takes nor forecloses it.

## 4. The deleted symbols, and what replaces the renderer's focus role

**A LEDGER OF WHAT WAS REMOVED: every symbol below is ABSENT at this head** (D-142, L2 §4) — the offsets are the PRE-`E-1` head's and only LOCATE (D-41), and each row names its symbol.

| Site | Symbol | Cite |
|---|---|---|
| `:110`, `:939`, `:859` | the binding `let focusCarrier: FocusCarrierSurface \| null`, `main()`'s construction `createFocusCarrier(getViewClient())`, and the lazy one in the old route — **nothing replaces them**: the act is reached by no boot step, so `main()`'s step list only shortens | D-142, L2 §4 |
| `:2522`–`:2544`, `:2548`–`:2559`, `:2575`–`:2602` | the `U-STORE-FOCUS — THE CARRIER` region headstone, `interface FocusCarrierSurface` (its four members `state`/`focusRoute`/`persistTarget`/`dispose`), and `function createFocusCarrier` | D-142, L2 §4 |
| `:614`–`:620`, `:621`–`:623`, `:667`–`:713` | the `case 'focus'` comment (which states the case "drives the focus model F2 owns"), the case body's synchronous call, and the `THE RE-HOMED FOCUS ROUTE` headstone describing `focusRoute`, the mirror read and the answer assembly | L2 §4, D-142 |
| `:11`, `:717`, `:729`, `:738`, `:752`, `:760`, `:772`, `:793`, `:828`, `:841`, `:857` | the `focusTransition`/`focusOrder`/`persist`/`FocusEntry`/`FocusState` import of `src/shared/focus-model.ts`; `interface FocusAnswer`, `tabListProjectionOf` with `projectionAnswerOf` (the payload-carried projection arm), `mirrorStateOf`, `carriedEntryIds`, `resolveForHolder`, `answerForCarrier`, `standingAnswer`, `focusRouteImpl`, `focusRoute` | L2 §4, D-142 |
| `:1318`–`:1329` | `describeViewReading`'s committed arm — its ONE surviving read of the deleted family: `reading.focus.entries.length`, `reading.focus.activeId`, `reading.source.focus` | D-142, L2 §4, D-41 |

- **The replacement of the renderer's focus role, so no reader looks for a carrier** (D-142): what the wiring calls now is `focusActRoute`, in `handleRequest`'s
  `case 'focus'` and nowhere else. The realm holds its tab client from `startTabsClientInstrument` at the end of `main()`, and the route reaches it through
  `getTabsClient()`, which lazily constructs one where `main()` never ran — the W4 form the carrier's lazy arm also carried (D-92).
- **Three boot notes and one region headstone outlive the symbols unless they are taken with them** (D-142, D-9): `main()`'s slice-boot note attributes its one-literal claim to
  `tests/store-focus.test.ts`'s `S22-1`, **a battery ALREADY GONE from this tree** — the note cited a file that does not exist, the stale source `D-142` forbids — and the tab-region
  headstone and its tab-client echo name `focusCarrier` as a boot-order anchor. Each is re-grained: the battery RETIRED with its referent (D-9) so the claim rests on `TABS_SEAT_NAME`'s own docblock, and the anchor is the step that still stands (`new Runtime(...)`, `bootstrap()`). **No traced step moves** — the carrier's construction was never one, and `B-5` reads only `TRACE`/`STDIO_READY`/`RENDERER_READY` (`tests/e2e/bundle-boot-seam/boot-contract.test.ts`).
- **Two paths outside `E-1` name these symbols and are other rows'** (D-3): `src/main/view-record/index.ts` (`:6`, `:7`, `:996`) names `mirrorStateOf`, `answerForCarrier` and `createFocusCarrier`; those comments are `E-2`/`E-9`'s to re-grain and no byte of that file is this pass's.

**`:1323` — THE ONE LINE BOTH TYPECHECK LEGS RED ON, AND IT IS DELETED AT THIS HEAD** (D-142, L2 §4, D-41): a log line naming a family the record no longer holds is a stale
source, so the fragment went **WITH NO TEXT IN ITS PLACE** — the template's other three lines already name all three surviving families with their own `source` words, and a
substitute could only describe a member the record does not carry (D-76). `function describeViewReading(` stays byte-for-byte (`tests/theme-declaration.test.ts` pins it as a
region end, `shapeEnd`; no row asserts the template's text), and **the deleted bytes are transcribed once, in `signatures.md` §5** (this document's exact text is that file's, §1).

**THE SWEEP — every surviving `focus` byte, by disposition, measured by grep at this head** (D-41): DELETED `:1323` (above) · RE-GRAINED `:21` (the appearance docblock's
"beside the pane geometry, **the mirror** and the zone family" — the mirror IS the deleted family) and `:54`–`:55` (the view client's W4 clause "so **the focus route** an MCP call
reaches works in a node realm too"), their exact bytes `signatures.md` §5's · KEPT `:607`–`:613`, `:659`–`:666` (the act's entry headstone and its quoted case label),
`:679`–`:837` (`signatures.md` §§1–3's declared names, `focusHandler` among them as `mcp-surface`'s, and the two `provident.focus:` messages — **with the two docblock hunks
§7 items 1–2 record re-grained INSIDE this range**, `:681`–`:683` and `:808`–`:811`), `:908`/`:925`–`:926` (the retired battery and the carrier's deletion note), `:58` (an ABSENCE claim: no module-level binding names a
pane size or a mirror) and `:1811`–`:1999` — the `escape` verb's FOCUS RETURN and the DOM's own `focus()`, another subject (`D-125`).

## 5. The delivery path after the act, and why the write's answer is not the copy

- **`IPC_TABS_CHANGED` → `window.provident.tabs.onChanged` → the client re-reads → `holdTabsReading` (`:1152`) → `driveTabsLandingPage` (`:271`)** (`src/main/main.ts`'s change site, `src/renderer/tabs-client.ts:312`'s `subscribe`): the act causes the SAME push an external writer's change does, because it writes the record that listener is registered on (D-137, D-142, L2 §5).
- **Why the write's own answer is not this module's copy of the truth** (D-137, D-136): it is a LEDGER about the act — `status`, `cursor`, `repaired` and the commit's `log` — at the store's own instant, while the record that STANDS is what the repair left; the renderer's copy is a per-realm reading a delivery REPLACES WHOLE, so an external write, a second window or a repair moves it without this module observing the write (D-137). S9's re-read is the ANSWER's and is not a delivery: it does not feed `holdTabsReading`.

## 6. Guardrail notes — what L4 must NOT do

- **Do not clear the older active row** (ASM-3, D-142): no `active: false` in `composeRecord`; two actives are lawful in the value and `exactly-one-active` (`TABS_CONSTRAINT_ID`) normalises them inside the commit — clearing it here would be the authority the repair exists to be (D-129).
- **Do not compose at the crossing and do not add a route to the tabs surface** (D-142's shape `(b)`, D-18): no `tabs.write` member, no preload or `ipcMain.handle` site, no channel constant, no `data` member gained — five routes are that member's whole (D-112).
- **Do not write a second reading beside the client's** (D-137, L2 §2): no second held binding, no `holdTabsReading` call from the route, no composition of `landing`.
- **Do not touch the drag's style** (D-138, L2 §4): `createPaneDrag`'s two-phase update/release-commit and the leaf-write argument are `D-138`'s and stay; `mintTabId`, `closeTab` and `driveTabsLandingPage` keep their bodies.
- **Do not invent a member, a default or a reason word — and do not DROP one** (D-76, D-129, D-140, D-127, D-142, L2 §2): no `landing` in the value, no stored active id, no `label`/`error` on the opened row, no failed read converted into a record — and no `reason` beyond the two this document names (S5, S7), every other one carried verbatim. **`refusalOf` is the ONE site where this is violable by accident**: a `{status, reason, message}` rebuild loses the store's own `storeStatus`, `path` and `log` and NO battery redded for it at this head (§7 item 3 — which is why the licence put one there), while a `{...written}` spread forwards a member no ledger declares; `signatures.md` §3 is the shape, and EITHER departure is a finding against L4.
- **Do not touch a line this document does not name, and do not leave the deleted route's name in any byte** (D-142, D-41; `tests/focus-tool-register.ts`'s `wiringVerbChoiceSites` and `wiringRefusalDerivationSites` read the whole file, and `wiringFocusRegion()` indexes the RAW file, `tests/focus-tool.test.ts`'s `G4-E1`): no `newTab === true ? 'open' : 'activate'`, no `entry: {` or `id: <caller's target>` row, no `refusals[0]`, and no comment spelling `function focusRoute(` — the new route is `focusActRoute`, and §7's licence was the WHOLE of that revision's byte work. The third reader there, `wiringIdPolicySites`, is DEFINED and driven by no row, so that clause rests on the writer and not on a battery.

## 7. The L4 licence as it landed, the legs that went green, and the reds expected to persist

**THE LICENCE WAS TWO FILES AND SIX HUNKS, AND IT LANDED — measured at this head, byte-for-byte** (`signatures.md` §1/§3): `src/renderer/renderer.ts`'s `FocusRefusal` (`:684`–`:691`, three members → six), `refusalOf` (`:812`–`:820`, the three carried members spread in only where answered), and the TWO COMMENT hunks items 1–2 name (`:681`–`:683`, `:808`–`:811`); and, in `tests/renderer-delivery-compliance.test.ts`, ONE `expect` inside `DC-7` (`:406`) beside the header sentence (`:23`), which HAD said the arms "do not exist at this head" — they did, measured then — so it was a stale source like `:1323` and was replaced: `:23` now reads `**THE RETARGET LANDED** (`E-1`)`. `E-1` LANDED (the carrier family and `:1323` are ABSENT): no other byte moved.

1. **THE `FocusRefusal` DOCBLOCK, `:681`–`:683` — LANDED, and it reads WHAT IT NOW READS at this head — AND THE GUARDRAIL WAS THE SAME FOR BOTH COMMENT HUNKS: COMMENT ONLY, no body, no declaration and no other line of `src/renderer/renderer.ts` moved** (D-41; D-142's stale source; the byte L2 `mcp-surface` §3 handed here). WHAT IT REPLACED — `` **`refused` IS PRESENT EXACTLY WHEN THE ACT ATTEMPTED A WRITE AND EITHER WROTE NOTHING OR WAS REFUSED** (`D-136`, `D-127`, L2 §2): S4 names no row, S3 answers an unreadable record, S5 refuses a target that can be no row and S7 refuses a target no row carries — none of those four attempts a write, so none of them carries this member. `` WHAT IT NOW READS — `` **`refused` IS PRESENT ON EVERY ARM THAT ANSWERS A REFUSAL, AND ON NO OTHER — absent exactly where NOTHING was refused** (`D-136`, `D-127`, L2 §2): S3, S5 and S7 answer `withRefusal(...)` and S11 puts the store's arm beside the re-read, while S4 answers the bare reading and a landed write answers `after` — a write is what this member may REPORT, never what puts it there. `` — three physical lines for three, `/**` and `*  ` kept, and this is `signatures.md` §1's `FocusRefusal` docblock: same words, emphases, citations and closing clause, only the wrapping differing.
2. **THE `refusalOf` DOCBLOCK, `:808`–`:811`, its quoted sentence at `:809` — LANDED at this head under the SAME GUARDRAIL — the narrowed three-member shape rev 4 had replaced, in the comment above the one function that carries the ledger.** WHAT IT REPLACED — `` (`{status:'refused', reason, message}`, `DataLedger` in `src/main/data/types.ts`) passes THROUGH and nothing is minted; `` WHAT IT NOW READS — `` (`status`, `reason`, `message`, plus `storeStatus`/`path`/`log` where the writer answered them — `DataLedger`, `src/main/data/types.ts`) passes THROUGH, member for member, nothing minted; `` — `:810`'s "every other answer … answers `null`" reads on unchanged.

3. `npm run typecheck`, `npm run typecheck:tests` and `npx vitest run tests/renderer-delivery-compliance.test.ts tests/focus-tool.test.ts tests/e2e/focus-retirement/` — the legs the licence had to leave green, GREEN at this head and re-measured on this currency pass (D-143), because a comment hunk moved no verdict; `DC-7` was the ONE row it CHANGED, and it had to change: its store arm asserted `JSON.stringify(...)` CONTAINS the store's reason, so it could not tell a carried ledger from a three-member rebuild — the insensitivity the narrowing landed behind; the `expect` it gained reads the refusal's own KEY SET (`:406`).
4. `npm run build` and `npm test`, plus this module's other batteries (`tests/fork-store-reads.test.ts`, `tests/theme-act.test.ts`, `tests/pane-drag-compliance.test.ts`, `tests/op-command-unwrap.test.ts`) — the floor's other legs and its ACCEPTANCE: GREEN at this head (D-143's readings), no non-`focus` row moved (brief §6, D-40); a row still naming a deleted family member stays red until its OWN writer lands (D-142's order), and none of this module's own was (D-45).

## 8. Unit battery: none owed

`tests/unit/renderer-wiring/` is NOT created: `DC-6`, `DC-7` and `S-9`'s site rows already drive §2–§5 from this module's gating batteries and a row duplicating them is not evidence (D-9, D-40); §7's licence added NO row and NO file — its one `expect` landed inside `DC-7` (`:406`), the row that had to carry it.
