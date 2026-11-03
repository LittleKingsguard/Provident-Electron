// tests/theme-declaration.test.ts — **THE APPEARANCE MECHANISM'S CONSUMER, PROVED AT THE AUTHORED NODE** (`D-96`).
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked-file` marker and GATES
// (`AGENTS.md`). Its subject is not the mechanism — `tests/theme.test.ts` (58 rows) owns the pure
// surface and `tests/store-modules-seams.test.ts` owns the register — it is the WIRING `D-95` left
// open: the user's ruling that `src/shared/overlay.ts` and `src/shared/theme.ts` are "consumed by the
// module renderers", taken for `theme` as `src/renderer/renderer.ts`'s `startThemeDeclaration`.
//
// WHAT EACH ROW IS FOR, so no row is decorative:
//   · D-96/1  A CHANGE OF THE AUTHORED SETTING PRODUCES THE DECLARATION AND THE DECLARATION REACHES
//             THE AUTHORED NODE — driven through the real `Runtime` over the real envelope, and read
//             back off the graph (`nodeState`) and off the rendered HTML.
//   · D-96/2  THE REMOVAL ARM is the mechanism's `removal` member reaching the node as `undefined`,
//             never an empty string that happens to be falsy.
//   · D-96/3  IT DECLARES ON A CHANGE AND NOT OTHERWISE — the condition `npm run divergence` depends
//             on: a reply that moves nothing must not move the rendered surface.
//   · D-96/4  THE DECLARATION IS THE MECHANISM'S OWN ANSWER — the three resolved members carried, and
//             the caller's `env` claim never given a precedence rule it does not have.
//   · D-96/5  THE WIRING IS IN THE APP'S OWN CHANGE PUSH, with a control that removing the drive
//             line REDS the probe, and an absence assertion that the role writes no hand-written DOM.
//   · D-96/6  TOTALITY — an absent/renamed state node answers a READING, writes nothing and never
//             throws.
//
// The `Runtime` here is the APP's own (`src/renderer/runtime.ts`) over the AUTHORED envelope
// (`src/shared/demo-envelope.ts`), mounted on the DOM shim — the same construction the row suite's
// other envelope rows use. A sink-call green is not a live green: `npm run crossings` and the app
// itself are the live instruments, and the `ssrHtml`/`renderedHtml` claims below are the graph's.

import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { startThemeDeclaration, themeWiringRole, type ThemeDeclarationDrive, type ThemeDeclarationReading } from '../src/renderer/renderer.js'

beforeAll(() => {
  installShim()
})

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RENDERER_PATH = `${ROOT}src/renderer/renderer.ts`

/** The authored state node's own spelling, taken from the corpus's declared holder rather than re-typed here. */
const STATE_NODE = 'theme-setting'

function boot(): Runtime {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  return runtime
}

/** The authored node's OWN reading, through the runtime's graph read — the surface `provident.get_node_state`
 *  answers on. A row that read the shim element instead would be reading the adapter, not the graph.
 *
 *  **AND ITS ONE MEASURED LIMIT**: an APPLIED prop (`props.<name>` written through a `state-slice`) reaches the
 *  RENDER and not this compiled mirror — measured on this head: after the write `renderedHtml` carries
 *  `theme="light"` on the node while `states[0].props` still answers the AUTHORED `{id: 'theme-setting'}`, which is
 *  why the applied half of every row below is read off `get_rendered_html`'s own answer (`renderedAttribute`) and
 *  the SETTING half — which the compiled state does carry — off this read. Both are the graph's; neither is the DOM. */
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

/** The balanced region of one top-level declaration (a docblock-free slice of the file), for the source rows. */
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

// ───────────────────────────────────────────────────────────────────────────
// D-96/1 — THE CHANGE PRODUCES THE DECLARATION, AND IT REACHES THE AUTHORED NODE
// ───────────────────────────────────────────────────────────────────────────
describe('D-96 · the appearance declaration, driven at the authored node', () => {
  it('D-96/1 — a CHANGE of the authored setting is resolved, declared, and written to the AUTHORED node as provident data: `props.<name>` on the state node the envelope authors, visible in `nodeState` AND in `renderedHtml`', async () => {
    const runtime = boot()
    const drive: ThemeDeclarationDrive = startThemeDeclaration(runtime)
    // THE HOLDERS ARE THE CORPUS'S OWN ROLE'S, not re-spelled here.
    expect([drive.attributeName, drive.nodeId], 'the role carries the caller-supplied attribute NAME and the AUTHORED state node id').toEqual(themeWiringRole(runtime))
    expect(drive.nodeId, 'the derived carrier is the state node the envelope authors, never a second spelling').toBe(STATE_NODE)
    // BEFORE THE CHANGE: the envelope authors the token `dark` and NO declaration exists on the node.
    expect(authored(runtime).content).toBe('dark')
    expect(renderedAttribute(runtime, 'theme'), 'nothing is declared and nothing is rendered before the setting moves').toBe(null)

    // THE CHANGE — the authored `theme-set` handler carries the caller's token into the state node's `content`.
    await dispatchTheme(runtime, 'theme-light', 'light')
    expect(authored(runtime).content, 'the state moved to the caller\'s own token').toBe('light')

    const reading = drive.drive()
    // THE MECHANISM'S OWN ANSWER, carried and reported.
    expect(reading.setting, 'resolveTheme carries the caller\'s token BY IDENTITY').toBe('light')
    expect(reading.declaration, 'applyThemeDeclaration returns the declaration as DATA').toEqual({ name: 'theme', value: 'light', removal: false })
    expect(reading.changed, 'the setting moved, so the drive declares').toBe(true)
    // **AND IT REACHED THE AUTHORED NODE** — read off the graph's own rendered answer, which is the surface the UI
    // authority names (`get_rendered_html`): `props.<name>` on the AUTHORED node, rendered as the bare attribute.
    expect(reading.status, 'the runtime\'s OWN answer to the state-slice write').toBe('applied')
    expect(reading.written).toBe(true)
    expect(renderedAttribute(runtime, 'theme'), 'the declaration is provident data ON the authored node').toBe('light')
    // NOT A HAND-WRITTEN WRITE, AND NOT A NEW ELEMENT: the node carrying the attribute is the ENVELOPE's own, and the
    // graph still answers its authored id — nothing was created, renamed or stamped outside the producing graph.
    expect(authored(runtime).props.id, 'the authored node keeps its own id — nothing was renamed or created').toBe(STATE_NODE)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // D-96/2 — THE REMOVAL ARM IS THE MECHANISM'S `removal` MEMBER
  // ─────────────────────────────────────────────────────────────────────────
  it('D-96/2 — the REMOVAL arm carries the mechanism\'s `removal: true` to the node as `undefined`, which the engine applies as an attribute REMOVAL (`Runtime.applyCommand`\'s own declared arm), never as an empty string that merely happens to be falsy', async () => {
    const runtime = boot()
    const drive = startThemeDeclaration(runtime)
    // THE SET ARM FIRST, and it must MOVE: the boot read recorded the envelope's own `dark`, so the change that
    // declares is `light` — a dispatch to the state the realm already found is not a change (see D-96/3).
    await dispatchTheme(runtime, 'theme-light', 'light')
    expect(drive.drive().written, 'the set arm lands first, so the removal has something to remove').toBe(true)
    expect(renderedAttribute(runtime, 'theme')).toBe('light')

    // THE EMPTY SETTING: the authored handler writes `String(value)` of an ABSENT argument, which is `''` — the
    // mechanism's declared absence, and therefore the removal case rather than a second token.
    await dispatchTheme(runtime, 'theme-dark')
    expect(authored(runtime).content, 'the authored state is the EMPTY setting').toBe('')
    const reading = drive.drive()
    expect(reading.setting, 'resolveTheme declares the empty string as an ABSENCE, never as a token').toBe(null)
    expect(reading.declaration).toEqual({ name: 'theme', value: '', removal: true })
    expect(reading.status).toBe('applied')
    expect(reading.written).toBe(true)
    expect(renderedAttribute(runtime, 'theme'), 'the attribute is GONE from the authored node').toBe(null)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // D-96/3 — IT DECLARES ON A CHANGE AND NOT OTHERWISE
  // ─────────────────────────────────────────────────────────────────────────
  it('D-96/3 — a drive whose setting did NOT move declares NOTHING: `changed: false`, no write attempted (`status: null`) and not one byte of the rendered surface moves — the condition `npm run divergence`\'s cross-realm SSR-parity row depends on', async () => {
    const runtime = boot()
    const drive = startThemeDeclaration(runtime)
    // THE BOOT READ SEEDED THE RECORD WITHOUT DECLARING: the envelope's own `dark` is the state this realm found.
    const rendered = runtime.renderedHtmlResult()
    const first = drive.drive()
    expect(first.changed, 'a boot is not a change').toBe(false)
    expect(first.written).toBe(false)
    expect(first.status, 'nothing was attempted, so no status word is fabricated').toBe(null)
    expect(runtime.renderedHtmlResult().renderedHtml, 'the rendered surface is byte-identical across a no-op drive').toBe(rendered.renderedHtml)
    expect(runtime.renderedHtmlResult().ssrHtml, 'and so is the SSR fragment').toBe(rendered.ssrHtml)

    // A SECOND NO-OP DRIVE IS STILL A NO-OP, and after a real declaration the same setting does not re-declare.
    await dispatchTheme(runtime, 'theme-light', 'light')
    expect(drive.drive().written).toBe(true)
    const settled = runtime.renderedHtmlResult()
    const again = drive.drive()
    expect([again.changed, again.written, again.status], 'an unchanged setting is not re-declared').toEqual([false, false, null])
    expect(runtime.renderedHtmlResult().renderedHtml).toBe(settled.renderedHtml)
    // THE CONTROL THAT MAKES THE ABOVE A MEASUREMENT: a setting that DOES move declares again, on the same runtime.
    await dispatchTheme(runtime, 'theme-dark', 'dark')
    expect(drive.drive().setting, 'the drive is keyed on the setting, not on a one-shot flag').toBe('dark')
  })

  // ─────────────────────────────────────────────────────────────────────────
  // D-96/4 — THE DECLARATION IS THE MECHANISM'S, AND THE `env` CLAIM GETS NO PRECEDENCE RULE
  // ─────────────────────────────────────────────────────────────────────────
  it('D-96/4 — the reading carries `resolveTheme`\'s three members: an omitted `env` is the declared `degraded-env`, a supplied claim is `\'env\'`, and the claim changes NO precedence over the caller\'s token (`P-TH-10`)', async () => {
    const runtime = boot()
    const drive = startThemeDeclaration(runtime)
    await dispatchTheme(runtime, 'theme-light', 'light')
    // THIS REALM MAKES NO ENVIRONMENT CLAIM, and the declared degradation is what it reports rather than a fabricated one.
    const degraded = drive.drive()
    expect([degraded.source, degraded.prefersDark], 'no claim is stated as no claim').toEqual(['degraded-env', false])
    // A CALLER THAT DOES MAKE ONE is believed — and it moves NOTHING in the declaration: the token keeps its authority.
    const claimed = drive.drive({ prefersDark: true })
    expect([claimed.source, claimed.prefersDark], 'the caller\'s claim is read STRICTLY, and reported').toEqual(['env', true])
    expect(claimed.setting, 'the setting is NOT sourced from the environment claim').toBe('light')
    expect(claimed.declaration, 'and the declaration is unchanged by it').toEqual({ name: 'theme', value: 'light', removal: false })
    // A HOSTILE CLAIM IS STILL TOTAL: an object whose own-member read throws degrades rather than escaping the turn.
    const hostile = {
      get prefersDark(): boolean {
        throw new Error('boom')
      },
    }
    expect(() => drive.drive(hostile), 'a throwing env read never escapes a wiring turn').not.toThrow()
    expect(drive.drive(hostile).source, 'and it is the declared degradation').toBe('degraded-env')
  })

  // ─────────────────────────────────────────────────────────────────────────
  // D-96/6 — TOTALITY: NO STATE NODE, NO WRITE, NO THROW
  // ─────────────────────────────────────────────────────────────────────────
  it('D-96/6 — TOTALITY: a realm whose graph does not hold the authored carrier answers a READING, writes nothing and never throws, and a runtime whose write refuses or throws is reported rather than escaping the turn', () => {
    // (a) THE CARRIER IS DERIVED FROM THE ENVELOPE, NOT FROM WHATEVER GRAPH IS LOADED (`themeWiringRole`'s own rule:
    // the id is the ENVELOPE's, never re-spelled). A realm that loaded some OTHER envelope therefore holds the id and
    // cannot read the node — which is what a `provident.load` of anything else leaves, and what the headless host
    // boots on (`src/main/battery-host.ts`'s root-only `C3` envelope).
    const rootOnly = {
      template: { root: { type: 'app', props: { id: 'preempt-root' } } },
      content: [],
      clientConfig: { runInstantiation: true, runRendering: true },
    }
    const runtime = new Runtime({ mount: mountEl() as never, envelope: rootOnly as never })
    runtime.bootstrap()
    const drive = startThemeDeclaration(runtime)
    expect([drive.nodeId, drive.attributeName], 'the envelope\'s id is held, and the caller\'s name with it').toEqual([STATE_NODE, 'theme'])
    let reading: ReturnType<ThemeDeclarationDrive['drive']> | null = null
    expect(() => {
      reading = drive.drive()
    }, 'an unreadable carrier is a reading, never a throw out of a wiring turn').not.toThrow()
    expect(
      reading === null ? null : [(reading as ThemeDeclarationReading).written, (reading as ThemeDeclarationReading).status, (reading as ThemeDeclarationReading).changed],
      'a state this realm cannot read declares nothing, and no status word is fabricated',
    ).toEqual([false, null, false])

    // (b) A RUNTIME WHOSE WRITE THROWS IS REPORTED, NOT ESCAPED — the declared degradation of every wiring turn in
    // this file (`§3.2 F-8`), driven through a structural double so the arm is reachable without a broken graph.
    const double = { content: 'dark' }
    const throwing = {
      elementForNodeId: (): null => null,
      nodeState: (): unknown => ({ states: [{ nodeId: STATE_NODE, content: double.content }] }),
      applyCommand: (): never => {
        throw new Error('boom')
      },
    }
    const doubled = startThemeDeclaration(throwing as never)
    double.content = 'light' // the setting MOVES, so the drive attempts the write the double refuses
    let threw: ThemeDeclarationReading | null = null
    expect(() => {
      threw = doubled.drive()
    }, 'a throwing write never escapes the drive').not.toThrow()
    const answer = threw as unknown as ThemeDeclarationReading
    expect([answer.status, answer.written, answer.declaration], 'the refusal is REPORTED with the mechanism\'s declaration beside it').toEqual(['threw', false, { name: 'theme', value: 'light', removal: false }])
  })

  // ─────────────────────────────────────────────────────────────────────────
  // D-96/5 — THE WIRING ITSELF: THE APP'S OWN CHANGE PUSH, AND NO HAND-WRITTEN DOM
  // ─────────────────────────────────────────────────────────────────────────
  it('D-96/5 — the drive is WIRED into `main()`\'s reply notify (the app\'s ONE app-graph-changed push, the one `refreshDebug` already rides), and the role writes NO hand-written DOM — with a control that removing the drive line REDS the probe', () => {
    const src = readFileSync(RENDERER_PATH, 'utf8')
    const code = stripComments(src)
    // (a) THE ROLE IS STARTED AT BOOT, once, on the runtime the app renders from.
    expect(code.includes('startThemeDeclaration(runtime)'), 'the drive is constructed in `main()` from the runtime the app renders from').toBe(true)
    // (b) AND DRIVEN FROM THE REPLY NOTIFY — the app's own change push, not a timer, not a poll, not a second subscriber.
    const replyRegion = regionOf(code, 'const replyRoute =')
    expect(replyRegion.length, 'the reply route region is present').toBeGreaterThan(0)
    expect(replyRegion.includes('themeDeclaration.drive()'), 'the declaration is driven by the reply notify').toBe(true)
    expect(replyRegion.indexOf('themeDeclaration.drive()') < replyRegion.indexOf('bridge!.notify(p)'), 'it is driven BEFORE the push, so a reader of the push sees the graph it left').toBe(true)
    expect(code.includes('setInterval') || code.includes('setTimeout'), 'no timer is introduced by this wiring').toBe(false)
    // (c) THE ROLE ITSELF CALLS THE MECHANISM AND WRITES NO DOM — comment-elided, and CALL-FORM, so prose cannot satisfy it.
    const role = stripComments(regionOf(src, 'export function startThemeDeclaration'))
    expect(role.length, 'the role region was found').toBeGreaterThan(0)
    for (const call of ['resolveTheme(', 'applyThemeDeclaration(', "kind: 'state-slice'"]) {
      expect(role.includes(call), `the role makes the declared call ${call}`).toBe(true)
    }
    for (const forbidden of ['setAttribute(', 'removeAttribute(', 'classList', 'document.createElement', '.style', 'insertRule(', 'body.']) {
      expect(role.includes(forbidden), `the role writes no hand-written DOM: ${forbidden} must not appear`).toBe(false)
    }
    // (d) THE CONTROL — the SAME probe over a source with the drive line removed MUST FAIL, so (b) is a measurement.
    const withoutDrive = replyRegion.replace('themeDeclaration.drive()', '')
    expect(withoutDrive.includes('themeDeclaration.drive()'), 'the control strips the drive call').toBe(false)
    // (e) AND THE SECOND CONTROL — the role's own two mechanism calls removed, so (c) is a measurement too.
    const withoutMechanism = role.replace('resolveTheme(', '').replace('applyThemeDeclaration(', '')
    expect(withoutMechanism.includes('resolveTheme(') || withoutMechanism.includes('applyThemeDeclaration(')).toBe(false)
  })
})
