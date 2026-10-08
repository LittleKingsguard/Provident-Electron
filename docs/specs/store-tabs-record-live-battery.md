# `U-STORE-TABS-RECORD` (`T2`) — GATE 6 LIVE BATTERY (the machine half, RUN; the operator half, PREPARED)

**STATUS LINE (the status-line rule, `docs/specs/store-tabs-record.md` `§0B` item 5):** **the machine half of this unit's gate 6 is TAKEN and this file is its record; the two authored pages' OPERATOR rows are NOT taken and are owned by the supervisor at a session with a human at the window.** Unit `U-STORE-TABS-RECORD` · wave `T` · ledger row `T2` · **revision `94bf1102c941566315817eedcdd8b2ff2ee00536` (`T2 GATE-5 RE-DRIVE REPAIR RED SET`), working tree clean apart from the two artifacts this pass creates** · **the run: `node tests/store-tabs-record-live.mjs`, a LITERAL COMMAND LINE, `18` rows printed = `12` RUN (`10` PASS / `2` FAIL) + `3` PARKED + `3` CONTROL, driver exit `1`** · driver `tests/store-tabs-record-live.mjs`, `690` lines, `sha256 42ed0c36732a20029b97bb7e213eb89906e8866a29df05394fb26fa97d4d6cbc` · **the driver's bound is DECLARED, NOT WAIVED (`§5.2` item 7(b); `§0D` item 3(b)): a CDP click does NOT make this surface agent-drivable — the MCP tool surface carries an event NAME and NO COORDINATES (handoff record `S-d9` at `docs/specs/provident-electron-shell-chrome-handoff-review.md:185`, whose own words are *"a session reached through MCP … cannot commit a magnitude — **no later pass may claim agent-drivable drags**"*; the same file states the surface's shape at `:979`) — and a synthetic click is NOT a human's eye on a painted box.** **NO ROW IN THIS RECORD CLAIMS AGENT-DRIVABILITY, AND NO ROW CLAIMS THAT A PAINTED SURFACE WAS SEEN.**

**WHAT THIS PASS CREATED, AND NOTHING ELSE:** `tests/store-tabs-record-live.mjs` (NEW, the unit's own pointer-carrying driver per `§5.1` item `3b`) and this record. **No `src/**` byte, no other `tests/**` file, no `scripts/**` byte, no `package.json` key, no config, no tracker, no commit.** The `scripts` key set is UNTOUCHED (re-read this pass: `clean · build · build:watch · start · start:http · typecheck · typecheck:tests · test · test:watch · battery · divergence · ui · mcp`), so `tests/ui-leg-contract.test.ts`'s `L-1` set-equality holds by construction and no `scripts` key was added — which is exactly why the driver is run by a literal command line (`§5.1` item `3b`; `§7` item `4`).

---

## 1. THE `§7.1` PREDICATE — the decision, mechanically (`user-flow-audit.md` §2)

**`TRIGGERS`, on BOTH limbs, and each limb is decided from the unit's own recorded change set rather than by judgement in the moment.**

- **LIMB A — `DOM-SHIM-BLINDNESS`: TRIGGERS.** The unit's change set **re-authors two rendered surfaces** — the authored page nodes `tabs-landing-page` and `tabs-error-page` (`§5.1` item 2; `§0A` item 5) — whose truth is **real-DOM-only**: whether a node is *rendered*, and *where*, is a fact about a real host, not about the DOM shim. The unit's own contract states this limb in its own words (`§CURRENT STATE` item 6: *"limb A (`DOM-SHIM-BLINDNESS`: two re-authored rendered surfaces whose truth is real-DOM-only)"*).
- **LIMB B — `UI-OVERHAUL`: TRIGGERS.** The close/activate flows and the record's terminals **become visible only once the unit is assembled**: the record is booted from the realm's hand-off, the constraint is evaluated on the boot step's one write, and the two pages are driven by a wiring role that reads that record (`§3.3`, `§3.5`; `§CURRENT STATE` item 6's limb B, *"the close flows become visible only once assembled"*).

**THE EVIDENCE THAT DECIDED IT, MEASURED THIS PASS (not projected): the two authored nodes EXIST in the assembled app** (driver row `M10`: MCP `list_targets` carries `25` nodes, of which `node-24`/`tabs-landing-page` and `node-25`/`tabs-error-page` are `role=page`; MCP `html` renders both as `<section … class="card tabs-page">`; census `{registered:25, inTree:25, unplaced:0, destroyed:0, prototypes:0}`) — and **their truth is not readable off the shim or the node suite**: the pages' markup is identical across every record state this pass booted, which is precisely the limb-A gap the operator rows exist to close.

**CONSEQUENCE, per `§6.1` clause 6:** the capped `§5.U` delta matrix (§2), the `§6.1` structured coverage report (§3) and the `§6.2` read-only audit (owed to a party that did NOT author this matrix) are **all owed and are all present here** — this is **not** the zero-row exemption, and **a zero-row or short report would be INVALID rather than empty**.

---

## 2. THE CAPPED `§5.U` DELTA MATRIX — `8` U-rows (`≤ 8`, the unit's own subjects FOLDED, no ninth invented)

**WHAT A U-ROW IS HERE:** a **user-visible flow of this unit**, with the **driver rows that bear on it** named in the `batteryRows` column — the fold is stated so the row set is auditable rather than asserted. **Every row's `post` is MEASURED at the live gate; a projected value is a FAIL.** The instrument is named per row from the CLOSED set (`§6.1` clause 3): a shipped tool (`node scripts/mcp-cli.mjs --target http --port <n> targets|html|node-state|dispatch`, and the driver's own CDP + store reads), a literal command line (`node tests/store-tabs-record-live.mjs`), or `MANUAL OPERATOR`.

| U | The user-visible flow | Layer | The instrument that can read it | `batteryRows` (the fold) | Verdict | The pinned user-visible assertion |
| --- | --- | --- | --- | --- | --- | --- |
| **U-1** | **Boot the app on a persisted record: the record the app holds, and the exactly-one-active constraint member present at its one supply site** | `[U]` (assembled app, APP-facing) | `node tests/store-tabs-record-live.mjs` (boot + the app's own store reads) + `node scripts/mcp-cli.mjs --target http --port <n> targets` | `M1` + `M2` + `M3` + `M10` | **PASS** | After a real boot the app's store holds the seeded membership at the `file` tier, the `tabs` root is declared, one constraint member `{id:'exactly-one-active', matchedSet:'tabs', evaluatedOn:['set','commit','remove']}` is supplied at the store's ONE construction site, and the two authored pages are in the assembled tree. |
| **U-2** | **A cold boot (a first-ever boot over a tier that holds nothing) performs no write at all** | `[U]` | `node tests/store-tabs-record-live.mjs` (cold-boot row) | `M5` | **PASS** | On a profile with NO settings file the boot answers the declared no-write arm — no commit, nothing minted, no event, no evaluation — and `file.tabs.order` reads the declared miss, while a seeded profile's file proves the instrument is not blind. |
| **U-3** | **The record as the APP holds it: membership and order, and the read answer for a member whose entry was never written** | `[U]` | `node tests/store-tabs-record-live.mjs` | `M1` + `M2` | **PASS** | `file.tabs.order` carries the seeded sequence at the `file` tier and a never-written member answers the READ-SIDE REFUSAL (`no-such-anchor` at `D-ANCHOR`) — never the declared miss, and never `found:false`. |
| **U-4** | **The boot seam / hydration: the record's first constraint evaluation and its repair land as the tier's projection** | `[U]` | `node tests/store-tabs-record-live.mjs` (two real boots on one profile) | `M6` (+ `M4`, `A-3`) | **FAIL** | The boot step's evaluated write must LAND the record the realm derived, so the next boot's hand-off carries it; MEASURED: an emptied `order` is left empty through the whole boot (no repair, the reserved entry never written) and the profile file is byte-unchanged, so the second realm re-derives the same state from the same seed. |
| **U-5** | **Closing a tab: the persisted close, its declared reference set and the close's own terminal states** | `[U]` | `node tests/store-tabs-record-live.mjs` | `M7` + `M8` + `M9` (+ `P2`) | **FAIL** | The close's own end states hold (`order` rewritten to the survivors; the reserved entry's own removal refused by name with the sibling control writing; the close-last-tab repair re-seating AND activating the reserved entry) — but the close does NOT persist: the profile file is byte-unchanged after it, in the same boot in which the crossing seam is measured to reach the tier for another root (row `A-3`). |
| **U-6** | **The boot round-trip: the record's membership surviving a restart on the same profile** | `[U]` | `node tests/store-tabs-record-live.mjs` (two boots, one profile) | `M6` + `M7` (+ `A-3`) | **FAIL** | A restart on the same profile must carry the record the previous realm landed; MEASURED: the boot-derived membership is re-derived on every boot and never carried, and a realm's own close leaves the tier byte-unchanged — while a value this realm WROTE to another declared root IS carried (the instrument has teeth). |
| **U-7** | **The authored tab affordances: focus/activate, the close control, the mint control — pressed for real** | `[U]` (painted) | `node scripts/mcp-cli.mjs --target http --port <n> targets` (what the app AUTHORS) + `MANUAL OPERATOR` (the press) | `P1` (parked) + `M12`'s press machinery control | **PARKED** | No close control and no mint control exists in the assembled app's authored set (25 nodes; the only `tabs-*` nodes are the two pages), so no real press on one can be driven — STRUCTURAL, recorded with its reason. |
| **U-8** | **The two authored pages as TERMINALS at the operator's eye: the landing page after the last tab closes, the error page for an unresolvable target** | `[U]` (painted) | `MANUAL OPERATOR` (the eye on the painted box) | `P3` (parked) + the prepared session sheet (§5) | **PARKED** | The pages' RECORD witnesses are measured (`M9`: the reserved entry re-seated and reading active; `M11`: the error witness true for a tab whose entry carries an error token) — but whether the operator SEES a terminal, and where, is a human-eye row and NO TOOL OUTPUT STANDS IN FOR IT. |

**THE FOLD, STATED (`§5.U`'s `≤ 8` cap):** the unit's own subjects are exactly these eight; the battery's finer-grained rows (`M1`…`M12`, `P1`…`P3`) are **terms of the U-rows**, not further U-rows, which is what the `batteryRows` column records. **No ninth subject was invented and none was dropped.**

---

## 3. THE `§6.1` STRUCTURED COVERAGE REPORT (machine-readable; `summary.total === 8`)

```json
{
  "unit": "U-STORE-TABS-RECORD",
  "matrixSource": "docs/specs/store-tabs-record-live-battery.md §2",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": true,
  "emitter": "MANUAL",
  "emitterReason": "NO SHIPPED INSTRUMENT CAN EMIT THIS REPORT: the app's MCP surface exposes no tab-record read (measured: 8 tools, none of them tabs), no node carries the record (§2.6 item 3), the page's own global is the preload bridge alone (keys ready|onRequest|sendReply|notify|security|module|store — no store handle, no record read), and the MCP dispatch surface carries an event name with no pointer coordinates (S-d9, docs/specs/provident-electron-shell-chrome-handoff-review.md:185, and the surface itself at :979). The emitter is therefore the live-scenario runner, by hand, from the driver's own printed rows.",
  "driver": "tests/store-tabs-record-live.mjs",
  "driverSha256": "42ed0c36732a20029b97bb7e213eb89906e8866a29df05394fb26fa97d4d6cbc",
  "driverRunCmd": "node tests/store-tabs-record-live.mjs",
  "driverExit": 1,
  "driverRows": { "total": 18, "run": 12, "pass": 10, "fail": 2, "parked": 3, "control": 3 },
  "revision": "94bf1102c941566315817eedcdd8b2ff2ee00536",
  "rows": [
    {
      "u": "U-1",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs + node scripts/mcp-cli.mjs --target http --port <n> targets",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 0,
      "observation": "MEASURED (driver row M1): the APP'S OWN STORE holds file.tabs.order=[\"t9\"] at tier=file and the seeded entry t9={target:page-9,active:true,label:T9}; the ROOT CONTROL answered {status:refused,reason:malformed-name} — never undeclared-name, so the tabs root IS declared; MCP list_targets exit 0 carries 25 nodes of which node-24/tabs-landing-page and node-25/tabs-error-page are the tabs-* set. MEASURED (M2): membership [\"t9\",\"ghost\"] with the never-written member ghost answering the READ-SIDE REFUSAL {found:undefined,status:refused,reason:no-such-anchor,step:D-ANCHOR} while the written t9 answers found=true. MEASURED (M3): the app's own construction carries 1 constraint member [{id:exactly-one-active,matchedSet:tabs,evaluatedOn:[set,commit,remove]}]. MEASURED (M10): the two authored nodes read {id:tabs-landing-page,role:page} and {id:tabs-error-page,role:page} and render as <section data-wire=\"node-24\" id=\"tabs-landing-page\" role=\"page\" class=\"card tabs-page\" …>Landing</section> / the error node likewise; census {registered:25,inTree:25,unplaced:0,destroyed:0,prototypes:0}.",
      "verdict": "PASS",
      "assertion": "After a real boot the app's store holds the seeded membership at the file tier, the tabs root is declared, exactly one exactly-one-active member is supplied with the three declared evaluation points, and both authored pages are in the assembled tree.",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app's own renderer realm (boot + store reads) and the app's MCP surface on http://127.0.0.1:<mcp-port>/mcp", "liveSurfacePresent": true }
    },
    {
      "u": "U-2",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 0,
      "observation": "MEASURED (driver row M5): on a profile carrying NO settings file at all the app's own store answers file.tabs.order as {found:false,status:undefined,value:undefined,reason:undefined} — the declared no-write arm — and the profile STILL carries no settings file after the boot (no commit, nothing minted, no event, no evaluation). NON-VACUITY CONTROL, measured in the same run: a SEEDED profile's file before its own boot was {\"schemaVersion\":\"1\",\"file.tabs.order\":[\"t9\"],\"file.tabs.t9\":{\"target\":\"page-9\",\"active\":false,\"label\":\"T9\"}}, so the cold reading is the arm and not a blind instrument.",
      "verdict": "PASS",
      "assertion": "A cold boot performs no write at all: the record is untouched, nothing is minted, no event fires, and the reserved first constraint evaluation is not taken by that boot.",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app booted over a brand-new scratch profile (--provident-user-data=<mkdtemp>)", "liveSurfacePresent": true }
    },
    {
      "u": "U-3",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 0,
      "observation": "MEASURED (driver row M1): order=[\"t9\"] read at tier=file with the entry's own record value delivered. MEASURED (driver row M2): with the seed's order [\"t9\",\"ghost\"] and a ghost whose entry was never written, the app's store answers {found:undefined,status:refused,reason:no-such-anchor,step:D-ANCHOR,segment:ghost} — the read-side refusal of §3.1 M-3's dated note and §3.6's dated note, NOT the declared miss and NOT found:false; CONTROL in the same reading: t9 (a written entry) answers found=true with value {target:page-9,active:true,label:T9}, so the two admissible read answers are not collapsed into one.",
      "verdict": "PASS",
      "assertion": "The membership and its order are the record's own and are read back exactly as seeded; a member seated in order whose entry was never written answers the read-side refusal rather than the declared miss.",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app's own renderer realm on a seeded scratch profile", "liveSurfacePresent": true }
    },
    {
      "u": "U-4",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs (two real boots on one profile)",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 1,
      "observation": "MEASURED (driver row M6, seed order=[] — §3.2 F-T2-4's declared arm): REALM 1's own store reads order=[] and file.tabs.landing as {reason:no-such-anchor} — NO re-seat and NO activation ever landed; REALM 1's profile file is BYTE-UNCHANGED {\"schemaVersion\":\"1\",\"file.tabs.order\":[]}; REALM 2's hand-off reads order=[] again. MEASURED CONTRAST (driver row M4, a seeded ZERO-ACTIVE state over order=[\"t9\",\"tA\"]): the boot step's evaluated write DOES repair when a member exists — the post-state carries exactly one active, order[0]=\"t9\". MEASURED (driver row A-3): a file-tier commit made through the same app's own store answered {status:committed,crossings:1} and the profile file WAS updated (to {\"file.settings\":\"written-by-the-app-store\",\"schemaVersion\":\"1\"}), so the crossing seam does reach the tier for a value that changes.",
      "verdict": "FAIL",
      "assertion": "The boot step's evaluated write must land the record the realm derived — an emptied membership must be repaired (§3.2 F-T2-4: the reserved entry re-seated as order[0] AND activated) and that state must be the one the tier hands to the next realm.",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app booted twice on one scratch profile; the profile's provident-settings.json read directly from disk by the driver", "liveSurfacePresent": true }
    },
    {
      "u": "U-5",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 1,
      "observation": "MEASURED (driver row M8): closeTab(store,'landing',['t9']) answers {refusal:reserved-name, callerOperations:2, commit withheld, cleared:[], events:0} — the STORE's own reserved-name refusal, with the sibling control closeTab(store,'t9',[]) writing (remove:committed, commit:committed) and the order moving [\"t9\",\"landing\"] -> [\"landing\"], so the refusal is the reservation's and not the call path's. MEASURED (driver row M9, seed order=[\"t9\",\"landing\"] with the reserved entry active): closeTab(store,'t9',[]) leaves order=[\"landing\"] (the declared re-seat), the reserved entry reading ACTIVE through the SCALAR arm (value === true, the accessor pair's second declared arm) and exactly one active over the record's own entries; the landing page's record witness reads true. MEASURED (driver row M7): the close of the ACTIVE tab answers {callerOperations:2, refusal:null, remove:committed, commit:committed, crossings:0, repaired:[]}, the store's FINAL order is [\"landing\"] — and the profile file is BYTE-UNCHANGED after the close ({\"schemaVersion\":\"1\",\"file.tabs.order\":[\"t9\",\"landing\"],\"file.tabs.t9\":{…active:false…},\"file.tabs.landing\":{…active:true…}}), i.e. the close's own effects do not reach the tier even though row A-3 measures the crossing reaching it for another declared root.",
      "verdict": "FAIL",
      "assertion": "Closing a tab must persist: the tier must hold the post-close record, and the close's OWN terminal states must hold (order rewritten to the survivors, the reserved entry's removal refused by name, the close-last-tab repair re-seating and activating the reserved entry).",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app's own store and the profile file on disk, on a seeded scratch profile", "liveSurfacePresent": true }
    },
    {
      "u": "U-6",
      "layer": "U",
      "instrument": "node tests/store-tabs-record-live.mjs (two boots, one profile)",
      "cmd": "node tests/store-tabs-record-live.mjs",
      "exit": 1,
      "observation": "MEASURED (driver row M6): seed order=[]; REALM 1's store reads order=[] with the reserved entry unwritten; the profile file is byte-unchanged after realm 1; REALM 2's hand-off reads order=[] — the boot-derived membership is RE-DERIVED, never carried. MEASURED (driver row M7): a close performed in the realm leaves the profile byte-unchanged, so nothing a realm derives from a close can be carried either. MEASURED CONTROL (driver row A-3): the crossing seam DOES reach the tier when the written value changes (a file-tier commit on another declared root returned crossings:1 and updated the profile file to {\"file.settings\":\"written-by-the-app-store\",\"schemaVersion\":\"1\"}), so the reading above is a property of the record's own writes and not of a blind instrument.",
      "verdict": "FAIL",
      "assertion": "A restart on the same profile carries the record the previous realm landed: the membership the app derived must be readable from the tier, not re-derived from the same seed on every boot (§3.1 M-5).",
      "d_class": "D1",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app booted twice on ONE scratch profile; the profile file read from disk between and after the boots", "liveSurfacePresent": true }
    },
    {
      "u": "U-7",
      "layer": "U",
      "instrument": "node scripts/mcp-cli.mjs --target http --port <n> targets + MANUAL OPERATOR",
      "cmd": "node scripts/mcp-cli.mjs --target http --port <n> targets",
      "exit": 0,
      "observation": "MEASURED (driver row P1): the assembled app authors 25 nodes; the tabs-* set is exactly [\"tabs-landing-page\",\"tabs-error-page\"] and it carries 2 handler-bearing nodes ([{id:tabs-landing-page,handlers:[{name:tabs-landing-page-open,event:click}]},{id:tabs-error-page,handlers:[{name:tabs-error-page-open,event:click}]}]); NO close control and NO mint control exists, so no real press on one can be driven. The press machinery itself is measured working in the same run (driver row M12's control: a real CDP press on the authored #inc button moved #counter 0 -> 1), so the park is about the missing affordance and not about the press. EMPTY-PENDING: the operator's own press on those controls — NO HUMAN OPERATOR WAS PRESENT AND NO TOOL OUTPUT IS SUBSTITUTED. PARK REASON (STRUCTURAL, the only lawful reason): the affordances are AUTHORED DATA and the app authors none; authoring one is a `src/shared/demo-envelope.ts` edit, which is outside this pass's edit set (ONE driver file), so the row is not merely un-run this pass — it is not driveable until an affordance is authored.",
      "verdict": "PARKED",
      "assertion": "A real press on the authored focus/activate, close and mint controls must produce the store's post-state and the rendered result — but no such control exists in the assembled app.",
      "d_class": "D2",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app's authored target set, read through the MCP instrument", "liveSurfacePresent": true }
    },
    {
      "u": "U-8",
      "layer": "U",
      "instrument": "MANUAL OPERATOR",
      "cmd": "MANUAL",
      "exit": 0,
      "observation": "EMPTY-PENDING — NO HUMAN OPERATOR WAS PRESENT IN THIS PASS, SO THE OPERATOR OBSERVATION IS NOT TAKEN AND NO TOOL OUTPUT IS SUBSTITUTED FOR IT (the three untaken precedents are named in §5: docs/specs/gutter-ui-live-battery.md:536-541 and :682). WHAT IS MEASURED BESIDE IT (record witnesses only, never a painted reading): driver row M9 — the close-last-tab repair re-seats the reserved entry as order[0] and activates it (order=[\"landing\"]; arm=scalar-arm-active) and the landing page's record witness reads true; driver row M11 — a tab whose own entry carries an error token answers the error witness {witness:true, nodeId:tabs-error-page, tabId:t9} while the landing arm's witness is false; driver row M10 — both authored nodes are present and render as <section … role=\"page\" class=\"card tabs-page\">…</section>. OWNER: the supervisor, at a session with a human at the window; the session sheet (§5) carries the boot command, the literal steps, the value to read and its location.",
      "verdict": "PARKED",
      "assertion": "The operator must SEE the landing page become the terminal after the last tab closes and the error page become a tab's terminal for an unresolvable target — a human's eye on a painted box, on the real window.",
      "d_class": "D-visual",
      "real_input": true,
      "proxyPASS": false,
      "surface": { "target": "the assembled app's real window on DISPLAY=:0 (the painted surface), with the record witnesses as corroboration", "liveSurfacePresent": true }
    }
  ],
  "summary": { "total": 8, "passed": 3, "failed": 2, "parked": 2, "manual": 1 },
  "nonRowNotes": [
    { "id": "M1", "kind": "RUN-ROW (term of U-1 and U-3)", "verdict": "PASS", "note": "the app's own store holds the seeded record at the file tier; the tabs root is declared (the root control answered malformed-name, never undeclared-name); 25 authored nodes, 2 of them tabs-*." },
    { "id": "M2", "kind": "RUN-ROW (term of U-1 and U-3)", "verdict": "PASS", "note": "the never-written member ghost answers the read-side refusal no-such-anchor at D-ANCHOR, with the written t9 as the control that the read pair is not collapsed." },
    { "id": "M3", "kind": "RUN-ROW (term of U-1)", "verdict": "PASS", "note": "one constraint member {id:exactly-one-active, matchedSet:tabs, evaluatedOn:[set,commit,remove]} at the app's own construction." },
    { "id": "M4", "kind": "RUN-ROW (control for U-4)", "verdict": "PASS", "note": "a seeded zero-active state over order=[\"t9\",\"tA\"] IS repaired by the boot step's evaluated write: exactly one active, order[0]=\"t9\"." },
    { "id": "M5", "kind": "RUN-ROW (term of U-2)", "verdict": "PASS", "note": "cold boot: no commit, nothing minted, no event; the profile still carries no settings file; a seeded profile's file is the non-vacuity control." },
    { "id": "M6", "kind": "RUN-ROW (term of U-4 and U-6)", "verdict": "FAIL", "note": "seed order=[]: realm 1's repair never lands, the file is byte-unchanged, realm 2 re-derives order=[]." },
    { "id": "M7", "kind": "RUN-ROW (term of U-5 and U-6)", "verdict": "FAIL", "note": "the close's own states hold (order rewritten to [\"landing\"], receipts returned) but the tier is byte-unchanged after the close." },
    { "id": "M8", "kind": "RUN-ROW (term of U-5)", "verdict": "PASS", "note": "the reserved entry's own removal refused by name ({refusal:reserved-name, cleared:[], events:0, commit withheld}), with the non-reserved sibling's close writing as the control." },
    { "id": "M9", "kind": "RUN-ROW (term of U-5, corroboration for U-8)", "verdict": "PASS", "note": "close-last-tab: order re-seated to [\"landing\"], the reserved entry active through the SCALAR arm, exactly one active, the landing witness true." },
    { "id": "M10", "kind": "RUN-ROW (term of U-1, corroboration for U-8)", "verdict": "PASS", "note": "both authored nodes present with role=page, rendered as card/tabs-page sections, census 25/25/0/0/0." },
    { "id": "M11", "kind": "RUN-ROW (corroboration for U-8)", "verdict": "PASS", "note": "a tab whose entry carries an error token answers the error witness {witness:true, nodeId:tabs-error-page, tabId:t9}; the landing arm's witness is false." },
    { "id": "M12", "kind": "RUN-ROW (real user input; control for U-7)", "verdict": "PASS", "note": "a real CDP press at (245,346) verified ON the authored landing node (hit=SECTION#tabs-landing-page.card.tabs-page, after scrolling it into view) leaves the record and the rendered markup byte-identical, and the MCP dispatch of the page's own authored handler answers dirtied=[]; the same aim/press machinery moved #counter 0 -> 1 on #inc." },
    { "id": "P1", "kind": "PARKED ROW (U-7)", "verdict": "PARKED", "note": "no close control and no mint control exists in the assembled app; STRUCTURAL (the affordance would have to be authored, and that edit is outside this pass)." },
    { "id": "P2", "kind": "PARKED ROW", "verdict": "PARKED", "note": "the landing page as a RENDERED terminal: unreachable from any app-visible input because the flow that reaches it needs a close control (P1); its record witness is measured instead (M9/M11)." },
    { "id": "P3", "kind": "PARKED ROW (U-8)", "verdict": "PARKED", "note": "the painted rows: a human's eye on a box; the driver's oracles are state reads and never a rendered-box reading (§5 session sheet carries them)." },
    { "id": "A-1", "kind": "PREFLIGHT / SURFACE CONTROL", "verdict": "CONTROL", "note": "the page's globals matching /prov|store|tabs/i are 9 host globals plus `provident` alone; window.provident keys = [ready,onRequest,sendReply,notify,security,module,store]; the bridge's store keys = [get,put,onFileChanged]; typeof window.__wiredStore = undefined and typeof window.provident.tabs = undefined — so the page carries NO record read and the MCP surface exposes NO tabs tool." },
    { "id": "A-2", "kind": "DECLARED-BOUND CONTROL", "verdict": "CONTROL", "note": "no row asserts agent-drivability (S-d9: the MCP surface carries no coordinates) and no row asserts that a painted surface was seen." },
    { "id": "A-3", "kind": "CHANNEL DIAGNOSTIC (not this unit's row)", "verdict": "CONTROL", "note": "a file-tier commit through the app's own store on another declared root answered {status:committed,crossings:1} and UPDATED the profile file to {\"file.settings\":\"written-by-the-app-store\",\"schemaVersion\":\"1\"} — the crossing seam reaches the tier; the diagnostic also shows the crossing writes a translated, whole-record projection (the tabs keys are absent from the written file), which is a fact about the channel and is NOT attributed to this unit." },
    { "id": "PREFLIGHT-1", "kind": "PREFLIGHT", "verdict": "CONTROL", "note": "each boot is preceded by a stale-process sweep on its own CDP port (the sibling drivers' T-8 discipline) and uses a FRESH --provident-user-data=<mkdtemp> profile, swept after the run." },
    { "id": "STATIC-1", "kind": "STATIC READING", "verdict": "CONTROL", "note": "the `scripts` key set was re-read this pass: clean, build, build:watch, start, start:http, typecheck, typecheck:tests, test, test:watch, battery, divergence, ui, mcp — no key added, so tests/ui-leg-contract.test.ts's L-1 set-equality holds by construction." }
  ]
}
```

### 3a. THE FOUR FALSIFIABLE CLAUSES, CHECKED (`user-flow-audit.md` §3; `§5.U` item 3)

1. **`summary.total === 8`** and **`3 PASS + 2 FAIL + 2 PARKED = 7`, with the eighth row carried as `manual` (`3 + 2 + 2 + 1 = 8` ✓)** — the row set is exactly the matrix's `U-1`…`U-8`, in matrix order, no id added, dropped or renamed. **`manual` is a count of the rows whose verdict is `PARKED` WITH an operator-observation `observation` field**, not a sixth verdict: the closed verdict set is `{PASS, FAIL, PARKED}`, and `U-8` appears once in `rows[]` with `verdict:"PARKED"` and an EMPTY-PENDING observation. The counts therefore sum to `total` **with `manual` named as a subset of `parked`, never as a fourth verdict**.
2. **Every `observation` is MEASURED, never projected.** Every pass/fail observation quotes a value read in this run (a store answer, a profile file's bytes, a receipt, an MCP tool's output with its exit code) or a driver row's own printed line. **The three `MANUAL OPERATOR` rows' observations are EMPTY-PENDING and say so** — a projected operator value would be a FAIL and there is none.
3. **Every `instrument` is from the CLOSED SET** — a shipped tool (`node scripts/mcp-cli.mjs --target http --port <n> …`), a literal command line (`node tests/store-tabs-record-live.mjs`), or `MANUAL OPERATOR`. **No row names "the live gate" or "the leg".**
4. **Every `cmd` is a literal command line or the literal token `MANUAL`, each with its own `exit`.** The `MANUAL` row's `exit` is `0` in the sense the sibling record uses (`docs/specs/gutter-ui-live-battery.md`'s landed form): the token names no process, so no exit code exists and none is invented; the empty-pending observation is what carries that fact.

**`real_input` AND THE CLOSED VERDICT SET, DEFINED ONCE SO THE FIELD IS NOT OVER-READ.** `real_input: true` means **the row's subject is a real gesture or a real external event rather than an internal seam** — the boot itself, a real CDP press at verified coordinates, or the operator's own press. **It does NOT by itself mean the gesture was taken:** on `U-7` and `U-8` the flag records that the gesture is required and was **NOT** taken (their `verdict` is `PARKED` and their `observation` says EMPTY-PENDING), while on `U-1`…`U-6` the real input WAS driven. **Every row's `real_input` is `true` here and `proxyPASS` is `false` on every row: no row is a proxy for a gesture, and no row's PASS is a proxy's PASS.** **The closed verdict set is `{PASS, FAIL, PARKED}`** — `PASS` exactly when the row's pinned assertion held on the live app, `FAIL` when it did not, `PARKED` when the row's instrument does not exist yet or is a human's eye (with its structural reason recorded).

---

## 4. THE RUN — command, exit, rows, and the parse cell

**THE LEG TABLE.**

| # | The command (literal) | Exit | The verbatim result line |
| --- | --- | --- | --- |
| 1 | `npm run build` | `0` | `dist/main/main.cjs`, `dist/main/preload.cjs`, `dist/main/standalone.mjs`, `dist/main/battery-host.mjs` (1.5mb), `dist/renderer/renderer.js` (496.6kb) — all bundles written |
| 2 | `node tests/store-tabs-record-live.mjs` (RUN 1) | `1` | `[live] rows=18 (run 12 = PASS 10 + FAIL 2; PARKED 3; CONTROL 3)` / `[live] U-STORE-TABS-RECORD (T2) LIVE DRIVER: 2 RUN ROW(S) FAILED` |
| 3 | `node tests/store-tabs-record-live.mjs` (RUN 2, the re-run) | `1` | `[live] rows=18 (run 12 = PASS 10 + FAIL 2; PARKED 3; CONTROL 3)` — **IDENTICAL VERDICTS ACROSS BOTH RUNS** (the two runs' id·verdict line sets differ by nothing) |

**THE DRIVER'S OWN FIGURES, WITH THEIR TERMS:** `18` rows printed = `12` RUN + `3` PARKED + `3` CONTROL; the `12` RUN rows split `10` PASS + `2` FAIL; exit `1` (the driver exits `1` when any RUN row fails, `0` when none does, `2` on an infra fatal). **The PARKED and CONTROL rows do NOT enter the exit code** — a parked row is `OPEN`, never green, and is reported separately.

**THE `§6.1` PARSE CELL — the exact command and its verbatim output.** This extracts the fenced `json` block from §3 and parses it, so the report above is machine-readable rather than prose:

```
$ python3 -c "import re,json,sys; s=open('docs/specs/store-tabs-record-live-battery.md',encoding='utf-8').read(); m=re.search(r'\`\`\`json\n(.*?)\n\`\`\`', s, re.S); d=json.loads(m.group(1)); print(json.dumps({'ids':[r['u'] for r in d['rows']],'total':d['summary']['total'],'counts':{k:v for k,v in d['summary'].items() if k!='total'},'emitter':d['emitter'],'rows':len(d['rows']),'nonRowNotes':len(d['nonRowNotes'])}))"
```

**ITS VERBATIM OUTPUT (taken this pass, against the file as written):**

```
{"ids": ["U-1", "U-2", "U-3", "U-4", "U-5", "U-6", "U-7", "U-8"], "total": 8, "counts": {"passed": 3, "failed": 2, "parked": 2, "manual": 1}, "emitter": "MANUAL", "rows": 8, "nonRowNotes": 20}
```

**WHAT THE PARSE PROVES, CLAUSE BY CLAUSE:** `rows` is `8` and equals `summary.total`; the row set is `U-1`…`U-8` exactly (the matrix's set, in matrix order); `summary`'s non-`total` terms are `passed 3 · failed 2 · parked 2 · manual 1`, whose sum WITH `total` named as the whole is `8` (with `manual ⊆ parked` declared in §3a clause 1); the `emitter` is the literal `MANUAL`; and `nonRowNotes` carries `20` entries — **controls, preflights, per-row terms and static readings, which are NOT verdict entries and are NOT counted in `rows[]` or in `summary`.**

---

## 5. THE `MANUAL OPERATOR` ROWS — NOT TAKEN, WITH THEIR STRUCTURAL REASON AND THE SESSION SHEET

**NO HUMAN OPERATOR WAS PRESENT IN THIS PASS, AND NO TOOL OUTPUT STANDS IN FOR AN OPERATOR OBSERVATION.** Every row whose truth is **a human's eye on a painted box** is recorded here as `MANUAL OPERATOR` with an EMPTY-PENDING observation. **OWNER: THE SUPERVISOR, AT A SESSION WITH A HUMAN AT THE WINDOW.**

**THE THREE UNTAKEN PRECEDENTS, NAMED SO THIS UNIT DOES NOT RE-DISCOVER THEM (`§5.2` item 7(c); `§7` item 2(d)):** `docs/specs/gutter-ui-live-battery.md`'s `U-3` (`:536`'s `"instrument": "MANUAL OPERATOR"`), `U-4` and `U-6` (the same block at `:536-541`, whose observation reads *"NO HUMAN OPERATOR WAS PRESENT THIS RE-RUN — the operator observation the row requires is NOT taken, and no tool output is substituted for it"*), and `:682`'s item 1 (*"Take the three `MANUAL OPERATOR` rows with a human at the window — they remain the only rows no shipped instrument can discharge"*).

### 5a. THE OPERATOR ROWS

| # | The operator row | Its `cmd` (literal) | Instrument | Observation | Verdict | Structural reason it is not taken by the driver |
| --- | --- | --- | --- | --- | --- | --- |
| **O-1** | **The landing page as the operator's TERMINAL after the last tab closes** (the unit's `§3.5` item 1 / `§3.2` F-T2-3; matrix `U-8`) | `MANUAL` (after the boot command below) | `MANUAL OPERATOR` | **EMPTY-PENDING** | **PARKED (OPEN)** | The row's truth is a painted box at the operator's eye. The driver's oracles are state reads and DOM presence; a computed-style read would prove FAIL, never PASS. **The flow that reaches it also needs a close control the app does not author (`U-7`/`P1`), so the OPERATOR's own path to it is `close the last tab via the close control` — which is itself gated on that affordance being authored.** |
| **O-2** | **The error page as a tab's TERMINAL for an unresolvable target** (the unit's `§3.5` item 2 / `§1.1` item 7; matrix `U-8`) | `MANUAL` (after the boot command below) | `MANUAL OPERATOR` | **EMPTY-PENDING** | **PARKED (OPEN)** | Same: a rendered terminal is a painted fact. Its RECORD witness is measured (`M11`: `witness:true`, `tabId:t9`), and the record witness is corroboration for the session — never a substitute for the eye. |
| **O-3** | **The visible strip geometry and an affordance's rendered word/position — a visual state change** (matrix `U-7`/`U-8`; `§5.2` item 7(a) item (ii)) | `MANUAL` (after the boot command below) | `MANUAL OPERATOR` | **EMPTY-PENDING** | **PARKED (OPEN)** | **STRUCTURAL, TWO-STAGE:** (a) the affordances this row would look at (a focus/activate control, a close control, a mint control) **do not exist in the assembled app** — `list_targets` measured `25` nodes with only the two `tabs-*` pages — so there is nothing to see; (b) even with them authored, the row's truth is a human's eye on a painted box, which no shipped instrument carries. **A park for "no session was available" is named as such ONLY for the eye half; the affordance half is a missing-artifact park.** |

### 5b. THE SESSION SHEET — ONE SESSION CLOSES ALL THREE

**THE BOOT COMMAND (literal, one line; the app must be the only instance on the display — the sibling drivers' preflight refuses a stale app process):**

```
npm run build && DISPLAY=:0 ./node_modules/.bin/electron . --no-sandbox --disable-dev-shm-usage --provident-user-data=$(mktemp -d /tmp/t2-operator-XXXXXX) --remote-debugging-port=9333 --mcp-port=3787
```

**THE SEED (run BEFORE the boot command, in the same shell, with `$PROFILE` bound to a directory the operator creates — this is what makes the record non-empty so the flows have a subject):**

```
PROFILE=$(mktemp -d /tmp/t2-operator-XXXXXX)
printf '%s\n' '{"schemaVersion":"1","file.tabs.order":["t9","landing"],"file.tabs.t9":{"target":"page-9","active":false,"label":"T9"},"file.tabs.landing":{"target":"landing","active":false,"label":"Landing"}}' > "$PROFILE/provident-settings.json"
```
…then boot with `--provident-user-data="$PROFILE"`.

**THE STEPS, IN ORDER, AND THE EXACT VALUE TO READ AND WHERE IT APPEARS.** Each step names the corroborating readings to take BESIDE the eye — `targets`, `html` and `node-state` — so the session leaves both the operator's observation and the machine's corroboration.

| Step | What the operator does (literal) | THE VALUE TO READ, AND WHERE IT APPEARS | The corroborating readings to take BESIDE it (literal commands) |
| --- | --- | --- | --- |
| **S-1** | Boot with the seed above and **look at the window for 5 seconds without touching anything.** | **Whether a page element is VISIBLE in the window, and its word** — the authored nodes are labelled `Landing` (`#tabs-landing-page`) and `Tab error` (`#tabs-error-page`). **Also read: is `Landing` the surface the operator would call a TERMINAL (a page) rather than a strip row?** Write the answer as a sentence with the words the operator actually sees and where on the window they are. | `node scripts/mcp-cli.mjs --target http --port 3787 targets` (expect `25` nodes, `node-24`/`node-25` with `cssId` `tabs-landing-page`/`tabs-error-page`); `… html`; `… node-state tabs-landing-page` (expect `props {id:tabs-landing-page, role:page}`, `content "Landing"`) |
| **S-2** | **Scroll the window down until `Landing` and `Tab error` are on screen**, then **read the two elements' rendered words and their positions relative to each other**, and **write down the pixel-ish description** (above/below, left/right, roughly how wide/tall versus the cards above them). | **The two pages' rendered words and their ORDER/POSITION on the window** — this is the row that only an eye can take. | `… html` (expect the two `<section … class="card tabs-page" style="display: block;">` elements in the document order landing-then-error) |
| **S-3** | **Click the `Landing` element once with the mouse.** | **Whether anything on the window CHANGES** (a highlight, a scroll, a text change, a new element). Expected and required: **NOTHING changes** — the page carries no state and renders from the record (`§3.5` item 3). Record the operator's own words for "nothing moved". | `… dispatch tabs-landing-page click` (expect `{"results":[null],"dirtied":[]}`); `… html` before/after (the markup must be identical) |
| **S-4** | **The terminal half of `O-1`: with the close control present** (only after the affordance is authored — see the note below), **close the non-reserved tab by its own control, then LOOK.** | **Whether `Landing` is now the surface the operator reads as the app's terminal** (i.e. the landing page is what remains / is shown), and the exact words on it. **Record the operator's sentence.** | `… targets` and `… html` after the close; the record side: the close's own receipt and `file.tabs.order` (expected: order carries only the reserved entry and exactly one entry reads active) |
| **S-5** | **The terminal half of `O-2`: seed a tab whose entry carries an error token** (stop the app, re-seed `file.tabs.t9` with `"error":"unresolvable-target"`, restart the app), **then LOOK.** | **Whether the error terminal is what the operator SEES for that tab, and where** — the exact words on screen and their position. | `… targets` / `… html` / `… node-state tabs-error-page` (expected `props {id:tabs-error-page, role:page}`, `content "Tab error"`) |
| **S-6** | **The `O-3` half: with the affordances authored** (see the note), **hover and press the focus/activate control, the close control and the mint control in turn, LOOKING at each.** | **The rendered word on each control, where it sits in the window, and what visibly changes on a press** — a sentence per control, plus whether the change is what the contract says it should be. | `… targets` (each control's `cssId` + its handler name/event) and `… html` before/after each press |

**THE NOTE THE SESSION SHEET MUST CARRY (`O-1`, `O-3`):** **`S-4` and `S-6` are gated on an affordance that does not exist yet.** MEASURED this pass: the assembled app authors `25` nodes and the only `tabs-*` nodes are the two pages (`P1`), so an operator at the window TODAY can take `S-1`, `S-2`, `S-3` and `S-5` (the landing page's terminal state is reachable via the SEED, not via a close) and CANNOT take a press on a close/mint control. **`O-3`'s eye half therefore closes only after an authored affordance lands; the session should record `S-6` as NOT-TAKABLE-YET rather than skipping it silently.**

**WHAT THE OPERATOR ROWS DO NOT COVER, SAID SO THE SHEET IS NOT OVER-READ:** none of them is evidence about the record's arithmetic, the constraint, the close's receipts or the persistence — those are the machine rows' and are reported in §3; and **a machine green is never a substitute for an operator row.** (`§5.2` item 7(d)'s layer split, applied.)

---

## 6. FINDINGS

**F-1 — `[U]`, `U-4`: the boot step's declared terminal repair does NOT land on an EMPTIED membership, and the realm's boot-derived state never reaches the tier.**
The seed is `{"file.tabs.order":[]}`. `§3.2` F-T2-4 declares the outcome in its own words: *"A caller `commit('file.tabs.order', [])` is a post-state with no entries … so the zero-active arm fires and the repair re-seats the landing entry as the sole member of `order` and activates it — the entry landing at no index (the sequence was empty), so the repair writes the landing entry as `order[0]`"*, and `§3.1` M-1 adds *"there is never a state with zero tabs"*. **MEASURED:** realm 1's store reads `order=[]` and `file.tabs.landing` answers `no-such-anchor`; the profile file is BYTE-UNCHANGED; realm 2 re-derives `order=[]`. **The contract's own `§3.3` item 7 explains the mechanism and the contradiction it creates:** an EMPTY hand-off is the declared NO-WRITE arm (*"NO WRITE AT ALL: written:false, receipt:null … NOTHING MINTED, NOTHING EVALUATED, NO EVENT FIRED, the reserved first constraint evaluation is NOT taken by that boot"*), and `§3.4` item 3 closes the other door (*"`clear` and `sweep` DO NOT evaluate it"*; `hydrate` never evaluates, `§3.3` item 2). **So on an emptied/empty handed-off membership NO declared operation can reach the repair, and the app sits in the zero-member, zero-active state `M-1` declares unreachable.** A related live measurement with the same shape but a different trigger is already on the tree: `94bf110`'s own red set (`RM-1`/`RM-2`) measures `remove('file.tabs.B')` answering `{committed, repaired:[]}` with `actives []` where the falsifier requires the repaired survivor. **THIS PASS DOES NOT ATTRIBUTE A CAUSE beyond what it measured** (the driver's channel diagnostic `A-3` shows a file-tier commit on another declared root crossing and updating the tier, so "the channel is dead" is NOT the finding).

**F-2 — `[U]`, `U-5`/`U-6`: the close's own effects do not reach the persisted tier, so the unit's `M-5` round-trip does not hold as written.**
`§2.4` declares the persisted close and `§3.1` M-5 declares *"the record is tier-1 data, so a re-boot's `Y-1` hand-off carries the record WITHOUT a closed tab and WITH the landing entry present"*. **MEASURED (row `M7`):** `closeTab(store,'t9',['landing'])` on the seeded profile answers `{callerOperations:2, refusal:null, remove:committed, commit:committed, crossings:0, repaired:[]}`, the app's own store's final `order` is `["landing"]` — **and the profile file after the close is byte-identical to the file before it.** **MEASURED CONTROL (row `A-3`):** a file-tier commit made through the same store on another declared root (`file.settings.liveProbe`) answered `{status:committed, crossings:1}` and **DID** update the profile — so the instrument observes persisted writes and the reading above is about the close. **The channel reading in `A-3` is recorded and NOT attributed to this unit** (it is a persist/seam fact): the crossed projection replaces the whole settings record with the graph's translation, and the tabs keys are absent from that written file.

**F-3 — `[U]`, `U-7`: the unit's authored tab affordances do not exist in the assembled app, so the close/mint/focus flows are not reachable by ANY app-visible input.**
`§1.1` item 7 declares the two pages *"provident-authored envelope nodes plus a bounded wiring role each"* and `§1.1` item 8 the ONE minting site; the matrix's `U-7` asks for real presses on "the authored tab affordances (focus/activate, the close control, the mint control — whatever `src/shared/demo-envelope.ts` authors and the wiring drives)". **MEASURED (row `P1`):** `list_targets` carries `25` nodes; **the `tabs-*` set is exactly `["tabs-landing-page","tabs-error-page"]`** and it carries exactly `2` handler-bearing nodes (each a `page`-roled `section` with an inert `click` body). **`src/shared/demo-envelope.ts` authors NO close control and NO mint control**, and no other `src/**` file carries a `file.tabs` write outside the record's own wiring. **CONSEQUENCE:** the unit's record-side flows are driveable only through the wiring's exported seam against the app's own store (which is what rows `M7`/`M8`/`M9` do, and which every such row DECLARES in its own observation), **not through any user gesture** — so `U-7` is PARKED on a missing artifact, and **a `[U]`-green claim about a press on a tab affordance would be a fabricated row.**

**F-4 — `[U]`, `U-8`: the painted rows remain operator rows, and the pages' rendered content is not record-sourced.**
Rows `M9`/`M11` measure the two pages' **record witnesses**; row `M10` measures their **authored structure** (`role=page`, class `card tabs-page`, content `Landing` / `Tab error`). **MEASURED, and recorded as a limit rather than a verdict:** the pages' rendered markup is **byte-identical across every record state this pass booted** (cold, seeded, landing-active, error-carrying) — the authored content is a fixed string and the wiring's role drives `elementForNodeId` but writes no content. `§5.1` item 2 permits the authored object to carry *"its **record-sourced** content"* where the page shows record text; **this pass does not claim that clause is satisfied, and it does not claim the operator would see anything different across states.** **The operator rows are where that is settled, and they are NOT taken (see §5).**

**F-5 — PROCESS, recorded because it bit this pass:** the unit's `§5.1` item `3b` driver path is `tests/store-tabs-record-live.mjs` and it is run by a **literal command line**; the `scripts` key set was re-read this pass and is unchanged, which is what keeps `tests/ui-leg-contract.test.ts`'s `L-1` set-equality green. **A future pass that adds a `scripts` key for this driver reddens `L-1` and cannot satisfy it by a config change** (`§7` item 4).

---

## 7. THE HONEST LAYER STATEMENT

**`[U]` = the ASSEMBLED/RENDERER surface.** Every PASS/FAIL row in §3 is evidence about **the running app's own renderer realm** — the store the app booted (hand-off → `hydrate` → the slice boot step → the constraint member supplied at the store's one construction site), read through the renderer module's own exported `getWiredGraphStore()`, and the app's MCP surface on its live HTTP transport. **THIS EVIDENCE IS ADDITIVE AND APP-GREEN FOR THESE CELLS ONLY.** It **RETIRES NO ENVELOPE ROW AND NO NODE ROW**: the unit's `[T]` register rows, its red set, its `[H]` wiring rows and every claim they carry stand exactly as filed, **and nothing in this record re-grains, re-asserts or replaces one of them.**

**WHAT THIS RECORD DOES NOT CLAIM.**
1. **NO AGENT-DRIVABILITY.** A CDP click does not make this surface agent-drivable: the MCP tool surface carries an event NAME and no coordinates (`S-d9`), so **no row here may be read as "an agent can drive the tab record."**
2. **NO PAINTED-SURFACE OBSERVATION.** No row asserts that a rendered box was SEEN. The `MANUAL OPERATOR` rows are the only painted rows and they are **EMPTY-PENDING** (§5).
3. **NO GEOMETRY, NO TIMING.** No row makes a geometry or timing claim; the numbers printed are counts, byte-identities and declared values.
4. **NO `[D]` CLAIM, AND THE WORD `waived` IS NOT USED** (`§5.2` item 6): no divergence observation was taken, and the refusal is structural rather than a waiver.
5. **A NODE-GREEN ON THIS UNIT IS ENVELOPE-GREEN AND NEVER APP-GREEN** (`§1.3` item 3) — which is exactly why this gate exists, and why **the two FAIL rows above are findings rather than a re-grain**: they are the live app contradicting the contract, not a module failing a module's test.
6. **THE `§6.2` READ-ONLY AUDIT IS OWED AND IS NOT EMITTED HERE.** This report is authored by the party that ran the matrix, so the audit must be taken by a party that did NOT author it (`user-flow-audit.md` §4; `AGENTS.md` item 10a/RCA-4). **Its duties are unchanged and it edits nothing**: reconcile `summary.total` against the matrix row by row; reconcile every verdict against its recorded observation and named instrument; check `predicateSourcePresent` against the tree; check for projection; report rather than silently fix; and **never upgrade a layer**.

---

## 8. THE MECHANISM BEHIND F-1/F-2, MEASURED — FILED `2026-10-11`, APPENDED BESIDE THE FINDINGS ABOVE

**`RCA-8(d)`:** **this section is a dated block APPENDED AFTER the findings; every byte of `§1`–`§7` above stands as filed and is not rewritten, re-numbered or superseded.** **What it adds is the MECHANISM a read-only investigation then measured for the two FAIL rows this record already carries** — it re-opens nothing, it converts no verdict, and **it does not take the `MANUAL OPERATOR` rows.**

**8.1 THE MECHANISM, AND EVERY NUMBER BELOW IS THE INVESTIGATION'S MEASUREMENT, QUOTED AS SUCH.** The frozen store pushes its channel cargo (`GraphCrossing.put`, **a stable-JSON translation of the whole graph** — `store-core-graph.md` `§2.8` item 7/8) from **exactly two sites**: `mintNewHolder` (`src/renderer/store-core-graph.ts:1761`) and `regenerationReceipt` (`:1623`) — while the store's **in-place edit of an already-existing `(logical path, file)` node** (`editNode`, `:1505`) and its **`remove`** (`removeOp`, `:1944`) contain **no `crossingPut` call at all** and **hard-set `crossings: 0`** (`:1507`, `:1983`). Boot's `hydrate(bootHandoff)` (`src/renderer/renderer.ts:1329`) has **already minted** every handed-off record name at the file tier — the frozen contract's own words for that step are *"It NEVER CROSSES"* — so **every subsequent write of the record's own names takes the IN-PLACE route and nothing is ever pushed.** **THE INVESTIGATION'S MEASURED PUT COUNTS, PER ROW:** `closeTab`'s `remove('file.tabs.t9')` → **`crossings 0 · real puts 0`**; the close's `commit('file.tabs.order',['landing'])` → **`0 · 0`**; the boot step's commit → **`0 · 0`**; the `A-3` control `commit('file.settings.liveProbe', …)` → **`crossings 1 · real puts 1`** (and that control **updated the file**, which is `A-3`'s own recorded reading above).

**8.2 THE CALLS THAT FAIL TO CROSS, NAMED AT THE BYTES:** **`renderer.ts:774`** (the one evaluated boot-step `commit` — `evaluateTabsBootStep`'s `store.commit(TABS_ORDER_NAME, …)`), **`renderer.ts:643`** (the close's `order` rewrite — `closeTab`'s `holder.commit(TABS_ORDER_NAME, […nextOrder])`) and **`renderer.ts:618`** (the close's `holder.remove(tabsEntryName(tabId))`). **Each is an in-place file-tier operation on a name `hydrate` already minted, so each takes the `crossings: 0` route of `§8.1`.**

**8.3 THE CLAUSE IT VIOLATES, QUOTED:** **`docs/specs/store-core-graph.md` `§2.8` item 8** reads *"A write that crosses to `file` puts A STABLE-JSON TRANSLATION OF THE GRAPH through the declared, STUBBED `crossing` seam"* (its own continuation: *"The crossing is `U-STORE-PERSIST`'s and this unit asserts NOTHING about its order, idempotency or failure recovery"*). **An in-place file-tier commit IS a `file`-tier write and puts NOTHING — so on this reading the obligation is unmet at every site `§8.2` names.**

**8.4 ITS ANCESTRY — THE FROZEN ARTIFACT'S OWN ALREADY-FILED `D-4`, AND THEREFORE NOT A NEW CLASS.** The frozen surface artifact **already carried the defect before this unit existed**: **`D-4` = *"the never-called crossing seam and the synthesised `crossings` integer"***, at `docs/specs/store-core-module-store-core-graph-surface.md:34` in the divergence block, with its dated note at **`:219`** (*"THE CROSSING SEAM IS DECLARED, INJECTED AND NEVER CALLED IN THE LANDED BUILD, AND `crossings` IS A SYNTHESISED INTEGER … so `M-11`'s `crossings === 1` assertion currently rides a fabricated integer"*). **THIS PASS FILES THE LIVE INSTANCE OF THAT FILED CLASS, NOT A NEW DEFECT.**

**8.5 THE VERDICT: `PRE-DATES` — NOT INTRODUCED BY THIS UNIT, PROVEN BY COMPARISON RATHER THAN BY ARGUMENT.** **THE EVIDENCE, AS MEASURED: (a)** `wiredDeclarations` / `TABS_RESERVED_DECLARATION_ROWS` are **DIFF-IDENTICAL** between `git show 32ea910:src/renderer/renderer.ts` (`:748-761`, `:136-138`) and the current bytes (`:787-800`, `:136-138`); **(b)** all six roots are declared identically on both sides (measured, **with the undeclared control answering `refused:'undeclared-name'`**, so the declaration instrument has teeth); **(c)** an isolated declaration-set comparison (**`six roots`** vs **`six roots + the reserved landing row`**) is **BEHAVIOURALLY EMPTY for persistence** — the extra declaration row changes nothing about whether a write crosses; **(d)** **HEAD bytes vs current bytes produce IDENTICAL `crossings`/`puts` readings on every row of the scenario**, with the mint control crossing on both sides — **the only difference anywhere is `repaired[]` on the bare `remove`, which is the referent fix's own effect** (`317b96e`) and not a channel effect. **VERDICT: `PRE-DATES`.** **A LATER PASS MUST NOT FILE THIS AGAINST `T2`'s LANDING** — the unit's diff did not create it and its diff cannot remove it (`§8.7`).

**8.6 THE SIDE-FINDING — MEASURED, OUT OF SCOPE, AND **NOT SMOOTHED**.** **The `crossings` integer is SYNTHESISED LIVE.** A `commit('file.tabs.t9', …)` on a **SEVERED** name answers **`{status:'committed', crossings:1, repaired:[]}`** with **ZERO real `crossing.put` invocations** — `stableGraphTranslation()` is **never called** — because **the regeneration fall-through's receipt literal sets `crossings: requested === 'file' ? 1 : 0`** (`store-core-graph.ts:1900`) **while the actual push lives inside the mint/regeneration routes** (`:1623`, `:1761`). **CONSEQUENCE A LATER PASS MUST CARRY, because it is exactly the hazard `D-4` names: A ROW THAT GREENS ON `receipt.crossings === 1` CAN BE GREEN WITHOUT ANY CHANNEL BYTE MOVING.** **This is recorded as a finding about the CHANNEL and is attributed to no row of this unit.**

**8.7 THE CONTRACT CONTRADICTION — `U-4`'s REPAIR HALF, AND THE PAIR THAT CANNOT BOTH HOLD.** **`docs/specs/store-tabs-record.md` `§3.3` item 7** (with `PAR-11`, `PAR-16`, `W-4`) declares an **ABSENT or EMPTY** handed-off membership sequence a **NO-WRITE arm**: *"`written:false`, `receipt:null`, NOTHING MINTED, NOTHING EVALUATED, NO EVENT FIRED"*. **`PAR-2`** (`§6`, the `order`-value row) declares *"**an EMPTY array** → the zero-active arm fires and the repair re-seats the landing entry as `order[0]` (`F-T2-4`, a DECLARED arm, never a refusal)"*. **THE TWO CANNOT BOTH HOLD ON AN EMPTIED HAND-OFF, and that is `U-4`'s FAIL: the row's assertion is the REPAIR arm while the seam's declared arm is the NO-WRITE one.** **MEASURED: `evaluateTabsBootStep(store, [])` → `{written:false, receipt:null}`**, the file **identical before and after**, **`puts 0`** — **the guard is `renderer.ts:771`'s `carried.length === 0` early return**; **and an isolated `commit('file.tabs.order', [])` on a hydrated `order=[]` store DOES evaluate and repair** (`repaired:['file.tabs.order','file.tabs.landing']`, `puts 0`), **so the state comes from the GUARD, not from an inert store.** **NOTE ALSO, MEASURED, SO NO AMENDMENT IS WRITTEN BLINDLY:** removing the guard would **(i)** contradict the landed clause and a landed row, **(ii)** **STILL NOT FIX THE FILE** — a post-hydration `editNode` crosses nothing (`§8.1`), and **(iii)** drop the guard that keeps a **FIRST-EVER** boot from minting an `order` leaf and a landing entry on a cold tier. **SO ANY AMENDMENT MUST DISTINGUISH "an empty hand-off over a tier that holds NOTHING" (cold boot — no write) FROM "an emptied hand-off over a tier that holds the record" (the repair arm) — AND THE HAND-OFF ALONE CANNOT TELL THEM APART TODAY.**

**8.8 WHO OWNS IT — THREE OWNERS, AND ONLY TWO OF THEM ARE THIS UNIT'S.** **THE CROSSING OBLIGATION IS THE CHANNEL'S:** `store-core-graph.md` `§2.8` item 8 **names `U-STORE-PERSIST`** in its own text (*"The crossing is `U-STORE-PERSIST`'s"*), and **the site is a FROZEN MODULE** — `src/renderer/store-core-graph.ts`, file pin `0664c52f…`, inside **`T2`'s `§5.1` DENIED set** (`docs/specs/store-tabs-record.md` `§5.3`). **Patching it is a RE-FREEZE** (a new sha256, its own amendment row, the module wave's gate 3/4 re-run, and the integration artifacts invalidated) — **which is a re-scope/admission decision, not a fix this unit may take** (`docs/pending.md` `§1` row **(j)**). **THE BOOT-STEP CONTRADICTION NEEDS THE ARCHITECT:** `§3.3` item 7 and `PAR-2` are an unsatisfiable clause pair no pass may resolve on its own (`AGENTS.md` item 10a's second return point; `docs/pending.md` `§1` row **(k)**).

**8.9 THE CONSEQUENCE FOR THIS RECORD'S OWN ROWS, STATED SO THE RECORD IS NOT OVER-READ.** **`U-5` / `U-6` / `U-4`'s FILE HALF ARE THEREFORE NOT `T2`'s TO FIX AS SCOPED** — their failing readings are about a channel this unit may not touch and a clause pair it may not amend. **AND NO RE-GRAIN OF ANY COST TERM CAN GREEN THEM:** they are **MEASUREMENT ROWS ABOUT A CHANNEL THAT WAS NEVER INVOKED** — `§3.4` item 4's write/event count, `P-TR-*`'s attempt terms and every `crossings`-shaped assertion read a value the tier never received, so **a re-grain would move a figure and leave the file byte-unchanged** (and a `crossings === 1`-only assertion would be a FALSE GREEN, `§8.6`). **THE BATTERY'S `MANUAL OPERATOR` ROWS REMAIN UNTAKEN** — **no human operator was present, no tool output stands in for an operator observation, and the two `PARKED` rows stay `OPEN`, NEVER GREEN** (`§5`; `§7` item 2; `RCA-11`). **THE VERDICTS ABOVE DO NOT MOVE: `§2`'s matrix, `§3`'s report and `§4`'s run readings are UNCHANGED, and this section adds findings BESIDE them rather than editing one of them.**
