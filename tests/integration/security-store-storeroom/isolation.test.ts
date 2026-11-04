// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/security-store-storeroom/isolation.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 3: THE SIX ISOLATION ABSENCES AND THE SETTLED ROUTE QUESTION.
//
// THE CONTRACT: docs/L1/security-store-storeroom.md §6 (`ISO-1`..`ISO-6`) and
// docs/L2/security-store-storeroom/interface.md §6, and behaviour.md §9 ("RQ-1"). D-18 makes the
// control ABSENCE, ASSERTED: each row states that nothing resolves, and drives that over a live
// surface or over the files the MCP stack actually reaches — never inferred from a code read in
// prose.
//
// REV 2 — THE FOUR RE-GRAINS the L2 examiner's FAIL binds this file to, and the limit each one
// now states in its own message instead of passing silently:
//   · `ISO-3` no longer tests a six-string regex over source bytes. The union's every member must
//     now be ANSWERED — by a `handleRequest` dispatch arm or by a registered tool name — so a
//     member spelled `settings.get` or `operator.write` fails the row. The dispatch arms and the
//     `MUTATING_METHODS` set are not exported, so THAT limb is a declaration read and the row says
//     so out loud; the member census itself is driven against the live `ALL_TOOLS`.
//   · `ISO-4` now scans EVERY `ipcRenderer` call site in `src/**` and the renderer's own `declare
//     global` half, so a fourth channel spelled in `secure-panels.ts`, or a raw `ipcRenderer.invoke`
//     outside the bridge, fails. The security channels are counted by constant VALUE, live.
//   · `ISO-5`'s scanned set is no longer a hand-list: it is the TRANSITIVE IMPORT CLOSURE of
//     `mcp-server.ts` and `security.ts` over `src/**`, which reaches `src/shared/types.ts`,
//     `store-channels.ts` (through the composition), `module-store.ts`, `renderer/extensions.ts`
//     and `data/**`; and it now asserts the CONSTRUCTION CENSUS its own `behaviour.md` §9 cell
//     attributes to it.
//   · `ISO-6` scans that same closure for the name AND for every fragment of it, and for any other
//     `provident-*.json` literal the stack would need in order to compose the name at run time.
//
// REV 3 — `ISO-5` AND `ISO-6` NOW SCAN **CODE**, NOT PROSE, and the absence they assert does not move.
// Both rows matched raw file text, so both went red on `src/main/storeroom.ts` for its HEADER COMMENT —
// the line that names the operator-settings instance while documenting the seam honestly — which
// measures the comment, not a reference: a comment cannot hold a reference, call a constructor or
// compose a path. Every byte the two rows match against now comes from `codeOnly()` (below), which
// strips comments and keeps string/template/regex bodies VERBATIM, because a name spelled in a literal
// is a name a drive could pass and stripping it would weaken the claim. Every pattern and every absence
// assertion is unchanged. Each row carries the CONTROLS that keep it from going vacuously green: every
// reference FORM is asserted to be read in code, prose spelled the same way is asserted NOT to be, a
// real reference in a real file is asserted to survive the strip, and a reference PLANTED in a real file
// is asserted to REDDEN the row — driven through the row's own filter, so "no hit" is a measurement.
// L2's two cells now read "references" as well (`behaviour.md` §9, Rev 8), so document and battery
// agree on the verb the claim is made with.
//
// THIS FILE IMPORTS NO HALF OF THE SUBJECT. The instance module and the surface module are the
// SUBJECT of these absences and are never imported here (D-18, examiner.md §3). The red-before-green
// rows that drive the two modules are `instance.test.ts` and `surface.test.ts` beside this file.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { tabsDeclaredRoots } from '../../../src/main/tabs-record'
import { viewDeclaredRoots } from '../../../src/main/view-record'
import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate, groupForTool, toolAllowed, type ToolGroup } from '../../../src/main/security.js'
import * as storeChannels from '../../../src/main/store-channels.js'
import * as sharedTypes from '../../../src/shared/types.js'

/** The instance's file name — interface.md §2.1, persistence.md §1. It is a literal here ON PURPOSE:
 *  a row that imported it from the module could not assert its ABSENCE (`ISO-6`). */
const OPERATOR_FILE = 'provident-operator-settings.json'
const PROFILE_FILE = 'provident-profile.json'
const RECORD_ADDRESS = 'operator-settings'
const VOLATILE_ADDRESS = 'operator-exclusion'

/** The five bridge route spellings — `src/shared/types.ts:282-286`, read as data (`ISO-3`, `RQ-1`). */
const DATA_ROUTES = ['data.read', 'data.write', 'data.delete', 'data.list', 'data.journal'] as const

/** The 27 `RpcMethod` members as filed at `0eca66b` (`src/shared/types.ts:259-286`). */
const RPC_METHODS = [
  'dispatch', 'renderedHtml', 'markdown', 'listTargets', 'nodeState', 'load', 'op', 'export',
  'validate', 'teardown', 'code.get', 'code.set', 'code.create', 'code.delete', 'code.validate',
  'code.load', 'code.loadBatch', 'journal', 'module.install', 'module.update', 'module.list',
  'focus', 'data.read', 'data.write', 'data.delete', 'data.list', 'data.journal',
] as const

/** The seven `MUTATING_METHODS` as filed (`src/renderer/renderer.ts:829`). */
const MUTATING = ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal'] as const

/** The nine top-level `window.provident` members, in the SORTED order the row compares against — seven at the date this
 *  header was written, and each move below is dated rather than silent (`D-93`, `D-112`). */
// ⟶ **THE MEMBER LEAVES THE LOCKSTEP PAIR AND THE SET MOVES `9 -> 8` (2026-11-03, `D-93`).** `'store'` was the frozen
// graph store's THREE-member namespace (Y-1 · Y-2 · Y-3) and it is DELETED whole with the store it served; `D-90`'s clause
// (3) named "the two preload members" as the only main-side surface that existed for the projection. **NO MEMBER REPLACES
// IT** — the tab record's crossing and the view record's are the two that carry the data now, and both already stand. The
// set-equality still bites: a ninth member of ANY name reddens this row.
// ⟶ **AND THE SET MOVES `8 -> 9` ON 2026-11-04 (`D-112`), WITH THE DATE STATED BESIDE THE ROW IT MOVES.** The pass that
// answers the five `data.*` members of `RpcMethod` gives this realm a route to the boot's ONE profile store: `preload.ts`
// gains ONE top-level `data` member carrying the five routes and `secure-panels.ts` declares the same text in lockstep. The
// equality is a set claim over what the bridge CARRIES, so a TENTH member — or the `data` member losing one of its five
// routes, which `ISO-4`'s route half reads — still reddens it. `D-112` adds no MCP tool, resource or group: `ISO-3`'s
// 27-member union and seven-member `MUTATING_METHODS` are unmoved and say why in their own bytes.
const BRIDGE_MEMBERS = ['data', 'module', 'notify', 'onRequest', 'ready', 'security', 'sendReply', 'tabs', 'view'] as const // ⟶ D-63: eight; D-87: nine; D-93: eight; D-112: nine

const SRC_DIR = fileURLToPath(new URL('../../../src', import.meta.url))
const MAIN_DIR = join(SRC_DIR, 'main')
const REPO = new URL('../../../', import.meta.url)

const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')
const textOf = (absolute: string): string => readFileSync(absolute, 'utf8')

/** **COMMENT LINES ELIDED** — every absence assertion in this file reads CODE, never prose. The headstones this pass
 *  leaves in `src/` NAME the machinery they record (that is `D-46`'s annotate-beside discipline), and a raw-bytes scan
 *  would read its own description as its own hit. A line whose trimmed form opens `//`, `*` or `/*` is blanked, and a
 *  trailing `//` is cut, so what remains is the code the assertion is about. */
function commentElided(bytes: string): string {
  return bytes
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return ''
      const at = line.indexOf('//')
      return at >= 0 ? line.slice(0, at) : line
    })
    .join('\n')
}
const rel = (absolute: string): string => absolute.slice(SRC_DIR.length + 1).split('\\').join('/')

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const at = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(at))
    else if (entry.name.endsWith('.ts')) out.push(at)
  }
  return out
}

/** **THE ISOLATION CLAIM IS ABOUT REFERENCES, SO THE SCAN IS TAKEN OVER CODE AND NEVER OVER PROSE.**
 *  A comment cannot hold a reference, call a constructor or compose a path, and a scanner that cannot
 *  tell prose from code measures the comment instead of the reference: `ISO-5`/`ISO-6` were red on
 *  `src/main/storeroom.ts` only for the HEADER COMMENT that names the operator-settings instance while
 *  documenting the seam honestly (`storeCreate` in the operator-settings instance is the other …), so a
 *  row that reddens when somebody writes the truth down is not measuring isolation at all (D-18,
 *  `examiner.md` §2).
 *
 *  WHAT IS STRIPPED, AND WHAT IS NEVER STRIPPED — the second half is what keeps the claim load-bearing:
 *   · comments go: `//` to end of line, and `/* … *\/` including a doc block. Every stripped character
 *     becomes a SPACE and newlines are kept, so the output has the SAME LENGTH as the input and a hit
 *     can be mapped straight back to the line it stands on.
 *   · **string, template and regex bodies are kept VERBATIM.** A name spelled in a literal is a name a
 *     drive could pass to the store — `'provident-operator-settings.json'` in `FILE_NAME` is exactly the
 *     reference `ISO-6` is about — so stripping literals would WEAKEN the claim rather than sharpen it.
 *     A template's `${…}` is code and is read as code.
 *   · a `//` or `/*` inside any of those bodies is NOT a comment (a URL, an escaped pattern), which is
 *     what the divide-vs-regex read below is for.
 *
 *  PRECEDENT: `stripComments()` in `tests/ui-leg-contract.test.ts` strips the same way for its
 *  instrument rows. (No `codeOnly()` helper stands in `tests/unit/settings-surface/surface.test.ts` at
 *  this head — that file carries no comment stripper — so this function cites the one that does.) */
function codeOnly(source: string): string {
  const out = source.split('')
  const blank = (at: number): void => { if (out[at] !== '\n') out[at] = ' ' }
  type Mode = 'code' | 'line' | 'block' | 'single' | 'double' | 'template' | 'regex'
  let mode: Mode = 'code'
  let inClass = false
  let prev = '' // the last significant character of CODE, for the divide-vs-regex read
  let word = '' // the identifier run just read, for `return /x/`, `typeof /x/` and friends
  const braces: number[] = [] // one entry per open `${ … }`: the brace depth inside it
  const regexKeywords = new Set(['return', 'typeof', 'case', 'in', 'of', 'do', 'else', 'void', 'delete', 'instanceof', 'new', 'yield', 'await'])
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i]
    const next = source[i + 1]
    if (mode === 'line') {
      if (ch === '\n') mode = 'code'
      else blank(i)
      continue
    }
    if (mode === 'block') {
      if (ch === '*' && next === '/') { blank(i); blank(i + 1); i += 1; mode = 'code' }
      else blank(i)
      continue
    }
    if (mode === 'single' || mode === 'double' || mode === 'template' || mode === 'regex') {
      if (ch === '\\') { i += 1; continue }
      if (mode === 'single' && ch === "'") { mode = 'code'; prev = ')' }
      else if (mode === 'double' && ch === '"') { mode = 'code'; prev = ')' }
      else if (mode === 'template' && ch === '`') { mode = 'code'; prev = ')' }
      else if (mode === 'template' && ch === '$' && next === '{') { braces.push(0); mode = 'code'; prev = '{'; i += 1 }
      else if (mode === 'regex' && inClass) { if (ch === ']') inClass = false }
      else if (mode === 'regex' && ch === '[') inClass = true
      else if (mode === 'regex' && ch === '/') { mode = 'code'; prev = ')' }
      continue
    }
    if (ch === '/' && next === '/') { blank(i); blank(i + 1); i += 1; mode = 'line'; continue }
    if (ch === '/' && next === '*') { blank(i); blank(i + 1); i += 1; mode = 'block'; continue }
    if (ch === '/') {
      const starts = prev === '' || '(,=:[!&|?{};+-*%~^<>'.includes(prev) || regexKeywords.has(word)
      if (starts) { mode = 'regex'; inClass = false; prev = '/'; word = ''; continue }
    }
    if (ch === "'") { mode = 'single'; word = ''; continue }
    if (ch === '"') { mode = 'double'; word = ''; continue }
    if (ch === '`') { mode = 'template'; word = ''; continue }
    if (ch === '{' && braces.length > 0) { braces[braces.length - 1] += 1; prev = ch; word = ''; continue }
    if (ch === '}') {
      if (braces.length > 0 && braces[braces.length - 1] === 0) { braces.pop(); mode = 'template'; prev = '}'; word = ''; continue }
      if (braces.length > 0) braces[braces.length - 1] -= 1
      prev = ch
      word = ''
      continue
    }
    if (/\s/.test(ch)) continue
    if (/[A-Za-z0-9_$]/.test(ch)) word += ch
    else word = ''
    prev = ch
  }
  return out.join('')
}

const ALL_SRC = walk(SRC_DIR)

/** THE TRANSITIVE IMPORT CLOSURE of the MCP stack's two entry files over `src/**`.
 *  Every relative specifier is followed, `import type` included — a type-only edge still names the
 *  file in the stack's own declaration, which is what `ISO-5` and `ISO-6` are about. Bare specifiers
 *  (packages, `node:`, `electron`) are skipped: they are not files in this tree (D-18). */
function importClosure(entries: string[]): string[] {
  const spec = /(?:from|import|require)\s*[(\s]\s*['"]([^'"]+)['"]/g
  const seen = new Set<string>()
  const queue = [...entries]
  while (queue.length > 0) {
    const file = queue.shift() as string
    if (seen.has(file) || !existsSync(file)) continue
    seen.add(file)
    for (const match of textOf(file).matchAll(spec)) {
      const target = match[1]
      if (!target.startsWith('.')) continue
      const base = resolve(dirname(file), target)
      const candidates = [base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts')]
      for (const candidate of candidates) {
        if (candidate.startsWith(SRC_DIR) && existsSync(candidate) && candidate.endsWith('.ts') && statSync(candidate).isFile()) {
          queue.push(candidate)
          break
        }
      }
    }
  }
  return [...seen].sort()
}

/** The MCP stack's reach: the server, the gate, both entry hosts and everything they import. */
const MCP_CLOSURE = importClosure([
  join(MAIN_DIR, 'mcp-server.ts'),
  join(MAIN_DIR, 'security.ts'),
  join(MAIN_DIR, 'battery-host.ts'),
  join(MAIN_DIR, 'standalone.ts'),
])

/** The `security` member's route names, out of a bridge declaration block, at whatever its own
 *  indentation is — so `preload.ts`'s and `secure-panels.ts`'s halves are read by ONE reader. */
function securityRoutesOf(source: string, label: string): string[] {
  const marker = /^(\s*)security[?]?:\s*\{/m.exec(source)
  if (marker === null) throw new Error(`${label}: no \`security\` member is declared`)
  const indent = marker[1].length
  const after = source.slice(marker.index)
  const close = new RegExp(`\\n\\s{${indent}}\\}`, 'm').exec(after)
  if (close === null) throw new Error(`${label}: the \`security\` member's close is not found at its own indent`)
  const body = after.slice(0, close.index)
  return [...body.matchAll(new RegExp(`^\\s{${indent + 2}}(\\w+)\\s*\\(`, 'gm'))].map((match) => match[1]).sort()
}

const backend: McpBackend = { invoke: async () => ({}) }

interface Live {
  server: ProvidentMcpServer
  client: Client
  /** The profile directory the drive owns, so a row can assert what stands in it. */
  profileDir: string
  close(): Promise<void>
}

/** The boundary `src/main/main.ts` composes: a gate, the server and the declared `dataSurface`.
 *  The subject here is the MCP surface, never a stand-in for it (`examiner.md` §2). */
async function live(groups: ToolGroup[]): Promise<Live> {
  const profileDir = mkdtempSync(join(tmpdir(), 'security-store-isolation-'))
  // THE BOOT'S CONSTRUCTION, STOOD BY THIS BATTERY (`src/main/main.ts:132`): `DataSurfaceOptions.store` is REQUIRED
  // and the surface's own construction is deleted (D-80), so the drive owns one instance at the profile's one name
  // exactly as the composition does. The construction creates that name, which is why the control below asserts the
  // file's PRESENCE after a commit rather than its absence before one.
  const store = createProfileStore({ filePath: join(profileDir, PROFILE_FILE) })
  const gate = new SecurityGate({ token: null, enabled: groups })
  const server = new ProvidentMcpServer({ backend, gate, transport: 'stdio', dataSurface: createDataSurface({ profileDir, store, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }) })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'security-store-isolation', version: '0.0.0' })
  await client.connect(clientTransport)
  return {
    server,
    client,
    profileDir,
    close: async () => {
      await client.close()
      rmSync(profileDir, { recursive: true, force: true })
    },
  }
}

async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
  const result = await client.callTool({ name, arguments: args }) as unknown
  const content = (result as { content?: Array<{ type?: string; text?: string }> }).content
  return JSON.parse(content?.[0]?.text ?? '{}') as Record<string, unknown>
}

describe('security-store-storeroom · the isolation absences (D-18, L1 §6)', () => {
  it('ISO-1 · no provident.data.* tool reads or writes an operator-settings member or the instance file', async () => {
    const { client, profileDir, close } = await live(['read', 'dispatch', 'data'])
    try {
      const listed = (await client.listTools()).tools.map((tool) => tool.name)
      for (const name of DATA_TOOL_NAMES) {
        expect(listed.includes(name), `the row needs the tool present to drive it: ${name}`).toBe(true)
      }
      const answers: Record<string, unknown>[] = []
      answers.push(await call(client, 'provident.data.list', {}))
      answers.push(await call(client, 'provident.data.read', { path: ['alpha'] }))
      answers.push(await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' }))
      answers.push(await call(client, 'provident.data.journal', {}))
      answers.push(await call(client, 'provident.data.delete', { path: ['alpha'] }))

      // THE CONTROL, so the absences below are not a blanket: the drive really reached the
      // profile store, and it owns its own file.
      expect(answers[2].status, 'the third drive committed through the profile store').toBe('committed')
      expect(existsSync(join(profileDir, PROFILE_FILE)), 'the data surface writes its own file, not the instance’s').toBe(true)

      // THE POSITIVE HALF — the sibling's own declared refusal keeps an operator-shaped path out
      // (docs/L2/central-data/interface.md §1; L1 §6 `ISO-1`'s second sentence).
      const volatile = await call(client, 'provident.data.write', { path: ['secure.token'], value: 'x' })
      expect({ status: volatile.status, reason: volatile.reason }, 'a `secure.` spelling is refused by the profile surface, so no data tool reaches a tier-4 row by name').toEqual({ status: 'refused', reason: 'volatile-path' })

      for (const answer of answers) {
        const text = JSON.stringify(answer)
        for (const token of [OPERATOR_FILE, RECORD_ADDRESS, VOLATILE_ADDRESS, 'tier4', 'maxJournalLength']) {
          expect(text.includes(token), `no provident.data.* answer names the security record: ${token} in ${text}`).toBe(false)
        }
      }
      expect(existsSync(join(profileDir, OPERATOR_FILE)), 'no drive created a byte of the instance’s own file').toBe(false)
    } finally {
      await close()
    }
  })

  it('ISO-2 · no MCP resource resolves into the instance: exactly three URIs on the three landed readings', async () => {
    const { server, client, close } = await live(['read', 'dispatch'])
    try {
      const uris = (await client.listResources()).resources.map((resource) => resource.uri)
      const templates = (await client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect([...uris, ...templates].sort(), 'the resource seam is unmoved at three — two fixed URIs and one template').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
      const readings = ProvidentMcpServer.ALL_RESOURCES.map((entry) => entry.method).sort()
      expect(readings, 'each resource resolves to one of the three landed readings, and none to a store').toEqual(['listTargets', 'nodeState', 'renderedHtml'])
      expect(server.allowedResourceUris().sort(), 'and the live gate allows the same three, not a fourth').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
    } finally {
      await close()
    }
  })

  it('ISO-3 · every RpcMethod member is ANSWERED by the tree, so no member can name a security write; MUTATING_METHODS stays seven', () => {
    const types = sourceOf('src/shared/types.ts')
    const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
    expect(block, 'src/shared/types.ts declares the RpcMethod union').not.toBeNull()
    const members = [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(members, 'the union is 27 members and its order is the filed one').toEqual([...RPC_METHODS])

    // LIMB ONE — LIVE. Every name the server can register is a member of the union or one of the
    // four read tools whose tool spelling differs from its method spelling. This is the limb that
    // makes an added member a finding: a spelling the union does not carry cannot be answered.
    const toolNames = ProvidentMcpServer.ALL_TOOLS.map((name) => name.replace(/^provident\./, ''))
    for (const name of toolNames) {
      if (['get_rendered_html', 'get_markdown', 'list_targets', 'get_node_state'].includes(name)) continue
      expect(members.includes(name), `the server registers a tool the RpcMethod union must carry: ${name}`).toBe(true)
    }
    for (const name of DATA_TOOL_NAMES) {
      expect(members.includes(name.replace(/^provident\./, '')), `every data tool is a union member: ${name}`).toBe(true)
    }

    // LIMB TWO — STRUCTURAL, and named as such. `handleRequest`'s dispatch arms are not exported,
    // so the twenty-seven members' ANSWERABILITY by the renderer's own switch is a declaration
    // read; it is a read of the DISPATCH SURFACE rather than of the subject's internals. A member
    // with neither a dispatch arm nor a registered tool — `settings.get`, `operator.write`, any
    // fourth route — fails RIGHT HERE, which the six-string spelling test this row used to run
    // could not do.
    const renderer = sourceOf('src/renderer/renderer.ts')
    const arms = new Set([...renderer.matchAll(/^\s*case '([^']+)':/gm)].map((match) => match[1]))
    for (const member of members) {
      const answered = arms.has(member) || toolNames.includes(member)
      expect(answered, `no dispatch arm and no registered tool answers this RpcMethod member, and a member nothing answers cannot be a security path either: ${member}`).toBe(true)
    }

    // LIMB THREE — the mutating set, which is not a union and not exported either: a source read,
    // stated as one. A security write joining it would make the transition a journaled mutation.
    const mutating = /const MUTATING_METHODS = new Set\(\[([^\]]*)\]\)/.exec(renderer)
    expect(mutating, 'src/renderer/renderer.ts declares MUTATING_METHODS').not.toBeNull()
    const names = [...(mutating?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(names, 'the mutating set is seven, and no security write joins it').toEqual([...MUTATING])
  })

  it('ISO-4 · no bridge channel carries a security write but the three, over a NINE-member bridge — the eighth is the tab record\'s (D-63), the ninth the view record\'s (D-87) and the `data` member the five `data.*` routes\' (D-112) — in both lockstep declarations', () => {
    const preload = sourceOf('src/main/preload.ts')
    const start = preload.indexOf('export interface ProvidentBridge {')
    const end = preload.indexOf('\n}', start)
    expect(start, 'src/main/preload.ts declares ProvidentBridge').toBeGreaterThan(-1)
    const block = preload.slice(start, end)
    const members = [...block.matchAll(/^ {2}(\w+)(?:\(|:)/gm)].map((match) => match[1]).sort()
    expect(members, 'the bridge carries NINE top-level members, and the row still asserts the set it declares: the `store` namespace left at D-93 and no member replaced it, and D-112\'s `data` member is a crossing this tree answers (interface.md §5 A-1; D-63, D-87, D-93, D-112)').toEqual([...BRIDGE_MEMBERS])
    expect(preload.split("contextBridge.exposeInMainWorld('provident'").length - 1, 'one exposure of one bridge').toBe(1)

    // LIMB TWO — THE LOCKSTEP HALF. `preload.ts` and `secure-panels.ts` re-declare the same
    // `security` member and must move together, so a fourth route spelled in the RENDERER's half
    // alone is a finding here even though `preload.ts` reads clean.
    const preloadRoutes = securityRoutesOf(preload, 'src/main/preload.ts')
    const panelsRoutes = securityRoutesOf(sourceOf('src/renderer/secure-panels.ts'), 'src/renderer/secure-panels.ts')
    /* ⟶ **RE-GRAINED `2026-11-03` (`D-106`): FOUR ROUTES, THREE OF THEM REQUESTS.** The set was exactly the three manual-UI
     * requests, and this row's claim is that no bridge channel carries a security WRITE but the three. `D-106` gives the
     * record a DELIVERY, so `onChanged` joins the member — it subscribes and writes nothing, so the claim is unmoved and the
     * set is one wider. **THE BOUND IS KEPT, NOT WIDENED**: a FIFTH route, or a fourth request, still fails this equality. */
    expect(preloadRoutes, 'the security member carries exactly the three manual-UI requests plus the record’s one delivery').toEqual(['get', 'onChanged', 'set', 'setExclusion'])
    expect(preloadRoutes.filter((route) => route !== 'onChanged'), 'and the request set is unmoved: three routes, name for name — no channel carries a security write but these').toEqual(['get', 'set', 'setExclusion'])
    expect(panelsRoutes, 'and the renderer’s `declare global` half carries the SAME four — a half-widening or a fifth route fails').toEqual(preloadRoutes)

    // LIMB THREE — THE RAW-CALL SITE. `ipcRenderer` is obtainable only from `electron`, so the one
    // file in `src/**` that imports it is the bridge: any other file able to `invoke` a channel
    // would carry a security write outside the three, and it cannot, because it cannot reach one.
    const holders = ALL_SRC.filter((file) => /\bipcRenderer\b/.test(commentElided(textOf(file))))
    expect(holders.map(rel).sort(), 'only the preload bridge holds `ipcRenderer`; no file may reach a channel behind its back').toEqual(['main/preload.ts'])

    // LIMB FOUR — THE CHANNEL CENSUS, BY VALUE AND LIVE. Three security channels exist in the
    // shared vocabulary, and they are the three the bridge exposes.
    const vocabulary: unknown[] = [...Object.values(sharedTypes), ...Object.values(storeChannels)]
    const securityChannels = vocabulary
      .filter((value): value is string => typeof value === 'string' && /security/i.test(value))
      .sort()
    /* ⟶ **RE-GRAINED `2026-11-03` (`D-106`)**: four, not three — the three request channels and the record's own DELIVERY,
     * which carries no request and is answered by no `ipcMain.handle` site. The claim this limb makes is that the vocabulary
     * is CLOSED, so a fifth is still a finding. */
    expect(securityChannels, 'the shared channel vocabulary carries exactly four security channels — the three requests and the one delivery — and no fifth').toEqual(['provident:security:changed', 'provident:security:exclusion', 'provident:security:get', 'provident:security:set'])
  })

  it('ISO-5 · no file in the MCP stack’s import closure REFERENCES the instance, its module or its constructor, and exactly one construction site stands outside each module', () => {
    const named = /operator-settings|operator-exclusion|createOperatorSettings|createSettingsSurface|settings-surface/
    // THE SCAN IS OVER CODE, NOT OVER PROSE (`codeOnly` above): a comment cannot hold a reference or
    // call a constructor, so a file that merely MENTIONS the module while documenting the seam is not
    // a violation of this row — which is what the `src/main/storeroom.ts` header does, honestly.
    expect(MCP_CLOSURE.length, 'the closure is computed, not hand-listed — it reaches every file the stack imports, `import type` included').toBeGreaterThan(5)

    // THE CONTROLS, so the stripping cannot have left this row green and EMPTY. First, every reference
    // FORM the claim is about must still be seen once the comments are gone…
    const referenceForms = [
      "import { createOperatorSettings } from '../operator-settings/index.js'",
      'const instance = createOperatorSettings({ userDataDir })',
      'const surface = createSettingsSurface({ userDataDir })',
      "const address = ['operator-exclusion']",
      'const modulePath = "src/main/settings-surface/index.ts"',
    ]
    for (const form of referenceForms) {
      expect(named.test(codeOnly(form)), `the scan still READS a reference written in code: ${form}`).toBe(true)
    }
    // …then prose must not be seen at all: these are the shapes that made the row red, and they are
    // comments, so the strip removes them before any pattern is applied.
    const proseForms = [
      '// `storeCreate` in the operator-settings instance is the other (`brief.md` §2, D-16).',
      '/* the operator-settings instance, the operator-exclusion address and settings-surface',
      '   are named here in prose, and this row must not read a comment as a reference */',
    ]
    expect(named.test(codeOnly(proseForms.join('\n'))), 'and it does NOT read prose as a reference: comments are stripped before the match').toBe(false)
    // …and the stripper is not blanking real code either: the file that holds the one real construction
    // still reads as a reference AFTER the strip, though it stands outside this closure and is never hit.
    expect(named.test(codeOnly(textOf(join(SRC_DIR, 'main', 'settings-surface', 'index.ts')))), 'a real construction in a real file survives the strip, so the controls and the scan read the same way').toBe(true)

    // THE PLANTED REFERENCE — the row's OWN filter, driven against a real file, so "no hit" below is a
    // measurement and not a blanket: a reference written in code lands in `hits` and would redden this
    // row, exactly as an over-broad COMMENT no longer does.
    const plantDir = mkdtempSync(join(tmpdir(), 'security-store-isolation-plant-'))
    try {
      const planted = join(plantDir, 'planted.ts')
      writeFileSync(planted, "import { createOperatorSettings } from '../operator-settings/index.js'\nconst instance = createOperatorSettings({ userDataDir })\n")
      const found = [...MCP_CLOSURE, planted].filter((file) => named.test(codeOnly(textOf(file)))).map((file) => (file === planted ? '<the planted reference>' : rel(file)))
      expect(found, 'a reference planted in a real file REDDENS this row: the scan is strict about code and blind only to prose').toEqual(['<the planted reference>'])
    } finally {
      rmSync(plantDir, { recursive: true, force: true })
    }

    const hits = MCP_CLOSURE.filter((file) => named.test(codeOnly(textOf(file))))
    expect(hits.map(rel), 'no file the MCP stack reaches REFERENCES the instance, so no drive there can hold a reference to it — the match is over CODE, so a comment naming the module is prose and not a hit, while any reference in code is (a module path composed at RUN TIME is invisible to this closure, and the row says so rather than passing silently)').toEqual([])

    // THE CONSTRUCTION CENSUS its own behaviour.md §9 cell attributes to this row: the instance is
    // constructed in exactly one file, and that file is the surface module's; the surface is
    // constructed in exactly one file, and that file is the composition site. Read over CODE for the
    // same reason: a comment naming a constructor constructs nothing.
    const instanceSites = ALL_SRC.filter((file) => !rel(file).startsWith('main/operator-settings/') && codeOnly(textOf(file)).includes('createOperatorSettings('))
    expect(instanceSites.map(rel), 'the instance is constructed in exactly one file, and it is inside the surface module that holds the one reference (D-18, interface.md §5 ASM-L2-8)').toEqual(['main/settings-surface/index.ts'])

    const surfaceSites = ALL_SRC.filter((file) => !rel(file).startsWith('main/settings-surface/') && codeOnly(textOf(file)).includes('createSettingsSurface('))
    expect(surfaceSites.map(rel), 'the surface is constructed at the composition site and nowhere else (interface.md §5)').toEqual(['main/main.ts'])
  })

  it('ISO-6 · the instance file’s name is spelled in no file the MCP stack reaches, and nothing there composes one', () => {
    const fragments = [OPERATOR_FILE, 'provident-operator', RECORD_ADDRESS, VOLATILE_ADDRESS]
    // THE SCAN IS OVER CODE, NOT OVER PROSE (`codeOnly` above): this row is about a name a drive could
    // actually USE — a literal it could pass, an address a call could take — and a comment that spells
    // the name while documenting the seam holds neither. String literals are NOT stripped: a name inside
    // one is precisely a literal a drive could pass, so removing them would weaken the claim.
    const inCode = (text: string): boolean => {
      const code = codeOnly(text)
      return fragments.some((fragment) => code.includes(fragment))
    }

    // THE CONTROLS, so the stripping cannot have left this row green and EMPTY. Every shape a real name
    // or address takes in code must still be seen…
    const codeForms = [
      "const at = join(dir, 'provident-operator-settings.json')",
      "await store.write(['operator-settings'], 'file', value)",
      "await store.write(['operator-exclusion'], 'mem', { exclusion })",
      "const composed = join(dir, 'provident-operator' + '.json')",
    ]
    for (const form of codeForms) {
      expect(inCode(form), `the scan still READS a name or address written in code: ${form}`).toBe(true)
    }
    // …prose must not be seen at all…
    const proseForms = [
      '// the instance’s file is `provident-operator-settings.json`, and its addresses are',
      '/* `operator-settings` on `file` and `operator-exclusion` on `mem` — all of it prose */',
    ]
    expect(inCode(proseForms.join('\n')), 'and it does NOT read prose as a spelling: comments are stripped before the match').toBe(false)
    // …and the stripper is not blanking real code: the module that OWNS the name still spells it in code
    // after the strip (`FILE_NAME`), though that file is outside this closure and is never hit.
    expect(inCode(textOf(join(SRC_DIR, 'main', 'operator-settings', 'index.ts'))), 'a real name in real code survives the strip, so the controls and the scan read the same way').toBe(true)

    // THE PLANTED SPELLING — the row's own `inCode` over a real file, so "no hit" below is a measurement
    // and not a blanket: a name or an address written in CODE lands in `hits` and reddens this row, which
    // is precisely what a comment spelling the same name no longer does.
    const plantDir = mkdtempSync(join(tmpdir(), 'security-store-isolation-plant-'))
    try {
      const planted = join(plantDir, 'planted.ts')
      writeFileSync(planted, "import { join } from 'node:path'\nconst at = join(dir, 'provident-operator-settings.json')\n")
      const found = [...MCP_CLOSURE, planted].filter((file) => inCode(textOf(file))).map((file) => (file === planted ? '<the planted spelling>' : rel(file)))
      expect(found, 'a file NAME planted in real code REDDENS this row: the scan is strict about code and blind only to prose').toEqual(['<the planted spelling>'])
    } finally {
      rmSync(plantDir, { recursive: true, force: true })
    }

    const hits: string[] = []
    for (const file of MCP_CLOSURE) {
      if (inCode(textOf(file))) hits.push(file)
    }
    expect(hits.map(rel), 'no reachable file SPELLS the instance’s own name or either of its addresses IN CODE, so no drive can even name it — the match is over CODE, so a comment spelling the name is prose and not a hit').toEqual([])

    // THE COMPOSITION HALF. A path assembled at run time from pieces never appears as a literal, so
    // this limb cannot see it — it asserts what CAN be seen, and says so: the closure's own
    // `provident-*.json` literals are the carriers other modules own, so no third name is
    // available to compose the instance's file out of (`persistence.md` §8).
    const literals = new Set<string>()
    for (const file of MCP_CLOSURE) for (const match of codeOnly(textOf(file)).matchAll(/provident-[a-z0-9-]+\.json/g)) literals.add(match[0])
    // ⟶ RE-GRAINED UNDER `E-5` (`settings-carrier-retirement`, L1 §6/§9 E-5): **THE ALLOWED SET
    // SHRINKS FROM TWO NAMES TO ONE — `['provident-profile.json']` — AND THE CLAIM DOES NOT MOVE.**
    // `provident-settings.json` was tier 1's hand-written carrier and `main.ts` spelled it at its
    // `settingsPath`; this unit DELETED that path, the boot read, the guarded second read and the whole
    // tmp+rename+fsync writer (L1 §3's closed removal list, E-1), so the MCP closure now has ONE
    // foreign literal to allow and the retired name has none. The retirement is ASSERTED below rather
    // than assumed: a set that shrank because a name silently reappeared elsewhere would be a finding,
    // and shrinking the list without checking would make the shrink unfalsifiable.
    const allowedForeignLiterals = ['provident-profile.json']
    const foreign = [...literals].filter((name) => !allowedForeignLiterals.includes(name)).sort()
    expect(foreign, 'every `provident-*.json` literal in the stack names another module’s carrier; a third name is a finding, and a path so composed at run time would be invisible to a byte scan — which this row names rather than pretends otherwise').toEqual([])
    expect(literals.has('provident-settings.json'), 'and the RETIRED carrier’s literal stands in NO file the stack reaches — the name left the tree with the writer (L1 §3), so its absence is exactly why the allowed set could shrink').toBe(false)
  })

  it('RQ-1 · the group cannot gate a route: each data.* spelling resolves to no group, under either grant (interface.md §6)', () => {
    for (const route of DATA_ROUTES) {
      expect(groupForTool(route), `the gate's own table has no row for a bridge route: ${route}`).toBeNull()
      expect(toolAllowed(route, ['read', 'dispatch']), `with the group off the route is ungrouped, not refused: ${route}`).toBe(false)
      expect(toolAllowed(route, ['read', 'dispatch', 'data']), `with the group on it is still ungrouped: ${route}`).toBe(false)
    }
    // THE CONTROL, so the reading above is not a blanket false: the TOOL spelling IS grouped.
    expect(groupForTool('provident.data.read'), 'the tool spelling resolves to the sixth group; the route spelling does not').toBe('data')
    expect(toolAllowed('provident.data.read', ['read', 'dispatch', 'data'])).toBe(true)
  })
})
