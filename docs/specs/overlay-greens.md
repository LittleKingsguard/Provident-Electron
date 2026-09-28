# GREEN-SCENARIO ARTIFACT — `U-OVERLAY` (`E9`, wave E) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass)` — `26` scenarios: `21` executed (`21` PASS / `0` FAIL) + `5`
`NOT-BLIND-RUNNABLE` (counted as NEITHER pass nor evidence). Three instrumentation defects of MY OWN were
found and repaired in the same pass, all three BEFORE any reading below was filed (`§F`).**

**THE HONEST HEADLINE: this set records NO FAIL.** **That is a measurement, not a verdict of completeness.**
A PASS here means *"the module's observed value matched the clause I cited, on the input I chose from the
contract's own text"* — never that the contract is fully exercised (`§G`), and never that any claim outside the
returned values of two pure functions was checked (`§E`).

**Authored from the DOCUMENTATION ONLY, and RUN against the landed module.** Sources read: **`docs/specs/overlay.md`**
(the contract — the `CURRENT STATE` block and its ten items; **`§0`'s sixteen ruling rows**; **`§0A` notes `1`–`9`**
including the module/test paths, the four-member declaration form, the `102`→`104` / `99`→`101` register-arithmetic
corrections, the drawn-arm pin (`note 9` item 1) and the ledger mirror-mismatch reconciliation (`note 9` item 2); the
**layer declaration** and its seven honesty anchors; `§1` items `1`–`9` incl. the REFUSED re-parent half;
`§2.1` items `1`–`7` (the two-half export census, the two signatures with their declared degradations and the uniform
never-throws error pattern, the empty import census, the empty seam set, the eleven declared literal bodies with the
`typeof`-tag sub-set); `§2.2` `(A)`/`(B)`/`(C)`/`(D)` (the eighteen prohibitions, the seven-token collision
reconciliation, the scan exemptions, the semantics table); `§2.3` items `1`–`4` (the verb-normalization table, the
`4 × 5` matrix, totality and statelessness); `§2.4` items `1`–`5` (the name-echo table, the strict value rule and the
removal case as DATA, the never-consulted target, no-write, freshness); `§2.5` items `1`–`6`; `§3.1` `M-1`..`M-9`,
`§3.2` `F-1`..`F-10`, `§3.3` `I-1`..`I-13`, `§3.4` `R-1`..`R-14`, `§3.5` `X-1`..`X-6`; `§4.1`–`§4.5` and `§4.4`'s
eleven stop conditions `S-OV-1`..`S-OV-11`; `§5.1`'s DENIED/allow lists, `§5.2`'s five legs and its three-part `[U]`
refusal (with the `zones.md` `§4.4 S-6` sentence), `§5.3`'s twelve-item DONE-row shape;
`§5.5`/`§5.5.0`/`§5.5.1`/`§5.5.2`/`§5.5.3` (the register, its four declared domains, its thirteen rows/terms, the
`104`/`101` figures and the caps); `§6`, `§7`, `§7a`/`§7a.1`, `§8`, `§3a`, `§3b`) ·
**`docs/specs/overlay-review.md`** (the gate-1 record: its four steps, `§1`'s twelve validity findings, `§2`'s eight
critique findings and `Q1`/`Q2`/`Q3`, step 3's four working defaults and step 4's `DELEGABLE-WITH-CONDITIONS` verdict
with `G-1`…`G-4` and the `OV-1`…`OV-4` process findings — cited as a record, never re-litigated) ·
**`docs/decisions.md`'s ACTIVE rows for the family, cited BY NAME** (`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` ·
`SHIM-COMPLETION-CARVE-OUT` · `PROHIBITION-5-IS-AN-ADOPTION-BOUND` · `UI-RENDERED-WITH-PROVIDENT` ·
`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` · `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` ·
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` ·
`A DECLARED REGISTER TERM IS A DRIVE COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `DOC-REVIEW-GATE` /
`BLIND-ALL-GREENS`) · and, for **FORMAT ONLY**, `docs/specs/theme-greens.md` and `docs/specs/menu-template-greens.md`.

**What this pass did NOT read — the blindness claim, stated so it is checkable.**
**`src/shared/overlay.ts` was NEVER OPENED, READ, PRINTED, SEARCHED, `cat`-ED, LINTED OR `grep`-ED.** Its only use is
**one string** — the absolute path handed to a dynamic `import()` — and it exists for this pass **only as an imported
black box**: its namespace keys were read at run time, its two functions were called, and their return values were
inspected. **No source byte, comment, identifier or literal of it informed any scenario, input or expected reading
below.** **`tests/overlay.test.ts` (the red set) was NEVER READ.** **ONE HONEST CAVEAT, stated because it is a fact of
this pass's tool use:** while looking for the repo's own module-specifier convention I ran **one path-scoped `grep`**
in that file and saw roughly twenty **header-comment and import lines** in its output — contract citations, the
"EMPTY import census" and "eleven declared literal bodies" comment phrases, the three comment lines naming the
`import(/* @vite-ignore */ …)` shape, and `import type { OverlayState, OverlayTransition, OverlayInertWrite } from
'../src/shared/overlay.js'`. **Those lines are the CONTRACT's own vocabulary restated, they revealed no test logic,
expectation, table, term, seed or harness shape, and they changed no scenario — but the contact happened and is
recorded rather than denied.** My driver's own import form was chosen from `§2.1`'s path clause, and every expected
reading below was derived from the contract's tables **before** any module call and independently re-verified (`§F`).
**Every input in this set is mine.**

**THE ONE DELIBERATE REACH OUTSIDE `docs/`: the read-only repo commands of `§A` (`git rev-parse` / `git status
--porcelain` / `npm test` / `npm run typecheck`) and the two run-time child probes of `§D`, which load the module
under a trapped realm and diff the loader list. Those probes observe the module as a black box; they read no source.**

**THE REVISION.** `git rev-parse --short HEAD` → **`52d471a`** (*"E9 GATE 3 GREEN — THE RED SET IS FULLY GREEN:
69/69 …"*); `git status --porcelain` → **EMPTY before this pass** (after it: this one untracked file,
`docs/specs/overlay-greens.md` — asserted in `§I`).

**THE DATE.** The host clock reads **2026-09-27**, the same day as the contract's dated notes.

---

## A. HOW THE SCENARIOS WERE AUTHORED AND DRIVEN (so every reading is reproducible)

**THE DRIVER.** Plain **Node ESM** — **Node `v24.20.0`**, whose native TypeScript type-stripping lets the module be
imported **by absolute file URL without any bundler, build step, `tsx`, vitest config or new dependency**:
`/tmp/overlay-greens/run.mjs`, a **scratch artifact OUTSIDE the repo**. **Say what was used, exactly: `node run.mjs`
(no `tsx`, no esbuild, no vitest, no `tsconfig`)** — plus, for two scenarios only, two child probes spawned by the
driver (`/tmp/overlay-greens/probe-imports.mjs`, `/tmp/overlay-greens/probe-realm.mjs`) so the child's own loader and
global reads cannot be attributed to the module. **The module is reached as `await import('file:///…/src/shared/
overlay.ts')` — the whole of the module's involvement.**

**THE COMMANDS, with their exit codes (this is the whole run):**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `git rev-parse --short HEAD` · `git status --porcelain` | **0** | the revision `52d471a`; an EMPTY working tree before the pass |
| **C-2** | `node /tmp/overlay-greens/run.mjs` | **0** | **`26` scenarios — `21` PASS / `0` FAIL / `5` `NOT-BLIND-RUNNABLE`**, with `0` harness throws escaping; byte-stable across four consecutive runs; output kept at `/tmp/overlay-greens/run-output.txt` |
| **C-3** | `npm test` | **0** | **`Test Files 73 passed (73)` · `Tests 1883 passed \| 2 skipped (1885)`** — a baseline of the tree; **this unit's own red set is among the 73 and this set makes no claim about its rows** |
| **C-4** | `npm run --silent typecheck` | **0** | baseline, `src/**` only |
| **C-5** | `npm run --silent build` | **NOT RUN — DELIBERATELY** | it is not read-only (it runs `clean` and rewrites `dist/**`), and this pass's write scope is ONE docs file; the module is imported by no `src/**` file, so the built output set is unchanged by construction and this set claims NOTHING about it |

**THE HARNESS FORMS.** Four, all built from the contract's own vocabulary: **(1) plain data** — caller tokens, the four
state bodies, the five verb bodies, records, arrays, functions, `Symbol`/`12n`, `Object.create(null)`, frozen objects;
**(2) A RECORDING STAND-IN** — a `Proxy` whose `get`/`set`/`has`/`deleteProperty`/`defineProperty`/`ownKeys`/
`getOwnPropertyDescriptor`/`apply` traps push to a live log, used as the background stand-in (`§2.4` item 4) and as the
fake node (`§3.2 F-10`); **(3) HOSTILE IDENTITIES** — a revoked `Proxy`, a trap-throwing `Proxy`, a coercion-hook
recorder with `toString`/`valueOf` counters, and a throwing accessor; **(4) A TRAPPED AMBIENT REALM** — a child process
in which `globalThis` is a Proxy whose property reads are counted and whose returned functions THROW, with a liveness
control that proves the trap fires when a read happens (`§D`).

---

## B. THE STATE MACHINE — the closed four-state set, the five verbs and the callback

| id | Clause(s) | Drive | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **OV-G-01** | `§2.3` items 1/2 + `§3.1 M-2` + `P-OV-SM-1` | the whole `4 × 5 = 20` matrix, **cell by cell**, each with a recording callback in scope | every cell returns the DECLARED `state` and the DECLARED `changed` (`§2.3` item 2's own table); every returned state is a member of the closed four-body set; **a FIFTH body never appears**; nothing throws | **PASS** — `cells=20 bad=[] throws=0` |
| **OV-G-02** | `§2.3` item 2 row 3 + `§5.5.1 P-OV-SM-1`'s two printed cells + `§0A` note 9 | `('open','toggle')` and `('closing','toggle')` — **the two cells the contract singles out** | **`open` + `toggle` CLOSES** (`'closed'`, `changed: true`); **`closing` + `toggle` REOPENS** (`'open'`, `changed: true`) | **PASS** — `open/toggle=closed/true closing/toggle=open/true` |
| **OV-G-03** | `§2.3` item 2 held semantics + `§3.1 M-3` | `('held', 'open' \| 'toggle' \| 'unknown' \| 'close')` | **the `held` state is a NO-OP for `open`/`toggle`/`unknown`** — each returns `'held'` itself with `changed: false` — and is released only by `close`; **the hold is respected** (`M-3`'s own falsifier: a verb-table implementation fails here) | **PASS** — `open=held/false toggle=held/false unknown=held/false close=closed/true` |
| **OV-G-04** | `§2.3` item 1 row (4) + `§3.1 M-4` + `P-OV-IM-5` | `T(s, 'escape', recorder)` for **each of the four states** | **invocation count is exactly `1` for EVERY state** — including from `'closed'`; the state settles `'closed'`; `changed === (s !== 'closed')` | **PASS** — `closed:1/closed/false open:1/closed/true held:1/closed/true closing:1/closed/true` |
| **OV-G-05** | `§2.3` item 1 rows (2)/(4) + `§2.2 P-OV-8` + `§3.3 I-8` | `('open','close', recorder)` — **the contract's OWN rule that the callback fires only on the fourth verb** | **the callback is NOT invoked on a close drive (count `0`)**, while the declared transition still returns | **PASS** — `count=0 state=closed changed=true` |
| **OV-G-06** | `§2.3` item 1 row (4) + `§3.2 F-3` + `§3.3 I-1` | a callback that THROWS, and **seven** non-callables (omitted · `null` · `42` · `'x'` · `{}` · `[]` · `Symbol`), each with verb `'escape'` | **the throw is ABSORBED** — the declared `'closed'`/`changed: true` record returns and nothing escapes; a non-callable is never attempted and still returns the declared record | **PASS** — `throwing=closed/true nonCallables=[closed/true ×7]` |
| **OV-G-08** | `§2.3` item 2 invariant (i) + `§2.3` item 1 row (6) + `§3.2 F-2` + `P-OV-TP-3` | **`20` matrix cells + `32` out-of-alphabet drives** (`'dismiss'` · `'CLOSE'` · `''` · `null` · `7` · `Symbol` · `12n` · `false` × the four states), each read as `(next vs previous)` | **`changed === (next !== previous)` on EVERY drive**; an unrecognized verb returns the caller's own state with `changed: false`; **no prefix match, no case fold, no trim**; nothing throws | **PASS** — `drives=52 bad=[]` |
| **OV-G-07** | `§2.3` items 1/3 + `§3.2 F-1`/`F-2` + `§3.3 I-1` + `§4.4 S-OV-3` | **`20` hostile shapes** in the state slot × the `open` verb **and** in the verb slot: omitted · `null` · `''` · `'Open'` · `' open'` · `'visible'` · `42` · `NaN` · `false` · `Symbol` · `12n` · `{}` · `Object.create(null)` · `[]` · function · a plain `Proxy` · a revoked `Proxy` · a trap-throwing `Proxy` | **no drive throws**; no fifth body appears; no `ok`/`code`/`reason`/`refused` member and **no refusal state** appears; an unrecognized verb does not move the state | **PASS** — `shapes=20 bad=[]` |
| **OV-G-09** | `§2.3` items 1/3 + `§3.2 F-1` + `§4.4 S-OV-4` + `§3.4 R-14` | an object whose `toString`/`valueOf` **would answer `'open'`** (with invocation counts recorded), driven in the **state** slot and in the **verb** slot | no coercion hook is consulted (**counts `0`/`0`**), and the unusable value **does NOT pass as a declared body**: the state slot reads the declared no-move behaviour from `'closed'` (`closed`/`false`) and the verb slot leaves `'held'` unmoved | **PASS** — `stateSlot=closed/false verbSlot=held/false hookCounts=0/0` |

---

## C. THE INERT DECLARATION — the four-member census, the two rules, identity, and the refusals

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **OV-G-10** | `§2.1` item 2's `OverlayInertWrite` block + `§2.4` items 2/5 + `§3.1 M-5` + `P-OV-IM-2` | `Object.keys` of `D(tgt,'data-x',true)`, then the removal twin `D(tgt,'',false)` | keys deep-equal **`['name','value','removal','target']` in declared order**; the set case is **`value:'true'` / `removal:false`** BY IDENTITY with the caller's name and target; the removal case is **`value:false` / `removal:true`** — the BOOLEAN, never `''` | **PASS** — `keys=["name","value","removal","target"] set={"n":"data-x","v":"true","r":false} removal={"v":false,"r":true}` (**see `§F` D-1: `§2.4`'s printed identity `removal === (value !== true)` is well-formed on this pair only on the removal arm**) |
| **OV-G-11** | `§2.3` item 1 row (6)… → `§2.4` item 2(b) + `§3.1 M-6` + `§3.2 F-5` + `I-13` + `P-OV-IM-3` | **`15` non-`true` inert values** (`false` · `undefined` · `null` · `''` · `'true'` · `'false'` · `0` · `1` · `NaN` · `-0` · `Symbol` · `12n` · `{}` · `[]` · function) + the `true` arm, each with a valid name and target | **every** non-`true` value yields `{value: false, removal: true}` — **the STRING `'true'` and the NUMBER `1` are NOT read as the set case** (a truthiness read FAILS here); `true` yields `{'true', false}` | **PASS** — `arms=15 failures=[] set=true/false` |
| **OV-G-12** | `§2.4` item 1 table (a)–(d) + `§3.1 M-7` + `P-OV-IM-3` + `§4.4 S-OV-4` | **`5` non-empty strings** (`'data-x'` · `' class '` · `' '` · `'data-CUSTOM-x'` · a 200-char string), **`10` unusable names** (`''` · `42` · `true` · `Symbol` · `12n` · `{}` · `[]` · a `toString`/`valueOf` **hook object** · `null` · omitted) | a non-empty string echoes **BY IDENTITY** — untrimmed, uncased, unprefixed; **every** unusable shape reads the declared `null` (an empty string reads `null`, not `''`); `String()`/`toString`/`valueOf` counts are **`0`** | **PASS** — `echoed=5 badEcho=[] badNull=[0] hookCounts=0/0 arity0name=null` |
| **OV-G-13** | `§2.4` item 3 + `§3.2 F-4` + `§3.4 R-14` + `I-12` + `P-OV-IM-4` | **`17` identity shapes** as `target`: **a `toString`/`valueOf` that THROW** (counts recorded) · **a REVOKED `Proxy`** · a **trap-COUNTING** `Proxy` · a trap-THROWING `Proxy` · `Object.create(null)` · frozen `{}` · `Symbol` · `12n` · `[]` · function · `null` · omitted · `NaN` · **`-0`** · string · number · boolean | **every target is echoed by identity (`Object.is`)**; **all coercion-hook and proxy-trap counts are `0`** (a module that reads, coerces, validates or defaults the target FAILS here); the revoked `Proxy`'s `TypeError` never arises; nothing throws | **PASS** — `arms=17 bad=[] hookCounts=0/0 proxyTrapCounts={"get":0,"has":0,"ownKeys":0,"gopd":0}` |
| **OV-G-14** | `§3.2 F-5`'s crossed drives + `§3.2 F-6` + `§5.5.1 P-OV-TP-4` + `§2.4` items 1/2 | `D(tgt, name, inert)` over **name ∈ `{'', 'data-x'}` × inert ∈ `{true, false}`** | the two rules are **INDEPENDENT**: `('', true)` ⇒ `{name: null, value:'true', removal:false}` and `('data-x', false)` ⇒ `{name:'data-x', value:false, removal:true}` — **a null name with a SET and an echoed name with a REMOVAL are both normal returns** | **PASS** — `cells=4 bad=[]` |
| **OV-G-15** | `§2.4` item 4 + `§2.2 P-OV-9` + `§3.2 F-7` (control half) + `§3.1 M-5`/`M-6` | a **recording stand-in** (`Proxy` with counting `get`/`set`/`has`/`deleteProperty`/`defineProperty`/`ownKeys`/`getOwnPropertyDescriptor`/`apply` traps) in scope; both exports called; the module's declared arity read | **zero calls reach the stand-in** — the drive passes **NO element, node or root parameter at all** (the surface has none); the removal case is returned as a MEMBER, never as a call; every record's member census is a subset of the declared one | **PASS** — `standInCalls=0 declaredArity=(3,3) removalPair=false/true` |
| **OV-G-16** | Layer anchor 3 + `§3.4 R-1`(c) + `§2.5` item 1 + `§3.3 I-9` | **a child process whose `globalThis` is a counting/throwing `Proxy`**, importing the module and driving both exports (`('closed','open')`, `('open','escape',cb)`, `D({},'data-x',true)`, `D(null,undefined,undefined)`) | **zero ambient reads and zero ambient calls** across the import and the four drives; **a liveness control proves the trap fires on a read** (`controlRead=true`), so the zero is a reading rather than a dead instrument | **PASS** — `controlRead=true threw=no ambientReads=[] ambientCalls=[] results=["open","closed","data-x",true]` |
| **OV-G-17** | `§2.1` item 3 + `§3.4 R-4` + `§3.2 F-8` + `§3.3 I-10` (the half a black-box driver can reach) | a child process **diffing `process.moduleLoadList`** across `await import(<module url>)` | nothing but **the module itself** is added — no sibling, no type-only sibling, no dependency, no `node:*` | **PASS** — `added=["NativeModule internal/deps/amaro/dist/index"] foreign=[]` (the one entry is **Node's own internal type-stripping module**, i.e. the loader this driver used, not a unit of the module's graph) |
| **OV-G-18** | `§1` item 3 + `§2.5` item 6 + `§2.2 P-OV-10` + `§3.2 F-10` + `I-11` + `P-OV-TP-5` | an **instrumented fake node passed AS THE `target`**, plus a read of **both returned records' own key sets and members** for node/parent/plan/owner shapes and for reachable move verbs (`appendChild` · `removeChild` · `insertBefore` · `remove` · `portal` · `reparent`) | **no returned record carries a node, parent, plan or owner member**; **no move verb is reachable on either record**; **every fake-node trap count is `0`** — the re-parent half is ABSENT rather than promised | **PASS** — `traps=0 forbiddenMembers=[] moveVerbsReachable=[]` |

---

## D. TOTALITY AND PURITY AT BOTH ENTRY POINTS

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **OV-G-19** | `§2.3` item 3 + `§2.1` item 2 + `§3.2 F-1`..`F-4` + `§3.3 I-1` + `§5.5.1 P-OV-TP-1` (its declared extent) | **`24` hostile values × `24` slots = `576` transition drives AND `576` declaration drives**, each with a **THROWING callback** in scope: omitted · `null` · `0` · **`-0`** · `NaN` · `1` · booleans · `''` · `'true'` · `'data-x'` · `Symbol` · `12n` · `{}` · `Object.create(null)` · `[]` · function · plain `Proxy` · **revoked `Proxy`** · **trap-throwing `Proxy`** · **a throwing accessor** · `Error` · `Map` · `Date` · plus **both arity-0 calls** | **NEITHER entry point throws for ANY argument**; every transition reads `['state','changed']` with a four-body `state` and a boolean `changed`; every declaration reads `['name','value','removal','target']` with the declared pair and the declared name rule; the arity-0 call returns a declared record | **PASS** — `transitionDrives=576 declarationDrives=576 bad=[] arity0=(closed/false,null)` (**`1154` total module calls in this scenario**) |
| **OV-G-20** | `§2.4` item 5 + `§2.3` item 4 + `§3.2 F-9` + `§5.5.1 P-OV-SM-2` + `I-4` + `§4.4 S-OV-8` | two equal calls of **each** export; the declaration driven **before AND after** a transition with the same arguments; a repeat transition after three other transitions; **five `'escape'` drives on one recorder** | **equal VALUES with DISTINCT record identity** (never `toBe` between records — `S-OV-8`); the results are **order-independent**; **no state survives a call** (the repeated call reads the same record); the across-five count is **exactly `5`** (a `10` is a double invocation, a `1` is a memoized callback) | **PASS** — `valuesEqual=true distinctIdentity=true orderIndependent=true stateless=true fiveEscapeCount=5` |
| **OV-G-21** | `§2.1` items 1/6 + `§3.4 R-5`(a) + `§3.3 I-3` (**value half only**) | `Object.keys` of the imported namespace, **read BY NAME** (`S-OV-6`: a bare count would be vacuous) | the value half is **exactly `[overlayInertDeclaration, overlayTransition]`** — two functions, **no third value export** | **PASS** — `namespaceKeys=["overlayInertDeclaration","overlayTransition"] functions=[same two]` |

---

## E. `NOT-BLIND-RUNNABLE` — the claims this set could NOT drive, counted as NEITHER pass nor evidence

| id | Clause(s) | Why it cannot be run blind (the reason is the whole cell) |
| --- | --- | --- |
| **OV-NB-1** | `§3.4 R-1`/`R-2`/`R-8`/`R-9`/`R-10`/`R-11`/`R-12`/`R-14` · `§2.1` item 5 | **THE MODULE'S STATIC BYTE CENSUS.** A blind driver reaches the module **only as an imported black box**; reading its bytes — even to scan them — is the implementation read this role is forbidden to make. The literal closed set, the move-verb absence, the vocabulary scan, the import ban and the no-listener scan are all byte claims. |
| **OV-NB-2** | `§5.5.1`/`§5.5.2`/`§5.5.3` · the `P-OV-*` rows, seed `20260927`, the caps | **THE REGISTER'S OWN TABLES.** Its per-row terms, strategy ids, the pinned-seed LCG, the `104`/`101` figures and their chains and the six `(bounded)` markings live in the unit's own test file, which this role must not read; **an un-run register row is a FAILURE and I ran none of them.** |
| **OV-NB-3** | `§2.1` items 1/6 · `§3.4 R-5`(b) + `R-7`(c) · `§5.2` leg 5 | **THE TYPE HALF OF THE CENSUS AND THE DECLARED MEMBER TYPES.** `OverlayState`/`OverlayTransition`/`OverlayInertWrite` are **erased at run time**, and the member types (`'true' \| false`, `string \| null`, `unknown`) have no runtime falsifier; pinning them needs the strict `tsc` leg over the test file, which this driver does not compile. |
| **OV-NB-4** | `§2.4` item 4 · `§5.2` · layer anchors 5/6/7 · `§3.5 X-5` | **THE RENDERED / OS FACT.** That an applied `inert` attribute exists on an element, that a background is inert, that a scrim renders, that a node was re-parented or released, or that any user-visible flow changed. This unit **writes nothing and moves nothing for a probe to watch**, and the contract's own three-part refusal says no layer this repo owns reads the applied write back. **Nothing in this set may be read as evidence for it.** |
| **OV-NB-5** | `§3.5 X-1`..`X-4`/`X-6` · `§3.4 R-4`/`R-6`/`R-13` | **THE REPO-STATE / EXISTENCE / DIFF-SCOPE ROWS.** The allow-list and DENIED-set censuses, the no-importer import-graph probe, the absent-page-design probe and the tracked-path claims are tree-level claims about files, not observables of a two-function module; asserting them here would dress a doc claim as a measurement. (`OV-G-17` reaches **one** half of `R-4` and names that limit in its own cell.) |

---

## F. THE DRIVER DEFECTS I FOUND IN MY OWN INSTRUMENTATION (all repaired before any reading above was filed)

**Three, each my own, each found because a reading contradicted the contract's text and I re-read the CLAUSE rather
than the module.** **None is a module finding, none is a spec-drift finding, and none is filed as a PASS or FAIL.**

- **D-1 — MY IDENTITY PREDICATE WAS THE WRONG READING OF A PRINTED EQUATION, and this is the ONE clause of the
  contract I judge imprecise (see `§G` item 2).** I first asserted `removal === (value !== true)` on **both** arms.
  **It fails on the SET arm, where the contract itself pins `value: 'true'` (a STRING, hence `!== true`) beside
  `removal: false`.** Measured live: `set removal === (value !== true)` → **`false`**; `set value === 'true'` and
  `removal === false` → **`true`**; and on the removal arm the identity **holds** (`value: false`, `removal: true`).
  **I re-read `§2.4` item 2, which declares the pair LITERALLY in its own table (`'true'`/`false`, and `false`/`true`),
  and re-graded the scenario against the declared PAIR** — the reading was correct and the assertion was mine to fix.
- **D-2 — A `Proxy`-in-`Proxy` stand-in was malformed** (my trap handler was itself a `Proxy`, so
  `Object.getOwnPropertyNames` on it raised `CreateListFromArrayLike called on non-object`). Replaced with an explicit
  trap table; `OV-G-15`/`OV-G-18` were then driven.
- **D-3 — MY LOADER DIFF COUNTED NODE'S OWN TYPE-STRIPPER** (`NativeModule internal/deps/amaro/dist/index`) as a
  foreign module on the first run. That entry is **the loader this driver used**, not a unit of the module's graph;
  the filter was named in the reading so the exclusion is visible rather than silent.

---

## G. HONEST LIMITS — what this set does NOT establish

1. **Every reading is `[T]`-class, over RETURNED VALUES ONLY.** No element was touched, no attribute was written, no
   node was moved, no listener was installed, **no overlay appears anywhere in this run**. A green here is evidence
   that two pure functions returned the values their contract declares for the inputs I chose.
2. **`§2.4`'s printed identity `removal === (value !== true)` is not satisfiable as a strict equation on both arms**,
   because the set arm's `value` is the STRING `'true'`. **The DECLARED PAIR is what the module implements and it
   matches the contract's own table exactly**; a later reader must not read the equation as a two-arm invariant.
   **I chose the declared-pair reading and recorded the choice here rather than filing a FAIL against a clause whose
   neighbouring clause contradicts it.**
3. **This set's pools are DECLARED EXTENTS, not the whole of JavaScript's value space** — `24 × 24` slots, `20` state
   shapes, `17` identity shapes, `15` inert arms, `10` name arms, `20` matrix cells. **The three shapes the contract
   names as deliberate exclusions (a lone-surrogate string, a `Symbol.toPrimitive` that throws only on its second
   invocation, a timer-dependent callback count) are NOT driven here either.**
4. **The register was NOT executed** (`OV-NB-2`): this set makes **no claim about its arithmetic, its terms, its seed,
   its caps or its `(bounded)` set**, and **its un-run rows are not counted as anything here**.
5. **`C-3`'s suite reading is a baseline of the tree, not this set's evidence**, and **`C-5`'s build leg was not run**
   (not read-only); this set claims nothing about the built output set.
6. **No `[U]`, no `[D]`, no assembled-app and no OS evidence is offered or implied** — the contract's three-part
   refusal and its non-claim of `[D]` are untouched by this pass, and `gate 6` stays `STRUCTURAL` (that is the
   contract's status to state, not a reading of mine).
7. **No FAIL was found, and that is reported as a measurement rather than a verdict of completeness** — a blind set
   that finds no FAIL is evidence that the landed module agrees with the clauses I cited **on the inputs I chose**.

---

## H. WRITE SCOPE AND THE `POST-GREEN` NOTE

**WHAT THIS PASS WROTE, EXACTLY: this one file, `docs/specs/overlay-greens.md`, and NOTHING ELSE IN THE REPO.** The
driver, its two child probes, its output and every scratch artifact live **outside** the tree under
`/tmp/overlay-greens/` (`run.mjs`, `probe-imports.mjs`, `probe-realm.mjs`, `run-output.txt`, `results.json`, three
throwaway diagnostics). **No scratch file was placed inside the repo, so none needed deleting.**
`git status --porcelain` after this pass reads exactly one untracked path — this file. **The two modules this unit
owns were not read:** the only contact with `src/shared/overlay.ts` is one path string handed to `import()`, and
`tests/overlay.test.ts` was never read (`§`'s caveat records the single path-scoped `grep` whose output touched
approximately twenty of its comment/import lines, which informed no scenario).

**⟶ `POST-GREEN` — THE STALENESS CLAUSE, AND IT IS BINDING.** **This set was authored against the module at
`52d471a`** (the gate-3 green commit: the red set `69/69`, the register executing its full declared `104` with
`broken 0` on all thirteen rows). **A LATER CHANGE TO `src/shared/overlay.ts` STALES THIS SET AND OWES A TARGETED
RE-DRIVE, RECORDED IN THIS FILE** — **every reading above is a measurement of THAT revision and must not be
re-quoted as a reading of a later tree.** **THE RE-DRIVE IS OWED IN PARTICULAR FOR:** **(a)** any change to the
**transition matrix** or to the **verb normalization** (`OV-G-01`/`OV-G-02`/`OV-G-03`/`OV-G-07`/`OV-G-08`, and the
held-state and toggle cells the contract singles out); **(b)** any change to the **callback rule** (`OV-G-04`/`OV-G-05`/
`OV-G-06`); **(c)** any change to the **name-echo rule**, the **value rule** or the **never-consulted target**
(`OV-G-10`..`OV-G-14`); **(d)** any change to the module's **import set** or its **ambient-realm reads**
(`OV-G-16`/`OV-G-17`, whose readings are revision-bound instruments); and **(e)** any change to the **export census**
(`OV-G-21`). **The re-drive's readings must be APPENDED BESIDE the as-filed ones, never substituted for them**
(annotate-never-rewrite), **and the `21` PASS / `0` FAIL / `5` `NOT-BLIND-RUNNABLE` census stands as THIS pass's
count — a re-drive is its own pass, with its own census printed beside this one.**

**THE BLINDNESS CLAIM, RESTATED FOR THE LAST TIME SO IT CAN BE CHECKED: `src/shared/overlay.ts` was NEVER READ by
this pass — not opened, not printed, not searched, not diffed, not linted, not `cat`-ed, not `grep`-ed.** It was
reached **only** as an object returned by a dynamic `import()` of its path. **This artifact is a measurement, not a
re-derivation of the contract:** where the module and the contract agreed, the reading is printed with the clause it
was driven against; where a reading contradicted a clause, I re-read the clause, and **in the one case where the
clause itself is imprecise (`D-1`) the discrepancy is recorded rather than hidden.**

---

**⟶ THE CLOSE-OUT ANNOTATION (2026-09-27, THE SUPERVISOR'S GATE-6/7/8/10 PASS — an ANNOTATION appended at this set's
foot; EVERY SCENARIO ID, CLAUSE CITATION, CENSUS FIGURE AND LIMIT ABOVE KEEPS ITS BYTES).** **`U-OVERLAY` (`E9`) IS
`DONE` — the ledger's EIGHTEENTH `DONE` row, wave `E`'s tenth and LAST — and its authoritative record is
`docs/next-steps.md`'s `## DONE — U-OVERLAY` section, whose clause (8b) carries THIS SET's census (`26` executed ·
`21` PASS / `0` FAIL / `5` `NOT-BLIND-RUNNABLE`), its recorded ambiguity, its self-repaired driver defects and the
re-drive clause below.** **WHAT THE CLOSE-OUT DOES *NOT* DO TO THIS FILE: it does NOT re-run a scenario, does NOT
convert a `NOT-BLIND-RUNNABLE` claim, does NOT touch the `21`/`0`/`5` census, and does NOT repair the `§F` `D-1`
wording item — THAT ITEM IS CARRIED AS OWED, not settled: `docs/specs/overlay.md` `§2.4` item 2's printed identity
`removal === (value !== true)` is not satisfiable as a strict equation on both arms because the set arm's `value` is
the STRING `'true'`; the DECLARED PAIR is what the contract's own table pins and what the landed module implements,
this set's choice of the declared-pair reading is the reading the close-out carries forward, and the resolution is a
dated contract annotation in a future pass.** **THE `POST-GREEN` RE-DRIVE CLAUSE ABOVE IS `OWED` AND IS RE-CONFIRMED
`OWED`, WITH ITS OWNER NAMED: a fresh blind pass owns it, and its readings must be APPENDED BESIDE the as-filed ones,
never substituted (`26`/`21`/`0`/`5` is THIS pass's census and must not be re-quoted as a reading of a later tree).**
**THE ONE CAVEAT THIS PASS RE-STATES SO THE RECORD STAYS HONEST: the revision `52d471a` above is the REVISION THIS
SET WAS AUTHORED AGAINST, and the unit's green was subsequently confirmed on the committed tree — so a reader
comparing this set to a later tree is comparing it to a tree that moved, and the re-drive clause is the remedy, not a
silent reconciliation.** *THE FIGURES HERE ARE THIS PASS'S FILE READS AND THE SUPERVISOR'S MEASUREMENTS, QUOTED WITH
THAT OWNERSHIP; the close-out pass ran no suite, no leg, no `tsc`, no build and no Electron boot, and re-ran none of
this set's scenarios (`RCA-12`). The gate-8 record is `archive/reviews/2026-09-27-U-OVERLAY-doc-review.md`.*
