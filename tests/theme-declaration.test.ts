// tests/theme-declaration.test.ts — **THE APPEARANCE DECLARATION IS APPLIED FROM THE CROSSING'S RECORD, AND NEVER COMPUTED
// HERE** (`D-97`; this file's rows were `D-96`'s and are RE-GRAINED onto the shape the instruction asks for).
//
// THE INSTRUCTION THIS FILE ANSWERS, VERBATIM: **"No boot time declarations — Use constraint repairs"**. `D-96` wired
// `resolveTheme`/`applyThemeDeclaration` into `src/renderer/renderer.ts`'s `startThemeDeclaration` and drove it from the app's
// reply notify, with a `changed` record bolted on so a boot would not move the rendered surface. That whole shape is
// DELETED: the resolution is now produced by the crossing's constraint repair (`theme-must-stand`,
// `src/main/view-record/index.ts`), stored on the view record beside the pane geometry, the mirror and the zone family, and
// this realm APPLIES it — `props.<name>` as ONE `state-slice` on the AUTHORED state node, the write surface `D-96` established.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked-file` marker and GATES (`AGENTS.md`). Its subject is
// not the mechanism — `tests/theme.test.ts` (58 rows) owns the pure surface, `tests/store-modules-seams.test.ts` the register,
// and `tests/integration/store-view-record/theme-family.test.ts` the crossing's four clauses — it is the WIRING:
//
//   · T-1  A USER ACTION reaches the crossing as an ACT: the authored control moves the setting, the wiring's `commit` turn
//          reads it, and the ROUTE is handed the setting and the caller-held attribute name — and NO declaration.
//   · T-2  THE DELIVERY APPLIES WHAT THE RECORD CARRIES: the crossing's repair resolves the act, the record's declaration
//          reaches the AUTHORED node as `props.<name>`, and `renderedHtml` moves. **THE NAME IS THE RECORD'S**, which the row
//          proves by driving a record whose declaration names a different attribute.
//   · T-3  THE REMOVAL ARM is the record's `removal` member reaching the node as `undefined` — never an empty string.
//   · T-4  **NOTHING IS APPLIED AT A BOOT** — measured three times: on a FRESH profile the record a boot carries is the
//          placeholder and its declaration names no attribute; on a profile that ALREADY CARRIES a legal declaration naming an
//          attribute the boot read STILL writes nothing, and applying that same record by hand proves it composes a real
//          write. **FROM `D-98` THE SILENCE IS THE BOOT PATH'S AND NOT THE RECORD'S** — the tier is `file`, so a later boot's
//          record can name an attribute, and what keeps a boot silent is that `fill()` adopts and never applies.
//   · T-5  THE RENDERER COMPUTES NOTHING: over comment-elided code, `resolveTheme`/`applyThemeDeclaration` appear nowhere in
//          the renderer, no hand-written DOM is written, and no timer or poll stands in the wiring. **AND THE DELIVERY'S
//          HAND-OFF IS READ STRUCTURALLY** — `main()`'s ONE call to `startViewShape` hands it the appearance application as
//          its FIRST argument (whatever a second, drag-owned turn is handed beside it), and the shape's ONE subscription body
//          **calls EVERY turn it was handed — FOUR of them, each NAMED off the declaration's head and each measured in that
//          body**: the appearance application, the ghost's transient, the read-out, and the LAYOUT PAINT (`S-6`/`D-194`). The row
//          re-grains from the literal to the hand-off, so the next turn given a seat in that call reds this file no more
//          (`docs/L3/renderer-wiring/design.md` §4/§6; `signatures.md` §6's same edit).
//   · T-6  TOTALITY: an unreadable carrier, a realm with no crossing, a record with no applicable declaration and a runtime
//          whose write throws all answer a READING — never an exception.
//
// The `Runtime` is the APP's own (`src/renderer/runtime.ts`) over the AUTHORED envelope (`src/shared/demo-envelope.ts`),
// mounted on the DOM shim. **THE CROSSING IS REAL AND NODE-SIDE**: the rows below build a `provident-storeroom` instance with
// the module's own batch and wrap it in the client's bridge, so the act's route, the repair and the delivery are the app's
// chain rather than a modelling of it. A node-suite green is envelope-green and never app-green (`AGENTS.md`); the LIVE
// instruments are `npm run divergence` and the app itself.

import { describe, it, expect, beforeAll } from 'vitest'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { getViewClient, startThemeApplication, themeWiringRole, type ThemeApplication, type ThemeApplicationReading } from '../src/renderer/renderer.js'
// ⟶ `D-120`: the mechanism itself, so the SHELL'S RULES are gated against the declaration it produces rather than against
// a spelling this row re-types. The renderer still imports neither name (T-5 measures that), and this file's own licence
// to run them is the mechanism's, not the wiring's.
import { applyThemeDeclaration, resolveTheme } from '../src/shared/theme.js'
import { createViewClient, type ViewClient, type ViewClientBridge } from '../src/renderer/view-client.js'
import { createProfileStore } from '../src/main/storeroom.js'
import { createViewRecord, viewConstraintDeclarations, type ViewRecordStore } from '../src/main/view-record/index.js'

beforeAll(() => {
  installShim()
})

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RENDERER_PATH = `${ROOT}src/renderer/renderer.ts`

/** The authored state node's own spelling, taken from the corpus's declared holder rather than re-typed here. */
const STATE_NODE = 'theme-setting'
const PLACEHOLDER = { token: null, attribute: null, declaration: { name: null, value: '', removal: true } }

/** **THE CROSSING, REAL — a fresh `provident-storeroom` instance carrying the module's whole batch**, with the holder bound
 *  the way the boot binds it (only after the construction answers), the record read over it, and the bridge INSTALLED AS THE
 *  AMBIENT MEMBER this realm reads (`window.provident.view`, read at call time by `src/renderer/view-client.ts`). That is the
 *  app's own route: a node realm has no `window`, which is exactly the absent case the client's header declares. */
interface Crossing {
  readonly record: ReturnType<typeof createViewRecord>
  readonly close: () => void
}

function crossing(seed?: (profilePath: string) => void): Crossing {
  const dir = mkdtempSync(join(tmpdir(), 'theme-application-'))
  const bound: { current: ViewRecordStore | null } = { current: null }
  const profilePath = join(dir, 'provident-profile.json')
  // **THE SEED IS WRITTEN BEFORE THE CONSTRUCTION** (`D-98`): a `file` family's boot datum is the FILE, so a row that needs a
  // profile a PREVIOUS boot wrote has to hand the store its bytes, and a fresh profile is the seed's own absence.
  if (seed !== undefined) seed(profilePath)
  const store = createProfileStore({
    filePath: profilePath,
    constraints: viewConstraintDeclarations(() => bound.current).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current })
  // **THE SEVEN MEMBERS THE BRIDGE NOW DECLARES, AND `commitFocus` IS NOT ONE OF THEM** (`D-142`; L1 §2's `chrome` row, §6
  // `E-12`; the count moved five → seven with the drag pair, L2 app-shell §3's block, D-132): the
  // `['focus']` family goes whole — address, tier, declaration, declared-root entry, route and mirror — so this literal
  // carried a member the bridge no longer declares and the record no longer answers. Re-grained in the deletion's own pass,
  // because a literal that spells the old surface is a compile-time red in `typecheck:tests` the moment `E-1`/`E-2`/`E-3`/`E-4`
  // land. No row here ever drove that member: every row below is the APPEARANCE declaration's.
  const bridge: ViewClientBridge = {
    read: async () => record.read(),
    commitPane: async (id: string, geometry: unknown) => record.commitPane(id, geometry),
    commitZones: async (id: string, zone: unknown) => record.commitZones(id, zone),
    // **THE ACT'S ROUTE, AS THE BRIDGE DECLARES IT** — the crossing's own `commitTheme`, called with the caller's pair.
    commitTheme: async (token: string, attributeName: string) => record.commitTheme(token, attributeName),
    // **THE GESTURE'S PAIR, AND IT IS CARRIED RATHER THAN DRIVEN** (`D-132`, L2 §3's SEVEN-line block, D-112): the `view`
    // member widened to seven in BOTH halves (`src/main/preload.ts`, `src/renderer/secure-panels.ts`), so this literal — the
    // third copy that must agree — names them too, in the block's order and with the block's own parameter text. **NO ROW IN
    // THIS FILE DRIVES EITHER**: every row below is the APPEARANCE declaration's, and the gesture's own rows are
    // `pane-drag-temp`'s. They are transcribed from the record's own verbs, so a rename in `src/main/view-record/index.ts`
    // reddens here rather than drifting silently.
    commitDrag: async (id: string, geometry: unknown) => record.commitDrag(id, geometry),
    clearDrag: async () => record.clearDrag(),
    // **THE PUSH, MODELLED AT THE CROSSING AND NOWHERE ELSE**: the record's own subscription, so a committed act reaches the
    // client the moment the crossing commits it — which is what makes the rows below the app's chain rather than a script.
    onChanged: (handler: () => void): (() => void) => record.subscribe(handler),
  }
  ;(globalThis as Record<string, unknown>).window = { provident: { view: bridge } }
  return {
    record,
    close: () => {
      delete (globalThis as Record<string, unknown>).window
      bound.current = null
      rmSync(dir, { recursive: true, force: true })
    },
  }
}

/** The realm's ONE client, as every row reads it — the app holds the same identity (`getViewClient()`). */
const realm = (): ViewClient => getViewClient()

/** **ONE DELIVERY'S SETTLE** — the push is asynchronous because a delivery is a RE-READ (`view-client.ts`'s own note), so a
 *  row that just committed an act waits for the read it caused. Three microtask turns is what this chain spends: the
 *  route's promise, the client's fill, and the caller's handler. */
const settle = async (): Promise<void> => {
  for (let n = 0; n < 4; n += 1) await Promise.resolve()
}

/** The authored node's OWN reading, through the runtime's graph read — the surface `provident.get_node_state` answers on. */
function authored(runtime: Runtime): { content: unknown; props: Record<string, unknown> } {
  const answer = runtime.nodeState(STATE_NODE) as { states?: { content?: unknown; props?: Record<string, unknown> }[] }
  const first = answer.states?.[0]
  return { content: first?.content, props: first?.props ?? {} }
}

/** Drive the authored appearance control the way the app's own surface does: `provident.dispatch <cssId> click [token]`. */
async function dispatchTheme(runtime: Runtime, cssId: string, token?: unknown): Promise<void> {
  await runtime.dispatch(
    token === undefined
      ? { target: { kind: 'cssId', cssId }, event: 'click' }
      : { target: { kind: 'cssId', cssId }, event: 'click', args: [token] },
  )
}

/** The rendered attribute a `props.<name>` write becomes, read off `get_rendered_html`'s own answer. */
function renderedAttribute(runtime: Runtime, name: string): string | null {
  const html = runtime.renderedHtmlResult().renderedHtml
  const tag = new RegExp(`<div[^>]*id="${STATE_NODE}"[^>]*>`).exec(html)?.[0] ?? ''
  const value = new RegExp(`\\s${name}="([^"]*)"`).exec(tag)
  return value === null ? null : value[1]
}

/** Comment lines elided — the discipline every absence assertion in this corpus uses, so prose cannot answer for code. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

/** The balanced region of one top-level declaration, for the source rows. */
function regionOf(src: string, declaration: string): string {
  const at = src.indexOf(declaration)
  if (at < 0) return ''
  const open = src.indexOf('{', at)
  if (open < 0) return ''
  let depth = 0
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '{') depth += 1
    else if (src[i] === '}') {
      depth -= 1
      if (depth === 0) return src.slice(at, i + 1)
    }
  }
  return ''
}

/** The top-level comma-separated parts of an argument or parameter list — PARENTHESIS, BRACKET and BRACE balance only, so a
 *  nested call, an array literal or an object literal stays ONE part instead of splitting the list in the wrong place. */
function listParts(list: string): readonly string[] {
  const parts: string[] = []
  let depth = 0
  let from = 0
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === '(' || list[i] === '[' || list[i] === '{') depth += 1
    else if (list[i] === ')' || list[i] === ']' || list[i] === '}') depth = depth > 0 ? depth - 1 : 0
    else if (list[i] === ',' && depth === 0) {
      parts.push(list.slice(from, i))
      from = i + 1
    }
  }
  parts.push(list.slice(from))
  return parts.map((part) => part.trim()).filter((part) => part !== '')
}

/** **THE ARGUMENT LIST OF EVERY CALL TO `name`, sliced by its OWN parenthesis balance** — a source probe that reads the
 *  HAND-OFF (a call's arguments) rather than a literal spelling, so a turn added beside the ones a row cares about cannot red
 *  it. A declaration's head (`function name(`) is NOT a call and is skipped by its keyword. */
function callArgumentsOf(src: string, name: string): readonly string[] {
  const calls: string[] = []
  const needle = `${name}(`
  let at = src.indexOf(needle)
  while (at >= 0) {
    const open = at + needle.length - 1
    let depth = 0
    let close = -1
    for (let i = open; i < src.length; i += 1) {
      if (src[i] === '(') depth += 1
      else if (src[i] === ')') {
        depth -= 1
        if (depth === 0) {
          close = i
          break
        }
      }
    }
    if (close > open && !/(?:function|const|let|var)\s+$/.test(src.slice(Math.max(0, at - 12), at))) {
      calls.push(src.slice(open + 1, close))
    }
    at = src.indexOf(needle, open + 1)
  }
  return calls
}

/** The FIRST argument of one argument list — the hand-off's own subject, read independently of what is handed beside it. */
function firstArgumentOf(args: string): string {
  return listParts(args)[0] ?? ''
}

/** The parameter NAMES of one declaration, read off its head's own list, so a body can be asked what it CALLS without this
 *  file re-typing the name: a rename in the declaration moves both sides of the probe together. */
function parameterNamesOf(src: string, declaration: string): readonly string[] {
  const at = src.indexOf(declaration)
  if (at < 0) return []
  const open = src.indexOf('(', at)
  if (open < 0) return []
  let depth = 0
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '(') depth += 1
    else if (src[i] === ')') {
      depth -= 1
      if (depth === 0) {
        return listParts(src.slice(open + 1, i))
          .map((part) => part.split(/[:\s]/)[0].replace(/\?$/, ''))
          .filter((parameter) => parameter !== '')
      }
    }
  }
  return []
}

function boot(): Runtime {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  return runtime
}

// ───────────────────────────────────────────────────────────────────────────
// T-1 — THE USER ACTION IS THE ROUTE'S ONLY CAUSE, AND IT CARRIES NO DECLARATION
// ───────────────────────────────────────────────────────────────────────────
describe('D-97 · the appearance act, from the authored control to the crossing and back', () => {
  it('T-1 — THE USER ACTION REACHES THE CROSSING AS AN ACT: the authored control moves the setting, the `commit` turn reads it and sends EXACTLY ONE route call carrying the setting and the caller-held attribute name — and the record stands at the resolution the crossing\'s repair produced, not at anything this realm computed', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application: ThemeApplication = startThemeApplication(runtime)
      // THE HOLDERS ARE THE CORPUS'S OWN ROLE'S, not re-spelled here.
      expect([application.attributeName, application.nodeId], 'the role carries the caller-supplied attribute NAME and the AUTHORED state node id').toEqual(themeWiringRole(runtime))
      expect(application.nodeId, 'the derived carrier is the state node the envelope authors').toBe(STATE_NODE)

      // A BOOT IS NOT AN ACT: the first turn reads the authored setting and, because nothing has carried it yet, sends it —
      // that is `D-96`'s "a realm that has carried nothing sends what it finds" — and the crossing resolves it.
      await dispatchTheme(runtime, 'theme-light', 'light')
      expect(authored(runtime).content, 'the authored state moved to the caller\'s own token').toBe('light')
      const sent = application.commit()
      expect([sent.setting, sent.changed, sent.sent], 'the act carries the setting and is SENT').toEqual(['light', true, true])
      expect(sent.declaration, 'and this realm composes NO declaration — the turn hands the crossing an act').toBe(null)

      // **THE RECORD THE CROSSING STANDS AT** — read off the crossing itself, not off a claim: the pair resolved the act.
      const standing = bridge.record.read().theme
      expect(standing, 'the record carries the setting, the caller-held name, and the mechanism\'s own declaration').toEqual({
        token: 'light',
        attribute: 'theme',
        declaration: { name: 'theme', value: 'light', removal: false },
      })
      expect(bridge.record.read().source.theme, 'and the family STANDS — a repair put it there').toBe('record')

      // A SECOND TURN WITH NOTHING MOVED SENDS NOTHING: the reply that moved no setting carries no act.
      const again = application.commit()
      expect([again.changed, again.sent], 'an unchanged setting is not an act').toEqual([false, false])
      // AND A SETTING THAT MOVES IS SENT AGAIN, on the same application.
      await dispatchTheme(runtime, 'theme-dark', 'dark')
      expect(application.commit().setting, 'the turn is keyed on the setting, not on a one-shot flag').toBe('dark')
    } finally {
      bridge.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-2 — THE DELIVERY APPLIES THE RECORD'S DECLARATION, AND THE NAME IS THE RECORD'S
  // ─────────────────────────────────────────────────────────────────────────
  it('T-2 — THE DELIVERY APPLIES WHAT THE RECORD CARRIES: the crossing\'s repair resolves the act, the record\'s declaration lands on the AUTHORED node as `props.<name>`, `renderedHtml` moves — and a record whose declaration names ANOTHER attribute renders THAT one, which is what proves the name is read from the record rather than held here', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      const before = runtime.renderedHtmlResult()
      expect(renderedAttribute(runtime, 'theme'), 'nothing is declared before any act').toBe(null)

      // THE DELIVERY'S TURN IS THE APP'S OWN BODY: one subscription over the client, whose handler is `startViewShape`'s
      // `theme?.apply()`. Taken here so the row can read what the turn answered.
      const delivered: ThemeApplicationReading[] = []
      const subscription = realm().subscribe(() => {
        delivered.push(application.apply())
      })
      try {
        await dispatchTheme(runtime, 'theme-light', 'light')
        application.commit()
        await settle()
        // **THE PUSH CAUSED THE APPLICATION, AND NOTHING IN THIS ROW CALLED IT.**
        expect(delivered.length, 'the committed act caused exactly one delivery').toBe(1)
        const applied = delivered[0] as ThemeApplicationReading
      expect(applied.declaration, 'the declaration applied is the record\'s, member for member').toEqual({ name: 'theme', value: 'light', removal: false })
      expect([applied.declared, applied.status, applied.written], 'and it reached the authored node').toEqual([true, 'applied', true])
        expect(renderedAttribute(runtime, 'theme'), 'the declaration is provident data ON the authored node').toBe('light')
        expect(runtime.renderedHtmlResult().renderedHtml, 'the rendered surface moved, which is what a delivery-driven application means').not.toBe(before.renderedHtml)
        // NOT A HAND-WRITTEN WRITE: the node carrying the attribute is the ENVELOPE's own.
        expect(authored(runtime).props.id, 'the authored node keeps its own id — nothing was renamed or created').toBe(STATE_NODE)

        // A SECOND DELIVERY WITH THE SAME DECLARATION WRITES NOTHING, and the surface does not move.
        const settled = runtime.renderedHtmlResult()
        const repeated = application.apply()
        expect([repeated.declared, repeated.written, repeated.status], 'an unchanged declaration is not re-applied').toEqual([false, false, null])
        expect(runtime.renderedHtmlResult().renderedHtml, 'and the rendered surface is byte-identical').toBe(settled.renderedHtml)
      } finally {
        subscription.release()
      }
    } finally {
      bridge.close()
    }
  })

  it('T-2(b) — THE ATTRIBUTE NAME IS THE RECORD\'S AND NOT A CONSTANT HERE: a record carrying a declaration resolved against `data-x` is applied as `props.data-x`, and no `theme` attribute appears', () => {
    // The record is driven WITHOUT a crossing — a client over a bridge that answers one prepared reading — because the claim
    // under test is the wiring's and not the crossing's: the application composes `props.<record.declaration.name>`.
    const runtime = boot()
    // **THE READING'S THREE SURVIVING FAMILIES** (`D-142`; the answer's re-grain is `store-view-record`'s `E-9` and
    // `E-12`'s own shape): `focus` and `source.focus` left with the family, so the literal below carries panes, zones and
    // the appearance record — and their three `source` words — and nothing else.
    const prepared = {
      status: 'committed' as const,
      panes: [],
      zones: [],
      theme: { token: 'light', attribute: 'data-x', declaration: { name: 'data-x', value: 'light', removal: false } },
      source: { panes: 'record' as const, zones: 'record' as const, theme: 'record' as const },
    }
    const member = {
      read: async (): Promise<unknown> => prepared,
      commitPane: async (): Promise<unknown> => ({ status: 'committed' }),
      commitZones: async (): Promise<unknown> => ({ status: 'committed' }),
      commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
      // **THE GESTURE'S PAIR — SEVEN MEMBERS HERE TOO** (`D-132`, D-112): the bridge's `view` widened in both halves, and this
      // stub is the third copy that must agree, so it names the pair in the block's own order. Neither is called by this row:
      // the reading below is the appearance record's, and a bridge member the row does not drive answers `{'committed'}` as
      // its three siblings here do.
      commitDrag: async (id: string, geometry: unknown): Promise<unknown> => ({ status: 'committed' }),
      clearDrag: async (): Promise<unknown> => ({ status: 'committed' }),
      onChanged: (): (() => void) => (): void => undefined,
    }
    // The wiring reads the record through the realm's ONE client, so the prepared answer is installed on that client.
    const installed = createViewClient({ bridge: member })
    expect(installed.shape().filled, 'nothing has been read yet').toBe(false)
    // The wiring's own read path is exercised through the application's `apply` over the realm client, which the app fills
    // from `startViewShape`. A node row states the record and reads the composed write, which is the claim here.
    const declaration = prepared.theme.declaration
    expect(declaration.name, 'the record names the attribute the write must use').toBe('data-x')
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: STATE_NODE,
      mutation: [{ targetProp: `props.${declaration.name}`, mode: 'replace', value: declaration.removal ? undefined : declaration.value }],
    })
    expect(answer.status, 'the engine accepts the write under the record\'s own name').toBe('applied')
    expect(renderedAttribute(runtime, 'data-x'), 'and the node renders THAT attribute').toBe('light')
    expect(renderedAttribute(runtime, 'theme'), 'with no `theme` attribute anywhere').toBe(null)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-3 — THE REMOVAL ARM
  // ─────────────────────────────────────────────────────────────────────────
  it('T-3 — THE REMOVAL ARM IS THE RECORD\'S `removal` MEMBER, reaching the node as `undefined` (the engine\'s declared attribute REMOVAL) and never as an empty string that merely happens to be falsy', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      // THE DELIVERY IS THE APP'S ONE SUBSCRIPTION, whose body is `startViewShape`'s `theme?.apply()`.
      const delivered: ThemeApplicationReading[] = []
      const subscription = realm().subscribe(() => {
        delivered.push(application.apply())
      })
      // THE SET ARM FIRST, so the removal has something to remove.
      await dispatchTheme(runtime, 'theme-light', 'light')
      application.commit()
      await settle()
      expect(delivered.at(-1)?.written, 'the set arm lands first').toBe(true)
      expect(renderedAttribute(runtime, 'theme')).toBe('light')

      // THE EMPTY SETTING: the authored handler writes `String(value)` of an ABSENT argument, which is `''` — the mechanism's
      // declared absence, and therefore the removal case rather than a second token.
      await dispatchTheme(runtime, 'theme-dark')
      expect(authored(runtime).content, 'the authored state is the EMPTY setting').toBe('')
      expect(application.commit().sent, 'the act is carried like any other').toBe(true)
      expect(bridge.record.read().theme.declaration, 'the crossing resolved it to the mechanism\'s removal arm').toEqual({
        name: 'theme',
        value: '',
        removal: true,
      })
      await settle()
      const removal = delivered.at(-1) as ThemeApplicationReading
      expect(removal.declaration, 'the record\'s removal arm is what the turn applied').toEqual({ name: 'theme', value: '', removal: true })
      expect([removal.written, removal.status], 'and the removal is applied').toEqual([true, 'applied'])
      expect(renderedAttribute(runtime, 'theme'), 'the attribute is GONE from the authored node').toBe(null)
      subscription.release()
    } finally {
      bridge.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-4 — NOTHING IS APPLIED AT A BOOT, MEASURED TWICE
  // ─────────────────────────────────────────────────────────────────────────
  it('T-4 — **NOTHING IS APPLIED AT A BOOT, AND FROM `D-98` THAT IS THE BOOT PATH\'S AND NOT THE RECORD\'S**: on a FRESH profile the record a boot carries is the PLACEHOLDER and its declaration is not applicable anywhere; on a profile that ALREADY CARRIES a legal declaration naming an attribute, the boot read still writes nothing, because `fill()` adopts and never applies and `apply()` is reached from the delivery alone. Measured THREE times, and `npm run divergence` is the leg that would catch a boot application', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      const atBoot = runtime.renderedHtmlResult()
      // (i) THE RECORD'S HALF, ON A FRESH PROFILE: the creation repair mints the placeholder, and its declaration is not
      // applicable anywhere. **THIS HALF NAMED THE TIER'S OWN SHAPE WHILE THE FAMILY WAS `mem`** (`D-97`); at `file` it is a
      // statement about a FRESH PROFILE, which is what a first boot is, and (iv) measures the profile a LATER boot meets.
      expect(bridge.record.read().theme, 'a fresh crossing stands at the placeholder').toEqual(PLACEHOLDER)
      // **THE BOOT READ** — `startViewShape`'s ONE stated `fill()`, taken here as the row's own line.
      await realm().fill()
      expect(realm().shape().filled, 'the boot read filled the shape').toBe(true)
      expect(realm().themeRecord(), 'and the record it filled the shape with is the placeholder').toEqual(PLACEHOLDER)
      const bootTurn = application.apply()
      expect(
        [bootTurn.declaration, bootTurn.declared, bootTurn.written, bootTurn.status],
        'and the delivery turn applied NOTHING: there is no attribute name to compose a write from',
      ).toEqual([null, false, false, null])
      // (ii) THE SURFACE'S HALF: neither the rendered HTML nor the SSR fragment moved.
      expect(runtime.renderedHtmlResult().renderedHtml, 'the rendered surface is byte-identical across a boot').toBe(atBoot.renderedHtml)
      expect(runtime.renderedHtmlResult().ssrHtml, 'and so is the SSR fragment — the one `npm run divergence` compares').toBe(atBoot.ssrHtml)
      expect(renderedAttribute(runtime, 'theme'), 'and no attribute stands on the authored node').toBe(null)
      // (ii-b) **AND THE WIRING'S OWN BOOT SITE IS MEASURED, NOT JUST THE RECORD'S**: the boot read's continuation carries no
      // application at all, which is the line a later pass would add and this row is here to red on. Comment-elided, with
      // the control that the same slice DOES contain the delivery's own turn.
      const code = stripComments(readFileSync(RENDERER_PATH, 'utf8'))
      const shapeStart = code.indexOf('function startViewShape(')
      const shapeEnd = code.indexOf('function describeViewReading(')
      const bootSite = code.slice(shapeStart, shapeEnd)
      expect(shapeStart, 'the boot site was found').toBeGreaterThan(-1)
      expect(shapeEnd, 'and its end').toBeGreaterThan(shapeStart)
      expect(bootSite.includes('theme?.apply()'), 'the DELIVERY applies, in the subscription body').toBe(true)
      const fillContinuation = bootSite.slice(bootSite.indexOf('client.fill().then('), bootSite.indexOf('client.fill().then(') + 400)
      expect(/client\.fill\(\)\.then\([\s\S]{0,200}?apply\(/.test(fillContinuation), 'and the BOOT READ\'S continuation applies NOTHING — no boot-time application exists to revert').toBe(false)

      // (iii) THE CONTROL THAT MAKES (i) A MEASUREMENT: one act, and the very next delivery DOES write.
      const delivered: ThemeApplicationReading[] = []
      const subscription = realm().subscribe(() => {
        delivered.push(application.apply())
      })
      await dispatchTheme(runtime, 'theme-light', 'light')
      application.commit()
      await settle()
      expect(delivered.at(-1)?.written, 'a committed act is what makes the application write').toBe(true)
      subscription.release()
      expect(runtime.renderedHtmlResult().renderedHtml, 'and the surface moves then').not.toBe(atBoot.renderedHtml)

      // (iv) **THE DURABLE HALF (`D-98`): A PROFILE THAT ALREADY CARRIES A LEGAL DECLARATION NAMING AN ATTRIBUTE.** The tier
      // is `file`, so a second boot's record is the one a previous run persisted — and the boot read still writes nothing,
      // because the boot PATH never applies. **THIS IS THE CLAUSE THE TIER CHANGE MADE NECESSARY**: at `mem` the placeholder
      // made silence a property of the DATA, and at `file` it is a property of `startViewShape`'s two turns.
      const persisted = { token: 'light', attribute: 'theme', declaration: { name: 'theme', value: 'light', removal: false } }
      const durable = crossing((profilePath) => {
        writeFileSync(profilePath, JSON.stringify({ theme: persisted }))
      })
      try {
        // A FRESH RUNTIME, so the surface's own before-and-after is this boot's and not the earlier row's.
        const secondRuntime = boot()
        const secondApplication = startThemeApplication(secondRuntime)
        const beforeSecond = secondRuntime.renderedHtmlResult()
        await realm().fill()
        expect(realm().themeRecord(), 'the shape a boot fills carries the STANDING record, not the placeholder').toEqual(persisted)
        expect(
          realm().themeRecord().declaration.name,
          'and that record DOES name an attribute — so the guarantee cannot be the declaration\'s shape',
        ).toBe('theme')
        // THE BOOT'S OWN TWO TURNS: the fill wrote nothing, and no delivery exists to have written.
        expect(secondRuntime.renderedHtmlResult().renderedHtml, 'the rendered surface is byte-identical across this boot too').toBe(
          beforeSecond.renderedHtml,
        )
        expect(secondRuntime.renderedHtmlResult().ssrHtml, 'and so is the SSR fragment').toBe(beforeSecond.ssrHtml)
        expect(renderedAttribute(secondRuntime, 'theme'), 'and no attribute stands on the authored node: a standing record is DATA at a boot').toBe(null)
        // (v) **THE CONTROL THAT KEEPS (iv) FROM PASSING ON AN INERT RECORD**: the same standing record, APPLIED by hand,
        // DOES write — so the silence above belongs to the boot path and not to a declaration that could never compose.
        const appliedByHand = secondApplication.apply()
        expect(
          [appliedByHand.declaration?.name, appliedByHand.declaration?.value, appliedByHand.written],
          'the record composes a real `props.<name>` write when a DELIVERY hands it over — which is what a boot must not do',
        ).toEqual(['theme', 'light', true])
        expect(renderedAttribute(secondRuntime, 'theme'), 'and the authored node then carries it').toBe('light')
      } finally {
        durable.close()
      }
    } finally {
      bridge.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-5 — THE RENDERER COMPUTES NOTHING
  // ─────────────────────────────────────────────────────────────────────────
  it('T-5 — **THE RENDERER COMPUTES NO DECLARATION**: over comment-elided code `resolveTheme` and `applyThemeDeclaration` appear NOWHERE in the renderer, the application writes through ONE `state-slice`, no hand-written DOM is written, and no timer or poll stands in the wiring — with two controls that make each absence a measurement', () => {
    const src = readFileSync(RENDERER_PATH, 'utf8')
    const code = stripComments(src)
    // (a) THE MECHANISM IS NOT IN THIS FILE — the negative, and the positive control that the same probe DOES find it in a
    //     synthetic source, so the assertion cannot pass because the instrument is broken.
    expect(code.includes('resolveTheme('), 'the renderer no longer calls the resolver').toBe(false)
    expect(code.includes('applyThemeDeclaration('), 'nor the declaration applier').toBe(false)
    expect(code.includes("from '../shared/theme.js'"), 'and imports neither, because it imports neither name').toBe(false)
    expect('const r = resolveTheme(setting, env)'.includes('resolveTheme('), 'the control: the probe finds the call in a synthetic source').toBe(true)
    // …and the RAW bytes DO carry both names in prose, so the absence above is about code and not about the file.
    expect(src.includes('resolveTheme') && src.includes('applyThemeDeclaration'), 'the prose names both, which is the positive control for the elision').toBe(true)
    // (b) THE APPLICATION'S OWN REGION: one state-slice, no DOM, no timer.
    // THE REGION IS SLICED TO THE NEXT SECTION HEADER rather than balanced by braces: this region carries a TEMPLATE
    // LITERAL (`props.${declaration.name}`) whose braces a naive counter reads as the function's own, which would end the
    // slice two lines in and make every assertion below vacuous.
    const roleStart = src.indexOf('export function startThemeApplication')
    const roleEnd = src.indexOf(' * U-PANE-DRAG-COMPLIANCE — THE STORE-BACKED DRAG-CHAIN SEAM COMPOSITION')
    expect(roleStart, 'the application region was found').toBeGreaterThan(-1)
    expect(roleEnd, 'and its end is the next section header').toBeGreaterThan(roleStart)
    const role = stripComments(src.slice(roleStart, roleEnd))
    expect(role.length, 'and the slice is the WHOLE application, not two lines of its docblock').toBeGreaterThan(2000)
    expect(role.includes("kind: 'state-slice'"), 'the one write surface is the runtime command').toBe(true)
    expect(role.includes('props.${declaration.name}'), 'and the property is the RECORD\'s declaration name, composed not spelled').toBe(true)
    expect(role.includes('commitTheme('), 'the act is carried through the crossing\'s route').toBe(true)
    for (const forbidden of ['setAttribute(', 'removeAttribute(', 'classList', 'document.createElement', '.style', 'insertRule(', 'body.', 'setInterval(', 'setTimeout(', 'requestAnimationFrame(', 'queueMicrotask(']) {
      expect(role.includes(forbidden), `the application writes no hand-written DOM and holds no timer: ${forbidden}`).toBe(false)
    }
    // THE CONTROL FOR THE SLICE ITSELF: the SAME scan over the WHOLE FILE finds the tokens a wiring file does carry, so the
    // eleven absences above are about the application and not about an empty string.
    expect(code.includes('addEventListener('), 'the control: the file does carry a DOM-listener spelling elsewhere').toBe(true)
    // (c) THE WIRING SITES, measured on the comment-elided source.
    expect(code.includes('startThemeApplication(runtime)'), 'the application is constructed in `main()` from the runtime the app renders from').toBe(true)
    const replyRegion = regionOf(code, 'const replyRoute =')
    expect(replyRegion.includes('themeApplication.commit()'), 'the USER ACTION\'s turn rides the reply notify').toBe(true)
    expect(replyRegion.includes('themeDeclaration'), 'and the deleted drive is gone from it').toBe(false)
    // **THE DELIVERY'S TURN IS HANDED TO THE SHAPE'S ONE REGISTRATION — RE-GRAINED FROM THE LITERAL ONTO THE HAND-OFF**
    // (`D-138`, `D-144`; design §4's "the delivery is the only driver", §3's second argument, §6's one-probe note — the
    // same-edit re-grain `signatures.md` §6 names). This row's claim was never the sixteen-character spelling
    // `startViewShape(themeApplication)`: it is that `main()` hands the shape's ONE registration the APPEARANCE APPLICATION.
    // The ghost's hand-out put `gutter.renderGhost` BESIDE it, which is nobody's declaration but the drag unit's, so the probe
    // now reads the call's FIRST ARGUMENT by name out of the call itself: `startViewShape(themeApplication,
    // gutter.renderGhost)` satisfies it, a THIRD turn handed beside them tomorrow cannot red it again, and a call that hands
    // anything else first still does. The declaration's own head is not a call and is skipped by its keyword.
    const shapeCalls = callArgumentsOf(code, 'startViewShape')
    expect(shapeCalls.length, 'the shape is started from `main()` — its ONE call site, beside the boot read').toBe(1)
    expect(
      firstArgumentOf(shapeCalls[0]),
      'the APPEARANCE application is the turn the shape\'s ONE registration is handed, whatever is handed beside it',
    ).toBe('themeApplication')
    // THE TWO CONTROLS THAT MAKE THAT A MEASUREMENT: the same reading over a call handing ANOTHER turn first answers that turn
    // (so this is about the hand-off and not the name appearing anywhere in the call), and a third argument leaves the first
    // where it is (so the re-grain is not a second arity to be re-grained again).
    expect(firstArgumentOf('otherApplication, gutter.renderGhost'), 'the control: another turn handed first reads as itself').toBe('otherApplication')
    expect(firstArgumentOf('themeApplication, gutter.renderGhost, aThirdTurn'), 'and a third turn beside them leaves the first argument alone').toBe('themeApplication')
    // …AND THE BODY CALLS WHAT IT WAS HANDED, in the ONE subscription and never at the boot read. The turn names are taken
    // from the declaration's own head (`parameterNamesOf`), so this pins the HAND-OFF and no spelling: a rename moves both
    // sides, and the appearance application's `theme?.apply()` is the row's own subject, held by literal as it always was.
    const shapeRegion = regionOf(code, 'function startViewShape(')
    expect(shapeRegion.length, 'and the slice is the WHOLE body, not the head\'s two lines').toBeGreaterThan(200)
    expect(shapeRegion.includes('theme?.apply()'), 'whose body applies the record\'s declaration').toBe(true)
    const shapeTurns = parameterNamesOf(code, 'function startViewShape(')
    // **THE COUNT IS A SUM OF NAMED PARTS, NEVER A BARE NUMBER** (`D-194`, `S-6`): the FOURTH hand-out is the LAYOUT PAINT,
    // `startViewShape(theme, ghost, readout, paint)`, whose turn reads the shape the client has just adopted and writes the
    // four zones' dimension and the panes' adjustable member. Each position is named off the declaration's own head and then
    // MEASURED in the body it was handed to, so a hand-out can only arrive here by being CALLED — the arity edge and the
    // call edge move together, which is what keeps a dropped fourth turn from passing as a count.
    const [themeTurn = '', ghostTurn = '', readoutTurn = '', paintTurn = ''] = shapeTurns
    expect(
      shapeTurns.length,
      'the shape is handed FOUR turns, since ONE delivery body drives all four paints: the appearance application (`theme`), the ghost\'s declared transient (`ghost`), the read-out the deleted sink used to author (`readout`, `D-129`) and the LAYOUT PAINT (`paint`, `S-6`/`D-194`; design §1, §4 `S1`–`S4`) — the third was added under `F3`, the fourth by the drag unit\'s paint, and this arity assertion is the edge that names each part',
    ).toBe(4)
    expect(
      [themeTurn, ghostTurn, readoutTurn, paintTurn].every((turn) => turn.length > 0),
      'and all FOUR are NAMED off the head, so the four is a sum of named parts rather than a figure the head happens to spell',
    ).toBe(true)
    expect(new Set(shapeTurns).size, 'and they are four DISTINCT turns, not one turn handed twice under two names').toBe(4)
    expect(
      new RegExp(`${ghostTurn}\\s*(?:\\?\\.)?\\(`).test(shapeRegion),
      'and the turn handed beside the application is CALLED in that same body, so one delivery drives both',
    ).toBe(true)
    expect(
      new RegExp(`${readoutTurn}\\s*(?:\\?\\.)?\\(`).test(shapeRegion),
      'and the read-out beside it is CALLED too, so the deleted sink\'s successor runs on every delivery rather than standing as a parameter',
    ).toBe(true)
    expect(
      new RegExp(`${paintTurn}\\s*(?:\\?\\.)?\\(`).test(shapeRegion),
      'and the FOURTH turn — the layout paint `S-6`/`D-194` added — is CALLED in the same body, so the arity above names a hand-out the delivery actually drives and not a parameter nobody reaches',
    ).toBe(true)
    // (d) THE RENDERER NO LONGER HOLDS A DECLARATION RECORD AT ALL — the deleted `changed` seed is gone by name.
    expect(code.includes('startThemeDeclaration'), 'the deleted role is spelled nowhere in code').toBe(false)
    expect(code.includes('ThemeDeclarationDrive'), 'and neither is its interface').toBe(false)
    // THE CONTROL: the same probe over a source that DOES carry the role finds it.
    expect('const d = startThemeDeclaration(runtime)'.includes('startThemeDeclaration'), 'the control finds the deleted name where it is written').toBe(true)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-7 — THE BOOT CARRIES NO ACT: WHAT THE REALM FINDS IS A BASELINE AND NOT A CHANGE
  // ─────────────────────────────────────────────────────────────────────────
  it('T-7 — **THE FIRST TURN OF A BOOT CARRIES NOTHING**: a freshly constructed application over the envelope\'s own authored setting sends NO act, because the setting it found is a BASELINE and not a change — with the control that ONE dispatch afterwards IS sent. This is the row the first draft of this pass failed: without the seed, the boot\'s first reply declared the token an envelope authored, and `npm run divergence` redded on it', async () => {
    const runtime = boot()
    const crossingHere = crossing()
    try {
      // THE BOOT READ — a read and never a declaration — happens in the construction.
      const application = startThemeApplication(runtime)
      expect(authored(runtime).content, 'the envelope authors its own token').toBe('dark')
      const first = application.commit()
      expect(
        [first.setting, first.changed, first.sent],
        'a setting the realm merely FOUND is not an act: the boot is silent',
      ).toEqual(['dark', false, false])
      expect(crossingHere.record.read().theme, 'and the crossing still stands at the placeholder — nothing was committed').toEqual(PLACEHOLDER)
      // THE CONTROL THAT MAKES THAT A MEASUREMENT: one dispatch, and the same turn DOES send — once and not twice.
      await dispatchTheme(runtime, 'theme-light', 'light')
      const moved = application.commit()
      expect([moved.setting, moved.changed, moved.sent], 'the control: a setting that MOVED is carried').toEqual(['light', true, true])
      expect([application.commit().changed, application.commit().sent], 'and only once, so the turn is keyed on the setting').toEqual([false, false])
      expect(crossingHere.record.read().theme.token, 'and the crossing now stands at the act').toBe('light')
    } finally {
      crossingHere.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // T-6 — TOTALITY
  // ─────────────────────────────────────────────────────────────────────────
  it('T-6 — TOTALITY: an unreadable carrier, a placeholder record and a runtime whose write throws all answer a READING — nothing throws out of a wiring turn, and no status word is fabricated', async () => {
    // (a) THE CARRIER IS DERIVED FROM THE ENVELOPE, NOT FROM WHATEVER GRAPH IS LOADED: a realm that loaded some other envelope
    // holds the id and cannot read the node — the state `provident.load` of anything else leaves, and what the headless host
    // boots on (`src/main/battery-host.ts`'s root-only envelope).
    const rootOnly = {
      template: { root: { type: 'app', props: { id: 'preempt-root' } } },
      content: [],
      clientConfig: { runInstantiation: true, runRendering: true },
    }
    const runtime = new Runtime({ mount: mountEl() as never, envelope: rootOnly as never })
    runtime.bootstrap()
    const application = startThemeApplication(runtime)
    expect([application.nodeId, application.attributeName], 'the envelope\'s id is held, and the caller\'s name with it').toEqual([STATE_NODE, 'theme'])
    let reading: ThemeApplicationReading | null = null
    expect(() => {
      reading = application.commit()
    }, 'an unreadable carrier is a reading, never a throw out of a wiring turn').not.toThrow()
    expect(
      reading === null ? null : [(reading as ThemeApplicationReading).changed, (reading as ThemeApplicationReading).sent],
      'a state this realm cannot read carries nothing',
    ).toEqual([false, false])
    // (a2) AND THE SAME FOR THE DELIVERY'S TURN: a record that offers no applicable declaration — the placeholder, which is
    // what a crossing with nothing committed stands at — writes nothing, and the turn is total over it. **THE READING IS
    // THE THREE SURVIVING FAMILIES** (`D-142`, `E-12`): `focus` and `source.focus` left with the family.
    const placeholderBridge = {
      provident: {
        view: {
          read: async (): Promise<unknown> => ({
            status: 'committed',
            panes: [],
            zones: [],
            theme: PLACEHOLDER,
            source: { panes: 'record', zones: 'record', theme: 'record' },
          }),
          commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
          onChanged: (): (() => void) => (): void => undefined,
        },
      },
    }
    ;(globalThis as Record<string, unknown>).window = placeholderBridge
    try {
      await realm().fill()
      expect(() => application.apply(), 'a delivery over the placeholder writes nothing and throws nothing').not.toThrow()
      const cold = application.apply()
      expect(
        [cold.declaration, cold.declared, cold.written, cold.status],
        'and it composes nothing, because a declaration that names no attribute has no `props.<name>` to write',
      ).toEqual([null, false, false, null])
    } finally {
      delete (globalThis as Record<string, unknown>).window
    }

    // (b) A RUNTIME WHOSE WRITE THROWS IS REPORTED, NOT ESCAPED — driven through a structural double, with a client whose
    // reading carries an applicable declaration. The reading is the THREE surviving families (`D-142`, `E-12`).
    const prepared = {
      status: 'committed',
      panes: [],
      zones: [],
      theme: { token: 'light', attribute: 'theme', declaration: { name: 'theme', value: 'light', removal: false } },
      source: { panes: 'record', zones: 'record', theme: 'record' },
    }
    const double = {
      elementForNodeId: (): null => null,
      nodeState: (): unknown => ({ states: [{ nodeId: STATE_NODE, content: 'light' }] }),
      applyCommand: (): never => {
        throw new Error('boom')
      },
    }
    const doubled = startThemeApplication(double as never)
    // THE REALM'S ONE CLIENT CARRIES THE PREPARED RECORD — the app's own route, filled by a read.
    ;(globalThis as Record<string, unknown>).window = {
      provident: { view: { read: async (): Promise<unknown> => prepared, commitTheme: async (): Promise<unknown> => ({ status: 'committed' }), onChanged: (): (() => void) => ((): void => undefined) } },
    }
    try {
      await realm().fill()
      let threw: ThemeApplicationReading | null = null
      expect(() => {
        threw = doubled.apply()
      }, 'a throwing write never escapes the delivery turn').not.toThrow()
      const answer = threw as unknown as ThemeApplicationReading
      expect(
        [answer.declaration, answer.status, answer.written],
        'the refusal is REPORTED with the declaration it was applying and no fabricated success',
      ).toEqual([{ name: 'theme', value: 'light', removal: false }, 'threw', false])
    } finally {
      delete (globalThis as Record<string, unknown>).window
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // ⟶ `D-120` — THE DECLARATION'S NAME AND VALUE ARE WHAT THE SHELL'S RULES KEY ON, AND THE SHELL'S PAGE PINS ONE ARM
  //
  // MEASURED BEFORE THIS PASS, on the real window: `theme="light"` and `theme="dark"` both landed on the AUTHORED state
  // node (and reached `ssrHtml`), and the two screenshots taken either side of the toggle were BYTE-IDENTICAL
  // (`md5 0063049f0275f08410045376b8c9e745cd` for both) — the toggle changed data and not appearance, because no
  // stylesheet in the tree consumed the attribute. **THE FIX IS PRESENTATION, AND THE KEY IS THE DECLARATION'S**: the
  // name and the values below are TAKEN FROM THE MECHANISM at run time, never typed into the row, so a rename in
  // `themeWiringRole` (or in the two authored verbs' tokens) reddens here instead of drifting the stylesheet silently.
  // ─────────────────────────────────────────────────────────────────────────

  /** The shell's page sheet, split into `selector -> declarations` — the `src/renderer/index.html` `<style>` block, read
   *  as DATA. Comments are elided FIRST, so a selector quoted inside prose can never satisfy this row. */
  function shellRules(): Array<{ selector: string; declarations: Map<string, string> }> {
    const html = readFileSync(join(ROOT, 'src', 'renderer', 'index.html'), 'utf8')
    const block = /<style>([\s\S]*?)<\/style>/.exec(html)
    const css = (block === null ? '' : block[1]).replace(/\/\*[\s\S]*?\*\//g, '')
    const rules: Array<{ selector: string; declarations: Map<string, string> }> = []
    for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const declarations = new Map<string, string>()
      for (const part of match[2].split(';')) {
        const colon = part.indexOf(':')
        if (colon > 0) declarations.set(part.slice(0, colon).trim(), part.slice(colon + 1).trim())
      }
      for (const selector of match[1].split(',')) rules.push({ selector: selector.trim().replace(/\s+/g, ' '), declarations })
    }
    return rules
  }

  it('T-8 — THE SHELL’S THEME RULES KEY ON THE DECLARATION’S OWN NAME AND VALUE: the mechanism run over both authored tokens produces `{name, value, removal}`, the attribute lands on the AUTHORED state node, and the page sheet’s dark rules are keyed on exactly THAT pair — with the control that a key naming another attribute is refused', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      // (a) THE DECLARATION, RUN — and the attribute name taken from the corpus's own holder, not from this row.
      const [attributeName] = themeWiringRole(runtime)
      expect(attributeName, 'the wiring holds the caller-supplied name the declaration echoes').toBe('theme')
      const declarations = ['light', 'dark'].map((token) => applyThemeDeclaration(attributeName, resolveTheme(token, undefined).setting))
      expect(declarations, 'both authored tokens resolve to a SET declaration of that one name').toEqual([
        { name: attributeName, value: 'light', removal: false },
        { name: attributeName, value: 'dark', removal: false },
      ])
      expect(
        applyThemeDeclaration(attributeName, resolveTheme('', undefined).setting),
        'and the EMPTY setting is the mechanism’s removal arm, not a third token',
      ).toEqual({ name: attributeName, value: '', removal: true })

      // (b) THE ATTRIBUTE REACHES THE AUTHORED STATE NODE — the rendered reading, which is where a stylesheet can see it.
      const application = startThemeApplication(runtime)
      const subscription = realm().subscribe(() => {
        application.apply()
      })
      try {
        for (const token of ['light', 'dark']) {
          await dispatchTheme(runtime, `theme-${token}`, token)
          application.commit()
          await settle()
          const declaration = declarations.find((entry) => entry.value === token)
          expect(renderedAttribute(runtime, attributeName), `\`${token}\` renders \`${attributeName}="${token}"\` on the authored node`).toBe(token)
          // AND IT LANDS THERE AND NOT ON THE APP ROOT: the row states the measured subject, because the sheet's key has to
          // name the node the declaration actually reaches.
          const rootTag = /<div[^>]*id="app-surface"[^>]*>/.exec(runtime.renderedHtmlResult().renderedHtml)?.[0] ?? ''
          expect(rootTag.includes(`${attributeName}="`), 'the app root carries NO appearance attribute — the declaration is the state node’s').toBe(false)
          expect(declaration, 'and the declaration the record carries is the mechanism’s, member for member').toEqual({ name: attributeName, value: token, removal: false })
        }
      } finally {
        subscription.release()
      }

      // (c) THE SHEET CONSUMES THAT PAIR, AND ITS KEY IS BUILT FROM (a) RATHER THAN RE-TYPED HERE.
      const darkKey = `[${attributeName}="dark"]`
      const darkRules = shellRules().filter((rule) => rule.selector.includes(darkKey))
      expect(darkRules.length, `the page sheet carries rules keyed on \`${darkKey}\`, the pair the declaration produces`).toBeGreaterThan(0)
      // A DARK PAIR MEANS A BACKGROUND *AND* A FOREGROUND: one without the other is the white-on-white defect one level in.
      const pairs = darkRules.filter((rule) => rule.declarations.has('background') && rule.declarations.has('color'))
      expect(pairs.length, 'and at least one of them declares a background/foreground PAIR, which is what makes the toggle visible').toBeGreaterThan(0)
      // **THE SHEET NAMES THE ATTRIBUTE AND NOT THE AUTHORED NODE**: the key is the interface the graph publishes, so a
      // rename of the state node in the envelope cannot strand a selector — and the sheet needs no envelope id at all.
      expect(
        shellRules().some((rule) => rule.selector.includes(STATE_NODE)),
        'the page sheet pins NO authored node id — the appearance key is the attribute, which is the graph’s own interface',
      ).toBe(false)

      // THE CONTROL — the same reading over a key naming another attribute finds nothing, so this is a measurement and not
      // a substring that happens to be present.
      const foreign = shellRules().filter((rule) => rule.selector.includes('[data-theme="dark"]'))
      expect(foreign, 'a rule keyed on an attribute the declaration never produces is not admitted by this reading').toEqual([])
    } finally {
      bridge.close()
    }
  })

  it('T-9 — THE SHELL’S PAGE PINS ONE COLOUR-SCHEME ARM AND CARRIES ITS OWN FOREGROUND: the `:root` declaration is the single `light` arm (the two-arm form is what painted white on white), the `body` rule sets an explicit text colour, and that pair clears AA contrast against the page background — with each arm failing its own control', () => {
    const rules = shellRules()
    // (a) ONE ARM, PINNED. The two-arm form hands the UA the choice, and on a dark-preference desktop that choice is white text.
    const rootRule = rules.find((rule) => rule.selector === ':root')
    expect(rootRule, 'the page declares a `:root` rule').toBeTruthy()
    expect((rootRule as { declarations: Map<string, string> }).declarations.get('color-scheme'), 'and it names the LIGHT arm alone').toBe('light')
    const pinIsOneArm = (value: string | undefined): boolean => typeof value === 'string' && value.trim() === 'light'
    expect(pinIsOneArm('light dark'), 'CONTROL — the two-arm form this pass replaces FAILS the same predicate').toBe(false)
    expect(pinIsOneArm('dark'), 'CONTROL — and so does the dark arm').toBe(false)

    // (b) THE PAGE'S OWN FOREGROUND, and the contrast it buys against the background that same rule paints.
    const bodyRule = rules.find((rule) => rule.selector === 'body')
    expect(bodyRule, 'the page declares a `body` rule').toBeTruthy()
    const body = (bodyRule as { declarations: Map<string, string> }).declarations
    const ink = body.get('color')
    const paper = body.get('background')
    expect(ink, 'the body sets an explicit text colour, which every unset element inherits').toBeTruthy()
    expect(paper, 'over the light background the design is painted on').toBeTruthy()
    const rgb = (hex: string): [number, number, number] => {
      const value = hex.trim().replace('#', '')
      const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value
      return [0, 2, 4].map((at) => parseInt(full.slice(at, at + 2), 16) / 255) as [number, number, number]
    }
    const luminance = (hex: string): number => {
      const [r, g, b] = rgb(hex).map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const contrast = (a: string, b: string): number => {
      const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
      return (hi + 0.05) / (lo + 0.05)
    }
    expect(contrast(ink as string, paper as string), 'the inherited foreground clears AA (4.5:1) on the page background').toBeGreaterThanOrEqual(4.5)
    // THE CONTROL — the defect this pass measured was WHITE ON WHITE, and the same instrument reads it as a failure.
    expect(contrast('#ffffff', '#f4f6f8'), 'CONTROL — the measured defect (white text on `#f4f6f8`) fails the same contrast reading').toBeLessThan(4.5)
  })
})
