# GREEN-SCENARIO ARTIFACT — `U-CONTAINER` (`E5`, wave E) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass)` — `24` executed scenarios: `24` PASS / `0` FAIL / `4` `NOT-BLIND-RUNNABLE`,
plus `5` recorded findings (`F-1`..`F-5`), of which `F-1` is a **doc drift inside the contract's own
register** and `F-2` is **my own harness error, corrected and re-run** — and **none is a converted FAIL.**

**Authored from the DOCUMENTATION ONLY, and RUN against the landed module.** The sources read were:
`docs/specs/container.md` (the contract — the `CURRENT STATE` block; `§0`'s twelve ruling rows; **`§0A`
notes `1`–`8`** including the `7.1`–`7.6` red-run provenance, the arithmetic amendment and the four
row-bound defects, and the `8.0`–`8.5` second amendment (the subtraction recipe, the four-body literal
census, the four row-bound pins, the drives question); the layer declaration and its six honesty anchors;
`§1` items `1`–`8`; `§2.1` items `1`–`3` (the export census, the three-function block, the empty import
census), `§2.2` `(A)`/`(B)`/`(C)`/`(D)` (the prohibition tables, the `axisResolver`↔`AxisOf` reconciliation,
the reconciliation table), `§2.3` items `1`–`6`, `§2.4` (the two-edge table and the four degradation
classes), `§2.5` items `1`–`5`; `§3.1` `M-1`..`M-12`, `§3.2` `F-1`..`F-12`, `§3.3` `I-1`..`I-14`, `§3.4`
`R-1`..`R-13`, `§3.5` `X-1`..`X-4`; `§4.1`–`§4.4`; `§5.2` (the legs and the three-part `[U]` refusal),
`§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` (the typed register and its arithmetic)) ·
`docs/specs/container-review.md` (the gate-1 record: its four steps, `C-1`…`C-10`, `§9.4`'s rulings,
`§9.5`'s `G-1`…`G-3`) · `docs/decisions.md`'s ACTIVE rows for the family
(`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` ·
`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-REACH-CLAUSE` · the `E5-B-3` `NOTE (not DECIDED)` row ·
`SHELL-CHROME-PANES-ZONES-IN-SCOPE` · `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` ·
`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` ·
`A DECLARED REGISTER TERM IS A DRIVE COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) · and, for
**FORMAT ONLY**, `docs/specs/relocate-greens.md` and `docs/specs/gutter-ui-greens.md`.

**What this pass did NOT read — the blindness claim, stated so it is checkable: `src/shared/container.ts`
was NEVER OPENED, READ, PRINTED, SEARCHED OR DIFFED.** The module was reached **only as an imported black
box** (`await import('<abs path>/src/shared/container.ts')`, namespace keys read, functions called) and, in
`CN-G-24`, **as a type-only import compiled by `tsc`**. **`tests/container.test.ts` (the red set) was NEVER
READ** — the existence of the two paths is the only fact taken about either file (`CN-G-21`, an
`fs.existsSync` probe, no read). No red-set table, expectation, term, seed or harness shape informed any
scenario or drive below: **every input is mine**, chosen from the contract's clause text.

**THE REVISION.** `git rev-parse --short HEAD` → **`841c33e`** (`E5 GATE 3 GREEN — …`, whose own message
records `src/shared/container.ts` **untouched**, landed at **`91311ac`**); `git status --porcelain` →
**EMPTY** before this pass. **THE DATE.** The host clock reads **2026-09-27** (`date -u`), the same day as
the contract's dated amendment notes.

**THE DRIVER.** Plain Node ESM (**Node `v24.20.0`**, whose native TypeScript type-stripping lets the module
be imported by absolute path **without any bundler, build step or new dependency**) — `/tmp/container-greens/run.mjs`,
a **scratch artifact OUTSIDE the repo**; the type half is `/tmp/container-greens/type-half.ts`. **Say what
was used, exactly: `node run.mjs` (no `tsx`, no vitest config, no esbuild) plus the repo's own
`./node_modules/.bin/tsc`.**

---

## A. THE COMMANDS, with their exit codes (this is the whole run)

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `node /tmp/container-greens/run.mjs` | **0** | **`23` scenarios in the driver — `23` PASS / `0` FAIL**; output kept at `/tmp/container-greens/run-output.txt` |
| **C-2** | `./node_modules/.bin/tsc --noEmit --strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --allowImportingTsExtensions --types node /tmp/container-greens/type-half.ts` | **0** | **`CN-G-24`** — the `§2.1` item `1` type half: the three type names import and compile, the shapes hold, and **three positive controls are REJECTED** |
| **C-3** | `npm run --silent typecheck` | **0** | baseline, unchanged by this pass |
| **C-4** | `npm run --silent typecheck:tests` | **0** | baseline |
| **C-5** | `npm test` | **0** | **`Test Files 70 passed (70)` · `Tests 1696 passed \| 2 skipped (1698)`** |
| **C-6** | `npm run --silent build` | **0** | the **SIX**-artifact census unchanged: `main/{main.cjs,preload.cjs,standalone.mjs,battery-host.mjs}` + `renderer/{renderer.js,index.html}` (`CN-G-23` re-measured it) |

**How the module is driven — the documented surface only.** Every scenario reaches it through the **three
value exports** (`tokensFor`, `orientationFor`, `containerDeclarationFor`), the caller's own **injected
closures and values**, and (in `CN-G-24`) the **three declared type names**. **No source-text scan, no
byte census, no import-graph read and no element is used by any scenario** — the one element in the set is
the **recording element of `M-11`**, which the contract says is **never passed to the module** (`§3.1`
`M-10`(b)); `CN-G-15` drives it **both** ways (in scope, then handed in every parameter position).

---

## B. THE SCENARIOS — the surface, the purity and the no-write rows

| id | Clause(s) | Drive | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **CN-G-01** | `§2.1` item 1 (the export census, two halves), `§3.4 R-5`(a), `§4.4 S-CT-8` | read the imported namespace's own keys; then the **positive control** (a namespace carrying a fourth value export) | **exactly** `tokensFor` · `orientationFor` · `containerDeclarationFor`, **BY NAME**, each a function; the control namespace **FAILS** the census predicate | **PASS** — `namespace=["containerDeclarationFor","orientationFor","tokensFor"] allFunctions=true control-rejects-4th=true` |
| **CN-G-02** | `§2.1` item 2 (the declared signatures), `§3.1 M-12` | arity census; then ONE composition calling all three in sequence with a conformant caller set | arities **`2`/`2`/`1`**; `tokensFor`/`orientationFor` ⇒ the caller's answers by identity, counts **`1`/`1`**; `containerDeclarationFor` ⇒ a **two**-member record reading the pinned text | **PASS** — `arities=2/2/1 seams=1/1 members=2 declaration-ok=true` |
| **CN-G-03** | `§3.1 M-1`, `§3.2 F-12`(premise), `§2.3` item 1 | `tokensFor(frozenRecord, recordingFn ⇒ sentinel object)` | count **`1`**; the answer **IS** the sentinel (`toBe`); **the seam's one argument IS the chrome by identity**; the record unchanged | **PASS** — `count=1 argIdentity=true answerIdentity=true chromeUnchanged=true` |
| **CN-G-04** | `§3.1 M-2`, `§2.3` item 1(a) — **NO shape gate** | the same closure over **my own 13** `chrome` shapes (M-2's twelve **plus** `F-5`'s self-referential null-proto record) | count **`1`** for every shape, argument **by identity**, answer **by identity**, **never a throw, never a skipped call** | **PASS** — `shapes=13 allCount1=true allIdentity=true throws=0` |
| **CN-G-15** | `§3.1 M-10`(b)/`M-11`, `§2.2 P-CT-8`, `§3.3 I-7`, `E5-B-1` — **NO WRITE OF ANY KIND** | a **recording element** whose property sets, `defineProperty`s, deletes and method calls are all logged; (i) a **positive control** write by the harness; (ii) **12 module-only drives**; (iii) the element handed in **every parameter position** | the control reads **`1`** (the log is **LIVE**, not dead); the module drives read **`0`** writes of every kind; handing the element in as `chrome`/`edge`/`className` still reads **`0`** and still returns the declared answers | **PASS** — `writeLog(module-only, 12 drives)=0; writeLog(element passed as chrome/edge/className)=0; positive control=1 (live)` |
| **CN-G-22** | `§3.3 I-6`, `§2.2 P-CT-7`, `§2.5` item 2, `§3.3 I-14` | nine ambient names trapped with **counting getters** over `globalThis` (`document`, `window`, `matchMedia`, `getComputedStyle`, `localStorage`, `sessionStorage`, `requestAnimationFrame`, `indexedDB`, `activeElement`); a live control read; then **21 module drives** (conformant, degrading and element-argument forms) | the control reads **`1`**; the module reads **`0`** of them | **PASS** — `trapped=document,window,matchMedia,getComputedStyle,localStorage,sessionStorage,requestAnimationFrame,indexedDB,activeElement \| module drives=21 \| ambient reads=0 \| positive control=1 (live)` |
| **CN-G-16** | `§3.2 F-12`, `§5.5.1 P-CT-IM-6`, `§3.3 I-4` — **no retention, no cache** | **5** repeated-call shapes × **5** calls each (conformant `tokensFor`, throwing `tokensFor`, conformant `orientationFor`, **absent** `orientationFor`, `containerDeclarationFor`) | answers equal at every call; seam counts **exactly `5`** (a `6` FAILS for a cache) and **`0`** on the absent path; the five records are **pairwise distinct objects** with the same two-member census and the same values | **PASS** — `5 shapes x 5 calls: answers equal, seam counts exactly 5/5/0/5, records pairwise distinct with the same census` |
| **CN-G-17** | `§5.5.1 P-CT-SM-1`, `§3.3 I-4`, `§2.5` item 4 | the same three-call set driven in **three orders** (`A,B,C` · `C,A,B` · `B,C,A`), then a **hostile trio** followed by the conformant trio, then a fresh-count check | the three orders give **identical** values per call; the post-hostile conformant calls are indistinguishable from **first** calls (count `1` each) | **PASS** — `orders=3 identical; hostile-then-conformant identical; counts fresh (1 per call)` |
| **CN-G-23** | `§1` item 8 (`appears in none of the built bundles`), `§3.4 R-12`'s **bundle half** | walk `dist/**` after `C-6`; read each artifact's bytes for the module's export name and the pinned literal; census the artifact set | **`0`** artifacts carry either; the built output set is the declared **SIX** | **PASS** — `builtArtifacts=6 (the declared set) \| artifacts carrying the module or the pinned literal=0` — **BOUNDED, in the cell's own words: this reads the BUILT output, never `src/**`; an unused module cannot be bundled, so it does NOT prove the src-side import graph** |

## C. THE SCENARIOS — the selector and the normalizer (both contract edges)

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **CN-G-05** | `§3.1 M-4`, `§3.2 F-1`, `§2.3` item 1(b), `§2.4` item 1 | **10** absent/non-callable `tokenFn` forms (omitted · `undefined` · `null` · `42` · `'x'` · `true` · `{}` · `[]` · a `Symbol` · a `12n`) × **3** chrome shapes | the declared EMPTY answer **`undefined`** in every cell, **zero invocations**, **never a throw**, **never a mechanism default** (`''`/`0`/`{}`/a sentinel would FAIL) | **PASS** — `seamForms=10 x chromeShapes=3 => all undefined, zero invocations, 0 throws` |
| **CN-G-06** | `§3.1 M-5`, `§3.2 F-3`, `§2.4` item 1, `§3.3 I-3` | **6** throwing seam forms: `throw new Error` · `throw 'x'` · `throw 42n` · `throw null` · a **function-shaped `Proxy` whose `apply` trap throws** · a **class constructor** (`typeof 'function'`, invocation throws); then a conformant call | the **attempt is counted once** (uncountable for the raw class form, recorded as such), the throw is **ABSORBED**, **`undefined`** returned, **nothing escapes**, **never retried**, and the following conformant call behaves as a **first** call | **PASS** — `seamForms=6 allAbsorbed=true attempts=1 (uncountable for the class-ctor form) post-throwFirstCall=true` |
| **CN-G-07** | `§3.1 M-6`, `§3.2 F-5`, `§2.5` item 1, `§3.3 I-2` | **7** hostile `chrome` shapes (null-proto record · all-traps-throwing `Proxy` · **revoked** `Proxy` · `Map` · frozen record · throwing accessor · throwing prototype getter), driven **inside a `Map.prototype.get` spy window**; plus a trap-counting `Proxy` | the caller's answer **by identity** with count **`1`** and the argument **by identity** in every cell; **nothing throws**; **`Map.prototype.get` reads `0`** | **PASS** — `hostileShapes=7 answerIdentity=true mapGetCalls=0 (OBSERVED, beside the term: proxy trap counts on a plain record = {"get":0,"has":0,"ownKeys":0,"gopd":0})` |
| **CN-G-08** | `§3.1 M-3`, `E5-B-2`, `§2.3` item 2 | the same **13** shapes as `edge`, with a recording resolver | count **`1`**, argument **by identity**, answer **by identity**, **never a throw**, no shape privileged or refused | **PASS** — `shapes=13 allCount1=true allIdentity=true throws=0` |
| **CN-G-09** | `§3.1 M-4`, `§3.2 F-2`, `§2.3` item 2 | **10** absent/non-callable `axisResolver` forms × **3** edge shapes (object · `undefined` · revoked `Proxy`) | the declared EMPTY **`undefined`**, zero invocations, no throw | **PASS** — `seamForms=10 x edgeShapes=3 => all undefined, 0 throws` |
| **CN-G-10** | `§3.1 M-5`, `§3.2 F-4`, `§2.4` item 2 | a throwing resolver (an `Error` and a **non-`Error`** value) | **one attempted invocation**, the throw **absorbed**, `undefined` returned, **retries `0`** | **PASS** — `attempts=1 per throwing call, answer=undefined, throwEscaped=false, retries=0` |
| **CN-G-11** | `E5-B-2`'s **opaque-edge** pin, `§2.3` item 2, `§2.5` item 2, `§2.2` item 3 | (a) 4 hostile edges; (b) **ONE** edge through **two** resolvers; (c) **one edge object mutated between calls** with a reader closure; (d) a resolver answering `undefined` | (a) the value reaches the resolver **by identity**; (b) each resolver's **own** answer comes back — the module supplies **no vocabulary of its own**; (c) the second call reads the **mutated** value (`a` → `b`), so **nothing is retained**; (d) the caller's own `undefined` is returned after one call | **PASS** — `hostileEdges=4 identity=true twoResolvers=own-answers re-read-after-mutation=a/b callerUndefined=returned` |

## D. THE SCENARIOS — the declaration, the class-name domain, the taxonomy and the totality

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **CN-G-12** | `§3.1 M-7`/`M-9`, `§0A` note 5, `§2.3` items 4/5 | **7** usable class names (`'is-empty'` · `'a'` · `'zone-42'` · 200 chars · `'  spaced  '` · `'--custom-prop-shaped'` · `'has space'`), each read for **five** observables | the name **verbatim**; `declaration === 'contain: layout style paint'`; `length === 27`; **character codes equal**; `Object.keys` **exactly `['className','declaration']`** in order; prototype `Object.prototype`; **no getter**; both members `string` | **PASS** — `usableShapes=7 verbatim=true; value/length/charCodes/keys/prototype/noGetter all hold` |
| **CN-G-13** | `§3.1 M-8`, `§3.2 F-7`, `§2.5` item 3, `§5.5.1 P-CT-IM-3` | **16** unusable shapes (`undefined` · omitted · `null` · `''` · `0` · `-0` · `NaN` · `true` · `false` · `Symbol` · `12n` · `{}` · `[]` · a function · a throwing-`toString` object · a traps-throwing `Proxy`) **plus ONE derived shape of my own** — an object whose `toString` **RETURNS a usable-looking string** — with **call counters** on `toString`/`valueOf` | the class-name member reads **exactly `''`** and the declaration the pinned text in every cell; **`toString`/`valueOf` are NEVER consulted**; nothing throws | **PASS** — `unusableShapes=16 all ""; plus 1 derived shape; toStringCalls=0 valueOfCalls=0; throws=0` |
| **CN-G-14** | `§3.1 M-10`, `§2.3` item 4, `E5-B-1`, `§3.3 I-11` | **5** calls with different arguments; the returned declarations compared to the pinned constant, to each other, and by length; **plus the caller-side control** `'contain' + ': layout style paint'` | every returned declaration is byte-identical to `'contain: layout style paint'` and `27` characters, and does not drift between calls — **the returned-text identity `E5-B-1` makes `[T]`-provable** | **PASS** — `declaration === "contain: layout style paint" (27 chars) on all 5 drives; OBSERVED: the fragment-assembled control is byte-equal too => the ASSEMBLY half is static-only (see CN-G-N1)` — see `F-3` |
| **CN-G-18** | `§2.3` item 3 (the **`B-3` working default**), `§2.2 P-CT-13`, `§3.3 I-2`/`I-5`, `§5.5.1 P-CT-IM-2` | **5** member-key shapes (member-free · `empty:true` · `is-empty:'yes'` · `is-minimized`+`is-revealed` · a `Map` with an `is-empty` key) × **3** readings (conformant seam · **opposite-valued** members, the architect-reversible alternative's control · throwing seam), each inside a `Map.prototype.get` spy window; plus **four throwing prototype getters** (`is-empty`/`empty`/`is-minimized`/`is-revealed`) | the returned value is **the caller's own answer, unaffected by any member** — under **both** `B-3` readings; `Map.prototype.get` reads **`0`**; a **throwing prototype getter is never consulted**; the throw does not reach the member path | **PASS** — `5 member-key shapes x (conformant/throwing/opposite-valued) => the caller answer unchanged; Map.get=0; 4 throwing prototype getters NOT consulted` |
| **CN-G-19** | `§2.2`(A) `P-CT-1`, `§1` item 4, `§2.3` item 6 | the mirror-class taxonomy handed in as **the caller's own DATA** at all three entry points (`tokenFn ⇒ 'is-empty'`, `edge ⇒ 'is-minimized'`, `className ⇒ 'is-revealed'`), plus an answer **object** whose own keys are read back; plus a **whole-run audit** of every value the module ever returned | every caller taxonomy value comes back **verbatim** (the module is indifferent to vocabulary and adds no member); the pinned declaration contains **no `is-` token**; the returned record's members are **only** the two pinned names; the run audit finds **`0`** returns carrying a taxonomy spelling the caller did not supply | **PASS** — `caller taxonomy passed through verbatim (3 entry points); declaration has no 'is-' token; record members are the two pinned names; no member added` · **audit: `returns recorded: 305 \| leaks: 0`** |
| **CN-G-20** | `§5.5.1 P-CT-TP-1`'s property TEXT, `§2.1` item 2's error pattern, `§3.2 F-1`..`F-7` | **my own 14** hostile shapes (`Object.create(null)` · `NaN` · `Symbol` · `12n` · revoked `Proxy` · all-traps-throwing `Proxy` · function · array · frozen record · an object whose `toString`/`valueOf`/`Symbol.toPrimitive` all throw · `Map` · `''` · `undefined` · `null`) × **3** entry points with conformant closures, **plus 5 extra drives** with the hostile shape in the **seam** position | no entry point throws; `tokensFor`/`orientationFor` return the caller's answer; `containerDeclarationFor` returns a two-member record with a `string` class name and the pinned text; seam counts `1`/`1` | **PASS** — `hostileShapes=14 x 3 entry points = 42 drives (+5 extra seam-position drives): declared shapes, 0 throws` — **BOUNDED: the universal is over the drawn shapes, not the whole input space** |
| **CN-G-21** | `§3.5 X-1`'s **GREEN branch**, `§3.4 R-9`, `§5.2` | three **file-existence** probes (no file content read) | `src/shared/container.ts` **present**; `tests/container.test.ts` **present**; `docs/skills/designing-pages.md` **absent** (so `R-9`'s FAIL-condition — the coverage row and the demo-page entry — is not owed) | **PASS** — `module=present testFile=present designing-pages.md=absent (R-9 holds)` |
| **CN-G-24** | `§2.1` item 1 (**the TYPE half**), `§3.4 R-5`(b), `§5.2` leg 5 | a `/tmp` file importing the **three type names** as types, using them, and asserting the **shapes** by assignability — plus **three positive controls** (`@ts-expect-error`): a **two-parameter** resolver, a **write to a readonly member**, and a **`string`-parameterised** seam | the three names **import and compile**; each shape is assignable to the shape the contract text states; **every control is REJECTED by the compiler** (an unused directive would fail the run) | **PASS** — `tsc exit=0` (`AxisResolver`, `ChromeTokenFn`, `ContainerDeclaration` present; 3/3 controls rejected) — a **PRESENCE** claim, never an `EXACTLY-three` one (`§3.4 R-5`(b)'s own words: a type name is erased at run time) |

---

## E. THE REGISTER — the `§5.5.1` row TEXTS I could drive, and what I could not

**A DECLARED REGISTER TERM IS A DRIVE COUNT**, so the rows below are driven **over MY OWN inputs** (never
the red set's tables) and **each TERM is recorded as the count of drives I took**, which is NOT the
contract's declared term.

| Register row | Its property TEXT, driven at | Result (mine) |
| --- | --- | --- |
| **`P-CT-IM-1`** (selector purity + totality, `S-CT-ENUM-1`) | `CN-G-03` · `CN-G-04` · `CN-G-05` · `CN-G-06` · `CN-G-20` | **PASS** on every cell I drove (`13` chrome shapes under a callable seam, `10` non-callable seam forms × `3` chrome shapes, `6` throwing seam forms, plus the hostile sweep): identity, count `1`/`0`, no throw, no member read |
| **`P-CT-IM-2`** (one-authority / emptiness, `S-CT-EMPTY-1`) | `CN-G-18` · `CN-G-07` | **PASS** — `5` member-key shapes × `3` readings, the four throwing prototype getters, and `Map.get = 0` |
| **`P-CT-IM-3`** (the class name RETURNED, never written, `S-CT-CLASS-1`) | `CN-G-12` · `CN-G-13` · `CN-G-15` | **PASS** — `7` usable + `16` unusable + `1` derived shape, write-log `0` with a live control |
| **`P-CT-IM-4`** (byte-identity + non-parse, `S-CT-DECL-1`) | `CN-G-14` · `CN-G-15` | **PASS on the VALUE half** (`5` drives, `27` chars, character codes equal). **The NON-PARSE half is static-only** (`§0A` note 7.5/8.1 read the module's bytes) — `CN-G-N1` |
| **`P-CT-IM-5`** (member census, `S-CT-SHAPE-1`) | `CN-G-12` · `CN-G-16` · `CN-G-20` | **PASS** — `Object.keys` exactly the two names in order, `Object.prototype`, no getter, both `string`, over `7`+`5`+`3` call shapes |
| **`P-CT-IM-6`** (cross-call constancy, `S-CT-CONST-1`) | `CN-G-16` | **PASS** — `5` shapes × `5` calls, pairwise **distinct identity** (`§0A` note 8.3(b)'s pinned reading, i.e. **never** the self-comparison at index `0`), same census, counts exactly `5`/`0` |
| **`P-CT-SM-1`** (statelessness, `S-CT-STATELESS-1`) | `CN-G-17` · `CN-G-06` · `CN-G-22` | **PASS** — `3` orders identical, hostile-then-conformant identical, post-throw first-call behaviour, `0` ambient reads |
| **`P-CT-SM-2`** (once-and-unchanged, `S-CT-ENUM-1`) | `CN-G-03` · `CN-G-05` · `CN-G-06` · `CN-G-20` | **PASS** — the attempt count is exactly `1`, the non-callable count `0`, and **non-object answers are returned VERBATIM** (`§5.5.1`'s anti-`AU-1` cell: a **non-object** answer returned verbatim, driven at `CN-G-06` and `CN-G-11`) |
| **`P-CT-SM-3`** (once + idempotence, `S-CT-NORMALIZE-1`) | `CN-G-08` · `CN-G-11` · `CN-G-16` | **PASS** — one closure, one edge, two calls ⇒ the **same** answer with the closure's own count `2` (a cache would read `1`) |
| **`P-CT-TP-1`** (the totality universal, `S-CT-TP-1`) | `CN-G-20` · `CN-G-22` | **PASS within the bound I drew** (`14` shapes × `3` entry points, `+5`); **the register's own `14` PINNED-SEED DRAWS (LCG seed `20260927`, one step per draw, `pool.length = 14`) are claims about the RED SET's table and were NOT taken** — `CN-G-N4` |

---

## F. `NOT-BLIND-RUNNABLE` — four rows this pass structurally could not take (never a PASS)

| id | Row | Structural reason |
| --- | --- | --- |
| **CN-G-N1** | `§3.4 R-1` · `R-2` · `R-6` · `R-7` · `R-8` · `R-10` · `R-13`'s **static byte/token censuses** over the module (the vocabulary row, the forbidden-realm-access row, the geometry row, the closed-set literal row, the declaration-text no-parse row, the no-write scan pair, the no-duplication row) — **including `R-7`'s four-body allowed set** (the pinned text · `''` · `'function'` · `'string'`) **and the PINNED-LITERAL SUBTRACTION recipe of `§0A` note 8.1** (the quote-preserving joined view) | **taking any of them requires reading `src/shared/container.ts`**, which this pass is forbidden to read. **The caller-side halves WERE driven**: `R-8`'s byte-identity (`CN-G-14`), `R-10`'s runtime write-log (`CN-G-15`), `R-13`'s `B-3` half (`CN-G-18`), `R-1`'s taxonomy half (`CN-G-19`) |
| **CN-G-N2** | `§3.4 R-4`'s **import census** (zero import statements) and `R-12`'s **no-importer probe over `src/**`** (`§3.2 F-11`; `§1` item 8's *"imported by no `src/**` file"*) | **an import-graph read over `src/**`** — a grep of implementation files, which this pass declines. **The bundle-side proxy WAS taken** (`CN-G-23`: `0` artifacts carry the module), and its bound is stated there |
| **CN-G-N3** | **any rendered, applied-CSS, computed-style, layout, paint, containment-boundary or browser-acceptance fact** — the declaration *actually applying*, a stylesheet loading, a `:has()` rule matching, a class existing on an element | **the contract's own THREE-PART `[U]` REFUSAL** (`§5.2`; `§3.3 I-8`; the layer declaration's anchor 5): **no `[U]` row is offered, no `[D]` row is claimed, gate 6 is `STRUCTURAL`**, and **the geometry the family produces is UNPROVABLE in this repo today**. No Electron window was booted and `npm run ui` was NOT run |
| **CN-G-N4** | `§5.5.1`'s tables — the **declared term per row**, the re-derived arithmetic (`151 = 48+26+23+10+12+5+3+5+5+14`, chain, subtotals `IM 124`/`SM 13`/`TP 14`), the **strategy ids**, the **seed `20260927`**, both **caps** and the **`(bounded)` set of five** | **these are claims about the RED SET's own tables** (`tests/container.test.ts`), the one file a blind pass must not read. **The property TEXTS were driven** (`§E`); **the tables were NOT audited** — and a `§5.5.1` cell that still prints a superseded term is a doc drift (`F-1`), readable without the red set |

---

## G. THE FINDINGS — five records, NONE of them a converted FAIL

### `F-1` — **the two MOVED register cells still print the superseded per-row TERMS, unannotated** *(doc drift inside the contract; MED)*

`§0A` note `8.4` re-derived two terms (`P-CT-IM-1` `40 → 48`, `P-CT-IM-3` `17 → 23`) and pinned its own
site list: *"⟶ EVERY SITE THAT PRINTS THE TOTAL OWES THE NEW FIGURE: `§5.5.1`'s register header **and the
two moved cells** …"*. **The header was updated** (it prints both `40 → 48` and `17 → 23`) **and the two
cells were not**: **`P-CT-IM-1`'s cell still reads *"`40` attempts = `8` `chrome` shapes × `5` `tokenFn`
shapes"* with the `8` further drives described as *"ASSERTIONS over the same grid, reported beside the
term"`** — the very clause note `8.4` names as *"the clause that is wrong"*; and **`P-CT-IM-3`'s cell still
reads *"the row's `17`-shape domain"* and *"`17` attempts = `7` USABLE argument shapes + `10` UNUSABLE"***
— the ten note `8.4` calls *"a stale SUBSET of the row's own declared class-name domain"* (`§2.5` item 3
and `§3.2 F-7` enumerate the full sixteen, and `CN-G-13` drove those sixteen). **Neither cell carries the
`⟶ AMENDED` annotation the amendment's own convention requires beside a superseded figure**
(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, sub-rule 1: *"a mis-sum is corrected by annotating, never by
silently rewriting"*) — so **a reader who opens a per-row cell, rather than the header, reads the
superseded term as current**. **Recorded as a doc finding; NOT converted to a FAIL of any scenario** (no
scenario measures a term). **Owner: the register/spec pass that owns `§5.5.1`.**

### `F-2` — **two FAILs in this set's FIRST run were MY harness, not the module — corrected and re-run** *(harness finding, LOW; recorded so the readings are attributable)*

The first `C-1` run read **`19` PASS / `2` FAIL**. Both FAILs were **my own driver defects**:
**(i)** `CN-G-16`'s "absent resolver" drive was driven with a **conformant closure** while asserting the
absent-seam answer (`'never'` vs `undefined`); **(ii)** `CN-G-17`'s order-independence comparison mapped
the three call results through an **inverted name→index table**, so it compared `[A,B,C]` with `[C,A,B]`.
Both were fixed (a genuinely **absent** seam; a `norm()` that re-orders each run by its own recorded order)
and **every scenario was re-run from the top** — the final run is `C-1`'s `23`/`0`. **The failing readings
are NOT reported as findings against the module**, and no expected value was weakened to reach green.

### `F-3` — **the ASSEMBLY-evasion half of the literal/declaration rows is caller-side UNFALSIFIABLE** *(bound on this set; recorded, not a defect)*

`CN-G-14`'s own control is the proof: **`'contain' + ': layout style paint'` is `===` to the pinned text**,
so a **byte-equality assertion on a returned string cannot distinguish the pinned literal from a
fragment-assembled form**. The contract already knows this (`§0A` note 7.5's **JOIN FIRST, THEN STRIP** and
note 8.2's *"the assembly half belongs to `R-8`'s assembly rule and to any scan that reads the PRE-JOIN
bytes"*), and it is why `R-7`/`R-8`/`F-8`/`P-CT-IM-4`'s **non-parse and assembly halves are static-only**
(`CN-G-N1`). **The honest consequence for a blind reader: a green node suite can never carry that half —
the harness must, and the harness is the file this pass may not read.**

### `F-4` — **the domains a blind pass must choose for itself are NOT pinned by the contract** *(ambiguity; recorded as the choice I made)*

`§3.1 M-2` says *"twelve"* `chrome` shapes while `§5.5.1 P-CT-IM-1` pins **eight**; M-2's own list is
eleven-plus-a-self-reference; `P-CT-TP-1` pins a **seed-drawn** pool while the totality TEXT says *"EVERY
hostile shape"*. **I drove my own enumerations and named every one of them in its cell** (`13` chrome
shapes, `10` seam forms, `16`+`1` class-name shapes, `14` hostile shapes) — **each is `(bounded)` in
exactly the register's own sense: the universal is over the drawn set, never the whole input space.** A
later set may drive different shapes; **the property texts, not the counts, are what a blind pass can
falsify.**

### `F-5` — **`§2.1` item 2's class-name domain and `P-CT-IM-3`'s cell disagree on the unusable set's SIZE** *(ambiguity; the same family as `F-1`, recorded separately as a READING choice)*

`§2.1` item 2 says *"ANY OTHER VALUE … yields the declared EMPTY answer"* (so the domain is unbounded and
includes a plain object whose `toString` returns a name-shaped string), `§3.2 F-7` and `§2.5` item 3
enumerate **sixteen**, and `§5.5.1 P-CT-IM-3`'s cell still enumerates **ten**. **I drove all sixteen and
added one derived shape** — an object whose `toString` **returns `'is-revealed'`**, with call counters —
**asserting the declared `''` and `toString`/`valueOf` counts of `0`.** The module conformed; the
disagreement is a spec-text matter (`F-1`).

---

## H. WHAT THIS GREENS SET DOES **NOT** PROVE — the honest-limits block

1. **No rendered, applied or computed fact of any kind** — `CN-G-N3`; the contract's own three-part
   refusal, and the family's mandatory clause: **the geometry the family produces is UNPROVABLE in this
   repo today (the node layer asserts contracts/arithmetic only).** **A returned-text green is NOT an
   applied-style green** (the layer declaration's anchor 5).
2. **No byte-level fact about the module** — no token census, no literal census, no parse scan, no
   import census, no geometry scan, no write scan over the source (`CN-G-N1`/`CN-G-N2`). **Everything this
   set proves it proved by calling the module and reading what came back.**
3. **The red set and its register tables were not audited** (`CN-G-N4`) — not the terms, the arithmetic,
   the strategy ids, the seed, the caps or the `(bounded)` set.
4. **The ambient-read probe (`CN-G-22`) traps nine named globals only.** A realm route that touches **no
   global property name** (e.g. `({}).constructor.constructor('return this')()`) is **outside my probe**;
   `§3.4 R-2`'s static row is where that lives (`CN-G-N1`).
5. **The zero write reading (`CN-G-15`) is a STRUCTURAL zero**: the element is in scope and is handed to
   the module **in every parameter position**, but the module **takes no element** — so the log proves
   *this* module wrote nothing *here*, and the live positive control proves the log itself works. It
   cannot prove the absence of a write to an element the module would have had to obtain otherwise.
6. **`CN-G-24` is a PRESENCE claim** over three type names, never an *exactly three* claim (`§3.4 R-5`(b)).
7. **`CN-G-23`'s bundle census reads `dist/**`**, never `src/**` — its bound is printed in its own cell.
8. **This artifact is not a DONE row and claims no gate beyond its own.** It reports what a **blind**
   reader could derive from the documentation and measure against the landed module.

---

## I. THE ONE-LINE HONESTY STATEMENT, AND THE REPO-SCOPE CHECK

**Every scenario above was authored from `docs/specs/container.md` + `container-review.md` +
`docs/decisions.md` alone and RUN — `24` executed scenarios: `24` PASS / `0` FAIL, plus `4` recorded
`NOT-BLIND-RUNNABLE` rows and `5` findings — the module was reached only through its documented exported
surface and its declared type names, and `src/shared/container.ts` and `tests/container.test.ts` were
NEVER READ by this pass.**

**REPO SCOPE:** `git status --porcelain` at the start of this pass → **EMPTY**; at the end → **exactly one
new untracked file, `docs/specs/container-greens.md`** (this artifact). **Every scratch artifact of the run
lives outside the repo** (`/tmp/container-greens/{run.mjs,type-half.ts,run-output.txt,legs.txt,npm-test.txt}`),
**no temporary file was placed inside the repo and therefore none had to be deleted**, and the four
read-only legs (`npm test`, `npm run typecheck`, `npm run typecheck:tests`, `npm run build`) were the only
repo commands run — `npm run build` rewrote `dist/**`, which is ignored build output, not a tracked file.

**`POST-GREEN` NOTE:** this artifact was authored and run at **`841c33e`**, **on the module landed at
`91311ac`** (the gate-3 repair commit touched `tests/container.test.ts` only, so the module this set
measured is the module the red set measures). **If `src/shared/container.ts` moves, every reading above is
STALE and owes a TARGETED RE-DRIVE recorded in this file — not a new set.** The re-drive order: the
declaration rows (`CN-G-12`, `CN-G-13`, `CN-G-14`), then the selector (`CN-G-03`..`CN-G-07`), the
normalizer (`CN-G-08`..`CN-G-11`), then the purity rows (`CN-G-15`, `CN-G-16`, `CN-G-22`) and the type half
(`CN-G-24`). **`F-1` is a spec-cell drift and is NOT discharged by any module change.**
