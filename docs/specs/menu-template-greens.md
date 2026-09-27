# GREEN-SCENARIO ARTIFACT — `U-MENULIB` (`E7`, wave E) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass)` — `28` executed scenarios: `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE`,
plus `5` recorded findings (`F-1`..`F-5`).** **The three `FAIL`-attached clauses are `2` FAIL SCENARIOS
(`ML-G-05`, `ML-G-05b`) and `1` finding (`F-3`) recorded against a PASS — see `§G`'s arithmetic line.**

**⟶ THE TWO FAILS ARE BOTH REAL AND NEITHER IS CONVERTED TO A PASS.** **`F-1`** is an **un-hardened regression in
the landed module**: a FUNCTION-typed catalog element is CARRIED instead of SKIPPED at all three entry points
(scenarios `ML-G-05` and `ML-G-05b`). **`F-2`** is a **contradiction inside the contract's own worked figures**:
`§2.3` item 11's as-written reading (`out.length === 3`, and its `13`-element list carries **no** keyless source)
against `§3c`'s corrected reading (`4`, `[[], ['id','label'], ['0'], [seven]]`); on the union of the two named
lists (**14** elements) the module measures **`5`** = `§3c`'s four **plus** the one `ML-G-05b` produces, and
**no single catalog length reconciles the two passages** (scenario `ML-G-05`). **A THIRD CONTRADICTION IS
RECORDED AGAINST A PASS, NOT AS A FAIL:** **`F-3`** is a **self-contradicting clause pair** (`§2.3` item 5
rule 3 against `§3.2 F-5` / `§5.5.1`'s method note (a)); **`ML-G-15`'s skipped-element drive was driven against
rule 3's text — the reading the module implements — and it PASSES that reading while contradicting `F-5`'s
declared `items.length === 2`.** **The scenario is NOT re-scored to FAIL: a blind scenario is driven against ONE
stated clause, the other clause is named in the finding, and no reader may take the PASS as evidence that the
clause pair agrees.** **No FAIL here is a converted pass, and no scenario in this set was re-scoped to make a FAIL
disappear.**

**Authored from the DOCUMENTATION ONLY, and RUN against the landed module.** The sources read were:
`docs/specs/menulib.md` (the contract — the `CURRENT STATE` block; **`§0`'s fourteen ruling rows**; **`§0A` notes
`1`–`8`** including the gate-3 stop and its seven measured row-bound defects; the layer declaration and its seven
honesty anchors; `§1` items `1`–`9`; `§2.1` items `1`–`4` (the two-half export census, the three-function block
with every signature and declaration, the empty import census, the closed literal set); `§2.2` `(A)`/`(B)`/`(C)`/
`(D)`/`(E)` (the twelve prohibitions, the ten-token collision table, the semantics table); `§2.3` items `1`–`11`
including **the pinned carry rule and its four clauses**; `§2.4` items `1`–`6` (the seam table, the four declared
degradations, the OS-boundary clause and its six falsifier halves, **the `enabled` pin**); `§2.5` items `1`–`5`;
`§3.1` `M-1`..`M-9`, `§3.2` `F-1`..`F-10`, `§3.3` `I-1`..`I-13`, `§3.4` `R-1`..`R-13` with both dated exemption
pins, `§3.5` `X-1`..`X-5` with the `X-5` scope pin; `§4.1`–`§4.5`; `§5.1`, `§5.2`, `§5.3`, `§5.5`/`§5.5.1`/
`§5.5.2`/`§5.5.3` (the register, its four declared domains, its thirteen rows/terms and its caps); `§6`, `§7`,
`§7a`/`§7a.1`, `§8`, `§3a`, `§3b`, **and `§3c` in full — the three pinned sub-readings, the single composed carry
rule and the two corrected worked figures**) · `docs/specs/menulib-review.md` (the gate-1 record: its four steps,
`G-1`…`G-10`, the `Q1`/`Q2` working-default questions and the `P-1`…`P-5` process findings) ·
`docs/decisions.md`'s ACTIVE rows for the family, cited **by NAME** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL` ·
`UI-RENDERED-WITH-PROVIDENT` · `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` ·
`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` ·
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A DECLARED REGISTER TERM IS A DRIVE
COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `PROHIBITION-5-IS-AN-ADOPTION-BOUND` ·
`SHIM-COMPLETION-CARVE-OUT` · `DOC-REVIEW-GATE` / `BLIND-ALL-GREENS` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`) ·
and, for **FORMAT ONLY**, `docs/specs/relocate-greens.md` and `docs/specs/container-greens.md`.

**What this pass did NOT read — the blindness claim, stated so it is checkable.**
**`src/shared/menu-template.ts` was NEVER OPENED, READ, PRINTED, SEARCHED, `cat`-ED OR LINTED.** Its only use is
**one string** — the absolute path handed to a dynamic `import()` — and the module exists for this pass **only as
an imported black box**: its namespace keys were read at run time, its three functions were called, and its return
values were inspected. **No source byte, comment, identifier or internal helper of it informed any scenario,
input or expected reading below.** `tests/menu-template.test.ts` **(the red set) was NEVER READ EITHER** — and an
`fs.existsSync` probe was not even needed, because the harness never touched it. Its name appears in this record
only where the **contract** names it. No red-set row, table, expectation, term, seed or harness shape was read.
**Every input in this set is mine**, chosen from the contract's clause text.
**THE ONE DELIBERATE REACH OUTSIDE `docs/`: the `git` probes of `§A` (revision, `git status --porcelain`) and the
four repo legs (`npm test` / `typecheck` / `typecheck:tests` / `build`), which are read-only runs of the tree, not
reads of `src/**`.** Nothing else in the repo was read, and nothing in it was written by this pass.

**THE REVISION.** `git rev-parse --short HEAD` → **`ffdb978`** (`E7 GATE 3 GREEN — THE RED SET IS FULLY GREEN:
56/56 (src/shared/menu-template.ts only, 287 -> 288 lines) …`); `git status --porcelain` → **EMPTY before this
pass** (working tree clean).

**THE DATE.** The host clock reads **2026-09-27**, the same day as the contract's dated notes.

---

## A. HOW THE SCENARIOS WERE AUTHORED AND DRIVEN (so every reading below is reproducible)

**THE DRIVER.** Plain **Node ESM** — **Node `v24.20.0`**, whose native TypeScript type-stripping lets the module
be imported **by absolute file URL without any bundler, build step, `tsx`, vitest config or new dependency**:
`/tmp/menulib-greens/run.mjs`, a **scratch artifact OUTSIDE the repo**. **Say what was used, exactly: `node
run.mjs` (no `tsx`, no esbuild, no vitest, no `tsconfig`).** The module is reached as
`await import('file:///…/src/shared/menu-template.ts')` — the whole of the module's involvement.

**THE COMMANDS, with their exit codes (this is the whole run):**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `git rev-parse --short HEAD` · `git status --porcelain` | **0** | the revision `ffdb978`; an EMPTY working tree before the pass |
| **C-2** | `node /tmp/menulib-greens/run.mjs` | **1** (the driver's own census prints 2 FAIL — the `ML-G-15` PASS is the bounded one, `§B`/`§G`) | **`28` executed scenarios — `26` PASS / `2` FAIL**; output kept at `/tmp/menulib-greens/run-output.txt` |
| **C-3** | `npm test` | **0** | **`Test Files 71 passed (71)` · `Tests 1752 passed \| 2 skipped (1754)`** — the module's own file is among the 71 and is green (the suite's own reading; **this is a baseline, not this set's evidence**, and the two FAILs above are NOT reddening it) |
| **C-4** | `npm run --silent typecheck` | **0** | baseline, `src/**` only |
| **C-5** | `npm run --silent typecheck:tests` | **0** | baseline |
| **C-6** | `npm run --silent build` | **0** | the **SIX**-artifact census unchanged: `dist/main/{main.cjs,preload.cjs,standalone.mjs,battery-host.mjs}` + `dist/renderer/{renderer.js,index.html}` |

**THE HARNESS FORMS.** Three, all built from the contract's own vocabulary:
**(1) plain data** — the seven declared members materialized with `Object.create(null)` or a plain record, per
`§2.3` item 2/9; **(2) a RECORDING seam** — a closure that counts its own invocations, records its argument array
and returns a chosen answer, per `§2.4` item 1 / `§2.3` item 6 / `§5.5.1 P-ML-IM-7`'s count drives;
**(3) a RECORDING STAND-IN** — a `Proxy` whose `set`/`defineProperty`/`deleteProperty`/`apply` traps push to a
live log, per `§3.3 I-7` / `§2.4` item 5 half 1, used only in `ML-G-23` and **never passed to the module in the
element position the contract denies** (the module takes no element parameter at all).

---

## B. THE SURFACE, AND `normalizeCatalog`

| id | Clause(s) | Drive | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **ML-G-01** | `§2.1` item 1 (the two-half export census), `§3.4 R-5`(a), `F-9` | read the imported namespace's own keys; then the positive control (a namespace carrying a fourth value export) and the **named negative control** `buildMenuFromCatalog` | **exactly** `buildMenuTemplate` · `normalizeCatalog` · `selectCatalogItem`, each a function; **no fourth value export** (the control REJECTS it); **`buildMenuFromCatalog` absent** from the namespace by any route | **PASS** — `namespace=["buildMenuTemplate","normalizeCatalog","selectCatalogItem"] allFunctions=true buildMenuFromCatalog-absent=true fourth-value-control-rejects=true` |
| **ML-G-02** | `§2.1` item 2 (every signature), `§3.1 M-9` | arity census of the three exports; then one composition calling all three in sequence | arities **`1`/`2`/`2`** (`catalog`; `catalog, options?`; `catalog, picker?`); `normalizeCatalog` ⇒ an array; `buildMenuTemplate` ⇒ the two top-level member names; `selectCatalogItem` ⇒ the caller's own answer **by identity**, count `1` | **PASS** — `arities=[1,2,2] normalize→array(true) build→keys(["items","platform"]) select→answerByIdentity(true) selectCount=1` |
| **ML-G-03** | `§3.1 M-1`, `§2.3` items 1(a)/2/9/11 | `normalizeCatalog(frozenArrayOfThreeCarriedRecords)` — one all-seven, one two-key, one one-key | **EXACTLY `3`** entries IN CATALOG ORDER; **each entry's own key set is the intersection, in DECLARED ORDER**; **each carried value IS the source's by identity**; each entry is a **FRESH RECORD** (never the source); **the caller's array is unchanged**; NOTHING THROWS | **PASS** — `len=3 keySets=[["id","label","accelerator","role","kind","submenu","enabled"],["id","label"],["id"]] order=true memberIdentity=true freshRecords=true sourceUnchanged=true throws=0` |
| **ML-G-04** | `§3.2 F-1`, `§2.3` items 1(e)/3/10, `§3.3 I-1` | `normalizeCatalog` over **19** unusable shapes (`undefined` · `null` · `42` · `-0` · `NaN` · `'x'` · `''` · `true` · `false` · a `Symbol` · `12n` · `{}` · `Object.create(null)` · a `Map` · a `Set` · a function · a **revoked `Proxy`** · a **trap-throwing `Proxy`** · `[]`), then one `buildMenuTemplate` | **`[]` for every one of them** — the SAME declared answer for every such input; **NOTHING THROWS**; the `platform` member is still emitted by the three-outcome rule | **PASS** — `19 shapes all "[]" throws=0; buildMenuTemplate(undefined,{platform:'darwin'}).items=0 platform={recognized:true,collapsing:true}` |
| **ML-G-05** | `§3.2 F-2`, `§2.3` items 1(b)/(c)/(d) + item 11 + **`§3c` pins 1/2/3** | the `§3c` worked catalog: `[null, undefined, 42, 'x', Symbol('s'), 12n, fn, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid, accessorRecord, {extra:1}]` (**14** elements) | **the accessor-throwing record SKIPPED WHOLE** (pin 3) and **the keyless record CARRIED** (pin 2), so the carried key sets read `[[], ['id','label'], ['0'], [seven]]`; the array carried at its **own index** with `'0'` a **fresh seven-key record**; the caller's own elements never returned | **FAIL** — `catalogElements=14 carriedLength=5 keySets=[[],["id","label"],["0"],[seven],[]] order=[keyless,proto,arr,valid,keyless]`. The **first** keyless entry is `{extra:1}` carried under **pin 2**, the **second** is the **function element** (`fn`), which the normalizer CARRIED instead of SKIPPING — isolated at `ML-G-05b`. Every **other** clause of the row measures clean and the three pins all HOLD: `keylessEntryIsAFreshObject=true`, `arrayEntryIsFreshRecord=true`, `arrayMemberCarriedInTurn=true` with `arrayMemberKeys=[seven]`, `protoRecordKeys=["id","label"]`, `validKeys=[seven]`, and the accessor record SKIPPED WHOLE (`normalizeCatalog([accessorRecord]).length === 0`) |
| **ML-G-05b** | `§2.3` item 1(c) (**"or a function" ⇒ the element is SKIPPED**) + item 11 clause 4, `§3.2 F-2` | `normalizeCatalog([fn])` over **six** function shapes (a named `function`, an arrow, an `async` arrow, a generator, a `class`, a bound arrow); then `buildMenuTemplate([item, fn, item], {platform:'win32'})` and `buildMenuTemplate([fn], …)` | **`[]` for EVERY function shape** and the emitted sequence carries **only the two usable items** | **FAIL** — `[fn]` ⇒ `len 1 keys [[]]` for **all six** shapes (declared `len 0`); `buildMenuTemplate([item,fn,item]).items.length=3` (declared `2`) `ids=["a",null,"b"]`; `buildMenuTemplate([fn]).items=[{}]` — a projected ITEM with no member at all reaches `items` |
| **ML-G-06** | `§3c` (the composed carry rule: *"an object member being carried in turn"*), `§2.3` items 2/11 clause 2 | `normalizeCatalog([{id,label,submenu:[1,2],nested:{id,label}}])` | the entry's key set is the intersection (the **eighth** member `nested` is **DROPPED, never copied**); the array member is carried as a **fresh record** whose element values are by identity; a primitive member is verbatim | **PASS** — `entry keys=["id","label","submenu"]` (`'nested' in entry` is **false**); `m.id` by identity **true**; `submenu` keys `["0","1"]` with `sub[0]===1` and `sub[1]===2` **both true** — see **`F-2`** for the clause that names `nested` as carried (the module DROPS it, which is `§2.3` item 11 clause 2's own rule) |
| **ML-G-07** | `§3c` pin 1 (arrays: present index keys, ascending, `length` never carried), `§2.3` item 2 | `normalizeCatalog([[,x]])` and `normalizeCatalog([[seven, {id}]])` | the sparse array is carried at its **present indices only** (`['1']`); the two-element array is carried as `['0','1']`; **`length` is never carried**; each element carried in turn | **PASS** — `sparse → keys [["1"]]; two-element → keys [["0","1"]]; length carried=false; sparse['1'].id="s"; multi ids=["m0","m1"]` |
| **ML-G-08** | `§2.3` item 2, `§3.1 M-8`, `§3.4 R-12` | a source owning the seven PLUS `extra`/`another`, a `Symbol` key and a non-enumerable member; a second source inheriting `role` from its prototype | **the extras are ABSENT, NAMED BY NAME**; `Object.getOwnPropertySymbols(item).length === 0`; the **inherited** member is NOT carried | **PASS** — `keys=[["id","label"],["id","label"]] extrasAbsent=true ('extra' in item=false, 'another' in item=false) symbols=0 inheritedRoleAbsent=true` |

---

## C. `buildMenuTemplate` — the emitted shape, the platform pool and the collapse

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **ML-G-09** | `§3.2 F-3`, `§2.3` item 4, `§0A` notes 3/4, `§5.5.1 P-ML-TP-3` | the three-outcome pool driven with **16** values (`'darwin'` · `'win32'` · `'linux'` · `'freebsd'` · `''` · **`'Darwin'`** · **`' darwin'`** · **`'darwin '`** · `null` · `42` · a `Symbol` · `12n` · `{}` · `[]` · a function · a revoked `Proxy`) **plus** `options` omitted, `platform: undefined`, and a bag with no `platform` member | **`'darwin'` ⇒ `{true,true}`**; **every other STRING ⇒ `{true,false}` with the identity projection** — the case and whitespace variants **do NOT collapse**; **every non-string and the absent case ⇒ `{false,false}`**; **NOTHING THROWS**; no silent `'darwin'` default on any drive | **PASS** — all 19 drives as declared: `darwin=true/true/len2; win32/linux/freebsd/''/Darwin/' darwin'/'darwin '=true/false/len3; null/42/Symbol/12n/{}/[]/fn/revoked & options-omitted & platform-undefined & member-omitted=false/false/len3` |
| **ML-G-10** | `§3.1 M-3`, `§2.3` item 4(b), `§5.5.1 P-ML-SM-2` | one catalog carrying a two-entry `'picker'` run, driven at `'win32'` and at `'darwin'` | **identity projection:** the SAME number of entries in the SAME order with the SAME carried members; **NO entry's `submenu` was replaced or created by the module** (each is exactly its source's own member); `collapsing === false`; `recognized === true` — and the SAME catalog on `'darwin'` **does** collapse | **PASS** — `identity: len=4 order=[n1,p1,p2,n2] every submenu === its source member (true) collapsing=false :: darwin same catalog: len=3 parent=p1 submenu=[p2]` |
| **ML-G-11** | `§3.1 M-2`, `§0A` note 5, `§3.3 I-3` | `Object.keys` of the template and of `template.platform`; the member types, the prototypes and a getter probe | `Object.keys(template)` deep-equals `['items','platform']`; `Object.keys(template.platform)` deep-equals `['recognized','collapsing']`; both platform members are `boolean`s; `Array.isArray(items)` is `true`; each record's prototype is `Object.prototype`; **no member is a getter** | **PASS** — `keys=["items","platform"] platformKeys=["recognized","collapsing"] booleanMembers=true isArray=true prototypes=true getterFree=true` |
| **ML-G-12** | `§3.1 M-7`, `§2.3` item 5 rules 1/2/3/6, **`§2.4` item 6**, `§5.5.1 P-ML-IM-5` | `[n1, pa, pb, pc, n2]` (three `'picker'` entries, distinct ids/labels), `platform: 'darwin'`, **picker OMITTED** | `items.length === 3`; the parent carries its own members verbatim with **`enabled === false`** (the degradation governs, `§2.4` item 6 rule 1) and `kind` still `'picker'`; `submenu` = the **REST OF THE RUN IN CATALOG ORDER**; the non-picker neighbours in place; `platform = {true,true}` | **PASS** — `items.length=3 ids=[n1,a,n2] parent.id=a parent.kind=picker parent.enabled=false` (six members verbatim, `enabled` the one the degradation owns) `submenu=[b,c] submenuLabels=[B,C] nonPickerInPlace=true platform={recognized:true,collapsing:true}` |
| **ML-G-13** | `§3.1 M-7` (the reversed leg), `§2.3` item 5 rule 6 | the SAME run in REVERSED catalog order | the parent MOVES to the run's new first entry and the `submenu` order follows | **PASS** — `reversed: items=[n1,c,n2] parent=c submenu=[b,a]` |
| **ML-G-14** | `§3.2 F-5`, `§2.3` item 5 rules 4/5, `§7a.1` item 3 | a run of **exactly one** `'picker'` entry; and **two** runs split by a non-picker entry | the singleton is **NOT collapsed**: `items.length === 3`, its own `submenu` value kept, **no `submenu` created**; the split catalog yields **TWO** collapsed parents; `collapsing === true` in both | **PASS** — `singleton: len=3 ids=[n1,a,n2] pickerSubmenuUnchanged=true (the source's own value) :: two-runs: len=3 ids=[a,n,c] run1sub=[b] run2sub=[d] collapsing=true` |
| **ML-G-15** | `§2.3` item 5 rules 3/4/7 + 1/2, `§5.5.1 P-ML-IM-5`'s boundary drives | (i) a catalog that is ALL picker entries; (ii) `[pickerA, null, pickerB]` — a run whose members are separated by an element the normalizer SKIPS; (iii) a run carrying `enabled: false`; (iv) a run whose first entry OWNS a `submenu` value; each with a recording seam | one maximal run spanning the array collapses once; **the skipped element does not BRIDGE the run** (rule 3) so the two entries collapse **together**; `enabled:false` entries collapse identically; the run's first entry's own `submenu` value is replaced by the run array; count `1` | **PASS against `§2.3` item 5 rule 3 — but the PASS is BOUNDED, and the OTHER clause contradicts this drive (finding `F-3`; the scenario is NOT re-scored).** The first, third and fourth drives are as declared; the **skipped-element** drive contradicts `§3.2 F-5` and `§5.5.1`'s dated method note (a), which declare it as **TWO SINGLETONS**: `all-picker: len=1 sub=[b,c]` (OK) `:: skipped-element [a, null, b]: len=1 parent=a submenu=[b]` (**declared: `len=2`, no `submenu` on either**) `:: enabled:false run: len=1 parentEnabled=false` (OK) `:: first-entry submenu value: parent.submenu=["T"]` (OK) `:: callable-seam count=1` (OK) — **the module follows `§2.3` item 5 rule 3's text (the run is measured on the NORMALIZED sequence, so a skipped element cannot split it); the two clauses disagree and the FAIL is recorded against `F-5`'s reading** |
| **ML-G-16** | `§2.4` item 1 classes (1)/(2), `§3.1 M-4`, `§5.5.1 P-ML-TP-2` | `'darwin'` collapses with the seam **omitted**, `undefined`, `null`, `42`, `'x'`, `true`, a `Symbol`, `12n`, `{}`, `[]`, and `options` omitted; then `selectCatalogItem` with `undefined`/`null`/`42` | every drive: **the `'picker'`-kind item (the collapsed parent) IS EMITTED and reads `enabled === false` — NEVER DROPPED**; the selects return the declared **`null`**; **no mechanism default appears**; **NOTHING THROWS** | **PASS** — `11 builds all len1/enabled:false (parent present, value false); selects null/null/null` |
| **ML-G-17** | `§2.4` item 1 class (3), `§3.1 M-5`, `§5.5.1 P-ML-SM-2`/`SM-3` | a throwing seam (`Error` · a thrown string · `42n` · `null` · `undefined`) on `buildMenuTemplate` and on `selectCatalogItem`; a `Proxy` whose `apply` trap throws; then the same seam twice | the count is **EXACTLY `1`** (the attempt is counted) and **NEVER `2`**; the item reads `enabled === false`; the select returns `null`; **NOTHING ESCAPES**; **never retried** | **PASS** — `Error/string/bigint/null/undefined: build(count=1, len=1, enabled=false) select(count=1, null); apply-throwing Proxy: len=1 enabled=false; no retry across calls: count=2 for 2 calls` |
| **ML-G-22** | `§2.4` item 6 rule 4 (the rule does **NOT** fire when the seam is callable) | `'darwin'` collapse with a **callable recording** seam and a run whose entries own `enabled: true` | the parent's `enabled` is **the source's own value, verbatim** — the degradation does not fire | **PASS** — `callable-seam parent.enabled=true submenu[0].enabled=true` |

---

## D. `selectCatalogItem`, and the seam's own discipline

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **ML-G-18** | `§2.3` item 8 (**STRICT IDENTITY**, *"no coercion"*), `§2.4` item 1 class (4) + its positive arm, `§3.1 M-6`, `§3.2 F-6` | a recording picker returning (a) the carried string `'a'`; (b) the sentinel object `{id:'b'}` against a catalog whose entry carries a **different** object `id`; (c) `'zzz'`; (d) `null`/`undefined`/`''`/`0`/`false`/`[]`/`{}` | a **known-`id`** answer is returned **BY IDENTITY** (count `1`); **a non-`null` answer naming NO known id returns `null`** (count `1`); every empty answer returns `null`; nothing throws | **PASS on the strict-identity reading** — (a) `'a'` ⇒ the caller's own answer, count 1; (b) the fresh `{id:'b'}` ⇒ **`null`**, count 1 (a *reference*-carried object id would match; `§3.1 M-6`(b) reads this same drive as a by-identity return and is therefore **unusable as written** — recorded as `F-4`); (c) `null`, count 1; (d) `[null × 7]`, counts `1,1,1,1,1,1,1` |
| **ML-G-19** | `§3.2 F-7`, `§2.3` item 8, `§2.2 P-ML-10` | a catalog carrying `id: NaN`, an entry with NO `id`, and the string `'a'`; answers `NaN`, `undefined`, a fresh `{id:'a'}`, and `'a'` | **`NaN` NEVER matches itself**; a **fresh equal-contents object NEVER matches**; an entry with no `id` contributes **no candidate**; the carried string matches itself; NO coercion | **PASS** — `NaN→null fresh-object→null undefined→null carried-string→"a"; counts=1,1,1,1` |
| **ML-G-20** | `§2.3` item 6, `§2.4` item 1, `§3.3 I-2`, `§5.5.1 P-ML-IM-7`'s count drives | the four count drives: two successive `'darwin'` calls over a picker run; one `'win32'` call over the same run; one call whose catalog has **no** `'picker'`-kind entry; one `selectCatalogItem` | **exactly `1` per seam-bearing invocation** — never a second invocation inside a call and never a cache across calls; and **`0` where no `'picker'`-kind entry exists** | **PASS** — `darwin+run, 2 calls → count 2 (=1/call, never 2/call); win32+run → count 1 (the identity path still invokes once because a 'picker'-kind entry is present, per §2.3 item 6); no picker-kind entry → count 0; selectCatalogItem → count 1` |
| **ML-G-21** | `§2.3` item 6 (the seam's single argument), `§2.3` item 11 | read the recording seam's own argument array on a collapsed `'darwin'` call | the argument is the array of **CARRIED candidate entries** — and this pass takes **no position** on whether the contract means the *pre*-collapse or *post*-collapse sequence, because **`§2.3` item 6 says "the carried candidate entries" while its own clause reads "the (the `darwin`-collapsed, if applicable) emitted sequence"** | **PASS (clause measured, ambiguity recorded — `F-5`)** — `callCount=1 candidates.length=2 candidateIds=["a","b"] candidateKeys=[[seven],[seven]]` — i.e. the **pre-collapse** carried run, on a call whose emitted `items` reads **1** entry |
| **ML-G-23** | `§2.4` item 5 halves 1–4, `§3.3 I-7`, `§3.4 R-2` (the caller-side half), `§1` item 4 | a **recording stand-in** (traps on `set`/`defineProperty`/`deleteProperty`/`apply`) with a **live positive control**; then **9 module-only drives** (all three functions, hostile catalogs, `'darwin'` collapses, the seam, an empty catalog) with the stand-in also handed in **every parameter position**; then the declared arities | the control reads **> 0** (the log is LIVE, not dead); **the module drives read `0` writes of every kind**; **the module takes no element parameter** (its arities are `1`/`2`/`2`) | **PASS** — `stand-in: 9 module drives → 0 writes; live positive control → 2; the stand-in handed in as catalog/options/picker still → 0; arities=[1,2,2] (no element parameter exists to hand it in as)` |

---

## E. Purity, retention, and totality

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **ML-G-24** | `§3.2 F-10`, `§2.5` items 1/3, `§3.3 I-4`, `§5.5.1 P-ML-SM-1`/`SM-3` | two calls of each export with the SAME arguments, then **five** repeated calls of `normalizeCatalog` and of `buildMenuTemplate` | every repeated call returns an **EQUAL value** with a **DISTINCT identity** (fresh records each call), the emitted template's member lists unmoved, and **no observable state differing between the first and the fifth call** | **PASS** — `normalize: equalValues=true distinctIdentity=true (n1!==n2, n1[0]!==n2[0]); build: equalKeys/equalPlatform=true, fresh template AND fresh items=true; 5 repeated calls: pairwise-distinct=true equalContents=true` |
| **ML-G-25** | `§3.3 I-1`, `§3.2 F-1`/`F-2`/`F-4`, `§5.5.1 P-ML-TP-1`/`TP-3` | **20** hostile arguments (`undefined` · `null` · `NaN` · `42` · `-0` · `'x'` · `''` · `true` · a `Symbol` · `12n` · `{}` · `Object.create(null)` · a `Map` · a `Set` · a function · a **revoked `Proxy`** · a **trap-throwing `Proxy`** · `[]` · `[null,42,'q']`) × **5** entry-point positions (`catalog`, `options`, `picker`, and both select positions) = **100 drives**; plus a **revoked-`Proxy` seam** | every call returns its **declared shape** (`readonly CatalogEntry[]` · the `{items, platform}` record · **`unknown` or `null`**) and **NO call throws, for any argument** | **PASS** — `100 drives: throws=0 shapeViolations=[]; a revoked-Proxy seam is likewise total (items is an array)` |
| **ML-G-26** | `§3.2 F-4`, `§2.4` item 2, `§2.3` item 4(c), `§5.5.1 P-ML-TP-3` | **11** unusable option bags (`undefined` · `null` · `42` · `'x'` · `true` · `[]` · a function · a revoked `Proxy` · a trap-throwing `Proxy` · `{}` with no `platform` member · **a bag whose `platform` accessor THROWS**) | **the declared `{recognized:false, collapsing:false}` arm, the identity projection, the five-member shape, and NOTHING THROWS** — an accessor throw must NOT propagate | **PASS** — `11 bags → false/false + the two top-level member names; the throwing-`platform`-accessor bag → recognized:false (no propagation)` |
| **ML-G-27** | `§2.3` item 10, `§3.2 F-1`, `§5.5.1 P-ML-IM-4` | `buildMenuTemplate([], {platform:'darwin'})` and `buildMenuTemplate(null, {platform:'win32'})` | the EMPTY catalog's declared value with the platform member **STILL emitted by the three-outcome rule**: `collapsing` describes the **RULE IN FORCE**, never an empirical count of collapsed runs | **PASS** — `[] + darwin → {items:[], platform:{recognized:true,collapsing:true}}; null + win32 → {items:[], platform:{recognized:true,collapsing:false}}` |

---

## F. THE SCENARIOS THAT CANNOT BE RUN BLIND (`NOT-BLIND-RUNNABLE`, never counted as a pass)

**Six rows. Each names the reason in the contract's own terms; none is a pass, and none is evidence.**

| id | The claim that cannot be driven blind | Why — the reason |
| --- | --- | --- |
| **ML-G-NB-1** | **`§3.4 R-1`'s anti-evasion vocabulary scan and `R-8`'s closed-set literal census** — *"over the MODULE's source … in the normalized view"* | **A STATIC BYTE/TOKEN CENSUS OF THE MODULE.** Running it requires **reading `src/shared/menu-template.ts`**, which this writer is forbidden to read and did not read; the assertion is about the module's own **bytes**, not about any value it returns. **A caller-side drive cannot falsify it** — a module could carry any literal and still return every value this set measured. (Its companion — `R-7`'s one-platform-literal claim — is the same class.) |
| **ML-G-NB-2** | **`§2.4` item 5's native-menu/picker half and `§3.3 I-11`** — *"no row of this unit may assert that a native menu exists, that an item appears in it, that an accelerator fires, that a picker opens"* — and the OS-acceptance fact behind `'darwin'` | **THE RENDERED / OS FACT.** *"No window is booted, no Electron `Menu` is constructed, no accelerator is registered, no picker is rendered, and no real OS menu exists anywhere in the run"* (honesty anchor 1). The claim is by construction **unobservable in the node suite**, and `[U]`/`[D]` are, per `§5.2`, **not offered and not claimed** — so no instrument in this repo reads it. `ML-G-23` measures only the caller-side half (zero writes), which is exactly what the contract says is measurable. |
| **ML-G-NB-3** | **`§5.5.1`'s register tables — the 13 rows / 13 terms / 126 declared attempts, the seed `20260927`, the caps, the subtotals and the `6`-of-`13` `(bounded)` set** | **THE REGISTER'S OWN TABLES.** These are claims **about the harness** (`tests/menu-template.test.ts`) and about the record's own arithmetic — *"the attempt total is printed WITH its per-row terms"* — not about any value the module returns. Measuring them requires **reading the red set**, which this pass did not do; and re-deriving them would be re-authoring, not blind verification. **`C-3`'s suite figure is a baseline, not a reading of these cells.** |
| **ML-G-NB-4** | **`§3.4 R-13`'s no-importer probe / `§3.5 X-1`'s green branch** — *"`src/shared/menu-template.ts` is imported by NO `src/**` file, and appears in none of the built bundles"* | **AN IMPORT-GRAPH CENSUS OVER `src/**`.** The probe is a recursive read of the tree for the module's specifier — i.e. **reading other `src/**` files**. `C-6`'s unchanged six-artifact build census is **consistent with** the claim but does not falsify it (a module could be imported and still be tree-shaken out of a bundle's reachable exports), so it is **not filed as a pass**. |
| **ML-G-NB-5** | **`§3.4 R-2`'s second half — the byte scan of the unit's own TEST FILE, and the two control corpora's exemption** | **A BYTE SCAN OF `tests/menu-template.test.ts`.** Reading that file is forbidden to this writer and was not done. `ML-G-23` reaches the **module-side** half of the same clause from the caller's side; the test-file half cannot be reached at all from here. |
| **ML-G-NB-6** | **`§3.2 F-8`'s and `F-9`'s positive-control corpora** (*"a corpus that constructs a `Menu` … a corpus module carrying exactly one import statement"*) **and `§3.5 X-5`'s `src/**` token sweep** | **STATIC CONTROL CORPORA AND A REPO-WIDE TOKEN CENSUS.** The corpora are **declared-failing** static fixtures scanned as **source text** (`F-8`/`F-9` are `static`-layer rows), and `X-5` sweeps **every `src/**` file**. All three require reading files outside this writer's wall. `ML-G-01` reaches only the **export-set** control from run time, which is why it is filed as its own pass and this row is not. |

---

## G. THE RECORDED FINDINGS (`F-1`..`F-5`) — none converted to a pass

| id | Class | The finding, one line | Evidence |
| --- | --- | --- | --- |
| **F-1** | **an un-hardened regression in the landed module (attached to a FAIL)** | **A FUNCTION-TYPED CATALOG ELEMENT IS CARRIED AS A KEYLESS ENTRY INSTEAD OF BEING SKIPPED.** `§2.3` item 1(c) names the function class explicitly (*"otherwise — the element is absent (`undefined`), `null`, or a non-object primitive …, **or a function** ⇒ the element is SKIPPED — it contributes NO entry and NO throw"*) and item 11 clause 4 restates the skip as total (*"a non-object element, `null`, `undefined`, a primitive, a `Symbol`, a `BigInt` **or a function** contributes NO entry"*). The module emits **one entry per function**, and that entry then reaches `items` as a projected item carrying **no member at all** — it is the entry that makes `ML-G-05`'s carried length `5` rather than `4`. | `ML-G-05` (`carriedLength=5`, one keyless entry unexplained) and its isolation `ML-G-05b`: `normalizeCatalog([fn])` → `len 1 keys [[]]` for a named function, an arrow, an `async` arrow, a generator, a `class` and a bound arrow; `buildMenuTemplate([item,fn,item]).items.length=3` with `ids=["a",null,"b"]`; `buildMenuTemplate([fn]).items=[{}]`. **The contract's own `§3a`/`§7`(C) sites already name the function class as skipped; this is the landed module's, not the record's, defect.** |
| **F-2** | **a doc/spec drift inside the contract (attached to a FAIL)** | **THE CONTRACT'S TWO WORKED CATALOGS FOR THE SAME FIXTURE ARE BOTH 13 ELEMENTS, THEY ARE NOT THE SAME LIST, AND THE ONE THAT LACKS A KEYLESS SOURCE STILL PRINTS A LENGTH THAT REQUIRES ONE.** `§2.3` item 11's list reads `[null, undefined, 42, 'x', Symbol('s'), 12n, () => 1, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid, accessor]` — **13** elements, carrying **no `{extra:1}`-style empty-intersection record** — and its worked reading is *"`out.length === 3`"* (three carried ids `['proto','nested','valid']`). `§3c`'s corrected list reads `[null, undefined, 42, 'x', Symbol('s'), 12n, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid, accessor, {extra: 1}]` — **13** elements — and its corrected reading is `out.length === 4` with key sets `[[], ['id','label'], ['0'], [seven]]`. **THE DRIFT, STATED AS ARITHMETIC:** under the pinned rule (`§3c` pins 1–3) each list carries `4` entries (the keyless record + the null-prototype record + the array + the seven-key record) and the accessor record is skipped whole — so **`§2.3` item 11's own list must read `4`, not `3`**, because **pin 2 carries an empty-intersection record as a keyless entry rather than dropping it** (the exact element that list does not contain). **And `§2.3` item 11's list contains a FUNCTION element, which by `F-1`'s own class is skipped too — so its `3` is wrong under BOTH rules.** No single figure reconciles the two passages. | `ML-G-05`: `catalogElements=14 carriedLength=5 keySets=[[],["id","label"],["0"],[seven],[]]` — the keyless record IS carried (pin 2 holds), the array IS carried at its own index with a fresh seven-key `'0'` (pin 1 holds), and the accessor record IS skipped whole (pin 3 holds, **isolated**: `normalizeCatalog([accessor]).length === 0`). The module is conformant on all three pins; the ARITHMETIC of the two as-written worked figures is what does not hold. |
| **F-3** | **a clause pair that contradicts itself (recorded against a PASS — `ML-G-15` was driven against rule 3's text, the reading the module implements, and `F-5`'s competing reading is named, not silently dropped)** | **THE SKIPPED-ELEMENT-BREAKS-A-RUN DRIVE IS DECLARED TWO WAYS.** `§2.3` item 5 **rule 3** reads *"the RUN IS MEASURED ON THE NORMALIZED SEQUENCE … so an element skipped by the normalizer cannot bridge or split a run"* — under which `[pickerA, null, pickerB]` is ONE run of two and collapses; while **`§5.5.1`'s dated method note (a)** and **`§3.2 F-5`'s own text** declare the same drive as **TWO SINGLETONS** with `items.length === 2` and no `submenu` on either. The module follows **rule 3**. | `ML-G-15`: `skipped-element [pickerA, null, pickerB]: len=1 parent=a submenu=[b]`; the contract's other clause declares `items.length === 2` as **TWO SINGLETONS** with no `submenu` on either. **Reported, not adjudicated: this writer takes no position on which clause should win — the FAIL is recorded, and the module's behaviour is named so the reconciliation is not a re-derivation.** |
| **F-4** | **a row whose `[T]` leg is not satisfiable as written (doc finding)** | **`§3.1 M-6`(b) IS UNUSABLE AS WRITTEN.** It requires *"`selectCatalogItem(catalog, pickerReturning(answerObjectWhoseOwnIdIsInTheCatalog))`"* to return `answer` **BY IDENTITY**, while `§2.3` item 8 pins the comparison as **STRICT IDENTITY (`===`)** *"against the OWN `id` members"* with *"no coercion"* and `§3.2 F-7` requires *"a fresh `{ id: 'a' }` object (never `===` to the carried one)"* to **NOT match**. An answer object that is not the carried `id` reference therefore cannot match under the pinned rule, and `M-6`(b)'s drive as worded cannot be green. `G-4`'s positive arm survives on the **string-**`id` leg. | `ML-G-18`: the fresh `{id:'b'}` ⇒ **`null`** (count 1) while the carried string `'a'` ⇒ the caller's own answer by identity (count 1). The module answers `§2.3` item 8 / `F-7`; **`M-6`(b)** is the site that would read otherwise. |
| **F-5** | **a seam-argument ambiguity (doc finding)** | **`§2.3` item 6 NAMES THE SEAM'S ARGUMENT TWICE, DIFFERENTLY:** the rule sentence says *"the module invokes the caller's `picker` … with **the carried candidate entries** as its single argument"*, while its own follow-on clause says the count is `1` *"WHEN AND ONLY WHEN **the (the `darwin`-collapsed, if applicable) emitted sequence** contains at least one entry whose `kind` is strictly `'picker'`"* — the first reading is the **pre**-collapse carried array, the second a **post**-collapse sequence. On a collapsed call the two differ (carried length `2` vs emitted length `1`, with the parent's `kind` still `'picker'`). | `ML-G-21`: `callCount=1 candidates.length=2 candidateIds=["a","b"]` on a call whose `items.length === 1` — the module passes the **pre-collapse carried array**. Both readings yield count `1`, so **no count row moves**; the recorded ambiguity is the **argument's content**. |

**THE FINDING ARITHMETIC, stated so the gate is checkable: `5` findings · `2` of them attached to a FAIL
(`F-1` → `ML-G-05`/`ML-G-05b`; `F-2` → `ML-G-05`) · `3` recorded against a PASS (`F-3` → `ML-G-15`, whose own
pass is **bounded to rule 3**; `F-4` → `ML-G-18`; `F-5` → `ML-G-21`) · `0` converted to a pass · `0` silently
dropped.** **`F-1` is the one host-side defect this pass found and it is the Implementer's to repair (red-first,
per `AGENTS.md` item 3 / `RCA-1`); `F-2`..`F-5` are contract-side and are the documentation reviewer's /
spec owner's to reconcile** — this writer's write scope is this one file.

---

## H. HONEST LIMITS — what this set does NOT prove

1. **A green here proves THE RETURN VALUES OF THREE PURE FUNCTIONS, ONE CALLER CLOSURE'S INVOCATION COUNT, AND
   NOTHING ELSE** (honesty anchor 2). **No window was booted, no Electron `Menu` was constructed, no accelerator
   was registered, no picker was rendered, no IPC round-trip ran, no MCP transport was exercised and no real OS
   menu exists anywhere in this run** (`ML-G-NB-2`).
2. **A green on the emitted template is NOT a green on a MENU** — no row here proves that an item appears in a
   native menu bar, that an accelerator fires, that a picker opens, or that a `role`/`kind` value is one any
   platform accepts. **The emitted keys are CARRIED, and CARRIED IS NOT INTERPRETED.**
3. **The platform argument is an OPAQUE CALLER STRING and the module reads exactly one value of it.** Every
   `'darwin'` reading here is a statement about the **projection rule**, never about an operating system this
   repo can observe.
4. **`ML-G-25`'s totality is over a FIXED 20-value pool × 5 positions, not over the whole JavaScript value
   space.** It is the contract's own declared extent class (`§5.5.1 P-ML-TP-1` carries a `(bounded)` marking for
   exactly this reason) and **this set's totality claim is bounded the same way**. The three shapes the contract
   itself names as deliberate exclusions (a lone-surrogate string, a `Symbol.toPrimitive` that throws on its
   second invocation, a holder returning different answers on successive reads) are **not driven here either**.
5. **`ML-G-20`'s counts are the CALLER's own recorded counts.** They prove what this set's own closures observed;
   they are not an instrument inside the module.
6. **No static claim of `§3.4` was verified** (`ML-G-NB-1`/`-4`/`-5`/`-6`), and **no `[U]`, no `[D]`, no
   assembled-app and no OS evidence is offered or implied** — `§5.2`'s three-part `[U]` refusal and its
   non-claim of `[D]` are untouched by this pass.
7. **`C-3`'s suite reading is a baseline of the tree, not this set's evidence.** It is recorded because it was
   run and because it shows the two FAILs above are **not** currently reddening the repo's own suite.
8. **`F-1` IS NOT A PACKAGE DEFECT.** It is host-side (`src/shared/menu-template.ts`, this repo's own module), so
   **no `docs/defects.md` row and no `docs/HANDOFF.md` round is owed** (`AGENTS.md` item 7's package rule).

---

## I. WRITE SCOPE AND THE POST-GREEN NOTE

**WHAT THIS PASS WROTE, EXACTLY: this one file, `docs/specs/menu-template-greens.md`, and NOTHING ELSE IN THE
REPO.** The driver, its output and every scratch artifact live **outside** the tree, under `/tmp/menulib-greens/`
(`run.mjs`, `run-output.txt`). **No scratch file was placed inside the repo, so none needed deleting.** The five
read-only commands of `§A` (`git` probes, `npm test`, `typecheck`, `typecheck:tests`, `build`) write only to
build/test output directories the repo already owns. The module's own mtime still reads `Sep 27 16:02` and the
test file's `Sep 27 16:00` — both earlier than this pass (its only reads of them were an `ls` of their paths).

**⟶ `POST-GREEN` — THE STALENESS CLAUSE, AND IT IS BINDING.** **This set was authored against the module at
`ffdb978` (`tests`-side red set green at `56/56`, `src/shared/menu-template.ts` at its `287 → 288`-line landed
form).** **A LATER CHANGE TO `src/shared/menu-template.ts` STALES THIS SET AND OWES A TARGETED RE-DRIVE, RECORDED
IN THIS FILE** — the sibling sets' own rule, carried verbatim in substance: **every reading above is a
measurement of THAT revision and must not be re-quoted as a reading of a later tree.** **THE RE-DRIVE IS OWED IN
PARTICULAR FOR `F-1`'s REPAIR:** when the function-class skip lands, **`ML-G-05`, `ML-G-05b` and any row whose
length depended on the carried count must be re-driven** (and **`ML-G-15` must be re-driven when `F-3`'s clause
pair is reconciled, because its PASS is bounded to rule 3 alone**), and the re-drive's readings must be **appended beside
the as-filed ones, never substituted for them** (annotate-never-rewrite). **The `26` PASS / `2` FAIL / `6`
`NOT-BLIND-RUNNABLE` census stands as THIS pass's count and is not moved by a re-drive** — a re-drive is its own
pass, with its own census printed beside this one.

**THE BLINDNESS CLAIM, RESTATED FOR THE LAST TIME SO IT CAN BE CHECKED: `src/shared/menu-template.ts` and
`tests/menu-template.test.ts` were NEVER READ by this pass — not opened, not printed, not searched, not
diffed, not linted, not `cat`-ed.** The module was reached **only** as an object returned by a dynamic `import()`
of its path, and the test file was never touched at all. **This artifact is a measurement, not a re-derivation of
the contract: where the module and the contract disagreed, the disagreement is recorded as a FAIL or a finding
with the clause named, and nothing was re-scoped, softened or explained away.**

---

## ⟶ CLOSE-OUT ANNOTATION (`2026-09-27`, the `E7` / `U-MENULIB` GATE-10 pass — **an ANNOTATION appended below this set; NOTHING ABOVE IS REWRITTEN, and this set's own census stays ITS pass's count** (`AGENTS.md` item 10a's close-out; the annotated-never-rewritten convention).)

**1. `POST-GREEN` IS TRIGGERED, AND THE TARGETED RE-DRIVE REMAINS `OWED` — RECORDED HERE AS OWED, NEVER AS DONE.** **The set was authored against the module at `ffdb978`; the module has since changed, so its own binding clause fires: every reading above is a measurement of THAT revision and must not be re-quoted as a reading of a later tree.** **THE RE-DRIVE IS OWED IN PARTICULAR FOR THE TWO FAILs' REPAIRS — `F-1`'s function-class skip (the rows whose lengths depended on the carried count: `ML-G-05`, `ML-G-05b`) and `F-3`'s clause-pair reconciliation (`ML-G-15`, whose PASS was BOUNDED to rule 3) — and for `F-2`'s corrected worked arithmetic.** **THE RE-DRIVE'S READINGS MUST BE APPENDED BESIDE THE AS-FILED ONES, NEVER SUBSTITUTED FOR THEM, and the `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE` census stands as THIS pass's count and is not moved by a re-drive.** **THIS CLOSE-OUT PASS DID NOT RUN THE RE-DRIVE: its wall is read/search/doc-write and it holds no shell — so the re-drive is carried as OWED with the DONE row's clause (12) naming it.**

**2. THE TWO FAILs, THE THREE BOUNDED AMBIGUITIES AND THE FIVE FINDINGS — ALL CLOSED ON THE CONTRACT SIDE, EACH AT ITS OWN SITE IN `docs/specs/menulib.md`, WITH THE TERM VERDICT UNMOVED.** **`F-1`** (a function-typed element CARRIED rather than SKIPPED — host-side) → **fixed, with a red-first regression row** (`§2.3` item 1's PIN 1; the `A-1 / FUNCTION ELEMENT` row over six function shapes). **`F-2`** (the contract's two worked catalogs' arithmetic) → **corrected `3 → 4`** with the as-written `3` kept VISIBLE (`§2.3` item 11's PIN 4). **`F-3`** → **rule 3 governs alone** (`§2.3` item 5's PIN 5(i)) **and the reconciliation row is landed** (with the competing two-singleton reading asserted to FAIL). **`F-4`** → **strict identity pinned**, the drive re-grained to a carried OBJECT `id` returned BY REFERENCE (`§3.1`'s PIN 5(ii)). **`F-5`** → **the seam receives the PRE-COLLAPSE carried candidates** (`§2.3` item 6's PIN 5(iii)). **NO REGISTER TERM MOVED FOR ANY OF THEM: the declared total stays `126` = its thirteen terms, the seed stays `20260927`, and the `6`-of-`13` `(bounded)` set is unchanged** (`docs/specs/menulib.md` `§3e`'s term verdict, re-printed at `§3f` (4)). **THE FINDINGS' DISPOSITIONS ARE TABULATED AT `docs/specs/menulib.md` `§3b`, filled by the same close-out pass.**

**3. THE SET'S OWN BLINDNESS CLAIM IS UNTOUCHED AND IS NOT RE-OPENED BY THE RE-DRIVE'S ABSENCE.** **A re-drive is its own pass with its own census; it must read the module as the same black box** (the contract's static rows are the only claims that need the module's bytes). **A later re-drive that reads the module's source is NOT this set's pass and must say so.**

**4. WHAT THIS SET PROVES, RESTATED SO THE CLOSE-OUT IS NOT OVER-READ: A GREEN HERE PROVES THE RETURN VALUES OF THREE PURE FUNCTIONS, ONE CALLER CLOSURE'S INVOCATION COUNT, AND NOTHING ELSE.** **No `[U]`, no `[D]`, no assembled-app, no rendered-picker and no OS evidence is offered or implied, gate 6 is `STRUCTURAL` (never waived) in the contract and in the DONE row, and the `NOT-BLIND-RUNNABLE` set is named rather than implied.**
