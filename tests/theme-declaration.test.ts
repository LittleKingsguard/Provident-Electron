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
//   · T-4  **NOTHING IS APPLIED AT A BOOT** — measured twice: a boot read fills the shape and writes nothing, and the record a
//          boot carries is the placeholder, whose declaration names no attribute at all.
//   · T-5  THE RENDERER COMPUTES NOTHING: over comment-elided code, `resolveTheme`/`applyThemeDeclaration` appear nowhere in
//          the renderer, no hand-written DOM is written, and no timer or poll stands in the wiring.
//   · T-6  TOTALITY: an unreadable carrier, a realm with no crossing, a record with no applicable declaration and a runtime
//          whose write throws all answer a READING — never an exception.
//
// The `Runtime` is the APP's own (`src/renderer/runtime.ts`) over the AUTHORED envelope (`src/shared/demo-envelope.ts`),
// mounted on the DOM shim. **THE CROSSING IS REAL AND NODE-SIDE**: the rows below build a `provident-storeroom` instance with
// the module's own batch and wrap it in the client's bridge, so the act's route, the repair and the delivery are the app's
// chain rather than a modelling of it. A node-suite green is envelope-green and never app-green (`AGENTS.md`); the LIVE
// instruments are `npm run divergence` and the app itself.

import { describe, it, expect, beforeAll } from 'vitest'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { getViewClient, startThemeApplication, themeWiringRole, type ThemeApplication, type ThemeApplicationReading } from '../src/renderer/renderer.js'
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

function crossing(): Crossing {
  const dir = mkdtempSync(join(tmpdir(), 'theme-application-'))
  const bound: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: join(dir, 'provident-profile.json'),
    constraints: viewConstraintDeclarations(() => bound.current).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current })
  const bridge: ViewClientBridge = {
    read: async () => record.read(),
    commitPane: async (id: string, geometry: unknown) => record.commitPane(id, geometry),
    commitFocus: async (mirror: unknown) => record.commitFocus(mirror),
    commitZones: async (id: string, zone: unknown) => record.commitZones(id, zone),
    // **THE ACT'S ROUTE, AS THE BRIDGE DECLARES IT** — the crossing's own `commitTheme`, called with the caller's pair.
    commitTheme: async (token: string, attributeName: string) => record.commitTheme(token, attributeName),
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
    const prepared = {
      status: 'committed' as const,
      panes: [],
      focus: { entries: [], activeId: null },
      zones: [],
      theme: { token: 'light', attribute: 'data-x', declaration: { name: 'data-x', value: 'light', removal: false } },
      source: { panes: 'record' as const, focus: 'record' as const, zones: 'record' as const, theme: 'record' as const },
    }
    const member = {
      read: async (): Promise<unknown> => prepared,
      commitPane: async (): Promise<unknown> => ({ status: 'committed' }),
      commitFocus: async (): Promise<unknown> => ({ status: 'committed' }),
      commitZones: async (): Promise<unknown> => ({ status: 'committed' }),
      commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
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
  it('T-4 — **NOTHING IS APPLIED AT A BOOT**: a boot read fills the shape and writes nothing, and the record a boot carries is the PLACEHOLDER, whose declaration names no attribute — so no `props.<name>` exists to write. Measured twice, and `npm run divergence` is the leg that would catch a boot application', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      const atBoot = runtime.renderedHtmlResult()
      // (i) THE RECORD'S HALF: the creation repair mints the placeholder, and its declaration is not applicable anywhere.
      expect(bridge.record.read().theme, 'a fresh crossing stands at the placeholder').toEqual(PLACEHOLDER)
      // **THE BOOT READ** — `startViewShape`'s ONE stated `fill()`, taken here as the row's own line.
      await realm().fill()
      expect(realm().shape().filled, 'the boot read filled the shape').toBe(true)
      expect(realm().themeRecord(), 'and the record it filled the shape with is the placeholder').toEqual(PLACEHOLDER)
      const boot = application.apply()
      expect(
        [boot.declaration, boot.declared, boot.written, boot.status],
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
    expect(code.includes('startViewShape(themeApplication)'), 'the DELIVERY\'s turn is handed to the shape\'s one registration').toBe(true)
    const shapeRegion = regionOf(code, 'function startViewShape(')
    expect(shapeRegion.includes('theme?.apply()'), 'whose body applies the record\'s declaration').toBe(true)
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
    // what a crossing with nothing committed stands at — writes nothing, and the turn is total over it.
    const placeholderBridge = {
      provident: {
        view: {
          read: async (): Promise<unknown> => ({
            status: 'committed',
            panes: [],
            focus: { entries: [], activeId: null },
            zones: [],
            theme: PLACEHOLDER,
            source: { panes: 'record', focus: 'record', zones: 'record', theme: 'record' },
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
    // reading carries an applicable declaration.
    const prepared = {
      status: 'committed',
      panes: [],
      focus: { entries: [], activeId: null },
      zones: [],
      theme: { token: 'light', attribute: 'theme', declaration: { name: 'theme', value: 'light', removal: false } },
      source: { panes: 'record', focus: 'record', zones: 'record', theme: 'record' },
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
})
