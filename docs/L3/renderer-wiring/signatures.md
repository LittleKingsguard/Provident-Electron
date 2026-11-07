# L3 — `renderer-wiring`: signatures

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 6 — every name and its exact text, transcribing
  `design.md` rev 6 §1–§8; rev 5 re-grained §1's `refused` PRESENCE clause to the landed bodies' rule (site cited beside the interface) and re-stated §3's `log` typing as intended, not a slip; **rev 6 is `design.md` rev 6's currency pass: S5/S7's "the tool's own" reads "the ROUTE's own" (`:848`, and the tool's own class is its argument HOLDER alone, `src/main/mcp-server.ts:157`–`:169`), `malformed`'s stub is `target: unknown` as the landed body declares it, and the `refusalOf`/`DC-7`/header licence blocks read LANDED at their sites (D-41, D-143).** Nothing here is prose the design does not already decide (D-45, brief §3).
- **Ceiling:** 150 lines, class max (D-1) · **Site:** `src/renderer/renderer.ts` unless a path is given (D-41) · **Status:** stubs for L4, one shot — the L4 pass that consumed them landed, and rev 6 records it.

## 1. The wiring's public surface after the change

```ts
// ── the act ─────────────────────────────────────────────────────────────────────────────────────────────
/** THE ACT'S ANSWER (`ASM-2`, D-142): the record as re-read after the write, with the store's judgement beside it. */
export type FocusActAnswer = TabsClientReading & { readonly refused?: FocusRefusal }

/** **`refused` IS PRESENT ON EVERY ARM THAT ANSWERS A REFUSAL, AND ON NO OTHER — absent exactly where NOTHING was refused** (`D-136`, `D-127`, L2 §2): S3, S5 and S7 answer `withRefusal(...)` and S11 puts the store's arm beside the re-read, while S4 answers the bare reading and a landed write answers `after` — a write is what this member may REPORT, never what puts it there. */
export interface FocusRefusal {
  readonly status: 'refused'
  readonly reason: string
  readonly message: string
  readonly storeStatus?: string
  readonly path?: readonly (string | number)[]
  readonly log?: readonly unknown[]
}
// AND IT IS THE WRITER'S LEDGER (§3); ITS SITE, MEASURED (D-41): `focusActRoute` answers `refused` on S3 `:846`, S5 `:848`, S7 `:850` and S11's store arm `:854`, on neither S4 `:847` nor a landed write — the rule is the BODIES' (L2 `mcp-surface` §3).

/** THE SEAT the route resolved, in the record's own terms (ASM-1, D-142). */
export type FocusSeat =
  | { readonly kind: 'seat'; readonly id: string }
  | { readonly kind: 'open'; readonly id: string; readonly target: string }
  | { readonly kind: 'unresolved' }

/** THE ONE whole-record composition this module keeps (`pending.md` row `2`, D-136, D-139, D-142). */
export function composeRecord(reading: TabsCommittedAnswer, seat: FocusSeat): Record<string, unknown>
```

## 2. The route the wiring registers

`handleRequest`'s switch keeps its quoted label and its `RpcMethod` member; only the body changes (`D-112`, L2 §1):

```ts
case 'focus':
  value = await focusActRoute(req.payload)
  break
```

- `focusActRoute(payload: unknown): Promise<FocusActAnswer>` is **module-private** and is the only new function in the switch's reach.
- `'focus'` in `RpcMethod`, the tool's name and its `{target?, newTab?}` schema are `mcp-surface`'s and are cited, never copied (`E-5`, D-18, D-45).
- The write the route makes is the existing passthrough and no new signature: `dataRoute('write', { path: ['tabs'], tier: 'file', value })` (`:532`) → `window.provident.data.write(args: unknown): Promise<DataWriteAnswer>` (`src/main/preload.ts:130`, implemented `:284`) → `createDataSurface(options: DataSurfaceOptions).write(args: unknown): DataWriteAnswer` (`src/main/data/surface.ts:184`/`:237`) → `store.write(path, tier, value)` (`:251`; D-112, D-142).

## 3. Module-private names the pseudocode uses (not exported)

```ts
/** The three arms that are NOT a record: `reading.reason` exists on each, which is why the parameter is narrowed
 *  and never `TabsClientReading` whole (the committed arm carries no `reason`, `src/renderer/tabs-client.ts:56`). */
type UnreadableReading = Exclude<TabsClientReading, { readonly status: 'committed' }>

function seatOf(reading: TabsCommittedAnswer, target: string, opens: boolean): FocusSeat
function withRefusal(reading: TabsClientReading, refusal: FocusRefusal): FocusActAnswer
function unreadableOf(reading: UnreadableReading): FocusRefusal   // the READING's own reason, minted by nothing (S3)
function malformed(target: unknown): FocusRefusal                 // the ROUTE's own argument refusal (S5), its parameter read nowhere
function absentTarget(target: string): FocusRefusal               // ASM-5's own reason (S7)
function refusalOf(written: unknown): FocusRefusal | null         // a `data.write` answer's refusal arm, carried MEMBER FOR MEMBER (S10/S11, §3's block)
```

The two route-own objects are built by `malformed` and `absentTarget`; S3's by `unreadableOf`. None is exported, and NONE is the tool's: the tool's own class is exactly one, its argument HOLDER refused before any invoke (`src/main/mcp-server.ts:157`–`:169`, D-18):

```ts
// S3 — unreadableOf: the reading's OWN word, carried unmodified. It mints nothing (D-127, L2 ASM-6);
//      the reading's closed set is tabs-client.ts's TabsClientReading: 'no-tabs-member' | 'no-read-route'
//      | 'route-threw' | 'answer-not-declared', or the store's own reason on a `refused` arm.
{ status: 'refused', reason: reading.reason,
  message: `the tab record answered '${reading.status}', so this realm holds no record to compose over` }

// S5 — malformed: the ROUTE's own value, and the `data` ledger's word (src/main/data/types.ts:31-34, D-112).
{ status: 'refused', reason: 'malformed-arguments',
  message: "provident.focus: a tab row's `target` is a string, so a non-string target can be no row" }

// S7 — absentTarget: L2 §2's fifth arm and L2 §7 ASM-5 fix that the route answers "a refusal reason of its own"
//      and name none; this word is that reason's name, and `message` names the caller's own target.
{ status: 'refused', reason: 'target-absent',
  message: `provident.focus: no standing row carries '${target}' and newTab is not true, so no row is opened` }
```

**`refusalOf` — THE WRITER'S LEDGER, ITS EXACT TEXT, THE COMMENT ABOVE IT, AND THE TEST BYTES BESIDE IT** (design §2's S10/S11, §7 items 1–3; `DataLedger`, `src/main/data/types.ts:53`–`:62`): it carries a `data.write` refusal arm through MEMBER FOR MEMBER and mints nothing — `log` is typed `readonly unknown[]` and that is INTENDED, not a slip (D-53): this realm reads no entry, the body's `Array.isArray` guard proves an ARRAY and never an entry, and naming the ledger's `DataLogEntry` here would make the renderer's answer DECLARE what no line of it checks; `path` keeps `DataPath`'s own spelling because `['tabs']` is this answer's subject, `storeStatus` stays a `string`, and `floor`/`through` are absent because `cursor-unknown` rides them alone and `write` composes no such arm. **`:808`–`:811`'s docblock WAS RE-GRAINED UNDER THE SAME LICENCE AND IT LANDED, its quoted sentence at `:809`** (design §7 item 2): the three-member `{status, reason, message}` it had quoted was exactly the narrowed shape this block replaced. Each member is SPREAD IN where the writer answered one, never assigned, so no own `undefined` key is minted (`mcp-surface` `G4-C1`/`C2`):
```ts
function refusalOf(written: unknown): FocusRefusal | null {
  if (written === null || typeof written !== 'object') return null
  const answer = written as Record<string, unknown> ; if (answer['status'] !== 'refused') return null
  const { reason, message, storeStatus, path, log } = answer
  if (typeof reason !== 'string' || typeof message !== 'string') return null
  return { status: 'refused', reason, message,
    ...(typeof storeStatus === 'string' ? { storeStatus } : {}), ...(Array.isArray(path) ? { path: path as readonly (string | number)[] } : {}),
    ...(Array.isArray(log) ? { log } : {}) }
}
// tests/renderer-delivery-compliance.test.ts — `DC-7`'s (a) arm, LANDED at `:406` after its `toContain('parent-absent')` read:
const carried = (refused.value as { readonly refused?: Record<string, unknown> }).refused
expect(Object.keys(carried ?? {}).sort(), "DC-7 — the refusal is the WRITER'S LEDGER, member for member: the `path` the store answered with reaches the tool's answer, and the `address` the double also sent is no ledger member and is forwarded by nothing (D-142)").toEqual(['message', 'path', 'reason', 'status'])
// AND THE SAME FILE'S HEADER, `:23`–`:24`: THE `**RED UNTIL` SENTENCE WAS REPLACED, and `:23` NOW READS — `**THE RETARGET LANDED** (`E-1`): the arms these rows drive exist at this head, and each row says which one it is.`
```

## 4. Exports that stand, unchanged

```ts
export function handleRequest(runtime: Runtime, req: RpcRequest, notify: (p: { uri: string }) => void): Promise<RpcReply>
export function driveTabsLandingPage(reading: TabsClientReading, runtime: TabsPageRuntime | null): TabsPagesReading
export function getTabsClient(runtime?: TabsNodeResolver | null): TabsClient
export function getViewClient(): ViewClient
export function mintTabId(order: readonly string[], tabId: string): TabsMintOutcome
export function closeTab(member: unknown, tabId: string): TabsCloseOutcome
export function themeWiringRole(runtime: Runtime): readonly [string, string]
export function overlayWiringRole(): OverlayWiringRole
export function getModuleClient(): ModuleClient
export function getSecurityClient(): SecurityClient
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface
export interface TabsPageDrive { /* five members, `:228` */ }
export interface TabsPagesReading { /* landing + error, `:243` */ }
export interface TabsPageRuntime { /* elementForNodeId + applyCommand, `:250` */ }
```

Every one of these keeps its exact text and body: `E-1` replaces the focus ROLE and nothing else (L2 §4, D-142).

## 5. Removed — stated as removed, and never re-declared

| Removed | What it was | Cite |
|---|---|---|
| `FocusCarrierSurface` | the four-member carrier surface: `state`, `focusRoute`, `persistTarget`, `dispose` | D-142, L2 §4 |
| `createFocusCarrier(view: ViewClient \| null): FocusCarrierSurface` | the factory, its declared throw, and `persistTarget`'s `commitFocus` call | D-142, L2 §4 |
| `let focusCarrier` (and both of its construction sites) | the boot-constructed binding and the lazy arm | D-142, L2 §4 |
| `FocusAnswer` | the old answer type (`activeId`, `entries`, `opened`, `refused?`) — replaced by `FocusActAnswer` | L2 §4, ASM-2 |
| `answerForCarrier`, `mirrorStateOf`, `carriedEntryIds`, `tabListProjectionOf`, `projectionAnswerOf`, `resolveForHolder`, `standingAnswer`, `focusRouteImpl`, `focusRoute` | the whole old answer assembly and the mirror read | L2 §4, D-142 |
| `describeViewReading`'s committed-arm fragment — `reading.focus.entries.length`, `reading.focus.activeId`, `reading.source.focus` | the log line's read of the deleted family; **deleted whole, and NO text takes its place** (the template's other three lines already name `panes`, `zones` and `theme` with their own `source` words, so a substitute could only describe a member the record does not carry, D-76). Exact bytes, indentation included: | design §4, D-142, D-41 |

      + `focus entries=${String(reading.focus.entries.length)} active=${JSON.stringify(reading.focus.activeId)} (source ${reading.source.focus}), `

No replacement name is minted for any of them: the act is `focusActRoute`, the composition is `composeRecord`, and the answer is the tabs client's own reading
(D-142). A name L4 finds inconvenient is a design finding routed to L3, never a local invention (D-45).

**Two PROSE RE-GRAINS, and BOTH LANDED at this head** (design §4's sweep; the site is `src/renderer/renderer.ts`, and no other byte on either line moved — D-41). Quoted from each line's own `*` on:

```
:21–22  *  (`theme-must-stand`, `src/main/view-record/index.ts`) and STORED on the view record beside the pane geometry and the
        *  zone family; this file READS that record over the bridge and APPLIES `props.<name>` from it.

:54–55  *  same boot point the deleted frozen store's was, and lazily in a realm where `main()` never runs (the W4 form), so a node
        *  realm that reaches it reads a client and never a null binding. **IT IS NOT A STORE**: it holds no address space, owns no
```

Why each moved: `:21`'s "the mirror" IS the deleted family, so the families that record names are the pane geometry, the zone family and the appearance record; `:54`'s
clause warranted a construction design §4's first row deletes — the act reaches `getTabsClient()` and never the view client, so the laziness is stated for what it now
serves. **A byte here that keeps the PRE-`E-1` run's text is a finding against L4, not a judgement call.**
