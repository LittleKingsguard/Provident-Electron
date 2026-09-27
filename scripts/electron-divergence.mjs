// scripts/electron-divergence.mjs — R13: the ONE Electron-run divergence check.
// Drives the REAL Electron app (real DOM) over stdio with the SDK client and
// compares the shim-stable surfaces (census + SSR fragment + dirtied ids +
// data-node-id parity) against the DOM-shim battery host running the SAME demo
// envelope + dispatch. Per docs/specs/e2e-test-battery-review.md R13:
// "assert primarily on census + node_state + SSR fragment (shim-stable); treat
// live-DOM innerHTML substring asserts as secondary."
//
// Run: npm run build && node scripts/electron-divergence.mjs
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createHash } from 'node:crypto'
import { realpathSync, writeFileSync } from 'node:fs'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
// §2.1 item 1 (ci-ui-leg.md) — the TWO spawn sites below are now calls into the
// shared helper. The base argument vector, the env pair, the stdio wiring and
// the cwd are byte-identical to the landed spawn; the fresh scratch profiles
// (and their best-effort cleanup on `process.on('exit')`) live in the helper.
// F-1 (adversarial, 2026-09-27) — the two profile creations use the helper's
// PROFILE-ONLY call `makeFreshProfile`: `spawnProfile` SPAWNS a child and
// returns it, so using it here left an undrained, unreferenced Electron process
// per site AND made this leg boot FOUR Electron processes instead of TWO. Each
// profile below is now spawned exactly ONCE (§2.1 item 1's pinned behaviour).
import { baseArgs, electronBin, mainCjs, makeFreshProfile, repoRoot, spawnElectron, stdioWiringJson } from './electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const batteryHost = join(here, '..', 'dist', 'main', 'battery-host.mjs')

// ===========================================================================
// THE `H-r10` EXTENSION — THE PURE HALF (importable, side-effect-free).
// Contract: the AMENDMENT BLOCK of docs/specs/ci-divergence-leg.md
// (`U-DIVERGENCE-EXT`):
//   A-1.1/A-1.4/A-1.5  `scenarioEnvelope(kind)` — ONE resolution per run, a
//                      closed set of TWO kinds ('demo' / 'props-falsy-toggle')
//   A-1.6              the canonical digest of that ONE resolution
//   A-2.2/A-2.3/A-2.4  the set-wise attribute-NAME extractor (the valued form
//                      `name="…"` AND the bare form `name` are ONE presence
//                      fact), with the pinned normalization and the RAW form
//                      recorded beside the normalized one
//   A-2.5/A-2.6        set equality + the symmetric difference BY NAME
//   A-2.8              this half is exercised in the node suite against FIXED
//                      LITERAL HTML (tests/divergence-attribute-extractor.test.ts)
// THE MAIN-MODULE GUARD at the foot of this file is what makes that import
// possible: importing this module runs NO leg (no spawn, no client, no read).
// ===========================================================================

/** A-1.5 — the PINNED closed kind set. A third kind is a new contract row, never
 *  a free choice: `scenarioEnvelope` refuses anything else, loudly. */
export const SCENARIO_KINDS = Object.freeze(['demo', 'props-falsy-toggle'])
/** A-4.5 — the pinned `N` the leg self-checks against a LITERAL (never a moving
 *  number), so a later pass that routes a new assertion through `ok(...)` turns
 *  the leg red instead of silently moving the count every tracker quotes. */
export const PINNED_CHECKS = 9
/** A-2.2/A-2.4 — the attribute-name fold this leg RECORDS AND USES (identically on
 *  both sides). `lower` is the case-insensitive fold HTML attribute names admit;
 *  `node#` is the harness's own `norm()` token rule (`/node-\d+/g` → `node#`),
 *  which A-2.4 applies to attribute VALUES and to the NAME set only when it
 *  cannot collapse two distinct names into one (A-2.4(iii)). */
export const ATTRIBUTE_NAME_FOLD = 'lower+node#'
/** A-3.1 — the pinned boolean member the falsy-toggle scenario toggles (the member
 *  the engine's closed set admits at the installed pin). A second named member
 *  (`readonly`) may be added ONLY as its own row, never as this row's substitute. */
export const FALSY_TOGGLE_MEMBER = 'inert'
/** A-3 — the scenario's own authored node ids (its target and its two write
 *  drivers), exported so a row can address them without re-deriving a literal. */
export const FALSY_TOGGLE_TARGET_ID = 'falsy-target'
export const FALSY_TOGGLE_OFF_ID = 'falsy-off'
export const FALSY_TOGGLE_REMOVE_ID = 'falsy-remove'

/** A-3.2(a) — THE FALSY OFF WRITE, as an authored handler body (A-3.3: the write is
 *  engine-applied in BOTH hosts' realms because it is DRIVEN, never simulated).
 *  `false` is the engine's OFF form (the truthiness rule treats
 *  `false`/`0`/`'0'`/`'false'`/`''`/`null`/`undefined` as OFF). */
const FALSY_TOGGLE_OFF_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === '${FALSY_TOGGLE_TARGET_ID}'; });
  if (!node) return;
  ctx.clientAPI.apply(node.id, [{ targetProp: 'props.${FALSY_TOGGLE_MEMBER}', mode: 'replace', value: false }]);
}`
/** A-3.2(b) — THE REMOVAL PATH, as an authored handler body: a NULLISH write on
 *  the `props.<member>` spelling, which the pin unit's ruling 1 makes a legitimate
 *  REMOVAL that is APPLIED (`docs/specs/engine-pin.md` §3.4 `PA-1`/`PA-4`). A bare
 *  name and the `css:<key>` colon twin are ALLOWED but INERT and are NEVER the
 *  spelling that proves a removal (`PA-9`/`PA-10`) — so this body uses neither. */
const FALSY_TOGGLE_REMOVE_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === '${FALSY_TOGGLE_TARGET_ID}'; });
  if (!node) return;
  ctx.clientAPI.apply(node.id, [{ targetProp: 'props.${FALSY_TOGGLE_MEMBER}', mode: 'replace', value: undefined }]);
}`

/** A-3 — the `'props-falsy-toggle'` scenario envelope (A-1.5's second kind). The
 *  target carries the boolean member in its ON form (`props.inert: 'true'`, the
 *  authored string form the pin unit's `R-1`/`R-3` rows prove is emitted), and the
 *  two buttons below it are the scenario's own nodes whose authored handler bodies
 *  perform A-3.2's two writes. THIS IS DATA: no UI, no control, no styling is
 *  authored here (the block's §0 prohibition 2 stays vacuous). */
function propsFalsyToggleEnvelope() {
  return {
    template: {
      root: {
        type: 'div',
        css: { id: 'falsy-root', classes: ['falsy-shell'] },
        children: [
          {
            type: 'div',
            css: { id: FALSY_TOGGLE_TARGET_ID, classes: ['falsy-target'] },
            props: { id: FALSY_TOGGLE_TARGET_ID, [FALSY_TOGGLE_MEMBER]: 'true' },
            content: 'boolean member',
          },
          {
            type: 'button',
            css: { id: FALSY_TOGGLE_OFF_ID, classes: ['btn'] },
            content: 'OFF',
            handlers: [{ name: FALSY_TOGGLE_OFF_ID, event: 'click', body: FALSY_TOGGLE_OFF_BODY }],
          },
          {
            type: 'button',
            css: { id: FALSY_TOGGLE_REMOVE_ID, classes: ['btn'] },
            content: 'REMOVE',
            handlers: [{ name: FALSY_TOGGLE_REMOVE_ID, event: 'click', body: FALSY_TOGGLE_REMOVE_BODY }],
          },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

/** A-1.1 — THE SCENARIO-ENVELOPE CHANNEL'S ENTRY POINT: one function, called
 *  IDENTICALLY on both legs, returning the envelope object the leg will load.
 *  A-1.4 is a clause about the CALLER: the leg resolves it ONCE PER RUN and hands
 *  the SAME object to both hosts (resolving twice is a contract violation). */
export function scenarioEnvelope(kind) {
  if (!SCENARIO_KINDS.includes(kind)) {
    throw new Error(
      `scenarioEnvelope: unknown kind ${JSON.stringify(kind)} — the closed set is ` +
        `${SCENARIO_KINDS.map((k) => `'${k}'`).join(', ')} (A-1.5: a third kind is a new contract row, never a free choice)`,
    )
  }
  if (kind === 'demo') return demoEnvelope()
  return propsFalsyToggleEnvelope()
}

/** A-1.6 — the PINNED canonicalization of a resolved envelope: `JSON.stringify` of
 *  the object, taken ONCE from the single resolution and recorded for each host. */
export function envelopeDigest(envelope) {
  return JSON.stringify(envelope)
}

/** The attribute regions of every OPEN tag in `html` (a comment, a doctype, a
 *  processing instruction and a closing tag carry no attributes and are skipped;
 *  a `>` inside a quoted value does not end the tag). TOTAL: a non-string input is
 *  treated as empty, and every loop is bounded by the input's own length. */
function tagAttributeRegions(html) {
  const source = typeof html === 'string' ? html : ''
  const regions = []
  let i = 0
  while (i < source.length) {
    const lt = source.indexOf('<', i)
    if (lt === -1) break
    if (source.startsWith('<!--', lt)) {
      const end = source.indexOf('-->', lt + 4)
      i = end === -1 ? source.length : end + 3
      continue
    }
    let quote = ''
    let gt = -1
    for (let k = lt + 1; k < source.length; k += 1) {
      const c = source[k]
      if (quote !== '') {
        if (c === quote) quote = ''
        continue
      }
      if (c === '"' || c === "'") {
        quote = c
        continue
      }
      if (c === '>') {
        gt = k
        break
      }
    }
    if (gt === -1) break
    const body = source.slice(lt + 1, gt)
    if (body[0] !== '/' && body[0] !== '!' && body[0] !== '?') {
      // The tag NAME is not an attribute: strip it, keep the attribute region.
      const nameEnd = /^[^\s/>]*/.exec(body)[0].length
      regions.push(body.slice(nameEnd))
    }
    i = gt + 1
  }
  return regions
}

/** The attribute entries of ONE tag's attribute region: `{name, value}`, where a
 *  BARE name (`inert`, no `=`) answers `value: null`. Both the valued and the bare
 *  forms are A-2.3's ONE presence fact — that is this extractor's whole point. */
function parseTagAttributes(region) {
  const out = []
  let i = 0
  while (i < region.length) {
    const before = i
    // Whitespace separates attributes, and a `/` is the SELF-CLOSING marker (it is
    // not part of any name) — both are skipped before a name is read.
    while (i < region.length && /[\s/]/.test(region[i])) i += 1
    if (i >= region.length) break
    const start = i
    while (i < region.length && !/[\s=/>]/.test(region[i])) i += 1
    const name = region.slice(start, i)
    while (i < region.length && /\s/.test(region[i])) i += 1
    let value = null
    if (region[i] === '=') {
      i += 1
      while (i < region.length && /\s/.test(region[i])) i += 1
      const quote = region[i]
      if (quote === '"' || quote === "'") {
        const close = region.indexOf(quote, i + 1)
        const stop = close === -1 ? region.length : close
        value = region.slice(i + 1, stop)
        i = stop + 1
      } else {
        const from = i
        while (i < region.length && !/[\s>]/.test(region[i])) i += 1
        value = region.slice(from, i)
      }
    }
    if (name !== '') out.push({ name, value })
    // TOTALITY (A-2.2: the extractor never hangs and never throws on an odd tag):
    // every pass through this loop makes progress, whatever the bytes are.
    if (i === before) i += 1
  }
  return out
}

/** A-2.4 — the NAME fold: case-insensitive always, plus the `node-\d+` token rule
 *  when (and only when) applying it cannot collapse two distinct names into one
 *  (A-2.4(iii)); the refusal is recorded, never silent. */
function foldAttributeNames(rawNames, fold) {
  const folded = fold.includes('lower') ? rawNames.map((n) => n.toLowerCase()) : [...rawNames]
  if (!fold.includes('node#')) return { names: folded, tokenRule: 'not part of the recorded fold' }
  const tokenized = folded.map((n) => n.replace(/node-\d+/g, 'node#'))
  const collapsed = new Set(folded).size !== new Set(tokenized).size
  return {
    names: collapsed ? folded : tokenized,
    tokenRule: collapsed ? 'REFUSED for the name set (it would collapse distinct names, A-2.4(iii))' : 'applied',
  }
}

/** A-2.4(ii) — the same token rule inside an attribute VALUE that carries a minted
 *  id. The RAW value is kept beside the normalized one (A-2.4(iii): *"a row that
 *  records only the normalized form is not evidence"*). */
function normalizeAttributeValue(value, fold) {
  if (value === null || !fold.includes('node#')) return value
  return value.replace(/node-\d+/g, 'node#')
}

/** **A-2.2 — THE EXTRACTOR: `renderedHtml` → the SET of attribute NAMES present.**
 *  It is a SET (never a string, never a sorted string, never a count); the bare and
 *  the valued forms are one fact (A-2.3); every attribute name it sees is returned
 *  BOTH raw (A-2.4(iii)) and folded, and the fold it used is part of the answer.
 *  TOTAL: a missing / non-string / odd input answers an EMPTY extraction
 *  (`missing: true`), never a throw and never a fabricated name. */
export function extractAttributeNames(html, options = {}) {
  const fold = options.fold ?? ATTRIBUTE_NAME_FOLD
  if (typeof html !== 'string') {
    return { fold, missing: true, raw: [], names: new Set(), entries: [], tokenRule: 'no input to fold' }
  }
  const entries = []
  for (const region of tagAttributeRegions(html)) {
    for (const attribute of parseTagAttributes(region)) {
      entries.push({
        name: attribute.name,
        value: attribute.value,
        valueNormalized: normalizeAttributeValue(attribute.value, fold),
      })
    }
  }
  const raw = []
  for (const entry of entries) if (!raw.includes(entry.name)) raw.push(entry.name)
  const foldedNames = foldAttributeNames(raw, fold)
  return {
    fold,
    missing: false,
    raw,
    names: new Set(foldedNames.names),
    entries,
    tokenRule: foldedNames.tokenRule,
  }
}

/** **A-2.5/A-2.6 — SET EQUALITY, and the symmetric difference BY NAME.** The three
 *  sub-verdicts `|A| === |B|` / `A ⊇ B` / `B ⊇ A` are reported separately (a
 *  count-only or substring comparison is forbidden by the contract), and BOTH
 *  directions of the difference are named. TOTAL: a non-iterable side answers an
 *  empty set rather than throwing. */
export function attributeSetDifference(a, b) {
  const toSet = (side) => {
    try {
      return new Set(side ?? [])
    } catch {
      return new Set()
    }
  }
  const left = toSet(a)
  const right = toSet(b)
  const onlyInA = [...left].filter((name) => !right.has(name)).sort()
  const onlyInB = [...right].filter((name) => !left.has(name)).sort()
  return {
    sizeA: left.size,
    sizeB: right.size,
    sameSize: left.size === right.size,
    aContainsB: onlyInA.length === 0,
    bContainsA: onlyInB.length === 0,
    onlyInA,
    onlyInB,
    equal: onlyInA.length === 0 && onlyInB.length === 0,
  }
}

let failures = 0
let checks = 0
function ok(label, cond, extra = '') {
  checks += 1
  if (cond) console.log(`  ✓ ${label}${extra ? ` (${extra})` : ''}`)
  else {
    failures += 1
    console.error(`  ✗ ${label}${extra ? ` (${extra})` : ''}`)
  }
}
async function call(client, name, args = {}) {
  const r = await client.callTool({ name, arguments: args })
  return JSON.parse(r.content[0].text)
}

// The SAME demo envelope both hosts bootstrap — DERIVED, never restated.
//
// FIXTURE-ONLY UPDATE (architect ruling, docs/decisions.md: "Divergence is
// fundamentally a testing tool, include it in the update scope"; the N = 9
// check set, the spawn discipline, the {0,1,2,3} exit-code contract and the
// honest-limits prose are NOT touched by it). This function used to carry a
// HAND-COPIED 12-node literal ("12 nodes: root + h1 + counter-card + …") while
// `src/shared/demo-envelope.ts` grew to 18 nodes with its authored gutter card —
// so the SHIM booted a different app than the REAL one and the leg read
// `census inTree matches (shim = real) (electron=18 shim=12)` plus four more
// failures. THE FIX IS DERIVATION, NOT A BIGGER LITERAL: the ONE source of
// truth is the authored envelope the renderer itself bootstraps
// (`src/shared/demo-envelope.ts`'s exported `demoEnvelope()`), imported here
// directly. A drift is therefore IMPOSSIBLE BY CONSTRUCTION — there is no
// second copy left to fall out of step — which is the stronger form of the
// "a check that fails loudly when they drift" requirement.
//
// WHY THE DIRECT `.ts` IMPORT IS SAFE: Node >= 22.18 (this repo runs v24) strips
// types from a directly-imported `.ts` module by default, and the authored file
// is type-annotation-only TypeScript (no `enum`, no parameter properties, no
// non-erasable syntax) — verified by running this very leg. The authored module
// imports NOTHING, so the specifier resolves with no extra loader or flag.
import { demoEnvelope } from '../src/shared/demo-envelope.ts'

// ---- collect one host's (census, ssr, dirtied, renderedIdSet) --------------
// NOTE: minted node ids are not a parity surface — the shim battery host is
// mandated to boot root-only (C3) then `provident.load` the demo, so its
// minted ids are offset by the root-only boot relative to the real app (which
// boots the demo directly). R13 compares STRUCTURAL surfaces (census, SSR,
// node count, counter content, non-empty dispatch) and normalizes minted ids
// (`node-N` → `node#`) so the check is id-offset-agnostic.
function norm(s) {
  return String(s).replace(/node-\d+/g, 'node#')
}
async function drive(client) {
  const initial = await call(client, 'provident.get_rendered_html', {})
  const d = await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'inc' }, event: 'click' })
  const after = await call(client, 'provident.get_rendered_html', {})
  const list = await call(client, 'provident.list_targets', {})
  return {
    census: initial.census,
    ssr: norm(initial.ssrHtml),
    dirtied: norm(JSON.stringify(d.dirtied)),
    resultsNonEmpty: Array.isArray(d.results) && d.results.length > 0,
    dataNodeIds: norm((after.renderedHtml.match(/data-node-id="([^"]+)"/g) ?? []).sort().join(' ')),
    renderedNonEmpty: (after.renderedHtml.match(/data-node-id="([^"]+)"/g) ?? []).length > 0,
    counterPresent: after.renderedHtml.includes('counter'),
    nodeIds: norm(list.nodes.map((n) => n.nodeId).sort().join('|')),
  }
}

// ===========================================================================
// THE `H-r10` EXTENSION — THE RUN'S OWN HALF (the tally, the channel, the
// attribute-presence comparison points of A-3).
// ===========================================================================

/** The TWO runs this leg performs, each resolved EXACTLY ONCE (A-1.4): the
 *  identity run keeps the pinned `N = 9` surfaces on the demo envelope (A-5.4),
 *  and the extension run drives the `props` falsy-toggle scenario (A-3). */
const IDENTITY_KIND = 'demo'
const EXTENSION_KIND = 'props-falsy-toggle'

/** A-1.2 — THE SCRATCH SECURITY STORE THE CHANNEL NEEDS. `provident.load` lives in
 *  the `graph` group, which is OFF by default (`src/main/security-store.ts`), so a
 *  scratch profile is seeded with the SAME group set the `ui` leg's own scratch
 *  store already uses (`docs/specs/ci-ui-leg.md` §3.2: `read` + `dispatch` + the
 *  `graph` group the load tool lives in + `code`). This is an OPERATOR-EQUIVALENT
 *  action on a THROWAWAY file inside the leg's own fresh scratch profile — it
 *  changes NO default, persists nothing, and never touches the operator's profile
 *  (the block's §0 prohibition 3/4 and A-6.6 stay satisfied). */
const SCRATCH_GROUPS = ['read', 'dispatch', 'graph', 'code']
function driveProfile() {
  const profile = makeFreshProfile('provident-r13-drive')
  writeFileSync(join(profile, 'provident-security.json'), JSON.stringify({ token: null, enabled: SCRATCH_GROUPS }, null, 2))
  return profile
}

/** **A-4.3 — THE EXTENSION TALLY, SEPARATE FROM THE PINNED ONE.** Every extension
 *  check prints its own labelled `[EXT]` line; extension failures accumulate in
 *  their OWN counter, which the leg's exit condition OR-s with the pinned failures.
 *  `[EXT]` checks are NEVER counted in `checks`, so `N = 9` cannot move (A-4.2). */
let extChecks = 0
let extFailures = 0
function ext(label, cond, extra = '') {
  extChecks += 1
  if (cond) console.log(`  ✓ ${label}${extra ? ` (${extra})` : ''}`)
  else {
    extFailures += 1
    console.error(`  ✗ ${label}${extra ? ` (${extra})` : ''}`)
  }
}

/** **A-1.6 — THE INSTRUMENT-ERROR STATE.** `ENVELOPE-MISMATCH` is NOT a divergence
 *  verdict: when it is set the leg names it, runs NO surface comparison of A-2 and
 *  exits 1 (a surface difference between two hosts that ran DIFFERENT scenarios is
 *  meaningless). The first cause is the one reported. */
let channelError = null
function channelFail(detail) {
  if (channelError === null) channelError = detail
}

/** The canonicalization A-1.6 pins is `JSON.stringify` of the resolved envelope.
 *  It is compared VERBATIM; this label is only how it is recorded legibly (its
 *  length, a sha256 prefix and its head), so the printout can never be mistaken for
 *  the comparison itself. */
function digestLabel(digest) {
  const hash = createHash('sha256').update(String(digest)).digest('hex')
  return `len=${String(digest).length} sha256=${hash.slice(0, 16)} head=${JSON.stringify(String(digest).slice(0, 64))}`
}

/** A-1.2/A-1.3 + A-1.6 — hand the ONE resolved envelope to ONE host over the
 *  EXISTING `provident.load`, then make that host REPORT the envelope it holds
 *  (`provident.code.get` at the root path — read-only, an EXISTING tool) and
 *  compare what it reports against the digest of the single resolution. A load
 *  that throws, or a report that differs, is set as an `ENVELOPE-MISMATCH` cause. */
async function channelHandoff(client, host, kind, envelope, digest) {
  console.log(`  · envelope handed to the ${host} leg — kind='${kind}', digest(${digestLabel(digest)})`)
  let loaded = null
  try {
    loaded = await call(client, 'provident.load', { kind: 'envelope', envelope })
  } catch (e) {
    channelFail(`${host}: the resolved '${kind}' envelope could NOT be loaded over \`provident.load\` — ${e instanceof Error ? e.message : String(e)}`)
    return false
  }
  console.log(`  · ${host} load reported census inTree=${loaded?.census?.inTree} registered=${loaded?.census?.registered}`)
  let reported = null
  try {
    reported = await call(client, 'provident.code.get', { path: '' })
  } catch (e) {
    channelFail(`${host}: the host did not report the envelope it was given (\`provident.code.get\` failed) — ${e instanceof Error ? e.message : String(e)}`)
    return false
  }
  const reportedDigest = envelopeDigest(reported?.value)
  const agrees = reportedDigest === digest
  console.log(`  · ${host} reports the envelope it holds — digest ${agrees ? 'IDENTICAL to the handed one' : 'DIFFERENT'} (${digestLabel(reportedDigest)})`)
  if (!agrees) {
    channelFail(
      `${host}: the envelope the host reports differs from the ONE resolved envelope it was handed (A-1.6). ` +
        `handed head=${JSON.stringify(String(digest).slice(0, 200))} reported head=${JSON.stringify(String(reportedDigest).slice(0, 200))}`,
    )
  }
  return agrees
}

/** A-2.1 — one leg's extraction at one point: `renderedHtml` as returned by
 *  `provident.get_rendered_html` (the SAME surface the harness already reads — no
 *  new surface, no private read). `null` means the leg did NOT produce a reading
 *  (no client, a failed call, a non-string field), which A-6.5 `EXT-F3` requires to
 *  be reported as MISSING — never as an empty set, because an empty set would
 *  silently PASS an absence comparison (a fabricated pass). */
async function extractedFrom(client) {
  if (client === null) return null
  try {
    const result = await call(client, 'provident.get_rendered_html', {})
    if (typeof result?.renderedHtml !== 'string') return null
    return extractAttributeNames(result.renderedHtml)
  } catch {
    return null
  }
}

/** A-3.4/A-3.5/A-3.6 — ONE extraction point, recorded for BOTH legs at the SAME
 *  point: the set-wise comparison (A-2.5/A-2.6) AND that point's declared presence
 *  fact. Both halves are one labelled `[EXT]` line; the two RAW sets and the
 *  symmetric difference by name are printed beside it (A-2.4(iii)/A-2.6). */
function reportAttributePoint(point, label, expectation, real, shim) {
  if (real === null || shim === null) {
    const missing = [real === null ? 'the real Electron leg' : null, shim === null ? 'the shim battery host' : null].filter((x) => x !== null)
    ext(
      `[EXT] ${point} (${label}): both legs produced an extraction`,
      false,
      `MISSING: ${missing.join(' + ')} produced NO reading at ${point} — reported MISSING, never as an empty set (A-6.5 EXT-F3)`,
    )
    return
  }
  const difference = attributeSetDifference(real.names, shim.names)
  const presenceOf = (side) => (side.names.has(FALSY_TOGGLE_MEMBER) ? 'present' : 'absent')
  const realPresence = presenceOf(real)
  const shimPresence = presenceOf(shim)
  const presenceHolds = expectation === 'present'
    ? realPresence === 'present' && shimPresence === 'present'
    : realPresence === 'absent' && shimPresence === 'absent'
  console.log(`      ${point} raw set (real)=[${real.raw.join(' ')}]`)
  console.log(`      ${point} raw set (shim)=[${shim.raw.join(' ')}]`)
  console.log(`      ${point} folded set (${real.fold}) (real)=[${[...real.names].sort().join(' ')}] (shim)=[${[...shim.names].sort().join(' ')}]`)
  if (!difference.equal) {
    console.log(`      ATTRIBUTE-SET-DIFFERENCE ${point}: only-on-real=[${difference.onlyInA.join(' ')}] only-on-shim=[${difference.onlyInB.join(' ')}] — raw sets above (A-2.6)`)
  }
  ext(
    `[EXT] ${point} (${label}): set equality on both legs AND '${FALSY_TOGGLE_MEMBER}' ${expectation} on both`,
    difference.equal && presenceHolds,
    `|real|=${difference.sizeA} |shim|=${difference.sizeB} sameSize=${difference.sameSize} real-includes-shim=${difference.aContainsB} shim-includes-real=${difference.bContainsA} ` +
      `difference(real-shim)=[${difference.onlyInA.join(' ')}] difference(shim-real)=[${difference.onlyInB.join(' ')}] presence(real=${realPresence} shim=${shimPresence} expected=${expectation})`,
  )
}

/** A-3.3 — drive ONE authored handler on the scenario's own node in BOTH hosts'
 *  realms over the EXISTING `provident.dispatch`. A host that cannot be driven is
 *  reported (its write did not happen), never skipped silently. */
async function dispatchInBothHosts(hosts, cssId, event) {
  for (const [host, client] of hosts) {
    if (client === null) {
      console.log(`      ${cssId}: NOT dispatched on the ${host} leg — no client (the leg did not connect)`)
      continue
    }
    try {
      await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId }, event })
      console.log(`      ${cssId}: dispatched on the ${host} leg`)
    } catch (e) {
      console.log(`      ${cssId}: dispatch FAILED on the ${host} leg — ${e instanceof Error ? e.message : String(e)}`)
    }
  }
}

/** **A-3 — THE `props` FALSY-TOGGLE SCENARIO, RUN ON BOTH HOSTS.** The ONE resolved
 *  scenario envelope is loaded into both hosts through the channel (A-1.3), then the
 *  three A-3.4 extraction points are taken at the SAME points on both legs: P1 after
 *  the load (the ON state), P2 after the falsy OFF write, P3 after the nullish
 *  removal write. Each point is ONE set-wise comparison (A-3.4) carrying that
 *  point's declared presence fact (A-3.5). */
async function runExtensionPhase(realClient, shimClient, envelope, digest) {
  const hosts = [
    ['real Electron', realClient],
    ['shim battery host', shimClient],
  ]
  console.log(`\n--- [EXT] the '${EXTENSION_KIND}' scenario on BOTH hosts (A-3) ---`)
  console.log(`  · attribute-name fold: ${ATTRIBUTE_NAME_FOLD} — applied IDENTICALLY on both sides; the raw (pre-normalization) set is recorded beside the folded one (A-2.4(iii))`)
  const realHandoff = realClient === null ? false : await channelHandoff(realClient, 'real Electron', EXTENSION_KIND, envelope, digest)
  const shimHandoff = shimClient === null ? false : await channelHandoff(shimClient, 'shim battery host', EXTENSION_KIND, envelope, digest)
  if (!realHandoff || !shimHandoff) {
    // A-1.6 — an instrument error in THIS run: the comparison of A-2 never runs,
    // and the three points are reported UN-RUN (a failure, never a pass).
    console.error(`\n✗ ENVELOPE-MISMATCH (A-1.6 / EXT-F1 — AN INSTRUMENT ERROR, NOT A DIVERGENCE VERDICT): ${channelError ?? 'a host did not report the envelope it was given'}`)
    console.error('  the A-2 comparison NEVER RUNS for this scenario (a difference between two hosts that ran different scenarios is meaningless);')
    for (const point of ['P1', 'P2', 'P3']) {
      ext(`[EXT] ${point}: not run`, false, 'NOT RUN — ENVELOPE-MISMATCH (A-1.6); an un-run point is reported as a failure, never as a pass')
    }
    return
  }
  const real1 = await extractedFrom(realClient)
  const shim1 = await extractedFrom(shimClient)
  reportAttributePoint('P1', 'ON, after the scenario load and before any write', 'present', real1, shim1)

  await dispatchInBothHosts(hosts, FALSY_TOGGLE_OFF_ID, 'click')
  const real2 = await extractedFrom(realClient)
  const shim2 = await extractedFrom(shimClient)
  reportAttributePoint('P2', `after the FALSY props.${FALSY_TOGGLE_MEMBER} OFF write`, 'absent', real2, shim2)

  await dispatchInBothHosts(hosts, FALSY_TOGGLE_REMOVE_ID, 'click')
  const real3 = await extractedFrom(realClient)
  const shim3 = await extractedFrom(shimClient)
  reportAttributePoint('P3', `after the nullish props.${FALSY_TOGGLE_MEMBER} removal write`, 'absent', real3, shim3)
}

// ---- THE RUN (only when this file is the entry point: see the guard below) --
async function main() {
  console.log('\nR13 — REAL-ELECTRON vs DOM-SHIM DIVERGENCE CHECK')
  console.log('================================================')

  // ---- THE CHANNEL, RESOLVED ONCE PER RUN (A-1.1/A-1.4/A-1.5) ----------------
  // Each scenario envelope is resolved EXACTLY ONCE, here, and the SAME object is
  // handed to BOTH hosts: this run's identity envelope (the pinned `N = 9`
  // surfaces, A-5.4) and the extension run's `props` falsy-toggle scenario (A-3).
  // The digest A-1.6 pins is taken ONCE from that single resolution and is what
  // each host's own report-back is verified against below.
  const identityEnvelope = scenarioEnvelope(IDENTITY_KIND)
  const identityDigest = envelopeDigest(identityEnvelope)
  const extensionEnvelope = scenarioEnvelope(EXTENSION_KIND)
  const extensionDigest = envelopeDigest(extensionEnvelope)
  console.log(`\n--- the H-r10 scenario-envelope channel (A-1) ---`)
  console.log(`  · identity run kind='${IDENTITY_KIND}' (the pinned N = ${PINNED_CHECKS} surfaces) · extension run kind='${EXTENSION_KIND}' (A-3)`)
  console.log(`  · one resolution per run (A-1.4); the pinned canonicalization is JSON.stringify of the resolved object (A-1.6):`)
  console.log(`      '${IDENTITY_KIND}'  ${digestLabel(identityDigest)}`)
  console.log(`      '${EXTENSION_KIND}' ${digestLabel(extensionDigest)}`)

  // ---- leg 1: real Electron app (real DOM) over stdio -----------------------
  // Hermetic profile + sandbox-safe Chromium flags (ci-divergence-leg.md §1's
  // isolation clause; both flags are REQUIRED where /dev/shm is unavailable —
  // Chromium dies SIGTRAP during browser init otherwise, GPU-cache writes into
  // the operator's profile are denied, and the run is not hermetic). Neither flag
  // changes the app under test: `--disable-dev-shm-usage` moves Chromium's shared
  // memory to /tmp, and each spawn gets a fresh scratch user-data dir.
  //
  // THE LANDED VECTOR, byte-identical (ci-ui-leg.md §2.1 item 1 / PRE-4), and the
  // member the shared helper supplies verbatim in `baseArgs`:
  //   [mainCjs, '--mcp-transport=stdio', '--no-sandbox', '--disable-gpu',
  //    '--disable-software-rasterizer', '--in-process-gpu', '--ozone-platform=x11',
  //    '--disable-dev-shm-usage']  +  `--user-data-dir=<fresh scratch>` per spawn
  // The helper (scripts/electron-spawn.mjs, §2.1) owns the vector, the env pair,
  // the stdio wiring, the cwd and the two scratch profiles; this leg passes the
  // profile, byte-for-byte as before. F-1: the profile is CREATED here (profile
  // only, no child) and the ONE child that uses it is spawned on the next line.
  // `driveProfile` (below) is that same PROFILE-ONLY creator PLUS the scratch
  // security-store seed the channel needs: `provident.load` lives in the `graph`
  // group, which is OFF by default, so the profile this leg drives the app under
  // carries the seeded store (A-1.2) — never a default, never the operator's.
  const profileA = makeFreshProfile('provident-r13-app')

  console.log('\n--- real Electron (real DOM) ---')
  const electron = spawnElectron([`--user-data-dir=${profileA}`]).child
  electron.stdout.resume()
  let estderr = ''
  electron.stderr.on('data', (d) => {
    estderr += String(d)
    if (estderr.includes('MCP') || estderr.includes('ready') || estderr.includes('error') || estderr.includes('fatal')) console.error('[electron] ' + String(d).trim())
  })
  const profileB = driveProfile()
  const eTransport = new StdioClientTransport({
    command: electronBin,
    args: [...baseArgs, `--user-data-dir=${profileB}`],
    // The landed wiring, byte-identical (`stdio: ['pipe','pipe','pipe']` in the
    // helper's `stdioWiring`): parsed here so this leg carries no second copy.
    stdio: JSON.parse(stdioWiringJson),
    cwd: root,
    env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1' },
  })
  const eClient = new Client({ name: 'r13-electron', version: '0.1.0' })
  let electronOut
  try {
    await eClient.connect(eTransport)
    // A-1.2 — the resolved identity envelope is delivered to the BOOTED app over
    // the EXISTING MCP tool surface `provident.load {kind:'envelope', envelope}`
    // (no new tool, no new group, no new RPC method), and the app is then asked to
    // REPORT the envelope it holds, which is A-1.6's second half.
    await channelHandoff(eClient, 'real Electron', IDENTITY_KIND, identityEnvelope, identityDigest)
    electronOut = await drive(eClient)
    ok('electron: dispatch renderedNonEmpty', electronOut.renderedNonEmpty === true)
  } catch (e) {
    failures += 1
    console.error(`  ✗ electron connect/drive failed: ${e.message}`)
    electronOut = null
  }

  // ---- leg 2: DOM-shim battery host (same demo + dispatch) -------------------
  console.log('\n--- DOM-shim battery host (same demo) ---')
  const shimTransport = new StdioClientTransport({ command: process.execPath, args: [batteryHost, '--mcp-transport=stdio'] })
  const shimClient = new Client({ name: 'r13-shim', version: '0.1.0' })
  await shimClient.connect(shimTransport)
  // the battery host boots root-only; hand it the SAME resolved envelope object the
  // real app was handed (A-1.3/A-1.4), by the SAME shape, and verify its report-back
  await channelHandoff(shimClient, 'shim battery host', IDENTITY_KIND, identityEnvelope, identityDigest)
  const shimOut = await drive(shimClient)

  // ---- A-1.6: an instrument error means NO surface comparison runs ------------
  if (channelError !== null) {
    console.error(`\n✗ ENVELOPE-MISMATCH (A-1.6 / EXT-F1 — AN INSTRUMENT ERROR, NOT A DIVERGENCE VERDICT): ${channelError}`)
    console.error('  The comparison of A-2 NEVER RUNS for this run and NO divergence may be reported from it: a surface difference')
    console.error('  between two hosts that ran DIFFERENT scenarios is meaningless. No `R13 RESULT` line is printed, so this run')
    console.error('  cannot be read as a green leg (and the ui leg\'s precondition cannot read it as one either). Exiting 1.')
    await shimClient.close()
    try { await eClient.close() } catch { /* already closed */ }
    try { electron.kill('SIGKILL') } catch { /* already gone */ }
    process.exit(1)
  }

  // ---- compare the shim-stable surfaces ---------------------------------------
  console.log('\n--- divergence comparison ---')
  if (electronOut) {
    ok('census inTree matches (shim = real)', shimOut.census.inTree === electronOut.census.inTree, `electron=${electronOut.census.inTree} shim=${shimOut.census.inTree}`)
    ok('census registered matches', shimOut.census.registered === electronOut.census.registered, `electron=${electronOut.census.registered} shim=${shimOut.census.registered}`)
    ok('dirtied ids match (normalized)', shimOut.dirtied === electronOut.dirtied, `electron=${electronOut.dirtied} shim=${shimOut.dirtied}`)
    ok('SSR fragment matches (structural)', shimOut.ssr === electronOut.ssr)
    ok('data-node-id set matches (structural)', shimOut.dataNodeIds === electronOut.dataNodeIds)
    ok('nodeId vocabulary matches (structural)', shimOut.nodeIds === electronOut.nodeIds)
    ok('counter increment rendered in BOTH', shimOut.counterPresent && electronOut.counterPresent)
    ok('dispatch results non-empty in BOTH (R7)', shimOut.renderedNonEmpty !== false && electronOut.renderedNonEmpty !== false)
  } else {
    ok('electron leg produced a result', false, 'electron failed to bootstrap')
  }

  // ---- the H-r10 extension phase (A-3): the `props` falsy-toggle scenario -----
  // It runs AFTER the pinned comparisons (whose surfaces are the identity run's)
  // and BEFORE the teardown, because its writes must be engine-applied in BOTH
  // hosts' realms. A host that never connected is passed as `null` and is reported
  // MISSING at every point (A-6.5 EXT-F3), never skipped silently.
  await runExtensionPhase(electronOut === null ? null : eClient, shimClient, extensionEnvelope, extensionDigest)

  await shimClient.close()
  try { await eClient.close() } catch { /* already closed */ }
  try { electron.kill('SIGKILL') } catch { /* already gone */ }

  // ---- A-4.5 — THE PINNED-COUNT SELF-CHECK (an EXTENSION check, never `ok`) ---
  // The extension asserts the pinned tally against the LITERAL `PINNED_CHECKS`, so a
  // later pass that routes a new assertion through `ok(...)` turns the leg RED here
  // instead of silently moving `N`. The off-green branch keeps its own recorded
  // arithmetic (A-4.4: `1 checks, 2 failures` when the electron leg did not
  // bootstrap) — a pin-drift report there would be a false alarm, so the branch
  // asserts the off-green signature's OWN count instead.
  const offGreen = electronOut === null
  ext(
    `A-4.5 pin self-check: the pinned tally is exactly ${PINNED_CHECKS} on a comparison-stage run (off-green branch: the recorded 1-check signature)`,
    offGreen ? checks === 1 : checks === PINNED_CHECKS,
    `checks=${checks} pinned=${PINNED_CHECKS} branch=${offGreen ? 'off-green (electron leg did not bootstrap, A-4.4)' : 'comparison stage'}`,
  )

  console.log(`\nEXT RESULT: ${extChecks} extension checks, ${extFailures} extension failures (NOT counted in the pinned N — A-4.3)`)
  console.log(`\nR13 RESULT: ${checks} checks, ${failures} failures`)
  if (failures > 0 || extFailures > 0) {
    console.error('--- electron stderr (tail) ---')
    console.error(estderr.split('\n').slice(-30).join('\n'))
    process.exit(1)
  }
  process.exit(0)
}

// ---- THE MAIN-MODULE GUARD (A-2.8) -----------------------------------------
// THE PURE HALF ABOVE IS IMPORTABLE, AND THAT IS CONTRACT: `scenarioEnvelope`,
// `extractAttributeNames`, `attributeSetDifference`, `envelopeDigest` and
// `PINNED_CHECKS` are exercised by the node suite against FIXED LITERAL HTML
// (A-2.8), so a RUN of this leg happens ONLY when this file is the process's
// own entry point (`npm run divergence`, or the `ui` leg's precondition child).
// An import performs NO spawn, no client, no read — and the guard is TOTAL: an
// argv[1] that cannot be resolved answers `false` rather than throwing.
const invokedAsScript = (() => {
  try {
    return process.argv[1] !== undefined && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
  } catch {
    return false
  }
})()
if (invokedAsScript) await main()
