// tests/demo-bundle.test.ts — **THE DEMO'S BUNDLE IS A BUILD PRODUCT, AND THIS ROW KNOWS IT** (`D-118`).
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (`D-40`, `AGENTS.md`).
/**
 * ============================================================================
 * WHY THIS FILE EXISTS, AND WHAT FAILURE IT IS THE DURABLE FIX FOR.
 *
 * `D-94` deleted `demo/pane-drag-demo/demo.ts` because it could not compile against this tree, and KEPT the checked-in
 * `demo.mjs` because nothing rebuilt it — so the tree carried a 13,217-line bundle of a mechanism the tree no longer had,
 * one version behind, with no way to catch up. **A CHECKED-IN BUNDLE WITH NO GENERATOR IS A COPY, AND A COPY CANNOT TRACK
 * ITS ORIGINAL.** `D-118` gives the directory a generator (`demo/pane-drag-demo/build.mjs`) and this battery is the row
 * that keeps the two honest:
 *
 *   `DB-1` — the bundle is NOT BEHIND ITS SOURCES: `build.mjs --check` rebuilds the provenance manifest from `src/` and
 *            `demo/` as they stand and compares it with the header the committed `demo.mjs` carries. Any source that moved,
 *            any import that appeared, any hand-edited body answers a NAMED disagreement and this row reds.
 *   `DB-2` — THE ROW CAN STILL FAIL. A staleness instrument that cannot fail is a deleted row wearing a new name, so the
 *            same instrument is driven over a DOCTORED copy of the bundle (one appended byte) and over a headerless file:
 *            both must be refused, while the committed bundle is admitted. Nothing is written into the repository.
 *   `DB-3` — THE BUNDLE IS THE APP'S OWN CODE. The demo's source IMPORTS the app's modules (asserted, over comment-elided
 *            text) and the generated bundle carries the bundler's own `// src/…` markers for them; and NO app function is
 *            transcribed into the demo's own sources — with a POSITIVE CONTROL that the same predicate finds each of those
 *            functions in the `src/` module that owns it.
 *   `DB-4` — THE RETIRED MECHANISM IS NOT IN THE ARTIFACT. The frozen graph store `D-93` deleted (`createGraphStore`,
 *            `store-core-graph`) and the `temp.drag` address `D-92` retired appear NOWHERE in the bundle's code, with the
 *            same scanner's positive arm proving it is not vacuous.
 *
 * EVERY ABSENCE ASSERTION BELOW READS CODE WITH COMMENT LINES ELIDED: `demo.ts` quotes the retired mechanism's names in its
 * own explanatory prose, and a census that cannot tell prose from code measures the prose.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const DEMO_DIR = join(REPO_ROOT, 'demo', 'pane-drag-demo')
const BUILD = join(DEMO_DIR, 'build.mjs')
const BUNDLE = join(DEMO_DIR, 'demo.mjs')
const DEMO_SOURCES = [join(DEMO_DIR, 'demo.ts'), join(DEMO_DIR, 'stub-view.ts'), join(DEMO_DIR, 'build.mjs')]

/** The one command form the README and the corpus both name, run by node itself (no shell, no `npm` key). */
function runBuild(args: readonly string[]): { readonly status: number | null; readonly stdout: string; readonly stderr: string } {
  const result = spawnSync(process.execPath, [BUILD, ...args], { cwd: REPO_ROOT, encoding: 'utf8' })
  return { status: result.status, stdout: String(result.stdout ?? ''), stderr: String(result.stderr ?? '') }
}

/** **COMMENT LINES ELIDED** — the repo's rule for an assertion that must read code and not prose. */
const codeOf = (text: string): string =>
  text
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return !(trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('*/'))
    })
    .join('\n')

/** The app function each demo module must NOT re-define, and the `src/` module that must define it (the positive control). */
const APP_FUNCTIONS: ReadonlyArray<{ readonly name: string; readonly owner: string }> = [
  { name: 'createGestureSession', owner: 'src/shared/gesture-session.ts' },
  { name: 'createResizeController', owner: 'src/shared/gutter.ts' },
  { name: 'clampToBounds', owner: 'src/shared/gutter.ts' },
  { name: 'createGutterAffordance', owner: 'src/shared/gutter-affordance.ts' },
  { name: 'createPaneDrag', owner: 'src/renderer/renderer.ts' },
  { name: 'paneGeometryIn', owner: 'src/shared/view-shape.ts' },
  { name: 'gutterSeamExample', owner: 'src/shared/demo-envelope.ts' },
]

/** A function DECLARATION or a const-bound arrow of that name — the shapes a transcription would take. */
const definitionOf = (name: string): RegExp => new RegExp(`(function\\s+${name}\\s*\\(|(const|let|var)\\s+${name}\\s*[=:])`)

describe('demo/pane-drag-demo · THE BUNDLE IS A BUILD PRODUCT (`D-118`)', () => {
  it('DB-1 · `build.mjs --check` is GREEN — the committed `demo.mjs` is the bundle its sources produce, not the one before them', () => {
    const checked = runBuild(['--check'])
    expect(checked.status, `--check refused the committed bundle:\n${checked.stderr}`).toBe(0)
    expect(checked.stdout).toContain('CURRENT')
    // THE HEADER IS WHAT MAKES THE CLAIM CHECKABLE AT ALL — a bundle without one is refused before any source is read.
    const text = readFileSync(BUNDLE, 'utf8')
    expect(text.startsWith('// demo/pane-drag-demo/demo.mjs — GENERATED FILE, DO NOT EDIT (D-118).')).toBe(true)
    expect(text).toContain('// @generated-by demo/pane-drag-demo/build.mjs')
    expect(text).toMatch(/^\/\/ @source-count \d+$/m)
    expect(text).toMatch(/^\/\/ @body-sha256 [0-9a-f]{64}$/m)
    expect(text).toMatch(/^\/\/ @source [0-9a-f]{64} demo\/pane-drag-demo\/demo\.ts$/m)
  })

  it('DB-2 · **THE ROW CAN STILL FAIL** — the same instrument REFUSES a doctored copy and a headerless file, and ADMITS the committed bundle', () => {
    const scratch = mkdtempSync(join(tmpdir(), 'demo-bundle-control-'))
    try {
      const doctored = join(scratch, 'doctored.mjs')
      writeFileSync(doctored, `${readFileSync(BUNDLE, 'utf8')}\n// one hand-planted line\n`, 'utf8')
      const refused = runBuild(['--verify', doctored])
      expect(refused.status, 'a bundle edited after it was built MUST be refused').toBe(1)
      expect(`${refused.stderr}`).toContain('@body-sha256')

      const headerless = join(scratch, 'headerless.mjs')
      writeFileSync(headerless, 'console.log("not a build product")\n', 'utf8')
      const noHeader = runBuild(['--verify', headerless])
      expect(noHeader.status, 'a file with no provenance header MUST be refused').toBe(1)
      expect(noHeader.stderr).toContain('no provenance header')

      const admitted = runBuild(['--verify', BUNDLE])
      expect(admitted.status, `the committed bundle must be admitted by the same arm:\n${admitted.stderr}`).toBe(0)
      expect(admitted.stdout).toContain('CURRENT')
    } finally {
      rmSync(scratch, { recursive: true, force: true })
    }
  })

  it("DB-3 · THE DEMO'S SOURCE IMPORTS THE APP'S MODULES AND TRANSCRIBES NONE OF THEM — with a positive control that the predicate bites", () => {
    const demoCode = codeOf(readFileSync(join(DEMO_DIR, 'demo.ts'), 'utf8'))
    for (const specifier of [
      '../../src/shared/gesture-session.js',
      '../../src/shared/gutter.js',
      '../../src/shared/gutter-affordance.js',
      '../../src/shared/demo-envelope.js',
      '../../src/shared/view-shape.js',
      '../../src/renderer/renderer.js',
    ]) {
      expect(demoCode, `demo.ts must import ${specifier}`).toContain(specifier)
    }
    expect(demoCode, 'the composition the wiring hands the affordance is createPaneDrag').toContain('createPaneDrag({ view: stub.members }')
    // THE GENERATED BUNDLE CARRIES THE APP'S OWN BYTES, and the bundler's source markers say which files they came from.
    const bundle = readFileSync(BUNDLE, 'utf8')
    for (const marker of [
      '// src/shared/gesture-session.ts',
      '// src/shared/gutter.ts',
      '// src/shared/gutter-affordance.ts',
      '// src/shared/demo-envelope.ts',
      '// src/shared/view-shape.ts',
      '// src/renderer/renderer.ts',
    ]) {
      expect(bundle, `the bundle must carry the app module ${marker}`).toContain(marker)
    }
    expect(bundle).toContain('function createGutterAffordance(options)')
    expect(bundle).toContain('function createPaneDrag(backing, source2)')
    // AND THE DEMO'S OWN SOURCES DEFINE NONE OF THEM — a transcription is what `D-94` recorded and this pass exists to forbid.
    for (const { name, owner } of APP_FUNCTIONS) {
      for (const source of DEMO_SOURCES) {
        const held = codeOf(readFileSync(source, 'utf8'))
        expect(definitionOf(name).test(held), `${source} must not define ${name}; it belongs to ${owner}`).toBe(false)
      }
      // THE POSITIVE CONTROL: the predicate DOES find each one in the module that owns it, so the absence above is a reading.
      const owned = readFileSync(join(REPO_ROOT, owner), 'utf8')
      expect(definitionOf(name).test(owned), `the control must find ${name} in ${owner}`).toBe(true)
    }
  })

  it('DB-4 · THE RETIRED MECHANISM IS NOT IN THE ARTIFACT — no `createGraphStore`, no `store-core-graph`, no `temp.drag`, over comment-elided code', () => {
    const bundleCode = codeOf(readFileSync(BUNDLE, 'utf8'))
    for (const retired of ['createGraphStore', 'store-core-graph', 'store-graph-references', 'temp.drag']) {
      expect(bundleCode.includes(retired), `demo.mjs must not carry the retired mechanism's ${retired}`).toBe(false)
    }
    // THE SCANNER IS NOT VACUOUS: the same read finds what the demo DOES carry.
    expect(bundleCode.includes('createGestureSession')).toBe(true)
    expect(bundleCode.includes('commitPane')).toBe(true)
    expect(bundleCode.includes('paneGeometryIn')).toBe(true)
  })
})
