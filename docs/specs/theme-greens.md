# GREEN-SCENARIO ARTIFACT — `U-THEME` (`E8`, wave E) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass)` — `32` executed scenarios: `32` PASS / `0` FAIL / `7` `NOT-BLIND-RUNNABLE`,
plus `5` recorded driver defects (my own instrumentation, repaired before the readings below — `§F`).**

**THE HONEST HEADLINE: the artifact records NO FAIL.** **That is a measurement, not a verdict of completeness:**
`32` scenarios were driven against the landed module and every one read its declared clause; **the `7` claims that
could NOT be driven blind are named in `§E` and are counted as neither pass nor evidence**. **A PASS in this set
means "the module's observed value matched the clause I cited, on the input I chose from the contract's own
text"** — never that the contract is fully exercised (see `§G`'s limits, in particular that this set's pools are
**declared extents**, exactly as `§5.5.1`'s are).

**Authored from the DOCUMENTATION ONLY, and RUN against the landed module.** The sources read were:
**`docs/specs/theme.md`** (the contract — the `CURRENT STATE` block and its ten items, including item `10` (the
existing appearance authority); **`§0`'s fifteen ruling rows**; **`§0A` notes `1`–`7`**, including the
`basis` → `source` rename note and the register-arithmetic amendment with its four fixes and its two dated method
notes (the arity-0 omitted-argument drive, and the single-member pool multiplicities); the **layer declaration**
and its seven honesty anchors; `§1` items `1`–`9`; `§2.1` items `1`–`5` (the two-half export census, the
two-function block with every signature and return shape, the empty import census, the empty seam set, and the
five declared literal bodies with the `typeof`-tag sub-set); `§2.2` `(A)`/`(B)`/`(C)`/`(D)` (the twelve
prohibitions, the three collision-reconciliation rows, the exemption note and the semantics table); **`§2.3` items
`1`–`4`** (the pass-through table, the twelve-row env table with its strict `=== true` rule, the report-not-source
rule, and totality); **`§2.4` items `1`–`4`** (the name-echo table, the removal table with its two named composed
drives, the never-a-call rule and the freshness rule); `§2.5` items `1`–`5`; `§3.1` `M-1`..`M-7`, `§3.2`
`F-1`..`F-8`, `§3.3` `I-1`..`I-11`, `§3.4` `R-1`..`R-12`, `§3.5` `X-1`..`X-5`; `§4.1`–`§4.5` and `§4.4`'s eleven
stop conditions; `§5.1`, `§5.2`'s five legs and its three-part `[U]` refusal, `§5.3`'s twelve-item DONE-row shape;
`§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` (the register, its four declared domains, its twelve rows/terms and its caps);
`§6`, `§7`, `§7a`/`§7a.1`, `§8`, `§3a`, `§3b`) · **`docs/specs/theme-review.md`** (the gate-1 record: its four
carried steps, `C-1`…`C-10`, the fifteen findings, `Q1`/`Q2`/`Q3`, `G-1`…`G-6`, and its own `A-4` provenance
note — cited as a record, never re-litigated) · **`docs/decisions.md`'s ACTIVE rows for the family, cited BY
NAME** (`THEME-MECHANISM-AND-AUTHORED-CONTROL` · `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` ·
`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` · `UI-RENDERED-WITH-PROVIDENT` ·
`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` · `SHIM-COMPLETION-CARVE-OUT` · `PROHIBITION-5-IS-AN-ADOPTION-BOUND` ·
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` ·
`A DECLARED REGISTER TERM IS A DRIVE COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` ·
`DOC-REVIEW-GATE` / `BLIND-ALL-GREENS`) · and, for **FORMAT ONLY**, **`docs/specs/menu-template-greens.md`** and
**`docs/specs/relocate-greens.md`**.

**What this pass did NOT read — the blindness claim, stated so it is checkable.**
**`src/shared/theme.ts` was NEVER OPENED, READ, PRINTED, SEARCHED, `cat`-ED, LINTED OR `grep`-ED.** Its only use
is **one string** — the absolute path handed to a dynamic `import()` — and it exists for this pass **only as an
imported black box**: its namespace keys were read at run time, its two functions were called, and their return
values were inspected. **No source byte, comment, identifier, literal or internal helper of it informed any
scenario, input or expected reading below.** `tests/theme.test.ts` **(the red set) was NEVER READ EITHER** — not
its rows, tables, expectations, terms, seed or harness shape; **an `fs.statSync` of its path (for size only) and
an `ls` are the whole of my contact with it, and neither informed a scenario.** Every input in this set is mine,
chosen from the contract's clause text.
**THE ONE DELIBERATE REACH OUTSIDE `docs/`: the read-only repo commands of `§A` (`git rev-parse`/`git status`,
`npm test`, `npm run typecheck`, `npm run typecheck:tests`, `npm run build`) and the two run-time probes that
spawn child processes of the *tree's own* loader. Those probes resolve module paths; they do not read source.**

**THE REVISION.** `git rev-parse --short HEAD` → **`fd70033`** (*"E8 GATE 3 GREEN — THE SIX TEST-SIDE DEFECT
CLASSES REPAIRED AND THE RED SET IS FULLY GREEN …"*); `git status --porcelain` → **EMPTY before this pass**
(after it: this one untracked file, `docs/specs/theme-greens.md` — asserted in `§I`).

**THE DATE.** The host clock reads **2026-09-27**, the same day as the contract's dated notes.

---

## A. HOW THE SCENARIOS WERE AUTHORED AND DRIVEN (so every reading is reproducible)

**THE DRIVER.** Plain **Node ESM** — **Node `v24.20.0`**, whose native TypeScript type-stripping lets the module be
imported **by absolute file URL without any bundler, build step, `tsx`, vitest config or new dependency**:
`/tmp/theme-greens/run.mjs`, a **scratch artifact OUTSIDE the repo**. **Say what was used, exactly: `node run.mjs`
(no `tsx`, no esbuild, no vitest, no `tsconfig`)** — plus, **for two scenarios only**, `node --experimental-loader
./res.mjs` and `node --input-type=module -e <probe>`, each **spawned by the driver as a child process** so the
child's own loader/global reads cannot be attributed to the module. **The module is reached as
`await import('file:///…/src/shared/theme.ts')` — the whole of the module's involvement.**

**THE COMMANDS, with their exit codes (this is the whole run):**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `git rev-parse --short HEAD` · `git status --porcelain` | **0** | the revision `fd70033`; an EMPTY working tree before the pass |
| **C-2** | `node /tmp/theme-greens/run.mjs` | **0** | **`32` executed scenarios — `32` PASS / `0` FAIL**, stable across four consecutive runs; output kept at `/tmp/theme-greens/run-output.txt` |
| **C-3** | `npm test` | **0** | **`Test Files 72 passed (72)` · `Tests 1814 passed \| 2 skipped (1816)`** — baseline of the tree, and this unit's own red set is among the 72 |
| **C-4** | `npm run --silent typecheck` | **0** | baseline, `src/**` only |
| **C-5** | `npm run --silent typecheck:tests` | **0** | baseline |
| **C-6** | `npm run --silent build` | **0** | the **SIX**-artifact census: `dist/main/{main.cjs,preload.cjs,standalone.mjs,battery-host.mjs}` + `dist/renderer/{renderer.js,index.html}` |

**THE HARNESS FORMS.** Four, all built from the contract's own vocabulary: **(1) plain data** — caller tokens,
env records, `Object.freeze`, null-prototype records and inherited-member records; **(2) a RECORDING STAND-IN** —
a `Proxy` whose `get`/`set`/`has`/`deleteProperty`/`ownKeys`/`getOwnPropertyDescriptor`/`apply` traps push to a
live log, plus a fake element-shaped object with its own write counters (`§2.4` item 3 / `§3.2 F-6` /
`P-TH-TP-5`); **(3) HOSTILE HOLDERS** — a revoked `Proxy`, a trap-throwing `Proxy`, a throwing accessor, a
coercion-hook recorder (`toString`/`valueOf` counters); **(4) a TRAPPED REALM SCOPE** — a child process in which
`document`/`window`/`navigator`/`localStorage`/`sessionStorage`/`matchMedia`/`getComputedStyle`/`globalThis`/`self`/
`process`/`require`/`Date`/`Math` are replaced by counting accessors, with a liveness control that proves the trap
fires when a read happens.

---

## B. `resolveTheme` — the surface, the pass-through, and the `source` discriminator

| id | Clause(s) | Drive | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **TG-01** | `§2.1` item 2 + `§2.3` item 1(a) + `§3.1 M-1` | `resolveTheme('dark',{prefersDark:true})`; `Object.keys`, prototype, `getOwnPropertyDescriptor` | keys deep-equal `['setting','prefersDark','source']` **in declared order**; values `'dark'`/`true`/`'env'`; prototype `Object.prototype`; no getter | **PASS** — `keys=["setting","prefersDark","source"] source=env proto=Object.prototype getterFree=true` |
| **TG-02** | `§2.3` item 1(a) + `§3.1 M-2` + `P-TH-TP-2` | **11** caller tokens: `'dark'` · `'light'` · `'system'` · `'DARK'` · `' dark '` · a 200-char token · `'a-b_c'` · `'my-app-theme'` · `' '` · `'false'` · `'0'` | every call returns **ITS OWN token by identity** (no folding, no trimming, no pool member); `source === 'env'` | **PASS** — `tokens=11 allByIdentity=true untrimmed=true uncased=true bad=[]` |
| **TG-03** | `§2.3` item 1(b) | `resolveTheme('',{prefersDark:true})` | `setting` is the **declared `null`** — never `''`, never a fabricated default; the env reading is unaffected | **PASS** — `setting=null source=env` |
| **TG-04** | `§2.3` item 1(c) + `§3.2 F-1` + `§3.3 I-1` + `P-TH-IM-1` | **17** non-string settings: omitted (arity 0) · `null` · `0` · `-0` · `NaN` · `1` · `false` · `true` · `Symbol` · `12n` · `{}` · `Object.create(null)` · `[]` · `Map` · function · revoked `Proxy` · trap-throwing `Proxy` | every drive reads `setting: null` and **NOTHING THROWS**; no sentinel, no `''` | **PASS** — `shapes=17 throws=0 all-null=true` |
| **TG-05** | `§2.3` item 1(c) + `§4.4 S-TH-4` + `§3.1 M-6`(g) + `P-TH-IM-1`/`IM-3` | an object carrying recording `toString`/`valueOf` as the **setting**, and a second one as the **attribute name** | `String()`/`toString`/`valueOf` counts are **`0` on both entry points**; the setting reads `null` and the name reads `null` | **PASS** — `setting-hook counts=0/0 name-hook counts=0/0 setting=null name=null` (**the row a `String()`-coercing implementation FAILS**) |
| **TG-06** | `§2.3` item 2 rows (1)/(2)/(3) + `§3.1 M-3` | `{prefersDark:false}` · `{prefersDark:true}` · `{}` · `{prefersDark:1}` | `false` ⇒ `false` + `'env'` (**a normal reading**); `true` ⇒ `true` + `'env'`; `{}` ⇒ `false` + `'degraded-env'`; `1` ⇒ `false` + `'degraded-env'` | **PASS** — `false->false/env true->true/env {}->false/degraded-env 1->false/degraded-env` |
| **TG-07** | `§2.3` item 2 rows (4)–(8) and (12) + `P-TH-IM-2` | **11** member shapes (`undefined` · `'true'` · `'false'` · `''` · `1` · `0` · `NaN` · `-0` · `[]` · `{}` · a function) **plus** an INHERITED `prefersDark: true` and an OWN `true` | every listed shape reads `false` + `'degraded-env'` with the setting untouched; **the inherited `true` is NOT a reading**; an own `true` reads `true` + `'env'` | **PASS** — `1=false/degraded-env 'true'=false/degraded-env … \| inherited-true->false/degraded-env own-true->true/env` (**the row a truthiness read FAILS**) |
| **TG-08** | `§2.3` item 2 row (9) + `§3.2 F-2` | `Object.freeze({prefersDark:true})` and the `false` twin | **freezing is not a degradation**: `true` + `'env'`, and `false` + `'env'` | **PASS** — `frozen true->true/env frozen false->false/env` |
| **TG-09** | `§2.3` item 2 row (10) + `§3.2 F-2` + `§3.3 I-1` | an accessor at `prefersDark` that THROWS | the throw is **caught and absorbed**: `false` + `'degraded-env'`, the setting still carried, nothing escapes | **PASS** — `throwing accessor -> false/degraded-env, nothing escaped, setting carried` |
| **TG-10** | `§2.3` item 2 row (11) + `§3.3 I-1` | a **revoked** `Proxy` as `env` | the `TypeError` a revoked proxy raises on ANY access is absorbed: `false` + `'degraded-env'` | **PASS** — `revoked Proxy -> false/degraded-env (TypeError absorbed)` |
| **TG-11** | `§2.3` item 2 row (11) + `§3.2 F-2` | a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` traps all THROW | same declared absorption; nothing escapes | **PASS** — `trap-throwing Proxy -> false/degraded-env` |
| **TG-12** | `§2.3` item 2 row (5) + `§3.2 F-2` | `env` omitted · `null` · `42` · `'x'` · `true` · `Symbol` · `12n` · function | each reads `false` + `'degraded-env'` with the setting untouched, no coercion | **PASS** — `omitted=degraded-env null=degraded-env 42=degraded-env 'x'=degraded-env true=degraded-env Symbol=degraded-env 12n=degraded-env function=degraded-env` |
| **TG-13** | `§2.1` `ThemeEnv` (closed at ONE member) + `§2.3` item 2 | `{prefersDark:true, extra:'must-be-ignored'}` and its `false` twin | a second member changes nothing; the extra key never reaches the record | **PASS** — `extra member ignored; reading unchanged (true/env)`; `false` twin still a normal reading |
| **TG-14** | `§3.3 I-2` + `§2.3` item 3 + `§2.2` `P-TH-10` | one non-pool token against **five** envs (true · false · `{}` · trap-throwing `Proxy` · revoked `Proxy`) | the `setting` member is the same caller token **under every env**; `prefersDark`/`source` vary independently | **PASS** — `setting constant under 5 envs; prefersDark/source=true/env false/env false/degraded-env false/degraded-env false/degraded-env` |

## C. `applyThemeDeclaration` — the name-echo rule and the removal case as DATA

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **TG-15** | `§2.4` item 1(a) + `§3.1 M-4`/`M-6` + `P-TH-IM-3` | `('data-x','dark')`; then `' class '`, `' '`, `'data-CUSTOM-x'` | keys `['name','value','removal']` **in declared order**; the name echoed **verbatim by identity** — untrimmed, uncased, unprefixed; data property; prototype `Object.prototype` | **PASS** — `keys=["name","value","removal"] name/value/removal declared; whitespace-padded and whitespace-only echoed` |
| **TG-16** | `§2.4` item 1(b)/(c)/(d) + `§3.1 M-6` + `§3.2 F-4` + `§0A` note 7(a) | **12** name shapes: `''` · `undefined` in the name slot · `null` · `42` · `NaN` · `true` · `Symbol` · `12n` · `{}` · `[]` · function · revoked `Proxy` | every one reads `name: null` while `value`/`removal` follow the **resolved** argument untouched (`'dark'`/`false`) — the two arguments are independent | **PASS** — `shapes=12 all name:null …` with `value:"dark"`/`removal:false` on all twelve |
| **TG-17** | `§2.4` item 2(a)/(b)/(c) + `§3.1 M-5` + `§3.2 F-3` + `P-TH-IM-4` | **11** removal arms: `''` · `null` · `undefined` (resolved omitted) · `42` · `Symbol` · `12n` · `{}` · `[]` · function · `false` · `NaN` | every one returns exactly `{name:'data-x', value:'', removal:true}` with **three** members (no fourth member, no absent member) | **PASS** — `removal arms=11 all {name:"data-x", value:"", removal:true}, 3 members exactly` (**the row a "removal is an absent member" implementation FAILS**) |
| **TG-18** | `§2.4` item 2(a) + `§3.2 F-3` | `'dark'` · **`'false'`** · **`'0'`** · `' '` as `resolved` | the four are **LEGAL TOKENS** and read `removal:false` with their own value **by identity** — not read as a boolean, not read as a number | **PASS** — `"dark"=>"dark"/false "false"=>"false"/false "0"=>"0"/false " "=>" "/false` |
| **TG-19** | `§2.4` item 2's independence note + `§3.2 F-4`/`F-5` + `P-TH-TP-4` | the two named crossed drives plus `('','')` | `('data-x','')` ⇒ `{name:'data-x', value:'', removal:true}` (a removal WITH an echoed name); `('','dark')` ⇒ `{name:null, value:'dark', removal:false}` (a null name WITHOUT a removal) | **PASS** — both cells exactly as declared, plus `('','')` ⇒ `{name:null, value:'', removal:true}` |
| **TG-20** | `§2.4` item 4 + `P-TH-SM-2` + `§3.2 F-8` | **five** repeated calls of each export with the SAME arguments; equality read **field-by-field** | every repeated call returns an **EQUAL value**; the carried members are the caller's own values at the fifth call | **PASS** — `5 repeated calls: resolver constancy=true applier constancy=true` |
| **TG-30** | `§2.4` item 4 + `§3.3 I-3`/`I-4` + `§4.4 S-TH-8` + `P-TH-SM-2` | the same five-call drives read as **identity**: pairwise `!==` over all `10` pairs, `isFrozen`/`isSealed`, order-independence of the two entry points, and a caller env MUTATED between calls | each call returns a **FRESH, DISTINCT record object** (the *record* is fresh while its *members* are carried by identity); not frozen, not sealed; the applier's result does not depend on the resolver having run; the caller object is not retained | **PASS** — `resolver distinctIdentity=true applier 5-call distinct pairs=10/10 frozen=false sealed=false orderIndependence=true callerObjectRetained=false` (**this is the row a cached/singleton record FAILS; `S-TH-8`'s `toBe`-between-calls error is avoided — equality and identity are read separately**) |
| **TG-21** | `§2.1` item 2 + `§3.1 M-7` + `§3.2 F-5` | the **composed** path `applyThemeDeclaration(name, resolveTheme(setting, env).setting)` over `4` settings × `3` envs × `2` names (**24** cells), plus the contract's own composed removal drive | every cell returns a declared write with the name from the name rule and the removal from the resolved value; nothing throws (the throwing-accessor env included) | **PASS** — `cells=24 throws=0 declared shapes; composed removal={name:"data-x",value:"",removal:true}` |

## D. THE PROHIBITIONS AS CALLER-OBSERVABLE FACTS, TOTALITY, AND PURITY

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **TG-22** | `§2.5` item 2 + `§2.4` item 3 + `§3.2 F-6` + `§2.2` `P-TH-9` | **8** module drives with a recording stand-in `Proxy` and a fake element-shaped object in scope; then, after the module drives, a driver-side call for the **liveness control** | **ZERO** writes of every kind from the module (no `set`, no `deleteProperty`, no `apply`, no `setAttribute`/`removeAttribute` on the stand-in, **0** fake-element writes), and a **live** instrument (`> 0` when the driver itself writes); the module has **no element parameter** (arities `2`/`2`) | **PASS** — `module drives=8 writeLog=0 fakeElementWrites=0 instrumentLive(control)=1 arities=2,2` |
| **TG-23** | `§3.3 I-6` + `§2.4` item 3 + `§0A` note 2 + `§7` item 3 | `applyThemeDeclaration('data-x','')` with a live element-shaped object **in scope** (never passed to the module) | the `H-r7` `removeAttribute` class is **never CALLED** — `0` calls on the live object; the removal is signalled **only** by the `removal:true` DATA member; no method member on the returned record | **PASS** — `element-shaped object in scope, 0 calls; removal:true is the ONLY signal; keys=["name","value","removal"]` |
| **TG-24** | `§2.1` item 3 + `§2.2` `P-TH-8` + `§3.4 R-7` + `§3.3 I-8` | a **child process** with **13** realm names trapped by counting accessors; the module's two entry points are driven after the trap is installed; then a **liveness control** read of a trap-only name | the module performs **ZERO** realm reads; the liveness control registers (proving the trap fires) | **PASS** — `trapped names=13 moduleReads=[] livenessControl=1 (measured in a child process)` |
| **TG-25** | `§2.1` item 3 + `§3.4 R-4` (black-box arm) + `§3.3 I-8` + `P-TH-12` | a child process run with a **loader hook** that records every specifier Node RESOLVES while importing the module; then the same hook against a **known module** as the liveness control | importing the module resolves **exactly one `src/` file — itself**; no sibling module is pulled in; the namespace carries no re-exported sibling surface. **Its limit is stated: this is a run-time graph probe, not a source-text import census** (`§E` `TG-NB-2`) | **PASS** — `src modules resolved by importing theme.ts = ["theme.ts"] ; liveness control recorded ["host-ctl.log.mjs","dom-shim.ts"]` |
| **TG-26** | `§2.1` item 1 + `§3.4 R-5`(a) | the imported namespace's own keys filtered to functions; then a **positive control** (a namespace carrying three value exports) | **exactly** `resolveTheme` and `applyThemeDeclaration`, both callable, arities `2` and `2`; the control shows a third value export WOULD be visible to the same census | **PASS** — `valueExports=["applyThemeDeclaration","resolveTheme"] arities=2,2 thirdExportControlRejects=true` |
| **TG-27** | `§3.4 R-1`/`R-8` (**caller-observable arm only**) + `§2.2` `P-TH-1`/`P-TH-7` | **12** spellings a vocabulary-owning module might recognize — `'dark'` · `'light'` · `'system'` · `'auto'` · `'data-theme'` · `'class'` · `'color-scheme'` · `'prefers-color-scheme'` · `'--x'` · `'zone'` · `'gutter'` · `'catalog'` — driven as both the setting and the attribute name | every spelling is carried **verbatim** on both entry points: **no spelling is treated as vocabulary, and none is defaulted, prefixed or normalized.** *(The source-byte census itself is `NOT-BLIND-RUNNABLE`, `TG-NB-1`.)* | **PASS** — `probes=12 all carried verbatim; vocabulary the module recognizes (observably): none` |
| **TG-28** | `§3.3 I-1` + `§5.5.1 P-TH-TP-1`/`TP-3` + `§2.3` item 4 | a **12**-member hostile pool (`Object.create(null)` · `NaN` · `Symbol` · `12n` · revoked `Proxy` · trap-throwing `Proxy` · throwing accessor · a self-referential record · `Map` · `Set` · function · deeply nested array) supplied **in turn** as `setting`, `env`, `attributeName` and `resolved` = **48** drives | every drive returns the declared record shape with the exact three declared keys; **no drive throws** | **PASS** — `pool=12 x 4 positions = 48 drives, throws=0, shapeViolations=0` |
| **TG-29** | `§2.4` item 4 + `§3.3 I-3` + `§5.5.1 P-TH-TP-4` | the `4 × 4` cross product of name shapes (`'data-x'` · `''` · `undefined` · `42`) × resolved shapes (`'dark'` · `''` · `null` · `42`) = **16** cells | every cell's `name` follows the name rule and its `value`/`removal` follow the resolved rule, independently; the key set is exactly the three declared names | **PASS** — `cells=16 throws=0; independence cells: [null,"dark",false] and ["data-x","",true]` |
| **TG-31** | `§4.3` + `§3.3 I-7`/`I-11` + `§5.2` (the three-part `[U]` refusal) | a DOM-shaped probe with a liveness control; the declared arities | **no element parameter exists** (arity `2` and `2`), and **no row of this set required an element, a DOM, a stylesheet or an OS read to be measured** — the only DOM-probe read came from the control | **PASS** — `no element parameter (arity 2/2); … (the 1 probe read came from the control only)` |
| **TG-32** | `§4.4 S-TH-3` + `§3.2`'s note + `§2.1` item 2 | **eight** banned member names (`ok` · `code` · `reason` · `thrown` · `error` · `disabled` · `state` · `system`) probed on **six** sampled records (both degenerate arms included) | **no refusal domain**: none of the eight appears on any returned record; every outcome is a VALUE | **PASS** — `banned member names=8 absent on all 6 sampled records; every outcome is a VALUE` |

## E. THE SCENARIOS THAT CANNOT BE RUN BLIND (`NOT-BLIND-RUNNABLE`, never counted as a pass)

**Seven rows. Each names the reason in the contract's own terms; none is a pass, and none is evidence.**

| id | The claim that cannot be driven blind | Why — the reason |
| --- | --- | --- |
| **TG-NB-1** | **`§2.1` item 5's five-string-literal census and `§3.4`'s `R-1`/`R-2`/`R-7`/`R-8`/`R-10`/`R-11` scans** — *"over the MODULE's source … including its comments and in the normalized view"* | **A STATIC BYTE/TOKEN CENSUS OF THE MODULE.** Running it requires **reading `src/shared/theme.ts`**, which this writer is forbidden to read and did not read; the assertion is about the module's own **bytes**, not about any value it returns. **A caller-side drive cannot falsify it** — a module could carry any literal and still return every value this set measured. (`TG-27` reaches only the caller-observable arm.) |
| **TG-NB-2** | **`§3.4 R-4`/`F-7` in their SOURCE-TEXT form** — *"`src/shared/theme.ts` contains ZERO import statements — no value import, no type-only import, no dynamic `import(`, no `require(`"* — and its three named positive controls | **A SOURCE-TEXT SCAN.** `TG-25` measures the **run-time module graph** instead (one `src/` file resolved: itself), which is a *related but weaker* instrument: a dynamic `import()` on an untaken branch would not appear in it. The source-text claim is therefore **not** filed as a pass. |
| **TG-NB-3** | **`§5.5.1`/`§5.5.2`/`§5.5.3`'s register tables** — `12` rows / `12` terms, the declared total `102` with its twelve terms, the distinct ledger `99`, the seed `20260927` with its one-step-per-draw LCG form and `pool.length = 12`, the caps, the `5`-of-`12` `(bounded)` set, the stop-after-5 status | **THE REGISTER'S OWN TABLES.** These are claims **about the harness** (`tests/theme.test.ts`) and about the contract's own arithmetic — *"the attempt total is printed WITH its per-row terms"* — not about any value the module returns. Measuring them requires **reading the red set**, which this pass did not read, and re-deriving them would be re-authoring rather than blind verification. **No figure from those tables is re-asserted here** (`C-3`'s suite figure is a baseline, not a reading of those cells). |
| **TG-NB-4** | **`§3.4 R-3`/`R-6` and `§3.5 X-1`/`X-5`** — the byte-identical `dom-shim.ts`/`package.json`/config claim, the no-importer graph probe over `src/**`, the diff-scope row, and the repo-wide token census | **A CENSUS OVER THE WHOLE TREE AND THE COMMIT RANGE.** The probe is a recursive read of other `src/**` files and of git history — outside this writer's wall. **`C-6`'s unchanged six-artifact build census is consistent with the no-importer claim but does not falsify it**, so it is not filed as a pass either. |
| **TG-NB-5** | **`§3.4 R-9` + `§3.5 X-4`** — *"`docs/skills/designing-pages.md` does NOT exist"* | **A REPO-DOCUMENT EXISTENCE CLAIM** whose FAIL would mean this unit owes a coverage row. It is a claim about a path outside this unit's contract and was not measured by this pass; it is recorded as the contract's own probe, never as a scenario pass of this set. |
| **TG-NB-6** | **`§3.2 F-6`/`F-7`/`F-8` and `§3.4 R-12`'s declared-failing POSITIVE-CONTROL CORPORA** — a corpus calling `removeAttribute`; a corpus carrying exactly one import statement; a fourth-member corpus; a corpus spelling a token literal | **FIXTURES THAT EXIST TO FAIL A SCAN.** They are read as **source text** by the scans above (`TG-NB-1`/`-2`). `TG-22`/`TG-25`/`TG-26` reach only the **run-time** arms (0 writes; one resolved `src/` module; a third value export visible to a runtime census). |
| **TG-NB-7** | **`§5.2` + `§3.3 I-7`/`I-11` + `§5.3` item 7's layer class** — an applied attribute, a resolved `color-scheme`, a rendered control or an OS preference being what the caller supplied | **THE RENDERED / OS FACT.** *"No window is booted, no `matchMedia` is consulted, no attribute is written, no element is touched, and no real appearance change is observed anywhere in the run"* (honesty anchor 1). The claim is by construction unobservable in the node suite, and `[U]`/`[D]` are, per `§5.2`, **not offered and not claimed** — so no instrument in this repo reads it. **Gate 6 is `STRUCTURAL`, never `waived`**, and this set does not touch that verdict. |

## F. THE DRIVER DEFECTS I FOUND IN MY OWN INSTRUMENTATION (repaired before the readings above; recorded so the census is honest)

**Five defects, all in scratch code OUTSIDE the repo, all found by adversarial reading of my own results and
repaired — none of them a claim about the module, and none of them a re-scoping of a scenario.** **The census was
`32` executed scenarios before and after the repairs; only the readings moved.**

| # | The defect | How it surfaced | The repair (and what it changed) |
| --- | --- | --- | --- |
| **D-1** | **Equality read through `JSON.stringify`** made my equality assertions **false-positive passes**: `JSON.stringify(undefined)` and `JSON.stringify(NaN)` are both `'undefined'`/`'null'`, and `{}`-members are dropped — so two records differing in a member could compare equal | a cross-check of a failing row by hand | replaced with an **explicit per-field comparison** (`fieldEq`, with `Object.is` and an explicit `NaN` arm). **It changed no verdict in the final run; it removed four false PASSes from the earlier drafts.** |
| **D-2** | **A shadowed identifier in the freshness row**: the pairwise check read `.every((w) => w !== ws[0])` where the parameter and the array differed by one letter in my draft — so the assertion compared a record with **itself** and could never hold | the row reported a FAIL with an **all-distinct** reading printed beside it | rewritten as an explicit **count of distinct pairs** (`10` of `10`). **This was my bug, not the module's: the module was always distinct-identity on every call.** |
| **D-3** | **A row conflated two different drives**: I drove the "name omitted" arm by invoking the applier at **arity 0**, which omits the **`resolved`** slot as well — so the module correctly returned the **declared removal case**, and my expected `{value:'dark', removal:false}` was wrong | the failing detail named the arity-0 drive | split: the name-omitted arm is driven as `(undefined, 'dark')` (`TG-16`), and the arity-0 both-slots-omitted pair is filed where the contract declares it — as a **removal** arm (`TG-17`). **`§0A` note 7(a)'s arity-0 method note governs: no marker value is invented.** |
| **D-4** | **A probe that restored the very global it was writing through**: the child probe restored the trapped `process` binding, then called `process.stdout.write(...)` — so the probe crashed with `Cannot read properties of undefined (reading 'stdout')` | an **empty** FAIL detail, which I refused to read as a module behaviour | the child now **captures the output channel before installing the trap** and writes through the captured reference (`TG-24`). |
| **D-5** | **A liveness control that could not fire**: `void globalThis.process` does NOT invoke an accessor installed with `Object.defineProperty` (a plain `globalThis.process` read returns the data value and never runs the getter) — so the control read `0` and would have made **every** "trap is live" claim unfalsified | the control's own reading (`livenessControl=0`) contradicted the standalone probe | the control now reads a **name that exists only as a trap** (`globalThis.__livenessProbe__`), which provably registers (`livenessControl=1`) — **so `TG-24`'s `moduleReads=[]` is a reading of a live instrument, not of a dead one.** |

## G. HONEST LIMITS — what this set does NOT prove

1. **A green here proves THE RETURN VALUES OF TWO PURE FUNCTIONS, TWO RECORDERS' COUNTS AND TWO CHILD-PROCESS
   PROBES, AND NOTHING ELSE** (honesty anchors 1/2). **No window was booted, no element was touched, no attribute
   was applied, no stylesheet resolved, no `matchMedia` was consulted, no OS preference was read, no IPC round-trip
   ran and no MCP transport was exercised** (`TG-NB-7`).
2. **A green on the returned write is NOT a green on an APPLIED attribute** (honesty anchor 5). No row here proves
   an attribute exists on any element, that a `color-scheme` resolves, that the app looks different, or that
   anything this unit returns reaches `src/renderer/index.html`'s `:root { color-scheme: light dark; }` — the
   contract's own `CURRENT STATE` item 10 says it cannot, and nothing in my run contradicts that.
3. **`prefersDark` is a CALLER CLAIM, never an observation** (honesty anchor 6): every reading above is a
   statement about a **value rule** — *"for a caller that supplies `{prefersDark:true}`, one member reads `true` and
   one reads `'env'`"* — and never about an operating system.
4. **The resolved token is OPAQUE and CARRIED, and CARRIED IS NOT INTERPRETED** (honesty anchor 7): no reading here
   proves that any token is one a stylesheet accepts.
5. **This set's pools are DECLARED EXTENTS, not the whole of JavaScript's value space** — `17` setting shapes, `11`
   + `2` env-member shapes, `12` name shapes, `11` removal arms, a `12`-member hostile pool × `4` positions, `16`
   grid cells. **`TG-28`'s totality is bounded exactly as `§5.5.1 P-TH-TP-1` marks its own `(bounded)` row, and the
   three shapes the contract names as deliberate exclusions (a lone-surrogate string, a `Symbol.toPrimitive` that
   throws only on its second invocation, a holder that answers differently on successive reads) are NOT driven
   here either.**
6. **No static claim of `§3.4` was verified** (`TG-NB-1`/`-2`/`-4`/`-6`), **and no `[U]`, no `[D]`, no
   assembled-app and no OS evidence is offered or implied** — `§5.2`'s three-part refusal and its non-claim of
   `[D]` are untouched by this pass.
7. **`C-3`'s suite reading is a baseline of the tree, not this set's evidence**, and **the register's `102` is NOT
   re-asserted, re-derived or read here** (`TG-NB-3`); this set makes **no claim about the register's arithmetic,
   seed, caps or `(bounded)` set**.
8. **No FAIL was found, and that is reported as a measurement rather than as a verdict** — **the contract's own
   honesty block is the reason to read it that way**: `§5.5.2` item 7 says the register proves nothing about an
   applied attribute, a stylesheet, a rendered control, a dark-mode rendering, an OS preference, persistence or
   the app, and this set is bounded by the same statement. **A blind set that finds no FAIL is evidence that the
   landed module agrees with the clauses I cited on the inputs I chose; it is not evidence that the unit is done.**

## H. HONESTY: THE ONE PLACE THE BRIEF I WAS GIVEN AND THE CONTRACT DIVERGE (resolved toward the contract, and stated so the choice is checkable)

**My brief described the pass-through as *"the caller's own token is returned as `resolved`, `String()`-coerced
only for a non-string"*.** **`§2.3` item 1's table contradicts that as a testable clause and governs here**: a
non-string setting reads the **declared `null`** — *"a non-string setting CANNOT be coerced into a token without
consulting `toString`, which the same family's rows forbid"* (`§2.3` item 1's own note, with `§4.4 S-TH-4`
classing a coercion hook as a READ OF CALLER DATA AS A DECISION; `§0A` note 4 records the coarser record sentence
as **provenance only**, and `§7a.1` item 1 marks the pass-through domain as a **recorded working default**).
**I therefore drove `null` and measured `null` (`TG-04`), and drove the hook counts (`TG-05`): counts `0`/`0`.**
**No scenario in this set asserts a `String()` coercion of either argument, and none would pass if it did.**
**Also recorded as an ambiguity I had to resolve by choosing a reading, not by asking:** `§2.4` item 1(d) names the
**omitted** `attributeName` but fixes **no marker value**; `§0A` note 7(a) resolves that method note **at arity 0**,
so I drove the name-omitted arm as `undefined` **in the name slot** (arity `2`) and filed the true arity-0 call
under the **removal** arm, where it belongs (`TG-16`/`TG-17`, driver defect `D-3`).

## I. WRITE SCOPE AND THE POST-GREEN NOTE

**WHAT THIS PASS WROTE, EXACTLY: this one file, `docs/specs/theme-greens.md`, and NOTHING ELSE IN THE REPO.** The
driver, its child probes, its output and every scratch artifact live **outside** the tree, under
`/tmp/theme-greens/` (`run.mjs`, `probe.mjs`, `res.mjs`, the host/temp `.mjs` files, `run-output.txt`).
**No scratch file was placed inside the repo, so none needed deleting.** The read-only commands of `§A` write only
to build/test output directories the repo already owns. **The two modules this unit owns were not opened, printed
or modified:** the only contact with `src/shared/theme.ts` is one path string handed to `import()`; the only
contact with `tests/theme.test.ts` is a path probe, and no byte of either informed a scenario.

**⟶ `POST-GREEN` — THE STALENESS CLAUSE, AND IT IS BINDING.** **This set was authored against the module at
`fd70033` (its `CURRENT STATE`, its `§0A` note 6 rename and its `§0A` note 7 register-arithmetic amendment).**
**A LATER CHANGE TO `src/shared/theme.ts` STALES THIS SET AND OWES A TARGETED RE-DRIVE, RECORDED IN THIS FILE** —
the sibling sets' own rule, carried verbatim in substance: **every reading above is a measurement of THAT revision
and must not be re-quoted as a reading of a later tree.** **THE RE-DRIVE IS OWED IN PARTICULAR FOR:** **(a)** any
change to the **`source`** member's spelling or domain (`§4.4 S-TH-11` — `TG-06`..`TG-12` read it by name);
**(b)** any change to the **name-echo** or **removal** rules (`TG-15`..`TG-19`, `TG-29`); **(c)** any change to the
**freshness** rule (`TG-20`/`TG-30` — the pair must stay split, since one asserts VALUE equality and the other
OBJECT identity); and **(d)** any change to the module's **import set** (`TG-25`, whose loader-hook reading is
revision-bound). **The re-drive's readings must be APPENDED BESIDE the as-filed ones, never substituted for them**
(annotate-never-rewrite), **and the `32` PASS / `0` FAIL / `7` `NOT-BLIND-RUNNABLE` census stands as THIS pass's
count — a re-drive is its own pass, with its own census printed beside this one.**

**THE BLINDNESS CLAIM, RESTATED FOR THE LAST TIME SO IT CAN BE CHECKED: `src/shared/theme.ts` and
`tests/theme.test.ts` were NEVER READ by this pass — not opened, not printed, not searched, not diffed, not
linted, not `cat`-ed, not `grep`-ed.** The module was reached **only** as an object returned by a dynamic
`import()` of its path; the test file was never touched at all. **This artifact is a measurement, not a
re-derivation of the contract: where the module and the contract agreed, the reading is printed with the clause it
was driven against; where they disagreed, the disagreement would have been recorded as a FAIL with its clause
named — none was found, and `§G` item 8 says what that does and does not mean.**

---

## J. CLOSE-OUT ANNOTATION (`2026-09-27`, the supervisor's `U-THEME` gate-10 doc-writer pass) — **A STATUS RECORD APPENDED AT THE FILE'S END; EVERY SECTION ABOVE IS KEPT VISIBLE AND UNREWRITTEN, AND NOTHING HERE IS A MEASUREMENT BY THIS PASS**

**THE UNIT IS `DONE` — the ledger's SEVENTEENTH `DONE` row — and its authoritative record is `docs/next-steps.md`'s
`## DONE — U-THEME` section.** **WHAT THIS ANNOTATION DOES NOT DO, stated first because it is the point: it does NOT
re-drive a single scenario, it does NOT re-assert any reading above, and it does NOT lift this set's blindness claim
or its layer limits.** **THE `32` PASS / `0` FAIL / `7` `NOT-BLIND-RUNNABLE` CENSUS IS THIS SET'S OWN PASS'S COUNT AT
`fd70033` AND IS NOT A READING OF THE CLOSED-OUT TREE** — `§G`'s limits (`§G` items 1–8), `§E`'s seven
`NOT-BLIND-RUNNABLE` rows and `§F`'s five self-repaired driver defects all stand exactly as filed.

**THE `POST-GREEN` CLAUSE ABOVE IS `OWED`, NOT SATISFIED, AND THIS ANNOTATION IS THE CARRY.** The module's revision
under the close-out is **`36b8c3d`**, not `fd70033`, so **a later pass that quotes any reading in `§B`–`§D` as a
reading of the closed-out tree is re-quoting a dated measurement**; the targeted re-drive this file's own `§I`
requires **must be a fresh pass with a shell**, and its readings must be **APPENDED BESIDE** the as-filed ones, with
its own census printed beside this one. **The re-drive's four trigger classes are unchanged and are exactly the ones
`§I` names** — the `source` spelling/domain, the name-echo and removal rules, the freshness rule, and the module's
import set. **OWNER: a fresh blind pass (`AGENTS.md` item 10a/RCA-4); it gates no unit, and it is carried at the DONE
row's clause (12)(a).**

**AND THE ONE FACT A LATER READER OF THIS SET MOST NEEDS, RECORDED BECAUSE THE CLOSE-OUT MADE IT LIVE: the `source`
member read by `TG-01`, `TG-06`–`TG-12` and `TG-14` is the member the spec gate RENAMED from `basis` — a RENAME ONLY,
no semantics change — so the readings above are readings of the RULED spelling and a `basis`-spelling module would
FAIL them.** **The close-out pass that landed this annotation held read/search/doc-write tools and NO SHELL: it ran no
suite, no scenario, no leg and no commit, and every figure it cites is the supervisor's own measurement at `36b8c3d`
or this set's own dated reading above.** **The gate-8 record of the same close-out pass is
`archive/reviews/2026-09-27-U-THEME-doc-review.md`** (gates 7 and 8 folded into ONE pass, recorded as one, never as
two).
