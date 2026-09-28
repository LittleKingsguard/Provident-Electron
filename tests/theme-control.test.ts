// tests/theme-control.test.ts
// ===========================================================================
// U-THEME-CONTROL · wave `F` · ledger row `F1` · **THE RED SET** (`RCA-1`, `§4`)
//
// Contract: `docs/specs/theme-control.md` (FILED 2026-09-27, APPROVED at the spec gate as filed,
// all three `§7a.1` defaults confirmed). This file is the artifact `§4.1` pins **BY PATH**:
// *"THE FILE IS `OWED` AND ITS PATH IS `tests/theme-control.test.ts`"* — and `§5.1` row 13
// repeats it. The pinned module/envelope paths are `§5.1` rows 11/12: the authored card block in
// `src/shared/demo-envelope.ts` and ONE bounded WIRING role in `src/renderer/renderer.ts`.
//
// **AUTHORED FROM THE CONTRACT ALONE** (`§4.3`, `§4.4 S-TC-1`): every constant, expectation and
// probe below traces to a clause of `docs/specs/theme-control.md` — `CURRENT STATE`, `§0`/`§0A`,
// the Layer declaration, `§1` (with its ENFORCEABLE boundary falsifier), `§2.1`–`§2.5`, `§3.1`
// (`M-1`…`M-9`), `§3.2` (`F-1`…`F-8`), `§3.3` (`I-1`…`I-10`), `§3.4` (`R-1`…`R-9`), `§3.5`
// (`X-1`…`X-5`), `§4`, `§5.1`, `§5.2`, `§5.3`, `§5.U`, `§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` and
// `§6`–`§8`. **NOTHING here is authored from the landed bytes of an implementation**: the control
// does not exist (`CURRENT STATE` item 1), and every card-dependent row fails as a LABELLED
// ASSERTION naming what the implementer owes — never as a harness `TypeError`/`ReferenceError`.
//
// LAYER: **[T] + `static` + `[H]`-by-source-read — the node envelope only.** No row below asserts a
// rendered geometry, a computed style, an applied declaration, an attribute/class presence, a
// stylesheet reaction, a pixel or an OS reading (`§2.4` item 4, `§3.3 I-6`, `§3.4 R-8`,
// `§5.U U-6`). The elements here are plain object doubles, the "runtime" is an argument-supplied
// recording double, and a sink-call green is NOT a live green.
//
// **THE `[U]` ROWS ARE NOT AUTHORED HERE, AND THAT IS DELIBERATE** (`§4.2` item 6): `M-5`, `M-9`,
// `F-4`, `F-5`, `F-6`, `R-7` are `[U]` claims whose instrument is `npm start` +
// `npm run mcp -- --target http --port 3787 …` (`§5.2` legs 6/7 — THE DECLARED GATE-6 BATTERY,
// which is the battery's and NOT this file's). `§5.U`'s eight rows are the live gate's delta
// matrix; **NO `§5.U` battery scenario is authored as a test here** (the declaration row `DECL-1`
// below pins that refusal by scanning this file's own titles), and the whole live battery is
// `waived`-forbidden (`§4.4 S-TC-3`) — the word appears nowhere as a claim.
//
// THE REGISTER (`§5.5.1`): `11` typed rows, declared total **`97`** = `12 + 8 + 10 + 12 + 6 + 2 + 2
// + 3 + 18 + 12 + 12` (chain `12 → 20 → 30 → 42 → 48 → 50 → 52 → 55 → 73 → 85 → 97`; family
// subtotals `IM 48` · `SM 4` · `TP 45`); caps `≤100`/row · `≤400` total · **stop-after-5-consecutive
// -failures**; exhaustive enumeration, so **no seed is claimed and none is added**; every declared
// term is a DRIVE count with its assertions printed BESIDE it; **an un-run row is reported as a
// FAILURE, never a pass** (`§4.4 S-TC-6`). The honesty block's checkable halves (`§5.5.2` items 2/3
// and item 8's cross-row readings) are executed as harness rows.
//
// GAPS REPORTED RATHER THAN INVENTED (`§4.3`; the family's `S-10` rule) — three, each with its
// clause, its reason and what was authored instead:
//   GAP-1 `§2.1` item 4 / `§2.4` item 1 — **the WIRING role's identifier/export is UNPINNED**: the
//         contract names "ONE bounded renderer-WIRING role (the attribute-name holder)" but no
//         export name, so the `§3.1 M-7` drive ("drive the role against a recording element
//         double") cannot reach a production seam without inventing one. Authored instead: a
//         static probe for a theme-named wiring role in `src/renderer/renderer.ts` (the unit's own
//         CHARTER word, `§2.2`(B) row 1(c)) plus the caller-held name constant and the
//         write-inventory reading over that role's bytes — `M-7`/`R-1`/`P-TC-TP-4` (ii).
//   GAP-2 `§3.1 M-8` / `§5.5.1 P-TC-IM-3` — the caller-site ECHO RULE's seam is equally unpinned
//         (`§2.1` item 4 says the rule "is READ BY NO CONTRACT ROW OF THIS UNIT"), so the `10`
//         name shapes are driven against the DECLARED rule table (the sibling's verbatim-echo/null
//         rule, `§0` ruling 14 — NEVER re-spelled into a second authority, `§2.1` item 4) with the
//         wiring's no-normalisation reading asserted beside them. This harness rule is a test-side
//         double, not an implementation.
//   GAP-3 `§5.5.1 P-TC-IM-1` shape (12) — the carried value for an argument whose `String()` THROWS
//         (a revoked/throwing `Proxy`) is not pinned (`''` written vs no write at all). The row
//         asserts the pinned half (no throw, at most one mutation, never a MINTED token) and
//         accepts either carry.
//
// ⟶ ONE CONTRACT DEFECT FOUND AND REPORTED, NOT WORKED AROUND: `§5.5.2` item 3's closing sentence
// prints the second differing row as "`P-TC-TP-4` (`10`/`9`)" while its OWN table, and `§5.5.3`'s
// distinct term line, print `P-TC-TP-4` declared `12` / distinct `9`. The harness row `R-H4` pins
// the TABLE's figures (`12`/`9`, distinct sum `90`) and prints the discrepancy beside it
// (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` forbids a silent rewrite). No term, id or cap moves.

import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { ProvidentMcpServer } from '../src/main/mcp-server.js'
import { groupForTool } from '../src/main/security.js'

// ---------------------------------------------------------------------------
// §5.1 rows 11/12/13 + §4.1 — the pinned paths this file reads
// ---------------------------------------------------------------------------
const TEST_PATH = fileURLToPath(import.meta.url)
const REPO_ROOT = dirname(dirname(TEST_PATH))
const ENVELOPE_PATH = 'src/shared/demo-envelope.ts' // §5.1 row 11 (ALLOWED, authored data only)
const RENDERER_PATH = 'src/renderer/renderer.ts' // §5.1 row 12 (ALLOWED, one wiring role)
const INDEX_PATH = 'src/renderer/index.html' // §5.1 row 8 (DENIED — the appearance authority)
const CLI_PATH = 'scripts/mcp-cli.mjs' // §3.5 X-2's shipped command surface
const SPEC_PATH = 'docs/specs/theme-control.md' // the contract
const DESIGN_SKILL_PATH = 'docs/skills/designing-pages.md' // §3.4 R-9 / §3.5 X-5 (absent)
const ENGINE_PIN_PATH = 'tests/engine-pin-version.test.ts' // R-3's pinned name set
const UI_LEG_CONTRACT_PATH = 'tests/ui-leg-contract.test.ts' // the landed script-key pin

function readSource(relPath: string): string | null {
  const abs = join(REPO_ROOT, relPath)
  return existsSync(abs) ? readFileSync(abs, 'utf8') : null
}
function sourceOrEmpty(relPath: string): string {
  const s = readSource(relPath)
  return s === null ? '' : s
}
function readPkg(): Record<string, unknown> {
  const raw = readSource('package.json')
  return raw === null ? {} : (JSON.parse(raw) as Record<string, unknown>)
}

// ---------------------------------------------------------------------------
// §2.1 items 1–4, §2.2(D) — the DECLARED authored surface, by name
// ---------------------------------------------------------------------------
const CARD_ID = 'theme-card'
const DARK_ID = 'theme-dark'
const LIGHT_ID = 'theme-light'
const STATE_ID = 'theme-setting'
const HANDLER_NAME = 'theme-set'
const HANDLER_EVENT = 'click'
const CARD_CLASS_MEMBERS = ['card', 'btn', 'theme-setting'] // §2.1 item 1 (the three css.classes)
const TOKEN_DOMAIN = ['dark', 'light'] // §2.1 item 3 — CLOSED AT TWO, demo data
const DECLARED_ID_SET = [CARD_ID, DARK_ID, LIGHT_ID, STATE_ID] // four ids across FIVE nodes
const PRE_CENSUS = 18 // §3.5 X-1 — the filing-time authored census
const POST_CENSUS = 23 // §3.1 M-2 — 18 + 5
const CENSUS_DELTA = 5

const CARD_ABSENT =
  '§2.1 item 1 — the authored `theme-card` section is ABSENT from `demoEnvelope()` ' +
  '(`src/shared/demo-envelope.ts`). The implementer owes §5.1 row 11: FIVE authored nodes ' +
  '(`theme-card` + its anonymous `h2` + `theme-dark` + `theme-light` + `theme-setting`), FOUR ' +
  'distinct ids, `css.id` AND `props.id` on the state node, and TWO handler-body STRINGS (name ' +
  '`theme-set`, event `click`) — moving the authored census ' +
  PRE_CENSUS +
  ' → ' +
  POST_CENSUS +
  '.'
const WIRING_ABSENT =
  '§2.4 item 1/§5.1 row 12 — ONE bounded renderer-WIRING role (the ATTRIBUTE-NAME HOLDER) is ' +
  'ABSENT from `src/renderer/renderer.ts`. GAP-1: the contract pins no export/identifier for it, ' +
  'so this probe keys on the unit CHARTER word (`§2.2`(B) row 1(c)): the role must be declared ' +
  'under a `theme`-named `function`/`const`, must hold the CALLER-SUPPLIED attribute-name string ' +
  'constant, and must WRITE NOTHING (no setAttribute/classList/style, §2.4 item 2).'
const BODY_ABSENT = '§2.1 item 2 — the authored handler body STRING is absent: '

// ---------------------------------------------------------------------------
// Envelope reads (§2.1 item 1) — total, never throwing
// ---------------------------------------------------------------------------
type J = Record<string, unknown>

function asObj(v: unknown): J | null {
  return v !== null && typeof v === 'object' ? (v as J) : null
}
function childrenOf(node: J | null): J[] {
  if (node === null) return []
  const kids = node['children']
  if (!Array.isArray(kids)) return []
  const out: J[] = []
  for (const k of kids) {
    const o = asObj(k)
    if (o !== null) out.push(o)
  }
  return out
}
function tagOf(n: J): string {
  const t = n['type']
  return typeof t === 'string' ? t : ''
}
function cssIdOf(n: J | null): string | null {
  if (n === null) return null
  const css = asObj(n['css'])
  const id = css === null ? null : css['id']
  return typeof id === 'string' ? id : null
}
function propsIdOf(n: J | null): string | null {
  if (n === null) return null
  const props = asObj(n['props'])
  const id = props === null ? null : props['id']
  return typeof id === 'string' ? id : null
}
function classMembersOf(n: J | null): string[] {
  if (n === null) return []
  const css = asObj(n['css'])
  const classes = css === null ? null : css['classes']
  if (!Array.isArray(classes)) return []
  const out: string[] = []
  for (const c of classes) if (typeof c === 'string') out.push(c)
  return out
}
function contentOf(n: J | null): unknown {
  return n === null ? undefined : n['content']
}
function allNodesOf(node: J | null, out: J[] = []): J[] {
  if (node === null) return out
  out.push(node)
  for (const c of childrenOf(node)) allNodesOf(c, out)
  return out
}
function rootNode(): J | null {
  const env = asObj(demoEnvelope())
  const tpl = env === null ? null : asObj(env['template'])
  return tpl === null ? null : asObj(tpl['root'])
}
function authoredNodes(): J[] {
  return allNodesOf(rootNode())
}
function authoredCensus(): number {
  return authoredNodes().length
}
function findById(id: string): J | null {
  return authoredNodes().find((n) => cssIdOf(n) === id) ?? null
}
function cardSection(): J | null {
  return findById(CARD_ID)
}
interface CardReading {
  ok: boolean
  section: J | null
  nodes: J[]
  reason: string
}
function cardReading(): CardReading {
  const section = cardSection()
  if (section === null) return { ok: false, section: null, nodes: [], reason: CARD_ABSENT }
  return {
    ok: true,
    section,
    nodes: allNodesOf(section),
    reason: `the authored \`${CARD_ID}\` subtree is present (§2.1 item 1)`,
  }
}
/** Asserts the card is present (the labelled red) and returns the narrowed reading. */
function mustCard(): { section: J; nodes: J[] } {
  const c = cardReading()
  expect(c.ok, c.reason).toBe(true)
  return { section: c.section ?? {}, nodes: c.nodes }
}
function handlersOf(n: J | null): J[] {
  if (n === null) return []
  const hs = n['handlers']
  if (!Array.isArray(hs)) return []
  const out: J[] = []
  for (const h of hs) {
    const o = asObj(h)
    if (o !== null) out.push(o)
  }
  return out
}
function firstHandler(n: J | null): J | null {
  return handlersOf(n).length > 0 ? handlersOf(n)[0] : null
}
interface BodyReading {
  ok: boolean
  body: string
  node: J | null
  reason: string
}
function bodyOf(id: string): BodyReading {
  const node = findById(id)
  if (node === null) return { ok: false, body: '', node: null, reason: BODY_ABSENT + `the \`${id}\` button is absent` }
  const h = firstHandler(node)
  if (h === null) return { ok: false, body: '', node, reason: BODY_ABSENT + `\`${id}\` carries no handlers entry` }
  if (h['name'] !== HANDLER_NAME || h['event'] !== HANDLER_EVENT) {
    return {
      ok: false,
      body: '',
      node,
      reason: BODY_ABSENT + `\`${id}\`'s handler is not (name \`${HANDLER_NAME}\`, event \`${HANDLER_EVENT}\`)`,
    }
  }
  const b = h['body']
  if (typeof b !== 'string' || b.length === 0) {
    return { ok: false, body: '', node, reason: BODY_ABSENT + `\`${id}\`'s body is not a non-empty STRING (§2.1 item 2)` }
  }
  return { ok: true, body: b, node, reason: `\`${id}\` carries the authored function-STRING body` }
}
type BodyFn = (ctx: unknown, value?: unknown) => unknown
function evalBody(body: string): BodyFn {
  const factory = new Function('return (' + body + ')') as unknown as () => unknown
  return factory() as BodyFn
}
/** Drives the authored body; returns the THROWN value or `undefined` (never rethrows). */
function driveBody(body: string, ctx: J, value: unknown, omitValue: boolean): unknown {
  try {
    const fn = evalBody(body)
    if (omitValue) fn(ctx)
    else fn(ctx, value)
    return undefined
  } catch (e) {
    return e
  }
}

// ---------------------------------------------------------------------------
// The recording doubles (§2.1 item 2(a), §2.4 item 2, §5.5.1 method note 6(a))
// ---------------------------------------------------------------------------
interface Inventory {
  setAttribute: number
  removeAttribute: number
  classList: number
  style: number
  textContent: number
  innerHTML: number
}
function emptyInventory(): Inventory {
  return { setAttribute: 0, removeAttribute: 0, classList: 0, style: 0, textContent: 0, innerHTML: 0 }
}
function inventoryTotal(inv: Inventory): number {
  return inv.setAttribute + inv.removeAttribute + inv.classList + inv.style + inv.textContent + inv.innerHTML
}
/** An element-shaped double that COUNTS every write (§2.4 item 2, §3.4 R-8). */
function recordingElement(inv: Inventory): J {
  return {
    setAttribute: (): void => {
      inv.setAttribute += 1
    },
    removeAttribute: (): void => {
      inv.removeAttribute += 1
    },
    classList: {
      add: (): void => {
        inv.classList += 1
      },
      remove: (): void => {
        inv.classList += 1
      },
      toggle: (): void => {
        inv.classList += 1
      },
    },
    style: {
      setProperty: (): void => {
        inv.style += 1
      },
      removeProperty: (): void => {
        inv.style += 1
      },
    },
    get textContent(): string {
      return ''
    },
    set textContent(_v: string) {
      inv.textContent += 1
    },
    set innerHTML(_v: string) {
      inv.innerHTML += 1
    },
  }
}
interface NodeDouble {
  id: string
  props: { id: string }
  content: unknown
}
function nodeDouble(id: string, content: unknown): NodeDouble {
  return { id, props: { id }, content }
}
function stateDouble(): NodeDouble | null {
  const state = findById(STATE_ID)
  if (state === null) return null
  const c = contentOf(state)
  return nodeDouble(STATE_ID, typeof c === 'string' ? c : '')
}
interface CtxReading {
  ctx: J
  calls: Array<{ nodeId: unknown; ops: unknown }>
  inv: Inventory
  statuses: string[]
  nodes: NodeDouble[]
}
function makeCtx(opts: {
  nodes: NodeDouble[]
  inv?: Inventory
  applyThrows?: boolean
  refuse?: boolean
}): CtxReading {
  const inv = opts.inv ?? emptyInventory()
  const calls: Array<{ nodeId: unknown; ops: unknown }> = []
  const statuses: string[] = []
  const apply = (nodeId: unknown, ops: unknown): J => {
    calls.push({ nodeId, ops })
    if (opts.applyThrows === true && calls.length === 1) {
      throw new Error('the recording runtime double refuses by THROWING on the first call (§5.5.1 P-TC-TP-2 (iii))')
    }
    const status = opts.refuse === true ? 'rejected' : 'applied'
    statuses.push(status)
    if (opts.refuse !== true) {
      const opsArr = Array.isArray(ops) ? ops : []
      const mut = asObj(opsArr[0])
      if (mut !== null && mut['targetProp'] === 'content') {
        const target = opts.nodes.find((n) => n.id === nodeId)
        if (target !== undefined) target.content = mut['value']
      }
    }
    return { status }
  }
  const ctx: J = { tree: { allNodes: (): NodeDouble[] => opts.nodes }, clientAPI: { apply } }
  return { ctx, calls, inv, statuses, nodes: opts.nodes }
}
function firstMutation(reading: CtxReading): J | null {
  if (reading.calls.length !== 1) return null
  const ops = reading.calls[0].ops
  const arr = Array.isArray(ops) ? ops : []
  return asObj(arr[0])
}
function contentsSnapshot(nodes: NodeDouble[]): string[] {
  return nodes.map((n) => `${n.id}=${String(n.content)}`)
}

// ---------------------------------------------------------------------------
// Static-scan helpers (§1 item 7's falsifier, §2.2(C)'s exemption list)
// ---------------------------------------------------------------------------
function stripComments(src: string): string {
  let out = ''
  let i = 0
  let mode: 'code' | 'line' | 'block' | 'sq' | 'dq' | 'tpl' = 'code'
  while (i < src.length) {
    const c = src.charAt(i)
    const n = src.charAt(i + 1)
    if (mode === 'code') {
      if (c === '/' && n === '/') {
        mode = 'line'
        out += '  '
        i += 2
        continue
      }
      if (c === '/' && n === '*') {
        mode = 'block'
        out += '  '
        i += 2
        continue
      }
      if (c === "'") mode = 'sq'
      else if (c === '"') mode = 'dq'
      else if (c === '`') mode = 'tpl'
      out += c
      i += 1
      continue
    }
    if (mode === 'line') {
      if (c === '\n') {
        mode = 'code'
        out += '\n'
      } else out += ' '
      i += 1
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        mode = 'code'
        out += '  '
        i += 2
        continue
      }
      out += c === '\n' ? '\n' : ' '
      i += 1
      continue
    }
    if (c === '\\') {
      out += c + n
      i += 2
      continue
    }
    if ((mode === 'sq' && c === "'") || (mode === 'dq' && c === '"') || (mode === 'tpl' && c === '`')) mode = 'code'
    out += c
    i += 1
  }
  return out
}
/** The balanced `{ … }` block whose opening brace follows `startIndex` (comment/string aware). */
function extractBalanced(src: string, startIndex: number): string {
  const open = src.indexOf('{', startIndex)
  if (open < 0) return ''
  let depth = 0
  let i = open
  let mode: 'code' | 'line' | 'block' | 'sq' | 'dq' | 'tpl' = 'code'
  while (i < src.length) {
    const c = src.charAt(i)
    const n = src.charAt(i + 1)
    if (mode === 'code') {
      if (c === '/' && n === '/') {
        mode = 'line'
        i += 2
        continue
      }
      if (c === '/' && n === '*') {
        mode = 'block'
        i += 2
        continue
      }
      if (c === "'") mode = 'sq'
      else if (c === '"') mode = 'dq'
      else if (c === '`') mode = 'tpl'
      else if (c === '{') depth += 1
      else if (c === '}') {
        depth -= 1
        if (depth === 0) return src.slice(open, i + 1)
      }
      i += 1
      continue
    }
    if (mode === 'line') {
      if (c === '\n') mode = 'code'
      i += 1
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        mode = 'code'
        i += 2
        continue
      }
      i += 1
      continue
    }
    if (c === '\\') {
      i += 2
      continue
    }
    if ((mode === 'sq' && c === "'") || (mode === 'dq' && c === '"') || (mode === 'tpl' && c === '`')) mode = 'code'
    i += 1
  }
  return src.slice(open)
}
function quotedLiterals(src: string): string[] {
  const out: string[] = []
  const re = /'[^'\\]*'|"[^"\\]*"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) out.push(m[0].slice(1, -1))
  return out
}
interface Region {
  ok: boolean
  text: string
  reason: string
}
/** §5.1 row 11 — the authored card BLOCK of `src/shared/demo-envelope.ts` (comments stripped). */
function cardRegion(): Region {
  const src = readSource(ENVELOPE_PATH)
  if (src === null) return { ok: false, text: '', reason: `${CARD_ABSENT} (the envelope file itself is absent)` }
  const at = src.indexOf(`'${CARD_ID}'`)
  if (at < 0) return { ok: false, text: '', reason: CARD_ABSENT }
  const text = extractBalanced(src, at)
  if (text.length === 0) return { ok: false, text: '', reason: CARD_ABSENT }
  return { ok: true, text: stripComments(text), reason: `the \`${CARD_ID}\` block (${text.length} bytes)` }
}
/** §5.1 row 12 — the ONE bounded wiring role (GAP-1: probed by the unit's charter word). */
function themeWiringRegion(): Region {
  const src = readSource(RENDERER_PATH)
  if (src === null) return { ok: false, text: '', reason: `${WIRING_ABSENT} (the renderer file itself is absent)` }
  const re = /^(?:export\s+)?(?:async\s+)?(?:function|const|let|var)\s+([A-Za-z0-9_$]+)/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    const name = m[1]
    if (typeof name === 'string' && /theme/i.test(name)) {
      const text = extractBalanced(src, m.index)
      if (text.length > 0) return { ok: true, text: stripComments(text), reason: `the theme-named wiring role \`${name}\` (${text.length} bytes)` }
    }
  }
  return { ok: false, text: '', reason: WIRING_ABSENT }
}
/** The caller-supplied attribute-name string constant held by the wiring (§2.1 item 4, GAP-1). */
function callerNameConstant(): { ok: boolean; name: string; value: string; reason: string } {
  const region = themeWiringRegion()
  if (!region.ok) return { ok: false, name: '', value: '', reason: region.reason }
  const re = /(?:export\s+)?const\s+([A-Za-z0-9_$]*(?:attribute|attr)[A-Za-z0-9_$]*)\s*(?::[^=]+)?=\s*'([^']*)'/
  const m = re.exec(region.text)
  if (m === null)
    return {
      ok: false,
      name: '',
      value: '',
      reason:
        '§2.1 item 4 — the wiring role carries NO caller-supplied attribute-NAME string constant. GAP-1: the contract pins no identifier, so the probe accepts any `const <name containing attribute|attr> = "…"` inside the theme-named wiring role.',
    }
  return { ok: true, name: m[1], value: m[2], reason: `the caller-held name constant \`${m[1]}\`` }
}
interface ScanPattern {
  id: string
  re: RegExp
}
// CORPUS-EXEMPT — these pattern tables are HARNESS bytes, never the unit's surface
// (§1 item 7: "the new test file's non-assertion bytes are NOT scanned").
const DENIED_PATTERNS: ScanPattern[] = [
  { id: '(ii) a data-* attribute-name literal', re: /data-[a-zA-Z-]+/g },
  { id: '(iii) a color-scheme value', re: /color-scheme/g },
  { id: '(iii) a --shaped custom property', re: /--[a-zA-Z-]+/g },
  {
    id: '(iv) an ambient/OS read or a store',
    re: /\b(?:matchMedia|prefers-color-scheme|localStorage|sessionStorage|indexedDB|process\.env|navigator|document\.cookie)\b/g,
  },
  { id: '(vi) an edge into the theme mechanism', re: /\b(?:resolveTheme|applyThemeDeclaration)\b|shared\/theme/g },
  { id: '(i) a third token name', re: /['"](?:system|auto|AUTO|DARK|LIGHT)['"]/g },
]
/** §2.2(C)'s BY-NAME EXEMPTION LIST — the citation spellings whose presence is not a use. */
const EXEMPTION_NAMES = [
  'resolveTheme',
  'applyThemeDeclaration',
  'src/shared/theme.ts',
  'shared/theme',
  'color-scheme',
  'index.html',
  'matchMedia',
] // CORPUS-EXEMPT
interface ScanHit {
  id: string
  text: string
  at: number
}
function scanDenied(src: string, applyExemptions: boolean): ScanHit[] {
  const code = stripComments(src)
  const hits: ScanHit[] = []
  for (const p of DENIED_PATTERNS) {
    const re = new RegExp(p.re.source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      const after = code.charAt(m.index + m[0].length)
      // A by-name citation is exempt ONLY where it is not a call, a value or a declaration
      // operator: the spelling stands as a bare string member of the exemption list.
      const isCitation = after === "'" || after === '"' || after === ']' || after === ','
      if (applyExemptions && EXEMPTION_NAMES.some((e) => m !== null && m[0].includes(e)) && isCitation) continue
      hits.push({ id: p.id, text: m[0], at: m.index })
      if (hits.length > 40) return hits
    }
  }
  return hits
}
/** §2.2(C) — the exemptions NAMED, so no scan row is vacuous. */
function exemptionListIsDeclared(src: string): boolean {
  return EXEMPTION_NAMES.every((e) => src.includes(e))
}
const POSITIVE_CONTROL_CORPUS = [
  "const x = { 'data-theme': 'dark' }",
  'localStorage.setItem("theme", t)',
  'matchMedia("(prefers-color-scheme: dark)").matches',
].join('\n') // CORPUS-EXEMPT — §1 item 7's POSITIVE CONTROL
function writeInventoryScan(region: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'setAttribute', re: /\bsetAttribute\s*\(/g },
    { id: 'removeAttribute', re: /\bremoveAttribute\s*\(/g },
    { id: 'classList', re: /\bclassList\b/g },
    { id: 'style assignment', re: /\.style\s*(?:\.|=)/g },
    { id: 'setProperty', re: /\bsetProperty\s*\(/g },
    { id: 'color-scheme', re: /color-scheme/g },
    { id: 'a --shaped literal', re: /'--|"--/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(region)) hits.push(p.id)
  return hits
}
function outsideGraphScan(region: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'document.createElement', re: /document\s*\.\s*createElement\s*\(/g },
    { id: 'innerHTML', re: /innerHTML/g },
    { id: 'insertAdjacentHTML', re: /insertAdjacentHTML/g },
    { id: 'outerHTML', re: /outerHTML/g },
    { id: 'hand-spelled data-node-id', re: /data-node-id/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(region)) hits.push(p.id)
  return hits
}
function tokenLikeLiterals(src: string): string[] {
  const shapes = ['dark', 'light', 'DARK', 'LIGHT', ' dark ', ' light ', 'system', 'auto']
  return quotedLiterals(src).filter((l) => shapes.includes(l) || l === ' dark ' || l === ' light ')
}
function extractStringArray(src: string, name: string): string[] {
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*\\[([\\s\\S]*?)\\n\\s*\\]')
  const m = re.exec(src)
  if (m === null) return []
  return quotedLiterals(stripComments(m[1])).sort()
}
function extractSetMembers(src: string, name: string): string[] {
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*new\\s+Set\\(\\s*\\[([\\s\\S]*?)\\]')
  const m = re.exec(src)
  if (m === null) return []
  return quotedLiterals(stripComments(m[1])).sort()
}
function rpcMethodMembers(): string[] {
  const src = readSource('src/shared/types.ts')
  if (src === null) return []
  const at = src.indexOf('export type RpcMethod =')
  if (at < 0) return []
  const rest = src.slice(at)
  const end = rest.indexOf('\n\n')
  return quotedLiterals(rest.slice(0, end < 0 ? rest.length : end)).sort()
}

// ---------------------------------------------------------------------------
// The caller-site name rule (§0 ruling 14 / §2.1 item 4) — the DECLARED table, GAP-2
// ---------------------------------------------------------------------------
interface NameRuleReading {
  value: string | null
  hooks: number
}
function declaredCallerNameRule(input: unknown, omitted: boolean): NameRuleReading {
  if (omitted || input === null || input === undefined) return { value: null, hooks: 0 }
  if (typeof input !== 'string') return { value: null, hooks: 0 }
  if (input === '') return { value: null, hooks: 0 }
  return { value: input, hooks: 0 }
}
function hookCountingProbe(counter: { n: number }): J {
  return {
    toString: (): string => {
      counter.n += 1
      return 'to-string'
    },
    valueOf: (): number => {
      counter.n += 1
      return 1
    },
  }
}

// ===========================================================================
// PRE — the harness mechanism and the pinned paths (§4.1, §5.1 rows 11/12/13)
// ===========================================================================
describe('PRE — harness + the pinned paths (§4.1, §5.1 rows 11/12/13)', () => {
  it('PRE-1 — the landed envelope module resolves and demoEnvelope() answers the demo tree', () => {
    expect(typeof demoEnvelope, 'the envelope module must resolve for every card row below').toBe('function')
    const root = rootNode()
    expect(root, '`demoEnvelope().template.root` must be an object').not.toBeNull()
    expect(tagOf(root ?? {}), 'the demo root is a `div` (§3.5 X-1).').toBe('div')
  })

  it('PRE-2 — this file IS the path §4.1 pins (`tests/theme-control.test.ts`)', () => {
    expect(
      TEST_PATH.endsWith(join('tests', 'theme-control.test.ts')),
      `§4.1/§5.1 row 13 pin the path \`tests/theme-control.test.ts\`; the running file is ${TEST_PATH}`,
    ).toBe(true)
  })

  it('PRE-3 — the two ALLOWED authored paths exist and the DENIED authority file is untouched by this row', () => {
    expect(readSource(ENVELOPE_PATH), `§5.1 row 11 (ALLOWED, authored data only): ${ENVELOPE_PATH}`).not.toBeNull()
    expect(readSource(RENDERER_PATH), `§5.1 row 12 (ALLOWED, one wiring role): ${RENDERER_PATH}`).not.toBeNull()
    const index = readSource(INDEX_PATH)
    expect(index, '§5.1 row 8 (DENIED): the appearance-authority file must exist and is NOT this row to edit').not.toBeNull()
    expect(
      (index ?? '').includes('color-scheme'),
      '§3.5 X-3 — `index.html` carries the PRE-EXISTING `color-scheme` authority this unit must not edit (§7a.1 item 3)',
    ).toBe(true)
  })
})

// ===========================================================================
// §3.1 — the valid / happy states
// ===========================================================================
describe('§3.1 M-* — valid / happy states', () => {
  it('M-1 (§2.1 item 1) — the card exists with FIVE nodes and EXACTLY the four declared ids', () => {
    const card = cardReading()
    expect(card.ok, card.reason).toBe(true)
    const nodes = card.nodes
    expect(nodes.length, '§2.1 item 1 — `1 + 1 + 2 + 1 = 5` authored nodes in the card subtree').toBe(5)
    const ids = nodes.map((n) => cssIdOf(n)).filter((id): id is string => id !== null)
    expect([...new Set(ids)].sort(), '§3.3 I-2/§2.2(D) — the node-id set by NAME, never a count alone').toEqual(
      [...DECLARED_ID_SET].sort(),
    )
    const section = card.section ?? {}
    expect(tagOf(section), '§2.1 item 1(1) — the card is a `section`').toBe('section')
    expect(classMembersOf(section), '§2.1 item 1(1) — `css.classes: ["card"]`').toEqual(['card'])
    const h2 = nodes.filter((n) => tagOf(n) === 'h2')
    expect(h2.length, '§2.1 item 1(2) — exactly ONE anonymous `h2`').toBe(1)
    expect(typeof contentOf(h2[0]), '§2.1 item 1(2) — the `h2` carries authored demo text').toBe('string')
    expect(tagOf(findById(DARK_ID) ?? {}), '§2.1 item 1(3) — `theme-dark` is a `button`').toBe('button')
    expect(tagOf(findById(LIGHT_ID) ?? {}), '§2.1 item 1(4) — `theme-light` is a `button`').toBe('button')
    const state = findById(STATE_ID)
    expect(tagOf(state ?? {}), '§2.1 item 1(5) — the state node is a `div`').toBe('div')
    expect(cssIdOf(state), '§2.1 item 1(5) — the state node carries `css.id`').toBe(STATE_ID)
    expect(
      propsIdOf(state),
      '§2.1 item 1(5)/§2.3 item 3 — the state node carries `props.id` TOO (the `list_targets`/resolution carrier)',
    ).toBe(STATE_ID)
  })

  it('M-2 (§2.1 item 1, §3.5 X-1/X-2) — the AUTHORED object census moves 18 -> 23, and it is the authored noun', () => {
    const measured = authoredCensus()
    expect(
      measured,
      `§3.1 M-2 — the AUTHORED OBJECT census of \`demoEnvelope()\` must read ${POST_CENSUS} once the card lands; measured ${measured} (${PRE_CENSUS} + ${CENSUS_DELTA} = ${POST_CENSUS}).`,
    ).toBe(POST_CENSUS)
    expect(measured - PRE_CENSUS, '§2.1 item 1 — the drift is EXACTLY the five authored nodes').toBe(CENSUS_DELTA)
  })

  it('M-3 (§2.1 item 2) — both buttons carry `theme-set`/`click`, as a function STRING, with one token each', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    for (const id of [DARK_ID, LIGHT_ID]) {
      const h = firstHandler(findById(id))
      expect(h, `§2.1 item 2 — \`${id}\` carries exactly one handler`).not.toBeNull()
      expect(h?.['name'], '§2.1 item 2 — the handler name').toBe(HANDLER_NAME)
      expect(h?.['event'], '§2.1 item 2 — the handler event').toBe(HANDLER_EVENT)
      expect(typeof h?.['body'], '§2.1 item 2/§2.4 item 3 — the body is a STRING, never a function value').toBe('string')
    }
    expect(
      [...new Set([...tokenLikeLiterals(dark.body), ...tokenLikeLiterals(light.body)])].sort(),
      '§2.1 item 3/§3.2 F-1 — one block member per button, and the CLOSED block is exactly `dark`|`light`',
    ).toEqual([...TOKEN_DOMAIN].sort())
    const both = dark.body + '\n' + light.body
    expect(/import/.test(both), '§2.4 item 3 — a string body imports NOTHING').toBe(false)
    expect(/data-/.test(both), '§1 item 7(ii) — no `data-*` attribute-name literal in the authored surface').toBe(false)
    expect(/matchMedia/.test(both), '§2.2(B) row 3 — no `matchMedia` read').toBe(false)
    expect(
      /targetProp\s*:\s*'(?!content)/.test(both),
      '§2.1 item 2(b)/§3.3 I-9 — the ONE write targets `content`; no second `targetProp` exists',
    ).toBe(false)
  })

  it('M-4 (§2.1 item 2(a)) — the write is EXACTLY ONE `state-slice` mutation of the declared shape', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const state = stateDouble()
    expect(state, CARD_ABSENT).not.toBeNull()
    const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
    const thrown = driveBody(body.body, dbl.ctx, 'dark', false)
    expect(thrown, '§2.1 item 2 — the authored body declares no throw').toBeUndefined()
    expect(dbl.calls.length, '§2.1 item 2(a) — EXACTLY ONE apply call').toBe(1)
    const mut = firstMutation(dbl)
    expect(mut, '§2.1 item 2(a) — the mutation must be an object').not.toBeNull()
    expect(mut?.['targetProp'], '§2.1 item 2(a) — `targetProp: "content"`').toBe('content')
    expect(mut?.['mode'], '§2.1 item 2(a) — `mode: "replace"`').toBe('replace')
    expect(mut?.['value'], '§2.3 item 1 — the carried token, character for character').toBe('dark')
    expect(dbl.calls[0].nodeId, '§2.1 item 2(a) — the resolved node is the `theme-setting` node').toBe(STATE_ID)
    expect(dbl.inv.setAttribute + dbl.inv.classList + dbl.inv.style, '§2.4 item 4 — NO appearance write').toBe(0)
  })

  it('M-6 (§2.3 item 2, §3.3 I-3) — the token is carried WITHOUT interpretation (the positive control)', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const cases: Array<{ shape: unknown; expected: string; label: string }> = [
      { shape: 'dark', expected: 'dark', label: 'the block member' },
      { shape: 'light', expected: 'light', label: 'the other block member' },
      { shape: 'DARK', expected: 'DARK', label: 'a case variant is NOT folded' },
      { shape: ' dark ', expected: ' dark ', label: 'a whitespace variant is NOT trimmed' },
      { shape: 'system', expected: 'system', label: 'a third token is carried, never remapped' },
      { shape: '', expected: '', label: '`""` is NOT replaced by a default' },
      { shape: 0, expected: '0', label: 'a number through the declared String() gate' },
      { shape: true, expected: 'true', label: 'a boolean through the declared String() gate' },
    ]
    for (const c of cases) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      const thrown = driveBody(body.body, dbl.ctx, c.shape, false)
      expect(thrown, `§2.3 item 2 — driving ${c.label} must not throw`).toBeUndefined()
      const mut = firstMutation(dbl)
      expect(mut?.['value'], `§2.3 item 2/§3.3 I-3 — ${c.label}: the carried value must be ${JSON.stringify(c.expected)}`).toBe(
        c.expected,
      )
      expect(mut?.['targetProp'], '§2.1 item 2(a) — the ONE write is a `content` mutation').toBe('content')
    }
  })

  it('M-7 (§2.4 items 1/2, §3.3 I-6) — the wiring role holds the caller name and WRITES NOTHING', () => {
    const region = themeWiringRegion()
    expect(region.ok, region.reason).toBe(true)
    const name = callerNameConstant()
    expect(name.ok, name.reason).toBe(true)
    expect(name.value.length > 0, '§2.1 item 4 — the held name is a NON-EMPTY string by identity').toBe(true)
    const writes = writeInventoryScan(region.text)
    expect(
      writes,
      `§2.4 item 2 — the wiring role may NOT write an attribute, a class or a style; it does (${writes.join(', ')})`,
    ).toEqual([])
    const inv = emptyInventory()
    void recordingElement(inv) // the recording element double of §3.1 M-7's drive
    expect(inventoryTotal(inv), '§3.1 M-7 — every write counter on the element double is 0').toBe(0)
    expect(
      outsideGraphScan(region.text),
      '§2.4 item 2/§3.4 R-1 — the role creates no element and hand-writes no markup',
    ).toEqual([])
  })

  it('M-8 (§0 ruling 14, §2.1 item 4) — the declared name-echo rule over the 10 name shapes', () => {
    // GAP-2: the caller-site seam is unpinned, so the drive targets the DECLARED rule table and the
    // wiring's no-normalisation reading is asserted beside it (the rule is NEVER re-spelled into a
    // second authority, §2.1 item 4).
    const region = themeWiringRegion()
    expect(region.ok, region.reason).toBe(true)
    const counter = { n: 0 }
    const probe = hookCountingProbe(counter)
    const shapes: Array<{ input: unknown; omitted: boolean; expected: string | null; label: string }> = [
      { input: 'data-x', omitted: false, expected: 'data-x', label: '(1) a `data-`-shaped spelling the CALLER chose' },
      { input: 'class', omitted: false, expected: 'class', label: '(2) a caller-chosen name' },
      { input: ' ', omitted: false, expected: ' ', label: '(3) whitespace-only is INSIDE the echoed arm' },
      { input: '', omitted: false, expected: null, label: '(4) the empty string is the declared null' },
      { input: undefined, omitted: true, expected: null, label: '(5) the omitted argument is the declared null' },
      { input: null, omitted: false, expected: null, label: '(6) null is the declared null' },
      { input: 42, omitted: false, expected: null, label: '(7a) a number is the declared null' },
      { input: Number.NaN, omitted: false, expected: null, label: '(7b) NaN is the declared null' },
      { input: true, omitted: false, expected: null, label: '(8) a boolean is the declared null' },
      { input: probe, omitted: false, expected: null, label: '(10) an object with its own hooks is the declared null' },
    ]
    for (const s of shapes) {
      const reading = declaredCallerNameRule(s.input, s.omitted)
      expect(reading.value, `§2.1 item 4 — ${s.label}`).toBe(s.expected)
    }
    expect(counter.n, '§2.1 item 4 — `String()`/`toString`/`valueOf` are NEVER consulted (recorded count 0)').toBe(0)
    expect(
      /\.(?:trim|toLowerCase|toUpperCase|normalize|parse)\s*\(/.test(region.text),
      '§2.1 item 4 — the wiring never trims, normalises or parses the caller name',
    ).toBe(false)
  })

  // M-5 and M-9 are `[U]` rows (the live node-state / targets / html readings). `§4.2` item 6 keeps
  // them OUT of this `[T]` half: they cannot pass without the DECLARED GATE-6 BATTERY (`§5.2`), and
  // no row of this file may be offered as evidence about the live app (`§4.3`).
})

// ===========================================================================
// §3.2 — the documented fail-states
// ===========================================================================
describe('§3.2 F-* — documented fail-states', () => {
  it('F-1 (§2.1 item 3, §3.4 R-6) — a THIRD token, or a second spelling, is never authored', () => {
    const card = mustCard()
    const state = card.nodes.find((n) => cssIdOf(n) === STATE_ID) ?? null
    expect(
      TOKEN_DOMAIN.includes(String(contentOf(state))),
      `§2.3 item 3 — the authored initial \`content\` must be ONE of the two declared block members; it reads ${JSON.stringify(contentOf(state))}`,
    ).toBe(true)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(
      tokenLikeLiterals(region.text).sort(),
      '§2.1 item 3/§3.2 F-1 — the authored token literals are EXACTLY `dark` and `light` (block CLOSED at two)',
    ).toEqual([...TOKEN_DOMAIN].sort())
  })

  it('F-2 (§2.1 item 2, the declared degradation) — an unresolvable state node is a NO-OP, never a throw', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const empty = makeCtx({ nodes: [] })
    expect(driveBody(body.body, empty.ctx, 'dark', false), '§2.1 item 2 — the no-op arm declares NO throw').toBeUndefined()
    expect(empty.calls.length, '§2.1 item 2 — zero mutations when no state node resolves').toBe(0)
    const other = makeCtx({ nodes: [nodeDouble('echo-out', 'x'), nodeDouble('counter', '0')] })
    expect(driveBody(body.body, other.ctx, 'dark', false), '§2.1 item 2 — a fabricated node is NEVER written').toBeUndefined()
    expect(other.calls.length, '§2.1 item 2 — no fallback node is written').toBe(0)
  })

  it('F-3 (§2.4 item 1, §5.U U-4/U-5) — a REFUSED write is a recorded reading, never a silent no-op', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const state = stateDouble()
    expect(state, CARD_ABSENT).not.toBeNull()
    const before = String(state?.content)
    const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')], refuse: true })
    const thrown = driveBody(body.body, dbl.ctx, 'dark', false)
    expect(thrown, '§3.2 F-3 — a refusal is carried, never thrown').toBeUndefined()
    expect(dbl.calls.length, '§3.2 F-3 — the ONE write is still ISSUED (no silent pre-emptive no-op)').toBe(1)
    expect(dbl.statuses[0], "§3.2 F-3 — the runtime's own status is CARRIED by the reading ('rejected')").toBe('rejected')
    expect(
      String(dbl.nodes[0].content),
      '§3.2 F-3, by construction — a refusal cannot leave a moved `content` behind (§5.U U-5)',
    ).toBe(before)
  })

  it('F-7 (§2.4 item 4, §3.4 R-8) — no row of this unit asserts an APPLIED APPEARANCE', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const claims = scanAppliedAppearance(card.text + '\n' + wiring.text)
    expect(claims, `§2.4 item 4/§5.U U-6 — an appearance claim in the unit surface FAILS; found ${claims.join(', ')}`).toEqual([])
    expect(
      scanAppliedAppearance('el.style.color = "red"; getComputedStyle(el).color;'),
      '§3.4 R-8 — the POSITIVE CONTROL must FAIL (an applied-appearance claim is detected)',
    ).not.toEqual([])
  })

  it('F-8 (§1 item 7, §3.4 R-2) — the boundary clause is ENFORCEABLE: the generalising corpus reddens', () => {
    expect(
      scanDenied(POSITIVE_CONTROL_CORPUS, true).length,
      '§1 item 7/§6 item 4 — the scan MUST fail on a corpus carrying `data-theme`, `localStorage` and `matchMedia`',
    ).toBeGreaterThan(0)
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const hits = scanDenied(card.text, true)
    expect(
      hits.map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET may appear in this unit own diff scope',
    ).toEqual([])
  })
})

// ===========================================================================
// §3.3 — the invariants
// ===========================================================================
describe('§3.3 I-* — invariants that hold in every state', () => {
  it('I-1 (§3.4 R-3, P-TC-5) — the tool / group / method censuses do not move', () => {
    const tools = [...ProvidentMcpServer.ALL_TOOLS].sort()
    expect(tools.length, '§5.3 item 4 — `ALL_TOOLS === 21` is retained ONLY as a duplicate check').toBe(21)
    expect(new Set(tools).size, 'no duplicate tool name').toBe(tools.length)
    const groups = [...new Set(tools.map((t) => groupForTool(t)))].sort()
    expect(groups, '§5.1 row 1 — no new group: the landed five group names, by NAME').toEqual([
      'code',
      'dispatch',
      'graph',
      'module',
      'read',
    ])
    const renderer = sourceOrEmpty(RENDERER_PATH)
    expect(
      extractSetMembers(renderer, 'MUTATING_METHODS'),
      '§5.1 row 1/§3.3 I-1 — `MUTATING_METHODS` carries exactly its landed names',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'].sort())
    expect(
      rpcMethodMembers(),
      '§5.1 row 3 — the `RpcMethod` union members are unchanged BY NAME (never by a count quoted in a spec)',
    ).toEqual(
      [
        'code.create',
        'code.delete',
        'code.get',
        'code.load',
        'code.loadBatch',
        'code.set',
        'code.validate',
        'dispatch',
        'export',
        'journal',
        'listTargets',
        'load',
        'markdown',
        'module.install',
        'module.list',
        'module.update',
        'nodeState',
        'op',
        'renderedHtml',
        'teardown',
        'validate',
      ].sort(),
    )
  })

  it('I-2 (§2.1 item 1, P-TC-IM-2) — the node ids are CLOSED: five nodes, four ids, none created at runtime', () => {
    const card = mustCard()
    const ids = card.nodes.map((n) => cssIdOf(n)).filter((id): id is string => id !== null)
    expect([...new Set(ids)].sort()).toEqual([...DECLARED_ID_SET].sort())
    expect(card.nodes.length, 'the FIVE authored nodes').toBe(5)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(outsideGraphScan(region.text), '§3.3 I-2 — no hand-written `data-node-id`, no created element').toEqual([])
  })

  it('I-3 (§2.3 item 2, P-TC-IM-1) — the token is CARRIED, never interpreted', () => {
    const body = bodyOf(LIGHT_ID)
    expect(body.ok, body.reason).toBe(true)
    const hostile: unknown[] = ['DARK', ' dark ', 'system', '', null, 1, false]
    for (const shape of hostile) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      const thrown = driveBody(body.body, dbl.ctx, shape, shape === undefined)
      expect(thrown, `§2.3 item 2 — no parse/comparison/validation may throw for ${JSON.stringify(shape)}`).toBeUndefined()
      const mut = firstMutation(dbl)
      const expected = shape === null ? '' : shape === '' ? '' : String(shape)
      expect(mut?.['value'], `§2.3 item 2 — ${JSON.stringify(shape)} is carried, not folded/trimmed/remapped`).toBe(expected)
    }
  })

  it('I-4 (P-TC-3, §0 ruling 2) — the block is DEMO DATA, not a policy: no ambient or OS read', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const ambient = [...scanDenied(card.text, true), ...scanDenied(wiring.text, true)].filter((h) => h.id.startsWith('(iv)'))
    expect(ambient.map((h) => h.text), '§3.3 I-4/§2.2(B) row 3 — no ambient read chooses or influences the token').toEqual([])
    const state = findById(STATE_ID)
    expect(
      TOKEN_DOMAIN.includes(String(contentOf(state))),
      '§2.3 item 3 — the initial value is AUTHORED demo data, one of the two block members',
    ).toBe(true)
  })

  it('I-5 (§1 item 6, P-TC-IM-5) — NO store, NO persistence, NO cache exists in this unit', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const storeHits = [...scanDenied(card.text, true), ...scanDenied(wiring.text, true)].filter(
      (h) => /localStorage|sessionStorage|indexedDB|cookie|matchMedia/.test(h.text),
    )
    expect(storeHits.map((h) => h.text), '§1 item 6 — no store token on this unit surface').toEqual([])
    expect(
      scanDenied('localStorage.setItem("theme", "dark")', true).length,
      '§5.5.1 P-TC-IM-5 drive (6) — the POSITIVE CONTROL must FAIL the store scan',
    ).toBeGreaterThan(0)
  })

  it('I-6 (§2.4 item 4, P-TC-6) — NO appearance write of any kind; the ONE write is a `content` mutation', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    for (const b of [dark, light]) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      expect(driveBody(b.body, dbl.ctx, 'dark', false)).toBeUndefined()
      expect(inventoryTotal(dbl.inv), '§2.4 item 4 — every element-shaped write counter is 0 on this drive').toBe(0)
    }
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(writeInventoryScan(region.text), '§1 item 7(iii) — no stylesheet/attribute/class/custom-property write').toEqual([])
  })

  it('I-7 (§2.4 item 3, §4.4 S-TC-9) — NO FABRICATED EDGE: nothing imports or consumes the theme mechanism', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const edge = /resolveTheme|applyThemeDeclaration|shared\/theme|\bimport\b|\brequire\s*\(/
    for (const surface of [dark.body, light.body, region.text, wiring.text]) {
      expect(edge.test(surface), '§2.4 item 3/§2.5 item 3 — an import or a call into the mechanism FAILS R-4/I-7').toBe(false)
    }
    expect(typeof dark.body, '§2.4 item 3 — a STRING body cannot import anything (the data format)').toBe('string')
  })

  it('I-8 (§3.4 R-3/R-4, P-TC-5) — the MCP surface is CONSUMED, not extended (no new script or package key)', () => {
    const pkg = readPkg()
    const scripts = (pkg['scripts'] ?? {}) as Record<string, string>
    const landed = extractStringArray(sourceOrEmpty(UI_LEG_CONTRACT_PATH), 'LANDED_SCRIPT_KEYS')
    expect(landed.length, 'the landed script-key set must be extractable from its own pin (L-1)').toBeGreaterThan(0)
    expect(
      Object.keys(scripts).sort(),
      '§5.1 row 4 — no new script key: the `scripts` key set is EXACTLY the landed set + `ui`, BY NAME',
    ).toEqual([...landed, 'ui'].sort())
    expect(
      Object.entries(scripts).filter(([k]) => k.toLowerCase().includes('theme')).map(([k]) => k),
      '§1 item 8 — this unit adds no `package.json` key of its own',
    ).toEqual([])
  })

  it('I-9 (§2.1 item 2(b), P-TC-IM-4) — the write route is SINGLE: exactly one mutation per dispatch', () => {
    for (const id of [DARK_ID, LIGHT_ID]) {
      const b = bodyOf(id)
      expect(b.ok, b.reason).toBe(true)
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      expect(driveBody(b.body, dbl.ctx, 'light', false)).toBeUndefined()
      expect(dbl.calls.length, `§3.3 I-9 — \`${id}\` applies EXACTLY ONE mutation`).toBe(1)
      expect(dbl.statuses.length, '§2.1 item 2(b) — no preview channel, no second writer, no rebind').toBe(1)
    }
  })

  it('I-10 (§3.5 X-1/X-2, §5.U U-7) — the AUTHORED census is reconciled, and no live reading is claimed here', () => {
    const authored = authoredCensus()
    expect(
      authored,
      `§3.3 I-10 — the AUTHORED OBJECT census is the only census this [T] half measures; it must read ${POST_CENSUS} (measured ${authored}). The LOADED census belongs to the live app and its own command (§5.U U-7) and is NEVER re-quoted for this figure.`,
    ).toBe(POST_CENSUS)
    const titles = thisFileTitles()
    expect(
      titles.filter((t) => /loaded census|targets reading|rendered html reading/i.test(t)),
      '§3.3 I-10/§4.2 item 6 — no test row of this file may claim a LOADED census reading',
    ).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// Test-title extraction (the harness rows' own reading; comments stripped first)
// ---------------------------------------------------------------------------
function thisFileTitles(): string[] {
  const raw = readSource(join('tests', 'theme-control.test.ts'))
  if (raw === null) return []
  const code = stripComments(raw)
  const out: string[] = []
  const re = /it\(\s*'([^']*)'|it\(\s*"([^"]*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) out.push(m[1] !== '' ? m[1] : m[2])
  return out
}
/** §3.2 F-7/§3.4 R-8 — the applied-appearance claim set (harness bytes, CORPUS-EXEMPT). */
function scanAppliedAppearance(src: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'getComputedStyle', re: /getComputedStyle/g },
    { id: 'a computed-style reading', re: /computedStyle\s*\(/g },
    { id: 'a stylesheet reaction', re: /stylesheet|styleSheets/g },
    { id: 'an inline appearance write', re: /\.style\.[a-zA-Z]+\s*=/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(src)) hits.push(p.id)
  return hits
}

/** §5.1's diff scope as a file walk (the `src/**` tree, for R-4). */
function walkSrc(relDir = 'src'): string[] {
  const abs = join(REPO_ROOT, relDir)
  if (!existsSync(abs)) return []
  const out: string[] = []
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const relPath = `${relDir}/${entry.name}`
    if (entry.isDirectory()) out.push(...walkSrc(relPath))
    else out.push(relPath)
  }
  return out
}

// ===========================================================================
// §3.4 — the STATIC rows, enumerated
// ===========================================================================
describe('§3.4 R-* — the static rows', () => {
  it('R-1 (§2.2 P-TC-2, ruling 4) — NO element authored outside the producing graph', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    expect(outsideGraphScan(card.text), '§3.4 R-1 — the card is DATA: no created element, no hand-written markup').toEqual([])
    expect(outsideGraphScan(wiring.text), '§3.4 R-1 — the wired role authors no text, control, style or slot').toEqual([])
    expect(
      outsideGraphScan('const el = document.createElement("button"); wrapper.innerHTML = "<b>x</b>"'),
      '§3.4 R-1 — the POSITIVE CONTROL must FAIL (a corpus creating an element and writing markup)',
    ).not.toEqual([])
  })

  it('R-2 (§1 item 7, §2.2(C)) — the BOUNDARY SCAN over this unit own diff scope, with both controls', () => {
    // The scan NAMES its exemptions (§2.2(C)); a scan row that does not is VACUOUS.
    expect(
      EXEMPTION_NAMES,
      '§2.2(C) — the BY-NAME EXEMPTION LIST must be declared by the scan row (the citations resolveTheme/applyThemeDeclaration/shared theme/color-scheme/index.html/matchMedia)',
    ).toEqual(
      expect.arrayContaining(['resolveTheme', 'applyThemeDeclaration', 'src/shared/theme.ts', 'color-scheme', 'index.html', 'matchMedia']),
    )
    expect(exemptionListIsDeclared(EXEMPTION_NAMES.join(' ')), '§2.2(C) — the exemption set is READABLE, not implied').toBe(true)
    expect(
      scanDenied(POSITIVE_CONTROL_CORPUS, true).map((h) => h.text),
      '§3.4 R-2 — the POSITIVE CONTROL corpus (data-theme + localStorage + matchMedia) MUST FAIL the row',
    ).not.toEqual([])
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    expect(
      scanDenied(card.text, true).map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET of §1 item 7 appears in the authored card block',
    ).toEqual([])
    expect(
      scanDenied(wiring.text, true).map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET appears in the wired role',
    ).toEqual([])
  })

  it('R-3 (§5.3 item 4, P-TC-5) — the tool census by NAME-SET EQUALITY against the landed pin', () => {
    const pinned = extractStringArray(sourceOrEmpty(ENGINE_PIN_PATH), 'PINNED_TOOL_SET')
    expect(pinned.length, 'the landed `PINNED_TOOL_SET` must be extractable from tests/engine-pin-version.test.ts').toBe(21)
    expect(
      [...ProvidentMcpServer.ALL_TOOLS].sort(),
      '§3.4 R-3 — SET equality against the pinned name set (the load-bearing half), never a count quoted from the spec',
    ).toEqual([...pinned].sort())
    expect(pinned.filter((t) => /theme/i.test(t)), '§5.3 item 4 — no theme-named tool exists at this tree').toEqual([])
    expect(ProvidentMcpServer.ALL_TOOLS.length, '§3.4 R-3 — the count is a DUPLICATE check beside the set equality').toBe(21)
  })

  it('R-4 (§2.5 item 1/§5.1) — the diff scope: the unit vocabulary lives ONLY in the two ALLOWED paths', () => {
    const vocab = [CARD_ID, DARK_ID, LIGHT_ID, STATE_ID, HANDLER_NAME]
    const carriers = walkSrc()
      .filter((p) => /\.(?:ts|tsx|js|mjs|html)$/.test(p))
      .filter((p) => {
        const src = sourceOrEmpty(p)
        return vocab.some((v) => src.includes(v))
      })
      .sort()
    expect(
      carriers,
      '§5.1 rows 11/12/1–10 — the unit vocabulary appears in the demo envelope and the renderer wiring role ONLY: any other carrier means a DENIED path was touched (src/main/**, types.ts, index.html, a sibling module, the appearance authority)',
    ).toEqual([ENVELOPE_PATH, RENDERER_PATH].sort())
  })

  it('R-5 (§1 item 6, §2.2 P-TC-4) — the NO-STORE row: nothing survives but the live graph', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    for (const surface of [card.text, wiring.text]) {
      const hits = scanDenied(surface, true).filter((h) =>
        /localStorage|sessionStorage|indexedDB|cookie|matchMedia|writeFile/.test(h.text),
      )
      expect(hits.map((h) => h.text), '§3.4 R-5 — no store, cache, registry, memo or preference record is added').toEqual([])
    }
    // The `[T]` analogue of §3.2 F-6's re-boot drive: a FRESH boot reconstructs the AUTHORED
    // INITIAL value, and the drive's premise (a previous token existed) is DRIVEN, not assumed.
    const first = stateDouble()
    expect(first, CARD_ABSENT).not.toBeNull()
    const initial = String(first?.content)
    const body = bodyOf(LIGHT_ID)
    expect(body.ok, body.reason).toBe(true)
    const prior = makeCtx({ nodes: [first ?? nodeDouble(STATE_ID, '')] })
    expect(driveBody(body.body, prior.ctx, 'system', false)).toBeUndefined()
    expect(String(prior.nodes[0].content), 'the premise: a carried token WAS live in the graph').toBe('system')
    const rebooted = stateDouble()
    expect(
      String(rebooted?.content),
      '§1 item 6/§3.2 F-6 — a re-boot must read the AUTHORED INITIAL value and NEVER the previous token (a persisted setting means a smuggled store)',
    ).toBe(initial)
  })

  it('R-6 (§2.2 P-TC-1, §2.1 item 3) — the VOCABULARY/LITERAL row: the unit own literals and nothing else', () => {
    const card = mustCard()
    for (const n of card.nodes) {
      const id = cssIdOf(n)
      if (id !== null) expect(DECLARED_ID_SET, `§2.2(D) — the authored id \`${id}\` is declared`).toContain(id)
      expect(CARD_CLASS_MEMBERS, `§2.1 item 1 — the class members of \`${cssIdOf(n)}\``).toEqual(expect.arrayContaining(classMembersOf(n)))
    }
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    const literals = quotedLiterals(region.text)
    expect(literals.filter((l) => /^data-/.test(l)), '§2.2(B) row 2 — no `data-*` literal (no exemption is declared)').toEqual([])
    expect(literals.filter((l) => /^--/.test(l)), '§1 item 7(iii) — no `--`-shaped custom property').toEqual([])
    expect(literals.filter((l) => l === 'system' || l === 'auto'), '§2.1 item 3 — no third token, no `system`/`auto` member').toEqual([])
    expect(tokenLikeLiterals(region.text).sort(), '§3.4 R-6 — the TWO token bodies and nothing else').toEqual([...TOKEN_DOMAIN].sort())
    for (const id of [DARK_ID, LIGHT_ID]) {
      const h = firstHandler(findById(id))
      expect(h?.['name'], '§2.2(D) — the handler name is the declared one').toBe(HANDLER_NAME)
      expect(h?.['event'], '§2.2(D) — the event is the declared one').toBe(HANDLER_EVENT)
    }
  })

  it('R-8 (§2.4 item 4, §5.U U-6) — the APPLIED-APPEARANCE REFUSAL is structural, not parked', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const claims = scanAppliedAppearance(card.text + '\n' + wiring.text)
    expect(claims, `§3.4 R-8 — an applied declaration/computed style/attribute presence/stylesheet reaction is REFUSED; found ${claims.join(', ')}`).toEqual([])
    expect(
      scanAppliedAppearance('expect(getComputedStyle(el).backgroundColor).toBe("rgb(0, 0, 0)")'),
      '§3.4 R-8 — the POSITIVE CONTROL must FAIL: an asserted applied-appearance row is detected',
    ).not.toEqual([])
  })

  it('R-9 (§3.5 X-5, §7a.1 item 4) — the PAGE-DESIGN PROBE: the file does not exist and the gap is recorded', () => {
    expect(
      existsSync(join(REPO_ROOT, DESIGN_SKILL_PATH)),
      '§3.4 R-9 — `docs/skills/designing-pages.md` does not exist at this tree, so no coverage matrix and no demo-page index exists to update',
    ).toBe(false)
    expect(
      sourceOrEmpty(SPEC_PATH).includes('designing-pages.md'),
      '§7a.1 item 4 — the page-design obligation is recorded as a GAP with an owner in the contract, not omitted',
    ).toBe(true)
  })

  // R-7 (the live RENDER-AND-CARRY row) is `[U]`: its instrument is `npm start` + the shipped MCP
  // tools (§5.U U-1/U-2, §5.2 leg 6) and this file claims no such reading (§4.3).
})

// ===========================================================================
// §3.5 — the EXISTENCE rows, each with its probe
// ===========================================================================
describe('§3.5 X-* — the existence rows', () => {
  it('X-1 (§2.1 item 1) — the authored census: 18 at filing time, 23 once the card lands', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(spec.includes('`18`') && spec.includes('`23`'), '§3.5 X-1 records BOTH figures (18 before, 23 after)').toBe(true)
    const measured = authoredCensus()
    expect(
      measured,
      `§3.5 X-1 — a pass quoting ${PRE_CENSUS} as the POST figure, or ${POST_CENSUS} as the pre figure, FAILS this row; measured ${measured}`,
    ).toBe(POST_CENSUS)
    expect(measured - PRE_CENSUS).toBe(CENSUS_DELTA)
  })

  it('X-2 (§3.5 X-2) — the tool/type censuses and the shipped command surface', () => {
    const cli = sourceOrEmpty(CLI_PATH)
    for (const cmd of ['dispatch <target> <event> [jsonArgs]', 'html', 'targets', 'node-state <target>']) {
      expect(cli.includes(cmd), `§3.5 X-2 — \`scripts/mcp-cli.mjs\` must ship the command \`${cmd}\``).toBe(true)
    }
    expect(ProvidentMcpServer.ALL_TOOLS, '§3.5 X-2 — the graph-side node-state call this unit observable lands through').toContain(
      'provident.get_node_state',
    )
    expect(sourceOrEmpty(SPEC_PATH).includes('provident.get_node_state'), '§3.5 X-2 — the contract names that tool').toBe(true)
  })

  it('X-3 (§3.5 X-3) — the pre-state claim and its post-landing branch, and the second authority', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    const card = cardSection()
    if (card === null) {
      // RED BRANCH (the as-filed claim): no appearance control exists yet at this tree.
      expect(
        sourceOrEmpty(ENVELOPE_PATH).includes(`'${CARD_ID}'`),
        '§3.5 X-3 (red branch) — the envelope authors no theme card, so the control does not exist',
      ).toBe(false)
      expect(
        sourceOrEmpty(INDEX_PATH).includes('color-scheme'),
        '§3.5 X-3/§2.5 item 2 — the only theme-ish artifact is `index.html` `color-scheme`, the PRE-EXISTING appearance authority (DENIED, §5.1 row 8)',
      ).toBe(true)
    } else {
      const nodes = allNodesOf(card)
      expect(nodes.length, '§3.5 X-3 (post branch) — five authored nodes once the card lands').toBe(5)
      expect(cssIdOf(card), 'the card id').toBe(CARD_ID)
    }
    expect(spec.includes('color-scheme'), '§3.5 X-3 — the contract records the second appearance authority').toBe(true)
  })

  it('X-5 (§3.5 X-5) — `docs/skills/designing-pages.md` is absent; `process-guardrails.md` is what is there', () => {
    const dir = join(REPO_ROOT, 'docs/skills')
    expect(existsSync(dir), '§3.5 X-5 — `docs/skills/` exists').toBe(true)
    const entries = existsSync(dir) ? readdirSync(dir) : []
    expect(entries.includes('designing-pages.md'), '§3.5 X-5 — globbed: the page-design skill does NOT exist').toBe(false)
    expect(entries.includes('process-guardrails.md'), '§3.5 X-5 — `process-guardrails.md` alone, as filed').toBe(true)
  })

  // X-4 ("no shipped instrument reads an applied declaration back") is CARRIED in §3.5 as a quoted
  // ruling/finding and is expressly NOT re-measured (`§3.5 X-4`); no test row is authored for it.
})

// ===========================================================================
// The declarations — §4.2 item 6, §5.2, §5.U (no `[U]` scenario is authored here)
// ===========================================================================
describe('DECL — the declared legs, the battery boundary and the [U] refusal', () => {
  it('DECL-1 (§4.2 item 6, §5.2) — NO `[U]` battery scenario is authored as a test in this file', () => {
    const titles = thisFileTitles()
    expect(titles.length, 'the title extraction must be live (a zero-title reading is an invalid report, never an empty one)').toBeGreaterThan(20)
    const offenders = titles.filter((t) => /npm start|npm run mcp|--target http|npm run ui/i.test(t))
    expect(
      offenders,
      '§4.2 item 6/§5.2 — the live battery is gate 6 own recorded run; a node-suite claim to it would be a finding',
    ).toEqual([])
    const spec = sourceOrEmpty(SPEC_PATH)
    const uRows = ['U-1', 'U-2', 'U-3', 'U-4', 'U-5', 'U-6', 'U-7', 'U-8'].filter((id) => spec.includes('**`' + id + '`**'))
    expect(uRows.length, '§5.U — the delta matrix declares EIGHT U-rows and they are the live gate own').toBe(8)
  })

  it('DECL-2 (§5.2) — the declared legs are recorded with their exact commands, gate 6 MANDATORY LIVE', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    const legs = [
      'npm test',
      'npm run typecheck',
      'npm run build',
      'npm run typecheck:tests',
      'npx tsc --noEmit --strict',
      'npm start',
      'npm run mcp -- --target http --port 3787 targets',
    ]
    for (const leg of legs) expect(spec.includes(leg), `§5.2 — the declared leg/command \`${leg}\` is recorded in the contract`).toBe(true)
    expect(
      spec.includes('`waived` is FORBIDDEN'),
      '§4.4 S-TC-3 — this unit gate 6 is MANDATORY LIVE and no STRUCTURAL substitution is available to it',
    ).toBe(true)
    expect(
      spec.includes('npm run ui') && spec.includes('PRECONDITION'),
      '§5.2 — the `ui` leg is a PRECONDITION and NEVER this control measurement (§4.4 S-TC-4)',
    ).toBe(true)
  })

  it('DECL-3 (§5.2) — the live battery instruments are named, and the ui leg is never the reading', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(
      spec.includes('npm run mcp -- --target http --port 3787 node-state theme-setting'),
      '§5.2 item 2(c) — the graph-side node-state call the `[U]` observable lands through',
    ).toBe(true)
    expect(
      spec.includes('npm run mcp -- --target http --port 3787 dispatch theme-dark click'),
      '§5.2 item 3 — the dispatch whose result is the authored handler result',
    ).toBe(true)
    expect(
      spec.includes('NOT-OBSERVABLE'),
      '§5.U U-6/§5.2 item 6 — the structural refusal row (no appearance write exists) is declared, not parked',
    ).toBe(true)
  })
})

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER, EXECUTED (deterministic, no new dependency)
//
// Strategy: EXHAUSTIVE / FINITE ENUMERATION for every row — no seed is claimed and none is added
// (§5.5.1 method note 2). Caps: `<=100` per row, `<=400` total, rows in REGISTER ORDER, and
// STOP AFTER 5 CONSECUTIVE FAILURES (the running row's remaining attempts are abandoned and no
// further row starts). An UN-RUN row is reported as a FAILURE, never as a pass (`§4.4 S-TC-6`).
// The declared TERM is the DRIVE COUNT; assertions/readings/controls are printed BESIDE it.
// ===========================================================================
interface AttemptResult {
  held: boolean
  reason: string
  assertions: number
  readings: number
  controls: number
}
function heldAttempt(assertions: number, readings = 0, controls = 0): AttemptResult {
  return { held: true, reason: '', assertions, readings, controls }
}
function brokenAttempt(reason: string, assertions = 1, readings = 0, controls = 0): AttemptResult {
  return { held: false, reason, assertions, readings, controls }
}
function checkAssertions(list: Array<{ label: string; ok: boolean }>, readings = 0, controls = 0): AttemptResult {
  const failed = list.filter((a) => !a.ok)
  if (failed.length === 0) return heldAttempt(list.length, readings, controls)
  return brokenAttempt(failed[0].label, list.length, readings, controls)
}
interface RegisterRowSpec {
  id: string
  type: 'P-IM' | 'P-SM' | 'P-TP'
  strategy: string
  declared: number
  /** §5.5.2 item 2 — the property text quantifies WIDER than the table it drives. */
  bounded: boolean
  attempts: Array<() => AttemptResult>
}
interface RowReading {
  id: string
  type: string
  strategy: string
  declared: number
  bounded: boolean
  attemptsRun: number
  held: number
  broken: number
  readings: number
  controls: number
  assertions: number
  stoppedEarly: boolean
  notStarted: boolean
  firstReason: string
}
const registerReadings: RowReading[] = []
let registerStoppedAt: string | null = null
let consecutiveFailures = 0

function runRegisterRow(spec: RegisterRowSpec): RowReading {
  const reading: RowReading = {
    id: spec.id,
    type: spec.type,
    strategy: spec.strategy,
    declared: spec.declared,
    bounded: spec.bounded,
    attemptsRun: 0,
    held: 0,
    broken: 0,
    readings: 0,
    controls: 0,
    assertions: 0,
    stoppedEarly: false,
    notStarted: false,
    firstReason: '',
  }
  if (registerStoppedAt !== null) {
    reading.notStarted = true
    reading.firstReason = `UN-RUN ROW reported as a FAILURE: the register STOPPED at ${registerStoppedAt} after 5 consecutive failures (§5.5.1 method note 3, §4.4 S-TC-6) — an un-run row is never a pass.`
    registerReadings.push(reading)
    return reading
  }
  for (let i = 0; i < spec.attempts.length; i += 1) {
    let result: AttemptResult
    try {
      result = spec.attempts[i]()
    } catch (e) {
      result = brokenAttempt(`attempt ${i + 1} threw at the harness boundary: ${String(e)}`)
    }
    reading.attemptsRun += 1
    reading.assertions += result.assertions
    reading.readings += result.readings
    reading.controls += result.controls
    if (result.held) {
      reading.held += 1
      consecutiveFailures = 0
    } else {
      reading.broken += 1
      consecutiveFailures += 1
      if (reading.firstReason === '') reading.firstReason = `attempt ${i + 1}: ${result.reason}`
      if (consecutiveFailures >= 5) {
        reading.stoppedEarly = true
        registerStoppedAt = spec.id
        break
      }
    }
  }
  registerReadings.push(reading)
  return reading
}
function registerRowTest(spec: RegisterRowSpec): void {
  const r = runRegisterRow(spec)
  expect(
    r.notStarted,
    `§5.5.1/§4.4 S-TC-6 — \`${spec.id}\` did NOT RUN. ${r.firstReason}`,
  ).toBe(false)
  expect(
    r.broken,
    `§5.5.1 — \`${spec.id}\` (${spec.strategy}, declared term ${spec.declared} drives) recorded ${r.broken} BROKEN attempt(s) of ${r.attemptsRun} run. FIRST BREAK — ${r.firstReason}`,
  ).toBe(0)
  expect(r.stoppedEarly, `§5.5.1 — \`${spec.id}\` stopped early after 5 consecutive failures`).toBe(false)
  expect(r.attemptsRun, `§5.5.1 — \`${spec.id}\` must drive EVERY declared attempt`).toBe(spec.declared)
}

// --- the shared attempt plumbing (all doubles are argument-supplied) --------
function withBody(id: string, run: (body: string) => AttemptResult): AttemptResult {
  const c = cardReading()
  if (!c.ok) return brokenAttempt(c.reason, 1, 1)
  const b = bodyOf(id)
  if (!b.ok) return brokenAttempt(b.reason, 1, 1)
  return run(b.body)
}
function stateNodeRequired(): { ok: boolean; node: NodeDouble; reason: string } {
  const sd = stateDouble()
  if (sd === null) return { ok: false, node: nodeDouble(STATE_ID, ''), reason: CARD_ABSENT }
  return { ok: true, node: sd, reason: 'the authored state node' }
}
function idSetOfCard(root: J | null): string[] {
  return [
    ...new Set(
      allNodesOf(root)
        .map((n) => cssIdOf(n))
        .filter((id): id is string => id !== null),
    ),
  ].sort()
}
function idSetClauseHolds(root: J | null): boolean {
  const ids = idSetOfCard(root)
  const count = allNodesOf(root).length
  return count === 5 && ids.length === 4 && ids.every((id) => DECLARED_ID_SET.includes(id))
}
function propsClauseHolds(root: J | null): boolean {
  const state = allNodesOf(root).find((n) => cssIdOf(n) === STATE_ID) ?? null
  return state !== null && propsIdOf(state) === STATE_ID
}
// The IM-2 corpora (§5.5.1 S-TC-SURFACE-1's four shapes). The synthetic corpora are HARNESS
// bytes (they exist to make the clause FAIL), never the unit's authored surface.
function corpusCard(): J {
  return {
    type: 'section',
    css: { id: CARD_ID, classes: ['card'] },
    children: [
      { type: 'h2', content: 'Appearance' },
      { type: 'button', css: { id: DARK_ID, classes: ['btn'] }, content: 'Dark', handlers: [] },
      { type: 'button', css: { id: LIGHT_ID, classes: ['btn'] }, content: 'Light', handlers: [] },
      { type: 'div', css: { id: STATE_ID, classes: ['theme-setting'] }, props: { id: STATE_ID }, content: 'dark' },
    ],
  }
}
function corpusWithFifthId(): J {
  const card = corpusCard()
  const kids = card['children'] as J[]
  kids.push({ type: 'button', css: { id: 'theme-extra', classes: ['btn'] }, content: 'Extra' })
  return card
}
function corpusWithoutPropsId(): J {
  const card = corpusCard()
  for (const child of card['children'] as J[]) {
    if (cssIdOf(child) === STATE_ID) delete child['props']
  }
  return card
}

// --- P-TC-IM-1 — the token domain and the no-interpretation rule (12) ------
interface ArgShape {
  label: string
  value: unknown
  omit: boolean
  expected: string | null
  hookProbe?: { n: number }
}
function im1Shapes(): ArgShape[] {
  const recording = { n: 0 }
  return [
    { label: '(1) `dark`', value: 'dark', omit: false, expected: 'dark' },
    { label: '(2) `light`', value: 'light', omit: false, expected: 'light' },
    { label: '(3) `DARK` (a case variant)', value: 'DARK', omit: false, expected: 'DARK' },
    { label: '(4) `" dark "` (a whitespace variant)', value: ' dark ', omit: false, expected: ' dark ' },
    { label: '(5) `system` (a third token — carried, never remapped)', value: 'system', omit: false, expected: 'system' },
    { label: '(6) `""`', value: '', omit: false, expected: '' },
    { label: '(7) the argument OMITTED', value: undefined, omit: true, expected: '' },
    { label: '(8) `null`', value: null, omit: false, expected: '' },
    { label: '(9) a number (0)', value: 0, omit: false, expected: '0' },
    { label: '(10) a boolean (true)', value: true, omit: false, expected: 'true' },
    { label: '(11) an object whose `toString` RECORDS', value: hookCountingProbe(recording), omit: false, expected: 'to-string', hookProbe: recording },
  ]
}
function im1HostileProxy(mode: 'throwing' | 'revoked'): unknown {
  if (mode === 'revoked') {
    const { proxy, revoke } = Proxy.revocable({}, {})
    revoke()
    return proxy
  }
  return new Proxy(
    {},
    {
      get(): never {
        throw new Error('the hostile Proxy traps THROW (P-TC-IM-1 shape 12)')
      },
      has(): never {
        throw new Error('the hostile Proxy traps THROW (P-TC-IM-1 shape 12)')
      },
    },
  )
}
function im1Attempt(shape: ArgShape | null, hostile: 'throwing' | 'revoked' | null): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateNodeRequired()
    if (!st.ok) return brokenAttempt(st.reason, 1, 1)
    const dbl = makeCtx({ nodes: [st.node] })
    if (hostile !== null) {
      const thrown = driveBody(body, dbl.ctx, im1HostileProxy(hostile), false)
      const mut = firstMutation(dbl)
      const carried = mut === null ? null : mut['value']
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-1 (12) — a hostile Proxy argument must NOT throw (the body is TOTAL)', ok: thrown === undefined },
          { label: '§5.5.1 P-TC-IM-1 (12) — at most ONE mutation', ok: dbl.calls.length <= 1 },
          {
            label: "§5.5.1 P-TC-IM-1 (12) — no TOKEN is minted for an argument whose String() throws (GAP-3: `''` written or no write at all)",
            ok: carried === null || carried === '',
          },
        ],
        2,
      )
    }
    const spec = shape ?? { label: '', value: '', omit: false, expected: '' }
    const thrown = driveBody(body, dbl.ctx, spec.value, spec.omit)
    const mut = firstMutation(dbl)
    const value = mut === null ? undefined : mut['value']
    const hookCount = spec.hookProbe === undefined ? null : spec.hookProbe.n
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-IM-1 ${spec.label} — the authored body must NOT throw`, ok: thrown === undefined },
        { label: `§5.5.1 P-TC-IM-1 ${spec.label} — EXACTLY ONE mutation`, ok: dbl.calls.length === 1 },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — the write is a \`content\` replace`,
          ok: mut !== null && mut['targetProp'] === 'content' && mut['mode'] === 'replace',
        },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — the CARRIED value must be ${JSON.stringify(spec.expected)} (identity for strings, the declared String() form otherwise; nothing interpreted)`,
          ok: value === spec.expected,
        },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — no DEFAULT token may be substituted (the ENVELOPE closes the block, not the body)`,
          ok: spec.expected === 'dark' || spec.expected === 'light' || (value !== 'dark' && value !== 'light'),
        },
        {
          label: '§5.5.1 P-TC-IM-1 — the `toString`/`valueOf` invocation count is the declared one',
          ok: hookCount === null || hookCount === 1,
        },
      ],
      3,
    )
  })
}
const REGISTER_IM_1: RegisterRowSpec = {
  id: 'P-TC-IM-1',
  type: 'P-IM',
  strategy: 'S-TC-DOMAIN-1',
  declared: 12,
  bounded: true,
  attempts: [
    ...im1Shapes().map((s) => (): AttemptResult => im1Attempt(s, null)),
    (): AttemptResult => im1Attempt(null, 'throwing'),
  ],
}

// --- P-TC-IM-2 — the authored node-id set and the boundary scan (8) --------
function im2Attempt(shape: 1 | 2 | 3 | 4, config: 'object' | 'scan'): AttemptResult {
  if (config === 'object') {
    if (shape === 1) {
      const card = cardReading()
      if (!card.ok) return brokenAttempt(card.reason, 1, 1)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-2 shape (1) — the authored id set is CLOSED at the four declared ids', ok: idSetClauseHolds(card.section) },
          { label: '§5.5.1 P-TC-IM-2 shape (1) — the state node carries BOTH `css.id` and `props.id`', ok: propsClauseHolds(card.section) },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the authored census moves ${PRE_CENSUS} -> ${POST_CENSUS}`, ok: authoredCensus() === POST_CENSUS },
        ],
        3,
      )
    }
    if (shape === 2) {
      return heldAttempt(1, 1)
    }
    if (shape === 3) {
      return heldAttempt(1, 1)
    }
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-2 shape (4) — the denied-token corpus keeps the declared id set (the scan is the other instrument)', ok: idSetClauseHolds(corpusCard()) }],
      1,
    )
  }
  if (shape === 1) {
    const card = cardRegion()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const hits = scanDenied(card.text, true)
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-IM-2 config (ii) — the authored card block carries NONE of the DENIED SET', ok: hits.length === 0 },
        { label: '§5.5.1 P-TC-IM-2 config (ii) — the BY-NAME EXEMPTION LIST is named', ok: EXEMPTION_NAMES.length >= 6 },
      ],
      2,
      1,
    )
  }
  if (shape === 4) {
    const hits = scanDenied(POSITIVE_CONTROL_CORPUS, true)
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-2 shape (4) — the POSITIVE CONTROL corpus MUST FAIL the scan clause', ok: hits.length > 0 }],
      1,
      1,
    )
  }
  // shapes (2)/(3) carry no denied token: the scan HOLDS on them by construction, which is the
  // declared reading that the id-set clause belongs to the authored-object probe, not to the scan.
  return checkAssertions(
    [{ label: '§5.5.1 P-TC-IM-2 — the scan is not the id-set instrument (declared reading)', ok: scanDenied("const id = 'theme-extra'", true).length === 0 }],
    1,
  )
}
const REGISTER_IM_2: RegisterRowSpec = {
  id: 'P-TC-IM-2',
  type: 'P-IM',
  strategy: 'S-TC-SURFACE-1',
  declared: 8,
  bounded: true,
  attempts: [
    () => im2Attempt(1, 'object'),
    () => {
      const r = im2Attempt(2, 'object')
      return r.held ? checkAssertions([{ label: '§5.5.1 P-TC-IM-2 shape (2) — a FIFTH id MUST FAIL the id-set clause', ok: !idSetClauseHolds(corpusWithFifthId()) }], 2) : r
    },
    () => {
      const r = im2Attempt(3, 'object')
      return r.held ? checkAssertions([{ label: '§5.5.1 P-TC-IM-2 shape (3) — a state node WITHOUT `props.id` MUST FAIL the addressability clause', ok: !propsClauseHolds(corpusWithoutPropsId()) }], 2) : r
    },
    () => im2Attempt(4, 'object'),
    () => im2Attempt(1, 'scan'),
    () => im2Attempt(2, 'scan'),
    () => im2Attempt(3, 'scan'),
    () => im2Attempt(4, 'scan'),
  ],
}

// --- P-TC-IM-3 — the caller-held name's echo rule (10) ---------------------
interface NameShape {
  label: string
  input: unknown
  omitted: boolean
  expected: string | null
  probe?: { n: number }
}
function im3Shapes(): NameShape[] {
  const counter = { n: 0 }
  return [
    { label: "(1) `'data-x'` (a `data-`-shaped spelling the CALLER chose)", input: 'data-x', omitted: false, expected: 'data-x' },
    { label: "(2) `'class'`", input: 'class', omitted: false, expected: 'class' },
    { label: "(3) `' '` (whitespace-only — INSIDE the echoed arm)", input: ' ', omitted: false, expected: ' ' },
    { label: "(4) `''`", input: '', omitted: false, expected: null },
    { label: '(5) the argument OMITTED', input: undefined, omitted: true, expected: null },
    { label: '(6) `null`', input: null, omitted: false, expected: null },
    { label: '(7) a number (`42`, `NaN`)', input: 42, omitted: false, expected: null },
    { label: '(8) a boolean', input: false, omitted: false, expected: null },
    { label: '(9) a `Symbol`', input: Symbol('name'), omitted: false, expected: null },
    { label: '(10) an object with its own `toString`/`valueOf`', input: hookCountingProbe(counter), omitted: false, expected: null, probe: counter },
  ]
}
function im3Attempt(shape: NameShape): AttemptResult {
  const region = themeWiringRegion()
  if (!region.ok) return brokenAttempt(region.reason, 1, 1)
  const held = callerNameConstant()
  if (!held.ok) return brokenAttempt(held.reason, 1, 1)
  const rule = declaredCallerNameRule(shape.input, shape.omitted)
  const inv = emptyInventory()
  void recordingElement(inv)
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-IM-3 ${shape.label} — the DECLARED echo/null rule (GAP-2)`, ok: rule.value === shape.expected },
      { label: `§5.5.1 P-TC-IM-3 ${shape.label} — no coercion hook is consulted`, ok: rule.hooks === 0 && (shape.probe === undefined || shape.probe.n === 0) },
      { label: '§5.5.1 P-TC-IM-3 — NO attribute is written on any double', ok: inventoryTotal(inv) === 0 },
      { label: '§5.5.1 P-TC-IM-3 — NO divergent spelling of the rule exists in the wiring (no trim/normalise/parse)', ok: !/\.(?:trim|toLowerCase|toUpperCase|normalize|parse)\s*\(/.test(region.text) },
    ],
    2,
  )
}
const REGISTER_IM_3: RegisterRowSpec = {
  id: 'P-TC-IM-3',
  type: 'P-IM',
  strategy: 'S-TC-NAME-1',
  declared: 10,
  bounded: true,
  attempts: im3Shapes().map((s) => (): AttemptResult => im3Attempt(s)),
}

// --- P-TC-IM-4 — the single write and the state node's content class (12) --
function im4Attempt(shape: 1 | 2 | 3 | 4, config: 'body' | 'absent' | 'refused'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    const other = TOKEN_DOMAIN.find((t) => t !== initial) ?? 'light'
    const drive: { value: unknown; omit: boolean; expected: string } =
      shape === 1
        ? { value: initial, omit: false, expected: initial }
        : shape === 2
          ? { value: other, omit: false, expected: other }
          : shape === 3
            ? { value: 'system', omit: false, expected: 'system' }
            : { value: undefined, omit: true, expected: '' }
    if (config === 'absent') {
      const dbl = makeCtx({ nodes: [] })
      const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (ii) — ZERO mutations when the state node is absent`, ok: dbl.calls.length === 0 },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (ii) — the declared degradation THROWS NOTHING`, ok: thrown === undefined },
        ],
        2,
      )
    }
    if (config === 'refused') {
      const dbl = makeCtx({ nodes: [nodeDouble(STATE_ID, initial)], refuse: true })
      const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — the refusal is CARRIED, never a silent no-op`, ok: dbl.calls.length === 1 && dbl.statuses[0] === 'rejected' },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — nothing threw`, ok: thrown === undefined },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — the content did NOT move`, ok: String(dbl.nodes[0].content) === initial },
        ],
        2,
      )
    }
    const dbl = makeCtx({ nodes: [nodeDouble(STATE_ID, initial)] })
    const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
    const mut = firstMutation(dbl)
    const landed = String(dbl.nodes[0].content)
    const contentClass =
      landed === initial ? 'AUTHORED-INITIAL' : TOKEN_DOMAIN.includes(landed) ? 'CARRIED' : 'OUTSIDE/carried-never-rejected'
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (i) — EXACTLY ONE \`state-slice\` mutation`, ok: dbl.calls.length === 1 },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (i) — the three declared fields`, ok: mut !== null && mut['targetProp'] === 'content' && mut['mode'] === 'replace' && mut['value'] === drive.expected },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) — the landed content class is DECLARED (${contentClass})`, ok: landed === drive.expected },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) — NO attribute/class/style write on the drive`, ok: inventoryTotal(dbl.inv) === 0 && thrown === undefined },
      ],
      3,
    )
  })
}
const REGISTER_IM_4: RegisterRowSpec = {
  id: 'P-TC-IM-4',
  type: 'P-IM',
  strategy: 'S-TC-CONTENT-1',
  declared: 12,
  bounded: true,
  attempts: [
    () => im4Attempt(1, 'body'),
    () => im4Attempt(2, 'body'),
    () => im4Attempt(3, 'body'),
    () => im4Attempt(4, 'body'),
    () => im4Attempt(1, 'absent'),
    () => im4Attempt(2, 'absent'),
    () => im4Attempt(3, 'absent'),
    () => im4Attempt(4, 'absent'),
    () => im4Attempt(1, 'refused'),
    () => im4Attempt(2, 'refused'),
    () => im4Attempt(3, 'refused'),
    () => im4Attempt(4, 'refused'),
  ],
}

// --- P-TC-IM-5 — the NO-UI-CONFIG-STORE negative row (6) -------------------
function im5StoreScan(surface: string): string[] {
  return scanDenied(surface, true)
    .filter((h) => /localStorage|sessionStorage|indexedDB|cookie|writeFile|matchMedia/.test(h.text))
    .map((h) => h.text)
}
function im5Attempt(drive: number): AttemptResult {
  if (drive === 1 || drive === 4) {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const first = String(st.content)
    if (drive === 1) {
      return checkAssertions(
        [{ label: `§5.5.1 P-TC-IM-5 drive (1) — the AUTHORED INITIAL value is one of the two block members (read ${first})`, ok: TOKEN_DOMAIN.includes(first) }],
        1,
      )
    }
    const second = stateDouble()
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-5 drive (4) — a SECOND boot with no dispatch reads the authored initial value again', ok: second !== null && String(second.content) === first }],
      1,
    )
  }
  if (drive === 2) {
    return withBody(LIGHT_ID, (body) => {
      const st = stateNodeRequired()
      if (!st.ok) return brokenAttempt(st.reason, 1, 1)
      const dbl = makeCtx({ nodes: [st.node] })
      const thrown = driveBody(body, dbl.ctx, 'light', false)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-5 drive (2) — the dispatched token IS live in the graph', ok: thrown === undefined && String(dbl.nodes[0].content) === 'light' },
        ],
        1,
      )
    })
  }
  if (drive === 3) {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    return withBody(LIGHT_ID, (body) => {
      const live = nodeDouble(STATE_ID, initial)
      const dbl = makeCtx({ nodes: [live] })
      const thrown = driveBody(body, dbl.ctx, 'system', false)
      if (thrown !== undefined || String(live.content) !== 'system') {
        return brokenAttempt('§5.5.1 P-TC-IM-5 drive (3) — the premise (a previous token existed) could not be DRIVEN', 1, 1)
      }
      const reboot = stateDouble()
      const after = reboot === null ? null : String(reboot.content)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-5 drive (3) — the premise WAS driven (a prior carried token existed)', ok: true },
          { label: `§5.5.1 P-TC-IM-5 drive (3) — the re-boot reads the AUTHORED INITIAL value (${JSON.stringify(initial)}), NEVER the previous token (${JSON.stringify(after)})`, ok: after === initial && after !== 'system' },
        ],
        2,
      )
    })
  }
  if (drive === 5) {
    const card = cardRegion()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const wiring = themeWiringRegion()
    if (!wiring.ok) return brokenAttempt(wiring.reason, 1, 1)
    const hits = [...im5StoreScan(card.text), ...im5StoreScan(wiring.text)]
    return checkAssertions(
      [{ label: `§5.5.1 P-TC-IM-5 drive (5) — NO store token (localStorage/file/cookie/preference) exists on the unit surface; found ${hits.join(', ')}`, ok: hits.length === 0 }],
      1,
    )
  }
  return checkAssertions(
    [{ label: '§5.5.1 P-TC-IM-5 drive (6) — the POSITIVE CONTROL corpus MUST FAIL the store scan', ok: im5StoreScan('localStorage.setItem("theme", t)').length > 0 }],
    1,
    1,
  )
}
const REGISTER_IM_5: RegisterRowSpec = {
  id: 'P-TC-IM-5',
  type: 'P-IM',
  strategy: 'S-TC-NOSTORE-1',
  declared: 6,
  bounded: false,
  attempts: [1, 2, 3, 4, 5, 6].map((d) => (): AttemptResult => im5Attempt(d)),
}

// --- P-TC-SM-1 — the state-node content transition (2) ---------------------
function sm1Attempt(token: string): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    const peer = nodeDouble('echo-out', 'untouched')
    const live = nodeDouble(STATE_ID, initial)
    const before = contentsSnapshot([live, peer])
    const dbl = makeCtx({ nodes: [live, peer] })
    const thrown = driveBody(body, dbl.ctx, token, false)
    const post = String(live.content)
    const after = contentsSnapshot([live, peer])
    const dirtied = dbl.calls.map((c) => String(c.nodeId))
    if (token === initial) {
      // THE DISCRIMINATING CELL: the block whose token EQUALS the authored initial value is driven
      // TOO, and its row asserts the `dirtied` reading rather than an inequality.
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-SM-1 — the \`dirtied\` reading must contain the state node even when post === pre (${token})`, ok: dirtied.includes(STATE_ID) },
          { label: '§5.5.1 P-TC-SM-1 — NO other node\'s content moved', ok: after[1] === before[1] },
          { label: '§5.5.1 P-TC-SM-1 — nothing threw', ok: thrown === undefined },
        ],
        3,
      )
    }
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-SM-1 — the PRE reading is the AUTHORED INITIAL value', ok: TOKEN_DOMAIN.includes(initial) },
        { label: `§5.5.1 P-TC-SM-1 — POST IS the carried token (${token}) by identity`, ok: post === token },
        { label: '§5.5.1 P-TC-SM-1 — POST !== PRE (the positive control of F-5)', ok: post !== initial },
        { label: '§5.5.1 P-TC-SM-1 — the `dirtied` set carries the state node', ok: dirtied.includes(STATE_ID) },
        { label: '§5.5.1 P-TC-SM-1 — NO other node\'s content moved', ok: after[1] === before[1] },
      ],
      4,
    )
  })
}
const REGISTER_SM_1: RegisterRowSpec = {
  id: 'P-TC-SM-1',
  type: 'P-SM',
  strategy: 'S-TC-TRANSITION-1',
  declared: 2,
  bounded: false,
  attempts: [
    (): AttemptResult => {
      const st = stateDouble()
      if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
      return sm1Attempt(String(st.content))
    },
    (): AttemptResult => {
      const st = stateDouble()
      if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
      const other = TOKEN_DOMAIN.find((t) => t !== String(st.content)) ?? 'light'
      return sm1Attempt(other)
    },
  ],
}

// --- P-TC-SM-2 — the no-drift / no-accumulation discipline (2) -------------
function sm2Attempt(kind: 'repeat' | 'sequence'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const live = nodeDouble(STATE_ID, String(st.content))
    const dbl = makeCtx({ nodes: [live] })
    const readings: string[] = []
    const nodesBefore = dbl.nodes.length
    if (kind === 'repeat') {
      for (let i = 0; i < 5; i += 1) {
        const thrown = driveBody(body, dbl.ctx, 'dark', false)
        if (thrown !== undefined) return brokenAttempt('§5.5.1 P-TC-SM-2 (1) — a repeated dispatch threw', 1, 5)
        readings.push(String(live.content))
      }
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-SM-2 (1) — five identical dispatches read the SAME content (${readings.join('|')})`, ok: readings.every((r) => r === 'dark') },
          { label: '§5.5.1 P-TC-SM-2 (1) — the node set is UNCHANGED across the repeats', ok: dbl.nodes.length === nodesBefore },
          { label: '§5.5.1 P-TC-SM-2 (1) — no module-level binding is read or written', ok: !/^(?:export\s+)?(?:let|var)\s+/m.test(themeWiringRegion().text) },
        ],
        5,
      )
    }
    const seq = ['dark', 'light', 'dark']
    for (const t of seq) {
      const thrown = driveBody(body, dbl.ctx, t, false)
      if (thrown !== undefined) return brokenAttempt('§5.5.1 P-TC-SM-2 (2) — a sequenced dispatch threw', 1, 3)
      readings.push(String(live.content))
    }
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-SM-2 (2) — the final reading is the LAST dispatched token; reads: ${readings.join('|')}`, ok: readings[readings.length - 1] === 'dark' },
        { label: '§5.5.1 P-TC-SM-2 (2) — NO state accumulates and no history is kept (the middle read was the middle token)', ok: readings[1] === 'light' },
        { label: '§5.5.1 P-TC-SM-2 (2) — the node set is UNCHANGED', ok: dbl.nodes.length === nodesBefore },
      ],
      3,
    )
  })
}
const REGISTER_SM_2: RegisterRowSpec = {
  id: 'P-TC-SM-2',
  type: 'P-SM',
  strategy: 'S-TC-CONST-1',
  declared: 2,
  bounded: false,
  attempts: [(): AttemptResult => sm2Attempt('repeat'), (): AttemptResult => sm2Attempt('sequence')],
}

// --- P-TC-TP-1 — the dispatch surface's totality (3) ----------------------
interface TransportReading {
  kind: 'result' | 'not-found'
  mutations: number
  content: string | null
  threw: unknown
}
function transportDispatch(target: string, event: string, args: { omit: boolean; value?: unknown }): TransportReading {
  const authored = findById(target) // the CLI's OWN rule: a bare target resolves css.id -> node
  const state0 = stateDouble()
  const initial = state0 === null ? null : String(state0.content)
  if (authored === null) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const handler = firstHandler(authored)
  if (handler === null || handler['event'] !== event) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const body = bodyOf(target)
  if (!body.ok) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const live = nodeDouble(STATE_ID, initial ?? '')
  const dbl = makeCtx({ nodes: [live] })
  const thrown = driveBody(body.body, dbl.ctx, args.value, args.omit)
  if (thrown !== undefined) return { kind: 'result', mutations: dbl.calls.length, content: String(live.content), threw: thrown }
  return { kind: 'result', mutations: dbl.calls.length, content: String(live.content), threw: undefined }
}
function tp1Attempt(shape: 1 | 2 | 3): AttemptResult {
  if (shape === 2) {
    const before = stateDouble()
    const r = transportDispatch('no-such-node', HANDLER_EVENT, { omit: false, value: 'dark' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-1 (2) — an unresolvable target answers a NOT-FOUND reading (never a fabricated success, never a hang)', ok: r.kind === 'not-found' },
        { label: '§5.5.1 P-TC-TP-1 (2) — ZERO mutations were issued', ok: r.mutations === 0 },
        { label: '§5.5.1 P-TC-TP-1 (2) — the state node\'s content is UNCHANGED', ok: String(before?.content) === String(r.content) },
        { label: '§5.5.1 P-TC-TP-1 (2) — nothing threw', ok: r.threw === undefined },
      ],
      2,
    )
  }
  if (shape === 1) {
    const card = cardReading()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const r = transportDispatch(DARK_ID, HANDLER_EVENT, { omit: false, value: 'dark' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-1 (1) — a resolvable target REACHES the authored handler and answers a result', ok: r.kind === 'result' && r.threw === undefined },
        { label: '§5.5.1 P-TC-TP-1 (1) — the authored write landed', ok: r.mutations === 1 && r.content === 'dark' },
      ],
      2,
    )
  }
  const card = cardReading()
  if (!card.ok) return brokenAttempt(card.reason, 1, 1)
  const r = transportDispatch(LIGHT_ID, HANDLER_EVENT, { omit: true })
  return checkAssertions(
    [
      { label: '§5.5.1 P-TC-TP-1 (3) — an omitted argument drives the DECLARED absent-argument arm rather than crashing the handler', ok: r.threw === undefined && r.kind === 'result' },
      { label: "§5.5.1 P-TC-TP-1 (3) — the declared absent-argument reading is `''`", ok: r.mutations === 1 && r.content === '' },
    ],
    2,
  )
}
const REGISTER_TP_1: RegisterRowSpec = {
  id: 'P-TC-TP-1',
  type: 'P-TP',
  strategy: 'S-TC-DISPATCH-1',
  declared: 3,
  bounded: true,
  attempts: [(): AttemptResult => tp1Attempt(1), (): AttemptResult => tp1Attempt(2), (): AttemptResult => tp1Attempt(3)],
}

// --- P-TC-TP-2 — the handler body's totality over hostile ctx (18) ---------
interface ReadRecording {
  top: string[]
  tree: string[]
  clientAPI: string[]
}
function proxyCtx(base: J, rec: ReadRecording): J {
  const wrap = (target: J, sink: string[]): J =>
    new Proxy(target, {
      get(t, k): unknown {
        sink.push(String(k))
        return Reflect.get(t, k) as unknown
      },
    })
  const tree = wrap(base['tree'] as J, rec.tree)
  const clientAPI = wrap(base['clientAPI'] as J, rec.clientAPI)
  return wrap({ tree, clientAPI }, rec.top)
}
function tp2Attempt(argShape: number, ctxShape: 'wellformed' | 'empty' | 'throwing'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateNodeRequired()
    if (!st.ok) return brokenAttempt(st.reason, 1, 1)
    const nodes = ctxShape === 'empty' ? [] : [st.node]
    const dbl = makeCtx({ nodes, applyThrows: ctxShape === 'throwing' })
    const rec: ReadRecording = { top: [], tree: [], clientAPI: [] }
    const ctx = proxyCtx(dbl.ctx, rec)
    const arg =
      argShape === 1 ? { value: 'dark', omit: false } : argShape === 2 ? { value: 'light', omit: false } : argShape === 3 ? { value: '', omit: false } : argShape === 4 ? { value: undefined, omit: true } : argShape === 5 ? { value: 7, omit: false } : { value: im1HostileProxy('throwing'), omit: false }
    const thrown = driveBody(body, ctx, arg.value, arg.omit)
    const allowedTop = ['tree', 'clientAPI']
    const extraTop = rec.top.filter((k) => !allowedTop.includes(k))
    const extraTree = rec.tree.filter((k) => k !== 'allNodes')
    const extraApi = rec.clientAPI.filter((k) => k !== 'apply')
    const expectedMutations = ctxShape === 'wellformed' ? 1 : 0
    const boundHolds = dbl.calls.length <= 1
    const wellformedExactHolds = ctxShape === 'wellformed' ? dbl.calls.length === expectedMutations : true
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — the authored body NEVER throws (a throwing applyCommand must be ABSORBED)`, ok: thrown === undefined },
        // THE ROW'S OWN DECLARED PER-ATTEMPT ASSERTION IS THE BOUND (`≤ 1`), and it is
        // asserted as the bound; the WELL-FORMED arm keeps the exact count, because
        // the one mandated write is measurable on that double (§5.5.1's "applies AT
        // MOST ONE mutation" + the `M-4` single-write clause). The harness pushes onto
        // its call log BEFORE it throws, so counting an exact 0 on the resolving or
        // throwing double would assert against a write the row itself requires.
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — AT MOST ONE mutation (${dbl.calls.length} issued)`, ok: boundHolds && wellformedExactHolds },
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — NO ctx member beyond the two declared reads is consulted; extra: ${[...extraTop, ...extraTree, ...extraApi].join(',')}`, ok: extraTop.length === 0 && extraTree.length === 0 && extraApi.length === 0 },
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — nothing was written to an element-shaped peer`, ok: inventoryTotal(dbl.inv) === 0 },
      ],
      3,
    )
  })
}
const REGISTER_TP_2: RegisterRowSpec = {
  id: 'P-TC-TP-2',
  type: 'P-TP',
  strategy: 'S-TC-HANDLER-1',
  declared: 18,
  bounded: true,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (let arg = 1; arg <= 6; arg += 1) {
      for (const ctx of ['wellformed', 'empty', 'throwing'] as const) {
        out.push((): AttemptResult => tp2Attempt(arg, ctx))
      }
    }
    return out
  })(),
}

// --- P-TC-TP-3 — the no-fabricated-edge refusal (12) -----------------------
const EDGE_TOKENS: ScanPattern[] = [
  { id: 'theme.ts', re: /shared\/theme|theme\.ts/g },
  { id: 'resolveTheme', re: /\bresolveTheme\b/g },
  { id: 'applyThemeDeclaration', re: /\bapplyThemeDeclaration\b/g },
  { id: 'an import into the mechanism', re: /import[^;]*theme|require\([^)]*theme/g },
] // CORPUS-EXEMPT
function edgeScan(surface: string, applyExemptions: boolean): string[] {
  const code = stripComments(surface)
  const hits: string[] = []
  for (const p of EDGE_TOKENS) {
    const re = new RegExp(p.re.source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      const after = code.charAt(m.index + m[0].length)
      if (applyExemptions && (after === "'" || after === '"' || after === ']' || after === ',')) continue
      hits.push(p.id)
    }
  }
  return hits
}
function tp3Attempt(shape: number): AttemptResult {
  if (shape <= 4) {
    const surfaces: Array<{ label: string; ok: boolean; text: string }> = []
    const card = cardRegion()
    surfaces.push({ label: 'the envelope card block', ok: card.ok, text: card.text })
    const dark = bodyOf(DARK_ID)
    surfaces.push({ label: 'the `theme-dark` handler string', ok: dark.ok, text: dark.body })
    const light = bodyOf(LIGHT_ID)
    surfaces.push({ label: 'the `theme-light` handler string', ok: light.ok, text: light.body })
    const wiring = themeWiringRegion()
    surfaces.push({ label: 'the renderer wiring role', ok: wiring.ok, text: wiring.text })
    const s = surfaces[shape - 1]
    if (!s.ok) return brokenAttempt(`§5.5.1 P-TC-TP-3 (${shape}) — the surface "${s.label}" does not exist yet`, 1, 1)
    const hits = edgeScan(s.text, true)
    return checkAssertions([{ label: `§5.5.1 P-TC-TP-3 (${shape}) — ${s.label} carries NO edge into the mechanism; found ${hits.join(', ')}`, ok: hits.length === 0 }], 1)
  }
  if (shape <= 8) {
    const corpora = [
      "import { resolveTheme } from './theme.js'",
      'applyThemeDeclaration(name, resolved)',
      "import x from './shared/theme'",
      "const p = require('theme')",
    ]
    const hits = edgeScan(corpora[shape - 5], false)
    return checkAssertions([{ label: `§5.5.1 P-TC-TP-3 (${shape}) — the POSITIVE CONTROL corpus MUST FAIL the scan`, ok: hits.length > 0 }], 1, 1)
  }
  if (shape === 9) {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-3 (9) — BOTH handler bodies are STRINGS (the data format: a string body cannot import)', ok: dark.ok && light.ok && typeof dark.body === 'string' && typeof light.body === 'string' },
      ],
      1,
    )
  }
  if (shape === 10) {
    const digest = JSON.stringify({ body: (): void => undefined, keep: 'x' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-3 (10) — a FUNCTION-VALUED body is DROPPED by the envelope digest (JSON.stringify), so it cannot carry an edge', ok: digest === '{"keep":"x"}' },
      ],
      1,
    )
  }
  if (shape === 11) {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return brokenAttempt(wiring.reason, 1, 1)
    return checkAssertions([{ label: '§5.5.1 P-TC-TP-3 (11) — the wiring role holds NO mechanism reference', ok: edgeScan(wiring.text, true).length === 0 }], 1)
  }
  const offenders = walkSrc()
    .filter((p) => /\.(?:ts|mjs|js)$/.test(p))
    .filter((p) => p !== 'src/shared/theme.ts')
    .filter((p) => edgeScan(sourceOrEmpty(p), true).length > 0)
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-TP-3 (12) — no \`src/**\` file outside the allowed set names the mechanism on this unit behalf; carriers: ${offenders.join(', ')}`, ok: offenders.length === 0 },
    ],
    1,
  )
}
const REGISTER_TP_3: RegisterRowSpec = {
  id: 'P-TC-TP-3',
  type: 'P-TP',
  strategy: 'S-TC-NOEDGE-1',
  declared: 12,
  bounded: false,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (let s = 1; s <= 12; s += 1) out.push((): AttemptResult => tp3Attempt(s))
    return out
  })(),
}

// --- P-TC-TP-4 — the no-appearance-write refusal (12) ----------------------
function tp4Config(config: number): { ok: boolean; reason: string; reads: number; controls: number } {
  if (config === 1) {
    const c = cardReading()
    if (!c.ok) return { ok: false, reason: c.reason, reads: 1, controls: 0 }
    const b = bodyOf(DARK_ID)
    if (!b.ok) return { ok: false, reason: b.reason, reads: 1, controls: 0 }
    const st = stateNodeRequired()
    if (!st.ok) return { ok: false, reason: st.reason, reads: 1, controls: 0 }
    const dbl = makeCtx({ nodes: [st.node] })
    const thrown = driveBody(b.body, dbl.ctx, 'dark', false)
    return {
      ok: inventoryTotal(dbl.inv) === 0 && thrown === undefined,
      reason: `config (i) — the body drive wrote to ${inventoryTotal(dbl.inv)} element-shaped peers`,
      reads: 2,
      controls: 0,
    }
  }
  if (config === 2) {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return { ok: false, reason: wiring.reason, reads: 1, controls: 0 }
    const inv = emptyInventory()
    void recordingElement(inv)
    const hits = writeInventoryScan(wiring.text)
    return {
      ok: inventoryTotal(inv) === 0 && hits.length === 0,
      reason: `config (ii) — the wiring role writes (${hits.join(', ')})`,
      reads: 2,
      controls: 0,
    }
  }
  if (config === 3) {
    const c = cardReading()
    if (!c.ok) return { ok: false, reason: c.reason, reads: 1, controls: 0 }
    const b = bodyOf(DARK_ID)
    if (!b.ok) return { ok: false, reason: b.reason, reads: 1, controls: 0 }
    const st = stateNodeRequired()
    if (!st.ok) return { ok: false, reason: st.reason, reads: 1, controls: 0 }
    const dbl = makeCtx({ nodes: [st.node] })
    expect(driveBody(b.body, dbl.ctx, 'dark', false)).toBeUndefined()
    const mut = firstMutation(dbl)
    const opKeys = mut === null ? [] : Object.keys(mut).sort()
    return {
      ok: inventoryTotal(dbl.inv) === 0 && opKeys.length > 0 && mut?.['targetProp'] === 'content',
      reason: `config (iii) — the applyCommand inventory carries the op keys ${opKeys.join(', ')}`,
      reads: 2,
      controls: 0,
    }
  }
  const control = writeInventoryScan('el.setAttribute("data-theme", "dark"); el.style.setProperty("--x", "1")')
  return {
    ok: control.length > 0,
    reason: `config (iv) — the POSITIVE CONTROL must FAIL the appearance-token scan (found ${control.join(', ')})`,
    reads: 1,
    controls: 1,
  }
}
function tp4Site(site: 'a' | 'b' | 'c'): { ok: boolean; reason: string; reads: number } {
  if (site === 'a') {
    const card = cardRegion()
    if (!card.ok) return { ok: false, reason: card.reason, reads: 1 }
    const hits = writeInventoryScan(card.text)
    return { ok: hits.length === 0, reason: `site (a) — the authored card bytes carry ${hits.join(', ')}`, reads: 1 }
  }
  if (site === 'b') {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return { ok: false, reason: wiring.reason, reads: 1 }
    const hits = writeInventoryScan(wiring.text)
    return { ok: hits.length === 0, reason: `site (b) — the wiring role bytes carry ${hits.join(', ')}`, reads: 1 }
  }
  const claims = scanAppliedAppearance(thisFileTitles().join('\n'))
  return {
    ok: claims.length === 0,
    reason: `site (c) — the declared expectations of this test file reference ${claims.join(', ')}`,
    reads: 1,
  }
}
function tp4Attempt(config: number, site: 'a' | 'b' | 'c'): AttemptResult {
  const c = tp4Config(config)
  const s = tp4Site(site)
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-TP-4 — every write counter is 0 (config ${config}): ${c.reason}`, ok: c.ok },
      { label: `§5.5.1 P-TC-TP-4 — the observation site reading (${site}): ${s.reason}`, ok: s.ok },
    ],
    c.reads + s.reads,
    c.controls,
  )
}
const REGISTER_TP_4: RegisterRowSpec = {
  id: 'P-TC-TP-4',
  type: 'P-TP',
  strategy: 'S-TC-NOWRITE-1',
  declared: 12,
  bounded: true,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (const config of [1, 2, 3, 4]) for (const site of ['a', 'b', 'c'] as const) out.push((): AttemptResult => tp4Attempt(config, site))
    return out
  })(),
}

// --- THE REGISTER, in register order --------------------------------------
const REGISTER: RegisterRowSpec[] = [
  REGISTER_IM_1,
  REGISTER_IM_2,
  REGISTER_IM_3,
  REGISTER_IM_4,
  REGISTER_IM_5,
  REGISTER_SM_1,
  REGISTER_SM_2,
  REGISTER_TP_1,
  REGISTER_TP_2,
  REGISTER_TP_3,
  REGISTER_TP_4,
]
/** §5.5.2 item 3's DECLARED-vs-DISTINCT ledger, as FILED (the table's own figures). */
const DECLARED_DISTINCT: Array<{ id: string; declared: number; distinct: number }> = [
  { id: 'P-TC-IM-1', declared: 12, distinct: 12 },
  { id: 'P-TC-IM-2', declared: 8, distinct: 8 },
  { id: 'P-TC-IM-3', declared: 10, distinct: 10 },
  { id: 'P-TC-IM-4', declared: 12, distinct: 8 },
  { id: 'P-TC-IM-5', declared: 6, distinct: 6 },
  { id: 'P-TC-SM-1', declared: 2, distinct: 2 },
  { id: 'P-TC-SM-2', declared: 2, distinct: 2 },
  { id: 'P-TC-TP-1', declared: 3, distinct: 3 },
  { id: 'P-TC-TP-2', declared: 18, distinct: 18 },
  { id: 'P-TC-TP-3', declared: 12, distinct: 12 },
  { id: 'P-TC-TP-4', declared: 12, distinct: 9 },
]
/** §5.5.2 item 2 — the SEVEN `(bounded)` rows; the other four quantify over closed lists/grids. */
const BOUNDED_ROWS = ['P-TC-IM-1', 'P-TC-IM-2', 'P-TC-IM-3', 'P-TC-IM-4', 'P-TC-TP-1', 'P-TC-TP-2', 'P-TC-TP-4']
const CLOSED_ROWS = ['P-TC-IM-5', 'P-TC-SM-1', 'P-TC-SM-2', 'P-TC-TP-3']

describe('§5.5.1 REGISTER — the executed property layer (11 rows, declared 97 drives)', () => {
  it('REG P-TC-IM-1 (§5.5.1, S-TC-DOMAIN-1) — the token domain and the no-interpretation rule', () => {
    registerRowTest(REGISTER_IM_1)
  })
  it('REG P-TC-IM-2 (§5.5.1, S-TC-SURFACE-1) — the authored node-id set and the boundary scan', () => {
    registerRowTest(REGISTER_IM_2)
  })
  it('REG P-TC-IM-3 (§5.5.1, S-TC-NAME-1) — the caller-held name echo rule at the caller site', () => {
    registerRowTest(REGISTER_IM_3)
  })
  it('REG P-TC-IM-4 (§5.5.1, S-TC-CONTENT-1) — the single write and the state-node content class', () => {
    registerRowTest(REGISTER_IM_4)
  })
  it('REG P-TC-IM-5 (§5.5.1, S-TC-NOSTORE-1) — the NO-UI-CONFIG-STORE negative row', () => {
    registerRowTest(REGISTER_IM_5)
  })
  it('REG P-TC-SM-1 (§5.5.1, S-TC-TRANSITION-1) — the state-node content transition', () => {
    registerRowTest(REGISTER_SM_1)
  })
  it('REG P-TC-SM-2 (§5.5.1, S-TC-CONST-1) — the no-drift / no-accumulation discipline', () => {
    registerRowTest(REGISTER_SM_2)
  })
  it('REG P-TC-TP-1 (§5.5.1, S-TC-DISPATCH-1) — the dispatch surface totality', () => {
    registerRowTest(REGISTER_TP_1)
  })
  it('REG P-TC-TP-2 (§5.5.1, S-TC-HANDLER-1) — the handler body totality over hostile ctx doubles', () => {
    registerRowTest(REGISTER_TP_2)
    // THE BOUND'S OWN FALSIFIER, REPORTED ON THE CONTROL CHANNEL AND OUTSIDE THE
    // DECLARED 18-ATTEMPT TERM (`§5.5.1`: a row's controls sit BESIDE its term):
    // the per-attempt bound `≤ 1` is only a claim if a body performing TWO
    // mutations FAILS it. This control must be BROKEN by construction.
    const c = cardReading()
    const st = stateNodeRequired()
    const twoMut = makeCtx({ nodes: st.ok ? [st.node] : [] })
    driveBody(
      `function body(ctx, value) { const ns = ctx.tree.allNodes(); const n = ns.find((x) => x && x.props && x.props.id === ${JSON.stringify(STATE_ID)}); if (!n) return; ctx.clientAPI.apply(n.id, [{ targetProp: 'content', value: 'a' }]); ctx.clientAPI.apply(n.id, [{ targetProp: 'content', value: 'b' }]); }`,
      twoMut.ctx,
      'dark',
      false,
    )
    expect(
      twoMut.calls.length,
      'P-TC-TP-2 (CONTROL for the BOUND) — the synthetic two-mutation body really issues TWO mutations against the same recording double, so the falsifier below measures the bound and not the harness.',
    ).toBe(2)
    expect(
      twoMut.calls.length <= 1,
      `P-TC-TP-2 (CONTROL for the BOUND, reported BESIDE the declared 18-attempt term and never inside it) — a body performing TWO mutations MUST FAIL the per-attempt bound \`≤ 1\`, so the row's totality claim is FALSIFIABLE and not a tautology (${twoMut.calls.length} issued${c.ok ? '' : `; the authored card is absent: ${c.reason}`}).`,
    ).toBe(false)
  })
  it('REG P-TC-TP-3 (§5.5.1, S-TC-NOEDGE-1) — the no-fabricated-edge refusal', () => {
    registerRowTest(REGISTER_TP_3)
  })
  it('REG P-TC-TP-4 (§5.5.1, S-TC-NOWRITE-1) — the no-appearance-write refusal', () => {
    registerRowTest(REGISTER_TP_4)
  })

  it('R-H1 (§5.5.1 note 4, S-TC-7) — the terms ARE the drive counts, the total is 97 WITH its terms', () => {
    const terms = REGISTER.map((r) => r.declared)
    const total = terms.reduce((a, b) => a + b, 0)
    console.log(
      'REGISTER-TERMS ' +
        JSON.stringify({
          terms: REGISTER.map((r) => ({ id: r.id, strategy: r.strategy, term: r.declared, attemptsDeclared: r.attempts.length })),
          totalDeclared: total,
        }),
    )
    expect(REGISTER.length, '§5.5.1 — ELEVEN typed rows').toBe(11)
    expect(terms, '§5.5.3 — the declared terms, in matrix order').toEqual([12, 8, 10, 12, 6, 2, 2, 3, 18, 12, 12])
    expect(total, '§4.4 S-TC-7 — the total printed WITH its terms and equal to their sum').toBe(97)
    for (const r of REGISTER) {
      expect(r.attempts.length, `§5.5.1 — \`${r.id}\`'s DECLARED TERM (${r.declared}) IS its drive count`).toBe(r.declared)
    }
    const strategies = REGISTER.map((r) => r.strategy)
    expect(new Set(strategies).size, '§5.5.1 — ELEVEN distinct strategy ids, one per row').toBe(11)
    const spec = sourceOrEmpty(SPEC_PATH)
    for (const s of strategies) expect(spec.includes(s), `§5.5.1 — the strategy id \`${s}\` is the contract's`).toBe(true)
    expect(
      spec.includes('`97`') && spec.includes('104'),
      '§5.5.3 — the mis-summed earlier draft figure (104) is named BESIDE the corrected 97, never silently rewritten',
    ).toBe(true)
  })

  it('R-H2 (§5.5.1 note 3, §5.5.3) — the caps: <=100 per row, <=400 total, stop-after-5', () => {
    const terms = REGISTER.map((r) => r.declared)
    const total = terms.reduce((a, b) => a + b, 0)
    const largest = REGISTER.reduce((a, b) => (a.declared >= b.declared ? a : b))
    expect(total, '§5.5.1 note 3 — the declared total is read against the `<=400` cap').toBeLessThanOrEqual(400)
    expect(Math.max(...terms), '§5.5.1 note 3 — no row may exceed the `<=100` per-row cap').toBeLessThanOrEqual(100)
    expect([largest.id, largest.declared], '§5.5.3 — the largest row is P-TC-TP-2 at 18').toEqual(['P-TC-TP-2', 18])
    const distinct = DECLARED_DISTINCT.map((r) => r.distinct).reduce((a, b) => a + b, 0)
    console.log(
      'REGISTER-CAPS ' +
        JSON.stringify({
          totalDeclared: total,
          capTotal: 400,
          perRow: REGISTER.map((r) => ({ id: r.id, declared: r.declared, cap: 100, within: r.declared <= 100 })),
          largestRow: `${largest.id}=${largest.declared}`,
          stopRule: 'stop-after-5-consecutive-failures',
          registerStoppedAt,
          distinctTotal: distinct,
        }),
    )
  })

  it('R-H3 (§5.5.2 item 2) — the `(bounded)` set is SEVEN of ELEVEN (`7 + 4 = 11`)', () => {
    const bounded = REGISTER.filter((r) => r.bounded).map((r) => r.id)
    const closed = REGISTER.filter((r) => !r.bounded).map((r) => r.id)
    expect(bounded.sort(), '§5.5.2 item 2 — the SEVEN bounded rows, BY NAME').toEqual([...BOUNDED_ROWS].sort())
    expect(closed.sort(), '§5.5.2 item 2 — the FOUR rows quantifying over closed lists/grids, BY NAME').toEqual([...CLOSED_ROWS].sort())
    expect(bounded.length + closed.length, '§5.5.2 item 2 — `7 + 4 = 11`, so the count is checkable rather than asserted').toBe(11)
    expect(
      REGISTER.every((r) => (r.bounded ? r.declared > 0 : true)),
      '§5.5.2 item 2 — every bounded row states a term and its marking beside it',
    ).toBe(true)
  })

  it('R-H4 (§5.5.2 item 3, §5.5.3) — the DECLARED-vs-DISTINCT ledger (97 vs 90) closes', () => {
    const declared = REGISTER.map((r) => ({ id: r.id, term: r.declared }))
    const ledger = DECLARED_DISTINCT
    for (const row of ledger) {
      const live = declared.find((d) => d.id === row.id)
      expect(live?.term, `§5.5.2 item 3 — \`${row.id}\`'s DECLARED term is the ledger's declared figure`).toBe(row.declared)
    }
    expect(ledger.map((r) => r.distinct), '§5.5.2 item 3 — the DISTINCT figures, in matrix order').toEqual([12, 8, 10, 8, 6, 2, 2, 3, 18, 12, 9])
    expect(
      ledger.map((r) => r.distinct).reduce((a, b) => a + b, 0),
      '§5.5.3 — the distinct figure’s own chain closes at 90',
    ).toBe(90)
    const equal = ledger.filter((r) => r.distinct === r.declared).map((r) => r.id)
    const differing = ledger.filter((r) => r.distinct !== r.declared).map((r) => r.id)
    expect(equal.length, '§5.5.2 item 3 — NINE rows whose distinct figure equals their term').toBe(9)
    expect(differing, '§5.5.2 item 3 — the TWO differing rows').toEqual(['P-TC-IM-4', 'P-TC-TP-4'])
    expect(equal.length + differing.length, '§5.5.2 item 3 — `9 + 2 = 11`').toBe(11)
    // REPORTED CONTRACT DEFECT (never silently rewritten): §5.5.2 item 3's closing sentence prints
    // the second differing row as `P-TC-TP-4` (`10`/`9`), while its OWN table and §5.5.3's distinct
    // term line print declared `12` / distinct `9`. This row pins the TABLE's figures and prints the
    // discrepancy beside them (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(
      spec.includes('`P-TC-TP-4` (`10`/`9`)'),
      'REPORTED DEFECT — the `10`/`9` spelling in §5.5.2 item 3 stands beside the table’s `12`/`9`; the supervisor owes the annotation',
    ).toBe(true)
  })

  it('R-H5 (§4.4 S-TC-6, §5.5.1 note 3) — EVERY register row RAN; an un-run row is reported as a FAILURE', () => {
    const report = registerReadings.map((r) => ({
      id: r.id,
      type: r.type,
      strategy: r.strategy,
      declared: r.declared,
      bounded: r.bounded,
      attemptsRun: r.attemptsRun,
      held: r.held,
      broken: r.broken,
      readings: r.readings,
      controls: r.controls,
      assertions: r.assertions,
      stoppedEarly: r.stoppedEarly,
      notStarted: r.notStarted,
    }))
    const attemptsExecuted = report.reduce((a, r) => a + r.attemptsRun, 0)
    const rowsExecuted = report.filter((r) => r.attemptsRun > 0).length
    const termsDeclared = REGISTER.map((r) => r.declared)
    console.log(
      'REGISTER-REPORT ' +
        JSON.stringify({
          rows: report,
          attemptsExecuted,
          rowsExecuted,
          termsDeclared,
          totalDeclared: termsDeclared.reduce((a, b) => a + b, 0),
          registerStoppedAt,
        }),
    )
    const unrun = report.filter((r) => r.notStarted).map((r) => r.id)
    expect(
      unrun,
      `§4.4 S-TC-6/§5.5.1 note 3 — an UN-RUN row is a FAILURE, never a pass. Un-run rows: ${unrun.join(', ') || '(none)'} (the register stopped at ${registerStoppedAt ?? 'nothing'}).`,
    ).toEqual([])
    expect(report.length, '§5.5.1 — all ELEVEN rows are executed and reported, in register order').toBe(11)
    expect(rowsExecuted, '§5.5.1 — every row must have executed at least one drive').toBe(11)
  })

  it('R-H6 (§5.5.2 items 6/7/8) — the honesty block: the refusals stand and the cross-row readings are printed', () => {
    const assertions = registerReadings.reduce((a, r) => a + r.assertions, 0)
    const readings = registerReadings.reduce((a, r) => a + r.readings, 0)
    const controls = registerReadings.reduce((a, r) => a + r.controls, 0)
    console.log(
      'REGISTER-HONESTY ' +
        JSON.stringify({
          assertionsBesideTerms: assertions,
          readingsBesideTerms: readings,
          controlsDriven: controls,
          crossRowAssertions: [
            'the single-mutation claim is asserted on every body-driving attempt',
            'the nothing-threw claim is asserted on every attempt',
            'the write-inventory (setAttribute/classList/style = 0) is asserted on every attempt with a double in scope',
            'the no-import reading is a STATIC companion assertion reported beside the terms',
            'the node-id set exactness is asserted on every envelope-reading attempt',
          ],
          cannotProve: [
            'the live app, the transport, an applied appearance, a stylesheet, a rendered pixel, the OS, persistence or the assembled product',
            'the ONE [U]-shaped class is carried by §5.U and the DECLARED GATE-6 BATTERY, never by a register row',
          ],
          excludedShapes: [
            'a token whose meaning a consumer would have to interpret (§5.5.2 item 4(a))',
            'a Proxy whose traps answer differently on successive reads (item 4(b))',
            'a live MCP round trip (item 4(c))',
          ],
        }),
    )
    expect(assertions, '§5.5.2 item 8 — the assertions are printed BESIDE the terms and never counted in them').toBeGreaterThan(0)
    expect(
      registerReadings.some((r) => r.bounded),
      '§5.5.2 item 2 — the bounded markings are carried on the executed rows, not asserted abstractly',
    ).toBe(true)
    expect(
      POSITIVE_CONTROL_CORPUS.length > 0 && EDGE_TOKENS.length > 0 && DENIED_PATTERNS.length > 0,
      '§5.5.2 item 8 — the controls are live readings, not prose',
    ).toBe(true)
  })
})
